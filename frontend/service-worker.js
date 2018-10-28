var dataCacheName = 'Swarm';
var cacheName = 'Swarm';
var filesToCache = [
    "./",
    "./index.html",
    "./drone.html",
    "./searchMember.html",
    "./js/app.js",
    "./js/bootstrap.min.js",
    "./js/jquery-3.2.1.min.js",
    "./css/bootstrap.min.css",
    "./css/style.css",
    "./images/128x128.png",
    "./images/144x144.png",
    "./images/152x152.png",
    "./images/192x192.png",
    "./images/256x256.png",
    "./images/512x512.png",
    "./images/drone.jpg",
    "./images/drone-icon.png",
    "./images/swarm.png",
    "./images/battery.svg",
    "./images/location-arrow.svg",
    "./manifest.json"];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                "./",
                "./index.html",
                "./drone.html",
                "./js/app.js",
                "./js/bootstrap.min.js",
                "./js/jquery-3.2.1.min.js",
                "./css/bootstrap.min.css",
                "./css/style.css",
                "./images/128x128.png",
                "./images/144x144.png",
                "./images/152x152.png",
                "./images/192x192.png",
                "./images/256x256.png",
                "./images/512x512.png",
                "./images/drone.jpg",
                "./images/drone-icon.png",
                "./images/swarm.png",
                "./images/battery.svg",
                "./images/location-arrow.svg",
                "./manifest.json"]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
