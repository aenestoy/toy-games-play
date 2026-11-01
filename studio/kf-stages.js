// Studio panel — Katana Flash's stage blocks, at the bottom of the funnel tab (Huni) of its game page (docs/STUDYO-PANELI.md
// "Katana Flash bölümleri"). Server: supabase/studio/stats11.sql st_kf_stages; the game sends the tallies from
// games/09-katana-flash/src/stagestats.ts (1.0.2). Three cards in the same tab, no new tab or page:
//   Bölümler          per stage: played, cleared, attempts, deaths per attempt, clear time, where players left, top cause
//   En yüksek bölüm   each player's highest cleared stage: groups and the top 20 (anonymous tags)
//   Patronlar         the boss stages: entered, beaten, attempts to the first win, what kills
// Before stats11.sql is on the server (or before 1.0.2 data comes) the funnel's own 1.0.1 steps (stage1, stage3, stage5,
// boss1_try, boss1_win, stage20) fill what they can, so the table is never empty.

import { KATANA } from './data.js';

let C = null; // what analytics.js lends: rpc, esc, formatters, card, info, csvButton, fileName, today
export function init(ctx) { C = ctx; }

export const KF_GAME = 'katana-flash';
/** The stage tallies are not funnel steps (stats11.sql keeps them out; this is for a server without it). */
export const isStageStep = (game, k) => game === KF_GAME && /^(s[0-9]|hi_)/.test(String(k));

// ------------------------------------------------------------------ labels (Turkish, plain)
/** the boss of a stage (every tenth one), its name exactly as the game shows it in Turkish (in capitals, as on screen) */
export const bossOf = (s) => { const b = KATANA.bosses[s]; return b ? { kind: b.kind, name: b.name } : null; };
export const stageLabel = (s) => { const b = bossOf(s); return b ? `${s} · ${b.name}` : String(s); };
const BOSS_BY_KIND = Object.fromEntries(Object.values(KATANA.bosses).map((b) => [b.kind, b.name]));
/** What killed the ninja (stagestats.ts CAUSES): an enemy touching it, a boss, an attack or something thrown. */
export const CAUSE_TR = {
  g: 'Piyade', a: 'Okçu', r: 'Koşucu', s: 'Kalkanlı', x: 'Bölünen', y: 'Bölünenin yarısı', p: 'Mızraklı', k: 'Bombacı', h: 'Hayalet',
  d: 'Kalkan taşıyan', c: 'Zincirli ikizler', w: 'Duvarcı', t: 'Şuriken atan', n: 'Gölge ninja', m: 'Davulcu', q: 'Dokunaç',
  spear: 'Mızrak darbesi', slam: 'Patronun yere vuruşu', bomb: 'Bomba patlaması', tentacle: 'Dokunaç saldırısı', frost: 'Buz yağmuru',
  bolt: 'Yıldırım', rain: 'Ok yağmuru', arrow: 'Ok', bam: 'Bambu oku', wisp: 'Cadı ateşi', ice: 'Buz parçası', orb: 'Enerji küresi',
  star: 'Şuriken', other: 'Diğer',
};
export const causeName = (c) => (BOSS_BY_KIND[c] ? `Patron: ${BOSS_BY_KIND[c]}` : CAUSE_TR[c] || c);

// ------------------------------------------------------------------ numbers from buckets
const sumOf = (h) => Object.values(h || {}).reduce((a, b) => a + (Number(b) || 0), 0);
/**
 * A clear-time quantile (seconds) from the time buckets {b: count} (stagestats.ts TIME_EDGES: bucket 1 = under the first
 * edge, the last bucket = the last edge or more, taken up to 1.5× it), spread evenly inside the bucket. null when empty.
 */
