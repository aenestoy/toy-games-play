// Studio panel — the same field rules the server enforces, so the owner sees a problem before saving.
//   rewards: games/06-shadow-duel/supabase/ranked-admin.sql nd_admin_reward_clean (js/rewards.js clean(), strictly)
//   tune:    games/06-shadow-duel/supabase/admin.sql nd_admin_tune_check (js/tune.js clean(), strictly)
//   plans:   supabase/studio/dev.sql st_plan_check
//   ranked:  games/06-shadow-duel/supabase/ranked-panel.sql (the player look-up; the tier names of js/ranked.js)
//   shadows: games/06-shadow-duel/supabase/ranked-ghost.sql nd_admin_ghost_set (nd_rank_ghost_fields)
// Each check returns { ok, value, errors: [{ field, msg }] }; msg is plain Turkish for the owner.
// panel-check.mjs compares these with the game's own js/tune.js and js/rewards.js on sample entries.

export const LANGS = ['en', 'tr', 'es', 'pt', 'ru', 'de', 'fr'];
export const LANG_NAMES = { en: 'İngilizce', tr: 'Türkçe', es: 'İspanyolca', pt: 'Portekizce', ru: 'Rusça', de: 'Almanca', fr: 'Fransızca' };
export const KINDS = ['costume', 'title', 'badge'];
export const PAL_KEYS = ['cloth', 'clothHi', 'clothDark', 'wrap', 'wrapDark', 'accent', 'accentDark', 'ui', 'skin', 'hakama', 'hakamaDark',
  'haori', 'armor', 'mask', 'glove', 'tabi', 'rim', 'rimDim'];
export const RGBA_KEYS = ['rim', 'rimDim'];
export const JOINTS = ['hip', 'neck', 'sh', 'head', 'elF', 'haF', 'elB', 'haB', 'knF', 'ftF', 'knB', 'ftB'];
// the drawn costumes the game ships (games/06-shadow-duel/js/costumes.js ND.COSTUME_IDS; ranked.sql nd_costume_builtins)
// ('champion': a family, each fighter's own Season Champion costume)
export const BUILTIN_COSTUMES = ['champion'];
export const REWARDS_BASE = 'https://cjaewbrifdqlykasrkds.supabase.co/storage/v1/object/public/rewards/';
const HEX = /^#[0-9a-fA-F]{6}$/;
const RGBA = /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d{1,3})\s*\)$/i;
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

function collector() {
  const errors = [];
  return { errors, bad: (field, msg) => errors.push({ field, msg }) };
}

