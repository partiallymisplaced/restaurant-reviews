var cacheName = 'rr-app-v1';

// Caches HTML, CSS, JS & img files
self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        'index.html',
        'restaurant.html',
        'css/styles.css',
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

// Requests asset if asset not cached
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// Checks if cache name has changed and deletes old cache if it has
self.addEventListener('activate', function(event) {
    event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
        cacheNames.map(function(thisCacheName) {
				if (thisCacheName !== cacheName) {
					return caches.delete(thisCacheName);
				}
			}));
		})
	);
});
