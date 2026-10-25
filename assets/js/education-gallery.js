(() => {
const section=document.getElementById('ai-education'),cards=[...section.querySelectorAll('.education-card')],autoButton=section.querySelector('.education-auto');
let index=0,visible=false,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,timer,startX=0;
const dialog=document.createElement('dialog');dialog.className='aica-lightbox';dialog.setAttribute('aria-label','教育活动图片');const close=document.createElement('button');close.type='button';close.textContent='关闭 ×';close.setAttribute('aria-label','关闭教育图片');const image=document.createElement('img');dialog.append(close,image);document.body.append(dialog);
function schedule(){clearInterval(timer);if(visible&&!paused&&!document.hidden&&!dialog.open)timer=setInterval(()=>select(index+1),6500)}
function render(){cards.forEach((card,i)=>{let distance=(i-index+cards.length)%cards.length;if(distance>3)distance-=cards.length;card.style.transform=`translateX(calc(-50% + ${distance*90}%)) scale(${distance===0?1:.9})`;card.classList.toggle('is-current',i===index);card.tabIndex=Math.abs(distance)<=1?0:-1;card.setAttribute('aria-current',String(i===index))});section.querySelector('.education-counter').textContent=String(index+1).padStart(2,'0')+' / 06';autoButton.textContent=paused?'自动轮播':'暂停轮播'}
function select(next){index=(next+cards.length)%cards.length;render();schedule()}
function zoom(){const source=cards[index].querySelector('img');image.src=source.src;image.alt=source.alt;dialog.showModal();dialog.scrollTop=0;schedule()}
cards.forEach((card,i)=>card.addEventListener('click',()=>{if(i===index)zoom();else select(i)}));
section.querySelector('.education-prev').addEventListener('click',()=>select(index-1));section.querySelector('.education-next').addEventListener('click',()=>select(index+1));
autoButton.addEventListener('click',()=>{paused=!paused;render();schedule()});close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('close',schedule);
section.querySelector('.education-carousel').addEventListener('touchstart',e=>{startX=e.touches[0].clientX},{passive:true});section.querySelector('.education-carousel').addEventListener('touchend',e=>{const dx=startX-e.changedTouches[0].clientX;if(Math.abs(dx)>45)select(index+(dx>0?1:-1))},{passive:true});
section.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();select(index+1)}if(e.key==='ArrowLeft'){e.preventDefault();select(index-1)}});
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{threshold:.6}).observe(section);document.addEventListener('visibilitychange',schedule);render();
})();
