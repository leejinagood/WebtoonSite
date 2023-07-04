// service-worker.js

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-react-app').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/path/to/your/static/assets', // 필요한 정적 자산 파일들의 경로를 추가합니다.
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  