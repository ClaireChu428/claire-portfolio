(() => {
 document.getElementById('gillette-play').addEventListener('click',()=>{
 const player=document.createElement('iframe');
 player.src='https://player.bilibili.com/player.html?bvid=BV1orgY6SETE&page=1&autoplay=1&high_quality=1';
 player.title='吉列与奥迪Revolut F1车队联名广告';player.allow='autoplay; fullscreen; picture-in-picture';player.allowFullscreen=true;
 document.getElementById('gillette-video').replaceChildren(player);
 });
})();
