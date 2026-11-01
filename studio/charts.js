// Studio panel — the chart builder: the "Grafikler" tab of the statistics area (docs/STUDYO-PANELI.md, "Grafikler").
// Cards the owner builds himself: tap a number (chip) to add it to the chart, tap again to remove it; filters as chips
// (several values, several properties), "ayır" (one line per country / portal / version…), its own period, granularity
// and comparison with the period before; line, bar or total view, a table and CSV. Cards are saved on the server per
// admin (supabase/studio/stats8.sql: st_charts_list, st_chart_seed, st_chart_save, st_chart_delete, st_chart_order), so
// the phone app shows the same ones; the numbers come from one call per card (st_chart). No outside library: inline SVG.

let C = null; // what app.js lends through analytics.js: rpc, formatters, labels
export function init(ctx) { C = ctx; }

// ------------------------------------------------------------------ the numbers on offer
// unit: n (count), time (seconds), pct (0–1), ratio, money:<currency>. kind: time (over time) or dist (one period, by category).
const G = {
  players: 'Oyuncular', play: 'Oturum ve süre', ret: 'Geri dönüş', funnel: 'Huni ve oyun adımları', meas: 'Reklam, yükleme, akıcılık',
  errors: 'Hatalar', money: 'Kazanç ve platform sayıları', sd: 'Shadow Duel', dist: 'Dağılımlar (tek başına gösterilir)',
};
const BASE = [
  ['dau', 'players', 'Aktif oyuncu', 'n', 'Bir günde oyunu açan farklı kişi (hafta / ay seçiliyse günlük ortalama; saatte: o saatte gelen).'],
  ['new', 'players', 'Yeni oyuncu', 'n', 'Oyunu ilk kez açanlar.'],
  ['retp', 'players', 'Dönen oyuncu', 'n', 'Daha önce de oynamış olup o gün gelenler (günlük ortalama).'],
  ['sessions', 'play', 'Oturum', 'n', 'Oyunun açılma sayısı.'],
  ['spp', 'play', 'Oturum / oyuncu', 'ratio', 'Bir oyuncu bir günde kaç kez açtı.'],
  ['play', 'play', 'Toplam oyun süresi', 'time', 'Herkesin oyunda geçirdiği süre: gelirin en iyi göstergesi.'],
  ['avg', 'play', 'Ortalama oturum', 'time', 'Bir açılışta oyunun önde olduğu ortalama süre.'],
  ['ppp', 'play', 'Oyuncu başına oyun', 'time', 'Bir oyuncunun bir günde oynadığı ortalama süre.'],
  ['med', 'play', 'Ortanca günlük oyun', 'time', 'Oyuncuların yarısı bundan az, yarısı bundan çok oynadı (bir günde; son 35 gün).'],
  ['short', 'play', '30 sn\'den kısa oturum', 'pct', 'Oturumların yüzde kaçı 30 saniye dolmadan bitti.'],
  ['long', 'play', '10 dk\'dan uzun oturum', 'pct', 'Oturumların yüzde kaçı 10 dakikadan uzun sürdü.'],
  ['ret1', 'ret', 'Ertesi gün dönen', 'pct', 'O gün ilk kez gelenlerin yüzde kaçı ertesi gün yine oynadı (kurulum gününe göre).'],
  ['ret2', 'ret', '2. gün dönen', 'pct', 'İlk gelişten tam 2 gün sonra yine oynayan payı.'],
  ['ret3', 'ret', '3. gün dönen', 'pct', 'İlk gelişten tam 3 gün sonra yine oynayan payı.'],
  ['ret7', 'ret', '7. gün dönen', 'pct', 'İlk gelişten tam bir hafta sonra yine oynayan payı.'],
  ['ret14', 'ret', '14. gün dönen', 'pct', 'İlk gelişten tam 14 gün sonra yine oynayan payı.'],
  ['ret30', 'ret', '30. gün dönen', 'pct', 'İlk gelişten tam 30 gün sonra yine oynayan payı.'],
  ['err_reports', 'errors', 'Hata raporu', 'n', 'Oyundan gelen hata raporu sayısı.'],
  ['err_sessions', 'errors', 'Hatalı oturum', 'n', 'En az bir hata olan oturum (yaklaşık).'],
  ['crash', 'errors', 'Çökme oranı', 'pct', 'Hatalı oturumların bütün oturumlara oranı.'],
  ['pl_players', 'money', 'Platform oyuncusu (elle girilen)', 'n', 'Playgama, Yandex, Play Store panelinden yazılan oyuncu sayısı.'],
  ['pl_plays', 'money', 'Platform oynama (elle girilen)', 'n', 'Platform panelinden yazılan oynama sayısı.'],
  ['pl_time', 'money', 'Platform oyun süresi (elle girilen)', 'time', 'Platform panelinden yazılan oyun süresi.'],
  ['pl_ads', 'money', 'Reklam gösterimi (elle girilen)', 'n', 'Platform panelinden yazılan reklam gösterimi.'],
  ['rk_matches', 'sd', 'Dereceli maç', 'n', 'Oynanan dereceli maç (iki gerçek oyuncu).', 'ranked'],
  ['sh_matches', 'sd', 'Gölge maçı', 'n', 'Bir oyuncunun gölgeye (yapay zekâ kopyası) karşı oynadığı dereceli maç.', 'shadow'],
  ['sh_win', 'sd', 'Gölge maçı kazanma oranı', 'pct', 'Gölge maçlarının yüzde kaçını oyuncu kazandı.', 'shadow'],
  ['pass_claims', 'sd', 'Pass ödülü (hepsi)', 'n', 'O gün alınan Gölge Pass ödülü (toplamın günlük artışı).', 'pass'],
  ['pass_ad', 'sd', 'Pass ödülü (reklamla)', 'n', 'Reklam izlenerek alınan Gölge Pass ödülü.', 'pass'],
  ['pass_wait', 'sd', 'Pass ödülü (bekleyerek)', 'n', 'Reklamsız, bekleyerek alınan Gölge Pass ödülü.', 'pass'],
  ['hod', 'dist', 'Günün saatleri', 'n', 'Türkiye saatiyle her saatte oyunda olan oturum (süzgeçle: o saatte başlayan, son 40 gün).'],
  ['lenb', 'dist', 'Oturum uzunluğu', 'n', 'Oturumlar ne kadar sürdü: 30 sn\'den kısa … 10 dk\'dan uzun.'],
  ['exit', 'dist', 'Çıkış ekranı', 'n', 'Oyuncu oyunu hangi ekrandayken bıraktı (en çok 10 ekran).'],
  ['lvl', 'dist', 'Pass seviyesi (şimdi)', 'n', 'Gölge Pass oyuncuları şu an hangi seviyede (dönemden bağımsız).', 'levels'],
];
const MEAS = /^(ad_|load_|fps_|hitch_)/;
const CUR = { USD: 'ABD doları', EUR: 'Euro', RUB: 'Ruble', TRY: 'TL' };
/** the numbers of this page: the fixed ones, the game's events, the currencies with earnings */
function catalog() {
  const o = ST.options || {}, has = o.has || {};
  const list = BASE.filter((d) => !d[5] || has[d[5]]).filter((d) => d[0] !== 'pl_players' && d[0] !== 'pl_plays' && d[0] !== 'pl_time' && d[0] !== 'pl_ads' || has.platform)
    .map(([id, g, label, unit, help]) => ({ id, g, label, unit, help, kind: g === 'dist' ? 'dist' : 'time' }));
  for (const c of o.currencies || []) list.push({ id: `rev:${c}`, g: 'money', label: `Kazanç (${c})`, unit: `money:${c}`, help: `Elle girilen portal kazancı, ${CUR[c] || c}. Para birimleri toplanmaz.`, kind: 'time' });
  const evs = (o.events || []).map((k) => ({ k }));
  const ordered = ST.game ? C.eventOrder(ST.game, evs, (e) => e.k, () => 0) : evs;
  for (const { k } of ordered) {
    const meas = MEAS.test(k);
    list.push({ id: `ev:${k}`, g: meas ? 'meas' : 'funnel', label: C.eventName(k, ST.game), unit: 'n', kind: 'time',
      help: meas ? `Oyunun gönderdiği ölçüm adımı "${k}": kaç kez geldi.` : `Oyunun adımı "${k}": kaç kez geldi (bir kerelik adımlarda: kaç oyuncu ulaştı).` });
  }
  return list;
}
const metricOf = (id) => catalog().find((d) => d.id === id) || (id.startsWith('ev:') ? { id, g: 'funnel', label: C.eventName(id.slice(3), ST.game), unit: 'n', kind: 'time', help: '' }
  : id.startsWith('rev:') ? { id, g: 'money', label: `Kazanç (${id.slice(4)})`, unit: `money:${id.slice(4)}`, kind: 'time', help: '' }
    : (() => { const b = BASE.find((x) => x[0] === id); return b ? { id, g: b[1], label: b[2], unit: b[3], help: b[4], kind: b[1] === 'dist' ? 'dist' : 'time' } : { id, g: '', label: id, unit: 'n', kind: 'time', help: '' }; })());
