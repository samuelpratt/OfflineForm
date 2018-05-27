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
          console.log("Cache hit!");
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });
  */


self.addEventListener('sync', function(event) {
      console.log("got sync");
      var messageJson = { "messageText" : "foo" };
      fetch('/api/Post', {
        method: 'POST',
        body: JSON.stringify(messageJson),
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        }
      });
});
    

    