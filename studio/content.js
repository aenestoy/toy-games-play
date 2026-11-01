// Studio panel — a game's İçerik section: everything built for the game in one place, with pictures.
//   Truckstead → İçerik (docs/STUDYO-PANELI.md "İçerik (Truckstead)"), made by games/11-truckstead/scripts/panel-content.mjs
//   Shadow Duel → İçerik ("İçerik (Shadow Duel)"), made by games/06-shadow-duel/scripts/panel-content.mjs
//   Riftborn → İçerik ("İçerik (Riftborn)"), made by games/12-riftborn/scripts/panel-content.mjs
// The catalogue is a static file next to the panel:
//   content/<game>/catalog.json        groups → items { id, title, sub, status, tags, img, pics, blocks, audio, meter, models }
//                                      (+ optional head, summary)
//   content/<game>/img/<key>.webp       the larger picture (<key>-k.webp: the small one on the cards)
//   content/<game>/snd/<file>.mp3       the recorded sounds (a play button on the card)
//   content/<game>/model/<id>.glb       3D models (Shadow Duel; not in git, only in the private Worker copy): the details
//                                      show them in a viewer you can turn and zoom (vendor/model-viewer.min.js, loaded
//                                      only when such details open; the model itself too)
//   content/<game>/hareket/<ninja>.json the move gallery of a ninja (Shadow Duel → a ninja → Hareketler; made by
//                                      games/06-shadow-duel/scripts/panel-content.mjs from the game's own move choice):
//                                      every move with its name, input, group and two clips, hareket/<ninja>/<move>.mp4
//                                      (real speed) and <move>-y.mp4 (slow) + <move>.jpg (its picture before it plays);
//                                      the clips are not in git and only in the private Worker copy, like the models
//   item.news                           a block at the top of the details (Shadow Duel: a ninja's 3D production-line
//                                      model, games/06-shadow-duel/scripts/panel-hat.mjs): { h, p, video: { src, poster,
//                                      cap, size }, pics: [{ src, srcK, cap }] } - the video plays inline (tap: pause /
//                                      play), a picture opens big on a tap (tap again: real size, ✕ or Esc closes)
//   item.clip                           a short video of the item in the game (Riftborn: a 4 s clip per skill,
//                                      clip/<skill>.mp4, not in git, only in the private Worker copy): { src, poster, cap,
//                                      size } - plays muted in a loop at the top of the details (tap: pause / play); the
//                                      card shows a small "Video" mark
//   item.versions                       Shadow Duel Ninjalar 2B: a ninja's new 2D drawing, version by version (Akane;
//                                      games/06-shadow-duel/scripts/panel-2b-versions.mjs): { h, p, all: pic, list: [{ v,
//                                      when, h, p, pics: [pic], play, mark? }] } newest first (a trial not in the game yet: no
//                                      play link; mark: the card's tag instead of "Yeni <v>") (all.src2: the top row as a 2x2 grid for
//                                      narrow screens; the first row tile and each fold's first picture: the ninja's target) - the newest open, the older ones
//                                      folded; a picture opens big on a tap; play: the panel's game copy with that version
//                                      Truckstead Trafik araçları: each vehicle's look, version by version ("Sürümler";
//                                      games/11-truckstead/scripts/panel-vehicle-versions.mjs): the same shape with below
//                                      (under the main picture, not at the top), compact (the newest fold's pictures in
//                                      the grid too, not one per row) and mark '' (no tag on the card)
// No server call for the catalogue: the panel's Cloudflare Access lock and sign-in keep it private like the rest of the
// panel. The one server call: the move gallery's "bu hareket garip" marks (st_move_flags, supabase/studio/moves.sql).
// One group at a time (a row of group buttons), a filter-chip row per group (its own tags, then the statuses that
// occur in it); a tap on a card opens its details with the larger pictures.

export const CONTENT_BASE = 'content/truckstead/';
// Shadow Duel's pose / move editor (games/06-shadow-duel/poz.html; docs/SHADOW-DUEL-DUELLO.md "Poz düzenleyici"): a copy of
// the game with the editor inside the panel's content folder (content/shadow-duel/oyun/, made by
// games/06-shadow-duel/scripts/panel-poz.mjs, copied only into the private Worker folder). The editor keeps its edits in
// this browser and the copy's game reads them with ?pozlar=1: the same address (origin) as the panel, so both see them.
export const POZ_PAGE = 'oyun/poz.html';
/** the address of the editor on a ninja (and a move of the gallery; its states, reactions and choreography are not
 *  keyed poses: no link) — null when the move cannot be edited */
export function pozHref(base, ninja, move) {
  if (move && /^(g-|m-|r-|u-|chor-)/.test(move)) return null;
  return base + POZ_PAGE + '?ninja=' + encodeURIComponent(ninja) + (move ? '&move=' + encodeURIComponent(move) : '');
}
export const contentBase = (game) => `content/${game}/`;
// what this code can show; a catalogue made for newer code (its "ui" above this) asks for a page reload (a panel left open
// across a deploy keeps its old content.js in memory: it would show the new catalogue without the new parts)
// (3: a group's settings-only chip, `extraFilter`: Truckstead's Trafik araçları → Ayarlar)
// (3 also: Shadow Duel's Akane 2B drawing versions block, "Yeni çizim (deneme)")
// (4: Truckstead's traffic vehicles' "Sürümler": versions below the main picture, compact, no card tag)
// (5: Riftborn's skill clips, item.clip)
export const CT_UI = 6;
export const STATUS = {
  oyunda: ['Oyunda', 'ok'],
  kullanilmiyor: ['Oyunda değil', 'wait'],
  yapiliyor: ['Yapılıyor', 'wip'],
  planlandi: ['Planlandı', 'plan'],
  taslak: ['Taslak', 'draft'],
  beklemede: ['Beklemede', 'wait'],
};
export const STATUS_ORDER = ['oyunda', 'kullanilmiyor', 'yapiliyor', 'planlandi', 'taslak', 'beklemede'];
// a step of a piece of work (the 3D steps, the cinematics' newer forms): done on a branch is "Bitti", in the released game
// "Oyunda"
export const STEP = {
  oyunda: ['Oyunda', 'ok'],
  bitti: ['Bitti', 'ok'],
  yapiliyor: ['Yapılıyor', 'wip'],
  sorun: ['Sorunlu', 'bad'],
  planlandi: ['Planlandı', 'plan'],
  beklemede: ['Beklemede', 'wait'],
  yok: ['Yok', 'draft'],
};
// the move gallery's groups, in this order (games/06-shadow-duel/tools/move-gallery-page.js writes the keys)
export const MOVE_GROUPS = [['kesik', 'Kesikler'], ['tekme', 'Tekmeler'], ['savunma', 'Savunma'], ['hareket', 'Hareket'], ['ki', 'Ki ve atış'],
  ['silahsiz', 'Silahsız'], ['sinematik', 'Karşı saldırı sinematikleri'], ['koreo', 'Koreografili alışverişler'], ['tepki', 'Tepkiler']];
export const MOVE_NOTE_MAX = 500;
/** the moves a group chip keeps: '' all, a group key, 'flag' the marked ones (flags: a Set of move ids) */
export function filterMoves(moves, f, flags) {
  if (!f) return moves;
  if (f === 'flag') return moves.filter((m) => flags && flags.has(m.id));
  return moves.filter((m) => m.grp === f);
}
// the command that makes a game's catalogue (shown when it is missing)
const GEN = { truckstead: 'node games/11-truckstead/scripts/panel-content.mjs', 'shadow-duel': 'node games/06-shadow-duel/scripts/panel-content.mjs',
  riftborn: 'node games/12-riftborn/scripts/panel-content.mjs' };
const VIEWER = './vendor/model-viewer.min.js';
let viewerLoad = null;
/** model-viewer, once (an ES module that registers <model-viewer>); a failure lets the next opening try again */
export function loadViewer() {
  if (!viewerLoad) viewerLoad = import(new URL(VIEWER, import.meta.url).href).then(() => customElements.whenDefined('model-viewer')).catch((e) => { viewerLoad = null; throw e; });
  return viewerLoad;
}
export const mb = (n) => `${(n / 1048576).toFixed(1).replace('.', ',')} MB`;

/**
 * The items of a group that the filter keeps: '' all, a tag of the group, or 's:<status>'.
 */
