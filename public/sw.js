// check if service worker is intalled
self.addEventListener("install", (evt) => {
  console.log("Service worker has been installed");
});

// activate service workerss
self.addEventListener("activate", (evt) => {
  console.log("service worker has been activated");
});
