(() => {
 const button = document.getElementById('luna-play');
 button.addEventListener('click', () => {
  const player = document.createElement('iframe');
  player.src = 'https://player.bilibili.com/player.html?bvid=BV1zAWGzGESe&page=1&autoplay=1&high_quality=1';
  player.title = '数字音乐人 Luna 首发单曲 MV《New Born》';
  player.allow = 'autoplay; fullscreen; picture-in-picture';
  player.allowFullscreen = true;
  document.getElementById('luna-video').replaceChildren(player);
 });
})();
