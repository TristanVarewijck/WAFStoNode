// when static  files are changed update them under a new cache name
const staticCacheName = "site-static-v1";
const assets = [
  "/",
  "/offline",
  "/scripts/app.js",
  "/scripts/sw-register.js",
  "/scripts/partials/articleObserver.js",
  "/scripts/partials/onScroll.js",
  "/scripts/partials/parseCurrentDate.js",
  "/scripts/partials/toTopButton.js",
  "/css/style.css",
  "/assets/logo/TechDefined-icon.svg",
  "/assets/icons/search-icon.svg",
  // "https://kit.fontawesome.com/08db6ddcac.js",
];

// check if serviceWorker is intalled
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell asssets");
      cache.addAll(assets);
    })
  );
});

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

// fetch events
self.addEventListener("fetch", (evt) => {
  // interupt the request before it goes to the server
  evt.respondWith(
    // get assets from cache (otherwise make the fetch from the server)
    caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request);
    })
  );
});
