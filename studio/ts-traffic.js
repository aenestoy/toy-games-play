// Studio panel — Truckstead → İçerik → Trafik araçları: the remote traffic settings' editor (docs/STUDYO-PANELI.md "Trafik
// ayarları (Truckstead)"; the owner, 2026-10-07: "plan uygun"). Not a new page or tab: a fold at the top of the
// İçerik section's Trafik araçları group (content.js `extras`; its "Ayarlar" chip shows it alone).
//   rules   the group's `settings` in content/truckstead/catalog.json (made from games/11-truckstead/src/data/
//           trafficconfig.ts by scripts/panel-content.mjs): kinds, areas, limits, allowed kinds, defaults, names
//   server  supabase/studio/ts-traffic.sql: ts_traffic_admin (read, admins), ts_traffic_save (p: the settings, null:
//           back to the defaults); it refuses any value outside the same limits ('st:bad:<field>')
//   game    reads them at its next start (games/11-truckstead/src/app/trafficconfig.ts) and holds every value to the
//           limits again; no answer → its defaults
// The editor's controls can only make values inside the limits; checkDraft() checks again before saving.

const isObj = (x) => !!x && typeof x === 'object' && !Array.isArray(x);
const round = (v, step) => Math.round(Math.round(v / step) * step * 1000) / 1000;

/** A full config (internal form: mix as an array in kind order) from the server's (possibly partial, or null). */
export function fromWire(S, cfg) {
  const out = JSON.parse(JSON.stringify(S.defaults));
  if (!isObj(cfg)) return out;
  for (const c of S.countries) {
    if (!isObj(cfg[c])) continue;
    for (const a of S.areas) {
      const ra = cfg[c][a];
      if (!isObj(ra)) continue;
      const t = out[c][a];
      for (const f of ['density', 'speed']) if (typeof ra[f] === 'number' && Number.isFinite(ra[f])) t[f] = Math.min(S.limits[f].max, Math.max(S.limits[f].min, round(ra[f], S.limits[f].step)));
      if (isObj(ra.mix)) {
        const mix = t.mix.slice();
        S.kinds.forEach((k, i) => {
          if (!S.allowed[c][a].includes(k)) { mix[i] = 0; return; }
          const w = ra.mix[k];
          if (typeof w === 'number' && Number.isFinite(w)) mix[i] = Math.min(S.limits.weight.max, Math.max(0, Math.round(w)));
        });
        if (mix.some((w) => w > 0)) t.mix = mix;
      }
      if ('parked' in t && typeof ra.parked === 'boolean') t.parked = ra.parked;
      if ('crowd' in t && typeof ra.crowd === 'boolean') t.crowd = ra.crowd;
    }
  }
  return out;
}

/** The server's form (what is saved): every area, mix by kind name with only the allowed kinds. */
export function toWire(S, cfg) {
  const out = { v: S.v };
  for (const c of S.countries) {
    out[c] = {};
    for (const a of S.areas) {
      const t = cfg[c][a];
      const mix = {};
      S.kinds.forEach((k, i) => { if (S.allowed[c][a].includes(k)) mix[k] = t.mix[i]; });
      const o = { density: t.density, speed: t.speed, mix };
      if ('parked' in t) o.parked = t.parked;
      if ('crowd' in t) o.crowd = t.crowd;
      out[c][a] = o;
    }
  }
  return out;
}

/** Problems that keep the draft from being saved: [{ field, msg }] (empty: fine). */
export function checkDraft(S, cfg) {
  const errs = [];
  const inRange = (v, L) => typeof v === 'number' && Number.isFinite(v) && v >= L.min - 1e-9 && v <= L.max + 1e-9 && (!L.step || Math.abs(round(v, L.step) - v) < 1e-9);
  for (const c of S.countries) {
    for (const a of S.areas) {
      const t = cfg[c][a];
      const at = `${c}.${a}`;
      if (!inRange(t.density, S.limits.density)) errs.push({ field: at + '.density', msg: `yoğunluk %${S.limits.density.min * 100}–${S.limits.density.max * 100} arası olmalı` });
      if (!inRange(t.speed, S.limits.speed)) errs.push({ field: at + '.speed', msg: `hız %${S.limits.speed.min * 100}–${S.limits.speed.max * 100} arası olmalı` });
      let sum = 0;
      S.kinds.forEach((k, i) => {
        const w = t.mix[i];
        if (!S.allowed[c][a].includes(k)) { if (w) errs.push({ field: `${at}.mix.${k}`, msg: 'bu yolda bu araç yok' }); return; }
        if (!Number.isInteger(w) || w < S.limits.weight.min || w > S.limits.weight.max) errs.push({ field: `${at}.mix.${k}`, msg: `0–${S.limits.weight.max} arası tam sayı olmalı` });
        else sum += w;
      });
      if (sum <= 0) errs.push({ field: at + '.mix', msg: 'en az bir araç türü 0\'dan büyük olmalı' });
    }
  }
  return errs;
}