// ---------------------------------------------------------------- rewards
/** entry { id?, kind, names, data, sort? } → the stored form; roster = allowed ninja ids; creating: the id is checked too */
export function checkReward(e, { roster = [], creating = false, taken = [] } = {}) {
  const { errors, bad } = collector();
  const out = { kind: e && e.kind };
  if (creating) {
    if (typeof e.id !== 'string' || !/^[a-z0-9_]{3,40}$/.test(e.id)) bad('id', 'Kimlik 3–40 karakter olmalı: küçük harf, rakam ve alt çizgi.');
    else if (taken.includes(e.id)) bad('id_taken', 'Bu kimlik zaten var.');
    out.id = e.id;
  }
  if (!KINDS.includes(e && e.kind)) bad('kind', 'Tür seçilmedi.');
  // names
  const names = {};
  if (!isObj(e && e.names)) bad('names', 'Ad girilmedi.');
  else {
    for (const [k, v] of Object.entries(e.names)) {
      if (!LANGS.includes(k)) { bad('names.' + k, 'Bilinmeyen dil.'); continue; }
      if (v == null) continue;
      if (typeof v !== 'string') { bad('names.' + k, 'Ad metin olmalı.'); continue; }
      const s = v.trim();
      if (/[\u0000-\u001f<>]/.test(s)) bad('names.' + k, '< > işaretleri kullanılamaz.');
      else if (s.length > 40) bad('names.' + k, 'En çok 40 karakter.');
      else if (s) names[k] = s;
    }
    if (!names.en && !names.tr) bad('names', 'İngilizce ya da Türkçe ad gerekli.');
  }
  out.names = names;
  const d = isObj(e && e.data) ? e.data : e && e.data == null ? {} : null;
  if (!d) { bad('data', 'İçerik bozuk.'); return { ok: false, value: out, errors }; }
  if ('v' in d && d.v !== 1) bad('data.v', 'Biçim numarası 1 olmalı.');
  const data = { v: 1 };
  if (e.kind === 'title' || e.kind === 'badge') {
    for (const k of Object.keys(d)) if (!['v', 'color', 'icon'].includes(k)) bad('data.' + k, 'Bilinmeyen alan.');
    if (d.color != null) {
      if (typeof d.color !== 'string' || !HEX.test(d.color)) bad('data.color', 'Renk #rrggbb biçiminde olmalı.');
      else data.color = d.color;
    }
    if (d.icon != null) {
      if (typeof d.icon !== 'string' || d.icon.length > 2 || /[\s<>&"']/.test(d.icon)) bad('data.icon', 'Simge en çok 2 işaret, boşluksuz.');
      else if (d.icon) data.icon = d.icon;
    }
  } else if (e.kind === 'costume') {
    for (const k of Object.keys(d)) if (!['v', 'base', 'pal', 'ninjas', 'atlas', 'placeholder', 'builtin'].includes(k)) bad('data.' + k, 'Bilinmeyen alan.');
    if (d.builtin != null) {
      if (typeof d.builtin !== 'string' || !BUILTIN_COSTUMES.includes(d.builtin)) bad('data.builtin', 'Oyunun bildiği çizili kostümlerden biri olmalı.');
      else data.builtin = d.builtin;
    }
    if ('base' in d) {
      if (!['col', 'alt', 'champ'].includes(d.base)) bad('data.base', 'Temel renk: asıl, eski ya da şampiyon.');
      data.base = d.base;
    } else data.base = 'col';
    if ('placeholder' in d) {
      if (typeof d.placeholder !== 'boolean') bad('data.placeholder', 'Evet/hayır olmalı.');
      else if (d.placeholder) data.placeholder = true;
    }
    if (d.pal != null) {
      if (!isObj(d.pal)) bad('data.pal', 'Renk düzeni bozuk.');
      else {
        const pal = {};
        for (const [k, v] of Object.entries(d.pal)) {
          if (k === 'hood') {
            if (!isObj(v) || Object.keys(v).length !== 3 || !['cloth', 'clothHi', 'clothDark'].every((x) => typeof v[x] === 'string' && HEX.test(v[x]))) {
              bad('data.pal.hood', 'Başlık için üç renk de gerekli (#rrggbb).');
            } else pal.hood = { cloth: v.cloth, clothHi: v.clothHi, clothDark: v.clothDark };
          } else if (PAL_KEYS.includes(k)) {
            const s = typeof v === 'string' ? v.trim() : '';
            if (RGBA_KEYS.includes(k) ? !RGBA.test(s) : !HEX.test(s)) bad('data.pal.' + k, RGBA_KEYS.includes(k) ? 'rgba(r,g,b,a) biçiminde olmalı.' : 'Renk #rrggbb biçiminde olmalı.');
            else pal[k] = s;
          } else bad('data.pal.' + k, 'Bilinmeyen renk adı.');
        }
        if (Object.keys(pal).length) data.pal = pal;
      }
    }
    if (d.ninjas != null) {
      const seen = [];
      if (!Array.isArray(d.ninjas) || d.ninjas.length < 1 || d.ninjas.length > 20) bad('data.ninjas', 'En az bir, en çok 20 ninja seç (ya da hepsi için boş bırak).');
      else {
        for (const n of d.ninjas) {
          if (typeof n !== 'string' || !roster.includes(n) || seen.includes(n)) { bad('data.ninjas', 'Bilinmeyen ya da tekrar eden ninja.'); break; }
          seen.push(n);
        }
        data.ninjas = seen;
      }
    }
    if (d.atlas != null) {
      const a = d.atlas;
      if (!isObj(a)) bad('data.atlas', 'Resim atlası bozuk.');
      else {
        for (const k of Object.keys(a)) if (!['url', 'parts', 'w', 'h'].includes(k)) bad('data.atlas.' + k, 'Bilinmeyen alan.');
        const url = typeof a.url === 'string' ? a.url : '';
        const rest = url.slice(REWARDS_BASE.length);
        if (url.length > 400 || !url.startsWith(REWARDS_BASE) || !rest || /[\s"'<>\\?#]/.test(rest) || rest.includes('..') || !/\.(png|webp)$/i.test(url)) {
          bad('data.atlas.url', 'Resim "rewards" deposundan, PNG ya da WebP olmalı (önce yükle).');
        }
        const q = { url };
        for (const k of ['w', 'h']) if (k in a) {
          if (!isNum(a[k]) || a[k] < 1 || a[k] > 2048 || !Number.isInteger(a[k])) bad('data.atlas.' + k, 'Resim boyu 1–2048 piksel.');
          else q[k] = a[k];
        }
        const parts = {};
        if (!isObj(a.parts) || Object.keys(a.parts).length < 1 || Object.keys(a.parts).length > 24) bad('data.atlas.parts', 'En az 1, en çok 24 parça.');
        else {
          for (const [k, v] of Object.entries(a.parts)) {
            const f = 'data.atlas.parts.' + k;
            if (!/^[a-z][a-zA-Z0-9]{0,15}$/.test(k) || !isObj(v)) { bad(f, 'Parça adı küçük harfle başlamalı (ör. head).'); continue; }
            for (const x of Object.keys(v)) if (!['x', 'y', 'w', 'h', 'bone', 'ox', 'oy', 's', 'rot', 'front'].includes(x)) bad(f + '.' + x, 'Bilinmeyen alan.');
            if (!Array.isArray(v.bone) || v.bone.length !== 2 || !JOINTS.includes(v.bone[0]) || !JOINTS.includes(v.bone[1]) || v.bone[0] === v.bone[1]) bad(f + '.bone', 'Kemik: iki farklı eklem.');
            const num = (x, lo, hi, def, int, msg) => {
              if (!(x in v)) { if (def === undefined) bad(f + '.' + x, msg); return def; }
              if (!isNum(v[x]) || v[x] < lo || v[x] > hi || (int && !Number.isInteger(v[x]))) { bad(f + '.' + x, msg); return def; }
              return v[x];
            };
            const X = num('x', 0, 2048, undefined, true, 'x: 0–2048 tam sayı.'), Y = num('y', 0, 2048, undefined, true, 'y: 0–2048 tam sayı.');
            const W = num('w', 1, 512, undefined, true, 'Genişlik 1–512.'), H = num('h', 1, 512, undefined, true, 'Yükseklik 1–512.');
            if (isNum(X) && isNum(W) && X + W > 2048) bad(f + '.size', 'Parça resmin dışına taşıyor.');
            if (isNum(Y) && isNum(H) && Y + H > 2048) bad(f + '.size', 'Parça resmin dışına taşıyor.');
            if ('front' in v && typeof v.front !== 'boolean') bad(f + '.front', 'Evet/hayır olmalı.');
            parts[k] = { x: X, y: Y, w: W, h: H, bone: v.bone, ox: num('ox', -200, 200, 0, false, 'Kayma -200…200.'), oy: num('oy', -200, 200, 0, false, 'Kayma -200…200.'),
              s: num('s', 0.05, 4, 1, false, 'Ölçek 0,05–4.'), rot: num('rot', -6.283185, 6.283185, 0, false, 'Dönüş -2π…2π.'), front: 'front' in v ? v.front === true : true };
          }
        }
        data.atlas = { ...q, parts };
      }
    }
    if (!data.pal && !data.atlas && !data.builtin) bad('data.pal', 'Kostümün en az bir rengi, bir resim atlası ya da çizili bir kostümü olmalı.');
  }
  if (e && 'sort' in e && e.sort != null && (!Number.isInteger(e.sort) || Math.abs(e.sort) > 100000)) bad('sort', 'Sıra -100000…100000 tam sayı.');
  out.data = data;
  if (e && e.sort != null) out.sort = e.sort;
  return { ok: errors.length === 0, value: out, errors };
}

// ---------------------------------------------------------------- tune
export const TUNE_FIELDS = { react: [0.05, 1.5], parry: [0, 1], guard: [0, 1], dodge: [0, 1], aggr: [0, 1], combo: [0, 1], smart: [0, 1], mash: [1, 20],
  counter: [0, 1], rally: [0, 1], cmd: [0, 1], str: [0, 1], jug: [0, 1], kc: [0, 1], read: [0, 1] };
export const AI_KEYS = [0, 0.25, 0.5, 1, 2, 3]; // 0.25: the soft Apprentice of journey fights 1–2 (1.3.2, ai.js)

// the duel's knobs (1.5): single numbers and per ninja, with js/tune.js's ranges
export const DUEL_NINJAS = ['akane', 'aoi', 'kuro', 'yuki', 'ren', 'kage', 'shura', 'tetsu', 'jin', 'tsubame', 'hana', 'mai', 'tora'];
export const DUEL_ONE = { duelSpeed: [0.7, 1], duelK: [0, 1], duelSoft: [0, 1], duelGhostK: [0, 1], finDmg: [0.3, 1.5], finChor: [0, 1] }; // (finChor: the cinematics' exchanges 0 off / 1 on, 1.5.2: admin-152-chor.sql)
export const DUEL_PER = { duelKch: [0, 1], duelK0ch: [-1, 2], duelKAch: [-1, 2], duelKUch: [-1, 2], duelDmg: [0.5, 2], duelChDmg: [0.5, 2], duelBindPlayCh: [0, 1] };
export const BIND_LEVELS = ['0', '0.5', '1', '2', '3']; // duelBindPlay's keys (Çırak, Çırak+, Usta, Efsane, Şura)

/** text (JSON) → { ok, value (parsed), errors } */
export function checkTune(text) {
  const { errors, bad } = collector();
  if (typeof text !== 'string' || !text.trim() || text.length > 4000) { bad('length', 'Ayar boş ya da 4000 karakterden uzun.'); return { ok: false, errors }; }
  let o;
  try { o = JSON.parse(text); } catch { bad('json', 'Ayar okunamadı (JSON bozuk).'); return { ok: false, errors }; }
  if (!isObj(o)) { bad('json', 'Ayar bir nesne olmalı.'); return { ok: false, errors }; }
  for (const k of Object.keys(o)) if (!['v', 'levels', 'apprenticePlusK', 'kiWait', 'journey', ...Object.keys(DUEL_ONE), ...Object.keys(DUEL_PER), 'duelBindPlay'].includes(k)) bad(k, 'Bilinmeyen alan.');
  if ('v' in o && o.v !== 1) bad('v', 'Biçim numarası 1 olmalı.');
  if ('levels' in o) {
    if (!isObj(o.levels)) bad('levels', 'Seviyeler bozuk.');
    else for (const [l, s] of Object.entries(o.levels)) {
      if (!['0', '1', '2', '3'].includes(l) || !isObj(s)) { bad('levels.' + l, 'Bilinmeyen seviye.'); continue; }
      for (const [k, v] of Object.entries(s)) {
        if (k === 'tick') {
          if (!Array.isArray(v) || v.length !== 2 || !v.every((x) => isNum(x) && x >= 0.02 && x <= 2) || v[0] > v[1]) bad(`levels.${l}.tick`, 'Karar arası: iki sayı, 0,02–2, önce küçük.');
        } else if (TUNE_FIELDS[k]) {
          const [lo, hi] = TUNE_FIELDS[k];
          if (!isNum(v) || v < lo || v > hi) bad(`levels.${l}.${k}`, `${lo}–${hi} arası olmalı.`);
        } else bad(`levels.${l}.${k}`, 'Bilinmeyen alan.');
      }
    }
  }
  if ('apprenticePlusK' in o && (!isNum(o.apprenticePlusK) || o.apprenticePlusK < 0 || o.apprenticePlusK > 1)) bad('apprenticePlusK', '0–1 arası olmalı.');
  if ('kiWait' in o && (!isNum(o.kiWait) || o.kiWait < 1 || o.kiWait > 120)) bad('kiWait', '1–120 arası olmalı.');
  // 1.5, the duel (js/tune.js clean = admin-15.sql nd_admin_tune_check)
  for (const [k, [lo, hi]] of Object.entries(DUEL_ONE)) if (k in o && (!isNum(o[k]) || o[k] < lo || o[k] > hi)) bad(k, `${String(lo).replace('.', ',')}–${hi} arası olmalı.`);
  if ('duelBindPlay' in o) {
    if (!isObj(o.duelBindPlay)) bad('duelBindPlay', 'Seviye başına sayılar olmalı.');
    else for (const [l, v] of Object.entries(o.duelBindPlay)) {
      if (!BIND_LEVELS.includes(l)) bad('duelBindPlay.' + l, 'Bilinmeyen seviye.');
      else if (!isNum(v) || v < 0 || v > 1) bad('duelBindPlay.' + l, '0–1 arası olmalı.');
    }
  }
  for (const [k, [lo, hi]] of Object.entries(DUEL_PER)) {
    if (!(k in o)) continue;
    if (!isObj(o[k])) { bad(k, 'Ninja başına sayılar olmalı.'); continue; }
    for (const [id, v] of Object.entries(o[k])) {
      if (!DUEL_NINJAS.includes(id)) bad(`${k}.${id}`, 'Düelloda böyle bir ninja yok.');
      else if (!isNum(v) || v < lo || v > hi) bad(`${k}.${id}`, `${String(lo).replace('.', ',')}–${hi} arası olmalı.`);
    }
  }
  if ('journey' in o) {
    if (!isObj(o.journey)) bad('journey', 'Yolculuk bozuk.');
    else for (const [k, a] of Object.entries(o.journey)) {
      if (!['levels', 'ai', 'hp'].includes(k) || !Array.isArray(a) || a.length > 8) { bad('journey.' + k, 'En çok 8 dövüşlük liste olmalı.'); continue; }
      a.forEach((x, i) => {
        if (x === null) return;
        const okv = isNum(x) && (k === 'levels' ? Number.isInteger(x) && x >= 0 && x <= 3 : k === 'ai' ? AI_KEYS.includes(x) : x === 0 || (x >= 0.5 && x <= 2));
        if (!okv) bad(`journey.${k}.${i}`, k === 'levels' ? '0, 1, 2 ya da 3.' : k === 'ai' ? 'boş, 0, 0,25, 0,5, 1, 2 ya da 3.' : '0 ya da 0,5–2.');
      });
    }
  }
  return { ok: errors.length === 0, value: o, errors };
}

// ---------------------------------------------------------------- plans
export const PLAN_KINDS = { gorsel: 'Görsel', kostum: 'Kostüm', kapak: 'Kapak', ozellik: 'Özellik', diger: 'Diğer' };
export const PLAN_STATUS = { fikir: 'Fikir', planlandi: 'Planlandı', yapiliyor: 'Yapılıyor', hazir: 'Hazır', yayinda: 'Yayında' };
export const PLAN_IMAGE = { types: ['image/png', 'image/jpeg', 'image/webp'], max: 5 * 1024 * 1024, count: 8 };
export const REWARD_IMAGE = { types: ['image/png', 'image/webp'], max: 2 * 1024 * 1024, side: 2048 };

export function checkPlan(p) {
  const { errors, bad } = collector();
  const title = typeof p.title === 'string' ? p.title.replace(/[\u0000-\u001f]/g, ' ').trim() : '';
  if (!title || title.length > 120) bad('title', 'Başlık 1–120 karakter.');
  if (p.game && !/^[a-z0-9][a-z0-9-]{1,31}$/.test(p.game)) bad('game', 'Oyun seçimi bozuk.');
  if (!(p.kind in PLAN_KINDS)) bad('kind', 'Tür seçilmedi.');
  if (!(p.status in PLAN_STATUS)) bad('status', 'Durum seçilmedi.');
  if (typeof p.notes === 'string' && p.notes.length > 4000) bad('notes', 'Not en çok 4000 karakter.');
  const images = Array.isArray(p.images) ? p.images : [];
  if (images.length > PLAN_IMAGE.count) bad('images', `En çok ${PLAN_IMAGE.count} resim.`);
  if (images.some((x) => !/^[a-z0-9-]{1,40}\/[A-Za-z0-9_-]{1,80}\.(png|jpe?g|webp)$/.test(x))) bad('images', 'Resim yolu bozuk.');
  return { ok: errors.length === 0, value: { title, game: p.game || '', kind: p.kind, status: p.status, notes: p.notes || '', images }, errors };
}

/** A file picked for upload: { ok, msg } — type and size (and, for rewards, picture size checked after loading). */
export function checkUpload(file, rule) {
  if (!file) return { ok: false, msg: 'Dosya seçilmedi.' };
  if (!rule.types.includes(file.type)) return { ok: false, msg: `Bu dosya türü olmaz (${file.type || 'bilinmiyor'}). İzin verilen: ${rule.types.map((t) => t.split('/')[1].toUpperCase()).join(', ')}.` };
  if (file.size > rule.max) return { ok: false, msg: `Dosya çok büyük: ${(file.size / 1048576).toFixed(1)} MB (en çok ${rule.max / 1048576} MB).` };
  if (file.size === 0) return { ok: false, msg: 'Dosya boş.' };
  return { ok: true, msg: '' };
}

/** Safe object name for storage: lower case, digits, dash; keeps the extension. */
export function storageName(file, prefix) {
  const ext = (file.type === 'image/jpeg' ? 'jpg' : file.type.split('/')[1] || 'png').toLowerCase();
  const TR = { ı: 'i', İ: 'i', ğ: 'g', Ğ: 'g', ş: 's', Ş: 's', ç: 'c', Ç: 'c', ö: 'o', Ö: 'o', ü: 'u', Ü: 'u' };
  const base = String(file.name || 'resim').replace(/\.[^.]*$/, '').replace(/[ıİğĞşŞçÇöÖüÜ]/g, (c) => TR[c]).toLowerCase()
    .normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'resim';
  const rnd = Math.random().toString(36).slice(2, 8);
  return `${prefix}/${base}-${rnd}.${ext}`;
}

// ---------------------------------------------------------------- ranked (Shadow Duel; games/06-shadow-duel/supabase/ranked-panel.sql)
// Tier steps as the game shows them (js/ranked.js TIERS and tierInfo; ranked-panel.sql nd_admin_tier):
// 0 = 足軽 Ashigaru III … 14 = 大名 Daimyō I, 15 = 将軍 Shōgun. panel-check.mjs compares these with both files.
export const RANK_TIERS = [['足軽', 'Ashigaru'], ['浪人', 'Rōnin'], ['侍', 'Samurai'], ['旗本', 'Hatamoto'], ['大名', 'Daimyō'], ['将軍', 'Shōgun']];
export const RANK_LEAGUE_TR = ['Ayak askeri', 'Efendisiz samuray', 'Samuray', 'Sancak muhafızı', 'Derebeyi', 'Şogun'];
/** tier step 0–15 → { tier, league (0–5), kanji, name } */
export function tierLabel(i) {
  i = Math.max(0, Math.min(15, Math.trunc(Number(i)) || 0));
  const t = i === 15 ? 5 : Math.floor(i / 3);
  return { tier: i, league: t, kanji: RANK_TIERS[t][0], name: RANK_TIERS[t][1] + (i === 15 ? '' : ' ' + ['III', 'II', 'I'][i % 3]) };
}
/** The player look-up's nick (nd_admin_ranked_player p_nick): 1–32 characters after trimming. */
export function checkRankedQuery(q) {
  const v = typeof q === 'string' ? q.trim() : '';
  if (!v) return { ok: false, value: '', errors: [{ field: 'nick', msg: 'Aramak için bir ad yaz.' }] };
  if (v.length > 32) return { ok: false, value: v, errors: [{ field: 'nick', msg: 'Ad en çok 32 karakter.' }] };
  return { ok: true, value: v, errors: [] };
}

// ---------------------------------------------------------------- shadow opponents (Shadow Duel; games/06-shadow-duel/supabase/ranked-ghost.sql)
// name → [nd_settings key, lowest, highest, the game's default, whole number?]: the same list as the SQL's
// nd_rank_ghost_fields (panel-check.mjs compares them)
export const GHOST_FIELDS = {
  enabled: ['rank_ghost_enabled', 0, 1, 1, true], after_s: ['rank_ghost_after_s', 5, 600, 8, true], off_at: ['rank_ghost_off_at', 1, 1000, 8, true],
  weight: ['rank_ghost_weight', 0, 1, 1, false], daily: ['rank_ghost_daily', 0, 200, 0, true], min_games: ['rank_ghost_min_games', 1, 50, 3, true],
  min_s: ['rank_ghost_min_s', 0, 300, 20, true], window_s: ['rank_ghost_window_s', 120, 7200, 900, true], max_delta: ['rank_ghost_max_delta', 0, 400, 0, true],
  day_gain: ['rank_ghost_day_gain', 0, 4000, 0, true], profile_days: ['rank_ghost_profile_days', 1, 365, 60, true],
  house: ['rank_ghost_house', 0, 1, 1, true], until_players: ['rank_ghost_until_players', 0, 100000, 50, true],
};
/** { name: text or number } (an empty text = not changed) → { ok, value: { name: number }, errors }; the SQL's rules. */
export function checkGhost(p) {
  const { errors, bad } = collector();
  const value = {};
  for (const [k, v] of Object.entries(p || {})) {
    const F = GHOST_FIELDS[k];
    if (!F) { bad(k, 'Bilinmeyen ayar.'); continue; }
    if (v === '' || v == null) continue;
    const raw = typeof v === 'number' ? String(v) : String(v).trim().replace(',', '.');
    const n = /^-?\d+(\.\d+)?$/.test(raw) ? Number(raw) : NaN;
    const [, lo, hi, , whole] = F;
    if (!isNum(n) || n < lo || n > hi) bad(k, `${String(lo).replace('.', ',')} ile ${String(hi).replace('.', ',')} arasında bir sayı olmalı.`);
    else if (whole && !Number.isInteger(n)) bad(k, 'Tam sayı olmalı.');
    else if (!whole && Math.round(n * 1000) / 1000 !== n) bad(k, 'En çok 3 ondalık basamak.');
    else value[k] = n;
  }
  return { ok: errors.length === 0, value, errors };
}

// ------------------------------------------------------------------ earnings typed in by the owner (supabase/studio/stats2.sql st_admin_revenue_upsert)
export const REVENUE_PORTALS = { crazygames: 'CrazyGames', playgama: 'Playgama', yandex: 'Yandex Games', gamepix: 'GamePix', googleplay: 'Play Store', other: 'Diğer' };
export const REVENUE_CURRENCIES = ['USD', 'EUR', 'RUB', 'TRY'];
export const REVENUE_FIRST_DAY = '2026-09-01';
/**
 * { day: 'YYYY-MM-DD', game, portal, amount (number or text with , or .), currency, note } → { ok, value, errors }.
 * The same rules as the SQL: day 2026-09-01 … today (opts.today, Europe/Istanbul), portal and currency from the lists,
 * amount 0–9 999 999 999.99 with at most two decimals, note at most 200 characters.
 */
export function checkRevenue(p, { today } = {}) {
  const { errors, bad } = collector();
  const day = typeof p.day === 'string' ? p.day.trim() : '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || Number.isNaN(Date.parse(day + 'T12:00:00Z')) || new Date(day + 'T12:00:00Z').toISOString().slice(0, 10) !== day) bad('day', 'Tarih seçilmedi.');
  else if (day < REVENUE_FIRST_DAY) bad('day', `Tarih ${REVENUE_FIRST_DAY}'den önce olamaz.`);
  else if (today && day > today) bad('day', 'Gelecek bir gün olamaz.');
  if (typeof p.game !== 'string' || !/^[a-z0-9][a-z0-9-]{1,31}$/.test(p.game)) bad('game', 'Oyun bozuk.');
  if (!(p.portal in REVENUE_PORTALS)) bad('portal', 'Portal seçilmedi.');
  const raw = typeof p.amount === 'number' ? String(p.amount) : String(p.amount ?? '').trim().replace(/\s/g, '').replace(',', '.');
  const amount = /^\d{1,10}(\.\d{1,2})?$/.test(raw) ? Number(raw) : NaN;
  if (!Number.isFinite(amount) || amount < 0 || amount > 9999999999.99) bad('amount', 'Tutar 0 ya da daha büyük, en çok iki kuruş basamağı (ör. 12,50).');
  if (!REVENUE_CURRENCIES.includes(p.currency)) bad('currency', 'Para birimi seçilmedi.');
  const note = typeof p.note === 'string' ? p.note.trim() : '';
  if (note.length > 200) bad('note', 'Not en çok 200 karakter.');
  return { ok: errors.length === 0, value: { day, game: p.game, portal: p.portal, amount, currency: p.currency, note }, errors };
}

// ------------------------------------------------------------------ platform numbers typed in or imported (supabase/studio/stats6.sql)
export const PLATFORMS = { crazygames: 'CrazyGames', site: 'Kendi site', playgama: 'Playgama', yandex: 'Yandex', googleplay: 'Play Store' };
export const ENTERED_PLATFORMS = ['playgama', 'yandex', 'googleplay'];
export const PLATFORM_FIELDS = [['players', 'Oyuncu'], ['plays', 'Oynama'], ['playtime_s', 'Oyun süresi'], ['ad_impr', 'Reklam gösterimi'], ['revenue', 'Kazanç']];
const INT_MAX = { players: 2e9, plays: 2e9, playtime_s: 1e12, ad_impr: 2e9 };

/**
 * A number as people and dashboards write it → Number; '' / null → null; anything else → NaN.
 * 12 · 12,5 · 12.5 · 1.234,56 · 1,234.56 · 12 345 · "1 234 ₽" · 3,5% (the percent sign is dropped).
 * One comma alone is a decimal comma (Turkish / Russian dashboards); several commas or dots are thousands marks.
 */
export function parseNum(raw) {
  if (raw == null) return null;
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : NaN;
  let s = String(raw).replace(/[\s  ]/g, '').replace(/[₽$€₺%]|RUB|USD|EUR|TRY|руб\.?/gi, '');
  if (s === '' || s === '-' || s === '—') return null;
  const neg = /^-/.test(s);
  s = s.replace(/^[-+]/, '');
  if (!/^[\d.,]+$/.test(s)) return NaN;
  const dots = (s.match(/\./g) || []).length, commas = (s.match(/,/g) || []).length;
  if (dots && commas) {
    const dec = s.lastIndexOf('.') > s.lastIndexOf(',') ? '.' : ',';
    s = s.split(dec === '.' ? ',' : '.').join('').replace(',', '.');
  } else if (commas > 1) s = s.replace(/,/g, '');
  else if (commas === 1) s = s.replace(',', '.');
  else if (dots > 1) s = s.replace(/\./g, '');
  const n = Number(s);
  return Number.isFinite(n) ? (neg ? -n : n) : NaN;
}

/** YYYY-MM-DD when it is a real day */
const realDay = (y, m, d) => {
  const s = `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const t = new Date(s + 'T12:00:00Z');
  return !Number.isNaN(t.getTime()) && t.toISOString().slice(0, 10) === s ? s : null;
};
/**
 * A date cell → YYYY-MM-DD or null. format: 'auto' (YYYY-MM-DD, YYYY/MM/DD, DD.MM.YYYY; with "/" day first unless the
 * first part is over 12), 'ymd', 'dmy', 'mdy'. A time after the date is ignored.
 */
export function parseDay(raw, format = 'auto') {
  const s = String(raw ?? '').trim().split(/[ T]/)[0];
  let m = /^(\d{4})[-./](\d{1,2})[-./](\d{1,2})$/.exec(s);
  if (m && (format === 'auto' || format === 'ymd')) return realDay(m[1], m[2], m[3]);
  m = /^(\d{1,2})([-./])(\d{1,2})\2(\d{2}|\d{4})$/.exec(s);
  if (!m) return null;
  const y = m[4].length === 2 ? 2000 + Number(m[4]) : Number(m[4]);
  let a = Number(m[1]), b = Number(m[3]);
  const mdy = format === 'mdy' || (format === 'auto' && m[2] === '/' && b > 12 && a <= 12);
  return mdy ? realDay(y, a, b) : realDay(y, b, a);
}

/** CSV text → { header, rows } (cells as text). The separator is guessed (; , tab); quotes and a BOM are handled. */
export function parseCsv(text) {
  const t = String(text ?? '').replace(/^﻿/, '');
  const first = t.split(/\r?\n/).find((l) => l.trim()) || '';
  const count = (c) => first.split(c).length - 1;
  const sep = [';', '\t', ','].sort((x, y) => count(y) - count(x))[0];
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) {
      if (c === '"' && t[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c;
    } else if (c === '"') q = true;
    else if (c === sep) { row.push(cell.trim()); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && t[i + 1] === '\n') i++;
      row.push(cell.trim()); cell = '';
      if (row.some((x) => x !== '')) rows.push(row);
      row = [];
    } else cell += c;
  }
  row.push(cell.trim());
  if (row.some((x) => x !== '')) rows.push(row);
  return { sep, header: rows[0] || [], rows: rows.slice(1) };
}

/** The column that most likely holds each field, from the header names (Turkish, English, Russian). */
export function guessMapping(header) {
  const H = header.map((h) => String(h).toLowerCase());
  const find = (words, not = []) => H.findIndex((h) => words.some((w) => h.includes(w)) && !not.some((w) => h.includes(w)));
  const m = {
    day: find(['date', 'дата', 'день', 'tarih', 'gün', 'day']),
    players: find(['players', 'users', 'dau', 'игрок', 'пользоват', 'oyuncu', 'unique', 'уникальн'], ['new', 'нов', 'yeni', 'arpu']),
    plays: find(['plays', 'sessions', 'launch', 'запуск', 'сесси', 'игр', 'oturum', 'oynama'], ['время', 'time', 'süre', 'arpu', 'игрок']),
    playtime_s: find(['playtime', 'play time', 'время', 'süre', 'duration', 'time'], ['avg', 'сред', 'ortalama', 'per']),
    ad_impr: find(['impression', 'показ', 'reklam', 'ad views', 'ads']),
    revenue: find(['revenue', 'income', 'доход', 'выручк', 'kazanç', 'gelir', 'earning'], ['arpu', 'arpdau', 'per']),
  };
  for (const k of Object.keys(m)) if (m[k] < 0) m[k] = null;
  return m;
}

/**
 * Rows of cells + which column is which → the rows the server takes ({ day, players, plays, playtime_s, ad_impr, revenue }),
 * and the lines it cannot take (line = the line in the file, header = line 1). opts: { dateFormat, timeUnit: 's'|'min'|'h',
 * today }. Counts must be whole and not negative; earnings are rounded to two decimals; a day twice or a day in the future
 * is refused; a line without any number is skipped quietly.
 */
export function mapCsv(rows, mapping, { dateFormat = 'auto', timeUnit = 's', today = '' } = {}) {
  const out = [], errors = [], seen = new Set();
  let skipped = 0;
  const mult = { s: 1, min: 60, h: 3600 }[timeUnit] || 1;
  rows.forEach((r, i) => {
    const line = i + 2;
    const val = {};
    let bad = null;
    for (const [f] of PLATFORM_FIELDS) {
      if (mapping[f] == null) continue;
      let n = parseNum(r[mapping[f]]);
      if (n == null) continue;
      if (Number.isNaN(n) || n < 0) { bad = bad || { line, field: f, msg: `${line}. satır: "${r[mapping[f]]}" sayı değil.` }; continue; }
      if (f === 'playtime_s') n = Math.round(n * mult);
      if (f === 'revenue') n = Math.round(n * 100) / 100;
      else if (!Number.isInteger(n)) { bad = bad || { line, field: f, msg: `${line}. satır: ${f === 'playtime_s' ? 'süre' : 'sayı'} tam sayı olmalı (${r[mapping[f]]}).` }; continue; }
      if (f !== 'revenue' && n > INT_MAX[f]) { bad = bad || { line, field: f, msg: `${line}. satır: sayı çok büyük.` }; continue; }
      val[f] = n;
    }
    if (!Object.keys(val).length && !bad) { skipped++; return; }
    const day = mapping.day == null ? null : parseDay(r[mapping.day], dateFormat);
    if (!day) bad = { line, field: 'day', msg: `${line}. satır: tarih okunamadı ("${r[mapping.day] ?? ''}").` };
    else if (today && day > today) bad = { line, field: 'day', msg: `${line}. satır: ${day} gelecekte.` };
    else if (day < '2026-01-01') bad = { line, field: 'day', msg: `${line}. satır: ${day} çok eski.` };
    else if (seen.has(day)) bad = { line, field: 'day', msg: `${line}. satır: ${day} iki kez var.` };
    if (bad) { errors.push(bad); return; }
    seen.add(day);
    out.push({ day, ...val });
  });
  return { rows: out, errors, skipped };
}

/**
 * The platform form: { platform, day, span (1 or 7), players, plays, playtime_min, ad_impr, revenue, currency, note } →
 * { ok, value: { platform, day, span, p: { players, plays, playtime_s, ad_impr, revenue }, currency, note }, errors }.
 * The same rules as the SQL (st_platform_check).
 */
export function checkPlatformEntry(e, { today } = {}) {
  const { errors, bad } = collector();
  if (!ENTERED_PLATFORMS.includes(e.platform)) bad('platform', 'Bu platformun sayıları elle girilmez.');
  const day = typeof e.day === 'string' ? e.day : '';
  if (!realDay(...(day.split('-').map(Number).length === 3 ? day.split('-').map(Number) : [0, 0, 0]))) bad('day', 'Tarih seçilmedi.');
  else if (day < '2026-01-01') bad('day', 'Tarih çok eski.');
  else if (today && day > today) bad('day', 'Gelecek bir gün olamaz.');
  const span = Number(e.span);
  if (![1, 7].includes(span)) bad('span', 'Gün ya da hafta seçilmedi.');
  const p = {};
  const num = (f, label, raw, mult = 1, dec = false) => {
    const n = parseNum(raw);
    if (n == null) { p[f] = null; return; }
    if (Number.isNaN(n) || n < 0) return bad(f, `${label}: 0 ya da daha büyük bir sayı yaz.`);
    const v = dec ? n : Math.round(n * mult);
    if (!dec && !Number.isInteger(n * mult)) return bad(f, `${label}: tam sayı yaz.`);
    if (dec && Math.round(n * 100) / 100 !== n) return bad(f, `${label}: en çok iki kuruş basamağı (ör. 12,50).`);
    p[f] = v;
  };
  num('players', 'Oyuncu', e.players);
  num('plays', 'Oynama', e.plays);
  num('playtime_s', 'Oyun süresi (dakika)', e.playtime_min, 60);
  num('ad_impr', 'Reklam gösterimi', e.ad_impr);
  num('revenue', 'Kazanç', e.revenue, 1, true);
  if (!errors.length && Object.values(p).every((v) => v == null)) bad('empty', 'En az bir sayı yaz.');
  if (p.revenue != null && !REVENUE_CURRENCIES.includes(e.currency)) bad('currency', 'Para birimi seçilmedi.');
  const note = typeof e.note === 'string' ? e.note.trim() : '';
  if (note.length > 200) bad('note', 'Not en çok 200 karakter.');
  return { ok: errors.length === 0, value: { platform: e.platform, day, span, p, currency: p.revenue != null ? e.currency : null, note }, errors };
}
