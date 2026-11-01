// Studio panel — Shadow Duel → Pass (docs/STUDYO-PANELI.md; the game: games/06-shadow-duel/js/level.js, js/pass.js;
// the server: games/06-shadow-duel/supabase/pass.sql nd_admin_pass*).
//   - this season: one track, every tier's reward with its picture (pass-items.webp, drawn by the game itself:
//     games/06-shadow-duel/tools/pass-panel-art.mjs); every reward is claimed with a rewarded ad (without ads it opens
//     waitTiers tiers later); the announced "coming soon" tiers after the real ones. Only the pass's own rewards.
//   - the plan of a season (the next one by default): one reward per tier from the pass's own rewards, XP per tier,
//     multipliers; checked exactly as the server (nd_pass_check) and the game (js/level.js cleanSeason) read it,
//     previewed with the pictures, saved with nd_admin_pass_save
//   - the limits the server keeps (nd_admin_pass_settings) and statistics: players per level band, how many reached
//     each tier, claims with an ad / after waiting, first wins of the day
//   - Ödüller → Yolculuk ödülleri (paintJourney): each ninja's Menkyo / Kaiden rewards and how many players cleared
//     each journey 1, 2, 3 times (not pass rewards: they come from the journey)
//   - 1.3.2: 30 tiers by default; the fight flair (big pictures: flair-big/, tools/flair-art.mjs), progress rewards, the
//     ranked shield (its on / off switch and numbers); a warning when the server still holds a shorter season than the
//     game's built-in one, and a button that starts the plan from the built-in season
import { ATLAS, RECT, ITEMS, KINDS, JOURNEY, SEASON, NINJAS } from './pass-items.js';
import { BIG } from './pass-big.js';
import { BIG as FBIG } from './flair-big.js';

const LANGS = ['en', 'tr', 'es', 'pt', 'ru', 'de', 'fr'];
// (freeEvery: from the two-row pass; read and ignored, like the server)
const KEYS = ['v', 'id', 'xp', 'freeEvery', 'waitTiers', 'soon', 'mul', 'lvMul', 'tiers', 'names'];
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isInt = (v) => typeof v === 'number' && Number.isFinite(v) && Math.round(v) === v;

/**
 * A season's content as the server stores it (pass.sql nd_pass_check, strictly; js/level.js cleanSeason keeps
 * whatever this accepts unchanged): one reward per tier { r }, only the pass's own rewards (no reward-catalog 'rw:'
 * and no journey item); an older { f, b } tier still reads as r = f, else b. → { ok, value, errors: [{ field, msg }] }
 */
