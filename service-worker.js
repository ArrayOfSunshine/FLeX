const FLEX_CACHE = 'flex-hosted-v2-prebuilt-data';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/icons/flex_icon_192.png',
  './assets/icons/flex_icon_512.png',
  './assets/maps/kanto_map.jpg',
  './assets/maps/sevii_123_map.jpg',
  './assets/maps/sevii_45_map.jpg',
  './assets/maps/sevii_67_map.jpg',
  './data/flex-prebuilt-data-gen3.json',
  './data/flex-pokemon-gen3.json',
  './data/flex-species-gen3.json',
  './data/flex-moves-gen3.json',
  './data/flex-abilities-gen3.json',
  './data/flex-encounters-gen3.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(FLEX_CACHE).then(cache => Promise.all(CORE_ASSETS.map(asset => cache.add(asset).catch(err => console.warn('Optional cache skipped', asset, err))))).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== FLEX_CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(FLEX_CACHE).then(cache => cache.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        const copy = res.clone();
        caches.open(FLEX_CACHE).then(cache => cache.put(req, copy));
        return res;
      });
    })
  );
});
