(() => {
 document.getElementById('silas-play').addEventListener('click', () => {
 const player = document.createElement('iframe');
 player.src = 'https://player.bilibili.com/player.html?bvid=BV1mr4tzGE1E&page=1&autoplay=1&high_quality=1';
 player.title = '数字音乐人SILAS首发单曲mv《问》';
 player.allow = 'autoplay; fullscreen; picture-in-picture'; player.allowFullscreen = true;
 document.getElementById('silas-video').replaceChildren(player);
 });
})();
