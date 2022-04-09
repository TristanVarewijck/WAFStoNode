// when static  files are changed update them under a new cache name
const staticCacheName = "site-static-v1";
// const dynamicCacheName = "site-dynamic-v1";
const assets = [
  "/css/style.css",
  "/assets/logo/TechDefined-icon.svg",
  "/assets/icons/search-icon.svg",
  "/assets/icons/no-internet.svg",
  "/html/offline.html", // offline page
];

// LIMIT CACHE SIZE
// const limitCacheSize = (name, size) => {
//   caches.open(name).then((cache) => {
//     cache.keys().then((keys) => {
//       if (keys.length > size) {
//         cache.delete(keys[0]).then(limitCacheSize(name, size));
//       }
//     });
//   });
// };

// INSTALL
// check if serviceWorker is intalled
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// ACTIVATE
// activate serviceWorker
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    // when there is a new cacheName delete the old one
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// FETCH EVENTS
self.addEventListener("fetch", (evt) => {
  // interupt the request before it goes to the server
  evt.respondWith(
    // get assets from cache (otherwise make the fetch from the server)
    caches.match(evt.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(evt.request)
          //   .then((fetchRes) => {
          //     return caches.open(dynamicCacheName).then((cache) => {
          //       cache.put(evt.request.url, fetchRes.clone());
          //       limitCacheSize(dynamicCacheName, 10);
          //       return fetchRes;
          //     });
          //   })
          .catch(() => caches.match("/html/offline.html"))
      );
    })
  );
});
