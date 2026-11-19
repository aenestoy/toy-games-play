(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1/60,t={speed:12,turnRate:10,worldHalfSize:300},n={fovDeg:45,follow:8,walkDistance:18,walkPitchDeg:58,driveDistance:27,drivePitchDeg:62,speedZoom:.9,maxSpeedZoom:13,speedPitchDeg:8,lookAhead:.45,maxLookAhead:11,zoomEase:2.5,shakePerImpact:.06,maxShake:1.6,shakeDecay:5},r={radius:.42,runSpeed:6.5,accel:40,turnRate:12,slideFriction:9,knockTime:1.6,getUpTime:.45,hitSpeed:3,hitDamagePerMs:2.5,punchReach:1.55,punchCone:1,punchCooldown:.45,punchTime:.25,punchDamage:12,punchPush:5,enterReach:2.2,enterMaxSpeed:3,exitMaxSpeed:6,pullOutTime:.5,respawnTime:3},i={"game.name":`Rickshaw Rush`,"city.name":`Nagarpur`,"title.loading":`Loading…`,"title.tapToPlay":`Tap to play`,"title.play":`PLAY`,"title.tagline":`Honk. Drive. Escape. Welcome to Nagarpur!`,"debug.fps":`FPS`,"debug.calls":`draw calls`,"debug.tris":`triangles`,"debug.entities":`entities`,"hud.speed":`km/h`,"hud.distance":`{m} m`,"hud.pause":`Pause`,"hud.map":`Map`,"hint.getIn":`{key} — get in`,"hint.takeOver":`{key} — take this ride`,"hint.getOut":`{key} — get out`,"tip.getIn":`Walk up to a vehicle and get in.`,"tip.getInTouch":`Walk to a vehicle, then tap IN.`,"tip.drive":`W to drive, A/D to steer, Space to drift, H to honk!`,"tip.driveTouch":`Hold GAS to drive, steer with the stick. Honk a lot!`,"tip.job":`Find a job: open the map ({key}) and look for markers.`,"tip.jobTouch":`Find a job: tap the map and look for markers.`,"pause.title":`Paused`,"pause.resume":`Resume`,"pause.settings":`Settings`,"pause.controls":`Controls`,"pause.map":`Map`,"pause.back":`Back`,"pause.help":`Quick help`,"settings.sound":`Sound`,"settings.music":`Music & city`,"settings.quality":`Quality`,"quality.auto":`Auto`,"quality.low":`Low`,"quality.medium":`Medium`,"quality.high":`High`,"controls.move":`Walk / drive`,"controls.moveKeys":`WASD or arrows`,"controls.use":`Get in / out`,"controls.punch":`Punch`,"controls.handbrake":`Handbrake (drift)`,"controls.horn":`Horn`,"controls.map":`Map`,"controls.pause":`Pause`,"controls.touch":`Phone: stick on the left, buttons on the right.`,"map.title":`Nagarpur`,"map.close":`Close`,"map.you":`You`,"map.objective":`Objective`,"end.wasted":`WASTED`,"end.busted":`BUSTED`,"end.wastedSub":`You wake up at the hospital.`,"end.bustedSub":`The police took you to the station.`,"end.continue":`Continue`,"end.revive":`Revive here`,"reward.ad":`Ad`,"reward.clearStars":`Lose the police`,"reward.repairCar":`Repair vehicle`,"reward.doubleMoney":`Double the pay`,"reward.failed":`No ad right now. Try again later.`,"touch.gas":`GAS`,"touch.brake":`BRAKE`,"touch.drift":`DRIFT`,"touch.horn":`HORN`,"touch.in":`IN`,"touch.out":`OUT`,"touch.punch":`PUNCH`},a={en:i},o=i;function s(e){o=a[e]??i}function c(e,t){let n=o[e]??i[e];return t?n.replace(/\{(\w+)\}/g,(e,n)=>n in t?String(t[n]):e):n}function l(){return{moveX:0,moveY:0,throttle:0,brake:0,handbrake:!1,use:!1,horn:!1,action:!1,pause:!1}}var u;function d(e,t,n){Math.hypot(t,n)>Math.hypot(e.moveX,e.moveY)&&(e.moveX=t,e.moveY=n)}var f=class{constructor(e=window){this.down=new Set,this.tapped=new Set,this.onDown=e=>{e.repeat||(this.down.add(e.code),this.tapped.add(e.code),(e.code.startsWith(`Arrow`)||e.code===`Space`)&&e.preventDefault())},this.onUp=e=>{this.down.delete(e.code)},this.onBlur=()=>this.release(),this.target=e,e.addEventListener(`keydown`,this.onDown),e.addEventListener(`keyup`,this.onUp),e.addEventListener(`blur`,this.onBlur)}release(){this.down.clear(),this.tapped.clear()}any(...e){for(let t of e)if(this.down.has(t)||this.tapped.has(t))return!0;return!1}poll(e){let t=+!!this.any(`KeyD`,`ArrowRight`)-!!this.any(`KeyA`,`ArrowLeft`),n=+!!this.any(`KeyW`,`ArrowUp`)-!!this.any(`KeyS`,`ArrowDown`);d(e,t,n),n>0&&(e.throttle=Math.max(e.throttle,1)),n<0&&(e.brake=Math.max(e.brake,1)),e.handbrake||(e.handbrake=this.any(`Space`)),e.use||(e.use=this.any(`KeyE`)),e.horn||(e.horn=this.any(`KeyH`)),e.action||(e.action=this.any(`KeyF`)),e.pause||(e.pause=this.any(`Escape`,`KeyP`)),this.tapped.clear()}dispose(){this.target.removeEventListener(`keydown`,this.onDown),this.target.removeEventListener(`keyup`,this.onUp),this.target.removeEventListener(`blur`,this.onBlur)}},p=class e{poll(t){if(!(typeof navigator>`u`||!navigator.getGamepads))for(let n of navigator.getGamepads()){if(!n||!n.connected)continue;d(t,m(n.axes[0]??0,e.DEAD),-m(n.axes[1]??0,e.DEAD));let r=e=>n.buttons[e]?.value??0;t.throttle=Math.max(t.throttle,r(7)),t.brake=Math.max(t.brake,r(6)),t.handbrake||(t.handbrake=r(0)>.5),t.action||(t.action=r(1)>.5),t.use||(t.use=r(3)>.5),t.horn||(t.horn=r(10)>.5),t.pause||(t.pause=r(9)>.5)}}dispose(){}};u=p,u.DEAD=.18;function m(e,t){let n=Math.abs(e);return n<t?0:Math.sign(e)*(n-t)/(1-t)}var h=class{constructor(){this.stickX=0,this.stickY=0,this.buttons=new Set,this.gas=0,this.brakePedal=0,this.tapped=new Set}setStick(e,t){this.stickX=e,this.stickY=t}setPedals(e,t){this.gas=e,this.brakePedal=t}setButton(e,t){t?(this.buttons.add(e),this.tapped.add(e)):this.buttons.delete(e)}release(){this.stickX=this.stickY=0,this.gas=this.brakePedal=0,this.buttons.clear(),this.tapped.clear()}poll(e){d(e,this.stickX,this.stickY),this.stickY>0&&(e.throttle=Math.max(e.throttle,this.stickY)),this.stickY<0&&(e.brake=Math.max(e.brake,-this.stickY)),e.throttle=Math.max(e.throttle,this.gas),e.brake=Math.max(e.brake,this.brakePedal);for(let t of this.buttons)e[t]=!0;for(let t of this.tapped)e[t]=!0;this.tapped.clear()}dispose(){this.release()}},g=class{constructor(){this.keyboard=new f,this.gamepad=new p,this.touch=new h,this.sources=[this.keyboard,this.gamepad,this.touch],this.current=l()}read(){let e=this.current;e.moveX=e.moveY=e.throttle=e.brake=0,e.handbrake=e.use=e.horn=e.action=e.pause=!1;for(let t of this.sources)t.poll(e);return e}releaseAll(){this.keyboard.release(),this.touch.release()}dispose(){for(let e of this.sources)e.dispose()}},_=class{constructor(e={},t=1500){this.name=`local`,this.playing=!1,this.hooks=e,this.adDurationMs=t}async init(){console.info(`[portal:local] init`)}loadingFinished(){console.info(`[portal:local] loadingFinished`)}gameplayStart(){console.info(`[portal:local] gameplayStart`),this.reportPlay(!0)}gameplayStop(){console.info(`[portal:local] gameplayStop`),this.reportPlay(!1)}reportPlay(e){if(e!==this.playing){this.playing=e;try{this.hooks.onPlayChange?.(e)}catch(e){console.warn(`[portal:local] play listener failed`,e)}}}happyTime(){console.info(`[portal:local] happyTime`)}async showInterstitial(){await this.fakeAd(`INTERSTITIAL AD (simulated)`)}async showRewarded(){return await this.fakeAd(`REWARDED AD (simulated)`),!0}async save(e,t){try{localStorage.setItem(this.k(e),JSON.stringify(t))}catch{}}async load(e){try{let t=localStorage.getItem(this.k(e));return t===null?void 0:JSON.parse(t)}catch{return}}getLanguage(){return(navigator.language||`en`).slice(0,2).toLowerCase()||`en`}k(e){return`game:${e}`}fakeAd(e){this.hooks.onAdStart?.();let t=document.createElement(`div`);return t.textContent=e,Object.assign(t.style,{position:`fixed`,inset:`0`,display:`flex`,alignItems:`center`,justifyContent:`center`,background:`rgba(0,0,0,0.85)`,color:`#fff`,font:`600 24px system-ui, sans-serif`,zIndex:`9999`}),document.body.appendChild(t),new Promise(e=>{setTimeout(()=>{t.remove(),this.hooks.onAdEnd?.(),e()},this.adDurationMs)})}};function v(e,t=8e3){return new Promise((n,r)=>{if(document.querySelector(`script[src="${e}"]`))return n();let i=document.createElement(`script`);i.src=e,i.async=!0;let a=setTimeout(()=>r(Error(`script timeout: ${e}`)),t);i.onload=()=>{clearTimeout(a),n()},i.onerror=()=>{clearTimeout(a),r(Error(`script failed: ${e}`))},document.head.appendChild(i)})}var y=`modulepreload`,b=function(e,t){return new URL(e,t).href},x={},S=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=b(t,n),t=s(t),t in x)return;x[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:y,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},C=[`/sdk.js`,`https://sdk.games.s3.yandex.net/sdk.js`];function w(){let e=new URLSearchParams(location.search).get(`portal`);if(e===`crazygames`||e===`poki`||e===`yandex`||e===`local`)return e;let t=[location.hostname,T(document.referrer)].join(` `);return/crazygames\.com|1001juegos\.com|crazygames\.[a-z.]+/.test(t)?`crazygames`:/poki\.com|poki-gdn\.com/.test(t)?`poki`:/yandex\.(ru|net|com)|games\.s3\.yandex/.test(t)?`yandex`:`local`}function T(e){try{return e?new URL(e).hostname:``}catch{return``}}async function E(e={},t=w(),n={}){switch(t){case`crazygames`:{let{CrazyGamesPortal:t}=await S(async()=>{let{CrazyGamesPortal:e}=await import(`./crazygames-Y9LD6-_L.js`);return{CrazyGamesPortal:e}},[],import.meta.url);return new t(e)}case`poki`:{let{PokiPortal:t}=await S(async()=>{let{PokiPortal:e}=await import(`./poki-BhkdvMjz.js`);return{PokiPortal:e}},[],import.meta.url);return new t(e)}case`yandex`:{let{YandexPortal:t}=await S(async()=>{let{YandexPortal:e}=await import(`./yandex-CxgnoclT.js`);return{YandexPortal:e}},[],import.meta.url);return new t(e,C)}default:return new _(e)}}var D=4e3,O=120,k=180,A=class{constructor(){this.portal=new _({}),this.adOn=!1,this.portalMute=!1,this.listeners=new Set,this.playing=!1,this.startedAt=j(),this.lastAdAt=-1/0}get paused(){return this.adOn||typeof document<`u`&&document.hidden}get adShowing(){return this.adOn}get muted(){return this.portalMute}onChange(e){this.listeners.add(e)}notify(){for(let e of this.listeners)try{e()}catch(e){console.warn(`[platform] listener failed`,e)}}async init(){try{let e=await E({onAdStart:()=>{this.adOn=!0,this.notify()},onAdEnd:()=>{this.adOn=!1,this.notify()},onMuteChange:e=>{this.portalMute=e,this.notify()}}),t=e.init().then(()=>!0,()=>!1),n=new Promise(e=>setTimeout(()=>e(!1),D));await Promise.race([t,n])&&(this.portal=e)}catch{this.portal=new _({})}document.addEventListener(`visibilitychange`,()=>this.notify())}loadingFinished(){this.safe(()=>this.portal.loadingFinished(!1))}setPlaying(e){e!==this.playing&&(this.playing=e,this.safe(()=>e?this.portal.gameplayStart():this.portal.gameplayStop()))}get isPlaying(){return this.playing}happyTime(){this.safe(()=>this.portal.happyTime())}async showMidgame(e){let t=j();if(t-this.startedAt<O||t-this.lastAdAt<k)return!1;this.lastAdAt=t,this.setPlaying(!1);try{await this.portal.showInterstitial()}catch(t){console.warn(`[platform] midgame failed`,e,t)}return this.endAd(),!0}rewardedAvailable(){try{return!this.portal.rewardedAvailable||this.portal.rewardedAvailable()}catch{return!1}}async showRewarded(e){if(!this.rewardedAvailable())return!1;this.setPlaying(!1),this.lastAdAt=j();let t=!1;try{t=await this.portal.showRewarded()===!0}catch(t){console.warn(`[platform] rewarded failed`,e,t)}return this.endAd(),t}endAd(){this.adOn&&(this.adOn=!1,this.notify())}language(){try{return this.portal.getLanguage()}catch{return`en`}}safe(e){try{e()}catch(e){console.warn(`[platform] portal call failed`,e)}}};function j(){return(typeof performance<`u`?performance.now():0)/1e3}var M=new A,N=new URLSearchParams(typeof location<`u`?location.search:``),ee={debug:N.get(`debug`)===`1`,touch:(e=>N.has(e)?N.get(e)!==`0`:void 0)(`touch`)},te,ne,re,ie,ae,oe,se,ce,le,ue=1e3,de=1001,fe=1002,pe=1003,me=1004,he=1005,ge=1006,_e=1007,ve=1008,ye=1009,be=1010,xe=1011,Se=1012,Ce=1013,we=1014,Te=1015,Ee=1016,De=1017,Oe=1018,ke=1020,Ae=35902,je=35899,P=1021,Me=1022,Ne=1023,Pe=1026,F=1027,Fe=1028,Ie=1029,I=1030,Le=1031,Re=1033,L=33776,ze=33777,Be=33778,Ve=33779,He=35840,Ue=35841,We=35842,Ge=35843,Ke=36196,qe=37492,Je=37496,Ye=37488,Xe=37489,Ze=37490,Qe=37491,$e=37808,et=37809,tt=37810,nt=37811,rt=37812,it=37813,at=37814,ot=37815,st=37816,ct=37817,lt=37818,ut=37819,dt=37820,ft=37821,pt=36492,mt=36494,ht=36495,gt=36283,_t=36284,vt=36285,yt=36286,bt=2300,xt=2301,St=2302,Ct=2303,wt=2400,Tt=2401,Et=2402,Dt=3200,Ot=`srgb`,kt=`srgb-linear`,At=`linear`,jt=`srgb`,Mt=7680,Nt=35044,Pt=35048,Ft=2e3;function It(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Lt(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Rt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function zt(){let e=Rt(`canvas`);return e.style.display=`block`,e}var Bt={};function Vt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Ht(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function R(...e){e=Ht(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function z(...e){e=Ht(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Ut(...e){let t=e.join(` `);t in Bt||(Bt[t]=!0,R(...e))}function Wt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Gt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Kt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},qt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Jt=Math.PI/180,Yt=180/Math.PI;function Xt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(qt[e&255]+qt[e>>8&255]+qt[e>>16&255]+qt[e>>24&255]+`-`+qt[t&255]+qt[t>>8&255]+`-`+qt[t>>16&15|64]+qt[t>>24&255]+`-`+qt[n&63|128]+qt[n>>8&255]+`-`+qt[n>>16&255]+qt[n>>24&255]+qt[r&255]+qt[r>>8&255]+qt[r>>16&255]+qt[r>>24&255]).toLowerCase()}function B(e,t,n){return Math.max(t,Math.min(n,e))}function Zt(e,t){return(e%t+t)%t}function Qt(e,t,n){return(1-n)*e+n*t}function $t(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function en(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}se=Symbol.iterator;var V=class{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=B(this.x,e.x,t.x),this.y=B(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=B(this.x,e,t),this.y=B(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(B(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(B(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[se](){yield this.x,yield this.y}};te=V,te.prototype.isVector2=!0;var tn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:R(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(B(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};ce=Symbol.iterator;var H=class{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(rn.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(rn.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=B(this.x,e.x,t.x),this.y=B(this.y,e.y,t.y),this.z=B(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=B(this.x,e,t),this.y=B(this.y,e,t),this.z=B(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(B(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return nn.copy(this).projectOnVector(e),this.sub(nn)}reflect(e){return this.sub(nn.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(B(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[ce](){yield this.x,yield this.y,yield this.z}};ne=H,ne.prototype.isVector3=!0;var nn=new H,rn=new tn,U=class{constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Ut(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(an.makeScale(e,t)),this}rotate(e){return Ut(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(an.makeRotation(-e)),this}translate(e,t){return Ut(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(an.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};re=U,re.prototype.isMatrix3=!0;var an=new U,on=new U().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),sn=new U().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function cn(){let e={enabled:!0,workingColorSpace:kt,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=ln(e.r),e.g=ln(e.g),e.b=ln(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=un(e.r),e.g=un(e.g),e.b=un(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?At:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Ut(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Ut(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[kt]:{primaries:t,whitePoint:r,transfer:At,toXYZ:on,fromXYZ:sn,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ot},outputColorSpaceConfig:{drawingBufferColorSpace:Ot}},[Ot]:{primaries:t,whitePoint:r,transfer:jt,toXYZ:on,fromXYZ:sn,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ot}}}),e}var W=cn();function ln(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function un(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var dn,fn=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{dn===void 0&&(dn=Rt(`canvas`)),dn.width=e.width,dn.height=e.height;let t=dn.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=dn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Rt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=ln(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(ln(t[e]/255)*255):t[e]=ln(t[e]);return{data:t,width:e.width,height:e.height}}return R(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},pn=0,mn=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:pn++}),this.uuid=Xt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(hn(r[t].image)):e.push(hn(r[t]))}else e=hn(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function hn(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?fn.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(R(`Texture: Unable to serialize Texture.`),{})}var gn=0,_n=new H,vn=class e extends Kt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=de,i=de,a=ge,o=ve,s=Ne,c=ye,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gn++}),this.uuid=Xt(),this.name=``,this.source=new mn(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new V(0,0),this.repeat=new V(1,1),this.center=new V(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new U,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(_n).x}get height(){return this.source.getSize(_n).y}get depth(){return this.source.getSize(_n).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){R(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){R(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ue:e.x-=Math.floor(e.x);break;case de:e.x=e.x<0?0:1;break;case fe:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case ue:e.y-=Math.floor(e.y);break;case de:e.y=e.y<0?0:1;break;case fe:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};vn.DEFAULT_IMAGE=null,vn.DEFAULT_MAPPING=300,vn.DEFAULT_ANISOTROPY=1,le=Symbol.iterator;var yn=class{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=B(this.x,e.x,t.x),this.y=B(this.y,e.y,t.y),this.z=B(this.z,e.z,t.z),this.w=B(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=B(this.x,e,t),this.y=B(this.y,e,t),this.z=B(this.z,e,t),this.w=B(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(B(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[le](){yield this.x,yield this.y,yield this.z,yield this.w}};ie=yn,ie.prototype.isVector4=!0;var bn=class extends Kt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ge,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new yn(0,0,e,t),this.scissorTest=!1,this.viewport=new yn(0,0,e,t),this.textures=[];let r=new vn({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:ge,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new mn(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},xn=class extends bn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Sn=class extends vn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=pe,this.minFilter=pe,this.wrapR=de,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Cn=class extends vn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=pe,this.minFilter=pe,this.wrapR=de,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},wn=class e{constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Tn.setFromMatrixColumn(e,0).length(),i=1/Tn.setFromMatrixColumn(e,1).length(),a=1/Tn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Dn,e,On)}lookAt(e,t,n){let r=this.elements;return jn.subVectors(e,t),jn.lengthSq()===0&&(jn.z=1),jn.normalize(),kn.crossVectors(n,jn),kn.lengthSq()===0&&(Math.abs(n.z)===1?jn.x+=1e-4:jn.z+=1e-4,jn.normalize(),kn.crossVectors(n,jn)),kn.normalize(),An.crossVectors(jn,kn),r[0]=kn.x,r[4]=An.x,r[8]=jn.x,r[1]=kn.y,r[5]=An.y,r[9]=jn.y,r[2]=kn.z,r[6]=An.z,r[10]=jn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],ee=r[7],te=r[11],ne=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*ee,i[8]=a*C+o*D+s*j+c*te,i[12]=a*w+o*O+s*M+c*ne,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*ee,i[9]=l*C+u*D+d*j+f*te,i[13]=l*w+u*O+d*M+f*ne,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*ee,i[10]=p*C+m*D+h*j+g*te,i[14]=p*w+m*O+h*M+g*ne,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*ee,i[11]=_*C+v*D+y*j+b*te,i[15]=_*w+v*O+y*M+b*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Tn.set(r[0],r[1],r[2]).length(),o=Tn.set(r[4],r[5],r[6]).length(),s=Tn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),En.copy(this);let c=1/a,l=1/o,u=1/s;return En.elements[0]*=c,En.elements[1]*=c,En.elements[2]*=c,En.elements[4]*=l,En.elements[5]*=l,En.elements[6]*=l,En.elements[8]*=u,En.elements[9]*=u,En.elements[10]*=u,t.setFromRotationMatrix(En),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Ft,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Ft,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};ae=wn,ae.prototype.isMatrix4=!0;var Tn=new H,En=new wn,Dn=new H(0,0,0),On=new H(1,1,1),kn=new H,An=new H,jn=new H,Mn=new wn,Nn=new tn,Pn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(B(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-B(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(B(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-B(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(B(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-B(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:R(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Mn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Nn.setFromEuler(this),this.setFromQuaternion(Nn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Pn.DEFAULT_ORDER=`XYZ`;var Fn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},In=0,Ln=new H,Rn=new tn,zn=new wn,Bn=new H,Vn=new H,Hn=new H,Un=new tn,Wn=new H(1,0,0),Gn=new H(0,1,0),Kn=new H(0,0,1),qn={type:`added`},Jn={type:`removed`},Yn={type:`childadded`,child:null},Xn={type:`childremoved`,child:null},Zn=class e extends Kt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:In++}),this.uuid=Xt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new H,n=new Pn,r=new tn,i=new H(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new wn},normalMatrix:{value:new U}}),this.matrix=new wn,this.matrixWorld=new wn,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Rn.setFromAxisAngle(e,t),this.quaternion.multiply(Rn),this}rotateOnWorldAxis(e,t){return Rn.setFromAxisAngle(e,t),this.quaternion.premultiply(Rn),this}rotateX(e){return this.rotateOnAxis(Wn,e)}rotateY(e){return this.rotateOnAxis(Gn,e)}rotateZ(e){return this.rotateOnAxis(Kn,e)}translateOnAxis(e,t){return Ln.copy(e).applyQuaternion(this.quaternion),this.position.add(Ln.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wn,e)}translateY(e){return this.translateOnAxis(Gn,e)}translateZ(e){return this.translateOnAxis(Kn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Bn.copy(e):Bn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Vn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zn.lookAt(Vn,Bn,this.up):zn.lookAt(Bn,Vn,this.up),this.quaternion.setFromRotationMatrix(zn),r&&(zn.extractRotation(r.matrixWorld),Rn.setFromRotationMatrix(zn),this.quaternion.premultiply(Rn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(z(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(qn),Yn.child=e,this.dispatchEvent(Yn),Yn.child=null):z(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Jn),Xn.child=e,this.dispatchEvent(Xn),Xn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(qn),Yn.child=e,this.dispatchEvent(Yn),Yn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vn,e,Hn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vn,Un,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Zn.DEFAULT_UP=new H(0,1,0),Zn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Qn=class extends Zn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},$n={type:`move`},er=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($n)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Qn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},tr={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},nr={h:0,s:0,l:0},rr={h:0,s:0,l:0};function ir(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var G=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,W.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=W.workingColorSpace){return this.r=e,this.g=t,this.b=n,W.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=W.workingColorSpace){if(e=Zt(e,1),t=B(t,0,1),n=B(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=ir(i,r,e+1/3),this.g=ir(i,r,e),this.b=ir(i,r,e-1/3)}return W.colorSpaceToWorking(this,r),this}setStyle(e,t=Ot){function n(t){t!==void 0&&parseFloat(t)<1&&R(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:R(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);R(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ot){let n=tr[e.toLowerCase()];return n===void 0?R(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ln(e.r),this.g=ln(e.g),this.b=ln(e.b),this}copyLinearToSRGB(e){return this.r=un(e.r),this.g=un(e.g),this.b=un(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ot){return W.workingToColorSpace(ar.copy(this),e),Math.round(B(ar.r*255,0,255))*65536+Math.round(B(ar.g*255,0,255))*256+Math.round(B(ar.b*255,0,255))}getHexString(e=Ot){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=W.workingColorSpace){W.workingToColorSpace(ar.copy(this),t);let n=ar.r,r=ar.g,i=ar.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=W.workingColorSpace){return W.workingToColorSpace(ar.copy(this),t),e.r=ar.r,e.g=ar.g,e.b=ar.b,e}getStyle(e=Ot){W.workingToColorSpace(ar.copy(this),e);let t=ar.r,n=ar.g,r=ar.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(nr),this.setHSL(nr.h+e,nr.s+t,nr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(nr),e.getHSL(rr);let n=Qt(nr.h,rr.h,t),r=Qt(nr.s,rr.s,t),i=Qt(nr.l,rr.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ar=new G;G.NAMES=tr;var or=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new G(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},sr=class extends Zn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pn,this.environmentIntensity=1,this.environmentRotation=new Pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},cr=new H,lr=new H,ur=new H,dr=new H,fr=new H,pr=new H,mr=new H,hr=new H,gr=new H,_r=new H,vr=new yn,yr=new yn,br=new yn,xr=class e{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),cr.subVectors(e,t),r.cross(cr);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){cr.subVectors(r,t),lr.subVectors(n,t),ur.subVectors(e,t);let a=cr.dot(cr),o=cr.dot(lr),s=cr.dot(ur),c=lr.dot(lr),l=lr.dot(ur),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,dr)!==null&&dr.x>=0&&dr.y>=0&&dr.x+dr.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,dr)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,dr.x),s.addScaledVector(a,dr.y),s.addScaledVector(o,dr.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return vr.setScalar(0),yr.setScalar(0),br.setScalar(0),vr.fromBufferAttribute(e,t),yr.fromBufferAttribute(e,n),br.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(vr,i.x),a.addScaledVector(yr,i.y),a.addScaledVector(br,i.z),a}static isFrontFacing(e,t,n,r){return cr.subVectors(n,t),lr.subVectors(e,t),cr.cross(lr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return cr.subVectors(this.c,this.b),lr.subVectors(this.a,this.b),cr.cross(lr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;fr.subVectors(r,n),pr.subVectors(i,n),hr.subVectors(e,n);let s=fr.dot(hr),c=pr.dot(hr);if(s<=0&&c<=0)return t.copy(n);gr.subVectors(e,r);let l=fr.dot(gr),u=pr.dot(gr);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(fr,a);_r.subVectors(e,i);let f=fr.dot(_r),p=pr.dot(_r);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(pr,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return mr.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(mr,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(fr,a).addScaledVector(pr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Sr=class{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(wr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(wr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=wr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,wr):wr.fromBufferAttribute(r,t),wr.applyMatrix4(e.matrixWorld),this.expandByPoint(wr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Tr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Tr.copy(e.boundingBox)),Tr.applyMatrix4(e.matrixWorld),this.union(Tr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,wr),wr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Mr),Nr.subVectors(this.max,Mr),Er.subVectors(e.a,Mr),Dr.subVectors(e.b,Mr),Or.subVectors(e.c,Mr),kr.subVectors(Dr,Er),Ar.subVectors(Or,Dr),jr.subVectors(Er,Or);let t=[0,-kr.z,kr.y,0,-Ar.z,Ar.y,0,-jr.z,jr.y,kr.z,0,-kr.x,Ar.z,0,-Ar.x,jr.z,0,-jr.x,-kr.y,kr.x,0,-Ar.y,Ar.x,0,-jr.y,jr.x,0];return!Ir(t,Er,Dr,Or,Nr)||(t=[1,0,0,0,1,0,0,0,1],!Ir(t,Er,Dr,Or,Nr))?!1:(Pr.crossVectors(kr,Ar),t=[Pr.x,Pr.y,Pr.z],Ir(t,Er,Dr,Or,Nr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Cr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Cr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Cr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Cr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Cr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Cr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Cr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Cr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Cr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Cr=[new H,new H,new H,new H,new H,new H,new H,new H],wr=new H,Tr=new Sr,Er=new H,Dr=new H,Or=new H,kr=new H,Ar=new H,jr=new H,Mr=new H,Nr=new H,Pr=new H,Fr=new H;function Ir(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Fr.fromArray(e,a);let o=i.x*Math.abs(Fr.x)+i.y*Math.abs(Fr.y)+i.z*Math.abs(Fr.z),s=t.dot(Fr),c=n.dot(Fr),l=r.dot(Fr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Lr=new H,Rr=new V,zr=0,Br=class extends Kt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:zr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Nt,this.updateRanges=[],this.gpuType=Te,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Rr.fromBufferAttribute(this,t),Rr.applyMatrix3(e),this.setXY(t,Rr.x,Rr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Lr.fromBufferAttribute(this,t),Lr.applyMatrix3(e),this.setXYZ(t,Lr.x,Lr.y,Lr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Lr.fromBufferAttribute(this,t),Lr.applyMatrix4(e),this.setXYZ(t,Lr.x,Lr.y,Lr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lr.fromBufferAttribute(this,t),Lr.applyNormalMatrix(e),this.setXYZ(t,Lr.x,Lr.y,Lr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lr.fromBufferAttribute(this,t),Lr.transformDirection(e),this.setXYZ(t,Lr.x,Lr.y,Lr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=$t(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=en(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=$t(t,this.array)),t}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=$t(t,this.array)),t}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=$t(t,this.array)),t}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=$t(t,this.array)),t}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),r=en(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),r=en(r,this.array),i=en(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},Vr=class extends Br{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Hr=class extends Br{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Ur=class extends Br{constructor(e,t,n){super(new Float32Array(e),t,n)}},Wr=new Sr,Gr=new H,Kr=new H,qr=class{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Wr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Gr.subVectors(e,this.center);let t=Gr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Gr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Kr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Gr.copy(e.center).add(Kr)),this.expandByPoint(Gr.copy(e.center).sub(Kr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Jr=0,Yr=new wn,Xr=new Zn,Zr=new H,Qr=new Sr,$r=new Sr,ei=new H,ti=class e extends Kt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jr++}),this.uuid=Xt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(It(e)?Hr:Vr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new U().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Yr.makeRotationFromQuaternion(e),this.applyMatrix4(Yr),this}rotateX(e){return Yr.makeRotationX(e),this.applyMatrix4(Yr),this}rotateY(e){return Yr.makeRotationY(e),this.applyMatrix4(Yr),this}rotateZ(e){return Yr.makeRotationZ(e),this.applyMatrix4(Yr),this}translate(e,t,n){return Yr.makeTranslation(e,t,n),this.applyMatrix4(Yr),this}scale(e,t,n){return Yr.makeScale(e,t,n),this.applyMatrix4(Yr),this}lookAt(e){return Xr.lookAt(e),Xr.updateMatrix(),this.applyMatrix4(Xr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zr).negate(),this.translate(Zr.x,Zr.y,Zr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Ur(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&R(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){z(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Qr.setFromBufferAttribute(n),this.morphTargetsRelative?(ei.addVectors(this.boundingBox.min,Qr.min),this.boundingBox.expandByPoint(ei),ei.addVectors(this.boundingBox.max,Qr.max),this.boundingBox.expandByPoint(ei)):(this.boundingBox.expandByPoint(Qr.min),this.boundingBox.expandByPoint(Qr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&z(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){z(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new H,1/0);return}if(e){let n=this.boundingSphere.center;if(Qr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];$r.setFromBufferAttribute(n),this.morphTargetsRelative?(ei.addVectors(Qr.min,$r.min),Qr.expandByPoint(ei),ei.addVectors(Qr.max,$r.max),Qr.expandByPoint(ei)):(Qr.expandByPoint($r.min),Qr.expandByPoint($r.max))}Qr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)ei.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(ei));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)ei.fromBufferAttribute(a,t),o&&(Zr.fromBufferAttribute(e,t),ei.add(Zr)),r=Math.max(r,n.distanceToSquared(ei))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&z(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){z(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Br(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new H,s[e]=new H;let c=new H,l=new H,u=new H,d=new V,f=new V,p=new V,m=new H,h=new H;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new H,y=new H,b=new H,x=new H;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Br(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new H,i=new H,a=new H,o=new H,s=new H,c=new H,l=new H,u=new H;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ei.fromBufferAttribute(e,t),ei.normalize(),e.setXYZ(t,ei.x,ei.y,ei.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Br(a,r,i)}if(this.index===null)return R(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},ni=new H,ri=new H,ii=new U,ai=class{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=ni.subVectors(n,t).cross(ri.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(ni),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||ii.getNormalMatrix(e),r=this.coplanarPoint(ni).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},oi=0,si=class extends Kt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:oi++}),this.uuid=Xt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new G(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mt,this.stencilZFail=Mt,this.stencilZPass=Mt,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){R(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){R(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new G().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new ai().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new V().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new V().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},ci=new H,li=new H,ui=new H,di=new H,fi=class{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ci)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ci.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ci.copy(this.origin).addScaledVector(this.direction,t),ci.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){li.copy(e).add(t).multiplyScalar(.5),ui.copy(t).sub(e).normalize(),di.copy(this.origin).sub(li);let i=e.distanceTo(t)*.5,a=-this.direction.dot(ui),o=di.dot(this.direction),s=-di.dot(ui),c=di.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(li).addScaledVector(ui,d),f}intersectSphere(e,t){if(e.radius<0)return null;ci.subVectors(e.center,this.origin);let n=ci.dot(this.direction),r=ci.dot(ci)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ci)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let ee=S/w,te=C/w,ne=1/w,re=T-ee*D,ie=E-te*D,ae=O-ee*A,oe=k-te*A,se=j-ee*N,ce=M-te*N,le=se*oe-ce*ae,ue=re*ce-ie*se,de=ae*ie-oe*re;if(r){if(le<0||ue<0||de<0)return null}else if((le<0||ue<0||de<0)&&(le>0||ue>0||de>0))return null;let fe=le+ue+de;if(fe===0)return null;let pe=ne*(le*D+ue*A+de*N);return(fe>0?pe<0:pe>0)?null:this.at(pe/fe,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},pi=class extends si{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new G(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},mi=new wn,hi=new fi,gi=new qr,_i=new H,vi=new H,yi=new H,bi=new H,xi=new H,Si=new H,Ci=new H,wi=new H,Ti=class extends Zn{constructor(e=new ti,t=new pi){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Si.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(xi.fromBufferAttribute(s,e),a?Si.addScaledVector(xi,r):Si.addScaledVector(xi.sub(t),r))}t.add(Si)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),gi.copy(n.boundingSphere),gi.applyMatrix4(i),hi.copy(e.ray).recast(e.near),!(gi.containsPoint(hi.origin)===!1&&(hi.intersectSphere(gi,_i)===null||hi.origin.distanceToSquared(_i)>(e.far-e.near)**2))&&(mi.copy(i).invert(),hi.copy(e.ray).applyMatrix4(mi),(n.boundingBox===null||hi.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,hi)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Di(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Di(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Di(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Di(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Ei(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;wi.copy(s),wi.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(wi);return l<n.near||l>n.far?null:{distance:l,point:wi.clone(),object:e}}function Di(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,vi),e.getVertexPosition(c,yi),e.getVertexPosition(l,bi);let u=Ei(e,t,n,r,vi,yi,bi,Ci);if(u){let e=new H;xr.getBarycoord(Ci,vi,yi,bi,e),i&&(u.uv=xr.getInterpolatedAttribute(i,s,c,l,e,new V)),a&&(u.uv1=xr.getInterpolatedAttribute(a,s,c,l,e,new V)),o&&(u.normal=xr.getInterpolatedAttribute(o,s,c,l,e,new H),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new H,materialIndex:0};xr.getNormal(vi,yi,bi,t.normal),u.face=t,u.barycoord=e}return u}var Oi=class extends vn{constructor(e=null,t=1,n=1,r,i,a,o,s,c=pe,l=pe,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ki=class extends Br{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ai=new wn,ji=new wn,Mi=[],Ni=new Sr,Pi=new wn,Fi=new Ti,Ii=new qr,Li=class extends Ti{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ki(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Pi)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Sr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ai),Ni.copy(e.boundingBox).applyMatrix4(Ai),this.boundingBox.union(Ni)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new qr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ai),Ii.copy(e.boundingSphere).applyMatrix4(Ai),this.boundingSphere.union(Ii)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Fi.geometry=this.geometry,Fi.material=this.material,Fi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ii.copy(this.boundingSphere),Ii.applyMatrix4(n),e.ray.intersectsSphere(Ii)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Ai),ji.multiplyMatrices(n,Ai),Fi.matrixWorld=ji,Fi.raycast(e,Mi);for(let e=0,n=Mi.length;e<n;e++){let n=Mi[e];n.instanceId=i,n.object=this,t.push(n)}Mi.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ki(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Oi(new Float32Array(r*this.count),r,this.count,Fe,Te));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ri=new qr,zi=new V(.5,.5),Bi=new H,Vi=class{constructor(e=new ai,t=new ai,n=new ai,r=new ai,i=new ai,a=new ai){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ft,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ri.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ri.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ri)}intersectsSprite(e){return Ri.center.set(0,0,0),Ri.radius=.7071067811865476+zi.distanceTo(e.center),Ri.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ri)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Bi.x=r.normal.x>0?e.max.x:e.min.x,Bi.y=r.normal.y>0?e.max.y:e.min.y,Bi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Bi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Hi=class extends vn{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ui=class extends vn{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Wi=class extends vn{constructor(e,t,n=we,r,i,a,o=pe,s=pe,c,l=Pe,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new mn(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Gi=class extends Wi{constructor(e,t=we,n=301,r,i,a=pe,o=pe,s,c=Pe){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ki=class extends vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},qi=class e extends ti{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Ur(c,3)),this.setAttribute(`normal`,new Ur(l,3)),this.setAttribute(`uv`,new Ur(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new H;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ji=class e extends ti{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Ur(u,3)),this.setAttribute(`normal`,new Ur(d,3)),this.setAttribute(`uv`,new Ur(f,2));function _(){let a=new H,_=new H,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new V,m=new H,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Yi=class e extends Ji{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Xi=class e extends ti{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Ur(i,3)),this.setAttribute(`normal`,new Ur(i.slice(),3)),this.setAttribute(`uv`,new Ur(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new H,r=new H,i=new H;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new H;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new H;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new H,t=new H,n=new H,r=new H,o=new V,s=new V,c=new V;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Zi=class e extends Xi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Qi=class e extends ti{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Ur(p,3)),this.setAttribute(`normal`,new Ur(m,3)),this.setAttribute(`uv`,new Ur(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},$i=class e extends ti{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new H,p=new V;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new Ur(s,3)),this.setAttribute(`normal`,new Ur(c,3)),this.setAttribute(`uv`,new Ur(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};function ea(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(na(i))i.isRenderTargetTexture?(R(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(na(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function ta(e){let t={};for(let n=0;n<e.length;n++){let r=ea(e[n]);for(let e in r)t[e]=r[e]}return t}function na(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function ra(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function ia(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:W.workingColorSpace}var aa={clone:ea,merge:ta},oa=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sa=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ca=class extends si{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=oa,this.fragmentShader=sa,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ea(e.uniforms),this.uniformsGroups=ra(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new G().setHex(r.value);break;case`v2`:this.uniforms[n].value=new V().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new yn().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new U().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new wn().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},la=class extends ca{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},ua=class extends si{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new G(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new G(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new V(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},da=class extends si{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Dt,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},fa=class extends si{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function pa(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function ma(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var ha=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},ga=class extends ha{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wt,endingEnd:wt}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Tt:i=e,o=2*t-n;break;case Et:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Tt:a=e,s=2*n-t;break;case Et:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},_a=class extends ha{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},va=class extends ha{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},ya=class extends ha{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Sa(n,t,g,y,r);i[p]=ba(x,o,_,b,m)}return i}};function ba(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function xa(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Sa(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=ba(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=xa(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Ca=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=pa(t,this.TimeBufferType),this.values=pa(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:pa(e.times,Array),values:pa(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),ma(e.settings)&&(n.settings={inTangents:pa(e.settings.inTangents,Array),outTangents:pa(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new va(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new _a(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ga(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ya(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case bt:t=this.InterpolantFactoryMethodDiscrete;break;case xt:t=this.InterpolantFactoryMethodLinear;break;case St:t=this.InterpolantFactoryMethodSmooth;break;case Ct:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return R(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return bt;case this.InterpolantFactoryMethodLinear:return xt;case this.InterpolantFactoryMethodSmooth:return St;case this.InterpolantFactoryMethodBezier:return Ct}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;ma(this.settings)&&(wa(this.settings.inTangents,e),wa(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(z(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(z(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){z(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){z(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Lt(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){z(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===St,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,ma(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function wa(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Ca.prototype.ValueTypeName=``,Ca.prototype.TimeBufferType=Float32Array,Ca.prototype.ValueBufferType=Float32Array,Ca.prototype.DefaultInterpolation=xt;var Ta=class extends Ca{constructor(e,t,n){super(e,t,n)}};Ta.prototype.ValueTypeName=`bool`,Ta.prototype.ValueBufferType=Array,Ta.prototype.DefaultInterpolation=bt,Ta.prototype.InterpolantFactoryMethodLinear=void 0,Ta.prototype.InterpolantFactoryMethodSmooth=void 0;var Ea=class extends Ca{constructor(e,t,n,r){super(e,t,n,r)}};Ea.prototype.ValueTypeName=`color`;var Da=class extends Ca{constructor(e,t,n,r){super(e,t,n,r)}};Da.prototype.ValueTypeName=`number`;var Oa=class extends ha{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)tn.slerpFlat(i,0,a,c-o,a,c,s);return i}},ka=class extends Ca{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Oa(this.times,this.values,this.getValueSize(),e)}};ka.prototype.ValueTypeName=`quaternion`,ka.prototype.InterpolantFactoryMethodSmooth=void 0;var Aa=class extends Ca{constructor(e,t,n){super(e,t,n)}};Aa.prototype.ValueTypeName=`string`,Aa.prototype.ValueBufferType=Array,Aa.prototype.DefaultInterpolation=bt,Aa.prototype.InterpolantFactoryMethodLinear=void 0,Aa.prototype.InterpolantFactoryMethodSmooth=void 0;var ja=class extends Ca{constructor(e,t,n,r){super(e,t,n,r)}};ja.prototype.ValueTypeName=`vector`;var Ma=class extends Zn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new G(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Na=class extends Ma{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Zn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new G(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Pa=new wn,Fa=new H,Ia=new H,La=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new V(512,512),this.mapType=ye,this.map=null,this.mapPass=null,this.matrix=new wn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vi,this._frameExtents=new V(1,1),this._viewportCount=1,this._viewports=[new yn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Fa.setFromMatrixPosition(e.matrixWorld),t.position.copy(Fa),Ia.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ia),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Pa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Pa,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Pa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ra=new H,za=new tn,Ba=new H,Va=class extends Zn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new wn,this.projectionMatrix=new wn,this.projectionMatrixInverse=new wn,this.coordinateSystem=Ft,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ra,za,Ba),Ba.x===1&&Ba.y===1&&Ba.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ra,za,Ba.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ra,za,Ba),Ba.x===1&&Ba.y===1&&Ba.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ra,za,Ba.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ha=new H,Ua=new V,Wa=new V,Ga=class extends Va{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Yt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Jt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yt*2*Math.atan(Math.tan(Jt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ha.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ha.x,Ha.y).multiplyScalar(-e/Ha.z),Ha.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ha.x,Ha.y).multiplyScalar(-e/Ha.z)}getViewSize(e,t){return this.getViewBounds(e,Ua,Wa),t.subVectors(Wa,Ua)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Jt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ka=class extends Va{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},qa=class extends La{constructor(){super(new Ka(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ja=class extends Ma{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Zn.DEFAULT_UP),this.updateMatrix(),this.target=new Zn,this.shadow=new qa}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Ya=class extends Ma{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},Xa=-90,Za=1,Qa=class extends Zn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ga(Xa,Za,e,t);r.layers=this.layers,this.add(r);let i=new Ga(Xa,Za,e,t);i.layers=this.layers,this.add(i);let a=new Ga(Xa,Za,e,t);a.layers=this.layers,this.add(a);let o=new Ga(Xa,Za,e,t);o.layers=this.layers,this.add(o);let s=new Ga(Xa,Za,e,t);s.layers=this.layers,this.add(s);let c=new Ga(Xa,Za,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},$a=class extends Ga{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},eo=`\\[\\]\\.:\\/`,to=RegExp(`[\\[\\]\\.:\\/]`,`g`),no=`[^\\[\\]\\.:\\/]`,ro=`[^`+eo.replace(`\\.`,``)+`]`,io=`((?:WC+[\\/:])*)`.replace(`WC`,no),ao=`(WCOD+)?`.replace(`WCOD`,ro),oo=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,no),so=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,no),co=RegExp(`^`+io+ao+oo+so+`$`),lo=[`material`,`materials`,`bones`,`map`],uo=class{constructor(e,t,n){let r=n||fo.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},fo=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(to,``)}static parseTrackName(e){let t=co.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);lo.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){R(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){z(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){z(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){z(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){z(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){z(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){z(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){z(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;z(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){z(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){z(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};fo.Composite=uo,fo.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},fo.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},fo.prototype.GetterByBindingType=[fo.prototype._getValue_direct,fo.prototype._getValue_array,fo.prototype._getValue_arrayElement,fo.prototype._getValue_toArray],fo.prototype.SetterByBindingTypeAndVersioning=[[fo.prototype._setValue_direct,fo.prototype._setValue_direct_setNeedsUpdate,fo.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[fo.prototype._setValue_array,fo.prototype._setValue_array_setNeedsUpdate,fo.prototype._setValue_array_setMatrixWorldNeedsUpdate],[fo.prototype._setValue_arrayElement,fo.prototype._setValue_arrayElement_setNeedsUpdate,fo.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[fo.prototype._setValue_fromArray,fo.prototype._setValue_fromArray_setNeedsUpdate,fo.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],oe=class{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}},oe.prototype.isMatrix2=!0;function po(e,t,n,r){let i=mo(r);switch(n){case P:return e*t;case Fe:return e*t/i.components*i.byteLength;case Ie:return e*t/i.components*i.byteLength;case I:return e*t*2/i.components*i.byteLength;case Le:return e*t*2/i.components*i.byteLength;case Me:return e*t*3/i.components*i.byteLength;case Ne:return e*t*4/i.components*i.byteLength;case Re:return e*t*4/i.components*i.byteLength;case L:case ze:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Be:case Ve:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ue:case Ge:return Math.max(e,16)*Math.max(t,8)/4;case He:case We:return Math.max(e,8)*Math.max(t,8)/2;case Ke:case qe:case Ye:case Xe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Je:case Ze:case Qe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case $e:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case et:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case tt:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case nt:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case rt:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case it:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case at:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ot:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case st:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case ct:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case lt:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case ut:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case dt:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case ft:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case pt:case mt:case ht:return Math.ceil(e/4)*Math.ceil(t/4)*16;case gt:case _t:return Math.ceil(e/4)*Math.ceil(t/4)*8;case vt:case yt:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function mo(e){switch(e){case ye:case be:return{byteLength:1,components:1};case Se:case xe:case Ee:return{byteLength:2,components:1};case De:case Oe:return{byteLength:2,components:4};case we:case Ce:case Te:return{byteLength:4,components:1};case Ae:case je:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?R(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function ho(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function go(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var K={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},q={common:{diffuse:{value:new G(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new U},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new U}},envmap:{envMap:{value:null},envMapRotation:{value:new U},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new U}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new U}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new U},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new U},normalScale:{value:new V(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new U},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new U}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new U}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new U}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new G(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new G(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0},uvTransform:{value:new U}},sprite:{diffuse:{value:new G(16777215)},opacity:{value:1},center:{value:new V(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new U},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0}}},_o={basic:{uniforms:ta([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.fog]),vertexShader:K.meshbasic_vert,fragmentShader:K.meshbasic_frag},lambert:{uniforms:ta([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.fog,q.lights,{emissive:{value:new G(0)},envMapIntensity:{value:1}}]),vertexShader:K.meshlambert_vert,fragmentShader:K.meshlambert_frag},phong:{uniforms:ta([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.fog,q.lights,{emissive:{value:new G(0)},specular:{value:new G(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:K.meshphong_vert,fragmentShader:K.meshphong_frag},standard:{uniforms:ta([q.common,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.roughnessmap,q.metalnessmap,q.fog,q.lights,{emissive:{value:new G(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:K.meshphysical_vert,fragmentShader:K.meshphysical_frag},toon:{uniforms:ta([q.common,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.gradientmap,q.fog,q.lights,{emissive:{value:new G(0)}}]),vertexShader:K.meshtoon_vert,fragmentShader:K.meshtoon_frag},matcap:{uniforms:ta([q.common,q.bumpmap,q.normalmap,q.displacementmap,q.fog,{matcap:{value:null}}]),vertexShader:K.meshmatcap_vert,fragmentShader:K.meshmatcap_frag},points:{uniforms:ta([q.points,q.fog]),vertexShader:K.points_vert,fragmentShader:K.points_frag},dashed:{uniforms:ta([q.common,q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:K.linedashed_vert,fragmentShader:K.linedashed_frag},depth:{uniforms:ta([q.common,q.displacementmap]),vertexShader:K.depth_vert,fragmentShader:K.depth_frag},normal:{uniforms:ta([q.common,q.bumpmap,q.normalmap,q.displacementmap,{opacity:{value:1}}]),vertexShader:K.meshnormal_vert,fragmentShader:K.meshnormal_frag},sprite:{uniforms:ta([q.sprite,q.fog]),vertexShader:K.sprite_vert,fragmentShader:K.sprite_frag},background:{uniforms:{uvTransform:{value:new U},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:K.background_vert,fragmentShader:K.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new U}},vertexShader:K.backgroundCube_vert,fragmentShader:K.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:K.cube_vert,fragmentShader:K.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:K.equirect_vert,fragmentShader:K.equirect_frag},distance:{uniforms:ta([q.common,q.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:K.distance_vert,fragmentShader:K.distance_frag},shadow:{uniforms:ta([q.lights,q.fog,{color:{value:new G(0)},opacity:{value:1}}]),vertexShader:K.shadow_vert,fragmentShader:K.shadow_frag}};_o.physical={uniforms:ta([_o.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new U},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new U},clearcoatNormalScale:{value:new V(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new U},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new U},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new U},sheen:{value:0},sheenColor:{value:new G(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new U},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new U},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new U},transmissionSamplerSize:{value:new V},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new U},attenuationDistance:{value:0},attenuationColor:{value:new G(0)},specularColor:{value:new G(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new U},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new U},anisotropyVector:{value:new V},anisotropyMap:{value:null},anisotropyMapTransform:{value:new U}}]),vertexShader:K.meshphysical_vert,fragmentShader:K.meshphysical_frag};var vo={r:0,b:0,g:0},yo=new wn,bo=new U;bo.set(-1,0,0,0,1,0,0,0,1);function xo(e,t,n,r,i,a){let o=new G(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Ti(new qi(1,1,1),new ca({name:`BackgroundCubeMaterial`,uniforms:ea(_o.backgroundCube.uniforms),vertexShader:_o.backgroundCube.vertexShader,fragmentShader:_o.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(yo.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(bo),l.material.toneMapped=W.getTransfer(i.colorSpace)!==jt,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Ti(new Qi(2,2),new ca({name:`BackgroundMaterial`,uniforms:ea(_o.background.uniforms),vertexShader:_o.background.vertexShader,fragmentShader:_o.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=W.getTransfer(i.colorSpace)!==jt,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(vo,ia(e)),n.buffers.color.setClear(vo.r,vo.g,vo.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function So(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Co(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function wo(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(R(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&R(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function To(e){let t=this,n=null,r=0,i=!1,a=!1,o=new ai,s=new U,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Eo=4,Do=6,Oo=20,ko=256,Ao=new Ka,jo=new G,Mo=null,No=0,Po=0,Fo=!1,Io=new H,Lo=new H,Ro=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Io}=i;Mo=this._renderer.getRenderTarget(),No=this._renderer.getActiveCubeFace(),Po=this._renderer.getActiveMipmapLevel(),Fo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Go(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Mo,No,Po),this._renderer.xr.enabled=Fo,e.scissorTest=!1,Vo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Mo=this._renderer.getRenderTarget(),No=this._renderer.getActiveCubeFace(),Po=this._renderer.getActiveMipmapLevel(),Fo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ge,minFilter:ge,generateMipmaps:!1,type:Ee,format:Ne,colorSpace:kt,depthBuffer:!1},r=Bo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bo(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=zo(r)),this._blurMaterial=Uo(r,e,t),this._ggxMaterial=Ho(r,e,t)}return r}_compileMaterial(e){let t=new Ti(new ti,e);this._renderer.compile(t,Ao)}_sceneToCubeUV(e,t,n,r,i){let a=new Ga(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(jo),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ti(new qi,new pi({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(jo),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Vo(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Go()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wo());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Vo(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Ao)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Eo?n-d+Eo:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Vo(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Ao),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Vo(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Ao)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Vo(t,3*l*(r>this._lodMax-Eo?r-this._lodMax+Eo:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Ao)}};function zo(e){let t=[],n=[],r=e,i=e-Eo+1+Do;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Lo.set(1,r,n):e===1?Lo.set(-n,1,-r):e===2?Lo.set(-n,r,1):e===3?Lo.set(-1,r,-n):e===4?Lo.set(-n,-1,r):Lo.set(n,r,-1),Lo.toArray(l,(e*6+t)*3)}}let u=new ti;u.setAttribute(`position`,new Br(c,3)),u.setAttribute(`outputDirection`,new Br(l,3)),n.push(new Ti(u,null)),r>Eo&&r--}return{lodMeshes:n,sizeLods:t}}function Bo(e,t,n){let r=new xn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Vo(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Ho(e,t,n){return new ca({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:ko,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ko(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Uo(e,t,n){return new ca({name:`SphericalGaussianBlur`,defines:{SAMPLES:Oo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ko(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Wo(){return new ca({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Ko(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Go(){return new ca({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ko(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var qo=class extends xn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Hi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new qi(5,5,5),i=new ca({name:`CubemapFromEquirect`,uniforms:ea(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Ti(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=ge),new Qa(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Jo(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new qo(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Ro(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Ro(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Yo(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Ut(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Xo(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Hr:Vr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Zo(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Qo(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:z(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function $o(e,t,n){let r=new WeakMap,i=new yn;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Sn(h,p,m,u);g.type=Te,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new V(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function es(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var ts={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function ns(e,t,n,r,i,a){let o=new xn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new ti;l.setAttribute(`position`,new Ur([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new Ur([0,2,0,0,2,0],2));let u=new la({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Ti(l,u),f=new Ka(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new xn(t,n,{type:Ee,depthBuffer:!1,stencilBuffer:!1}),c=new xn(t,n,{type:Ee,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},W.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=ts[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var rs=new vn,is=new Wi(1,1),as=new Sn,os=new Cn,ss=new Hi,cs=[],ls=[],us=new Float32Array(16),ds=new Float32Array(9),fs=new Float32Array(4);function ps(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=cs[i];if(a===void 0&&(a=new Float32Array(i),cs[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function ms(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function hs(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function gs(e,t){let n=ls[t];n===void 0&&(n=new Int32Array(t),ls[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function _s(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function vs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ms(n,t))return;e.uniform2fv(this.addr,t),hs(n,t)}}function ys(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(ms(n,t))return;e.uniform3fv(this.addr,t),hs(n,t)}}function bs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ms(n,t))return;e.uniform4fv(this.addr,t),hs(n,t)}}function xs(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ms(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),hs(n,t)}else{if(ms(n,r))return;fs.set(r),e.uniformMatrix2fv(this.addr,!1,fs),hs(n,r)}}function Ss(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ms(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),hs(n,t)}else{if(ms(n,r))return;ds.set(r),e.uniformMatrix3fv(this.addr,!1,ds),hs(n,r)}}function Cs(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ms(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),hs(n,t)}else{if(ms(n,r))return;us.set(r),e.uniformMatrix4fv(this.addr,!1,us),hs(n,r)}}function ws(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Ts(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ms(n,t))return;e.uniform2iv(this.addr,t),hs(n,t)}}function Es(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(ms(n,t))return;e.uniform3iv(this.addr,t),hs(n,t)}}function Ds(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ms(n,t))return;e.uniform4iv(this.addr,t),hs(n,t)}}function Os(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function ks(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ms(n,t))return;e.uniform2uiv(this.addr,t),hs(n,t)}}function As(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(ms(n,t))return;e.uniform3uiv(this.addr,t),hs(n,t)}}function js(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ms(n,t))return;e.uniform4uiv(this.addr,t),hs(n,t)}}function Ms(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(is.compareFunction=n.isReversedDepthBuffer()?518:515,a=is):a=rs,n.setTexture2D(t||a,i)}function Ns(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||os,i)}function Ps(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||ss,i)}function Fs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||as,i)}function Is(e){switch(e){case 5126:return _s;case 35664:return vs;case 35665:return ys;case 35666:return bs;case 35674:return xs;case 35675:return Ss;case 35676:return Cs;case 5124:case 35670:return ws;case 35667:case 35671:return Ts;case 35668:case 35672:return Es;case 35669:case 35673:return Ds;case 5125:return Os;case 36294:return ks;case 36295:return As;case 36296:return js;case 35678:case 36198:case 36298:case 36306:case 35682:return Ms;case 35679:case 36299:case 36307:return Ns;case 35680:case 36300:case 36308:case 36293:return Ps;case 36289:case 36303:case 36311:case 36292:return Fs}}function Ls(e,t){e.uniform1fv(this.addr,t)}function Rs(e,t){let n=ps(t,this.size,2);e.uniform2fv(this.addr,n)}function zs(e,t){let n=ps(t,this.size,3);e.uniform3fv(this.addr,n)}function Bs(e,t){let n=ps(t,this.size,4);e.uniform4fv(this.addr,n)}function Vs(e,t){let n=ps(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Hs(e,t){let n=ps(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Us(e,t){let n=ps(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Ws(e,t){e.uniform1iv(this.addr,t)}function Gs(e,t){e.uniform2iv(this.addr,t)}function Ks(e,t){e.uniform3iv(this.addr,t)}function qs(e,t){e.uniform4iv(this.addr,t)}function Js(e,t){e.uniform1uiv(this.addr,t)}function Ys(e,t){e.uniform2uiv(this.addr,t)}function Xs(e,t){e.uniform3uiv(this.addr,t)}function Zs(e,t){e.uniform4uiv(this.addr,t)}function Qs(e,t,n){let r=this.cache,i=t.length,a=gs(n,i);ms(r,a)||(e.uniform1iv(this.addr,a),hs(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?is:rs;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function $s(e,t,n){let r=this.cache,i=t.length,a=gs(n,i);ms(r,a)||(e.uniform1iv(this.addr,a),hs(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||os,a[e])}function ec(e,t,n){let r=this.cache,i=t.length,a=gs(n,i);ms(r,a)||(e.uniform1iv(this.addr,a),hs(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||ss,a[e])}function tc(e,t,n){let r=this.cache,i=t.length,a=gs(n,i);ms(r,a)||(e.uniform1iv(this.addr,a),hs(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||as,a[e])}function nc(e){switch(e){case 5126:return Ls;case 35664:return Rs;case 35665:return zs;case 35666:return Bs;case 35674:return Vs;case 35675:return Hs;case 35676:return Us;case 5124:case 35670:return Ws;case 35667:case 35671:return Gs;case 35668:case 35672:return Ks;case 35669:case 35673:return qs;case 5125:return Js;case 36294:return Ys;case 36295:return Xs;case 36296:return Zs;case 35678:case 36198:case 36298:case 36306:case 35682:return Qs;case 35679:case 36299:case 36307:return $s;case 35680:case 36300:case 36308:case 36293:return ec;case 36289:case 36303:case 36311:case 36292:return tc}}var rc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Is(t.type)}},ic=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=nc(t.type)}},ac=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},oc=/(\w+)(\])?(\[|\.)?/g;function sc(e,t){e.seq.push(t),e.map[t.id]=t}function cc(e,t,n){let r=e.name,i=r.length;for(oc.lastIndex=0;;){let a=oc.exec(r),o=oc.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){sc(n,l===void 0?new rc(s,e,t):new ic(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new ac(s),sc(n,e)),n=e}}}var lc=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);cc(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function uc(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var dc=37297,fc=0;function pc(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var mc=new U;function hc(e){W._getMatrix(mc,W.workingColorSpace,e);let t=`mat3( ${mc.elements.map(e=>e.toFixed(4))} )`;switch(W.getTransfer(e)){case At:return[t,`LinearTransferOETF`];case jt:return[t,`sRGBTransferOETF`];default:return R(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function gc(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+pc(e.getShaderSource(t),r)}return i}function _c(e,t){let n=hc(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var vc={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function yc(e,t){let n=vc[t];return n===void 0?(R(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var bc=new H;function xc(){return W.getLuminanceCoefficients(bc),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${bc.x.toFixed(4)}, ${bc.y.toFixed(4)}, ${bc.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Sc(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Tc).join(`
`)}function Cc(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function wc(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Tc(e){return e!==``}function Ec(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Dc(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Oc=/^[ \t]*#include +<([\w\d./]+)>/gm;function kc(e){return e.replace(Oc,jc)}var Ac=new Map;function jc(e,t){let n=K[t];if(n===void 0){let e=Ac.get(t);if(e!==void 0)n=K[e],R(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return kc(n)}var Mc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nc(e){return e.replace(Mc,Pc)}function Pc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Fc(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var Ic={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Lc(e){return Ic[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Rc={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function zc(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Rc[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Bc={302:`ENVMAP_MODE_REFRACTION`};function Vc(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Bc[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Hc={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Uc(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Hc[e.combine]||`ENVMAP_BLENDING_NONE`}function Wc(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Gc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Lc(n),l=zc(n),u=Vc(n),d=Uc(n),f=Wc(n),p=Sc(n),m=Cc(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Tc).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Tc).join(`
`),_.length>0&&(_+=`
`)):(g=[Fc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Tc).join(`
`),_=[Fc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:K.tonemapping_pars_fragment,n.toneMapping===0?``:yc(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,K.colorspace_pars_fragment,_c(`linearToOutputTexel`,n.outputColorSpace),xc(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Tc).join(`
`)),o=kc(o),o=Ec(o,n),o=Dc(o,n),s=kc(s),s=Ec(s,n),s=Dc(s,n),o=Nc(o),s=Nc(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=uc(i,i.VERTEX_SHADER,y),S=uc(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=gc(i,x,`vertex`),n=gc(i,S,`fragment`);z(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):R(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new lc(i,h),T=wc(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,dc)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=fc++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Kc=0,qc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Jc(e),t.set(e,n)),n}},Jc=class{constructor(e){this.id=Kc++,this.code=e,this.usedTimes=0}};function Yc(e){return e===1030||e===37490||e===36285}function Xc(e,t,n,r,i,a){let o=new Fn,s=new qc,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&R(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=_o[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,ee=h.isBatchedMesh===!0,te=!!i.map,ne=!!i.matcap,re=!!x,ie=!!i.aoMap,ae=!!i.lightMap,oe=!!i.bumpMap&&i.wireframe===!1,se=!!i.normalMap,ce=!!i.displacementMap,le=!!i.emissiveMap,ue=!!i.metalnessMap,de=!!i.roughnessMap,fe=i.anisotropy>0,pe=i.clearcoat>0,me=i.dispersion>0,he=i.retroreflectivity>0,ge=i.iridescence>0,_e=i.sheen>0,ve=i.transmission>0,ye=fe&&!!i.anisotropyMap,be=pe&&!!i.clearcoatMap,xe=pe&&!!i.clearcoatNormalMap,Se=pe&&!!i.clearcoatRoughnessMap,Ce=ge&&!!i.iridescenceMap,we=ge&&!!i.iridescenceThicknessMap,Te=_e&&!!i.sheenColorMap,Ee=_e&&!!i.sheenRoughnessMap,De=!!i.specularMap,Oe=!!i.specularColorMap,ke=!!i.specularIntensityMap,Ae=ve&&!!i.transmissionMap,je=ve&&!!i.thicknessMap,P=!!i.gradientMap,Me=!!i.alphaMap,Ne=i.alphaTest>0,Pe=!!i.alphaHash,F=!!i.extensions,Fe=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Fe=e.toneMapping);let Ie={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:ee,batchingColor:ee&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:W.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:te,matcap:ne,envMap:re,envMapMode:re&&x.mapping,envMapCubeUVHeight:S,aoMap:ie,lightMap:ae,bumpMap:oe,normalMap:se,displacementMap:ce,emissiveMap:le,normalMapObjectSpace:se&&i.normalMapType===1,normalMapTangentSpace:se&&i.normalMapType===0,packedNormalMap:se&&i.normalMapType===0&&Yc(i.normalMap.format),metalnessMap:ue,roughnessMap:de,anisotropy:fe,anisotropyMap:ye,clearcoat:pe,clearcoatMap:be,clearcoatNormalMap:xe,clearcoatRoughnessMap:Se,dispersion:me,retroreflection:he,iridescence:ge,iridescenceMap:Ce,iridescenceThicknessMap:we,sheen:_e,sheenColorMap:Te,sheenRoughnessMap:Ee,specularMap:De,specularColorMap:Oe,specularIntensityMap:ke,transmission:ve,transmissionMap:Ae,thicknessMap:je,gradientMap:P,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Me,alphaTest:Ne,alphaHash:Pe,combine:i.combine,mapUv:te&&m(i.map.channel),aoMapUv:ie&&m(i.aoMap.channel),lightMapUv:ae&&m(i.lightMap.channel),bumpMapUv:oe&&m(i.bumpMap.channel),normalMapUv:se&&m(i.normalMap.channel),displacementMapUv:ce&&m(i.displacementMap.channel),emissiveMapUv:le&&m(i.emissiveMap.channel),metalnessMapUv:ue&&m(i.metalnessMap.channel),roughnessMapUv:de&&m(i.roughnessMap.channel),anisotropyMapUv:ye&&m(i.anisotropyMap.channel),clearcoatMapUv:be&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:xe&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:we&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&m(i.sheenRoughnessMap.channel),specularMapUv:De&&m(i.specularMap.channel),specularColorMapUv:Oe&&m(i.specularColorMap.channel),specularIntensityMapUv:ke&&m(i.specularIntensityMap.channel),transmissionMapUv:Ae&&m(i.transmissionMap.channel),thicknessMapUv:je&&m(i.thicknessMap.channel),alphaMapUv:Me&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(se||fe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(te||Me),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&se===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Fe,decodeVideoTexture:te&&i.map.isVideoTexture===!0&&W.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:le&&i.emissiveMap.isVideoTexture===!0&&W.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:F&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(F&&i.extensions.multiDraw===!0||ee)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=_o[t];n=aa.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Gc(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Zc(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Qc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function $c(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function el(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Qc),r.length>1&&r.sort(t||$c),i.length>1&&i.sort(t||$c)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function tl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new el,e.set(t,[i])):n>=r.length?(i=new el,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function nl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new H,color:new G};break;case`SpotLight`:n={position:new H,direction:new H,color:new G,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new H,color:new G,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new H,skyColor:new G,groundColor:new G};break;case`RectAreaLight`:n={color:new G,position:new H,halfWidth:new H,halfHeight:new H}}return e[t.id]=n,n}}}function rl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var il=0;function al(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function ol(e){let t=new nl,n=rl(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new H);let i=new H,a=new wn,o=new wn;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(al);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=q.LTC_FLOAT_1,r.rectAreaLTC2=q.LTC_FLOAT_2):(r.rectAreaLTC1=q.LTC_HALF_1,r.rectAreaLTC2=q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=il++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function sl(e){let t=new ol(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function cl(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new sl(e),t.set(n,[a])):r>=i.length?(a=new sl(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var ll=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ul=`uniform sampler2D shadow_pass;
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
}`,dl=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],fl=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],pl=new wn,ml=new H,hl=new H;function gl(e,t,n){let r=new Vi,i=new V,a=new V,o=new yn,s=new da,c=new fa,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new ca({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new V},radius:{value:4}},vertexShader:ll,fragmentShader:ul}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new ti;m.setAttribute(`position`,new Br(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Ti(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(R(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){R(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){R(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new xn(i.x,i.y,{format:I,type:Ee,minFilter:ge,magFilter:ge,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Wi(i.x,i.y,Te),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Pe,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=pe,d.map.depthTexture.magFilter=pe}else l.isPointLight?(d.map=new qo(i.x),d.map.depthTexture=new Gi(i.x,we)):(d.map=new xn(i.x,i.y),d.map.depthTexture=new Wi(i.x,i.y,we)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Pe,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=ge,d.map.depthTexture.magFilter=ge):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=pe,d.map.depthTexture.magFilter=pe);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),ml.setFromMatrixPosition(l.matrixWorld),e.position.copy(ml),hl.copy(e.position),hl.add(dl[t]),e.up.copy(fl[t]),e.lookAt(hl),e.updateMatrixWorld(),n.makeTranslation(-ml.x,-ml.y,-ml.z),pl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(pl,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new xn(i.x,i.y,{format:I,type:Ee}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function _l(e,t){function n(){let t=!1,n=new yn,r=null,i=new yn(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ue(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Gt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ue(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new G(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,ee=0,te=e.getParameter(e.VERSION);te.indexOf(`WebGL`)===-1?te.indexOf(`OpenGL ES`)!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),N=ee>=2):(ee=parseFloat(/^WebGL (\d)/.exec(te)[1]),N=ee>=1);let ne=null,re={},ie=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),oe=new yn().fromArray(ie),se=new yn().fromArray(ae);function ce(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let le={};le[e.TEXTURE_2D]=ce(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=ce(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=ce(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=ce(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ue(e.DEPTH_TEST),o.setFunc(3),ye(!1),be(1),ue(e.CULL_FACE),_e(0);function ue(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function de(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function fe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function pe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function me(t){return h!==t&&(e.useProgram(t),h=t,!0)}let he={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};he[103]=e.MIN,he[104]=e.MAX;let ge={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function _e(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(de(e.BLEND),g=!1);return}if(g===!1&&(ue(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:z(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:z(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:z(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:z(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a=a||n,o=o||r,s=s||i,(n!==v||a!==x)&&(e.blendEquationSeparate(he[n],he[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ge[r],ge[i],ge[o],ge[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ve(t,n){t.side===2?de(e.CULL_FACE):ue(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ye(r),t.blending===1&&t.transparent===!1?_e(0):_e(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Se(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ue(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function ye(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function be(t){t===0?de(e.CULL_FACE):(ue(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function xe(t){t!==k&&(N&&e.lineWidth(t),k=t)}function Se(t,n,r){t?(ue(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):de(e.POLYGON_OFFSET_FILL)}function Ce(t){t?ue(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function we(t){t===void 0&&(t=e.TEXTURE0+M-1),ne!==t&&(e.activeTexture(t),ne=t)}function Te(t,n,r){r===void 0&&(r=ne===null?e.TEXTURE0+M-1:ne);let i=re[r];i===void 0&&(i={type:void 0,texture:void 0},re[r]=i),(i.type!==t||i.texture!==n)&&(ne!==r&&(e.activeTexture(r),ne=r),e.bindTexture(t,n||le[t]),i.type=t,i.texture=n)}function Ee(){let t=re[ne];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function De(){try{e.compressedTexImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Oe(){try{e.compressedTexImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function ke(){try{e.texSubImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ae(){try{e.texSubImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function je(){try{e.compressedTexSubImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function P(){try{e.compressedTexSubImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Me(){try{e.texStorage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ne(){try{e.texStorage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Pe(){try{e.texImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function F(){try{e.texImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Fe(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ie(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function I(t){oe.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),oe.copy(t))}function Le(t){se.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),se.copy(t))}function Re(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function L(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function ze(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ne=null,re={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new G(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,oe.set(0,0,e.canvas.width,e.canvas.height),se.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ue,disable:de,bindFramebuffer:fe,drawBuffers:pe,useProgram:me,setBlending:_e,setMaterial:ve,setFlipSided:ye,setCullFace:be,setLineWidth:xe,setPolygonOffset:Se,setScissorTest:Ce,activeTexture:we,bindTexture:Te,unbindTexture:Ee,compressedTexImage2D:De,compressedTexImage3D:Oe,texImage2D:Pe,texImage3D:F,pixelStorei:Ie,getParameter:Fe,updateUBOMapping:Re,uniformBlockBinding:L,texStorage2D:Me,texStorage3D:Ne,texSubImage2D:ke,texSubImage3D:Ae,compressedTexSubImage2D:je,compressedTexSubImage3D:P,scissor:I,viewport:Le,reset:ze}}function vl(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new V,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):Rt(`canvas`)}function g(e,t,n){let r=1,i=Fe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),R(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&R(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];R(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||R(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?At:W.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,R(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function j(e){O=e}function M(){let e=O;return e>=i.maxTextures&&R(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function N(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ee(t,i){let a=r.get(t);if(t.isVideoTexture&&Ne(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)R(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)R(`WebGLRenderer: Texture marked for update but image is incomplete`);else{be(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function te(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){be(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function ne(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){be(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function re(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){xe(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ie={[ue]:e.REPEAT,[de]:e.CLAMP_TO_EDGE,[fe]:e.MIRRORED_REPEAT},ae={[pe]:e.NEAREST,[me]:e.NEAREST_MIPMAP_NEAREST,[he]:e.NEAREST_MIPMAP_LINEAR,[ge]:e.LINEAR,[_e]:e.LINEAR_MIPMAP_NEAREST,[ve]:e.LINEAR_MIPMAP_LINEAR},oe={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function se(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&R(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ie[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ie[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ie[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ae[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ae[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,oe[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ce(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=N(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function le(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ye(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=le(n.start,r.width,4),c=le(t.start,r.width,4);n.start<=i+1&&a===c&&le(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function be(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ce(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=W.getPrimaries(W.workingColorSpace),r=o.colorSpace===``?null:W.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Pe(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);se(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===F,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&ye(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=po(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=po(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=Fe(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=Fe(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function xe(t,o,s){if(o.image.length!==6)return;let c=ce(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=W.getPrimaries(W.workingColorSpace),r=o.colorSpace===``?null:W.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Pe(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);se(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=Fe(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Se(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Me(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,P(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ce(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Me(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,P(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,P(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);Me(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,P(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,P(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function we(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),se(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else ee(i.depthTexture,0);let u=l.__webglTexture,d=P(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Me(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Me(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Te(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)we(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?we(i.__webglFramebuffer[0],t,0):we(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),Ce(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),Ce(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ee(t,n,i){let a=r.get(t);n!==void 0&&Se(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Te(t)}function De(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Me(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=P(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),Ce(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),se(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)Se(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else Se(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),se(c,a),Se(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),se(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)Se(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else Se(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&Te(t)}function Oe(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let ke=[],Ae=[];function je(t){if(t.samples>0){if(Me(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(ke.length=0,Ae.length=0,ke.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(ke.push(l),Ae.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ae)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ke))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function P(e){return Math.min(i.maxSamples,e.samples)}function Me(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Ne(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Pe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(W.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&R(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):z(`WebGLTextures: Unsupported texture color space:`,n)),t}function Fe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=M,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=j,this.setTexture2D=ee,this.setTexture2DArray=te,this.setTexture3D=ne,this.setTextureCube=re,this.rebindTextures=Ee,this.setupRenderTarget=De,this.updateRenderTargetMipmap=Oe,this.updateMultisampleRenderTarget=je,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=Me,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function yl(e,t){function n(n,r=``){let i,a=W.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var bl=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,xl=`
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

}`,Sl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ki(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ca({vertexShader:bl,fragmentShader:xl,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ti(new Qi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Cl=class extends Kt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Sl,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new V,C=null,w=null,T=new Ga;T.viewport=new yn;let E=new Ga;E.viewport=new yn;let D=[T,E],O=new $a,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new er,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new er,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new er,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function M(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,M),r.removeEventListener(`inputsourceschange`,N);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,se.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&R(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&R(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,M),r.addEventListener(`inputsourceschange`,N),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?F:Pe,a=_.stencil?ke:we);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new xn(d.textureWidth,d.textureHeight,{format:Ne,type:ye,depthTexture:new Wi(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new xn(f.framebufferWidth,f.framebufferHeight,{format:Ne,type:ye,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),se.setContext(r),se.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function N(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let ee=new H,te=new H;function ne(e,t,n){ee.setFromMatrixPosition(t.matrixWorld),te.setFromMatrixPosition(n.matrixWorld);let r=ee.distanceTo(te),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function re(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;re(O,i);for(let e=0;e<a.length;e++)re(a[e],i);a.length===2?ne(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),ie(e,O,i)};function ie(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Yt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let ae=null;function oe(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Ga,o.layers.enable(n),o.viewport=new yn,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Ki,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ae&&ae(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let se=new ho;se.setAnimationLoop(oe),this.setAnimationLoop=function(e){ae=e},this.dispose=function(){}}},wl=new wn,Tl=new U;Tl.set(-1,0,0,0,1,0,0,0,1);function El(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,ia(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(wl.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Tl),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Dl(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return z(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?R(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):R(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Ol=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),kl=null;function Al(){return kl===null&&(kl=new Oi(Ol,16,16,I,Ee),kl.name=`DFG_LUT`,kl.minFilter=ge,kl.magFilter=ge,kl.wrapS=de,kl.wrapT=de,kl.generateMipmaps=!1,kl.needsUpdate=!0),kl}var jl=class{constructor(e={}){let{canvas:t=zt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=ye}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Re,Le,Ie]),g=new Set([ye,we,Se,ke,De,Oe]),_=new Uint32Array(4),v=new Int32Array(4),y=new H,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=Ot;let j=0,M=0,N=null,ee=-1,te=null,ne=new yn,re=new yn,ie=null,ae=new G(0),oe=0,se=t.width,ce=t.height,le=1,ue=null,de=null,fe=new yn(0,0,se,ce),pe=new yn(0,0,se,ce),me=!1,he=new Vi,ge=!1,_e=!1,be=new wn,xe=new H,Ce=new yn,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ae=!1;function je(){return N===null?le:1}let P=n;function Me(e,n){return t.getContext(e,n)}let Ne,Pe,F,Fe,I,L,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e,et,tt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,it,!1),t.addEventListener(`webglcontextrestored`,at,!1),t.addEventListener(`webglcontextcreationerror`,ot,!1),P===null){let t=`webgl2`;if(P=Me(t,e),P===null)throw Me(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}nt()}catch(e){throw t.removeEventListener(`webglcontextlost`,it,!1),t.removeEventListener(`webglcontextrestored`,at,!1),t.removeEventListener(`webglcontextcreationerror`,ot,!1),z(`WebGLRenderer: `+e.message),e}function nt(){Ne=new Yo(P),Ne.init(),$e=new yl(P,Ne),Pe=new wo(P,Ne,e,$e),F=new _l(P,Ne),Pe.reversedDepthBuffer&&d&&F.buffers.depth.setReversed(!0),O=P.createFramebuffer(),k=P.createFramebuffer(),A=P.createFramebuffer(),Fe=new Qo(P),I=new Zc,L=new vl(P,Ne,F,I,Pe,$e,Fe),ze=new Jo(T),Be=new go(P),et=new So(P,Be),Ve=new Xo(P,Be,Fe,et),He=new es(P,Ve,Be,et,Fe),Xe=new $o(P,Pe,L),qe=new To(I),Ue=new Xc(T,ze,Ne,Pe,et,qe),We=new El(T,I),Ge=new tl,Ke=new cl(Ne),Ye=new xo(T,ze,F,He,p,s),Je=new gl(T,He,Pe),tt=new Dl(P,Fe,Pe,F),Ze=new Co(P,Ne,Fe),Qe=new Zo(P,Ne,Fe),Fe.programs=Ue.programs,T.capabilities=Pe,T.extensions=Ne,T.properties=I,T.renderLists=Ge,T.shadowMap=Je,T.state=F,T.info=Fe}m!==1009&&(w=new ns(m,t.width,t.height,o,r,i));let rt=new Cl(T,P);this.xr=rt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let e=Ne.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ne.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(e){e!==void 0&&(le=e,this.setSize(se,ce,!1))},this.getSize=function(e){return e.set(se,ce)},this.setSize=function(e,n,r=!0){if(rt.isPresenting){R(`WebGLRenderer: Can't change size while VR device is presenting.`);return}se=e,ce=n,t.width=Math.floor(e*le),t.height=Math.floor(n*le),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(se*le,ce*le).floor()},this.setDrawingBufferSize=function(e,n,r){se=e,ce=n,le=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){z(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){R(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(ne)},this.getViewport=function(e){return e.copy(fe)},this.setViewport=function(e,t,n,r){e.isVector4?fe.set(e.x,e.y,e.z,e.w):fe.set(e,t,n,r),F.viewport(ne.copy(fe).multiplyScalar(le).round())},this.getScissor=function(e){return e.copy(pe)},this.setScissor=function(e,t,n,r){e.isVector4?pe.set(e.x,e.y,e.z,e.w):pe.set(e,t,n,r),F.scissor(re.copy(pe).multiplyScalar(le).round())},this.getScissorTest=function(){return me},this.setScissorTest=function(e){F.setScissorTest(me=e)},this.setOpaqueSort=function(e){ue=e},this.setTransparentSort=function(e){de=e},this.getClearColor=function(e){return e.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=Ye.getClearColor(),r=Ye.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,P.clearBufferuiv(P.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,P.clearBufferiv(P.COLOR,0,v))}else r|=P.COLOR_BUFFER_BIT}t&&(r|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&P.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,it,!1),t.removeEventListener(`webglcontextrestored`,at,!1),t.removeEventListener(`webglcontextcreationerror`,ot,!1),Ye.dispose(),Ge.dispose(),Ke.dispose(),I.dispose(),ze.dispose(),He.dispose(),et.dispose(),tt.dispose(),Ue.dispose(),rt.dispose(),rt.removeEventListener(`sessionstart`,pt),rt.removeEventListener(`sessionend`,mt),ht.stop()};function it(e){e.preventDefault(),Vt(`WebGLRenderer: Context Lost.`),E=!0}function at(){Vt(`WebGLRenderer: Context Restored.`),E=!1;let e=Fe.autoReset,t=Je.enabled,n=Je.autoUpdate,r=Je.needsUpdate,i=Je.type;nt(),Fe.autoReset=e,Je.enabled=t,Je.autoUpdate=n,Je.needsUpdate=r,Je.type=i}function ot(e){z(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function st(e){let t=e.target;t.removeEventListener(`dispose`,st),ct(t)}function ct(e){lt(e),I.remove(e)}function lt(e){let t=I.get(e).programs;t!==void 0&&(t.forEach(function(e){Ue.releaseProgram(e)}),e.isShaderMaterial&&Ue.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Te);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Tt(e,t,n,r,i);F.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ve.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;et.setup(i,r,s,n,c);let h,g=Ze;if(c!==null&&(h=Be.get(c),g=Qe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(F.setLineWidth(r.wireframeLinewidth*je()),g.setMode(P.LINES)):g.setMode(P.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),F.setLineWidth(e*je()),i.isLineSegments?g.setMode(P.LINES):i.isLineLoop?g.setMode(P.LINE_LOOP):g.setMode(P.LINE_STRIP)}else i.isPoints?g.setMode(P.POINTS):i.isSprite&&g.setMode(P.TRIANGLES);if(i.isBatchedMesh){if(Ne.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Be.get(c).bytesPerElement:1,o=I.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(P,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ut(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),ge===!0&&qe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,xt(e,t,r),e.side=0,e.needsUpdate=!0,xt(e,t,r),e.side=2):xt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Ke.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),_e=this.localClippingEnabled,ge=qe.init(this.clippingPlanes,_e),ge===!0&&qe.setGlobalState(this.clippingPlanes,t),D!==null&&Je.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ut(o,n,t,e),r.add(o)}else ut(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=I.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Ne.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let dt=null;function ft(e){dt&&dt(e)}function pt(){ht.stop()}function mt(){ht.start()}let ht=new ho;ht.setAnimationLoop(ft),typeof self<`u`&&ht.setContext(self),this.setAnimationLoop=function(e){dt=e,rt.setAnimationLoop(e),e===null?ht.stop():ht.start()},rt.addEventListener(`sessionstart`,pt),rt.addEventListener(`sessionend`,mt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){z(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=rt.enabled===!0&&rt.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(t),t=rt.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=Ke.get(e,C.length),x.init(t),x.state.textureUnits=L.getTextureUnits(),C.push(x),be.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),he.setFromProjectionMatrix(be,Ft,t.reversedDepth),_e=this.localClippingEnabled,ge=qe.init(this.clippingPlanes,_e),b=Ge.get(e,S.length),b.init(),S.push(b),rt.enabled===!0&&rt.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&gt(e,t,-1/0,T.sortObjects)}gt(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(ue,de),Ae=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,Ae&&Ye.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ge===!0&&qe.beginShadows();let i=x.state.shadowsArray;if(Je.render(i,e,t),ge===!0&&qe.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];vt(n,r,e,a)}Ae&&Ye.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];_t(b,e,n,n.viewport)}}else r.length>0&&vt(n,r,e,t),Ae&&Ye.render(e),_t(b,e,t)}N!==null&&M===0&&(L.updateMultisampleRenderTarget(N),L.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),et.resetDefaultState(),ee=-1,te=null,C.pop(),C.length>0?(x=C[C.length-1],L.setTextureUnits(x.state.textureUnits),ge===!0&&qe.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function gt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(he)){r&&Ce.setFromMatrixPosition(e.matrixWorld).applyMatrix4(be);let i=He.update(e),a=e.material;a.visible&&b.push(e,i,a,n,Ce.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(he))){let i=He.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Ce.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Ce.copy(e.boundingSphere.center)),Ce.applyMatrix4(e.matrixWorld).applyMatrix4(be)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,Ce.z,s,t)}}else a.visible&&b.push(e,i,a,n,Ce.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)gt(i[e],t,n,r)}function _t(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),ge===!0&&qe.setGlobalState(T.clippingPlanes,n),r&&F.viewport(ne.copy(r)),i.length>0&&yt(i,t,n),a.length>0&&yt(a,t,n),o.length>0&&yt(o,t,n),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function vt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Ne.has(`EXT_color_buffer_half_float`)||Ne.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new xn(1,1,{generateMipmaps:!0,type:e?Ee:ye,minFilter:ve,samples:Math.max(4,Pe.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:W.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||ne;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ae),oe=T.getClearAlpha(),oe<1&&T.setClearColor(16777215,.5),T.clear(),Ae&&Ye.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),ge===!0&&qe.setGlobalState(T.clippingPlanes,r),yt(e,n,r),L.updateMultisampleRenderTarget(a),L.updateRenderTargetMipmap(a),Ne.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,bt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(L.updateMultisampleRenderTarget(a),L.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ae,oe),d!==void 0&&(r.viewport=d),T.toneMapping=u}function yt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&bt(o,t,n,s,l,c)}}function bt(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function xt(e,t,n){t.isScene!==!0&&(t=Te);let r=I.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Ue.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Ue.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=ze.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,st),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Ct(e,s),d}else s.uniforms=Ue.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Ue.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=qe.uniform),Ct(e,s),r.needsLights=Dt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function St(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=lc.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Ct(e,t){let n=I.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function wt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function Tt(e,t,n,r,i){t.isScene!==!0&&(t=Te),L.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:W.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=ze.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=I.get(r),y=x.state.lights;if(ge===!0&&(_e===!0||e!==te)){let t=e===te&&r.id===ee;qe.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==qe.numPlanes||v.numIntersection!==qe.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=xt(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(F.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==ee&&(ee=r.id,w=!0),v.needsLights){let e=wt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||te!==e){F.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(P,`projectionMatrix`,e.projectionMatrix),O.setValue(P,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(P,xe.setFromMatrixPosition(e.matrixWorld)),Pe.logarithmicDepthBuffer&&O.setValue(P,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(P,`isOrthographic`,e.isOrthographicCamera===!0),te!==e&&(te=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(P,`sunShadowMap`,y.state.sunShadowMap,L),y.state.directionalShadowMap.length>0&&O.setValue(P,`directionalShadowMap`,y.state.directionalShadowMap,L),y.state.spotShadowMap.length>0&&O.setValue(P,`spotShadowMap`,y.state.spotShadowMap,L),y.state.pointShadowMap.length>0&&O.setValue(P,`pointShadowMap`,y.state.pointShadowMap,L)),i.isSkinnedMesh){O.setOptional(P,i,`bindMatrix`),O.setOptional(P,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(P,`boneTexture`,e.boneTexture,L))}i.isBatchedMesh&&(O.setOptional(P,i,`batchingTexture`),O.setValue(P,`batchingTexture`,i._matricesTexture,L),O.setOptional(P,i,`batchingIdTexture`),O.setValue(P,`batchingIdTexture`,i._indirectTexture,L),O.setOptional(P,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(P,`batchingColorTexture`,i._colorsTexture,L));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Xe.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(P,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Al()),w){if(O.setValue(P,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&Et(k,E),a&&r.fog===!0&&We.refreshFogUniforms(k,a),We.refreshMaterialUniforms(k,r,le,ce,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}lc.upload(P,St(v),k,L)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(lc.upload(P,St(v),k,L),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(P,`center`,i.center),O.setValue(P,`modelViewMatrix`,i.modelViewMatrix),O.setValue(P,`normalMatrix`,i.normalMatrix),O.setValue(P,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];tt.update(n,S),tt.bind(n,S)}}return S}function Et(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Dt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=I.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),I.get(e.texture).__webglTexture=t,I.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=I.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,j=t,M=n;let r=null,i=!1,a=!1;if(e){let o=I.get(e);if(o.__useDefaultFramebuffer!==void 0){F.bindFramebuffer(P.FRAMEBUFFER,o.__webglFramebuffer),ne.copy(e.viewport),re.copy(e.scissor),ie=e.scissorTest,F.viewport(ne),F.scissor(re),F.setScissorTest(ie),ee=-1;return}if(o.__webglFramebuffer===void 0)L.setupRenderTarget(e);else if(o.__hasExternalTextures)L.rebindTextures(e,I.get(e.texture).__webglTexture,I.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&I.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);L.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=I.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&L.useMultisampledRTT(e)===!1?I.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ne.copy(e.viewport),re.copy(e.scissor),ie=e.scissorTest}else ne.copy(fe).multiplyScalar(le).floor(),re.copy(pe).multiplyScalar(le).floor(),ie=me;if(n!==0&&(r=O),F.bindFramebuffer(P.FRAMEBUFFER,r)&&F.drawBuffers(e,r),F.viewport(ne),F.scissor(re),F.setScissorTest(ie),i){let r=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=I.get(e.textures[t]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,t.__webglTexture,n)}ee=-1};function kt(e){let t=I.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Pe.textureFormatReadable(e.format),t.__typeReadable=Pe.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){F.bindFramebuffer(P.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let u=kt(o);if(u.__formatReadable===!1){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&P.readPixels(t,n,r,i,$e.convert(c),$e.convert(l),a)}finally{let e=N===null?null:I.get(N).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){F.bindFramebuffer(P.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let d=kt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.bufferData(P.PIXEL_PACK_BUFFER,a.byteLength,P.STREAM_READ),P.readPixels(t,n,r,i,$e.convert(l),$e.convert(u),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);let p=N===null?null:I.get(N).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,p);let m=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Wt(P,m,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,a),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(f),P.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;L.setTexture2D(e,0),P.copyTexSubImage2D(P.TEXTURE_2D,n,0,0,o,s,i,a),F.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=$e.convert(t.format),_=$e.convert(t.type),v;t.isData3DTexture?(L.setTexture3D(t,0),v=P.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(L.setTexture2DArray(t,0),v=P.TEXTURE_2D_ARRAY):(L.setTexture2D(t,0),v=P.TEXTURE_2D),F.activeTexture(P.TEXTURE0),F.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,t.flipY),F.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),F.pixelStorei(P.UNPACK_ALIGNMENT,t.unpackAlignment);let y=F.getParameter(P.UNPACK_ROW_LENGTH),b=F.getParameter(P.UNPACK_IMAGE_HEIGHT),x=F.getParameter(P.UNPACK_SKIP_PIXELS),S=F.getParameter(P.UNPACK_SKIP_ROWS),C=F.getParameter(P.UNPACK_SKIP_IMAGES);F.pixelStorei(P.UNPACK_ROW_LENGTH,h.width),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,h.height),F.pixelStorei(P.UNPACK_SKIP_PIXELS,l),F.pixelStorei(P.UNPACK_SKIP_ROWS,u),F.pixelStorei(P.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=I.get(e),r=I.get(t),h=I.get(n.__renderTarget),g=I.get(r.__renderTarget);F.bindFramebuffer(P.READ_FRAMEBUFFER,h.__webglFramebuffer),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(e).__webglTexture,i,d+n),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(t).__webglTexture,a,m+n)),P.blitFramebuffer(l,u,o,s,f,p,o,s,P.DEPTH_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||I.has(e)){let n=I.get(e),r=I.get(t);F.bindFramebuffer(P.READ_FRAMEBUFFER,k),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,n.__webglTexture,i),T?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,r.__webglTexture,a),i===0?T?P.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):P.copyTexSubImage2D(v,a,f,p,l,u,o,s):P.blitFramebuffer(l,u,o,s,f,p,o,s,P.COLOR_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?P.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h);F.pixelStorei(P.UNPACK_ROW_LENGTH,y),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,b),F.pixelStorei(P.UNPACK_SKIP_PIXELS,x),F.pixelStorei(P.UNPACK_SKIP_ROWS,S),F.pixelStorei(P.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&P.generateMipmap(v),F.unbindTexture()},this.initRenderTarget=function(e){I.get(e).__webglFramebuffer===void 0&&L.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?L.setTextureCube(e,0):e.isData3DTexture?L.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?L.setTexture2DArray(e,0):L.setTexture2D(e,0),F.unbindTexture()},this.resetState=function(){j=0,M=0,N=null,F.reset(),et.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ft}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=W._getDrawingBufferColorSpace(e),t.unpackColorSpace=W._getUnpackColorSpace()}},Ml={thresholds:[10,40,90,160],maxHeat:220,carjack:6,pedHit:6,pedHitSpeed:5,punch:2,hitPolice:15,explosion:20,explosionRadius:25,witnessMul:2.5,witnessRange:32,hitPoliceCooldown:1,hideTime:[0,6,9,12,15],decayPerSec:7,sightRange:60,sightEvery:10},Nl={units:[0,2,3,4,6],spawnEvery:2.5,spawnMin:75,spawnMax:125,despawn:210,pursueRange:45,repath:1.5,chaseSpeed:1.6,leadTime:1.4,roadblockStars:3,roadblockEvery:28,roadblockMin:70,roadblockMax:115,roadblockKeep:70,bustRange:3.2,bustSpeed:2.5,bustTime:2.5,flashHz:3},Pl={anchors:[{district:`industrial`},{district:`bazaar`},{chowk:1}],radius:5,maxSpeed:6,cost:0,requireUnseen:!0,tints:[16777215,16743034,8042751,9240460,16765803,13999103]},Fl={startMoney:200,hospitalDistrict:`residential`,stationChowk:0,bustedDelay:3,bustedFineFrac:.1,bustedFineMin:50,hospitalFeeFrac:.1,hospitalFeeMin:25,reviveWindow:20},Il={drag:2.2,turnFullSpeed:5,fragility:2},Ll={vehicle:1.25,person:1.2},Rl={rickshaw:{...Il,id:`rickshaw`,model:`rickshaw`,length:2.7,width:1.4,height:1.8,mass:380,maxSpeed:17,accel:8,brake:15,reverseMax:5,turn:3.1,turnFullSpeed:3.5,falloff:.3,grip:8,driftGrip:2.2,health:70,fragility:2.5,colors:{body:4170573,accent:3046706,roof:15909198}},taxi:{...Il,id:`taxi`,model:`car`,length:4,width:1.7,height:1.5,mass:1e3,maxSpeed:30,accel:9.5,brake:18,reverseMax:7,turn:2.6,falloff:.5,grip:10,driftGrip:1.8,health:100,colors:{body:1907997,accent:16173326,roof:16173326}},motorbike:{...Il,id:`motorbike`,model:`bike`,length:2,width:.7,height:1.2,mass:190,maxSpeed:36,accel:13,brake:16,reverseMax:2.5,turn:3.4,turnFullSpeed:4,falloff:.55,grip:12,driftGrip:3,health:40,fragility:3,colors:{body:12597547,accent:2899536,roof:9807270}},bus:{...Il,id:`bus`,model:`bus`,length:10.5,width:2.5,height:3.2,mass:9e3,maxSpeed:19,accel:3.6,brake:9,reverseMax:4,turn:1.25,turnFullSpeed:4,falloff:.25,grip:12,driftGrip:4,drag:1.6,health:300,fragility:.8,colors:{body:13849600,accent:15528177,roof:12436423}},truck:{...Il,id:`truck`,model:`truck`,length:7.5,width:2.4,height:3,mass:7e3,maxSpeed:21,accel:4,brake:10,reverseMax:4,turn:1.5,turnFullSpeed:4,falloff:.3,grip:12,driftGrip:3.5,drag:1.8,health:250,fragility:.9,colors:{body:3049153,accent:16044095,roof:9334355}},police:{...Il,id:`police`,model:`jeep`,length:4,width:1.85,height:1.8,mass:1500,maxSpeed:33,accel:10.5,brake:20,reverseMax:8,turn:2.7,falloff:.5,grip:11,driftGrip:2,health:160,fragility:1.5,colors:{body:15790320,accent:2051740,roof:15790320}}};function zl(e){let t=Ll.vehicle;return{...e,length:e.length*t,width:e.width*t,height:e.height*t}}var Bl=Object.fromEntries(Object.keys(Rl).map(e=>[e,zl(Rl[e])])),Vl={threshold:3,smoke:.5,fire:.2,burnRate:.06,blastRadius:7,blastPush:14,blastVehicleDamage:120,blastWalkerDamage:60};function Hl(){return{nx:0,nz:0,depth:0}}function Ul(){return{x:0,z:0,hw:0,hl:0,rx:1,rz:0,fx:0,fz:-1}}function Wl(e,t,n,r,i,a){let o=Math.cos(r),s=Math.sin(r);return e.x=t,e.z=n,e.hw=i,e.hl=a,e.rx=o,e.rz=s,e.fx=s,e.fz=-o,e}function Gl(e,t){return Wl(e,(t.minX+t.maxX)/2,(t.minZ+t.maxZ)/2,0,(t.maxX-t.minX)/2,(t.maxZ-t.minZ)/2)}function Kl(e){return{ex:e.hw*Math.abs(e.rx)+e.hl*Math.abs(e.fx),ez:e.hw*Math.abs(e.rz)+e.hl*Math.abs(e.fz)}}function ql(e,t,n){return e.hw*Math.abs(e.rx*t+e.rz*n)+e.hl*Math.abs(e.fx*t+e.fz*n)}function Jl(e,t,n){let r=t.x-e.x,i=t.z-e.z,a=1/0,o=0,s=0;for(let n=0;n<4;n++){let c=n===0?e.rx:n===1?e.fx:n===2?t.rx:t.fx,l=n===0?e.rz:n===1?e.fz:n===2?t.rz:t.fz,u=r*c+i*l,d=ql(e,c,l)+ql(t,c,l)-Math.abs(u);if(d<=0)return!1;if(d<a){a=d;let e=u>0?-1:1;o=c*e,s=l*e}}return n.nx=o,n.nz=s,n.depth=a,!0}function Yl(e,t,n,r,i){let a=e-r.x,o=t-r.z,s=a*r.rx+o*r.rz,c=a*r.fx+o*r.fz,l=Math.max(-r.hw,Math.min(r.hw,s)),u=Math.max(-r.hl,Math.min(r.hl,c)),d=s-l,f=c-u,p=d*d+f*f;if(p>=n*n)return!1;let m,h,g;if(p>1e-12){let e=Math.sqrt(p);m=d/e,h=f/e,g=n-e}else{let e=r.hw-Math.abs(s),t=r.hl-Math.abs(c);e<t?(m=s>=0?1:-1,h=0,g=e+n):(m=0,h=c>=0?1:-1,g=t+n)}return i.nx=m*r.rx+h*r.fx,i.nz=m*r.rz+h*r.fz,i.depth=g,!0}function Xl(e,t,n){let r=e-n.x,i=t-n.z,a=Math.abs(r*n.rx+i*n.rz)-n.hw,o=Math.abs(r*n.fx+i*n.fz)-n.hl;return Math.hypot(Math.max(a,0),Math.max(o,0))}function Zl(e){return{s:e>>>0}}function Ql(e){e.s=e.s+1831565813>>>0;let t=e.s;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function $l(e,t,n){return t+(n-t)*Ql(e)}function eu(e,t){let n=Bl[e.type],r=e.stage===`wreck`,i=r?0:e.inThrottle,a=r?0:e.inBrake,o=r?0:e.inSteer,s=r||e.inHandbrake,c=o!==0&&(e.steer===0||o>0==e.steer>0);e.steer=tu(e.steer,o,(c?6:10)*t);let l=Math.sin(e.heading),u=-Math.cos(e.heading),d=e.vx*l+e.vz*u,f=e.vx*u*-1+e.vz*l;i>0&&d<-.5?d=tu(d,0,n.brake*i*t):a>0&&d>.5?d=tu(d,0,n.brake*a*t):i>0?d<n.maxSpeed&&(d+=n.accel*i*(.3+.7*(1-Math.max(0,d)/n.maxSpeed))*t):a>0?d>-n.reverseMax&&(d-=n.accel*.6*a*t):d=tu(d,0,n.drag*t),s&&(d=tu(d,0,n.brake*.45*t)),d>n.maxSpeed&&(d=tu(d,n.maxSpeed,4*t)),d<-n.reverseMax&&(d=tu(d,-n.reverseMax,4*t));let p=Math.abs(d),m=Math.min(1,p/n.turnFullSpeed)*(1-n.falloff*Math.min(1,p/n.maxSpeed)),h=e.steer*n.turn*m*(s&&p>4?1.35:1);d<0&&(h=-h);let g=l*d-u*f,_=u*d+l*f;e.heading=nu(e.heading+h*t);let v=Math.sin(e.heading),y=-Math.cos(e.heading);d=g*v+_*y,f=-g*y+_*v;let b=s?n.driftGrip:n.grip,x=f*Math.max(0,1-b*t),S=Math.abs(f-x)*(s?.05:.2);d>S?d-=S:d<-S?d+=S:d=0,f=x,e.skid=Math.abs(f),g=v*d-y*f,_=y*d+v*f,e.vx=g,e.vz=_,e.x+=g*t,e.z+=_*t}function tu(e,t,n){return e<t?e+n>t?t:e+n:e-n<t?t:e-n}function nu(e){return e>Math.PI?e-Math.PI*2:e<=-Math.PI?e+Math.PI*2:e}function ru(e,t,n,r,i=0){return{id:e,kind:t,x:n,z:r,heading:i,px:n,pz:r,pHeading:i,vx:0,vz:0,health:100,maxHealth:100,knockT:0,punchT:0,punchCd:0,walkDist:0,hidden:!1,wishX:0,wishY:0}}function iu(e){return e.knockT>0}function au(e,t,n,r,i){e.vx=t,e.vz=n,e.knockT=Math.max(e.knockT,r),e.punchT=0,e.health=Math.max(0,e.health-i)}function ou(e,t,n,i){if(e.punchT>0&&(e.punchT=Math.max(0,e.punchT-i)),e.punchCd>0&&(e.punchCd=Math.max(0,e.punchCd-i)),e.knockT>0){e.knockT=Math.max(0,e.knockT-i);let t=Math.hypot(e.vx,e.vz),n=Math.max(0,t-r.slideFriction*i);t>0&&(e.vx*=n/t,e.vz*=n/t)}else{let a=Math.hypot(t,n);a>1&&(t/=a,n/=a,a=1);let o=a>.05?t*r.runSpeed:0,s=a>.05?-n*r.runSpeed:0,c=r.accel*i;e.vx=tu(e.vx,o,c),e.vz=tu(e.vz,s,c),a>.05&&(e.heading=su(e.heading,Math.atan2(t,n),r.turnRate*i))}e.x+=e.vx*i,e.z+=e.vz*i,e.knockT===0&&(e.walkDist+=Math.hypot(e.vx,e.vz)*i)}function su(e,t,n){let r=nu(t-e);return Math.abs(r)<=n?t:nu(e+Math.sign(r)*n)}function cu(e,t,n){e.stage===`wreck`||t<=0||(e.health=Math.max(0,e.health-t),du(e,n))}function lu(e,t,n,r){return e.stage===`fire`&&(e.health=Math.max(0,e.health-Bl[e.type].health*Vl.burnRate*n),du(e,r)),e.stage===`wreck`&&e.explodedAt<0&&(e.explodedAt=t,r.push({type:`explode`,vehicle:e.id,x:e.x,z:e.z}),!0)}function uu(e,t){if(e<=0)return`wreck`;let n=e/t;return n<Vl.fire?`fire`:n<Vl.smoke?`smoke`:`ok`}function du(e,t){let n=uu(e.health,Bl[e.type].health);n!==e.stage&&(e.stage=n,n===`smoke`?t.push({type:`smoke`,vehicle:e.id}):n===`fire`&&t.push({type:`fire`,vehicle:e.id}))}function fu(e,t,n,r,i,a=`none`){return{id:e,type:t,x:n,z:r,heading:i,px:n,pz:r,pHeading:i,vx:0,vz:0,steer:0,inThrottle:0,inBrake:0,inSteer:0,inHandbrake:!1,driver:a,health:Bl[t].health,stage:`ok`,explodedAt:-1,horn:!1,skid:0,paint:0,siren:!1}}function pu(e){return Math.hypot(e.vx,e.vz)}function mu(e){return e.vx*Math.sin(e.heading)-e.vz*Math.cos(e.heading)}function hu(e,t){let n=Bl[e.type];return Wl(t,e.x,e.z,e.heading,n.width/2,n.length/2)}var gu=Ul(),_u=Ul(),J=Hl(),vu=[],yu=.25,bu=.35,xu=.12,Su=Object.fromEntries(Object.values(Bl).map(e=>[e.id,Math.hypot(e.length,e.width)/2+r.radius])),Cu=[],wu=[],Tu=[],Eu=[];function Du(e,t,n){for(let r=0;r<3;r++){hu(e,gu);let{ex:r,ez:i}=Kl(gu);vu.length=0,t.query(e.x-r,e.z-i,e.x+r,e.z+i,vu);let a=!1;for(let t of vu)Jl(hu(e,gu),Gl(_u,t),J)&&(a=!0,ku(e,J.nx,J.nz,J.depth,n));if(a=Ou(e,t.bounds,n)||a,!a)break}}function Ou(e,t,n){hu(e,gu);let{ex:r,ez:i}=Kl(gu),a=t.minX-(e.x-r),o=e.x+r-t.maxX,s=t.minZ-(e.z-i),c=e.z+i-t.maxZ;return a>0&&ku(e,1,0,a,n),o>0&&ku(e,-1,0,o,n),s>0&&ku(e,0,1,s,n),c>0&&ku(e,0,-1,c,n),a>0||o>0||s>0||c>0}function ku(e,t,n,r,i){e.x+=t*r,e.z+=n*r;let a=e.vx*t+e.vz*n;if(a>=0)return;let o=-a;if(e.vx-=t*a,e.vz-=n*a,o>1){let r=Math.hypot(e.vx,e.vz);if(r>0){let t=Math.max(0,r-o*bu)/r;e.vx*=t,e.vz*=t}e.vx+=t*o*yu,e.vz+=n*o*yu}let s=Math.sin(e.heading),c=-Math.cos(e.heading),l=s*t+c*n;if(l<0&&l>-.77){let r=Math.atan2(s-t*l,-(c-n*l));e.heading=nu(e.heading+nu(r-e.heading)*xu)}o>Vl.threshold&&(cu(e,(o-Vl.threshold)*Bl[e.type].fragility,i),i.push({type:`crash`,a:e.id,b:-1,impact:o,x:e.x-t*1,z:e.z-n*1}))}function Au(e,t){let n=e.length;if(Cu.length!==n){Cu.length=0;for(let e=0;e<n;e++)Cu.push(e)}wu.length<n&&(wu.length=n,Tu.length=n,Eu.length=n);for(let t=0;t<n;t++){let n=Bl[e[t].type];Eu[t]=Math.hypot(n.length,n.width)/2,wu[t]=e[t].x-Eu[t],Tu[t]=e[t].x+Eu[t]}for(let e=1;e<n;e++){let t=Cu[e],n=e-1;for(;n>=0&&(wu[Cu[n]]>wu[t]||wu[Cu[n]]===wu[t]&&Cu[n]>t);)Cu[n+1]=Cu[n],n--;Cu[n+1]=t}for(let r=0;r<n;r++){let i=Cu[r],a=e[i],o=Bl[a.type],s=Eu[i];for(let c=r+1;c<n;c++){let n=Cu[c];if(wu[n]>Tu[i])break;let r=e[n],l=Bl[r.type],u=Eu[n],d=r.x-a.x,f=r.z-a.z;if(d*d+f*f>(s+u)*(s+u)||!Jl(hu(a,gu),hu(r,_u),J))continue;let p=1/o.mass,m=1/l.mass,h=J.depth/(p+m);a.x+=J.nx*h*p,a.z+=J.nz*h*p,r.x-=J.nx*h*m,r.z-=J.nz*h*m;let g=(a.vx-r.vx)*J.nx+(a.vz-r.vz)*J.nz;if(g>=0)continue;let _=-1.3*g/(p+m);a.vx+=J.nx*_*p,a.vz+=J.nz*_*p,r.vx-=J.nx*_*m,r.vz-=J.nz*_*m;let v=_*p,y=_*m;v>Vl.threshold&&cu(a,(v-Vl.threshold)*o.fragility,t),y>Vl.threshold&&cu(r,(y-Vl.threshold)*l.fragility,t),-g>Vl.threshold&&t.push({type:`crash`,a:a.id,b:r.id,impact:-g,x:(a.x+r.x)/2,z:(a.z+r.z)/2})}}}function ju(e,t,n){if(!e.hidden)for(let i of t){let t=Su[i.type],a=e.x-i.x,o=e.z-i.z;if(a>t||a<-t||o>t||o<-t||a*a+o*o>t*t||!Yl(e.x,e.z,r.radius,hu(i,gu),J))continue;e.x+=J.nx*J.depth,e.z+=J.nz*J.depth;let s=(i.vx-e.vx)*J.nx+(i.vz-e.vz)*J.nz;if(s>r.hitSpeed&&!iu(e)){let t=s*.9;au(e,i.vx*.7+J.nx*t*.5,i.vz*.7+J.nz*t*.5,r.knockTime+s*.05,s*r.hitDamagePerMs),i.vx*=.93,i.vz*=.93,n.push({type:`pedHit`,vehicle:i.id,walker:e.id,speed:s})}else s>0&&(e.vx+=J.nx*s,e.vz+=J.nz*s)}}function Mu(e,t){if(e.hidden)return;let n=r.radius;vu.length=0,t.query(e.x-n,e.z-n,e.x+n,e.z+n,vu);for(let t of vu){if(!Yl(e.x,e.z,n,Gl(_u,t),J))continue;e.x+=J.nx*J.depth,e.z+=J.nz*J.depth;let r=e.vx*J.nx+e.vz*J.nz;r<0&&(e.vx-=J.nx*r*(iu(e)?1.4:1),e.vz-=J.nz*r*(iu(e)?1.4:1))}let i=t.bounds;e.x=Math.max(i.minX+n,Math.min(i.maxX-n,e.x)),e.z=Math.max(i.minZ+n,Math.min(i.maxZ-n,e.z))}function Nu(e,t,n,r,i){let a=r.bounds;if(e-n<a.minX||e+n>a.maxX||t-n<a.minZ||t+n>a.maxZ)return!1;vu.length=0,r.query(e-n,t-n,e+n,t+n,vu);for(let r of vu)if(Yl(e,t,n,Gl(_u,r),J))return!1;for(let r of i)if(Yl(e,t,n,hu(r,gu),J))return!1;return!0}function Pu(){return gu}function Fu(e,t,n){return{walker:ru(e,`player`,t,n),vehicleId:-1,wishX:0,wishY:0,prevUse:!1,prevAction:!1,prevHorn:!1,busyT:0,downT:0,spawnX:t,spawnZ:n,money:Fl.startMoney}}function Iu(e,t){if(!(t<0)){for(let n of e.vehicles)if(n.id===t)return n}}function Lu(e,t,n){let r=e.player,i=t.use&&!r.prevUse,a=t.action&&!r.prevAction,o=t.horn&&!r.prevHorn;if(r.prevUse=t.use,r.prevAction=t.action,r.prevHorn=t.horn,r.wishX=0,r.wishY=0,r.busyT>0&&(r.busyT=Math.max(0,r.busyT-n)),r.downT>0){r.downT=Math.max(0,r.downT-n),r.downT===0&&Wu(e);return}let s=Iu(e,r.vehicleId);if(s){let n=r.busyT>0;s.inThrottle=n?0:t.throttle,s.inBrake=n?0:t.brake,s.inSteer=n?0:t.moveX,s.inHandbrake=n||t.handbrake,s.horn=t.horn&&s.stage!==`wreck`,o&&s.horn&&e.events.push({type:`horn`,vehicle:s.id}),i&&!n&&zu(e,s);return}r.vehicleId>=0&&(r.vehicleId=-1),!iu(r.walker)&&(r.wishX=t.moveX,r.wishY=t.moveY,i&&Ru(e),a&&Hu(e,r.walker))}function Ru(e){let t=e.player,n=t.walker,i,a=r.enterReach;for(let t of e.vehicles){if(t.stage===`wreck`||t.driver===`player`||pu(t)>r.enterMaxSpeed)continue;let e=Xl(n.x,n.z,hu(t,Pu()));e<=a&&(a=e,i=t)}if(!i)return!1;if(i.driver===`npc`){let n=Vu(e,i)??{x:i.x,z:i.z},a=ru(e.nextId++,`npc`,n.x,n.z,i.heading),o=Math.cos(i.heading),s=Math.sin(i.heading),c=$l(e.rng,3,5);au(a,-o*c,-s*c,r.knockTime,0),e.peds.push(a),e.events.push({type:`pullOut`,vehicle:i.id,walker:a.id}),t.busyT=r.pullOutTime}return i.driver=`player`,t.vehicleId=i.id,n.hidden=!0,n.vx=n.vz=0,e.events.push({type:`enter`,vehicle:i.id}),!0}function zu(e,t){if(pu(t)>r.exitMaxSpeed)return!1;let n=Vu(e,t);return n?(Bu(e,t,n.x,n.z),e.events.push({type:`exit`,vehicle:t.id}),!0):!1}function Bu(e,t,n,r){let i=e.player,a=i.walker;a.x=a.px=n,a.z=a.pz=r,a.heading=a.pHeading=t.heading,a.vx=t.vx*.3,a.vz=t.vz*.3,a.hidden=!1,t.driver=`none`,t.horn=!1,i.vehicleId=-1}function Vu(e,t){let n=Bl[t.type],i=Math.cos(t.heading),a=Math.sin(t.heading),o=a,s=-i,c=n.width/2+r.radius+.25,l=n.length/2+r.radius+.25,u=[[-i*c,-a*c],[i*c,a*c],[-o*l,-s*l],[o*l,s*l]];for(let[n,i]of u)if(Nu(t.x+n,t.z+i,r.radius,e.static,e.vehicles))return{x:t.x+n,z:t.z+i};return null}function Hu(e,t){if(t.punchCd>0)return-1;t.punchT=r.punchTime,t.punchCd=r.punchCooldown;let n=Math.sin(t.heading),i=-Math.cos(t.heading),a=Math.cos(r.punchCone),o=-1;for(let s of e.peds){if(s===t||s.hidden||iu(s))continue;let e=s.x-t.x,c=s.z-t.z,l=Math.hypot(e,c);if(!(l>r.punchReach+r.radius||l<1e-6)&&!((e*n+c*i)/l<a)){au(s,n*r.punchPush,i*r.punchPush,r.knockTime,r.punchDamage),o=s.id;break}}return e.events.push({type:`punch`,walker:t.id,hit:o}),o}function Uu(e){let t=e.player,n=t.walker,i=Iu(e,t.vehicleId);i&&(n.x=i.x,n.z=i.z,n.heading=i.heading,n.vx=i.vx,n.vz=i.vz),n.health<=0&&t.downT===0&&(t.downT=r.respawnTime,n.knockT=Math.max(n.knockT,r.respawnTime+r.getUpTime),e.events.push({type:`playerDown`}))}function Wu(e){let t=e.player,n=t.walker,r=Iu(e,t.vehicleId);r&&(r.driver=`none`),t.vehicleId=-1,n.x=n.px=t.spawnX,n.z=n.pz=t.spawnZ,n.vx=n.vz=0,n.health=n.maxHealth,n.knockT=0,n.hidden=!1,e.events.push({type:`respawn`})}var Gu=1.25,Ku=2,qu=1.34;function Ju(e,t){let n=Math.max(.3,e);if(n>=Gu)return{fovDeg:t,distScale:1,lowerPlayer:0};let r=Math.min(Ku,(Gu/n)**.7),i=Math.min(qu,r),a=t*Math.PI/360;return{fovDeg:Math.atan(Math.tan(a)*i)*360/Math.PI,distScale:r/i,lowerPlayer:n<1?.07*Math.min(1,(1-n)/.5):0}}var Yu=Math.PI/180,Xu=class{constructor(e){this.fx=0,this.fz=0,this.ax=0,this.az=0,this.dist=n.walkDistance,this.pitch=n.walkPitchDeg*Yu,this.shakeAmp=0,this.shakeT=0,this.look=new H,this.distScale=1,this.camera=new Ga(n.fovDeg,e,.5,800)}setAspect(e){this.camera.aspect=e;let t=Ju(e,n.fovDeg);this.camera.fov=t.fovDeg,this.distScale=t.distScale,t.lowerPlayer>0?this.camera.setViewOffset(1e3*e,1e3,0,-1e3*t.lowerPlayer,1e3*e,1e3):this.camera.clearViewOffset(),this.camera.updateProjectionMatrix()}snap(e){this.fx=e.x,this.fz=e.z,this.ax=this.az=0,this.dist=e.driving?n.driveDistance:n.walkDistance,this.pitch=(e.driving?n.drivePitchDeg:n.walkPitchDeg)*Yu,this.place()}shake(e){this.shakeAmp=Math.min(n.maxShake,this.shakeAmp+e*n.shakePerImpact)}update(e,t){let r=Math.hypot(e.vx,e.vz),i=e.driving?Math.min(n.maxSpeedZoom,r*n.speedZoom):0,a=i/n.maxSpeedZoom,o=(e.driving?n.driveDistance:n.walkDistance)+i,s=((e.driving?n.drivePitchDeg:n.walkPitchDeg)+n.speedPitchDeg*a)*Yu,c=e.driving?e.vx*n.lookAhead:0,l=e.driving?e.vz*n.lookAhead:0,u=Math.hypot(c,l);u>n.maxLookAhead&&(c*=n.maxLookAhead/u,l*=n.maxLookAhead/u);let d=1-Math.exp(-n.zoomEase*t);this.dist+=(o-this.dist)*d,this.pitch+=(s-this.pitch)*d,this.ax+=(c-this.ax)*d,this.az+=(l-this.az)*d;let f=1-Math.exp(-n.follow*t);this.fx+=(e.x-this.fx)*f,this.fz+=(e.z-this.fz)*f,this.shakeT+=t,this.shakeAmp*=Math.exp(-n.shakeDecay*t),this.shakeAmp<.01&&(this.shakeAmp=0),this.place()}occlusionHint(){let e=this.camera.position;return{x:this.look.x,z:this.look.z,camX:e.x,camY:e.y,camZ:e.z}}place(){let e=this.shakeAmp*Math.sin(this.shakeT*53),t=this.shakeAmp*Math.sin(this.shakeT*41+1.3);this.look.set(this.fx+this.ax+e,0,this.fz+this.az+t);let n=this.dist*this.distScale;this.camera.position.set(this.look.x,Math.sin(this.pitch)*n,this.look.z+Math.cos(this.pitch)*n),this.camera.lookAt(this.look)}},Zu={x:0,z:6},Qu=[{type:`rickshaw`,x:4,z:2,heading:0,driver:!1},{type:`taxi`,x:-5,z:0,heading:0,driver:!0},{type:`motorbike`,x:9,z:4,heading:.3,driver:!1},{type:`police`,x:-12,z:-4,heading:0,driver:!1},{type:`bus`,x:22,z:-10,heading:Math.PI/2,driver:!1},{type:`truck`,x:-24,z:18,heading:0,driver:!1},{type:`taxi`,x:14,z:22,heading:Math.PI,driver:!1}],$u=[{x:2,z:10},{x:-3,z:12},{x:6,z:14}],ed=class{constructor(e,t){this.boxes=e,this.bounds=t}query(e,t,n,r,i){for(let a of this.boxes)a.maxX>e&&a.minX<n&&a.maxZ>t&&a.minZ<r&&i.push(a)}};function td(e,t,n,r){return{minX:e-n/2,minZ:t-r/2,maxX:e+n/2,maxZ:t+r/2}}function nd(){return new ed([td(-40,-40,30,30),td(40,-40,30,30),td(-40,40,30,30),td(40,45,30,20),td(0,-70,60,12),td(75,0,10,50),td(-70,0,8,30),td(20,15,1,1),td(24,15,1,1),td(28,15,1,1),td(0,40,20,4)],{minX:-120,minZ:-120,maxX:120,maxZ:120})}var Y={target:36,spawnMin:80,spawnMax:140,despawn:165,initialMin:18,offscreen:70,spawnPerStep:2,mix:[{type:`rickshaw`,weight:5},{type:`taxi`,weight:4},{type:`motorbike`,weight:4},{type:`bus`,weight:1},{type:`truck`,weight:1}],laneMargin:.6,typeSpeed:{rickshaw:.85,taxi:1.05,motorbike:1.15,bus:.8,truck:.8,police:1.1},cruiseMin:.85,cruiseMax:1.1,planDecel:4,steerLook:3.5,steerLookPerMs:.45,sampleStep:2.5,scanBase:7,scanPerMs:1.5,scanMax:32,corridorMargin:.35,minGap:1.8,gapPerMs:.6,goAroundAfter:1.2,maxOffset:1.3,offsetSpeed:1.6,honkAfter:1.4,honkEvery:3.2,honkJitter:1.5,reverseAfter:5,reverseTime:1.3,deadlockAfter:2.5,stuckDespawn:15,holdMax:7,waitMax:12,exitClear:4.5,resnap:7},rd={target:55,spawnMin:55,spawnMax:95,despawn:115,initialMin:10,spawnPerStep:2,walkMin:1.1,walkMax:1.6,pauseChance:.12,pauseMin:1,pauseMax:4,arrive:.7,fleeSpeed:5,fleeMin:2.5,fleeMax:4.5,carDanger:7,carDangerSpeed:8,explodeRadius:26,punchRadius:12,crashRadius:12,crashImpact:7,hitRadius:10,stuckTime:3},id={perZone:2,length:2.1,width:.85,speed:.7,turnRate:1.2,idleMin:3,idleMax:10,roamChance:.25,roamRadius:22,mass:600,bounce:.35,dazeTime:1.6,dazeSpeed:3},ad={min:.4,max:1,window:4,lowFps:45,step:.15,weakStart:.7};function od(){return{cows:[]}}var sd=Ul(),cd=Ul(),ld=Hl(),ud=[];function dd(e,t){return Wl(t,e.x,e.z,e.heading,id.width/2,id.length/2)}function fd(e,t,n,r){Wl(sd,t,n,r,id.width/2+.3,id.length/2+.3);let{ex:i,ez:a}=Kl(sd);ud.length=0,e.static.query(t-i,n-a,t+i,n+a,ud);for(let e of ud)if(Jl(sd,Gl(cd,e),ld))return!1;for(let r of e.vehicles)if(Math.hypot(r.x-t,r.z-n)<8&&Jl(sd,hu(r,cd),ld))return!1;return!0}function pd(e,t,n){n.x=$l(e.rng,t.minX+1.5,Math.max(t.minX+1.6,t.maxX-1.5)),n.z=$l(e.rng,t.minZ+1.5,Math.max(t.minZ+1.6,t.maxZ-1.5))}var md={x:0,z:0};function hd(e,t){t.cowZones.forEach((t,n)=>{for(let r=0;r<id.perZone;r++)for(let r=0;r<20;r++){pd(e,t,md);let r=Ql(e.rng)*Math.PI*2-Math.PI;if(fd(e,md.x,md.z,r)){e.animals.cows.push({id:e.nextId++,x:md.x,z:md.z,heading:r,px:md.x,pz:md.z,pHeading:r,vx:0,vz:0,zone:n,tx:md.x,tz:md.z,idleT:$l(e.rng,0,id.idleMax),dazeT:0,walkT:0,walkDist:0});break}}})}function gd(e,t){let n=e.city;for(let r of e.animals.cows){if(r.px=r.x,r.pz=r.z,r.pHeading=r.heading,r.dazeT>0)r.dazeT=Math.max(0,r.dazeT-t),_d(r,6*t);else if(r.idleT>0)r.idleT=Math.max(0,r.idleT-t),_d(r,4*t),r.idleT===0&&n&&vd(e,n,r);else{let n=r.tx-r.x,i=r.tz-r.z,a=Math.hypot(n,i);if(r.walkT+=t,a<1||r.walkT>40)r.idleT=$l(e.rng,id.idleMin,id.idleMax),r.walkT=0;else{let e=nu(Math.atan2(n,-i)-r.heading),a=id.turnRate*t;r.heading=nu(r.heading+(Math.abs(e)<a?e:Math.sign(e)*a));let o=Math.abs(e)>1.2?id.speed*.3:id.speed;r.vx=tu(r.vx,Math.sin(r.heading)*o,2*t),r.vz=tu(r.vz,-Math.cos(r.heading)*o,2*t)}}r.x+=r.vx*t,r.z+=r.vz*t,r.walkDist+=Math.hypot(r.vx,r.vz)*t}}function _d(e,t){e.vx=tu(e.vx,0,t),e.vz=tu(e.vz,0,t)}function vd(e,t,n){let r=t.cowZones[n.zone];if(n.walkT=0,Ql(e.rng)<id.roamChance){let i=t.lanes.nodes;for(let t=0;t<12;t++){let t=i[Math.floor(Ql(e.rng)*i.length)],a=Math.max(r.minX-t.x,0,t.x-r.maxX),o=Math.max(r.minZ-t.z,0,t.z-r.maxZ);if(!(Math.hypot(a,o)>id.roamRadius)){n.tx=t.x,n.tz=t.z;return}}}pd(e,r,md),n.tx=md.x,n.tz=md.z}function yd(e){for(let t of e.animals.cows){for(let n=0;n<2;n++){dd(t,sd);let{ex:n,ez:r}=Kl(sd);ud.length=0,e.static.query(t.x-n,t.z-r,t.x+n,t.z+r,ud);let i=!1;for(let e of ud){if(!Jl(dd(t,sd),Gl(cd,e),ld))continue;i=!0,t.x+=ld.nx*ld.depth,t.z+=ld.nz*ld.depth;let n=t.vx*ld.nx+t.vz*ld.nz;n<0&&(t.vx-=ld.nx*n,t.vz-=ld.nz*n)}if(!i)break;t.idleT===0&&t.dazeT===0&&(t.walkT+=1)}let n=e.static.bounds;t.x=Math.max(n.minX+1,Math.min(n.maxX-1,t.x)),t.z=Math.max(n.minZ+1,Math.min(n.maxZ-1,t.z));for(let n of e.vehicles){let r=n.x-t.x,i=n.z-t.z;if(r>12||r<-12||i>12||i<-12)continue;let a=Bl[n.type],o=(a.length+a.width)/2+id.length/2;if(Math.abs(r)>o||Math.abs(i)>o||!Jl(hu(n,sd),dd(t,cd),ld))continue;let s=1/a.mass,c=1/id.mass,l=ld.depth/(s+c);n.x+=ld.nx*l*s,n.z+=ld.nz*l*s,t.x-=ld.nx*l*c,t.z-=ld.nz*l*c;let u=(n.vx-t.vx)*ld.nx+(n.vz-t.vz)*ld.nz;if(u>=0)continue;let d=-(1+id.bounce)*u/(s+c);n.vx+=ld.nx*d*s,n.vz+=ld.nz*d*s,t.vx-=ld.nx*d*c,t.vz-=ld.nz*d*c;let f=Math.hypot(t.vx,t.vz);f>5&&(t.vx*=5/f,t.vz*=5/f),-u>id.dazeSpeed&&t.dazeT===0&&(t.dazeT=id.dazeTime,t.idleT=0,e.events.push({type:`cowHit`,vehicle:n.id,cow:t.id,speed:-u}))}let r=e.peds;bd(e.player.walker,t);for(let e of r)bd(e,t)}}function bd(e,t){e.hidden||Math.abs(e.x-t.x)>2||Math.abs(e.z-t.z)>2||Yl(e.x,e.z,r.radius,dd(t,sd),ld)&&(e.x+=ld.nx*ld.depth,e.z+=ld.nz*ld.depth)}var xd={Vehicle:0,Walker:1,Cow:2},Sd=12,Cd=[],wd=0,Td=0,Ed=0,Dd=1,Od=1,kd=new Int32Array(1),Ad=new Int32Array(64);function jd(){return wd===Cd.length&&Cd.push({kind:xd.Vehicle,idx:0,id:0,x:0,z:0,vx:0,vz:0,heading:0,halfL:0,halfW:0,still:!1}),Cd[wd++]}function Md(e){wd=0;let t=e.static.bounds;Td=t.minX,Ed=t.minZ;let n=Math.max(1,Math.ceil((t.maxX-t.minX)/Sd)),r=Math.max(1,Math.ceil((t.maxZ-t.minZ)/Sd));(n!==Dd||r!==Od||kd.length!==n*r)&&(Dd=n,Od=r,kd=new Int32Array(Dd*Od)),kd.fill(-1);for(let t=0;t<e.vehicles.length;t++){let n=e.vehicles[t],r=Bl[n.type],i=jd();i.kind=xd.Vehicle,i.idx=t,i.id=n.id,i.x=n.x,i.z=n.z,i.vx=n.vx,i.vz=n.vz,i.heading=n.heading,i.halfL=r.length/2,i.halfW=r.width/2,i.still=n.driver===`none`||n.stage===`wreck`}let i=e.player.walker;i.hidden||Nd(-1,i.id,i.x,i.z,i.vx,i.vz,i.heading,i.knockT>0);for(let t=0;t<e.peds.length;t++){let n=e.peds[t];n.hidden||Nd(t,n.id,n.x,n.z,n.vx,n.vz,n.heading,n.knockT>0)}for(let t=0;t<e.animals.cows.length;t++){let n=e.animals.cows[t],r=jd();r.kind=xd.Cow,r.idx=t,r.id=n.id,r.x=n.x,r.z=n.z,r.vx=n.vx,r.vz=n.vz,r.heading=n.heading,r.halfL=id.length/2,r.halfW=id.width/2,r.still=!0}Ad.length<wd&&(Ad=new Int32Array(wd*2));for(let e=0;e<wd;e++){let t=Pd(Cd[e].x,Cd[e].z);Ad[e]=kd[t],kd[t]=e}}function Nd(e,t,n,i,a,o,s,c){let l=jd();l.kind=xd.Walker,l.idx=e,l.id=t,l.x=n,l.z=i,l.vx=a,l.vz=o,l.heading=s,l.halfL=c?.9:r.radius,l.halfW=r.radius,l.still=c}function Pd(e,t){let n=Math.floor((e-Td)/Sd),r=Math.floor((t-Ed)/Sd);return n=n<0?0:n>=Dd?Dd-1:n,r=r<0?0:r>=Od?Od-1:r,r*Dd+n}function Fd(e,t,n,r){r.length=0;let i=Math.max(0,Math.floor((e-n-Td)/Sd)),a=Math.min(Dd-1,Math.floor((e+n-Td)/Sd)),o=Math.max(0,Math.floor((t-n-Ed)/Sd)),s=Math.min(Od-1,Math.floor((t+n-Ed)/Sd)),c=n*n;for(let n=o;n<=s;n++)for(let o=i;o<=a;o++)for(let i=kd[n*Dd+o];i>=0;i=Ad[i]){let n=Cd[i],a=n.x-e,o=n.z-t;a*a+o*o<=c&&r.push(n)}return r}function Id(){return{agents:[],stats:{spawned:0,removed:0}}}var Ld=16,Rd=new WeakMap;function zd(e){let t=Rd.get(e);if(t)return t;let n=1/0,r=1/0,i=-1/0,a=-1/0;for(let t of e.nodes)n=Math.min(n,t.x),r=Math.min(r,t.z),i=Math.max(i,t.x),a=Math.max(a,t.z);let o=Math.ceil((i-n)/Ld)+1,s=Math.ceil((a-r)/Ld)+1,c=[];for(let e=0;e<o*s;e++)c.push([]);return e.nodes.forEach((t,i)=>{e.adj[i].length&&c[Math.floor((t.z-r)/Ld)*o+Math.floor((t.x-n)/Ld)].push(i)}),t={minX:n,minZ:r,nx:o,nz:s,cells:c},Rd.set(e,t),t}function Bd(e,t,n){let r=zd(e),i=Math.floor((t-r.minX)/Ld),a=Math.floor((n-r.minZ)/Ld),o=-1,s=1/0;for(let c=0;c<6;c++){for(let l=a-c;l<=a+c;l++)if(!(l<0||l>=r.nz)){for(let u=i-c;u<=i+c;u++)if(!(u<0||u>=r.nx)&&Math.max(Math.abs(u-i),Math.abs(l-a))===c)for(let i of r.cells[l*r.nx+u]){let r=Math.hypot(e.nodes[i].x-t,e.nodes[i].z-n);r<s&&(s=r,o=i)}}if(o>=0&&s<c*Ld)break}return o}function Vd(e){return Math.round(rd.target*e.traffic.density)}function Hd(e,t){let n=Vd(e);for(let r=0;r<n*20&&e.pedAI.agents.length<n;r++)Ud(e,t.peds,rd.initialMin,rd.spawnMax)}function Ud(e,t,n,r){if(t.nodes.length===0)return!1;let i=e.player.walker,a=Math.floor(Ql(e.rng)*t.nodes.length);if(t.adj[a].length===0)return!1;let o=t.nodes[a],s=Math.hypot(o.x-i.x,o.z-i.z);if(s<n||s>r)return!1;let c=t.adj[a][Math.floor(Ql(e.rng)*t.adj[a].length)],l=Ql(e.rng),u=t.nodes[c],d=o.x+(u.x-o.x)*l,f=o.z+(u.z-o.z)*l,p=ru(e.nextId++,`npc`,d,f,Math.atan2(u.x-o.x,-(u.z-o.z)));return e.peds.push(p),e.pedAI.agents.push(Wd(e,p,a,c)),e.pedAI.stats.spawned++,!0}function Wd(e,t,n,r){return{w:t,from:n,to:r,speed:$l(e.rng,rd.walkMin,rd.walkMax),pauseT:0,fleeT:0,fx:0,fz:0,stuckT:0,lastD:1/0}}var Gd=[],Kd=new Set;function qd(e,t){let n=e.city;if(!n)return;let i=n.peds,a=e.pedAI,o=e.player.walker;if(e.tick%30==0){Kd.clear();for(let e of a.agents)Kd.add(e.w.id);for(let t of e.peds){if(Kd.has(t.id)||t.hidden)continue;let n=Bd(i,t.x,t.z);n>=0&&a.agents.push(Wd(e,t,n,n))}}for(let n=a.agents.length-1;n>=0;n--){let s=a.agents[n],c=s.w;if(Math.hypot(c.x-o.x,c.z-o.z)>rd.despawn||e.peds.indexOf(c)<0){a.agents.splice(n,1);let t=e.peds.indexOf(c);t>=0&&e.peds.splice(t,1),a.stats.removed++;continue}if(c.wishX=0,c.wishY=0,iu(c))continue;if((e.tick+n)%6==0&&s.fleeT<=0){Fd(c.x,c.z,rd.carDanger,Gd);for(let t of Gd){if(t.kind!==xd.Vehicle)continue;let n=Math.hypot(t.vx,t.vz);if(n<rd.carDangerSpeed)continue;let r=c.x-t.x,i=c.z-t.z,a=Math.hypot(r,i)||1;if((r*t.vx+i*t.vz)/a<n*.4)continue;let o=t.vx*i-t.vz*r>=0?1:-1;Jd(e,s,-t.vz/n*o,t.vx/n*o,.5);break}}let l=0,u=0,d=0;if(s.fleeT>0){if(s.fleeT-=t,l=s.fx,u=s.fz,d=rd.fleeSpeed,s.fleeT<=0){let e=Bd(i,c.x,c.z);e>=0&&(s.from=s.to=e),s.lastD=1/0}}else if(s.pauseT>0)s.pauseT-=t;else{let n=i.nodes[s.to],r=n.x-c.x,a=n.z-c.z,o=Math.hypot(r,a);if(o<rd.arrive){let t=i.adj[s.to],n=s.from;if(t.length===1)n=t[0];else if(t.length>1)for(let r=0;r<4&&(n=t[Math.floor(Ql(e.rng)*t.length)],n===s.from);r++);s.from=s.to,s.to=n,s.lastD=1/0,Ql(e.rng)<rd.pauseChance&&(s.pauseT=$l(e.rng,rd.pauseMin,rd.pauseMax));let l=i.nodes[s.to];r=l.x-c.x,a=l.z-c.z,o=Math.hypot(r,a)}if(o>.001&&(l=r/o,u=a/o,d=s.speed),o<s.lastD-.02)s.lastD=o,s.stuckT=0;else if(s.stuckT+=t,s.stuckT>rd.stuckTime){let e=s.from;s.from=s.to,s.to=e,s.stuckT=0,s.lastD=1/0}}if(d>0){let e=d/r.runSpeed;c.wishX=l*e,c.wishY=-u*e}}let s=Vd(e);for(let t=0;t<rd.spawnPerStep&&a.agents.length<s;t++)Ud(e,i,rd.spawnMin,rd.spawnMax)}function Jd(e,t,n,r,i){let a=Math.hypot(n,r);if(a<1e-6){let t=Ql(e.rng)*Math.PI*2;n=Math.cos(t),r=Math.sin(t)}else n/=a,r/=a;t.fx=n,t.fz=r,t.fleeT=Math.max(t.fleeT,$l(e.rng,rd.fleeMin,rd.fleeMax)*(.5+i)),t.pauseT=0}function Yd(e,t,n,r){for(let i of e.pedAI.agents){let a=i.w.x-t,o=i.w.z-n;a*a+o*o>r*r||Jd(e,i,a,o,1)}}function Xd(e){if(e.city&&e.pedAI.agents.length!==0){for(let t of e.events)if(t.type===`explode`)Yd(e,t.x,t.z,rd.explodeRadius);else if(t.type===`crash`&&t.impact>rd.crashImpact)Yd(e,t.x,t.z,rd.crashRadius);else if(t.type===`punch`&&t.hit>=0){let n=e.player.walker;t.walker===n.id&&Yd(e,n.x,n.z,rd.punchRadius)}else if(t.type===`pedHit`){let n=e.vehicles.find(e=>e.id===t.vehicle);n&&Yd(e,n.x,n.z,rd.hitRadius)}}}var Zd=new WeakMap,Qd=16;function $d(e){let t=Zd.get(e);if(t)return t;let n=1/0,r=1/0,i=-1/0,a=-1/0;for(let t of e.nodes)n=Math.min(n,t.x),r=Math.min(r,t.z),i=Math.max(i,t.x),a=Math.max(a,t.z);n-=Qd,r-=Qd;let o=Math.ceil((i-n)/Qd)+2,s=Math.ceil((a-r)/Qd)+2,c=[];for(let e=0;e<o*s;e++)c.push([]);let l=e.edges.length,u=new Float64Array(l),d=new Float64Array(l),f=new Uint8Array(l),p=new Uint8Array(l);for(let t of e.edges){let i=e.nodes[t.from],a=e.nodes[t.to],s=Math.max(1e-6,t.length);u[t.id]=(a.x-i.x)/s,d[t.id]=(a.z-i.z)/s,f[t.id]=ef(u[t.id],d[t.id]);let l=Math.floor((Math.min(i.x,a.x)-n)/Qd),p=Math.floor((Math.max(i.x,a.x)-n)/Qd),m=Math.floor((Math.min(i.z,a.z)-r)/Qd),h=Math.floor((Math.max(i.z,a.z)-r)/Qd);for(let e=m;e<=h;e++)for(let n=l;n<=p;n++)c[e*o+n].push(t.id)}for(let t of e.edges){if(t.kind!==`junction`||t.length<.001)continue;let n=e.inEdges[t.from],r=e.outEdges[t.to];if(n.length&&r.length){let i=n[0],a=r[0];u[i]*u[a]+d[i]*d[a]<-.9&&e.edges[i].kind===`lane`&&e.edges[a].kind===`lane`&&(p[t.id]=1)}}return t={minX:n,minZ:r,cell:Qd,nx:o,nz:s,cells:c,dx:u,dz:d,dir:f,uturn:p},Zd.set(e,t),t}function ef(e,t){return Math.abs(e)>Math.abs(t)?e>0?1:3:t>0?2:0}function tf(e,t,n,r,i=0,a=0,o=-2,s=!1,c){let l=$d(e),u=Math.ceil(r/l.cell),d=Math.floor((t-l.minX)/l.cell),f=Math.floor((n-l.minZ)/l.cell),p=-1,m=r,h=0;for(let r=f-u;r<=f+u;r++)if(!(r<0||r>=l.nz)){for(let c=d-u;c<=d+u;c++)if(!(c<0||c>=l.nx))for(let u of l.cells[r*l.nx+c]){let r=e.edges[u];if(s&&r.kind!==`lane`||i*l.dx[u]+a*l.dz[u]<o)continue;let c=e.nodes[r.from],d=(t-c.x)*l.dx[u]+(n-c.z)*l.dz[u];d=d<0?0:d>r.length?r.length:d;let f=Math.hypot(c.x+l.dx[u]*d-t,c.z+l.dz[u]*d-n);(f<m||f===m&&u<p)&&(m=f,p=u,h=d)}}if(p<0)return null;let g=c??{edge:0,s:0,dist:0};return g.edge=p,g.s=h,g.dist=m,g}function nf(e,t,n,r=!0){let i=$d(e),a=e.outEdges[e.edges[t].to];if(a.length===0)return-1;if(a.length===1)return a[0];let o=0,s=rf;s.length=0;for(let e of a){let n=1;r&&i.uturn[e]?n=.001:i.dx[e]*i.dx[t]+i.dz[e]*i.dz[t]>.95&&(n=2),s.push(n),o+=n}let c=Ql(n)*o;for(let e=0;e<a.length;e++)if(c-=s[e],c<=0)return a[e];return a[a.length-1]}var rf=[];function af(e,t,n,r,i,a){let o=$d(e),s=0,c=n+r;for(;s<t.length-1&&c>e.edges[t[s]].length;)c-=e.edges[t[s]].length,s++;let l=e.edges[t[s]];c>l.length&&(c=l.length+(c-l.length));let u=e.nodes[l.from],d=o.dx[l.id],f=o.dz[l.id];a.x=u.x+d*c-f*i,a.z=u.z+f*c+d*i,a.dx=d,a.dz=f,a.edge=l.id}function of(e,t,n){let r=-n;for(let n of t)r+=e.edges[n].length;return r}function sf(e,t,n,r=4e3){let i=e.nodes.length;cf.length!==i&&(cf=new Float64Array(i),lf=new Int32Array(i),uf=new Int32Array(i)),df++;let a=e.edges[t].to,o=e.edges[n].from;ff.length=0;let s=(e,t)=>{ff.push(t,e);let n=ff.length/2-1;for(;n>0;){let e=n-1>>1;if(ff[e*2]<=ff[n*2])break;pf(n,e),n=e}},c=()=>{let e=ff[1],t=ff[ff.length-2],n=ff[ff.length-1];if(ff.length-=2,ff.length){ff[0]=t,ff[1]=n;let e=0,r=ff.length/2;for(;;){let t=e*2+1,n=t+1,i=e;if(t<r&&ff[t*2]<ff[i*2]&&(i=t),n<r&&ff[n*2]<ff[i*2]&&(i=n),i===e)break;pf(e,i),e=i}}return e};uf[a]=df,cf[a]=0,lf[a]=-1,s(a,0);let l=0;for(;ff.length;){let t=ff[0],n=c();if(!(t>cf[n])){if(n===o)break;if(++l>r)return null;for(let r of e.outEdges[n]){let n=e.edges[r],i=t+n.length+(n.kind===`junction`?2:0);(uf[n.to]!==df||i<cf[n.to])&&(uf[n.to]=df,cf[n.to]=i,lf[n.to]=r,s(n.to,i))}}}if(uf[o]!==df)return null;let u=[n],d=o;for(;d!==a;){let t=lf[d];if(t<0)return null;u.push(t),d=e.edges[t].from}return u.reverse(),u}var cf=new Float64Array,lf=new Int32Array,uf=new Int32Array,df=0,ff=[];function pf(e,t){let n=ff[e*2],r=ff[e*2+1];ff[e*2]=ff[t*2],ff[e*2+1]=ff[t*2+1],ff[t*2]=n,ff[t*2+1]=r}function mf(e,t){return{count:Array(e).fill(0),axis:Array(e).fill(-1),since:Array(e).fill(0),wait:Array(2*e).fill(0),prevWait:Array(2*e).fill(0),roundabout:t}}function hf(e,t){e.count.fill(0);for(let n of t)n.holding>=0&&e.count[n.holding]++;for(let t=0;t<e.axis.length;t++)e.count[t]===0&&(e.axis[t]=-1);for(let t=0;t<e.wait.length;t++)e.prevWait[t]=e.wait[t],e.wait[t]=0}function gf(e,t,n,r){return{v:e,route:t,s:n,offset:0,offsetTarget:0,cruise:r,blockedT:0,blockedBy:-1,passId:-1,passClearT:0,passTryT:0,ignoreId:-1,ignoreT:0,stuckT:0,idleT:0,reverseT:0,honkCd:0,hornT:0,waitT:0,holding:-1,lost:!1}}var _f=[],vf={x:0,z:0,dx:0,dz:0,edge:0},yf={edge:0,s:0,dist:0},bf=16,xf=new Float64Array(bf),Sf=new Float64Array(bf),Cf=new Float64Array(bf),wf=new Float64Array(bf),Tf=new Float64Array(bf),Ef=new Float64Array(bf),Df=0,Of={o:null,gap:1/0,speed:0,latC:0,halfLat:0,halfAlong:0,creepGap:1/0};function kf(e,t,n,r){let i=$d(e),a=t.v,o=0;for(let s=0;s<6;s++){let s=t.route[0],c=e.edges[s],l=e.nodes[c.from],u=i.dx[s],d=i.dz[s],f=(a.x-l.x)*u+(a.z-l.z)*d;if(o=-(a.x-l.x)*d+(a.z-l.z)*u,t.s=f<0?0:f>c.length?c.length:f,t.route.length<2){if(!r)break;let i=nf(e,s,n);if(i<0)break;t.route.push(i)}let p=t.route[1],m=e.nodes[e.edges[p].from],h=(a.x-m.x)*i.dx[p]+(a.z-m.z)*i.dz[p],g=-(a.x-m.x)*i.dz[p]+(a.z-m.z)*i.dx[p];if(f>=c.length-.05||h>.2&&Math.abs(g-t.offset)<Math.abs(o-t.offset)){t.route.shift();continue}break}if(r)for(;t.route.length<8&&of(e,t.route,t.s)<50;){let r=nf(e,t.route[t.route.length-1],n);if(r<0)break;t.route.push(r)}if(t.holding>=0&&e.edges[t.route[0]].kind===`lane`&&(t.route.length<2||e.edges[t.route[1]].intersection!==t.holding)&&(t.holding=-1),Math.abs(o-t.offset)>Y.resnap){let n=Math.sin(a.heading),r=-Math.cos(a.heading);if(!tf(e,a.x,a.z,12,n,r,.3,!1,yf))return t.lost=!0,!1;t.route.length=0,t.route.push(yf.edge),t.s=yf.s,t.offset=t.offsetTarget=0,t.passId=-1,t.holding=-1,e.edges[yf.edge].kind!==`lane`&&(t.holding=e.edges[yf.edge].intersection)}return t.lost=!1,!0}function Af(e,t,n){Df=0;let r=Y.sampleStep,i=t.v,a=Math.sin(i.heading),o=-Math.cos(i.heading);for(let s=0;s<=n&&Df<bf;s+=r){let n=Math.min(1,s/6),r=t.offset+(t.offsetTarget-t.offset)*n;af(e,t.route,t.s,s,0,vf);let c=-vf.dz,l=vf.dx,u=Math.min(1,s/8),d=(i.x+a*s)*(1-u)+(vf.x+c*r)*u,f=(i.z+o*s)*(1-u)+(vf.z+l*r)*u;xf[Df]=d,Sf[Df]=f,Cf[Df]=vf.dx,wf[Df]=vf.dz,Tf[Df]=s,Ef[Df]=(d-vf.x)*c+(f-vf.z)*l,Df++}}function jf(e,t,n,r,i){i.o=null,i.gap=1/0,i.creepGap=1/0;let a=e.v;if(Df===0)return;let o=Df-1;Fd((xf[0]+xf[o])/2,(Sf[0]+Sf[o])/2,Math.hypot(xf[o]-xf[0],Sf[o]-Sf[0])/2+6,_f);for(let o of _f){if(o.kind===xd.Vehicle&&o.id===a.id||o.id===r||o.kind===xd.Vehicle&&o.id===e.ignoreId)continue;let s=-1,c=1/0;for(let e=0;e<Df;e++){let t=o.x-xf[e],n=o.z-Sf[e],r=t*t+n*n;r<c&&(c=r,s=e)}let l=Cf[s],u=wf[s],d=o.x-xf[s],f=o.z-Sf[s],p=d*l+f*u,m=-d*u+f*l,h=Math.atan2(l,-u),g=o.heading-h,_=Math.abs(Math.cos(g)),v=Math.abs(Math.sin(g)),y=_*o.halfL+v*o.halfW,b=v*o.halfL+_*o.halfW;if(Math.abs(m)>=n+b+Y.corridorMargin)continue;let x=Tf[s]+p-t-y;if(o.id===e.passId&&Math.abs(m+Ef[s]-e.offsetTarget)>=n+b+.1){x<i.creepGap&&(i.creepGap=x);continue}if(!(x<-t*.5)&&!(s===0&&p<-.2)&&x<i.gap){i.o=o,i.gap=x;let e=o.vx*l+o.vz*u,t=-o.vx*u+o.vz*l;i.speed=Math.abs(t)>1.5?Math.min(0,e):e,i.latC=m+Ef[s],i.halfLat=b,i.halfAlong=y}}}function Mf(e,t,n,r,i){let a=t.v;af(e,t.route,t.s,10,n,vf),Fd(vf.x,vf.z,26,_f);let o=vf.dx,s=vf.dz;for(let e of _f){if(e.kind===xd.Vehicle&&e.id===a.id||e.id===i)continue;let c=e.x-a.x,l=e.z-a.z,u=c*o+l*s,d=-c*s+l*o+t.offset,f=Math.atan2(o,-s),p=e.heading-f,m=Math.abs(Math.sin(p))*e.halfL+Math.abs(Math.cos(p))*e.halfW;if(Math.abs(d-n)>=r+m+Y.corridorMargin)continue;let h=e.vx*o+e.vz*s<-1?30:14;if(u>-4&&u<h)return!1}return!0}function Nf(e,t,n,r,i,a,o){let s=n.v,c=Bl[s.type],l=c.length/2,u=c.width/2,d=mu(s);n.honkCd=Math.max(0,n.honkCd-o),n.hornT=Math.max(0,n.hornT-o),n.ignoreT>0&&(n.ignoreT=Math.max(0,n.ignoreT-o),n.ignoreT===0&&(n.ignoreId=-1));let f=t.edges[n.route[0]];f.kind!==`lane`&&n.holding<0&&f.intersection>=0&&(n.holding=f.intersection,r.count[n.holding]++);let p=f.width*Y.maxOffset;n.offsetTarget>p&&(n.offsetTarget=p),n.offsetTarget<-p&&(n.offsetTarget=-p),f.kind!==`lane`&&n.passId<0&&(n.offsetTarget=0),n.offset=tu(n.offset,n.offsetTarget,Y.offsetSpeed*o);let m=Y.typeSpeed[s.type]*n.cruise*i.speedMul,h=c.maxSpeed*.95,g=Math.min(h,f.speed*m);{let e=f.length-n.s;for(let r=1;r<n.route.length&&e<60;r++){let i=t.edges[n.route[r]],a=Math.min(h,i.speed*m),o=Math.sqrt(a*a+2*Y.planDecel*Math.max(0,e-l));o<g&&(g=o),e+=i.length}}Af(t,n,Math.min(Y.scanMax,Y.scanBase+Y.scanPerMs*Math.max(0,d))),jf(n,l,u,-1,Of);let _=!1;if(Of.creepGap<6&&g>3&&(g=3),Of.o){let e=Y.minGap+Y.gapPerMs*Math.max(0,d),t=Math.max(0,Of.speed)+(Of.gap-e)*.9;Of.gap<Y.minGap*.6&&(t=0),t<0&&(t=0),t<g&&(g=t,_=g<1.5)}let v=!1,y=!1;if(i.giveWay&&n.holding<0&&f.kind===`lane`&&n.route.length>1){let i=t.edges[n.route[1]],a=i.intersection;if(i.kind===`junction`&&a>=0&&!r.roundabout[a]){let i=f.length-n.s-l-.4;if(i<14){y=!0;let s=$d(t).dir[f.id]&1,c=Pf(e,t,n,r,a,s);if(c&&i<3+Math.max(0,d)*.8)n.holding=a,r.count[a]===0&&(r.since[a]=e.time),r.count[a]++,r.axis[a]=s,n.waitT=0;else if(!c){v=!0;let e=i>.3?Math.sqrt(2*Y.planDecel*i):0;if(e<g&&(g=e),i<6){n.waitT+=o;let e=a*2+s;n.waitT>r.wait[e]&&(r.wait[e]=n.waitT)}}}}}if(_&&Of.o){n.blockedT+=o,n.blockedBy=Of.o.kind===xd.Vehicle?Of.o.id:-1;let r=Of.o,c=r.kind===xd.Vehicle?a.get(r.id):void 0,l=r.still||Math.hypot(r.vx,r.vz)<.5&&(!c||c.blockedT>3&&c.waitT===0),d=r.kind===xd.Walker?r.idx===-1:r.id===e.player.vehicleId;if(!i.urgent&&n.honkCd===0&&n.blockedT>(d?Y.honkAfter:Y.honkAfter*2)&&(n.hornT=.35,n.honkCd=Y.honkEvery+Ql(e.rng)*Y.honkJitter,e.events.push({type:`horn`,vehicle:s.id})),n.passTryT=Math.max(0,n.passTryT-o),l&&n.passTryT===0&&n.blockedT>Y.goAroundAfter*(i.urgent?.4:1)&&Of.gap<8){n.passTryT=.6;let e=Of.halfLat+u+.45,i=Of.latC+e,a=Of.latC-e,o=f.width*Y.maxOffset,s=Math.abs(i)<=Math.abs(a)+.5?i:a,c=s===i?a:i;for(let e of[s,c])if(!(Math.abs(e)>o)&&Mf(t,n,e,u,r.id)){n.offsetTarget=e,n.passId=r.id,n.passClearT=0;break}}if(c&&n.ignoreId<0){let e=c.blockedBy===s.id&&n.blockedT>Y.deadlockAfter&&c.blockedT>Y.deadlockAfter&&s.id>c.v.id,t=n.holding>=0&&c.holding<0&&c.waitT>0&&n.blockedT>1,r=n.blockedT>Y.deadlockAfter*4&&pu(c.v)<.5;(e||t||r)&&(n.ignoreId=c.v.id,n.ignoreT=3)}}else n.blockedT=Math.max(0,n.blockedT-o*2),_||(n.blockedBy=-1);(!y||n.holding>=0)&&(n.waitT=0),n.passId>=0&&(n.passClearT=Of.o!==null&&Of.o.id===n.passId?0:n.passClearT+o,n.passClearT>.8&&(Mf(t,n,0,u,-1)||n.passClearT>4)&&(n.passId=-1,n.offsetTarget=0)),n.ignoreId>=0&&g<2&&(g=2),n.idleT=Math.abs(d)<.5?n.idleT+o:0;let b=_&&n.passId>=0&&Of.gap<.6;n.reverseT===0&&(g>2||b)&&Math.abs(d)<.3&&!v?n.stuckT+=o:Math.abs(d)>1&&(n.stuckT=0),n.stuckT>Y.reverseAfter&&(n.stuckT=0,n.reverseT=Y.reverseTime);let x=Y.steerLook+Y.steerLookPerMs*Math.max(0,d);af(t,n.route,n.s,x+l*.5,n.offsetTarget,vf);let S=nu(Math.atan2(vf.x-s.x,-(vf.z-s.z))-s.heading),C=Math.max(1,Math.hypot(vf.x-s.x,vf.z-s.z)),w=Math.abs(d),T=Math.min(1,w/c.turnFullSpeed)*(1-c.falloff*Math.min(1,w/c.maxSpeed)),E;E=T>.15?w*2*Math.sin(S)/C/(c.turn*T):S*2.5,E=E>1?1:E<-1?-1:E;let D=0,O=0,k=!1;if(n.reverseT>0)n.reverseT=Math.max(0,n.reverseT-o),O=.8,E=-E;else if(g<.3&&d<.8)k=!0;else{let e=g-d;d<-.3?D=1:e>0?D=Math.min(1,e*.6+.2):e<-.4&&d>.6&&(O=Math.min(1,Math.max(.15,-e*.35)))}return s.inThrottle=D,s.inBrake=O,s.inSteer=E,s.inHandbrake=k,s.horn=n.hornT>0,g}function Pf(e,t,n,r,i,a){let o=i*2+(1-a),s;if(s=r.count[i]===0?!(r.prevWait[o]>n.waitT+.5):r.axis[i]===a&&!(e.time-r.since[i]>Y.holdMax&&r.prevWait[o]>.5),!s&&n.waitT>Y.waitMax&&(s=!0),!s)return!1;if(n.waitT>Y.waitMax)return!0;let c=$d(t);for(let e=1;e<n.route.length;e++){let r=t.edges[n.route[e]];if(r.kind!==`lane`)continue;let i=t.nodes[r.from];Fd(i.x+c.dx[r.id]*3,i.z+c.dz[r.id]*3,Y.exitClear,_f);for(let e of _f)if(!(e.kind!==xd.Vehicle||e.id===n.v.id||e.still)&&!(e.vx*c.dx[r.id]+e.vz*c.dz[r.id]>3))return!1;break}return!0}function Ff(){return{density:1,agents:[],junctions:null,spawned:[],stats:{spawned:0,removed:0,stuckRemoved:0}}}function If(e,t){e.traffic.density=Math.max(ad.min,Math.min(ad.max,t))}var Lf={speedMul:1,giveWay:!0,extend:!0,urgent:!1},Rf=new WeakMap;function zf(e){let t=Rf.get(e);return t||(t=e.edges.filter(e=>e.kind===`lane`&&e.length>8).map(e=>e.id),Rf.set(e,t)),t}function Bf(e){return e.player.walker}function Vf(e,t){let n=e.traffic,r=t.streets.intersections.map(e=>e.kind===`roundabout`);n.junctions=mf(t.streets.intersections.length,r);let i=Hf(e);for(let r=0;r<i*20&&n.agents.length<i;r++)Zf(e,t.lanes,Y.initialMin,Y.spawnMax)}function Hf(e){return Math.round(Y.target*e.traffic.density)}function Uf(e,t,n){let r=e.city,i=e.traffic;if(!r||!i.junctions)return;let a=r.lanes,o=Bf(e);for(let r=i.agents.length-1;r>=0;r--){let s=i.agents[r],c=s.v;if(c.driver!==`npc`||c.stage===`wreck`){i.agents.splice(r,1);continue}let l=Math.hypot(c.x-o.x,c.z-o.z),u=l>Y.offscreen;if(l>Y.despawn||u&&s.idleT>Y.stuckDespawn){l<=Y.despawn&&i.stats.stuckRemoved++,i.agents.splice(r,1),Wf(e,c);continue}if(!kf(a,s,e.rng,!0)){if(u){i.agents.splice(r,1),Wf(e,c);continue}c.inThrottle=0,c.inBrake=0,c.inSteer=0,c.inHandbrake=!0;continue}Nf(e,a,s,i.junctions,Lf,t,n)}let s=Hf(e);for(let t=0;t<Y.spawnPerStep&&i.agents.length<s;t++)Zf(e,a,Y.spawnMin,Y.spawnMax);if(e.tick%30==0)for(let t=i.spawned.length-1;t>=0;t--){let n=i.spawned[t];n.driver!==`npc`&&n.driver!==`player`&&(Math.hypot(n.x-o.x,n.z-o.z)>Y.despawn||e.vehicles.indexOf(n)<0)&&(i.spawned.splice(t,1),Wf(e,n))}}function Wf(e,t){if(e.player.vehicleId===t.id)return;let n=e.vehicles.indexOf(t);n>=0&&(e.vehicles.splice(n,1),e.traffic.stats.removed++);let r=e.traffic.spawned.indexOf(t);r>=0&&e.traffic.spawned.splice(r,1)}function Gf(e,t){let n=0;for(let e of Y.mix)n+=e.weight;let r=Ql(e.rng)*n,i=Y.mix[0].type;for(let e of Y.mix)if(r-=e.weight,r<=0){i=e.type;break}return Bl[i].width+Y.laneMargin>t&&(i=Bl.rickshaw.width+Y.laneMargin<=t?`rickshaw`:`motorbike`),i}var Kf=Ul(),qf=Ul(),Jf=Hl(),Yf=[];function Xf(e,t,n,r,i,a){let o=Bl[t];Wl(Kf,n,r,i,o.width/2+a*.5,o.length/2+a);let{ex:s,ez:c}=Kl(Kf),l=e.static.bounds;if(n-s<l.minX||n+s>l.maxX||r-c<l.minZ||r+c>l.maxZ)return!1;Yf.length=0,e.static.query(n-s,r-c,n+s,r+c,Yf);for(let e of Yf)if(Jl(Kf,Gl(qf,e),Jf))return!1;let u=Math.hypot(o.length,o.width)/2+a+6;for(let t of e.vehicles){let e=t.x-n,i=t.z-r;if(!(e*e+i*i>u*u)&&Jl(Kf,hu(t,qf),Jf))return!1}return!0}function Zf(e,t,n,r){let i=zf(t);if(i.length===0)return!1;let a=Bf(e),o=$d(t),s=i[Math.floor(Ql(e.rng)*i.length)],c=t.edges[s],l=t.nodes[c.from],u=$l(e.rng,4,Math.max(4.1,c.length-4)),d=l.x+o.dx[s]*u,f=l.z+o.dz[s]*u,p=Math.hypot(d-a.x,f-a.z);if(p<n||p>r)return!1;let m=Gf(e,c.width),h=Math.atan2(o.dx[s],-o.dz[s]);if(!Xf(e,m,d,f,h,2.5))return!1;let g=ym(e,fu(0,m,d,f,h,`npc`)),_=$l(e.rng,Y.cruiseMin,Y.cruiseMax),v=gf(g,[s],u,_);v.route.push(nf(t,s,e.rng));let y=Math.min(c.speed*Y.typeSpeed[m]*_,Bl[m].maxSpeed)*.7;return g.vx=o.dx[s]*y,g.vz=o.dz[s]*y,g.inHandbrake=!1,e.traffic.agents.push(v),e.traffic.spawned.push(g),e.traffic.stats.spawned++,!0}function Qf(){return{stars:0,heat:0,seen:!1,unseenT:0,bust:0,lastSeenX:0,lastSeenZ:0,hitId:-1,hitAt:-10}}function $f(e){let t=0;for(let n of Ml.thresholds)e>=n&&t++;return t}function ep(e,t){let n=e.wanted;n.heat=Math.max(0,Math.min(Ml.maxHeat,t));let r=$f(n.heat);if(r!==n.stars){let t=n.stars;n.stars=r,r>t&&(n.unseenT=0),r===0&&(n.bust=0),e.events.push({type:`wantedChanged`,stars:r,prev:t})}}function tp(e,t){e.life.state===`alive`&&ep(e,e.wanted.heat+t)}function np(e){ep(e,0),e.wanted.unseenT=0,e.wanted.bust=0}var rp=[];function ip(e,t,n,r,i){let a=Math.hypot(r-t,i-n),o=Math.floor(a/2.5);for(let a=1;a<o;a++){let s=a/o,c=t+(r-t)*s,l=n+(i-n)*s;if(rp.length=0,e.query(c-.1,l-.1,c+.1,l+.1,rp),rp.length)return!1}return!0}function ap(e,t,n,r){for(let i of e.vehicles)if(op(i)&&!(Math.hypot(i.x-t,i.z-n)>r)&&ip(e.static,i.x,i.z,t,n))return!0;return!1}function op(e){return e.type===`police`&&e.driver===`npc`&&e.stage!==`wreck`}function sp(e){if(e.life.state!==`alive`||!e.city)return;let t=e.player,n=t.walker,r=()=>ap(e,n.x,n.z,Ml.witnessRange);for(let i of e.events)switch(i.type){case`pullOut`:tp(e,Ml.carjack*(r()?Ml.witnessMul:1));break;case`pedHit`:i.vehicle===t.vehicleId&&t.vehicleId>=0&&i.speed>Ml.pedHitSpeed&&tp(e,Ml.pedHit*(r()?Ml.witnessMul:1));break;case`punch`:i.walker===n.id&&i.hit>=0&&tp(e,Ml.punch*(r()?Ml.witnessMul:1));break;case`crash`:{if(t.vehicleId<0||i.a!==t.vehicleId&&i.b!==t.vehicleId)break;let n=i.a===t.vehicleId?i.b:i.a,r=n>=0?e.vehicles.find(e=>e.id===n):void 0;if(!r||!op(r)||r.id===e.wanted.hitId&&e.time-e.wanted.hitAt<Ml.hitPoliceCooldown)break;e.wanted.hitId=r.id,e.wanted.hitAt=e.time,tp(e,Ml.hitPolice);break}case`explode`:Math.hypot(i.x-n.x,i.z-n.z)<Ml.explosionRadius&&tp(e,Ml.explosion)}}function cp(e,t){let n=e.wanted;if(!e.city)return;let r=e.player.walker;if(e.tick%Ml.sightEvery===0&&(n.seen=e.life.state===`alive`&&ap(e,r.x,r.z,Ml.sightRange),n.seen&&(n.lastSeenX=r.x,n.lastSeenZ=r.z)),n.stars===0){n.unseenT=0,n.heat>0&&ep(e,n.heat-Ml.decayPerSec*.3*t);return}if(n.seen){n.unseenT=0;return}n.unseenT+=t,n.unseenT>Ml.hideTime[n.stars]&&ep(e,n.heat-Ml.decayPerSec*t)}function lp(){return{units:[],roadblocks:[],spawnT:0,roadblockT:0,stats:{spawned:0,roadblocks:0}}}var up={speedMul:Nl.chaseSpeed,giveWay:!1,extend:!0,urgent:!0},dp={edge:0,s:0,dist:0};function fp(e,t,n){let r=e.city;if(!r||!e.traffic.junctions)return;let i=r.lanes,a=e.police,o=e.life.state===`alive`?e.wanted.stars:0,s=Nl.units[o]??0,c=Bf(e),l=Iu(e,e.player.vehicleId),u=l?l.x:c.x,d=l?l.z:c.z,f=l?l.vx:e.player.walker.vx,p=l?l.vz:e.player.walker.vz;for(let r=a.units.length-1;r>=0;r--){let o=a.units[r],c=o.agent.v;if(c.driver!==`npc`||c.stage===`wreck`){a.units.splice(r,1),c.siren=!1,e.traffic.spawned.indexOf(c)<0&&e.traffic.spawned.push(c);continue}let l=Math.hypot(c.x-u,c.z-d);if(l>Nl.despawn){a.units.splice(r,1),Wf(e,c);continue}if(a.units.length>s){a.units.splice(r,1),c.siren=!1,pp(i,o.agent,c),o.agent.holding=-1,e.traffic.agents.push(o.agent),e.traffic.spawned.indexOf(c)<0&&e.traffic.spawned.push(c);continue}if((e.tick+r)%10==0&&(o.sees=l<Nl.pursueRange&&ip(e.static,c.x,c.z,u,d)),l<16||o.sees&&l<Nl.pursueRange)o.mode=`pursue`,hp(e,o,u,d,f,p,l,n);else{if(o.mode===`pursue`&&(o.mode=`route`,pp(i,o.agent,c),o.repathT=0),o.repathT-=n,o.repathT<=0&&(o.repathT=Nl.repath,mp(i,o.agent,u,d)),!kf(i,o.agent,e.rng,!0)){hp(e,o,u,d,f,p,l,n);continue}Nf(e,i,o.agent,e.traffic.junctions,up,t,n)}}a.spawnT-=n,a.units.length<s&&a.spawnT<=0&&(a.spawnT=Nl.spawnEvery,vp(e,i,u,d));for(let t=a.roadblocks.length-1;t>=0;t--){let r=a.roadblocks[t];r.age+=n;let i=Math.hypot(r.x-u,r.z-d);if(i>Y.despawn||r.age>Nl.roadblockKeep&&i>Y.offscreen||o<2&&i>Y.offscreen){for(let t of r.vehicles)t.driver===`npc`&&Wf(e,t);a.roadblocks.splice(t,1)}}o>=Nl.roadblockStars?(a.roadblockT-=n,a.roadblockT<=0&&a.roadblocks.length===0&&(a.roadblockT=bp(e,i,u,d,f,p)?Nl.roadblockEvery:3)):a.roadblockT=Math.min(a.roadblockT,8)}function pp(e,t,n){let r=Math.sin(n.heading),i=-Math.cos(n.heading);(tf(e,n.x,n.z,20,r,i,0,!1,dp)||tf(e,n.x,n.z,30,0,0,-2,!1,dp))&&(t.route.length=0,t.route.push(dp.edge),t.s=dp.s,t.offset=t.offsetTarget=0,t.passId=-1)}function mp(e,t,n,r){if(!tf(e,n,r,25,0,0,-2,!1,dp))return;let i=dp.edge;if(t.route[0]===i)return;let a=sf(e,t.route[0],i);if(a){t.route.length=1;for(let e of a)t.route.push(e)}}function hp(e,t,n,r,i,a,o,s){let c=t.agent,l=c.v,u=Bl[l.type],d=mu(l),f=t.role===1?Nl.leadTime:Math.min(1,o/25)*.6,p=n+i*f,m=r+a*f;o<8&&(p=n,m=r);let h=nu(Math.atan2(p-l.x,-(m-l.z))-l.heading),g=h*2.2;g=g>1?1:g<-1?-1:g;let _=Math.hypot(i,a),v=1,y=0,b=!1;o<7&&_<3?(v=0,d>1?y=1:b=!0):Math.abs(h)>2.2&&d<6&&(v=0,y=1,g=-g),c.reverseT>0?(c.reverseT=Math.max(0,c.reverseT-s),v=0,y=1,b=!1,g=-Math.sign(h)||1):v>0&&Math.abs(d)<.4?(c.stuckT+=s,c.stuckT>1.5&&(c.stuckT=0,c.reverseT=1.1)):c.stuckT=0,l.inThrottle=v*(d>u.maxSpeed*.95?0:1),l.inBrake=y,l.inSteer=g,l.inHandbrake=b,l.horn=!1}var gp=new WeakMap;function _p(e){let t=gp.get(e);return t||(t=e.edges.filter(e=>e.kind===`lane`&&e.length>10).map(e=>e.id),gp.set(e,t)),t}function vp(e,t,n,r){let i=$d(t),a=yp;a.length=0;for(let e of _p(t)){let o=t.edges[e],s=t.nodes[o.from],c=o.length/2,l=s.x+i.dx[e]*c,u=s.z+i.dz[e]*c,d=Math.hypot(l-n,u-r);d<Nl.spawnMin||d>Nl.spawnMax||((n-l)*i.dx[e]+(r-u)*i.dz[e])/d<.2||a.push(e)}for(let n=0;n<6&&a.length;n++){let n=a[Math.floor(Ql(e.rng)*a.length)],r=t.edges[n],o=t.nodes[r.from],s=$l(e.rng,Math.min(4,r.length/2),Math.max(r.length/2,r.length-4)),c=o.x+i.dx[n]*s,l=o.z+i.dz[n]*s,u=Math.atan2(i.dx[n],-i.dz[n]);if(!Xf(e,`police`,c,l,u,2))continue;let d=ym(e,fu(0,`police`,c,l,u,`npc`));d.inHandbrake=!1,d.vx=i.dx[n]*8,d.vz=i.dz[n]*8,d.siren=!0;let f=gf(d,[n],s,1),p=e.police.units.length%2;return e.police.units.push({agent:f,role:p,mode:`route`,repathT:0,sees:!1}),e.police.stats.spawned++,!0}return!1}var yp=[];function bp(e,t,n,r,i,a){let o=e.city;if(!o)return!1;let s=Math.hypot(i,a);if(s<6)return!1;let c=i/s,l=a/s,u=$d(t),d=-1,f=1/0;for(let e of _p(t)){let i=t.edges[e];if(i.lane!==0||i.segment<0)continue;let a=t.nodes[i.from],o=t.nodes[i.to],s=(a.x+o.x)/2,p=(a.z+o.z)/2,m=Math.hypot(s-n,p-r);if(m<Nl.roadblockMin||m>Nl.roadblockMax||((s-n)*c+(p-r)*l)/m<.85||Math.abs(u.dx[e]*c+u.dz[e]*l)<.7)continue;let h=Math.abs(-(s-n)*l+(p-r)*c);h<f&&(f=h,d=e)}if(d<0)return!1;let p=t.edges[d],m=o.streets.segments[p.segment],h=t.nodes[p.from],g=t.nodes[p.to],_=m.axis===`h`?(h.x+g.x)/2:(h.z+g.z)/2,v=Bl.police.length,y=Math.max(1,Math.min(4,Math.round(m.width/(v+.6)))),b=m.axis===`h`?0:Math.PI/2,x={vehicles:[],x:0,z:0,age:0};for(let t=0;t<y;t++){let n=m.c-m.width/2+(t+.5)*m.width/y,r=m.axis===`h`?_:n,i=m.axis===`h`?n:_;if(!Xf(e,`police`,r,i,b,.2))continue;let a=ym(e,fu(0,`police`,r,i,b,`npc`));x.vehicles.push(a),x.x+=r,x.z+=i}return x.vehicles.length!==0&&(x.x/=x.vehicles.length,x.z/=x.vehicles.length,e.police.roadblocks.push(x),e.police.stats.roadblocks++,!0)}function xp(e,t){let n=e.wanted;if(e.life.state!==`alive`||n.stars===0)return n.bust=0,!1;let r=e.player,i=r.walker,a=Iu(e,r.vehicleId),o=a?a.x:i.x,s=a?a.z:i.z,c=a?Bl[a.type].length/2:.4,l=a?pu(a)<Nl.bustSpeed:iu(i)||Math.hypot(i.vx,i.vz)<Nl.bustSpeed,u=!1;if(l){for(let t of e.vehicles)if(t.type===`police`&&t.driver===`npc`&&t.stage!==`wreck`&&t!==a&&Math.hypot(t.x-o,t.z-s)-(c+Bl.police.length/2)*.7<Nl.bustRange){u=!0;break}}return n.bust=u?Math.min(1,n.bust+t/Nl.bustTime):Math.max(0,n.bust-t/Nl.bustTime),n.bust>=1}var Sp=20261119,Cp={arterial:10.5,street:7,lane:5.5},wp=[`bazaar`,`temple`,`residential`,`industrial`],Tp=(e,t,n,r,i,a)=>({axis:e,at:t,w:n,from:r,to:i,kind:a}),Ep=[{id:`bazaar`,name:`Chandni Bazaar`,x0:1,y0:1,x1:36,y1:36},{id:`temple`,name:`Mandir Chowk`,x0:39,y0:1,x1:67,y1:36},{id:`residential`,name:`Gulmohar Colony`,x0:1,y0:39,x1:36,y1:74},{id:`industrial`,name:`Bandar Docks`,x0:39,y0:39,x1:75,y1:74}],Dp=[Tp(`v`,37,2,1,74,`arterial`),Tp(`h`,37,2,1,67,`arterial`),Tp(`v`,18,2,1,74,`arterial`),Tp(`v`,66,2,1,74,`arterial`),...[3,8,13,18,23,28,33].map(e=>Tp(`h`,e,1,3,38,`lane`)),...[3,8,13,23,28,33].map(e=>Tp(`v`,e,1,3,38,`lane`)),...[3,13,23,33].map(e=>Tp(`h`,e,1,37,67,`street`)),...[42,47,58,62].map(e=>Tp(`v`,e,1,3,38,`street`)),Tp(`v`,52,1,3,13,`street`),Tp(`v`,52,1,23,69,`street`),...[45,57].map(e=>Tp(`h`,e,1,3,38,`street`)),...[51,63,69].map(e=>Tp(`h`,e,1,3,67,`street`)),...[5,11,25,31].map(e=>Tp(`v`,e,1,37,69,`street`)),Tp(`v`,58,1,51,63,`street`)],Op=[{x0:17,y0:36,x1:20,y1:39}],kp=4.6,Ap=8.4,jp=[{x0:48,y0:14,x1:57,y1:22},{x0:9,y0:19,x1:12,y1:22}],Mp=[{x0:26,y0:52,x1:30,y1:56},{x0:59,y0:24,x1:61,y1:29}],Np=[{x0:43,y0:14,x1:46,y1:16},{x0:6,y0:46,x1:10,y1:47},{x0:39,y0:64,x1:42,y1:68}],Pp=[{x0:68,y0:43,x1:72,y1:46},{x0:68,y0:55,x1:72,y1:58},{x0:68,y0:65,x1:72,y1:68}],Fp={x:0,z:0,heading:0},Ip=2.2,Lp=.75;function Rp(e,t){let n=Array(76).fill(0);for(let t of Dp){if(t.axis!==e)continue;let r=Cp[t.kind]/t.w;for(let e=t.at;e<t.at+t.w;e++)n[e]=Math.max(n[e],r)}let r=[0];for(let e=0;e<76;e++)r.push(r[e]+(n[e]||7));let i=r[t];return r.map(e=>e-i)}var zp=Rp(`v`,38),Bp=Rp(`h`,38),Vp={minX:zp[0],minZ:Bp[0],maxX:zp[76],maxZ:Bp[76]},X={WATER:0,WALL:1,ROAD:2,LOT:3,PARK:4,PLAZA:5,DOCK:6,ISLAND:7,PARKING:8};function Hp(e){return e!==X.WATER&&e!==X.WALL&&e!==X.ISLAND}var Up=e=>zp[Math.max(0,Math.min(76,e))],Wp=e=>Bp[Math.max(0,Math.min(76,e))];function Gp(e,t){if(t<e[0])return-1;if(t>=e[e.length-1])return e.length-1;let n=0,r=e.length-1;for(;r-n>1;){let i=n+r>>1;e[i]<=t?n=i:r=i}return n}var Kp=e=>Gp(zp,e),qp=e=>Gp(Bp,e);function Jp(){let e=new Uint8Array(5776).fill(X.LOT),t=new Uint8Array(5776),n=(t,n)=>{for(let r=t.y0;r<=t.y1;r++)for(let i=t.x0;i<=t.x1;i++)e[r*76+i]=n};for(let n=0;n<76;n++)for(let r=0;r<76;r++){let i=n*76+r;r>=68?e[i]=X.WATER:(r===0||n===0||n===75)&&(e[i]=X.WALL),t[i]=Yp(r,n)}for(let e of Pp)n(e,X.DOCK);for(let e of Dp)e.axis===`h`?n({x0:e.from,x1:e.to,y0:e.at,y1:e.at+e.w-1},X.ROAD):n({x0:e.at,x1:e.at+e.w-1,y0:e.from,y1:e.to},X.ROAD);for(let e of Op)n(e,X.ROAD);for(let e of jp)n(e,X.PLAZA);for(let e of Mp)n(e,X.PARK);for(let e of Np)n(e,X.PARKING);return{size:76,colX:zp,rowZ:Bp,tiles:e,district:t}}function Yp(e,t){let n=0,r=1/0;for(let i=0;i<Ep.length;i++){let a=Ep[i],o=(e<a.x0?a.x0-e:e>a.x1?e-a.x1:0)+(t<a.y0?a.y0-t:t>a.y1?t-a.y1:0);o<r&&(r=o,n=wp.indexOf(a.id))}return n}function Xp(e,t,n){return t<0||n<0||t>=e.size||n>=e.size?X.WALL:e.tiles[n*e.size+t]}function Zp(e,t,n){return Xp(e,Kp(t),qp(n))}function Qp(){return{state:`alive`,deathX:0,deathZ:0,lastLoss:0,lastAt:``,reviveT:0,insideShop:-1}}function $p(){return{hospital:{x:0,z:0},station:{x:0,z:0},paintShops:[]}}function em(e){let t=Ep.find(t=>t.id===e);return t?{x:(Up(t.x0)+Up(t.x1+1))/2,z:(Wp(t.y0)+Wp(t.y1+1))/2}:null}function tm(e,t){let n=e.chowks[Math.min(t,e.chowks.length-1)],r=n===void 0?void 0:e.streets.intersections[n];return r?{x:r.cx,z:r.cz}:{x:e.spawn.x,z:e.spawn.z}}function nm(e,t){let n=Bd(e.peds,t.x,t.z);return n>=0?{x:e.peds.nodes[n].x,z:e.peds.nodes[n].z}:{x:e.spawn.x,z:e.spawn.z}}function rm(e){let t=nm(e,em(Fl.hospitalDistrict)??e.spawn),n=nm(e,tm(e,Fl.stationChowk)),r=e.lanes,i=$d(r),a=[];for(let t of Pl.anchors){let n=`district`in t?em(t.district):tm(e,t.chowk);if(!n)continue;let o=tf(r,n.x,n.z,120,0,0,-2,!0);if(!o)continue;let s=r.edges[o.edge],c=Math.max(Math.min(6,s.length/2),Math.min(o.s,s.length-6)),l=r.nodes[s.from];a.push({x:l.x+i.dx[s.id]*c,z:l.z+i.dz[s.id]*c})}return{hospital:t,station:n,paintShops:a}}function im(e,t,n){return Math.max(0,Math.min(e,Math.max(n,Math.round(e*t))))}function am(e){let t=e.player,n=e.life;if(n.state!==`alive`)return;let r=im(t.money,Fl.bustedFineFrac,Fl.bustedFineMin);t.money-=r,n.lastLoss=r,n.state=`busted`,n.reviveT=0,t.spawnX=e.places.station.x,t.spawnZ=e.places.station.z,t.downT=Fl.bustedDelay,np(e),e.events.push({type:`busted`,fine:r})}function om(e){let t=e.player,n=e.life,r=im(t.money,Fl.hospitalFeeFrac,Fl.hospitalFeeMin);t.money-=r,n.lastLoss=r,n.state=`wasted`,n.deathX=t.walker.x,n.deathZ=t.walker.z,n.reviveT=0,t.spawnX=e.places.hospital.x,t.spawnZ=e.places.hospital.z,np(e),e.events.push({type:`wasted`,loss:r})}function sm(e){if(e.life.state===`alive`)return;let t=Iu(e,e.player.vehicleId);t&&(t.inThrottle=0,t.inBrake=0,t.inSteer=0,t.inHandbrake=!0,t.horn=!1)}function cm(e,t){let n=e.life,r=e.player;n.reviveT>0&&(n.reviveT=Math.max(0,n.reviveT-t));for(let t of e.events)if(t.type===`playerDown`&&n.state===`alive`)om(e);else if(t.type===`respawn`&&n.state!==`alive`){let t=n.state===`busted`?`station`:`hospital`;n.state=`alive`,n.lastAt=t,n.reviveT=t===`hospital`?Fl.reviveWindow:0,e.events.push({type:`respawned`,at:t,x:r.walker.x,z:r.walker.z});break}let i=Iu(e,r.vehicleId);if(!i||n.state!==`alive`){n.insideShop=-1;return}let a=-1;if(e.places.paintShops.forEach((e,t)=>{Math.hypot(i.x-e.x,i.z-e.z)<Pl.radius&&(a=t)}),a<0){if(n.insideShop>=0){let t=e.places.paintShops[n.insideShop];Math.hypot(i.x-t.x,i.z-t.z)>Pl.radius+2&&(n.insideShop=-1)}return}if(a===n.insideShop||pu(i)>Pl.maxSpeed||r.money<Pl.cost)return;n.insideShop=a,r.money-=Pl.cost,i.paint=i.paint%(Pl.tints.length-1)+1;let o=e.wanted.stars>0&&!(Pl.requireUnseen&&e.wanted.seen);(o||e.wanted.stars===0)&&np(e),e.events.push({type:`paintShop`,vehicle:i.id,paint:i.paint,cleared:o})}function lm(e){let t=e.life,n=e.player;if(!(t.state===`wasted`||t.state===`alive`&&t.lastAt===`hospital`&&t.reviveT>0))return!1;let i=Iu(e,n.vehicleId);i&&(i.driver=`none`),n.vehicleId=-1;let a=n.walker,o=t.deathX,s=t.deathZ;if(!Nu(o,s,r.radius,e.static,e.vehicles)&&e.city){let t=Bd(e.city.peds,o,s);t>=0&&(o=e.city.peds.nodes[t].x,s=e.city.peds.nodes[t].z)}return a.x=a.px=o,a.z=a.pz=s,a.vx=a.vz=0,a.health=a.maxHealth,a.knockT=0,a.hidden=!1,n.downT=0,n.money+=t.lastLoss,t.lastLoss=0,t.state=`alive`,t.lastAt=`deathSpot`,t.reviveT=0,e.events.push({type:`respawned`,at:`deathSpot`,x:o,z:s}),!0}function um(e){return e.wanted.stars===0&&e.wanted.heat===0?!1:(np(e),!0)}function dm(e){let t=Iu(e,e.player.vehicleId);return!t||t.stage===`wreck`?!1:(t.health=Bl[t.type].health,t.stage=`ok`,!0)}function fm(e){return e.life.state===`alive`||e.player.downT<=0?!1:(e.player.downT=1e-6,!0)}function pm(e){let t=Iu(e,e.player.vehicleId);return!!t&&t.stage!==`wreck`&&t.health<Bl[t.type].health*.7}function mm(e,t){e.city=t,e.places=rm(t),Vf(e,t),Hd(e,t),hd(e,t)}var hm=new Map;function gm(e,t){if(sm(e),e.city&&e.traffic.junctions){Md(e),hm.clear();for(let t of e.traffic.agents)hm.set(t.v.id,t);for(let t of e.police.units)hm.set(t.agent.v.id,t.agent);hf(e.traffic.junctions,hm.values()),Uf(e,hm,t),fp(e,hm,t),qd(e,t),gd(e,t)}}function _m(e,t){e.city&&(yd(e),Xd(e),sp(e),cp(e,t),xp(e,t)&&am(e),cm(e,t))}function vm(e={}){let t={tick:0,time:0,rng:Zl(e.seed??1),nextId:2,static:e.static??nd(),events:[],player:Fu(1,Zu.x,Zu.z),vehicles:[],peds:[],city:null,traffic:Ff(),pedAI:Id(),animals:od(),wanted:Qf(),police:lp(),life:Qp(),places:$p()};if(e.populate??!e.static){for(let e of Qu)ym(t,fu(0,e.type,e.x,e.z,e.heading,e.driver?`npc`:`none`));for(let e of $u)t.peds.push(ru(t.nextId++,`npc`,e.x,e.z,Math.PI))}return t}function ym(e,t){return t.id=e.nextId++,t.inHandbrake=!0,e.vehicles.push(t),t}function bm(e){return 1+e.vehicles.length+e.peds.length+e.animals.cows.length}function xm(e,t,n){e.events.length=0,e.tick++,e.time+=n,Sm(e),Lu(e,t,n),gm(e,n);for(let t of e.vehicles)t.driver===`none`&&wm(t),eu(t,n);let r=e.player.walker;r.hidden||ou(r,e.player.wishX,e.player.wishY,n);for(let t of e.peds)ou(t,t.wishX,t.wishY,n);for(let t of e.vehicles)Du(t,e.static,e.events);Au(e.vehicles,e.events),ju(r,e.vehicles,e.events);for(let t of e.peds)ju(t,e.vehicles,e.events);Mu(r,e.static);for(let t of e.peds)Mu(t,e.static);for(let t of e.vehicles)lu(t,e.time,n,e.events)&&Tm(e,t);Uu(e),_m(e,n)}function Sm(e){for(let t of e.vehicles)Cm(t);for(let t of e.peds)Cm(t);Cm(e.player.walker)}function Cm(e){e.px=e.x,e.pz=e.z,e.pHeading=e.heading}function wm(e){e.inThrottle=0,e.inBrake=0,e.inSteer=0,e.inHandbrake=!0}function Tm(e,t){let n=Vl.blastRadius;for(let r of e.vehicles){if(r===t)continue;let i=r.x-t.x,a=r.z-t.z,o=Math.hypot(i,a);if(o>=n)continue;let s=1-o/n,c=o>1e-6?i/o:1,l=o>1e-6?a/o:0;r.vx+=c*Vl.blastPush*s,r.vz+=l*Vl.blastPush*s,cu(r,Vl.blastVehicleDamage*s,e.events)}if(e.player.vehicleId===t.id){let n=Vu(e,t)??{x:t.x,z:t.z};Bu(e,t,n.x,n.z)}else if(t.driver===`npc`){let n=Vu(e,t)??{x:t.x,z:t.z};e.peds.push(ru(e.nextId++,`npc`,n.x,n.z,t.heading))}t.driver=`none`,t.vx*=.3,t.vz*=.3;let i=[e.player.walker,...e.peds];for(let a of i){if(a.hidden)continue;let i=a.x-t.x,o=a.z-t.z,s=Math.hypot(i,o);if(s>=n)continue;let c=1-s/n,l=s>1e-6?i/s:1,u=s>1e-6?o/s:0,d=Vl.blastPush*c+2;au(a,l*d,u*d,r.knockTime+$l(e.rng,.2,.8),Vl.blastWalkerDamage*c)}}function Em(e,t){let n=(t-e)%(Math.PI*2);return n>Math.PI&&(n-=Math.PI*2),n<=-Math.PI&&(n+=Math.PI*2),n}function Dm(e,t,n){return e+Em(e,t)*n}var Om=128,km=11895642,Am=3095378,jm=16747546,Mm=[3835647,15087942,2792847,16052702,9263948,10182117,5420936],Nm=class{constructor(){this.object=new Qn,this.root=new Zn,this.part=new Zn,this.m=new wn,this.color=new G,this.nBody=0,this.nLimb=0;let e=new ua({color:16777215}),t=new qi(.5,.6,.3),n=new qi(.3,.3,.3),r=new qi(.17,.75,.2);r.translate(0,-.375,0),this.torso=this.mesh(t,e,Om),this.head=this.mesh(n,e,Om),this.limb=this.mesh(r,e,512)}mesh(e,t,n){let r=new Li(e,t,n);return r.instanceMatrix.setUsage(Pt),r.count=0,r.frustumCulled=!1,this.object.add(r),r}sync(e,t){this.nBody=0,this.nLimb=0;let n=e.player,r=n.walker,i=Iu(e,n.vehicleId);r.hidden?i&&Bl[i.type].model===`bike`&&this.draw(r,t,jm,.1,.1,!0):this.draw(r,t,jm,0,0);for(let n of e.peds)n.hidden||this.draw(n,t,Mm[n.id%Mm.length],0,0);this.finish(this.torso,this.nBody),this.finish(this.head,this.nBody),this.finish(this.limb,this.nLimb)}draw(e,t,n,i,a,o=!1){if(this.nBody>=Om)return;let s=Dm(e.pHeading,e.heading,t),c=e.px+(e.x-e.px)*t+Math.sin(s)*a,l=e.pz+(e.z-e.pz)*t-Math.cos(s)*a,u=0;e.knockT>0&&(u=e.knockT>r.getUpTime?Math.PI/2:Math.PI/2*(e.knockT/r.getUpTime));let d=Math.hypot(e.vx,e.vz),f=e.knockT>0||o?0:Math.sin(e.walkDist*2.4)*.7*Math.min(1,d/2),p=e.knockT>0||o?0:Math.abs(Math.sin(e.walkDist*2.4))*.06,m=this.root;m.position.set(c,i+p,l),m.rotation.set(u,-s,0,`YXZ`),m.scale.setScalar(Ll.person),m.updateMatrix(),this.put(this.torso,this.nBody,0,1.15,0,0,n),this.put(this.head,this.nBody,0,1.62,0,0,km),this.nBody++;let h=o?1.3:0;this.put(this.limb,this.nLimb++,-.13,.85,0,h+f,Am),this.put(this.limb,this.nLimb++,.13,.85,0,h-f,Am);let g=e.punchT>0?Math.sin((1-e.punchT/r.punchTime)*Math.PI)*1.6:0,_=+!!o;this.put(this.limb,this.nLimb++,-.34,1.42,0,_-f*.8,n),this.put(this.limb,this.nLimb++,.34,1.42,0,_+f*.8+g,n)}put(e,t,n,r,i,a,o){let s=this.part;s.position.set(n,r,i),s.rotation.set(a,0,0),s.updateMatrix(),this.m.multiplyMatrices(this.root.matrix,s.matrix),e.setMatrixAt(t,this.m),e.setColorAt(t,this.color.setHex(o))}finish(e,t){e.count=t,e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0)}};function Pm(e){let t=e*2,n=new Qi(t,t);n.rotateX(-Math.PI/2);let r=new Ti(n,new ua({color:16777215,map:Fm(t/8)}));return r.name=`ground`,r}function Fm(e){let t=document.createElement(`canvas`);t.width=t.height=32;let n=t.getContext(`2d`);n.fillStyle=`#d9c38f`,n.fillRect(0,0,32,32),n.fillStyle=`#cbb27a`,n.fillRect(0,0,32,1),n.fillRect(0,0,1,32);let r=new Ui(t);return r.colorSpace=Ot,r.wrapS=r.wrapT=ue,r.magFilter=pe,r.repeat.set(e,e),r}function Im(e){if(!(e instanceof ed))return null;let t=new Li(new qi(1,1,1),new ua({color:13214334}),e.boxes.length),n=new Zn;return e.boxes.forEach((e,r)=>{let i=e.maxX-e.minX,a=e.maxZ-e.minZ,o=Math.min(14,Math.max(1.2,Math.min(i,a)*.6));n.position.set((e.minX+e.maxX)/2,o/2,(e.minZ+e.maxZ)/2),n.scale.set(i,o,a),n.updateMatrix(),t.setMatrixAt(r,n.matrix)}),t.name=`dev-boxes`,t}function Lm(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new ti,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=Rm(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=Rm(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function Rm(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new Br(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var zm=new ua({vertexColors:!0}),Bm=2236962,Vm=2965072,Hm=16774064,Um=14170668,Wm=1710618,Gm=new G;function Km(e,t){Gm.setHex(t);let n=e.getAttribute(`position`).count,r=new Float32Array(n*3);for(let e=0;e<n;e++)r[e*3]=Gm.r,r[e*3+1]=Gm.g,r[e*3+2]=Gm.b;return e.setAttribute(`color`,new Ur(r,3)),e}function Z(e,t,n,r,i,a,o){let s=new qi(e,t,n);return s.translate(r,i,a),Km(s,o)}function qm(e,t,n,r){let i=new Ji(e,e,t,8);return i.rotateZ(Math.PI/2),i.translate(n,e,r),Km(i,Wm)}function Jm(e,t){let{length:n,width:r,height:i}=e,{body:a,accent:o,roof:s}=e.colors,c=.33,l=i*(t?.42:.4),u=c*.8+l/2,d=i-(c*.8+l),f=c*.8+l+d/2,p=[Z(r,l,n,0,u,0,a),Z(r*.88,d,n*(t?.6:.5),0,f,n*.04,s),Z(r*.9,d*.55,n*(t?.56:.46),0,f+d*.05,n*.04,Vm),Z(r*.25,.14,.06,-r*.3,u+l*.15,-n/2,Hm),Z(r*.25,.14,.06,r*.3,u+l*.15,-n/2,Hm),Z(r*.25,.12,.06,-r*.3,u+l*.15,n/2,Um),Z(r*.25,.12,.06,r*.3,u+l*.15,n/2,Um),Z(r*1.02,l*.18,n*.98,0,u-l*.12,0,o)];for(let e of[-1,1])for(let t of[-1,1])p.push(qm(c,.26,e*(r/2-.1),t*n*.32));return t&&(p.push(Z(r*.3,.14,.3,-r*.16,i+.07,n*.04,Um)),p.push(Z(r*.3,.14,.3,r*.16,i+.07,n*.04,o))),p}function Ym(e){let{length:t,width:n,height:r}=e,{body:i,accent:a,roof:o}=e.colors,s=.25;return[Z(n,.55,t*.62,0,.6,t*.14,i),Z(n*1.02,.12,t*.62,0,.35,t*.14,a),Z(n*.55,.8,t*.3,0,.75,-t*.33,i),Z(n*.5,.35,.05,0,1.3,-t*.47,Vm),Z(n*.9,.35,.3,0,1,t*.18,Bm),Z(n*1.04,.1,t*.86,0,r,t*.05,o),Z(n,r-s-.6,.08,0,.85+(r-s-.6)/2,t*.46,o),Z(.06,r-.7,.06,-n*.48,.7+(r-.7)/2,-t*.3,Bm),Z(.06,r-.7,.06,n*.48,.7+(r-.7)/2,-t*.3,Bm),Z(n*.2,.12,.05,0,.85,-t*.49,Hm),qm(s,.18,0,-t*.36),qm(s,.18,-n/2+.12,t*.3),qm(s,.18,n/2-.12,t*.3)]}function Xm(e){let{length:t}=e,{body:n,accent:r,roof:i}=e.colors,a=.33;return[Z(.3,.32,t*.5,0,.62,0,n),Z(.36,.22,t*.22,0,.84,-t*.08,n),Z(.3,.12,t*.3,0,.82,t*.16,r),Z(.7,.06,.06,0,1.08,-t*.36,i),Z(.06,.5,.06,0,.82,-t*.36,i),Z(.18,.12,.06,0,.92,-t*.42,Hm),qm(a,.14,0,-t*.36),qm(a,.14,0,t*.36)]}function Zm(e){let{length:t,width:n,height:r}=e,{body:i,accent:a,roof:o}=e.colors,s=.5,c=r-s*.8,l=[Z(n,c,t,0,s*.8+c/2,0,i),Z(n*1.01,c*.28,t*.92,0,s*.8+c*.68,t*.02,Vm),Z(n*1.02,c*.1,t*1,0,s*.8+c*.45,0,a),Z(n*.9,c*.35,.06,0,s*.8+c*.68,-t/2,Vm),Z(n*.95,.15,t*.9,0,r+.07,0,o),Z(n*.2,.18,.06,-n*.33,.9,-t/2,Hm),Z(n*.2,.18,.06,n*.33,.9,-t/2,Hm)];for(let e of[-1,1])for(let r of[-.33,.3])l.push(qm(s,.35,e*(n/2-.15),r*t));return l}function Qm(e){let{length:t,width:n,height:r}=e,{body:i,accent:a,roof:o}=e.colors,s=.5,c=r*.78,l=t-2-.2,u=[Z(n,c-s*.6,2,0,s*.6+(c-s*.6)/2,-t/2+1,i),Z(n*.9,c*.3,.06,0,c*.72,-t/2,Vm),Z(n*1.02,.25,1.8,0,c+.12,-t/2+1,a),Z(n,r-s*.9,l,0,s*.9+(r-s*.9)/2,t/2-l/2,o),Z(n*1.02,.2,l,0,.55,t/2-l/2,a),Z(n*.22,.16,.06,-n*.32,.85,-t/2,Hm),Z(n*.22,.16,.06,n*.32,.85,-t/2,Hm)];for(let e of[-1,1])for(let r of[-.36,.18,.36])u.push(qm(s,.35,e*(n/2-.15),r*t));return u}function $m(e){let t=Ll.vehicle,n={...e,length:e.length/t,width:e.width/t,height:e.height/t},r=n.model===`rickshaw`?Ym(n):n.model===`bike`?Xm(n):n.model===`bus`?Zm(n):n.model===`truck`?Qm(n):Jm(n,n.model===`jeep`),i=Lm(r,!1);for(let e of r)e.dispose();if(!i)throw Error(`vehicle model ${n.id}: parts do not merge`);return i.scale(t,t,t),i.computeBoundingSphere(),i}var eh=128,th=4,nh=3,rh=class{constructor(){this.object=new Qn,this.meshes=new Map,this.dummy=new Zn,this.color=new G;for(let e of Object.keys(Bl)){let t=new Li($m(Bl[e]),zm,eh);t.instanceMatrix.setUsage(Pt),t.count=0,t.frustumCulled=!1,t.name=`vehicles-${e}`,this.meshes.set(e,t),this.object.add(t)}this.smoke=this.pool(new Zi(.5,0),new ua({color:16777215}),512),this.fire=this.pool(new Yi(.35,1,5),new pi({color:16777215}),384),this.flash=this.pool(new Zi(1,1),new pi({color:16754224,transparent:!0,opacity:.75}),8)}pool(e,t,n){let r=new Li(e,t,n);return r.instanceMatrix.setUsage(Pt),r.count=0,r.frustumCulled=!1,this.object.add(r),r}sync(e,t,n){for(let e of this.meshes.values())e.count=0;let r=0,i=0,a=0,o=this.dummy;for(let s of e.vehicles){let e=this.meshes.get(s.type);if(e.count>=eh)continue;let c=Bl[s.type],l=s.px+(s.x-s.px)*t,u=s.pz+(s.z-s.pz)*t,d=Dm(s.pHeading,s.heading,t);o.position.set(l,0,u),o.rotation.set(0,-d,0),o.scale.set(1,1,1),o.updateMatrix();let f=e.count++;e.setMatrixAt(f,o.matrix);let p=s.health/c.health,m=s.stage===`wreck`?.18:.45+.55*Math.min(1,p*1.4);this.color.setHex(Pl.tints[s.paint]??16777215),e.setColorAt(f,this.color.multiplyScalar(m));let h=l+Math.sin(d)*c.length*.3,g=u-Math.cos(d)*c.length*.3,_=c.height*.75,v=s.stage===`fire`||s.stage===`wreck`&&n-s.explodedAt<6;if(s.stage===`smoke`||v)for(let e=0;e<th&&r<this.smoke.instanceMatrix.count;e++){let t=(n*.7+e/th+s.id*.37)%1;o.position.set(h+t*1.2,_+t*3.5,g-t*.8),o.rotation.set(t*3,t*2,0);let i=(.5+t*1.3)*(1-t*t);o.scale.set(i,i,i),o.updateMatrix(),this.smoke.setMatrixAt(r,o.matrix);let a=v?.25:.65;this.smoke.setColorAt(r++,this.color.setRGB(a,a,a))}if(v)for(let e=0;e<nh&&i<this.fire.instanceMatrix.count;e++){let t=.7+.3*Math.sin(n*17+e*2.1+s.id);o.position.set(h+(e-1)*.35,_+.4*t,g),o.rotation.set(0,0,0),o.scale.set(1,t*1.3,1),o.updateMatrix(),this.fire.setMatrixAt(i,o.matrix),this.fire.setColorAt(i++,this.color.setHex(e===1?16765503:16743196))}if(s.explodedAt>=0&&a<8){let e=(n-s.explodedAt)/.6;if(e>=0&&e<1){let t=1+e*6;o.position.set(l,1,u),o.scale.set(t,t*.7,t),o.updateMatrix(),this.flash.setMatrixAt(a++,o.matrix)}}}for(let e of this.meshes.values())e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0);this.finish(this.smoke,r),this.finish(this.fire,i),this.finish(this.flash,a)}finish(e,t){e.count=t,e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0)}},Q={asphalt:6119784,asphaltDark:5198682,markWhite:15855590,markYellow:15909424,sidewalk:13220244,kerb:10195586,lot:14205070,park:9225313,parkDark:7777616,plaza:15127206,plazaDark:14468762,parking:9408911,dock:11117466,water:3843769,waterDeep:2854563,quay:9274742,outside:13480316,wall:13209429,wallTop:11893829,island:8372058},ih=[15239840,5226936,15902017,16109665,11064171,11902936,8370406,15722194,13922638,6799503],ah=[9148581,7311272,11035722,12104356,8228714],oh=[14036526,3043286,2072154,15909424,15228188,9322432,1118481,16777215],sh=13616560,ch=12103062,lh=2964042,uh=4157344,dh=9211796,fh=2500134,ph=3108789,mh=9067058,hh=8016434,gh=[5216828,6270533,4164149,7191370],_h=5987163,vh=1907997,yh=15321487,bh=13609068,xh=15895580,Sh=12597547,Ch=[12597547,3043286,2072154,15902017,9148581,7091331],wh=15906076,Th=[15895580,15257651,14036526,8175690],Eh=class{constructor(e,t,n=16){this.mark=0,this.boxes=e,this.bounds=t,this.cell=n,this.cols=Math.max(1,Math.ceil((t.maxX-t.minX)/n)),this.rows=Math.max(1,Math.ceil((t.maxZ-t.minZ)/n));let r=new Int32Array(this.cols*this.rows+1),i=(e,t)=>{let[n,r,i,a]=this.range(e.minX,e.minZ,e.maxX,e.maxZ);for(let e=r;e<=a;e++)for(let r=n;r<=i;r++)t(e*this.cols+r)};for(let t of e)i(t,e=>r[e+1]++);for(let e=1;e<r.length;e++)r[e]+=r[e-1];this.start=r,this.items=new Int32Array(r[r.length-1]);let a=r.slice(0,-1);e.forEach((e,t)=>i(e,e=>this.items[a[e]++]=t)),this.stamp=new Uint32Array(e.length)}range(e,t,n,r){let i=this.bounds,a=(e,t)=>e<0?0:e>=t?t-1:e;return[a(Math.floor((e-i.minX)/this.cell),this.cols),a(Math.floor((t-i.minZ)/this.cell),this.rows),a(Math.floor((n-i.minX)/this.cell),this.cols),a(Math.floor((r-i.minZ)/this.cell),this.rows)]}query(e,t,n,r,i){++this.mark===4294967295&&(this.stamp.fill(0),this.mark=1);let a=this.mark,[o,s,c,l]=this.range(e,t,n,r);for(let u=s;u<=l;u++)for(let s=o;s<=c;s++){let o=u*this.cols+s;for(let s=this.start[o];s<this.start[o+1];s++){let o=this.items[s];if(this.stamp[o]===a)continue;this.stamp[o]=a;let c=this.boxes[o];c.maxX>e&&c.minX<n&&c.maxZ>t&&c.minZ<r&&i.push(c)}}}},Dh=class{constructor(e){this.s=e>>>0}next(){let e=this.s=this.s+1831565813>>>0;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}range(e,t){return e+(t-e)*this.next()}int(e,t){return e+Math.floor(this.next()*(t-e+1))}chance(e){return this.next()<e}pick(e){return e[Math.floor(this.next()*e.length)]}};function Oh(e,t){let n=Math.imul(e^2654435769,2246822507)^Math.imul(t+1663821227,3266489909);return n^=n>>>16,n=Math.imul(n,2146121005),n^=n>>>15,n>>>0}var kh=new G,Ah=new Map;function jh(e){let t=Ah.get(e);return t||(kh.setHex(e),t=[Math.round(kh.r*255),Math.round(kh.g*255),Math.round(kh.b*255)],Ah.set(e,t)),t}function Mh(e,t){let n=Math.min(255,Math.round((e>>16&255)*t)),r=Math.min(255,Math.round((e>>8&255)*t)),i=Math.min(255,Math.round((e&255)*t));return n<<16|r<<8|i}var Nh=class{constructor(){this.pos=new Float32Array(3072),this.nrm=new Int8Array(3072),this.col=new Uint8Array(3072),this.idx=new Uint32Array(1536),this.bid=new Float32Array(1024),this.curBid=0,this.vCount=0,this.iCount=0}ensure(e,t){if((this.vCount+e)*3>this.pos.length){let t=Math.max(this.pos.length*2,(this.vCount+e)*3),n=new Float32Array(t);n.set(this.pos),this.pos=n;let r=new Int8Array(t);r.set(this.nrm),this.nrm=r;let i=new Uint8Array(t);i.set(this.col),this.col=i;let a=new Float32Array(t/3);a.set(this.bid),this.bid=a}if(this.iCount+t>this.idx.length){let e=new Uint32Array(Math.max(this.idx.length*2,this.iCount+t));e.set(this.idx),this.idx=e}}vert(e,t,n,r,i,a,o){let s=this.vCount*3;this.pos[s]=e,this.pos[s+1]=t,this.pos[s+2]=n,this.nrm[s]=Math.round(r*127),this.nrm[s+1]=Math.round(i*127),this.nrm[s+2]=Math.round(a*127),this.col[s]=o[0],this.col[s+1]=o[1],this.col[s+2]=o[2],this.bid[this.vCount]=this.curBid,this.vCount++}quad(e,t,n,r,i,a,o,s,c,l,u,d,f){this.ensure(4,6);let p=r-e,m=i-t,h=a-n,g=l-e,_=u-t,v=d-n,y=m*v-h*_,b=h*g-p*v,x=p*_-m*g,S=Math.hypot(y,b,x)||1;y/=S,b/=S,x/=S;let C=jh(f),w=this.vCount;this.vert(e,t,n,y,b,x,C),this.vert(r,i,a,y,b,x,C),this.vert(o,s,c,y,b,x,C),this.vert(l,u,d,y,b,x,C);let T=this.iCount;this.idx[T]=w,this.idx[T+1]=w+1,this.idx[T+2]=w+2,this.idx[T+3]=w,this.idx[T+4]=w+2,this.idx[T+5]=w+3,this.iCount+=6}tri(e,t,n,r,i,a,o,s,c,l){this.quad(e,t,n,r,i,a,o,s,c,o,s,c,l)}flat(e,t,n,r,i,a){this.quad(e,i,r,n,i,r,n,i,t,e,i,t,a)}box(e,t,n,r,i,a,o,s,c,l=c){let u=Math.cos(o),d=Math.sin(o),f=r/2,p=a/2,m=t+i,h=(t,r)=>[e+t*u-r*d,n+t*d+r*u],[g,_]=h(-f,-p),[v,y]=h(f,-p),[b,x]=h(f,p),[S,C]=h(-f,p);this.quad(S,m,C,b,m,x,v,m,y,g,m,_,s),this.quad(v,t,y,g,t,_,g,m,_,v,m,y,l),this.quad(S,t,C,b,t,x,b,m,x,S,m,C,c),this.quad(b,t,x,v,t,y,v,m,y,b,m,x,c),this.quad(g,t,_,S,t,C,S,m,C,g,m,_,c)}aabb(e,t,n,r,i,a,o,s){this.box((e+r)/2,t,(n+a)/2,r-e,i-t,a-n,0,o,s)}frustum(e,t,n,r,i,a,o,s,c=s,l=0){let u=t+a;for(let a=0;a<o;a++){let d=l+a/o*Math.PI*2,f=l+(a+1)/o*Math.PI*2,p=Math.cos(d),m=Math.sin(d),h=Math.cos(f),g=Math.sin(f);this.quad(e+h*r,t,n+g*r,e+p*r,t,n+m*r,e+p*i,u,n+m*i,e+h*i,u,n+g*i,s),i>.001&&this.tri(e,u,n,e+h*i,u,n+g*i,e+p*i,u,n+m*i,c)}}beam(e,t,n,r,i,a,o,s){let c=r-e,l=i-t,u=a-n,d=Math.hypot(c,l,u)||1,f=-u/d,p=c/d,m=Math.hypot(f,p)||1;f/=m,p/=m,Math.hypot(c,u)<1e-6&&(f=1,p=0);let h=(l*p-u*0)/d,g=(u*f-c*p)/d,_=(c*0-l*f)/d,v=o/2,y=[[f*v+h*v,0*v+g*v,p*v+_*v],[-f*v+h*v,-0*v+g*v,-p*v+_*v],[-f*v-h*v,-0*v-g*v,-p*v-_*v],[f*v-h*v,0*v-g*v,p*v-_*v]];for(let o=0;o<4;o++){let c=y[o],l=y[(o+1)%4];this.quad(e+c[0],t+c[1],n+c[2],e+l[0],t+l[1],n+l[2],r+l[0],i+l[1],a+l[2],r+c[0],i+c[1],a+c[2],s)}}get triangles(){return this.iCount/3}toGeometry(){let e=new ti;e.setAttribute(`position`,new Br(this.pos.slice(0,this.vCount*3),3)),e.setAttribute(`normal`,new Br(this.nrm.slice(0,this.vCount*3),3,!0)),e.setAttribute(`color`,new Br(this.col.slice(0,this.vCount*3),3,!0)),e.setAttribute(`bid`,new Br(this.bid.slice(0,this.vCount),1));let t=this.vCount<65536?new Uint16Array(this.idx.subarray(0,this.iCount)):this.idx.slice(0,this.iCount);return e.setIndex(new Br(t,1)),e.computeBoundingSphere(),e.computeBoundingBox(),e}},Ph=64,Fh=Math.ceil((Vp.maxX-Vp.minX)/Ph),Ih=Math.ceil((Vp.maxZ-Vp.minZ)/Ph),Lh=-.8,Rh=.15,zh=260,Bh=3*.95,Vh=6,Hh=64,Uh=2.2,Wh=class{constructor(e,t=()=>0){this.object=new Qn,this.material=new ua({vertexColors:!0}),this.chunks=[],this.bufs=[],this.active=new Set,this.found=[],this.cutCount=0,this.at=(e,t)=>{let n=Math.min(Fh-1,Math.max(0,Math.floor((e-Vp.minX)/Ph))),r=Math.min(Ih-1,Math.max(0,Math.floor((t-Vp.minZ)/Ph)));return this.bufs[r*Fh+n]};let n=t();this.object.name=`city`;for(let e=0;e<Fh*Ih;e++)this.bufs.push(new Nh);qh(e,this.at),Yh(e,this.at),e.buildings.forEach((e,t)=>{let n=this.at((e.minX+e.maxX)/2,(e.minZ+e.maxZ)/2);n.curBid=t+1,Xh(e,n),n.curBid=0});for(let t of e.props)eg(t,this.at(t.x,t.z));tg(e.wires,this.at),ng(e,this.at);let r=e.buildings.length+1,i=Math.ceil(r/Hh);this.cutTex=new Oi(new Uint8Array(Hh*i*4),Hh,i,Ne,ye),this.cutTex.needsUpdate=!0,this.cut=new Float32Array(r),this.want=new Uint8Array(r);let a={cutTex:{value:this.cutTex},cutSize:{value:new V(Hh,i)},cutH:{value:Bh}};this.material.onBeforeCompile=e=>{Object.assign(e.uniforms,a),e.vertexShader=`attribute float bid;
uniform sampler2D cutTex;
uniform vec2 cutSize;
uniform float cutH;
`+e.vertexShader.replace(`#include <begin_vertex>`,[`#include <begin_vertex>`,`if (bid > 0.5) {`,`  vec2 cuv = vec2((mod(bid, cutSize.x) + 0.5) / cutSize.x, (floor(bid / cutSize.x) + 0.5) / cutSize.y);`,`  float cutAmt = texture2D(cutTex, cuv).r;`,`  if (transformed.y > cutH) transformed.y = mix(transformed.y, cutH, cutAmt);`,`}`].join(`
`))},this.material.customProgramCacheKey=()=>`city-cut`;let o=e.buildings.map((e,t)=>({minX:e.minX,minZ:e.minZ,maxX:e.maxX,maxZ:e.maxZ,i:t+1,h:e.height+1.6}));this.occGrid=new Eh(o,{...Vp});let s=0,c=0;this.bufs.forEach((e,t)=>{if(!e.iCount){this.chunks.push(null);return}let n=new Ti(e.toGeometry(),this.material);n.name=`city-chunk-${t}`,n.matrixAutoUpdate=!1,this.object.add(n),this.chunks.push(n),s+=e.triangles,c++}),this.bufs=[];let l=new Ti(new Qi(2e3,4e3).rotateX(-Math.PI/2),new ua({color:Q.water}));l.position.set(Up(68)+1e3,Lh,0),l.name=`water`;let u=new Ti(new Qi(4e3,4e3).rotateX(-Math.PI/2),new ua({color:Q.outside}));u.position.set(Up(68)-2e3,-.05,0),u.name=`land`,this.object.add(l,u),this.info={chunks:c,triangles:s,buildMs:t()-n}}update(e,t,n,r){for(let t=0;t<this.chunks.length;t++){let n=this.chunks[t];if(!n)continue;let r=t%Fh*Ph+Vp.minX+Ph/2,i=Math.floor(t/Fh)*Ph+Vp.minZ+Ph/2;n.visible=Math.hypot(r-e.camX,i-e.camZ)<zh}this.occlude(e,t,n,r)}occlude(e,t,n,r){let i=Uh,a=this.found;a.length=0,this.occGrid.query(Math.min(e.camX,t)-i,Math.min(e.camZ,n)-i,Math.max(e.camX,t)+i,Math.max(e.camZ,n)+i,a);for(let r of a){let a=!1;for(let o=0;o<7&&!a;o++){let s=o===1?-2.2:o===2?i:0,c=o===3?-2.2:o===4?i:0,l=o===5?.2:o===6?2.2:1.2;a=Gh(e.camX,e.camY,e.camZ,t+s,l,n+c,r)}a&&(this.want[r.i]=1,this.active.add(r.i))}let o=!1,s=0,c=this.cutTex.image.data,l=Math.min(1,Vh*r);for(let e of this.active){let t=this.want[e];this.want[e]=0;let n=this.cut[e],r=t?Math.min(1,n+l):Math.max(0,n-l);r!==n&&(this.cut[e]=r,c[e*4]=Math.round(r*255),o=!0),r===0&&!t?this.active.delete(e):s++}this.cutCount=s,o&&(this.cutTex.needsUpdate=!0)}showAll(){for(let e of this.chunks)e&&(e.visible=!0)}};function Gh(e,t,n,r,i,a,o){let s=0,c=1,l=[e,t,n],u=[r-e,i-t,a-n],d=[o.minX,0,o.minZ],f=[o.maxX,o.h,o.maxZ];for(let e=0;e<3;e++){if(Math.abs(u[e])<1e-9){if(l[e]<d[e]||l[e]>f[e])return!1;continue}let t=(d[e]-l[e])/u[e],n=(f[e]-l[e])/u[e];if(t>n){let e=t;t=n,n=e}if(t>s&&(s=t),n<c&&(c=n),s>c)return!1}return!0}function Kh(e){return e===X.LOT||e===X.PARK||e===X.WALL?Rh:e===X.WATER?Lh:0}function qh(e,t){let n=e.grid,r=n.size;for(let e=0;e<r;e++)for(let i=0;i<r;i++){let a=n.tiles[e*r+i],o=Up(i),s=Wp(e),c=Up(i+1),l=Wp(e+1),u=t((o+c)/2,(s+l)/2),d=Kh(a);switch(a){case X.WATER:break;case X.ROAD:u.flat(o,s,c,l,0,(i+e)%2?Q.asphalt:Mh(Q.asphalt,.98));break;case X.PLAZA:for(let t=0;t<2;t++)for(let n=0;n<2;n++){let r=(c-o)/2,a=(l-s)/2;u.flat(o+t*r,s+n*a,o+(t+1)*r,s+(n+1)*a,0,(t+n+i+e)%2?Q.plaza:Q.plazaDark)}break;case X.PARKING:u.flat(o,s,c,l,0,Q.parking);break;case X.DOCK:u.flat(o,s,c,l,0,(i+e)%2?Q.dock:Mh(Q.dock,.95));break;case X.PARK:u.flat(o,s,c,l,d,(i+e)%2?Q.park:Q.parkDark);break;case X.WALL:Jh(u,o,s,c,l,Xp(n,i,e-1),Xp(n,i+1,e),Xp(n,i,e+1),Xp(n,i-1,e));break;default:u.flat(o,s,c,l,d,Q.lot)}let f=[[Xp(n,i,e-1),0,-1],[Xp(n,i+1,e),1,0],[Xp(n,i,e+1),0,1],[Xp(n,i-1,e),-1,0]];for(let[e,t,n]of f){if(a===X.WATER)continue;let r=e===X.WATER||e===X.WALL?e===X.WATER?Lh:99:Kh(e);if(a===X.LOT&&(e===X.ROAD||e===X.PLAZA||e===X.PARKING||e===X.DOCK)){let e=Ip,r=t>0?c-e:o,i=t<0?o+e:c,a=n>0?l-e:s,d=n<0?s+e:l;u.flat(t===0?o:r,n===0?s:a,t===0?c:i,n===0?l:d,.16,Q.sidewalk)}if(r<d-.01){let i=e===X.WATER?Q.quay:Q.kerb;n<0?u.quad(c,r,s,o,r,s,o,d,s,c,d,s,i):n>0?u.quad(o,r,l,c,r,l,c,d,l,o,d,l,i):t>0?u.quad(c,r,l,c,r,s,c,d,s,c,d,l,i):u.quad(o,r,s,o,r,l,o,d,l,o,d,s,i)}}}for(let n of e.parking){let e=t(n.x,n.z);Math.abs(Math.sin(n.heading))>.5?(e.flat(n.x-3,n.z-1.65,n.x+3,n.z-1.55,.02,Q.markWhite),e.flat(n.x-3,n.z+1.55,n.x+3,n.z+1.65,.02,Q.markWhite)):(e.flat(n.x-1.65,n.z-3,n.x-1.55,n.z+3,.02,Q.markWhite),e.flat(n.x+1.55,n.z-3,n.x+1.65,n.z+3,.02,Q.markWhite))}}function Jh(e,t,n,r,i,a,o,s,c){e.aabb(t,0,n,r,6,i,Q.wallTop,Q.wall);let l=(t,n,r,i)=>{let a=Math.hypot(r-t,i-n);for(let o=1;o<a;o+=2){let s=o/a;e.box(t+(r-t)*s,6,n+(i-n)*s,1,.9,1,0,Q.wallTop,Mh(Q.wall,.92))}};a!==X.WALL&&l(t,n+.5,r,n+.5),s!==X.WALL&&l(t,i-.5,r,i-.5),o!==X.WALL&&l(r-.5,n,r-.5,i),c!==X.WALL&&l(t+.5,n,t+.5,i)}function Yh(e,t){let n=.02,{segments:r,intersections:i}=e.streets,a=(e,r,i,a,o,s,c)=>{let l=(i+a)/2;e===`h`?t(l,r+o).flat(i,r+o-s/2,a,r+o+s/2,n,c):t(r+o,l).flat(r+o-s/2,i,r+o+s/2,a,n,c)};for(let e of r){let t=e.from+1,n=e.to-1;if(!(n<=t)){if(e.kind===`arterial`){a(e.axis,e.c,t,n,-.22,.16,Q.markYellow),a(e.axis,e.c,t,n,.22,.16,Q.markYellow);for(let r of[-e.width/4,e.width/4])for(let i=t+1;i+3<n;i+=6)a(e.axis,e.c,i,i+3,r,.14,Q.markWhite)}else for(let r=t+1;r+2<n;r+=5)a(e.axis,e.c,r,r+2,0,.14,Q.markWhite)}}for(let e of i)if(e.kind===`cross`||e.kind===`tee`)for(let t of e.approaches){let n=r[t.segment];if(n.kind!==`arterial`||n.to-n.from<10)continue;let i=t.side===1?e.maxX:t.side===3?e.minX:t.side===2?e.maxZ:e.minZ,o=t.side===1||t.side===2?1:-1,s=i+o*.6,c=i+o*3.1;for(let e=-n.width/2+.8;e<n.width/2-.5;e+=1.2)a(n.axis,n.c,Math.min(s,c),Math.max(s,c),e+.3,.6,Q.markWhite)}}function Xh(e,t){let n=new Dh(e.seed),{minX:r,minZ:i,maxX:a,maxZ:o,height:s}=e,c=a-r,l=o-i,u=(r+a)/2,d=(i+o)/2;if(e.style===`warehouse`){let f=ah[e.paint%ah.length];t.aabb(r,0,i,a,s,o,ch,f);let p=2.2,m=n.chance(.5)?11035722:Mh(f,.8);c>=l?(t.quad(r,s,o,a,s,o,a,s+p,d,r,s+p,d,m),t.quad(a,s,i,r,s,i,r,s+p,d,a,s+p,d,Mh(m,.85)),t.tri(r,s,i,r,s,o,r,s+p,d,f),t.tri(a,s,o,a,s,i,a,s+p,d,f)):(t.quad(a,s,o,a,s,i,u,s+p,i,u,s+p,o,m),t.quad(r,s,i,r,s,o,u,s+p,o,u,s+p,i,Mh(m,.85)),t.tri(a,s,i,r,s,i,u,s+p,i,f),t.tri(r,s,o,a,s,o,u,s+p,o,f)),Zh(e,(n,r,i,a,o,c,l,u)=>{if(!(e.front&n))return;let d=Math.min(5,u-2);Qh(t,r,i,a,o,c,l,.5-d/(2*u),.5+d/(2*u),0,4.5,3815994),Qh(t,r,i,a,o,c,l,.05,.95,s-1.2,s-.6,Mh(f,.7))}),n.chance(.3)&&t.frustum(r+2,s,i+2,.6,.5,5,6,8026746);return}let f=ih[e.paint%ih.length],p=Mh(f,.82);t.aabb(r,0,i,a,s,o,sh,f);let m=.25,h=.7;t.aabb(r,s,i,a,s+h,i+m,p,p),t.aabb(r,s,o-m,a,s+h,o,p,p),t.aabb(r,s,i+m,r+m,s+h,o-m,p,p),t.aabb(a-m,s,i+m,a,s+h,o-m,p,p),Zh(e,(r,i,a,o,s,c,l,u)=>{if(r===1)return;let d=e.style===`shop`&&(e.front&r)!==0;for(let r=0;r<e.storeys;r++){let e=r*3;if(r===0&&d)continue;let f=Math.floor((u-.8)/2.6);if(f<=0)continue;let m=n.chance(.25)?uh:lh;for(let n=0;n<f;n++){let r=(n+.5)/f,d=.55/u;Qh(t,i,a,o,s,c,l,r-d,r+d,e+.9,e+2.1,m)}r>0&&Qh(t,i,a,o,s,c,l,0,1,e-.12,e+.08,p)}if(d&&$h(t,n,i,a,o,s,c,l,u),e.style===`house`&&e.front&r&&e.storeys>=2&&u>4&&n.chance(.6)){let r=n.int(1,e.storeys-1),u=(i+o)/2+c*.45,d=(a+s)/2+l*.45,m=Math.atan2(c,-l)+Math.PI;t.box(u,r*3,d,2.4,.15,.9,m,Mh(f,1.1),p),t.box(u-c*.4,r*3+.15,d-l*.4,2.4,.8,.08,m,p,p)}});for(let c=0;c<e.tanks;c++){let e=n.range(r+1.2,a-1.2),c=n.range(i+1.2,o-1.2);t.box(e,s,c,1.3,.4,1.3,0,7829367,7829367),t.frustum(e,s+.4,c,.65,.65,1.2,8,n.chance(.6)?fh:ph)}e.style===`house`&&c>5&&l>5&&n.chance(.35)&&t.aabb(a-2.8,s,i+.3,a-.3,s+2.4,i+2.8,sh,f),e.district===`temple`&&n.chance(.18)&&c>5&&l>5&&(t.box(u,s,d,2.4,.6,2.4,0,sh,p),t.frustum(u,s+.6,d,1.4,.2,1.6,8,yh,yh))}function Zh(e,t){let{minX:n,minZ:r,maxX:i,maxZ:a}=e;t(4,n,a,i,a,0,1,i-n),t(2,i,a,i,r,1,0,a-r),t(1,i,r,n,r,0,-1,i-n),t(8,n,r,n,a,-1,0,a-r)}function Qh(e,t,n,r,i,a,o,s,c,l,u,d){let f=.03,p=t+(r-t)*s+a*f,m=n+(i-n)*s+o*f,h=t+(r-t)*c+a*f,g=n+(i-n)*c+o*f;e.quad(p,l,m,h,l,g,h,u,g,p,u,m,d)}function $h(e,t,n,r,i,a,o,s,c){let l=Math.max(1,Math.min(3,Math.floor(c/3.2)));for(let c=0;c<l;c++){let u=c/l+.03,d=(c+1)/l-.03;Qh(e,n,r,i,a,o,s,u,d,.1,2.4,t.chance(.65)?3878698:dh);let f=t.pick(oh),p=n+(i-n)*u,m=r+(a-r)*u,h=n+(i-n)*d,g=r+(a-r)*d,_=(p+h)/2+o*.1,v=(m+g)/2+s*.1,y=Math.atan2(o,-s),b=Math.hypot(h-p,g-m);if(e.box(_,2.55,v,b,.75,.2,y+Math.PI,Mh(f,.8),Mh(f,.8),f),e.box(_+o*.11,2.75,v+s*.11,b*.6,.3,.02,y+Math.PI,16777215,16777215,f===16777215?14036526:16777215),t.chance(.7)){let c=t.pick(oh),l=Math.max(2,Math.round(b/.7));for(let t=0;t<l;t++){let f=u+(d-u)*t/l,p=u+(d-u)*(t+1)/l,m=n+(i-n)*f,h=r+(a-r)*f,g=n+(i-n)*p,_=r+(a-r)*p,v=1.5;e.quad(m+o*v,1.95,h+s*v,g+o*v,1.95,_+s*v,g,2.3,_,m,2.3,h,t%2?16052454:c)}}}}function eg(e,t){let n=new Dh(e.seed);switch(e.kind){case`tree`:{let r=e.h;t.box(e.x,Rh,e.z,.35,r*.45,.35,0,hh,hh);let i=n.pick(gh),a=1.6+r*.12;t.frustum(e.x,Rh+r*.4,e.z,a*.35,a,r*.22,6,Mh(i,.85),i,n.next()),t.frustum(e.x,Rh+r*.62,e.z,a,a*.2,r*.38,6,i,i,n.next());break}case`pole`:t.box(e.x,Rh,e.z,.2,e.h,.2,e.rot,_h,_h),t.box(e.x,Rh+e.h-.6,e.z,1.3,.1,.1,e.rot,_h,_h),n.chance(.3)&&t.box(e.x,Rh+e.h-1.6,e.z,.5,.6,.4,e.rot,5592405,6710886);break;case`stall`:{let r=n.pick(oh);t.box(e.x,Rh,e.z,e.w,.85,e.d,e.rot,mh,Mh(mh,.85));let i=Math.max(2,Math.round(e.w/.8)),a=Math.cos(e.rot),o=Math.sin(e.rot);for(let r=0;r<i;r++){let s=-e.w/2+(r+.5)*(e.w/i);t.box(e.x+s*a,1,e.z+s*o,e.w/i*.8,.25,e.d*.7,e.rot,n.pick(Th),Mh(n.pick(Th),.8))}for(let n of[-e.w/2+.06,e.w/2-.06])t.box(e.x+n*a- -e.d/2*o,Rh,e.z+n*o+-e.d/2*a,.07,2.3,.07,e.rot,mh,mh);t.box(e.x,2.4499999999999997,e.z,e.w+.4,.08,e.d+.5,e.rot,r,Mh(r,.8));break}case`teaStall`:{let r=n.pick([3050432,2072154,15228188,9322432]);t.box(e.x,Rh,e.z,e.w,2.1,e.d,e.rot,r,r,Mh(r,1.15)),t.box(e.x,2.25,e.z,e.w+.5,.12,e.d+.8,e.rot,14036526,11542560);let i=Math.cos(e.rot),a=Math.sin(e.rot),o=e.x+(e.d/2+.2)*a,s=e.z-(e.d/2+.2)*i;t.box(o,Rh,s,e.w*.9,.9,.4,e.rot,mh,Mh(mh,.85)),t.frustum(o,1.05,s,.15,.12,.3,6,12632256);break}case`fruitCart`:{let r=Math.cos(e.rot),i=Math.sin(e.rot);t.box(e.x,.7000000000000001,e.z,e.w,.15,e.d,e.rot,mh,Mh(mh,.8));for(let a=0;a<3;a++){let o=-e.w/2+(a+.5)*(e.w/3);t.box(e.x+o*r,.85,e.z+o*i,e.w/3*.85,.35,e.d*.8,e.rot,n.pick(Th),Mh(n.pick(Th),.8))}for(let n of[-e.w/2+.6,e.w/2-.6])for(let a of[-e.d/2-.05,e.d/2+.05])t.box(e.x+n*r-a*i,Rh,e.z+n*i+a*r,.6,.6,.08,e.rot,3355443,3355443);break}case`shrine`:t.box(e.x,0,e.z,e.w,.6,e.d,0,bh,bh),t.box(e.x,.6,e.z,e.w*.6,1.6,e.d*.6,0,yh,yh,Sh),t.frustum(e.x,2.2,e.z,e.w*.38,.15,2.6,8,xh,xh,Math.PI/8);break;case`bench`:t.box(e.x,0,e.z,e.w,.45,e.d,e.rot,mh,Mh(mh,.8));break;case`container`:{let r=Math.max(1,Math.round(e.h/2.6));for(let i=0;i<r;i++){let r=n.pick(Ch);t.box(e.x,i*2.6,e.z,e.w-.04,2.55,e.d-.04,e.rot,Mh(r,.9),r)}break}case`craneLeg`:t.box(e.x,0,e.z,e.w,e.h,e.d,0,wh,Mh(wh,.85));break;case`crane`:for(let n of[-5,5])t.box(e.x,18,e.z+n,10,1.2,1.2,0,wh,Mh(wh,.85));t.box(e.x+8,19.2,e.z,34,1.2,1.6,0,wh,Mh(wh,.8)),t.box(e.x-2,19.2,e.z,3,2.4,3,0,3355443,4868682),t.beam(e.x+18,19.2,e.z,e.x+18,6,e.z,.1,2236962);break;case`bollard`:t.frustum(e.x,0,e.z,.22,.18,e.h,6,3355443)}}function tg(e,t){for(let n=0;n<e.length;n+=6)t((e[n]+e[n+3])/2,(e[n+2]+e[n+5])/2).beam(e[n],e[n+1]+Rh,e[n+2],e[n+3],e[n+4]+Rh,e[n+5],.05,vh)}function ng(e,t){let n=e.temple,r=t(n.x,n.z),i=n.size;r.box(n.x,0,n.z,i,.6,i,0,bh,bh),r.box(n.x,.6,n.z,i-3,.6,i-3,0,yh,bh),r.box(n.x,1.2,n.z,i-6,.6,i-6,0,bh,bh),r.box(n.x,0,n.z+i/2+1,6,.3,2,0,yh,yh);let a=1.8;r.box(n.x,a,n.z+3.5,12,4.2,9,0,yh,yh),r.box(n.x,6,n.z+3.5,12.6,.5,9.6,0,Sh,Sh),r.frustum(n.x,6.5,n.z+3.5,5.6,2.2,2.4,4,bh,yh,Math.PI/4);for(let e of[-5,-1.7,1.7,5])r.box(n.x+e,a,n.z+8.4,.7,4.2,.7,0,bh,bh);r.box(n.x,a,n.z-4,9,4,9,0,yh,yh,bh),r.frustum(n.x,5.8,n.z-4,5.2,3.6,7,8,yh,yh,Math.PI/8),r.frustum(n.x,12.8,n.z-4,3.6,1.6,5,8,bh,bh,Math.PI/8),r.frustum(n.x,17.8,n.z-4,1.9,1.9,.6,12,bh,yh),r.frustum(n.x,18.400000000000002,n.z-4,.6,.05,1.4,8,xh,xh),r.beam(n.x+.3,18.400000000000002,n.z-4,n.x+.3,22.8,n.z-4,.08,4473924),r.tri(n.x+.3,22.8,n.z-4,n.x+.3,21.6,n.z-4,n.x+2.6,22.2,n.z-4,xh),r.tri(n.x+.3,21.6,n.z-4,n.x+.3,22.8,n.z-4,n.x+2.6,22.2,n.z-4,xh);for(let n of e.roundabouts){let e=t(n.x,n.z);e.frustum(n.x,0,n.z,n.island+.4,n.island+.4,.3,20,15658734,15658734),e.frustum(n.x,.3,n.z,n.island,n.island,.05,20,Q.island,Q.island);for(let t=0;t<10;t++){let r=t/10*Math.PI*2;e.box(n.x+Math.cos(r)*(n.island-1.2),.35,n.z+Math.sin(r)*(n.island-1.2),.9,.4,.9,r,t%2?15902017:15228314,5216828)}e.box(n.x,.35,n.z,2.6,1.2,2.6,0,yh,bh),e.frustum(n.x,1.55,n.z,.5,.4,6,8,yh),e.frustum(n.x,7.55,n.z,1.2,1.2,.4,12,xh,xh),e.frustum(n.x,7.95,n.z,.7,.05,1,8,xh)}for(let n of e.gates){let e=t(n.x,n.z),r=n.width/2+1.6,i=n.axis===`v`?-Math.sign(n.z):-Math.sign(n.x);for(let t of[-1,1]){let i=n.axis===`v`?n.x+t*r:n.x,a=n.axis===`v`?n.z:n.z+t*r;e.box(i,0,a,3.4,10,3.4,0,Q.wallTop,Mh(Q.wall,.95)),e.frustum(i,10,a,1.8,.2,2,8,yh,yh)}let a=n.width+3.2,o=3.7;n.axis===`v`?(e.box(n.x,7.4,n.z,a,2.2,3,0,Q.wallTop,Q.wall),e.box(n.x,0,n.z+i*o,n.width-.4,5.5,.4,0,mh,Mh(mh,.8))):(e.box(n.x,7.4,n.z,3,2.2,a,0,Q.wallTop,Q.wall),e.box(n.x+i*o,0,n.z,.4,5.5,n.width-.4,0,mh,Mh(mh,.8)))}}var rg=64,ig=15854560,ag=9076596,og=15260080,sg=3879724,cg=14263200,lg=new G;function ug(e,t,n,r,i,a,o){let s=new qi(e,t,n);s.translate(r,i,a),lg.setHex(o);let c=s.getAttribute(`position`).count,l=new Float32Array(c*3);for(let e=0;e<c;e++)l[e*3]=lg.r,l[e*3+1]=lg.g,l[e*3+2]=lg.b;return s.setAttribute(`color`,new Ur(l,3)),s}function dg(){let e=id.length,t=id.width,n=e*.33,r=e*.36,i=n+r/2,a=[ug(t,r,e*.72,0,i,.05*e,ig),ug(t*.7,r*.45,e*.18,0,i+r*.6,-.18*e,ag),ug(t*.55,r*.75,e*.26,0,i+r*.25,-.46*e,ig),ug(t*.4,r*.3,e*.08,0,i+r*.05,-.6*e,cg),ug(t*.12,r*.45,t*.12,-t*.22,i+r*.85,-.44*e,og),ug(t*.12,r*.45,t*.12,t*.22,i+r*.85,-.44*e,og),ug(t*.08,r*.9,t*.08,0,i-r*.2,.42*e,ag)];for(let[r,i]of[[-.3,-.25],[.3,-.25],[-.3,.32],[.3,.32]])a.push(ug(t*.2,n*.85,t*.2,r*t,n*.85/2+n*.15,i*e,ig)),a.push(ug(t*.22,n*.15,t*.22,r*t,n*.075,i*e,sg));let o=Lm(a,!1);for(let e of a)e.dispose();return o.computeBoundingSphere(),o}var fg=class{constructor(){this.d=new Zn,this.mesh=new Li(dg(),new ua({vertexColors:!0}),rg),this.mesh.instanceMatrix.setUsage(Pt),this.mesh.count=0,this.mesh.frustumCulled=!1,this.mesh.name=`cows`}sync(e,t,n){let r=this.d,i=0;for(let a of e.animals.cows){if(i>=rg)break;let e=a.px+(a.x-a.px)*t,o=a.pz+(a.z-a.pz)*t,s=Dm(a.pHeading,a.heading,t),c=Math.abs(Math.sin(a.walkDist*3))*.05,l=a.dazeT>0?Math.sin(n*14+a.id)*.2*Math.min(1,a.dazeT):0;r.position.set(e,c,o),r.rotation.set(0,-s,l,`YXZ`),r.updateMatrix(),this.mesh.setMatrixAt(i++,r.matrix)}this.mesh.count=i,this.mesh.instanceMatrix.needsUpdate=!0}},pg=64,mg=new G(16722474),hg=new G(2780159),gg=.25,_g=class{constructor(){this.object=new Qn,this.d=new Zn,this.c=new G,this.placesDone=!1,this.lamps=new Li(new qi(.42,.22,.32),new pi({color:16777215}),pg),this.lamps.instanceMatrix.setUsage(Pt),this.lamps.count=0,this.lamps.frustumCulled=!1;let e=new $i(Pl.radius-.6,Pl.radius,32);e.rotateX(-Math.PI/2),this.rings=new Li(e,new pi({color:16777215,transparent:!0,opacity:.7,depthWrite:!1}),16),this.rings.count=0,this.rings.frustumCulled=!1,this.posts=new Li(new Ji(.25,.25,3.2,6),new pi({color:16777215}),16),this.posts.count=0,this.posts.frustumCulled=!1,this.object.add(this.lamps,this.rings,this.posts),this.object.name=`police-view`}places(e){let t=e.places,n=[...t.paintShops.map(e=>({x:e.x,z:e.z,color:16732120,scale:1})),{x:t.hospital.x,z:t.hospital.z,color:16726843,scale:.45},{x:t.station.x,z:t.station.z,color:3898367,scale:.45}],r=this.d;n.forEach((e,t)=>{r.position.set(e.x,.06,e.z),r.rotation.set(0,0,0),r.scale.set(e.scale,1,e.scale),r.updateMatrix(),this.rings.setMatrixAt(t,r.matrix),this.rings.setColorAt(t,this.c.setHex(e.color)),r.position.set(e.x,1.6,e.z),r.scale.set(1,1,1),r.updateMatrix(),this.posts.setMatrixAt(t,r.matrix),this.posts.setColorAt(t,this.c.setHex(e.color))}),this.rings.count=n.length,this.posts.count=n.length,this.rings.instanceMatrix.needsUpdate=!0,this.posts.instanceMatrix.needsUpdate=!0,this.rings.instanceColor&&(this.rings.instanceColor.needsUpdate=!0),this.posts.instanceColor&&(this.posts.instanceColor.needsUpdate=!0)}sync(e,t,n){!this.placesDone&&e.city&&(this.places(e),this.placesDone=!0);let r=0,i=Math.floor(n*Nl.flashHz*2)%2,a=(e,n)=>{if(e.driver!==`npc`||e.stage===`wreck`)return;let a=Bl[e.type],o=e.px+(e.x-e.px)*t,s=e.pz+(e.z-e.pz)*t,c=Dm(e.pHeading,e.heading,t);for(let e of[-1,1]){if(r>=pg)return;let t=e*a.width*.22,l=Math.cos(c),u=Math.sin(c);this.d.position.set(o+l*t,a.height+.1,s+u*t),this.d.rotation.set(0,-c,0),this.d.scale.set(1,1,1),this.d.updateMatrix(),this.lamps.setMatrixAt(r,this.d.matrix);let d=e<0==((i+n)%2==0);this.c.copy(e<0?mg:hg).multiplyScalar(d?1.4:gg),this.lamps.setColorAt(r++,this.c)}};e.police.units.forEach((e,t)=>a(e.agent.v,t));for(let t of e.police.roadblocks)t.vehicles.forEach((e,t)=>a(e,t));this.lamps.count=r,this.lamps.instanceMatrix.needsUpdate=!0,this.lamps.instanceColor&&(this.lamps.instanceColor.needsUpdate=!0)}},vg=600,yg=64,bg=2.2,xg=.35,Sg=.7,Cg=.05,wg=class{constructor(){this.object=new Qn,this.nextMark=0,this.usedMarks=0,this.puffAge=new Float32Array(yg).fill(Sg),this.puffPos=new Float32Array(192),this.nextPuff=0,this.trails=new Map,this.d=new Zn,this.frame=0;let e=new Qi(1,1);e.rotateX(-Math.PI/2),this.marks=new Li(e,new pi({color:1842204,transparent:!0,opacity:.55,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}),vg),this.marks.instanceMatrix.setUsage(Pt),this.marks.count=0,this.marks.frustumCulled=!1,this.marks.name=`skid-marks`,this.puffs=new Li(new Zi(.5,0),new ua({color:14271643}),yg),this.puffs.instanceMatrix.setUsage(Pt),this.puffs.count=0,this.puffs.frustumCulled=!1,this.puffs.name=`dust`,this.object.add(this.marks,this.puffs)}sync(e,t,n){this.frame++;let r=this.d;for(let r of e.vehicles){let e=Bl[r.type],i=this.trails.get(r.id),a=r.skid>bg&&r.stage!==`wreck`;if(!i){if(!a)continue;i={lx:0,lz:0,rx:0,rz:0,on:!1,puffT:0,seen:0},this.trails.set(r.id,i)}i.seen=this.frame;let o=r.px+(r.x-r.px)*t,s=r.pz+(r.z-r.pz)*t,c=r.heading,l=Math.sin(c),u=-Math.cos(c),d=e.length*.32,f=e.model===`bike`?0:e.width*.38,p=o-l*d+u*f,m=s-u*d-l*f,h=o-l*d-u*f,g=s-u*d+l*f;if(!a){i.on=!1;continue}i.on||(i.on=!0,i.lx=p,i.lz=m,i.rx=h,i.rz=g),Math.hypot(p-i.lx,m-i.lz)>=xg&&(this.mark(i.lx,i.lz,p,m,e.model===`bike`?.18:.3),f>0&&this.mark(i.rx,i.rz,h,g,.3),i.lx=p,i.lz=m,i.rx=h,i.rz=g),i.puffT-=n,i.puffT<=0&&(i.puffT=Cg,this.puff(p,m),f>0&&this.puff(h,g))}for(let[e,t]of this.trails)t.seen!==this.frame&&this.trails.delete(e);let i=0;for(let e=0;e<yg;e++){let t=this.puffAge[e]+=n;if(t>=Sg)continue;let a=t/Sg,o=(.5+a*1.6)*(1-a*a);r.position.set(this.puffPos[e*3],.3+a*1.2,this.puffPos[e*3+2]),r.rotation.set(a*2,e,0),r.scale.set(o,o*.8,o),r.updateMatrix(),this.puffs.setMatrixAt(i++,r.matrix)}this.puffs.count=i,this.puffs.instanceMatrix.needsUpdate=!0,this.marks.count=this.usedMarks}mark(e,t,n,r,i){let a=this.d,o=Math.hypot(n-e,r-t);a.position.set((e+n)/2,.03,(t+r)/2),a.rotation.set(0,Math.atan2(n-e,r-t),0),a.scale.set(i,1,o+.05),a.updateMatrix(),this.marks.setMatrixAt(this.nextMark,a.matrix),this.nextMark=(this.nextMark+1)%vg,this.usedMarks=Math.min(vg,this.usedMarks+1),this.marks.instanceMatrix.needsUpdate=!0}puff(e,t){let n=this.nextPuff;this.nextPuff=(n+1)%yg,this.puffAge[n]=0,this.puffPos[n*3]=e,this.puffPos[n*3+2]=t}},Tg=class{constructor(e,n){this.scene=new sr,this.vehicles=new rh,this.walkers=new Nm,this.camTarget={x:0,z:0,vx:0,vz:0,driving:!1},this.city=null,this.cows=new fg,this.police=new _g,this.skids=new wg,this.renderer=new jl({antialias:!0,powerPreference:`high-performance`}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),e.appendChild(this.renderer.domElement);let r=new G(16048046);this.scene.background=r,this.scene.fog=new or(r,90,260),this.scene.add(new Na(16774358,11569746,1.4),new Ya(16777215,.3));let i=new Ja(16777215,1.6);i.position.set(-30,60,20),this.scene.add(i),this.scene.add(Pm(t.worldHalfSize));let a=Im(n.static);a&&this.scene.add(a),this.scene.add(this.vehicles.object,this.walkers.object),this.scene.add(this.cows.mesh,this.police.object),this.scene.add(this.skids.object),this.cam=new Xu(1),this.resize(),window.addEventListener(`resize`,()=>this.resize())}resize(){let e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t,!1),this.cam.setAspect(e/Math.max(1,t))}attachCity(e){return this.scene.getObjectByName(`ground`)?.removeFromParent(),this.city=new Wh(e,()=>performance.now()),this.scene.add(this.city.object),this.city}snapCamera(e){this.cam.snap(this.target(e,1))}handleEvents(e){for(let t of e)t.type===`crash`?this.cam.shake(t.impact):t.type===`explode`&&this.cam.shake(25)}render(e,t,n){this.vehicles.sync(e,t,e.time),this.walkers.sync(e,t),this.cows.sync(e,t,e.time),this.police.sync(e,t,e.time),this.skids.sync(e,t,n),this.cam.update(this.target(e,t),n),this.city?.update(this.cam.occlusionHint(),this.camTarget.x,this.camTarget.z,n),this.renderer.render(this.scene,this.cam.camera)}target(e,t){let n=this.camTarget,r=Iu(e,e.player.vehicleId),i=r??e.player.walker;return n.x=i.px+(i.x-i.px)*t,n.z=i.pz+(i.z-i.pz)*t,n.vx=i.vx,n.vz=i.vz,n.driving=!!r,n}stats(){let e=this.renderer.info.render;return{calls:e.calls,triangles:e.triangles}}},Eg=class{constructor(e,t){this.acc=0,this.dropped=0,this.dt=e,this.maxSteps=t}advance(e){this.acc+=Math.max(0,e);let t=Math.floor(this.acc/this.dt);return t>this.maxSteps?(this.dropped+=t-this.maxSteps,t=this.maxSteps,this.acc=0):this.acc-=t*this.dt,t}get alpha(){return Math.min(1,this.acc/this.dt)}reset(){this.acc=0}},Dg={arterial:13.9,street:9.7,lane:6.9,turn:5.5,ring:8,uturn:3},Og=Ap,kg=16;function Ag(e){let t=[],n=[],r=e.intersections.map(()=>[]),i=e.intersections.map(()=>[]),a=(e,n,r)=>(t.push({id:t.length,x:e,z:n,intersection:r}),t.length-1),o=(e,r,i,a,o,s,c,l)=>{let u=t[e],d=t[r];n.push({id:n.length,from:e,to:r,kind:i,width:a,speed:o,length:Math.hypot(d.x-u.x,d.z-u.z),segment:s,lane:c,intersection:l})};for(let t of e.segments){let e=t.width/(2*t.lanes),n=Dg[t.kind];for(let s of[1,-1]){let c=t.axis===`h`?s:0,l=t.axis===`v`?s:0,u=l,d=-c,f=s>0?t.a:t.b,p=s>0?t.b:t.a,m=s>0?t.from:t.to,h=s>0?t.to:t.from,g=t.axis===`h`?s>0?1:3:s>0?2:0,_=t.axis===`h`?s>0?3:1:s>0?0:2;for(let s=0;s<t.lanes;s++){let v=t.width/2-(s+.5)*e,y=t.axis===`h`?0:t.c+u*v,b=t.axis===`v`?0:t.c+d*v,x=a(t.axis===`h`?m:y,t.axis===`v`?m:b,f),S=a(t.axis===`h`?h:y,t.axis===`v`?h:b,p);o(x,S,`lane`,e,n,t.id,s,-1),i[f].push({node:x,dx:c,dz:l,k:s,n:t.lanes,side:g,speed:n,width:e}),r[p].push({node:S,dx:c,dz:l,k:s,n:t.lanes,side:_,speed:n,width:e})}}}for(let n of e.intersections){let e=r[n.id],c=i[n.id];if(n.kind===`roundabout`){s(n,e,c);continue}let l=n.approaches.length===1;for(let r of e)for(let e of c){if(e.side===r.side){if(!l||e.k!==r.k)continue;o(r.node,e.node,`junction`,r.width,Dg.uturn,-1,-1,n.id);continue}if(r.n!==e.n||r.k===e.k){if(r.dx===e.dx&&r.dz===e.dz)o(r.node,e.node,`junction`,Math.min(r.width,e.width),Math.min(r.speed,e.speed),-1,-1,n.id);else{let i=t[r.node],s=t[e.node],c=r.dx===0?a(i.x,s.z,n.id):a(s.x,i.z,n.id);o(r.node,c,`junction`,r.width,Dg.turn,-1,-1,n.id),o(c,e.node,`junction`,e.width,Dg.turn,-1,-1,n.id)}}}}function s(e,n,r){let i=[];for(let t=0;t<kg;t++){let n=t/kg*Math.PI*2;i.push(a(e.cx+Og*Math.sin(n),e.cz-Og*Math.cos(n),e.id))}for(let t=0;t<kg;t++)o(i[t],i[(t+1)%kg],`ring`,5,Dg.ring,-1,-1,e.id);let s=n=>{let r=t[n],i=Math.atan2(r.x-e.cx,-(r.z-e.cz));return i<0&&(i+=Math.PI*2),i/(Math.PI*2)*kg};for(let t of n)o(t.node,i[Math.ceil(s(t.node)+.01)%kg],`junction`,t.width,Dg.turn,-1,-1,e.id);for(let t of r)o(i[Math.floor(s(t.node)-.01+kg)%kg],t.node,`junction`,t.width,Dg.turn,-1,-1,e.id)}let c=t.map(()=>[]),l=t.map(()=>[]),u=e.intersections.map(()=>[]);for(let e of n)c[e.from].push(e.id),l[e.to].push(e.id),e.intersection>=0&&u[e.intersection].push(e.id);return{nodes:t,edges:n,outEdges:c,inEdges:l,intersectionEdges:u}}function jg(e,t){let n=[],r=new Map,i=(e,t)=>{let i=`${Math.round(e*100)},${Math.round(t*100)}`,a=r.get(i);return a===void 0&&(a=n.length,n.push({x:e,z:t}),r.set(i,a)),a},a=[],o=e.intersections.map(()=>[]);for(let t of e.segments){let n=e.intersections[t.a],r=e.intersections[t.b],s=n.kind===`deadend`?t.from+Lp:t.from-Lp,c=r.kind===`deadend`?t.to-Lp:t.to+Lp;for(let e of[-1,1]){let n=t.c+e*(t.width/2+Lp),r=t.axis===`h`?i(s,n):i(n,s),l=t.axis===`h`?i(c,n):i(n,c);a.push([r,l]),o[t.a].push(r),o[t.b].push(l)}}for(let t of e.intersections){let e=o[t.id];if(t.kind!==`deadend`){let n=Lp;e.push(i(t.minX-n,t.minZ-n),i(t.maxX+n,t.minZ-n),i(t.maxX+n,t.maxZ+n),i(t.minX-n,t.maxZ+n))}let r=[...new Set(e)].sort((e,r)=>Math.atan2(n[e].z-t.cz,n[e].x-t.cx)-Math.atan2(n[r].z-t.cz,n[r].x-t.cx));if(r.length===2)a.push([r[0],r[1]]);else if(r.length>2)for(let e=0;e<r.length;e++)a.push([r[e],r[(e+1)%r.length]])}let s=new Int32Array(n.length).fill(-1),c=[];n.forEach((e,n)=>{t(e.x,e.z)&&(s[n]=c.length,c.push(e))});let l=[],u=c.map(()=>[]),d=new Set;for(let[e,t]of a){let n=s[e],r=s[t];if(n<0||r<0||n===r)continue;let i=n<r?`${n},${r}`:`${r},${n}`;d.has(i)||(d.add(i),l.push(n,r),u[n].push(r),u[r].push(n))}return{nodes:c,edges:l,adj:u}}var Mg=3.2;function Ng(){let e=[];for(let t of Np)for(let n=t.y0;n<=t.y1;n++){let r=(Bp[n]+Bp[n+1])/2,i=(n-t.y0)%2==0?0:Math.PI;for(let n=zp[t.x0]+Mg/2+.3;n<zp[t.x1+1]-Mg/2;n+=Mg)e.push({x:n,z:r,heading:i,kind:`car`})}for(let t of Pp){let n=zp[t.x0],r=(Bp[t.y0]+Bp[t.y1+1])/2;e.push({x:n+6.5,z:r,heading:Math.PI/2,kind:`truck`},{x:n+16.5,z:r,heading:Math.PI/2,kind:`truck`})}return e}var Pg=Ng(),Fg=6.5,Ig=1.1,Lg=Ip-Ig/2-.05;function Rg(e,t,n){let r=new Dh(n),i=[],a=[],o=[],s=[],c=e.size,l=(t,n)=>wp[e.district[n*c+t]],u=(e,t,r,i,o,s,c,l=!0)=>{a.push({kind:e,x:t,z:r,rot:i,w:o,d:s,h:c,seed:Oh(n,a.length),solid:l})},d=new Uint8Array(c*c),f={bazaar:{w:[1,2],d:[1,2]},temple:{w:[1,2],d:[1,2]},residential:{w:[1,2],d:[1,2]},industrial:{w:[2,4],d:[2,3]}};for(let t=0;t<c;t++)for(let n=0;n<c;n++){if(d[t*c+n]||e.tiles[t*c+n]!==X.LOT)continue;let i=l(n,t),a=f[i],o=r.int(a.w[0],a.w[1]),s=r.int(a.d[0],a.d[1]),u=(t,n)=>t<c&&n<c&&!d[n*c+t]&&e.tiles[n*c+t]===X.LOT&&l(t,n)===i,m=(e,t)=>{for(let r=0;r<t;r++)if(!u(n+r,e))return!1;return!0};for(;o>1&&!m(t,o);)o--;let h=1;for(;h<s&&m(t+h,o);)h++;s=h;for(let e=t;e<t+s;e++)for(let t=n;t<n+o;t++)d[e*c+t]=1;p({x0:n,y0:t,x1:n+o-1,y1:t+s-1},i)}function p(t,r){let a=new Dh(Oh(n,t.y0*1e3+t.x0)),o=e=>{let t=!1,n=a.range(.15,.6);for(let r of e)r===X.ROAD||r===X.PLAZA||r===X.PARKING||r===X.DOCK?(n=Ip,r!==X.PARKING&&(t=!0)):r===X.PARK?n=Math.max(n,Ip):r===X.WALL?n=Math.max(n,.5):r===X.WATER&&(n=Math.max(n,2));return{inset:n,front:t}},s=[],c=[],l=[],d=[];for(let n=t.x0;n<=t.x1;n++)s.push(Xp(e,n,t.y0-1)),c.push(Xp(e,n,t.y1+1));for(let n=t.y0;n<=t.y1;n++)l.push(Xp(e,t.x0-1,n)),d.push(Xp(e,t.x1+1,n));let f=o(s),p=o(c),h=o(l),g=o(d),_=Up(t.x0)+h.inset,v=Up(t.x1+1)-g.inset,y=Wp(t.y0)+f.inset,b=Wp(t.y1+1)-p.inset;if(v-_<2.5||b-y<2.5)return;let x=+!!f.front|(g.front?2:0)|(p.front?4:0)|(h.front?8:0);if(r===`industrial`){if(a.chance(.3)){m(a,_,y,v,b);return}let e=a.range(6,10);i.push({minX:_,minZ:y,maxX:v,maxZ:b,height:e,storeys:1,style:`warehouse`,district:r,paint:a.int(0,4),tanks:0,front:x,seed:a.int(0,1e9)});return}if(r===`residential`&&a.chance(.05)){for(let e=0;e<3;e++)u(`tree`,a.range(_+1.5,v-1.5),a.range(y+1.5,b-1.5),0,.5,.5,a.range(5,7));return}let S=r===`temple`?a.int(2,3):a.int(2,4),C=r===`bazaar`||r===`temple`&&x&&a.chance(.6)||x&&a.chance(.2)?`shop`:`house`,w=r===`residential`?a.chance(.8)?a.int(1,2):0:+!!a.chance(.55);i.push({minX:_,minZ:y,maxX:v,maxZ:b,height:S*3+.4,storeys:S,style:C,district:r,paint:a.int(0,9),tanks:w,front:x,seed:a.int(0,1e9)})}function m(e,t,n,r,i){for(let a=n+2;a+2.6<i-1;a+=3.4)for(let n=t+2;n+6.2<r-1;n+=7)e.chance(.2)||u(`container`,n+3.05,a+1.22,Math.PI/2,2.44,6.1,2.6*e.int(1,3))}for(let r of t.segments){let t=r.to-r.from;if(t<6)continue;let i=new Dh(Oh(n^24301,r.id)),a=(r.from+r.to)/2,o=r.axis===`h`?a:r.c,s=r.axis===`v`?a:r.c,c=l(Kp(o),qp(s)),d=c===`bazaar`,f=(t,n,i)=>{let a=r.c+t*(r.width/2+i),o=r.axis===`h`?n:a,s=r.axis===`v`?n:a;return{x:o,z:s,rot:r.axis===`h`?t<0?Math.PI:0:t<0?Math.PI/2:-Math.PI/2,t:Zp(e,o,s)}},p=e=>e===X.LOT||e===X.PARK,m=d?[-1,1]:c===`industrial`||r.kind!==`arterial`?[i.chance(.5)?-1:1]:[],g=d?14:18,_=Math.max(1,Math.floor((t-4)/g)),v=r.from+(t-(_-1)*g)/2,y={};for(let e of m){y[e]=[];for(let t=0;t<_;t++){let n=f(e,v+t*g,.3);if(!p(n.t)){y[e].push(null);continue}u(`pole`,n.x,n.z,n.rot,.3,.3,Fg),y[e].push({x:n.x,z:n.z})}let t=y[e];for(let e=1;e<t.length;e++){let n=t[e-1],r=t[e];n&&r&&h(n.x,n.z,r.x,r.z,i)}}if(d&&y[-1]&&y[1])for(let e=0;e<_;e++){let t=y[-1][e],n=y[1][e];t&&n&&i.chance(.6)&&h(t.x,t.z,n.x,n.z,i)}if(!d){let e=r.kind===`arterial`?[-1,1]:[m[0]===1?-1:1],t=c===`industrial`?.25:.7;for(let n of e)for(let e=r.from+5+i.range(0,4);e<r.to-4;e+=i.range(9,15)){if(!i.chance(t))continue;let r=f(n,e,.6);p(r.t)&&u(`tree`,r.x,r.z,0,.5,.5,i.range(5,8))}}let b=d?.85:c===`temple`?.25:0;if(b>0)for(let e of[-1,1]){let t=r.from+3+i.range(0,3);for(;t<r.to-5;){let n=i.range(2,3);if(i.chance(b)){let r=f(e,t+n/2,Lg),a=f(e,t,Lg),o=f(e,t+n,Lg);if(r.t===X.LOT&&a.t===X.LOT&&o.t===X.LOT){let e=i.next(),t=e<.5?`stall`:e<.75?`teaStall`:`fruitCart`;u(t,r.x,r.z,r.rot,n,Ig,t===`fruitCart`?1.1:2.4)}}t+=n+i.range(1,d?4:9)}}}function h(e,t,n,r,i){let a=Fg-i.range(.3,.8),s=Fg-i.range(.3,.8),c=(e+n)/2,l=(t+r)/2,u=(a+s)/2-i.range(.4,1);o.push(e,a,t,c,u,l,c,u,l,n,s,r)}let g=jp[0],_=Up(g.x0),v=Up(g.x1+1),y=Wp(g.y0),b=Wp(g.y1+1),x=(v-_)/2,S=(b-y)/2,C=(_+v)/2,w=(y+b)/2,T={x:C,z:w,size:22};{let e=new Dh(Oh(n,7001));for(let[e,t]of[[-1,-1],[1,-1],[1,1],[-1,1]])u(`shrine`,C+e*(x-13),w+t*(S-12),0,4,4,6),u(`tree`,C+e*(x-3),w+t*(S-3),0,.6,.6,8);for(let t=0;t<4;t++){let n=t===0||t===2?x:S;for(let r=-n+7;r<n-7;r+=4.5){if(Math.abs(r)<7||!e.chance(.7))continue;let n=(t===0||t===2?S:x)-3.5,i=t===0||t===2?C+r:C+(t===1?n:-n),a=t===1||t===3?w+r:w+(t===2?n:-n),o=t===0?Math.PI:t===1?-Math.PI/2:t===2?0:Math.PI/2;u(e.chance(.3)?`teaStall`:`stall`,i,a,o,2.6,1.3,2.4)}}for(let e=0;e<6;e++){let t=e/6*Math.PI*2+.3;u(`bench`,C+Math.cos(t)*16,w+Math.sin(t)*16,-t-Math.PI/2,2,.6,.5,!1)}}{let e=jp[1],t=new Dh(Oh(n,7002)),r=(Up(e.x0)+Up(e.x1+1))/2,i=(Wp(e.y0)+Wp(e.y1+1))/2;u(`tree`,r,i,0,.8,.8,9);for(let e of[-10,-3.5,3.5,10])for(let n of[-9,9]){let a=t.chance(.35)?`fruitCart`:t.chance(.3)?`teaStall`:`stall`;u(a,r+e,i+n,n<0?Math.PI:0,2.8,1.4,a===`fruitCart`?1.1:2.4)}}Mp.forEach((e,t)=>{let r=new Dh(Oh(n,7100+t));for(let n=e.y0;n<=e.y1;n++)for(let i=e.x0;i<=e.x1;i++){let a=i===e.x0||i===e.x1||n===e.y0||n===e.y1;if(t===0&&!a)continue;let o=r.int(1,2);for(let e=0;e<o;e++)u(`tree`,r.range(Up(i)+1.5,Up(i+1)-1.5),r.range(Wp(n)+1.5,Wp(n+1)-1.5),0,.5,.5,r.range(5,9))}let i=(Up(e.x0)+Up(e.x1+1))/2;u(`bench`,i,Wp(e.y1+1)-2.5,0,2,.6,.5),u(`bench`,i,Wp(e.y0)+2.5,Math.PI,2,.6,.5)}),s.push(...Pg),Pp.forEach((e,t)=>{let r=new Dh(Oh(n,7200+t)),i=Up(e.x0),a=Up(e.x1+1),o=Wp(e.y0),s=Wp(e.y1+1),c=(o+s)/2,l=a-9;for(let e of[-4,4])for(let t of[-5,5])u(`craneLeg`,l+e,c+t,0,1,1,18);u(`crane`,l,c,0,9,11,22,!1);for(let e=i+4;e<l-8;e+=7)r.chance(.5)&&u(`container`,e+3,o+3,Math.PI/2,2.44,6.1,2.6*r.int(1,2));for(let e=i+3;e<a-1;e+=6)u(`bollard`,e,o+.6,0,.5,.5,.7),u(`bollard`,e,s-.6,0,.5,.5,.7)});let E=[];for(let n of t.intersections){if(n.kind!==`deadend`)continue;let r=t.segments[n.approaches[0].segment],i=n.approaches[0].side===0?{dx:0,dz:1}:n.approaches[0].side===2?{dx:0,dz:-1}:n.approaches[0].side===1?{dx:-1,dz:0}:{dx:1,dz:0};Zp(e,n.cx+i.dx*2,n.cz+i.dz*2)===X.WALL&&E.push({x:n.cx+i.dx*5,z:n.cz+i.dz*5,axis:r.axis,width:r.width})}let D=e=>({minX:Up(e.x0),minZ:Wp(e.y0),maxX:Up(e.x1+1),maxZ:Wp(e.y1+1)}),O=[D(jp[0]),D(jp[1]),D(Mp[0])];{let e=new Dh(Oh(n,7300)),r=t.segments.filter(e=>e.kind===`lane`&&e.to-e.from>=24);for(let t=0;t<4&&r.length;t++){let t=r.splice(e.int(0,r.length-1),1)[0];O.push(t.axis===`h`?{minX:t.from,maxX:t.to,minZ:t.c-t.width/2,maxZ:t.c+t.width/2}:{minX:t.c-t.width/2,maxX:t.c+t.width/2,minZ:t.from,maxZ:t.to})}}return{buildings:i,props:a,wires:o,parking:s,gates:E,cowZones:O,temple:T}}function zg(e){let t=Math.round(e.rot/(Math.PI/2)),n=Math.abs(t)%2==1,r=(n?e.d:e.w)/2,i=(n?e.w:e.d)/2;return{minX:e.x-r,minZ:e.z-i,maxX:e.x+r,maxZ:e.z+i}}var Bg=1.5;function Vg(){let e=Dp.map((e,t)=>{let n=e.axis===`h`?{x0:e.from,x1:e.to,y0:e.at,y1:e.at+e.w-1}:{x0:e.at,x1:e.at+e.w-1,y0:e.from,y1:e.to},r=e.axis===`h`?Wp(e.at):Up(e.at),i=e.axis===`h`?Wp(e.at+e.w):Up(e.at+e.w);return{id:t,axis:e.axis,kind:e.kind,width:i-r,lanes:e.w,c:(r+i)/2,...n}}),t=Op.map(e=>({...e,round:!0})),n=new Set,r=(e,t)=>e.x0>=t.x0&&e.x1<=t.x1&&e.y0>=t.y0&&e.y1<=t.y1;for(let i of e)if(i.axis===`h`)for(let a of e){if(a.axis!==`v`)continue;let e={x0:Math.max(i.x0,a.x0),x1:Math.min(i.x1,a.x1),y0:Math.max(i.y0,a.y0),y1:Math.min(i.y1,a.y1)};if(e.x0>e.x1||e.y0>e.y1||Op.some(t=>r(e,t)))continue;if(e.x0!==a.x0||e.x1!==a.x1||e.y0!==i.y0||e.y1!==i.y1)throw Error(`city: road ${i.id} and ${a.id} meet without crossing each other's full width (tiles ${e.x0},${e.y0})`);let o=`${e.x0},${e.y0},${e.x1},${e.y1}`;n.has(o)||(n.add(o),t.push({...e,round:!1}))}let i=t.map((e,t)=>{let n=Up(e.x0),r=Up(e.x1+1),i=Wp(e.y0),a=Wp(e.y1+1);return{id:t,kind:e.round?`roundabout`:`cross`,minX:n,minZ:i,maxX:r,maxZ:a,cx:(n+r)/2,cz:(i+a)/2,approaches:[]}}),a=[],o=(e,t)=>{let n=i.length,r=e.axis===`h`?t:e.c-e.width/2,a=e.axis===`h`?t:e.c+e.width/2,o=e.axis===`v`?t:e.c-e.width/2,s=e.axis===`v`?t:e.c+e.width/2;return i.push({id:n,kind:`deadend`,minX:r,minZ:o,maxX:a,maxZ:s,cx:(r+a)/2,cz:(o+s)/2,approaches:[]}),n};for(let n of e){let e=n.axis===`h`,r=t=>e?Up(t):Wp(t),i=e?n.x0:n.y0,a=e?n.x1:n.y1,c=t.map((e,t)=>({rc:e,id:t})).filter(({rc:e})=>e.x0<=n.x1&&e.x1>=n.x0&&e.y0<=n.y1&&e.y1>=n.y0).map(({rc:t,id:n})=>({id:n,a0:e?t.x0:t.y0,a1:e?t.x1:t.y1})).sort((e,t)=>e.a0-t.a0);if(!c.length)throw Error(`city: road ${n.id} meets no other road`);let l=-1,u=i,d=r(i);c[0].a0>i&&(d+=Bg,l=o(n,d));for(let e of c)l>=0&&e.a0>u&&s(n,l,e.id,d,r(e.a0)),l=e.id,u=Math.max(u,e.a1+1),d=r(u);if(u<=a){let e=r(a+1)-Bg;s(n,l,o(n,e),d,e)}}function s(e,t,n,r,o){if(o<=r)return;let s=a.length;a.push({id:s,road:e.id,axis:e.axis,kind:e.kind,width:e.width,lanes:e.lanes,c:e.c,from:r,to:o,a:t,b:n}),i[t].approaches.push({side:e.axis===`h`?1:2,segment:s}),i[n].approaches.push({side:e.axis===`h`?3:0,segment:s})}for(let e of i){if(e.kind===`roundabout`||e.kind===`deadend`)continue;let t=e.approaches.length;e.kind=t>=4?`cross`:t===3?`tee`:`corner`}return{roads:e,segments:a,intersections:i}}var Hg=new Map;function Ug(e=Sp){let t=Hg.get(e);return t||(t=Wg(e),Hg.set(e,t)),t}function Wg(e=Sp){let t=Jp(),n=Vg(),r=Ag(n),i=Rg(t,n,e),a=[];for(let e of i.buildings)a.push({minX:e.minX,minZ:e.minZ,maxX:e.maxX,maxZ:e.maxZ});for(let e of i.props)e.solid&&a.push(zg(e));let o=i.temple.size/2;a.push({minX:i.temple.x-o,minZ:i.temple.z-o,maxX:i.temple.x+o,maxZ:i.temple.z+o});let s=Op.map(e=>{let t=(Up(e.x0)+Up(e.x1+1))/2,n=(Wp(e.y0)+Wp(e.y1+1))/2,r=kp,i=r*.85;return a.push({minX:t-i,minZ:n-i,maxX:t+i,maxZ:n+i}),{x:t,z:n,island:r}});a.push(...Gg(t,X.WALL),...Gg(t,X.WATER));let c=new Eh(a.slice(0,i.buildings.length),{...Vp}),l=[],u=jg(n,(e,n)=>Hp(Zp(t,e,n))?(l.length=0,c.query(e-.3,n-.3,e+.3,n+.3,l),l.length===0):!1),d=[];for(let e of n.intersections){if(e.kind===`deadend`||e.kind===`roundabout`)continue;let t=e.approaches.filter(e=>n.segments[e.segment].kind===`arterial`).length,r=e.approaches.length-t;(t>=3||t>=2&&r===0)&&d.push(e.id)}let f=new Eh(a,{...Vp});return{seed:e,grid:t,streets:n,lanes:r,peds:u,...i,boxes:a,staticWorld:f,chowks:d,roundabouts:s,spawn:{...Fp},toJSON:()=>({city:e})}}function Gg(e,t){let n=e.size,r=new Map,i=[];for(let a=0;a<n;a++){let o=[];for(let i=0;i<n;i++){if(e.tiles[a*n+i]!==t)continue;let s=i;for(;s+1<n&&e.tiles[a*n+s+1]===t;)s++;let c=`${i},${s}`;o.push(c);let l=r.get(c);l?l.maxZ=Wp(a+1):r.set(c,{minX:Up(i),maxX:Up(s+1),minZ:Wp(a),maxZ:Wp(a+1)}),i=s}for(let[e,t]of r)o.includes(e)||(i.push(t),r.delete(e))}return i.push(...r.values()),i}var Kg={nearSpawn:[{type:`rickshaw`,driver:!0},{type:`rickshaw`,driver:!1},{type:`taxi`,driver:!1},{type:`motorbike`,driver:!1},{type:`police`,driver:!1}],spawnClear:7,spreadCount:26,spreadMix:[`taxi`,`rickshaw`,`motorbike`,`rickshaw`,`taxi`,`bus`,`rickshaw`,`motorbike`,`truck`,`taxi`],spreadSpacing:28,chowkPolice:2,lotEvery:3,lotMix:[`taxi`,`rickshaw`,`taxi`,`motorbike`,`rickshaw`,`taxi`],kerbStep:6,kerbEndMargin:5},qg=Ul(),Jg=Ul(),Yg=Hl(),Xg=[];function Zg(e,t){let n=e.player,r=n.walker;r.x=r.px=n.spawnX=t.spawn.x,r.z=r.pz=n.spawnZ=t.spawn.z,r.heading=r.pHeading=t.spawn.heading;let i=$g(t),a=[],o=(n,r,i)=>{let o=r.half-Bl[n].width/2-.15,s=r.x-Math.cos(r.heading)*o,c=r.z-Math.sin(r.heading)*o;return Math.hypot(s-t.spawn.x,c-t.spawn.z)<Kg.spawnClear||!e_(e,n,s,c,r.heading,i)?!1:(a.push({x:s,z:c}),!0)},s=(e,t)=>a.every(n=>Math.hypot(n.x-e.x,n.z-e.z)>=t),c=[...i].sort((e,n)=>Qg(e,t.spawn)-Qg(n,t.spawn)),l=0;for(let e of Kg.nearSpawn){for(;l<c.length&&!(s(c[l],5)&&o(e.type,c[l],e.driver));)l++;l++}for(let e of t.chowks.slice(1,1+Kg.chowkPolice)){let n=t.streets.intersections[e],r=[...i].sort((e,t)=>Qg(e,{x:n.cx,z:n.cz})-Qg(t,{x:n.cx,z:n.cz}));for(let e of r)if(s(e,5)&&o(`police`,e,!1))break}let u=0;for(let e=0,t=0;e<i.length&&u<Kg.spreadCount;e++,t=(t+37)%i.length){let e=i[t];s(e,Kg.spreadSpacing)&&o(Kg.spreadMix[u%Kg.spreadMix.length],e,!1)&&u++}let d=0;Pg.forEach((t,n)=>{t.kind===`truck`?e_(e,`truck`,t.x,t.z,t.heading,!1):n%Kg.lotEvery===0&&e_(e,Kg.lotMix[d++%Kg.lotMix.length],t.x,t.z,t.heading,!1)})}function Qg(e,t){return Math.hypot(e.x-t.x,e.z-t.z)}function $g(e){let t=[],{nodes:n,edges:r}=e.lanes;for(let e of r){if(e.kind!==`lane`||e.lane!==0)continue;let r=n[e.from],i=n[e.to],a=Math.hypot(i.x-r.x,i.z-r.z);if(a<Kg.kerbEndMargin*2+4)continue;let o=(i.x-r.x)/a,s=(i.z-r.z)/a,c=Math.atan2(o,-s);for(let n=Kg.kerbEndMargin;n<=a-Kg.kerbEndMargin;n+=Kg.kerbStep)t.push({x:r.x+o*n,z:r.z+s*n,heading:c,half:e.width/2})}return t}function e_(e,t,n,r,i,a){let o=Bl[t];Wl(qg,n,r,i,o.width/2+.25,o.length/2+.25);let{ex:s,ez:c}=Kl(qg),l=e.static.bounds;if(n-s<l.minX||n+s>l.maxX||r-c<l.minZ||r+c>l.maxZ)return!1;Xg.length=0,e.static.query(n-s,r-c,n+s,r+c,Xg);for(let e of Xg)if(Jl(qg,Gl(Jg,e),Yg))return!1;for(let t of e.vehicles)if(Jl(qg,hu(t,Jg),Yg))return!1;return ym(e,fu(0,t,n,r,i,a?`npc`:`none`)),!0}var t_=class{constructor(e,t=!1){this.t=0,this.frames=0,this.skip=2,this.density=n_(e??ad.weakStart),this.auto=!t}frame(e){if(!this.auto||(this.t+=e,this.frames++,this.t<ad.window))return!1;let t=this.frames/this.t;return this.t=0,this.frames=0,this.skip>0?(this.skip--,!1):t>=ad.lowFps||this.density<=ad.min?!1:(this.density=n_(this.density-ad.step),!0)}};function n_(e){return Math.max(ad.min,Math.min(ad.max,e))}var r_=new Map;function i_(e,t){r_.set(e,t)}function a_(e){let t=r_.get(e);if(!t||!M.rewardedAvailable())return!1;try{return t.available()}catch{return!1}}async function o_(e){let t=r_.get(e);if(!t||!await M.showRewarded(e))return!1;try{t.grant()}catch(t){return console.warn(`[rewards] grant failed`,e,t),!1}return!0}var s_=class{constructor(e=document.body){this.frames=0,this.elapsed=0,this.fps=0,this.el=document.createElement(`div`),this.el.id=`debug-overlay`,Object.assign(this.el.style,{position:`fixed`,left:`8px`,top:`8px`,padding:`6px 8px`,background:`rgba(0,0,0,0.6)`,color:`#fff`,font:`12px/1.4 ui-monospace, monospace`,whiteSpace:`pre`,pointerEvents:`none`,zIndex:`40`,borderRadius:`4px`}),e.appendChild(this.el)}frame(e,t){this.frames++,this.elapsed+=e,!(this.elapsed<.5)&&(this.fps=this.frames/this.elapsed,this.frames=0,this.elapsed=0,this.el.textContent=`${c(`debug.fps`)} ${this.fps.toFixed(0)}\n${c(`debug.calls`)} ${t.calls}\n${c(`debug.tris`)} ${t.triangles}\n${c(`debug.entities`)} ${t.entities}`)}},c_=class{constructor(){this.ctx=null,this.soundVol=.8,this.musicVol=.6,this.muted=!1,this.suspended=!1}unlock(){try{if(!this.ctx){let e=window.AudioContext??window.webkitAudioContext;if(!e)return;let t=new e;this.ctx=t,this.master=t.createGain(),this.master.connect(t.destination),this.sound=t.createGain(),this.music=t.createGain(),this.sound.connect(this.master),this.music.connect(this.master),this.noise=t.createBuffer(1,t.sampleRate*2,t.sampleRate);let n=this.noise.getChannelData(0);for(let e=0;e<n.length;e++)n[e]=Math.random()*2-1;this.applyGains(!0)}this.ctx.state===`suspended`&&!this.suspended&&this.ctx.resume().catch(()=>{})}catch(e){console.warn(`[audio] no WebAudio`,e),this.ctx=null}}get ready(){return!!this.ctx}get silent(){return this.muted||this.suspended||!this.ctx||this.ctx.state!==`running`}setVolumes(e,t){this.soundVol=e,this.musicVol=t,this.applyGains()}setMuted(e){this.muted=e,this.applyGains()}setSuspended(e){this.suspended=e;let t=this.ctx;t&&(this.applyGains(!0),e?t.suspend().catch(()=>{}):t.resume().catch(()=>{}))}applyGains(e=!1){let t=this.ctx;if(!t)return;let n=this.muted||this.suspended,r=(n,r)=>{e?n.gain.value=r:n.gain.setTargetAtTime(r,t.currentTime,.05)};r(this.master,+!n),r(this.sound,this.soundVol*this.soundVol),r(this.music,this.musicVol*this.musicVol)}get soundBus(){return this.ctx?this.sound:null}get musicBus(){return this.ctx?this.music:null}tone(e,t,n,r=`sine`,i=e,a=0,o=this.soundBus){let s=this.ctx;if(!s||!o||n<=.001)return;let c=s.currentTime+a,l=s.createOscillator(),u=s.createGain();l.type=r,l.frequency.setValueAtTime(e,c),i!==e&&l.frequency.exponentialRampToValueAtTime(Math.max(20,i),c+t),u.gain.setValueAtTime(1e-4,c),u.gain.exponentialRampToValueAtTime(n,c+Math.min(.012,t/4)),u.gain.exponentialRampToValueAtTime(1e-4,c+t),l.connect(u).connect(o),l.start(c),l.stop(c+t+.02)}burst(e,t,n,r,i=r,a=.8,o=0,s=this.soundBus){let c=this.ctx;if(!c||!s||t<=.001)return;let l=c.currentTime+o,u=c.createBufferSource();u.buffer=this.noise,u.loop=!0;let d=c.createBiquadFilter();d.type=n,d.Q.value=a,d.frequency.setValueAtTime(r,l),i!==r&&d.frequency.exponentialRampToValueAtTime(Math.max(30,i),l+e);let f=c.createGain();f.gain.setValueAtTime(1e-4,l),f.gain.exponentialRampToValueAtTime(t,l+.01),f.gain.exponentialRampToValueAtTime(1e-4,l+e),u.connect(d).connect(f).connect(s),u.start(l,Math.random()*1.5),u.stop(l+e+.02)}noiseLoop(){let e=this.ctx;if(!e)return null;let t=e.createBufferSource();return t.buffer=this.noise,t.loop=!0,t}click(){this.tone(1300,.05,.18,`triangle`,900)}money(){this.tone(1047,.12,.22,`triangle`),this.tone(1568,.22,.22,`triangle`,1568,.07)}crash(e,t){let n=t*(.25+.75*e);this.burst(.18+e*.35,n*.9,`lowpass`,600+e*2600,200,.7),this.tone(110,.25,n*.8,`sine`,40),e>.45&&this.burst(.5,n*.25,`highpass`,3500,5e3,1.5,.03)}explosion(e){this.burst(1.6,e,`lowpass`,2400,120,.6),this.tone(70,1.1,e,`sine`,25),this.burst(.25,e*.6,`bandpass`,900,300,1,.02)}punch(e){this.burst(.09,e*.7,`bandpass`,450,200,1.2),this.tone(160,.1,e*.5,`sine`,70)}door(e){this.burst(.06,e*.5,`bandpass`,1200,600,2),this.tone(220,.08,e*.3,`square`,120,.02)}spray(e){this.burst(1.2,e*.4,`highpass`,4e3,3e3,.5)}alert(e){this.tone(880,.12,e*.25,`square`,1320),this.tone(880,.12,e*.25,`square`,1320,.16)}sting(){this.tone(392,.35,.25,`triangle`,370),this.tone(330,.35,.25,`triangle`,311,.3),this.tone(262,.8,.28,`triangle`,196,.6)}honk(e,t,n,r=this.soundBus,i=0){for(let[a,o,s]of l_[e])e===`bulb`?this.tone(a*1.08,t,n*s,o,a*.92,i,r):this.tone(a,t,n*s,o,a,i,r)}},l_={bulb:[[460,`square`,.22],[690,`sawtooth`,.1]],car:[[415,`square`,.18],[523,`square`,.16]],bike:[[620,`square`,.2]],air:[[196,`sawtooth`,.22],[247,`sawtooth`,.2],[294,`sawtooth`,.12]]},u_={rickshaw:`bulb`,taxi:`car`,police:`car`,motorbike:`bike`,bus:`air`,truck:`air`},d_={rickshaw:{idle:30,top:74,wave:`sawtooth`,cutoff:380,chug:.75,gain:.32},taxi:{idle:42,top:150,wave:`sawtooth`,cutoff:700,chug:.15,gain:.22},police:{idle:46,top:165,wave:`sawtooth`,cutoff:800,chug:.12,gain:.22},motorbike:{idle:55,top:230,wave:`sawtooth`,cutoff:1400,chug:.45,gain:.2},bus:{idle:26,top:72,wave:`sawtooth`,cutoff:320,chug:.3,gain:.34},truck:{idle:24,top:66,wave:`sawtooth`,cutoff:300,chug:.35,gain:.36}},f_=90,p_=class{constructor(){this.synth=new c_,this.engine=null,this.horn=null,this.siren=null,this.ambience=null,this.lastMoney=null,this.lastStars=0,this.lx=0,this.lz=0}unlock(){this.synth.unlock(),this.synth.ready&&!this.engine&&(this.engine=new m_(this.synth),this.horn=new h_(this.synth),this.siren=new g_(this.synth),this.ambience=new __(this.synth))}falloff(e,t){let n=Math.hypot(e-this.lx,t-this.lz);return n>=f_?0:1/(1+n/12)*(1-n/f_)}handleEvents(e,t){if(!this.synth.ready)return;let n=this.synth,r=e.player.vehicleId;for(let i of t){let t=i.type;switch(i.type){case`horn`:{if(i.vehicle===r)break;let t=Iu(e,i.vehicle);t&&n.honk(u_[t.type]??`car`,.22+Math.random()*.2,.9*this.falloff(t.x,t.z));break}case`crash`:i.impact>1.5&&n.crash(Math.min(1,i.impact/18),this.falloff(i.x,i.z));break;case`explode`:n.explosion(Math.max(.25,this.falloff(i.x,i.z)));break;case`pedHit`:n.punch(.8);break;case`punch`:n.punch(i.hit<0?.25:.8);break;case`enter`:case`exit`:n.door(.8);break;default:t===`wasted`||t===`busted`?n.sting():t===`paintShop`&&n.spray(.9)}}}quiet(){this.engine?.set(null),this.horn?.set(null),this.siren?.set(0)}update(e,t){let n=Iu(e,e.player.vehicleId),r=n??e.player.walker;if(this.lx=r.x,this.lz=r.z,!this.synth.ready)return;this.engine?.set(n&&n.stage!==`wreck`?n:null),this.horn?.set(n&&n.horn?u_[n.type]:null);let i=0;for(let t of e.vehicles)t.siren===!0&&(i=Math.max(i,t===n?.5:this.falloff(t.x,t.z)*1.6));this.siren?.set(Math.min(1,i)),this.ambience?.update(t);let a=e,o=typeof a.player.money==`number`?a.player.money:null;o!==null&&this.lastMoney!==null&&o>this.lastMoney&&this.synth.money(),this.lastMoney=o;let s=typeof a.wanted?.stars==`number`?a.wanted.stars:0;s>this.lastStars&&this.synth.alert(1),this.lastStars=s}},m_=class{constructor(e){this.type=null;let t=e.ctx;this.ctx=t,this.osc=t.createOscillator(),this.sub=t.createOscillator(),this.sub.type=`sine`,this.lfo=t.createOscillator(),this.lfo.type=`square`,this.lfoDepth=t.createGain(),this.am=t.createGain(),this.filter=t.createBiquadFilter(),this.filter.type=`lowpass`,this.filter.Q.value=2,this.out=t.createGain(),this.out.gain.value=0;let n=t.createGain();n.gain.value=.6,this.osc.connect(this.filter),this.sub.connect(n).connect(this.filter),this.filter.connect(this.am).connect(this.out).connect(e.soundBus),this.lfo.connect(this.lfoDepth).connect(this.am.gain),this.osc.start(),this.sub.start(),this.lfo.start()}set(e){let t=this.ctx.currentTime;if(!e){this.out.gain.setTargetAtTime(0,t,.08),this.type=null;return}let n=d_[e.type]??d_.taxi;this.type!==e.type&&(this.type=e.type,this.osc.type=n.wave,this.am.gain.value=1-n.chug/2,this.lfoDepth.gain.value=n.chug/2);let r=Math.min(1,pu(e)/Math.max(1,Bl[e.type].maxSpeed)),i=Math.max(e.inThrottle,e.inBrake*.5),a=n.idle+(n.top-n.idle)*Math.min(1,r*.9+i*.15);this.osc.frequency.setTargetAtTime(a,t,.06),this.sub.frequency.setTargetAtTime(a/2,t,.06),this.lfo.frequency.setTargetAtTime(a/2,t,.06),this.filter.frequency.setTargetAtTime(n.cutoff*(1+r*2+i*.8),t,.08),this.out.gain.setTargetAtTime(n.gain*(.55+.3*i+.25*r),t,.08)}},h_=class{constructor(e){this.kind=null,this.nodes=[],this.out=null,this.s=e}set(e){if(e===this.kind||(this.stop(),this.kind=e,!e))return;let t=this.s.ctx,n=t.currentTime,r=t.createGain();r.gain.setValueAtTime(1e-4,n),r.gain.exponentialRampToValueAtTime(1,n+.015);let i=t.createBiquadFilter();i.type=`bandpass`,i.frequency.value=e===`air`?700:1400,i.Q.value=.6,r.connect(i).connect(this.s.soundBus);for(let[i,a,o]of l_[e]){let s=t.createOscillator();s.type=a,e===`bulb`?(s.frequency.setValueAtTime(i*1.1,n),s.frequency.exponentialRampToValueAtTime(i*.94,n+.18)):s.frequency.value=i;let c=t.createGain();c.gain.value=o*2.2,s.connect(c).connect(r),s.start(n),this.nodes.push(s)}this.out=r}stop(){let e=this.s.ctx;if(!e||!this.out)return;let t=e.currentTime;this.out.gain.cancelScheduledValues(t),this.out.gain.setTargetAtTime(1e-4,t,.02);for(let e of this.nodes)e.stop(t+.12);this.nodes=[],this.out=null}},g_=class{constructor(e){let t=e.ctx;this.ctx=t;let n=t.createOscillator();n.type=`sawtooth`,n.frequency.value=950;let r=t.createOscillator();r.type=`triangle`,r.frequency.value=.55;let i=t.createGain();i.gain.value=330,r.connect(i).connect(n.frequency);let a=t.createBiquadFilter();a.type=`bandpass`,a.frequency.value=1100,a.Q.value=.7,this.out=t.createGain(),this.out.gain.value=0,n.connect(a).connect(this.out).connect(e.soundBus),n.start(),r.start()}set(e){this.out.gain.setTargetAtTime(e*.12,this.ctx.currentTime,.2)}},__=class{constructor(e){this.nextHonk=2,this.s=e;let t=e.ctx,n=e.musicBus,r=e.noiseLoop(),i=t.createBiquadFilter();i.type=`bandpass`,i.frequency.value=380,i.Q.value=.9;let a=t.createGain();a.gain.value=.16;let o=t.createOscillator();o.frequency.value=.13;let s=t.createGain();s.gain.value=.05,o.connect(s).connect(a.gain),r.connect(i).connect(a).connect(n);let c=e.noiseLoop(),l=t.createBiquadFilter();l.type=`bandpass`,l.frequency.value=1700,l.Q.value=.4;let u=t.createGain();u.gain.value=.025,c.connect(l).connect(u).connect(n),r.start(0,.3),c.start(0,1.1),o.start(),this.far=t.createBiquadFilter(),this.far.type=`lowpass`,this.far.frequency.value=1300,this.far.connect(n)}update(e){if(this.nextHonk-=e,this.nextHonk>0)return;this.nextHonk=1.2+Math.random()*4;let t=[`bulb`,`bulb`,`car`,`bike`,`air`],n=t[Math.random()*t.length|0],r=.18+Math.random()*.25,i=Math.random()<.4?2:1;for(let e=0;e<i;e++)this.s.honk(n,.15+Math.random()*.2,r,this.far,e*.28)}};function v_(){try{return matchMedia(`(pointer: coarse)`).matches}catch{return!1}}var y_={touch:ee.touch??(v_()&&(navigator.maxTouchPoints??0)>0),phone:v_()&&Math.min(screen.width,screen.height)<820},b_=[`low`,`medium`,`high`];function x_(e){let t=window.devicePixelRatio||1;return e===`low`?Math.min(t,1)*.85:e===`medium`?Math.min(t,1.25):Math.min(t,2)}var S_=class{constructor(e){this.level=`high`,this.setting=`auto`,this.autoLevel=y_.phone?`low`:`high`,this.slowT=0,this.frames=0,this.time=0,this.apply=e}set(e){this.setting=e,this.update()}update(){let e=this.setting===`auto`?this.autoLevel:this.setting;this.level=e,this.apply(x_(e),e)}frame(e){if(this.setting!==`auto`||this.autoLevel===`low`||(this.frames++,this.time+=e,this.time<.5))return;let t=this.frames/this.time;this.frames=0,this.time=0,this.slowT=t<45?this.slowT+.5:0,this.slowT>=3&&(this.slowT=0,this.autoLevel=b_[Math.max(0,b_.indexOf(this.autoLevel)-1)],this.update())}},C_=`rr:`;function w_(e){return!!e&&typeof e==`object`&&typeof e.at==`number`&&`v`in e}function T_(e){try{let t=localStorage.getItem(C_+e);if(t===null)return;let n=JSON.parse(t);return w_(n)?n:void 0}catch{return}}function E_(e,t){try{localStorage.setItem(C_+e,JSON.stringify(t))}catch{}}async function D_(e){let t;try{let n=await M.portal.load(e);w_(n)&&(t=n)}catch{t=void 0}let n=T_(e),r=t&&n?t.at>=n.at?t:n:t??n;return r&&r!==n&&E_(e,r),r?.v}async function O_(e,t){let n={at:Date.now(),v:t};E_(e,n);try{await M.portal.save(e,n)}catch(t){console.warn(`[storage] portal save failed`,e,t)}}var k_={[X.WATER]:Q.water,[X.WALL]:9067058,[X.ROAD]:7040886,[X.LOT]:14469536,[X.PARK]:Q.park,[X.PLAZA]:Q.plaza,[X.DOCK]:Q.dock,[X.ISLAND]:Q.island,[X.PARKING]:10132634},A_=12159838,j_=15895580;function M_(e,t=2){let n=e.grid,r=t/7,{minX:i,minZ:a,maxX:o,maxZ:s}=Vp,c=Math.ceil((o-i)*r),l=Math.ceil((s-a)*r),u=new Uint8ClampedArray(c*l*4),d=(e,t,n)=>{if(e<0||t<0||e>=c||t>=l)return;let r=(t*c+e)*4;u[r]=n>>16&255,u[r+1]=n>>8&255,u[r+2]=n&255,u[r+3]=255};for(let e=0;e<l;e++)for(let t=0;t<c;t++)d(t,e,k_[Zp(n,i+(t+.5)/r,a+(e+.5)/r)]??16711935);let f=(e,t,n,o,s)=>{let c=Math.round((e-i)*r),l=Math.max(c+1,Math.round((n-i)*r)),u=Math.round((t-a)*r),f=Math.max(u+1,Math.round((o-a)*r));for(let e=u;e<f;e++)for(let t=c;t<l;t++)d(t,e,s)};if(t>=2)for(let t of e.buildings)f(t.minX,t.minZ,t.maxX,t.maxZ,A_);for(let t of e.roundabouts)f(t.x-t.island,t.z-t.island,t.x+t.island,t.z+t.island,Q.island);let p=e.temple;return f(p.x-p.size/2,p.z-p.size/2,p.x+p.size/2,p.z+p.size/2,j_),{width:c,height:l,data:u,pxPerMetre:r,minX:i,minZ:a}}function N_(e,t=2){let n=M_(e,t),r=document.createElement(`canvas`);return r.width=n.width,r.height=n.height,r.getContext(`2d`).putImageData(new ImageData(new Uint8ClampedArray(n.data),n.width,n.height),0,0),{canvas:r,image:n,toPixel:(e,t)=>({px:(e-n.minX)*n.pxPerMetre,py:(t-n.minZ)*n.pxPerMetre})}}function $(e,t=``,n=``,r){let i=document.createElement(e);return t&&(i.className=t),n&&(i.textContent=n),r&&r.appendChild(i),i}var P_={click:()=>{}};function F_(e,t,n,r){let i=$(`button`,e,t,r);return i.type=`button`,i.addEventListener(`click`,e=>{e.stopPropagation(),P_.click(),n()}),i}function I_(e,t){e.classList.toggle(`hidden`,!t)}function L_(e){switch(e){case`pause`:return`<svg viewBox="0 0 24 24"><rect x="5" y="4" width="5" height="16" rx="1.5" fill="#2b1d0e"/><rect x="14" y="4" width="5" height="16" rx="1.5" fill="#2b1d0e"/></svg>`;case`map`:return`<svg viewBox="0 0 24 24"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" fill="#13a39a" stroke="#2b1d0e" stroke-width="2" stroke-linejoin="round"/></svg>`;case`star`:return`<svg viewBox="0 0 24 24"><path d="M12 2l3 6.6 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21.2l1.5-7L2 9.4l7-.8z" stroke="#2b1d0e" stroke-width="2" stroke-linejoin="round"/></svg>`;case`arrow`:return`<svg viewBox="0 0 24 24"><path d="M12 2l8 18-8-4-8 4z" fill="#e0457b" stroke="#2b1d0e" stroke-width="2" stroke-linejoin="round"/></svg>`;case`play`:return`<svg viewBox="0 0 24 24" width="18" height="18"><path d="M7 4l13 8-13 8z" fill="#fff" stroke="#2b1d0e" stroke-width="2" stroke-linejoin="round"/></svg>`}}function R_(e){return Math.round(e).toString().replace(/\B(?=(\d{3})+(?!\d))/g,`,`)}var z_=`#d8c49a`;function B_(e){return Iu(e,e.player.vehicleId)??e.player.walker}function V_(e,t,n,r,i){e.save(),e.translate(t,n),e.rotate(r),e.beginPath(),e.moveTo(0,-i),e.lineTo(i*.75,i*.8),e.lineTo(0,i*.4),e.lineTo(-i*.75,i*.8),e.closePath(),e.fillStyle=`#fff`,e.lineWidth=Math.max(2,i*.22),e.strokeStyle=`#2b1d0e`,e.stroke(),e.fill(),e.restore()}function H_(e,t,n,r){e.beginPath(),e.arc(t,n,r,0,Math.PI*2),e.fillStyle=`#f6b324`,e.fill(),e.lineWidth=Math.max(2,r*.35),e.strokeStyle=`#2b1d0e`,e.stroke()}function U_(e){return e.type===`police`||e.siren===!0}function W_(e,t,n,r,i,a,o){let s=B_(r),c=t/(2*a),l=n.toPixel(s.x,s.z),u=n.pxPerMetre;e.save(),e.clearRect(0,0,t,t),e.beginPath(),e.arc(t/2,t/2,t/2,0,Math.PI*2),e.clip(),e.fillStyle=z_,e.fillRect(0,0,t,t),e.imageSmoothingEnabled=!1,e.drawImage(n.canvas,l.px-a*u,l.py-a*u,2*a*u,2*a*u,0,0,t,t);let d=(e,n)=>[t/2+(e-s.x)*c,t/2+(n-s.z)*c];for(let n of r.vehicles){if(!U_(n)||n.id===r.player.vehicleId)continue;let[i,a]=d(n.x,n.z);if(i<-4||a<-4||i>t+4||a>t+4)continue;let s=n.siren===!0;e.beginPath(),e.arc(i,a,t*.03,0,Math.PI*2),e.fillStyle=s&&o?`#e53935`:`#3d8bfd`,e.fill()}if(i?.target){let[n,r]=d(i.target.x,i.target.z),a=n-t/2,o=r-t/2,s=Math.hypot(a,o),c=t/2-t*.07;s>c&&(n=t/2+a/s*c,r=t/2+o/s*c),H_(e,n,r,t*.045)}V_(e,t/2,t/2,s.heading,t*.075),e.restore()}function G_(e,t,n,r,i,a){let o=B_(i);e.fillStyle=z_,e.fillRect(0,0,t,n);let s=Math.min(t/r.canvas.width,n/r.canvas.height),c=(t-r.canvas.width*s)/2,l=(n-r.canvas.height*s)/2;e.imageSmoothingEnabled=s<1,e.drawImage(r.canvas,c,l,r.canvas.width*s,r.canvas.height*s);let u=(e,t)=>{let n=r.toPixel(e,t);return[c+n.px*s,l+n.py*s]};if(a?.target){let[n,r]=u(a.target.x,a.target.z);H_(e,n,r,Math.max(7,t*.014))}let[d,f]=u(o.x,o.z);V_(e,d,f,o.heading,Math.max(10,t*.02))}var K_=Ul();function q_(e){let t=e.player;if(t.downT>0)return`none`;let n=Iu(e,t.vehicleId);if(n)return pu(n)<=r.exitMaxSpeed?`getOut`:`none`;let i=t.walker,a=null,o=r.enterReach;for(let t of e.vehicles){if(t.stage===`wreck`||t.driver===`player`||pu(t)>r.enterMaxSpeed||Math.abs(t.x-i.x)>8||Math.abs(t.z-i.z)>8)continue;let e=Xl(i.x,i.z,hu(t,K_));e<=o&&(o=e,a=t)}return a?a.driver===`npc`?`takeOver`:`getIn`:`none`}var J_=class{constructor(e,t,n,r,i){this.starEls=[],this.shown={money:NaN,health:NaN,veh:NaN,stars:-1,flash:!1,speed:-1,hint:``,obj:``},this.objectiveView=null,this.shownMoney=0,this.mapT=0,this.src=t,this.touch=n,this.root=$(`div`,`hud`,``,e);let a=$(`div`,`hud-left`,``,this.root);this.money=$(`div`,`money`,``,a),this.health=$(`div`,`bar`,``,a),$(`i`,``,``,this.health),this.vehBar=$(`div`,`bar veh`,``,a),$(`i`,``,``,this.vehBar),this.stars=$(`div`,`stars`,``,a);for(let e=0;e<4;e++){let e=$(`span`,`off`,``,this.stars);e.innerHTML=L_(`star`),this.starEls.push(e)}let o=$(`div`,`hud-right`,``,this.root),s=$(`div`,`map-wrap`,``,o);this.mapCanvas=$(`canvas`,`minimap`,``,s),this.mapCtx=this.mapCanvas.getContext(`2d`),$(`span`,`map-n`,`N`,s),s.addEventListener(`click`,i);let l=F_(`icon-btn pause-btn`,``,r,o);l.innerHTML=L_(`pause`),l.setAttribute(`aria-label`,c(`hud.pause`)),this.speed=$(`div`,`speed`,``,this.root),this.speedNum=$(`b`,``,`0`,this.speed),$(`span`,``,c(`hud.speed`),this.speed),I_(this.speed,!1),this.top=$(`div`,`top-center`,``,this.root),this.objective=$(`div`,`objective`,``,this.top),this.objArrow=$(`span`,`arrow`,``,this.objective),this.objArrow.innerHTML=L_(`arrow`),this.objText=$(`span`,``,``,this.objective),this.objDist=$(`span`,`dist`,``,this.objective),I_(this.objective,!1),this.hint=$(`div`,`hint`,``,this.root),I_(this.hint,!1)}setObjective(e){this.objectiveView=e}get objectiveNow(){return this.objectiveView}frame(e,t,n){let r=e,i=this.shown,a=typeof r.player.money==`number`?r.player.money:0,o=a-this.shownMoney;this.shownMoney=Math.abs(o)<1?a:this.shownMoney+o*Math.min(1,t*8);let s=Math.round(this.shownMoney);s!==i.money&&(i.money=s,this.money.innerHTML=`<span class="cur">₹</span>${R_(s)}`);let l=e.player.walker,u=Math.max(0,Math.min(1,l.health/Math.max(1,l.maxHealth)));Math.abs(u-i.health)>.004&&(i.health=u,this.health.firstChild.style.transform=`scaleX(${u})`,this.health.classList.toggle(`low`,u<.3));let d=Iu(e,e.player.vehicleId),f=d?Math.max(0,Math.min(1,d.health/Bl[d.type].health)):-1;Math.abs(f-i.veh)>.004&&(i.veh=f,I_(this.vehBar,f>=0),f>=0&&(this.vehBar.firstChild.style.transform=`scaleX(${f})`,this.vehBar.classList.toggle(`low`,f<.3)));let p=Math.max(0,Math.min(4,Math.round(typeof r.wanted?.stars==`number`?r.wanted.stars:0))),m=p>0&&r.wanted?.seen===!1;(p!==i.stars||m!==i.flash)&&(i.stars=p,i.flash=m,I_(this.stars,p>0),this.starEls.forEach((e,t)=>e.className=t<p?`on`:`off`),this.stars.classList.toggle(`flash`,m));let h=d?Math.round(pu(d)*3.6):-1;h!==i.speed&&(i.speed=h,I_(this.speed,h>=0),h>=0&&(this.speedNum.textContent=String(h)));let g=n===`none`?``:c(n===`getIn`?`hint.getIn`:n===`takeOver`?`hint.takeOver`:`hint.getOut`,{key:`E`}),_=n===`getOut`&&d&&pu(d)>.5?``:g;_!==i.hint&&(i.hint=_,this.hint.textContent=_,I_(this.hint,!!_&&!this.touch)),this.updateObjective(e),this.mapT-=t,this.mapT<=0&&(this.mapT=1/30,this.drawMap(e,d))}updateObjective(e){let t=this.objectiveView,n=t?.text??``;if(n!==this.shown.obj&&(this.shown.obj=n,this.objText.textContent=n,I_(this.objective,!!n)),!t||(I_(this.objArrow,!!t.target),I_(this.objDist,!!t.target),!t.target))return;let r=B_(e),i=t.target.x-r.x,a=t.target.z-r.z;this.objArrow.style.transform=`rotate(${Math.atan2(i,-a)}rad)`,this.objDist.textContent=c(`hud.distance`,{m:Math.round(Math.hypot(i,a))})}drawMap(e,t){let n=this.mapCanvas.clientWidth;if(!n)return;let r=Math.round(n*Math.min(2,window.devicePixelRatio||1));this.mapCanvas.width!==r&&(this.mapCanvas.width=r,this.mapCanvas.height=r);let i=t?90+Math.min(70,pu(t)*2.5):70;W_(this.mapCtx,r,this.src,e,this.objectiveView,i,Math.floor(e.time*3)%2==0)}},Y_=class{constructor(e,t){this.root=$(`div`,`screen start`,``,e);let n=$(`div`,`logo`,``,this.root);n.innerHTML=`RICKSHAW<small>RUSH</small>`,$(`div`,`tagline`,c(`title.tagline`),this.root),F_(`big-btn`,c(`title.play`),t,this.root),this.root.addEventListener(`click`,t)}},X_=class{constructor(e,t,n,r){this.qualityBtns=new Map,this.h=r,this.settings=t,this.root=$(`div`,`screen dim`,``,e);let i=$(`div`,`panel`,``,this.root);this.title=$(`h2`,``,c(`pause.title`),i);let a=$(`div`,`body`,``,i);F_(`btn primary`,c(`pause.resume`),()=>r.resume(),a),F_(`btn`,c(`pause.map`),()=>r.map(),a),F_(`btn`,c(`pause.settings`),()=>this.view(`settings`),a),F_(`btn`,c(`pause.controls`),()=>this.view(`controls`),a),this.helpTitle=$(`div`,`note`,c(`pause.help`),a),this.help=$(`div`,`body`,``,a),this.help.style.flex=`none`;let o=$(`div`,`body`,``,i);this.slider(o,`settings.sound`,t.sound,e=>t.sound=e),this.slider(o,`settings.music`,t.music,e=>t.music=e);let s=$(`div`,`row`,``,o);$(`span`,``,c(`settings.quality`),s);let l=$(`div`,`seg`,``,s);for(let e of[`auto`,`low`,`medium`,`high`]){let n=F_(``,c(`quality.${e}`),()=>{t.quality=e,this.markQuality(),r.settings(t)},l);this.qualityBtns.set(e,n)}this.markQuality(),$(`div`,``,``,o).style.flex=`1`,F_(`btn`,c(`pause.back`),()=>this.view(`main`),o);let u=$(`div`,`body`,``,i),d=$(`div`,`keys`,``,u),f=(e,t)=>{$(`kbd`,``,e,d),$(`span`,``,c(t),d)};f(c(`controls.moveKeys`),`controls.move`),f(`E`,`controls.use`),f(`F`,`controls.punch`),f(`Space`,`controls.handbrake`),f(`H`,`controls.horn`),f(`M`,`controls.map`),f(`Esc / P`,`controls.pause`);let p=$(`div`,`note`,c(`controls.touch`),u);n&&u.insertBefore(p,d),$(`div`,``,``,u).style.flex=`1`,F_(`btn`,c(`pause.back`),()=>this.view(`main`),u),this.views={main:a,settings:o,controls:u},this.view(`main`)}slider(e,t,n,r){let i=$(`label`,`row`,``,e);$(`span`,``,c(t),i);let a=$(`input`,``,``,i);a.type=`range`,a.min=`0`,a.max=`100`,a.value=String(Math.round(n*100)),a.addEventListener(`input`,()=>{r(Number(a.value)/100),this.h.settings(this.settings)})}markQuality(){for(let[e,t]of this.qualityBtns)t.classList.toggle(`on`,e===this.settings.quality)}view(e){for(let[t,n]of Object.entries(this.views))I_(n,t===e);this.title.textContent=c(e===`main`?`pause.title`:e===`settings`?`pause.settings`:`pause.controls`)}open(){this.view(`main`),this.help.textContent=``;let e=this.h.offers();I_(this.helpTitle,e.length>0);for(let t of e){let e=F_(`btn reward`,``,()=>this.h.reward(t.reason),this.help);e.innerHTML=`${L_(`play`)}<span>${c(t.label)}</span><span class="ad">${c(`reward.ad`)}</span>`}}back(){return!this.views.main.classList.contains(`hidden`)||(this.view(`main`),!1)}},Z_=class{constructor(e,t,n){this.src=t,this.root=$(`div`,`screen map-screen`,``,e),this.canvas=$(`canvas`,``,``,this.root),this.ctx=this.canvas.getContext(`2d`);let r=$(`div`,`legend`,``,this.root);r.innerHTML=`<span><i style="background:#fff"></i>${c(`map.you`)}</span><span><i style="background:#f6b324"></i>${c(`map.objective`)}</span>`,F_(`btn primary`,c(`map.close`),n,r),this.root.addEventListener(`click`,n)}draw(e,t){let n=this.root.getBoundingClientRect(),r=Math.max(100,Math.min(n.width-32,n.height-100)),i=Math.round(r*Math.min(2,window.devicePixelRatio||1));this.canvas.width=i,this.canvas.height=i,this.canvas.style.width=`${r}px`,this.canvas.style.height=`${r}px`,G_(this.ctx,i,i,this.src,e,t)}},Q_=class{constructor(e){this.root=$(`div`,`screen end`,``,e),this.h1=$(`h1`,``,``,this.root),this.sub=$(`p`,``,``,this.root),this.btns=$(`div`,`btns`,``,this.root)}open(e,t,n,r){this.root.classList.toggle(`busted`,e===`busted`),this.h1.textContent=c(e===`wasted`?`end.wasted`:`end.busted`),this.sub.textContent=c(e===`wasted`?`end.wastedSub`:`end.bustedSub`),this.btns.textContent=``;for(let e of t){let t=F_(`btn reward`,``,()=>n(e.reason),this.btns);t.innerHTML=`${L_(`play`)}<span>${c(e.label)}</span><span class="ad">${c(`reward.ad`)}</span>`}F_(`btn primary`,c(`end.continue`),r,this.btns)}},$_={getIn:[`tip.getIn`,`tip.getInTouch`],drive:[`tip.drive`,`tip.driveTouch`],job:[`tip.job`,`tip.jobTouch`]},ev=class{constructor(e,t,n,r){this.current=null,this.time=0,this.driven=0,this.box=$(`div`,`tip`,``,e),I_(this.box,!1),this.seen=new Set(t),this.touch=n,this.onSeen=r}start(e){if(this.seen.has(e))return;this.current=e,this.time=0;let[t,n]=$_[e];this.box.textContent=c(this.touch?n:t,{key:`M`}),I_(this.box,!0)}finish(e){this.current&&(this.seen.add(this.current),this.onSeen([...this.seen])),this.current=null,I_(this.box,!1),e&&this.start(e)}begin(e){e.player.vehicleId>=0?this.start(`drive`):this.start(`getIn`)}frame(e,t){let n=Iu(e,e.player.vehicleId);if(!this.current){n&&!this.seen.has(`drive`)&&this.seen.has(`getIn`)&&this.start(`drive`);return}switch(this.time+=t,this.current){case`getIn`:n&&this.finish(`drive`);break;case`drive`:n&&(this.driven+=pu(n)*t),(this.driven>60||this.time>9)&&this.finish(`job`);break;case`job`:this.time>7&&this.finish(null)}}},tv=56,nv=class{constructor(e,t){this.stickId=null,this.cx=0,this.cy=0,this.gas=0,this.brake=0,this.mode=``,this.useShown=``,this.sink=t,this.root=$(`div`,`touch foot`,``,e),this.zone=$(`div`,`stick-zone`,``,this.root),this.base=$(`div`,`stick-base`,``,this.zone),this.knob=$(`div`,`stick-knob`,``,this.base),this.layout(),this.zone.addEventListener(`pointerdown`,e=>this.stickDown(e)),this.zone.addEventListener(`pointermove`,e=>this.stickMove(e));let n=e=>this.stickUp(e);this.zone.addEventListener(`pointerup`,n),this.zone.addEventListener(`pointercancel`,n),this.zone.addEventListener(`lostpointercapture`,n);let r=$(`div`,`pad`,``,this.root);this.hold(r,`gas`,c(`touch.gas`),e=>{this.gas=+!!e,this.sink.setPedals(this.gas,this.brake)}),this.hold(r,`brake`,c(`touch.brake`),e=>{this.brake=+!!e,this.sink.setPedals(this.gas,this.brake)}),this.hold(r,`drift`,c(`touch.drift`),e=>this.sink.setButton(`handbrake`,e)),this.hold(r,`horn`,c(`touch.horn`),e=>this.sink.setButton(`horn`,e)),this.hold(r,`punch`,c(`touch.punch`),e=>this.sink.setButton(`action`,e)),this.use=this.hold(r,`use`,c(`touch.in`),e=>this.sink.setButton(`use`,e)),window.addEventListener(`resize`,()=>this.layout())}hold(e,t,n,r){let i=$(`button`,`tbtn ${t}`,n,e);i.type=`button`;let a=null;i.addEventListener(`pointerdown`,e=>{if(e.preventDefault(),a===null){a=e.pointerId;try{i.setPointerCapture(e.pointerId)}catch{}i.classList.add(`down`),r(!0)}});let o=e=>{e.pointerId===a&&(a=null,i.classList.remove(`down`),r(!1))};return i.addEventListener(`pointerup`,o),i.addEventListener(`pointercancel`,o),i.addEventListener(`lostpointercapture`,o),i.addEventListener(`contextmenu`,e=>e.preventDefault()),i}layout(){if(this.stickId!==null)return;let e=this.zone.getBoundingClientRect(),t=Math.min(130,e.width*.4),n=e.height-Math.min(130,e.height*.4);this.base.style.left=`${t}px`,this.base.style.top=`${n}px`,this.knob.style.transform=``,this.base.style.opacity=`0.55`}stickDown(e){if(this.stickId!==null)return;e.preventDefault(),this.stickId=e.pointerId;try{this.zone.setPointerCapture(e.pointerId)}catch{}let t=this.zone.getBoundingClientRect();this.cx=Math.max(64,e.clientX-t.left),this.cy=Math.min(t.height-tv-8,e.clientY-t.top),this.base.style.left=`${this.cx}px`,this.base.style.top=`${this.cy}px`,this.base.style.opacity=`1`,this.stickMove(e)}stickMove(e){if(e.pointerId!==this.stickId)return;let t=this.zone.getBoundingClientRect(),n=e.clientX-t.left-this.cx,r=e.clientY-t.top-this.cy,i=Math.hypot(n,r);i>tv&&(n=n/i*tv,r=r/i*tv),this.knob.style.transform=`translate(${n}px, ${r}px)`;let a=Math.min(1,Math.max(0,(Math.min(i,tv)-6)/42)),o=i>0?a/Math.min(i,tv):0;this.sink.setStick(n*o,-r*o)}stickUp(e){e.pointerId===this.stickId&&(this.stickId=null,this.sink.setStick(0,0),this.layout())}frame(e,t){let n=e?`drive`:`foot`;n!==this.mode&&(this.mode=n,this.root.classList.toggle(`drive`,e),this.root.classList.toggle(`foot`,!e)),t!==this.useShown&&(this.useShown=t,this.use.textContent=c(e?`touch.out`:`touch.in`),this.use.classList.toggle(`dim`,t===`none`),this.use.classList.toggle(`ready`,!e&&t!==`none`))}releaseAll(){this.stickId=null,this.gas=this.brake=0;for(let e of this.root.querySelectorAll(`.down`))e.classList.remove(`down`);this.sink.release(),this.layout()}},rv=class{constructor(e,t){this.mode=`start`,this.touch=null,this.toastT=0,this.prevPause=!0,this.world=null,this.busy=!1,this.mapFrom=`play`,this.d=t,this.root=$(`div`,``,``,e),this.root.id=`ui`,this.root.classList.toggle(`is-touch`,!!t.touch),this.hud=new J_(this.root,t.map,!!t.touch,()=>this.setMode(`pause`),()=>this.setMode(`map`)),t.touch&&(this.touch=new nv(this.root,t.touch)),this.tips=new ev(this.hud.top,t.settings.tips,!!t.touch,e=>{t.settings.tips=e,t.onSettings(t.settings)}),this.start=new Y_(this.root,()=>this.play()),this.pause=new X_(this.root,t.settings,!!t.touch,{resume:()=>this.setMode(`play`),map:()=>this.setMode(`map`),settings:e=>t.onSettings(e),offers:()=>this.offers([`clearStars`,`repairCar`]),reward:e=>void this.reward(e,()=>this.pause.open())}),this.mapScreen=new Z_(this.root,t.map,()=>this.setMode(this.mapFrom)),this.end=new Q_(this.root),this.toastEl=$(`div`,`toast hidden`,``,this.root),window.addEventListener(`keydown`,e=>this.key(e)),this.apply()}get blocking(){return this.mode!==`play`}play(){this.mode===`start`&&(this.d.onPlay(),this.setMode(`play`),this.world&&this.tips.begin(this.world))}setMode(e){e===this.mode||this.busy||(e===`map`&&(this.mapFrom=this.mode===`pause`?`pause`:`play`),this.mode=e,e===`pause`&&this.pause.open(),this.apply(),e===`map`&&this.world&&this.mapScreen.draw(this.world,this.hud.objectiveNow),this.d.onMode(e))}apply(){let e=this.mode;I_(this.start.root,e===`start`),I_(this.hud.root,e!==`start`),I_(this.pause.root,e===`pause`),I_(this.mapScreen.root,e===`map`),I_(this.end.root,e===`end`),this.touch&&(I_(this.touch.root,e===`play`),e===`play`?requestAnimationFrame(()=>this.touch?.layout()):this.touch.releaseAll())}key(e){if(e.repeat)return;let t=this.mode;t===`start`&&(e.code===`Enter`||e.code===`Space`)?(e.preventDefault(),this.play()):e.code===`KeyM`&&(t===`play`||t===`map`)?this.setMode(t===`map`?this.mapFrom:`map`):(e.code===`Escape`||e.code===`KeyP`)&&(t===`pause`&&this.pause.back()?this.setMode(`play`):t===`map`&&this.setMode(this.mapFrom))}controls(e){e.pause&&!this.prevPause&&this.mode===`play`&&this.setMode(`pause`),this.prevPause=e.pause}handleEvents(e){for(let t of e){let e=t.type;(e===`wasted`||e===`busted`)&&this.mode===`play`&&this.showEnd(e)}}showEnd(e){this.setMode(`end`);let t=e===`wasted`?this.offers([`revive`]):this.offers([`clearStars`]);this.end.open(e,t,t=>void this.reward(t,()=>this.showEnd(e),()=>this.setMode(`play`)),()=>void this.continueAfterEnd(e))}async continueAfterEnd(e){if(!this.busy){this.busy=!0;try{await this.d.onEndContinue(e)}finally{this.busy=!1}this.setMode(`play`)}}offers(e){let t={clearStars:`reward.clearStars`,repairCar:`reward.repairCar`,revive:`end.revive`,doubleMoney:`reward.doubleMoney`};return e.filter(e=>this.d.canOffer(e)).map(e=>({reason:e,label:t[e]}))}async reward(e,t,n){if(this.busy)return;this.busy=!0;let r=!1;try{r=await this.d.offer(e)}finally{this.busy=!1}r||this.toast(c(`reward.failed`)),r&&n?n():t()}toast(e,t=2.5){this.toastEl.textContent=e,this.toastT=t,I_(this.toastEl,!0)}setObjective(e){this.hud.setObjective(e)}frame(e,t){if(this.world=e,this.toastT>0&&(this.toastT-=t,this.toastT<=0&&I_(this.toastEl,!1)),this.mode===`start`)return;let n=q_(e);this.hud.frame(e,t,n),this.mode===`play`&&(this.touch?.frame(e.player.vehicleId>=0,n),this.tips.frame(e,t))}},iv=`rr.settings`;function av(){return{sound:.8,music:.6,quality:`auto`,tips:[]}}function ov(e){let t=av();if(!e||typeof e!=`object`)return t;let n=e,r=(e,t)=>typeof e==`number`&&e>=0&&e<=1?e:t;return{sound:r(n.sound,t.sound),music:r(n.music,t.music),quality:n.quality===`low`||n.quality===`medium`||n.quality===`high`||n.quality===`auto`?n.quality:t.quality,tips:Array.isArray(n.tips)?n.tips.filter(e=>typeof e==`string`).slice(0,50):[]}}async function sv(e,t,n,r){let i=ov(await D_(iv)),a=new p_;P_.click=()=>a.synth.click();let o=new S_(e=>{t.renderer.setPixelRatio(e),t.resize()});o.set(i.quality),a.synth.setVolumes(i.sound,i.music);let s=null,c=()=>{s&&clearTimeout(s),s=setTimeout(()=>void O_(iv,i),400)},l=N_(n),u=()=>M.setPlaying(d.mode===`play`&&!M.paused),d=new rv(document.body,{map:{canvas:l.canvas,toPixel:l.toPixel,pxPerMetre:l.image.pxPerMetre},touch:y_.touch?r.touch:null,settings:i,onPlay:()=>a.unlock(),onSettings:e=>{a.synth.setVolumes(e.sound,e.music),o.set(e.quality),c()},onMode:e=>{r.releaseAll(),e!==`play`&&a.quiet(),u()},canOffer:a_,offer:o_,onEndContinue:async t=>{fm(e),await M.showMidgame(t)}});M.onChange(()=>{a.synth.setSuspended(M.paused),a.synth.setMuted(M.muted),u()}),a.synth.setMuted(M.muted);let f=()=>{d.mode!==`start`&&!M.paused&&a.unlock()};window.addEventListener(`pointerdown`,f),window.addEventListener(`keydown`,f),ee.debug&&Object.assign(window.__rr,{ui:d,audio:a,platform:M,quality:o,registerReward:i_,state:()=>({mode:d.mode,tick:e.tick,silent:a.synth.silent,playing:M.isPlaying,quality:o.level})});let p=0;return{get blocking(){return d.blocking},ui:d,audio:a,controls:e=>d.controls(e),handleEvents:t=>{a.handleEvents(e,t),d.handleEvents(t)},frame:t=>{o.frame(t),a.update(e,t),d.frame(e,t)},idleFrame:n=>{d.frame(e,n),p-=n,p<=0&&(p=.25,t.render(e,1,0))}}}async function cv(){await M.init(),s(M.language());let t=document.getElementById(`app`),n=Ug(),r=vm({static:n.staticWorld});Zg(r,n);let i=Number(new URLSearchParams(location.search).get(`density`)),a=(navigator.hardwareConcurrency||4)<=4||matchMedia(`(pointer: coarse)`).matches,o=new t_(i>0?i:a?void 0:1,i>0);If(r,o.density),mm(r,n);let c=new g,l=new Tg(t,r);l.attachCity(n);let u=ee.debug?new s_:null,d=new Eg(e,5);ee.debug&&(window.__rr={world:r,view:l,city:n}),l.snapCamera(r);let f=await sv(r,l,n,c);i_(`clearStars`,{available:()=>r.wanted.stars>0,grant:()=>void um(r)}),i_(`revive`,{available:()=>r.life.state===`wasted`||r.life.lastAt===`hospital`&&r.life.reviveT>0,grant:()=>void lm(r)}),i_(`repairCar`,{available:()=>pm(r),grant:()=>void dm(r)}),M.onChange(()=>{M.paused&&c.releaseAll()});let p=performance.now(),m=t=>{requestAnimationFrame(m);let n=Math.min(.25,(t-p)/1e3);if(p=t,M.paused){d.reset();return}if(f.blocking){d.reset(),f.idleFrame(n);return}let i=d.advance(n);for(let t=0;t<i;t++){let t=c.read();f.controls(t),xm(r,t,e),l.handleEvents(r.events),f.handleEvents(r.events)}if(l.render(r,d.alpha,n),f.frame(n),o.frame(n)&&If(r,o.density),u){let e=l.stats();u.frame(n,{calls:e.calls,triangles:e.triangles,entities:bm(r)})}};requestAnimationFrame(m),document.getElementById(`loading`)?.remove(),M.loadingFinished()}cv();export{v as n,_ as t};