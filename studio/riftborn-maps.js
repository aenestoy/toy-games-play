import { MAP_PICTURES } from './riftborn-map-pictures.js?v=mob-portraits-v1';
import { SNAPSHOTS } from './riftborn-map-versions.js';
// Real inspection routes, not generated maps or invented historical snapshots.
export const DUNGEONS = ['Crypt Gate', 'Bone Galleries', 'Throne of the Hollow King', 'Moonlit Graves', 'Mausoleum Row', "The Gravekeeper's Yard", 'Ember Tunnels', 'The Frozen Halls', 'Forge of the Colossus', 'The Forgotten Temple', 'The Void Sanctum', 'Heart of the Rift'];
const BASE = 'https://aenestoy.github.io/toy-games-play/riftborn/';
export const VERIFIED = { date: '2026-10-14', source: '9b97fb433cc8448b2fbd3458cd43818008747213', preview: '4a675d27c87d957bee8d54998d10570e184c1b5c', bundle: 'index-CpWGtyQB.js' };
export function dungeonVersions(area) {
  if (!Number.isInteger(area) || area < 0 || area >= DUNGEONS.length) throw new Error('Unknown dungeon');
  const live = { id: 'live', title: 'Canlı · mevcut zindan', url: `${BASE}?inspect=1&area=${area}&mute=1&build=${VERIFIED.bundle}`, note: 'Güncel canlı bağlantı; yeni yayınlarla değişir. Dondurulmuş geçmiş sürüm değildir.' };
  const archived = [...SNAPSHOTS].reverse().map(v => ({ id: v.id, title: v.title + ' · kalıcı', url: `${v.base}?inspect=1&area=${area}&mute=1`, note: 'Bu tarihteki oyun dosyaları ve harita düzeni saklanır. Yeni yayınlar bu sürümü değiştirmez.' }));
  return area === 1 ? [live, ...archived, { id: 'scriptorium', title: 'Geliştirme · tek Arşiv odası', url: `${SNAPSHOTS[0].base}?inspect=1&area=1&room=scriptorium&mute=1`, note: 'Yalnız Arşiv odası inceleme örneği. Normal Bone haritası eski; tüm yeni Bone v2 yayımlanmadı. Aynı V1 paketinin kalıcı oda örneğidir.' }] : [live, ...archived];
}
export function createDungeonViews({ esc, store }) {
  const KEY = 'studio.riftborn.dungeon-view.v1';
  let saved = {}; try { saved = JSON.parse(store.get(KEY) || '{}') || {}; } catch { saved = {}; }
  let area = Number.isInteger(saved.area) && saved.area >= 0 && saved.area < DUNGEONS.length ? saved.area : 0;
  const selections = saved.selections && typeof saved.selections === 'object' ? saved.selections : {};
  const persist = () => store.set(KEY, JSON.stringify({ area, selections }));
  let mounted = null;
  function visual(section, row, mapArea, actualVersion) {
    const name = String(row[section.title === 'Bossun özel eşya havuzu' || section.title === 'Düşebilen set parçaları' ? 1 : 0]);
    if (section.title === 'Bu haritadaki moblar') {
      const src = actualVersion && MAP_PICTURES[JSON.stringify(['mob-portrait', mapArea, name])];
      return src ? { name, src, portrait: true, caption: 'Gerçek 3B mob modeli · V5' } : { name, missing: 'Bu sürümün ayrı mob görünümü kaydedilmedi' };
    }
    const world = ['Toplanabilen materyaller', 'Bu haritadaki moblar', 'Bosslar', 'Sandıklar ve çevre'].includes(section.title);
    if (world) {
      const key = JSON.stringify([mapArea, section.title, ...row.slice(0, section.title === 'Bu haritadaki moblar' ? 2 : 1)]);
      const src = actualVersion && MAP_PICTURES[key];
      return src ? { name, src, caption: 'Gerçek oyun görüntüsü · V5 · ortadaki nesne' } : { name, missing: actualVersion ? 'Bu haritada çekilmiş görüntüsü yok' : 'Bu eski sürümün gerçek görüntüsü kaydedilmedi' };
    }
    const inventoryKey = section.title === 'Düşebilen set parçaları' ? ['set', row[0], row[1]] : ['inventory', name];
    const inventory = actualVersion && MAP_PICTURES[JSON.stringify(inventoryKey)];
    if (inventory) return { name, src: inventory, caption: 'Oyunun kendi envanter görüntüsü · V5' };
    return { name, missing: section.title === 'Düşen materyaller' || section.title === 'Diğer ödüller' ? 'Doğrudan kayda eklenir; ayrı bir yer nesnesi gösterilmez' : 'Doğrulanmış oyun görüntüsü yok' };
  }
  function cards(section, sectionIndex, mapArea, actualVersion) {
    return '<div class="rb-content-cards">' + section.rows.map((row, rowIndex) => {
      const item = visual(section, row, mapArea, actualVersion);
      const image = item.src || null;
      const fields = row.map((value, i) => '<div><dt>' + esc(section.columns[i]) + '</dt><dd>' + esc(String(value ?? '')) + '</dd></div>').join('');
      return '<details class="rb-content-card' + (item.portrait ? ' rb-mob-portrait' : '') + '"><summary data-locate-section="' + sectionIndex + '" data-locate-row="' + rowIndex + '">' + (image ? '<img src="' + image + '" alt="' + esc(item.name) + '" loading="lazy" decoding="async" width="360" height="203">' : '<div class="rb-no-picture">' + esc(item.missing || 'Gerçek görüntü yok') + '</div>') + '<div class="rb-card-body"><strong>' + esc(item.name) + '</strong><span>' + esc(section.columns[1]) + ': ' + esc(String(row[1] ?? '')) + '</span>' + (section.columns.includes('Adet') ? '<b>' + esc(String(row[section.columns.indexOf('Adet')])) + ' adet</b>' : '') + (section.columns.includes('Toplam miktar') ? '<b>' + esc(String(row[2])) + ' adet · ' + esc(String(row[1])) + ' kaynak noktası</b>' : '') + (item.caption ? '<small>' + esc(item.caption) + '</small>' : '') + '<span class="rb-locate-action">' + (section.locations?.[rowIndex] ? '⌖ Haritada göster' : 'Ayrıntıları göster') + '</span></div></summary><div class="rb-card-detail">' + (image ? '<a href="' + image + '" target="_blank" rel="noopener">Görseli büyüt ↗</a>' : '') + '<dl>' + fields + '</dl></div></details>';
    }).join('') + '</div>';
  }
  let infoId = 0;
  function renderInfo(host, info) {
    if (!info || typeof info.name !== 'string' || !Array.isArray(info.sections) || info.sections.length > 30) return;
    const frameUrl = host.closest('article').querySelector('iframe').src;
    const actualVersion = frameUrl.includes('/2026-10-14-locate-v5/') || (frameUrl.includes('/riftborn/?') && VERIFIED.bundle === 'index-CpWGtyQB.js');
    const groups = [
      ['materials', 'Materyaller', ['Toplanabilen materyaller', 'Düşen materyaller']],
      ['mobs', 'Moblar', ['Bu haritadaki moblar']],
      ['bosses', 'Bosslar', ['Bosslar']],
      ['items', 'Eşyalar', ['Düşebilen temel eşyalar', 'Nadirlik koşulları', 'Bossun özel eşya havuzu', 'Düşebilen Unique eşyalar', 'Düşebilen set parçaları']],
      ['rewards', 'Ödüller', ['Diğer ödüller']],
      ['environment', 'Sandıklar ve çevre', ['Sandıklar ve çevre']],
      ['overview', 'Harita bilgisi', ['Harita özeti']],
    ];
    const known = new Set(groups.flatMap(g => g[2]));
    groups[6][2].push(...info.sections.filter(s => !known.has(s.title)).map(s => s.title));
    const id = 'rb-info-' + (++infoId);
    let active = groups.some(g => g[0] === host.dataset.tab) ? host.dataset.tab : 'mobs';
    const sectionHtml = section => {
      if (!Array.isArray(section.rows) || !Array.isArray(section.columns)) return '';
      const textOnly = section.title === 'Harita özeti' || section.title === 'Nadirlik koşulları';
      const body = textOnly ? '<div class="rb-info-scroll"><table><tbody>' + section.rows.map(row => '<tr>' + row.map(value => '<td>' + esc(String(value ?? '')) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>' : cards(section, info.sections.indexOf(section), info.area, actualVersion);
      return '<section class="rb-info-section"><h5>' + esc(section.title) + ' <small>(' + section.rows.length + ')</small></h5>' + (section.note ? '<p class="small muted">' + esc(section.note) + '</p>' : '') + (section.rows.length ? body : '<p class="small muted">Bu haritada yok / koşulları henüz açık değil.</p>') + '</section>';
    };
    host.innerHTML = '<h4>' + esc(info.name) + ' · Haritanın içeriği</h4><p class="small rb-location-note" role="status"></p><div class="rb-info-tabs" role="tablist" aria-label="Haritanın içerik türleri">' + groups.map(([key, label]) => '<button type="button" role="tab" data-info-tab="' + key + '" id="' + id + '-' + key + '-tab" aria-controls="' + id + '-' + key + '">' + label + '</button>').join('') + '</div><div class="rb-info-panels">' + groups.map(([key, label, titles]) => '<div role="tabpanel" tabindex="0" data-info-panel="' + key + '" id="' + id + '-' + key + '" aria-labelledby="' + id + '-' + key + '-tab">' + info.sections.filter(s => titles.includes(s.title)).map(sectionHtml).join('') + '</div>').join('') + '</div>';
    for (const card of host.querySelectorAll('[data-locate-section]')) card.addEventListener('click', () => {
      const section = Number(card.dataset.locateSection), row = Number(card.dataset.locateRow);
      const location = info.sections[section]?.locations?.[row];
      const note = host.querySelector('.rb-location-note');
      if (!location) { note.textContent = 'Bu eski sürümde konum gösterme yok. Üstteki Konum gösteren sürümü aç düğmesini kullan.'; return; }
      note.textContent = location.points.length + ' nokta · ' + location.note;
      const frame = host.closest('article').querySelector('iframe');
      frame.contentWindow.postMessage({ type: 'riftborn-inspection-locate', area: info.area, section, row }, new URL(frame.src).origin);
      if (location.points.length) requestAnimationFrame(() => frame.scrollIntoView({ behavior: 'instant', block: 'start' }));
    });
    const buttons = [...host.querySelectorAll('[data-info-tab]')];
    function select(key) {
      active = key;
      host.dataset.tab = key;
      for (const b of buttons) { b.setAttribute('aria-selected', String(b.dataset.infoTab === key)); b.tabIndex = b.dataset.infoTab === key ? 0 : -1; }
      for (const panel of host.querySelectorAll('[data-info-panel]')) panel.hidden = panel.dataset.infoPanel !== key;
      host.querySelector('.rb-info-panels').scrollTop = 0;
    }
    for (const b of buttons) {
      b.onclick = () => select(b.dataset.infoTab);
      b.onkeydown = e => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
        e.preventDefault();
        const at = buttons.indexOf(b);
        const next = e.key === 'Home' ? 0 : e.key === 'End' ? buttons.length - 1 : (at + (e.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
        select(buttons[next].dataset.infoTab);
        buttons[next].focus({ preventScroll: true });
        buttons[next].scrollIntoView({ block: 'nearest', inline: 'nearest' });
      };
    }
    select(active);
  }
  window.addEventListener('message', event => {
    if (!mounted?.isConnected || event.origin !== new URL(BASE).origin || !['riftborn-inspection-info', 'riftborn-inspection-ready'].includes(event.data?.type)) return;
    const frame = [...mounted.querySelectorAll('iframe')].find(f => f.contentWindow === event.source);
    if (!frame) return;
    if (event.data.type === 'riftborn-inspection-ready') { frame.contentWindow.postMessage({ type: 'riftborn-inspection-request' }, event.origin); return; }
    if (event.data.schema !== 1) return;
    if (typeof event.data.info?.name !== 'string') return;
    frame.closest('article').querySelector('[data-rb-heading]').textContent = event.data.info.name + ' · ' + frame.dataset.versionTitle;
    renderInfo(frame.closest('article').querySelector('[data-rb-info]'), event.data.info);
  });
  function mount(el) {
    mounted = el;
    if (!el) return;
    function paint() {
      const versions = dungeonVersions(area), chosen = versions.find(v => v.id === selections[area]?.version) || versions[0];
      const other = versions.find(v => v.id === selections[area]?.against && v.id !== chosen.id) || versions.find(v => v.id !== chosen.id);
      const compare = versions.length > 1 && selections[area]?.compare === true;
      el.innerHTML = `<section class="rb-dungeon-views" aria-label="Zindan sürümleri" data-testid="rb-dungeon-views">
        <style>.rb-locate-action{display:block!important;background:var(--accent-wash);border:1px solid var(--accent);border-radius:7px;padding:9px;text-align:center;color:var(--accent-ink)!important;font-weight:700!important}.rb-dungeon-views iframe{scroll-margin-top:110px}.rb-location-note{height:36px;overflow:auto;margin:6px 0}.rb-info-tabs{display:flex;flex-wrap:nowrap;gap:6px;overflow-x:auto;padding:6px 0 10px;max-width:100%}.rb-info-tabs button{flex:0 0 auto;white-space:nowrap;padding:10px 14px;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);cursor:pointer}.rb-info-tabs button[aria-selected="true"]{background:var(--accent-wash);border-color:var(--accent);color:var(--accent-ink);font-weight:700}.rb-info-tabs button:focus-visible{outline:2px solid var(--accent);outline-offset:-3px}.rb-info-panels{height:560px;overflow:auto;scrollbar-gutter:stable;overflow-anchor:none;padding-right:5px}.rb-info-panels [hidden]{display:none!important}.rb-info-section h5{font-size:14px;margin:0 0 10px}.rb-content-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(220px,100%),1fr));gap:14px;margin:14px 0;align-items:start}.rb-content-card{border:1px solid var(--line,#7775);border-radius:12px;overflow:hidden;background:var(--surface,#fcfcfb);color:var(--ink,#0b0b0b);min-width:0}.rb-content-card>summary{list-style:none;cursor:pointer}.rb-content-card>summary::-webkit-details-marker{display:none}.rb-content-card>summary:focus-visible{outline:2px solid #d6b777;outline-offset:-3px}.rb-content-card img{display:block;width:100%;height:auto;aspect-ratio:360/203;object-fit:contain;background:#14111c}.rb-content-card.rb-mob-portrait img{aspect-ratio:1;object-fit:contain;background:radial-gradient(ellipse at 50% 65%,#37313f,#15131a)}.rb-card-body{padding:12px;display:grid;gap:7px;overflow-wrap:anywhere}.rb-card-body strong{font-size:15px}.rb-card-body span,.rb-card-body small{font-size:12px;font-weight:400;color:var(--muted,#aab0be)}.rb-card-body b{font-size:12px;color:var(--accent-ink,#1c5cab)}.rb-card-detail{padding:0 12px 12px;font-size:12px;overflow-wrap:anywhere}.rb-card-detail dl{margin:10px 0 0}.rb-card-detail dl>div{padding:7px 0;border-top:1px solid #7773}.rb-card-detail dt{color:var(--muted,#aab0be)}.rb-card-detail dd{margin:4px 0 0}.rb-symbol{aspect-ratio:360/203;display:grid;place-items:center;background:radial-gradient(ellipse,#302b3b,#14111c);font-size:76px}.rb-no-picture{padding:20px;box-sizing:border-box;text-align:center;aspect-ratio:360/203;display:grid;place-items:center;color:var(--muted,#aab0be);font-size:12px}.rb-dungeon-views{border:1px solid var(--line,#7775);border-radius:12px;padding:16px;margin:12px 0 24px}.rb-dungeon-views .rb-map-bar{display:flex;align-items:end;gap:12px;flex-wrap:wrap}.rb-dungeon-views label{display:grid;gap:5px;min-width:210px}.rb-dungeon-views select{max-width:100%;padding:10px}.rb-dungeon-views .rb-map-grid{display:grid;grid-template-columns:1fr;gap:12px}.rb-dungeon-views .rb-map-grid.compare{grid-template-columns:repeat(2,minmax(0,1fr))}.rb-dungeon-views article{min-width:0}.rb-dungeon-views iframe{display:block;width:100%;height:640px;border:1px solid #7775;border-radius:8px;background:#14111c}.rb-info-section{border-top:1px solid #7774;padding:10px 0}.rb-info-section summary{cursor:pointer;font-weight:600}.rb-info-scroll{overflow:auto;max-height:360px}.rb-info-scroll table{width:100%;border-collapse:collapse;font-size:12px}.rb-info-scroll th,.rb-info-scroll td{text-align:left;vertical-align:top;padding:8px;border-bottom:1px solid #7773;min-width:85px}.rb-dungeon-views .rb-map-meta{font-size:12px;overflow-wrap:anywhere}.rb-dungeon-views .rb-map-note{min-height:42px}.rb-dungeon-views .rb-map-links{display:flex;gap:12px;flex-wrap:wrap}@media(max-width:1100px){.rb-dungeon-views .rb-map-grid.compare{grid-template-columns:1fr}}@media(max-width:600px){.rb-dungeon-views{padding:10px}.rb-dungeon-views label{min-width:0;width:100%}.rb-dungeon-views iframe{height:620px}}</style>
        <h3>Zindanlar · canlı görünüm ve sürümler</h3>
        <p>Map view: yeşil START başlangıcı, sarı BOSS / MINI BOSS bossların yerini gösterir. Map view / Close view, sürükleme ve yakınlaştırma aşağıdaki oyunun kendi kontrolleridir. Buradan oyun kaydı veya canlı harita değiştirilmez.</p>
        <div class="rb-map-bar"><label>Zindan<select data-rb-map aria-label="Zindan">${DUNGEONS.map((name, i) => `<option value="${i}"${i === area ? ' selected' : ''}>${i + 1}. ${esc(name)}</option>`).join('')}</select></label>
        <label>Görünüm / sürüm<select data-rb-version aria-label="Görünüm / sürüm">${versions.map(v => `<option value="${v.id}"${v.id === chosen.id ? ' selected' : ''}>${esc(v.title)}</option>`).join('')}</select></label>
        <label>Karşılaştırılacak sürüm<select data-rb-against aria-label="Karşılaştırılacak sürüm">${versions.filter(v => v.id !== chosen.id).map(v => `<option value="${v.id}"${v.id === other?.id ? ' selected' : ''}>${esc(v.title)}</option>`).join('')}</select></label>
        <button type="button" data-rb-latest>Konum gösteren sürümü aç</button><button type="button" data-rb-compare${versions.length < 2 ? ' disabled' : ''} aria-pressed="${compare}">${compare ? 'Tek görünüm' : 'Yan yana karşılaştır'}</button></div>
        ${versions.length < 2 ? '<p class="small muted">Bu zindan için kayıtlı ayrı geliştirme örneği henüz yok; geçmiş sürüm uydurulmadı.</p>' : '<p class="small muted">İki görünüm bağımsız sürüklenir/yakınlaştırılır. Otomatik kamera eşleme veya geometrik fark hesabı yok.</p>'}
        <div class="rb-map-grid${compare ? ' compare' : ''}">${(compare ? [chosen, other] : [chosen]).map(v => `<article><h4 data-rb-heading>${esc(DUNGEONS[area])} · ${esc(v.title)}</h4><p class="small rb-map-note">${esc(v.note)}</p><iframe data-version-title="${esc(v.title)}" title="${esc(DUNGEONS[area])} · ${esc(v.title)}" src="${esc(v.url)}" loading="lazy" allow="fullscreen" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-pointer-lock"></iframe><p class="rb-map-links"><a href="${esc(v.url)}" target="_blank" rel="noopener">Doğrudan inceleme bağlantısı ↗</a></p><div data-rb-info aria-live="polite"><p class="small muted">${v.id === 'live' || (v.id.includes('content-v4') || v.id.includes('locate-v5')) ? 'Haritanın içeriği yükleniyor…' : 'Bu eski arşiv ayrıntı verisi paylaşmıyor. Güncel haritanın bilgileri Canlı görünümde bulunur.'}</p></div></article>`).join('')}</div>
        <details class="rb-map-meta"><summary>Kaynak ve son doğrulanan yayın · ${VERIFIED.date}</summary><p>Son doğrulanan kaynak: <a href="https://github.com/aenestoy/web-game-studio/commit/${VERIFIED.source}" target="_blank" rel="noopener">${VERIFIED.source}</a><br>Önizleme yayını: <a href="https://github.com/aenestoy/toy-games-play/commit/${VERIFIED.preview}" target="_blank" rel="noopener">${VERIFIED.preview}</a><br>Oyun dosyası: ${VERIFIED.bundle}</p><p>Canlı seçeneği yeni yayınlarla değişir. Tarihli sürümler bütün oyun dosyalarıyla ayrı adreslerde saklanır; eski paketlerin üzerine yazılmaz. İnceleme haritaları sabit 17 tohumu kullanır. Taslak nesne taşıma ve oyuna uygulama bu ilk görünüm tesliminde yok.</p></details>
      </section>`;
      for (const frame of el.querySelectorAll('iframe')) frame.addEventListener('load', () => frame.contentWindow.postMessage({ type: 'riftborn-inspection-request' }, new URL(frame.src).origin));
      el.querySelector('[data-rb-latest]').onclick = () => { selections[area] = { ...selections[area], version: [...SNAPSHOTS].reverse().find(v => v.id.includes('locate-v5'))?.id || 'live' }; persist(); paint(); };
      el.querySelector('[data-rb-map]').onchange = e => { area = Number(e.target.value); persist(); paint(); };
      el.querySelector('[data-rb-version]').onchange = e => { selections[area] = { ...selections[area], version: e.target.value }; persist(); paint(); };
      el.querySelector('[data-rb-against]').onchange = e => { selections[area] = { ...selections[area], against: e.target.value }; persist(); paint(); };
      el.querySelector('[data-rb-compare]').onclick = () => { selections[area] = { ...selections[area], compare: !compare }; persist(); paint(); };
    }
    paint();
  }
  return { mount, replaceCards: true };
}
