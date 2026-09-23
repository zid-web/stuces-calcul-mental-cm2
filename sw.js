/* Mise à jour automatique : la page (index.html) et le manifeste sont
   demandés au réseau D'ABORD, à chaque ouverture ; le cache ne sert qu'en
   secours, sans connexion. Une nouvelle version publiée arrive donc toute
   seule sur les appareils où l'appli est installée, sans rien incrémenter.
   Les icônes, qui ne changent pas, restent servies depuis le cache. */
const CACHE_NAME = 'maths-malin';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
/* au-delà, une connexion trop lente cède la place au cache */
const DELAI_RESEAU = 4000;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS.map((u) => new Request(u, { cache: 'reload' }))))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

function estPage(req, url) {
  return req.mode === 'navigate' || /\/(index\.html|manifest\.json)?$/.test(url.pathname);
}

async function reseauDabord(req) {
  const cache = await caches.open(CACHE_NAME);
  /* cache: 'no-cache' revalide auprès du serveur au lieu de relire le cache HTTP */
  const reseau = fetch(req.url, { cache: 'no-cache' }).then((rep) => {
    if (rep && rep.ok) cache.put(req.url, rep.clone());
    return rep;
  });
  const secours = async () => (await cache.match(req.url)) || (await cache.match('./index.html')) || (await cache.match('./'));
  try {
    const delai = new Promise((_, rejeter) => setTimeout(() => rejeter(new Error('lent')), DELAI_RESEAU));
    return await Promise.race([reseau, delai]);
  } catch (e) {
    /* hors ligne ou trop lent : la version en cache, sinon on attend quand même le réseau */
    return (await secours()) || reseau;
  }
}

async function cacheDabord(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  const rep = await fetch(req);
  if (rep && rep.ok) { const cache = await caches.open(CACHE_NAME); cache.put(req, rep.clone()); }
  return rep;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  /* les requêtes HEAD de la vérification de version passent sans détour */
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(estPage(req, url) ? reseauDabord(req) : cacheDabord(req));
});
