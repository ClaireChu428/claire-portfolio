(() => {
const dialog=document.createElement('dialog');dialog.className='aica-lightbox';dialog.setAttribute('aria-label','社群活动资料大图');
const close=document.createElement('button');close.type='button';close.textContent='关闭 ×';close.setAttribute('aria-label','关闭社群资料大图');
const image=document.createElement('img');dialog.append(close,image);document.body.append(dialog);
document.querySelectorAll('.aica-image').forEach(button=>button.addEventListener('click',()=>{const source=button.querySelector('img');image.src=source.src;image.alt=source.alt;dialog.showModal();dialog.scrollTop=0}));
close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
})();
