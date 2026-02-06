// バージョン名を変更して強制更新させる（v3 -> v4）
var CACHE_NAME = 'pwa-core-eternal-final-v4'; 

// URLを「/CORE-ETERNAL/」から始まる絶対パスに変更
var urlsToCache = [
  '/CORE-ETERNAL/',
  '/CORE-ETERNAL/index.html',
  '/CORE-ETERNAL/icon.png',
  '/CORE-ETERNAL/manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // キャッシュがあればそれを返す、なければネットワークへ
        return response || fetch(event.request);
      })
  );
});

// 古いキャッシュを削除（これが重要です）
self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