export function checkPassContent(p) {
  const errors = [], err = (field, msg) => { errors.push({ field, msg }); return { ok: false, value: null, errors }; };
  const itemOk = (id) => typeof id === 'string' && Object.prototype.hasOwnProperty.call(ITEMS, id);
  if (!isObj(p)) return err('content', 'İçerik bir nesne olmalı.');
  for (const k of Object.keys(p)) if (!KEYS.includes(k)) return err(k, 'Bilinmeyen alan.');
  if ('v' in p && p.v !== 1) return err('v', 'Sürüm 1 olmalı.');
  if ('id' in p && (typeof p.id !== 'string' || !/^[a-z0-9_]{2,40}$/.test(p.id))) return err('id', 'Küçük harf, rakam ve _ (2–40).');
  if (!Array.isArray(p.tiers) || p.tiers.length < 1 || p.tiers.length > 60) return err('tiers', '1–60 kademe olmalı.');
  const tiers = [];
  for (let i = 0; i < p.tiers.length; i++) {
    const t = p.tiers[i];
    if (!isObj(t)) return err(`tiers.${i + 1}`, 'Kademe bir nesne olmalı.');
    for (const k of Object.keys(t)) if (!['r', 'f', 'b'].includes(k)) return err(`tiers.${i + 1}.${k}`, 'Yalnız r (ödül).');
    for (const k of ['r', 'f', 'b']) if (t[k] != null && !itemOk(t[k])) return err(`tiers.${i + 1}.${k}`, 'Pass ödülü değil (katalog ve yolculuk ödülleri pass\'e konmaz).');
    tiers.push({ r: 'r' in t ? t.r ?? null : t.f ?? t.b ?? null });
  }
  const xp = { early: 200, earlyN: 5, per: 400 };
  if ('xp' in p) {
    if (!isObj(p.xp)) return err('xp', 'Nesne olmalı.');
    for (const k of Object.keys(p.xp)) {
      if (!(k in xp)) return err(`xp.${k}`, 'Bilinmeyen alan.');
      const v = p.xp[k];
      if (!isInt(v) || (k === 'earlyN' ? v < 0 || v > 60 : v < 50 || v > 5000)) return err(`xp.${k}`, k === 'earlyN' ? '0–60 tam sayı.' : '50–5000 tam sayı.');
      xp[k] = v;
    }
  }
  const out = { v: 1, id: p.id ?? 's1', tiers, xp, waitTiers: 3, soon: 0, mul: 1, lvMul: 1 };
  for (const [k, lo] of [['waitTiers', 1], ['soon', 0]]) if (k in p) { if (!isInt(p[k]) || p[k] < lo || p[k] > 60) return err(k, `${lo}–60 tam sayı.`); out[k] = p[k]; }
  for (const k of ['mul', 'lvMul']) if (k in p) { if (typeof p[k] !== 'number' || !Number.isFinite(p[k]) || p[k] < 0.5 || p[k] > 3) return err(k, '0,5–3 arası.'); out[k] = p[k]; }
  if ('names' in p) {
    if (!isObj(p.names)) return err('names', 'Nesne olmalı.');
    for (const [k, v] of Object.entries(p.names)) if (!LANGS.includes(k) || typeof v !== 'string' || v.length < 1 || v.length > 40 || /[<>]/.test(v)) return err(`names.${k}`, 'Dil kodu ve 1–40 harf, < > olmadan.');
    out.names = p.names;
  }
  return { ok: true, value: out, errors };
}

/** The pictures (css px; o.scale shrinks). An unknown id or a catalog reward: a text mark. */
export function passPic(id, o = {}) {
  const r = RECT[id], s = o.scale || 1;
  if (!r) return `<span class="pp pp-txt" title="${id}">${/^rw:/.test(id) ? '賞' : '?'}</span>`;
  const [x, y, w, h] = r;
  return `<span class="pp" role="img" aria-label="${(ITEMS[id] && ITEMS[id].name) || id}" style="width:${w * s}px;height:${h * s}px;background-image:url(${ATLAS.src});background-size:${ATLAS.w * s}px ${ATLAS.h * s}px;background-position:${-x * s}px ${-y * s}px"></span>`;
}

