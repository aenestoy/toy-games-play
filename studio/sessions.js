// Studio panel — the session list in İstatistik → Canlı (docs/STUDYO-PANELI.md, "Oturumlar"). It replaced the earlier
// "Şu an açık oturumlar" table: every raw session the server still keeps (≈ 48 hours), newest first, a page at a time,
// with filters above it (country first, then device, portal, version, new / returning, day, playing now) that show how
// many sessions each value has. Players are anonymous: a short tag ("Oyuncu K7QD") the server derives one way from the
// browser's random install id; a tap shows that player's last days. Server: supabase/studio/stats9.sql
// (st_sessions_list, st_session_player). Before stats9.sql the old table is shown (analytics.js passes it in).
// The player drawer (openPlayer) and the flag / portal names are shared with İstatistik → Oyuncular → "En çok
// oynayanlar" (analytics.js, stats10.sql).

let C = null;
export function init(ctx) { C = ctx; }

const PAGE = 50;
const ST = { game: undefined, filters: {}, rows: [], data: null, err: null, more: false, node: null, at: 0, seq: 0, fallback: '', busy: false };
const esc = (s) => C.esc(s);
const DIMS = [['country', 'Ülke'], ['device', 'Cihaz'], ['portal', 'Portal'], ['ver', 'Sürüm'], ['seg', 'Oyuncu'], ['day', 'Gün'], ['acct', 'Hesap'], ['rk', 'Dereceli']];
// The two coarse tags a game may send with its beats (stats12.sql; Shadow Duel 1.4): CrazyGames account and ranked
// tier family. null = not sent (an older version, or a game that does not send them): "—". Filter value 'unknown' = null.
export const ACCT = [['account', 'CG hesabı'], ['guest', 'Misafir'], ['na', 'Diğer portal']];
export const RANKS = [['none', 'Dereceli yok'], ['placement', 'Yerleştirmede'], ['ashigaru', 'Ashigaru'], ['ronin', 'Rōnin'], ['samurai', 'Samurai'],
  ['hatamoto', 'Hatamoto'], ['daimyo', 'Daimyō'], ['shogun', 'Shōgun']];
const TAG_UNKNOWN = 'Bilinmiyor (eski sürüm)';
const tagName = (list, k) => (k === 'unknown' ? TAG_UNKNOWN : (list.find(([v]) => v === k) || [k, k])[1]);
/** the two tag chips of a session or a player ("CG hesabı", "Samurai"); both unknown: one muted "—" */
export function tagChips(acct, rk) {
  const h = 'Hesap: CG hesabı = CrazyGames hesabıyla girmiş, Misafir = CrazyGames’te hesapsız, Diğer portal = hesabı olmayan yer (kendi sitemiz). Dereceli: oyuncunun dereceli kademesi.';
  if (acct == null && rk == null) return `<span class="badge tg off" title="${esc('Hesap ve dereceli bilinmiyor (eski sürüm ya da bu oyun göndermiyor)')}">—</span>`;
  const a = acct == null ? '<span class="badge tg off" title="Hesap bilinmiyor">—</span>'
    : `<span class="badge tg${acct === 'account' ? ' on' : acct === 'na' ? ' off' : ''}" data-acct="${esc(acct)}" title="${esc(h)}">${esc(tagName(ACCT, acct))}</span>`;
  const r = rk == null ? '<span class="badge tg off" title="Dereceli bilinmiyor">—</span>'
    : `<span class="badge tg rk${rk === 'none' ? ' off' : ''}" data-rk="${esc(rk)}" title="${esc(h)}">${esc(tagName(RANKS, rk))}</span>`;
  return a + r;
}
/** a tag select's options in a fixed order: [value, label] (… plus "Bilinmiyor") */
export const tagOptions = (dim) => [...(dim === 'acct' ? ACCT : RANKS), ['unknown', TAG_UNKNOWN]];
const PLAT = { playgama: 'Playgama', yandex: 'Yandex', googleplay: 'Play Store' };
const tz = { timeZone: 'Europe/Istanbul' };
const dayOf = (t) => new Intl.DateTimeFormat('en-CA', { ...tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(t));
const hm = (t) => new Intl.DateTimeFormat('tr-TR', { ...tz, hour: '2-digit', minute: '2-digit' }).format(new Date(t));
export const flag = (cc) => (/^[A-Z]{2}$/.test(cc || '') ? String.fromCodePoint(...[...cc].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)) : '');
/** a portal's plain name (CrazyGames, Kendi sitemiz, Playgama…) */
export const portalName = (k) => C.PORTAL[k] || PLAT[k] || k;
function keyName(dim, k) {
  if (dim === 'country') return C.regionName(k);
  if (dim === 'device') return C.DEVICE[k] || k;
  if (dim === 'portal') return portalName(k);
  if (dim === 'seg') return k === 'new' ? 'Yeni' : 'Dönen';
  if (dim === 'game') return C.titleOf({ game: k });
  if (dim === 'acct') return tagName(ACCT, k);
  if (dim === 'rk') return tagName(RANKS, k);
  if (dim === 'day') { const t = ST.data?.today; return k === t ? 'Bugün' : t && k === new Date(Date.parse(t + 'T12:00:00Z') - 864e5).toISOString().slice(0, 10) ? 'Dün' : C.dayLabel(k); }
  return k || '?';
}
const dims = () => (ST.game ? DIMS : [['game', 'Oyun'], ...DIMS]);

