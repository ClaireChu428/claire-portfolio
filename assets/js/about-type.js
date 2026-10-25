(() => {
 const title=document.getElementById('about-heading');if(!title)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');if(reduced.matches)return;
 title.setAttribute('aria-label',title.textContent);let index=0;
 const walker=document.createTreeWalker(title,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 nodes.forEach(node=>{const fragment=document.createDocumentFragment();[...node.textContent].forEach(c=>{const span=document.createElement('span');span.className='about-type-char';span.style.setProperty('--char-index',index++);span.setAttribute('aria-hidden','true');span.textContent=c;fragment.append(span)});node.replaceWith(fragment)});
 new IntersectionObserver(([entry])=>title.classList.toggle('about-typing',entry.isIntersecting),{threshold:.5}).observe(title);
})();