export function timeQuantile(hist, q) {
  const E = [0, ...KATANA.timeEdges], n = sumOf(hist);
  if (!n) return null;
  const want = q * n;
  let cum = 0;
  for (let b = 1; b <= E.length; b++) {
    const c = Number(hist[b]) || 0;
    if (c && cum + c >= want) {
      const lo = E[b - 1], hi = b < E.length ? E[b] : E[E.length - 1] * 1.5;
      return lo + ((hi - lo) * (want - cum)) / c;
    }
    cum += c;
  }
  return E[E.length - 1] * 1.5;
}
/** an attempts bucket (stagestats.ts TRY_STEPS) as words: 1, 2, 3, 4–5, 6–9, 10–19, 20+ */
export function tryLabel(k) {
  const S = KATANA.trySteps, i = S.indexOf(Number(k));
  if (i < 0) return String(k);
  const hi = i + 1 < S.length ? S[i + 1] - 1 : null;
  return hi == null ? `${S[i]}+` : hi === S[i] ? String(S[i]) : `${S[i]}–${hi}`;
}
/** the attempts bucket the median player needed for the first clear */
export function tryMedian(hist) {
  const n = sumOf(hist);
  if (!n) return null;
  let cum = 0;
  for (const k of KATANA.trySteps) { cum += Number(hist[k]) || 0; if (cum >= n / 2) return k; }
  return KATANA.trySteps.at(-1);
}
/** seconds as the panel writes them, rounded (5 s steps from a minute up: the buckets are not finer than that) */
export const durRound = (s) => (s == null ? '—' : C.fmtDur(s >= 60 ? Math.round(s / 5) * 5 : Math.max(1, Math.round(s))));

/** The table rows from the server's answer (or from the 1.0.1 funnel steps when there is no answer). */
export function stageRows(A) {
  return (A.stages || []).map((x) => {
    const med = timeQuantile(x.tb, 0.5);
    return {
      s: x.s, label: stageLabel(x.s), boss: !!bossOf(x.s), players: x.players, cleared: x.cleared,
      rate: x.players ? x.cleared / x.players : null, attempts: x.attempts, deaths: x.deaths, revives: x.revives,
      dpa: x.attempts ? x.deaths / x.attempts : null, clears: x.clears, med, lo: timeQuantile(x.tb, 0.25), hi: timeQuantile(x.tb, 0.75),
      left: x.left, cause: x.causes && x.causes[0] ? x.causes[0].c : null, causes: x.causes || [], ab: x.ab || {}, firsts: x.firsts,
    };
  });
}
/** 1.0.1's steps (players who got there, from the funnel tab's answer) as stage rows: only what they tell */
export function milestoneRows(steps) {
  const n = (k) => steps.find((e) => e.k === k)?.players;
  const rows = [[1, null, n('stage1')], [3, null, n('stage3')], [5, null, n('stage5')], [10, n('boss1_try'), n('boss1_win')], [20, null, n('stage20')]];
  return rows.filter(([, p, c]) => p != null || c != null).map(([s, p, c]) => ({ s, label: stageLabel(s), boss: !!bossOf(s), players: p ?? null, cleared: c ?? null,
    rate: p && c != null ? c / p : null, attempts: null, dpa: null, med: null, lo: null, hi: null, left: null, cause: null, causes: [], ab: {} }));
}
/** the stages that cost the most deaths per attempt (at least `min` attempts), hardest first */
export function hardest(rows, n = 3, min = 10) {
  return rows.filter((r) => r.dpa != null && r.attempts >= min).sort((a, b) => b.dpa - a.dpa || a.s - b.s).slice(0, n);
}
/** highest cleared stage groups: [key, label, from, to] */
export const HI_GROUPS = [['0', 'Hiç geçemedi', 0, 0], ['1', '1', 1, 1], ['2', '2', 2, 2], ['3', '3', 3, 3], ['4-5', '4–5', 4, 5], ['6-9', '6–9', 6, 9],
  ['10-19', '10–19', 10, 19], ['20-29', '20–29', 20, 29], ['30-49', '30–49', 30, 49], ['50-99', '50–99', 50, 99], ['100', '100 (yolun sonu)', 100, 100]];
export function hiGroups(hist) {
  const out = Object.fromEntries(HI_GROUPS.map(([k]) => [k, 0]));
  for (const [h, n] of Object.entries(hist || {})) { const g = HI_GROUPS.find(([, , a, b]) => +h >= a && +h <= b); if (g) out[g[0]] += n; }
  return out;
}
/** the highest stage the median player cleared */
export function hiMedian(hist) {
  const list = Object.entries(hist || {}).map(([h, n]) => [+h, +n]).sort((a, b) => a[0] - b[0]);
  const tot = list.reduce((a, [, n]) => a + n, 0);
  let cum = 0;
  for (const [h, n] of list) { cum += n; if (cum >= tot / 2) return h; }
  return null;
}