// A live player's device line (stats17.sql st_hw_attach; Riftborn sends it, games/12-riftborn/src/rb-device.js): the graphics
// chip (◆ separate card, ◇ built in), phone / computer, the quality preset and the auto-quality step, the median fps of the
// last ~30 s; red when under 30 fps or the 3D drawing was lost. Only what is known; the CPU as "N çekirdek".
const HW_CLS = { discrete: ['◆', 'Ayrı ekran kartı'], integrated: ['◇', 'Dahili ekran kartı'], software: ['⚠', 'Yazılımla çizim (ekran kartı kullanılmıyor)'] };
const HW_FAM = { 'nvidia-rtx': 'NVIDIA RTX', 'nvidia-gtx': 'NVIDIA GTX', 'nvidia-other': 'NVIDIA', 'amd-radeon': 'AMD Radeon', 'amd-apu': 'AMD (işlemci içi)', 'amd-other': 'AMD',
  'intel-arc': 'Intel Arc', 'intel-iris': 'Intel Iris', 'intel-uhd': 'Intel UHD', 'intel-hd': 'Intel HD', 'intel-other': 'Intel', 'apple-m': 'Apple M', apple: 'Apple', mali: 'Mali',
  adreno: 'Adreno', powervr: 'PowerVR', xclipse: 'Samsung Xclipse', software: 'Yazılım', other: 'Diğer' };
const HW_FORM = { desktop: 'Bilgisayar', mobile: 'Telefon', tablet: 'Tablet' };
const HW_Q = { low: 'Düşük', balanced: 'Dengeli', high: 'Yüksek', custom: 'Özel' };
export function hwLine(h) {
  if (!h || typeof h !== 'object') return '';
  const [ic, it] = HW_CLS[h.cls] || ['', ''];
  const gpu = h.gpu || HW_FAM[h.fam] || '';
  const slow = (h.fps != null && h.fps < 30) || h.lost === true;
  const parts = [
    gpu ? `${ic ? `<span title="${esc(it)}" aria-label="${esc(it)}">${ic}</span> ` : ''}${esc(gpu)}` : '',
    h.form ? esc(HW_FORM[h.form] || h.form) : '',
    h.model ? esc(h.model) : '',
    h.cores ? esc(`${h.cores} çekirdek${h.mem ? ` · ${h.mem >= 8 ? '8 GB+' : `${String(h.mem).replace('.', ',')} GB`}` : ''}`) : '',
    h.qp || h.aq != null ? esc(`Kalite: ${HW_Q[h.qp] || h.qp || '?'}${h.aq ? `, oto −${h.aq}` : ''}`) : '',
    h.fps != null ? `<b class="num">${esc(String(h.fps))}</b> kare/sn` : '',
    h.lost ? '<b>3B çizim kayboldu</b>' : '',
  ].filter(Boolean);
  if (!parts.length) return '';
  return `<div class="ss-hw small${slow ? ' slow' : ''}" data-testid="ss-hw">${slow ? '<span class="ss-hw-bad" title="30 kare/sn altı ya da 3B çizim kayboldu" aria-label="yavaş">●</span> ' : ''}${parts.join(' · ')}</div>`;
}

