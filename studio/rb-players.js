// Studio panel — Riftborn players one by one (owner 2026-11-02: "I want to see players live, and click a player to see
// everything: how many characters they opened, which dungeon, at which minute they died"). docs/STUDYO-PANELI.md
// "Riftborn oyuncu görünümü". Server: supabase/studio/stats18.sql (st_rb_players, st_rb_player); the game sends its hero
// words and timeline lines with the beat (games/12-riftborn/src/rb-stats.js pvWords). No new tab or page: two cards inside
// Riftborn's existing statistics tabs, and the existing player drawer (#dlg):
//   Canlı      "Şu an oynayan kahramanlar": who plays now, with class, level, item level, where, difficulty (every 15 s)
//   Oyuncular  "Riftborn oyuncuları": everyone of the last 35 days, sortable; a row opens the player: heroes, dungeons,
//              deaths per dungeon and the timeline with minutes.
// Players are anonymous: the same short tag as the session list ("Oyuncu K7QD"), never an id.

import { RB_CODES as K } from './rb-codes.js';
import { CLS_TR, STATE_TR, placeName, bossName, causeName } from './rb-cards.js';

let C = null; // what analytics.js lends: rpc, esc, fmtN, fmtDur, fmtDate, dayLabel, friendly, info, PORTAL, DEVICE, regionName
export function init(ctx) { C = ctx; }
export const LIVE_MS = 15000;

