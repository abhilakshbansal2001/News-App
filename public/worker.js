var CACHE_NAME = 'news-pwa';
var urlsToCache = [
  // '/build/js/bundle.js',
  // '/build/js/0.chunk.js',
  // '/build/js/main.chunk.js',
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


];

// Install a service worker
this.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});


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