/** put the list into the Canlı tab (its node lives on between the tab's 15-second repaints, so filters stay as they are) */
export function attach(host, game, fallbackHtml) {
  if (!host) return;
  if (ST.game !== game) Object.assign(ST, { game, filters: {}, rows: [], data: null, err: null, more: false, at: 0 });
  if (!ST.node) {
    ST.node = document.createElement('article');
    ST.node.className = 'card ss';
    ST.node.dataset.testid = 'an-sessions';
    ST.node.style.marginTop = '12px';
  }
  ST.fallback = fallbackHtml || '';
  host.replaceWith(ST.node);
  paint();
  if (!ST.busy && Date.now() - ST.at > 12000) load();
}
export const __test = { ST };

const args = (before, limit) => {
  const f = {};
  for (const [d] of dims()) if (ST.filters[d]) f[d] = [ST.filters[d]];
  if (ST.filters.live) f.live = true;
  return { p_game: ST.game, p_filters: f, p_before: before, p_limit: limit };
};
/** the first page again (as many rows as are shown, at most 500), e.g. every 15 seconds or after a filter */
async function load() {
  const my = ++ST.seq;
  ST.busy = true;
  try {
    const data = await C.rpc('st_sessions_list', args(null, Math.min(500, Math.max(PAGE, ST.rows.length))));
    if (my !== ST.seq) return;
    Object.assign(ST, { data, rows: data.sessions || [], more: !!data.more, err: null, at: Date.now() });
  } catch (e) {
    if (my !== ST.seq) return;
    ST.err = e; ST.at = Date.now();
  } finally { if (my === ST.seq) ST.busy = false; }
  paint();
}
async function loadMore(btn) {
  const last = ST.rows.at(-1);
  if (!last) return;
  btn.disabled = true;
  const my = ++ST.seq;
  try {
    const data = await C.rpc('st_sessions_list', args(last.started_at, PAGE));
    if (my !== ST.seq) return;
    ST.rows = ST.rows.concat(data.sessions || []);
    ST.more = !!data.more;
  } catch (e) { if (my === ST.seq) alert(C.friendly(e)); }
  paint();
}

