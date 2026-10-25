(() => {
 const section=document.getElementById('swim-bts'),heading=section.querySelector('h2'),orbit=section.querySelector('.bts-orbit'),help=section.querySelector('.bts-help'),panel=section.querySelector('.bts-script-panel'),paragraph=panel.querySelector('p');
 const gallery=document.createElement('div');gallery.className='bts-tone-gallery';gallery.hidden=true;gallery.setAttribute('aria-label','影调剧照画廊');
 const galleryButtons=[];
 function selectImage(index){galleryButtons.forEach((button,i)=>{button.classList.toggle('is-active',i===index);button.setAttribute('aria-pressed',String(i===index))})}
 for(let i=0;i<7;i++){
  const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',`查看第 ${i+1} 张剧照`);
  const image=document.createElement('img');image.src=`assets/images/swim-tone-${String(i+1).padStart(2,'0')}.png`;image.alt='';image.loading='lazy';button.append(image);gallery.append(button);galleryButtons.push(button);
  button.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')selectImage(i)});button.addEventListener('focus',()=>selectImage(i));button.addEventListener('click',()=>selectImage(i));
  button.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();galleryButtons[(i+(e.key==='ArrowRight'?1:6))%7].focus()}});
 }
 panel.querySelector('.bts-script-layout').append(gallery);selectImage(0);
 const toneObserver=new ResizeObserver(()=>{if(!gallery.clientWidth)return;const w=gallery.clientWidth,strip=w<500?12:Math.min(38,w*.035),gap=w<500?4:7;const layout=panel.querySelector('.bts-script-layout');const available=innerWidth>640?Math.max(80,layout.clientHeight-paragraph.parentElement.offsetHeight-42):Infinity;const expanded=Math.min(w-6*(strip+gap),available*1280/548);gallery.style.setProperty('--strip',strip+'px');gallery.style.setProperty('--gallery-gap',gap+'px');gallery.style.setProperty('--expanded',expanded+'px');gallery.style.height=(expanded*548/1280)+'px';gallery.style.justifyContent='center'});toneObserver.observe(panel.querySelector('.bts-script-layout'));toneObserver.observe(gallery);
 const sets=document.createElement('div');sets.className='bts-sets-gallery';sets.hidden=true;
 const zoom=document.createElement('dialog');zoom.className='bts-image-dialog';zoom.setAttribute('aria-label','场景设计大图');
 const close=document.createElement('button');close.type='button';close.textContent='关闭 ×';close.className='bts-image-close';close.addEventListener('click',()=>zoom.close());
 const enlarged=document.createElement('div');enlarged.className='bts-set-crop';zoom.append(close,enlarged);document.body.append(zoom);
 zoom.addEventListener('click',e=>{if(e.target===zoom)zoom.close()});
 let setIndex=0,dragStart=null,suppressSetClick=false;
 const setCards=[];
 const bounds=[[90,820],[25,1060],[25,1175],[25,1185],[25,1185],[25,1215]];
 bounds.forEach(([top,bottom],i)=>{
  const button=document.createElement('button');button.className='bts-set-crop';button.type='button';button.setAttribute('aria-label',`放大第 ${i+1} 张场景设计图`);
  button.style.aspectRatio=`905 / ${bottom-top}`;
  const img=document.createElement('img');img.src=`assets/images/swim-sets-${String(i+1).padStart(2,'0')}.png`;img.alt=`场景设计资料 ${i+1}`;img.loading='lazy';
  img.style.top=(-top/(bottom-top)*100)+'%';img.style.height=(1280/(bottom-top)*100)+'%';button.append(img);sets.append(button);setCards.push(button);
  button.addEventListener('click',()=>{if(suppressSetClick)return;if(i!==setIndex){showSet(i);return;}enlarged.style.aspectRatio=button.style.aspectRatio;const large=img.cloneNode();large.loading='eager';enlarged.replaceChildren(large);zoom.showModal();zoom.scrollTop=0});
 });

 const setControls=document.createElement('div');setControls.className='bts-depth-controls';
 const previous=document.createElement('button'),next=document.createElement('button'),count=document.createElement('span');
 previous.type=next.type='button';previous.textContent='‹';next.textContent='›';previous.setAttribute('aria-label','上一张场景设计图');next.setAttribute('aria-label','下一张场景设计图');count.setAttribute('aria-live','polite');
 setControls.append(previous,count,next);sets.append(setControls);
 function showSet(index){
  setIndex=(index+setCards.length)%setCards.length;
  setCards.forEach((card,i)=>{const depth=(i-setIndex+setCards.length)%setCards.length;
   card.style.setProperty('--depth',depth);card.style.zIndex=String(10-depth);card.style.opacity=depth>3?'0':String(1-depth*.2);card.style.pointerEvents=depth>3?'none':'auto';card.tabIndex=depth===0?0:-1;card.setAttribute('aria-hidden',String(depth>3));
  });count.textContent=`${setIndex+1} / ${setCards.length}`;
 }
 previous.addEventListener('click',()=>showSet(setIndex-1));next.addEventListener('click',()=>showSet(setIndex+1));
 sets.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();showSet(setIndex+(e.key==='ArrowRight'?1:-1))}});
 sets.addEventListener('pointerdown',e=>{if(e.target.closest('.bts-depth-controls'))return;dragStart={x:e.clientX,y:e.clientY}});
 window.addEventListener('pointerup',e=>{if(!dragStart)return;const dx=e.clientX-dragStart.x,dy=e.clientY-dragStart.y;dragStart=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){suppressSetClick=true;showSet(setIndex+(dx<0?1:-1));setTimeout(()=>{suppressSetClick=false},100)}});
 sets.addEventListener('pointercancel',()=>{dragStart=null});setCards.forEach(card=>card.querySelector('img').draggable=false);
 const setsObserver=new ResizeObserver(()=>{if(!sets.clientWidth)return;const w=sets.clientWidth,small=matchMedia('(max-width:640px)').matches;const layoutWidth=panel.querySelector('.bts-script-layout').clientWidth;const available=panel.querySelector('.bts-script-layout').clientHeight;const cardWidth=small?(w-12)/2:Math.min((layoutWidth-44)/3,Math.max(90,(available-65)*905/1190));sets.style.setProperty('--card-width',cardWidth+'px');sets.style.height=(cardWidth*1190/905+65)+'px'});setsObserver.observe(panel.querySelector('.bts-script-layout'));setsObserver.observe(sets);
 showSet(0);
 panel.querySelector('.bts-script-layout').append(sets);
 const guideTitle='《洄游》｜幕后创作导览';
 const content={
  'swim-bts-sets':{"title": "场景设计｜从建筑结构到多角度场景的一致性控制", "copy": "针对家庭室内文戏中复杂的调度与长镜头，采用“先确定空间结构，再细化陈设”的开发路径：先拆解家庭场景的空间关系，绘制建筑草图，再通过 GPT Image 2 生成三维全景俯瞰参考，明确房间布局、门窗位置及主要动线；随后使用 Google Nano Banana Pro 生成不同机位与角度的室内场景，逐步统一家具、道具和生活细节。期间曾尝试利用 3D 导演台按景别与角度取景，但因陈设细节的可控性不足，最终回到以结构参考约束多视角生成的方案。在本片的镜头测试中，这一路径较好地维持了大幅度摄影机运动下的空间与陈设连续性，为复杂调度提供了可靠的场景基础。", "image": "swim-sets-01.png", "alt": "《洄游》场景设计资料"},
  'swim-bts-tone':{"title": "影调设计｜场景设计前置控制光影与风格", "copy": "将传统制作中主要由后期调色统一的部分工作前置，在场景图阶段明确全片的色彩倾向、明暗关系、光源方向与材质表现，使不同镜头共享一致的视觉基准。场景设计既承担空间呈现，也参与情绪叙事，让光影与人物状态、段落氛围相互呼应。本项目的生成实践表明，前期对影调与光照关系的统一，有助于减少视频阶段的风格漂移，提高镜头衔接的稳定性。", "image": "swim-tone-01.png", "alt": "《洄游》影调设计剧照"},
  'swim-bts-characters':{"title": "人物设计｜以面部细节支撑真实表演", "copy": "为实现这一目标，将成片对真实感与一致性的要求前置至美术开发。人物设计从参考面孔的骨相、五官比例与轮廓特征出发，融合建立父女之间显化的家族相似性，让亲缘关系在视觉上自然成立。针对人像素材反复修改后出现的细节损耗，遵循扩散模型规律，采用受控加噪与去噪重建，修复面部纹理并校正失真，在保留身份特征的基础上形成清晰、稳定的人物参考，为视频阶段细微表情与情绪变化的生成提供基础。", "image": "swim-bts-characters.png", "alt": "《洄游》人物设计与参考面孔开发图"},
  'swim-bts-script':{title:'剧本构思｜在离散与归返之间，书写客途秋恨',copy:paragraph.textContent,image:'swim-bts-script.png',alt:'《洄游》剧本构思资料'},
  'swim-bts-storyboard':{title:'分镜构思｜以实拍电影的视听标准设计 AI 影像',copy:'《洄游》以电影级写实质感为创作目标，探索 AI 图像与视频生成在人物表演、空间连续性及场景光影上的表现边界。剧本与分镜设计始终以内容表达为先：细腻而有层次的情绪变化、封闭空间内人物与摄影机的协同调度、维系情感连续性的长镜头，以及承载人物生活痕迹的道具细节，都被纳入前期设计。以深受启发的实拍影视作品为镜头参照，从景别、构图、运动与节奏出发组织叙事，再逐一验证实现路径，让技术服务于人物与情感。',image:'swim-bts-storyboard.png',alt:'《洄游》分镜构思资料'}
 };
 let copy=paragraph.textContent,detailTitle='';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let active=false,busy=false,resizeTimer;
 function lines(){
  paragraph.textContent=copy;paragraph.setAttribute('aria-label',copy);
  if(reduced.matches)return;
  const node=paragraph.firstChild,rows=[];
  for(let i=0;i<copy.length;i++){
   const range=document.createRange();range.setStart(node,i);range.setEnd(node,i+1);
   const top=range.getBoundingClientRect().top;let row=rows[rows.length-1];
   if(!row||Math.abs(row.top-top)>3){row={top,text:''};rows.push(row)}row.text+=copy[i];
  }
  paragraph.replaceChildren(...rows.map((row,i)=>{const mask=document.createElement('span');mask.className='text-line-mask';mask.setAttribute('aria-hidden','true');const inner=document.createElement('span');inner.className='text-line-rise';inner.style.setProperty('--line-index',i);inner.textContent=row.text;mask.append(inner);return mask}));
 }
 function show(id){
  const detail=content[id];
  const next=detail?id:false;if(active===next)return;active=next;
  section.classList.toggle('bts-detail-active',!!detail);
  panel.classList.toggle('bts-wide-image',id==='swim-bts-characters');
  panel.classList.toggle('bts-tone-panel',id==='swim-bts-tone');
  gallery.hidden=id!=='swim-bts-tone';
  panel.classList.toggle('bts-sets-panel',id==='swim-bts-sets');
  sets.hidden=id!=='swim-bts-sets';
  if(detail){copy=detail.copy;detailTitle=detail.title;const img=panel.querySelector('img');img.src='assets/images/'+detail.image;img.alt=detail.alt;img.removeAttribute('width');img.removeAttribute('height');}
  orbit.hidden=!!detail;orbit.inert=!!detail;help.hidden=!!detail;panel.hidden=!detail;
  heading.textContent=detail?detailTitle:guideTitle;heading.removeAttribute('aria-label');
  if(detail){
   heading.setAttribute('aria-label',detailTitle);
   if(!reduced.matches){heading.replaceChildren(...[...detailTitle].map((c,i)=>{const span=document.createElement('span');span.textContent=c;span.className='bts-script-heading-char';span.setAttribute('aria-hidden','true');span.style.setProperty('--char-index',i);return span}))}
   panel.classList.add('is-revealing');lines();
  }else{panel.classList.remove('is-revealing')}
 }
 document.addEventListener('bts-view',e=>show(e.detail));
 Object.keys(content).forEach(id=>section.querySelector('a[href="#'+id+'"]').addEventListener('click',async e=>{
  if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  e.preventDefault();if(busy)return;busy=true;
  const card=e.currentTarget,rect=card.getBoundingClientRect();
  if(!reduced.matches){
   const clone=card.cloneNode(true);clone.removeAttribute('href');clone.setAttribute('aria-hidden','true');clone.classList.add('bts-zoom-clone');Object.assign(clone.style,{left:rect.left+'px',top:rect.top+'px',width:rect.width+'px',transform:'none'});document.body.append(clone);
   const fade=orbit.animate([{opacity:1},{opacity:0}],{duration:360,fill:'forwards'});
   try{await clone.animate([{transform:'scale(1)',opacity:1},{transform:'scale(1.6)',opacity:1,offset:.55},{transform:'scale(2.1)',opacity:0}],{duration:520,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'}).finished;}finally{clone.remove();fade.cancel()}
  }
  history.pushState(null,'','#'+id);document.dispatchEvent(new Event('bts-route'));
  panel.querySelector('.bts-return').focus({preventScroll:true});busy=false;
 }));
 panel.querySelector('.bts-return').addEventListener('click',e=>{
  if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  e.preventDefault();const previous=active;history.pushState(null,'','#swim-bts');document.dispatchEvent(new Event('bts-route'));
  section.querySelector('a[href="#'+previous+'"]').focus({preventScroll:true});
 });
 addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(active)lines()},160)});
})();
