var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/form.html',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

/*
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          console.log("Cache hit!")
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });
*/

function sendForm() {
  console.log("Sending form");
}

self.addEventListener('sync', function(event) {
  if (event.tag == 'myFirstSync') {
    event.waitUntil(sendForm());
  }
});