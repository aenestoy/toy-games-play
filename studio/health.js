// Studio panel — the "Sistem" section (studio page): system health and security checks.
// docs/STUDYO-PANELI.md "Sistem sağlığı"; data from supabase/studio/health.sql (st_health_view, st_health_history,
// st_health_accept, admin only); "Şimdi kontrol et" asks the studio-notify function (action 'health').
// Kept in its own file: app.js only routes to it (the section 'system', address #/sistem).

const GROUPS = [['supabase', 'Supabase'], ['cloudflare', 'Cloudflare'], ['sites', 'Oyun siteleri'], ['security', 'Güvenlik'], ['limits', 'Sınırlar']];
const WORD = { ok: 'Yolunda', warn: 'Dikkat', bad: 'Sorun', unknown: 'Bilinmiyor' };
const HEAD = { ok: 'Her şey yolunda', warn: 'Dikkat', bad: 'Sorun var', unknown: 'Henüz bilinmiyor' };
const RANK = { bad: 3, warn: 2, unknown: 1, ok: 0 };
const ICON = { ok: '✓', warn: '!', bad: '✕', unknown: '?' };
const KIND = { status: 'Durum', change: 'Değişiklik', resolved: 'Geri döndü', accepted: 'Kabul edildi', baseline: 'Taban' };

/** The worst status that counts (unknown only when nothing else is known). */
export function overall(checks) {
  // the "checks themselves" row only counts when it is not fine: alone it must not make an unknown page green
  const known = (checks || []).filter((c) => c.status !== 'unknown' && !(c.id === 'runner' && c.status === 'ok'));
  if (!known.length) return 'unknown';
  return known.reduce((a, c) => (RANK[c.status] > RANK[a] ? c.status : a), 'ok');
}

/**
 * ctx: { $, esc, rpc, friendly, fmtDateTime, fmtDate, onPane, fnUrl, authFetch(url, body) → Response }
 */