function paint() {
  const el = ST.node;
  if (!el) return;
  // a filter list is open: draw when it closes (a repaint would close it under the finger)
  if (el.contains(document.activeElement) && document.activeElement.matches('select')) { ST.pending = true; return; }
  ST.pending = false;
  const info = (t) => `<details class="an-i"><summary aria-label="Açıklama">ⓘ</summary><p>${esc(t)}</p></details>`;
  if (ST.err && ST.err.missing) { el.innerHTML = ST.fallback || ''; el.classList.remove('card'); return; }
  el.classList.add('card');
  const A = ST.data;
  const head = `<div class="row"><h3>Oturumlar ${info('Oyunun her açılışı bir oturum, en yenisi üstte. Kim olduğu yoktur: her oyuncunun kısa bir etiketi var ("Oyuncu K7QD"); aynı etiket aynı tarayıcıdaki aynı oyuncu. Etikete dokununca son günleri açılır. Sunucu ayrıntılı oturumları 48 saat tutar.')}</h3>
    ${A ? `<span class="small muted num" data-testid="ss-count">${C.fmtN(A.total)} oturum${A.live_total ? ` · <span class="live-dot" aria-hidden="true"></span>${C.fmtN(A.live_total)} şu an oynuyor` : ''}</span>` : ''}</div>`;
  if (!A) { el.innerHTML = head + (ST.err ? `<div class="warn-box">${esc(C.friendly(ST.err))}</div>` : '<p class="muted small">Oturumlar geliyor…</p>'); return; }
  const F = A.facets || {};
  const any = dims().some(([d]) => ST.filters[d]) || ST.filters.live;
  const sel = ([d, t]) => {
    const tag = d === 'acct' || d === 'rk';
    // the tag filters only once some session carries a tag (a server before stats12.sql, or a game that sends none: no select)
    if (tag && !ST.filters[d] && !(F[d] || []).some((x) => x.k !== 'unknown')) return '';
    const list = (F[d] || []).slice();
    if (ST.filters[d] && !list.some((x) => x.k === ST.filters[d])) list.unshift({ k: ST.filters[d], n: 0 });
    if (d === 'day') list.sort((a, b) => (a.k < b.k ? 1 : -1));
    if (tag) { const o = tagOptions(d).map(([v]) => v); list.sort((a, b) => o.indexOf(a.k) - o.indexOf(b.k)); }
    return `<label class="ss-f${ST.filters[d] ? ' on' : ''}"><span>${t}</span><select data-ssf="${d}" aria-label="${t}"><option value="">Hepsi</option>${list.map((x) => `<option value="${esc(x.k)}" ${x.k === ST.filters[d] ? 'selected' : ''}>${esc(`${d === 'country' ? `${flag(x.k)} ` : ''}${keyName(d, x.k)} ${C.fmtN(x.n)}`)}</option>`).join('')}</select></label>`;
  };
  const filters = `<div class="ss-filters" data-testid="ss-filters">${dims().map(sel).join('')}
    <button type="button" class="cb-chip${ST.filters.live ? ' on' : ''}" data-act="ss-live" aria-pressed="${!!ST.filters.live}"><span class="live-dot" aria-hidden="true"></span>Şu an oynayan</button>
    ${any ? '<button type="button" class="ghost small" data-act="ss-clear" data-testid="ss-clear">✕ Süzgeçleri temizle</button>' : ''}</div>`;
  const today = A.today;
  const row = (s) => {
    const sd = dayOf(s.started_at), ed = dayOf(s.last_at);
    const when = `${sd !== today ? `<span class="muted">${esc(C.dayLabel(sd))}</span> ` : ''}<b class="num">${hm(s.started_at)}</b> → ${s.live ? '<b>şimdi</b>' : `<span class="num">${ed !== sd ? `${esc(C.dayLabel(ed))} ` : ''}${hm(s.last_at)}</span>`}`;
    const scr = C.screenName(s.screen, s.game);
    return `<li class="ss-row${s.live ? ' live' : ''}" data-tag="${esc(s.tag)}" data-game="${esc(s.game)}">
      <div class="ss-when">${s.live ? '<span class="live-dot" aria-label="şu an oynuyor"></span>' : ''}${when} <span class="muted num" title="${esc(`oyun ekranda: ${C.fmtDur(s.play_s)}`)}">· ${esc(C.fmtDur(s.wall_s))}</span></div>
      <div class="ss-who"><button type="button" class="linkish" data-act="ss-player" data-tag="${esc(s.tag)}" data-game="${esc(s.game)}">Oyuncu ${esc(s.tag)}</button>
        <span class="badge${s.new ? ' on' : ''}">${s.new ? 'yeni' : 'dönen'}</span>${'acct' in s || 'rk' in s ? `<span class="tg-pair" data-testid="ss-tags">${tagChips(s.acct, s.rk)}</span>` : ''}${s.today_n > 1 ? `<span class="small muted">bugün ${C.fmtN(s.today_n)} oturum</span>` : ''}${ST.game ? '' : `<span class="small">${esc(C.titleOf({ game: s.game }))}</span>`}</div>
      <div class="ss-meta small">${esc(`${flag(s.country)} ${C.regionName(s.country)}`)} · ${esc(C.DEVICE[s.device] || s.device)} · ${esc(C.PORTAL[s.portal] || s.portal)} · ${esc(s.ver)} · ${s.live ? 'şu an' : 'çıkış'}: ${esc(scr)}</div>${s.live ? hwLine(s.hw) : ''}</li>`;
  };
  const left = A.total - ST.rows.length;
  el.innerHTML = `${head}${filters}
    ${ST.rows.length ? `<ul class="ss-list" data-testid="ss-list">${ST.rows.map(row).join('')}</ul>` : `<p class="muted small" data-testid="ss-empty">${any ? 'Bu süzgeçle oturum yok.' : 'Henüz oturum yok.'}</p>`}
    ${ST.more ? `<button type="button" class="btn" data-act="ss-more" data-testid="ss-more" style="margin-top:8px">Daha fazla göster${left > 0 ? ` (${C.fmtN(left)} kaldı)` : ''}</button>` : ''}
    <p class="small muted" style="margin:8px 0 0">Saatler Türkiye saatiyle. Sunucu ayrıntılı oturumları 48 saat tutar${A.since ? `; en eskisi ${esc(C.dayLabel(dayOf(A.since)))} ${hm(A.since)}` : ''}.</p>`;
}

