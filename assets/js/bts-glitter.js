/* Original canvas star tunnel inspired by the public Glitter Warp preview. */
(() => {
 const section=document.getElementById('swim-bts');
 const canvas=document.createElement('canvas');
 canvas.className='bts-glitter';canvas.setAttribute('aria-hidden','true');section.prepend(canvas);
 const ctx=canvas.getContext('2d');if(!ctx)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let width=1,height=1,visible=false,raf=0,last=0,time=0;
 const stars=Array.from({length:220},()=>({angle:Math.random()*Math.PI*2,r:.18+Math.random()*.9,z:Math.random(),seed:Math.random()*6.28,size:.4+Math.random()*.8}));
 function paint(dt){
  time+=dt;ctx.clearRect(0,0,width,height);
  const light=document.documentElement.dataset.theme==='light';
  const cx=width*.5,cy=height*.57,unit=Math.max(width,height)*.37;
  for(const s of stars){
   s.z-=dt*.000075;if(s.z<.04)s.z+=.96;
   const angle=s.angle+time*.000009;
   const radius=s.r*unit/(s.z+.18);
   const x=cx+Math.cos(angle)*radius,y=cy+Math.sin(angle)*radius*.7;
   if(x<0||x>width||y<0||y>height)continue;
   const shimmer=.65+.35*Math.sin(time*.0018+s.seed);
   const alpha=Math.min(.85,(1-s.z)*.9)*shimmer;
   const trail=2+(1-s.z)**3*22;
   ctx.strokeStyle=light?`rgba(60,85,115,${alpha*.7})`:`rgba(215,230,255,${alpha})`;
   ctx.lineWidth=s.size;ctx.beginPath();
   ctx.moveTo(x,y);ctx.lineTo(x-Math.cos(angle)*trail,y-Math.sin(angle)*trail*.7);ctx.stroke();
   if(s.seed>5.9){ctx.fillStyle=light?`rgba(70,90,130,${alpha})`:`rgba(224,233,255,${alpha})`;ctx.fillRect(x-.6,y-.6,1.2,1.2);}
  }
 }
 function tick(now){raf=0;if(!visible||document.hidden||reduced.matches)return;const dt=last?Math.min(40,now-last):0;last=now;paint(dt);raf=requestAnimationFrame(tick)}
 function run(){last=0;if(!visible||document.hidden||reduced.matches){if(raf)cancelAnimationFrame(raf);raf=0;paint(0);return;}if(!raf)raf=requestAnimationFrame(tick)}
 function resize(){width=section.clientWidth;height=section.clientHeight;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);paint(0)}
 new ResizeObserver(resize).observe(section);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;run()}).observe(section);
 new MutationObserver(()=>paint(0)).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
 document.addEventListener('visibilitychange',run);reduced.addEventListener('change',run);resize();
})();