const UNIT_NAME = (u) => (u === 'n' ? 'sayı' : u === 'time' ? 'süre' : u === 'pct' ? 'yüzde' : u === 'ratio' ? 'oran' : u.startsWith('money:') ? u.slice(6) : u);

// what each kind of number can be filtered by (the server answers the same; this only words the note)
const ALLOW = (id) => (/^ret\d+$/.test(id) ? 'yalnız tek bir özellik: sürüm, portal ya da cihaz' : id.startsWith('ev:') ? 'yalnız cihaz'
  : ['err_reports', 'err_sessions', 'crash'].includes(id) ? 'yalnız sürüm' : id.startsWith('rev:') || id.startsWith('pl_') ? 'yalnız portal'
    : id === 'med' ? 'yalnız portal ya da cihaz' : id === 'exit' ? 'yalnız yeni / dönen' : id === 'hod' ? 'süzgeçle yalnız son 40 gün' : id === 'lvl' ? 'süzgeçsiz; haftanın günü de olmaz' : 'süzgeçsiz');

// ------------------------------------------------------------------ filters and split
const DIMS = [['game', 'Oyun'], ['dow', 'Haftanın günü'], ['portal', 'Portal'], ['country', 'Ülke'], ['device', 'Cihaz'], ['browser', 'Tarayıcı'], ['lang', 'Dil'], ['ver', 'Sürüm'], ['seg', 'Oyuncu']];
const DOW = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const DOW_SHORT = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
const DOW_SETS = [['1,2,3,4,5', 'Hafta içi'], ['6,7', 'Hafta sonu']];
const PLAT = { playgama: 'Playgama', yandex: 'Yandex', googleplay: 'Play Store', gamepix: 'GamePix' };
function keyName(dim, k) {
  if (dim === 'portal') return C.PORTAL[k] || PLAT[k] || k;
  if (dim === 'device') return C.DEVICE[k] || k;
  if (dim === 'country') return C.regionName(k);
  if (dim === 'lang') return C.langName(k);
  if (dim === 'browser') return C.BROWSER[k] || k;
  if (dim === 'seg') return k === 'new' ? 'Yeni' : k === 'ret' ? 'Dönen' : k;
  if (dim === 'dow') return DOW[Number(k) - 1] || k;
  if (dim === 'game') return C.titleOf({ game: k, title: (ST.options?.games || []).find((g) => g.game === k)?.title });
  return k || '?';
}
const dimsHere = () => DIMS.filter(([d]) => d !== 'game' || !ST.game);
function valuesOf(dim, spec) {
  const o = ST.options || {};
  if (dim === 'dow') return ['1', '2', '3', '4', '5', '6', '7'];
  const base = dim === 'seg' ? ['new', 'ret'] : dim === 'game' ? (o.games || []).map((g) => g.game) : (o[dim] || []);
  return [...new Set([...base, ...((spec.filters || {})[dim] || [])])];
}

// ------------------------------------------------------------------ dates (YYYY-MM-DD, Europe/Istanbul)
const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const add = (d, n) => new Date(Date.parse(d + 'T12:00:00Z') + n * 864e5).toISOString().slice(0, 10);
const diff = (a, b) => Math.round((Date.parse(a + 'T12:00:00Z') - Date.parse(b + 'T12:00:00Z')) / 864e5);
const monday = (d) => add(d, -((new Date(d + 'T12:00:00Z').getUTCDay() + 6) % 7));
const mStart = (d) => d.slice(0, 8) + '01';
const isDay = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s + 'T12:00:00Z'));
const PERIODS = [['today', 'Bugün'], ['yday', 'Dün'], ['d', 'Tek gün (tarih seç)'], ['7d', 'Son 7 gün'], ['14d', 'Son 14 gün'], ['30d', 'Son 30 gün'], ['90d', 'Son 90 gün'],
  ['tw', 'Bu hafta'], ['lw', 'Geçen hafta'], ['tm', 'Bu ay'], ['lm', 'Geçen ay'], ['c', 'Özel aralık']];
const GRANS = [['hour', 'Saat'], ['day', 'Gün'], ['week', 'Hafta'], ['month', 'Ay']];
/** the card's first and last day */
export function cardRange(spec, t = today()) {
  switch (spec.period) {
    case 'today': return [t, t];
    case 'yday': return [add(t, -1), add(t, -1)];
    case 'd': { let d = isDay(spec.from) ? spec.from : t; if (d > t) d = t; if (d < '2026-01-01') d = '2026-01-01'; return [d, d]; }
    case '7d': return [add(t, -6), t];
    case '14d': return [add(t, -13), t];
    case '90d': return [add(t, -89), t];
    case 'tw': return [monday(t), t];
    case 'lw': return [add(monday(t), -7), add(monday(t), -1)];
    case 'tm': return [mStart(t), t];
    case 'lm': return [mStart(add(mStart(t), -1)), add(mStart(t), -1)];
    case 'c': {
      let f = isDay(spec.from) ? spec.from : add(t, -29), e = isDay(spec.to) ? spec.to : t;
      if (e > t) e = t;
      if (f > e) [f, e] = [e, f];
      if (f < '2026-01-01') f = '2026-01-01';
      if (diff(e, f) > 399) f = add(e, -399);
      return [f, e];
    }
    default: return [add(t, -29), t];
  }
}
/** granularities that make sense for a range (hour: at most 7 days within the last 35) */
export function cardGrans(from, to, t = today()) {
  const n = diff(to, from) + 1;
  return GRANS.filter(([g]) => (g === 'hour' ? n <= 7 && from >= add(t, -35) : g === 'week' ? n >= 14 : g === 'month' ? n >= 60 : true)).map(([g]) => g);
}
export function cardGran(spec, from, to) {
  const ok = cardGrans(from, to);
  if (ok.includes(spec.gran)) return spec.gran;
  const n = diff(to, from) + 1;
  return n <= 2 && ok.includes('hour') ? 'hour' : n <= 62 ? 'day' : n <= 200 ? 'week' : 'month';
}
const dLabel = (d) => C.dayLabel(d);

// ------------------------------------------------------------------ state
const ST = { el: null, game: null, scope: 'studio', cards: [], options: null, err: null, loaded: false, data: new Map(), ui: new Map(), save: new Map(), seq: 0, loadedAt: 0 };
const ui = (id) => { if (!ST.ui.has(id)) ST.ui.set(id, { pick: false, filt: false, q: '', note: '', rename: false, status: '' }); return ST.ui.get(id); };
const cardOf = (id) => ST.cards.find((c) => String(c.id) === String(id));
const DEF = () => ({ v: 1, metrics: [], filters: {}, split: '', period: '30d', gran: '', compare: false, show: 'line', table: false });
const norm = (s) => ({ ...DEF(), ...(s || {}), filters: { ...((s && s.filters) || {}) }, metrics: [...((s && s.metrics) || [])] });
export const __test = { cardRange, cardGrans, ST };

/** the starter cards of a page (given once; the owner can change or delete them) */
function starters() {
  const o = ST.options || {}, has = o.has || {};
  if (!ST.game) {
    return [
      { title: 'Oyuncular', spec: { metrics: ['dau', 'new'], period: '30d', compare: true } },
      { title: 'Oyunlar yan yana', spec: { metrics: ['dau'], split: 'game', period: '30d' } },
      { title: 'Oyun süresi', spec: { metrics: ['play', 'avg'], period: '30d' } },
      { title: 'Geri dönüş', spec: { metrics: ['ret1', 'ret7'], period: '30d' } },
    ];
  }
  const funnel = C.eventOrder(ST.game, (o.events || []).filter((k) => !MEAS.test(k) && C.eventName(k, ST.game) !== k).map((k) => ({ k })), (e) => e.k, () => 0).slice(0, 4).map((e) => `ev:${e.k}`);
  const list = [
    { title: 'Oyuncular', spec: { metrics: ['dau', 'new'], period: '30d', compare: true } },
    { title: 'Oturum ve süre', spec: { metrics: ['sessions', 'avg'], period: '30d' } },
    { title: 'Ülkelere göre oyuncu', spec: { metrics: ['dau'], split: 'country', period: '30d', show: 'total' } },
    { title: 'Geri dönüş', spec: { metrics: ['ret1', 'ret7'], period: '30d' } },
  ];
  if (funnel.length) list.push({ title: 'Huni adımları', spec: { metrics: funnel, period: '30d', show: 'bar' } });
  if (ST.game === 'shadow-duel' && (has.ranked || has.shadow)) list.push({ title: 'Dereceli ve gölge maçları', spec: { metrics: [has.ranked && 'rk_matches', has.shadow && 'sh_matches'].filter(Boolean), period: '30d' } });
  if (ST.game === 'shadow-duel' && has.pass) list.push({ title: 'Gölge Pass ödülleri', spec: { metrics: ['pass_ad', 'pass_wait'], period: '30d', show: 'bar' } });
  return list;
}

