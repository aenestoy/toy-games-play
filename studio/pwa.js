// The panel as a phone app (docs/STUDYO-PANELI.md "Uygulama ve bildirimler"): the service worker (sw.js), the install
// hint (Android: the browser's install prompt; iPhone: Share → Add to Home Screen) and this device's push subscription.
// No library; nothing here talks to a server (app.js saves the subscription through the studio RPCs).

export const isIOS = () => /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
export const isAndroid = () => /Android/i.test(navigator.userAgent);
export const isStandalone = () => {
  try { return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; } catch { return false; }
};
export const pushSupported = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
export const permission = () => ('Notification' in window ? Notification.permission : 'unsupported');

// ------------------------------------------------------------------ service worker
let reg = null;
const listeners = new Set();
export const onChange = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
const changed = (what) => { for (const fn of listeners) { try { fn(what); } catch { /* a listener's problem */ } } };

/** Registers sw.js (same folder as the page). onMessage gets {type:'updated'} and {type:'open', hash}. */
export function registerSW(onMessage) {
  if (!('serviceWorker' in navigator)) return null;
  navigator.serviceWorker.addEventListener('message', (e) => { if (e.data && typeof e.data === 'object') onMessage?.(e.data); });
  return navigator.serviceWorker.register('sw.js', { scope: './' }).then((r) => { reg = r; return r; }).catch(() => null);
}
async function ready(ms = 8000) {
  if (!('serviceWorker' in navigator)) throw new Error('sw');
  return Promise.race([navigator.serviceWorker.ready, new Promise((_, no) => setTimeout(() => no(new Error('sw-timeout')), ms))]);
}

// ------------------------------------------------------------------ install
let deferred = null;
let installed = false;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e; changed('install'); });
window.addEventListener('appinstalled', () => { deferred = null; installed = true; changed('install'); });

/**
 * 'app'     already running as the installed app
 * 'prompt'  the browser can install it now (Android Chrome / Edge, desktop Chrome): show the button
 * 'ios'     iPhone / iPad Safari: Share → Add to Home Screen
 * 'manual'  Android without the prompt (Samsung Internet, Firefox…): the browser menu
 * 'other'   a computer without the prompt
 */
export function installState() {
  if (isStandalone() || installed) return 'app';
  if (deferred) return 'prompt';
  if (isIOS()) return 'ios';
  if (isAndroid()) return 'manual';
  return 'other';
}
export async function promptInstall() {
  if (!deferred) return 'none';
  const e = deferred;
  deferred = null;
  e.prompt();
  const r = await e.userChoice.catch(() => ({ outcome: 'dismissed' }));
  changed('install');
  return r.outcome;
}

// ------------------------------------------------------------------ this device
export function deviceLabel() {
  const ua = navigator.userAgent;
  const os = /iPhone/.test(ua) ? 'iPhone' : /iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ? 'iPad'
    : /Android/.test(ua) ? 'Android' : /Windows/.test(ua) ? 'Windows' : /Mac OS X|Macintosh/.test(ua) ? 'Mac' : /Linux/.test(ua) ? 'Linux' : 'Cihaz';
  const br = /SamsungBrowser/.test(ua) ? 'Samsung' : /Edg\//.test(ua) ? 'Edge' : /OPR\/|Opera/.test(ua) ? 'Opera' : /YaBrowser/.test(ua) ? 'Yandex'
    : /Firefox|FxiOS/.test(ua) ? 'Firefox' : /CriOS|Chrome/.test(ua) ? 'Chrome' : /Safari/.test(ua) ? 'Safari' : 'Tarayıcı';
  return `${os} · ${br}${isStandalone() ? ' (uygulama)' : ''}`;
}

export function b64uToBytes(s) {
  const t = String(s).replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(t + '='.repeat((4 - (t.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}
const bytesToB64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
/** sha256(endpoint) as hex: the key the server uses for a device (st_push_subs.ekey). */
export async function endpointKey(endpoint) {
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(endpoint));
  return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
/** What st_push_save needs from a PushSubscription. */
export function subJson(sub) {
  return { endpoint: sub.endpoint, p256dh: bytesToB64u(sub.getKey('p256dh')), auth: bytesToB64u(sub.getKey('auth')) };
}

/** This browser's current subscription (or null). */
export async function currentSubscription() {
  if (!pushSupported()) return null;
  try { const r = reg || (await ready(4000)); return await r.pushManager.getSubscription(); } catch { return null; }
}

/**
 * Asks for permission (call it straight from a tap, before any await in the tap handler) and subscribes with the
 * server's public key (a string, or a promise of it when the server is still making the key). A subscription made
 * with another key is replaced. Throws Error('denied' | 'unsupported' | …) or the key promise's error.
 */
export function subscribe(vapidPublic) {
  if (!pushSupported()) { Promise.resolve(vapidPublic).catch(() => {}); return Promise.reject(new Error('unsupported')); }
  const asked = Notification.permission === 'granted' ? Promise.resolve('granted') : Notification.requestPermission();
  return Promise.all([asked, vapidPublic]).then(async ([p, pub]) => {
    if (p !== 'granted') throw new Error('denied');
    const r = await ready();
    const key = b64uToBytes(pub);
    let sub = await r.pushManager.getSubscription();
    if (sub) {
      const cur = sub.options && sub.options.applicationServerKey ? new Uint8Array(sub.options.applicationServerKey) : null;
      if (!cur || cur.length !== key.length || cur.some((b, i) => b !== key[i])) { await sub.unsubscribe().catch(() => {}); sub = null; }
    }
    return sub || r.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: key });
  });
}
export async function unsubscribe() {
  const sub = await currentSubscription();
  if (sub) await sub.unsubscribe().catch(() => {});
}