// ------------------------------------------------------------------ the cards
// The node lives on between the tab's repaints (like the top players card): it asks again when the period changes or
// the tab is repainted more than 12 seconds after the last answer.
const K = { node: null, key: '', data: null, err: null, at: 0, seq: 0, busy: false, steps: [], range: null };
export function mount(host, { from, to, steps = [], filtered = false }) {
  if (!host) return;
  if (!K.node) {
    K.node = document.createElement('div');
    K.node.dataset.block = 'kf';
    K.node.dataset.testid = 'kf';
    K.node.style.marginTop = '12px';
  }
  host.replaceWith(K.node);
  K.steps = steps;
  K.filtered = filtered;
  const key = `${from}|${to}`;
  if (key !== K.key) { K.seq++; Object.assign(K, { key, range: { from, to }, data: null, err: null, at: 0, busy: false }); }
  paint();
  if (!K.busy && Date.now() - K.at > 12000) load();
}
async function load() {
  const my = ++K.seq;
  K.busy = true;
  if (K.data) K.node?.classList.add('stale');
  try {
    const d = await C.rpc('st_kf_stages', { p_from: K.range.from, p_to: K.range.to });
    if (my !== K.seq) return;
    Object.assign(K, { data: d, err: null, at: Date.now() });
  } catch (e) {
    if (my !== K.seq) return;
    Object.assign(K, { err: e, at: Date.now() });
  } finally { if (my === K.seq) K.busy = false; }
  K.node?.classList.remove('stale');
  paint();
}

const pctTxt = (v) => (v == null ? '—' : `%${Math.round(100 * v)}`);
const n0 = (v) => (v == null ? '—' : C.fmtN(v));
const dec = (v) => (v == null ? '—' : Number(v).toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }));

function paint() {
  const el = K.node;
  if (!el || !el.isConnected) return;
  const esc = C.esc, A = K.data;
  if (!A && !K.err) { el.innerHTML = `<article class="card"><h3>Bölümler</h3><p class="muted small">Bölüm sayıları geliyor…</p></article>`; return; }
  const missing = !!(K.err && K.err.missing);
  if (K.err && !missing) { el.innerHTML = `<article class="card"><h3>Bölümler</h3><div class="warn-box">${esc(C.friendly(K.err))}</div></article>`; return; }
  // before stats11.sql, or before any 1.0.2 data: the 1.0.1 steps of the funnel answer
  const fresh = A ? stageRows(A) : [];
  const fromSteps = !fresh.length;
  const rows = fromSteps ? milestoneRows(K.steps || []) : fresh;
  const notes = [];
  if (missing) notes.push('<div class="warn-box" data-testid="kf-missing">Bölüm ayrıntısının sunucu kurulumu henüz yapılmadı (supabase/studio/stats11.sql). Şimdilik yalnız oyunun 1, 3, 5, 10 ve 20. bölüm adımları görünüyor.</div>');
  else if (A && !A.since) notes.push('<p class="note small" data-testid="kf-waiting">1.0.2 sürümünün bölüm verisi henüz gelmedi. Şimdilik yalnız 1, 3, 5, 10 ve 20. bölüm adımları görünüyor; 1.0.2 oynandıkça her bölüm dolacak.</p>');
  else if (A && A.since > A.counted_from) notes.push(`<p class="note small">Bölüm verisi ${esc(C.dayLabel(A.since))}'den beri geliyor (1.0.2); öncesinde yalnız 1, 3, 5, 10, 20. bölüm adımları var.</p>`);
  if (A && A.counted_from > A.from) notes.push(`<p class="note small">Bölüm kayıtları 30 gün tutulur: ${esc(C.dayLabel(A.counted_from))} öncesi sayılmadı.</p>`);
  if (K.filtered) notes.push('<p class="note small">Bölüm kartları süzgeçsiz gösteriliyor.</p>');

  el.innerHTML = notes.join('') + stagesCard(rows, fromSteps) + (A && !fromSteps ? highestCard(A) + bossCard(rows) : fromSteps && A ? highestCard(A) : '');
}

