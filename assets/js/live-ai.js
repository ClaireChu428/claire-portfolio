(() => {
const section=document.getElementById('live-action-ai');
document.getElementById('live-ai-play').addEventListener('click',()=>{const video=document.createElement('video');video.src='assets/videos/kuaishou-14.mp4';video.controls=true;video.playsInline=true;video.autoplay=true;document.getElementById('live-ai-video-1').replaceChildren(video);video.play().catch(()=>{})});
new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)section.querySelector('video')?.pause()},{threshold:.15}).observe(section);
})();
