document.querySelectorAll('.hybrid-play').forEach(button=>button.addEventListener('click',()=>{
const player=document.createElement('iframe');player.src='https://player.bilibili.com/player.html?bvid='+button.dataset.bvid+'&page=1&autoplay=1&high_quality=1';player.title=button.getAttribute('aria-label').replace(/^播放/,'');player.allow='autoplay; fullscreen; picture-in-picture';player.allowFullscreen=true;button.parentElement.replaceChildren(player);
}));
