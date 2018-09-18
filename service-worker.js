const cacheName = 'v1';

// Installs service worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v2').then(function(cache) {
      return cache.addAll([
        'index.html',
        'restaurant.html',
        'css/styles.css',
        'data/restaurants.json',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg',
        'js/dbhelper.js',
        'js/main.js',
        'js/restaurant_info.js'
      ]);
    })
  );
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
