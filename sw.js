var CACHE_NAME = 'pwa-core-eternal-final-v2'; 

var urlsToCache = [
  './',
  './index.html',
  './icon.png',
  './manifest.json' // ここに新しいマニフェストファイルも追加しておくと確実です
];

// インストール処理
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// リクエスト処理
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response ? response : fetch(event.request);
      })
  );
});