function stagesCard(rows, fromSteps) {
  const esc = C.esc;
  const hard = new Set(hardest(rows).map((r) => r.s));
  const help = 'Her bölüm için: kaç oyuncu oynadı ve kaçı geçti; kaç kez denendi ve deneme başına kaç kez ölündü (zorluk); geçenlerin süresi '
    + '(ortanca: oyuncuların yarısı bundan kısa sürede geçti; çoğu: oyuncuların ortadaki yarısı bu aralıkta); "Burada bıraktı": dönemde en son bu '
    + 'bölümdeyken geçemeden oyunu bırakan oyuncu; en çok neyin öldürdüğü. "zor" işareti: deneme başına en çok ölünen üç bölüm (en az 10 deneme olanlar arasından).';
  const head = ['Bölüm', 'Oynayan', 'Geçen', 'Geçme oranı', 'Deneme', 'Ölüm / deneme', 'Süre (ortanca)', 'Çoğu', 'Burada bıraktı', 'En çok öldüren'];
  const csvRows = rows.map((r) => [r.label, r.players ?? '', r.cleared ?? '', r.rate == null ? '' : Math.round(100 * r.rate), r.attempts ?? '',
    r.dpa == null ? '' : Math.round(r.dpa * 100) / 100, r.med == null ? '' : Math.round(r.med), r.lo == null ? '' : `${Math.round(r.lo)}-${Math.round(r.hi)}`,
    r.left ?? '', r.cause ? causeName(r.cause) : '']);
  const csv = rows.length ? C.csvButton('kf-stages', C.fileName('bolumler'), ['Bölüm', 'Oynayan', 'Geçen', 'Geçme oranı (%)', 'Deneme', 'Ölüm / deneme', 'Süre ortanca (sn)', 'Çoğu (sn)', 'Burada bıraktı', 'En çok öldüren'], csvRows) : '';
  // the plain-words summary above the table
  const lines = [];
  const H = hardest(rows);
  if (H.length) lines.push(`<li><b>En zor:</b> ${H.map((r) => `${esc(stageLabel(r.s))} <span class="muted">(deneme başına ${esc(dec(r.dpa))} ölüm)</span>`).join(', ')}</li>`);
  const L = rows.filter((r) => r.left).sort((a, b) => b.left - a.left || a.s - b.s).slice(0, 3);
  if (L.length) lines.push(`<li><b>En çok bırakılan yer:</b> ${L.map((r) => `${esc(stageLabel(r.s))} <span class="muted">(${C.fmtN(r.left)} oyuncu)</span>`).join(', ')}</li>`);
  const far = rows.filter((r) => r.cleared).at(-1);
  if (far) lines.push(`<li><b>Geçilen en ileri bölüm:</b> ${esc(stageLabel(far.s))}</li>`);
  const body = rows.length ? `${lines.length ? `<ul class="kf-sum" data-testid="kf-summary">${lines.join('')}</ul>` : ''}
    <div class="scroll-x"><table class="an-t kf-t" data-testid="kf-stages"><thead><tr>${head.map((h, i) => `<th${i && i < head.length - 1 ? ' class="n"' : ''}>${esc(h)}</th>`).join('')}</tr></thead><tbody>
    ${rows.map((r) => `<tr data-s="${r.s}"${r.boss ? ' class="kf-boss"' : ''}>
      <td class="kf-st">${esc(r.label)}${r.boss ? ' <span class="badge">patron</span>' : ''}${hard.has(r.s) ? ' <span class="badge del">zor</span>' : ''}</td>
      <td class="n num">${n0(r.players)}</td><td class="n num">${n0(r.cleared)}</td><td class="n num">${pctTxt(r.rate)}</td>
      <td class="n num">${n0(r.attempts)}</td><td class="n num">${esc(dec(r.dpa))}</td>
      <td class="n num">${r.med == null ? '—' : '≈ ' + esc(durRound(r.med))}</td><td class="n num">${r.lo == null ? '—' : `${esc(durRound(r.lo))} – ${esc(durRound(r.hi))}`}</td>
      <td class="n num">${n0(r.left)}</td><td>${r.cause ? esc(causeName(r.cause)) : '<span class="muted">—</span>'}</td></tr>`).join('')}
    </tbody></table></div>` : '<p class="muted small" data-testid="kf-empty">Bu dönemde bölüm verisi yok.</p>';
  const title = fromSteps ? 'Bölümler (1.0.1 adımları)' : 'Bölümler';
  return `<article class="card" data-block="kf-stages"><div class="row"><h3>${esc(title)} ${C.info(help)}</h3>${csv}</div>${body}</article>`;
}

