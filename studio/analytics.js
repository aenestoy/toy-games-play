// Studio panel — the statistics area ("İstatistik" on a game page, "Genel bakış" on the studio page; docs/STUDYO-PANELI.md).
// A small analytics tool: period presets and custom ranges (Turkey time), hour / day / week / month, comparison with the
// period before, one filter at a time; tabs. The settings live in the address (#/oyun/<game>?a=genel&p=7d&g=day&c=1…),
// so a link opens the same view and the back button works. One server call per tab view (supabase/studio/stats4.sql:
// st_analytics, st_an_live); the tabs not rebuilt yet show the earlier sections (stats2.sql) through app.js.
// No outside library: charts are small inline SVG.

import * as CH from './charts.js';
import * as SESS from './sessions.js';
import * as KF from './kf-stages.js';
import * as PR from './play-report.js';
import * as RBC from './rb-cards.js';
import * as RBP from './rb-players.js';

let C = null; // what app.js lends: rpc, formatters, labels, the earlier sections (init)
export function init(ctx) { C = ctx; CH.init(ctx); SESS.init(ctx); KF.init({ ...ctx, info, csvButton, fileName }); PR.init({ ...ctx, info, csvButton, fileName }); RBC.init({ ...ctx, info, csvButton, fileName }); RBP.init({ ...ctx, info }); }

// ------------------------------------------------------------------ settings
const TABS_GAME = [['canli', 'Canlı'], ['genel', 'Genel bakış'], ['grafik', 'Grafikler'], ['platformlar', 'Platformlar'], ['oyuncular', 'Oyuncular'], ['etkilesim', 'Etkileşim'], ['huni', 'Huni'],
  ['donus', 'Geri dönüş'], ['kaynaklar', 'Kaynaklar'], ['surumler', 'Sürümler'], ['gelir', 'Gelir'], ['teknik', 'Teknik']];
const TABS_STUDIO = [['canli', 'Canlı'], ['genel', 'Genel bakış'], ['grafik', 'Grafikler'], ['platformlar', 'Platformlar'], ['oyuncular', 'Oyuncular'], ['kaynaklar', 'Kaynaklar'], ['oyunlar', 'Oyunlar'], ['gelir', 'Gelir']];
const PERIODS = [['live', 'Canlı'], ['today', 'Bugün'], ['yday', 'Dün'], ['7d', 'Son 7 gün'], ['14d', 'Son 14 gün'], ['30d', 'Son 30 gün'],
  ['tw', 'Bu hafta'], ['lw', 'Geçen hafta'], ['tm', 'Bu ay'], ['lm', 'Geçen ay'], ['all', 'Tüm zamanlar'], ['c', 'Özel aralık']];
const GRANS = [['hour', 'Saat'], ['day', 'Gün'], ['week', 'Hafta'], ['month', 'Ay']];
const DIMS = [['portal', 'Portal'], ['device', 'Cihaz'], ['country', 'Ülke'], ['ver', 'Sürüm'], ['lang', 'Dil'], ['browser', 'Tarayıcı']];
// tabs whose numbers follow the filter (the rollups keep one property at a time); some only for some properties
const FILTERABLE = new Set(['genel', 'oyuncular', 'huni', 'donus', 'gelir']);
const FILTER_DIMS = { huni: ['portal', 'ver'], donus: ['ver', 'portal', 'device'], gelir: ['portal'] };
const FIRST_DAY = '2026-09-30'; // statistics began
const LIVE_MS = 15000;
const DATA_MS = 60000;
const CACHE_MS = 60000;
const STORE = 'studio.an.v1';

// ------------------------------------------------------------------ dates (YYYY-MM-DD, Europe/Istanbul)
const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const add = (d, n) => new Date(Date.parse(d + 'T12:00:00Z') + n * 864e5).toISOString().slice(0, 10);
const diff = (a, b) => Math.round((Date.parse(a + 'T12:00:00Z') - Date.parse(b + 'T12:00:00Z')) / 864e5);
const monday = (d) => add(d, -((new Date(d + 'T12:00:00Z').getUTCDay() + 6) % 7));
const mStart = (d) => d.slice(0, 8) + '01';
const mEnd = (d) => add(mStart(add(mStart(d), 32)), -1);
const isDay = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s + 'T12:00:00Z'));
const dLabel = (d) => C.dayLabel(d);
const rangeLabel = (f, t) => (f === t ? dLabel(f) : `${dLabel(f)} – ${dLabel(t)}`);

/** the period's first and last day */
export function periodRange(p, from, to, t = today(), since = FIRST_DAY) {
  switch (p) {
    case 'today': case 'live': return [t, t];
    case 'yday': return [add(t, -1), add(t, -1)];
    case '7d': return [add(t, -6), t];
    case '14d': return [add(t, -13), t];
    case '30d': return [add(t, -29), t];
    case 'tw': return [monday(t), t];
    case 'lw': return [add(monday(t), -7), add(monday(t), -1)];
    case 'tm': return [mStart(t), t];
    case 'lm': return [mStart(add(mStart(t), -1)), add(mStart(t), -1)];
    case 'all': { const f = since > add(t, -399) ? since : add(t, -399); return [f < t ? f : t, t]; }
    default: {
      let f = isDay(from) ? from : add(t, -6), e = isDay(to) ? to : t;
      if (e > t) e = t;
      if (f > e) f = e;
      if (diff(e, f) > 399) f = add(e, -399);
      return [f, e];
    }
  }
}
/** granularities that make sense for a range (hour: at most 7 days within the last 35) */
export function grans(from, to, t = today()) {
  const n = diff(to, from) + 1;
  return GRANS.filter(([g]) => (g === 'hour' ? n <= 7 && from >= add(t, -35) : g === 'week' ? n >= 14 : g === 'month' ? n >= 60 : true)).map(([g]) => g);
}
const defaultGran = (from, to) => { const n = diff(to, from) + 1; return n <= 2 && grans(from, to).includes('hour') ? 'hour' : n <= 62 ? 'day' : n <= 200 ? 'week' : 'month'; };
/** one step back or forward: a day, a week, a month, or the range's own length */
export function stepRange(p, from, to, dir) {
  if (p === 'tm' || p === 'lm' || (from === mStart(from) && to === mEnd(from))) {
    const f = mStart(add(mStart(from), dir < 0 ? -1 : 32));
    return [f, mEnd(f)];
  }
  const n = diff(to, from) + 1;
  if (p === 'tw' || (n === 7 && from === monday(from))) { const f = add(monday(from), 7 * dir); return [f, add(f, 6)]; }
  return [add(from, n * dir), add(to, n * dir)];
}

