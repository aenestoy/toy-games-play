// Element impacts for spell and weapon hits (2026-10-25, owner: "mage de davul sesi geliyor moba vurunca" - the mage's
// hits sounded like a drum). Cause: the hits played p0ss explosion booms (ps-boom*, energy mostly under 200 Hz), the low
// ps-flames rumble, a synthesized low thump on kills, and with ?ses=yeni a 'body' layer (the low end of a fire impact).
// Now every spell hit is its element's own short impact, cut from the CC0 packs already logged in docs/ASSET-LOG.md and
// high-passed so nothing under ~200-400 Hz is left (public/sfx/s3/, mono MP3, -20 dB RMS, peaks under -1 dB):
//   fire  hfire (whoosh + crackle) + the fireT crackle tail   cold   hice (ice crack), hiceL (shatter)
//   light hzap (zap), hzapL (big strike)                      poison hvenom (wet splat / hiss)
//   bone / shadow hbone (bone crack) + a low swish (w3)       holy   hholy (chime)
//   physical: the weapon - sword steel (clash), dagger (slice, dclash), arrow (harrow: a blade biting wood), axe (barbarian:
//   his own set, unchanged)
// The default game plays these; ?vurus=eski plays the old hits (src/main.js HX). A layer is [kind, volume, delay s, rate];
// a kind is one of HX_KINDS, a src/sound2.js kind or an old SFILES kind.

export const HX_KINDS = { hfire: 5, hfireL: 3, hice: 5, hiceL: 3, hzap: 5, hzapL: 3, hvenom: 5, hholy: 5, hbone: 5, harrow: 4 };
export const hxFiles = (k) => (HX_KINDS[k] ? Array.from({ length: HX_KINDS[k] }, (_, i) => 's3/' + k + '-' + (i + 1)) : null);
// the src/sound2.js kinds the new hits use (loaded with the first sound)
export const HX_S2 = ['fireT', 'w1', 'w2', 'w3', 'clash', 'hilt', 'riseL'];
// old kinds whose files were booms or rumbles: in the new set they play these instead, wherever they are used
export const HX_REMAP = { fboom: 'hfire', bigboom: 'hfireL', flames: 'fireT' };
// (levels: every element's hit ~-24 LUFS, measured offline on the mixed layers; the old mage fire hit was -22 LUFS with 65%
// of its energy under 200 Hz, the new one has 7%)
export const HX_GAIN = 1;

