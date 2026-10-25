(() => {
 const orbit=document.querySelector('.bts-orbit');
 const cards=[...orbit.querySelectorAll('.bts-orbit-card')];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let phase=-Math.PI/2,last=0,paused=false,visible=false,frame=0,turn=null;
 function draw(){
  const w=orbit.clientWidth,h=orbit.clientHeight,mobile=w<500;
  const rx=mobile?w*.29:w*.37,ry=mobile?h*.33:h*.30;
  cards.forEach((card,i)=>{
   const angle=phase+i*Math.PI*2/cards.length;
   const x=rx*Math.cos(angle),y=ry*Math.sin(angle);
   const tilt=mobile?0:-.14;
   const scale=.91+.09*Math.sin(angle);
   card.style.transform=`translate(-50%,-50%) translate(${x*Math.cos(tilt)-y*Math.sin(tilt)}px,${x*Math.sin(tilt)+y*Math.cos(tilt)}px) scale(${scale})`;
   card.style.zIndex=String(Math.round(10+Math.sin(angle)*5));
  });
 }
 function tick(now){
  frame=0;if(!visible||document.hidden||reduced.matches)return;
  if(turn){
   const t=Math.min(1,(now-turn.start)/360);
   phase=turn.from+turn.delta*(1-Math.pow(1-t,3));
   if(t===1)turn=null;
  }else if(last&&!paused&&!orbit.contains(document.activeElement))phase+=Math.min(now-last,50)*Math.PI*2/55000;
  last=now;draw();frame=requestAnimationFrame(tick);
 }
 function run(){last=0;if(!frame&&visible&&!document.hidden&&!reduced.matches)frame=requestAnimationFrame(tick);draw()}
 function bringForward(index){
  if(turn)return;
  const target=Math.PI/2-index*Math.PI*2/cards.length;
  const delta=Math.atan2(Math.sin(target-phase),Math.cos(target-phase));
  paused=true;
  if(reduced.matches){phase+=delta;draw();return;}
  turn={from:phase,delta,start:performance.now()};run();
 }
 cards.forEach((card,i)=>{
  card.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch')bringForward(i)});
  card.addEventListener('focus',()=>bringForward(i));
 });
 orbit.addEventListener('pointerenter',()=>{paused=true});
 orbit.addEventListener('pointerleave',()=>{paused=false});
 new ResizeObserver(draw).observe(orbit);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;run()}).observe(orbit);
 reduced.addEventListener('change',run);document.addEventListener('visibilitychange',run);
 function route(){
  const id=location.hash.slice(1);
  const details=[...document.querySelectorAll('.bts-detail')];
  details.forEach(el=>{el.hidden=el.id!==id});
  document.dispatchEvent(new CustomEvent('bts-view',{detail:id}));
  const target=document.getElementById(['swim-bts-script','swim-bts-storyboard','swim-bts-characters','swim-bts-tone','swim-bts-sets'].includes(id)?'swim-bts':id);
  if(target&&(id==='swim-bts'||['swim-bts-script','swim-bts-storyboard','swim-bts-characters','swim-bts-tone','swim-bts-sets'].includes(id)||target.classList.contains('bts-detail'))){
   requestAnimationFrame(()=>{dispatchEvent(new Event('resize'));requestAnimationFrame(()=>target.scrollIntoView({behavior:'instant',block:'start'}));});
  }
 }
 document.addEventListener('bts-route',route);
 addEventListener('hashchange',route);route();draw();
})();