// ------------------------------------------------------------------ state (kept in the address)
const S = {
  game: null, el: null, tab: 'genel', p: '7d', from: '', to: '', g: '', c: true, f: '', m: 'dau', d: 'portal', sort: { k: 'sessions', dir: -1 },
  since: FIRST_DAY, cache: new Map(), seq: 0, live: null, liveErr: null, liveTimer: 0, ranked: null, rankedAt: 0, err: null,
};
const tabsOf = () => (S.game ? TABS_GAME : TABS_STUDIO);
function readStored() { try { return JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch { return {}; } }
function store() { try { localStorage.setItem(STORE, JSON.stringify({ p: S.p, from: S.from, to: S.to, g: S.g, c: S.c, m: S.m, d: S.d })); } catch { /* private mode */ } }
/** read the settings from the address (a=tab, p=period, from/to, g=granularity, c=compare, f=dim:key, m=metric, d=sources property) */
function readHash() {
  const q = new URLSearchParams((location.hash.split('?')[1]) || '');
  if (!q.has('a') && !q.has('p')) return false;
  const tabs = tabsOf().map((t) => t[0]);
  if (tabs.includes(q.get('a'))) S.tab = q.get('a');
  if (PERIODS.some(([k]) => k === q.get('p'))) S.p = q.get('p');
  S.from = q.get('from') || ''; S.to = q.get('to') || '';
  S.g = q.get('g') || '';
  S.c = q.get('c') !== '0';
  const f = q.get('f') || '';
  S.f = /^(portal|device|country|ver|lang|browser):[^:]{1,64}$/.test(f) ? f : '';
  if (q.get('m')) S.m = q.get('m');
  if (DIMS.some(([k]) => k === q.get('d'))) S.d = q.get('d');
  S.pl = q.get('pl') || 'genel';
  return true;
}
function query() {
  const q = new URLSearchParams();
  q.set('a', S.tab);
  q.set('p', S.p);
  if (S.p === 'c') { q.set('from', S.from); q.set('to', S.to); }
  if (S.g) q.set('g', S.g);
  q.set('c', S.c ? '1' : '0');
  if (S.f) q.set('f', S.f);
  if (S.tab === 'genel' && S.m !== 'dau') q.set('m', S.m);
  if (S.tab === 'kaynaklar' && S.d !== 'portal') q.set('d', S.d);
  if (S.tab === 'platformlar' && S.pl && S.pl !== 'genel') q.set('pl', S.pl);
  return q.toString();
}
/** settle the period, range and granularity after a change */
function settle() {
  if (S.tab === 'canli') S.p = 'live';
  else if (S.p === 'live') S.p = 'today';
  const [f, t] = periodRange(S.p, S.from, S.to, today(), S.since);
  S.from = f; S.to = t;
  const ok = grans(f, t);
  if (!ok.includes(S.g)) S.g = defaultGran(f, t);
}
/** write the settings into the address: a new history entry (push) or in place */
function setHash(push = true) {
  settle();
  store();
  const h = `${C.pageHash(S.game || 'studio')}?${query()}`;
  if (location.hash === h) { paint(); return; }
  if (push) location.hash = h; // → hashchange → app.js → onHash()
  else { history.replaceState(null, '', location.pathname + location.search + h); paint(); }
}

// ------------------------------------------------------------------ entry points (app.js)
/** draw the statistics area into the pane: game id, or null for every game */
export function mount(el, game) {
  const again = S.el && S.game === game;
  S.el = el; S.game = game;
  S.cache.clear(); // opening the section always shows fresh numbers
  if (!readHash() && !again) { const st = readStored(); Object.assign(S, { p: st.p || S.p, from: st.from || '', to: st.to || '', g: st.g || '', c: st.c !== false, m: st.m || 'dau', d: st.d || 'portal' }); }
  if (!tabsOf().some(([k]) => k === S.tab)) S.tab = 'genel';
  el.innerHTML = `<div class="an" data-testid="an"><div class="an-tabs" role="tablist" aria-label="İstatistik bölümleri" id="anTabs"></div>
    <div class="an-bar" id="anBar"></div>
    <div id="anNote"></div><div id="anBody" class="an-body"></div></div>`;
  const top = document.querySelector('.top');
  if (top) document.documentElement.style.setProperty('--an-top', `${top.offsetHeight}px`);
  setHash(false);
}
/** the address changed while the area is open: true when it was only the settings (app.js then skips a full redraw) */
export function onHash() {
  if (!S.el || !S.el.isConnected) return false;
  const base = location.hash.split('?')[0];
  if (base !== C.pageHash(S.game || 'studio')) return false;
  if (!location.hash.includes('?')) return false;
  readHash();
  settle();
  paint();
  return true;
}
export const __test = { periodRange, grans, stepRange, S };
/** how often the open tab wants fresh numbers (app.js refreshes the visible section): Canlı 15 s, the rest 60 s */
export const interval = () => (S.tab === 'canli' ? LIVE_MS : DATA_MS);
/** fetch the open tab again (the ⟳ button, the timer, the app coming back) */
export function refresh() {
  if (!S.el || !S.el.isConnected) return Promise.resolve();
  const body = document.getElementById('anBody');
  if (!body) return Promise.resolve();
  if (S.tab === 'canli') return loadLive();
  if (S.tab === 'oyunlar') return C.legacy.loadTrends();
  if (S.tab === 'grafik') return CH.refresh();
  S.force = true;
  try { paintTabBody(body); } finally { S.force = false; }
  return Promise.resolve();
}
/** when the numbers on screen came (for "son yenileme") */
export const loadedAt = () => (S.tab === 'canli' ? S.liveAt || 0 : S.tab === 'grafik' ? CH.loadedAt() : S.loadedAt || 0);

// ------------------------------------------------------------------ paint
function paint() {
  if (!S.el || !S.el.isConnected) return;
  stopLiveTimer();
  paintBar();
  paintTabs();
  const note = document.getElementById('anNote');
  if (note) {
    const dim = S.f ? S.f.split(':')[0] : '';
    const off = S.f && S.tab !== 'canli' && S.tab !== 'oyunlar' && S.tab !== 'grafik' && (!FILTERABLE.has(S.tab) || (FILTER_DIMS[S.tab] && !FILTER_DIMS[S.tab].includes(dim)));
    note.innerHTML = off ? `<p class="note small" data-testid="an-nofilter">Bu sekme bu süzgeçle daraltılamaz (sayılar tek bir özelliğe göre tutuluyor)${FILTER_DIMS[S.tab] ? `; burada yalnız ${FILTER_DIMS[S.tab].map((d) => DIMS.find((x) => x[0] === d)[1].toLowerCase()).join(', ')} süzgeci geçerli` : ''}. Sayılar süzgeçsiz.</p>` : '';
  }
  const body = document.getElementById('anBody');
  if (!body) return;
  if (body.dataset.tab !== S.tab) delete body.dataset.drawn;
  body.dataset.tab = S.tab;
  paintTabBody(body);
}
function paintTabBody(body) {
  S.seq++; // an answer still on its way for the tab shown before must not paint over this one
  const fn = { canli: tabLive, genel: tabOverview, platformlar: tabPlatforms, kaynaklar: tabSources, oyunlar: tabGames, oyuncular: tabPlayers, etkilesim: tabEngage, huni: tabFunnel,
    donus: tabRetention, surumler: tabVersions, gelir: tabRevenue, teknik: tabTech, grafik: (b) => CH.mount(b, S.game) }[S.tab];
  if (fn) fn(body); else tabLegacy(body);
}
function paintBar() {
  const el = document.getElementById('anBar');
  if (!el) return;
  if (S.tab === 'canli') {
    el.innerHTML = `<div class="an-row"><span class="live-dot" aria-hidden="true"></span><b>Canlı</b><span class="muted small">her ${LIVE_MS / 1000} sn'de bir yenilenir</span>
      <button type="button" class="ghost right" data-act="an-period" data-p="today">Döneme dön</button></div>`;
    return;
  }
  if (S.tab === 'grafik') { // every chart card has its own period, filters and comparison (charts.js)
    el.innerHTML = `<div class="an-row cb-bar"><b>Grafikler</b>${info('Sayılara dokunarak grafiğe ekle ya da çıkar. Her grafiğin kendi dönemi ve süzgeci var. Değişiklikler kendiliğinden kaydedilir; telefonda da aynı grafikler açılır.')}
      <button type="button" class="btn primary right cb-newbtn" data-act="cb-new" data-testid="cb-new">+ Yeni grafik</button></div>`;
    return;
  }
  const g = grans(S.from, S.to);
  const [dim, key] = S.f ? S.f.split(/:(.*)/s) : ['', ''];
  const opts = (S.opts && S.opts[dim]) || [];
  const keyName = (d, k) => (d === 'portal' ? C.PORTAL[k] || k : d === 'device' ? C.DEVICE[k] || k : d === 'country' ? C.regionName(k) : d === 'lang' ? C.langName(k) : d === 'browser' ? C.BROWSER[k] || k : k);
  el.innerHTML = `<div class="an-row">
      <button type="button" class="ghost" data-act="an-step" data-dir="-1" aria-label="Önceki dönem">◀</button>
      <select id="anPeriod" aria-label="Dönem">${PERIODS.map(([k, t]) => `<option value="${k}" ${k === S.p ? 'selected' : ''}>${t}</option>`).join('')}</select>
      <button type="button" class="ghost" data-act="an-step" data-dir="1" aria-label="Sonraki dönem" ${S.to >= today() ? 'disabled' : ''}>▶</button>
      <span class="an-range num" data-testid="an-range">${C.esc(rangeLabel(S.from, S.to))}</span>
    </div>
    ${S.p === 'c' ? `<div class="an-row"><label class="small">Başlangıç <input type="date" id="anFrom" value="${S.from}" min="${FIRST_DAY}" max="${today()}"></label>
      <label class="small">Bitiş <input type="date" id="anTo" value="${S.to}" min="${FIRST_DAY}" max="${today()}"></label></div>` : ''}
    <details class="an-opts" ${(S.optsOpen ?? window.matchMedia('(min-width: 761px)').matches) ? 'open' : ''}>
      <summary class="small"><span>${esc(GRANS.find((x) => x[0] === S.g)?.[1] || '')}</span> · <span>${S.c ? 'karşılaştırma açık' : 'karşılaştırma kapalı'}</span> · <span>${S.f ? `süzgeç: ${esc(keyName(dim, key))}` : 'süzgeç yok'}</span></summary>
    <div class="an-row">
      <div class="seg" role="group" aria-label="Aralık">${GRANS.filter(([k]) => g.includes(k)).map(([k, t]) => `<button type="button" data-act="an-gran" data-g="${k}" aria-pressed="${k === S.g}">${t}</button>`).join('')}</div>
      <label class="small an-cmp"><input type="checkbox" id="anCmp" ${S.c ? 'checked' : ''}> önceki dönemle karşılaştır</label>
    </div>
    <div class="an-row">
      <label class="small an-f">Süzgeç <select id="anDim" aria-label="Süzgeç türü"><option value="">yok</option>${DIMS.map(([k, t]) => `<option value="${k}" ${k === dim ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
      ${dim ? `<select id="anKey" aria-label="Süzgeç değeri"><option value="">seç…</option>${[...new Set([...opts, key].filter(Boolean))].map((k) => `<option value="${C.esc(k)}" ${k === key ? 'selected' : ''}>${C.esc(keyName(dim, k))}</option>`).join('')}</select>` : ''}
      ${S.f ? `<button type="button" class="ghost" data-act="an-unfilter" data-testid="an-unfilter">✕ ${C.esc(keyName(dim, key))}</button>` : ''}
    </div></details>`;
  el.querySelector('.an-opts').ontoggle = (e) => { S.optsOpen = e.target.open; };
  const ps = el.querySelector('#anPeriod');
  ps.onchange = () => {
    if (ps.value === 'live') { S.tab = 'canli'; S.p = 'live'; return setHash(); }
    if (ps.value === 'c') { S.from = S.from || add(today(), -6); S.to = S.to || today(); }
    S.p = ps.value; S.g = ''; setHash();
  };
  const fi = el.querySelector('#anFrom'), ti = el.querySelector('#anTo');
  if (fi) fi.onchange = ti.onchange = () => { if (isDay(fi.value) && isDay(ti.value)) { S.from = fi.value <= ti.value ? fi.value : ti.value; S.to = fi.value <= ti.value ? ti.value : fi.value; S.p = 'c'; S.g = ''; setHash(); } };
  el.querySelector('#anCmp').onchange = (e) => { S.c = e.target.checked; setHash(); };
  el.querySelector('#anDim').onchange = (e) => { if (!e.target.value) { S.f = ''; setHash(); } else { S.f = ''; S.pendingDim = e.target.value; paintBarKeyOnly(e.target.value); } };
  const ks = el.querySelector('#anKey');
  if (ks) ks.onchange = () => { if (ks.value) { S.f = `${dim}:${ks.value}`; setHash(); } };
}
/** a property was picked: offer its values (from the last answer) before filtering */
function paintBarKeyOnly(dim) {
  const opts = (S.opts && S.opts[dim]) || [];
  const row = document.getElementById('anDim')?.closest('.an-row');
  if (!row) return;
  row.querySelector('#anKey')?.remove();
  row.insertAdjacentHTML('beforeend', `<select id="anKey" aria-label="Süzgeç değeri"><option value="">seç…</option>${opts.map((k) => `<option value="${C.esc(k)}">${C.esc(k)}</option>`).join('')}</select>${opts.length ? '' : '<span class="small muted">bu dönemde değer yok</span>'}`);
  row.querySelector('#anKey').onchange = (e) => { if (e.target.value) { S.f = `${dim}:${e.target.value}`; setHash(); } };
}
function paintTabs() {
  const el = document.getElementById('anTabs');
  if (!el) return;
  el.innerHTML = tabsOf().map(([k, t]) => `<button type="button" role="tab" data-act="an-tab" data-tab="${k}" aria-selected="${k === S.tab}">${t}</button>`).join('');
  el.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}

// ------------------------------------------------------------------ data
/** the filter as it applies to this tab: [dim, key], or nulls */
function tabFilter() {
  if (!S.f || !FILTERABLE.has(S.tab)) return [null, null];
  const [dim, key] = S.f.split(/:(.*)/s);
  return !FILTER_DIMS[S.tab] || FILTER_DIMS[S.tab].includes(dim) ? [dim, key] : [null, null];
}
async function fetchTab(tab, force = false) {
  const [dim, key] = tabFilter();
  const plat = tab === 'platforms';
  const args = plat ? { p_game: S.game, p_from: S.from, p_to: S.to, p_gran: S.g === 'hour' ? 'day' : S.g }
    : { p_game: S.game, p_from: S.from, p_to: S.to, p_gran: S.g, p_dim: dim || null, p_key: key || null, p_compare: tab === 'sources' ? true : S.c, p_tab: tab };
  const k = (plat ? 'platforms:' : '') + JSON.stringify(args);
  const hit = S.cache.get(k);
  if (!force && hit && Date.now() - hit.at < CACHE_MS) return hit.data;
  const data = await C.rpc(plat ? 'st_platforms' : 'st_analytics', args);
  S.cache.set(k, { at: Date.now(), data });
  if (S.cache.size > 40) S.cache.delete(S.cache.keys().next().value);
  if (data && data.options) S.opts = data.options;
  if (data && data.data_since && data.data_since !== S.since) S.since = data.data_since;
  return data;
}
/** run a tab's load; paint only if the view is still the same when it answers */
async function load(body, tab, draw) {
  const my = ++S.seq;
  const force = !!S.force;
  // a refresh keeps the numbers on screen (dimmed) until the new ones come
  if (force && body.dataset.drawn === S.tab) body.classList.add('stale');
  else { body.innerHTML = '<p class="muted">Yükleniyor…</p>'; delete body.dataset.drawn; }
  try {
    const data = await fetchTab(tab, force);
    if (my !== S.seq || !body.isConnected) return;
    body.classList.remove('stale');
    draw(data);
    body.dataset.drawn = S.tab;
    S.loadedAt = Date.now();
  } catch (e) {
    if (my !== S.seq || !body.isConnected) return;
    body.classList.remove('stale');
    delete body.dataset.drawn;
    // the file for this tab is not on the server yet: stats4.sql (no function) or stats5.sql (the tab not known)
    const file = e.missing ? (tab === 'platforms' ? 'stats6.sql' : 'stats4.sql') : /st:bad:tab/.test(e.message || '') ? 'stats5.sql' : '';
    body.innerHTML = file
      ? `<div class="warn-box" data-testid="an-missing">Bu sekmenin sunucu kurulumu henüz yapılmadı (supabase/studio/${file}). Kurulunca dönem, karşılaştırma ve süzgeç çalışır. Aşağıda önceki görünüm var.</div><div id="anLegacy"></div>`
      : `<div class="warn-box">${C.esc(C.friendly(e))}</div>`;
    if (file && tab !== 'platforms') legacyInto(document.getElementById('anLegacy'), S.tab);
  }
}

// ------------------------------------------------------------------ small pieces
const esc = (s) => C.esc(s);
const fmt1 = (v) => (v == null ? '—' : Number(v).toLocaleString('tr-TR', { maximumFractionDigits: 1 }));
const fmtPct = (v) => (v == null ? '—' : `%${Math.round(100 * v)}`);
const durF = (v) => C.fmtDur(v);
const fmt2 = (v) => Number(v).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
/** ⓘ: a one-line plain explanation, opened by a tap */
const info = (text) => `<details class="an-i"><summary aria-label="Açıklama">ⓘ</summary><p>${esc(text)}</p></details>`;
function delta(cur, prev, kind = 'n') {
  if (cur == null || prev == null || !S.c) return '';
  if (kind === 'rate') {
    const d = Math.round(100 * (cur - prev));
    return d ? `<span class="delta ${d > 0 ? 'up' : 'down'}">${d > 0 ? '▲' : '▼'} ${Math.abs(d)} puan</span>` : '<span class="delta flat">= aynı</span>';
  }
  if (!prev) return cur ? '<span class="delta up">▲ yeni</span>' : '';
  const p = Math.round((100 * (cur - prev)) / prev);
  return p ? `<span class="delta ${p > 0 ? 'up' : 'down'}">${p > 0 ? '▲' : '▼'} %${Math.abs(p)}</span>` : '<span class="delta flat">= aynı</span>';
}
// CSV: every table registers its rows; the button downloads them (semicolons and a BOM, so Excel in Turkish opens it)
const CSV = new Map();
function csvButton(id, name, head, rows) {
  CSV.set(id, { name, head, rows });
  return `<button type="button" class="ghost small an-csv" data-act="an-csv" data-id="${esc(id)}" title="Tabloyu CSV olarak indir">CSV</button>`;
}
function downloadCsv(id) {
  const t = CSV.get(id);
  if (!t) return;
  const cell = (v) => { const s = v == null ? '' : String(v); return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  const text = '﻿' + [t.head, ...t.rows].map((r) => r.map(cell).join(';')).join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));
  a.download = `${t.name}.csv`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}
const fileName = (what) => `${S.game || 'tum-oyunlar'}-${what}-${S.from}_${S.to}`;

/**
 * Bars for the period (one series) with the period before as a faint line; a tap shows the numbers, a click on a day /
 * week / month opens that one (drill). points: [{label, v, pv, tip, drill}]
 */
function chart(points, { fmt = C.fmtN, unit = '', markers = [] } = {}) {
  // a narrower drawing on phones, so the labels stay readable when the picture is scaled to the screen
  const narrow = window.matchMedia('(max-width: 560px)').matches;
  const W = narrow ? 360 : 640, H = narrow ? 170 : 190, L = 34, B = 22, T = 10;
  const vals = points.flatMap((p) => [(p.v ?? 0) + (p.b ?? 0), p.pv]).filter((x) => x != null && Number.isFinite(x));
  const max = Math.max(1e-9, ...vals);
  const step = niceStepF(max), top = Math.ceil(max / step) * step || 1;
  const band = (W - L) / Math.max(points.length, 1), bw = Math.max(1.5, Math.min(26, band * 0.66));
  const y = (v) => T + (H - T - B) * (1 - v / top);
  let g = '';
  for (let v = 0; v <= top + 1e-9; v += step) g += `<line class="grid-l" x1="${L}" x2="${W}" y1="${y(v)}" y2="${y(v)}"/><text class="tick" x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${esc(tickFmt(v, fmt))}</text>`;
  const every = Math.ceil(points.length / (narrow ? 5 : 8));
  let line = '';
  const cols = points.map((p, i) => {
    const x = L + band * i + (band - bw) / 2, v = p.v ?? 0, yy = y(v), h = H - B - yy;
    const r = Math.min(3, h, bw / 2);
    const d = h <= 0.5 ? '' : `M${x},${H - B}V${yy + r}Q${x},${yy} ${x + r},${yy}H${x + bw - r}Q${x + bw},${yy} ${x + bw},${yy + r}V${H - B}Z`;
    if (p.pv != null) line += `${line ? 'L' : 'M'}${(x + bw / 2).toFixed(1)},${y(p.pv).toFixed(1)}`;
    const lab = i % every === 0 ? `<text class="tick" x="${x + bw / 2}" y="${H - 6}" text-anchor="middle">${esc(p.label)}</text>` : '';
    const tipText = p.tip || `${p.label}: ${p.v == null ? '—' : fmt(p.v)}${unit ? ' ' + unit : ''}${p.pv != null ? ` · önceki: ${fmt(p.pv)}` : ''}`;
    // a second part stacked on top (b): e.g. returning players over new ones
    const top2 = p.b ? y(v + p.b) : 0, stack = p.b && yy - top2 > 0.5 ? `<rect class="col2" x="${x}" y="${top2}" width="${bw}" height="${yy - top2 - (v ? 1 : 0)}" rx="2" pointer-events="none"/>` : '';
    return `<g><rect class="hit${p.drill ? ' drill' : ''}" x="${L + band * i}" y="${T}" width="${band}" height="${H - T - B}" data-tip="${esc(tipText)}"${p.drill ? ` data-act="an-drill" data-drill="${esc(p.drill)}"` : ''}/>${d ? `<path class="col" d="${d}" pointer-events="none"/>` : ''}${stack}${lab}</g>`;
  }).join('');
  const prev = line ? `<path class="prev" d="${line}" pointer-events="none"/>` : '';
  // release markers: a dashed line and the version at the bucket where it appeared
  const mk = markers.map((m) => { const x = L + band * m.i + band / 2; return `<g class="mark"><line x1="${x}" x2="${x}" y1="${T}" y2="${H - B}"/><text x="${x + 3}" y="${T + 9}">${esc(m.label)}</text></g>`; }).join('');
  return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="grafik">${g}<line class="base" x1="${L}" x2="${W}" y1="${H - B}" y2="${H - B}"/>${cols}${prev}${mk}</svg></div>`;
}
/** where the release days fall among the chart's points (day / week / month buckets) */
function releaseMarks(A, ser) {
  if (!A || A.gran === 'hour' || !Array.isArray(A.releases)) return [];
  return A.releases.flatMap((r) => {
    const i = ser.findIndex((p, k) => r.day >= p.t && (k === ser.length - 1 || r.day < ser[k + 1].t));
    return i >= 0 && r.day >= A.from && r.day <= A.to ? [{ i, label: r.ver }] : [];
  });
}
function niceStepF(max) {
  const raw = max / 4, p = 10 ** Math.floor(Math.log10(raw)), n = raw / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p;
}
const tickFmt = (v, fmt) => (fmt === C.fmtDur || fmt === durF ? (v >= 3600 ? `${Math.round(v / 360) / 10} sa` : v >= 60 ? `${Math.round(v / 60)} dk` : `${Math.round(v)} sn`)
  : fmt === fmtPct ? `%${Math.round(v * 100)}` : C.fmtCompact(v));
/** label of a series point */
function pointLabel(t, gran) {
  if (gran === 'hour') { const [d, h] = t.split(' '); return h === '00' || S.from === S.to ? `${h}:00` : `${h}`; }
  if (gran === 'month') return C.fmtDate(t + 'T12:00:00Z', { month: 'short', year: '2-digit' });
  return dLabel(t);
}

// ------------------------------------------------------------------ Canlı
function stopLiveTimer() { clearInterval(S.liveTimer); S.liveTimer = 0; }
function tabLive(body) {
  body.innerHTML = '<div id="anLive"><p class="muted">Canlı sayılar geliyor…</p></div>' + (S.game === RBC.RB_GAME ? '<div id="anRbLive"></div>' : '');
  // Riftborn: the heroes playing now (rb-players.js, stats18.sql); its own 15-second refresh, outside the repainted #anLive
  if (S.game === RBC.RB_GAME) RBP.mountLive(document.getElementById('anRbLive'));
  loadLive();
}
async function loadLive() {
  try { S.live = await C.rpc('st_an_live', { p_game: S.game }); S.liveErr = null; S.liveAt = Date.now(); } catch (e) { S.liveErr = e; }
  // Shadow Duel's ranked queue (games/06-shadow-duel/supabase/ranked-panel.sql): once a minute, quietly skipped if absent
  if ((S.game === 'shadow-duel' || !S.game) && Date.now() - S.rankedAt > 60000) {
    S.rankedAt = Date.now();
    try { const r = await C.rpc('nd_admin_ranked'); const m = (r && r.matches) || {}; S.ranked = { live: m.live_now ?? 0, searching: m.searching_now ?? 0 }; } catch { S.ranked = null; }
  }
  paintLive();
}
function paintLive() {
  const el = document.getElementById('anLive');
  if (!el) return;
  const L = S.live;
  if (!L) {
    if (S.liveErr && S.liveErr.missing) { el.innerHTML = '<div class="warn-box" data-testid="an-missing">Canlı sekmesinin sunucu kurulumu henüz yapılmadı (supabase/studio/stats4.sql). Aşağıda önceki canlı görünüm var.</div><section class="block" id="s-live"></section>'; C.legacy.paintLive(); C.legacy.loadLive(); return; }
    el.innerHTML = S.liveErr ? `<div class="warn-box">${esc(C.friendly(S.liveErr))}</div>` : '<p class="muted">Canlı sayılar geliyor…</p>';
    return;
  }
  const M = L.minutes || [];
  const last30 = M.slice(-30);
  const hm = (m) => C.fmtDate(m, { hour: '2-digit', minute: '2-digit' });
  const sp = L.splits || {};
  const nameOf = { screen: (k, g) => C.screenName(k, g), portal: (k) => C.PORTAL[k] || k, device: (k) => C.DEVICE[k] || k, country: (k) => C.regionName(k), lang: (k) => C.langName(k) };
  const now = L.now || [];
  const rows = now.map((s) => [S.game ? null : C.titleOf({ game: s.game }), C.screenName(s.screen, s.game), C.PORTAL[s.portal] || s.portal, C.DEVICE[s.device] || s.device,
    C.regionName(s.country), C.langName(s.lang), s.ver, C.fmtDur(s.secs), s.new ? 'yeni' : 'dönen'].filter((x, i) => i || !S.game));
  const head = ['Oyun', 'Ekran', 'Portal', 'Cihaz', 'Ülke', 'Dil', 'Sürüm', 'Bu oturumda', 'Oyuncu'].filter((x, i) => i || !S.game);
  const ago = Math.round((Date.now() - S.liveAt) / 1000);
  el.innerHTML = `<div class="card an-live-hero"><div class="hero"><span class="v num" data-testid="an-live-total">${C.fmtN(L.total)}</span>
      <span class="l"><span class="live-dot" aria-hidden="true"></span>${S.game ? 'kişi şu an bu oyunda' : 'kişi şu an oyunlarımızda'} (son 2 dakika)</span>${info('Oyunu son 2 dakikada açık ve önde olan kişi. Sekmesini kapatan ya da arka plana alan hemen düşer.')}</div>
      <p class="small muted" style="margin:4px 0 0">${ago < 5 ? 'az önce yenilendi' : `${ago} sn önce yenilendi`}${S.liveErr ? ` · son yenileme olmadı: ${esc(C.friendly(S.liveErr))}` : ''}</p>
      ${S.ranked && (S.game === 'shadow-duel' || !S.game) ? `<p class="small" data-testid="an-ranked">Shadow Duel dereceli: <b>${C.fmtN(S.ranked.live)}</b> kişi maçta, <b>${C.fmtN(S.ranked.searching)}</b> kişi rakip arıyor.</p>` : ''}</div>
    ${S.game ? '' : `<div class="an-games">${(L.games || []).map((g) => `<a class="an-game" href="${esc(C.pageHash(g.game))}?a=canli&p=live" data-game="${esc(g.game)}"><span>${esc(C.titleOf(g))}</span><span class="big num">${C.fmtN(g.live)}</span></a>`).join('')}</div>`}
    <div class="grid wide" style="margin-top:12px">
      <article class="card"><h3>Son 60 dakika: çevrimiçi ${info('Her dakika oyunda açık olan oturum sayısı. Oturumun başladığı andan son nabzına kadar sayılır.')}</h3>
        ${chart(M.map((m) => ({ label: hm(m.m), v: m.online, tip: `${hm(m.m)}: ${C.fmtN(m.online)} çevrimiçi` })), { unit: 'çevrimiçi' })}</article>
      <article class="card"><h3>Son 30 dakikada başlayan oturumlar ${info('O dakikada oyunu yeni açan (oturum başlatan) sayısı. Reklam, paylaşım ya da portal öne çıkarması işe yarıyor mu, buradan görülür.')}</h3>
        ${chart(last30.map((m) => ({ label: hm(m.m), v: m.started, tip: `${hm(m.m)}: ${C.fmtN(m.started)} yeni oturum` })), { unit: 'oturum' })}
        <p class="small muted">Toplam ${C.fmtN(last30.reduce((a, m) => a + m.started, 0))} oturum.</p></article>
    </div>
    <div class="grid wide" style="margin-top:12px">
      ${[['screen', 'Ne yapıyorlar'], ['portal', 'Nereden'], ['device', 'Cihaz'], ['country', 'Ülke'], ['lang', 'Dil']].map(([k, t]) => `<article class="card"><h3>${t}</h3>${C.barList((sp[k] || []).slice(0, 8).map((x) => ({ label: nameOf[k](x.k, S.game), value: x.n, text: C.fmtN(x.n) })))}</article>`).join('')}
    </div>
    <div id="anSessHost"></div>`;
  // the session list (sessions.js, stats9.sql) took the place of the "open now" table; before stats9.sql that table is shown
  SESS.attach(document.getElementById('anSessHost'), S.game, `<article class="card" style="margin-top:12px"><div class="row"><h3>Şu an açık oturumlar ${info('Oyunda olanların listesi, kim olduğu belli olmadan: ekran, portal, cihaz, ülke, dil, sürüm, bu oturumda geçen süre, ilk günü mü (yeni) yoksa daha önce de oynamış mı (dönen).')}</h3>
      ${csvButton('live-now', fileName('canli'), head, rows)}</div>
      ${rows.length ? `<div class="scroll-x"><table class="an-t" data-testid="an-live-now"><thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
        <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : '<p class="muted small">Şu an kimse oynamıyor.</p>'}
      ${now.length >= 60 ? '<p class="small muted">En yeni 60 oturum gösteriliyor.</p>' : ''}</article>`);
}

// ------------------------------------------------------------------ Genel bakış
const rate = (x) => (x && x.installs ? x.back / x.installs : null);
const perPlayer = (k) => (k.players != null ? k.players : k.player_days);
/** KPI cards: value from the period's numbers, and how each point of the chart is computed */
const KPIS = [
  { id: 'dau', label: 'Aktif oyuncu (günlük ort.)', fmt: fmt1, val: (k) => k.dau, pt: (p) => (S.g === 'hour' ? p.player_days : p.player_days / Math.max(1, p.days)),
    help: 'Bir günde oyunu açan farklı kişi, dönemin günlerine göre ortalama (DAU). Saatlik grafikte o saatte gelen kişi.' },
  { id: 'players', label: 'Farklı oyuncu', val: (k) => k.players, help: 'Dönem boyunca oyunu açan farklı kişi. Son 35 günün içinde ve süzgeçsiz sayılır; dışında "—".' },
  { id: 'wau', label: 'Haftalık aktif (WAU)', val: (k) => k.wau, help: 'Dönemin son gününe kadar 7 günde oyunu açan farklı kişi.' },
  { id: 'mau', label: 'Aylık aktif (MAU)', val: (k) => k.mau, help: 'Dönemin son gününe kadar 30 günde oyunu açan farklı kişi.' },
  { id: 'new', label: 'Yeni oyuncu', val: (k) => k.new_players, pt: (p) => p.new_players, help: 'Oyunu ilk kez açanlar.' },
  { id: 'sessions', label: 'Oturum', val: (k) => k.sessions, pt: (p) => p.sessions, help: 'Oyunun açılma sayısı (30 dakikadan uzun arka planda kalınca yeni oturum sayılır).' },
  { id: 'spp', label: 'Oturum / oyuncu', fmt: fmt1, val: (k) => (perPlayer(k) ? k.sessions / perPlayer(k) : null), pt: (p) => (p.player_days ? p.sessions / p.player_days : null),
    help: 'Bir oyuncu dönemde kaç kez oyunu açtı (grafikte: günde kaç kez).' },
  { id: 'avg', label: 'Ortalama oturum', fmt: durF, val: (k) => (k.sessions ? k.play_s / k.sessions : null), pt: (p) => (p.sessions ? p.play_s / p.sessions : null),
    help: 'Bir açılışta oyunun önde olduğu ortalama süre.' },
  { id: 'ppp', label: 'Oyuncu başına oyun', fmt: durF, val: (k) => (perPlayer(k) ? k.play_s / perPlayer(k) : null), pt: (p) => (p.player_days ? p.play_s / p.player_days : null),
    help: 'Bir oyuncunun dönemde oynadığı toplam süre (grafikte: günde).' },
  { id: 'play', label: 'Toplam oyun süresi', fmt: durF, val: (k) => k.play_s, pt: (p) => p.play_s, help: 'Herkesin oyunda geçirdiği süre. Reklam parası ≈ oyuncu × süre × reklam: gelirin en iyi göstergesi.' },
  { id: 'ret1', label: 'Ertesi gün dönen', fmt: fmtPct, kind: 'rate', val: (k) => rate(k.ret1), pt: (p) => rate(p.ret1),
    help: 'Yeni gelenlerin yüzde kaçı ertesi gün yine oynadı. Süzgeçte yalnız portal, cihaz ve sürüm için.' },
  { id: 'ret7', label: '7. gün dönen', fmt: fmtPct, kind: 'rate', val: (k) => rate(k.ret7), help: 'Yeni gelenlerin yüzde kaçı tam bir hafta sonra yine oynadı.' },
  { id: 'sticky', label: 'Yapışkanlık (DAU/MAU)', fmt: fmtPct, kind: 'rate', val: (k) => (k.mau ? k.dau30 / k.mau : null),
    help: 'Aylık oyuncuların ortalama bir günde ne kadarı geliyor. %20 üstü iyi: oyuncular sık dönüyor.' },
];
const revKpi = (k) => (k.revenue || []).filter((r) => Number(r.amount) > 0);
function tabOverview(body) {
  load(body, 'overview', (A) => {
    const k = A.kpis || {}, pk = A.prev_kpis || null;
    const cards = KPIS.map((d) => {
      const v = d.val(k), pv = pk ? d.val(pk) : null;
      const sel = d.id === S.m;
      return `<div class="an-kpi${sel ? ' sel' : ''}${d.pt ? ' click' : ''}" ${d.pt ? `role="button" tabindex="0" data-act="an-metric" data-m="${d.id}" aria-pressed="${sel}"` : ''} data-kpi="${d.id}">
        <div class="l">${esc(d.label)} ${info(d.help)}</div><div class="v num">${esc(v == null ? '—' : (d.fmt || C.fmtN)(v))}</div>
        <div class="s">${delta(v, pv, d.kind)}${pk && pv != null ? ` <span class="muted">önce ${esc((d.fmt || C.fmtN)(pv))}</span>` : ''}</div></div>`;
    });
    // earnings, one card per currency, and earnings per daily player (counted portals)
    for (const r of revKpi(k)) {
      const p = pk && (pk.revenue || []).find((x) => x.currency === r.currency);
      cards.push(`<div class="an-kpi" data-kpi="rev-${esc(r.currency)}"><div class="l">Kazanç (${esc(r.currency)}) ${info('Elle girilen portal kazancı (Gelir sekmesi). Para birimleri toplanmaz.')}</div>
        <div class="v num">${esc(C.money(r.amount, r.currency))}</div><div class="s">${delta(Number(r.amount), p ? Number(p.amount) : null)}</div></div>`);
      if (r.player_days) cards.push(`<div class="an-kpi" data-kpi="arpdau-${esc(r.currency)}"><div class="l">ARPDAU (${esc(r.currency)}) ${info('Oyuncu başına günlük kazanç: CrazyGames kazancı ÷ kazanç girilen günlerin CrazyGames oyuncuları.')}</div>
        <div class="v num">${esc(C.money(r.counted / r.player_days, r.currency))}</div><div class="s muted">${C.fmtN(r.player_days)} oyuncu-gün</div></div>`);
    }
    const def = KPIS.find((d) => d.id === S.m && d.pt) || KPIS[0];
    const ser = A.series || [], prev = A.prev_series || [];
    const pts = ser.map((p, i) => ({ label: pointLabel(p.t, A.gran), v: def.pt(p), pv: S.c && prev[i] ? def.pt(prev[i]) : null,
      drill: A.gran === 'hour' ? null : `${A.gran}:${p.t}` }));
    const unitOf = A.gran === 'hour' ? 'saat' : A.gran === 'week' ? 'hafta' : A.gran === 'month' ? 'ay' : 'gün';
    const hourNote = A.gran === 'hour' && !A.hourly_since ? '<p class="note small">Saatlik veri henüz yok: oturumlar bittikten 35 dakika sonra yazılır.</p>'
      : A.gran === 'hour' && A.hourly_since > A.from ? `<p class="note small">Saatlik veri ${esc(dLabel(A.hourly_since))}'den beri tutuluyor.</p>` : '';
    const tblHead = [unitOf === 'saat' ? 'Saat' : 'Dönem', def.label, ...(S.c ? ['Önceki dönem'] : [])];
    const tblRows = ser.map((p, i) => [A.gran === 'hour' ? p.t + ':00' : p.t, round2(def.pt(p)), ...(S.c ? [prev[i] ? round2(def.pt(prev[i])) : ''] : [])]);
    const filt = A.dim ? `<p class="note small" data-testid="an-filtered">Süzgeç: <b>${esc(DIMS.find((d) => d[0] === A.dim)?.[1])} = ${esc(A.key)}</b>. Farklı oyuncu, WAU, MAU ve yapışkanlık süzgeçle sayılamaz ("—"); ertesi gün dönen yalnız portal, cihaz ve sürümde.</p>` : '';
    body.innerHTML = `${filt}<div class="an-kpis" data-testid="an-kpis">${cards.join('')}</div>
      <article class="card" style="margin-top:12px" data-testid="an-chart"><div class="row"><h3>${esc(def.label)}</h3><span class="muted small">${esc(GRANS.find((g) => g[0] === A.gran)[1].toLowerCase())} ${S.c ? '· ince çizgi: önceki dönem' : ''}</span>
        ${csvButton('overview', fileName(def.id), tblHead, tblRows)}</div>
        ${hourNote}${chart(pts, { fmt: def.fmt || C.fmtN, markers: releaseMarks(A, ser) })}
        <p class="small muted">${A.gran === 'hour' ? 'Saatler Türkiye saatiyle; oturumun başladığı saate yazılır.' : 'Bir çubuğa dokununca sayı çıkar; o güne (haftaya, aya) gitmek için yeniden dokun.'} Kartlardan birine dokununca grafiği değişir.</p>
        <details class="table"><summary>Tablo olarak göster</summary><div class="scroll-x"><table class="an-t"><thead><tr>${tblHead.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
          <tbody>${tblRows.map((r) => `<tr>${r.map((c, i) => `<td${i ? ' class="n"' : ''}>${esc(i ? fmtCell(c, def) : c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details></article>
      ${S.game ? '' : '<section class="block" id="s-portals" style="margin-top:20px"></section>'}${rbHost()}`;
    if (!S.game) C.legacy.paintPortals();
    rbMount('genel');
  });
}
const round2 = (v) => (v == null ? '' : Math.round(v * 100) / 100);
const fmtCell = (c, def) => (c === '' || c == null ? '—' : (def.fmt || C.fmtN)(c));

// Riftborn's in-game cards at the end of a tab (rb-cards.js, stats15.sql); nothing for the other games
const rbHost = () => (S.game === RBC.RB_GAME ? '<div id="anRb" style="margin-top:12px"></div>' : '');
const rbMount = (tab) => { if (S.game === RBC.RB_GAME) RBC.mount(document.getElementById('anRb'), tab, { from: S.from, to: S.to, filter: S.f || '', today: today() }); };

// ------------------------------------------------------------------ Kaynaklar
const SRC_COLS = [
  ['k', 'Değer', 'Portal, ülke, cihaz…'],
  ['dau', 'Günlük ort. oyuncu', 'Dönemde bir günde ortalama kaç kişi.'],
  ['new_players', 'Yeni', 'Oyunu ilk kez açan.'],
  ['sessions', 'Oturum', 'Oyunun açılma sayısı.'],
  ['share', 'Pay', 'Bütün oturumların yüzde kaçı.'],
  ['avg_s', 'Ort. oyun', 'Bir oturumda ortalama süre.'],
  ['ret1', 'Ertesi gün dönen', 'Yeni gelenlerin ertesi gün dönen payı (yalnız portal, cihaz, sürüm).'],
  ['chg', 'Değişim', 'Oturum sayısının önceki aynı uzunluktaki döneme göre değişimi.'],
];
function tabSources(body) {
  load(body, 'sources', (A) => {
    const rows0 = (A.sources && A.sources[S.d]) || [];
    const days = Math.max(1, diff(A.to, A.from) + 1);
    const tot = rows0.reduce((a, r) => a + r.sessions, 0);
    const name = (k) => (S.d === 'portal' ? C.PORTAL[k] || k : S.d === 'device' ? C.DEVICE[k] || k : S.d === 'country' ? C.regionName(k) : S.d === 'lang' ? C.langName(k) : S.d === 'browser' ? C.BROWSER[k] || k : k);
    const rows = rows0.map((r) => ({ ...r, name: name(r.k), dau: r.player_days / days, share: tot ? r.sessions / tot : 0, avg_s: r.sessions ? r.play_s / r.sessions : 0,
      ret1: r.ret1 ? rate(r.ret1) : null, chg: r.prev_sessions ? (r.sessions - r.prev_sessions) / r.prev_sessions : null }));
    const { k, dir } = S.sort;
    rows.sort((a, b) => (k === 'k' ? dir * a.name.localeCompare(b.name, 'tr') : dir * ((a[k] ?? -1e9) - (b[k] ?? -1e9))) || b.sessions - a.sessions);
    const fmtc = { k: (r) => r.name, dau: (r) => fmt1(r.dau), new_players: (r) => C.fmtN(r.new_players), sessions: (r) => C.fmtN(r.sessions), share: (r) => fmtPct(r.share),
      avg_s: (r) => C.fmtDur(r.avg_s), ret1: (r) => (r.ret1 == null ? '—' : fmtPct(r.ret1)) };
    const head = SRC_COLS.map((c) => c[1]);
    const csvRows = rows.map((r) => [r.name, round2(r.dau), r.new_players, r.sessions, round2(100 * r.share), Math.round(r.avg_s), r.ret1 == null ? '' : round2(100 * r.ret1), r.chg == null ? '' : round2(100 * r.chg)]);
    body.innerHTML = `<div class="chips an-dims" role="group" aria-label="Özellik">${DIMS.map(([d, t]) => `<button type="button" data-act="an-src" data-d="${d}" aria-pressed="${d === S.d}">${t}</button>`).join('')}</div>
      <article class="card" style="margin-top:10px"><div class="row"><h3>${esc(DIMS.find((d) => d[0] === S.d)[1])} ${info('Dönemde her değerin oyuncusu, oturumu ve süresi. Başlığa dokununca sıralanır.')}</h3>
        ${csvButton('sources', fileName('kaynak-' + S.d), head, csvRows)}</div>
        ${rows.length ? `<div class="scroll-x"><table class="an-t sortable" data-testid="an-sources"><thead><tr>${SRC_COLS.map(([c, t, h]) => `<th class="${c === 'k' ? '' : 'n'}" title="${esc(h)}"><button type="button" class="sort" data-act="an-sort" data-k="${c}">${esc(t)}${c === k ? (dir > 0 ? ' ↑' : ' ↓') : ''}</button></th>`).join('')}</tr></thead>
          <tbody>${rows.map((r) => `<tr data-k="${esc(r.k)}">${SRC_COLS.map(([c]) => (c === 'chg' ? `<td class="n">${r.chg == null ? (r.sessions ? '<span class="delta up">▲ yeni</span>' : '—') : delta(r.sessions, r.prev_sessions) || '<span class="delta flat">= aynı</span>'}</td>`
            : c === 'k' ? `<td><button type="button" class="linkish" data-act="an-filter" data-f="${esc(S.d + ':' + r.k)}" title="Bu değerle süz (Genel bakış)">${esc(r.name)}</button></td>` : `<td class="n">${esc(fmtc[c](r))}</td>`)).join('')}</tr>`).join('')}</tbody></table></div>`
          : '<p class="muted small">Bu dönemde veri yok.</p>'}
        <details class="more"><summary>Bu sütunlar ne demek?</summary><ul class="help">${SRC_COLS.map(([, t, h]) => `<li><b>${esc(t)}:</b> ${esc(h)}</li>`).join('')}<li>Bir değere dokununca Genel bakış o değerle süzülür.</li></ul></details></article>`;
  });
}

// ------------------------------------------------------------------ shared pieces of the tabs below
const unitWord = (g) => (g === 'hour' ? 'saat' : g === 'week' ? 'hafta' : g === 'month' ? 'ay' : 'gün');
/** a card with a title, ⓘ and a CSV button */
const card = (title, help, body, csv = '', attrs = '') => `<article class="card"${attrs}><div class="row"><h3>${esc(title)} ${help ? info(help) : ''}</h3>${csv}</div>${body}</article>`;
/** a small table with a CSV button registered under id */
function table(id, name, head, rows, { cls = 'an-t', testid = '', fmt = (c) => c } = {}) {
  const t = rows.length ? `<div class="scroll-x"><table class="${cls}"${testid ? ` data-testid="${testid}"` : ''}><thead><tr>${head.map((h, i) => `<th${i ? ' class="n"' : ''}>${esc(h)}</th>`).join('')}</tr></thead>
    <tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td${i ? ' class="n"' : ''}>${esc(fmt(c, i))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : '<p class="muted small">Bu dönemde veri yok.</p>';
  return { html: t, csv: rows.length ? csvButton(id, name, head, rows) : '' };
}
/** horizontal share bars of named buckets in a fixed order: [[key, label]], counts {key: n} */
function shareBars(order, counts) {
  const tot = order.reduce((a, [k]) => a + (counts[k] || 0), 0);
  return { tot, html: tot ? C.barList(order.map(([k, t]) => ({ label: t, value: counts[k] || 0, text: `${fmtPct(tot ? (counts[k] || 0) / tot : 0)} · ${C.fmtN(counts[k] || 0)}` })), { max: Math.max(1, ...order.map(([k]) => counts[k] || 0)) }) : '<p class="muted small">Bu dönemde veri yok.</p>' };
}
const filterOff = (A, extra) => (S.f && !A.dim ? `<p class="note small">Bu bölüm${extra ? ` (${extra})` : ''} süzgeçsiz gösteriliyor.</p>` : '');

// ------------------------------------------------------------------ Oyuncular
const SPP_B = [['1', '1'], ['2', '2'], ['3', '3'], ['4-5', '4–5'], ['6-10', '6–10'], ['11+', '11 ve üstü']];
const PLAY_B = [['lt1', '1 dk altı'], ['lt5', '1–5 dk'], ['lt15', '5–15 dk'], ['lt30', '15–30 dk'], ['lt60', '30–60 dk'], ['ge60', '1 saat üstü']];
const DAYS_B = [['1', '1 gün'], ['2', '2 gün'], ['3', '3 gün'], ['4-7', '4–7 gün'], ['8-14', '8–14 gün'], ['15+', '15 gün ve üstü']];
const DOW = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
function tabPlayers(body) {
  load(body, 'players', (A) => {
    const ser = A.series || [], prev = A.prev_series || [];
    const pts = ser.map((p, i) => ({ label: pointLabel(p.t, A.gran), v: p.new_players, b: Math.max(0, p.player_days - p.new_players),
      pv: S.c && prev[i] ? prev[i].player_days : null, drill: A.gran === 'hour' ? null : `${A.gran}:${p.t}`,
      tip: `${pointLabel(p.t, A.gran)}: ${C.fmtN(p.new_players)} yeni, ${C.fmtN(Math.max(0, p.player_days - p.new_players))} dönen${S.c && prev[i] ? ` · önceki toplam: ${C.fmtN(prev[i].player_days)}` : ''}` }));
    const nr = table('newret', fileName('yeni-donen'), [unitWord(A.gran), 'Yeni', 'Dönen', 'Toplam'], ser.map((p) => [A.gran === 'hour' ? p.t + ':00' : p.t, p.new_players, Math.max(0, p.player_days - p.new_players), p.player_days]));
    const ds = shareBars(SPP_B, A.dist_sessions || {}), dp = shareBars(PLAY_B, A.dist_play || {}), dd = shareBars(DAYS_B, A.dist_days || {});
    const distNote = A.dist_ok ? '' : '<p class="note small">Bu dağılımlar son 35 gün içindeki dönem için ve yalnız portal ya da cihaz süzgeciyle sayılır.</p>';
    // day-of-week × hour
    const H = new Map((A.heat || []).map((x) => [`${x.dow}|${x.h}`, x]));
    const hmax = Math.max(1, ...(A.heat || []).map((x) => x.sessions));
    const heat = (A.heat || []).length ? `<div class="scroll-x"><table class="an-heat" data-testid="an-heat"><thead><tr><th></th>${Array.from({ length: 24 }, (_, h) => `<th>${h % 3 === 0 ? String(h).padStart(2, '0') : ''}</th>`).join('')}</tr></thead>
      <tbody>${DOW.map((d, i) => `<tr><th>${d}</th>${Array.from({ length: 24 }, (_, h) => { const x = H.get(`${i + 1}|${h}`); const n = x ? x.sessions : 0;
        return `<td style="--a:${Math.round((n / hmax) * 85)}%" data-tip="${esc(`${d} ${String(h).padStart(2, '0')}:00 · ${C.fmtN(n)} oturum, ${C.fmtN(x ? x.players : 0)} oyuncu`)}"></td>`; }).join('')}</tr>`).join('')}</tbody></table></div>`
      : `<p class="muted small">${A.heat_since ? `Saatlik veri ${esc(dLabel(A.heat_since))}'den beri tutuluyor; bu dönemde yok.` : 'Saatlik veri henüz yok.'}</p>`;
    const heatCsv = (A.heat || []).length ? csvButton('heat', fileName('gun-saat'), ['Gün', 'Saat', 'Oturum', 'Oyuncu'], (A.heat || []).map((x) => [DOW[x.dow - 1], x.h, x.sessions, x.players])) : '';
    body.innerHTML = `<div class="grid wide">
      ${card('Yeni ve dönen oyuncular', 'Alt parça: o gün (saat, hafta) ilk kez gelen. Üst parça: daha önce de oynamış olan. İnce çizgi: önceki dönemin toplamı.',
        `<div class="legend small"><span class="sw a"></span>yeni <span class="sw b"></span>dönen</div>${chart(pts, { markers: releaseMarks(A, ser) })}<details class="table"><summary>Tablo olarak göster</summary>${nr.html}</details>`, nr.csv, ' data-block="an-newret"')}
      ${card('Haftanın günü ve saat', 'Türkiye saatiyle hangi gün ve saatte kaç oturum başladı. Koyu kare: kalabalık. Duyuru ve güncelleme için iyi zaman.', heat, heatCsv, ' data-block="an-heat"')}
    </div>
    <div class="grid wide" style="margin-top:12px">
      ${card('Oyuncu başına oturum', 'Dönemde bir oyuncunun oyunu kaç kez açtığı. 1 çoksa oyuncular bir kez deneyip bırakıyor.', distNote + ds.html, '', ' data-block="an-spp"')}
      ${card('Oyuncu başına oyun süresi', 'Dönemde bir oyuncunun toplam oynadığı süre.', distNote + dp.html, '', ' data-block="an-ppp"')}
      ${card('Kaç gün geldi', 'Dönemde bir oyuncunun kaç farklı günde oyunu açtığı. Çok gün gelen oyuncu sadık oyuncudur.', distNote + dd.html, '', ' data-block="an-days"')}
    </div>
    <div id="anTop"></div>${S.game === RBC.RB_GAME ? '<div id="anRbPlayers"></div>' : ''}`;
    topCard(document.getElementById('anTop'));
    if (S.game === RBC.RB_GAME) RBP.mountAll(document.getElementById('anRbPlayers'));
  });
}

// ------------------------------------------------------------------ Oyuncular → En çok oynayanlar (stats10.sql: st_top_players)
// The period's players by total play time, 50 at a time. The card's node lives on between the tab's repaints (like the
// session list), so the rows already shown, the sort and "daha fazla" stay; it asks the server again when the period or
// the filter changes, after a sort, or when the tab is repainted more than 12 seconds after the last answer.
const TOP_PAGE = 50;
const TOP_MAX_DAYS = 92;
// [field, header, sort key ('' = not sortable), numeric]
const TOP_COLS = [['tag', 'Oyuncu', '', false], ['game', 'Oyun', '', false], ['play_s', 'Oyun süresi', 'play', true], ['sessions', 'Oturum', 'sessions', true],
  ['days', 'Gün', 'days', true], ['country', 'Ülke', 'country', false], ['device', 'Cihaz', '', false], ['portal', 'Portal', '', false], ['new', 'Yeni / dönen', '', false],
  ['tags', 'Hesap · dereceli', '', false]];
// tags: the card's own account / ranked filters (stats12.sql; '' = all); seen: the game whose players carried a tag (then
// the column and the two selects show; a server before stats12.sql or a game that sends no tags: neither)
const T = { node: null, key: '', rows: [], data: null, err: null, more: false, at: 0, seq: 0, sort: 'play', desc: true, busy: false, tags: { acct: '', rk: '' }, seen: null };
const topTagsOn = () => T.seen === (S.game || '*') || !!(T.tags.acct || T.tags.rk);
/** the card's server arguments: the period (at most 92 days, the latest ones), a portal / device filter, the tag filters */
function topArgs() {
  const [dim, key] = tabFilter();
  const filters = dim === 'portal' || dim === 'device' ? { [dim]: [key] } : {};
  if (T.tags.acct) filters.acct = [T.tags.acct];
  if (T.tags.rk) filters.rk = [T.tags.rk];
  const from = diff(S.to, S.from) + 1 > TOP_MAX_DAYS ? add(S.to, -(TOP_MAX_DAYS - 1)) : S.from;
  return { p_game: S.game, p_from: from, p_to: S.to, p_filters: filters };
}
function topCard(host) {
  if (!host) return;
  if (!T.node) {
    T.node = document.createElement('article');
    T.node.className = 'card';
    T.node.dataset.block = 'an-top';
    T.node.dataset.testid = 'an-top';
    T.node.style.marginTop = '12px';
  }
  host.replaceWith(T.node);
  if (T.game !== S.game) Object.assign(T, { game: S.game, tags: { acct: '', rk: '' } }); // the tag filters belong to one game page
  const k = JSON.stringify(topArgs());
  if (k !== T.key) { T.seq++; Object.assign(T, { key: k, rows: [], data: null, err: null, more: false, at: 0, busy: false }); } // an answer for the old view is dropped
  topPaint();
  if (!T.busy && Date.now() - T.at > 12000) topLoad();
}
async function topLoad(more = false, btn = null) {
  const my = ++T.seq;
  T.busy = true;
  if (btn) btn.disabled = true;
  if (!more && T.data) T.node?.classList.add('stale');
  const a = topArgs();
  try {
    const d = await C.rpc('st_top_players', { ...a, p_limit: more ? TOP_PAGE : Math.min(500, Math.max(TOP_PAGE, T.rows.length)), p_offset: more ? T.rows.length : 0, p_sort: T.sort, p_desc: T.desc });
    if (my !== T.seq) return;
    Object.assign(T, { data: d, rows: more ? T.rows.concat(d.players || []) : d.players || [], more: !!d.more, err: null, at: Date.now() });
    if (T.rows.some((r) => r.acct != null || r.rk != null)) T.seen = S.game || '*';
  } catch (e) {
    if (my !== T.seq) return;
    if (more) alert(C.friendly(e)); else Object.assign(T, { err: e, at: Date.now() });
  } finally { if (my === T.seq) T.busy = false; }
  T.node?.classList.remove('stale');
  topPaint();
}
function topPaint() {
  const el = T.node;
  if (!el || !el.isConnected) return;
  const A = T.data, studio = !S.game, tagsOn = topTagsOn();
  const help = 'Seçili dönemde oynayan herkes, toplam oyun süresine göre çoktan aza. Kim olduğu yoktur: her oyuncunun kısa bir etiketi var ("Oyuncu K7QD"), Canlı sekmesindeki oturum listesiyle aynı. '
    + 'Gün: dönemde kaç farklı gün oynadığı. Yeni: oyunu ilk kez bu dönemde açtı. Ülke yalnız son 48 saatte oynayanlarda bilinir, bilinmeyen "—". '
    + 'Hesap · dereceli (oyun gönderiyorsa): CrazyGames hesabıyla mı misafir mi, dereceli kademesi; oyuncunun son 48 saatteki en son oturumundan, yoksa "—". Satıra dokununca oyuncunun son 7 günü açılır; başlığa dokununca sıralanır.';
  const cols = TOP_COLS.filter(([c]) => (c !== 'game' || studio) && (c !== 'tags' || tagsOn));
  const csvHead = cols.flatMap(([c, t]) => (c === 'play_s' ? ['Oyun süresi (sn)'] : c === 'tags' ? ['Hesap', 'Dereceli'] : [t]));
  const csvRow = (r) => cols.flatMap(([c]) => (c === 'tag' ? [`Oyuncu ${r.tag}`] : c === 'game' ? [C.titleOf({ game: r.game })] : c === 'new' ? [r.new == null ? '' : r.new ? 'yeni' : 'dönen']
    : c === 'tags' ? [r.acct || '', r.rk || ''] : c === 'play_s' || c === 'sessions' || c === 'days' ? [r[c]] : [r[c] || '']));
  const head = `<div class="row"><h3>En çok oynayanlar ${info(help)}</h3>
    ${A ? `<span class="small muted num" data-testid="an-top-count">${C.fmtN(A.total)} oyuncu · toplam ${esc(C.fmtDur(A.total_play_s))}</span>` : ''}
    ${T.rows.length ? csvButton('top', fileName('en-cok-oynayanlar'), csvHead, T.rows.map(csvRow)) : ''}</div>`;
  // the account / ranked selects (the card's own filter row)
  const tsel = (k, label, opts) => `<label class="ss-f${T.tags[k] ? ' on' : ''}"><span>${label}</span><select data-tpf="${k}" aria-label="${label}"><option value="">Hepsi</option>${opts.map(([v, t]) => `<option value="${esc(v)}" ${v === T.tags[k] ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select></label>`;
  const tagRow = tagsOn ? `<div class="ss-filters tp-sel" data-testid="an-top-filters">${tsel('acct', 'Hesap', SESS.tagOptions('acct'))}${tsel('rk', 'Dereceli', SESS.tagOptions('rk'))}</div>` : '';
  if (!A) {
    el.innerHTML = head + tagRow + (T.err ? (T.err.missing ? '<div class="warn-box" data-testid="an-top-missing">Bu kartın sunucu kurulumu henüz yapılmadı (supabase/studio/stats10.sql).</div>' : `<div class="warn-box">${esc(C.friendly(T.err))}</div>`)
      : '<p class="muted small">Oyuncular geliyor…</p>');
    return;
  }
  const th = ([c, t, sk, n]) => `<th class="${n ? 'n' : ''}${c === 'tag' ? ' tp-who' : ''}">${sk ? `<button type="button" class="sort" data-act="an-top-sort" data-k="${sk}" aria-pressed="${T.sort === sk}">${esc(t)}${T.sort === sk ? (T.desc ? ' ↓' : ' ↑') : ''}</button>` : esc(t)}</th>`;
  const cell = (r, c) => {
    if (c === 'tag') return `<td class="tp-who"><span class="muted num tp-rank">${C.fmtN(r.rank)}</span> <button type="button" class="linkish" data-act="an-top-player" data-game="${esc(r.game)}" data-tag="${esc(r.tag)}">Oyuncu ${esc(r.tag)}</button></td>`;
    if (c === 'game') return `<td>${esc(C.titleOf({ game: r.game }))}</td>`;
    if (c === 'play_s') return `<td class="n num"><b>${esc(C.fmtDur(r.play_s))}</b></td>`;
    if (c === 'sessions' || c === 'days') return `<td class="n num">${C.fmtN(r[c])}</td>`;
    if (c === 'country') return `<td>${r.country ? esc(`${SESS.flag(r.country)} ${C.regionName(r.country)}`) : '<span class="muted">—</span>'}</td>`;
    if (c === 'device') return `<td>${r.device ? esc(C.DEVICE[r.device] || r.device) : '<span class="muted">—</span>'}</td>`;
    if (c === 'portal') return `<td>${r.portal ? esc(SESS.portalName(r.portal)) : '<span class="muted">—</span>'}</td>`;
    if (c === 'tags') return `<td><span class="tg-pair">${SESS.tagChips(r.acct, r.rk)}</span></td>`;
    return `<td>${r.new == null ? '<span class="muted">—</span>' : `<span class="badge${r.new ? ' on' : ''}">${r.new ? 'yeni' : 'dönen'}</span>`}</td>`;
  };
  const [dim] = S.f ? S.f.split(':') : [''];
  const a = topArgs();
  const notes = [];
  if (a.p_from !== S.from) notes.push(`Bu liste en çok ${TOP_MAX_DAYS} günü gösterir: ${rangeLabel(a.p_from, a.p_to)}.`);
  if (A.counted_from && A.counted_from > a.p_from) notes.push(`Oyuncu başına günlük kayıt 35 gün tutulur: ${dLabel(A.counted_from)} öncesi sayılmadı.`);
  const pd = Object.keys(a.p_filters).some((k) => k === 'portal' || k === 'device');
  if (S.f && !pd) notes.push('Bu liste yalnız portal ya da cihaz süzgeciyle daraltılır; şu an süzgeçsiz.');
  else if (S.f && (dim === 'portal' || dim === 'device')) notes.push(`Süzgeç oyuncunun ${dim === 'portal' ? 'portalına' : 'cihazına'} bakar; bilinmeyen oyuncu listede yok.`);
  const left = A.total - T.rows.length;
  if (T.tags.acct || T.tags.rk) notes.push('Hesap ve dereceli oyuncunun son 48 saatteki oturumundan bilinir; daha önce oynamış olan bu süzgeçte yalnız “Bilinmiyor” ile çıkar.');
  el.innerHTML = `${head}${tagRow}
    ${T.rows.length ? `<div class="scroll-x"><table class="an-t an-top" data-testid="an-top-table"><thead><tr>${cols.map(th).join('')}</tr></thead>
      <tbody>${T.rows.map((r) => `<tr data-act="an-top-player" data-game="${esc(r.game)}" data-tag="${esc(r.tag)}">${cols.map(([c]) => cell(r, c)).join('')}</tr>`).join('')}</tbody></table></div>`
      : `<p class="muted small" data-testid="an-top-empty">${(S.f && pd) || T.tags.acct || T.tags.rk ? 'Bu süzgeçle bu dönemde oyuncu yok.' : 'Bu dönemde oyuncu yok.'}</p>`}
    ${T.more ? `<button type="button" class="btn" data-act="an-top-more" data-testid="an-top-more" style="margin-top:8px">Daha fazla göster${left > 0 ? ` (${C.fmtN(left)} kaldı)` : ''}</button>` : ''}
    ${notes.map((n) => `<p class="note small" style="margin:8px 0 0">${esc(n)}</p>`).join('')}`;
}

// ------------------------------------------------------------------ Etkileşim
const LEN_ORDER = [['lt30', '30 sn altı'], ['lt60', '30 sn – 1 dk'], ['lt180', '1–3 dk'], ['lt600', '3–10 dk'], ['ge600', '10 dk üstü']];
function tabEngage(body) {
  load(body, 'engage', (A) => {
    const seg = C.legacy.endSeg();
    const pick = (E, kind) => { const m = {}; for (const e of E || []) if (e.kind === kind && (seg === 'all' || e.seg === seg)) m[e.k] = (m[e.k] || 0) + e.sessions; return m; };
    const exits = pick(A.ends, 'exit'), lens = pick(A.ends, 'len'), plens = A.prev ? pick(A.prev.ends, 'len') : null;
    const tot = Object.values(lens).reduce((a, b) => a + b, 0), ptot = plens ? Object.values(plens).reduce((a, b) => a + b, 0) : 0;
    const share = (m, t, ks) => (t ? ks.reduce((a, k) => a + (m[k] || 0), 0) / t : null);
    const screensTot = (A.screens || []).reduce((a, x) => a + x.play_s, 0);
    const sc = table('screens', fileName('ekranlar'), ['Ekran', 'Süre payı', 'Toplam süre', 'Ziyaret', 'Ziyaret başına'],
      (A.screens || []).map((x) => [C.screenName(x.k, S.game), screensTot ? round2(100 * x.play_s / screensTot) : 0, x.play_s, x.visits, x.visits ? Math.round(x.play_s / x.visits) : 0]),
      { testid: 'an-screens', fmt: (c, i) => (i === 1 ? `%${Math.round(c)}` : i === 2 || i === 4 ? C.fmtDur(c) : i === 3 ? C.fmtN(c) : c) });
    const exitList = Object.entries(exits).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1));
    const etot = exitList.reduce((a, x) => a + x[1], 0);
    const ex = table('exits', fileName('cikis'), ['Çıkış ekranı', 'Pay', 'Oturum'], exitList.map(([k, n]) => [k === '?' ? 'Bilinmiyor' : C.screenName(k, S.game), etot ? round2(100 * n / etot) : 0, n]),
      { testid: 'an-exits', fmt: (c, i) => (i === 1 ? `%${Math.round(c)}` : i === 2 ? C.fmtN(c) : c) });
    const segs = `<div class="seg" role="group" aria-label="Oyuncu">${[['all', 'Hepsi'], ['new', 'Yeni'], ['ret', 'Dönen']].map(([k, t]) => `<button type="button" data-act="end-seg" data-seg="${k}" aria-pressed="${seg === k}">${t}</button>`).join('')}</div>`;
    const lb = shareBars(LEN_ORDER, lens);
    const kpi = (id, label, v, pv, help) => `<div class="an-kpi" data-kpi="${id}"><div class="l">${esc(label)} ${info(help)}</div><div class="v num">${esc(fmtPct(v))}</div><div class="s">${delta(v, pv, 'rate')}${S.c && pv != null ? ` <span class="muted">önce ${esc(fmtPct(pv))}</span>` : ''}</div></div>`;
    body.innerHTML = filterOff(A) + `<div class="grid wide">
      ${card('Ekranlar', 'Oyun süresinin hangi ekranlarda geçtiği ve ekranın kaç oturumda açıldığı.', C.barList((A.screens || []).slice(0, 8).map((x) => ({ label: C.screenName(x.k, S.game), value: x.play_s, text: `${C.fmtDur(x.play_s)} · ${fmtPct(screensTot ? x.play_s / screensTot : 0)}` }))) + `<details class="table"><summary>Tablo olarak göster</summary>${sc.html}</details>`, sc.csv, ' data-block="an-screens"')}
      <article class="card" data-block="an-first"><div class="row"><h3>İlk dakika ${info('Biten oturumların ne kadar sürdüğü (oyunun önde olduğu süre). Oturum bittikten 35 dk sonra sayılır; 3 saniyeden kısa açılışlar hiç gelmez.')}</h3>${segs}</div>
        <div class="an-kpis">${kpi('lt30', '30 sn dolmadan çıkan', share(lens, tot, ['lt30']), plens ? share(plens, ptot, ['lt30']) : null, 'Oyunu hemen bırakanlar.')}
          ${kpi('lt60', '1 dk dolmadan çıkan', share(lens, tot, ['lt30', 'lt60']), plens ? share(plens, ptot, ['lt30', 'lt60']) : null, 'İlk dakikada gidenler: giriş, yükleme ya da ilk ekran sıkıyor olabilir.')}
          ${kpi('ge600', "10 dk'dan uzun", share(lens, tot, ['ge600']), plens ? share(plens, ptot, ['ge600']) : null, 'Oyuna gerçekten dalanlar.')}</div>
        ${lb.html}</article>
    </div>
    <div style="margin-top:12px">${card('Çıkış ekranı', 'Oyuncunun oyunu hangi ekrandayken bıraktığı. "Açılıyor"da bırakan, oyun yüklenmeden gitmiştir.', ex.html, ex.csv, ' data-block="an-exits"')}</div>
    ${A.ends_since && A.ends_since > A.from ? `<p class="note small">Çıkış ekranı ve oturum süresi ${esc(dLabel(A.ends_since))}'den beri tutuluyor.</p>` : ''}${rbHost()}`;
    rbMount('etkilesim');
  });
}

// ------------------------------------------------------------------ Huni
function tabFunnel(body) {
  load(body, 'funnel', (A) => {
    const F = A.funnel || { steps: [], by_ver: [], base: 0 }, P = A.prev_funnel;
    const steps = C.eventOrder(S.game, F.steps, (e) => e.k, (e) => e.players);
    const kf = S.game === KF.KF_GAME; // Katana Flash: the stage cards below the funnel (kf-stages.js, stats11.sql)
    let last = F.base;
    const rows = steps.map((e) => { const r = { k: e.k, name: C.eventName(e.k, S.game), n: e.players, ofBase: F.base ? e.players / F.base : null, step: last ? e.players / last : null, drop: Math.max(0, last - e.players) }; last = e.players; return r; });
    const pOf = (k) => { if (!P) return null; const x = P.steps.find((e) => e.k === k); return x && P.base ? x.players / P.base : null; };
    const t = table('funnel', fileName('huni'), ['Adım', 'Oyuncu', 'Yeni oyunculara oranı', 'Bir önceki adımdan', 'Kaybedilen'],
      rows.map((r) => [r.name, r.n, r.ofBase == null ? '' : round2(100 * r.ofBase), r.step == null ? '' : round2(100 * r.step), r.drop]),
      { testid: 'an-funnel', fmt: (c, i) => (i === 2 || i === 3 ? (c === '' ? '—' : `%${Math.round(c)}`) : i ? C.fmtN(c) : c) });
    const bars = `<ul class="bars an-funnel-bars">${[{ name: 'Yeni oyuncu', n: F.base, ofBase: 1, step: null }, ...rows].map((r) => `<li data-tip="${esc(r.name)}"><span class="name">${esc(r.name)}</span>
      <span class="val num">${C.fmtN(r.n)} · ${fmtPct(r.ofBase)}${r.step != null ? ` <span class="muted">(adımdan ${fmtPct(r.step)})</span>` : ''}${P && r.k ? ' ' + delta(r.ofBase, pOf(r.k), 'rate') : ''}</span>
      <span class="track"><span class="fill" style="width:${Math.max(0.5, Math.min(100, 100 * (r.ofBase || 0))).toFixed(1)}%"></span></span></li>`).join('')}</ul>`;
    // versions side by side: share of each version's new players that reached the step
    const V = F.by_ver || [];
    const keys = C.eventOrder(S.game, [...new Set(V.flatMap((v) => v.steps.map((e) => e.k)))], (k) => k, (k) => V.reduce((a, v) => a + (v.steps.find((e) => e.k === k)?.players || 0), 0)).slice(0, 12);
    const vt = V.length > 1 ? table('funnel-ver', fileName('huni-surum'), ['Adım', ...V.map((v) => `${v.ver} (${C.fmtN(v.new_players)})`)],
      keys.map((k) => [C.eventName(k, S.game), ...V.map((v) => { const x = v.steps.find((e) => e.k === k); return x && v.new_players ? round2(100 * x.players / v.new_players) : ''; })]),
      { testid: 'an-funnel-ver', fmt: (c, i) => (i ? (c === '' ? '—' : `%${Math.round(c)}`) : c) }) : null;
    const src = F.source === 'daily' ? '<p class="note small">Bu dönem 30 günden eski: kişi yerine adımın kaç kez geldiği sayılıyor.</p>' : '';
    const fnote = S.f && !F.filter_ok ? '<p class="note small">Huni yalnız portal ya da sürüm süzgeciyle ve son 30 gün içinde daraltılabilir; sayılar süzgeçsiz.</p>' : '';
    body.innerHTML = src + fnote + card('Yeni oyuncu hunisi', 'Dönemde oyunu ilk kez açanlar ve oyunun kendi adımlarına kaç kişinin ulaştığı. Adımlar oyunun kendi sırasıyla. "Adımdan": bir önceki adıma ulaşanların yüzde kaçı bu adıma geldi.',
      F.base || rows.length ? bars + `<details class="table"><summary>Tablo olarak göster</summary>${t.html}</details>` : '<p class="muted small">Bu dönemde veri yok.</p>', t.csv, ' data-block="an-funnel"')
      + (vt ? `<div style="margin-top:12px">${card('Sürümler yan yana', 'Her sürümle gelen yeni oyuncuların yüzde kaçı bu adıma ulaştı. Parantezde o sürümün yeni oyuncu sayısı.', vt.html, vt.csv, ' data-block="an-funnel-ver"')}</div>` : '')
      + (kf ? '<div id="anKf"></div>' : '') + rbHost();
    rbMount('huni');
    if (kf) KF.mount(document.getElementById('anKf'), { from: S.from, to: S.to, steps: F.steps, filtered: !!S.f });
  });
}

// ------------------------------------------------------------------ Geri dönüş
const RET_D = [1, 2, 3, 7, 14, 30];
function tabRetention(body) {
  load(body, 'retention', (A) => {
    if (A.cohorts == null) { body.innerHTML = '<p class="note" data-testid="an-ret-nofilter">Dönüş tablosu yalnız sürüm, portal ya da cihaz süzgeciyle daraltılabilir. Süzgeci kaldır ya da bunlardan birini seç.</p>'; return; }
    const byWeek = A.gran === 'week' || A.gran === 'month';
    const zero = () => Object.fromEntries(RET_D.flatMap((n) => [[`b${n}`, 0], [`i${n}`, 0]]));
    const groups = new Map();
    for (const r of A.cohorts) {
      const k = byWeek ? monday(r.d) : r.d;
      const g = groups.get(k) || { d: k, installs: 0, ...zero() };
      g.installs += r.installs;
      for (const n of RET_D) if (r[`d${n}`] != null) { g[`b${n}`] += r[`d${n}`]; g[`i${n}`] += r.installs; }
      groups.set(k, g);
    }
    const rows = [...groups.values()].sort((a, b) => (a.d < b.d ? 1 : -1));
    const all = rows.reduce((a, r) => { a.installs += r.installs; for (const n of RET_D) { a[`b${n}`] += r[`b${n}`]; a[`i${n}`] += r[`i${n}`]; } return a; }, { installs: 0, ...zero() });
    const cell = (r, n) => (r[`i${n}`] ? `<td class="n ret" style="--a:${Math.round(Math.min(1, (r[`b${n}`] / r[`i${n}`]) * 2.5) * 60)}%" title="${C.fmtN(r[`b${n}`])} / ${C.fmtN(r[`i${n}`])}">${fmtPct(r[`b${n}`] / r[`i${n}`])}</td>` : '<td class="n ret na" title="bu gün daha gelmedi">·</td>');
    const label = (d) => (byWeek ? `${dLabel(d)} haftası` : dLabel(d));
    const head = [byWeek ? 'Kurulum haftası' : 'Kurulum günü', 'Yeni', ...RET_D.map((n) => `${n}. gün`)];
    const csv = csvButton('retention', fileName('donus'), head, rows.map((r) => [r.d, r.installs, ...RET_D.map((n) => (r[`i${n}`] ? round2(100 * r[`b${n}`] / r[`i${n}`]) : ''))]));
    body.innerHTML = card('Geri dönüş tablosu', 'O gün (hafta) oyunu ilk kez açanların yüzde kaçı tam 1, 2, 3, 7, 14, 30 gün sonra yine oynadı. Koyu hücre: daha çok dönen; "·": o gün henüz gelmedi. Üstte ağırlıklı ortalama. Satırlar Gün seçiliyse gün, Hafta / Ay seçiliyse hafta.',
      rows.length ? `<div class="scroll-x"><table class="ret-t" data-testid="an-ret"><thead><tr>${head.map((h, i) => `<th${i ? ' class="n"' : ''}>${esc(h)}</th>`).join('')}</tr></thead>
        <tbody><tr class="avg"><td><b>Ortalama</b></td><td class="n">${C.fmtN(all.installs)}</td>${RET_D.map((n) => cell(all, n)).join('')}</tr>
        ${rows.map((r) => `<tr data-day="${esc(r.d)}"><td>${esc(label(r.d))}</td><td class="n">${C.fmtN(r.installs)}</td>${RET_D.map((n) => cell(r, n)).join('')}</tr>`).join('')}</tbody></table></div>`
        : '<p class="muted small">Bu dönemde veri yok (tablo her gece yenilenir; bugünün kurulumları yarın görünür).</p>', rows.length ? csv : '', ' data-block="an-ret"') + rbHost();
    rbMount('donus');
  });
}

// ------------------------------------------------------------------ Sürümler
function tabVersions(body) {
  load(body, 'versions', (A) => {
    const days = Math.max(1, diff(A.to, A.from) + 1);
    const rows = (A.versions || []).map((v) => ({ ...v, dau: v.player_days / days, avg: v.sessions ? v.play_s / v.sessions : 0, r1: rate(v.ret1), r7: rate(v.ret7), crash: v.sessions ? v.error_sessions / v.sessions : null }));
    const best = (f, ok = () => true, low = false) => { const c = rows.filter((r) => ok(r) && r[f] != null); return c.length < 2 ? null : c.reduce((a, r) => ((low ? r[f] < a[f] : r[f] > a[f]) ? r : a)); };
    const B = { dau: best('dau'), avg: best('avg', (r) => r.sessions >= 20), r1: best('r1', (r) => r.ret1.installs >= 10), r7: best('r7', (r) => r.ret7.installs >= 10), crash: best('crash', (r) => r.sessions >= 20, true) };
    const td = (r, f, txt) => `<td class="n${B[f] === r ? ' best' : ''}"${B[f] === r ? ' data-best' : ''}>${B[f] === r ? '★ ' : ''}${esc(txt)}</td>`;
    const head = ['Sürüm', 'İlk gün', 'Günlük ort. oyuncu', 'Yeni', 'Oturum', 'Ort. oyun', 'Ertesi gün dönen', '7. gün dönen', 'Çökme oranı'];
    const csv = csvButton('versions', fileName('surumler'), head, rows.map((r) => [r.ver, r.first_day, round2(r.dau), r.new_players, r.sessions, Math.round(r.avg), r.r1 == null ? '' : round2(100 * r.r1), r.r7 == null ? '' : round2(100 * r.r7), r.crash == null ? '' : round2(100 * r.crash)]));
    const g = A.gran === 'hour' ? 'day' : A.gran;
    const ser = A.series || [];
    const pts = ser.map((p) => ({ label: pointLabel(p.t, g), v: p.sessions, drill: `${g}:${p.t}` }));
    // the same-age comparison of two versions at the top (play-report.js mountCompare; game pages only)
    body.innerHTML = (S.game ? '<div id="anVc"></div><div style="margin-top:12px"></div>' : '') + filterOff(A) + card('Sürümler', 'Dönemde her sürümün oyuncusu, oturumu, süresi; o sürümle başlayan yeni oyuncuların dönüşü; hata görülen oturum payı (çökme oranı). ★ sütunun en iyisi (yeterli oyuncusu olanlar arasından; çökmede en düşük).',
      rows.length ? `<div class="scroll-x"><table class="an-t" data-testid="an-versions"><thead><tr>${head.map((h, i) => `<th${i ? ' class="n"' : ''}>${esc(h)}</th>`).join('')}</tr></thead>
        <tbody>${rows.map((r) => `<tr data-ver="${esc(r.ver)}"><td><b>${esc(r.ver)}</b></td><td class="n">${esc(r.first_day ? dLabel(r.first_day) : '—')}</td>${td(r, 'dau', fmt1(r.dau))}<td class="n">${C.fmtN(r.new_players)}</td><td class="n">${C.fmtN(r.sessions)}</td>
          ${td(r, 'avg', C.fmtDur(r.avg))}${td(r, 'r1', fmtPct(r.r1))}${td(r, 'r7', fmtPct(r.r7))}${td(r, 'crash', r.crash == null ? '—' : `%${(Math.round(r.crash * 1000) / 10).toLocaleString('tr-TR')}`)}</tr>`).join('')}</tbody></table></div>`
        : '<p class="muted small">Bu dönemde veri yok.</p>', rows.length ? csv : '', ' data-block="an-versions"')
      + `<div style="margin-top:12px">${card('Oturumlar ve sürüm çıkışları', 'Dönemin oturumları; kesik dikey çizgi: o gün yeni bir sürüm ilk kez görüldü.', chart(pts, { markers: releaseMarks({ ...A, gran: g }, ser) }), '', ' data-block="an-releases"')}</div>`;
    if (S.game) PR.mountCompare(document.getElementById('anVc'), { game: S.game, releases: A.releases || [] });
    if (S.game === RBC.RB_GAME) { document.querySelector('[data-block="an-releases"]')?.parentElement.insertAdjacentHTML('afterend', rbHost()); rbMount('surumler'); }
  });
}

// ------------------------------------------------------------------ Gelir
function tabRevenue(body) {
  load(body, 'revenue', (A) => {
    const R = A.revenue || { rows: [], totals: [], entries: [] };
    const curs = [...new Set(R.totals.map((t) => t.currency))];
    S.cur = curs.includes(S.cur) ? S.cur : curs[0];
    const pt = (c) => (A.prev_totals || []).find((x) => x.currency === c);
    const cards = R.totals.map((t) => {
      const p = pt(t.currency), ar = t.player_days ? t.counted / t.player_days : null, par = p && p.player_days ? p.counted / p.player_days : null;
      return `<div class="an-kpi" data-kpi="rev-${esc(t.currency)}"><div class="l">Kazanç (${esc(t.currency)}) ${info('Elle girilen portal kazancı. Para birimleri toplanmaz, çevrilmez.')}</div><div class="v num">${esc(C.money(t.amount, t.currency))}</div><div class="s">${delta(Number(t.amount), p ? Number(p.amount) : null)}</div></div>`
        + `<div class="an-kpi" data-kpi="arpdau-${esc(t.currency)}"><div class="l">ARPDAU (${esc(t.currency)}) ${info('Oyuncu başına günlük kazanç: CrazyGames kazancı ÷ kazanç girilen günlerin CrazyGames oyuncuları. Playgama ve Yandex oyuncusu bizde sayılmaz.')}</div><div class="v num">${ar == null ? '—' : esc(C.money(ar, t.currency))}</div><div class="s">${delta(ar, par)}</div></div>`
        + `<div class="an-kpi" data-kpi="per1000-${esc(t.currency)}"><div class="l">1000 oturum başına (${esc(t.currency)}) ${info('CrazyGames kazancının her 1000 oyun açılışına düşen kısmı.')}</div><div class="v num">${t.sessions ? esc(C.money((1000 * t.counted) / t.sessions, t.currency)) : '—'}</div></div>`;
    }).join('');
    // the chosen currency over time (sum of the portals); the table per portal
    const g = A.gran === 'hour' ? 'day' : A.gran;
    const buckets = [...new Set(R.rows.filter((r) => r.currency === S.cur).map((r) => r.t))].sort();
    const pts = buckets.map((t) => { const rs = R.rows.filter((r) => r.currency === S.cur && r.t === t); const sum = rs.reduce((a, r) => a + Number(r.amount), 0);
      return { label: pointLabel(t, g), v: sum, tip: `${pointLabel(t, g)}: ${rs.map((r) => `${C.V.REVENUE_PORTALS[r.portal] || r.portal} ${C.money(r.amount, r.currency)}`).join(', ')}`, drill: `${g}:${t}` }; });
    const tb = table('revenue', fileName('gelir'), [unitWord(g), 'Portal', 'Para', 'Kazanç', 'Oyuncu-gün', 'Oturum'],
      R.rows.map((r) => [r.t, C.V.REVENUE_PORTALS[r.portal] || r.portal, r.currency, Number(r.amount), r.player_days, r.sessions]), { testid: 'an-revenue', fmt: (c, i) => (i === 3 ? fmt2(c) : i >= 4 ? C.fmtN(c) : c) });
    const curChips = curs.length > 1 ? `<div class="chips" role="group" aria-label="Para birimi">${curs.map((c) => `<button type="button" data-act="an-cur" data-cur="${c}" aria-pressed="${c === S.cur}">${c}</button>`).join('')}</div>` : '';
    body.innerHTML = (R.totals.length ? `<div class="an-kpis" data-testid="an-rev-kpis">${cards}</div>` : '<p class="note small">Bu dönem için girilmiş kazanç yok.</p>')
      + (pts.length ? `<div style="margin-top:12px">${card(`Kazanç (${S.cur})`, 'Seçili para biriminde dönemin kazancı; çubuğa dokununca portallara bölünmüşü.', curChips + chart(pts, { fmt: (v) => C.money(v, S.cur) }) + `<details class="table"><summary>Tablo olarak göster</summary>${tb.html}</details>`, tb.csv, ' data-block="an-rev-chart"')}</div>` : '')
      + (S.game ? '<div style="margin-top:12px" id="anRevForm"></div>' : '<p class="small muted" style="margin-top:12px">Kazanç her oyunun kendi Gelir sekmesinden girilir.</p>');
    if (S.game) paintRevForm(R.entries || []);
  });
}
/** the entry form and the latest entries (st_admin_revenue_upsert / _delete); kept while typing (see app.js refresh) */
function paintRevForm(entries) {
  const el = document.getElementById('anRevForm');
  if (!el) return;
  const V = C.V, e = S.revEdit || { day: add(today(), -1), portal: 'crazygames', amount: '', currency: 'USD', note: '' };
  const errs = S.revErrs || [];
  const cur0 = { crazygames: 'USD', playgama: 'USD', yandex: 'RUB', gamepix: 'EUR', other: 'USD' };
  el.innerHTML = card(e.editing ? 'Kazancı düzelt' : 'Kazanç gir', 'Portalın panelindeki günlük kazancı yaz. Aynı gün ve portal yeniden kaydedilirse eskisinin yerine geçer.',
    `<form class="form" id="anRevF" novalidate>
      ${errs.length ? `<div class="errors" data-testid="rev-errors"><b>Düzelt:</b><ul>${errs.map((x) => `<li>${esc(x.msg)}</li>`).join('')}</ul></div>` : ''}
      ${S.revMsg ? `<p class="ok-msg" data-testid="rev-ok">${esc(S.revMsg)}</p>` : ''}
      <div class="two">
        <label class="f"><span>Gün</span><input type="date" name="day" value="${esc(e.day)}" min="${V.REVENUE_FIRST_DAY}" max="${today()}"></label>
        <label class="f"><span>Portal</span><select name="portal">${Object.entries(V.REVENUE_PORTALS).map(([k, t]) => `<option value="${k}" ${k === e.portal ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select></label>
        <label class="f"><span>Tutar</span><input name="amount" inputmode="decimal" autocomplete="off" placeholder="ör. 12,50" value="${esc(e.amount)}"></label>
        <label class="f"><span>Para birimi</span><select name="currency">${V.REVENUE_CURRENCIES.map((c) => `<option value="${c}" ${c === e.currency ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
      </div>
      <label class="f"><span>Not (isteğe bağlı)</span><input name="note" maxlength="200" value="${esc(e.note)}"></label>
      <div class="row"><button class="btn primary" type="submit">Kaydet</button>${e.editing ? '<button class="btn" type="button" data-act="an-rev-cancel">Vazgeç</button>' : ''}</div>
    </form>
    ${entries.length ? `<div class="sub-h">Son girilenler</div><div class="scroll-x"><table class="an-t" data-testid="rev-entries"><thead><tr><th>Gün</th><th>Portal</th><th class="n">Tutar</th><th>Not</th><th></th></tr></thead>
      <tbody>${entries.slice(0, 12).map((r) => `<tr><td>${esc(dLabel(r.day))}</td><td>${esc(V.REVENUE_PORTALS[r.portal] || r.portal)}</td><td class="n">${esc(C.money(r.amount, r.currency))}</td><td class="small">${esc(r.note || '')}</td>
        <td class="n nowrap"><button class="ghost" type="button" data-act="an-rev-edit" data-day="${esc(r.day)}" data-portal="${esc(r.portal)}">Düzenle</button> <button class="ghost" type="button" data-act="an-rev-del" data-day="${esc(r.day)}" data-portal="${esc(r.portal)}">Sil</button></td></tr>`).join('')}</tbody></table></div>` : ''}`, '', ' data-block="an-rev-form"');
  S.revEntries = entries;
  const f = document.getElementById('anRevF');
  f.portal.onchange = () => { f.currency.value = cur0[f.portal.value] || 'USD'; };
  f.onsubmit = async (ev) => {
    ev.preventDefault();
    const draft = { day: f.day.value, game: S.game, portal: f.portal.value, amount: f.amount.value, currency: f.currency.value, note: f.note.value };
    S.revEdit = { ...draft, editing: !!(S.revEdit && S.revEdit.editing) };
    S.revMsg = '';
    const c = V.checkRevenue(draft, { today: today() });
    if (!c.ok) { S.revErrs = c.errors; paintRevForm(entries); return; }
    f.querySelector('button[type=submit]').disabled = true;
    try {
      await C.rpc('st_admin_revenue_upsert', { p_day: c.value.day, p_game: c.value.game, p_portal: c.value.portal, p_amount: c.value.amount, p_currency: c.value.currency, p_note: c.value.note });
      S.revErrs = [];
      S.revEdit = null;
      S.revMsg = `Kaydedildi: ${dLabel(c.value.day)}, ${V.REVENUE_PORTALS[c.value.portal]}, ${C.money(c.value.amount, c.value.currency)}.`;
      C.formDone();
      refresh();
    } catch (e2) { S.revErrs = [{ field: 'sunucu', msg: C.serverFieldMsg(e2) }]; paintRevForm(entries); }
  };
}

// ------------------------------------------------------------------ Teknik
function tabTech(body) {
  load(body, 'tech', (A) => {
    const X = { ...(A.tech || {}), game: S.game || '' };
    const seen = new Set(X.seen || []), parts = [], never = [];
    const B = C.legacy.blocks;
    if (seen.has('ad')) parts.push(B.adsBlock(X)); else never.push('Reklam');
    if (seen.has('load')) parts.push(B.loadBlock(X)); else never.push('Yükleme');
    if (seen.has('fps') || seen.has('hitch')) parts.push(B.smoothBlock(X)); else never.push('Akıcılık');
    const E = X.errors || [];
    const es = E.reduce((a, r) => a + r.error_sessions, 0), ss = E.reduce((a, r) => a + r.sessions, 0);
    const et = table('errors', fileName('hatalar'), ['Sürüm', 'Oturum', 'Hatalı oturum', 'Çökme oranı', 'Rapor'], E.map((r) => [r.ver, r.sessions, r.error_sessions, r.sessions ? round2(100 * r.error_sessions / r.sessions) : '', r.reports]),
      { testid: 'an-errors', fmt: (c, i) => (i === 3 ? (c === '' ? '—' : `%${String(c).replace('.', ',')}`) : i ? C.fmtN(c) : c) });
    body.innerHTML = filterOff(A)
      + (parts.length ? `<div class="grid wide">${parts.join('')}</div>` : '')
      + (never.length ? `<div class="note" data-testid="meas-none" style="margin-top:12px"><b>${esc(never.join(', '))}:</b> ${esc(C.legacy.measNote(S.game))}</div>` : '')
      + `<div style="margin-top:12px">${card(`Hatalar · çökme oranı ${ss ? `%${(Math.round(1000 * es / ss) / 10).toLocaleString('tr-TR')}` : '—'}`, 'Hata görülen oturumların bütün oturumlara oranı, sürüm sürüm (CrazyGames\'in "crash rate" sayısıyla karşılaştır).',
        et.html + (S.game ? '<p class="small" style="margin-top:8px">Hataların kendisi: <button type="button" class="linkish" data-act="sub" data-sub="errors">Hatalar sekmesi</button>.</p>' : ''), et.csv, ' data-block="an-errors"')}</div>`;
    body.insertAdjacentHTML('beforeend', rbHost());
    rbMount('teknik');
  });
}

// ------------------------------------------------------------------ Platformlar (supabase/studio/stats6.sql st_platforms)
// Every platform of the game and their sum: CrazyGames and our site from our own statistics, Playgama / Yandex / Play Store
// from the numbers typed in or uploaded (st_platform_daily) — nothing is counted twice. Earnings: st_revenue.
const PL_ORDER = ['crazygames', 'site', 'playgama', 'yandex', 'googleplay'];
const PL_CUR = { playgama: 'USD', yandex: 'RUB', googleplay: 'USD' };
const orDash = (v, f = C.fmtN) => (v == null ? '—' : f(v));
const revText = (list) => (list && list.length ? list.map((r) => C.money(r.amount, r.currency)).join(' · ') : '—');
const plName = (k) => C.V.PLATFORMS[k] || k;
function tabPlatforms(body) {
  load(body, 'platforms', (P) => {
    const pl = PL_ORDER.includes(S.pl) ? S.pl : 'genel';
    const chips = `<div class="chips an-dims" role="group" aria-label="Platform" data-testid="an-pl-chips">${[['genel', 'Genel'], ...PL_ORDER.map((k) => [k, plName(k)])]
      .map(([k, t]) => `<button type="button" data-act="an-pl" data-pl="${k}" aria-pressed="${k === pl}">${esc(t)}</button>`).join('')}</div>`;
    body.innerHTML = chips + `<div id="anPlBody" style="margin-top:10px">${pl === 'genel' ? platOverall(P) : platOne(P, pl)}</div>`;
    if (pl !== 'genel' && C.V.ENTERED_PLATFORMS.includes(pl) && S.game) { paintPlatForm(P, pl); paintCsv(pl); }
    if (pl !== 'genel' && S.game) PR.mount(document.getElementById('anPlay'), { game: S.game, from: S.from, to: S.to, portal: pl });
  });
}
function platOverall(P) {
  const O = P.overall || {};
  const g = P.gran;
  const rows = (P.platforms || []).map((p) => [plName(p.platform), p.totals.players, p.totals.plays, p.totals.playtime_s, revText(p.totals.revenue), p.last_day ? dLabel(p.last_day) : '—', p.source === 'analytics' ? 'ölçüm' : 'elle · CSV']);
  const csv = csvButton('platforms', fileName('platformlar'), ['Platform', 'Oyuncu', 'Oynama', 'Oyun süresi (sn)', 'Kazanç', 'Son veri', 'Kaynak'],
    (P.platforms || []).map((p) => [plName(p.platform), p.totals.players ?? '', p.totals.plays ?? '', p.totals.playtime_s ?? '', revText(p.totals.revenue), p.last_day || '', p.source]));
  const byT = (t) => (P.platforms || []).map((p) => { const x = p.series.find((s) => s.t === t); return x && x.players != null ? `${plName(p.platform)} ${C.fmtN(x.players)}` : null; }).filter(Boolean).join(', ');
  const pts = (O.series || []).map((s) => ({ label: pointLabel(s.t, g), v: s.players, tip: `${pointLabel(s.t, g)}: ${s.players == null ? '—' : C.fmtN(s.players)} oyuncu${byT(s.t) ? ` (${byT(s.t)})` : ''}` }));
  return `<div class="an-kpis" data-testid="an-pl-kpis">
      <div class="an-kpi" data-kpi="pl-players"><div class="l">Oyuncu (bütün platformlar) ${info('Her platformun oyuncusu toplandı: CrazyGames ve kendi sitemizde bir günde oyunu açan kişi (günler toplanır); Playgama, Yandex ve Play Store\'da platformun bildirdiği sayı. Hiçbir platform iki kez sayılmaz.')}</div><div class="v num">${esc(orDash(O.players))}</div></div>
      ${(O.revenue || []).map((r) => `<div class="an-kpi" data-kpi="pl-rev-${esc(r.currency)}"><div class="l">Kazanç (${esc(r.currency)}) ${info('Bütün platformların kazancı, para birimine göre (çevrilmez, toplanmaz).')}</div><div class="v num">${esc(C.money(r.amount, r.currency))}</div></div>`).join('')}
    </div>
    <div style="margin-top:12px">${card('Platformlar yan yana', 'Dönemde her platformun oyuncusu, oynama sayısı, oyun süresi ve kazancı. "Son veri": o platformdan gelen en son gün; platform sayıları geç gelir. "—": o sayı yok.',
      `<div class="scroll-x"><table class="an-t" data-testid="an-plat-table"><thead><tr><th>Platform</th><th class="n">Oyuncu</th><th class="n">Oynama</th><th class="n">Oyun süresi</th><th class="n">Kazanç</th><th class="n">Son veri</th><th class="n">Kaynak</th></tr></thead>
      <tbody>${(P.platforms || []).map((p, i) => `<tr data-pl="${esc(p.platform)}"><td><button type="button" class="linkish" data-act="an-pl" data-pl="${esc(p.platform)}">${esc(rows[i][0])}</button></td>
        <td class="n">${esc(orDash(p.totals.players))}</td><td class="n">${esc(orDash(p.totals.plays))}</td><td class="n">${esc(orDash(p.totals.playtime_s, C.fmtDur))}</td>
        <td class="n">${esc(rows[i][4])}</td><td class="n" data-k="last">${esc(rows[i][5])}</td><td class="n small">${esc(rows[i][6])}</td></tr>`).join('')}</tbody></table></div>`, csv, ' data-block="an-plat-table"')}</div>
    <div style="margin-top:12px">${card('Oyuncu, bütün platformlar', 'Her çubuk o gün (hafta, ay) bütün platformların oyuncusu; dokununca platformlara bölünmüşü. Haftalık girilen sayı haftanın ilk gününde görünür.', chart(pts), '', ' data-block="an-plat-chart"')}</div>`;
}
function platOne(P, pl) {
  const p = (P.platforms || []).find((x) => x.platform === pl) || { totals: {}, series: [] };
  const T = p.totals || {}, g = P.gran;
  const per = T.players && T.playtime_s != null ? T.playtime_s / T.players : null;
  const kpi = (id, label, v, help) => `<div class="an-kpi" data-kpi="${id}"><div class="l">${esc(label)} ${info(help)}</div><div class="v num">${esc(v)}</div></div>`;
  const cards = [kpi('players', 'Oyuncu', orDash(T.players), p.source === 'analytics' ? 'Bir günde oyunu açan kişi; günler toplanır.' : 'Platformun bildirdiği oyuncu (günlük ya da haftalık giriş).'),
    kpi('plays', 'Oynama', orDash(T.plays), 'Oyunun açılma sayısı (oturum).'),
    kpi('playtime', 'Oyun süresi', orDash(T.playtime_s, C.fmtDur), 'Toplam oyun süresi.'),
    kpi('per', 'Oyuncu başına süre', orDash(per, C.fmtDur), 'Oyun süresi ÷ oyuncu.'),
    kpi('ad', 'Reklam gösterimi', orDash(T.ad_impr), p.source === 'analytics' ? 'Kendi ölçümümüzde portala göre reklam sayısı yok.' : 'Platformun bildirdiği reklam gösterimi.'),
    ...(T.revenue || []).flatMap((r) => [kpi(`rev-${r.currency}`, `Kazanç (${r.currency})`, C.money(r.amount, r.currency), 'Bu platformun kazancı.'),
      kpi(`arp-${r.currency}`, `Oyuncu başına kazanç (${r.currency})`, T.players ? C.money(r.amount / T.players, r.currency) : '—', 'Kazanç ÷ oyuncu (günlük sayılan yerlerde günlük oyuncu başına).')])].join('');
  const pts = (p.series || []).map((s) => ({ label: pointLabel(s.t, g), v: s.players, tip: `${pointLabel(s.t, g)}: ${orDash(s.players)} oyuncu, ${orDash(s.plays)} oynama${Object.keys(s.revenue || {}).length ? ', ' + Object.entries(s.revenue).map(([c, a]) => C.money(a, c)).join(' · ') : ''}` }));
  const head = [unitWord(g), 'Oyuncu', 'Oynama', 'Oyun süresi', 'Reklam', 'Kazanç'];
  const tb = table('platform', fileName(`platform-${pl}`), head, (p.series || []).filter((s) => s.players != null || s.plays != null || Object.keys(s.revenue || {}).length)
    .map((s) => [s.t, s.players ?? '', s.plays ?? '', s.playtime_s ?? '', s.ad_impr ?? '', Object.entries(s.revenue || {}).map(([c, a]) => `${a} ${c}`).join(' ')]),
    { testid: 'an-pl-series', fmt: (c, i) => (i === 0 ? c : c === '' ? '—' : i === 3 ? C.fmtDur(c) : i === 5 ? c : C.fmtN(c)) });
  const last = `<p class="small" data-testid="an-last"><span class="badge${p.last_day ? '' : ' off'}">${p.last_day ? `son veri: ${esc(dLabel(p.last_day))}` : 'henüz veri yok'}</span>
    ${p.source === 'analytics' ? '<span class="muted">kendi ölçümümüz</span>' : '<span class="muted">platformun panelinden elle ya da CSV ile; sayılar geç gelir</span>'}</p>`;
  const link = p.source === 'analytics' ? `<p class="small"><button type="button" class="linkish" data-act="an-filter" data-f="portal:${esc(pl)}">Bu portalla Genel bakış ve sekmeler →</button></p>` : '';
  const forms = p.source === 'analytics' || !S.game ? '' : `<div class="grid wide" style="margin-top:12px"><div id="anPlatForm"></div><div id="anCsv"></div></div>`;
  // our own portals on a game page: the play report (CrazyGames karnesi, ads, rotate, load, first day; play-report.js)
  const play = p.source === 'analytics' && S.game ? '<div id="anPlay"></div>' : '';
  return last + link + `<div class="an-kpis" data-testid="an-pl-kpis">${cards}</div>${play}
    <div style="margin-top:12px">${card(`${plName(pl)}: oyuncu`, 'Dönemdeki oyuncu; boş çubuk: o gün sayı yok.', pts.some((x) => x.v != null) ? chart(pts) : '<p class="muted small">Bu dönemde sayı yok.</p>', tb.csv, ' data-block="an-pl-chart"')}
    <details class="table"><summary>Tablo olarak göster</summary>${tb.html}</details></div>` + forms;
}
/** the form for one day or one week of a platform, and its latest entries */
function paintPlatForm(P, pl) {
  const el = document.getElementById('anPlatForm');
  if (!el) return;
  const e = S.platEdit && S.platEdit.platform === pl ? S.platEdit : { platform: pl, day: add(today(), -1), span: pl === 'playgama' ? 7 : 1, players: '', plays: '', playtime_min: '', ad_impr: '', revenue: '', currency: PL_CUR[pl], note: '' };
  const errs = S.platErrs || [];
  const entries = (P.entries || []).filter((x) => x.platform === pl);
  S.platEntries = entries;
  const n2s = (v) => (v == null ? '' : String(v).replace('.', ','));
  el.innerHTML = card(e.editing ? 'Sayıları düzelt' : 'Sayı gir', 'Platformun panelinden bir günün ya da bir haftanın sayılarını yaz. Boş bırakılan sayı "—" olarak kalır. Aynı gün yeniden kaydedilirse eskisinin yerine geçer.',
    `<form class="form" id="anPlatF" novalidate>
      ${errs.length ? `<div class="errors" data-testid="pl-errors"><b>Düzelt:</b><ul>${errs.map((x) => `<li>${esc(x.msg)}</li>`).join('')}</ul></div>` : ''}
      ${S.platMsg ? `<p class="ok-msg" data-testid="pl-ok">${esc(S.platMsg)}</p>` : ''}
      <div class="two">
        <label class="f"><span>Dönem</span><select name="span"><option value="1" ${+e.span === 1 ? 'selected' : ''}>Bir gün</option><option value="7" ${+e.span === 7 ? 'selected' : ''}>Bir hafta (7 gün)</option></select></label>
        <label class="f"><span>${+e.span === 7 ? 'Haftanın ilk günü' : 'Gün'}</span><input type="date" name="day" value="${esc(e.day)}" min="2026-01-01" max="${today()}"></label>
        <label class="f"><span>Oyuncu</span><input name="players" inputmode="numeric" value="${esc(n2s(e.players))}"></label>
        <label class="f"><span>Oynama</span><input name="plays" inputmode="numeric" value="${esc(n2s(e.plays))}"></label>
        <label class="f"><span>Oyun süresi (dakika, toplam)</span><input name="playtime_min" inputmode="decimal" value="${esc(n2s(e.playtime_min))}"></label>
        <label class="f"><span>Reklam gösterimi</span><input name="ad_impr" inputmode="numeric" value="${esc(n2s(e.ad_impr))}"></label>
        <label class="f"><span>Kazanç</span><input name="revenue" inputmode="decimal" placeholder="ör. 12,50" value="${esc(n2s(e.revenue))}"></label>
        <label class="f"><span>Para birimi</span><select name="currency">${C.V.REVENUE_CURRENCIES.map((c) => `<option value="${c}" ${c === e.currency ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
      </div>
      <label class="f"><span>Not (isteğe bağlı)</span><input name="note" maxlength="200" value="${esc(e.note || '')}"></label>
      <div class="row"><button class="btn primary" type="submit">Kaydet</button>${e.editing ? '<button class="btn" type="button" data-act="an-plat-cancel">Vazgeç</button>' : ''}</div>
    </form>
    ${entries.length ? `<div class="sub-h">Son girilenler</div><div class="scroll-x"><table class="an-t" data-testid="pl-entries"><thead><tr><th>Gün</th><th class="n">Oyuncu</th><th class="n">Oynama</th><th class="n">Süre</th><th class="n">Reklam</th><th class="n">Kazanç</th><th>Kaynak</th><th></th></tr></thead>
      <tbody>${entries.slice(0, 14).map((r) => `<tr data-day="${esc(r.day)}"><td>${esc(r.span === 7 ? `${dLabel(r.day)} haftası` : dLabel(r.day))}</td><td class="n">${esc(orDash(r.players))}</td><td class="n">${esc(orDash(r.plays))}</td>
        <td class="n">${esc(orDash(r.playtime_s, C.fmtDur))}</td><td class="n">${esc(orDash(r.ad_impr))}</td><td class="n">${r.revenue ? esc(C.money(r.revenue.amount, r.revenue.currency)) : '—'}</td><td class="small">${esc({ manual: 'elle', csv: 'CSV', auto: 'otomatik' }[r.source] || r.source)}</td>
        <td class="n nowrap"><button class="ghost" type="button" data-act="an-plat-edit" data-day="${esc(r.day)}">Düzenle</button> <button class="ghost" type="button" data-act="an-plat-del" data-day="${esc(r.day)}">Sil</button></td></tr>`).join('')}</tbody></table></div>` : ''}`, '', ' data-block="an-plat-form"');
  const f = document.getElementById('anPlatF');
  f.span.onchange = () => { S.platEdit = { ...readPlatForm(f, pl), editing: !!(S.platEdit && S.platEdit.editing) }; paintPlatForm(P, pl); };
  f.onsubmit = async (ev) => {
    ev.preventDefault();
    const draft = readPlatForm(f, pl);
    S.platEdit = { ...draft, editing: !!(S.platEdit && S.platEdit.editing) };
    S.platMsg = '';
    const c = C.V.checkPlatformEntry(draft, { today: today() });
    if (!c.ok) { S.platErrs = c.errors; paintPlatForm(P, pl); return; }
    f.querySelector('button[type=submit]').disabled = true;
    try {
      await C.rpc('st_admin_platform_upsert', { p_game: S.game, p_platform: pl, p_day: c.value.day, p_span: c.value.span, p: c.value.p, p_currency: c.value.currency, p_note: c.value.note });
      S.platErrs = []; S.platEdit = null;
      S.platMsg = `Kaydedildi: ${plName(pl)}, ${c.value.span === 7 ? `${dLabel(c.value.day)} haftası` : dLabel(c.value.day)}.`;
      C.formDone();
      refresh();
    } catch (e2) { S.platErrs = [{ field: 'sunucu', msg: C.serverFieldMsg(e2) }]; paintPlatForm(P, pl); }
  };
}
const readPlatForm = (f, pl) => ({ platform: pl, day: f.day.value, span: +f.span.value, players: f.players.value, plays: f.plays.value, playtime_min: f.playtime_min.value,
  ad_impr: f.ad_impr.value, revenue: f.revenue.value, currency: f.currency.value, note: f.note.value });

/** CSV import: paste or pick the file, say which column is which, look at the preview, import (all or nothing per 400 days) */
const CSV_FIELDS = [['day', 'Tarih *'], ['players', 'Oyuncu'], ['plays', 'Oynama'], ['playtime_s', 'Oyun süresi'], ['ad_impr', 'Reklam gösterimi'], ['revenue', 'Kazanç']];
function paintCsv(pl) {
  const el = document.getElementById('anCsv');
  if (!el) return;
  const X = S.csv && S.csv.platform === pl ? S.csv : (S.csv = { platform: pl, text: '', parsed: null, map: {}, dateFormat: 'auto', timeUnit: 'min', currency: PL_CUR[pl], msg: '', err: '' });
  let preview = '';
  if (X.parsed) {
    const H = X.parsed.header;
    const sel = (f) => `<select data-csvmap="${f}" aria-label="${esc(CSV_FIELDS.find((x) => x[0] === f)[1])}"><option value="">—</option>${H.map((h, i) => `<option value="${i}" ${X.map[f] === i ? 'selected' : ''}>${esc(h || `${i + 1}. sütun`)}</option>`).join('')}</select>`;
    const M = C.V.mapCsv(X.parsed.rows, X.map, { dateFormat: X.dateFormat, timeUnit: X.timeUnit, today: today() });
    X.mapped = M;
    preview = `<div class="two" style="margin-top:8px">${CSV_FIELDS.map(([f, t]) => `<label class="f"><span>${esc(t)}</span>${sel(f)}</label>`).join('')}
        <label class="f"><span>Tarih biçimi</span><select data-csvopt="dateFormat">${[['auto', 'Otomatik'], ['ymd', 'YYYY-AA-GG'], ['dmy', 'GG.AA.YYYY'], ['mdy', 'AA/GG/YYYY']].map(([k, t]) => `<option value="${k}" ${k === X.dateFormat ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
        <label class="f"><span>Oyun süresi birimi</span><select data-csvopt="timeUnit">${[['s', 'saniye'], ['min', 'dakika'], ['h', 'saat']].map(([k, t]) => `<option value="${k}" ${k === X.timeUnit ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
        <label class="f"><span>Kazancın para birimi</span><select data-csvopt="currency">${C.V.REVENUE_CURRENCIES.map((c) => `<option value="${c}" ${c === X.currency ? 'selected' : ''}>${c}</option>`).join('')}</select></label></div>
      <p class="small" data-testid="csv-summary">${C.fmtN(X.parsed.rows.length)} satır okundu · <b>${C.fmtN(M.rows.length)} gün içe aktarılabilir</b>${M.errors.length ? ` · <span class="delta down">${C.fmtN(M.errors.length)} hatalı satır atlanacak</span>` : ''}${M.skipped ? ` · ${C.fmtN(M.skipped)} boş satır` : ''}</p>
      ${M.errors.length ? `<ul class="help small" data-testid="csv-errors">${M.errors.slice(0, 6).map((x) => `<li>${esc(x.msg)}</li>`).join('')}${M.errors.length > 6 ? `<li>… ve ${C.fmtN(M.errors.length - 6)} satır daha</li>` : ''}</ul>` : ''}
      ${M.rows.length ? `<div class="scroll-x"><table class="an-t" data-testid="csv-preview"><thead><tr><th>Gün</th><th class="n">Oyuncu</th><th class="n">Oynama</th><th class="n">Süre</th><th class="n">Reklam</th><th class="n">Kazanç</th></tr></thead>
        <tbody>${M.rows.slice(0, 8).map((r) => `<tr><td>${esc(r.day)}</td><td class="n">${esc(orDash(r.players))}</td><td class="n">${esc(orDash(r.plays))}</td><td class="n">${esc(orDash(r.playtime_s, C.fmtDur))}</td><td class="n">${esc(orDash(r.ad_impr))}</td><td class="n">${r.revenue == null ? '—' : esc(C.money(r.revenue, X.currency))}</td></tr>`).join('')}</tbody></table></div>
        ${M.rows.length > 8 ? `<p class="small muted">İlk 8 gün gösteriliyor.</p>` : ''}` : ''}
      <div class="row" style="margin-top:8px"><button type="button" class="btn primary" data-act="an-csv-import" ${M.rows.length && X.map.day != null ? '' : 'disabled'}>${C.fmtN(M.rows.length)} günü içe aktar</button></div>`;
  }
  el.innerHTML = card('CSV yükle', 'Platformun panelinden indirilen günlük tabloyu (CSV) yapıştır ya da dosyayı seç; hangi sütunun ne olduğunu seç, önizlemeye bak, içe aktar. Aynı gün yeniden gelirse eskisinin yerine geçer.',
    `<div class="form" data-testid="csv-box">
      ${X.msg ? `<p class="ok-msg" data-testid="csv-ok">${esc(X.msg)}</p>` : ''}${X.err ? `<div class="errors" data-testid="csv-err">${esc(X.err)}</div>` : ''}
      <label class="f"><span>CSV metni</span><textarea id="anCsvText" rows="4" spellcheck="false" placeholder="Tarih;Oyuncu;Kazanç…">${esc(X.text)}</textarea></label>
      <div class="row"><input type="file" id="anCsvFile" accept=".csv,.txt,text/csv,text/plain"><button type="button" class="btn" data-act="an-csv-read">Oku</button></div>
      ${preview}</div>`, '', ' data-block="an-csv"');
  const file = document.getElementById('anCsvFile');
  file.onchange = async () => { const f0 = file.files && file.files[0]; if (!f0) return; if (f0.size > 2 * 1048576) { X.err = 'Dosya çok büyük (en çok 2 MB).'; paintCsv(pl); return; } X.text = await f0.text(); readCsv(pl); };
}
function readCsv(pl) {
  const X = S.csv;
  const t = document.getElementById('anCsvText');
  if (t) X.text = t.value;
  X.msg = ''; X.err = '';
  const parsed = C.V.parseCsv(X.text);
  if (!parsed.header.length || !parsed.rows.length) { X.parsed = null; X.err = 'Tablo okunamadı: ilk satır başlık, altında günler olmalı.'; paintCsv(pl); return; }
  X.parsed = parsed;
  X.map = C.V.guessMapping(parsed.header);
  paintCsv(pl);
}
async function importCsv(pl, btn) {
  const X = S.csv, rows = (X.mapped && X.mapped.rows) || [];
  if (!rows.length) return;
  btn.disabled = true;
  let done = 0;
  try {
    for (let i = 0; i < rows.length; i += 400) {
      const part = rows.slice(i, i + 400);
      await C.rpc('st_admin_platform_import', { p_game: S.game, p_platform: pl, p_rows: part, p_currency: part.some((r) => r.revenue != null) ? X.currency : null });
      done += part.length;
    }
    S.csv = { ...X, text: '', parsed: null, mapped: null, msg: `${C.fmtN(done)} gün içe aktarıldı (${plName(pl)}).`, err: '' };
    C.formDone();
    refresh();
  } catch (e) {
    X.err = `${done ? `${C.fmtN(done)} gün aktarıldı; ` : ''}kalanı olmadı: ${C.serverFieldMsg(e)}`;
    paintCsv(pl);
  }
}
// the top players' account / ranked selects: a new first page
document.addEventListener('change', (ev) => {
  const t = ev.target;
  if (!t.matches?.('[data-tpf]') || !T.node || !T.node.contains(t)) return;
  T.tags = { ...T.tags, [t.dataset.tpf]: t.value };
  T.key = JSON.stringify(topArgs());
  T.seq++;
  Object.assign(T, { rows: [], data: null, err: null, more: false, at: 0, busy: false });
  topPaint();
  topLoad();
});
document.addEventListener('change', (ev) => {
  const t = ev.target;
  if (!S.csv || !t.closest?.('#anCsv')) return;
  if (t.dataset.csvmap) { S.csv.map[t.dataset.csvmap] = t.value === '' ? null : +t.value; paintCsv(S.csv.platform); }
  else if (t.dataset.csvopt) { S.csv[t.dataset.csvopt] = t.value; paintCsv(S.csv.platform); }
});

// ------------------------------------------------------------------ studio: games side by side (earlier section)
function tabGames(body) {
  body.innerHTML = '<section class="block" id="s-trend"></section><section class="block" id="s-compare"></section>';
  C.legacy.paintTrend();
  C.legacy.paintCompare();
  C.legacy.loadTrends();
}

// ------------------------------------------------------------------ tabs still showing the earlier sections (stats2.sql)
const LEGACY_NOTE = (days) => `<p class="note small" data-testid="an-legacy">Bu sekme yakında üstteki dönem ve süzgece bağlanacak; şimdilik ${days === 1 ? 'bugün' : `son ${days} gün`} gösteriliyor.</p>`;
function legacyDays() { const n = diff(S.to, S.from) + 1; return n <= 1 ? 1 : n <= 7 ? 7 : 30; }
function tabLegacy(body) { legacyInto(body, S.tab); }
async function legacyInto(el, tab) {
  if (!el) return;
  const days = legacyDays();
  const L = C.legacy;
  L.setDays(days);
  if (tab === 'huni') { el.innerHTML = LEGACY_NOTE(days) + '<section class="block" id="s-period"></section>'; L.paintPeriod(); L.loadSummary(); return; }
  if (tab === 'surumler') { el.innerHTML = '<section class="block" id="s-versions"></section><div id="anX"></div>'; L.paintVersions(); L.loadVersions(); }
  else if (tab === 'gelir') { el.innerHTML = '<section class="block" id="s-revenue"></section>'; }
  else if (tab === 'genel') { el.innerHTML = '<section class="block" id="s-trend"></section><section class="block" id="s-period"></section>'; L.paintTrend(); L.paintPeriod(); L.loadSummary(); if (!S.game) L.loadTrends(); }
  else el.innerHTML = '<p class="muted">Yükleniyor…</p>';
  if (!S.game) return;
  if (!L.gsFor(S.game, days)) await L.loadGameStats(days);
  if (!el.isConnected) return;
  const X = L.gsFor(S.game, days);
  const B = L.blocks;
  if (tab === 'gelir') { L.paintRevenue(); return; }
  if (tab === 'genel') { L.paintTrend(); return; }
  if (!X) { if (tab !== 'surumler') el.innerHTML = '<p class="muted">Veri gelmedi.</p>'; return; }
  const segs = `<div class="seg" role="group" aria-label="Oyuncu">${[['all', 'Hepsi'], ['new', 'Yeni'], ['ret', 'Dönen']].map(([k, t]) => `<button type="button" data-act="end-seg" data-seg="${k}" aria-pressed="${L.endSeg() === k}">${t}</button>`).join('')}</div>`;
  const html = {
    oyuncular: `<div class="grid wide">${B.newRetBlock(X)}${B.hoursBlock(X)}</div>`,
    etkilesim: `<div class="row" style="margin-bottom:8px">${segs}</div><div class="grid wide">${B.exitBlock(X)}${B.lenBlock(X)}</div>`,
    donus: B.retBlock(X),
    kaynaklar: `<div class="grid wide">${B.cmpBlock(X, 'portals')}${B.countryBlock(X)}</div>`,
    teknik: (() => {
      const seen = new Set(X.seen || []), parts = [], never = [];
      if (seen.has('ad')) parts.push(B.adsBlock(X)); else never.push('Reklam');
      if (seen.has('load')) parts.push(B.loadBlock(X)); else never.push('Yükleme');
      if (seen.has('fps') || seen.has('hitch')) parts.push(B.smoothBlock(X)); else never.push('Akıcılık');
      return (parts.length ? `<div class="grid wide">${parts.join('')}</div>` : '')
        + (never.length ? `<div class="note" data-testid="meas-none" style="margin-top:12px"><b>${esc(never.join(', '))}:</b> ${esc(L.measNote(S.game))}</div>` : '')
        + '<p class="small" style="margin-top:12px">Oyundaki hatalar: <button type="button" class="linkish" data-act="sub" data-sub="errors">Hatalar sekmesi</button>.</p>';
    })(),
  }[tab];
  if (tab === 'surumler') { const x = document.getElementById('anX'); if (x) x.innerHTML = `<div style="margin-top:12px">${B.cmpBlock(X, 'versions')}</div>`; return; }
  el.innerHTML = LEGACY_NOTE(days) + (html || '');
}

// ------------------------------------------------------------------ events
document.addEventListener('click', (ev) => {
  const b = ev.target.closest('[data-act]');
  if (!b || !S.el || !S.el.isConnected || !S.el.contains(b)) return;
  const a = b.dataset.act;
  if (a === 'an-tab') { S.tab = b.dataset.tab; if (S.tab === 'canli') S.p = 'live'; else if (S.p === 'live') S.p = 'today'; setHash(); }
  else if (a === 'an-period') { S.p = b.dataset.p; S.tab = S.tab === 'canli' ? 'genel' : S.tab; S.g = ''; setHash(); }
  else if (a === 'an-step') { const [f, t] = stepRange(S.p, S.from, S.to, +b.dataset.dir); if (t > today()) return; S.p = 'c'; S.from = f; S.to = t; setHash(); }
  else if (a === 'an-gran') { S.g = b.dataset.g; setHash(); }
  else if (a === 'an-unfilter') { S.f = ''; setHash(); }
  else if (a === 'an-filter') { S.f = b.dataset.f; S.tab = 'genel'; setHash(); }
  else if (a === 'an-metric') { if (ev.target.closest('details')) return; S.m = b.dataset.m; setHash(false); }
  else if (a === 'an-src') { S.d = b.dataset.d; setHash(false); }
  else if (a === 'an-sort') { const k = b.dataset.k; S.sort = { k, dir: S.sort.k === k ? -S.sort.dir : k === 'k' ? 1 : -1 }; paint(); }
  else if (a === 'an-csv') downloadCsv(b.dataset.id);
  else if (a === 'an-top-sort') { const k = b.dataset.k; if (T.sort === k) T.desc = !T.desc; else { T.sort = k; T.desc = k !== 'country'; } T.rows = []; topLoad(); }
  else if (a === 'an-top-more') topLoad(true, b);
  else if (a === 'an-top-player') SESS.openPlayer(b.dataset.game, b.dataset.tag, !S.game);
  else if (a === 'an-drill') {
    const [g, t] = b.dataset.drill.split(':');
    if (b.dataset.armed !== '1' && window.matchMedia('(hover: none)').matches) { // a phone: the first tap shows the number
      document.querySelectorAll('[data-armed="1"]').forEach((x) => delete x.dataset.armed);
      b.dataset.armed = '1';
      return;
    }
    S.p = 'c';
    if (g === 'week') { S.from = t; S.to = add(t, 6); } else if (g === 'month') { S.from = t; S.to = mEnd(t); } else { S.from = t; S.to = t; }
    if (S.to > today()) S.to = today();
    S.g = '';
    setHash();
  }
  else if (a === 'end-seg' && S.tab === 'etkilesim') { C.legacy.setEndSeg(b.dataset.seg); paintTabBody(document.getElementById('anBody')); }
  else if (a === 'an-cur') { S.cur = b.dataset.cur; paintTabBody(document.getElementById('anBody')); }
  else if (a === 'an-pl') { S.pl = b.dataset.pl; S.platEdit = null; S.platErrs = []; S.platMsg = ''; setHash(); }
  else if (a === 'an-plat-cancel') { S.platEdit = null; S.platErrs = []; S.platMsg = ''; C.formDone(); paintTabBody(document.getElementById('anBody')); }
  else if (a === 'an-plat-edit' || a === 'an-plat-del') {
    const r = (S.platEntries || []).find((x) => x.day === b.dataset.day);
    if (!r) return;
    if (a === 'an-plat-edit') {
      S.platEdit = { platform: r.platform, day: r.day, span: r.span, players: r.players ?? '', plays: r.plays ?? '', playtime_min: r.playtime_s == null ? '' : Math.round(r.playtime_s / 6) / 10,
        ad_impr: r.ad_impr ?? '', revenue: r.revenue ? r.revenue.amount : '', currency: r.revenue ? r.revenue.currency : PL_CUR[r.platform], note: r.note || '', editing: true };
      S.platErrs = []; S.platMsg = '';
      paintTabBody(document.getElementById('anBody'));
      return;
    }
    if (!confirm(`${plName(r.platform)}: ${r.span === 7 ? `${dLabel(r.day)} haftası` : dLabel(r.day)} sayıları ve kazancı silinsin mi?`)) return;
    b.disabled = true;
    C.rpc('st_admin_platform_delete', { p_game: S.game, p_platform: r.platform, p_day: r.day })
      .then(() => { S.platMsg = 'Silindi.'; S.platErrs = []; S.platEdit = null; refresh(); })
      .catch((e) => { b.disabled = false; alert(C.friendly(e)); });
  }
  else if (a === 'an-csv-read') readCsv(S.csv ? S.csv.platform : S.pl);
  else if (a === 'an-csv-import') importCsv(S.csv.platform, b);
  else if (a === 'an-rev-cancel') { S.revEdit = null; S.revErrs = []; S.revMsg = ''; C.formDone(); paintRevForm(S.revEntries || []); }
  else if (a === 'an-rev-edit' || a === 'an-rev-del') {
    const r = (S.revEntries || []).find((x) => x.day === b.dataset.day && x.portal === b.dataset.portal);
    if (!r) return;
    if (a === 'an-rev-edit') {
      S.revEdit = { day: r.day, portal: r.portal, amount: String(r.amount).replace('.', ','), currency: r.currency, note: r.note || '', editing: true };
      S.revErrs = []; S.revMsg = '';
      paintRevForm(S.revEntries || []);
      document.getElementById('anRevF')?.scrollIntoView({ block: 'center' });
      return;
    }
    if (!confirm(`${dLabel(r.day)} ${C.V.REVENUE_PORTALS[r.portal] || r.portal} kazancı (${C.money(r.amount, r.currency)}) silinsin mi?`)) return;
    b.disabled = true;
    C.rpc('st_admin_revenue_delete', { p_day: r.day, p_game: S.game, p_portal: r.portal })
      .then(() => { S.revMsg = 'Silindi.'; S.revErrs = []; S.revEdit = null; refresh(); })
      .catch((e) => { b.disabled = false; alert(C.friendly(e)); });
  }
});
document.addEventListener('keydown', (ev) => {
  if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.matches?.('.an-kpi.click')) { ev.preventDefault(); ev.target.click(); }
});
// swipe left / right on the area's body: the next / previous tab (phones); tables and charts keep their own scrolling
let touch = null;
document.addEventListener('touchstart', (e) => {
  const t = e.target.closest?.('#anBody');
  touch = t && !e.target.closest('.scroll-x, .an-tabs, input, select, .cb-card') ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
}, { passive: true });
document.addEventListener('touchend', (e) => {
  if (!touch) return;
  const dx = e.changedTouches[0].clientX - touch.x, dy = e.changedTouches[0].clientY - touch.y;
  touch = null;
  if (Math.abs(dx) < 70 || Math.abs(dy) > 40) return;
  const tabs = tabsOf().map((t) => t[0]), i = tabs.indexOf(S.tab), j = i + (dx < 0 ? 1 : -1);
  if (j < 0 || j >= tabs.length) return;
  S.tab = tabs[j];
  if (S.tab === 'canli') S.p = 'live'; else if (S.p === 'live') S.p = 'today';
  setHash();
}, { passive: true });
document.addEventListener('visibilitychange', () => { if (!document.hidden && S.tab === 'canli' && document.getElementById('anLive')) loadLive(); });
