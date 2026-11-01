// Studio panel — Riftborn: what players like and what they do not (docs/STUDYO-PANELI.md "Riftborn oyun içi istatistikleri";
// plan .calisma/rb-istatistik/plan.md). Server: supabase/studio/stats15.sql st_rb_stats; the game sends the coded steps from
// games/12-riftborn/src/rb-stats.js; the code table is the copy in rb-codes.js. No new tab or page: cards inside Riftborn's
// existing statistics tabs, and small live numbers on the cards of its İçerik section. Every card says which of the twelve
// questions it answers.
//   Genel bakış   Bu hafta (the week in one box: where players leave, what kills, the least used skill, the lowest 👍)
//   Huni          1 İlk 10 dakika · 2 Sınıflar · 3 Zindanlar ve yarıklar · 4 Patronlar · 5 Ölümler
//   Etkileşim     8 Pencereler · 9 Çıkış anı · 11 Oyuncu görüşü · İstasyonlar
//   Geri dönüş    10 Özellik etkisi
//   Sürümler      Riftborn satırları (koşu bitirme, ölüm / koşu, ilk patron, 10 dk)
//   Teknik        12 Yavaş cihaz · Cihazlar (stats17.sql st_rb_devices: GPU models and families, integrated / discrete, phone / computer,
//                 median fps by GPU class, lost drawing and unfinished loading; games/12-riftborn/src/rb-device.js)
//   İçerik        6 Yetenekler / Talentler (barda %, barda ama kullanılmayan %, alınma %; the new trees: tree3Card, stats16.sql), 7 Eşya / Özel eşyalar, sınıf / zindan /
//                 patron kartlarında tek satır
// Rows of fewer than 30 players are pale ("az veri"). Filters: version, portal and device narrow the rows; others are not
// applied (the card says so). The raw rows are kept 14 days.

import { RB_CODES as K, RB_EDGES, RB_TRY_STEPS, RB_NAMES as NM, RB_T3 as T3, RB_CONV as CV, RB_NW as NW } from './rb-codes.js';

let C = null; // what analytics.js lends: rpc, esc, fmtN, fmtDur, barList, dayLabel, friendly, info, csvButton, fileName
export function init(ctx) { C = ctx; }
export const RB_GAME = 'riftborn';
export const FEW = 30;

// ------------------------------------------------------------------ names (Turkish where the panel speaks, the game's English for its proper names)
export const CLS_TR = { mg: 'Büyücü', rg: 'Haydut', bb: 'Barbar', kn: 'Şövalye', rn: 'Korucu', nc: 'Ölü Çağıran' };
const CLS_KEY = Object.fromEntries(Object.entries(K.cls).map(([k, v]) => [v, k]));
export const STEP_TR = { open: 'Oyunu açtı', class: 'Sınıf seçti', move: 'İlk adım', kill: 'İlk öldürme', drop: 'İlk eşyayı aldı', equip: 'İlk eşyayı giydi', lvl2: '2. seviye',
  skill2: 'Bara 3. yetenek', dungeon: 'İlk zindan', boss_seen: 'İlk patronu gördü', boss_win: 'İlk patronu yendi', town: 'Kasabaya geldi', craft: 'İlk üretim', min10: '10 dk oynadı', min30: '30 dk oynadı' };
export const WIN_TR = { gear: 'Karakter ve eşya', gems: 'Yetenekler', tree: 'Yetenek ağacı', stats: 'Nitelikler', smith: 'Demirci', tailor: 'Terzi', occult: 'Okültist', jewel: 'Kuyumcu',
  alch: 'Simyacı', shop: 'Tüccar', board: 'Görev Panosu', stash: 'Sandık', quests: 'Görevler', gate: 'Zindan Kapısı', settings: 'Ayarlar' };
export const STATE_TR = { play: 'zindanda', boss: 'patron dövüşünde', panel: 'bir pencerede', dead: 'ölüm ekranında', town: 'kasabada', map: 'Zindan Kapısında', done: 'bitiş ekranında', menu: 'ana ekranda' };
export const LAST_TR = { died: 'öldükten sonra', lvl: 'seviye atladıktan sonra', drop: 'efsanevi bulduktan sonra', craft: 'üretimden sonra', win: 'kazandıktan sonra', none: 'son 60 sn sakin' };
export const REASON_TR = { hard: 'Çok zor', long: 'Çok uzun', loot: 'Kötü ganimet', confusing: 'Kafa karıştırıcı', boring: 'Sıkıcı', bug: 'Hata' };
export const FEAT_TR = { chest: 'Yarın Sandığı', list: 'Günlük Liste', build: 'Kurulum yuvası değiştirdi', retry: 'TRY AGAIN düğmesi', weekly: 'Haftalık Yarık', summon: 'Patron çağırdı', board: 'Görev Panosu' };
export const RAR_TR = { n: 'Sıradan', m: 'Yaygın olmayan', r: 'Nadir', e: 'Destansı', l: 'Efsanevi', u: 'Adlı (özel)', a: 'Eser', s: 'Set' };
export const SLOT_TR = { wp: 'Silah', oh: 'Yan el', hd: 'Başlık', ch: 'Göğüs', gl: 'Eldiven', bt: 'Kemer', pn: 'Pantolon', r1: 'Yüzük', r2: 'Yüzük 2', am: 'Kolye', ck: 'Pelerin', bo: 'Çizme' };
const MON_N = { shaman: 'Bone Shaman', spitter: 'Plague Spitter', swarm: 'Bone Rat', priest: 'Dark Priest', barrel: 'Barrel', altar: 'Evil Altar', goblin: 'Treasure Goblin',
  zombie: 'Rotting Corpse', ghoul: 'Crypt Ghoul', archer: 'Skeleton Archer', bloat: 'Swollen Dead', cultist: 'Rift Cultist', brute: 'Ravager', assassin: 'Veiled Blade', knight: 'Fallen Knight' };
const HAZ_TR = { lava: 'Lav', ice: 'Buz', void: 'Boşluk havuzu', poison: 'Zehir bataklığı' };
const ELITE_N = { hasted: 'Hasted', berserk: 'Berserk', regen: 'Regenerating', frost: 'Frost Touched', volatile: 'Volatile', storm: 'Storm Caller', molten: 'Molten Trail', summoner: 'Grave Summoner', teleport: 'Teleporter', vampiric: 'Vampiric' };
const FPS_TR = { fps_60: '55+ kare/sn', fps_45: '45–55', fps_30: '30–45', fps_20: '20–30', fps_low: '20 altı' };
export const placeName = (p) => {
  const n = +String(p).slice(1);
  if (p[0] === 'a') return K.areas[n - 1] || p;
  if (p[0] === 'g') return `Yarık: ${K.zones[n - 1] || p}`;
  if (p[0] === 'n') return `Kâbus Mührü: ${K.zones[n - 1] || p}`;
  if (p[0] === 'w') return `Haftalık Yarık: ${K.zones[n - 1] || p}`;
  if (p[0] === 's') return `Çağrılan: ${K.summons[n - 1] || p}`;
  return p;
};
export const bossName = (b) => K.bosses[+String(b).slice(1) - 1] || b;
export const causeName = (c) => {
  if (/^b\d{2}k\d$/.test(c)) { const k = +c[4]; return `${bossName(c.slice(0, 3))}${k ? ` (${k}. hareketi)` : ''}`; }
  if (/^b\d{2}$/.test(c)) return bossName(c);
  if (c.startsWith('e_')) return `Elit: ${ELITE_N[c.slice(2)] || c.slice(2)}`;
  if (c.startsWith('h_')) return HAZ_TR[c.slice(2)] || c;
  if (c === 'x') return 'Bilinmiyor';
  return MON_N[c] || c;
};
export const ctxName = (x) => (x === 'day1' ? 'İlk gün (15. dk)' : x.startsWith('run') ? placeName(x.slice(3)) : bossName(x));
export const skillOf = (code) => { const cls = CLS_KEY[code.slice(0, 2)], i = +code.slice(2), g = cls && K.skills[cls][i]; return { cls, g, c: code.slice(0, 2), n: (cls && NM.skills[cls] && NM.skills[cls][i]) || g || code }; };
const skName = (cls, g) => { const i = (K.skills[cls] || []).indexOf(g); return (i >= 0 && NM.skills[cls] && NM.skills[cls][i]) || g; };
/** a tree node code → its name (a skill, a skill's upgrade, a passive or the Path Stone) */
export const nodeOf = (c, n) => {
  const cls = CLS_KEY[c], id = cls && K.nodes[cls][+n]; if (!id) return `${c}${n}`;
  const [t, a, b] = id.split(':');
  return t === 'a' ? skName(cls, a) : t === 'u' ? `${skName(cls, a)} · ${b}` : (NM.passives[a] || a) + (t === 'k' ? ' (yol taşı)' : '');
};
// (stats16) the skill trees by place: a path, a bar place <path><skill>, a node in / out of a respec (s<p><s>, u<p><s><a-d>,
// k<p>, q<passive id>), a passive id, a conversion key (RB_CONV). The class code says the tree: mg the trees of 2026-10-22 (RB_T3,
// ?agac3=1), mgw the default trees of 2026-10-21 (RB_NW)
const isNw = (c) => String(c).length === 3 && String(c).endsWith('w');
const t3Of = (c) => (isNw(c) ? NW[CLS_KEY[String(c).slice(0, 2)]] : T3[CLS_KEY[c]]) || null;
export const t3ClsName = (c) => `${CLS_TR[String(c).slice(0, 2)] || c} · ${isNw(c) ? 'varsayılan ağaç (21 Ekim)' : 'yeni ağaç (22 Ekim, ?agac3)'}`;
export const t3PathName = (c, p) => { const P = t3Of(c)?.[p]; return P ? `${+p + 1}. yol (${P.s[0]} · ${P.s[1]})` : `${+p + 1}. yol`; };
export const t3PlaceName = (c, ps) => t3Of(c)?.[+ps[0]]?.s[+ps[1]] || ps;
export const t3PasName = (c, id) => { for (const P of t3Of(c) || []) if (P.p[id]) return P.p[id]; return id; };
export const t3NodeName = (c, tok) => {
  const T = t3Of(c), m = /^([suk])(\d)(\d)?([a-d])?$/.exec(tok);
  if (tok[0] === 'q') return t3PasName(c, tok.slice(1));
  if (!T || !m) return tok;
  const P = T[+m[2]]; if (!P) return tok;
  if (m[1] === 'k') return `${P.k || 'Yol taşı'} (yol taşı)`;
  if (m[1] === 's') return P.s[+m[3]] || tok;
  return `${P.s[+m[3]]} · ${P.u[+m[3]]?.['abcd'.indexOf(m[4])] || m[4]}`;
};
export const t3ConvName = (id) => { const v = CV[id]; if (!v) return id; const cls = v[0], i = (K.skills[cls] || []).indexOf(v[1]); return `${v[2]} (${(i >= 0 && NM.skills[cls]?.[i]) || v[1]} yerine)`; };
export const uniqName = (u) => K.uniques[+String(u).slice(1)] || u;
const slug = (s) => String(s).toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ------------------------------------------------------------------ numbers from buckets
const sum = (h) => Object.values(h || {}).reduce((a, b) => a + (Number(b) || 0), 0);
/** a time quantile (seconds) from buckets {b: n} with edges E (bucket 1 = under the first edge; the last up to 1.5× the last edge) */
export function bucketQuantile(hist, E, q = 0.5) {
  const n = sum(hist); if (!n) return null;
  const want = q * n; let cum = 0; const X = [0, ...E];
  for (let b = 1; b <= X.length; b++) {
    const c = Number(hist[b]) || 0;
    if (c && cum + c >= want) { const lo = X[b - 1], hi = b < X.length ? X[b] : X[X.length - 1] * 1.5; return lo + ((hi - lo) * (want - cum)) / c; }
    cum += c;
  }
  return X[X.length - 1] * 1.5;
}
const rate = (a, b) => (b ? a / b : null);
const pct = (v) => (v == null ? '—' : `%${Math.round(100 * v)}`);
const n0 = (v) => (v == null ? '—' : C.fmtN(v));
const dec = (v) => (v == null ? '—' : Number(v).toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }));
const mins = (s) => (s == null ? '—' : s < 60 ? `${Math.max(1, Math.round(s))} sn` : `${Math.round(s / 60)} dk`);
const few = (n) => (n < FEW ? ' class="rb-few" title="Az veri (30 oyuncudan az)"' : '');

