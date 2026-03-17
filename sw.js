// Service Worker — RaaS Bandi PWA
// Strategia: cache-first per assets statici, network-first per dati bandi

var CACHE_NAME = 'raas-bandi-v2';
var DATA_CACHE = 'raas-bandi-data-v2';

var STATIC_ASSETS = [
  '/app.html',
  '/bandi.html',
  '/manifest.json',
  '/favicon.svg',
  '/favicon.ico',
  '/css/styles.css',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install: pre-cache pagina bandi e assets statici
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(STATIC_ASSETS);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// Activate: pulisci cache vecchie
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(name) {
          return name !== CACHE_NAME && name !== DATA_CACHE;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch: strategia differenziata
self.addEventListener('fetch', function(e) {
  var url = new URL(e.request.url);

  // Dati bandi (JSON + Supabase) -> network-first con fallback cache
  if (url.pathname === '/data/bandi.json' || url.hostname.includes('supabase')) {
    e.respondWith(networkFirstData(e.request));
    return;
  }

  // CDN esterni (fonts, Font Awesome, PayPal SDK) -> network con cache opzionale
  if (url.hostname !== location.hostname) {
    e.respondWith(networkWithCache(e.request));
    return;
  }

  // Assets statici locali -> cache-first
  e.respondWith(cacheFirst(e.request));
});

// Network-first per dati bandi (aggiornati + salvati offline)
function networkFirstData(request) {
  return caches.open(DATA_CACHE).then(function(cache) {
    return fetch(request).then(function(response) {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    }).catch(function() {
      return cache.match(request);
    });
  });
}

// Cache-first per assets statici
function cacheFirst(request) {
  return caches.match(request).then(function(cached) {
    if (cached) return cached;
    return fetch(request).then(function(response) {
      if (response.ok) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(request, clone);
        });
      }
      return response;
    });
  });
}

// Network con cache opzionale per CDN
function networkWithCache(request) {
  return fetch(request).then(function(response) {
    if (response.ok) {
      var clone = response.clone();
      caches.open(CACHE_NAME).then(function(cache) {
        cache.put(request, clone);
      });
    }
    return response;
  }).catch(function() {
    return caches.match(request).then(function(cached) {
      return cached || new Response('', { status: 503, statusText: 'Offline' });
    });
  });
}