/** How many settings differ from the defaults (a mix counts once per kind). */
export function changedCount(S, cfg) {
  let n = 0;
  for (const c of S.countries) for (const a of S.areas) n += areaChanges(S, cfg, c, a);
  return n;
}
export function areaChanges(S, cfg, c, a) {
  const t = cfg[c][a], d = S.defaults[c][a];
  let n = 0;
  for (const f of ['density', 'speed', 'parked', 'crowd']) if (f in d && t[f] !== d[f]) n++;
  t.mix.forEach((w, i) => { if (w !== d.mix[i]) n++; });
  return n;
}

/**
 * The server's check (supabase/studio/ts-traffic.sql ts_traffic_check) in JavaScript, for the panel's stand-in server
 * (test/mock-server.mjs): the clean object, or throws Error('st:bad:<field>').
 */
export function serverCheck(L, p) {
  const bad = (f) => { throw new Error('st:bad:' + f); };
  if (!isObj(p)) bad('body');
  for (const k of Object.keys(p)) if (!['v', 'in', 'np'].includes(k)) bad(k);
  if ('v' in p && p.v !== 1) bad('v');
  const out = { v: 1 };
  const num = (x, lim, f) => {
    if (typeof x !== 'number' || !Number.isFinite(x)) bad(f);
    if (x < lim.min || x > lim.max) bad(f);
    if (lim.step && Math.abs(Math.round(x / lim.step) * lim.step - x) > 1e-9) bad(f);
    return x;
  };
  for (const c of ['in', 'np']) {
    if (!(c in p)) continue;
    if (!isObj(p[c])) bad(c);
    out[c] = {};
    for (const a of Object.keys(p[c])) {
      if (!['town', 'motorway', 'road', 'hill'].includes(a)) bad(`${c}.${a}`);
      const ra = p[c][a];
      if (!isObj(ra)) bad(`${c}.${a}`);
      for (const k of Object.keys(ra)) if (!['density', 'speed', 'mix', 'parked', 'crowd'].includes(k)) bad(`${c}.${a}.${k}`);
      const oa = {};
      if ('density' in ra) oa.density = num(ra.density, L.density, `${c}.${a}.density`);
      if ('speed' in ra) oa.speed = num(ra.speed, L.speed, `${c}.${a}.speed`);
      if ('mix' in ra) {
        if (!isObj(ra.mix)) bad(`${c}.${a}.mix`);
        const om = {};
        let sum = 0;
        for (const k of Object.keys(ra.mix)) {
          if (!L.allowed[c][a].includes(k)) bad(`${c}.${a}.mix.${k}`);
          om[k] = num(ra.mix[k], { ...L.weight, step: 1 }, `${c}.${a}.mix.${k}`);
          sum += om[k];
        }
        if (sum <= 0) bad(`${c}.${a}.mix`);
        oa.mix = om;
      }
      for (const k of ['parked', 'crowd']) {
        if (!(k in ra)) continue;
        if (!L[k][c].includes(a) || typeof ra[k] !== 'boolean') bad(`${c}.${a}.${k}`);
        oa[k] = ra[k];
      }
      out[c][a] = oa;
    }
  }
  return out;
}

const pctTxt = (v) => `%${Math.round(v * 100)}`;

