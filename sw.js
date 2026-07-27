const CACHE = "berna-v7.1-cache-v2-flat-assets";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.webmanifest",
  "././room.png",
  "././miki-card.png",
  "././nav-home.png",
  "././nav-focus.png",
  "././nav-agenda.png",
  "././nav-miki.png",
  "././nav-progress.png",
  "././wallpaper.png",
  "././floor.png",
  "././window.png",
  "././bed.png",
  "././rug.png",
  "././plant.png",
  "././shelf.png",
  "././lamp.png",
  "././toy.png",
  "././coin.png",
  "././sun.png",
  "././tomato.png",
  "././cat-head.png",
  "././house.png",
  "././basket.png"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match("./index.html"))));
});
