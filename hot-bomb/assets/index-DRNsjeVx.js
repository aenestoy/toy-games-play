(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e={},t=1500){this.name=`local`,this.playing=!1,this.hooks=e,this.adDurationMs=t}async init(){console.info(`[portal:local] init`)}loadingFinished(){console.info(`[portal:local] loadingFinished`)}gameplayStart(){console.info(`[portal:local] gameplayStart`),this.reportPlay(!0)}gameplayStop(){console.info(`[portal:local] gameplayStop`),this.reportPlay(!1)}reportPlay(e){if(e!==this.playing){this.playing=e;try{this.hooks.onPlayChange?.(e)}catch(e){console.warn(`[portal:local] play listener failed`,e)}}}happyTime(){console.info(`[portal:local] happyTime`)}async showInterstitial(){await this.fakeAd(`INTERSTITIAL AD (simulated)`)}async showRewarded(){return await this.fakeAd(`REWARDED AD (simulated)`),!0}async save(e,t){try{localStorage.setItem(this.k(e),JSON.stringify(t))}catch{}}async load(e){try{let t=localStorage.getItem(this.k(e));return t===null?void 0:JSON.parse(t)}catch{return}}getLanguage(){return(navigator.language||`en`).slice(0,2).toLowerCase()||`en`}k(e){return`game:${e}`}fakeAd(e){this.hooks.onAdStart?.();let t=document.createElement(`div`);return t.textContent=e,Object.assign(t.style,{position:`fixed`,inset:`0`,display:`flex`,alignItems:`center`,justifyContent:`center`,background:`rgba(0,0,0,0.85)`,color:`#fff`,font:`600 24px system-ui, sans-serif`,zIndex:`9999`}),document.body.appendChild(t),new Promise(e=>{setTimeout(()=>{t.remove(),this.hooks.onAdEnd?.(),e()},this.adDurationMs)})}};function t(e,t=8e3){return new Promise((n,r)=>{if(document.querySelector(`script[src="${e}"]`))return n();let i=document.createElement(`script`);i.src=e,i.async=!0;let a=setTimeout(()=>r(Error(`script timeout: ${e}`)),t);i.onload=()=>{clearTimeout(a),n()},i.onerror=()=>{clearTimeout(a),r(Error(`script failed: ${e}`))},document.head.appendChild(i)})}var n=`modulepreload`,r=function(e,t){return new URL(e,t).href},i={},a=function(e,t,a){let o=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function u(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}o=l(t.map(t=>{if(t=r(t,a),t=u(t),t in i)return;i[t]=!0;let o=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let r=e[n];if(r.href===t&&(!o||r.rel===`stylesheet`))return}let s=document.createElement(`link`);if(s.rel=o?`stylesheet`:n,o||(s.as=`script`),s.crossOrigin=``,s.href=t,c&&s.setAttribute(`nonce`,c),document.head.appendChild(s),o)return new Promise((e,n)=>{s.addEventListener(`load`,e),s.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(t=>{for(let e of t||[])e.status===`rejected`&&s(e.reason);return e().catch(s)})},o=[`/sdk.js`,`https://sdk.games.s3.yandex.net/sdk.js`];function s(){let e=new URLSearchParams(location.search).get(`portal`);if(e===`crazygames`||e===`poki`||e===`yandex`||e===`local`)return e;let t=[location.hostname,c(document.referrer)].join(` `);return/crazygames\.com|1001juegos\.com|crazygames\.[a-z.]+/.test(t)?`crazygames`:/poki\.com|poki-gdn\.com/.test(t)?`poki`:/yandex\.(ru|net|com)|games\.s3\.yandex/.test(t)?`yandex`:`local`}function c(e){try{return e?new URL(e).hostname:``}catch{return``}}async function l(t={},n=s(),r={}){switch(n){case`crazygames`:{let{CrazyGamesPortal:e}=await a(async()=>{let{CrazyGamesPortal:e}=await import(`./crazygames-49BzRG6H.js`);return{CrazyGamesPortal:e}},[],import.meta.url);return new e(t)}case`poki`:{let{PokiPortal:e}=await a(async()=>{let{PokiPortal:e}=await import(`./poki-BBZdLgr3.js`);return{PokiPortal:e}},[],import.meta.url);return new e(t)}case`yandex`:{let{YandexPortal:e}=await a(async()=>{let{YandexPortal:e}=await import(`./yandex-Br78C-_Q.js`);return{YandexPortal:e}},[],import.meta.url);return new e(t,o)}default:return new e(t)}}var u=null,d=null,f=null,p=null,m={muted:new URLSearchParams(location.search).get(`mute`)===`1`,portal:!1,ad:!1},h=/^(localhost|127\.0\.0\.1)$/.test(location.hostname);function g(){return m.muted||m.portal||m.ad||document.hidden?!0:h&&!document.hasFocus()}var _=0;function v(e=!0){if(!u){if(!e)return;let t=window.AudioContext||window.webkitAudioContext;if(!t)return;try{u=new t({latencyHint:`interactive`})}catch{u=new t}let n=u.createDynamicsCompressor();n.threshold.value=-16,n.knee.value=8,n.ratio.value=6,n.attack.value=.004,n.release.value=.2;let r=u.createGain();r.gain.value=1.05,d=u.createGain(),d.gain.value=1.25,d.connect(n).connect(r).connect(u.destination),p=u.createGain(),p.gain.value=0,p.connect(d),f=u.createBuffer(1,u.sampleRate,u.sampleRate);let i=f.getChannelData(0);for(let e=0;e<i.length;e++)i[e]=Math.random()*2-1;let a=u.createBuffer(1,1,u.sampleRate),o=u.createBufferSource();o.buffer=a,o.connect(u.destination),o.start(0)}u.state!==`running`&&u.resume().catch(()=>void 0),k()}for(let e of[`pointerup`,`touchend`,`click`,`keydown`])addEventListener(e,()=>v(!0),{capture:!0,passive:!0});addEventListener(`pointerdown`,()=>v(!1),{capture:!0,passive:!0}),document.addEventListener(`visibilitychange`,()=>{document.hidden||v(!1)}),addEventListener(`pageshow`,()=>v(!1));function y(){return{state:u?u.state:`none`,started:_,muted:m.muted,portal:m.portal,ad:m.ad,silent:g()}}function b(e,t,n,r,i,a=0,o=-1,s=d){if(!u||!s||g())return;let c=o>=0?o:u.currentTime+a,l=u.createOscillator(),f=u.createGain();l.type=e,l.frequency.setValueAtTime(t,c),l.frequency.exponentialRampToValueAtTime(Math.max(20,n),c+r),f.gain.setValueAtTime(i,c),f.gain.exponentialRampToValueAtTime(.001,c+r),l.connect(f).connect(s),l.start(c),l.stop(c+r+.02),_++}function x(e,t,n,r,i=`lowpass`,a=n,o=-1,s=d){if(!u||!s||!f||g())return;let c=o>=0?o:u.currentTime,l=u.createBufferSource();l.buffer=f,l.loop=!0;let p=u.createBiquadFilter();p.type=i,p.Q.value=r,p.frequency.setValueAtTime(n,c),p.frequency.exponentialRampToValueAtTime(Math.max(30,a),c+e);let m=u.createGain();m.gain.setValueAtTime(t,c),m.gain.exponentialRampToValueAtTime(.001,c+e),l.connect(p).connect(m).connect(s),l.start(c,Math.random()*.5),l.stop(c+e+.02),_++}var S={tick(e){b(`square`,e?1500:1100,e?1400:1e3,.035,.1),b(`sine`,e?3e3:2200,e?2800:2e3,.02,.06)},pass(){x(.22,.32,500,1.4,`bandpass`,3200),b(`sine`,420,980,.12,.3),b(`triangle`,840,1600,.08,.12,.05)},dash(){x(.18,.26,700,1,`bandpass`,2800)},shove(){b(`sine`,160,70,.14,.5),x(.08,.2,1200,.8)},boing(){b(`sine`,180,620,.09,.32),b(`sine`,620,260,.22,.25,.09)},boom(){x(1.4,1,2400,.7,`lowpass`,70),x(.35,.5,5e3,.5,`highpass`,1500),b(`sine`,120,30,.8,.9),b(`square`,70,28,.3,.22);for(let e=0;e<5;e++)x(.06,.25,3e3,2,`bandpass`,1500,u?u.currentTime+.12+Math.random()*.5:-1)},whee(){b(`triangle`,500,1700,.9,.12,.25)},beep(e){b(`square`,e?880:520,e?880:520,e?.3:.12,.13),e&&b(`square`,1320,1320,.3,.08)},pop(){b(`sine`,700,1200,.07,.25)},click(){b(`sine`,900,1300,.05,.22),x(.03,.12,4e3,1,`highpass`)},drop(){b(`sine`,1200,300,.25,.25)},star(){b(`sine`,1568,2093,.08,.12),b(`sine`,2093,2637,.1,.1,.06)},win(){[523,659,784,1047].forEach((e,t)=>b(`triangle`,e,e,.22,.25,t*.12)),b(`triangle`,1319,1319,.5,.2,.5)}},C={tense:!1,on:!0},w=60/132/4,T=[[48,52,55],[43,47,50],[45,48,52],[41,45,48]],E=[72,-1,76,79,76,-1,74,72,71,-1,74,79,74,-1,71,67,72,-1,76,81,79,76,74,72,77,-1,76,74,72,-1,69,72],D=0,O=0,ee=0,te=e=>440*2**((e-69)/12);function ne(e,t){if(!p)return;let n=Math.floor(t/16)%4,r=t%16,i=T[n];if(r%4==0&&b(`sine`,150,45,.18,.75,0,e,p),(r===4||r===12)&&x(.12,.35,1800,.8,`bandpass`,1200,e,p),(r%2==0||C.tense)&&x(.03,r%4==2?.18:.1,7e3,.7,`highpass`,7e3,e,p),r%2==0){let t=r%8==6?i[0]+12:i[0];b(`triangle`,te(t-12),te(t-12),w*1.6,.42,0,e,p)}let a=i[[0,1,2,1][r%4]]+24;b(`square`,te(a),te(a),w*.7,.035,0,e,p);let o=Math.floor(t/2)%E.length;r%2==0&&E[o]>0&&Math.floor(t/64)%2==1&&b(`triangle`,te(E[o]),te(E[o]),w*1.8,.11,0,e,p)}function re(){if(!u||!p)return;let e=C.on&&!g()?.32:0;for(p.gain.setTargetAtTime(e,u.currentTime,.08),O<u.currentTime&&(O=u.currentTime+.05);O<u.currentTime+.18;)e>0&&ne(O,D),D++,O+=w}function k(){!ee&&u&&(ee=window.setInterval(re,40))}var ie=Number(new URLSearchParams(location.search).get(`adgap`)),ae=ie>0?ie*1e3:18e4,oe=null,se=performance.now(),ce=!1,le=[];function ue(e){oe=e}function de(){return ce}function fe(e){le.push(e)}var pe={onAdStart:()=>{m.ad=!0;for(let e of le)e(!0)},onAdEnd:()=>{m.ad=!1,v(!1);for(let e of le)e(!1)}};function me(){return!!oe&&!ce&&performance.now()-se>=ae}async function he(){if(!me()||!oe)return!1;ce=!0,se=performance.now();try{await oe.showInterstitial()}catch{}return ce=!1,m.ad&&pe.onAdEnd(),se=performance.now(),!0}function ge(){return!oe||ce?!1:!oe.rewardedAvailable||oe.rewardedAvailable()}async function _e(){if(!ge()||!oe)return!1;ce=!0;let e=!1;try{e=await oe.showRewarded()}catch{e=!1}return ce=!1,m.ad&&pe.onAdEnd(),se=performance.now(),e}var ve=[`en`,`tr`,`pt`,`vi`,`ru`,`es`,`id`,`th`,`ja`,`de`,`fr`,`it`,`pl`],ye={tagline:{en:`Pass the bomb. Don't be holding it when it blows!`,tr:`Bombayı pasla. Patladığında elinde olmasın!`,pt:`Passe a bomba. Não esteja com ela quando explodir!`,vi:`Chuyền quả bom đi. Đừng cầm nó khi nó nổ!`,ru:`Передай бомбу. Не держи её, когда она взорвётся!`,es:`Pasa la bomba. ¡Que no te explote en las manos!`,id:`Oper bomnya. Jangan sampai kamu memegangnya saat meledak!`,th:`ส่งระเบิดต่อไป อย่าถือไว้ตอนมันระเบิด!`,ja:`爆弾をパスしよう。爆発するとき持っていたらアウト！`,de:`Gib die Bombe weiter. Halt sie nicht, wenn sie hochgeht!`,fr:`Passe la bombe. Ne l'aie pas en main quand elle explose !`,it:`Passa la bomba. Non tenerla quando esplode!`,pl:`Podaj bombę dalej. Nie trzymaj jej, gdy wybuchnie!`},play:{en:`PLAY`,tr:`OYNA`,pt:`JOGAR`,vi:`CHƠI`,ru:`ИГРАТЬ`,es:`JUGAR`,id:`MAIN`,th:`เล่น`,ja:`プレイ`,de:`SPIELEN`,fr:`JOUER`,it:`GIOCA`,pl:`GRAJ`},inviteFriends:{en:`INVITE FRIENDS`,tr:`ARKADAŞ DAVET ET`,pt:`CONVIDAR AMIGOS`,vi:`MỜI BẠN BÈ`,ru:`ПОЗВАТЬ ДРУЗЕЙ`,es:`INVITAR AMIGOS`,id:`AJAK TEMAN`,th:`ชวนเพื่อน`,ja:`友だちを招待`,de:`FREUNDE EINLADEN`,fr:`INVITER DES AMIS`,it:`INVITA AMICI`,pl:`ZAPROŚ ZNAJOMYCH`},youAre:{en:`You are {n}`,tr:`Sen {n}`,pt:`Você é {n}`,vi:`Bạn là {n}`,ru:`Ты — {n}`,es:`Eres {n}`,id:`Kamu {n}`,th:`คุณคือ {n}`,ja:`あなたは {n}`,de:`Du bist {n}`,fr:`Tu es {n}`,it:`Sei {n}`,pl:`Jesteś {n}`},ctlTouch:{en:`Left thumb: move · Right: {d}`,tr:`Sol başparmak: yürü · Sağ: {d}`,pt:`Polegar esquerdo: mover · Direito: {d}`,vi:`Ngón trái: di chuyển · Phải: {d}`,ru:`Левый палец: бег · Правый: {d}`,es:`Pulgar izquierdo: mover · Derecho: {d}`,id:`Jempol kiri: gerak · Kanan: {d}`,th:`นิ้วซ้าย: เดิน · ขวา: {d}`,ja:`左の指: 移動 · 右: {d}`,de:`Linker Daumen: laufen · Rechts: {d}`,fr:`Pouce gauche : bouger · Droite : {d}`,it:`Pollice sinistro: muovi · Destra: {d}`,pl:`Lewy kciuk: ruch · Prawy: {d}`},ctlKeys:{en:`WASD / Arrows: move · Space: dash`,tr:`WASD / Oklar: yürü · Boşluk: atıl`,pt:`WASD / Setas: mover · Espaço: turbo`,vi:`WASD / Mũi tên: di chuyển · Space: lướt`,ru:`WASD / Стрелки: бег · Пробел: рывок`,es:`WASD / Flechas: mover · Espacio: turbo`,id:`WASD / Panah: gerak · Spasi: turbo`,th:`WASD / ลูกศร: เดิน · Space: พุ่ง`,ja:`WASD / 矢印: 移動 · スペース: ダッシュ`,de:`WASD / Pfeile: laufen · Leertaste: Sprint`,fr:`ZQSD / Flèches : bouger · Espace : turbo`,it:`WASD / Frecce: muovi · Spazio: turbo`,pl:`WASD / Strzałki: ruch · Spacja: zryw`},dash:{en:`DASH`,tr:`ATIL`,pt:`TURBO`,vi:`LƯỚT`,ru:`РЫВОК`,es:`TURBO`,id:`TURBO`,th:`พุ่ง`,ja:`ダッシュ`,de:`SPRINT`,fr:`TURBO`,it:`TURBO`,pl:`ZRYW`},playAgain:{en:`PLAY AGAIN`,tr:`TEKRAR OYNA`,pt:`JOGAR DE NOVO`,vi:`CHƠI LẠI`,ru:`ЕЩЁ РАЗ`,es:`JUGAR DE NUEVO`,id:`MAIN LAGI`,th:`เล่นอีกครั้ง`,ja:`もう一回`,de:`NOCHMAL`,fr:`REJOUER`,it:`RIGIOCA`,pl:`JESZCZE RAZ`},ready:{en:`READY!`,tr:`HAZIRIM!`,pt:`PRONTO!`,vi:`SẴN SÀNG!`,ru:`ГОТОВ!`,es:`¡LISTO!`,id:`SIAP!`,th:`พร้อม!`,ja:`準備OK！`,de:`BEREIT!`,fr:`PRÊT !`,it:`PRONTO!`,pl:`GOTOWY!`},invite:{en:`INVITE`,tr:`DAVET ET`,pt:`CONVIDAR`,vi:`MỜI`,ru:`ПОЗВАТЬ`,es:`INVITAR`,id:`AJAK`,th:`ชวน`,ja:`招待`,de:`EINLADEN`,fr:`INVITER`,it:`INVITA`,pl:`ZAPROŚ`},vsBots:{en:`PLAY VS BOTS`,tr:`BOTLARA KARŞI OYNA`,pt:`JOGAR CONTRA BOTS`,vi:`CHƠI VỚI MÁY`,ru:`ИГРАТЬ С БОТАМИ`,es:`JUGAR CONTRA BOTS`,id:`LAWAN BOT`,th:`เล่นกับบอท`,ja:`ボットと対戦`,de:`GEGEN BOTS`,fr:`CONTRE DES BOTS`,it:`CONTRO I BOT`,pl:`GRAJ Z BOTAMI`},roomCode:{en:`Room code`,tr:`Oda kodu`,pt:`Código da sala`,vi:`Mã phòng`,ru:`Код комнаты`,es:`Código de sala`,id:`Kode room`,th:`รหัสห้อง`,ja:`ルームコード`,de:`Raumcode`,fr:`Code du salon`,it:`Codice stanza`,pl:`Kod pokoju`},shareLink:{en:`SHARE LINK`,tr:`LİNKİ PAYLAŞ`,pt:`COMPARTILHAR`,vi:`CHIA SẺ LINK`,ru:`ПОДЕЛИТЬСЯ`,es:`COMPARTIR`,id:`BAGIKAN`,th:`แชร์ลิงก์`,ja:`リンクを共有`,de:`LINK TEILEN`,fr:`PARTAGER`,it:`CONDIVIDI`,pl:`UDOSTĘPNIJ`},ok:{en:`OK`,tr:`TAMAM`,pt:`OK`,vi:`OK`,ru:`ОК`,es:`OK`,id:`OK`,th:`ตกลง`,ja:`OK`,de:`OK`,fr:`OK`,it:`OK`,pl:`OK`},share:{en:`Share`,tr:`Paylaş`,pt:`Enviar`,vi:`Chia sẻ`,ru:`Ссылка`,es:`Enviar`,id:`Bagikan`,th:`แชร์`,ja:`共有`,de:`Teilen`,fr:`Partager`,it:`Condividi`,pl:`Wyślij`},inviteChip:{en:`Invite`,tr:`Davet et`,pt:`Convidar`,vi:`Mời`,ru:`Позвать`,es:`Invitar`,id:`Ajak`,th:`ชวน`,ja:`招待`,de:`Einladen`,fr:`Inviter`,it:`Invita`,pl:`Zaproś`},playFriend:{en:`Play with a friend`,tr:`Arkadaşınla oyna`,pt:`Jogue com amigos`,vi:`Chơi với bạn`,ru:`Играть с другом`,es:`Juega con amigos`,id:`Main bareng teman`,th:`เล่นกับเพื่อน`,ja:`友だちと遊ぶ`,de:`Mit Freunden spielen`,fr:`Jouer avec un ami`,it:`Gioca con amici`,pl:`Graj ze znajomymi`},room:{en:`Room {c}`,tr:`Oda {c}`,pt:`Sala {c}`,vi:`Phòng {c}`,ru:`Комната {c}`,es:`Sala {c}`,id:`Room {c}`,th:`ห้อง {c}`,ja:`ルーム {c}`,de:`Raum {c}`,fr:`Salon {c}`,it:`Stanza {c}`,pl:`Pokój {c}`},copied:{en:`Link copied!`,tr:`Link kopyalandı!`,pt:`Link copiado!`,vi:`Đã sao chép link!`,ru:`Ссылка скопирована!`,es:`¡Enlace copiado!`,id:`Link disalin!`,th:`คัดลอกลิงก์แล้ว!`,ja:`リンクをコピーしました！`,de:`Link kopiert!`,fr:`Lien copié !`,it:`Link copiato!`,pl:`Link skopiowany!`},joinedName:{en:`{n} joined!`,tr:`{n} katıldı!`,pt:`{n} entrou!`,vi:`{n} đã vào!`,ru:`{n} в игре!`,es:`¡{n} se unió!`,id:`{n} bergabung!`,th:`{n} เข้าร่วมแล้ว!`,ja:`{n} が参加！`,de:`{n} ist dabei!`,fr:`{n} a rejoint !`,it:`{n} è entrato!`,pl:`{n} dołącza!`},leftName:{en:`{n} left`,tr:`{n} ayrıldı`,pt:`{n} saiu`,vi:`{n} đã rời`,ru:`{n} вышел`,es:`{n} se fue`,id:`{n} keluar`,th:`{n} ออกไปแล้ว`,ja:`{n} が退出`,de:`{n} ist weg`,fr:`{n} est parti`,it:`{n} è uscito`,pl:`{n} wychodzi`},joining:{en:`Joining room {c}…`,tr:`{c} odasına giriliyor…`,pt:`Entrando na sala {c}…`,vi:`Đang vào phòng {c}…`,ru:`Вход в комнату {c}…`,es:`Entrando en la sala {c}…`,id:`Masuk room {c}…`,th:`กำลังเข้าห้อง {c}…`,ja:`ルーム {c} に参加中…`,de:`Betrete Raum {c}…`,fr:`Connexion au salon {c}…`,it:`Entro nella stanza {c}…`,pl:`Dołączanie do pokoju {c}…`},notFound:{en:`Could not find room {c}.
Ask your friend to share a new link.`,tr:`{c} odası bulunamadı.
Arkadaşından yeni bir link iste.`,pt:`Sala {c} não encontrada.
Peça um novo link ao seu amigo.`,vi:`Không tìm thấy phòng {c}.
Hãy nhờ bạn gửi link mới.`,ru:`Комната {c} не найдена.
Попроси друга прислать новую ссылку.`,es:`No se encontró la sala {c}.
Pide a tu amigo un enlace nuevo.`,id:`Room {c} tidak ditemukan.
Minta temanmu kirim link baru.`,th:`ไม่พบห้อง {c}
ขอลิงก์ใหม่จากเพื่อนของคุณ`,ja:`ルーム {c} が見つかりません。
友だちに新しいリンクをもらってね。`,de:`Raum {c} nicht gefunden.
Bitte deinen Freund um einen neuen Link.`,fr:`Salon {c} introuvable.
Demande un nouveau lien à ton ami.`,it:`Stanza {c} non trovata.
Chiedi un nuovo link al tuo amico.`,pl:`Nie znaleziono pokoju {c}.
Poproś znajomego o nowy link.`},joinedRoom:{en:`Joined room {c}!`,tr:`{c} odasına girdin!`,pt:`Você entrou na sala {c}!`,vi:`Đã vào phòng {c}!`,ru:`Ты в комнате {c}!`,es:`¡Entraste en la sala {c}!`,id:`Masuk room {c}!`,th:`เข้าห้อง {c} แล้ว!`,ja:`ルーム {c} に参加！`,de:`Du bist im Raum {c}!`,fr:`Tu es dans le salon {c} !`,it:`Sei nella stanza {c}!`,pl:`Jesteś w pokoju {c}!`},hostLeft:{en:`The host left the game.`,tr:`Oda sahibi oyundan çıktı.`,pt:`O anfitrião saiu do jogo.`,vi:`Chủ phòng đã rời trò chơi.`,ru:`Хозяин комнаты вышел.`,es:`El anfitrión salió del juego.`,id:`Host keluar dari game.`,th:`เจ้าของห้องออกจากเกมแล้ว`,ja:`ホストが退出しました。`,de:`Der Gastgeber hat das Spiel verlassen.`,fr:`L'hôte a quitté la partie.`,it:`L'host ha lasciato la partita.`,pl:`Gospodarz opuścił grę.`},roomFull:{en:`This room is full.`,tr:`Bu oda dolu.`,pt:`Esta sala está cheia.`,vi:`Phòng này đã đầy.`,ru:`Комната заполнена.`,es:`Esta sala está llena.`,id:`Room ini sudah penuh.`,th:`ห้องนี้เต็มแล้ว`,ja:`このルームは満員です。`,de:`Dieser Raum ist voll.`,fr:`Ce salon est plein.`,it:`Questa stanza è piena.`,pl:`Ten pokój jest pełny.`},finding:{en:`Finding players…`,tr:`Oyuncu aranıyor…`,pt:`Procurando jogadores…`,vi:`Đang tìm người chơi…`,ru:`Ищем игроков…`,es:`Buscando jugadores…`,id:`Mencari pemain…`,th:`กำลังหาผู้เล่น…`,ja:`プレイヤーを探しています…`,de:`Suche Mitspieler…`,fr:`Recherche de joueurs…`,it:`Cerco giocatori…`,pl:`Szukamy graczy…`},hostLeftNew:{en:`The host left. New match!`,tr:`Oda sahibi çıktı. Yeni maç!`,pt:`O anfitrião saiu. Nova partida!`,vi:`Chủ phòng đã rời. Trận mới!`,ru:`Хозяин вышел. Новый матч!`,es:`El anfitrión salió. ¡Nueva partida!`,id:`Host keluar. Pertandingan baru!`,th:`เจ้าของห้องออกแล้ว เริ่มเกมใหม่!`,ja:`ホストが退出。新しい試合へ！`,de:`Der Gastgeber ist weg. Neues Spiel!`,fr:`L'hôte est parti. Nouvelle partie !`,it:`L'host è uscito. Nuova partita!`,pl:`Gospodarz wyszedł. Nowy mecz!`},onlineN:{en:`{n} online`,tr:`{n} çevrimiçi`,pt:`{n} online`,vi:`{n} trực tuyến`,ru:`{n} в сети`,es:`{n} en línea`,id:`{n} online`,th:`ออนไลน์ {n}`,ja:`オンライン {n}人`,de:`{n} online`,fr:`{n} en ligne`,it:`{n} online`,pl:`{n} online`},inRoomN:{en:`{n} in your room`,tr:`odanda {n}`,pt:`{n} na sua sala`,vi:`{n} trong phòng`,ru:`{n} в комнате`,es:`{n} en tu sala`,id:`{n} di room-mu`,th:`ในห้อง {n}`,ja:`ルームに {n}人`,de:`{n} im Raum`,fr:`{n} dans ton salon`,it:`{n} nella stanza`,pl:`{n} w pokoju`},itsYou:{en:`YOU'RE IT!`,tr:`SENDE!`,pt:`É VOCÊ!`,vi:`ĐẾN BẠN!`,ru:`ТЫ ВОДИШЬ!`,es:`¡TE TOCA!`,id:`KAMU KENA!`,th:`โดนแล้ว!`,ja:`キミの番！`,de:`DU BIST DRAN!`,fr:`C'EST TOI !`,it:`CE L'HAI TU!`,pl:`MASZ JĄ!`},tag:{en:`TAG!`,tr:`PAS!`,pt:`PEGOU!`,vi:`CHẠM!`,ru:`ПАС!`,es:`¡PILLADO!`,id:`KENA!`,th:`แตะ!`,ja:`タッチ！`,de:`ERWISCHT!`,fr:`TOUCHÉ !`,it:`PRESO!`,pl:`BEREK!`},whack:{en:`WHACK!`,tr:`ŞAK!`,pt:`PÁ!`,vi:`BỐP!`,ru:`БАЦ!`,es:`¡ZAS!`,id:`BUK!`,th:`ปั้ก!`,ja:`バシッ！`,de:`ZACK!`,fr:`PAF !`,it:`PAF!`,pl:`ŁUP!`},boing:{en:`BOING`,tr:`BOING`,pt:`BOING`,vi:`BOING`,ru:`БОЙНГ`,es:`BOING`,id:`BOING`,th:`ดึ๋ง`,ja:`ボヨン`,de:`BOING`,fr:`BOING`,it:`BOING`,pl:`BOING`},oof:{en:`OOF!`,tr:`OF!`,pt:`UF!`,vi:`ÁI!`,ru:`УФ!`,es:`¡UF!`,id:`ADUH!`,th:`อุ๊ย!`,ja:`うっ！`,de:`UFF!`,fr:`OUF !`,it:`UFF!`,pl:`UFF!`},boom:{en:`BOOM!`,tr:`BUM!`,pt:`BUM!`,vi:`BÙM!`,ru:`БУМ!`,es:`¡BUM!`,id:`DUAR!`,th:`ตูม!`,ja:`ドカーン！`,de:`BUMM!`,fr:`BOUM !`,it:`BUM!`,pl:`BUM!`},youWin:{en:`YOU WIN!`,tr:`KAZANDIN!`,pt:`VOCÊ VENCEU!`,vi:`BẠN THẮNG!`,ru:`ПОБЕДА!`,es:`¡GANASTE!`,id:`KAMU MENANG!`,th:`คุณชนะ!`,ja:`キミの勝ち！`,de:`GEWONNEN!`,fr:`GAGNÉ !`,it:`HAI VINTO!`,pl:`WYGRANA!`},wins:{en:`{n} WINS!`,tr:`{n} KAZANDI!`,pt:`{n} VENCEU!`,vi:`{n} THẮNG!`,ru:`{n} ПОБЕДИЛ!`,es:`¡{n} GANA!`,id:`{n} MENANG!`,th:`{n} ชนะ!`,ja:`{n} の勝ち！`,de:`{n} GEWINNT!`,fr:`{n} GAGNE !`,it:`{n} VINCE!`,pl:`{n} WYGRYWA!`},youParen:{en:`(you)`,tr:`(sen)`,pt:`(você)`,vi:`(bạn)`,ru:`(ты)`,es:`(tú)`,id:`(kamu)`,th:`(คุณ)`,ja:`(あなた)`,de:`(du)`,fr:`(toi)`,it:`(tu)`,pl:`(ty)`},leftN:{en:`{n} LEFT`,tr:`{n} KALDI`,pt:`RESTAM {n}`,vi:`CÒN {n}`,ru:`ОСТАЛОСЬ {n}`,es:`QUEDAN {n}`,id:`SISA {n}`,th:`เหลือ {n}`,ja:`残り {n}`,de:`NOCH {n}`,fr:`EN JEU : {n}`,it:`IN GIOCO: {n}`,pl:`ZOSTAŁO {n}`},haveBomb:{en:`YOU HAVE THE BOMB! TAG SOMEONE!`,tr:`BOMBA SENDE! BİRİNE DOKUN!`,pt:`A BOMBA É SUA! PASSE ADIANTE!`,vi:`BẠN CẦM BOM! CHẠM AI ĐÓ ĐI!`,ru:`БОМБА У ТЕБЯ! ПЕРЕДАЙ ЕЁ!`,es:`¡TIENES LA BOMBA! ¡PÁSALA!`,id:`BOM DI KAMU! OPER KE TEMAN!`,th:`ระเบิดอยู่ที่คุณ! ส่งต่อเร็ว!`,ja:`爆弾を持ってる！誰かにタッチ！`,de:`DU HAST DIE BOMBE! GIB SIE WEITER!`,fr:`TU AS LA BOMBE ! TOUCHE UN AMI !`,it:`HAI LA BOMBA! PASSALA!`,pl:`MASZ BOMBĘ! PRZEKAŻ JĄ!`},ghost:{en:`You're a ghost now. Haunt them!`,tr:`Artık bir hayaletsin. Onları korkut!`,pt:`Agora você é um fantasma. Assombre todos!`,vi:`Giờ bạn là hồn ma. Dọa họ đi!`,ru:`Теперь ты призрак. Пугай их!`,es:`Ahora eres un fantasma. ¡Asústalos!`,id:`Sekarang kamu hantu. Hantui mereka!`,th:`ตอนนี้คุณเป็นผีแล้ว ไปหลอกพวกเขา!`,ja:`いまはオバケ。みんなを驚かそう！`,de:`Du bist jetzt ein Geist. Spuk herum!`,fr:`Tu es un fantôme. Hante-les !`,it:`Ora sei un fantasma. Perseguitali!`,pl:`Jesteś teraz duchem. Strasz ich!`},direct:{en:`direct`,tr:`doğrudan`,pt:`direto`,vi:`trực tiếp`,ru:`напрямую`,es:`directo`,id:`langsung`,th:`ตรง`,ja:`直接`,de:`direkt`,fr:`direct`,it:`diretto`,pl:`bezpośrednio`},server:{en:`server`,tr:`sunucu`,pt:`servidor`,vi:`máy chủ`,ru:`сервер`,es:`servidor`,id:`server`,th:`เซิร์ฟเวอร์`,ja:`サーバー`,de:`Server`,fr:`serveur`,it:`server`,pl:`serwer`},waiting:{en:`waiting for friends…`,tr:`arkadaşlar bekleniyor…`,pt:`esperando amigos…`,vi:`đang chờ bạn bè…`,ru:`ждём друзей…`,es:`esperando amigos…`,id:`menunggu teman…`,th:`รอเพื่อน…`,ja:`友だちを待っています…`,de:`warte auf Freunde…`,fr:`en attente d'amis…`,it:`in attesa di amici…`,pl:`czekamy na znajomych…`},youTag:{en:`YOU`,tr:`SEN`,pt:`VOCÊ`,vi:`BẠN`,ru:`ТЫ`,es:`TÚ`,id:`KAMU`,th:`คุณ`,ja:`あなた`,de:`DU`,fr:`TOI`,it:`TU`,pl:`TY`},nextRound:{en:`Next round in {n}`,tr:`Yeni tur: {n}`,pt:`Próxima rodada em {n}`,vi:`Ván mới sau {n}`,ru:`Новый раунд через {n}`,es:`Siguiente ronda en {n}`,id:`Ronde berikut dalam {n}`,th:`รอบต่อไปใน {n}`,ja:`次のラウンドまで {n}`,de:`Nächste Runde in {n}`,fr:`Manche suivante dans {n}`,it:`Prossimo round tra {n}`,pl:`Następna runda za {n}`},spectate:{en:`You'll play next round`,tr:`Sonraki turda oynayacaksın`,pt:`Você joga na próxima rodada`,vi:`Bạn sẽ chơi ở ván sau`,ru:`Ты сыграешь в следующем раунде`,es:`Juegas en la siguiente ronda`,id:`Kamu main di ronde berikutnya`,th:`คุณจะได้เล่นรอบหน้า`,ja:`次のラウンドから参加`,de:`Du spielst nächste Runde mit`,fr:`Tu joues à la prochaine manche`,it:`Giochi dal prossimo round`,pl:`Zagrasz w następnej rundzie`},shareText:{en:`Join my Hot Bomb room {c}!`,tr:`Hot Bomb odama gel: {c}!`,pt:`Entre na minha sala de Hot Bomb {c}!`,vi:`Vào phòng Hot Bomb {c} của mình nhé!`,ru:`Заходи в мою комнату Hot Bomb {c}!`,es:`¡Únete a mi sala de Hot Bomb {c}!`,id:`Gabung ke room Hot Bomb-ku {c}!`,th:`มาห้อง Hot Bomb ของฉัน {c}!`,ja:`Hot Bomb のルーム {c} に来てね！`,de:`Komm in meinen Hot-Bomb-Raum {c}!`,fr:`Rejoins mon salon Hot Bomb {c} !`,it:`Entra nella mia stanza di Hot Bomb {c}!`,pl:`Dołącz do mojego pokoju Hot Bomb {c}!`},locker:{en:`LOCKER`,tr:`DOLAP`,pt:`ARMÁRIO`,vi:`TỦ ĐỒ`,ru:`ШКАФЧИК`,es:`TAQUILLA`,id:`LOKER`,th:`ตู้ของ`,ja:`ロッカー`,de:`SPIND`,fr:`CASIER`,it:`ARMADIETTO`,pl:`SZAFKA`},tabChar:{en:`Brawlers`,tr:`Karakterler`,pt:`Personagens`,vi:`Nhân vật`,ru:`Герои`,es:`Personajes`,id:`Karakter`,th:`ตัวละคร`,ja:`キャラ`,de:`Figuren`,fr:`Persos`,it:`Personaggi`,pl:`Postacie`},tabHat:{en:`Hats`,tr:`Şapkalar`,pt:`Chapéus`,vi:`Mũ`,ru:`Шапки`,es:`Gorros`,id:`Topi`,th:`หมวก`,ja:`ぼうし`,de:`Hüte`,fr:`Chapeaux`,it:`Cappelli`,pl:`Czapki`},tabBomb:{en:`Bombs`,tr:`Bombalar`,pt:`Bombas`,vi:`Bom`,ru:`Бомбы`,es:`Bombas`,id:`Bom`,th:`ระเบิด`,ja:`爆弾`,de:`Bomben`,fr:`Bombes`,it:`Bombe`,pl:`Bomby`},tabTrail:{en:`Trails`,tr:`İzler`,pt:`Rastros`,vi:`Vệt sáng`,ru:`Следы`,es:`Estelas`,id:`Jejak`,th:`ร่องรอย`,ja:`トレイル`,de:`Spuren`,fr:`Traînées`,it:`Scie`,pl:`Smugi`},tabDance:{en:`Dances`,tr:`Danslar`,pt:`Danças`,vi:`Điệu nhảy`,ru:`Танцы`,es:`Bailes`,id:`Tarian`,th:`ท่าเต้น`,ja:`ダンス`,de:`Tänze`,fr:`Danses`,it:`Balli`,pl:`Tańce`},buy:{en:`BUY`,tr:`AL`,pt:`COMPRAR`,vi:`MUA`,ru:`КУПИТЬ`,es:`COMPRAR`,id:`BELI`,th:`ซื้อ`,ja:`買う`,de:`KAUFEN`,fr:`ACHETER`,it:`COMPRA`,pl:`KUP`},equip:{en:`EQUIP`,tr:`GİY`,pt:`USAR`,vi:`TRANG BỊ`,ru:`НАДЕТЬ`,es:`EQUIPAR`,id:`PAKAI`,th:`สวมใส่`,ja:`装備する`,de:`ANLEGEN`,fr:`ÉQUIPER`,it:`INDOSSA`,pl:`ZAŁÓŻ`},pick:{en:`PICK`,tr:`SEÇ`,pt:`ESCOLHER`,vi:`CHỌN`,ru:`ВЫБРАТЬ`,es:`ELEGIR`,id:`PILIH`,th:`เลือก`,ja:`選ぶ`,de:`WÄHLEN`,fr:`CHOISIR`,it:`SCEGLI`,pl:`WYBIERZ`},takeOff:{en:`TAKE OFF`,tr:`ÇIKAR`,pt:`TIRAR`,vi:`THÁO RA`,ru:`СНЯТЬ`,es:`QUITAR`,id:`LEPAS`,th:`ถอด`,ja:`はずす`,de:`ABLEGEN`,fr:`RETIRER`,it:`TOGLI`,pl:`ZDEJMIJ`},chosen:{en:`SELECTED`,tr:`SEÇİLDİ`,pt:`SELECIONADO`,vi:`ĐÃ CHỌN`,ru:`ВЫБРАН`,es:`ELEGIDO`,id:`DIPILIH`,th:`เลือกแล้ว`,ja:`選択中`,de:`GEWÄHLT`,fr:`CHOISI`,it:`SCELTO`,pl:`WYBRANO`},reachLevel:{en:`Reach level {n}`,tr:`Seviye {n} ol`,pt:`Alcance o nível {n}`,vi:`Đạt cấp {n}`,ru:`Достигни уровня {n}`,es:`Llega al nivel {n}`,id:`Capai level {n}`,th:`ถึงเลเวล {n}`,ja:`レベル{n}で解放`,de:`Erreiche Level {n}`,fr:`Atteins le niveau {n}`,it:`Raggiungi il livello {n}`,pl:`Osiągnij poziom {n}`},lvl:{en:`Lv {n}`,tr:`Sv {n}`,pt:`Nv {n}`,vi:`Cấp {n}`,ru:`Ур. {n}`,es:`Nv {n}`,id:`Lv {n}`,th:`Lv {n}`,ja:`Lv{n}`,de:`Lv {n}`,fr:`Niv {n}`,it:`Lv {n}`,pl:`Poz. {n}`},dailyOnly:{en:`Day 7 reward`,tr:`Gün 7 ödülü`,pt:`Prêmio do dia 7`,vi:`Quà ngày 7`,ru:`Награда 7-го дня`,es:`Premio del día 7`,id:`Hadiah hari ke-7`,th:`รางวัลวันที่ 7`,ja:`7日目のごほうび`,de:`Belohnung Tag 7`,fr:`Cadeau du jour 7`,it:`Premio del giorno 7`,pl:`Nagroda dnia 7`},needMore:{en:`Need {n} more coins`,tr:`{n} jeton daha gerek`,pt:`Faltam {n} moedas`,vi:`Cần thêm {n} xu`,ru:`Нужно ещё {n} монет`,es:`Faltan {n} monedas`,id:`Butuh {n} koin lagi`,th:`ต้องการอีก {n} เหรียญ`,ja:`コインがあと{n}枚必要`,de:`Noch {n} Münzen nötig`,fr:`Encore {n} pièces`,it:`Servono altre {n} monete`,pl:`Brakuje {n} monet`},back:{en:`BACK`,tr:`GERİ`,pt:`VOLTAR`,vi:`QUAY LẠI`,ru:`НАЗАД`,es:`VOLVER`,id:`KEMBALI`,th:`กลับ`,ja:`もどる`,de:`ZURÜCK`,fr:`RETOUR`,it:`INDIETRO`,pl:`WRÓĆ`},placeN:{en:`Place #{n}`,tr:`{n}. sıra`,pt:`{n}º lugar`,vi:`Hạng {n}`,ru:`{n}-е место`,es:`Puesto {n}`,id:`Peringkat {n}`,th:`อันดับ {n}`,ja:`{n}位`,de:`Platz {n}`,fr:`Rang {n}`,it:`{n}° posto`,pl:`Miejsce {n}`},passesN:{en:`Passes ×{n}`,tr:`Pas ×{n}`,pt:`Passes ×{n}`,vi:`Chuyền ×{n}`,ru:`Пасы ×{n}`,es:`Pases ×{n}`,id:`Oper ×{n}`,th:`ส่งต่อ ×{n}`,ja:`パス ×{n}`,de:`Pässe ×{n}`,fr:`Passes ×{n}`,it:`Passaggi ×{n}`,pl:`Podania ×{n}`},closeN:{en:`Close calls ×{n}`,tr:`Kıl payı ×{n}`,pt:`Por um triz ×{n}`,vi:`Suýt trúng ×{n}`,ru:`На волоске ×{n}`,es:`Por los pelos ×{n}`,id:`Nyaris ×{n}`,th:`เฉียดฉิว ×{n}`,ja:`ギリギリ ×{n}`,de:`Knapp ×{n}`,fr:`De justesse ×{n}`,it:`Per un pelo ×{n}`,pl:`O włos ×{n}`},shovesN:{en:`Shoves ×{n}`,tr:`İtiş ×{n}`,pt:`Empurrões ×{n}`,vi:`Húc ×{n}`,ru:`Толчки ×{n}`,es:`Empujones ×{n}`,id:`Dorongan ×{n}`,th:`ชน ×{n}`,ja:`タックル ×{n}`,de:`Schubser ×{n}`,fr:`Bousculades ×{n}`,it:`Spintoni ×{n}`,pl:`Pchnięcia ×{n}`},x2:{en:`x2 COINS`,tr:`x2 JETON`,pt:`x2 MOEDAS`,vi:`x2 XU`,ru:`x2 МОНЕТЫ`,es:`x2 MONEDAS`,id:`x2 KOIN`,th:`เหรียญ x2`,ja:`コイン2倍`,de:`x2 MÜNZEN`,fr:`x2 PIÈCES`,it:`x2 MONETE`,pl:`x2 MONETY`},levelUp:{en:`LEVEL UP!`,tr:`SEVİYE ATLADIN!`,pt:`SUBIU DE NÍVEL!`,vi:`LÊN CẤP!`,ru:`НОВЫЙ УРОВЕНЬ!`,es:`¡SUBES DE NIVEL!`,id:`NAIK LEVEL!`,th:`เลเวลอัป!`,ja:`レベルアップ！`,de:`LEVEL UP!`,fr:`NIVEAU SUPÉRIEUR !`,it:`LIVELLO SU!`,pl:`NOWY POZIOM!`},unlocked:{en:`Unlocked!`,tr:`Açıldı!`,pt:`Desbloqueado!`,vi:`Đã mở khóa!`,ru:`Открыто!`,es:`¡Desbloqueado!`,id:`Terbuka!`,th:`ปลดล็อกแล้ว!`,ja:`解放！`,de:`Freigeschaltet!`,fr:`Débloqué !`,it:`Sbloccato!`,pl:`Odblokowano!`},dailyTitle:{en:`DAILY REWARD`,tr:`GÜNLÜK ÖDÜL`,pt:`PRÊMIO DIÁRIO`,vi:`QUÀ HẰNG NGÀY`,ru:`НАГРАДА ДНЯ`,es:`PREMIO DIARIO`,id:`HADIAH HARIAN`,th:`รางวัลประจำวัน`,ja:`デイリーボーナス`,de:`TAGESBELOHNUNG`,fr:`CADEAU DU JOUR`,it:`PREMIO DEL GIORNO`,pl:`NAGRODA DNIA`},dayN:{en:`Day {n}`,tr:`Gün {n}`,pt:`Dia {n}`,vi:`Ngày {n}`,ru:`День {n}`,es:`Día {n}`,id:`Hari {n}`,th:`วันที่ {n}`,ja:`{n}日目`,de:`Tag {n}`,fr:`Jour {n}`,it:`Giorno {n}`,pl:`Dzień {n}`},claim:{en:`CLAIM`,tr:`AL`,pt:`PEGAR`,vi:`NHẬN`,ru:`ЗАБРАТЬ`,es:`RECOGER`,id:`AMBIL`,th:`รับ`,ja:`受け取る`,de:`ABHOLEN`,fr:`RÉCUPÉRER`,it:`RISCATTA`,pl:`ODBIERZ`},comeBack:{en:`Come back tomorrow for day {n}!`,tr:`Yarın gel, {n}. gün seni bekliyor!`,pt:`Volte amanhã para o dia {n}!`,vi:`Mai quay lại nhận quà ngày {n}!`,ru:`Возвращайся завтра за днём {n}!`,es:`¡Vuelve mañana por el día {n}!`,id:`Kembali besok untuk hari ke-{n}!`,th:`กลับมาพรุ่งนี้รับวันที่ {n}!`,ja:`明日また来てね（{n}日目）！`,de:`Komm morgen für Tag {n} wieder!`,fr:`Reviens demain pour le jour {n} !`,it:`Torna domani per il giorno {n}!`,pl:`Wróć jutro po dzień {n}!`},dailyNote:{en:`Miss a day: back to day 1. You keep your items.`,tr:`Bir gün kaçırırsan 1. güne dönersin. Eşyaların kalır.`,pt:`Perdeu um dia? Volta ao dia 1. Seus itens ficam.`,vi:`Lỡ một ngày: về lại ngày 1. Đồ vẫn giữ nguyên.`,ru:`Пропустишь день — снова день 1. Вещи останутся.`,es:`Si faltas un día, vuelves al día 1. Tus objetos se quedan.`,id:`Lewat sehari: kembali ke hari 1. Barangmu tetap.`,th:`ขาดหนึ่งวันจะเริ่มวันที่ 1 ใหม่ ของยังอยู่ครบ`,ja:`1日休むと1日目から。アイテムはそのまま。`,de:`Einen Tag verpasst: zurück zu Tag 1. Deine Sachen bleiben.`,fr:`Un jour manqué : retour au jour 1. Tu gardes tes objets.`,it:`Salti un giorno: si riparte dal giorno 1. Gli oggetti restano.`,pl:`Opuścisz dzień: wracasz do dnia 1. Przedmioty zostają.`},fell:{en:`FELL!`,tr:`DÜŞTÜ!`,pt:`CAIU!`,vi:`RƠI!`,ru:`УПАЛ!`,es:`¡CAYÓ!`,id:`JATUH!`,th:`ตก!`,ja:`落ちた！`,de:`RUNTER!`,fr:`TOMBÉ !`,it:`CADUTO!`,pl:`SPADŁ!`},flat:{en:`FLAT!`,tr:`EZİLDİ!`,pt:`ESMAGADO!`,vi:`BẸP!`,ru:`В ЛЕПЁШКУ!`,es:`¡APLASTADO!`,id:`GEPENG!`,th:`แบน!`,ja:`ぺちゃんこ！`,de:`PLATT!`,fr:`ÉCRASÉ !`,it:`SCHIACCIATO!`,pl:`ZGNIECIONY!`},whee:{en:`WHEE!`,tr:`VIIIN!`,pt:`UHUU!`,vi:`VÚT!`,ru:`УИИИ!`,es:`¡YUJU!`,id:`WUSS!`,th:`ฟิ้ว!`,ja:`ヒャッホー！`,de:`JUHU!`,fr:`YOUPI !`,it:`WII!`,pl:`JUHUU!`},splash:{en:`SPLASH!`,tr:`ŞLAP!`,pt:`SPLASH!`,vi:`ÙM!`,ru:`ПЛЮХ!`,es:`¡CHAPUZÓN!`,id:`BYUR!`,th:`ซ่า!`,ja:`バシャー！`,de:`PLATSCH!`,fr:`PLOUF !`,it:`SPLASH!`,pl:`PLUSK!`},ar0:{en:`ROOFTOP`,tr:`ÇATI KATI`,pt:`TERRAÇO`,vi:`SÂN THƯỢNG`,ru:`КРЫША`,es:`AZOTEA`,id:`ATAP GEDUNG`,th:`ดาดฟ้า`,ja:`屋上`,de:`DACHTERRASSE`,fr:`TOIT-TERRASSE`,it:`TERRAZZA`,pl:`DACH`},ar1:{en:`FROZEN RINK`,tr:`BUZ PİSTİ`,pt:`RINQUE DE GELO`,vi:`SÂN BĂNG`,ru:`КАТОК`,es:`PISTA DE HIELO`,id:`ARENA ES`,th:`ลานน้ำแข็ง`,ja:`アイスリンク`,de:`EISBAHN`,fr:`PATINOIRE`,it:`PISTA DI GHIACCIO`,pl:`LODOWISKO`},ar2:{en:`POOL PARTY`,tr:`HAVUZ PARTİSİ`,pt:`FESTA NA PISCINA`,vi:`TIỆC HỒ BƠI`,ru:`ПАТИ У БАССЕЙНА`,es:`FIESTA EN LA PISCINA`,id:`PESTA KOLAM`,th:`ปาร์ตี้สระน้ำ`,ja:`プールパーティー`,de:`POOLPARTY`,fr:`FÊTE À LA PISCINE`,it:`FESTA IN PISCINA`,pl:`IMPREZA NA BASENIE`},ar3:{en:`CONVEYOR FACTORY`,tr:`BANT FABRİKASI`,pt:`FÁBRICA DE ESTEIRAS`,vi:`NHÀ MÁY BĂNG CHUYỀN`,ru:`ФАБРИКА КОНВЕЙЕРОВ`,es:`FÁBRICA DE CINTAS`,id:`PABRIK KONVEYOR`,th:`โรงงานสายพาน`,ja:`ベルトコンベア工場`,de:`FLIESSBANDFABRIK`,fr:`USINE À TAPIS`,it:`FABBRICA DEI NASTRI`,pl:`FABRYKA TAŚM`},ah0:{en:`Dodge the spinning arm!`,tr:`Dönen koldan kaç!`,pt:`Desvie do braço giratório!`,vi:`Né cánh tay xoay!`,ru:`Уворачивайся от вертушки!`,es:`¡Esquiva el brazo giratorio!`,id:`Hindari lengan berputar!`,th:`หลบแขนหมุน!`,ja:`回るアームをよけろ！`,de:`Weich dem Drehbalken aus!`,fr:`Évite le bras qui tourne !`,it:`Schiva il braccio rotante!`,pl:`Unikaj obracającego się ramienia!`},ah1:{en:`Slippery ice! Dodge the ice machine.`,tr:`Buz kaygan! Buz makinesinden kaç.`,pt:`Gelo escorregadio! Desvie da máquina.`,vi:`Băng trơn! Né xe dọn băng.`,ru:`Скользко! Берегись ледовой машины.`,es:`¡Hielo resbaladizo! Esquiva la máquina.`,id:`Es licin! Hindari mesin es.`,th:`น้ำแข็งลื่น! หลบรถเกลี่ยน้ำแข็ง`,ja:`ツルツル氷！整氷車をよけろ。`,de:`Glattes Eis! Weich der Eismaschine aus.`,fr:`Glace glissante ! Évite la surfaceuse.`,it:`Ghiaccio scivoloso! Evita la macchina.`,pl:`Ślisko! Uważaj na rolbę.`},ah2:{en:`Ride the slides. Watch the geysers!`,tr:`Kaydıraklara bin. Fıskiyelere dikkat!`,pt:`Use os escorregas. Cuidado com os gêiseres!`,vi:`Đi cầu trượt. Coi chừng vòi phun!`,ru:`Катись с горок. Берегись фонтанов!`,es:`Usa los toboganes. ¡Ojo con los géiseres!`,id:`Naik perosotan. Awas semburan air!`,th:`เล่นสไลเดอร์ ระวังน้ำพุ!`,ja:`すべり台に乗ろう。噴水に注意！`,de:`Rutsch los! Achte auf die Fontänen!`,fr:`Prends les toboggans. Gare aux geysers !`,it:`Usa gli scivoli. Occhio ai geyser!`,pl:`Zjeżdżaj! Uważaj na gejzery!`},ah3:{en:`Belts carry you. Don't get pressed!`,tr:`Bantlar seni taşır. Prese yakalanma!`,pt:`As esteiras te levam. Cuidado com a prensa!`,vi:`Băng chuyền kéo bạn. Coi chừng máy ép!`,ru:`Ленты тащат тебя. Не попади под пресс!`,es:`Las cintas te llevan. ¡Ojo con la prensa!`,id:`Ban berjalan membawamu. Awas mesin pres!`,th:`สายพานพาคุณไป ระวังเครื่องอัด!`,ja:`ベルトで流されるぞ。プレスに注意！`,de:`Bänder tragen dich. Vorsicht, Presse!`,fr:`Les tapis t’emportent. Gare à la presse !`,it:`I nastri ti trascinano. Occhio alla pressa!`,pl:`Taśmy cię niosą. Uważaj na prasę!`},partyRule:{en:`PARTY RULE!`,tr:`PARTİ KURALI!`,pt:`REGRA DA FESTA!`,vi:`LUẬT TIỆC!`,ru:`ПРАВИЛО ВЕЧЕРИНКИ!`,es:`¡REGLA DE FIESTA!`,id:`ATURAN PESTA!`,th:`กฎปาร์ตี้!`,ja:`パーティールール！`,de:`PARTY-REGEL!`,fr:`RÈGLE DE FÊTE !`,it:`REGOLA PARTY!`,pl:`ZASADA IMPREZY!`},tw1:{en:`DOUBLE BOMB`,tr:`ÇİFT BOMBA`,pt:`BOMBA DUPLA`,vi:`BOM ĐÔI`,ru:`ДВЕ БОМБЫ`,es:`BOMBA DOBLE`,id:`BOM GANDA`,th:`ระเบิดคู่`,ja:`ダブル爆弾`,de:`DOPPELBOMBE`,fr:`DOUBLE BOMBE`,it:`BOMBA DOPPIA`,pl:`PODWÓJNA BOMBA`},tw2:{en:`SPEED FUSE`,tr:`KISA FİTİL`,pt:`PAVIO RÁPIDO`,vi:`NGÒI NHANH`,ru:`БЫСТРЫЙ ФИТИЛЬ`,es:`MECHA RÁPIDA`,id:`SUMBU CEPAT`,th:`ชนวนสั้น`,ja:`スピード導火線`,de:`SCHNELLE LUNTE`,fr:`MÈCHE RAPIDE`,it:`MICCIA RAPIDA`,pl:`SZYBKI LONT`},tw3:{en:`SHRINKING FLOOR`,tr:`KÜÇÜLEN ZEMİN`,pt:`CHÃO ENCOLHENDO`,vi:`SÀN THU NHỎ`,ru:`ПОЛ ИСЧЕЗАЕТ`,es:`SUELO MENGUANTE`,id:`LANTAI MENYUSUT`,th:`พื้นหดตัว`,ja:`床がくずれる`,de:`SCHRUMPFBODEN`,fr:`SOL QUI RÉTRÉCIT`,it:`PAVIMENTO CHE CROLLA`,pl:`ZNIKAJĄCA PODŁOGA`},tw4:{en:`GIANT MODE`,tr:`DEV MODU`,pt:`MODO GIGANTE`,vi:`CHẾ ĐỘ KHỔNG LỒ`,ru:`РЕЖИМ ВЕЛИКАНОВ`,es:`MODO GIGANTE`,id:`MODE RAKSASA`,th:`โหมดยักษ์`,ja:`巨人モード`,de:`RIESENMODUS`,fr:`MODE GÉANT`,it:`MODALITÀ GIGANTE`,pl:`TRYB OLBRZYMA`},tw5:{en:`LOW GRAVITY`,tr:`DÜŞÜK YERÇEKİMİ`,pt:`GRAVIDADE BAIXA`,vi:`TRỌNG LỰC THẤP`,ru:`НИЗКАЯ ГРАВИТАЦИЯ`,es:`BAJA GRAVEDAD`,id:`GRAVITASI RENDAH`,th:`แรงโน้มถ่วงต่ำ`,ja:`低重力`,de:`SCHWERELOS`,fr:`GRAVITÉ RÉDUITE`,it:`GRAVITÀ RIDOTTA`,pl:`NISKA GRAWITACJA`},th1:{en:`Two bombs at once!`,tr:`Aynı anda iki bomba!`,pt:`Duas bombas ao mesmo tempo!`,vi:`Hai quả bom cùng lúc!`,ru:`Сразу две бомбы!`,es:`¡Dos bombas a la vez!`,id:`Dua bom sekaligus!`,th:`ระเบิดสองลูกพร้อมกัน!`,ja:`爆弾が2つ同時に！`,de:`Zwei Bomben auf einmal!`,fr:`Deux bombes à la fois !`,it:`Due bombe insieme!`,pl:`Dwie bomby naraz!`},th2:{en:`Short fuses. Pass it fast!`,tr:`Fitiller kısa. Hızlı pasla!`,pt:`Pavios curtos. Passe rápido!`,vi:`Ngòi ngắn. Chuyền thật nhanh!`,ru:`Короткий фитиль. Передавай быстрее!`,es:`Mechas cortas. ¡Pasa rápido!`,id:`Sumbu pendek. Oper cepat!`,th:`ชนวนสั้น ส่งให้ไว!`,ja:`導火線が短い。すぐパス！`,de:`Kurze Lunten. Schnell weitergeben!`,fr:`Mèches courtes. Passe vite !`,it:`Micce corte. Passa in fretta!`,pl:`Krótkie lonty. Podawaj szybko!`},th3:{en:`The edge falls away. Don't fall!`,tr:`Kenarlar çöküyor. Düşme!`,pt:`As bordas caem. Não caia!`,vi:`Mép sàn rơi xuống. Đừng ngã!`,ru:`Края рушатся. Не упади!`,es:`El borde se cae. ¡No te caigas!`,id:`Tepinya runtuh. Jangan jatuh!`,th:`ขอบพื้นถล่ม อย่าตก!`,ja:`端がくずれる。落ちるな！`,de:`Der Rand bricht weg. Nicht fallen!`,fr:`Les bords s’effondrent. Ne tombe pas !`,it:`I bordi crollano. Non cadere!`,pl:`Brzegi się zapadają. Nie spadnij!`},th4:{en:`Everyone is huge and slow!`,tr:`Herkes kocaman ve yavaş!`,pt:`Todos enormes e lentos!`,vi:`Ai cũng to và chậm!`,ru:`Все огромные и медленные!`,es:`¡Todos enormes y lentos!`,id:`Semua besar dan lambat!`,th:`ทุกคนตัวใหญ่และช้า!`,ja:`みんな巨大でノロノロ！`,de:`Alle riesig und langsam!`,fr:`Tout le monde est énorme et lent !`,it:`Tutti enormi e lenti!`,pl:`Wszyscy wielcy i powolni!`},th5:{en:`Floaty dashes, big bounces!`,tr:`Süzülen atılışlar, büyük sekmeler!`,pt:`Turbos flutuantes, quiques enormes!`,vi:`Lướt bay bổng, nảy thật xa!`,ru:`Парящие рывки, большие отскоки!`,es:`¡Turbos flotantes, rebotes enormes!`,id:`Turbo melayang, pantulan besar!`,th:`พุ่งลอยตัว เด้งไกล!`,ja:`ふわふわダッシュ、大きく跳ねる！`,de:`Schwebende Sprints, große Sprünge!`,fr:`Turbos flottants, gros rebonds !`,it:`Turbo fluttuanti, rimbalzi enormi!`,pl:`Lekkie zrywy, wielkie odbicia!`}},be=`en`;function xe(e){if(!e)return null;let t=e.toLowerCase().replace(`_`,`-`).split(`-`)[0];return t===`ms`||t===`in`?`id`:t===`be`||t===`kk`||t===`uk`||t===`uz`?`ru`:ve.includes(t)?t:null}function Se(e){let t=xe(new URLSearchParams(location.search).get(`lang`));if(t)return t;let n=xe(e);if(n)return n;for(let e of navigator.languages||[navigator.language]){let t=xe(e);if(t)return t}return`en`}function Ce(e){be=e,document.documentElement.lang=e}function A(e,t={}){let n=ye[e],r=n[be]||n.en;for(let[e,n]of Object.entries(t))r=r.split(`{`+e+`}`).join(String(n));return r}var we={url:`https://xfxkunjnmsgzfeltfpsf.supabase.co`,key:`sb_publishable_WmrYC7Xj9kZc-iMGlSDTlw_DZN9NDzW`},Te=8e3,Ee=e=>`realtime:hot-bomb-lobby-p2-`+e,j=()=>we.url.replace(/^http/,`ws`).replace(/\/+$/,``)+`/realtime/v1/websocket?apikey=`+encodeURIComponent(we.key)+`&vsn=1.0.0`,De=2e3,Oe=6500,ke=120,M=1500,Ae=20;function je(e){return Math.max(200,Math.ceil(1e3*(1+e)*(1+e)/Ae))}var Me=[{urls:[`stun:stun.l.google.com:19302`,`stun:stun1.l.google.com:19302`]},{urls:`stun:stun.cloudflare.com:3478`}],Ne={sent:0,got:0,peeks:0},Pe=`https://cjaewbrifdqlykasrkds.supabase.co/functions/v1/turn-credentials`,Fe=`sb_publishable_rRU01BBLtAH5ecd6nGEWDw_JiUWDrjI`,Ie=new URLSearchParams(location.search),Le=Ie.get(`rtc`)===`0`?`off`:Ie.get(`rtc`)===`fail`?`fail`:`on`;function Re(e){return e+Math.random().toString(36).slice(2,10)}var ze=class{constructor(e,t,n,r,i){this.out=r,this.inn=i,this.ok=!1,this.hb=0,this.ref=2,this.lobby=``,this.lobbyOk=!1,this.onLobby=null,this.onLobbyJoin=null,this.onLobbyLost=null,this.topic=`realtime:hot-bomb-p2-`+e,this.ws=new WebSocket(j()),this.ws.onopen=()=>{this.raw({topic:this.topic,event:`phx_join`,payload:{config:{broadcast:{self:!1,ack:!1},presence:{key:``,enabled:!1},postgres_changes:[],private:!1}},ref:`1`,join_ref:`1`}),this.hb=window.setInterval(()=>this.raw({topic:`phoenix`,event:`heartbeat`,payload:{},ref:String(this.ref++)}),25e3)},this.ws.onmessage=e=>{let r=String(e.data);Ne.got++,this.inn.n++,this.inn.b+=r.length;let i;try{i=JSON.parse(r)}catch{return}if(this.lobby&&i.topic===this.lobby){i.event===`phx_reply`&&i.ref===`L`?(this.lobbyOk=i.payload.status===`ok`,this.lobbyOk&&this.onLobbyJoin?.()):i.event===`phx_close`||i.event===`system`&&i.payload.status===`error`?(this.lobbyOk&&console.warn(`net: lobby closed`,i.payload),this.lobbyOk=!1,this.onLobbyLost?.()):(i.event===`presence_state`||i.event===`presence_diff`)&&this.onLobby?.(i.event,i.payload);return}if(i.event===`phx_reply`&&i.ref===`1`)this.ok=i.payload.status===`ok`,this.ok?n():console.warn(`net: join refused`,i.payload);else if(i.event===`broadcast`&&i.payload.event){let e=i.payload.payload;e&&typeof e==`object`&&typeof e.f==`string`&&t(i.payload.event,e)}},this.ws.onclose=e=>{this.ok=!1,clearInterval(this.hb),e.code!==1e3&&console.warn(`net: closed`,e.code,e.reason)}}raw(e){if(this.ws.readyState!==1)return;let t=JSON.stringify(e);Ne.sent++,this.out.n++,this.out.b+=t.length,this.ws.send(t)}send(e,t){this.ok&&this.raw({topic:this.topic,event:`broadcast`,payload:{type:`broadcast`,event:e,payload:t},ref:null,join_ref:`1`})}joinLobby(e,t){this.lobby=Ee(e),this.raw({topic:this.lobby,event:`phx_join`,payload:{config:{broadcast:{self:!1,ack:!1},presence:{key:t,enabled:!0},postgres_changes:[],private:!1}},ref:`L`,join_ref:`L`})}track(e){this.lobbyOk&&this.raw({topic:this.lobby,event:`presence`,payload:{type:`presence`,event:`track`,payload:e},ref:String(this.ref++),join_ref:`L`})}close(){clearInterval(this.hb),this.ok=!1;try{this.ws.close(1e3)}catch{}}};function Be(e){if(!e||typeof e!=`object`)return null;let t=e,n=typeof t.r==`string`?t.r:``,r=Number(t.h),i=Number(t.n),a=Number(t.t),o=Number(t.s);return!/^[A-Z0-9]{2,6}$/.test(n)||t.v!==2||!Number.isInteger(r)||!Number.isInteger(i)||r<1||i<2||i>6||!Number.isFinite(a)?null:{r:n,h:Math.min(r,i),n:i,t:a,g:typeof t.g==`string`?t.g.slice(0,3):``,s:Number.isInteger(o)?o:0,v:2}}function Ve(e,t,n){if(!n||typeof n!=`object`)return;let r=t=>{for(let[n,r]of Object.entries(t)){let t=r?.metas??[],i=Be(t[t.length-1]);i?e.set(n,i):e.delete(n)}};if(t===`presence_state`)e.clear(),r(n);else{let t=n;for(let n of Object.keys(t.leaves??{}))e.delete(n);r(t.joins??{})}}function He(){let e=``;try{e=Intl.DateTimeFormat().resolvedOptions().timeZone||``}catch{}let t=e.split(`/`)[0];return t===`America`?`am`:t===`Europe`||t===`Africa`||t===`Atlantic`?`eu`:t===`Asia`||t===`Indian`?`as`:t===`Australia`||t===`Pacific`?`oc`:``}function Ue(e=2500){return new Promise(t=>{let n=new Map,r=0,i=!1,a=null,o=0,s=()=>{if(!i){i=!0,clearTimeout(o);try{a?.close(1e3)}catch{}t(r?[...n.values()]:null)}};o=window.setTimeout(s,e);try{a=new WebSocket(j())}catch{s();return}let c=a;Ne.peeks++,c.onopen=()=>{for(let e=0;e<4;e++,Ne.sent++)c.send(JSON.stringify({topic:Ee(e),event:`phx_join`,payload:{config:{broadcast:{self:!1,ack:!1},presence:{key:``,enabled:!0},postgres_changes:[],private:!1}},ref:`P`+e,join_ref:`P`+e}))},c.onmessage=e=>{Ne.got++;let t;try{t=JSON.parse(String(e.data))}catch{return}if(t.event!==`presence_state`)return;let i=new Map;Ve(i,`presence_state`,t.payload);for(let[e,t]of i)n.set(e,t);++r>=4&&s()},c.onerror=s,c.onclose=s})}function We(e,t,n){let r=e=>n&&e.g===n?1:0,i=e.filter(e=>e.h<e.n&&!t.has(e.r));return i.sort((e,t)=>t.h-e.h||r(t)-r(e)||e.t-t.t||(e.r<t.r?-1:1)),i[0]??null}function Ge(e){let t=[];for(let n of Array.isArray(e)?e.slice(0,8):[]){if(!n||typeof n!=`object`)continue;let e=n,r=(Array.isArray(e.urls)?e.urls:[e.urls]).filter(e=>typeof e==`string`&&e.length<200&&/^(stun|turns?):/i.test(e));if(!r.length)continue;let i={urls:r};typeof e.username==`string`&&(i.username=e.username),typeof e.credential==`string`&&(i.credential=e.credential),t.push(i)}return t}function Ke(){return Le!==`on`||Ie.get(`turn`)===`0`||typeof fetch!=`function`?Promise.resolve([]):new Promise(e=>{let t=new AbortController,n=setTimeout(()=>{t.abort(),e([])},De);fetch(Pe,{method:`GET`,headers:{apikey:Fe},credentials:`omit`,cache:`no-store`,signal:t.signal}).then(e=>e.ok?e.json():null).then(t=>{clearTimeout(n),e(Ge(t&&t.iceServers))}).catch(()=>{clearTimeout(n),e([])})})}function qe(e){return e===`i`||e===`s`||e===`p`||e===`P`}var Je=class{constructor(e,t,n,r,i,a,o){this.turn=e,this.sig=t,this.onMsg=n,this.onOpen=r,this.onLost=i,this.out=a,this.inn=o,this.pc=null,this.ctl=null,this.st=null,this.iceQ=[],this.haveRemote=!1,this.route=``,this.iceOut=[],this.iceOutT=0}get open(){return this.ctl?.readyState===`open`&&this.st?.readyState===`open`}async make(){let e=await this.turn,t=Le===`fail`,n={iceServers:t?[]:Me.concat(e),iceTransportPolicy:t||Ie.get(`ice`)===`relay`?`relay`:`all`},r=new RTCPeerConnection(n);r.onicecandidate=e=>{this.pc===r&&(e.candidate&&this.iceOut.push(e.candidate.toJSON()),e.candidate?this.iceOutT||(this.iceOutT=window.setTimeout(()=>this.flushIceOut(),ke)):this.flushIceOut())};let i=()=>{if(this.pc!==r)return;let e=r.connectionState||r.iceConnectionState;(e===`failed`||e===`closed`)&&this.onLost()};return r.onconnectionstatechange=i,r.oniceconnectionstatechange=i,r.ondatachannel=e=>this.wire(e.channel),this.pc=r,this.haveRemote=!1,r}async offer(){try{let e=await this.make();this.wire(e.createDataChannel(`ctl`,{ordered:!0})),this.wire(e.createDataChannel(`st`,{ordered:!1,maxRetransmits:0})),await e.setLocalDescription(await e.createOffer()),this.pc===e&&this.sig({t:`offer`,sdp:e.localDescription.toJSON()})}catch(e){console.warn(`net: offer`,e)}}async answer(e){try{let t=await this.make();await t.setRemoteDescription(e),this.flushIce(),await t.setLocalDescription(await t.createAnswer()),this.pc===t&&this.sig({t:`answer`,sdp:t.localDescription.toJSON()})}catch(e){console.warn(`net: answer`,e)}}remote(e){this.pc?.setRemoteDescription(e).then(()=>this.flushIce()).catch(e=>console.warn(`net: remote`,e))}flushIceOut(){clearTimeout(this.iceOutT),this.iceOutT=0,this.iceOut.length&&this.pc&&this.sig({t:`ice`,cs:this.iceOut.splice(0,20)})}addIces(e){if(e.c&&this.addIce(e.c),Array.isArray(e.cs))for(let t of e.cs.slice(0,20))t&&typeof t==`object`&&this.addIce(t)}addIce(e){this.pc&&this.haveRemote?this.pc.addIceCandidate(e).catch(()=>{}):this.iceQ.push(e)}flushIce(){this.haveRemote=!0;for(let e of this.iceQ.splice(0))this.pc?.addIceCandidate(e).catch(()=>{})}wire(e){e.label===`st`?this.st=e:this.ctl=e,e.onmessage=e=>{let t=String(e.data);this.inn.n++,this.inn.b+=t.length;let n;try{n=JSON.parse(t)}catch{return}Array.isArray(n)&&typeof n[0]==`string`&&this.onMsg(n[0],n[1])},e.onopen=()=>{this.open&&this.onOpen()},e.onclose=()=>{(e===this.ctl||e===this.st)&&this.onLost()}}send(e,t,n){let r=qe(e)?this.st:this.ctl;if(!r||r.readyState!==`open`)return!1;let i=n??JSON.stringify([e,t]);this.out.n++,this.out.b+=i.length;try{r.send(i)}catch{return!1}return!0}async readRoute(){try{let e=await this.pc.getStats();e.forEach(t=>{if(t.type===`candidate-pair`&&t.nominated&&t.state===`succeeded`&&t.localCandidateId){let n=e.get(t.localCandidateId);n?.candidateType&&(this.route=n.candidateType)}})}catch{}}close(){let e=this.pc;if(this.pc=null,this.ctl=this.st=null,this.iceQ=[],clearTimeout(this.iceOutT),this.iceOutT=0,this.iceOut=[],this.haveRemote=!1,e)try{e.close()}catch{}}},Ye=class{constructor(e,t,n=null){this.room=e,this.on=t,this.ad=n,this.id=Re(`H`),this.out={n:0,b:0},this.inn={n:0,b:0},this.pipe=null,this.peers=new Map,this.closed=!1,this.shard=-1,this.lobby=new Map,this.onLobby=null,this.onGone=null,this.rq={s:null,keyed:new Map,q:[],at:0,timer:0},this.adSent=``,this.adAt=-1e9,this.adT=0,this.turn=Ke(),this.relay=!n,n?this.shard=Math.floor(Math.random()*4):this.rq.timer=window.setInterval(()=>this.flushRelay(),100),this.openPipe()}relayed(){let e=0;for(let t of this.peers.values())t.path===`broadcast`&&e++;return e}relayPut(e,t,n){e===`s`?this.rq.s=t:(e===`nx`||e===`on`)&&!n?this.rq.keyed.set(e,t):this.rq.q.length<200&&this.rq.q.push(n?[e,t,n]:[e,t])}flushRelay(){let e=this.relayed();if(!e){this.rq.s=null,this.rq.keyed.clear(),this.rq.q.length=0;return}let t=performance.now(),n=je(e);if(t-this.rq.at<n||!this.rq.s&&!this.rq.q.length&&!this.rq.keyed.size)return;this.rq.at=t;let r=[...this.rq.keyed.entries()].map(([e,t])=>[e,t]);r.push(...this.rq.q.splice(0)),this.rq.keyed.clear(),this.pipe?.send(`b`,{f:this.id,d:{s:this.rq.s,q:r,gi:n}}),this.rq.s=null}advertise(){let e=this.pipe;if(!this.ad||!e?.lobbyOk||this.closed)return;let t={...this.ad(),s:this.shard},n=JSON.stringify(t);if(n===this.adSent)return;let r=this.adAt+Oe-performance.now();if(r>0){this.adT||(this.adT=window.setTimeout(()=>{this.adT=0,this.advertise()},r));return}this.adSent=n,this.adAt=performance.now(),e.track(t)}get ok(){return!!this.pipe?.ok}pathOf(e){return this.peers.get(e)?.path??`wait`}routeOf(e){return this.peers.get(e)?.conn?.route??``}openPipe(){this.closed||(this.pipe=new ze(this.room,(e,t)=>this.fromPipe(e,t),()=>{let e=this.pipe;this.ad&&e&&(e.onLobby=(e,t)=>{Ve(this.lobby,e,t),this.onLobby?.()},e.onLobbyJoin=()=>{this.adSent=``,this.advertise()},e.onLobbyLost=()=>setTimeout(()=>{this.pipe===e&&e.ok&&!e.lobbyOk&&!this.closed&&e.joinLobby(this.shard,this.id)},3e3),e.joinLobby(this.shard,this.id))},this.out,this.inn),this.pipe.ws.addEventListener(`close`,()=>{this.closed||setTimeout(()=>this.openPipe(),1500)}))}sendAll(e,t){let n=JSON.stringify([e,t]),r=!1;for(let i of this.peers.values())i.path===`rtc`&&i.conn?i.conn.send(e,t,n)||(r=!0):i.path===`broadcast`&&(r=!0);r&&this.relay&&this.relayPut(e,t)}sendTo(e,t,n){let r=this.peers.get(e);r?.path===`rtc`&&r.conn?.send(t,n)||(this.relay&&r?.path===`broadcast`?this.relayPut(t,n,e):t===`full`&&this.pipe?.send(t,{f:this.id,t:e,d:n}))}drop(e){let t=this.peers.get(e);t&&(t.conn?.close(),this.peers.delete(e))}close(){this.closed=!0,clearInterval(this.rq.timer),clearTimeout(this.adT);for(let e of[...this.peers.keys()])this.drop(e);this.pipe?.close(),this.pipe=null}peer(e){let t=this.peers.get(e);return t||(t={id:e,path:`wait`,conn:null,t0:performance.now()},this.peers.set(e,t)),t}fromPipe(e,t){if(!t.f.startsWith(`G`))return;if(e!==`sig`){if(t.t&&t.t!==this.id||!this.relay)return;if(e===`b`){let e=t.d||{};if(Array.isArray(e.q))for(let n of e.q.slice(0,50))Array.isArray(n)&&typeof n[0]==`string`&&n[0]!==`b`&&this.fromPipe(n[0],{f:t.f,d:n[1]});e.i&&this.peers.get(t.f)?.path===`broadcast`&&this.on(`i`,e.i,t.f);return}if(e===`hi`){let e=this.peer(t.f);e.path!==`broadcast`&&(e.conn?.close(),e.conn=null,e.path=`broadcast`,console.info(`net: guest`,t.f,`on broadcast`))}else if(!this.peers.has(t.f))return;this.on(e,t.d,t.f);return}let n=t.d;if(!(n.to&&n.to!==this.id)){if(n.t===`hello`){if(Le===`off`)return;let e=this.peer(t.f);if(e.path===`rtc`)return;e.conn?.close(),e.path=`wait`,e.t0=performance.now(),e.conn=this.newConn(e),e.conn.offer()}else n.t===`answer`&&n.sdp?this.peers.get(t.f)?.conn?.remote(n.sdp):n.t===`ice`&&this.peers.get(t.f)?.conn?.addIces(n)}}newConn(e){let t=new Je(this.turn,t=>this.pipe?.send(`sig`,{f:this.id,d:{...t,to:e.id}}),(n,r)=>{e.conn===t&&(n===`hi`&&e.path!==`rtc`&&(e.path=`rtc`,t.readRoute(),console.info(`net: guest`,e.id,`direct after`,Math.round(performance.now()-e.t0),`ms`)),e.path===`rtc`&&this.on(n,r,e.id))},()=>void 0,()=>{if(e.conn===t){if(t.close(),e.conn=null,!this.relay){let t=e.path===`rtc`;this.peers.delete(e.id),t&&this.onGone?.(e.id);return}e.path===`rtc`&&(console.warn(`net: guest`,e.id,`direct lost, back to broadcast`),e.path=`broadcast`)}},this.out,this.inn);return t}},Xe=class{constructor(e,t,n,r=!0,i=null){this.room=e,this.on=t,this.onReady=n,this.relay=r,this.onFail=i,this.id=Re(`G`),this.path=`wait`,this.why=``,this.connectMs=0,this.out={n:0,b:0},this.inn={n:0,b:0},this.pipe=null,this.conn=null,this.hostId=``,this.helloT=0,this.failT=0,this.t0=0,this.closed=!1,this.rq={i:null,q:[],at:0,ms:500,timer:0},this.turn=Ke(),this.rq.timer=window.setInterval(()=>this.flushRelay(),100),this.openPipe()}flushRelay(){if(this.path!==`broadcast`||!this.rq.i&&!this.rq.q.length)return;let e=performance.now();e-this.rq.at<this.rq.ms||(this.rq.at=e,this.pipe?.send(`b`,{f:this.id,t:this.hostId||void 0,d:{i:this.rq.i,q:this.rq.q.splice(0)}}),this.rq.i=null)}get route(){return this.conn?.route??``}send(e,t){if(!(this.path===`rtc`&&this.conn?.send(e,t))&&this.relay){if(this.path===`broadcast`){e===`i`?this.rq.i=t:this.rq.q.length<50&&this.rq.q.push([e,t]);return}this.pipe?.send(e,{f:this.id,t:this.hostId||void 0,d:t})}}close(){this.closed=!0,clearInterval(this.rq.timer),clearInterval(this.helloT),clearTimeout(this.failT),this.pipe?.close(),this.pipe=null,this.conn?.close(),this.conn=null}openPipe(){this.pipe||this.closed||(this.pipe=new ze(this.room,(e,t)=>this.fromPipe(e,t),()=>this.pipeOpen(),this.out,this.inn))}leavePipe(){let e=this.pipe;e&&(this.pipe=null,setTimeout(()=>e.close(),2e3))}pipeOpen(){if(this.path===`broadcast`){this.onReady();return}if(this.path!==`wait`)return;if(Le===`off`||typeof RTCPeerConnection!=`function`)return this.fallback(Le===`off`?`off`:`no-rtc`);this.t0=performance.now();let e=()=>this.pipe?.send(`sig`,{f:this.id,d:{t:`hello`}});e(),this.helloT=window.setInterval(e,M),this.failT=window.setTimeout(()=>this.fallback(`timeout`),Te)}fromPipe(e,t){if(!t.f.startsWith(`H`))return;if(e!==`sig`){if(t.t&&t.t!==this.id||this.path===`rtc`||!this.relay)return;if(this.hostId||(this.hostId=t.f),e===`b`){let e=t.d||{},n=Number(e.gi);if(n>=200&&n<=1e4&&(this.rq.ms=n),Array.isArray(e.q))for(let t of e.q.slice(0,200))Array.isArray(t)&&typeof t[0]==`string`&&t[0]!==`b`&&(!t[2]||t[2]===this.id)&&this.on(t[0],t[1]);e.s&&this.on(`s`,e.s);return}this.on(e,t.d);return}let n=t.d;if(n.to===this.id&&this.path===`wait`){if(n.t===`offer`&&n.sdp&&!this.conn){clearInterval(this.helloT),this.hostId=t.f;let e=new Je(this.turn,e=>this.pipe?.send(`sig`,{f:this.id,d:{...e,to:this.hostId}}),(t,n)=>{this.conn===e&&this.path===`rtc`&&this.on(t,n)},()=>{this.conn===e&&this.path===`wait`&&(this.connectMs=Math.round(performance.now()-this.t0),clearTimeout(this.failT),this.path=`rtc`,this.why=``,e.readRoute(),console.info(`net: path rtc after `+this.connectMs+` ms`),this.onReady(),this.leavePipe())},()=>{this.conn===e&&this.lost()},this.out,this.inn);this.conn=e,e.answer(n.sdp)}else n.t===`ice`&&t.f===this.hostId&&this.conn?.addIces(n)}}fail(e){this.closed||(console.info(`net: no direct route (`+e+`), no relay in public rooms`),this.close(),this.onFail?.())}fallback(e){if(this.path===`wait`){if(!this.relay)return this.fail(e);clearInterval(this.helloT),clearTimeout(this.failT),this.conn?.close(),this.conn=null,this.path=`broadcast`,this.why=e,console.info(`net: path broadcast (`+e+`)`),this.onReady()}}lost(){if(!this.closed){if(this.path===`wait`)return this.fallback(`lost`);if(this.path===`rtc`){if(!this.relay)return this.fail(`lost`);console.warn(`net: rtc lost, back to broadcast`),this.conn?.close(),this.conn=null,this.path=`broadcast`,this.why=`lost`,this.pipe?.ok?this.onReady():this.openPipe()}}}},Ze,Qe,$e,et,tt,nt,rt,it,at,ot=`attached`,st=1e3,ct=1001,lt=1002,ut=1003,dt=1004,ft=1005,pt=1006,mt=1007,ht=1008,gt=1009,_t=1010,vt=1011,yt=1012,bt=1013,xt=1014,St=1015,Ct=1016,wt=1017,Tt=1018,Et=1020,Dt=35902,Ot=35899,kt=1021,At=1022,jt=1023,Mt=1026,Nt=1027,Pt=1028,Ft=1029,It=1030,Lt=1031,Rt=1033,zt=33776,Bt=33777,Vt=33778,Ht=33779,Ut=35840,Wt=35841,Gt=35842,Kt=35843,qt=36196,Jt=37492,Yt=37496,Xt=37488,Zt=37489,Qt=37490,$t=37491,en=37808,tn=37809,nn=37810,rn=37811,an=37812,on=37813,sn=37814,cn=37815,ln=37816,un=37817,dn=37818,fn=37819,pn=37820,mn=37821,hn=36492,gn=36494,_n=36495,vn=36283,yn=36284,bn=36285,xn=36286,Sn=2300,Cn=2301,wn=2302,Tn=2303,En=2400,Dn=2401,On=2402,kn=3200,An=`srgb`,jn=`srgb-linear`,Mn=`linear`,Nn=`srgb`,Pn=7680,Fn=35044,In=35048,Ln=2e3;function Rn(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function zn(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Bn(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Vn(){let e=Bn(`canvas`);return e.style.display=`block`,e}var Hn={};function Un(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Wn(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function N(...e){e=Wn(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function Gn(...e){e=Wn(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Kn(...e){let t=e.join(` `);t in Hn||(Hn[t]=!0,N(...e))}function qn(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Jn={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Yn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Xn=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Zn=Math.PI/180,Qn=180/Math.PI;function $n(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Xn[e&255]+Xn[e>>8&255]+Xn[e>>16&255]+Xn[e>>24&255]+`-`+Xn[t&255]+Xn[t>>8&255]+`-`+Xn[t>>16&15|64]+Xn[t>>24&255]+`-`+Xn[n&63|128]+Xn[n>>8&255]+`-`+Xn[n>>16&255]+Xn[n>>24&255]+Xn[r&255]+Xn[r>>8&255]+Xn[r>>16&255]+Xn[r>>24&255]).toLowerCase()}function er(e,t,n){return Math.max(t,Math.min(n,e))}function tr(e,t){return(e%t+t)%t}function nr(e,t,n){return(1-n)*e+n*t}function rr(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function ir(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}rt=Symbol.iterator;var P=class{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=er(this.x,e.x,t.x),this.y=er(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=er(this.x,e,t),this.y=er(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(er(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(er(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[rt](){yield this.x,yield this.y}};Ze=P,Ze.prototype.isVector2=!0;var ar=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:N(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(er(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};it=Symbol.iterator;var F=class{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(sr.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(sr.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=er(this.x,e.x,t.x),this.y=er(this.y,e.y,t.y),this.z=er(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=er(this.x,e,t),this.y=er(this.y,e,t),this.z=er(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(er(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return or.copy(this).projectOnVector(e),this.sub(or)}reflect(e){return this.sub(or.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(er(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[it](){yield this.x,yield this.y,yield this.z}};Qe=F,Qe.prototype.isVector3=!0;var or=new F,sr=new ar,cr=class{constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Kn(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(lr.makeScale(e,t)),this}rotate(e){return Kn(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(lr.makeRotation(-e)),this}translate(e,t){return Kn(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(lr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};$e=cr,$e.prototype.isMatrix3=!0;var lr=new cr,ur=new cr().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dr=new cr().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function fr(){let e={enabled:!0,workingColorSpace:jn,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=mr(e.r),e.g=mr(e.g),e.b=mr(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=hr(e.r),e.g=hr(e.g),e.b=hr(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Mn:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Kn(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Kn(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[jn]:{primaries:t,whitePoint:r,transfer:Mn,toXYZ:ur,fromXYZ:dr,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:An},outputColorSpaceConfig:{drawingBufferColorSpace:An}},[An]:{primaries:t,whitePoint:r,transfer:Nn,toXYZ:ur,fromXYZ:dr,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:An}}}),e}var pr=fr();function mr(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function hr(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var gr,_r=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{gr===void 0&&(gr=Bn(`canvas`)),gr.width=e.width,gr.height=e.height;let t=gr.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=gr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Bn(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=mr(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(mr(t[e]/255)*255):t[e]=mr(t[e]);return{data:t,width:e.width,height:e.height}}return N(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},vr=0,yr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:vr++}),this.uuid=$n(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(br(r[t].image)):e.push(br(r[t]))}else e=br(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function br(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?_r.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(N(`Texture: Unable to serialize Texture.`),{})}var xr=0,Sr=new F,Cr=class e extends Yn{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=ct,i=ct,a=pt,o=ht,s=jt,c=gt,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xr++}),this.uuid=$n(),this.name=``,this.source=new yr(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new P(0,0),this.repeat=new P(1,1),this.center=new P(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new cr,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Sr).x}get height(){return this.source.getSize(Sr).y}get depth(){return this.source.getSize(Sr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){N(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){N(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case st:e.x-=Math.floor(e.x);break;case ct:e.x=e.x<0?0:1;break;case lt:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case st:e.y-=Math.floor(e.y);break;case ct:e.y=e.y<0?0:1;break;case lt:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Cr.DEFAULT_IMAGE=null,Cr.DEFAULT_MAPPING=300,Cr.DEFAULT_ANISOTROPY=1,at=Symbol.iterator;var wr=class{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=er(this.x,e.x,t.x),this.y=er(this.y,e.y,t.y),this.z=er(this.z,e.z,t.z),this.w=er(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=er(this.x,e,t),this.y=er(this.y,e,t),this.z=er(this.z,e,t),this.w=er(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(er(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[at](){yield this.x,yield this.y,yield this.z,yield this.w}};et=wr,et.prototype.isVector4=!0;var Tr=class extends Yn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new wr(0,0,e,t),this.scissorTest=!1,this.viewport=new wr(0,0,e,t),this.textures=[];let r=new Cr({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:pt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new yr(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Er=class extends Tr{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Dr=class extends Cr{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ut,this.minFilter=ut,this.wrapR=ct,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Or=class extends Cr{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ut,this.minFilter=ut,this.wrapR=ct,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},kr=class e{constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Ar.setFromMatrixColumn(e,0).length(),i=1/Ar.setFromMatrixColumn(e,1).length(),a=1/Ar.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Mr,e,Nr)}lookAt(e,t,n){let r=this.elements;return Ir.subVectors(e,t),Ir.lengthSq()===0&&(Ir.z=1),Ir.normalize(),Pr.crossVectors(n,Ir),Pr.lengthSq()===0&&(Math.abs(n.z)===1?Ir.x+=1e-4:Ir.z+=1e-4,Ir.normalize(),Pr.crossVectors(n,Ir)),Pr.normalize(),Fr.crossVectors(Ir,Pr),r[0]=Pr.x,r[4]=Fr.x,r[8]=Ir.x,r[1]=Pr.y,r[5]=Fr.y,r[9]=Ir.y,r[2]=Pr.z,r[6]=Fr.z,r[10]=Ir.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],ee=r[2],te=r[6],ne=r[10],re=r[14],k=r[3],ie=r[7],ae=r[11],oe=r[15];return i[0]=a*x+o*T+s*ee+c*k,i[4]=a*S+o*E+s*te+c*ie,i[8]=a*C+o*D+s*ne+c*ae,i[12]=a*w+o*O+s*re+c*oe,i[1]=l*x+u*T+d*ee+f*k,i[5]=l*S+u*E+d*te+f*ie,i[9]=l*C+u*D+d*ne+f*ae,i[13]=l*w+u*O+d*re+f*oe,i[2]=p*x+m*T+h*ee+g*k,i[6]=p*S+m*E+h*te+g*ie,i[10]=p*C+m*D+h*ne+g*ae,i[14]=p*w+m*O+h*re+g*oe,i[3]=_*x+v*T+y*ee+b*k,i[7]=_*S+v*E+y*te+b*ie,i[11]=_*C+v*D+y*ne+b*ae,i[15]=_*w+v*O+y*re+b*oe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,ee=_*O-v*D+y*E+b*T-x*w+S*C;if(ee===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let te=1/ee;return e[0]=(o*O-s*D+c*E)*te,e[1]=(r*D-n*O-i*E)*te,e[2]=(m*S-h*x+g*b)*te,e[3]=(d*x-u*S-f*b)*te,e[4]=(s*T-a*O-c*w)*te,e[5]=(t*O-r*T+i*w)*te,e[6]=(h*y-p*S-g*v)*te,e[7]=(l*S-d*y+f*v)*te,e[8]=(a*D-o*T+c*C)*te,e[9]=(n*T-t*D-i*C)*te,e[10]=(p*x-m*y+g*_)*te,e[11]=(u*y-l*x-f*_)*te,e[12]=(o*w-a*E-s*C)*te,e[13]=(t*E-n*w+r*C)*te,e[14]=(m*v-p*b-h*_)*te,e[15]=(l*b-u*v+d*_)*te,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Ar.set(r[0],r[1],r[2]).length(),o=Ar.set(r[4],r[5],r[6]).length(),s=Ar.set(r[8],r[9],r[10]).length();i<0&&(a=-a),jr.copy(this);let c=1/a,l=1/o,u=1/s;return jr.elements[0]*=c,jr.elements[1]*=c,jr.elements[2]*=c,jr.elements[4]*=l,jr.elements[5]*=l,jr.elements[6]*=l,jr.elements[8]*=u,jr.elements[9]*=u,jr.elements[10]*=u,t.setFromRotationMatrix(jr),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Ln,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Ln,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};tt=kr,tt.prototype.isMatrix4=!0;var Ar=new F,jr=new kr,Mr=new F(0,0,0),Nr=new F(1,1,1),Pr=new F,Fr=new F,Ir=new F,Lr=new kr,Rr=new ar,zr=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(er(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-er(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(er(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-er(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(er(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-er(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:N(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Lr.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Lr,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Rr.setFromEuler(this),this.setFromQuaternion(Rr,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};zr.DEFAULT_ORDER=`XYZ`;var Br=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},Vr=0,Hr=new F,Ur=new ar,Wr=new kr,Gr=new F,Kr=new F,qr=new F,Jr=new ar,Yr=new F(1,0,0),Xr=new F(0,1,0),Zr=new F(0,0,1),Qr={type:`added`},$r={type:`removed`},ei={type:`childadded`,child:null},ti={type:`childremoved`,child:null},ni=class e extends Yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vr++}),this.uuid=$n(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new F,n=new zr,r=new ar,i=new F(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new kr},normalMatrix:{value:new cr}}),this.matrix=new kr,this.matrixWorld=new kr,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Br,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ur.setFromAxisAngle(e,t),this.quaternion.multiply(Ur),this}rotateOnWorldAxis(e,t){return Ur.setFromAxisAngle(e,t),this.quaternion.premultiply(Ur),this}rotateX(e){return this.rotateOnAxis(Yr,e)}rotateY(e){return this.rotateOnAxis(Xr,e)}rotateZ(e){return this.rotateOnAxis(Zr,e)}translateOnAxis(e,t){return Hr.copy(e).applyQuaternion(this.quaternion),this.position.add(Hr.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Yr,e)}translateY(e){return this.translateOnAxis(Xr,e)}translateZ(e){return this.translateOnAxis(Zr,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Wr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Gr.copy(e):Gr.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Kr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wr.lookAt(Kr,Gr,this.up):Wr.lookAt(Gr,Kr,this.up),this.quaternion.setFromRotationMatrix(Wr),r&&(Wr.extractRotation(r.matrixWorld),Ur.setFromRotationMatrix(Wr),this.quaternion.premultiply(Ur.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(Gn(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Qr),ei.child=e,this.dispatchEvent(ei),ei.child=null):Gn(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent($r),ti.child=e,this.dispatchEvent(ti),ti.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Wr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Wr.multiply(e.parent.matrixWorld)),e.applyMatrix4(Wr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Qr),ei.child=e,this.dispatchEvent(ei),ei.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Kr,e,qr),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Kr,Jr,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};ni.DEFAULT_UP=new F(0,1,0),ni.DEFAULT_MATRIX_AUTO_UPDATE=!0,ni.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ri=class extends ni{constructor(){super(),this.isGroup=!0,this.type=`Group`}},ii={type:`move`},ai=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ri,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ri,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ri,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ii)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ri;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},oi={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},si={h:0,s:0,l:0},ci={h:0,s:0,l:0};function li(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var I=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=An){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,pr.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=pr.workingColorSpace){return this.r=e,this.g=t,this.b=n,pr.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=pr.workingColorSpace){if(e=tr(e,1),t=er(t,0,1),n=er(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=li(i,r,e+1/3),this.g=li(i,r,e),this.b=li(i,r,e-1/3)}return pr.colorSpaceToWorking(this,r),this}setStyle(e,t=An){function n(t){t!==void 0&&parseFloat(t)<1&&N(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:N(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);N(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=An){let n=oi[e.toLowerCase()];return n===void 0?N(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mr(e.r),this.g=mr(e.g),this.b=mr(e.b),this}copyLinearToSRGB(e){return this.r=hr(e.r),this.g=hr(e.g),this.b=hr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=An){return pr.workingToColorSpace(ui.copy(this),e),Math.round(er(ui.r*255,0,255))*65536+Math.round(er(ui.g*255,0,255))*256+Math.round(er(ui.b*255,0,255))}getHexString(e=An){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=pr.workingColorSpace){pr.workingToColorSpace(ui.copy(this),t);let n=ui.r,r=ui.g,i=ui.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=pr.workingColorSpace){return pr.workingToColorSpace(ui.copy(this),t),e.r=ui.r,e.g=ui.g,e.b=ui.b,e}getStyle(e=An){pr.workingToColorSpace(ui.copy(this),e);let t=ui.r,n=ui.g,r=ui.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(si),this.setHSL(si.h+e,si.s+t,si.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(si),e.getHSL(ci);let n=nr(si.h,ci.h,t),r=nr(si.s,ci.s,t),i=nr(si.l,ci.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ui=new I;I.NAMES=oi;var di=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new I(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},fi=class extends ni{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zr,this.environmentIntensity=1,this.environmentRotation=new zr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},pi=new F,mi=new F,hi=new F,gi=new F,_i=new F,vi=new F,yi=new F,bi=new F,xi=new F,Si=new F,Ci=new wr,wi=new wr,Ti=new wr,Ei=class e{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),pi.subVectors(e,t),r.cross(pi);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){pi.subVectors(r,t),mi.subVectors(n,t),hi.subVectors(e,t);let a=pi.dot(pi),o=pi.dot(mi),s=pi.dot(hi),c=mi.dot(mi),l=mi.dot(hi),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,gi)!==null&&gi.x>=0&&gi.y>=0&&gi.x+gi.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,gi)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,gi.x),s.addScaledVector(a,gi.y),s.addScaledVector(o,gi.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Ci.setScalar(0),wi.setScalar(0),Ti.setScalar(0),Ci.fromBufferAttribute(e,t),wi.fromBufferAttribute(e,n),Ti.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ci,i.x),a.addScaledVector(wi,i.y),a.addScaledVector(Ti,i.z),a}static isFrontFacing(e,t,n,r){return pi.subVectors(n,t),mi.subVectors(e,t),pi.cross(mi).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return pi.subVectors(this.c,this.b),mi.subVectors(this.a,this.b),pi.cross(mi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;_i.subVectors(r,n),vi.subVectors(i,n),bi.subVectors(e,n);let s=_i.dot(bi),c=vi.dot(bi);if(s<=0&&c<=0)return t.copy(n);xi.subVectors(e,r);let l=_i.dot(xi),u=vi.dot(xi);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(_i,a);Si.subVectors(e,i);let f=_i.dot(Si),p=vi.dot(Si);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(vi,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return yi.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(yi,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(_i,a).addScaledVector(vi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Di=class{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ki.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ki.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ki.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,ki):ki.fromBufferAttribute(r,t),ki.applyMatrix4(e.matrixWorld),this.expandByPoint(ki);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Ai.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Ai.copy(e.boundingBox)),Ai.applyMatrix4(e.matrixWorld),this.union(Ai)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ki),ki.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Li),Ri.subVectors(this.max,Li),ji.subVectors(e.a,Li),Mi.subVectors(e.b,Li),Ni.subVectors(e.c,Li),Pi.subVectors(Mi,ji),Fi.subVectors(Ni,Mi),Ii.subVectors(ji,Ni);let t=[0,-Pi.z,Pi.y,0,-Fi.z,Fi.y,0,-Ii.z,Ii.y,Pi.z,0,-Pi.x,Fi.z,0,-Fi.x,Ii.z,0,-Ii.x,-Pi.y,Pi.x,0,-Fi.y,Fi.x,0,-Ii.y,Ii.x,0];return!Vi(t,ji,Mi,Ni,Ri)||(t=[1,0,0,0,1,0,0,0,1],!Vi(t,ji,Mi,Ni,Ri))?!1:(zi.crossVectors(Pi,Fi),t=[zi.x,zi.y,zi.z],Vi(t,ji,Mi,Ni,Ri))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ki).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ki).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Oi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Oi=[new F,new F,new F,new F,new F,new F,new F,new F],ki=new F,Ai=new Di,ji=new F,Mi=new F,Ni=new F,Pi=new F,Fi=new F,Ii=new F,Li=new F,Ri=new F,zi=new F,Bi=new F;function Vi(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Bi.fromArray(e,a);let o=i.x*Math.abs(Bi.x)+i.y*Math.abs(Bi.y)+i.z*Math.abs(Bi.z),s=t.dot(Bi),c=n.dot(Bi),l=r.dot(Bi);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Hi=new F,Ui=new P,Wi=0,Gi=class extends Yn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wi++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Fn,this.updateRanges=[],this.gpuType=St,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ui.fromBufferAttribute(this,t),Ui.applyMatrix3(e),this.setXY(t,Ui.x,Ui.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Hi.fromBufferAttribute(this,t),Hi.applyMatrix3(e),this.setXYZ(t,Hi.x,Hi.y,Hi.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Hi.fromBufferAttribute(this,t),Hi.applyMatrix4(e),this.setXYZ(t,Hi.x,Hi.y,Hi.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Hi.fromBufferAttribute(this,t),Hi.applyNormalMatrix(e),this.setXYZ(t,Hi.x,Hi.y,Hi.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Hi.fromBufferAttribute(this,t),Hi.transformDirection(e),this.setXYZ(t,Hi.x,Hi.y,Hi.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=rr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ir(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=rr(t,this.array)),t}setX(e,t){return this.normalized&&(t=ir(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=rr(t,this.array)),t}setY(e,t){return this.normalized&&(t=ir(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=rr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ir(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=rr(t,this.array)),t}setW(e,t){return this.normalized&&(t=ir(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ir(t,this.array),n=ir(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=ir(t,this.array),n=ir(n,this.array),r=ir(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=ir(t,this.array),n=ir(n,this.array),r=ir(r,this.array),i=ir(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},Ki=class extends Gi{constructor(e,t,n){super(new Uint16Array(e),t,n)}},qi=class extends Gi{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Ji=class extends Gi{constructor(e,t,n){super(new Float32Array(e),t,n)}},Yi=new Di,Xi=new F,Zi=new F,Qi=class{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Yi.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xi.subVectors(e,this.center);let t=Xi.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Xi,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zi.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xi.copy(e.center).add(Zi)),this.expandByPoint(Xi.copy(e.center).sub(Zi))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},$i=0,ea=new kr,ta=new ni,na=new F,ra=new Di,ia=new Di,aa=new F,oa=class e extends Yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$i++}),this.uuid=$n(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Rn(e)?qi:Ki)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new cr().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return ea.makeRotationFromQuaternion(e),this.applyMatrix4(ea),this}rotateX(e){return ea.makeRotationX(e),this.applyMatrix4(ea),this}rotateY(e){return ea.makeRotationY(e),this.applyMatrix4(ea),this}rotateZ(e){return ea.makeRotationZ(e),this.applyMatrix4(ea),this}translate(e,t,n){return ea.makeTranslation(e,t,n),this.applyMatrix4(ea),this}scale(e,t,n){return ea.makeScale(e,t,n),this.applyMatrix4(ea),this}lookAt(e){return ta.lookAt(e),ta.updateMatrix(),this.applyMatrix4(ta.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(na).negate(),this.translate(na.x,na.y,na.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Ji(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&N(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Di);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Gn(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];ra.setFromBufferAttribute(n),this.morphTargetsRelative?(aa.addVectors(this.boundingBox.min,ra.min),this.boundingBox.expandByPoint(aa),aa.addVectors(this.boundingBox.max,ra.max),this.boundingBox.expandByPoint(aa)):(this.boundingBox.expandByPoint(ra.min),this.boundingBox.expandByPoint(ra.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Gn(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Gn(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new F,1/0);return}if(e){let n=this.boundingSphere.center;if(ra.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];ia.setFromBufferAttribute(n),this.morphTargetsRelative?(aa.addVectors(ra.min,ia.min),ra.expandByPoint(aa),aa.addVectors(ra.max,ia.max),ra.expandByPoint(aa)):(ra.expandByPoint(ia.min),ra.expandByPoint(ia.max))}ra.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)aa.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(aa));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)aa.fromBufferAttribute(a,t),o&&(na.fromBufferAttribute(e,t),aa.add(na)),r=Math.max(r,n.distanceToSquared(aa))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Gn(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Gn(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Gi(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new F,s[e]=new F;let c=new F,l=new F,u=new F,d=new P,f=new P,p=new P,m=new F,h=new F;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new F,y=new F,b=new F,x=new F;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Gi(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new F,i=new F,a=new F,o=new F,s=new F,c=new F,l=new F,u=new F;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)aa.fromBufferAttribute(e,t),aa.normalize(),e.setXYZ(t,aa.x,aa.y,aa.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Gi(a,r,i)}if(this.index===null)return N(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},sa=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Fn,this.updateRanges=[],this.version=0,this.uuid=$n()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},ca=new F,la=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ca.fromBufferAttribute(this,t),ca.applyMatrix4(e),this.setXYZ(t,ca.x,ca.y,ca.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ca.fromBufferAttribute(this,t),ca.applyNormalMatrix(e),this.setXYZ(t,ca.x,ca.y,ca.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ca.fromBufferAttribute(this,t),ca.transformDirection(e),this.setXYZ(t,ca.x,ca.y,ca.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=rr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ir(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ir(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ir(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ir(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ir(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=rr(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=rr(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=rr(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=rr(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ir(t,this.array),n=ir(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ir(t,this.array),n=ir(n,this.array),r=ir(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ir(t,this.array),n=ir(n,this.array),r=ir(r,this.array),i=ir(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){Un(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new Gi(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Un(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},ua=new F,da=new F,fa=new cr,pa=class{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=ua.subVectors(n,t).cross(da.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(ua),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||fa.getNormalMatrix(e),r=this.coplanarPoint(ua).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},ma=0,ha=class extends Yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ma++}),this.uuid=$n(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new I(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pn,this.stencilZFail=Pn,this.stencilZPass=Pn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){N(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){N(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new I().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new pa().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new P().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new P().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},ga=class extends ha{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new I(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},_a,va=new F,ya=new F,ba=new F,xa=new P,Sa=new P,Ca=new kr,wa=new F,Ta=new F,Ea=new F,Da=new P,Oa=new P,ka=new P,Aa=class extends ni{constructor(e=new ga){if(super(),this.isSprite=!0,this.type=`Sprite`,_a===void 0){_a=new oa;let e=new sa(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);_a.setIndex([0,1,2,0,2,3]),_a.setAttribute(`position`,new la(e,3,0,!1)),_a.setAttribute(`uv`,new la(e,2,3,!1))}this.geometry=_a,this.material=e,this.center=new P(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Gn(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),ya.setFromMatrixScale(this.matrixWorld),Ca.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ba.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ya.multiplyScalar(-ba.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;ja(wa.set(-.5,-.5,0),ba,a,ya,r,i),ja(Ta.set(.5,-.5,0),ba,a,ya,r,i),ja(Ea.set(.5,.5,0),ba,a,ya,r,i),Da.set(0,0),Oa.set(1,0),ka.set(1,1);let o=e.ray.intersectTriangle(wa,Ta,Ea,!1,va);if(o===null&&(ja(Ta.set(-.5,.5,0),ba,a,ya,r,i),Oa.set(0,1),o=e.ray.intersectTriangle(wa,Ea,Ta,!1,va),o===null))return;let s=e.ray.origin.distanceTo(va);s<e.near||s>e.far||t.push({distance:s,point:va.clone(),uv:Ei.getInterpolation(va,wa,Ta,Ea,Da,Oa,ka,new P),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ja(e,t,n,r,i,a){xa.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Sa.copy(xa):(Sa.x=a*xa.x-i*xa.y,Sa.y=i*xa.x+a*xa.y),e.copy(t),e.x+=Sa.x,e.y+=Sa.y,e.applyMatrix4(Ca)}var Ma=new F,Na=new F,Pa=new F,Fa=new F,Ia=class{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ma)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ma.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ma.copy(this.origin).addScaledVector(this.direction,t),Ma.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Na.copy(e).add(t).multiplyScalar(.5),Pa.copy(t).sub(e).normalize(),Fa.copy(this.origin).sub(Na);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Pa),o=Fa.dot(this.direction),s=-Fa.dot(Pa),c=Fa.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Na).addScaledVector(Pa,d),f}intersectSphere(e,t){if(e.radius<0)return null;Ma.subVectors(e.center,this.origin);let n=Ma.dot(this.direction),r=Ma.dot(Ma)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Ma)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,ee,te,ne,re,k;if(y>=b&&y>=x?(w=s,D=u,te=p,k=g,s>=0?(S=c,C=l,T=d,E=f,O=m,ee=h,ne=_,re=v):(S=l,C=c,T=f,E=d,O=h,ee=m,ne=v,re=_)):b>=x?(w=c,D=d,te=m,k=_,c>=0?(S=l,C=s,T=f,E=u,O=h,ee=p,ne=v,re=g):(S=s,C=l,T=u,E=f,O=p,ee=h,ne=g,re=v)):(w=l,D=f,te=h,k=v,l>=0?(S=s,C=c,T=u,E=d,O=p,ee=m,ne=g,re=_):(S=c,C=s,T=d,E=u,O=m,ee=p,ne=_,re=g)),w===0)return null;let ie=S/w,ae=C/w,oe=1/w,se=T-ie*D,ce=E-ae*D,le=O-ie*te,ue=ee-ae*te,de=ne-ie*k,fe=re-ae*k,pe=de*ue-fe*le,me=se*fe-ce*de,he=le*ce-ue*se;if(r){if(pe<0||me<0||he<0)return null}else if((pe<0||me<0||he<0)&&(pe>0||me>0||he>0))return null;let ge=pe+me+he;if(ge===0)return null;let _e=oe*(pe*D+me*te+he*k);return(ge>0?_e<0:_e>0)?null:this.at(_e/ge,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},La=class extends ha{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new I(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zr,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ra=new kr,za=new Ia,Ba=new Qi,Va=new F,Ha=new F,Ua=new F,Wa=new F,Ga=new F,Ka=new F,qa=new F,Ja=new F,Ya=class extends ni{constructor(e=new oa,t=new La){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Ka.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Ga.fromBufferAttribute(s,e),a?Ka.addScaledVector(Ga,r):Ka.addScaledVector(Ga.sub(t),r))}t.add(Ka)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ba.copy(n.boundingSphere),Ba.applyMatrix4(i),za.copy(e.ray).recast(e.near),!(Ba.containsPoint(za.origin)===!1&&(za.intersectSphere(Ba,Va)===null||za.origin.distanceToSquared(Va)>(e.far-e.near)**2))&&(Ra.copy(i).invert(),za.copy(e.ray).applyMatrix4(Ra),(n.boundingBox===null||za.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,za)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Za(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Za(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Za(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Za(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Xa(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Ja.copy(s),Ja.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Ja);return l<n.near||l>n.far?null:{distance:l,point:Ja.clone(),object:e}}function Za(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Ha),e.getVertexPosition(c,Ua),e.getVertexPosition(l,Wa);let u=Xa(e,t,n,r,Ha,Ua,Wa,qa);if(u){let e=new F;Ei.getBarycoord(qa,Ha,Ua,Wa,e),i&&(u.uv=Ei.getInterpolatedAttribute(i,s,c,l,e,new P)),a&&(u.uv1=Ei.getInterpolatedAttribute(a,s,c,l,e,new P)),o&&(u.normal=Ei.getInterpolatedAttribute(o,s,c,l,e,new F),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new F,materialIndex:0};Ei.getNormal(Ha,Ua,Wa,t.normal),u.face=t,u.barycoord=e}return u}var Qa=new wr,$a=new wr,eo=new wr,to=new wr,no=new kr,ro=new F,io=new Qi,ao=new kr,oo=new Ia,so=class extends Ya{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type=`SkinnedMesh`,this.bindMode=ot,this.bindMatrix=new kr,this.bindMatrixInverse=new kr,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Di),this.boundingBox.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,ro),this.boundingBox.expandByPoint(ro)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Qi),this.boundingSphere.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,ro),this.boundingSphere.expandByPoint(ro)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),io.copy(this.boundingSphere),io.applyMatrix4(r),e.ray.intersectsSphere(io)!==!1&&(ao.copy(r).invert(),oo.copy(e.ray).applyMatrix4(ao),(this.boundingBox===null||oo.intersectsBox(this.boundingBox)!==!1)&&this._computeIntersections(e,t,oo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new wr,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r===1/0?e.set(1,0,0,0):e.multiplyScalar(r),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===`attached`?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===`detached`?this.bindMatrixInverse.copy(this.bindMatrix).invert():N(`SkinnedMesh: Unrecognized bindMode: `+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;$a.fromBufferAttribute(r.attributes.skinIndex,e),eo.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(Qa.copy(t),t.set(0,0,0,0)):(Qa.set(...t,1),t.set(0,0,0)),Qa.applyMatrix4(this.bindMatrix);for(let e=0;e<4;e++){let r=eo.getComponent(e);if(r!==0){let i=$a.getComponent(e);no.multiplyMatrices(n.bones[i].matrixWorld,n.boneInverses[i]),t.addScaledVector(to.copy(Qa).applyMatrix4(no),r)}}return t.isVector4&&(t.w=Qa.w),t.applyMatrix4(this.bindMatrixInverse)}},co=class extends ni{constructor(){super(),this.isBone=!0,this.type=`Bone`}},lo=class extends Cr{constructor(e=null,t=1,n=1,r,i,a,o,s,c=ut,l=ut,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},uo=new kr,fo=new kr,po=class e{constructor(e=[],t=[]){this.uuid=$n(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){N(`Skeleton: Number of inverse bone matrices does not match amount of bones.`),this.boneInverses=[];for(let e=0,t=this.bones.length;e<t;e++)this.boneInverses.push(new kr)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let t=new kr;this.bones[e]&&t.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(t)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&t.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&(t.parent&&t.parent.isBone?(t.matrix.copy(t.parent.matrixWorld).invert(),t.matrix.multiply(t.matrixWorld)):t.matrix.copy(t.matrixWorld),t.matrix.decompose(t.position,t.quaternion,t.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let r=0,i=e.length;r<i;r++){let i=e[r]?e[r].matrixWorld:fo;uo.multiplyMatrices(i,t[r]),uo.toArray(n,r*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new e(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new lo(t,e,e,jt,St);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let r=e.bones[n],i=t[r];i===void 0&&(N(`Skeleton: No bone found with UUID:`,r),i=new co),this.bones.push(i),this.boneInverses.push(new kr().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:`Skeleton`,generator:`Skeleton.toJSON`},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,i=t.length;r<i;r++){let i=t[r];e.bones.push(i.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},mo=class extends Gi{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ho=new kr,go=new kr,_o=[],vo=new Di,yo=new kr,bo=new Ya,xo=new Qi,So=class extends Ya{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new mo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,yo)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Di),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ho),vo.copy(e.boundingBox).applyMatrix4(ho),this.boundingBox.union(vo)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ho),xo.copy(e.boundingSphere).applyMatrix4(ho),this.boundingSphere.union(xo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(bo.geometry=this.geometry,bo.material=this.material,bo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xo.copy(this.boundingSphere),xo.applyMatrix4(n),e.ray.intersectsSphere(xo)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,ho),go.multiplyMatrices(n,ho),bo.matrixWorld=go,bo.raycast(e,_o);for(let e=0,n=_o.length;e<n;e++){let n=_o[e];n.instanceId=i,n.object=this,t.push(n)}_o.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new mo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new lo(new Float32Array(r*this.count),r,this.count,Pt,St));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Co=new Qi,wo=new P(.5,.5),To=new F,Eo=class{constructor(e=new pa,t=new pa,n=new pa,r=new pa,i=new pa,a=new pa){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ln,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Co.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Co.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Co)}intersectsSprite(e){return Co.center.set(0,0,0),Co.radius=.7071067811865476+wo.distanceTo(e.center),Co.applyMatrix4(e.matrixWorld),this.intersectsSphere(Co)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(To.x=r.normal.x>0?e.max.x:e.min.x,To.y=r.normal.y>0?e.max.y:e.min.y,To.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(To)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Do=class extends ha{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new I(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Oo=new F,ko=new F,Ao=new kr,jo=new Ia,Mo=new Qi,No=new F,Po=new F,Fo=class extends ni{constructor(e=new oa,t=new Do){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Oo.fromBufferAttribute(t,e-1),ko.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Oo.distanceTo(ko);e.setAttribute(`lineDistance`,new Ji(n,1))}else N(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Mo.copy(n.boundingSphere),Mo.applyMatrix4(r),Mo.radius+=i,e.ray.intersectsSphere(Mo)===!1)return;Ao.copy(r).invert(),jo.copy(e.ray).applyMatrix4(Ao);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Io(this,e,jo,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Io(this,e,jo,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Io(this,e,jo,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Io(this,e,jo,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Io(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(Oo.fromBufferAttribute(s,i),ko.fromBufferAttribute(s,a),n.distanceSqToSegment(Oo,ko,No,Po)>r)return;No.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(No);if(!(c<t.near||c>t.far))return{distance:c,point:Po.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var Lo=new F,Ro=new F,zo=class extends Fo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)Lo.fromBufferAttribute(t,e),Ro.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+Lo.distanceTo(Ro);e.setAttribute(`lineDistance`,new Ji(n,1))}else N(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Bo=class extends ha{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new I(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Vo=new kr,Ho=new Ia,Uo=new Qi,Wo=new F,Go=class extends ni{constructor(e=new oa,t=new Bo){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Uo.copy(n.boundingSphere),Uo.applyMatrix4(r),Uo.radius+=i,e.ray.intersectsSphere(Uo)===!1)return;Vo.copy(r).invert(),Ho.copy(e.ray).applyMatrix4(Vo);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Wo.fromBufferAttribute(l,n),Ko(Wo,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Wo.fromBufferAttribute(l,a),Ko(Wo,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Ko(e,t,n,r,i,a,o){let s=Ho.distanceSqToPoint(e);if(s<n){let n=new F;Ho.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var qo=class extends Cr{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Jo=class extends Cr{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Yo=class extends Cr{constructor(e,t,n=xt,r,i,a,o=ut,s=ut,c,l=Mt,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new yr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Xo=class extends Yo{constructor(e,t=xt,n=301,r,i,a=ut,o=ut,s,c=Mt){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Zo=class extends Cr{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Qo=class e extends oa{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Ji(c,3)),this.setAttribute(`normal`,new Ji(l,3)),this.setAttribute(`uv`,new Ji(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new F;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},$o=class e extends oa{constructor(e=1,t=1,n=4,r=8,i=1){super(),this.type=`CapsuleGeometry`,this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:i},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),i=Math.max(1,Math.floor(i));let a=[],o=[],s=[],c=[],l=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+i,m=r+1,h=new F,g=new F;for(let _=0;_<=p;_++){let v=0,y=0,b=0,x=0;if(_<=n){let t=_/n,r=t*Math.PI/2;y=-l-e*Math.cos(r),b=e*Math.sin(r),x=-e*Math.cos(r),v=t*u}else if(_<=n+i){let r=(_-n)/i;y=-l+r*t,b=e,x=0,v=u+r*d}else{let t=(_-n-i)/n,r=t*Math.PI/2;y=l+e*Math.sin(r),b=e*Math.cos(r),x=e*Math.sin(r),v=u+d+t*u}let S=Math.max(0,Math.min(1,v/f)),C=0;_===0?C=.5/r:_===p&&(C=-.5/r);for(let e=0;e<=r;e++){let t=e/r,n=t*Math.PI*2,i=Math.sin(n),a=Math.cos(n);g.x=-b*a,g.y=y,g.z=b*i,o.push(g.x,g.y,g.z),h.set(-b*a,x,b*i),h.normalize(),s.push(h.x,h.y,h.z),c.push(t+C,S)}if(_>0){let e=(_-1)*m;for(let t=0;t<r;t++){let n=e+t,r=e+t+1,i=_*m+t,o=_*m+t+1;a.push(n,r,i),a.push(r,o,i)}}}this.setIndex(a),this.setAttribute(`position`,new Ji(o,3)),this.setAttribute(`normal`,new Ji(s,3)),this.setAttribute(`uv`,new Ji(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},es=class e extends oa{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new F,l=new P;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new Ji(a,3)),this.setAttribute(`normal`,new Ji(o,3)),this.setAttribute(`uv`,new Ji(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},L=class e extends oa{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Ji(u,3)),this.setAttribute(`normal`,new Ji(d,3)),this.setAttribute(`uv`,new Ji(f,2));function _(){let a=new F,_=new F,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new P,m=new F,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ts=class e extends L{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ns=class e extends oa{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Ji(i,3)),this.setAttribute(`normal`,new Ji(i.slice(),3)),this.setAttribute(`uv`,new Ji(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new F,r=new F,i=new F;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new F;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new F;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new F,t=new F,n=new F,r=new F,o=new P,s=new P,c=new P;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},rs=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){N(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new P:new F);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new F,r=[],i=[],a=[],o=new F,s=new kr;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new F)}i[0]=new F,a[0]=new F;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(er(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(er(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},is=class extends rs{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new P){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},as=class extends is{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function os(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var ss=new F,cs=new F,ls=new os,us=new os,ds=new os,fs=class extends rs{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new F){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(cs.subVectors(r[0],r[1]).add(r[0]),c=cs);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(ss.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=ss),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),ls.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),us.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),ds.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(ls.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),us.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),ds.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(ls.calc(s),us.calc(s),ds.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new F().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function ps(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function ms(e,t){let n=1-e;return n*n*t}function hs(e,t){return 2*(1-e)*e*t}function gs(e,t){return e*e*t}function _s(e,t,n,r){return ms(e,t)+hs(e,n)+gs(e,r)}function vs(e,t){let n=1-e;return n*n*n*t}function ys(e,t){let n=1-e;return 3*n*n*e*t}function bs(e,t){return 3*(1-e)*e*e*t}function xs(e,t){return e*e*e*t}function Ss(e,t,n,r,i){return vs(e,t)+ys(e,n)+bs(e,r)+xs(e,i)}var Cs=class extends rs{constructor(e=new P,t=new P,n=new P,r=new P){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new P){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ss(e,r.x,i.x,a.x,o.x),Ss(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ws=class extends rs{constructor(e=new F,t=new F,n=new F,r=new F){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new F){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ss(e,r.x,i.x,a.x,o.x),Ss(e,r.y,i.y,a.y,o.y),Ss(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ts=class extends rs{constructor(e=new P,t=new P){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new P){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Es=class extends rs{constructor(e=new F,t=new F){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new F){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new F){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ds=class extends rs{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(_s(e,r.x,i.x,a.x),_s(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Os=class extends rs{constructor(e=new F,t=new F,n=new F){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new F){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(_s(e,r.x,i.x,a.x),_s(e,r.y,i.y,a.y),_s(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ks=class extends rs{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new P){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(ps(o,s.x,c.x,l.x,u.x),ps(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new P().fromArray(n))}return this}},As=Object.freeze({__proto__:null,ArcCurve:as,CatmullRomCurve3:fs,CubicBezierCurve:Cs,CubicBezierCurve3:ws,EllipseCurve:is,LineCurve:Ts,LineCurve3:Es,QuadraticBezierCurve:Ds,QuadraticBezierCurve3:Os,SplineCurve:ks}),js=class extends rs{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new As[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new As[n.type]().fromJSON(n))}return this}},Ms=class extends js{constructor(e){super(),this.type=`Path`,this.currentPoint=new P,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ts(this.currentPoint.clone(),new P(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new Ds(this.currentPoint.clone(),new P(e,t),new P(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new Cs(this.currentPoint.clone(),new P(e,t),new P(n,r),new P(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new ks([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new is(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ns=class extends Ms{constructor(e){super(e),this.uuid=$n(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new Ms().fromJSON(n))}return this}};function Ps(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=Fs(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=Hs(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return Ls(a,o,n,s,c,l,0),o}function Fs(e,t,n,r,i){let a;if(i===fc(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=lc(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=lc(i/r|0,e[i],e[i+1],a);return a&&tc(a,a.next)&&(uc(a),a=a.next),a}function Is(e,t){if(!e)return e;t||(t=e);let n=e,r;do if(r=!1,!n.steiner&&(tc(n,n.next)||ec(n.prev,n,n.next)===0)){if(uc(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function Ls(e,t,n,r,i,a,o){if(!e)return;!o&&a&&qs(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?zs(e,r,i,a):Rs(e)){t.push(c.i,e.i,l.i),uc(e),e=l.next,s=l.next;continue}if(e=l,e===s){o?o===1?(e=Bs(Is(e),t),Ls(e,t,n,r,i,a,2)):o===2&&Vs(e,t,n,r,i,a):Ls(Is(e),t,n,r,i,a,1);break}}}function Rs(e){let t=e.prev,n=e,r=e.next;if(ec(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&Qs(i,s,a,c,o,l,m.x,m.y)&&ec(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function zs(e,t,n,r){let i=e.prev,a=e,o=e.next;if(ec(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=Ys(p,m,t,n,r),v=Ys(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Qs(s,u,c,d,l,f,y.x,y.y)&&ec(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Qs(s,u,c,d,l,f,b.x,b.y)&&ec(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Qs(s,u,c,d,l,f,y.x,y.y)&&ec(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Qs(s,u,c,d,l,f,b.x,b.y)&&ec(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Bs(e,t){let n=e;do{let r=n.prev,i=n.next.next;!tc(r,i)&&nc(r,n,n.next,i)&&oc(r,i)&&oc(i,r)&&(t.push(r.i,n.i,i.i),uc(n),uc(n.next),n=e=i),n=n.next}while(n!==e);return Is(n)}function Vs(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&$s(o,e)){let s=cc(o,e);o=Is(o,o.next),s=Is(s,s.next),Ls(o,t,n,r,i,a,0),Ls(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function Hs(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=Fs(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(Xs(o))}i.sort(Us);for(let e=0;e<i.length;e++)n=Ws(i[e],n);return n}function Us(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function Ws(e,t){let n=Gs(e,t);if(!n)return t;let r=cc(n,e);return Is(r,r.next),Is(n,n.next)}function Gs(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(tc(e,n))return n;do{if(tc(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&Zs(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);oc(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&Ks(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function Ks(e,t){return ec(e.prev,e,t.prev)<0&&ec(t.next,e,e.next)<0}function qs(e,t,n,r){let i=e;do i.z===0&&(i.z=Ys(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,Js(i)}function Js(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function Ys(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Xs(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Zs(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Qs(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&Zs(e,t,n,r,i,a,o,s)}function $s(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!ac(e,t)&&(oc(e,t)&&oc(t,e)&&sc(e,t)&&(ec(e.prev,e,t.prev)||ec(e,t.prev,t))||tc(e,t)&&ec(e.prev,e,e.next)>0&&ec(t.prev,t,t.next)>0)}function ec(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function tc(e,t){return e.x===t.x&&e.y===t.y}function nc(e,t,n,r){let i=ic(ec(e,t,n)),a=ic(ec(e,t,r)),o=ic(ec(n,r,e)),s=ic(ec(n,r,t));return!!(i!==a&&o!==s||i===0&&rc(e,n,t)||a===0&&rc(e,r,t)||o===0&&rc(n,e,r)||s===0&&rc(n,t,r))}function rc(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function ic(e){return e>0?1:e<0?-1:0}function ac(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&nc(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function oc(e,t){return ec(e.prev,e,e.next)<0?ec(e,t,e.next)>=0&&ec(e,e.prev,t)>=0:ec(e,t,e.prev)<0||ec(e,e.next,t)<0}function sc(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function cc(e,t){let n=dc(e.i,e.x,e.y),r=dc(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function lc(e,t,n,r){let i=dc(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function uc(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function dc(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function fc(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var pc=class{static triangulate(e,t,n=2){return Ps(e,t,n)}},mc=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];hc(e),gc(n,e);let a=e.length;t.forEach(hc);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,gc(n,t[e]);let o=pc.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function hc(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function gc(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var _c=class e extends oa{constructor(e=new Ns([new P(.5,.5),new P(-.5,.5),new P(-.5,-.5),new P(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new Ji(r,3)),this.setAttribute(`uv`,new Ji(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?vc:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new F,b=new F,x=new F}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!mc.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];mc.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));if(s<=10000000000000001e-36*c*c){e.splice(r,1),n--;continue}t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||Gn(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let ee=C.length;function te(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new P(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new P(r/a,i/a)}let ne=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),ne[e]=te(D[e],D[n],D[r]);let re=[],k,ie=ne.concat();for(let e=0,t=E;e<t;e++){let t=w[e];k=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),k[e]=te(t[e],t[r],t[i]);re.push(k),ie=ie.concat(k)}let ae;if(p===0)ae=mc.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],ne[t],a);de(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];k=re[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],k[e],a);de(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}ae=mc.triangulateShape(e,t)}let oe=ae.length,se=d+f;for(let e=0;e<ee;e++){let t=l?O(C[e],ie[e],se):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),de(x.x,x.y,x.z)):de(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<ee;t++){let n=l?O(C[t],ie[t],se):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),de(x.x,x.y,x.z)):de(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],ne[e],r);de(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];k=re[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],k[e],r);_?de(i.x,i.y+g[s-1].y,g[s-1].x+n):de(i.x,i.y,c+n)}}}ce(),le();function ce(){let e=r.length/3;if(l){let e=0,t=ee*e;for(let e=0;e<oe;e++){let n=ae[e];fe(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=ee*e;for(let e=0;e<oe;e++){let n=ae[e];fe(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<oe;e++){let t=ae[e];fe(t[2],t[1],t[0])}for(let e=0;e<oe;e++){let t=ae[e];fe(t[0]+ee*s,t[1]+ee*s,t[2]+ee*s)}}n.addGroup(e,r.length/3-e,0)}function le(){let e=r.length/3,t=0;ue(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];ue(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function ue(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=ee*e,a=ee*(e+1);pe(t+r+n,t+i+n,t+i+a,t+r+a)}}}function de(e,t,n){a.push(e),a.push(t),a.push(n)}function fe(e,t,i){me(e),me(t),me(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);he(o[0]),he(o[1]),he(o[2])}function pe(e,t,i,a){me(e),me(t),me(a),me(t),me(i),me(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);he(s[0]),he(s[1]),he(s[3]),he(s[1]),he(s[2]),he(s[3])}function me(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function he(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return yc(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new As[i.type]().fromJSON(i)),new e(r,t.options)}},vc={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new P(a,o),new P(s,c),new P(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new P(o,1-c),new P(l,1-d),new P(f,1-m),new P(h,1-_)]:[new P(s,1-c),new P(u,1-d),new P(p,1-m),new P(g,1-_)]}};function yc(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var bc=class e extends ns{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},xc=class e extends oa{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Ji(p,3)),this.setAttribute(`normal`,new Ji(m,3)),this.setAttribute(`uv`,new Ji(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Sc=class e extends oa{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new F,p=new P;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new Ji(s,3)),this.setAttribute(`normal`,new Ji(c,3)),this.setAttribute(`uv`,new Ji(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Cc=class e extends oa{constructor(e=new Ns([new P(0,.5),new P(-.5,-.5),new P(.5,-.5)]),t=12){super(),this.type=`ShapeGeometry`,this.parameters={shapes:e,curveSegments:t};let n=[],r=[],i=[],a=[],o=0,s=0;if(Array.isArray(e)===!1)c(e);else for(let t=0;t<e.length;t++)c(e[t]),this.addGroup(o,s,t),o+=s,s=0;this.setIndex(n),this.setAttribute(`position`,new Ji(r,3)),this.setAttribute(`normal`,new Ji(i,3)),this.setAttribute(`uv`,new Ji(a,2));function c(e){let o=r.length/3,c=e.extractPoints(t),l=c.shape,u=c.holes;mc.isClockWise(l)===!1&&(l=l.reverse());for(let e=0,t=u.length;e<t;e++){let t=u[e];mc.isClockWise(t)===!0&&(u[e]=t.reverse())}let d=mc.triangulateShape(l,u);for(let e=0,t=u.length;e<t;e++){let t=u[e];l=l.concat(t)}for(let e=0,t=l.length;e<t;e++){let t=l[e];r.push(t.x,t.y,0),i.push(0,0,1),a.push(t.x,t.y)}for(let e=0,t=d.length;e<t;e++){let t=d[e],r=t[0]+o,i=t[1]+o,a=t[2]+o;n.push(r,i,a),s+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return wc(t,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}return new e(r,t.curveSegments)}};function wc(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,r=e.length;n<r;n++){let r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}var R=class e extends oa{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new F,d=new F,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Ji(p,3)),this.setAttribute(`normal`,new Ji(m,3)),this.setAttribute(`uv`,new Ji(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Tc=class e extends oa{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new F,f=new F,p=new F;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new Ji(c,3)),this.setAttribute(`normal`,new Ji(l,3)),this.setAttribute(`uv`,new Ji(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},Ec=class e extends oa{constructor(e=new Os(new F(-1,-1,0),new F(-1,1,0),new F(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new F,s=new F,c=new P,l=new F,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new Ji(u,3)),this.setAttribute(`normal`,new Ji(d,3)),this.setAttribute(`uv`,new Ji(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new As[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function Dc(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(kc(i))i.isRenderTargetTexture?(N(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(kc(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Oc(e){let t={};for(let n=0;n<e.length;n++){let r=Dc(e[n]);for(let e in r)t[e]=r[e]}return t}function kc(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Ac(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function jc(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:pr.workingColorSpace}var Mc={clone:Dc,merge:Oc},Nc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Pc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Fc=class extends ha{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nc,this.fragmentShader=Pc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Dc(e.uniforms),this.uniformsGroups=Ac(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new I().setHex(r.value);break;case`v2`:this.uniforms[n].value=new P().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new F().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new wr().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new cr().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new kr().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ic=class extends Fc{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Lc=class extends ha{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:``},this.type=`MeshToonMaterial`,this.color=new I(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new I(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new P(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Rc=class extends ha{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new I(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new I(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new P(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zr,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},zc=class extends ha{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=kn,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Bc=class extends ha{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Vc(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Hc(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Uc=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Wc=class extends Uc{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:En,endingEnd:En}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Dn:i=e,o=2*t-n;break;case On:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Dn:a=e,s=2*n-t;break;case On:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Gc=class extends Uc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Kc=class extends Uc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},qc=class extends Uc{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Xc(n,t,g,y,r);i[p]=Jc(x,o,_,b,m)}return i}};function Jc(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Yc(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Xc(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Jc(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Yc(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Zc=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Vc(t,this.TimeBufferType),this.values=Vc(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Vc(e.times,Array),values:Vc(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Hc(e.settings)&&(n.settings={inTangents:Vc(e.settings.inTangents,Array),outTangents:Vc(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Kc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Gc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Wc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new qc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Sn:t=this.InterpolantFactoryMethodDiscrete;break;case Cn:t=this.InterpolantFactoryMethodLinear;break;case wn:t=this.InterpolantFactoryMethodSmooth;break;case Tn:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return N(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Sn;case this.InterpolantFactoryMethodLinear:return Cn;case this.InterpolantFactoryMethodSmooth:return wn;case this.InterpolantFactoryMethodBezier:return Tn}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Hc(this.settings)&&(Qc(this.settings.inTangents,e),Qc(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Gn(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(Gn(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){Gn(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){Gn(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&zn(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){Gn(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===wn,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Hc(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Qc(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Zc.prototype.ValueTypeName=``,Zc.prototype.TimeBufferType=Float32Array,Zc.prototype.ValueBufferType=Float32Array,Zc.prototype.DefaultInterpolation=Cn;var $c=class extends Zc{constructor(e,t,n){super(e,t,n)}};$c.prototype.ValueTypeName=`bool`,$c.prototype.ValueBufferType=Array,$c.prototype.DefaultInterpolation=Sn,$c.prototype.InterpolantFactoryMethodLinear=void 0,$c.prototype.InterpolantFactoryMethodSmooth=void 0;var el=class extends Zc{constructor(e,t,n,r){super(e,t,n,r)}};el.prototype.ValueTypeName=`color`;var tl=class extends Zc{constructor(e,t,n,r){super(e,t,n,r)}};tl.prototype.ValueTypeName=`number`;var nl=class extends Uc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)ar.slerpFlat(i,0,a,c-o,a,c,s);return i}},rl=class extends Zc{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new nl(this.times,this.values,this.getValueSize(),e)}};rl.prototype.ValueTypeName=`quaternion`,rl.prototype.InterpolantFactoryMethodSmooth=void 0;var il=class extends Zc{constructor(e,t,n){super(e,t,n)}};il.prototype.ValueTypeName=`string`,il.prototype.ValueBufferType=Array,il.prototype.DefaultInterpolation=Sn,il.prototype.InterpolantFactoryMethodLinear=void 0,il.prototype.InterpolantFactoryMethodSmooth=void 0;var al=class extends Zc{constructor(e,t,n,r){super(e,t,n,r)}};al.prototype.ValueTypeName=`vector`;var ol=class extends ni{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new I(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},sl=class extends ol{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(ni.DEFAULT_UP),this.updateMatrix(),this.groundColor=new I(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},cl=new kr,ll=new F,ul=new F,dl=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new P(512,512),this.mapType=gt,this.map=null,this.mapPass=null,this.matrix=new kr,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Eo,this._frameExtents=new P(1,1),this._viewportCount=1,this._viewports=[new wr(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;ll.setFromMatrixPosition(e.matrixWorld),t.position.copy(ll),ul.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ul),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){cl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(cl,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(cl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},fl=new F,pl=new ar,ml=new F,hl=class extends ni{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new kr,this.projectionMatrix=new kr,this.projectionMatrixInverse=new kr,this.coordinateSystem=Ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(fl,pl,ml),ml.x===1&&ml.y===1&&ml.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fl,pl,ml.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(fl,pl,ml),ml.x===1&&ml.y===1&&ml.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fl,pl,ml.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},gl=new F,_l=new P,vl=new P,yl=class extends hl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Qn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Zn*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qn*2*Math.atan(Math.tan(Zn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){gl.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(gl.x,gl.y).multiplyScalar(-e/gl.z),gl.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(gl.x,gl.y).multiplyScalar(-e/gl.z)}getViewSize(e,t){return this.getViewBounds(e,_l,vl),t.subVectors(vl,_l)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Zn*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},bl=class extends hl{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},xl=class extends dl{constructor(){super(new bl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Sl=class extends ol{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(ni.DEFAULT_UP),this.updateMatrix(),this.target=new ni,this.shadow=new xl}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Cl=-90,wl=1,Tl=class extends ni{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new yl(Cl,wl,e,t);r.layers=this.layers,this.add(r);let i=new yl(Cl,wl,e,t);i.layers=this.layers,this.add(i);let a=new yl(Cl,wl,e,t);a.layers=this.layers,this.add(a);let o=new yl(Cl,wl,e,t);o.layers=this.layers,this.add(o);let s=new yl(Cl,wl,e,t);s.layers=this.layers,this.add(s);let c=new yl(Cl,wl,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},El=class extends yl{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Dl=`\\[\\]\\.:\\/`,Ol=RegExp(`[\\[\\]\\.:\\/]`,`g`),kl=`[^\\[\\]\\.:\\/]`,Al=`[^`+Dl.replace(`\\.`,``)+`]`,jl=`((?:WC+[\\/:])*)`.replace(`WC`,kl),Ml=`(WCOD+)?`.replace(`WCOD`,Al),Nl=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,kl),Pl=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,kl),Fl=RegExp(`^`+jl+Ml+Nl+Pl+`$`),Il=[`material`,`materials`,`bones`,`map`],Ll=class{constructor(e,t,n){let r=n||Rl.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Rl=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Ol,``)}static parseTrackName(e){let t=Fl.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Il.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){N(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){Gn(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){Gn(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){Gn(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){Gn(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){Gn(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){Gn(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){Gn(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;Gn(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){Gn(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){Gn(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Rl.Composite=Ll,Rl.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Rl.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Rl.prototype.GetterByBindingType=[Rl.prototype._getValue_direct,Rl.prototype._getValue_array,Rl.prototype._getValue_arrayElement,Rl.prototype._getValue_toArray],Rl.prototype.SetterByBindingTypeAndVersioning=[[Rl.prototype._setValue_direct,Rl.prototype._setValue_direct_setNeedsUpdate,Rl.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Rl.prototype._setValue_array,Rl.prototype._setValue_array_setNeedsUpdate,Rl.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Rl.prototype._setValue_arrayElement,Rl.prototype._setValue_arrayElement_setNeedsUpdate,Rl.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Rl.prototype._setValue_fromArray,Rl.prototype._setValue_fromArray_setNeedsUpdate,Rl.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],nt=class{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}},nt.prototype.isMatrix2=!0;function zl(e,t,n,r){let i=Bl(r);switch(n){case kt:return e*t;case Pt:return e*t/i.components*i.byteLength;case Ft:return e*t/i.components*i.byteLength;case It:return e*t*2/i.components*i.byteLength;case Lt:return e*t*2/i.components*i.byteLength;case At:return e*t*3/i.components*i.byteLength;case jt:return e*t*4/i.components*i.byteLength;case Rt:return e*t*4/i.components*i.byteLength;case zt:case Bt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Vt:case Ht:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Wt:case Kt:return Math.max(e,16)*Math.max(t,8)/4;case Ut:case Gt:return Math.max(e,8)*Math.max(t,8)/2;case qt:case Jt:case Xt:case Zt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Yt:case Qt:case $t:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case en:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case tn:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case nn:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case rn:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case an:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case on:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case sn:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case cn:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ln:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case un:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case dn:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case fn:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case pn:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case mn:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case hn:case gn:case _n:return Math.ceil(e/4)*Math.ceil(t/4)*16;case vn:case yn:return Math.ceil(e/4)*Math.ceil(t/4)*8;case bn:case xn:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Bl(e){switch(e){case gt:case _t:return{byteLength:1,components:1};case yt:case vt:case Ct:return{byteLength:2,components:1};case wt:case Tt:return{byteLength:2,components:4};case xt:case bt:case St:return{byteLength:4,components:1};case Dt:case Ot:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?N(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function Vl(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Hl(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Ul={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},z={common:{diffuse:{value:new I(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new cr},alphaMap:{value:null},alphaMapTransform:{value:new cr},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new cr}},envmap:{envMap:{value:null},envMapRotation:{value:new cr},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new cr}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new cr}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new cr},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new cr},normalScale:{value:new P(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new cr},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new cr}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new cr}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new cr}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new I(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new I(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new cr},alphaTest:{value:0},uvTransform:{value:new cr}},sprite:{diffuse:{value:new I(16777215)},opacity:{value:1},center:{value:new P(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new cr},alphaMap:{value:null},alphaMapTransform:{value:new cr},alphaTest:{value:0}}},Wl={basic:{uniforms:Oc([z.common,z.specularmap,z.envmap,z.aomap,z.lightmap,z.fog]),vertexShader:Ul.meshbasic_vert,fragmentShader:Ul.meshbasic_frag},lambert:{uniforms:Oc([z.common,z.specularmap,z.envmap,z.aomap,z.lightmap,z.emissivemap,z.bumpmap,z.normalmap,z.displacementmap,z.fog,z.lights,{emissive:{value:new I(0)},envMapIntensity:{value:1}}]),vertexShader:Ul.meshlambert_vert,fragmentShader:Ul.meshlambert_frag},phong:{uniforms:Oc([z.common,z.specularmap,z.envmap,z.aomap,z.lightmap,z.emissivemap,z.bumpmap,z.normalmap,z.displacementmap,z.fog,z.lights,{emissive:{value:new I(0)},specular:{value:new I(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ul.meshphong_vert,fragmentShader:Ul.meshphong_frag},standard:{uniforms:Oc([z.common,z.envmap,z.aomap,z.lightmap,z.emissivemap,z.bumpmap,z.normalmap,z.displacementmap,z.roughnessmap,z.metalnessmap,z.fog,z.lights,{emissive:{value:new I(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ul.meshphysical_vert,fragmentShader:Ul.meshphysical_frag},toon:{uniforms:Oc([z.common,z.aomap,z.lightmap,z.emissivemap,z.bumpmap,z.normalmap,z.displacementmap,z.gradientmap,z.fog,z.lights,{emissive:{value:new I(0)}}]),vertexShader:Ul.meshtoon_vert,fragmentShader:Ul.meshtoon_frag},matcap:{uniforms:Oc([z.common,z.bumpmap,z.normalmap,z.displacementmap,z.fog,{matcap:{value:null}}]),vertexShader:Ul.meshmatcap_vert,fragmentShader:Ul.meshmatcap_frag},points:{uniforms:Oc([z.points,z.fog]),vertexShader:Ul.points_vert,fragmentShader:Ul.points_frag},dashed:{uniforms:Oc([z.common,z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ul.linedashed_vert,fragmentShader:Ul.linedashed_frag},depth:{uniforms:Oc([z.common,z.displacementmap]),vertexShader:Ul.depth_vert,fragmentShader:Ul.depth_frag},normal:{uniforms:Oc([z.common,z.bumpmap,z.normalmap,z.displacementmap,{opacity:{value:1}}]),vertexShader:Ul.meshnormal_vert,fragmentShader:Ul.meshnormal_frag},sprite:{uniforms:Oc([z.sprite,z.fog]),vertexShader:Ul.sprite_vert,fragmentShader:Ul.sprite_frag},background:{uniforms:{uvTransform:{value:new cr},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ul.background_vert,fragmentShader:Ul.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new cr}},vertexShader:Ul.backgroundCube_vert,fragmentShader:Ul.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ul.cube_vert,fragmentShader:Ul.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ul.equirect_vert,fragmentShader:Ul.equirect_frag},distance:{uniforms:Oc([z.common,z.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ul.distance_vert,fragmentShader:Ul.distance_frag},shadow:{uniforms:Oc([z.lights,z.fog,{color:{value:new I(0)},opacity:{value:1}}]),vertexShader:Ul.shadow_vert,fragmentShader:Ul.shadow_frag}};Wl.physical={uniforms:Oc([Wl.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new cr},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new cr},clearcoatNormalScale:{value:new P(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new cr},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new cr},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new cr},sheen:{value:0},sheenColor:{value:new I(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new cr},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new cr},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new cr},transmissionSamplerSize:{value:new P},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new cr},attenuationDistance:{value:0},attenuationColor:{value:new I(0)},specularColor:{value:new I(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new cr},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new cr},anisotropyVector:{value:new P},anisotropyMap:{value:null},anisotropyMapTransform:{value:new cr}}]),vertexShader:Ul.meshphysical_vert,fragmentShader:Ul.meshphysical_frag};var Gl={r:0,b:0,g:0},Kl=new kr,ql=new cr;ql.set(-1,0,0,0,1,0,0,0,1);function Jl(e,t,n,r,i,a){let o=new I(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Ya(new Qo(1,1,1),new Fc({name:`BackgroundCubeMaterial`,uniforms:Dc(Wl.backgroundCube.uniforms),vertexShader:Wl.backgroundCube.vertexShader,fragmentShader:Wl.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Kl.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ql),l.material.toneMapped=pr.getTransfer(i.colorSpace)!==Nn,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Ya(new xc(2,2),new Fc({name:`BackgroundMaterial`,uniforms:Dc(Wl.background.uniforms),vertexShader:Wl.background.vertexShader,fragmentShader:Wl.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=pr.getTransfer(i.colorSpace)!==Nn,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Gl,jc(e)),n.buffers.color.setClear(Gl.r,Gl.g,Gl.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Yl(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Xl(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Zl(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(N(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&N(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Ql(e){let t=this,n=null,r=0,i=!1,a=!1,o=new pa,s=new cr,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var $l=4,eu=6,tu=20,nu=256,ru=new bl,iu=new I,au=null,ou=0,su=0,cu=!1,lu=new F,uu=new F,du=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=lu}=i;au=this._renderer.getRenderTarget(),ou=this._renderer.getActiveCubeFace(),su=this._renderer.getActiveMipmapLevel(),cu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_u(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(au,ou,su),this._renderer.xr.enabled=cu,e.scissorTest=!1,mu(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),au=this._renderer.getRenderTarget(),ou=this._renderer.getActiveCubeFace(),su=this._renderer.getActiveMipmapLevel(),cu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:pt,minFilter:pt,generateMipmaps:!1,type:Ct,format:jt,colorSpace:jn,depthBuffer:!1},r=pu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pu(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=fu(r)),this._blurMaterial=gu(r,e,t),this._ggxMaterial=hu(r,e,t)}return r}_compileMaterial(e){let t=new Ya(new oa,e);this._renderer.compile(t,ru)}_sceneToCubeUV(e,t,n,r,i){let a=new yl(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(iu),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ya(new Qo,new La({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(iu),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;mu(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=vu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_u());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;mu(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,ru)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-$l?n-d+$l:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,mu(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,ru),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,mu(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,ru)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];mu(t,3*l*(r>this._lodMax-$l?r-this._lodMax+$l:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,ru)}};function fu(e){let t=[],n=[],r=e,i=e-$l+1+eu;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?uu.set(1,r,n):e===1?uu.set(-n,1,-r):e===2?uu.set(-n,r,1):e===3?uu.set(-1,r,-n):e===4?uu.set(-n,-1,r):uu.set(n,r,-1),uu.toArray(l,(e*6+t)*3)}}let u=new oa;u.setAttribute(`position`,new Gi(c,3)),u.setAttribute(`outputDirection`,new Gi(l,3)),n.push(new Ya(u,null)),r>$l&&r--}return{lodMeshes:n,sizeLods:t}}function pu(e,t,n){let r=new Er(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function mu(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function hu(e,t,n){return new Fc({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:nu,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:yu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function gu(e,t,n){return new Fc({name:`SphericalGaussianBlur`,defines:{SAMPLES:tu,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:yu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function _u(){return new Fc({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:yu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function vu(){return new Fc({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function yu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var bu=class extends Er{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new qo(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Qo(5,5,5),i=new Fc({name:`CubemapFromEquirect`,uniforms:Dc(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Ya(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=pt),new Tl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function xu(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new bu(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new du(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new du(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Su(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Kn(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Cu(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?qi:Ki)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function wu(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Tu(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:Gn(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Eu(e,t,n){let r=new WeakMap,i=new wr;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Dr(h,p,m,u);g.type=St,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new P(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Du(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Ou={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function ku(e,t,n,r,i,a){let o=new Er(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new oa;l.setAttribute(`position`,new Ji([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new Ji([0,2,0,0,2,0],2));let u=new Ic({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Ya(l,u),f=new bl(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new Er(t,n,{type:Ct,depthBuffer:!1,stencilBuffer:!1}),c=new Er(t,n,{type:Ct,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},pr.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Ou[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Au=new Cr,ju=new Yo(1,1),Mu=new Dr,Nu=new Or,Pu=new qo,Fu=[],Iu=[],Lu=new Float32Array(16),Ru=new Float32Array(9),zu=new Float32Array(4);function Bu(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Fu[i];if(a===void 0&&(a=new Float32Array(i),Fu[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Vu(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Hu(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Uu(e,t){let n=Iu[t];n===void 0&&(n=new Int32Array(t),Iu[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Wu(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Gu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Vu(n,t))return;e.uniform2fv(this.addr,t),Hu(n,t)}}function Ku(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Vu(n,t))return;e.uniform3fv(this.addr,t),Hu(n,t)}}function qu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Vu(n,t))return;e.uniform4fv(this.addr,t),Hu(n,t)}}function Ju(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Vu(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Hu(n,t)}else{if(Vu(n,r))return;zu.set(r),e.uniformMatrix2fv(this.addr,!1,zu),Hu(n,r)}}function Yu(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Vu(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Hu(n,t)}else{if(Vu(n,r))return;Ru.set(r),e.uniformMatrix3fv(this.addr,!1,Ru),Hu(n,r)}}function Xu(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Vu(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Hu(n,t)}else{if(Vu(n,r))return;Lu.set(r),e.uniformMatrix4fv(this.addr,!1,Lu),Hu(n,r)}}function Zu(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Qu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Vu(n,t))return;e.uniform2iv(this.addr,t),Hu(n,t)}}function $u(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Vu(n,t))return;e.uniform3iv(this.addr,t),Hu(n,t)}}function ed(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Vu(n,t))return;e.uniform4iv(this.addr,t),Hu(n,t)}}function td(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function nd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Vu(n,t))return;e.uniform2uiv(this.addr,t),Hu(n,t)}}function rd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Vu(n,t))return;e.uniform3uiv(this.addr,t),Hu(n,t)}}function id(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Vu(n,t))return;e.uniform4uiv(this.addr,t),Hu(n,t)}}function ad(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(ju.compareFunction=n.isReversedDepthBuffer()?518:515,a=ju):a=Au,n.setTexture2D(t||a,i)}function od(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Nu,i)}function sd(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Pu,i)}function cd(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Mu,i)}function ld(e){switch(e){case 5126:return Wu;case 35664:return Gu;case 35665:return Ku;case 35666:return qu;case 35674:return Ju;case 35675:return Yu;case 35676:return Xu;case 5124:case 35670:return Zu;case 35667:case 35671:return Qu;case 35668:case 35672:return $u;case 35669:case 35673:return ed;case 5125:return td;case 36294:return nd;case 36295:return rd;case 36296:return id;case 35678:case 36198:case 36298:case 36306:case 35682:return ad;case 35679:case 36299:case 36307:return od;case 35680:case 36300:case 36308:case 36293:return sd;case 36289:case 36303:case 36311:case 36292:return cd}}function ud(e,t){e.uniform1fv(this.addr,t)}function dd(e,t){let n=Bu(t,this.size,2);e.uniform2fv(this.addr,n)}function fd(e,t){let n=Bu(t,this.size,3);e.uniform3fv(this.addr,n)}function pd(e,t){let n=Bu(t,this.size,4);e.uniform4fv(this.addr,n)}function md(e,t){let n=Bu(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function hd(e,t){let n=Bu(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function gd(e,t){let n=Bu(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function _d(e,t){e.uniform1iv(this.addr,t)}function vd(e,t){e.uniform2iv(this.addr,t)}function yd(e,t){e.uniform3iv(this.addr,t)}function bd(e,t){e.uniform4iv(this.addr,t)}function xd(e,t){e.uniform1uiv(this.addr,t)}function Sd(e,t){e.uniform2uiv(this.addr,t)}function Cd(e,t){e.uniform3uiv(this.addr,t)}function wd(e,t){e.uniform4uiv(this.addr,t)}function Td(e,t,n){let r=this.cache,i=t.length,a=Uu(n,i);Vu(r,a)||(e.uniform1iv(this.addr,a),Hu(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?ju:Au;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Ed(e,t,n){let r=this.cache,i=t.length,a=Uu(n,i);Vu(r,a)||(e.uniform1iv(this.addr,a),Hu(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Nu,a[e])}function Dd(e,t,n){let r=this.cache,i=t.length,a=Uu(n,i);Vu(r,a)||(e.uniform1iv(this.addr,a),Hu(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Pu,a[e])}function Od(e,t,n){let r=this.cache,i=t.length,a=Uu(n,i);Vu(r,a)||(e.uniform1iv(this.addr,a),Hu(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Mu,a[e])}function kd(e){switch(e){case 5126:return ud;case 35664:return dd;case 35665:return fd;case 35666:return pd;case 35674:return md;case 35675:return hd;case 35676:return gd;case 5124:case 35670:return _d;case 35667:case 35671:return vd;case 35668:case 35672:return yd;case 35669:case 35673:return bd;case 5125:return xd;case 36294:return Sd;case 36295:return Cd;case 36296:return wd;case 35678:case 36198:case 36298:case 36306:case 35682:return Td;case 35679:case 36299:case 36307:return Ed;case 35680:case 36300:case 36308:case 36293:return Dd;case 36289:case 36303:case 36311:case 36292:return Od}}var Ad=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ld(t.type)}},jd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=kd(t.type)}},Md=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Nd=/(\w+)(\])?(\[|\.)?/g;function Pd(e,t){e.seq.push(t),e.map[t.id]=t}function Fd(e,t,n){let r=e.name,i=r.length;for(Nd.lastIndex=0;;){let a=Nd.exec(r),o=Nd.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Pd(n,l===void 0?new Ad(s,e,t):new jd(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Md(s),Pd(n,e)),n=e}}}var Id=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Fd(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Ld(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Rd=37297,zd=0;function Bd(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Vd=new cr;function Hd(e){pr._getMatrix(Vd,pr.workingColorSpace,e);let t=`mat3( ${Vd.elements.map(e=>e.toFixed(4))} )`;switch(pr.getTransfer(e)){case Mn:return[t,`LinearTransferOETF`];case Nn:return[t,`sRGBTransferOETF`];default:return N(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Ud(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Bd(e.getShaderSource(t),r)}return i}function Wd(e,t){let n=Hd(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Gd={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Kd(e,t){let n=Gd[t];return n===void 0?(N(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var qd=new F;function Jd(){return pr.getLuminanceCoefficients(qd),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${qd.x.toFixed(4)}, ${qd.y.toFixed(4)}, ${qd.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Yd(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Qd).join(`
`)}function Xd(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Zd(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Qd(e){return e!==``}function $d(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ef(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var tf=/^[ \t]*#include +<([\w\d./]+)>/gm;function nf(e){return e.replace(tf,af)}var rf=new Map;function af(e,t){let n=Ul[t];if(n===void 0){let e=rf.get(t);if(e!==void 0)n=Ul[e],N(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return nf(n)}var of=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sf(e){return e.replace(of,cf)}function cf(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function lf(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var uf={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function df(e){return uf[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var ff={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function pf(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:ff[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var mf={302:`ENVMAP_MODE_REFRACTION`};function hf(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:mf[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var gf={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function _f(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:gf[e.combine]||`ENVMAP_BLENDING_NONE`}function vf(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function yf(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=df(n),l=pf(n),u=hf(n),d=_f(n),f=vf(n),p=Yd(n),m=Xd(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Qd).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Qd).join(`
`),_.length>0&&(_+=`
`)):(g=[lf(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Qd).join(`
`),_=[lf(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Ul.tonemapping_pars_fragment,n.toneMapping===0?``:Kd(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Ul.colorspace_pars_fragment,Wd(`linearToOutputTexel`,n.outputColorSpace),Jd(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Qd).join(`
`)),o=nf(o),o=$d(o,n),o=ef(o,n),s=nf(s),s=$d(s,n),s=ef(s,n),o=sf(o),s=sf(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Ld(i,i.VERTEX_SHADER,y),S=Ld(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Ud(i,x,`vertex`),n=Ud(i,S,`fragment`);Gn(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):N(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Id(i,h),T=Zd(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Rd)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=zd++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var bf=0,xf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Sf(e),t.set(e,n)),n}},Sf=class{constructor(e){this.id=bf++,this.code=e,this.usedTimes=0}};function Cf(e){return e===1030||e===37490||e===36285}function wf(e,t,n,r,i,a){let o=new Br,s=new xf,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&N(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,ee,te;if(C){let e=Wl[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),ee=e.id,te=t.id}let ne=e.getRenderTarget(),re=e.state.buffers.depth.getReversed(),k=h.isInstancedMesh===!0,ie=h.isBatchedMesh===!0,ae=!!i.map,oe=!!i.matcap,se=!!x,ce=!!i.aoMap,le=!!i.lightMap,ue=!!i.bumpMap&&i.wireframe===!1,de=!!i.normalMap,fe=!!i.displacementMap,pe=!!i.emissiveMap,me=!!i.metalnessMap,he=!!i.roughnessMap,ge=i.anisotropy>0,_e=i.clearcoat>0,ve=i.dispersion>0,ye=i.retroreflectivity>0,be=i.iridescence>0,xe=i.sheen>0,Se=i.transmission>0,Ce=ge&&!!i.anisotropyMap,A=_e&&!!i.clearcoatMap,we=_e&&!!i.clearcoatNormalMap,Te=_e&&!!i.clearcoatRoughnessMap,Ee=be&&!!i.iridescenceMap,j=be&&!!i.iridescenceThicknessMap,De=xe&&!!i.sheenColorMap,Oe=xe&&!!i.sheenRoughnessMap,ke=!!i.specularMap,M=!!i.specularColorMap,Ae=!!i.specularIntensityMap,je=Se&&!!i.transmissionMap,Me=Se&&!!i.thicknessMap,Ne=!!i.gradientMap,Pe=!!i.alphaMap,Fe=i.alphaTest>0,Ie=!!i.alphaHash,Le=!!i.extensions,Re=0;i.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Re=e.toneMapping);let ze={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:ee,customFragmentShaderID:te,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:ie,batchingColor:ie&&h._colorsTexture!==null,instancing:k,instancingColor:k&&h.instanceColor!==null,instancingMorph:k&&h.morphTexture!==null,outputColorSpace:ne===null?e.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:pr.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ae,matcap:oe,envMap:se,envMapMode:se&&x.mapping,envMapCubeUVHeight:S,aoMap:ce,lightMap:le,bumpMap:ue,normalMap:de,displacementMap:fe,emissiveMap:pe,normalMapObjectSpace:de&&i.normalMapType===1,normalMapTangentSpace:de&&i.normalMapType===0,packedNormalMap:de&&i.normalMapType===0&&Cf(i.normalMap.format),metalnessMap:me,roughnessMap:he,anisotropy:ge,anisotropyMap:Ce,clearcoat:_e,clearcoatMap:A,clearcoatNormalMap:we,clearcoatRoughnessMap:Te,dispersion:ve,retroreflection:ye,iridescence:be,iridescenceMap:Ee,iridescenceThicknessMap:j,sheen:xe,sheenColorMap:De,sheenRoughnessMap:Oe,specularMap:ke,specularColorMap:M,specularIntensityMap:Ae,transmission:Se,transmissionMap:je,thicknessMap:Me,gradientMap:Ne,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Pe,alphaTest:Fe,alphaHash:Ie,combine:i.combine,mapUv:ae&&m(i.map.channel),aoMapUv:ce&&m(i.aoMap.channel),lightMapUv:le&&m(i.lightMap.channel),bumpMapUv:ue&&m(i.bumpMap.channel),normalMapUv:de&&m(i.normalMap.channel),displacementMapUv:fe&&m(i.displacementMap.channel),emissiveMapUv:pe&&m(i.emissiveMap.channel),metalnessMapUv:me&&m(i.metalnessMap.channel),roughnessMapUv:he&&m(i.roughnessMap.channel),anisotropyMapUv:Ce&&m(i.anisotropyMap.channel),clearcoatMapUv:A&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:we&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:j&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:De&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&m(i.sheenRoughnessMap.channel),specularMapUv:ke&&m(i.specularMap.channel),specularColorMapUv:M&&m(i.specularColorMap.channel),specularIntensityMapUv:Ae&&m(i.specularIntensityMap.channel),transmissionMapUv:je&&m(i.transmissionMap.channel),thicknessMapUv:Me&&m(i.thicknessMap.channel),alphaMapUv:Pe&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(de||ge),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(ae||Pe),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&de===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:re,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Re,decodeVideoTexture:ae&&i.map.isVideoTexture===!0&&pr.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:pe&&i.emissiveMap.isVideoTexture===!0&&pr.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Le&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Le&&i.extensions.multiDraw===!0||ie)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return ze.vertexUv1s=c.has(1),ze.vertexUv2s=c.has(2),ze.vertexUv3s=c.has(3),c.clear(),ze}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Wl[t];n=Mc.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new yf(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Tf(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Ef(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Df(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Of(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Ef),r.length>1&&r.sort(t||Df),i.length>1&&i.sort(t||Df)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function kf(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Of,e.set(t,[i])):n>=r.length?(i=new Of,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Af(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new F,color:new I};break;case`SpotLight`:n={position:new F,direction:new F,color:new I,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new F,color:new I,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new F,skyColor:new I,groundColor:new I};break;case`RectAreaLight`:n={color:new I,position:new F,halfWidth:new F,halfHeight:new F}}return e[t.id]=n,n}}}function jf(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new P};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new P};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new P,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Mf=0;function Nf(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Pf(e){let t=new Af,n=jf(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new F);let i=new F,a=new kr,o=new kr;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Nf);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=z.LTC_FLOAT_1,r.rectAreaLTC2=z.LTC_FLOAT_2):(r.rectAreaLTC1=z.LTC_HALF_1,r.rectAreaLTC2=z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Mf++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Ff(e){let t=new Pf(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function If(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Ff(e),t.set(n,[a])):r>=i.length?(a=new Ff(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Lf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Rf=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,zf=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],Bf=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Vf=new kr,Hf=new F,Uf=new F;function Wf(e,t,n){let r=new Eo,i=new P,a=new P,o=new wr,s=new zc,c=new Bc,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new Fc({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new P},radius:{value:4}},vertexShader:Lf,fragmentShader:Rf}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new oa;m.setAttribute(`position`,new Gi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Ya(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(N(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){N(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){N(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Er(i.x,i.y,{format:It,type:Ct,minFilter:pt,magFilter:pt,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Yo(i.x,i.y,St),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Mt,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=ut,d.map.depthTexture.magFilter=ut}else l.isPointLight?(d.map=new bu(i.x),d.map.depthTexture=new Xo(i.x,xt)):(d.map=new Er(i.x,i.y),d.map.depthTexture=new Yo(i.x,i.y,xt)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Mt,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=pt,d.map.depthTexture.magFilter=pt):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=ut,d.map.depthTexture.magFilter=ut);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Hf.setFromMatrixPosition(l.matrixWorld),e.position.copy(Hf),Uf.copy(e.position),Uf.add(zf[t]),e.up.copy(Bf[t]),e.lookAt(Uf),e.updateMatrixWorld(),n.makeTranslation(-Hf.x,-Hf.y,-Hf.z),Vf.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Vf,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new Er(i.x,i.y,{format:It,type:Ct}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Gf(e,t){function n(){let t=!1,n=new wr,r=null,i=new wr(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?me(e.DEPTH_TEST):he(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Jn[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?me(e.STENCIL_TEST):he(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new I(0,0,0),T=0,E=!1,D=null,O=null,ee=null,te=null,ne=null,re=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,ie=0,ae=e.getParameter(e.VERSION);ae.indexOf(`WebGL`)===-1?ae.indexOf(`OpenGL ES`)!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(ae)[1]),k=ie>=2):(ie=parseFloat(/^WebGL (\d)/.exec(ae)[1]),k=ie>=1);let oe=null,se={},ce=e.getParameter(e.SCISSOR_BOX),le=e.getParameter(e.VIEWPORT),ue=new wr().fromArray(ce),de=new wr().fromArray(le);function fe(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let pe={};pe[e.TEXTURE_2D]=fe(e.TEXTURE_2D,e.TEXTURE_2D,1),pe[e.TEXTURE_CUBE_MAP]=fe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[e.TEXTURE_2D_ARRAY]=fe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),pe[e.TEXTURE_3D]=fe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),me(e.DEPTH_TEST),o.setFunc(3),Ce(!1),A(1),me(e.CULL_FACE),xe(0);function me(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function he(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ge(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function _e(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ve(t){return h!==t&&(e.useProgram(t),h=t,!0)}let ye={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ye[103]=e.MIN,ye[104]=e.MAX;let be={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function xe(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(he(e.BLEND),g=!1);return}if(g===!1&&(me(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Gn(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:Gn(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:Gn(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:Gn(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a=a||n,o=o||r,s=s||i,(n!==v||a!==x)&&(e.blendEquationSeparate(ye[n],ye[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(be[r],be[i],be[o],be[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function Se(t,n){t.side===2?he(e.CULL_FACE):me(e.CULL_FACE);let r=t.side===1;n&&(r=!r),Ce(r),t.blending===1&&t.transparent===!1?xe(0):xe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Te(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?me(e.SAMPLE_ALPHA_TO_COVERAGE):he(e.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function A(t){t===0?he(e.CULL_FACE):(me(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function we(t){t!==ee&&(k&&e.lineWidth(t),ee=t)}function Te(t,n,r){t?(me(e.POLYGON_OFFSET_FILL),(te!==n||ne!==r)&&(te=n,ne=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):he(e.POLYGON_OFFSET_FILL)}function Ee(t){t?me(e.SCISSOR_TEST):he(e.SCISSOR_TEST)}function j(t){t===void 0&&(t=e.TEXTURE0+re-1),oe!==t&&(e.activeTexture(t),oe=t)}function De(t,n,r){r===void 0&&(r=oe===null?e.TEXTURE0+re-1:oe);let i=se[r];i===void 0&&(i={type:void 0,texture:void 0},se[r]=i),(i.type!==t||i.texture!==n)&&(oe!==r&&(e.activeTexture(r),oe=r),e.bindTexture(t,n||pe[t]),i.type=t,i.texture=n)}function Oe(){let t=se[oe];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function ke(){try{e.compressedTexImage2D(...arguments)}catch(e){Gn(`WebGLState:`,e)}}function M(){try{e.compressedTexImage3D(...arguments)}catch(e){Gn(`WebGLState:`,e)}}function Ae(){try{e.texSubImage2D(...arguments)}catch(e){Gn(`WebGLState:`,e)}}function je(){try{e.texSubImage3D(...arguments)}catch(e){Gn(`WebGLState:`,e)}}function Me(){try{e.compressedTexSubImage2D(...arguments)}catch(e){Gn(`WebGLState:`,e)}}function Ne(){try{e.compressedTexSubImage3D(...arguments)}catch(e){Gn(`WebGLState:`,e)}}function Pe(){try{e.texStorage2D(...arguments)}catch(e){Gn(`WebGLState:`,e)}}function Fe(){try{e.texStorage3D(...arguments)}catch(e){Gn(`WebGLState:`,e)}}function Ie(){try{e.texImage2D(...arguments)}catch(e){Gn(`WebGLState:`,e)}}function Le(){try{e.texImage3D(...arguments)}catch(e){Gn(`WebGLState:`,e)}}function Re(t){return d[t]===void 0?e.getParameter(t):d[t]}function ze(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Be(t){ue.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ue.copy(t))}function Ve(t){de.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),de.copy(t))}function He(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ue(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function We(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},oe=null,se={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new I(0,0,0),T=0,E=!1,D=null,O=null,ee=null,te=null,ne=null,ue.set(0,0,e.canvas.width,e.canvas.height),de.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:me,disable:he,bindFramebuffer:ge,drawBuffers:_e,useProgram:ve,setBlending:xe,setMaterial:Se,setFlipSided:Ce,setCullFace:A,setLineWidth:we,setPolygonOffset:Te,setScissorTest:Ee,activeTexture:j,bindTexture:De,unbindTexture:Oe,compressedTexImage2D:ke,compressedTexImage3D:M,texImage2D:Ie,texImage3D:Le,pixelStorei:ze,getParameter:Re,updateUBOMapping:He,uniformBlockBinding:Ue,texStorage2D:Pe,texStorage3D:Fe,texSubImage2D:Ae,texSubImage3D:je,compressedTexSubImage2D:Me,compressedTexSubImage3D:Ne,scissor:Be,viewport:Ve,reset:We}}function Kf(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new P,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):Bn(`canvas`)}function g(e,t,n){let r=1,i=ke(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),N(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&N(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];N(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||N(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Mn:pr.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,N(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function ee(){O=0}function te(){return O}function ne(e){O=e}function re(){let e=O;return e>=i.maxTextures&&N(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function k(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ie(t,i){let a=r.get(t);if(t.isVideoTexture&&De(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)N(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)N(`WebGLRenderer: Texture marked for update but image is incomplete`);else{he(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function ae(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){he(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function oe(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){he(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function se(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){ge(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ce={[st]:e.REPEAT,[ct]:e.CLAMP_TO_EDGE,[lt]:e.MIRRORED_REPEAT},le={[ut]:e.NEAREST,[dt]:e.NEAREST_MIPMAP_NEAREST,[ft]:e.NEAREST_MIPMAP_LINEAR,[pt]:e.LINEAR,[mt]:e.LINEAR_MIPMAP_NEAREST,[ht]:e.LINEAR_MIPMAP_LINEAR},ue={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function de(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&N(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ce[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ce[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ce[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,le[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,le[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ue[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function fe(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=k(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function pe(e,t,n){return Math.floor(Math.floor(e/n)/t)}function me(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=pe(n.start,r.width,4),c=pe(t.start,r.width,4);n.start<=i+1&&a===c&&pe(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function he(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=fe(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=pr.getPrimaries(pr.workingColorSpace),r=o.colorSpace===``?null:pr.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Oe(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);de(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===Nt,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&me(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=zl(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else N(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?N(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=zl(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=ke(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=ke(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ge(t,o,s){if(o.image.length!==6)return;let c=fe(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=pr.getPrimaries(pr.workingColorSpace),r=o.colorSpace===``?null:pr.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Oe(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);de(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?N(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=ke(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function _e(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),j(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Ee(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ve(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;j(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ee(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ee(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);j(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ee(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ee(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ye(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),de(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else ie(i.depthTexture,0);let u=l.__webglTexture,d=Ee(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)j(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)j(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function be(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)ye(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?ye(i.__webglFramebuffer[0],t,0):ye(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),ve(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),ve(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function xe(t,n,i){let a=r.get(t);n!==void 0&&_e(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&be(t)}function Se(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&j(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Ee(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),ve(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),de(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)_e(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else _e(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),de(c,a),_e(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),de(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)_e(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else _e(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&be(t)}function Ce(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let A=[],we=[];function Te(t){if(t.samples>0){if(j(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(A.length=0,we.length=0,A.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(A.push(l),we.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,we)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,A))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ee(e){return Math.min(i.maxSamples,e.samples)}function j(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function De(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Oe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(pr.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&N(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):Gn(`WebGLTextures: Unsupported texture color space:`,n)),t}function ke(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=re,this.resetTextureUnits=ee,this.getTextureUnits=te,this.setTextureUnits=ne,this.setTexture2D=ie,this.setTexture2DArray=ae,this.setTexture3D=oe,this.setTextureCube=se,this.rebindTextures=xe,this.setupRenderTarget=Se,this.updateRenderTargetMipmap=Ce,this.updateMultisampleRenderTarget=Te,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=j,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function qf(e,t){function n(n,r=``){let i,a=pr.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Jf=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Yf=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Xf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Zo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Fc({vertexShader:Jf,fragmentShader:Yf,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ya(new xc(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Zf=class extends Yn{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Xf,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new P,C=null,w=null,T=new yl;T.viewport=new wr;let E=new yl;E.viewport=new wr;let D=[T,E],O=new El,ee=null,te=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new ai,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new ai,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new ai,b[e]=t),t.getHandSpace()};function ne(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function re(){r.removeEventListener(`select`,ne),r.removeEventListener(`selectstart`,ne),r.removeEventListener(`selectend`,ne),r.removeEventListener(`squeeze`,ne),r.removeEventListener(`squeezestart`,ne),r.removeEventListener(`squeezeend`,ne),r.removeEventListener(`end`,re),r.removeEventListener(`inputsourceschange`,k);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}ee=null,te=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,de.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&N(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&N(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,ne),r.addEventListener(`selectstart`,ne),r.addEventListener(`selectend`,ne),r.addEventListener(`squeeze`,ne),r.addEventListener(`squeezestart`,ne),r.addEventListener(`squeezeend`,ne),r.addEventListener(`end`,re),r.addEventListener(`inputsourceschange`,k),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?Nt:Mt,a=_.stencil?Et:xt);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Er(d.textureWidth,d.textureHeight,{format:jt,type:gt,depthTexture:new Yo(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Er(f.framebufferWidth,f.framebufferHeight,{format:jt,type:gt,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),de.setContext(r),de.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function k(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let ie=new F,ae=new F;function oe(e,t,n){ie.setFromMatrixPosition(t.matrixWorld),ae.setFromMatrixPosition(n.matrixWorld);let r=ie.distanceTo(ae),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function se(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(ee!==O.near||te!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),ee=O.near,te=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;se(O,i);for(let e=0;e<a.length;e++)se(a[e],i);a.length===2?oe(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),ce(e,O,i)};function ce(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Qn*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let le=null;function ue(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new yl,o.layers.enable(n),o.viewport=new wr,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Zo,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}le&&le(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let de=new Vl;de.setAnimationLoop(ue),this.setAnimationLoop=function(e){le=e},this.dispose=function(){}}},Qf=new kr,$f=new cr;$f.set(-1,0,0,0,1,0,0,0,1);function ep(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,jc(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Qf.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply($f),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function tp(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return Gn(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?N(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):N(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var np=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),rp=null;function ip(){return rp===null&&(rp=new lo(np,16,16,It,Ct),rp.name=`DFG_LUT`,rp.minFilter=pt,rp.magFilter=pt,rp.wrapS=ct,rp.wrapT=ct,rp.generateMipmaps=!1,rp.needsUpdate=!0),rp}var ap=class{constructor(e={}){let{canvas:t=Vn(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=gt}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Rt,Lt,Ft]),g=new Set([gt,xt,yt,Et,wt,Tt]),_=new Uint32Array(4),v=new Int32Array(4),y=new F,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,ee=null,te=null;this._outputColorSpace=An;let ne=0,re=0,k=null,ie=-1,ae=null,oe=new wr,se=new wr,ce=null,le=new I(0),ue=0,de=t.width,fe=t.height,pe=1,me=null,he=null,ge=new wr(0,0,de,fe),_e=new wr(0,0,de,fe),ve=!1,ye=new Eo,be=!1,xe=!1,Se=new kr,Ce=new F,A=new wr,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Te=!1;function Ee(){return k===null?pe:1}let j=n;function De(e,n){return t.getContext(e,n)}let Oe,ke,M,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,Qe,!1),t.addEventListener(`webglcontextrestored`,$e,!1),t.addEventListener(`webglcontextcreationerror`,et,!1),j===null){let t=`webgl2`;if(j=De(t,e),j===null)throw De(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Xe()}catch(e){throw t.removeEventListener(`webglcontextlost`,Qe,!1),t.removeEventListener(`webglcontextrestored`,$e,!1),t.removeEventListener(`webglcontextcreationerror`,et,!1),Gn(`WebGLRenderer: `+e.message),e}function Xe(){Oe=new Su(j),Oe.init(),qe=new qf(j,Oe),ke=new Zl(j,Oe,e,qe),M=new Gf(j,Oe),ke.reversedDepthBuffer&&d&&M.buffers.depth.setReversed(!0),O=j.createFramebuffer(),ee=j.createFramebuffer(),te=j.createFramebuffer(),Ae=new Tu(j),je=new Tf,Me=new Kf(j,Oe,M,je,ke,qe,Ae),Ne=new xu(T),Pe=new Hl(j),Je=new Yl(j,Pe),Fe=new Cu(j,Pe,Ae,Je),Ie=new Du(j,Fe,Pe,Je,Ae),We=new Eu(j,ke,Me),Ve=new Ql(je),Le=new wf(T,Ne,Oe,ke,Je,Ve),Re=new ep(T,je),ze=new kf,Be=new If(Oe),Ue=new Jl(T,Ne,M,Ie,p,s),He=new Wf(T,Ie,ke),Ye=new tp(j,Ae,ke,M),Ge=new Xl(j,Oe,Ae),Ke=new wu(j,Oe,Ae),Ae.programs=Le.programs,T.capabilities=ke,T.extensions=Oe,T.properties=je,T.renderLists=ze,T.shadowMap=He,T.state=M,T.info=Ae}m!==1009&&(w=new ku(m,t.width,t.height,o,r,i));let Ze=new Zf(T,j);this.xr=Ze,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){let e=Oe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Oe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return pe},this.setPixelRatio=function(e){e!==void 0&&(pe=e,this.setSize(de,fe,!1))},this.getSize=function(e){return e.set(de,fe)},this.setSize=function(e,n,r=!0){if(Ze.isPresenting){N(`WebGLRenderer: Can't change size while VR device is presenting.`);return}de=e,fe=n,t.width=Math.floor(e*pe),t.height=Math.floor(n*pe),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(de*pe,fe*pe).floor()},this.setDrawingBufferSize=function(e,n,r){de=e,fe=n,pe=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){Gn(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){N(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(oe)},this.getViewport=function(e){return e.copy(ge)},this.setViewport=function(e,t,n,r){e.isVector4?ge.set(e.x,e.y,e.z,e.w):ge.set(e,t,n,r),M.viewport(oe.copy(ge).multiplyScalar(pe).round())},this.getScissor=function(e){return e.copy(_e)},this.setScissor=function(e,t,n,r){e.isVector4?_e.set(e.x,e.y,e.z,e.w):_e.set(e,t,n,r),M.scissor(se.copy(_e).multiplyScalar(pe).round())},this.getScissorTest=function(){return ve},this.setScissorTest=function(e){M.setScissorTest(ve=e)},this.setOpaqueSort=function(e){me=e},this.setTransparentSort=function(e){he=e},this.getClearColor=function(e){return e.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor(...arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(k!==null){let t=k.texture.format;e=h.has(t)}if(e){let e=k.texture.type,t=g.has(e),n=Ue.getClearColor(),r=Ue.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,j.clearBufferuiv(j.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,j.clearBufferiv(j.COLOR,0,v))}else r|=j.COLOR_BUFFER_BIT}t&&(r|=j.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&j.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Qe,!1),t.removeEventListener(`webglcontextrestored`,$e,!1),t.removeEventListener(`webglcontextcreationerror`,et,!1),Ue.dispose(),ze.dispose(),Be.dispose(),je.dispose(),Ne.dispose(),Ie.dispose(),Je.dispose(),Ye.dispose(),Le.dispose(),Ze.dispose(),Ze.removeEventListener(`sessionstart`,st),Ze.removeEventListener(`sessionend`,ct),lt.stop()};function Qe(e){e.preventDefault(),Un(`WebGLRenderer: Context Lost.`),E=!0}function $e(){Un(`WebGLRenderer: Context Restored.`),E=!1;let e=Ae.autoReset,t=He.enabled,n=He.autoUpdate,r=He.needsUpdate,i=He.type;Xe(),Ae.autoReset=e,He.enabled=t,He.autoUpdate=n,He.needsUpdate=r,He.type=i}function et(e){Gn(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function tt(e){let t=e.target;t.removeEventListener(`dispose`,tt),nt(t)}function nt(e){rt(e),je.remove(e)}function rt(e){let t=je.get(e).programs;t!==void 0&&(t.forEach(function(e){Le.releaseProgram(e)}),e.isShaderMaterial&&Le.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=we);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Dt(e,t,n,r,i);M.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Fe.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Je.setup(i,r,s,n,c);let h,g=Ge;if(c!==null&&(h=Pe.get(c),g=Ke,g.setIndex(h)),i.isMesh)r.wireframe===!0?(M.setLineWidth(r.wireframeLinewidth*Ee()),g.setMode(j.LINES)):g.setMode(j.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),M.setLineWidth(e*Ee()),i.isLineSegments?g.setMode(j.LINES):i.isLineLoop?g.setMode(j.LINE_LOOP):g.setMode(j.LINE_STRIP)}else i.isPoints?g.setMode(j.POINTS):i.isSprite&&g.setMode(j.TRIANGLES);if(i.isBatchedMesh){if(Oe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Pe.get(c).bytesPerElement:1,o=je.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(j,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function it(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),be===!0&&Ve.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,_t(e,t,r),e.side=0,e.needsUpdate=!0,_t(e,t,r),e.side=2):_t(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Be.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),xe=this.localClippingEnabled,be=Ve.init(this.clippingPlanes,xe),be===!0&&Ve.setGlobalState(this.clippingPlanes,t),D!==null&&He.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];it(o,n,t,e),r.add(o)}else it(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=je.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Oe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let at=null;function ot(e){at&&at(e)}function st(){lt.stop()}function ct(){lt.start()}let lt=new Vl;lt.setAnimationLoop(ot),typeof self<`u`&&lt.setContext(self),this.setAnimationLoop=function(e){at=e,Ze.setAnimationLoop(e),e===null?lt.stop():lt.start()},Ze.addEventListener(`sessionstart`,st),Ze.addEventListener(`sessionend`,ct),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){Gn(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ze.enabled===!0&&Ze.isPresenting===!0,r=w!==null&&(k===null||n)&&w.begin(T,k);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ze.enabled===!0&&Ze.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ze.cameraAutoUpdate===!0&&Ze.updateCamera(t),t=Ze.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,k),x=Be.get(e,C.length),x.init(t),x.state.textureUnits=Me.getTextureUnits(),C.push(x),Se.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),ye.setFromProjectionMatrix(Se,Ln,t.reversedDepth),xe=this.localClippingEnabled,be=Ve.init(this.clippingPlanes,xe),b=ze.get(e,S.length),b.init(),S.push(b),Ze.enabled===!0&&Ze.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&ut(e,t,-1/0,T.sortObjects)}ut(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(me,he),Te=Ze.enabled===!1||Ze.isPresenting===!1||Ze.hasDepthSensing()===!1,Te&&Ue.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),be===!0&&Ve.beginShadows();let i=x.state.shadowsArray;if(He.render(i,e,t),be===!0&&Ve.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];ft(n,r,e,a)}Te&&Ue.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];dt(b,e,n,n.viewport)}}else r.length>0&&ft(n,r,e,t),Te&&Ue.render(e),dt(b,e,t)}k!==null&&re===0&&(Me.updateMultisampleRenderTarget(k),Me.updateRenderTargetMipmap(k)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Je.resetDefaultState(),ie=-1,ae=null,C.pop(),C.length>0?(x=C[C.length-1],Me.setTextureUnits(x.state.textureUnits),be===!0&&Ve.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function ut(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(ye)){r&&A.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Se);let i=Ie.update(e),a=e.material;a.visible&&b.push(e,i,a,n,A.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(ye))){let i=Ie.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),A.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),A.copy(e.boundingSphere.center)),A.applyMatrix4(e.matrixWorld).applyMatrix4(Se)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,A.z,s,t)}}else a.visible&&b.push(e,i,a,n,A.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)ut(i[e],t,n,r)}function dt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),be===!0&&Ve.setGlobalState(T.clippingPlanes,n),r&&M.viewport(oe.copy(r)),i.length>0&&pt(i,t,n),a.length>0&&pt(a,t,n),o.length>0&&pt(o,t,n),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function ft(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Oe.has(`EXT_color_buffer_half_float`)||Oe.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Er(1,1,{generateMipmaps:!0,type:e?Ct:gt,minFilter:ht,samples:Math.max(4,ke.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:pr.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||oe;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(le),ue=T.getClearAlpha(),ue<1&&T.setClearColor(16777215,.5),T.clear(),Te&&Ue.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),be===!0&&Ve.setGlobalState(T.clippingPlanes,r),pt(e,n,r),Me.updateMultisampleRenderTarget(a),Me.updateRenderTargetMipmap(a),Oe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,mt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Me.updateMultisampleRenderTarget(a),Me.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(le,ue),d!==void 0&&(r.viewport=d),T.toneMapping=u}function pt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&mt(o,t,n,s,l,c)}}function mt(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function _t(e,t,n){t.isScene!==!0&&(t=we);let r=je.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Le.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Le.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ne.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,tt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return bt(e,s),d}else s.uniforms=Le.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Le.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ve.uniform),bt(e,s),r.needsLights=kt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function vt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Id.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function bt(e,t){let n=je.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function St(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function Dt(e,t,n,r,i){t.isScene!==!0&&(t=we),Me.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=k===null?T.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:pr.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ne.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=je.get(r),y=x.state.lights;if(be===!0&&(xe===!0||e!==ae)){let t=e===ae&&r.id===ie;Ve.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ve.numPlanes||v.numIntersection!==Ve.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=_t(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),ee=v.uniforms;if(M.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==ie&&(ie=r.id,w=!0),v.needsLights){let e=St(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||ae!==e){M.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(j,`projectionMatrix`,e.projectionMatrix),O.setValue(j,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(j,Ce.setFromMatrixPosition(e.matrixWorld)),ke.logarithmicDepthBuffer&&O.setValue(j,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(j,`isOrthographic`,e.isOrthographicCamera===!0),ae!==e&&(ae=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(j,`sunShadowMap`,y.state.sunShadowMap,Me),y.state.directionalShadowMap.length>0&&O.setValue(j,`directionalShadowMap`,y.state.directionalShadowMap,Me),y.state.spotShadowMap.length>0&&O.setValue(j,`spotShadowMap`,y.state.spotShadowMap,Me),y.state.pointShadowMap.length>0&&O.setValue(j,`pointShadowMap`,y.state.pointShadowMap,Me)),i.isSkinnedMesh){O.setOptional(j,i,`bindMatrix`),O.setOptional(j,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(j,`boneTexture`,e.boneTexture,Me))}i.isBatchedMesh&&(O.setOptional(j,i,`batchingTexture`),O.setValue(j,`batchingTexture`,i._matricesTexture,Me),O.setOptional(j,i,`batchingIdTexture`),O.setValue(j,`batchingIdTexture`,i._indirectTexture,Me),O.setOptional(j,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(j,`batchingColorTexture`,i._colorsTexture,Me));let te=n.morphAttributes;if((te.position!==void 0||te.normal!==void 0||te.color!==void 0)&&We.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(j,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(ee.envMapIntensity.value=t.environmentIntensity),ee.dfgLUT!==void 0&&(ee.dfgLUT.value=ip()),w){if(O.setValue(j,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&Ot(ee,E),a&&r.fog===!0&&Re.refreshFogUniforms(ee,a),Re.refreshMaterialUniforms(ee,r,pe,fe,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;ee.probesSH.value=e.texture,ee.probesMin.value.copy(e.boundingBox.min),ee.probesMax.value.copy(e.boundingBox.max),ee.probesResolution.value.copy(e.resolution)}Id.upload(j,vt(v),ee,Me)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Id.upload(j,vt(v),ee,Me),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(j,`center`,i.center),O.setValue(j,`modelViewMatrix`,i.modelViewMatrix),O.setValue(j,`normalMatrix`,i.normalMatrix),O.setValue(j,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Ye.update(n,S),Ye.bind(n,S)}}return S}function Ot(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function kt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ne},this.getActiveMipmapLevel=function(){return re},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(e,t,n){let r=je.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),je.get(e.texture).__webglTexture=t,je.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=je.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){k=e,ne=t,re=n;let r=null,i=!1,a=!1;if(e){let o=je.get(e);if(o.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(j.FRAMEBUFFER,o.__webglFramebuffer),oe.copy(e.viewport),se.copy(e.scissor),ce=e.scissorTest,M.viewport(oe),M.scissor(se),M.setScissorTest(ce),ie=-1;return}if(o.__webglFramebuffer===void 0)Me.setupRenderTarget(e);else if(o.__hasExternalTextures)Me.rebindTextures(e,je.get(e.texture).__webglTexture,je.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&je.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Me.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=je.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Me.useMultisampledRTT(e)===!1?je.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,oe.copy(e.viewport),se.copy(e.scissor),ce=e.scissorTest}else oe.copy(ge).multiplyScalar(pe).floor(),se.copy(_e).multiplyScalar(pe).floor(),ce=ve;if(n!==0&&(r=O),M.bindFramebuffer(j.FRAMEBUFFER,r)&&M.drawBuffers(e,r),M.viewport(oe),M.scissor(se),M.setScissorTest(ce),i){let r=je.get(e.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=je.get(e.textures[t]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=je.get(e.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,t.__webglTexture,n)}ie=-1};function At(e){let t=je.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=ke.textureFormatReadable(e.format),t.__typeReadable=ke.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){Gn(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=je.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){M.bindFramebuffer(j.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&j.readBuffer(j.COLOR_ATTACHMENT0+s);let u=At(o);if(u.__formatReadable===!1){Gn(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){Gn(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&j.readPixels(t,n,r,i,qe.convert(c),qe.convert(l),a)}finally{let e=k===null?null:je.get(k).__webglFramebuffer;M.bindFramebuffer(j.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=je.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){M.bindFramebuffer(j.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&j.readBuffer(j.COLOR_ATTACHMENT0+s);let d=At(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,f),j.bufferData(j.PIXEL_PACK_BUFFER,a.byteLength,j.STREAM_READ),j.readPixels(t,n,r,i,qe.convert(l),qe.convert(u),0),j.bindBuffer(j.PIXEL_PACK_BUFFER,null);let p=k===null?null:je.get(k).__webglFramebuffer;M.bindFramebuffer(j.FRAMEBUFFER,p);let m=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await qn(j,m,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,f),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,a),j.bindBuffer(j.PIXEL_PACK_BUFFER,null),j.deleteBuffer(f),j.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Me.setTexture2D(e,0),j.copyTexSubImage2D(j.TEXTURE_2D,n,0,0,o,s,i,a),M.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=qe.convert(t.format),_=qe.convert(t.type),v;t.isData3DTexture?(Me.setTexture3D(t,0),v=j.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Me.setTexture2DArray(t,0),v=j.TEXTURE_2D_ARRAY):(Me.setTexture2D(t,0),v=j.TEXTURE_2D),M.activeTexture(j.TEXTURE0),M.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,t.flipY),M.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),M.pixelStorei(j.UNPACK_ALIGNMENT,t.unpackAlignment);let y=M.getParameter(j.UNPACK_ROW_LENGTH),b=M.getParameter(j.UNPACK_IMAGE_HEIGHT),x=M.getParameter(j.UNPACK_SKIP_PIXELS),S=M.getParameter(j.UNPACK_SKIP_ROWS),C=M.getParameter(j.UNPACK_SKIP_IMAGES);M.pixelStorei(j.UNPACK_ROW_LENGTH,h.width),M.pixelStorei(j.UNPACK_IMAGE_HEIGHT,h.height),M.pixelStorei(j.UNPACK_SKIP_PIXELS,l),M.pixelStorei(j.UNPACK_SKIP_ROWS,u),M.pixelStorei(j.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=je.get(e),r=je.get(t),h=je.get(n.__renderTarget),g=je.get(r.__renderTarget);M.bindFramebuffer(j.READ_FRAMEBUFFER,h.__webglFramebuffer),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,je.get(e).__webglTexture,i,d+n),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,je.get(t).__webglTexture,a,m+n)),j.blitFramebuffer(l,u,o,s,f,p,o,s,j.DEPTH_BUFFER_BIT,j.NEAREST);M.bindFramebuffer(j.READ_FRAMEBUFFER,null),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||je.has(e)){let n=je.get(e),r=je.get(t);M.bindFramebuffer(j.READ_FRAMEBUFFER,ee),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,te);for(let e=0;e<c;e++)w?j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,n.__webglTexture,i),T?j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,r.__webglTexture,a),i===0?T?j.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):j.copyTexSubImage2D(v,a,f,p,l,u,o,s):j.blitFramebuffer(l,u,o,s,f,p,o,s,j.COLOR_BUFFER_BIT,j.NEAREST);M.bindFramebuffer(j.READ_FRAMEBUFFER,null),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?j.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?j.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):j.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):j.texSubImage2D(j.TEXTURE_2D,a,f,p,o,s,g,_,h);M.pixelStorei(j.UNPACK_ROW_LENGTH,y),M.pixelStorei(j.UNPACK_IMAGE_HEIGHT,b),M.pixelStorei(j.UNPACK_SKIP_PIXELS,x),M.pixelStorei(j.UNPACK_SKIP_ROWS,S),M.pixelStorei(j.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&j.generateMipmap(v),M.unbindTexture()},this.initRenderTarget=function(e){je.get(e).__webglFramebuffer===void 0&&Me.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Me.setTextureCube(e,0):e.isData3DTexture?Me.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Me.setTexture2DArray(e,0):Me.setTexture2D(e,0),M.unbindTexture()},this.resetState=function(){ne=0,re=0,k=null,M.reset(),Je.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=pr._getDrawingBufferColorSpace(e),t.unpackColorSpace=pr._getUnpackColorSpace()}},op={h:``,b:``,t:``,d:``},sp=[...Array.from({length:6},(e,t)=>({id:`c`+t,kind:`char`,price:0})),{id:`party`,kind:`hat`,price:100},{id:`cat`,kind:`hat`,price:150},{id:`propeller`,kind:`hat`,price:180},{id:`chef`,kind:`hat`,price:220},{id:`headset`,kind:`hat`,price:260},{id:`viking`,kind:`hat`,price:300},{id:`sombrero`,kind:`hat`,price:340},{id:`tophat`,kind:`hat`,price:380},{id:`crown`,kind:`hat`,price:500},{id:`wizard`,kind:`hat`,price:0,level:8},{id:`halo`,kind:`hat`,price:0,level:12},{id:`unicorn`,kind:`hat`,price:0,daily:!0},{id:`melon`,kind:`bomb`,price:120},{id:`duck`,kind:`bomb`,price:200},{id:`pumpkin`,kind:`bomb`,price:240},{id:`gift`,kind:`bomb`,price:280},{id:`eight`,kind:`bomb`,price:320},{id:`disco`,kind:`bomb`,price:0,level:5},{id:`sparkle`,kind:`trail`,price:120},{id:`bubbles`,kind:`trail`,price:160},{id:`hearts`,kind:`trail`,price:240},{id:`flames`,kind:`trail`,price:360},{id:`spin`,kind:`dance`,price:150},{id:`jacks`,kind:`dance`,price:200},{id:`robot`,kind:`dance`,price:260}],cp=new Map(sp.map(e=>[e.id,e])),lp=e=>sp.filter(t=>t.kind===e),up=[``,`spin`,`jacks`,`robot`];function dp(e){let t=e&&typeof e==`object`?e:{},n=(e,t)=>{let n=typeof e==`string`?e:``;return cp.get(n)?.kind===t?n:``};return{h:n(t.h,`hat`),b:n(t.b,`bomb`),t:n(t.t,`trail`),d:n(t.d,`dance`)}}function fp(){let e=(e,t)=>{if(Math.random()>t)return``;let n=lp(e).filter(e=>!e.daily);return n[Math.floor(Math.random()*n.length)].id};return{h:e(`hat`,.5),b:e(`bomb`,.4),t:e(`trail`,.35),d:e(`dance`,.6)}}function B(e,t,n,r,i=0,a=0,o=0,s=1,c=1,l=1){return e.scale(s,c,l),e.rotateX(i),e.rotateY(a),e.rotateZ(o),e.translate(t,n,r),e}var pp=[{y:1.64,z:-.05,w:1.03},{y:1.74,z:-.06,w:1.08},{y:1.64,z:-.05,w:1.03},{y:1.64,z:-.05,w:1.03},{y:1.64,z:-.05,w:1.03},{y:1.66,z:-.05,w:1.02}],mp=-.12,hp=16763196,gp=14260766;function _p(e,t,n){let r=pp[(t%pp.length+pp.length)%pp.length],i=(e,t,i=!0)=>{e.scale(r.w,r.w,r.w),e.rotateX(mp),e.translate(0,r.y,r.z),n(e,t,i)},a=0;switch(e){case`party`:{let e=[16736162,16765498,4172287,16765498],t=.5;for(let n=0;n<4;n++){let r=.22*(1-n/4);i(B(new L(.22*(1-(n+1)/4)+.004,r,t/4,16),.06,(n+.5)*(t/4)-.04,0,0,0,-.22),e[n],n===0||n===3)}i(B(new bc(.075,1),.06+Math.sin(.22)*.48,.44,0),16777215),i(B(new Tc(.21,.03,5,18),0,-.03,0,Math.PI/2,0,-.22),16736162,!1),a=.5;break}case`cat`:for(let e of[-1,1]){let t=new ts(.15,.3,4,1);t.rotateY(Math.PI/4),i(B(t,e*.26,.1,.02,0,0,-e*.38,1,1,.45),2761779);let n=new ts(.09,.19,4,1);n.rotateY(Math.PI/4),i(B(n,e*.255,.07,.068,0,0,-e*.38,1,1,.25),16751808,!1)}i(B(new Tc(.33,.035,5,22,Math.PI),0,-.13,0,0,0,0,1,.55,1),2761779),a=.26;break;case`propeller`:{let e=[16731486,16765498,4172287,6217834];for(let t=0;t<4;t++)i(B(new R(.33,8,6,t*Math.PI/2,Math.PI/2,0,Math.PI/2),0,-.06,0,0,0,0,1,.62,1),e[t]);i(B(new L(.36,.36,.035,18,1,!1,-Math.PI/2,Math.PI),0,-.04,.06,0,0,0,1,1,.9),16731486),i(B(new L(.022,.022,.16,6),0,.2,0),7235712,!1),i(B(new R(.045,8,6),0,.28,0),16765498);for(let e of[-1,1])i(B(new $o(.055,.2,3,8),e*.16,.28,0,.35*e,0,Math.PI/2,1,1,.35),e>0?4172287:6217834);a=.33;break}case`chef`:i(B(new L(.27,.27,.2,18),0,.06,0),16777215);for(let[e,t,n,r]of[[0,.33,0,.21],[.17,.27,.08,.15],[-.17,.27,.08,.15],[.15,.28,-.12,.15],[-.15,.28,-.12,.15],[0,.26,.17,.14]])i(B(new bc(r,2),e,t,n),16777215);i(B(new Tc(.27,.025,4,20),0,0,0,Math.PI/2),14934508,!1),a=.55;break;case`headset`:{let e=(r.y+.05-1.22)/.6,t=new Tc(.6,.05,6,22,Math.PI);t.scale(1,e,1),n(B(t,0,1.22,-.02),2761779);for(let e of[-1,1])n(B(new L(.19,.19,.14,16),e*.6,1.2,-.02,0,0,Math.PI/2),2761779),n(B(new L(.12,.12,.05,14),e*.68,1.2,-.02,0,0,Math.PI/2),6221962,!1);n(new Ec(new fs([new F(.6,1.15,.06),new F(.55,1,.32),new F(.3,.95,.5),new F(.14,.96,.55)]),10,.025,5,!1),2761779,!1),n(B(new $o(.045,.06,3,8),.12,.96,.56,0,0,Math.PI/2),6221962),a=.06;break}case`viking`:i(B(new R(.42,18,8,0,Math.PI*2,0,Math.PI/2),0,-.12,0,0,0,0,1,.72,1),11121604),i(B(new Tc(.42,.05,5,24),0,-.11,0,Math.PI/2),11565626),i(B(new Qo(.07,.04,.84),0,.17,0,0,0,0,1,1,1),11565626,!1);for(let e=0;e<8;e++){let t=e/8*Math.PI*2+Math.PI/8;i(B(new R(.035,6,4),Math.sin(t)*.43,-.11,Math.cos(t)*.43),16765498,!1)}for(let e of[-1,1])i(B(new L(.075,.11,.24,10),e*.43,.06,0,0,0,-e*1.05),16773846),i(B(new ts(.075,.26,10),e*.6,.3,0,0,0,-e*.35),16773846);a=.42;break;case`sombrero`:{i(B(new L(.66,.66,.04,30),0,0,0),15909466),i(B(new Tc(.66,.05,5,30),0,.04,0,Math.PI/2),14260766),i(B(new L(.16,.27,.34,18),0,.19,0),15909466),i(B(new R(.16,14,6,0,Math.PI*2,0,Math.PI/2),0,.36,0,0,0,0,1,.5,1),15909466),i(B(new L(.235,.255,.07,18),0,.08,0),14686253,!1),i(B(new L(.215,.232,.05,18),0,.14,0),3119678,!1);let e=[16731486,4172287,6217834,16736162];for(let t=0;t<12;t++){let n=t/12*Math.PI*2;i(B(new R(.045,6,4),Math.sin(n)*.66,-.03,Math.cos(n)*.66),e[t%4],!1)}a=.42;break}case`tophat`:i(B(new L(.38,.38,.035,22),0,0,0,0,0,0,1,1,.92),2761779),i(B(new L(.25,.23,.44,20),0,.23,0),2761779),i(B(new L(.236,.236,.08,20),0,.07,0),14686253,!1),i(B(new bc(.06,1),.2,.09,.13,0,0,0,1,1,.5),16765498,!1),a=.46;break;case`crown`:i(B(new L(.3,.28,.17,20),0,.07,0),hp),i(B(new R(.28,16,6,0,Math.PI*2,0,Math.PI/2),0,.12,0,0,0,0,1,.45,1),11735594,!1);for(let e=0;e<6;e++){let t=e/6*Math.PI*2;i(B(new ts(.075,.2,6),Math.sin(t)*.27,.25,Math.cos(t)*.27),hp),i(B(new R(.04,8,6),Math.sin(t)*.27,.36,Math.cos(t)*.27),16773800,!1)}i(B(new Tc(.29,.03,4,22),0,0,0,Math.PI/2),gp,!1),i(B(new bc(.06,0),0,.08,.3,0,0,0,1,1,.6),14686253,!1);for(let e of[-1,1])i(B(new bc(.045,0),e*.21,.08,.22,0,0,0,1,1,.6),4172287,!1);a=.38;break;case`wizard`:{i(B(new L(.45,.45,.035,26),0,0,0),4930216),i(B(new L(.17,.27,.28,18),0,.15,0),5982416),i(B(new L(.08,.17,.24,16),0,.4,-.04,-.25),5982416),i(B(new ts(.08,.22,14),0,.58,-.13,-.6),5982416),i(B(new L(.272,.272,.06,18),0,.05,0),16765498,!1);let e=e=>{let t=new Ns;for(let n=0;n<10;n++){let r=n/10*Math.PI*2+Math.PI/2,i=n%2?e*.45:e;n?t.lineTo(Math.cos(r)*i,Math.sin(r)*i):t.moveTo(Math.cos(r)*i,Math.sin(r)*i)}return new _c(t,{depth:e*.3,bevelEnabled:!1})};i(B(e(.07),.05,.24,.2),16765498,!1),i(B(e(.045),-.1,.36,.13,0,-.3),16765498,!1),a=.62;break}case`halo`:i(B(new Tc(.27,.045,8,28),0,.26,0,Math.PI/2-.1),16769658),a=.3;break;case`unicorn`:{i(B(new ts(.1,.42,14),0,.2,.2,.42),16774395);let e=[];for(let t=0;t<=30;t++){let n=t/30,r=n*Math.PI*6,i=.1*(1-n)+.012;e.push(new F(Math.cos(r)*i,-.2+n*.38,Math.sin(r)*i))}i(B(new Ec(new fs(e),40,.018,4,!1),0,.2,.2,.42),16747224,!1);for(let e of[-1,1])i(B(new ts(.08,.2,8),e*.27,.04,-.05,0,0,-e*.45,1,1,.6),16774395),i(B(new ts(.045,.12,8),e*.265,.03,-.02,0,0,-e*.45,1,1,.4),16751808,!1);[16739210,16758861,16769357,7069834,6210815,11832063].forEach((e,t)=>i(B(new bc(.085,1),0,.02-t*.03,-.12-t*.07),e)),a=.48;break}default:return 0}return Math.max(0,r.y+a*r.w-1.86)}function vp(e){let t=(e=7235712)=>[B(new L(.17,.19,.16,12),0,.42,0),e],n=()=>[B(new R(.1,8,6),-.15,.15,.33),16777215];switch(e){case`melon`:{let e=[];for(let t=0;t<12;t++)e.push([new R(.42,4,12,t/12*Math.PI*2,Math.PI/6),t%2?3115578:7328618]);return e.push(t(3828522)),e}case`disco`:return[[new bc(.43,2).toNonIndexed(),-1],t(12568278)];case`pumpkin`:{let e=[];for(let t=0;t<8;t++){let n=t/8*Math.PI*2;e.push([B(new R(.25,12,10),Math.sin(n)*.19,0,Math.cos(n)*.19,0,n,0,.85,1.45,1.1),t%2?16747039:16752186])}e.push([B(new L(.06,.09,.2,8),.02,.38,0,0,0,-.2),5012010]);for(let t of[-1,1]){let n=new ts(.085,.1,3);e.push([B(n,t*.13,.1,.46,Math.PI/2,0,Math.PI,1,.25,1),3809038])}e.push([B(new es(.17,14,Math.PI,Math.PI),0,-.04,.475,-.15),3809038]);for(let t of[-1,1])e.push([B(new Qo(.06,.06,.02),t*.07,-.07,.478,-.15),16752186]);return e}case`duck`:return[[B(new R(.4,16,12),0,-.04,-.04,0,0,0,1.08,.86,1.12),16765498],[B(new R(.25,14,10),0,.3,.2),16765498],[B(new R(.12,10,6),0,.26,.45,0,0,0,1.15,.45,1),16747039],[B(new R(.04,8,6),.11,.38,.41),2234931],[B(new R(.04,8,6),-.11,.38,.41),2234931],[B(new ts(.11,.2,8),0,.12,-.46,-1.2),16765498],[B(new R(.17,10,6),.3,-.02,-.02,0,0,.5,.4,.8,1.2),16761374],[B(new R(.17,10,6),-.3,-.02,-.02,0,0,-.5,.4,.8,1.2),16761374],t(16747039)];case`gift`:return[[new Qo(.68,.6,.68),14690378],[new Qo(.7,.62,.14),16765498],[new Qo(.14,.62,.7),16765498],[B(new Tc(.12,.04,6,12),.12,.38,0,0,0,.5,1,1,.6),16765498],[B(new Tc(.12,.04,6,12),-.12,.38,0,0,0,-.5,1,1,.6),16765498],[B(new R(.06,8,6),0,.34,0),16757278]];case`eight`:return[[new R(.42,16,12),1907238],[B(new es(.17,18),0,.05,.41,-.12),16777215],[B(new Tc(.038,.017,5,12),0,.1,.426,-.12),1907238],[B(new Tc(.046,.018,5,12),0,.012,.432,-.12),1907238],n(),t(3814480)];default:return[[new R(.42,16,12),2762293],t(),[B(new R(.11,8,6),-.15,.15,.33),12564688],[B(new R(.05,6,4),-.2,.2,.36),16777215]]}}var yp=new Map;function bp(e,t){let n=yp.get(e);if(n)return n;let r=new I,i=[],a=[15922426,13226206,10135231,16777215,12576511,16766708,14606046];for(let[t,n]of vp(e)){let e=t.index?t.toNonIndexed():t;e.attributes.uv&&e.deleteAttribute(`uv`);let o=e.attributes.position.count,s=new Float32Array(o*3);for(let e=0;e<o;e++)n<0?r.set(a[Math.floor(e/3)%7==3?4:Math.floor(e/3)*5%a.length]):r.set(n),s[e*3]=r.r,s[e*3+1]=r.g,s[e*3+2]=r.b;e.setAttribute(`color`,new Gi(s,3)),n<0&&e.computeVertexNormals(),i.push(e)}let o=new Tc(.16,.035,5,10,Math.PI*.9).toNonIndexed();o.rotateY(Math.PI/2),o.translate(0,.5,-.16),o.deleteAttribute(`uv`);let s=o.attributes.position.count,c=new Float32Array(s*3);r.set(14267258);for(let e=0;e<s;e++)c.set([r.r,r.g,r.b],e*3);o.setAttribute(`color`,new Gi(c,3)),i.push(o);let l=t(i);return yp.set(e,l),l}var xp=[[1,2,4,5],[1,2,3,4],[1,2,4,5],[1,2,3,4,5]],Sp=[[-4.7,2.6,1.3],[4.9,3.4,1.15],[.6,-5.3,1.2]],Cp=2.7,wp=1.9,Tp=10,Ep=5,Dp=2.2,Op=3.8,kp=12,Ap={st:0,x:0,z:0,dx:1,dz:0,ox:0,oz:0,s:0,w:0};function jp(e){if(Ap.st=0,e<2.8)return Ap;let t=Math.floor((e-2.8)/Tp),n=e-(Ep+t*Tp),r=t*2.25+.5;Ap.dx=Math.cos(r),Ap.dz=Math.sin(r);let i=t*2%3-1;if(Ap.ox=-Ap.dz*i*2.6,Ap.oz=Ap.dx*i*2.6,n<0)Ap.st=1,Ap.w=1+n/Dp,Ap.s=-12;else if(n<Op)Ap.st=2,Ap.w=1,Ap.s=-12+n/Op*kp*2;else return Ap;return Ap.x=Ap.ox+Ap.dx*Ap.s,Ap.z=Ap.oz+Ap.dz*Ap.s,Ap}var Mp=24/Op,Np=4.2,Pp=6.3,Fp=2.3,Ip=.72,Lp=[[0,0],[0,0],[0,0]];function Rp(e){for(let t=0;t<3;t++){let n=t*Math.PI*2/3+e*.36,r=10.5/2+Math.sin(e*.8+t*2)*.45;Lp[t][0]=Math.cos(n)*r,Lp[t][1]=Math.sin(n)*r}return Lp}var zp=[[-7.6,-.6,1,.08],[7.6,.6,-1,-.08]],Bp=.9,Vp=.55,Hp=[[0,0],[-3.4,7.2],[3.6,-7]],Up=1.9,Wp=2.7,Gp=4,Kp=1.5,qp=.55,Jp={k:-1,st:0,u:0};function Yp(e){if(Jp.k=-1,Jp.st=0,e<2.5)return Jp;let t=Math.floor((e-2.5)/Wp),n=e-(Gp+t*Wp);return Jp.k=t*2%Hp.length,n<0?(Jp.st=1,Jp.u=1+n/Kp):n<qp?(Jp.st=2,Jp.u=n/qp):Jp.k=-1,Jp}var Xp=[[-4.1,1.15,3],[4.1,1.15,-3]],Zp=2.3,Qp=.85,$p=[[2.4,-4.1,0],[-2.4,4.1,2.3]],em=1.2,tm=.2,nm=1.55,rm=4.6,im=1.4,am=.16,om=.7,sm=.8,cm={st:0,y:2.9},lm=2.9;function um(e,t){let n=t-2-$p[e][2];if(n<0)return cm.st=0,cm.y=lm,cm;let r=n%rm,i=im;if(r<i)cm.st=1,cm.y=lm-r/im*.5;else if(r<(i+=am)){cm.st=2;let e=(r-im)/am;cm.y=2.4-e*e*2.2}else r<(i+=om)?(cm.st=3,cm.y=.2):r<(i+=sm)?(cm.st=4,cm.y=.2+(r-im-am-om)/sm*2.6999999999999997):(cm.st=0,cm.y=lm);return cm}var dm=[[14,7.9],[25,6.9],[36,6]],fm=2.6,pm={r:9,next:9,w:0,since:99};function mm(e,t){if(pm.r=9,pm.next=9,pm.w=0,pm.since=99,!t)return pm;for(let[t,n]of dm)if(e>=t)pm.r=n,pm.next=n,pm.since=e-t;else{e>=t-2.6&&(pm.next=n,pm.w=1-(t-e)/fm);break}return pm}var hm=.62,gm=.85,_m=[[4.3,4.3],[-4.3,4.3],[4.3,-4.3],[-4.3,-4.3]],vm=.9,ym=6.6,bm=5.4,xm=6.2,Sm=4.5,Cm=15,wm=.17,Tm=1.3,Em=.6,Dm=1.8,Om=3,km=typeof location<`u`?Number(new URLSearchParams(location.search).get(`fast`)||0):0,Am=km===1?.2:km>0&&km<1?km:1,jm=[`Pickle`,`Noodle`,`Zappy`,`Biscuit`,`Turbo`,`Waffles`,`Sprout`,`Mochi`,`Rocket`,`Taco`,`Bubbles`,`Ziggy`],Mm=[4172287,16736162,6217834,16763196,10976255,16747069];function Nm(e,t){return e+Math.random()*(t-e)}var Pm=class{constructor(e){this.ps=[],this.phase=`count`,this.phaseT=Om,this.holder=-1,this.fuse=0,this.fuseMax=1,this.sweep=0,this.sweepV=.55,this.time=0,this.outCount=0,this.evs=[],this.order=[],this.arena=0,this.twist=0,this.hz=0,this.holder2=-1,this.fuse2=0,this.fuseMax2=1,this.pr=hm;let t=jm.filter(t=>!e.includes(t)).sort(()=>Math.random()-.5);for(let n=0;n<6;n++){let r=e[n]??t.pop()??`Bot`;this.ps.push({id:n,name:r,color:Mm[n],hat:n,cos:{...op},ctrl:n===0?`local`:`bot`,x:0,z:0,vx:0,vz:0,fx:0,fz:1,ix:0,iz:0,dashReq:!1,dashT:0,dashCd:0,knock:0,passLock:0,alive:!0,outAt:0,botT:0,botX:0,botZ:0,wander:Math.random()*6.28,stun:0,fly:0,padCd:0})}this.reset(0,0)}reset(e=this.arena,t=0){this.arena=e,this.twist=t,this.pr=t===4?hm*1.5:hm;let n=Math.random()*6.28;this.ps.forEach((e,t)=>{let r=n+t/this.ps.length*Math.PI*2,i=this.arena===2?7.6:6.8;e.x=Math.cos(r)*i,e.z=Math.sin(r)*i,e.vx=e.vz=0,e.fx=-Math.cos(r),e.fz=-Math.sin(r),e.alive=!0,e.outAt=0,e.dashT=e.dashCd=e.knock=e.passLock=0,e.stun=e.fly=e.padCd=0,e.dashReq=!1}),this.phase=`count`,this.phaseT=Om,this.holder=this.holder2=-1,this.fuse=this.fuse2=0,this.sweep=0,this.sweepV=.55,this.hz=0,this.outCount=0,this.order=[],this.evs.push({k:`start`,a:this.arena,tw:this.twist})}alive(){return this.ps.filter(e=>e.alive)}holds(e){return e===this.holder?1:e===this.holder2?2:0}fuseLen(){return(this.twist===2?Nm(4,6.5):Nm(10,18))*Am}giveBomb(){let e=this.alive().sort(()=>Math.random()-.5),t=e[0];if(this.holder=t.id,this.fuse=this.fuseMax=this.fuseLen(),t.passLock=.4,this.evs.push({k:`drop`,i:t.id,w:0}),this.holder2=-1,this.twist===1&&e.length>=3){let t=e[1];this.holder2=t.id,this.fuse2=this.fuseMax2=Math.max(4*Am,this.fuse+(Math.random()<.5?-1:1)*Nm(2.5,4)*Am),t.passLock=.4,this.evs.push({k:`drop`,i:t.id,w:1})}}step(e){if(this.time+=e,this.phaseT-=e,this.phase===`count`&&this.phaseT<=0)this.phase=`play`,this.evs.push({k:`go`}),this.giveBomb();else if(this.phase===`gap`&&this.phaseT<=0){if(this.alive().length<=1){this.phase=`end`;let e=this.alive()[0];e&&this.order.unshift(e.id),this.evs.push({k:`end`,order:this.order.slice()})}else this.phase=`play`,this.giveBomb()}if(this.phase!==`count`){let t=this.arena===2?Yp(this.hz):null,n=t?t.k*10+t.st:0;if(this.hz+=e,this.arena===2){let e=Yp(this.hz);e.st===2&&e.k*10+e.st!==n&&this.evs.push({k:`gey`,g:e.k})}this.arena===0&&(this.sweepV=Math.min(1.5,this.sweepV+e*.012),this.sweep+=this.sweepV*e)}for(let t of this.ps)t.ctrl===`bot`&&this.bot(t,e);for(let t of this.ps)this.move(t,e);if(this.contacts(),this.twist===3&&this.phase!==`count`&&this.phase!==`end`){let e=mm(this.hz,!0).r;for(let t of this.alive())Math.hypot(t.x,t.z)>e+.1&&t.fly<=0&&this.fall(t)}this.phase===`play`&&this.holder>=0&&(this.fuse-=e,this.fuse<=0&&this.boom(this.holder)),this.phase===`play`&&this.holder2>=0&&(this.fuse2-=e,this.fuse2<=0&&this.boom(this.holder2))}out(e){let t=this.holds(e.id)>0;e.alive=!1,e.outAt=++this.outCount,this.order.unshift(e.id),(t||this.alive().length<=1)&&(this.holder=this.holder2=-1,this.phase=`gap`,this.phaseT=Dm)}fall(e){this.out(e),this.evs.push({k:`fall`,i:e.id})}boom(e){let t=this.ps[e];this.out(t),this.evs.push({k:`boom`,i:t.id});for(let e of this.alive()){let n=e.x-t.x,r=e.z-t.z,i=Math.hypot(n,r)||1;if(i<4){let t=(4-i)*4*this.kb();e.vx+=n/i*t,e.vz+=r/i*t,e.knock=.3}}}kb(){return this.twist===5?1.3:1}ground(e,t){if(Fm.spd=1,Fm.acc=11,Fm.cx=Fm.cz=0,this.arena===1){Fm.acc=2.1;for(let[n,r,i]of Sp)Math.hypot(e-n,t-r)<i&&(Fm.spd=.45,Fm.acc=12)}else if(this.arena===2){let n=Math.hypot(e,t);n>4.2&&n<6.3&&(Fm.spd=.62,Fm.acc=6,Fm.cx=-t/n*Fp,Fm.cz=e/n*Fp)}else if(this.arena===3){if(Math.hypot(e,t)<2.3)Fm.cx=-t*Qp,Fm.cz=e*Qp;else for(let[e,n,r]of Xp)Math.abs(t-e)<n&&(Fm.cx=r,Fm.acc=9)}this.twist===5&&(Fm.acc*=.3),this.twist===4&&(Fm.spd*=.78)}move(e,t){let n=this.phase===`count`&&e.alive||e.stun>0&&e.alive;e.stun=Math.max(0,e.stun-t);let r=n?0:e.ix,i=n?0:e.iz,a=Math.hypot(r,i);a>1&&(r/=a,i/=a),a>.15&&(e.fx=r/Math.max(a,.001),e.fz=i/Math.max(a,.001)),e.dashCd=Math.max(0,e.dashCd-t),e.passLock=Math.max(0,e.passLock-t),e.knock=Math.max(0,e.knock-t),e.padCd=Math.max(0,e.padCd-t);let o=this.twist===5;if(e.dashReq&&e.dashCd<=0&&!n&&e.fly<=0){let t=Cm*(o?.8:this.twist===4?.85:1);e.vx=e.fx*t,e.vz=e.fz*t,e.dashT=wm*(o?2.2:1),e.dashCd=Tm,e.alive&&this.evs.push({k:`dash`,i:e.id})}if(e.dashReq=!1,e.fly>0)e.fly-=t;else if(e.dashT>0)e.dashT-=t;else if(!e.alive){let n=Math.min(1,11*t);e.vx+=(r*Sm-e.vx)*n,e.vz+=(i*Sm-e.vz)*n}else if(n&&e.stun>0)e.vx*=1-Math.min(1,t*12),e.vz*=1-Math.min(1,t*12);else{this.ground(e.x,e.z);let n=(this.holds(e.id)>0?xm:bm)*Fm.spd,a=Math.min(1,(e.knock>0?o?.7:1.6:Fm.acc)*t);e.vx+=(r*n+Fm.cx-e.vx)*a,e.vz+=(i*n+Fm.cz-e.vz)*a}if(e.x+=e.vx*t,e.z+=e.vz*t,!e.alive){let t=Math.hypot(e.x,e.z);t>8.6&&(e.x*=8.6/t,e.z*=8.6/t);return}this.solid(e)}bounce(e,t,n,r,i){let a=e.x-t,o=e.z-n,s=Math.hypot(a,o),c=this.pr;if(s<r+c&&s>1e-4){let l=a/s,u=o/s;return e.x=t+l*(r+c),e.z=n+u*(r+c),e.vx=l*13*this.kb(),e.vz=u*13*this.kb(),e.dashT=0,e.fly=0,e.knock=.35,this.evs.push({k:`bump`,i:e.id,s:i}),!0}return!1}solid(e){let t=this.pr,n=Math.hypot(e.x,e.z),r=this.twist===3&&mm(this.hz,!0).r<9?11:9-t;if(n>r){let t=e.x/n,i=e.z/n;e.x=t*r,e.z=i*r;let a=e.vx*t+e.vz*i;a>0&&(e.vx-=t*a*1.7,e.vz-=i*a*1.7,a>7&&this.evs.push({k:`bump`,i:e.id,s:-1}))}if(this.arena===1?this.solidRink(e):this.arena===2?this.solidPool(e):this.arena===3&&this.solidFactory(e),this.arena!==0)return;_m.forEach(([t,n],r)=>this.bounce(e,t,n,gm,r)),n=Math.hypot(e.x,e.z),n<.9+t&&n>1e-4&&(e.x*=(vm+t)/n,e.z*=(vm+t)/n);let i=Math.cos(this.sweep),a=Math.sin(this.sweep),o=Math.max(-6.6,Math.min(ym,e.x*i+e.z*a)),s=i*o,c=a*o,l=e.x-s,u=e.z-c;n=Math.hypot(l,u);let d=t+.28;if(n<d&&Math.abs(o)>.45){let t=n>1e-4?l/n:-a,r=n>1e-4?u/n:i;e.x=s+t*d,e.z=c+r*d;let f=-a*o*this.sweepV,p=i*o*this.sweepV;f*t+p*r>.3&&(e.vx=(f*1.8+t*5)*this.kb(),e.vz=(p*1.8+r*5)*this.kb(),e.dashT=0,e.knock<=.05&&this.evs.push({k:`bump`,i:e.id,s:9}),e.knock=.4)}}solidRink(e){let t=jp(this.hz);if(t.st!==2)return;let n=e.x-t.x,r=e.z-t.z,i=n*t.dx+r*t.dz,a=n*-t.dz+r*t.dx,o=Cp/2+this.pr,s=wp/2+this.pr;if(Math.abs(i)>=o||Math.abs(a)>=s)return;let c=a>=0?1:-1,l=-t.dz*c,u=t.dx*c;s-Math.abs(a)<o-Math.abs(i)||i<0?(e.x+=l*(s-Math.abs(a)),e.z+=u*(s-Math.abs(a))):(e.x+=t.dx*(o-i),e.z+=t.dz*(o-i)),e.knock<=.05&&this.evs.push({k:`bump`,i:e.id,s:10}),e.vx=(l*10+t.dx*Mp*.9)*this.kb(),e.vz=(u*10+t.dz*Mp*.9)*this.kb(),e.dashT=0,e.knock=.45}solidPool(e){let t=Rp(this.hz);for(let n=0;n<t.length;n++)this.bounce(e,t[n][0],t[n][1],Ip,11);if(e.padCd<=0&&e.knock<=0){for(let[t,n,r,i]of zp)if(Math.hypot(e.x-t,e.z-n)<.9){let t=Math.hypot(r,i);e.vx=r/t*17,e.vz=i/t*17,e.fly=Vp,e.dashT=0,e.padCd=1.4,e.fx=r/t,e.fz=i/t,this.evs.push({k:`pad`,i:e.id})}}let n=Yp(this.hz);if(n.st===2&&e.knock<=.05){let[t,r]=Hp[n.k],i=e.x-t,a=e.z-r,o=Math.hypot(i,a);if(o<1.9+this.pr*.5){let t=o>.001?i/o:1,n=o>.001?a/o:0;e.vx=t*14*this.kb(),e.vz=n*14*this.kb(),e.dashT=0,e.fly=0,e.knock=.5,this.evs.push({k:`bump`,i:e.id,s:12})}}}solidFactory(e){for(let[t,n]of $p)for(let r of[-1,1]){let i=e.x-t,a=e.z-(n+r*nm),o=Math.hypot(i,a),s=tm+this.pr;o<s&&o>1e-4&&(e.x=t+i/o*s,e.z=n+r*nm+a/o*s)}for(let t=0;t<$p.length;t++){let n=um(t,this.hz).st;if(n!==2&&n!==3)continue;let[r,i]=$p[t],a=em+this.pr*.6;if(!(Math.abs(e.x-r)>=a||Math.abs(e.z-i)>=a)){if(n===2&&e.stun<=0)e.stun=1.3,e.vx=e.vz=0,e.dashT=0,e.fly=0,this.evs.push({k:`crush`,i:e.id});else if(n===3&&e.stun<=0){let t=e.x-r,n=e.z-i;Math.abs(t)>Math.abs(n)?e.x=r+Math.sign(t||1)*a:e.z=i+Math.sign(n||1)*a}}}}contacts(){let e=this.alive(),t=this.pr*2;for(let n=0;n<e.length;n++)for(let r=n+1;r<e.length;r++){let i=e[n],a=e[r],o=a.x-i.x,s=a.z-i.z,c=Math.hypot(o,s);if(c>=t||c<1e-4)continue;let l=o/c,u=s/c,d=(t-c)/2;if(i.x-=l*d,i.z-=u*d,a.x+=l*d,a.z+=u*d,i.dashT>0&&a.dashT<=0)this.shove(i,a,l,u);else if(a.dashT>0&&i.dashT<=0)this.shove(a,i,-l,-u);else{let e=(a.vx-i.vx)*l+(a.vz-i.vz)*u;e<0&&(i.vx+=l*e*.9,i.vz+=u*e*.9,a.vx-=l*e*.9,a.vz-=u*e*.9)}if(this.phase!==`play`)continue;let f=this.holds(i.id),p=this.holds(a.id);f&&!p&&i.passLock<=0?this.pass(i,a,l,u,f):p&&!f&&a.passLock<=0&&this.pass(a,i,-l,-u,p)}}shove(e,t,n,r){t.vx=n*12*this.kb()+e.vx*.2,t.vz=r*12*this.kb()+e.vz*.2,t.knock=.35,e.vx*=.3,e.vz*=.3,e.dashT=0,this.evs.push({k:`shove`,i:t.id,by:e.id})}pass(e,t,n,r,i){i===2?this.holder2=t.id:this.holder=t.id,t.passLock=Em,e.vx-=n*4,e.vz-=r*4,t.vx+=n*4,t.vz+=r*4,this.evs.push({k:`pass`,a:e.id,b:t.id,w:i-1})}edge(){if(this.twist!==3)return 9;let e=mm(this.hz+1.2,!0);return Math.min(e.r,e.next)}avoid(e,t){if(this.arena===1){let n=jp(this.hz+.4);if(n.st){let r=e.x-n.ox,i=e.z-n.oz,a=r*-n.dz+i*n.dx,o=r*n.dx+i*n.dz;if(Math.abs(a)<1.9/2+1.9&&o>n.s-2.7){let e=a>=0?1:-1;t.x+=-n.dz*e*3,t.z+=n.dx*e*3}}}else if(this.arena===2){let n=Yp(this.hz+.3);if(n.k>=0){let[r,i]=Hp[n.k],a=e.x-r,o=e.z-i,s=Math.hypot(a,o)||1;s<3.3&&(t.x+=a/s*3,t.z+=o/s*3)}for(let[n,r]of Rp(this.hz)){let i=e.x-n,a=e.z-r,o=Math.hypot(i,a)||1;o<2&&(t.x+=i/o*.6,t.z+=a/o*.6)}}else if(this.arena===3){for(let n=0;n<$p.length;n++){let r=um(n,this.hz+.6).st;if(r===0||r===4)continue;let[i,a]=$p[n],o=e.x-i,s=e.z-a;if(Math.abs(o)<2.5&&Math.abs(s)<2.5){let e=Math.hypot(o,s)||1;t.x+=o/e*3,t.z+=s/e*3}}this.ground(e.x,e.z),t.x-=Fm.cx*.3,t.z-=Fm.cz*.3}else for(let[n,r]of _m){let i=e.x-n,a=e.z-r,o=Math.hypot(i,a);o<2.4&&(t.x+=i/o*.6,t.z+=a/o*.6)}}bot(e,t){if(e.botT-=t,e.botT>0)return;if(e.botT=Nm(.12,.28),e.wander+=Nm(-.8,.8),!e.alive){let t=this.ps[this.holder],n=t?t.x+Math.cos(e.wander)*2.5:Math.cos(e.wander)*5,r=t?t.z+Math.sin(e.wander)*2.5:Math.sin(e.wander)*5;this.aim(e,n-e.x,r-e.z,.6);return}if(this.phase===`count`)return;let n=this.edge(),r=this.twist===3,i={x:0,z:0};this.avoid(e,i);let a=Math.hypot(e.x,e.z)||1;if(r){let t=this.arena===1?.9:.55,r=e.x+e.vx*t,i=e.z+e.vz*t;if(Math.hypot(r,i)>n-1.3||a>n-1.1){e.botT=.06,this.aim(e,-e.x/a-e.vx*.15,-e.z/a-e.vz*.15,1);return}}if(this.holds(e.id)){let t=null,o=1e9;for(let n of this.alive()){if(n===e||this.holds(n.id))continue;let r=Math.hypot(n.x-e.x,n.z-e.z)*(n.ctrl===`bot`?1.15:1);r<o&&(o=r,t=n)}if(!t)return;let s=Math.min(.5,o/12),c=t.x+t.vx*s-e.x,l=t.z+t.vz*s-e.z,u=Math.hypot(c,l)||1;c=c/u+i.x*.5,l=l/u+i.z*.5,a>n-1.6&&(c-=e.x/a*1.5,l-=e.z/a*1.5),this.aim(e,c,l,1),o<3&&Math.random()<.3&&(!r||this.dashSafe(e,c,l,n))&&(e.dashReq=!0);return}let o=!1,s=0,c=0,l=Math.cos(e.wander)*.25+i.x,u=Math.sin(e.wander)*.25+i.z;for(let t of[this.holder,this.holder2]){let i=t>=0?this.ps[t]:null;if(!i)continue;let d=e.x-i.x,f=e.z-i.z,p=Math.hypot(d,f)||1,m=Math.max(0,9-p)/9;if(l+=d/p*m*2.2,u+=f/p*m*2.2,p<2.4&&e.dashCd<=0&&Math.random()<.3){let t=Math.random()<.5?1:-1,i=d/p-f/p*t*.8,l=f/p+d/p*t*.8;r&&a>n-3.5&&i*e.x+l*e.z>0&&(i=-i,l=-l),(!r||this.dashSafe(e,i,l,n))&&(o=!0,s=i,c=l,e.dashReq=!0)}}let d=r?3:2.6;if(a>n-d){let t=Math.min(2,(a-(n-d))/d);l-=e.x/a*t*(r?3.5:2),u-=e.z/a*t*(r?3.5:2);let i=e.id&1?-1:1;l+=-e.z/a*i*t*1.5,u+=e.x/a*i*t*1.5}this.aim(e,l,u,Math.min(1,Math.hypot(l,u)*1.4)),o&&(e.ix=s,e.iz=c)}dashSafe(e,t,n,r){let i=Math.hypot(t,n)||1;this.ground(e.x,e.z);let a=Cm*wm+Cm/Math.max(2,Fm.acc);return Math.hypot(e.x+t/i*a,e.z+n/i*a)<r-1.2}aim(e,t,n,r){let i=Math.hypot(t,n);if(i<.05){e.ix=e.iz=0;return}e.ix=t/i*r,e.iz=n/i*r}snap(){let e=e=>Math.round(e*100);return{ph:this.phase,pt:Math.round(this.phaseT*10),h:this.holder,f:Math.round(this.fuse*100),fm:Math.round(this.fuseMax*10),h2:this.holder2,f2:Math.round(this.fuse2*100),sw:Math.round(this.sweep*1e3),sv:Math.round(this.sweepV*1e3),ar:this.arena,tw:this.twist,hz:Math.round(this.hz*100),p:this.ps.map(t=>[e(t.x),e(t.z),e(t.vx),e(t.vz),+!!t.alive|(t.dashT>0?2:0)|(t.knock>0?4:0)|(t.stun>0?8:0)|(t.fly>0?16:0),Math.round(t.dashCd*10)])}}},Fm={spd:1,acc:11,cx:0,cz:0},Im=`stroke="#2b2233" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"`,Lm=e=>`<svg viewBox="0 0 24 24" width="1.25em" height="1.25em" aria-hidden="true">${e}</svg>`,Rm=(e,t,n,r)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${r}" ${Im}/><rect x="${e-1.6}" y="${t-n-2.2}" width="3.2" height="2.6" rx=".6" fill="#6e6a85" ${Im}/><path d="M${e+.6} ${t-n-2.2} q1.4 -2.2 3.2 -1.4" fill="none" ${Im}/><circle cx="${e+4}" cy="${t-n-3.6}" r="1.3" fill="#ffd23a" stroke="#ff7a1a" stroke-width=".9"/><circle cx="${e-n*.35}" cy="${t-n*.35}" r="${n*.22}" fill="#fff" opacity=".7"/>`,zm=[``,Lm(Rm(7.6,15,5,`#3a3550`)+Rm(16.6,16.2,5,`#3a3550`)),Lm(`<path d="M13.5 1.8 L4.6 13.4 h6 L9.4 22.2 L19.4 9.6 h-6.2 Z" fill="#fff" ${Im}/>`),Lm(`<path d="M2 9 a8 4.4 0 0 0 16 0 v3 a8 4.4 0 0 1 -16 0 Z" fill="#8b93a6" ${Im}/><path d="M2 9 a8 4.4 0 0 1 16 0 l-2.2 1.2 1 1.4 -2.4 .8 a8 4.4 0 0 1 -12.4 -3.4 Z" fill="#cfd5e2" ${Im}/><path d="M18.6 13.6 l3 .8 -.8 2.8 -3-.8 Z" fill="#cfd5e2" ${Im}/><path d="M15.4 18.4 l2.6 .4 -.4 2.6 -2.6-.4 Z" fill="#cfd5e2" ${Im}/><path d="M21.8 10.4 v1.6 M13.6 15.4 v1.6" stroke="#2b2233" stroke-width="1.3" stroke-linecap="round"/>`),Lm(`<path d="M2.6 12.4 C2.6 5.6 21.4 5.6 21.4 12.4 Z" fill="#ff4d4d" ${Im}/><circle cx="8" cy="9.4" r="1.5" fill="#fff"/><circle cx="14.4" cy="8.2" r="1.3" fill="#fff"/><circle cx="17.8" cy="10.8" r="1" fill="#fff"/><path d="M8.4 12.4 h7.2 l-0.8 8.4 h-5.6 Z" fill="#fff4e0" ${Im}/>`),Lm(`<ellipse cx="12" cy="12.6" rx="11" ry="3.6" fill="none" stroke="#2b2233" stroke-width="3.4"/><circle cx="12" cy="11.4" r="6.6" fill="#a98bff" ${Im}/><path d="M6.4 9.6 q5.6 2.4 11.2 0" fill="none" stroke="#7d62e0" stroke-width="1.4"/><path d="M1.6 13.2 C3.4 15.8 20.6 15.8 22.4 13.2" fill="none" stroke="#ffd23a" stroke-width="1.8" stroke-linecap="round"/>`)],Bm=[Lm(`<rect x="2.4" y="8.6" width="6.4" height="13" fill="#7d62e0" ${Im}/><rect x="8.8" y="3" width="6.8" height="18.6" fill="#a98bff" ${Im}/><rect x="15.6" y="11" width="6" height="10.6" fill="#7d62e0" ${Im}/><path d="M11 6.4 h2.4 M11 10 h2.4 M11 13.6 h2.4 M4.4 12 h2.4 M4.4 15.6 h2.4 M17.6 14.4 h2" stroke="#ffd23a" stroke-width="1.6"/>`),Lm(`<path d="M5 3.6 h6.4 v7 l6.6 2.4 c1.6 .6 2.2 1.8 2.2 3.4 H5 Z" fill="#8fd3ff" ${Im}/><path d="M3 20 h17.4 c.8 0 1.4-.6 1.4-1.4" fill="none" stroke="#2b2233" stroke-width="1.8" stroke-linecap="round"/><path d="M7 16.4 v3.6 M16 16.4 v3.6" stroke="#2b2233" stroke-width="1.6"/><path d="M11.4 7.6 h-2.6 M11.4 10.2 h-2.6" stroke="#fff" stroke-width="1.2"/>`),Lm(`<circle cx="12" cy="12" r="9.4" fill="#ff5d5d" ${Im}/><path d="M12 2.6 a9.4 9.4 0 0 1 9.4 9.4 h-4.6 a4.8 4.8 0 0 0 -4.8 -4.8 Z M12 21.4 a9.4 9.4 0 0 1 -9.4 -9.4 h4.6 a4.8 4.8 0 0 0 4.8 4.8 Z" fill="#fff"/><circle cx="12" cy="12" r="4.8" fill="#4fc3f7" ${Im}/><circle cx="12" cy="12" r="9.4" fill="none" ${Im}/>`),Lm(`<path d="M12 2.4 l1.6 2.4 2.8-.8 .5 2.9 2.9.5 -.8 2.8 2.4 1.6 -2.4 1.6 .8 2.8 -2.9.5 -.5 2.9 -2.8-.8 -1.6 2.4 -1.6-2.4 -2.8.8 -.5-2.9 -2.9-.5 .8-2.8 -2.4-1.6 2.4-1.6 -.8-2.8 2.9-.5 .5-2.9 2.8.8 Z" fill="#ffd23a" ${Im}/><circle cx="12" cy="12" r="3.4" fill="#6e6a85" ${Im}/>`)];function Vm(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new oa,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=Hm(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=Hm(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function Hm(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new Gi(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function Um(e,t=1e-4){t=Math.max(t,2**-52);let n={},r=e.getIndex(),i=e.getAttribute(`position`),a=r?r.count:i.count,o=0,s=Object.keys(e.attributes),c={},l={},u=[],d=[`getX`,`getY`,`getZ`,`getW`],f=[`setX`,`setY`,`setZ`,`setW`];for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.attributes[n];c[n]=new r.constructor(new r.array.constructor(r.count*r.itemSize),r.itemSize,r.normalized);let i=e.morphAttributes[n];i&&(l[n]||(l[n]=[]),i.forEach((e,t)=>{let r=new e.array.constructor(e.count*e.itemSize);l[n][t]=new e.constructor(r,e.itemSize,e.normalized)}))}let p=t*.5,m=10**Math.log10(1/t),h=p*m;for(let t=0;t<a;t++){let i=r?r.getX(t):t,a=``;for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),o=r.itemSize;for(let e=0;e<o;e++)a+=`${Math.trunc(r[d[e]](i)*m+h)},`}if(a in n)u.push(n[a]);else{for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),a=e.morphAttributes[n],u=r.itemSize,p=c[n],m=l[n];for(let e=0;e<u;e++){let t=d[e],n=f[e];if(p[n](o,r[t](i)),a)for(let e=0,r=a.length;e<r;e++)m[e][n](o,a[e][t](i))}}n[a]=o,u.push(o),o++}}let g=e.clone();for(let t in e.attributes){let e=c[t];if(g.setAttribute(t,new e.constructor(e.array.slice(0,o*e.itemSize),e.itemSize,e.normalized)),t in l)for(let e=0;e<l[t].length;e++){let n=l[t][e];g.morphAttributes[t][e]=new n.constructor(n.array.slice(0,o*n.itemSize),n.itemSize,n.normalized)}}return g.setIndex(u),g}var Wm=3/256,Gm=1-3/256,Km=-.5,qm=-30,Jm=15,Ym=-18,Xm=new F(-6,10,4),Zm={x:.35,z:-.22},Qm=7;function $m(e){Qm=e}function V(){return Qm=Qm*16807%2147483647,(Qm-1)/2147483646}function H(e,t,n=.35,r=!0){let i=new I(t),a=e.attributes.position,o=a.count,s=1/0,c=-1/0;for(let e=0;e<o;e++)s=Math.min(s,a.getY(e)),c=Math.max(c,a.getY(e));let l=new Float32Array(o*3);for(let e=0;e<o;e++){let t=c-s>.05?(a.getY(e)-s)/(c-s):1,r=1-n*(1-Math.min(1,t*2.2));l[e*3]=i.r*r,l[e*3+1]=i.g*r,l[e*3+2]=i.b*r}if(e.setAttribute(`color`,new Gi(l,3)),r){let t=new Float32Array(o*2);for(let e=0;e<o;e++)t[e*2]=Wm,t[e*2+1]=Gm;e.setAttribute(`uv`,new Gi(t,2))}return e.index?e.toNonIndexed():e}function U(e,t,n,r,i=0,a=0,o=0){return e.rotateX(i),e.rotateY(a),e.rotateZ(o),e.translate(t,n,r),e}function W(e,t,n,r,i,a,o,s=.3,c=0){return H(U(new Qo(e,t,n),r,i+t/2,a,0,c),o,s)}function eh(e,t,n,r,i,a,o,s=10,c=.3){return H(U(new L(e,t,n,s),r,i+n/2,a),o,c)}function th(e,t,n,r,i,a=1,o=.25){return H(U(new bc(e,a),t,n,r),i,o)}function nh(e,t,n,r,i,a,o){let s=a-i,c=new Qo(e,s,t).toNonIndexed();c.translate(n,i+s/2,r);let l=c.attributes.uv,u=c.attributes.normal,d=c.attributes.position.count,f=new I(o),p=f.clone().multiplyScalar(.82),m=new Float32Array(d*3);for(let r=0;r<d;r++){let i=u.getY(r),a=u.getX(r);if(Math.abs(i)>.5)l.setXY(r,Wm,Gm),m.set([p.r,p.g,p.b],r*3);else{let i=Math.abs(a)>.5?t:e;l.setXY(r,l.getX(r)*(i/16)+n*.37,l.getY(r)*(s/12.8));let o=Math.abs(a)>.5?.9:1;m.set([f.r*o,f.g*o,f.b*o],r*3)}}return c.setAttribute(`color`,new Gi(m,3)),c}function rh(e,t){let n=document.createElement(`canvas`);return n.width=e,n.height=t,[n,n.getContext(`2d`)]}function ih(e,t=4){let n=new Jo(e);return n.colorSpace=An,n.anisotropy=t,n}function ah(e,t,n,r,i,a){e.save(),e.translate(t,n),e.scale(1,i/r);let o=e.createRadialGradient(0,0,0,0,0,r);o.addColorStop(0,`rgba(20,10,40,${a})`),o.addColorStop(.55,`rgba(20,10,40,${a*.55})`),o.addColorStop(1,`rgba(20,10,40,0)`),e.fillStyle=o,e.beginPath(),e.arc(0,0,r,0,Math.PI*2),e.fill(),e.restore()}function oh(e,t,n,r,i,a,o){for(let s=0;s<r;s++)e.fillStyle=i[s%i.length],e.beginPath(),e.arc(V()*t,V()*n,a+V()*(o-a),0,Math.PI*2),e.fill()}function sh(){let e=1024,t=9.6,[n,r]=rh(e,e),i=n=>(n/t+1)*(e/2),a=e/2/t,o=(e,t,n)=>{r.fillStyle=n,r.beginPath(),r.arc(512,512,t*a,0,Math.PI*2),r.arc(512,512,e*a,0,Math.PI*2,!0),r.fill()};r.fillStyle=`#4b5596`,r.fillRect(0,0,e,e),o(7.85,t,`#e2675a`),o(7.7,7.85,`#fff2da`),o(0,2.6,`#3fb3b0`),o(2.6,2.75,`#fff2da`);for(let e=0;e<16;e++){let t=e/16*Math.PI*2;r.fillStyle=e%2?`rgba(255,255,255,0.05)`:`rgba(0,0,0,0.05)`,r.beginPath(),r.moveTo(512,512),r.arc(512,512,7.7*a,t,t+Math.PI/8),r.closePath(),r.fill()}r.save(),r.beginPath(),r.arc(512,512,t*a,0,Math.PI*2),r.clip(),oh(r,e,e,9e3,[`rgba(255,255,255,0.10)`,`rgba(0,0,0,0.12)`,`rgba(255,220,160,0.10)`,`rgba(120,200,255,0.08)`],.6,1.6),r.strokeStyle=`rgba(20,16,50,0.16)`,r.lineWidth=1.5;let s=1.6*a;for(let t=512%s;t<e;t+=s)r.beginPath(),r.moveTo(t,0),r.lineTo(t,e),r.moveTo(0,t),r.lineTo(e,t),r.stroke();r.restore(),r.setLineDash([.55*a,.4*a]),r.lineWidth=.16*a,r.strokeStyle=`rgba(255,214,64,0.75)`,r.beginPath(),r.arc(512,512,(ym+.35)*a,0,Math.PI*2),r.stroke(),r.setLineDash([]);for(let[e,t]of _m)ah(r,i(e+Zm.x*1.4),i(t+Zm.z*1.4),(gm+.55)*a,(gm+.45)*a,.55),r.strokeStyle=`rgba(255,242,218,0.85)`,r.lineWidth=.12*a,r.beginPath(),r.arc(i(e),i(t),(gm+.45)*a,0,Math.PI*2),r.stroke();ah(r,i(Zm.x*1.6),i(Zm.z*1.6),(vm+.7)*a,(vm+.6)*a,.6);let c=(e,t,n,i)=>{r.fillStyle=i,r.beginPath();for(let i=0;i<10;i++){let a=-Math.PI/2+i*Math.PI/5,o=i%2?n*.45:n;r.lineTo(e+Math.cos(a)*o,t+Math.sin(a)*o)}r.closePath(),r.fill()};for(let e=0;e<8;e++){let t=e/8*Math.PI*2+Math.PI/8;c(i(Math.cos(t)*8.42),i(Math.sin(t)*8.42),.36*a,`#ffd84a`)}let l=r.createRadialGradient(512,512,8.1*a,512,512,t*a);return l.addColorStop(0,`rgba(20,10,40,0)`),l.addColorStop(.75,`rgba(20,10,40,0.18)`),l.addColorStop(1,`rgba(20,10,40,0.5)`),r.fillStyle=l,r.fillRect(0,0,e,e),ih(n,8)}function ch(e){let t=1024,n=1024,[r,i]=rh(t,n),a=t/30,o=n/39,s=e=>(e+Jm)*a,c=e=>(e-Ym)*o;i.fillStyle=`#b9824f`,i.fillRect(0,0,t,n);let l=.55*o,u=0;for(let e=0;e<n;e+=l,u++){let n=-(u*37%80);for(;n<t;){let t=(2.2+V()*2.4)*a,r=V();i.fillStyle=r<.33?`#c48c57`:r<.66?`#b47c49`:`#bd8752`,i.fillRect(n+1,e+1,t-2,12.441025641025641),i.fillStyle=`rgba(255,230,190,0.10)`,i.fillRect(n+1,e+1,t-2,2),i.fillStyle=`rgba(60,30,10,0.35)`,i.fillRect(n+t-2,e,2,l),n+=t}i.fillStyle=`rgba(60,30,10,0.45)`,i.fillRect(0,e,t,1.5)}oh(i,t,n,2500,[`rgba(90,50,20,0.12)`,`rgba(255,230,190,0.07)`],.5,1.4),i.fillStyle=`#7a4a8c`;let d=s(-5.6),f=c(-15.2);i.fillRect(d,f,s(5.6)-d,c(-11.4)-f),i.strokeStyle=`#ffd36b`,i.lineWidth=6,i.strokeRect(d+10,f+10,s(5.6)-d-20,c(-11.4)-f-20),i.lineWidth=5,i.font=`400 21px "Lilita One", "Arial Black", sans-serif`,i.textAlign=`center`,i.textBaseline=`middle`,[[0,18.6,`1`],[0,17.2,`2`],[-.7,15.8,`3`],[.7,15.8,`4`],[0,14.4,`5`],[-.7,13,`6`],[.7,13,`7`],[0,11.6,`8`]].forEach(([e,t,n],r)=>{i.fillStyle=[`rgba(255,95,162,0.55)`,`rgba(255,210,58,0.55)`,`rgba(94,200,255,0.55)`,`rgba(140,255,122,0.5)`][r%4],i.fillRect(s(e-.68),c(t-.68),1.36*a,1.36*o),i.strokeStyle=`rgba(255,250,240,0.8)`,i.strokeRect(s(e-.68),c(t-.68),1.36*a,1.36*o),i.fillStyle=`rgba(255,250,240,0.9)`,i.fillText(n,s(e),c(t)+2)});for(let t of e)ah(i,s(t.x+Zm.x),c(t.z+Zm.z),t.rx*a,t.rz*o,t.a);ah(i,s(Zm.x*2),c(Zm.z*2),10.6*a,10.4*o,.5);let p=1.2,m=(e,t,n,r)=>{let a=i.createLinearGradient(e,t,n,r);return a.addColorStop(0,`rgba(30,15,40,0.45)`),a.addColorStop(1,`rgba(30,15,40,0)`),a};return i.fillStyle=m(0,0,p*a,0),i.fillRect(0,0,p*a,n),i.fillStyle=m(t,0,t-p*a,0),i.fillRect(t-p*a,0,p*a,n),i.fillStyle=m(0,0,0,p*o),i.fillRect(0,0,t,p*o),i.fillStyle=m(0,n,0,n-p*o),i.fillRect(0,n-p*o,t,p*o),ih(r,8)}function lh(){let[e,t]=rh(256,256);t.clearRect(0,0,256,256);for(let e=0;e<8;e++)for(let n=0;n<8;n++){let r=V();t.fillStyle=r<.38?`#ffd27a`:r<.48?`#ffb3d9`:r<.56?`#9be7ff`:`#2b2f5e`,t.fillRect(e*32+9,n*32+7,14,18),r<.56&&(t.fillStyle=`rgba(255,255,255,0.35)`,t.fillRect(e*32+9,n*32+7,14,4))}let n=ih(e,4);return n.wrapS=n.wrapT=st,n}function uh(e){try{document.fonts.load(`100px "Lilita One"`).then(e,()=>void 0)}catch{}}function dh(){let[e,t]=rh(1024,256),n=ih(e,4);return fh(t),uh(()=>{fh(t),n.needsUpdate=!0}),n}function fh(e){e.clearRect(0,0,1024,256),e.font=`400 150px "Lilita One", "Arial Black", sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`;let t=(t,n,r)=>{e.shadowColor=r;for(let[i,a]of[[40,18],[18,10]])e.shadowBlur=i,e.strokeStyle=r,e.lineWidth=a,e.strokeText(t,n,136);e.shadowBlur=8,e.fillStyle=`#fff6f0`,e.fillText(t,n,136)};t(`HOT`,300,`#ff3d7a`),t(`BOMB`,700,`#ffc93c`),e.shadowBlur=0}function ph(){let[e,t]=rh(64,64),n=t.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.18,`rgba(255,255,255,0.95)`),n.addColorStop(.4,`rgba(255,255,255,0.35)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.fillRect(0,0,64,64),ih(e,1)}function mh(){let[e,t]=rh(64,64),n=t.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,`rgba(0,0,0,1)`),n.addColorStop(.5,`rgba(0,0,0,0.75)`),n.addColorStop(1,`rgba(0,0,0,0)`),t.fillStyle=n,t.fillRect(0,0,64,64),ih(e,1)}function hh(e,t,n){let r=new oa;r.setAttribute(`position`,new Ji(e,3)),r.setAttribute(`aCol`,new Ji(t,3)),r.setAttribute(`aSize`,new Ji(n,1));let i=new Fc({uniforms:{uTex:{value:ph()},uScale:{value:400},uI:{value:1},fogColor:{value:new I},fogNear:{value:1},fogFar:{value:2}},vertexShader:`attribute vec3 aCol; attribute float aSize; uniform float uScale; varying vec3 vCol; varying float vFog;
void main(){ vCol=aCol; vec4 mv=modelViewMatrix*vec4(position,1.0); gl_PointSize=aSize*uScale/-mv.z; vFog=-mv.z; gl_Position=projectionMatrix*mv; }`,fragmentShader:`uniform sampler2D uTex; uniform float uI; uniform float fogNear; uniform float fogFar; varying vec3 vCol; varying float vFog;
void main(){ vec4 t=texture2D(uTex,gl_PointCoord); float f=1.0-0.6*smoothstep(fogNear,fogFar,vFog); gl_FragColor=vec4(vCol*t.rgb*uI*f, t.a); }`,transparent:!0,depthWrite:!1,blending:2}),a=new Go(r,i);return a.renderOrder=3,a.frustumCulled=!1,{pts:a,mat:i}}function gh(e,t){let n=new Rc({vertexColors:!0,map:lh()});return n.onBeforeCompile=t=>{t.uniforms.uGlow=e,t.fragmentShader=`uniform float uGlow;
`+t.fragmentShader.replace(`#include <map_fragment>`,`vec4 tw = texture2D( map, vMapUv );`).replace(`#include <color_fragment>`,`diffuseColor.rgb = mix( diffuseColor.rgb * vColor.rgb, tw.rgb * 0.45, tw.a );`).replace(`#include <emissivemap_fragment>`,`totalEmissiveRadiance += tw.rgb * tw.a * uGlow;`)},n.customProgramCacheKey=()=>`hb-world-`+t,n}var _h=[{name:`sunset`,skyTop:4930191,skyLow:16751218,fog:14191264,hemiSky:16770252,hemiGround:7166618,hemiI:1.55,sun:16765600,sunI:1.65,glow:.55,neon:1,bulbs:.8},{name:`night`,skyTop:987704,skyLow:3877486,fog:2959966,hemiSky:12108031,hemiGround:3812966,hemiI:1.45,sun:14673151,sunI:1.25,glow:1.25,neon:1.25,bulbs:1.3}],vh=class{constructor(e){this.root=new ri,this.roof=new ri,this.places=[null,null,null,null],this.place=0,this.glowMats=[],this.build=null,this.glowU={value:.6},this.fog=new di(14191264,40,140),this.theme=0,this.scene=e,this.root.add(this.roof),Qm=7,this.hemi=new sl(16777215,9075384,1.6),this.sun=new Sl(16777215,1.5),this.sun.position.copy(Xm),e.add(this.hemi,this.sun,this.root),e.fog=this.fog,this.sky=rh(4,256),this.skyTex=ih(this.sky[0],1),e.background=this.skyTex;let t=[],n=[],r=e=>n.push(e);r(H(U(new L(9.6,9.75,.5,64,1,!0),0,-.25,0),4012666,.55));let i=new Tc(9.12,.27,8,96).toNonIndexed();i.rotateX(Math.PI/2),i.translate(0,.2,0);{let e=i.attributes.position,t=new Float32Array(e.count*3),n=new I(16731501),r=new I(16774374);for(let i=0;i<e.count;i+=3){let a=(e.getX(i)+e.getX(i+1)+e.getX(i+2))/3,o=(e.getZ(i)+e.getZ(i+1)+e.getZ(i+2))/3,s=Math.floor((Math.atan2(o,a)+Math.PI)/(Math.PI*2)*48)%2;for(let e=0;e<3;e++)t.set(s?[n.r,n.g,n.b]:[r.r,r.g,r.b],(i+e)*3)}i.setAttribute(`color`,new Gi(t,3));let a=new Float32Array(e.count*2);for(let t=0;t<e.count;t++)a.set([Wm,Gm],t*2);i.setAttribute(`uv`,new Gi(a,2))}r(i);let a=.4,o=15849396,s=13804154;r(W(30.4,1,a,0,Km,Ym-a/2,o)),r(W(30.4,.7,a,0,Km,21.2,o)),r(W(a,1,39,-15-a/2,Km,3/2,o)),r(W(a,1,39,15.2,Km,3/2,o)),r(W(31,.12,.6000000000000001,0,.5,Ym-a/2,s,0)),r(W(31,.12,.6000000000000001,0,.19999999999999996,21.2,s,0)),r(W(.6000000000000001,.12,39.6,-15-a/2,.5,3/2,s,0)),r(W(.6000000000000001,.12,39.6,15.2,.5,3/2,s,0)),r(nh(30.8,39.8,0,3/2,qm,-.51,14721662));let c=Km,l=(e,n,r,i,a=.5)=>t.push({x:e,z:n,rx:r,rz:i,a});{let e=-11.6,t=-14.2;for(let[n,i]of[[-1,-1],[1,-1],[-1,1],[1,1]])r(W(.2,2.4,.2,e+n*1.05,c,t+i*1.05,5978926,.1));r(W(2.6,.2,2.6,e,1.9,t,7030326,0)),r(eh(1.45,1.45,2.1,e,2.1,t,11036479,14,.25));for(let n of[.5,1.5])r(eh(1.5,1.5,.12,e,2.1+n,t,4008484,14,0));r(H(U(new ts(1.65,1,14),e,4.7,t),8014387,0)),l(e,t,2.4,2.2,.55)}{let e=11.4,t=-14.6;r(W(4.2,2.9,3.4,e,c,t,16046520,.3)),r(W(4.6,.25,3.8,e,2.4,t,13203546,0)),r(W(1.3,2.1,.12,10.8,c,-12.879999999999999,7228374,.1)),r(W(.16,.16,.1,11.25,.55,-12.799999999999999,16765498,0)),r(W(.7,.5,.1,12.6,1.2,-12.879999999999999,10217471,0)),r(W(.9,.9,.9,12.6,2.65,-15.2,12042444,.3)),l(e,t,3,2.6,.6)}let u=(e,t,n)=>{r(W(1.7,1.05,1.25,e,c,t,14015459,.4,n)),r(H(U(new L(.45,.45,.06,14),e,.5700000000000001,t),3817298,0)),r(H(U(new Qo(.85,.03,.12),e,.6100000000000001,t,0,.6),9147302,0)),r(H(U(new Qo(.85,.03,.12),e,.6100000000000001,t,0,-.9),9147302,0)),l(e,t,1.35,1.1,.5)};u(6.6,-14,0),u(8.6,-12.2,.2),u(-13.2,-8.5,Math.PI/2);let d=(e,t,n,i,a=13933141)=>{r(W(n,n,n,e,c,t,a,.35,i)),r(W(n*1.02,n*.12,n*1.02,e,c+n*.44,t,10118708,0,i))};d(12.4,-8.4,1.1,.2),d(13.3,-7,.9,-.3),d(12.6,-7.6,.8,.5),r(W(.82,.82,.82,12.6,.6000000000000001,-7.9,15250540,.2,.45)),l(12.8,-7.6,1.8,1.6,.55),d(-12.9,9.6,1,.3),d(-11.8,10.4,.8,-.2,13208139),l(-12.4,10,1.5,1.3,.5);let f=(e,t,n,i,a=13921099)=>{r(eh(.55*n,.4*n,.75*n,e,c,t,a,12,.35)),r(eh(.6*n,.6*n,.1*n,e,c+.72*n,t,15239782,12,0)),r(th(.62*n,e,c+1.15*n,t,i,1,.35)),r(th(.42*n,e+.35*n,c+1.45*n,t-.15*n,i+1054728,1,.2)),r(th(.38*n,e-.32*n,c+1.35*n,t+.2*n,i-526336,1,.2)),l(e,t,.9*n,.8*n,.5)};f(-13,-3.5,1.15,5220410),f(-13.2,2.6,1,4168266,7244768),f(13,2.4,1.1,5681226,15909198),f(13.3,-2.6,.9,4168266),f(-6.2,-15.6,.95,5220410,7244768),f(6.4,-16.4,.9,5681226);let p=(e,t)=>{r(eh(.6,.45,.8,e,c,t,13921099,12,.35));for(let n=0;n<6;n++)r(H(U(new L(.14,.17,.42,6),e+n*.04,.44999999999999996+n*.4,t-n*.03,0,0,.06),9071173,.1));for(let n=0;n<7;n++){let i=n/7*Math.PI*2;r(H(U(new Qo(1.7,.06,.42),e+.3+Math.cos(i)*.8,2.45,t+Math.sin(i)*.8,0,-i,-.35),4168266,0))}l(e,t,1.4,1.3,.45)};p(-13.4,-12.4),p(13.6,6.8);for(let e=0;e<9;e++){let t=-12+e*3;if(!(Math.abs(t)<2)){r(W(2.2,.45,.6,t,c,20.55,9067066,.2));for(let n=0;n<4;n++)r(th(.2,t-.75+n*.5,.050000000000000044,20.55,[16740270,16765498,16777215,10976255][(e+n)%4],0,0));r(th(.32,t,0,20.55,5220410,0,.2))}}let m=(e,t)=>{r(W(.55,.08,.55,e,c,t,16738859,0)),r(H(U(new ts(.22,.75,10),e,-.04999999999999999,t),16738859,.2)),r(H(U(new L(.13,.17,.12,10),e,-.04999999999999999,t),16777215,0)),l(e,t,.5,.45,.4)};m(11.6,10.6),m(12.6,11.1),m(-11.5,6.4);let h=(e,t,n)=>{r(W(2.4,.12,.8,e,-.04999999999999999,t,14837594,.1,n)),r(W(2.4,.6,.12,e+Math.sin(n)*.38,0,t+Math.cos(n)*-.38,14837594,.1,n)),r(W(.12,.45,.7,e+Math.cos(n)*1,c,t-Math.sin(n)*1,3817298,0,n)),r(W(.12,.45,.7,e-Math.cos(n)*1,c,t+Math.sin(n)*1,3817298,0,n)),l(e,t,1.7,.9,.45)};h(-13.6,-.4,Math.PI/2);{let e=-7.5,t=16.2;r(H(U(new Tc(2.1,.42,8,28),e,-.08000000000000002,t,Math.PI/2),6211839,.3)),r(H(U(new es(2.05,28),e,0,t,-Math.PI/2),9433343,0)),r(H(U(new Tc(.5,.18,6,14),-6.9,.12,15.799999999999999,Math.PI/2),16765498,0)),r(th(.32,-8.4,.19999999999999996,16.7,16736162,1,0)),l(e,t,2.8,2.5,.5)}let g=(e,t)=>{r(W(1,.32,2.2,e,c,t,16774374,.25)),r(H(U(new Qo(1,.14,.9),e,.12,t-1.05,-.65),16774374,0)),r(W(.9,.06,1.5,e,-.18,t+.3,4174768,0)),l(e,t,1,1.6,.45)};g(6,16.4),g(7.8,16.6),r(W(.8,.5,.8,9.6,c,16,13933141,.3)),r(eh(.12,.12,.3,9.6,0,16,16731501,8,0)),f(12.8,18.5,1,5220410),f(-12.8,18,1.1,5681226,7244768),h(13.8,-.1,-Math.PI/2);let _=-12.6;for(let e of[-1,1])r(W(.28,4.2,.28,0+e*5.4,c,_,2958672,.2));r(H(U(new Qo(11.4,2.9,.25),0,3.05,-12.85,-.42),2234941,0)),l(0,_,6,1.3,.45);let v=new xc(10.8,2.7);v.rotateX(-.42),v.translate(0,3.08,-12.68),this.signMat=new La({map:dh(),transparent:!0,depthWrite:!1,toneMapped:!1});let y=new Ya(v,this.signMat);y.renderOrder=2,this.roof.add(y);let b=[],x=[],S=[],C=[],w=[16761963,16743096,9169407,16770442,12164095],T=[[-14.2,-3.5],[-13.4,-16.8],[-5.6,-17.4],[5.6,-17.4],[13.4,-16.8],[14.2,-3.5]],E=3.4;for(let[e,t]of T)r(eh(.09,.11,4,e,c,t,3813712,12,.1)),r(eh(.22,.26,.2,e,c,t,3813712,10,0));let D=0;for(let e=0;e<T.length-1;e++){let[t,n]=T[e],[r,i]=T[e+1],a=Math.hypot(r-t,i-n),o=Math.max(4,Math.round(a/1.1)),s=t,c=E,l=n;for(let e=1;e<=o;e++){let u=e/o,d=t+(r-t)*u,f=n+(i-n)*u,p=E-Math.sin(u*Math.PI)*a*.09;if(C.push(s,c,l,d,p,f),s=d,c=p,l=f,e<o){let e=new I(w[D++%w.length]);b.push(d,p-.18,f),x.push(e.r,e.g,e.b),S.push(.95),b.push(d,p-.18,f),x.push(1,.97,.9),S.push(.32)}}}let O=new oa;O.setAttribute(`position`,new Ji(C,3)),this.roof.add(new zo(O,new Do({color:2366520}))),Qm=99;let ee=[6970024,9071541,5925808,11565736,8228815,10251162,6115222,12880544];for(let e=-6;e<=6;e++)for(let t=-8;t<=3;t++){let n=e*23,i=t*23-2;if(Math.abs(n)<30&&i>-40&&i<28)continue;r(W(18,.3,18,n,qm,i,9209e3,0));let a=1+Math.floor(V()*3);for(let e=0;e<a;e++){let e=5+V()*8,t=5+V()*8,a=n+(V()-.5)*(16-e),o=i+(V()-.5)*(16-t),s=o>10?-10:o<-45?10:-3,c=-22+V()*(s-qm-8),l=ee[Math.floor(V()*ee.length)];if(r(nh(e,t,a,o,-29.7,c,l)),r(W(e+.3,.5,t+.3,a,c,o,14207208,0)),V()<.7&&r(W(1.4+V()*1.4,.9,1.2+V(),a+(V()-.5)*(e-2),c+.4,o+(V()-.5)*(t-2),12170440,.3)),V()<.35&&r(eh(.9,.9,1.8,a+(V()-.5)*(e-2),c+.4,o+(V()-.5)*(t-2),10119754,8,.3)),V()<.3){let n=a+(V()-.5)*(e-3),i=o+(V()-.5)*(t-3);r(W(2.5,.25,2.5,n,c+.4,i,5216842,0))}}for(let[e,t]of[[-1,-1],[1,-1],[-1,1],[1,1]])b.push(n+e*9.5,-28.5,i+t*9.5),x.push(1,.82,.5),S.push(2.6)}r(H(U(new xc(400,400),0,qm,-40,-Math.PI/2),3091018,0));for(let e=-6;e<=6;e++){let t=e*23+23/2;for(let e=-190;e<70;e+=4)r(H(U(new xc(.25,1.8),t,-29.98,e,-Math.PI/2),16765803,0));for(let e=0;e<6;e++){let e=-180+V()*240,n=V()<.5?-1:1;for(let r of[-.6,.6])b.push(t+n*1.6,-29.4,e+r),x.push(1,n>0?.95:.25,n>0?.8:.2),S.push(1.4)}}for(let e=-8;e<=3;e++){let t=e*23-2+23/2;for(let e=-150;e<150;e+=4)r(H(U(new xc(1.8,.25),e,-29.98,t,-Math.PI/2),16765803,0))}let te=gh(this.glowU,`roof`),ne=new Ya(Vm(n.map(e=>e.index?e.toNonIndexed():e)),te);ne.matrixAutoUpdate=!1,this.roof.add(ne);let re=new xc(30,39);re.rotateX(-Math.PI/2),re.translate(0,Km,3/2);let k=new Ya(re,new Rc({map:ch(t)}));k.matrixAutoUpdate=!1,this.roof.add(k);let ie=new es(9.6,72);ie.rotateX(-Math.PI/2);let ae=new Ya(ie,new Rc({map:sh()}));ae.matrixAutoUpdate=!1,this.roof.add(ae);let oe=hh(b,x,S);this.glowMat=oe.mat,this.glowMats.push(oe.mat),this.roof.add(oe.pts),this.setTheme(0)}setTheme(e){this.theme=e%_h.length,this.place===0&&this.applyTheme(_h[this.theme])}setPlace(e){this.ensure(e),e!==0&&!this.places[e]&&(e=0),this.place=e,this.roof.visible=e===0,this.places.forEach((t,n)=>{t&&(t.root.visible=n===e)}),this.applyTheme(e===0?_h[this.theme]:this.places[e].theme)}ensure(e){if(e!==0&&!this.places[e]&&this.build){let t=this.build(e);return t.root.visible=!1,this.places[e]=t,this.root.add(t.root),t.glowMat&&this.glowMats.push(t.glowMat),t}return null}cur(){return this.place===0?null:this.places[this.place]}applyTheme(e){this.hemi.color.set(e.hemiSky),this.hemi.groundColor.set(e.hemiGround),this.hemi.intensity=e.hemiI,this.sun.color.set(e.sun),this.sun.intensity=e.sunI,this.fog.color.set(e.fog),this.glowU.value=e.glow,this.signMat.color.setScalar(e.neon);for(let t of this.glowMats)t.uniforms.uI.value=e.bulbs;let[t,n]=this.sky,r=n.createLinearGradient(0,0,0,256);r.addColorStop(0,`#`+new I(e.skyTop).getHexString()),r.addColorStop(1,`#`+new I(e.skyLow).getHexString()),n.fillStyle=r,n.fillRect(0,0,t.width,t.height),this.skyTex.needsUpdate=!0}setView(e,t){this.fog.near=e+12,this.fog.far=e+120;for(let e of this.glowMats)e.uniforms.uScale.value=t,e.uniforms.fogNear.value=this.fog.near,e.uniforms.fogFar.value=this.fog.far}};function yh(){let e=new Tc(gm*.7,.26,8,24).toNonIndexed();e.rotateX(Math.PI/2),e.translate(0,.46,0);let t=e.attributes.position,n=new Float32Array(t.count*3),r=new I(16736162),i=new I(16774374);for(let e=0;e<t.count;e+=3){let a=(t.getX(e)+t.getX(e+1)+t.getX(e+2))/3,o=(t.getZ(e)+t.getZ(e+1)+t.getZ(e+2))/3,s=Math.floor((Math.atan2(o,a)+Math.PI)/(Math.PI*2)*8)%2;for(let t=0;t<3;t++)n.set(s?[r.r,r.g,r.b]:[i.r,i.g,i.b],(e+t)*3)}e.setAttribute(`color`,new Gi(n,3));let a=new Float32Array(t.count*2);return e.setAttribute(`uv`,new Gi(a,2)),Vm([H(U(new L(gm,gm*1.08,.36,20),0,.18,0),2829678,.4),H(U(new L(gm*1,gm*1,.06,20),0,.36,0),16765498,0),e,H(U(new R(gm*.5,16,8,0,Math.PI*2,0,Math.PI/2),0,.42,0),16765498,0),H(U(new R(gm*.16,8,6),-.12,.78,.12),16776168,0)])}function bh(){let e=[],t=new L(vm,vm*1.12,.95,24,1).toNonIndexed();t.translate(0,.475,0);{let n=t.attributes.position,r=new Float32Array(n.count*3),i=new I(16765498),a=new I(2826803),o=new I(4867424);for(let e=0;e<n.count;e+=3){let t=(n.getX(e)+n.getX(e+1)+n.getX(e+2))/3,s=(n.getY(e)+n.getY(e+1)+n.getY(e+2))/3,c=(n.getZ(e)+n.getZ(e+1)+n.getZ(e+2))/3,l=Math.floor((Math.atan2(c,t)+Math.PI)/(Math.PI*2)*12+s*1.5)%2,u=Math.abs(s-.95)<.01||Math.abs(s)<.01?o:l?i:a;for(let t=0;t<3;t++)r.set([u.r,u.g,u.b],(e+t)*3)}t.setAttribute(`color`,new Gi(r,3)),t.setAttribute(`uv`,new Gi(new Float32Array(n.count*2),2)),e.push(t)}e.push(H(U(new L(vm*.75,vm*.8,.12,20),0,.98,0),7236229,0)),e.push(H(U(new R(.4,12,8,0,Math.PI*2,0,Math.PI/2),0,1.02,0),16727373,0)),e.push(H(U(new R(.12,8,6),-.12,1.3,.12),16777215,0));for(let t=0;t<14;t++){let n=ym*2/14,r=-ym+n*(t+.5);Math.abs(r)<.81||e.push(H(U(new L(.24,.24,n*.98,12),r,.55,0,0,0,Math.PI/2),t%2?16731469:16774374,0))}for(let t of[-1,1])e.push(H(U(new R(.36,14,10),t*ym,.55,0),16765498,0)),e.push(H(U(new R(.1,6,5),t*ym-.12,.78,.14),16776168,0)),e.push(H(U(new L(.08,.1,.5,6),t*(vm+.25),.3,0),2826803,0));return Vm(e)}function xh(){let[e,t]=rh(1024,256),n=()=>{t.fillStyle=`#ffffff`,t.fillRect(0,0,1024,256),t.font=`400 200px "Lilita One", "Arial Black", sans-serif`,t.textAlign=`center`,t.textBaseline=`middle`,[`1`,`2`,`3`].forEach((e,n)=>{t.fillStyle=`#2b2040`,t.fillText(e,128+n*256,140)})};n();let r=ih(e,4);r.generateMipmaps=!1,r.minFilter=pt,uh(()=>{n(),r.needsUpdate=!0});let i=[];return[[0,1.5,16763196],[-2,1,13226982],[2,.65,14717018]].forEach(([e,t,n],r)=>{let a=new Qo(1.9,t,1.9).toNonIndexed();a.translate(e,t/2,0);let o=a.attributes.uv,s=a.attributes.normal,c=a.attributes.position.count,l=new I(n),u=new Float32Array(c*3);for(let e=0;e<c;e++){s.getZ(e)>.5?o.setXY(e,(r+.15+o.getX(e)*.7)/4,.1+o.getY(e)*.8):o.setXY(e,3.5/4,.5);let t=s.getY(e)>.5?1.15:1;u.set([Math.min(1,l.r*t),Math.min(1,l.g*t),Math.min(1,l.b*t)],e*3)}a.setAttribute(`color`,new Gi(u,3)),i.push(a);let d=new Qo(2,.12,2).toNonIndexed();d.translate(e,t,0);let f=d.attributes.uv;for(let e=0;e<f.count;e++)f.setXY(e,3.5/4,.5);let p=new Float32Array(f.count*3),m=new I(16774374);for(let e=0;e<f.count;e++)p.set([m.r,m.g,m.b],e*3);d.setAttribute(`color`,new Gi(p,3)),i.push(d)}),new Ya(Vm(i),new Rc({map:r,vertexColors:!0}))}var Sh=[[0,1.5],[-2,1],[2,.65]],G=new F(0,1.2,0),Ch=.47,K=new F(1.08,.94,1),wh=new F(.33,.7,.02),Th=.3,Eh=new F(.135,.3,0),Dh=2.12,Oh=2234931,kh=[[0,-1,0,0,0],[1,0,0,.32,0],[2,1,0,.32,0],[3,2,0,.78,0],[4,2,wh.x,wh.y,wh.z],[5,2,wh.x,wh.y-Th,wh.z],[6,2,-wh.x,wh.y,wh.z],[7,2,-wh.x,wh.y-Th,wh.z],[8,1,Eh.x,Eh.y,Eh.z],[9,1,-Eh.x,Eh.y,Eh.z],[10,3,0,1.25,.42],[11,3,0,1.03,.42],[12,3,0,1.43,.36],[13,3,0,1.2,.44],[14,3,0,1.2,.44],[15,3,0,1.86,0],[16,3,.42,1.38,.18]];function Ah(e,t){let n=new R(Ch*1.06,20,8,0,Math.PI*2,0,Math.PI*.5);n.rotateX(-.3),n.scale(K.x,K.y,K.z),e(n.translate(G.x,G.y+.03,G.z-.03),3,t)}function jh(e,t,n,r,i=0,a=0,o=0,s=1,c=1,l=1){return e.scale(s,c,l),e.rotateX(i),e.rotateY(a),e.rotateZ(o),e.translate(t,n,r),e}function Mh(e,t,n=0){let r=new F(Math.sin(e)*Math.cos(t),Math.sin(t),Math.cos(e)*Math.cos(t));return{p:new F(r.x*K.x,r.y*K.y,r.z*K.z).multiplyScalar(Ch+n).add(G),n:new F(r.x/K.x,r.y/K.y,r.z/K.z).normalize()}}function Nh(e,t,n,r,i=0){let{p:a,n:o}=Mh(t,n,r);return e.rotateZ(i),e.applyQuaternion(new ar().setFromUnitVectors(new F(0,0,1),o)),e.translate(a.x,a.y,a.z),e}function Ph(e,t,n,r=16){return new es(1,r).scale(e,t,1).translate(0,0,n*.7+.006)}function Fh(e){let t=new Ns;for(let n=0;n<10;n++){let r=n/10*Math.PI*2+Math.PI/2,i=n%2?e*.45:e;n?t.lineTo(Math.cos(r)*i,Math.sin(r)*i):t.moveTo(Math.cos(r)*i,Math.sin(r)*i)}let n=new _c(t,{depth:e*.35,bevelEnabled:!1});return n.translate(0,0,-e*.17),n}function Ih(e){let t=new Ns;[[.1,.5],[-.28,-.04],[-.02,-.04],[-.12,-.5],[.28,.08],[.02,.08]].forEach(([n,r],i)=>i?t.lineTo(n*e*2,r*e*2):t.moveTo(n*e*2,r*e*2));let n=new _c(t,{depth:e*.2,bevelEnabled:!1});return n.translate(0,0,-e*.1),n}function Lh(e){let t=[];for(let n=0;n<=18;n++){let r=n/18,i=r*Math.PI*5;t.push(new F(Math.cos(i)*e*(.12+.88*r),Math.sin(i)*e*(.12+.88*r),0))}return new Ec(new fs(t),18,e*.13,3,!1)}function Rh(e,t,n,r=!1){let i=new Tc(e,t,5,12,n);return i.rotateZ(-Math.PI/2-n/2),r&&i.rotateZ(Math.PI),i}function zh(e,t){let n=new I(e);return n.multiplyScalar(t),n.getHex()}var Bh=[{name:`Hoodie`,skin:16765616,top:4172287,trim:2322646,pants:2896720,shoe:16777215,sole:4172287,hair:3810840,lids:!0,sleeves:`long`,mouth:`smirk`,brow:-.18,extra(e,t,n){if(n){Ah(e,t.hair),e(jh(new R(.27,14,8),0,.84,-.17,0,0,0,1.25,.55,.75),2,t.top),e(jh(new Tc(.2,.04,5,18),0,.88,-.15,Math.PI/2-.25,0,0,1.2,1,.8),2,t.trim,!1),e(jh(new $o(.05,.22,3,8),0,.46,.22,0,0,Math.PI/2,1,1,.5),2,t.trim,!1);return}let r=new R(Ch*1.13,20,12,0,Math.PI*2,.98,Math.PI-.98);r.rotateX(Math.PI/2-.22),r.scale(K.x,K.y,K.z),e(r.translate(G.x,G.y+.02,G.z-.02),3,t.top);let i=Ch*1.13*Math.sin(.98),a=Ch*1.13*Math.cos(.98),o=new Tc(i,.055,7,28);o.translate(0,0,a),o.rotateX(-.22),o.scale(K.x,K.y,K.z),e(o.translate(G.x,G.y+.02,G.z-.02),3,t.trim),e(jh(new $o(.05,.22,3,8),0,.46,.22,0,0,Math.PI/2,1,1,.5),2,t.trim,!1)}},{name:`Headphones`,skin:10248768,top:16736162,trim:16777215,pants:2763317,shoe:16736162,sole:16777215,hair:2037013,lids:!1,sleeves:`short`,mouth:`grin`,brow:.12,extra(e,t,n){let r=new R(Ch*1.16,22,10,0,Math.PI*2,0,Math.PI*.56);r.rotateX(-.42),r.scale(K.x*1.04,K.y*1.05,K.z),e(jh(r,G.x,G.y+.05,G.z-.04),3,t.hair);for(let[n,r,i]of[[2.2,.15,.2],[-2.2,.15,.2],[Math.PI,.25,.23]])e(Nh(new R(i,10,8),n,r,0),3,t.hair);for(let n=0;n<7;n++){let r=-.9+n*.3;e(Nh(new R(.11,10,8),r,.5+Math.abs(r)*.05,.02),3,t.hair)}if(e(Nh(Rh(.2,.025,1.3,!0).scale(1,.6,.4),.15,.8,.11,-.25),3,5914680,!1),n!==`headset`){if(!n){let t=new Tc(Ch*1.2,.055,6,20,Math.PI);t.scale(K.x*1.06,K.y*1.12,1),e(jh(t,G.x,G.y+.04,G.z-.04,0,0,0),3,2763317)}for(let n of[-1,1])e(jh(new L(.17,.17,.13,16),n*Ch*K.x*1.2,G.y+.02,G.z-.04,0,0,Math.PI/2),3,t.top),e(jh(new L(.11,.11,.05,12),n*Ch*K.x*1.29,G.y+.02,G.z-.04,0,0,Math.PI/2),3,16777215,!1)}}},{name:`Cap`,skin:15975323,top:6217834,trim:16777215,pants:3820138,shoe:16777215,sole:3119678,hair:14181418,lids:!1,sleeves:`short`,mouth:`smirk`,brow:0,extra(e,t,n){if(n)Ah(e,t.hair);else{let n=new R(Ch*1.07,20,8,0,Math.PI*2,0,Math.PI/2);n.scale(K.x,K.y*.92,K.z),e(jh(n,G.x,G.y+.15,G.z-.02,-.08,0,0),3,t.top);let r=new L(.34,.34,.045,18,1,!1,-Math.PI/2,Math.PI);r.scale(1.05,1,.78),e(jh(r,0,G.y+.17,G.z+Ch*.84,-.32,0,0),3,zh(t.top,.72)),e(jh(new R(.05,8,5),0,G.y+.15+Ch*K.y*.98,-.04),3,zh(t.top,.72))}for(let n of[2.3,-2.3,Math.PI,1.55,-1.55])e(Nh(new R(.1,8,6).scale(1.3,1,.6),n,.12,0),3,t.hair);for(let[n,r]of[[.62,-.5],[-.62,.5],[.95,-.9],[-.95,.9]])e(Nh(new $o(.055,.09,3,8).rotateZ(r).scale(1,1,.5),n,.34,.01),3,t.hair,!1);for(let t of[-1,1])for(let[n,r]of[[0,0],[.07,.03],[.05,-.05]])e(Nh(Ph(.016,.016,.01,6),t*(.5+n),-.12+r,.004),3,12875854,!1);e(jh(Fh(.1),0,.6,.235,-.12,0,0),2,16777215,!1)}},{name:`Helmet`,skin:7028520,top:16763196,trim:2761779,pants:2761779,shoe:2761779,sole:16763196,hair:1445906,lids:!1,sleeves:`long`,mouth:`teeth`,brow:.25,extra(e,t,n){if(n){Ah(e,t.hair),e(jh(Ih(.13),0,.58,.235,-.12,0,0),2,t.trim,!1);return}let r=new R(Ch*1.13,20,9,0,Math.PI*2,0,Math.PI*.44);r.scale(K.x,K.y,K.z),e(jh(r,G.x,G.y+.06,G.z-.06,-.22,0,0),3,t.top);let i=new Tc(Ch*1.13*Math.sin(Math.PI*.44),.045,5,24);i.rotateX(Math.PI/2),i.scale(K.x,1,K.z),i.translate(0,Ch*1.13*K.y*Math.cos(Math.PI*.44),0),e(jh(i,G.x,G.y+.06,G.z-.06,-.22,0,0),3,zh(t.top,.75));let a=new Tc(Ch*1.15,.065,5,22,Math.PI*.62);a.rotateZ(Math.PI*.19+.12),a.rotateY(Math.PI/2),a.scale(K.x,K.y,K.z),e(jh(a,G.x,G.y+.03,G.z-.03),3,t.trim,!1),e(jh(new Tc(Ch*1.12,.035,4,26),G.x,G.y+.17,G.z-.02,Math.PI/2-.35,0,0,K.x,1,K.z),3,t.trim,!1);for(let t of[-1,1])e(Nh(new L(.13,.13,.07,16).rotateX(Math.PI/2),t*.3,.66,.11),3,2761779),e(Nh(new L(.1,.1,.03,16).rotateX(Math.PI/2),t*.3,.66,.15),3,6220031,!1),e(Nh(Ph(.03,.03,.01,6),t*.3+.04,.7,.17),3,16777215,!1);e(jh(Ih(.13),0,.58,.235,-.12,0,0),2,t.trim,!1)}},{name:`Beanie`,skin:16769484,top:10976255,trim:8015840,pants:3880272,shoe:15921911,sole:10976255,hair:5562568,lids:!0,sleeves:`long`,mouth:`smile`,brow:-.05,extra(e,t,n){let r=new R(Ch*1.08,16,10,Math.PI/2+1.05,Math.PI*2-2.1,Math.PI*.3,Math.PI*.55);r.scale(K.x,K.y*1.12,K.z),e(jh(r,G.x,G.y-.06,G.z-.02),3,t.hair);for(let n of[-1,1])e(jh(new $o(.09,.28,4,8),n*.43,G.y-.18,G.z+.14,.15,0,n*.18),3,t.hair);e(Nh(new $o(.075,.26,4,8).rotateZ(1.2).scale(1,1,.6),.2,.47,0),3,t.hair);for(let t of[-1,1])e(Nh(Ph(.06,.035,.01,8),t*.52,-.16,.003),3,16751792,!1);if(n){Ah(e,t.hair);return}let i=new R(Ch*1.1,20,8,0,Math.PI*2,0,Math.PI*.42);i.scale(K.x,K.y*1.25,K.z),e(jh(i,G.x,G.y+0,G.z-.03,-.18,0,0),3,t.top);let a=Ch*1.1*Math.sin(Math.PI*.42),o=new L(a*1.04,a*1.08,.14,24,1,!0);o.scale(K.x,1,K.z);let s=Ch*1.1*K.y*1.25*Math.cos(Math.PI*.42);e(jh(o,G.x,G.y+s-.02,G.z-.03,-.18,0,0),3,t.trim),e(jh(new bc(.13,1),G.x,G.y+Ch*K.y*1.38,G.z-.14),3,16777215)}},{name:`Bandana`,skin:13208415,top:16747069,trim:16777215,pants:2502730,shoe:16747069,sole:16777215,hair:1975091,lids:!1,sleeves:`short`,mouth:`teeth`,brow:.3,extra(e,t,n){let r=[[0,1.25,.15,.36],[.45,1,.14,.3],[-.45,1,.14,.3],[0,.8,.14,.3],[1,.75,.13,.28],[-1,.75,.13,.28],[2,.75,.14,.3],[-2,.75,.14,.3],[Math.PI,.8,.14,.3],[Math.PI,1.2,.14,.3],[2.7,.35,.13,.26],[-2.7,.35,.13,.26]],i=new R(Ch*1.03,18,6,0,Math.PI*2,0,Math.PI*.4);i.scale(K.x,K.y,K.z),e(jh(i,G.x,G.y+.02,G.z-.03,-.25,0,0),3,t.hair);for(let[i,a,o,s]of r){if(n&&a>.8)continue;let r=new ts(o,s,6);r.translate(0,s/2-.04,0),r.rotateX(Math.PI/2),e(Nh(r,i,a,-.03),3,t.hair)}if(!n){let n=new L(Ch*1.02,Ch*1.04,.13,26,1,!0);n.scale(K.x,1,K.z),e(jh(n,G.x,G.y+.21,G.z-.01,-.2,0,0),3,t.top),e(jh(new R(.08,8,6),0,G.y+.29,G.z-Ch*1.02),3,t.top);for(let n of[-1,1])e(jh(new ts(.07,.3,5),n*.08,G.y+.18,G.z-Ch*1.02-.13,-1.9,0,n*.5,1,1,.45),3,t.top)}e(Nh(new Qo(.15,.06,.02),-.62,-.18,.01,.5),3,16176040,!1)}}],Vh=null;function Hh(){return Vh||(Vh=new lo(new Uint8Array([150,150,150,255,215,215,215,255,255,255,255,255]),3,1,jt),Vh.minFilter=Vh.magFilter=ut,Vh.generateMipmaps=!1,Vh.needsUpdate=!0,Vh)}function Uh(e,t,n,r){if(e.attributes.uv&&e.deleteAttribute(`uv`),!e.index){let t=e.attributes.position.count,n=[];for(let e=0;e<t;e++)n.push(e);e.setIndex(n)}let i=e.attributes.position.count,a=new I(n),o=new Float32Array(i*3),s=new Uint16Array(i*4),c=new Float32Array(i*4),l=new Float32Array(i);for(let e=0;e<i;e++)o[e*3]=a.r,o[e*3+1]=a.g,o[e*3+2]=a.b,s[e*4]=t,c[e*4]=1,l[e]=r;return e.setAttribute(`color`,new Gi(o,3)),e.setAttribute(`skinIndex`,new Ki(s,4)),e.setAttribute(`skinWeight`,new Gi(c,4)),e.setAttribute(`aOutl`,new Gi(l,1)),e}function Wh(e){let t=new oa;t.setAttribute(`position`,e.attributes.position.clone()),e.index&&t.setIndex(e.index.clone());let n=Um(t,1e-4);n.computeVertexNormals();let r=n.index;for(let e=0;e<r.count;e+=3){let t=r.getX(e+1);r.setX(e+1,r.getX(e+2)),r.setX(e+2,t)}return n}function Gh(e,t=``,n=0){let r=[],i=(e,t,n,i=!0)=>r.push({g:e,bone:t,color:n,line:i}),a=e;i(jh(new R(Ch,20,14),G.x,G.y,G.z,0,0,0,K.x,K.y,K.z),3,a.skin);for(let e of[-1,1])i(jh(new R(.075,8,6),e*Ch*K.x*.98,G.y-.04,0,0,0,0,.6,1,1),3,a.skin);i(jh(new $o(.255,.16,4,14),0,.56,0,0,0,0,1.12,1,.9),2,a.top),i(jh(new L(.27,.25,.16,16),0,.33,0,0,0,0,1.08,1,.9),1,a.pants),i(jh(new Tc(.265,.035,5,18),0,.42,0,Math.PI/2,0,0,1.13,.9,1),2,zh(a.top,.7),!1);for(let e of[-1,1]){let t=e>0?4:6,n=e>0?5:7,r=e*wh.x;i(jh(new $o(.09,.04,3,8),r,wh.y-.07,wh.z),t,a.top);let o=a.sleeves===`long`;i(jh(new L(o?.084:.066,o?.078:.062,.2,8),r,wh.y-.19,wh.z),t,o?a.top:a.skin),o&&i(jh(new Tc(.074,.022,4,10),r,wh.y-.24,wh.z,Math.PI/2),t,a.trim,!1),i(jh(new R(.1,8,6),r,wh.y-Th,wh.z),n,a.skin);let s=e>0?8:9,c=e*Eh.x;i(jh(new $o(.095,.1,2,8),c,.2,0),s,a.pants),i(jh(new R(1,10,5,0,Math.PI*2,0,Math.PI*.62),c,.035,.04,0,0,0,.125,.13,.18),s,a.shoe),i(jh(new L(1,1,1,12),c,.035,.04,0,0,0,.13,.06,.185),s,a.sole)}for(let e of[-1,1]){let t=e*.29;if(a.lids){let n=(e,t,n)=>new es(1,16,Math.PI,Math.PI).scale(e,t,1).translate(0,0,n);i(Nh(n(.105,.105,.016),t,.11,0,e*.1),10,16777215,!1),i(Nh(n(.068,.075,.03),t-e*.02,.11,0,e*.1),10,Oh,!1),i(Nh(Ph(.022,.022,.01,8),t+e*.015,.06,.04),10,16777215,!1),i(Nh(new $o(.02,.2,3,6).rotateZ(Math.PI/2),t,.11,.04,e*.1),10,Oh,!1)}else i(Nh(Ph(.095,.125,.04),t,.08,-.012),10,16777215,!1),i(Nh(Ph(.068,.088,.03),t-e*.02,.07,.012),10,Oh,!1),i(Nh(Ph(.028,.028,.01,8),t+e*.03,.135,.04),10,16777215,!1);i(Nh(new Qo(.15,.04,.03),t,.33,.005,e*a.brow),12,a.hair===5562568?3054218:Oh,!1)}a.mouth===`smile`?i(Nh(Rh(.08,.022,2),0,-.3,.004),11,Oh,!1):a.mouth===`smirk`?i(Nh(Rh(.08,.022,1.6),.08,-.3,.004,.25),11,Oh,!1):(i(Nh(new es(1,14,Math.PI,Math.PI).scale(.13,.1,1),0,-.27,.006),11,5906222,!1),a.mouth===`teeth`?i(Nh(new xc(.22,.035).translate(0,-.0175,0),0,-.27,.008),11,16777215,!1):i(Nh(new es(1,10,Math.PI,Math.PI).scale(.07,.045,1),0,-.315,.008),11,16743052,!1));for(let e of[-1,1]){let t=e*.29;i(Nh(Ph(.12,.15,.045),t,.1,-.008),13,16777215,!1),i(Nh(Ph(.035,.035,.02,8),t-e*.02,.08,.03),13,Oh,!1),i(Nh(new Qo(.14,.035,.03),t,.42,.005,e*.4),13,Oh,!1)}i(Nh(Ph(.085,.1,.03),0,-.3,-.004),13,5906222,!1),i(Nh(Ph(.05,.035,.012,8),0,-.36,.02),13,16743052,!1);let o=new R(.07,10,8);o.translate(0,-.01,0);let s=new ts(.062,.1,10).translate(0,.07,0);i(jh(o,.42,1.38,.18),16,8378623,!1),i(jh(s,.42,1.38,.18),16,8378623,!1);for(let e of[-1,1]){let t=e*.29;i(Nh(Ph(.1,.12,.04),t,.08,-.01),14,16777215,!1),i(Nh(Lh(.085),t,.08,.025,e),14,Oh,!1)}let c=[];for(let e=0;e<=12;e++)c.push(new F(-.09+e*.015,Math.sin(e*1.4)*.018,0));i(Nh(new Ec(new fs(c),16,.016,4),0,-.3,.01),14,Oh,!1);for(let e=0;e<3;e++){let t=e/3*Math.PI*2;i(jh(Fh(.11),Math.cos(t)*.48,1.86+e%2*.05,Math.sin(t)*.48,0,-t,0),15,16765498,!1)}a.extra(i,a,t);let l=t?_p(t,n,(e,t,n=!0)=>i(e,3,t,n)):0,u=[];for(let e of r){let t=e.g.index?e.g:e.g.toNonIndexed();e.line&&u.push(Uh(Wh(t),e.bone,Oh,1)),u.push(Uh(t,e.bone,e.color,0))}let d=[`position`,`normal`,`color`,`skinIndex`,`skinWeight`,`aOutl`];for(let e of u)for(let t of Object.keys(e.attributes))d.includes(t)||e.deleteAttribute(t);return{geo:Vm(u),lift:l}}var Kh=new Map;function qh(e,t=``){let n=(e%Bh.length+Bh.length)%Bh.length,r=Bh[n],i=n+`|`+t,a=Kh.get(i);a||(a=Gh(r,t,n),Kh.set(i,a));let o=a.geo,s=[],c=[];for(let[e,t,n,r,i]of kh){let a=new co;c[e]=new F(n,r,i),t>=0?(a.position.copy(c[e]).sub(c[t]),s[t].add(a)):a.position.set(n,r,i),s[e]=a}let l={value:.035},u={value:1},d=new Lc({vertexColors:!0,gradientMap:Hh()});d.onBeforeCompile=e=>{e.uniforms.uOut=l,e.uniforms.uOutOn=u,e.vertexShader=`attribute float aOutl;
uniform float uOut;
uniform float uOutOn;
varying float vOutl;
`+e.vertexShader.replace(`#include <skinning_vertex>`,`#include <skinning_vertex>
transformed += normalize(objectNormal) * aOutl * uOut;
vOutl = aOutl;`).replace(`#include <fog_vertex>`,`#include <fog_vertex>
if (aOutl > 0.5 && uOutOn < 0.5) gl_Position = vec4(0.0, 0.0, 2.0, 1.0);`),e.fragmentShader=`varying float vOutl;
`+e.fragmentShader.replace(`#include <dithering_fragment>`,`#include <dithering_fragment>
if (vOutl > 0.5) gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.133, 0.102, 0.2), 0.85);`)},d.customProgramCacheKey=()=>`brawler`;let f=new so(o,d);return f.add(s[0]),f.updateMatrixWorld(!0),f.bind(new po(s)),f.frustumCulled=!1,{mesh:f,mat:d,bones:s,outline:l,outlineOn:u,blinkT:1+Math.random()*3,dizzy:0,flail:0,carry:0,ph:Math.random()*6,seed:Math.random()*10,lift:a.lift}}var Jh=new F;function Yh(e,t){e.updateMatrix(),t.position.copy(Jh.set(0,-.3,0).applyMatrix4(e.matrix))}var Xh=(e,t)=>e.scale.setScalar(t?1:1e-4);function Zh(e,t,n,r,i,a,o){let s=r-n*wh.x,c=i-wh.y,l=a-wh.z,u=Math.hypot(s,c,l),d=Math.atan2(s,-c),f=-Math.atan2(l,Math.hypot(s,c));e.rotation.z+=(d-e.rotation.z)*o,e.rotation.x+=(f-e.rotation.x)*o;let p=1+(u/Th-1)*o;e.scale.set(1,p,1)}function Qh(e,t){let n=e.bones,r=t.t+e.seed,i=t.dt;e.blinkT-=i,e.blinkT<-.12&&(e.blinkT=1.8+Math.random()*2.8),t.knock&&(e.dizzy=1.3,e.flail=.45),e.dizzy=Math.max(0,e.dizzy-i),e.flail=Math.max(0,e.flail-i),e.carry+=(+!!t.carry-e.carry)*Math.min(1,i*12);let a=t.run;e.ph+=i*(6+9*a);let o=e.ph,s=t.launch||e.flail>0;for(let e of n)e.rotation.set(0,0,0);n[4].scale.set(1,1,1),n[6].scale.set(1,1,1),n[5].scale.set(1,1,1),n[7].scale.set(1,1,1);let c=1-a;n[1].position.y=.32+Math.abs(Math.sin(o))*.07*a+Math.sin(r*3)*.012*c,n[2].scale.set(1-Math.sin(r*3)*.012*c,1+Math.sin(r*3)*.02*c,1),n[0].rotation.x=a*.2+(t.dash?.4:0),n[2].rotation.y=Math.sin(o)*.22*a,n[3].rotation.y=-Math.sin(o)*.15*a,n[3].rotation.z=Math.sin(r*1.6)*.05*c,n[3].rotation.x=-a*.12-(t.look??0);let l=Math.sin(o)*a;if(n[8].rotation.x=-l*.95,n[9].rotation.x=l*.95,n[4].rotation.x=l*.9,n[6].rotation.x=-l*.9,n[4].rotation.z=.12+a*.15+Math.sin(r*3)*.03*c,n[6].rotation.z=-.12-a*.15-Math.sin(r*3)*.03*c,t.dash&&(n[4].rotation.x=1.3,n[6].rotation.x=1.3,n[4].rotation.z=.45,n[6].rotation.z=-.45,n[8].rotation.x=-.9,n[9].rotation.x=.7),e.carry>.01&&!s){let t=Math.sin(o*2)*.03*a;Zh(n[4],n[5],1,.43,Dh+e.lift-.08+t,.05,e.carry),Zh(n[6],n[7],-1,-.43,Dh+e.lift-.08+t,.05,e.carry),n[3].rotation.x+=-.1*e.carry}if(s){let e=t.launch?34:26;n[4].rotation.z=2.3+Math.sin(r*e)*.6,n[6].rotation.z=-2.3-Math.sin(r*e+1.3)*.6,n[4].rotation.x=Math.sin(r*e*.8)*.7,n[6].rotation.x=-Math.sin(r*e*.8)*.7,n[8].rotation.x=Math.sin(r*e)*.8,n[9].rotation.x=-Math.sin(r*e)*.8,n[0].rotation.x=-.25,n[3].rotation.z=Math.sin(r*20)*.2}if(t.ghost&&(n[4].rotation.z=1.1+Math.sin(r*2)*.2,n[6].rotation.z=-1.1-Math.sin(r*2)*.2,n[8].rotation.x=.4,n[9].rotation.x=.4),t.cheer){let e=t.cheer,i=Math.sin(r*9);n[4].rotation.z=.4+2.1*e+i*.3*e,n[6].rotation.z=-.4-2.1*e+i*.3*e,n[4].rotation.x=0,n[6].rotation.x=0,n[1].position.y+=Math.abs(Math.sin(r*5.5))*.16*e;let a=e>=1?t.dance??0:0;if(a===1)n[4].rotation.z=1.5+Math.sin(r*12)*.15,n[6].rotation.z=-1.5+Math.sin(r*12)*.15,n[1].position.y=.34+Math.abs(Math.sin(r*6))*.08,n[3].rotation.z=Math.sin(r*6)*.12;else if(a===2){let e=Math.sin(r*7.5),t=+(e>0),i=Math.abs(e);n[4].rotation.z=.3+2.4*i,n[6].rotation.z=-.3-2.4*i,n[8].rotation.z=.35*i,n[9].rotation.z=-.35*i,n[1].position.y=.32+t*i*.2}else if(a===3){let e=Math.floor(r*4)%4;n[4].rotation.z=.2,n[6].rotation.z=-.2,n[4].rotation.x=e===0||e===3?-1.55:0,n[6].rotation.x=e===1||e===2?-1.55:0,e===1&&(n[4].rotation.z=1.55),e===3&&(n[6].rotation.z=-1.55),n[2].rotation.y=[.3,-.3,.3,-.3][e],n[3].rotation.y=[-.35,.35,0,0][e],n[1].position.y=.32+Math.floor(r*8)%2*.03}}let u=e.dizzy>0||t.launch,d=!u&&(t.carry||t.panic>0),f=!u&&!d;if(Xh(n[10],f),Xh(n[11],f),Xh(n[12],f||d===!1),Xh(n[13],d),Xh(n[14],u),Xh(n[15],u&&!t.ghost),Xh(n[16],d),f&&(e.blinkT<0||t.ghost)&&(n[10].scale.y=.12),u&&(n[15].rotation.y=r*5,n[3].rotation.z+=Math.sin(r*6)*.12),d){let e=t.panic>1?.06:.025;n[3].rotation.z+=Math.sin(r*38)*e;let i=r*1.6%1;n[16].position.y=.28-i*.14,n[16].scale.setScalar(i<.85?1:(1-i)/.15+1e-4)}Yh(n[4],n[5]),Yh(n[6],n[7])}var $h=6;function eg(){let e=document.createElement(`canvas`);e.width=768,e.height=128;let t=e.getContext(`2d`),n=t.createRadialGradient(64,64,0,64,64,60);n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.25,`rgba(255,255,255,0.9)`),n.addColorStop(.55,`rgba(255,255,255,0.3)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.fillRect(0,0,128,128),t.lineJoin=`round`,((e,n,r)=>{t.beginPath();for(let i=0;i<10;i++){let a=-Math.PI/2+i*Math.PI/5,o=i%2?r*.48:r;t.lineTo(e+Math.cos(a)*o,n+Math.sin(a)*o)}t.closePath()})(192,68,50),t.lineWidth=12,t.strokeStyle=`#241c38`,t.stroke(),t.fillStyle=`#ffffff`,t.fill(),t.beginPath(),t.roundRect(284,30,72,68,16),t.lineWidth=12,t.strokeStyle=`#241c38`,t.stroke(),t.fillStyle=`#ffffff`,t.fill(),t.fillStyle=`rgba(255,255,255,0.95)`,t.beginPath(),t.moveTo(448,6),t.quadraticCurveTo(452,60,506,64),t.quadraticCurveTo(452,68,448,122),t.quadraticCurveTo(444,68,390,64),t.quadraticCurveTo(444,60,448,6),t.fill(),t.beginPath(),t.moveTo(576,112),t.bezierCurveTo(520,76,516,30,548,22),t.bezierCurveTo(564,18,574,30,576,40),t.bezierCurveTo(578,30,588,18,604,22),t.bezierCurveTo(636,30,632,76,576,112),t.closePath(),t.lineWidth=10,t.strokeStyle=`#241c38`,t.stroke(),t.fillStyle=`#ffffff`,t.fill(),t.beginPath(),t.arc(704,64,44,0,Math.PI*2),t.fillStyle=`rgba(255,255,255,0.22)`,t.fill(),t.lineWidth=7,t.strokeStyle=`rgba(255,255,255,0.95)`,t.stroke(),t.beginPath(),t.ellipse(688,46,12,7,-.6,0,Math.PI*2),t.fillStyle=`rgba(255,255,255,0.95)`,t.fill();let r=new Jo(e);return r.colorSpace=An,r}var tg=null,ng=class{constructor(e,t){this.n=0,this.geo=new oa,this.c=new I,this.max=e,this.pos=new Float32Array(e*3),this.col=new Float32Array(e*3),this.siz=new Float32Array(e),this.alp=new Float32Array(e),this.shp=new Float32Array(e),this.v=new Float32Array(e*3),this.t=new Float32Array(e),this.life=new Float32Array(e),this.s0=new Float32Array(e),this.s1=new Float32Array(e),this.grav=new Float32Array(e),this.drag=new Float32Array(e),this.bnc=new Uint8Array(e);let n=(e,t)=>new Gi(e,t).setUsage(In);this.geo.setAttribute(`position`,n(this.pos,3)),this.geo.setAttribute(`aCol`,n(this.col,3)),this.geo.setAttribute(`aSize`,n(this.siz,1)),this.geo.setAttribute(`aAlpha`,n(this.alp,1)),this.geo.setAttribute(`aShape`,n(this.shp,1)),this.geo.setDrawRange(0,0),tg||(tg=eg()),this.mat=new Fc({uniforms:{uTex:{value:tg},uScale:{value:400}},vertexShader:`attribute vec3 aCol; attribute float aSize; attribute float aAlpha; attribute float aShape; uniform float uScale;
varying vec3 vCol; varying float vA; varying float vS;
void main(){ vCol=aCol; vA=aAlpha; vS=aShape; vec4 mv=modelViewMatrix*vec4(position,1.0); gl_PointSize=aSize*uScale/-mv.z; gl_Position=projectionMatrix*mv; }`,fragmentShader:`uniform sampler2D uTex; varying vec3 vCol; varying float vA; varying float vS;
void main(){ vec2 uv=vec2((clamp(gl_PointCoord.x,0.02,0.98)+vS)/`+$h.toFixed(1)+`, 1.0-gl_PointCoord.y); vec4 t=texture2D(uTex,uv); float a=t.a*vA; if(a<0.02) discard; gl_FragColor=vec4(t.rgb*vCol,a); }`,transparent:!0,depthWrite:!1,blending:t?2:1}),this.pts=new Go(this.geo,this.mat),this.pts.frustumCulled=!1,this.pts.renderOrder=t?6:5}add(e,t,n,r,i,a,o){let s=this.n;if(s>=this.max){let e=0,t=-1;for(let n=0;n<this.max;n++){let r=this.t[n]/this.life[n];r>t&&(t=r,e=n)}s=e}else this.n++;this.pos[s*3]=e,this.pos[s*3+1]=t,this.pos[s*3+2]=n,this.v[s*3]=r,this.v[s*3+1]=i,this.v[s*3+2]=a,typeof o.color==`number`?this.c.set(o.color):this.c.copy(o.color),this.col[s*3]=this.c.r,this.col[s*3+1]=this.c.g,this.col[s*3+2]=this.c.b,this.t[s]=0,this.life[s]=o.life,this.s0[s]=o.size,this.s1[s]=o.size1??o.size,this.shp[s]=o.shape??0,this.grav[s]=o.grav??0,this.drag[s]=o.drag??0,this.bnc[s]=+!!o.bounce,this.siz[s]=o.size,this.alp[s]=1}burst(e,t,n,r,i,a,o,s){for(let c=0;c<r;c++){let r=Math.random()*Math.PI*2,l=i*(.45+Math.random()*.75);s&&(o.color=s[c%s.length]),this.add(e,t,n,Math.cos(r)*l,a*(.4+Math.random()*.9),Math.sin(r)*l,o)}}update(e){let t=0;for(let n=0;n<this.n;n++){let r=this.t[n]+=e,i=this.life[n];if(r>=i)continue;let a=this.v[n*3]*(1-Math.min(1,this.drag[n]*e)),o=this.v[n*3+1]*(1-Math.min(1,this.drag[n]*e))-this.grav[n]*e,s=this.v[n*3+2]*(1-Math.min(1,this.drag[n]*e)),c=this.pos[n*3+1]+o*e;this.bnc[n]&&c<.08&&(c=.08,o=Math.abs(o)*.35);let l=r/i;t!==n&&(this.t[t]=r,this.life[t]=i,this.s0[t]=this.s0[n],this.s1[t]=this.s1[n],this.shp[t]=this.shp[n],this.grav[t]=this.grav[n],this.drag[t]=this.drag[n],this.bnc[t]=this.bnc[n],this.col[t*3]=this.col[n*3],this.col[t*3+1]=this.col[n*3+1],this.col[t*3+2]=this.col[n*3+2]),this.v[t*3]=a,this.v[t*3+1]=o,this.v[t*3+2]=s,this.pos[t*3]=this.pos[n*3]+a*e,this.pos[t*3+1]=c,this.pos[t*3+2]=this.pos[n*3+2]+s*e,this.siz[t]=this.s0[t]+(this.s1[t]-this.s0[t])*l,this.alp[t]=l<.6?1:1-(l-.6)/.4,t++}this.n=t,this.geo.setDrawRange(0,t);for(let e of[`position`,`aCol`,`aSize`,`aAlpha`,`aShape`]){let n=this.geo.attributes[e];n.clearUpdateRanges(),n.addUpdateRange(0,t*n.itemSize),n.needsUpdate=!0}this.pts.visible=t>0}setScale(e){this.mat.uniforms.uScale.value=e}},rg=class{constructor(){this.t=1;let e=new Sc(.78,1,48);e.rotateX(-Math.PI/2),this.mat=new La({color:16773572,transparent:!0,depthWrite:!1,opacity:0}),this.mesh=new Ya(e,this.mat),this.mesh.visible=!1,this.mesh.renderOrder=4}fire(e,t){this.mesh.position.set(e,.12,t),this.t=0,this.mesh.visible=!0}update(e){if(this.t>=1)return;this.t=Math.min(1,this.t+e/.55);let t=this.t,n=1-(1-t)*(1-t)*(1-t);this.mesh.scale.setScalar(.6+n*7.5),this.mat.opacity=(1-t)*.9,this.mesh.visible=t<1}},ig=-.5,ag=20,og=-24,sg=26,cg=class{constructor(){this.parts=[],this.feet=[],this.gp=[],this.gc=[],this.gs=[],this.wires=[]}add(e){this.parts.push(e)}foot(e,t,n,r,i=.5){this.feet.push({x:e,z:t,rx:n,rz:r,a:i})}glow(e,t,n,r,i){let a=new I(r);this.gp.push(e,t,n),this.gc.push(a.r,a.g,a.b),this.gs.push(i)}string(e,t,n,r,i,a,o=0){let s=Math.hypot(n-e,r-t),c=Math.max(4,Math.round(s/1.1)),l=e,u=i,d=t;for(let f=1;f<=c;f++){let p=f/c,m=e+(n-e)*p,h=t+(r-t)*p,g=i-Math.sin(p*Math.PI)*s*.09;this.wires.push(l,u,d,m,g,h),l=m,u=g,d=h,f<c&&(this.glow(m,g-.18,h,a[(f+o)%a.length],.95),this.glow(m,g-.18,h,16774888,.32))}}finish(e,t,n){let r=new Ya(Vm(this.parts.map(e=>e.index?e.toNonIndexed():e)),gh(t,n));if(r.matrixAutoUpdate=!1,e.add(r),this.wires.length){let t=new oa;t.setAttribute(`position`,new Ji(this.wires,3)),e.add(new zo(t,new Do({color:2366520})))}if(!this.gp.length)return;let i=hh(this.gp,this.gc,this.gs);return e.add(i.pts),i.mat}};function lg(e,t,n,r=.5){let i=1024,a=1024,[o,s]=rh(i,a),c=i/40,l=a/50,u=e=>(e+ag)*c,d=e=>(e-og)*l;s.fillStyle=e,s.fillRect(0,0,i,a),t(s,u,d,c,l);for(let e of n)ah(s,u(e.x+.35),d(e.z-.22),e.rx*c,e.rz*l,e.a);ah(s,u(.7),d(-.45),10.8*c,10.6*l,r);let f=(t,n,r,i)=>{let a=s.createLinearGradient(t,n,r,i);return a.addColorStop(0,e),a.addColorStop(1,e+`00`),a};s.fillStyle=f(0,0,3*c,0),s.fillRect(0,0,3*c,a),s.fillStyle=f(i,0,i-3*c,0),s.fillRect(i-3*c,0,3*c,a),s.fillStyle=f(0,0,0,3*l),s.fillRect(0,0,i,3*l),s.fillStyle=f(0,a,0,a-3*l),s.fillRect(0,a-3*l,i,3*l);let p=new xc(40,50);p.rotateX(-Math.PI/2),p.translate(0,ig,1);let m=new Ya(p,new Rc({map:ih(o,8)}));return m.matrixAutoUpdate=!1,m}function ug(e){let t=1024,n=9.6,[r,i]=rh(t,t),a=e=>(e/n+1)*(t/2),o=t/2/n;e(i,a,o,t);let s=i.createRadialGradient(t/2,t/2,8.1*o,t/2,t/2,n*o);s.addColorStop(0,`rgba(20,10,40,0)`),s.addColorStop(.75,`rgba(20,10,40,0.16)`),s.addColorStop(1,`rgba(20,10,40,0.45)`),i.fillStyle=s,i.fillRect(0,0,t,t);let c=new es(n,72);c.rotateX(-Math.PI/2);let l=new Ya(c,new Rc({map:ih(r,8)}));return l.matrixAutoUpdate=!1,l}function dg(e,t,n,r,i,a){e.fillStyle=a,e.beginPath(),e.arc(t,n,i,0,Math.PI*2),e.arc(t,n,r,0,Math.PI*2,!0),e.fill()}function fg(e,t,n,r,i){let a=new Tc(e,t,8,96).toNonIndexed();a.rotateX(Math.PI/2),a.translate(0,n,0);let o=a.attributes.position,s=new Float32Array(o.count*3),c=r.map(e=>new I(e));for(let e=0;e<o.count;e+=3){let t=(o.getX(e)+o.getX(e+1)+o.getX(e+2))/3,n=(o.getZ(e)+o.getZ(e+1)+o.getZ(e+2))/3,r=Math.floor((Math.atan2(n,t)+Math.PI)/(Math.PI*2)*i)%c.length;for(let t=0;t<3;t++)s.set([c[r].r,c[r].g,c[r].b],(e+t)*3)}return a.setAttribute(`color`,new Gi(s,3)),pg(a)}function pg(e){let t=e.attributes.position.count,n=new Float32Array(t*2);for(let e=0;e<t;e++)n.set([3/256,1-3/256],e*2);return e.setAttribute(`uv`,new Gi(n,2)),e}function mg(e){return H(U(new L(9.6,9.75,.5,64,1,!0),0,-.25,0),e,.55)}function hg(e,t,n,r,i,a,o=8,s=.25){return H(U(new ts(e,t,o),n,r+t/2,i),a,s)}function gg(e,t,n,r,i,a,o,s){e.save(),e.beginPath(),e.rect(t,n,r,i),e.clip(),e.fillStyle=o,e.fillRect(t,n,r,i),e.fillStyle=s;for(let o=-i;o<r+i;o+=a*2)e.beginPath(),e.moveTo(t+o,n),e.lineTo(t+o+a,n),e.lineTo(t+o+a-i,n+i),e.lineTo(t+o-i,n+i),e.closePath(),e.fill();e.restore()}function _g(e,t,n){for(let r=0;r<16;r++){let i=-170+r*23+(V()-.5)*12,a=-110-V()*60,o=28+V()*34,s=22+V()*14;e.add(H(U(new ts(s,o,6),i,-6.5+o/2,a,0,V()*3),t[r%t.length],.3)),n>=0&&e.add(H(U(new ts(s*.36,o*.36,6),i,-6.5+o-o*.36/2+.3,a,0,V()*3),n,0))}}function vg(e,t,n,r,i=!0){e.add(eh(.16*r,.22*r,.7*r,t,ig,n,7031346,6,.2));for(let[a,o,s]of[[1.35,1.5,.5],[1.05,1.3,1.35],[.72,1.15,2.15]])e.add(hg(a*r,o*r,t,ig+s*r,n,3107666,8,.35)),i&&e.add(hg(a*r*.62,o*r*.42,t,ig+(s+o*.58)*r,n,15922943,8,0));e.foot(t,n,1.4*r,1.2*r,.4)}function yg(e,t,n,r){e.add(th(.62,t,.050000000000000044,n,16185855,1,.3)),e.add(th(.45,t,.8500000000000001,n,16185855,1,.15)),e.add(th(.32,t,1.45,n,16185855,1,.1)),e.add(H(U(new ts(.07,.38,6),t+Math.sin(r)*.42,1.45,n+Math.cos(r)*.42,Math.PI/2,r,0),16742954,0)),e.add(eh(.26,.26,.32,t,1.6800000000000002,n,2826803,10,0)),e.add(eh(.38,.38,.04,t,1.6800000000000002,n,2826803,12,0)),e.add(H(U(new Tc(.33,.08,6,14),t,1.16,n,Math.PI/2),14692426,0)),e.foot(t,n,.8,.7,.45)}function bg(){let e=[],t=t=>e.push(t);t(W(Cp,.55,wp,0,.18,0,16738877,.25)),t(W(Cp+.06,.12,wp+.06,0,.12,0,16774374,0)),t(W(Cp*.55,.62,wp*.94,-Cp*.2,.73,0,15922943,.15)),t(W(Cp*.56,.12,wp*.96,-Cp*.2,.98,0,3837936,0)),t(W(Cp*.56,.1,wp*.96,-Cp*.2,.84,0,3837936,0)),t(W(.7,.36,.8,Cp*.22,.73,0,3813712,.1)),t(W(.18,.55,.8,Cp*.08,.95,0,3813712,0)),t(H(U(new L(.03,.03,.5,6),Cp*.36,.95,0,0,0,.5),2826803,0)),t(H(U(new Tc(.14,.03,5,10),Cp*.42,1.18,0,0,Math.PI/2,.5),2826803,0)),t(H(U(new R(.17,10,6,0,Math.PI*2,0,Math.PI/2),-Cp*.2,1.08,0),16757278,0));for(let e of[-1,1]){t(H(U(new R(.1,8,6),Cp/2+.01,.55,e*.6),16776160,0));for(let n of[-.75,.75])t(H(U(new L(.26,.26,.2,12),n,.26,e*(wp/2-.05),Math.PI/2),2826803,0))}return t(W(.38,.3,wp+.15,-Cp/2-.15,.04,0,9147302,.2)),t(W(.42,.06,wp+.2,-Cp/2-.15,.34,0,16765498,0)),Vm(e)}function xg(e,t){let[n,r]=rh(256,64);r.clearRect(0,0,256,64),r.fillStyle=t,r.fillRect(0,0,256,6),r.fillRect(0,58,256,6);for(let t=0;t<4;t++){let n=t*64+10;r.fillStyle=e,r.beginPath(),r.moveTo(n,10),r.lineTo(n+22,10),r.lineTo(n+44,32),r.lineTo(n+22,54),r.lineTo(n,54),r.lineTo(n+22,32),r.closePath(),r.fill()}let i=ih(n,4);return i.wrapS=st,i}function Sg(e,t){$m(31);let n=new ri,r=new cg;r.add(mg(7309e3));let i=[16736143,16765498,6211839,9240442];for(let e=0;e<64;e++){let t=(e+.5)/64*Math.PI*2,n=Math.cos(t)*9.5,a=Math.sin(t)*9.5,o=Math.PI*2*9.5/64*1.02;r.add(W(o,.72,.14,n,0,a,16185596,.25,-t+Math.PI/2)),r.add(W(o*1.01,.16,.16,n,0,a,16763196,0,-t+Math.PI/2)),e%4==1&&r.add(W(o*1.8,.3,.16,n,.24,a,i[(e>>2)%4],0,-t+Math.PI/2))}r.add(fg(9.5,.1,.74,[3112416,3112416],2));for(let[e,t,n]of Sp)r.add(H(U(new R(n*.92,18,8,0,Math.PI*2,0,Math.PI/2).scale(1,.5,1),e,0,t),16777215,.3)),r.add(H(U(new R(n*.55,14,7,0,Math.PI*2,0,Math.PI/2).scale(1,.7,1),e+n*.28,.25,t-n*.2),16777215,.12)),r.add(H(U(new R(n*.42,12,6,0,Math.PI*2,0,Math.PI/2).scale(1,.65,1),e-n*.38,.12,t+n*.3),16186111,.12));{let[e,t]=Sp[0];r.add(H(U(new L(.04,.04,1.3,6),e+.2,.75,t,.2,0,-.3),9067066,0)),r.add(H(U(new Qo(.38,.05,.44),e+.02,.18,t,.2,0,-.3),14692426,0))}let a=[];for(let e=0;e<70;e++){let e=V()*Math.PI*2,t=12.5+V()*9,n=Math.cos(e)*t*1.25,r=Math.sin(e)*t-2;Math.abs(n)>19||r>24||r<-23||r>9&&Math.abs(n)<10||Math.hypot(n+11.5,r+13)<4.5||Math.hypot(n-11.5,r+13.5)<4||a.push([n,r,.8+V()*.7])}for(let[e,t,n]of a)vg(r,e,t,n);for(let e=0;e<60;e++)vg(r,-60+V()*120,-30-V()*40,1.6+V()*1.4,V()<.7);{let e=-11.5,t=-13.2;r.add(W(5,2.6,3.6,e,ig,t,10115638,.3));for(let n=0;n<6;n++)r.add(W(5.1,.1,3.7,e,-.2+n*.42,t,8012838,0));r.add(H(U(new L(.01,2.75,1.6,4,1),e,2.9,t,0,Math.PI/4).scale(1.32,1,1),16054527,.1)),r.add(W(1,1.8,.12,-10.9,ig,-11.379999999999999,5910046,0));for(let t of[-1.4,2])r.add(W(.9,.8,.1,e+t,.5,-11.37,16765562,0)),r.glow(e+t,.8999999999999999,-11.2,16761963,2.2);r.add(W(.6,1.4,.6,-13.1,2.1,-13.799999999999999,9077656,.2)),r.foot(e,t,3.2,2.6,.55)}{let e=11.6,t=-13.6;r.add(W(3.6,1.1,1.6,e,ig,t,14692426,.3)),r.add(W(3.7,.12,1.7,e,.6000000000000001,t,16774374,0));for(let t of[-1,1])r.add(W(.12,2.6,.12,e+t*1.7,ig,-14.2,5910046,0));for(let e=0;e<6;e++)r.add(H(U(new Qo(.62,.08,1.5),10.049999999999999+e*.62,2.05,-13.549999999999999,.35),e%2?16774374:14692426,0));for(let e=0;e<4;e++)r.add(eh(.12,.1,.22,10.5+e*.7,.72,-13.2,[16774374,6211839,16765498,16747192][e],8,0));r.add(W(1.4,.9,.08,11,1.1,-14.219999999999999,2826803,0)),r.glow(e,1.7999999999999998,-12.799999999999999,16765562,1.6),r.foot(e,t,2.6,1.6,.55)}let o=(e,t)=>{r.add(eh(.08,.1,3.2,e,ig,t,2827600,8,.1)),r.add(eh(.22,.26,.18,e,ig,t,2827600,8,0)),r.add(th(.24,e,2.85,t,16773320,1,0)),r.glow(e,2.85,t,16765578,3.2),r.foot(e,t,.5,.45,.4)};o(-12.4,-6),o(12.6,-6.5),o(-13.2,5.5),o(13.4,5);let s=(e,t,n)=>{r.add(W(2.2,.12,.7,e,-.04999999999999999,t,9067066,.1,n)),r.add(W(2.2,.1,.72,e,.06999999999999995,t,16185855,0,n)),r.add(W(.12,.45,.6,e+Math.cos(n)*.9,ig,t-Math.sin(n)*.9,3817298,0,n)),r.add(W(.12,.45,.6,e-Math.cos(n)*.9,ig,t+Math.sin(n)*.9,3817298,0,n)),r.foot(e,t,1.5,.8,.45)};s(-12.8,.2,Math.PI/2),s(13,-.6,-Math.PI/2),yg(r,-12.6,9.4,.6),yg(r,12.2,10.6,-.4),r.add(W(2.2,1,.5,7.8,ig,-13,9067066,.2));for(let e=0;e<5;e++)r.add(W(.22,.32,.5,7+e*.4,.5,-13,[16777215,16747192,6211839,16777215,16765498][e],0));r.foot(7.8,-13,1.4,.6,.45),r.add(W(1.6,.18,.7,-6.5,-.3,-14.2,14692426,.1,.3));for(let e of[-1,1])r.add(W(1.8,.08,.08,-6.5+e*.08,ig,-14.2+e*.3,3817298,0,.3));r.foot(-6.5,-14.2,1.2,.6,.4);for(let e=0;e<7;e++)r.add(H(U(new L(.2,.2,1.4,8),-8.4+e%4*.42+(e>3?.2:0),-.3+(e>3?.36:0),-12.4,0,0,Math.PI/2),10119750,.2));r.foot(-7.8,-12.4,1.3,.6,.45);let c=[[-14.4,3],[-14.2,-9],[-6,-11.2],[6,-11.2],[14.2,-9],[14.4,3]];for(let[e,t]of c)r.add(eh(.08,.1,3.9,e,ig,t,3813712,8,.1));for(let e=0;e<c.length-1;e++)r.string(c[e][0],c[e][1],c[e+1][0],c[e+1][1],3.3,[16761963,16743096,9169407,16770442,12164095],e*3);_g(r,[6977720,8292548,6056616],16054015),r.add(H(U(new xc(500,500),0,-.53,-60,-Math.PI/2),15265528,0));let l=r.finish(n,e,`rink`);n.add(lg(`#e8eef8`,(e,t,n,r,i)=>{oh(e,1024,1024,5e3,[`rgba(140,160,210,0.10)`,`rgba(255,255,255,0.5)`,`rgba(170,190,235,0.12)`],.6,2.2),e.strokeStyle=`rgba(160,150,170,0.35)`,e.lineWidth=1.4*r,e.lineCap=`round`,e.beginPath(),e.moveTo(t(-11),n(-11.2)),e.quadraticCurveTo(t(-9),n(-9),t(-7.8),n(-8.6)),e.stroke(),e.strokeStyle=`rgba(120,140,200,0.25)`,e.lineWidth=2;for(let r of[-.25,.25])e.beginPath(),e.moveTo(t(-16+r),n(14)),e.bezierCurveTo(t(-8),n(18+r),t(4),n(12+r),t(16),n(17+r)),e.stroke();e.fillStyle=`rgba(120,130,180,0.22)`;for(let a=0;a<40;a++){let o=a/40;e.beginPath(),e.ellipse(t(9+o*6+a%2*.2),n(-7-o*6+a%2*.25),.1*r,.16*i,.7,0,Math.PI*2),e.fill()}},r.feet,.4)),n.add(ug((e,t,n,r)=>{let i=r/2,a=e.createRadialGradient(i,i,0,i,i,9.6*n);a.addColorStop(0,`#f2fbff`),a.addColorStop(.7,`#dcefff`),a.addColorStop(1,`#cfe4f7`),e.fillStyle=a,e.fillRect(0,0,r,r);for(let t=0;t<260;t++){e.strokeStyle=V()<.5?`rgba(255,255,255,0.55)`:`rgba(150,185,225,0.28)`,e.lineWidth=.6+V()*1.4;let t=V()*8.6*n,r=V()*Math.PI*2;e.beginPath(),e.arc(i+Math.cos(r)*t*.3,i+Math.sin(r)*t*.3,t*(.5+V()*.6),r,r+.3+V()*.9),e.stroke()}e.fillStyle=`rgba(64,120,230,0.55)`;for(let i of[-3.4,3.4])e.fillRect(0,t(i)-.2*n,r,.4*n);e.fillStyle=`rgba(230,50,70,0.5)`,e.fillRect(0,t(0)-.12*n,r,.24*n),e.strokeStyle=`rgba(64,120,230,0.6)`,e.lineWidth=.14*n,e.beginPath(),e.arc(i,i,2.3*n,0,Math.PI*2),e.stroke(),e.fillStyle=`rgba(64,120,230,0.6)`,e.beginPath(),e.arc(i,i,.35*n,0,Math.PI*2),e.fill();for(let[r,i]of[[-5.3,-5.6],[5.3,-5.6],[-5.6,5.8],[5.6,6]])e.strokeStyle=`rgba(230,50,70,0.55)`,e.lineWidth=.12*n,e.beginPath(),e.arc(t(r),t(i),1.5*n,0,Math.PI*2),e.stroke(),e.fillStyle=`rgba(230,50,70,0.6)`,e.beginPath(),e.arc(t(r),t(i),.25*n,0,Math.PI*2),e.fill();for(let[r,i,a]of Sp){ah(e,t(r+.45),t(i-.3),(a+.5)*n,(a+.4)*n,.42);let o=e.createRadialGradient(t(r),t(i),a*.6*n,t(r),t(i),(a+.55)*n);o.addColorStop(0,`rgba(255,255,255,0.95)`),o.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=o,e.beginPath(),e.arc(t(r),t(i),(a+.55)*n,0,Math.PI*2),e.fill()}let o=e.createRadialGradient(i,i,8.1*n,i,i,9.2*n);o.addColorStop(0,`rgba(255,255,255,0)`),o.addColorStop(1,`rgba(255,255,255,0.9)`),e.fillStyle=o,e.beginPath(),e.arc(i,i,9.6*n,0,Math.PI*2),e.fill()}));let u=new Ya(bg(),new Rc({vertexColors:!0}));u.visible=!1,n.add(u);let d=new La({map:xg(`#ffd23a`,`#ff4d4d`),transparent:!0,depthWrite:!1,opacity:0}),f=new xc(1,wp+.5);f.rotateX(-Math.PI/2);let p=new Ya(f,d);p.position.y=.025,p.renderOrder=1,p.visible=!1,n.add(p);let m=[];for(let e=0;e<420;e++)m.push((V()-.5)*44,V()*18,(V()-.5)*40-2);let h=new oa;h.setAttribute(`position`,new Ji(m,3));let g={uT:{value:0},uScale:{value:400}},_=new Go(h,new Fc({uniforms:g,vertexShader:`uniform float uT; uniform float uScale; varying float vA;
void main(){ vec3 p=position; p.y=mod(p.y-uT*1.4,18.0)-0.5; p.x+=sin(uT*0.7+position.z)*0.6; vec4 mv=modelViewMatrix*vec4(p,1.0); gl_PointSize=0.16*uScale/-mv.z; vA=smoothstep(-0.5,1.0,p.y); gl_Position=projectionMatrix*mv; }`,fragmentShader:`varying float vA; void main(){ float d=length(gl_PointCoord-0.5); if(d>0.5) discard; gl_FragColor=vec4(1.0,1.0,1.0,(1.0-d*2.0)*0.85*vA); }`,transparent:!0,depthWrite:!1}));_.frustumCulled=!1,_.renderOrder=6,n.add(_);let v=0;return{root:n,glowMat:l,theme:{name:`rink`,skyTop:2636418,skyLow:15903168,fog:13618152,hemiSky:16774378,hemiGround:10134744,hemiI:2.05,sun:16767412,sunI:1.75,glow:.8,neon:1,bulbs:1.15},update(e,n,r,i){g.uT.value=n,g.uScale.value=l?l.uniforms.uScale.value:400;let a=jp(e);if(u.visible=a.st===2,p.visible=a.st>0,a.st){let e=Math.sqrt(Math.max(1,81-(a.ox*a.ox+a.oz*a.oz)));p.scale.set(e*2,1,1),p.position.set(a.ox,.025,a.oz),p.rotation.y=-Math.atan2(a.dz,a.dx),d.map.repeat.set(e*2/3.2,1),d.map.offset.x=-n*1.6,d.opacity=a.st===1?.35+.5*Math.abs(Math.sin(n*9)):.3}if(a.st===2&&(u.position.set(a.x,0,a.z),u.rotation.y=-Math.atan2(a.dz,a.dx),t.shadow(a.x,a.z,Cp+.8,wp+.6,u.rotation.y),v-=r,i&&v<=0&&Math.hypot(a.x,a.z)<9)){v=.05;let e=a.x-a.dx*(Cp/2+.3),n=a.z-a.dz*(Cp/2+.3);t.norm.add(e+(Math.random()-.5)*wp,.25,n,-a.dx*1.5+(Math.random()-.5),1.4+Math.random(),-a.dz*1.5+(Math.random()-.5),{life:.6,size:.35,size1:.1,color:16777215,grav:5,drag:1.5})}}}}function Cg(e,t,n,r,i){let a=Math.round(r/.42),o=t;for(let r=0;r<a;r++)o=t+Math.sin(r/a*1.2)*i,e.add(H(U(new L(.15,.19,.44,6),o,-.3+r*.42,n,0,0,-i*.1),r%2?10122312:9071168,.1));let s=-.3+a*.42;for(let t=0;t<8;t++){let r=t/8*Math.PI*2;e.add(H(U(new Qo(2,.06,.5),o+Math.cos(r)*.95,s-.3,n+Math.sin(r)*.95,0,-r,-.4),t%2?4168266:5221962,0))}e.add(th(.2,o+.15,s-.15,n,7031338,0,0)),e.add(th(.2,o-.12,s-.2,n+.12,7031338,0,0)),e.foot(o,n,1.8,1.6,.4)}function wg(e,t,n,r,i){e.add(W(.9,.3,2,t,ig,n,16774374,.25,r)),e.add(H(U(new Qo(.9,.12,.8),t-Math.sin(r)*.95,.07999999999999996,n-Math.cos(r)*.95,-.65,r,0),16774374,0)),e.add(W(.8,.06,1.4,t+Math.sin(r)*.25,-.2,n+Math.cos(r)*.25,i,0,r)),e.foot(t,n,.9,1.4,.4)}function Tg(e,t,n,r,i){e.add(eh(.05,.05,2.4,t,ig,n,16774374,6,0));for(let a=0;a<8;a++){let o=new ts(1.5,.55,8,1,!0,a/8*Math.PI*2,Math.PI/4);e.add(H(U(o,t,1.9500000000000002,n),a%2?r:i,0))}e.foot(t,n,1.7,1.5,.45)}function Eg(e,t,n,r,i){let a=t-r*6,o=n-3.2;for(let[t,n]of[[-.8,-.8],[.8,-.8],[-.8,.8],[.8,.8]])e.add(W(.18,4.4,.18,a+t,ig,o+n,16774374,.15));e.add(W(2,.2,2,a,3.9000000000000004,o,16765498,0));for(let t of[-1,1])e.add(W(2,.6,.08,a,4.1,o+t*.96,16774374,0));e.add(H(U(new ts(1.6,1.1,4),a,5.5,o,0,Math.PI/4),i,0));for(let t=0;t<9;t++)e.add(W(.7,.06,.08,a,-.09999999999999998+t*.48,o+1.05,16774374,0));e.foot(a,o,1.8,1.6,.5);let s=new fs([new F(a+r*.6,4,o+.3),new F(a+r*2.6,3.2,o-1.4),new F(a+r*4.6,1.7000000000000002,o+.2),new F(a+r*4.8,.7,o+2.4),new F(t-r*1,.35,n)]);e.add(H(new Ec(s,40,.5,10,!1),i,.15));for(let t=1;t<4;t++){let n=s.getPointAt(t/4);e.add(eh(.07,.07,Math.max(.3,n.y-ig-.4),n.x,ig,n.z,16774374,6,.1))}}function Dg(){let e=new Tc(Ip*.82,.3,10,24).toNonIndexed();e.rotateX(Math.PI/2),e.translate(0,.12,0);let t=e.attributes.position,n=new Float32Array(t.count*3);for(let e=0;e<t.count;e+=3){let r=(t.getX(e)+t.getX(e+1)+t.getX(e+2))/3,i=(t.getZ(e)+t.getZ(e+1)+t.getZ(e+2))/3,a=(t.getY(e)+t.getY(e+1)+t.getY(e+2))/3,o=Math.floor((Math.atan2(i,r)+Math.PI)/(Math.PI*2)*8)%2,s=.82+Math.min(.18,(a-.12)*.6);for(let t=0;t<3;t++)n.set([s,o,0],(e+t)*3)}return e.setAttribute(`color`,new Gi(n,3)),e}function Og(){let[e,t]=rh(256,128);t.fillStyle=`#35b8e6`,t.fillRect(0,0,256,128);for(let e=0;e<70;e++){t.strokeStyle=V()<.6?`rgba(220,250,255,0.55)`:`rgba(30,120,190,0.35)`,t.lineWidth=1.5+V()*2.5;let e=V()*256,n=V()*128;t.beginPath(),t.moveTo(e,n),t.bezierCurveTo(e+10,n-6,e+22,n+6,e+34,n),t.stroke()}let n=ih(e,4);return n.wrapS=n.wrapT=st,n}function kg(e,t){$m(57);let n=new ri,r=new cg;r.add(mg(3116992)),r.add(fg(9.12,.2,.2,[16731501,16774374,3837936,16774374],64));for(let e=0;e<16;e++){let t=e/16*Math.PI*2;r.add(eh(.1,.1,.32,Math.cos(t)*9.12,0,Math.sin(t)*9.12,16774374,8,0))}for(let e of[Np,Pp])r.add(fg(e,.13,0,[16644334,15327956],48));for(let[e,t,n]of zp)Eg(r,e,t,n,n>0?4172287:16757278);for(let[e,t,n,i]of[[-14.5,-9,5.2,.6],[14.6,-9.5,5.6,-.5],[-13.8,9.5,4.6,.5],[14.2,8.8,5,-.6],[-7.5,-16.5,6,.4],[8.5,-17,5.4,-.4],[-17.5,-16,6.2,.7],[17.5,-15,5.8,-.5]])Cg(r,e,t,n,i);wg(r,-12.6,2.6,Math.PI/2-.2,4174768),wg(r,-12.8,5,Math.PI/2-.1,16747192),wg(r,12.8,3.2,-Math.PI/2+.2,16765498),wg(r,13,5.6,-Math.PI/2,4174768),wg(r,-3.2,-13.6,0,16747192),wg(r,-1.6,-13.7,0,4174768),Tg(r,-14.2,3.8,16736143,16774374),Tg(r,14.4,4.4,4172287,16774374),Tg(r,-2.4,-15.6,16765498,16774374);{let e=4.2,t=-14.4;r.add(W(4,1.2,1.4,e,ig,t,10119750,.3)),r.add(W(4.2,.12,1.6,e,.7,t,16774374,0));for(let t of[-1,1])r.add(W(.14,2.7,.14,e+t*1.9,ig,-14.9,7031338,0));r.add(H(U(new ts(3,1.2,10),e,2.7,-14.6).scale(1,1,.65),15253610,.2));for(let e=0;e<5;e++)r.add(eh(.1,.08,.3,2.8000000000000003+e*.7,.8200000000000001,-14,[16736143,16765498,9240442,6211839,16777215][e],8,0));r.glow(e,1.7999999999999998,-13.8,16765562,1.8),r.foot(e,t,2.6,1.4,.55)}let i=(e,t)=>{r.add(eh(.06,.08,1.9,e,ig,t,7031338,6,.1)),r.add(eh(.16,.1,.3,e,1.4,t,3812900,8,0)),r.add(hg(.12,.35,e,1.7000000000000002,t,16757278,6,0)),r.glow(e,1.85,t,16751165,2.4)};i(-12.2,-8.4),i(12.4,-8.8),i(-11.6,12.4),i(11.8,12.2),r.add(th(.42,-10.6,-.08000000000000002,-11.2,16736143,1,.2)),r.add(th(.36,11,-.14,11.6,16765498,1,.2)),r.foot(-10.6,-11.2,.6,.5,.4);{let e=10.6,t=-11.4;r.add(H(U(new Tc(.9,.36,8,18),e,-.14,t,Math.PI/2),16747192,.2)),r.add(H(U(new L(.14,.2,1.4,8),10.1,.5,t,0,0,.3),16747192,0)),r.add(th(.28,9.9,1.25,t,16747192,1,0)),r.add(H(U(new ts(.1,.32,6),9.62,1.2,t,0,0,Math.PI/2+.3),2826803,0)),r.foot(e,t,1.3,1.1,.45)}r.add(nh(16,10,-30,-32,-2.5,16,15976872)),r.add(nh(12,10,30,-30,-2.5,12,12575712)),r.add(nh(10,9,-44,-24,-2.5,9,16245430));for(let e=0;e<6;e++)r.add(W(16.6,.2,1,-30,-2.5+2.6+e*2.6,-26.6,16774374,0)),e<4&&r.add(W(12.6,.2,1,30,-2.5+2.6+e*2.6,-24.6,16774374,0));r.add(H(U(new xc(600,300),0,-.75,-190,-Math.PI/2),3968984,0)),r.add(H(U(new xc(600,2.5),0,-.7,-40.5,-Math.PI/2),12577023,0));for(let e=0;e<6;e++)r.add(th(.5,-40+e*16,ig,-52-e%2*8,e%2?16731469:16774374,1,0));for(let e=0;e<3;e++){let t=-60+e*55,n=-90-e*10;r.add(W(6,1.2,2,t,-.8,n,16774374,.2)),r.add(H(U(new ts(2.4,6,3),t,3.1,n,0,.4),16777215,0))}_g(r,[11037338,10123448,12159656],-1),r.add(H(U(new xc(600,120),0,-.54,20,-Math.PI/2),15323810,0));let a=[[-14.5,-9],[-7.5,-16.5],[8.5,-17],[14.6,-9.5]];for(let e=0;e<a.length-1;e++)r.string(a[e][0],a[e][1],a[e+1][0],a[e+1][1],3.9000000000000004,[16761963,16743096,9169407,16770442],e*2);for(let e=0;e<12;e++){let t=e/12*Math.PI*2+.26;r.glow(Math.cos(t)*(Pp-.15),-.12,Math.sin(t)*(Pp-.15),9169407,1.4)}let o=r.finish(n,e,`pool`);n.add(lg(`#e9d2a2`,(e,t,n,r,i)=>{e.fillStyle=`#f1e2c6`,e.beginPath(),e.roundRect(t(-16),n(-12.5),32*r,27*i,3*r),e.fill(),e.strokeStyle=`rgba(160,130,90,0.35)`,e.lineWidth=1.5;for(let r=-16;r<=16;r+=1.6)e.beginPath(),e.moveTo(t(r),n(-12.5)),e.lineTo(t(r),n(14.5)),e.stroke();for(let r=-12.5;r<=14.5;r+=1.6)e.beginPath(),e.moveTo(t(-16),n(r)),e.lineTo(t(16),n(r)),e.stroke();oh(e,1024,1024,4e3,[`rgba(150,110,60,0.12)`,`rgba(255,250,235,0.18)`],.6,1.6),e.fillStyle=`rgba(190,150,100,0.35)`,e.fillRect(0,n(-23.5),1024,1.2*i)},r.feet,.45)),n.add(ug((e,t,n,r)=>{let i=r/2;e.fillStyle=`#f4ead6`,e.fillRect(0,0,r,r),e.strokeStyle=`rgba(170,140,100,0.35)`,e.lineWidth=1.5;let a=1.2*n;for(let t=i%a;t<r;t+=a)e.beginPath(),e.moveTo(t,0),e.lineTo(t,r),e.moveTo(0,t),e.lineTo(r,t),e.stroke();oh(e,r,r,5e3,[`rgba(160,120,70,0.10)`,`rgba(255,255,255,0.18)`],.6,1.5),dg(e,i,i,Np*n,Pp*n,`#1f7fb8`),dg(e,i,i,2.6*n,2.85*n,`#3fa9ff`);for(let t=0;t<12;t++){let r=t/12*Math.PI*2;e.fillStyle=t%2?`#ffd23a`:`#ff8a3d`,e.beginPath(),e.moveTo(i+Math.cos(r-.12)*2.2*n,i+Math.sin(r-.12)*2.2*n),e.lineTo(i+Math.cos(r)*2.95*n,i+Math.sin(r)*2.95*n),e.lineTo(i+Math.cos(r+.12)*2.2*n,i+Math.sin(r+.12)*2.2*n),e.fill()}for(let[r,i]of Hp){dg(e,t(r),t(i),(Up-.12)*n,Up*n,`rgba(60,170,230,0.75)`),e.setLineDash([.3*n,.25*n]),e.strokeStyle=`rgba(60,170,230,0.6)`,e.lineWidth=.08*n,e.beginPath(),e.arc(t(r),t(i),(Up-.4)*n,0,Math.PI*2),e.stroke(),e.setLineDash([]),e.fillStyle=`#c9ced8`,e.beginPath(),e.arc(t(r),t(i),.55*n,0,Math.PI*2),e.fill(),e.fillStyle=`#5a6278`;for(let a=-2;a<=2;a++)e.fillRect(t(r)-.42*n,t(i)+a*.16*n-.04*n,.84*n,.08*n)}for(let[r,i,a,o]of zp)e.fillStyle=a>0?`#3fa9ff`:`#ffb21e`,e.beginPath(),e.arc(t(r),t(i),Bp*n,0,Math.PI*2),e.fill(),dg(e,t(r),t(i),(Bp-.14)*n,(Bp-.04)*n,`#ffffff`),e.save(),e.translate(t(r),t(i)),e.rotate(Math.atan2(o,a)),e.fillStyle=`#ffffff`,e.beginPath(),e.moveTo(.55*n,0),e.lineTo(-.1*n,-.42*n),e.lineTo(-.1*n,-.16*n),e.lineTo(-.5*n,-.16*n),e.lineTo(-.5*n,.16*n),e.lineTo(-.1*n,.16*n),e.lineTo(-.1*n,.42*n),e.closePath(),e.fill(),e.restore();ah(e,t(.3),t(-.2),(Pp+.3)*n,(Pp+.25)*n,.12)}));let s=new Sc(Np-.02,Pp+.02,96,1);{let e=s.attributes.position,t=s.attributes.uv;for(let n=0;n<e.count;n++){let r=Math.atan2(e.getY(n),e.getX(n)),i=Math.hypot(e.getX(n),e.getY(n));t.setXY(n,r/(Math.PI*2)*14,(i-Np)/2.1)}}s.rotateX(-Math.PI/2);let c=Og(),l=new Ya(s,new Rc({map:c,transparent:!0,opacity:.86,emissive:670298}));l.position.y=.03,l.renderOrder=1,n.add(l);let u=new Rc({vertexColors:!0});u.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <color_vertex>`,`vColor = vec4( 1.0 );
#ifdef USE_INSTANCING_COLOR
vColor.rgb = mix( instanceColor.rgb, vec3( 1.0 ), color.g ) * color.r;
#endif`)},u.customProgramCacheKey=()=>`hb-ring`;let d=new So(Dg(),u,3),f=[16736143,16765498,6217834],p=new I;for(let e=0;e<3;e++)d.setColorAt(e,p.set(f[e]));d.frustumCulled=!1,n.add(d);let[m,h]=rh(128,128),g=h.createRadialGradient(64,64,10,64,64,64);g.addColorStop(0,`rgba(255,255,255,0.0)`),g.addColorStop(.55,`rgba(255,255,255,0.35)`),g.addColorStop(.86,`rgba(255,255,255,0.95)`),g.addColorStop(.95,`rgba(255,255,255,1)`),g.addColorStop(1,`rgba(255,255,255,0)`),h.fillStyle=g,h.fillRect(0,0,128,128);let _=new La({map:ih(m,1),color:9169407,transparent:!0,depthWrite:!1,blending:2}),v=new xc(Up*2.2,Up*2.2);v.rotateX(-Math.PI/2);let y=new Ya(v,_);y.renderOrder=2,y.visible=!1,n.add(y);let[b,x]=rh(64,128),S=x.createLinearGradient(0,0,0,128);S.addColorStop(0,`rgba(255,255,255,0)`),S.addColorStop(.25,`rgba(230,250,255,0.85)`),S.addColorStop(1,`rgba(160,230,255,0.9)`),x.fillStyle=S,x.fillRect(0,0,64,128),x.fillStyle=`rgba(255,255,255,0.6)`;for(let e=0;e<7;e++)x.fillRect(e*9+2,0,3,128);let C=ih(b,1);C.wrapS=C.wrapT=st;let w=new La({map:C,transparent:!0,depthWrite:!1}),T=new Ya(new L(.9,1.4,1,16,1,!0).translate(0,.5,0),w);T.visible=!1,T.renderOrder=5,n.add(T);let E=-1,D=0;return{root:n,glowMat:o,theme:{name:`pool`,skyTop:5588648,skyLow:16757370,fog:15772308,hemiSky:16773854,hemiGround:6978228,hemiI:1.7,sun:16767148,sunI:1.7,glow:.65,neon:1,bulbs:1},update(e,n,r,i){c.offset.x=-e*.42,c.offset.y=Math.sin(n*.6)*.05;let a=Rp(e),o=new ni;for(let r=0;r<3;r++)o.position.set(a[r][0],.04+Math.sin(n*2.4+r*2)*.05,a[r][1]),o.rotation.set(Math.sin(n*1.7+r)*.08,e*.5+r,Math.cos(n*1.3+r)*.08),o.updateMatrix(),d.setMatrixAt(r,o.matrix),t.shadow(a[r][0]+.15,a[r][1]-.1,Ip*2.2,Ip*2.2);d.instanceMatrix.needsUpdate=!0;let s=Yp(e);if(y.visible=s.k>=0,T.visible=s.st===2,s.k>=0){let[e,a]=Hp[s.k];if(y.position.set(e,.05,a),y.rotation.y=n*.8,_.opacity=s.st===1?.35+.6*Math.abs(Math.sin(n*(6+s.u*10))):.9,y.scale.setScalar(s.st===1?.75+s.u*.25:1),D-=r,i&&s.st===1&&D<=0){D=.06;let n=Math.random()*Math.PI*2,r=Math.random()*Up*.8;t.norm.add(e+Math.cos(n)*r,.15,a+Math.sin(n)*r,0,.8+s.u*2,0,{life:.5,size:.25+s.u*.2,size1:.35,color:14219007,shape:5,drag:1})}if(s.st===2){let o=Math.sin(Math.min(1,s.u*1.4)*Math.PI*.5)*4.6*(1-Math.max(0,s.u-.7)/.3);T.position.set(e,0,a),T.scale.set(1,Math.max(.05,o),1),C.offset.y=-n*3,t.shadow(e,a,3,3),i&&s.k!==E&&(E=s.k,t.norm.burst(e,1,a,20,6,9,{life:1.1,size:.45,size1:.25,color:14219007,shape:5,grav:12,drag:.8},[14219007,16777215,9169407]),t.add.burst(e,1.5,a,18,5,8,{life:.7,size:.5,size1:.2,color:12580095,shape:0,grav:10,drag:1})),i&&Math.random()<r*40&&t.add.add(e+(Math.random()-.5),o*Math.random(),a+(Math.random()-.5),(Math.random()-.5)*4,3,(Math.random()-.5)*4,{life:.5,size:.4,size1:.1,color:14678271,grav:9})}else E=-1}else E=-1}}}function Ag(){let e=[];Xp.forEach(([t,n,r],i)=>{let a=t-n,o=t+n,s=[],c=9.05;for(let e=0;e<=10;e++){let t=a+(o-a)*e/10;s.push(new P(-Math.sqrt(c*c-t*t),t))}for(let e=10;e>=0;e--){let t=a+(o-a)*e/10;s.push(new P(Math.sqrt(c*c-t*t),t))}let l=new Cc(new Ns(s)),u=l.attributes.position,d=l.attributes.uv;for(let e=0;e<u.count;e++)d.setXY(e,u.getX(e)/2.3*Math.sign(r),(u.getY(e)-a)/(o-a));let f=l.toNonIndexed(),p=f.attributes.position;for(let e=0;e<p.count;e++)p.setXYZ(e,p.getX(e),.02,p.getY(e));f.computeVertexNormals(),e.push(f)});let t=Vm(e),n=t.attributes.position;for(let e=0;e<n.count;e+=3)for(let n of[`position`,`uv`,`normal`]){let r=t.attributes[n],i=r.itemSize;for(let t=0;t<i;t++){let n=r.array[(e+1)*i+t];r.array[(e+1)*i+t]=r.array[(e+2)*i+t],r.array[(e+2)*i+t]=n}}return t.computeVertexNormals(),t}function jg(){let[e,t]=rh(256,128);t.fillStyle=`#3a3646`,t.fillRect(0,0,256,128);for(let e=0;e<256;e+=16)t.fillStyle=`rgba(0,0,0,0.35)`,t.fillRect(e,0,3,128),t.fillStyle=`rgba(255,255,255,0.07)`,t.fillRect(e+3,0,2,128);t.fillStyle=`#ffd23a`;for(let e of[48,176])t.beginPath(),t.moveTo(e-26,30),t.lineTo(e,30),t.lineTo(e+30,64),t.lineTo(e,98),t.lineTo(e-26,98),t.lineTo(e+4,64),t.closePath(),t.fill();t.fillStyle=`rgba(0,0,0,0.4)`,t.fillRect(0,0,256,6),t.fillRect(0,122,256,6);let n=ih(e,8);return n.wrapS=st,n}function Mg(){let[e,t]=rh(512,512);t.fillStyle=`#8b93a6`,t.beginPath(),t.arc(256,256,256,0,Math.PI*2),t.fill();for(let e=0;e<8;e++){let n=e/8*Math.PI*2;t.fillStyle=e%2?`#7a8296`:`#9aa2b4`,t.beginPath(),t.moveTo(256,256),t.arc(256,256,250,n,n+Math.PI/4),t.closePath(),t.fill()}t.fillStyle=`rgba(255,255,255,0.18)`;for(let e=10;e<512;e+=22)for(let n=10+e/22%2*11;n<512;n+=22)t.save(),t.translate(n,e),t.rotate((n+e)%2*1.57+.78),t.fillRect(-6,-2,12,4),t.restore();t.strokeStyle=`#ffd23a`,t.lineWidth=26,t.lineCap=`round`;for(let e=0;e<3;e++){let n=e/3*Math.PI*2;t.beginPath(),t.arc(256,256,170,n,n+1.3),t.stroke();let r=256+Math.cos(n+1.45)*170,i=256+Math.sin(n+1.45)*170;t.fillStyle=`#ffd23a`,t.save(),t.translate(r,i),t.rotate(n+1.45+Math.PI/2),t.beginPath(),t.moveTo(0,30),t.lineTo(-34,-22),t.lineTo(34,-22),t.closePath(),t.fill(),t.restore()}t.fillStyle=`#4a4560`,t.beginPath(),t.arc(256,256,46,0,Math.PI*2),t.fill(),t.fillStyle=`#ff4d4d`,t.beginPath(),t.arc(256,256,26,0,Math.PI*2),t.fill(),t.strokeStyle=`#2b2233`,t.lineWidth=10,t.beginPath(),t.arc(256,256,250,0,Math.PI*2),t.stroke();for(let e=0;e<24;e++){let n=e/24*Math.PI*2;t.fillStyle=`#cfd5e2`,t.beginPath(),t.arc(256+Math.cos(n)*232,256+Math.sin(n)*232,6,0,Math.PI*2),t.fill()}return ih(e,8)}function Ng(){let e=[],t=em*2;e.push(W(t,.45,t,0,0,0,7236229,.3)),e.push(W(t+.08,.12,t+.08,0,0,0,2826803,0));for(let n=0;n<8;n++){let r=-t/2+(n+.5)*(t/8);for(let[i,a,o]of[[r,t/2+.03,0],[r,-t/2-.03,0],[t/2+.03,r,Math.PI/2],[-t/2-.03,r,Math.PI/2]])e.push(W(t/8,.24,.04,i,.12,a,n%2?2826803:16765498,0,o))}return e.push(W(t*.8,.3,t*.8,0,.45,0,9147302,.2)),e.push(eh(.3,.3,lm+.9,0,.75,0,13620706,14,.1)),Vm(e)}function Pg(e,t){$m(83);let n=new ri,r=new cg;r.add(mg(5919856)),r.add(fg(9.15,.24,.24,[16765498,2826803],72));for(let e=0;e<20;e++){let t=e/20*Math.PI*2;r.add(eh(.1,.12,.42,Math.cos(t)*9.15,0,Math.sin(t)*9.15,2826803,8,0))}for(let[e,t]of Xp){for(let n of[-1,1]){let i=e+n*(t+.08),a=Math.sqrt(81-i*i);r.add(W(a*2,.1,.16,0,0,i,16765498,0))}for(let n of[-1,1]){let i=n*(Math.sqrt(81-e*e)+1.6);r.add(W(2.4,1.9,t*2+.8,i,ig,e,4867424,.3)),r.add(W(2.5,.16,t*2+.9,i,1.4,e,16765498,0)),r.add(W(.1,1.2,t*2-.1,i-n*1.22,0,e,2826803,0));for(let a=0;a<5;a++)r.add(W(.06,1.1,(t*2-.2)/5-.04,i-n*1.26,.050000000000000044,e-t+.1+(t*2-.2)/5*(a+.5),[16736143,6211839,16765498,9240442,10976255][a],0));r.foot(i,e,1.8,t+.8,.55)}}r.add(H(U(new Tc(Zp+.04,.1,6,48),0,.02,0,Math.PI/2),2826803,0));let i=18.5;r.add(W(i*2,9,.8,0,ig,-21,11556671,.35));for(let e of[-1,1])r.add(W(.8,9,34,e*i,ig,-4,10899520,.35));for(let e=0;e<6;e++){let t=-15+e*6;r.add(W(3.4,5,.12,t,1.9,-20.58,3812932,0)),r.add(W(3,4.6,.1,t,2.1,-20.5,16767392,0));for(let e of[-.75,.75])r.add(W(.08,4.6,.12,t+e,2.1,-20.45,3812932,0));for(let e of[1.5,3,4.4])r.add(W(3,.08,.12,t,2.1+e,-20.45,3812932,0));r.glow(t,4.5,-20,16761963,3.2)}for(let e of[-1,1])for(let t=0;t<4;t++){let n=-15+t*7;r.add(W(.12,4.6,3,e*18.05,2.1,n,16767392,0)),r.add(W(.14,.1,3.2,e*18,4.4,n,3812932,0))}for(let e of[6.6,7.3])r.add(H(U(new L(.28,.28,i*2,10),0,ig+e,-20,0,0,Math.PI/2),e>7?6211839:16738877,.1));for(let e of[-12,0,12])r.add(eh(.22,.22,7.3,e,ig,-20,9147302,8,.1));let a=(e,t,n)=>{let i=4.2;for(let a of[-1,1])for(let o of[-1,1])r.add(W(.12,3.4,.12,e+Math.cos(n)*a*(i/2),ig,t-Math.sin(n)*a*(i/2)+o*.5,3824296,0,n));for(let a of[.4,1.5,2.6]){r.add(W(i,.1,1.1,e,ig+a,t,16747069,0,n));for(let i=0;i<4;i++){if(V()<.2)continue;let o=.6+V()*.3,s=-1.5+i*1;r.add(W(o,o*.8,.8,e+Math.cos(n)*s,ig+a+.1,t-Math.sin(n)*s,[13933141,13208139,16736143,6211839,16765498][Math.floor(V()*5)],.2,n))}}r.foot(e,t,2.6,1,.55)};a(-12.5,-17.5,0),a(12.5,-17.5,0),a(-16.2,-6.5,Math.PI/2),a(16.2,-6.5,Math.PI/2);let o=(e,t,n,i)=>{r.add(W(n,n,n,e,ig,t,13933141,.35,i)),r.add(W(n*1.02,n*.12,n*1.02,e,ig+n*.44,t,10118708,0,i)),r.foot(e,t,n*.9,n*.8,.5)};o(-13.2,7.5,1.1,.2),o(-12.2,8.6,.9,-.3),o(13.3,8.2,1.2,.1),o(-6,-15.6,1,.4);let s=(e,t,n)=>{r.add(eh(.45,.45,1.1,e,ig,t,n,12,.35));for(let n of[.25,.8])r.add(eh(.47,.47,.06,e,ig+n,t,2826803,12,0));r.foot(e,t,.65,.6,.5)};s(13.4,-2,3837936),s(14.3,-1.2,14692426),s(13.6,-.2,3837936),s(-13.6,1,6217834);{let e=6.4,t=-15.6;r.add(W(1.6,.9,2.4,e,-.25,t,16763196,.3)),r.add(W(1.4,.9,1,e,.6499999999999999,-15.2,16763196,.1)),r.add(W(1.2,.08,1,e,1.7999999999999998,-15.2,2826803,0));for(let t of[-1,1])r.add(W(.08,1.2,.08,e+t*.6,.6499999999999999,-14.75,2826803,0));r.add(W(1.4,2.4,.15,e,ig,-16.9,3813712,0));for(let t of[-1,1])r.add(W(.18,.08,1.4,e+t*.45,-.4,-17.6,9147302,0));for(let[n,i]of[[-.8,.8],[.8,.8],[-.8,-.8],[.8,-.8]])r.add(H(U(new L(.3,.3,.25,12),e+n,-.2,t+i,0,0,Math.PI/2),2826803,0));r.foot(e,t,1.4,2,.55)}{let e=-13.2,t=-11.5;r.add(W(1,1.1,2.6,e,ig,t,5923448,.3)),r.add(H(U(new Qo(1,.1,2.6),-13.1,.7,t,0,0,.35),3817298,0));for(let e=0;e<4;e++){let t=[16731469,9240442,16765498,6211839][e];r.add(th(.09,-13,.8,-12.4+e*.6,t,0,0)),r.glow(-13,.8500000000000001,-12.4+e*.6,t,.7)}r.foot(e,t,.9,1.6,.5)}{let e=12.6;r.add(W(2.6,1,1.8,e,ig,12,3837936,.3));for(let e=0;e<14;e++)r.add(th(.26,11.6+V()*2,.5+V()*.3,11.4+V()*1.2,[16736143,16765498,9240442,10976255,16777215][e%5],1,.1));r.foot(e,12,1.7,1.2,.5)}for(let[e,t]of $p){let n=lm+1.25;for(let i of[-1,1]){r.add(W(.36,n+.35,.36,e,0,t+i*nm,5919856,.3)),r.add(W(.5,.14,.5,e,0,t+i*nm,2826803,0));for(let n=0;n<4;n++)r.add(W(.38,.22,.38,e,.25+n*.6,t+i*nm,n%2?2826803:16765498,0))}r.add(W(.5,.4,nm*2+.36,e,n,t,5919856,.15)),r.add(W(1.3,.62,1.3,e,n-.1,t,7236229,.2)),r.add(W(1.36,.1,1.36,e,n+.5,t,16765498,0)),r.add(H(U(new R(.16,8,6,0,Math.PI*2,0,Math.PI/2),e,n+.58,t),16731469,0)),r.glow(e,n+.7,t,16738877,1.1)}for(let e of[-9,9])r.add(W(.9,.3,.5,e,5.7,-20.4,3817298,0)),r.glow(e,5.6,-20.1,16765578,3.6);r.add(H(U(new xc(500,500),0,-.53,-40,-Math.PI/2),9404528,0));for(let e=0;e<12;e++){let t=-70+e*13,n=8+V()*14;r.add(nh(9,9,t,-38-V()*14,-1.5,ig+n,[9071541,5925808,11565736,8228815][e%4])),V()<.5&&r.add(eh(.7,.9,7,t+2,ig+n,-40,9077656,8,.2))}_g(r,[8022696,9074872],-1);let c=r.finish(n,e,`factory`);n.add(lg(`#8f8070`,(e,t,n,r,a)=>{e.fillStyle=`#b6ac9c`,e.fillRect(t(-18.5),n(-21),i*2*r,47*a),oh(e,1024,1024,6e3,[`rgba(60,50,40,0.12)`,`rgba(255,250,235,0.10)`],.6,1.8),e.strokeStyle=`rgba(90,80,70,0.35)`,e.lineWidth=2;for(let r=-18.5;r<=i;r+=3)e.beginPath(),e.moveTo(t(r),n(-21)),e.lineTo(t(r),n(sg)),e.stroke();for(let r=-21;r<=sg;r+=3)e.beginPath(),e.moveTo(t(-18.5),n(r)),e.lineTo(t(i),n(r)),e.stroke();e.strokeStyle=`rgba(255,210,58,0.85)`,e.lineWidth=.22*r,e.setLineDash([1.2*r,.8*r]),e.strokeRect(t(-15.5),n(-13),31*r,25*a),e.setLineDash([]);for(let i=0;i<8;i++)ah(e,t(-14+V()*28),n(-18+V()*34),(.6+V())*r,(.4+V()*.6)*a,.25)},r.feet,.5)),n.add(ug((e,t,n,r)=>{let i=r/2;e.fillStyle=`#c4bcae`,e.fillRect(0,0,r,r),oh(e,r,r,7e3,[`rgba(70,60,50,0.12)`,`rgba(255,250,240,0.12)`,`rgba(120,110,95,0.10)`],.6,1.8),e.strokeStyle=`rgba(90,80,70,0.3)`,e.lineWidth=2;let a=2.2*n;for(let t=i%a;t<r;t+=a)e.beginPath(),e.moveTo(t,0),e.lineTo(t,r),e.moveTo(0,t),e.lineTo(r,t),e.stroke();e.save(),e.beginPath(),e.arc(i,i,9.6*n,0,Math.PI*2),e.arc(i,i,8.55*n,0,Math.PI*2,!0),e.clip();for(let t=0;t<90;t++){let r=t/90*Math.PI*2;e.fillStyle=t%2?`#2b2233`:`#ffd23a`,e.beginPath(),e.moveTo(i,i),e.arc(i,i,9.7*n,r,r+Math.PI*2/90+.002),e.closePath(),e.fill()}e.restore();for(let[r,i]of $p){let a=(em+.25)*n;gg(e,t(r)-a,t(i)-a,a*2,a*2,.35*n,`#ffd23a`,`#2b2233`),ah(e,t(r+.3),t(i-.2),em*1.5*n,em*1.4*n,.45)}for(let[r,a]of Xp)ah(e,i,t(r+.15),9*n,(a+.5)*n,.3);ah(e,t(.2),t(-.15),(Zp+.4)*n,(Zp+.35)*n,.4),e.fillStyle=`rgba(255,255,255,0.5)`,e.font=`400 ${Math.round(.9*n)}px "Lilita One", "Arial Black", sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`;for(let[n,r,i]of Xp){let a=n+(n<0?r+.55:-r-.55);for(let n of[-4.5,4.5])e.fillText(i>0?`▶▶`:`◀◀`,t(n),t(a))}}));let l=jg(),u=new Ya(Ag(),new Rc({map:l}));u.renderOrder=0,n.add(u);let d=new es(Zp,48);d.rotateX(-Math.PI/2);let f=new Ya(d,new Rc({map:Mg()}));f.position.y=.025,n.add(f);let p=new So(Ng(),new Rc({vertexColors:!0}),$p.length);p.frustumCulled=!1,n.add(p);let m=new xc(em*2+.5,em*2+.5);m.rotateX(-Math.PI/2);let h=new So(m,new La({color:16724016,transparent:!0,opacity:.55,depthWrite:!1}),$p.length);h.renderOrder=2,h.frustumCulled=!1,n.add(h);let g=new ni,_=[0,0];return{root:n,glowMat:c,theme:{name:`factory`,skyTop:3944302,skyLow:16752496,fog:12030092,hemiSky:16771276,hemiGround:8023180,hemiI:1.75,sun:16765600,sunI:1.7,glow:.9,neon:1,bulbs:1.1},update(e,n,r,i){l.offset.x=-e*(3/2.3),f.rotation.y=-e*Qp;let a=0;for(let r=0;r<$p.length;r++){let[o,s]=$p[r],c=um(r,e),l=c.st===1?Math.sin(n*50)*.03*(c.y<2.4?1:.4):0;g.position.set(o+l,c.y,s),g.rotation.set(0,0,0),g.scale.set(1,1,1),g.updateMatrix(),p.setMatrixAt(r,g.matrix);let u=1-(c.y-.2)/(lm-.2);t.shadow(o,s,em*2*(.9+u*.3),em*2*(.9+u*.3)),(c.st===1||c.st===2)&&(g.position.set(o,.04,s),g.updateMatrix(),h.setMatrixAt(a++,g.matrix)),i&&c.st===3&&_[r]!==3&&(t.puff(o,.3,s,10,4.5,.8,[14209220,11971740,16774374],.7,1,.4),t.norm.burst(o,.5,s,8,5,3,{life:.6,size:.3,size1:.2,color:16765498,shape:1,grav:10,drag:1},[16765498,16777215]),t.norm.burst(o,.3,s,6,4,3,{life:.8,size:.25,size1:.15,color:7236229,shape:2,grav:16,drag:.6,bounce:!0})),_[r]=c.st}h.count=a,h.material.opacity=.25+.4*Math.abs(Math.sin(n*10)),h.instanceMatrix.needsUpdate=!0,p.instanceMatrix.needsUpdate=!0}}}function Fg(e,t,n){return e===2?kg(t,n):e===3?Pg(t,n):Sg(t,n)}var Ig=1.35,Lg=22,Rg=72,zg=class{constructor(e,t){this.scene=new fi,this.cam=new yl(38,1,.5,400),this.chars=[],this.bumpSq=[0,0,0,0],this.sweeper=new ri,this.bombs=[],this.lockTab=`char`,this.lockYaw=0,this.lockTrailT=0,this.thumbRT=null,this.thumbScene=null,this.puffList=[],this.conf=[],this.shock=new rg,this.podiumOrder=[],this.tmp=new ni,this.v3=new F,this.v4=new F,this.col=new I,this.shake=0,this.place=0,this.twist=0,this.pitU={uR:{value:99},uNext:{value:99},uW:{value:0},uT:{value:0}},this.lastFloor=9,this.shFn=null,this.t=0,this.w=1,this.h=1,this.shot=`play`,this.camPos=new F,this.camLook=new F,this.camOff={x:0,y:0},this.camSnap=!0,this.pxScale=400,this.pops=[],this.fitKey=``,this.fitD=0,this.labels=t,this.renderer=new ap({canvas:e,antialias:!0,powerPreference:`high-performance`}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),this.arena=new vh(this.scene);let n=new Rc({vertexColors:!0});this.bumpers=new So(yh(),n,4),this.scene.add(this.bumpers),this.sweeper.add(new Ya(bh(),n)),this.scene.add(this.sweeper);let r=new xc(hm*2.5,hm*2.5);r.rotateX(-Math.PI/2),this.shadows=new So(r,new La({color:1707310,alphaMap:mh(),transparent:!0,opacity:.55,depthWrite:!1}),Lg),this.shadows.renderOrder=1,this.shadows.frustumCulled=!1,this.scene.add(this.shadows),this.bombMat=new Rc({vertexColors:!0});let i=this.dotTex();for(let e=0;e<2;e++){let n=e===0?this.bombMat:new Rc({vertexColors:!0}),r=new ri,a=new Ya(bp(``,e=>Vm(e)),n);r.add(a);let o=new Ya(new R(.09,6,5),new La({color:16773800}));o.position.set(0,.66,0),r.add(o),r.visible=!1,this.scene.add(r);let s=new Aa(new ga({map:i,color:16742954,blending:2,transparent:!0,depthWrite:!1}));s.renderOrder=7,s.visible=!1,this.scene.add(s);let c=document.createElement(`div`);c.className=`fuse`,t.appendChild(c),this.bombs.push({g:r,body:a,mat:n,spark:o,glow:s,lbl:c,skin:``,from:-1,to:-1,fly:1,drop:1,acc:0})}let a=new Sc(3,9.95,96,1);a.rotateX(-Math.PI/2),this.pit=new Ya(a,new Fc({uniforms:this.pitU,vertexShader:`varying vec2 vP; void main(){ vP=position.xz; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,fragmentShader:`uniform float uR; uniform float uNext; uniform float uW; uniform float uT; varying vec2 vP;
void main(){ float r=length(vP); float a=atan(vP.y,vP.x);
 if(r>uR){ float k=smoothstep(uR,uR+0.35,r); vec3 c=mix(vec3(0.33,0.22,0.5),vec3(0.07,0.04,0.14),k); float lip=1.0-smoothstep(0.0,0.12,r-uR); c=mix(c,vec3(0.95,0.85,1.0),lip*0.55); gl_FragColor=vec4(c,1.0); return; }
 if(uW>0.0 && r>uNext){ float s=step(0.5,fract((a*(uNext*1.3)+r*1.5)/1.0 - uT*1.5)); float p=0.45+0.4*abs(sin(uT*(8.0+uW*14.0))); vec3 c=mix(vec3(1.0,0.82,0.2),vec3(1.0,0.22,0.22),s); float crack=step(0.93,fract(a*9.0+r*0.7)); gl_FragColor=vec4(mix(c,vec3(0.15,0.08,0.2),crack*0.6),p*0.6); return; }
 discard; }`,transparent:!0,depthWrite:!1})),this.pit.position.y=.035,this.pit.renderOrder=1,this.pit.visible=!1,this.scene.add(this.pit),this.arena.build=e=>Fg(e,this.arena.glowU,{shadow:(e,t,n,r,i=0)=>this.shFn?.(e,t,n/(hm*2.5),r/(hm*2.5),i),add:this.add,norm:this.norm,puff:(e,t,n,r,i,a,o,s,c,l)=>this.puff(e,t,n,r,i,a,o,s,c,l)}),this.puffs=new So(new bc(.5,1),new Rc({color:16777215}),Rg),this.puffs.instanceMatrix.setUsage(In),this.puffs.count=0,this.puffs.frustumCulled=!1;for(let e=0;e<Rg;e++)this.puffs.setColorAt(e,this.col.set(16777215));this.scene.add(this.puffs),this.confetti=new So(new xc(.24,.13),new La({side:2}),110),this.confetti.count=0,this.confetti.frustumCulled=!1;let o=[16727406,16765498,4172287,6217834,10976255,16777215,16747069];for(let e=0;e<110;e++)this.confetti.setColorAt(e,this.col.set(o[e%o.length]));this.scene.add(this.confetti),this.add=new ng(320,!0),this.norm=new ng(160,!1),this.scene.add(this.add.pts,this.norm.pts,this.shock.mesh),this.podium=xh(),this.podium.visible=!1,this.scene.add(this.podium),this.resize()}dotTex(){let e=document.createElement(`canvas`);e.width=e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.3,`rgba(255,255,255,0.55)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.fillRect(0,0,64,64),new Jo(e)}setTheme(e){this.arena.setTheme(e)}setRoster(e){for(let e of this.chars)this.scene.remove(e.mesh),e.mat.dispose(),e.tag.remove(),e.bubble.remove();this.chars=e.map(e=>{let t=e.cz??op,n=qh(e.hat,t.h),r=n.mesh;this.scene.add(r);let i=document.createElement(`div`);i.className=`tag`+(e.me?` me`:``),i.innerHTML=(e.me?`<b>`+A(`youTag`)+`</b> `:``)+e.name.replace(/[<>&]/g,``),i.style.setProperty(`--c`,`#`+e.color.toString(16).padStart(6,`0`)),this.labels.appendChild(i);let a=document.createElement(`div`);return a.className=`bubble`,this.labels.appendChild(a),{rig:n,mesh:r,mat:n.mat,tag:i,bubble:a,bubT:0,rx:0,rz:0,yaw:0,launch:-1,lx:0,lz:0,squash:0,tagW:0,run:0,color:e.color,dustT:0,cz:t,fall:-1,hop:0,wasDash:!1}})}setShot(e,t=[]){if(e===`podium`&&(this.podiumOrder=t.slice(0,3)),e!==this.shot){this.shot=e;for(let e of this.chars)e.tagW=0;e===`podium`&&(this.add.n=0,this.norm.n=0,this.puffList=[],this.shock.t=1,this.shock.mesh.visible=!1,this.win())}}warm(){let e=[];this.scene.traverse(t=>{t.visible||(t.visible=!0,e.push(t))});let t=this.puffs.count;this.puffs.count=1,this.add.burst(0,-50,0,2,1,1,{life:.01,size:1,size1:1,color:16777215}),this.norm.burst(0,-50,0,2,1,1,{life:.01,size:1,size1:1,color:16777215,shape:2}),this.add.update(0),this.norm.update(0);try{this.renderer.compile(this.scene,this.cam),this.renderer.render(this.scene,this.cam)}catch{}for(let t of e)t.visible=!1;this.puffs.count=t,this.add.update(1),this.norm.update(1)}resize(){this.w=window.innerWidth,this.h=window.innerHeight,this.renderer.setSize(this.w,this.h,!1),this.cam.aspect=this.w/this.h;let e=this.renderer.getDrawingBufferSize(new P);this.pxScale=e.y/(2*Math.tan(this.cam.fov/2*Math.PI/180)),this.add.setScale(this.pxScale),this.norm.setScale(this.pxScale),this.camSnap=!0;for(let e of this.chars)e.tagW=0}fitPortrait(e,t){let n=this.cam.aspect.toFixed(4)+`:`+e;if(this.fitKey===n)return this.fitD;let r=this.cam.clone();r.updateProjectionMatrix();let i=new F,a=9.3,o=4,s=80;for(let n=0;n<22;n++){let n=(o+s)/2;r.position.set(0,Math.sin(e)*n,Math.cos(e)*n+t),r.lookAt(0,0,t),r.updateMatrixWorld();let c=!0;for(let e=0;e<48&&c;e++){let t=e/48*Math.PI*2;for(let e of[0,1.6])i.set(Math.cos(t)*a,e,Math.sin(t)*a).project(r),(Math.abs(i.x)>.9||Math.abs(i.z)>1)&&(c=!1)}c?s=n:o=n}return this.fitKey=n,this.fitD=s,s}want(){let e=this.h>this.w,t=Math.tan(this.cam.fov/2*Math.PI/180),n=t*this.cam.aspect;if(this.shot===`play`){let r=(e?56:52)*Math.PI/180,i=10.1,a=e?.6:.3,o=e?this.fitPortrait(r,a):Math.max((i*Math.sin(r)*1.08+1)/t,i/n);return{pos:new F(0,Math.sin(r)*o,Math.cos(r)*o+a),look:new F(0,0,a),ox:0,oy:0}}if(this.shot===`title`){let r=13*Math.PI/180,i=e?4.45/n:Math.max(4.1/t,7.6/n),a=new F(0,1.45,-.2);return{pos:new F(0,a.y+Math.sin(r)*i,a.z+Math.cos(r)*i),look:a,ox:e?0:-.19,oy:e?-.035:-.02}}if(this.arena.signMat.visible=!(this.shot===`locker`&&e),this.shot===`locker`){let n=8*Math.PI/180,r=e?4.6/t:3/t,i=new F(0,e?1.55:1.75,0);return{pos:new F(0,i.y+Math.sin(n)*r,i.z+Math.cos(n)*r),look:i,ox:e?0:.25,oy:e?.25:.03}}let r=12*Math.PI/180,i=e?3.5/n:Math.max(3.3/t,7/n),a=new F(0,2,0);return{pos:new F(0,a.y+Math.sin(r)*i,a.z+Math.cos(r)*i),look:a,ox:e?0:.2,oy:e?.03:0}}placeCam(e){let t=this.want(),n=this.camSnap?1:1-Math.exp(-e*4.5);this.camSnap=!1,this.camPos.lerp(t.pos,n),this.camLook.lerp(t.look,n),this.camOff.x+=(t.ox-this.camOff.x)*n,this.camOff.y+=(t.oy-this.camOff.y)*n;let r=this.shake*this.shake*1.4;this.cam.position.set(this.camPos.x+(Math.random()-.5)*r,this.camPos.y+(Math.random()-.5)*r*.7,this.camPos.z+(Math.random()-.5)*r*.5),this.cam.lookAt(this.camLook),Math.abs(this.camOff.x)>1e-4||Math.abs(this.camOff.y)>1e-4?this.cam.setViewOffset(this.w,this.h,this.camOff.x*this.w,this.camOff.y*this.h,this.w,this.h):this.cam.clearViewOffset(),this.cam.updateProjectionMatrix(),this.arena.setView(this.camPos.distanceTo(this.camLook),this.pxScale)}emote(e,t){let n=this.chars[e];n&&(n.bubble.textContent=t,n.bubT=2.2,n.bubble.classList.remove(`show`),n.bubble.offsetWidth,n.bubble.classList.add(`show`))}popText(e,t,n,r,i=2.4){let a=r[e];if(!a)return;let o=this.screen(a.x,i,a.z),s=performance.now(),c=n===`boom`||n===`pass`;this.pops=this.pops.filter(e=>s-e.t<1100&&e.el.isConnected);for(let e of this.pops)if(!(s-e.t>650||Math.hypot(e.x-o.x,e.y-o.y)>120)){if(!c||e.big)return;e.el.remove()}let l=document.createElement(`div`);l.className=`pop `+n,l.textContent=t,l.style.left=o.x+`px`,l.style.top=o.y+`px`,this.labels.appendChild(l);let u=l.offsetWidth/2+10,d=l.offsetHeight,f=Math.max(u,Math.min(innerWidth-u,o.x)),p=Math.max(d*1.6+8,Math.min(innerHeight-d,o.y));l.style.left=f+`px`,l.style.top=p+`px`,this.pops.push({el:l,t:s,x:o.x,y:o.y,big:c}),setTimeout(()=>l.remove(),1100)}puff(e,t,n,r,i,a,o,s=.7,c=6,l=.8){for(let u=0;u<r;u++){this.puffList.length>=Rg&&this.puffList.shift();let r=Math.random()*Math.PI*2,d=i*(.4+Math.random()*.8);this.puffList.push({x:e,y:t,z:n,vx:Math.cos(r)*d,vy:Math.random()*i*l,vz:Math.sin(r)*d,t:0,life:s*(.7+Math.random()*.6),s:a*(.6+Math.random()*.8),g:c}),this.puffs.setColorAt((this.puffList.length-1)%Rg,this.col.set(o[u%o.length]))}this.puffs.instanceColor&&(this.puffs.instanceColor.needsUpdate=!0)}boom(e,t){let n=t[e],r=this.chars[e];if(!n||!r)return;let i=n.x,a=n.z;this.shock.fire(i,a),this.add.add(i,1.4,a,0,0,0,{life:.22,size:4,size1:16,color:16777215}),this.add.burst(i,1.2,a,16,5.5,4,{life:.5,size:2.2,size1:4.8,color:16753969,drag:3.5},[16765498,16747050,16734762,16773800]),this.add.burst(i,1.2,a,34,11,9,{life:.7,size:.32,size1:.12,color:16773800,grav:16,drag:1.2},[16773800,16765498,16777215]),this.norm.burst(i,1.3,a,18,7.5,10,{life:1.5,size:.42,size1:.3,color:3814480,shape:2,grav:20,drag:.6,bounce:!0},[3814480,7235712,r.color,2762293]),this.norm.burst(i,1.6,a,9,4.5,7,{life:1.1,size:.75,size1:.5,color:16765498,shape:1,grav:9,drag:1},[16765498,16777215,16751165]),this.puff(i,.9,a,16,4.5,1.5,[7038072,9077656,5064540,11906756],1.6,-.6,.5),this.puff(i,1.1,a,16,6.5,1.7,[16773828,16765498,16757053,16738877],.55,3,.9),r.launch=0,r.lx=i,r.lz=a,this.shake=.75,this.popText(e,A(`boom`),`boom`,t,4.2)}passFx(e,t,n,r=0){let i=this.bombs[r]??this.bombs[0];i.from=e,i.to=t,i.fly=0;let a=n[t];a&&(this.norm.burst(a.x,2.5,a.z,7,3.6,4,{life:.75,size:.55,size1:.35,color:16765498,shape:1,grav:7,drag:1.2},[16765498,16777215,9240442]),this.add.burst(a.x,2.5,a.z,6,2.5,2,{life:.4,size:.9,size1:.2,color:16773800,shape:3,drag:2}))}hitFx(e,t,n){let r=t[e];r&&(this.norm.burst(r.x,1.3,r.z,n?6:4,3,3.5,{life:.55,size:n?.55:.42,size1:.25,color:16765498,shape:1,grav:8,drag:1.5},[16765498,16777215]),this.add.add(r.x,1.1,r.z,0,0,0,{life:.18,size:1.6,size1:2.6,color:16773800,shape:3}))}dashFx(e,t){let n=t[e];if(!n)return;let r=this.chars[e]?.cz.t??``;if(r)for(let e=0;e<5;e++)this.trail(r,n.x,n.z,.6);else this.puff(n.x,.25,n.z,6,2.2,.55,[15983300,14863268,16777215],.45,1,.5)}trail(e,t,n,r=.35){let i=()=>(Math.random()-.5)*r,a=.35+Math.random()*.9;e===`sparkle`?this.add.add(t+i(),a,n+i(),i(),.6+Math.random(),i(),{life:.55,size:.75,size1:.1,color:Math.random()<.5?16769658:16777215,shape:3}):e===`bubbles`?this.norm.add(t+i(),a*.7,n+i(),i()*.6,.9+Math.random()*.8,i()*.6,{life:.9,size:.38+Math.random()*.25,size1:.5,color:Math.random()<.5?12578815:14219007,shape:5,drag:1.5}):e===`hearts`?this.norm.add(t+i(),a,n+i(),i(),1.2+Math.random()*.6,i(),{life:.8,size:.5,size1:.28,color:Math.random()<.6?16736143:16751808,shape:4,drag:1.2}):e===`flames`&&(this.add.add(t+i(),.3+Math.random()*.4,n+i(),i(),2+Math.random()*1.5,i(),{life:.38,size:.9,size1:.15,color:Math.random()<.5?16742943:16761402,shape:0,drag:1}),Math.random()<.4&&this.norm.add(t+i(),.5,n+i(),0,1.6,0,{life:.45,size:.3,size1:.12,color:16727338,shape:1,drag:1}))}drop(e,t=0){let n=this.bombs[t]??this.bombs[0];n.from=-1,n.to=e,n.drop=0}fallFx(e,t){let n=this.chars[e],r=t[e];n&&r&&(n.fall=0,n.lx=r.x,n.lz=r.z,this.popText(e,A(`fell`),`boom`,t,3.2))}prepare(e){let t=this.arena.ensure(e);if(!t)return;let n=[];t.root.visible=!0,t.root.traverse(e=>{e.visible||(e.visible=!0,n.push(e))});try{this.renderer.compile(this.scene,this.cam)}catch{}for(let e of n)e.visible=!1;t.root.visible=this.arena.place===e}setArena(e,t){this.arena.setPlace(e),this.place=this.arena.place,this.twist=t;let n=this.place===0;this.bumpers.visible=n,this.lastFloor=9}bumpFx(e){e>=0&&e<4&&(this.bumpSq[e]=1)}squash(e){let t=this.chars[e];t&&(t.squash=1)}win(){this.conf=[];for(let e=0;e<110;e++)this.conf.push({x:(Math.random()-.5)*9,y:6+Math.random()*7,z:(Math.random()-.5)*4,vx:(Math.random()-.5)*1.5,vy:-1.6-Math.random()*1.6,vz:(Math.random()-.5)*1.5,t:0,life:7,s:Math.random()*6,g:0})}screen(e,t,n){return this.v3.set(e,t,n).project(this.cam),{x:(this.v3.x*.5+.5)*this.w,y:(-this.v3.y*.5+.5)*this.h}}showPos(e){return[(e-2.5)*1.22,0,(e%2?-.75:.25)-Math.abs(e-2.5)*.12]}frame(e,t){this.t+=t;let n=this.t;this.placeCam(t);let r=[],i=0,a=(e,t,n,r,a=0,o=.02)=>{i>=Lg||(this.tmp.position.set(e,o,t),this.tmp.rotation.set(0,a,0),this.tmp.scale.set(n,1,r),this.tmp.updateMatrix(),this.shadows.setMatrixAt(i++,this.tmp.matrix))};this.shFn=a;let o=this.shot===`play`&&this.twist===4?1.5:1,s=this.twist===5;this.shot===`play`?(e.ps.forEach((i,c)=>{let l=this.chars[c];if(!l)return;let u=l.mesh;u.visible=!0;let d=e.holder===c||e.holder2===c,f=e.holder2===c?e.fuse2:e.fuse,p=0,m=1,h=i.x-l.rx,g=i.z-l.rz,_=Math.hypot(h,g)/Math.max(t,.001);if(l.rx=i.x,l.rz=i.z,_>.5&&_<80){let e=Math.atan2(h,g)-l.yaw;for(;e>Math.PI;)e-=Math.PI*2;for(;e<-Math.PI;)e+=Math.PI*2;l.yaw+=e*Math.min(1,t*14)}l.squash=Math.max(0,l.squash-t*4),l.run+=(Math.min(1,Math.min(_,20)/5)-l.run)*Math.min(1,t*10);let v={t:n,dt:t,run:l.run,dash:i.dash,knock:i.knock,carry:!1,panic:0,ghost:!1,launch:!1,look:.32};if(l.launch>=0){l.launch+=t;let e=l.launch;u.position.set(l.lx+e*3,1+e*13-e*e*2,l.lz-e*5),u.rotation.set(e*9,l.yaw,e*6),u.scale.setScalar(Ig*Math.max(.05,1-e*.5)),l.mat.color.setRGB(.45,.4,.42),l.mat.emissive.setRGB(0,0,0),l.tag.style.display=`none`,v.launch=!0,v.run=0,Qh(l.rig,v),e>1.6&&(l.launch=-1),Math.random()<t*30&&this.puff(u.position.x,u.position.y,u.position.z,1,.3,.4,[7038072,9077656],.6,-.5);return}if(l.fall>=0){l.fall+=t;let e=l.fall,n=Math.hypot(l.lx,l.lz)||1;u.position.set(l.lx+l.lx/n*e*1.5,.2-e*e*9,l.lz+l.lz/n*e*1.5),u.rotation.set(e*4,l.yaw+e*6,Math.sin(e*12)*.3),u.scale.setScalar(Ig*o*Math.max(.05,1-e*.6)),l.mat.color.setRGB(1,1,1),l.mat.emissive.setRGB(0,0,0),l.tag.style.display=`none`,v.launch=!0,v.run=0,Qh(l.rig,v),e>1.1&&(l.fall=-1);return}if(!i.alive)l.mat.transparent||(l.mat.transparent=!0,l.mat.opacity=.45,l.mat.depthWrite=!1,l.rig.outlineOn.value=0,l.mat.needsUpdate=!0),l.mat.color.setRGB(.9,.95,1.2),l.mat.emissive.setRGB(.1,.12,.2),p=.7+Math.sin(n*3+c)*.18,u.position.set(i.x,p,i.z),u.rotation.set(.15,l.yaw,Math.sin(n*2+c)*.15),u.scale.setScalar(Ig*.85),v.ghost=!0,v.run=0,Qh(l.rig,v);else{l.mat.transparent&&(l.mat.transparent=!1,l.mat.opacity=1,l.mat.depthWrite=!0,l.rig.outlineOn.value=1,l.mat.needsUpdate=!0);let e=0;if(m=Ig*o,d){m=Ig*o*(1+(f<3?(3-f)*.04:0));let e=f<3?+(Math.sin(n*(f<1.5?40:22))>0):0;l.mat.color.setRGB(1,1,1),l.mat.emissive.setRGB(e*.55,e*.04,0),v.carry=!0,v.panic=f<3?2:1}else l.mat.color.setRGB(1,1,1),l.mat.emissive.setRGB(0,0,0);i.knock&&(e+=Math.sin(n*25)*.2),i.fly&&l.hop<=0?l.hop=.55:s&&i.dash&&!l.wasDash&&(l.hop=.42),l.wasDash=i.dash;let r=0;if(l.hop>0){let e=i.fly?.55:.42;l.hop=Math.max(0,l.hop-t),r=Math.sin((1-l.hop/e)*Math.PI)*(i.fly||l.hop>.42?2.2:1.3),v.dash=!0}Qh(l.rig,v);let c=l.squash,p=i.dash||i.fly?1:0;u.position.set(i.x,r,i.z),u.rotation.set(0,l.yaw,e,`YXZ`),i.stun?(u.scale.set(m*1.4,m*.32,m*1.4),Math.random()<t*6&&this.norm.add(i.x+(Math.random()-.5),1,i.z+(Math.random()-.5),0,1.2,0,{life:.6,size:.35,size1:.2,color:16765498,shape:1,drag:1})):u.scale.set(m*(1+c*.22-p*.1),m*(1-c*.28-p*.12),m*(1+c*.22+p*.3)),(i.dash||l.run>.85&&d)&&(l.dustT-=t,l.dustT<=0&&(l.dustT=i.dash?.025:.09,i.dash&&l.cz.t?this.trail(l.cz.t,i.x-Math.sin(l.yaw)*.4,i.z-Math.cos(l.yaw)*.4):this.puff(i.x-Math.sin(l.yaw)*.4,.2,i.z-Math.cos(l.yaw)*.4,1,.8,i.dash?.5:.35,[15983300,14863268],.4,.5,.6))),a(i.x,i.z,o*(1-r*.15),o*(1-r*.15))}l.tag.style.display=``;let y=this.screen(i.x,-.25,i.z);if(r.push({c:l,x:y.x,y:y.y}),l.tag.style.opacity=i.alive?`1`:`0.55`,l.bubT>0){l.bubT-=t;let e=this.screen(i.x,2.9+p,i.z);l.bubble.style.transform=`translate(${e.x|0}px,${e.y|0}px) translate(-50%,-100%)`,l.bubT<=0&&l.bubble.classList.remove(`show`)}}),this.placeTags(r)):this.chars.forEach((e,r)=>{let i=e.mesh;e.tag.style.display=`none`,e.bubble.classList.remove(`show`),e.mat.transparent&&(e.mat.transparent=!1,e.mat.opacity=1,e.mat.depthWrite=!0,e.rig.outlineOn.value=1,e.mat.needsUpdate=!0),e.mat.color.setRGB(1,1,1),e.mat.emissive.setRGB(0,0,0),e.launch=-1;let o,s,c,l=0,u=!1,d=0;if(this.shot===`locker`){if(r>0){i.visible=!1;return}o=s=c=0,u=this.lockTab===`bomb`;let a=this.lockTab===`dance`?Math.max(0,up.indexOf(e.cz.d)):0;if(this.lockTab===`dance`&&(l=1,d=a),e.yaw=this.lockYaw+(a===1?n*7:0),this.lockTab===`trail`&&e.cz.t&&(this.lockTrailT-=t,this.lockTrailT<=0)){this.lockTrailT=.05;let t=n*2.2;this.trail(e.cz.t,Math.cos(t)*1.05,Math.sin(t)*1.05,.25)}}else if(this.shot===`title`)[o,s,c]=this.showPos(r),u=r===2,e.yaw=-o*.07;else{let t=this.podiumOrder.indexOf(r);if(t<0){i.visible=!1;return}[o,s]=Sh[t],s+=.06,c=0,l=t===0?1:.4,d=t===0?Math.max(0,up.indexOf(e.cz.d)):0,e.yaw=-o*.08+(d===1?n*7:0);let a=this.screen(o,s+2.6,c);e.tag.style.display=``,e.tag.style.opacity=`1`,e.tag.style.transform=`translate(${a.x|0}px,${a.y|0}px) translate(-50%,-100%)`}i.visible=!0,e.rx=o,e.rz=c,Qh(e.rig,{t:n,dt:t,run:0,dash:!1,knock:!1,carry:u,panic:+!!u,ghost:!1,launch:!1,look:.05,cheer:l,dance:d}),i.position.set(o,s,c),i.rotation.set(0,e.yaw,0,`YXZ`),i.scale.setScalar(Ig),a(o,c,1,1,0,s+.02)});let c=this.shot===`play`&&this.place===0;this.sweeper.visible=c,c&&(this.sweeper.rotation.y=-e.sweep,a(0,0,(ym*2+.6)/(hm*2.5),.85/(hm*2.5),-e.sweep),a(.2,-.15,2.1/(hm*2.5)*1.3,2.1/(hm*2.5)*1.3));let l=this.arena.cur();l&&l.update(e.hz,n,t,this.shot===`play`),this.drawPit(e),this.podium.visible=this.shot===`podium`,this.podium.visible&&a(.3,-.2,7.5/(hm*2.5),3/(hm*2.5)),this.shadows.count=i,this.shadows.instanceMatrix.needsUpdate=!0,_m.forEach(([e,r],i)=>{this.bumpSq[i]=Math.max(0,this.bumpSq[i]-t*5);let a=this.bumpSq[i];this.tmp.position.set(e,0,r),this.tmp.rotation.set(0,n*.6+i,0),this.tmp.scale.set(1+a*.25,1-a*.35+Math.sin(n*3+i)*.03,1+a*.25),this.tmp.updateMatrix(),this.bumpers.setMatrixAt(i,this.tmp.matrix)}),this.bumpers.instanceMatrix.needsUpdate=!0,this.drawBomb(e,t,this.shot===`title`?2:this.shot===`locker`&&this.lockTab===`bomb`?0:-2);let u=this.puffList.filter(e=>(e.t+=t)<e.life);this.puffList=u,u.forEach((e,n)=>{e.vy-=e.g*t,e.vx*=1-t*2.5,e.vz*=1-t*2.5,e.x+=e.vx*t,e.y=Math.max(.15,e.y+e.vy*t),e.z+=e.vz*t;let r=e.t/e.life;this.tmp.position.set(e.x,e.y,e.z),this.tmp.scale.setScalar(e.s*(r<.15?r/.15:1-(r-.15)/.85*.9)+.01),this.tmp.rotation.set(e.t,e.t*.7,0),this.tmp.updateMatrix(),this.puffs.setMatrixAt(n,this.tmp.matrix)}),this.puffs.count=u.length,this.puffs.instanceMatrix.needsUpdate=!0,this.conf.length?(this.conf.forEach((e,r)=>{e.t+=t,e.y+=e.vy*t,e.x+=(e.vx+Math.sin(n*3+e.s)*.8)*t,e.z+=e.vz*t,e.y<.05&&(e.y=.05),this.tmp.position.set(e.x,e.y,e.z),this.tmp.rotation.set(n*4+e.s,e.s,n*3),this.tmp.scale.setScalar(1),this.tmp.updateMatrix(),this.confetti.setMatrixAt(r,this.tmp.matrix)}),this.confetti.count=this.conf.length,this.confetti.instanceMatrix.needsUpdate=!0,this.conf[0].t>7&&(this.conf=[])):this.confetti.count=0,this.add.update(t),this.norm.update(t),this.shock.update(t),this.shake=Math.max(0,this.shake-t),this.renderer.render(this.scene,this.cam)}placeTags(e){let t=this.h>this.w?16:19;e.sort((e,t)=>e.y-t.y);for(let n=0;n<e.length;n++){let r=e[n];r.c.tagW||(r.c.tagW=r.c.tag.offsetWidth||60);for(let i=0;i<n;i++){let n=e[i];Math.abs(r.x-n.x)<(r.c.tagW+n.c.tagW)/2+2&&Math.abs(r.y-n.y)<t&&(r.y=n.y+t)}r.c.tag.style.transform=`translate(${r.x|0}px,${r.y|0}px) translate(-50%,0)`}}clearOfHud(e,t,n,r){let i=document.querySelectorAll(`#deneme, #hud .alive, #hud .roomchip, #hud .emos, #hud .mute, #hud .banner`);for(let a=0;a<2;a++)for(let a of i){let i=a.getBoundingClientRect();i.width===0||i.top>this.h/2||e+n/2>i.left-4&&e-n/2<i.right+4&&t>i.top-4&&t-r<i.bottom+4&&(t=i.bottom+6+r)}return Math.max(t,r+4)}thumb(e,t,n,r=160,i=.18,a=.5){if(!this.thumbRT){this.thumbRT=new Er(r,r,{samples:4}),this.thumbRT.texture.colorSpace=An;let e=new fi;e.add(new sl(16777215,9075384,1.7));let t=new Sl(16777215,1.6);t.position.set(-3,8,6),e.add(t),this.thumbScene=e}let o=this.thumbScene,s=new yl(30,1,.1,100);s.position.set(t.x+Math.sin(a)*Math.cos(i)*n,t.y+Math.sin(i)*n,t.z+Math.cos(a)*Math.cos(i)*n),s.lookAt(t),o.add(e),e.updateMatrixWorld(!0);let c=this.renderer,l=c.getRenderTarget(),u=c.getClearColor(new I),d=c.getClearAlpha();c.setRenderTarget(this.thumbRT),c.setClearColor(0,0),c.clear(),c.render(o,s);let f=new Uint8Array(r*r*4);c.readRenderTargetPixels(this.thumbRT,0,0,r,r,f),c.setRenderTarget(l),c.setClearColor(u,d),o.remove(e);let p=document.createElement(`canvas`);p.width=p.height=r;let m=p.getContext(`2d`),h=m.createImageData(r,r);for(let e=0;e<r;e++)h.data.set(f.subarray((r-1-e)*r*4,(r-e)*r*4),e*r*4);return m.putImageData(h,0,0),p.toDataURL(`image/png`)}thumbChar(e,t,n=0,r=0,i=.6){let a=qh(e,t);return a.blinkT=2,Qh(a,{t:i,dt:0,run:0,dash:!1,knock:!1,carry:!1,panic:0,ghost:!1,launch:!1,look:.05,cheer:n,dance:r}),a.mesh.updateMatrixWorld(!0),a}thumbBomb(e){return new Ya(bp(e,e=>Vm(e)),this.bombMat)}headPos(e,t){let n=this.chars[e],r=t[e];if(!n)return new F(0,2,0);let i=this.shot===`play`&&r?r.x:n.mesh.position.x,a=this.shot===`play`&&r?r.z:n.mesh.position.z;return new F(i,n.mesh.position.y+(Dh+n.rig.lift+.08)*n.mesh.scale.y,a)}drawPit(e){let t=this.twist===3&&this.shot===`play`;if(this.pit.visible=t,!t)return;let n=mm(e.hz,!0);if(this.pitU.uR.value=n.r,this.pitU.uNext.value=n.next,this.pitU.uW.value=n.w,this.pitU.uT.value=this.t,n.r<this.lastFloor-.01){let e=n.r,t=this.lastFloor;for(let n=0;n<40;n++){let r=Math.random()*Math.PI*2,i=e+Math.random()*(t-e);this.norm.add(Math.cos(r)*i,.1,Math.sin(r)*i,Math.cos(r)*.6,2.5+Math.random()*2,Math.sin(r)*.6,{life:.9,size:.5,size1:.3,color:[13624567,12893358,9147302,5919856][n%4],shape:2,grav:14,drag:.3})}this.shake=Math.max(this.shake,.4)}this.lastFloor=n.r}drawBomb(e,t,n){let r=n>=0;this.drawOne(this.bombs[0],r?n:e.holder,r?5:e.fuse,e,t,r),this.drawOne(this.bombs[1],r?-1:e.holder2,e.fuse2,e,t,!1)}drawOne(e,t,n,r,i,a){let o=e.lbl;if(!a&&(t<0||r.phase!==`play`||this.shot!==`play`)){e.g.visible=!1,e.glow.visible=!1,o.style.display=`none`;return}e.g.visible=!0;let s=this.chars[t]?.cz.b??``;s!==e.skin&&(e.skin=s,e.body.geometry=bp(s,e=>Vm(e)));let c=this.headPos(t,r.ps),l=c;if(!a&&e.fly<1&&e.to===t&&e.from>=0){e.fly=Math.min(1,e.fly+i/.22);let t=this.headPos(e.from,r.ps),n=e.fly;l=t.lerp(c,n),l.y+=Math.sin(n*Math.PI)*1.6}else if(!a&&e.drop<1&&e.to===t){e.drop=Math.min(1,e.drop+i/.4);let t=e.drop;l=c.clone(),l.y+=(1-t*t)*9}let u=n<1.5?18:n<3?11:n<6?6:3,d=Math.sin(this.t*u*Math.PI);e.g.position.set(l.x,l.y+Math.abs(d)*.06,l.z),e.g.rotation.set(0,a?this.shot===`locker`?this.t*.8:.4:this.t*1.5,Math.sin(this.t*7)*.15);let f=this.twist===4&&!a?1.35:1,p=(1+(n<3?Math.max(0,d)*.18:0))*f;e.g.scale.setScalar(p);let m=n<3&&d>0;e.mat.emissive.setRGB(m?.95:0,m?.12:0,m?.05:0),e.spark.scale.setScalar(.8+Math.random()*.9),e.spark.getWorldPosition(this.v4);let h=Math.max(0,Math.min(1,(7-n)/7));for(e.acc+=i*(26+h*70);e.acc>1;){--e.acc;let t=Math.random()*Math.PI*2,n=1+Math.random()*2.2;this.add.add(this.v4.x,this.v4.y,this.v4.z,Math.cos(t)*n,1.5+Math.random()*2.5,Math.sin(t)*n,{life:.22+Math.random()*.25,size:.2+Math.random()*.14,size1:.04,color:Math.random()<.5?16765498:Math.random()<.5?16777215:16747050,grav:9})}e.glow.visible=!0,e.glow.position.copy(e.g.position);let g=(1.4+h*2.6+Math.max(0,d)*h*1.2)*f;if(e.glow.scale.setScalar(g),e.glow.material.opacity=.35+h*.55,e.glow.material.color.setRGB(1,.55-h*.3,.2-h*.15),a){o.style.display=`none`;return}let _=this.screen(l.x,l.y+1.25*f,l.z);_.y=this.clearOfHud(_.x,_.y,52,52),_.x=Math.min(this.w-30,Math.max(30,_.x)),o.style.display=``,o.textContent=String(Math.max(0,Math.ceil(n))),o.className=`fuse`+(n<3?` hot`:n<6?` warm`:``),o.style.transform=`translate(${_.x|0}px,${_.y|0}px) translate(-50%,-100%) scale(${n<3?1+Math.max(0,d)*.25:1})`}},Bg=`hb-save`,Vg=`hb-save-local`;function Hg(){return{v:1,n:0,coins:0,xp:0,owned:[],char:0,eq:{h:``,b:``,t:``,d:``},day:1,last:``,rounds:0}}function Ug(e){if(!e||typeof e!=`object`)return null;let t=e,n=(e,t=0)=>typeof e==`number`&&isFinite(e)&&e>=0?Math.floor(e):t,r=Hg();return r.n=n(t.n),r.coins=Math.min(n(t.coins),9999999),r.xp=n(t.xp),r.owned=Array.isArray(t.owned)?[...new Set(t.owned.filter(e=>typeof e==`string`&&e.length<40))]:[],r.char=Math.min(5,n(t.char)),r.eq=dp(t.eq),r.day=Math.max(1,Math.min(7,n(t.day,1))),r.last=typeof t.last==`string`&&/^\d{4}-\d{2}-\d{2}$/.test(t.last)?t.last:``,r.rounds=n(t.rounds),r}function Wg(e,t){if(!e)return t??Hg();if(!t)return e;let[n,r]=e.n>=t.n?[e,t]:[t,e],i={...n,eq:{...n.eq},owned:[...new Set([...n.owned,...r.owned])]};return i.xp=Math.max(n.xp,r.xp),i}function Gg(){try{let e=localStorage.getItem(Vg);return e?Ug(JSON.parse(e)):null}catch{return null}}var Kg={s:Wg(Gg(),null),portal:null};async function qg(e){if(Kg.portal=e,!e)return;let t=null;try{t=Ug(await e.load(Bg))}catch{t=null}Kg.s=Wg(Kg.s,t),Jg()}function Jg(){Kg.s.n++;let e=Kg.s;try{localStorage.setItem(Vg,JSON.stringify(e))}catch{}try{Kg.portal?.save(Bg,e).catch(()=>void 0)}catch{}}var Yg=e=>60+25*(e-1);function Xg(e){let t=1,n=e;for(;n>=Yg(t)&&t<99;)n-=Yg(t),t++;return{level:t,into:n,need:Yg(t)}}var Zg=()=>Xg(Kg.s.xp).level;function Qg(e){return e.kind===`char`||e.price===0&&!e.level&&!e.daily||e.level&&Zg()>=e.level?!0:Kg.s.owned.includes(e.id)}function $g(e){return Qg(e)||e.level||e.daily||Kg.s.coins<e.price?!1:(Kg.s.coins-=e.price,Kg.s.owned.push(e.id),Jg(),!0)}function e_(e){if(!Qg(e))return;let t=Kg.s.eq;e.kind===`char`?Kg.s.char=Number(e.id.slice(1)):e.kind===`hat`?t.h=t.h===e.id?``:e.id:e.kind===`bomb`?t.b=t.b===e.id?``:e.id:e.kind===`trail`?t.t=t.t===e.id?``:e.id:e.kind===`dance`&&(t.d=t.d===e.id?``:e.id),Jg()}function t_(e){let t=Kg.s.eq;return e.kind===`char`?Kg.s.char===Number(e.id.slice(1)):[t.h,t.b,t.t,t.d].includes(e.id)}function n_(){let e=Kg.s.eq,t=e=>{let t=cp.get(e);return t&&Qg(t)?e:``};return{h:t(e.h),b:t(e.b),t:t(e.t),d:t(e.d)}}function r_(e){return sp.filter(t=>t.level===e)}var i_=[60,45,35,25,20,15],a_=[50,40,32,26,22,18];function o_(e){let t=Math.max(0,Math.min(5,e.place)),n=Math.min(5,e.passes),r=Math.min(3,e.close),i=Math.min(5,e.shoves),a=[{k:`place`,n:t+1,c:i_[t]}];n&&a.push({k:`passes`,n,c:n*3}),r&&a.push({k:`close`,n:r,c:r*5}),i&&a.push({k:`shoves`,n:i,c:i*3});let o=a.reduce((e,t)=>e+t.c,0),s=a_[t]+n*2+r*4+i*2,c=Kg.s.xp,l=Xg(c).level,u=Xg(c+s).level,d=(u-l)*25;return Kg.s.coins+=o+d,Kg.s.xp+=s,Kg.s.rounds++,Jg(),{coins:o,xp:s,lines:a,levelFrom:l,levelTo:u,xpFrom:c,bonus:d}}function s_(e){Kg.s.coins+=e.coins,Jg()}var c_=[30,40,50,60,80,100,150],l_=`unicorn`;function u_(e=new Date){let t=e=>String(e).padStart(2,`0`);return e.getFullYear()+`-`+t(e.getMonth()+1)+`-`+t(e.getDate())}function d_(){let e=new Date;return e.setDate(e.getDate()-1),u_(e)}function f_(){let e=Kg.s;return e.last===u_()?0:e.last&&e.last!==d_()?1:e.last?e.day:1}function p_(){let e=f_();if(!e)return null;let t=Kg.s,n=c_[e-1],r=``;return e===7&&(t.owned.includes(`unicorn`)?n+=300:(t.owned.push(l_),r=l_)),t.coins+=n,t.last=u_(),t.day=e===7?1:e+1,Jg(),{day:e,coins:n,item:r}}var m_=`<i class="coin"></i>`,h_=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l1 12H5z" fill="#ffd23a" stroke="#22163a" stroke-width="2" stroke-linejoin="round"/><path d="M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="#22163a" stroke-width="2"/></svg>`,g_=`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="9" width="18" height="12" rx="2" fill="#ff4d6a" stroke="#22163a" stroke-width="2"/><rect x="2" y="7" width="20" height="4" rx="1.5" fill="#ff6f86" stroke="#22163a" stroke-width="2"/><path d="M12 7v14" stroke="#ffd23a" stroke-width="3"/><path d="M12 7c-2-4-6-4-6-1.5S10 7 12 7c2 0 6 1 6-1.5S14 3 12 7z" fill="#ffd23a" stroke="#22163a" stroke-width="1.6"/></svg>`,__=`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="3" width="22" height="18" rx="5" fill="#fff"/><path d="M10 8l6 4-6 4z" fill="#2a9a36"/></svg>`,v_=[[`char`,`tabChar`],[`hat`,`tabHat`],[`bomb`,`tabBomb`],[`trail`,`tabTrail`],[`dance`,`tabDance`]],y_=class{constructor(e,t){this.tab=`char`,this.sel=``,this.tryCos={h:``,b:``,t:``,d:``},this.tryChar=0,this.thumbs=new Map,this.open=!1,this.reward=null,this.rwTimer=0,this.drag={id:-1,x:0},this.h=t,this.root=e,e.insertAdjacentHTML(`beforeend`,`<div class="wallet"><div class="wl-lv"><b></b><i><s></s></i></div><div class="wl-coins">${m_}<span></span></div><button class="wl-gift">${g_}<em></em></button></div>
<div class="locker hidden"><div class="lk-drag"></div>
  <div class="lk-panel">
    <div class="lk-tabs">${v_.map(([e,t])=>`<button class="lk-tab" data-tab="${e}"><span data-k="${t}"></span></button>`).join(``)}</div>
    <div class="lk-grid"></div>
    <div class="lk-act"><button class="big alt lk-back" data-k="back"></button><button class="big lk-btn"></button></div>
    <div class="lk-note"></div>
  </div>
</div>
<div class="overlay daily hidden"><div class="card dl-card"><div class="dl-title" data-k="dailyTitle"></div><div class="dl-days"></div><button class="big dl-claim"></button><div class="dl-note"></div></div></div>
<div class="lvburst hidden"><span></span></div>`),this.wallet=e.querySelector(`.wallet`),this.locker=e.querySelector(`.locker`),this.daily=e.querySelector(`.daily`),e.querySelector(`.results .rbot`).insertAdjacentHTML(`afterbegin`,`<div class="rw hidden"><div class="rw-row"><div class="rw-coins">${m_}<span class="rw-n"></span></div><button class="rw-x2">${__}<span data-k="x2"></span></button></div><div class="rw-lines"></div><div class="rw-xp"><b class="rw-lv"></b><div class="rw-bar"><i></i></div><span class="rw-xpn"></span></div></div>`),this.rw=e.querySelector(`.rw`);for(let[t,n]of[[`.tfoot .invite`,`lockbtn`],[`.rbtns .invite2`,`lockbtn2`]]){let r=e.querySelector(t),i=document.createElement(`div`);i.className=`brow`,r.replaceWith(i),i.appendChild(r),i.insertAdjacentHTML(`beforeend`,`<button class="big alt ${n}">${h_}<span data-k="locker"></span></button>`)}let n=(t,n)=>{e.querySelectorAll(t).forEach(e=>{e.addEventListener(`pointerdown`,e=>e.stopPropagation()),e.addEventListener(`click`,t=>{t.stopPropagation(),S.click(),n(e)})})};n(`.lockbtn, .lockbtn2`,()=>this.openLocker()),n(`.lk-back`,()=>this.closeLocker()),n(`.lk-tab`,e=>this.setTab(e.dataset.tab)),n(`.lk-btn`,()=>this.act()),n(`.wl-gift`,()=>this.showDaily()),n(`.dl-claim`,()=>this.claim()),n(`.rw-x2`,()=>void this.x2());let r=this.locker.querySelector(`.lk-drag`);r.addEventListener(`pointerdown`,e=>{this.drag.id=e.pointerId,this.drag.x=e.clientX,r.setPointerCapture(e.pointerId)}),r.addEventListener(`pointermove`,e=>{e.pointerId===this.drag.id&&(this.h.view.lockYaw+=(e.clientX-this.drag.x)*.012,this.drag.x=e.clientX)});let i=e=>{e.pointerId===this.drag.id&&(this.drag.id=-1)};r.addEventListener(`pointerup`,i),r.addEventListener(`pointercancel`,i),this.drawWallet()}drawWallet(){let e=Xg(Kg.s.xp);this.wallet.querySelector(`.wl-lv b`).textContent=A(`lvl`,{n:e.level}),this.wallet.querySelector(`.wl-lv s`).style.width=Math.round(e.into/e.need*100)+`%`,this.wallet.querySelector(`.wl-coins span`).textContent=String(Kg.s.coins),this.wallet.querySelector(`em`).classList.toggle(`on`,f_()>0)}openLocker(){this.open||(this.open=!0,this.hideReward(),this.tryChar=Kg.s.char,this.tryCos=n_(),document.body.classList.add(`inlocker`),this.locker.classList.remove(`hidden`),this.h.view.lockYaw=.35,this.h.view.setShot(`locker`),this.setTab(this.tab))}closeLocker(){this.open&&(this.open=!1,this.locker.classList.add(`hidden`),document.body.classList.remove(`inlocker`),this.h.cosChanged(),this.h.restore(),this.drawWallet())}setTab(e){this.tab=e,this.h.view.lockTab=e,this.locker.querySelectorAll(`.lk-tab`).forEach(t=>t.classList.toggle(`on`,t.dataset.tab===e));let t=lp(e),n=t.find(e=>t_(e));this.sel=n?n.id:t[0].id,this.tryOn(cp.get(this.sel)),this.drawGrid(),requestAnimationFrame(()=>this.locker.querySelectorAll(`.lk-tab span`).forEach(e=>this.h.fit(e,e.parentElement.clientWidth-6)))}tryOn(e){let t=n_();this.tryChar=Kg.s.char,this.tryCos={...t},e.kind===`char`?this.tryChar=Number(e.id.slice(1)):e.kind===`hat`?this.tryCos.h=e.id:e.kind===`bomb`?this.tryCos.b=e.id:e.kind===`trail`?this.tryCos.t=e.id:e.kind===`dance`&&(this.tryCos.d=e.id),this.h.view.setRoster([{name:this.h.name(),color:16777215,hat:this.tryChar,me:!0,cz:this.tryCos}]),this.h.view.chars.forEach(e=>e.tag.style.display=`none`)}drawGrid(){let e=this.locker.querySelector(`.lk-grid`),t=Xg(Kg.s.xp).level;e.innerHTML=lp(this.tab).map(e=>{let n=Qg(e),r=``;return r=t_(e)?`<b class="ok">✓</b>`:n?``:e.daily?`<b class="lock">${A(`dayN`,{n:7})}</b>`:e.level?`<b class="lock">${A(`lvl`,{n:e.level})}</b>`:`<b class="price${Kg.s.coins>=e.price?``:` poor`}">${m_}${e.price}</b>`,`<button class="${`lk-card`+(e.id===this.sel?` sel`:``)+(t_(e)?` worn`:``)+(n?``:` locked`)+(e.level&&t<e.level?` lvl`:``)}" data-id="${e.id}"><img alt="" src="${this.thumb(e)}"/>${r}</button>`}).join(``),e.querySelectorAll(`.lk-card`).forEach(t=>{t.addEventListener(`pointerdown`,e=>e.stopPropagation()),t.addEventListener(`click`,n=>{n.stopPropagation(),S.click(),this.sel=t.dataset.id,e.querySelectorAll(`.lk-card`).forEach(e=>e.classList.toggle(`sel`,e===t)),this.tryOn(cp.get(this.sel)),this.drawAct()})}),this.drawAct()}drawAct(){let e=cp.get(this.sel),t=this.locker.querySelector(`.lk-btn`),n=this.locker.querySelector(`.lk-note`),r=``,i=!1,a=``;t.classList.remove(`buy`),Qg(e)?t_(e)?(r=e.kind===`char`?A(`chosen`):A(`takeOff`),i=e.kind===`char`):r=e.kind===`char`?A(`pick`):A(`equip`):e.daily?(r=A(`dailyOnly`),i=!0):e.level?(r=A(`reachLevel`,{n:e.level}),i=!0):(t.classList.add(`buy`),t.innerHTML=`<span>${A(`buy`)}</span> ${m_}<span>${e.price}</span>`,i=Kg.s.coins<e.price,i&&(a=A(`needMore`,{n:e.price-Kg.s.coins}))),r&&(t.textContent=r),t.disabled=i,n.textContent=a,this.h.fit(t)}act(){let e=cp.get(this.sel);if(Qg(e))e.kind===`char`&&t_(e)||e_(e);else{if(!$g(e))return;S.win(),this.pop(this.locker.querySelector(`.lk-btn`),A(`unlocked`)),e_(e)}e.kind!==`char`&&!t_(e)?this.tryOn(cp.get(`c`+Kg.s.char)):this.tryOn(e),this.drawWallet(),this.drawGrid()}pop(e,t){let n=e.getBoundingClientRect(),r=document.createElement(`div`);r.className=`pop pass`,r.textContent=t,r.style.left=n.left+n.width/2+`px`,r.style.top=n.top+`px`,r.style.position=`fixed`,r.style.zIndex=`60`,document.body.appendChild(r),setTimeout(()=>r.remove(),1100)}thumb(e){let t=e.kind===`hat`||e.kind===`dance`?Kg.s.char:0,n=e.id+`|`+t,r=this.thumbs.get(n);if(r)return r;let i=this.h.view,a=``;if(e.kind===`char`){let t=i.thumbChar(Number(e.id.slice(1)),``);a=i.thumb(t.mesh,new F(0,1.05,0),6.2,160,.12,.4),t.mat.dispose()}else if(e.kind===`hat`){let n=new Di;_p(e.id,t,e=>{e.computeBoundingBox(),n.union(e.boundingBox)});let r=n.min.y-.5,o=Math.max(n.max.y-r,(n.max.x-n.min.x)*1.1,1.6)*1.12,s=i.thumbChar(t,e.id),c=e.id===`headset`?.8:.45;a=i.thumb(s.mesh,new F(0,(r+n.max.y)/2-o*.08,0),o/.536,160,.16,c),s.mat.dispose()}else if(e.kind===`dance`){let n=up.indexOf(e.id),r=i.thumbChar(t,``,1,n,n===3?.1:.55);a=i.thumb(r.mesh,new F(0,1.12,0),5,160,.12,n===1?.9:.4),r.mat.dispose()}else if(e.kind===`bomb`){let t=i.thumbBomb(e.id);t.rotation.set(.12,.5,0),a=i.thumb(t,new F(0,.08,0),3.3,160,.15,0)}else a=b_(e.id);return this.thumbs.set(n,a),a}hideReward(){clearTimeout(this.rwTimer),this.rw.classList.add(`hidden`)}showReward(e){this.reward=e,this.hideReward(),this.rwTimer=window.setTimeout(()=>this.runReward(e),1300)}runReward(e){let t=this.rw;t.classList.remove(`hidden`),t.classList.remove(`rwin`),t.offsetWidth,t.classList.add(`rwin`);let n=t.querySelector(`.rw-x2`);n.classList.toggle(`hidden`,!ge()),n.disabled=!1,n.classList.remove(`done`),t.querySelector(`.rw-lines`).innerHTML=e.lines.map(e=>`<span>${A(e.k===`place`?`placeN`:e.k===`passes`?`passesN`:e.k===`close`?`closeN`:`shovesN`,{n:e.n})} <b>+${e.c}</b></span>`).join(``);let r=t.querySelector(`.rw-n`),i=t.querySelector(`.rw-lv`),a=t.querySelector(`.rw-bar i`);t.querySelector(`.rw-xpn`).textContent=`+`+e.xp+` XP`;let o=performance.now(),s=e.levelFrom;i.textContent=A(`lvl`,{n:s}),this.h.fit(n.querySelector(`span`),150);let c=0,l=n=>{if(t.classList.contains(`hidden`))return;let u=Math.min(1,(n-o)/1300),d=1-(1-u)*(1-u);r.textContent=`+`+Math.round(e.coins*d);let f=Xg(e.xpFrom+e.xp*d);f.level!==s&&(s=f.level,i.textContent=A(`lvl`,{n:s}),this.levelUp(s)),a.style.width=(f.into/f.need*100).toFixed(1)+`%`,u<1&&n-c>90&&(c=n,S.star()),u<1?requestAnimationFrame(l):this.drawWallet()};requestAnimationFrame(l)}levelUp(e){let t=this.root.querySelector(`.lvburst`),n=r_(e);t.querySelector(`span`).textContent=A(`levelUp`)+` `+A(`lvl`,{n:e})+(n.length?` · `+A(`unlocked`):``),t.classList.remove(`hidden`),t.classList.remove(`go`),t.offsetWidth,t.classList.add(`go`),this.h.fit(t.querySelector(`span`),innerWidth>innerHeight?innerWidth*.46:innerWidth-40),S.win(),setTimeout(()=>t.classList.add(`hidden`),2200)}async x2(){let e=this.reward,t=this.rw.querySelector(`.rw-x2`);if(!e||t.disabled)return;if(t.disabled=!0,!await _e()){t.disabled=!1,t.classList.toggle(`hidden`,!ge());return}s_(e),this.reward=null,t.classList.add(`done`);let n=this.rw.querySelector(`.rw-n`);n.textContent=`+`+e.coins*2,n.classList.remove(`bump`),n.offsetWidth,n.classList.add(`bump`),S.win(),this.drawWallet()}showDaily(){let e=f_(),t=Kg.s,n=e===0,r=n?t.day===1?7:t.day-1:e-1,i=this.daily.querySelector(`.dl-days`);i.innerHTML=c_.map((t,i)=>{let a=i+1,o=a<=r,s=!n&&a===e,c=a===7,l=c?`<img alt="" src="${this.thumb(cp.get(l_))}"/><span>${m_}${t}</span>`:`<span>${m_}${t}</span>`;return`<div class="dl-day${o?` got`:``}${s?` today`:``}${c?` d7`:``}"><small>${A(`dayN`,{n:a})}</small>${l}${o?`<b>✓</b>`:``}</div>`}).join(``);let a=this.daily.querySelector(`.dl-claim`);a.textContent=A(n?`ok`:`claim`),a.classList.toggle(`alt`,n),this.daily.querySelector(`.dl-note`).textContent=n?A(`comeBack`,{n:t.day}):A(`dailyNote`),this.daily.classList.remove(`hidden`),requestAnimationFrame(()=>{this.h.fit(a),this.h.fit(this.daily.querySelector(`.dl-title`)),i.querySelectorAll(`small`).forEach(e=>this.h.fit(e,e.parentElement.clientWidth-4))})}claim(){let e=p_();if(!e){this.daily.classList.add(`hidden`);return}S.win();let t=this.daily.querySelectorAll(`.dl-day`)[e.day-1];t&&(t.classList.remove(`today`),t.classList.add(`got`,`claimed`),t.insertAdjacentHTML(`beforeend`,`<b>✓</b>`),this.pop(t,`+`+e.coins));let n=this.daily.querySelector(`.dl-claim`);n.textContent=A(`ok`),n.classList.add(`alt`),this.daily.querySelector(`.dl-note`).textContent=(e.item?A(`unlocked`)+` `:``)+A(`comeBack`,{n:Kg.s.day}),this.h.fit(n),this.drawWallet()}autoDaily(){f_()>0&&this.showDaily()}};function b_(e){let t=document.createElement(`canvas`);t.width=t.height=160;let n=t.getContext(`2d`);n.lineJoin=`round`;for(let[t,r,i]of[[36,122,.55],[62,98,.7],[88,76,.85],[112,54,1],[128,30,.75]])n.save(),n.translate(t,r),n.scale(i,i),e===`sparkle`?(n.beginPath(),n.moveTo(0,-22),n.quadraticCurveTo(3,-3,22,0),n.quadraticCurveTo(3,3,0,22),n.quadraticCurveTo(-3,3,-22,0),n.quadraticCurveTo(-3,-3,0,-22),n.fillStyle=i>.8?`#ffe27a`:`#fff6c8`,n.strokeStyle=`#c98a10`,n.lineWidth=3,n.fill(),n.stroke()):e===`bubbles`?(n.beginPath(),n.arc(0,0,17,0,Math.PI*2),n.fillStyle=`rgba(191,239,255,0.55)`,n.fill(),n.lineWidth=4,n.strokeStyle=`#4fb6e8`,n.stroke(),n.beginPath(),n.ellipse(-6,-7,5,3,-.6,0,Math.PI*2),n.fillStyle=`#fff`,n.fill()):e===`hearts`?(n.beginPath(),n.moveTo(0,18),n.bezierCurveTo(-24,2,-20,-18,-8,-18),n.bezierCurveTo(-3,-18,0,-13,0,-9),n.bezierCurveTo(0,-13,3,-18,8,-18),n.bezierCurveTo(20,-18,24,2,0,18),n.fillStyle=i>.8?`#ff5f8f`:`#ff9cc0`,n.strokeStyle=`#241c38`,n.lineWidth=3.5,n.fill(),n.stroke()):(n.beginPath(),n.moveTo(0,-24),n.bezierCurveTo(12,-8,18,4,14,12),n.bezierCurveTo(10,20,-10,20,-14,12),n.bezierCurveTo(-18,4,-10,-6,0,-24),n.fillStyle=`#ff7a1f`,n.strokeStyle=`#8a2a0a`,n.lineWidth=3,n.fill(),n.stroke(),n.beginPath(),n.moveTo(0,-6),n.bezierCurveTo(7,2,8,8,6,12),n.bezierCurveTo(3,16,-3,16,-6,12),n.bezierCurveTo(-8,8,-4,2,0,-6),n.fillStyle=`#ffd23a`,n.fill()),n.restore();return t.toDataURL(`image/png`)}var x_=[`😂`,`😱`,`😎`,`😡`,`👋`,`🙏`],S_=`ABCDEFGHJKMNPQRSTUVWXYZ23456789`,C_=1e4,w_=35e3,T_=8e3,E_=6e3,D_=11e3,O_=new URLSearchParams(location.search),k_=/^\?([A-HJ-NP-Z2-9]{2,6})(&|$)/.exec(location.search),A_=(k_?k_[1]:O_.get(`room`)||``).toUpperCase(),j_=O_.has(`theme`)?Number(O_.get(`theme`)):-1,M_=O_.has(`arena`)?Number(O_.get(`arena`)):-1,N_=O_.has(`twist`)?Number(O_.get(`twist`)):-1,P_=O_.has(`maxh`)?Math.max(2,Math.min(6,Math.floor(Number(O_.get(`maxh`)))||2)):6,F_=He(),I_={n:0,last:-1,bag:[],plain:0,lastTw:0};function L_(){I_.n++;let e;M_>=0&&M_<4?e=M_:I_.n===1?e=0:(I_.bag.length||(I_.bag=[...[,,,,].keys()].sort(()=>Math.random()-.5),I_.bag[I_.bag.length-1]===I_.last&&I_.bag.unshift(I_.bag.pop())),e=I_.bag.pop()),I_.last=e;let t=0;if(N_>=0&&N_<6)t=N_;else if(I_.n>1){let n=I_.plain>=3?1:I_.plain===2?.5:I_.plain===1?.25:.1;if(Math.random()<n){let n=xp[e].filter(e=>e!==I_.lastTw);t=n[Math.floor(Math.random()*n.length)]}}return t&&!xp[e].includes(t)&&N_<0&&(t=0),I_.plain=t?0:I_.plain+1,t&&(I_.lastTw=t),[e,t]}var R_=e=>document.querySelector(e),z_=R_(`#hud`),B_=new zg(R_(`#gl`),R_(`#labels`));Ce(Se());function V_(){try{let e=localStorage.getItem(`hb-name`);if(e)return e}catch{}let e=jm[Math.floor(Math.random()*jm.length)];try{localStorage.setItem(`hb-name`,e)}catch{}return e}var H_=O_.get(`name`)?.slice(0,20)||V_();function U_(e){return String(e??``).replace(/[<>&"]/g,``).trim().slice(0,20)||`Friend`}var q=`title`,J=null,Y=0,W_=null,G_=null,K_=``,q_=[],J_=null,Y_,X_=new Map,Z_={nextAt:0,nxSent:0,ready:!1},X={rtt:0,snap:null,snapAt:0,joined:!1,dashN:0,started:0,joinMs:0,pings:[],ready:!1,nextAt:0,timers:[],heirs:[],pub:!1,humans:0},Z={on:!1,quick:!1,finding:!1,t:0,t0:0,ms:-1,how:``,retries:0,tried:new Set,peek:[],online:0,sent:0,sentAt:0},Q_={sim:null},$_=[],ev=0,tv=-1,nv=-1,rv=0,iv=0,av=``,ov=``,sv=performance.now(),cv={passes:0,booms:0,frames:0,fpsT:0,fps:0},lv={played:!1,paid:!1,passes:0,close:0,shoves:0,order:[]},uv=new Set,dv=!1,fv={id:-1,ox:0,oy:0,x:0,y:0};addEventListener(`keydown`,e=>{uv.add(e.code),e.code===`Space`&&(dv=!0,e.preventDefault()),v()}),addEventListener(`keyup`,e=>uv.delete(e.code));var pv=R_(`#touch`),mv=document.createElement(`div`);mv.className=`joy`,mv.innerHTML=`<div class="knob"></div>`,pv.appendChild(mv);var hv=mv.firstElementChild;function gv(e,t,n,r){mv.style.left=e+`px`,mv.style.top=t+`px`,hv.style.transform=`translate(${n}px,${r}px)`}function _v(){let e=innerHeight>innerWidth;gv(e?96:110,innerHeight-(e?120:100),0,0),mv.classList.remove(`on`)}pv.addEventListener(`pointerdown`,e=>{e.clientX<innerWidth*.55&&fv.id<0?(fv.id=e.pointerId,fv.ox=e.clientX,fv.oy=e.clientY,fv.x=fv.y=0,gv(e.clientX,e.clientY,0,0),mv.classList.add(`on`),pv.setPointerCapture(e.pointerId)):e.clientX>=innerWidth*.55&&(dv=!0)}),pv.addEventListener(`pointermove`,e=>{if(e.pointerId!==fv.id)return;let t=e.clientX-fv.ox,n=e.clientY-fv.oy,r=Math.hypot(t,n);r>55&&(fv.ox+=t/r*(r-55),fv.oy+=n/r*(r-55),t=e.clientX-fv.ox,n=e.clientY-fv.oy),fv.x=t/55,fv.y=n/55,gv(fv.ox,fv.oy,t,n)});var vv=e=>{e.pointerId===fv.id&&(fv.id=-1,fv.x=fv.y=0,_v())};pv.addEventListener(`pointerup`,vv),pv.addEventListener(`pointercancel`,vv);function yv(){if(de())return{x:0,z:0};let e=0,t=0;(uv.has(`KeyA`)||uv.has(`ArrowLeft`))&&--e,(uv.has(`KeyD`)||uv.has(`ArrowRight`))&&(e+=1),(uv.has(`KeyW`)||uv.has(`ArrowUp`))&&--t,(uv.has(`KeyS`)||uv.has(`ArrowDown`))&&(t+=1),fv.id>=0&&(e=fv.x,t=fv.y,Math.hypot(e,t)<.18&&(e=t=0));let n=Math.hypot(e,t);return n>1&&(e/=n,t/=n),{x:e,z:t}}var bv=e=>`data-k="${e}"`;z_.innerHTML=`
<div class="edge"></div>
<div class="flash"></div>
<div class="top">
  <div class="left"><div class="alive"><div class="plist"></div><span class="lft"></span></div><div class="roomchip hidden"><span class="rc"></span><button class="share"></button></div><div class="net"></div><div class="onl"></div></div>
  <div class="right"><div class="emos">${x_.map((e,t)=>`<button class="emo" data-e="${t}">${e}</button>`).join(``)}</div><button class="mute"></button></div>
</div>
<div class="banner hidden"></div>
<div class="count hidden"></div>
<div class="rule hidden"><div class="rplace"><span class="ri"></span><span class="rn"></span></div><div class="rhint"></div><div class="rtw hidden"><div class="rtl" ${bv(`partyRule`)}></div><div class="rtn"><span class="ti"></span><span class="tn"></span></div><div class="rth"></div></div></div>
<button class="dashbtn"><span ${bv(`dash`)}></span></button>
<div class="toast hidden"></div>
<div class="overlay title">
  <div class="tpart thead">
    <div class="logo"><div class="lrow"><span class="w hot" data-t="HOT">HOT</span><svg class="bombi" viewBox="0 0 64 64" aria-hidden="true"><circle cx="28" cy="38" r="21" fill="#2a2635" stroke="#22163a" stroke-width="4"/><circle cx="20" cy="30" r="6" fill="#fff" opacity=".4"/><rect x="33" y="12" width="13" height="10" rx="2" transform="rotate(40 40 17)" fill="#7a7390" stroke="#22163a" stroke-width="3"/><path d="M45 12 q5 -9 11 -6" stroke="#e8c48a" stroke-width="4" fill="none" stroke-linecap="round"/><g class="spk"><circle cx="57" cy="6" r="6" fill="#ffb21e"/><circle cx="57" cy="6" r="3" fill="#fff6c8"/></g></svg></div><span class="w bomb" data-t="BOMB">BOMB</span></div>
    <div class="tagline" ${bv(`tagline`)}></div>
  </div>
  <div class="tpart tfoot">
    <button class="big play" ${bv(`play`)}></button>
    <button class="big alt invite" ${bv(`inviteFriends`)}></button>
    <div class="hint"><span class="you"></span> · <span class="ctl"></span></div>
  </div>
</div>
<div class="overlay results hidden">
  <div class="rtop"><div class="win"></div></div>
  <div class="rbot"><div class="rest"></div><div class="rbtns"><div class="nexttxt hidden"></div><button class="big again" ${bv(`playAgain`)}></button><button class="big alt invite2" ${bv(`invite`)}></button></div></div>
</div>
<div class="overlay msg hidden"><div class="card"><div class="mtext"></div><button class="big mbtn" ${bv(`vsBots`)}></button></div></div>
<div class="roombox hidden"><div class="rbt" ${bv(`roomCode`)}></div><div class="rbc"></div><div class="rbl"></div><div class="rbb"><button class="big share2" ${bv(`shareLink`)}></button><button class="big alt rbclose" ${bv(`ok`)}></button></div></div>
`;var Q={alive:R_(`.alive`),chip:R_(`.roomchip`),rc:R_(`.rc`),net:R_(`.net`),onl:R_(`.onl`),banner:R_(`.banner`),count:R_(`.count`),rule:R_(`.rule`),toast:R_(`.toast`),title:R_(`.title`),results:R_(`.results`),msg:R_(`.msg`),mute:R_(`.mute`),dash:R_(`.dashbtn`),roombox:R_(`.roombox`),plist:R_(`.plist`),lft:R_(`.lft`),edge:R_(`.edge`),flash:R_(`.flash`),again:R_(`.again`),next:R_(`.nexttxt`),share:R_(`.share`),emos:R_(`.emos`)},xv=matchMedia(`(pointer: coarse)`).matches;document.body.classList.toggle(`touchdev`,xv),document.body.classList.add(`intitle`);function Sv(e,t=0){if(!e||e.offsetParent===null)return;e.style.fontSize=``;let n=parseFloat(getComputedStyle(e).fontSize),r=()=>t||e.clientWidth;for(let t=0;t<40&&n>8&&e.scrollWidth>r()+1;t++)--n,e.style.fontSize=n+`px`}function Cv(){document.querySelectorAll(`#hud .big, #hud .banner, #hud .win, #hud .lft, #hud .rc, #hud .rn, #hud .rhint, #hud .tn, #hud .rth, #hud .rtl`).forEach(e=>Sv(e));let e=Q.dash.firstElementChild;Sv(e,Q.dash.clientWidth-14)}function wv(){q===`host`||q===`guest`?(Q.rc.textContent=A(`room`,{c:K_}),Q.share.textContent=A(`share`)):(Q.rc.textContent=A(`playFriend`),Q.share.textContent=A(`inviteChip`))}function Tv(){document.querySelectorAll(`[data-k]`).forEach(e=>e.textContent=A(e.dataset.k)),R_(`.you`).textContent=A(`youAre`,{n:H_}),R_(`.ctl`).textContent=xv?A(`ctlTouch`,{d:A(`dash`)}):A(`ctlKeys`),wv(),q===`guest`&&X.ready&&(Q.again.textContent=A(`ready`)),av=``,Lv(q_),requestAnimationFrame(Cv)}function Ev(){return{name:H_,ch:Kg.s.char,z:n_()}}function Dv(){q===`title`?J&&Y<0&&(J.ps.forEach(e=>e.cos={...op}),J.ps[Kg.s.char].cos=n_(),Lv(Nv())):J&&Y>=0&&(q===`solo`||q===`host`)?(Fv(J.ps[Y]),Iv(),Lv(Nv()),dy()):(q===`guest`&&G_&&X.joined&&G_.send(`hi`,Ev()),Lv(q_))}var Ov=new y_(z_,{view:B_,name:()=>H_,cosChanged:Dv,restore:()=>{q===`title`?(B_.setShot(`title`),Q.title.classList.remove(`hidden`)):Q.results.classList.contains(`hidden`)?B_.setShot(`play`):B_.setShot(`podium`,lv.order),requestAnimationFrame(Cv)},fit:Sv});Tv();function kv(e,t){e.addEventListener(`pointerdown`,e=>e.stopPropagation()),e.addEventListener(`click`,e=>{e.stopPropagation(),v(),S.click(),t()})}kv(R_(`.play`),()=>void ty()),kv(R_(`.invite`),()=>{Bv(),uy()}),kv(R_(`.invite2`),()=>K_?qv():uy()),kv(Q.again,()=>Hv()),kv(R_(`.mbtn`),()=>Sy()),kv(Q.share,()=>K_?Kv():uy()),kv(R_(`.share2`),()=>Kv()),kv(R_(`.rbclose`),()=>Q.roombox.classList.add(`hidden`)),kv(Q.mute,()=>{m.muted=!m.muted,Av()}),Q.dash.addEventListener(`pointerdown`,e=>{e.stopPropagation(),v(!1),dv=!0}),document.querySelectorAll(`.emo`).forEach(e=>kv(e,()=>{e.classList.contains(`cool`)||(Ty(Number(e.dataset.e)),document.querySelectorAll(`.emo`).forEach(e=>e.classList.add(`cool`)),setTimeout(()=>document.querySelectorAll(`.emo`).forEach(e=>e.classList.remove(`cool`)),1200))}));function Av(){Q.mute.textContent=m.muted||m.portal?`🔇`:`🔊`}Av();var jv=0;function Mv(e){Q.toast.textContent=e,Q.toast.classList.remove(`hidden`),jv=2.6}function Nv(){return J.ps.map((e,t)=>({name:e.name,color:e.color,hat:e.hat,me:t===Y,cz:e.cos}))}function Pv(e){let t=Number(e);return Number.isInteger(t)&&t>=0&&t<6?t:0}function Fv(e){e.hat=Kg.s.char,e.cos=n_()}function Iv(){if(!J)return;let e=new Set(J.ps.filter(e=>e.ctrl!==`bot`).map(e=>e.hat)),t=[...[,,,,,,].keys()].filter(t=>!e.has(t));for(let e of J.ps)e.ctrl===`bot`&&(e.hat=t.length?t.shift():e.id%6),e.color=Mm[e.hat%Mm.length]}function Lv(e){q_=e,!Ov.open&&(B_.setRoster(e),$_.length=0)}function Rv(){J=new Pm([]),J.ps.forEach(e=>e.ctrl=`bot`),J.ps[Kg.s.char].cos=n_(),Y=-1,J.phaseT=.5,Lv(Nv()),B_.setShot(`title`)}function zv(){Q.title.classList.add(`hidden`),document.body.classList.remove(`intitle`),B_.setShot(`play`)}function Bv(){zv(),(q===`title`||q===`guest`)&&(q=`solo`),J=new Pm([H_]),J.evs.length=0,J.reset(...L_()),Y=0,Fv(J.ps[0]);for(let e of J.ps)e.ctrl===`bot`&&(e.cos=fp());Iv(),Lv(Nv()),Q.chip.classList.remove(`hidden`),wv(),requestAnimationFrame(Cv)}function Vv(e){H_=e,R_(`.you`).textContent=A(`youAre`,{n:H_}),J&&Y>=0&&(q===`solo`||q===`host`)?(J.ps[Y].name=H_,Lv(Nv()),dy()):q===`guest`&&G_&&X.joined&&G_.send(`hi`,Ev())}function Hv(){if(q===`guest`){X.ready=!0,G_?.send(`ready`,{}),Q.again.textContent=A(`ready`),Q.again.classList.add(`on`),Sv(Q.again);return}if(!J)return;if(q===`host`&&X_.size){Z_.ready=!0,Q.again.textContent=A(`ready`),Q.again.classList.add(`on`),Sv(Q.again);return}Q.results.classList.add(`hidden`);let e=()=>{q===`host`&&Z.on&&!X_.size?oy():Uv()};me()?he().then(e):e()}function Uv(){if(J){J.reset(...L_()),Z_.nextAt=0,Z_.ready=!1;for(let e of X_.values())e.ready=!1;py()}}function Wv(){let e=``;for(let t=0;t<4;t++)e+=S_[Math.floor(Math.random()*31)];return e}function Gv(){return Y_?.inviteLink({room:K_})||location.origin+location.pathname+`?`+K_}function Kv(){let e=Gv();if(typeof navigator.share==`function`&&xv&&!Y_){navigator.share({title:`Hot Bomb`,text:A(`shareText`,{c:K_}),url:e}).catch(()=>void 0);return}navigator.clipboard?.writeText?navigator.clipboard.writeText(e).then(()=>Mv(A(`copied`)),()=>Mv(e)):Mv(e)}function qv(){Q.roombox.classList.remove(`hidden`),R_(`.rbc`).textContent=K_;let e=Gv().replace(/^https?:\/\//,``);R_(`.rbl`).textContent=e.length<=48?e:``,requestAnimationFrame(Cv)}function Jv(){if(q===`host`&&Z.on&&(W_?.advertise(),Qv()),!Y_||!K_)return;let e=q===`host`?1+X_.size:2;Y_.setRoom(`hot-bomb-`+K_,e<Yv()+1,{room:K_})}function Yv(){return(Z.on?P_:6)-1}function Xv(){return{r:K_,h:1+X_.size,n:P_,t:Z.t,g:F_,s:0,v:2}}function Zv(){let e=W_?.shard??-1,t=0;for(let n of Z.peek)n.s!==e&&n.r!==K_&&(t+=n.h);for(let e of W_?.lobby.values()??[])t+=e.h;return Math.max(t,1+X_.size)}function Qv(){if(q!==`host`||!Z.on)return;Z.online=Zv();let e=performance.now();X_.size&&Z.online!==Z.sent&&e-Z.sentAt>3e3&&(Z.sent=Z.online,Z.sentAt=e,W_?.sendAll(`on`,{o:Z.online,h:1+X_.size}))}function $v(e){Z.retries=0,Z.t0&&(Z.ms=Math.round(performance.now()-Z.t0),Z.how=e,Z.t0=0)}function ey(){Q.msg.classList.add(`hidden`),Q.results.classList.add(`hidden`),Q.roombox.classList.add(`hidden`),document.body.classList.remove(`inresults`)}async function ty(){if(Z.finding)return;Z.finding=!0,Z.t0||(Z.t0=performance.now()),zv(),Cy(A(`finding`),!1);let e=await Ue();Z.finding=!1,Z.peek=e??[],Z.online=Z.peek.reduce((e,t)=>e+t.h,0);let t=e?We(e,Z.tried,F_):null;t?ny(t.r):ay(``,!0)}function ny(e){xy(),ey(),Z.quick=!0,yy(e),X.timers.push(window.setTimeout(()=>{q===`guest`&&K_===e&&!X.joined&&iy(e)},D_))}function ry(){K_&&Z.tried.add(K_),G_=null,xy(),ey(),q=`solo`,Bv(),$v(`solo`)}function iy(e){Z.tried.add(e),xy(),Z.retries++<1?ty():ay(``,!0)}function ay(e,t){xy(),ey(),q=`solo`,Bv(),K_=e||Wv(),q=`host`,Z.on=t,Z.t=Date.now(),W_=new Ye(K_,(e,t,n)=>_y(e,t,n),t?Xv:null),W_.onLobby=()=>Qv(),W_.onGone=e=>gy(e),Jv(),wv(),$v(`host`)}async function oy(){let e=K_,t=Z.t,n=await Ue(1500);if(q!==`host`||K_!==e)return;n&&(Z.peek=n);let r=(n??[]).filter(n=>n.r!==e&&(n.h>=2||n.t<t||n.t===t&&n.r<e)),i=X_.size?null:We(r,Z.tried,F_);if(!i){J?.phase===`end`&&Uv();return}Z.t0=performance.now(),ny(i.r)}function sy(e){let t=7;for(let n of e)t=Math.imul(t,31)+n.charCodeAt(0)>>>0;let n=``;for(let e=0;e<4;e++)t=Math.imul(t,1103515245)+12345>>>0,n+=S_[(t>>>16)%31];return n===e?n.slice(1)+S_[0]:n}function cy(){if(q!==`guest`||!X.joined)return;let e=G_?.id??``,t=X.heirs,n=X.pub,r=sy(K_);t[0]===e?ay(r,n):t.length?(xy(),ey(),Z.quick=n,yy(r),X.timers.push(window.setTimeout(()=>{q!==`guest`||K_!==r||X.joined||(n?iy(r):Sy())},D_))):n?(xy(),ty()):Sy(),Mv(A(`hostLeftNew`))}function ly(){return q===`host`&&X_.size===0&&!Q.roombox.classList.contains(`hidden`)}function uy(){q!==`guest`&&(W_||(K_=(O_.get(`hostroom`)||Wv()).toUpperCase(),q=`host`,W_=new Ye(K_,(e,t,n)=>_y(e,t,n)),Jv()),Q.chip.classList.remove(`hidden`),wv(),qv(),J&&X_.size===0&&J.phase!==`count`&&(Q.results.classList.add(`hidden`),document.body.classList.remove(`inresults`),Uv()))}function dy(){if(q!==`host`||!W_||!J)return;let e=J.ps.map(()=>``);for(let t of X_.values())t.slot>=0&&(e[t.slot]=t.id);W_.sendAll(`r`,{ps:q_.map(e=>({n:e.name,c:e.color,h:e.hat,z:e.cz??op})),ids:e,pub:+!!Z.on,o:Z.on?Zv():0,hc:1+X_.size,g:[...X_.keys()]})}function fy(e,t=!1){if(!J)return!1;let n=J,r=n.ps.filter(e=>e.ctrl===`bot`),i=r.find(e=>e.alive&&e.id!==n.holder&&e.id!==n.holder2),a=t?i:i??r.find(e=>e.alive)??r[0];return a?(e.slot=a.id,a.ctrl=`guest`,a.name=e.name,a.hat=e.ch,a.cos=e.cos,a.ix=a.iz=0,Iv(),!0):!1}function py(){if(!J)return;let e=!1;for(let t of X_.values())t.slot<0&&fy(t)&&(e=!0);e&&(Lv(Nv()),dy())}function my(){return!!J&&(J.phase===`end`||J.phase===`count`&&J.outCount===0)}function hy(){let e=new Set(J.ps.map(e=>e.name));return jm.find(t=>!e.has(t))??`Bot`}function gy(e){let t=X_.get(e);if(t&&J){if(X_.delete(e),W_?.drop(e),t.slot>=0){let e=J.ps[t.slot];e.ctrl=`bot`,e.name=hy(),e.cos=fp(),e.ix=e.iz=0,Iv(),Lv(Nv()),dy()}Mv(A(`leftName`,{n:t.name})),Jv()}}function _y(e,t,n){if(!J||!W_)return;let r=performance.now(),i=X_.get(n);if(e===`hi`){let e=t||{};if(!i){if(X_.size>=Yv()){W_.sendTo(n,`full`,{}),W_.drop(n);return}i={id:n,name:U_(e.name),slot:-1,seen:r,rtt:0,dash:0,ready:!1,ad:!1,ch:Pv(e.ch),cos:dp(e.z)},X_.set(n,i),my()?fy(i):(J.phase===`play`||J.phase===`gap`)&&fy(i,!0),Mv(A(`joinedName`,{n:i.name})),Q.roombox.classList.add(`hidden`),Jv()}else if(i.name=U_(e.name),i.ch=Pv(e.ch),i.cos=dp(e.z),i.slot>=0){let e=J.ps[i.slot];e.name=i.name,e.hat=i.ch,e.cos=i.cos,Iv()}i.seen=r,Lv(Nv()),dy(),W_.sendAll(`s`,J.snap()),J.phase===`end`&&W_.sendTo(n,`end`,{order:J.order.slice()});return}if(i){if(i.seen=r,e===`i`){let e=t;i.rtt=e.r;let n=J.ps[i.slot];if(!n||n.ctrl!==`guest`)return;n.ix=Math.max(-1,Math.min(1,Number(e.x)||0)),n.iz=Math.max(-1,Math.min(1,Number(e.z)||0)),e.d>i.dash&&(n.dashReq=!0),i.dash=e.d}else if(e===`e`){let e=t;i.slot>=0&&J.evs.push({k:`emo`,i:i.slot,e:Math.max(0,Math.min(x_.length-1,e.e|0))})}else e===`ready`?i.ready=!0:e===`ad`?i.ad=!!t.on:e===`bye`?gy(n):e===`p`&&W_.sendTo(n,`P`,t)}}function vy(e){if(!J||J.phase!==`end`||!X_.size||!Z_.nextAt)return;let t=Z_.ready&&[...X_.values()].every(e=>e.ready||e.slot<0),n=de()||[...X_.values()].some(e=>e.ad);if((e>=Z_.nextAt||t)&&(!n||e>=Z_.nextAt+w_)){Q.results.classList.add(`hidden`),Uv();return}e-Z_.nxSent>500&&(Z_.nxSent=e,W_?.sendAll(`nx`,{ms:Math.max(0,Math.round(Z_.nextAt-e))}))}function yy(e){K_=e,q=`guest`,J=null,Y=-1,zv(),Q.chip.classList.remove(`hidden`),wv(),Cy(Z.quick?A(`finding`):A(`joining`,{c:K_}),!1),Q_.sim=new Pm([]),Q_.sim.evs.length=0,X.joined=!1,X.snap=null,X.started=performance.now(),G_=new Xe(K_,(e,t)=>wy(e,t),()=>G_?.send(`hi`,Ev()),!Z.quick,()=>ry()),X.timers.push(window.setTimeout(()=>{!X.joined&&q===`guest`&&!Z.quick&&Cy(A(`notFound`,{c:K_}),!0)},15e3),window.setInterval(()=>{G_&&X.joined&&G_.send(`p`,{t:performance.now()})},1e3))}function by(e){let t=e.toUpperCase().replace(/[^A-Z0-9]/g,``).slice(0,6);!t||q===`guest`&&K_===t||(xy(),Q.results.classList.add(`hidden`),Q.roombox.classList.add(`hidden`),document.body.classList.remove(`inresults`),yy(t))}function xy(){W_&&X_.size&&W_.sendAll(`gone`,{}),G_&&(G_.send(`bye`,{}),G_.close()),W_?.close(),G_=null,W_=null,X_.clear();for(let e of X.timers)clearTimeout(e),clearInterval(e);X.timers.length=0,X.joined=!1,X.snap=null,X.ready=!1,X.heirs=[],X.pub=!1,Z.on=!1,Z.quick=!1,K_&&Y_?.leaveRoom(),K_=``}function Sy(){xy(),Q.msg.classList.add(`hidden`),Q.results.classList.add(`hidden`),document.body.classList.remove(`inresults`),q=`solo`,Bv()}function Cy(e,t){Q.msg.classList.remove(`hidden`),R_(`.mtext`).textContent=e,R_(`.mbtn`).classList.toggle(`hidden`,!t),requestAnimationFrame(Cv)}function wy(e,t){let n=performance.now();if(e===`r`){let e=t;X.heirs=Array.isArray(e.g)?e.g.slice(0,6).map(e=>String(e)):[],X.pub=!!e.pub,X.humans=Number(e.hc)||0,Number(e.o)>0&&(Z.online=Number(e.o));let r=Y;if(Y=Array.isArray(e.ids)?e.ids.indexOf(G_?.id??``):-1,Lv(e.ps.map((e,t)=>({name:U_(e.n),color:Number(e.c)||16777215,hat:Pv(e.h),me:t===Y,cz:dp(e.z)}))),Y!==r&&Y>=0&&X.snap&&Q_.sim&&X.snap.p[Y]){let e=Q_.sim.ps[0];e.x=X.snap.p[Y][0]/100,e.z=X.snap.p[Y][1]/100}X.joined||(X.joined=!0,X.joinMs=Math.round(n-X.started),Q.msg.classList.add(`hidden`),Mv(A(`joinedRoom`,{c:K_})),Jv(),$v(`join`))}else if(e===`s`){let e=t;if(!X.snap&&Q_.sim&&e.p[Y]){let t=Q_.sim.ps[0];t.x=e.p[Y][0]/100,t.z=e.p[Y][1]/100}X.snap=e,X.snapAt=n}else if(e===`ev`)for(let e of t)jy(e);else if(e===`end`)Fy(t.order);else if(e===`nx`)X.nextAt=n+t.ms;else if(e===`on`){let e=t;Z.online=Number(e.o)||Z.online,X.humans=Number(e.h)||X.humans}else if(e===`gone`)cy();else if(e===`full`){if(Z.quick){iy(K_);return}Cy(A(`roomFull`),!0),G_?.close(),G_=null}else if(e===`P`){let e=n-t.t;if(!(e>=0&&e<1e4))return;X.pings.push(e),X.pings.length>10&&X.pings.shift(),X.rtt=Math.round(X.pings.reduce((e,t)=>e+t,0)/X.pings.length)}}function Ty(e){q===`guest`?Y>=0&&G_?.send(`e`,{e}):J&&Y>=0&&J.evs.push({k:`emo`,i:Y,e})}var Ey=0,Dy=0,Oy=0,ky=[],Ay=[];function jy(e){let t=$.ps;switch(e.k){case`pass`:cv.passes++,e.a===Y&&Y>=0&&lv.passes++,B_.passFx(e.a,e.b,t,e.w??0),B_.squash(e.b),B_.popText(e.b,e.b===Y?A(`itsYou`):A(`tag`),`pass`,t),S.pass(),S.star(),e.b===Y&&(iv=1.6,navigator.vibrate?.(40));break;case`drop`:B_.drop(e.i,e.w??0),S.drop(),e.i===Y&&(iv=1.6);break;case`boom`:cv.booms++;{let n=t[e.i],r=t[Y];Y>=0&&e.i!==Y&&n&&r&&r.alive&&Math.hypot(n.x-r.x,n.z-r.z)<3.5&&lv.close++}B_.boom(e.i,t),S.boom(),S.whee(),Dy=.3,Q.flash.classList.remove(`on`),Q.flash.offsetWidth,Q.flash.classList.add(`on`),e.i===Y&&navigator.vibrate?.(220);break;case`bump`:if(e.s>=0&&e.s<4&&B_.bumpFx(e.s),performance.now()-(ky[e.i]??0)>250&&(ky[e.i]=performance.now(),B_.hitFx(e.i,t,e.s===9||e.s===10||e.s===12)),performance.now()-Ey>90){Ey=performance.now(),S.boing();let n=performance.now();n-(Ay[e.i]??0)>900&&(e.s===9||e.s===10?B_.popText(e.i,A(`whack`),`whack`,t):e.s===12?B_.popText(e.i,A(`splash`),`boing`,t):e.s>=0&&Math.random()<.4&&B_.popText(e.i,A(`boing`),`boing`,t),Ay[e.i]=n)}break;case`dash`:S.dash(),B_.dashFx(e.i,t);break;case`fall`:B_.fallFx(e.i,t),S.whee(),e.i===Y&&navigator.vibrate?.(160);break;case`crush`:B_.squash(e.i),B_.hitFx(e.i,t,!0),B_.popText(e.i,A(`flat`),`whack`,t),S.shove(),S.boing(),e.i===Y&&navigator.vibrate?.(80);break;case`pad`:B_.popText(e.i,A(`whee`),`pass`,t),S.whee();break;case`gey`:S.dash(),S.boing();break;case`shove`:e.by===Y&&Y>=0&&lv.shoves++,S.shove(),B_.squash(e.i),B_.popText(e.i,A(`oof`),`oof`,t);break;case`emo`:B_.emote(e.i,x_[e.e]??``),S.pop();break;case`start`:Q.results.classList.add(`hidden`),document.body.classList.remove(`inresults`),B_.chars.forEach(e=>e.launch=-1),nv=-1,X.ready=!1,X.nextAt=0,Object.assign(lv,{played:!1,paid:!1,passes:0,close:0,shoves:0}),Ov.hideReward(),Ov.open&&q!==`title`&&Ov.closeLocker(),q!==`title`&&(B_.setShot(`play`),Oy++,B_.setTheme(j_>=0?j_:(Oy+1)%2),Py(e.a??0,e.tw??0));break;case`go`:My=Math.min(My,.7),S.beep(!0),rv=.7,q!==`title`&&Y>=0&&J_?.gameplayStart(),q!==`title`&&Y>=0&&(lv.played=!0);break;case`end`:Fy(e.order)}}var My=0,Ny=``;function Py(e,t){B_.setArena(e,t),Ny=e+`:`+t,My=99,R_(`.ri`).innerHTML=Bm[e]??``,R_(`.rn`).textContent=A(`ar`+e),R_(`.rhint`).textContent=A(`ah`+e),R_(`.rtw`).classList.toggle(`hidden`,!t),Q.rule.classList.toggle(`twist`,!!t),t&&(R_(`.ti`).innerHTML=zm[t]??``,R_(`.tn`).textContent=A(`tw`+t),R_(`.rth`).textContent=A(`th`+t)),Q.rule.classList.remove(`hidden`,`out`),Q.rule.offsetWidth,Q.rule.classList.add(`in`),requestAnimationFrame(Cv)}function Fy(e){if(q===`title`)return;J_?.gameplayStop();let t=e[0],n=R_(`.win`);n.textContent=t===Y?A(`youWin`):A(`wins`,{n:q_[t]?.name??`?`}),n.classList.toggle(`me`,t===Y),R_(`.rest`).innerHTML=e.slice(3).map((e,t)=>{let n=q_[e];if(!n)return``;let r=`#`+n.color.toString(16).padStart(6,`0`);return`<span class="chip${e===Y?` me`:``}"><b>${t+4}</b><i style="background:${r}"></i>${n.name.replace(/[<>&]/g,``)}${e===Y?` `+A(`youParen`):``}</span>`}).join(``),Q.again.textContent=A(`playAgain`),Q.again.classList.remove(`on`),X.ready=!1,Z_.ready=!1;let r=q===`host`&&X_.size>0||q===`guest`;Q.next.classList.toggle(`hidden`,!r),Q.next.textContent=``,q===`host`&&X_.size&&(Z_.nextAt=performance.now()+C_,W_?.sendAll(`nx`,{ms:C_})),Q.results.classList.remove(`hidden`),document.body.classList.add(`inresults`),lv.order=e.slice(),B_.setShot(`podium`,e),lv.played&&!lv.paid&&Y>=0&&e.includes(Y)&&(lv.paid=!0,Ov.showReward(o_({place:e.indexOf(Y),passes:lv.passes,close:lv.close,shoves:lv.shoves}))),requestAnimationFrame(Cv),t===Y&&(S.win(),J_?.happyTime()),r&&setTimeout(()=>void he(),1500)}function Iy(e){if(J){for(let t of e)if(t.k===`pass`&&J.ps[t.a].ctrl===`bot`&&Math.random()<.18&&J.evs.push({k:`emo`,i:t.a,e:Math.random()<.5?0:2}),t.k===`pass`&&J.ps[t.b].ctrl===`bot`&&Math.random()<.12&&J.evs.push({k:`emo`,i:t.b,e:Math.random()<.5?1:3}),t.k===`boom`){let e=J.ps.filter(e=>e.alive&&e.ctrl===`bot`);e.length&&Math.random()<.5&&J.evs.push({k:`emo`,i:e[Math.floor(Math.random()*e.length)].id,e:Math.random()<.6?0:2})}}}var $={ps:[],holder:-1,fuse:0,holder2:-1,fuse2:0,sweep:0,phase:`count`,hz:0,arena:0,twist:0},Ly=0;function Ry(){let e=J;$.ps=e.ps.map(e=>({x:e.x,z:e.z,alive:e.alive,dash:e.dashT>0,knock:e.knock>0,stun:e.stun>0,fly:e.fly>0})),$.holder=e.holder,$.fuse=e.fuse,$.holder2=e.holder2,$.fuse2=e.fuse2,$.hz=e.hz,$.arena=e.arena,$.twist=e.twist,$.sweep=e.sweep,$.phase=e.phase,Ly=e.phaseT}function zy(e,t){let n=X.snap;if(!n)return;let r=Math.min(G_?.path===`broadcast`?.5:.2,(performance.now()-X.snapAt)/1e3);$.holder=n.h,$.fuse=Math.max(0,n.f/100-(n.ph===`play`?r:0)),$.holder2=n.h2??-1,$.fuse2=Math.max(0,(n.f2??0)/100-(n.ph===`play`?r:0)),$.hz=(n.hz??0)/100+(n.ph===`count`?0:r),$.arena=n.ar??0,$.twist=n.tw??0,$.arena+`:`+$.twist!==Ny&&(n.ph===`count`?Py($.arena,$.twist):(B_.setArena($.arena,$.twist),Ny=$.arena+`:`+$.twist)),$.sweep=n.sw/1e3+(n.ph===`count`?0:n.sv/1e3*r),$.phase=n.ph,Ly=n.pt/10-r;let i=[];n.p.forEach((a,o)=>{let s=a[0]/100+a[2]/100*r,c=a[1]/100+a[3]/100*r,l=$_[o];if(l||(l=$_[o]={x:s,z:c}),o===Y&&Q_.sim){let r=Q_.sim,i=r.ps[0];r.phase=n.ph,r.holder=n.h===Y||n.h2===Y?0:-1,r.arena=$.arena,r.twist=$.twist,r.pr=$.twist===4?hm*1.5:hm,r.hz=$.hz,r.sweep=$.sweep,r.sweepV=n.sv/1e3,i.alive=!!(a[4]&1),a[4]&8&&(i.stun=Math.max(i.stun,.1)),i.ix=t.x,i.iz=t.z,dv&&(i.dashReq=!0),r.move(i,e),r.evs.length=0;let o=s-i.x,u=c-i.z,d=Math.hypot(o,u),f=a[4]&4?14:4;d>3?(i.x=s,i.z=c):(i.x+=o*Math.min(1,f*e),i.z+=u*Math.min(1,f*e)),a[4]&4&&i.knock<=0&&(i.vx=a[2]/100,i.vz=a[3]/100,i.knock=.2),l.x=i.x,l.z=i.z}else if(Math.hypot(s-l.x,c-l.z)>3)l.x=s,l.z=c;else{let t=Math.min(1,18*e);l.x+=(s-l.x)*t,l.z+=(c-l.z)*t}i.push({x:l.x,z:l.z,alive:!!(a[4]&1),dash:!!(a[4]&2),knock:!!(a[4]&4),stun:!!(a[4]&8),fly:!!(a[4]&16)})}),$.ps=i}function By(e,t,n){let r=J;if(Y>=0){let e=r.ps[Y];e.ix=n.x,e.iz=n.z,dv&&(e.dashReq=!0)}if(q===`host`){for(let e of[...X_.values()])t-e.seen>T_&&gy(e.id);vy(t),Z.on&&t-Z.sentAt>3e3&&Qv()}ly()&&r.phase===`count`&&(r.phaseT=Math.max(r.phaseT,3));let i=r.phase,a=q===`title`?0:Math.max(1,Math.ceil(e/(1/90)));for(let t=0;t<a;t++)r.step(e/a);i===`end`&&r.phase!==`end`&&py(),r.phase===`count`&&r.outCount===0&&[...X_.values()].some(e=>e.slot<0)&&py();let o=r.evs.splice(0);return Iy(o),o.push(...r.evs.splice(0)),W_&&q===`host`&&(o.length&&W_.sendAll(`ev`,o),t-ev>33&&(ev=t,W_.sendAll(`s`,r.snap()))),o}var Vy=performance.now(),Hy=0,Uy=!1;function Wy(e){requestAnimationFrame(Wy),sv=performance.now();let t=Math.min(.05,(e-Vy)/1e3);Vy=e;let n=Dy>0?t*.3:t;Dy=Math.max(0,Dy-t),cv.frames++,e-cv.fpsT>1e3&&(cv.fps=Math.round(cv.frames*1e3/(e-cv.fpsT)),cv.frames=0,cv.fpsT=e);let r=yv();if(J){let t=By(n,e,r);Ry();for(let e of t)jy(e)}else q===`guest`&&(zy(n,r),dv&&Y>=0&&X.dashN++,G_&&X.joined&&Y>=0&&e-Hy>33&&(Hy=e,G_.send(`i`,{x:Math.round(r.x*100)/100,z:Math.round(r.z*100)/100,d:X.dashN,r:X.rtt})),X.joined&&X.snapAt&&e-X.snapAt>E_&&cy());dv=!1,Uy||(Uy=!0,B_.warm()),B_.frame($,n),Xy(n),Gy()}setInterval(()=>{if(q!==`host`||!J)return;let e=performance.now();if(e-sv<250)return;let t=Math.min(.1,(e-Vy)/1e3);Vy=e;let n=By(t,e,{x:0,z:0});Ry();for(let e of n)(e.k===`end`||e.k===`start`)&&jy(e)},100);function Gy(){if(q===`title`)return;if($.phase===`count`){let e=ly()?-1:Math.ceil(Ly);e!==nv&&e>0&&e<=3&&S.beep(!1),nv=e}if($.phase!==`play`||$.holder<0&&$.holder2<0){tv=-1;return}let e=Math.min($.holder>=0?$.fuse:99,$.holder2>=0?$.fuse2:99),t=Math.floor(e/(e<1.5?.1:e<3?.2:e<6?.4:.8));tv>=0&&t!==tv&&S.tick(e<3),tv=t}var Ky=R_(`.top`);function qy(){innerHeight>innerWidth?Q.banner.style.top=Math.round(Ky.getBoundingClientRect().bottom+8)+`px`:Q.banner.style.top=``}var Jy=-1,Yy=``;function Xy(e){let t=performance.now(),n=$.ps.filter(e=>e.alive).length,r=e=>$.holder===e||$.holder2===e,i=$.ps.map((e,t)=>+!!e.alive+(r(t)?2:0)).join(``)+q_.length+Y;i!==av&&(av=i,Q.plist.innerHTML=q_.map((e,t)=>{let n=$.ps[t],i=`#`+e.color.toString(16).padStart(6,`0`);return`<span class="pd${(n&&!n.alive?` out`:``)+(r(t)?` hot`:``)+(t===Y?` me`:``)}" style="--c:${i}">${e.name.charAt(0).replace(/[<>&]/g,``)}</span>`}).join(``),Q.lft.textContent=A(`leftN`,{n}));let a=$.holder2===Y?$.fuse2:$.holder===Y?$.fuse:99,o=Math.min($.holder>=0?$.fuse:99,$.holder2>=0?$.fuse2:99,a),s=$.phase===`play`&&o<3&&q!==`title`;if(C.tense=s,s){let e=o<1.5?14:8,n=r(Y)?.85:.5;Q.edge.style.opacity=String(n*(.45+.55*Math.abs(Math.sin(t/1e3*e*.5))))}else Q.edge.style.opacity=`0`;if(q===`guest`&&G_)Q.net.textContent=(G_.path===`rtc`?A(`direct`):G_.path===`broadcast`?A(`server`):`…`)+` · `+X.rtt+` ms`;else if(q===`host`&&W_){let e=[...X_.values()];Q.net.textContent=e.length?e.map(e=>(W_.pathOf(e.id)===`rtc`?`●`:`○`)+` `+e.rtt+` ms`).join(`  `):A(`waiting`)}else Q.net.textContent=``;let c=``;q===`host`&&Z.on?c=A(`onlineN`,{n:Z.online||1})+` · `+A(`inRoomN`,{n:1+X_.size}):q===`guest`&&X.joined&&X.pub&&X.humans&&(c=A(`onlineN`,{n:Math.max(Z.online,X.humans)})+` · `+A(`inRoomN`,{n:X.humans})),Q.onl.textContent!==c&&(Q.onl.textContent=c);let l=$.phase;rv=Math.max(0,rv-e);let u=``;ly()?u=``:l===`count`&&q!==`title`?u=String(Math.max(1,Math.ceil(Ly))):rv>0&&q!==`title`&&(u=`GO!`),u!==ov&&(ov=u,Q.count.className=`count`+(u?` c`+(u===`GO!`?`go`:u):` hidden`),Q.count.textContent=u),My<90&&(My-=e);let d=q!==`title`&&!ly()&&(l===`count`||My>0)&&!document.body.classList.contains(`inresults`);d!==!Q.rule.classList.contains(`hidden`)&&Q.rule.classList.toggle(`hidden`,!d);let f=$.ps[Y];iv=Math.max(0,iv-e);let p=`banner hidden`,m=``;if(q!==`title`&&f&&l===`play`&&r(Y)?(p=`banner hot`,m=A(`haveBomb`)):q!==`title`&&f&&!f.alive&&l!==`end`?(p=`banner ghost`,m=A(`ghost`)):q===`guest`&&X.joined&&Y<0&&l!==`end`&&(p=`banner ghost`,m=A(`spectate`)),p+m!==Yy&&(Yy=p+m,Q.banner.className=p,Q.banner.textContent=m,Sv(Q.banner)),m&&qy(),!Q.next.classList.contains(`hidden`)){let e=q===`host`?Z_.nextAt:X.nextAt,n=e?Math.max(0,Math.ceil((e-t)/1e3)):-1;n!==Jy&&(Jy=n,Q.next.textContent=n>=0?A(`nextRound`,{n}):``)}let h=J&&Y>=0?J.ps[Y]:Q_.sim?.ps[0],g=h?h.dashCd/1.3:0;Q.dash.style.setProperty(`--cd`,String(Math.max(0,Math.min(1,g)))),Q.dash.classList.toggle(`ready`,g<=0),jv>0&&(jv-=e,jv<=0&&Q.toast.classList.add(`hidden`));let _=window;_.__hb={mode:q,slot:Y,room:K_,pub:Z.on,sent:W_?W_.out.n:G_?.out.n??0,sb:{...Ne},relayed:W_?W_.relayed():0,quick:{ms:Z.ms,how:Z.how,online:Z.online,humans:q===`host`?1+X_.size:X.humans,shard:W_?.shard??-1},path:q===`guest`?G_?.path:void 0,route:G_?.route,connectMs:G_?.connectMs,joinMs:X.joinMs,rtt:q===`guest`?X.rtt:[...X_.values()].map(e=>e.rtt),guests:[...X_.values()].map(e=>({name:e.name,slot:e.slot,path:W_?.pathOf(e.id),rtt:e.rtt})),holder:$.holder,fuse:$.fuse,holder2:$.holder2,arena:$.arena,twist:$.twist,hz:$.hz,calls:B_.renderer.info.render.calls,tris:B_.renderer.info.render.triangles,phase:$.phase,ps:$.ps,names:q_.map(e=>e.name),passes:cv.passes,booms:cv.booms,fps:cv.fps,joined:X.joined,lang:document.documentElement.lang,ad:de()}}addEventListener(`resize`,()=>{B_.resize(),_v(),requestAnimationFrame(Cv)}),_v(),document.fonts?.ready.then(()=>Cv()),window.__hbAudio=y,window.__hbText={t:A,fitAll:Cv,fit:Sv,placeBanner:qy,showRule:Py},window.__hbMeta={meta:Ov,P:Kg,roundReward:o_,view:B_},addEventListener(`pagehide`,()=>{q===`host`&&W_&&X_.size&&W_.sendAll(`gone`,{}),q===`guest`&&G_&&G_.send(`bye`,{})}),fe(e=>{q===`guest`&&G_?.send(`ad`,{on:+!!e})}),A_?yy(A_):Rv(),requestAnimationFrame(Wy);{let e=(e,t)=>{let n=window;setTimeout(()=>n.requestIdleCallback?n.requestIdleCallback(e,{timeout:2e3}):e(),t)};[1,2,3].forEach((t,n)=>e(()=>B_.prepare(t),1500+n*1200))}(async()=>{try{J_=await l({...pe,onMuteChange:e=>{m.portal=e,Av()}}),await Promise.race([J_.init(),new Promise(e=>setTimeout(e,3e3))])}catch{J_=null}ue(J_);try{Y_=J_?.rooms}catch{Y_=void 0}Ce(Se(J_?.getLanguage())),Tv(),await qg(J_),Dv(),Ov.drawWallet(),q===`title`&&!A_&&!O_.has(`autoplay`)&&!O_.has(`nodaily`)&&Ov.autoDaily();try{let e=await Promise.race([J_?.playerName?.()??Promise.resolve(null),new Promise(e=>setTimeout(()=>e(null),2500))]);e&&Vv(U_(e))}catch{}Y_?.onJoin(e=>{e.room&&by(e.room)});let e=Y_?.inviteParam(`room`);q===`title`&&(e?by(e):J_?.instantMultiplayer?.()||O_.has(`instant`)||O_.has(`hostroom`)?(Bv(),uy()):O_.has(`autoplay`)&&Bv()),J_?.loadingFinished(!1)})();export{t as n,e as t};