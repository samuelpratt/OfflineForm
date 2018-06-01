importScripts('/idb/lib/idb.js');

/*
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/form.html',
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

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

var store = {
  db: null,
 
  init: function() {
    if (store.db) { return Promise.resolve(store.db); }
    return idb.open('messages', 1, function(upgradeDb) {
      upgradeDb.createObjectStore('outbox', { autoIncrement : true, keyPath: 'id' });
    }).then(function(db) {
      return store.db = db;
    });
  },
 
  outbox: function(mode) {
    return store.init().then(function(db) {
      return db.transaction('outbox', mode).objectStore('outbox');
    });
  }
};

self.addEventListener('sync', function(event) {
  console.log("Got Sync");
  
  event.waitUntil(
    store.outbox('readonly').then(function(outbox) {
      console.log("Getting Messages");
      return outbox.getAll();
    }).then(function(messages) {
      console.log("Messages are" + JSON.stringify(messages));
      return Promise.all(messages.map(function(message) {
        console.log("Posting messages");
        return fetch('/api/Post', {
          method: 'POST',
          body: JSON.stringify(message),
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
          }
        }).then(function(response) {
          console.log("MessageSent");
          return response;
        }).then(function(data) {
          console.log("result of post was " + JSON.stringify(data));
          console.log("status is " + data.status);
          if (data.status == 200) {
            console.log("Deleting Message");
            return store.outbox('readwrite').then(function(outbox) {
              return outbox.delete(message.id);
            });
          }
        });
      }));
    }).catch(function(err) {
      console.error(err);
    })
  );
  
});