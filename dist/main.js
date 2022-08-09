(()=>{"use strict";const e=((e,t)=>{let l;const s=document.createElement("div");let n;s.style.position="relative",s.style.display="grid",s.style.gridTemplateRows="1fr 1fr",s.style.paddingTop="250px";let i=4e3,r=null;const o=[];let d=0;s.id="image-slider";const a=()=>{let e;e=d===o.length-1?0:d+1,u(e),p()},c=e=>{const t=document.createElement("div");return t.style.backgroundColor="lightgrey",t.style.borderRadius="100px",t.style.width="20px",t.style.textAlign="center",t.style.zIndex="1",t.style.cursor="pointer",t.classList.add("direction-button"),"left"===e?t.textContent="<":"right"===e&&(t.textContent=">"),t},y=(e,t,l)=>{e.style.width="10px",e.style.height="10px",e.style.transform=l===d?"scale(1)":"scale(0.5)"},p=()=>{document.querySelectorAll(".nav-button").forEach(((e,t)=>{y(e,d,t)}))},g=e=>{document.querySelectorAll(".slide").forEach((l=>{const s=Number(l.style.right.split("p")[0]);let n;"right"===e?n=`${s+t}px`:"left"===e&&(n=s-t+"px"),l.style.right=n}))},u=e=>{const l=document.querySelectorAll(".slide"),s=(e-d)*t;l.forEach((e=>{const t=Number(e.style.right.split("p")[0]);e.style.right=`${t+s}px`})),d=e},m=()=>{s.textContent="",n=document.createElement("div"),n.style.display="grid",n.style.gridTemplateRows="1fr 1fr",n.style.alignItems="flex-end",n.style.width="500px",n.style.height="500px",n.style.position="absolute",n.style.top="0px",n.style.left="0px",s.appendChild(n),(()=>{const e=document.createElement("div");e.style.zIndex=1,e.style.display="flex",e.style.gridTemplateRows="1fr 1fr",e.style.alignItems="center",e.style.justifyContent="space-between",e.style.width=t,n.appendChild(e);const l=c("left"),s=c("right");e.appendChild(l),e.appendChild(s),l.addEventListener("mousedown",(()=>{0===d?u(o.length-1):(g("left"),d-=1),p()})),s.addEventListener("mousedown",(()=>{d===o.length-1?u(0):(g("right"),d+=1),p()}))})(),(()=>{const e=document.createElement("div");e.style.height="50px",e.style.bottom="10px",e.style.right="250px",e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center",e.style.zIndex="1",e.style.gap="10px",n.appendChild(e),o.forEach(((t,l)=>{((e,t)=>{const l=document.createElement("div");l.dataset.index=t,y(l,d,t),l.style.backgroundColor="grey",l.style.borderRadius="100px",l.classList.add("nav-button"),l.style.transitionProperty="transform",l.style.transitionDuration="1s",l.style.cursor="pointer",e.appendChild(l),l.addEventListener("click",(()=>{u(t),p()}))})(e,l)}))})(),(()=>{const e=document.createElement("div");e.id="image-container",e.style.height="500px",e.style.width="500px",e.style.overflow="auto",e.style.display="grid",e.style.position="absolute",e.style.gridTemplateColumns=`repeat(${o.length}, 1fr)`,o.forEach((t=>{const l=document.createElement("div");l.classList.add("slide"),l.style.position="relative",l.style.backgroundImage=`url(${t})`,l.style.height="500px",l.style.width="500px",l.style.backgroundPosition="center",l.style.backgroundSize="cover",l.style.right="0px",l.style.transitionProperty="right",l.style.transitionDuration="1s",e.appendChild(l),s.appendChild(e)}))})()};return m(),r&&clearInterval(r),r=setInterval(a,i),{setParent:e=>{l=document.querySelector(e),l.appendChild(s)},addImage:e=>{o.push(e),m()},setDirectionButtonStyles:e=>{document.querySelectorAll(".direction-button").forEach((t=>{t.style.cssText=e}))},setNavButtonStyles:e=>{document.querySelectorAll(".nav-button").forEach((t=>{t.style.cssText=e}))},setSliderTimeInMilliseconds:e=>{clearInterval(r),i=e,r=setInterval(a,i)}}})(0,500);e.setParent("#page-wrapper"),e.addImage("./images/image1.jpg"),e.addImage("./images/image2.png"),e.addImage("./images/image3.jpg")})();
//# sourceMappingURL=main.js.map