export function createSystem(ctx) {
  const { $, esc, rpc, friendly, fmtDateTime, onPane } = ctx;
  const S = { view: null, err: null, loading: false, busy: false, msg: '', hist: {}, open: new Set(), at: 0 };
  const dot = (s) => `<span class="hdot ${esc(s)}" aria-hidden="true">${ICON[s] || '?'}</span>`;
  const ago = (t) => {
    if (!t) return '—';
    const m = Math.round((Date.now() - Date.parse(t)) / 60000);
    return m < 1 ? 'az önce' : m < 60 ? `${m} dk önce` : m < 1440 ? `${Math.round(m / 60)} sa önce` : fmtDateTime(t);
  };
  const linkHtml = (l) => {
    if (!l) return '';
    if (l.startsWith('#/')) return `<a class="btn" href="${esc(l)}">Panelde aç</a>`;
    if (/^https:\/\//.test(l)) return `<a class="btn" href="${esc(l)}" target="_blank" rel="noopener noreferrer">Aç ↗</a>`;
    return '';
  };

  async function load() {
    S.loading = true;
    try { S.view = await rpc('st_health_view'); S.err = null; S.at = Date.now(); } catch (e) { S.err = e; }
    S.loading = false;
    paint();
    ctx.onStatus?.(status());
  }
  const status = () => (S.view ? overall(S.view.checks) : null);

  // ---------------------------------------------------------------- charts (single series: no legend; hover tips)
  /** A 30-day line of the daily averages (or hourly points) plus a strip of the worst status per point. */
  function trend(points, { unit = '', hourly = false } = {}) {
    const pts = (points || []).filter((p) => p);
    if (!pts.length) return '<p class="small muted">Henüz geçmiş yok.</p>';
    const W = 300, H = 56, pad = 4;
    const vals = pts.map((p) => (p.v == null ? null : Number(p.v)));
    const has = vals.some((v) => v != null);
    // the shape matters here (a trend), so the line spans its own range; the numbers below say where it starts and ends
    const nums = vals.filter((v) => v != null);
    const max = nums.length ? Math.max(...nums) : 0, min = nums.length ? Math.min(...nums) : 0;
    const span = max - min || Math.abs(max) || 1;
    const x = (i) => (pts.length === 1 ? W / 2 : pad + (i * (W - 2 * pad)) / (pts.length - 1));
    const y = (v) => H - pad - ((v - min) / span) * (H - 2 * pad);
    const when = (p) => (hourly ? fmtDateTime(p.at) : ctx.fmtDate(p.d + 'T12:00:00Z', { day: 'numeric', month: 'short' }));
    const tipOf = (p) => `${when(p)} · ${WORD[p.s] || p.s}${p.v == null ? '' : ` · ${String(p.v).replace('.', ',')} ${unit}`}`;
    let line = '';
    if (has) {
      let d = '', pen = false;
      vals.forEach((v, i) => { if (v == null) { pen = false; return; } d += `${pen ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`; pen = true; });
      line = `<path d="${d}" fill="none" stroke="var(--series-1)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>`;
    }
    const cw = (W - 2 * pad) / pts.length;
    const strip = pts.map((p, i) => `<rect x="${(pad + i * cw).toFixed(1)}" y="0" width="${Math.max(cw - 1, 1).toFixed(1)}" height="6" rx="1.5" class="hs ${esc(p.s)}"/>`).join('');
    const hits = pts.map((p, i) => `<rect x="${(pad + i * cw).toFixed(1)}" y="0" width="${cw.toFixed(1)}" height="${has ? H + 12 : 10}" fill="transparent" data-tip="${esc(tipOf(p))}"/>`).join('');
    const last = pts[pts.length - 1];
    const label = `${pts.length} nokta; son: ${tipOf(last)}${has ? `; en yüksek ${String(max).replace('.', ',')} ${unit}` : ''}`;
    return `<svg class="htrend" ${hourly ? 'data-hourly="1"' : ''} viewBox="0 0 ${W} ${has ? H + 12 : 10}" preserveAspectRatio="none" role="img" aria-label="${esc(label)}">
      ${has ? `<g transform="translate(0,10)">${line}</g>` : ''}<g>${strip}</g>${hits}</svg>
      <div class="kv small"><span>${hourly ? 'saat saat, son 30 gün' : 'gün gün, son 30 gün'}</span>${has ? `<span>en düşük ${esc(String(min).replace('.', ','))} · en yüksek ${esc(String(max).replace('.', ','))} ${esc(unit)}</span>` : ''}</div>`;
  }

  // ---------------------------------------------------------------- painting
  function checkHtml(c) {
    const open = S.open.has(c.id);
    const h = S.hist[c.id];
    const hist = h === 'loading' ? '<p class="small muted">Geçmiş yükleniyor…</p>'
      : Array.isArray(h) ? trend(h, { unit: c.unit, hourly: true })
        : trend(c.trend, { unit: c.unit });
    return `<details class="hc" data-id="${esc(c.id)}" data-status="${esc(c.status)}" ${open ? 'open' : ''}>
      <summary data-act="sys-open" data-id="${esc(c.id)}">${dot(c.status)}<span class="hc-t">${esc(c.title)}</span><span class="hc-v num">${esc(c.value_text || WORD[c.status])}</span></summary>
      <div class="hc-b">
        <p class="hc-msg"><b>${esc(WORD[c.status])}.</b> ${esc(c.msg)}</p>
        <div class="kv small">${c.limit_text ? `<span>Sınır: ${esc(c.limit_text)}</span>` : ''}<span>Son kontrol: ${esc(ago(c.checked_at))}</span>${c.since ? `<span>Bu durumda: ${esc(ago(c.since))}den beri</span>` : ''}</div>
        ${c.meaning ? `<p class="small"><b>Ne demek?</b> ${esc(c.meaning)}</p>` : ''}
        ${c.todo ? `<p class="small"><b>Ne yapmalı?</b> ${esc(c.todo)}</p>` : ''}
        ${linkHtml(c.link)}
        <div class="sub-h">Geçmiş</div>${hist}
      </div></details>`;
  }

  function paint() {
    const el = $('#pane');
    if (!el || !onPane('system', 'studio')) return;
    const V = S.view;
    const btn = `<button class="btn primary" type="button" data-act="sys-run" ${S.busy ? 'disabled' : ''}>${S.busy ? 'Kontrol ediliyor…' : 'Şimdi kontrol et'}</button>`;
    const note = S.msg ? `<p class="note" role="status" data-testid="sys-msg">${esc(S.msg)}</p>` : '';
    if (S.err) {
      el.innerHTML = `<div class="bar-head"><h2>Sistem</h2></div><div class="warn-box" data-testid="sys-error">${esc(friendly(S.err))}${S.err.missing ? ' (Sistem kontrolleri: supabase/studio/health.sql.)' : ''}</div>`;
      return;
    }
    if (!V) { el.innerHTML = '<div class="bar-head"><h2>Sistem</h2></div><p class="muted">Yükleniyor…</p>'; if (!S.loading) load(); return; }
    const checks = Array.isArray(V.checks) ? V.checks : [];
    const all = overall(checks);
    const count = (s) => checks.filter((c) => c.status === s).length;
    const problems = checks.filter((c) => c.status === 'bad' || c.status === 'warn').sort((a, b) => RANK[b.status] - RANK[a.status] || a.sort - b.sort);
    const hero = `<article class="card hhero ${all}" data-testid="sys-overall" data-status="${all}">
      <div class="hhero-top">${dot(all)}<div><div class="hhero-h">${esc(HEAD[all])}</div>
        <div class="small muted">${checks.length} kontrol · ${count('ok')} yolunda${count('warn') ? ` · ${count('warn')} dikkat` : ''}${count('bad') ? ` · ${count('bad')} sorun` : ''}${count('unknown') ? ` · ${count('unknown')} bilinmiyor` : ''}</div>
        <div class="small muted">Son kontrol: ${esc(ago(V.last_sql))}${V.last_http ? ` · dış kontroller ${esc(ago(V.last_http))}` : ''}</div></div></div>
      <div class="row">${btn}</div>
      <p class="small muted">Sorun (kırmızı) olunca telefona hemen bildirim gelir; dikkat (sarı) olanlar akşam 21:00 özetinde.</p></article>`;
    const todo = problems.length ? `<article class="card" data-testid="sys-problems"><h3 class="card-h">Bakılacaklar</h3><ul class="hlist">${problems.map((c) =>
      `<li>${dot(c.status)}<button class="linkish" type="button" data-act="sys-go" data-id="${esc(c.id)}">${esc(c.title)}</button> <span class="small muted">${esc(c.msg)}</span></li>`).join('')}</ul></article>` : '';
    const diffs = Array.isArray(V.diffs) ? V.diffs : [];
    const diffHtml = diffs.length ? `<article class="card" data-testid="sys-diffs"><h3 class="card-h">Beklenmeyen değişiklikler (${diffs.length})</h3>
      <p class="small muted">Veritabanı ya da yayındaki siteler "olması gereken" kayıttan farklı. Bunu sen ya da Claude yaptıysan kabul et; bilmiyorsan kabul etme, Claude'a sor.</p>
      <ul class="hlist">${diffs.slice(0, 40).map((d) => `<li data-item="${esc(d.item)}">${dot(d.severity)}<span class="grow">${esc(d.text)} <span class="small muted">· ${esc(ago(d.first_seen))}</span></span>
        <button class="ghost" type="button" data-act="sys-accept" data-item="${esc(d.item)}">Bilinen değişiklik olarak kabul et</button></li>`).join('')}</ul>
      ${diffs.length > 40 ? `<p class="small muted">+${diffs.length - 40} değişiklik daha.</p>` : ''}
      ${diffs.length > 1 ? '<div class="row"><button class="btn" type="button" data-act="sys-accept" data-item="*">Hepsini kabul et</button></div>' : ''}</article>` : '';
    const groups = GROUPS.map(([g, t]) => {
      const list = checks.filter((c) => c.grp === g).sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title, 'tr'));
      if (!list.length) return '';
      const gs = overall(list);
      return `<section class="card hgroup" data-testid="sys-group" data-grp="${g}" data-status="${gs}"><h3 class="card-h">${dot(gs)} ${esc(t)} <span class="small muted">${list.length} kontrol</span></h3>
        ${list.map(checkHtml).join('')}</section>`;
    }).join('');
    const ev = Array.isArray(V.events) ? V.events : [];
    const events = `<article class="card" data-testid="sys-events"><h3 class="card-h">Son olaylar</h3>${ev.length ? `<ul class="hlist hev">${ev.map((e) =>
      `<li>${dot(e.severity === 'info' ? 'ok' : e.severity)}<span class="grow"><b>${esc(e.title)}</b>${e.detail ? ` <span class="small">${esc(e.detail)}</span>` : ''}
        <span class="kv small"><span>${esc(fmtDateTime(e.at))}</span><span>${esc(KIND[e.kind] || e.kind)}</span>${e.pushed ? '<span>📱 bildirildi</span>' : ''}</span></span></li>`).join('')}</ul>`
      : '<p class="small muted">Henüz olay yok.</p>'}</article>`;
    el.innerHTML = `<div class="bar-head"><h2>Sistem</h2></div>${note}<div class="system">${hero}${todo}${diffHtml}<div class="hgroups">${groups}</div>${events}</div>`;
  }

  // ---------------------------------------------------------------- actions
  async function run() {
    if (S.busy) return;
    S.busy = true; S.msg = '';
    paint();
    let msg;
    try {
      const r = await ctx.authFetch(ctx.fnUrl, { action: 'health' });
      const j = await r.json().catch(() => ({}));
      if (r.status === 404 && !j.error) msg = 'Kontrol işlevi (studio-notify) henüz sunucuya yüklenmedi.';
      else if (!r.ok) msg = j.message || `Kontrol edilemedi (${r.status}).`;
      else msg = `Kontrol edildi.${j.alerts ? ` ${j.alerts} yeni sorun: telefona bildirildi.` : ''}`;
    } catch (e) { msg = 'Kontrol edilemedi: ' + ((e && e.message) || 'bağlantı yok'); }
    S.busy = false; S.msg = msg;
    await load();
  }
  async function accept(item) {
    const all = item === '*';
    const dlg = $('#dlg');
    dlg.innerHTML = `<form method="dialog" data-testid="sys-accept-dlg" novalidate>
      <div class="d-head"><h2 id="dlgTitle">${all ? 'Bütün değişiklikleri kabul et' : 'Bilinen değişiklik'}</h2><button class="ghost x" type="button" data-act="dlg-close" aria-label="Kapat">✕</button></div>
      <div class="d-body form">
        <p class="small">${all ? 'Açık değişikliklerin hepsi "olması gereken" olarak kaydedilir ve bir daha uyarmaz.' : 'Bu değişiklik "olması gereken" olarak kaydedilir ve bir daha uyarmaz.'}
          Kısa bir not yaz: ne yapıldı, kim yaptı.</p>
        <label class="f"><span>Not</span><input name="note" maxlength="200" required placeholder="ör. stats4.sql kuruldu"></label>
        <p class="field-err" hidden></p>
      </div>
      <div class="d-foot"><button class="btn" type="button" data-act="dlg-close">Vazgeç</button><button class="btn primary" type="submit">Kabul et</button></div></form>`;
    dlg.showModal();
    const f = dlg.querySelector('form');
    f.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const note = f.note.value.trim();
      const er = f.querySelector('.field-err');
      if (!note) { er.hidden = false; er.textContent = 'Not boş olamaz.'; return; }
      f.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      try {
        S.view = await rpc('st_health_accept', { p_item: item, p_note: note });
        S.msg = all ? 'Hepsi kabul edildi.' : 'Kabul edildi.';
        dlg.close();
        paint();
        ctx.onStatus?.(status());
      } catch (e) {
        er.hidden = false; er.textContent = e && e.message === 'st:health:item' ? 'Bu değişiklik artık açık değil; sayfa yenilendi.' : friendly(e);
        f.querySelectorAll('button').forEach((b) => { b.disabled = false; });
        if (e && e.message === 'st:health:item') load();
      }
    });
  }
  async function openCheck(id, el) {
    // <details> toggles itself after the click; remember it, then load the hourly history once
    const det = el.closest('details');
    setTimeout(async () => {
      if (det.open) S.open.add(id); else { S.open.delete(id); return; }
      if (S.hist[id] && S.hist[id] !== 'loading') return;
      S.hist[id] = 'loading';
      try { S.hist[id] = await rpc('st_health_history', { p_id: id, p_days: 30 }); } catch { delete S.hist[id]; }
      const box = document.querySelector(`details.hc[data-id="${CSS.escape(id)}"]`);
      const c = S.view && S.view.checks.find((x) => x.id === id);
      if (box && c) box.outerHTML = checkHtml(c);
    }, 0);
  }
  function click(act, el) {
    if (act === 'sys-run') { run(); return true; }
    if (act === 'sys-accept') { accept(el.dataset.item); return true; }
    if (act === 'sys-open') { openCheck(el.dataset.id, el); return true; }
    if (act === 'sys-go') {
      const box = document.querySelector(`details.hc[data-id="${CSS.escape(el.dataset.id)}"]`);
      if (box) { box.open = true; S.open.add(el.dataset.id); box.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      return true;
    }
    return false;
  }
  return { load, paint, click, status, state: S, render() { paint(); if (!S.view || Date.now() - S.at > 60000) load(); } };
}
