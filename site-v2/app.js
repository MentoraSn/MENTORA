document.documentElement.classList.add('js');
const $=(sel,ctx=document)=>ctx.querySelector(sel);
const $$=(sel,ctx=document)=>Array.from(ctx.querySelectorAll(sel));
const nav=$('#siteNav'),toggle=$('#menuToggle'),dialog=$('#requestDialog'),form=$('#requestForm');
const closeMenu=()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Ouvrir le menu');};
toggle.addEventListener('click',()=>{const active=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(active));toggle.setAttribute('aria-label',active?'Fermer le menu':'Ouvrir le menu');});
$$('#siteNav a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const knownServices=Array.from($('#serviceSelect').options).map(o=>o.value);
function openRequest(service){
 form.reset();
 if(knownServices.includes(service)) $('#serviceSelect').value=service;
 dialog.showModal();
 setTimeout(()=>form.elements.nom.focus(),30);
}
$$('[data-request]').forEach(btn=>btn.addEventListener('click',()=>openRequest(btn.dataset.request||'Demande générale')));
$('#dialogClose').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
form.addEventListener('submit',e=>{
 e.preventDefault();
 if(!form.reportValidity()) return;
 const data=new FormData(form);
 const val=k=>String(data.get(k)||'').trim();
 const lines=[
 'Bonjour Mentor