export function createTrafficSettings({ esc, rpc, friendly, fmtDateTime, store }) {
  const KEY = 'studio.tc';
  const S0 = { loaded: false, loading: false, err: null, server: null, draft: null, c: 'in', a: 'town', open: false, msg: '', msgKind: '', saving: false, resetAsk: false };
  const S = { ...S0 };
  try { const m = JSON.parse(store.get(KEY) || '{}'); if (m.c) S.c = m.c; if (m.a) S.a = m.a; S.open = !!m.open; } catch { /* */ }
  const remember = () => store.set(KEY, JSON.stringify({ c: S.c, a: S.a, open: S.open }));
  let only = false;
  let schema = null;
  let root = null;

  async function load() {
    if (S.loading) return;
    S.loading = true;
    try {
      S.server = await rpc('ts_traffic_admin');
      S.err = null;
      S.draft = fromWire(schema, S.server && S.server.cfg);
    } catch (e) {
      S.err = e;
      if (!S.draft) S.draft = fromWire(schema, null);
    }
    S.loading = false;
    S.loaded = true;
    paint();
  }

  const dirty = () => S.draft && JSON.stringify(S.draft) !== JSON.stringify(fromWire(schema, S.server && S.server.cfg));

  function serverLine() {
    if (S.err) return `<div class="warn-box" data-testid="tc-error">${S.err.missing ? 'Trafik ayarlarının sunucu kurulumu henüz yapılmadı (supabase/studio/ts-traffic.sql, sahip onayıyla uygulanır). Ayarlar aşağıda görünür ama kaydedilemez; oyun kendi varsayılanlarıyla oynar.' : esc(friendly(S.err))}</div>`;
    if (!S.loaded) return '<p class="muted small">Sunucudaki ayar geliyor…</p>';
    const cfg = S.server && S.server.cfg;
    if (!cfg) return '<p class="small" data-testid="tc-server">Sunucuda: <b>varsayılan</b> (ayar yok). Oyun kendi ayarlarıyla oynuyor.</p>';
    const n = changedCount(schema, fromWire(schema, cfg));
    return `<p class="small" data-testid="tc-server">Sunucuda: <b>${n ? `${n} değişiklik` : 'varsayılanla aynı'}</b>${S.server.at ? ` · ${esc(fmtDateTime(S.server.at))}` : ''}${S.server.mine ? ' (sen)' : ''}. Oyuncular bir sonraki açılışta bununla oynar.</p>`;
  }

  function slider(field, label, value, L, def, fmt, note) {
    const changed = value !== def;
    return `<div class="tc-row${changed ? ' tc-changed' : ''}" data-field="${esc(field)}">
      <label><span>${esc(label)}</span><b data-testid="tc-val">${esc(fmt(value))}</b></label>
      <input type="range" min="${L.min}" max="${L.max}" step="${L.step || 1}" value="${value}" data-tc="${esc(field)}" aria-label="${esc(label)}">
      <small class="muted">varsayılan ${esc(fmt(def))}${note ? ' · ' + esc(note) : ''}</small>
    </div>`;
  }
  function toggle(field, label, value, def, note) {
    return `<div class="tc-row tc-tog${value !== def ? ' tc-changed' : ''}" data-field="${esc(field)}">
      <label><input type="checkbox" data-tc="${esc(field)}"${value ? ' checked' : ''}> <span>${esc(label)}</span></label>
      <small class="muted">varsayılan ${def ? 'açık' : 'kapalı'}${note ? ' · ' + esc(note) : ''}</small>
    </div>`;
  }

  function areaHtml() {
    const c = S.c, a = S.a, t = S.draft[c][a], d = schema.defaults[c][a];
    const L = schema.limits;
    const allowed = schema.allowed[c][a];
    const sum = t.mix.reduce((x, y) => x + y, 0) || 1;
    const kinds = schema.kinds.map((k, i) => [k, i]).filter(([k]) => allowed.includes(k));
    return `<div class="tc-area" data-testid="tc-area" data-c="${c}" data-a="${a}">
      ${slider(`${c}.${a}.density`, 'Araç yoğunluğu', t.density, L.density, d.density, pctTxt, 'oyunun araç sayısına göre; araç havuzunu hiçbir zaman aşmaz')}
      ${slider(`${c}.${a}.speed`, 'Hız', t.speed, L.speed, d.speed, pctTxt, 'araçların seyir hızı')}
      <h4 class="tc-h">Araç türlerinin payı</h4>
      <p class="small muted">Ağırlık 0–${L.weight.max}; yüzde, bu yoldaki araçlardan payıdır. Yalnız bu ülkede bu yolda olan türler.</p>
      ${kinds.map(([k, i]) => slider(`${c}.${a}.mix.${k}`, schema.kindNames[c][k], t.mix[i], { min: 0, max: L.weight.max, step: 1 }, d.mix[i], (v) => `${v} · ${pctTxt(v / sum)}`)).join('')}
      ${'parked' in t || 'crowd' in t ? '<h4 class="tc-h">Aç / kapa</h4>' : ''}
      ${'parked' in t ? toggle(`${c}.${a}.parked`, 'Park etmiş araçlar', t.parked, d.parked, a === 'town' ? 'cadde kenarında duran araba, rikşa, otobüs' : 'yol kenarı otobüs durakları') : ''}
      ${'crowd' in t ? toggle(`${c}.${a}.crowd`, 'Kalabalık şehir', t.crowd, d.crowd, 'tır şehirdeyken fazladan araç') : ''}
      <button type="button" class="btn small" data-tcact="area-default"${areaChanges(schema, S.draft, c, a) ? '' : ' disabled'}>Bu yolu varsayılana döndür</button>
    </div>`;
  }

  function paint() {
    if (!root || !root.isConnected || !schema) return;
    const errs = S.draft ? checkDraft(schema, S.draft) : [];
    const n = S.draft ? changedCount(schema, S.draft) : 0;
    const canSave = S.loaded && !S.err && dirty() && !errs.length && !S.saving;
    const log = (S.server && S.server.log) || [];
    // the fold as the owner left it: read from the page now, not from a click's later timer (a repaint before that timer
    // ran - a slider moved, the server's answer arriving - used to shut the fold he had just opened). On the "Ayarlar"
    // chip it is held open, which is not his choice: leave S.open alone there.
    const was = root.querySelector('details[data-testid=tc]');
    if (was && !only && was.open !== S.open) { S.open = was.open; remember(); }
    root.innerHTML =`<details class="block tc" data-testid="tc"${S.open || only ? ' open' : ''}>
      <summary><b>Trafik ayarları</b> <span class="muted small" data-testid="tc-sum">${!S.loaded ? '…' : S.err ? 'sunucu kurulmadı' : S.server && S.server.cfg ? 'sunucuda değişiklik var' : 'varsayılan'}${dirty() ? ' · kaydedilmemiş değişiklik' : ''}</span></summary>
      <p class="small muted">Oyunu güncellemeden trafiği değiştirir: ülke ve yol türü başına araç yoğunluğu, hız, araç türlerinin payı, park etmiş araçlar ve kalabalık şehir. Oyun bir sonraki açılışta bir kez okur; sunucuya ulaşamazsa kendi varsayılanlarıyla oynar. Sınırlar telefonu yormayacak kadar dar.</p>
      ${serverLine()}
      ${S.draft ? `
      <div class="chips" role="group" aria-label="Ülke" data-testid="tc-countries">${schema.countries.map((c) => `<button type="button" data-tcc="${c}" aria-pressed="${c === S.c}">${esc(schema.countryNames[c])}${areaSum(c) ? ` <span class="ct-n">${areaSum(c)}</span>` : ''}</button>`).join('')}</div>
      <div class="chips" role="group" aria-label="Yol türü" data-testid="tc-areas">${schema.areas.map((a) => `<button type="button" data-tca="${a}" aria-pressed="${a === S.a}">${esc(schema.names[a])}${areaChanges(schema, S.draft, S.c, a) ? ` <span class="ct-n">${areaChanges(schema, S.draft, S.c, a)}</span>` : ''}</button>`).join('')}</div>
      ${S.a === 'town' ? '<p class="small muted">Şehir içi: şehirlerin alanındaki bütün yollar (oradaki otoban dahil).</p>' : ''}
      ${areaHtml()}
      ${errs.length ? `<div class="warn-box" data-testid="tc-errs">${errs.map((e) => `${esc(e.field)}: ${esc(e.msg)}`).join('<br>')}</div>` : ''}
      <div class="tc-foot">
        <button type="button" class="btn primary" data-tcact="save" data-testid="tc-save"${canSave ? '' : ' disabled'}>${S.saving ? 'Kaydediliyor…' : 'Kaydet'}</button>
        <button type="button" class="btn" data-tcact="undo"${dirty() ? '' : ' disabled'}>Vazgeç</button>
        <span class="muted small">${n ? `varsayılandan ${n} fark` : 'hepsi varsayılan'}</span>
      </div>
      <div class="tc-reset">
        ${S.resetAsk
          ? `<p class="small">Sunucudaki ayar silinir; oyuncular bir sonraki açılışta oyunun kendi ayarlarıyla oynar.</p><button type="button" class="btn danger" data-tcact="reset-yes" data-testid="tc-reset-yes">Evet, hepsini varsayılana döndür</button> <button type="button" class="btn" data-tcact="reset-no">Hayır</button>`
          : `<button type="button" class="btn" data-tcact="reset" data-testid="tc-reset"${S.loaded && !S.err && S.server && S.server.cfg ? '' : ' disabled'}>Hepsini varsayılana döndür</button>`}
      </div>` : ''}
      ${S.msg ? `<p class="small tc-msg ${S.msgKind}" data-testid="tc-msg" role="status">${esc(S.msg)}</p>` : ''}
      ${log.length ? `<p class="small muted" data-testid="tc-log">Son değişiklikler: ${log.slice(0, 5).map((l) => `${esc(fmtDateTime(l.at))}${l.reset ? ' (varsayılana döndü)' : ''}${l.mine ? '' : ' (başka hesap)'}`).join(' · ')}</p>` : ''}
    </details>`;
  }
  const areaSum = (c) => schema.areas.reduce((n, a) => n + areaChanges(schema, S.draft, c, a), 0);

  function set(field, value) {
    const [c, a, f, k] = field.split('.');
    const t = S.draft[c][a];
    if (f === 'mix') t.mix[schema.kinds.indexOf(k)] = Math.round(Number(value));
    else if (f === 'parked' || f === 'crowd') t[f] = !!value;
    else t[f] = round(Number(value), schema.limits[f].step);
    S.msg = '';
  }

  async function save(cfg) {
    S.saving = true;
    S.msg = '';
    paint();
    try {
      S.server = await rpc('ts_traffic_save', { p: cfg });
      S.draft = fromWire(schema, S.server.cfg);
      S.msg = cfg ? 'Kaydedildi. Oyuncular bir sonraki açılışta bu ayarla oynar.' : 'Varsayılana döndü: sunucuda ayar yok.';
      S.msgKind = 'ok';
    } catch (e) {
      const m = /st:bad:([\w.]+)/.exec((e && e.message) || '');
      S.msg = m ? `Sunucu kabul etmedi: ${m[1]} alanı.` : friendly(e);
      S.msgKind = 'bad';
    }
    S.saving = false;
    S.resetAsk = false;
    paint();
  }

  // only: the group's "Ayarlar" chip (content.js extraFilter) - the editor alone, open
  function mount(el, group, opts = {}) {
    only = !!opts.only;
    root = el;
    if (!group.settings) { el.innerHTML = ''; return; }
    if (!schema || schema !== group.settings) { schema = group.settings; if (S.draft) S.draft = fromWire(schema, toWire(schema, S.draft)); }
    if (!S.draft) S.draft = fromWire(schema, null);
    paint();
    if (!S.loaded && !S.loading) load();
    el.oninput = (e) => {
      const x = e.target.closest('input[type=range][data-tc]');
      if (!x) return;
      set(x.dataset.tc, x.value);
      // (the slider being dragged stays; only the numbers and marks change)
      const row = x.closest('.tc-row');
      const v = row.querySelector('[data-testid=tc-val]');
      const [c, a, f] = x.dataset.tc.split('.');
      if (f === 'mix') {
        const t = S.draft[c][a], sum = t.mix.reduce((p, q) => p + q, 0) || 1;
        root.querySelectorAll('.tc-area input[data-tc*=".mix."]').forEach((y) => { const w = Number(y.value); y.closest('.tc-row').querySelector('[data-testid=tc-val]').textContent = `${w} · ${pctTxt(w / sum)}`; });
      } else v.textContent = pctTxt(Number(x.value));
    };
    el.onchange = (e) => {
      const x = e.target.closest('input[data-tc]');
      if (!x) return;
      set(x.dataset.tc, x.type === 'checkbox' ? x.checked : x.value);
      paint();
    };
    el.onclick = (e) => {
      const sm = e.target.closest('summary');
      // (remembered here too for when nothing repaints; paint() reads the fold itself first)
      if (sm) { setTimeout(() => { if (only) return; const d = root.querySelector('details[data-testid=tc]'); if (d) { S.open = d.open; remember(); } }, 0); return; }
      const cb = e.target.closest('[data-tcc]');
      if (cb) { S.c = cb.dataset.tcc; remember(); paint(); return; }
      const ab = e.target.closest('[data-tca]');
      if (ab) { S.a = ab.dataset.tca; remember(); paint(); return; }
      const act = e.target.closest('[data-tcact]');
      if (!act || act.disabled) return;
      const k = act.dataset.tcact;
      if (k === 'area-default') { S.draft[S.c][S.a] = JSON.parse(JSON.stringify(schema.defaults[S.c][S.a])); S.msg = ''; paint(); }
      else if (k === 'undo') { S.draft = fromWire(schema, S.server && S.server.cfg); S.msg = ''; paint(); }
      else if (k === 'save') { if (!checkDraft(schema, S.draft).length) save(toWire(schema, S.draft)); }
      else if (k === 'reset') { S.resetAsk = true; paint(); }
      else if (k === 'reset-no') { S.resetAsk = false; paint(); }
      else if (k === 'reset-yes') save(null);
    };
  }

  return { mount, reload: () => { S.loaded = false; load(); }, state: S };
}
