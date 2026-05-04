const FLEX_CACHE = 'flex-hosted-v2-static-export';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/icons/flex_icon_192.png',
  './assets/icons/flex_icon_512.png',
  './assets/maps/kanto_map.jpg',
  './assets/maps/sevii_123_map.jpg',
  './assets/maps/sevii_45_map.jpg',
  './assets/maps/sevii_67_map.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(FLEX_CACHE).then(cache => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
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


  if (url.pathname.includes('/data/')) {
    event.respondWith(
      fetch(req, { cache: 'no-cache' }).then(res => {
        const copy = res.clone();
        caches.open(FLEX_CACHE).then(cache => cache.put(req, copy));
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }

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
