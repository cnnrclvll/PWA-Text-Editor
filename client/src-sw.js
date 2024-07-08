// --- SERVICE WORKER SOURCE --- //
// ----------------------------- //
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
  // ^ service worker task recipes
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
  // ^ catch and fetch handling
const { registerRoute } = require('workbox-routing');
  // ^ define routes and link to cache strategies
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
  // ^ conditional caching
const { ExpirationPlugin } = require('workbox-expiration');
  // ^ expirations on cached responses
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
  // ^ precache and route files listed in manifest

precacheAndRoute(self.__WB_MANIFEST);
  // precache assets from workbox build through the manifest
  // assets will be available offline

// caching strategy
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      // only store responses with status codes of 0 or 200
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      // 30 day expiration (d/h/m/s)
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
// prefetch and cache root URL and index.html
// occurs when service worker is installed
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);
// for navigation requests serve from cache first

// TODO: Implement asset caching
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  // ^ matching function
  // ^ check if request destination is style script or worker
  new StaleWhileRevalidate({
    // caching strategy to serve relevant cached assets
    // ..fetch most recent version of asset and update it in cache
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        // only cache for status codes 0 or 200
        statuses: [0, 200],
      }),
    ],
  })
);