function highestCard(A) {
  const esc = C.esc, H = A.highest || { players: 0, hist: {}, top: [] };
  const help = 'Her oyuncunun geçtiği en yüksek bölüm (dönemde görülen; 1.0.2 her açılışta kaydın en yüksek bölümünü de gönderir, 1.0.1 oyuncuları da böyle görünür). '
    + 'Kim olduğu yoktur: her oyuncunun kısa bir etiketi var ("Oyuncu K7QD"), oturum listesindekiyle aynı. Satıra dokununca oyuncunun son 7 günü açılır.';
  const g = hiGroups(H.hist), med = hiMedian(H.hist);
  const bars = H.players ? C.barList(HI_GROUPS.map(([k, t]) => ({ label: t, value: g[k], text: `${C.fmtN(g[k])} · ${pctTxt(H.players ? g[k] / H.players : 0)}` })), { max: Math.max(1, ...Object.values(g)) }) : '';
  const top = (H.top || []).length ? `<div class="scroll-x"><table class="an-t an-top kf-top" data-testid="kf-top"><thead><tr><th>Oyuncu</th><th class="n">En yüksek</th><th class="n">Deneme</th><th class="n">Son oynama</th></tr></thead><tbody>
    ${H.top.map((p) => `<tr data-act="an-top-player" data-game="${KF_GAME}" data-tag="${esc(p.tag)}"><td class="tp-who"><span class="muted num tp-rank">${C.fmtN(p.rank)}</span> <button type="button" class="linkish" data-act="an-top-player" data-game="${KF_GAME}" data-tag="${esc(p.tag)}">Oyuncu ${esc(p.tag)}</button></td>
      <td class="n num"><b>${C.fmtN(p.hi)}</b>${bossOf(p.hi) ? ' <span class="badge">patron</span>' : ''}</td><td class="n num">${C.fmtN(p.attempts)}</td><td class="n num">${esc(C.dayLabel(p.last))}</td></tr>`).join('')}</tbody></table></div>` : '';
  const csv = (H.top || []).length ? C.csvButton('kf-top', C.fileName('en-yuksek-bolum'), ['Sıra', 'Oyuncu', 'En yüksek bölüm', 'Deneme', 'Son oynama'], H.top.map((p) => [p.rank, `Oyuncu ${p.tag}`, p.hi, p.attempts, p.last])) : '';
  const sum = H.players ? `<p class="small" data-testid="kf-hi-sum"><b class="num">${C.fmtN(H.players)}</b> oyuncu · oyuncuların yarısı en az <b>${esc(String(med))}.</b> bölüme kadar geçti</p>` : '';
  return `<div class="grid wide" style="margin-top:12px"><article class="card" data-block="kf-highest"><div class="row"><h3>En yüksek bölüm ${C.info(help)}</h3></div>
      ${H.players ? sum + bars : '<p class="muted small">Bu dönemde veri yok.</p>'}</article>
    <article class="card" data-block="kf-top"><div class="row"><h3>En ileri giden 20 oyuncu</h3>${csv}</div>${top || '<p class="muted small">Bu dönemde veri yok.</p>'}</article></div>`;
}

function bossCard(rows) {
  const esc = C.esc;
  const B = rows.filter((r) => r.boss);
  const help = 'Her patron bölümünde (10, 20 … 100): kaç oyuncu girdi, kaçı yendi; ilk galibiyete kadar kaç deneme sürdü (bu cihazda 1.0.2 ile sayılır; '
    + 'ortanca: oyuncuların yarısı bu kadar ya da daha az denemede yendi) ve en çok neyin öldürdüğü.';
  const dist = (ab) => KATANA.trySteps.filter((k) => ab[k]).map((k) => `${tryLabel(k)}: ${C.fmtN(ab[k])}`).join(' · ');
  const body = B.length ? `<div class="scroll-x"><table class="an-t kf-boss-t" data-testid="kf-bosses"><thead><tr><th>Patron</th><th class="n">Giren</th><th class="n">Yenen</th>
      <th class="n">İlk galibiyete kadar deneme</th><th>Dağılım (deneme: oyuncu)</th><th>En çok öldüren</th></tr></thead><tbody>
    ${B.map((r) => { const m = tryMedian(r.ab); return `<tr data-s="${r.s}"><td>${esc(r.label)}</td><td class="n num">${n0(r.players)}</td><td class="n num">${n0(r.cleared)}</td>
      <td class="n num">${m == null ? '—' : `${esc(tryLabel(m))} <span class="muted">(ortanca)</span>`}</td><td class="small">${esc(dist(r.ab)) || '<span class="muted">—</span>'}</td>
      <td>${r.causes.length ? r.causes.map((c) => `${esc(causeName(c.c))} <span class="muted">${C.fmtN(c.n)}</span>`).join(', ') : '<span class="muted">—</span>'}</td></tr>`; }).join('')}
    </tbody></table></div>` : '<p class="muted small" data-testid="kf-bosses-empty">Bu dönemde patron bölümü oynanmadı.</p>';
  return `<div style="margin-top:12px"><article class="card" data-block="kf-bosses"><div class="row"><h3>Patronlar ${C.info(help)}</h3></div>${body}</article></div>`;
}
