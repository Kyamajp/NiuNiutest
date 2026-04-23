const CACHE_NAME="niuniu-v83";
const ASSETS=["./","./index.html","./manifest.json","./icons/icon-192x192.png","./icons/icon-512x512.png","./icons/icon-180x180.png","./icons/icon-maskable-512x512.png"];
self.addEventListener("install",function(e){
  e.waitUntil(caches.open(CACHE_NAME).then(function(c){return c.addAll(ASSETS);}));
  self.skipWaiting();
});
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){if(k!==CACHE_NAME)return caches.delete(k);}));
  }));
  self.clients.claim();
});
self.addEventListener("fetch",function(e){
  e.respondWith(fetch(e.request).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match("./index.html");});}));
});
