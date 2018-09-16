const cacheName = 'v1';

// Installs service worker
self.addEventListener('install', function(event) {
  return;
});

// Activates service worker and clears existing caches that don't match the name
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Sends a fetch request and adds files to the cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        // Copies fetched files to a cache named fileStorage
        const fileStorage = response.clone();
        caches.open(cacheName).then(function(cache) {
          cache.put(event.request, fileStorage);
        });
        return response;
      })
      //
      .catch(function(error) {
        caches.match(event.request).then(function(response) {
          return response;
        });
      })
  );
});