export function createPass(h) {
  const { $, esc, rpc, friendly, onPane, fmtN, fmtDate, barList, tile, serverFieldMsg } = h;
  const S = { data: undefined, err: null, draft: null, msg: '', errs: [], season: null, tab: 'odul' };
  // the sub-pages of the Pass section, side by side at the top (the owner reads them one at a time, not by scrolling)
  const TABS = [['odul', 'Bu sezonun ödülleri'], ['sayi', 'Sayılar'], ['plan', 'Sezon planı'], ['sinir', 'Sınırlar']];
  const catName = (id) => { const c = (S.data && S.data.catalog || []).find((x) => x.id === id); return c ? (c.names.tr || c.names.en || id) : id; };
  const nameOf = (id) => (id == null ? '—' : /^rw:/.test(id) ? 'Katalog: ' + catName(id.slice(3)) : (ITEMS[id] && ITEMS[id].name) || id);
  const kindOf = (id) => (id == null ? '' : /^rw:/.test(id) ? 'Katalog ödülü' : (KINDS[ITEMS[id] && ITEMS[id].kind] || ''));
  const rewardCell = (id) => {
    if (id == null) return `<div class="pr-cell empty"><span class="muted small">Bu kademede ödül yok</span></div>`;
    const it = ITEMS[id] || {}, pic = it.kind === 'cos' ? passPic(id, { scale: 1.25 }) : passPic(id, { scale: 1.35 });
    const title = it.kind === 'title' ? `<b class="pr-title" style="color:${esc(it.color || 'inherit')}">${esc(it.name)}</b>` : `<b>${esc(nameOf(id))}</b>`;
    return `<div class="pr-cell b${it.kind === 'cos' ? ' cos' : ''}" data-item="${esc(id)}"><span class="pr-pic">${pic}</span><span class="pr-txt"><small>Reklamla · ${esc(kindOf(id))}</small>${title}</span></div>`;
  };
  // a typical fight brings about this much season XP (js/level.js: 100 fights, 60 % wins, the first win of the day
  // and its streak included, give ~5,400 XP) — for the "about N fights" hint
  const FIGHT_XP = 54;
  const tierXp = (C, t) => Math.min(t, C.xp.earlyN) * C.xp.early + Math.max(0, t - C.xp.earlyN) * C.xp.per;
  function tierList(C, testid) {
    const N = C.tiers.length, M = Math.max(N, C.soon | 0);
    return `<div class="pr-list" data-testid="${testid}">${C.tiers.map((t, i) => `<div class="pr-tier card"><div class="pr-n"><b>Kademe ${i + 1}</b><small class="muted">${fmtN(tierXp(C, i + 1))} sezon XP'si · yaklaşık ${fmtN(Math.max(1, Math.round(tierXp(C, i + 1) / FIGHT_XP)))} dövüş</small></div>
      ${rewardCell(t.r)}</div>`).join('')}${M > N ? `<div class="pr-tier card pr-soon" data-testid="${testid}-soon"><div class="pr-n"><b>Kademe ${N + 1}–${M} yakında</b></div><p class="small muted">Oyunda kilitli "?" kartları olarak görünür: "Yeni kademeler yakında · XP'n birikmeye devam ediyor". Oyuncunun sezon XP'si ${N}. kademeden sonra da birikir; yeni kademeler eklenince hemen sayılır.</p></div>` : ''}</div>`;
  }
  async function load() {
    try { S.data = await rpc('nd_admin_pass'); S.err = null; } catch (e) { S.err = e; S.data = null; }
    if (onPane('pass', 'shadow-duel')) paint();
    if (onPane('journey', 'shadow-duel')) paintJourney();
  }
  function current() { return S.data && S.data.current ? S.data.current : SEASON; }
  function draftFrom(c) { return JSON.parse(JSON.stringify({ id: c.id || 's1', xp: c.xp || SEASON.xp, waitTiers: c.waitTiers ?? 3, soon: c.soon ?? 0, mul: c.mul ?? 1, lvMul: c.lvMul ?? 1, tiers: c.tiers.map((t) => ({ r: 'r' in t ? t.r : t.f ?? t.b ?? null })) })); }
  // the pass's own rewards only (no catalog, no journey items: they come from elsewhere)
  function options(sel) {
    const groups = {};
    for (const [id, it] of Object.entries(ITEMS)) (groups[KINDS[it.kind] || it.kind] ||= []).push([id, it.name]);
    return `<option value="">— ödül yok</option>` + Object.entries(groups).map(([g, list]) => `<optgroup label="${esc(g)}">${list.map(([id, n]) => `<option value="${esc(id)}" ${id === sel ? 'selected' : ''}>${esc(n)}</option>`).join('')}</optgroup>`).join('');
  }
  function readDraft(form) {
    const d = S.draft, num = (n) => { const v = form.elements[n].value.trim().replace(',', '.'); return v === '' ? NaN : Number(v); };
    d.id = form.elements.id.value.trim();
    d.xp = { early: num('early'), earlyN: num('earlyN'), per: num('per') };
    d.waitTiers = num('waitTiers'); d.soon = num('soon'); d.mul = num('mul'); d.lvMul = num('lvMul');
    d.tiers = d.tiers.map((t, i) => ({ r: form.elements['r' + i].value || null }));
    S.season = Number(form.elements.season.value);
  }
  function zoom(id, label) {
    const r = RECT[id];
    if (!r) return;
    const k = Math.max(1, Math.min(4, (innerWidth - 48) / r[2], (innerHeight - 200) / r[3]));
    const it = ITEMS[id] || {}, big = BIG[id];
    // the sharp big picture (pass-big/<id>.webp, tools/pass-panel-big.mjs; costumes on every fighter); a title also as text
    const fb = !big && FBIG[id];
    const pic = big ? `<img class="pz-img" src="pass-big/${esc(id)}.webp" width="${big[0]}" height="${big[1]}" alt="${esc(nameOf(id))}">`
      : fb ? `<img class="pz-img" src="flair-big/${esc(id)}.webp" width="${fb[0]}" height="${fb[1]}" alt="${esc(nameOf(id))}">` : passPic(id, { scale: k });
    const ttl = (it.kind === 'title' || /^jt[23]_/.test(id)) ? `<b class="pr-title pz-title" style="color:${esc(it.color || 'inherit')}">${esc(nameOf(id))}</b>` : '';
    const d = document.createElement('div');
    d.className = 'pass-zoom'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true'); d.dataset.testid = 'pass-zoom';
    d.innerHTML = `<div class="pz-box"><div class="pz-pic">${pic}</div>${ttl}<div class="pz-txt"><small>${esc(label || kindOf(id))}</small><b>${esc(nameOf(id))}</b></div><button type="button" class="btn" data-pz="close">Kapat</button></div>`;
    const close = () => { d.remove(); removeEventListener('keydown', esc_); };
    const esc_ = (e) => { if (e.key === 'Escape') close(); };
    d.onclick = (e) => { if (e.target === d || e.target.dataset.pz === 'close') close(); };
    addEventListener('keydown', esc_);
    document.body.appendChild(d);
    d.querySelector('[data-pz=close]').focus();
  }
  function paint() {
    const el = $('#pane');
    if (!el) return;
    if (S.data === undefined) { el.innerHTML = (h.top ? h.top() : '') + '<p class="muted">Yükleniyor…</p>'; load(); return; }
    if (S.err) { el.innerHTML = `${h.top ? h.top() : ''}<div class="warn-box" data-testid="pass-error">${S.err.missing || /does not exist|not find/i.test(String(S.err.message)) ? 'Pass bölümünün sunucu kurulumu henüz yapılmadı (games/06-shadow-duel/supabase/pass.sql). Kurulunca burada sezonun ödülleri, planı ve istatistikler görünür.' : esc(friendly(S.err))}</div>`; return; }
    const D = S.data, se = D.season, C = current(), st = D.stats || {};
    const left = Math.ceil((new Date(se.end) - Date.now()) / 864e5);
    const src = D.current ? 'Sunucudaki içerik' : 'Oyunun yerleşik sezonu (sunucuda içerik yok)';
    if (!S.draft) { S.draft = draftFrom(C); S.season = se.id + 1; }
    const adClaims = st.ad_claims | 0, claims = st.claims | 0, waitClaims = st.wait_claims | 0;
    const levels = (st.levels || []).map((b) => ({ label: 'Seviye ' + b.band, value: b.n, text: fmtN(b.n) }));
    // how far players got this season, in bands (the server counts each tier)
    // (each real tier on its own line: the track is short; the last one also counts those past it)
    const NT = C.tiers.length;
    const tiers = Array.from({ length: NT + 1 }, (_, t) => { const n = (st.tiers || []).filter((b) => (t === NT ? b.tier >= NT : b.tier === t)).reduce((x, b) => x + (b.n | 0), 0);
      return { label: t ? `Kademe ${t}${t === NT ? ' (son)' : ''}` : 'Henüz kademe yok', value: n, text: fmtN(n) }; });
    const set = D.settings || {};
    const prev = checkPassContent(S.draft);
    const tabs = `<div class="an-tabs" role="tablist" aria-label="Pass bölümleri" data-testid="pass-tabs">${TABS.map(([k, t]) => `<button type="button" role="tab" data-ptab="${k}" aria-selected="${k === S.tab}">${t}</button>`).join('')}</div>`;
    const parts = {
      odul: () => `<h3>Bu sezonun ödülleri</h3>
      <p class="small muted"><b>Bir ödüle dokun ya da tıkla: büyük açılır.</b> Pass tek sıradır: her kademede bir ödül ve her ödül <b>bir ödüllü reklamla</b> alınır (reklam sonuna kadar izlenince). Reklam gösterilemeyen yerde (reklam engelleyici, reklamsız sürüm) ödül ${esc(C.waitTiers)} kademe sonra ücretsiz açılır; son kademeler son kademeye gelince açılır. Pass kademeleri seviyeden ayrıdır: her sezon 1. kademeden başlar. Pass'te yalnız pass'in kendi ödülleri olur (sıralama kataloğu ve yolculuk ödülleri olmaz). "Yaklaşık dövüş" günün ilk galibiyeti dahil ortalama bir dövüşle (~${FIGHT_XP} XP) hesaplanır.</p>
      <p class="small" data-testid="pass-pace">${esc(C.tiers.length)} kademenin tamamı: ${fmtN(tierXp(C, C.tiers.length))} sezon XP'si ≈ ${fmtN(Math.round(tierXp(C, C.tiers.length) / FIGHT_XP))} dövüş (günde 10 dövüşle ~${fmtN(Math.ceil(tierXp(C, C.tiers.length) / FIGHT_XP / 10))} gün; sezon 28 gün).</p>
      ${tierList(C, 'pass-tiers')}`,
      sayi: () => `<div class="tiles" data-testid="pass-tiles">${tile('Oyuncu', fmtN(st.players | 0), 'çevrimiçi kimliği olan')}${tile('Son 7 gün', fmtN(st.active7 | 0), 'eşitleyen')}
        ${tile('Alınan ödül', fmtN(claims), `reklamla ${fmtN(adClaims)} · bekleyerek ${fmtN(waitClaims)}`)}${tile('Reklam izleyen', fmtN(st.ad_players | 0), 'bu sezon')}
        ${tile('Günün ilk galibiyeti', fmtN(st.daily_wins | 0), `${fmtN(st.daily_players | 0)} oyuncu`)}
        ${tile('Dereceli kalkanı', fmtN((st.shields || {}).held | 0), `elde · ${fmtN((st.shields || {}).players | 0)} oyuncu · kullanılan ${fmtN((st.shields || {}).used | 0)} (bugün ${fmtN((st.shields || {}).today | 0)})`)}</div>
      <div class="grid wide" style="margin-top:12px">
        <div class="card"><h3>Seviyeye göre oyuncu</h3>${barList(levels)}</div>
        <div class="card"><h3>Bu sezon ulaşılan kademe</h3>${barList(tiers)}</div>
      </div>`,
      plan: () => `<h3>Sezon planı</h3>
      <form class="card form" id="passPlan" novalidate>
        <p class="small muted">Oyun güncellemesi gerekmez: kaydedilen içerik o sezondan itibaren geçerli (sonraki sezonlar yenisi girilene dek bunu alır). Oyuncular bir sonraki açılışta görür.</p>
        <div class="two"><label class="f">Sezon<input name="season" inputmode="numeric" value="${esc(S.season)}"></label><label class="f">İçerik adı (id)<input name="id" value="${esc(S.draft.id)}"></label></div>
        <div class="two"><label class="f">İlk kademelerin XP'si<input name="early" inputmode="numeric" value="${esc(S.draft.xp.early)}"></label><label class="f">Kaç ilk kademe<input name="earlyN" inputmode="numeric" value="${esc(S.draft.xp.earlyN)}"></label><label class="f">Sonraki kademelerin XP'si<input name="per" inputmode="numeric" value="${esc(S.draft.xp.per)}"></label></div>
        <div class="two"><label class="f">Reklamsız yerde kaç kademe sonra açılır<input name="waitTiers" inputmode="numeric" value="${esc(S.draft.waitTiers)}"></label><label class="f">Duyurulan toplam kademe ("yakında" kartları; 0: yok)<input name="soon" inputmode="numeric" value="${esc(S.draft.soon)}"></label></div>
        <div class="two"><label class="f">Pass XP çarpanı (0,5–3)<input name="mul" inputmode="decimal" value="${esc(S.draft.mul)}"></label><label class="f">Seviye XP çarpanı (0,5–3)<input name="lvMul" inputmode="decimal" value="${esc(S.draft.lvMul)}"></label></div>
        <div class="pp-rows">${S.draft.tiers.map((t, i) => `<div class="pp-row one"><b>Kademe ${i + 1}</b><label class="f">Ödül (reklamla)<select name="r${i}">${options(t.r)}</select></label></div>`).join('')}</div>
        <div class="row"><button class="btn" type="button" data-pp="add">Kademe ekle</button><button class="btn" type="button" data-pp="del" ${S.draft.tiers.length <= 1 ? 'disabled' : ''}>Son kademeyi sil</button><button class="btn" type="button" data-pp="reset">Şu anki sezondan başla</button><button class="btn" type="button" data-pp="default" data-testid="pass-default">Oyunun yerleşik sezonundan başla (${esc((D.default || SEASON).tiers.length)} kademe)</button></div>
        ${S.errs.length ? `<div class="errors" data-testid="pass-errors">${S.errs.map((e) => `<div><b>${esc(e.field)}</b>: ${esc(e.msg)}</div>`).join('')}</div>` : ''}
        <div class="row"><button class="btn" type="button" data-pp="preview">Önizle</button><button class="btn primary" type="submit">Sezon ${esc(S.season)} için kaydet</button>
          ${(D.seasons || []).some((x) => x.season === S.season) ? `<button class="btn danger" type="button" data-pp="delete">Sezon ${esc(S.season)} içeriğini sil</button>` : ''}</div>
      </form>
      <div id="passPreview">${prev.ok ? `<h3 style="margin-top:16px">Önizleme · sezon ${esc(S.season)}</h3>${tierList(prev.value, 'pass-preview')}` : ''}</div>`,
      sinir: () => `<h3>Sunucu sınırları</h3>
      <form class="card form" id="passSet" novalidate>
        <div class="two"><label class="f">Eşitleme açık<select name="pass_enabled"><option value="1" ${set.pass_enabled !== '0' ? 'selected' : ''}>Açık</option><option value="0" ${set.pass_enabled === '0' ? 'selected' : ''}>Kapalı</option></select></label>
          <label class="f">Bir eşitlemede en az izin (XP)<input name="pass_xp_burst" inputmode="numeric" value="${esc(set.pass_xp_burst ?? '')}"></label>
          <label class="f">Dakika başına ek izin (XP)<input name="pass_xp_per_min" inputmode="numeric" value="${esc(set.pass_xp_per_min ?? '')}"></label></div>
        <div class="two"><label class="f">Günde en çok XP<input name="pass_xp_day" inputmode="numeric" value="${esc(set.pass_xp_day ?? '')}"></label>
          <label class="f">İlk eşitlemede en çok XP<input name="pass_xp_first" inputmode="numeric" value="${esc(set.pass_xp_first ?? '')}"></label>
          <label class="f">Günde en çok yeni pass ödülü<input name="pass_bonus_day" inputmode="numeric" value="${esc(set.pass_bonus_day ?? '')}"></label></div>
        <div class="two"><label class="f">Dereceli kalkanı (bir yenilgide puan düşmez; günde 1, en çok 3)<select name="pass_shield_on" data-testid="pass-shield-on"><option value="1" ${set.pass_shield_on !== '0' ? 'selected' : ''}>Açık</option><option value="0" ${set.pass_shield_on === '0' ? 'selected' : ''}>Kapalı</option></select></label></div>
        <button class="btn primary" type="submit">Sınırları kaydet</button></form>
      <h3 style="margin-top:20px">Girilen sezonlar</h3>
      <div class="scroll-x card"><table><thead><tr><th>Sezon</th><th>İçerik</th><th class="n">Kademe</th><th>Kaydedildi</th></tr></thead>
        <tbody>${(D.seasons || []).map((x) => `<tr><td>${x.season}</td><td>${esc(x.content.id)}</td><td class="n">${x.content.tiers.length}</td><td>${esc(fmtDate(x.updated_at))}</td></tr>`).join('') || '<tr><td colspan="4" class="muted">Henüz yok: oyun kendi yerleşik sezonunu oynuyor.</td></tr>'}</tbody></table></div>`,
    };
    el.innerHTML = `${h.top ? h.top() : ''}<div class="bar-head"><h2>Gölge Pass</h2><span class="muted small">Sezon ${se.id} · ${esc(fmtDate(se.start))} – ${esc(fmtDate(se.end))} · ${left > 0 ? left + ' gün kaldı' : 'bitti'} · ${src}</span></div>
      ${S.msg ? `<p class="ok-msg" data-testid="pass-msg">${esc(S.msg)}</p>` : ''}
      ${D.current && D.current.tiers.length < (D.default || SEASON).tiers.length ? `<div class="warn-box" data-testid="pass-short">Sunucudaki sezon içeriği ${esc(D.current.tiers.length)} kademe; oyunun 1.3.2 yerleşik sezonu ${esc((D.default || SEASON).tiers.length)} kademe. Yeni oyun sunucudakini gösterir: Sezon planı → "Oyunun yerleşik sezonundan başla" → bu sezon için kaydet.</div>` : ''}
      ${tabs}${(parts[S.tab] || parts.odul)()}`;
    el.querySelectorAll('[data-ptab]').forEach((b) => (b.onclick = () => { if (S.tab === 'plan' && $('#passPlan')) readDraft($('#passPlan')); S.tab = b.dataset.ptab; paint(); }));
    S.msg = '';
    // tap / click a reward: the picture big (as large as the screen allows, at most 4×), its name and kind
    el.querySelectorAll('.pr-cell[data-item], .pj-r[data-item]').forEach((c) => { c.tabIndex = 0; c.setAttribute('role', 'button'); c.onclick = () => zoom(c.dataset.item, c.dataset.label); c.onkeydown = (e) => { if (e.key === 'Enter') zoom(c.dataset.item, c.dataset.label); }; });
    const form = $('#passPlan');
    if (form) {
    form.oninput = () => { h.dirty && h.dirty(); };
    form.querySelectorAll('[data-pp]').forEach((b) => (b.onclick = async () => {
      readDraft(form);
      const a = b.dataset.pp;
      if (a === 'add') S.draft.tiers.push({ r: null });
      else if (a === 'del') S.draft.tiers.pop();
      else if (a === 'reset') S.draft = draftFrom(current());
      else if (a === 'default') S.draft = draftFrom((S.data && S.data.default) || SEASON);
      else if (a === 'delete') {
        try { S.data = (await rpc('nd_admin_pass_delete', { p_season: S.season }), await rpc('nd_admin_pass')); S.msg = `Sezon ${S.season} içeriği silindi.`; } catch (e) { S.errs = [{ field: 'sunucu', msg: serverFieldMsg(e) }]; }
      }
      if (a !== 'delete') { const c = checkPassContent(S.draft); S.errs = c.ok ? [] : c.errors; }
      paint();
      if (a === 'preview') { const p = $('#passPreview'); if (p) p.scrollIntoView({ block: 'start' }); }
    }));
    form.onsubmit = async (ev) => {
      ev.preventDefault();
      readDraft(form);
      const c = checkPassContent(S.draft);
      if (!c.ok) { S.errs = c.errors; paint(); return; }
      if (!Number.isInteger(S.season) || S.season < 1 || S.season > 100000) { S.errs = [{ field: 'sezon', msg: '1–100000 tam sayı.' }]; paint(); return; }
      try {
        await rpc('nd_admin_pass_save', { p_season: S.season, p_content: c.value });
        S.data = await rpc('nd_admin_pass'); S.errs = []; S.msg = `Kaydedildi: sezon ${S.season}. Oyuncular bir sonraki açılışta görür.`;
        h.done && h.done();
      } catch (e) { S.errs = [{ field: 'sunucu', msg: serverFieldMsg(e) }]; }
      paint();
    };
    }
    if ($('#passSet')) $('#passSet').onsubmit = async (ev) => {
      ev.preventDefault();
      const f = ev.target, p = {};
      for (const k of ['pass_enabled', 'pass_xp_burst', 'pass_xp_per_min', 'pass_xp_day', 'pass_xp_first', 'pass_bonus_day', 'pass_shield_on']) { const v = f.elements[k].value.trim(); if (v !== '') p[k] = Number(v); }
      try { const r = await rpc('nd_admin_pass_settings', { p }); S.data.settings = r.settings; S.msg = 'Sınırlar kaydedildi.'; h.done && h.done(); } catch (e) { S.errs = [{ field: 'sınır', msg: serverFieldMsg(e) }]; }
      paint();
    };
  }
  // Ödüller → Yolculuk ödülleri: each ninja's Menkyo / Kaiden rewards (the 2nd and 3rd journey clear; not pass rewards)
  // and how many players cleared each journey 1, 2, 3 times
  function paintJourney() {
    const el = $('#pane');
    if (!el) return;
    const top = h.tabsFor ? h.tabsFor('journey') : '';
    if (S.data === undefined) { el.innerHTML = top + '<p class="muted">Yükleniyor…</p>'; load(); return; }
    if (S.err) { el.innerHTML = `${top}<div class="warn-box" data-testid="pass-error">${esc(friendly(S.err))}</div>`; return; }
    const st = (S.data && S.data.stats) || {}, J = st.journeys || [];
    el.innerHTML = `${top}<div class="bar-head"><h2>Yolculuk ödülleri</h2><span class="muted small">Shadow Duel · aynı ninjanın yolculuğunu 2. ve 3. kez bitirme ödülleri (pass'ten değil, yolculuktan gelir)</span></div>
      <div class="pj-list" data-testid="pass-journey-rewards">${NINJAS.map((n) => { const j = JOURNEY[n]; return `<div class="pj card"><div class="pj-h"><b class="pj-k" style="color:${esc(j.ui)}">${esc(j.kanji)}</b><b>${esc(j.name)}</b></div>
        <div class="pj-r" data-item="jc2_${n}" data-label="2. bitiriş · Menkyo"><span class="pr-pic">${passPic('jc2_' + n, { scale: 1.1 })}</span><span class="pr-txt"><small>2. bitiriş · Menkyo</small><b>${esc(j.jc2)}</b><small>Unvan: ${esc(j.jt2)}</small></span></div>
        <div class="pj-r" data-item="jc3_${n}" data-label="3. bitiriş · Kaiden"><span class="pr-pic">${passPic('jc3_' + n, { scale: 1.1 })}</span><span class="pr-txt"><small>3. bitiriş · Kaiden</small><b>${esc(j.jc3)}</b><small>Unvan: ${esc(j.jt3)}</small></span></div></div>`; }).join('')}</div>
      <div class="card" style="margin-top:12px"><h3>Yolculuk: kaç oyuncu kaç kez bitirdi</h3>
        <div class="scroll-x"><table data-testid="pass-journeys"><thead><tr><th>Ninja</th><th class="n">1 kez</th><th class="n">2 kez (Menkyo)</th><th class="n">3 kez (Kaiden)</th></tr></thead>
        <tbody>${J.map((j) => `<tr><td>${esc((JOURNEY[j.ninja] || {}).name || j.ninja.charAt(0).toUpperCase() + j.ninja.slice(1))}</td><td class="n">${fmtN(j.one)}</td><td class="n">${fmtN(j.two)}</td><td class="n">${fmtN(j.three)}</td></tr>`).join('') || '<tr><td colspan="4" class="muted">Henüz veri yok.</td></tr>'}</tbody></table></div></div>`;
    el.querySelectorAll('.pj-r[data-item]').forEach((c) => { c.tabIndex = 0; c.setAttribute('role', 'button'); c.onclick = () => zoom(c.dataset.item, c.dataset.label); c.onkeydown = (e) => { if (e.key === 'Enter') zoom(c.dataset.item, c.dataset.label); }; });
  }
  return { load, paint, paintJourney, reset() { S.data = undefined; S.draft = null; } };
}