/** one player's last days: raw sessions (≈ 48 h) and day totals for 7 days; withGame: name the game in the title (studio page) */
export async function openPlayer(game, tag, withGame = !ST.game) {
  const d = document.getElementById('dlg');
  if (!d) return;
  d.classList.add('drawer');
  d.addEventListener('close', () => d.classList.remove('drawer'), { once: true });
  const frame = (body) => `<div class="d-head"><h2 id="dlgTitle">Oyuncu ${esc(tag)}${withGame ? ` · ${esc(C.titleOf({ game }))}` : ''}</h2><button class="ghost x" type="button" data-act="dlg-close" aria-label="Kapat">✕</button></div><div class="d-body" data-testid="ss-player">${body}</div>`;
  d.innerHTML = frame('<p class="muted">Yükleniyor…</p>');
  if (!d.open) d.showModal();
  let r;
  try { r = await C.rpc('st_session_player', { p_game: game, p_tag: tag }); } catch (e) { d.innerHTML = frame(`<div class="warn-box">${esc(C.friendly(e))}</div>`); return; }
  const by = new Map();
  for (const s of r.sessions || []) { const k = dayOf(s.started_at); if (!by.has(k)) by.set(k, []); by.get(k).push(s); }
  d.innerHTML = frame(`<p class="small muted" style="margin:0 0 8px">${r.first_day ? `İlk geldiği gün ${esc(C.dayLabel(r.first_day))}` : 'İlk geldiği gün bilinmiyor'}${r.matches > 1 ? ` · bu etiketi ${C.fmtN(r.matches)} kurulum taşıyor (rastlantı), birlikte gösteriliyor` : ''}. Kim olduğu yoktur.</p>
    <div class="sub-h">Son 7 gün</div>
    ${(r.days || []).length ? `<table data-testid="ss-days"><thead><tr><th>Gün</th><th class="n">Oturum</th><th class="n">Oyun süresi</th></tr></thead><tbody>${r.days.map((x) => `<tr><td>${esc(C.dayLabel(x.day))}</td><td class="n num">${C.fmtN(x.sessions)}</td><td class="n num">${esc(C.fmtDur(x.play_s))}</td></tr>`).join('')}</tbody></table>` : '<p class="muted small">Bu 7 günde kayıt yok.</p>'}
    <div class="sub-h">Oturumlar (son 48 saat)</div>
    ${by.size ? [...by].map(([day, list]) => `<p class="small" style="margin:8px 0 2px"><b>${esc(C.dayLabel(day))}</b></p><ul class="ss-list compact">${list.map((s) => `<li class="ss-row${s.live ? ' live' : ''}"><div class="ss-when">${s.live ? '<span class="live-dot"></span>' : ''}<b class="num">${hm(s.started_at)}</b> → ${s.live ? '<b>şimdi</b>' : `<span class="num">${hm(s.last_at)}</span>`} <span class="muted">· ${esc(C.fmtDur(s.wall_s))}</span></div>
      <div class="ss-meta small">${esc(`${flag(s.country)} ${C.regionName(s.country)}`)} · ${esc(C.DEVICE[s.device] || s.device)} · ${esc(C.PORTAL[s.portal] || s.portal)} · ${esc(s.ver)} · ${s.live ? 'şu an' : 'çıkış'}: ${esc(C.screenName(s.screen, game))}</div></li>`).join('')}</ul>`).join('') : '<p class="muted small">Son 48 saatte oturum yok (daha eskisi yalnız günlük özet olarak tutulur).</p>'}`);
}

document.addEventListener('change', (e) => {
  const t = e.target;
  if (!t.matches?.('[data-ssf]') || !ST.node || !ST.node.contains(t)) return;
  ST.filters = { ...ST.filters, [t.dataset.ssf]: t.value || undefined };
  ST.rows = [];
  load();
});
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-act^="ss-"]');
  if (!b || !ST.node || !ST.node.contains(b)) return;
  const a = b.dataset.act;
  if (a === 'ss-live') { ST.filters = { ...ST.filters, live: !ST.filters.live }; ST.rows = []; load(); }
  else if (a === 'ss-clear') { ST.filters = {}; ST.rows = []; load(); }
  else if (a === 'ss-more') loadMore(b);
  else if (a === 'ss-player') openPlayer(b.dataset.game, b.dataset.tag);
});
document.addEventListener('focusout', (e) => { if (ST.pending && ST.node && ST.node.contains(e.target)) setTimeout(paint, 0); });
