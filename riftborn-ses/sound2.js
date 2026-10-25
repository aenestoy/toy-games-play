// New recorded skill sounds (2026-10-19, owner: "real-sounding recorded sounds, not synthetic beeps"). Test switch ?ses=yeni
// (src/main.js SES2); without it the game plays its old sounds. Every file in public/sfx/s2/ is cut from five CC0 packs
// (docs/ASSET-LOG.md): Basic Spell Impacts and Healing Spell Impacts (lentikula), Deep Bone Crack/Break (Zane Little Music),
// Medieval Weapon Textures and Weapon Impacts (Ben Jaszczak & Brian Nelson). Each file is mono MP3, loudness-matched (-20 LUFS,
// peaks under -1 dBTP), its pitch baked in, so the game only moves it +-5% per play.
// A skill is layers: [kind, volume, delay s, rate]. Kinds are the files below (several takes each, one picked at random, never
// the same take twice in a row) or an old recorded kind of src/main.js SFILES (Kenney / artisticdude CC0: cloth, armor, rock...).

// the takes of each kind (public/sfx/s2/<kind>-<n>.mp3) and the group that loads it: 'c' with the first sound, a class's group
// when that class plays (so a hero downloads only its own class's sounds)
export const S2_KINDS = {
  // air: dagger/seax swings, katana/sabre swings, axe/spear swings (Weapon Textures)
  w1: ['c', 4], w2: ['c', 4], w3: ['c', 3],
  // a low body under hits and blasts: the low end of the fire and lightning impacts (Basic Spell Impacts)
  body: ['c', 4], bodyL: ['c', 3],
  // fire / frost / lightning impacts (Basic Spell Impacts): short hit, big blast, the burning crackle
  fireS: ['c', 4], fireL: ['c', 3], fireT: ['c', 3], iceS: ['c', 4], iceL: ['c', 3], zapS: ['c', 4], zapL: ['c', 3],
  // a rising fire swell (a fire impact played backwards) and a shimmering warp (a healing impact backwards)
  riseF: ['c', 2], warp: ['c', 3],
  // holy light (Healing Spell Impacts), real bone breaks (Deep Bone Crack), splashes (the water impacts, lowered for blood)
  holyS: ['c', 4], boneS: ['c', 5], blood: ['c', 4],
  // steel (Weapon Impacts): sword on sword, mace on blade, hilt/haft knocks; a deep ringing gong (blade rings, an octave down)
  clash: ['c', 4], mace: ['c', 4], hilt: ['c', 4], gong: ['c', 2],
  // mage: the gathering of each element and their tails
  fcast: ['mage', 3], icast: ['mage', 3], lcast: ['mage', 3], iceT: ['mage', 3], thunder: ['mage', 2], riseI: ['mage', 2], riseL: ['mage', 2],
  // necromancer: deep bone breaks, a thick blood burst, rot, a dark swell
  boneL: ['necro', 4], bloodL: ['necro', 3], rot: ['necro', 3], riseD: ['necro', 2],
  // knight: the big holy blast and its swell
  holyL: ['knight', 3], riseH: ['knight', 2],
  // ranger: bow draw, bow and crossbow shots, arrows passing, crossbow mechanics, arrow thunks
  draw: ['ranger', 3], bow: ['ranger', 4], xbow: ['ranger', 3], xclick: ['ranger', 4], arrow: ['ranger', 4], arrowH: ['ranger', 3], thunk: ['ranger', 4], place: ['ranger', 3],
  // rogue: dagger swings, dagger on dagger, quick draws, a hard critical clash, venom splashes
  dswing: ['rogue', 4], dclash: ['rogue', 4], ddraw: ['rogue', 3], dcrit: ['rogue', 3], venom: ['rogue', 3],
  // barbarian: the axe swing and the axe biting
  aswing: ['barb', 4], axe: ['barb', 4],
  // the barbarian's own set (owner chose 2026-10-20, "Balta sesi 7 olsun. Barbar sesleri ... varsayılan olsun"; ?balta=0 and
  // ?ses=barb0 play the old ones for a while): the axe swing (Axe Swing, lowered), the axe hit from real meat recordings
  // (qubodup Impact, Independent.nu wet squish impacts; CC0) with a leather thud, the bone crunch of heavy hits, his real
  // voice (HaelDB Male Grunt/Yelling, CC0) - a war cry, a deep roar, an effort grunt - and a real swish for his spin (qubodup
  // bamboo swishes, lowered; CC0). Loaded when a barbarian plays.
  bsw1: ['barbx', 4], bhit7: ['barbx', 4], bbone: ['barbx', 4],
  bcry: ['barbx', 4], broar: ['barbx', 3], bgrunt: ['barbx', 4], bswish: ['barbx', 6],
};
export const s2Files = (kind) => { const k = S2_KINDS[kind]; return k ? Array.from({ length: k[1] }, (_, i) => 's2/' + kind + '-' + (i + 1)) : null; };
export const s2Group = (g) => Object.keys(S2_KINDS).filter((k) => S2_KINDS[k][0] === g);
// the old CC-BY-SA p0ss kinds (ps-*.mp3) and the thin old swing play these instead (monsters, bosses, talents use them too)
export const S2_REMAP = { fboom: 'fireS', bigboom: 'fireL', zap: 'zapS', crack: 'zapS', freeze: 'iceL', warp: 'warp', flames: 'fireT', ultrise: 'riseF', mshield: 'holyS', swing: 'w2' };

