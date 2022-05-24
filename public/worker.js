var CACHE_NAME = 'news-pwa';
var urlsToCache = [
  // '/static/js/bundle.js',
  // '/static/js/0.chunk.js',
  // '/static/js/main.chunk.js',
  '/static/js/main.7591caf0.chunk.js',
  '/static/js/2.f12ecddc.chunk.js',
  '/static/css/main.2d406175.chunk.css',
  '/static/css/2.d5c3ed63.chunk.css',
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
