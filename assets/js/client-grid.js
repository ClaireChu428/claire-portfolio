(() => {
 const page=document.getElementById('client-proposals');if(!page)return;
 const rows=[...page.querySelectorAll('.client-grid-row')];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let pointer=0,current=0,frame=0,active=false;
 page.addEventListener('pointermove',e=>{pointer=(e.clientX/innerWidth-.5)*70});
 page.addEventListener('pointerleave',()=>{pointer=0});
 function draw(time){
  if(!active||reduced.matches){frame=0;return}
  current+=(pointer-current)*.035;
  rows.forEach((row,i)=>row.style.setProperty('--row-shift',((i%2?1:-1)*(current+Math.sin(time/6500+i*.7)*18))+'px'));
  frame=requestAnimationFrame(draw);
 }
 function start(){if(active&&!frame&&!reduced.matches)frame=requestAnimationFrame(draw)}
 new IntersectionObserver(entries=>{active=entries[0].isIntersecting;if(!active){cancelAnimationFrame(frame);frame=0}else start()},{threshold:.05}).observe(page);
 reduced.addEventListener('change',()=>{if(reduced.matches){cancelAnimationFrame(frame);frame=0;rows.forEach(row=>row.style.removeProperty('--row-shift'))}else start()});
})();