// ------------------------------------------------------------------ the data (one answer per period and filter, shared by every card)
const D = new Map(); // key → { data, err, at, busy, wait: [] }
const nodes = new Set();
function keyOf(o) { return [o.from, o.to, o.ver || '', o.portal || '', o.dev || ''].join('|'); }
/** the filter of analytics.js ("ver:0.2.0", "device:phone" …) → the arguments st_rb_stats takes; other filters are not applied */
export function filterArgs(f) {
  if (!f) return { args: {}, off: false };
  const [dim, key] = String(f).split(/:(.*)/s);
  if (dim === 'ver') return { args: { ver: key }, off: false };
  if (dim === 'portal') return { args: { portal: key }, off: false };
  if (dim === 'device') return { args: { dev: key }, off: false };
  return { args: {}, off: true };
}
export function fetchStats(o) {
  const k = keyOf(o);
  let e = D.get(k);
  if (!e) { e = { data: null, err: null, at: 0, busy: null }; D.set(k, e); }
  if (e.busy) return e.busy;
  if (e.data && Date.now() - e.at < 60000) return Promise.resolve(e.data);
  e.busy = C.rpc('st_rb_stats', { p_from: o.from, p_to: o.to, p_ver: o.ver || null, p_portal: o.portal || null, p_dev: o.dev || null })
    .then((d) => { Object.assign(e, { data: d, err: null, at: Date.now(), busy: null }); return d; })
    .catch((err) => { Object.assign(e, { err, at: Date.now(), busy: null }); throw err; });
  return e.busy;
}
const cached = (o) => D.get(keyOf(o)) || null;
// the devices block (st_rb_devices, stats17.sql): its own answer per period and filter
const DV = new Map();
export function fetchDevices(o) {
  const k = keyOf(o);
  let e = DV.get(k);
  if (!e) { e = { data: null, err: null, at: 0, busy: null }; DV.set(k, e); }
  if (e.busy) return e.busy;
  if ((e.data || e.err) && Date.now() - e.at < 60000) return Promise.resolve(e.data);
  e.busy = C.rpc('st_rb_devices', { p_from: o.from, p_to: o.to, p_ver: o.ver || null, p_portal: o.portal || null, p_dev: o.dev || null })
    .then((d) => { Object.assign(e, { data: d, err: null, at: Date.now(), busy: null }); return d; })
    .catch((err) => { Object.assign(e, { data: null, err, at: Date.now(), busy: null }); throw err; });
  return e.busy;
}

