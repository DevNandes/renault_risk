/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */

import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

// Obtain the current date and format it as a string
const currentDate = new Date().toISOString().slice(0, 10);

const CACHE_NAME = `renault_risk-cache-${currentDate}`;
const STATIC_FILES = [
    "/",
    "/index.html",
    "/manifest.json"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_FILES);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                    return null;
                })
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("push", (event) => {
    const options = {
        body: event.data.text(),
        icon: "renault.png"
    };

    event.waitUntil(
        self.registration.showNotification("Teste", options)
    );
});