const D = { data: null, err: null, at: 0, busy: null, sort: 'last', desc: true, live: null, all: null, timer: 0 };
const esc = (s) => C.esc(s);
const n0 = (v) => (v == null ? '—' : C.fmtN(v));
const where = (p) => (!p ? '—' : p === 'tw' ? 'Kasaba' : p === 'mn' ? 'Ana ekran' : placeName(p));
const diffName = (z) => K.diff[z | 0] || '—';
const clsName = (c) => CLS_TR[c] || '—';
const ilTxt = (v) => (v == null ? '—' : Number(v).toLocaleString('tr-TR', { maximumFractionDigits: 1 }));
const hm = (t) => C.fmtDate(t, { hour: '2-digit', minute: '2-digit' });
const dayHm = (t) => C.fmtDate(t, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
const mmss = (s) => `${Math.floor((s | 0) / 60)}:${String((s | 0) % 60).padStart(2, '0')}`;
export function ago(t, now = Date.now()) {
  const s = Math.max(0, (now - Date.parse(t)) / 1000);
  if (s < 120) return 'şimdi';
  if (s < 3600) return `${Math.round(s / 60)} dk önce`;
  if (s < 86400) return `${Math.round(s / 3600)} sa önce`;
  return `${Math.round(s / 86400)} gün önce`;
}
const missingBox = () => '<div class="warn-box" data-testid="rbp-missing">Oyuncu görünümünün sunucu kurulumu henüz yapılmadı (supabase/studio/stats18.sql).</div>';

async function load(force = false) {
  if (D.busy) return D.busy;
  if (!force && D.data && Date.now() - D.at < LIVE_MS - 500) return D.data;
  D.busy = C.rpc('st_rb_players', { p_game: 'riftborn' })
    .then((d) => { D.data = d; D.err = null; }, (e) => { D.err = e; })
    .finally(() => { D.at = Date.now(); D.busy = null; paint(); });
  return D.busy;
}
function tickOn() {
  if (D.timer) return;
  D.timer = setInterval(() => {
    const on = [D.live, D.all].some((n) => n && n.isConnected);
    if (!on) { clearInterval(D.timer); D.timer = 0; return; }
    if (document.visibilityState === 'visible') load(true);
  }, LIVE_MS);
}
function node(id, testid) {
  const el = document.createElement('article');
  el.className = 'card rbp-card'; el.dataset.block = id; el.dataset.testid = testid; el.style.marginTop = '12px';
  return el;
}
/** Canlı: the heroes playing now */
export function mountLive(host) {
  if (!host) return;
  D.live = D.live || node('rbp-live', 'rbp-live');
  host.replaceWith(D.live);
  paint(); load(); tickOn();
}
/** Oyuncular: everyone of the last 35 days */
export function mountAll(host) {
  if (!host) return;
  D.all = D.all || node('rbp-all', 'rbp-all');
  host.replaceWith(D.all);
  paint(); load(); tickOn();
}

function paint() {
  if (D.live && D.live.isConnected) D.live.innerHTML = liveHtml();
  if (D.all && D.all.isConnected) D.all.innerHTML = allHtml();
}
function state() {
  if (!D.data && !D.err) return '<p class="muted small">Oyuncular geliyor…</p>';
  if (!D.data) return D.err && D.err.missing ? missingBox() : `<div class="warn-box">${esc(C.friendly(D.err))}</div>`;
  return '';
}
const heroLine = (p) => `${esc(clsName(p.cls))} · <b>${n0(p.lv)}. seviye</b> · eşya seviyesi <b class="num">${ilTxt(p.il)}</b>`;
function liveHtml() {
  const head = `<div class="row"><h3><span class="live-dot" aria-hidden="true"></span>Şu an oynayan kahramanlar ${C.info('Oyunu son 2 dakikada açık olan Riftborn oyuncuları ve oynadıkları kahraman: sınıf, seviye, ortalama eşya seviyesi, nerede, zorluk. 15 saniyede bir yenilenir. Birine dokununca o oyuncunun bütün geçmişi açılır.')}</h3></div>`;
  const s = state(); if (s) return head + s;
  const L = (D.data.players || []).filter((p) => p.live);
  const err = D.err ? `<p class="small muted">Son yenileme olmadı: ${esc(C.friendly(D.err))}</p>` : '';
  if (!L.length) return `${head}<p class="muted small" data-testid="rbp-live-empty">Şu an Riftborn'da kimse yok.</p>${err}`;
  return `${head}<ul class="ss-list rbp-list" data-testid="rbp-live-list">${L.map((p) => `<li class="ss-row live" data-act="rbp-open" data-tag="${esc(p.tag)}">
      <div class="ss-who"><button type="button" class="linkish" data-act="rbp-open" data-tag="${esc(p.tag)}">Oyuncu ${esc(p.tag)}</button><span class="small muted">${p.mins != null ? `${n0(p.mins)} dk'dır oynuyor` : ''}</span></div>
      <div>${heroLine(p)}</div>
      <div class="ss-meta small"><b>${esc(where(p.place))}</b>${p.place && p.place !== 'tw' && p.place !== 'mn' ? ` · ${esc(diffName(p.diff))}` : ''}${p.scr && STATE_TR[p.scr] ? ` · ${esc(STATE_TR[p.scr])}` : ''} · ${n0(p.heroes)} kahraman · ${esc(C.DEVICE[p.device] || p.device || '')} · ${esc(C.regionName(p.country))}</div></li>`).join('')}</ul>
    <p class="small muted" style="margin:6px 0 0">${n0(L.length)} kişi · ${ago(D.data.now)} yenilendi</p>${err}`;
}

// [key, header, value for sorting, numeric]
const COLS = [
  ['tag', 'Oyuncu', (p) => p.tag, false], ['cls', 'Sınıf', (p) => clsName(p.cls), false], ['lv', 'Seviye', (p) => p.lv, true],
  ['il', 'Eşya sv.', (p) => p.il ?? -1, true], ['place', 'Nerede', (p) => where(p.place), false], ['diff', 'Zorluk', (p) => p.diff, true],
  ['chars', 'Kahraman', (p) => p.heroes, true], ['runs', 'Zindan', (p) => p.runs, true], ['deaths', 'Ölüm', (p) => p.deaths, true],
  ['last', 'Son görülme', (p) => (p.live ? 9e15 : Date.parse(p.last_at)), true],
];
function allHtml() {
  const head = `<div class="row"><h3>Riftborn oyuncuları ${C.info('Son 35 günde Riftborn oynayan herkes (en yeni 500). Her satır oyuncunun son oynadığı kahraman. Başlığa dokununca sıralanır; satıra dokununca oyuncunun kahramanları, zindanları, ölümleri ve dakika dakika geçmişi açılır. Kim olduğu yoktur.')}</h3></div>`;
  const s = state(); if (s) return head + s;
  const rows = (D.data.players || []).slice();
  const col = COLS.find((c) => c[0] === D.sort) || COLS[COLS.length - 1];
  rows.sort((a, b) => { const x = col[2](a), y = col[2](b); const r = col[3] ? x - y : String(x).localeCompare(String(y), 'tr'); return (D.desc ? -r : r) || Date.parse(b.last_at) - Date.parse(a.last_at); });
  if (!rows.length) return `${head}<p class="muted small" data-testid="rbp-all-empty">Son 35 günde oyuncu görünümü verisi yok: oyunun bu bilgileri gönderen sürümü yayınlanınca dolacak.</p>`;
  const th = (c) => `<th${c[3] ? ' class="n"' : ''}><button type="button" class="sort" data-act="rbp-sort" data-k="${c[0]}">${esc(c[1])}${D.sort === c[0] ? (D.desc ? ' ▼' : ' ▲') : ''}</button></th>`;
  const td = (p) => [
    `<td><button type="button" class="linkish" data-act="rbp-open" data-tag="${esc(p.tag)}">${p.live ? '<span class="live-dot" aria-hidden="true"></span>' : ''}Oyuncu ${esc(p.tag)}</button></td>`,
    `<td>${esc(clsName(p.cls))}</td>`, `<td class="n num">${n0(p.lv)}</td>`, `<td class="n num">${ilTxt(p.il)}</td>`, `<td>${esc(where(p.place))}</td>`,
    `<td class="n">${esc(diffName(p.diff))}</td>`, `<td class="n num">${n0(p.heroes)}</td>`, `<td class="n num">${n0(p.runs)}</td>`, `<td class="n num">${n0(p.deaths)}</td>`,
    `<td class="n">${p.live ? '<b>şimdi</b>' : esc(ago(p.last_at, Date.parse(D.data.now)))}</td>`].join('');
  return `${head}<p class="small muted" style="margin:0 0 6px">${n0(D.data.total)} oyuncu · ${n0(D.data.live_n)} kişi şu an oyunda</p>
    <div class="scroll-x"><table class="an-t rbp-t" data-testid="rbp-all-table"><thead><tr>${COLS.map(th).join('')}</tr></thead>
    <tbody>${rows.map((p) => `<tr class="${p.live ? 'live' : ''}" data-act="rbp-open" data-tag="${esc(p.tag)}">${td(p)}</tr>`).join('')}</tbody></table></div>
    ${D.data.total > rows.length ? `<p class="small muted">En yeni ${n0(rows.length)} oyuncu gösteriliyor.</p>` : ''}`;
}

// ------------------------------------------------------------------ one player (the drawer)
/** a timeline line in plain Turkish */
export function lineText(t) {
  const run = t.rs ? ` <span class="muted">(koşuda ${mmss(t.rs)})</span>` : '';
  switch (t.kind) {
    case 'o': return `Oyunu açtı${t.a ? ` · ${esc(clsName(t.a))}${t.b ? `, ${esc(t.b)}. seviye` : ''}` : ''}`;
    case 'n': return `<b>Yeni kahraman açtı:</b> ${esc(clsName(t.a))}`;
    case 's': return `Zindana girdi: <b>${esc(placeName(t.a))}</b> <span class="muted">· ${esc(diffName(+t.b))}</span>`;
    case 'e': { const r = t.b[0]; const w = { w: '<b class="rbp-good">Bitirdi</b>', d: '<b class="rbp-bad">Ölerek bitti</b>', q: 'Yarıda bıraktı', x: 'Sayfa kapanınca bitti' }[r] || r;
      return `${w}: ${esc(placeName(t.a))}${run}`; }
    case 'd': return `<b class="rbp-bad">Öldü:</b> ${esc(placeName(t.a))} — ${esc(causeName(t.b))}${run}`;
    case 'b': return `<b class="rbp-good">Patron yendi:</b> ${esc(bossName(t.a))}${t.b ? ` <span class="muted">(${esc(placeName(t.b))})</span>` : ''}${run}`;
    case 'l': return `Seviye atladı: <b>${esc(t.a)}</b>`;
    case 'q': return `Oyundan çıktı ya da sekmeyi değiştirdi <span class="muted">(${esc(STATE_TR[t.a] || t.a)})</span>`;
    default: return esc(t.kind);
  }
}
export async function openPlayer(tag) {
  const d = document.getElementById('dlg');
  if (!d) return;
  d.classList.add('drawer');
  d.addEventListener('close', () => d.classList.remove('drawer'), { once: true });
  const frame = (body) => `<div class="d-head"><h2 id="dlgTitle">Oyuncu ${esc(tag)} · Riftborn</h2><button class="ghost x" type="button" data-act="dlg-close" aria-label="Kapat">✕</button></div><div class="d-body" data-testid="rbp-player">${body}</div>`;
  d.innerHTML = frame('<p class="muted">Yükleniyor…</p>');
  if (!d.open) d.showModal();
  let r;
  try { r = await C.rpc('st_rb_player', { p_tag: tag, p_game: 'riftborn' }); } catch (e) { d.innerHTML = frame(e && e.missing ? missingBox() : `<div class="warn-box">${esc(C.friendly(e))}</div>`); return; }
  d.innerHTML = frame(playerHtml(r));
}
function playerHtml(r) {
  const H = r.heroes || [], T = r.timeline || [], S = r.sessions || [];
  const top = `<p class="small muted" style="margin:0 0 8px">${r.live ? '<span class="live-dot"></span><b>Şu an oynuyor</b> · ' : ''}${r.first_at ? `İlk görüldü ${esc(dayHm(r.first_at))}` : ''}${r.last_at ? ` · son ${esc(ago(r.last_at))}` : ''}${r.matches > 1 ? ` · bu etiketi ${n0(r.matches)} kurulum taşıyor (rastlantı), birlikte gösteriliyor` : ''}. Kim olduğu yoktur; kayıtlar 35 gün tutulur.</p>`;
  const sum = `<ul class="kf-sum rb-sum" data-testid="rbp-sum"><li><b>${n0(H.length)}</b> kahraman açtı</li><li><b>${n0((r.places || []).reduce((a, p) => a + p.starts, 0))}</b> zindana girdi, <b>${n0((r.places || []).reduce((a, p) => a + p.clears, 0))}</b> bitirdi</li><li><b>${n0((r.deaths || []).reduce((a, x) => a + x.n, 0))}</b> kez öldü</li><li><b>${n0(T.filter((t) => t.kind === 'b').length)}</b> patron yendi</li></ul>`;
  const heroes = H.length ? `<div class="scroll-x"><table class="an-t" data-testid="rbp-heroes"><thead><tr><th>Kahraman</th><th class="n">Seviye</th><th class="n">Eşya sv.</th><th>Zorluk</th><th>En son nerede</th><th class="n">Altın</th><th class="n">Son görülme</th></tr></thead><tbody>
      ${H.map((h) => `<tr><td>${esc(clsName(h.cls))} <span class="muted small">(${n0(h.slot + 1)}. yuva)</span></td><td class="n num">${n0(h.lv)}</td><td class="n num">${ilTxt(h.il)}</td><td>${esc(diffName(h.diff))}</td><td>${esc(where(h.place))}</td><td class="n num">${n0(h.gold)}</td><td class="n">${esc(ago(h.last_at))}</td></tr>`).join('')}</tbody></table></div>`
    : '<p class="muted small">Kahraman bilgisi yok.</p>';
  const places = (r.places || []).length ? `<div class="scroll-x"><table class="an-t" data-testid="rbp-places"><thead><tr><th>Zindan</th><th class="n">Girdi</th><th class="n">Bitirdi</th><th class="n">Yarıda</th><th class="n">Ölüm</th></tr></thead><tbody>
      ${r.places.map((p) => `<tr><td>${esc(placeName(p.p))}</td><td class="n num">${n0(p.starts)}</td><td class="n num">${n0(p.clears)}</td><td class="n num">${n0(p.quits)}</td><td class="n num">${n0(p.deaths)}</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted small">Henüz zindan yok.</p>';
  const dth = (r.deaths || []).length ? `<div class="scroll-x"><table class="an-t" data-testid="rbp-deaths"><thead><tr><th>Zindan</th><th class="n">Ölüm</th><th>Öldürenler</th><th class="n">Koşuda ort.</th></tr></thead><tbody>
      ${r.deaths.map((x) => `<tr><td>${esc(placeName(x.p))}</td><td class="n num">${n0(x.n)}</td><td>${(x.causes || []).slice(0, 3).map((c) => `${esc(causeName(c.c))}${c.n > 1 ? ` ×${n0(c.n)}` : ''}`).join(', ')}</td><td class="n num">${x.rs_avg ? mmss(x.rs_avg) : '—'}</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted small">Hiç ölmedi.</p>';
  const bySes = new Map(); for (const t of T) { if (!bySes.has(t.s)) bySes.set(t.s, []); bySes.get(t.s).push(t); }
  const tl = S.length ? S.map((s) => `<p class="small" style="margin:10px 0 2px"><b>${s.live ? '<span class="live-dot"></span>Şimdiki oturum' : `${esc(C.fmtDate(s.from, { day: 'numeric', month: 'short' }))} oturumu`}</b> <span class="muted">· ${esc(hm(s.from))} → ${s.live ? 'şimdi' : esc(hm(s.to))}</span></p>
      <ol class="rbp-tl" data-testid="rbp-tl">${(bySes.get(s.s) || []).slice().reverse().map((t) => `<li class="k-${esc(t.kind)}"><span class="rbp-min num">${n0(t.sm)}. dk</span><span>${lineText(t)}${t.cls && t.kind !== 'n' && t.kind !== 'o' && H.length > 1 ? ` <span class="muted small">· ${esc(clsName(t.cls))}</span>` : ''}</span></li>`).join('')}</ol>`).join('')
    : '<p class="muted small">Zaman çizelgesi boş.</p>';
  return `${top}${sum}
    <div class="sub-h">Kahramanları</div>${heroes}
    <div class="sub-h">Zindanlar</div>${places}
    <div class="sub-h">Ölümler (zindan zindan)</div>${dth}
    <div class="sub-h">Zaman çizelgesi <span class="muted small">(oturumun kaçıncı dakikası; en yeni oturum üstte, en son 400 satır)</span></div>${tl}`;
}

document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-act^="rbp-"]');
  if (!b) return;
  const a = b.dataset.act;
  if (a === 'rbp-sort') { e.stopPropagation(); const k = b.dataset.k; if (D.sort === k) D.desc = !D.desc; else { D.sort = k; D.desc = k !== 'tag' && k !== 'cls' && k !== 'place'; } paint(); }
  else if (a === 'rbp-open') { e.stopPropagation(); openPlayer(b.dataset.tag); }
});
