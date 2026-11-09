(function(){
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){dataLayer.push(arguments)};
  var s=document.createElement('script'); s.async=true; s.src='https://www.googletagmanager.com/gtag/js?id=G-PLACEHOLDER'; document.head.appendChild(s);
  gtag('js',new Date()); gtag('config','G-PLACEHOLDER',{anonymize_ip:true});
  var params=new URLSearchParams(location.search), keys=['utm_source','utm_medium','utm_campaign','utm_content'];
  keys.forEach(function(k){if(params.get(k))sessionStorage.setItem(k,params.get(k))});
  function event(name,p){try{gtag('event',name,p||{})}catch(e){}}
  window.FadeClubAnalytics={event:event};
  document.addEventListener('click',function(e){var el=e.target.closest('[data-event]'); if(!el)return; var name=el.dataset.event,p={}; Array.from(el.attributes).forEach(function(a){if(a.name.indexOf('data-')===0&&a.name!=='data-event')p[a.name.slice(5).replaceAll('-','_')]=a.value}); event(name,p)});
  document.addEventListener('click',function(e){var a=e.target.closest('a[href]'); if(!a)return; var href=a.href||''; if(/^tel:|^mailto:/.test(href))event('contact_click',{contact_type:href.indexOf('tel:')===0?'phone':'email'}); if(/^https?:/.test(href)&&new URL(href).origin!==location.origin)event('click',{link_url:href.slice(0,100),outbound:true}); if(a.dataset.social)event('social_click',{network:a.dataset.social,page_section:a.dataset.section||'footer'}); if(a.dataset.messenger)event('messenger_click',{messenger:a.dataset.messenger})});
  var started={}; document.addEventListener('focusin',function(e){var f=e.target.closest('form');if(f&&!started[f.id]){started[f.id]=true;event('form_start',{form_id:f.id||'form'})}});
  document.addEventListener('change',function(e){if(e.target.matches('[data-event-change]')){event(e.target.dataset.eventChange,Object.assign({},e.target.dataset.eventParams?JSON.parse(e.target.dataset.eventParams):{}, {value:e.target.value}))}});
  var sent=false; window.addEventListener('scroll',function(){if(sent)return; var h=document.documentElement.scrollHeight-window.innerHeight; if(h>0&&window.scrollY/h>.9){sent=true;event('scroll',{percent_scrolled:90})}},{passive:true});
  document.querySelectorAll('[data-file-download]').forEach(function(a){a.addEventListener('click',function(){var n=a.getAttribute('href').split('/').pop();event('file_download',{file_name:n,file_extension:n.split('.').pop()})})});
})();
