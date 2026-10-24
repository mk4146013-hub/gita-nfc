const CACHE = 'gita-moments-v2';

const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg'
];

// Install the new service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await cache.addAll(FILES);
      await self.skipWaiting();
    })()
  );
});

// Delete old cache and activate immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter(
            (key) =>
              key.startsWith('gita-moments-') &&
              key !== CACHE
          )
          .map((key) => caches.delete(key))
      );

      await self.clients.claim();
    })()
  );
});

// Fetch updated HTML from network first
self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  const isHTML =
    request.mode === 'navigate' ||
    url.pathname.endsWith('/index.html');

  const isServiceWorker = url.pathname.endsWith('/sw.js');

  if (isHTML || isServiceWorker) {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request, {
            cache: 'no-store'
          });

          if (
            response.ok &&
            !isServiceWorker
          ) {
            const cache = await caches.open(CACHE);
            await cache.put(request, response.clone());
          }

          return response;
        } catch (error) {
          return (
            (await caches.match(request)) ||
            (await caches.match('./index.html')) ||
            Response.error()
          );
        }
      })()
    );

    return;
  }

  // Use cached static files when available
  event.respondWith(
    (async () => {
      const cached = await caches.match(request);

      if (cached) return cached;

      try {
        const response = await fetch(request);

        if (response.ok) {
          const cache = await caches.open(CACHE);
          await cache.put(request, response.clone());
        }

        return response;
      } catch (error) {
        return Response.error();
      }
    })()
  );
});
