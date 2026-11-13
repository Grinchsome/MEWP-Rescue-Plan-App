// A release is installed atomically; the old release stays active until requested.
const RELEASE = '0.18.2-ee5c07ff4608';
const PREFIX = 'mewp-ready-' + encodeURIComponent(self.registration.scope) + '-';
const CACHE = PREFIX + RELEASE;
const FILES = ['./', './index.html', './pwa.js', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png'];
const absolute = path => new URL(path, self.registration.scope).href;
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES.map(path => new Request(absolute(path), {cache:'reload'})))));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(n => n.startsWith(PREFIX) && n !== CACHE).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => {
  if (event.data?.type === 'ACTIVATE_UPDATE') { self.skipWaiting(); return; }
  if (event.data?.type === 'CACHE_STATUS') {
    event.waitUntil((async () => {
      const cache = await caches.open(CACHE);
      const files = await Promise.all(FILES.map(f => cache.match(absolute(f))));
      event.ports[0]?.postMessage({ready:files.every(Boolean), release:RELEASE});
    })());
  }
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  // External manufacturer links and unrelated repository files are never intercepted.
  const isHome = url.pathname === new URL('./', self.registration.scope).pathname || url.pathname === new URL('./index.html', self.registration.scope).pathname;
  const isAsset = FILES.slice(2).some(f => new URL(f, self.registration.scope).pathname === url.pathname);
  if (!isHome && !isAsset) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(isHome ? absolute('./index.html') : url.origin + url.pathname);
    return cached || fetch(event.request);
  })());
});
