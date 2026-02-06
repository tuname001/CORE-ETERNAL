var CACHE_NAME = 'core-eternal-v5-absolute';

// ここも全て絶対パスで指定して、読み込みミスを防ぎます
var urlsToCache = [
  'https://tuname001.github.io/CORE-ETERNAL/',
  'https://tuname001.github.io/CORE-ETERNAL/index.html',
  'https://tuname001.github.io/CORE-ETERNAL/icon.png',
  'https://tuname001.github.io/CORE-ETERNAL/manifest.json'
];

// インストール処理
self.addEventListener('install', function(event) {
  self.skipWaiting(); // 強制的に新しいSWを有効化
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// 古いキャッシュの削除（重要）
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

// フェッチ処理（これが無いとアプリは動きません）
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // キャッシュにあればそれを返す。なければネットワークへ。
        return response || fetch(event.request);
      })
  );
});
