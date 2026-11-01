// Studio panel — the play report of a game's own portals, inside Platformlar → CrazyGames (and → Kendi site) on its game
// page (docs/STUDYO-PANELI.md "CrazyGames karnesi ve oyun ölçümleri"). No new tab or page: five cards under the
// platform's numbers. Server: supabase/studio/stats13.sql st_play_report; the games send the numbers from Shadow Duel
// 1.4.1 and Katana Flash 1.0.2 on (packages/analytics play() / measure(), the ad_* events, the 'rotate' screen).
//   CrazyGames karnesi         CrazyGames' three Basic Launch numbers the way CrazyGames counts them, with an estimated
//                              1–5 score each (CG_SCORE below) — computer, phone + tablet; per version and per day
//   Reklamlar                  per session: interstitials, rewarded offers / presses / watched, failures, ad blockers
//   Telefonu yan çevirmeyenler phones and tablets that met the turn-your-phone screen: turned, left upright, how long
//   Yükleme ve hatalar         time to the first frame and to the first gameplayStart (median, slowest 10 %), errors
//   İlk gün yolculuğu          new players' first-day steps per version, then the next-day return

let C = null; // what analytics.js lends: rpc, esc, formatters, info, csvButton, fileName, barList
export function init(ctx) { C = ctx; }

// ------------------------------------------------------------------ CrazyGames' score thresholds (update here)
/**
 * What we know of CrazyGames' 1–5 scores. Their Basic Launch card shows, under each number, the NEXT score's threshold
 * ("score 4 at 8m57s") and the current score; that is all they publish. Add each new threshold you see there:
 *   at:   { score: threshold }  (playtime in seconds, the others as fractions: 3.92 % = 0.0392)
 *   seen: [[value, score]]      a number on the card and the score it had (it bounds the scores in between)
 * Last read from Shadow Duel's card (29 Sep – 2 Oct 2026). Mobile = phone and tablet together.
 */
export const CG_SCORE = {
  asOf: '2026-10-02',
  source: 'Shadow Duel\'in CrazyGames kartı, 29 Eyl – 2 Eki',
  desktop: {
    playtime: { at: { 4: 537 }, seen: [[431, 3]] },
    d1: { at: { 3: 0.0392 }, seen: [[0.0221, 2]] },
    conv: { at: { 5: 0.7313 }, seen: [[0.7097, 4]] },
  },
  mobile: {
    playtime: { at: { 4: 456 }, seen: [[361, 3]] },
    d1: { at: { 3: 0.04 }, seen: [[0.0311, 2]] },
    conv: { at: { 4: 0.4574 }, seen: [[0.413, 3]] },
  },
  /** CrazyGames' own numbers on that card, per game, to set ours beside them */
  reported: {
    'shadow-duel': { period: '29 Eyl – 2 Eki', desktop: { playtime: 431, d1: 0.0221, conv: 0.7097, total: 9 }, mobile: { playtime: 361, d1: 0.0311, conv: 0.413, total: 8 } },
  },
  rule: 'Telefon için en az 9 puan gerekir; 9–10 puan alan oyun elle incelemeye gider.',
};

/** First-day steps per game: [event, label] in the order a new player meets them (the events the games already send). */
export const JOURNEY = {
  'shadow-duel': [['first_fight_start', 'İlk dövüşe başladı'], ['tutorial_done', 'Öğreticiyi bitirdi'], ['first_fight_done', 'İlk dövüşü bitirdi'], ['second_fight', 'İkinci dövüşe başladı']],
  'katana-flash': [['first_dash', 'İlk atılış'], ['stage1', '1. bölümü geçti'], ['stage3', '3. bölümü geçti'], ['stage5', '5. bölümü geçti']],
};

/** Steps a game began to send in a later version (older versions show "—" there, not 0). */
export const STEP_SINCE = { 'shadow-duel': { second_fight: '1.4.1' } };

export const GROUPS = [['desktop', 'Bilgisayar'], ['mobile', 'Telefon ve tablet']];
export const groupOf = (dev) => (dev === 'desktop' ? 'desktop' : dev === 'phone' || dev === 'tablet' ? 'mobile' : null);

// ------------------------------------------------------------------ numbers (pure: panel-check tests them)
/**
 * The score a value would get, as a range, from what CG_SCORE knows: { lo, hi, next: { score, at } | null }. lo = hi
 * when the known thresholds pin it down. null for no value.
 */
export function scoreRange(v, cfg) {
  if (v == null || !cfg) return null;
  let lo = 1, hi = 5;
  for (const [s, t] of Object.entries(cfg.at || {})) {
    if (v >= t) lo = Math.max(lo, +s);
    else hi = Math.min(hi, +s - 1);
  }
  for (const [ov, s] of cfg.seen || []) {
    if (v >= ov) lo = Math.max(lo, s);
    else hi = Math.min(hi, s);
  }
  if (hi < lo) hi = lo;
  const up = Object.entries(cfg.at || {}).map(([s, t]) => ({ score: +s, at: t })).filter((x) => x.at > v).sort((a, b) => a.at - b.at);
  return { lo, hi, next: up[0] || null };
}
export const scoreText = (r) => (!r ? '—' : r.lo === r.hi ? String(r.lo) : `${r.lo}–${r.hi}`);

/** Sum the day rows that pass `keep` into one record (every count field added). */
const FIELDS = ['sessions', 'cg_n', 'cg_s', 'cg_conv', 'ad_n', 'ad_inter', 'ad_inter_fail', 'ad_rew_offer', 'ad_rew_click', 'ad_rew_done', 'ad_rew_fail', 'ad_blocked',
  'rot_n', 'rot_s', 'rot_turned', 'rot_left', 'err_n', 'installs'];
export function sumRows(rows, keep = () => true) {
  const o = Object.fromEntries(FIELDS.map((f) => [f, 0]));
  o.d1 = 0; o.d1_base = 0;
  for (const r of rows) {
    if (!keep(r)) continue;
    for (const f of FIELDS) o[f] += Number(r[f]) || 0;
    if (r.d1 != null) { o.d1 += Number(r.d1) || 0; o.d1_base += Number(r.installs) || 0; }
  }
  return o;
}
/** CrazyGames' three numbers from a summed record: average CG play per session, share with a minute, next-day return. */
export function cgNumbers(o) {
  return {
    playtime: o.cg_n ? o.cg_s / o.cg_n : null,
    conv: o.cg_n ? o.cg_conv / o.cg_n : null,
    d1: o.d1_base ? o.d1 / o.d1_base : null,
    sessions: o.cg_n, installs: o.d1_base,
  };
}
/** The three scores and their total range for one device group. */
export function cgCard(o, group) {
  const n = cgNumbers(o), S = CG_SCORE[group];
  const sc = { playtime: scoreRange(n.playtime, S.playtime), d1: scoreRange(n.d1, S.d1), conv: scoreRange(n.conv, S.conv) };
  const all = Object.values(sc);
  const total = all.every(Boolean) ? { lo: all.reduce((a, r) => a + r.lo, 0), hi: all.reduce((a, r) => a + r.hi, 0) } : null;
  return { n, sc, total };
}

/**
 * A quantile from bucket counts {b: n} with the bucket edges (bucket b = [edges[b-1], edges[b]); 0 from 0; the last from
 * the last edge, taken up to 1.5× it), spread evenly inside the bucket. null when empty. over: the value is in the last
 * (open) bucket.
 */
