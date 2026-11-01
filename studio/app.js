// Studio panel (docs/STUDYO-PANELI.md). Plain ES modules, no build step, no outside library.
// Sign-in: Supabase Auth email code / magic link (no password). Data: admin-only RPCs of the studio project
// (supabase/studio/studio.sql, dev.sql, errors.sql; games/06-shadow-duel/supabase/admin.sql, ranked-admin.sql, ranked-panel.sql, ranked-panel-season.sql) and, for Street
// Rivals' settings, the sr-admin Edge Function in that game's own project (it checks the same studio sign-in).
// The page itself holds no data and no secret: the publishable key below is public by design.
// Pages: the studio (all games, cross-game work) and one page per game (st_games: a new game gets its page by itself).
// As a phone app: manifest.webmanifest + sw.js (pwa.js); notifications through supabase/studio/push.sql and the
// studio-notify Edge Function (studio page → Bildirimler).
import { TUNE_DEFAULTS, LEVEL_NAMES, NINJAS, ARENAS } from './data.js';
import * as PWA from './pwa.js';
import * as V from './validate.js';
import * as SR from './sr-rules.js';
import { renderMarkdown, splitTodo, sectionsFor, countTasks, todoItems, ITEM_STATES, inlineMd } from './md.js';
import { createSystem } from './health.js';
import * as AN from './analytics.js';
import { isStageStep } from './kf-stages.js';
import { contentLive, STEP_TR as RB_STEP_TR } from './rb-cards.js';
import { createPass } from './pass.js';
import { createContent } from './content.js?v=outfit-detail-v3';
import { createTrafficSettings } from './ts-traffic.js';
import { createDungeonViews } from './riftborn-maps.js?v=outfit-detail-v3';

// ------------------------------------------------------------------ config
const PROD = { url: 'https://cjaewbrifdqlykasrkds.supabase.co', key: 'sb_publishable_rRU01BBLtAH5ecd6nGEWDw_JiUWDrjI' };
const QS = new URLSearchParams(location.search);
const LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
// tests (localhost only): ?api=http://127.0.0.1:port points the page at a stand-in server
const API = LOCAL && QS.get('api') ? { url: QS.get('api').replace(/\/+$/, ''), key: 'sb_publishable_test' } : PROD;
// Street Rivals' settings bridge (games/07-street-rivals/supabase/functions/sr-admin); tests use the stand-in server
const SR_FN = API === PROD ? 'https://eopxmyvwxnvlabpmzkkk.supabase.co/functions/v1/sr-admin' : `${API.url}/functions/v1/sr-admin`;
// phone notifications (supabase/functions/studio-notify): the test button
const PUSH_FN = `${API.url}/functions/v1/studio-notify`;
const SESSION_KEY = 'studio.session.v1';
const LIVE_MS = 20000;
const RINGS = [];

