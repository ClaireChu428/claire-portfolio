/* Shared pointer for all current and future pages. */
(() => {
 const url=new URL('../images/menu-cursor.svg',document.currentScript.src).href;
 const style=document.createElement('style');
 style.textContent='@media(hover:hover) and (pointer:fine){html :is(body,#site-pointer),html :is(body,#site-pointer) *{cursor:url("'+url+'") 6 4,auto!important}.cursor,.cursor-probe{display:none!important}}';
 document.head.appendChild(style);
})();
