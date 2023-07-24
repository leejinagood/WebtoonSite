self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        // return cache.addAll(['/api/daytoon?day=All']);
                return cache.addAll(['/api/daytoon?day=All', '/']);

      })
    );
  });
  
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((res) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, res.clone());
            return res;
          });
        });
      }).catch(() => {
        // If both the cache and network fail, return a fallback response here
        return new Response("Fallback response content here", { headers: { "Content-Type": "text/plain" } });
      })
    );
  });