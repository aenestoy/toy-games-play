// Studio panel service worker (docs/STUDYO-PANELI.md "Uygulama ve bildirimler").
//  - The panel's own files (the "shell"): the network first (so a new version shows at once), the cached copy only when
//    the network is down or slower than 3 s; the cache is refreshed on every answer. Opening the page itself (navigation) always goes to the network first, so Cloudflare Access can still
//    ask for its sign-in; the cached page is only used when there is no network.
//  - Data never goes through here: Supabase calls (another origin) and every other request are not touched.
//  - Push: shows the notification the studio-notify function sent; a tap opens (or focuses) the panel on the right page.
const CACHE = 'panel-shell-v2';
const SHELL = ['index.html', 'app.js', 'riftborn-maps.js', 'riftborn-map-versions.js', 'analytics.js', 'charts.js', 'sessions.js', 'kf-stages.js', 'rb-cards.js', 'rb-players.js', 'rb-codes.js', 'play-report.js', 'pwa.js', 'style.css', 'validate.js', 'md.js', 'health.js', 'data.js', 'sr-rules.js', 'manifest.webmanifest',
  'pass.js', 'pass-items.js', 'pass-items.webp', 'pass-big.js', 'content.js', 'ts-traffic.js',
  'icons/icon-192.png', 'icons/badge-96.png', 'icons/favicon-32.png', 'icons/apple-touch-icon.png'];
const SCOPE = new URL(self.registration.scope);
const at = (p) => new URL(p, SCOPE).href;
const SHELL_PATHS = new Set(SHELL.map((p) => new URL(p, SCOPE).pathname));
// only a real answer from our own origin is kept (not a Cloudflare Access sign-in page we were redirected to)
const good = (r) => r && r.ok && r.type === 'basic' && !r.redirected;

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(SHELL.map(async (p) => {
      try { const r = await fetch(at(p), { cache: 'no-cache' }); if (good(r)) await cache.put(at(p), r); } catch { /* offline: next time */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('panel-shell-') && k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== SCOPE.origin) return; // Supabase and everything else: straight to the network
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const r = await fetch(req);
        if (good(r) && (url.pathname === SCOPE.pathname || url.pathname === new URL('index.html', SCOPE).pathname)) {
          const copy = r.clone();
          e.waitUntil(caches.open(CACHE).then((c) => c.put(at('index.html'), copy)));
        }
        return r;
      } catch {
        return (await caches.match(at('index.html'))) || Response.error();
      }
    })());
    return;
  }
  if (!SHELL_PATHS.has(url.pathname)) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const key = url.origin + url.pathname;
    const fresh = fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }).then(async (r) => {
      if (good(r)) await cache.put(key, r.clone());
      return good(r) ? r : null;
    }).catch(() => null);
    // network first; the cached copy when offline or slow (3 s)
    const r = await Promise.race([fresh, new Promise((ok) => setTimeout(() => ok(undefined), 3000))]);
    if (r) return r;
    const hit = await cache.match(key);
    if (hit) { e.waitUntil(fresh); return hit; }
    return (await fresh) || Response.error();
  })());
});

// ------------------------------------------------------------------ notifications
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch { d = { body: e.data ? e.data.text() : '' }; }
  const title = typeof d.title === 'string' && d.title ? d.title : 'Stüdyo Paneli';
  e.waitUntil(self.registration.showNotification(title, {
    body: typeof d.body === 'string' ? d.body : '',
    tag: typeof d.tag === 'string' && d.tag ? d.tag : undefined,
    renotify: !!d.tag,
    icon: at('icons/icon-192.png'),
    badge: at('icons/badge-96.png'),
    lang: 'tr',
    timestamp: d.at ? Date.parse(d.at) || Date.now() : Date.now(),
    data: { url: typeof d.url === 'string' && d.url.startsWith('#/') ? d.url : '#/' },
  }));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const hash = (e.notification.data && e.notification.data.url) || '#/';
  const url = new URL(hash, SCOPE).href;
  e.waitUntil((async () => {
    const list = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const c = list.find((x) => x.url.startsWith(SCOPE.href));
    if (c) {
      try { await c.focus(); } catch { /* not allowed: still tell it */ }
      c.postMessage({ type: 'open', hash });
      return;
    }
    await self.clients.openWindow(url);
  })());
});