const L = (...a) => a;
// generic events of sfx() (src/main.js), shared by every class and by monsters (only the ones that already played a
// sound: the silent ones - freeze, bigboom, crack, zap... - stay silent, and the player's hurt sounds stay as they are)
const COMMON = {
  nova: L(['iceL', 0.75], ['iceS', 0.4, 0.02], ['w3', 0.3]), meteor: L(['fireL', 1], ['bodyL', 0.9], ['rock', 0.5]),
  ultcast: L(['riseF', 0.8]), boom: L(['fireS', 0.65], ['body', 0.45]),
  slam: L(['bodyL', 0.8], ['rock', 0.55], ['mace', 0.35]), firestorm: L(['fireT', 0.6]), fire: L(['fireS', 0.35]), teleport: L(['warp', 0.7]),
  arc: L(['zapS', 0.55]), spark: L(['zapS', 0.45]),
  cleave: L(['w2', 0.6]), dash: L(['clothh', 0.7], ['w2', 0.35]),
};
const MAGE = {
  m_windfire: L(['fcast', 0.35]), m_windcold: L(['icast', 0.3]), m_windlight: L(['lcast', 0.3]),
  m_fbolt: L(['fcast', 0.55], ['w1', 0.35]), m_fbhit: L(['fireS', 0.7], ['body', 0.35]),
  m_frost: L(['icast', 0.5], ['w1', 0.35]), m_frhit: L(['iceS', 0.75], ['body', 0.25]),
  m_spark: L(['lcast', 0.5], ['zapS', 0.3, 0.02]), m_sphit: L(['zapS', 0.42]),
  m_fball: L(['fcast', 0.7], ['w2', 0.45]), m_fbboom: L(['fireL', 0.8], ['bodyL', 0.6]),
  m_shards: L(['icast', 0.5], ['w1', 0.35]), m_shhit: L(['iceS', 0.45]), m_shatter: L(['iceL', 0.8], ['iceS', 0.45, 0.03], ['body', 0.35]),
  m_arc: L(['lcast', 0.5], ['zapS', 0.6, 0.02]),
  m_fshield: L(['riseF', 0.55], ['fireT', 0.5, 0.1], ['body', 0.35]), m_fstick: L(['fireT', 0.18]), m_fsend: L(['w2', 0.3], ['fireT', 0.2]),
  m_storm: L(['fireL', 0.55], ['fireT', 0.5]), m_erupt: L(['fireS', 0.55], ['body', 0.3]),
  m_bliz: L(['riseI', 0.5], ['iceL', 0.45, 0.15], ['w3', 0.35]), m_wind: L(['w3', 0.18]), m_icefall: L(['iceS', 0.2]),
  m_orb: L(['icast', 0.55], ['w2', 0.35], ['iceT', 0.4, 0.05]), m_orbend: L(['iceL', 0.7], ['body', 0.3]), m_pulse: L(['iceT', 0.35], ['w2', 0.2]),
  m_incin0: L(['fcast', 0.6], ['fireT', 0.6, 0.05], ['w2', 0.3]), m_incin: L(['fireT', 0.32]), m_trail: L(['fireT', 0.14]),
  m_lspear: L(['lcast', 0.6], ['w2', 0.45], ['zapS', 0.4, 0.04]), m_lshit: L(['zapS', 0.6], ['body', 0.25]),
  m_tele: L(['warp', 0.7], ['zapS', 0.3, 0.05]),
  m_dfstart: L(['iceL', 0.6], ['iceT', 0.4, 0.1]), m_deepburst: L(['iceL', 0.9], ['bodyL', 0.75], ['iceS', 0.5, 0.03]),
  m_thcast: L(['riseL', 0.75], ['thunder', 0.6, 0.3]), m_thunder: L(['zapL', 0.85], ['bodyL', 0.6]), m_rumble: L(['thunder', 0.4]),
};
const NECRO = {
  n_windw: L(['boneS', 0.25], ['w1', 0.2]), n_windb: L(['riseD', 0.35]), n_windg: L(['rot', 0.3], ['shade', 0.15]),
  n_spear: L(['boneS', 0.65], ['w3', 0.6]), n_spearhit: L(['boneL', 0.8], ['body', 0.5], ['rock', 0.35]),
  n_shards: L(['boneS', 0.4], ['w1', 0.35]), n_shardhit: L(['boneS', 0.4]),
  n_decomp: L(['rot', 0.3]), n_flesh: L(['blood', 0.55], ['boneS', 0.45], ['body', 0.35]),
  n_hemo: L(['blood', 0.65], ['body', 0.35], ['w2', 0.25]), n_reap: L(['w3', 0.65], ['shade', 0.25]), n_reaphit: L(['blood', 0.35], ['boneS', 0.3]),
  n_surge0: L(['riseD', 0.55]), n_surge: L(['bloodL', 0.8], ['bodyL', 0.6], ['w3', 0.35]),
  n_blight: L(['rot', 0.45], ['w2', 0.25]), n_blightland: L(['rot', 0.7], ['body', 0.35]), n_blighttick: L(['rot', 0.14]),
  n_armor: L(['boneS', 0.55], ['boneS', 0.45, 0.08], ['boneS', 0.4, 0.16], ['armor', 0.35, 0.1]), n_armorhit: L(['boneS', 0.35]), n_armorbreak: L(['boneL', 0.7], ['boneS', 0.4, 0.05]),
  n_mist: L(['warp', 0.45], ['blood', 0.35], ['shade', 0.3]),
  n_raise: L(['rock', 0.5], ['riseD', 0.45]), n_rise: L(['boneS', 0.45], ['rock', 0.25]),
  n_prison: L(['bodyL', 0.7], ['rock', 0.55], ['boneL', 0.7, 0.03], ['boneS', 0.45, 0.09]),
  n_wave: L(['bloodL', 0.8], ['bodyL', 0.6], ['w3', 0.5]), n_wavehit: L(['blood', 0.45], ['body', 0.3]),
  n_corpse: L(['bloodL', 0.7], ['boneL', 0.75], ['fireS', 0.35], ['bodyL', 0.55]),
  n_storm: L(['riseD', 0.7], ['boneS', 0.5, 0.2], ['w3', 0.45, 0.1]), n_stormtick: L(['w2', 0.22], ['boneS', 0.22]),
  n_moon: L(['riseD', 0.8], ['bloodL', 0.45, 0.4]), n_moonhit: L(['blood', 0.45], ['w1', 0.2]),
  n_army: L(['bodyL', 0.8], ['rock', 0.6], ['riseD', 0.6], ['boneS', 0.5, 0.15], ['boneS', 0.45, 0.3], ['boneS', 0.4, 0.45]),
};
const KNIGHT = {
  k_windh: L(['riseH', 0.3]), k_bash: L(['mace', 0.85], ['body', 0.6], ['clash', 0.3, 0.02]), k_bashair: L(['w3', 0.45], ['armor', 0.3]),
  k_ready: L(['armor', 0.5], ['clothh', 0.35], ['w1', 0.2]), k_smitesw: L(['w2', 0.6]), k_smitecast: L(['holyS', 0.35], ['w1', 0.25]),
  k_adv: L(['clothh', 0.55], ['armor', 0.35], ['w2', 0.3]), k_slam: L(['mace', 0.75], ['bodyL', 0.65], ['rock', 0.4]),
  k_smite: L(['holyS', 0.7], ['mace', 0.55], ['body', 0.5]),
  k_zeal0: L(['w2', 0.5], ['clash', 0.22, 0.03]), k_zeal1: L(['w2', 0.5], ['clash', 0.25, 0.03]), k_zeal2: L(['w2', 0.6], ['clash', 0.3, 0.03]),
  k_zhit0: L(['clash', 0.45], ['body', 0.3]), k_zhit1: L(['clash', 0.5], ['body', 0.32]), k_zhit2: L(['clash', 0.6], ['body', 0.45], ['holyS', 0.3]),
  k_throw: L(['w3', 0.55]), k_throwhit: L(['mace', 0.65], ['clash', 0.35, 0.02]),
  k_hammer: L(['w2', 0.45], ['holyS', 0.3]), k_hamhit: L(['hilt', 0.45], ['holyS', 0.25]),
  k_valor: L(['w3', 0.65], ['body', 0.4]), k_valorw: L(['holyL', 0.5], ['w3', 0.3]),
  k_iron: L(['armor', 0.7], ['clash', 0.4, 0.06], ['clash', 0.35, 0.14], ['holyS', 0.35, 0.05]), k_ironhit: L(['hilt', 0.3]), k_ironbreak: L(['mace', 0.6], ['clash', 0.45, 0.03], ['armor', 0.45, 0.05]),
  k_cons: L(['holyL', 0.75], ['body', 0.45], ['gong', 0.35]), k_constick: L(['holyS', 0.12]),
  k_banner: L(['bodyL', 0.7], ['rock', 0.5], ['clothh', 0.7, 0.06], ['gong', 0.45, 0.1]), k_bannerend: L(['clothh', 0.5], ['rock', 0.3]),
  k_rally: L(['gong', 0.8], ['holyL', 0.55, 0.05], ['bodyL', 0.55], ['armor', 0.4]),
  k_aegis: L(['riseH', 0.65], ['holyL', 0.7, 0.3], ['clash', 0.4, 0.1]), k_aegrep: L(['hilt', 0.4], ['holyS', 0.2]), k_aegend: L(['holyS', 0.35]),
  k_charge: L(['clothh', 0.7], ['armor', 0.5], ['w3', 0.45]), k_chargehit: L(['mace', 0.75], ['body', 0.55]),
  k_condemn: L(['riseH', 0.5]), k_condburst: L(['holyL', 0.75], ['bodyL', 0.55]),
  k_judgemark: L(['holyS', 0.4], ['riseH', 0.25]), k_judge: L(['holyL', 0.7], ['zapS', 0.3]),
  k_arbrise: L(['riseH', 0.65], ['w3', 0.45], ['clothh', 0.5]), k_arbland: L(['holyL', 0.8], ['bodyL', 0.85], ['rock', 0.6], ['mace', 0.5]),
};
// ranger: c.xb = a crossbow is worn (bowOn() false)
const RANGER = {
  shot: (k, c) => L([c.xb ? 'xbow' : 'bow', 0.65], ['arrow', 0.3, 0.03]),
  heavy: (k, c) => L([c.xb ? 'xbow' : 'bow', 0.85], ['arrowH', 0.55, 0.03], ['body', 0.25]),
  multi: (k, c) => L([c.xb ? 'xbow' : 'bow', 0.6], [c.xb ? 'xbow' : 'bow', 0.45, 0.03], [c.xb ? 'xbow' : 'bow', 0.4, 0.06], ['arrow', 0.4, 0.04]),
  rapid: (k, c) => L([c.xb ? 'xbow' : 'bow', k >= 9 ? 0.7 : 0.45, 0, k >= 9 ? 0.96 : Math.min(1.05, 0.98 + 0.008 * k)], ...(k % 2 === 0 || k >= 9 ? [['arrow', 0.25, 0.02]] : [])),
  fire: (k, c) => L([c.xb ? 'xbow' : 'bow', 0.6], ['fireT', 0.35], ['arrow', 0.3, 0.03]),
  bomb: (k, c) => L([c.xb ? 'xbow' : 'bow', 0.5], ['w2', 0.3]),
  pierce: (k, c) => L([c.xb ? 'xbow' : 'bow', 0.85], ['arrowH', 0.6, 0.02], ['body', 0.3]),
  deadeye: (k, c) => L([c.xb ? 'xbow' : 'bow', 1], ['arrowH', 0.8, 0.02], ['bodyL', 0.5]),
  draw: L(['draw', 0.5]), charge: L(['draw', 0.6], ['warp', 0.35]),
  thunk: (k) => L(['thunk', 0.45 * k], ['punch', 0.2 * k]), thunkH: L(['thunk', 0.65], ['body', 0.45]), fhit: L(['thunk', 0.35], ['fireS', 0.35]),
  land: (k) => L(['thunk', 0.25 * k]),
  rain: L(['arrow', 0.45], ['arrow', 0.4, 0.12], ['arrow', 0.35, 0.25], ['bow', 0.4]),
  storm: L(['warp', 0.5], ['bow', 0.6], ['bow', 0.5, 0.06], ['arrowH', 0.5, 0.15], ['bodyL', 0.4]), stormtick: L(['arrow', 0.25]),
  mark: L(['xclick', 0.4], ['shade', 0.3]), markdie: L(['thunk', 0.5], ['hilt', 0.35]),
  xb: L(['fireS', 0.7], ['body', 0.5]), clhit: L(['xclick', 0.35], ['fireS', 0.4]), pop: L(['fireS', 0.3], ['xclick', 0.15]),
  phx: L(['riseF', 0.6], ['bow', 0.6], ['fireT', 0.5], ['w3', 0.45]), phxcharge: L(['fireT', 0.4]), phxboom: L(['fireL', 0.9], ['bodyL', 0.8], ['fireT', 0.5, 0.1]),
  ignite: L(['fireL', 0.6], ['fireT', 0.5], ['body', 0.35]), burn: L(['fireT', 0.14]),
  roll: L(['clothh', 0.65], ['w2', 0.35], ['step', 0.3]),
  roll3: (k, c) => L([c.xb ? 'xbow' : 'bow', 0.5], [c.xb ? 'xbow' : 'bow', 0.42, 0.03], [c.xb ? 'xbow' : 'bow', 0.36, 0.06], ['arrow', 0.35, 0.04]),
  nade: L(['leather', 0.3], ['w2', 0.35], ['xclick', 0.25]), nadebounce: L(['thunk', 0.3], ['step', 0.3]),
  sentry: L(['xclick', 0.5], ['place', 0.45], ['leather', 0.25]), sentshot: L(['xbow', 0.4], ['arrow', 0.2]), sentoff: L(['xclick', 0.35], ['leather', 0.2]),
  tick: L(['xclick', 0.12]), trapset: L(['xclick', 0.45], ['place', 0.35], ['leather', 0.3]), snap: L(['trapS', 0.7], ['mace', 0.5], ['clash', 0.3, 0.02]),
};
const ROGUE = {
  stab: (k) => L(['dswing', 0.55 * k]), stab2: (k) => L(['dswing', 0.6 * k], ['ddraw', 0.25 * k, 0.02]),
  thrust: L(['ddraw', 0.5], ['w2', 0.45]), throw: L(['dswing', 0.5], ['w1', 0.3]),
  fan: L(['dswing', 0.4], ['dswing', 0.35, 0.035], ['dswing', 0.3, 0.07]), cut: (k) => L(['slice', 0.4 * k], ['dclash', 0.15 * k]),
  shadow: L(['shade', 0.5], ['warp', 0.45], ['w2', 0.3]), backstab: L(['dcrit', 0.7], ['body', 0.5], ['slice', 0.4, 0.01]),
  glass: L(['glass', 0.6], ['venom', 0.55, 0.02], ['potion', 0.3, 0.03]),
  bomb: L(['bodyL', 0.65], ['fireS', 0.35], ['w3', 0.4], ['cloth', 0.4, 0.05]), fuse: L(['click', 0.35]),
  spikes: L(['trapS', 0.45], ['coins', 0.4, 0.04], ['hilt', 0.3, 0.06]), clink: (k) => L(['hilt', 0.18 * k]),
  plague: L(['venom', 0.75], ['body', 0.45], ['slime', 0.35]), pop: (k) => L(['venom', 0.45 * k], ['slime', 0.3 * k]),
  ping: L(['dclash', 0.4], ['slice', 0.25]),
  storm: L(['warp', 0.6], ['shade', 0.55], ['bodyL', 0.4]), finale: L(['bodyL', 0.7], ['dcrit', 0.6], ['shade', 0.45, 0.05], ['fireS', 0.3]),
  lotus: L(['dswing', 0.55], ['dswing', 0.45, 0.04], ['slice', 0.35, 0.06]),
  raise: L(['ddraw', 0.55], ['ddraw', 0.45, 0.08], ['ddraw', 0.4, 0.16], ['warp', 0.5]), land: (k) => L(['dclash', 0.22 * k]),
};
const BARB = {
  cleaveW: L(['cloth', 0.3]), cleave: L(['aswing', 0.75]),
  cleaveHit: (k) => L(['axe', 0.65], ['body', Math.min(0.75, 0.4 + 0.08 * k)], ...(k >= 3 ? [['boneS', 0.4, 0.02]] : [])),
  frenzy: (k) => L(['aswing', 0.5, 0, Math.min(1.08, 1 + 0.02 * k)]), frenzyHit: L(['axe', 0.5], ['punch', 0.3]),
  rendW: L(['unsheathe', 0.35]), rend: L(['aswing', 0.75], ['slice', 0.4]), rendHit: L(['axe', 0.5], ['blood', 0.3, 0.03]), rendBurst: L(['blood', 0.55], ['body', 0.5], ['shade', 0.3]),
  whirl: (k) => L(['aswing', 0.42], ['w3', 0.3], ...(k ? [['body', 0.15]] : [])),
  rushW: L(['step', 0.55], ['armor', 0.3]), rush: L(['clothh', 0.8], ['w3', 0.6], ['step', 0.4]), rushHit: L(['mace', 0.6], ['bodyL', 0.6], ['armor', 0.3]),
  quakeW: L(['w3', 0.3]), quake: L(['bodyL', 0.95], ['rock', 0.7], ['rock', 0.5, 0.15]), tremor: (k) => L(['bodyL', 0.55 + 0.05 * k], ['rock', 0.6]),
  cryW: L(['w3', 0.2]), warcry: L(['gong', 0.9], ['bodyL', 0.7], ['mace', 0.6], ['armor', 0.4, 0.05]),
  rageW: L(['body', 0.35]), rampage: L(['bodyL', 0.6], ['fireT', 0.4], ['axe', 0.4], ['gong', 0.35, 0.05]), rageBeat: L(['body', 0.16]),
  wrathW: L(['fireT', 0.45]), wrath: L(['gong', 0.8], ['fireL', 0.6], ['bodyL', 0.85], ['rock', 0.5]), wrathTick: L(['w2', 0.25], ['fireT', 0.18]),
  ironW: L(['armor', 0.45]), iron: L(['mace', 0.6], ['armor', 0.6], ['clash', 0.4, 0.05]), ironHit: L(['hilt', 0.45]), ironBreak: L(['mace', 0.6], ['clash', 0.5, 0.02], ['armor', 0.4]),
  ancW: L(['gong', 0.3]), ancients: L(['gong', 0.85], ['bodyL', 0.8], ['rock', 0.5]), ancHit: L(['axe', 0.55], ['body', 0.5], ['rock', 0.35]),
  heavyW: L(['w3', 0.3]), smash: L(['axe', 0.7], ['boneS', 0.4, 0.02]), lunge: L(['w3', 0.45], ['step', 0.5], ['clothh', 0.35]),
  graspW: L(['unsheathe', 0.3]), grasp: L(['w3', 0.5], ['armor', 0.6], ['hilt', 0.35, 0.03]), graspHit: L(['hilt', 0.45], ['axe', 0.35]), graspPull: L(['armor', 0.5], ['body', 0.35]),
};
// the barbarian's axe events (the rest of his skills: BARB_X, then the recorded set of S2_EV.barb), his axe hits and kills.
// The skill events play no hit of their own (only the bone crunch of a heavy hit - Cleave on 3+, Lunging Smash, a crit); every
// melee hit picks its layers by what is hit (owner 2026-10-20: "sounds should depend on what is hit"; BODY_OF).
// AXE_G: the level that makes a hit in play as loud as the old one (measured on the same Cleave capture)
export const AXE_G = 1.55;
const bone = (v, d = 0.01) => [['bbone', v, d]];
export const AXE_EV = {
  cleaveW: L(['cloth', 0.3]), cleave: L(['bsw1', 0.75]), cleaveHit: (k) => L(...(k >= 3 ? bone(0.45) : [])),
  frenzy: (k) => L(['bsw1', 0.5, 0, Math.min(1.08, 1 + 0.02 * k)]), frenzyHit: L(),
  rend: L(['bsw1', 0.75], ['slice', 0.3]), rendHit: L(),
  heavyW: L(['bsw1', 0.35]), smash: L(...bone(0.6)),
};
// (the Rotting Corpse wears the skeleton warrior kit: bone)
export const BODY_OF = { cultist: 'cloth', priest: 'cloth', assassin: 'cloth', goblin: 'cloth', spitter: 'cloth',
  zombie: 'bone', bloat: 'flesh', brute: 'flesh', ghoul: 'flesh', spider: 'flesh', hrt: 'flesh',
  archer: 'bone', swarm: 'bone', shaman: 'bone', knight: 'metal', vkg: 'metal', gk: 'metal' };