// ------------------------------------------------------------------ entry points (analytics.js)
export function mount(el, game) {
  const again = ST.el === el && ST.game === game && ST.loaded;
  ST.el = el; ST.game = game; ST.scope = game || 'studio';
  if (!again) { ST.cards = []; ST.options = null; ST.loaded = false; ST.err = null; ST.data.clear(); }
  paint();
  return load();
}
export function refresh() {
  if (!ST.el || !ST.el.isConnected) return Promise.resolve();
  return Promise.all(ST.cards.map((c) => fetchCard(c, true)));
}
export const loadedAt = () => ST.loadedAt;

async function load() {
  const my = ++ST.seq, scope = ST.scope;
  try {
    let r = await C.rpc('st_charts_list', { p_scope: scope });
    if (my !== ST.seq) return;
    ST.options = r.options || {};
    if (!r.seeded) {
      const s = await C.rpc('st_chart_seed', { p_scope: scope, p_cards: starters() });
      if (my !== ST.seq) return;
      r = { ...r, cards: s.cards };
    }
    ST.cards = (r.cards || []).map((c) => ({ ...c, spec: norm(c.spec) }));
    ST.loaded = true; ST.err = null;
  } catch (e) {
    if (my !== ST.seq) return;
    ST.err = e;
  }
  paint();
  ST.cards.forEach((c) => fetchCard(c));
}

// ------------------------------------------------------------------ server: numbers and saving
function argsOf(card) {
  const s = card.spec, [from, to] = cardRange(s), gran = cardGran(s, from, to);
  const filters = {};
  for (const [d] of dimsHere()) if ((s.filters[d] || []).length) filters[d] = s.filters[d];
  return { p_game: ST.game, p_metrics: s.metrics, p_filters: filters, p_split: s.split || '', p_from: from, p_to: to, p_gran: gran, p_compare: !!s.compare };
}
async function fetchCard(card, force = false) {
  const id = card.id;
  if (!card.spec.metrics.length) { ST.data.delete(id); drawOut(card); return; }
  const args = argsOf(card), key = JSON.stringify(args), hit = ST.data.get(id);
  if (!force && hit && hit.key === key && hit.data && Date.now() - hit.at < 60000) { drawOut(card); return; }
  const my = (hit?.my || 0) + 1;
  ST.data.set(id, { ...(hit || {}), key, my, loading: true });
  markStale(card);
  try {
    const data = await C.rpc('st_chart', args);
    const cur = ST.data.get(id);
    if (!cur || cur.my !== my) return;
    ST.data.set(id, { key, my, data, at: Date.now(), err: null });
    ST.loadedAt = Date.now();
  } catch (e) {
    const cur = ST.data.get(id);
    if (!cur || cur.my !== my) return;
    ST.data.set(id, { key, my, data: cur.data && cur.key === key ? cur.data : null, at: Date.now(), err: e });
  }
  const c = cardOf(id);
  if (c) drawOut(c);
}
function markStale(card) {
  const el = outEl(card.id);
  if (el && el.dataset.drawn) el.classList.add('stale');
  else if (el) el.innerHTML = '<p class="muted small">Yükleniyor…</p>';
}
/** save a card a moment after the last change (a burst of taps is one save) */
function saveSoon(card) {
  clearTimeout(ST.save.get(card.id));
  ST.save.set(card.id, setTimeout(() => saveNow(card), 500));
}
async function saveNow(card) {
  clearTimeout(ST.save.get(card.id));
  ST.save.delete(card.id);
  const u = ui(card.id);
  try {
    const r = await C.rpc('st_chart_save', { p_scope: ST.scope, p_id: card.id, p_title: card.title, p_spec: card.spec });
    card.updated_at = r.updated_at;
    u.status = '';
  } catch (e) {
    u.status = `Kaydedilemedi: ${C.friendly(e)}`;
  }
  const st = document.querySelector(`[data-card="${card.id}"] .cb-status`);
  if (st) st.textContent = u.status;
}
async function orderNow() {
  try {
    const r = await C.rpc('st_chart_order', { p_scope: ST.scope, p_ids: ST.cards.map((c) => c.id) });
    const pos = new Map((r.cards || []).map((c) => [String(c.id), c.pos]));
    ST.cards.forEach((c) => { if (pos.has(String(c.id))) c.pos = pos.get(String(c.id)); });
  } catch (e) { alert(C.friendly(e)); }
}

// ------------------------------------------------------------------ paint
const esc = (s) => C.esc(s);
const info = (text) => `<details class="an-i"><summary aria-label="Açıklama">ⓘ</summary><p>${esc(text)}</p></details>`;
function paint() {
  const el = ST.el;
  if (!el || !el.isConnected) return;
  if (ST.err) {
    el.innerHTML = ST.err.missing
      ? '<div class="warn-box" data-testid="cb-missing">Grafiklerin sunucu kurulumu henüz yapılmadı (supabase/studio/stats8.sql). Kurulunca burada istediğin sayıları seçip kendi grafiklerini yapabilirsin.</div>'
      : `<div class="warn-box">${esc(C.friendly(ST.err))}</div>`;
    return;
  }
  if (!ST.loaded) { el.innerHTML = '<p class="muted">Grafikler geliyor…</p>'; return; }
  el.innerHTML = `<div class="cb" data-testid="cb">
      <div class="cb-list" id="cbList">${ST.cards.map((c) => `<div class="cb-slot" data-slot="${esc(c.id)}"></div>`).join('')}</div>
      ${ST.cards.length ? '' : '<p class="muted" data-testid="cb-empty">Henüz grafik yok. "+ Yeni grafik" ile başla.</p>'}
    </div>`;
  ST.cards.forEach((c) => renderCard(c));
}
const slotEl = (id) => ST.el && ST.el.querySelector(`.cb-slot[data-slot="${CSS.escape(String(id))}"]`);
const outEl = (id) => ST.el && ST.el.querySelector(`[data-card="${CSS.escape(String(id))}"] .cb-out`);

