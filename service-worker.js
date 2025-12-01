const CACHE_NAME = 'emotion-tracker-v2'; // Increment cache version due to asset changes
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/chart.js',
  // Updated font links to cache Montserrat, Poppins, and Roboto Condensed
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@600&family=Roboto+Condensed:wght@300;400;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@600&family=Roboto+Condensed:wght@300;400;700&display=swap' // The actual CSS file for the fonts
];

// Install Event: Cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

// Fetch Event: Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

// Activate Event: Cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
});