export const axeBody = (body, crit, w) => { const h = 'bhit7', v = 0.3 + 0.3 * w, c = crit ? bone(0.45) : [];
  if (body === 'cloth') return L([h, v * 0.85], ['clothh', 0.35 + 0.2 * w], ...c);
  if (body === 'bone') return L(['bbone', 0.35 + 0.3 * w], [h, v * 0.4, 0.008], ...(crit ? [['boneS', 0.4, 0.01]] : []));
  if (body === 'metal') return L(['mace', 0.35 + 0.3 * w], ['armor', 0.3], [h, v * 0.35, 0.01], ...c);
  return L([h, v], ...c); };
export const AXE_KILL = L(['bhit7', 0.45]);
// the barbarian's skills whose sound was a monster voice, a gong or a synthesized tone/whoosh (War Cry, Rush, Wrath of
// the Berserker, Call of the Ancients, Whirlwind) with a real man's voice and a real swish; his other skills keep their sounds
export const BARB_X = {
  cryW: L(['clothh', 0.3]), warcry: L(['bcry', 1], ['armor', 0.4, 0.05], ['clothh', 0.45]),
  rush: L(['clothh', 0.8], ['bgrunt', 0.75], ['bswish', 0.45], ['step', 0.4]),
  wrathW: L(['fireT', 0.45]), wrath: L(['broar', 1], ['fireL', 0.6, 0.05], ['bodyL', 0.7], ['rock', 0.5]), wrathTick: L(['bswish', 0.25], ['fireT', 0.18]),
  ancW: L(['clothh', 0.3]), ancients: L(['bcry', 0.85], ['broar', 0.6, 0.15, 0.85], ['bodyL', 0.7], ['rock', 0.5]),
  whirl: (k) => L(['bswish', 0.6, 0, k ? 0.92 : 1]),
};
export const S2_EV = { common: COMMON, mage: MAGE, necro: NECRO, knight: KNIGHT, ranger: RANGER, rogue: ROGUE, barb: BARB };