// ------------------------------------------------------------------ small helpers
const $ = (sel, el = document) => el.querySelector(sel);
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
  del(k) { try { localStorage.removeItem(k); } catch { /* private mode */ } },
};
const nf = new Intl.NumberFormat('tr-TR');
const fmtN = (n) => nf.format(Math.round(Number(n) || 0));
const fmtCompact = (n) => new Intl.NumberFormat('tr-TR', { notation: 'compact', maximumFractionDigits: 1 }).format(Number(n) || 0);
const pct = (a, b) => (b > 0 ? `%${Math.round((100 * a) / b)}` : '—');
function fmtDur(sec) {
  sec = Math.round(Number(sec) || 0);
  if (sec < 60) return `${sec} sn`;
  const m = Math.floor(sec / 60), s = sec % 60;
  if (m < 60) return s ? `${m} dk ${s} sn` : `${m} dk`;
  const h = Math.floor(m / 60);
  return `${h} sa ${m % 60} dk`;
}
const fmtDate = (d, o = { day: 'numeric', month: 'long' }) => new Intl.DateTimeFormat('tr-TR', { timeZone: 'Europe/Istanbul', ...o }).format(new Date(d));
const fmtDateTime = (d) => fmtDate(d, { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
const dayLabel = (iso) => fmtDate(iso + 'T12:00:00Z', { day: 'numeric', month: 'short' });
const regionName = (() => { try { const r = new Intl.DisplayNames(['tr'], { type: 'region' }); return (c) => (c ? r.of(c) || c : 'Bilinmiyor'); } catch { return (c) => c || 'Bilinmiyor'; } })();
const langName = (() => { try { const r = new Intl.DisplayNames(['tr'], { type: 'language' }); return (c) => (c ? r.of(c) || c : 'Bilinmiyor'); } catch { return (c) => c || 'Bilinmiyor'; } })();
const titleOf = (g) => g.title || String(g.game).split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

// words the owner reads: screens, events, portals, devices
const SCREEN = {
  boot: 'Açılıyor', menu: 'Menü', select: 'Karakter seçimi', result: 'Sonuç ekranı', boards: 'Sıralamalar', settings: 'Ayarlar', pause: 'Duraklatıldı',
  online: 'Arkadaşla çevrimiçi', ranked: 'Dereceli maç',
  'fight:journey': 'Dövüş · Yolculuk', 'fight:cpu': 'Dövüş · Bilgisayara karşı', 'fight:tourney': 'Dövüş · Turnuva', 'fight:dan': 'Dövüş · Dan sınavı',
  'fight:rival': 'Dövüş · Rakip', 'fight:train': 'Antrenman', 'fight:2p': 'İki kişilik', 'fight:watch': 'İzleme',
  home: 'Ana ekran', garage: 'Garaj', dealer: 'Galeri', showroom: 'Sergi', events: 'Etkinlikler', ladder: 'Merdiven', circuit: 'Pist turu',
  'race:ranked': 'Yarış · Dereceli', 'race:event': 'Yarış · Etkinlik', 'race:drive': 'Test sürüşü', 'race:ladder': 'Yarış · Merdiven', results: 'Yarış sonucu',
  play: 'Oyun', game_over: 'Oyun bitti',
};
// Lap Rivals' race types (games/10-lap-rivals/src/sim/levels.ts RACE_TYPES), in the funnel's order
const LR_TYPES = { time: 'zamana karşı', race: 'yarış (ilk 3)', coins: 'altın toplama', drift: 'drift puanı', rush: 'kapı kapı süreye karşı', elim: 'eleme' };
// funnel steps (new-player events) with their labels, per game and in the order a player meets them: the funnel is shown
// in this order. Names are each game's own (two games may use the same name for different steps).
const SD_JOURNEY = Array.from({ length: 8 }, (_, i) => [`journey_win_${i + 1}`, `Yolculuk ${i + 1}. dövüşü kazandı`]);
const GAME_EVENTS = {
  'shadow-duel': [['first_fight_start', 'İlk dövüşe başladı'], ['first_fight_done', 'İlk dövüşü bitirdi'], ['tutorial_done', 'Eğitimi bitirdi'], ...SD_JOURNEY,
    ['played_10_min', '10 dakika oynadı']],
  'street-rivals': [['first_race_start', 'İlk yarışa başladı'], ['first_race_done', 'İlk yarışı bitirdi'], ['first_win', 'İlk galibiyet'], ['first_ranked_race', 'İlk dereceli yarış']],
  // games/09-katana-flash/src/stats.ts FUNNEL
  'katana-flash': [['first_dash', 'İlk atılma (dash)'], ['first_kill', 'İlk düşmanı kesti'], ['first_combo3', 'İlk 3\'lü seri'], ['first_deflect', 'İlk saptırma'],
    ['stage1', '1. bölümü geçti'], ['village1', 'Köyde ilk yapı'], ['stage3', '3. bölümü geçti'], ['stage5', '5. bölümü geçti'], ['boss1_try', 'İlk patrona girdi (10. bölüm)'],
    ['boss1_win', 'İlk patronu yendi'], ['stage20', '20. bölümü geçti'], ['dojo1', 'İlk Dojo'], ['daily1', 'İlk günlük görev'], ['first_ad', 'İlk ödüllü reklamı izledi'],
    ['m3', '3 dakika oynadı'], ['m5', '5 dakika oynadı'], ['m10', '10 dakika oynadı']],
  // games/10-lap-rivals/src/stats.ts (branch claude/lap-rivals) funnel
  'lap-rivals': [['boot', 'Oyun açıldı'], ['first_race_start', 'İlk yarışa başladı'], ['first_finish', 'İlk yarışı bitirdi'], ['level1_clear', '1. bölümü geçti'],
    ['level3', '3. bölüme geldi'], ['level5', '5. bölüme geldi'], ['level10', '10. bölüme geldi'], ['first_car_unlock', 'İlk yeni araba'], ['first_upgrade', 'İlk geliştirme (garaj)'],
    ...Object.entries(LR_TYPES).map(([k, t]) => [`new_type_${k}`, `İlk kez: ${t}`]),
    ['played_3_min', '3 dakika oynadı'], ['played_5_min', '5 dakika oynadı'], ['played_10_min', '10 dakika oynadı'], ['day2', 'Başka bir gün yine oynadı']],
  // games/12-riftborn/src/rb-stats.js CODES.steps (rb_f_*, once a device) and the comeback.js steps
  riftborn: [...Object.entries(RB_STEP_TR).map(([k, t]) => [`rb_f_${k}`, t]), ['rb_chest_got', 'Yarın Sandığı kazandı'], ['rb_chest_open', 'Yarın Sandığını açtı'],
    ['rb_list_full', 'Günlük Listeyi bitirdi'], ['rb_build_switch', 'Kurulum yuvası değiştirdi'], ['rb_run_retry', 'Koşu sonunda TRY AGAIN'], ['rb_run_next', 'Koşu sonunda sonraki hedef']],
};
// steps of the game template (packages/template), for a new game without its own list yet
const EVENT = { first_round_won: 'İlk turu kazandı', first_game_over: 'İlk oyun sonu' };
// screens a game names differently from the shared list above
const GAME_SCREENS = {
  // games/09-katana-flash/src/scenes/GameScene.ts statScreen
  'katana-flash': { map: 'Harita', village: 'Köy', 'fight:stage': 'Dövüş · Bölüm', 'fight:dojo': 'Dövüş · Dojo', 'fight:daily': 'Dövüş · Günlük görev' },
  // games/10-lap-rivals/src/stats.ts (branch claude/lap-rivals)
  'lap-rivals': { map: 'Bölüm haritası', garage: 'Garaj', intro: 'Yarış türü kartı', pause: 'Duraklatıldı', result: 'Yarış sonucu',
    ...Object.fromEntries(Object.entries(LR_TYPES).map(([k, t]) => [`race:${k}`, `Yarış: ${t}`])) },
};
const screenName = (k, game) => GAME_SCREENS[game]?.[k] || SCREEN[k] || (k ? k.replace(/^fight:/, 'Dövüş · ') : 'Bilinmiyor');
const eventName = (k, game) => (GAME_EVENTS[game] || []).find((e) => e[0] === k)?.[1] || EVENT[k] || k;
/** the game's own step order first (unknown steps after it, most reached first) */
const eventOrder = (game, list, key = (e) => e.k, count = (e) => e.sessions) => {
  const ord = (GAME_EVENTS[game] || []).map((e) => e[0]);
  const at = (k) => { const i = ord.indexOf(k); return i < 0 ? 1e6 : i; };
  // (Katana Flash's stage tallies are never funnel steps: kf-stages.js shows them)
  // (Riftborn's coded in-game events never are either: rb-cards.js shows them; stats15.sql keeps them out already)
  return list.filter((e) => !isStageStep(game, key(e)) && !(game === 'riftborn' && /^(rb_ft|rvr|rbo|rbf|rlv|ris|rc|rh|rs|re|rd|rk|rt|ri|rl|ru|rw|rx|rq|rv)_/.test(String(key(e))))).sort((a, b) => at(key(a)) - at(key(b)) || (count(b) || 0) - (count(a) || 0));
};
const PORTAL = { crazygames: 'CrazyGames', site: 'Kendi sitemiz', other: 'Diğer' };
const DEVICE = { phone: 'Telefon', tablet: 'Tablet', desktop: 'Bilgisayar', other: 'Diğer' };
const BROWSER = { chrome: 'Chrome', safari: 'Safari', firefox: 'Firefox', edge: 'Edge', samsung: 'Samsung', opera: 'Opera', yabrowser: 'Ya Browser', other: 'Diğer' };

// ------------------------------------------------------------------ theme
function applyTheme() {
  const t = store.get('studio.theme');
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
  else delete document.documentElement.dataset.theme;
  $('#themeBtn').textContent = t === 'light' ? '☀' : t === 'dark' ? '☾' : '◐';
}
function cycleTheme() {
  const t = store.get('studio.theme');
  store.set('studio.theme', t === 'light' ? 'dark' : t === 'dark' ? 'auto' : 'light');
  applyTheme();
}

// ------------------------------------------------------------------ auth (Supabase Auth REST, no library)
let session = null;
try { session = JSON.parse(store.get(SESSION_KEY) || 'null'); } catch { session = null; }
const saveSession = (s) => { session = s; if (s) store.set(SESSION_KEY, JSON.stringify(s)); else store.del(SESSION_KEY); };
const authHeaders = { apikey: API.key, 'Content-Type': 'application/json' };

function fromTokenResponse(j) {
  if (!j || !j.access_token || !j.refresh_token) throw new Error('Giriş yanıtı eksik.');
  return { access_token: j.access_token, refresh_token: j.refresh_token, expires_at: Date.now() + (Number(j.expires_in) || 3600) * 1000,
    email: j.user?.email || session?.email || '', uid: j.user?.id || '' };
}
async function authFetch(path, body) {
  const r = await fetch(API.url + '/auth/v1/' + path, { method: 'POST', headers: authHeaders, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    const e = new Error(j.msg || j.error_description || j.message || `hata ${r.status}`);
    e.status = r.status; e.code = j.error_code || j.code;
    throw e;
  }
  return j;
}
async function sendCode(email) {
  const back = location.origin + location.pathname;
  return authFetch('otp?redirect_to=' + encodeURIComponent(back), { email, create_user: false });
}
async function verifyCode(email, token) {
  saveSession(fromTokenResponse(await authFetch('verify', { type: 'email', email, token })));
}
let refreshing = null;
async function refresh() {
  if (!session) throw new Error('no session');
  refreshing ||= authFetch('token?grant_type=refresh_token', { refresh_token: session.refresh_token })
    .then((j) => saveSession(fromTokenResponse(j)))
    .finally(() => { refreshing = null; });
  return refreshing;
}
async function token() {
  if (!session) throw Object.assign(new Error('Giriş gerekli.'), { status: 401 });
  if (session.expires_at - Date.now() < 60000) await refresh();
  return session.access_token;
}
function readMagicLink() {
  if (!location.hash || location.hash.length < 2) return null;
  const h = new URLSearchParams(location.hash.slice(1));
  if (!h.get('access_token') && !h.get('error')) return null; // a page address (#/oyun/…), not a sign-in link
  history.replaceState(null, '', location.pathname + location.search);
  if (h.get('error')) return h.get('error_description') || h.get('error');
  if (h.get('access_token') && h.get('refresh_token')) {
    saveSession({ access_token: h.get('access_token'), refresh_token: h.get('refresh_token'),
      expires_at: Date.now() + (Number(h.get('expires_in')) || 3600) * 1000, email: '', uid: '' });
  }
  return null;
}
async function logout() {
  try { if (session) await fetch(API.url + '/auth/v1/logout', { method: 'POST', headers: { ...authHeaders, Authorization: 'Bearer ' + session.access_token } }); } catch { /* offline */ }
  saveSession(null);
  state.admin = null;
  stopLive();
  renderLogin();
}

// ------------------------------------------------------------------ API
class ApiError extends Error {}
async function rpc(name, args = {}, retry = true) {
  const t = await token();
  const r = await fetch(`${API.url}/rest/v1/rpc/${name}`, {
    method: 'POST', headers: { ...authHeaders, Authorization: 'Bearer ' + t }, body: JSON.stringify(args),
  });
  if (r.status === 401 && retry) { await refresh().catch(() => {}); return rpc(name, args, false); }
  const txt = await r.text();
  let j = null;
  try { j = txt ? JSON.parse(txt) : null; } catch { j = txt; }
  if (!r.ok) {
    const e = new ApiError((j && j.message) || `Sunucu hatası (${r.status})`);
    e.status = r.status;
    e.code = j && j.code;
    // the function is not on the server yet (its SQL was not applied)
    e.missing = e.code === 'PGRST202' || r.status === 404;
    e.denied = r.status === 401 || r.status === 403 || e.code === '42501';
    throw e;
  }
  if (name !== 'st_live') dataArrived(); // the menu's live badges (every 20 s) are not the section's data
  return j;
}
async function upload(bucket, path, file) {
  const t = await token();
  const r = await fetch(`${API.url}/storage/v1/object/${bucket}/${path}`, {
    method: 'POST', headers: { apikey: API.key, Authorization: 'Bearer ' + t, 'Content-Type': file.type, 'x-upsert': 'true', 'cache-control': '3600' }, body: file,
  });
  if (!r.ok) {
    const j = await r.json().catch(() => ({}));
    throw new ApiError(j.message || j.error || `Yükleme olmadı (${r.status})`);
  }
  return path;
}
async function signPlanImages(paths) {
  if (!paths.length) return {};
  const t = await token();
  const r = await fetch(`${API.url}/storage/v1/object/sign/plans`, {
    method: 'POST', headers: { ...authHeaders, Authorization: 'Bearer ' + t }, body: JSON.stringify({ expiresIn: 3600, paths }),
  });
  if (!r.ok) return {};
  const list = await r.json().catch(() => []);
  const out = {};
  for (const x of Array.isArray(list) ? list : []) if (x && x.signedURL) out[x.path] = x.signedURL.startsWith('http') ? x.signedURL : `${API.url}/storage/v1${x.signedURL}`;
  return out;
}
const friendly = (e) => (e && e.missing ? 'Bu bölümün sunucu kurulumu henüz yapılmadı.' : e && e.denied ? 'Bu hesabın yetkisi yok.' : (e && e.message) || 'Bir şey ters gitti.');

// ------------------------------------------------------------------ state
const readSubs = () => { try { const o = JSON.parse(store.get('studio.sub') || '{}'); return o && typeof o === 'object' ? o : {}; } catch { return {}; } };
const state = {
  admin: null, uid: '', page: 'studio', sub: readSubs(),
  days: Number(store.get('studio.days')) || 7,
  live: null, liveAt: 0, liveErr: null, summary: null, summaryErr: null, versions: null, usage: null,
  plans: null, plansErr: null, planUrls: {}, planFilter: 'fikir', showArchived: false, todoView: store.get('studio.todoView') || 'all',
  rewards: null, rewardsErr: null, rewardKind: '', seasons: null, seasonsErr: null,
  tune: undefined, tuneErr: null, tuneLevel: '1', doc: undefined, docErr: null,
  sr: undefined, srErr: null, srDraft: null, srStart: { month: '', players: false, phrase: '' },
  errDays: [1, 7, 30].includes(Number(store.get('studio.errDays'))) ? Number(store.get('studio.errDays')) : 7, errors: null, errorsErr: null, errLoading: false, errOpen: '',
  ranked: null, rankedErr: null, rankedAt: 0, rankedQ: '', rkFound: null, rkFoundErr: '', rkAll: false,
  // the whole-season view (ranked-panel-season.sql); rkOld = that file is not on the server: the earlier overview
  rkOld: false,
  rk: { season: null, closed: false, period: 'season', from: '', to: '', rangeErr: '', view: null, err: null, at: 0, drawer: null,
    pl: { sort: 'rating', desc: true, filter: 'all', q: '', off: 0, data: null, err: null },
    mt: { kind: 'all', what: 'all', player: null, nick: '', off: 0, msg: '', data: null, err: null } },
  push: null, pushErr: null, pushLoading: false, pushBusy: false, pushMsg: '', thisKey: '',
  ghost: undefined, ghostErr: null,
};
let liveTimer = 0;
function stopLive() { clearInterval(liveTimer); liveTimer = 0; }
function startLive() {
  stopLive();
  liveTimer = setInterval(() => { if (!document.hidden && ['overview', 'stats'].includes(curSub())) loadLive(); }, LIVE_MS);
}

// ------------------------------------------------------------------ pages: the studio, then one per game
// Games come from st_games (st_live lists every visible one); before that answers, the two we know.
const KNOWN_GAMES = [{ game: 'shadow-duel', title: 'Shadow Duel' }, { game: 'street-rivals', title: 'Street Rivals' }];
// Game-specific settings, each its own section on that game's page
// İçerik: everything built for the game, with pictures (content.js; games/11-truckstead/scripts/panel-content.mjs,
// games/06-shadow-duel/scripts/panel-content.mjs: the ninjas, their 3D work with a 3D viewer, the arenas;
// games/12-riftborn/scripts/panel-content.mjs: classes, skills, items, monsters, zones, the passive tree, balance)
const GAME_TOOLS = { 'shadow-duel': [['ranked', 'Dereceli'], ['tune', 'Zorluk'], ['pass', 'Ödüller'], ['season', 'Sezon'], ['ghost', 'Gölge rakip'], ['content', 'İçerik']], 'street-rivals': [['sr', 'Ayarlar']],
  truckstead: [['content', 'İçerik']], riftborn: [['content', 'İçerik']] };
const STUDIO_SUBS = [['overview', 'Genel bakış'], ['todo', 'Yapılacaklar'], ['plans', 'Planlar'], ['server', 'Sunucu'], ['system', 'Sistem'], ['notify', 'Bildirimler']];
// every game page: statistics, its error reports, the to-do and plans, then the game's own sections
const GAME_SUBS = [['stats', 'İstatistik'], ['errors', 'Hatalar'], ['todo', 'Yapılacaklar'], ['plans', 'Planlar']];
function gameList() {
  const L = state.live && Array.isArray(state.live.games) ? state.live.games : null;
  const list = L && L.length ? L.map((g) => ({ game: g.game, title: titleOf(g) })) : KNOWN_GAMES.slice();
  return list.sort((a, b) => a.title.localeCompare(b.title, 'tr'));
}
const gameOf = (id) => gameList().find((g) => g.game === id) || null;
const subsOf = (page) => (page === 'studio' ? STUDIO_SUBS : [...GAME_SUBS, ...(GAME_TOOLS[page] || [])]);
// sections reached from inside another one (not in the row of buttons): Ödüller opens the Shadow Pass, the ranked reward
// catalog sits beside it
const INNER_SUBS = { 'shadow-duel': [['journey', 'Yolculuk ödülleri', 'pass'], ['rewards', 'Dereceli ödül kataloğu', 'pass']] };
const allSubsOf = (page) => [...subsOf(page), ...(INNER_SUBS[page] || [])];
const shownSub = (page, sub) => ((INNER_SUBS[page] || []).find(([k]) => k === sub) || [])[2] || sub;
/** Ödüller's own row: the Shadow Pass and the ranked reward catalog, side by side */
const rewardsTabs = (cur) => `<div class="an-tabs" role="tablist" aria-label="Ödül bölümleri" data-testid="rewards-tabs">${[['pass', 'Gölge Pass'], ['journey', 'Yolculuk ödülleri'], ['rewards', 'Dereceli ödül kataloğu']].map(([k, t]) => `<button type="button" role="tab" data-act="sub" data-sub="${k}" aria-selected="${k === cur}">${t}</button>`).join('')}</div>`;
function curSub() {
  const subs = allSubsOf(state.page), s = state.sub[state.page];
  return subs.some(([k]) => k === s) ? s : subs[0][0];
}
const pageHash = (page) => (page === 'studio' ? '#/' : `#/oyun/${page}`);
// addresses with a section (a notification opens these): #/oyun/<game>/<section>, #/studyo/<section>, #/bildirimler.
// The section is remembered like a tap on it, and the address goes back to the page's own (#/oyun/<game>, #/).
const HASH_SUBS = { bildirimler: 'notify', sistem: 'system' };
function routeFromHash() {
  // #/oyun/<game>[/<section>] or #/[<section>], optionally with the statistics settings after "?" (analytics.js); a link
  // carrying them (a=…) opens the statistics section
  const [h, q] = location.hash.split(/\?(.*)/s);
  const stats = q != null && /(^|&)a=/.test(q);
  const withSub = (page, sub) => {
    if (sub && allSubsOf(page).some(([k]) => k === sub)) { state.sub[page] = sub; store.set('studio.sub', JSON.stringify(state.sub)); }
    if (h !== pageHash(page)) history.replaceState(null, '', location.pathname + location.search + pageHash(page) + (q != null ? '?' + q : ''));
    return page;
  };
  let m = /^#\/oyun\/([a-z0-9][a-z0-9-]{1,31})(?:\/([a-z]{2,20}))?$/.exec(h);
  if (m) return m[2] ? withSub(m[1], m[2]) : stats ? withSub(m[1], 'stats') : m[1];
  m = /^#\/(?:studyo\/)?([a-z]{2,20})$/.exec(h);
  if (m) return withSub('studio', HASH_SUBS[m[1]] || m[1]);
  if (stats && h === '#/') return withSub('studio', 'overview');
  return 'studio';
}
/** Opens a panel address (a tapped notification). */
function openHash(h) {
  if (typeof h !== 'string' || !h.startsWith('#/')) return;
  if (location.hash !== h) { location.hash = h; return; } // → hashchange
  if (state.admin) { state.page = routeFromHash(); render(); }
}

// ------------------------------------------------------------------ tooltip (charts)
const tip = () => $('#tip');
document.addEventListener('pointermove', (e) => {
  const t = e.target.closest?.('[data-tip]');
  if (!t) { tip().hidden = true; return; }
  tip().textContent = t.getAttribute('data-tip');
  tip().hidden = false;
  const w = tip().offsetWidth, x = Math.min(window.innerWidth - w - 8, Math.max(8, e.clientX - w / 2));
  tip().style.left = x + 'px';
  tip().style.top = Math.max(8, e.clientY - tip().offsetHeight - 12) + 'px';
});
document.addEventListener('pointerleave', () => { tip().hidden = true; });

// ------------------------------------------------------------------ charts (plain SVG / HTML)
/** Horizontal bars, one hue. items: [{ label, value, text }] */
function barList(items, { max } = {}) {
  if (!items.length) return '<p class="muted small">Henüz veri yok.</p>';
  const top = max || Math.max(...items.map((i) => i.value), 1);
  return `<ul class="bars">${items.map((i) => `<li data-tip="${esc(i.label + ': ' + i.text)}"><span class="name">${esc(i.label)}</span><span class="val num">${esc(i.text)}</span>
    <span class="track"><span class="fill" style="width:${Math.max(0.5, (100 * i.value) / top).toFixed(1)}%"></span></span></li>`).join('')}</ul>`;
}
/** Columns per day, one series; 4px rounded data end, square at the baseline; hover tooltips; table view below. */
function columnChart(points, { label, fmt = fmtN, head = 'Gün', every: ev = 8, hot = true }) {
  const W = 640, H = 180, L = 36, B = 22, T = 8;
  const max = Math.max(1, ...points.map((p) => p.v));
  const step = niceStep(max);
  const top = Math.ceil(max / step) * step;
  const band = (W - L) / Math.max(points.length, 1);
  const bw = Math.min(24, band * 0.62);
  const y = (v) => T + (H - T - B) * (1 - v / top);
  let g = '';
  for (let v = 0; v <= top; v += step) g += `<line class="grid-l" x1="${L}" x2="${W}" y1="${y(v)}" y2="${y(v)}"/><text class="tick" x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${fmtCompact(v)}</text>`;
  const every = Math.ceil(points.length / ev);
  const cols = points.map((p, i) => {
    const x = L + band * i + (band - bw) / 2, yy = y(p.v), h = H - B - yy;
    const r = Math.min(4, h, bw / 2);
    const d = h <= 0 ? '' : `M${x},${H - B}V${yy + r}Q${x},${yy} ${x + r},${yy}H${x + bw - r}Q${x + bw},${yy} ${x + bw},${yy + r}V${H - B}Z`;
    const lab = i % every === 0 || i === points.length - 1 ? `<text class="tick" x="${x + bw / 2}" y="${H - 6}" text-anchor="middle">${esc(p.label)}</text>` : '';
    return `<g><rect class="hit" x="${L + band * i}" y="${T}" width="${band}" height="${H - T - B}" data-tip="${esc(`${p.label}: ${fmt(p.v)} ${label}`)}"/>${d ? `<path class="col${hot && i === points.length - 1 ? ' hot' : ''}" d="${d}" pointer-events="none"/>` : ''}${lab}</g>`;
  }).join('');
  const table = `<details class="table"><summary>Tablo olarak göster</summary><div class="scroll-x"><table><thead><tr><th>${esc(head)}</th><th class="n">${esc(label)}</th></tr></thead><tbody>${points.map((p) => `<tr><td>${esc(p.label)}</td><td class="n">${esc(fmt(p.v))}</td></tr>`).join('')}</tbody></table></div></details>`;
  return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)} ${head === 'Gün' ? 'günlere' : 'saatlere'} göre">${g}<line class="base" x1="${L}" x2="${W}" y1="${H - B}" y2="${H - B}"/>${cols}</svg></div>${table}`;
}
function niceStep(max) {
  const raw = max / 4, p = 10 ** Math.floor(Math.log10(raw)), n = raw / p;
  return Math.max(1, (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p);
}
const tile = (l, v, s = '') => `<div class="tile"><div class="l">${esc(l)}</div><div class="v num">${esc(v)}</div>${s ? `<div class="s">${esc(s)}</div>` : ''}</div>`;

// ------------------------------------------------------------------ login screen
function renderLogin(msg = '', email = store.get('studio.email') || '') {
  $('#tabs').hidden = true;
  $('#logoutBtn').hidden = true;
  $('#main').innerHTML = `<div class="login card">
    <h1>Stüdyo paneli</h1>
    <p class="muted">E-postana bir giriş kodu ve bağlantı gelir. Şifre yok.</p>
    ${msg ? `<p class="errors">${esc(msg)}</p>` : ''}
    <form class="form" id="f-email">
      <label class="f"><span>E-posta</span><input type="email" name="email" autocomplete="email" required value="${esc(email)}"></label>
      <button class="btn primary" type="submit">Kod gönder</button>
    </form>
    <form class="form" id="f-code" hidden style="margin-top:16px">
      <p class="note">E-postadaki bağlantıya dokunabilirsin ya da gelen kodu buraya yazabilirsin.</p>
      <label class="f"><span>Kod</span><input name="code" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6,10}" required></label>
      <button class="btn primary" type="submit">Giriş yap</button>
    </form>
  </div>`;
  const fe = $('#f-email'), fc = $('#f-code');
  fe.onsubmit = async (ev) => {
    ev.preventDefault();
    const em = fe.email.value.trim();
    store.set('studio.email', em);
    fe.querySelector('button').disabled = true;
    try {
      await sendCode(em);
      fc.hidden = false;
      fc.code.focus();
    } catch (e) {
      renderLogin(e.status === 422 || e.status === 400 ? 'Bu e-postayla giriş yok. Hesabın açılması gerekiyor (bkz. docs/STUDYO-PANELI.md).' : e.status === 429 ? 'Çok sık denendi, biraz bekle.' : 'Kod gönderilemedi: ' + e.message, em);
    }
  };
  fc.onsubmit = async (ev) => {
    ev.preventDefault();
    fc.querySelector('button').disabled = true;
    try {
      await verifyCode(fe.email.value.trim(), fc.code.value.trim());
      await afterLogin();
    } catch (e) {
      fc.querySelector('button').disabled = false;
      fc.insertAdjacentHTML('afterbegin', `<p class="errors">Kod olmadı: ${esc(e.message)}</p>`);
    }
  };
}

async function afterLogin() {
  $('#main').innerHTML = '<p class="muted center pad">Yetki bakılıyor…</p>';
  try {
    const me = await rpc('st_whoami');
    state.admin = !!(me && me.admin);
    state.uid = (me && me.uid) || '';
  } catch (e) {
    if (e.status === 401) { saveSession(null); return renderLogin('Oturum bitti, yeniden giriş yap.'); }
    $('#main').innerHTML = `<div class="card login"><h1>Kurulum bekleniyor</h1><p>${esc(friendly(e))}</p></div>`;
    $('#logoutBtn').hidden = false;
    return;
  }
  $('#logoutBtn').hidden = false;
  if (!state.admin) {
    $('#main').innerHTML = `<div class="card login"><h1>Yetki yok</h1>
      <p>Giriş yaptın ama bu hesap panel yöneticisi değil.</p>
      <p class="small muted">Hesap numarası: <code>${esc(state.uid)}</code></p>
      <p class="small">Yönetici eklemek için (SQL Editor):</p>
      <pre>insert into public.st_admins (uid, note) values ('${esc(state.uid)}', 'owner') on conflict (uid) do nothing;</pre></div>`;
    return;
  }
  $('#tabs').hidden = false;
  $('#main').innerHTML = '<p class="muted center pad">Yükleniyor…</p>';
  await loadLive(false); // the game list (st_games) before the first page
  state.page = routeFromHash();
  render();
  startLive();
  if (store.get('studio.push') === '1') loadPush(); // this device's notifications: re-saved if the browser renewed them
  if (curSub() !== 'system') SYS.load(); // the Sistem button's mark (red / yellow) from the start
  // keep that mark fresh on every page (it also sits on the top Stüdyo tab): every 5 minutes while the panel is visible
  setInterval(() => { if (!document.hidden && curSub() !== 'system') SYS.load(); }, 5 * 60e3);
}

// ------------------------------------------------------------------ routing
function paintNav() {
  const nav = $('#tabs');
  const liveOf = (id) => state.live?.games?.find((g) => g.game === id)?.live;
  nav.innerHTML = [['studio', 'Stüdyo', null], ...gameList().map((g) => [g.game, g.title, liveOf(g.game)])].map(([k, t, n]) =>
    `<a href="${pageHash(k)}" data-page="${esc(k)}" ${k === state.page ? 'aria-current="page"' : ''}>${esc(t)}${n ? ` <span class="nav-n num" title="şu an oynayan">${fmtN(n)}</span>` : ''}${k === 'studio' ? navSysMark() : ''}</a>`).join('');
}
// the Sistem mark again on the top Stüdyo tab, so a yellow / red status shows from any page
function navSysMark() {
  const m = SYS_MARK[SYS.status()];
  return m ? ` <span class="hdot ${SYS.status()}" data-testid="sys-mark-nav" title="Sistem: ${m[1]}" aria-label="Sistem: ${m[1]}">${m[0]}</span>` : '';
}
function render() {
  if (!state.admin) return;
  if (state.page !== 'studio' && !gameOf(state.page)) state.page = 'studio';
  paintNav();
  const g = state.page === 'studio' ? null : gameOf(state.page);
  const sub = curSub();
  // the statistics settings ("?…" in the address) belong to the statistics section only: drop them elsewhere
  if (!['overview', 'stats'].includes(sub) && location.hash.includes('?')) history.replaceState(null, '', location.pathname + location.search + location.hash.split('?')[0]);
  $('#main').innerHTML = `<div class="page-head"><h1>${g ? esc(g.title) : 'Stüdyo'}</h1><span class="muted small">${g ? 'oyun sayfası' : 'bütün oyunlar ve genel işler'}</span>
      <span class="refresh-st"><span id="lastRef" class="muted small" data-testid="last-refresh"></span><button type="button" class="ghost" data-act="refresh" data-testid="refresh-btn" aria-label="Şimdi yenile" title="Şimdi yenile">⟳</button></span></div>
    <div class="chips subtabs" role="group" aria-label="Bölümler">${subsOf(state.page).map(([k, t]) => `<button type="button" data-act="sub" data-sub="${k}" aria-pressed="${k === shownSub(state.page, sub)}">${subLabel(k, t)}</button>`).join('')}</div>
    <div id="pane" data-page="${esc(state.page)}" data-sub="${sub}"></div>`;
  afterRender(sub);
  ctClose();
  ({ content: () => ctOf()?.paint(), overview: renderOverview, stats: renderGameStats, server: renderServer, todo: paintTodo, plans: paintPlans, errors: paintErrors,
    ranked: paintRanked, pass: () => PASS.paint(), journey: () => PASS.paintJourney(), tune: paintTune, rewards: paintRewards, season: paintSeason, ghost: paintGhost, sr: paintSr, notify: paintNotify, system: () => SYS.render() })[sub]?.();
}
// the Sistem section (studio/panel/health.js): its overall colour as a small mark on its button
// a journey fight's CPU (tune.js AI_KEYS): 0.25 is the soft Apprentice of the first fights, 0.5 Apprentice+
const aiName = (x) => (x === 0.25 ? 'Çırak (ilk dövüşler, yumuşak)' : x === 0.5 ? 'Çırak+' : LEVEL_NAMES[x]);
const SYS_MARK = { warn: ['!', 'dikkat'], bad: ['✕', 'sorun var'] };
function subLabel(k, t) {
  const m = k === 'system' ? SYS_MARK[SYS.status()] : null;
  return esc(t) + (m ? ` <span class="hdot ${SYS.status()}" data-testid="sys-mark" title="${m[1]}" aria-label="${m[1]}">${m[0]}</span>` : '');
}
const SYS = createSystem({
  $, esc, rpc, friendly, fmtDateTime, fmtDate, onPane: (...a) => onPane(...a), fnUrl: PUSH_FN,
  authFetch: async (url, body) => fetch(url, { method: 'POST', headers: { apikey: API.key, Authorization: 'Bearer ' + (await token()), 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
  onStatus: () => { const b = document.querySelector('[data-act=sub][data-sub=system]'); if (b) b.innerHTML = subLabel('system', 'Sistem'); if (state.admin) paintNav(); },
});
// the Shadow Duel Pass section (studio/panel/pass.js; games/06-shadow-duel/supabase/pass.sql)
const PASS = createPass({ $, esc, rpc, friendly, onPane: (...a) => onPane(...a), fmtN, fmtDate, barList, tile, serverFieldMsg: (e) => serverFieldMsg(e),
  dirty: () => { RF.dirty = true; }, done: () => formDone(), top: () => rewardsTabs('pass'), tabsFor: (k) => rewardsTabs(k) });
// <game> → İçerik (studio/panel/content.js; static files in content/<game>/): one per game that has the section
// (Truckstead's Trafik araçları group carries the remote traffic settings' editor: ts-traffic.js, supabase/studio/ts-traffic.sql)
const TS_TRAFFIC = createTrafficSettings({ esc, rpc, friendly, fmtDateTime, store });
const RB_DUNGEONS = createDungeonViews({ esc, store });
const CT = Object.fromEntries([['truckstead', 'Truckstead'], ['shadow-duel', 'Shadow Duel'], ['riftborn', 'Riftborn']].map(([game, title]) =>
  [game, createContent({ $, esc, store, fmtN, game, title, rpc, friendly, fmtDateTime, onPane: () => onPane('content', game),
    live: game === 'riftborn' ? contentLive({ rpc, esc, fmtN, repaint: () => { if (onPane('content', game)) CT[game].paint(); } }) : null, extras: game === 'truckstead' ? { vehicles: TS_TRAFFIC } : game === 'riftborn' ? { zones: RB_DUNGEONS } : {} })]));
const ctOf = (page = state.page) => CT[page] || null;
const ctClose = () => Object.values(CT).forEach((c) => c.close());
/** The pane is still showing this section (a slow answer must not paint over another page). */
const onPane = (sub, page = state.page) => !!$('#pane') && curSub() === sub && state.page === page;
function go(page) {
  if (location.hash !== pageHash(page)) location.hash = pageHash(page); // → hashchange → render
  else { state.page = page; render(); }
}
window.addEventListener('hashchange', () => {
  if (!state.admin) return;
  const page = routeFromHash();
  if (page === state.page && AN.onHash()) return; // only the statistics settings changed: analytics.js repainted
  state.page = page;
  render();
  window.scrollTo(0, 0);
});

// ================================================================== statistics
// the statistics area (analytics.js); the functions below draw the earlier sections it still uses
function renderOverview() {
  $('#pane').innerHTML = '<div id="s-install"></div><div id="an-root"></div>';
  paintInstallHint();
  AN.mount($('#an-root'), null);
}
function renderGameStats() { AN.mount($('#pane'), state.page); }
function renderServer() {
  $('#pane').innerHTML = `<section class="block" id="s-usage"></section>`;
  paintUsage();
  loadUsage();
}

async function loadLive(paint = true) {
  const before = gameList().map((g) => g.game).join();
  try { state.live = await rpc('st_live'); state.liveErr = null; state.liveAt = Date.now(); } catch (e) { state.liveErr = e; }
  if (!paint) return;
  // a new game (first beat) → its page appears in the menu
  paintNav();
  if (gameList().map((g) => g.game).join() !== before && ['todo', 'plans'].includes(curSub())) render();
  paintLive();
}
async function loadSummary() {
  const days = state.days; // a slower answer for another period must not replace the one now shown
  try { const r = await rpc('st_summary', { p_days: days }); if (days === state.days) { state.summary = r; state.summaryErr = null; } } catch (e) { state.summaryErr = e; }
  paintPeriod();
}
async function loadVersions() {
  try { state.versions = await rpc('st_versions', { p_days: 30 }); } catch (e) { state.versions = { error: e }; }
  paintVersions();
}
async function loadUsage() {
  try { state.usage = await rpc('st_usage'); } catch (e) { state.usage = { error: e }; }
  paintUsage();
}

function paintLive() {
  const el = $('#s-live');
  if (!el) return;
  const L = state.live;
  if (!L) { el.innerHTML = state.liveErr ? `<div class="warn-box">${esc(friendly(state.liveErr))}</div>` : '<p class="muted">Canlı sayılar geliyor…</p>'; return; }
  const ago = Math.round((Date.now() - state.liveAt) / 1000);
  const studio = state.page === 'studio';
  const games = studio ? (L.games || []) : (L.games || []).filter((g) => g.game === state.page);
  const total = studio ? L.total : games.reduce((a, g) => a + g.live, 0);
  const head = `<div class="bar-head"><h2>Şu an oynayan</h2><span class="muted small right" id="liveAgo">${ago < 5 ? 'az önce yenilendi' : `${ago} sn önce yenilendi`} · 20 sn'de bir</span></div>
    <div class="card" style="margin-bottom:12px"><div class="hero"><span class="v num" data-testid="live-total">${fmtN(total)}</span><span class="l"><span class="live-dot" aria-hidden="true"></span>${studio ? 'kişi şu an oyunlarımızda' : 'kişi şu an bu oyunda'} (son 2 dakika)</span></div>
      ${state.liveErr ? `<p class="small muted">Son yenileme olmadı: ${esc(friendly(state.liveErr))}</p>` : ''}</div>`;
  if (studio) {
    // the studio page: every game's live and today numbers; the details are on each game's page
    el.innerHTML = head + `<div class="grid">${games.map((g) => `
      <a class="card game-live link-card" data-game="${esc(g.game)}" href="${pageHash(g.game)}">
        <h3>${esc(titleOf(g))}<span class="go" aria-hidden="true">→</span></h3>
        <div class="big num">${fmtN(g.live)}</div>
        <div class="kv"><span>Bugün ${fmtN(g.today)} oyuncu</span><span>${fmtN(g.today_sessions)} oturum</span></div>
        ${g.live && g.screens.length ? `<p class="small muted" style="margin:6px 0 0">En çok: ${esc(g.screens.slice(0, 2).map((s) => `${screenName(s.k, g.game)} (${fmtN(s.n)})`).join(', '))}</p>` : '<p class="muted small" style="margin:6px 0 0">Şu an kimse oynamıyor.</p>'}
      </a>`).join('') || '<p class="muted">Henüz hiçbir oyundan veri gelmedi.</p>'}</div>`;
    return;
  }
  const g = games[0];
  el.innerHTML = head + (!g ? '<p class="muted">Bu oyundan henüz veri gelmedi.</p>' : `
    <article class="card game-live" data-game="${esc(g.game)}">
      <div class="kv"><span>Bugün ${fmtN(g.today)} oyuncu</span><span>${fmtN(g.today_sessions)} oturum</span></div>
      ${g.live ? `<div class="grid wide"><div><div class="sub-h">Ne yapıyorlar</div>${barList(g.screens.map((s) => ({ label: screenName(s.k, g.game), value: s.n, text: fmtN(s.n) })))}</div>
      <div><div class="sub-h">Nereden</div>${barList(g.portals.map((s) => ({ label: PORTAL[s.k] || s.k, value: s.n, text: fmtN(s.n) })))}
      <div class="sub-h">Cihaz</div>${barList(g.devices.map((s) => ({ label: DEVICE[s.k] || s.k, value: s.n, text: fmtN(s.n) })))}
      ${g.countries.length ? `<div class="sub-h">Ülke</div>${barList(g.countries.map((s) => ({ label: regionName(s.k), value: s.n, text: fmtN(s.n) })))}` : ''}</div></div>`
      : '<p class="muted small">Şu an kimse oynamıyor.</p>'}
    </article>`);
}
setInterval(() => {
  const a = $('#liveAgo');
  if (a && state.liveAt) { const s = Math.round((Date.now() - state.liveAt) / 1000); a.textContent = `${s < 5 ? 'az önce yenilendi' : `${s} sn önce yenilendi`} · 20 sn'de bir`; }
}, 5000);

function paintPeriod() {
  const el = $('#s-period');
  if (!el) return;
  const S = state.summary;
  const games = S && S.games ? S.games : [];
  const head = `<div class="bar-head"><h2>Dönem</h2>
    <div class="seg" role="group" aria-label="Dönem">${[[1, 'Bugün'], [7, '7 gün'], [30, '30 gün']].map(([d, t]) => `<button type="button" data-act="days" data-days="${d}" aria-pressed="${state.days === d}">${t}</button>`).join('')}</div></div>`;
  if (!S || S.days !== state.days) { el.innerHTML = head + (state.summaryErr ? `<div class="warn-box">${esc(friendly(state.summaryErr))}</div>` : '<p class="muted">Yükleniyor…</p>'); return; }
  const shown = games.filter((g) => g.game === state.page);
  el.innerHTML = head + `<p class="muted small">${S.days === 1 ? 'Bugün' : `${dayLabel(S.from)} – ${dayLabel(S.to)}`} (Türkiye saati)</p>` + (shown.map((g) => periodCard(g, S)).join('') || '<p class="muted">Henüz veri yok.</p>');
}

function periodCard(g, S) {
  const d1 = g.d1 || {}, d7 = g.d7 || {};
  const newSteps = [{ label: 'Yeni oyuncu', value: g.new_players, text: fmtN(g.new_players) }]
    .concat(eventOrder(g.game, funnelOf(g, S)).map((e) => ({ label: eventName(e.k, g.game), value: e.sessions, text: `${fmtN(e.sessions)} · ${pct(e.sessions, g.new_players)}` })));
  const screensTotal = (g.screens || []).reduce((a, s) => a + s.play_s, 0);
  return `<article class="card" style="margin-bottom:12px" data-period="${esc(g.game)}">
    <div class="tiles">
      ${tile('Oyuncu', fmtN(g.players), S.days > 1 ? 'farklı kişi' : '')}
      ${tile('Yeni oyuncu', fmtN(g.new_players))}
      ${tile('Oturum', fmtN(g.sessions))}
      ${tile('Ortalama oyun', fmtDur(g.avg_session_s), 'bir oturumda')}
      ${tile('Ertesi gün dönen', d1.installs ? pct(d1.back, d1.installs) : '—', d1.installs ? `${fmtN(d1.back)} / ${fmtN(d1.installs)} yeni oyuncu` : 'henüz ölçülemedi')}
      ${tile('7. gün dönen', d7.installs ? pct(d7.back, d7.installs) : '—', d7.installs ? `${fmtN(d7.back)} / ${fmtN(d7.installs)} yeni oyuncu` : 'henüz ölçülemedi')}
    </div>
    ${S.days > 1 ? `<div class="sub-h">Günlük oyuncu</div>${columnChart(g.series.map((p) => ({ label: dayLabel(p.d), v: p.players })), { label: 'oyuncu' })}` : ''}
    <div class="grid wide" style="margin-top:4px">
      <div><div class="sub-h">Oyun süresi nereye gidiyor</div>${barList((g.screens || []).slice(0, 8).map((s) => ({ label: screenName(s.k, g.game), value: s.play_s, text: `${fmtDur(s.play_s)} · ${pct(s.play_s, screensTotal)}` })))}</div>
      <div><div class="sub-h">Yeni oyuncu hunisi</div>${barList(newSteps, { max: Math.max(1, g.new_players, ...newSteps.map((s) => s.value)) })}
        <p class="small muted">Yeni oyuncuların kaçı bu adıma ilk kez ulaştı.</p></div>
    </div>
    <details class="more"><summary>Nereden, cihaz, ülke, dil, tarayıcı</summary><div class="grid wide">
      <div><div class="sub-h">Nereden</div>${barList((g.portals || []).map((s) => ({ label: PORTAL[s.k] || s.k, value: s.sessions, text: `${fmtN(s.sessions)} oturum` })))}
        <div class="sub-h">Cihaz</div>${barList((g.devices || []).map((s) => ({ label: DEVICE[s.k] || s.k, value: s.sessions, text: `${fmtN(s.sessions)} oturum` })))}</div>
      <div><div class="sub-h">Ülke</div>${barList((g.countries || []).slice(0, 6).map((s) => ({ label: regionName(s.k), value: s.sessions, text: `${fmtN(s.sessions)} oturum` })))}
        <div class="sub-h">Dil</div>${barList((g.langs || []).slice(0, 6).map((s) => ({ label: langName(s.k), value: s.sessions, text: `${fmtN(s.sessions)} oturum` })))}
        <div class="sub-h">Tarayıcı</div>${barList((g.browsers || []).map((s) => ({ label: BROWSER[s.k] || s.k, value: s.sessions, text: `${fmtN(s.sessions)} oturum` })))}</div>
    </div></details>
  </article>`;
}

const verKey = (v) => String(v).split('.').map((x) => x.padStart(6, '0')).join('.');
function paintVersions() {
  const el = $('#s-versions');
  if (!el) return;
  const X = state.versions;
  if (!X) { el.innerHTML = '<h2>Sürümler</h2><p class="muted">Yükleniyor…</p>'; return; }
  if (X.error) { el.innerHTML = `<h2>Sürümler</h2><div class="warn-box">${esc(friendly(X.error))}</div>`; return; }
  el.innerHTML = `<div class="bar-head"><h2>Sürümler</h2><span class="muted small">son 30 gün</span></div>` + X.games.filter((g) => g.game === state.page && g.versions.length).map((g) => {
    const vs = g.versions.slice().sort((a, b) => (verKey(b.ver) > verKey(a.ver) ? 1 : -1));
    const evs = eventOrder(g.game, [...new Set(vs.flatMap((v) => v.events.map((e) => e.k)))], (k) => k, (k) => vs.reduce((a, v) => a + (v.events.find((e) => e.k === k)?.players || 0), 0)).slice(0, 4);
    return `<article class="card" style="margin-bottom:12px" data-versions="${esc(g.game)}"><div class="scroll-x"><table class="wide">
      <thead><tr><th>Sürüm</th><th class="n">Oturum</th><th class="n">Ort. oyun</th><th class="n">Yeni oyuncu</th><th class="n">Ertesi gün</th><th class="n">7. gün</th>${evs.map((e) => `<th class="n">${esc(eventName(e, g.game))}</th>`).join('')}</tr></thead>
      <tbody>${vs.map((v) => `<tr><td><b>${esc(v.ver)}</b></td><td class="n">${fmtN(v.sessions)}</td><td class="n">${fmtDur(v.avg_session_s)}</td><td class="n">${fmtN(v.new_players)}</td>
        <td class="n">${v.d1.installs ? pct(v.d1.back, v.d1.installs) : '—'}</td><td class="n">${v.d7.installs ? pct(v.d7.back, v.d7.installs) : '—'}</td>
        ${evs.map((e) => { const x = v.events.find((y) => y.k === e); return `<td class="n">${x ? `${fmtN(x.players)} · ${pct(x.players, v.new_players)}` : '—'}</td>`; }).join('')}</tr>`).join('')}</tbody></table></div>
      <p class="small muted">Dönüş oranları o sürümle başlayan yeni oyuncular için. Olay sütunları: o adıma ulaşan kişi · yeni oyunculara oranı.</p></article>`;
  }).join('') + (X.games.some((g) => g.game === state.page && g.versions.length) ? '' : '<p class="muted">Henüz veri yok.</p>');
}

// ---------------------------------------------------------------- statistics 2 (supabase/studio/stats2.sql): trends, games side by side,
// measured events (ads, loading, smoothness), earnings. One call per view: st_trends (studio), st_game_stats (a game page).
const STATS2_MS = 60000;
Object.assign(state, { trends: null, trendsAt: 0, trendsErr: null, gstats: null, gstatsAt: 0, gstatsErr: null, cmpSort: { k: 'w_play', dir: -1 }, revEdit: null, revErrs: [], revMsg: '' });
const MEAS = /^(ad_|load_|fps_|hitch_)/;
const MEAS_NOTE = (game) => `Bu oyun henüz bu ölçümü göndermiyor${game === 'shadow-duel' ? ' (Shadow Duel 1.3.1 ile gelecek)' : ''}.`;
const LOAD_B = [['load_s2', '2 sn altı'], ['load_s5', '2–5 sn'], ['load_s10', '5–10 sn'], ['load_s20', '10–20 sn'], ['load_s30p', '20 sn üstü']];
const FPS_B = [['fps_60', 'Çok akıcı (55+ kare/sn)'], ['fps_45', 'Akıcı (45–55)'], ['fps_30', 'Orta (30–45)'], ['fps_20', 'Takılıyor (20–30)'], ['fps_low', 'Çok takılıyor (20 altı)']];
const HITCH_B = [['hitch_0', 'Hiç takılma yok'], ['hitch_1', '1–5 takılma'], ['hitch_6', '6–20 takılma'], ['hitch_21', '20\'den çok takılma']];
const istDay = (t = Date.now()) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(t));
const addDay = (d, n) => new Date(Date.parse(d + 'T12:00:00Z') + n * 864e5).toISOString().slice(0, 10);
/** the game page's st_game_stats answer when it is for this game and period (and fresher than maxAge ms, when given) */
const gsFor = (game, days, maxAge) => (state.gstats && state.gstats.game === game && state.gstats.days === days && (!maxAge || Date.now() - state.gstatsAt < maxAge) ? state.gstats : null);
/** the latest st_game_stats answer of this game, whatever its period (for the parts that do not depend on it) */
const gsAny = (game) => (state.gstats && state.gstats.game === game ? state.gstats : null);
/** funnel steps of the period card: st_game_stats' list (measured events left out on the server) or st_summary's, filtered */
function funnelOf(g, S) {
  const x = gsFor(g.game, S.days);
  return x && Array.isArray(x.funnel) ? x.funnel : (g.events || []).filter((e) => !MEAS.test(e.k));
}
const missingNote = (what) => `<div class="warn-box" data-testid="s2-missing">${esc(what)} için sunucu kurulumu henüz yapılmadı (supabase/studio/stats2.sql). Diğer sayılar çalışır.</div>`;

async function loadTrends() {
  try { state.trends = await rpc('st_trends'); state.trendsErr = null; state.trendsAt = Date.now(); } catch (e) { state.trendsErr = e; }
  if (onPane('overview', 'studio')) { paintTrend(); paintCompare(); }
}
async function loadGameStats(days = state.days) {
  const game = state.page;
  if (game === 'studio') return;
  try {
    const r = await rpc('st_game_stats', { p_game: game, p_days: days });
    if (state.page === game) { state.gstats = r; state.gstatsAt = Date.now(); state.gstatsErr = null; }
  } catch (e) { if (state.page === game) state.gstatsErr = e; }
  if (onPane('stats', game) && days === state.days) { paintTrend(); paintPeriod(); paintMore(); paintRevenue(); }
}

// ---- change against the period before: ▲ / ▼ with plain words
/** kind: 'n' (a count or seconds: percent change) or 'rate' (a share: change in points) */
function delta(cur, prev, kind = 'n') {
  if (cur == null || prev == null) return '<span class="delta flat">—</span>';
  if (kind === 'rate') {
    const d = Math.round(100 * (cur - prev));
    if (!d) return '<span class="delta flat">= aynı</span>';
    return `<span class="delta ${d > 0 ? 'up' : 'down'}">${d > 0 ? '▲' : '▼'} ${Math.abs(d)} puan</span>`;
  }
  if (!prev) return cur ? '<span class="delta up">▲ yeni</span>' : '<span class="delta flat">—</span>';
  const p = Math.round((100 * (cur - prev)) / prev);
  if (!p) return '<span class="delta flat">= aynı</span>';
  return `<span class="delta ${p > 0 ? 'up' : 'down'}">${p > 0 ? '▲' : '▼'} %${Math.abs(p)} ${p > 0 ? 'arttı' : 'azaldı'}</span>`;
}
const rate = (x) => (x && x.installs ? x.back / x.installs : null);
const avgS = (p) => (p && p.sessions ? p.play_s / p.sessions : 0);
const fmtRate = (r) => (r == null ? '—' : `%${Math.round(100 * r)}`);
/** a big number with its change and the number before; help = one plain line on what it is */
function trendTile(label, cur, prev, { fmt = fmtN, kind = 'n', help = '', id = '' } = {}) {
  return `<div class="tile trend"${id ? ` data-trend="${esc(id)}"` : ''}><div class="l">${esc(label)}</div><div class="v num">${esc(cur == null ? '—' : fmt(cur))}</div>
    <div class="s">${delta(cur, prev, kind)} <span class="muted">· önce ${esc(prev == null ? '—' : fmt(prev))}</span></div>${help ? `<div class="h">${esc(help)}</div>` : ''}</div>`;
}
/** add up the trend objects of several games (the studio's total; every game counts its own players) */
function sumTrend(list) {
  const z = () => ({ players: 0, new_players: 0, sessions: 0, play_s: 0 });
  const out = { d0: z(), d1: z(), d2: z(), w: { ...z(), ret1: { installs: 0, back: 0 }, ret7: { installs: 0, back: 0 } }, pw: { ...z(), ret1: { installs: 0, back: 0 }, ret7: { installs: 0, back: 0 } } };
  for (const t of list) for (const k of Object.keys(out)) {
    for (const f of ['players', 'new_players', 'sessions', 'play_s']) out[k][f] += (t[k] && t[k][f]) || 0;
    for (const r of ['ret1', 'ret7']) if (out[k][r] && t[k] && t[k][r]) { out[k][r].installs += t[k][r].installs; out[k][r].back += t[k][r].back; }
  }
  return out;
}
function paintTrend() {
  const el = $('#s-trend');
  if (!el) return;
  const studio = state.page === 'studio';
  const head = `<div class="bar-head"><h2>Gidişat</h2><span class="muted small">dün önceki günle, son 7 gün önceki 7 günle (bugün yarım olduğu için karşılaştırmaya girmez)</span></div>`;
  const err = studio ? state.trendsErr : state.gstatsErr;
  const T = studio ? (state.trends ? sumTrend((state.trends.games || []).map((g) => g.trend)) : null) : gsAny(state.page)?.trend;
  if (!T) { el.innerHTML = head + (err ? (err.missing ? missingNote('Gidişat') : `<div class="warn-box">${esc(friendly(err))}</div>`) : '<p class="muted">Yükleniyor…</p>'); return; }
  const today = istDay();
  const y = T.d1, b = T.d2, w = T.w, pw = T.pw;
  el.innerHTML = head + `<article class="card" data-testid="trend">
    <div class="sub-h" style="margin-top:0">Dün (${esc(dayLabel(addDay(today, -1)))}) · önceki gün (${esc(dayLabel(addDay(today, -2)))})</div>
    <div class="tiles">
      ${trendTile('Oyuncu', y.players, b.players, { id: 'd-players', help: 'O gün oyunu açan farklı kişi.' })}
      ${trendTile('Yeni oyuncu', y.new_players, b.new_players, { id: 'd-new', help: 'Oyunu o gün ilk kez açanlar.' })}
      ${trendTile('Toplam oyun süresi', y.play_s, b.play_s, { fmt: fmtDur, id: 'd-play', help: 'Herkesin oyunda geçirdiği süre. Reklam parası en çok buna bağlı.' })}
      ${trendTile('Ortalama oyun', avgS(y), avgS(b), { fmt: fmtDur, id: 'd-avg', help: 'Bir açılışta (oturumda) ortalama süre.' })}
    </div>
    <div class="sub-h">Son 7 gün (${esc(dayLabel(addDay(today, -7)))} – ${esc(dayLabel(addDay(today, -1)))}) · önceki 7 gün</div>
    <div class="tiles">
      ${trendTile('Oyuncu', w.players, pw.players, { id: 'w-players', help: studio ? 'Haftada oyun açan farklı kişi (her oyun kendi oyuncusunu sayar).' : 'Haftada oyunu açan farklı kişi.' })}
      ${trendTile('Yeni oyuncu', w.new_players, pw.new_players, { id: 'w-new', help: 'Haftada oyunu ilk kez açanlar.' })}
      ${trendTile('Toplam oyun süresi', w.play_s, pw.play_s, { fmt: fmtDur, id: 'w-play', help: 'Oyuncu sayısı × süre: gelirin en iyi göstergesi.' })}
      ${trendTile('Ortalama oyun', avgS(w), avgS(pw), { fmt: fmtDur, id: 'w-avg', help: 'Bir oturumda ortalama süre.' })}
      ${trendTile('Ertesi gün dönen', rate(w.ret1), rate(pw.ret1), { fmt: fmtRate, kind: 'rate', id: 'w-ret1', help: 'Yeni gelenlerin yüzde kaçı ertesi gün yine oynadı. "Puan": iki yüzde arasındaki fark.' })}
      ${trendTile('7. gün dönen', rate(w.ret7), rate(pw.ret7), { fmt: fmtRate, kind: 'rate', id: 'w-ret7', help: 'Yeni gelenlerin yüzde kaçı bir hafta sonra yine oynadı.' })}
    </div>
    <p class="small muted" style="margin:8px 0 0">▲ yeşil: artış, ▼ kırmızı: düşüş. "önce": karşılaştırılan günün ya da haftanın sayısı.</p>
  </article>`;
}

// ---- games side by side (studio page)
const CMP_COLS = [
  ['title', 'Oyun', null, 'Oyunun adı. Dokununca oyunun sayfası açılır.'],
  ['today', 'Bugün oyuncu', fmtN, 'Bugün şu ana kadar oyunu açan farklı kişi.'],
  ['w_players', '7 gün oyuncu', fmtN, 'Dün dahil son 7 günde oyunu açan farklı kişi.'],
  ['w_new', 'Yeni (7 gün)', fmtN, 'Son 7 günde oyunu ilk kez açan.'],
  ['w_avg', 'Ort. oyun', fmtDur, 'Bir oturumda ortalama süre.'],
  ['w_play', 'Toplam süre (7 gün)', fmtDur, 'Haftanın toplam oyun süresi; reklam parasına en yakın sayı.'],
  ['ret1', 'Ertesi gün dönen', fmtRate, 'Yeni gelenlerin ertesi gün yine oynayanı.'],
  ['ret7', '7. gün dönen', fmtRate, 'Yeni gelenlerin bir hafta sonra yine oynayanı.'],
  ['spp', 'Oturum / oyuncu', (v) => (v == null ? '—' : v.toFixed(1).replace('.', ',')), 'Bir oyuncu haftada kaç kez oyunu açtı.'],
];
function cmpRows() {
  return ((state.trends && state.trends.games) || []).map((g) => {
    const t = g.trend;
    return { game: g.game, title: titleOf(g), today: t.d0.players, w_players: t.w.players, w_new: t.w.new_players, w_avg: avgS(t.w), w_play: t.w.play_s,
      ret1: rate(t.w.ret1), ret7: rate(t.w.ret7), spp: t.w.players ? t.w.sessions / t.w.players : null };
  });
}
function paintCompare() {
  const el = $('#s-compare');
  if (!el) return;
  const head = `<div class="bar-head"><h2>Oyunlar yan yana</h2><span class="muted small">son 7 tam gün; başlığa dokununca sıralanır</span></div>`;
  if (!state.trends) { el.innerHTML = state.trendsErr ? '' : head + '<p class="muted">Yükleniyor…</p>'; return; }
  const { k, dir } = state.cmpSort;
  const rows = cmpRows().sort((a, b) => (k === 'title' ? dir * a.title.localeCompare(b.title, 'tr') : dir * ((a[k] ?? -1) - (b[k] ?? -1)) || a.title.localeCompare(b.title, 'tr')));
  if (!rows.length) { el.innerHTML = head + '<p class="muted">Henüz hiçbir oyundan veri gelmedi.</p>'; return; }
  el.innerHTML = head + `<div class="card"><div class="scroll-x"><table class="wide cmp" data-testid="cmp">
    <thead><tr>${CMP_COLS.map(([c, t, , h]) => `<th class="${c === 'title' ? '' : 'n'}" title="${esc(h)}"><button type="button" class="sort" data-act="cmp-sort" data-k="${c}" aria-sort="${c === k ? (dir > 0 ? 'ascending' : 'descending') : 'none'}">${esc(t)}${c === k ? (dir > 0 ? ' ↑' : ' ↓') : ''}</button></th>`).join('')}</tr></thead>
    <tbody>${rows.map((r) => `<tr data-game="${esc(r.game)}" data-href="${esc(pageHash(r.game))}">${CMP_COLS.map(([c, , f]) => (c === 'title'
      ? `<td><a href="${esc(pageHash(r.game))}">${esc(r.title)}</a></td>` : `<td class="n" data-k="${c}">${esc(f(r[c]))}</td>`)).join('')}</tr>`).join('')}</tbody></table></div>
    <details class="more"><summary>Bu sütunlar ne demek?</summary><ul class="help">${CMP_COLS.map(([, t, , h]) => `<li><b>${esc(t)}:</b> ${esc(h)}</li>`).join('')}</ul></details></div>`;
}

// ---- the game page's period sections: where players leave, the return table, new vs returning, hours, portals,
// versions, countries; then ads, loading, smoothness (the measured events)
state.endSeg = 'all';
function paintMore() {
  const el = $('#s-more');
  if (!el) return;
  const X = gsFor(state.page, state.days);
  if (!X) { el.innerHTML = state.gstatsErr ? '' : '<p class="muted">Yükleniyor…</p>'; return; }
  const seen = new Set(X.seen || []);
  const parts = [], never = [];
  if (seen.has('ad')) parts.push(adsBlock(X)); else never.push('Reklam');
  if (seen.has('load')) parts.push(loadBlock(X)); else never.push('Yükleme');
  if (seen.has('fps') || seen.has('hitch')) parts.push(smoothBlock(X)); else never.push('Akıcılık');
  const per = X.days === 1 ? 'bugün' : `son ${X.days} gün`;
  el.innerHTML = `<div class="bar-head"><h2>Oyuncular nerede bırakıyor</h2><span class="muted small">${per}</span>
      <div class="seg right" role="group" aria-label="Oyuncu">${[['all', 'Hepsi'], ['new', 'Yeni'], ['ret', 'Dönen']].map(([k, t]) => `<button type="button" data-act="end-seg" data-seg="${k}" aria-pressed="${state.endSeg === k}">${t}</button>`).join('')}</div></div>
    <div class="grid wide">${exitBlock(X)}${lenBlock(X)}</div>
    <div class="bar-head" style="margin-top:20px"><h2>Geri dönüyorlar mı</h2><span class="muted small">kurulum gününe göre</span></div>${retBlock(X)}
    <div class="grid wide" style="margin-top:12px">${newRetBlock(X)}${hoursBlock(X)}</div>
    <div class="bar-head" style="margin-top:20px"><h2>Nereden, hangi sürüm</h2><span class="muted small">${per}</span></div>
    <div class="grid wide">${cmpBlock(X, 'portals')}${cmpBlock(X, 'versions')}${countryBlock(X)}</div>
    <div class="bar-head" style="margin-top:20px"><h2>Oyunun içi</h2><span class="muted small">${per}</span></div>`
    + (parts.length ? `<div class="grid wide">${parts.join('')}</div>` : '')
    + (never.length ? `<div class="note" data-testid="meas-none" style="margin-top:12px"><b>${esc(never.join(', '))}:</b> ${esc(MEAS_NOTE(X.game))}</div>` : '');
}
const LEN_B = [['lt30', '30 sn altı'], ['lt60', '30 sn – 1 dk'], ['lt180', '1–3 dk'], ['lt600', '3–10 dk'], ['ge600', '10 dk üstü']];
const ENDS_NOTE = 'Oturum bittikten 35 dk sonra sayılır; 3 saniyeden kısa açılışlar hiç gelmez.';
/** ended sessions of the chosen players (all / new / returning), per key: Map(key → sessions) */
function endsOf(X, kind) {
  const m = new Map();
  for (const e of X.ends || []) if (e.kind === kind && (state.endSeg === 'all' || e.seg === state.endSeg)) m.set(e.k, (m.get(e.k) || 0) + e.sessions);
  return m;
}
const segWord = () => ({ all: '', new: ' (yeni oyuncular)', ret: ' (dönen oyuncular)' })[state.endSeg] || '';
function exitBlock(X) {
  const m = endsOf(X, 'exit'), total = [...m.values()].reduce((a, b) => a + b, 0);
  const list = [...m].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1)).slice(0, 8);
  return `<article class="card" data-block="exits"><h3>Çıkış ekranı${esc(segWord())}</h3>
    ${total ? barList(list.map(([k, n]) => ({ label: k === '?' ? 'Bilinmiyor' : screenName(k, X.game), value: n, text: `${pct(n, total)} · ${fmtN(n)}` })))
      : '<p class="muted small">Henüz biten oturum yok.</p>'}
    <p class="small muted">Oyuncu oyunu hangi ekrandayken kapattı ya da bıraktı (${fmtN(total)} oturum). "Açılıyor"da bırakan, oyun yüklenmeden gitmiş demektir. ${ENDS_NOTE}</p></article>`;
}
function lenBlock(X) {
  const m = endsOf(X, 'len'), total = [...m.values()].reduce((a, b) => a + b, 0), n = (k) => m.get(k) || 0;
  return `<article class="card" data-block="lengths"><h3>İlk dakika: oturum ne kadar sürdü${esc(segWord())}</h3>
    ${total ? `<div class="tiles">${tile('30 sn dolmadan çıkan', pct(n('lt30'), total), 'oyunu hemen bırakan')}${tile('1 dk dolmadan çıkan', pct(n('lt30') + n('lt60'), total), 'ilk dakikada giden')}${tile('10 dk\'dan uzun', pct(n('ge600'), total), 'oyuna gerçekten dalan')}</div>
      ${barList(LEN_B.map(([k, t]) => ({ label: t, value: n(k), text: `${pct(n(k), total)} · ${fmtN(n(k))}` })), { max: Math.max(1, ...LEN_B.map(([k]) => n(k))) })}`
      : '<p class="muted small">Henüz biten oturum yok.</p>'}
    <p class="small muted">Bir açılışta oyunun önde (görünür) olduğu süre. İlk dakikada gidenler çoksa giriş, yükleme ya da ilk ekran sıkıyor. ${ENDS_NOTE}</p></article>`;
}
/** return table: rows = install days, columns = day 1 / 3 / 7 / 14 / 30, cells shaded by the share */
function retBlock(X) {
  const rows = X.retention || [];
  if (!rows.length) return '<div class="card" data-block="retention"><p class="muted small" style="margin:0">Henüz veri yok: ilk gün bittikten sonra dolmaya başlar (her gece yenilenir).</p></div>';
  const D = [1, 3, 7, 14, 30];
  const shade = (p) => `--a:${Math.round(Math.min(1, p * 2.5) * 60)}%`;
  const cell = (r, d) => {
    const v = r['d' + d];
    if (v == null) return '<td class="n ret na" title="bu gün daha gelmedi">·</td>';
    return `<td class="n ret" style="${shade(r.installs ? v / r.installs : 0)}" title="${fmtN(v)} / ${fmtN(r.installs)}">${pct(v, r.installs)}</td>`;
  };
  const avg = D.map((d) => { const ok = rows.filter((r) => r['d' + d] != null); const i = ok.reduce((a, r) => a + r.installs, 0); return i ? { v: ok.reduce((a, r) => a + r['d' + d], 0), i } : null; });
  const line = (r) => `<tr data-day="${esc(r.d)}"><td>${esc(dayLabel(r.d))}</td><td class="n">${fmtN(r.installs)}</td>${D.map((d) => cell(r, d)).join('')}</tr>`;
  const head = `<thead><tr><th>Kurulum günü</th><th class="n">Yeni</th>${D.map((d) => `<th class="n">${d}. gün</th>`).join('')}</tr></thead>`;
  return `<div class="card" data-block="retention"><div class="scroll-x"><table class="ret-t" data-testid="ret-table">${head}
    <tbody><tr class="avg"><td><b>Ortalama</b></td><td class="n">${fmtN(rows.reduce((a, r) => a + r.installs, 0))}</td>${avg.map((x) => (x ? `<td class="n ret" style="${shade(x.v / x.i)}"><b>${pct(x.v, x.i)}</b></td>` : '<td class="n ret na">·</td>')).join('')}</tr>
    ${rows.slice(0, 10).map(line).join('')}</tbody></table></div>
    ${rows.length > 10 ? `<details class="table"><summary>Daha eski günler (${fmtN(rows.length - 10)})</summary><div class="scroll-x"><table class="ret-t">${head}<tbody>${rows.slice(10).map(line).join('')}</tbody></table></div></details>` : ''}
    <p class="small muted">O gün oyunu ilk kez açanların yüzde kaçı tam 1, 3, 7, 14, 30 gün sonra yine oynadı. Koyu hücre: daha çok dönen. "·": o gün henüz gelmedi. Her gece yenilenir.</p></div>`;
}
/** two stacked series per day: a (bottom) and b (top); tap a column for the numbers; table below */
function stackChart(points, { la, lb, head = 'Gün' }) {
  const W = 640, H = 180, L = 36, B = 22, T = 8;
  const max = Math.max(1, ...points.map((p) => p.a + p.b)), step = niceStep(max), top = Math.ceil(max / step) * step;
  const band = (W - L) / Math.max(points.length, 1), bw = Math.min(24, band * 0.62), y = (v) => T + (H - T - B) * (1 - v / top);
  let g = '';
  for (let v = 0; v <= top; v += step) g += `<line class="grid-l" x1="${L}" x2="${W}" y1="${y(v)}" y2="${y(v)}"/><text class="tick" x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${fmtCompact(v)}</text>`;
  const every = Math.ceil(points.length / 7);
  const cols = points.map((p, i) => {
    const x = L + band * i + (band - bw) / 2, ya = y(p.a), yb = y(p.a + p.b);
    const lab = i % every === 0 || i === points.length - 1 ? `<text class="tick" x="${x + bw / 2}" y="${H - 6}" text-anchor="middle">${esc(p.label)}</text>` : '';
    return `<g><rect class="hit" x="${L + band * i}" y="${T}" width="${band}" height="${H - T - B}" data-tip="${esc(`${p.label}: ${fmtN(p.a)} ${la}, ${fmtN(p.b)} ${lb}`)}"/>`
      + (p.a ? `<rect class="col" x="${x}" y="${ya}" width="${bw}" height="${H - B - ya}" pointer-events="none"/>` : '')
      + (p.b ? `<rect class="col2" x="${x}" y="${yb}" width="${bw}" height="${Math.max(0, ya - yb - (p.a ? 1 : 0))}" rx="3" pointer-events="none"/>` : '') + `${lab}</g>`;
  }).join('');
  const table = `<details class="table"><summary>Tablo olarak göster</summary><div class="scroll-x"><table><thead><tr><th>${esc(head)}</th><th class="n">${esc(la)}</th><th class="n">${esc(lb)}</th></tr></thead><tbody>${points.map((p) => `<tr><td>${esc(p.label)}</td><td class="n">${fmtN(p.a)}</td><td class="n">${fmtN(p.b)}</td></tr>`).join('')}</tbody></table></div></details>`;
  return `<div class="legend small"><span class="sw a"></span>${esc(la)} <span class="sw b"></span>${esc(lb)}</div><div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(la)} ve ${esc(lb)}, ${head === 'Gün' ? 'günlere' : 'saatlere'} göre">${g}<line class="base" x1="${L}" x2="${W}" y1="${H - B}" y2="${H - B}"/>${cols}</svg></div>${table}`;
}
function newRetBlock(X) {
  const pts = (X.daily || []).map((p) => ({ label: dayLabel(p.d), a: p.new_players, b: Math.max(0, p.players - p.new_players) }));
  return `<article class="card" data-block="newret"><h3>Yeni ve dönen oyuncular (son 14 gün)</h3>
    ${pts.some((p) => p.a + p.b) ? stackChart(pts, { la: 'yeni', lb: 'dönen' }) : '<p class="muted small">Henüz veri yok.</p>'}
    <p class="small muted">Yeni: o gün oyunu ilk kez açan. Dönen: daha önce de oynamış olan. Dönenlerin payı büyüdükçe oyun tutuyor demektir.</p></article>`;
}
function hoursBlock(X) {
  const H = X.hours || [];
  const tot = H.reduce((a, h) => a + h.sessions, 0);
  const best = H.slice().sort((a, b) => b.sessions - a.sessions)[0];
  const hh = (h) => `${String(h).padStart(2, '0')}:00`;
  return `<article class="card" data-block="hours"><h3>Saatler (son 7 gün, Türkiye saati)</h3>
    ${tot ? `${columnChart(H.map((h) => ({ label: String(h.h).padStart(2, '0'), v: h.sessions })), { label: 'oturum', head: 'Saat', every: 8, hot: false })}
      <p class="small" data-testid="busiest">En kalabalık saat: <b>${hh(best.h)}–${hh((best.h + 1) % 24)}</b>.</p>` : '<p class="muted small">Henüz biten oturum yok.</p>'}
    <p class="small muted">O saatte oyunda olan oturum sayısı (iki saate yayılan oturum ikisinde de sayılır). Güncelleme ve duyuru için en iyi zaman kalabalıktan hemen önce.</p></article>`;
}
function countryBlock(X) {
  const C = X.countries || [];
  return `<article class="card" data-block="countries"><h3>Ülkeler</h3>
    ${C.length ? `<div class="scroll-x"><table data-testid="countries"><thead><tr><th>Ülke</th><th class="n">Oyuncu</th><th class="n">Önceki dönem</th><th class="n">Değişim</th></tr></thead>
      <tbody>${C.map((c) => `<tr data-k="${esc(c.k)}"><td>${esc(regionName(c.k))}</td><td class="n">${fmtN(c.players)}</td><td class="n">${fmtN(c.prev)}</td><td class="n">${delta(c.players, c.prev)}</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted small">Henüz veri yok.</p>'}
    <p class="small muted">En çok oyuncu gelen 8 ülke, aynı uzunluktaki önceki dönemle. Oyuncu her gün ayrı sayılır (iki gün gelen iki sayılır).</p></article>`;
}
/** portals or versions side by side; ★ marks the best of each column (only among rows with enough players) */
function cmpBlock(X, which) {
  const rows = (X[which] || []).map((r) => ({ ...r, daily: r.players / X.days, d1r: rate(r.d1) }));
  const name = (k) => (which === 'portals' ? PORTAL[k] || k : k);
  const best = (f, ok = () => true) => { const c = rows.filter(ok); return c.length < 2 ? null : c.reduce((a, r) => (r[f] > a[f] ? r : a)); };
  const B = { daily: best('daily'), avg_s: best('avg_s', (r) => r.sessions >= 20), play_s: best('play_s'), d1r: best('d1r', (r) => r.d1.installs >= 10 && r.d1r != null) };
  const td = (r, f, txt) => `<td class="n${B[f] === r ? ' best' : ''}"${B[f] === r ? ' data-best' : ''}>${B[f] === r ? '★ ' : ''}${esc(txt)}</td>`;
  return `<article class="card" data-block="${which}"><h3>${which === 'portals' ? 'Portallar' : 'Sürümler'}</h3>
    ${rows.length ? `<div class="scroll-x"><table data-testid="cmp-${which}"><thead><tr><th>${which === 'portals' ? 'Portal' : 'Sürüm'}</th><th class="n">Günlük oyuncu</th><th class="n">Ort. oyun</th><th class="n">Toplam süre</th><th class="n">Ertesi gün dönen</th></tr></thead>
      <tbody>${rows.map((r) => `<tr data-k="${esc(r.k)}"><td><b>${esc(name(r.k))}</b></td>${td(r, 'daily', r.daily.toFixed(1).replace('.', ','))}${td(r, 'avg_s', fmtDur(r.avg_s))}${td(r, 'play_s', fmtDur(r.play_s))}${td(r, 'd1r', r.d1r == null ? '—' : fmtRate(r.d1r))}</tr>`).join('')}</tbody></table></div>`
      : '<p class="muted small">Henüz veri yok.</p>'}
    <p class="small muted">★ o sütunun en iyisi (ortalama oyunda en az 20 oturum, dönüşte en az 10 yeni oyuncu olanlar arasından). Günlük oyuncu: dönemde günde ortalama kaç kişi. Ertesi gün dönen: yalnız biten günler.</p></article>`;
}
const evN = (X, k) => (X.events || []).find((e) => e.k === k)?.n || 0;
const perS = (a, b) => (b > 0 ? (a / b).toFixed(2).replace('.', ',') : '—');
function adsBlock(X) {
  const S = X.ev_sessions || 0, n = (k) => evN(X, k);
  const shown = n('ad_inter_shown'), ifail = n('ad_inter_fail'), offer = n('ad_rew_offer'), click = n('ad_rew_click'), done = n('ad_rew_done'), rfail = n('ad_rew_fail'), blocked = n('ad_blocked');
  if (!shown && !ifail && !offer && !blocked) return '<article class="card" data-block="ads"><h3>Reklam</h3><p class="muted small">Bu dönemde veri yok.</p></article>';
  return `<article class="card" data-block="ads"><h3>Reklam</h3>
    <div class="tiles">
      ${tile('Reklam / oturum', perS(shown + done, S), 'bir açılışta gösterilen reklam')}
      ${tile('Geçiş reklamı / oturum', perS(shown, S), 'oyun arasında çıkan reklam')}
      ${tile('Ödüllüyü izleyen', pct(done, offer), `${fmtN(done)} / ${fmtN(offer)} teklif`)}
      ${tile('Reklam hatası', pct(ifail + rfail, shown + ifail + click), 'reklam istendi ama gelmedi')}
      ${tile('Reklam engelleyici', pct(blocked, S), 'oturumların bu kadarında reklam engelli')}
    </div>
    <div class="sub-h">Ödüllü reklam adım adım</div>
    ${barList([{ label: 'Teklif edildi', value: offer, text: fmtN(offer) }, { label: 'Dokundu', value: click, text: `${fmtN(click)} · ${pct(click, offer)}` },
      { label: 'Sonuna kadar izledi', value: done, text: `${fmtN(done)} · ${pct(done, offer)}` }, { label: 'Hata (gelmedi)', value: rfail, text: `${fmtN(rfail)} · ${pct(rfail, click)}` }], { max: Math.max(1, offer) })}
    <p class="small muted">Reklam parası ≈ oyuncu × süre × reklam. "Oturum başına" sayılar yalnız bu ölçümü gönderen sürümlerin ${fmtN(S)} oturumuna bölünür. Geçiş reklamı hatası ${pct(ifail, shown + ifail)}.</p></article>`;
}
/** bucket bars + a per-device table (each bucket's share within that device) */
function distBlock(X, buckets) {
  const total = buckets.reduce((a, [k]) => a + evN(X, k), 0);
  const bars = barList(buckets.map(([k, t]) => ({ label: t, value: evN(X, k), text: `${pct(evN(X, k), total)} · ${fmtN(evN(X, k))}` })), { max: Math.max(1, ...buckets.map(([k]) => evN(X, k))) });
  const dev = ['phone', 'tablet', 'desktop'].map((d) => ({ d, rows: buckets.map(([k]) => (X.ev_dev || []).find((e) => e.device === d && e.k === k)?.n || 0) })).filter((x) => x.rows.some(Boolean));
  const table = dev.length ? `<details class="table"><summary>Cihaza göre</summary><div class="scroll-x"><table><thead><tr><th>Cihaz</th>${buckets.map(([, t]) => `<th class="n">${esc(t)}</th>`).join('')}</tr></thead>
    <tbody>${dev.map((x) => { const s = x.rows.reduce((a, v) => a + v, 0); return `<tr><td>${esc(DEVICE[x.d] || x.d)}</td>${x.rows.map((v) => `<td class="n">${pct(v, s)}</td>`).join('')}</tr>`; }).join('')}</tbody></table></div></details>` : '';
  return { total, html: bars + table };
}
function loadBlock(X) {
  const D = distBlock(X, LOAD_B);
  return `<article class="card" data-block="load"><h3>Yükleme</h3>${D.total ? `${D.html}<p class="small muted">Sayfa açıldıktan menü kullanılabilir olana kadar geçen süre (${fmtN(D.total)} oturum). Uzun yükleme oyuncu kaybettirir.</p>` : '<p class="muted small">Bu dönemde veri yok.</p>'}</article>`;
}
function smoothBlock(X) {
  const F = distBlock(X, FPS_B), H = distBlock(X, HITCH_B);
  if (!F.total && !H.total) return '<article class="card" data-block="smooth"><h3>Akıcılık</h3><p class="muted small">Bu dönemde veri yok.</p></article>';
  return `<article class="card" data-block="smooth"><h3>Akıcılık</h3>
    <div class="sub-h" style="margin-top:4px">Saniyedeki kare (dövüşte, ortalama)</div>${F.html}
    <div class="sub-h">Takılma (dövüşte 50 ms'den uzun kare)</div>${H.html}
    <p class="small muted">Bir oturumda yaklaşık 60 sn dövüşten sonra bir kez ölçülür. Telefonda "takılıyor" payı büyükse oyun o cihazlarda ağır geliyor.</p></article>`;
}

// ---- earnings typed in from the portals' dashboards (st_revenue)
const money = (n, c) => { try { return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: c, maximumFractionDigits: 2 }).format(Number(n) || 0); } catch { return `${fmtN(n)} ${c}`; } };
const COUNTED = { crazygames: true }; // revenue portals our statistics count (Playgama, Yandex: not counted here)
const REV_CUR = { crazygames: 'USD', playgama: 'USD', yandex: 'RUB', gamepix: 'EUR', other: 'USD' };
function paintRevenue() {
  const el = $('#s-revenue');
  if (!el) return;
  const head = `<div class="bar-head"><h2>Kazanç</h2><span class="muted small">portalların panelinden elle girilir</span></div>`;
  const X = gsAny(state.page);
  if (!X) { el.innerHTML = head + (state.gstatsErr ? (state.gstatsErr.missing ? missingNote('Kazanç') : '') : '<p class="muted">Yükleniyor…</p>'); return; }
  const R = X.revenue || { entries: [], period: [] };
  const per = R.period || [];
  const byCur = new Map();
  for (const p of per) byCur.set(p.currency, (byCur.get(p.currency) || 0) + Number(p.amount));
  const summary = per.length ? `<div class="tiles" data-testid="rev-totals">${[...byCur].map(([c, a]) => tile(`Toplam (${c})`, money(a, c), `${X.days === 1 ? 'bugün' : `son ${X.days} gün`}, girilen günler`)).join('')}</div>
    <div class="scroll-x"><table class="wide" data-testid="rev-period"><thead><tr><th>Portal</th><th class="n">Kazanç</th><th class="n">Gün</th><th class="n">Oyuncu başına (günlük)</th><th class="n">1000 oturum başına</th></tr></thead>
    <tbody>${per.map((p) => { const ok = COUNTED[p.portal] && p.players > 0; return `<tr data-portal="${esc(p.portal)}" data-currency="${esc(p.currency)}"><td>${esc(V.REVENUE_PORTALS[p.portal] || p.portal)}</td><td class="n">${esc(money(p.amount, p.currency))}</td><td class="n">${fmtN(p.days)}</td>
      <td class="n" data-k="per-player">${ok ? esc(money(p.amount / p.players, p.currency)) : '—'}</td><td class="n" data-k="per-1000">${ok && p.sessions ? esc(money((1000 * p.amount) / p.sessions, p.currency)) : '—'}</td></tr>`; }).join('')}</tbody></table></div>
    <ul class="help"><li><b>Oyuncu başına (günlük):</b> kazancı girdiğin günlerde o portalda bir oyuncunun bir günde getirdiği ortalama para (kazanç ÷ o günlerin oyuncuları).</li>
      <li><b>1000 oturum başına:</b> oyunun her 1000 açılışına düşen kazanç.</li>
      <li>Para birimleri toplanmaz, çevrilmez. Playgama ve Yandex'in oyuncusu bizde sayılmadığı için orada "—" yazar.</li></ul>`
    : `<p class="muted small">${X.days === 1 ? 'Bugün için' : `Son ${X.days} gün için`} girilmiş kazanç yok.</p>`;
  const e = state.revEdit || { day: addDay(istDay(), -1), portal: 'crazygames', amount: '', currency: REV_CUR.crazygames, note: '' };
  const errs = state.revErrs || [];
  const editing = !!(state.revEdit && state.revEdit.editing);
  el.innerHTML = head + `<article class="card" data-testid="revenue">${summary}
    <div class="sub-h">${editing ? 'Kazancı düzelt' : 'Kazanç gir'}</div>
    <form class="form" id="revForm" novalidate style="margin-top:8px">
      ${errs.length ? `<div class="errors" data-testid="rev-errors"><b>Düzelt:</b><ul>${errs.map((x) => `<li>${esc(x.msg)}</li>`).join('')}</ul></div>` : ''}
      ${state.revMsg ? `<p class="ok-msg" data-testid="rev-ok">${esc(state.revMsg)}</p>` : ''}
      <div class="two">
        <label class="f"><span>Gün</span><input type="date" name="day" value="${esc(e.day)}" min="${V.REVENUE_FIRST_DAY}" max="${istDay()}"></label>
        <label class="f"><span>Portal</span><select name="portal">${Object.entries(V.REVENUE_PORTALS).map(([k, t]) => `<option value="${k}" ${k === e.portal ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select></label>
        <label class="f"><span>Tutar</span><input name="amount" inputmode="decimal" autocomplete="off" placeholder="ör. 12,50" value="${esc(e.amount)}"></label>
        <label class="f"><span>Para birimi</span><select name="currency">${V.REVENUE_CURRENCIES.map((c) => `<option value="${c}" ${c === e.currency ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
      </div>
      <label class="f"><span>Not (isteğe bağlı)</span><input name="note" maxlength="200" value="${esc(e.note)}"></label>
      <div class="row"><button class="btn primary" type="submit">Kaydet</button>${editing ? '<button class="btn" type="button" data-act="rev-cancel">Vazgeç</button>' : ''}
        <span class="small muted">Aynı gün ve portal yeniden kaydedilirse eskisinin yerine yazılır.</span></div>
    </form>
    ${(R.entries || []).length ? `<div class="sub-h">Son girilenler</div>${revTable(R.entries.slice(0, 6))}
      ${R.entries.length > 6 ? `<details class="table"><summary>Daha eskiler (${fmtN(R.entries.length - 6)})</summary>${revTable(R.entries.slice(6))}</details>` : ''}` : ''}
  </article>`;
  const f = $('#revForm');
  f.portal.onchange = () => { f.currency.value = REV_CUR[f.portal.value] || 'USD'; };
  f.onsubmit = async (ev) => {
    ev.preventDefault();
    const draft = { day: f.day.value, game: state.page, portal: f.portal.value, amount: f.amount.value, currency: f.currency.value, note: f.note.value };
    state.revEdit = { ...draft, editing };
    state.revMsg = '';
    const c = V.checkRevenue(draft, { today: istDay() });
    if (!c.ok) { state.revErrs = c.errors; paintRevenue(); return; }
    f.querySelector('button[type=submit]').disabled = true;
    try {
      await rpc('st_admin_revenue_upsert', { p_day: c.value.day, p_game: c.value.game, p_portal: c.value.portal, p_amount: c.value.amount, p_currency: c.value.currency, p_note: c.value.note });
      state.revErrs = [];
      state.revEdit = { day: c.value.day, portal: c.value.portal, amount: '', currency: c.value.currency, note: '' };
      state.revMsg = `Kaydedildi: ${dayLabel(c.value.day)}, ${V.REVENUE_PORTALS[c.value.portal]}, ${money(c.value.amount, c.value.currency)}.`;
      await loadGameStats();
    } catch (e2) { state.revErrs = [{ field: 'sunucu', msg: serverFieldMsg(e2) }]; paintRevenue(); }
  };
}

const revTable = (list) => `<div class="scroll-x"><table class="rev-entries" data-testid="rev-entries"><thead><tr><th>Gün</th><th>Portal</th><th class="n">Tutar</th><th>Not</th><th></th></tr></thead>
  <tbody>${list.map((r) => `<tr data-rev="${esc(r.day)}|${esc(r.portal)}"><td>${esc(dayLabel(r.day))}</td><td>${esc(V.REVENUE_PORTALS[r.portal] || r.portal)}</td><td class="n">${esc(money(r.amount, r.currency))}</td><td class="small">${esc(r.note || '')}</td>
    <td class="n nowrap"><button class="ghost" type="button" data-act="rev-edit" data-day="${esc(r.day)}" data-portal="${esc(r.portal)}">Düzenle</button> <button class="ghost" type="button" data-act="rev-del" data-day="${esc(r.day)}" data-portal="${esc(r.portal)}">Sil</button></td></tr>`).join('')}</tbody></table></div>`;

// the statistics views' own buttons (kept apart from the shared click handler further down)
document.addEventListener('click', async (ev) => {
  const b = ev.target.closest('[data-act], tr[data-href]');
  if (!b) return;
  const a = b.dataset.act;
  if (a === 'days' && state.page !== 'studio') loadGameStats(+b.dataset.days);
  else if (a === 'end-seg') { state.endSeg = b.dataset.seg; paintMore(); }
  else if (a === 'cmp-sort') { const k = b.dataset.k; state.cmpSort = { k, dir: state.cmpSort.k === k ? -state.cmpSort.dir : k === 'title' ? 1 : -1 }; paintCompare(); }
  else if (!a && b.dataset.href && !ev.target.closest('a')) location.hash = b.dataset.href;
  else if (a === 'rev-cancel') { state.revEdit = null; state.revErrs = []; state.revMsg = ''; paintRevenue(); }
  else if (a === 'rev-edit' || a === 'rev-del') {
    const r = (gsAny(state.page)?.revenue?.entries || []).find((x) => x.day === b.dataset.day && x.portal === b.dataset.portal);
    if (!r) return;
    if (a === 'rev-edit') {
      state.revEdit = { day: r.day, portal: r.portal, amount: String(r.amount).replace('.', ','), currency: r.currency, note: r.note || '', editing: true };
      state.revErrs = []; state.revMsg = '';
      paintRevenue();
      $('#revForm')?.scrollIntoView({ block: 'center' });
      return;
    }
    if (!confirm(`${dayLabel(r.day)} ${V.REVENUE_PORTALS[r.portal] || r.portal} kazancı (${money(r.amount, r.currency)}) silinsin mi?`)) return;
    b.disabled = true;
    try { await rpc('st_admin_revenue_delete', { p_day: r.day, p_game: state.page, p_portal: r.portal }); state.revMsg = 'Silindi.'; state.revErrs = []; state.revEdit = null; await loadGameStats(); }
    catch (e) { b.disabled = false; alert(friendly(e)); }
  }
});

// ------------------------------------------------------------------ fresh data on every section
// Opening a section fetches it again (the old numbers stay, dimmed, until the new ones come); while the panel is visible the
// open section refreshes itself (Canlı 15 s, everything else 60 s); a hidden tab or app does not poll; coming back (tab shown,
// window focused, app reopened) refreshes at once. A form being typed in is never refetched under the user's fingers.
// Tests on localhost: ?refresh=<ms> stands for the 60 seconds (Canlı a quarter of it).
const REFRESH_SCALE = LOCAL && Number(QS.get('refresh')) > 0 ? Number(QS.get('refresh')) / 60000 : 1;
const RF = { at: 0, busy: false, dirty: false, dataAt: 0, visited: new Set(), shown: 0 };
const LOADERS = { overview: () => AN.refresh(), stats: () => AN.refresh(), server: () => loadUsage(), todo: () => loadDoc(), plans: () => loadPlans(),
  errors: () => loadErrors(), ranked: () => loadRanked(), pass: () => PASS.load(), journey: () => PASS.load(), rewards: () => loadRewards(), season: () => loadSeasons(), tune: () => loadTune(),
  sr: () => loadSr(), notify: () => loadPush(), content: () => ctOf()?.reload() };
const refreshEvery = () => (['overview', 'stats'].includes(curSub()) ? AN.interval() : 60000) * REFRESH_SCALE;
/** the user is typing in a form of the section (or a dialog is open): no automatic refetch */
function editing() {
  const a = document.activeElement, pane = $('#pane');
  return RF.dirty || !!document.querySelector('#dlg[open]') || !!(pane && a && pane.contains(a) && a.matches('input:not([type=checkbox]):not([type=radio]), textarea'));
}
/** a form was saved or closed: automatic refreshes may go on */
function formDone() { RF.dirty = false; }
document.addEventListener('input', (e) => { if (e.target.closest?.('#pane form, #pane .form')) RF.dirty = true; }, true);
function dataArrived() { RF.dataAt = Date.now(); paintStamp(); }
function paintStamp() {
  const el = $('#lastRef');
  if (!el) return;
  const t = RF.dataAt;
  el.textContent = t ? `son yenileme: ${new Intl.DateTimeFormat('tr-TR', { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(t))}` : '';
}
async function refreshNow(why = 'timer') {
  if (!state.admin || RF.busy || !$('#pane')) return;
  if (why !== 'user' && editing()) return;
  if (why === 'user') RF.dirty = false;
  const fn = LOADERS[curSub()];
  if (!fn) return;
  RF.busy = true;
  RF.at = Date.now();
  const pane = $('#pane'), own = ['overview', 'stats'].includes(curSub()); // analytics.js dims its own body
  if (!own) pane.classList.add('stale');
  try { await fn(); } catch { /* the section shows its own error */ } finally { RF.busy = false; $('#pane')?.classList.remove('stale'); paintStamp(); }
}
/** a section was just drawn: the timer counts from now; one seen before in this visit is fetched again */
function afterRender(sub) {
  RF.at = Date.now();
  RF.dirty = false;
  const key = `${state.page}/${sub}`;
  if (RF.visited.has(key) && !['overview', 'stats'].includes(sub)) setTimeout(() => refreshNow('nav'), 0);
  RF.visited.add(key);
  setTimeout(paintStamp, 0);
}
setInterval(() => {
  if (!state.admin || document.hidden) return;
  if (Date.now() - RF.at >= refreshEvery()) refreshNow('timer');
}, LOCAL && QS.get('refresh') ? 200 : 2000);
// back to the panel (another tab, the phone's home screen, the app reopened): at once
function onShow() {
  if (!state.admin || document.hidden || Date.now() - RF.shown < 1000) return;
  RF.shown = Date.now();
  refreshNow('show');
  loadLive();
}
document.addEventListener('visibilitychange', onShow);
window.addEventListener('focus', onShow);
window.addEventListener('pageshow', (e) => { if (e.persisted) onShow(); });
// pull down at the top of the page to refresh (phones)
const ptr = { y: 0, on: false };
document.addEventListener('touchstart', (e) => { ptr.on = window.scrollY <= 0 && !!e.target.closest?.('#main') && !e.target.closest('.scroll-x, input, select, textarea'); ptr.y = e.touches[0].clientY; }, { passive: true });
document.addEventListener('touchmove', (e) => {
  if (!ptr.on) return;
  const dy = e.touches[0].clientY - ptr.y, el = $('#ptr');
  if (el) { el.hidden = dy < 30; el.textContent = dy > 80 ? '↻ Bırak, yenilensin' : '↓ Yenilemek için çek'; }
}, { passive: true });
document.addEventListener('touchend', (e) => {
  const el = $('#ptr');
  if (el) el.hidden = true;
  if (!ptr.on) return;
  ptr.on = false;
  if (e.changedTouches[0].clientY - ptr.y > 80 && window.scrollY <= 0) { refreshNow('user'); loadLive(); }
}, { passive: true });

// what analytics.js borrows from this file
AN.init({
  rpc, esc, friendly, pageHash, fmtN, fmtDur, fmtCompact, fmtDate, dayLabel, pct, regionName, langName, titleOf, barList, money,
  screenName, eventName, eventOrder, PORTAL, DEVICE, BROWSER, V, serverFieldMsg: (e) => serverFieldMsg(e), formDone: () => formDone(),
  legacy: {
    paintLive: () => paintLive(), loadLive: () => loadLive(), paintPortals: () => paintPortals(), paintTrend: () => paintTrend(), paintCompare: () => paintCompare(),
    loadTrends: () => loadTrends(), paintPeriod: () => paintPeriod(), loadSummary: () => loadSummary(), paintVersions: () => paintVersions(),
    loadVersions: () => (state.versions ? paintVersions() : loadVersions()), paintRevenue: () => paintRevenue(),
    setDays: (d) => { if (state.days !== d) { state.days = d; } }, days: () => state.days, gsFor: (g, d) => gsFor(g, d, STATS2_MS), loadGameStats: (d) => loadGameStats(d),
    endSeg: () => state.endSeg, setEndSeg: (x) => { state.endSeg = x; },
    measNote: (g) => MEAS_NOTE(g),
    blocks: { exitBlock: (X) => exitBlock(X), lenBlock: (X) => lenBlock(X), retBlock: (X) => retBlock(X), newRetBlock: (X) => newRetBlock(X), hoursBlock: (X) => hoursBlock(X),
      cmpBlock: (X, w) => cmpBlock(X, w), countryBlock: (X) => countryBlock(X), adsBlock: (X) => adsBlock(X), loadBlock: (X) => loadBlock(X), smoothBlock: (X) => smoothBlock(X) },
  },
});

function paintPortals() {
  const el = $('#s-portals');
  if (!el) return;
  el.innerHTML = `<h2>Portallar</h2><div class="grid" style="margin-top:12px">
    <div class="card"><h3>CrazyGames</h3><p class="small">Canlı sayılır (bu panelde). Gelir, oynanma ve inceleme durumu portalın kendi panelinde.</p>
      <a class="btn" href="https://developer.crazygames.com/" target="_blank" rel="noopener noreferrer">Geliştirici paneli ↗</a></div>
    <div class="card"><h3>Playgama</h3><p class="small">Bu panelde <b>sayılmaz</b>: Playgama oyunun içine kendi ölçümümüzü koymayı yasaklıyor. Sayılar Playgama kabinesinde.</p>
      <a class="btn" href="https://developer.playgama.com/" target="_blank" rel="noopener noreferrer">Playgama kabinesi ↗</a></div>
    <div class="card"><h3>Yandex Games</h3><p class="small">Bu panelde <b>sayılmaz</b>: Yandex paketleri dışarıya hiç bağlanmıyor. Sayılar Yandex konsolunda.</p>
      <a class="btn" href="https://yandex.com/games/console/" target="_blank" rel="noopener noreferrer">Yandex konsolu ↗</a></div>
    <div class="card"><h3>Kendi sitemiz</h3><p class="small">Canlı sayılır ("Kendi sitemiz" diye görünür).</p>
      <a class="btn" href="https://supabase.com/dashboard/project/cjaewbrifdqlykasrkds" target="_blank" rel="noopener noreferrer">Sunucu (Supabase) ↗</a></div>
  </div>`;
}

function paintUsage() {
  const el = $('#s-usage');
  if (!el) return;
  const U = state.usage;
  if (!U) { el.innerHTML = '<h2>Sunucu</h2><p class="muted">Yükleniyor…</p>'; return; }
  if (U.error) { el.innerHTML = `<h2>Sunucu</h2><div class="warn-box">${esc(friendly(U.error))}</div>`; return; }
  const mb = (b) => (b / 1048576).toFixed(1).replace('.', ',') + ' MB';
  const share = U.db_bytes / U.limit_bytes;
  el.innerHTML = `<h2>Sunucu kullanımı</h2><div class="card" style="margin-top:12px">
    <div class="tiles">${tile('Veritabanı', mb(U.db_bytes), `ücretsiz plan sınırı ${mb(U.limit_bytes)}`)}${tile('Nabız / dakika', String(U.beats_per_min).replace('.', ','), 'son 5 dakika ortalaması')}${tile('Reddedilen (1 sa)', fmtN(U.rejected_1h), 'hatalı ya da çok sık istek')}</div>
    <div class="sub-h">Doluluk</div>${barList([{ label: 'Veritabanı', value: share, text: `%${(share * 100).toFixed(1).replace('.', ',')}` }], { max: 1 })}
    <details class="table"><summary>Tablolar</summary><div class="scroll-x"><table><thead><tr><th>Tablo</th><th class="n">Satır</th><th class="n">Boyut</th></tr></thead>
    <tbody>${U.tables.map((t) => `<tr><td>${esc(t.t)}</td><td class="n">${fmtN(t.rows)}</td><td class="n">${mb(t.bytes)}</td></tr>`).join('')}</tbody></table></div></details>
    <p class="small muted">Eski canlı kayıtlar 48 saat, olaylar 30 gün sonra kendiliğinden silinir. Son temizlik: ${U.cleanup_at ? esc(fmtDateTime(U.cleanup_at)) : '—'}.</p></div>`;
}

// ================================================================== development: plans, to-do, game settings
// ---------------------------------------------------------------- plan board
async function loadPlans() {
  try {
    state.plans = await rpc('st_plans_list');
    state.plansErr = null;
    state.planUrls = await signPlanImages([...new Set(state.plans.flatMap((p) => p.images))]).catch(() => ({}));
  } catch (e) { state.plansErr = e; }
  if (onPane('plans')) paintPlans();
}
/** The plans of this page: the game's own; on the studio page the general ones (no game, or a game without a page). */
function pagePlans() {
  const ids = new Set(gameList().map((g) => g.game));
  return state.plans.filter((p) => (state.page === 'studio' ? !p.game || !ids.has(p.game) : p.game === state.page));
}
function paintPlans() {
  const el = $('#pane');
  if (!el) return;
  if (!state.plans && !state.plansErr) { el.innerHTML = '<p class="muted">Yükleniyor…</p>'; loadPlans(); return; }
  if (state.plansErr) { el.innerHTML = `<div class="warn-box">${esc(friendly(state.plansErr))}</div>`; return; }
  const list = pagePlans().filter((p) => state.showArchived || !p.archived);
  const phone = window.matchMedia('(max-width: 760px)').matches;
  const lanes = Object.entries(V.PLAN_STATUS).filter(([k]) => !phone || k === state.planFilter);
  el.innerHTML = `<div class="bar-head"><h2>${state.page === 'studio' ? 'Stüdyo planları' : 'Planlar'}</h2><span class="muted small">${state.page === 'studio' ? 'oyuna bağlı olmayanlar' : 'yalnız bu oyunun'}</span>
      <label class="small row" style="gap:6px"><input type="checkbox" data-act="archived" ${state.showArchived ? 'checked' : ''}> arşivdekileri de göster</label>
      <button class="btn primary right" type="button" data-act="plan-new">+ Yeni plan</button></div>
    ${phone ? `<div class="chips" style="margin-bottom:12px" role="group" aria-label="Durum">${Object.entries(V.PLAN_STATUS).map(([k, t]) => `<button type="button" data-act="plan-filter" data-status="${k}" aria-pressed="${state.planFilter === k}">${t} <span class="muted">${list.filter((p) => p.status === k).length}</span></button>`).join('')}</div>` : ''}
    <div class="board">${lanes.map(([k, t]) => {
      const items = list.filter((p) => p.status === k);
      return `<div class="lane" data-lane="${k}"><div class="col-h${phone ? ' hide-phone' : ''}"><span>${t}</span><span class="muted">${items.length}</span></div>
        ${items.map(planCard).join('') || '<p class="muted small">Boş.</p>'}</div>`;
    }).join('')}</div>`;
}
// A plan's notes are Markdown (lists, bold…); ![caption](n) puts its n-th picture inside the text, e.g. one picture per
// line of a list. Pictures not placed in the text show below it.
const picRefs = (notes) => new Set([...String(notes || '').matchAll(/!\[[^\]]*\]\((\d{1,2})\)/g)].map((m) => +m[1]));
/** One of a plan's pictures: big (the plan view, opens full size in a new tab) or small (the card) */
function planPic(p, n, alt, big) {
  const path = p.images[n - 1], url = path && state.planUrls[path];
  if (!path) return `<span class="pic-miss">${esc(`[resim ${n} yok]`)}</span>`;
  const img = url ? `<img src="${esc(url)}" alt="${alt}" loading="lazy">` : '<span class="ph"></span>';
  if (!big) return `<span class="pic sm">${img}</span>`;
  return `<figure class="pic" data-pic="${n}">${url ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" title="Tam boy aç">${img}</a>` : img}${alt ? `<figcaption>${alt}</figcaption>` : ''}</figure>`;
}
const planNotes = (p, big) => renderMarkdown(p.notes, { image: (n, alt) => planPic(p, n, alt, big) });
function planCard(p) {
  const keys = Object.keys(V.PLAN_STATUS), i = keys.indexOf(p.status);
  const inText = picRefs(p.notes), loose = p.images.map((x, k) => [x, k + 1]).filter(([, n]) => !inText.has(n));
  return `<article class="card plan" data-plan="${p.id}">
    <h4><button type="button" class="plan-t" data-act="plan-view" data-id="${p.id}">${esc(p.title)}</button></h4>
    <div class="meta"><span class="badge">${esc(V.PLAN_KINDS[p.kind] || p.kind)}</span>${p.game ? `<span>${esc(titleOf({ game: p.game }))}</span>` : ''}${p.archived ? '<span class="badge off">arşivde</span>' : ''}<span>${esc(fmtDate(p.updated_at))}</span>${p.images.length ? `<span>${fmtN(p.images.length)} resim</span>` : ''}</div>
    ${p.notes ? `<div class="notes md">${planNotes(p, false)}</div>` : ''}
    ${loose.length ? `<div class="thumbs">${loose.map(([x]) => state.planUrls[x] ? `<img src="${esc(state.planUrls[x])}" alt="" loading="lazy">` : '<span class="ph"></span>').join('')}</div>` : ''}
    <div class="row" style="margin-top:10px">
      <button class="ghost" type="button" data-act="plan-move" data-id="${p.id}" data-to="${keys[i - 1] || ''}" ${i <= 0 ? 'disabled' : ''} aria-label="Önceki duruma">◀</button>
      <button class="ghost" type="button" data-act="plan-move" data-id="${p.id}" data-to="${keys[i + 1] || ''}" ${i >= keys.length - 1 ? 'disabled' : ''} aria-label="Sonraki duruma">▶</button>
      <button class="ghost" type="button" data-act="plan-view" data-id="${p.id}">Aç</button>
      <button class="ghost" type="button" data-act="plan-edit" data-id="${p.id}">Düzenle</button>
    </div></article>`;
}
/** The whole plan to read: its notes with the pictures in place at full width, the other pictures below. */
function openPlanView(p) {
  if (!p) return;
  const d = $('#dlg');
  const inText = picRefs(p.notes), loose = p.images.map((x, k) => k + 1).filter((n) => !inText.has(n));
  d.innerHTML = `<div class="plan-view" data-testid="plan-view" data-plan="${p.id}">
    <div class="d-head"><h2 id="dlgTitle">${esc(p.title)}</h2><button class="ghost x" type="button" data-act="dlg-close" aria-label="Kapat">✕</button></div>
    <div class="d-body">
      <div class="meta small muted"><span class="badge">${esc(V.PLAN_STATUS[p.status] || p.status)}</span> <span class="badge">${esc(V.PLAN_KINDS[p.kind] || p.kind)}</span> ${p.game ? esc(titleOf({ game: p.game })) + ' · ' : ''}${esc(fmtDate(p.updated_at))}</div>
      ${p.notes ? `<div class="doc-in plan-notes">${planNotes(p, true)}</div>` : '<p class="muted small">Not yok.</p>'}
      ${loose.length ? `<div class="pics">${loose.map((n) => planPic(p, n, '', true)).join('')}</div>` : ''}
    </div>
    <div class="d-foot"><button class="btn" type="button" data-act="dlg-close">Kapat</button><button class="btn primary" type="button" data-act="plan-edit" data-id="${p.id}">Düzenle</button></div></div>`;
  if (!d.open) d.showModal();
}
function gameOptions(sel) {
  const games = new Map([['', 'Genel (oyun yok)']]);
  for (const g of gameList()) games.set(g.game, g.title);
  if (sel && !games.has(sel)) games.set(sel, titleOf({ game: sel }));
  return [...games].map(([k, t]) => `<option value="${esc(k)}" ${k === sel ? 'selected' : ''}>${esc(t)}</option>`).join('');
}
function openPlan(p) {
  const d = $('#dlg');
  const cur = p ? { ...p, images: p.images.slice() } : { title: '', game: state.page === 'studio' ? '' : state.page, kind: 'gorsel', status: 'fikir', notes: '', images: [] };
  const draw = (errs = []) => {
    d.innerHTML = `<form method="dialog" class="form" id="planForm" novalidate>
      <div class="d-head"><h2 id="dlgTitle">${p ? 'Planı düzenle' : 'Yeni plan'}</h2><button class="ghost x" type="button" data-act="dlg-close" aria-label="Kapat">✕</button></div>
      <div class="d-body form">
        ${errs.length ? `<div class="errors"><b>Düzelt:</b><ul>${errs.map((e) => `<li>${esc(e.msg)}</li>`).join('')}</ul></div>` : ''}
        <label class="f"><span>Başlık</span><input name="title" maxlength="120" required value="${esc(cur.title)}"></label>
        <div class="two">
          <label class="f"><span>Oyun</span><select name="game">${gameOptions(cur.game)}</select></label>
          <label class="f"><span>Tür</span><select name="kind">${Object.entries(V.PLAN_KINDS).map(([k, t]) => `<option value="${k}" ${k === cur.kind ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
          <label class="f"><span>Durum</span><select name="status">${Object.entries(V.PLAN_STATUS).map(([k, t]) => `<option value="${k}" ${k === cur.status ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
        </div>
        <label class="f"><span>Notlar</span><textarea name="notes" maxlength="4000">${esc(cur.notes)}</textarea>
          <span class="small muted">Liste için satır başına <code>- </code>. Bir resmi yazının içine koymak için <code>![açıklama](2)</code> (2 = ikinci resim) ya da resmin altındaki <b>Yazıya ekle</b>.</span></label>
        <div class="f"><span class="small"><b>Önizleme resimleri</b> (PNG, JPG ya da WebP, en çok 5 MB, en çok 8 resim)</span>
          <div class="thumbs">${cur.images.map((x, i) => `<span class="thumb-x"><span class="thumb-n" aria-hidden="true">${i + 1}</span>${state.planUrls[x] ? `<img src="${esc(state.planUrls[x])}" alt="">` : '<span class="ph"></span>'}<button type="button" data-act="plan-img-x" data-i="${i}" aria-label="Resmi çıkar">✕</button><button type="button" class="ghost small" data-act="plan-img-in" data-i="${i}">Yazıya ekle</button></span>`).join('')}</div>
          <input type="file" name="file" accept="image/png,image/jpeg,image/webp" ${cur.images.length >= V.PLAN_IMAGE.count ? 'disabled' : ''}>
          <span class="small muted" id="upMsg"></span></div>
      </div>
      <div class="d-foot">
        ${p ? `<button class="btn" type="button" data-act="plan-archive">${p.archived ? 'Arşivden çıkar' : 'Arşivle'}</button>` : ''}
        <button class="btn" type="button" data-act="dlg-close">Vazgeç</button>
        <button class="btn primary" type="submit">Kaydet</button>
      </div></form>`;
    const f = $('#planForm');
    const E = (n) => f.elements.namedItem(n);
    const sync = () => { cur.title = E('title').value; cur.game = E('game').value; cur.kind = E('kind').value; cur.status = E('status').value; cur.notes = E('notes').value; };
    E('file').onchange = async () => {
      sync();
      const file = E('file').files[0];
      const c = V.checkUpload(file, V.PLAN_IMAGE);
      if (!c.ok) { $('#upMsg').textContent = c.msg; E('file').value = ''; return; }
      $('#upMsg').textContent = 'Yükleniyor…';
      try {
        const path = await upload('plans', V.storageName(file, p ? String(p.id) : 'new'), file);
        cur.images.push(path);
        Object.assign(state.planUrls, await signPlanImages([path]).catch(() => ({})));
        draw();
      } catch (e) { $('#upMsg').textContent = friendly(e); }
    };
    // removing a picture renumbers the ![…](n) marks after it and drops the ones that pointed at it
    d.querySelectorAll('[data-act="plan-img-x"]').forEach((b) => { b.onclick = () => {
      sync();
      const gone = +b.dataset.i + 1;
      cur.images.splice(gone - 1, 1);
      cur.notes = cur.notes.replace(/!\[([^\]]*)\]\((\d{1,2})\)/g, (m, alt, n) => (+n === gone ? alt : +n > gone ? `![${alt}](${+n - 1})` : m));
      draw();
    }; });
    d.querySelectorAll('[data-act="plan-img-in"]').forEach((b) => { b.onclick = () => {
      sync();
      const ta = E('notes'), at = ta.selectionStart ?? cur.notes.length, mark = `![](${+b.dataset.i + 1})`;
      cur.notes = cur.notes.slice(0, at) + mark + cur.notes.slice(ta.selectionEnd ?? at);
      draw();
      const t2 = $('#planForm').elements.namedItem('notes');
      t2.focus();
      t2.setSelectionRange(at + 2, at + 2); // the cursor inside [] for the caption
    }; });
    const arch = d.querySelector('[data-act="plan-archive"]');
    if (arch) arch.onclick = async () => { try { await rpc('st_plan_archive', { p_id: p.id, p_archived: !p.archived }); d.close(); await loadPlans(); } catch (e) { draw([{ msg: friendly(e) }]); } };
    f.onsubmit = async (ev) => {
      ev.preventDefault();
      sync();
      const c = V.checkPlan(cur);
      if (!c.ok) return draw(c.errors);
      try {
        if (p) await rpc('st_plan_update', { p_id: p.id, p: c.value });
        else await rpc('st_plan_create', { p: c.value });
        d.close();
        await loadPlans();
      } catch (e) { draw([{ msg: serverFieldMsg(e) }]); }
    };
  };
  draw();
  if (!d.open) d.showModal(); // (from the plan view the dialog is already open)
}
function serverFieldMsg(e) {
  const m = /(?:st:bad|nd:reward|nd:tune):([\w.:-]+)/.exec(e && e.message || '');
  return m ? `Sunucu kabul etmedi: ${m[1]} alanı.` : friendly(e);
}

// ---------------------------------------------------------------- to-do document
async function loadDoc() {
  try { state.doc = await rpc('st_doc', { p_key: 'yapilacaklar' }); state.docErr = null; } catch (e) { state.docErr = e; state.doc = null; }
  if (onPane('todo')) paintTodo();
}
function paintTodo() {
  const el = $('#pane');
  if (!el) return;
  if (state.doc === undefined) { el.innerHTML = '<p class="muted">Yükleniyor…</p>'; loadDoc(); return; }
  if (state.docErr) { el.innerHTML = `<div class="warn-box">${esc(friendly(state.docErr))}</div>`; return; }
  if (!state.doc) { el.innerHTML = '<div class="note">Yapılacaklar listesi sunucuya henüz kopyalanmadı.</div>'; return; }
  const g = state.page === 'studio' ? null : gameOf(state.page);
  const secs = sectionsFor(splitTodo(state.doc.body), g, gameList());
  const open = secs.reduce((n, x) => n + countTasks(x.body).open, 0);
  const items = todoItems(secs);
  const count = Object.fromEntries(ITEM_STATES.map(([k]) => [k, items.filter((x) => x.state === k).length]));
  const view = state.todoView === 'doc' || (count[state.todoView] ?? 0) > 0 ? state.todoView : 'all';
  // the view chips: every state with its count (empty ones hidden, except "Yapılıyor" / "Seni bekliyor": a 0 there says
  // something), then the whole list section by section as it is written
  const chips = [['all', 'Hepsi', items.length], ...ITEM_STATES.filter(([k]) => count[k] || k === 'doing' || k === 'waiting').map(([k, t]) => [k, t, count[k]]), ['doc', 'Bölüm bölüm', null]];
  el.innerHTML = `<div class="bar-head"><h2>Yapılacaklar</h2><span class="muted small">${g ? 'bu oyunun' : 'genel (oyuna bağlı olmayan)'} · ${fmtN(open)} açık iş</span><span class="muted small right">Son kopya: ${esc(fmtDateTime(state.doc.updated_at))}</span></div>
    ${secs.length ? `<div class="chips todo-chips" role="group" aria-label="Görünüm" data-testid="todo-chips">${chips.map(([k, t, n]) => `<button type="button" data-act="todo-view" data-view="${k}" aria-pressed="${k === view}" ${n === 0 ? 'class="zero"' : ''}>${k !== 'all' && k !== 'doc' ? `<span class="sdot ${k}" aria-hidden="true"></span>` : ''}${t}${n != null ? ` <span class="muted num">${fmtN(n)}</span>` : ''}</button>`).join('')}</div>` : ''}
    ${view === 'doc' || !secs.length ? todoDoc(secs, g) : todoGroups(items, view, secs)}
    <p class="small muted">Bu liste depodaki docs/YAPILACAKLAR.md dosyasının kopyasıdır; burada değiştirilmez. Her oyun kendi başlıklarını (<code>## Oyun adı — …</code>) görür. Durumu işin yazısından okunur: işaretli kutu = bitti, "Ajan çalışıyor" = yapılıyor, "BEKLEMEDE" / "Karar bekleyen" / "Senin yapacakların" = seni bekliyor. Değişiklik için Claude'a söyle.</p>`;
}
/** The development at a glance: the page's to-do items grouped by state (md.js todoItems); one state when a chip picks it. */
function todoGroups(items, view, secs) {
  const many = secs.filter((s) => !/^bitenler$/i.test(s.title)).length > 1 || state.page === 'studio';
  const item = (x) => {
    const where = many || x.sub ? [many ? (state.page === 'studio' && x.key !== 'studyo' ? `${x.tag || 'etiketsiz'} · ` : '') + x.section : '', x.sub].filter(Boolean).join(' › ') : '';
    const more = [x.rest, x.more].filter(Boolean).join('\n\n');
    return `<li class="pi" data-state="${x.state}"><span class="sdot ${x.state}" aria-hidden="true"></span><div class="pi-b">
      <div class="pi-h">${inlineMd(x.head)}</div>
      ${x.date || where ? `<div class="pi-m">${x.date ? `<span class="num">${esc(fmtDate(x.date + 'T12:00:00Z', { day: 'numeric', month: 'short', year: x.date.slice(0, 4) === String(new Date().getFullYear()) ? undefined : 'numeric' }))}</span>` : ''}${x.date && where ? ' · ' : ''}${where ? `<span class="pi-w">${esc(where)}</span>` : ''}</div>` : ''}
      ${more ? `<details class="pi-more"><summary>ayrıntı</summary><div class="doc-in">${renderMarkdown(more)}</div></details>` : ''}</div></li>`;
  };
  const groups = ITEM_STATES.filter(([k]) => view === 'all' || view === k).map(([k, t]) => {
    let list = items.filter((x) => x.state === k);
    if (!list.length) return '';
    // done: newest first (undated ones last); on "Hepsi" the newest 6, the rest folded
    if (k === 'done') list = list.map((x, i) => [x, i]).sort((a, b) => (b[0].date || '').localeCompare(a[0].date || '') || a[1] - b[1]).map(([x]) => x);
    const shown = k === 'done' && view === 'all' ? list.slice(0, 6) : list, older = k === 'done' && view === 'all' ? list.slice(6) : [];
    return `<section class="pg card" data-state="${k}"><h3><span class="sdot ${k}" aria-hidden="true"></span>${t} <span class="muted num">${fmtN(list.length)}</span></h3>
      <ul class="pitems">${shown.map(item).join('')}</ul>
      ${older.length ? `<details class="pg-older"><summary>Daha eski ${fmtN(older.length)} iş</summary><ul class="pitems">${older.map(item).join('')}</ul></details>` : ''}</section>`;
  }).join('');
  return `<div class="todo progress" data-testid="todo-progress">${groups || '<div class="note">Bu görünümde iş yok.</div>'}</div>`;
}
/** The page's sections as they are written in docs/YAPILACAKLAR.md. */
function todoDoc(secs, g) {
  return `<div class="todo" data-testid="todo">${secs.map((x) => {
      const inner = renderMarkdown(x.body) || '<p class="muted small">Boş.</p>';
      const tag = !g && x.key !== 'studyo' ? `<span class="badge">${esc(x.tag || 'etiketsiz')}</span> ` : '';
      return /^bitenler$/i.test(x.title)
        ? `<details class="doc" data-todo-section="${esc(x.key)}"><summary><b>${tag}${esc(x.title)}</b></summary>${inner}</details>`
        : `<section class="doc" data-todo-section="${esc(x.key)}"><h2>${tag}${esc(x.title)}</h2>${inner}</section>`;
    }).join('') || `<div class="note">Listede ${g ? 'bu oyuna' : 'genel'} bölüm yok. Eklemek için docs/YAPILACAKLAR.md'de başlık: <code>## ${esc(g ? g.title : 'Stüdyo (genel)')} — …</code></div>`}</div>`;
}

// ---------------------------------------------------------------- rewards
const PAL_NAMES = { cloth: 'Giysi', clothHi: 'Giysi (açık)', clothDark: 'Giysi (koyu)', wrap: 'Kuşak, sargı', wrapDark: 'Kuşak (koyu)', accent: 'Vurgu',
  accentDark: 'Vurgu (koyu)', ui: 'Arayüz rengi', skin: 'Ten', hakama: 'Pantolon', hakamaDark: 'Pantolon (koyu)', haori: 'Ceket (haori)', armor: 'Zırh',
  mask: 'Maske', glove: 'Eldiven', tabi: 'Çorap (tabi)', rim: 'Kenar ışığı', rimDim: 'Kenar ışığı (soluk)' };
const KIND_NAMES = { costume: 'Kostüm', title: 'Unvan', badge: 'Rozet' };
const BASE_NAMES = { col: 'Asıl renkler', alt: 'Eski (Legacy) renkler', champ: 'Şampiyon renkleri' };
// drawn costumes the game ships (a new one needs a game update): validate.js BUILTIN_COSTUMES
const BUILTIN_NAMES = { '': 'Yok (yalnız renk / resim)', champion: 'Sezon şampiyonu (her karaktere özel kostüm)' };
const ROSTER = NINJAS.map((n) => n.id);

async function loadRewards() {
  try { state.rewards = await rpc('nd_admin_rewards'); state.rewardsErr = null; } catch (e) { state.rewardsErr = e; }
  if (onPane('rewards')) paintRewards();
}
const rname = (w) => (w.names && (w.names.tr || w.names.en)) || w.id;
function paintRewards() {
  const el = $('#pane');
  if (!el) return;
  if (!state.rewards && !state.rewardsErr) { el.innerHTML = '<p class="muted">Yükleniyor…</p>'; loadRewards(); return; }
  if (state.rewardsErr) { el.innerHTML = `<div class="warn-box">${esc(friendly(state.rewardsErr))} (Shadow Duel dereceli ödül kataloğu: ranked.sql ve ranked-admin.sql.)</div>`; return; }
  const list = state.rewards.filter((w) => !state.rewardKind || w.kind === state.rewardKind);
  el.innerHTML = `${state.page === 'shadow-duel' ? rewardsTabs('rewards') : ''}<div class="bar-head"><h2>Ödül kataloğu</h2><span class="muted small">Shadow Duel · dereceli</span>
      <button class="btn primary right" type="button" data-act="reward-new">+ Yeni ödül</button></div>
    <div class="chips" style="margin-bottom:12px" role="group" aria-label="Tür">${[['', 'Hepsi'], ['costume', 'Kostüm'], ['title', 'Unvan'], ['badge', 'Rozet']].map(([k, t]) => `<button type="button" data-act="reward-kind" data-kind="${k}" aria-pressed="${state.rewardKind === k}">${t}</button>`).join('')}</div>
    <div class="grid">${list.map((w) => `<article class="card reward" data-reward="${esc(w.id)}">
      ${rewardThumb(w)}
      <div><h4>${esc(rname(w))}</h4>
        <div class="meta small muted"><code>${esc(w.id)}</code> · ${KIND_NAMES[w.kind]} · sahibi ${fmtN(w.owners)} oyuncu</div>
        <div class="row" style="margin-top:6px">${w.deleted_at ? '<span class="badge del">silindi</span>' : w.active ? '<span class="badge on">oyunda açık</span>' : '<span class="badge off">kapalı</span>'}${w.data?.placeholder ? '<span class="badge">yer tutucu</span>' : ''}</div>
        <div class="row" style="margin-top:8px">
          ${w.deleted_at ? `<button class="ghost" type="button" data-act="reward-restore" data-id="${esc(w.id)}">Geri al</button>`
            : `<button class="ghost" type="button" data-act="reward-edit" data-id="${esc(w.id)}">Düzenle</button>
               <button class="ghost" type="button" data-act="reward-active" data-id="${esc(w.id)}" data-on="${w.active ? '0' : '1'}">${w.active ? 'Kapat' : 'Aç'}</button>
               <button class="ghost" type="button" data-act="reward-delete" data-id="${esc(w.id)}">Sil</button>`}
        </div></div></article>`).join('') || '<p class="muted">Bu türde ödül yok.</p>'}</div>
    <p class="small muted" style="margin-top:12px">"Kapalı" ödül oyunda görünmez. Silmek geri alınabilir; sahip olan oyuncular kaybetmez. Bir sezonun verdiği ödül silinemez.</p>`;
}
function rewardThumb(w) {
  if (w.kind === 'costume') return `<div class="pv">${ninjaSvg(previewPal(w.data, w.data?.ninjas?.[0] || 'akane'), 56, 72)}</div>`;
  const c = w.data?.color || 'var(--accent)';
  return `<div class="pv" style="display:grid;place-items:center"><span style="display:grid;place-items:center;width:44px;height:44px;border-radius:50%;border:3px solid ${esc(c)};font-size:20px">${esc(w.data?.icon || (w.kind === 'badge' ? '●' : '★'))}</span></div>`;
}
function previewPal(data, ninjaId) {
  const n = NINJAS.find((x) => x.id === ninjaId) || NINJAS[0];
  const base = n[(data && data.base) || 'col'] || n.col;
  const p = { ...base, ...((data && data.pal) || {}) };
  if (data?.pal?.hood) p.hood = data.pal.hood;
  return p;
}
/** A simple ninja figure painted with the palette. Not the game's own drawing (see docs/STUDYO-PANELI.md). */
function ninjaSvg(p, w = 120, h = 160) {
  const c = (k, d) => (typeof p[k] === 'string' && /^#[0-9a-f]{6}$/i.test(p[k]) ? p[k] : d);
  const cloth = c('cloth', '#555'), clothHi = c('clothHi', cloth), clothDark = c('clothDark', cloth), wrap = c('wrap', '#333'), accent = c('accent', '#c33');
  const skin = c('skin', '#c89c81'), hak = c('hakama', cloth), hakD = c('hakamaDark', clothDark), hood = p.hood && /^#/.test(p.hood.cloth) ? p.hood.cloth : wrap;
  const glove = c('glove', skin), tabi = c('tabi', '#222'), haori = c('haori', cloth), mask = c('mask', hood);
  const rim = typeof p.rim === 'string' ? p.rim : 'rgba(168,180,220,.55)';
  return `<svg viewBox="0 0 120 160" width="${w}" height="${h}" role="img" aria-label="Kostüm taslağı">
    <g stroke="${esc(rim)}" stroke-width="1.5" stroke-linejoin="round">
      <path d="M44 150 L50 100 H70 L76 150 H64 L60 112 L56 150 Z" fill="${hak}"/>
      <path d="M56 150 L58 118 L60 150 Z" fill="${hakD}" stroke="none"/>
      <rect x="44" y="146" width="13" height="7" rx="3" fill="${tabi}"/><rect x="63" y="146" width="13" height="7" rx="3" fill="${tabi}"/>
      <path d="M42 56 Q60 46 78 56 L74 102 H46 Z" fill="${haori}"/>
      <path d="M48 58 Q60 52 72 58 L70 100 H50 Z" fill="${cloth}"/>
      <path d="M60 56 L52 74 L60 70 L68 74 Z" fill="${clothHi}" stroke="none"/>
      <rect x="46" y="84" width="28" height="7" fill="${wrap}"/><rect x="64" y="85" width="8" height="12" fill="${accent}"/>
      <path d="M42 58 L30 92 L37 95 L48 66 Z" fill="${clothDark}"/><path d="M78 58 L90 92 L83 95 L72 66 Z" fill="${clothDark}"/>
      <circle cx="33" cy="96" r="5" fill="${glove}"/><circle cx="87" cy="96" r="5" fill="${glove}"/>
      <circle cx="60" cy="38" r="15" fill="${hood}"/>
      <rect x="49" y="33" width="22" height="8" rx="3" fill="${skin}"/>
      <rect x="49" y="40" width="22" height="6" rx="2" fill="${mask}" stroke="none"/>
      <path d="M71 30 L92 24 L90 30 L72 35 Z" fill="${accent}"/>
    </g></svg>`;
}
function openReward(w) {
  const creating = !w;
  const cur = w ? JSON.parse(JSON.stringify({ id: w.id, kind: w.kind, names: w.names, data: w.data, sort: w.sort })) :
    { id: '', kind: 'costume', names: {}, data: { v: 1, base: 'col', pal: {} }, sort: 0 };
  let previewNinja = cur.data?.ninjas?.[0] || 'akane';
  let partsText = cur.data?.atlas ? JSON.stringify(cur.data.atlas.parts, null, 1) : '';
  const d = $('#dlg');
  const draw = (errs = [], msg = '') => {
    const costume = cur.kind === 'costume';
    const pal = cur.data.pal || {};
    const atlas = cur.data.atlas;
    d.innerHTML = `<form class="form" id="rwForm" novalidate>
      <div class="d-head"><h2 id="dlgTitle">${creating ? 'Yeni ödül' : `Düzenle: ${esc(cur.id)}`}</h2><button class="ghost x" type="button" data-act="dlg-close" aria-label="Kapat">✕</button></div>
      <div class="d-body form">
        ${errs.length ? `<div class="errors" data-testid="reward-errors"><b>Düzelt:</b><ul>${errs.map((e) => `<li><code>${esc(e.field)}</code> ${esc(e.msg)}</li>`).join('')}</ul></div>` : ''}
        ${msg ? `<p class="ok-msg">${esc(msg)}</p>` : ''}
        <div class="two">
          <label class="f"><span>Kimlik (değişmez)</span><input name="id" value="${esc(cur.id)}" ${creating ? '' : 'disabled'} placeholder="costume_winter_s2" autocapitalize="off"></label>
          <label class="f"><span>Tür</span><select name="kind" ${creating ? '' : 'disabled'}>${V.KINDS.map((k) => `<option value="${k}" ${k === cur.kind ? 'selected' : ''}>${KIND_NAMES[k]}</option>`).join('')}</select></label>
          <label class="f"><span>Sıra (küçük önce)</span><input name="sort" type="number" step="1" value="${esc(cur.sort ?? 0)}"></label>
        </div>
        <fieldset class="card"><legend class="small"><b>Adı (7 dil; İngilizce ya da Türkçe şart, en çok 40 karakter)</b></legend>
          <div class="two">${V.LANGS.map((l) => `<label class="f"><span>${V.LANG_NAMES[l]}</span><input name="n_${l}" maxlength="40" value="${esc(cur.names?.[l] || '')}"></label>`).join('')}</div></fieldset>
        ${costume ? `
        <div class="two">
          <label class="f"><span>Temel renkler</span><select name="base">${Object.entries(BASE_NAMES).map(([k, t]) => `<option value="${k}" ${k === (cur.data.base || 'col') ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
          <label class="f"><span>Önizlemede ninja</span><select name="pvNinja">${NINJAS.map((n) => `<option value="${n.id}" ${n.id === previewNinja ? 'selected' : ''}>${esc(n.name)}</option>`).join('')}</select></label>
          <label class="f row" style="gap:8px"><input type="checkbox" name="placeholder" ${cur.data.placeholder ? 'checked' : ''}><span>Yer tutucu (asıl çizim sonra)</span></label>
          <label class="f"><span>Çizili kostüm (oyunla gelir)</span><select name="builtin">${Object.entries(BUILTIN_NAMES).filter(([k]) => !k || V.BUILTIN_COSTUMES.includes(k)).map(([k, t]) => `<option value="${k}" ${k === (cur.data.builtin || '') ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
        </div>
        <fieldset class="card"><legend class="small"><b>Hangi ninjalar giyebilir</b> (hiçbiri seçili değilse: hepsi)</legend>
          <div class="chips">${NINJAS.map((n) => `<label class="badge${(cur.data.ninjas || []).includes(n.id) ? ' on' : ''}"><input type="checkbox" name="nj" value="${n.id}" ${(cur.data.ninjas || []).includes(n.id) ? 'checked' : ''} style="margin-right:4px">${esc(n.name)}</label>`).join('')}</div></fieldset>
        <fieldset class="card"><legend class="small"><b>Renkler</b> (işaretsiz olan temel rengi kullanır)</legend>
          <div class="swatches">${V.PAL_KEYS.map((k) => {
            const on = typeof pal[k] === 'string', val = on ? pal[k] : previewPal({ base: cur.data.base }, previewNinja)[k] || '';
            return V.RGBA_KEYS.includes(k)
              ? `<label class="sw"><input type="checkbox" name="on_${k}" ${on ? 'checked' : ''}><span class="chip" style="background:${esc(val)}"></span><span style="min-width:0">${PAL_NAMES[k]}<input type="text" name="c_${k}" value="${esc(val)}" placeholder="rgba(255,255,255,.5)"></span></label>`
              : `<label class="sw"><input type="checkbox" name="on_${k}" ${on ? 'checked' : ''}><input type="color" name="c_${k}" value="${/^#[0-9a-f]{6}$/i.test(val) ? esc(val) : '#888888'}"><span>${PAL_NAMES[k]}</span></label>`;
          }).join('')}
            <label class="sw"><input type="checkbox" name="on_hood" ${pal.hood ? 'checked' : ''}><span>Başlık:</span>${['cloth', 'clothHi', 'clothDark'].map((k) => `<input type="color" name="h_${k}" value="${esc(pal.hood?.[k] || '#222222')}" aria-label="Başlık ${k}">`).join('')}</label>
          </div></fieldset>
        <fieldset class="card"><legend class="small"><b>Resim atlası</b> (isteğe bağlı: yeni parça çizimleri; PNG ya da WebP, en çok 2 MB ve 2048×2048)</legend>
          <div class="form">
            <input type="file" name="atlasFile" accept="image/png,image/webp"> <span class="small muted" id="atlasMsg"></span>
            ${atlas ? `<p class="small"><code>${esc(atlas.url.replace(V.REWARDS_BASE, 'rewards/'))}</code> ${atlas.w ? `· ${atlas.w}×${atlas.h}` : ''} <button class="ghost" type="button" data-act="atlas-x">Atlası çıkar</button></p>` : ''}
            <label class="f"><span>Parçalar (JSON: ad → { x, y, w, h, bone: [eklem, eklem], ox, oy, s, rot, front })</span>
              <textarea name="parts" spellcheck="false" style="font-family:ui-monospace,monospace;font-size:12px" placeholder='{"head":{"x":0,"y":0,"w":64,"h":64,"bone":["neck","head"]}}'>${esc(partsText)}</textarea></label>
            <p class="small muted">Eklemler: ${V.JOINTS.join(', ')}</p>
          </div></fieldset>
        <div class="card"><b class="small">Önizleme</b>
          <div class="preview-row" style="margin-top:8px"><div class="ninja-svg">${ninjaSvg(previewPal(cur.data, previewNinja))}</div>
          ${atlas ? atlasPreview(atlas) : ''}</div>
          <p class="small muted">Bu basit bir taslaktır: renkler doğru, şekil oyundaki gibi değil. Oyunun kendi çizimiyle görmek için dereceli deneme sayfasında kostümü seç (docs/STUDYO-PANELI.md).</p></div>`
        : `<div class="two">
          <label class="f"><span>Renk</span><span class="row"><input type="checkbox" name="on_color" ${cur.data.color ? 'checked' : ''} aria-label="Renk kullan"><input type="color" name="color" value="${esc(cur.data.color || '#ffd35a')}"></span></label>
          <label class="f"><span>Simge (en çok 2 işaret, ör. 将 ★)</span><input name="icon" maxlength="2" value="${esc(cur.data.icon || '')}"></label>
        </div>
        <div class="card"><b class="small">Önizleme</b><div class="row" style="margin-top:8px">${rewardThumb({ kind: cur.kind, data: cur.data })}<b>${esc(cur.names?.tr || cur.names?.en || '')}</b></div></div>`}
      </div>
      <div class="d-foot"><button class="btn" type="button" data-act="dlg-close">Vazgeç</button><button class="btn primary" type="submit">${creating ? 'Oluştur (kapalı)' : 'Kaydet'}</button></div>
    </form>`;
    const f = $('#rwForm');
    const E = (n) => f.elements.namedItem(n);
    const read = () => {
      if (creating) { cur.id = E('id').value.trim(); cur.kind = E('kind').value; }
      cur.sort = E('sort').value === '' ? 0 : Number(E('sort').value);
      cur.names = {};
      for (const l of V.LANGS) if (f['n_' + l].value.trim()) cur.names[l] = f['n_' + l].value;
      if (cur.kind === 'costume') {
        const data = { v: 1, base: f.base.value };
        if (f.placeholder.checked) data.placeholder = true;
        if (f.builtin.value) data.builtin = f.builtin.value;
        const nj = [...f.querySelectorAll('input[name="nj"]:checked')].map((x) => x.value);
        if (nj.length) data.ninjas = nj;
        const pal = {};
        for (const k of V.PAL_KEYS) if (f['on_' + k].checked) pal[k] = f['c_' + k].value.trim();
        if (f.on_hood.checked) pal.hood = { cloth: f.h_cloth.value, clothHi: f.h_clothHi.value, clothDark: f.h_clothDark.value };
        if (Object.keys(pal).length) data.pal = pal;
        partsText = f.parts.value;
        if (cur.data.atlas) {
          let parts = null;
          try { parts = partsText.trim() ? JSON.parse(partsText) : {}; } catch { parts = '__bad__'; }
          data.atlas = { ...cur.data.atlas, parts };
        }
        previewNinja = f.pvNinja.value;
        cur.data = data;
      } else {
        cur.data = { v: 1 };
        if (f.on_color.checked) cur.data.color = f.color.value;
        if (f.icon.value) cur.data.icon = f.icon.value;
      }
    };
    // live preview: colours, ticks and lists redraw at once (text boxes keep their focus: they are read on save)
    const LIVE = /^(on_|c_#|h_|base$|pvNinja$|nj$|placeholder$|on_color$|color$)/;
    f.oninput = (ev) => { const n = ev.target.name || ''; if (ev.target.type !== 'text' && LIVE.test(n) && !/^c_(rim|rimDim)$/.test(n) || /^c_/.test(n) && ev.target.type === 'color') { read(); draw(); } };
    f.onchange = (ev) => {
      if (ev.target.name !== 'kind') return;
      cur.id = E('id').value.trim();
      cur.kind = ev.target.value;
      for (const l of V.LANGS) cur.names[l] = E('n_' + l).value;
      cur.data = cur.kind === 'costume' ? { v: 1, base: 'col', pal: {} } : { v: 1 };
      draw();
    };
    f.atlasFile && (f.atlasFile.onchange = async () => {
      read();
      const file = f.atlasFile.files[0];
      const c = V.checkUpload(file, V.REWARD_IMAGE);
      if (!c.ok) { $('#atlasMsg').textContent = c.msg; f.atlasFile.value = ''; return; }
      const size = await imageSize(file).catch(() => null);
      if (!size) { $('#atlasMsg').textContent = 'Resim okunamadı.'; return; }
      if (size.w > V.REWARD_IMAGE.side || size.h > V.REWARD_IMAGE.side) { $('#atlasMsg').textContent = `Resim çok büyük: ${size.w}×${size.h} (en çok 2048×2048).`; return; }
      $('#atlasMsg').textContent = 'Yükleniyor…';
      try {
        const path = await upload('rewards', V.storageName(file, 'costumes'), file);
        cur.data.atlas = { url: V.REWARDS_BASE + path, w: size.w, h: size.h, parts: (cur.data.atlas && cur.data.atlas.parts) || {} };
        draw([], 'Resim yüklendi. Şimdi parçaları yaz.');
      } catch (e) { $('#atlasMsg').textContent = friendly(e); }
    });
    const ax = d.querySelector('[data-act="atlas-x"]');
    if (ax) ax.onclick = () => { read(); delete cur.data.atlas; partsText = ''; draw(); };
    f.onsubmit = async (ev) => {
      ev.preventDefault();
      read();
      const c = V.checkReward(cur, { roster: ROSTER, creating, taken: (state.rewards || []).map((x) => x.id) });
      if (cur.data.atlas && cur.data.atlas.parts === '__bad__') c.errors.unshift({ field: 'data.atlas.parts', msg: 'Parçalar JSON olarak okunamadı.' });
      if (c.errors.length) return draw(c.errors);
      try {
        if (creating) await rpc('nd_admin_reward_create', { p: { id: cur.id, kind: cur.kind, names: c.value.names, data: c.value.data, sort: cur.sort, active: false } });
        else await rpc('nd_admin_reward_update', { p_id: cur.id, p: { names: c.value.names, data: c.value.data, sort: cur.sort } });
        d.close();
        await loadRewards();
      } catch (e) { draw([{ field: 'sunucu', msg: serverFieldMsg(e) }]); }
    };
  };
  draw();
  d.showModal();
}
function atlasPreview(a) {
  const W = a.w || 512, H = a.h || 512;
  const parts = a.parts && typeof a.parts === 'object' ? Object.entries(a.parts) : [];
  return `<div class="atlas-pv" style="width:min(100%,320px)"><img src="${esc(a.url)}" alt="Atlas resmi" crossorigin="anonymous" referrerpolicy="no-referrer">
    <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">${parts.map(([k, q]) => (q && Number.isFinite(q.x) ? `<rect x="${q.x}" y="${q.y}" width="${q.w}" height="${q.h}"><title>${esc(k)}</title></rect>` : '')).join('')}</svg></div>`;
}
function imageSize(file) {
  return new Promise((res, rej) => {
    const u = URL.createObjectURL(file), img = new Image();
    img.onload = () => { res({ w: img.naturalWidth, h: img.naturalHeight }); URL.revokeObjectURL(u); };
    img.onerror = () => { rej(new Error('bad image')); URL.revokeObjectURL(u); };
    img.src = u;
  });
}

// ---------------------------------------------------------------- season
async function loadSeasons() {
  try { state.seasons = await rpc('nd_admin_seasons'); state.seasonsErr = null; } catch (e) { state.seasonsErr = e; }
  if (!state.rewards && !state.rewardsErr) { try { state.rewards = await rpc('nd_admin_rewards'); } catch (e) { state.rewardsErr = e; } }
  if (onPane('season')) paintSeason();
}
function rewardPicker(name, ids) {
  const list = (state.rewards || []).filter((w) => !w.deleted_at);
  return `<div class="chips">${list.map((w) => `<label class="badge${ids.includes(w.id) ? ' on' : ''}"><input type="checkbox" name="${name}" value="${esc(w.id)}" ${ids.includes(w.id) ? 'checked' : ''} style="margin-right:4px">${esc(rname(w))} <span class="muted">· ${KIND_NAMES[w.kind]}${w.active ? '' : ', kapalı'}</span></label>`).join('') || '<span class="muted small">Katalog boş.</span>'}</div>`;
}
function paintSeason(msg = '') {
  const el = $('#pane');
  if (!el) return;
  if (!state.seasons && !state.seasonsErr) { el.innerHTML = '<p class="muted">Yükleniyor…</p>'; loadSeasons(); return; }
  if (state.seasonsErr) { el.innerHTML = `<div class="warn-box">${esc(friendly(state.seasonsErr))} (Shadow Duel dereceli: ranked.sql ve ranked-admin.sql.)</div>`; return; }
  const S = state.seasons, c = S.current, n = S.next;
  if (!c) { el.innerHTML = '<div class="note">Açık sezon yok. İlk dereceli maçla birlikte açılır.</div>'; return; }
  const left = Math.ceil((new Date(c.ends_at) - Date.now()) / 864e5);
  const names = (ids) => ids.map((id) => { const w = (state.rewards || []).find((x) => x.id === id); return w ? rname(w) : id; }).join(', ') || 'ödül yok';
  el.innerHTML = `<h2>Sezon</h2>
    ${msg ? `<p class="ok-msg">${esc(msg)}</p>` : ''}
    <div class="grid wide" style="margin-top:12px">
      <form class="card form" id="seasonNow" novalidate><h3>Şu anki sezon: ${c.id}</h3>
        <div class="tiles">${tile('Başladı', fmtDate(c.starts_at))}${tile('Bitiyor', fmtDate(c.ends_at), left > 0 ? `${left} gün kaldı` : 'süresi doldu, ilk maçta kapanır')}</div>
        <p class="small">Şampiyonun alacağı: <b>${esc(names(c.reward_ids))}</b></p>
        ${rewardPicker('now', c.reward_ids)}
        <p class="small muted">Şampiyonluk ödülü için sezon sonunda sıralamada en az ${S.min_players} oyuncu olmalı.</p>
        <button class="btn primary" type="submit">Bu sezonun ödülünü kaydet</button></form>
      <form class="card form" id="seasonNext"><h3>Sonraki sezon: ${n.id}</h3>
        <p class="small">${n.planned ? 'Önceden seçildi' : 'Seçilmedi: şu anki sezonun ödülü aynen geçer'} → <b>${esc(names(n.reward_ids))}</b></p>
        ${rewardPicker('next', n.planned ? n.reward_ids : [])}
        <div class="row"><button class="btn primary" type="submit">Sonraki sezonun ödülünü kaydet</button>${n.planned ? '<button class="btn" type="button" data-act="season-next-clear">Seçimi kaldır</button>' : ''}</div>
        <p class="small muted">Sezon ${S.season_days} gün sürer. Yeni sezon açılınca bu seçim kendiliğinden yazılır.</p></form>
    </div>
    <h3 style="margin-top:20px">Geçmiş sezonlar</h3>
    <div class="scroll-x card" style="margin-top:8px"><table><thead><tr><th>Sezon</th><th>Bitti</th><th>Şampiyon</th><th class="n">Sıralamada</th><th>Ödül</th></tr></thead>
      <tbody>${S.past.map((p) => `<tr><td>${p.id}</td><td>${esc(fmtDate(p.closed_at || p.ends_at))}</td><td>${esc(p.champion_nick || '—')}</td><td class="n">${fmtN(p.players)}</td><td>${esc(names(p.reward_ids))}</td></tr>`).join('') || '<tr><td colspan="5" class="muted">Henüz biten sezon yok.</td></tr>'}</tbody></table></div>`;
  const save = async (season, ids) => {
    try { state.seasons = await rpc('nd_admin_season_rewards', { p_season: season, p_ids: ids }); paintSeason('Kaydedildi.'); } catch (e) { paintSeason(); el.insertAdjacentHTML('afterbegin', `<div class="errors">${esc(serverFieldMsg(e))}</div>`); }
  };
  $('#seasonNow').onsubmit = (ev) => { ev.preventDefault(); save(c.id, [...ev.target.querySelectorAll('input[name="now"]:checked')].map((x) => x.value)); };
  $('#seasonNext').onsubmit = (ev) => { ev.preventDefault(); save(n.id, [...ev.target.querySelectorAll('input[name="next"]:checked')].map((x) => x.value)); };
  const clr = el.querySelector('[data-act="season-next-clear"]');
  if (clr) clr.onclick = () => save(n.id, null);
}

// ---------------------------------------------------------------- errors (every game page; supabase/studio/errors.sql st_errors_summary)
const ERR_KIND = { error: 'Hata', rejection: 'Karşılanmamış söz (promise)', frame: 'Kare hatası' };
const pct1 = (a, b) => (b > 0 ? `%${(Math.round((1000 * a) / b) / 10).toLocaleString('tr-TR')}` : '—');
async function loadErrors() {
  const days = state.errDays;
  state.errLoading = true;
  try { const r = await rpc('st_errors_summary', { p_days: days }); if (days === state.errDays) { state.errors = r; state.errorsErr = null; } } catch (e) { state.errorsErr = e; state.errors = null; }
  state.errLoading = false;
  if (onPane('errors')) paintErrors();
}
function paintErrors() {
  const el = $('#pane');
  if (!el) return;
  const head = `<div class="bar-head"><h2>Hatalar</h2><span class="muted small">oyunda yakalanmamış hatalar</span>
    <div class="seg right" role="group" aria-label="Dönem">${[[1, 'Bugün'], [7, '7 gün'], [30, '30 gün']].map(([d, t]) => `<button type="button" data-act="err-days" data-days="${d}" aria-pressed="${state.errDays === d}">${t}</button>`).join('')}</div></div>`;
  if (state.errorsErr) { el.innerHTML = head + `<div class="warn-box" data-testid="err-error">${esc(friendly(state.errorsErr))}${state.errorsErr.missing ? ' (Hata raporları: supabase/studio/errors.sql.)' : ''}</div>`; return; }
  const X = state.errors;
  if (!X || X.days !== state.errDays) { el.innerHTML = head + '<p class="muted">Yükleniyor…</p>'; if (!state.errLoading) loadErrors(); return; }
  const g = (X.games || []).find((x) => x.game === state.page) || { versions: [], top: [] };
  const vs = (g.versions || []).slice().sort((a, b) => (verKey(b.ver) > verKey(a.ver) ? 1 : -1));
  const S = vs.reduce((a, v) => a + v.sessions, 0), E = vs.reduce((a, v) => a + v.error_sessions, 0), R = vs.reduce((a, v) => a + v.reports, 0);
  const range = `<p class="muted small">${X.days === 1 ? 'Bugün' : `${dayLabel(X.from)} – ${dayLabel(X.to)}`} (Türkiye saati)</p>`;
  const verTable = vs.length ? `<div class="scroll-x"><table data-testid="err-versions"><thead><tr><th>Sürüm</th><th class="n">Oturum</th><th class="n">Hatalı oturum</th><th class="n">Çökme oranı</th><th class="n">Rapor</th></tr></thead>
    <tbody>${vs.map((v) => `<tr><td><b>${esc(v.ver)}</b></td><td class="n">${fmtN(v.sessions)}</td><td class="n">${fmtN(v.error_sessions)}</td><td class="n" data-rate>${pct1(v.error_sessions, v.sessions)}</td><td class="n">${fmtN(v.reports)}</td></tr>`).join('')}</tbody></table></div>` : '';
  const top = g.top || [];
  if (!top.length && !E) {
    el.innerHTML = head + range + `<div class="note" data-testid="err-empty">Henüz hata raporu yok${X.days === 1 ? ' (bugün)' : ` (son ${X.days} gün)`}.</div>`
      + (vs.length ? `<div class="card" style="margin-top:12px" data-errors="${esc(state.page)}"><div class="sub-h" style="margin-top:0">Sürüm başına</div>${verTable}</div>` : '');
    return;
  }
  el.innerHTML = head + range + `<div data-errors="${esc(state.page)}">
    <article class="card" style="margin-bottom:12px">
      <div class="tiles">${tile('Çökme oranı', pct1(E, S), 'hata görülen oturum / oturum')}${tile('Hatalı oturum', fmtN(E), `${fmtN(S)} oturumdan`)}${tile('Rapor', fmtN(R))}${tile('Farklı hata', fmtN(top.length), top.length >= 15 ? 'en çok görülen 15' : '')}</div>
      <div class="sub-h">Sürüm başına</div>${verTable}
      <p class="small muted">Çökme oranı: o sürümde en az bir hata görülen oturumların bütün oturumlara oranı (CrazyGames'in "crash rate" sayısıyla karşılaştır). Oturum sayısı istatistikten gelir; istatistiği olmayan yerlerin (Yandex, Playgama) hatası da yoktur.</p>
    </article>
    <h3 style="margin:16px 0 8px">En çok görülen hatalar</h3>
    <ol class="errs" data-testid="err-top">${top.map((t) => errItem(t)).join('')}</ol>
    <p class="small muted">Bir hataya dokununca son 3 örneği açılır: kodda yeri, oyunun o anki durumu, cihaz ve tarayıcı.</p></div>`;
}
function errItem(t) {
  const open = state.errOpen === t.sig;
  const mob = (t.phone || 0) + (t.tablet || 0);
  return `<li class="card err${open ? ' open' : ''}" data-sig="${esc(t.sig)}">
    <button type="button" class="err-h" data-act="err-open" data-sig="${esc(t.sig)}" aria-expanded="${open}">
      <span class="err-msg">${esc(t.msg)}</span>
      <span class="err-meta"><code>${esc(t.src || 'yer yok')}</code><span><b class="num">${fmtN(t.sessions)}</b> oturum · ${fmtN(t.reports)} rapor</span>
        <span>telefon/tablet ${pct(mob, t.sessions)}</span><span>son: ${esc(fmtDateTime(t.last_at))}</span>
        <span class="badge">${esc(ERR_KIND[t.kind] || t.kind)}</span>${(t.vers || []).slice(0, 4).map((v) => `<span class="badge">${esc(v)}</span>`).join('')}</span>
    </button>
    ${open ? `<div class="samples" data-testid="err-samples">${(t.samples || []).map((s) => `<div class="sample">
        <div class="kv"><span>${esc(fmtDateTime(s.at))}</span><span>sürüm ${esc(s.ver)}</span><span>${esc(PORTAL[s.portal] || s.portal)}</span><span>${esc(DEVICE[s.device] || s.device)}</span><span>${esc(BROWSER[s.browser] || s.browser)}</span><span>açıldıktan ${esc(fmtDur(s.t_s))} sonra</span></div>
        ${s.state ? `<p class="small" style="margin:6px 0 0">Durum: <code>${esc(s.state)}</code></p>` : ''}
        <pre class="stack">${esc(s.stack || '(yığın yok)')}</pre></div>`).join('') || '<p class="muted small">Örnek yok (ham kayıtlar 30 gün tutulur).</p>'}</div>` : ''}
  </li>`;
}

// ---------------------------------------------------------------- ranked, the earlier overview (Shadow Duel; games/06-shadow-duel/supabase/ranked-panel.sql)
// Shown only while ranked-panel-season.sql is not on the server (state.rkOld); the season view below replaces it.
const RK_STATUS = { found: 'Bulundu', picking: 'Seçimde', live: 'Sürüyor', done: 'Bitti', nc: 'Sayılmadı', disputed: 'Anlaşmazlık', declined: 'Reddedildi', cancelled: 'Bağlanamadı' };
const RK_VERDICT = { ok: 'normal bitti', left: 'biri çıktı', silent: 'biri sustu', desync: 'iki cihaz farklı hesapladı (desync)', result_mismatch: 'raporlar farklı sonuç diyor',
  input_mismatch: 'girdiler tutmuyor', left_mismatch: 'çıkış raporu tutmuyor', connection: 'bağlantı koptu', no_second_report: 'tek rapor geldi', abandoned: 'iki taraf da kayboldu',
  mixed: 'raporlar karışık', audit: 'denetimle karar', declined: 'reddedildi', timeout: 'kabul süresi doldu', no_connection: 'bağlanamadılar', pause: 'duraklatıldı' };
const RK_WHY = { guest: 'misafir var', same_network: 'aynı ağ', pair_limit: 'aynı çift 24 saatte 3 maç', daily_limit: 'günlük sınır' };
const ninjaName = (id) => { const n = NINJAS.find((x) => x.id === id); return n ? n.name.charAt(0) + n.name.slice(1).toLowerCase() : id || '—'; };
const tierTag = (t) => `<span class="tier"><b lang="ja">${esc(t.kanji)}</b> <span lang="en" translate="no">${esc(t.name)}</span></span>`;
const signed = (n) => (n == null ? '' : n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : '0');
const rkStatus = (m) => esc(RK_STATUS[m.status] || m.status) + (m.verdict && m.verdict !== 'ok' ? ` <span class="muted">· ${esc(RK_VERDICT[m.verdict] || m.verdict)}</span>` : '')
  + (!m.ranked && m.why_unranked ? ` <span class="muted">· puansız (${esc(RK_WHY[m.why_unranked] || m.why_unranked)})</span>` : '');

async function loadRankedOld() {
  try { state.ranked = await rpc('nd_admin_ranked'); state.rankedErr = null; state.rankedAt = Date.now(); } catch (e) { state.rankedErr = e; state.ranked = null; }
  // reward names for the season's champion reward and the players' rewards (the catalog may not be installed: ids then)
  if (!state.rankedErr && !state.rewards && !state.rewardsErr) { try { state.rewards = await rpc('nd_admin_rewards'); } catch (e) { state.rewardsErr = e; } }
  if (onPane('ranked', 'shadow-duel')) paintRanked();
}
function paintRankedOld() {
  const el = $('#pane');
  if (!el) return;
  if (state.rankedErr) {
    el.innerHTML = `<div class="warn-box" data-testid="rk-error">${state.rankedErr.missing ? 'Dereceli bölümünün sunucu kurulumu henüz yapılmadı (games/06-shadow-duel/supabase/ranked-panel.sql). Kurulunca burada sezon, oyuncular, kademeler ve maçlar görünür.' : esc(friendly(state.rankedErr))}</div>`;
    return;
  }
  if (!state.ranked) { el.innerHTML = '<p class="muted">Yükleniyor…</p>'; loadRankedOld(); return; }
  const X = state.ranked, s = X.season, P = X.players || {}, M = X.matches || {}, st = X.settings || {};
  const head = `<div class="bar-head"><h2>Dereceli</h2><span class="muted small">Shadow Duel · sıralamalı düello</span>
    <span class="muted small right">${esc(fmtDateTime(state.rankedAt))} itibarıyla</span><button class="btn" type="button" data-act="rk-refresh">Yenile</button></div>`;
  if (!s) { el.innerHTML = head + '<div class="note" data-testid="rk-empty">Henüz sezon yok. İlk dereceli maçla birlikte açılır.</div>'; return; }
  const status = s.closed ? '<span class="badge">kapandı</span>' : s.over ? '<span class="badge del">süresi doldu · ilk kuyruk isteğinde kapanır</span>' : '<span class="badge on">açık</span>';
  const season = `<article class="card rk-season" data-testid="rk-season">
      <div class="hero"><span class="v num" data-testid="rk-days-left">${fmtN(s.days_left)}</span><span class="l">gün kaldı · <b>Sezon ${esc(s.id)}</b> ${status}${X.enabled ? '' : ' <span class="badge del">dereceli kapalı (rank_enabled = 0)</span>'}</span></div>
      <p class="small muted" style="margin:6px 0 0">${esc(fmtDate(s.starts_at))} – ${esc(fmtDate(s.ends_at))} · sezon ${fmtN(st.season_days)} gün · şampiyon ödülü: ${esc(rewardNames(s.reward_ids))}</p></article>`;
  const empty = !P.total && !(M.d7 && M.d7.found);
  const tiles = `<div class="tiles" data-testid="rk-tiles">
      ${tile('Derecelide', fmtN(P.total), `${fmtN(P.placement)} yerleştirmede · ${fmtN(P.placed)} yerleşmiş`)}
      ${tile('Sıralamada', fmtN(P.on_board), `en az ${fmtN(st.board_games)} puanlı maç`)}
      ${tile('Son 24 saat oynayan', fmtN(P.active_24h), `7 günde ${fmtN(P.active_7d)} · ${fmtN(P.guests_7d)} misafir`)}
      ${tile('Bugün maç', fmtN(M.today?.played), `${fmtN(M.today?.rated)} puanlı · ${fmtN(M.today?.found)} eşleşme`)}
      ${tile('7 günde maç', fmtN(M.d7?.played), `${fmtN(M.d7?.rated)} puanlı`)}
      ${tile('Kuyrukta bekleme', M.wait && M.wait.n ? fmtDur(M.wait.avg_s) : '—', M.wait && M.wait.n ? `ortalama · ortanca ${fmtDur(M.wait.p50_s)}` : 'son 7 günde eşleşme yok')}
      ${tile('Şu an maçta', fmtN(M.live_now), `${fmtN(M.searching_now)} kişi rakip arıyor`)}
      ${tile('Hesaplı / cihazlı', `${fmtN(P.accounts)} / ${fmtN(P.devices)}`, 'CrazyGames hesabı / cihaz kimliği')}
      ${X.shadows ? `<div data-testid="rk-shadow-tile">${tile('Gölge maç (bugün)', fmtN(M.shadows_today), `7 günde ${fmtN(M.shadows_7d)} · şu an ${fmtN(M.shadows_live)} · insan maçlarına sayılmaz`)}</div>` : ''}
    </div>`;
  el.innerHTML = head + '<div class="note" data-testid="rk-old-note">Bu, sınırlı eski görünüm (ilk 100 oyuncu, son 30 maç, son 48 saat). Bütün sezonu, bütün oyuncuları ve bütün maçları görmek için sunucuya <code>games/06-shadow-duel/supabase/ranked-panel-season.sql</code> kurulmalı.</div>' + season + `<section class="block" style="margin-top:12px">${tiles}</section>`
    + (empty ? '<div class="note" data-testid="rk-empty">Bu sezon henüz kimse dereceli oynamadı. Biri kuyruğa girince sayılar burada görünür.</div>' : `
    <div class="grid rk-two">
      <article class="card"><h3>Kademeler</h3><div data-testid="rk-tiers">${rkTiers(X.tiers || [])}</div>
        <p class="small muted">Yalnız yerleştirmesini bitirenler (oyunda kademe rozeti görünenler). Yerleştirmede: <b>${fmtN(P.placement)}</b> kişi. Yasaklılar sayılmaz.</p></article>
      <article class="card"><h3>Son 48 saat</h3><div data-testid="rk-hourly">${columnChart((M.hourly || []).map((h) => ({ label: fmtDate(h.h, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }), v: h.n })), { label: 'maç', head: 'Saat', every: 4 })}</div>
        <p class="small muted">Saat başına oynanan maç (dövüşe geçen, puanlı ya da puansız).</p></article>
    </div>
    <section class="block" style="margin-top:20px">
      <div class="bar-head"><h2>Oyuncular</h2><span class="muted small">puana göre ilk 100 · bu sezon en az bir puanlı maç · yazdıkça liste süzülür, <b>Ara</b> herkeste arar</span></div>
      <form class="row rk-search" id="rkSearchForm" role="search">
        <input type="search" id="rkSearch" name="q" maxlength="32" placeholder="Ad ara" value="${esc(state.rankedQ)}" aria-label="Oyuncu adı">
        <button class="btn" type="submit">Ara</button></form>
      <div id="rkFound">${rkFoundHtml()}</div>
      <div class="card" style="margin-top:8px"><div class="scroll-x" id="rkBoard">${rkBoard(X.board || [])}</div></div>
    </section>
    <section class="block">
      <h2>Maçlar</h2>
      <div class="card" style="margin-top:12px">
        <div class="tiles">${tile('Anlaşmazlık (7 gün)', fmtN(M.d7?.mismatch), 'raporlar ya da girdiler tutmadı')}${tile('Senkron bozulması', fmtN(M.d7?.desync), 'iki cihaz farklı hesapladı')}${tile('Denetim bekleyen', fmtN(M.open_disputes), 'durumu "anlaşmazlık" olan maç')}${tile('Reddedilen', fmtN(M.d7?.declined), 'kabul edilmeyen eşleşme')}${tile('Bağlanamayan', fmtN(M.d7?.no_connection), 'iki cihaz bağlanamadı')}${tile('Sayılmayan', fmtN(M.d7?.not_counted), 'puan değişmedi')}</div>
        ${(X.problems || []).length ? `<div class="sub-h">Sorunlu maçlar</div><div class="scroll-x">${rkMatches(X.problems, 'rk-problems')}</div>` : ''}
        ${rkShadows(X.shadows)}
        <div class="sub-h">Son maçlar</div><div class="scroll-x">${rkMatches((X.recent || []).slice(0, 10), 'rk-recent')}</div>
        ${(X.recent || []).length > 10 ? `<details class="table"><summary>Son ${fmtN(X.recent.length)} maçın hepsi</summary><div class="scroll-x">${rkMatches(X.recent.slice(10), 'rk-recent-more')}</div></details>` : ''}
      </div>
    </section>`)
    + `<section class="block"><h2>Geçmiş sezonlar</h2><div class="card scroll-x" style="margin-top:12px">
      <table data-testid="rk-past"><thead><tr><th>Sezon</th><th>Tarih</th><th>Şampiyon</th><th class="n">Sıralamada</th><th class="n">Oynayan</th></tr></thead>
      <tbody>${(X.past || []).map((p) => `<tr><td>${esc(p.id)}</td><td>${esc(fmtDate(p.starts_at, { day: 'numeric', month: 'short' }))} – ${esc(fmtDate(p.closed_at || p.ends_at, { day: 'numeric', month: 'short' }))}</td>
        <td>${p.champion_nick ? (p.champion_id ? `<button type="button" class="linkish" data-act="rk-player" data-id="${esc(p.champion_id)}">${esc(p.champion_nick)}</button>` : esc(p.champion_nick)) : `<span class="muted">yok${p.players != null && p.players < (st.min_players || 8) ? ` (en az ${fmtN(st.min_players || 8)} kişi gerekir)` : ''}</span>`}</td>
        <td class="n">${fmtN(p.players)}</td><td class="n">${fmtN(p.engraved)}</td></tr>`).join('') || '<tr><td colspan="5" class="muted">Henüz biten sezon yok.</td></tr>'}</tbody></table></div></section>`;
  const f = $('#rkSearchForm');
  if (f) {
    f.q.oninput = () => { state.rankedQ = f.q.value; $('#rkBoard').innerHTML = rkBoard(X.board || []); };
    f.onsubmit = (ev) => { ev.preventDefault(); rkSearch(f.q.value); };
  }
}
// the shadow opponents' block of the ranked section (ranked-ghost.sql nd_admin_ranked_ghosts; absent until it is installed)
function rkShadows(G) {
  if (!G) return '';
  const D = G.d7 || {}, T = G.today || {}, P = G.profiles || {};
  const top = (G.top_winners || []).filter((w) => w.wins > 0);
  return `<div class="sub-h">Gölge rakip ${G.enabled ? '' : '<span class="badge del">kapalı</span>'}</div><div data-testid="rk-shadows">
    <div class="tiles">${tile('Gölge maç (7 gün)', fmtN(D.played), `${fmtN(D.rated)} puanlı · ${fmtN(D.players)} oyuncu · bugün ${fmtN(T.played)}`)}<div data-testid="rk-shadow-kinds">${tile('Gerçek / dojo gölgesi', `${fmtN(D.real)} / ${fmtN(D.house)}`, 'gerçek oyuncu tarzı / oyunun kendi tarzı (7 gün)')}</div>${tile('Galibiyet / yenilgi', `${fmtN(D.wins)} / ${fmtN(D.losses)}`, `${fmtN(D.left)} çıkma · ${fmtN(D.not_counted)} sayılmadı`)}
      ${tile('Kullanılabilir profil', fmtN(P.usable), `${fmtN(P.started)} oyuncunun tarzı ölçüldü`)}${tile('Gölgelerden kazanılan', fmtN(D.points_won), 'puan, 7 günde')}</div>
    ${top.length ? `<div class="scroll-x"><table data-testid="rk-shadow-winners"><thead><tr><th>En çok gölge yenen (7 gün)</th><th class="n">G</th><th class="n">M</th><th class="n">Puan</th></tr></thead>
      <tbody>${top.map((w) => `<tr><td><button type="button" class="linkish" data-act="rk-player" data-id="${esc(w.player_id)}">${esc(w.nick)}</button></td><td class="n">${fmtN(w.wins)}</td><td class="n">${fmtN(w.losses)}</td><td class="n num">${signed(w.points)}</td></tr>`).join('')}</tbody></table></div>` : ''}
    <p class="small muted">Gölge: kimse bulunamayınca gerçek bir oyuncunun tarzında dövüşen, oyunda yapay zekâ olarak işaretli bilgisayar; gerçek maç gibi sayılır, sonucu yalnız oyuncunun cihazı bildirir. Şüpheli sonuçlar ve ayarlar "Gölge rakip" bölümünde.</p></div>`;
}
const rewardNames = (ids) => (ids || []).map((id) => { const w = (state.rewards || []).find((x) => x.id === id); return w ? rname(w) : id; }).join(', ') || 'yok';
function rkTiers(tiers) {
  const L = [0, 1, 2, 3, 4, 5].map((l) => {
    const steps = tiers.filter((t) => (l === 5 ? t.tier === 15 : t.tier >= 3 * l && t.tier < 3 * l + 3));
    const n = steps.reduce((a, t) => a + t.players, 0);
    const base = V.tierLabel(l === 5 ? 15 : 3 * l);
    const parts = l === 5 ? '' : ' · ' + steps.slice().reverse().map((t) => `${t.name.split(' ').pop()} ${fmtN(t.players)}`).join(', ');
    return { label: `${base.kanji} ${base.name.split(' ')[0]} — ${V.RANK_LEAGUE_TR[l]}`, value: n, text: fmtN(n) + parts };
  }).reverse();
  return barList(L, { max: Math.max(1, ...L.map((x) => x.value)) }) + `<details class="table"><summary>Basamak basamak</summary><div class="scroll-x"><table><thead><tr><th>Kademe</th><th class="n">Oyuncu</th></tr></thead>
    <tbody>${tiers.slice().reverse().map((t) => `<tr><td>${tierTag(t)}</td><td class="n">${fmtN(t.players)}</td></tr>`).join('')}</tbody></table></div></details>`;
}
function rkBoard(board) {
  const q = state.rankedQ.trim().toLocaleLowerCase('tr');
  const hit = q ? board.filter((r) => String(r.nick).toLocaleLowerCase('tr').includes(q)) : board;
  // the first 25 unless the owner asks for all (or searches)
  const rows = q || state.rkAll ? hit : hit.slice(0, 25);
  if (!board.length) return '<p class="muted small" style="margin:0">Bu sezon henüz puanlı maç oynayan yok.</p>';
  return `<table class="wide rk-board" data-testid="rk-board"><thead><tr><th class="n">#</th><th>Oyuncu</th><th>Kademe</th><th class="n">Puan</th><th class="n">Maç</th><th class="n">G – M</th><th>Son maç</th></tr></thead>
    <tbody>${rows.map((r) => `<tr data-player="${esc(r.player_id)}"><td class="n">${fmtN(r.rank)}</td>
      <td><button type="button" class="linkish" data-act="rk-player" data-id="${esc(r.player_id)}">${esc(r.nick)}</button>
        <div class="small muted">${r.place ? `sıralamada ${fmtN(r.place)}.` : r.placement > 0 ? `yerleştirme: ${fmtN(r.placement)} maç kaldı` : 'sıralama dışı'}${r.banned ? ' · <span class="badge del">yasaklı</span>' : ''}${r.suspended ? ' · <span class="badge del">askıda</span>' : ''}</div></td>
      <td>${r.placement > 0 ? '<span class="muted">Yerleştirme</span>' : tierTag(r)}</td><td class="n">${fmtN(r.rating)}</td><td class="n">${fmtN(r.games)}</td>
      <td class="n">${fmtN(r.wins)} – ${fmtN(r.losses)}</td><td class="small">${r.last_at ? esc(fmtDateTime(r.last_at)) : '—'}</td></tr>`).join('')
      || `<tr><td colspan="7" class="muted">İlk 100'de "${esc(state.rankedQ.trim())}" yok. Herkeste aramak için Ara'ya bas.</td></tr>`}</tbody></table>`
    + (rows.length < hit.length ? `<p style="margin:8px 0 0"><button class="btn" type="button" data-act="rk-all">Hepsini göster (${fmtN(hit.length)})</button></p>` : '');
}
function rkMatches(list, testid) {
  if (!list.length) return '<p class="muted small" style="margin:6px 0 0">Henüz maç yok.</p>';
  const who = (x, won) => `${x.guest ? `<span class="muted">${esc(x.nick || 'misafir')}</span>` : `<button type="button" class="linkish" data-act="rk-player" data-id="${esc(x.player_id)}">${esc(x.nick || '#' + x.player_id)}</button>`}${won ? ' <span class="badge on">kazandı</span>' : ''}`;
  return `<table class="wide" data-testid="${testid}"><thead><tr><th>Zaman</th><th>Maç</th><th class="n">Puan</th><th>Durum</th></tr></thead>
    <tbody>${list.map((m) => `<tr data-match="${esc(m.id)}"><td class="small">${esc(fmtDateTime(m.created_at))}</td>
      <td>${who(m.p[0], m.winner === 0)} <span class="muted">vs</span> ${who(m.p[1], m.winner === 1)}${m.winner === -1 ? ' <span class="badge">berabere</span>' : ''}
        <div class="small muted">${esc(ninjaName(m.p[0].pick))} – ${esc(ninjaName(m.p[1].pick))}</div></td>
      <td class="n num">${m.rated ? `${signed(m.p[0].delta)} / ${signed(m.p[1].delta)}` : '—'}</td><td class="small">${rkStatus(m)}</td></tr>`).join('')}</tbody></table>`;
}
function rkFoundHtml() {
  if (state.rkFoundErr) return `<p class="errors" data-testid="rk-found-error">${esc(state.rkFoundErr)}</p>`;
  const F = state.rkFound;
  if (!F) return '';
  if (!F.found.length) return `<p class="note" data-testid="rk-found">"${esc(F.query)}" adında oyuncu yok.</p>`;
  return `<div class="card rk-found" data-testid="rk-found"><div class="small muted">"${esc(F.query)}" için ${fmtN(F.found.length)} sonuç${F.found.length >= 20 ? ' (ilk 20)' : ''}:</div>
    <div class="chips" style="margin-top:6px">${F.found.map((c) => `<button type="button" data-act="rk-player" data-id="${esc(c.player_id)}">${esc(c.nick)} <span class="muted">${c.in_season ? `${esc(c.name || '')} · ${fmtN(c.rating)}` : 'bu sezon yok'}</span></button>`).join('')}</div></div>`;
}
async function rkSearch(q) {
  const c = V.checkRankedQuery(q);
  state.rkFoundErr = c.ok ? '' : c.errors[0].msg;
  state.rkFound = null;
  if (c.ok) {
    try { state.rkFound = await rpc('nd_admin_ranked_player', { p_nick: c.value }); } catch (e) { state.rkFoundErr = friendly(e); }
  }
  const box = $('#rkFound');
  if (box) box.innerHTML = rkFoundHtml();
  if (state.rkFound && state.rkFound.found.length === 1) openRankedPlayer(state.rkFound.found[0].player_id);
}
/** The earlier player drawer (before ranked-panel-season.sql): this season's row, profile, strikes, rewards, past seasons and the last 20 matches. */
async function openRankedPlayerOld(id) {
  const d = $('#dlg');
  d.classList.add('drawer');
  d.addEventListener('close', () => d.classList.remove('drawer'), { once: true });
  const frame = (title, body) => `<div class="d-head"><h2 id="dlgTitle">${title}</h2><button class="ghost x" type="button" data-act="dlg-close" aria-label="Kapat">✕</button></div><div class="d-body">${body}</div>`;
  d.innerHTML = frame('Oyuncu', '<p class="muted">Yükleniyor…</p>');
  if (!d.open) d.showModal();
  let r;
  try { r = await rpc('nd_admin_ranked_player', { p_player_id: Number(id) }); } catch (e) { d.innerHTML = frame('Oyuncu', `<div class="warn-box">${esc(friendly(e))}</div>`); return; }
  const p = r && r.player;
  if (!p) { d.innerHTML = frame('Oyuncu', '<p class="muted">Oyuncu bulunamadı.</p>'); return; }
  const S = p.season, pr = p.profile, k = p.strikes_7d || {};
  const peak = S && S.peak_tier != null ? V.tierLabel(S.peak_tier) : null;
  const ninjas = S ? Object.entries(S.ninjas || {}).sort((a, b) => b[1] - a[1]) : [];
  const res = (m) => (m.winner == null ? '—' : m.winner === -1 ? 'Berabere' : m.winner === m.side ? '<b>Kazandı</b>' : 'Kaybetti');
  d.innerHTML = frame(esc(p.nick), `<div data-testid="rk-player" data-player="${esc(p.player_id)}">
    <div class="row" style="margin-bottom:8px">${S ? (S.placement > 0 ? `<span class="badge">Yerleştirme: ${fmtN(S.placement)} maç kaldı</span>` : tierTag(S)) : '<span class="badge">Bu sezon dereceli oynamadı</span>'}
      <span class="badge">${p.account ? 'CrazyGames hesabı' : 'Cihaz kimliği'}</span>${p.banned ? '<span class="badge del">yasaklı</span>' : ''}${pr && pr.suspended_at ? `<span class="badge del">askıda (${esc(fmtDate(pr.suspended_at))})</span>` : ''}</div>
    <p class="small muted" style="margin:0 0 8px">Oyuncu no ${esc(p.player_id)}${p.country ? ` · ${esc(regionName(p.country))}` : ''} · ilk kayıt ${esc(fmtDate(p.created_at, { day: 'numeric', month: 'long', year: 'numeric' }))}</p>
    ${S ? `<div class="tiles">${tile('Puan', fmtN(S.rating), `belirsizlik ±${fmtN(S.rd)}`)}${tile('Sıralama yeri', S.place ? `${fmtN(S.place)}.` : '—', S.place ? 'oyundaki sıralama' : S.placement > 0 ? 'yerleştirme bitmedi' : `en az ${fmtN(state.ranked?.settings?.board_games ?? 10)} maç ve düşük belirsizlik gerekir`)}
      ${tile('Puanlı maç', fmtN(S.games), `${fmtN(S.wins)} G · ${fmtN(S.losses)} M · ${fmtN(S.draws)} B`)}${tile('Sayılmayan', fmtN(S.nc))}
      ${tile('En yüksek', peak ? peak.name : '—', S.peak_rating ? `${fmtN(S.peak_rating)} puan` : '')}${tile('Son puanlı maç', S.last_at ? fmtDate(S.last_at, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—')}</div>` : ''}
    <div class="sub-h">Son maçlar</div>
    ${(p.matches || []).length ? `<div class="scroll-x"><table data-testid="rk-player-matches"><thead><tr><th>Zaman</th><th>Rakip</th><th>Sonuç</th><th class="n">Puan</th><th>Durum</th></tr></thead>
      <tbody>${p.matches.map((m) => { const me = m.p[m.side], op = m.p[1 - m.side]; return `<tr><td class="small">${esc(fmtDateTime(m.created_at))}</td>
        <td>${op.guest ? `<span class="muted">${esc(op.nick || 'misafir')}</span>` : esc(op.nick || '#' + op.player_id)}<div class="small muted">${esc(ninjaName(me.pick))} – ${esc(ninjaName(op.pick))}</div></td>
        <td>${res(m)}</td><td class="n num">${m.rated ? signed(me.delta) : '—'}</td><td class="small">${rkStatus(m)}</td></tr>`; }).join('')}</tbody></table></div>` : '<p class="muted small">Maç yok.</p>'}
    ${ninjas.length ? `<div class="sub-h">Dövüşçüler (bu sezon puanlı maç)</div>${barList(ninjas.map(([n, c]) => ({ label: ninjaName(n), value: c, text: fmtN(c) })))}` : ''}
    ${p.shadows ? `<div class="sub-h">Gölge rakip (son 7 gün)</div><p class="small" style="margin:6px 0 0" data-testid="rk-player-shadows">Oynadığı gölge maçı <b>${fmtN(p.shadows.d7 && p.shadows.d7.played)}</b> · ${fmtN(p.shadows.d7 && p.shadows.d7.wins)} G / ${fmtN(p.shadows.d7 && p.shadows.d7.losses)} M · ${fmtN(p.shadows.d7 && p.shadows.d7.not_counted)} sayılmadı · puan ${signed((p.shadows.d7 && p.shadows.d7.points) || 0)}
      <br>Tarzı ${p.shadows.profile && p.shadows.profile.fights ? `${fmtN(p.shadows.profile.fights)} maçtan ölçüldü` : 'henüz ölçülmedi'} · başkalarına gölge oldu: <b>${fmtN(p.shadows.used_as_shadow_7d)}</b></p>` : ''}
    <div class="sub-h">İşaretler (son 7 gün)</div>
    <p class="small" style="margin:6px 0 0">Ret / süre kaçırma <b>${fmtN(k.decline)}</b> · maçtan çıkma <b>${fmtN(k.left)}</b> · anlaşmazlık <b>${fmtN(k.dispute)}</b> · sessizce kaybolma <b>${fmtN(k.silent)}</b>
      <span class="muted">(farklı rakiplerle 7 günde 3 anlaşmazlık dereceliyi askıya alır)</span></p>
    ${pr ? `<p class="small muted" style="margin:6px 0 0">Açtığı dövüşçü: ${fmtN((pr.unlocked || []).length)} · son seçtiği: ${esc(ninjaName(pr.last_ninja))}${pr.title_id ? ` · taktığı unvan: ${esc(rewardNames([pr.title_id]))}` : ''}</p>` : ''}
    <div class="sub-h">Ödüller</div>
    <p class="small" style="margin:6px 0 0">${(p.owned || []).length ? p.owned.map((o) => `${esc(rewardNames([o.reward_id]))}${o.source ? ` <span class="muted">(${esc(o.source.replace(/^season:/, 'sezon '))})</span>` : ''}`).join(', ') : '<span class="muted">yok</span>'}</p>
    ${(p.finals || []).length ? `<div class="sub-h">Geçmiş sezonlar</div><ul class="small" style="margin:6px 0 0;padding-left:18px">${p.finals.map((f) => `<li>Sezon ${esc(f.season)}: ${f.place ? `<b>${fmtN(f.place)}.</b>` : 'sıralama dışı'} · ${tierTag(f)} · ${fmtN(f.rating)} puan · ${fmtN(f.games)} maç</li>`).join('')}</ul>` : ''}
  </div>`);
}

// ---------------------------------------------------------------- ranked: the whole season (games/06-shadow-duel/supabase/ranked-panel-season.sql)
// One tab per season (newest first, the open one marked live). Inside the open season's tab a period picker: the whole season
// (the default), the last 7 days, the last 48 hours or two dates. The numbers, the activity chart, the fighters and the match
// list follow the tab and the period; the player list is the whole season's (every player, page by page, sortable). Nothing
// is cut at "the first 100" or "the last 30". Before that file is on the server the earlier overview (ranked-panel.sql, with
// its limits) is shown, with a note.
const RK_PAGE = 100, RK_MPAGE = 50, RK_DPAGE = 25;
const RK_PERIODS = [['season', 'Bütün sezon'], ['7d', 'Son 7 gün'], ['48h', 'Son 48 saat'], ['range', 'Tarih aralığı']];
const RK_FILTERS = [['all', 'Hepsi'], ['played', 'Puanlı maç oynayan'], ['board', 'Sıralamada'], ['placement', 'Yerleştirmede']];
const RK_WHAT = [['all', 'Hepsi (reddedilen ve bağlanamayan dahil)'], ['played', 'Dövüşe geçen'], ['rated', 'Puanlı'], ['unrated', 'Dövüşe geçti, puansız'], ['problems', 'Sorunlu']];
const RK_KIND = [['all', 'Hepsi'], ['human', 'Oyuncuya karşı'], ['ghost', 'Gölgeye karşı']];
const RK_G_STATUS = { offer: 'Öneri', live: 'Sürüyor', done: 'Bitti', void: 'Sayılmadı', expired: 'Öneri süresi doldu', declined: 'Oyuncu vazgeçti' };
const RK_G_VERDICT = { ok: 'normal bitti', left: 'oyuncu çıktı', abandoned: 'sonuç gelmedi, yenilgi sayıldı', too_short: 'çok kısa sürdü', bad_result: 'sonuç tutarsız' };
const RK_G_WHY = { too_short: 'çok kısa sürdü', bad_result: 'sonuç tutarsız', flagged: 'oyuncu işaretli', weight_zero: 'gölge puansız ayarlı' };
const arenaName = (id) => ARENAS.find((a) => a.id === id)?.name || id || '—';
const rkS = () => state.rk;
const rkIsoDay = (d) => istDay(Date.parse(d));
const rkPct = (x) => (x == null ? '—' : `%${Math.round(100 * x)}`);

function rkPeriodArgs() {
  const R = rkS();
  if (R.closed) return {};
  if (R.period === '7d') return { p_from: new Date(Date.now() - 7 * 864e5).toISOString() };
  if (R.period === '48h') return { p_from: new Date(Date.now() - 48 * 36e5).toISOString() };
  if (R.period === 'range' && R.from && R.to) return { p_from: `${R.from}T00:00:00+03:00`, p_to: `${addDay(R.to, 1)}T00:00:00+03:00` };
  return {};
}
const rkPlArgs = () => { const R = rkS(); return { p_season: R.season, p_sort: R.pl.sort, p_desc: R.pl.desc, p_filter: R.pl.filter, p_q: R.pl.q || null, p_offset: R.pl.off, p_limit: RK_PAGE }; };
const rkMtArgs = () => { const R = rkS(); return { p_season: R.season, ...rkPeriodArgs(), p_player: R.mt.player, p_kind: R.mt.kind, p_what: R.mt.what, p_offset: R.mt.off, p_limit: RK_MPAGE }; };

async function loadRanked() {
  if (state.rkOld) return loadRankedOld();
  const R = rkS();
  try {
    const [v, pl, mt] = await Promise.all([rpc('nd_admin_rk_season', { p_season: R.season, ...rkPeriodArgs() }), rpc('nd_admin_rk_players', rkPlArgs()), rpc('nd_admin_rk_matches', rkMtArgs())]);
    R.view = v; R.pl.data = pl; R.mt.data = mt; R.err = null; R.at = Date.now(); R.pl.err = null; R.mt.err = null;
    if (v && v.season) { R.closed = !!v.season.closed; }
  } catch (e) {
    // the season file is not on the server yet: the earlier overview
    if (e.missing) { state.rkOld = true; return loadRankedOld(); }
    R.err = e;
  }
  // reward names (the season's champion reward, the players' rewards); the catalog may not be installed: ids then
  if (!R.err && !state.rewards && !state.rewardsErr) { try { state.rewards = await rpc('nd_admin_rewards'); } catch (e) { state.rewardsErr = e; } }
  if (onPane('ranked', 'shadow-duel')) paintRanked();
}
async function rkReloadPart(which) {
  const R = rkS(), part = which === 'pl' ? R.pl : R.mt;
  const box = $(which === 'pl' ? '#rkPlayers' : '#rkMatches');
  if (box) box.classList.add('stale');
  try { part.data = await rpc(which === 'pl' ? 'nd_admin_rk_players' : 'nd_admin_rk_matches', which === 'pl' ? rkPlArgs() : rkMtArgs()); part.err = null; } catch (e) { part.err = e; }
  const b2 = $(which === 'pl' ? '#rkPlayers' : '#rkMatches');
  if (b2) { b2.classList.remove('stale'); b2.innerHTML = which === 'pl' ? rkPlayersBody() : rkMatchesBody(); }
}

function paintRanked() {
  const el = $('#pane');
  if (!el) return;
  if (state.rkOld) return paintRankedOld();
  const R = rkS();
  if (R.err) { el.innerHTML = `<div class="warn-box" data-testid="rk-error">${esc(friendly(R.err))}</div>`; return; }
  if (!R.view) { el.innerHTML = '<p class="muted">Yükleniyor…</p>'; loadRanked(); return; }
  const X = R.view, s = X.season, st = X.settings || {};
  const head = `<div class="bar-head"><h2>Dereceli</h2><span class="muted small">Shadow Duel · sıralamalı düello</span>
    <span class="muted small right">${esc(fmtDateTime(R.at))} itibarıyla</span><button class="btn" type="button" data-act="rk-refresh">Yenile</button></div>`;
  if (!s) { el.innerHTML = head + '<div class="note" data-testid="rk-empty">Henüz sezon yok. İlk dereceli maçla birlikte açılır.</div>'; return; }
  const tabs = `<div class="an-tabs rk-tabs" role="tablist" aria-label="Sezonlar" data-testid="rk-tabs">${(X.seasons || []).map((x) => `<button type="button" role="tab" data-act="rk-season" data-id="${esc(x.id)}" aria-selected="${x.id === s.id}">Sezon ${esc(x.id)}${x.closed ? '' : ' <span class="badge on">canlı</span>'}</button>`).join('')}</div>`;
  const status = s.closed ? '<span class="badge">bitti</span>' : s.over ? '<span class="badge del">süresi doldu · ilk kuyruk isteğinde kapanır</span>' : '<span class="badge on">canlı</span>';
  const hero = s.closed
    ? `<span class="v rk-champ">${esc(s.champion_nick || '—')}</span><span class="l">şampiyon · <b>Sezon ${esc(s.id)}</b> ${status}</span>`
    : `<span class="v num" data-testid="rk-days-left">${fmtN(s.days_left)}</span><span class="l">gün kaldı · <b>Sezon ${esc(s.id)}</b> ${status}${X.enabled ? '' : ' <span class="badge del">dereceli kapalı (rank_enabled = 0)</span>'}</span>`;
  const season = `<article class="card rk-season" data-testid="rk-season"><div class="hero">${hero}</div>
      <p class="small muted" style="margin:6px 0 0">${esc(fmtDate(s.starts_at, { day: 'numeric', month: 'long', year: 'numeric' }))} – ${esc(fmtDate(s.closed_at || s.ends_at, { day: 'numeric', month: 'long', year: 'numeric' }))} · sezon ${fmtN(st.season_days)} gün · şampiyon ödülü: ${esc(rewardNames(s.reward_ids))}</p></article>`;
  const empty = !X.players?.total && !X.matches?.found && !X.shadows?.offered && X.period?.whole;
  el.innerHTML = head + tabs + season + (s.closed ? '' : rkPeriodHtml(X))
    + `<section class="block" style="margin-top:12px">${rkTilesHtml(X)}</section>`
    + (empty ? '<div class="note" data-testid="rk-empty">Bu sezon henüz kimse dereceli oynamadı. Biri kuyruğa girince sayılar burada görünür.</div>' : `
    ${s.closed ? rkFinalHtml(X) : ''}
    <div class="grid rk-two">
      <article class="card"><h3>Etkinlik</h3><div data-testid="rk-activity">${rkActivityHtml(X)}</div>
        <p class="small muted">${X.period.bucket === 'hour' ? 'Saat' : 'Gün (Türkiye saati)'} başına dövüşe geçen maç: oyuncuya karşı ve gölgeye karşı.</p></article>
      <article class="card"><h3>Kademeler</h3><div data-testid="rk-tiers">${rkTiers(X.tiers || [])}</div>
        <p class="small muted">${s.closed ? 'Sezon kapandığındaki kademeler.' : 'Şu anki kademeler.'} Yalnız yerleştirmesini bitirenler; yerleştirmede <b>${fmtN(X.players?.placement)}</b> kişi. Yasaklılar sayılmaz.</p></article>
    </div>
    <section class="block" style="margin-top:20px"><div class="bar-head"><h2>Dövüşçüler</h2><span class="muted small">${esc(rkShownWord(X))} · dövüşe geçen her maçta iki tarafın seçtiği (gölge maçında oyuncunun)</span></div>
      <div class="card" style="margin-top:8px" data-testid="rk-ninjas">${rkNinjasHtml(X)}</div></section>
    <section class="block"><div class="bar-head"><h2>Oyuncular</h2><span class="muted small">sezonun bütün oyuncuları · başlığa dokununca sıralanır</span></div>
      <div id="rkPlayers">${rkPlayersBody()}</div></section>
    <section class="block"><div class="bar-head"><h2>Maçlar</h2><span class="muted small">${esc(rkShownWord(X))} · oyuncuya ve gölgeye karşı bütün maçlar, en yenisi üstte</span></div>
      ${rkProblemsHtml(X)}
      <div id="rkMatches">${rkMatchesBody()}</div></section>`);
  const rf = $('#rkRange');
  if (rf) rf.onsubmit = (ev) => { ev.preventDefault(); rkSetRange(rf.from.value, rf.to.value); };
}
// words for the period shown
function rkShownWord(X) {
  const P = X.period || {}, R = rkS();
  if (P.whole) return X.season.closed ? 'bütün sezon' : 'bütün sezon (bugüne kadar)';
  return R.period === '7d' ? 'son 7 gün' : R.period === '48h' ? 'son 48 saat' : `${fmtDate(P.from, { day: 'numeric', month: 'short' })} – ${fmtDate(Date.parse(P.to) - 1, { day: 'numeric', month: 'short' })}`;
}
function rkPeriodHtml(X) {
  const R = rkS(), P = X.period || {};
  const f = (d) => (P.bucket === 'hour' ? fmtDateTime(d) : fmtDate(d, { day: 'numeric', month: 'long', year: 'numeric' }));
  const today = istDay(), first = rkIsoDay(X.season.starts_at);
  return `<div class="card rk-period" data-testid="rk-period" style="margin-top:12px">
    <div class="seg" role="group" aria-label="Dönem">${RK_PERIODS.map(([k, t]) => `<button type="button" data-act="rk-period" data-p="${k}" aria-pressed="${R.period === k}">${t}</button>`).join('')}</div>
    ${R.period === 'range' ? `<form class="row rk-range" id="rkRange" data-testid="rk-range"><label>Başlangıç <input type="date" name="from" value="${esc(R.from || first)}" min="${esc(first)}" max="${esc(today)}" required></label>
      <label>Bitiş <input type="date" name="to" value="${esc(R.to || today)}" min="${esc(first)}" max="${esc(today)}" required></label><button class="btn" type="submit">Göster</button></form>` : ''}
    ${R.rangeErr ? `<p class="errors" data-testid="rk-range-error">${esc(R.rangeErr)}</p>` : ''}
    <p class="small muted" style="margin:8px 0 0" data-testid="rk-period-shown">Gösterilen: <b>${esc(f(P.from))} – ${esc(P.whole ? 'şimdi' : f(Date.parse(P.to) - 1))}</b>${P.whole ? ' (bütün sezon)' : ''}. Oyuncu listesi her zaman bütün sezonun.</p></div>`;
}
function rkTilesHtml(X) {
  const P = X.players || {}, A = X.active || {}, M = X.matches || {}, G = X.shadows || {}, L = X.live, st = X.settings || {}, F = X.final;
  return `<div class="tiles" data-testid="rk-tiles">
    ${tile('Oynanan maç', fmtN(M.played), `oyuncuya karşı · ${fmtN(M.rated)} puanlı · ${fmtN(M.found)} eşleşme`)}
    ${tile('Gölge maçı', fmtN(G.played), `${fmtN(G.rated)} puanlı · ${fmtN(G.wins)} G / ${fmtN(G.losses)} M`)}
    ${tile('Rakip bulunarak / gölgeyle', `${fmtN(M.played)} / ${fmtN(G.played)}`, 'eşleşmeyle bulunan / yapay zekâ gölge')}
    ${tile('Oynayan oyuncu', fmtN(A.players), `${fmtN(A.registered)} kayıtlı · ${fmtN(A.guests)} misafir`)}
    ${tile('Yeni dereceli oyuncu', fmtN(P.new), `${fmtN(P.new_first_ever)} kişi ilk kez dereceli`)}
    ${tile('Sezonda derecelide', fmtN(P.total), `${fmtN(P.placement)} yerleştirmede · ${fmtN(P.placed)} yerleşmiş`)}
    ${F ? tile('Sıralamaya giren', fmtN(F.board), `sezon sonunda · ${fmtN(F.engraved)} kişi oynadı`) : tile('Sıralamada', fmtN(P.on_board), `en az ${fmtN(st.board_games)} puanlı maç`)}
    ${tile('Kuyrukta bekleme', M.wait && M.wait.n ? fmtDur(M.wait.avg_s) : '—', M.wait && M.wait.n ? `ortalama · ortanca ${fmtDur(M.wait.p50_s)}` : 'eşleşme yok')}
    ${tile('Ortalama dövüş', M.avg_fight_s ? fmtDur(M.avg_fight_s) : '—', 'biten maçlarda, seçimden sonuca')}
    ${L ? tile('Şu an maçta', fmtN(L.live_now), `${fmtN(L.searching_now)} kişi rakip arıyor · ${fmtN(L.shadows_live)} gölge maçı sürüyor`) : ''}
    ${tile('Hesaplı / cihazlı', `${fmtN(P.accounts)} / ${fmtN(P.devices)}`, 'CrazyGames hesabı / cihaz kimliği')}
  </div>`;
}
function rkActivityHtml(X) {
  const hour = X.period.bucket === 'hour';
  const pts = (X.activity || []).map((p) => ({ label: hour ? fmtDate(p.at, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : dayLabel(p.at), a: p.played, b: p.shadows }));
  if (!pts.length) return '<p class="muted small">Bu dönemde maç yok.</p>';
  return stackChart(pts, { la: 'oyuncuya karşı', lb: 'gölgeye karşı', head: hour ? 'Saat' : 'Gün' });
}
function rkNinjasHtml(X) {
  const L = X.ninjas || [];
  if (!L.length) return '<p class="muted small" style="margin:0">Bu dönemde dövüşe geçen maç yok.</p>';
  const max = Math.max(1, ...L.map((n) => n.n));
  const G = (X.shadow_ninjas || []).slice(0, 6);
  return `<div class="scroll-x"><table class="wide rk-nin"><thead><tr><th>Dövüşçü</th><th class="n">Seçilme</th><th class="rk-barcell"></th><th class="n">Oyuncu</th><th class="n">G – M – B</th><th class="n">Kazanma</th></tr></thead>
    <tbody>${L.map((n) => `<tr data-ninja="${esc(n.ninja)}"><td><b>${esc(ninjaName(n.ninja))}</b></td><td class="n">${fmtN(n.n)}<div class="small muted">${fmtN(n.human)} oyuncuya · ${fmtN(n.ghost)} gölgeye</div></td>
      <td class="rk-barcell"><span class="track"><span class="fill" style="width:${Math.max(1, (100 * n.n) / max).toFixed(1)}%"></span></span></td>
      <td class="n">${fmtN(n.players)}</td><td class="n">${fmtN(n.w)} – ${fmtN(n.l)} – ${fmtN(n.d)}</td><td class="n num">${rkPct(n.win_rate)}</td></tr>`).join('')}</tbody></table></div>
    <p class="small muted" style="margin:8px 0 0">Kazanma: kazandığı / sonuçlanan maç (sayılmayan ve süren maçlar hariç).${G.length ? ` Gölgelerin (yapay zekâ) dövüşçüleri: ${G.map((g) => `${esc(ninjaName(g.ninja))} ${fmtN(g.n)}`).join(' · ')}.` : ''}</p>`;
}
function rkFinalHtml(X) {
  const F = X.final || {};
  const byPlayer = new Map();
  for (const r of F.rewarded || []) { if (!byPlayer.has(r.player_id)) byPlayer.set(r.player_id, { nick: r.nick, ids: [] }); byPlayer.get(r.player_id).ids.push(r.reward_id); }
  return `<section class="block" style="margin-top:12px"><div class="bar-head"><h2>Sezon sonu</h2><span class="muted small">kapanırken kazınan sıralama ve verilen ödüller</span></div>
    <div class="card" style="margin-top:8px" data-testid="rk-final">
      <p style="margin:0">Şampiyon: ${F.champion_nick ? (F.champion_id ? `<button type="button" class="linkish" data-act="rk-player" data-id="${esc(F.champion_id)}">${esc(F.champion_nick)}</button>` : esc(F.champion_nick)) : `<span class="muted">yok${F.board < (F.min_players || 8) ? ` (sıralamada en az ${fmtN(F.min_players || 8)} kişi gerekir; ${fmtN(F.board)} kişi vardı)` : ''}</span>`}</p>
      <p class="small" style="margin:6px 0 0">Verilen ödüller: ${byPlayer.size ? [...byPlayer].map(([id, x]) => `<button type="button" class="linkish" data-act="rk-player" data-id="${esc(id)}">${esc(x.nick)}</button>: ${esc(rewardNames(x.ids))}`).join(' · ') : '<span class="muted">yok</span>'}</p>
      ${(F.top || []).length ? `<div class="scroll-x" style="margin-top:8px"><table class="wide"><thead><tr><th class="n">Sıra</th><th>Oyuncu</th><th>Kademe</th><th class="n">Puan</th><th class="n">Maç</th></tr></thead>
        <tbody>${F.top.map((t) => `<tr><td class="n">${fmtN(t.place)}.</td><td><button type="button" class="linkish" data-act="rk-player" data-id="${esc(t.player_id)}">${esc(t.nick)}</button></td><td>${tierTag(t)}</td><td class="n">${fmtN(t.rating)}</td><td class="n">${fmtN(t.games)}</td></tr>`).join('')}</tbody></table></div>
        <p class="small muted" style="margin:6px 0 0">İlk 10; bütün son sıralama aşağıda Oyuncular listesinde ("Son sıra" sütunu).</p>` : ''}
    </div></section>`;
}
const rkPager = (total, off, lim, act, id) => (total <= lim && !off ? `<p class="small muted rk-pager" data-testid="${id}">${total ? `${fmtN(total)} satırın hepsi gösteriliyor.` : ''}</p>`
  : `<div class="row rk-pager" data-testid="${id}"><span class="small muted">${fmtN(Math.min(total, off + 1))}–${fmtN(Math.min(total, off + lim))} / ${fmtN(total)}</span>
    <button class="btn" type="button" data-act="${act}" data-off="${Math.max(0, off - lim)}"${off <= 0 ? ' disabled' : ''}>‹ Önceki</button>
    <button class="btn" type="button" data-act="${act}" data-off="${off + lim}"${off + lim >= total ? ' disabled' : ''}>Sonraki ›</button></div>`);
// a player's fighters (rated matches per fighter, the season row): the most played and a short breakdown
function rkNinjaCell(nj) {
  const L = Object.entries(nj || {}).filter(([, c]) => c > 0).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1));
  if (!L.length) return '<span class="muted">—</span>';
  return `<b>${esc(ninjaName(L[0][0]))}</b><div class="small muted">${L.slice(0, 3).map(([n, c]) => `${esc(ninjaName(n))} ${fmtN(c)}`).join(' · ')}${L.length > 3 ? ` · +${L.length - 3}` : ''}</div>`;
}
function rkPlayersBody() {
  const R = rkS(), D = R.pl.data, closed = R.closed;
  if (R.pl.err) return `<div class="warn-box">${esc(friendly(R.pl.err))}</div>`;
  if (!D) return '<p class="muted">Yükleniyor…</p>';
  const C = D.counts || {};
  const cols = [['', '#'], ['nick', 'Oyuncu'], ['tier', 'Kademe'], ['rating', 'Puan', 1], ['games', 'Maç', 1], ['wins', 'G – M – B', 1], ['win_pct', 'Kazanma', 1], ['', 'Dövüşçü'],
    ['last_at', 'Son maç'], closed ? ['final', 'Son sıra', 1] : ['on_board', 'Sıralamada', 1]];
  const th = ([k, t, n]) => (!k ? `<th${n ? ' class="n"' : ''}>${esc(t)}</th>`
    : `<th${n ? ' class="n"' : ''} aria-sort="${R.pl.sort === k ? (R.pl.desc ? 'descending' : 'ascending') : 'none'}"><button type="button" class="sort" data-act="rk-sort" data-k="${k}">${esc(t)}${R.pl.sort === k ? (R.pl.desc ? ' ▼' : ' ▲') : ''}</button></th>`);
  const rows = (D.rows || []).map((r) => `<tr data-player="${esc(r.player_id)}"><td class="n">${fmtN(r.rank)}</td>
      <td><button type="button" class="linkish" data-act="rk-player" data-id="${esc(r.player_id)}">${esc(r.nick)}</button>
        <div class="small muted">${r.account ? 'hesap' : 'cihaz'}${r.banned ? ' · <span class="badge del">yasaklı</span>' : ''}${r.suspended ? ' · <span class="badge del">askıda</span>' : ''}${r.ghost_w + r.ghost_l + r.ghost_d ? ` · gölgeye ${fmtN(r.ghost_w)} G / ${fmtN(r.ghost_l)} M` : ''}</div></td>
      <td>${r.placement > 0 ? `<span class="muted">Yerleştirme (${fmtN(r.placement)} kaldı)</span>` : tierTag(r)}</td><td class="n">${fmtN(r.rating)}</td><td class="n">${fmtN(r.games)}</td>
      <td class="n">${fmtN(r.wins)} – ${fmtN(r.losses)} – ${fmtN(r.draws)}</td><td class="n num">${rkPct(r.win_pct)}</td><td>${rkNinjaCell(r.ninjas)}</td>
      <td class="small">${r.last_at ? esc(fmtDateTime(r.last_at)) : '—'}</td>
      <td class="n">${closed ? (r.final_place ? `<b>${fmtN(r.final_place)}.</b>` : '<span class="muted">sıralama dışı</span>') : r.place ? `<b>${fmtN(r.place)}.</b>` : `<span class="muted">${r.placement > 0 ? 'yerleştirme' : 'dışında'}</span>`}</td></tr>`).join('');
  return `<form class="row rk-search" id="rkPlForm" role="search">
      <input type="search" id="rkSearch" name="q" maxlength="32" placeholder="Ad ara (bütün sezon)" value="${esc(R.pl.q)}" aria-label="Oyuncu adı">
      <select name="f" id="rkFilter" aria-label="Hangi oyuncular">${RK_FILTERS.map(([k, t]) => `<option value="${k}"${R.pl.filter === k ? ' selected' : ''}>${esc(t)} (${fmtN(C[k])})</option>`).join('')}</select>
      <button class="btn" type="submit">Ara</button></form>
    <div class="card" style="margin-top:8px"><div class="scroll-x"><table class="wide rk-board rk-t" data-testid="rk-board"><thead><tr>${cols.map(th).join('')}</tr></thead>
      <tbody>${rows || `<tr><td colspan="${cols.length}" class="muted">${R.pl.q ? `"${esc(R.pl.q)}" adında oyuncu yok.` : 'Bu sezon bu listede oyuncu yok.'}</td></tr>`}</tbody></table></div>
      ${rkPager(D.total, D.offset, D.limit, 'rk-pl-page', 'rk-pl-pager')}</div>`;
}
function rkProblemsHtml(X) {
  const M = X.matches || {}, L = X.live, G = X.shadows || {};
  const why = (M.why_unranked || []).map((w) => `${esc(RK_WHY[w.k] || w.k)} ${fmtN(w.n)}`).join(' · ');
  return `<div class="card" style="margin-top:8px" data-testid="rk-problems-tiles"><div class="tiles">
      ${tile('Anlaşmazlık', fmtN(M.mismatch), 'raporlar ya da girdiler tutmadı')}${tile('Senkron bozulması', fmtN(M.desync), 'iki cihaz farklı hesapladı')}
      ${L ? tile('Denetim bekleyen', fmtN(L.open_disputes), 'durumu "anlaşmazlık" olan maç') : tile('Anlaşmazlıkta kalan', fmtN(M.disputed), 'sezon kapanırken')}
      ${tile('Reddedilen', fmtN(M.declined), 'kabul edilmeyen eşleşme')}${tile('Bağlanamayan', fmtN(M.no_connection), 'iki cihaz bağlanamadı')}${tile('Sayılmayan', fmtN(M.not_counted), 'puan değişmedi')}</div>
    ${why ? `<p class="small" style="margin:6px 0 0">Puansız oynanan (oyuncuya karşı): ${why}.</p>` : ''}
    <div class="sub-h">Gölge rakip</div><div class="tiles" data-testid="rk-shadows">
      ${tile('Gölge maçı', fmtN(G.played), `${fmtN(G.offered)} önerildi · ${fmtN(G.declined)} başlamadı`)}${tile('Gerçek / dojo gölgesi', `${fmtN(G.real)} / ${fmtN(G.house)}`, 'gerçek oyuncu tarzı / oyunun kendi tarzı')}
      ${tile('Galibiyet / yenilgi', `${fmtN(G.wins)} / ${fmtN(G.losses)}`, `${fmtN(G.left)} çıkma · ${fmtN(G.not_counted)} sayılmadı`)}${tile('Gölgelerden puan', `${signed(G.points_won) || '0'} / ${signed(G.points_lost) || '0'}`, `kazanılan / kaybedilen · ${fmtN(G.players)} oyuncu`)}</div>
    <p class="small muted" style="margin:6px 0 0">Gölge: kimse bulunamayınca gerçek bir oyuncunun tarzında dövüşen, oyunda yapay zekâ olarak işaretli bilgisayar; gerçek maç gibi sayılır, sonucu yalnız oyuncunun cihazı bildirir. Şüpheli sonuçlar ve ayarlar "Gölge rakip" bölümünde.</p></div>`;
}
// one match row (human or shadow); me = this player's side in the player drawer
function rkMatchRow(m, me = null) {
  const done = m.status === 'done';
  const who = (x, i) => {
    const won = done && m.winner === i ? ' <span class="badge on">kazandı</span>' : '';
    if (x.ghost) return `<span class="rk-ghost"><b lang="ja">影</b> ${esc(x.house ? `Dojo gölgesi · ${x.nick}` : `Gölge · ${x.nick}`)} <span class="badge">YZ</span>${x.rating ? ` <span class="muted small">${fmtN(x.rating)}</span>` : ''}</span>${won}`;
    if (x.guest) return `<span class="muted">${esc(x.nick || 'misafir')}</span>${won}`;
    return (me != null && i === me ? `<b>${esc(x.nick || '#' + x.player_id)}</b>` : `<button type="button" class="linkish" data-act="rk-player" data-id="${esc(x.player_id)}">${esc(x.nick || '#' + x.player_id)}</button>`) + won;
  };
  const pts = (x) => (x.delta == null ? '—' : `<span data-tip="${esc(`${fmtN(x.before)} → ${fmtN(x.after)}`)}">${signed(x.delta)}</span>${x.shield ? ' <span class="badge" data-tip="Dereceli kalkanı puan kaybını önledi">kalkan</span>' : ''}`);
  const ghost = m.kind === 'ghost';
  const st = ghost ? esc(RK_G_STATUS[m.status] || m.status) + (m.verdict && m.verdict !== 'ok' ? ` <span class="muted">· ${esc(RK_G_VERDICT[m.verdict] || m.verdict)}</span>` : '')
    + (GHOST_PLAYED.includes(m.status) && !m.rated && m.why_unranked ? ` <span class="muted">· puansız (${esc(RK_G_WHY[m.why_unranked] || m.why_unranked)})</span>` : '')
    : rkStatus(m);
  const points = !m.rated ? '—' : me != null ? pts(m.p[me]) : ghost ? pts(m.p[0]) : `${pts(m.p[0])} / ${pts(m.p[1])}`;
  return `<tr data-match="${esc(m.id)}" data-kind="${esc(m.kind)}"><td class="small">${esc(fmtDateTime(m.created_at))}</td>
    <td>${who(m.p[0], 0)} <span class="muted">vs</span> ${who(m.p[1], 1)}${done && m.winner === -1 ? ' <span class="badge">berabere</span>' : ''}
      <div class="small muted" data-testid="rk-match-fighters">${m.p[0].pick || m.p[1].pick ? `${esc(ninjaName(m.p[0].pick))} – ${esc(ninjaName(m.p[1].pick))}` : 'dövüşçü seçilmedi'} · ${esc(arenaName(m.arena))}</div></td>
    <td class="n num">${points}</td><td class="n small">${m.duration_s ? esc(fmtDur(m.duration_s)) : '—'}</td><td class="small">${st}</td></tr>`;
}
const GHOST_PLAYED = ['live', 'done', 'void'];
const rkMatchTable = (rows, testid, me = null) => `<div class="scroll-x"><table class="wide rk-mt" data-testid="${testid}"><thead><tr><th>Zaman</th><th>Maç · dövüşçüler · arena</th><th class="n">Puan</th><th class="n">Süre</th><th>Durum</th></tr></thead>
  <tbody>${rows.map((m) => rkMatchRow(m, me)).join('') || '<tr><td colspan="5" class="muted">Bu süzgeçte maç yok.</td></tr>'}</tbody></table></div>`;
function rkMatchesBody() {
  const R = rkS(), D = R.mt.data;
  if (R.mt.err) return `<div class="warn-box">${esc(friendly(R.mt.err))}</div>`;
  if (!D) return '<p class="muted">Yükleniyor…</p>';
  const C = D.counts || {};
  return `<div class="card" style="margin-top:8px">
    <div class="row rk-mfilter">
      <div class="seg" role="group" aria-label="Rakip türü">${RK_KIND.map(([k, t]) => `<button type="button" data-act="rk-kind" data-k="${k}" aria-pressed="${R.mt.kind === k}">${esc(t)}</button>`).join('')}</div>
      <select id="rkWhat" aria-label="Hangi maçlar">${RK_WHAT.map(([k, t]) => `<option value="${k}"${R.mt.what === k ? ' selected' : ''}>${esc(t)}</option>`).join('')}</select>
      ${R.mt.player ? `<span class="badge on rk-chip" data-testid="rk-mplayer">Oyuncu: ${esc(R.mt.nick || '#' + R.mt.player)} <button type="button" class="ghost x" data-act="rk-mplayer-x" aria-label="Oyuncu süzgecini kaldır">✕</button></span>`
        : `<form class="row rk-search rk-mpform" id="rkMpForm"><input type="search" name="q" maxlength="32" placeholder="Oyuncuya göre süz" aria-label="Maçları oyuncuya göre süz"><button class="btn" type="submit">Süz</button></form>`}
    </div>
    ${R.mt.msg ? `<p class="errors" data-testid="rk-mplayer-msg">${esc(R.mt.msg)}</p>` : ''}
    <p class="small muted" style="margin:6px 0 0">${fmtN(D.total)} maç · ${fmtN(C.human)} oyuncuya karşı · ${fmtN(C.ghost)} gölgeye karşı</p>
    ${rkMatchTable(D.rows || [], 'rk-matches')}
    ${rkPager(D.total, D.offset, D.limit, 'rk-mt-page', 'rk-mt-pager')}</div>`;
}
function rkSetRange(from, to) {
  const R = rkS();
  R.rangeErr = '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to)) R.rangeErr = 'İki tarihi de seç.';
  else if (from > to) R.rangeErr = 'Başlangıç bitişten sonra olamaz.';
  if (R.rangeErr) return paintRanked();
  Object.assign(R, { from, to, period: 'range' });
  R.mt.off = 0;
  formDone();
  $('#pane')?.classList.add('stale');
  loadRanked().finally(() => $('#pane')?.classList.remove('stale'));
}
async function rkMatchPlayer(q) {
  const R = rkS(), c = V.checkRankedQuery(q);
  R.mt.msg = '';
  if (!c.ok) { R.mt.msg = c.errors[0].msg; const b = $('#rkMatches'); if (b) b.innerHTML = rkMatchesBody(); return; }
  let hit = null;
  try {
    const r = await rpc('nd_admin_rk_players', { p_season: R.season, p_q: c.value, p_limit: 20, p_sort: 'rating', p_desc: true, p_filter: 'all', p_offset: 0 });
    hit = (r.rows || []).find((x) => x.nick.toLocaleLowerCase('tr') === c.value.toLocaleLowerCase('tr')) || (r.rows || [])[0] || null;
  } catch (e) { R.mt.msg = friendly(e); }
  if (!hit) { R.mt.msg = R.mt.msg || `Bu sezon "${c.value}" adında oyuncu yok.`; const b = $('#rkMatches'); if (b) b.innerHTML = rkMatchesBody(); return; }
  Object.assign(R.mt, { player: hit.player_id, nick: hit.nick, off: 0 });
  formDone();
  rkReloadPart('mt');
}
// the season's tab, the period, the lists' sort / filter / page (ranked clicks; see the click handler)
function rkAct(a, b) {
  const R = rkS();
  if (a === 'rk-season') {
    const id = Number(b.dataset.id), x = (R.view?.seasons || []).find((y) => y.id === id);
    Object.assign(R, { season: id, closed: !!x?.closed, period: 'season', rangeErr: '' });
    Object.assign(R.pl, { off: 0, q: '', filter: 'all', sort: x?.closed ? 'final' : 'rating', desc: true });
    Object.assign(R.mt, { off: 0, player: null, nick: '', msg: '' });
    $('#pane')?.classList.add('stale');
    return loadRanked().finally(() => $('#pane')?.classList.remove('stale'));
  }
  if (a === 'rk-period') {
    R.rangeErr = '';
    if (b.dataset.p === 'range') { R.period = 'range'; if (!R.from || !R.to) return paintRanked(); }
    else R.period = b.dataset.p;
    R.mt.off = 0;
    $('#pane')?.classList.add('stale');
    return loadRanked().finally(() => $('#pane')?.classList.remove('stale'));
  }
  if (a === 'rk-sort') {
    const k = b.dataset.k;
    if (R.pl.sort === k) R.pl.desc = !R.pl.desc; else { R.pl.sort = k; R.pl.desc = k !== 'nick'; }
    R.pl.off = 0;
    return rkReloadPart('pl');
  }
  if (a === 'rk-pl-page') { R.pl.off = Math.max(0, Number(b.dataset.off) || 0); return rkReloadPart('pl').then(() => $('#rkPlayers')?.scrollIntoView({ block: 'start' })); }
  if (a === 'rk-mt-page') { R.mt.off = Math.max(0, Number(b.dataset.off) || 0); return rkReloadPart('mt').then(() => $('#rkMatches')?.scrollIntoView({ block: 'start' })); }
  if (a === 'rk-kind') { R.mt.kind = b.dataset.k; R.mt.off = 0; return rkReloadPart('mt'); }
  if (a === 'rk-mplayer-x') { Object.assign(R.mt, { player: null, nick: '', off: 0, msg: '' }); return rkReloadPart('mt'); }
  if (a === 'rk-mplayer') { Object.assign(R.mt, { player: Number(b.dataset.id), nick: b.dataset.nick || '', off: 0, msg: '' }); $('#dlg')?.close(); rkReloadPart('mt').then(() => $('#rkMatches')?.scrollIntoView({ block: 'start' })); return; }
  if (a === 'rk-pm-page') return rkDrawerPage(Number(b.dataset.off) || 0);
}
let rkPlTimer = 0;
document.addEventListener('submit', (ev) => {
  const f = ev.target;
  if (f.id === 'rkPlForm') { ev.preventDefault(); clearTimeout(rkPlTimer); const R = rkS(); R.pl.q = f.q.value.trim(); R.pl.off = 0; formDone(); rkReloadPart('pl'); }
  else if (f.id === 'rkMpForm') { ev.preventDefault(); rkMatchPlayer(f.q.value); }
});
document.addEventListener('input', (ev) => {
  // the player list's search: as one types (a short pause), on the server, over the whole season
  if (ev.target.id === 'rkSearch' && !state.rkOld) {
    clearTimeout(rkPlTimer);
    rkPlTimer = setTimeout(() => { const R = rkS(); const q = ev.target.value.trim(); if (q.length > 32 || q === R.pl.q) return; R.pl.q = q; R.pl.off = 0; formDone(); rkReloadPart('pl').then(() => { const i = $('#rkSearch'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }); }, 350);
  }
});
document.addEventListener('change', (ev) => {
  const t = ev.target, R = rkS();
  if (t.id === 'rkFilter') { R.pl.filter = t.value; R.pl.off = 0; formDone(); rkReloadPart('pl'); }
  else if (t.id === 'rkWhat') { R.mt.what = t.value; R.mt.off = 0; formDone(); rkReloadPart('mt'); }
});

// ---- the player drawer: that player's season (the open tab's season), rating line, fighters, every match page by page
function rkLine(points, start) {
  const pts = (start != null ? [{ at: points[0]?.at, r: start, first: true }] : []).concat(points);
  if (pts.length < 2) return '<p class="muted small">Puan çizgisi için en az bir puanlı maç gerekir.</p>';
  const W = 420, H = 150, L = 40, B = 22, T = 10;
  const lo = Math.min(...pts.map((p) => p.r)), hi = Math.max(...pts.map((p) => p.r));
  const pad = Math.max(10, (hi - lo) * 0.1), y0 = Math.floor((lo - pad) / 10) * 10, y1 = Math.ceil((hi + pad) / 10) * 10;
  const x = (i) => L + ((W - L - 8) * i) / (pts.length - 1), y = (v) => T + (H - T - B) * (1 - (v - y0) / Math.max(1, y1 - y0));
  const step = niceStep(y1 - y0);
  let g = '';
  for (let v = Math.ceil(y0 / step) * step; v <= y1; v += step) g += `<line class="grid-l" x1="${L}" x2="${W}" y1="${y(v)}" y2="${y(v)}"/><text class="tick" x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${fmtN(v)}</text>`;
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.r).toFixed(1)}`).join('');
  const dots = pts.map((p, i) => (p.first ? '' : `<circle class="rk-dot${p.k === 'g' ? ' g' : ''}" cx="${x(i).toFixed(1)}" cy="${y(p.r).toFixed(1)}" r="3.2" data-tip="${esc(`${fmtDateTime(p.at)}: ${fmtN(p.r)} (${signed(p.d)})${p.k === 'g' ? ' · gölge maçı' : ''}${p.shield ? ' · kalkan' : ''}`)}"/>`)).join('');
  const lab = (i) => `<text class="tick" x="${x(i)}" y="${H - 6}" text-anchor="${i ? 'end' : 'start'}">${esc(fmtDate(pts[i].at, { day: 'numeric', month: 'short' }))}</text>`;
  return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Sezon boyunca puan" data-testid="rk-rating-line">${g}<line class="base" x1="${L}" x2="${W}" y1="${H - B}" y2="${H - B}"/>
    <path class="rk-line" d="${d}"/>${dots}${lab(0)}${lab(pts.length - 1)}</svg></div>
    <p class="small muted" style="margin:4px 0 0">${start != null ? `Sezonu ${fmtN(start)} puanla açtı · ` : ''}${fmtN(points.length)} puanlı maç · en düşük ${fmtN(lo)}, en yüksek ${fmtN(hi)}. Dolu nokta oyuncuya, açık nokta gölgeye karşı.</p>`;
}
async function openRankedPlayer(id) {
  if (state.rkOld) return openRankedPlayerOld(id);
  const R = rkS(), sid = R.view?.season?.id ?? R.season;
  const d = $('#dlg');
  d.classList.add('drawer');
  d.addEventListener('close', () => d.classList.remove('drawer'), { once: true });
  const frame = (title, body) => `<div class="d-head"><h2 id="dlgTitle">${title}</h2><button class="ghost x" type="button" data-act="dlg-close" aria-label="Kapat">✕</button></div><div class="d-body">${body}</div>`;
  d.innerHTML = frame('Oyuncu', '<p class="muted">Yükleniyor…</p>');
  if (!d.open) d.showModal();
  let base = null, ses = null, ms = null;
  try {
    [base, ses, ms] = await Promise.all([rpc('nd_admin_ranked_player', { p_player_id: Number(id) }).catch(() => null), rpc('nd_admin_rk_player', { p_player_id: Number(id), p_season: sid }),
      rpc('nd_admin_rk_matches', { p_season: sid, p_player: Number(id), p_offset: 0, p_limit: RK_DPAGE })]);
  } catch (e) { d.innerHTML = frame('Oyuncu', `<div class="warn-box">${esc(friendly(e))}</div>`); return; }
  const p = (base && base.player) || { player_id: Number(id), nick: ses.nick };
  if (!ses || !ses.nick) { d.innerHTML = frame('Oyuncu', '<p class="muted">Oyuncu bulunamadı.</p>'); return; }
  R.drawer = { id: Number(id), season: sid, ms };
  const S = ses.row, F = ses.final, pr = p.profile, k = p.strikes_7d || {}, T = ses.totals || {};
  const peak = S && S.peak_tier != null ? V.tierLabel(S.peak_tier) : null;
  const closed = !!ses.closed;
  d.innerHTML = frame(esc(ses.nick), `<div data-testid="rk-player" data-player="${esc(ses.player_id)}" data-season="${esc(ses.season)}">
    <div class="row" style="margin-bottom:8px"><span class="badge on">Sezon ${esc(ses.season)}${closed ? ' · bitti' : ''}</span>${S ? (S.placement > 0 ? `<span class="badge">Yerleştirme: ${fmtN(S.placement)} maç kaldı</span>` : tierTag(S)) : '<span class="badge">Bu sezon dereceli oynamadı</span>'}
      ${p.account != null ? `<span class="badge">${p.account ? 'CrazyGames hesabı' : 'Cihaz kimliği'}</span>` : ''}${p.banned ? '<span class="badge del">yasaklı</span>' : ''}${pr && pr.suspended_at ? `<span class="badge del">askıda (${esc(fmtDate(pr.suspended_at))})</span>` : ''}</div>
    ${p.created_at ? `<p class="small muted" style="margin:0 0 8px">Oyuncu no ${esc(p.player_id)}${p.country ? ` · ${esc(regionName(p.country))}` : ''} · ilk kayıt ${esc(fmtDate(p.created_at, { day: 'numeric', month: 'long', year: 'numeric' }))}</p>` : ''}
    ${S ? `<div class="tiles">${tile(closed ? 'Sezon sonu puanı' : 'Puan', fmtN(F ? F.rating : S.rating), `belirsizlik ±${fmtN(S.rd)}`)}
      ${closed ? tile('Son sıra', F && F.place ? `${fmtN(F.place)}.` : '—', F && F.place ? 'sezon kapanırken' : 'sıralama dışı') : tile('Sıralama yeri', ses.place ? `${fmtN(ses.place)}.` : '—', ses.place ? 'oyundaki sıralama' : S.placement > 0 ? 'yerleştirme bitmedi' : `en az ${fmtN(R.view?.settings?.board_games ?? 10)} maç ve düşük belirsizlik gerekir`)}
      ${tile('Puanlı maç', fmtN(S.games), `${fmtN(S.wins)} G · ${fmtN(S.losses)} M · ${fmtN(S.draws)} B`)}${tile('Kazanma', S.games ? rkPct(S.wins / S.games) : '—', `${fmtN(S.nc)} maç sayılmadı`)}
      ${tile('Gölgeye karşı', `${fmtN(S.ghost_w)} / ${fmtN(S.ghost_l)}`, 'galibiyet / yenilgi (puanlı)')}
      ${tile('En yüksek', peak ? peak.name : '—', S.peak_rating ? `${fmtN(S.peak_rating)} puan` : '')}${tile('Son puanlı maç', S.last_at ? fmtDate(S.last_at, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—')}</div>` : ''}
    <div class="sub-h">Sezon boyunca puan</div><div data-testid="rk-player-line">${rkLine(ses.rating || [], ses.start)}</div>
    <div class="sub-h">Dövüşçüler (bu sezon dövüşe geçen maçlar)</div>
    ${(ses.ninjas || []).length ? `<div class="scroll-x"><table data-testid="rk-player-ninjas"><thead><tr><th>Dövüşçü</th><th class="n">Maç</th><th class="n">G – M – B</th><th class="n">Kazanma</th></tr></thead>
      <tbody>${ses.ninjas.map((n) => `<tr><td><b>${esc(ninjaName(n.ninja))}</b>${n.ghost ? ` <span class="small muted">(${fmtN(n.ghost)} gölgeye)</span>` : ''}</td><td class="n">${fmtN(n.n)}</td><td class="n">${fmtN(n.w)} – ${fmtN(n.l)} – ${fmtN(n.d)}</td><td class="n num">${n.w + n.l + n.d ? rkPct(n.w / (n.w + n.l + n.d)) : '—'}</td></tr>`).join('')}</tbody></table></div>
      <p class="small muted" style="margin:4px 0 0">Toplam ${fmtN(T.human)} maç oyuncuya, ${fmtN(T.ghost)} maç gölgeye karşı; ${fmtN(T.rated)} puanlı.</p>` : '<p class="muted small">Bu sezon dövüşe geçen maçı yok.</p>'}
    <div class="sub-h">Bütün maçları (Sezon ${esc(ses.season)})</div>
    <div id="rkDrawerMatches">${rkDrawerMatches()}</div>
    <p style="margin:8px 0 0"><button class="btn" type="button" data-act="rk-mplayer" data-id="${esc(ses.player_id)}" data-nick="${esc(ses.nick)}">Maçlar listesinde bu oyuncuyu süz</button></p>
    ${p.shadows ? `<div class="sub-h">Gölge olarak (son 7 gün)</div><p class="small" style="margin:6px 0 0" data-testid="rk-player-shadows">Tarzı ${p.shadows.profile && p.shadows.profile.fights ? `${fmtN(p.shadows.profile.fights)} maçtan ölçüldü` : 'henüz ölçülmedi'} · başkalarına gölge oldu: <b>${fmtN(p.shadows.used_as_shadow_7d)}</b></p>` : ''}
    ${base ? `<div class="sub-h">İşaretler (son 7 gün)</div>
    <p class="small" style="margin:6px 0 0">Ret / süre kaçırma <b>${fmtN(k.decline)}</b> · maçtan çıkma <b>${fmtN(k.left)}</b> · anlaşmazlık <b>${fmtN(k.dispute)}</b> · sessizce kaybolma <b>${fmtN(k.silent)}</b>
      <span class="muted">(farklı rakiplerle 7 günde 3 anlaşmazlık dereceliyi askıya alır)</span></p>
    ${pr ? `<p class="small muted" style="margin:6px 0 0">Açtığı dövüşçü: ${fmtN((pr.unlocked || []).length)} · son seçtiği: ${esc(ninjaName(pr.last_ninja))}${pr.title_id ? ` · taktığı unvan: ${esc(rewardNames([pr.title_id]))}` : ''}</p>` : ''}
    <div class="sub-h">Ödüller</div>
    <p class="small" style="margin:6px 0 0">${(p.owned || []).length ? p.owned.map((o) => `${esc(rewardNames([o.reward_id]))}${o.source ? ` <span class="muted">(${esc(o.source.replace(/^season:/, 'sezon '))})</span>` : ''}`).join(', ') : '<span class="muted">yok</span>'}</p>
    ${(p.finals || []).length ? `<div class="sub-h">Sezon sonları</div><ul class="small" style="margin:6px 0 0;padding-left:18px">${p.finals.map((f) => `<li>Sezon ${esc(f.season)}: ${f.place ? `<b>${fmtN(f.place)}.</b>` : 'sıralama dışı'} · ${tierTag(f)} · ${fmtN(f.rating)} puan · ${fmtN(f.games)} maç</li>`).join('')}</ul>` : ''}` : ''}
  </div>`);
}
function rkDrawerMatches() {
  const Dr = rkS().drawer, M = Dr && Dr.ms;
  if (!M) return '';
  const me = (m) => (m.kind === 'ghost' ? 0 : m.p[0].player_id === Dr.id ? 0 : 1);
  const rows = (M.rows || []).map((m) => rkMatchRow(m, me(m))).join('');
  return `<p class="small muted" style="margin:6px 0 0">${fmtN(M.total)} maç · ${fmtN(M.counts?.human)} oyuncuya · ${fmtN(M.counts?.ghost)} gölgeye karşı</p>
    <div class="scroll-x"><table class="wide rk-mt" data-testid="rk-player-matches"><thead><tr><th>Zaman</th><th>Maç · dövüşçüler · arena</th><th class="n">Puan</th><th class="n">Süre</th><th>Durum</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="5" class="muted">Maç yok.</td></tr>'}</tbody></table></div>${rkPager(M.total, M.offset, M.limit, 'rk-pm-page', 'rk-pm-pager')}`;
}
async function rkDrawerPage(off) {
  const Dr = rkS().drawer;
  if (!Dr) return;
  try { Dr.ms = await rpc('nd_admin_rk_matches', { p_season: Dr.season, p_player: Dr.id, p_offset: Math.max(0, off), p_limit: RK_DPAGE }); } catch (e) { alert(friendly(e)); return; }
  const box = $('#rkDrawerMatches');
  if (box) box.innerHTML = rkDrawerMatches();
}

// ---------------------------------------------------------------- difficulty tune
const TUNE_LABELS = {
  react: ['Tepki süresi', 'saniye; küçük = daha zor'], tick: ['Karar arası', 'en kısa – en uzun saniye; küçük = daha sık düşünür'],
  parry: ['Savuşturma şansı', '0 = hiç, 1 = her zaman'], guard: ['Blok şansı', '0–1'], dodge: ['Kaçma şansı', '0–1'], aggr: ['Saldırganlık', '0–1'],
  combo: ['Seriye devam', '0–1'], smart: ['Akıllı hamleler', '0–1'], counter: ['Karşılık vurma', '0–1'], rally: ['Karşılığa karşı önceden blok', '0–1'],
  read: ['Oyuncuyu okuma', '0–1'], cmd: ['Özel açılış hamlesi', '0–1'], str: ['Seriyi güçlü bitirme', '0–1'], jug: ['Havada vurmaya devam', '0–1'],
  kc: ['KI tekniğiyle bağlama', '0–1'], mash: ['Kılıç kilidinde tuşa basma', 'saniyede, 1–20'],
};
// the new fight (1.5, the duel): plain labels for the owner
const DUEL_ONE_LABELS = {
  duelSpeed: ['Yeni dövüş hızı', '1 = normal, 0,7 = en yavaş. Dereceli maçın hızını sunucu ayrıca seçer (ranked-15.sql).'],
  duelK: ['Yeni dövüş zorluğu', 'Bilgisayar ne kadar güçlü: 0 = bir alt seviye kadar, 1 = seviyenin tam gücü.'],
  duelSoft: ['Çırak yumuşaklığı', 'En kolay seviye ne kadar kolay: 0 = eski Çırak, 1 = çok daha yumuşak.'],
  duelGhostK: ['Gölge rakibin gücü', 'Derecelide gölge rakip: 1 = tam güç, küçük = daha kolay.'],
  finDmg: ['Sinematik karşılığın gücü', 'Karşı saldırı sinematiğinin vuruşu (tek oyunculu; çevrimiçinde oyunun kendi değeri): 0,7 = bugünkü.'],
  finChor: ['Sinematik koreografisi', 'Karşı saldırı sinematiklerindeki karşılıklı kılıç alışverişi (tek oyunculu): 1 = açık (bugünkü), 0 = kapalı (eski sinematik).'],
};
const DUEL_PER_LABELS = {
  duelKch: ['Zorluk (Efsane)', '0–1'], duelK0ch: ['Çırak', '−1–2'], duelKAch: ['Çırak+', '−1–2'], duelKUch: ['Usta', '−1–2'],
  duelDmg: ['Bilgisayarın vuruşu ×', '0,5–2'], duelChDmg: ['Ninjanın vuruşu ×', '0,5–2 (oyuncu da)'],
  duelBindPlayCh: ['Bağlama için savunma', '0–1; doluysa bu ninjada seviyenin değeri yerine geçer'],
};
const BIND_LEVEL_NAMES = { 0: 'Çırak', 0.5: 'Çırak+', 1: 'Usta', 2: 'Efsane', 3: 'Şura' };
async function loadTune() {
  try { const r = await rpc('nd_admin_tune_get'); state.tune = r && r.text ? r.text : null; state.tuneErr = null; } catch (e) { state.tuneErr = e; state.tune = null; }
  if (onPane('tune')) paintTune();
}
// the game's own value of a per-ninja duel knob (what an empty box means): the level k's fall back to the ninja's k,
// that one to the common duelK; the damage factors to 1
function duelDef(D, k, id) {
  if (k === 'duelBindPlayCh') return (D[k] && D[k][id]) ?? 'seviye';
  if (k === 'duelDmg' || k === 'duelChDmg') return (D[k] && D[k][id]) ?? 1;
  const kch = (D.duelKch && D.duelKch[id]) ?? D.duelK;
  return k === 'duelKch' ? kch : ((D[k] && D[k][id]) ?? kch);
}
function tuneObj() {
  const text = state.tuneDraft ?? state.tune;
  if (!text) return {};
  try { return JSON.parse(text) || {}; } catch { return {}; }
}
function paintTune(msg = '', errs = []) {
  const el = $('#pane');
  if (!el) return;
  if (state.tune === undefined) { el.innerHTML = '<p class="muted">Yükleniyor…</p>'; loadTune(); return; }
  if (state.tuneErr) { el.innerHTML = `<div class="warn-box">${esc(friendly(state.tuneErr))} (Shadow Duel: ai-tune.sql ve admin.sql.)</div>`; return; }
  const T = tuneObj(), D = TUNE_DEFAULTS, l = state.tuneLevel;
  const lv = (T.levels && T.levels[l]) || {};
  const J = T.journey || {};
  const val = (v) => (v === undefined || v === null ? '' : String(v));
  el.innerHTML = `<div class="bar-head"><h2>Zorluk (Shadow Duel)</h2><span class="muted small">${state.tune ? 'Sunucuda ayar var' : 'Sunucuda ayar yok: oyun kendi değerleriyle oynuyor'}</span></div>
    ${msg ? `<p class="ok-msg">${esc(msg)}</p>` : ''}
    ${state.tuneDraft !== undefined && state.tuneDraft !== (state.tune || '') ? '<p class="note">Kaydedilmemiş değişiklik var.</p>' : ''}
    ${errs.length ? `<div class="errors" data-testid="tune-errors"><b>Düzelt:</b><ul>${errs.map((e) => `<li><code>${esc(e.field)}</code> ${esc(e.msg)}</li>`).join('')}</ul></div>` : ''}
    <p class="small muted">Boş bırakılan kutu oyunun kendi değerini kullanır. Değişiklik oyuncuya bir sonraki açılışında, iki dövüş arasında geçer (CrazyGames ve kendi sitemiz; Yandex için konsoldaki "ai_tune" bayrağı, bkz. docs/SHADOW-DUEL-UZAK-AYAR.md).</p>
    <form id="tuneForm" class="form" novalidate>
      <div class="seg" role="group" aria-label="Seviye">${['0', '1', '2', '3'].map((k) => `<button type="button" data-act="tune-level" data-level="${k}" aria-pressed="${k === l}">${esc(LEVEL_NAMES[k])}</button>`).join('')}</div>
      <div class="card scroll-x tune"><table><thead><tr><th>${esc(LEVEL_NAMES[l])}</th><th class="n">Oyunun değeri</th><th class="n">Yeni değer</th></tr></thead><tbody>
        ${Object.keys(V.TUNE_FIELDS).map((k) => `<tr class="${lv[k] !== undefined ? 'changed' : ''}"><td>${esc(TUNE_LABELS[k][0])}<div class="small muted">${esc(TUNE_LABELS[k][1])}</div></td>
          <td class="n def">${esc(D.levels[l][k])}</td><td class="n"><input type="number" step="0.01" min="${V.TUNE_FIELDS[k][0]}" max="${V.TUNE_FIELDS[k][1]}" name="lv_${k}" value="${esc(val(lv[k]))}" placeholder="${esc(D.levels[l][k])}" aria-label="${esc(TUNE_LABELS[k][0])}"></td></tr>`).join('')}
        <tr class="${lv.tick ? 'changed' : ''}"><td>${esc(TUNE_LABELS.tick[0])}<div class="small muted">${esc(TUNE_LABELS.tick[1])}</div></td><td class="n def">${D.levels[l].tick.join(' – ')}</td>
          <td class="n"><input type="number" step="0.01" name="tick0" value="${esc(val(lv.tick?.[0]))}" placeholder="${D.levels[l].tick[0]}" aria-label="en kısa"> <input type="number" step="0.01" name="tick1" value="${esc(val(lv.tick?.[1]))}" placeholder="${D.levels[l].tick[1]}" aria-label="en uzun"></td></tr>
      </tbody></table></div>
      <div class="card scroll-x tune"><table><thead><tr><th>Genel</th><th class="n">Oyunun değeri</th><th class="n">Yeni değer</th></tr></thead><tbody>
        <tr class="${T.apprenticePlusK !== undefined ? 'changed' : ''}"><td>Çırak+ nerede<div class="small muted">0 = Çırak ile aynı, 1 = Usta ile aynı</div></td><td class="n def">${D.apprenticePlusK}</td><td class="n"><input type="number" step="0.05" min="0" max="1" name="apk" value="${esc(val(T.apprenticePlusK))}" placeholder="${D.apprenticePlusK}"></td></tr>
        <tr class="${T.kiWait !== undefined ? 'changed' : ''}"><td>Dolu KI'yı bekletme<div class="small muted">en çok kaç saniye, 1–120</div></td><td class="n def">${D.kiWait}</td><td class="n"><input type="number" step="1" min="1" max="120" name="kiw" value="${esc(val(T.kiWait))}" placeholder="${D.kiWait}"></td></tr>
      </tbody></table></div>
      <div class="card scroll-x tune"><table><thead><tr><th>Yeni dövüş</th><th class="n">Oyunun değeri</th><th class="n">Yeni değer</th></tr></thead><tbody>
        ${Object.keys(V.DUEL_ONE).map((k) => `<tr class="${T[k] !== undefined ? 'changed' : ''}"><td>${esc(DUEL_ONE_LABELS[k][0])}<div class="small muted">${esc(DUEL_ONE_LABELS[k][1])}</div></td><td class="n def">${esc(val(D[k]))}</td>
          <td class="n"><input type="number" step="0.05" min="${V.DUEL_ONE[k][0]}" max="${V.DUEL_ONE[k][1]}" name="dg_${k}" value="${esc(val(T[k]))}" placeholder="${esc(val(D[k]))}" aria-label="${esc(DUEL_ONE_LABELS[k][0])}"></td></tr>`).join('')}
      </tbody></table></div>
      <div class="card scroll-x tune"><table><thead><tr><th>Bağlama için savunma<div class="small muted">Bilgisayar 5–6 puandayken saldırmak yerine savunmaya devam edip bağlamaya gitsin mi: 0 = hiç, 1 = her zaman</div></th>${V.BIND_LEVELS.map((l) => `<th class="n">${esc(BIND_LEVEL_NAMES[l])}</th>`).join('')}</tr></thead><tbody>
        <tr><td>Seviye başına</td>${V.BIND_LEVELS.map((l) => { const cur = T.duelBindPlay ? T.duelBindPlay[l] : undefined, def = D.duelBindPlay ? D.duelBindPlay[l] : undefined; return `<td class="n ${cur !== undefined ? 'changed' : ''}"><input type="number" step="0.05" min="0" max="1" name="bp_${l.replace('.', '_')}" value="${esc(val(cur))}" placeholder="${esc(val(def ?? 0))}" aria-label="${esc('Bağlama için savunma ' + BIND_LEVEL_NAMES[l])}"></td>`; }).join('')}</tr>
      </tbody></table></div>
      <div class="card scroll-x tune"><table class="duel-per"><thead><tr><th>Ninja (yeni dövüş)</th>${Object.keys(V.DUEL_PER).map((k) => `<th class="n">${esc(DUEL_PER_LABELS[k][0])}<div class="small muted">${esc(DUEL_PER_LABELS[k][1])}</div></th>`).join('')}</tr></thead><tbody>
        ${V.DUEL_NINJAS.map((id) => `<tr><td>${esc((NINJAS.find((n) => n.id === id) || { name: id.toUpperCase() }).name)}</td>${Object.keys(V.DUEL_PER).map((k) => {
          const def = duelDef(D, k, id), cur = T[k] ? T[k][id] : undefined;
          return `<td class="n ${cur !== undefined ? 'changed' : ''}"><input type="number" step="0.05" min="${V.DUEL_PER[k][0]}" max="${V.DUEL_PER[k][1]}" name="dp_${k}_${id}" value="${esc(val(cur))}" placeholder="${esc(val(def))}" aria-label="${esc(id + ' ' + DUEL_PER_LABELS[k][0])}"></td>`;
        }).join('')}</tr>`).join('')}
      </tbody></table><p class="small muted">Boş kutu oyunun değerini kullanır (soluk sayı). Zorluk: 0 = bir alt seviye kadar kolay, 1 = seviyenin tam gücü (Çırak / Çırak+ / Usta'da eksi = daha da kolay, 1'in üstü = biraz daha zor); Çırak / Çırak+ / Usta boşsa Efsane'nin sayısını kullanır.</p></div>
      <div class="card scroll-x tune"><table class="journey"><thead><tr><th>Yolculuk</th><th>Seviye</th><th>Bilgisayar profili</th><th class="n">Rakip canı ×</th></tr></thead><tbody>
        ${Array.from({ length: 8 }, (_, i) => `<tr><td>${i + 1}. dövüş</td>
          <td><select name="jl${i}"><option value="">Varsayılan (${esc(LEVEL_NAMES[D.journey.levels[i]])})</option>${[0, 1, 2, 3].map((x) => `<option value="${x}" ${J.levels?.[i] === x ? 'selected' : ''}>${esc(LEVEL_NAMES[x])}</option>`).join('')}</select></td>
          <td><select name="ja${i}"><option value="">Varsayılan (${D.journey.ai[i] === null ? 'seviyenin kendisi' : esc(aiName(D.journey.ai[i]))})</option><option value="null" ${J.ai && J.ai[i] === null ? 'selected' : ''}>Seviyenin kendisi</option>${V.AI_KEYS.map((x) => `<option value="${x}" ${J.ai?.[i] === x ? 'selected' : ''}>${esc(aiName(x))}</option>`).join('')}</select></td>
          <td class="n"><input type="number" step="0.05" name="jh${i}" value="${esc(val(J.hp?.[i]))}" placeholder="${D.journey.hp[i]}" aria-label="${i + 1}. dövüş can"></td></tr>`).join('')}
      </tbody></table><p class="small muted">Can çarpanı: 0 = normal, 1,15 = %15 fazla (0 ya da 0,5–2).</p></div>
      <details class="table"><summary>Kaydedilecek metin</summary><pre id="tunePre"></pre></details>
      <div class="row"><button class="btn primary" type="submit">Kaydet</button><button class="btn" type="button" data-act="tune-clear" ${state.tune ? '' : 'disabled'}>Oyunun kendi değerlerine dön</button></div>
    </form>`;
  const f = $('#tuneForm');
  const build = () => {
    const t = tuneObj();
    delete t.v;
    const L = { ...((t.levels && t.levels[l]) || {}) };
    for (const k of Object.keys(V.TUNE_FIELDS)) { const v = f['lv_' + k].value; if (v === '') delete L[k]; else L[k] = Number(v); }
    if (f.tick0.value === '' && f.tick1.value === '') delete L.tick; else L.tick = [Number(f.tick0.value || D.levels[l].tick[0]), Number(f.tick1.value || D.levels[l].tick[1])];
    t.levels = { ...(t.levels || {}) };
    if (Object.keys(L).length) t.levels[l] = L; else delete t.levels[l];
    if (!Object.keys(t.levels).length) delete t.levels;
    if (f.apk.value === '') delete t.apprenticePlusK; else t.apprenticePlusK = Number(f.apk.value);
    if (f.kiw.value === '') delete t.kiWait; else t.kiWait = Number(f.kiw.value);
    for (const k of Object.keys(V.DUEL_ONE)) { const v = f['dg_' + k].value; if (v === '') delete t[k]; else t[k] = Number(v); }
    { const m = {}; for (const l of V.BIND_LEVELS) { const v = f['bp_' + l.replace('.', '_')].value; if (v !== '') m[l] = Number(v); } if (Object.keys(m).length) t.duelBindPlay = m; else delete t.duelBindPlay; }
    for (const k of Object.keys(V.DUEL_PER)) {
      const m = {};
      for (const id of V.DUEL_NINJAS) { const v = f[`dp_${k}_${id}`].value; if (v !== '') m[id] = Number(v); }
      if (Object.keys(m).length) t[k] = m; else delete t[k];
    }
    const lvls = Array.from({ length: 8 }, (_, i) => (f['jl' + i].value === '' ? null : Number(f['jl' + i].value)));
    const hp = Array.from({ length: 8 }, (_, i) => (f['jh' + i].value === '' ? null : Number(f['jh' + i].value)));
    const aiSet = Array.from({ length: 8 }, (_, i) => f['ja' + i].value);
    const j = {};
    const trim = (a) => { while (a.length && a[a.length - 1] === null) a.pop(); return a; };
    if (lvls.some((x) => x !== null)) j.levels = trim(lvls);
    if (hp.some((x) => x !== null)) j.hp = trim(hp);
    // the journey's "ai" list: null means "the level itself", so a changed list is written in full (defaults filled in)
    if (aiSet.some((x) => x !== '')) j.ai = aiSet.map((x, i) => (x === '' ? D.journey.ai[i] : x === 'null' ? null : Number(x)));
    if (Object.keys(j).length) t.journey = j; else delete t.journey;
    return Object.keys(t).length ? JSON.stringify({ v: 1, ...t }) : '';
  };
  const show = () => { $('#tunePre').textContent = build() || '(boş: oyunun kendi değerleri)'; };
  state.tuneBuild = build;
  f.oninput = show;
  show();
  f.onsubmit = async (ev) => {
    ev.preventDefault();
    const text = build();
    if (!text) { return clearTune(); }
    const c = V.checkTune(text);
    if (!c.ok) { state.tuneDraft = text; return paintTune('', c.errors); }
    try { const r = await rpc('nd_admin_tune_set', { p_text: text }); state.tune = r.text; state.tuneDraft = undefined; paintTune('Kaydedildi. Oyuncular bir sonraki açılışta alır.'); } catch (e) { paintTune('', [{ field: 'sunucu', msg: serverFieldMsg(e) }]); }
  };
  f.querySelector('[data-act="tune-clear"]').onclick = () => clearTune();
}
// ---------------------------------------------------------------- shadow opponents' settings (ranked-ghost.sql nd_admin_ghost_get / _set)
const GHOST_LABELS = {
  enabled: ['Gölge rakip açık', '1 = açık, 0 = kapalı. Kapalıyken oyun eskisi gibi yalnız puansız "CPU ile ısın" önerir.'],
  after_s: ['Kaç saniye sonra başlasın', 'Kuyrukta bu kadar saniye kimse bulunamazsa gölge maçı kendiliğinden başlar.'],
  off_at: ['Bu kadar kişi ararken gelmesin', 'Şu an rakip arayan kişi bu sayıya ulaşınca gölge gelmez; insanlar birbirini bulsun.'],
  until_players: ['Oyuncu yetince kapansın', 'Son 24 saatte dereceli oynayan farklı oyuncu bu sayıya ulaşınca gölge kendiliğinden kapanır. 0 = bu kural yok.'],
  weight: ['Puan ağırlığı', 'Gölge maçında puan, normal maçtaki değişimin bu kadarı değişir: 1 = gerçek maç gibi, 0,5 = yarısı, 0 = hiç (puansız).'],
  daily: ['Günde en çok puanlı gölge maçı', 'Bir oyuncu 24 saatte en çok bu kadar puanlı gölge maçı oynar; sonra CPU ısınması. 0 = sınır yok.'],
  min_games: ['Tarz için en az maç', 'Bir oyuncunun tarzı ancak bu kadar dereceli maçtan sonra gölge olarak kullanılır.'],
  min_s: ['En kısa maç (saniye)', 'Bundan kısa süren gölge maçı sayılmaz (hileye karşı).'],
  window_s: ['Sonuç için en uzun süre (saniye)', 'Sonuç bu sürede gelmezse maç yenilgi sayılır (sekmeyi kapatan kaybeder).'],
  max_delta: ['Maç başına en çok puan', 'Bir gölge maçında puan en çok bu kadar artar ya da azalır. 0 = sınır yok.'],
  day_gain: ['Günde en çok kazanç', 'Bir oyuncu 24 saatte gölgelerden en çok bu kadar puan kazanabilir. 0 = sınır yok.'],
  profile_days: ['Tarz kaç gün geçerli', 'Bu kadar gündür dereceli oynamamış oyuncunun tarzı gölge olmaz.'],
  house: ['Dojo gölgesi', '1 = gerçek oyuncu tarzı yokken (ya da hiçbiri 400 puan yakınında değilken) oyunun kendi tarzlarından bir "Dojo gölgesi" gelir; 0 = yalnız gerçek oyuncu gölgeleri (yoksa CPU ısınması).'],
};
// the shadows at a glance on the settings page: the "until enough players" rule now, the week's shadow matches (apart
// from human ones), the suspicious results (ranked-ghost.sql nd_rank_ghost_suspicious) and the last shadow matches
const GHOST_WHY = { streak: 'art arda çok galibiyet', win_rate: 'çok yüksek kazanma oranı', vs_real: 'gerçek maçlarından çok daha iyi' };
const ghostPct = (x) => (x == null ? '—' : `%${Math.round(x * 100)}`);
function ghostOverview(O) {
  if (!O) return '';
  const D = O.d7 || {}, S = O.settings || (state.ghost && state.ghost.settings) || {}, until = Number(S.until_players) || 0;
  const sus = O.suspicious || [], rec = O.recent || [];
  const when = (t) => { try { return new Date(t).toLocaleString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); } catch { return ''; } };
  const res = (r) => r.status === 'void' ? 'sayılmadı' : r.status === 'live' ? 'sürüyor' : r.verdict === 'left' || r.verdict === 'abandoned' ? 'çıktı (yenilgi)' : r.winner === 0 ? 'kazandı' : r.winner === 1 ? 'kaybetti' : 'berabere';
  return `<div data-testid="ghost-overview">
    <div class="tiles">${tile('Son 24 saatte dereceli oynayan', fmtN(O.active_players), until ? (O.auto_off ? `sınır ${fmtN(until)}: gölgeler kendiliğinden kapandı` : `${fmtN(until)} olunca gölgeler kapanır`) : 'oyuncu sayısı kuralı kapalı')}
      ${tile('Gölge maçı (7 gün)', fmtN(D.played), `${fmtN(D.real)} gerçek oyuncu tarzı · ${fmtN(D.house)} dojo · insan maçlarına sayılmaz`)}${tile('Oyuncu kazandı / kaybetti', `${fmtN(D.wins)} / ${fmtN(D.losses)}`, `${fmtN(D.left)} çıkma · ${fmtN(D.not_counted)} sayılmadı`)}</div>
    <div class="sub-h">Şüpheli gölge sonuçları (7 gün)</div>
    ${sus.length ? `<div class="scroll-x"><table data-testid="ghost-suspicious"><thead><tr><th>Oyuncu</th><th class="n">Gölge G / M</th><th class="n">Art arda</th><th class="n">Oran</th><th class="n">Gerçek maç G / M</th><th>Neden</th></tr></thead>
      <tbody>${sus.map((x) => `<tr><td>${esc(x.nick)}</td><td class="n">${fmtN(x.wins)} / ${fmtN(x.losses)}</td><td class="n">${fmtN(x.streak)}</td><td class="n">${ghostPct(x.win_rate)}</td><td class="n">${fmtN(x.real_w)} / ${fmtN(x.real_l)}</td><td class="small">${esc((x.why || []).map((w) => GHOST_WHY[w] || w).join(', '))}</td></tr>`).join('')}</tbody></table></div>`
      : '<p class="small muted" data-testid="ghost-suspicious-none">Şüpheli sonuç yok. (Listeye girer: 7 günde en az 5 gölge maçı ve 8+ art arda gölge galibiyeti, ya da %85+ gölge galibiyeti, ya da gerçek maçlarından 40 puan daha yüksek gölge galibiyet oranı.)</p>'}
    <div class="sub-h">Son gölge maçları</div>
    ${rec.length ? `<div class="scroll-x"><table data-testid="ghost-recent"><thead><tr><th>Ne zaman</th><th>Oyuncu</th><th>Gölge (tarz)</th><th>Sonuç</th><th class="n">Puan</th></tr></thead>
      <tbody>${rec.map((r) => `<tr><td class="small">${esc(when(r.at))}</td><td>${esc(r.player)}</td><td>${esc(r.shadow)}${r.house ? ' <span class="small muted">dojo</span>' : ''}</td><td>${res(r)}</td><td class="n num">${r.delta == null ? '—' : signed(r.delta)}</td></tr>`).join('')}</tbody></table></div>`
      : '<p class="small muted">Henüz gölge maçı yok.</p>'}
  </div>`;
}
async function loadGhost() {
  try { state.ghost = await rpc('nd_admin_ghost_get'); state.ghostErr = null; } catch (e) { state.ghostErr = e; state.ghost = null; }
  if (onPane('ghost')) paintGhost();
}
const ghostNum = (v) => (v == null ? '' : String(v).replace('.', ','));
function paintGhost(msg = '', errs = []) {
  const el = $('#pane');
  if (!el) return;
  if (state.ghost === undefined) { el.innerHTML = '<p class="muted">Yükleniyor…</p>'; loadGhost(); return; }
  if (state.ghostErr) {
    el.innerHTML = `<div class="warn-box" data-testid="ghost-error">${state.ghostErr.missing ? 'Gölge rakibin sunucu kurulumu henüz yapılmadı (games/06-shadow-duel/supabase/ranked-ghost.sql). Kurulmadan oyun gölge önermez, eskisi gibi CPU ısınması çıkar.' : esc(friendly(state.ghostErr))}</div>`;
    return;
  }
  const G = state.ghost || {}, S = G.settings || {}, St = G.stored || {}, D = V.GHOST_FIELDS;
  el.innerHTML = `<div class="bar-head"><h2>Gölge rakip (Shadow Duel)</h2><span class="muted small">${Number(S.enabled) === 1 ? '<span class="badge on">açık</span>' : '<span class="badge del">kapalı</span>'}</span></div>
    ${msg ? `<p class="ok-msg">${esc(msg)}</p>` : ''}
    ${errs.length ? `<div class="errors" data-testid="ghost-errors"><b>Düzelt:</b><ul>${errs.map((e) => `<li><b>${esc((GHOST_LABELS[e.field] || [e.field])[0])}</b>: ${esc(e.msg)}</li>`).join('')}</ul></div>` : ''}
    <p class="small">Dereceli kuyrukta kimse bulunamayınca maç bir <b>gölgeyle</b> kendiliğinden başlar: gerçek bir dereceli oyuncunun tarzında (seçtiği dövüşçü, ne sık savuşturduğu, saldırganlığı, hamleleri, KI kullanımı) ya da oyunun kendi tarzlarından biriyle (Dojo gölgesi) dövüşen bilgisayar. Oyunda her yerde yapay zekâ olarak işaretli: "…'ın gölgesi", 影 ve küçük bir "YZ" etiketi; canlı oyuncu gibi gösterilmez. Gölge maçı gerçek maç gibi sayılır (puan, yerleştirme, galibiyet / yenilgi); gölgenin sahibinin puanı hiç değişmez. Son 24 saatte yeterince oyuncu dereceli oynayınca gölge kendiliğinden kapanır.</p>
    ${ghostOverview(G.overview)}
    <p class="small muted">Değişiklik oyunu güncellemeden geçer: oyuncunun bir sonraki aramasında. Boş bırakılan kutu değişmez.</p>
    <form id="ghostForm" class="form" novalidate>
      <div class="card scroll-x tune"><table><thead><tr><th>Ayar</th><th class="n">Oyunun değeri</th><th class="n">Şu an</th><th class="n">Yeni değer</th></tr></thead><tbody>
        ${Object.keys(D).map((k) => `<tr class="${St[k] != null ? 'changed' : ''}"><td>${esc(GHOST_LABELS[k][0])}<div class="small muted">${esc(GHOST_LABELS[k][1])}</div></td>
          <td class="n def">${esc(ghostNum(D[k][3]))}</td><td class="n num" data-ghost-now="${k}">${esc(ghostNum(S[k]))}</td>
          <td class="n"><input type="text" inputmode="decimal" name="g_${k}" value="" placeholder="${esc(ghostNum(S[k]))}" aria-label="${esc(GHOST_LABELS[k][0])}"></td></tr>`).join('')}
      </tbody></table></div>
      <p class="small muted">Sınırlar: ${Object.keys(D).map((k) => `${esc(GHOST_LABELS[k][0])} ${ghostNum(D[k][1])}–${ghostNum(D[k][2])}`).join(' · ')}.</p>
      <p class="small muted">Gölge maçının sonucunu yalnız oyuncunun kendi cihazı bildirir (karşıda ikinci bir cihaz yok). Puan sınırı yok (0); hile şüphesinde yukarıdaki "Şüpheli gölge sonuçları" listesine bak. Gerekirse maç başına / günlük puan sınırı ya da günlük maç sınırı koy; ağırlığı 0 yaparsan gölgeler hemen puansız olur.</p>
      <div class="row"><button class="btn primary" type="submit">Kaydet</button></div>
    </form>`;
  const f = $('#ghostForm');
  f.onsubmit = async (ev) => {
    ev.preventDefault();
    const raw = {};
    for (const k of Object.keys(D)) { const v = f['g_' + k].value.trim(); if (v !== '') raw[k] = v; }
    const c = V.checkGhost(raw);
    if (!c.ok) return paintGhost('', c.errors);
    if (!Object.keys(c.value).length) return paintGhost('Değişiklik yok.');
    try { state.ghost = await rpc('nd_admin_ghost_set', { p: c.value }); paintGhost('Kaydedildi. Oyuncular bir sonraki aramada alır.'); }
    catch (e) { const m = /nd:ghost:(\w+)/.exec(e && e.message || ''); paintGhost('', [{ field: m ? m[1] : 'sunucu', msg: m ? 'Sunucu kabul etmedi.' : friendly(e) }]); }
  };
}
async function clearTune() {
  if (!confirm('Sunucudaki zorluk ayarı silinsin mi? Oyun kendi değerlerine döner.')) return;
  try { await rpc('nd_admin_tune_clear'); state.tune = null; state.tuneDraft = undefined; paintTune('Silindi: oyun kendi değerleriyle oynayacak.'); } catch (e) { paintTune('', [{ field: 'sunucu', msg: friendly(e) }]); }
}

// ---------------------------------------------------------------- Street Rivals: remote settings (sr_config)
// Read and written through the sr-admin Edge Function in Street Rivals' own project: it checks this sign-in with the
// studio project (admin only) and uses that project's secret key itself; the page never sees a key.
// Rules: sr-rules.js (a generated copy of the function's own rules.js); the server checks everything again.
const SR_LABELS = {
  launch: ['Sezon 1 hangi ay', 'Oyunun sezon takvimi bu aydan başlar (her ayın 1’i yeni sezon). Öncesi de 1. sezon sayılır.'],
  races_per_ad: ['Kaç yarışta bir reklam', 'Ara reklam; portalın kendi 3 dakika sınırı ayrıca geçerli. Tam sayı, 1–30.'],
  series_levels: ['Sezon ödülü veren seri seviyeleri', 'Küçükten büyüğe 4 tam sayı, 2–1000. Ödül eşyaları bu sırayla eşleşir.'],
  series_sets: ['Hangi sezon hangi ödül setini verir', 'Boşsa n. sezon n. seti verir. Ör. 2. sezon → 3. set.'],
  'ladder.prize_base': ['Seri 1. seviye ödülü', 'Para, 50–5000.'],
  'ladder.prize_growth': ['Seviye başı ödül artışı', '1 = artmaz; 1,25 = %25 artar. 1–1,6.'],
  'ladder.flat_after': ['Artışın sabitlendiği seviye', 'Bu seviyeden sonra ödül ve giriş aşağıdaki kadar artar. Tam sayı, 5–200.'],
  'ladder.flat_step': ['O seviyeden sonra seviye başı artış', '0 = hep aynı; 0,03 = %3. 0–0,5.'],
  'ladder.boss_bonus': ['Patron maçı ödül çarpanı', '1 = normal ödül; 1,5 = yarısı kadar fazla. 1–3.'],
  'ladder.fee_fixed': ['Sabit giriş ücreti', 'Her seviyede aynı. 0 yapılırsa giriş ödüle bağlanır, 1. seviye bedava olur. Tam sayı, 0–100000.'],
  'ladder.fee_share': ['Giriş ücreti payı (sabit ücret 0 iken)', 'Giriş = ödül × bu; 0,2 = beşte biri. 0–0,9.'],
  'ladder.replay_share': ['Tekrar yarışı ödülü', 'Ödül × bu; 0,75 → 100’e girip 150 kazanır. 0–1.'],
  'off.nitro_ad': ['Reklamla ekstra nitro', ''],
  'off.refund_ad': ['Reklamla giriş ücretini geri al', ''],
  'off.double_ad': ['Reklamla parayı 2 kat al', ''],
};
const srShow = (field, v) => {
  if (v === undefined || v === null) return '—';
  if (field === 'series_levels') return Array.isArray(v) ? v.join(', ') : String(v);
  if (field === 'series_sets') { const e = v && typeof v === 'object' ? Object.entries(v) : []; return e.length ? e.map(([k, x]) => `${k}. sezon → ${x}. set`).join(', ') : 'boş (n. sezon n. set)'; }
  if (field.startsWith('off.')) return v === true ? 'kapalı' : v === false ? 'açık' : String(v);
  return typeof v === 'number' ? String(v).replace('.', ',') : String(v);
};
const srGet = (o, field) => field.split('.').reduce((x, k) => (x && typeof x === 'object' ? x[k] : undefined), o);
const srSame = (a, b) => JSON.stringify(a) === JSON.stringify(b);

async function srCall(body, retry = true) {
  const t = await token();
  let r;
  try {
    r = await fetch(SR_FN, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + t }, body: JSON.stringify(body) });
  } catch {
    throw Object.assign(new ApiError('Street Rivals sunucusundaki ayar işlevine (sr-admin) ulaşılamadı. Henüz yüklenmemiş olabilir (docs/STUDYO-PANELI.md).'), { fn: true });
  }
  if (r.status === 401 && retry) { await refresh().catch(() => {}); return srCall(body, false); }
  const j = await r.json().catch(() => null);
  if (!r.ok) {
    const e = new ApiError((j && j.message) || (r.status === 404 ? 'Street Rivals ayar işlevi (sr-admin) henüz yüklenmedi.' : `Sunucu hatası (${r.status})`));
    e.status = r.status; e.code = j && j.error; e.body = j || {};
    e.fn = r.status === 404 && !(j && j.error);
    throw e;
  }
  return j;
}
async function loadSr() {
  try { state.sr = await srCall({ action: 'get' }); state.srErr = null; state.srDraft = null; } catch (e) { state.sr = null; state.srErr = e; }
  if (onPane('sr')) paintSr();
}
/** The editor's working copy: what the server has (missing keys filled with the defaults, so every key is shown). */
function srBase() {
  const S = state.sr, D = SR.SR_DEFAULTS, c = S.config && typeof S.config === 'object' ? S.config : {};
  return { ...structuredClone(D), ...structuredClone(c), ladder: { ...D.ladder, ...(c.ladder || {}) }, off: { ...D.off, ...(c.off || {}) } };
}

function paintSr(msg = '', errs = []) {
  const el = $('#pane');
  if (!el) return;
  if (state.sr === undefined) { el.innerHTML = '<p class="muted">Yükleniyor…</p>'; loadSr(); return; }
  if (state.srErr) {
    el.innerHTML = `<h2>Ayarlar (Street Rivals)</h2><div class="warn-box" style="margin-top:12px" data-testid="sr-error">${esc(state.srErr.fn || state.srErr.status ? state.srErr.message : friendly(state.srErr))}</div>
      <p class="small muted">Bu ayarlar Street Rivals'ın kendi sunucusundadır; panel onlara "sr-admin" adlı küçük bir sunucu işleviyle ulaşır.</p>`;
    return;
  }
  const S = state.sr, D = SR.SR_DEFAULTS, server = S.config || {};
  const cur = state.srDraft || srBase();
  const rows = Object.entries(cur.series_sets || {});
  const errFor = (f) => errs.filter((e) => e.field === f || e.field.startsWith(f + '.'));
  const errHtml = (f) => errFor(f).map((e) => `<div class="field-err">${esc(e.msg)}</div>`).join('');
  const row = (field, input) => {
    const [label, hint] = SR_LABELS[field];
    const changed = !srSame(srGet(cur, field), srGet(D, field));
    return `<div class="set-row${/^series_/.test(field) ? ' stack' : ''}${changed ? ' changed' : ''}${errFor(field).length ? ' bad' : ''}" data-field="${field}">
      <div class="set-l"><b>${esc(label)}</b>${hint ? `<div class="small muted">${esc(hint)}</div>` : ''}
        <div class="small muted">Varsayılan: <b>${esc(srShow(field, srGet(D, field)))}</b> · Sunucuda: <b>${esc(srShow(field, srGet(server, field)))}</b></div>${errHtml(field)}</div>
      <div class="set-in">${input}</div></div>`;
  };
  const num = (field, step = 'any') => `<input type="number" inputmode="decimal" step="${step}" name="${field}" value="${esc(srGet(cur, field) ?? '')}" aria-label="${esc(SR_LABELS[field][0])}">`;
  const launchChanged = cur.launch !== (typeof server.launch === 'string' ? server.launch : D.launch);
  const win = S.launch_window || SR.launchWindow();
  const st = state.srStart;
  if (!win.includes(st.month)) st.month = win[0];
  const C = S.counts || { rounds: 0, season: 0, players: 0 };
  el.innerHTML = `<div class="bar-head"><h2>Ayarlar (Street Rivals)</h2><span class="muted small">Sunucu: sezon ${S.season_now ?? '—'}, tur ${S.round_now == null ? '—' : S.round_now + 1}${S.updated_at ? ` · son değişiklik ${esc(fmtDateTime(S.updated_at))}` : ''}</span></div>
    ${msg ? `<p class="ok-msg" data-testid="sr-ok">${esc(msg)}</p>` : ''}
    ${S.config && !S.valid ? `<div class="warn-box">Sunucudaki ayarlarda oyunun okumadığı değerler var (oyun onlar yerine eskisini kullanıyor). Aşağıda düzeltip kaydet: ${esc((S.errors || []).map((e) => e.field).join(', '))}</div>` : ''}
    ${errs.length ? `<div class="errors" data-testid="sr-errors"><b>Kaydedilmedi, düzelt:</b><ul>${errs.map((e) => `<li><code>${esc(e.field)}</code> ${esc(e.msg)}</li>`).join('')}</ul></div>` : ''}
    <p class="small muted">Bu ayarlar oyunu yeniden yüklemeden değişir; oyuncu oyunu bir sonraki açışında alır. Oyun kabul etmeyeceği bir değeri görmezden gelir, bu yüzden panel onu hiç kaydetmez. Her kutuda sunucudaki değer yazılı.</p>
    <form id="srForm" class="form" novalidate>
      <fieldset class="card"><legend><b>Sezon takvimi</b></legend>
        ${row('launch', `<input type="month" name="launch" value="${esc(cur.launch || '')}" placeholder="2026-10" aria-label="Sezon 1 ayı">`)}
        <div class="warn-box" data-testid="sr-launch-warn"><b>Dikkat:</b> bu ayı değiştirmek bütün oyuncuların sezon ve tur numarasını hemen kaydırır; sunucudaki sıralama da yeni takvime göre sayılır. Skorlar silinmez. Sezonu temiz başlatmak için aşağıdaki <b>Sezonu başlat</b> bölümünü kullan.
          <label class="row check" id="srLaunchOk" ${launchChanged ? '' : 'hidden'} style="margin-top:8px"><input type="checkbox" name="launchOk"> <span>Evet, sezon başlangıç ayını <b>${esc(srShow('launch', server.launch))}</b> yerine <b id="srLaunchNew">${esc(cur.launch || '')}</b> yapmak istiyorum.</span></label></div>
      </fieldset>
      <fieldset class="card"><legend><b>Reklam</b></legend>
        ${row('races_per_ad', num('races_per_ad', '1'))}
        ${['off.nitro_ad', 'off.refund_ad', 'off.double_ad'].map((f) => row(f, `<select name="${f}" aria-label="${esc(SR_LABELS[f][0])}"><option value="on" ${srGet(cur, f) === false ? 'selected' : ''}>Açık</option><option value="off" ${srGet(cur, f) === true ? 'selected' : ''}>Kapalı</option></select>`)).join('')}
      </fieldset>
      <fieldset class="card"><legend><b>Seri ödülleri</b></legend>
        ${row('series_levels', `<div class="row">${[0, 1, 2, 3].map((i) => `<input type="number" step="1" inputmode="numeric" name="series_levels.${i}" value="${esc(cur.series_levels?.[i] ?? '')}" aria-label="${i + 1}. ödül seviyesi" class="short">`).join('')}</div>`)}
        ${row('series_sets', `<div class="form" style="gap:6px">${rows.map(([k, v], i) => `<div class="row"><input type="number" step="1" name="ss_k${i}" value="${esc(k)}" aria-label="Sezon" class="short"> <span class="small">. sezon → </span> <input type="number" step="1" name="ss_v${i}" value="${esc(v)}" aria-label="Set" class="short"> <span class="small">. set</span> <button class="ghost" type="button" data-act="sr-set-x" data-i="${i}" aria-label="Satırı sil">✕</button></div>`).join('')}
          <button class="ghost" type="button" data-act="sr-set-add">+ Satır ekle</button></div>`)}
      </fieldset>
      <fieldset class="card"><legend><b>Merdiven parası</b></legend>
        ${Object.keys(SR.SR_LADDER).map((k) => row('ladder.' + k, num('ladder.' + k, SR.SR_LADDER[k][2] ? '1' : 'any'))).join('')}
      </fieldset>
      <details class="table"><summary>Kaydedilecek metin</summary><pre id="srPre"></pre></details>
      <div class="row"><button class="btn primary" type="submit">Kaydet</button>
        <button class="btn" type="button" data-act="sr-defaults">Varsayılanları doldur (ay hariç)</button>
        <button class="btn" type="button" data-act="sr-reset">Sunucudakine dön</button></div>
    </form>

    <form id="srStart" class="card danger-zone form" novalidate data-testid="sr-start">
      <h3>Sezonu başlat (skorları silerek)</h3>
      <p class="small">Sahibin kararıyla sezon, "başlat" denince sıfırlanarak başlar (docs/STREET-RIVALS-UZAK-AYAR.md). Şu an Sezon 1 ayı: <b>${esc(srShow('launch', server.launch))}</b>.</p>
      <ol class="small steps">
        <li>Sezon 1 ayı şu olur: <select name="month" aria-label="Başlangıç ayı">${win.map((m) => `<option value="${m}" ${m === st.month ? 'selected' : ''}>${m}${m === win[0] ? ' (bu ay)' : ' (gelecek ay)'}</option>`).join('')}</select></li>
        <li><b>Silinecek, geri alınamaz:</b> <b data-testid="sr-count-rounds">${fmtN(C.rounds)}</b> tur puanı (<code>sr_rounds</code>) ve <b data-testid="sr-count-season">${fmtN(C.season)}</b> sezon sıralama kaydı (<code>sr_season</code>).</li>
        <li><label class="row check"><input type="checkbox" name="players" ${st.players ? 'checked' : ''}> <span>Oyuncu adlarını da sil: <b data-testid="sr-count-players">${fmtN(C.players)}</b> oyuncu (<code>sr_players</code>). Test adları temizlenir; oyuncular ilk skorlarında yeniden kaydolur.</span></label></li>
        <li>Sonra sunucu kendi saatine göre kontrol eder: 1. sezon ve ayın turu.</li>
      </ol>
      <p class="note">Kendi test cihazındaki ilerleme (rütbe, seri seviyeleri, para) o cihazda kalır; temiz başlamak için tarayıcıda site verilerini sil.</p>
      <label class="f"><span>Onay için şunu yaz: <code id="srPhrase">${esc(SR.startPhrase(st.month))}</code></span><input name="phrase" autocomplete="off" autocapitalize="characters" spellcheck="false" value="${esc(st.phrase)}"></label>
      <div class="row"><button class="btn danger-solid" type="submit" ${SR.phraseOk(st.phrase, st.month) ? '' : 'disabled'}>Sil ve sezonu başlat</button></div>
    </form>`;

  const f = $('#srForm');
  const E = (n) => f.elements.namedItem(n);
  const numOf = (n) => { const v = E(n).value.trim(); return v === '' ? undefined : Number(v); };
  const read = () => {
    const v = {
      launch: E('launch').value.trim(),
      races_per_ad: numOf('races_per_ad'),
      series_levels: [0, 1, 2, 3].map((i) => numOf(`series_levels.${i}`)),
      series_sets: {},
      ladder: Object.fromEntries(Object.keys(SR.SR_LADDER).map((k) => [k, numOf('ladder.' + k)])),
      off: Object.fromEntries(SR.SR_OFF.map((k) => [k, E('off.' + k).value === 'off'])),
    };
    rows.forEach((_, i) => { const k = E('ss_k' + i).value.trim(); v.series_sets[k || `?${i}`] = numOf('ss_v' + i); });
    return v;
  };
  const show = () => {
    const v = read();
    $('#srPre').textContent = JSON.stringify(v, null, 1);
    const lc = v.launch !== (typeof server.launch === 'string' ? server.launch : D.launch);
    $('#srLaunchOk').hidden = !lc;
    $('#srLaunchNew').textContent = v.launch;
  };
  state.srRead = read;
  f.oninput = show;
  show();
  f.onsubmit = async (ev) => {
    ev.preventDefault();
    const v = read();
    state.srDraft = v;
    const c = SR.checkSrConfig(v);
    const lc = v.launch !== (typeof server.launch === 'string' ? server.launch : D.launch);
    const errs2 = c.ok ? [] : c.errors.slice();
    if (c.ok && lc && !E('launchOk').checked) errs2.push({ field: 'launch', msg: 'Sezon başlangıç ayı değişiyor: onay kutusunu işaretle.' });
    if (errs2.length) return paintSr('', errs2);
    try {
      const r = await srCall({ action: 'set', value: c.value, updated_at: S.updated_at, confirm_launch: lc });
      Object.assign(state.sr, { config: r.config, updated_at: r.updated_at, valid: true, errors: [] });
      state.srDraft = null;
      paintSr('Kaydedildi. Oyuncular bir sonraki açılışta alır.');
    } catch (e) {
      paintSr('', e.body?.errors?.length ? e.body.errors : [{ field: 'sunucu', msg: e.message }]);
    }
  };

  const s = $('#srStart');
  const syncStart = () => {
    st.month = s.month.value; st.players = s.players.checked; st.phrase = s.phrase.value;
    $('#srPhrase').textContent = SR.startPhrase(st.month);
    s.querySelector('button[type=submit]').disabled = !SR.phraseOk(st.phrase, st.month);
  };
  s.oninput = syncStart;
  s.onchange = syncStart;
  s.onsubmit = async (ev) => {
    ev.preventDefault();
    syncStart();
    if (!SR.phraseOk(st.phrase, st.month)) return;
    s.querySelector('button[type=submit]').disabled = true;
    try {
      const r = await srCall({ action: 'start_season', month: st.month, confirm: st.phrase, delete_players: st.players, expect: C });
      Object.assign(state.sr, { config: r.config, updated_at: r.updated_at, valid: true, errors: [], season_now: r.season_now, round_now: r.round_now,
        counts: { rounds: 0, season: 0, players: st.players ? 0 : C.players } });
      state.srDraft = null;
      state.srStart = { month: '', players: false, phrase: '' };
      paintSr(`Sezon başladı: Sezon 1 ayı ${r.launch}. Silinen: ${fmtN(r.deleted.rounds)} tur puanı, ${fmtN(r.deleted.season)} sezon kaydı${st.players ? `, ${fmtN(r.deleted.players)} oyuncu` : ''}. Sunucu kontrolü: sezon ${r.season_now ?? '—'}, tur ${r.round_now == null ? '—' : r.round_now + 1}.`);
    } catch (e) {
      if (e.code === 'counts_changed' && e.body.counts) { state.sr.counts = e.body.counts; st.phrase = ''; return paintSr('', [{ field: 'sezon', msg: e.message }]); }
      if (e.code === 'partial') { await loadSr(); if (!onPane('sr')) return; }
      paintSr('', [{ field: 'sezon', msg: e.message }]);
    }
  };
}

// ================================================================== the app and notifications (studio page → Bildirimler)
// supabase/studio/push.sql (st_push_list / save / delete / prefs), supabase/functions/studio-notify (sends; test button)
const PUSH_TYPES = [
  ['ranked', 'Dereceli maçlar', 'Sezonun ilk dereceli maçı; sonra saatte en çok bir kez "N dereceli maç oynandı" (Shadow Duel).'],
  ['errors', 'Yeni hata', 'Bir oyunda daha önce görülmemiş bir hata türü çıkınca (her tür bir kez).'],
  ['live', 'Canlı oyuncu', 'Bir oyunda şu an oynayan kişi 10, 25, 50 ya da 100\'ü geçince (her eşik günde bir kez).'],
  ['new_game', 'Yeni oyun', 'Listeye oyuncusu gelen yeni bir oyun eklenince.'],
  ['daily', 'Günün özeti', 'Her akşam 21:00\'de (Türkiye saati): oyun oyun oyuncu, oturum, ortalama süre, dereceli maç, yeni hata; sistemde sarı ya da kırmızı olanlar.'],
  ['system', 'Sistem sorunu', 'Sistem kontrollerinden biri kırmızıya dönünce hemen (sunucu, siteler, güvenlik; Stüdyo → Sistem).'],
];
const pushDevices = () => (state.push && Array.isArray(state.push.devices) ? state.push.devices : []);
const thisDevice = () => (state.thisKey ? pushDevices().find((d) => d.key === state.thisKey) || null : null);
async function loadPush() {
  state.pushLoading = true;
  try { state.push = await rpc('st_push_list'); state.pushErr = null; } catch (e) { state.pushErr = e; state.push = null; }
  let sub = null;
  try { sub = await PWA.currentSubscription(); state.thisKey = sub ? await PWA.endpointKey(sub.endpoint) : ''; } catch { state.thisKey = ''; }
  // this browser has a subscription the server does not know (renewed by the browser, or removed after a failed send):
  // save it again when this device had notifications on
  if (sub && state.push && !thisDevice() && store.get('studio.push') === '1' && PWA.permission() === 'granted') {
    try { state.push = await rpc('st_push_save', { p: { ...PWA.subJson(sub), label: PWA.deviceLabel() } }); } catch { /* shown as off */ }
  }
  state.pushLoading = false;
  if (onPane('notify', 'studio')) paintNotify();
}
function installHtml() {
  const s = PWA.installState();
  if (s === 'app') return '<p data-testid="install-state" data-state="app">✓ Panel bu cihazda uygulama olarak açık.</p>';
  if (s === 'prompt') return `<p data-testid="install-state" data-state="prompt">Paneli bu cihaza uygulama olarak ekle: ana ekranda simgesi olur, tam ekran ve hızlı açılır.</p>
    <button class="btn primary" type="button" data-act="install">Uygulamayı yükle</button>`;
  if (s === 'ios') return `<div data-testid="install-state" data-state="ios"><ol class="steps">
      <li>Bu sayfayı <b>Safari</b>'de aç; alttaki <b>Paylaş</b> düğmesine dokun (kare ve yukarı ok).</li>
      <li><b>Ana Ekrana Ekle</b>'yi seç, sonra <b>Ekle</b>.</li>
      <li>Ana ekrandaki <b>Panel</b> simgesinden aç; bildirimleri oradan aç.</li></ol>
    <p class="small muted">iPhone'da bildirim için iOS 16.4 ya da daha yenisi gerekir ve panel ana ekrandaki simgeden açılmış olmalı.</p></div>`;
  if (s === 'manual') return '<p data-testid="install-state" data-state="manual">Tarayıcının menüsünden (⋮) <b>Ana ekrana ekle</b> ya da <b>Uygulamayı yükle</b>\'yi seç.</p>';
  return '<p data-testid="install-state" data-state="other">Telefonda bu adresi aç: Android\'de "Uygulamayı yükle" düğmesi çıkar, iPhone\'da Paylaş → Ana Ekrana Ekle. Bilgisayarda Chrome / Edge adres çubuğundaki yükle simgesiyle de eklenebilir.</p>';
}
/** A small note on the overview until the panel is installed (or the note is closed). */
function paintInstallHint() {
  const el = $('#s-install');
  if (!el) return;
  const s = PWA.installState();
  if (!['prompt', 'ios'].includes(s) || store.get('studio.installHint') === 'off') { el.innerHTML = ''; return; }
  el.innerHTML = `<div class="note install-hint" data-testid="install-hint"><span>📱 Paneli telefona uygulama olarak ekleyebilirsin; bildirimler de oradan açılır.</span>
    ${s === 'prompt' ? '<button class="btn primary" type="button" data-act="install">Uygulamayı yükle</button>' : '<a class="btn" href="#/bildirimler">Nasıl?</a>'}
    <button class="ghost x" type="button" data-act="install-hide" aria-label="Bu notu kapat">✕</button></div>`;
}
function paintNotify(msg = state.pushMsg) {
  const el = $('#pane');
  if (!el || !onPane('notify', 'studio')) return;
  state.pushMsg = msg || '';
  const head = '<div class="bar-head"><h2>Uygulama ve bildirimler</h2></div>';
  const app = `<article class="card" data-testid="install-card"><h3 class="card-h">Uygulama</h3>${installHtml()}</article>`;
  const note = state.pushMsg ? `<p class="note" role="status" data-testid="push-msg">${esc(state.pushMsg)}</p>` : '';
  let dev;
  const P = state.push;
  if (state.pushErr) dev = `<div class="warn-box" data-testid="push-error">${esc(friendly(state.pushErr))}${state.pushErr.missing ? ' (Bildirimler: supabase/studio/push.sql.)' : ''}</div>`;
  else if (!P) { dev = '<p class="muted">Yükleniyor…</p>'; if (!state.pushLoading) loadPush(); }
  else if (!PWA.pushSupported()) {
    dev = PWA.isIOS() && !PWA.isStandalone()
      ? '<p data-testid="push-state" data-state="ios-install">iPhone\'da bildirim için önce paneli ana ekrana ekle (yukarıda), sonra ana ekrandaki <b>Panel</b> simgesinden açıp buraya gel.</p>'
      : '<p data-testid="push-state" data-state="unsupported">Bu tarayıcı bildirim göstermiyor. Android\'de Chrome, iPhone\'da ana ekrana eklenmiş paneli kullan.</p>';
  } else if (PWA.permission() === 'denied') {
    dev = `<p data-testid="push-state" data-state="denied">Bu cihazda bildirim izni kapalı. ${PWA.isIOS() ? 'Ayarlar → Bildirimler → Panel' : 'Telefonun ayarlarında uygulamalar (ya da tarayıcı) → Bildirimler'} bölümünden izin ver, sonra bu sayfayı yenile.</p>`;
  } else if (!thisDevice()) {
    dev = `<p data-testid="push-state" data-state="off">Bu cihazda bildirim kapalı.</p>
      <button class="btn primary" type="button" data-act="push-on" ${state.pushBusy ? 'disabled' : ''}>Bu cihazda bildirimleri aç</button>
      <p class="small muted">Dokununca telefon izin sorar. İzin verince aşağıdaki türler bu cihaza gelir; panel kapalıyken de.</p>`;
  } else {
    const d = thisDevice(), pf = d.prefs || {};
    dev = `<p data-testid="push-state" data-state="on">✓ Bu cihaz bildirim alıyor <span class="muted small">(${esc(d.label || PWA.deviceLabel())})</span></p>
      <div class="row"><button class="btn primary" type="button" data-act="push-test" ${state.pushBusy ? 'disabled' : ''}>Deneme bildirimi gönder</button>
        <button class="btn" type="button" data-act="push-off" ${state.pushBusy ? 'disabled' : ''}>Bu cihazda kapat</button></div>
      <div class="sub-h">Bu cihaza gelenler</div>
      <div class="push-types" data-testid="push-types">${PUSH_TYPES.map(([k, t, why]) => `<label class="row check"><input type="checkbox" data-act="push-pref" data-type="${k}" ${pf[k] === false ? '' : 'checked'}>
        <span><b>${esc(t)}</b><br><span class="small muted">${esc(why)}</span></span></label>`).join('')}</div>`;
  }
  const list = pushDevices();
  const devices = P ? `<article class="card" data-testid="push-devices"><h3 class="card-h">Cihazlarım</h3>${list.length ? `<ul class="devices">${list.map((d) => `<li data-key="${esc(d.key)}">
      <div class="grow"><b>${esc(d.label || 'Cihaz')}</b>${d.key === state.thisKey ? ' <span class="badge on">bu cihaz</span>' : ''}
        <div class="kv"><span>eklendi ${esc(fmtDate(d.created_at))}</span><span>${d.last_ok_at ? `son bildirim ${esc(fmtDateTime(d.last_ok_at))}` : 'henüz bildirim gitmedi'}</span>${d.fails ? `<span class="badge del">${fmtN(d.fails)} kez ulaşmadı</span>` : ''}</div></div>
      <button class="ghost" type="button" data-act="push-del" data-key="${esc(d.key)}">Kaldır</button></li>`).join('')}</ul>` : '<p class="muted small">Henüz hiçbir cihazda açık değil.</p>'}
      <p class="small muted">Her telefon ve tarayıcı ayrı açılır. Kaldırılan cihaza bir daha bildirim gitmez.</p></article>` : '';
  el.innerHTML = head + `<div class="notify">${app}${note}
    <article class="card" data-testid="push-card"><h3 class="card-h">Bildirimler</h3>${dev}</article>
    ${devices}
    <article class="card"><h3 class="card-h">Ne zaman gelir?</h3><ul class="small push-when">${PUSH_TYPES.map(([, t, why]) => `<li><b>${esc(t)}:</b> ${esc(why)}</li>`).join('')}</ul>
      <p class="small muted">Bildirime dokununca panel ilgili sayfada açılır. Telefonun "Rahatsız Etmeyin" modu bunları da susturur. Kapatmak için yukarıdaki kutular ya da "Bu cihazda kapat".</p></article></div>`;
}
/** The server's public key; when it is not made yet, studio-notify makes the pair (admin only) and the list is read again. */
async function pushKey() {
  if (state.push && state.push.vapid_public) return state.push.vapid_public;
  const t = await token();
  const r = await fetch(PUSH_FN, { method: 'POST', headers: { apikey: API.key, Authorization: 'Bearer ' + t, 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'ensure' }) });
  const j = await r.json().catch(() => ({}));
  if (r.status === 404 && !j.error) throw new Error('no-function');
  if (!r.ok) throw new Error(j.message || `sunucu ${r.status}`);
  state.push = await rpc('st_push_list');
  if (!state.push || !state.push.vapid_public) throw new Error('no-key');
  return state.push.vapid_public;
}
function pushOn() {
  if (!state.push || state.pushBusy) return;
  const asked = PWA.subscribe(pushKey()); // the permission question must start in the tap itself
  state.pushBusy = true;
  paintNotify('İzin isteniyor…');
  asked.then(async (sub) => {
    const v = await rpc('st_push_save', { p: { ...PWA.subJson(sub), label: PWA.deviceLabel() } });
    state.push = v;
    state.thisKey = await PWA.endpointKey(sub.endpoint);
    store.set('studio.push', '1');
    state.pushBusy = false;
    paintNotify('Bildirimler bu cihazda açıldı. "Deneme bildirimi gönder" ile dene.');
  }).catch((e) => {
    state.pushBusy = false;
    const m = e && e.message;
    paintNotify(m === 'denied' ? 'İzin verilmedi. Telefonun ayarlarından bu uygulamaya / tarayıcıya bildirim izni verip yeniden dene.'
      : m === 'unsupported' ? 'Bu tarayıcı bildirim desteklemiyor.'
        : m === 'no-function' ? 'Bildirim işlevi (studio-notify) henüz sunucuya yüklenmedi.'
          : m === 'no-key' ? 'Bildirim anahtarı henüz hazır değil; biraz sonra yeniden dene.'
        : e instanceof ApiError ? 'Kaydedilemedi: ' + friendly(e) : 'Açılamadı: ' + (m || 'bilinmeyen hata'));
  });
}
async function pushOff(key = state.thisKey) {
  state.pushBusy = true;
  paintNotify('');
  try {
    if (key && key === state.thisKey) { await PWA.unsubscribe(); store.del('studio.push'); state.thisKey = ''; }
    if (key) state.push = await rpc('st_push_delete', { p_key: key });
    state.pushBusy = false;
    paintNotify(key ? 'Kaldırıldı.' : '');
  } catch (e) { state.pushBusy = false; paintNotify('Olmadı: ' + friendly(e)); }
}
async function pushTest() {
  state.pushBusy = true;
  paintNotify('Gönderiliyor…');
  let msg;
  try {
    const t = await token();
    const r = await fetch(PUSH_FN, { method: 'POST', headers: { apikey: API.key, Authorization: 'Bearer ' + t, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'test', key: state.thisKey || undefined }) });
    const j = await r.json().catch(() => ({}));
    if (r.status === 404 && !j.error) msg = 'Bildirim işlevi (studio-notify) henüz sunucuya yüklenmedi.';
    else if (!r.ok) msg = j.message || `Gönderilemedi (${r.status}).`;
    else if (j.delivered > 0) msg = 'Gönderildi. Birkaç saniye içinde bu cihaza gelmeli.';
    else if (j.gone > 0) {
      // the push service no longer knows this browser's subscription: the server removed it; drop it here too
      if (j.devices === 1 && state.thisKey) { await PWA.unsubscribe(); state.thisKey = ''; }
      msg = 'Bu cihazın bildirim kaydı geçersiz çıktı ve silindi. "Bu cihazda bildirimleri aç" ile yeniden aç.';
    }
    else msg = 'Telefonun bildirim servisi şu an kabul etmedi; biraz sonra yeniden dene.';
    if (r.ok) { try { state.push = await rpc('st_push_list'); } catch { /* the list stays as it was */ } } // "son bildirim", removed devices
  } catch (e) { msg = 'Gönderilemedi: ' + ((e && e.message) || 'bağlantı yok'); }
  state.pushBusy = false;
  paintNotify(msg);
}
async function pushPrefs() {
  const prefs = {};
  document.querySelectorAll('[data-act="push-pref"]').forEach((c) => { prefs[c.dataset.type] = c.checked; });
  try { state.push = await rpc('st_push_prefs', { p_key: state.thisKey, p_prefs: prefs }); paintNotify('Kaydedildi.'); } catch (e) { paintNotify('Kaydedilemedi: ' + friendly(e)); }
}
function onSwMessage(d) {
  if (d.type === 'open') openHash(d.hash);
  else if (d.type === 'updated' && !$('#updbar')) {
    document.body.insertAdjacentHTML('beforeend', '<div id="updbar" class="updbar" role="status">Panel güncellendi <button class="btn primary" type="button" data-act="reload">Yenile</button></div>');
  }
}
PWA.onChange(() => { paintInstallHint(); if (onPane('notify', 'studio')) paintNotify(); });

// ------------------------------------------------------------------ events
document.addEventListener('click', async (ev) => {
  const b = ev.target.closest('[data-act]');
  if (!b) return;
  const a = b.dataset.act;
  if (a === 'push-on') pushOn(); // first: the permission question must start inside the tap
  else if (a.startsWith('sys-') && SYS.click(a, b)) { /* the Sistem section */ }
  else if (a === 'theme') cycleTheme();
  else if (a === 'refresh') { refreshNow('user'); loadLive(); }
  else if (a === 'logout') logout();
  else if (a === 'push-off') pushOff();
  else if (a === 'push-del') { if (b.dataset.key === state.thisKey || confirm('Bu cihaza bir daha bildirim gitmesin mi?')) pushOff(b.dataset.key); }
  else if (a === 'push-test') pushTest();
  else if (a === 'install') PWA.promptInstall();
  else if (a === 'install-hide') { store.set('studio.installHint', 'off'); paintInstallHint(); }
  else if (a === 'reload') location.reload();
  else if (a === 'sub') { state.sub[state.page] = b.dataset.sub; store.set('studio.sub', JSON.stringify(state.sub)); render(); }
  else if (a === 'days') { state.days = +b.dataset.days; store.set('studio.days', String(state.days)); paintPeriod(); loadSummary(); }
  else if (a === 'plan-new') openPlan(null);
  else if (a === 'plan-edit') openPlan(state.plans.find((p) => p.id === +b.dataset.id));
  else if (a === 'plan-filter') { state.planFilter = b.dataset.status; paintPlans(); }
  else if (a === 'todo-view') { state.todoView = b.dataset.view; store.set('studio.todoView', state.todoView); paintTodo(); }
  else if (a === 'plan-view') openPlanView(state.plans.find((p) => p.id === +b.dataset.id));
  else if (a === 'plan-move' && b.dataset.to) {
    b.disabled = true;
    try { await rpc('st_plan_status', { p_id: +b.dataset.id, p_status: b.dataset.to }); await loadPlans(); } catch (e) { alert(friendly(e)); b.disabled = false; }
  }
  else if (a === 'dlg-close') $('#dlg').close();
  else if (a === 'reward-new') openReward(null);
  else if (a === 'reward-edit') openReward(state.rewards.find((w) => w.id === b.dataset.id));
  else if (a === 'reward-kind') { state.rewardKind = b.dataset.kind; paintRewards(); }
  else if (a === 'reward-active' || a === 'reward-delete' || a === 'reward-restore') {
    if (a === 'reward-delete' && !confirm('Bu ödül silinsin mi? (Geri alınabilir; sahip olanlar kaybetmez.)')) return;
    b.disabled = true;
    try {
      if (a === 'reward-active') await rpc('nd_admin_reward_active', { p_id: b.dataset.id, p_active: b.dataset.on === '1' });
      else await rpc(a === 'reward-delete' ? 'nd_admin_reward_delete' : 'nd_admin_reward_restore', { p_id: b.dataset.id });
      await loadRewards();
    } catch (e) { alert(serverFieldMsg(e) === 'Sunucu kabul etmedi: in_season alanı.' ? 'Bir sezon bu ödülü veriyor: önce Sezon sekmesinden çıkar.' : serverFieldMsg(e)); b.disabled = false; }
  }
  else if (a === 'sr-set-add' || a === 'sr-set-x' || a === 'sr-defaults' || a === 'sr-reset') {
    if (a === 'sr-reset') { state.srDraft = null; return paintSr(); }
    const v = state.srRead();
    if (a === 'sr-defaults') { state.srDraft = { ...structuredClone(SR.SR_DEFAULTS), launch: v.launch }; return paintSr('Varsayılan değerler dolduruldu (Sezon 1 ayı aynı kaldı). Kaydetmek için Kaydet.'); }
    const e = Object.entries(v.series_sets);
    if (a === 'sr-set-x') e.splice(+b.dataset.i, 1);
    else { const n = Math.max(0, ...e.map(([k]) => Number(k) || 0)) + 1; e.push([String(n), n]); }
    state.srDraft = { ...v, series_sets: Object.fromEntries(e) };
    paintSr();
  }
  else if (a === 'err-days') { state.errDays = +b.dataset.days; store.set('studio.errDays', String(state.errDays)); state.errOpen = ''; paintErrors(); }
  else if (a === 'err-open') { state.errOpen = state.errOpen === b.dataset.sig ? '' : b.dataset.sig; paintErrors(); }
  else if (a === 'rk-refresh') { state.ranked = null; state.rankedErr = null; state.rkOld = false; Object.assign(state.rk, { view: null, err: null }); paintRanked(); }
  else if (['rk-season', 'rk-period', 'rk-sort', 'rk-pl-page', 'rk-mt-page', 'rk-kind', 'rk-mplayer-x', 'rk-mplayer', 'rk-pm-page'].includes(a)) rkAct(a, b);
  else if (a === 'rk-player') openRankedPlayer(b.dataset.id);
  else if (a === 'rk-all') { state.rkAll = true; const x = $('#rkBoard'); if (x && state.ranked) x.innerHTML = rkBoard(state.ranked.board || []); }
  else if (a === 'tune-level') { if (state.tuneBuild) state.tuneDraft = state.tuneBuild(); state.tuneLevel = b.dataset.level; paintTune(); }
});
document.addEventListener('change', (ev) => {
  if (ev.target.matches('[data-act="archived"]')) { state.showArchived = ev.target.checked; paintPlans(); }
  else if (ev.target.matches('[data-act="push-pref"]')) pushPrefs();
});
window.matchMedia('(max-width: 760px)').addEventListener?.('change', () => { if (onPane('plans')) paintPlans(); });

// ------------------------------------------------------------------ start
applyTheme();
PWA.registerSW(onSwMessage);
const linkErr = readMagicLink();
if (linkErr) renderLogin('Bağlantı olmadı: ' + linkErr);
else if (session) afterLogin();
else renderLogin();
export const __test = { state, checkReward: V.checkReward, RINGS };
