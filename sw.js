var CACHE_NAME = 'core-eternal-strict-v7';

var urlsToCache = [
  '/CORE-ETERNAL/index.html',  // start_urlと完全に一致させる（最重要）
  '/CORE-ETERNAL/',            // 念のためルートも確保
  '/CORE-ETERNAL/icon.png',
  '/CORE-ETERNAL/manifest.json'
];

self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        // キャッシュになくてもネットワークに取りに行く
        return fetch(event.request);
      })
  );
});