// each class's hit (w: the blow's weight 0..1, melee: a melee skill) and kill layers
const elHit = (el, v) => el === 'fire' ? ['fireS', v] : el === 'cold' ? ['iceS', v] : el === 'light' ? ['zapS', v] : el === 'holy' ? ['holyS', v] : null;
export const S2_HIT = {
  mage: (el, crit) => L(['body', 0.32], el === 'cold' ? ['iceS', 0.22] : el === 'light' ? ['zapS', 0.2] : ['fireT', 0.18], ...(crit ? [['bodyL', 0.4], elHit(el, 0.32) || ['fireS', 0.32]] : [])),
  necro: (el, crit) => L(['boneS', crit ? 0.45 : 0.3], ['punch', 0.22], ...(crit ? [['boneL', 0.45, 0.01]] : [])),
  knight: (el, crit) => { const holy = el === 'light' || el === 'holy'; return L(holy ? ['holyS', 0.28] : ['clash', 0.36], ['body', 0.32], ...(crit ? [['mace', 0.45], ...(holy ? [['holyS', 0.3, 0.02]] : [])] : [])); },
  ranger: (el, crit) => L(el === 'fire' ? ['fireS', 0.25] : ['thunk', 0.3], ...(crit ? [['hilt', 0.35], ['body', 0.35, 0.01]] : [])),
  rogue: (el, crit) => L(['slice', 0.32], ['dclash', 0.14], ['punch', 0.18], ...(crit ? [['dcrit', 0.45], ['body', 0.3]] : [])),
  barb: (el, crit, w, melee) => melee ? L(['axe', 0.3 + 0.3 * w], ['body', 0.25 + 0.35 * w], ...(crit ? [['boneS', 0.4], ['bodyL', 0.4, 0.01]] : []))
    : L(elHit(el, 0.3) || ['punch', 0.3], ['body', 0.3], ...(crit ? [['bodyL', 0.4]] : [])),
};
export const S2_KILL = {
  mage: (el) => el === 'cold' ? L(['iceL', 0.5], ['body', 0.4]) : el === 'light' ? L(['zapS', 0.45], ['bodyL', 0.35]) : L(['fireS', 0.45], ['bodyL', 0.4]),
  necro: () => L(['boneL', 0.55], ['body', 0.35]),
  knight: () => L(['mace', 0.5], ['gong', 0.2], ['body', 0.35]),
  ranger: () => L(['thunk', 0.5], ['body', 0.45], ['boneS', 0.25]),
  rogue: () => L(['dcrit', 0.45], ['body', 0.4], ['boneS', 0.25]),
  barb: () => L(['axe', 0.45], ['bodyL', 0.45], ['boneS', 0.35]),
};
// each class's new set a little louder or softer, so its loudness in play matches the old set's (measured on the same skill
// sequence: the old set, its layers all at full scale, runs ~2-4 dB hotter through the master compressor)
export const S2_CLS_GAIN = { mage: 1.75, ranger: 1.5, knight: 1.5, barb: 1.3, rogue: 1.1, necro: 1 };
