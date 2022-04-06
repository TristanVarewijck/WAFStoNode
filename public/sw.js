// when static  files are changed update them under a new cache name
const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1";
const assets = [
  "/",
  "/css/style.css",
  "/assets/logo/TechDefined-icon.svg",
  "/assets/icons/search-icon.svg",
  "/html/offline.html",
  // "https://kit.fontawesome.com/08db6ddcac.js",
];

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
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
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
          .then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              return fetchRes;
            });
          })
          .catch(() => caches.match("/html/offline.html"))
      );
    })
  );
});
