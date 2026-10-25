/* Text entrances preserve real responsive line breaks and semantic emphasis. */
(() => {
 document.querySelectorAll('.project-page:not(.closing-page)').forEach(section => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const title=section.querySelector('h1');
 const blocks=[...section.querySelectorAll('h2'),...section.querySelectorAll('.project-description > p:not(.project-results)'),...section.querySelectorAll('.results-line')].filter(el=>el && !(section.id==='swim-bts' && el.tagName==='H2'));
 const originals=new Map([title,...blocks].map(el=>[el,el.innerHTML]));
 let active=false,ready=false,timer;
 function restore(){for(const [el,html] of originals){el.innerHTML=html;el.removeAttribute('aria-label');}}
 function build(){
  section.classList.remove('text-entering');restore();
  if(reduced.matches){ready=false;return;}
  title.setAttribute('aria-label',title.textContent);
  const chars=document.createElement('span');chars.setAttribute('aria-hidden','true');
  [...title.textContent].forEach((c,i)=>{const span=document.createElement('span');span.className='type-character';span.style.setProperty('--char-index',i);span.textContent=c;chars.append(span)});
  title.replaceChildren(chars);
  let resultIndex=0;
  for(const el of blocks){
   const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const lines=[];let node;
   while(node=walker.nextNode()){
    for(let offset=0;offset<node.length;){
     const length=node.textContent.codePointAt(offset)>65535?2:1;
     const range=document.createRange();range.setStart(node,offset);range.setEnd(node,offset+length);
     const rect=range.getBoundingClientRect();let line=lines[lines.length-1];
     if(!line||Math.abs(line.top-rect.top)>3){line={top:rect.top,startNode:node,startOffset:offset};lines.push(line)}
     line.endNode=node;line.endOffset=offset+length;offset+=length;
    }
   }
   const fragment=document.createDocumentFragment();
   lines.forEach((line,i)=>{const range=document.createRange();range.setStart(line.startNode,line.startOffset);range.setEnd(line.endNode,line.endOffset);const mask=document.createElement('span');mask.className='text-line-mask';mask.setAttribute('aria-hidden','true');const inner=document.createElement('span');inner.className='text-line-rise';inner.style.setProperty('--line-index',el.classList.contains('results-line')?resultIndex++:i);inner.append(range.cloneContents());mask.append(inner);fragment.append(mask)});
   el.setAttribute('aria-label',el.textContent);el.replaceChildren(fragment);
  }
  ready=true;
  if(active)section.classList.add('text-entered');else section.classList.remove('text-entered');
  check();
 }
 function check(){
  if(!ready)return;
  const rect=section.getBoundingClientRect();const visible=rect.top<innerHeight*.55&&rect.bottom>innerHeight*.45;
  if(visible&&!active&&ready){section.classList.remove('text-entered');section.classList.add('text-entering');}
  if(!visible&&active){section.classList.remove('text-entering','text-entered');}
  active=visible;
 }
 addEventListener('scroll',check,{passive:true});
 addEventListener('resize',()=>{clearTimeout(timer);timer=setTimeout(build,150)});
 reduced.addEventListener('change',build);
 document.fonts.ready.then(build);
 });
})();