const L = (...a) => a;
// one hit of an element (v: its volume)
const EL = {
  fire: (v) => L(['hfire', v * 1.15], ['fireT', v * 0.25, 0.03]),
  cold: (v) => L(['hice', v * 0.95]),
  light: (v) => L(['hzap', v * 0.85]),
  pois: (v) => L(['hvenom', v * 0.9]),
  shad: (v) => L(['hbone', v * 1.1], ['w3', v * 0.6, 0, 0.8]),
  bone: (v) => L(['hbone', v * 1.2]),
  holy: (v) => L(['hholy', v * 0.7]),
};
// a physical hit by the class's weapon (null: the old sound plays - the barbarian keeps his own axe set)
const WPN = {
  knight: (v) => L(['clash', v * 0.9], ['slice', v * 0.5, 0.005]),
  rogue: (v) => L(['slice', v * 0.55], ['dclash', v * 0.22]),
  ranger: (v) => L(['harrow', v * 1.1]),
  necro: (v) => EL.bone(v),
  mage: (v) => EL.fire(v),
};
// a hit landing (el: the hit's main type; holy: the knight's light is holy)
export function hxHit(cls, el, crit) {
  const v = 0.55, f = el && el !== 'phys' ? EL[el] : WPN[cls];
  if (!f) return null;
  const out = f(v);
  if (crit) { const k = out[0][0]; out.push([k, v * 0.5, 0.02, 1.15]); if (!el || el === 'phys') out.push(['ring', 0.16, 0.01, 1.4]); }
  return out;
}
// a kill: the element's bigger layer
export function hxKill(cls, el) {
  switch (el && el !== 'phys' ? el : cls === 'necro' ? 'bone' : cls) {
    case 'fire': case 'mage': return L(['hfireL', 0.5], ['fireT', 0.22, 0.05]);
    case 'cold': return L(['hiceL', 0.55], ['glass', 0.18, 0.03, 1.3]);
    case 'light': return L(['hzapL', 0.5]);
    case 'pois': return L(['hvenom', 0.6], ['slime', 0.25, 0.03]);
    case 'shad': case 'bone': return L(['hbone', 0.6], ['hbone', 0.35, 0.04, 1.2]);
    case 'holy': return L(['hholy', 0.55], ['bell', 0.14, 0.02, 1.5]);
    case 'knight': return L(['clash', 0.45], ['hbone', 0.3, 0.02]);
    case 'rogue': return L(['slice', 0.5], ['hbone', 0.3, 0.02]);
    case 'ranger': return L(['harrow', 0.55], ['hbone', 0.35, 0.02]);
    default: return null;
  }
}
// the skills' own impact events in the new set (the casts keep their sounds). k: the event's strength (ranger, rogue)
const blood = (v, d = 0, r = 0.78) => ['hvenom', v, d, r]; // a wet blood splat (the poison splat, lower)
export const HX_EV = {
  common: {
    boom: L(['hfireL', 0.6], ['hfire', 0.3, 0.02]),
    meteor: L(['hfireL', 1], ['hfire', 0.6, 0.03], ['rock', 0.5, 0, 0.8], ['fireT', 0.5, 0.1]),
    firestorm: L(['fireT', 0.55]), ultcast: L(['ultrise', 0.8], ['fireT', 0.4]),
  },
  mage: {
    m_fbhit: L(['hfire', 0.6], ['fireT', 0.15, 0.03]),
    m_frhit: L(['hice', 0.65], ['hice', 0.25, 0.02, 1.2]),
    m_sphit: L(['hzap', 0.45]),
    m_fbboom: L(['hfireL', 0.75], ['hfire', 0.4, 0.02], ['fireT', 0.3, 0.08]),
    m_shhit: L(['hice', 0.4]),
    m_shatter: L(['hiceL', 0.7], ['hice', 0.45, 0.03, 1.15], ['glass', 0.25, 0.05, 1.3]),
    m_erupt: L(['hfire', 0.55], ['fireT', 0.2, 0.05]),
    m_orbend: L(['hiceL', 0.6], ['hice', 0.3, 0.03]),
    m_icefall: L(['hice', 0.18, 0, 1.1]),
    m_lshit: L(['hzap', 0.55], ['hzap', 0.25, 0.03, 1.2]),
    m_deepburst: L(['hiceL', 0.85], ['hice', 0.5, 0.03], ['hice', 0.4, 0.07, 1.2]),
    m_thunder: L(['hzapL', 0.85], ['hzap', 0.45, 0.02]),
    m_storm: L(['hfireL', 0.6], ['fireT', 0.45, 0.05]),
    m_fshield: L(['firecast', 0.6, 0, 0.75], ['fireT', 0.45, 0.05], ['w2', 0.3]),
    m_fstick: L(['fireT', 0.15]), m_incin0: L(['firecast', 0.6, 0, 0.8], ['fireT', 0.5, 0.05], ['w2', 0.3]), m_incin: L(['fireT', 0.3]), m_trail: L(['fireT', 0.12]),
    m_thcast: L(['riseL', 0.7], ['hzapL', 0.45, 0.3]), m_rumble: L(['hzapL', 0.2, 0, 0.85]),
  },
  necro: {
    n_spearhit: L(['hbone', 0.7], ['hbone', 0.35, 0.02, 1.2]),
    n_shardhit: L(['hbone', 0.35, 0, 1.2]),
    n_decomp: L(blood(0.2)),
    n_flesh: L(blood(0.45), ['hbone', 0.45]),
    n_hemo: L(blood(0.35, 0, 0.75), ['w1', 0.15]),
    n_reaphit: L(['hbone', 0.35], ['slice', 0.25]),
    n_surge: L(blood(0.6, 0, 0.75), blood(0.4, 0.04, 0.7), ['w3', 0.35, 0, 0.8]),
    n_blightland: L(['hvenom', 0.55, 0, 0.85], ['slime', 0.35]),
    n_blighttick: L(['hvenom', 0.15, 0, 0.9]),
    n_prison: L(['hbone', 0.7], ['hbone', 0.5, 0.04, 0.85], ['rock', 0.3], ['creak', 0.3, 0.05, 1.4]),
    n_wave: L(blood(0.6, 0, 0.7), ['w3', 0.5, 0, 0.75]),
    n_wavehit: L(blood(0.45)),
    n_corpse: L(['hfireL', 0.45, 0, 0.8], ['hbone', 0.7], blood(0.5, 0.02, 0.75)),
    n_moonhit: L(blood(0.35), ['w1', 0.15]),
    n_stormtick: L(['w2', 0.2], ['hbone', 0.22, 0, 1.2]),
  },
  knight: {
    k_smite: L(['hholy', 0.6], ['clash', 0.3, 0.01], ['hholy', 0.3, 0.04, 1.25]),
    k_hamhit: L(['hholy', 0.4, 0, 1.1], ['hilt', 0.25]),
    k_cons: L(['hholy', 0.55], ['hholy', 0.35, 0.1, 0.8], ['bell', 0.25]),
    k_constick: L(['hholy', 0.1, 0, 1.2]),
    k_condburst: L(['hholy', 0.6], ['hholy', 0.4, 0.03, 0.85], ['bell', 0.3]),
    k_judge: L(['hzap', 0.4], ['hholy', 0.6, 0.01], ['bell', 0.3]),
    k_arbland: L(['hholy', 0.75], ['hzapL', 0.45, 0.01], ['rock', 0.45, 0, 0.8], ['clash', 0.3, 0.02]),
  },
  ranger: {
    thunk: (k) => L(['harrow', 0.45 * k]), thunkH: L(['harrow', 0.65], ['hbone', 0.3, 0.01]), land: (k) => L(['harrow', 0.2 * k, 0, 0.9]),
    fhit: L(['harrow', 0.35], ['hfire', 0.4]),
    xb: L(['hfireL', 0.6], ['hfire', 0.4, 0.02]), clhit: L(['hfire', 0.45], ['click', 0.3, 0, 0.7]), pop: (k) => L(['hfire', 0.35, 0, 1.1 + 0.04 * k]),
    phxboom: L(['hfireL', 0.9], ['hfire', 0.5, 0.03], ['fireT', 0.45, 0.08]),
    ignite: L(['firecast', 0.5, 0, 0.75], ['fireT', 0.5], ['hfire', 0.4]),
  },
  rogue: {
    pop: (k) => L(['hvenom', 0.5 * k], ['slime', 0.3 * k]),
    plague: L(['hvenom', 0.7], ['hvenom', 0.4, 0.04, 0.85], ['slime', 0.3]),
    bomb: L(['w3', 0.45, 0, 0.85], ['cloth', 0.5, 0.03]),
    finale: L(['hbone', 0.6], ['w3', 0.5, 0, 0.75], ['shade', 0.45, 0.05], ['slice', 0.5]),
    storm: L(['w3', 0.45, 0, 0.8], ['shade', 0.55], ['warp', 0.45, 0.05]),
    backstab: L(['slice', 0.6], ['hbone', 0.4, 0.01], ['draw', 0.3, 0.03, 0.75]),
  },
};
export function hxEvent(cls, n, k = 1) { const t = HX_EV[cls]; let l = t && t[n]; if (!l) return null; return typeof l === 'function' ? l(k) : l; }