/** analytics.js: the Riftborn cards of a tab into `host` (replaced by a node of this module) */
export function mount(host, tab, { from, to, filter = '', today = to }) {
  if (!host) return;
  const { args, off } = filterArgs(filter);
  const node = document.createElement('div');
  node.dataset.block = 'rb-' + tab; node.dataset.testid = 'rb-' + tab; node.className = 'rb-cards';
  host.replaceWith(node);
  nodes.add(node);
  const o = { from, to, ...args };
  const extra = tab === 'genel' ? weekRanges(today).map((r) => ({ ...r, ...args })) : [];
  const paintIt = () => paintTab(node, tab, o, off, extra);
  paintIt();
  Promise.allSettled([fetchStats(o), ...extra.map(fetchStats), ...(tab === 'teknik' ? [fetchDevices(o)] : [])]).then(() => { if (node.isConnected) paintIt(); else nodes.delete(node); });
}
function weekRanges(today) {
  const add = (d, n) => new Date(Date.parse(d + 'T12:00:00Z') + n * 864e5).toISOString().slice(0, 10);
  return [{ from: add(today, -6), to: today }, { from: add(today, -13), to: add(today, -7) }];
}
const QS = {
  1: 'Yeni oyuncu ilk 10 dakikada hangi adımda kopuyor, her adıma kaçıncı dakikada varıyor?',
  2: 'Hangi sınıf seçiliyor, hangisi tutuluyor (başka günde aynı sınıfla dönen), hangisi daha çok ölüyor, 10. seviyeye kaç dakikada varıyor?',
  3: 'Hangi zindan / yarık yarıda bırakılıyor, hangisinde en çok ölünüyor, hangisi oyunun bırakıldığı son yer?',
  4: 'Hangi patron en çok öldürüyor, ilk zafer kaçıncı denemede, hangi hareketi öldürüyor, kaç kişi pes ediyor?',
  5: 'Oyuncular neyle ve nerede ölüyor; hangi seviyede?',
  6: 'Hangi yetenek bara konuyor, konup hiç kullanılmıyor, hangisi hiç seçilmiyor; ağaçta hangi düğümler alınıyor?',
  7: 'Hangi eşya türü görür görmez parçalanıyor, hangisi giyiliyor, yerde mi bırakılıyor?',
  8: 'Hangi pencere açılıp hiçbir şey yapılmadan hemen kapanıyor (kafa karışıklığı), hangisine hiç girilmiyor?',
  9: 'Oyuncu oyundan çıkmadan hemen önce neredeydi, ne oldu?',
  10: 'Bir özelliği ilk gün kullanan, ertesi gün / 7. gün daha çok dönüyor mu?',
  11: 'Oyuncular koşu ve patron sonunda 👍 mü 👎 mü diyor, neden?',
  12: 'Yavaş cihazda oyun daha çok mu bırakılıyor?',
};
const q = (n) => `<p class="small muted rb-q" data-q="${n}"><b>Soru ${n}:</b> ${C.esc(QS[n])}</p>`;
const cardH = (id, title, qn, body, csv = '', help = '') => `<article class="card rb-card" data-block="rb-${id}" data-testid="rb-${id}"><div class="row"><h3>${C.esc(title)}${help ? ' ' + C.info(help) : ''}</h3>${csv}</div>${qn ? q(qn) : ''}${body}</article>`;
const table = (id, head, rows, testid) => `<div class="scroll-x"><table class="an-t rb-t" data-testid="${testid || 'rb-t-' + id}"><thead><tr>${head.map((h, i) => `<th${i ? ' class="n"' : ''}>${C.esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
const sumList = (lines, id) => (lines.length ? `<ul class="kf-sum rb-sum" data-testid="rb-sum-${id}">${lines.map((l) => `<li>${l}</li>`).join('')}</ul>` : '');

function paintTab(el, tab, o, off, extra) {
  const e = cached(o), A = e && e.data;
  const esc = C.esc;
  if (!A && !(e && e.err)) { el.innerHTML = `<article class="card"><h3>Riftborn oyun içi</h3><p class="muted small">Sayılar geliyor…</p></article>`; return; }
  if (!A) {
    const missing = !!(e.err && e.err.missing);
    el.innerHTML = `<article class="card" data-testid="rb-missing"><h3>Riftborn oyun içi</h3><div class="warn-box">${missing ? 'Riftborn oyun içi istatistiklerinin sunucu kurulumu henüz yapılmadı (supabase/studio/stats15.sql).' : esc(C.friendly(e.err))}</div></article>`;
    return;
  }
  const notes = [];
  if (!A.since) notes.push('<p class="note small" data-testid="rb-waiting">Riftborn oyun içi verisi henüz gelmedi: oyunun bu adımları gönderen sürümü yayınlanınca dolacak.</p>');
  if (A.counted_from > A.from) notes.push(`<p class="note small">Ham kayıtlar 14 gün tutulur: ${esc(C.dayLabel(A.counted_from))} öncesi sayılmadı.</p>`);
  if (off) notes.push('<p class="note small">Bu kartlar yalnız sürüm, portal ve cihaz süzgeciyle daraltılır; sayılar süzgeçsiz.</p>');
  const parts = {
    genel: () => weekCard(A, extra),
    huni: () => [first10Card(A), classCard(A), placeCard(A), bossCard(A), deathCard(A)].join(''),
    etkilesim: () => [windowCard(A), exitCard(A), feedbackCard(A), stationCard(A)].join(''),
    donus: () => featureCard(A),
    surumler: () => versionCard(A),
    teknik: () => techCard(A) + devicesCard(o),
  }[tab];
  el.innerHTML = notes.join('') + (parts ? parts() : '');
}

// ------------------------------------------------------------------ Genel bakış: Bu hafta
function weekCard(A, extra) {
  const esc = C.esc, W = cached(extra[0])?.data || A, L = cached(extra[1])?.data || null;
  const leftTop = (X) => (X.places || []).filter((p) => p.left).sort((a, b) => b.left - a.left)[0];
  const killTop = (X) => (X.deaths?.heat || []).reduce((m, h) => { m[h.c] = (m[h.c] || 0) + h.n; return m; }, {});
  const top = (m) => Object.entries(m).sort((a, b) => b[1] - a[1])[0];
  const skillLow = (X) => (X.skills?.list || []).filter((s) => s.sessions >= 5).map((s) => ({ s: s.s, u: rate(s.unused, s.sessions) })).sort((a, b) => b.u - a.u)[0];
  const thumbLow = (X) => (X.feedback || []).filter((f) => f.up + f.down >= 3).map((f) => ({ x: f.x, r: rate(f.up, f.up + f.down) })).sort((a, b) => a.r - b.r)[0];
  const lt = leftTop(W), kt = top(killTop(W)), sl = skillLow(W), tl = thumbLow(W);
  const lL = L && leftTop(L), kL = L && top(killTop(L)), tL = L && thumbLow(L);
  const was = (a, b) => (b ? ` <span class="muted">· geçen hafta: ${b}</span>` : '');
  const rows = [
    `<b>En çok bırakılan yer:</b> ${lt ? `${esc(placeName(lt.p))} <span class="muted">(${C.fmtN(lt.left)} oyuncu)</span>` : '—'}${was(lt, lL && esc(placeName(lL.p)))}`,
    `<b>En çok öldüren:</b> ${kt ? `${esc(causeName(kt[0]))} <span class="muted">(${C.fmtN(kt[1])} ölüm)</span>` : '—'}${was(kt, kL && esc(causeName(kL[0])))}`,
    `<b>Barda en çok kullanılmayan yetenek:</b> ${sl ? `${esc(skillLabel(sl.s))} <span class="muted">(oturumların ${pct(sl.u)}'inde hiç basılmadı)</span>` : '—'}`,
    `<b>En düşük 👍:</b> ${tl ? `${esc(ctxName(tl.x))} <span class="muted">(👍 ${pct(tl.r)})</span>` : '—'}${was(tl, tL && `${esc(ctxName(tL.x))} ${pct(tL.r)}`)}`,
  ];
  return cardH('week', 'Riftborn · Bu hafta', 0, `<p class="small muted rb-q"><b>Özet:</b> son 7 gün, geçen 7 günle yan yana (oyun içi sayılar).</p>${sumList(rows, 'week')}`);
}
const skillLabel = (code) => { const s = skillOf(code); return `${s.n} (${CLS_TR[s.c] || s.c})`; };

// ------------------------------------------------------------------ Huni
function first10Card(A) {
  const esc = C.esc, F = A.first10 || { base: 0, steps: [], by_ver: [] }, base = F.base;
  const by = Object.fromEntries((F.steps || []).map((s) => [s.k, s]));
  let prev = base;
  const rows = [], csv = [];
  // (the steps by how many reached them: the game's order is not strict, an old device may skip one)
  const order = K.steps.filter((k) => by[k]).sort((a, b) => by[b].players - by[a].players || K.steps.indexOf(a) - K.steps.indexOf(b));
  for (const k of order) {
    const s = by[k];
    const n = s ? s.players : 0, med = s ? bucketQuantile(s.tb, RB_EDGES.ft) : null;
    rows.push(`<tr data-k="${k}"${few(n)}><td>${esc(STEP_TR[k])}</td><td class="n num">${n0(n)}</td><td class="n num">${pct(rate(n, base))}</td><td class="n num">${pct(rate(n, prev))}</td><td class="n num">${n0(Math.max(0, prev - n))}</td><td class="n num">${mins(med)}</td></tr>`);
    csv.push([STEP_TR[k], n, base ? Math.round(100 * n / base) : '', prev ? Math.round(100 * n / prev) : '', Math.max(0, prev - n), med == null ? '' : Math.round(med)]);
    prev = n;
  }
  const drops = csv.map((r, i) => ({ k: r[0], d: i ? csv[i - 1][1] - r[1] : 0 })).sort((a, b) => b.d - a.d)[0];
  const V = (F.by_ver || []).filter((v) => v.base);
  const vt = V.length > 1 ? table('f10v', ['Adım', ...V.map((v) => `${v.ver} (${C.fmtN(v.base)})`)], K.steps.filter((k) => V.some((v) => v.steps[k])).map((k) => `<tr><td>${esc(STEP_TR[k])}</td>${V.map((v) => `<td class="n num">${pct(rate(v.steps[k] || 0, v.base))}</td>`).join('')}</tr>`), 'rb-f10-ver') : '';
  const lines = [];
  if (base) lines.push(`<b class="num">${C.fmtN(base)}</b> yeni oyuncu`);
  if (drops && drops.d > 0) lines.push(`<b>En büyük kopuş:</b> ${esc(drops.k)} adımında <span class="muted">(${C.fmtN(drops.d)} oyuncu)</span>`);
  const body = base ? sumList(lines, 'f10') + table('f10', ['Adım', 'Ulaşan', 'Yenilere oranı', 'Bir önceki adımdan', 'Kayıp', 'Ortanca varış'], rows, 'rb-f10') + (vt ? `<div class="sub-h">Sürümler yan yana</div>${vt}` : '') : '<p class="muted small">Bu dönemde yeni oyuncu yok.</p>';
  return cardH('f10', 'İlk 10 dakika', 1, body, base ? C.csvButton('rb-f10', C.fileName('rb-ilk-10-dk'), ['Adım', 'Ulaşan', 'Yenilere oranı (%)', 'Önceki adımdan (%)', 'Kayıp', 'Ortanca varış (sn)'], csv) : '',
    'Dönemde oyunu ilk kez açanlar ve oyunun ilk kez adımlarına kaç kişinin ulaştığı. "Ortanca varış": oyunu açtıktan sonra oynanan sürede, oyuncuların yarısı bu adıma bundan önce vardı.');
}
function classCard(A) {
  const esc = C.esc, L = (A.classes || []).slice().sort((a, b) => b.played - a.played);
  const tot = L.reduce((a, c) => a + c.picked, 0), totP = L.reduce((a, c) => a + c.played, 0);
  const rows = L.map((c) => { const lv = bucketQuantile(c.lv10, RB_EDGES.ft); return `<tr data-c="${c.c}"${few(c.played)}><td>${esc(CLS_TR[c.c] || c.c)}</td><td class="n num">${n0(c.picked)} <span class="muted">${pct(rate(c.picked, tot))}</span></td>
    <td class="n num">${n0(c.played)} <span class="muted">${pct(rate(c.played, totP))}</span></td><td class="n num">${pct(rate(c.kept, c.kept_base))}</td><td class="n num">${dec(rate(c.deaths, c.runs))}</td><td class="n num">${mins(lv)}</td><td class="n num">${c.up + c.down ? pct(rate(c.up, c.up + c.down)) : '—'}</td></tr>`; });
  const best = L.filter((c) => c.kept_base >= 5).sort((a, b) => rate(b.kept, b.kept_base) - rate(a.kept, a.kept_base))[0];
  const lines = []; if (L[0]) lines.push(`<b>En çok oynanan:</b> ${esc(CLS_TR[L[0].c])} <span class="muted">(${pct(rate(L[0].played, totP))})</span>`);
  if (best) lines.push(`<b>En çok tutulan:</b> ${esc(CLS_TR[best.c])} <span class="muted">(${pct(rate(best.kept, best.kept_base))} başka günde de oynadı)</span>`);
  const body = L.length ? sumList(lines, 'cls') + table('cls', ['Sınıf', 'Seçilen', 'Oynanan', 'Başka gün dönen', 'Ölüm / koşu', '10. seviyeye', '👍'], rows, 'rb-classes') : '<p class="muted small">Bu dönemde veri yok.</p>';
  return cardH('classes', 'Sınıflar', 2, body, L.length ? C.csvButton('rb-cls', C.fileName('rb-siniflar'), ['Sınıf', 'Seçilen', 'Oynanan', 'Oturum', 'Başka gün dönen (%)', 'Ölüm', 'Koşu', '👍', '👎'],
    L.map((c) => [CLS_TR[c.c], c.picked, c.played, c.sessions, c.kept_base ? Math.round(100 * c.kept / c.kept_base) : '', c.deaths, c.runs, c.up, c.down])) : '',
    '"Seçilen": yeni kahramanı bu sınıfla açan oyuncu. "Oynanan": oturumunu bu sınıfla açan oyuncu. "Başka gün dönen": bu sınıfı oynayanlardan daha sonraki bir günde yine bu sınıfla oynayanlar. "10. seviyeye": kahramanın oynandığı sürede ortanca.');
}
function placeCard(A) {
  const esc = C.esc, L = (A.places || []).slice().sort((a, b) => b.starts - a.starts);
  const rows = L.map((p) => { const ends = p.w + p.d + p.q + p.x, med = bucketQuantile(p.tb, RB_EDGES.run);
    return `<tr data-p="${p.p}"${few(p.players)}><td>${esc(placeName(p.p))}</td><td class="n num">${n0(p.starts)}</td><td class="n num">${pct(rate(p.w, ends))}</td><td class="n num">${pct(rate(p.d + p.q + p.x, ends))}</td>
      <td class="n num">${dec(rate(p.deaths, p.starts))}</td><td class="n num">${mins(med)}</td><td class="n num">${n0(p.left)}</td><td>${(p.causes || []).map((c) => `${esc(causeName(c.c))} <span class="muted">${C.fmtN(c.n)}</span>`).join(', ') || '<span class="muted">—</span>'}</td></tr>`; });
  const hard = L.filter((p) => p.starts >= 10).sort((a, b) => rate(b.d + b.q + b.x, b.w + b.d + b.q + b.x) - rate(a.d + a.q + a.x, a.w + a.d + a.q + a.x))[0];
  const left = L.filter((p) => p.left).sort((a, b) => b.left - a.left)[0];
  const lines = [];
  if (hard) lines.push(`<b>En çok yarıda bırakılan:</b> ${esc(placeName(hard.p))} <span class="muted">(koşuların ${pct(rate(hard.d + hard.q + hard.x, hard.w + hard.d + hard.q + hard.x))}'i yarıda)</span>`);
  if (left) lines.push(`<b>Oyunun en çok bırakıldığı yer:</b> ${esc(placeName(left.p))} <span class="muted">(${C.fmtN(left.left)} oyuncu)</span>`);
  const body = L.length ? sumList(lines, 'pl') + table('pl', ['Yer', 'Giriş', 'Bitirme', 'Yarıda', 'Ölüm / koşu', 'Ortanca süre', 'Burada bıraktı', 'En çok öldüren'], rows, 'rb-places') : '<p class="muted small">Bu dönemde koşu yok.</p>';
  return cardH('places', 'Zindanlar ve yarıklar', 3, body, L.length ? C.csvButton('rb-pl', C.fileName('rb-zindanlar'), ['Yer', 'Giriş', 'Oyuncu', 'Bitirdi', 'Öldü-bıraktı', 'Kasabaya döndü', 'Sayfa kapandı', 'Ölüm', 'Burada bıraktı'],
    L.map((p) => [placeName(p.p), p.starts, p.players, p.w, p.d, p.q, p.x, p.deaths, p.left])) : '',
    '"Yarıda": ölüp çıkan, kasabaya dönen ya da sayfayı kapatan koşular. "Burada bıraktı": dönemde son koşusu burada olan ve 24 saattir hiç oynamayan oyuncu. "Ortanca süre": bitirilen koşuların.');
}
function bossCard(A) {
  const esc = C.esc, L = (A.bosses || []).slice().sort((a, b) => b.fights - a.fights || a.b.localeCompare(b.b));
  const tryMed = (h) => { const n = sum(h); if (!n) return null; let c = 0; for (const k of RB_TRY_STEPS) { c += Number(h[k]) || 0; if (c >= n / 2) return k; } return RB_TRY_STEPS.at(-1); };
  const tryLab = (k) => { const i = RB_TRY_STEPS.indexOf(+k), hi = RB_TRY_STEPS[i + 1]; return hi == null ? `${k}+` : hi - 1 === +k ? String(k) : `${k}–${hi - 1}`; };
  const rows = L.map((b) => { const m = tryMed(b.first), mv = Object.entries(b.moves || {}).sort((x, y) => y[1] - x[1])[0];
    return `<tr data-b="${b.b}"${few(b.players)}><td>${esc(bossName(b.b))}</td><td class="n num">${n0(b.players)}</td><td class="n num">${n0(b.fights)}</td><td class="n num">${pct(rate(b.w, b.fights))}</td>
      <td class="n num">${m == null ? '—' : esc(tryLab(m))}</td><td class="n num">${n0(b.q)}</td><td>${mv ? `${+mv[0] ? `${mv[0]}. hareket` : 'dokunuş / mermi'} <span class="muted">${C.fmtN(mv[1])}</span>` : '<span class="muted">—</span>'}</td>
      <td class="n num">${b.up + b.down ? `${pct(rate(b.up, b.up + b.down))} <span class="muted">(${b.up + b.down})</span>` : '—'}</td></tr>`; });
  const killer = L.slice().sort((a, b) => b.d - a.d)[0];
  const lines = killer && killer.d ? [`<b>En çok öldüren patron:</b> ${esc(bossName(killer.b))} <span class="muted">(${C.fmtN(killer.d)} kez)</span>`] : [];
  const body = L.length ? sumList(lines, 'boss') + table('boss', ['Patron', 'Giren', 'Dövüş', 'Yenme', 'İlk zafere deneme', 'Pes eden', 'En çok öldüren hareket', '👍'], rows, 'rb-bosses') : '<p class="muted small">Bu dönemde patron dövüşü yok.</p>';
  return cardH('bosses', 'Patronlar', 4, body, L.length ? C.csvButton('rb-boss', C.fileName('rb-patronlar'), ['Patron', 'Giren', 'Dövüş', 'Yendi', 'Öldü', 'Pes etti', '👍', '👎'],
    L.map((b) => [bossName(b.b), b.players, b.fights, b.w, b.d, b.q, b.up, b.down])) : '',
    '"İlk zafere deneme": oyuncuların yarısı bu kadar ya da daha az denemede ilk kez yendi (cihazda sayılır). "Pes eden": dövüş sürerken kasabaya dönen ya da dövüşü bırakan. "Hareket": patronun saldırı listesindeki sırası.');
}
function deathCard(A) {
  const esc = C.esc, H = A.deaths?.heat || [];
  const places = [...new Set(H.map((h) => h.p))].sort(), causes = Object.entries(H.reduce((m, h) => { m[h.c] = (m[h.c] || 0) + h.n; return m; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 10).map((x) => x[0]);
  const max = Math.max(1, ...H.map((h) => h.n)), at = (p, c) => H.find((h) => h.p === p && h.c === c)?.n || 0;
  const heat = places.length ? `<div class="scroll-x"><table class="an-t rb-heat" data-testid="rb-heat"><thead><tr><th>Yer \\ Sebep</th>${causes.map((c) => `<th class="n">${esc(causeName(c))}</th>`).join('')}</tr></thead><tbody>
    ${places.map((p) => `<tr><td>${esc(placeName(p))}</td>${causes.map((c) => { const n = at(p, c); return `<td class="n num rb-h" style="--a:${Math.round((n / max) * 70)}%" title="${C.fmtN(n)}">${n ? C.fmtN(n) : ''}</td>`; }).join('')}</tr>`).join('')}</tbody></table></div>` : '';
  const LV = A.deaths?.by_lv || [];
  const lv = LV.length ? `<div class="sub-h">Seviyeye göre (oturum açılışındaki seviye)</div>${C.barList(LV.map((x) => ({ label: `Seviye ${x.v}${x.v >= 25 ? '+' : `–${x.v === 1 ? 4 : x.v + 4}`}`, value: x.runs ? x.deaths / x.runs : 0, text: `${dec(rate(x.deaths, x.runs))} ölüm / koşu · ${C.fmtN(x.runs)} koşu` })))}` : '';
  const body = places.length ? `<p class="small muted">Koyu kare: o yerde o sebeple çok ölüm. En sık 10 sebep.</p>${heat}${lv}` : '<p class="muted small">Bu dönemde ölüm yok.</p>';
  return cardH('deaths', 'Ölümler', 5, body, places.length ? C.csvButton('rb-deaths', C.fileName('rb-olumler'), ['Yer', 'Sebep', 'Ölüm'], H.map((h) => [placeName(h.p), causeName(h.c), h.n])) : '',
    'Her ölümde: nerede ve neyin vurduğu (canavar türü, elitin özelliği, patron ve hareketi, tehlikeli zemin). Koşu başına en çok 3 ölüm sayılır.');
}

// ------------------------------------------------------------------ Etkileşim
function windowCard(A) {
  const esc = C.esc, W = A.windows || { players: 0, list: [] }, L = W.list || [];
  const quick = (w) => rate((Number(w.tb?.[1]) || 0) + (Number(w.tb?.[2]) || 0), w.opens);
  const rows = K.windows.map((k) => L.find((w) => w.w === k) || { w: k, opens: 0, players: 0, acted: 0, tb: {} }).sort((a, b) => b.opens - a.opens).map((w) => {
    const empty = rate(w.opens - w.acted, w.opens), med = bucketQuantile(w.tb, RB_EDGES.win);
    return `<tr data-w="${w.w}"${few(w.players)}><td>${esc(WIN_TR[w.w] || w.w)}</td><td class="n num">${n0(w.opens)}</td><td class="n num">${mins(med)}</td>
      <td class="n num${empty != null && empty >= 0.6 && w.opens >= 10 ? ' rb-bad' : ''}">${pct(empty)}</td><td class="n num">${pct(quick(w))}</td><td class="n num">${pct(W.players ? 1 - w.players / W.players : null)}</td></tr>`; });
  const conf = L.filter((w) => w.opens >= 10).sort((a, b) => rate(b.opens - b.acted, b.opens) - rate(a.opens - a.acted, a.opens))[0];
  const lines = conf ? [`<b>En çok eli boş kapatılan:</b> ${esc(WIN_TR[conf.w])} <span class="muted">(açılışların ${pct(rate(conf.opens - conf.acted, conf.opens))}'i)</span>`] : [];
  return cardH('windows', 'Pencereler', 8, sumList(lines, 'win') + table('win', ['Pencere', 'Açılma', 'Ortanca kalış', 'Eli boş kapatma', '10 sn içinde kapatma', 'Hiç açmayan oyuncu'], rows, 'rb-windows'),
    C.csvButton('rb-win', C.fileName('rb-pencereler'), ['Pencere', 'Açılma', 'Oyuncu', 'Bir şey yapılan'], L.map((w) => [WIN_TR[w.w] || w.w, w.opens, w.players, w.acted])),
    '"Eli boş kapatma": pencerede hiçbir şey değişmeden (eşya, altın, yetenek, ağaç …) kapatılan açılışlar; yüksekse kırmızı (kafa karışıklığı işareti). Oturumda pencere başına en çok 5 açılış sayılır. "Hiç açmayan": dönemde oynayıp bu pencereyi hiç açmayan oyuncu payı.');
}
function exitCard(A) {
  const esc = C.esc, X = A.exits || { sessions: 0, list: [] }, L = X.list || [];
  const died = L.filter((x) => x.l === 'died').reduce((a, x) => a + x.n, 0);
  const lines = X.sessions ? [`Çıkan oturumların <b>${pct(rate(died, X.sessions))}</b>'i ölümden sonraki 60 sn içinde çıktı`] : [];
  const top = L.slice(0, 12).map((x) => ({ label: `${STATE_TR[x.s] || x.s}, ${LAST_TR[x.l] || x.l}`, value: x.n, text: `${C.fmtN(x.n)} · ${pct(rate(x.n, X.sessions))}` }));
  return cardH('exits', 'Çıkış anı', 9, X.sessions ? sumList(lines, 'exit') + C.barList(top) : '<p class="muted small">Bu dönemde veri yok.</p>',
    X.sessions ? C.csvButton('rb-exit', C.fileName('rb-cikis-ani'), ['Nerede', 'Son olay', 'Oturum'], L.map((x) => [STATE_TR[x.s] || x.s, LAST_TR[x.l] || x.l, x.n])) : '',
    'Sayfa gizlenince oyun nerede olduğunu ve son 60 saniyede ne olduğunu yazar; her oturumun son notu sayılır.');
}
function feedbackCard(A) {
  const esc = C.esc, L = (A.feedback || []).slice().sort((a, b) => (b.up + b.down) - (a.up + a.down));
  const R = L.reduce((m, f) => { for (const [k, v] of Object.entries(f.reasons || {})) m[k] = (m[k] || 0) + v; return m; }, {});
  const tot = L.reduce((a, f) => a + f.up + f.down, 0), up = L.reduce((a, f) => a + f.up, 0);
  const rows = L.map((f) => `<tr data-x="${f.x}"${few(f.up + f.down)}><td>${esc(ctxName(f.x))}</td><td class="n num">${n0(f.up + f.down)}</td><td class="n num">${pct(rate(f.up, f.up + f.down))}</td>
    <td>${Object.entries(f.reasons || {}).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${esc(REASON_TR[k] || k)} <span class="muted">${C.fmtN(v)}</span>`).join(', ') || '<span class="muted">—</span>'}</td></tr>`);
  const body = tot ? `${sumList([`<b class="num">${C.fmtN(tot)}</b> cevap · 👍 ${pct(rate(up, tot))}`], 'fb')}${Object.keys(R).length ? `<div class="sub-h">👎 nedenleri</div>${C.barList(Object.entries(R).sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ label: REASON_TR[k] || k, value: v, text: C.fmtN(v) })))}` : ''}${table('fb', ['Nerede', 'Cevap', '👍', '👎 nedenleri'], rows, 'rb-feedback')}`
    : '<p class="muted small">Bu dönemde cevap yok.</p>';
  return cardH('feedback', 'Oyuncu görüşü', 11, body, tot ? C.csvButton('rb-fb', C.fileName('rb-oyuncu-gorusu'), ['Nerede', '👍', '👎', ...K.reasons.map((r) => REASON_TR[r])], L.map((f) => [ctxName(f.x), f.up, f.down, ...K.reasons.map((r) => f.reasons?.[r] || 0)])) : '',
    'Oyun nadiren tek satır sorar: başarıyla biten koşu, ilk patron zaferi, ilk günün 15. dakikası (ölümden hemen sonra hiç). 👎 diyen altı nedenden birini seçebilir. Yorum kutusu yok.');
}
function stationCard(A) {
  const esc = C.esc, L = A.stations || [];
  if (!L.length) return '';
  const by = L.reduce((m, x) => { (m[x.st] = m[x.st] || []).push(x); return m; }, {});
  return cardH('stations', 'İstasyonlar', 8, C.barList(Object.entries(by).map(([st, xs]) => ({ label: WIN_TR[st] || st, value: xs.reduce((a, x) => a + x.n, 0), text: `${C.fmtN(xs.reduce((a, x) => a + x.n, 0))} iş · ${xs.slice(0, 3).map((x) => x.job).join(', ')}` }))),
    C.csvButton('rb-st', C.fileName('rb-istasyonlar'), ['İstasyon', 'İş', 'Sayı', 'Oyuncu'], L.map((x) => [WIN_TR[x.st] || x.st, x.job, x.n, x.players])),
    'Demirci, terzi, okültist, kuyumcu, simyacı ve tüccarda yapılan işler (oturumda iş türü başına en çok 3).');
}

// ------------------------------------------------------------------ Geri dönüş, Sürümler, Teknik
function featureCard(A) {
  const esc = C.esc, F = A.features || { cohort: 0, list: [] };
  const rows = (F.list || []).map((f) => { const u1 = rate(f.d1_users, f.d1_base_users), o1 = rate(f.d1_others, f.d1_base_others), u7 = rate(f.d7_users, f.d7_base_users), o7 = rate(f.d7_others, f.d7_base_others);
    const d = u1 != null && o1 != null ? Math.round(100 * (u1 - o1)) : null;
    return `<tr data-f="${f.f}"${few(f.users)}><td>${esc(FEAT_TR[f.f] || f.f)}</td><td class="n num">${n0(f.users)}</td><td class="n num">${pct(u1)}</td><td class="n num">${pct(o1)}</td>
      <td class="n num">${d == null ? '—' : `<span class="delta ${d > 0 ? 'up' : d < 0 ? 'down' : 'flat'}">${d > 0 ? '+' : ''}${d} puan</span>`}</td><td class="n num">${pct(u7)}</td><td class="n num">${pct(o7)}</td></tr>`; });
  const body = F.cohort ? `<p class="warn-box small" data-testid="rb-feature-warn">Kullananlar zaten daha istekli oyuncular olabilir: fark, özelliğin etkisi diye kesin okunmaz; yön gösterir.</p>
    ${table('feat', ['Özellik (ilk gün)', 'Kullanan', 'Ertesi gün: kullanan', 'Ertesi gün: kullanmayan', 'Fark', '7. gün: kullanan', '7. gün: kullanmayan'], rows, 'rb-features')}` : '<p class="muted small">Bu dönemde yeni oyuncu yok.</p>';
  return cardH('features', 'Özellik etkisi', 10, body, F.cohort ? C.csvButton('rb-feat', C.fileName('rb-ozellik-etkisi'), ['Özellik', 'Kullanan', 'Ertesi gün dönen (kullanan)', 'Taban', 'Ertesi gün dönen (kullanmayan)', 'Taban', '7. gün (kullanan)', 'Taban', '7. gün (kullanmayan)', 'Taban'],
    (F.list || []).map((f) => [FEAT_TR[f.f], f.users, f.d1_users, f.d1_base_users, f.d1_others, f.d1_base_others, f.d7_users, f.d7_base_users, f.d7_others, f.d7_base_others])) : '',
    'Dönemde oyunu ilk kez açanlar, ilk günlerinde bu özelliği kullanan / kullanmayan diye ikiye ayrılır; her grubun ertesi gün ve 7. gün dönen payı.');
}
function versionCard(A) {
  const esc = C.esc, L = A.versions || [];
  const rows = L.map((v) => `<tr data-ver="${esc(v.ver)}"${few(v.open)}><td><b>${esc(v.ver)}</b></td><td class="n num">${n0(v.runs)}</td><td class="n num">${pct(rate(v.clears, v.ends))}</td><td class="n num">${dec(rate(v.deaths, v.runs))}</td>
    <td class="n num">${pct(rate(v.boss_win, v.dungeon))}</td><td class="n num">${pct(rate(v.min10, v.open))}</td></tr>`);
  return cardH('versions', 'Riftborn sürümleri (oyun içi)', 0, `<p class="small muted rb-q"><b>Sorular 1–5, sürüm sürüm:</b> koşular, ölümler, ilk patron, 10 dakikayı geçen.</p>` + (L.length ? table('ver', ['Sürüm', 'Koşu', 'Koşu bitirme', 'Ölüm / koşu', 'İlk patronu yenen', '10 dk\'yı geçen'], rows, 'rb-versions') : '<p class="muted small">Bu dönemde veri yok.</p>'),
    L.length ? C.csvButton('rb-ver', C.fileName('rb-surumler'), ['Sürüm', 'Koşu', 'Biten', 'Bitiren', 'Ölüm', 'Zindana giren', 'İlk patronu yenen', 'Açan', '10 dk'], L.map((v) => [v.ver, v.runs, v.ends, v.clears, v.deaths, v.dungeon, v.boss_win, v.open, v.min10])) : '',
    '"İlk patronu yenen": ilk zindanına girenlerden ilk patronunu yenen pay. "10 dk\'yı geçen": oyunu açanlardan toplam 10 dakika oynayan pay (bu sürümle ilk kez gelenler).');
}
function techCard(A) {
  const esc = C.esc, L = A.tech || [];
  const order = ['fps_60', 'fps_45', 'fps_30', 'fps_20', 'fps_low'];
  const rows = order.map((k) => L.find((x) => x.fps === k)).filter(Boolean).map((x) => `<tr data-fps="${x.fps}"${few(x.players)}><td>${esc(FPS_TR[x.fps])}</td><td class="n num">${n0(x.players)}</td><td class="n num">${pct(rate(x.min10, x.players))}</td><td class="n num">${pct(rate(x.back, x.back_base))}</td></tr>`);
  return cardH('tech', 'Yavaş cihaz', 12, rows.length ? table('tech', ['Akıcılık (oturumun 1. dakikası)', 'Oyuncu', '10 dk oynayan', 'Ertesi gün dönen'], rows, 'rb-tech') : '<p class="muted small">Bu dönemde akıcılık ölçümü yok.</p>',
    rows.length ? C.csvButton('rb-tech', C.fileName('rb-yavas-cihaz'), ['Akıcılık', 'Oturum', 'Oyuncu', '10 dk oynayan', 'Ertesi gün dönen', 'Taban'], L.map((x) => [FPS_TR[x.fps] || x.fps, x.sessions, x.players, x.min10, x.back, x.back_base])) : '',
    'Oyun her sayfada bir kez, oynanırken 20 saniye ölçer (saniyede kaç kare). Akıcılığa göre oyuncuların 10 dakikayı geçen ve ertesi gün dönen payı.');
}

// ------------------------------------------------------------------ Teknik: Cihazlar (stats17.sql st_rb_devices)
export const GFAM_TR = { 'nvidia-rtx': 'NVIDIA RTX', 'nvidia-gtx': 'NVIDIA GTX', 'nvidia-other': 'NVIDIA (diğer)', 'amd-radeon': 'AMD Radeon (ayrı)', 'amd-apu': 'AMD (işlemci içi)',
  'amd-other': 'AMD (diğer)', 'intel-arc': 'Intel Arc', 'intel-iris': 'Intel Iris', 'intel-uhd': 'Intel UHD', 'intel-hd': 'Intel HD', 'intel-other': 'Intel (diğer)', 'apple-m': 'Apple M',
  apple: 'Apple (iPhone / iPad)', mali: 'Mali (Android)', adreno: 'Adreno (Android)', powervr: 'PowerVR', xclipse: 'Samsung Xclipse', software: 'Yazılımla çizim', other: 'Diğer', unknown: 'Bilinmiyor' };
export const GCLS_TR = { integrated: 'Dahili', discrete: 'Ayrı ekran kartı', software: 'Yazılımla çizim', unknown: 'Bilinmiyor' };
export const FORM_TR = { desktop: 'Bilgisayar', mobile: 'Telefon', tablet: 'Tablet', '?': 'Bilinmiyor' };
const OS_TR = { windows: 'Windows', macos: 'macOS', android: 'Android', ios: 'iOS', chromeos: 'ChromeOS', linux: 'Linux', other: 'Diğer', '?': 'Bilinmiyor' };
/** the CPU as far as the browser tells: "8 çekirdek · 8 GB+" (memory: the browser's rounded figure, at most 8) */
export const cpuLabel = (cores, mem) => [cores ? `${cores} çekirdek` : 'çekirdek bilinmiyor', mem ? (mem >= 8 ? '8 GB+' : `${String(mem).replace('.', ',')} GB`) : ''].filter(Boolean).join(' · ');
export function devicesCard(o) {
  const esc = C.esc, e = DV.get(keyOf(o)), A = e && e.data;
  const help = 'Oyun her açılışta bir kez, yaklaşık 2 dakika oynandıktan sonra cihaz raporu gönderir: ekran kartının modeli, işlemci çekirdek sayısı, bellek, telefon mu bilgisayar mı, kasabada ve dövüşte saniyedeki kare sayısı. Kim olduğu yoktur. Paylar cihaz raporu gelen oturumlara göredir; fps = o oturumların ortancası.';
  const wrap = (body, csv = '') => cardH('devices', 'Cihazlar', 0, body, csv, help);
  if (!e || (!A && !e.err)) return wrap('<p class="muted small">Cihaz bilgisi geliyor…</p>');
  if (!A) return wrap(`<div class="warn-box small" data-testid="rb-devices-missing">${e.err && e.err.missing ? 'Cihaz bilgisinin sunucu kurulumu henüz yapılmadı (supabase/studio/stats17.sql).' : esc(C.friendly(e.err))}</div>`);
  const R = A.reports || 0, S = A.sessions || 0;
  if (!R && !S) return wrap('<p class="muted small" data-testid="rb-devices-empty">Bu dönemde cihaz raporu yok: oyunun cihaz bilgisini gönderen sürümü yayınlanınca dolacak.</p>');
  const share = (n) => pct(rate(n, R));
  const fps = (v) => (v == null ? '—' : `${C.fmtN(v)}${v < 30 ? ' <span class="rb-slow" title="30 kare/sn altı">●</span>' : ''}`);
  const chips = (list, key, names) => list.map((x) => `<span class="badge" data-k="${esc(x[key])}">${esc(names[x[key]] || x[key])} ${share(x.n)}</span>`).join(' ');
  const cls = A.cls || [], forms = A.forms || [], gpus = A.gpus || [];
  const sum = [
    R ? `<b>Ekran kartı:</b> ${chips(cls, 'cls', GCLS_TR)}` : '',
    R ? `<b>Cihaz:</b> ${chips(forms, 'form', FORM_TR)}` : '',
    `<span data-testid="rb-devices-fail"><b>3B çizim kayboldu:</b> ${pct(rate(A.lost, S))} <span class="muted">(${n0(A.lost)} / ${n0(S)} oturum)</span> · <b>Yükleme 60 sn içinde bitmedi:</b> ${pct(rate(A.tmo, S))} <span class="muted">(${n0(A.tmo)})</span></span>`,
  ].filter(Boolean);
  const gRows = gpus.slice(0, 10).map((g) => `<tr${few(g.n)}><td>${esc(g.gpu === '?' ? 'Bilinmiyor' : g.gpu)}</td><td>${esc(GFAM_TR[g.fam] || g.fam)}</td><td>${esc(GCLS_TR[g.cls] || g.cls)}</td><td class="n num">${share(g.n)}</td><td class="n num">${fps(g.fps_f)}</td><td class="n num">${fps(g.fps_t)}</td></tr>`);
  const cRows = cls.map((c) => `<tr data-cls="${esc(c.cls)}"${few(c.n)}><td>${esc(GCLS_TR[c.cls] || c.cls)}</td><td class="n num">${n0(c.n)}</td><td class="n num">${fps(c.fps_f)}</td><td class="n num">${fps(c.low_f)}</td><td class="n num">${fps(c.fps_t)}</td></tr>`);
  const fams = (A.fams || []).slice(0, 8).map((f) => `${esc(GFAM_TR[f.fam] || f.fam)} ${share(f.n)}`).join(' · ');
  const cpus = (A.cpus || []).slice(0, 5).map((c) => `${esc(cpuLabel(c.cores, c.mem))} ${share(c.n)}`).join(' · ');
  const models = (A.models || []).slice(0, 6).map((m) => `${esc(m.model)} ${share(m.n)}`).join(' · ');
  const oses = (A.oses || []).slice(0, 6).map((x) => `${esc(OS_TR[x.os] || x.os)} ${share(x.n)}`).join(' · ');
  const body = `${sumList(sum, 'devices')}
    ${gRows.length ? table('gpus', ['Ekran kartı', 'Aile', 'Tür', 'Pay', 'Dövüş fps', 'Kasaba fps'], gRows, 'rb-devices-gpus') : ''}
    ${cRows.length ? table('gcls', ['Tür', 'Oturum', 'Dövüş fps (ortanca)', 'Dövüş en kötü %1', 'Kasaba fps'], cRows, 'rb-devices-cls') : ''}
    <p class="small" data-testid="rb-devices-more">${fams ? `<b>Aileler:</b> ${fams}<br>` : ''}${cpus ? `<b>İşlemci</b> <span class="muted">(tarayıcı modelini söylemez)</span>: ${cpus}<br>` : ''}${oses ? `<b>Sistem:</b> ${oses}` : ''}${models ? `<br><b>Android modelleri:</b> ${models}` : ''}</p>
    <p class="small muted">${n0(R)} cihaz raporu · ${n0(S)} oturum bilgi gönderdi. Ham kayıtlar 14 gün tutulur.</p>`;
  const csv = gpus.length ? C.csvButton('rb-devices', C.fileName('rb-cihazlar'), ['Ekran kartı', 'Aile', 'Tür', 'Oturum', 'Dövüş fps', 'Kasaba fps'], gpus.map((g) => [g.gpu, g.fam, g.cls, g.n, g.fps_f, g.fps_t])) : '';
  return wrap(body, csv);
}

// ------------------------------------------------------------------ the skill trees of 2026-10-22 (stats16 tree3)
/** The talent group's top card for the new trees: per class, the paths (each player's latest main path), Path Stones,
 *  passives, conversions, the bar at 10 and 25 (its commonest skills and layout) and the respecs (what went out / came in).
 *  Shares are of the class's players who sent anything from the new tree in the last 14 days. Null: no tree3 data yet. */
export function tree3Card(A, esc, fm) {
  const X = A && A.tree3; if (!X || !Object.keys(X.class_players || {}).length) return null;
  const by = (L, c) => (L || []).filter((x) => x.c === c);
  const list = (items) => items.length ? items.join(', ') : '<span class="muted">—</span>';
  const share = (n, base) => `<span class="muted">${pct(rate(n, base))}</span>`;
  const blocks = Object.entries(X.class_players).sort((a, b) => b[1] - a[1]).map(([c, base], ci) => {
    const paths = by(X.paths, c).sort((a, b) => a.p - b.p).map((x) => `${esc(t3PathName(c, x.p))} ${share(x.players, base)}`);
    const stones = by(X.stones, c).sort((a, b) => b.players - a.players).map((x) => `${esc(t3Of(c)?.[x.p]?.k || t3PathName(c, x.p))} ${share(x.players, base)}`);
    const hasStone = (t3Of(c) || []).some((P) => P.k);
    const pas = by(X.passives, c).sort((a, b) => b.players - a.players).slice(0, 6).map((x) => `${esc(t3PasName(c, x.id))} ${share(x.players, base)}`);
    const conv = by(X.convs, c).map((x) => `${esc(t3ConvName(x.id))} ${share(x.players, base)}`);
    const bar = [10, 25].map((lv) => {
      const n = (by(X.bar_players, c).find((x) => x.lv === lv) || {}).players || 0; if (!n) return '';
      const sk = by(X.bar_skills, c).filter((x) => x.lv === lv).slice(0, 5).map((x) => `${esc(t3PlaceName(c, x.s))} ${share(x.players, n)}`);
      const top = by(X.bars, c).find((x) => x.lv === lv);
      const lay = top ? top.bar.match(/../g).map((ps) => (ps === '99' ? 'boş' : ps === '98' ? 'ağaç dışı' : t3PlaceName(c, ps))).join(' · ') : '';
      return `<p class="small" data-t3bar="${lv}"><b>${lv}. seviyede bar</b> <span class="muted">(${fm(n)} oyuncu)</span>: ${list(sk)}${top ? `<br><span class="muted">En sık diziliş (${fm(top.players)}):</span> ${esc(lay)}` : ''}</p>`;
    }).join('');
    const rs = by(X.respecs, c)[0], rn = by(X.respec_nodes, c);
    const out = rn.filter((x) => x.removed).sort((a, b) => b.removed - a.removed).slice(0, 4).map((x) => `${esc(t3NodeName(c, x.node))} <span class="muted">${fm(x.removed)}</span>`);
    const inn = rn.filter((x) => x.added).sort((a, b) => b.added - a.added).slice(0, 4).map((x) => `${esc(t3NodeName(c, x.node))} <span class="muted">${fm(x.added)}</span>`);
    const resp = rs ? `<p class="small" data-t3rs><b>Sıfırlama:</b> ${fm(rs.players)} oyuncu (${share(rs.players, base)}) · tüm ağaç ${fm(rs.full)}, tek tek ${fm(rs.partial)}<br><span class="muted">Çıkarılan:</span> ${list(out)}<br><span class="muted">Eklenen:</span> ${list(inn)}</p>` : '<p class="small muted" data-t3rs>Sıfırlama yok.</p>';
    // (one class open, the rest folded: the card stays short on a phone)
    return `<details class="rb-t3" data-t3c="${esc(c)}"${few(base)}${ci ? '' : ' open'}><summary class="small"><b>${esc(t3ClsName(c))}</b> <span class="muted">${fm(base)} oyuncu · en çok: ${esc(paths.length ? t3PathName(c, by(X.paths, c).sort((a, b) => b.players - a.players)[0].p) : '—')}</span></summary>
      <p class="small"><b>Seçilen yol:</b> ${list(paths)}</p>${hasStone ? `<p class="small"><b>Yol taşı:</b> ${list(stones)}</p>` : ''}<p class="small"><b>Pasifler:</b> ${list(pas)}</p>
      <p class="small"><b>Dönüşümler:</b> ${list(conv)}</p>${bar}${resp}</details>`;
  });
  return `<article class="card rb-card rb-ct" data-testid="rb-ct-talents">${q(6)}<p class="small"><b>Yetenek ağacı</b> — her sınıfta oyuncuların seçtiği yol, yol taşı, pasifler, dönüşümler, 10. ve 25. seviyede bar, sıfırlamalar; oyuncuların gördüğü varsayılan ağaç (21 Ekim) ve denemedeki yeni ağaç (22 Ekim) ayrı ayrı.</p>
    ${blocks.join('')}<p class="small muted">Son 14 gün. Pay: o sınıfta o ağaçtan bilgi gelen oyunculara göre. "Seçilen yol": oyuncunun en çok puan verdiği yol (en son hâli). Bar: o seviyede 30 sn zindan oynadıktan sonraki diziliş.</p></article>`;
}

// ------------------------------------------------------------------ İçerik: small live numbers (content.js `live`)
const LIVE = { o: null, data: null, at: 0, busy: false, repaint: null };
/** content.js: the last 14 days' answer for the cards (loaded once a minute at most; repaint when it comes) */
export function contentLive({ rpc, esc, fmtN, repaint, today }) {
  const add = (d, n) => new Date(Date.parse(d + 'T12:00:00Z') + n * 864e5).toISOString().slice(0, 10);
  const t = today || new Date().toISOString().slice(0, 10);
  LIVE.repaint = repaint;
  const ensure = () => {
    if (LIVE.busy || (LIVE.at && Date.now() - LIVE.at < 60000)) return;
    LIVE.busy = true;
    rpc('st_rb_stats', { p_from: add(t, -13), p_to: t }).then((d) => { LIVE.data = d; }).catch(() => { LIVE.data = null; })
      .finally(() => { LIVE.busy = false; LIVE.at = Date.now(); if (LIVE.data && LIVE.repaint) LIVE.repaint(); });
  };
  const fm = (v) => (v == null ? '—' : fmtN(v));
  const line = (parts) => `<p class="small rb-live" data-testid="rb-live">${parts.filter(Boolean).join(' · ')}</p>`;
  const idx = () => {
    const A = LIVE.data; if (!A) return null;
    if (A._idx) return A._idx;
    const sk = Object.fromEntries((A.skills?.list || []).map((s) => [s.s, s]));
    const tal = (A.talents?.list || []).reduce((m, x) => { m[`${x.c}:${x.node}`] = x.players; return m; }, {});
    const cls = Object.fromEntries((A.classes || []).map((c) => [c.c, c]));
    const pl = Object.fromEntries((A.places || []).map((p) => [p.p, p]));
    const bo = Object.fromEntries((A.bosses || []).map((b) => [b.b, b]));
    const un = Object.fromEntries((A.items?.uniques || []).map((u) => [u.u, u]));
    const totCls = (A.classes || []).reduce((a, c) => a + c.picked, 0);
    return (A._idx = { sk, tal, cls, pl, bo, un, totCls });
  };
  return {
    /** a line under a card */
    card(it, group) {
      ensure(); const I = idx(); if (!I) return '';
      const id = it.id, A = LIVE.data;
      if (group === 'skills' && id.startsWith('sk-')) {
        const g = id.slice(3), cls = Object.keys(K.skills).find((c) => K.skills[c].includes(g)); if (!cls) return '';
        const code = K.cls[cls] + String(K.skills[cls].indexOf(g)).padStart(2, '0'), s = I.sk[code], base = A.skills?.class_sessions?.[K.cls[cls]] || 0;
        return line([`Barda ${pct(rate(s ? s.sessions : 0, base))}`, s && s.sessions ? `barda ama kullanılmayan ${pct(rate(s.unused, s.sessions))}` : '', `<span class="muted">${fm(base)} oturum</span>`]);
      }
      if (group === 'talents') {
        const m = /^(tal|pas)-(\w+)-(\w+)$/.exec(id); if (!m || m[1] !== 'pas') return '';
        // (stats16) a passive of the new tree by its id
        for (const c3 of [K.cls[m[2]] + 'w', K.cls[m[2]]]) {
          const T3D = A.tree3, p3 = T3D && (T3D.passives || []).find((x) => x.c === c3 && x.id === m[3]);
          if (p3 || (T3D && t3Of(c3) && t3Of(c3).some((P) => P.p[m[3]]))) { const base3 = T3D.class_players?.[c3] || 0; return line([`Alan ${pct(rate(p3 ? p3.players : 0, base3))}`, `<span class="muted">${fm(base3)} oyuncu (${isNw(c3) ? 'varsayılan ağaç' : 'yeni ağaç'})</span>`]); }
        }
        const cls = m[2], node = `p:${m[3]}`, i = (K.nodes[cls] || []).indexOf(node); if (i < 0) return '';
        const c = K.cls[cls], n = I.tal[`${c}:${String(i).padStart(2, '0')}`] || 0, base = A.talents?.class_players?.[c] || 0;
        return line([`Alan ${pct(rate(n, base))}`, `<span class="muted">${fm(base)} oyuncu</span>`]);
      }
      if (group === 'classes' && id.startsWith('cls-')) { const c = I.cls[K.cls[id.slice(4)]]; return c ? line([`Seçilme ${pct(rate(c.picked, I.totCls))}`, `başka gün dönen ${pct(rate(c.kept, c.kept_base))}`]) : ''; }
      if (group === 'zones' && id.startsWith('area-')) { const p = I.pl['a' + String(+id.slice(5) + 1).padStart(2, '0')]; return p ? line([`Bitirme ${pct(rate(p.w, p.w + p.d + p.q + p.x))}`, `${fm(p.starts)} giriş`, p.left ? `${fm(p.left)} burada bıraktı` : '']) : ''; }
      if (group === 'bosses' && id.startsWith('boss-')) { const i = K.bosses.findIndex((n) => 'boss-' + slug(n) === id); const b = i >= 0 && I.bo['b' + String(i + 1).padStart(2, '0')]; return b ? line([`Yenme ${pct(rate(b.w, b.fights))}`, `${fm(b.fights)} dövüş`]) : ''; }
      if (group === 'uniques' && id.startsWith('uni-')) { const i = K.uniques.findIndex((n) => 'uni-' + slug(n) === id); const u = i >= 0 && I.un['u' + String(i).padStart(2, '0')]; return u ? line([`${fm(u.worn)} kez giyildi`, `${fm(u.scrapped)} kez parçalandı`]) : ''; }
      if (group === 'rarity' && id.startsWith('rar-')) {
        const r = { normal: 'n', magic: 'm', rare: 'r', legend: 'l', unique: 'u', set: 's', ancient: 'a' }[id.slice(4)]; if (!r) return '';
        const sc = (A.items?.scrap || []).find((x) => x.r === r), lo = (A.items?.loot || []).find((x) => x.r === r), worn = (A.items?.worn || []).filter((x) => x.r === r).reduce((a, x) => a + x.n, 0);
        return line([lo ? `düşen ${fm(lo.dropped)}, alınan ${pct(rate(lo.picked, lo.dropped))}` : '', `giyilen ${fm(worn)}`, sc ? `görür görmez parçalanan ${pct(rate(sc.quick_items, sc.items))}` : '']);
      }
      return '';
    },
    /** a card at the top of a group (questions 6, 7) */
    head(g) {
      ensure(); const A = LIVE.data; if (!A || !['skills', 'talents', 'bases', 'uniques', 'rarity'].includes(g.id)) return '';
      if (g.id === 'skills') {
        const used = new Set((A.skills?.list || []).map((s) => s.s));
        const never = Object.entries(K.skills).flatMap(([cls, L]) => L.map((x, i) => ({ cls, x, code: K.cls[cls] + String(i).padStart(2, '0') }))).filter((s) => (A.skills?.class_sessions?.[K.cls[s.cls]] || 0) > 0 && !used.has(s.code)).slice(0, 10);
        const unused = (A.skills?.list || []).filter((s) => s.sessions >= 5).sort((a, b) => rate(b.unused, b.sessions) - rate(a.unused, a.sessions)).slice(0, 5);
        return `<article class="card rb-card rb-ct" data-testid="rb-ct-skills">${q(6)}<p class="small"><b>Hiç seçilmeyen 10 yetenek:</b> ${never.map((s) => esc(`${skName(s.cls, s.x)} (${CLS_TR[K.cls[s.cls]]})`)).join(', ') || '—'}</p>
          <p class="small"><b>Barda ama en çok kullanılmayan:</b> ${unused.map((s) => `${esc(skillLabel(s.s))} <span class="muted">${pct(rate(s.unused, s.sessions))}</span>`).join(', ') || '—'}</p><p class="small muted">Son 14 gün · her kartta: barda olduğu oturum payı.</p></article>`;
      }
      if (g.id === 'talents') {
        const t3 = tree3Card(A, esc, fm); if (t3) return t3;
        const top = (A.talents?.list || []).slice().sort((a, b) => b.players - a.players).slice(0, 5);
        return `<article class="card rb-card rb-ct" data-testid="rb-ct-talents">${q(6)}<p class="small"><b>En çok alınan ağaç düğümleri:</b> ${top.map((x) => `${esc(nodeOf(x.c, x.node))} (${esc(CLS_TR[x.c])}) <span class="muted">${fm(x.players)}</span>`).join(', ') || '—'}</p><p class="small muted">Son 14 gün · pasif kartlarında: alan oyuncu payı.</p></article>`;
      }
      const sc = A.items?.scrap || [], lo = A.items?.loot || [], worn = A.items?.worn || [];
      const rows = K.rar.map((r) => { const s = sc.find((x) => x.r === r), l = lo.find((x) => x.r === r), w = worn.filter((x) => x.r === r).reduce((a, x) => a + x.n, 0), wq = worn.filter((x) => x.r === r).reduce((a, x) => a + x.quick, 0);
        return s || l || w ? `<tr data-r="${r}"><td>${esc(RAR_TR[r])}</td><td class="n num">${l ? fm(l.dropped) : '—'}</td><td class="n num">${l ? pct(rate(l.picked, l.dropped)) : '—'}</td><td class="n num">${fm(w)} <span class="muted">${w ? pct(rate(wq, w)) + ' hemen' : ''}</span></td><td class="n num">${s ? fm(s.items) : '—'}</td><td class="n num">${s ? pct(rate(s.quick_items, s.items)) : '—'}</td></tr>` : ''; }).filter(Boolean);
      const slots = Object.entries(worn.reduce((m, x) => { m[x.slot] = (m[x.slot] || 0) + x.n; return m; }, {})).sort((a, b) => b[1] - a[1]);
      return `<article class="card rb-card rb-ct" data-testid="rb-ct-items">${q(7)}${rows.length ? `<div class="scroll-x"><table class="an-t rb-t" data-testid="rb-items"><thead><tr><th>Tür</th><th class="n">Düşen</th><th class="n">Yerden alınan</th><th class="n">Giyilen</th><th class="n">Parçalanan / satılan</th><th class="n">Görür görmez parçalanan</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>` : '<p class="muted small">Son 14 günde veri yok.</p>'}
        ${slots.length ? `<p class="small"><b>En çok giyilen yuvalar:</b> ${slots.slice(0, 6).map(([s, n]) => `${esc(SLOT_TR[s] || s)} <span class="muted">${fm(n)}</span>`).join(', ')}</p>` : ''}<p class="small muted">Son 14 gün. "Düşen" ve "alınan" yalnız koşu başına en nadir üç tür için sayılır; "görür görmez": düştükten sonraki 30 sn içinde.</p></article>`;
    },
  };
}