export function filterItems(group, filter) {
  if (!filter) return group.items;
  if (filter.startsWith('s:')) return group.items.filter((it) => it.status === filter.slice(2));
  return group.items.filter((it) => (it.tags || []).includes(filter));
}

// extras: { <group id>: { mount(el, group, { only }) } } - a part of its own above a group's cards (Truckstead's Trafik araçları: the
// remote traffic settings' editor, ts-traffic.js); its clicks and keys are its own
export function createContent({ $, esc, store, fmtN, onPane, game = 'truckstead', title = 'Truckstead', extras = {}, rpc = null, live = null,
  friendly = (e) => (e && e.message) || 'Bir şey ters gitti.', fmtDateTime = (d) => new Date(d).toLocaleString('tr-TR') }) {
  const BASE = contentBase(game);
  // (Truckstead keeps its first keys: what this device remembered stays)
  const KEY = game === 'truckstead' ? 'studio.content' : `studio.content.${game}`;
  // (Shadow Duel: the 2D / 3D split of 2026-10-07 opens on its first group, "Ninjalar 2B", once - a new key)
  const GKEY = game === 'shadow-duel' ? KEY + '.group2b' : KEY + '.group';
  const requestedGroup = game === 'riftborn' ? new URLSearchParams(location.search).get('content-group') : null;
  const S = { cat: null, err: null, loading: false, group: requestedGroup || store.get(GKEY) || '', filter: {} };
  try { S.filter = JSON.parse(store.get(KEY + '.filter') || '{}') || {}; } catch { S.filter = {}; }
  if (requestedGroup) S.filter[requestedGroup] = '';
  if (game === 'riftborn') S.filter.monsters = '';
  const pic = (k, small) => `${BASE}img/${encodeURIComponent(k)}${small ? '-k' : ''}.webp`;
  // a picture of an item: a key in img/ (big and small), or a file of its own (src; srcK its small copy, else src for both)
  const picOf = (p, small) => (p.src ? BASE + (small && p.srcK ? p.srcK : p.src) : pic(p.k, small));
  const chip = (st) => { const s = STATUS[st] || [st, 'draft']; return `<span class="ct-st ${s[1]}" data-testid="ct-status">${esc(s[0])}</span>`; };
  const stepChip = (st) => { const s = STEP[st] || [st, 'draft']; return `<span class="ct-st ${s[1]}">${esc(s[0])}</span>`; };

  /** Fetches the catalogue (again: `again`); repaints only when it is new (a new run of the generator). */
  async function load(again = false) {
    if ((S.cat && !again) || S.loading) return;
    S.loading = true;
    let changed = false;
    try {
      const r = await fetch(BASE + 'catalog.json', { cache: 'no-cache' });
      if (!r.ok) throw new Error(String(r.status));
      const txt = await r.text(), c = JSON.parse(txt);
      // (the whole file, not only its "made": a catalogue patched after its run keeps the run's time)
      changed = !S.cat || txt !== S.txt;
      if (changed) { S.cat = c; S.txt = txt; }
      S.err = null;
    } catch (e) {
      changed = !S.cat;
      S.err = e;
    }
    S.loading = false;
    if (changed && onPane()) paint();
  }

  function groupOf() {
    const G = S.cat.groups;
    return G.find((g) => g.id === S.group) || G[0];
  }

  /** a row of small marks, one per step (the 3D steps of a ninja): done / in progress / problem / waiting */
  function meter(m) {
    if (!m || !m.steps) return '';
    const done = m.steps.filter((s) => s === 'bitti' || s === 'oyunda').length;
    const t = `${m.label}: ${done}/${m.steps.length} adım bitti`;
    return `<div class="ct-meter" title="${esc(t)}" aria-label="${esc(t)}" data-testid="ct-meter"><span>${esc(m.label)}</span>${m.steps.map((s) => `<i class="${(STEP[s] || [0, 'draft'])[1]}"></i>`).join('')}</div>`;
  }

  // (Riftborn: small live numbers from its in-game statistics, studio/panel/rb-cards.js contentLive; the group being painted)
  let liveGroup = '';
  function card(it, twin) {
    // (a ninja with a 3D model: its card shows the model - card.small, a private file next to the models)
    const src = it.card ? BASE + it.card.small : it.img ? pic(it.img, true) : '';
    const img = src ? `<div class="ct-pic${it.card ? ' ct-pic3d' : ''}${it.card?.close ? ' ct-pic-close' : ''}"><img src="${src}" alt="" loading="lazy" decoding="async" width="360" height="203"></div>` : '';
    const audio = it.audio ? `<audio class="ct-audio" controls preload="none" src="${BASE}${esc(it.audio)}" data-testid="ct-audio"></audio>` : '';
    const m3 = ((it.models && it.models.length) || it.gearPreview ? '<span class="ct-3dmark" title="3B modeli var" data-testid="ct-3dmark">3B</span>' : '')
      + (it.clip ? '<span class="ct-3dmark ct-clipmark" title="Oyundan kısa video var" data-testid="ct-clipmark">▶ Video</span>' : '');
    // (news at the top of its details - Akane's 3D production line - or of the same ninja's details in another group)
    // (a new 2D drawing being tried: its newest version's mark, next to the other group's news mark)
    // (mark '': no tag - Truckstead's traffic vehicles, whose versions are their look's history, not a trial)
    const v0 = it.versions && it.versions.list && it.versions.list[0];
    const nv = v0 && v0.mark !== '' ? `<span class="ct-newmark ct-vermark" title="${esc(it.versions.h || 'Yeni çizim')}" data-testid="ct-vermark">${esc(v0.mark || 'Yeni ' + v0.v)}</span>` : '';
    const nw = nv + (it.news ? `<span class="ct-newmark" title="${esc(it.news.h || 'Yeni')}" data-testid="ct-newmark">Yeni v1 →</span>`
      : twin ? `<span class="ct-newmark" title="${esc(twin.news.h || 'Yeni')} — ${esc(twin.g.title)}" data-testid="ct-newmark">${esc(twin.g.title.replace(/^Ninjalar /, ''))}'de yeni →</span>` : '');
    return `<article class="card ct-card${it.audio ? ' snd' : ''}" data-ct="${esc(it.id)}" tabindex="0" role="button" aria-label="${esc(it.title)}: ayrıntı">
      ${img}<div class="ct-body"><div class="ct-h"><h3>${esc(it.title)}${m3}${nw}</h3>${chip(it.status)}</div>${it.sub ? `<p class="small muted">${esc(it.sub)}</p>` : ''}${meter(it.meter)}${live ? live.card(it, liveGroup) : ''}${audio}${it.gearPreview && it.tags?.includes('chest') ? '<button type="button" class="btn ct-wear-card" data-gear-card>Karakterde 3B gör</button>' : ''}</div></article>`;
  }

  /** the same item in another group with a news block (Ninjalar 2B's Akane → her 3B details), or null */
  function twinOf(g, id) {
    for (const x of S.cat.groups) { if (x === g) continue; const t = x.items.find((i) => i.id === id && i.news); if (t) return { g: x, news: t.news }; }
    return null;
  }

  function paint() {
    const el = $('#pane');
    if (!el) return;
    if (!S.cat) {
      el.innerHTML = S.err
        ? `<div class="warn-box" data-testid="ct-error">İçerik listesi yüklenemedi (${esc(BASE)}catalog.json). Panel yeniden yüklenince gelir; dosya yoksa: <code>${esc(GEN[game] || '')}</code>.</div>`
        : '<p class="muted">İçerik geliyor…</p>';
      load();
      return;
    }
    const C = S.cat, g = groupOf();
    liveGroup = g.id;
    const f = S.filter[g.id] || '';
    // a group's own part (extras: the traffic settings editor) shows on "Hepsi" and alone - open, no cards - on its own
    // chip (g.extraFilter, a tag no card has: no count on it); a group without that chip shows it on every chip
    const xf = extras[g.id] && g.extraFilter, onlyExt = !!xf && f === xf;
    const showExt = !!extras[g.id] && (!xf || f === '' || onlyExt);
    const ownDetails = showExt && extras[g.id]?.replaceCards;
    const items = onlyExt || ownDetails ? [] : filterItems(g, f);
    const sts = STATUS_ORDER.filter((s) => g.items.some((it) => it.status === s));
    const chips = [['', `Hepsi ${fmtN(g.items.length)}`], ...g.filters.filter(([k]) => k !== g.extraFilter || xf).map(([k, t]) => [k, k === xf ? t : `${t} ${fmtN(filterItems(g, k).length)}`]),
      ...(sts.length > 1 ? sts.map((s) => ['s:' + s, `${STATUS[s][0]} ${fmtN(filterItems(g, 's:' + s).length)}`]) : [])];
    const made = C.made ? new Date(C.made).toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';
    // (a group's own summary - Shadow Duel's 2B and 3B - else the catalogue's; a row marked 'flags' is the live count of
    // the move gallery's open "garip" marks, filled in when they come)
    const SUM = ownDetails ? null : g.summary || (C.groups.some((x) => x.summary) ? null : C.summary);
    const flagsN = () => (MV.flagErr ? '—' : fmtN(MV.flags.size));
    const sum = SUM && SUM.length
      ? `<div class="ct-sum" data-testid="ct-summary" data-group="${esc(g.id)}">${SUM.map(([k, v, n, live]) => { const vv = live === 'flags' && MV.flagsAt ? flagsN() : v; return `<div${live ? ` data-live="${esc(live)}"` : ''}><b class="${/^[\d/., %…—]+$/.test(String(vv)) ? 'num' : 'txt'}">${esc(vv)}</b><span>${esc(k)}</span>${n ? `<small>${esc(n)}</small>` : ''}</div>`; }).join('')}</div>` : '';
    if (SUM && SUM.some((r) => r[3] === 'flags') && !MV.flagsAt) loadFlags().then(() => { MV.flagsAt = Date.now(); const b = document.querySelector('[data-live=flags] b'); if (b) b.textContent = flagsN(); });
    el.innerHTML = `<section class="block ct" data-testid="ct" data-game="${esc(game)}">
      <div class="bar-head"><h2>İçerik</h2><span class="muted small">${esc(C.head || `${title}'de yapılan her şey`)} · sürüm ${esc(C.version || '')}${C.commit ? ' · ' + esc(C.commit) : ''}${made ? ' · ' + esc(made) : ''}</span></div>
      <div class="an-tabs ct-groups" role="tablist" aria-label="İçerik grupları" data-testid="ct-groups">${C.groups.map((x) => `<button type="button" role="tab" data-ctg="${esc(x.id)}" aria-selected="${x.id === g.id}">${esc(x.title)} <span class="ct-n">${fmtN(x.items.length)}</span></button>`).join('')}</div>
      ${(C.ui || 1) > CT_UI ? '<p class="warn-box small" data-testid="ct-reload">Panel güncellendi: yeni bölümleri görmek için sayfayı yenile. <button type="button" class="btn" data-act="reload">Yenile</button></p>' : ''}
      ${g.pause ? `<p class="warn-box small ct-pause" data-testid="ct-pause">${esc(g.pause)}</p>` : ''}
      ${sum}
      ${live && !ownDetails ? live.head(g) : ''}
      ${g.note && !ownDetails ? `<p class="small muted ct-note">${esc(g.note)}</p>` : ''}
      ${showExt && !onlyExt ? `<div class="ct-ext" data-testid="ct-ext" data-group="${esc(g.id)}"></div>` : ''}
      <div class="chips ct-filters"${ownDetails ? ' hidden' : ''} role="group" aria-label="Süzgeç" data-testid="ct-filters">${chips.map(([k, t]) => `<button type="button" data-ctf="${esc(k)}" aria-pressed="${k === f}">${esc(t)}</button>`).join('')}</div>
      ${onlyExt ? `<div class="ct-ext" data-testid="ct-ext" data-group="${esc(g.id)}" data-only="1"></div>` : ''}
      <div class="ct-grid" data-testid="ct-grid" data-group="${esc(g.id)}"${onlyExt || ownDetails ? ' hidden' : ''}>${items.map((it) => card(it, twinOf(g, it.id))).join('') || (onlyExt ? '' : '<p class="muted">Bu süzgeçte bir şey yok.</p>')}</div>
    </section>`;
    if (showExt) extras[g.id].mount(el.querySelector('.ct-ext'), g, { only: onlyExt, catalog: C });
    el.onclick = (e) => {
      if (e.target.closest('audio') || e.target.closest('.ct-ext')) return;
      const gb = e.target.closest('[data-ctg]');
      if (gb) { S.group = gb.dataset.ctg; if (game === 'riftborn' && S.group === 'monsters') S.filter.monsters = ''; store.set(GKEY, S.group); paint(); return; }
      const fb = e.target.closest('[data-ctf]');
      if (fb) { S.filter[g.id] = fb.dataset.ctf; store.set(KEY + '.filter', JSON.stringify(S.filter)); paint(); return; }
      const c = e.target.closest('[data-ct]');
      if (c) open(c.dataset.ct, !!e.target.closest('[data-gear-card]'));
    };
    el.onkeydown = (e) => {
      if (e.target.closest?.('.ct-ext')) return;
      const c = e.target.closest?.('[data-ct]');
      if (c && (e.key === 'Enter' || e.key === ' ') && e.target === c) { e.preventDefault(); open(c.dataset.ct); }
    };
  }

  function rtCell(c) {
    if (c == null || typeof c !== 'object') return esc(c ?? '');
    const ix = (S.cat && S.cat.matIx) || {};
    const chip = ([k, a]) => {
      const M = ix[k] || { n: k }, inner = `${M.img ? `<img src="${pic(M.img, true)}" alt="" loading="lazy" decoding="async" width="28" height="28">` : ''}<b>${esc(a)}</b><span>${esc(M.n)}</span>`;
      return M.go && M.go.split('|')[1] ? `<button type="button" class="ct-mc" data-ctgo="${esc(M.go)}" title="${esc(M.n)}: nereden gelir, nerede kullanılır" data-testid="ct-mc">${inner}</button>` : `<span class="ct-mc">${inner}</span>`;
    };
    const t = c.t ? (c.go ? `<button type="button" class="linkish ct-go" data-ctgo="${esc(c.go)}" data-testid="ct-go">${esc(c.t)} →</button>` : `<span class="small">${esc(c.t)}</span>`) : '';
    const im = c.img ? `<img class="ct-ri" src="${pic(c.img, true)}" alt="" loading="lazy" decoding="async" width="44" height="44">` : '';
    return `${im}${c.m && c.m.length ? `<span class="ct-mcs">${c.m.map(chip).join('')}</span>` : ''}${t}`;
  }

  function block(b) {
    let body = '';
    if (b.p) body += `<p>${esc(b.p)}</p>`;
    if (b.kv) body += `<dl class="ct-kv">${b.kv.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>`;
    if (b.list) body += b.list.length ? `<ul class="ct-list">${b.list.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '<p class="muted small">Yok.</p>';
    if (b.rows) body += `<div class="scroll-x"><table class="ct-table"><thead><tr>${(b.head || []).map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    // steps of a piece of work: [what, state, note]
    if (b.tiles) body += `<div class="ct-tiles" data-testid="ct-tiles">${b.tiles.map((p, i) => `<button type="button" class="ct-tile" data-ctt="${i}" data-testid="ct-tile"><img src="${picOf(p, true)}" alt="" loading="lazy" decoding="async" width="300" height="400"><span class="small">${esc(p.cap || '')}</span></button>`).join('')}</div>`;
    // a table whose cells may be material chips (catalog.matIx: a material's name, its chip picture and its card) and links
    // to another card (go: '<group>|<id>'): Riftborn's Üretim and Malzemeler; on a phone each row is a block, each cell labelled
    if (b.rt) body += `<div class="ct-rtw"><table class="ct-table ct-rt" data-testid="ct-rt"><thead><tr>${(b.rt.head || []).map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rt.rows.map((r) => `<tr>${r.map((c, i) => `<td data-l="${esc((b.rt.head || [])[i] || '')}">${rtCell(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    if (b.steps) body += `<ol class="ct-steps" data-testid="ct-steps">${b.steps.map(([w, st, n]) => `<li>${stepChip(st)}<div><b>${esc(w)}</b>${n ? `<p class="small muted">${esc(n)}</p>` : ''}</div></li>`).join('')}</ol>`;
    return `<section class="ct-blk"><h4>${esc(b.h || '')}</h4>${body}</section>`;
  }

  // ---------------------------------------------------------------- the news block (top of the details: item.news)
  // ---------------------------------------------------------------- the versions block (top of the details: item.versions)
  // pictures numbered across the block: 0 = all side by side, then each version's in order (data-ctv)
  // (narrow screens get the top row as a 2x2 grid: item.versions.all.src2, made when the ninja has a target picture)
  const NARROW = '(max-width: 600px)';
  function versionPics(V) { return [V.all, ...V.list.flatMap((x) => x.pics || [])].filter(Boolean); }
  function versionsBlock(V) {
    let i = V.all ? 1 : 0;
    // (the newest version's pictures one per row from the big files - the owner looks at that one; the older folds small)
    const pic = (p, big) => `<button type="button" class="ct-new-pic" data-ctv="${i++}" data-testid="ct-ver-pic" title="Büyüt"><img src="${picOf(p, !big)}" alt="${esc(p.cap || '')}" loading="lazy" decoding="async"><span class="small">${esc(p.cap || '')}</span></button>`;
    const play = (x) => (x.play ? `<a class="btn ct-ver-play" href="${BASE}${esc(x.play)}" target="_blank" rel="noopener" data-testid="ct-ver-play" title="Oyunun paneldeki kopyası bu çizimle açılır">Oyunda dene (${esc(x.v)})</a>` : '');
    const html = `<section class="ct-blk ct-new ct-ver${V.compact ? ' ct-ver-c' : ''}" data-testid="ct-ver"><h4>${esc(V.h || 'Yeni çizim')}</h4>${V.p ? `<p>${esc(V.p)}</p>` : ''}
      ${V.all ? `<button type="button" class="ct-new-pic ct-ver-all" data-ctv="0" data-testid="ct-ver-all" title="Büyüt">${V.all.src2 ? `<picture><source media="${NARROW}" srcset="${BASE}${esc(V.all.src2)}">` : ''}<img src="${picOf(V.all)}" alt="${esc(V.all.cap || '')}" loading="lazy" decoding="async">${V.all.src2 ? '</picture>' : ''}<span class="small">${esc(V.all.cap || '')}</span></button>` : ''}
      ${V.list.map((x, k) => `<details class="ct-ver-v"${k === 0 ? ' open' : ''} data-testid="ct-ver-v"><summary><b>${esc(x.v)}</b> <span class="small muted">${esc(x.when || '')}</span> <span class="small">${esc(x.h || '')}</span></summary>
        ${x.p ? `<p class="small">${esc(x.p)}</p>` : ''}<div class="ct-new-pics${k === 0 && !V.compact ? ' ct-ver-big' : ''}">${(x.pics || []).map((p) => pic(p, k === 0 && !V.compact)).join('')}</div>${play(x)}</details>`).join('')}
    </section>`;
    return V.collapsed ? `<details data-testid="ct-visual-history"><summary class="btn">Önceki görseller ve sürümler</summary>${html}</details>` : html;
  }
  function newsBlock(n) {
    const v = n.video;
    return `<section class="ct-blk ct-new" data-testid="ct-new"><h4>${esc(n.h || 'Yeni')}</h4>${n.p ? `<p>${esc(n.p)}</p>` : ''}
      ${v ? `<figure class="ct-fig ct-new-v"><video src="${BASE}${esc(v.src)}"${v.poster ? ` poster="${BASE}${esc(v.poster)}"` : ''} muted loop playsinline autoplay preload="metadata" data-testid="ct-new-video" title="Dokun: durdur / oynat"></video>
        <figcaption class="small muted">${esc(v.cap || '')}${v.size ? ` · ${esc(mb(v.size))}` : ''} · dokun: durdur / oynat</figcaption></figure>` : ''}
      ${(n.pics || []).length ? `<div class="ct-new-pics">${n.pics.map((p, i) => `<button type="button" class="ct-new-pic" data-ctn="${i}" data-testid="ct-new-pic" title="Büyüt"><img src="${picOf(p, true)}" alt="${esc(p.cap || '')}" loading="lazy" decoding="async"><span class="small">${esc(p.cap || '')}</span></button>`).join('')}</div>` : ''}
    </section>`;
  }
  /** an item's short clip from the game (item.clip): muted, looping, a tap pauses or plays it */
  function clipBlock(v) {
    return `<section class="ct-blk ct-clip" data-testid="ct-clip"><h4>Oyunda</h4><figure class="ct-fig ct-new-v"><video src="${BASE}${esc(v.src)}"${v.poster ? ` poster="${BASE}${esc(v.poster)}"` : ''} muted loop playsinline autoplay preload="metadata" data-testid="ct-clip-video" title="Dokun: durdur / oynat"></video>
      <figcaption class="small muted">${esc(v.cap || '')}${v.size ? ` · ${esc(mb(v.size))}` : ''} · dokun: durdur / oynat</figcaption></figure></section>`;
  }
  /** a picture big over the details (fit to the screen; a tap on it: its real size, scrolled; ✕ / Esc / outside: back) */
  function lightbox(p) {
    document.querySelector('.ct-lb')?.remove();
    const lb = document.createElement('div');
    lb.className = 'ct-lb';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', p.cap || 'Resim');
    lb.dataset.testid = 'ct-lb';
    lb.innerHTML = `<div class="ct-lb-bar"><span class="small">${esc(p.cap || '')}</span><button type="button" class="btn ct-x" data-ctlb="close" aria-label="Kapat">✕</button></div>
      <div class="ct-lb-scroll"><img src="${picOf(p)}" alt="${esc(p.cap || '')}" data-testid="ct-lb-img" title="Dokun: gerçek boyut / sığdır"></div>`;
    lb.addEventListener('click', (e) => {
      e.stopPropagation();
      if (e.target.closest('[data-ctlb=close]') || e.target.classList.contains('ct-lb-scroll')) { lb.remove(); return; }
      if (e.target.tagName === 'IMG') lb.classList.toggle('full');
    });
    document.body.appendChild(lb);
    lb.querySelector('[data-ctlb=close]').focus({ preventScroll: true });
  }

  // ---------------------------------------------------------------- the 3D viewer (details of an item with models)
  function viewerBlock(it) {
    const M = it.models;
    return `<section class="ct-blk ct-3d" data-testid="ct-3d"><h4>${it.models[0]?.motionPreview ? 'Hareketli önizleme' : '3B model'}</h4>
      ${M[0]?.demo ? `<p><a class="btn" href="${esc(M[0].demo)}" target="_blank" rel="noopener" data-testid="ct-dungeon-demo">Zindanda dene</a></p>` : ''}
      ${M.length > 1 ? `<div class="chips ct-mvtabs" role="group" aria-label="Modeller">${M.map((m, i) => `<button type="button" data-ctm="${i}" aria-pressed="${i === 0}">${esc(m.label)} · ${esc(mb(m.size))}</button>`).join('')}</div>` : ''}
      <div class="chips ct-costumes" role="group" aria-label="Kostümler" data-testid="ct-costumes" hidden></div>
      ${M[0]?.motionPreview ? `<div class="chips ct-mob-actions" role="group" aria-label="Mob hareketleri" data-testid="ct-mob-actions">${(M[0].animations || []).map(a => `<button type="button" data-motion="${esc(a.clip)}" disabled>${esc(a.label)}</button>`).join('')}</div>` : ''}
      <div class="ct-mv" data-testid="ct-mv-box"><p class="ct-mv-msg" data-testid="ct-mv-msg"></p></div>
      <p class="small muted ct-mv-info" data-testid="ct-mv-info"></p>
      ${it.id==='mon-bloat'&&M[0]?.motionPreview ? `<details open class="ct-motion-editor" data-testid="ct-motion-editor"><summary class="btn">Hareketi kendim düzenle</summary><p class="small muted">Kare kare ilerle; eklemleri değiştir, aslıyla karşılaştır ve kendi sürümünü kaydet.</p><p><a class="btn" data-motion-editor-link target="_blank" rel="noopener">Düzenleyiciyi tam sayfa aç ↗</a></p><iframe title="Swollen Dead hareket düzenleyici" data-motion-editor-frame loading="lazy" style="display:block;width:100%;height:1320px;border:1px solid #536174;border-radius:8px"></iframe></details>` : ''}
      <p class="small muted">Parmakla ya da fareyle çevir, iki parmakla ya da tekerlekle yaklaş. ${it.models[0]?.motionPreview ? 'Düğmelerden hareket seç; Durdur ile duraklat, Yavaş ile ayrıntılara bak. Bu görünüm henüz canlı haritaya uygulanmadı.' : 'Model yalnız bu pencere açılınca iner; telefonda veri harcar. Kostüm düğmesi o kostümün boyasını (küçük bir resim) indirip aynı modele giydirir; * biçimi farklı kostüm: şimdilik yalnız renkleri.'}</p>
    </section>`;
  }
  /** puts model `m` into the viewer of dialog `d` (loads model-viewer on first use) */
  async function mount(d, m) {
    const box = d.querySelector('.ct-mv'), msg = box.querySelector('.ct-mv-msg'), info = d.querySelector('.ct-mv-info');
    box._cameraObserver?.disconnect();
    const request=Symbol('model mount');box._mountRequest=request;
    const current=()=>d.isConnected&&box._mountRequest===request;
    box.classList.toggle('ct-mv-mob', !!m.motionPreview);
    const editor=d.querySelector('.ct-motion-editor');
    if(editor) {
      const url='motion-editor/index.html?model='+encodeURIComponent(BASE+m.file)+'&label='+encodeURIComponent(m.label)+'&v=2';
      const frame=editor.querySelector('iframe');editor.querySelector('[data-motion-editor-link]').href=url;
      if(editor.open||frame.getAttribute('src'))frame.src=url;
      const shortcut=d.querySelector('[data-motion-editor-shortcut]');if(shortcut)shortcut.href=url;
      editor.ontoggle=()=>{if(editor.open&&!frame.getAttribute('src'))frame.src=url;};
    }
    box.querySelector('model-viewer')?.remove();
    box.querySelector('.ct-mv-anim')?.remove();
    const motionActions = d.querySelector('.ct-mob-actions');
    if (motionActions) motionActions.querySelectorAll('button').forEach(b => b.disabled = true);
    const cos = d.querySelector('.ct-costumes');
    cos.hidden = true; cos.innerHTML = '';
    box.dataset.state = 'loading';
    msg.hidden = false;
    msg.textContent = `3B model yükleniyor… (${mb(m.size)})`;
    info.textContent = [m.label, mb(m.size), `${fmtN(m.tris)} üçgen`, m.tex ? `doku ${mb(m.tex)}` : '', m.joints ? `${fmtN(m.joints)} ${m.motionPreview ? 'eklem' : 'kemik'}` : ''].filter(Boolean).join(' · ') + (m.note ? ` — ${m.note}` : '');
    try { await loadViewer(); } catch {
      if(!current())return;
      box.dataset.state = 'error';
      msg.textContent = '3B görüntüleyici yüklenemedi (vendor/model-viewer.min.js). Bağlantıyı kontrol edip pencereyi yeniden aç.';
      return;
    }
    if (!current()) return;
    const mv = document.createElement('model-viewer');
    for (const [k, v] of Object.entries({ src: BASE + m.file, alt: `${it3d(d)} 3B modeli`, 'camera-controls': '', 'touch-action': 'pan-y', 'interaction-prompt': 'none',
      'shadow-intensity': '1', exposure: '1', 'environment-image': 'neutral', 'data-testid': 'ct-mv' })) mv.setAttribute(k, v);
    if (m.motionPreview) mv.setAttribute('camera-orbit',m.cameraOrbit || '25deg 75deg 115%');
    if (m.motionPreview && m.cameraTarget) mv.setAttribute('camera-target',m.cameraTarget);
    mv.addEventListener('progress', (e) => {
      if(!current())return;
      const p = e.detail && e.detail.totalProgress;
      if (box.dataset.state === 'loading' && p < 1) msg.textContent = `3B model yükleniyor… %${Math.round((p || 0) * 100)} (${mb(m.size)})`;
    });
    mv.addEventListener('load', () => {
      if(!current())return;
      box.dataset.state = 'ready';
      msg.hidden = true;
      if (m.costumes && m.costumes.length > 1) costumeRow(d, mv, m, cos, info);
      // a model with its own motion (Meshy's): a button to play it
      const A = mv.availableAnimations || [];
      if (m.motionPreview) {
        const controls = motionActions;
        controls.setAttribute('role','group');controls.setAttribute('aria-label','Mob hareketleri');
        const motions=m.animations || A.map(clip=>({clip,label:clip}));
        controls.innerHTML=motions.map((a,i)=>`<button type="button" data-motion="${esc(a.clip)}" aria-pressed="${i===0}">${esc(a.label)}</button>`).join('')
          + '<button type="button" data-motion-pause>Durdur</button><button type="button" data-motion-slow aria-pressed="false">Yavaş</button>';
        mv.animationName=motions[0].clip;mv.play();
        controls.onclick=e=>{
          const button=e.target.closest('[data-motion]');
          if(button){mv.animationName=button.dataset.motion;mv.currentTime=0;mv.play();controls.querySelectorAll('[data-motion]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));controls.querySelector('[data-motion-pause]').textContent='Durdur';}
          if(e.target.closest('[data-motion-pause]')){if(mv.paused){mv.play();e.target.textContent='Durdur';}else{mv.pause();e.target.textContent='Oynat';}}
          if(e.target.closest('[data-motion-slow]')){const b=e.target.closest('[data-motion-slow]'),slow=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(slow));mv.timeScale=slow?.5:1;}
        };

      } else if (A.length) {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'btn ct-mv-anim'; b.textContent = 'Hareketi oynat';
        b.onclick = () => { if (mv.paused) { mv.play(); b.textContent = 'Durdur'; } else { mv.pause(); b.textContent = 'Hareketi oynat'; } };
        box.appendChild(b);
      }
    });
    mv.addEventListener('error', () => { if(!current())return;box.dataset.state = 'error'; msg.hidden = false; msg.textContent = 'Model dosyası yüklenemedi.'; });
    box.appendChild(mv);
    if(m.cameraOrbitMobile){
      mv.setAttribute('max-camera-orbit','auto auto 400%');
      let narrow=null;
      box._cameraObserver=new ResizeObserver(()=>{const next=box.clientWidth<500;if(next!==narrow){narrow=next;box.style.height=next?'380px':'';mv.setAttribute('camera-orbit',next?m.cameraOrbitMobile:m.cameraOrbit);}});
      box._cameraObserver.observe(box);
    }
  }
  const it3d = (d) => d.getAttribute('aria-label') || '';
  /** the costumes of the current model: a button each; a costume's own small picture is fetched on its first tap and
   *  put on the same model (the model's own picture back for the base colours) */
  function costumeRow(d, mv, m, cos, info) {
    const mat = mv.model && mv.model.materials[0], slot = mat && mat.pbrMetallicRoughness.baseColorTexture;
    if (!slot) return;
    const own = slot.texture, cache = new Map(), base = info.textContent;
    cos.innerHTML = m.costumes.map((c, i) => `<button type="button" data-ctc="${i}" aria-pressed="${i === 0}" data-testid="ct-cos"${c.shape ? ` title="Biçimi farklı kostüm: 3B'de şimdilik yalnız renkleri (Meshy modeli gerekebilir)"` : ''}>${esc(c.cap)}${c.shape ? ' *' : ''}</button>`).join('');
    cos.hidden = false;
    let busy = 0;
    cos.onclick = async (e) => {
      const b = e.target.closest('[data-ctc]');
      if (!b || b.getAttribute('aria-pressed') === 'true') return;
      const c = m.costumes[+b.dataset.ctc], my = ++busy;
      cos.querySelectorAll('[data-ctc]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      try {
        let t = own;
        if (c.tex) {
          t = cache.get(c.tex);
          if (!t) { b.dataset.state = 'loading'; t = await mv.createTexture(BASE + c.tex); cache.set(c.tex, t); delete b.dataset.state; }
        }
        if (my !== busy || !d.isConnected) return;
        slot.setTexture(t);
        mv.dataset.costume = c.k;
        info.textContent = base + (c.tex ? ` · kostüm boyası ${mb(c.size || 0)}` : '');
      } catch { b.dataset.state = 'error'; }
    };
  }

  // ---------------------------------------------------------------- the move gallery (Shadow Duel → a ninja → Hareketler)
  // Every move of the ninja as a short looping clip. The list comes with the details (hareket/<ninja>.json, small); a
  // clip downloads only when its card is on the screen (an IntersectionObserver sets its src then and takes it away when
  // it leaves: phone data and memory). Normal / slow per card and for the whole block. "Garip" marks a move for the fix
  // list (a short optional note; st_move_flag_add); the marks show on the cards and in "İşaretlenenler" at the top.
  const MV = { io: null, pio: null, set: null, slow: store.get(KEY + '.mvslow') === '1', grp: store.get(KEY + '.mvgrp') || '', flags: new Map(), flagErr: null, data: null };
  const ninjaOf = (it) => it.id.replace(/^n-/, '');
  const grpName = (k) => (MOVE_GROUPS.find(([x]) => x === k) || [k, k])[1];
  function movesBlock(it) {
    const k2 = it.moves.kind === '2b';
    return `<section class="ct-blk ct-moves" data-testid="ct-moves" data-kind="${esc(it.moves.kind || '3b')}"><h4>Hareketler <span class="ct-n">${fmtN(it.moves.n)}</span></h4>
      <p class="small muted">${k2
    ? 'Her hareket oyunun kendisinden (2B, yeni dövüş, oyundaki hızıyla: dövüş 0,85, saldırılar 0,7, vuruşta donma yok), tapınakta, yandan: önce kısa bir duruş, sonra hareketin tamamı ve toparlanması; rakip gerçek mesafede tepki verir. Video yalnız kartı ekrana gelince iner (telefonda veri). Videoya dokununca durur / oynar. <b>Garip</b> düğmesi hareketi düzeltme listesine işaretler, <b>Düzenle</b> hareketi poz düzenleyicide açar.'
    : 'Her hareket oyunun kendisinden, 3B, tapınakta, yandan: önce kısa bir duruş, sonra hareketin tamamı ve toparlanması. Video yalnız kartı ekrana gelince iner (telefonda veri). Videoya dokununca durur / oynar. <b>Garip</b> düğmesi hareketi düzeltme listesine işaretler.'}</p>
      ${MV.noFlag ? '' : '<div class="mv-flags" data-testid="mv-flags"></div>'}
      <div class="chips mv-tabs" role="group" aria-label="Hareket grupları" data-testid="mv-tabs"></div>
      <div class="chips mv-speedall" role="group" aria-label="Hız"><button type="button" data-mvsa="0" aria-pressed="${!MV.slow}">Normal hız</button><button type="button" data-mvsa="1" aria-pressed="${MV.slow}" data-testid="mv-slowall">Hepsi yavaş</button></div>
      <div class="mv-grid" data-testid="mv-grid"><p class="muted small">Hareket listesi geliyor…</p></div>
    </section>`;
  }
  const mvSrc = (m, slow) => BASE + (slow ? m.vy : m.v);
  function mvCard(m, nin) {
    const f = MV.noFlag ? null : MV.flags.get(nin + '|' + m.id);
    return `<article class="mv-card${f ? ' flagged' : ''}" data-mv="${esc(m.id)}" data-testid="mv-card">
      <div class="mv-vid"><video muted loop playsinline preload="none"${m.poster ? ` data-poster="${BASE + esc(m.poster)}"` : ''} data-testid="mv-video" aria-label="${esc(m.tr)}"></video>
        <span class="mv-sp" data-testid="mv-sp"></span>${f ? '<span class="mv-flagmark" title="Garip diye işaretli" data-testid="mv-flagmark">⚑ garip</span>' : ''}</div>
      <div class="mv-body"><b class="mv-tr">${esc(m.tr)}</b>${m.en && m.en !== m.tr ? `<small class="muted mv-en">${esc(m.en)}</small>` : ''}
        <div class="mv-in">${m.input ? `<kbd>${esc(m.input)}</kbd>` : ''}${m.sec ? `<span class="muted small">${esc(String(m.sec).replace('.', ','))} sn</span>` : ''}</div>
        ${m.when ? `<p class="small muted mv-when">${esc(m.when)}</p>` : ''}
        ${m.beats ? `<p class="small muted mv-when">${esc(m.beats.join(' · '))}</p>` : ''}
        ${f && f.note ? `<p class="small mv-note" data-testid="mv-note">⚑ ${esc(f.note)}</p>` : ''}
        <div class="mv-acts"><button type="button" class="btn mv-speed" data-mvs aria-pressed="false" data-testid="mv-speed">Yavaş ${esc(m.slowK || '')}</button>
          ${MV.noFlag ? '' : `<button type="button" class="btn mv-flag" data-mvf data-testid="mv-flag"${MV.flagErr ? ' disabled' : ''}>${f ? 'İşaretli ⚑' : 'Garip'}</button>`}${(() => { const h = m.poz === false ? null : pozHref(BASE, nin, m.id); return h ? `<a class="btn mv-poz" href="${esc(h)}" target="_blank" rel="noopener" data-testid="mv-poz" title="Bu hareketi poz düzenleyicide aç">Düzenle</a>` : ''; })()}</div>
        <form class="mv-flagf" data-testid="mv-flagf" hidden><textarea maxlength="${MOVE_NOTE_MAX}" rows="2" placeholder="Ne garip? (isteğe bağlı; ör. kılıç gövdeden geçiyor)" aria-label="Not"></textarea>
          <div class="mv-acts"><button type="submit" class="btn primary" data-testid="mv-save">Kaydet</button>${f ? '<button type="button" class="btn" data-mvclr data-testid="mv-clear">İşareti kaldır</button>' : ''}<button type="button" class="btn" data-mvx>Vazgeç</button></div>
          <p class="small mv-err" hidden></p></form>
      </div></article>`;
  }
  function paintFlags(d, nin) {
    const box = d.querySelector('[data-testid=mv-flags]');
    if (!box) return;
    if (MV.flagErr) { box.innerHTML = `<p class="small muted" data-testid="mv-flag-err">İşaretler: ${esc(MV.flagErr)}</p>`; return; }
    const mine = [...MV.flags.values()].filter((f) => f.ninja === nin);
    const others = MV.flags.size - mine.length;
    const name = (id) => { const m = MV.data && MV.data.moves.find((x) => x.id === id); return m ? m.tr : id; };
    box.innerHTML = `<div class="mv-flaglist" data-testid="mv-flaglist"><b>İşaretlenenler (${fmtN(mine.length)})</b>${others ? ` <span class="small muted">· öteki ninjalarda ${fmtN(others)}</span>` : ''}
      ${mine.length ? `<ul>${mine.map((f) => `<li data-testid="mv-flagitem"><button type="button" class="linkish" data-mvgo="${esc(f.move)}">${esc(name(f.move))}</button>${f.note ? ` — ${esc(f.note)}` : ''} <span class="small muted">(${f.who ? esc(f.who) + ', ' : ''}${esc(fmtDateTime(f.updated_at))})</span> <button type="button" class="linkish" data-mvclrid="${esc(String(f.id))}" data-testid="mv-flagclear">kaldır</button></li>`).join('')}</ul>` : '<p class="small muted">Henüz işaret yok: garip bulduğun hareketin kartında <b>Garip</b>.</p>'}</div>`;
  }
  function paintMoves(d, it) {
    const nin = ninjaOf(it), box = d.querySelector('[data-testid=mv-grid]'), tabs = d.querySelector('[data-testid=mv-tabs]');
    if (!box || !MV.data) return;
    const L = MV.data.moves, fl = new Set(MV.noFlag ? [] : [...MV.flags.values()].filter((f) => f.ninja === nin).map((f) => f.move));
    if (MV.grp && (MV.grp === 'flag' ? MV.noFlag : !L.some((m) => m.grp === MV.grp))) MV.grp = '';
    const chips = [['', `Hepsi ${fmtN(L.length)}`], ...MOVE_GROUPS.filter(([k]) => L.some((m) => m.grp === k)).map(([k, t]) => [k, `${t} ${fmtN(L.filter((m) => m.grp === k).length)}`]), ...(MV.noFlag ? [] : [['flag', `İşaretli ${fmtN(fl.size)}`]])];
    tabs.innerHTML = chips.map(([k, t]) => `<button type="button" data-mvg="${esc(k)}" aria-pressed="${k === MV.grp}">${esc(t)}</button>`).join('');
    const shown = filterMoves(L, MV.grp, fl);
    // (one heading per group when all are shown)
    let html = '', last = null;
    for (const m of shown) {
      if (!MV.grp && m.grp !== last) { last = m.grp; html += `<h5 class="mv-gh">${esc(grpName(m.grp))}</h5>`; }
      html += mvCard(m, nin);
    }
    box.innerHTML = html || `<p class="muted small">${MV.grp === 'flag' ? 'İşaretli hareket yok.' : 'Bu grupta hareket yok.'}</p>`;
    if (MV.data.missing && MV.data.missing.length && !MV.grp) box.insertAdjacentHTML('beforeend', `<p class="small muted mv-missing">Videosu henüz çekilmemiş: ${esc(MV.data.missing.join(', '))}</p>`);
    paintFlags(d, nin);
    watch(d);
  }
  /** each card's clip loads when the card comes on the screen and is dropped when it leaves */
  function watch(d) {
    if (MV.io) MV.io.disconnect();
    const root = d.querySelector('.ct-box');
    const set = (v, on) => {
      const card = v.closest('[data-mv]'), m = MV.data && MV.data.moves.find((x) => x.id === card.dataset.mv);
      if (!m) return;
      const slow = card.dataset.slow != null ? card.dataset.slow === '1' : MV.slow;
      card.querySelector('[data-mvs]').setAttribute('aria-pressed', String(slow));
      if (on) {
        const want = mvSrc(m, slow);
        if (v.getAttribute('src') !== want) { v.src = want; v.dataset.loaded = '1'; }
        card.querySelector('[data-testid=mv-sp]').textContent = slow ? `yavaş ${m.slowK || ''}`.trim() : '';
        v.play().catch(() => {});
      } else if (v.getAttribute('src')) { v.pause(); v.removeAttribute('src'); v.load(); }
    };
    MV.set = set;
    if (typeof IntersectionObserver === 'undefined') { d.querySelectorAll('[data-testid=mv-video]').forEach((v) => { if (v.dataset.poster) v.poster = v.dataset.poster; set(v, true); }); return; }
    MV.io = new IntersectionObserver((es) => { for (const e of es) set(e.target, e.isIntersecting); }, { root, rootMargin: '80px 0px', threshold: 0.2 });
    // (the cards' pictures a little earlier - a screen ahead - and once)
    if (MV.pio) MV.pio.disconnect();
    MV.pio = new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting && e.target.dataset.poster) { e.target.poster = e.target.dataset.poster; delete e.target.dataset.poster; MV.pio.unobserve(e.target); } }, { root, rootMargin: '600px 0px' });
    d.querySelectorAll('[data-testid=mv-video]').forEach((v) => { MV.io.observe(v); if (v.dataset.poster) MV.pio.observe(v); });
  }
  async function loadFlags() {
    if (!rpc) { MV.flagErr = 'bu sayfada sunucu bağlantısı yok'; return; }
    try {
      const L = await rpc('st_move_flags', { p_game: game });
      MV.flags = new Map((Array.isArray(L) ? L : []).map((f) => [f.ninja + '|' + f.move, f]));
      MV.flagErr = null;
    } catch (e) { MV.flagErr = e && e.missing ? 'sunucu kurulumu henüz yapılmadı (supabase/studio/moves.sql); videolar yine izlenir' : friendly(e); }
  }
  async function mountMoves(d, it) {
    const nin = ninjaOf(it), box = d.querySelector('[data-testid=mv-grid]');
    MV.data = null;
    try {
      const [r] = await Promise.all([fetch(BASE + it.moves.file, { cache: 'no-cache' }), MV.noFlag ? null : loadFlags()]);
      if (!r.ok) throw new Error(String(r.status));
      const data = await r.json();
      if (!d.isConnected) return;
      MV.data = data;
      paintMoves(d, it);
    } catch {
      if (box && d.isConnected) box.innerHTML = `<p class="warn-box small" data-testid="mv-error">Hareket listesi yüklenemedi (${esc(BASE + it.moves.file)}).</p>`;
      return;
    }
    const sec = d.querySelector('[data-testid=ct-moves]');
    sec.addEventListener('click', async (e) => {
      const g = e.target.closest('[data-mvg]');
      if (g) { MV.grp = g.dataset.mvg; store.set(KEY + '.mvgrp', MV.grp); paintMoves(d, it); return; }
      const sa = e.target.closest('[data-mvsa]');
      if (sa) {
        MV.slow = sa.dataset.mvsa === '1'; store.set(KEY + '.mvslow', MV.slow ? '1' : '0');
        sec.querySelectorAll('[data-mvsa]').forEach((b) => b.setAttribute('aria-pressed', String(b === sa)));
        sec.querySelectorAll('[data-mv]').forEach((c) => { delete c.dataset.slow; const v = c.querySelector('video'); MV.set(v, !!v.getAttribute('src')); });
        return;
      }
      const go = e.target.closest('[data-mvgo]');
      if (go) {
        if (MV.grp && MV.grp !== 'flag') { MV.grp = ''; paintMoves(d, it); }
        sec.querySelector(`[data-mv="${CSS.escape(go.dataset.mvgo)}"]`)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return;
      }
      const card = e.target.closest('[data-mv]');
      const clr = e.target.closest('[data-mvclrid]') || (card && e.target.closest('[data-mvclr]'));
      if (clr) {
        const f = clr.dataset.mvclrid ? [...MV.flags.values()].find((x) => String(x.id) === clr.dataset.mvclrid) : MV.flags.get(nin + '|' + card.dataset.mv);
        if (!f) return;
        clr.disabled = true;
        try { await rpc('st_move_flag_clear', { p_id: f.id }); MV.flags.delete(f.ninja + '|' + f.move); paintMoves(d, it); }
        catch (er) {
          clr.disabled = false;
          const p = card && card.querySelector('.mv-err');
          if (p) { p.hidden = false; p.textContent = friendly(er); } else { const b = d.querySelector('[data-testid=mv-flags]'); b.insertAdjacentHTML('beforeend', `<p class="small mv-err">${esc(friendly(er))}</p>`); }
        }
        return;
      }
      if (!card) return;
      const v = card.querySelector('video');
      if (e.target.closest('[data-mvs]')) { const now = card.dataset.slow != null ? card.dataset.slow === '1' : MV.slow; card.dataset.slow = now ? '0' : '1'; MV.set(v, true); return; }
      if (e.target.closest('[data-mvf]')) {
        const fm = card.querySelector('.mv-flagf'), f = MV.flags.get(nin + '|' + card.dataset.mv);
        fm.hidden = !fm.hidden;
        if (!fm.hidden) { const ta = fm.querySelector('textarea'); ta.value = f ? f.note : ''; ta.focus({ preventScroll: true }); }
        return;
      }
      if (e.target.closest('[data-mvx]')) { card.querySelector('.mv-flagf').hidden = true; return; }
      if (e.target === v) { if (!v.getAttribute('src')) MV.set(v, true); else if (v.paused) v.play().catch(() => {}); else v.pause(); }
    });
    sec.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fm = e.target.closest('.mv-flagf'), card = fm.closest('[data-mv]'), err = fm.querySelector('.mv-err'), btn = fm.querySelector('[type=submit]');
      const note = fm.querySelector('textarea').value.trim().slice(0, MOVE_NOTE_MAX);
      btn.disabled = true; err.hidden = true;
      try {
        const f = await rpc('st_move_flag_add', { p: { game, ninja: nin, move: card.dataset.mv, note } });
        MV.flags.set(f.ninja + '|' + f.move, f);
        paintMoves(d, it);
      } catch (er) { btn.disabled = false; err.hidden = false; err.textContent = friendly(er); }
    });
  }

  function close() {
    document.querySelector('.ct-zoom .ct-mv')?._cameraObserver?.disconnect();
    if (MV.io) { MV.io.disconnect(); MV.io = null; }
    if (MV.pio) { MV.pio.disconnect(); MV.pio = null; }
    document.querySelector('.ct-zoom')?.remove();
    document.querySelector('.ct-lb')?.remove();
    document.removeEventListener('keydown', onKey);
    document.body.classList.remove('ct-open');
  }
  function onKey(e) {
    if (e.key !== 'Escape') return;
    const lb = document.querySelector('.ct-lb');
    if (lb) lb.remove(); else close();
  }

  function open(id, worn = false) {
    const g = groupOf();
    const it = g.items.find((x) => x.id === id);
    if (!it) return;
    close();
    const pics = it.pics && it.pics.length ? it.pics : it.img ? [{ k: it.img }] : [];
    const d = document.createElement('div');
    d.className = 'ct-zoom';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    d.setAttribute('aria-label', it.title);
    d.dataset.testid = 'ct-zoom';
    const big = (p) => `<figure class="ct-fig"><img class="ct-big" src="${picOf(p)}" alt="${esc(p.cap || it.title)}" data-testid="ct-big">${p.cap ? `<figcaption class="small muted">${esc(p.cap)}</figcaption>` : ''}</figure>`;
    const has3d = it.models && it.models.length;
    const motionFirst = has3d && it.models[0].motionPreview;
    const twin = it.news ? null : twinOf(g, it.id);
    MV.noFlag = g.flags === false;
    d.innerHTML = `<div class="ct-box">
      <div class="ct-top"><div><h3>${esc(it.title)}</h3>${it.sub ? `<p class="small muted">${esc(it.sub)}</p>` : ''}${it.id === 'mon-bloat' && motionFirst ? `<p><a class="btn" data-motion-editor-shortcut target="_blank" rel="noopener" style="background:#245580;color:#fff;border:1px solid #72baff;padding:10px 14px;font-weight:700">Hareket düzenleyicisini aç ↗</a></p>` : ''}${it.moves ? `<button type="button" class="linkish mv-jump" data-ctz="moves" data-testid="mv-jump">Hareketler (${fmtN(it.moves.n)}) ↓</button>` : ''}${game === 'shadow-duel' && /^n-/.test(it.id) ? (has3d
      // (Ninjalar 3B: the editor draws in 2D for now - the owner, 2026-10-07, found 2D figures behind this button in 3B)
      ? `<a class="btn poz-open" href="${esc(pozHref(BASE, it.id.replace(/^n-/, '')))}" target="_blank" rel="noopener" data-testid="poz-open" title="Düzenleyici şimdilik 2B çizimle; düzenlenen iskelet 3B modelleri de oynatır">Poz düzenle (2B)</a>`
      : `<a class="btn poz-open" href="${esc(pozHref(BASE, it.id.replace(/^n-/, '')))}" target="_blank" rel="noopener" data-testid="poz-open" title="Bu ninjanın pozlarını ve hareketlerini düzenle">Poz düzenle</a>`) : ''}</div>${chip(it.status)}<button type="button" class="btn ct-x" data-ctz="close" aria-label="Kapat">✕</button></div>
      ${it.versions && it.versions.list && it.versions.list.length && !it.versions.below ? versionsBlock(it.versions) : ''}
      ${it.news ? newsBlock(it.news) : twin ? `<button type="button" class="ct-twin" data-ctz="twin" data-testid="ct-twin"><b>${esc(twin.news.h || 'Yeni')}</b> <span class="small">${esc(twin.g.title)}'de gör →</span></button>` : ''}
      ${it.gearPreview ? `<section class="ct-wear-review" data-testid="ct-gear-review"><div class="ct-wear-tools"><button type="button" class="btn ct-wear-primary" data-gear-open aria-expanded="false">Karakterde 3B gör</button> <a class="btn" href="${esc(it.gearPreview)}" target="_blank" rel="noopener">Tam sayfa aç ↗</a></div><iframe title="Ekipmanı gerçek karakter üzerinde incele" data-gear-frame style="width:100%;height:760px;border:1px solid #536174;border-radius:8px" hidden></iframe></section>` : ''}
      ${motionFirst ? viewerBlock(it) : ''}
      ${it.clip ? clipBlock(it.clip) : ''}
      ${pics.length ? `<div class="ct-main">${big(pics[0])}</div>` : ''}
      ${pics.length > 1 ? `<div class="ct-thumbs" data-testid="ct-thumbs">${pics.map((p, i) => `<button type="button" data-ctp="${i}" aria-pressed="${i === 0}" title="${esc(p.cap || '')}"><img src="${picOf(p, true)}" alt="${esc(p.cap || '')}" loading="lazy"></button>`).join('')}</div>` : ''}
      ${it.versions && it.versions.list && it.versions.list.length && it.versions.below ? versionsBlock(it.versions) : ''}
      ${it.audio ? `<audio controls preload="metadata" src="${BASE}${esc(it.audio)}" class="ct-audio"></audio>` : ''}
      ${has3d && !motionFirst ? viewerBlock(it) : ''}
      ${it.moves ? movesBlock(it) : it.movesLater ? `<section class="ct-blk" data-testid="mv-later"><h4>Hareketler</h4><p class="small muted">${esc(it.movesLater)}</p></section>` : ''}
      ${(it.blocks || []).map(block).join('')}
    </div>`;
    d.addEventListener('click', (e) => {
      if(e.target.closest('[data-gear-open]')){const frame=d.querySelector('[data-gear-frame]'),opening=frame.hidden;frame.hidden=!opening;if(opening){frame.src=it.gearPreview;frame.scrollIntoView({block:'start'})}else frame.removeAttribute('src');e.target.closest('[data-gear-open]').setAttribute('aria-expanded',String(opening));e.target.closest('[data-gear-open]').textContent=opening?'Giyilmiş 3B görünümü kapat':'Karakterde 3B gör';return;}
      if (e.target === d || e.target.closest('[data-ctz=close]')) { close(); return; }
      // a material chip or a recipe link: that card, in its own group
      const go = e.target.closest('[data-ctgo]');
      if (go) { const [gid, cid] = go.dataset.ctgo.split('|'); if (S.cat.groups.some((x) => x.id === gid)) { close(); S.group = gid; S.filter[gid] = ''; store.set(GKEY, gid); paint(); if (cid) open(cid); } return; }
      const nv = e.target.closest('[data-testid=ct-new-video], [data-testid=ct-clip-video]');
      if (nv) { if (nv.paused) nv.play().catch(() => {}); else nv.pause(); return; }
      const vp = e.target.closest('[data-ctv]');
      if (vp && it.versions) {
        // (the top row on a narrow screen: its 2x2 picture, as shown - four in one row would be too small there)
        let p = versionPics(it.versions)[+vp.dataset.ctv];
        if (p && p === it.versions.all && p.src2 && matchMedia(NARROW).matches) p = { ...p, src: p.src2, srcK: p.src2K };
        if (p) lightbox(p);
        return;
      }
      const np = e.target.closest('[data-ctn]');
      if (np) { const p = it.news.pics[+np.dataset.ctn]; if (p) lightbox(p); return; }
      if (twin && e.target.closest('[data-ctz=twin]')) { close(); S.group = twin.g.id; store.set(GKEY, S.group); paint(); open(id); return; }
      if (e.target.closest('[data-ctz=moves]')) { d.querySelector('[data-testid=ct-moves]')?.scrollIntoView({ block: 'start', behavior: 'smooth' }); return; }
      const tl = e.target.closest('[data-ctt]');
      if (tl) {
        const blk = (it.blocks || []).find((b) => b.tiles), p = blk && blk.tiles[+tl.dataset.ctt];
        if (p) {
          const main = d.querySelector('.ct-main');
          main.innerHTML = big(p); main.classList.add('port');
          d.querySelectorAll('[data-ctt]').forEach((b) => b.setAttribute('aria-pressed', String(b === tl)));
          d.querySelectorAll('[data-ctp]').forEach((b) => b.setAttribute('aria-pressed', 'false'));
          main.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
        return;
      }
      const t = e.target.closest('[data-ctp]');
      if (t) {
        d.querySelector('.ct-main').innerHTML = big(pics[+t.dataset.ctp]); d.querySelector('.ct-main').classList.remove('port');
        d.querySelectorAll('[data-ctp]').forEach((b) => b.setAttribute('aria-pressed', String(b === t)));
      }
      const m = e.target.closest('[data-ctm]');
      if (m && m.getAttribute('aria-pressed') !== 'true') {
        d.querySelectorAll('[data-ctm]').forEach((b) => b.setAttribute('aria-pressed', String(b === m)));
        mount(d, it.models[+m.dataset.ctm]);
      }
    });
    document.body.appendChild(d);
    document.body.classList.add('ct-open');
    document.addEventListener('keydown', onKey);
    d.querySelector('[data-ctz=close]').focus({ preventScroll: true });
    if(worn)d.querySelector('[data-gear-open]')?.click();
    if (has3d) mount(d, it.models[0]);
    if (it.moves) mountMoves(d, it);
  }

  return { paint, load, close, reload: () => load(true) };
}
