const b=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))f(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&f(d)}).observe(document,{childList:!0,subtree:!0});function r(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerpolicy&&(c.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?c.credentials="include":o.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function f(o){if(o.ep)return;o.ep=!0;const c=r(o);fetch(o.href,c)}};b();class x{constructor(i,r,f,o,c){this.x=i,this.y=r,this.speed=f,this.vision=o,this.direction=c}}class L{constructor(i){this.x=37,this.y=27,this.speed=i}}const l=document.querySelector("#canvas"),n=l.getContext("2d"),w=new x(10,0,1,3,3),y=new x(0,10,1,3,2),e=new L(1);let s=null;const u=500;_();async function _(){for(S(),a();!s;)v(),k(w),k(y),await R(u);v()}function R(t){return new Promise(i=>setTimeout(i,t))}function S(){window.innerWidth/window.innerHeight>4/3?l.style.height="100%":l.style.width="100%",n.fillStyle="#2e3440",n.fillRect(0,0,l.width,l.height)}function E(){const t=10,i=5;n.fillStyle="#eceff4",n.fillRect(t,t,l.width-t*2,l.height-t*2),n.fillStyle="#2e3440",n.fillRect(t+i,t+i,l.width-(t+i)*2,l.height-(t+i)*2)}function v(){E(),A(),g(w),g(y),Y()}function g(t){if(n.fillStyle="#d08770",n.fillRect((t.x+1)*50,(t.y+1)*50,50,50),t.x===e.x&&t.y===e.y){s=!0,alert("You lose");return}if(n.fillStyle="#ebcb8b",t.direction===1||t.direction===3){for(let i=1;i<=t.vision&&t.y+(t.direction===1?-i:i)<28;i++)for(let r=t.x-i+1;r<=t.x+i-1;r++)if(r<38&&r>=0){if(r===e.x&&t.y+(t.direction===1?-i:i)===e.y){s=!0,alert("You lose");return}n.fillRect((r+1)*50,(t.y+(t.direction===1?-i:i)+1)*50,50,50)}}else for(let i=1;i<=t.vision&&t.x+(t.direction===4?-i:i)<38;i++)for(let r=t.y-i+1;r<=t.y+i-1;r++)if(r<28&&r>=0){if(r===e.y&&t.x+(t.direction===4?-i:i)===e.x){s=!0,alert("You lose");return}n.fillRect((t.x+(t.direction===4?-i:i)+1)*50,(r+1)*50,50,50)}}function Y(){n.fillStyle="#a3be8c",n.fillRect((e.x+1)*50,(e.y+1)*50,50,50)}function A(){n.fillStyle="#b48ead",n.fillRect(50,50,50,50)}function k(t){t.direction===1&&(t.y-=t.speed,t.y-t.vision<1&&(t.direction=3)),t.direction===2&&(t.x+=t.speed,t.x+t.vision>38&&(t.direction=4)),t.direction===3&&(t.y+=t.speed,t.y+t.vision>28&&(t.direction=1)),t.direction===4&&(t.x-=t.speed,t.x-t.vision<1&&(t.direction=2))}function a(){document.addEventListener("keydown",p,{once:!0}),l.addEventListener("click",h,{once:!0})}function p(t){let i=!1;(t.key==="ArrowUp"||t.key==="w")&&(i=!0,e.y-=e.speed,e.y<0&&(e.y=0)),(t.key==="ArrowDown"||t.key==="s")&&(i=!0,e.y+=e.speed,e.y>27&&(e.y=27)),(t.key==="ArrowLeft"||t.key==="a")&&(i=!0,e.x-=e.speed,e.x<0&&(e.x=0)),(t.key==="ArrowRight"||t.key==="d")&&(i=!0,e.x+=e.speed,e.x>37&&(e.x=37)),i&&(t.preventDefault(),document.removeEventListener("keydown",p),l.removeEventListener("click",h),setTimeout(a,u),console.log(e.x,e.y)),e.x===0&&e.y===0&&(s=!0,alert("You win!"))}function h(t){let i=!1;t.clientY<l.height/4&&(i=!0,e.y-=e.speed,e.y<0&&(e.y=0)),t.clientY>l.height/4*3&&(i=!0,e.y+=e.speed,e.y>27&&(e.y=27)),t.clientX<l.width/4&&(i=!0,e.x-=e.speed,e.x<0&&(e.x=0)),t.clientX>l.width/4*3&&(i=!0,e.x+=e.speed,e.x>37&&(e.x=37)),i&&(t.preventDefault(),document.removeEventListener("keydown",p),l.removeEventListener("click",h),setTimeout(a,u),console.log(e.x,e.y)),e.x===0&&e.y===0&&(s=!0,alert("You win!"))}