function renderCard(card) {
  const slot = slotEl(card.id);
  if (!slot) return;
  const s = card.spec, u = ui(card.id), [from, to] = cardRange(s), gran = cardGran(s, from, to), okG = cardGrans(from, to);
  const i = ST.cards.indexOf(card), n = ST.cards.length;
  const focusQ = document.activeElement && document.activeElement.matches?.(`[data-card="${card.id}"] .cb-q`);
  const pos = focusQ ? document.activeElement.selectionStart : 0;
  const cat = catalog();
  const colorOf = seriesColors(card);
  const sel = s.metrics.map((m) => metricOf(m));
  const fl = filterSummary(s);
  slot.innerHTML = `<article class="card cb-card" data-card="${esc(card.id)}" data-testid="cb-card">
    <div class="cb-head">
      ${u.rename ? `<form class="cb-rename row" data-card-form="${esc(card.id)}"><input type="text" class="cb-title-in" maxlength="60" value="${esc(card.title)}" aria-label="Grafiğin adı" required>
          <button type="submit" class="btn primary">Kaydet</button><button type="button" class="btn" data-act="cb-rename-x">Vazgeç</button></form>`
        : `<h3 class="cb-title">${esc(card.title)}</h3>`}
      <div class="cb-acts" role="group" aria-label="Grafik">
        <button type="button" class="ghost" data-act="cb-rename" title="Adını değiştir" aria-label="Adını değiştir">✎</button>
        <button type="button" class="ghost" data-act="cb-dup" title="Çoğalt" aria-label="Çoğalt">⧉</button>
        <button type="button" class="ghost" data-act="cb-up" title="Yukarı taşı" aria-label="Yukarı taşı" ${i <= 0 ? 'disabled' : ''}>▲</button>
        <button type="button" class="ghost" data-act="cb-down" title="Aşağı taşı" aria-label="Aşağı taşı" ${i >= n - 1 ? 'disabled' : ''}>▼</button>
        <button type="button" class="ghost cb-del" data-act="cb-del" title="Sil" aria-label="Sil">Sil</button>
      </div>
    </div>
    <div class="cb-ctl">
      <select class="cb-period" aria-label="Dönem">${PERIODS.map(([k, t]) => `<option value="${k}" ${k === s.period ? 'selected' : ''}>${t}</option>`).join('')}</select>
      ${s.period === 'd' ? `<label class="small">Gün <input type="date" class="cb-day" value="${from}" min="2026-01-01" max="${today()}" data-testid="cb-day"></label>`
        : s.period === 'c' ? `<label class="small">Başlangıç <input type="date" class="cb-from" value="${from}" min="2026-01-01" max="${today()}"></label>
        <label class="small">Bitiş <input type="date" class="cb-to" value="${to}" min="2026-01-01" max="${today()}"></label>` : `<span class="small muted num cb-range">${esc(from === to ? dLabel(from) : `${dLabel(from)} – ${dLabel(to)}`)}</span>`}
      <div class="seg" role="group" aria-label="Aralık">${GRANS.filter(([k]) => okG.includes(k)).map(([k, t]) => `<button type="button" data-act="cb-gran" data-g="${k}" aria-pressed="${k === gran}">${t}</button>`).join('')}</div>
      <label class="small cb-cmp"><input type="checkbox" class="cb-compare" ${s.compare ? 'checked' : ''}> önceki dönemle karşılaştır</label>
    </div>
    <div class="cb-sel">
      <div class="chips cb-chosen" data-testid="cb-chosen">${sel.map((d) => `<button type="button" class="cb-chip on" data-act="cb-metric" data-m="${esc(d.id)}" aria-pressed="true" title="Grafikten çıkar">
          <span class="cb-dot" style="background:${colorOf(d.id)}"></span>${esc(d.label)}<span aria-hidden="true" class="cb-x">✕</span></button>`).join('')}
        <button type="button" class="cb-chip cb-add" data-act="cb-pick" aria-expanded="${u.pick}" data-testid="cb-pick">${u.pick ? 'Sayı listesini kapat' : '+ Sayı ekle'}</button></div>
      ${u.pick ? pickerHtml(card, cat) : ''}
    </div>
    <div class="cb-filt">
      <div class="chips cb-fsum">${fl.map(([d, k]) => `<button type="button" class="cb-chip on" data-act="cb-fval" data-d="${esc(d)}" data-k="${esc(k)}" title="Süzgeçten çıkar">${esc(DIMS.find((x) => x[0] === d)[1])}: ${esc(keyName(d, k))}<span aria-hidden="true" class="cb-x">✕</span></button>`).join('')}
        ${(s.filters.dow || []).length ? `<button type="button" class="cb-chip on" data-act="cb-dowset" data-set="" data-testid="cb-dowsum" title="Süzgeçten çıkar">Günler: ${esc(dowText(s))}<span aria-hidden="true" class="cb-x">✕</span></button>` : ''}
        ${s.split ? `<button type="button" class="cb-chip on" data-act="cb-split" data-d="" title="Ayırmayı kaldır">Ayrı çizgi: ${esc(DIMS.find((x) => x[0] === s.split)[1])}<span aria-hidden="true" class="cb-x">✕</span></button>` : ''}
        <button type="button" class="cb-chip cb-add" data-act="cb-filt" aria-expanded="${u.filt}" data-testid="cb-filt">${u.filt ? 'Süzgeçleri kapat' : '⚲ Süzgeç ve ayırma'}</button></div>
      ${u.filt ? filterHtml(card) : ''}
    </div>
    <div class="cb-view">
      ${sel.some((d) => d.kind === 'dist') ? '' : `<div class="seg" role="group" aria-label="Görünüm">${[['line', 'Çizgi'], ['bar', 'Çubuk'], ['total', 'Toplam']].map(([k, t]) => `<button type="button" data-act="cb-show" data-show="${k}" aria-pressed="${s.show === k}">${t}</button>`).join('')}</div>`}
      <button type="button" class="ghost small" data-act="cb-table" aria-pressed="${!!s.table}" data-testid="cb-table">${s.table ? 'Grafiği göster' : 'Tablo'}</button>
      <button type="button" class="ghost small" data-act="cb-csv" data-testid="cb-csv">CSV</button>
      <span class="small muted cb-status" role="status">${esc(u.status)}</span>
    </div>
    ${u.note ? `<p class="note small cb-note" data-testid="cb-note">${u.note}</p>` : ''}
    <div class="cb-out" aria-live="polite"></div>
  </article>`;
  if (focusQ) { const q = slot.querySelector('.cb-q'); if (q) { q.focus(); try { q.setSelectionRange(pos, pos); } catch { /* */ } } }
  if (u.rename) slot.querySelector('.cb-title-in')?.focus();
  drawOut(card);
}
function pickerHtml(card, cat) {
  const s = card.spec, u = ui(card.id), q = u.q.trim().toLocaleLowerCase('tr');
  const groups = Object.keys(G).map((g) => [g, cat.filter((d) => d.g === g && (!q || d.label.toLocaleLowerCase('tr').includes(q) || d.id.toLowerCase().includes(q)))]).filter(([, l]) => l.length);
  return `<div class="cb-picker" data-testid="cb-picker">
    <input type="search" class="cb-q" placeholder="Sayı ara (ör. oyuncu, süre, dönen)" aria-label="Sayı ara" value="${esc(u.q)}">
    ${groups.map(([g, l]) => `<div class="cb-group" data-group="${g}"><div class="sub-h">${esc(G[g])}</div>
      <div class="chips">${l.map((d) => `<button type="button" class="cb-chip${s.metrics.includes(d.id) ? ' on' : ''}" data-act="cb-metric" data-m="${esc(d.id)}" aria-pressed="${s.metrics.includes(d.id)}" title="${esc(d.help)}">${esc(d.label)}</button>`).join('')}</div></div>`).join('')
      || '<p class="small muted">Bu aramayla sayı yok.</p>'}
  </div>`;
}
function filterHtml(card) {
  const s = card.spec;
  return `<div class="cb-fpanel" data-testid="cb-fpanel">
    ${dimsHere().map(([d, t]) => { const vals = valuesOf(d, s), on = s.filters[d] || []; return vals.length ? `<div class="cb-group" data-dim="${d}"><div class="sub-h">${esc(t)}${d === 'dow' ? ' <span class="muted" style="text-transform:none;font-weight:400">(Türkiye günü; yalnız seçili günler sayılır)</span>' : ''}</div>
      <div class="chips">${d === 'dow' ? DOW_SETS.map(([k, t2]) => `<button type="button" class="cb-chip cb-quick${dowKey(s) === k ? ' on' : ''}" data-act="cb-dowset" data-set="${k}" aria-pressed="${dowKey(s) === k}">${t2}</button>`).join('') : ''}${vals.map((k) => `<button type="button" class="cb-chip${on.includes(k) ? ' on' : ''}" data-act="cb-fval" data-d="${d}" data-k="${esc(k)}" aria-pressed="${on.includes(k)}" ${d === 'dow' ? `title="${esc(keyName(d, k))}"` : ''}>${esc(d === 'dow' ? DOW_SHORT[Number(k) - 1] : keyName(d, k))}</button>`).join('')}</div></div>` : ''; }).join('')}
    <div class="cb-group"><div class="sub-h">Ayrı çizgi (ayır)</div>
      <div class="chips" data-testid="cb-split">${[['', 'Ayırma yok'], ...dimsHere()].map(([d, t]) => `<button type="button" class="cb-chip${(s.split || '') === d ? ' on' : ''}" data-act="cb-split" data-d="${d}" aria-pressed="${(s.split || '') === d}">${esc(d ? `Her ${t.toLocaleLowerCase('tr')}` : t)}</button>`).join('')}</div>
      <p class="small muted" style="margin:6px 0 0">Bir özellik seçilirse her değeri (ör. her ülke) ayrı çizgi olur; en büyük 8'i gösterilir. Haftanın günü seçilirse her gün ayrı çizgi olur (hafta hafta) ya da Toplam görünümünde her günün ortalaması.</p></div>
  </div>`;
}
const filterSummary = (s) => dimsHere().filter(([d]) => d !== 'dow').flatMap(([d]) => (s.filters[d] || []).map((k) => [d, k]));
const dowKey = (s) => [...(s.filters.dow || [])].sort().join(',');
const dowText = (s) => DOW_SETS.find(([k]) => k === dowKey(s))?.[1] || [...(s.filters.dow || [])].sort().map((k) => DOW_SHORT[Number(k) - 1]).join(', ');