// the player: a random take of a kind (never the same one twice in a row), +-5% pitch; a kind plays at most every 45 ms
// and 3 at once, all the new layers together at most 12 at once, so a pack of hits never piles into noise.
// deps: ac() the AudioContext, out() the effects bus, buf(file) a decoded buffer or null, files(kind) its file list.
export function createHxPlayer({ ac, out, buf, files }) {
  const last = {}, lastT = {}, live = {};
  function one(kind, vol, delay = 0, rate = 1) {
    const A = ac(), dst = out(); if (!A || !dst || !(vol > 0)) return false;
    const list = files(kind); if (!list) return false;
    const now = A.currentTime, at = now + delay;
    if (lastT[kind] !== undefined && Math.abs(at - lastT[kind]) < 0.045) return false;
    let all = 0; for (const k in live) { live[k] = live[k].filter((e) => e > now); all += live[k].length; }
    const lv = live[kind] || (live[kind] = []); if (lv.length >= 3 || all >= 12) return false;
    const ok = list.filter((f) => buf(f)); if (!ok.length) return false;
    const pick = ok.length > 1 ? ok.filter((f) => f !== last[kind]) : ok, f = pick[Math.floor(Math.random() * pick.length)]; last[kind] = f; lastT[kind] = at;
    const src = A.createBufferSource(), g = A.createGain(); src.buffer = buf(f); src.playbackRate.value = rate * (0.95 + Math.random() * 0.1);
    g.gain.value = vol * HX_GAIN; src.connect(g).connect(dst); src.start(at); lv.push(at + src.buffer.duration / src.playbackRate.value); return true;
  }
  return (layers) => { if (layers) for (const l of layers) if (l) one(l[0], l[1], l[2] || 0, l[3] || 1); };
}
