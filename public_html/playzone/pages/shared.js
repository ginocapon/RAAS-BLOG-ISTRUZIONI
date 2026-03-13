/* HAMBURGER */
function toggleMenu(){document.querySelector('.hamburger').classList.toggle('active');document.getElementById('mobileMenu').classList.toggle('active');document.body.style.overflow=document.getElementById('mobileMenu').classList.contains('active')?'hidden':''}

/* BROBOT WIDGET */
function toggleBrobot(){document.getElementById('brobotWindow').classList.toggle('active')}
const _BR={ciao:['Yo bro! 🎮','Hey! Pronto? 🕹️'],gioco:['Prova Pixel Quest! 🎯','Cookie Empire spacca!','Neon Runner è top! 🔥'],puzzle:['Block Smash spacca! 🧩','Color Match dopo lvl 20 è insano!'],idle:['Lascia il gioco in background! 💰','Cookie Empire: investi nei grandfathers!'],consiglio:['Fai il quiz personalità! 🧠','Dipende dal mood: relax=idle, adrenalina=arcade!'],trucco:['Nei puzzle inizia dagli angoli! 🧩','Nei racing doppio tap per turbo! 🏎️'],pro:['PRO = zero ads + skin esclusive! ⚡','Prezzi in definizione, stay tuned! 💎'],default:['Dimmi di più bro! 🤔','Chiedi di giochi, trucchi o PRO! 🎮','Prova il quiz personalità! 🧠']};
function _getBR(m){const l=m.toLowerCase();for(const[k,r]of Object.entries(_BR)){if(k!=='default'&&l.includes(k))return r[Math.floor(Math.random()*r.length)]}return _BR.default[Math.floor(Math.random()*_BR.default.length)]}
function sendBrobotMsg(){const i=document.getElementById('brobotInput'),m=i.value.trim();if(!m)return;const c=document.getElementById('brobotMessages');c.innerHTML+='<div class="brobot__msg brobot__msg--user">'+m+'</div>';i.value='';c.scrollTop=c.scrollHeight;setTimeout(()=>{c.innerHTML+='<div class="brobot__msg brobot__msg--bot">'+_getBR(m)+'</div>';c.scrollTop=c.scrollHeight},500+Math.random()*700)}

/* SCROLL REVEAL */
const _obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');_obs.unobserve(x.target)}})},{threshold:.1});
document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.reveal').forEach(el=>_obs.observe(el))});