// ------------------------------------------------------------------ series, colours, formatting
const COLORS = 8;
const colorVar = (i) => `var(--cb-${(i % COLORS) + 1})`;
/** the series of a card's answer: each number × each split value (≤ 8), in order; colour by position */
function seriesOf(card, A) {
  const out = [];
  if (!A) return out;
  for (const m of card.spec.metrics) {
    const M = A.metrics?.[m], d = metricOf(m);
    if (!M || !M.ok) continue;
    for (const se of M.series || []) {
      if (out.length >= COLORS) break;
      out.push({ id: `${m}|${se.k}`, m, k: se.k, d, agg: M.agg, kind: M.kind || d.kind, cats: M.cats, unit: d.unit,
        label: card.spec.split && se.k !== '' ? `${d.label} · ${keyName(card.spec.split, se.k)}` : d.label, v: se.v || [], pv: se.pv || null, total: se.total, prev_total: se.prev_total });
    }
  }
  out.forEach((x, i) => { x.color = colorVar(i); });
  return out;
}
/** colour of a chosen number's chip: its first series (or its place among the chosen) */
function seriesColors(card) {
  const ser = seriesOf(card, ST.data.get(card.id)?.data);
  return (m) => { const x = ser.find((s) => s.m === m); return x ? x.color : colorVar(card.spec.metrics.indexOf(m)); };
}
function fmtVal(unit, agg, v) {
  if (v == null || !Number.isFinite(Number(v))) return '—';
  v = Number(v);
  if (unit === 'time') return C.fmtDur(Math.round(v));
  if (unit === 'pct') return `%${(v * 100).toLocaleString('tr-TR', { maximumFractionDigits: 1 })}`;
  if (unit === 'ratio') return v.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
  if (unit.startsWith('money:')) return C.money(v, unit.slice(6));
  return agg === 'perday' || !Number.isInteger(v) ? v.toLocaleString('tr-TR', { maximumFractionDigits: 1 }) : C.fmtN(v);
}
const dec = (v) => v.toLocaleString('tr-TR', { maximumFractionDigits: 1 });
function tickFmt(unit, v) {
  if (unit === 'time') return v >= 3600 ? `${dec(v / 3600)} sa` : v >= 60 ? `${dec(v / 60)} dk` : `${dec(v)} sn`;
  if (unit === 'pct') return `%${dec(v * 100)}`;
  return C.fmtCompact(v);
}
/** the axis top: 4 even steps; durations step in seconds, minutes or hours */
function niceTopU(unit, max) {
  if (unit === 'time' && max >= 3600) return niceTop(max / 3600) * 3600;
  if (unit === 'time' && max >= 60) return niceTop(max / 60) * 60;
  return niceTop(max);
}
function niceTop(max) {
  if (!(max > 0)) return 1;
  const raw = max / 4, p = 10 ** Math.floor(Math.log10(raw)), n = raw / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p * 4;
}
function bucketLabel(t, gran, short = false) {
  if (gran === 'hour') { const [d, h] = t.split(' '); return short ? `${h}:00` : `${dLabel(d)} ${h}:00`; }
  if (gran === 'month') return C.fmtDate(t + 'T12:00:00Z', { month: 'short', year: '2-digit' });
  if (gran === 'week') return short ? dLabel(t) : `${dLabel(t)} haftası`;
  return dLabel(t);
}
const LEN = { lt30: '30 sn\'den kısa', lt60: '30 sn – 1 dk', lt180: '1–3 dk', lt600: '3–10 dk', ge600: '10 dk\'dan uzun' };
function catLabel(m, c) {
  if (m === 'hod') return `${String(c).padStart(2, '0')}:00`;
  if (m === 'lenb') return LEN[c] || c;
  if (m === 'exit') return C.screenName(c === '?' ? '' : c, ST.game);
  if (m === 'lvl') return `${c}. seviye`;
  return c;
}
const WHY = (id, why) => (why === 'filter' ? `bu süzgeç / ayırmayla sayılamıyor (${ALLOW(id)})` : why === 'hour' ? 'saatlik tutulmuyor: Gün ya da daha geniş aralık seç'
  : why === 'game' ? 'yalnız Shadow Duel sayfasında (ya da süzgeçte Shadow Duel seçiliyken)' : why === 'missing' ? 'bu sayının tablosu sunucuda kurulu değil' : 'gösterilemiyor');

// ------------------------------------------------------------------ the output: notes, chart / total / table
const TABLES = new Map(); // card id → {head, rows, name} for CSV
function drawOut(card) {
  const el = outEl(card.id);
  if (!el) return;
  const hit = ST.data.get(card.id), A = hit && hit.data, s = card.spec;
  el.classList.remove('stale');
  if (!s.metrics.length) { el.innerHTML = '<p class="muted small cb-hint" data-testid="cb-nometric">Bu grafikte henüz sayı yok: "+ Sayı ekle"ye dokun, istediğin sayılara dokun.</p>'; delete el.dataset.drawn; TABLES.delete(card.id); return; }
  if (!A) {
    if (hit && hit.err) el.innerHTML = hit.err.missing ? '<div class="warn-box" data-testid="cb-missing">Grafiklerin sunucu kurulumu henüz yapılmadı (supabase/studio/stats8.sql).</div>' : `<div class="warn-box">${esc(C.friendly(hit.err))}</div>`;
    else el.innerHTML = '<p class="muted small">Yükleniyor…</p>';
    return;
  }
  if (hit.loading) el.classList.add('stale');
  const notes = [];
  for (const m of s.metrics) { const M = A.metrics?.[m]; if (M && !M.ok) notes.push(`<b>${esc(metricOf(m).label)}</b>: ${esc(WHY(m, M.why))}.`); }
  const cubeUsed = s.metrics.some((m) => A.metrics?.[m]?.ok && A.metrics[m].src === 'cube');
  if (cubeUsed && (!A.cube_since || A.cube_since > A.from)) notes.push(A.cube_since ? `Birden çok süzgeç birlikte (ya da yeni / dönen) ${esc(dLabel(A.cube_since))}'den beri sayılıyor; öncesi boş görünür.` : 'Birden çok süzgeç birlikte henüz sayılmadı: oturumlar bittikten 35 dakika sonra gelir.');
  if (A.gran === 'hour' && s.metrics.some((m) => A.metrics?.[m]?.ok && A.metrics[m].src === 'daily') && A.hourly_since && A.hourly_since > A.from) notes.push(`Saatlik veri ${esc(dLabel(A.hourly_since))}'den beri tutuluyor.`);
  const more = s.metrics.filter((m) => (A.metrics?.[m]?.more || 0) > 0);
  if (more.length) notes.push(`Ayrı çizgilerde en büyük 8 değer gösteriliyor; ${more.map((m) => A.metrics[m].more).reduce((a, b) => a + b, 0)} değer daha var (süzgeçle daraltılabilir).`);
  const ser = seriesOf(card, A);
  const total = ser.length && ser.length < s.metrics.reduce((n, m) => n + ((A.metrics?.[m]?.series || []).length), 0) ? '<p class="small muted">Bir grafikte en çok 8 çizgi olur; fazlası gösterilmiyor.</p>' : '';
  let body;
  const dist = ser.length && ser[0].kind === 'dist';
  if (!ser.length) body = '<p class="muted small" data-testid="cb-nodata">Bu seçimle gösterilecek sayı yok.</p>';
  else if (s.table) body = tableHtml(card, A, ser, dist);
  else if (dist) body = distChart(card, A, ser);
  else if (s.show === 'total') body = totalsHtml(card, A, ser);
  else body = timeChart(card, A, ser);
  if (!s.table) tableHtml(card, A, ser, dist); // keeps the CSV rows current
  el.innerHTML = `${notes.length ? `<div class="note small cb-notes" data-testid="cb-notes">${notes.map((x) => `<div>${x}</div>`).join('')}</div>` : ''}${body}${total}`;
  el.dataset.drawn = '1';
  // colour dots of the chosen chips follow the series drawn
  const colorOf = seriesColors(card);
  ST.el.querySelectorAll(`[data-card="${CSS.escape(String(card.id))}"] .cb-chosen .cb-dot`).forEach((dot) => { dot.style.background = colorOf(dot.parentElement.dataset.m); });
  wirePlot(card, A, ser, dist);
}

function legendHtml(ser, axes, compare, dist) {
  return `<ul class="cb-legend" data-testid="cb-legend">${ser.map((x) => `<li data-sid="${esc(x.id)}"><span class="cb-sw" style="background:${x.color}"></span><span class="cb-ll">${esc(x.label)}</span>
      ${axes.length > 1 && x.unit === axes[1] ? '<span class="muted">(sağ eksen)</span>' : ''}<b class="num">${esc(fmtVal(x.unit, x.agg, x.total))}</b><span class="muted small">${dist || x.agg === 'sum' ? 'toplam' : x.agg === 'perday' ? 'günlük ort.' : 'dönem'}</span></li>`).join('')}
    ${compare ? '<li class="cb-prevkey"><span class="cb-sw dash"></span><span class="muted">kesik çizgi: önceki dönem</span></li>' : ''}</ul>`;
}

