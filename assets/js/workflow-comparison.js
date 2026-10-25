(() => {
const section=document.getElementById('ai-cg-workflow'),panels=[...section.querySelectorAll('.workflow-panel')];
const pause=document.getElementById('workflow-pause');let active=panels[0],visible=false,paused=false,starting=false,run=0;
const videos=p=>[...p.querySelectorAll('video')];
async function start(reset=false){const token=++run;const pair=videos(active);starting=true;
try{await Promise.all(pair.map(v=>v.readyState>=2?Promise.resolve():new Promise(resolve=>{v.addEventListener('loadeddata',resolve,{once:true});v.addEventListener('error',resolve,{once:true});v.load()})));
if(token!==run||!visible||paused)return;const length=Math.max(...pair.map(v=>v.duration||0));pair.forEach(v=>{if(length&&v.duration)v.playbackRate=v.duration/length});if(reset)pair.forEach(v=>v.currentTime=0);await Promise.all(pair.map(v=>v.play().catch(()=>{})));}finally{if(token===run)starting=false}}
function select(panel){if(panel===active)return;run++;videos(active).forEach(v=>v.pause());active=panel;panels.forEach(p=>{p.classList.toggle('is-active',p===active);p.querySelector('button').setAttribute('aria-expanded',p===active)});if(visible&&!paused)start(true)}
panels.forEach(panel=>{panel.addEventListener('mouseenter',()=>select(panel));const button=panel.querySelector('button');button.addEventListener('click',()=>select(panel));button.addEventListener('focus',()=>select(panel));videos(panel).forEach(v=>{v.muted=true;v.addEventListener('ended',()=>{if(panel===active&&visible&&!paused)start(true)})})});
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&!paused)start();else{run++;panels.forEach(p=>videos(p).forEach(v=>v.pause()))}},{threshold:.5}).observe(section);
pause.addEventListener('click',()=>{paused=!paused;pause.textContent=paused?'继续播放':'暂停播放';if(paused){run++;videos(active).forEach(v=>v.pause())}else start()});
document.getElementById('workflow-replay').addEventListener('click',()=>{paused=false;pause.textContent='暂停播放';start(true)});
setInterval(()=>{if(!visible||paused||starting)return;const [a,b]=videos(active);if(a.readyState<3||b.readyState<3){a.pause();b.pause();return}if(a.paused||b.paused){start();return}const target=a.currentTime/a.duration*b.duration;if(Number.isFinite(target)&&Math.abs(target-b.currentTime)>.15)b.currentTime=Math.min(target,b.duration)},200);
})();
