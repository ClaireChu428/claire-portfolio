(() => {
 document.querySelectorAll('.production-gallery').forEach(gallery=>{
 const images=[...gallery.querySelectorAll('img')];
 function sizeImages(){
  if(images.some(img=>!img.naturalWidth))return;
  const ratios=images.map(img=>img.naturalWidth/img.naturalHeight);
  if(gallery.closest('.schedule-page')){
   const gap=parseFloat(getComputedStyle(gallery).rowGap)||0;
   const columnGap=parseFloat(getComputedStyle(gallery).columnGap)||0;
   const rightRatio=1/(1/ratios[0]+1/ratios[1]);
   const rightWidth=Math.min((gallery.clientWidth-columnGap)/2.3,(gallery.clientHeight-gap)*rightRatio);
   gallery.style.setProperty('--schedule-right-width',rightWidth+'px');
   gallery.style.setProperty('--schedule-left-width',Math.min(gallery.clientWidth-columnGap-rightWidth,gallery.clientHeight*ratios[2])+'px');
   return;
  }
  const gap=parseFloat(getComputedStyle(gallery).gap)||0;
  const height=Math.min(gallery.clientHeight,(gallery.clientWidth-gap*(images.length-1))/ratios.reduce((a,b)=>a+b,0));
  gallery.style.setProperty('--production-image-height',height+'px');
  images.forEach((img,i)=>img.parentElement.style.setProperty('--image-ratio',ratios[i]));
 }
 images.forEach(img=>img.addEventListener('load',sizeImages));new ResizeObserver(sizeImages).observe(gallery);sizeImages();
 });
 const dialog=document.createElement('dialog');dialog.className='production-dialog';dialog.setAttribute('aria-label','制作资料大图');
 const bar=document.createElement('div');bar.className='production-dialog-tools';
 const size=document.createElement('button'),close=document.createElement('button'),image=document.createElement('img');size.type=close.type='button';size.textContent='原始尺寸';close.textContent='关闭 ×';bar.append(size,close);dialog.append(bar,image);document.body.append(dialog);
 size.addEventListener('click',()=>{const original=dialog.classList.toggle('is-original');size.textContent=original?'适应窗口':'原始尺寸'});
 close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 document.querySelectorAll('.production-image').forEach(button=>button.addEventListener('click',()=>{const source=button.querySelector('img');image.src=source.src;image.alt=source.alt;dialog.classList.remove('is-original');size.textContent='原始尺寸';dialog.showModal();dialog.scrollTop=0;dialog.scrollLeft=0}));
})();