/** points over time: lines or bars, a left axis and (when two units) a right one; a crosshair with every value */
function timeChart(card, A, ser) {
  const w = Math.max(300, Math.round(outEl(card.id)?.clientWidth || 600)), narrow = w < 520;
  const H = narrow ? 240 : 280, T = 22, B = 26;
  const axes = [...new Set(ser.map((x) => x.unit))].slice(0, 2);
  const R = axes.length > 1 ? 48 : 12, L = 48;
  const n = A.buckets.length, band = (w - L - R) / Math.max(n, 1);
  const cmp = !!A.compare;
  const tops = axes.map((u) => niceTopU(u, Math.max(0, ...ser.filter((x) => x.unit === u).flatMap((x) => [...x.v, ...(cmp && x.pv ? x.pv : [])]).filter((v) => v != null).map(Number))));
  const yOf = (u) => { const top = tops[axes.indexOf(u)] || 1; return (v) => T + (H - T - B) * (1 - Number(v) / top); };
  let g = '';
  for (let k = 0; k <= 4; k++) {
    const yy = T + ((H - T - B) * k) / 4;
    g += `<line class="cb-grid" x1="${L}" x2="${w - R}" y1="${yy}" y2="${yy}"/>`;
    g += `<text class="cb-tick" x="${L - 6}" y="${yy + 4}" text-anchor="end">${esc(tickFmt(axes[0], (tops[0] * (4 - k)) / 4))}</text>`;
    if (axes[1]) g += `<text class="cb-tick" x="${w - R + 6}" y="${yy + 4}" text-anchor="start">${esc(tickFmt(axes[1], (tops[1] * (4 - k)) / 4))}</text>`;
  }
  const every = Math.max(1, Math.ceil(n / (narrow ? 5 : 9)));
  const xl = A.buckets.map((b, i) => (i % every === 0 ? `<text class="cb-tick" x="${L + band * (i + 0.5)}" y="${H - 8}" text-anchor="middle">${esc(bucketLabel(b.t, A.gran, true))}</text>` : '')).join('');
  const bars = card.spec.show === 'bar';
  let marks = '';
  const nb = ser.length, bw = Math.max(1, Math.min(22, (band * 0.8) / nb));
  ser.forEach((x, si) => {
    const y = yOf(x.unit);
    if (bars) {
      x.v.forEach((v, i) => {
        if (v == null) return;
        const x0 = L + band * i + (band - bw * nb) / 2 + bw * si, y0 = y(v), h = Math.max(0, H - B - y0);
        if (h > 0.4) marks += `<rect class="cb-bar" x="${x0.toFixed(1)}" y="${y0.toFixed(1)}" width="${Math.max(0.8, bw - (nb > 1 ? 1 : 0)).toFixed(1)}" height="${h.toFixed(1)}" rx="${Math.min(3, bw / 3).toFixed(1)}" fill="${x.color}"/>`;
      });
    } else {
      marks += `<path class="cb-line" d="${pathOf(x.v, (i) => L + band * (i + 0.5), y, card.spec.split === 'dow')}" stroke="${x.color}"/>`;
      if (n <= 40) x.v.forEach((v, i) => { if (v != null) marks += `<circle class="cb-pt" cx="${(L + band * (i + 0.5)).toFixed(1)}" cy="${y(v).toFixed(1)}" r="${n <= 14 ? 3 : 2}" fill="${x.color}"/>`; });
    }
    if (cmp && x.pv) marks += `<path class="cb-prev" d="${pathOf(x.pv, (i) => L + band * (i + 0.5), y)}" stroke="${x.color}"/>`;
  });
  const axisT = `<text class="cb-axis-t" x="4" y="${T - 10}">${esc(UNIT_NAME(axes[0]))}</text>${axes[1] ? `<text class="cb-axis-t" x="${w - 4}" y="${T - 10}" text-anchor="end">${esc(UNIT_NAME(axes[1]))}</text>` : ''}`;
  return `<div class="cb-plot" data-testid="cb-plot"><svg viewBox="0 0 ${w} ${H}" width="${w}" height="${H}" role="img" aria-label="${esc(card.title)} grafiği">${g}<line class="cb-base" x1="${L}" x2="${w - R}" y1="${H - B}" y2="${H - B}"/>${xl}${marks}${axisT}
      <line class="cb-cross" x1="0" x2="0" y1="${T}" y2="${H - B}" visibility="hidden"/>
      <rect class="cb-hit" x="${L}" y="${T}" width="${w - L - R}" height="${H - T - B}" data-n="${n}" data-l="${L}" data-band="${band}"/></svg>
      <div class="cb-tip" role="status" hidden></div></div>${legendHtml(ser, axes, cmp)}`;
}
function pathOf(vals, xOf, y, join = false) {
  let d = '', pen = false;
  vals.forEach((v, i) => { if (v == null) { if (!join) pen = false; return; } d += `${pen ? 'L' : 'M'}${xOf(i).toFixed(1)},${y(v).toFixed(1)}`; pen = true; });
  return d || 'M0,0';
}
/** one period by category (hour of day, session length, exit screen, level): grouped bars */
function distChart(card, A, ser) {
  const w = Math.max(300, Math.round(outEl(card.id)?.clientWidth || 600)), narrow = w < 520;
  const cats = ser[0].cats || [], m = ser[0].m, n = cats.length;
  const horiz = m === 'exit' || (narrow && n <= 12 && m !== 'hod');
  const cmp = !!A.compare && m !== 'lvl';
  if (horiz) {
    const max = Math.max(1e-9, ...ser.flatMap((x) => [...x.v, ...(cmp && x.pv ? x.pv : [])]).map(Number));
    return `<div class="cb-dist" data-testid="cb-plot">${cats.map((c, ci) => `<div class="cb-drow"><div class="cb-dname">${esc(catLabel(m, c))}</div>
        ${ser.map((x) => `<div class="cb-dbar" title="${esc(x.label)}"><span class="cb-dfill" style="width:${(60 * (Number(x.v[ci]) || 0)) / max}%;background:${x.color}"></span>
          <span class="cb-dval num">${ser.length > 1 ? `<span class="muted">${esc(card.spec.split && x.k !== "" ? keyName(card.spec.split, x.k) : x.d.label)}</span> ` : ""}${esc(fmtVal(x.unit, "sum", x.v[ci]))}${cmp && x.pv ? ` <span class="muted">· önce ${esc(fmtVal(x.unit, 'sum', x.pv[ci]))}</span>` : ''}</span></div>`).join('')}</div>`).join('')}</div>${legendHtml(ser, [ser[0].unit], false, true)}`;
  }
  const H = narrow ? 220 : 260, T = 12, B = 26, L = 44, R = 12, band = (w - L - R) / Math.max(n, 1);
  const top = niceTop(Math.max(0, ...ser.flatMap((x) => [...x.v, ...(cmp && x.pv ? x.pv : [])]).map(Number)));
  const y = (v) => T + (H - T - B) * (1 - Number(v) / top);
  let g = '';
  for (let k = 0; k <= 4; k++) { const yy = T + ((H - T - B) * k) / 4; g += `<line class="cb-grid" x1="${L}" x2="${w - R}" y1="${yy}" y2="${yy}"/><text class="cb-tick" x="${L - 6}" y="${yy + 4}" text-anchor="end">${esc(tickFmt('n', (top * (4 - k)) / 4))}</text>`; }
  const every = Math.max(1, Math.ceil(n / (narrow ? 6 : 12)));
  const xl = cats.map((c, i) => (i % every === 0 ? `<text class="cb-tick" x="${L + band * (i + 0.5)}" y="${H - 8}" text-anchor="middle">${esc(m === 'hod' ? String(c).padStart(2, '0') : m === 'lvl' ? c : catLabel(m, c))}</text>` : '')).join('');
  const nb = ser.length, bw = Math.max(1, Math.min(26, (band * 0.8) / nb));
  let marks = '';
  ser.forEach((x, si) => {
    x.v.forEach((v, i) => { const x0 = L + band * i + (band - bw * nb) / 2 + bw * si, y0 = y(v || 0), h = H - B - y0; if (h > 0.4) marks += `<rect class="cb-bar" x="${x0.toFixed(1)}" y="${y0.toFixed(1)}" width="${Math.max(0.8, bw - (nb > 1 ? 1 : 0)).toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${x.color}"/>`; });
    if (cmp && x.pv) marks += `<path class="cb-prev" d="${pathOf(x.pv, (i) => L + band * (i + 0.5), y)}" stroke="${x.color}"/>`;
  });
  return `<div class="cb-plot" data-testid="cb-plot"><svg viewBox="0 0 ${w} ${H}" width="${w}" height="${H}" role="img" aria-label="${esc(card.title)} grafiği">${g}<line class="cb-base" x1="${L}" x2="${w - R}" y1="${H - B}" y2="${H - B}"/>${xl}${marks}
      <line class="cb-cross" x1="0" x2="0" y1="${T}" y2="${H - B}" visibility="hidden"/>
      <rect class="cb-hit" x="${L}" y="${T}" width="${w - L - R}" height="${H - T - B}" data-n="${n}" data-l="${L}" data-band="${band}"/></svg>
      <div class="cb-tip" role="status" hidden></div></div>${legendHtml(ser, ['n'], cmp, true)}`;
}
/** the period's total per series (and the period before): horizontal bars, one block per number */
function totalsHtml(card, A, ser) {
  const by = new Map();
  for (const x of ser) { if (!by.has(x.m)) by.set(x.m, []); by.get(x.m).push(x); }
  return `<div class="cb-totals" data-testid="cb-totals">${[...by].map(([m, list]) => {
    const max = Math.max(1e-9, ...list.flatMap((x) => [Number(x.total) || 0, A.compare ? Number(x.prev_total) || 0 : 0]));
    return `<div class="cb-tblock"><div class="sub-h">${esc(metricOf(m).label)}</div>${list.map((x) => `<div class="cb-drow" data-sid="${esc(x.id)}"><div class="cb-dname">${esc(card.spec.split && x.k !== '' ? keyName(card.spec.split, x.k) : x.d.label)}</div>
      <div class="cb-dbar"><span class="cb-dfill" style="width:${(60 * (Number(x.total) || 0)) / max}%;background:${x.color}"></span><span class="cb-dval num"><b>${esc(fmtVal(x.unit, x.agg, x.total))}</b>${A.compare ? ` <span class="muted">· önce ${esc(fmtVal(x.unit, x.agg, x.prev_total))}</span> ${deltaHtml(x)}` : ''}</span></div></div>`).join('')}</div>`;
  }).join('')}</div><p class="small muted">${A.metrics && ser.some((x) => x.agg === 'perday') ? 'Aktif oyuncu: dönemde günlük ortalama. ' : ''}Toplam görünümü: seçili dönemin tamamı.</p>`;
}
function deltaHtml(x) {
  const c = Number(x.total), p = Number(x.prev_total);
  if (x.total == null || x.prev_total == null) return '';
  if (x.unit === 'pct') { const d = Math.round(1000 * (c - p)) / 10; return d ? `<span class="delta ${d > 0 ? 'up' : 'down'}">${d > 0 ? '▲' : '▼'} ${Math.abs(d).toLocaleString('tr-TR')} puan</span>` : '<span class="delta flat">= aynı</span>'; }
  if (!p) return c ? '<span class="delta up">▲ yeni</span>' : '';
  const d = Math.round((100 * (c - p)) / p);
  return d ? `<span class="delta ${d > 0 ? 'up' : 'down'}">${d > 0 ? '▲' : '▼'} %${Math.abs(d)}</span>` : '<span class="delta flat">= aynı</span>';
}
const round = (v) => (v == null ? '' : Math.round(Number(v) * 10000) / 10000);
function tableHtml(card, A, ser, dist) {
  const s = card.spec, cmp = !!A.compare && !(dist && ser[0]?.m === 'lvl');
  let head, rows, cells;
  if (dist) {
    const m = ser[0].m, cats = ser[0].cats || [];
    head = [m === 'hod' ? 'Saat' : m === 'lenb' ? 'Uzunluk' : m === 'exit' ? 'Ekran' : 'Seviye', ...ser.flatMap((x) => [x.label, ...(cmp ? [`${x.label} (önceki)`] : [])])];
    rows = cats.map((c, i) => [catLabel(m, c), ...ser.flatMap((x) => [round(x.v[i]), ...(cmp ? [x.pv ? round(x.pv[i]) : ''] : [])])]);
    cells = cats.map((c, i) => [catLabel(m, c), ...ser.flatMap((x) => [fmtVal(x.unit, 'sum', x.v[i]), ...(cmp ? [x.pv ? fmtVal(x.unit, 'sum', x.pv[i]) : '—'] : [])])]);
    rows.push(['Toplam', ...ser.flatMap((x) => [round(x.total), ...(cmp ? [round(x.prev_total)] : [])])]);
    cells.push(['Toplam', ...ser.flatMap((x) => [fmtVal(x.unit, 'sum', x.total), ...(cmp ? [fmtVal(x.unit, 'sum', x.prev_total)] : [])])]);
  } else {
    head = [A.gran === 'hour' ? 'Saat' : 'Dönem', ...ser.flatMap((x) => [x.label, ...(cmp ? [`${x.label} (önceki)`] : [])])];
    rows = A.buckets.map((b, i) => [A.gran === 'hour' ? `${b.t}:00` : b.t, ...ser.flatMap((x) => [round(x.v[i]), ...(cmp ? [x.pv ? round(x.pv[i]) : ''] : [])])]);
    cells = A.buckets.map((b, i) => [bucketLabel(b.t, A.gran), ...ser.flatMap((x) => [fmtVal(x.unit, x.agg, x.v[i]), ...(cmp ? [x.pv ? fmtVal(x.unit, x.agg, x.pv[i]) : '—'] : [])])]);
    rows.push(['Toplam', ...ser.flatMap((x) => [round(x.total), ...(cmp ? [round(x.prev_total)] : [])])]);
    cells.push([s.metrics.some((m) => ['dau', 'retp'].includes(m)) ? 'Dönem (oyuncu: günlük ort.)' : 'Dönem', ...ser.flatMap((x) => [fmtVal(x.unit, x.agg, x.total), ...(cmp ? [fmtVal(x.unit, x.agg, x.prev_total)] : [])])]);
  }
  const [from, to] = cardRange(s);
  TABLES.set(card.id, { name: `${ST.game || 'tum-oyunlar'}-${(card.title || 'grafik').toLocaleLowerCase('tr').replace(/[^a-z0-9ğüşıöç]+/g, '-').replace(/^-|-$/g, '')}-${from}_${to}`, head, rows });
  return `<div class="scroll-x"><table class="an-t cb-t" data-testid="cb-tablebody"><thead><tr>${head.map((h, i) => `<th${i ? ' class="n"' : ''}>${esc(h)}</th>`).join('')}</tr></thead>
    <tbody>${cells.map((r, ri) => `<tr${ri === cells.length - 1 ? ' class="cb-sum"' : ''}>${r.map((c, i) => `<td${i ? ' class="n"' : ''}>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function downloadCsv(id) {
  const t = TABLES.get(id);
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

// ------------------------------------------------------------------ the crosshair: pointer or finger over the chart
function wirePlot(card, A, ser, dist) {
  const plot = ST.el.querySelector(`[data-card="${CSS.escape(String(card.id))}"] .cb-plot`);
  if (!plot) return;
  const svg = plot.querySelector('svg'), hit = plot.querySelector('.cb-hit'), tip = plot.querySelector('.cb-tip'), cross = plot.querySelector('.cb-cross');
  if (!svg || !hit) return;
  const n = +hit.dataset.n, L = +hit.dataset.l, band = +hit.dataset.band;
  const cmp = !!A.compare && !(dist && ser[0].m === 'lvl');
  const show = (clientX) => {
    const r = svg.getBoundingClientRect(), scale = r.width / svg.viewBox.baseVal.width;
    const x = (clientX - r.left) / scale, i = Math.max(0, Math.min(n - 1, Math.floor((x - L) / band)));
    const cx = L + band * (i + 0.5);
    cross.setAttribute('x1', cx); cross.setAttribute('x2', cx); cross.setAttribute('visibility', 'visible');
    const title = dist ? catLabel(ser[0].m, ser[0].cats[i]) : bucketLabel(A.buckets[i].t, A.gran);
    const prevT = !dist && cmp && A.prev_buckets?.[i] ? ` · önceki: ${bucketLabel(A.prev_buckets[i].t, A.gran)}` : '';
    tip.innerHTML = `<div class="cb-tip-h">${esc(title)}<span class="muted">${esc(prevT)}</span></div>${ser.map((s) => `<div class="cb-tip-r"><span class="cb-sw" style="background:${s.color}"></span><span class="cb-ll">${esc(s.label)}</span>
      <b class="num">${esc(fmtVal(s.unit, dist ? 'sum' : s.agg, s.v[i]))}</b>${cmp && s.pv ? `<span class="muted num">önce ${esc(fmtVal(s.unit, dist ? 'sum' : s.agg, s.pv[i]))}</span>` : ''}</div>`).join('')}`;
    tip.hidden = false;
    const pr = plot.getBoundingClientRect(), tw = tip.offsetWidth, px = cx * scale;
    tip.style.left = `${Math.max(0, Math.min(pr.width - tw, px + 12 > pr.width - tw ? px - tw - 12 : px + 12))}px`;
    tip.style.top = '6px';
    plot.dataset.i = String(i);
  };
  const hide = () => { tip.hidden = true; cross.setAttribute('visibility', 'hidden'); delete plot.dataset.i; };
  hit.addEventListener('pointermove', (e) => show(e.clientX));
  hit.addEventListener('pointerdown', (e) => show(e.clientX));
  hit.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') hide(); });
  plot.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const i = Math.max(0, Math.min(n - 1, (plot.dataset.i ? +plot.dataset.i : -1) + (e.key === 'ArrowRight' ? 1 : -1)));
    const r = svg.getBoundingClientRect(), scale = r.width / svg.viewBox.baseVal.width;
    show(r.left + (L + band * (i + 0.5)) * scale);
  });
  plot.tabIndex = 0;
}

// ------------------------------------------------------------------ changes
function changed(card, { refetch = true, rerender = true } = {}) {
  if (rerender) renderCard(card);
  saveSoon(card);
  if (refetch) fetchCard(card);
}
function toggleMetric(card, id) {
  const s = card.spec, u = ui(card.id), d = metricOf(id);
  u.note = '';
  if (s.metrics.includes(id)) { s.metrics = s.metrics.filter((m) => m !== id); return changed(card); }
  const cur = s.metrics.map(metricOf);
  if (d.kind === 'dist' && cur.length) {
    u.note = `"${esc(d.label)}" bir dönemin dağılımıdır, tek başına gösterilir: grafikteki diğer sayılar çıkarıldı.`;
    s.metrics = [id];
    return changed(card);
  }
  if (d.kind !== 'dist' && cur.some((x) => x.kind === 'dist')) {
    u.note = `Dağılım (${esc(cur.filter((x) => x.kind === 'dist').map((x) => x.label).join(', '))}) zaman grafiğiyle birlikte olmaz: çıkarıldı.`;
    s.metrics = s.metrics.filter((m) => metricOf(m).kind !== 'dist');
  }
  const units = [...new Set(s.metrics.map((m) => metricOf(m).unit))];
  if (!units.includes(d.unit) && units.length >= 2) {
    u.note = `Bu grafikte zaten iki ölçü var (${esc(units.map(UNIT_NAME).join(', '))}); "${esc(d.label)}" (${esc(UNIT_NAME(d.unit))}) üçüncü ölçü olur. Birini çıkar ya da <button type="button" class="linkish" data-act="cb-newwith" data-m="${esc(id)}">bunu yeni grafikte aç</button>.`;
    return renderCard(card);
  }
  if (s.metrics.length >= 8) { u.note = 'Bir grafikte en çok 8 sayı olur. Birini çıkar ya da yeni grafik aç.'; return renderCard(card); }
  s.metrics = [...s.metrics, id];
  changed(card);
}
async function newCard(spec, title = 'Yeni grafik', after = null) {
  try {
    const r = await C.rpc('st_chart_save', { p_scope: ST.scope, p_id: null, p_title: title, p_spec: spec });
    const c = { ...r, spec: norm(r.spec) };
    if (after) { const i = ST.cards.indexOf(after); ST.cards.splice(i + 1, 0, c); } else ST.cards.push(c);
    ui(c.id).pick = !c.spec.metrics.length;
    paint();
    ST.cards.forEach((x) => (x === c ? fetchCard(x) : drawOut(x)));
    if (after) orderNow();
    slotEl(c.id)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    return c;
  } catch (e) {
    alert(e && /st:too_many/.test(e.message || '') ? 'Bu sayfada en çok 30 grafik olabilir.' : C.friendly(e));
    return null;
  }
}

document.addEventListener('click', (ev) => {
  const b = ev.target.closest('[data-act^="cb-"]');
  if (!b || !ST.el || !ST.el.isConnected) return;
  const a = b.dataset.act;
  // the new-card button sits in the statistics area's sticky bar (analytics.js), the rest inside the cards
  if (a === 'cb-new') { if (b.closest('.an')?.contains(ST.el)) newCard(DEF()); return; }
  if (!ST.el.contains(b)) return;
  const cardEl = b.closest('[data-card]'), card = cardEl && cardOf(cardEl.dataset.card);
  if (!card) return;
  const s = card.spec, u = ui(card.id);
  if (a === 'cb-metric') toggleMetric(card, b.dataset.m);
  else if (a === 'cb-pick') { u.pick = !u.pick; if (u.pick) u.filt = false; renderCard(card); if (u.pick && window.matchMedia('(hover: hover)').matches) slotEl(card.id)?.querySelector('.cb-q')?.focus({ preventScroll: true }); }
  else if (a === 'cb-filt') { u.filt = !u.filt; if (u.filt) u.pick = false; renderCard(card); }
  else if (a === 'cb-fval') {
    const d = b.dataset.d, k = b.dataset.k, cur = s.filters[d] || [];
    if (!cur.includes(k) && cur.length >= 20) { u.note = 'Bir özellikte en çok 20 değer seçilebilir.'; renderCard(card); return; }
    s.filters = { ...s.filters, [d]: cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k] };
    if (!s.filters[d].length) delete s.filters[d];
    u.note = '';
    changed(card);
  }
  else if (a === 'cb-split') {
    s.split = b.dataset.d || '';
    if (s.split === 'dow') {
      const [f, e] = cardRange(s);
      if (cardGrans(f, e).includes('week') && s.show !== 'total') { s.gran = 'week'; u.note = 'Haftanın her günü ayrı çizgi: aralık "Hafta" yapıldı (her nokta o haftanın o günü). Günlerin dönem ortalaması için "Toplam".'; }
      else { s.show = 'total'; u.note = 'Haftanın her günü: "Toplam" görünümünde her günün dönem ortalaması.'; }
    }
    changed(card);
  }
  else if (a === 'cb-dowset') {
    const set = b.dataset.set ? b.dataset.set.split(',') : [];
    s.filters = { ...s.filters, dow: dowKey(s) === b.dataset.set ? [] : set };
    if (!s.filters.dow.length) delete s.filters.dow;
    u.note = '';
    changed(card);
  }
  else if (a === 'cb-gran') { s.gran = b.dataset.g; changed(card); }
  else if (a === 'cb-show') { s.show = b.dataset.show; s.table = false; u.note = ''; changed(card, { refetch: false }); }
  else if (a === 'cb-table') { s.table = !s.table; changed(card, { refetch: false }); }
  else if (a === 'cb-csv') { const A = ST.data.get(card.id)?.data; if (A) { tableHtml(card, A, seriesOf(card, A), seriesOf(card, A)[0]?.kind === 'dist'); downloadCsv(card.id); } }
  else if (a === 'cb-rename') { u.rename = true; renderCard(card); }
  else if (a === 'cb-rename-x') { u.rename = false; renderCard(card); C.formDone?.(); }
  else if (a === 'cb-dup') newCard(structuredClone(s), `${card.title} (kopya)`.slice(0, 60), card);
  else if (a === 'cb-up' || a === 'cb-down') {
    const i = ST.cards.indexOf(card), j = i + (a === 'cb-up' ? -1 : 1);
    if (j < 0 || j >= ST.cards.length) return;
    [ST.cards[i], ST.cards[j]] = [ST.cards[j], ST.cards[i]];
    paint();
    ST.cards.forEach((c) => drawOut(c));
    orderNow();
    slotEl(card.id)?.scrollIntoView({ block: 'nearest' });
  }
  else if (a === 'cb-del') {
    if (!confirm(`"${card.title}" grafiği silinsin mi? Bu geri alınamaz.`)) return;
    b.disabled = true;
    C.rpc('st_chart_delete', { p_id: card.id }).then(() => {
      clearTimeout(ST.save.get(card.id));
      ST.cards = ST.cards.filter((c) => c !== card);
      ST.data.delete(card.id);
      paint();
      ST.cards.forEach((c) => drawOut(c));
    }).catch((e) => { b.disabled = false; alert(C.friendly(e)); });
  }
  else if (a === 'cb-newwith') { u.note = ''; renderCard(card); newCard({ ...DEF(), period: s.period, from: s.from, to: s.to, gran: s.gran, metrics: [b.dataset.m] }, metricOf(b.dataset.m).label); }
});
document.addEventListener('change', (ev) => {
  const t = ev.target, cardEl = t.closest?.('[data-card]');
  if (!cardEl || !ST.el || !ST.el.contains(t)) return;
  const card = cardOf(cardEl.dataset.card);
  if (!card) return;
  const s = card.spec;
  if (t.matches('.cb-period')) {
    if (t.value === 'c') { const [f, e] = cardRange(s); s.from = f; s.to = e; }
    if (t.value === 'd') { const [, e] = cardRange(s); s.from = e; s.to = e; }
    s.period = t.value; s.gran = '';
    changed(card);
  } else if (t.matches('.cb-day')) {
    if (isDay(t.value)) { s.from = t.value; s.to = t.value; s.gran = ''; changed(card); }
  } else if (t.matches('.cb-from, .cb-to')) {
    const f = cardEl.querySelector('.cb-from').value, e = cardEl.querySelector('.cb-to').value;
    if (isDay(f) && isDay(e)) { s.from = f <= e ? f : e; s.to = f <= e ? e : f; s.gran = ''; changed(card); }
  } else if (t.matches('.cb-compare')) { s.compare = t.checked; changed(card); }
});
document.addEventListener('input', (ev) => {
  const t = ev.target;
  if (!t.matches?.('.cb-q') || !ST.el || !ST.el.contains(t)) return;
  const card = cardOf(t.closest('[data-card]').dataset.card);
  if (!card) return;
  ui(card.id).q = t.value;
  const box = t.closest('.cb-picker'), tmp = document.createElement('div');
  tmp.innerHTML = pickerHtml(card, catalog());
  box.querySelectorAll('.cb-group, p').forEach((x) => x.remove());
  [...tmp.firstElementChild.children].slice(1).forEach((x) => box.appendChild(x));
});
document.addEventListener('submit', (ev) => {
  const f = ev.target;
  if (!f.matches?.('.cb-rename') || !ST.el || !ST.el.contains(f)) return;
  ev.preventDefault();
  const card = cardOf(f.dataset.cardForm);
  const v = f.querySelector('.cb-title-in').value.trim().slice(0, 60);
  if (!card || !v) return;
  card.title = v;
  ui(card.id).rename = false;
  renderCard(card);
  saveNow(card);
  C.formDone?.();
});
// the chart follows the card's width (phone turned, window resized)
let rsz = 0;
window.addEventListener('resize', () => { clearTimeout(rsz); rsz = setTimeout(() => { if (ST.el && ST.el.isConnected) ST.cards.forEach((c) => drawOut(c)); }, 150); });
