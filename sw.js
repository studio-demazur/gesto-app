/* Linen, Studio DeMazur: l'app intera resta sul dispositivo e si apre senza rete. Versione legata al contenuto dell'app. */
const V='gesto-993667bdd340',FILE=['./','index.html','manifest.webmanifest','icone/icon-192.png?r=2','icone/icon-512.png?r=2','icone/icon-maskable-512.png','icone/apple-touch-icon.png','icone/favicon-32.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>(n.startsWith('lavagna-')||n.startsWith('gesto-'))&&n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin)return;
  e.respondWith(caches.open(V).then(c=>c.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(x=>{if(x.ok)c.put(e.request,x.clone());return x}).catch(()=>c.match('index.html')))));
});
