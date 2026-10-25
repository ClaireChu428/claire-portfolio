(() => {
 const main=document.querySelector('.audi-main img');
 const dialog=document.querySelector('.audi-lightbox');
 document.body.append(dialog);
 document.querySelectorAll('.audi-thumb').forEach(button=>button.addEventListener('click',()=>{
 const thumb=button.querySelector('img');const src=main.getAttribute('src'),alt=main.alt;
 main.src=thumb.src;main.alt=thumb.alt;thumb.src=src;thumb.alt=alt;button.setAttribute('aria-label','查看'+alt);
 }));
 document.querySelector('.audi-main').addEventListener('click',()=>{dialog.querySelector('img').src=main.src;dialog.showModal()});
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
})();
