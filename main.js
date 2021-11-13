import "./style.css";

class Enemy {
    constructor(x, y, speed, vision, direction) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.vision = vision;
        this.direction = direction;
    }
}

class Player {
    constructor(speed) {
        this.x = 37;
        this.y = 27;
        this.speed = speed;
    }
}

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const enemy1 = new Enemy(10, 0, 1, 3, 3);
const enemy2 = new Enemy(0, 10, 1, 3, 2);
const player = new Player(1);

let end = null;
window.interval = 500;

main();

async function main() {
    resize_canvas();

    player_control();
    while (!end) {
        draw_map();
        update_enemy(enemy1);
        update_enemy(enemy2);
        await sleep(interval);
    }
    draw_map();
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function resize_canvas() {
    if (window.innerWidth / window.innerHeight > 4 / 3) {
        // canvas.height = window.innerHeight;
        // canvas.width = window.innerHeight * (4 / 3);
        canvas.style.height = "100%";
    } else {
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerWidth * (3 / 4);
        canvas.style.width = "100%";
    }
    ctx.fillStyle = "#2e3440";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw_border() {
    const padding = 10,
        width = 5;
    ctx.fillStyle = "#eceff4";
    ctx.fillRect(padding, padding, canvas.width - padding * 2, canvas.height - padding * 2);

    ctx.fillStyle = "#2e3440";
    ctx.fillRect(padding + width, padding + width, canvas.width - (padding + width) * 2, canvas.height - (padding + width) * 2);
}

function draw_map() {
    draw_border();
    draw_secret();

    draw_enemy(enemy1);
    draw_enemy(enemy2);
    draw_player();
}

function draw_enemy(enemy) {
    ctx.fillStyle = "#d08770";
    ctx.fillRect((enemy.x + 1) * 50, (enemy.y + 1) * 50, 50, 50);
    if (enemy.x === player.x && enemy.y === player.y) {
        end = true;
        alert("You lose");
        return;
    }

    ctx.fillStyle = "#ebcb8b";
    if (enemy.direction === 1 || enemy.direction === 3) {
        for (let i = 1; i <= enemy.vision; i++) {
            if (enemy.y + (enemy.direction === 1 ? -i : i) < 28) {
                for (let j = enemy.x - i + 1; j <= enemy.x + i - 1; j++) {
                    if (j < 38 && j >= 0) {
                        if (j === player.x && enemy.y + (enemy.direction === 1 ? -i : i) === player.y) {
                            end = true;
                            alert("You lose");
                            return;
                        }
                        ctx.fillRect((j + 1) * 50, (enemy.y + (enemy.direction === 1 ? -i : i) + 1) * 50, 50, 50);
                    }
                }
            } else {
                break;
            }
        }
    } else {
        for (let i = 1; i <= enemy.vision; i++) {
            if (enemy.x + (enemy.direction === 4 ? -i : i) < 38) {
                for (let j = enemy.y - i + 1; j <= enemy.y + i - 1; j++) {
                    if (j < 28 && j >= 0) {
                        if (j === player.y && enemy.x + (enemy.direction === 4 ? -i : i) === player.x) {
                            end = true;
                            alert("You lose");
                            return;
                        }
                        ctx.fillRect((enemy.x + (enemy.direction === 4 ? -i : i) + 1) * 50, (j + 1) * 50, 50, 50);
                    }
                }
            } else {
                break;
            }
        }
    }
}

function draw_player() {
    ctx.fillStyle = "#a3be8c";
    ctx.fillRect((player.x + 1) * 50, (player.y + 1) * 50, 50, 50);
}

function draw_secret() {
    ctx.fillStyle = "#b48ead";
    ctx.fillRect(50, 50, 50, 50);
}

function update_enemy(enemy) {
    if (enemy.direction === 1) {
        enemy.y -= enemy.speed;
        if (enemy.y - enemy.vision < 0) enemy.direction = 3;
    }
    if (enemy.direction === 2) {
        enemy.x += enemy.speed;
        if (enemy.x + enemy.vision > 38) enemy.direction = 4;
    }
    if (enemy.direction === 3) {
        enemy.y += enemy.speed;
        if (enemy.y + enemy.vision > 28) enemy.direction = 1;
    }
    if (enemy.direction === 4) {
        enemy.x -= enemy.speed;
        if (enemy.x - enemy.vision < 0) enemy.direction = 2;
    }
}

function player_control() {
    document.addEventListener("keydown", desktop_player, { once: true });
    canvas.addEventListener("click", mobile_player, { once: true });
}

function desktop_player(e) {
    let act = false;
    if (e.key === "ArrowUp" || e.key === "w") {
        act = true;
        player.y -= player.speed;
        if (player.y < 0) player.y = 0;
    }
    if (e.key === "ArrowDown" || e.key === "s") {
        act = true;
        player.y += player.speed;
        if (player.y > 27) player.y = 27;
    }
    if (e.key === "ArrowLeft" || e.key === "a") {
        act = true;
        player.x -= player.speed;
        if (player.x < 0) player.x = 0;
    }
    if (e.key === "ArrowRight" || e.key === "d") {
        act = true;
        player.x += player.speed;
        if (player.x > 37) player.x = 37;
    }

    if (act) {
        e.preventDefault();
        document.removeEventListener("keydown", desktop_player);
        canvas.removeEventListener("click", mobile_player);
        setTimeout(player_control, interval);
        console.log(player.x, player.y);
    }

    if (player.x === 0 && player.y === 0) {
        end = true;
        alert("You win!");
    }
}

function mobile_player(e) {
    let act = false;
    // if click top 25%
    if (e.clientY < canvas.height / 4) {
        act = true;
        player.y -= player.speed;
        if (player.y < 0) player.y = 0;
    }
    // if click bottom 25%
    if (e.clientY > (canvas.height / 4) * 3) {
        act = true;
        player.y += player.speed;
        if (player.y > 27) player.y = 27;
    }
    // if click left 25%
    if (e.clientX < canvas.width / 4) {
        act = true;
        player.x -= player.speed;
        if (player.x < 0) player.x = 0;
    }
    // if click right 25%
    if (e.clientX > (canvas.width / 4) * 3) {
        act = true;
        player.x += player.speed;
        if (player.x > 37) player.x = 37;
    }

    if (act) {
        e.preventDefault();
        document.removeEventListener("keydown", desktop_player);
        canvas.removeEventListener("click", mobile_player);
        setTimeout(player_control, interval);
        console.log(player.x, player.y);
    }

    if (player.x === 0 && player.y === 0) {
        end = true;
        alert("You win!");
    }
}