export function histQuantile(counts, edges, q) {
  const n = Object.values(counts || {}).reduce((a, b) => a + (Number(b) || 0), 0);
  if (!n) return null;
  const want = q * n;
  let cum = 0;
  for (let b = 0; b <= edges.length; b++) {
    const c = Number(counts[b]) || 0;
    if (c && cum + c >= want) {
      const lo = b === 0 ? 0 : edges[b - 1], hi = b < edges.length ? edges[b] : edges[edges.length - 1] * 1.5;
      return { v: lo + ((hi - lo) * (want - cum)) / c, over: b === edges.length };
    }
    cum += c;
  }
  return { v: edges[edges.length - 1] * 1.5, over: true };
}
/** Bucket counts of one kind for the rows that pass `keep`. */
export function histOf(hist, kind, keep = () => true) {
  const out = {};
  for (const h of hist || []) if (h.kind === kind && keep(h)) out[h.b] = (out[h.b] || 0) + (Number(h.n) || 0);
  return out;
}
/** Versions newest first (numeric parts). */
export const byVersion = (a, b) => {
  const pa = String(a).split('.').map((x) => parseInt(x, 10) || 0), pb = String(b).split('.').map((x) => parseInt(x, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) if ((pb[i] || 0) !== (pa[i] || 0)) return (pb[i] || 0) - (pa[i] || 0);
  return 0;
};

// ------------------------------------------------------------------ loading (the node lives on between repaints)
const P = { node: null, key: '', data: null, err: null, at: 0, seq: 0, busy: false, args: null };
/** host: a placeholder element; o: { game, from, to, portal }. */
export function mount(host, o) {
  if (!host) return;
  if (!P.node) {
    P.node = document.createElement('div');
    P.node.dataset.testid = 'play';
    P.node.style.marginTop = '12px';
  }
  host.replaceWith(P.node);
  // the server keeps a report to 92 days: a longer period shows its last 93 days
  let from = o.from;
  const days = Math.round((Date.parse(o.to + 'T12:00:00Z') - Date.parse(from + 'T12:00:00Z')) / 864e5);
  if (days > 92) from = new Date(Date.parse(o.to + 'T12:00:00Z') - 92 * 864e5).toISOString().slice(0, 10);
  const args = { game: o.game, from, to: o.to, portal: o.portal, cut: from !== o.from };
  const key = JSON.stringify(args);
  if (key !== P.key) { P.seq++; Object.assign(P, { key, args, data: null, err: null, at: 0, busy: false }); }
  paint();
  if (!P.busy && Date.now() - P.at > 12000) load();
}
async function load() {
  const my = ++P.seq, a = P.args;
  P.busy = true;
  if (P.data) P.node?.classList.add('stale');
  try {
    const d = await C.rpc('st_play_report', { p_game: a.game, p_from: a.from, p_to: a.to, p_portal: a.portal, p_steps: (JOURNEY[a.game] || []).map((s) => s[0]) });
    if (my !== P.seq) return;
    Object.assign(P, { data: d, err: null, at: Date.now() });
  } catch (e) {
    if (my !== P.seq) return;
    Object.assign(P, { err: e, at: Date.now() });
  } finally { if (my === P.seq) P.busy = false; }
  P.node?.classList.remove('stale');
  paint();
}

// ------------------------------------------------------------------ painting
const pct = (v, d = 0) => (v == null ? '—' : `%${(100 * v).toLocaleString('tr-TR', { minimumFractionDigits: d, maximumFractionDigits: d })}`);
const per = (a, b, d = 1) => (b ? (a / b).toLocaleString('tr-TR', { minimumFractionDigits: d, maximumFractionDigits: d }) : '—');
const secs = (ms) => `${(ms / 1000).toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} sn`;
const dur = (s) => (s == null ? '—' : C.fmtDur(s));
const metricText = (k, v) => (v == null ? '—' : k === 'playtime' ? dur(v) : pct(v, 1));
const METRICS = [['playtime', 'Ortalama oyun süresi', 'Oturum başına, yalnız oyunun CrazyGames\'e "oynuyor" dediği (gameplayStart ile gameplayStop arası) ve ekranın açık olduğu saniyeler.'],
  ['conv', '1 dakikadan çok oynayan', 'Oyunu açan oturumların kaçında oyun süresi en az 1 dakikaya ulaştı (CrazyGames\'in "gameplay conversion" sayısı).'],
  ['d1', 'Ertesi gün dönüş (D1)', 'Oyunu ilk kez açan oyunculardan ertesi takvim gününde yeniden gelenler (gün Türkiye saatiyle). Bütün sürümlerden; son gün henüz bitmediği için sayılmaz.']];
const devName = (d) => C.DEVICE[d] || d;

function paint() {
  const el = P.node;
  if (!el || !el.isConnected) return;
  const esc = C.esc, A = P.data;
  if (!A && !P.err) { el.innerHTML = '<article class="card"><h3>CrazyGames karnesi</h3><p class="muted small">Sayılar geliyor…</p></article>'; return; }
  if (P.err) {
    el.innerHTML = `<article class="card" data-block="pr-missing"><h3>CrazyGames karnesi ve oyun ölçümleri</h3><div class="warn-box" data-testid="pr-missing">${P.err.missing
      ? 'Bu kartların sunucu kurulumu henüz yapılmadı (supabase/studio/stats13.sql). Kurulunca burada CrazyGames karnesi, reklamlar, telefonu çevirmeyenler, yükleme süresi ve ilk gün yolculuğu görünür.'
      : esc(C.friendly(P.err))}</div></article>`;
    return;
  }
  const notes = [];
  if (P.args.cut) notes.push(`<p class="note small">Bu kartlar en çok 93 gün gösterir: ${esc(C.dayLabel(P.args.from))}'den beri.</p>`);
  const cg = P.args.portal === 'crazygames';
  el.innerHTML = notes.join('') + (cg ? cardScore(A) : '') + `<div style="margin-top:12px">${cardAds(A)}</div><div style="margin-top:12px">${cardRotate(A)}</div>`
    + `<div style="margin-top:12px">${cardLoad(A)}</div>` + (JOURNEY[A.game] ? `<div style="margin-top:12px">${cardJourney(A)}</div>` : '');
}

/** "az veri" when a number rests on few sessions / players */
const thin = (n, min = 30) => (n > 0 && n < min ? ' <span class="badge" title="Az veri: sayı çok oynar">az veri</span>' : '');

function cardScore(A) {
  const esc = C.esc, rows = A.days || [];
  const rep = CG_SCORE.reported[A.game];
  const help = 'CrazyGames oyunu üç sayıyla puanlar (her biri 1–5, toplam 15 üzerinden): ortalama oyun süresi, 1 dakikadan çok oynayanların oranı, ertesi gün dönüş. '
    + 'Buradaki sayılar bizim ölçümümüz, CrazyGames\'in saydığı gibi sayıldı; puan bir TAHMİN: CrazyGames eşiklerin yalnız bir kısmını gösteriyor. '
    + 'Eşikler studio/panel/play-report.js\'nin başındaki CG_SCORE\'da; CrazyGames panelinde yeni bir "score N at X" görünce oraya eklenir.';
  const box = ([g, label]) => {
    const o = sumRows(rows, (r) => groupOf(r.device) === g);
    const K = cgCard(o, g), R = rep && rep[g];
    const line = ([k, name, h]) => {
      const r = K.sc[k], v = K.n[k];
      const next = !r ? '' : r.next ? `${r.next.score} puan için: <b>${esc(metricText(k, r.next.at))}</b>` : r.lo >= 5 ? 'en yüksek puan' : 'sonraki eşik bilinmiyor';
      return `<li class="pr-m" data-m="${k}"><div class="pr-m-h"><span>${esc(name)} ${C.info(h)}</span><span class="pr-score${r && r.lo === r.hi ? ` s${r.lo}` : ''}" title="tahmini puan">${esc(scoreText(r))}</span></div>
        <div class="pr-m-v"><b class="num" data-v>${esc(metricText(k, v))}</b>${k === 'd1' ? thin(K.n.installs) : thin(K.n.sessions)}${R ? ` <span class="small muted">CrazyGames'te ${esc(metricText(k, R[k]))}</span>` : ''}</div>
        ${next ? `<div class="small muted">${next}</div>` : ''}</li>`;
    };
    const tot = K.total ? (K.total.lo === K.total.hi ? String(K.total.lo) : `${K.total.lo}–${K.total.hi}`) : '—';
    return `<div class="pr-box" data-group="${g}"><div class="pr-box-h"><b>${esc(label)}</b><span class="pr-total" data-testid="pr-total-${g}">≈ <b class="num">${esc(tot)}</b> / 15</span></div>
      <p class="small muted">${C.fmtN(K.n.sessions)} oturum · ${C.fmtN(K.n.installs)} yeni oyuncu (dönüş için)</p>
      <ul class="pr-ms" data-testid="pr-score-${g}">${METRICS.map(line).join('')}</ul>
      ${R ? `<p class="small muted">CrazyGames'in verdiği toplam (${esc(rep.period)}): <b>${R.total} / 15</b></p>` : ''}</div>`;
  };
  // per version and per day, each device group
  const vers = [...new Set(rows.map((r) => r.ver))].sort(byVersion);
  const vRows = [];
  for (const v of vers) for (const [g, label] of GROUPS) {
    const o = sumRows(rows, (r) => r.ver === v && groupOf(r.device) === g);
    if (!o.sessions && !o.installs) continue;
    const K = cgCard(o, g);
    vRows.push({ v, g, label, K });
  }
  const days = [...new Set(rows.map((r) => r.day))].sort().reverse();
  const dRows = [];
  for (const d of days) for (const [g, label] of GROUPS) {
    const o = sumRows(rows, (r) => r.day === d && groupOf(r.device) === g);
    if (!o.cg_n && !o.installs) continue;
    dRows.push({ d, g, label, K: cgCard(o, g) });
  }
  const tr = (first, x) => `<td>${esc(x.label)}</td><td class="n num">${x.K.n.sessions ? C.fmtN(x.K.n.sessions) : '—'}</td><td class="n num">${esc(metricText('playtime', x.K.n.playtime))}</td>
    <td class="n num">${esc(metricText('conv', x.K.n.conv))}</td><td class="n num">${esc(metricText('d1', x.K.n.d1))}${x.K.n.installs ? ` <span class="muted">(${C.fmtN(x.K.n.installs)})</span>` : ''}</td>`;
  const csvV = C.csvButton('pr-ver', C.fileName('cg-karne-surum'), ['Sürüm', 'Cihaz', 'Oturum', 'Ortalama oyun süresi (sn)', '1 dk+ (%)', 'Ertesi gün dönüş (%)', 'Yeni oyuncu', 'Tahmini puan'],
    vRows.map((x) => [x.v, x.label, x.K.n.sessions, x.K.n.playtime == null ? '' : Math.round(x.K.n.playtime), x.K.n.conv == null ? '' : Math.round(1000 * x.K.n.conv) / 10,
      x.K.n.d1 == null ? '' : Math.round(1000 * x.K.n.d1) / 10, x.K.n.installs, x.K.total ? `${x.K.total.lo}-${x.K.total.hi}` : '']));
  const vTable = vRows.length ? `<div class="scroll-x"><table class="an-t" data-testid="pr-ver"><thead><tr><th>Sürüm</th><th>Cihaz</th><th class="n">Oturum</th><th class="n">Ort. oyun süresi</th><th class="n">1 dk+</th><th class="n">Ertesi gün (yeni)</th><th class="n">Puan ≈</th></tr></thead><tbody>
    ${vRows.map((x) => `<tr data-ver="${esc(x.v)}" data-group="${x.g}"><td><b>${esc(x.v)}</b>${x.K.n.sessions ? '' : ' <span class="badge off" title="Bu sürüm oyun süresini göndermiyor (1.4.1 / 1.0.2 öncesi)">süre yok</span>'}</td>${tr(0, x)}
      <td class="n num">${x.K.total ? esc(x.K.total.lo === x.K.total.hi ? String(x.K.total.lo) : `${x.K.total.lo}–${x.K.total.hi}`) : '—'}</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted small">Bu dönemde veri yok.</p>';
  const dTable = dRows.length ? `<details class="table"><summary>Gün gün</summary><div class="scroll-x"><table class="an-t" data-testid="pr-days"><thead><tr><th>Gün</th><th>Cihaz</th><th class="n">Oturum</th><th class="n">Ort. oyun süresi</th><th class="n">1 dk+</th><th class="n">Ertesi gün (yeni)</th></tr></thead><tbody>
    ${dRows.map((x) => `<tr data-day="${x.d}" data-group="${x.g}"><td>${esc(C.dayLabel(x.d))}</td>${tr(0, x)}</tr>`).join('')}</tbody></table></div></details>` : '';
  return `<article class="card" data-block="pr-score"><div class="row"><h3>CrazyGames karnesi <span class="badge">tahmin</span> ${C.info(help)}</h3></div>
    <div class="pr-two">${GROUPS.map(box).join('')}</div>
    <p class="note small" data-testid="pr-score-note">Puanlar tahmin: CrazyGames her sayı için yalnız bir sonraki eşiği gösteriyor (${esc(CG_SCORE.source)}). ${esc(CG_SCORE.rule)}
      Eşikler <b>studio/panel/play-report.js</b>'deki CG_SCORE'da tek yerde durur; CrazyGames panelinde yeni bir eşik görünce oradan güncellenir.
      Oyun süresi ve 1 dakika yalnız oyun süresini gönderen sürümlerden (Shadow Duel 1.4.1, Katana Flash 1.0.2 ve sonrası); ertesi gün dönüş bütün sürümlerden.</p>
    <div class="row" style="margin-top:10px"><div class="sub-h">Sürüm sürüm</div>${vRows.length ? csvV : ''}</div>${vTable}${dTable}</article>`;
}

function cardAds(A) {
  const esc = C.esc, rows = A.days || [];
  const vers = [...new Set(rows.map((r) => r.ver))].sort(byVersion);
  const measuring = new Set(vers.filter((v) => rows.some((r) => r.ver === v && r.ad_n > 0)));
  const help = 'Oyunların zaten saydığı reklam adımlarından, oturum başına: ara reklam gösterildi ya da gelmedi (hata, dolum yok, engel), ödüllü reklam teklifi ekrana geldi, '
    + 'oyuncu bastı, sonuna kadar izledi (ödül verildi) ya da ödülsüz kaldı; "reklam engelli": portalın bu oturuma ödüllü reklam vermeyeceğini söylediği oturumlar '
    + '(reklam engelleyici ya da CrazyGames Basic Launch\'ta reklamların kapalı olması). Yalnız reklam sayan sürümlerin oturumları.';
  const tiles = GROUPS.map(([g, label]) => {
    const o = sumRows(rows, (r) => measuring.has(r.ver) && groupOf(r.device) === g);
    const ask = o.ad_inter + o.ad_inter_fail;
    return `<div class="pr-box" data-group="${g}"><div class="pr-box-h"><b>${esc(label)}</b><span class="small muted">${C.fmtN(o.sessions)} oturum</span></div>
      <dl class="pr-dl" data-testid="pr-ads-${g}">
        <dt>Ara reklam / oturum</dt><dd class="num">${per(o.ad_inter, o.sessions, 2)}</dd>
        <dt>Ara reklam gelmedi</dt><dd class="num">${ask ? pct(o.ad_inter_fail / ask) : '—'}</dd>
        <dt>Ödüllü teklif / oturum</dt><dd class="num">${per(o.ad_rew_offer, o.sessions, 2)}</dd>
        <dt>Teklife basan</dt><dd class="num">${o.ad_rew_offer ? pct(o.ad_rew_click / o.ad_rew_offer) : '—'}</dd>
        <dt>Basınca ödülü alan</dt><dd class="num">${o.ad_rew_click ? pct(o.ad_rew_done / o.ad_rew_click) : '—'}</dd>
        <dt>Reklam engelli oturum</dt><dd class="num">${o.sessions ? pct(o.ad_blocked / o.sessions) : '—'}</dd>
      </dl></div>`;
  }).join('');
  const vr = [];
  for (const v of vers) for (const [g, label] of GROUPS) {
    const o = sumRows(rows, (r) => r.ver === v && groupOf(r.device) === g);
    if (o.sessions) vr.push({ v, g, label, o, m: measuring.has(v) });
  }
  const csv = C.csvButton('pr-ads', C.fileName('reklamlar'), ['Sürüm', 'Cihaz', 'Oturum', 'Ara reklam gösterilen', 'Ara reklam gelmeyen', 'Ödüllü teklif', 'Basılan', 'İzlenen', 'Ödülsüz', 'Reklam engelli oturum'],
    vr.map((x) => [x.v, x.label, x.o.sessions, x.o.ad_inter, x.o.ad_inter_fail, x.o.ad_rew_offer, x.o.ad_rew_click, x.o.ad_rew_done, x.o.ad_rew_fail, x.o.ad_blocked]));
  const table = vr.length ? `<details class="table"><summary>Sürüm sürüm</summary><div class="scroll-x"><table class="an-t" data-testid="pr-ads-ver"><thead><tr><th>Sürüm</th><th>Cihaz</th><th class="n">Oturum</th><th class="n">Ara reklam</th><th class="n">Gelmedi</th><th class="n">Teklif</th><th class="n">Basılan</th><th class="n">İzlenen</th><th class="n">Ödülsüz</th><th class="n">Engelli</th></tr></thead><tbody>
    ${vr.map((x) => `<tr data-ver="${esc(x.v)}" data-group="${x.g}"><td><b>${esc(x.v)}</b>${x.m ? '' : ' <span class="badge off">saymıyor</span>'}</td><td>${esc(x.label)}</td><td class="n num">${C.fmtN(x.o.sessions)}</td>
      ${x.m ? [x.o.ad_inter, x.o.ad_inter_fail, x.o.ad_rew_offer, x.o.ad_rew_click, x.o.ad_rew_done, x.o.ad_rew_fail, x.o.ad_blocked].map((n) => `<td class="n num">${C.fmtN(n)}</td>`).join('') : '<td class="n muted" colspan="7">bu sürüm reklam saymıyor</td>'}</tr>`).join('')}</tbody></table></div></details>` : '';
  const tot = sumRows(rows, (r) => measuring.has(r.ver));
  const basic = tot.sessions && tot.ad_inter_fail > tot.ad_inter * 4 && tot.ad_blocked > tot.sessions / 2
    ? '<p class="note small" data-testid="pr-ads-basic">Ara reklamların çoğu gelmiyor ve oturumların çoğu "reklam engelli": CrazyGames Basic Launch\'ta reklamlar kapalıdır, bu beklenen durum. Tam yayına geçince dolar.</p>' : '';
  const body = measuring.size ? tiles : '<p class="muted small" data-testid="pr-ads-none">Bu dönemde reklam sayan sürüm oynanmadı.</p>';
  return `<article class="card" data-block="pr-ads"><div class="row"><h3>Reklamlar ${C.info(help)}</h3>${vr.length ? csv : ''}</div><div class="pr-two">${body}</div>${basic}${table}</article>`;
}

function cardRotate(A) {
  const esc = C.esc, rows = (A.days || []).filter((r) => r.device === 'phone' || r.device === 'tablet');
  const edges = (A.edges && A.edges.turn) || [];
  const help = 'Telefon ve tabletlerde "telefonu yan çevir" ekranı: oyunun dik ekranda durduğu an (Shadow Duel\'de dövüş, Katana Flash\'ta açılışta). '
    + 'Gören: bu ekranı en az bir kez gören oturumlar. Çeviren: sonra telefonu yan çevirenler. Çevirmeden çıkan: hiç çevirmeden oyundan çıkanlar. '
    + 'Dik bekleme: bu ekranda geçen ortalama süre; çevirene kadar: ekranın ilk çıkışından çevrilmesine kadar (ortanca). Yalnız bunu ölçen sürümler (1.4.1 / 1.0.2 ve sonrası).';
  const all = sumRows(rows);
  const tq = histQuantile(histOf(A.hist, 'turn', (h) => h.device === 'phone' || h.device === 'tablet'), edges, 0.5);
  const kpi = all.cg_n ? `<div class="pr-two"><div class="pr-box"><div class="pr-box-h"><b>Telefon ve tablet</b><span class="small muted">${C.fmtN(all.cg_n)} oturum</span></div><dl class="pr-dl" data-testid="pr-rot-kpi">
      <dt>Uyarıyı gören</dt><dd class="num">${pct(all.rot_n / all.cg_n)} <span class="muted">(${C.fmtN(all.rot_n)} / ${C.fmtN(all.cg_n)})</span></dd>
      <dt>Çeviren</dt><dd class="num">${all.rot_n ? pct(all.rot_turned / all.rot_n) : '—'}</dd>
      <dt>Hiç çevirmeden çıkan</dt><dd class="num"><b>${all.rot_n ? pct(all.rot_left / all.rot_n) : '—'}</b></dd>
      <dt>Dik bekleme (ortalama)</dt><dd class="num">${all.rot_n ? dur(all.rot_s / all.rot_n) : '—'}</dd>
      <dt>Çevirene kadar (ortanca)</dt><dd class="num">${tq ? (tq.over ? `${dur(edges.at(-1))}+` : '≈ ' + dur(tq.v)) : '—'}</dd>
    </dl></div></div>` : '<p class="muted small" data-testid="pr-rot-none">Bu dönemde bunu ölçen sürümde telefon ya da tablet oturumu yok.</p>';
  const vers = [...new Set(rows.map((r) => r.ver))].sort(byVersion);
  const vr = [];
  for (const v of vers) for (const d of ['phone', 'tablet']) {
    const o = sumRows(rows, (r) => r.ver === v && r.device === d);
    if (!o.cg_n) continue;
    const q = histQuantile(histOf(A.hist, 'turn', (h) => h.ver === v && h.device === d), edges, 0.5);
    vr.push({ v, d, o, q });
  }
  const csv = C.csvButton('pr-rot', C.fileName('telefon-cevirme'), ['Sürüm', 'Cihaz', 'Oturum', 'Gören', 'Çeviren', 'Çevirmeden çıkan', 'Dik bekleme ortalama (sn)', 'Çevirene kadar ortanca (sn)'],
    vr.map((x) => [x.v, devName(x.d), x.o.cg_n, x.o.rot_n, x.o.rot_turned, x.o.rot_left, x.o.rot_n ? Math.round(x.o.rot_s / x.o.rot_n) : '', x.q ? Math.round(x.q.v) : '']));
  const table = vr.length ? `<div class="sub-h" style="margin-top:10px">Sürüm ve cihaz</div><div class="scroll-x"><table class="an-t" data-testid="pr-rot-ver"><thead><tr><th>Sürüm</th><th>Cihaz</th><th class="n">Oturum</th><th class="n">Gören</th><th class="n">Çeviren</th><th class="n">Çevirmeden çıkan</th><th class="n">Dik bekleme</th><th class="n">Çevirene kadar</th></tr></thead><tbody>
    ${vr.map((x) => `<tr data-ver="${esc(x.v)}" data-dev="${x.d}"><td><b>${esc(x.v)}</b></td><td>${esc(devName(x.d))}</td><td class="n num">${C.fmtN(x.o.cg_n)}</td><td class="n num">${C.fmtN(x.o.rot_n)} <span class="muted">${x.o.cg_n ? pct(x.o.rot_n / x.o.cg_n) : ''}</span></td>
      <td class="n num">${C.fmtN(x.o.rot_turned)}</td><td class="n num">${C.fmtN(x.o.rot_left)} <span class="muted">${x.o.rot_n ? pct(x.o.rot_left / x.o.rot_n) : ''}</span></td>
      <td class="n num">${x.o.rot_n ? esc(dur(x.o.rot_s / x.o.rot_n)) : '—'}</td><td class="n num">${x.q ? esc(x.q.over ? `${dur(edges.at(-1))}+` : '≈ ' + dur(x.q.v)) : '—'}</td></tr>`).join('')}</tbody></table></div>` : '';
  return `<article class="card" data-block="pr-rot"><div class="row"><h3>Telefonu yan çevirmeyenler ${C.info(help)}</h3>${vr.length ? csv : ''}</div>${kpi}${table}</article>`;
}

function cardLoad(A) {
  const esc = C.esc, rows = A.days || [], E = A.edges || {};
  const help = 'İlk kare: sayfanın açılmasından oyunun ilk kullanılabilir karesine (menü ya da ilk ekran). İlk oyun: ilk "oynuyor"a (gameplayStart; CrazyGames yükleme süresini buraya kadar sayar). '
    + 'Ortanca: oturumların yarısı bundan hızlı; en yavaş %10: oturumların en yavaş onda birinin başladığı süre. Arka planda açılan sayfalar sayılmaz. '
    + 'Hatalı oturum: oyunda en az bir hata raporu gelen oturumların oranı (Hatalar sekmesindeki raporlar; bütün sürümler).';
  const vers = [...new Set(rows.map((r) => r.ver))].sort(byVersion);
  const q = (kind, keep) => {
    const h = histOf(A.hist, kind, keep), edges = E[kind] || [];
    const m = histQuantile(h, edges, 0.5), p = histQuantile(h, edges, 0.9);
    const n = Object.values(h).reduce((a, b) => a + b, 0);
    const t = (x) => (!x ? '—' : x.over ? `${secs(edges.at(-1))}+` : '≈ ' + secs(x.v));
    return { n, m, p, text: n ? `${t(m)} <span class="muted">/ ${t(p)}</span>` : '—' };
  };
  const vr = [];
  for (const v of vers) for (const [g, label] of GROUPS) {
    const keep = (r) => r.ver === v && groupOf(r.device) === g;
    const o = sumRows(rows, keep);
    if (!o.sessions) continue;
    vr.push({ v, g, label, o, l: q('load', keep), s: q('start', keep) });
  }
  const csv = C.csvButton('pr-load', C.fileName('yukleme-hatalar'), ['Sürüm', 'Cihaz', 'Oturum', 'İlk kare ortanca (sn)', 'İlk kare en yavaş %10 (sn)', 'İlk oyun ortanca (sn)', 'İlk oyun en yavaş %10 (sn)', 'Hatalı oturum (%)'],
    vr.map((x) => [x.v, x.label, x.o.sessions, ...[x.l.m, x.l.p, x.s.m, x.s.p].map((y) => (y ? Math.round(y.v / 100) / 10 : '')), Math.round((1000 * x.o.err_n) / x.o.sessions) / 10]));
  const body = vr.length ? `<div class="scroll-x"><table class="an-t pr-c" data-testid="pr-load"><thead><tr><th>Sürüm</th><th class="n">İlk kare<br><span class="muted">ortanca / en yavaş %10</span></th><th class="n">İlk oyun<br><span class="muted">ortanca / en yavaş %10</span></th><th class="n">Hatalı oturum</th></tr></thead><tbody>
    ${vr.map((x) => `<tr data-ver="${esc(x.v)}" data-group="${x.g}"><td><b>${esc(x.v)}</b><br><span class="small muted">${esc(x.label)} · ${C.fmtN(x.o.sessions)} oturum</span></td><td class="n num">${x.l.text}</td><td class="n num">${x.s.text}</td>
      <td class="n num">${pct(x.o.err_n / x.o.sessions, 1)} <span class="muted">(${C.fmtN(x.o.err_n)})</span></td></tr>`).join('')}</tbody></table></div>` : '<p class="muted small">Bu dönemde veri yok.</p>';
  return `<article class="card" data-block="pr-load"><div class="row"><h3>Yükleme ve hatalar ${C.info(help)}</h3>${vr.length ? csv : ''}</div>${body}
    <p class="small muted">Yükleme süresi 1.4.1 / 1.0.2 ve sonrası sürümlerden; önceki sürümlerde "—".</p></article>`;
}

function cardJourney(A) {
  const esc = C.esc, J = A.journey || { rows: [] }, steps = JOURNEY[A.game] || [];
  const help = 'Dönemde oyunu ilk kez açan oyuncular (bu portalda), ilk gününde hangi adıma kadar geldi; son satır ertesi gün yeniden gelenler (ertesi günü bitmiş oyunculardan). '
    + 'Sürüm: oyuncunun ilk açtığı sürüm. Oyun adımları 30 gün tutulur.';
  const vers = [...new Set((J.rows || []).map((r) => r.ver))].sort(byVersion).slice(0, 4);
  const agg = (keep) => {
    const o = { installs: 0, d1: 0, d1_base: 0, steps: {} };
    for (const r of J.rows || []) {
      if (!keep(r)) continue;
      o.installs += r.installs; o.d1 += r.d1; o.d1_base += r.d1_base;
      for (const [k, n] of Object.entries(r.steps || {})) o.steps[k] = (o.steps[k] || 0) + n;
    }
    return o;
  };
  const cols = vers.map((v) => ({ v, o: agg((r) => r.ver === v) }));
  const cell = (n, base) => (base ? `<td class="n num"><span class="pr-bar" style="--w:${Math.round((100 * n) / base)}%"></span>${pct(n / base)} <span class="muted">${C.fmtN(n)}</span></td>` : '<td class="n">—</td>');
  const lines = [['__open', 'Oyunu açtı'], ...steps, ['__d1', 'Ertesi gün döndü']];
  const since = STEP_SINCE[A.game] || {};
  const counted = (k, v) => !since[k] || byVersion(v, since[k]) <= 0;
  const row = (cs, [k, label]) => `<tr data-step="${esc(k)}"><th scope="row">${esc(label)}</th>${cs.map(({ v, o }) => (k === '__open' ? cell(o.installs, o.installs) : k === '__d1' ? cell(o.d1, o.d1_base)
    : counted(k, v) ? cell(o.steps[k] || 0, o.installs) : '<td class="n muted" title="bu sürüm saymıyor">—</td>')).join('')}</tr>`;
  const table = (cs, id, head) => `<div class="scroll-x"><table class="an-t pr-j" data-testid="${id}"><thead><tr><th>Adım</th>${head}</tr></thead><tbody>${lines.map((l) => row(cs, l)).join('')}</tbody></table></div>`;
  const byDev = [];
  for (const v of vers) for (const [g, label] of GROUPS) byDev.push({ v, label, o: agg((r) => r.ver === v && groupOf(r.device) === g) });
  const csv = C.csvButton('pr-journey', C.fileName('ilk-gun-yolculugu'), ['Adım', ...cols.map((c) => `${c.v} (oyuncu)`)],
    lines.map(([k, label]) => [label, ...cols.map(({ o }) => (k === '__open' ? o.installs : k === '__d1' ? `${o.d1}/${o.d1_base}` : o.steps[k] || 0))]));
  const note = J.from && J.from > A.from ? `<p class="note small">Oyun adımları 30 gün tutulur: ${esc(C.dayLabel(J.from))}'den beri açan oyuncular.</p>` : '';
  const missingStep = Object.entries(since).filter(([k]) => cols.some((c) => !counted(k, c.v)))
    .map(([k, v0]) => `<p class="small muted">"${esc((steps.find((x) => x[0] === k) || [k, k])[1])}" ${esc(v0)}'den beri sayılıyor.</p>`).join('');
  const body = cols.length ? table(cols, 'pr-journey', cols.map((c) => `<th class="n">${esc(c.v)}<br><span class="muted">${C.fmtN(c.o.installs)} oyuncu</span></th>`).join(''))
    + `<details class="table"><summary>Cihaza göre</summary>${table(byDev, 'pr-journey-dev', byDev.map((c) => `<th class="n">${esc(c.v)}<br><span class="muted">${esc(c.label)}</span></th>`).join(''))}</details>`
    : '<p class="muted small" data-testid="pr-journey-none">Bu dönemde bu portalda yeni oyuncu yok.</p>';
  return `<article class="card" data-block="pr-journey"><div class="row"><h3>İlk gün yolculuğu ${C.info(help)}</h3>${cols.length ? csv : ''}</div>${note}${body}${missingStep}</article>`;
}

// ================================================================== Sürüm karşılaştırması (Sürümler tab, top block)
// Two versions at the SAME AGE: each version's first 1 / 3 / 7 days on one portal (its own day 1 = the first day at least
// VC_RULES.startPlayers people played it there), cut where the next version took over, split computer / phone + tablet.
// It sits at the top of İstatistik → Sürümler (analytics.js tabVersions); no new tab or page. Numbers:
//   st_chart (stats8.sql st_cube)        players, new players, sessions, play time per version × device × day
//   st_play_report (stats13.sql)         CrazyGames play seconds, the 1-minute flag, next-day return, crash, first-day steps
//   st_ver_screens (stats14.sql)         exit screen and visited screens per version × device (until it is installed
//                                        those rows say so; the rest works)
// Each row: old → new, the change, and a one-line plain verdict only when both sides have enough data (VC_RULES).
const VC_DAY = { add: (d, n) => new Date(Date.parse(d + 'T12:00:00Z') + n * 864e5).toISOString().slice(0, 10),
  diff: (a, b) => Math.round((Date.parse(a + 'T12:00:00Z') - Date.parse(b + 'T12:00:00Z')) / 864e5),
  today: () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()) };

// ------------------------------------------------------------------ rules (one place; the doc and the block quote them)
export const VC_RULES = {
  startPlayers: 20,     // a version's day 1: the first day at least this many people played it on the portal
  minSessions: 100,     // per-session numbers (CrazyGames play, 1 minute, screens, crash): sessions on each side
  minPlayerDays: 50,    // per-player numbers and players / new players per day: player-days on each side
  minInstalls: 200,     // next-day return: new players whose next day is over, on each side
  minJourney: 100,      // first-day steps: new players on each side
  relChange: 0.10,      // averages: a change smaller than 10 % counts as "no change"
  z: 1.96,              // shares: a difference inside the 95 % chance band counts as "no change"
  /**
   * Version boundaries where a row's MEANING changed (what the game sends, or how a screen is named). When the two compared
   * versions lie on both sides of `ver` (old < ver ≤ new), the row says "ölçüm değişti, karşılaştırılamaz" + `why`.
   * rows: row keys (see vcRows); groups: only these device groups (default both). Checked against docs/SHADOW-DUEL-PORTALLAR.md
   * and the history of packages/analytics and games/06-shadow-duel/src/studio-stats.ts, js/funnel.js, js/tutorial.js.
   * NOT changed by 1.4.1: "oyuncu başına günlük süre" (and the sessions) count the visible seconds of every screen in every
   * version; 1.4.1 only ADDED the CrazyGames-style play seconds (pl) beside them.
   */
  changes: {
    'shadow-duel': [
      { ver: '1.4.1', rows: ['cgplay', 'conv'], why: '1.4.1\'den önce oyun "oynuyor" saniyelerini (CrazyGames\'in saydığı süre) ve 1 dakika işaretini hiç göndermiyordu.' },
      { ver: '1.4.1', rows: ['fight'], groups: ['mobile'], why: '1.4.1\'den beri telefon dik tutulunca dövüş ekranı yerine "yan çevir" ekranı sayılıyor; çevirmeden çıkan oturum artık dövüşe girmiş sayılmıyor.' },
      { ver: '1.4.1', rows: ['j:second_fight'], why: '"İkinci dövüşe başladı" adımı 1.4.1\'den beri gönderiliyor.' },
      { ver: '1.3.2', rows: ['j:tutorial_done', 'j:tutorial_skip'], why: '1.3.2\'de öğretici kısa, atlanabilir öğreticiye döndü: "bitirdi" artık 4 adımın sonu, ATLA düğmesi yeni.' },
    ],
  },
  /** what each version changed in the game (shown when the compared versions are not side by side) */
  notes: {
    'shadow-duel': {
      '1.3.2': 'kısa, atlanabilir ilk dövüş öğreticisi',
      '1.4.0': 'oynanış ve menüler: büyük dereceli kartı, arka planda rakip arama, YENİ ödül rozetleri, canlı menüler, öğreticide zamanlama halkası',
      '1.4.1': 'yalnız ölçüm (oynanış 1.4.0 ile aynı): CrazyGames oyun süresi, yükleme, yan çevir, reklam sayıları',
      '1.5.0': 'yeni dövüş sistemi: imza tekmeler, karşı vuruş sinematikleri, silah düşürme, 7 arena; telefonda yalnız d-pad',
    },
  },
};
/** the measurement change that makes a row not comparable between old a and new b (null = comparable) */
export function vcChanged(game, key, g, a, b) {
  const [lo, hi] = byVersion(a, b) > 0 ? [a, b] : [b, a]; // lo: the older one
  return (VC_RULES.changes[game] || []).find((c) => c.rows.includes(key) && (!c.groups || c.groups.includes(g))
    && byVersion(lo, c.ver) > 0 && byVersion(hi, c.ver) <= 0) || null;
}
/** versions released between the two (both from the list), oldest first */
export function vcBetween(vers, a, b) {
  const [lo, hi] = byVersion(a, b) > 0 ? [a, b] : [b, a];
  return vers.filter((v) => byVersion(v, lo) < 0 && byVersion(v, hi) > 0).sort(byVersion).reverse();
}
export const VC_WINDOWS = [1, 3, 7];
const VC_DEVS = { desktop: ['desktop'], mobile: ['phone', 'tablet'] };


// ------------------------------------------------------------------ pure parts (panel-check tests them)
/**
 * Each version's day 1 from a st_chart answer (metric 'dau', split 'ver', gran 'day'): the first day with at least
 * `min` players. → { ver: 'YYYY-MM-DD' } (versions that never got there are left out).
 */
export function vcStartDays(chart, min = VC_RULES.startPlayers) {
  const out = {}, B = chart?.buckets || [];
  for (const s of chart?.metrics?.dau?.series || []) {
    const i = (s.v || []).findIndex((v) => v != null && v >= min);
    if (i >= 0 && B[i]) out[s.k] = B[i].t;
  }
  return out;
}

/**
 * The days of each version to compare. starts: { ver: day 1 }; a, b: old and new version; n: 1 / 3 / 7; today.
 * A version's own run ends the day before the next newer version's day 1 (when that is later than its own) or today.
 * Both sides get the same number of days: e = min(n, days of a's run, days of b's run).
 * → { e, n, a: { ver, from, to, run, cutBy }, b: { … }, partial (b's or a's window holds today) } or null.
 */
export function vcWindows(starts, a, b, n, today) {
  if (!starts[a] || !starts[b]) return null;
  const vers = Object.keys(starts).sort(byVersion).reverse(); // oldest first
  const side = (v) => {
    const s = starts[v];
    const next = vers.filter((x) => byVersion(x, v) < 0 && starts[x] > s).map((x) => starts[x]).sort()[0];
    const end = next ? VC_DAY.add(next, -1) : today;
    const to = end < today ? end : today;
    return { ver: v, from: s, run: VC_DAY.diff(to, s) + 1, cutBy: next ? vers.find((x) => starts[x] === next && byVersion(x, v) < 0) : null, end: to };
  };
  const A = side(a), B = side(b);
  const e = Math.max(1, Math.min(n, A.run, B.run));
  for (const X of [A, B]) X.to = VC_DAY.add(X.from, e - 1);
  return { e, n, a: A, b: B, partial: A.to >= today || B.to >= today };
}

/** Sum a version's numbers for one device group over its window from the three answers. */
export function vcCollect(win, v, g, { chart, report, screens }) {
  const o = { ver: v, pd: 0, np: 0, s: 0, play: 0, cg_n: 0, cg_s: 0, cg_conv: 0, sx: 0, err: 0, inst: 0, instAll: 0, d1: 0, j: { installs: 0, steps: {} },
    exit: {}, seen: {}, scr: 0, hasCube: false, hasSx: false, hasScr: null };
  const W = win[v === win.a.ver ? 'a' : 'b'];
  const inWin = (d) => d >= W.from && d <= W.to;
  // players, new players, sessions, play time: st_chart per group (split ver; buckets = days)
  const C1 = chart && chart[g];
  if (C1) {
    const B = C1.buckets || [];
    for (const [m, f] of [['dau', 'pd'], ['new', 'np'], ['sessions', 's'], ['play', 'play']]) {
      const ser = (C1.metrics?.[m]?.series || []).find((x) => x.k === v);
      if (!ser) continue;
      (ser.v || []).forEach((x, i) => { if (B[i] && inWin(B[i].t) && x != null) { o[f] += Number(x) || 0; o.hasCube = true; } });
    }
  }
  // CrazyGames play, the minute, return, crash: st_play_report of this version's window
  const R = report && report[v];
  if (R) {
    for (const r of R.days || []) {
      if (r.ver !== v || !inWin(r.day) || groupOf(r.device) !== g) continue;
      o.hasSx = true;
      o.cg_n += r.cg_n || 0; o.cg_s += Number(r.cg_s) || 0; o.cg_conv += r.cg_conv || 0; o.sx += r.sessions || 0; o.err += r.err_n || 0;
      o.instAll += r.installs || 0;
      if (r.d1 != null) { o.inst += r.installs || 0; o.d1 += r.d1 || 0; }
    }
    for (const r of R.journey?.rows || []) {
      if (r.ver !== v || groupOf(r.device) !== g) continue;
      o.j.installs += r.installs || 0;
      for (const [k, n] of Object.entries(r.steps || {})) o.j.steps[k] = (o.j.steps[k] || 0) + n;
    }
  }
  // screens: st_ver_screens (stats14.sql); hasScr false = not installed, or this window began before it was
  if (screens && !screens.missing) {
    o.hasScr = !!(screens.since && screens.since <= W.from);
    for (const r of screens.rows || []) {
      if (r.ver !== v || !inWin(r.day) || groupOf(r.device) !== g) continue;
      if (r.kind === 'exit') { o.exit[r.key] = (o.exit[r.key] || 0) + r.n; o.scr += r.n; } else o.seen[r.key] = (o.seen[r.key] || 0) + r.n;
    }
  }
  return o;
}

/** Exit screens in plain groups (Shadow Duel's names; another game's screens fall into "other"). */
export const VC_EXIT_GROUPS = [
  ['boot', 'Açılırken (oyun yüklenmeden)', (k) => k === 'boot' || k === '?', 'low'],
  ['menu', 'Menüde / seçim ekranında', (k) => ['menu', 'select', 'settings', 'boards', 'first', 'map', 'village', 'garage'].includes(k), ''],
  ['fight', 'Dövüşün içinde (duraklatma, yan çevir dahil)', (k) => k.startsWith('fight:') || k === 'pause' || k === 'rotate' || k.startsWith('race:'), ''],
  ['result', 'Sonuç ekranında', (k) => k === 'result', ''],
  ['online', 'Dereceli / çevrimiçi ekranında', (k) => k === 'ranked' || k === 'online', ''],
];
export function vcExitShares(o) {
  const out = Object.fromEntries(VC_EXIT_GROUPS.map(([k]) => [k, 0]));
  out.other = 0;
  for (const [key, n] of Object.entries(o.exit)) {
    const g = VC_EXIT_GROUPS.find((x) => x[2](key));
    out[g ? g[0] : 'other'] += n;
  }
  return out;
}

/**
 * One comparison: kind 'avg' (relative change ≥ VC_RULES.relChange) or 'prop' (two-share z test ≥ VC_RULES.z); better 'up',
 * 'down' or '' (no colour). a, b: { v, n, k? (the count for a share) }; min: the smallest n on each side.
 * → { state: 'good' | 'bad' | 'same' | 'flat' (no colour, but enough data) | 'thin' | 'none', d (change: relative for avg,
 *     points for prop) }
 */
export function vcJudge(kind, better, a, b, min) {
  if (!a || !b || a.v == null || b.v == null) return { state: 'none', d: null };
  const d = kind === 'prop' ? b.v - a.v : a.v ? (b.v - a.v) / a.v : null;
  if ((a.n || 0) < min || (b.n || 0) < min) return { state: 'thin', d };
  let real;
  if (kind === 'prop') {
    const p = (a.k + b.k) / (a.n + b.n), se = Math.sqrt(p * (1 - p) * (1 / a.n + 1 / b.n));
    real = se > 0 ? Math.abs((b.v - a.v) / se) >= VC_RULES.z : false;
  } else real = d != null && Math.abs(d) >= VC_RULES.relChange;
  if (!real) return { state: 'same', d };
  if (!better) return { state: 'flat', d };
  return { state: (d > 0) === (better === 'up') ? 'good' : 'bad', d };
}

// ------------------------------------------------------------------ the rows
/** a first-day step this version sends (STEP_SINCE: e.g. second_fight from Shadow Duel 1.4.1) */
const vcCounts = (game, k, ver) => { const v0 = (STEP_SINCE[game] || {})[k]; return !v0 || byVersion(ver, v0) <= 0; };
const pc = (k, n) => ({ v: n ? k / n : null, n, k });
/** the rows of one game: [section, key, label, help, kind, better, min, value(o) → {v, n, k?}, words [up, down], fmt] */
function vcRows(game) {
  const R = VC_RULES;
  const fight = game === 'shadow-duel';
  const J = JOURNEY[game] || [];
  const rows = [
    ['Oyuncular', 'players', 'Günlük oyuncu', 'O sürümü bu portalda bir günde açan kişi, günlerin ortalaması. Bilgi: çoğu CrazyGames\'in gönderdiği trafiğe bağlı (ve sürümün 1. günü yarım olabilir), sürümün iyi ya da kötü olduğunu göstermez.', 'avg', '', R.minPlayerDays,
      (o, e) => ({ v: o.hasCube ? o.pd / e : null, n: o.pd }), ['Günde daha çok oyuncu geldi', 'Günde daha az oyuncu geldi'], 'n1', 'count'],
    ['Oyuncular', 'newp', 'Günlük yeni oyuncu', 'Oyunu ilk kez açan kişi, günlerin ortalaması. Bilgi: trafiğe bağlı, iyi ya da kötü sayılmaz.', 'avg', '', R.minPlayerDays,
      (o, e) => ({ v: o.hasCube ? o.np / e : null, n: o.pd }), ['Günde daha çok yeni oyuncu geldi', 'Günde daha az yeni oyuncu geldi'], 'n1', 'count'],
    ['Oyuncular', 'spp', 'Oyuncu başına oturum', 'Bir oyuncu bir günde oyunu kaç kez açtı (oturum ÷ oyuncu-gün).', 'avg', 'up', R.minPlayerDays,
      (o) => ({ v: o.pd ? o.s / o.pd : null, n: o.pd }), ['Oyunu daha sık açıyorlar', 'Oyunu daha seyrek açıyorlar'], 'n2'],
    ['Oyuncular', 'ppp', 'Oyuncu başına günlük süre', 'Bir oyuncunun bir günde oyunda geçirdiği süre (ekranın açık ve önde olduğu her saniye). Bütün sürümlerde aynı sayılır (1.4.1\'in eklediği CrazyGames süresi ayrı satırda).', 'avg', 'up', R.minPlayerDays,
      (o) => ({ v: o.pd ? o.play / o.pd : null, n: o.pd }), ['Oyuncu başına daha uzun oynanıyor', 'Oyuncu başına daha kısa oynanıyor'], 'dur'],
    ['CrazyGames\'in üç sayısı', 'cgplay', 'Oturum başına oyun süresi', 'CrazyGames\'in saydığı gibi: yalnız oyunun "oynuyor" dediği ve ekranın açık olduğu saniyeler, oturum başına (1.4.1 / 1.0.2\'den beri).', 'avg', 'up', R.minSessions,
      (o) => ({ v: o.cg_n ? o.cg_s / o.cg_n : null, n: o.cg_n }), ['Oturumlar daha uzun', 'Oturumlar daha kısa'], 'dur'],
    ['CrazyGames\'in üç sayısı', 'conv', '1 dakikadan çok oynayan', 'Oturumların kaçında oyun süresi 1 dakikayı geçti (CrazyGames\'in "gameplay conversion" sayısı; oyunun gönderdiği 1 dakika işareti).', 'prop', 'up', R.minSessions,
      (o) => pc(o.cg_conv, o.cg_n), ['Daha çok kişi 1 dakikayı geçiyor', 'Daha az kişi 1 dakikayı geçiyor'], 'pct'],
    ['CrazyGames\'in üç sayısı', 'd1', 'Ertesi gün dönen (D1)', 'Bu günlerde ilk kez gelen yeni oyunculardan ertesi gün yeniden gelenler. Son günün ertesi günü bitmeden sayılmaz.', 'prop', 'up', R.minInstalls,
      (o) => pc(o.d1, o.inst), ['Ertesi gün daha çok kişi dönüyor', 'Ertesi gün daha az kişi dönüyor'], 'pct'],
  ];
  if (fight) {
    rows.push(
      ['Oyunun içi', 'fight', 'Dövüşe giren oturum', 'Oturumların kaçında en az bir dövüş ekranı açıldı (herhangi bir mod).', 'prop', 'up', R.minSessions,
        (o) => (o.hasScr ? pc(o.seen['fight:*'] || 0, o.scr) : null), ['Daha çok oturum dövüşe giriyor', 'Daha az oturum dövüşe giriyor'], 'pct', 'scr'],
      ['Oyunun içi', 'result', 'Bir dövüşü bitiren oturum', 'Oturumların kaçında sonuç ekranı göründü (en az bir dövüş sonuna kadar oynandı).', 'prop', 'up', R.minSessions,
        (o) => (o.hasScr ? pc(o.seen.result || 0, o.scr) : null), ['Daha çok oturum bir dövüşü bitiriyor', 'Daha az oturum bir dövüşü bitiriyor'], 'pct', 'scr'],
      ['Oyunun içi', 'ranked', 'Dereceli ekranını açan oturum', 'Oturumların kaçında dereceli ekranı açıldı (bilgi; iyi ya da kötü sayılmaz).', 'prop', '', R.minSessions,
        (o) => (o.hasScr ? pc(o.seen.ranked || 0, o.scr) : null), ['Dereceliye daha çok bakılıyor', 'Dereceliye daha az bakılıyor'], 'pct', 'scr'],
      ['Oyunun içi', 'online', 'Çevrimiçi ekranını açan oturum', 'Oturumların kaçında arkadaşla / çevrimiçi oyun ekranı açıldı (bilgi).', 'prop', '', R.minSessions,
        (o) => (o.hasScr ? pc(o.seen.online || 0, o.scr) : null), ['Çevrimiçine daha çok bakılıyor', 'Çevrimiçine daha az bakılıyor'], 'pct', 'scr'],
    );
  }
  for (const [k, label] of J) {
    rows.push(['İlk gün (yeni oyuncular)', `j:${k}`, label, 'Bu günlerde ilk kez gelen oyuncuların kaçı ilk gününde bu adıma geldi.', 'prop', 'up', R.minJourney,
      (o) => (!vcCounts(game, k, o.ver) ? null : o.j.installs ? pc(o.j.steps[k] || 0, o.j.installs) : { v: null, n: 0 }), [`Daha çok yeni oyuncu: ${label.toLocaleLowerCase('tr-TR')}`, `Daha az yeni oyuncu: ${label.toLocaleLowerCase('tr-TR')}`], 'pct']);
  }
  if (fight) rows.push(['İlk gün (yeni oyuncular)', 'j:tutorial_skip', 'Öğreticiyi atlayan', 'Yeni oyuncuların kaçı ilk gününde öğreticinin ATLA düğmesine bastı.', 'prop', 'down', R.minJourney,
    (o) => (o.j.installs ? pc(o.j.steps.tutorial_skip || 0, o.j.installs) : { v: null, n: 0 }), ['Öğreticiyi atlayan arttı', 'Öğreticiyi atlayan azaldı'], 'pct']);
  for (const [k, label, , better] of VC_EXIT_GROUPS) {
    rows.push(['Nerede bırakıyorlar (çıkış ekranı)', `exit:${k}`, label, 'Oturumların kaçı bu ekrandayken bitti (oyun kapandı ya da 30 dakikadan uzun arka planda kaldı).', 'prop', better === 'low' ? 'down' : '', R.minSessions,
      (o) => (o.hasScr ? pc(vcExitShares(o)[k], o.scr) : null), better === 'low' ? ['Açılırken bırakan arttı', 'Açılırken bırakan azaldı'] : ['Burada bırakan arttı', 'Burada bırakan azaldı'], 'pct', 'scr']);
  }
  rows.push(['Çökme', 'crash', 'Çökme oranı', 'Oyunda hata görülen oturumların oranı (Hatalar sekmesindeki raporlar).', 'prop', 'down', R.minSessions,
    (o) => (o.hasSx ? pc(o.err, o.sx) : null), ['Çökme arttı', 'Çökme azaldı'], 'pct']);
  // (words: [when the number went up, when it went down])
  return rows;
}

// ------------------------------------------------------------------ loading
const VC = { node: null, key: '', data: null, err: null, at: 0, seq: 0, busy: false, args: null, pick: {}, n: 3, portal: 'crazygames' };
const VC_RELOAD_MS = 60000;
/** host: a placeholder element; o: { game, releases: [{ver, day}] } */
export function mountCompare(host, o) {
  if (!host) return;
  if (!VC.node) {
    VC.node = document.createElement('div');
    VC.node.dataset.testid = 'vc';
    VC.node.addEventListener('click', vcClick);
    VC.node.addEventListener('change', vcChange);
    VC.node.addEventListener('toggle', (e) => { if (e.target.classList?.contains('vc-more')) VC.open = e.target.open; }, true);
  }
  host.replaceWith(VC.node);
  const vers = [...new Set((o.releases || []).map((r) => r.ver))].filter((v) => v && v !== '?').sort(byVersion).slice(0, 8);
  const rel = Object.fromEntries((o.releases || []).map((r) => [r.ver, r.day]));
  const pick = VC.pick[o.game] || {};
  const args = { game: o.game, vers, rel, portal: VC.portal, n: VC.n, a: pick.a || '', b: pick.b || '' };
  const key = JSON.stringify(args);
  if (key !== VC.key) { VC.seq++; Object.assign(VC, { key, args, data: null, err: null, at: 0, busy: false }); }
  vcPaint();
  if (!VC.busy && Date.now() - VC.at > VC_RELOAD_MS) vcLoad();
}
async function vcLoad() {
  const my = ++VC.seq, A = VC.args;
  VC.busy = true;
  if (VC.data) VC.node?.classList.add('stale');
  try {
    const today = VC_DAY.today();
    if (!A.vers.length) throw Object.assign(new Error('Bu oyunda henüz sürüm yok.'), { empty: true });
    // 1) each version's day 1 on this portal (players per day, version by version)
    let from = A.vers.map((v) => A.rel[v]).filter(Boolean).sort()[0] || VC_DAY.add(today, -60);
    if (VC_DAY.diff(today, from) > 399) from = VC_DAY.add(today, -399);
    const c0 = await C.rpc('st_chart', { p_game: A.game, p_metrics: ['dau'], p_filters: { portal: [A.portal], ver: A.vers }, p_split: 'ver', p_from: from, p_to: today, p_gran: 'day', p_compare: false });
    if (my !== VC.seq) return;
    const starts = vcStartDays(c0);
    const live = Object.keys(starts).sort(byVersion);
    const b = live.includes(A.b) ? A.b : live[0];
    const a = live.includes(A.a) && A.a !== b ? A.a : live.find((v) => byVersion(v, b) > 0) || live.find((v) => v !== b);
    const waiting = A.vers.filter((v) => !starts[v] && (!b || byVersion(v, b) < 0)); // newer than the compared one, not live yet
    if (!a || !b) { vcFinish(my, { starts, waiting, live, a, b, today }); return; }
    const w7 = vcWindows(starts, a, b, A.n, today);
    const lo = [w7.a.from, w7.b.from].sort()[0], hi = [w7.a.to, w7.b.to].sort().at(-1);
    // 2) the numbers of both versions over the chosen first 1 / 3 / 7 days (the first-day journey is not per day: one call per window)
    const chartFor = (devs) => C.rpc('st_chart', { p_game: A.game, p_metrics: ['dau', 'new', 'sessions', 'play'], p_filters: { portal: [A.portal], ver: [a, b], device: devs }, p_split: 'ver', p_from: lo, p_to: hi, p_gran: 'day', p_compare: false });
    const steps = [...(JOURNEY[A.game] || []).map((s) => s[0]), ...(A.game === 'shadow-duel' ? ['tutorial_skip'] : [])].slice(0, 10);
    const reportFor = (W) => C.rpc('st_play_report', { p_game: A.game, p_from: W.from, p_to: W.to, p_portal: A.portal, p_steps: steps }).catch((e) => ({ err: e }));
    const screensP = C.rpc('st_ver_screens', { p_game: A.game, p_from: lo, p_to: hi, p_portal: A.portal, p_vers: [a, b] })
      .catch((e) => (e && e.missing ? { missing: true } : { err: e }));
    const [cd, cm, ra, rb, scr] = await Promise.all([chartFor(VC_DEVS.desktop), chartFor(VC_DEVS.mobile), reportFor(w7.a), reportFor(w7.b), screensP]);
    if (my !== VC.seq) return;
    vcFinish(my, { starts, waiting, live, a, b, today, chart: { desktop: cd, mobile: cm }, report: { [a]: ra.err ? null : ra, [b]: rb.err ? null : rb },
      reportErr: ra.err || rb.err || null, screens: scr.err ? { missing: false, err: scr.err, rows: [] } : scr });
  } catch (e) {
    if (my !== VC.seq) return;
    Object.assign(VC, { err: e, at: Date.now(), busy: false });
    VC.node?.classList.remove('stale');
    vcPaint();
  }
}
function vcFinish(my, data) {
  if (my !== VC.seq) return;
  Object.assign(VC, { data, err: null, at: Date.now(), busy: false });
  VC.node?.classList.remove('stale');
  vcPaint();
}
function vcClick(e) {
  const t = e.target.closest('[data-vc]');
  if (!t) return;
  if (t.dataset.vc === 'n') { VC.n = +t.dataset.n; vcRemount(); }
  if (t.dataset.vc === 'portal' && t.dataset.portal !== VC.portal) { VC.portal = t.dataset.portal; vcRemount(); }
}
function vcChange(e) {
  const t = e.target;
  if (t.id !== 'vcA' && t.id !== 'vcB') return;
  const g = VC.args.game, p = { ...(VC.pick[g] || {}) };
  p[t.id === 'vcA' ? 'a' : 'b'] = t.value;
  VC.pick[g] = p;
  vcRemount();
}
function vcRemount() {
  const A = VC.args;
  const host = document.createElement('div');
  VC.node.replaceWith(host);
  mountCompare(host, { game: A.game, releases: A.vers.map((v) => ({ ver: v, day: A.rel[v] })) });
}

// ------------------------------------------------------------------ painting
const vcPct = (v) => (v == null ? '—' : `%${(100 * v).toLocaleString('tr-TR', { maximumFractionDigits: v < 0.1 ? 1 : 0 })}`);
function vcFmtV(f, v) {
  if (v == null) return '—';
  if (f === 'pct') return vcPct(v);
  if (f === 'dur') return C.fmtDur(Math.round(v));
  if (f === 'n1') return Number(v).toLocaleString('tr-TR', { maximumFractionDigits: v < 10 ? 1 : 0 });
  return Number(v).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function vcFmtD(kind, d) {
  if (d == null) return '';
  if (kind === 'prop') { const p = 100 * d; const r = Math.abs(p) < 10 ? Math.round(p * 10) / 10 : Math.round(p); return r ? `${r > 0 ? '▲' : '▼'} ${Math.abs(r).toLocaleString('tr-TR')} puan` : '= aynı'; }
  const r = Math.round(100 * d);
  return r ? `${r > 0 ? '▲' : '▼'} %${Math.abs(r)}` : '= aynı';
}
/** what a row's sample is counted in */
export const vcUnitOf = (key) => (key === 'd1' || key.startsWith('j:') ? 'yeni oyuncu' : ['players', 'newp', 'spp', 'ppp'].includes(key) ? 'oyuncu-gün' : 'oturum');
const VC_STATE_WORD = { changed: 'ölçüm değişti', good: 'iyi', bad: 'kötü', same: 'değişmedi', flat: 'değişti (bilgi)', thin: 'henüz az veri', none: 'veri yok', partial: 'gün bitmedi' };

function vcPaint() {
  const el = VC.node;
  if (!el || !el.isConnected) return;
  const esc = C.esc;
  const head = `<div class="row"><h3>Sürüm karşılaştırması ${C.info(`İki sürüm AYNI YAŞTA karşılaştırılır: her sürümün bu portaldaki ilk 1, 3 ya da 7 günü (takvim günü değil). Bir sürümün 1. günü: o portalda en az ${VC_RULES.startPlayers} kişinin onu oynadığı ilk gün. Sonraki sürüm gelince eski sürümün günleri orada biter; iki taraf da aynı sayıda gün alır. 1. gün yarım olabilir (sürüm günün ortasında gelir): oranlar etkilenmez, günlük oyuncu sayısı etkilenir.`)}</h3></div>`;
  if (!VC.data && !VC.err) { el.innerHTML = `<article class="card" data-block="vc">${head}<p class="muted small">Sayılar geliyor…</p></article>`; return; }
  if (VC.err) {
    el.innerHTML = `<article class="card" data-block="vc">${head}<div class="warn-box" data-testid="vc-error">${VC.err.empty ? esc(VC.err.message) : VC.err.missing
      ? 'Bu bölümün sunucu kurulumu henüz yapılmadı (supabase/studio/stats8.sql).' : esc(C.friendly(VC.err))}</div></article>`;
    return;
  }
  const D = VC.data, A = VC.args;
  const portals = `<div class="seg" role="group" aria-label="Portal">${[['crazygames', 'CrazyGames'], ['site', 'Kendi site']].map(([k, t]) => `<button type="button" data-vc="portal" data-portal="${k}" aria-pressed="${k === A.portal}">${t}</button>`).join('')}</div>`;
  if (!D.a || !D.b) {
    el.innerHTML = `<article class="card" data-block="vc">${head}<div class="an-row">${portals}</div><p class="muted small" data-testid="vc-none">Karşılaştırmak için bu portalda en az iki sürümün günde ${VC_RULES.startPlayers} oyuncuya ulaşmış olması gerekir${D.live.length ? ` (şimdilik yalnız ${esc(D.live.join(', '))})` : ''}.</p>${vcWaiting(D)}</article>`;
    return;
  }
  const W = vcWindows(D.starts, D.a, D.b, VC.n, D.today);
  const opts = (sel, not) => D.live.map((v) => `<option value="${esc(v)}" ${v === sel ? 'selected' : ''} ${v === not ? 'disabled' : ''}>${esc(v)}</option>`).join('');
  const controls = `<div class="an-row vc-ctl"><label class="small">Yeni <select id="vcB" aria-label="Yeni sürüm">${opts(D.b, D.a)}</select></label>
      <label class="small">Eski <select id="vcA" aria-label="Eski sürüm">${opts(D.a, D.b)}</select></label>
      <div class="seg" role="group" aria-label="Kaç gün">${VC_WINDOWS.map((n) => `<button type="button" data-vc="n" data-n="${n}" aria-pressed="${n === VC.n}">İlk ${n} gün</button>`).join('')}</div>
      ${portals}</div>`;
  const side = (X) => `<b>${esc(X.ver)}</b>: 1. günü ${esc(C.dayLabel(X.from))}${X.cutBy ? ` (${X.run} gün yayında kaldı, sonra ${esc(X.cutBy)} geldi)` : ''}`;
  const span = (X) => (X.from === X.to ? C.dayLabel(X.from) : `${C.dayLabel(X.from)} – ${C.dayLabel(X.to)}`);
  const mid = vcBetween(A.vers, D.a, D.b), NOTE = VC_RULES.notes[A.game] || {};
  const [vlo, vhi] = byVersion(D.a, D.b) > 0 ? [D.a, D.b] : [D.b, D.a];
  const span2 = [...mid, vhi].filter((v) => NOTE[v]);
  const gap = mid.length ? `<div class="warn-box small" data-testid="vc-gap"><b>Bu iki sürüm yan yana değil:</b> arada ${esc(mid.join(', '))} var. Fark tek bir sürümün değil, aradaki bütün değişikliklerin toplamı${span2.length ? `: ${span2.map((v) => `<b>${esc(v)}</b> — ${esc(NOTE[v])}`).join('; ')}` : ''}. Tek bir sürümün etkisi için yan yana sürümleri seç (${esc(mid.at(-1))} ile ${esc(vhi)} gibi).</div>`
    : NOTE[vhi] ? `<p class="small muted" data-testid="vc-what"><b>${esc(vhi)}</b>'de değişen: ${esc(NOTE[vhi])}.</p>` : '';
  const ages = `<p class="small" data-testid="vc-ages">${side(W.b)} · ${side(W.a)}.<br>Karşılaştırılan: ikisinin de <b>ilk ${W.e} günü</b> (${esc(W.b.ver)}: ${esc(span(W.b))}; ${esc(W.a.ver)}: ${esc(span(W.a))})${W.e < W.n ? ` — ilk ${W.n} gün için henüz yeterli gün yok` : ''}.${W.partial ? ' <b>Bugün henüz bitmedi:</b> günlük oyuncu sayıları için karar verilmez; oranlar yine geçerli.' : ''}</p>`;

  const rows = vcRows(A.game);
  const groups = GROUPS.map(([g, label]) => {
    const oa = vcCollect(W, D.a, g, D), ob = vcCollect(W, D.b, g, D);
    let sec = '', html = '';
    const tally = { good: 0, bad: 0, same: 0, thin: 0, changed: 0 };
    const csv = [], found = [];
    for (const [section, key, name, help, kind, better, min, val, words, f, tag] of rows) {
      if (section !== sec) { sec = section; html += `<li class="vc-sec">${esc(section)}</li>`; }
      const va = val(oa, W.e), vb = val(ob, W.e);
      let J = vcJudge(kind, better, va, vb, min);
      if (tag === 'count' && W.partial && J.state !== 'none' && J.state !== 'thin') J = { ...J, state: 'partial' };
      if (tag === 'scr' && (!oa.hasScr || !ob.hasScr)) J = { state: 'none', d: null };
      const chg = vcChanged(A.game, key, g, D.a, D.b);
      if (chg) J = { state: 'changed', d: null };
      if (tally[J.state] != null) tally[J.state]++;
      const up = J.d != null && J.d > 0;
      const say = J.state === 'changed' ? `Ölçüm değişti, karşılaştırılamaz: ${chg.why}`
        : J.state === 'good' || J.state === 'bad' ? `${words[up ? 0 : 1]}.` : J.state === 'flat' ? `${words[up ? 0 : 1]} (bilgi).`
        : J.state === 'same' ? (kind === 'avg' ? `Değişim %${Math.round(100 * VC_RULES.relChange)}'dan az: değişmedi sayılır.` : 'Fark şans payı içinde: değişmedi sayılır.')
          : key === 'd1' && J.state === 'none' && (oa.instAll || ob.instAll) ? 'Ertesi günü henüz bitmedi: yarından sonra sayılır.'
          : J.state === 'thin' ? `Henüz az veri (iki tarafta da en az ${min.toLocaleString('tr-TR')} ${vcUnitOf(key)} gerek; şu an ${C.fmtN(va?.n || 0)} / ${C.fmtN(vb?.n || 0)}).`
            : J.state === 'partial' ? 'Bugün henüz bitmedi: yarın karar verilir.'
              : tag === 'scr' ? vcScreensWhy(D, W, oa, ob)
                : (va?.v == null) !== (vb?.v == null) ? `${va?.v == null ? D.a : D.b} bunu göndermiyor (o sürümde bu ölçüm yoktu).` : 'Bu günlerde veri yok.';
      const cls = J.state === 'good' ? 'up' : J.state === 'bad' ? 'down' : 'flat';
      html += `<li class="vc-r ${J.state}" data-row="${esc(key)}" data-state="${J.state}"><div class="vc-name">${esc(name)} ${C.info(help)}</div>
        <div class="vc-vals num"><span class="muted">${esc(D.a)}</span> ${esc(vcFmtV(f, va?.v))} → <span class="muted">${esc(D.b)}</span> <b>${esc(vcFmtV(f, vb?.v))}</b>
        ${J.d != null && J.state !== 'none' ? `<span class="delta ${cls}">${esc(vcFmtD(kind, J.d))}</span>` : ''}</div>
        <div class="vc-say small">${J.state === 'good' ? '✓ ' : J.state === 'bad' ? '✕ ' : ''}${esc(say)}</div></li>`;
      if (J.state === 'good' || J.state === 'bad') found.push({ s: J.state, t: `${words[up ? 0 : 1]} (${vcFmtV(f, va?.v)} → ${vcFmtV(f, vb?.v)})` });
      csv.push([label, section, name, va?.v ?? '', vb?.v ?? '', va?.n ?? '', vb?.n ?? '', VC_STATE_WORD[J.state]]);
    }
    const sum = `<span class="vc-tally small" data-testid="vc-tally-${g}"><span class="delta up">${tally.good} iyi</span> · <span class="delta down">${tally.bad} kötü</span> · ${tally.same} değişmedi · ${tally.thin} henüz az veri</span>`;
    return { g, label, found, tally, csv, html: `<div class="pr-box vc-g" data-group="${g}"><div class="pr-box-h"><b>${esc(label)}</b>${sum}</div>
      <p class="small muted">${esc(D.a)}: ${C.fmtN(oa.sx || oa.s)} oturum · ${esc(D.b)}: ${C.fmtN(ob.sx || ob.s)} oturum</p>
      <details class="vc-more" ${VC.open ?? window.matchMedia('(min-width: 761px)').matches ? 'open' : ''}><summary class="small">Bütün satırlar</summary><ul class="vc-rows">${html}</ul></details></div>` };
  });
  const csvRows = groups.flatMap((x) => x.csv);
  // at a glance: what is clearly better or worse, per device group
  const brief = `<div class="vc-brief" data-testid="vc-brief"><b>Kısaca: ${esc(D.b)}, eski ${esc(D.a)} ile, ilk ${W.e} gün</b><ul>${groups.map((x) => `<li data-group="${x.g}"><b>${esc(x.label)}:</b> ${x.found.length
    ? x.found.map((y) => `<span class="delta ${y.s === 'good' ? 'up' : 'down'}">${y.s === 'good' ? '✓' : '✕'} ${esc(y.t)}</span>`).join('<br>')
    : !x.tally.same ? (x.tally.thin ? 'henüz az veri' : 'karşılaştırılacak veri yok') : 'belirgin bir fark yok'}${x.tally.thin && (x.found.length || x.tally.same) ? ` <span class="muted">(${x.tally.thin} satırda henüz az veri)</span>` : ''}${x.tally.changed ? ` <span class="muted">(${x.tally.changed} satırda ölçüm değişti)</span>` : ''}</li>`).join('')}</ul></div>`;
  const csv = C.csvButton('vc', `${A.game}-surum-karsilastirma-${D.b}-${D.a}-ilk${W.e}gun`, ['Cihaz', 'Bölüm', 'Ölçü', D.a, D.b, `${D.a} örnek`, `${D.b} örnek`, 'Sonuç'], csvRows);
  const cgLink = `${C.pageHash(A.game)}?a=platformlar&p=7d&pl=crazygames`;
  const rule = `<p class="note small" data-testid="vc-rule"><b>Ne zaman karar verilir:</b> iki tarafta da en az ${VC_RULES.minSessions} oturum (oturum başına sayılar, ekranlar, çökme), ${VC_RULES.minPlayerDays} oyuncu-gün (oyuncu başına sayılar), ${VC_RULES.minInstalls} yeni oyuncu (ertesi gün dönüş), ${VC_RULES.minJourney} yeni oyuncu (ilk gün adımları). Altındaysa "henüz az veri". Oranlarda fark şans payını aşmalı (%95 güven); ortalamalarda en az %${Math.round(100 * VC_RULES.relChange)} değişmeli. Yeşil ✓ iyi, kırmızı ✕ kötü; renksiz satırlar bilgi.</p>`;
  const official = `<p class="small" data-testid="vc-official"><b>Resmi puan CrazyGames'in kendi karnesidir</b> (CrazyGames geliştirici paneli → oyun → Basic Launch kartı); buradaki sayılar bizim ölçümümüz, yakın olmalı ama aynı olmayabilir. Bizim tahmini karnemiz: <a href="${cgLink}" data-testid="vc-cg-link">Platformlar → CrazyGames → CrazyGames karnesi</a>.</p>`;
  el.innerHTML = `<article class="card" data-block="vc">${head.replace('</h3></div>', `</h3>${csv}</div>`)}${controls}${ages}${gap}${vcWaiting(D)}${brief}${D.reportErr ? `<div class="warn-box small">CrazyGames sayıları alınamadı: ${esc(D.reportErr.missing ? 'sunucu kurulumu yok (stats13.sql)' : C.friendly(D.reportErr))}</div>` : ''}
    <div class="pr-two vc-two">${groups.map((x) => x.html).join('')}</div>${rule}${official}</article>`;
}
function vcWaiting(D) {
  return D.waiting && D.waiting.length ? `<p class="small muted" data-testid="vc-waiting">${C.esc(D.waiting.join(', '))} bu portalda henüz günde ${VC_RULES.startPlayers} oyuncuya ulaşmadı; ulaştığı gün karşılaştırma kendiliğinden ona geçer.</p>` : '';
}
function vcScreensWhy(D, W) {
  const S = D.screens || {};
  if (S.missing) return 'Ekran sayıları için sunucu kurulumu bekleniyor (supabase/studio/stats14.sql).';
  if (S.err) return 'Ekran sayıları alınamadı.';
  if (!S.since) return 'Ekran sayıları henüz gelmedi (kurulumdan sonra biten oturumlar sayılır).';
  return `Ekran sayıları ${C.dayLabel(S.since)}'den beri tutuluyor; ${W.a.from < S.since ? `${D.a}'in ilk günleri bundan önce` : 'bu günler için veri yok'}.`;
}
