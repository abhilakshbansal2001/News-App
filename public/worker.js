var CACHE_NAME = 'news-pwa';
var urlsToCache = [
  '/static/js/bundle.js',
  '/static/js/0.chunk.js',
  '/static/js/main.chunk.js',
  '/index.html',
  '/home',
  '/category',
  '/discover',
  '/search',
  '/info',
  '/query',
  '/information',
  '/about',
  '/',
  // '/main.648a5a2479770ae09136.hot-update.js',
  // '/static/js/1.chunk.js',
  // '/main.d306505e6b8e6ecbf939.hot-update.js',
  

];

// Install a service worker
this.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
// this.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       }
//     )
//   );


  // event.respondWith((async () => {
  //   const cachedResponse = await caches.match(event.request);
  //   if (cachedResponse) {
  //     return cachedResponse;
  //   }
  
  //   const response = await fetch(event.request);
  
  //   if (!response || response.status !== 200 || response.type !== 'basic') {
  //     return response;
  //   }
  
  //   if (ENABLE_DYNAMIC_CACHING) {
  //     const responseToCache = response.clone();
  //     const cache = await caches.open(DYNAMIC_CACHE)
  //     await cache.put(event.request, response.clone());
  //   }
  
  //   return response;
  // }));
// });

this.addEventListener('fetch', event => {
  if(!navigator.onLine)
  event.respondWith(
    caches
      .match(event.request)
      .then(cachedRes => {
        if (cachedRes) {
          return cachedRes;
        } else {
          throw new Error('No match found in cache!');
        }
      })
      .catch(() => {
        // console.log(event , " : " );
        return fetch(event.request);
      })
  )
});

// Update a service worker
// self.addEventListener('activate', event => {
//   var cacheWhitelist = ['news-pwa'];
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });