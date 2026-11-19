(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1/60,t={speed:12,turnRate:10,worldHalfSize:300},n={fovDeg:45,follow:8,walkDistance:18,walkPitchDeg:58,driveDistance:27,drivePitchDeg:62,speedZoom:.9,maxSpeedZoom:13,speedPitchDeg:8,lookAhead:.45,maxLookAhead:11,zoomEase:2.5,shakePerImpact:.06,maxShake:1.6,shakeDecay:5},r={radius:.42,runSpeed:6.5,accel:40,turnRate:12,slideFriction:9,knockTime:1.6,getUpTime:.45,hitSpeed:3,hitDamagePerMs:2.5,punchReach:1.55,punchCone:1,punchCooldown:.45,punchTime:.25,punchDamage:12,punchPush:5,enterReach:2.2,enterMaxSpeed:3,exitMaxSpeed:6,pullOutTime:.5,respawnTime:3},i={"game.name":`Rickshaw Rush`,"city.name":`Nagarpur`,"title.loading":`Loading…`,"title.tapToPlay":`Tap to play`,"title.play":`PLAY`,"title.tagline":`Honk. Drive. Escape. Welcome to Nagarpur!`,"debug.fps":`FPS`,"debug.calls":`draw calls`,"debug.tris":`triangles`,"debug.entities":`entities`,"hud.speed":`km/h`,"hud.distance":`{m} m`,"hud.pause":`Pause`,"hud.map":`Map`,"hud.bust":`BUSTED`,"hint.getIn":`{key} — get in`,"hint.takeOver":`{key} — take this ride`,"hint.getOut":`{key} — get out`,"tip.getIn":`Walk up to a vehicle and get in.`,"tip.getInTouch":`Walk to a vehicle, then tap IN.`,"tip.drive":`W to drive, A/D to steer, Space to drift, H to honk!`,"tip.driveTouch":`Hold GAS to drive, steer with the stick. Honk a lot!`,"tip.job":`Find a job: follow the arrow to the pink marker (map: {key}).`,"tip.jobTouch":`Find a job: follow the arrow to the pink marker.`,"pause.title":`Paused`,"pause.resume":`Resume`,"pause.settings":`Settings`,"pause.controls":`Controls`,"pause.map":`Map`,"pause.back":`Back`,"pause.help":`Quick help`,"settings.sound":`Sound`,"settings.music":`Music & city`,"settings.quality":`Quality`,"quality.auto":`Auto`,"quality.low":`Low`,"quality.medium":`Medium`,"quality.high":`High`,"controls.move":`Walk / drive`,"controls.moveKeys":`WASD or arrows`,"controls.use":`Get in / out`,"controls.punch":`Punch`,"controls.handbrake":`Handbrake (drift)`,"controls.horn":`Horn`,"controls.map":`Map`,"controls.pause":`Pause`,"controls.touch":`Phone: stick on the left, buttons on the right.`,"map.title":`Nagarpur`,"map.close":`Close`,"map.you":`You`,"map.objective":`Objective`,"map.job":`Job`,"map.garage":`Garage`,"end.wasted":`WASTED`,"end.busted":`BUSTED`,"end.wastedSub":`You wake up at the hospital.`,"end.bustedSub":`The police took you to the station.`,"end.continue":`Continue`,"end.revive":`Revive here`,"end.passed":`MISSION PASSED`,"end.failed":`MISSION FAILED`,"end.passedSub":`Nice driving!`,"end.failedSub":`Try again from the marker.`,"reward.ad":`Ad`,"reward.clearStars":`Lose the police`,"reward.repairCar":`Repair vehicle`,"reward.doubleMoney":`Double the pay`,"reward.refundFine":`Get the fine back`,"reward.failed":`No ad right now. Try again later.`,"touch.gas":`GAS`,"touch.brake":`BRAKE`,"touch.drift":`DRIFT`,"touch.horn":`HORN`,"touch.in":`IN`,"touch.out":`OUT`,"touch.punch":`PUNCH`,"obj.getVehicle":`Get a vehicle.`,"obj.backIn":`Get back in your ride.`,"obj.goTo":`Drive to the marker.`,"obj.toGarage":`Bring it to the garage.`,"obj.pickUpPassenger":`Pick up the passenger.`,"obj.pickUpParcel":`Collect the parcel.`,"obj.dropPassenger":`Drop the passenger at {place}.`,"obj.deliverParcel":`Deliver the parcel to {place}.`,"obj.deliverFragile":`Deliver the glass to {place}. Intact: {pkg}%`,"obj.survive":`Keep {stars} stars and stay free!`,"obj.checkpoint":`Checkpoint {n} of {total}`,"obj.steal":`Steal the marked {model}.`,"obj.stop":`Stop the runaway {model}!`,"obj.hail":`A passenger is waving! Stop next to them.`,"obj.hailNoCab":`A passenger is waving. Get in a rickshaw or taxi.`,"obj.fare":`Take the passenger to {place}. Fare ₹{fare}`,"obj.fareNoPlace":`Take the passenger to the marker. Fare ₹{fare}`,"obj.findJob":`Find a job: go to the pink marker.`,"model.rickshaw":`rickshaw`,"model.taxi":`taxi`,"model.motorbike":`motorbike`,"model.bus":`bus`,"model.truck":`truck`,"model.police":`police jeep`,"mission.firstFare":`First Fare`,"mission.firstFare.brief":`A spice merchant needs a fast ride to the temple.`,"mission.bangles":`Glass Bangles`,"mission.bangles.brief":`Carry a box of glass bangles. Do not crash!`,"mission.bazaarDash":`Bazaar Dash`,"mission.bazaarDash.brief":`Race through the bazaar gates before time runs out.`,"mission.heatWave":`Heat Wave`,"mission.heatWave.brief":`Make some noise: keep 2 stars and do not get caught.`,"mission.hotTruck":`Hot Truck`,"mission.hotTruck.brief":`Steal the marked truck and bring it to the garage.`,"mission.chainSnatcher":`Chain Snatcher`,"mission.chainSnatcher.brief":`A thief is getting away in a taxi. Stop him!`,"mission.needsVehicle":`{title}: come back with a vehicle.`,"mission.passedSub":`{title}: +₹{money}, respect +{rep}`,"mission.unlock":`New at the garage: {model}`,"fail.time":`Out of time.`,"fail.package":`The glass broke.`,"fail.vehicle":`Your ride was wrecked.`,"fail.busted":`You got caught.`,"fail.wasted":`You got knocked out.`,"fail.escaped":`They got away.`,"fare.paid":`Fare ₹{fare} + tip ₹{tip}`,"fare.paidNoTip":`Fare ₹{fare}. No tip: too slow or too rough.`,"fare.lost":`The passenger ran off without paying.`,"mission.checkpoint":`Gate {n}/{total}`,"rep.level":`Respect level {level}!`,"rep.district":`Respect level {level}! New jobs in {place}.`,"garage.title":`Garage`,"garage.buy":`Buy {model} ₹{price}`,"garage.take":`Take {model}`,"garage.repair":`Repair ₹{price}`,"garage.heal":`Patch up ₹{price}`,"garage.poor":`Not enough money.`,"garage.bought":`{model} is yours!`,"garage.repaired":`Good as new.`,"garage.healed":`Feeling better.`,"garage.noRoom":`No room to park it. Move away a little.`},a={en:i},o=i;function s(e){o=a[e]??i}function c(e,t){let n=o[e]??i[e];return t?n.replace(/\{(\w+)\}/g,(e,n)=>n in t?String(t[n]):e):n}function l(){return{moveX:0,moveY:0,throttle:0,brake:0,handbrake:!1,use:!1,horn:!1,action:!1,pause:!1}}var u;function d(e,t,n){Math.hypot(t,n)>Math.hypot(e.moveX,e.moveY)&&(e.moveX=t,e.moveY=n)}var f=class{constructor(e=window){this.down=new Set,this.tapped=new Set,this.onDown=e=>{e.repeat||(this.down.add(e.code),this.tapped.add(e.code),(e.code.startsWith(`Arrow`)||e.code===`Space`)&&e.preventDefault())},this.onUp=e=>{this.down.delete(e.code)},this.onBlur=()=>this.release(),this.target=e,e.addEventListener(`keydown`,this.onDown),e.addEventListener(`keyup`,this.onUp),e.addEventListener(`blur`,this.onBlur)}release(){this.down.clear(),this.tapped.clear()}any(...e){for(let t of e)if(this.down.has(t)||this.tapped.has(t))return!0;return!1}poll(e){let t=+!!this.any(`KeyD`,`ArrowRight`)-!!this.any(`KeyA`,`ArrowLeft`),n=+!!this.any(`KeyW`,`ArrowUp`)-!!this.any(`KeyS`,`ArrowDown`);d(e,t,n),n>0&&(e.throttle=Math.max(e.throttle,1)),n<0&&(e.brake=Math.max(e.brake,1)),e.handbrake||(e.handbrake=this.any(`Space`)),e.use||(e.use=this.any(`KeyE`)),e.horn||(e.horn=this.any(`KeyH`)),e.action||(e.action=this.any(`KeyF`)),e.pause||(e.pause=this.any(`Escape`,`KeyP`)),this.tapped.clear()}dispose(){this.target.removeEventListener(`keydown`,this.onDown),this.target.removeEventListener(`keyup`,this.onUp),this.target.removeEventListener(`blur`,this.onBlur)}},p=class e{poll(t){if(!(typeof navigator>`u`||!navigator.getGamepads))for(let n of navigator.getGamepads()){if(!n||!n.connected)continue;d(t,m(n.axes[0]??0,e.DEAD),-m(n.axes[1]??0,e.DEAD));let r=e=>n.buttons[e]?.value??0;t.throttle=Math.max(t.throttle,r(7)),t.brake=Math.max(t.brake,r(6)),t.handbrake||(t.handbrake=r(0)>.5),t.action||(t.action=r(1)>.5),t.use||(t.use=r(3)>.5),t.horn||(t.horn=r(10)>.5),t.pause||(t.pause=r(9)>.5)}}dispose(){}};u=p,u.DEAD=.18;function m(e,t){let n=Math.abs(e);return n<t?0:Math.sign(e)*(n-t)/(1-t)}var h=class{constructor(){this.stickX=0,this.stickY=0,this.buttons=new Set,this.gas=0,this.brakePedal=0,this.tapped=new Set}setStick(e,t){this.stickX=e,this.stickY=t}setPedals(e,t){this.gas=e,this.brakePedal=t}setButton(e,t){t?(this.buttons.add(e),this.tapped.add(e)):this.buttons.delete(e)}release(){this.stickX=this.stickY=0,this.gas=this.brakePedal=0,this.buttons.clear(),this.tapped.clear()}poll(e){d(e,this.stickX,this.stickY),this.stickY>0&&(e.throttle=Math.max(e.throttle,this.stickY)),this.stickY<0&&(e.brake=Math.max(e.brake,-this.stickY)),e.throttle=Math.max(e.throttle,this.gas),e.brake=Math.max(e.brake,this.brakePedal);for(let t of this.buttons)e[t]=!0;for(let t of this.tapped)e[t]=!0;this.tapped.clear()}dispose(){this.release()}},g=class{constructor(){this.keyboard=new f,this.gamepad=new p,this.touch=new h,this.sources=[this.keyboard,this.gamepad,this.touch],this.current=l()}read(){let e=this.current;e.moveX=e.moveY=e.throttle=e.brake=0,e.handbrake=e.use=e.horn=e.action=e.pause=!1;for(let t of this.sources)t.poll(e);return e}releaseAll(){this.keyboard.release(),this.touch.release()}dispose(){for(let e of this.sources)e.dispose()}},_=class{constructor(e={},t=1500){this.name=`local`,this.playing=!1,this.hooks=e,this.adDurationMs=t}async init(){console.info(`[portal:local] init`)}loadingFinished(){console.info(`[portal:local] loadingFinished`)}gameplayStart(){console.info(`[portal:local] gameplayStart`),this.reportPlay(!0)}gameplayStop(){console.info(`[portal:local] gameplayStop`),this.reportPlay(!1)}reportPlay(e){if(e!==this.playing){this.playing=e;try{this.hooks.onPlayChange?.(e)}catch(e){console.warn(`[portal:local] play listener failed`,e)}}}happyTime(){console.info(`[portal:local] happyTime`)}async showInterstitial(){await this.fakeAd(`INTERSTITIAL AD (simulated)`)}async showRewarded(){return await this.fakeAd(`REWARDED AD (simulated)`),!0}async save(e,t){try{localStorage.setItem(this.k(e),JSON.stringify(t))}catch{}}async load(e){try{let t=localStorage.getItem(this.k(e));return t===null?void 0:JSON.parse(t)}catch{return}}getLanguage(){return(navigator.language||`en`).slice(0,2).toLowerCase()||`en`}k(e){return`game:${e}`}fakeAd(e){this.hooks.onAdStart?.();let t=document.createElement(`div`);return t.textContent=e,Object.assign(t.style,{position:`fixed`,inset:`0`,display:`flex`,alignItems:`center`,justifyContent:`center`,background:`rgba(0,0,0,0.85)`,color:`#fff`,font:`600 24px system-ui, sans-serif`,zIndex:`9999`}),document.body.appendChild(t),new Promise(e=>{setTimeout(()=>{t.remove(),this.hooks.onAdEnd?.(),e()},this.adDurationMs)})}};function v(e,t=8e3){return new Promise((n,r)=>{if(document.querySelector(`script[src="${e}"]`))return n();let i=document.createElement(`script`);i.src=e,i.async=!0;let a=setTimeout(()=>r(Error(`script timeout: ${e}`)),t);i.onload=()=>{clearTimeout(a),n()},i.onerror=()=>{clearTimeout(a),r(Error(`script failed: ${e}`))},document.head.appendChild(i)})}var y=`modulepreload`,b=function(e,t){return new URL(e,t).href},x={},S=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=b(t,n),t=s(t),t in x)return;x[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:y,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},C=[`/sdk.js`,`https://sdk.games.s3.yandex.net/sdk.js`];function w(){let e=new URLSearchParams(location.search).get(`portal`);if(e===`crazygames`||e===`poki`||e===`yandex`||e===`local`)return e;let t=[location.hostname,T(document.referrer)].join(` `);return/crazygames\.com|1001juegos\.com|crazygames\.[a-z.]+/.test(t)?`crazygames`:/poki\.com|poki-gdn\.com/.test(t)?`poki`:/yandex\.(ru|net|com)|games\.s3\.yandex/.test(t)?`yandex`:`local`}function T(e){try{return e?new URL(e).hostname:``}catch{return``}}async function E(e={},t=w(),n={}){switch(t){case`crazygames`:{let{CrazyGamesPortal:t}=await S(async()=>{let{CrazyGamesPortal:e}=await import(`./crazygames-UcAXrbIc.js`);return{CrazyGamesPortal:e}},[],import.meta.url);return new t(e)}case`poki`:{let{PokiPortal:t}=await S(async()=>{let{PokiPortal:e}=await import(`./poki-RwXWUEFv.js`);return{PokiPortal:e}},[],import.meta.url);return new t(e)}case`yandex`:{let{YandexPortal:t}=await S(async()=>{let{YandexPortal:e}=await import(`./yandex-JIVEAmOW.js`);return{YandexPortal:e}},[],import.meta.url);return new t(e,C)}default:return new _(e)}}var D=4e3,O=120,k=180,A=class{constructor(){this.portal=new _({}),this.adOn=!1,this.portalMute=!1,this.listeners=new Set,this.playing=!1,this.startedAt=j(),this.lastAdAt=-1/0}get paused(){return this.adOn||typeof document<`u`&&document.hidden}get adShowing(){return this.adOn}get muted(){return this.portalMute}onChange(e){this.listeners.add(e)}notify(){for(let e of this.listeners)try{e()}catch(e){console.warn(`[platform] listener failed`,e)}}async init(){try{let e=await E({onAdStart:()=>{this.adOn=!0,this.notify()},onAdEnd:()=>{this.adOn=!1,this.notify()},onMuteChange:e=>{this.portalMute=e,this.notify()}}),t=e.init().then(()=>!0,()=>!1),n=new Promise(e=>setTimeout(()=>e(!1),D));await Promise.race([t,n])&&(this.portal=e)}catch{this.portal=new _({})}document.addEventListener(`visibilitychange`,()=>this.notify())}loadingFinished(){this.safe(()=>this.portal.loadingFinished(!1))}setPlaying(e){e!==this.playing&&(this.playing=e,this.safe(()=>e?this.portal.gameplayStart():this.portal.gameplayStop()))}get isPlaying(){return this.playing}happyTime(){this.safe(()=>this.portal.happyTime())}async showMidgame(e){let t=j();if(t-this.startedAt<O||t-this.lastAdAt<k)return!1;this.lastAdAt=t,this.setPlaying(!1);try{await this.portal.showInterstitial()}catch(t){console.warn(`[platform] midgame failed`,e,t)}return this.endAd(),!0}rewardedAvailable(){try{return!this.portal.rewardedAvailable||this.portal.rewardedAvailable()}catch{return!1}}async showRewarded(e){if(!this.rewardedAvailable())return!1;this.setPlaying(!1),this.lastAdAt=j();let t=!1;try{t=await this.portal.showRewarded()===!0}catch(t){console.warn(`[platform] rewarded failed`,e,t)}return this.endAd(),t}endAd(){this.adOn&&(this.adOn=!1,this.notify())}language(){try{return this.portal.getLanguage()}catch{return`en`}}safe(e){try{e()}catch(e){console.warn(`[platform] portal call failed`,e)}}};function j(){return(typeof performance<`u`?performance.now():0)/1e3}var M=new A,N=new URLSearchParams(typeof location<`u`?location.search:``),ee={debug:N.get(`debug`)===`1`,touch:(e=>N.has(e)?N.get(e)!==`0`:void 0)(`touch`)},te,ne,re,ie,ae,oe,P,se,ce,le=1e3,ue=1001,de=1002,fe=1003,pe=1004,me=1005,he=1006,ge=1007,_e=1008,ve=1009,ye=1010,be=1011,xe=1012,Se=1013,Ce=1014,we=1015,Te=1016,Ee=1017,De=1018,Oe=1020,ke=35902,Ae=35899,F=1021,je=1022,Me=1023,Ne=1026,I=1027,Pe=1028,Fe=1029,L=1030,Ie=1031,Le=1033,Re=33776,ze=33777,Be=33778,Ve=33779,He=35840,Ue=35841,We=35842,Ge=35843,Ke=36196,qe=37492,Je=37496,Ye=37488,Xe=37489,Ze=37490,Qe=37491,$e=37808,et=37809,tt=37810,nt=37811,rt=37812,it=37813,at=37814,ot=37815,st=37816,ct=37817,lt=37818,ut=37819,dt=37820,ft=37821,pt=36492,mt=36494,ht=36495,gt=36283,_t=36284,vt=36285,yt=36286,bt=2300,xt=2301,St=2302,Ct=2303,wt=2400,Tt=2401,Et=2402,Dt=3200,Ot=`srgb`,kt=`srgb-linear`,At=`linear`,jt=`srgb`,Mt=7680,Nt=35044,Pt=35048,Ft=2e3;function It(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Lt(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Rt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function zt(){let e=Rt(`canvas`);return e.style.display=`block`,e}var Bt={};function Vt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Ht(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function R(...e){e=Ht(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function z(...e){e=Ht(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Ut(...e){let t=e.join(` `);t in Bt||(Bt[t]=!0,R(...e))}function Wt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Gt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Kt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},qt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Jt=Math.PI/180,Yt=180/Math.PI;function Xt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(qt[e&255]+qt[e>>8&255]+qt[e>>16&255]+qt[e>>24&255]+`-`+qt[t&255]+qt[t>>8&255]+`-`+qt[t>>16&15|64]+qt[t>>24&255]+`-`+qt[n&63|128]+qt[n>>8&255]+`-`+qt[n>>16&255]+qt[n>>24&255]+qt[r&255]+qt[r>>8&255]+qt[r>>16&255]+qt[r>>24&255]).toLowerCase()}function Zt(e,t,n){return Math.max(t,Math.min(n,e))}function Qt(e,t){return(e%t+t)%t}function $t(e,t,n){return(1-n)*e+n*t}function en(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function tn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}P=Symbol.iterator;var B=class{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Zt(this.x,e.x,t.x),this.y=Zt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Zt(this.x,e,t),this.y=Zt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Zt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[P](){yield this.x,yield this.y}};te=B,te.prototype.isVector2=!0;var nn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:R(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Zt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};se=Symbol.iterator;var V=class{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(an.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(an.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Zt(this.x,e.x,t.x),this.y=Zt(this.y,e.y,t.y),this.z=Zt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Zt(this.x,e,t),this.y=Zt(this.y,e,t),this.z=Zt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return rn.copy(this).projectOnVector(e),this.sub(rn)}reflect(e){return this.sub(rn.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Zt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[se](){yield this.x,yield this.y,yield this.z}};ne=V,ne.prototype.isVector3=!0;var rn=new V,an=new nn,H=class{constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Ut(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(on.makeScale(e,t)),this}rotate(e){return Ut(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(on.makeRotation(-e)),this}translate(e,t){return Ut(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(on.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};re=H,re.prototype.isMatrix3=!0;var on=new H,sn=new H().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cn=new H().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ln(){let e={enabled:!0,workingColorSpace:kt,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=dn(e.r),e.g=dn(e.g),e.b=dn(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=fn(e.r),e.g=fn(e.g),e.b=fn(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?At:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Ut(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Ut(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[kt]:{primaries:t,whitePoint:r,transfer:At,toXYZ:sn,fromXYZ:cn,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ot},outputColorSpaceConfig:{drawingBufferColorSpace:Ot}},[Ot]:{primaries:t,whitePoint:r,transfer:jt,toXYZ:sn,fromXYZ:cn,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ot}}}),e}var un=ln();function dn(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function fn(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var pn,mn=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{pn===void 0&&(pn=Rt(`canvas`)),pn.width=e.width,pn.height=e.height;let t=pn.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=pn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Rt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=dn(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(dn(t[e]/255)*255):t[e]=dn(t[e]);return{data:t,width:e.width,height:e.height}}return R(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},hn=0,gn=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:hn++}),this.uuid=Xt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(_n(r[t].image)):e.push(_n(r[t]))}else e=_n(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function _n(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?mn.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(R(`Texture: Unable to serialize Texture.`),{})}var vn=0,yn=new V,bn=class e extends Kt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=ue,i=ue,a=he,o=_e,s=Me,c=ve,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vn++}),this.uuid=Xt(),this.name=``,this.source=new gn(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new B(0,0),this.repeat=new B(1,1),this.center=new B(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new H,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(yn).x}get height(){return this.source.getSize(yn).y}get depth(){return this.source.getSize(yn).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){R(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){R(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case le:e.x-=Math.floor(e.x);break;case ue:e.x=e.x<0?0:1;break;case de:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case le:e.y-=Math.floor(e.y);break;case ue:e.y=e.y<0?0:1;break;case de:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};bn.DEFAULT_IMAGE=null,bn.DEFAULT_MAPPING=300,bn.DEFAULT_ANISOTROPY=1,ce=Symbol.iterator;var xn=class{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Zt(this.x,e.x,t.x),this.y=Zt(this.y,e.y,t.y),this.z=Zt(this.z,e.z,t.z),this.w=Zt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Zt(this.x,e,t),this.y=Zt(this.y,e,t),this.z=Zt(this.z,e,t),this.w=Zt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[ce](){yield this.x,yield this.y,yield this.z,yield this.w}};ie=xn,ie.prototype.isVector4=!0;var Sn=class extends Kt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:he,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new xn(0,0,e,t),this.scissorTest=!1,this.viewport=new xn(0,0,e,t),this.textures=[];let r=new bn({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:he,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new gn(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Cn=class extends Sn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},wn=class extends bn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=fe,this.minFilter=fe,this.wrapR=ue,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Tn=class extends bn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=fe,this.minFilter=fe,this.wrapR=ue,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},En=class e{constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Dn.setFromMatrixColumn(e,0).length(),i=1/Dn.setFromMatrixColumn(e,1).length(),a=1/Dn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kn,e,An)}lookAt(e,t,n){let r=this.elements;return Nn.subVectors(e,t),Nn.lengthSq()===0&&(Nn.z=1),Nn.normalize(),jn.crossVectors(n,Nn),jn.lengthSq()===0&&(Math.abs(n.z)===1?Nn.x+=1e-4:Nn.z+=1e-4,Nn.normalize(),jn.crossVectors(n,Nn)),jn.normalize(),Mn.crossVectors(Nn,jn),r[0]=jn.x,r[4]=Mn.x,r[8]=Nn.x,r[1]=jn.y,r[5]=Mn.y,r[9]=Nn.y,r[2]=jn.z,r[6]=Mn.z,r[10]=Nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],ee=r[7],te=r[11],ne=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*ee,i[8]=a*C+o*D+s*j+c*te,i[12]=a*w+o*O+s*M+c*ne,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*ee,i[9]=l*C+u*D+d*j+f*te,i[13]=l*w+u*O+d*M+f*ne,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*ee,i[10]=p*C+m*D+h*j+g*te,i[14]=p*w+m*O+h*M+g*ne,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*ee,i[11]=_*C+v*D+y*j+b*te,i[15]=_*w+v*O+y*M+b*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Dn.set(r[0],r[1],r[2]).length(),o=Dn.set(r[4],r[5],r[6]).length(),s=Dn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),On.copy(this);let c=1/a,l=1/o,u=1/s;return On.elements[0]*=c,On.elements[1]*=c,On.elements[2]*=c,On.elements[4]*=l,On.elements[5]*=l,On.elements[6]*=l,On.elements[8]*=u,On.elements[9]*=u,On.elements[10]*=u,t.setFromRotationMatrix(On),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Ft,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Ft,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};ae=En,ae.prototype.isMatrix4=!0;var Dn=new V,On=new En,kn=new V(0,0,0),An=new V(1,1,1),jn=new V,Mn=new V,Nn=new V,Pn=new En,Fn=new nn,In=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(Zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-Zt(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(Zt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-Zt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(Zt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-Zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:R(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Pn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Fn.setFromEuler(this),this.setFromQuaternion(Fn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};In.DEFAULT_ORDER=`XYZ`;var Ln=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},Rn=0,zn=new V,Bn=new nn,Vn=new En,Hn=new V,Un=new V,Wn=new V,Gn=new nn,Kn=new V(1,0,0),qn=new V(0,1,0),Jn=new V(0,0,1),Yn={type:`added`},Xn={type:`removed`},Zn={type:`childadded`,child:null},Qn={type:`childremoved`,child:null},$n=class e extends Kt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Rn++}),this.uuid=Xt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new V,n=new In,r=new nn,i=new V(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new En},normalMatrix:{value:new H}}),this.matrix=new En,this.matrixWorld=new En,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ln,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Bn.setFromAxisAngle(e,t),this.quaternion.multiply(Bn),this}rotateOnWorldAxis(e,t){return Bn.setFromAxisAngle(e,t),this.quaternion.premultiply(Bn),this}rotateX(e){return this.rotateOnAxis(Kn,e)}rotateY(e){return this.rotateOnAxis(qn,e)}rotateZ(e){return this.rotateOnAxis(Jn,e)}translateOnAxis(e,t){return zn.copy(e).applyQuaternion(this.quaternion),this.position.add(zn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Kn,e)}translateY(e){return this.translateOnAxis(qn,e)}translateZ(e){return this.translateOnAxis(Jn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Hn.copy(e):Hn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Un.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(Un,Hn,this.up):Vn.lookAt(Hn,Un,this.up),this.quaternion.setFromRotationMatrix(Vn),r&&(Vn.extractRotation(r.matrixWorld),Bn.setFromRotationMatrix(Vn),this.quaternion.premultiply(Bn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(z(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yn),Zn.child=e,this.dispatchEvent(Zn),Zn.child=null):z(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Xn),Qn.child=e,this.dispatchEvent(Qn),Qn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yn),Zn.child=e,this.dispatchEvent(Zn),Zn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Un,e,Wn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Un,Gn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};$n.DEFAULT_UP=new V(0,1,0),$n.DEFAULT_MATRIX_AUTO_UPDATE=!0,$n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var er=class extends $n{constructor(){super(),this.isGroup=!0,this.type=`Group`}},tr={type:`move`},nr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new er,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new er,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new er,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(tr)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new er;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},rr={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ir={h:0,s:0,l:0},ar={h:0,s:0,l:0};function or(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var U=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,un.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=un.workingColorSpace){return this.r=e,this.g=t,this.b=n,un.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=un.workingColorSpace){if(e=Qt(e,1),t=Zt(t,0,1),n=Zt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=or(i,r,e+1/3),this.g=or(i,r,e),this.b=or(i,r,e-1/3)}return un.colorSpaceToWorking(this,r),this}setStyle(e,t=Ot){function n(t){t!==void 0&&parseFloat(t)<1&&R(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:R(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);R(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ot){let n=rr[e.toLowerCase()];return n===void 0?R(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=dn(e.r),this.g=dn(e.g),this.b=dn(e.b),this}copyLinearToSRGB(e){return this.r=fn(e.r),this.g=fn(e.g),this.b=fn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ot){return un.workingToColorSpace(sr.copy(this),e),Math.round(Zt(sr.r*255,0,255))*65536+Math.round(Zt(sr.g*255,0,255))*256+Math.round(Zt(sr.b*255,0,255))}getHexString(e=Ot){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=un.workingColorSpace){un.workingToColorSpace(sr.copy(this),t);let n=sr.r,r=sr.g,i=sr.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=un.workingColorSpace){return un.workingToColorSpace(sr.copy(this),t),e.r=sr.r,e.g=sr.g,e.b=sr.b,e}getStyle(e=Ot){un.workingToColorSpace(sr.copy(this),e);let t=sr.r,n=sr.g,r=sr.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(ir),this.setHSL(ir.h+e,ir.s+t,ir.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ir),e.getHSL(ar);let n=$t(ir.h,ar.h,t),r=$t(ir.s,ar.s,t),i=$t(ir.l,ar.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},sr=new U;U.NAMES=rr;var cr=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new U(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},lr=class extends $n{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new In,this.environmentIntensity=1,this.environmentRotation=new In,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},ur=new V,dr=new V,fr=new V,pr=new V,mr=new V,hr=new V,gr=new V,_r=new V,vr=new V,yr=new V,br=new xn,xr=new xn,Sr=new xn,Cr=class e{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),ur.subVectors(e,t),r.cross(ur);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){ur.subVectors(r,t),dr.subVectors(n,t),fr.subVectors(e,t);let a=ur.dot(ur),o=ur.dot(dr),s=ur.dot(fr),c=dr.dot(dr),l=dr.dot(fr),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,pr)!==null&&pr.x>=0&&pr.y>=0&&pr.x+pr.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,pr)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,pr.x),s.addScaledVector(a,pr.y),s.addScaledVector(o,pr.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return br.setScalar(0),xr.setScalar(0),Sr.setScalar(0),br.fromBufferAttribute(e,t),xr.fromBufferAttribute(e,n),Sr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(br,i.x),a.addScaledVector(xr,i.y),a.addScaledVector(Sr,i.z),a}static isFrontFacing(e,t,n,r){return ur.subVectors(n,t),dr.subVectors(e,t),ur.cross(dr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ur.subVectors(this.c,this.b),dr.subVectors(this.a,this.b),ur.cross(dr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;mr.subVectors(r,n),hr.subVectors(i,n),_r.subVectors(e,n);let s=mr.dot(_r),c=hr.dot(_r);if(s<=0&&c<=0)return t.copy(n);vr.subVectors(e,r);let l=mr.dot(vr),u=hr.dot(vr);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(mr,a);yr.subVectors(e,i);let f=mr.dot(yr),p=hr.dot(yr);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(hr,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return gr.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(gr,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(mr,a).addScaledVector(hr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},wr=class{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Er.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Er.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Er.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Er):Er.fromBufferAttribute(r,t),Er.applyMatrix4(e.matrixWorld),this.expandByPoint(Er);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Dr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Dr.copy(e.boundingBox)),Dr.applyMatrix4(e.matrixWorld),this.union(Dr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Er),Er.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Pr),Fr.subVectors(this.max,Pr),Or.subVectors(e.a,Pr),kr.subVectors(e.b,Pr),Ar.subVectors(e.c,Pr),jr.subVectors(kr,Or),Mr.subVectors(Ar,kr),Nr.subVectors(Or,Ar);let t=[0,-jr.z,jr.y,0,-Mr.z,Mr.y,0,-Nr.z,Nr.y,jr.z,0,-jr.x,Mr.z,0,-Mr.x,Nr.z,0,-Nr.x,-jr.y,jr.x,0,-Mr.y,Mr.x,0,-Nr.y,Nr.x,0];return!Rr(t,Or,kr,Ar,Fr)||(t=[1,0,0,0,1,0,0,0,1],!Rr(t,Or,kr,Ar,Fr))?!1:(Ir.crossVectors(jr,Mr),t=[Ir.x,Ir.y,Ir.z],Rr(t,Or,kr,Ar,Fr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Er).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Er).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Tr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Tr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Tr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Tr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Tr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Tr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Tr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Tr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Tr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Tr=[new V,new V,new V,new V,new V,new V,new V,new V],Er=new V,Dr=new wr,Or=new V,kr=new V,Ar=new V,jr=new V,Mr=new V,Nr=new V,Pr=new V,Fr=new V,Ir=new V,Lr=new V;function Rr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Lr.fromArray(e,a);let o=i.x*Math.abs(Lr.x)+i.y*Math.abs(Lr.y)+i.z*Math.abs(Lr.z),s=t.dot(Lr),c=n.dot(Lr),l=r.dot(Lr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var zr=new V,Br=new B,Vr=0,Hr=class extends Kt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Vr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Nt,this.updateRanges=[],this.gpuType=we,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Br.fromBufferAttribute(this,t),Br.applyMatrix3(e),this.setXY(t,Br.x,Br.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)zr.fromBufferAttribute(this,t),zr.applyMatrix3(e),this.setXYZ(t,zr.x,zr.y,zr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)zr.fromBufferAttribute(this,t),zr.applyMatrix4(e),this.setXYZ(t,zr.x,zr.y,zr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zr.fromBufferAttribute(this,t),zr.applyNormalMatrix(e),this.setXYZ(t,zr.x,zr.y,zr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zr.fromBufferAttribute(this,t),zr.transformDirection(e),this.setXYZ(t,zr.x,zr.y,zr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=en(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=en(t,this.array)),t}setX(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=en(t,this.array)),t}setY(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=en(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=en(t,this.array)),t}setW(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),r=tn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),r=tn(r,this.array),i=tn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},Ur=class extends Hr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Wr=class extends Hr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Gr=class extends Hr{constructor(e,t,n){super(new Float32Array(e),t,n)}},Kr=new wr,qr=new V,Jr=new V,Yr=class{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Kr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qr.subVectors(e,this.center);let t=qr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(qr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Jr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qr.copy(e.center).add(Jr)),this.expandByPoint(qr.copy(e.center).sub(Jr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Xr=0,Zr=new En,Qr=new $n,$r=new V,ei=new wr,ti=new wr,ni=new V,ri=class e extends Kt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xr++}),this.uuid=Xt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(It(e)?Wr:Ur)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new H().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Zr.makeRotationFromQuaternion(e),this.applyMatrix4(Zr),this}rotateX(e){return Zr.makeRotationX(e),this.applyMatrix4(Zr),this}rotateY(e){return Zr.makeRotationY(e),this.applyMatrix4(Zr),this}rotateZ(e){return Zr.makeRotationZ(e),this.applyMatrix4(Zr),this}translate(e,t,n){return Zr.makeTranslation(e,t,n),this.applyMatrix4(Zr),this}scale(e,t,n){return Zr.makeScale(e,t,n),this.applyMatrix4(Zr),this}lookAt(e){return Qr.lookAt(e),Qr.updateMatrix(),this.applyMatrix4(Qr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($r).negate(),this.translate($r.x,$r.y,$r.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Gr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&R(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){z(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];ei.setFromBufferAttribute(n),this.morphTargetsRelative?(ni.addVectors(this.boundingBox.min,ei.min),this.boundingBox.expandByPoint(ni),ni.addVectors(this.boundingBox.max,ei.max),this.boundingBox.expandByPoint(ni)):(this.boundingBox.expandByPoint(ei.min),this.boundingBox.expandByPoint(ei.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&z(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){z(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new V,1/0);return}if(e){let n=this.boundingSphere.center;if(ei.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];ti.setFromBufferAttribute(n),this.morphTargetsRelative?(ni.addVectors(ei.min,ti.min),ei.expandByPoint(ni),ni.addVectors(ei.max,ti.max),ei.expandByPoint(ni)):(ei.expandByPoint(ti.min),ei.expandByPoint(ti.max))}ei.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)ni.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(ni));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)ni.fromBufferAttribute(a,t),o&&($r.fromBufferAttribute(e,t),ni.add($r)),r=Math.max(r,n.distanceToSquared(ni))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&z(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){z(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Hr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new V,s[e]=new V;let c=new V,l=new V,u=new V,d=new B,f=new B,p=new B,m=new V,h=new V;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new V,y=new V,b=new V,x=new V;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Hr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new V,i=new V,a=new V,o=new V,s=new V,c=new V,l=new V,u=new V;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ni.fromBufferAttribute(e,t),ni.normalize(),e.setXYZ(t,ni.x,ni.y,ni.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Hr(a,r,i)}if(this.index===null)return R(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},ii=new V,ai=new V,oi=new H,si=class{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=ii.subVectors(n,t).cross(ai.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(ii),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||oi.getNormalMatrix(e),r=this.coplanarPoint(ii).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},ci=0,li=class extends Kt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ci++}),this.uuid=Xt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new U(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mt,this.stencilZFail=Mt,this.stencilZPass=Mt,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){R(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){R(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new U().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new si().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new B().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new B().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},ui=new V,di=new V,fi=new V,pi=new V,mi=class{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ui)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ui.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ui.copy(this.origin).addScaledVector(this.direction,t),ui.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){di.copy(e).add(t).multiplyScalar(.5),fi.copy(t).sub(e).normalize(),pi.copy(this.origin).sub(di);let i=e.distanceTo(t)*.5,a=-this.direction.dot(fi),o=pi.dot(this.direction),s=-pi.dot(fi),c=pi.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(di).addScaledVector(fi,d),f}intersectSphere(e,t){if(e.radius<0)return null;ui.subVectors(e.center,this.origin);let n=ui.dot(this.direction),r=ui.dot(ui)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ui)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let ee=S/w,te=C/w,ne=1/w,re=T-ee*D,ie=E-te*D,ae=O-ee*A,oe=k-te*A,P=j-ee*N,se=M-te*N,ce=P*oe-se*ae,le=re*se-ie*P,ue=ae*ie-oe*re;if(r){if(ce<0||le<0||ue<0)return null}else if((ce<0||le<0||ue<0)&&(ce>0||le>0||ue>0))return null;let de=ce+le+ue;if(de===0)return null;let fe=ne*(ce*D+le*A+ue*N);return(de>0?fe<0:fe>0)?null:this.at(fe/de,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},hi=class extends li{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new U(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},gi=new En,_i=new mi,vi=new Yr,yi=new V,bi=new V,xi=new V,Si=new V,Ci=new V,wi=new V,Ti=new V,Ei=new V,Di=class extends $n{constructor(e=new ri,t=new hi){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){wi.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Ci.fromBufferAttribute(s,e),a?wi.addScaledVector(Ci,r):wi.addScaledVector(Ci.sub(t),r))}t.add(wi)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vi.copy(n.boundingSphere),vi.applyMatrix4(i),_i.copy(e.ray).recast(e.near),!(vi.containsPoint(_i.origin)===!1&&(_i.intersectSphere(vi,yi)===null||_i.origin.distanceToSquared(yi)>(e.far-e.near)**2))&&(gi.copy(i).invert(),_i.copy(e.ray).applyMatrix4(gi),(n.boundingBox===null||_i.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,_i)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=ki(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=ki(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=ki(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=ki(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Oi(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Ei.copy(s),Ei.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Ei);return l<n.near||l>n.far?null:{distance:l,point:Ei.clone(),object:e}}function ki(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,bi),e.getVertexPosition(c,xi),e.getVertexPosition(l,Si);let u=Oi(e,t,n,r,bi,xi,Si,Ti);if(u){let e=new V;Cr.getBarycoord(Ti,bi,xi,Si,e),i&&(u.uv=Cr.getInterpolatedAttribute(i,s,c,l,e,new B)),a&&(u.uv1=Cr.getInterpolatedAttribute(a,s,c,l,e,new B)),o&&(u.normal=Cr.getInterpolatedAttribute(o,s,c,l,e,new V),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new V,materialIndex:0};Cr.getNormal(bi,xi,Si,t.normal),u.face=t,u.barycoord=e}return u}var Ai=class extends bn{constructor(e=null,t=1,n=1,r,i,a,o,s,c=fe,l=fe,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ji=class extends Hr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Mi=new En,Ni=new En,Pi=[],Fi=new wr,Ii=new En,Li=new Di,Ri=new Yr,zi=class extends Di{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ji(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Ii)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new wr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Mi),Fi.copy(e.boundingBox).applyMatrix4(Mi),this.boundingBox.union(Fi)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Yr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Mi),Ri.copy(e.boundingSphere).applyMatrix4(Mi),this.boundingSphere.union(Ri)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Li.geometry=this.geometry,Li.material=this.material,Li.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ri.copy(this.boundingSphere),Ri.applyMatrix4(n),e.ray.intersectsSphere(Ri)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Mi),Ni.multiplyMatrices(n,Mi),Li.matrixWorld=Ni,Li.raycast(e,Pi);for(let e=0,n=Pi.length;e<n;e++){let n=Pi[e];n.instanceId=i,n.object=this,t.push(n)}Pi.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ji(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ai(new Float32Array(r*this.count),r,this.count,Pe,we));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Bi=new Yr,Vi=new B(.5,.5),Hi=new V,Ui=class{constructor(e=new si,t=new si,n=new si,r=new si,i=new si,a=new si){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ft,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(e){return Bi.center.set(0,0,0),Bi.radius=.7071067811865476+Vi.distanceTo(e.center),Bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Hi.x=r.normal.x>0?e.max.x:e.min.x,Hi.y=r.normal.y>0?e.max.y:e.min.y,Hi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Hi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Wi=class extends bn{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Gi=class extends bn{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ki=class extends bn{constructor(e,t,n=Ce,r,i,a,o=fe,s=fe,c,l=Ne,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new gn(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},qi=class extends Ki{constructor(e,t=Ce,n=301,r,i,a=fe,o=fe,s,c=Ne){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ji=class extends bn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Yi=class e extends ri{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Gr(c,3)),this.setAttribute(`normal`,new Gr(l,3)),this.setAttribute(`uv`,new Gr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new V;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Xi=class e extends ri{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Gr(u,3)),this.setAttribute(`normal`,new Gr(d,3)),this.setAttribute(`uv`,new Gr(f,2));function _(){let a=new V,_=new V,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new B,m=new V,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Zi=class e extends Xi{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Qi=class e extends ri{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Gr(i,3)),this.setAttribute(`normal`,new Gr(i.slice(),3)),this.setAttribute(`uv`,new Gr(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new V,r=new V,i=new V;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new V;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new V;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new V,t=new V,n=new V,r=new V,o=new B,s=new B,c=new B;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}};function $i(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=ea(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=sa(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return na(a,o,n,s,c,l,0),o}function ea(e,t,n,r,i){let a;if(i===ja(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=Oa(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=Oa(i/r|0,e[i],e[i+1],a);return a&&ba(a,a.next)&&(ka(a),a=a.next),a}function ta(e,t){if(!e)return e;t||(t=e);let n=e,r;do if(r=!1,!n.steiner&&(ba(n,n.next)||ya(n.prev,n,n.next)===0)){if(ka(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function na(e,t,n,r,i,a,o){if(!e)return;!o&&a&&fa(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?ia(e,r,i,a):ra(e)){t.push(c.i,e.i,l.i),ka(e),e=l.next,s=l.next;continue}if(e=l,e===s){o?o===1?(e=aa(ta(e),t),na(e,t,n,r,i,a,2)):o===2&&oa(e,t,n,r,i,a):na(ta(e),t,n,r,i,a,1);break}}}function ra(e){let t=e.prev,n=e,r=e.next;if(ya(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&_a(i,s,a,c,o,l,m.x,m.y)&&ya(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function ia(e,t,n,r){let i=e.prev,a=e,o=e.next;if(ya(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=ma(p,m,t,n,r),v=ma(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&_a(s,u,c,d,l,f,y.x,y.y)&&ya(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&_a(s,u,c,d,l,f,b.x,b.y)&&ya(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&_a(s,u,c,d,l,f,y.x,y.y)&&ya(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&_a(s,u,c,d,l,f,b.x,b.y)&&ya(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function aa(e,t){let n=e;do{let r=n.prev,i=n.next.next;!ba(r,i)&&xa(r,n,n.next,i)&&Ta(r,i)&&Ta(i,r)&&(t.push(r.i,n.i,i.i),ka(n),ka(n.next),n=e=i),n=n.next}while(n!==e);return ta(n)}function oa(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&va(o,e)){let s=Da(o,e);o=ta(o,o.next),s=ta(s,s.next),na(o,t,n,r,i,a,0),na(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function sa(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=ea(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(ha(o))}i.sort(ca);for(let e=0;e<i.length;e++)n=la(i[e],n);return n}function ca(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function la(e,t){let n=ua(e,t);if(!n)return t;let r=Da(n,e);return ta(r,r.next),ta(n,n.next)}function ua(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(ba(e,n))return n;do{if(ba(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&ga(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);Ta(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&da(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function da(e,t){return ya(e.prev,e,t.prev)<0&&ya(t.next,e,e.next)<0}function fa(e,t,n,r){let i=e;do i.z===0&&(i.z=ma(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,pa(i)}function pa(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function ma(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function ha(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function ga(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function _a(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&ga(e,t,n,r,i,a,o,s)}function va(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!wa(e,t)&&(Ta(e,t)&&Ta(t,e)&&Ea(e,t)&&(ya(e.prev,e,t.prev)||ya(e,t.prev,t))||ba(e,t)&&ya(e.prev,e,e.next)>0&&ya(t.prev,t,t.next)>0)}function ya(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function ba(e,t){return e.x===t.x&&e.y===t.y}function xa(e,t,n,r){let i=Ca(ya(e,t,n)),a=Ca(ya(e,t,r)),o=Ca(ya(n,r,e)),s=Ca(ya(n,r,t));return!!(i!==a&&o!==s||i===0&&Sa(e,n,t)||a===0&&Sa(e,r,t)||o===0&&Sa(n,e,r)||s===0&&Sa(n,t,r))}function Sa(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Ca(e){return e>0?1:e<0?-1:0}function wa(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&xa(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Ta(e,t){return ya(e.prev,e,e.next)<0?ya(e,t,e.next)>=0&&ya(e,e.prev,t)>=0:ya(e,t,e.prev)<0||ya(e,e.next,t)<0}function Ea(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Da(e,t){let n=Aa(e.i,e.x,e.y),r=Aa(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function Oa(e,t,n,r){let i=Aa(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function ka(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Aa(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function ja(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var Ma=class{static triangulate(e,t,n=2){return $i(e,t,n)}},Na=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];Pa(e),Fa(n,e);let a=e.length;t.forEach(Pa);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,Fa(n,t[e]);let o=Ma.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function Pa(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Fa(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var Ia=class e extends Qi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},La=class e extends ri{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Gr(p,3)),this.setAttribute(`normal`,new Gr(m,3)),this.setAttribute(`uv`,new Gr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Ra=class e extends ri{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new V,p=new B;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new Gr(s,3)),this.setAttribute(`normal`,new Gr(c,3)),this.setAttribute(`uv`,new Gr(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};function za(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Va(i))i.isRenderTargetTexture?(R(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Va(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Ba(e){let t={};for(let n=0;n<e.length;n++){let r=za(e[n]);for(let e in r)t[e]=r[e]}return t}function Va(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Ha(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Ua(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:un.workingColorSpace}var Wa={clone:za,merge:Ba},Ga=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ka=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,qa=class extends li{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ga,this.fragmentShader=Ka,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=za(e.uniforms),this.uniformsGroups=Ha(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new U().setHex(r.value);break;case`v2`:this.uniforms[n].value=new B().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new V().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new xn().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new H().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new En().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ja=class extends qa{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Ya=class extends li{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new U(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new U(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new B(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Xa=class extends li{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Dt,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Za=class extends li{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Qa(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function $a(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var eo=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},to=class extends eo{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wt,endingEnd:wt}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Tt:i=e,o=2*t-n;break;case Et:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Tt:a=e,s=2*n-t;break;case Et:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},no=class extends eo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},ro=class extends eo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},io=class extends eo{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=so(n,t,g,y,r);i[p]=ao(x,o,_,b,m)}return i}};function ao(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function oo(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function so(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=ao(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=oo(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var co=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Qa(t,this.TimeBufferType),this.values=Qa(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Qa(e.times,Array),values:Qa(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),$a(e.settings)&&(n.settings={inTangents:Qa(e.settings.inTangents,Array),outTangents:Qa(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ro(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new no(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new to(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new io(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case bt:t=this.InterpolantFactoryMethodDiscrete;break;case xt:t=this.InterpolantFactoryMethodLinear;break;case St:t=this.InterpolantFactoryMethodSmooth;break;case Ct:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return R(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return bt;case this.InterpolantFactoryMethodLinear:return xt;case this.InterpolantFactoryMethodSmooth:return St;case this.InterpolantFactoryMethodBezier:return Ct}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;$a(this.settings)&&(lo(this.settings.inTangents,e),lo(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(z(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(z(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){z(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){z(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Lt(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){z(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===St,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,$a(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function lo(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}co.prototype.ValueTypeName=``,co.prototype.TimeBufferType=Float32Array,co.prototype.ValueBufferType=Float32Array,co.prototype.DefaultInterpolation=xt;var uo=class extends co{constructor(e,t,n){super(e,t,n)}};uo.prototype.ValueTypeName=`bool`,uo.prototype.ValueBufferType=Array,uo.prototype.DefaultInterpolation=bt,uo.prototype.InterpolantFactoryMethodLinear=void 0,uo.prototype.InterpolantFactoryMethodSmooth=void 0;var fo=class extends co{constructor(e,t,n,r){super(e,t,n,r)}};fo.prototype.ValueTypeName=`color`;var po=class extends co{constructor(e,t,n,r){super(e,t,n,r)}};po.prototype.ValueTypeName=`number`;var mo=class extends eo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)nn.slerpFlat(i,0,a,c-o,a,c,s);return i}},ho=class extends co{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new mo(this.times,this.values,this.getValueSize(),e)}};ho.prototype.ValueTypeName=`quaternion`,ho.prototype.InterpolantFactoryMethodSmooth=void 0;var go=class extends co{constructor(e,t,n){super(e,t,n)}};go.prototype.ValueTypeName=`string`,go.prototype.ValueBufferType=Array,go.prototype.DefaultInterpolation=bt,go.prototype.InterpolantFactoryMethodLinear=void 0,go.prototype.InterpolantFactoryMethodSmooth=void 0;var _o=class extends co{constructor(e,t,n,r){super(e,t,n,r)}};_o.prototype.ValueTypeName=`vector`;var vo=class extends $n{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new U(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},yo=class extends vo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy($n.DEFAULT_UP),this.updateMatrix(),this.groundColor=new U(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},bo=new En,xo=new V,So=new V,Co=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new B(512,512),this.mapType=ve,this.map=null,this.mapPass=null,this.matrix=new En,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ui,this._frameExtents=new B(1,1),this._viewportCount=1,this._viewports=[new xn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;xo.setFromMatrixPosition(e.matrixWorld),t.position.copy(xo),So.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(So),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){bo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(bo,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(bo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},wo=new V,To=new nn,Eo=new V,Do=class extends $n{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new En,this.projectionMatrix=new En,this.projectionMatrixInverse=new En,this.coordinateSystem=Ft,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(wo,To,Eo),Eo.x===1&&Eo.y===1&&Eo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(wo,To,Eo.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(wo,To,Eo),Eo.x===1&&Eo.y===1&&Eo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(wo,To,Eo.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Oo=new V,ko=new B,Ao=new B,jo=class extends Do{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Yt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Jt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yt*2*Math.atan(Math.tan(Jt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Oo.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Oo.x,Oo.y).multiplyScalar(-e/Oo.z),Oo.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Oo.x,Oo.y).multiplyScalar(-e/Oo.z)}getViewSize(e,t){return this.getViewBounds(e,ko,Ao),t.subVectors(Ao,ko)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Jt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Mo=class extends Do{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},No=class extends Co{constructor(){super(new Mo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Po=class extends vo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy($n.DEFAULT_UP),this.updateMatrix(),this.target=new $n,this.shadow=new No}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Fo=class extends vo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},Io=-90,Lo=1,Ro=class extends $n{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new jo(Io,Lo,e,t);r.layers=this.layers,this.add(r);let i=new jo(Io,Lo,e,t);i.layers=this.layers,this.add(i);let a=new jo(Io,Lo,e,t);a.layers=this.layers,this.add(a);let o=new jo(Io,Lo,e,t);o.layers=this.layers,this.add(o);let s=new jo(Io,Lo,e,t);s.layers=this.layers,this.add(s);let c=new jo(Io,Lo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},zo=class extends jo{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Bo=`\\[\\]\\.:\\/`,Vo=RegExp(`[\\[\\]\\.:\\/]`,`g`),Ho=`[^\\[\\]\\.:\\/]`,Uo=`[^`+Bo.replace(`\\.`,``)+`]`,Wo=`((?:WC+[\\/:])*)`.replace(`WC`,Ho),Go=`(WCOD+)?`.replace(`WCOD`,Uo),Ko=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Ho),qo=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Ho),Jo=RegExp(`^`+Wo+Go+Ko+qo+`$`),Yo=[`material`,`materials`,`bones`,`map`],Xo=class{constructor(e,t,n){let r=n||Zo.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Zo=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Vo,``)}static parseTrackName(e){let t=Jo.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Yo.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){R(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){z(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){z(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){z(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){z(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){z(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){z(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){z(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;z(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){z(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){z(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Zo.Composite=Xo,Zo.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Zo.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Zo.prototype.GetterByBindingType=[Zo.prototype._getValue_direct,Zo.prototype._getValue_array,Zo.prototype._getValue_arrayElement,Zo.prototype._getValue_toArray],Zo.prototype.SetterByBindingTypeAndVersioning=[[Zo.prototype._setValue_direct,Zo.prototype._setValue_direct_setNeedsUpdate,Zo.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Zo.prototype._setValue_array,Zo.prototype._setValue_array_setNeedsUpdate,Zo.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Zo.prototype._setValue_arrayElement,Zo.prototype._setValue_arrayElement_setNeedsUpdate,Zo.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Zo.prototype._setValue_fromArray,Zo.prototype._setValue_fromArray_setNeedsUpdate,Zo.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],oe=class{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}},oe.prototype.isMatrix2=!0;function Qo(e,t,n,r){let i=$o(r);switch(n){case F:return e*t;case Pe:return e*t/i.components*i.byteLength;case Fe:return e*t/i.components*i.byteLength;case L:return e*t*2/i.components*i.byteLength;case Ie:return e*t*2/i.components*i.byteLength;case je:return e*t*3/i.components*i.byteLength;case Me:return e*t*4/i.components*i.byteLength;case Le:return e*t*4/i.components*i.byteLength;case Re:case ze:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Be:case Ve:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ue:case Ge:return Math.max(e,16)*Math.max(t,8)/4;case He:case We:return Math.max(e,8)*Math.max(t,8)/2;case Ke:case qe:case Ye:case Xe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Je:case Ze:case Qe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case $e:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case et:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case tt:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case nt:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case rt:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case it:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case at:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ot:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case st:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case ct:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case lt:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case ut:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case dt:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case ft:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case pt:case mt:case ht:return Math.ceil(e/4)*Math.ceil(t/4)*16;case gt:case _t:return Math.ceil(e/4)*Math.ceil(t/4)*8;case vt:case yt:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function $o(e){switch(e){case ve:case ye:return{byteLength:1,components:1};case xe:case be:case Te:return{byteLength:2,components:1};case Ee:case De:return{byteLength:2,components:4};case Ce:case Se:case we:return{byteLength:4,components:1};case ke:case Ae:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?R(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function es(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function ts(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var W={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},G={common:{diffuse:{value:new U(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new H},alphaMap:{value:null},alphaMapTransform:{value:new H},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new H}},envmap:{envMap:{value:null},envMapRotation:{value:new H},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new H}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new H}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new H},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new H},normalScale:{value:new B(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new H},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new H}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new H}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new H}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new U(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new V},probesMax:{value:new V},probesResolution:{value:new V}},points:{diffuse:{value:new U(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new H},alphaTest:{value:0},uvTransform:{value:new H}},sprite:{diffuse:{value:new U(16777215)},opacity:{value:1},center:{value:new B(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new H},alphaMap:{value:null},alphaMapTransform:{value:new H},alphaTest:{value:0}}},ns={basic:{uniforms:Ba([G.common,G.specularmap,G.envmap,G.aomap,G.lightmap,G.fog]),vertexShader:W.meshbasic_vert,fragmentShader:W.meshbasic_frag},lambert:{uniforms:Ba([G.common,G.specularmap,G.envmap,G.aomap,G.lightmap,G.emissivemap,G.bumpmap,G.normalmap,G.displacementmap,G.fog,G.lights,{emissive:{value:new U(0)},envMapIntensity:{value:1}}]),vertexShader:W.meshlambert_vert,fragmentShader:W.meshlambert_frag},phong:{uniforms:Ba([G.common,G.specularmap,G.envmap,G.aomap,G.lightmap,G.emissivemap,G.bumpmap,G.normalmap,G.displacementmap,G.fog,G.lights,{emissive:{value:new U(0)},specular:{value:new U(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:W.meshphong_vert,fragmentShader:W.meshphong_frag},standard:{uniforms:Ba([G.common,G.envmap,G.aomap,G.lightmap,G.emissivemap,G.bumpmap,G.normalmap,G.displacementmap,G.roughnessmap,G.metalnessmap,G.fog,G.lights,{emissive:{value:new U(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:W.meshphysical_vert,fragmentShader:W.meshphysical_frag},toon:{uniforms:Ba([G.common,G.aomap,G.lightmap,G.emissivemap,G.bumpmap,G.normalmap,G.displacementmap,G.gradientmap,G.fog,G.lights,{emissive:{value:new U(0)}}]),vertexShader:W.meshtoon_vert,fragmentShader:W.meshtoon_frag},matcap:{uniforms:Ba([G.common,G.bumpmap,G.normalmap,G.displacementmap,G.fog,{matcap:{value:null}}]),vertexShader:W.meshmatcap_vert,fragmentShader:W.meshmatcap_frag},points:{uniforms:Ba([G.points,G.fog]),vertexShader:W.points_vert,fragmentShader:W.points_frag},dashed:{uniforms:Ba([G.common,G.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:W.linedashed_vert,fragmentShader:W.linedashed_frag},depth:{uniforms:Ba([G.common,G.displacementmap]),vertexShader:W.depth_vert,fragmentShader:W.depth_frag},normal:{uniforms:Ba([G.common,G.bumpmap,G.normalmap,G.displacementmap,{opacity:{value:1}}]),vertexShader:W.meshnormal_vert,fragmentShader:W.meshnormal_frag},sprite:{uniforms:Ba([G.sprite,G.fog]),vertexShader:W.sprite_vert,fragmentShader:W.sprite_frag},background:{uniforms:{uvTransform:{value:new H},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:W.background_vert,fragmentShader:W.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new H}},vertexShader:W.backgroundCube_vert,fragmentShader:W.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:W.cube_vert,fragmentShader:W.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:W.equirect_vert,fragmentShader:W.equirect_frag},distance:{uniforms:Ba([G.common,G.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:W.distance_vert,fragmentShader:W.distance_frag},shadow:{uniforms:Ba([G.lights,G.fog,{color:{value:new U(0)},opacity:{value:1}}]),vertexShader:W.shadow_vert,fragmentShader:W.shadow_frag}};ns.physical={uniforms:Ba([ns.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new H},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new H},clearcoatNormalScale:{value:new B(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new H},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new H},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new H},sheen:{value:0},sheenColor:{value:new U(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new H},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new H},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new H},transmissionSamplerSize:{value:new B},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new H},attenuationDistance:{value:0},attenuationColor:{value:new U(0)},specularColor:{value:new U(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new H},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new H},anisotropyVector:{value:new B},anisotropyMap:{value:null},anisotropyMapTransform:{value:new H}}]),vertexShader:W.meshphysical_vert,fragmentShader:W.meshphysical_frag};var rs={r:0,b:0,g:0},is=new En,as=new H;as.set(-1,0,0,0,1,0,0,0,1);function os(e,t,n,r,i,a){let o=new U(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Di(new Yi(1,1,1),new qa({name:`BackgroundCubeMaterial`,uniforms:za(ns.backgroundCube.uniforms),vertexShader:ns.backgroundCube.vertexShader,fragmentShader:ns.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(is.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(as),l.material.toneMapped=un.getTransfer(i.colorSpace)!==jt,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Di(new La(2,2),new qa({name:`BackgroundMaterial`,uniforms:za(ns.background.uniforms),vertexShader:ns.background.vertexShader,fragmentShader:ns.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=un.getTransfer(i.colorSpace)!==jt,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(rs,Ua(e)),n.buffers.color.setClear(rs.r,rs.g,rs.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function ss(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function cs(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function ls(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(R(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&R(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function us(e){let t=this,n=null,r=0,i=!1,a=!1,o=new si,s=new H,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var ds=4,fs=6,ps=20,ms=256,hs=new Mo,gs=new U,_s=null,vs=0,ys=0,bs=!1,xs=new V,Ss=new V,Cs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=xs}=i;_s=this._renderer.getRenderTarget(),vs=this._renderer.getActiveCubeFace(),ys=this._renderer.getActiveMipmapLevel(),bs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=As(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ks(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(_s,vs,ys),this._renderer.xr.enabled=bs,e.scissorTest=!1,Es(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_s=this._renderer.getRenderTarget(),vs=this._renderer.getActiveCubeFace(),ys=this._renderer.getActiveMipmapLevel(),bs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:he,minFilter:he,generateMipmaps:!1,type:Te,format:Me,colorSpace:kt,depthBuffer:!1},r=Ts(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ts(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ws(r)),this._blurMaterial=Os(r,e,t),this._ggxMaterial=Ds(r,e,t)}return r}_compileMaterial(e){let t=new Di(new ri,e);this._renderer.compile(t,hs)}_sceneToCubeUV(e,t,n,r,i){let a=new jo(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(gs),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Di(new Yi,new hi({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(gs),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Es(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=As()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ks());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Es(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,hs)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-ds?n-d+ds:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Es(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,hs),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Es(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,hs)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Es(t,3*l*(r>this._lodMax-ds?r-this._lodMax+ds:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,hs)}};function ws(e){let t=[],n=[],r=e,i=e-ds+1+fs;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Ss.set(1,r,n):e===1?Ss.set(-n,1,-r):e===2?Ss.set(-n,r,1):e===3?Ss.set(-1,r,-n):e===4?Ss.set(-n,-1,r):Ss.set(n,r,-1),Ss.toArray(l,(e*6+t)*3)}}let u=new ri;u.setAttribute(`position`,new Hr(c,3)),u.setAttribute(`outputDirection`,new Hr(l,3)),n.push(new Di(u,null)),r>ds&&r--}return{lodMeshes:n,sizeLods:t}}function Ts(e,t,n){let r=new Cn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Es(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Ds(e,t,n){return new qa({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:ms,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:js(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Os(e,t,n){return new qa({name:`SphericalGaussianBlur`,defines:{SAMPLES:ps,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:js(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function ks(){return new qa({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:js(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function As(){return new qa({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:js(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function js(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ms=class extends Cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Wi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Yi(5,5,5),i=new qa({name:`CubemapFromEquirect`,uniforms:za(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Di(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=he),new Ro(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Ns(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Ms(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Cs(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Cs(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Ps(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Ut(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Fs(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Wr:Ur)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Is(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Ls(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:z(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Rs(e,t,n){let r=new WeakMap,i=new xn;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new wn(h,p,m,u);g.type=we,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new B(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function zs(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Bs={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Vs(e,t,n,r,i,a){let o=new Cn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new ri;l.setAttribute(`position`,new Gr([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new Gr([0,2,0,0,2,0],2));let u=new Ja({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Di(l,u),f=new Mo(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new Cn(t,n,{type:Te,depthBuffer:!1,stencilBuffer:!1}),c=new Cn(t,n,{type:Te,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},un.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Bs[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Hs=new bn,Us=new Ki(1,1),Ws=new wn,Gs=new Tn,Ks=new Wi,qs=[],Js=[],Ys=new Float32Array(16),Xs=new Float32Array(9),Zs=new Float32Array(4);function Qs(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=qs[i];if(a===void 0&&(a=new Float32Array(i),qs[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function $s(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function ec(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function tc(e,t){let n=Js[t];n===void 0&&(n=new Int32Array(t),Js[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function nc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function rc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if($s(n,t))return;e.uniform2fv(this.addr,t),ec(n,t)}}function ic(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if($s(n,t))return;e.uniform3fv(this.addr,t),ec(n,t)}}function ac(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if($s(n,t))return;e.uniform4fv(this.addr,t),ec(n,t)}}function oc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if($s(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),ec(n,t)}else{if($s(n,r))return;Zs.set(r),e.uniformMatrix2fv(this.addr,!1,Zs),ec(n,r)}}function sc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if($s(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),ec(n,t)}else{if($s(n,r))return;Xs.set(r),e.uniformMatrix3fv(this.addr,!1,Xs),ec(n,r)}}function cc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if($s(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),ec(n,t)}else{if($s(n,r))return;Ys.set(r),e.uniformMatrix4fv(this.addr,!1,Ys),ec(n,r)}}function lc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function uc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if($s(n,t))return;e.uniform2iv(this.addr,t),ec(n,t)}}function dc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if($s(n,t))return;e.uniform3iv(this.addr,t),ec(n,t)}}function fc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if($s(n,t))return;e.uniform4iv(this.addr,t),ec(n,t)}}function pc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function mc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if($s(n,t))return;e.uniform2uiv(this.addr,t),ec(n,t)}}function hc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if($s(n,t))return;e.uniform3uiv(this.addr,t),ec(n,t)}}function gc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if($s(n,t))return;e.uniform4uiv(this.addr,t),ec(n,t)}}function _c(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Us.compareFunction=n.isReversedDepthBuffer()?518:515,a=Us):a=Hs,n.setTexture2D(t||a,i)}function vc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Gs,i)}function yc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Ks,i)}function bc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Ws,i)}function xc(e){switch(e){case 5126:return nc;case 35664:return rc;case 35665:return ic;case 35666:return ac;case 35674:return oc;case 35675:return sc;case 35676:return cc;case 5124:case 35670:return lc;case 35667:case 35671:return uc;case 35668:case 35672:return dc;case 35669:case 35673:return fc;case 5125:return pc;case 36294:return mc;case 36295:return hc;case 36296:return gc;case 35678:case 36198:case 36298:case 36306:case 35682:return _c;case 35679:case 36299:case 36307:return vc;case 35680:case 36300:case 36308:case 36293:return yc;case 36289:case 36303:case 36311:case 36292:return bc}}function Sc(e,t){e.uniform1fv(this.addr,t)}function Cc(e,t){let n=Qs(t,this.size,2);e.uniform2fv(this.addr,n)}function wc(e,t){let n=Qs(t,this.size,3);e.uniform3fv(this.addr,n)}function Tc(e,t){let n=Qs(t,this.size,4);e.uniform4fv(this.addr,n)}function Ec(e,t){let n=Qs(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Dc(e,t){let n=Qs(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Oc(e,t){let n=Qs(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function kc(e,t){e.uniform1iv(this.addr,t)}function Ac(e,t){e.uniform2iv(this.addr,t)}function jc(e,t){e.uniform3iv(this.addr,t)}function Mc(e,t){e.uniform4iv(this.addr,t)}function Nc(e,t){e.uniform1uiv(this.addr,t)}function Pc(e,t){e.uniform2uiv(this.addr,t)}function Fc(e,t){e.uniform3uiv(this.addr,t)}function Ic(e,t){e.uniform4uiv(this.addr,t)}function Lc(e,t,n){let r=this.cache,i=t.length,a=tc(n,i);$s(r,a)||(e.uniform1iv(this.addr,a),ec(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Us:Hs;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Rc(e,t,n){let r=this.cache,i=t.length,a=tc(n,i);$s(r,a)||(e.uniform1iv(this.addr,a),ec(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Gs,a[e])}function zc(e,t,n){let r=this.cache,i=t.length,a=tc(n,i);$s(r,a)||(e.uniform1iv(this.addr,a),ec(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Ks,a[e])}function Bc(e,t,n){let r=this.cache,i=t.length,a=tc(n,i);$s(r,a)||(e.uniform1iv(this.addr,a),ec(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Ws,a[e])}function Vc(e){switch(e){case 5126:return Sc;case 35664:return Cc;case 35665:return wc;case 35666:return Tc;case 35674:return Ec;case 35675:return Dc;case 35676:return Oc;case 5124:case 35670:return kc;case 35667:case 35671:return Ac;case 35668:case 35672:return jc;case 35669:case 35673:return Mc;case 5125:return Nc;case 36294:return Pc;case 36295:return Fc;case 36296:return Ic;case 35678:case 36198:case 36298:case 36306:case 35682:return Lc;case 35679:case 36299:case 36307:return Rc;case 35680:case 36300:case 36308:case 36293:return zc;case 36289:case 36303:case 36311:case 36292:return Bc}}var Hc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=xc(t.type)}},Uc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Vc(t.type)}},Wc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Gc=/(\w+)(\])?(\[|\.)?/g;function Kc(e,t){e.seq.push(t),e.map[t.id]=t}function qc(e,t,n){let r=e.name,i=r.length;for(Gc.lastIndex=0;;){let a=Gc.exec(r),o=Gc.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Kc(n,l===void 0?new Hc(s,e,t):new Uc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Wc(s),Kc(n,e)),n=e}}}var Jc=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);qc(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Yc(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Xc=37297,Zc=0;function Qc(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var $c=new H;function el(e){un._getMatrix($c,un.workingColorSpace,e);let t=`mat3( ${$c.elements.map(e=>e.toFixed(4))} )`;switch(un.getTransfer(e)){case At:return[t,`LinearTransferOETF`];case jt:return[t,`sRGBTransferOETF`];default:return R(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function tl(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Qc(e.getShaderSource(t),r)}return i}function nl(e,t){let n=el(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var rl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function il(e,t){let n=rl[t];return n===void 0?(R(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var al=new V;function ol(){return un.getLuminanceCoefficients(al),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${al.x.toFixed(4)}, ${al.y.toFixed(4)}, ${al.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function sl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(ul).join(`
`)}function cl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function ll(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function ul(e){return e!==``}function dl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function fl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var pl=/^[ \t]*#include +<([\w\d./]+)>/gm;function ml(e){return e.replace(pl,gl)}var hl=new Map;function gl(e,t){let n=W[t];if(n===void 0){let e=hl.get(t);if(e!==void 0)n=W[e],R(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return ml(n)}var _l=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vl(e){return e.replace(_l,yl)}function yl(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function bl(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var xl={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Sl(e){return xl[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Cl={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function wl(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Cl[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Tl={302:`ENVMAP_MODE_REFRACTION`};function El(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Tl[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Dl={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Ol(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Dl[e.combine]||`ENVMAP_BLENDING_NONE`}function kl(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Al(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Sl(n),l=wl(n),u=El(n),d=Ol(n),f=kl(n),p=sl(n),m=cl(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(ul).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(ul).join(`
`),_.length>0&&(_+=`
`)):(g=[bl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(ul).join(`
`),_=[bl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:W.tonemapping_pars_fragment,n.toneMapping===0?``:il(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,W.colorspace_pars_fragment,nl(`linearToOutputTexel`,n.outputColorSpace),ol(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(ul).join(`
`)),o=ml(o),o=dl(o,n),o=fl(o,n),s=ml(s),s=dl(s,n),s=fl(s,n),o=vl(o),s=vl(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Yc(i,i.VERTEX_SHADER,y),S=Yc(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=tl(i,x,`vertex`),n=tl(i,S,`fragment`);z(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):R(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Jc(i,h),T=ll(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Xc)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Zc++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var jl=0,Ml=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Nl(e),t.set(e,n)),n}},Nl=class{constructor(e){this.id=jl++,this.code=e,this.usedTimes=0}};function Pl(e){return e===1030||e===37490||e===36285}function Fl(e,t,n,r,i,a){let o=new Ln,s=new Ml,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&R(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=ns[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,ee=h.isBatchedMesh===!0,te=!!i.map,ne=!!i.matcap,re=!!x,ie=!!i.aoMap,ae=!!i.lightMap,oe=!!i.bumpMap&&i.wireframe===!1,P=!!i.normalMap,se=!!i.displacementMap,ce=!!i.emissiveMap,le=!!i.metalnessMap,ue=!!i.roughnessMap,de=i.anisotropy>0,fe=i.clearcoat>0,pe=i.dispersion>0,me=i.retroreflectivity>0,he=i.iridescence>0,ge=i.sheen>0,_e=i.transmission>0,ve=de&&!!i.anisotropyMap,ye=fe&&!!i.clearcoatMap,be=fe&&!!i.clearcoatNormalMap,xe=fe&&!!i.clearcoatRoughnessMap,Se=he&&!!i.iridescenceMap,Ce=he&&!!i.iridescenceThicknessMap,we=ge&&!!i.sheenColorMap,Te=ge&&!!i.sheenRoughnessMap,Ee=!!i.specularMap,De=!!i.specularColorMap,Oe=!!i.specularIntensityMap,ke=_e&&!!i.transmissionMap,Ae=_e&&!!i.thicknessMap,F=!!i.gradientMap,je=!!i.alphaMap,Me=i.alphaTest>0,Ne=!!i.alphaHash,I=!!i.extensions,Pe=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Pe=e.toneMapping);let Fe={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:ee,batchingColor:ee&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:un.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:te,matcap:ne,envMap:re,envMapMode:re&&x.mapping,envMapCubeUVHeight:S,aoMap:ie,lightMap:ae,bumpMap:oe,normalMap:P,displacementMap:se,emissiveMap:ce,normalMapObjectSpace:P&&i.normalMapType===1,normalMapTangentSpace:P&&i.normalMapType===0,packedNormalMap:P&&i.normalMapType===0&&Pl(i.normalMap.format),metalnessMap:le,roughnessMap:ue,anisotropy:de,anisotropyMap:ve,clearcoat:fe,clearcoatMap:ye,clearcoatNormalMap:be,clearcoatRoughnessMap:xe,dispersion:pe,retroreflection:me,iridescence:he,iridescenceMap:Se,iridescenceThicknessMap:Ce,sheen:ge,sheenColorMap:we,sheenRoughnessMap:Te,specularMap:Ee,specularColorMap:De,specularIntensityMap:Oe,transmission:_e,transmissionMap:ke,thicknessMap:Ae,gradientMap:F,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:je,alphaTest:Me,alphaHash:Ne,combine:i.combine,mapUv:te&&m(i.map.channel),aoMapUv:ie&&m(i.aoMap.channel),lightMapUv:ae&&m(i.lightMap.channel),bumpMapUv:oe&&m(i.bumpMap.channel),normalMapUv:P&&m(i.normalMap.channel),displacementMapUv:se&&m(i.displacementMap.channel),emissiveMapUv:ce&&m(i.emissiveMap.channel),metalnessMapUv:le&&m(i.metalnessMap.channel),roughnessMapUv:ue&&m(i.roughnessMap.channel),anisotropyMapUv:ve&&m(i.anisotropyMap.channel),clearcoatMapUv:ye&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:be&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:we&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Te&&m(i.sheenRoughnessMap.channel),specularMapUv:Ee&&m(i.specularMap.channel),specularColorMapUv:De&&m(i.specularColorMap.channel),specularIntensityMapUv:Oe&&m(i.specularIntensityMap.channel),transmissionMapUv:ke&&m(i.transmissionMap.channel),thicknessMapUv:Ae&&m(i.thicknessMap.channel),alphaMapUv:je&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(P||de),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(te||je),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&P===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Pe,decodeVideoTexture:te&&i.map.isVideoTexture===!0&&un.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ce&&i.emissiveMap.isVideoTexture===!0&&un.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:I&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(I&&i.extensions.multiDraw===!0||ee)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Fe.vertexUv1s=c.has(1),Fe.vertexUv2s=c.has(2),Fe.vertexUv3s=c.has(3),c.clear(),Fe}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=ns[t];n=Wa.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Al(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Il(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Ll(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Rl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function zl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Ll),r.length>1&&r.sort(t||Rl),i.length>1&&i.sort(t||Rl)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Bl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new zl,e.set(t,[i])):n>=r.length?(i=new zl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Vl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new V,color:new U};break;case`SpotLight`:n={position:new V,direction:new V,color:new U,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new V,color:new U,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new V,skyColor:new U,groundColor:new U};break;case`RectAreaLight`:n={color:new U,position:new V,halfWidth:new V,halfHeight:new V}}return e[t.id]=n,n}}}function Hl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Ul=0;function Wl(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Gl(e){let t=new Vl,n=Hl(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new V);let i=new V,a=new En,o=new En;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Wl);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=G.LTC_FLOAT_1,r.rectAreaLTC2=G.LTC_FLOAT_2):(r.rectAreaLTC1=G.LTC_HALF_1,r.rectAreaLTC2=G.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Ul++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Kl(e){let t=new Gl(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function ql(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Kl(e),t.set(n,[a])):r>=i.length?(a=new Kl(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Jl=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Yl=`uniform sampler2D shadow_pass;
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
}`,Xl=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],Zl=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],Ql=new En,$l=new V,eu=new V;function tu(e,t,n){let r=new Ui,i=new B,a=new B,o=new xn,s=new Xa,c=new Za,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new qa({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new B},radius:{value:4}},vertexShader:Jl,fragmentShader:Yl}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new ri;m.setAttribute(`position`,new Hr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Di(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(R(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){R(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){R(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Cn(i.x,i.y,{format:L,type:Te,minFilter:he,magFilter:he,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Ki(i.x,i.y,we),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Ne,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=fe,d.map.depthTexture.magFilter=fe}else l.isPointLight?(d.map=new Ms(i.x),d.map.depthTexture=new qi(i.x,Ce)):(d.map=new Cn(i.x,i.y),d.map.depthTexture=new Ki(i.x,i.y,Ce)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Ne,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=he,d.map.depthTexture.magFilter=he):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=fe,d.map.depthTexture.magFilter=fe);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),$l.setFromMatrixPosition(l.matrixWorld),e.position.copy($l),eu.copy(e.position),eu.add(Xl[t]),e.up.copy(Zl[t]),e.lookAt(eu),e.updateMatrixWorld(),n.makeTranslation(-$l.x,-$l.y,-$l.z),Ql.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Ql,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new Cn(i.x,i.y,{format:L,type:Te}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function nu(e,t){function n(){let t=!1,n=new xn,r=null,i=new xn(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?le(e.DEPTH_TEST):ue(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Gt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?le(e.STENCIL_TEST):ue(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new U(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,ee=0,te=e.getParameter(e.VERSION);te.indexOf(`WebGL`)===-1?te.indexOf(`OpenGL ES`)!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),N=ee>=2):(ee=parseFloat(/^WebGL (\d)/.exec(te)[1]),N=ee>=1);let ne=null,re={},ie=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),oe=new xn().fromArray(ie),P=new xn().fromArray(ae);function se(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ce={};ce[e.TEXTURE_2D]=se(e.TEXTURE_2D,e.TEXTURE_2D,1),ce[e.TEXTURE_CUBE_MAP]=se(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[e.TEXTURE_2D_ARRAY]=se(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ce[e.TEXTURE_3D]=se(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),le(e.DEPTH_TEST),o.setFunc(3),ve(!1),ye(1),le(e.CULL_FACE),ge(0);function le(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ue(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function de(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function fe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function pe(t){return h!==t&&(e.useProgram(t),h=t,!0)}let me={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};me[103]=e.MIN,me[104]=e.MAX;let he={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ge(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(ue(e.BLEND),g=!1);return}if(g===!1&&(le(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:z(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:z(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:z(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:z(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a=a||n,o=o||r,s=s||i,(n!==v||a!==x)&&(e.blendEquationSeparate(me[n],me[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(he[r],he[i],he[o],he[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function _e(t,n){t.side===2?ue(e.CULL_FACE):le(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ve(r),t.blending===1&&t.transparent===!1?ge(0):ge(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),xe(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?le(e.SAMPLE_ALPHA_TO_COVERAGE):ue(e.SAMPLE_ALPHA_TO_COVERAGE)}function ve(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ye(t){t===0?ue(e.CULL_FACE):(le(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function be(t){t!==k&&(N&&e.lineWidth(t),k=t)}function xe(t,n,r){t?(le(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ue(e.POLYGON_OFFSET_FILL)}function Se(t){t?le(e.SCISSOR_TEST):ue(e.SCISSOR_TEST)}function Ce(t){t===void 0&&(t=e.TEXTURE0+M-1),ne!==t&&(e.activeTexture(t),ne=t)}function we(t,n,r){r===void 0&&(r=ne===null?e.TEXTURE0+M-1:ne);let i=re[r];i===void 0&&(i={type:void 0,texture:void 0},re[r]=i),(i.type!==t||i.texture!==n)&&(ne!==r&&(e.activeTexture(r),ne=r),e.bindTexture(t,n||ce[t]),i.type=t,i.texture=n)}function Te(){let t=re[ne];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ee(){try{e.compressedTexImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function De(){try{e.compressedTexImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Oe(){try{e.texSubImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function ke(){try{e.texSubImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ae(){try{e.compressedTexSubImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function F(){try{e.compressedTexSubImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function je(){try{e.texStorage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Me(){try{e.texStorage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ne(){try{e.texImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function I(){try{e.texImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Pe(t){return d[t]===void 0?e.getParameter(t):d[t]}function Fe(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function L(t){oe.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),oe.copy(t))}function Ie(t){P.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),P.copy(t))}function Le(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Re(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function ze(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ne=null,re={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new U(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,oe.set(0,0,e.canvas.width,e.canvas.height),P.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:le,disable:ue,bindFramebuffer:de,drawBuffers:fe,useProgram:pe,setBlending:ge,setMaterial:_e,setFlipSided:ve,setCullFace:ye,setLineWidth:be,setPolygonOffset:xe,setScissorTest:Se,activeTexture:Ce,bindTexture:we,unbindTexture:Te,compressedTexImage2D:Ee,compressedTexImage3D:De,texImage2D:Ne,texImage3D:I,pixelStorei:Fe,getParameter:Pe,updateUBOMapping:Le,uniformBlockBinding:Re,texStorage2D:je,texStorage3D:Me,texSubImage2D:Oe,texSubImage3D:ke,compressedTexSubImage2D:Ae,compressedTexSubImage3D:F,scissor:L,viewport:Ie,reset:ze}}function ru(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new B,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):Rt(`canvas`)}function g(e,t,n){let r=1,i=Pe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),R(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&R(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];R(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||R(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?At:un.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,R(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function j(e){O=e}function M(){let e=O;return e>=i.maxTextures&&R(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function N(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ee(t,i){let a=r.get(t);if(t.isVideoTexture&&Me(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)R(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)R(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ye(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function te(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){ye(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function ne(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){ye(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function re(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){be(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ie={[le]:e.REPEAT,[ue]:e.CLAMP_TO_EDGE,[de]:e.MIRRORED_REPEAT},ae={[fe]:e.NEAREST,[pe]:e.NEAREST_MIPMAP_NEAREST,[me]:e.NEAREST_MIPMAP_LINEAR,[he]:e.LINEAR,[ge]:e.LINEAR_MIPMAP_NEAREST,[_e]:e.LINEAR_MIPMAP_LINEAR},oe={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function P(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&R(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ie[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ie[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ie[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ae[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ae[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,oe[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function se(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=N(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ce(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ve(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ce(n.start,r.width,4),c=ce(t.start,r.width,4);n.start<=i+1&&a===c&&ce(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function ye(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=se(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=un.getPrimaries(un.workingColorSpace),r=o.colorSpace===``?null:un.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Ne(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);P(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===I,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&ve(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=Qo(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=Qo(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=Pe(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=Pe(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function be(t,o,s){if(o.image.length!==6)return;let c=se(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=un.getPrimaries(un.workingColorSpace),r=o.colorSpace===``?null:un.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Ne(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);P(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=Pe(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function xe(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),je(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,F(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Se(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;je(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,F(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,F(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);je(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,F(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,F(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ce(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),P(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else ee(i.depthTexture,0);let u=l.__webglTexture,d=F(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)je(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)je(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function we(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)Ce(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?Ce(i.__webglFramebuffer[0],t,0):Ce(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),Se(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),Se(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Te(t,n,i){let a=r.get(t);n!==void 0&&xe(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&we(t)}function Ee(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&je(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=F(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),Se(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),P(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)xe(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else xe(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),P(c,a),xe(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),P(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)xe(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else xe(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&we(t)}function De(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let Oe=[],ke=[];function Ae(t){if(t.samples>0){if(je(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Oe.length=0,ke.length=0,Oe.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(Oe.push(l),ke.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,ke)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Oe))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function F(e){return Math.min(i.maxSamples,e.samples)}function je(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Me(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Ne(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(un.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&R(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):z(`WebGLTextures: Unsupported texture color space:`,n)),t}function Pe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=M,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=j,this.setTexture2D=ee,this.setTexture2DArray=te,this.setTexture3D=ne,this.setTextureCube=re,this.rebindTextures=Te,this.setupRenderTarget=Ee,this.updateRenderTargetMipmap=De,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=je,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function iu(e,t){function n(n,r=``){let i,a=un.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var au=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ou=`
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

}`,su=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ji(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new qa({vertexShader:au,fragmentShader:ou,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Di(new La(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},cu=class extends Kt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new su,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new B,C=null,w=null,T=new jo;T.viewport=new xn;let E=new jo;E.viewport=new xn;let D=[T,E],O=new zo,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new nr,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new nr,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new nr,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function M(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,M),r.removeEventListener(`inputsourceschange`,N);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,P.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&R(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&R(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,M),r.addEventListener(`inputsourceschange`,N),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?I:Ne,a=_.stencil?Oe:Ce);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Cn(d.textureWidth,d.textureHeight,{format:Me,type:ve,depthTexture:new Ki(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Cn(f.framebufferWidth,f.framebufferHeight,{format:Me,type:ve,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),P.setContext(r),P.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function N(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let ee=new V,te=new V;function ne(e,t,n){ee.setFromMatrixPosition(t.matrixWorld),te.setFromMatrixPosition(n.matrixWorld);let r=ee.distanceTo(te),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function re(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;re(O,i);for(let e=0;e<a.length;e++)re(a[e],i);a.length===2?ne(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),ie(e,O,i)};function ie(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Yt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let ae=null;function oe(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new jo,o.layers.enable(n),o.viewport=new xn,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Ji,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ae&&ae(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let P=new es;P.setAnimationLoop(oe),this.setAnimationLoop=function(e){ae=e},this.dispose=function(){}}},lu=new En,uu=new H;uu.set(-1,0,0,0,1,0,0,0,1);function du(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Ua(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(lu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(uu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function fu(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return z(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?R(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):R(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var pu=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),mu=null;function hu(){return mu===null&&(mu=new Ai(pu,16,16,L,Te),mu.name=`DFG_LUT`,mu.minFilter=he,mu.magFilter=he,mu.wrapS=ue,mu.wrapT=ue,mu.generateMipmaps=!1,mu.needsUpdate=!0),mu}var gu=class{constructor(e={}){let{canvas:t=zt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=ve}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Le,Ie,Fe]),g=new Set([ve,Ce,xe,Oe,Ee,De]),_=new Uint32Array(4),v=new Int32Array(4),y=new V,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=Ot;let j=0,M=0,N=null,ee=-1,te=null,ne=new xn,re=new xn,ie=null,ae=new U(0),oe=0,P=t.width,se=t.height,ce=1,le=null,ue=null,de=new xn(0,0,P,se),fe=new xn(0,0,P,se),pe=!1,me=new Ui,he=!1,ge=!1,ye=new En,be=new V,Se=new xn,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ke=!1;function Ae(){return N===null?ce:1}let F=n;function je(e,n){return t.getContext(e,n)}let Me,Ne,I,Pe,L,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e,et,tt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,it,!1),t.addEventListener(`webglcontextrestored`,at,!1),t.addEventListener(`webglcontextcreationerror`,ot,!1),F===null){let t=`webgl2`;if(F=je(t,e),F===null)throw je(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}nt()}catch(e){throw t.removeEventListener(`webglcontextlost`,it,!1),t.removeEventListener(`webglcontextrestored`,at,!1),t.removeEventListener(`webglcontextcreationerror`,ot,!1),z(`WebGLRenderer: `+e.message),e}function nt(){Me=new Ps(F),Me.init(),$e=new iu(F,Me),Ne=new ls(F,Me,e,$e),I=new nu(F,Me),Ne.reversedDepthBuffer&&d&&I.buffers.depth.setReversed(!0),O=F.createFramebuffer(),k=F.createFramebuffer(),A=F.createFramebuffer(),Pe=new Ls(F),L=new Il,Re=new ru(F,Me,I,L,Ne,$e,Pe),ze=new Ns(T),Be=new ts(F),et=new ss(F,Be),Ve=new Fs(F,Be,Pe,et),He=new zs(F,Ve,Be,et,Pe),Xe=new Rs(F,Ne,Re),qe=new us(L),Ue=new Fl(T,ze,Me,Ne,et,qe),We=new du(T,L),Ge=new Bl,Ke=new ql(Me),Ye=new os(T,ze,I,He,p,s),Je=new tu(T,He,Ne),tt=new fu(F,Pe,Ne,I),Ze=new cs(F,Me,Pe),Qe=new Is(F,Me,Pe),Pe.programs=Ue.programs,T.capabilities=Ne,T.extensions=Me,T.properties=L,T.renderLists=Ge,T.shadowMap=Je,T.state=I,T.info=Pe}m!==1009&&(w=new Vs(m,t.width,t.height,o,r,i));let rt=new cu(T,F);this.xr=rt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let e=Me.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Me.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(e){e!==void 0&&(ce=e,this.setSize(P,se,!1))},this.getSize=function(e){return e.set(P,se)},this.setSize=function(e,n,r=!0){if(rt.isPresenting){R(`WebGLRenderer: Can't change size while VR device is presenting.`);return}P=e,se=n,t.width=Math.floor(e*ce),t.height=Math.floor(n*ce),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(P*ce,se*ce).floor()},this.setDrawingBufferSize=function(e,n,r){P=e,se=n,ce=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){z(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){R(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(ne)},this.getViewport=function(e){return e.copy(de)},this.setViewport=function(e,t,n,r){e.isVector4?de.set(e.x,e.y,e.z,e.w):de.set(e,t,n,r),I.viewport(ne.copy(de).multiplyScalar(ce).round())},this.getScissor=function(e){return e.copy(fe)},this.setScissor=function(e,t,n,r){e.isVector4?fe.set(e.x,e.y,e.z,e.w):fe.set(e,t,n,r),I.scissor(re.copy(fe).multiplyScalar(ce).round())},this.getScissorTest=function(){return pe},this.setScissorTest=function(e){I.setScissorTest(pe=e)},this.setOpaqueSort=function(e){le=e},this.setTransparentSort=function(e){ue=e},this.getClearColor=function(e){return e.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=Ye.getClearColor(),r=Ye.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,F.clearBufferuiv(F.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,F.clearBufferiv(F.COLOR,0,v))}else r|=F.COLOR_BUFFER_BIT}t&&(r|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&F.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,it,!1),t.removeEventListener(`webglcontextrestored`,at,!1),t.removeEventListener(`webglcontextcreationerror`,ot,!1),Ye.dispose(),Ge.dispose(),Ke.dispose(),L.dispose(),ze.dispose(),He.dispose(),et.dispose(),tt.dispose(),Ue.dispose(),rt.dispose(),rt.removeEventListener(`sessionstart`,pt),rt.removeEventListener(`sessionend`,mt),ht.stop()};function it(e){e.preventDefault(),Vt(`WebGLRenderer: Context Lost.`),E=!0}function at(){Vt(`WebGLRenderer: Context Restored.`),E=!1;let e=Pe.autoReset,t=Je.enabled,n=Je.autoUpdate,r=Je.needsUpdate,i=Je.type;nt(),Pe.autoReset=e,Je.enabled=t,Je.autoUpdate=n,Je.needsUpdate=r,Je.type=i}function ot(e){z(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function st(e){let t=e.target;t.removeEventListener(`dispose`,st),ct(t)}function ct(e){lt(e),L.remove(e)}function lt(e){let t=L.get(e).programs;t!==void 0&&(t.forEach(function(e){Ue.releaseProgram(e)}),e.isShaderMaterial&&Ue.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=we);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Tt(e,t,n,r,i);I.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ve.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;et.setup(i,r,s,n,c);let h,g=Ze;if(c!==null&&(h=Be.get(c),g=Qe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(I.setLineWidth(r.wireframeLinewidth*Ae()),g.setMode(F.LINES)):g.setMode(F.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),I.setLineWidth(e*Ae()),i.isLineSegments?g.setMode(F.LINES):i.isLineLoop?g.setMode(F.LINE_LOOP):g.setMode(F.LINE_STRIP)}else i.isPoints?g.setMode(F.POINTS):i.isSprite&&g.setMode(F.TRIANGLES);if(i.isBatchedMesh){if(Me.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Be.get(c).bytesPerElement:1,o=L.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(F,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ut(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),he===!0&&qe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,xt(e,t,r),e.side=0,e.needsUpdate=!0,xt(e,t,r),e.side=2):xt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Ke.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),ge=this.localClippingEnabled,he=qe.init(this.clippingPlanes,ge),he===!0&&qe.setGlobalState(this.clippingPlanes,t),D!==null&&Je.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ut(o,n,t,e),r.add(o)}else ut(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=L.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Me.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let dt=null;function ft(e){dt&&dt(e)}function pt(){ht.stop()}function mt(){ht.start()}let ht=new es;ht.setAnimationLoop(ft),typeof self<`u`&&ht.setContext(self),this.setAnimationLoop=function(e){dt=e,rt.setAnimationLoop(e),e===null?ht.stop():ht.start()},rt.addEventListener(`sessionstart`,pt),rt.addEventListener(`sessionend`,mt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){z(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=rt.enabled===!0&&rt.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(t),t=rt.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=Ke.get(e,C.length),x.init(t),x.state.textureUnits=Re.getTextureUnits(),C.push(x),ye.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),me.setFromProjectionMatrix(ye,Ft,t.reversedDepth),ge=this.localClippingEnabled,he=qe.init(this.clippingPlanes,ge),b=Ge.get(e,S.length),b.init(),S.push(b),rt.enabled===!0&&rt.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&gt(e,t,-1/0,T.sortObjects)}gt(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(le,ue),ke=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,ke&&Ye.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),he===!0&&qe.beginShadows();let i=x.state.shadowsArray;if(Je.render(i,e,t),he===!0&&qe.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];vt(n,r,e,a)}ke&&Ye.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];_t(b,e,n,n.viewport)}}else r.length>0&&vt(n,r,e,t),ke&&Ye.render(e),_t(b,e,t)}N!==null&&M===0&&(Re.updateMultisampleRenderTarget(N),Re.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),et.resetDefaultState(),ee=-1,te=null,C.pop(),C.length>0?(x=C[C.length-1],Re.setTextureUnits(x.state.textureUnits),he===!0&&qe.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function gt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(me)){r&&Se.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ye);let i=He.update(e),a=e.material;a.visible&&b.push(e,i,a,n,Se.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(me))){let i=He.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Se.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Se.copy(e.boundingSphere.center)),Se.applyMatrix4(e.matrixWorld).applyMatrix4(ye)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,Se.z,s,t)}}else a.visible&&b.push(e,i,a,n,Se.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)gt(i[e],t,n,r)}function _t(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),he===!0&&qe.setGlobalState(T.clippingPlanes,n),r&&I.viewport(ne.copy(r)),i.length>0&&yt(i,t,n),a.length>0&&yt(a,t,n),o.length>0&&yt(o,t,n),I.buffers.depth.setTest(!0),I.buffers.depth.setMask(!0),I.buffers.color.setMask(!0),I.setPolygonOffset(!1)}function vt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Me.has(`EXT_color_buffer_half_float`)||Me.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Cn(1,1,{generateMipmaps:!0,type:e?Te:ve,minFilter:_e,samples:Math.max(4,Ne.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:un.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||ne;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ae),oe=T.getClearAlpha(),oe<1&&T.setClearColor(16777215,.5),T.clear(),ke&&Ye.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),he===!0&&qe.setGlobalState(T.clippingPlanes,r),yt(e,n,r),Re.updateMultisampleRenderTarget(a),Re.updateRenderTargetMipmap(a),Me.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,bt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Re.updateMultisampleRenderTarget(a),Re.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ae,oe),d!==void 0&&(r.viewport=d),T.toneMapping=u}function yt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&bt(o,t,n,s,l,c)}}function bt(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function xt(e,t,n){t.isScene!==!0&&(t=we);let r=L.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Ue.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Ue.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=ze.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,st),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Ct(e,s),d}else s.uniforms=Ue.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Ue.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=qe.uniform),Ct(e,s),r.needsLights=Dt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function St(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Jc.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Ct(e,t){let n=L.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function wt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function Tt(e,t,n,r,i){t.isScene!==!0&&(t=we),Re.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:un.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=ze.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=L.get(r),y=x.state.lights;if(he===!0&&(ge===!0||e!==te)){let t=e===te&&r.id===ee;qe.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==qe.numPlanes||v.numIntersection!==qe.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=xt(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(I.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==ee&&(ee=r.id,w=!0),v.needsLights){let e=wt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||te!==e){I.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(F,`projectionMatrix`,e.projectionMatrix),O.setValue(F,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(F,be.setFromMatrixPosition(e.matrixWorld)),Ne.logarithmicDepthBuffer&&O.setValue(F,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(F,`isOrthographic`,e.isOrthographicCamera===!0),te!==e&&(te=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(F,`sunShadowMap`,y.state.sunShadowMap,Re),y.state.directionalShadowMap.length>0&&O.setValue(F,`directionalShadowMap`,y.state.directionalShadowMap,Re),y.state.spotShadowMap.length>0&&O.setValue(F,`spotShadowMap`,y.state.spotShadowMap,Re),y.state.pointShadowMap.length>0&&O.setValue(F,`pointShadowMap`,y.state.pointShadowMap,Re)),i.isSkinnedMesh){O.setOptional(F,i,`bindMatrix`),O.setOptional(F,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(F,`boneTexture`,e.boneTexture,Re))}i.isBatchedMesh&&(O.setOptional(F,i,`batchingTexture`),O.setValue(F,`batchingTexture`,i._matricesTexture,Re),O.setOptional(F,i,`batchingIdTexture`),O.setValue(F,`batchingIdTexture`,i._indirectTexture,Re),O.setOptional(F,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(F,`batchingColorTexture`,i._colorsTexture,Re));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Xe.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(F,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=hu()),w){if(O.setValue(F,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&Et(k,E),a&&r.fog===!0&&We.refreshFogUniforms(k,a),We.refreshMaterialUniforms(k,r,ce,se,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}Jc.upload(F,St(v),k,Re)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Jc.upload(F,St(v),k,Re),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(F,`center`,i.center),O.setValue(F,`modelViewMatrix`,i.modelViewMatrix),O.setValue(F,`normalMatrix`,i.normalMatrix),O.setValue(F,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];tt.update(n,S),tt.bind(n,S)}}return S}function Et(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Dt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=L.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),L.get(e.texture).__webglTexture=t,L.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=L.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,j=t,M=n;let r=null,i=!1,a=!1;if(e){let o=L.get(e);if(o.__useDefaultFramebuffer!==void 0){I.bindFramebuffer(F.FRAMEBUFFER,o.__webglFramebuffer),ne.copy(e.viewport),re.copy(e.scissor),ie=e.scissorTest,I.viewport(ne),I.scissor(re),I.setScissorTest(ie),ee=-1;return}if(o.__webglFramebuffer===void 0)Re.setupRenderTarget(e);else if(o.__hasExternalTextures)Re.rebindTextures(e,L.get(e.texture).__webglTexture,L.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&L.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Re.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=L.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Re.useMultisampledRTT(e)===!1?L.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ne.copy(e.viewport),re.copy(e.scissor),ie=e.scissorTest}else ne.copy(de).multiplyScalar(ce).floor(),re.copy(fe).multiplyScalar(ce).floor(),ie=pe;if(n!==0&&(r=O),I.bindFramebuffer(F.FRAMEBUFFER,r)&&I.drawBuffers(e,r),I.viewport(ne),I.scissor(re),I.setScissorTest(ie),i){let r=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=L.get(e.textures[t]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,t.__webglTexture,n)}ee=-1};function kt(e){let t=L.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ne.textureFormatReadable(e.format),t.__typeReadable=Ne.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){I.bindFramebuffer(F.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s);let u=kt(o);if(u.__formatReadable===!1){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&F.readPixels(t,n,r,i,$e.convert(c),$e.convert(l),a)}finally{let e=N===null?null:L.get(N).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){I.bindFramebuffer(F.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s);let d=kt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,f),F.bufferData(F.PIXEL_PACK_BUFFER,a.byteLength,F.STREAM_READ),F.readPixels(t,n,r,i,$e.convert(l),$e.convert(u),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let p=N===null?null:L.get(N).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,p);let m=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Wt(F,m,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,f),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,a),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(f),F.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Re.setTexture2D(e,0),F.copyTexSubImage2D(F.TEXTURE_2D,n,0,0,o,s,i,a),I.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=$e.convert(t.format),_=$e.convert(t.type),v;t.isData3DTexture?(Re.setTexture3D(t,0),v=F.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Re.setTexture2DArray(t,0),v=F.TEXTURE_2D_ARRAY):(Re.setTexture2D(t,0),v=F.TEXTURE_2D),I.activeTexture(F.TEXTURE0),I.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,t.flipY),I.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),I.pixelStorei(F.UNPACK_ALIGNMENT,t.unpackAlignment);let y=I.getParameter(F.UNPACK_ROW_LENGTH),b=I.getParameter(F.UNPACK_IMAGE_HEIGHT),x=I.getParameter(F.UNPACK_SKIP_PIXELS),S=I.getParameter(F.UNPACK_SKIP_ROWS),C=I.getParameter(F.UNPACK_SKIP_IMAGES);I.pixelStorei(F.UNPACK_ROW_LENGTH,h.width),I.pixelStorei(F.UNPACK_IMAGE_HEIGHT,h.height),I.pixelStorei(F.UNPACK_SKIP_PIXELS,l),I.pixelStorei(F.UNPACK_SKIP_ROWS,u),I.pixelStorei(F.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=L.get(e),r=L.get(t),h=L.get(n.__renderTarget),g=L.get(r.__renderTarget);I.bindFramebuffer(F.READ_FRAMEBUFFER,h.__webglFramebuffer),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(e).__webglTexture,i,d+n),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(t).__webglTexture,a,m+n)),F.blitFramebuffer(l,u,o,s,f,p,o,s,F.DEPTH_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||L.has(e)){let n=L.get(e),r=L.get(t);I.bindFramebuffer(F.READ_FRAMEBUFFER,k),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,n.__webglTexture,i),T?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,r.__webglTexture,a),i===0?T?F.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):F.copyTexSubImage2D(v,a,f,p,l,u,o,s):F.blitFramebuffer(l,u,o,s,f,p,o,s,F.COLOR_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?F.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h);I.pixelStorei(F.UNPACK_ROW_LENGTH,y),I.pixelStorei(F.UNPACK_IMAGE_HEIGHT,b),I.pixelStorei(F.UNPACK_SKIP_PIXELS,x),I.pixelStorei(F.UNPACK_SKIP_ROWS,S),I.pixelStorei(F.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&F.generateMipmap(v),I.unbindTexture()},this.initRenderTarget=function(e){L.get(e).__webglFramebuffer===void 0&&Re.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Re.setTextureCube(e,0):e.isData3DTexture?Re.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Re.setTexture2DArray(e,0):Re.setTexture2D(e,0),I.unbindTexture()},this.resetState=function(){j=0,M=0,N=null,I.reset(),et.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ft}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=un._getDrawingBufferColorSpace(e),t.unpackColorSpace=un._getUnpackColorSpace()}},_u={thresholds:[10,40,90,160],maxHeat:220,carjack:6,pedHit:6,pedHitSpeed:5,punch:2,hitPolice:15,explosion:20,explosionRadius:25,witnessMul:2.5,witnessRange:32,hitPoliceCooldown:1,hideTime:[0,6,9,12,15],decayPerSec:7,sightRange:60,sightEvery:10},K={units:[0,2,3,4,6],spawnEvery:1.4,spawnEveryPerStar:.25,spawnMin:56,spawnMax:82,spawnCloserPerStar:5,spawnFloor:50,spawnHidden:{halfX:44,north:40,south:26},despawn:210,pursueRange:45,repath:1.5,chaseSpeed:1.6,leadTime:1.4,roadblockStars:3,roadblockEvery:28,roadblockMin:70,roadblockMax:115,roadblockKeep:70,bustRange:2,bustSpeed:2,bustTime:3.75,bustDecayMoving:.8,bustDecayStill:2.5,boxInSpeed:4,boxInCreep:1.5,boxInDecel:5,pushGap:1.2,dodgeOffset:4,dodgeTime:2.5,flashHz:3},vu={radius:5,maxSpeed:6,cost:0,requireUnseen:!0,tints:[16777215,16743034,8042751,9240460,16765803,13999103]},yu={startMoney:200,bustedDelay:3,bustedFineFrac:.1,bustedFineMin:50,hospitalFeeFrac:.1,hospitalFeeMin:25,reviveWindow:20},bu={drag:2.2,turnFullSpeed:5,fragility:2},xu={vehicle:1.25,person:1.2},Su={rickshaw:{...bu,id:`rickshaw`,model:`rickshaw`,length:2.7,width:1.4,height:1.8,mass:380,maxSpeed:17,accel:8,brake:15,reverseMax:5,turn:3.1,turnFullSpeed:3.5,falloff:.45,grip:8,driftGrip:2.2,health:70,fragility:2.5,colors:{body:4170573,accent:3046706,roof:15909198}},taxi:{...bu,id:`taxi`,model:`car`,length:4,width:1.7,height:1.5,mass:1e3,maxSpeed:30,accel:9.5,brake:18,reverseMax:7,turn:2.6,falloff:.5,grip:10,driftGrip:1.8,health:100,colors:{body:1907997,accent:16173326,roof:16173326}},motorbike:{...bu,id:`motorbike`,model:`bike`,length:2,width:.7,height:1.2,mass:190,maxSpeed:36,accel:13,brake:16,reverseMax:2.5,turn:3.4,turnFullSpeed:4,falloff:.55,grip:12,driftGrip:3,health:40,fragility:3,colors:{body:12597547,accent:2899536,roof:9807270}},bus:{...bu,id:`bus`,model:`bus`,length:10.5,width:2.5,height:3.2,mass:9e3,maxSpeed:19,accel:3.6,brake:9,reverseMax:4,turn:1.25,turnFullSpeed:4,falloff:.25,grip:12,driftGrip:4,drag:1.6,health:300,fragility:.8,colors:{body:13849600,accent:15528177,roof:12436423}},truck:{...bu,id:`truck`,model:`truck`,length:7.5,width:2.4,height:3,mass:7e3,maxSpeed:21,accel:4,brake:10,reverseMax:4,turn:1.5,turnFullSpeed:4,falloff:.3,grip:12,driftGrip:3.5,drag:1.8,health:250,fragility:.9,colors:{body:3049153,accent:16044095,roof:9334355}},police:{...bu,id:`police`,model:`jeep`,length:4,width:1.85,height:1.8,mass:1500,maxSpeed:33,accel:10.5,brake:20,reverseMax:8,turn:2.7,falloff:.5,grip:11,driftGrip:2,health:160,fragility:1.5,colors:{body:15790320,accent:2051740,roof:15790320}}};function Cu(e){let t=xu.vehicle;return{...e,length:e.length*t,width:e.width*t,height:e.height*t}}var wu=[null,14169132,3108822,3121738,15909424,9323720],q=Object.fromEntries(Object.keys(Su).map(e=>[e,Cu(Su[e])])),Tu={threshold:3,smoke:.5,fire:.2,burnRate:.06,blastRadius:7,blastPush:14,blastVehicleDamage:120,blastWalkerDamage:60};function Eu(){return{nx:0,nz:0,depth:0}}function Du(){return{x:0,z:0,hw:0,hl:0,rx:1,rz:0,fx:0,fz:-1}}function Ou(e,t,n,r,i,a){let o=Math.cos(r),s=Math.sin(r);return e.x=t,e.z=n,e.hw=i,e.hl=a,e.rx=o,e.rz=s,e.fx=s,e.fz=-o,e}function ku(e,t){let n=t.obb;return n?Ou(e,n.x,n.z,n.heading,n.hw,n.hl):Ou(e,(t.minX+t.maxX)/2,(t.minZ+t.maxZ)/2,0,(t.maxX-t.minX)/2,(t.maxZ-t.minZ)/2)}function Au(e){return{ex:e.hw*Math.abs(e.rx)+e.hl*Math.abs(e.fx),ez:e.hw*Math.abs(e.rz)+e.hl*Math.abs(e.fz)}}function ju(e,t,n){return e.hw*Math.abs(e.rx*t+e.rz*n)+e.hl*Math.abs(e.fx*t+e.fz*n)}function Mu(e,t,n){let r=t.x-e.x,i=t.z-e.z,a=1/0,o=0,s=0;for(let n=0;n<4;n++){let c=n===0?e.rx:n===1?e.fx:n===2?t.rx:t.fx,l=n===0?e.rz:n===1?e.fz:n===2?t.rz:t.fz,u=r*c+i*l,d=ju(e,c,l)+ju(t,c,l)-Math.abs(u);if(d<=0)return!1;if(d<a){a=d;let e=u>0?-1:1;o=c*e,s=l*e}}return n.nx=o,n.nz=s,n.depth=a,!0}function Nu(e,t,n,r,i){let a=e-r.x,o=t-r.z,s=a*r.rx+o*r.rz,c=a*r.fx+o*r.fz,l=Math.max(-r.hw,Math.min(r.hw,s)),u=Math.max(-r.hl,Math.min(r.hl,c)),d=s-l,f=c-u,p=d*d+f*f;if(p>=n*n)return!1;let m,h,g;if(p>1e-12){let e=Math.sqrt(p);m=d/e,h=f/e,g=n-e}else{let e=r.hw-Math.abs(s),t=r.hl-Math.abs(c);e<t?(m=s>=0?1:-1,h=0,g=e+n):(m=0,h=c>=0?1:-1,g=t+n)}return i.nx=m*r.rx+h*r.fx,i.nz=m*r.rz+h*r.fz,i.depth=g,!0}function Pu(e,t,n){let r=e-n.x,i=t-n.z,a=Math.abs(r*n.rx+i*n.rz)-n.hw,o=Math.abs(r*n.fx+i*n.fz)-n.hl;return Math.hypot(Math.max(a,0),Math.max(o,0))}function Fu(e){return{s:e>>>0}}function Iu(e){e.s=e.s+1831565813>>>0;let t=e.s;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Lu(e,t,n){return t+(n-t)*Iu(e)}function Ru(e,t){let n=q[e.type],r=e.stage===`wreck`,i=r?0:e.inThrottle,a=r?0:e.inBrake,o=r?0:e.inSteer,s=r||e.inHandbrake,c=o!==0&&(e.steer===0||o>0==e.steer>0);e.steer=Hu(e.steer,o,(c?6:10)*t);let l=Math.sin(e.heading),u=-Math.cos(e.heading),d=e.vx*l+e.vz*u,f=e.vx*u*-1+e.vz*l;i>0&&d<-.5?d=Hu(d,0,n.brake*i*t):a>0&&d>.5?d=Hu(d,0,n.brake*a*t):i>0?d<n.maxSpeed&&(d+=n.accel*i*(.3+.7*(1-Math.max(0,d)/n.maxSpeed))*t):a>0?d>-n.reverseMax&&(d-=n.accel*.6*a*t):d=Hu(d,0,n.drag*t),s&&(d=Hu(d,0,n.brake*zu*t)),d>n.maxSpeed&&(d=Hu(d,n.maxSpeed,4*t)),d<-n.reverseMax&&(d=Hu(d,-n.reverseMax,4*t));let p=Math.abs(d),m=Math.min(1,p/n.turnFullSpeed)*(1-n.falloff*Math.min(1,p/n.maxSpeed)),h=e.steer*n.turn*m*(s&&p>4?1.35:1);s&&p>4&&(h*=Math.max(.15,Math.min(1,1-(Math.atan2(Math.abs(f),p)-Bu)/Vu))),d<0&&(h=-h);let g=l*d-u*f,_=u*d+l*f;e.heading=Uu(e.heading+h*t);let v=Math.sin(e.heading),y=-Math.cos(e.heading);d=g*v+_*y,f=-g*y+_*v;let b=s?n.driftGrip:n.grip,x=f*Math.max(0,1-b*t),S=Math.abs(f-x)*(s?.05:.2);d>S?d-=S:d<-S?d+=S:d=0,f=x,e.skid=Math.abs(f),g=v*d-y*f,_=y*d+v*f,e.vx=g,e.vz=_,e.x+=g*t,e.z+=_*t}var zu=.25,Bu=.55,Vu=.45;function Hu(e,t,n){return e<t?e+n>t?t:e+n:e-n<t?t:e-n}function Uu(e){return e>Math.PI?e-Math.PI*2:e<=-Math.PI?e+Math.PI*2:e}function Wu(e,t,n,r,i=0){return{id:e,kind:t,x:n,z:r,heading:i,px:n,pz:r,pHeading:i,vx:0,vz:0,health:100,maxHealth:100,knockT:0,punchT:0,punchCd:0,walkDist:0,hidden:!1,wishX:0,wishY:0}}function Gu(e){return e.knockT>0}function Ku(e,t,n,r,i){e.vx=t,e.vz=n,e.knockT=Math.max(e.knockT,r),e.punchT=0,e.health=Math.max(0,e.health-i)}function qu(e,t,n,i){if(e.punchT>0&&(e.punchT=Math.max(0,e.punchT-i)),e.punchCd>0&&(e.punchCd=Math.max(0,e.punchCd-i)),e.knockT>0){e.knockT=Math.max(0,e.knockT-i);let t=Math.hypot(e.vx,e.vz),n=Math.max(0,t-r.slideFriction*i);t>0&&(e.vx*=n/t,e.vz*=n/t)}else{let a=Math.hypot(t,n);a>1&&(t/=a,n/=a,a=1);let o=a>.05?t*r.runSpeed:0,s=a>.05?-n*r.runSpeed:0,c=r.accel*i;e.vx=Hu(e.vx,o,c),e.vz=Hu(e.vz,s,c),a>.05&&(e.heading=Ju(e.heading,Math.atan2(t,n),r.turnRate*i))}e.x+=e.vx*i,e.z+=e.vz*i,e.knockT===0&&(e.walkDist+=Math.hypot(e.vx,e.vz)*i)}function Ju(e,t,n){let r=Uu(t-e);return Math.abs(r)<=n?t:Uu(e+Math.sign(r)*n)}function Yu(e,t,n){e.stage===`wreck`||t<=0||(e.health=Math.max(0,e.health-t),Qu(e,n))}function Xu(e,t,n,r){return e.stage===`fire`&&(e.health=Math.max(0,e.health-q[e.type].health*Tu.burnRate*n),Qu(e,r)),e.stage===`wreck`&&e.explodedAt<0&&(e.explodedAt=t,r.push({type:`explode`,vehicle:e.id,x:e.x,z:e.z}),!0)}function Zu(e,t){if(e<=0)return`wreck`;let n=e/t;return n<Tu.fire?`fire`:n<Tu.smoke?`smoke`:`ok`}function Qu(e,t){let n=Zu(e.health,q[e.type].health);n!==e.stage&&(e.stage=n,n===`smoke`?t.push({type:`smoke`,vehicle:e.id}):n===`fire`&&t.push({type:`fire`,vehicle:e.id}))}function $u(e,t,n,r,i,a=`none`){return{id:e,type:t,x:n,z:r,heading:i,px:n,pz:r,pHeading:i,vx:0,vz:0,steer:0,inThrottle:0,inBrake:0,inSteer:0,inHandbrake:!1,driver:a,health:q[t].health,stage:`ok`,explodedAt:-1,horn:!1,skid:0,paint:0,siren:!1}}function ed(e){return Math.hypot(e.vx,e.vz)}function td(e){return e.vx*Math.sin(e.heading)-e.vz*Math.cos(e.heading)}function nd(e,t){let n=q[e.type];return Ou(t,e.x,e.z,e.heading,n.width/2,n.length/2)}var rd=Du(),id=Du(),J=Eu(),ad=[],od=.25,sd=.35,cd=.12,ld=Object.fromEntries(Object.values(q).map(e=>[e.id,Math.hypot(e.length,e.width)/2+r.radius])),ud=[],dd=[],fd=[],pd=[];function md(e,t,n){for(let r=0;r<3;r++){nd(e,rd);let{ex:r,ez:i}=Au(rd);ad.length=0,t.query(e.x-r,e.z-i,e.x+r,e.z+i,ad);let a=!1;for(let t of ad)Mu(nd(e,rd),ku(id,t),J)&&(a=!0,gd(e,J.nx,J.nz,J.depth,n));if(a=hd(e,t.bounds,n)||a,!a)break}}function hd(e,t,n){nd(e,rd);let{ex:r,ez:i}=Au(rd),a=t.minX-(e.x-r),o=e.x+r-t.maxX,s=t.minZ-(e.z-i),c=e.z+i-t.maxZ;return a>0&&gd(e,1,0,a,n),o>0&&gd(e,-1,0,o,n),s>0&&gd(e,0,1,s,n),c>0&&gd(e,0,-1,c,n),a>0||o>0||s>0||c>0}function gd(e,t,n,r,i){e.x+=t*r,e.z+=n*r;let a=e.vx*t+e.vz*n;if(a>=0)return;let o=-a;if(e.vx-=t*a,e.vz-=n*a,o>1){let r=Math.hypot(e.vx,e.vz);if(r>0){let t=Math.max(0,r-o*sd)/r;e.vx*=t,e.vz*=t}e.vx+=t*o*od,e.vz+=n*o*od}let s=Math.sin(e.heading),c=-Math.cos(e.heading),l=s*t+c*n;if(l<0&&l>-.77){let r=Math.atan2(s-t*l,-(c-n*l));e.heading=Uu(e.heading+Uu(r-e.heading)*cd)}o>Tu.threshold&&(Yu(e,(o-Tu.threshold)*q[e.type].fragility,i),i.push({type:`crash`,a:e.id,b:-1,impact:o,x:e.x-t*1,z:e.z-n*1}))}function _d(e,t){let n=e.length;if(ud.length!==n){ud.length=0;for(let e=0;e<n;e++)ud.push(e)}dd.length<n&&(dd.length=n,fd.length=n,pd.length=n);for(let t=0;t<n;t++){let n=q[e[t].type];pd[t]=Math.hypot(n.length,n.width)/2,dd[t]=e[t].x-pd[t],fd[t]=e[t].x+pd[t]}for(let e=1;e<n;e++){let t=ud[e],n=e-1;for(;n>=0&&(dd[ud[n]]>dd[t]||dd[ud[n]]===dd[t]&&ud[n]>t);)ud[n+1]=ud[n],n--;ud[n+1]=t}for(let r=0;r<n;r++){let i=ud[r],a=e[i],o=q[a.type],s=pd[i];for(let c=r+1;c<n;c++){let n=ud[c];if(dd[n]>fd[i])break;let r=e[n],l=q[r.type],u=pd[n],d=r.x-a.x,f=r.z-a.z;if(d*d+f*f>(s+u)*(s+u)||!Mu(nd(a,rd),nd(r,id),J))continue;let p=1/o.mass,m=1/l.mass,h=J.depth/(p+m);a.x+=J.nx*h*p,a.z+=J.nz*h*p,r.x-=J.nx*h*m,r.z-=J.nz*h*m;let g=(a.vx-r.vx)*J.nx+(a.vz-r.vz)*J.nz;if(g>=0)continue;let _=-1.3*g/(p+m);a.vx+=J.nx*_*p,a.vz+=J.nz*_*p,r.vx-=J.nx*_*m,r.vz-=J.nz*_*m;let v=_*p,y=_*m;v>Tu.threshold&&Yu(a,(v-Tu.threshold)*o.fragility,t),y>Tu.threshold&&Yu(r,(y-Tu.threshold)*l.fragility,t),-g>Tu.threshold&&t.push({type:`crash`,a:a.id,b:r.id,impact:-g,x:(a.x+r.x)/2,z:(a.z+r.z)/2})}}}function vd(e,t,n){if(!e.hidden)for(let i of t){let t=ld[i.type],a=e.x-i.x,o=e.z-i.z;if(a>t||a<-t||o>t||o<-t||a*a+o*o>t*t||!Nu(e.x,e.z,r.radius,nd(i,rd),J))continue;e.x+=J.nx*J.depth,e.z+=J.nz*J.depth;let s=(i.vx-e.vx)*J.nx+(i.vz-e.vz)*J.nz;if(s>r.hitSpeed&&!Gu(e)){let t=s*.9;Ku(e,i.vx*.7+J.nx*t*.5,i.vz*.7+J.nz*t*.5,r.knockTime+s*.05,s*r.hitDamagePerMs),i.vx*=.93,i.vz*=.93,n.push({type:`pedHit`,vehicle:i.id,walker:e.id,speed:s})}else s>0&&(e.vx+=J.nx*s,e.vz+=J.nz*s)}}function yd(e,t){if(e.hidden)return;let n=r.radius;ad.length=0,t.query(e.x-n,e.z-n,e.x+n,e.z+n,ad);for(let t of ad){if(!Nu(e.x,e.z,n,ku(id,t),J))continue;e.x+=J.nx*J.depth,e.z+=J.nz*J.depth;let r=e.vx*J.nx+e.vz*J.nz;r<0&&(e.vx-=J.nx*r*(Gu(e)?1.4:1),e.vz-=J.nz*r*(Gu(e)?1.4:1))}let i=t.bounds;e.x=Math.max(i.minX+n,Math.min(i.maxX-n,e.x)),e.z=Math.max(i.minZ+n,Math.min(i.maxZ-n,e.z))}function bd(e,t,n,r,i){let a=r.bounds;if(e-n<a.minX||e+n>a.maxX||t-n<a.minZ||t+n>a.maxZ)return!1;ad.length=0,r.query(e-n,t-n,e+n,t+n,ad);for(let r of ad)if(Nu(e,t,n,ku(id,r),J))return!1;for(let r of i)if(Nu(e,t,n,nd(r,rd),J))return!1;return!0}function xd(){return rd}function Sd(e,t,n){return{walker:Wu(e,`player`,t,n),vehicleId:-1,wishX:0,wishY:0,prevUse:!1,prevAction:!1,prevHorn:!1,busyT:0,downT:0,spawnX:t,spawnZ:n,money:yu.startMoney}}function Cd(e,t){if(!(t<0)){for(let n of e.vehicles)if(n.id===t)return n}}function wd(e,t,n){let r=e.player,i=t.use&&!r.prevUse,a=t.action&&!r.prevAction,o=t.horn&&!r.prevHorn;if(r.prevUse=t.use,r.prevAction=t.action,r.prevHorn=t.horn,r.wishX=0,r.wishY=0,r.busyT>0&&(r.busyT=Math.max(0,r.busyT-n)),r.downT>0){r.downT=Math.max(0,r.downT-n),r.downT===0&&jd(e);return}let s=Cd(e,r.vehicleId);if(s){let n=r.busyT>0;s.inThrottle=n?0:t.throttle,s.inBrake=n?0:t.brake,s.inSteer=n?0:t.moveX,s.inHandbrake=n||t.handbrake,s.horn=t.horn&&s.stage!==`wreck`,o&&s.horn&&e.events.push({type:`horn`,vehicle:s.id}),i&&!n&&Ed(e,s);return}r.vehicleId>=0&&(r.vehicleId=-1),!Gu(r.walker)&&(r.wishX=t.moveX,r.wishY=t.moveY,i&&Td(e),a&&kd(e,r.walker))}function Td(e){let t=e.player,n=t.walker,i,a=r.enterReach;for(let t of e.vehicles){if(t.stage===`wreck`||t.driver===`player`||ed(t)>r.enterMaxSpeed)continue;let e=Pu(n.x,n.z,nd(t,xd()));e<=a&&(a=e,i=t)}if(!i)return!1;if(i.driver===`npc`){let n=Od(e,i)??{x:i.x,z:i.z},a=Wu(e.nextId++,`npc`,n.x,n.z,i.heading),o=Math.cos(i.heading),s=Math.sin(i.heading),c=Lu(e.rng,3,5);Ku(a,-o*c,-s*c,r.knockTime,0),e.peds.push(a),e.events.push({type:`pullOut`,vehicle:i.id,walker:a.id}),t.busyT=r.pullOutTime}return i.driver=`player`,t.vehicleId=i.id,n.hidden=!0,n.vx=n.vz=0,e.events.push({type:`enter`,vehicle:i.id}),!0}function Ed(e,t){if(ed(t)>r.exitMaxSpeed)return!1;let n=Od(e,t);return n?(Dd(e,t,n.x,n.z),e.events.push({type:`exit`,vehicle:t.id}),!0):!1}function Dd(e,t,n,r){let i=e.player,a=i.walker;a.x=a.px=n,a.z=a.pz=r,a.heading=a.pHeading=t.heading,a.vx=t.vx*.3,a.vz=t.vz*.3,a.hidden=!1,t.driver=`none`,t.horn=!1,i.vehicleId=-1}function Od(e,t){let n=q[t.type],i=Math.cos(t.heading),a=Math.sin(t.heading),o=a,s=-i,c=n.width/2+r.radius+.25,l=n.length/2+r.radius+.25,u=[[-i*c,-a*c],[i*c,a*c],[-o*l,-s*l],[o*l,s*l]];for(let[n,i]of u)if(bd(t.x+n,t.z+i,r.radius,e.static,e.vehicles))return{x:t.x+n,z:t.z+i};return null}function kd(e,t){if(t.punchCd>0)return-1;t.punchT=r.punchTime,t.punchCd=r.punchCooldown;let n=Math.sin(t.heading),i=-Math.cos(t.heading),a=Math.cos(r.punchCone),o=-1;for(let s of e.peds){if(s===t||s.hidden||Gu(s))continue;let e=s.x-t.x,c=s.z-t.z,l=Math.hypot(e,c);if(!(l>r.punchReach+r.radius||l<1e-6)&&!((e*n+c*i)/l<a)){Ku(s,n*r.punchPush,i*r.punchPush,r.knockTime,r.punchDamage),o=s.id;break}}return e.events.push({type:`punch`,walker:t.id,hit:o}),o}function Ad(e){let t=e.player,n=t.walker,i=Cd(e,t.vehicleId);i&&(n.x=i.x,n.z=i.z,n.heading=i.heading,n.vx=i.vx,n.vz=i.vz),n.health<=0&&t.downT===0&&(t.downT=r.respawnTime,n.knockT=Math.max(n.knockT,r.respawnTime+r.getUpTime),e.events.push({type:`playerDown`}))}function jd(e){let t=e.player,n=t.walker,r=Cd(e,t.vehicleId);r&&(r.driver=`none`),t.vehicleId=-1,n.x=n.px=t.spawnX,n.z=n.pz=t.spawnZ,n.vx=n.vz=0,n.health=n.maxHealth,n.knockT=0,n.hidden=!1,e.events.push({type:`respawn`})}var Md=1.25,Nd=560,Pd=1.78,Fd=1.4,Id=2,Ld=1.34;function Rd(e,t,n=1/0){let r=Math.max(.3,e);if(r>=Md){let e=n<Nd?(Nd/Math.max(200,n))**.6:1,i=r>Pd?(r/Pd)**.3:1;return{fovDeg:t,distScale:Math.min(Fd,e*i),lowerPlayer:0}}let i=Math.min(Id,(Md/r)**.7),a=Math.min(Ld,i),o=t*Math.PI/360;return{fovDeg:Math.atan(Math.tan(o)*a)*360/Math.PI,distScale:i/a,lowerPlayer:r<1?.07*Math.min(1,(1-r)/.5):0}}var zd=Math.PI/180,Bd=class{constructor(e){this.fx=0,this.fz=0,this.ax=0,this.az=0,this.dist=n.walkDistance,this.pitch=n.walkPitchDeg*zd,this.shakeAmp=0,this.shakeT=0,this.look=new V,this.distScale=1,this.camera=new jo(n.fovDeg,e,.5,800)}setAspect(e,t){this.camera.aspect=e;let r=Rd(e,n.fovDeg,t);this.camera.fov=r.fovDeg,this.distScale=r.distScale,r.lowerPlayer>0?this.camera.setViewOffset(1e3*e,1e3,0,-1e3*r.lowerPlayer,1e3*e,1e3):this.camera.clearViewOffset(),this.camera.updateProjectionMatrix()}snap(e){this.fx=e.x,this.fz=e.z,this.ax=this.az=0,this.dist=e.driving?n.driveDistance:n.walkDistance,this.pitch=(e.driving?n.drivePitchDeg:n.walkPitchDeg)*zd,this.place()}shake(e){this.shakeAmp=Math.min(n.maxShake,this.shakeAmp+e*n.shakePerImpact)}update(e,t){let r=Math.hypot(e.vx,e.vz),i=e.driving?Math.min(n.maxSpeedZoom,r*n.speedZoom):0,a=i/n.maxSpeedZoom,o=(e.driving?n.driveDistance:n.walkDistance)+i,s=((e.driving?n.drivePitchDeg:n.walkPitchDeg)+n.speedPitchDeg*a)*zd,c=e.driving?e.vx*n.lookAhead:0,l=e.driving?e.vz*n.lookAhead:0,u=Math.hypot(c,l);u>n.maxLookAhead&&(c*=n.maxLookAhead/u,l*=n.maxLookAhead/u);let d=1-Math.exp(-n.zoomEase*t);this.dist+=(o-this.dist)*d,this.pitch+=(s-this.pitch)*d,this.ax+=(c-this.ax)*d,this.az+=(l-this.az)*d;let f=1-Math.exp(-n.follow*t);this.fx+=(e.x-this.fx)*f,this.fz+=(e.z-this.fz)*f,this.shakeT+=t,this.shakeAmp*=Math.exp(-n.shakeDecay*t),this.shakeAmp<.01&&(this.shakeAmp=0),this.place()}occlusionHint(){let e=this.camera.position;return{x:this.look.x,z:this.look.z,camX:e.x,camY:e.y,camZ:e.z}}place(){let e=this.shakeAmp*Math.sin(this.shakeT*53),t=this.shakeAmp*Math.sin(this.shakeT*41+1.3);this.look.set(this.fx+this.ax+e,0,this.fz+this.az+t);let n=this.dist*this.distScale;this.camera.position.set(this.look.x,Math.sin(this.pitch)*n,this.look.z+Math.cos(this.pitch)*n),this.camera.lookAt(this.look)}},Vd={x:0,z:6},Hd=[{type:`rickshaw`,x:4,z:2,heading:0,driver:!1},{type:`taxi`,x:-5,z:0,heading:0,driver:!0},{type:`motorbike`,x:9,z:4,heading:.3,driver:!1},{type:`police`,x:-12,z:-4,heading:0,driver:!1},{type:`bus`,x:22,z:-10,heading:Math.PI/2,driver:!1},{type:`truck`,x:-24,z:18,heading:0,driver:!1},{type:`taxi`,x:14,z:22,heading:Math.PI,driver:!1}],Ud=[{x:2,z:10},{x:-3,z:12},{x:6,z:14}];function Wd(e,t,n,r,i){let a=Math.abs(Math.cos(n)),o=Math.abs(Math.sin(n)),s=r*a+i*o,c=r*o+i*a;return{minX:e-s,minZ:t-c,maxX:e+s,maxZ:t+c,obb:{x:e,z:t,heading:n,hw:r,hl:i}}}function Gd(e,t,n,r=0){if(t<e.minX-r||t>e.maxX+r||n<e.minZ-r||n>e.maxZ+r)return!1;let i=e.obb;if(!i)return!0;let a=Math.cos(i.heading),o=Math.sin(i.heading),s=t-i.x,c=n-i.z;return Math.abs(s*a+c*o)<=i.hw+r&&Math.abs(s*o-c*a)<=i.hl+r}var Kd=class{constructor(e,t){this.boxes=e,this.bounds=t}query(e,t,n,r,i){for(let a of this.boxes)a.maxX>e&&a.minX<n&&a.maxZ>t&&a.minZ<r&&i.push(a)}};function qd(e,t,n,r){return{minX:e-n/2,minZ:t-r/2,maxX:e+n/2,maxZ:t+r/2}}function Jd(){return new Kd([qd(-40,-40,30,30),qd(40,-40,30,30),qd(-40,40,30,30),qd(40,45,30,20),qd(0,-70,60,12),qd(75,0,10,50),qd(-70,0,8,30),qd(20,15,1,1),qd(24,15,1,1),qd(28,15,1,1),qd(0,40,20,4)],{minX:-120,minZ:-120,maxX:120,maxZ:120})}var Y={target:36,spawnMin:80,spawnMax:140,despawn:165,initialMin:18,offscreen:70,spawnPerStep:2,mix:[{type:`rickshaw`,weight:5},{type:`taxi`,weight:4},{type:`motorbike`,weight:4},{type:`bus`,weight:1},{type:`truck`,weight:1}],galiWidth:2.55,galiSpawnChance:.2,laneMargin:.6,typeSpeed:{rickshaw:.85,taxi:1.05,motorbike:1.15,bus:.8,truck:.8,police:1.1},cruiseMin:.85,cruiseMax:1.1,planDecel:4,steerLook:3.5,steerLookPerMs:.45,sampleStep:2.5,scanBase:7,scanPerMs:1.5,scanMax:32,corridorMargin:.35,minGap:1.8,gapPerMs:.6,goAroundAfter:1.2,maxOffset:1.3,offsetSpeed:1.6,honkAfter:1.4,honkEvery:3.2,honkJitter:1.5,reverseAfter:5,reverseTime:1.3,deadlockAfter:2.5,stuckDespawn:15,holdMax:7,waitMax:12,exitClear:4.5,resnap:7},Yd={target:55,spawnMin:55,spawnMax:95,despawn:115,initialMin:10,spawnPerStep:2,walkMin:1.1,walkMax:1.6,pauseChance:.12,pauseMin:1,pauseMax:4,arrive:.7,fleeSpeed:5,fleeMin:2.5,fleeMax:4.5,carDanger:7,carDangerSpeed:8,explodeRadius:26,punchRadius:12,crashRadius:12,crashImpact:7,hitRadius:10,stuckTime:3},Xd={perZone:2,length:2.1,width:.85,speed:.7,turnRate:1.2,idleMin:3,idleMax:10,roamChance:.25,roamRadius:22,mass:600,bounce:.35,dazeTime:1.6,dazeSpeed:3},Zd={min:.4,max:1,window:4,lowFps:45,step:.15,weakStart:.7};function Qd(){return{cows:[]}}var $d=Du(),ef=Du(),tf=Eu(),nf=[];function rf(e,t){return Ou(t,e.x,e.z,e.heading,Xd.width/2,Xd.length/2)}function af(e,t,n,r){Ou($d,t,n,r,Xd.width/2+.3,Xd.length/2+.3);let{ex:i,ez:a}=Au($d);nf.length=0,e.static.query(t-i,n-a,t+i,n+a,nf);for(let e of nf)if(Mu($d,ku(ef,e),tf))return!1;for(let r of e.vehicles)if(Math.hypot(r.x-t,r.z-n)<8&&Mu($d,nd(r,ef),tf))return!1;return!0}function of(e,t,n){n.x=Lu(e.rng,t.minX+1.5,Math.max(t.minX+1.6,t.maxX-1.5)),n.z=Lu(e.rng,t.minZ+1.5,Math.max(t.minZ+1.6,t.maxZ-1.5))}var sf={x:0,z:0};function cf(e,t){t.cowZones.forEach((t,n)=>{for(let r=0;r<Xd.perZone;r++)for(let r=0;r<20;r++){of(e,t,sf);let r=Iu(e.rng)*Math.PI*2-Math.PI;if(af(e,sf.x,sf.z,r)){e.animals.cows.push({id:e.nextId++,x:sf.x,z:sf.z,heading:r,px:sf.x,pz:sf.z,pHeading:r,vx:0,vz:0,zone:n,tx:sf.x,tz:sf.z,idleT:Lu(e.rng,0,Xd.idleMax),dazeT:0,walkT:0,walkDist:0});break}}})}function lf(e,t){let n=e.city;for(let r of e.animals.cows){if(r.px=r.x,r.pz=r.z,r.pHeading=r.heading,r.dazeT>0)r.dazeT=Math.max(0,r.dazeT-t),uf(r,6*t);else if(r.idleT>0)r.idleT=Math.max(0,r.idleT-t),uf(r,4*t),r.idleT===0&&n&&df(e,n,r);else{let n=r.tx-r.x,i=r.tz-r.z,a=Math.hypot(n,i);if(r.walkT+=t,a<1||r.walkT>40)r.idleT=Lu(e.rng,Xd.idleMin,Xd.idleMax),r.walkT=0;else{let e=Uu(Math.atan2(n,-i)-r.heading),a=Xd.turnRate*t;r.heading=Uu(r.heading+(Math.abs(e)<a?e:Math.sign(e)*a));let o=Math.abs(e)>1.2?Xd.speed*.3:Xd.speed;r.vx=Hu(r.vx,Math.sin(r.heading)*o,2*t),r.vz=Hu(r.vz,-Math.cos(r.heading)*o,2*t)}}r.x+=r.vx*t,r.z+=r.vz*t,r.walkDist+=Math.hypot(r.vx,r.vz)*t}}function uf(e,t){e.vx=Hu(e.vx,0,t),e.vz=Hu(e.vz,0,t)}function df(e,t,n){let r=t.cowZones[n.zone];if(n.walkT=0,Iu(e.rng)<Xd.roamChance){let i=t.lanes.nodes;for(let t=0;t<12;t++){let t=i[Math.floor(Iu(e.rng)*i.length)],a=Math.max(r.minX-t.x,0,t.x-r.maxX),o=Math.max(r.minZ-t.z,0,t.z-r.maxZ);if(!(Math.hypot(a,o)>Xd.roamRadius)){n.tx=t.x,n.tz=t.z;return}}}of(e,r,sf),n.tx=sf.x,n.tz=sf.z}function ff(e){for(let t of e.animals.cows){for(let n=0;n<2;n++){rf(t,$d);let{ex:n,ez:r}=Au($d);nf.length=0,e.static.query(t.x-n,t.z-r,t.x+n,t.z+r,nf);let i=!1;for(let e of nf){if(!Mu(rf(t,$d),ku(ef,e),tf))continue;i=!0,t.x+=tf.nx*tf.depth,t.z+=tf.nz*tf.depth;let n=t.vx*tf.nx+t.vz*tf.nz;n<0&&(t.vx-=tf.nx*n,t.vz-=tf.nz*n)}if(!i)break;t.idleT===0&&t.dazeT===0&&(t.walkT+=1)}let n=e.static.bounds;t.x=Math.max(n.minX+1,Math.min(n.maxX-1,t.x)),t.z=Math.max(n.minZ+1,Math.min(n.maxZ-1,t.z));for(let n of e.vehicles){let r=n.x-t.x,i=n.z-t.z;if(r>12||r<-12||i>12||i<-12)continue;let a=q[n.type],o=(a.length+a.width)/2+Xd.length/2;if(Math.abs(r)>o||Math.abs(i)>o||!Mu(nd(n,$d),rf(t,ef),tf))continue;let s=1/a.mass,c=1/Xd.mass,l=tf.depth/(s+c);n.x+=tf.nx*l*s,n.z+=tf.nz*l*s,t.x-=tf.nx*l*c,t.z-=tf.nz*l*c;let u=(n.vx-t.vx)*tf.nx+(n.vz-t.vz)*tf.nz;if(u>=0)continue;let d=-(1+Xd.bounce)*u/(s+c);n.vx+=tf.nx*d*s,n.vz+=tf.nz*d*s,t.vx-=tf.nx*d*c,t.vz-=tf.nz*d*c;let f=Math.hypot(t.vx,t.vz);f>5&&(t.vx*=5/f,t.vz*=5/f),-u>Xd.dazeSpeed&&t.dazeT===0&&(t.dazeT=Xd.dazeTime,t.idleT=0,e.events.push({type:`cowHit`,vehicle:n.id,cow:t.id,speed:-u}))}let r=e.peds;pf(e.player.walker,t);for(let e of r)pf(e,t)}}function pf(e,t){e.hidden||Math.abs(e.x-t.x)>2||Math.abs(e.z-t.z)>2||Nu(e.x,e.z,r.radius,rf(t,$d),tf)&&(e.x+=tf.nx*tf.depth,e.z+=tf.nz*tf.depth)}var mf={Vehicle:0,Walker:1,Cow:2},hf=12,gf=[],_f=0,vf=0,yf=0,bf=1,xf=1,Sf=new Int32Array(1),Cf=new Int32Array(64);function wf(){return _f===gf.length&&gf.push({kind:mf.Vehicle,idx:0,id:0,x:0,z:0,vx:0,vz:0,heading:0,halfL:0,halfW:0,still:!1}),gf[_f++]}function Tf(e){_f=0;let t=e.static.bounds;vf=t.minX,yf=t.minZ;let n=Math.max(1,Math.ceil((t.maxX-t.minX)/hf)),r=Math.max(1,Math.ceil((t.maxZ-t.minZ)/hf));(n!==bf||r!==xf||Sf.length!==n*r)&&(bf=n,xf=r,Sf=new Int32Array(bf*xf)),Sf.fill(-1);for(let t=0;t<e.vehicles.length;t++){let n=e.vehicles[t],r=q[n.type],i=wf();i.kind=mf.Vehicle,i.idx=t,i.id=n.id,i.x=n.x,i.z=n.z,i.vx=n.vx,i.vz=n.vz,i.heading=n.heading,i.halfL=r.length/2,i.halfW=r.width/2,i.still=n.driver===`none`||n.stage===`wreck`}let i=e.player.walker;i.hidden||Ef(-1,i.id,i.x,i.z,i.vx,i.vz,i.heading,i.knockT>0);for(let t=0;t<e.peds.length;t++){let n=e.peds[t];n.hidden||Ef(t,n.id,n.x,n.z,n.vx,n.vz,n.heading,n.knockT>0)}for(let t=0;t<e.animals.cows.length;t++){let n=e.animals.cows[t],r=wf();r.kind=mf.Cow,r.idx=t,r.id=n.id,r.x=n.x,r.z=n.z,r.vx=n.vx,r.vz=n.vz,r.heading=n.heading,r.halfL=Xd.length/2,r.halfW=Xd.width/2,r.still=!0}Cf.length<_f&&(Cf=new Int32Array(_f*2));for(let e=0;e<_f;e++){let t=Df(gf[e].x,gf[e].z);Cf[e]=Sf[t],Sf[t]=e}}function Ef(e,t,n,i,a,o,s,c){let l=wf();l.kind=mf.Walker,l.idx=e,l.id=t,l.x=n,l.z=i,l.vx=a,l.vz=o,l.heading=s,l.halfL=c?.9:r.radius,l.halfW=r.radius,l.still=c}function Df(e,t){let n=Math.floor((e-vf)/hf),r=Math.floor((t-yf)/hf);return n=n<0?0:n>=bf?bf-1:n,r=r<0?0:r>=xf?xf-1:r,r*bf+n}function Of(e,t,n,r){r.length=0;let i=Math.max(0,Math.floor((e-n-vf)/hf)),a=Math.min(bf-1,Math.floor((e+n-vf)/hf)),o=Math.max(0,Math.floor((t-n-yf)/hf)),s=Math.min(xf-1,Math.floor((t+n-yf)/hf)),c=n*n;for(let n=o;n<=s;n++)for(let o=i;o<=a;o++)for(let i=Sf[n*bf+o];i>=0;i=Cf[i]){let n=gf[i],a=n.x-e,o=n.z-t;a*a+o*o<=c&&r.push(n)}return r}function kf(){return{agents:[],stats:{spawned:0,removed:0}}}var Af=16,jf=new WeakMap;function Mf(e){let t=jf.get(e);if(t)return t;let n=1/0,r=1/0,i=-1/0,a=-1/0;for(let t of e.nodes)n=Math.min(n,t.x),r=Math.min(r,t.z),i=Math.max(i,t.x),a=Math.max(a,t.z);let o=Math.ceil((i-n)/Af)+1,s=Math.ceil((a-r)/Af)+1,c=[];for(let e=0;e<o*s;e++)c.push([]);return e.nodes.forEach((t,i)=>{e.adj[i].length&&c[Math.floor((t.z-r)/Af)*o+Math.floor((t.x-n)/Af)].push(i)}),t={minX:n,minZ:r,nx:o,nz:s,cells:c},jf.set(e,t),t}function Nf(e,t,n){let r=Mf(e),i=Math.floor((t-r.minX)/Af),a=Math.floor((n-r.minZ)/Af),o=-1,s=1/0;for(let c=0;c<6;c++){for(let l=a-c;l<=a+c;l++)if(!(l<0||l>=r.nz)){for(let u=i-c;u<=i+c;u++)if(!(u<0||u>=r.nx)&&Math.max(Math.abs(u-i),Math.abs(l-a))===c)for(let i of r.cells[l*r.nx+u]){let r=Math.hypot(e.nodes[i].x-t,e.nodes[i].z-n);r<s&&(s=r,o=i)}}if(o>=0&&s<c*Af)break}return o}function Pf(e){return Math.round(Yd.target*e.traffic.density)}function Ff(e,t){let n=Pf(e);for(let r=0;r<n*20&&e.pedAI.agents.length<n;r++)If(e,t.peds,Yd.initialMin,Yd.spawnMax)}function If(e,t,n,r){if(t.nodes.length===0)return!1;let i=e.player.walker,a=Math.floor(Iu(e.rng)*t.nodes.length);if(t.adj[a].length===0)return!1;let o=t.nodes[a],s=Math.hypot(o.x-i.x,o.z-i.z);if(s<n||s>r)return!1;let c=t.adj[a][Math.floor(Iu(e.rng)*t.adj[a].length)],l=Iu(e.rng),u=t.nodes[c],d=o.x+(u.x-o.x)*l,f=o.z+(u.z-o.z)*l,p=Wu(e.nextId++,`npc`,d,f,Math.atan2(u.x-o.x,-(u.z-o.z)));return e.peds.push(p),e.pedAI.agents.push(Lf(e,p,a,c)),e.pedAI.stats.spawned++,!0}function Lf(e,t,n,r){return{w:t,from:n,to:r,speed:Lu(e.rng,Yd.walkMin,Yd.walkMax),pauseT:0,fleeT:0,fx:0,fz:0,stuckT:0,lastD:1/0}}var Rf=[],zf=new Set;function Bf(e,t){let n=e.city;if(!n)return;let i=n.peds,a=e.pedAI,o=e.player.walker;if(e.tick%30==0){zf.clear();for(let e of a.agents)zf.add(e.w.id);for(let t of e.peds){if(zf.has(t.id)||t.hidden)continue;let n=Nf(i,t.x,t.z);n>=0&&a.agents.push(Lf(e,t,n,n))}}for(let n=a.agents.length-1;n>=0;n--){let s=a.agents[n],c=s.w;if(Math.hypot(c.x-o.x,c.z-o.z)>Yd.despawn||e.peds.indexOf(c)<0){a.agents.splice(n,1);let t=e.peds.indexOf(c);t>=0&&e.peds.splice(t,1),a.stats.removed++;continue}if(c.wishX=0,c.wishY=0,Gu(c))continue;if((e.tick+n)%6==0&&s.fleeT<=0){Of(c.x,c.z,Yd.carDanger,Rf);for(let t of Rf){if(t.kind!==mf.Vehicle)continue;let n=Math.hypot(t.vx,t.vz);if(n<Yd.carDangerSpeed)continue;let r=c.x-t.x,i=c.z-t.z,a=Math.hypot(r,i)||1;if((r*t.vx+i*t.vz)/a<n*.4)continue;let o=t.vx*i-t.vz*r>=0?1:-1;Vf(e,s,-t.vz/n*o,t.vx/n*o,.5);break}}let l=0,u=0,d=0;if(s.fleeT>0){if(s.fleeT-=t,l=s.fx,u=s.fz,d=Yd.fleeSpeed,s.fleeT<=0){let e=Nf(i,c.x,c.z);e>=0&&(s.from=s.to=e),s.lastD=1/0}}else if(s.pauseT>0)s.pauseT-=t;else{let n=i.nodes[s.to],r=n.x-c.x,a=n.z-c.z,o=Math.hypot(r,a);if(o<Yd.arrive){let t=i.adj[s.to],n=s.from;if(t.length===1)n=t[0];else if(t.length>1)for(let r=0;r<4&&(n=t[Math.floor(Iu(e.rng)*t.length)],n===s.from);r++);s.from=s.to,s.to=n,s.lastD=1/0,Iu(e.rng)<Yd.pauseChance&&(s.pauseT=Lu(e.rng,Yd.pauseMin,Yd.pauseMax));let l=i.nodes[s.to];r=l.x-c.x,a=l.z-c.z,o=Math.hypot(r,a)}if(o>.001&&(l=r/o,u=a/o,d=s.speed),o<s.lastD-.02)s.lastD=o,s.stuckT=0;else if(s.stuckT+=t,s.stuckT>Yd.stuckTime){let e=s.from;s.from=s.to,s.to=e,s.stuckT=0,s.lastD=1/0}}if(d>0){let e=d/r.runSpeed;c.wishX=l*e,c.wishY=-u*e}}let s=Pf(e);for(let t=0;t<Yd.spawnPerStep&&a.agents.length<s;t++)If(e,i,Yd.spawnMin,Yd.spawnMax)}function Vf(e,t,n,r,i){let a=Math.hypot(n,r);if(a<1e-6){let t=Iu(e.rng)*Math.PI*2;n=Math.cos(t),r=Math.sin(t)}else n/=a,r/=a;t.fx=n,t.fz=r,t.fleeT=Math.max(t.fleeT,Lu(e.rng,Yd.fleeMin,Yd.fleeMax)*(.5+i)),t.pauseT=0}function Hf(e,t,n,r){for(let i of e.pedAI.agents){let a=i.w.x-t,o=i.w.z-n;a*a+o*o>r*r||Vf(e,i,a,o,1)}}function Uf(e){if(e.city&&e.pedAI.agents.length!==0){for(let t of e.events)if(t.type===`explode`)Hf(e,t.x,t.z,Yd.explodeRadius);else if(t.type===`crash`&&t.impact>Yd.crashImpact)Hf(e,t.x,t.z,Yd.crashRadius);else if(t.type===`punch`&&t.hit>=0){let n=e.player.walker;t.walker===n.id&&Hf(e,n.x,n.z,Yd.punchRadius)}else if(t.type===`pedHit`){let n=e.vehicles.find(e=>e.id===t.vehicle);n&&Hf(e,n.x,n.z,Yd.hitRadius)}}}var Wf=new WeakMap,Gf=16;function Kf(e){let t=Wf.get(e);if(t)return t;let n=1/0,r=1/0,i=-1/0,a=-1/0;for(let t of e.nodes)n=Math.min(n,t.x),r=Math.min(r,t.z),i=Math.max(i,t.x),a=Math.max(a,t.z);n-=Gf,r-=Gf;let o=Math.ceil((i-n)/Gf)+2,s=Math.ceil((a-r)/Gf)+2,c=[];for(let e=0;e<o*s;e++)c.push([]);let l=e.edges.length,u=new Float64Array(l),d=new Float64Array(l),f=new Uint8Array(l),p=new Uint8Array(l);for(let t of e.edges){let i=e.nodes[t.from],a=e.nodes[t.to],s=Math.max(1e-6,t.length);u[t.id]=(a.x-i.x)/s,d[t.id]=(a.z-i.z)/s,f[t.id]=qf(u[t.id],d[t.id]);let l=Math.floor((Math.min(i.x,a.x)-n)/Gf),p=Math.floor((Math.max(i.x,a.x)-n)/Gf),m=Math.floor((Math.min(i.z,a.z)-r)/Gf),h=Math.floor((Math.max(i.z,a.z)-r)/Gf);for(let e=m;e<=h;e++)for(let n=l;n<=p;n++)c[e*o+n].push(t.id)}for(let t of e.edges){if(t.kind!==`junction`||t.length<.001)continue;let n=e.inEdges[t.from],r=e.outEdges[t.to];if(n.length&&r.length){let i=n[0],a=r[0];u[i]*u[a]+d[i]*d[a]<-.9&&e.edges[i].kind===`lane`&&e.edges[a].kind===`lane`&&(p[t.id]=1)}}return t={minX:n,minZ:r,cell:Gf,nx:o,nz:s,cells:c,dx:u,dz:d,dir:f,uturn:p},Wf.set(e,t),t}function qf(e,t){return Math.abs(e)>Math.abs(t)?e>0?1:3:t>0?2:0}function Jf(e,t,n,r,i=0,a=0,o=-2,s=!1,c){let l=Kf(e),u=Math.ceil(r/l.cell),d=Math.floor((t-l.minX)/l.cell),f=Math.floor((n-l.minZ)/l.cell),p=-1,m=r,h=0;for(let r=f-u;r<=f+u;r++)if(!(r<0||r>=l.nz)){for(let c=d-u;c<=d+u;c++)if(!(c<0||c>=l.nx))for(let u of l.cells[r*l.nx+c]){let r=e.edges[u];if(s&&r.kind!==`lane`||i*l.dx[u]+a*l.dz[u]<o)continue;let c=e.nodes[r.from],d=(t-c.x)*l.dx[u]+(n-c.z)*l.dz[u];d=d<0?0:d>r.length?r.length:d;let f=Math.hypot(c.x+l.dx[u]*d-t,c.z+l.dz[u]*d-n);(f<m||f===m&&u<p)&&(m=f,p=u,h=d)}}if(p<0)return null;let g=c??{edge:0,s:0,dist:0};return g.edge=p,g.s=h,g.dist=m,g}var Yf=2.55,Xf=.1;function Zf(e,t,n,r=!0){let i=Kf(e),a=e.edges[t],o=e.outEdges[a.to];if(o.length===0)return-1;if(o.length===1)return o[0];let s=0,c=Qf;c.length=0;for(let n of o){let o=1;r&&i.uturn[n]?o=.001:i.dx[n]*i.dx[t]+i.dz[n]*i.dz[t]>.95&&(o=2),e.edges[n].width<Yf&&a.width>=Yf&&(o*=Xf),c.push(o),s+=o}let l=Iu(n)*s;for(let e=0;e<o.length;e++)if(l-=c[e],l<=0)return o[e];return o[o.length-1]}var Qf=[];function $f(e,t,n,r,i,a){let o=Kf(e),s=0,c=n+r;for(;s<t.length-1&&c>e.edges[t[s]].length;)c-=e.edges[t[s]].length,s++;let l=e.edges[t[s]];c>l.length&&(c=l.length+(c-l.length));let u=e.nodes[l.from],d=o.dx[l.id],f=o.dz[l.id];a.x=u.x+d*c-f*i,a.z=u.z+f*c+d*i,a.dx=d,a.dz=f,a.edge=l.id}function ep(e,t,n){let r=-n;for(let n of t)r+=e.edges[n].length;return r}function tp(e,t,n,r=4e3){let i=e.nodes.length;np.length!==i&&(np=new Float64Array(i),rp=new Int32Array(i),ip=new Int32Array(i)),ap++;let a=e.edges[t].to,o=e.edges[n].from;op.length=0;let s=(e,t)=>{op.push(t,e);let n=op.length/2-1;for(;n>0;){let e=n-1>>1;if(op[e*2]<=op[n*2])break;sp(n,e),n=e}},c=()=>{let e=op[1],t=op[op.length-2],n=op[op.length-1];if(op.length-=2,op.length){op[0]=t,op[1]=n;let e=0,r=op.length/2;for(;;){let t=e*2+1,n=t+1,i=e;if(t<r&&op[t*2]<op[i*2]&&(i=t),n<r&&op[n*2]<op[i*2]&&(i=n),i===e)break;sp(e,i),e=i}}return e};ip[a]=ap,np[a]=0,rp[a]=-1,s(a,0);let l=0;for(;op.length;){let t=op[0],n=c();if(!(t>np[n])){if(n===o)break;if(++l>r)return null;for(let r of e.outEdges[n]){let n=e.edges[r],i=t+n.length+(n.kind===`junction`?2:0);(ip[n.to]!==ap||i<np[n.to])&&(ip[n.to]=ap,np[n.to]=i,rp[n.to]=r,s(n.to,i))}}}if(ip[o]!==ap)return null;let u=[n],d=o;for(;d!==a;){let t=rp[d];if(t<0)return null;u.push(t),d=e.edges[t].from}return u.reverse(),u}var np=new Float64Array,rp=new Int32Array,ip=new Int32Array,ap=0,op=[];function sp(e,t){let n=op[e*2],r=op[e*2+1];op[e*2]=op[t*2],op[e*2+1]=op[t*2+1],op[t*2]=n,op[t*2+1]=r}function cp(e,t){return{count:Array(e).fill(0),axis:Array(e).fill(-1),since:Array(e).fill(0),wait:Array(2*e).fill(0),prevWait:Array(2*e).fill(0),roundabout:t}}function lp(e,t){e.count.fill(0);for(let n of t)n.holding>=0&&e.count[n.holding]++;for(let t=0;t<e.axis.length;t++)e.count[t]===0&&(e.axis[t]=-1);for(let t=0;t<e.wait.length;t++)e.prevWait[t]=e.wait[t],e.wait[t]=0}function up(e,t,n,r){return{v:e,route:t,s:n,offset:0,offsetTarget:0,cruise:r,blockedT:0,blockedBy:-1,passId:-1,passClearT:0,passTryT:0,ignoreId:-1,ignoreT:0,stuckT:0,idleT:0,reverseT:0,honkCd:0,hornT:0,waitT:0,holding:-1,lost:!1}}var dp=[],fp={x:0,z:0,dx:0,dz:0,edge:0},pp={edge:0,s:0,dist:0},mp=16,hp=new Float64Array(mp),gp=new Float64Array(mp),_p=new Float64Array(mp),vp=new Float64Array(mp),yp=new Float64Array(mp),bp=new Float64Array(mp),xp=0,Sp={o:null,gap:1/0,speed:0,latC:0,halfLat:0,halfAlong:0,creepGap:1/0};function Cp(e,t,n,r){let i=Kf(e),a=t.v,o=0;for(let s=0;s<6;s++){let s=t.route[0],c=e.edges[s],l=e.nodes[c.from],u=i.dx[s],d=i.dz[s],f=(a.x-l.x)*u+(a.z-l.z)*d;if(o=-(a.x-l.x)*d+(a.z-l.z)*u,t.s=f<0?0:f>c.length?c.length:f,t.route.length<2){if(!r)break;let i=Zf(e,s,n);if(i<0)break;t.route.push(i)}let p=t.route[1],m=e.nodes[e.edges[p].from],h=(a.x-m.x)*i.dx[p]+(a.z-m.z)*i.dz[p],g=-(a.x-m.x)*i.dz[p]+(a.z-m.z)*i.dx[p];if(f>=c.length-.05||h>.2&&Math.abs(g-t.offset)<Math.abs(o-t.offset)){t.route.shift();continue}break}if(r)for(;t.route.length<8&&ep(e,t.route,t.s)<50;){let r=Zf(e,t.route[t.route.length-1],n);if(r<0)break;t.route.push(r)}if(t.holding>=0&&e.edges[t.route[0]].kind===`lane`&&(t.route.length<2||e.edges[t.route[1]].intersection!==t.holding)&&(t.holding=-1),Math.abs(o-t.offset)>Y.resnap){let n=Math.sin(a.heading),r=-Math.cos(a.heading);if(!Jf(e,a.x,a.z,12,n,r,.3,!1,pp))return t.lost=!0,!1;t.route.length=0,t.route.push(pp.edge),t.s=pp.s,t.offset=t.offsetTarget=0,t.passId=-1,t.holding=-1,e.edges[pp.edge].kind!==`lane`&&(t.holding=e.edges[pp.edge].intersection)}return t.lost=!1,!0}function wp(e,t,n){xp=0;let r=Y.sampleStep,i=t.v,a=Math.sin(i.heading),o=-Math.cos(i.heading);for(let s=0;s<=n&&xp<mp;s+=r){let n=Math.min(1,s/6),r=t.offset+(t.offsetTarget-t.offset)*n;$f(e,t.route,t.s,s,0,fp);let c=-fp.dz,l=fp.dx,u=Math.min(1,s/8),d=(i.x+a*s)*(1-u)+(fp.x+c*r)*u,f=(i.z+o*s)*(1-u)+(fp.z+l*r)*u;hp[xp]=d,gp[xp]=f,_p[xp]=fp.dx,vp[xp]=fp.dz,yp[xp]=s,bp[xp]=(d-fp.x)*c+(f-fp.z)*l,xp++}}function Tp(e,t,n,r,i){i.o=null,i.gap=1/0,i.creepGap=1/0;let a=e.v;if(xp===0)return;let o=xp-1;Of((hp[0]+hp[o])/2,(gp[0]+gp[o])/2,Math.hypot(hp[o]-hp[0],gp[o]-gp[0])/2+6,dp);for(let o of dp){if(o.kind===mf.Vehicle&&o.id===a.id||o.id===r||o.kind===mf.Vehicle&&o.id===e.ignoreId)continue;let s=-1,c=1/0;for(let e=0;e<xp;e++){let t=o.x-hp[e],n=o.z-gp[e],r=t*t+n*n;r<c&&(c=r,s=e)}let l=_p[s],u=vp[s],d=o.x-hp[s],f=o.z-gp[s],p=d*l+f*u,m=-d*u+f*l,h=Math.atan2(l,-u),g=o.heading-h,_=Math.abs(Math.cos(g)),v=Math.abs(Math.sin(g)),y=_*o.halfL+v*o.halfW,b=v*o.halfL+_*o.halfW;if(Math.abs(m)>=n+b+Y.corridorMargin)continue;let x=yp[s]+p-t-y;if(o.id===e.passId&&Math.abs(m+bp[s]-e.offsetTarget)>=n+b+.1){x<i.creepGap&&(i.creepGap=x);continue}if(!(x<-t*.5)&&!(s===0&&p<-.2)&&x<i.gap){i.o=o,i.gap=x;let e=o.vx*l+o.vz*u,t=-o.vx*u+o.vz*l;i.speed=Math.abs(t)>1.5?Math.min(0,e):e,i.latC=m+bp[s],i.halfLat=b,i.halfAlong=y}}}function Ep(e,t,n,r,i){let a=t.v;$f(e,t.route,t.s,10,n,fp),Of(fp.x,fp.z,26,dp);let o=fp.dx,s=fp.dz;for(let e of dp){if(e.kind===mf.Vehicle&&e.id===a.id||e.id===i)continue;let c=e.x-a.x,l=e.z-a.z,u=c*o+l*s,d=-c*s+l*o+t.offset,f=Math.atan2(o,-s),p=e.heading-f,m=Math.abs(Math.sin(p))*e.halfL+Math.abs(Math.cos(p))*e.halfW;if(Math.abs(d-n)>=r+m+Y.corridorMargin)continue;let h=e.vx*o+e.vz*s<-1?30:14;if(u>-4&&u<h)return!1}return!0}function Dp(e,t,n,r,i,a,o){let s=n.v,c=q[s.type],l=c.length/2,u=c.width/2,d=td(s);n.honkCd=Math.max(0,n.honkCd-o),n.hornT=Math.max(0,n.hornT-o),n.ignoreT>0&&(n.ignoreT=Math.max(0,n.ignoreT-o),n.ignoreT===0&&(n.ignoreId=-1));let f=t.edges[n.route[0]];f.kind!==`lane`&&n.holding<0&&f.intersection>=0&&(n.holding=f.intersection,r.count[n.holding]++);let p=f.width*Y.maxOffset;n.offsetTarget>p&&(n.offsetTarget=p),n.offsetTarget<-p&&(n.offsetTarget=-p),f.kind!==`lane`&&n.passId<0&&(n.offsetTarget=0),n.offset=Hu(n.offset,n.offsetTarget,Y.offsetSpeed*o);let m=Y.typeSpeed[s.type]*n.cruise*i.speedMul,h=c.maxSpeed*.95,g=Math.min(h,f.speed*m);{let e=f.length-n.s;for(let r=1;r<n.route.length&&e<60;r++){let i=t.edges[n.route[r]],a=Math.min(h,i.speed*m),o=Math.sqrt(a*a+2*Y.planDecel*Math.max(0,e-l));o<g&&(g=o),e+=i.length}}wp(t,n,Math.min(Y.scanMax,Y.scanBase+Y.scanPerMs*Math.max(0,d))),Tp(n,l,u,-1,Sp);let _=!1;if(Sp.creepGap<6&&g>3&&(g=3),Sp.o){let e=Y.minGap+Y.gapPerMs*Math.max(0,d),t=Math.max(0,Sp.speed)+(Sp.gap-e)*.9;Sp.gap<Y.minGap*.6&&(t=0),t<0&&(t=0),t<g&&(g=t,_=g<1.5)}let v=!1,y=!1;if(i.giveWay&&n.holding<0&&f.kind===`lane`&&n.route.length>1){let i=t.edges[n.route[1]],a=i.intersection;if(i.kind===`junction`&&a>=0&&!r.roundabout[a]){let i=f.length-n.s-l-.4;if(i<14){y=!0;let s=Kf(t).dir[f.id]&1,c=Op(e,t,n,r,a,s);if(c&&i<3+Math.max(0,d)*.8)n.holding=a,r.count[a]===0&&(r.since[a]=e.time),r.count[a]++,r.axis[a]=s,n.waitT=0;else if(!c){v=!0;let e=i>.3?Math.sqrt(2*Y.planDecel*i):0;if(e<g&&(g=e),i<6){n.waitT+=o;let e=a*2+s;n.waitT>r.wait[e]&&(r.wait[e]=n.waitT)}}}}}if(_&&Sp.o){n.blockedT+=o,n.blockedBy=Sp.o.kind===mf.Vehicle?Sp.o.id:-1;let r=Sp.o,c=r.kind===mf.Vehicle?a.get(r.id):void 0,l=r.still||Math.hypot(r.vx,r.vz)<.5&&(!c||c.blockedT>3&&c.waitT===0),d=r.kind===mf.Walker?r.idx===-1:r.id===e.player.vehicleId;if(!i.urgent&&n.honkCd===0&&n.blockedT>(d?Y.honkAfter:Y.honkAfter*2)&&(n.hornT=.35,n.honkCd=Y.honkEvery+Iu(e.rng)*Y.honkJitter,e.events.push({type:`horn`,vehicle:s.id})),n.passTryT=Math.max(0,n.passTryT-o),l&&n.passTryT===0&&n.blockedT>Y.goAroundAfter*(i.urgent?.4:1)&&Sp.gap<8){n.passTryT=.6;let e=Sp.halfLat+u+.45,i=Sp.latC+e,a=Sp.latC-e,o=f.width*Y.maxOffset,s=Math.abs(i)<=Math.abs(a)+.5?i:a,c=s===i?a:i;for(let e of[s,c])if(!(Math.abs(e)>o)&&Ep(t,n,e,u,r.id)){n.offsetTarget=e,n.passId=r.id,n.passClearT=0;break}}if(c&&n.ignoreId<0){let e=c.blockedBy===s.id&&n.blockedT>Y.deadlockAfter&&c.blockedT>Y.deadlockAfter&&s.id>c.v.id,t=n.holding>=0&&c.holding<0&&c.waitT>0&&n.blockedT>1,r=n.blockedT>Y.deadlockAfter*4&&ed(c.v)<.5;(e||t||r)&&(n.ignoreId=c.v.id,n.ignoreT=3)}}else n.blockedT=Math.max(0,n.blockedT-o*2),_||(n.blockedBy=-1);(!y||n.holding>=0)&&(n.waitT=0),n.passId>=0&&(n.passClearT=Sp.o!==null&&Sp.o.id===n.passId?0:n.passClearT+o,n.passClearT>.8&&(Ep(t,n,0,u,-1)||n.passClearT>4)&&(n.passId=-1,n.offsetTarget=0)),n.ignoreId>=0&&g<2&&(g=2),n.idleT=Math.abs(d)<.5?n.idleT+o:0;let b=_&&n.passId>=0&&Sp.gap<.6;n.reverseT===0&&(g>2||b)&&Math.abs(d)<.3&&!v?n.stuckT+=o:Math.abs(d)>1&&(n.stuckT=0),n.stuckT>Y.reverseAfter&&(n.stuckT=0,n.reverseT=Y.reverseTime);let x=Y.steerLook+Y.steerLookPerMs*Math.max(0,d);$f(t,n.route,n.s,x+l*.5,n.offsetTarget,fp);let S=Uu(Math.atan2(fp.x-s.x,-(fp.z-s.z))-s.heading),C=Math.max(1,Math.hypot(fp.x-s.x,fp.z-s.z)),w=Math.abs(d),T=Math.min(1,w/c.turnFullSpeed)*(1-c.falloff*Math.min(1,w/c.maxSpeed)),E;E=T>.15?w*2*Math.sin(S)/C/(c.turn*T):S*2.5,E=E>1?1:E<-1?-1:E;let D=0,O=0,k=!1;if(n.reverseT>0)n.reverseT=Math.max(0,n.reverseT-o),O=.8,E=-E;else if(g<.3&&d<.8)k=!0;else{let e=g-d;d<-.3?D=1:e>0?D=Math.min(1,e*.6+.2):e<-.4&&d>.6&&(O=Math.min(1,Math.max(.15,-e*.35)))}return s.inThrottle=D,s.inBrake=O,s.inSteer=E,s.inHandbrake=k,s.horn=n.hornT>0,g}function Op(e,t,n,r,i,a){let o=i*2+(1-a),s;if(s=r.count[i]===0?!(r.prevWait[o]>n.waitT+.5):r.axis[i]===a&&!(e.time-r.since[i]>Y.holdMax&&r.prevWait[o]>.5),!s&&n.waitT>Y.waitMax&&(s=!0),!s)return!1;if(n.waitT>Y.waitMax)return!0;let c=Kf(t);for(let e=1;e<n.route.length;e++){let r=t.edges[n.route[e]];if(r.kind!==`lane`)continue;let i=t.nodes[r.from];Of(i.x+c.dx[r.id]*3,i.z+c.dz[r.id]*3,Y.exitClear,dp);for(let e of dp)if(!(e.kind!==mf.Vehicle||e.id===n.v.id||e.still)&&!(e.vx*c.dx[r.id]+e.vz*c.dz[r.id]>3))return!1;break}return!0}function kp(){return{density:1,agents:[],junctions:null,spawned:[],stats:{spawned:0,removed:0,stuckRemoved:0}}}function Ap(e,t){e.traffic.density=Math.max(Zd.min,Math.min(Zd.max,t))}var jp={speedMul:1,giveWay:!0,extend:!0,urgent:!1},Mp=new WeakMap;function Np(e){let t=Mp.get(e);return t||(t=e.edges.filter(e=>e.kind===`lane`&&e.length>8).map(e=>e.id),Mp.set(e,t)),t}function Pp(e){return e.player.walker}function Fp(e,t){let n=e.traffic,r=t.streets.intersections.map(e=>e.kind===`roundabout`);n.junctions=cp(t.streets.intersections.length,r);let i=Ip(e);for(let r=0;r<i*20&&n.agents.length<i;r++)Gp(e,t.lanes,Y.initialMin,Y.spawnMax)}function Ip(e){return Math.round(Y.target*e.traffic.density)}function Lp(e,t,n){let r=e.city,i=e.traffic;if(!r||!i.junctions)return;let a=r.lanes,o=Pp(e);for(let r=i.agents.length-1;r>=0;r--){let s=i.agents[r],c=s.v;if(c.driver!==`npc`||c.stage===`wreck`){i.agents.splice(r,1);continue}let l=Math.hypot(c.x-o.x,c.z-o.z),u=l>Y.offscreen;if(l>Y.despawn||u&&s.idleT>Y.stuckDespawn){l<=Y.despawn&&i.stats.stuckRemoved++,i.agents.splice(r,1),Rp(e,c);continue}if(!Cp(a,s,e.rng,!0)){if(u){i.agents.splice(r,1),Rp(e,c);continue}c.inThrottle=0,c.inBrake=0,c.inSteer=0,c.inHandbrake=!0;continue}Dp(e,a,s,i.junctions,jp,t,n)}let s=Ip(e);for(let t=0;t<Y.spawnPerStep&&i.agents.length<s;t++)Gp(e,a,Y.spawnMin,Y.spawnMax);if(e.tick%30==0)for(let t=i.spawned.length-1;t>=0;t--){let n=i.spawned[t];n.driver!==`npc`&&n.driver!==`player`&&(Math.hypot(n.x-o.x,n.z-o.z)>Y.despawn||e.vehicles.indexOf(n)<0)&&(i.spawned.splice(t,1),Rp(e,n))}}function Rp(e,t){if(e.player.vehicleId===t.id)return;let n=e.vehicles.indexOf(t);n>=0&&(e.vehicles.splice(n,1),e.traffic.stats.removed++);let r=e.traffic.spawned.indexOf(t);r>=0&&e.traffic.spawned.splice(r,1)}function zp(e,t){let n=0;for(let e of Y.mix)n+=e.weight;let r=Iu(e.rng)*n,i=Y.mix[0].type;for(let e of Y.mix)if(r-=e.weight,r<=0){i=e.type;break}return q[i].width+Y.laneMargin>t&&(i=q.rickshaw.width+Y.laneMargin<=t?`rickshaw`:`motorbike`),i}var Bp=Du(),Vp=Du(),Hp=Eu(),Up=[];function Wp(e,t,n,r,i,a){let o=q[t];Ou(Bp,n,r,i,o.width/2+a*.5,o.length/2+a);let{ex:s,ez:c}=Au(Bp),l=e.static.bounds;if(n-s<l.minX||n+s>l.maxX||r-c<l.minZ||r+c>l.maxZ)return!1;Up.length=0,e.static.query(n-s,r-c,n+s,r+c,Up);for(let e of Up)if(Mu(Bp,ku(Vp,e),Hp))return!1;let u=Math.hypot(o.length,o.width)/2+a+6;for(let t of e.vehicles){let e=t.x-n,i=t.z-r;if(!(e*e+i*i>u*u)&&Mu(Bp,nd(t,Vp),Hp))return!1}return!0}function Gp(e,t,n,r){let i=Np(t);if(i.length===0)return!1;let a=Pp(e),o=Kf(t),s=i[Math.floor(Iu(e.rng)*i.length)],c=t.edges[s];if(c.width<Y.galiWidth&&Iu(e.rng)>Y.galiSpawnChance)return!1;let l=t.nodes[c.from],u=Lu(e.rng,4,Math.max(4.1,c.length-4)),d=l.x+o.dx[s]*u,f=l.z+o.dz[s]*u,p=Math.hypot(d-a.x,f-a.z);if(p<n||p>r)return!1;let m=zp(e,c.width),h=Math.atan2(o.dx[s],-o.dz[s]);if(!Wp(e,m,d,f,h,2.5))return!1;let g=d_(e,$u(0,m,d,f,h,`npc`)),_=Lu(e.rng,Y.cruiseMin,Y.cruiseMax),v=up(g,[s],u,_);v.route.push(Zf(t,s,e.rng));let y=Math.min(c.speed*Y.typeSpeed[m]*_,q[m].maxSpeed)*.7;return g.vx=o.dx[s]*y,g.vz=o.dz[s]*y,g.inHandbrake=!1,e.traffic.agents.push(v),e.traffic.spawned.push(g),e.traffic.stats.spawned++,!0}function Kp(){return{stars:0,heat:0,seen:!1,unseenT:0,bust:0,lastSeenX:0,lastSeenZ:0,hitId:-1,hitAt:-10}}function qp(e){let t=0;for(let n of _u.thresholds)e>=n&&t++;return t}function Jp(e,t){let n=e.wanted;n.heat=Math.max(0,Math.min(_u.maxHeat,t));let r=qp(n.heat);if(r!==n.stars){let t=n.stars;n.stars=r,r>t&&(n.unseenT=0),r===0&&(n.bust=0),e.events.push({type:`wantedChanged`,stars:r,prev:t})}}function Yp(e,t){e.life.state===`alive`&&Jp(e,e.wanted.heat+t)}function Xp(e){Jp(e,0),e.wanted.unseenT=0,e.wanted.bust=0}var Zp=[];function Qp(e,t,n,r,i,a=.1){let o=Math.hypot(r-t,i-n),s=Math.floor(o/Math.min(2.5,Math.max(1,a*1.5)));for(let o=1;o<s;o++){let c=o/s,l=t+(r-t)*c,u=n+(i-n)*c;Zp.length=0,e.query(l-a,u-a,l+a,u+a,Zp);for(let e of Zp)if(Gd(e,l,u,a))return!1}return!0}function $p(e,t,n,r){for(let i of e.vehicles)if(em(i)&&!(Math.hypot(i.x-t,i.z-n)>r)&&Qp(e.static,i.x,i.z,t,n))return!0;return!1}function em(e){return e.type===`police`&&e.driver===`npc`&&e.stage!==`wreck`}function tm(e){if(e.life.state!==`alive`||!e.city)return;let t=e.player,n=t.walker,r=()=>$p(e,n.x,n.z,_u.witnessRange);for(let i of e.events)switch(i.type){case`pullOut`:Yp(e,_u.carjack*(r()?_u.witnessMul:1));break;case`pedHit`:i.vehicle===t.vehicleId&&t.vehicleId>=0&&i.speed>_u.pedHitSpeed&&Yp(e,_u.pedHit*(r()?_u.witnessMul:1));break;case`punch`:i.walker===n.id&&i.hit>=0&&Yp(e,_u.punch*(r()?_u.witnessMul:1));break;case`crash`:{if(t.vehicleId<0||i.a!==t.vehicleId&&i.b!==t.vehicleId)break;let n=i.a===t.vehicleId?i.b:i.a,r=n>=0?e.vehicles.find(e=>e.id===n):void 0;if(!r||!em(r)||r.id===e.wanted.hitId&&e.time-e.wanted.hitAt<_u.hitPoliceCooldown)break;e.wanted.hitId=r.id,e.wanted.hitAt=e.time,Yp(e,_u.hitPolice);break}case`explode`:Math.hypot(i.x-n.x,i.z-n.z)<_u.explosionRadius&&Yp(e,_u.explosion)}}function nm(e,t){let n=e.wanted;if(!e.city)return;let r=e.player.walker;if(e.tick%_u.sightEvery===0&&(n.seen=e.life.state===`alive`&&$p(e,r.x,r.z,_u.sightRange),n.seen&&(n.lastSeenX=r.x,n.lastSeenZ=r.z)),n.stars===0){n.unseenT=0,n.heat>0&&Jp(e,n.heat-_u.decayPerSec*.3*t);return}if(n.seen){n.unseenT=0;return}n.unseenT+=t,n.unseenT>_u.hideTime[n.stars]&&Jp(e,n.heat-_u.decayPerSec*t)}function rm(){return{units:[],roadblocks:[],spawnT:0,roadblockT:0,stats:{spawned:0,roadblocks:0}}}var im=q.police.width/2+.3,am={speedMul:K.chaseSpeed,giveWay:!1,extend:!0,urgent:!0},om={edge:0,s:0,dist:0};function sm(e,t,n){let r=e.city;if(!r||!e.traffic.junctions)return;let i=r.lanes,a=e.police,o=e.life.state===`alive`?e.wanted.stars:0,s=K.units[o]??0,c=Pp(e),l=Cd(e,e.player.vehicleId),u=l?l.x:c.x,d=l?l.z:c.z,f=l?l.vx:e.player.walker.vx,p=l?l.vz:e.player.walker.vz,m=q.police.length/2+(l?q[l.type].length/2:.4)+1;for(let r=a.units.length-1;r>=0;r--){let o=a.units[r],c=o.agent.v;if(c.driver!==`npc`||c.stage===`wreck`){a.units.splice(r,1),c.siren=!1,e.traffic.spawned.indexOf(c)<0&&e.traffic.spawned.push(c);continue}let l=Math.hypot(c.x-u,c.z-d);if(l>K.despawn){a.units.splice(r,1),Rp(e,c);continue}if(a.units.length>s){a.units.splice(r,1),c.siren=!1,cm(i,o.agent,c),o.agent.holding=-1,e.traffic.agents.push(o.agent),e.traffic.spawned.indexOf(c)<0&&e.traffic.spawned.push(c);continue}if((e.tick+r)%10==0&&(o.sees=l<K.pursueRange&&Qp(e.static,c.x,c.z,u,d,im)),l<16||o.sees&&l<K.pursueRange)o.mode=`pursue`,um(e,o,u,d,f,p,l,m,n);else{if(o.mode===`pursue`&&(o.mode=`route`,cm(i,o.agent,c),o.repathT=0),o.repathT-=n,o.repathT<=0&&(o.repathT=K.repath,lm(i,o.agent,u,d)),!Cp(i,o.agent,e.rng,!0)){um(e,o,u,d,f,p,l,m,n);continue}Dp(e,i,o.agent,e.traffic.junctions,am,t,n),Math.hypot(f,p)<K.boxInSpeed&&td(c)>hm(l-m)&&(c.inThrottle=0,c.inBrake=1)}}if(a.spawnT-=n,a.units.length<s&&a.spawnT<=0){let t=Math.max(0,o-1);a.spawnT=Math.max(.5,K.spawnEvery-K.spawnEveryPerStar*t),bm(e,i,u,d,vm(o))}for(let t=a.roadblocks.length-1;t>=0;t--){let r=a.roadblocks[t];r.age+=n;let i=Math.hypot(r.x-u,r.z-d);if(i>Y.despawn||r.age>K.roadblockKeep&&i>Y.offscreen||o<2&&i>Y.offscreen){for(let t of r.vehicles)t.driver===`npc`&&Rp(e,t);a.roadblocks.splice(t,1)}}o>=K.roadblockStars?(a.roadblockT-=n,a.roadblockT<=0&&a.roadblocks.length===0&&(a.roadblockT=Sm(e,i,u,d,f,p)?K.roadblockEvery:3)):a.roadblockT=Math.min(a.roadblockT,8)}function cm(e,t,n){let r=Math.sin(n.heading),i=-Math.cos(n.heading);(Jf(e,n.x,n.z,20,r,i,0,!1,om)||Jf(e,n.x,n.z,30,0,0,-2,!1,om))&&(t.route.length=0,t.route.push(om.edge),t.s=om.s,t.offset=t.offsetTarget=0,t.passId=-1)}function lm(e,t,n,r){if(!Jf(e,n,r,25,0,0,-2,!1,om))return;let i=om.edge;if(t.route[0]===i)return;let a=tp(e,t.route[0],i);if(a){t.route.length=1;for(let e of a)t.route.push(e)}}function um(e,t,n,r,i,a,o,s,c){let l=t.agent,u=l.v,d=q[u.type],f=td(u),p=t.role===1?K.leadTime:Math.min(1,o/25)*.6,m=n+i*p,h=r+a*p;if(o<8&&(m=n,h=r),t.dodgeT>0&&l.reverseT<=0){t.dodgeT=Math.max(0,t.dodgeT-c);let e=K.dodgeOffset*t.dodgeSide/Math.max(1,o);m+=-(r-u.z)*e,h+=(n-u.x)*e}let g=Uu(Math.atan2(m-u.x,-(h-u.z))-u.heading),_=g*2.2;_=_>1?1:_<-1?-1:_;let v=Math.hypot(i,a),y=1,b=0,x=!1;o<s&&v<3?(y=0,f>1?b=1:x=!0):v<K.boxInSpeed&&f>hm(o-s)?(y=0,b=1):Math.abs(g)>2.2&&f<6&&(y=0,b=1,_=-_),v<K.boxInSpeed&&y>0&&(y=Math.min(y,.5));let S=o<s+K.pushGap&&Math.abs(g)<.9,C=y>0&&!S&&mm(e,u,d);y>0&&(S&&f>.5||C)&&(y=0,f>.5&&(b=Math.max(b,.6))),l.reverseT>0?(l.reverseT=Math.max(0,l.reverseT-c),y=0,b=1,x=!1,_=-Math.sign(g)||1):(y>0||C)&&Math.abs(f)<.4?(l.stuckT+=c,l.stuckT>1.5&&(l.stuckT=0,l.reverseT=1.1,t.dodgeT=K.dodgeTime,t.dodgeSide=-t.dodgeSide)):l.stuckT=0,u.inThrottle=y*(f>d.maxSpeed*.95?0:1),u.inBrake=b,u.inSteer=_,u.inHandbrake=x,u.horn=!1}var dm=Du(),fm=Du(),pm=Eu();function mm(e,t,n){let r=Math.sin(t.heading),i=-Math.cos(t.heading),a=n.length/2+K.pushGap/2;Ou(dm,t.x+r*a,t.z+i*a,t.heading,n.width/2,K.pushGap/2);let o=td(t);for(let n of e.vehicles)if(n!==t&&n.stage!==`wreck`&&!(Math.abs(n.x-t.x)>12||Math.abs(n.z-t.z)>12)&&!(n.vx*r+n.vz*i>o+.5)&&Mu(dm,nd(n,fm),pm))return!0;return!1}function hm(e){return K.boxInCreep+Math.sqrt(2*K.boxInDecel*Math.max(0,e))}var gm=new WeakMap;function _m(e){let t=gm.get(e);return t||(t=e.edges.filter(e=>e.kind===`lane`&&e.length>10).map(e=>e.id),gm.set(e,t)),t}function vm(e){let t=K.spawnCloserPerStar*Math.max(0,e-1);return[Math.max(K.spawnFloor,K.spawnMin-t),K.spawnMax-t]}function ym(e,t,n,r){let i=K.spawnHidden;return Math.abs(e-n)<i.halfX&&t-r>-i.north&&t-r<i.south}function bm(e,t,n,r,i){let a=Kf(t),o=xm;o.length=0;for(let e of _m(t)){let s=t.edges[e],c=t.nodes[s.from],l=s.length/2,u=c.x+a.dx[e]*l,d=c.z+a.dz[e]*l,f=Math.hypot(u-n,d-r);f<i[0]||f>i[1]||ym(u,d,n,r)||((n-u)*a.dx[e]+(r-d)*a.dz[e])/f<.2||o.push(e)}for(let s=0;s<6&&o.length;s++){let s=o[Math.floor(Iu(e.rng)*o.length)],c=t.edges[s],l=t.nodes[c.from],u=Lu(e.rng,Math.min(4,c.length/2),Math.max(c.length/2,c.length-4)),d=l.x+a.dx[s]*u,f=l.z+a.dz[s]*u,p=Math.hypot(d-n,f-r);if(p<i[0]||p>i[1]||ym(d,f,n,r))continue;let m=Math.atan2(a.dx[s],-a.dz[s]);if(!Wp(e,`police`,d,f,m,2))continue;let h=d_(e,$u(0,`police`,d,f,m,`npc`));h.inHandbrake=!1,h.vx=a.dx[s]*8,h.vz=a.dz[s]*8,h.siren=!0;let g=up(h,[s],u,1),_=e.police.units.length%2;return e.police.units.push({agent:g,role:_,mode:`route`,repathT:0,sees:!1,dodgeT:0,dodgeSide:1}),e.police.stats.spawned++,!0}return!1}var xm=[];function Sm(e,t,n,r,i,a){let o=e.city;if(!o)return!1;let s=Math.hypot(i,a);if(s<6)return!1;let c=i/s,l=a/s,u=Kf(t),d=-1,f=1/0;for(let e of _m(t)){let i=t.edges[e];if(i.lane!==0||i.segment<0)continue;let a=t.nodes[i.from],o=t.nodes[i.to],s=(a.x+o.x)/2,p=(a.z+o.z)/2,m=Math.hypot(s-n,p-r);if(m<K.roadblockMin||m>K.roadblockMax||((s-n)*c+(p-r)*l)/m<.85||Math.abs(u.dx[e]*c+u.dz[e]*l)<.7)continue;let h=Math.abs(-(s-n)*l+(p-r)*c);h<f&&(f=h,d=e)}if(d<0)return!1;let p=t.edges[d],m=o.streets.segments[p.segment],h=t.nodes[p.from],g=t.nodes[p.to],_=u.dx[d],v=u.dz[d],y=v,b=-_,x=m.width/2-p.width/2,S=(h.x+g.x)/2-y*x,C=(h.z+g.z)/2-b*x,w=q.police.length,T=Math.max(1,Math.min(4,Math.round(m.width/(w+.6)))),E=Math.atan2(v,_),D={vehicles:[],x:0,z:0,age:0};for(let t=0;t<T;t++){let n=-m.width/2+(t+.5)*m.width/T,r=S+y*n,i=C+b*n;if(!Wp(e,`police`,r,i,E,.2))continue;let a=d_(e,$u(0,`police`,r,i,E,`npc`));D.vehicles.push(a),D.x+=r,D.z+=i}return D.vehicles.length!==0&&(D.x/=D.vehicles.length,D.z/=D.vehicles.length,e.police.roadblocks.push(D),e.police.stats.roadblocks++,!0)}var Cm=Du(),wm=Du(),Tm=Eu();function Em(e,t){let n=e.wanted;if(e.life.state!==`alive`||n.stars===0)return n.bust=0,!1;let r=e.player,i=r.walker,a=Cd(e,r.vehicleId),o=a?a.x:i.x,s=a?a.z:i.z,c=a?ed(a)<K.bustSpeed:Gu(i)||Math.hypot(i.vx,i.vz)<K.bustSpeed,l=!1;if(c){a&&nd(a,Cm);let t=a?q[a.type].length/2:1,n=K.bustRange+(q.police.length+q.police.width)/2+t;for(let t of e.vehicles){if(t.type!==`police`||t.driver!==`npc`||t.stage===`wreck`||t===a||Math.abs(t.x-o)>n||Math.abs(t.z-s)>n)continue;let e=q[t.type];if(a?(Ou(wm,t.x,t.z,t.heading,e.width/2+K.bustRange,e.length/2+K.bustRange),l=Mu(wm,Cm,Tm)):(Ou(wm,t.x,t.z,t.heading,e.width/2,e.length/2),l=Pu(o,s,wm)<K.bustRange+.4),l)break}}let u=!c;return n.bust=l?Math.min(1,n.bust+t/K.bustTime):Math.max(0,n.bust-t/(u?K.bustDecayMoving:K.bustDecayStill)),n.bust>=1}function Dm(){return{state:`alive`,deathX:0,deathZ:0,lastLoss:0,lastAt:``,reviveT:0,insideShop:-1}}function Om(){return{hospital:{x:0,z:0},station:{x:0,z:0},paintShops:[]}}function km(e,t){let n=Nf(e.peds,t.x,t.z);return n>=0?{x:e.peds.nodes[n].x,z:e.peds.nodes[n].z}:{x:e.spawn.x,z:e.spawn.z}}function Am(e){let t=km(e,e.places.hospital),n=km(e,e.places.police),r=e.lanes,i=Kf(r),a=[];for(let t of e.places.paintShops){let e=Jf(r,t.x,t.z,120,0,0,-2,!0);if(!e)continue;let n=r.edges[e.edge],o=Math.max(Math.min(6,n.length/2),Math.min(e.s,n.length-6)),s=r.nodes[n.from];a.push({x:s.x+i.dx[n.id]*o,z:s.z+i.dz[n.id]*o})}return{hospital:t,station:n,paintShops:a}}function jm(e,t,n){return Math.max(0,Math.min(e,Math.max(n,Math.round(e*t))))}function Mm(e){let t=e.player,n=e.life;if(n.state!==`alive`)return;let r=jm(t.money,yu.bustedFineFrac,yu.bustedFineMin);t.money-=r,n.lastLoss=r,n.state=`busted`,n.reviveT=0,t.spawnX=e.places.station.x,t.spawnZ=e.places.station.z,t.downT=yu.bustedDelay,Xp(e),e.events.push({type:`busted`,fine:r})}function Nm(e){let t=e.player,n=e.life,r=jm(t.money,yu.hospitalFeeFrac,yu.hospitalFeeMin);t.money-=r,n.lastLoss=r,n.state=`wasted`,n.deathX=t.walker.x,n.deathZ=t.walker.z,n.reviveT=0,t.spawnX=e.places.hospital.x,t.spawnZ=e.places.hospital.z,Xp(e),e.events.push({type:`wasted`,loss:r})}function Pm(e){if(e.life.state===`alive`)return;let t=Cd(e,e.player.vehicleId);t&&(t.inThrottle=0,t.inBrake=0,t.inSteer=0,t.inHandbrake=!0,t.horn=!1)}function Fm(e,t){let n=e.life,r=e.player;n.reviveT>0&&(n.reviveT=Math.max(0,n.reviveT-t));for(let t of e.events)if(t.type===`playerDown`&&n.state===`alive`)Nm(e);else if(t.type===`respawn`&&n.state!==`alive`){let t=n.state===`busted`?`station`:`hospital`;n.state=`alive`,n.lastAt=t,n.reviveT=t===`hospital`?yu.reviveWindow:0,e.events.push({type:`respawned`,at:t,x:r.walker.x,z:r.walker.z});break}let i=Cd(e,r.vehicleId);if(!i||n.state!==`alive`){n.insideShop=-1;return}let a=-1;if(e.places.paintShops.forEach((e,t)=>{Math.hypot(i.x-e.x,i.z-e.z)<vu.radius&&(a=t)}),a<0){if(n.insideShop>=0){let t=e.places.paintShops[n.insideShop];Math.hypot(i.x-t.x,i.z-t.z)>vu.radius+2&&(n.insideShop=-1)}return}if(a===n.insideShop||ed(i)>vu.maxSpeed||r.money<vu.cost)return;n.insideShop=a,r.money-=vu.cost,i.paint=i.paint%(vu.tints.length-1)+1;let o=e.wanted.stars>0&&!(vu.requireUnseen&&e.wanted.seen);(o||e.wanted.stars===0)&&Xp(e),e.events.push({type:`paintShop`,vehicle:i.id,paint:i.paint,cleared:o})}function Im(e){let t=e.life,n=e.player;if(!(t.state===`wasted`||t.state===`alive`&&t.lastAt===`hospital`&&t.reviveT>0))return!1;let i=Cd(e,n.vehicleId);i&&(i.driver=`none`),n.vehicleId=-1;let a=n.walker,o=t.deathX,s=t.deathZ;if(!bd(o,s,r.radius,e.static,e.vehicles)&&e.city){let t=Nf(e.city.peds,o,s);t>=0&&(o=e.city.peds.nodes[t].x,s=e.city.peds.nodes[t].z)}return a.x=a.px=o,a.z=a.pz=s,a.vx=a.vz=0,a.health=a.maxHealth,a.knockT=0,a.hidden=!1,n.downT=0,n.money+=t.lastLoss,t.lastLoss=0,t.state=`alive`,t.lastAt=`deathSpot`,t.reviveT=0,e.events.push({type:`respawned`,at:`deathSpot`,x:o,z:s}),!0}function Lm(e){return e.wanted.stars===0&&e.wanted.heat===0?!1:(Xp(e),!0)}function Rm(e){let t=Cd(e,e.player.vehicleId);return!t||t.stage===`wreck`?!1:(t.health=q[t.type].health,t.stage=`ok`,!0)}function zm(e){return e.life.state===`alive`||e.player.downT<=0?!1:(e.player.downT=1e-6,!0)}function Bm(e){return e.life.state===`busted`&&e.life.lastLoss>0}function Vm(e){let t=e.life;return Bm(e)?(e.player.money+=t.lastLoss,t.lastLoss=0,!0):!1}function Hm(e){let t=Cd(e,e.player.vehicleId);return!!t&&t.stage!==`wreck`&&t.health<q[t.type].health*.7}var Um=[{id:`firstFare`,district:`bazaar`,start:{role:`stall`,district:`bazaar`,n:0},steps:[{kind:`pickUp`,what:`passenger`,at:{role:`stall`,district:`bazaar`,n:4}},{kind:`timer`,seconds:95},{kind:`deliver`,at:{role:`temple`}},{kind:`timer`,seconds:0}],reward:150,rep:4},{id:`bangles`,district:`bazaar`,start:{role:`stall`,district:`bazaar`,n:2},steps:[{kind:`pickUp`,what:`package`,at:{role:`stall`,district:`bazaar`,n:9},fragile:!0},{kind:`timer`,seconds:120},{kind:`deliver`,at:{role:`stall`,district:`newtown`,n:3}},{kind:`timer`,seconds:0}],reward:220,rep:5},{id:`bazaarDash`,district:`bazaar`,start:{role:`stall`,district:`bazaar`,n:6},vehicle:!0,steps:[{kind:`timer`,seconds:90},{kind:`checkpoints`,district:`oldcity`,count:6},{kind:`timer`,seconds:0}],reward:260,rep:6},{id:`heatWave`,district:`riverside`,start:{role:`temple`},steps:[{kind:`surviveStars`,stars:2,seconds:45}],reward:320,rep:8},{id:`hotTruck`,district:`newtown`,start:{role:`stall`,district:`newtown`,n:0},steps:[{kind:`stealVehicle`,model:`truck`,at:{role:`stall`,district:`newtown`,n:6}},{kind:`goTo`,at:{place:`garage`},need:`mission`,radius:8}],reward:380,rep:8,unlock:`truck`},{id:`chainSnatcher`,district:`mistri`,start:{role:`docks`},vehicle:!0,steps:[{kind:`timer`,seconds:100},{kind:`stopVehicle`,model:`taxi`},{kind:`timer`,seconds:0}],reward:450,rep:10}],Wm={levels:[0,8,20,32,50,75],district:{bazaar:0,oldcity:0,riverside:1,newtown:2,basti:2,mistri:3,qila:4},perFare:1},Gm={startRadius:4.5,startMaxSpeed:6,startCooldown:4,arriveRadius:7,arriveMaxSpeed:4,checkpointRadius:9,boardRadius:10,boardMaxSpeed:2.5,boardReach:2.4,boardTimeout:5,fragileDamage:9,fragileMinImpact:2.5,fleeMin:45,fleeMax:90,fleeSpeedMul:1.45,stopSpeed:1.2,stopHold:2.5,stopNear:22,escapeDist:240,escapeTime:8,leaveTime:12},Km={vehicles:[`rickshaw`,`taxi`],hailMin:2,hailMax:6,hailDistMin:22,hailDistMax:60,hailCancel:140,tripMin:140,tripMax:380,flag:15,perMetre:.12,parBase:12,parSpeed:7,speedTipMax:.6,noTipDamage:30,minImpact:2},qm={radius:6,vehicles:[{type:`taxi`,price:300},{type:`motorbike`,price:450},{type:`truck`,price:900},{type:`bus`,price:1200}],free:[`rickshaw`],repairFull:90,repairMin:10,healCost:40},Jm={key:`rr.progress`,version:2,autosaveEvery:60};function Ym(e,t,n){let r=Math.round(Km.flag+e*Km.perMetre),i=Km.parBase+e/Km.parSpeed,a=Math.max(0,Math.min(1,(i-t)/i)),o=Math.max(0,1-n/Km.noTipDamage),s=Math.round(r*Km.speedTipMax*a*o);return{fare:r,tip:s,total:r+s}}function Xm(e){let t=0;for(let n=1;n<Wm.levels.length;n++)e>=Wm.levels[n]&&(t=n);return t}function Zm(e,t){return Xm(e.missions.rep)>=Wm.district[t]}function Qm(e,t){return Zm(e,t.district)&&!e.missions.completed.includes(t.id)}function $m(e){return Um.find(t=>t.id===e)}function eh(e){if(!e.city||e.life.state!==`alive`)return!1;let t=Cd(e,e.player.vehicleId),n=t??e.player.walker,r=e.missions.garage;return Math.hypot(n.x-r.x,n.z-r.z)<qm.radius&&(!t||ed(t)<4)}function th(e,t){return qm.free.includes(t)||e.missions.unlocked.includes(t)}function nh(e){return qm.vehicles.find(t=>t.type===e)?.price??0}function rh(e){let t=Cd(e,e.player.vehicleId);if(!t||t.stage===`wreck`)return 0;let n=q[t.type].health,r=(n-t.health)/n;return r<.02?0:Math.max(qm.repairMin,Math.round(r*qm.repairFull))}function ih(e){let t=e.player.walker;return t.health<t.maxHealth?qm.healCost:0}function ah(e,t){if(!eh(e)||th(e,t))return!1;let n=nh(t);return n<=0||e.player.money<n||!lh(e,t)?!1:(e.player.money-=n,e.missions.unlocked.push(t),e.events.push({type:`garage`,action:`buy`,cost:n,vehicle:t}),!0)}function oh(e,t){return!eh(e)||!th(e,t)||!lh(e,t)?!1:(e.events.push({type:`garage`,action:`take`,cost:0,vehicle:t}),!0)}function sh(e){let t=rh(e),n=Cd(e,e.player.vehicleId);return!eh(e)||!n||t<=0||e.player.money<t?!1:(e.player.money-=t,n.health=q[n.type].health,n.stage=`ok`,e.events.push({type:`garage`,action:`repair`,cost:t,vehicle:n.type}),!0)}function ch(e){let t=ih(e);return!eh(e)||t<=0||e.player.money<t?!1:(e.player.money-=t,e.player.walker.health=e.player.walker.maxHealth,e.events.push({type:`garage`,action:`heal`,cost:t,vehicle:``}),!0)}function lh(e,t){let n=e.missions.garage,r=e.missions.garageHeading,i=Math.sin(r),a=-Math.cos(r),o=Math.max(0,e.missions.garageHalf-q[t].width/2-.15);for(let s of[8,-8,14,-14,20,-20,26,-26]){let c=n.x+i*s-Math.cos(r)*o,l=n.z+a*s-Math.sin(r)*o;if(Wp(e,t,c,l,r,.6))return d_(e,$u(0,t,c,l,r,`none`)),!0}return!1}var uh=1851877232,dh={ring:10.5,main:10.5,street:7,bazaar:6,gali:4,dirt:3.5,ghat:4},fh=[3.5,5],ph=new Set([`ghat`]),mh=[[-150,-95],[-138,-160],[-100,-212],[-22,-230],[58,-220],[112,-186],[130,-112],[134,-40],[120,14],[68,40],[0,48],[-78,40],[-132,6],[-152,-40]],hh=[{id:`gate-w`,name:`Lahori Darwaza`,at:[-151,-62],width:10},{id:`gate-n`,name:`Qila Darwaza`,at:[-22,-230],width:10},{id:`gate-e`,name:`Ghat Darwaza`,at:[132.6,-76],width:10},{id:`gate-s`,name:`Sadar Darwaza`,at:[0,48],width:10}],gh=`Parikrama Road`,_h=[[214,-262],[206,-180],[204,-100],[206,-40],[200,40],[196,120],[190,200],[186,262]],vh=[{id:`ghat-mandir`,name:`Mandir Ghat`,z0:-162,z1:-90,inland:5,water:4},{id:`ghat-pul`,name:`Pul Ghat`,z0:-62,z1:-14,inland:5,water:4},{id:`ghat-shamshan`,name:`Purana Ghat`,z0:-6,z1:22,inland:5,water:3}],yh={road:`pul-road`,name:`Lohe ka Pul`,z:-76,deckWidth:11},bh={pts:[[-243,-262],[-243,262]],width:12,tracks:[-2.4,2.4],crossing:{road:`mg-road`,at:[-243,140]}},xh=[{id:`bara-bazar`,name:`Bara Bazar`,cls:`bazaar`,pts:[[-151,-62],[-118,-66],[-82,-80],[-45,-90],[-8,-86],[30,-76],[68,-70],[100,-80],[132.6,-76]]},{id:`chandni-marg`,name:`Chandni Marg`,cls:`street`,pts:[[-22,-244],[-22,-230],[-30,-190],[-16,-140],[-8,-86]]},{id:`sadar-marg`,name:`Sadar Marg`,cls:`street`,pts:[[-8,-86],[6,-40],[-4,10],[0,48]]},{id:`kotwali-gali`,name:`Kotwali Gali`,cls:`gali`,width:4.5,pts:[[-8,-86],[-24,-66],[-44,-50],[-72,-34],[-104,-14]]},{id:`kinari-gali`,name:`Kinari Gali`,cls:`gali`,width:5,pts:[[30,-76],[40,-112],[60,-150],[82,-182]]},{id:`phool-gali`,name:`Phool Gali`,cls:`gali`,width:4.5,pts:[[68,-70],[86,-40],[94,0],[80,22]]},{id:`chhatta-gali`,name:`Chhatta Gali`,cls:`gali`,width:4,pts:[[-82,-80],[-92,-120],[-80,-160],[-58,-196]]},{id:`paranthe-gali`,name:`Paranthe Gali`,cls:`gali`,width:3.8,pts:[[-16,-140],[18,-152],[48,-190]]},{id:`pul-road`,name:`Pul Road`,cls:`main`,pts:[[132.6,-76],[149,-76],[176,-76],[204,-76],[262,-76]],straight:!0,exit:!0},{id:`ghat-road`,name:`Ghat Road`,cls:`street`,pts:[[180,-76],[186,-20],[182,60],[176,140],[172,184]]},{id:`bagh-road`,name:`Bagh Road`,cls:`street`,pts:[[111,-205],[118,-212],[150,-216],[178,-206],[195,-164]]},{id:`mandir-marg`,name:`Mandir Marg`,cls:`street`,width:6,pts:[[168,-76],[170,-90]],straight:!0},{id:`station-road`,name:`Station Road`,cls:`main`,pts:[[-151,-62],[-167,-62],[-182,-66],[-198,-70]],straight:!0},{id:`rail-colony-road`,name:`Rail Colony Road`,cls:`street`,pts:[[-190,-150],[-190,-100],[-188,-62],[-185,0],[-190,60],[-200,95],[-205,140],[-205,200],[-205,262]],exit:!0},{id:`mistri-gali`,name:`Mistri Gali`,cls:`street`,pts:[[-186,-14],[-210,-12],[-230,-10]]},{id:`qila-marg`,name:`Qila Marg`,cls:`street`,pts:[[-156,-150],[-190,-150],[-220,-155],[-229,-165],[-220,-174],[-182,-176],[-170,-184],[-178,-193],[-200,-197],[-200,-200]]},{id:`nehru-marg`,name:`Nehru Marg`,cls:`main`,pts:[[0,48],[0,63],[0,100],[0,124]],straight:!0},{id:`nehru-marg-s`,name:`Nehru Marg`,cls:`main`,pts:[[0,156],[0,200],[0,262]],straight:!0,exit:!0},{id:`mg-road-w`,name:`MG Road`,cls:`main`,pts:[[-262,140],[-243,140],[-205,140],[-115,140],[-16,140]],straight:!0,exit:!0},{id:`mg-road-e`,name:`MG Road`,cls:`main`,pts:[[16,140],[90,140],[150,141],[176,140]],straight:!0},{id:`flyover`,name:`Naya Flyover`,cls:`main`,width:8,pts:[[-100,140],[-76,140],[-44,140],[44,140],[76,140],[100,140]],level:[0,.45,1,1,.45,0],straight:!0},{id:`mall-road`,name:`Mall Road`,cls:`street`,pts:[[-200,95],[-118,95],[-40,92],[0,92],[60,95],[120,98],[181,100]]},{id:`kachehri-road`,name:`Kachehri Road`,cls:`street`,pts:[[-121,33],[-118,95],[-115,140],[-112,160],[-110,262]],exit:!0},{id:`aspatal-road`,name:`Aspatal Road`,cls:`street`,pts:[[-110,215],[-50,213],[0,215],[98,215]]},{id:`bus-adda-road`,name:`Bus Adda Road`,cls:`street`,pts:[[95,46],[95,95],[95,140],[98,215],[104,262]],exit:!0},{id:`ghat-path`,name:`Ghat Path`,cls:`ghat`,pts:[[195,-164],[196,-120],[196,-76],[197,-40],[194,0],[192,24]]}],Sh={id:`naya-chauraha`,name:`Naya Chauraha`,at:[0,140],radius:16,island:10},Ch=[{id:`ghanta-ghar-chowk`,name:`Ghanta Ghar Chowk`,poly:[[-26,-94],[-14,-106],[10,-104],[17,-72],[-22,-66]]},{id:`station-forecourt`,name:`Station Forecourt`,poly:[[-207,-96],[-190,-96],[-189,-46],[-207,-46]]}],wh=[-17,-99.5],Th={at:[-200,-205],rx:52,rz:50},Eh=[{id:`station`,poly:[[-237,-112],[-193,-112],[-193,-38],[-237,-38]]},{id:`mechanic`,poly:[[-237,-36],[-191,-36],[-191,16],[-237,16]]},{id:`basti`,poly:[[108,222],[124,196],[168,194],[170,262],[104,262]]},{id:`riverside`,poly:[[150,-262],[262,-262],[262,160],[150,160]]}],Dh=[{id:`bazaar`,name:`Bara Bazar`},{id:`oldcity`,name:`Purana Shahar`},{id:`riverside`,name:`Ghat Mohalla`},{id:`newtown`,name:`Naya Shahar`},{id:`mistri`,name:`Mistri Bazar`},{id:`basti`,name:`Dhobi Basti`},{id:`qila`,name:`Qila Pahadi`}],X=(e,t,n,r)=>[[e,t],[n,t],[n,r],[e,r]],Oh=[{id:`ghanta-ghar`,name:`Ghanta Ghar (clock tower)`,kind:`clockTower`,parts:[{poly:X(-23.2,-96.7,-19.8,-93.3),h:11.5}],compound:X(-24,-97.5,-19,-92.5),access:[-17,-97]},{id:`bada-mandir`,name:`Bada Mandir`,kind:`temple`,parts:[{poly:X(168,-128,182,-114),h:22},{poly:X(170,-114,180,-104),h:9},{poly:X(158,-146,190,-142),h:4},{poly:X(158,-142,162,-100),h:4},{poly:X(186,-142,190,-100),h:4},{poly:X(158,-100.4,166.7,-97.6),h:4},{poly:X(173.3,-100.4,190,-97.6),h:4}],compound:X(156,-148,191,-94),access:[170,-92]},{id:`qila`,name:`Nagarpur Qila (fort)`,kind:`fort`,parts:[{poly:[[-226,-246],[-176,-248],[-170,-222],[-178,-207],[-222,-205],[-230,-224]],h:10}],compound:[[-232,-252],[-170,-254],[-163,-220],[-175,-202],[-226,-201],[-236,-226]],access:[-200,-199]},{id:`station`,name:`Nagarpur Junction (station)`,kind:`station`,parts:[{poly:X(-230,-94,-209,-50),h:8},{poly:X(-236,-106,-233,-36),h:4}],compound:X(-237,-110,-208,-38),access:[-200,-70]},{id:`raju-motors`,name:`Raju Motor Works`,kind:`garage`,parts:[{poly:X(-228,-32,-212,-20),h:5}],compound:X(-230,-34,-210,-17),access:[-214,-15]},{id:`paint-1`,name:`Rangeela Paint Shop`,kind:`paintShop`,parts:[{poly:X(-226,-2,-210,10),h:5}],compound:X(-228,-5,-208,12),access:[-214,-7]},{id:`paint-2`,name:`Chamak Spray Works`,kind:`paintShop`,parts:[{poly:X(46,120,62,131),h:5}],compound:X(44,118,66,133),access:[56,134]},{id:`paint-3`,name:`Naya Rang Garage`,kind:`paintShop`,parts:[{poly:X(76,172,88,186),h:5}],compound:X(73,168,90,190),access:[92,180]},{id:`cinema`,name:`Roshan Talkies (cinema)`,kind:`cinema`,parts:[{poly:X(-74,104,-40,126),h:14}],compound:X(-78,99,-36,130),access:[-56,98]},{id:`kotwali`,name:`Kotwali (police station)`,kind:`police`,parts:[{poly:X(118,106,146,116),h:8},{poly:X(118,116,126,128),h:8}],compound:X(114,104,150,133),access:[130,102]},{id:`bus-adda`,name:`Bus Adda (bus stand)`,kind:`busStand`,parts:[{poly:X(112,150,158,156),h:5},{poly:X(112,156,118,192),h:5}],compound:X(104,147,162,196),access:[100,170]},{id:`aspatal`,name:`Zila Aspatal (hospital)`,kind:`hospital`,parts:[{poly:X(22,228,72,238),h:12},{poly:X(22,238,32,254),h:12},{poly:X(62,238,72,254),h:12}],compound:X(10,220,80,258),access:[40,219]},{id:`maidan`,name:`Gandhi Maidan`,kind:`maidan`,parts:[{poly:X(-178,196,-174,200),h:3}],compound:X(-195,150,-122,236),access:[-118,190]},{id:`pani-tanki`,name:`Pani Tanki (water tower)`,kind:`waterTower`,parts:[{poly:X(-90,64,-82,72),h:22}],compound:X(-93,61,-79,75),access:[-86,59]},{id:`dhobi-ghat`,name:`Dhobi Ghat`,kind:`dhobiGhat`,parts:[],compound:[[168,188],[189,188],[186,258],[170,258]],access:[172,186]},{id:`phool-mandi`,name:`Phool Mandi (flower market)`,kind:`market`,parts:[{poly:X(158,-62,172,-52),h:4}],compound:X(156,-66,175,-48),access:[178,-57]},{id:`jama-gumbad`,name:`Purani Masjid`,kind:`mosqueDome`,parts:[{poly:X(-76,-144,-62,-130),h:12}],compound:X(-80,-148,-58,-126),access:[-84,-137]},{id:`ghats`,name:`Ghats`,kind:`market`,parts:[],compound:X(198,-60,200,-58),access:[196,-60],onFoot:!0}],kh=[[-34,-64],[-160,170],[150,236],[40,70],[-150,-24],[186,-132]],Ah=[{id:`auto-station`,at:[-198,-84],heading:0},{id:`auto-chowk`,at:[-1.5,-91.5],heading:1.57},{id:`auto-ghat-gate`,at:[150,-84],heading:0},{id:`auto-bus-adda`,at:[102,160],heading:0},{id:`auto-chauraha`,at:[-26,126],heading:1.57}],jh=[{kind:`chai`,at:[-4.5,-101],heading:1.57,r:1},{kind:`cart`,at:[-17.5,-92.3],heading:1.57,r:.9},{kind:`cart`,at:[-26.5,-92],heading:1.57,r:.9},{kind:`stall`,at:[-15.5,-92.4],heading:1.57,r:1},{kind:`bikes`,at:[-4.6,-96.5],heading:0,r:1},{kind:`shrine`,at:[-14.8,-103.6],heading:0,r:.8},{kind:`banyan`,at:[4.2,-98],heading:0,r:3.6}],Mh=[{kind:`flowers`,at:[161,-96.2],heading:1.57,r:1},{kind:`flowers`,at:[163.6,-96.2],heading:1.57,r:1},{kind:`flowers`,at:[176.4,-96.2],heading:1.57,r:1},{kind:`flowers`,at:[179,-96.2],heading:1.57,r:1},{kind:`shrine`,at:[182.5,-96.4],heading:0,r:.8}],Nh=[{id:`cows-bazaar`,poly:X(30,-86,70,-64)},{id:`cows-chowk`,poly:X(-30,-104,-14,-92)},{id:`cows-ghat-road`,poly:X(176,-20,192,50)},{id:`cows-maidan`,poly:X(-122,160,-108,230)},{id:`cows-basti`,poly:X(110,200,140,240)},{id:`cows-sadar`,poly:X(-10,0,10,40)}],Ph=[{role:`spawn`,at:`ghanta-ghar`},{role:`respawn`,at:`aspatal`},{role:`arrest`,at:`kotwali`},{role:`repair`,at:`raju-motors`},{role:`respray`,at:`paint-1`},{role:`respray`,at:`paint-2`},{role:`respray`,at:`paint-3`},{role:`fare`,at:`station`},{role:`fare`,at:`bus-adda`},{role:`fare`,at:`bada-mandir`},{role:`fare`,at:`aspatal`},{role:`fare`,at:`cinema`},{role:`delivery`,at:`phool-mandi`},{role:`delivery`,at:`ghanta-ghar`},{role:`delivery`,at:`dhobi-ghat`},{role:`raceStart`,at:`ghanta-ghar`},{role:`raceFinish`,at:`qila`},{role:`chaseEscape`,at:`jama-gumbad`},{role:`drift`,at:`maidan`},{role:`footChase`,at:`ghats`}],Fh=[`Mochi Gali`,`Haldi Gali`,`Pipal Gali`,`Sunar Gali`,`Chudi Gali`,`Kumhar Gali`,`Batashe Gali`,`Masala Gali`,`Teli Gali`,`Dariba Gali`,`Nai Gali`,`Kabutar Gali`,`Jalebi Gali`,`Lal Kuan Gali`,`Bhojpuri Gali`,`Kagzi Gali`],Ih=(e,t)=>Math.hypot(e[0]-t[0],e[1]-t[1]);function Lh(e,t,n=!1){let r=e.length;if(r<3&&!n)return Rh(e,t);let i=t=>n?e[(t%r+r)%r]:e[Math.max(0,Math.min(r-1,t))],a=[],o=n?r:r-1;for(let e=0;e<o;e++){let n=i(e-1),r=i(e),o=i(e+1),s=i(e+2),c=Math.max(1,Math.ceil(Ih(r,o)/t));for(let e=0;e<c;e++){let t=e/c,i=t*t,l=i*t,u=(e,n,r,a)=>.5*(2*n+(-e+r)*t+(2*e-5*n+4*r-a)*i+(-e+3*n-3*r+a)*l);a.push([u(n[0],r[0],o[0],s[0]),u(n[1],r[1],o[1],s[1])])}}return n||a.push([e[r-1][0],e[r-1][1]]),a}function Rh(e,t){let n=[[e[0][0],e[0][1]]];for(let r=1;r<e.length;r++){let i=e[r-1],a=e[r],o=Math.max(1,Math.ceil(Ih(i,a)/t));for(let e=1;e<=o;e++)n.push([i[0]+(a[0]-i[0])*e/o,i[1]+(a[1]-i[1])*e/o])}return n}function zh(e,t,n=!1){let r=e.map(e=>[e[0],e[1]]);for(let e=0;e<t;e++){let e=[],t=r.length;n||e.push(r[0]);let i=n?t:t-1;for(let n=0;n<i;n++){let i=r[n],a=r[(n+1)%t];e.push([i[0]*.75+a[0]*.25,i[1]*.75+a[1]*.25]),e.push([i[0]*.25+a[0]*.75,i[1]*.25+a[1]*.75])}n||e.push(r[t-1]),r=e}return r}function Bh(e,t,n){let r=n[0]-t[0],i=n[1]-t[1],a=r*r+i*i,o=a>0?((e[0]-t[0])*r+(e[1]-t[1])*i)/a:0;return o=Math.max(0,Math.min(1,o)),Math.hypot(e[0]-t[0]-r*o,e[1]-t[1]-i*o)}function Vh(e,t){let n={d:1/0,i:0,x:t[0][0],z:t[0][1]};for(let r=1;r<t.length;r++){let i=t[r-1],a=t[r],o=a[0]-i[0],s=a[1]-i[1],c=o*o+s*s,l=c>0?((e[0]-i[0])*o+(e[1]-i[1])*s)/c:0;l=Math.max(0,Math.min(1,l));let u=i[0]+o*l,d=i[1]+s*l,f=Math.hypot(e[0]-u,e[1]-d);f<n.d&&(n={d:f,i:r-1,x:u,z:d})}return n}function Hh(e,t,n,r){let i=(e,t,n)=>(t[0]-e[0])*(n[1]-e[1])-(t[1]-e[1])*(n[0]-e[0]),a=i(n,r,e),o=i(n,r,t),s=i(e,t,n),c=i(e,t,r);return a*o<0&&s*c<0}function Uh(e,t){let n=!1;for(let r=0,i=t.length-1;r<t.length;i=r++){let a=t[r],o=t[i];a[1]>e[1]!=o[1]>e[1]&&e[0]<(o[0]-a[0])*(e[1]-a[1])/(o[1]-a[1])+a[0]&&(n=!n)}return n}function Wh(e){let t=0;for(let n=0,r=e.length-1;n<e.length;r=n++)t+=e[r][0]*e[n][1]-e[n][0]*e[r][1];return t/2}function Gh(e){let t=0,n=0;for(let r of e)t+=r[0],n+=r[1];return[t/e.length,n/e.length]}function Kh(e,t){let n=e.length,r=Wh(e)>0?1:-1,i=[];for(let a=0;a<n;a++){let o=e[(a+n-1)%n],s=e[a],c=e[(a+1)%n],l=qh([s[1]-o[1],-(s[0]-o[0])]),u=qh([c[1]-s[1],-(c[0]-s[0])]),d=qh([l[0]+u[0],l[1]+u[1]]),f=Math.max(.5,d[0]*l[0]+d[1]*l[1]);i.push([s[0]-r*d[0]*t/f,s[1]-r*d[1]*t/f])}return i}function qh(e){let t=Math.hypot(e[0],e[1])||1;return[e[0]/t,e[1]/t]}function Jh(e,t){if(e.length<3)return e.map(e=>[e[0],e[1]]);let n=new Uint8Array(e.length);n[0]=n[e.length-1]=1;let r=[[0,e.length-1]];for(;r.length;){let[i,a]=r.pop(),o=0,s=-1;for(let t=i+1;t<a;t++){let n=Bh(e[t],e[i],e[a]);n>o&&(o=n,s=t)}o>t&&s>0&&(n[s]=1,r.push([i,s],[s,a]))}let i=[];for(let t=0;t<e.length;t++)n[t]&&i.push([e[t][0],e[t][1]]);return i}function Yh(e,t,n,r,i,a){let o=-r,s=n;return[[e-n*i-o*a,t-r*i-s*a],[e+n*i-o*a,t+r*i-s*a],[e+n*i+o*a,t+r*i+s*a],[e-n*i+o*a,t-r*i+s*a]]}function Xh(e,t,n=.05){for(let r of[e,t])for(let i=0;i<r.length;i++){let a=r[i],o=r[(i+1)%r.length],s=-(o[1]-a[1]),c=o[0]-a[0],l=Math.hypot(s,c)||1,u=1/0,d=-1/0,f=1/0,p=-1/0;for(let t of e){let e=(t[0]*s+t[1]*c)/l;u=Math.min(u,e),d=Math.max(d,e)}for(let e of t){let t=(e[0]*s+e[1]*c)/l;f=Math.min(f,t),p=Math.max(p,t)}if(d-n<=f||p-n<=u)return!1}return!0}function Zh(e,t,n){if(Uh(e,n)||Uh(t,n))return 0;let r=1/0;for(let i=0;i<n.length;i++){let a=n[i],o=n[(i+1)%n.length];if(Hh(e,t,a,o))return 0;r=Math.min(r,Bh(a,e,t),Bh(e,a,o),Bh(t,a,o))}return r}var Qh=null,$h=e=>Eh.find(t=>t.id===e).poly,eg=Oh.find(e=>e.kind===`fort`).compound,tg=Oh.find(e=>e.kind===`dhobiGhat`).compound;function ng(e,t){let n=[e,t];if(Uh(n,mh))return Qh??(Qh=Lh(xh.find(e=>e.id===`bara-bazar`).pts,2)),Vh(n,Qh).d<=18?`bazaar`:`oldcity`;let r=(e-Th.at[0])/Th.rx,i=(t-Th.at[1])/Th.rz;return r*r+i*i<1||Uh(n,eg)?`qila`:Uh(n,$h(`station`))||Uh(n,$h(`mechanic`))||e<-160&&t<60?`mistri`:Uh(n,$h(`basti`))||Uh(n,tg)?`basti`:Uh(n,$h(`riverside`))?`riverside`:t>55?`newtown`:``}function rg(e){return Dh.find(t=>t.id===e)?.name??``}var ig=new WeakMap,ag=8;function og(e){let t=ig.get(e);if(t)return t;let n=new Map;for(let t of e.lanes.nodes){let e=ng(t.x,t.z);if(!e)continue;let r=n.get(e)??{x:0,z:0,n:0};r.x+=t.x,r.z+=t.z,r.n++,n.set(e,r)}let r=new Map;for(let[e,t]of n)r.set(e,{x:t.x/t.n,z:t.z/t.n});let i=e.props.filter(e=>e.kind===`chai`).map(e=>({x:e.x,z:e.z})),a=t=>{let n=new Map;for(let r of e.props){if(!t.includes(r.kind))continue;let e=ng(r.x,r.z);if(!e)continue;let i=n.get(e)??[];i.push({x:r.x,z:r.z}),n.set(e,i)}return n},o=a([`chai`]),s=a([`chai`,`stall`,`cart`,`bench`,`shrine`]),c=new Map,l=Kf(e.lanes);for(let t of e.lanes.edges){if(t.kind!==`lane`||t.lane!==0||t.length<16)continue;let n=e.lanes.nodes[t.from],r={x:n.x+l.dx[t.id]*t.length*.5,z:n.z+l.dz[t.id]*t.length*.5},i=ng(r.x,r.z);if(!i)continue;let a=c.get(i)??[];a.push(r),c.set(i,a)}let u=new Map;for(let e of r.keys()){let t=o.get(e)??[],n=s.get(e)??[],r=t.length>=ag?t:n.length>=ag?n:[...n,...c.get(e)??[]];r.length>0&&u.set(e,sg(r))}return t={middle:r,stalls:u,allStalls:i},ig.set(e,t),t}function sg(e){let t=e.reduce((e,t)=>e+t.x,0)/e.length,n=e.reduce((e,t)=>e+t.z,0)/e.length,r=e=>Math.hypot(e.x-t,e.z-n),i=[...e].sort((e,t)=>r(e)-r(t)||e.x-t.x||e.z-t.z),a=r(i[Math.floor((i.length-1)*.75)]),o=[];for(let e of[i.filter(e=>r(e)<=a),i.filter(e=>r(e)>a)]){let t=[...e],n=new Float64Array(t.length).fill(1/0);for(let e of o)for(let r=0;r<t.length;r++)n[r]=Math.min(n[r],Math.hypot(t[r].x-e.x,t[r].z-e.z));for(;t.length>0;){let e=0;if(o.length>0)for(let r=1;r<t.length;r++)n[r]>n[e]&&(e=r);let r=t[e];o.push(r),t.splice(e,1),n.copyWithin(e,e+1);for(let e=0;e<t.length;e++)n[e]=Math.min(n[e],Math.hypot(t[e].x-r.x,t[e].z-r.z))}}return o}function cg(e,t){return og(e).middle.get(t)??e.spawn}function lg(e,t,n){let r=og(e),i=r.stalls.get(t);if(i&&i.length>0)return i[(n%i.length+i.length)%i.length];let a=cg(e,t),o=a,s=1/0;for(let e of r.allStalls){let t=Math.hypot(e.x-a.x,e.z-a.z);t<s&&(s=t,o=e)}return o}function ug(e){let t=e.parking.filter(e=>e.kind===`truck`);return t.length===0?cg(e,`mistri`):{x:t.reduce((e,t)=>e+t.x,0)/t.length,z:t.reduce((e,t)=>e+t.z,0)/t.length}}function dg(e){return{x:e.places.garage.x,z:e.places.garage.z}}function fg(e,t,n){if(`place`in n)return n.place===`garage`?e.missions.garage:n.place===`hospital`?e.places.hospital:e.places.station;switch(n.role){case`stall`:return lg(t,n.district,n.n);case`district`:return cg(t,n.district);case`temple`:return t.temple?{x:t.temple.x,z:t.temple.z}:cg(t,`riverside`);case`chowk`:{let e=t.chowks[Math.min(n.n,t.chowks.length-1)],r=e===void 0?void 0:t.streets.intersections[e];return r?{x:r.cx,z:r.cz}:t.spawn}case`gate`:{let e=t.gates[Math.min(n.n,t.gates.length-1)];return e?{x:e.x,z:e.z}:t.spawn}case`docks`:return ug(t)}}function pg(e,t,n,r,i){let a=e.lanes,o=Kf(a),s=cg(e,t),c=[],l=e=>{c=[];for(let t of a.edges){if(t.kind!==`lane`||t.length<14)continue;let n=a.nodes[t.from],r=t.length/2,i=n.x+o.dx[t.id]*r,l=n.z+o.dz[t.id]*r;e(i,l)&&c.push({p:{x:i,z:l,heading:Math.atan2(o.dx[t.id],-o.dz[t.id]),half:t.width/2},a:Math.atan2(l-s.z,i-s.x),d:Math.hypot(i-s.x,l-s.z)})}};if(l((e,n)=>ng(e,n)===t),c.length<n*2&&(s={x:r,z:i},l((e,t)=>Math.hypot(e-r,t-i)<160)),c.length===0)return[];let u=c.reduce((e,t)=>Math.max(e,t.d),0),d=c.filter(e=>e.d>u*.35&&e.d<u*.85),f=d.length>=n?d:c,p=Math.atan2(i-s.z,r-s.x),m=[];for(let e=0;e<n;e++){let t=p+e*Math.PI*2/n,r=f[0],i=1/0;for(let e of f){let n=Math.abs(e.a-t)%(Math.PI*2);n>Math.PI&&(n=Math.PI*2-n);let a=n+Math.abs(e.d-u*.6)/(u*4);a<i&&!m.includes(e.p)&&(i=a,r=e)}m.push(r.p)}return m}function mg(e,t,n){let r=e.lanes,i=Jf(r,t,n,200,0,0,-2,!0);if(!i)return{x:t,z:n,heading:0,half:1.5};let a=Kf(r),o=r.edges[i.edge],s=Math.min(6,o.length/2),c=Math.max(s,Math.min(i.s,o.length-s)),l=r.nodes[o.from];return{x:l.x+a.dx[o.id]*c,z:l.z+a.dz[o.id]*c,heading:Math.atan2(a.dx[o.id],-a.dz[o.id]),half:o.width/2}}function hg(e,t,n){let r=Nf(e.peds,t,n);return r>=0?{x:e.peds.nodes[r].x,z:e.peds.nodes[r].z}:{x:t,z:n}}function gg(e,t,n){let r=fg(e,t,n);return`place`in n&&n.place===`garage`?{x:r.x,z:r.z,heading:e.missions.garageHeading,half:e.missions.garageHalf}:mg(t,r.x,r.z)}function _g(e,t){return rg(ng(e,t))}function vg(e,t,n,r,i,a,o=0,s=0){let c=t.peds.nodes;if(c.length===0)return null;let l=null;for(let t=0;t<80;t++){let t=c[Math.floor(Iu(e.rng)*c.length)],u=t.x-n,d=t.z-r,f=Math.hypot(u,d);if(!(f<i||f>a)){if(o*u+s*d>=0)return{x:t.x,z:t.z};l??(l={x:t.x,z:t.z})}}return l}function yg(e,t,n,r,i,a){let o=t.lanes,s=Kf(o),c=o.edges;for(let t=0;t<120;t++){let t=c[Math.floor(Iu(e.rng)*c.length)];if(t.kind!==`lane`||t.lane!==0||t.length<16)continue;let l=o.nodes[t.from],u=t.length/2,d=l.x+s.dx[t.id]*u,f=l.z+s.dz[t.id]*u,p=Math.hypot(d-n,f-r);if(!(p<i||p>a))return{x:d,z:f,heading:Math.atan2(s.dx[t.id],-s.dz[t.id]),half:t.width/2}}return null}function bg(){return{id:-1,in:!1,boardT:0}}function xg(e,t){if(!(t<0)){for(let n of e.peds)if(n.id===t)return n}}function Sg(e,t,n,r,i=0){let a=Wu(e.nextId++,`npc`,n,r,i);return e.peds.push(a),t.id=a.id,t.in=!1,t.boardT=0,a}function Cg(e,t,n){let r=t-e.x,i=n-e.z,a=Math.hypot(r,i);if(a<.3){e.wishX=0,e.wishY=0;return}e.wishX=r/a,e.wishY=-i/a}function wg(e,t,n,r){let i=xg(e,t.id);if(!i||t.in)return!1;if(i.wishX=0,i.wishY=0,!n||Gu(i))return t.boardT=0,!1;let a=Pu(i.x,i.z,nd(n,xd())),o=ed(n)<Gm.boardMaxSpeed;return t.boardT===0&&!(o&&a<Gm.boardRadius)?!1:!o&&ed(n)>Gm.boardMaxSpeed*2?(t.boardT=0,!1):(t.boardT+=r,a<Gm.boardReach||t.boardT>Gm.boardTimeout?(t.in=!0,i.hidden=!0,i.vx=i.vz=0,Tg(i,n),e.events.push({type:`passengerIn`,walker:i.id,vehicle:n.id}),!0):(Cg(i,n.x,n.z),!1))}function Tg(e,t){e.x=e.px=t.x,e.z=e.pz=t.z,e.wishX=e.wishY=0}function Eg(e,t,n){if(!t.in||!n)return;let r=xg(e,t.id);r&&Tg(r,n)}function Dg(e,t,n,r,i){let a=xg(e,t.id);if(a){if(t.in){let t=(n&&Od(e,n))??{x:a.x,z:a.z};a.x=a.px=t.x,a.z=a.pz=t.z,a.hidden=!1}e.missions.leaving.push({id:a.id,t:0,x:r,z:i})}t.id=-1,t.in=!1,t.boardT=0}function Og(e,t){let n=e.missions.leaving,r=e.player.walker;for(let i=n.length-1;i>=0;i--){let a=n[i],o=xg(e,a.id);if(!o){n.splice(i,1);continue}if(a.t+=t,!Gu(o)&&(Cg(o,a.x,a.z),a.t>Gm.leaveTime&&Math.hypot(o.x-r.x,o.z-r.z)>25)){let t=e.peds.indexOf(o);t>=0&&e.peds.splice(t,1),n.splice(i,1)}}}function kg(){return{phase:`idle`,wait:3,rider:bg(),vehicleId:-1,destX:0,destZ:0,place:``,dist:0,startT:0,damage:0}}function Ag(e,t){let n=e.missions.fare;if(n.phase===`idle`)return;let r=xg(e,n.rider.id),i=e.city&&r?hg(e.city,r.x,r.z):{x:0,z:0};Dg(e,n.rider,Cd(e,n.vehicleId),i.x,i.z),t&&n.phase===`ride`&&e.events.push({type:`fareLost`}),n.phase=`idle`,n.vehicleId=-1,n.wait=Lu(e.rng,Km.hailMin,Km.hailMax)}function jg(e){return Km.vehicles.includes(e)}function Mg(e,t){let n=e.missions.fare,r=e.city;if(!r)return;for(let t of e.events)if(t.type===`busted`||t.type===`wasted`)return Ag(e,!0);if(e.life.state!==`alive`)return;let i=Cd(e,e.player.vehicleId),a=i&&jg(i.type)&&i.stage!==`wreck`?i:void 0,o=e.missions.objective;if(n.phase===`idle`){if(!a||(n.wait-=t,n.wait>0))return;let i=Math.sin(a.heading),o=-Math.cos(a.heading),s=vg(e,r,a.x+i*25,a.z+o*25,Km.hailDistMin*.5,Km.hailDistMax,i,o);if(!s){n.wait=1;return}Sg(e,n.rider,s.x,s.z,a.heading+Math.PI),n.phase=`hail`,e.events.push({type:`fareHail`,walker:n.rider.id})}if(n.phase===`hail`){let s=xg(e,n.rider.id),c=i??e.player.walker;if(!s||Math.hypot(s.x-c.x,s.z-c.z)>Km.hailCancel)return Ag(e,!1);if(wg(e,n.rider,a,t)&&a){let t=yg(e,r,a.x,a.z,Km.tripMin,Km.tripMax)??yg(e,r,a.x,a.z,Km.tripMin*.5,Km.tripMax*1.5);if(!t)return Ag(e,!1);n.phase=`ride`,n.vehicleId=a.id,n.destX=t.x,n.destZ=t.z,n.place=_g(t.x,t.z),n.dist=Math.hypot(t.x-a.x,t.z-a.z),n.startT=e.time,n.damage=0}else{o.key=a?`obj.hail`:`obj.hailNoCab`,o.vars={},o.keys={},o.has=!0,o.x=s.x,o.z=s.z,o.timer=-1;return}}let s=Cd(e,n.vehicleId);if(!s||s.stage===`wreck`)return Ag(e,!0);Eg(e,n.rider,s);for(let t of e.events)t.type===`crash`&&(t.a===s.id||t.b===s.id)&&t.impact>=Km.minImpact&&(n.damage+=t.impact);let c=e.player.vehicleId===s.id,l=Ym(n.dist,e.time-n.startT,n.damage);if(o.vars={place:n.place,fare:l.total},o.keys={},o.timer=-1,o.has=!0,!c){o.key=`obj.backIn`,o.x=s.x,o.z=s.z;return}if(o.key=n.place?`obj.fare`:`obj.fareNoPlace`,o.x=n.destX,o.z=n.destZ,Math.hypot(s.x-n.destX,s.z-n.destZ)<Gm.arriveRadius&&ed(s)<Gm.arriveMaxSpeed){let t=Ym(n.dist,e.time-n.startT,n.damage);e.player.money+=t.total,e.missions.rep+=Wm.perFare,e.missions.stats.fares++,e.missions.stats.fareMoney+=t.total;let i=hg(r,n.destX,n.destZ);Dg(e,n.rider,s,i.x,i.z),e.events.push({type:`farePaid`,fare:t.fare,tip:t.tip,total:t.total}),n.phase=`idle`,n.vehicleId=-1,n.wait=Lu(e.rng,Km.hailMin,Km.hailMax),o.key=``,o.has=!1}}function Ng(){return{active:null,completed:[],rep:0,unlocked:[],starts:[],garage:{x:0,z:0},garageHeading:0,garageHalf:1.5,fare:kg(),objective:{key:``,vars:{},keys:{},has:!1,x:0,z:0,timer:-1},flee:null,leaving:[],last:null,cooldown:0,stats:{fares:0,fareMoney:0,missionMoney:0,failed:0}}}function Pg(e,t){let n=e.missions,r=dg(t),i=mg(t,r.x,r.z);n.garage={x:i.x,z:i.z},n.garageHeading=i.heading,n.garageHalf=i.half,n.starts=Um.map(n=>{let r=fg(e,t,n.start),i=hg(t,r.x,r.z);return{id:n.id,x:i.x,z:i.z}})}function Fg(e,t=[]){t.length=0;let n=e.missions;if(!e.city)return t;if(!n.active)for(let r of n.starts){let i=$m(r.id);i&&!n.completed.includes(i.id)&&t.push({id:r.id,x:r.x,z:r.z,kind:Qm(e,i)?`job`:`locked`})}return t.push({id:`garage`,x:n.garage.x,z:n.garage.z,kind:`garage`}),t}function Ig(e){let t=Rg(e),n=null,r=1/0;for(let i of Fg(e,Lg)){if(i.kind!==`job`)continue;let e=Math.hypot(i.x-t.x,i.z-t.z);e<r&&(r=e,n={x:i.x,z:i.z})}return n}var Lg=[];function Rg(e){return Cd(e,e.player.vehicleId)??e.player.walker}function zg(e){let t=Cd(e,e.player.vehicleId);return t?ed(t):Math.hypot(e.player.walker.vx,e.player.walker.vz)}function Bg(e,t){let n=e.missions,r=$m(t);return!r||!e.city||n.active||!Qm(e,r)||r.vehicle&&e.player.vehicleId<0?!1:(Ag(e,!1),n.active={id:t,step:-1,stepT:0,timer:-1,vehicleId:-1,rider:bg(),pkg:-1,fragile:!1,cp:0,points:[],targetId:-1,tx:0,tz:0,hold:0,away:0,place:``},e.events.push({type:`missionStarted`,id:t}),Vg(e,r),!0)}function Vg(e,t){let n=e.missions.active,r=e.city;if(n&&r)for(;;){if(n.step++,n.stepT=0,n.hold=0,n.step>=t.steps.length){e_(e,t);return}let i=t.steps[n.step];if(i.kind===`timer`){n.timer=i.seconds>0?i.seconds:-1;continue}Ug(e,r,n,i);return}}function Hg(e,t){e.tx=t.x,e.tz=t.z,e.place=_g(t.x,t.z)}function Ug(e,t,n,r){switch(r.kind){case`goTo`:case`deliver`:Hg(n,gg(e,t,r.at));break;case`pickUp`:{let i=gg(e,t,r.at);if(r.what===`passenger`){let r=hg(t,i.x,i.z);Sg(e,n.rider,r.x,r.z,i.heading+Math.PI/2),Hg(n,r)}else Hg(n,i);n.fragile=!!r.fragile;break}case`surviveStars`:{let t=_u.thresholds[Math.max(0,Math.min(_u.thresholds.length,r.stars)-1)]+1;e.wanted.heat<t&&Yp(e,t-e.wanted.heat);break}case`checkpoints`:{let i=Rg(e);n.cp=0,n.points=pg(t,r.district,r.count,i.x,i.z).map(e=>({x:e.x,z:e.z})),n.points.length>0&&Hg(n,n.points[0]);break}case`stealVehicle`:{let i=gg(e,t,r.at),a=Wg(e,r.model,i);n.targetId=a?a.id:-1,Hg(n,a??i);break}case`stopVehicle`:n.targetId=-1,Kg(e,t,n,r.model)}}function Wg(e,t,n){let r=Math.sin(n.heading),i=-Math.cos(n.heading),a=Math.max(0,n.half-q[t].width/2-.15);for(let o of[0,7,-7,14,-14,21,-21,28,-28]){let s=n.x+r*o-Math.cos(n.heading)*a,c=n.z+i*o-Math.sin(n.heading)*a;if(!Wp(e,t,s,c,n.heading,.5))continue;let l=d_(e,$u(0,t,s,c,n.heading,`none`));return l.paint=3,l}return null}var Gg={speedMul:Gm.fleeSpeedMul,giveWay:!1,extend:!0,urgent:!0};function Kg(e,t,n,r){let i=t.lanes,a=Kf(i),o=Rg(e),s=i.edges.length,c=Math.floor(Iu(e.rng)*s);for(let t=0;t<s;t++){let l=i.edges[(c+t*7919)%s];if(l.kind!==`lane`||l.length<14||q[r].width+.4>l.width)continue;let u=l.length*.5,d=i.nodes[l.from],f=d.x+a.dx[l.id]*u,p=d.z+a.dz[l.id]*u,m=Math.hypot(f-o.x,p-o.z);if(m<Gm.fleeMin||m>Gm.fleeMax)continue;let h=Math.atan2(a.dx[l.id],-a.dz[l.id]);if(!Wp(e,r,f,p,h,2))continue;let g=d_(e,$u(0,r,f,p,h,`npc`));g.paint=3,g.inHandbrake=!1;let _=up(g,[l.id],u,1);_.route.push(Zf(i,l.id,e.rng));let v=Math.min(l.speed*Gm.fleeSpeedMul,q[r].maxSpeed)*.6;return g.vx=a.dx[l.id]*v,g.vz=a.dz[l.id]*v,e.missions.flee=_,n.targetId=g.id,Hg(n,g),!0}return!1}function qg(e,t,n){let r=e.missions.flee,i=e.city;if(!r||!i||!e.traffic.junctions)return;let a=r.v;if(a.driver===`npc`&&a.stage!==`wreck`){if(!Cp(i.lanes,r,e.rng,!0)){a.inThrottle=0,a.inBrake=1,a.inSteer=0;return}Dp(e,i.lanes,r,e.traffic.junctions,Gg,t,n)}}function Jg(e){let t=e.missions.flee;e.missions.flee=null,!(!t||t.v.driver!==`npc`||t.v.stage===`wreck`||e.vehicles.indexOf(t.v)<0)&&(t.cruise=1,e.traffic.agents.push(t),e.traffic.spawned.push(t.v))}function Yg(e,t,n,r){let i=Rg(e);return Math.hypot(i.x-t,i.z-n)<r&&zg(e)<Gm.arriveMaxSpeed}function Xg(e,t,n){if(!n)return!0;let r=e.player.vehicleId;return n===`any`?r>=0:r>=0&&r===t.vehicleId}function Zg(e,t){let n=e.missions;if(!e.city)return;let r=Xm(n.rep);n.cooldown>0&&(n.cooldown=Math.max(0,n.cooldown-t)),Og(e,t);let i=n.active;if(i){let n=$m(i.id);n&&Qg(e,n,i,t)}else if(e.life.state===`alive`&&n.cooldown<=0&&n.fare.phase!==`ride`){let t=Rg(e);if(zg(e)<Gm.startMaxSpeed)for(let r of n.starts){if(Math.hypot(t.x-r.x,t.z-r.z)>Gm.startRadius)continue;if(Bg(e,r.id))break;let i=$m(r.id);i?.vehicle&&e.player.vehicleId<0&&Qm(e,i)&&n.cooldown<=0&&(e.events.push({type:`missionNeedsVehicle`,id:r.id}),n.cooldown=Gm.startCooldown)}}n.active||Mg(e,t);let a=Xm(n.rep);a>r&&e.events.push({type:`repLevel`,level:a}),a_(e)}function Qg(e,t,n,r){for(let n of e.events){if(n.type===`busted`)return t_(e,t,`busted`);if(n.type===`wasted`)return t_(e,t,`wasted`)}if(n.stepT+=r,n.timer>=0&&(n.timer=Math.max(0,n.timer-r),n.timer<=0))return t_(e,t,`time`);let i=n.vehicleId>=0?Cd(e,n.vehicleId):void 0;if(n.vehicleId>=0&&(!i||i.stage===`wreck`))return t_(e,t,`vehicle`);if(i&&Eg(e,n.rider,i),n.pkg>=0&&n.fragile&&i){for(let t of e.events)t.type!==`crash`||t.a!==i.id&&t.b!==i.id||t.impact<Gm.fragileMinImpact||(n.pkg=Math.max(0,n.pkg-(t.impact-Gm.fragileMinImpact*.5)*Gm.fragileDamage));if(n.pkg<=0)return t_(e,t,`package`)}let a=t.steps[n.step],o=Cd(e,e.player.vehicleId);switch(a.kind){case`goTo`:Xg(e,n,a.need)&&Yg(e,n.tx,n.tz,a.radius??Gm.arriveRadius)&&Vg(e,t);break;case`pickUp`:a.what===`passenger`?(!xg(e,n.rider.id)&&e.city&&Sg(e,n.rider,n.tx,n.tz),wg(e,n.rider,o,r)&&o&&(n.vehicleId=o.id,Vg(e,t))):o&&Yg(e,n.tx,n.tz,Gm.arriveRadius)&&(n.vehicleId=o.id,n.pkg=100,e.events.push({type:`parcelIn`,vehicle:o.id}),Vg(e,t));break;case`deliver`:if(Xg(e,n,`mission`)&&Yg(e,n.tx,n.tz,Gm.arriveRadius)){if(n.rider.id>=0&&e.city){let t=hg(e.city,n.tx,n.tz);Dg(e,n.rider,i,t.x,t.z)}n.pkg=-1,n.vehicleId=-1,Vg(e,t)}break;case`surviveStars`:{let i=_u.thresholds[Math.max(0,Math.min(_u.thresholds.length,a.stars)-1)]+1;e.wanted.heat<i&&Yp(e,i-e.wanted.heat),n.hold+=r,n.hold>=a.seconds&&Vg(e,t);break}case`checkpoints`:n.points.length===0?Vg(e,t):o&&Math.hypot(o.x-n.tx,o.z-n.tz)<Gm.checkpointRadius&&(n.cp++,e.events.push({type:`checkpoint`,n:n.cp,total:n.points.length}),n.cp>=n.points.length?Vg(e,t):Hg(n,n.points[n.cp]));break;case`stealVehicle`:{let r=Cd(e,n.targetId);if(r&&Hg(n,r),o&&o.type===a.model)n.vehicleId=o.id,Vg(e,t);else if(!r&&e.city&&n.stepT>1){let t=gg(e,e.city,a.at),r=Wg(e,a.model,t);r&&(n.targetId=r.id)}break}case`stopVehicle`:{if(n.targetId<0){e.city&&Kg(e,e.city,n,a.model);break}let i=Cd(e,n.targetId);if(!i)return t_(e,t,`escaped`);Hg(n,i);let o=Rg(e),s=Math.hypot(i.x-o.x,i.z-o.z),c=i.stage===`wreck`||i.driver!==`npc`;if(ed(i)<Gm.stopSpeed&&s<Gm.stopNear?n.hold+=r:n.hold=0,c||n.hold>=Gm.stopHold){i.driver===`npc`&&(i.driver=`none`,i.inThrottle=0),e.missions.flee=null,Vg(e,t);break}if(s>Gm.escapeDist){if(n.away+=r,n.away>Gm.escapeTime)return t_(e,t,`escaped`)}else n.away=0;break}case`timer`:Vg(e,t)}}function $g(e,t){if(t.rider.id>=0){let n=xg(e,t.rider.id),r=Cd(e,t.vehicleId),i=e.city&&n?hg(e.city,n.x,n.z):{x:0,z:0};Dg(e,t.rider,r,i.x,i.z)}Jg(e),e.missions.cooldown=Gm.startCooldown}function e_(e,t){let n=e.missions,r=n.active;r&&($g(e,r),n.active=null,e.player.money+=t.reward,n.rep+=t.rep,n.stats.missionMoney+=t.reward,n.completed.includes(t.id)||n.completed.push(t.id),t.unlock&&!n.unlocked.includes(t.unlock)&&n.unlocked.push(t.unlock),n.last={id:t.id,passed:!0,reward:t.reward,rep:t.rep,reason:``,doubled:!1,at:e.time},e.events.push({type:`missionPassed`,id:t.id,reward:t.reward,rep:t.rep,unlock:t.unlock??``}))}function t_(e,t,n){let r=e.missions,i=r.active;i&&($g(e,i),r.active=null,r.stats.failed++,r.last={id:t.id,passed:!1,reward:0,rep:0,reason:n,doubled:!1,at:e.time},e.events.push({type:`missionFailed`,id:t.id,reason:n}))}function n_(e){let t=e.missions.last;return!!t&&t.passed&&!t.doubled&&t.reward>0&&e.time-t.at<120}function r_(e){if(!n_(e))return!1;let t=e.missions.last;return t.doubled=!0,e.player.money+=t.reward,e.missions.stats.missionMoney+=t.reward,!0}function i_(e,t,n={},r=null,i=-1,a={}){let o=e.missions.objective;o.key=t,o.vars=n,o.keys=a,o.has=!!r,o.x=r?r.x:0,o.z=r?r.z:0,o.timer=i}function a_(e){let t=e.missions,n=t.active;if(!n){if(t.fare.phase!==`idle`)return;i_(e,``);return}let r=$m(n.id);if(!r)return;let i=r.steps[n.step];if(!i)return;let a=n.timer,o=Cd(e,n.vehicleId),s=n.vehicleId>=0&&e.player.vehicleId===n.vehicleId,c=e.player.vehicleId>=0,l={x:n.tx,z:n.tz};switch(i.kind){case`goTo`:return i.need===`mission`&&!s&&o?i_(e,`obj.backIn`,{},o,a):i.need===`any`&&!c?i_(e,`obj.getVehicle`,{},null,a):i_(e,`place`in i.at&&i.at.place===`garage`?`obj.toGarage`:`obj.goTo`,{place:n.place},l,a);case`pickUp`:return c?i_(e,i.what===`passenger`?`obj.pickUpPassenger`:`obj.pickUpParcel`,{},l,a):i_(e,`obj.getVehicle`,{},null,a);case`deliver`:return!s&&o?i_(e,`obj.backIn`,{},o,a):n.rider.id>=0?i_(e,`obj.dropPassenger`,{place:n.place},l,a):n.fragile?i_(e,`obj.deliverFragile`,{place:n.place,pkg:Math.ceil(n.pkg)},l,a):i_(e,`obj.deliverParcel`,{place:n.place},l,a);case`surviveStars`:return i_(e,`obj.survive`,{stars:i.stars},null,Math.max(0,i.seconds-n.hold));case`checkpoints`:return c?i_(e,`obj.checkpoint`,{n:n.cp+1,total:n.points.length},l,a):i_(e,`obj.getVehicle`,{},null,a);case`stealVehicle`:return i_(e,`obj.steal`,{},l,a,{model:`model.`+i.model});case`stopVehicle`:return i_(e,`obj.stop`,{},n.targetId>=0?l:null,a,{model:`model.`+i.model});case`timer`:return}}function o_(e,t){e.city=t,e.places=Am(t),Fp(e,t),Ff(e,t),cf(e,t),Pg(e,t)}var s_=new Map;function c_(e,t){if(Pm(e),e.city&&e.traffic.junctions){Tf(e),s_.clear();for(let t of e.traffic.agents)s_.set(t.v.id,t);for(let t of e.police.units)s_.set(t.agent.v.id,t.agent);e.missions.flee&&s_.set(e.missions.flee.v.id,e.missions.flee),lp(e.traffic.junctions,s_.values()),Lp(e,s_,t),sm(e,s_,t),qg(e,s_,t),Bf(e,t),lf(e,t)}}function l_(e,t){e.city&&(ff(e),Uf(e),tm(e),nm(e,t),Em(e,t)&&Mm(e),Fm(e,t),Zg(e,t))}function u_(e={}){let t={tick:0,time:0,rng:Fu(e.seed??1),nextId:2,static:e.static??Jd(),events:[],player:Sd(1,Vd.x,Vd.z),vehicles:[],peds:[],city:null,traffic:kp(),pedAI:kf(),animals:Qd(),wanted:Kp(),police:rm(),life:Dm(),places:Om(),missions:Ng()};if(e.populate??!e.static){for(let e of Hd)d_(t,$u(0,e.type,e.x,e.z,e.heading,e.driver?`npc`:`none`));for(let e of Ud)t.peds.push(Wu(t.nextId++,`npc`,e.x,e.z,Math.PI))}return t}function d_(e,t){return t.id=e.nextId++,t.inHandbrake=!0,e.vehicles.push(t),t}function f_(e){return 1+e.vehicles.length+e.peds.length+e.animals.cows.length}function p_(e,t,n){e.events.length=0,e.tick++,e.time+=n,m_(e),wd(e,t,n),c_(e,n);for(let t of e.vehicles)t.driver===`none`&&g_(t),Ru(t,n);let r=e.player.walker;r.hidden||qu(r,e.player.wishX,e.player.wishY,n);for(let t of e.peds)qu(t,t.wishX,t.wishY,n);for(let t of e.vehicles)md(t,e.static,e.events);_d(e.vehicles,e.events),vd(r,e.vehicles,e.events);for(let t of e.peds)vd(t,e.vehicles,e.events);yd(r,e.static);for(let t of e.peds)yd(t,e.static);for(let t of e.vehicles)Xu(t,e.time,n,e.events)&&__(e,t);Ad(e),l_(e,n)}function m_(e){for(let t of e.vehicles)h_(t);for(let t of e.peds)h_(t);h_(e.player.walker)}function h_(e){e.px=e.x,e.pz=e.z,e.pHeading=e.heading}function g_(e){e.inThrottle=0,e.inBrake=0,e.inSteer=0,e.inHandbrake=!0}function __(e,t){let n=Tu.blastRadius;for(let r of e.vehicles){if(r===t)continue;let i=r.x-t.x,a=r.z-t.z,o=Math.hypot(i,a);if(o>=n)continue;let s=1-o/n,c=o>1e-6?i/o:1,l=o>1e-6?a/o:0;r.vx+=c*Tu.blastPush*s,r.vz+=l*Tu.blastPush*s,Yu(r,Tu.blastVehicleDamage*s,e.events)}if(e.player.vehicleId===t.id){let n=Od(e,t)??{x:t.x,z:t.z};Dd(e,t,n.x,n.z)}else if(t.driver===`npc`){let n=Od(e,t)??{x:t.x,z:t.z};e.peds.push(Wu(e.nextId++,`npc`,n.x,n.z,t.heading))}t.driver=`none`,t.vx*=.3,t.vz*=.3;let i=[e.player.walker,...e.peds];for(let a of i){if(a.hidden)continue;let i=a.x-t.x,o=a.z-t.z,s=Math.hypot(i,o);if(s>=n)continue;let c=1-s/n,l=s>1e-6?i/s:1,u=s>1e-6?o/s:0,d=Tu.blastPush*c+2;Ku(a,l*d,u*d,r.knockTime+Lu(e.rng,.2,.8),Tu.blastWalkerDamage*c)}}function v_(e,t){let n=(t-e)%(Math.PI*2);return n>Math.PI&&(n-=Math.PI*2),n<=-Math.PI&&(n+=Math.PI*2),n}function y_(e,t,n){return e+v_(e,t)*n}var b_=128,x_=11895642,S_=3095378,C_=16747546,w_=[3835647,15087942,2792847,16052702,9263948,10182117,5420936],T_=class{constructor(){this.object=new er,this.root=new $n,this.part=new $n,this.m=new En,this.color=new U,this.nBody=0,this.nLimb=0;let e=new Ya({color:16777215}),t=new Yi(.5,.6,.3),n=new Yi(.3,.3,.3),r=new Yi(.17,.75,.2);r.translate(0,-.375,0),this.torso=this.mesh(t,e,b_),this.head=this.mesh(n,e,b_),this.limb=this.mesh(r,e,512)}mesh(e,t,n){let r=new zi(e,t,n);return r.instanceMatrix.setUsage(Pt),r.count=0,r.frustumCulled=!1,this.object.add(r),r}sync(e,t){this.nBody=0,this.nLimb=0;let n=e.player,r=n.walker,i=Cd(e,n.vehicleId);r.hidden?i&&q[i.type].model===`bike`&&this.draw(r,t,C_,.1,.1,!0):this.draw(r,t,C_,0,0);for(let n of e.peds)n.hidden||this.draw(n,t,w_[n.id%w_.length],0,0);this.finish(this.torso,this.nBody),this.finish(this.head,this.nBody),this.finish(this.limb,this.nLimb)}draw(e,t,n,i,a,o=!1){if(this.nBody>=b_)return;let s=y_(e.pHeading,e.heading,t),c=e.px+(e.x-e.px)*t+Math.sin(s)*a,l=e.pz+(e.z-e.pz)*t-Math.cos(s)*a,u=0;e.knockT>0&&(u=e.knockT>r.getUpTime?Math.PI/2:Math.PI/2*(e.knockT/r.getUpTime));let d=Math.hypot(e.vx,e.vz),f=e.knockT>0||o?0:Math.sin(e.walkDist*2.4)*.7*Math.min(1,d/2),p=e.knockT>0||o?0:Math.abs(Math.sin(e.walkDist*2.4))*.06,m=this.root;m.position.set(c,i+p,l),m.rotation.set(u,-s,0,`YXZ`),m.scale.setScalar(xu.person),m.updateMatrix(),this.put(this.torso,this.nBody,0,1.15,0,0,n),this.put(this.head,this.nBody,0,1.62,0,0,x_),this.nBody++;let h=o?1.3:0;this.put(this.limb,this.nLimb++,-.13,.85,0,h+f,S_),this.put(this.limb,this.nLimb++,.13,.85,0,h-f,S_);let g=e.punchT>0?Math.sin((1-e.punchT/r.punchTime)*Math.PI)*1.6:0,_=+!!o;this.put(this.limb,this.nLimb++,-.34,1.42,0,_-f*.8,n),this.put(this.limb,this.nLimb++,.34,1.42,0,_+f*.8+g,n)}put(e,t,n,r,i,a,o){let s=this.part;s.position.set(n,r,i),s.rotation.set(a,0,0),s.updateMatrix(),this.m.multiplyMatrices(this.root.matrix,s.matrix),e.setMatrixAt(t,this.m),e.setColorAt(t,this.color.setHex(o))}finish(e,t){e.count=t,e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0)}},E_={asphalt:6119784,asphaltDark:5198682,markWhite:15855590,markYellow:15909424,sidewalk:13220244,kerb:10195586,lot:14205070,park:9225313,parkDark:7777616,plaza:15127206,plazaDark:14468762,parking:9408911,dock:11117466,water:3843769,waterDeep:2854563,quay:9274742,outside:13480316,wall:13209429,wallTop:11893829,island:8372058},D_=[15239840,5226936,15902017,16109665,11064171,11902936,8370406,15722194,13922638,6799503],O_=[9148581,7311272,11035722,12104356,8228714],k_=[14036526,3043286,2072154,15909424,15228188,9322432,1118481,16777215],A_=13616560,j_=12103062,M_=2964042,N_=9211796,P_=2500134,F_=3108789,I_=9067058,L_=8016434,R_=[5216828,6270533,4164149,7191370],z_=1907997,B_=15321487,V_=13609068,H_=15895580,U_=12597547,W_=[15895580,15257651,14036526,8175690],G_={ring:6119784,main:5922404,street:6974057,bazaar:8025453,gali:9801087,dirt:11046762,ghat:13218954},K_=12756860,q_=11572328,J_=9077363,Y_=12170143,X_=5001302,Z_=8158328,Q_=[13810058,13415043,14073745],$_=[9222234,8695890,9682274],ev=14272416,tv=13350798,nv=12170410,rv=[14262374,14928288,10470601,15245480,13201226,15786688,11060895,15909198,8955856,14257004],iv=[15321487,14132063,15785140,13209429],av=[15722194,15259832,14213348,15914152,13229248,15780016],ov=[4161386,3104671,8014378,5933626,10107450],sv=[14036526,15909424,3043286,16777215,15228314,2072154,15895580,9322432],cv=15132384,lv=[10508346,12032626,7315392,10127986,12749402],uv=[10134696,8358544,11035722,9411210],dv=[3108789,14708778,3836490,2793392],fv=11552559,pv=15720632,mv=15920352,hv=4872786,gv=9079432,_v=9076594,vv=5917242,yv=12093274,bv=10120776,xv=11049088,Sv=16053488,Cv=13150570,wv=15223391,Tv=14036526,Ev=16052454,Dv=class{constructor(e,t,n=16){this.mark=0,this.boxes=e,this.bounds=t,this.cell=n,this.cols=Math.max(1,Math.ceil((t.maxX-t.minX)/n)),this.rows=Math.max(1,Math.ceil((t.maxZ-t.minZ)/n));let r=new Int32Array(this.cols*this.rows+1),i=(e,t)=>{let[n,r,i,a]=this.range(e.minX,e.minZ,e.maxX,e.maxZ);for(let e=r;e<=a;e++)for(let r=n;r<=i;r++)t(e*this.cols+r)};for(let t of e)i(t,e=>r[e+1]++);for(let e=1;e<r.length;e++)r[e]+=r[e-1];this.start=r,this.items=new Int32Array(r[r.length-1]);let a=r.slice(0,-1);e.forEach((e,t)=>i(e,e=>this.items[a[e]++]=t)),this.stamp=new Uint32Array(e.length)}range(e,t,n,r){let i=this.bounds,a=(e,t)=>e<0?0:e>=t?t-1:e;return[a(Math.floor((e-i.minX)/this.cell),this.cols),a(Math.floor((t-i.minZ)/this.cell),this.rows),a(Math.floor((n-i.minX)/this.cell),this.cols),a(Math.floor((r-i.minZ)/this.cell),this.rows)]}query(e,t,n,r,i){++this.mark===4294967295&&(this.stamp.fill(0),this.mark=1);let a=this.mark,[o,s,c,l]=this.range(e,t,n,r);for(let u=s;u<=l;u++)for(let s=o;s<=c;s++){let o=u*this.cols+s;for(let s=this.start[o];s<this.start[o+1];s++){let o=this.items[s];if(this.stamp[o]===a)continue;this.stamp[o]=a;let c=this.boxes[o];c.maxX>e&&c.minX<n&&c.maxZ>t&&c.minZ<r&&i.push(c)}}}},Ov={arterial:13.9,street:9.7,lane:5.5,bazaar:6,turn:5.5,ring:8,uturn:3},kv=16;function Av(e,t){let n=[];for(let r=0;r<e.length;r++){let i=e[Math.max(0,r-1)],a=e[Math.min(e.length-1,r+1)],o=Math.hypot(a[0]-i[0],a[1]-i[1])||1,s=(a[0]-i[0])/o,c=(a[1]-i[1])/o;n.push([e[r][0]+c*t,e[r][1]-s*t])}return n}function jv(e,t,n=()=>!0){let r=[],i=[],a=e.intersections.map(()=>[]),o=e.intersections.map(()=>[]),s=(e,t,n)=>(r.push({id:r.length,x:e,z:t,intersection:n}),r.length-1),c=(e,t,n,a,o,s,c,l)=>{let u=r[e],d=r[t],f=Math.hypot(d.x-u.x,d.z-u.z);f<.001||i.push({id:i.length,from:e,to:t,kind:n,width:a,speed:o,length:f,segment:s,lane:c,intersection:l})},l=(e,t)=>e.approaches.find(e=>e.segment===t).side;for(let t of e.segments){let n=t.width/(2*t.lanes),r=t.cls===`bazaar`?Ov.bazaar:Ov[t.kind];for(let i of[1,-1]){let u=i>0?t.pts:[...t.pts].reverse(),d=i>0?t.a:t.b,f=i>0?t.b:t.a;for(let p=0;p<t.lanes;p++){let m=Jh(Av(u,t.width/2-(p+.5)*n),.3),h=[];m.forEach((e,t)=>h.push(s(e[0],e[1],t===0?d:t===m.length-1?f:-1)));for(let e=1;e<h.length;e++)c(h[e-1],h[e],`lane`,n,r,t.id,p,-1);let g=m[0],_=m[1],v=m[m.length-2],y=m[m.length-1],b=Math.hypot(_[0]-g[0],_[1]-g[1])||1,x=Math.hypot(y[0]-v[0],y[1]-v[1])||1;o[d].push({node:h[0],dx:(_[0]-g[0])/b,dz:(_[1]-g[1])/b,k:p,n:t.lanes,ap:t.id*2+(i>0?0:1),side:l(e.intersections[d],t.id),speed:r,width:n}),a[f].push({node:h[h.length-1],dx:(y[0]-v[0])/x,dz:(y[1]-v[1])/x,k:p,n:t.lanes,ap:t.id*2+ +(i>0),side:l(e.intersections[f],t.id),speed:r,width:n})}}}for(let t of e.intersections){let e=a[t.id],i=o[t.id];if(t.kind===`roundabout`){u(t,e,i);continue}let l=t.approaches.length===1;for(let a of e)for(let e of i){if(e.ap===a.ap){if(!l||e.k!==a.k)continue;c(a.node,e.node,`junction`,a.width,Ov.uturn,-1,-1,t.id);continue}if(a.n===e.n&&a.k!==e.k)continue;let i=a.dx*e.dx+a.dz*e.dz,o=r[a.node],u=r[e.node];if(i>.94){c(a.node,e.node,`junction`,e.width,Math.min(a.speed,e.speed),-1,-1,t.id);continue}let d=a.dx*e.dz-a.dz*e.dx,f=(o.x+u.x)/2,p=(o.z+u.z)/2,m=[];if(Math.abs(d)>.15){let t=((u.x-o.x)*e.dz-(u.z-o.z)*e.dx)/d,n=((u.z-o.z)*a.dx-(u.x-o.x)*a.dz)/d,r=Math.hypot(u.x-o.x,u.z-o.z);if(t>0&&n>0&&t<r*1.5&&n<r*1.5){let e=o.x+a.dx*t,n=o.z+a.dz*t;m.push([e,n],[(f+e)/2,(p+n)/2])}}m.push([f,p]);let h=(e,t,r,i)=>{let a=Math.max(1,Math.ceil(Math.hypot(r-e,i-t)/.5));for(let o=0;o<=a;o++)if(!n(e+(r-e)*o/a,t+(i-t)*o/a))return!1;return!0},g=m.find(([e,t])=>h(o.x,o.z,e,t)&&h(e,t,u.x,u.z))??m[m.length-1],_=s(g[0],g[1],t.id);c(a.node,_,`junction`,e.width,Ov.turn,-1,-1,t.id),c(_,e.node,`junction`,e.width,Ov.turn,-1,-1,t.id)}}function u(e,n,i){let a=[];for(let n=0;n<kv;n++){let r=n/kv*Math.PI*2;a.push(s(e.cx+t*Math.sin(r),e.cz-t*Math.cos(r),e.id))}for(let t=0;t<kv;t++)c(a[t],a[(t+1)%kv],`ring`,5,Ov.ring,-1,-1,e.id);let o=t=>{let n=r[t],i=Math.atan2(n.x-e.cx,-(n.z-e.cz));return i<0&&(i+=Math.PI*2),i/(Math.PI*2)*kv};for(let t of n)c(t.node,a[Math.ceil(o(t.node)+.01)%kv],`junction`,5,Ov.turn,-1,-1,e.id);for(let t of i)c(a[Math.floor(o(t.node)-.01+kv)%kv],t.node,`junction`,t.width,Ov.turn,-1,-1,e.id)}let d=r.map(()=>[]),f=r.map(()=>[]),p=e.intersections.map(()=>[]);for(let e of i)d[e.from].push(e.id),f[e.to].push(e.id),e.intersection>=0&&p[e.intersection].push(e.id);return{nodes:r,edges:i,outEdges:d,inEdges:f,intersectionEdges:p}}var Mv=9,Nv=5;function Pv(e,t,n=[]){let r=[],i=[],a=(e,t)=>(r.push({x:e,z:t}),r.length-1),o=e=>{let t=Jh(e,.5),n=[a(t[0][0],t[0][1])];for(let e=1;e<t.length;e++){let r=t[e-1],o=t[e],s=Math.max(1,Math.ceil(Math.hypot(o[0]-r[0],o[1]-r[1])/Mv));for(let e=1;e<=s;e++){let t=a(r[0]+(o[0]-r[0])*e/s,r[1]+(o[1]-r[1])*e/s);i.push([n[n.length-1],t]),n.push(t)}}return n},s=e.intersections.map(()=>[]);for(let n of e.segments){let e=n.kind===`lane`||n.cls===`bazaar`,r=n.width/2,o=e?[r-.45,r+.7,r-.9]:[r+.9,r+.5,r-.45],c=e?Nv:Mv,l=[0];for(let e=1;e<n.pts.length;e++)l.push(l[e-1]+Math.hypot(n.pts[e][0]-n.pts[e-1][0],n.pts[e][1]-n.pts[e-1][1]));let u=l[l.length-1],d=Math.max(1,Math.ceil(u/c));for(let e of[-1,1]){let r=-1,c=-1,f=-1,p=1;for(let s=0;s<=d;s++){let m=u*s/d;for(;p<l.length-1&&l[p]<m;)p++;let h=n.pts[p-1],g=n.pts[p],_=l[p]-l[p-1]||1,v=Math.max(0,Math.min(1,(m-l[p-1])/_)),y=h[0]+(g[0]-h[0])*v,b=h[1]+(g[1]-h[1])*v,x=(g[0]-h[0])/_,S=(g[1]-h[1])/_,C=-1;for(let n of o){let r=y+S*n*e,i=b-x*n*e;if(t(r,i)){C=a(r,i);break}}if(C<0){r=-1;continue}r>=0&&i.push([r,C]),r=C,s===0&&(c=C),s===d&&(f=C)}c>=0&&s[n.a].push(c),f>=0&&s[n.b].push(f)}}for(let t of e.intersections){let e=[...new Set(s[t.id])].sort((e,n)=>Math.atan2(r[e].z-t.cz,r[e].x-t.cx)-Math.atan2(r[n].z-t.cz,r[n].x-t.cx));if(e.length===2)i.push([e[0],e[1]]);else if(e.length>2)for(let t=0;t<e.length;t++)i.push([e[t],e[(t+1)%e.length]])}let c=r.length;for(let e of n){let n=o(e);for(let e of n){let a=-1,o=e===n[0]||e===n[n.length-1]?14:6;for(let n=0;n<c;n++){let i=Math.hypot(r[n].x-r[e].x,r[n].z-r[e].z);i<o&&t(r[n].x,r[n].z)&&(o=i,a=n)}a>=0&&i.push([e,a])}}let l=new Int32Array(r.length).fill(-1),u=[];r.forEach((e,n)=>{t(e.x,e.z)&&(l[n]=u.length,u.push(e))});let d=[],f=u.map(()=>[]),p=new Set;for(let[e,t]of i){let n=l[e],r=l[t];if(n<0||r<0||n===r)continue;let i=n<r?`${n},${r}`:`${r},${n}`;p.has(i)||(p.add(i),d.push(n,r),f[n].push(r),f[r].push(n))}return{nodes:u,edges:d,adj:f}}var Fv=class{constructor(e){this.s=e>>>0}next(){let e=this.s=this.s+1831565813>>>0;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}range(e,t){return e+(t-e)*this.next()}int(e,t){return e+Math.floor(this.next()*(t-e+1))}chance(e){return this.next()<e}pick(e){return e[Math.floor(this.next()*e.length)]}};function Iv(e,t){let n=Math.imul(e^2654435769,2246822507)^Math.imul(t+1663821227,3266489909);return n^=n>>>16,n=Math.imul(n,2146121005),n^=n>>>15,n>>>0}function Lv(e,t){let n=1/0;for(let r=0;r<t.length;r++)n=Math.min(n,Bh(e,t[r],t[(r+1)%t.length]));return n}function Rv(e,t,n){for(let r=1;r<n.length;r++)if(Hh(e,t,n[r-1],n[r]))return!0;return!1}function zv(e,t,n){let r=Math.abs((t[0]-e[0])*(n[1]-e[1])-(t[1]-e[1])*(n[0]-e[0]));return r<1e-9?1/0:Math.hypot(t[0]-e[0],t[1]-e[1])*Math.hypot(n[0]-t[0],n[1]-t[1])*Math.hypot(e[0]-n[0],e[1]-n[1])/(2*r)}function Bv(e,t){for(let n=0;n<40;n++){let n=!1;for(let r=2;r<e.length-2;r++)if(!(zv(e[r-2],e[r],e[r+2])>=t)){n=!0;for(let t=Math.max(1,r-2);t<=Math.min(e.length-2,r+2);t++)e[t]=[(e[t-1][0]+e[t][0]*2+e[t+1][0])/4,(e[t-1][1]+e[t][1]*2+e[t+1][1])/4]}if(!n)break}return e}function Vv(e){let{rng:t}=e,n=e.anchors.map(e=>e.p),r=n.length,i=1/0,a=-1/0,o=1/0,s=-1/0;for(let t of e.domain)i=Math.min(i,t[0]),a=Math.max(a,t[0]),o=Math.min(o,t[1]),s=Math.max(s,t[1]);let c=(a-i)*(s-o),l=Math.ceil(c/(e.spacing*e.spacing)*30);for(let r=0;r<l;r++){let r=[t.range(i,a),t.range(o,s)];!Uh(r,e.domain)||Lv(r,e.domain)<e.inset||n.some(t=>Math.hypot(t[0]-r[0],t[1]-r[1])<e.spacing)||e.obstacles.some(t=>t.some((n,i)=>i>0&&Bh(r,t[i-1],n)<e.obstacleClear))||e.keepOut.some(e=>Uh(r,e)||Lv(r,e)<5)||n.push(r)}let u=[];for(let i=0;i<n.length;i++)for(let a=Math.max(i+1,r);a<n.length;a++){let o=n[i],s=n[a],c=Math.hypot(s[0]-o[0],s[1]-o[1]);if(c>e.reach||c<6)continue;let l=(s[0]-o[0])/c,d=(s[1]-o[1])/c;if(i<r){let t=e.anchors[i].t;if(Math.abs(l*t[0]+d*t[1])>Math.cos(50*Math.PI/180))continue}let f=i<r?[o[0]+l*1.2,o[1]+d*1.2]:o;if(e.obstacles.some(e=>Rv(f,s,e)))continue;if(i>=r){let t=[(o[0]+s[0])/2,(o[1]+s[1])/2];if(!Uh(t,e.domain)||Lv(t,e.domain)<e.inset*.6||Rv(o,s,[...e.domain,e.domain[0]]))continue}if(e.keepOut.some(e=>Zh(f,s,e)<4))continue;let p=!1;for(let e=0;e<n.length&&!p;e++)e!==i&&e!==a&&Bh(n[e],o,s)<6&&(p=!0);p||u.push({a:i,b:a,len:c,w:c*(.6+.8*t.next())})}u.sort((e,t)=>e.w-t.w);let d=n.map((e,t)=>t<r?0:t),f=e=>{for(;d[e]!==e;)e=d[e]=d[d[e]];return e},p=n.map(()=>[]),m=[],h=e=>m.some(t=>t.a!==e.a&&t.a!==e.b&&t.b!==e.a&&t.b!==e.b&&Hh(n[e.a],n[e.b],n[t.a],n[t.b])),g=e=>{for(let[t,i]of[[e.a,e.b],[e.b,e.a]]){let e=n[i][0]-n[t][0],a=n[i][1]-n[t][1],o=Math.hypot(e,a);for(let i of p[t]){let s=n[i][0]-n[t][0],c=n[i][1]-n[t][1],l=t>=r&&p[t].length===1?Math.cos(80*Math.PI/180):Math.cos(38*Math.PI/180);if((e*s+a*c)/(o*Math.hypot(s,c))>l)return!1}}return!0},_=e=>{m.push(e),p[e.a].push(e.b),p[e.b].push(e.a)};for(let e of u){let t=f(e.a),n=f(e.b);t!==n&&!h(e)&&g(e)&&(d[t]=n,_(e))}for(let n of u)m.includes(n)||t.chance(e.loopChance)&&(p[n.a].length>=4||p[n.b].length>=4||n.a<r&&p[n.a].length>=1||!h(n)&&g(n)&&_(n));let v=e=>e<r||p[e].length!==2,y=new Set,b=(e,t)=>e<t?`${e}-${t}`:`${t}-${e}`,x=[];for(let e=0;e<n.length;e++)if(v(e))for(let t of p[e]){if(y.has(b(e,t)))continue;let n=[e,t];y.add(b(e,t));let r=e,i=t;for(;!v(i);){let e=p[i][0]===r?p[i][1]:p[i][0];y.add(b(i,e)),n.push(e),r=i,i=e}x.push(n)}for(let e of m)y.has(b(e.a,e.b))||(y.add(b(e.a,e.b)),x.push([e.a,e.b]));let S=[];for(let i of x){let a=[n[i[0]]];for(let r=1;r<i.length;r++){let o=n[i[r-1]],s=n[i[r]],c=Math.hypot(s[0]-o[0],s[1]-o[1]),l=-(s[1]-o[1])/c,u=(s[0]-o[0])/c,d=Math.min(e.jitter,c*.12);for(let e of[.34,.67]){let n=t.range(-d,d);a.push([o[0]+(s[0]-o[0])*e+l*n,o[1]+(s[1]-o[1])*e+u*n])}a.push(s)}let o=Bv(Rh(zh(a,3),2),e.minRadius),s=e=>e>=r&&p[e].length===1,c=s(i[0])||s(i[i.length-1]),l=c?t.range(e.width[0],(e.width[0]+e.width[1])/2):t.range(e.width[0],e.width[1]);S.push({pts:o,width:Math.round(l*10)/10,deadEnd:c})}let C=[];for(let i=r;i<n.length;i++){if(p[i].length<3||!t.chance(e.plazaChance))continue;let r=t.range(4.5,6.5),a=[],o=t.range(0,Math.PI);for(let e=0;e<6;e++){let s=o+e/6*Math.PI*2,c=r*t.range(.75,1.15);a.push([n[i][0]+Math.cos(s)*c,n[i][1]+Math.sin(s)*c])}e.keepOut.some(e=>a.some(t=>Uh(t,e)))||C.push(a)}return{lanes:S,plazas:C}}var Hv=.5,Uv={Free:0,Reserved:1,Building:2,Prop:3,Green:4},Wv=class{constructor(e){this.origin=-e,this.n=Math.round(e*2/Hv);let t=this.n*this.n;this.water=new Uint8Array(t),this.rail=new Uint8Array(t),this.wall=new Uint8Array(t),this.road=new Uint8Array(t),this.occ=new Uint8Array(t),this.district=new Uint8Array(t),this.roadDist=new Float32Array(t)}col(e){return Math.floor((e-this.origin)/Hv)}cx(e){return this.origin+(e+.5)*Hv}at(e,t){let n=this.col(e),r=this.col(t);return n<0||r<0||n>=this.n||r>=this.n?-1:r*this.n+n}fillPoly(e,t){let n=1/0,r=-1/0,i=1/0,a=-1/0;for(let t of e)n=Math.min(n,t[0]),r=Math.max(r,t[0]),i=Math.min(i,t[1]),a=Math.max(a,t[1]);let o=Math.max(0,this.col(n)),s=Math.min(this.n-1,this.col(r)),c=Math.max(0,this.col(i)),l=Math.min(this.n-1,this.col(a)),u=[];for(let n=c;n<=l;n++){let r=this.cx(n);u.length=0;for(let t=0,n=e.length-1;t<e.length;n=t++){let i=e[t],a=e[n];i[1]>r!=a[1]>r&&u.push((a[0]-i[0])*(r-i[1])/(a[1]-i[1])+i[0])}if(u.length===0)continue;u.sort((e,t)=>e-t);let i=0;for(let e=o;e<=s;e++){let r=this.cx(e);for(;i<u.length&&u[i]<=r;)i++;(u.length-i)%2==1&&t(n*this.n+e)}}}fillLine(e,t,n,r){let i=[0,0];for(let a=1;a<e.length;a++){if(r?.(a-1))continue;let o=e[a-1],s=e[a],c=Math.max(0,this.col(Math.min(o[0],s[0])-t)),l=Math.min(this.n-1,this.col(Math.max(o[0],s[0])+t)),u=Math.max(0,this.col(Math.min(o[1],s[1])-t)),d=Math.min(this.n-1,this.col(Math.max(o[1],s[1])+t));for(let e=u;e<=d;e++){i[1]=this.cx(e);for(let r=c;r<=l;r++)i[0]=this.cx(r),Bh(i,o,s)<=t&&n(e*this.n+r)}}}distances(){let e=this.n,t=this.roadDist;for(let e=0;e<t.length;e++)t[e]=this.road[e]?0:1e6;let n=Hv,r=Hv*Math.SQRT2;for(let i=0;i<e;i++)for(let a=0;a<e;a++){let o=i*e+a,s=t[o];a>0&&(s=Math.min(s,t[o-1]+n)),i>0&&(s=Math.min(s,t[o-e]+n),a>0&&(s=Math.min(s,t[o-e-1]+r)),a<e-1&&(s=Math.min(s,t[o-e+1]+r))),t[o]=s}for(let i=e-1;i>=0;i--)for(let a=e-1;a>=0;a--){let o=i*e+a,s=t[o];a<e-1&&(s=Math.min(s,t[o+1]+n)),i<e-1&&(s=Math.min(s,t[o+e]+n),a<e-1&&(s=Math.min(s,t[o+e+1]+r)),a>0&&(s=Math.min(s,t[o+e-1]+r))),t[o]=s}}isLand(e){return!this.water[e]&&!this.rail[e]&&!this.wall[e]&&!this.road[e]}},Gv=[`outer`,`oldcity`,`fort`,`station`,`mechanic`,`riverside`,`newtown`,`basti`],Kv={oldcity:{front:[3.5,7],depth:[7,12],gap:0,setback:.2,storeys:[2,4],kind:`house`,infill:.88,infillSize:[5,9],infillKind:`haveli`},outer:{front:[6,10],depth:[7,11],gap:1.2,setback:1.5,storeys:[1,3],kind:`house`,infill:.55,infillSize:[6,9],infillKind:`house`},newtown:{front:[10,18],depth:[10,16],gap:2.5,setback:3.5,storeys:[2,5],kind:`block`,infill:.6,infillSize:[9,15],infillKind:`block`},station:{front:[12,20],depth:[10,15],gap:2,setback:2,storeys:[1,2],kind:`shed`,infill:.6,infillSize:[10,16],infillKind:`warehouse`},mechanic:{front:[6,9],depth:[8,11],gap:0,setback:1.2,storeys:[1,1],kind:`garage`,infill:.7,infillSize:[7,11],infillKind:`shed`},riverside:{front:[5,9],depth:[8,12],gap:.6,setback:1,storeys:[2,4],kind:`dharamshala`,infill:.55,infillSize:[6,10],infillKind:`dharamshala`},basti:{front:[3,4.5],depth:[3,4.5],gap:.8,setback:.6,storeys:[1,1],kind:`hut`,infill:.9,infillSize:[3,4.5],infillKind:`hut`},fort:null},qv={"bara-bazar":2.4,"kinari-gali":1.3,"phool-gali":1.3,"chandni-marg":1,"sadar-marg":1},Jv=.9;function Yv(e,t,n,r){let i=[];for(let a=0;a<r;a++){let o=a/r*Math.PI*2;i.push([e[0]+Math.cos(o)*t,e[1]+Math.sin(o)*n])}return i}function Xv(e,t){for(let n=1;n<e.length;n++){let r=e[n-1],i=e[n];if(t>=r[1]&&t<=i[1]||t<=r[1]&&t>=i[1])return r[0]+(i[0]-r[0])*(t-r[1])/(i[1]-r[1]||1)}return e[e.length-1][0]}function Zv(e){if(Uh(e,mh))return`oldcity`;let t=(e[0]-Th.at[0])/Th.rx,n=(e[1]-Th.at[1])/Th.rz;if(t*t+n*n<1)return`fort`;for(let t of Eh)if(Uh(e,t.poly))return t.id;return e[1]>58?`newtown`:`outer`}function Qv(e,t,n){let r=[0];for(let t=1;t<e.length;t++)r.push(r[t-1]+Math.hypot(e[t][0]-e[t-1][0],e[t][1]-e[t-1][1]));let i=[],a=0;for(let e=0;e<n.length;e++){e>0&&(a+=Math.hypot(n[e][0]-n[e-1][0],n[e][1]-n[e-1][1]));let o=1;for(;o<r.length-1&&r[o]<a;)o++;let s=Math.max(0,Math.min(1,(a-r[o-1])/(r[o]-r[o-1]||1))),c=t[o-1],l=t[o];i.push(c+(l-c)*s*s*(3-2*s))}return i}function $v(e=uh){new Fv(e);let t=Kh(mh,15);Math.abs(Wh(t))<Math.abs(Wh(mh))&&(t=Kh(mh,-15));let n=Rh(zh(t,3,!0),2);n.push([n[0][0],n[0][1]]);let r=[{id:`parikrama`,name:gh,cls:`ring`,width:dh.ring,pts:n,closed:!0,pedestrian:!1}],i=Yv(Sh.at,Sh.radius,Sh.radius,48);i.push([i[0][0],i[0][1]]),r.push({id:Sh.id,name:Sh.name,cls:`main`,width:dh.main,pts:i,closed:!0,pedestrian:!1});for(let e of xh){let t=e.straight?Rh(e.pts,2):Lh(e.pts,2);for(let r of[0,t.length-1])if(!(e.exit&&r===t.length-1))for(let e of[n,i]){let n=Vh(t[r],e);if(n.d>.2&&n.d<9){t[r]=[n.x,n.z];break}}let a={id:e.id,name:e.name,cls:e.cls,width:e.width??dh[e.cls],pts:t,exit:e.exit,pedestrian:ph.has(e.cls)};e.level&&(a.level=Qv(e.pts,e.level,t)),r.push(a)}let a=new Map(r.map(e=>[e.id,e])),o=[`bara-bazar`,`chandni-marg`,`sadar-marg`,`kotwali-gali`,`kinari-gali`,`phool-gali`,`chhatta-gali`,`paranthe-gali`].map(e=>a.get(e)),s=(e,t,n)=>{let i=[];for(let a of e){let e=0,o=14;for(let s=1;s<a.pts.length-1;s++){if(e+=Math.hypot(a.pts[s][0]-a.pts[s-1][0],a.pts[s][1]-a.pts[s-1][1]),e<o)continue;o=e+t;let c=a.pts[s];if(!n(c)||r.some(e=>e!==a&&[e.pts[0],e.pts[e.pts.length-1]].some(e=>Math.hypot(e[0]-c[0],e[1]-c[1])<12))||Ch.some(e=>Uh(c,e.poly)))continue;let l=a.pts[s-1],u=a.pts[s+1],d=Math.hypot(u[0]-l[0],u[1]-l[1])||1;i.push({p:[c[0],c[1]],t:[(u[0]-l[0])/d,(u[1]-l[1])/d]})}}return i},c=e=>Uh(e,mh),l=[...Oh.filter(e=>Uh(Gh(e.compound),mh)).map(e=>e.compound),...Ch.map(e=>e.poly)],u=Vv({domain:mh,inset:7,spacing:18,reach:34,anchors:s(o,24,c),obstacles:o.map(e=>e.pts),obstacleClear:8,keepOut:l,width:fh,loopChance:.3,jitter:3,plazaChance:.28,minRadius:5,rng:new Fv(Iv(e,1))}),d=u.lanes.map((e,t)=>({...e,i:t,len:e.pts.length}));d.sort((e,t)=>t.len-e.len),d.forEach((e,t)=>{r.push({id:`gali-${e.i}`,name:t<Fh.length?Fh[t]:``,cls:`gali`,width:e.width,pts:e.pts,generated:!0,pedestrian:!1})});let f=Eh.find(e=>e.id===`basti`).poly,p=[`bus-adda-road`,`ghat-road`].map(e=>a.get(e)),m=s([p[0]],14,e=>e[1]>200),h=p[1].pts,g=h[h.length-1],_=h[h.length-2];m.push({p:[g[0],g[1]],t:[g[0]-_[0],g[1]-_[1]].map(e=>e/Math.hypot(g[0]-_[0],g[1]-_[1]))}),Vv({domain:f,inset:3,spacing:12,reach:24,anchors:m,obstacles:p.map(e=>e.pts),obstacleClear:6,keepOut:Oh.filter(e=>e.id===`dhobi-ghat`||e.id===`bus-adda`).map(e=>e.compound),width:[3.5,4],loopChance:.25,jitter:2,plazaChance:0,minRadius:5,rng:new Fv(Iv(e,2))}).lanes.forEach((e,t)=>r.push({id:`basti-${t}`,name:``,cls:`dirt`,width:e.width,pts:e.pts,generated:!0,pedestrian:!1}));let v=[...Ch.map(e=>({id:e.id,name:e.name,poly:e.poly.map(e=>[e[0],e[1]])})),...u.plazas.map((e,t)=>({id:`chowki-${t}`,name:``,poly:e}))],y=Lh(_h,4),b=[...y,[262,262],[262,-262]],x=vh.map(e=>{let t=[],n=[];for(let r=e.z0;r<=e.z1+.01;r+=2){let i=Xv(y,r);t.push([i-e.inland,r]),n.push([i+e.water,r])}return{id:e.id,name:e.name,poly:[...t,...n.reverse()]}}),S={x0:Xv(y,yh.z)-2,x1:260,z:yh.z,width:yh.deckWidth,name:yh.name},C=new Wv(260);C.fillPoly(b,e=>C.water[e]=1),C.fillLine(bh.pts,bh.width/2,e=>C.rail[e]=1),C.fillLine([...mh,mh[0]],3/2,e=>C.wall[e]=1);for(let e of hh)C.fillLine([e.at,e.at],e.width/2,e=>C.wall[e]=0);for(let e of r){let t=e.level;C.fillLine(e.pts,e.width/2,t=>C.road[t]=e.pedestrian?C.road[t]===1?1:2:1,t?e=>t[e]>.25&&t[e+1]>.25:void 0)}for(let e of v)C.fillPoly(e.poly,e=>C.road[e]=C.road[e]||3);for(let e of x)C.fillPoly(e.poly,e=>C.road[e]=C.road[e]||2);let w=Yv(Sh.at,Sh.island,Sh.island,32);C.fillPoly(w,e=>C.occ[e]=Uv.Green),C.distances();for(let e=0;e<C.n;e++)for(let t=0;t<C.n;t++)C.district[e*C.n+t]=Gv.indexOf(Zv([C.cx(t),C.cx(e)]));for(let e of Oh)C.fillPoly(e.compound,e=>C.occ[e]=C.occ[e]||Uv.Reserved);C.fillPoly(t,e=>{if(C.road[e]||C.occ[e]||C.wall[e])return;let t=e%C.n,n=(e-t)/C.n;Uh([C.cx(t),C.cx(n)],mh)||(C.occ[e]=Uv.Green)});let T=Yv(Th.at,Th.rx,Th.rz,40);C.fillPoly(T,e=>C.occ[e]=C.occ[e]||Uv.Green),C.fillLine(y,4,e=>{!C.water[e]&&!C.road[e]&&!C.occ[e]&&(C.occ[e]=Uv.Green)});let E=[];for(let e of kh){let t=null;for(let n=0;n<=12&&!t;n+=1.5)for(let r=0;r<(n?12:1)&&!t;r++){let i=e[0]+Math.cos(r/12*Math.PI*2)*n,a=e[1]+Math.sin(r/12*Math.PI*2)*n,o=C.at(i,a)>=0;C.fillLine([[i,a],[i,a]],3.8,e=>{(C.road[e]||C.water[e]||C.wall[e]||C.rail[e]||C.occ[e]===Uv.Building)&&(o=!1)}),o&&(t=[i,a])}t&&(E.push(t),C.fillLine([t,t],3.6,e=>{C.occ[e]||(C.occ[e]=Uv.Reserved)}))}let D=Array.from({length:676},()=>[]),O=[];for(let e of r)if(!e.pedestrian)for(let t=1;t<e.pts.length;t++){if(e.level&&e.level[t]>.25)continue;let n=e.pts[t-1],r=e.pts[t],i=O.length;O.push([n,r,e.width]);let a=Math.floor(((n[0]+r[0])/2+260)/20),o=Math.floor(((n[1]+r[1])/2+260)/20);a>=0&&o>=0&&a<26&&o<26&&D[o*26+a].push(i)}let k=(e,t)=>{let n=Math.floor((e+260)/20),r=Math.floor((t+260)/20),i=1/0,a=[1,0];for(let o=1;o<=3&&i===1/0;o++)for(let s=r-o;s<=r+o;s++)for(let r=n-o;r<=n+o;r++)if(!(r<0||s<0||r>=26||s>=26))for(let n of D[s*26+r]){let[r,o]=O[n],s=Vh([e,t],[r,o]);if(s.d<i){i=s.d;let e=Math.hypot(o[0]-r[0],o[1]-r[1])||1;a=[(o[0]-r[0])/e,(o[1]-r[1])/e]}}return a},A=[],j=new Map,M=(e,t)=>Math.floor((t+260)/20)*27+Math.floor((e+260)/20),N=e=>{let[t,n]=Gh(e),r=Math.floor((t+260)/20),i=Math.floor((n+260)/20);for(let t=i-1;t<=i+1;t++)for(let n=r-1;n<=r+1;n++)if(!(n<0||t<0||n>=26||t>=26)){for(let r of D[t*26+n]){let[t,n,i]=O[r];if(Zh(t,n,e)<i/2+.25)return!1}for(let r of j.get(t*27+n)??[])if(Xh(e,A[r].poly,.05))return!1}return!0},ee=(e,t,n,r,i,a,o,s,c)=>{for(let t of e)if(C.at(t[0],t[1])<0)return!1;let l=!0,u=0;if(C.fillPoly(e,e=>{u++,l&&(C.water[e]||C.rail[e]||C.wall[e]||C.road[e]||C.occ[e]||C.roadDist[e]<Jv||C.district[e]!==c)&&(l=!1)}),!l||u===0||!N(e))return!1;{let e=Math.max(t,.35);C.fillPoly(Yh(n,r,i,a,o+e,s+e),e=>{C.occ[e]===Uv.Building&&(l=!1)})}return l},te=(e,t,n,r,i)=>{C.fillPoly(e,e=>C.occ[e]=Uv.Building);let[a,o]=Gh(e),s=M(a,o),c=j.get(s);c||j.set(s,c=[]),c.push(A.length);let l=i.int(r.storeys[0],r.storeys[1]);A.push({poly:e,storeys:l,district:t,kind:n,tone:i.next(),roofTank:n!==`hut`&&n!==`shed`&&n!==`garage`&&n!==`warehouse`&&i.chance(.35)})},ne=[`bazaar`,`main`,`street`,`ring`,`gali`,`dirt`],re=r.filter(e=>!e.pedestrian).sort((e,t)=>ne.indexOf(e.cls)-ne.indexOf(t.cls)),ie=new Fv(Iv(e,3));for(let e of re){let t=e.pts,n=[0];for(let e=1;e<t.length;e++)n.push(n[e-1]+Math.hypot(t[e][0]-t[e-1][0],t[e][1]-t[e-1][1]));let r=n[n.length-1],i=e=>{let r=1;for(;r<n.length-1&&n[r]<e;)r++;let i=Math.max(0,Math.min(1,(e-n[r-1])/(n[r]-n[r-1]||1)));return[t[r-1][0]+(t[r][0]-t[r-1][0])*i,t[r-1][1]+(t[r][1]-t[r-1][1])*i]},a=t=>{if(!e.level)return 0;let r=0;for(;r<n.length-1&&n[r]<t;)r++;return e.level[r]};for(let t of[-1,1]){let n=1;for(;n<r-2;){if(a(n)>.1){n+=2;continue}let o=i(n),s=i(Math.max(0,n-1)),c=i(Math.min(r,n+1)),l=Math.hypot(c[0]-s[0],c[1]-s[1])||1,u=-(c[1]-s[1])/l*t,d=(c[0]-s[0])/l*t,f=Zv([o[0]+u*(e.width/2+4),o[1]+d*(e.width/2+4)]),p=Kv[f];if(!p){n+=4;continue}let m=Math.max(p.setback,qv[e.id]??0),h=ie.range(p.front[0],p.front[1]),g=!1;for(let a of[1,.75,.5]){let o=Math.max(p.front[0]*.8,h*(a===.5?.7:1)),s=i(n),c=i(Math.min(r,n+o)),l=Math.hypot(c[0]-s[0],c[1]-s[1]);if(l<o*.8)break;let u=(c[0]-s[0])/l,d=(c[1]-s[1])/l,_=-d*t,v=u*t,y=ie.range(p.depth[0],p.depth[1])*a;if(y<2.5)continue;let b=e.width/2+Math.max(m,1.25)+y/2,x=(s[0]+c[0])/2+_*b,S=(s[1]+c[1])/2+v*b,C=Yh(x,S,u,d,l/2,y/2);if(ee(C,p.gap,x,S,u,d,l/2,y/2,Gv.indexOf(f))){te(C,f,f===`oldcity`&&(e.cls===`bazaar`||e.cls===`street`)?`shop`:p.kind,p,ie),n+=l+p.gap,g=!0;break}}g||(n+=1.5)}}}let ae=[];for(let e of Gv){let t=Kv[e];!t||t.infill<=0||(ae.push([e,1,t.infill,e===`outer`||e===`newtown`?26:1e9]),(e===`oldcity`||e===`basti`||e===`riverside`)&&(ae.push([e,.7,1,1e9],[e,.5,1,1e9]),e===`oldcity`&&ae.push([e,.4,1,1e9])))}for(let[e,t,n,r]of ae){let i=Kv[e],a=Gv.indexOf(e),o=(i.infillSize[0]+i.infillSize[1])/2*.8*t;for(let s=-260+o/2;s<260;s+=o)for(let c=-260+o/2;c<260;c+=o){let l=c+ie.range(-o*.3,o*.3),u=s+ie.range(-o*.3,o*.3),d=C.at(l,u);if(d<0||C.district[d]!==a||C.occ[d]||!C.isLand(d)||C.roadDist[d]<2||C.roadDist[d]>r||!ie.chance(n))continue;let f=k(l,u),p=e===`basti`?ie.range(-.5,.5):0,m=f[0]*Math.cos(p)-f[1]*Math.sin(p),h=f[0]*Math.sin(p)+f[1]*Math.cos(p);for(let n of[1,.7]){let r=ie.range(i.infillSize[0],i.infillSize[1])*n*t/2,o=ie.range(i.infillSize[0],i.infillSize[1])*n*t/2;if(r<1.2||o<1.2)continue;let s=Yh(l,u,m,h,r,o);if(ee(s,i.gap,l,u,m,h,r,o,a)){te(s,e,i.infillKind,i,ie);break}}}}let oe=[],P=new Fv(Iv(e,4)),se=(e,t,n,r)=>{let i=!0,a=0;return C.fillLine([[e,t],[e,t]],n,e=>{a++;let t=C.occ[e];(C.water[e]||C.rail[e]||C.wall[e]||C.road[e]||t&&(!r||t!==Uv.Green&&t!==Uv.Reserved))&&(i=!1)}),i&&a>0},ce=(e,t,n,r,i,a=!1)=>se(t,n,i,a)?(C.fillLine([[t,n],[t,n]],i,e=>C.occ[e]=Uv.Prop),oe.push({kind:e,x:t,z:n,heading:r,r:i,tone:P.next()}),!0):!1;for(let[e,t]of[[`bara-bazar`,.85],[`kinari-gali`,.55],[`phool-gali`,.55],[`chandni-marg`,.35]]){let n=a.get(e);for(let e of[-1,1])for(let r=2;r<n.pts.length-2;r++){if(!P.chance(t*.6))continue;let i=n.pts[r-1],a=n.pts[r+1],o=Math.hypot(a[0]-i[0],a[1]-i[1])||1,s=-(a[1]-i[1])/o*e,c=(a[0]-i[0])/o*e,l=n.width/2+1.05;ce(`stall`,n.pts[r][0]+s*l,n.pts[r][1]+c*l,Math.atan2(a[0]-i[0],a[1]-i[1]),.85)}}let le=[],ue=e=>{le.some(t=>Math.hypot(t[0]-e[0],t[1]-e[1])<8)||le.push(e)};for(let e of r)if(!(e.closed||e.pedestrian))for(let t of[e.pts[0],e.pts[e.pts.length-1]])r.some(n=>n!==e&&!n.pedestrian&&Vh(t,n.pts).d<n.width/2+1)&&ue([t[0],t[1]]);let de=r.filter(e=>!e.generated&&!e.pedestrian);for(let e=0;e<de.length;e++)for(let t=e+1;t<de.length;t++){let n=de[e].pts,r=de[t].pts;for(let i=1;i<n.length;i++)for(let a=1;a<r.length;a++)if(Hh(n[i-1],n[i],r[a-1],r[a])){if((de[e].level?.[i]??0)>.25||(de[t].level?.[a]??0)>.25)continue;ue([(n[i][0]+r[a][0])/2,(n[i][1]+r[a][1])/2])}}let fe={oldcity:[[`chai`,.32],[`shrine`,.24],[`cart`,.18],[`bikes`,.18],[`banyan`,.08]],newtown:[[`chai`,.3],[`tree`,.25],[`bikes`,.2],[`shrine`,.15],[`banyan`,.1]],other:[[`chai`,.3],[`shrine`,.2],[`cart`,.15],[`bikes`,.15],[`banyan`,.2]]},pe={chai:1.3,shrine:1,cart:.9,bikes:1,banyan:3.6,tree:1.6};for(let e of le){let t=C.at(e[0],e[1]),n=fe[t>=0?Gv[C.district[t]]:`outer`]??fe.other,r=P.next(),i=`chai`;for(let[e,t]of n){if(r<t){i=e;break}r-=t}let a=pe[i],o=P.range(0,Math.PI*2),s=!1;for(let t=0;t<12&&!s;t++){let n=o+t/12*Math.PI*2;for(let t of[6,8,10,13]){let r=e[0]+Math.cos(n)*t,o=e[1]+Math.sin(n)*t,c=C.at(r,o);if(!(c<0||C.roadDist[c]>a+2.5||C.roadDist[c]<a+.3)&&ce(i,r,o,n,a)){s=!0;break}}}}for(let e of E)ce(`banyan`,e[0],e[1],0,3.6,!0);for(let e of[`nehru-marg`,`nehru-marg-s`,`mg-road-w`,`mg-road-e`,`mall-road`,`aspatal-road`,`pul-road`,`qila-marg`]){let t=a.get(e);for(let e of[-1,1])for(let n=3;n<t.pts.length-3;n+=5){let r=t.pts[n-1],i=t.pts[n+1],a=Math.hypot(i[0]-r[0],i[1]-r[1])||1,o=t.width/2+2;ce(`tree`,t.pts[n][0]-(i[1]-r[1])/a*e*o,t.pts[n][1]+(i[0]-r[0])/a*e*o,0,1.4,!0)}}for(let e of r)if(!(e.generated||e.pedestrian||e.cls===`ring`))for(let t of[-1,1])for(let n=2;n<e.pts.length-2;n+=3){let r=C.at(e.pts[n][0],e.pts[n][1]);if(r<0||Gv[C.district[r]]!==`newtown`||!P.chance(.3))continue;let i=e.pts[n-1],a=e.pts[n+1],o=Math.hypot(a[0]-i[0],a[1]-i[1])||1,s=e.width/2+1.3;ce(`parking`,e.pts[n][0]-(a[1]-i[1])/o*t*s,e.pts[n][1]+(a[0]-i[0])/o*t*s,Math.atan2(a[0]-i[0],a[1]-i[1]),1.1)}for(let e of Ah)for(let t=0;t<4;t++){let n=e.at[0]+Math.sin(e.heading)*t*2.4,r=e.at[1]-Math.cos(e.heading)*t*2.4;oe.push({kind:`auto`,x:n,z:r,heading:e.heading,r:1,tone:P.next()})}for(let e of[...jh,...Mh])C.fillLine([[e.at[0],e.at[1]],[e.at[0],e.at[1]]],e.r,e=>C.occ[e]=C.occ[e]||Uv.Prop),oe.push({kind:e.kind,x:e.at[0],z:e.at[1],heading:e.heading,r:e.r,tone:P.next()});for(let e=0;e<2600;e++){let e=P.range(-260,260),t=P.range(-260,260),n=C.at(e,t);n<0||C.occ[n]!==Uv.Green||C.roadDist[n]<3||ce(`tree`,e,t,0,P.range(1.4,2.4),!0)}for(let e of Nh)for(let t=0;t<3;t++){let t=e.poly,n=P.range(Math.min(t[0][0],t[2][0]),Math.max(t[0][0],t[2][0])),r=P.range(Math.min(t[0][1],t[2][1]),Math.max(t[0][1],t[2][1]));oe.push({kind:`cow`,x:n,z:r,heading:P.range(0,Math.PI*2),r:.9,tone:P.next()})}let me=Oh.find(e=>e.id===`dhobi-ghat`);for(let e=0;e<12;e++)for(let t=0;t<3;t++){let n=194+e*5.2,r=Xv(y,n)-5-t*4.4;Uh([r,n],me.compound)&&oe.push({kind:`pool`,x:r,z:n,heading:0,r:1.8,tone:P.next()})}let he=ey(C),ge=[T,...Oh.filter(e=>e.kind===`maidan`).map(e=>e.compound.map(e=>[e[0],e[1]]))];return{seed:e,half:260,roads:r,wall:mh.map(e=>[e[0],e[1]]),ring:n,gates:hh,river:b,bank:y,ghats:x,bridge:S,rail:bh,squares:v,roundabout:Sh,fortHill:T,greens:ge,blocks:he,buildings:A,landmarks:Oh,props:oe,junctions:le,cowZones:Nh,spots:Ph,spawn:wh,raster:C}}function ey(e){let t=e.n,n=new Int32Array(t*t).fill(-1),r=[],i=[1,1,0,-1,-1,-1,0,1],a=[0,1,1,1,0,-1,-1,-1],o=new Int32Array(t*t),s=0;for(let c=0;c<t*t;c++){if(n[c]!==-1||!e.isLand(c))continue;let l=0,u=0;o[u++]=c,n[c]=s;let d=0,f=new Uint32Array(Gv.length);for(;l<u;){let r=o[l++];d++;let i=r%t,a=(r-i)/t;f[e.district[r]]++,i>0&&n[r-1]===-1&&e.isLand(r-1)&&(n[r-1]=s,o[u++]=r-1),i<t-1&&n[r+1]===-1&&e.isLand(r+1)&&(n[r+1]=s,o[u++]=r+1),a>0&&n[r-t]===-1&&e.isLand(r-t)&&(n[r-t]=s,o[u++]=r-t),a<t-1&&n[r+t]===-1&&e.isLand(r+t)&&(n[r+t]=s,o[u++]=r+t)}let p=d*Hv*Hv,m=s++;if(p<40)continue;let h=(e,r)=>e>=0&&r>=0&&e<t&&r<t&&n[r*t+e]===m,g=c%t,_=(c-g)/t,v=g,y=_,b=4,x=[[e.cx(v),e.cx(y)]];for(let t=0;t<4e5;t++){let t=-1;for(let e=1;e<=8;e++){let n=(b+e)%8;if(h(v+i[n],y+a[n])){t=n;break}}if(t<0)break;let n=(t+7)%8,r=v+i[n],o=y+a[n];v+=i[t],y+=a[t];let s=r-v,c=o-y;b=0;for(let e=0;e<8;e++)i[e]===s&&a[e]===c&&(b=e);if(v===g&&y===_)break;x.push([e.cx(v),e.cx(y)])}x.push(x[0]);let S=Jh(x,.7);S.pop();let C=0;for(let e=1;e<f.length;e++)f[e]>f[C]&&(C=e);r.push({id:r.length,poly:S,area:p,district:Gv[C]})}return r}var ty={ring:`arterial`,main:`arterial`,street:`street`,bazaar:`street`,gali:`lane`,dirt:`lane`,ghat:`lane`},ny={ring:2,main:2,street:1,bazaar:1,gali:1,dirt:1,ghat:1},ry=7;function iy(e){let t=e.half-6;return e.roads.filter(t=>!t.pedestrian&&t.id!==`flyover`&&t.id!==e.roundabout.id).map(e=>e.exit?{...e,pts:e.pts.filter(e=>Math.abs(e[0])<=t&&Math.abs(e[1])<=t)}:e)}function ay(e){let t=[0];for(let n=1;n<e.length;n++)t.push(t[n-1]+Math.hypot(e[n][0]-e[n-1][0],e[n][1]-e[n-1][1]));return t}function oy(e){let t=iy(e),n=e.roundabout,r=n.radius+5.25+1,i=[{x:n.at[0],z:n.at[1],r,members:1,roundabout:!0}],a=(e,t,a)=>{if(!(Math.hypot(e-n.at[0],t-n.at[1])<r+4)){for(let n of i)if(!n.roundabout&&Math.hypot(n.x-e,n.z-t)<ry){n.x=(n.x*n.members+e)/(n.members+1),n.z=(n.z*n.members+t)/(n.members+1),n.r=Math.max(n.r,a),n.members++;return}i.push({x:e,z:t,r:a,members:1,roundabout:!1})}};for(let n of t)for(let r of[0,n.pts.length-1]){if(n.exit&&r===n.pts.length-1)continue;let i=n.pts[r];for(let r of t){if(r===n)continue;let t=Vh(i,r.pts),o=e.squares.some(e=>e.name&&Uh(i,e.poly))?14:r.width/2+2;t.d<=o&&a(t.x,t.z,Math.max(n.width,r.width)/2+.6)}}for(let e=0;e<t.length;e++)for(let n=e+1;n<t.length;n++){let r=t[e].pts,i=t[n].pts;for(let o=1;o<r.length;o++)for(let s=1;s<i.length;s++)Hh(r[o-1],r[o],i[s-1],i[s])&&a((r[o][0]+i[s][0])/2,(r[o][1]+i[s][1])/2,Math.max(t[e].width,t[n].width)/2+.6)}let o=[];for(let e of t){let t=ay(e.pts),n=t[t.length-1],r=[];if(i.forEach((n,i)=>{let a=Vh([n.x,n.z],e.pts),o=n.roundabout?n.r:Math.max(n.r,e.width/2+1.5);if(a.d>o)return;let s=e.pts[a.i];r.push({s:t[a.i]+Math.hypot(a.x-s[0],a.z-s[1]),node:i})}),r.sort((e,t)=>e.s-t.s),(!r.length||r[0].s>1)&&(i.push({x:e.pts[0][0],z:e.pts[0][1],r:0,members:1,roundabout:!1}),r.unshift({s:0,node:i.length-1})),r[r.length-1].s<n-1){let t=e.pts[e.pts.length-1];i.push({x:t[0],z:t[1],r:0,members:1,roundabout:!1}),r.push({s:n,node:i.length-1})}o.push(r)}let s=[],c=[],l=(e,t)=>t.r>0&&(t.roundabout?Math.hypot(e[0]-t.x,e[1]-t.z)<t.r:Math.max(Math.abs(e[0]-t.x),Math.abs(e[1]-t.z))<t.r);t.forEach((e,t)=>{let n=ay(e.pts),r=o[t];for(let t=1;t<r.length;t++){let a=r[t-1],o=r[t];if(a.node===o.node)continue;let u=i[a.node],d=i[o.node],f=[];for(let t=0;t<e.pts.length;t++){if(n[t]<=a.s||n[t]>=o.s)continue;let r=e.pts[t];l(r,u)||l(r,d)||f.push([r[0],r[1]])}if(u.r===0&&f.unshift([u.x,u.z]),d.r===0&&f.push([d.x,d.z]),f.length<2)continue;let p=ay(f)[f.length-1];if(p<1.5)continue;let m=s.length;s.push({id:m,road:e.id,name:e.name,cls:e.cls,kind:ty[e.cls],width:e.width,lanes:ny[e.cls],pts:f,length:p,a:a.node,b:o.node}),c.push({seg:m,end:0,node:a.node},{seg:m,end:1,node:o.node})}});let u=new Map,d=[];for(let e of c){if(u.has(e.node))continue;let t=i[e.node],n=d.length;u.set(e.node,n);let r=t.r;d.push({id:n,kind:`deadend`,minX:t.x-r,minZ:t.z-r,maxX:t.x+r,maxZ:t.z+r,cx:t.x,cz:t.z,r,approaches:[]})}for(let e of c){let t=d[u.get(e.node)],n=s[e.seg];e.end===0?n.a=t.id:n.b=t.id;let r=e.end===0?n.pts[0]:n.pts[n.pts.length-1],i=r[0]-t.cx,a=r[1]-t.cz,o=Math.abs(i)>Math.abs(a)?i>0?1:3:a>0?2:0;t.approaches.push({side:o,segment:e.seg,end:e.end})}for(let[e,t]of u){let n=d[t],r=n.approaches.length;n.kind=i[e].roundabout?`roundabout`:r<=1?`deadend`:r===2?`corner`:r===3?`tee`:`cross`}return{segments:s,intersections:d}}var sy=3.1,cy={minX:-260,minZ:-260,maxX:260,maxZ:260},ly=uh,uy=7.2,dy=new Map;function fy(e=ly){let t=dy.get(e);return t||(t=gy(e),dy.set(e,t)),t}var py={hut:()=>2.5,shed:()=>5.2,warehouse:()=>6.8,garage:()=>4.4},my={stall:.75,flowers:.75,chai:1,shrine:.7,cart:.65,banyan:2.8,tree:.3,pool:1.5,bench:.5},hy=15;function gy(e=ly){let t=$v(e),n=oy(t),r=t.raster,i=new Fv(Iv(e,9)),a=[],o=(e,t)=>{let n=r.at(e,t);return n>=0&&(r.road[n]===1||r.road[n]===3||r.roadDist[n]<1.2)},s=t.buildings.map((t,n)=>_y(t,n,e,o));for(let e of s)a.push(e);for(let e of t.landmarks)if(e.kind===`fort`)Sy(e,a);else for(let t of e.parts)a.push(vy(t.poly));let c=Ey(t,a),l=e=>{let n=t.bank;for(let t=1;t<n.length;t++){let r=n[t-1],i=n[t];if(e>=r[1]&&e<=i[1]||e<=r[1]&&e>=i[1])return r[0]+(i[0]-r[0])*(e-r[1])/(i[1]-r[1]||1)}return n[n.length-1][0]},u=t.bridge,d=u.z-u.width/2,f=u.z+u.width/2,p=[];for(let e=-260;e<260;e+=4)p.push(e);p.push(260,d,f),p.sort((e,t)=>e-t);for(let e=1;e<p.length;e++){let t=p[e-1],n=p[e];if(n-t<.01||t>=d-.01&&n<=f+.01)continue;let r=Math.min(l(t),l(n))+1;a.push({minX:r,minZ:t,maxX:262,maxZ:n})}for(let e of[-1,1]){let t=u.z+e*(u.width/2+.25);a.push({minX:u.x0-2,minZ:t-.25,maxX:262,maxZ:t+.25})}let m=bh.pts[0][0]+bh.width/2,h=bh.crossing.at[1],g=6.5;a.push({minX:-262,minZ:-262,maxX:m,maxZ:h-g}),a.push({minX:-262,minZ:h+g,maxX:m,maxZ:262});let _=Sh,v=_.island*.7;a.push(Wd(_.at[0],_.at[1],0,v,v),Wd(_.at[0],_.at[1],Math.PI/4,v,v));let y=[],b=t.roads.find(e=>e.id===`flyover`);if(b?.level){let e=b.pts[0][1];for(let t=0;t<b.pts.length;t++){let[n]=b.pts[t];b.level[t]<.55||Math.round(n)%14!=0||Math.abs(n-_.at[0])<24&&Math.abs(e-_.at[1])<24||y.push({x:n,z:e-6.4},{x:n,z:e+6.4})}y.push({x:_.at[0]-4,z:_.at[1]},{x:_.at[0]+4,z:_.at[1]});for(let e of y)a.push(Wd(e.x,e.z,0,.6,.6))}let x=[],S=[],C=(e,t)=>n.intersections.some(n=>n.r>0&&Math.max(Math.abs(e-n.cx),Math.abs(t-n.cz))<n.r+hy);t.props.forEach((t,n)=>{if(t.kind===`cow`||t.kind===`auto`)return;if(t.kind===`parking`){C(t.x,t.z)||S.push({x:t.x,z:t.z,heading:Math.PI-t.heading,kind:`car`});return}let r=my[t.kind];x.push({kind:t.kind,x:t.x,z:t.z,heading:t.heading,r:t.r,tone:t.tone,solid:r!==void 0,seed:Iv(e,5e3+n)}),r!==void 0&&a.push(Wd(t.x,t.z,t.heading,r,r))});for(let e of Ah)for(let t=0;t<4;t++)S.push({x:e.at[0]+Math.sin(e.heading)*t*2.4,z:e.at[1]-Math.cos(e.heading)*t*2.4,heading:e.heading,kind:`rickshaw`});for(let e=0;e<3;e++)S.push({x:-225+e*6,z:-102,heading:0,kind:`truck`});let w=[];for(let e of n.segments){if(e.cls!==`gali`&&e.cls!==`bazaar`&&e.cls!==`dirt`)continue;let r=i.range(3,9),a=0;for(let o=1;o<e.pts.length-1;o++){if(a+=Math.hypot(e.pts[o][0]-e.pts[o-1][0],e.pts[o][1]-e.pts[o-1][1]),a<r)continue;r=a+i.range(7,15);let s=e.pts[o-1],c=e.pts[o+1],l=Math.hypot(c[0]-s[0],c[1]-s[1])||1,u=-(c[1]-s[1])/l,d=(c[0]-s[0])/l,f=e.width/2+1.1,p=i.range(-2.5,2.5),m=(c[0]-s[0])/l,h=(c[1]-s[1])/l,[g,_]=e.pts[o],v=n.intersections.some(e=>g>e.minX-3&&g<e.maxX+3&&_>e.minZ-3&&_<e.maxZ+3)||t.squares.some(e=>Uh([g,_],e.poly));for(let e=0;e<(!v&&i.chance(.5)?2:+!v);e++){let e=i.range(5,6.6),t=e+i.range(-.5,.5);w.push(g-u*f-m*p,e,_-d*f-h*p,g+u*f+m*p,t,_+d*f+h*p)}}}let T=new Dv(a,{...cy}),E=[],D=(e,t)=>{let n=r.at(e,t);if(n<0||r.water[n]||r.wall[n]||r.occ[n]===Uv.Building)return!1;E.length=0,T.query(e-.4,t-.4,e+.4,t+.4,E);for(let n of E)if(Gd(n,e,t,.35))return!1;return!0},O=jv(n,Sh.radius,(e,t)=>{let n=r.at(e,t);if(n<0||r.road[n]!==1&&r.road[n]!==3)return!1;E.length=0,T.query(e-.2,t-.2,e+.2,t+.2,E);for(let n of E)if(Gd(n,e,t,.1))return!1;return!0});for(let e=S.length-1;e>=0;e--){let t=S[e];E.length=0,T.query(t.x-1.2,t.z-1.2,t.x+1.2,t.z+1.2,E),E.some(e=>Gd(e,t.x,t.z,1))&&S.splice(e,1)}let k=Pv(n,D,t.roads.filter(e=>e.pedestrian).map(e=>e.pts)),A=e=>t.landmarks.find(t=>t.id===e),j=e=>{let t=A(e);return{id:e,name:t.name,x:t.access[0],z:t.access[1]}},M={hospital:j(`aspatal`),police:j(`kotwali`),paintShops:t.landmarks.filter(e=>e.kind===`paintShop`).map(e=>j(e.id)),garage:j(`raju-motors`)},N=t.spots.map(e=>({role:e.role,...j(e.at)})),ee=A(`bada-mandir`),te={x:t.spawn[0],z:t.spawn[1],heading:Math.PI/2},ne=e=>Math.hypot(e.cx-te.x,e.cz-te.z),re=[],ie=-1;for(let e of n.intersections)e.r>0&&(ie<0||ne(e)<ne(n.intersections[ie]))&&(ie=e.id);ie>=0&&re.push(ie);let ae=n.intersections.filter(e=>e.id===ie||e.kind===`roundabout`||e.approaches.length<3?!1:e.approaches.filter(e=>n.segments[e.segment].kind!==`lane`).length>=3);ae.sort((e,t)=>ne(e)-ne(t));for(let e of ae)re.push(e.id);let oe=t.cowZones.map(e=>vy(e.poly)),P=new Dv(a,{...cy});return{seed:e,plan:t,streets:n,lanes:O,peds:k,buildings:s,props:x,wires:w,parking:S,gates:c,cowZones:oe,temple:{x:ee.access[0],z:ee.access[1]-4,size:Math.round(Math.abs(ee.compound[2][1]-ee.compound[0][1]))},places:M,spots:N,pillars:y,boxes:a,staticWorld:P,chowks:re,roundabouts:[{x:_.at[0],z:_.at[1],island:_.island}],spawn:te,toJSON:()=>({city:e})}}function _y(e,t,n,r){let[i,a,o]=e.poly,s=Math.hypot(a[0]-i[0],a[1]-i[1])||1,c=Math.hypot(o[0]-a[0],o[1]-a[1])||1,l=(a[0]-i[0])/s,u=(a[1]-i[1])/s,[d,f]=Gh(e.poly),p=Wd(d,f,Math.atan2(u,l),s/2,c/2),m=0;for(let t=0;t<4;t++){let n=e.poly[t],i=e.poly[(t+1)%4],a=(n[0]+i[0])/2,o=(n[1]+i[1])/2,s=Math.hypot(a-d,o-f)||1;r(a+(a-d)/s*2.2,o+(o-f)/s*2.2)&&(m|=1<<t)}let h=py[e.kind]?.(e.storeys)??e.storeys*3.1+(e.kind===`shop`?.4:0);return{...p,poly:e.poly,x:d,z:f,ux:l,uz:u,hu:s/2,hv:c/2,storeys:e.storeys,height:h,kind:e.kind,zone:e.district,tone:e.tone,roofTank:e.roofTank,front:m,seed:Iv(n,t)}}function vy(e){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let a of e)t=Math.min(t,a[0]),r=Math.max(r,a[0]),n=Math.min(n,a[1]),i=Math.max(i,a[1]);return{minX:t,minZ:n,maxX:r,maxZ:i}}function yy(e,t,n){let r=Math.hypot(t[0]-e[0],t[1]-e[1])||1;return Wd((e[0]+t[0])/2,(e[1]+t[1])/2,Math.atan2(t[1]-e[1],t[0]-e[0]),r/2,n/2)}var by=2.5;function xy(e){let t=e.parts[0].poly,n=t.length,r=0,i=1/0;for(let a=0;a<n;a++){let o=t[a],s=t[(a+1)%n],c=Math.hypot((o[0]+s[0])/2-e.access[0],(o[1]+s[1])/2-e.access[1]);c<i&&(i=c,r=a)}let a=[],o=[[0,0],[0,0]];for(let i=0;i<n;i++){let s=t[i],c=t[(i+1)%n];if(i!==r){a.push([[s[0],s[1]],[c[0],c[1]]]);continue}let l=Math.hypot(c[0]-s[0],c[1]-s[1]),u=(c[0]-s[0])/l,d=(c[1]-s[1])/l,f=Math.max(9,Math.min(l-9,(e.access[0]-s[0])*u+(e.access[1]-s[1])*d));a.push([[s[0],s[1]],[s[0]+u*(f-9/2),s[1]+d*(f-9/2)]]),a.push([[s[0]+u*(f+9/2),s[1]+d*(f+9/2)],[c[0],c[1]]]),o=[[s[0]+u*(f-9/2),s[1]+d*(f-9/2)],[s[0]+u*(f+9/2),s[1]+d*(f+9/2)]]}let[s,c]=Gh(t);return{walls:a,gate:o,towers:t.map(e=>[e[0],e[1]]),keep:{x:s,z:c-6,hw:8,hl:6}}}function Sy(e,t){let n=xy(e);for(let[e,r]of n.walls)t.push(yy(e,r,by));t.push(yy(n.gate[0],n.gate[1],by));for(let e of n.towers)t.push(Wd(e[0],e[1],0,2.6,2.6));t.push(Wd(n.keep.x,n.keep.z,0,n.keep.hw,n.keep.hl))}var Cy=46;function wy(e){let t=e.wall,n=t.length,[r,i]=Gh(t),a=[],o=[],s=[];for(let s=0;s<n;s++){let c=t[s],l=t[(s+1)%n],u=Math.hypot(l[0]-c[0],l[1]-c[1]),d=(l[0]-c[0])/u,f=(l[1]-c[1])/u,p=[];for(let t of e.gates){let e=(t.at[0]-c[0])*d+(t.at[1]-c[1])*f;Math.abs((t.at[0]-c[0])*-f+(t.at[1]-c[1])*d)<3&&e>-t.width&&e<u+t.width&&p.push([e-t.width/2,e+t.width/2])}p.sort((e,t)=>e[0]-t[0]);let m=-3/2,h=e=>[c[0]+d*e,c[1]+f*e];for(let[e,t]of p)e>m+.5&&a.push([h(m),h(Math.min(e,u+3/2))]),m=Math.max(m,t);m<u+3/2-.5&&a.push([h(m),h(u+3/2)]);let g=-f,_=d,v=(c[0]+l[0])/2,y=(c[1]+l[1])/2;(v-r)*g+(y-i)*_<0&&(g=-g,_=-_);let b=Math.max(1,Math.round(u/Cy));for(let t=0;t<b;t++){let n=h((t+.5)/b*u);e.gates.some(e=>Math.hypot(e.at[0]-n[0],e.at[1]-n[1])<16)||o.push([n[0]+g*1.6,n[1]+_*1.6])}e.gates.some(e=>Math.hypot(e.at[0]-c[0],e.at[1]-c[1])<14)||o.push([c[0],c[1]])}for(let n of e.gates){let e=Ty(t,n.at);for(let t of[-1,1])s.push([n.at[0]+e[0]*t*(n.width/2+1.8),n.at[1]+e[1]*t*(n.width/2+1.8)])}return{pieces:a,bastions:o,towers:s}}function Ty(e,t){let n=1/0,r=[1,0];for(let i=0;i<e.length;i++){let a=e[i],o=e[(i+1)%e.length],s=Math.hypot(o[0]-a[0],o[1]-a[1])||1,c=(o[0]-a[0])/s,l=(o[1]-a[1])/s,u=Math.max(0,Math.min(s,(t[0]-a[0])*c+(t[1]-a[1])*l)),d=Math.hypot(a[0]+c*u-t[0],a[1]+l*u-t[1]);if(d<n-.5)n=d,r=[c,l];else if(Math.abs(d-n)<=.5){let e=r[0]+c,t=r[1]+l,n=Math.hypot(e,t)||1;r=[e/n,t/n]}}return r}function Ey(e,t){let n=wy(e);for(let[e,r]of n.pieces)t.push(yy(e,r,3));for(let e of n.bastions)t.push(Wd(e[0],e[1],0,2.4,2.4));for(let e of n.towers)t.push(Wd(e[0],e[1],0,1.8,1.8));return e.gates.map(t=>{let[n,r]=Ty(e.wall,t.at);return{id:t.id,name:t.name,x:t.at[0],z:t.at[1],axis:Math.abs(n)>Math.abs(r)?`v`:`h`,width:t.width,tx:n,tz:r}})}var Dy=new U,Oy=new Map;function ky(e){let t=Oy.get(e);return t||(Dy.setHex(e),t=[Math.round(Dy.r*255),Math.round(Dy.g*255),Math.round(Dy.b*255)],Oy.set(e,t)),t}function Z(e,t){let n=Math.min(255,Math.round((e>>16&255)*t)),r=Math.min(255,Math.round((e>>8&255)*t)),i=Math.min(255,Math.round((e&255)*t));return n<<16|r<<8|i}var Ay=class{constructor(){this.pos=new Float32Array(3072),this.nrm=new Int8Array(3072),this.col=new Uint8Array(3072),this.idx=new Uint32Array(1536),this.bid=new Float32Array(1024),this.curBid=0,this.vCount=0,this.iCount=0}ensure(e,t){if((this.vCount+e)*3>this.pos.length){let t=Math.max(this.pos.length*2,(this.vCount+e)*3),n=new Float32Array(t);n.set(this.pos),this.pos=n;let r=new Int8Array(t);r.set(this.nrm),this.nrm=r;let i=new Uint8Array(t);i.set(this.col),this.col=i;let a=new Float32Array(t/3);a.set(this.bid),this.bid=a}if(this.iCount+t>this.idx.length){let e=new Uint32Array(Math.max(this.idx.length*2,this.iCount+t));e.set(this.idx),this.idx=e}}vert(e,t,n,r,i,a,o){let s=this.vCount*3;this.pos[s]=e,this.pos[s+1]=t,this.pos[s+2]=n,this.nrm[s]=Math.round(r*127),this.nrm[s+1]=Math.round(i*127),this.nrm[s+2]=Math.round(a*127),this.col[s]=o[0],this.col[s+1]=o[1],this.col[s+2]=o[2],this.bid[this.vCount]=this.curBid,this.vCount++}quad(e,t,n,r,i,a,o,s,c,l,u,d,f){this.ensure(4,6);let p=o-e,m=s-t,h=c-n,g=l-r,_=u-i,v=d-a,y=m*v-h*_,b=h*g-p*v,x=p*_-m*g,S=Math.hypot(y,b,x)||1;y/=S,b/=S,x/=S;let C=ky(f),w=this.vCount;this.vert(e,t,n,y,b,x,C),this.vert(r,i,a,y,b,x,C),this.vert(o,s,c,y,b,x,C),this.vert(l,u,d,y,b,x,C);let T=this.iCount;this.idx[T]=w,this.idx[T+1]=w+1,this.idx[T+2]=w+2,this.idx[T+3]=w,this.idx[T+4]=w+2,this.idx[T+5]=w+3,this.iCount+=6}tri(e,t,n,r,i,a,o,s,c,l){this.quad(e,t,n,r,i,a,o,s,c,o,s,c,l)}flat(e,t,n,r,i,a){this.quad(e,i,r,n,i,r,n,i,t,e,i,t,a)}box(e,t,n,r,i,a,o,s,c,l=c){let u=Math.cos(o),d=Math.sin(o),f=r/2,p=a/2,m=t+i,h=(t,r)=>[e+t*u-r*d,n+t*d+r*u],[g,_]=h(-f,-p),[v,y]=h(f,-p),[b,x]=h(f,p),[S,C]=h(-f,p);this.quad(S,m,C,b,m,x,v,m,y,g,m,_,s),this.quad(v,t,y,g,t,_,g,m,_,v,m,y,l),this.quad(S,t,C,b,t,x,b,m,x,S,m,C,c),this.quad(b,t,x,v,t,y,v,m,y,b,m,x,c),this.quad(g,t,_,S,t,C,S,m,C,g,m,_,c)}aabb(e,t,n,r,i,a,o,s){this.box((e+r)/2,t,(n+a)/2,r-e,i-t,a-n,0,o,s)}frustum(e,t,n,r,i,a,o,s,c=s,l=0){let u=t+a;for(let a=0;a<o;a++){let d=l+a/o*Math.PI*2,f=l+(a+1)/o*Math.PI*2,p=Math.cos(d),m=Math.sin(d),h=Math.cos(f),g=Math.sin(f);this.quad(e+h*r,t,n+g*r,e+p*r,t,n+m*r,e+p*i,u,n+m*i,e+h*i,u,n+g*i,s),i>.001&&this.tri(e,u,n,e+h*i,u,n+g*i,e+p*i,u,n+m*i,c)}}polygon(e,t,n){if(e.length<3)return;let r=e.map(e=>new B(e[0],e[1])),i=Na.triangulateShape(r,[]),a=Na.isClockWise(r);for(let[r,o,s]of i){let i=e[r],c=e[a?s:o],l=e[a?o:s];(c[0]-i[0])*(l[1]-i[1])-(c[1]-i[1])*(l[0]-i[0])>0?this.tri(i[0],t,i[1],l[0],t,l[1],c[0],t,c[1],n):this.tri(i[0],t,i[1],c[0],t,c[1],l[0],t,l[1],n)}}wall(e,t,n,r,i,a,o){this.quad(e,i,t,n,i,r,n,a,r,e,a,t,o)}beam(e,t,n,r,i,a,o,s){let c=r-e,l=i-t,u=a-n,d=Math.hypot(c,l,u)||1,f=-u/d,p=c/d,m=Math.hypot(f,p)||1;f/=m,p/=m,Math.hypot(c,u)<1e-6&&(f=1,p=0);let h=(l*p-u*0)/d,g=(u*f-c*p)/d,_=(c*0-l*f)/d,v=o/2,y=[[f*v+h*v,0*v+g*v,p*v+_*v],[-f*v+h*v,-0*v+g*v,-p*v+_*v],[-f*v-h*v,-0*v-g*v,-p*v-_*v],[f*v-h*v,0*v-g*v,p*v-_*v]];for(let o=0;o<4;o++){let c=y[o],l=y[(o+1)%4];this.quad(e+c[0],t+c[1],n+c[2],e+l[0],t+l[1],n+l[2],r+l[0],i+l[1],a+l[2],r+c[0],i+c[1],a+c[2],s)}}get triangles(){return this.iCount/3}toGeometry(){let e=new ri;e.setAttribute(`position`,new Hr(this.pos.slice(0,this.vCount*3),3)),e.setAttribute(`normal`,new Hr(this.nrm.slice(0,this.vCount*3),3,!0)),e.setAttribute(`color`,new Hr(this.col.slice(0,this.vCount*3),3,!0)),e.setAttribute(`bid`,new Hr(this.bid.slice(0,this.vCount),1));let t=this.vCount<65536?new Uint16Array(this.idx.subarray(0,this.iCount)):this.idx.slice(0,this.iCount);return e.setIndex(new Hr(t,1)),e.computeBoundingSphere(),e.computeBoundingBox(),e}};function jy(e){let t=e*2,n=new La(t,t);n.rotateX(-Math.PI/2);let r=new Di(n,new Ya({color:16777215,map:My(t/8)}));return r.name=`ground`,r}function My(e){let t=document.createElement(`canvas`);t.width=t.height=32;let n=t.getContext(`2d`);n.fillStyle=`#d9c38f`,n.fillRect(0,0,32,32),n.fillStyle=`#cbb27a`,n.fillRect(0,0,32,1),n.fillRect(0,0,1,32);let r=new Gi(t);return r.colorSpace=Ot,r.wrapS=r.wrapT=le,r.magFilter=fe,r.repeat.set(e,e),r}var Ny=-1.8,Py={ring:.06,main:.06,street:.055,bazaar:.05,gali:.045,dirt:.04,ghat:.035},Fy=.075,Iy=.02,Ly=.16,Ry=4;function zy(e,t){let n=e.plan.bank;for(let e=1;e<n.length;e++){let r=n[e-1],i=n[e];if(t>=r[1]&&t<=i[1]||t<=r[1]&&t>=i[1])return r[0]+(i[0]-r[0])*(t-r[1])/(i[1]-r[1]||1)}return n[n.length-1][0]}function By(e,t){Vy(e,t),Hy(e,t),qy(e,t),Jy(e,t),tb(e,t),nb(t),rb(e,t)}function Vy(e,t){let n=e.plan.raster,{minX:r,minZ:i,maxX:a,maxZ:o}=cy;for(let s=i;s<o;s+=Ry){let i=s+Ry,o=Zy(s+Ry/2),c=o?o.inland:0,l=zy(e,s)-c,u=zy(e,i)-c;for(let e=r;e<a;e+=Ry){let r=e+Ry;if(e>=Math.max(l,u))continue;let a=n.at(e+Ry/2,s+Ry/2),o=Iv(Math.round(e),Math.round(s)),c=Q_[o%Q_.length];a>=0&&n.occ[a]===Uv.Green&&(c=$_[o%$_.length]);let d=t(e+2,s+2);r<=Math.min(l,u)?d.flat(e,s,r,i,0,c):d.quad(e,0,i,Math.min(r,u),0,i,Math.min(r,l),0,s,e,0,s,c)}}let s=e.plan.bank;for(let e=1;e<s.length;e++){let n=s[e-1],r=s[e];Zy((n[1]+r[1])/2)||t((n[0]+r[0])/2,(n[1]+r[1])/2).wall(r[0],r[1],n[0],n[1],-2,0,E_.quay)}}function Hy(e,t){for(let n of e.plan.squares){let[r,i]=Wy(n.poly);if(n.id===`ghanta-ghar-chowk`){Uy(n.poly,t,new Fv(Iv(e.seed,8150)));continue}t(r,i).polygon(n.poly,Fy,n.name?ev:tv)}let n={temple:mv,station:ev,busStand:G_.street,hospital:ev,police:nv,cinema:ev,garage:nv,paintShop:nv,market:tv,maidan:$_[0],fort:q_};for(let r of e.plan.landmarks){let e=n[r.kind];if(e===void 0||r.onFoot)continue;let[i,a]=Wy(r.compound);t(i,a).polygon(r.compound,r.kind===`fort`?.01:Iy,e)}}function Uy(e,t,n){let[r,i]=Wy(e);t(r,i).polygon(e,Fy,10259050);let a=[14469538,13877141,13284234,14865070,13219990],o=1/0,s=1/0,c=-1/0,l=-1/0;for(let t of e)o=Math.min(o,t[0]),s=Math.min(s,t[1]),c=Math.max(c,t[0]),l=Math.max(l,t[1]);let u=1.6;for(let r=s;r<l;r+=u){let i=Math.round((r-s)/u)%2?u/2:0;for(let s=o-i;s<c;s+=u){if(!Uh([s+u/2,r+u/2],e)||!Uh([s,r],e)||!Uh([s+u,r+u],e))continue;let i=n.next();if(i<.04)continue;let o=i<.13?10853772:i<.18?12166268:n.pick(a);t(s+u/2,r+u/2).flat(s+.06,r+.06,s+u-.06,r+u-.06,.081,o)}}}function Wy(e){let t=0,n=0;for(let r of e)t+=r[0],n+=r[1];return[t/e.length,n/e.length]}function Gy(e,t){let n=e[Math.max(0,t-1)],r=e[Math.min(e.length-1,t+1)],i=Math.hypot(r[0]-n[0],r[1]-n[1])||1;return[(r[1]-n[1])/i,-(r[0]-n[0])/i]}function Ky(e,t,n,r,i,a){for(let o=1;o<t.length;o++){let[s,c]=Gy(t,o-1),[l,u]=Gy(t,o),d=t[o-1],f=t[o],p=typeof a==`number`?a:a(o),m=d[0]+s*n,h=d[1]+c*n,g=d[0]+s*r,_=d[1]+c*r,v=f[0]+l*n,y=f[1]+u*n,b=f[0]+l*r,x=f[1]+u*r,S=f[0]-d[0],C=f[1]-d[1];(v-m)*S+(y-h)*C<0&&(m=v=(m+v)/2,h=y=(h+y)/2),(b-g)*S+(x-_)*C<0&&(g=b=(g+b)/2,_=x=(_+x)/2);let w=e((d[0]+f[0])/2,(d[1]+f[1])/2);r>n?w.quad(m,i,h,v,i,y,b,i,x,g,i,_,p):w.quad(g,i,_,b,i,x,v,i,y,m,i,h,p)}}function qy(e,t){for(let n of e.plan.roads){if(n.id===`flyover`)continue;let e=Py[n.cls],r=n.width/2,i=G_[n.cls];Ky(t,n.pts,-r,r,e,e=>Iv(e,n.pts.length)&7?i:Z(i,.95));for(let a=1;a<n.pts.length-1;a++){let o=n.pts[a],s=n.pts[a-1],c=n.pts[a+1],l=o[0]-s[0],u=o[1]-s[1],d=c[0]-o[0],f=c[1]-o[1];if((l*d+u*f)/(Math.hypot(l,u)*Math.hypot(d,f)||1)>.85)continue;let p=[];for(let e=0;e<12;e++)p.push([o[0]+Math.cos(e/12*Math.PI*2)*r,o[1]+Math.sin(e/12*Math.PI*2)*r]);t(o[0],o[1]).polygon(p,e,i)}if(n.pedestrian){Ky(t,n.pts,-r-.3,-r,e+.08,V_),Ky(t,n.pts,r,r+.3,e+.08,V_);continue}let a=n.cls===`gali`||n.cls===`dirt`||n.cls===`bazaar`?J_:q_;Ky(t,n.pts,-r,-r+.4,e+.003,a),Ky(t,n.pts,r-.4,r,e+.003,a),n.cls!==`gali`&&n.cls!==`bazaar`&&(Ky(t,n.pts,-r-.9,-r,e-.012,K_),Ky(t,n.pts,r,r+.9,e-.012,K_))}}function Jy(e,t){for(let n of e.streets.segments){let r=new Fv(Iv(e.seed,7e3+n.id)),i=Py[n.cls],a=n.width/2,o=n.pts,s=n.cls===`main`||n.cls===`ring`;if(s||n.cls===`street`)for(let n of[-1,1])for(let c=1;c<o.length;c++){if(r.chance(s?.08:.16))continue;let l=[(o[c-1][0]+o[c][0])/2,(o[c-1][1]+o[c][1])/2];if(e.plan.squares.some(e=>e.name&&Uh(l,e.poly)))continue;let u=s?c%2?3815994:14210248:r.chance(.2)?9407362:11052186;Yy(t,o,c,n,a,r.chance(.1)?i+.06:i+.16,u)}if(s){for(let e of[-1,1])Ky(t,o,e<0?-a-1.9:a+.25,e<0?-a-.25:a+1.9,Ly,t=>Iv(t,n.id+e)%11==0?K_:E_.sidewalk);Xy(t,o,0,3,7,i+.004,Y_,r);for(let e of[-a/2,a/2])Xy(t,o,e,2,9,i+.004,Z(Y_,.85),r,.35)}if(n.kind!==`lane`||n.cls===`dirt`){let e=r.range(6,18),s=0;for(let c=1;c<o.length-1;c++){if(s+=Math.hypot(o[c][0]-o[c-1][0],o[c][1]-o[c-1][1]),s<e)continue;e=s+r.range(10,26);let[l,u]=Gy(o,c),d=r.range(-a+.8,a-.8),f=-u,p=l,m=r.range(.6,2.6)/2,h=r.range(.5,1.6)/2,g=o[c][0]+l*d,_=o[c][1]+u*d,v=n.cls===`dirt`?q_:r.chance(.3)?3816512:r.chance(.5)?X_:Z_,y=i+.006;t(g,_).quad(g-f*m-l*h,y,_-p*m-u*h,g+f*m-l*h,y,_+p*m-u*h,g+f*m+l*h,y,_+p*m+u*h,g-f*m+l*h,y,_-p*m+u*h,v)}}}}function Yy(e,t,n,r,i,a,o){let s=t[n-1],c=t[n],[l,u]=Gy(t,n-1),[d,f]=Gy(t,n),p=r*i,m=r*(i+.25),h=s[0]+l*p,g=s[1]+u*p,_=s[0]+l*m,v=s[1]+u*m,y=c[0]+d*p,b=c[1]+f*p,x=c[0]+d*m,S=c[1]+f*m,C=e((s[0]+c[0])/2,(s[1]+c[1])/2);r>0?(C.quad(h,a,g,y,a,b,x,a,S,_,a,v,o),C.quad(h,.02,g,y,.02,b,y,a,b,h,a,g,Z(o,.8))):(C.quad(_,a,v,x,a,S,y,a,b,h,a,g,o),C.quad(y,.02,b,h,.02,g,h,a,g,y,a,b,Z(o,.8)))}function Xy(e,t,n,r,i,a,o,s,c=.75){let l=s.range(0,i),u=0;for(let d=1;d<t.length;d++){let f=Math.hypot(t[d][0]-t[d-1][0],t[d][1]-t[d-1][1]);if(u+=f,u<l||(l=u+i,!s.chance(c)))continue;let p=t[d-1],m=t[d],h=(m[0]-p[0])/(f||1),g=(m[1]-p[1])/(f||1),_=g,v=-h,y=m[0]+_*n,b=m[1]+v*n,x=.08,S=r/2;e(y,b).quad(y-h*S-_*x,a,b-g*S-v*x,y+h*S-_*x,a,b+g*S-v*x,y+h*S+_*x,a,b+g*S+v*x,y-h*S+_*x,a,b-g*S+v*x,o)}}function Zy(e){return vh.find(t=>e>=t.z0&&e<=t.z1)}var Qy=10;function $y(e){return Ny*(e+.6)/8.5}function eb(e,t,n,r,i,a){e.box(t+.25,n,r,.5,.22,.42,0,3426654,2899536),e.box(t,n,r,.32,.62,.44,0,i,i),e.box(t+.02,n+.62,r,.24,.26,.24,0,2759959,a)}function tb(e,t){let n=new Fv(Iv(e.seed,8101)),r=[9263675,10512714,7226928,11828312];for(let i of vh){let a=(i.inland+i.water-.6)/9;for(let o=i.z0;o<i.z1;o+=4){let s=Math.min(i.z1,o+4),c=zy(e,o),l=zy(e,s),u=t(c,o+2);for(let e=0;e<Qy;e++){let t=$y(e),n=$y(e+1),r=c-i.inland+a*e,d=l-i.inland+a*e,f=e===9,p=f?r+3:r+a,m=f?d+3:d+a,h=e%2?13216120:15258278;u.quad(d,t,s,m,t,s,p,t,o,r,t,o,h),e>0&&u.quad(d,t+.004,s,d+.28,t+.004,s,r+.28,t+.004,o,r,t+.004,o,9072460),f||u.wall(m,s,p,o,n,t,Z(h,.7)),s===i.z1&&u.wall(d,s,m,s,t,.02,V_)}u.quad(l-i.inland-.35,.12,s,l-i.inland,.12,s,c-i.inland,.12,o,c-i.inland-.35,.12,o,V_);let d=n.int(0,3);for(let t=0;t<d;t++){let t=n.int(1,7),c=n.range(o+.4,s-.4);eb(u,zy(e,c)-i.inland+a*t+.3,$y(t),c,n.pick(sv),n.pick(r))}if(n.chance(.35)){let t=n.int(1,4),c=(o+s)/2,l=zy(e,c)-i.inland+a*t+a*.5,d=$y(t);u.box(l,d,c,1.5,.35,1.2,0,I_,Z(I_,.8)),eb(u,l-.1,d+.35,c,H_,n.pick(r)),u.box(l-.7,d,c-.7,.07,2.6,.07,0,13152394,13152394);let f=n.pick([H_,15918792,14240299,15909424]);u.frustum(l-.7,d+2.3,c-.7,1.9,.12,.55,10,Z(f,.8),f,n.next())}}let o=0;for(let n=i.z0+6;n<i.z1-4;n+=13){let r=zy(e,n)-i.inland-1.8,a=t(r,n);if(o++%2)a.box(r,0,n,1.4,.5,1.4,0,V_,V_),a.box(r,.5,n,.9,1.2,.9,0,15920352,15920352,U_),a.frustum(r,1.7,n,.62,.08,1.3,4,H_,H_,Math.PI/4),a.beam(r,3,n,r,4.2,n,.05,5583650),a.tri(r,4.2,n,r,3.7,n,r+.9,3.95,n,H_),a.tri(r,3.7,n,r,4.2,n,r+.9,3.95,n,H_);else{a.box(r,0,n,3,.4,3,0,B_,V_);for(let[e,t]of[[-1.2,-1.2],[1.2,-1.2],[1.2,1.2],[-1.2,1.2]])a.box(r+e,.4,n+t,.3,2.2,.3,0,B_,B_);a.box(r,2.6,n,3.2,.25,3.2,0,V_,V_),a.frustum(r,2.85,n,1.3,.6,.8,10,15920352,15920352),a.frustum(r,3.65,n,.6,.05,.7,10,15920352,15920352)}}for(let r=i.z0+4;r<i.z1-2;r+=n.range(7,12)){let a=zy(e,r)+i.water-.6,o=a+n.range(1.3,2.2),s=t(o,r),c=n.range(-.12,.12),l=n.pick([3108789,2072154,14240299,2793392,15909424]);s.box(o,-1.95,r,1.6,.6,6.2,c,Z(I_,1.15),l,Z(l,.8));for(let e of[-1,1])s.box(o+Math.cos(c)*e*.74,-1.42,r+Math.sin(c)*e*.74,.14,.12,6.26,c,16052194,16052194);for(let e of[-1.4,0,1.4])s.box(o,-1.5,r+e,1.5,.08,.3,c,I_,I_);n.chance(.5)&&s.box(o,-1.35,r+1.6,1.4,.9,1.8,c,n.pick(dv),n.pick(dv));let u=$y(8);s.box(a-.6,u,r-1.5,.14,.9,.14,0,I_,I_),s.beam(a-.6,u+.8,r-1.5,o-.7,-1.4,r-2.4,.04,14207136)}}}function nb(e){let t=bh.pts[0][0],n=bh.width/2,r=bh.crossing.at[1],i=10.5/2,{minZ:a,maxZ:o}=cy;for(let s=a-2;s<o+2;s+=16){let a=Math.min(o+2,s+16),c=e(t,(s+a)/2);c.flat(t-n,s,t+n,a,.08,_v);for(let e of bh.tracks){for(let n=s+.4;n<a;n+=1.25)c.flat(t+e-1.3,n,t+e+1.3,n+.26,.12,vv);for(let n of[-.75,.75])c.box(t+e+n,.12,(s+a)/2,.09,.14,a-s,0,12171700,gv)}if(a<r-i-1||s>r+i+1){let e=t+n+.4;for(let t=s;t<a;t+=4)c.box(e,0,t,.12,1.4,.12,0,6974052,6974052);for(let t of[.55,1.2])c.box(e,t,(s+a)/2,.05,.06,a-s,0,6974052,6974052)}}let s=e(t,r);s.flat(t-n,r-i,t+n,r+i,.21,nv);for(let e of[-1,1]){let i=t+e*(n+1.2),a=r+e*6.05;s.box(i,0,a,.35,1.3,.35,0,5592405,5592405);for(let e=0;e<6;e++)s.box(i,1.3+e*.9,a,.14,.9,.14,0,e%2?Ev:Tv,e%2?Ev:Tv);s.box(i-e*.6,0,a,.1,2.6,.1,0,5592405,5592405),s.box(i-e*.6,2.3,a,1.2,.18,.05,.6,16777215,16777215,Tv),s.box(i-e*.6,2.3,a,1.2,.18,.05,-.6,16777215,16777215,Tv)}}function rb(e,t){let n=e.plan.bridge,r=n.z,i=n.width/2,a=n.x0,o=n.x1+2;for(let e=a;e<o;e+=8){let s=Math.min(o,e+8),c=t((e+s)/2,r);c.box((e+s)/2,-.7,r,s-e,.75,n.width+.6,0,hv,Z(hv,.8));for(let t of[-1,1]){let n=r+t*(i+.35);c.box((e+s)/2,.05,n,s-e,.5,.35,0,hv,Z(hv,.9)),c.box((e+s)/2,5.6,n,s-e,.4,.35,0,hv,Z(hv,.9)),c.box(e,.5,n,.3,5.1,.3,0,hv,hv),c.beam(e,.5,n,s,5.6,n,.22,Z(hv,1.1))}c.box((e+s)/2,5.9,r,.25,.25,n.width+.9,0,hv,hv),Math.round((e-a)/8)%3==1&&c.box(e,-2.8,r,2.2,2.1,n.width-1,0,V_,V_)}}function ib(e){if(!(e instanceof Kd))return null;let t=new zi(new Yi(1,1,1),new Ya({color:13214334}),e.boxes.length),n=new $n;return e.boxes.forEach((e,r)=>{let i=e.maxX-e.minX,a=e.maxZ-e.minZ,o=Math.min(14,Math.max(1.2,Math.min(i,a)*.6));n.position.set((e.minX+e.maxX)/2,o/2,(e.minZ+e.maxZ)/2),n.scale.set(i,o,a),n.updateMatrix(),t.setMatrixAt(r,n.matrix)}),t.name=`dev-boxes`,t}function ab(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new ri,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=ob(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=ob(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function ob(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new Hr(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var sb=.5,cb=new Ya({vertexColors:!0});cb.onBeforeCompile=e=>{e.vertexShader=`attribute float paintMask;
attribute vec4 paintColor;
`+e.vertexShader.replace(`#include <color_vertex>`,[`vColor = vec4(1.0);`,`float pOn = step(0.01, paintMask) * paintColor.a;`,`vColor.rgb *= mix(color, paintColor.rgb * (paintMask > 0.75 ? 1.0 : 0.8), pOn);`,`#ifdef USE_INSTANCING_COLOR`,`vColor.rgb *= instanceColor.rgb;`,`#endif`].join(`
`))},cb.customProgramCacheKey=()=>`vehicle-paint`;var lb=2236962,ub=2965072,db=16774064,fb=14170668,pb=1710618,mb=12105912,hb=5921370,gb=new U;function _b(e,t,n=0){gb.setHex(t);let r=e.getAttribute(`position`).count,i=new Float32Array(r*3);for(let e=0;e<r;e++)i[e*3]=gb.r,i[e*3+1]=gb.g,i[e*3+2]=gb.b;return e.setAttribute(`color`,new Gr(i,3)),e.setAttribute(`paintMask`,new Gr(new Float32Array(r).fill(n),1)),e}function Q(e,t,n,r,i,a,o,s=0){let c=new Yi(e,t,n);return c.translate(r,i,a),_b(c,o,s)}function vb(e,t,n,r,i=pb,a=e){let o=new Xi(e,e,t,8);return o.rotateZ(Math.PI/2),o.translate(n,a,r),_b(o,i)}function yb(e,t){let{length:n,width:r,height:i}=e,{body:a,accent:o,roof:s}=e.colors,c=.33,l=i*(t?.42:.4),u=c*.8+l/2,d=i-(c*.8+l),f=c*.8+l+d/2,p=[Q(r,l,n,0,u,0,a,1),Q(r*.88,d,n*(t?.6:.5),0,f,n*.04,s,sb),Q(r*.9,d*.55,n*(t?.56:.46),0,f+d*.05,n*.04,ub),Q(r*.25,.14,.06,-r*.3,u+l*.15,-n/2,db),Q(r*.25,.14,.06,r*.3,u+l*.15,-n/2,db),Q(r*.25,.12,.06,-r*.3,u+l*.15,n/2,fb),Q(r*.25,.12,.06,r*.3,u+l*.15,n/2,fb),Q(r*1.02,l*.18,n*.98,0,u-l*.12,0,o)];for(let e of[-1,1])for(let t of[-1,1])p.push(vb(c,.26,e*(r/2-.1),t*n*.32));return t&&(p.push(Q(r*.3,.14,.3,-r*.16,i+.07,n*.04,fb)),p.push(Q(r*.3,.14,.3,r*.16,i+.07,n*.04,o))),p}function bb(e){let{length:t,width:n,height:r}=e,{body:i,accent:a,roof:o}=e.colors,s=.25;return[Q(n,.55,t*.62,0,.6,t*.14,i,1),Q(n*1.02,.12,t*.62,0,.35,t*.14,a),Q(n*.55,.8,t*.3,0,.75,-t*.33,i,1),Q(n*.5,.35,.05,0,1.3,-t*.47,ub),Q(n*.9,.35,.3,0,1,t*.18,lb),Q(n*1.04,.1,t*.86,0,r,t*.05,o,sb),Q(n,r-s-.6,.08,0,.85+(r-s-.6)/2,t*.46,o,sb),Q(.06,r-.7,.06,-n*.48,.7+(r-.7)/2,-t*.3,lb),Q(.06,r-.7,.06,n*.48,.7+(r-.7)/2,-t*.3,lb),Q(n*.2,.12,.05,0,.85,-t*.49,db),vb(s,.18,0,-t*.36),vb(s,.18,-n/2+.12,t*.3),vb(s,.18,n/2-.12,t*.3)]}function xb(e){let{length:t}=e,{body:n,accent:r,roof:i}=e.colors,a=.3,o=t*.36;return[Q(.3,.3,t*.26,0,.44,.02,hb),Q(.24,.18,t*.52,0,.66,0,n,1),Q(.34,.26,t*.24,0,.88,-t*.1,n,1),Q(.3,.12,t*.3,0,.9,t*.16,r),Q(.22,.08,t*.18,0,.8,t*.38,n,1),Q(.06,.8,.06,0,.7,-o,i),Q(.56,.05,.05,0,1.1199999999999999,-o+.04,i),Q(.16,.12,.06,0,.96,-o-.06,db),vb(a,.1,0,-o),vb(a,.1,0,o),vb(a*.45,.13,0,-o,mb,a),vb(a*.45,.13,0,o,mb,a)]}function Sb(e){let{length:t,width:n,height:r}=e,{body:i,accent:a,roof:o}=e.colors,s=.5,c=r-s*.8,l=[Q(n,c,t,0,s*.8+c/2,0,i,1),Q(n*1.01,c*.28,t*.92,0,s*.8+c*.68,t*.02,ub),Q(n*1.02,c*.1,t*1,0,s*.8+c*.45,0,a),Q(n*.9,c*.35,.06,0,s*.8+c*.68,-t/2,ub),Q(n*.95,.15,t*.9,0,r+.07,0,o,sb),Q(n*.2,.18,.06,-n*.33,.9,-t/2,db),Q(n*.2,.18,.06,n*.33,.9,-t/2,db)];for(let e of[-1,1])for(let r of[-.33,.3])l.push(vb(s,.35,e*(n/2-.15),r*t));return l}function Cb(e){let{length:t,width:n,height:r}=e,{body:i,accent:a,roof:o}=e.colors,s=.5,c=r*.78,l=t-2-.2,u=[Q(n,c-s*.6,2,0,s*.6+(c-s*.6)/2,-t/2+1,i,1),Q(n*.9,c*.3,.06,0,c*.72,-t/2,ub),Q(n*1.02,.25,1.8,0,c+.12,-t/2+1,a),Q(n,r-s*.9,l,0,s*.9+(r-s*.9)/2,t/2-l/2,o,sb),Q(n*1.02,.2,l,0,.55,t/2-l/2,a),Q(n*.22,.16,.06,-n*.32,.85,-t/2,db),Q(n*.22,.16,.06,n*.32,.85,-t/2,db)];for(let e of[-1,1])for(let r of[-.36,.18,.36])u.push(vb(s,.35,e*(n/2-.15),r*t));return u}function wb(e){let t=xu.vehicle,n={...e,length:e.length/t,width:e.width/t,height:e.height/t},r=n.model===`rickshaw`?bb(n):n.model===`bike`?xb(n):n.model===`bus`?Sb(n):n.model===`truck`?Cb(n):yb(n,n.model===`jeep`),i=ab(r,!1);for(let e of r)e.dispose();if(!i)throw Error(`vehicle model ${n.id}: parts do not merge`);return i.scale(t,t,t),i.computeBoundingSphere(),i}var Tb=128,Eb=4,Db=3,Ob=class{constructor(){this.object=new er,this.meshes=new Map,this.dummy=new $n,this.color=new U;for(let e of Object.keys(q)){let t=wb(q[e]),n=new ji(new Float32Array(512),4);n.setUsage(Pt),t.setAttribute(`paintColor`,n);let r=new zi(t,cb,Tb);r.instanceMatrix.setUsage(Pt),r.count=0,r.frustumCulled=!1,r.name=`vehicles-${e}`,this.meshes.set(e,r),this.object.add(r)}this.smoke=this.pool(new Ia(.5,0),new Ya({color:16777215}),512),this.fire=this.pool(new Zi(.35,1,5),new hi({color:16777215}),384),this.flash=this.pool(new Ia(1,1),new hi({color:16754224,transparent:!0,opacity:.75}),8)}pool(e,t,n){let r=new zi(e,t,n);return r.instanceMatrix.setUsage(Pt),r.count=0,r.frustumCulled=!1,this.object.add(r),r}sync(e,t,n){for(let e of this.meshes.values())e.count=0;let r=0,i=0,a=0,o=this.dummy;for(let s of e.vehicles){let e=this.meshes.get(s.type);if(e.count>=Tb)continue;let c=q[s.type],l=s.px+(s.x-s.px)*t,u=s.pz+(s.z-s.pz)*t,d=y_(s.pHeading,s.heading,t);o.position.set(l,0,u),o.rotation.set(0,-d,0),o.scale.set(1,1,1),o.updateMatrix();let f=e.count++;e.setMatrixAt(f,o.matrix);let p=s.health/c.health,m=s.stage===`wreck`?.18:.45+.55*Math.min(1,p*1.4);e.setColorAt(f,this.color.setScalar(m));let h=wu[s.paint]??null,g=e.geometry.getAttribute(`paintColor`);h===null?g.setXYZW(f,0,0,0,0):(this.color.setHex(h),g.setXYZW(f,this.color.r,this.color.g,this.color.b,1));let _=l+Math.sin(d)*c.length*.3,v=u-Math.cos(d)*c.length*.3,y=c.height*.75,b=s.stage===`fire`||s.stage===`wreck`&&n-s.explodedAt<6;if(s.stage===`smoke`||b)for(let e=0;e<Eb&&r<this.smoke.instanceMatrix.count;e++){let t=(n*.7+e/Eb+s.id*.37)%1;o.position.set(_+t*1.2,y+t*3.5,v-t*.8),o.rotation.set(t*3,t*2,0);let i=(.5+t*1.3)*(1-t*t);o.scale.set(i,i,i),o.updateMatrix(),this.smoke.setMatrixAt(r,o.matrix);let a=b?.25:.65;this.smoke.setColorAt(r++,this.color.setRGB(a,a,a))}if(b)for(let e=0;e<Db&&i<this.fire.instanceMatrix.count;e++){let t=.7+.3*Math.sin(n*17+e*2.1+s.id);o.position.set(_+(e-1)*.35,y+.4*t,v),o.rotation.set(0,0,0),o.scale.set(1,t*1.3,1),o.updateMatrix(),this.fire.setMatrixAt(i,o.matrix),this.fire.setColorAt(i++,this.color.setHex(e===1?16765503:16743196))}if(s.explodedAt>=0&&a<8){let e=(n-s.explodedAt)/.6;if(e>=0&&e<1){let t=1+e*6;o.position.set(l,1,u),o.scale.set(t,t*.7,t),o.updateMatrix(),this.flash.setMatrixAt(a++,o.matrix)}}}for(let e of this.meshes.values())e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0),e.geometry.getAttribute(`paintColor`).needsUpdate=!0;this.finish(this.smoke,r),this.finish(this.fire,i),this.finish(this.flash,a)}finish(e,t){e.count=t,e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0)}};function kb(e){let t=[];for(let n=0;n<4;n++){let r=e.poly[n],i=e.poly[(n+1)%4],a=r[0],o=r[1],s=i[0],c=i[1],l=Math.hypot(s-a,c-o)||1,u=-(c-o)/l,d=(s-a)/l,f=(a+s)/2,p=(o+c)/2;(f-e.x)*u+(p-e.z)*d<0&&([a,s]=[s,a],[o,c]=[c,o],u=-u,d=-d),t.push({ax:a,az:o,bx:s,bz:c,nx:u,nz:d,len:l,front:!!(e.front&1<<n)})}return t}function Ab(e,t,n,r,i,a,o,s=.03){let c=t.ax+(t.bx-t.ax)*n+t.nx*s,l=t.az+(t.bz-t.az)*n+t.nz*s,u=t.ax+(t.bx-t.ax)*r+t.nx*s,d=t.az+(t.bz-t.az)*r+t.nz*s;e.quad(c,i,l,u,i,d,u,a,d,c,a,l,o)}function jb(e){return Math.atan2(e.nx,-e.nz)}function Mb(e,t,n){return[e.ax+(e.bx-e.ax)*t+e.nx*n,e.az+(e.bz-e.az)*t+e.nz*n]}var Nb=e=>e.nz>-.35;function Pb(e,t){let n=new Fv(e.seed),r=Math.atan2(e.uz,e.ux),i=e.hu*2,a=e.hv*2,o=e.height,s=kb(e);switch(e.kind){case`hut`:return Vb(e,t,n,r,s);case`shed`:case`warehouse`:return Hb(e,t,n,r,s);case`garage`:return Ub(e,t,n,r,s)}let c=e.kind===`block`?av:e.kind===`haveli`?iv:e.zone===`oldcity`||e.zone===`riverside`?rv:D_,l=Z(c[Math.floor(e.tone*c.length)%c.length],.88+n.next()*.14),u=Z(l,.8);t.box(e.x,0,e.z,i,o,a,r,A_,l);for(let e of s)Nb(e)&&Ab(t,e,0,1,0,.45,Z(l,.7));let d=e.kind===`block`?.9:.6;for(let e of s){let[n,r]=Mb(e,.5,-.12);t.box(n,o,r,e.len,d,.24,jb(e),u,u)}let f=e.kind===`shop`||e.kind===`house`&&e.zone===`oldcity`&&n.chance(.45)||e.kind===`block`&&n.chance(.4),p=n.chance(.3)?3820122:M_,m=n.pick(ov);for(let r of s){if(!Nb(r))continue;let i=f&&r.front,a=Math.floor((r.len-.6)/(e.kind===`block`?2.8:2.3));for(let o=0;o<e.storeys;o++){let s=o*sy;if(!(o===0&&i)&&(o>0&&Ab(t,r,0,1,s-.1,s+.06,u),!(a<=0)))for(let i=0;i<a;i++){let c=(i+.5)/a,l=(e.kind===`block`?.7:.5)/r.len;(o!==0||r.front||!n.chance(.5))&&(Ab(t,r,c-l-.08/r.len,c+l+.08/r.len,s+.82,s+2.18,u),Ab(t,r,c-l,c+l,s+.9,s+2.1,o>0&&n.chance(.35)?m:p,.05))}}if(Fb(e,r,i)){let e=n.range(.2,.8);Ab(t,r,e-.5/r.len,e+.5/r.len,.1,2.2,Z(I_,.9),.05)}if(i&&Lb(t,n,r),r.front){if(e.storeys>=2&&r.len>3.5){let i=n.int(1,e.storeys-1);e.kind===`haveli`?zb(t,r,n,i*sy+.5,l,u):n.chance(e.kind===`block`?.8:.55)&&Rb(t,r,n,i*sy,l,u,n.chance(.55)),e.kind===`block`&&e.storeys>=3&&n.chance(.7)&&Rb(t,r,n,(i===1?2:1)*sy,l,u,n.chance(.4))}if(e.storeys>=2&&n.chance(.45)){let[i,a]=Mb(r,n.range(.15,.85),.25);t.box(i,sy*n.int(1,e.storeys-1)+.3,a,.8,.55,.45,jb(r),cv,Z(cv,.85))}}}if(e.roofTank&&i>2.5&&a>2.5){let[i,a]=Ib(e,n.range(-.5,.5),n.range(-.5,.5));t.box(i,o,a,1.3,.35,1.3,r,7829367,7829367),t.frustum(i,o+.35,a,.62,.62,1.1,8,n.chance(.75)?P_:F_)}if((e.kind===`house`||e.kind===`block`)&&i>5&&a>5&&n.chance(.3)){let[n,i]=Ib(e,.55,-.55);t.box(n,o,i,2.4,2.3,2.4,r,A_,l)}e.kind===`dharamshala`&&i>4&&a>4&&n.chance(.5)&&Bb(t,e.x,o,e.z,1.3,n.chance(.5)?H_:pv,l)}function Fb(e,t,n){return t.front&&!n&&e.kind!==`block`&&t.len>2.5}function Ib(e,t,n){return[e.x+e.ux*t*e.hu-e.uz*n*e.hv,e.z+e.uz*t*e.hu+e.ux*n*e.hv]}function Lb(e,t,n){let r=Math.max(1,Math.min(3,Math.floor(n.len/3))),i=jb(n);for(let a=0;a<r;a++){let o=a/r+.04,s=(a+1)/r-.04,c=t.chance(.6);if(Ab(e,n,o,s,.05,2.4,c?3878698:N_,.04),c)Ab(e,n,o+.02,s-.02,.6,1,t.pick(W_),.06);else for(let t of[.7,1.4,2])Ab(e,n,o,s,t,t+.05,Z(N_,.75),.05);let l=t.pick(k_),[u,d]=Mb(n,(o+s)/2,.12),f=(s-o)*n.len;e.box(u,2.5,d,f,.7,.18,i,Z(l,.8),Z(l,.8),l);let[p,m]=Mb(n,(o+s)/2,.22);if(e.box(p,2.68,m,f*.6,.28,.02,i,16777215,16777215,l===16777215?14036526:16777215),t.chance(.65)){let r=t.pick(k_),i=t.range(.9,1.5),[a,c]=Mb(n,o,0),[l,u]=Mb(n,s,0);e.quad(a+n.nx*i,2,c+n.nz*i,l+n.nx*i,2,u+n.nz*i,l,2.3,u,a,2.3,c,r),e.quad(a+n.nx*i,1.75,c+n.nz*i,l+n.nx*i,1.75,u+n.nz*i,l+n.nx*i,2,u+n.nz*i,a+n.nx*i,2,c+n.nz*i,Z(r,.8))}}}function Rb(e,t,n,r,i,a,o){let s=n.range(.3,.7),c=Math.min(3,t.len*.6),[l,u]=Mb(t,s,.5),d=jb(t);e.box(l,r-.05,u,c,.15,1,d,Z(i,1.08),a);let[f,p]=Mb(t,s,.96);if(e.box(f,r+.1,p,c,.85,.06,d,a,a,n.chance(.5)?Z(a,.8):4868682),!o)return;let[m,h]=Mb(t,s-c/(2*t.len),.85),[g,_]=Mb(t,s+c/(2*t.len),.85);e.beam(m,r+1.8,h,g,r+1.8,_,.03,z_);let v=n.int(2,4);for(let t=0;t<v;t++){let i=(t+.5)/v,a=m+(g-m)*i,o=h+(_-h)*i,s=n.range(.2,.32),l=(g-m)/(c||1),u=(_-h)/(c||1),d=n.range(.5,.9);e.quad(a-l*s,r+1.8-d,o-u*s,a+l*s,r+1.8-d,o+u*s,a+l*s,r+1.8,o+u*s,a-l*s,r+1.8,o-u*s,n.pick(sv))}}function zb(e,t,n,r,i,a){let o=n.range(.35,.65),[s,c]=Mb(t,o,.45),l=jb(t);e.box(s,r-.3,c,1.8,.3,.9,l,a,a),e.box(s,r,c,1.6,1.5,.8,l,Z(i,1.05),i);let[u,d]=Mb(t,o,.86);e.box(u,r+.35,d,1.1,.9,.02,l,M_,M_),e.frustum(s,r+1.5,c,1.15,.15,.7,4,a,a,Math.PI/4+l)}function Bb(e,t,n,r,i,a,o){for(let[a,s]of[[-1,-1],[1,-1],[1,1],[-1,1]])e.box(t+a*i*.75,n,r+s*i*.75,.22,1.4*i,.22,0,o,o);e.box(t,n+1.4*i,r,2*i,.18,2*i,0,o,o),e.frustum(t,n+1.58*i,r,i*.9,i*.55,i*.5,8,a,a),e.frustum(t,n+2.08*i,r,i*.55,.05,i*.6,8,a,a)}function Vb(e,t,n,r,i){let a=n.pick(lv),o=e.height-n.range(0,.4);t.box(e.x,0,e.z,e.hu*2,o,e.hv*2,r,Z(a,.9),a);for(let e of i){if(!Nb(e)||!e.front)continue;let r=n.range(.3,.7);Ab(t,e,r-.4/e.len,r+.4/e.len,0,1.8,n.chance(.5)?3878698:n.pick(dv),.04)}let s=n.chance(.35),c=s?n.pick(dv):n.pick(uv),l=.3,u=Ib(e,-1-l/e.hu,-1-l/e.hv),d=Ib(e,1+l/e.hu,-1-l/e.hv),f=Ib(e,1+l/e.hu,1+l/e.hv),p=Ib(e,-1-l/e.hu,1+l/e.hv),m=o+.45,h=o-.1;if(t.quad(p[0],h,p[1],f[0],h,f[1],d[0],m,d[1],u[0],m,u[1],c),t.quad(u[0],m-.04,u[1],d[0],m-.04,d[1],f[0],h-.04,f[1],p[0],h-.04,p[1],Z(c,.6)),s||n.chance(.4))for(let r=0;r<2;r++){let[r,i]=Ib(e,n.range(-.6,.6),n.range(-.5,.5));t.box(r,(m+h)/2+.05,i,.35,.18,.25,n.next()*3,fv,Z(fv,.85))}if(n.chance(.25)){let[r,i]=Ib(e,n.range(-.8,.8),-1-.5/e.hv);t.frustum(r,0,i,.32,.32,.9,8,F_)}}function Hb(e,t,n,r,i){let a=n.pick(O_),o=e.height;t.box(e.x,0,e.z,e.hu*2,o,e.hv*2,r,j_,a);let s=n.pick(uv),c=Math.min(2.4,e.hv*.5),l=Ib(e,-1,-1),u=Ib(e,1,-1),d=Ib(e,1,1),f=Ib(e,-1,1),p=Ib(e,-1,0),m=Ib(e,1,0);t.quad(u[0],o,u[1],l[0],o,l[1],p[0],o+c,p[1],m[0],o+c,m[1],Z(s,.9)),t.quad(f[0],o,f[1],d[0],o,d[1],m[0],o+c,m[1],p[0],o+c,p[1],s),t.tri(l[0],o,l[1],f[0],o,f[1],p[0],o+c,p[1],a),t.tri(d[0],o,d[1],u[0],o,u[1],m[0],o+c,m[1],a);for(let e of i){if(!Nb(e)||!e.front)continue;let r=Math.min(5,e.len-2)/e.len;r>0&&Ab(t,e,.5-r/2,.5+r/2,0,Math.min(4.2,o-.6),n.chance(.5)?3815994:N_,.04),Ab(t,e,.05,.95,o-1.1,o-.5,Z(a,.7),.04)}}function Ub(e,t,n,r,i){let a=n.pick([14209216,13218954,10467528,15253616]),o=e.height;t.box(e.x,0,e.z,e.hu*2,o,e.hv*2,r,j_,a);for(let e of i){if(!Nb(e)||!e.front)continue;Ab(t,e,.08,.92,0,3.3,3025448,.04);let r=n.pick(k_),[i,a]=Mb(e,.5,.12);t.box(i,3.4,a,e.len*.9,.8,.15,jb(e),r,r,r);let[o,s]=Mb(e,n.chance(.5)?.08:.92,.9);for(let e=0;e<n.int(2,4);e++)t.frustum(o,e*.25,s,.45,.45,.24,8,1973790)}t.box(e.x,o,e.z,e.hu*2+.3,.15,e.hv*2+.3,r,n.pick(uv),n.pick(uv))}var Wb=7,Gb=.03,Kb=9;function qb(e){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let a of e)t=Math.min(t,a[0]),r=Math.max(r,a[0]),n=Math.min(n,a[1]),i=Math.max(i,a[1]);return{x0:t,z0:n,x1:r,z1:i,cx:(t+r)/2,cz:(n+i)/2,w:r-t,d:i-n}}function Jb(e,t,n,r,i){e.curBid=t(n.cx,n.cz,0,n.w/2,n.d/2,r),i(),e.curBid=0}function Yb(e,t,n){Zb(e,t,n);for(let r of e.plan.landmarks)switch(r.kind){case`fort`:Qb(e,r,t,n);break;case`temple`:ix(r,t,n);break;case`clockTower`:ax(r,t,n);break;case`mosqueDome`:sx(r,t,n);break;case`station`:cx(r,t,n);break;case`busStand`:lx(r,t,uv[0],4.6);break;case`market`:r.parts.length&&(lx(r,t,dv[1],3.6),ux(r,t));break;case`hospital`:fx(r,t,n);break;case`police`:px(r,t,n);break;case`cinema`:mx(r,t,n);break;case`garage`:case`paintShop`:hx(r,t,n);break;case`waterTower`:gx(r,t,n);break;case`dhobiGhat`:_x(r,t);break;case`maidan`:vx(r,t)}yx(e,t),bx(e,t)}function Xb(e,t,n,r,i,a,o){let s=Math.hypot(r-t,i-n),c=Math.atan2(i-n,r-t);for(let l=.9;l<s-.5;l+=1.9){let u=l/s;e.box(t+(r-t)*u,a,n+(i-n)*u,1,.85,.5,c,o,Z(o,.9))}}function Zb(e,t,n){let r=wy(e.plan),i=E_.wall,a=E_.wallTop;for(let[e,o]of r.pieces){let r=Math.hypot(o[0]-e[0],o[1]-e[1]);if(r<.5)continue;let s=Math.atan2(o[1]-e[1],o[0]-e[0]),c=-(o[1]-e[1])/r,l=(o[0]-e[0])/r,u=Math.max(1,Math.ceil(r/24));for(let d=0;d<u;d++){let f=[e[0]+(o[0]-e[0])*d/u,e[1]+(o[1]-e[1])*d/u],p=[e[0]+(o[0]-e[0])*(d+1)/u,e[1]+(o[1]-e[1])*(d+1)/u],m=(f[0]+p[0])/2,h=(f[1]+p[1])/2,g=t(m,h);g.curBid=n(m,h,s,r/u/2,3/2,8),g.box(m,0,h,r/u,Wb,3,s,a,i),g.box(m,0,h,r/u+.02,1.2,3.1,s,Z(i,.8),Z(i,.8));let _=3/2-.25;Xb(g,f[0]+c*_,f[1]+l*_,p[0]+c*_,p[1]+l*_,Wb,a),Xb(g,f[0]-c*_,f[1]-l*_,p[0]-c*_,p[1]-l*_,Wb,a),g.curBid=0}}for(let e of r.bastions){let r=t(e[0],e[1]);r.curBid=n(e[0],e[1],0,3,3,9),r.frustum(e[0],0,e[1],3.1,2.7,7.6,10,a,i),r.frustum(e[0],7.6,e[1],3,3,.3,10,a,a);for(let t=0;t<8;t++){let n=t/8*Math.PI*2;r.box(e[0]+Math.cos(n)*2.6,7.9,e[1]+Math.sin(n)*2.6,.9,.8,.5,n+Math.PI/2,a,Z(i,.9))}r.curBid=0}for(let e of r.towers){let r=t(e[0],e[1]);r.curBid=n(e[0],e[1],0,2.4,2.4,13),r.frustum(e[0],0,e[1],2.4,2.1,9.5,8,a,i),Bb(r,e[0],9.5,e[1],1.4,pv,i),r.curBid=0}for(let r of e.gates){let e=t(r.x,r.z),o=Math.atan2(r.tz,r.tx);e.curBid=n(r.x,r.z,o,r.width/2+1,2,10),e.box(r.x,6.2,r.z,r.width+1,2.8,3.6,o,a,i),e.box(r.x,5.6,r.z,r.width-1.5,.6,3.62,o,Z(i,.55),Z(i,.55)),Xb(e,r.x-r.tx*(r.width/2+.5),r.z-r.tz*(r.width/2+.5),r.x+r.tx*(r.width/2+.5),r.z+r.tz*(r.width/2+.5),9,a),e.curBid=0,e.beam(r.x,9,r.z,r.x,12,r.z,.08,4473924),e.tri(r.x,12,r.z,r.x,11.1,r.z,r.x+r.tx*1.6,11.55,r.z+r.tz*1.6,H_),e.tri(r.x,11.1,r.z,r.x,12,r.z,r.x+r.tx*1.6,11.55,r.z+r.tz*1.6,H_)}}function Qb(e,t,n,r){let i=xy(t),a=yv,o=bv;for(let[e,t]of i.walls){let i=Math.hypot(t[0]-e[0],t[1]-e[1]);if(i<.5)continue;let s=Math.atan2(t[1]-e[1],t[0]-e[0]),c=(e[0]+t[0])/2,l=(e[1]+t[1])/2,u=-(t[1]-e[1])/i,d=(t[0]-e[0])/i,f=n(c,l);f.curBid=r(c,l,s,i/2,by/2,10),f.box(c,0,l,i,Kb,by,s,o,a),f.box(c,0,l,i+.02,2,by+.4,s,Z(a,.8),Z(a,.8));let p=by/2-.25;Xb(f,e[0]+u*p,e[1]+d*p,t[0]+u*p,t[1]+d*p,Kb,o),Xb(f,e[0]-u*p,e[1]-d*p,t[0]-u*p,t[1]-d*p,Kb,o),f.curBid=0}for(let e of i.towers){let t=n(e[0],e[1]);t.curBid=r(e[0],e[1],0,3.2,3.2,14),t.frustum(e[0],0,e[1],3.4,2.9,11,10,o,a),Bb(t,e[0],11,e[1],1.6,pv,a),t.curBid=0}let s=i.walls.find((e,t)=>t>0&&Math.hypot(e[0][0]-i.walls[t-1][1][0],e[0][1]-i.walls[t-1][1][1])>2);if(s){let e=i.walls[i.walls.indexOf(s)-1][1],t=(e[0]+s[0][0])/2,r=(e[1]+s[0][1])/2,c=Math.atan2(s[0][1]-e[1],s[0][0]-e[0]),l=Math.hypot(s[0][0]-e[0],s[0][1]-e[1]),u=n(t,r);u.box(t,6.5,r,l+1,3.2,by+.8,c,o,a),u.box(t,6,r,l-1,.5,by+.82,c,Z(a,.5),Z(a,.5)),u.beam(t,9.7,r,t,14,r,.1,4473924),u.tri(t,14,r,t,12.8,r,t+2.2,13.4,r,H_),u.tri(t,12.8,r,t,14,r,t+2.2,13.4,r,H_)}{let[e,t]=i.gate,r=(e[0]+t[0])/2,a=(e[1]+t[1])/2,o=Math.atan2(t[1]-e[1],t[0]-e[0]),s=Math.hypot(t[0]-e[0],t[1]-e[1]),c=n(r,a);c.box(r,0,a,s,6,.6,o,4861468,5912610);for(let e=-3;e<=3;e++)for(let t of[1.4,3,4.6])c.box(r+Math.cos(o)*e*(s/8),t,a+Math.sin(o)*e*(s/8),.18,.18,.7,o,2763306,2763306)}let c=t.parts[0].poly,l=0,u=0;for(let e of c)l+=e[0]/c.length,u+=e[1]/c.length;let d=1.4,f=e=>c.map(t=>[l+(t[0]-l)*(.9-e*.16),u+(t[1]-u)*(.9-e*.16)]);for(let e=0;e<4;e++){let t=f(e),r=e*d,i=(e+1)*d,a=n(l,u);a.polygon(t,i,e%2?$_[1]:$_[0]);for(let n=0;n<t.length;n++){let o=t[n],s=t[(n+1)%t.length],c=(o[0]+s[0])/2-l,d=(o[1]+s[1])/2-u,f=-(s[1]-o[1]),p=s[0]-o[0];f*c+p*d>0?a.wall(o[0],o[1],s[0],s[1],r,i,e%2?Z(xv,.95):xv):a.wall(s[0],s[1],o[0],o[1],r,i,e%2?Z(xv,.95):xv)}}let p=i.keep,m=n(p.x,p.z);m.curBid=r(p.x,p.z,0,p.hw,p.hl,16),m.box(p.x,5.1,p.z,p.hw*2,8.5,p.hl*2,0,o,a);for(let e=-3;e<=3;e++)m.box(p.x+e*(p.hw/3.6),9.1,p.z+p.hl+.03,.8,1.6,.06,0,3810328,3810328);let h=13.6;for(let[e,t]of[[-1,-1],[1,-1],[1,1],[-1,1]])Bb(m,p.x+e*(p.hw-1.6),h,p.z+t*(p.hl-1.6),1.2,pv,a);m.frustum(p.x,h,p.z,3.4,3.8,1.2,12,pv,pv),m.frustum(p.x,14.799999999999999,p.z,3.8,.3,3.2,12,pv,pv),m.beam(p.x,18,p.z,p.x,21.1,p.z,.1,4473924),m.tri(p.x,21.1,p.z,p.x,19.9,p.z,p.x+2.4,20.5,p.z,H_),m.tri(p.x,19.9,p.z,p.x,21.1,p.z,p.x+2.4,20.5,p.z,H_),m.curBid=0;let g=new Fv(Iv(e.seed,8202)),_=e.plan.raster;for(let e=0,t=0;e<400&&t<46;e++){let e=g.range(-252,-148),r=g.range(-255,-155),i=_.at(e,r);if(i<0||_.occ[i]!==Uv.Green||_.road[i]||_.roadDist[i]<4)continue;t++;let a=g.range(.6,1.8);n(e,r).box(e,-.2,r,a*1.4,a,a,g.next()*3,Z(xv,1.05),xv)}}var $b=15251504,ex=15984326,tx=14855782;function nx(e,t,n,r,i,a,o,s,c){for(let l=0;l<a;l++){let u=l/a,d=i*(1-u**1.7*.82),f=i*(1-((l+1)/a)**1.7*.82),p=o*(1-u*.35),m=l%2?s:c;e.frustum(t,n,r,d,f,p*.82,4,m,m,Math.PI/4),e.frustum(t,n+p*.82,r,f*1.06,f*1.02,p*.18,4,Z(c,.72),Z(c,.8),Math.PI/4),n+=p}return n}function rx(e,t,n,r,i,a){if(e.frustum(t,n,r,.55*i,1*i,.35*i,12,B_,B_),e.frustum(t,n+.35*i,r,1*i,.55*i,.35*i,12,V_,B_),e.frustum(t,n+.7*i,r,.35*i,.5*i,.35*i,8,$b,$b),e.frustum(t,n+1.05*i,r,.5*i,.05,.6*i,8,$b,$b),!a)return;let o=n+1.6*i;e.beam(t,o,r,t,o+4.2,r,.1,5583650),e.tri(t,o+4.2,r,t,o+2.8,r,t+3.4,o+3.7,r+.6,H_),e.tri(t,o+2.8,r,t,o+4.2,r,t+3.4,o+3.7,r+.6,H_)}function ix(e,t,n){let r=qb(e.parts[0].poly),i=t(r.cx,r.cz),a=r.cx,o=r.cz,s=r.w-2.6;Jb(i,n,r,26,()=>{i.box(a,0,o,r.w+2,.6,r.d+2,0,mv,V_),i.box(a,.6,o,r.w+.6,.7,r.d+.6,0,mv,B_),i.box(a,1.3,o,s,4.6,s,0,ex,tx),i.box(a,4.4,o,s+.4,.5,s+.4,0,U_,U_);for(let[e,t]of[[0,1],[1,0],[-1,0]])i.box(a+e*(s/2+.05),2,o+t*(s/2+.05),t?1.4:.2,2,e?1.4:.2,0,5911332,5911332);let e=s/2-.2;for(let[t,n]of[[-1,-1],[1,-1],[1,1],[-1,1]]){let r=nx(i,a+t*e,5.9,o+n*e,1.5,5,1.2,tx,ex);i.frustum(a+t*e,r,o+n*e,.3,.05,.6,8,$b,$b)}let t=nx(i,a,5.9,o,s*.62,11,1.75,tx,ex);rx(i,a,t,o,1.4,!0)});let c=r.z1;if(e.parts[1]){let i=qb(e.parts[1].poly);c=i.z1;let a=t(i.cx,i.cz);Jb(a,n,i,11,()=>{a.box(i.cx,0,i.cz,i.w+1.2,1.1,i.d+1.2,0,mv,V_);for(let e=0;e<3;e++)a.box(i.cx,0,i.z1+.6+(2-e)*.45,3.4,.37*(e+1),.45,0,mv,B_);for(let e of[-.4,-.13,.13,.4])for(let t of[-.4,0,.4]){let n=i.cx+e*i.w,r=i.cz+t*i.d;a.box(n,1.1,r,.55,3.4,.55,0,ex,tx),a.box(n,4.3,r,.85,.3,.85,0,tx,tx)}a.box(i.cx,4.6,i.cz,i.w+.8,.5,i.d+.8,0,U_,U_);let e=5.1;for(let t=0;t<5;t++){let n=1-t*.18,r=t%2?tx:ex;a.box(i.cx,e,i.cz,i.w*n,.55,i.d*n,0,r,Z(r,.85)),e+=.55}rx(a,i.cx,e,i.cz,.8,!1);for(let e of[-.25,0,.25])a.beam(i.cx+e*i.w,4.6,i.z1+.3,i.cx+e*i.w,3.7,i.z1+.3,.04,3355443),a.frustum(i.cx+e*i.w,3.3,i.z1+.3,.32,.12,.42,8,$b,$b)}),i.z0>r.z1-3&&a.box(i.cx,1.1,(i.z0+r.z1)/2,4,4,Math.abs(i.z0-r.z1)+2,0,U_,ex)}for(let n of e.parts.slice(2)){let e=qb(n.poly),r=t(e.cx,e.cz);if(r.box(e.cx,0,e.cz,e.w,3.2,e.d,0,15129803,ex),r.box(e.cx,2.6,e.cz,e.w+.06,.4,e.d+.06,0,15129803,H_),e.w<e.d)for(let t of[-1,1])r.box(e.cx+t*(e.w/2-.2),3.2,e.cz,.4,.45,e.d,0,U_,U_);else for(let t of[-1,1])r.box(e.cx,3.2,e.cz+t*(e.d/2-.2),e.w,.45,.4,0,U_,U_);if(e.w<6||e.d<6)for(let[t,n]of[[e.x0+1.5,e.z0+1.5],[e.x1-1.5,e.z1-1.5]])Bb(r,t,3.6,n,.9,ex,H_)}let l=qb(e.compound),u=e.access[0],d=l.z1-5,f=t(u,d-8);f.flat(u-1.8,c+1.8,u+1.8,d,Gb,16447214),f.box(u-5,0,d-4,1.2,.9,1.2,0,3111482,U_),f.frustum(u+5,0,d-4,.45,.3,4.2,8,B_,B_),f.frustum(u+5,4.2,d-4,.7,.2,.5,8,$b,$b);let p=t(u,d);for(let e of[-1,1])p.box(u+e*4.6,0,d,2.2,6.2,2.6,0,ex,tx),p.box(u+e*4.6,3,d,2.4,.35,2.8,0,U_,U_);let m=6.2,h=[ex,U_,tx,ex,H_];for(let e=0;e<5;e++){let t=11.4-e*1.1;p.box(u,m,d,t,.9,2.6-e*.25,0,h[e],Z(h[e],.85)),m+=.9}p.box(u,m,d,5.8,.6,1.2,0,U_,U_);for(let e=-2;e<=2;e++)p.frustum(u+e*1.1,m+.6,d,.22,.04,.7,6,$b,$b);for(let e=-3;e<=3;e++)p.frustum(u+e*.95,5.5-Math.cos(e/3*1.2)*.5,d+1.35,.16,.16,.3,6,e%2?H_:15909424,H_);for(let e of[-1,1])p.beam(u+e*1.6,6.2,d+.9,u+e*1.6,5,d+.9,.04,3355443),p.frustum(u+e*1.6,4.55,d+.9,.38,.14,.5,8,$b,$b)}function ax(e,t,n){let r=qb(e.parts[0].poly),i=t(r.cx,r.cz),a=11883834,o=r.cx,s=r.cz,c=r.w,l=3810328;Jb(i,n,r,11,()=>{i.frustum(o,0,s,c*.95+1.3,c*.95+1.3,.35,8,B_,V_,Math.PI/8),i.frustum(o,.35,s,c*.8+.6,c*.8+.6,.35,8,mv,B_,Math.PI/8),i.box(o,.7,s,c,4.7,c,0,a,a);for(let[e,t]of[[-1,-1],[1,-1],[1,1],[-1,1]])i.box(o+e*(c/2-.15),.7,s+t*(c/2-.15),.42,4.7,.42,0,ex,ex);for(let e of[.7,2.7,5])i.box(o,e,s,c+.25,.32,c+.25,0,ex,ex);let e=c/2+.03;i.box(o,.7,s+e,1.1,1.9,.06,0,l,l),i.tri(o-.55,2.6,s+e+.031,o+.55,2.6,s+e+.031,o,3.05,s+e+.031,l);for(let[t,n]of[[1,0],[-1,0],[0,-1],[0,1]])i.box(o+t*e,3.2,s+n*e,n?.45:.06,1.4,t?.45:.06,0,l,l);let t=c+.4;i.box(o,5.32,s,t,2.2,t,0,ex,ex);let n=t/2+.03,r=[[0,1,1,0],[1,0,0,-1],[-1,0,0,1],[0,-1,-1,0]],u=6.42;for(let[e,t,a,c]of r){let r=(r,l,d)=>{let f=o+e*(n+l),p=s+t*(n+l);for(let e=0;e<12;e++){let t=e/12*Math.PI*2,n=(e+1)/12*Math.PI*2;i.tri(f,u,p,f+a*Math.cos(t)*r,u+Math.sin(t)*r,p+c*Math.cos(t)*r,f+a*Math.cos(n)*r,u+Math.sin(n)*r,p+c*Math.cos(n)*r,d)}};r(.92,0,2763306),r(.78,.02,16644330);let l=o+e*(n+.06),d=s+t*(n+.06);i.beam(l,u,d,l-a*.32,6.84,d-c*.32,.07,1710618),i.beam(l,u,d,l+a*.5,6.62,d+c*.5,.06,1710618);for(let[e,t]of[[0,.66],[.66,0],[0,-.66],[-.66,0]])i.beam(l+a*e*.9,u+t*.9,d+c*e*.9,l+a*e,u+t,d+c*e,.07,1710618)}i.box(o,7.52,s,t+.6,.3,t+.6,0,a,a);for(let[e,n]of[[-1,-1],[1,-1],[1,1],[-1,1]])i.frustum(o+t/2*e,7.82,s+t/2*n,.16,.05,.45,6,ex,ex);for(let[e,t]of[[-1,-1],[1,-1],[1,1],[-1,1]])i.box(o+e*(c/2-.55),7.82,s+t*(c/2-.55),.2,.75,.2,0,ex,ex);i.box(o,8.57,s,c-.6,.18,c-.6,0,a,a),i.frustum(o,8.75,s,c*.38,c*.3,.45,12,ex,ex),i.frustum(o,9.2,s,c*.3,.08,.6,12,ex,ex),i.frustum(o,9.8,s,.1,.02,.5,6,$b,$b)})}function ox(e,t,n,r,i,a){e.frustum(t,n,r,i*.8,i*.8,i*.5,12,a,a),e.frustum(t,n+i*.5,r,i*.8,i,i*.4,12,a,a),e.frustum(t,n+i*.9,r,i,i*.75,i*.5,12,a,a),e.frustum(t,n+i*1.4,r,i*.75,i*.25,i*.5,12,a,a),e.frustum(t,n+i*1.9,r,i*.25,.02,i*.6,8,a,a),e.frustum(t,n+i*2.5,r,.08,.02,i*.5,4,15251504)}function sx(e,t,n){let r=qb(e.parts[0].poly),i=t(r.cx,r.cz),a=15920352;Jb(i,n,r,18,()=>{i.box(r.cx,0,r.cz,r.w,.8,r.d,0,B_,V_),i.box(r.cx,.8,r.cz+1,r.w-1,6.2,r.d-3,0,a,a);for(let e=0;e<5;e++){let t=r.cx-(r.w-1)/2+(e+.5)*(r.w-1)/5,n=r.cz+1+(r.d-3)/2+.03;i.quad(t-.8,1.2,n,t+.8,1.2,n,t+.8,4.2,n,t-.8,4.2,n,4864560),i.tri(t-.8,4.2,n,t+.8,4.2,n,t,5.2,n,4864560)}i.box(r.cx,7,r.cz+1,r.w-.6,.4,r.d-2.6,0,B_,B_),ox(i,r.cx,7.4,r.cz+1,3.2,a),ox(i,r.cx-4.2,7.4,r.cz+1,1.2,a),ox(i,r.cx+4.2,7.4,r.cz+1,1.2,a);for(let e of[-1,1]){let t=r.cx+e*(r.w/2-.9),n=r.cz+r.d/2-.9;i.frustum(t,0,n,.9,.7,15,8,a,a);for(let e of[7,12])i.frustum(t,e,n,1.15,1.15,.35,8,B_,B_);i.frustum(t,15,n,.85,.85,1.2,8,a,a),ox(i,t,16.2,n,.8,a)}})}function cx(e,t,n){let r=qb(e.parts[0].poly),i=t(r.cx,r.cz);if(Jb(i,n,r,12,()=>{i.box(r.cx,0,r.cz,r.w,7,r.d,0,j_,fv);for(let e of[0,3.3,6.6])i.box(r.cx,e,r.cz,r.w+.2,.45,r.d+.2,0,pv,pv);let e=r.x1+.03;for(let t=r.z0+2;t<r.z1-1;t+=3.2)for(let n of[.9,4.1])i.quad(e,n,t+.8,e,n,t-.8,e,n+1.9,t-.8,e,n+1.9,t+.8,2959914),i.tri(e,n+1.9,t+.8,e,n+1.9,t-.8,e,n+2.5,t,2959914);i.box(r.x1-3,0,r.cz,6,11,9,0,pv,fv),i.frustum(r.x1-3,11,r.cz,4.6,.4,2.6,4,j_,j_,Math.PI/4),i.box(r.x1+.1,8.2,r.cz,.1,1.6,1.6,0,16512744,16512744),i.box(r.x1+.2,7.1,r.cz,.15,.9,6,0,15909424,15909424);for(let e of[-1,1])i.box(r.x1+1.5,0,r.cz+e*3.5,.6,4.2,.6,0,pv,pv);i.box(r.x1+1.5,4.2,r.cz,3.4,.4,8,0,j_,pv)}),e.parts[1]){let n=qb(e.parts[1].poly),r=t(n.cx,n.cz);r.box(n.cx,0,n.cz,n.w,.9,n.d,0,nv,Z(nv,.8)),r.box(n.x0+.25,.9,n.cz,.5,.02,n.d,0,15909424,15909424);for(let e=n.z0+2;e<n.z1;e+=6)r.box(n.cx,.9,e,.25,3.3,.25,0,5925466,5925466);r.box(n.cx,4.2,n.cz,n.w+2.2,.25,n.d,0,uv[0],hv)}}function lx(e,t,n,r){for(let i of e.parts){let e=qb(i.poly),a=t(e.cx,e.cz),o=e.w>e.d,s=o?e.w:e.d;for(let t=1;t<s;t+=4.5)for(let n of[.15,.85]){let i=o?e.x0+t:e.x0+e.w*n,s=o?e.z0+e.d*n:e.z0+t;a.box(i,0,s,.25,r,.25,0,6974052,6974052)}a.box(e.cx,r,e.cz,e.w+1,.25,e.d+1,0,n,Z(n,.8));for(let t=2;t<s-1;t+=6){let n=o?e.x0+t:e.cx,r=o?e.cz:e.z0+t;a.box(n,0,r,o?2:.5,.45,o?.5:2,0,I_,Z(I_,.8))}}}function ux(e,t){let n=qb(e.parts[0].poly),r=t(n.cx,n.cz),i=new Fv(Iv(Math.round(n.cx),Math.round(n.cz))),a=[15895580,15909424,14036526,15228314,16777215];for(let e=n.x0+1;e<n.x1-.5;e+=1.6)for(let t=n.z0+1;t<n.z1-.5;t+=2.2)i.chance(.7)&&(r.box(e,0,t,1.2,.35,1.6,0,I_,Z(I_,.8)),r.frustum(e,.35,t,.6,.2,.4,6,i.pick(a)))}function dx(e,t,n,r,i,a,o){e.box(t.cx,0,t.cz,t.w,n,t.d,0,i,r);let s=n/o;for(let n=0;n<o;n++){let r=n*s+s*.3,i=n*s+s*.75;for(let n=t.x0+1.2;n<t.x1-1;n+=2.4)e.quad(n,r,t.z1+.03,n+1.2,r,t.z1+.03,n+1.2,i,t.z1+.03,n,i,t.z1+.03,a);for(let n=t.z0+1.2;n<t.z1-1;n+=2.4)e.quad(t.x1+.03,r,n+1.2,t.x1+.03,r,n,t.x1+.03,i,n,t.x1+.03,i,n+1.2,a),e.quad(t.x0-.03,r,n,t.x0-.03,r,n+1.2,t.x0-.03,i,n+1.2,t.x0-.03,i,n,a)}}function fx(e,t,n){e.parts.forEach((e,r)=>{let i=qb(e.poly),a=t(i.cx,i.cz);Jb(a,n,i,e.h+1,()=>{if(dx(a,i,e.h,Sv,A_,5929626,3),a.box(i.cx,e.h,i.cz,i.w+.3,.5,i.d+.3,0,3043286,3043286),r===0)for(let t of[i.z0-.15,i.z1+.15])a.box(i.cx,e.h-3.2,t,2.4,.7,.1,0,14036526,14036526),a.box(i.cx,e.h-4.05,t,.7,2.4,.1,0,14036526,14036526)})})}function px(e,t,n){e.parts.forEach((e,r)=>{let i=qb(e.poly),a=t(i.cx,i.cz);Jb(a,n,i,e.h+1,()=>{if(dx(a,i,e.h,fv,j_,2964042,2),a.box(i.cx,e.h-.6,i.cz,i.w+.2,.6,i.d+.2,0,Cv,Cv),r===0){a.box(i.cx,e.h-2.2,i.z0-.15,i.w*.6,1,.12,0,2052e3,2052e3,16777215),a.box(i.cx,e.h-2.2,i.z1+.15,i.w*.6,1,.12,0,2052e3,2052e3,2052e3);let t=i.x1-2,n=i.z0-3;a.beam(t,0,n,t,10,n,.12,14540253),[16750899,16777215,1280008].forEach((e,r)=>{let i=9.8-r*.6;a.quad(t,i-.6,n,t+2.6,i-.6,n,t+2.6,i,n,t,i,n,e),a.quad(t+2.6,i-.6,n,t,i-.6,n,t,i,n,t+2.6,i,n,e)})}})})}function mx(e,t,n){let r=qb(e.parts[0].poly),i=t(r.cx,r.cz),a=new Fv(Iv(Math.round(r.cx),77));Jb(i,n,r,16,()=>{i.box(r.cx,0,r.cz,r.w,14,r.d,0,j_,15259832),i.box(r.cx,12.5,r.cz,r.w+.4,1.5,r.d+.4,0,wv,wv);for(let e=0;e<4;e++){let t=r.x0+2+e*((r.w-4)/4);i.box(t+(r.w-4)/8,4,r.z1+.1,(r.w-4)/4-.8,6.5,.15,0,a.pick(k_),2236962,a.pick(k_)),i.box(t+(r.w-4)/8,7.5,r.z1+.2,(r.w-4)/4-2,1.4,.05,0,16777215,16777215,a.pick([15909424,16777215]))}for(let e of[-1,1]){let t=e<0?r.x0-.1:r.x1+.1;i.box(t,4,r.cz,.15,6,r.d*.5,0,a.pick(k_),a.pick(k_))}i.box(r.x1-1,6,r.z0+1,.5,9,2.4,0,wv,15909424),i.box(r.cx,3.4,r.z0-1.2,r.w*.5,.6,2.4,0,wv,15909424)})}function hx(e,t,n){let r=qb(e.parts[0].poly),i=t(r.cx,r.cz),a=new Fv(Iv(Math.round(r.cx*7),Math.round(r.cz))),o=e.kind===`paintShop`;Jb(i,n,r,7,()=>{i.box(r.cx,0,r.cz,r.w,4.6,r.d,0,j_,o?16052454:14209216),i.box(r.cx,4.6,r.cz,r.w+.8,.2,r.d+.8,0,uv[1],uv[1]),o?([14036526,15895580,15909424,2072154,3043286,9322432].forEach((e,t)=>i.box(r.cx,.6+t*.5,r.cz,r.w+.06,.5,r.d+.06,0,e,e)),i.box(r.cx,5,r.cz+r.d/2+.2,r.w*.7,1.4,.15,0,2236962,2236962,a.pick([15228314,2793392]))):i.box(r.cx,5,r.cz+r.d/2+.2,r.w*.8,1.4,.15,0,15909424,15909424,14036526)});let s=e.access[0],c=e.access[1];if((Math.abs(s-r.cx)/r.w>Math.abs(c-r.cz)/r.d?`x`:`z`)==`z`){let e=c>r.cz?r.z1+.04:r.z0-.04;i.quad(r.x0+1.5,0,e,r.x1-1.5,0,e,r.x1-1.5,3.6,e,r.x0+1.5,3.6,e,2762276),i.quad(r.x1-1.5,0,e,r.x0+1.5,0,e,r.x0+1.5,3.6,e,r.x1-1.5,3.6,e,2762276)}for(let e=0;e<3;e++){let t=r.x0-1.2,n=r.cz-2+e*1.1;for(let e=0;e<a.int(1,4);e++)i.frustum(t,e*.26,n,.45,.45,.25,8,1973790)}for(let e=0;e<2;e++)i.frustum(r.x1+1,0,r.cz+e*1.2,.35,.35,.95,8,e?3043286:14036526)}function gx(e,t,n){let r=qb(e.parts[0].poly),i=t(r.cx,r.cz);Jb(i,n,r,22,()=>{let e=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let[t,n]of e)i.box(r.cx+t*3,0,r.cz+n*3,.6,15,.6,0,nv,nv);for(let t of[5,10])for(let n=0;n<4;n++){let[a,o]=e[n],[s,c]=e[(n+1)%4];i.beam(r.cx+a*3,t,r.cz+o*3,r.cx+s*3,t,r.cz+c*3,.35,nv)}i.frustum(r.cx,15,r.cz,3.2,4.4,1.2,12,nv,nv),i.frustum(r.cx,16.2,r.cz,4.4,4.4,4,12,14210248,14210248),i.frustum(r.cx,20.2,r.cz,4.4,.4,1.6,12,nv,nv)})}function _x(e,t){let n=qb(e.compound),r=new Fv(Iv(Math.round(n.cx),Math.round(n.cz)));for(let e=n.z0+4;e<n.z1-2;e+=5.2){let i=n.x0+1,a=n.x1-1,o=t((i+a)/2,e+2.6),s=e+2.6;for(let e of[i,a])o.box(e,0,s,.12,2.4,.12,0,I_,I_);o.beam(i,2.3,s,a,2.3,s,.03,z_);for(let e=i+.5;e<a-.5;e+=r.range(.7,1.3)){let t=r.range(.4,.9),n=r.range(.6,1.4),i=r.chance(.4)?16777215:r.pick(sv);o.quad(e,2.3-n,s,e+t,2.3-n,s,e+t,2.3,s,e,2.3,s,i),o.quad(e+t,2.3-n,s,e,2.3-n,s,e,2.3,s,e+t,2.3,s,Z(i,.85))}}}function vx(e,t){if(!e.parts.length)return;let n=qb(e.parts[0].poly),r=t(n.cx,n.cz);r.box(n.cx,0,n.cz,n.w,1.6,n.d,0,B_,V_),r.box(n.cx,1.6,n.cz,.8,1.6,.5,0,9079418,9079418),r.frustum(n.cx,3.2,n.cz,.3,.3,.4,8,9079418)}function yx(e,t){for(let n of e.roundabouts){let e=t(n.x,n.z);e.frustum(n.x,0,n.z,n.island+.4,n.island+.4,.3,20,15658734,15658734),e.frustum(n.x,.3,n.z,n.island,n.island,.05,20,E_.island,E_.island);for(let t=0;t<14;t++){let r=t/14*Math.PI*2;e.box(n.x+Math.cos(r)*(n.island-1.3),.35,n.z+Math.sin(r)*(n.island-1.3),.9,.4,.9,r,t%2?15902017:15228314,5216828)}e.frustum(n.x,.35,n.z,2.6,2.6,.6,12,B_,V_),e.frustum(n.x,.95,n.z,2.3,2.3,.05,12,E_.water,E_.water),e.frustum(n.x,.95,n.z,.4,.3,2.4,8,B_),e.frustum(n.x,3.35,n.z,1.1,.2,.5,8,B_)}}function bx(e,t){let n=e.plan.roads.find(e=>e.id===`flyover`);if(!n?.level)return;let r=n.level,i=n.pts,a=n.width/2,o=e=>uy*r[e],s=G_.main,c=12104358,l=-1,u=-1;for(let e=1;e<i.length;e++){if(r[e-1]<.55||r[e]<.55)continue;l<0&&(l=e-1),u=e;let[n,d]=i[e-1],[f,p]=i[e],m=o(e-1),h=o(e),g=t((n+f)/2,(d+p)/2);g.quad(n,m,d+a,f,h,p+a,f,h,p-a,n,m,d-a,s),g.quad(n,m-1.1,d+a,f,h-1.1,p+a,f,h,p+a,n,m,d+a,c),g.quad(f,h-1.1,p-a,n,m-1.1,d-a,n,m,d-a,f,h,p-a,c),g.quad(n,m-1.1,d-a,f,h-1.1,p-a,f,h-1.1,p+a,n,m-1.1,d+a,Z(c,.7));for(let e of[-1,1]){let t=d+e*(a-.15),r=p+e*(a-.15);g.beam(n,m+.45,t,f,h+.45,r,.3,14209732),g.beam(n,m+.05,t,f,h+.05,r,.32,14209732)}e%3==0&&g.quad(n,m+.004,d-.08,f,h+.004,p-.08,f,h+.004,p+.08,n,m+.004,d+.08,Y_)}let d=e=>{let t=0,n=1/0;for(let r=0;r<i.length;r++){let a=Math.abs(i[r][0]-e);a<n&&(n=a,t=r)}return o(t)},f=new Map;for(let t of e.pillars){let e=Math.round(t.x),n=f.get(e)??[];n.push(t),f.set(e,n)}for(let e of f.values()){let n=e[0].x,r=d(n)-1.1,i=Math.min(...e.map(e=>e.z)),a=Math.max(...e.map(e=>e.z)),o=t(n,(i+a)/2);for(let t of e)o.box(t.x,0,t.z,1.2,r-.9,1.2,0,c,c);o.box(n,r-.9,(i+a)/2,1.6,.9,a-i+1.6,0,c,Z(c,.85))}for(let e of[l,u]){if(e<0)continue;let[n,r]=i[e],s=o(e),c=e===l?-1:1,u=t(n,r);for(let e=-3;e<=3;e++)u.beam(n,s-.6,r+e*1.1,n+c*1.4,s-.6-Math.abs(e)*.05,r+e*1.1,.06,8014378);for(let e=-3;e<=3;e++)u.box(n-c*.5,s,r+e*1.15,.3,1.1,1.1,0,e%2?Ev:Tv,e%2?Ev:Tv);for(let e of[-1,1])u.frustum(n-c*2,s,r+e*2,.3,.05,.7,6,15895580);u.box(n-c*1,s-3.2,r+a+.2,3,1.6,.12,0,15909424,15909424,2236962)}}function xx(e,t){let n=new Fv(e.seed),r=Math.PI/2-e.heading,i=Math.cos(r),a=Math.sin(r),o=(t,n)=>[e.x+t*i-n*a,e.z+t*a+n*i];switch(e.kind){case`tree`:{let r=4+e.r*2;t.box(e.x,0,e.z,.35,r*.45,.35,n.next(),L_,L_);let i=n.pick(R_),a=e.r*1.2+.6;t.frustum(e.x,r*.38,e.z,a*.4,a,r*.24,6,Z(i,.85),i,n.next()),t.frustum(e.x,r*.62,e.z,a,a*.25,r*.38,6,i,i,n.next());break}case`banyan`:{t.frustum(e.x,0,e.z,3.2,3,.55,10,B_,V_),t.frustum(e.x,.55,e.z,.9,.75,3.6,8,L_,L_),t.frustum(e.x,1.4,e.z,.95,.95,.25,8,12597547,12597547);for(let r=0;r<5;r++){let i=r/5*Math.PI*2+n.next(),a=n.range(2.2,4);t.box(e.x+Math.cos(i)*a,.55,e.z+Math.sin(i)*a,.12,3.6,.12,0,Z(L_,1.15),L_)}let r=Z(n.pick(R_),.9);t.frustum(e.x,3.6,e.z,3,6.5,1.6,9,Z(r,.8),r,n.next()),t.frustum(e.x,5.2,e.z,6.5,4.2,1.6,9,r,r,n.next()),t.frustum(e.x,6.8,e.z,4.2,1.2,1.4,9,r,r,n.next());break}case`stall`:{let i=n.pick(k_),a=1.7,s=1.1;t.box(e.x,0,e.z,a,.8,s,r,I_,Z(I_,.85));for(let e=0;e<2;e++){let[i,c]=o(-1.7/4+e*a/2,0),l=n.pick(W_);t.box(i,.8,c,a/2-.1,.22,s*.75,r,l,Z(l,.8))}for(let e of[-.79,a/2-.06]){let[n,i]=o(e,s/2);t.box(n,0,i,.07,2.2,.07,r,I_,I_)}t.box(e.x,2.2,e.z,2.2,.07,1.7000000000000002,r,i,Z(i,.8));break}case`flowers`:{let n=1.8,i=1.1;t.box(e.x,0,e.z,n,.8,i,r,I_,Z(I_,.85));for(let e=0;e<3;e++){let[r,i]=o(-1.8/3+e*n/3,0),a=e%2?15909424:H_;t.frustum(r,.8,i,.32,.12,.3,6,a,a)}for(let e of[-1.8/2+.06,n/2-.06]){let[n,a]=o(e,i/2);t.box(n,0,a,.07,2.2,.07,r,I_,I_)}for(let e=0;e<6;e++){let[n,i]=o(-.7+e*1.4/5,-1.1/2-.2);t.box(n,1.25,i,.12,.9,.12,r,e%2?15909424:H_,e%2?15909424:H_)}t.box(e.x,2.2,e.z,2.3,.07,1.7000000000000002,r,14036526,11542560);break}case`chai`:{let i=n.pick([3050432,2072154,15228188,9322432]);t.box(e.x,0,e.z,1.8,2,1.4,r,i,i,Z(i,1.15)),t.box(e.x,2,e.z,2.3,.12,2.1,r,14036526,11542560);let[a,s]=o(0,-1);t.box(a,0,s,1.6,.9,.4,r,I_,Z(I_,.85)),t.frustum(a,.9,s,.15,.12,.3,6,12632256);let[c,l]=o(0,-2);t.box(c,0,l,1.6,.42,.4,r,I_,Z(I_,.8));break}case`shrine`:t.box(e.x,0,e.z,1.3,.55,1.3,r,V_,V_),t.box(e.x,.55,e.z,.8,1.3,.8,r,15920352,15920352,U_),t.frustum(e.x,1.85,e.z,.55,.08,1.4,4,H_,H_,Math.PI/4+r),t.box(e.x,.55,e.z,.9,.06,.9,r,15895580,15895580);break;case`cart`:{let i=1.6,a=.9;t.box(e.x,.55,e.z,i,.14,a,r,I_,Z(I_,.8));for(let e=0;e<3;e++){let[s,c]=o(-1.6/2+(e+.5)*(i/3),0),l=n.pick(W_);t.box(s,.69,c,i/3-.08,.3,a*.8,r,l,Z(l,.8))}for(let e of[-.9/2-.05,.5]){let[n,i]=o(0,e);t.box(n,0,i,.6,.6,.08,r,3355443,3355443)}break}case`bikes`:{let e=n.int(2,4);for(let i=0;i<e;i++){let[e,a]=o(-.9+i*.7,0),s=n.pick([2236962,14036526,3043286,6974058,1118481]);t.box(e,.3,a,.25,.45,1.5,r+.15,s,s),t.box(e,0,a,.08,.55,1.6,r+.15,1710618,1710618)}break}case`pool`:t.box(e.x,0,e.z,3.2,.6,3.2,0,B_,V_),t.flat(e.x-1.4,e.z-1.4,e.x+1.4,e.z+1.4,.55,6989488),t.box(e.x+1.9,0,e.z,.6,.7,2.6,0,V_,V_);break;case`bench`:t.box(e.x,0,e.z,1.8,.45,.5,r,I_,Z(I_,.8))}}function Sx(e,t){for(let n=0;n<e.length;n+=6){let r=e[n],i=e[n+1],a=e[n+2],o=e[n+3],s=e[n+4],c=e[n+5],l=(r+o)/2,u=(a+c)/2,d=(i+s)/2-.45,f=t(l,u);f.beam(r,i,a,l,d,u,.045,z_),f.beam(l,d,u,o,s,c,.045,z_)}}var Cx=64,wx=Math.ceil((cy.maxX-cy.minX)/Cx),Tx=Math.ceil((cy.maxZ-cy.minZ)/Cx),Ex=260,Dx=sy*.95,Ox=6,kx=64,Ax=2.2,jx=.5,Mx=1.6,Nx=[1.2,1.9],Px=class{constructor(e,t=()=>0){this.object=new er,this.material=new Ya({vertexColors:!0}),this.chunks=[],this.bufs=[],this.occList=[],this.active=new Set,this.found=[],this.cutCount=0,this.at=(e,t)=>{let n=Math.min(wx-1,Math.max(0,Math.floor((e-cy.minX)/Cx))),r=Math.min(Tx-1,Math.max(0,Math.floor((t-cy.minZ)/Cx)));return this.bufs[r*wx+n]};let n=t();this.object.name=`city`;for(let e=0;e<wx*Tx;e++)this.bufs.push(new Ay);By(e,this.at);for(let t of e.buildings){let e=this.at(t.x,t.z);e.curBid=this.addOcc(t.x,t.z,Math.atan2(t.uz,t.ux),t.hu,t.hv,t.height+1.6),Pb(t,e),e.curBid=0}for(let t of e.props)xx(t,this.at(t.x,t.z));Sx(e.wires,this.at),Yb(e,this.at,(e,t,n,r,i,a)=>this.addOcc(e,t,n,r,i,a));let r=this.occList.length+1,i=Math.ceil(r/kx);this.cutTex=new Ai(new Uint8Array(kx*i*4),kx,i,Me,ve),this.cutTex.needsUpdate=!0,this.cut=new Float32Array(r),this.deep=new Float32Array(r),this.want=new Uint8Array(r);let a={cutTex:{value:this.cutTex},cutSize:{value:new B(kx,i)},cutH:{value:Dx},lowH:{value:jx}};this.material.onBeforeCompile=e=>{Object.assign(e.uniforms,a),e.vertexShader=`attribute float bid;
uniform sampler2D cutTex;
uniform vec2 cutSize;
uniform float cutH;
uniform float lowH;
`+e.vertexShader.replace(`#include <begin_vertex>`,[`#include <begin_vertex>`,`if (bid > 0.5) {`,`  float cRow = floor((bid + 0.5) / cutSize.x);`,`  vec2 cuv = vec2((bid - cRow * cutSize.x + 0.5) / cutSize.x, (cRow + 0.5) / cutSize.y);`,`  vec4 cutT = texture2D(cutTex, cuv);`,`  float cutTo = mix(cutH, lowH, cutT.g);`,`  if (transformed.y > cutTo) transformed.y = mix(transformed.y, cutTo, cutT.r);`,`}`].join(`
`))},this.material.customProgramCacheKey=()=>`city-cut`,this.occGrid=new Dv(this.occList,{...cy});let o=0,s=0;this.bufs.forEach((e,t)=>{if(!e.iCount){this.chunks.push(null);return}let n=new Di(e.toGeometry(),this.material);n.name=`city-chunk-${t}`,n.matrixAutoUpdate=!1,this.object.add(n),this.chunks.push(n),o+=e.triangles,s++}),this.bufs=[];let c=Math.min(zy(e,cy.minZ),zy(e,cy.maxZ),zy(e,0)),l=new Di(new La(3e3,4e3).rotateX(-Math.PI/2),new Ya({color:E_.water}));l.position.set(c+1500,Ny,0),l.name=`water`;let u=new Di(new La(4e3,4e3).rotateX(-Math.PI/2),new Ya({color:Q_[0]}));u.position.set(c-2e3+4,-.03,0),u.name=`land`,this.object.add(l,u),this.info={chunks:s,triangles:o,buildMs:t()-n,occluders:this.occList.length}}addOcc(e,t,n,r,i,a){let o=Math.cos(n),s=Math.sin(n),c=Math.abs(o)*r+Math.abs(s)*i,l=Math.abs(s)*r+Math.abs(o)*i,u=this.occList.length+1;return this.occList.push({minX:e-c,minZ:t-l,maxX:e+c,maxZ:t+l,i:u,h:a,x:e,z:t,c:o,s,hw:r,hl:i}),u}update(e,t,n,r){for(let t=0;t<this.chunks.length;t++){let n=this.chunks[t];if(!n)continue;let r=t%wx*Cx+cy.minX+Cx/2,i=Math.floor(t/wx)*Cx+cy.minZ+Cx/2;n.visible=Math.hypot(r-e.camX,i-e.camZ)<Ex}this.occlude(e,t,n,r)}occlude(e,t,n,r){let i=Ax,a=this.found;a.length=0,this.occGrid.query(Math.min(e.camX,t)-i-Mx,Math.min(e.camZ,n)-i-Mx,Math.max(e.camX,t)+i+Mx,Math.max(e.camZ,n)+i+Mx,a);for(let r of a){let a=!1;for(let o=0;o<7&&!a;o++){let s=o===1?-2.2:o===2?i:0,c=o===3?-2.2:o===4?i:0,l=o===5?.2:o===6?2.2:1.2;a=Fx(e.camX,e.camY,e.camZ,t+s,l,n+c,r,0,r.h)}let o=!1;if(r.maxZ>n)for(let i of Nx)o||(o=Fx(e.camX,e.camY,e.camZ,t,i,n,r,Mx,Dx+.1));(a||o)&&(this.want[r.i]=o?2:1,this.active.add(r.i))}let o=!1,s=0,c=this.cutTex.image.data,l=Math.min(1,Ox*r);for(let e of this.active){let t=this.want[e];this.want[e]=0;let n=this.cut[e],r=t?Math.min(1,n+l):Math.max(0,n-l);r!==n&&(this.cut[e]=r,c[e*4]=Math.round(r*255),o=!0);let i=this.deep[e],a=t===2?Math.min(1,i+l):t===1||r===0?Math.max(0,i-l):i;a!==i&&(this.deep[e]=a,c[e*4+1]=Math.round(a*255),o=!0),r===0&&!t?(this.active.delete(e),this.deep[e]!==0&&(this.deep[e]=0,c[e*4+1]=0)):s++}this.cutCount=s,o&&(this.cutTex.needsUpdate=!0)}showAll(){for(let e of this.chunks)e&&(e.visible=!0)}};function Fx(e,t,n,r,i,a,o,s,c){let l=(e-o.x)*o.c+(n-o.z)*o.s,u=(e-o.x)*o.s-(n-o.z)*o.c,d=(r-o.x)*o.c+(a-o.z)*o.s,f=(r-o.x)*o.s-(a-o.z)*o.c,p=0,m=1,h=[l,t,u],g=[d-l,i-t,f-u],_=[-o.hw-s,0,-o.hl-s],v=[o.hw+s,c,o.hl+s];for(let e=0;e<3;e++){if(Math.abs(g[e])<1e-9){if(h[e]<_[e]||h[e]>v[e])return!1;continue}let t=(_[e]-h[e])/g[e],n=(v[e]-h[e])/g[e];if(t>n){let e=t;t=n,n=e}if(t>p&&(p=t),n<m&&(m=n),p>m)return!1}return!0}var Ix=64,Lx=15854560,Rx=9076596,zx=15260080,Bx=3879724,Vx=14263200,Hx=new U;function Ux(e,t,n,r,i,a,o){let s=new Yi(e,t,n);s.translate(r,i,a),Hx.setHex(o);let c=s.getAttribute(`position`).count,l=new Float32Array(c*3);for(let e=0;e<c;e++)l[e*3]=Hx.r,l[e*3+1]=Hx.g,l[e*3+2]=Hx.b;return s.setAttribute(`color`,new Gr(l,3)),s}function Wx(){let e=Xd.length,t=Xd.width,n=e*.33,r=e*.36,i=n+r/2,a=[Ux(t,r,e*.72,0,i,.05*e,Lx),Ux(t*.7,r*.45,e*.18,0,i+r*.6,-.18*e,Rx),Ux(t*.55,r*.75,e*.26,0,i+r*.25,-.46*e,Lx),Ux(t*.4,r*.3,e*.08,0,i+r*.05,-.6*e,Vx),Ux(t*.12,r*.45,t*.12,-t*.22,i+r*.85,-.44*e,zx),Ux(t*.12,r*.45,t*.12,t*.22,i+r*.85,-.44*e,zx),Ux(t*.08,r*.9,t*.08,0,i-r*.2,.42*e,Rx)];for(let[r,i]of[[-.3,-.25],[.3,-.25],[-.3,.32],[.3,.32]])a.push(Ux(t*.2,n*.85,t*.2,r*t,n*.85/2+n*.15,i*e,Lx)),a.push(Ux(t*.22,n*.15,t*.22,r*t,n*.075,i*e,Bx));let o=ab(a,!1);for(let e of a)e.dispose();return o.computeBoundingSphere(),o}var Gx=class{constructor(){this.d=new $n,this.mesh=new zi(Wx(),new Ya({vertexColors:!0}),Ix),this.mesh.instanceMatrix.setUsage(Pt),this.mesh.count=0,this.mesh.frustumCulled=!1,this.mesh.name=`cows`}sync(e,t,n){let r=this.d,i=0;for(let a of e.animals.cows){if(i>=Ix)break;let e=a.px+(a.x-a.px)*t,o=a.pz+(a.z-a.pz)*t,s=y_(a.pHeading,a.heading,t),c=Math.abs(Math.sin(a.walkDist*3))*.05,l=a.dazeT>0?Math.sin(n*14+a.id)*.2*Math.min(1,a.dazeT):0;r.position.set(e,c,o),r.rotation.set(0,-s,l,`YXZ`),r.updateMatrix(),this.mesh.setMatrixAt(i++,r.matrix)}this.mesh.count=i,this.mesh.instanceMatrix.needsUpdate=!0}},Kx=64,qx=new U(16722474),Jx=new U(2780159),Yx=.25,Xx=class{constructor(){this.object=new er,this.d=new $n,this.c=new U,this.placesDone=!1,this.lamps=new zi(new Yi(.42,.22,.32),new hi({color:16777215}),Kx),this.lamps.instanceMatrix.setUsage(Pt),this.lamps.count=0,this.lamps.frustumCulled=!1;let e=new Ra(vu.radius-.6,vu.radius,32);e.rotateX(-Math.PI/2),this.rings=new zi(e,new hi({color:16777215,transparent:!0,opacity:.7,depthWrite:!1}),16),this.rings.count=0,this.rings.frustumCulled=!1,this.posts=new zi(new Xi(.25,.25,3.2,6),new hi({color:16777215}),16),this.posts.count=0,this.posts.frustumCulled=!1,this.object.add(this.lamps,this.rings,this.posts),this.object.name=`police-view`}places(e){let t=e.places,n=[...t.paintShops.map(e=>({x:e.x,z:e.z,color:16732120,scale:1})),{x:t.hospital.x,z:t.hospital.z,color:16726843,scale:.45},{x:t.station.x,z:t.station.z,color:3898367,scale:.45}],r=this.d;n.forEach((e,t)=>{r.position.set(e.x,.06,e.z),r.rotation.set(0,0,0),r.scale.set(e.scale,1,e.scale),r.updateMatrix(),this.rings.setMatrixAt(t,r.matrix),this.rings.setColorAt(t,this.c.setHex(e.color)),r.position.set(e.x,1.6,e.z),r.scale.set(1,1,1),r.updateMatrix(),this.posts.setMatrixAt(t,r.matrix),this.posts.setColorAt(t,this.c.setHex(e.color))}),this.rings.count=n.length,this.posts.count=n.length,this.rings.instanceMatrix.needsUpdate=!0,this.posts.instanceMatrix.needsUpdate=!0,this.rings.instanceColor&&(this.rings.instanceColor.needsUpdate=!0),this.posts.instanceColor&&(this.posts.instanceColor.needsUpdate=!0)}sync(e,t,n){!this.placesDone&&e.city&&(this.places(e),this.placesDone=!0);let r=0,i=Math.floor(n*K.flashHz*2)%2,a=(e,n)=>{if(e.driver!==`npc`||e.stage===`wreck`)return;let a=q[e.type],o=e.px+(e.x-e.px)*t,s=e.pz+(e.z-e.pz)*t,c=y_(e.pHeading,e.heading,t);for(let e of[-1,1]){if(r>=Kx)return;let t=e*a.width*.22,l=Math.cos(c),u=Math.sin(c);this.d.position.set(o+l*t,a.height+.1,s+u*t),this.d.rotation.set(0,-c,0),this.d.scale.set(1,1,1),this.d.updateMatrix(),this.lamps.setMatrixAt(r,this.d.matrix);let d=e<0==((i+n)%2==0);this.c.copy(e<0?qx:Jx).multiplyScalar(d?1.4:Yx),this.lamps.setColorAt(r++,this.c)}};e.police.units.forEach((e,t)=>a(e.agent.v,t));for(let t of e.police.roadblocks)t.vehicles.forEach((e,t)=>a(e,t));this.lamps.count=r,this.lamps.instanceMatrix.needsUpdate=!0,this.lamps.instanceColor&&(this.lamps.instanceColor.needsUpdate=!0)}},Zx=48,Qx={job:16732047,garage:1688245,locked:9274488,target:16761370},$x=class{constructor(){this.object=new er,this.d=new $n,this.c=new U,this.list=[];let e=new Ra(.82,1,40);e.rotateX(-Math.PI/2),this.rings=new zi(e,new hi({color:16777215,transparent:!0,opacity:.85,depthWrite:!1,depthTest:!1}),Zx);let t=new Xi(1,1,1,20,1,!0);t.translate(0,.5,0),this.beams=new zi(t,new hi({color:16777215,transparent:!0,opacity:.28,depthWrite:!1,blending:2}),Zx);for(let e of[this.rings,this.beams])e.instanceMatrix.setUsage(Pt),e.count=0,e.frustumCulled=!1,e.renderOrder=2;this.rings.renderOrder=10,this.object.add(this.rings,this.beams),this.object.name=`mission-view`}sync(e,t){let n=0,r=1+Math.sin(t*4)*.06,i=(e,t,i,a,o)=>{if(n>=Zx)return;let s=this.d;s.position.set(e,.07,t),s.rotation.set(0,0,0),s.scale.set(i*r,1,i*r),s.updateMatrix(),this.rings.setMatrixAt(n,s.matrix),this.rings.setColorAt(n,this.c.setHex(o)),s.position.set(e,0,t),s.scale.set(i*.55,a,i*.55),s.updateMatrix(),this.beams.setMatrixAt(n,s.matrix),this.beams.setColorAt(n,this.c.setHex(o)),n++};if(e.city){for(let t of Fg(e,this.list))t.kind!==`locked`&&i(t.x,t.z,t.kind===`garage`?4.5:Gm.startRadius*.8,t.kind===`garage`?7:10,Qx[t.kind]);let t=e.missions.objective;if(t.key&&t.has){let n=e.vehicles.some(e=>Math.abs(e.x-t.x)<.01&&Math.abs(e.z-t.z)<.01),r=Cd(e,e.player.vehicleId),a=t.key===`obj.checkpoint`;r&&Math.abs(r.x-t.x)<.01&&Math.abs(r.z-t.z)<.01||i(t.x,t.z,a?Gm.checkpointRadius*.8:n?3.2:Gm.arriveRadius*.6,n?5:14,Qx.target)}}this.rings.count=n,this.beams.count=n;for(let e of[this.rings,this.beams])e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0)}},eS=600,tS=64,nS=2.2,rS=.35,iS=.7,aS=.05,oS=class{constructor(){this.object=new er,this.nextMark=0,this.usedMarks=0,this.puffAge=new Float32Array(tS).fill(iS),this.puffPos=new Float32Array(192),this.nextPuff=0,this.trails=new Map,this.d=new $n,this.frame=0;let e=new La(1,1);e.rotateX(-Math.PI/2),this.marks=new zi(e,new hi({color:1842204,transparent:!0,opacity:.55,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}),eS),this.marks.instanceMatrix.setUsage(Pt),this.marks.count=0,this.marks.frustumCulled=!1,this.marks.name=`skid-marks`,this.puffs=new zi(new Ia(.5,0),new Ya({color:14271643}),tS),this.puffs.instanceMatrix.setUsage(Pt),this.puffs.count=0,this.puffs.frustumCulled=!1,this.puffs.name=`dust`,this.object.add(this.marks,this.puffs)}sync(e,t,n){this.frame++;let r=this.d;for(let r of e.vehicles){let e=q[r.type],i=this.trails.get(r.id),a=r.skid>nS&&r.stage!==`wreck`;if(!i){if(!a)continue;i={lx:0,lz:0,rx:0,rz:0,on:!1,puffT:0,seen:0},this.trails.set(r.id,i)}i.seen=this.frame;let o=r.px+(r.x-r.px)*t,s=r.pz+(r.z-r.pz)*t,c=r.heading,l=Math.sin(c),u=-Math.cos(c),d=e.length*.32,f=e.model===`bike`?0:e.width*.38,p=o-l*d+u*f,m=s-u*d-l*f,h=o-l*d-u*f,g=s-u*d+l*f;if(!a){i.on=!1;continue}i.on||(i.on=!0,i.lx=p,i.lz=m,i.rx=h,i.rz=g),Math.hypot(p-i.lx,m-i.lz)>=rS&&(this.mark(i.lx,i.lz,p,m,e.model===`bike`?.18:.3),f>0&&this.mark(i.rx,i.rz,h,g,.3),i.lx=p,i.lz=m,i.rx=h,i.rz=g),i.puffT-=n,i.puffT<=0&&(i.puffT=aS,this.puff(p,m),f>0&&this.puff(h,g))}for(let[e,t]of this.trails)t.seen!==this.frame&&this.trails.delete(e);let i=0;for(let e=0;e<tS;e++){let t=this.puffAge[e]+=n;if(t>=iS)continue;let a=t/iS,o=(.5+a*1.6)*(1-a*a);r.position.set(this.puffPos[e*3],.3+a*1.2,this.puffPos[e*3+2]),r.rotation.set(a*2,e,0),r.scale.set(o,o*.8,o),r.updateMatrix(),this.puffs.setMatrixAt(i++,r.matrix)}this.puffs.count=i,this.puffs.instanceMatrix.needsUpdate=!0,this.marks.count=this.usedMarks}mark(e,t,n,r,i){let a=this.d,o=Math.hypot(n-e,r-t);a.position.set((e+n)/2,.03,(t+r)/2),a.rotation.set(0,Math.atan2(n-e,r-t),0),a.scale.set(i,1,o+.05),a.updateMatrix(),this.marks.setMatrixAt(this.nextMark,a.matrix),this.nextMark=(this.nextMark+1)%eS,this.usedMarks=Math.min(eS,this.usedMarks+1),this.marks.instanceMatrix.needsUpdate=!0}puff(e,t){let n=this.nextPuff;this.nextPuff=(n+1)%tS,this.puffAge[n]=0,this.puffPos[n*3]=e,this.puffPos[n*3+2]=t}},sS=class{constructor(e,n){this.scene=new lr,this.vehicles=new Ob,this.walkers=new T_,this.camTarget={x:0,z:0,vx:0,vz:0,driving:!1},this.city=null,this.cows=new Gx,this.police=new Xx,this.missionView=new $x,this.skids=new oS,this.renderer=new gu({antialias:!0,powerPreference:`high-performance`}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),e.appendChild(this.renderer.domElement);let r=new U(16048046);this.scene.background=r,this.scene.fog=new cr(r,90,260),this.scene.add(new yo(16774358,11569746,1.4),new Fo(16777215,.3));let i=new Po(16777215,1.6);i.position.set(-30,60,20),this.scene.add(i),this.scene.add(jy(t.worldHalfSize));let a=ib(n.static);a&&this.scene.add(a),this.scene.add(this.vehicles.object,this.walkers.object),this.scene.add(this.cows.mesh,this.police.object,this.missionView.object),this.scene.add(this.skids.object),this.cam=new Bd(1),this.resize(),window.addEventListener(`resize`,()=>this.resize())}resize(){let e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t,!1),this.cam.setAspect(e/Math.max(1,t),t)}attachCity(e){return this.scene.getObjectByName(`ground`)?.removeFromParent(),this.city=new Px(e,()=>performance.now()),this.scene.add(this.city.object),this.city}snapCamera(e){this.cam.snap(this.target(e,1))}handleEvents(e){for(let t of e)t.type===`crash`?this.cam.shake(t.impact):t.type===`explode`&&this.cam.shake(25)}render(e,t,n){this.vehicles.sync(e,t,e.time),this.walkers.sync(e,t),this.cows.sync(e,t,e.time),this.police.sync(e,t,e.time),this.missionView.sync(e,e.time),this.skids.sync(e,t,n),this.cam.update(this.target(e,t),n),this.city?.update(this.cam.occlusionHint(),this.camTarget.x,this.camTarget.z,n),this.renderer.render(this.scene,this.cam.camera)}target(e,t){let n=this.camTarget,r=Cd(e,e.player.vehicleId),i=r??e.player.walker;return n.x=i.px+(i.x-i.px)*t,n.z=i.pz+(i.z-i.pz)*t,n.vx=i.vx,n.vz=i.vz,n.driving=!!r,n}stats(){let e=this.renderer.info.render;return{calls:e.calls,triangles:e.triangles}}},cS=class{constructor(e,t){this.acc=0,this.dropped=0,this.dt=e,this.maxSteps=t}advance(e){this.acc+=Math.max(0,e);let t=Math.floor(this.acc/this.dt);return t>this.maxSteps?(this.dropped+=t-this.maxSteps,t=this.maxSteps,this.acc=0):this.acc-=t*this.dt,t}get alpha(){return Math.min(1,this.acc/this.dt)}reset(){this.acc=0}},lS={nearSpawn:[{type:`rickshaw`,driver:!0},{type:`rickshaw`,driver:!1},{type:`taxi`,driver:!1},{type:`motorbike`,driver:!1},{type:`police`,driver:!1}],spawnClear:7,spreadCount:26,spreadMix:[`taxi`,`rickshaw`,`motorbike`,`rickshaw`,`taxi`,`bus`,`rickshaw`,`motorbike`,`truck`,`taxi`],spreadSpacing:28,chowkPolice:2,lotEvery:3,lotMix:[`taxi`,`rickshaw`,`taxi`,`motorbike`,`rickshaw`,`taxi`],kerbStep:6,kerbEndMargin:5,junctionClear:15},uS=Du(),dS=Du(),fS=Eu(),pS=[];function mS(e,t){let n=e.player,r=n.walker;r.x=r.px=n.spawnX=t.spawn.x,r.z=r.pz=n.spawnZ=t.spawn.z,r.heading=r.pHeading=t.spawn.heading;let i=_S(t),a=[],o=(n,r,i)=>{let o=r.half-q[n].width/2-.15,s=r.x-Math.cos(r.heading)*o,c=r.z-Math.sin(r.heading)*o;return Math.hypot(s-t.spawn.x,c-t.spawn.z)<lS.spawnClear||!vS(e,n,s,c,r.heading,i)?!1:(a.push({x:s,z:c}),!0)},s=(e,t)=>a.every(n=>Math.hypot(n.x-e.x,n.z-e.z)>=t),c=-1;if(t.parking.forEach((e,n)=>{e.kind===`rickshaw`&&hS(e,t.spawn)<40&&(c<0||hS(e,t.spawn)<hS(t.parking[c],t.spawn))&&(c=n)}),c>=0){let n=t.parking[c];vS(e,`rickshaw`,n.x,n.z,n.heading,!0)&&a.push({x:n.x,z:n.z})}let l=[...i].sort((e,n)=>hS(e,t.spawn)-hS(n,t.spawn)),u=0;for(let e of lS.nearSpawn){for(;u<l.length&&!(s(l[u],5)&&o(e.type,l[u],e.driver));)u++;u++}for(let e of t.chowks.slice(1,1+lS.chowkPolice)){let n=t.streets.intersections[e],r=[...i].sort((e,t)=>hS(e,{x:n.cx,z:n.cz})-hS(t,{x:n.cx,z:n.cz}));for(let e of r)if(s(e,5)&&o(`police`,e,!1))break}let d=0;for(let e=0,t=0;e<i.length&&d<lS.spreadCount;e++,t=(t+37)%i.length){let e=i[t];s(e,lS.spreadSpacing)&&o(lS.spreadMix[d%lS.spreadMix.length],e,!1)&&d++}let f=0;t.parking.forEach((t,n)=>{n!==c&&(t.kind===`truck`?vS(e,`truck`,t.x,t.z,t.heading,!1):t.kind===`rickshaw`?vS(e,`rickshaw`,t.x,t.z,t.heading,!1):n%lS.lotEvery===0&&vS(e,lS.lotMix[f++%lS.lotMix.length],t.x,t.z,t.heading,!1))})}function hS(e,t){return Math.hypot(e.x-t.x,e.z-t.z)}function gS(e,t,n){let r=1/0;for(let i of e.streets.intersections){let e=Math.max(i.minX-t,0,t-i.maxX),a=Math.max(i.minZ-n,0,n-i.maxZ),o=Math.hypot(e,a);o<r&&(r=o)}return r}function _S(e){let t=[],{nodes:n,edges:r}=e.lanes;for(let i of r){if(i.kind!==`lane`||i.lane!==0)continue;let r=e.streets.segments[i.segment];if(r.kind===`lane`||r.cls===`bazaar`)continue;let a=n[i.from],o=n[i.to],s=Math.hypot(o.x-a.x,o.z-a.z);if(s<lS.kerbEndMargin*2+4)continue;let c=(o.x-a.x)/s,l=(o.z-a.z)/s,u=Math.atan2(c,-l);for(let n=lS.kerbEndMargin;n<=s-lS.kerbEndMargin;n+=lS.kerbStep){let r=a.x+c*n,o=a.z+l*n;gS(e,r,o)<lS.junctionClear||t.push({x:r,z:o,heading:u,half:i.width/2})}}return t}function vS(e,t,n,r,i,a){let o=q[t];Ou(uS,n,r,i,o.width/2+.25,o.length/2+.25);let{ex:s,ez:c}=Au(uS),l=e.static.bounds;if(n-s<l.minX||n+s>l.maxX||r-c<l.minZ||r+c>l.maxZ)return!1;pS.length=0,e.static.query(n-s,r-c,n+s,r+c,pS);for(let e of pS)if(Mu(uS,ku(dS,e),fS))return!1;for(let t of e.vehicles)if(Mu(uS,nd(t,dS),fS))return!1;return d_(e,$u(0,t,n,r,i,a?`npc`:`none`)),!0}var yS=class{constructor(e,t=!1){this.t=0,this.frames=0,this.skip=2,this.density=bS(e??Zd.weakStart),this.auto=!t}frame(e){if(!this.auto||(this.t+=e,this.frames++,this.t<Zd.window))return!1;let t=this.frames/this.t;return this.t=0,this.frames=0,this.skip>0?(this.skip--,!1):t>=Zd.lowFps||this.density<=Zd.min?!1:(this.density=bS(this.density-Zd.step),!0)}};function bS(e){return Math.max(Zd.min,Math.min(Zd.max,e))}var xS=new Map;function SS(e,t){xS.set(e,t)}function CS(e){let t=xS.get(e);if(!t||!M.rewardedAvailable())return!1;try{return t.available()}catch{return!1}}async function wS(e){let t=xS.get(e);if(!t||!await M.showRewarded(e))return!1;try{t.grant()}catch(t){return console.warn(`[rewards] grant failed`,e,t),!1}return!0}var TS=class{constructor(e=document.body){this.frames=0,this.elapsed=0,this.fps=0,this.el=document.createElement(`div`),this.el.id=`debug-overlay`,Object.assign(this.el.style,{position:`fixed`,left:`8px`,bottom:`8px`,padding:`6px 8px`,background:`rgba(0,0,0,0.6)`,color:`#fff`,font:`12px/1.4 ui-monospace, monospace`,whiteSpace:`pre`,pointerEvents:`none`,zIndex:`40`,borderRadius:`4px`}),e.appendChild(this.el)}frame(e,t){this.frames++,this.elapsed+=e,!(this.elapsed<.5)&&(this.fps=this.frames/this.elapsed,this.frames=0,this.elapsed=0,this.el.textContent=`${c(`debug.fps`)} ${this.fps.toFixed(0)}\n${c(`debug.calls`)} ${t.calls}\n${c(`debug.tris`)} ${t.triangles}\n${c(`debug.entities`)} ${t.entities}`)}},ES=`rr:`;function DS(e){return!!e&&typeof e==`object`&&typeof e.at==`number`&&`v`in e}function OS(e){try{let t=localStorage.getItem(ES+e);if(t===null)return;let n=JSON.parse(t);return DS(n)?n:void 0}catch{return}}function kS(e,t){try{localStorage.setItem(ES+e,JSON.stringify(t))}catch{}}async function AS(e){let t;try{let n=await M.portal.load(e);DS(n)&&(t=n)}catch{t=void 0}let n=OS(e),r=t&&n?t.at>=n.at?t:n:t??n;return r&&r!==n&&kS(e,r),r?.v}async function jS(e,t){let n={at:Date.now(),v:t};kS(e,n);try{await M.portal.save(e,n)}catch(t){console.warn(`[storage] portal save failed`,e,t)}}function MS(e){let t=e.missions;return{version:2,money:e.player.money,completed:[...t.completed],rep:t.rep,unlocked:[...t.unlocked],stats:{...t.stats}}}function NS(e,t,n=0,r=1e9){return typeof e==`number`&&Number.isFinite(e)?Math.max(n,Math.min(r,Math.round(e))):t}function PS(e){return Array.isArray(e)?e.filter(e=>typeof e==`string`):[]}var FS=new Set(Um.map(e=>e.id)),IS=new Set(qm.vehicles.map(e=>e.type));function LS(e){if(!e||typeof e!=`object`)return null;let t=e,n=typeof t.version==`number`?t.version:1,r={...t};if(n>Jm.version)return null;n<2&&(r={version:2,money:r.money,completed:r.missions,rep:r.rep,unlocked:[],stats:{}},n=2);let i=r.stats&&typeof r.stats==`object`?r.stats:{};return{version:2,money:NS(r.money,yu.startMoney),completed:[...new Set(PS(r.completed).filter(e=>FS.has(e)))],rep:NS(r.rep,0),unlocked:[...new Set(PS(r.unlocked).filter(e=>IS.has(e)))],stats:{fares:NS(i.fares,0),fareMoney:NS(i.fareMoney,0),missionMoney:NS(i.missionMoney,0),failed:NS(i.failed,0)}}}function RS(e,t){let n=e.missions;e.player.money=t.money,n.completed=[...t.completed],n.rep=t.rep,n.unlocked=[...t.unlocked],n.stats={...t.stats}}function $(e,t=``,n=``,r){let i=document.createElement(e);return t&&(i.className=t),n&&(i.textContent=n),r&&r.appendChild(i),i}var zS={click:()=>{}};function BS(e,t,n,r){let i=$(`button`,e,t,r);return i.type=`button`,i.addEventListener(`click`,e=>{e.stopPropagation(),zS.click(),n()}),i}function VS(e,t){e.classList.toggle(`hidden`,!t)}function HS(e){switch(e){case`pause`:return`<svg viewBox="0 0 24 24"><rect x="5" y="4" width="5" height="16" rx="1.5" fill="#2b1d0e"/><rect x="14" y="4" width="5" height="16" rx="1.5" fill="#2b1d0e"/></svg>`;case`map`:return`<svg viewBox="0 0 24 24"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" fill="#13a39a" stroke="#2b1d0e" stroke-width="2" stroke-linejoin="round"/></svg>`;case`star`:return`<svg viewBox="0 0 24 24"><path d="M12 2l3 6.6 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21.2l1.5-7L2 9.4l7-.8z" stroke="#2b1d0e" stroke-width="2" stroke-linejoin="round"/></svg>`;case`arrow`:return`<svg viewBox="0 0 24 24"><path d="M12 2l8 18-8-4-8 4z" fill="#e0457b" stroke="#2b1d0e" stroke-width="2" stroke-linejoin="round"/></svg>`;case`play`:return`<svg viewBox="0 0 24 24" width="18" height="18"><path d="M7 4l13 8-13 8z" fill="#fff" stroke="#2b1d0e" stroke-width="2" stroke-linejoin="round"/></svg>`}}function US(e){return Math.round(e).toString().replace(/\B(?=(\d{3})+(?!\d))/g,`,`)}var WS=class{constructor(e){this.items=[],this.sig=``,this.root=$(`div`,`garage-panel hidden`,``,e),$(`div`,`garage-title`,c(`garage.title`),this.root),this.list=$(`div`,`garage-list`,``,this.root),window.addEventListener(`keydown`,e=>{if(this.root.classList.contains(`hidden`)||e.repeat)return;let t=e.code.startsWith(`Digit`)?Number(e.code.slice(5)):NaN,n=this.items[t-1];n&&n.enabled&&(e.preventDefault(),n.act())})}update(e){if(VS(this.root,!!e),!e)return;this.items=e;let t=e.map(e=>`${e.label}|${e.enabled}`).join(`;`);t!==this.sig&&(this.sig=t,this.list.textContent=``,e.forEach((e,t)=>{let n=BS(`btn garage-item`,``,()=>e.enabled&&e.act(),this.list);n.innerHTML=`<kbd>${t+1}</kbd><span></span>`,n.lastChild.textContent=e.label,n.disabled=!e.enabled}))}};function GS(e){return String(Math.round(e)).replace(/\B(?=(\d{3})+(?!\d))/g,`,`)}function KS(e){let t=Math.ceil(e);return`${Math.floor(t/60)}:${String(t%60).padStart(2,`0`)}`}function qS(e){return c(`model.${e}`)}function JS(e){return c(`mission.${e}`)}async function YS(e,t){let n=LS(await AS(Jm.key));n&&RS(e,n);let r=!1,i=()=>{r=!1,jS(Jm.key,MS(e))};SS(`doubleMoney`,{available:()=>n_(e),grant:()=>{r_(e)&&i()}}),SS(`refundFine`,{available:()=>Bm(e),grant:()=>{Vm(e)&&i()}});let a=t.ui,o=new WS(a.root),s=(e,t)=>{a.toast(e?t:c(`garage.poor`)),e&&i()},l=()=>{let t=[],n=e.player.money,r=rh(e);r>0&&t.push({label:c(`garage.repair`,{price:GS(r)}),enabled:n>=r,act:()=>s(sh(e),c(`garage.repaired`))});let o=ih(e);if(o>0&&t.push({label:c(`garage.heal`,{price:GS(o)}),enabled:n>=o,act:()=>s(ch(e),c(`garage.healed`))}),e.player.vehicleId<0){let r=[...qm.free,...qm.vehicles.map(e=>e.type)];for(let o of r)if(th(e,o))t.push({label:c(`garage.take`,{model:qS(o)}),enabled:!0,act:()=>{oh(e,o)?a.toast(qS(o)):a.toast(c(`garage.noRoom`))}});else{let r=nh(o);t.push({label:c(`garage.buy`,{model:qS(o),price:GS(r)}),enabled:n>=r,act:()=>{if(e.player.money<r)return a.toast(c(`garage.poor`));ah(e,o)?(a.toast(c(`garage.bought`,{model:qS(o)})),i()):a.toast(c(`garage.noRoom`))}})}}return t},u=``,d=()=>{let t=e.missions.objective;if(!t.key){if(a.tip===`job`){let t=Ig(e);if(t)return{text:c(`obj.findJob`),target:t}}return null}let n={...t.vars};for(let[e,r]of Object.entries(t.keys))n[e]=c(r);typeof n.fare==`number`&&(n.fare=GS(n.fare));let r=c(t.key,n);return t.timer>=0&&(r+=`  ${KS(t.timer)}`),t.has?{text:r,target:{x:t.x,z:t.z}}:{text:r}},f=0;return{save:i,handleEvents(e){for(let t of e)switch(t.type){case`missionStarted`:$m(t.id)&&a.toast(`${JS(t.id)}: ${c(`mission.${t.id}.brief`)}`,4);break;case`missionNeedsVehicle`:a.toast(c(`mission.needsVehicle`,{title:JS(t.id)}),3);break;case`missionPassed`:{let e=c(`mission.passedSub`,{title:JS(t.id),money:GS(t.reward),rep:t.rep});t.unlock&&(e+=` ${c(`mission.unlock`,{model:qS(t.unlock)})}`),M.happyTime(),i(),a.showEnd(`passed`,e);break}case`missionFailed`:i(),t.reason===`busted`||t.reason===`wasted`?a.toast(`${c(`end.failed`)}: ${c(`fail.${t.reason}`)}`,3.5):a.showEnd(`failed`,`${JS(t.id)}: ${c(`fail.${t.reason}`)}`);break;case`farePaid`:a.toast(t.tip>0?c(`fare.paid`,{fare:GS(t.fare),tip:GS(t.tip)}):c(`fare.paidNoTip`,{fare:GS(t.fare)}),3),r=!0;break;case`fareLost`:a.toast(c(`fare.lost`));break;case`checkpoint`:t.n<t.total&&a.toast(c(`mission.checkpoint`,{n:t.n,total:t.total}),1.2);break;case`repLevel`:{let e=Object.entries(Wm.district).find(([,e])=>e===t.level),n=e?Dh.find(t=>t.id===e[0])?.name:void 0;a.toast(n?c(`rep.district`,{level:t.level,place:n}):c(`rep.level`,{level:t.level}),4);break}case`respawned`:i()}},frame(t){let n=d(),s=n?`${n.text}|${n.target?`${Math.round(n.target.x)},${Math.round(n.target.z)}`:``}`:``;s!==u&&(u=s,a.setObjective(n)),o.update(a.mode===`play`&&eh(e)?l():null),a.mode===`play`&&(f+=t,(f>=Jm.autosaveEvery||r&&f>=10)&&(f=0,i()))}}}var XS=class{constructor(){this.ctx=null,this.soundVol=.8,this.musicVol=.6,this.muted=!1,this.suspended=!1}unlock(){try{if(!this.ctx){let e=window.AudioContext??window.webkitAudioContext;if(!e)return;let t=new e;this.ctx=t,this.master=t.createGain(),this.master.connect(t.destination),this.sound=t.createGain(),this.music=t.createGain(),this.sound.connect(this.master),this.music.connect(this.master),this.noise=t.createBuffer(1,t.sampleRate*2,t.sampleRate);let n=this.noise.getChannelData(0);for(let e=0;e<n.length;e++)n[e]=Math.random()*2-1;this.applyGains(!0)}this.ctx.state===`suspended`&&!this.suspended&&this.ctx.resume().catch(()=>{})}catch(e){console.warn(`[audio] no WebAudio`,e),this.ctx=null}}get ready(){return!!this.ctx}get silent(){return this.muted||this.suspended||!this.ctx||this.ctx.state!==`running`}setVolumes(e,t){this.soundVol=e,this.musicVol=t,this.applyGains()}setMuted(e){this.muted=e,this.applyGains()}setSuspended(e){this.suspended=e;let t=this.ctx;t&&(this.applyGains(!0),e?t.suspend().catch(()=>{}):t.resume().catch(()=>{}))}applyGains(e=!1){let t=this.ctx;if(!t)return;let n=this.muted||this.suspended,r=(n,r)=>{e?n.gain.value=r:n.gain.setTargetAtTime(r,t.currentTime,.05)};r(this.master,+!n),r(this.sound,this.soundVol*this.soundVol),r(this.music,this.musicVol*this.musicVol)}get soundBus(){return this.ctx?this.sound:null}get musicBus(){return this.ctx?this.music:null}tone(e,t,n,r=`sine`,i=e,a=0,o=this.soundBus){let s=this.ctx;if(!s||!o||n<=.001)return;let c=s.currentTime+a,l=s.createOscillator(),u=s.createGain();l.type=r,l.frequency.setValueAtTime(e,c),i!==e&&l.frequency.exponentialRampToValueAtTime(Math.max(20,i),c+t),u.gain.setValueAtTime(1e-4,c),u.gain.exponentialRampToValueAtTime(n,c+Math.min(.012,t/4)),u.gain.exponentialRampToValueAtTime(1e-4,c+t),l.connect(u).connect(o),l.start(c),l.stop(c+t+.02)}burst(e,t,n,r,i=r,a=.8,o=0,s=this.soundBus){let c=this.ctx;if(!c||!s||t<=.001)return;let l=c.currentTime+o,u=c.createBufferSource();u.buffer=this.noise,u.loop=!0;let d=c.createBiquadFilter();d.type=n,d.Q.value=a,d.frequency.setValueAtTime(r,l),i!==r&&d.frequency.exponentialRampToValueAtTime(Math.max(30,i),l+e);let f=c.createGain();f.gain.setValueAtTime(1e-4,l),f.gain.exponentialRampToValueAtTime(t,l+.01),f.gain.exponentialRampToValueAtTime(1e-4,l+e),u.connect(d).connect(f).connect(s),u.start(l,Math.random()*1.5),u.stop(l+e+.02)}noiseLoop(){let e=this.ctx;if(!e)return null;let t=e.createBufferSource();return t.buffer=this.noise,t.loop=!0,t}click(){this.tone(1300,.05,.18,`triangle`,900)}money(){this.tone(1047,.12,.22,`triangle`),this.tone(1568,.22,.22,`triangle`,1568,.07)}crash(e,t){let n=t*(.25+.75*e);this.burst(.18+e*.35,n*.9,`lowpass`,600+e*2600,200,.7),this.tone(110,.25,n*.8,`sine`,40),e>.45&&this.burst(.5,n*.25,`highpass`,3500,5e3,1.5,.03)}explosion(e){this.burst(1.6,e,`lowpass`,2400,120,.6),this.tone(70,1.1,e,`sine`,25),this.burst(.25,e*.6,`bandpass`,900,300,1,.02)}punch(e){this.burst(.09,e*.7,`bandpass`,450,200,1.2),this.tone(160,.1,e*.5,`sine`,70)}door(e){this.burst(.06,e*.5,`bandpass`,1200,600,2),this.tone(220,.08,e*.3,`square`,120,.02)}spray(e){this.burst(1.2,e*.4,`highpass`,4e3,3e3,.5)}alert(e){this.tone(880,.12,e*.25,`square`,1320),this.tone(880,.12,e*.25,`square`,1320,.16)}sting(){this.tone(392,.35,.25,`triangle`,370),this.tone(330,.35,.25,`triangle`,311,.3),this.tone(262,.8,.28,`triangle`,196,.6)}honk(e,t,n,r=this.soundBus,i=0){for(let[a,o,s]of ZS[e])e===`bulb`?this.tone(a*1.08,t,n*s,o,a*.92,i,r):this.tone(a,t,n*s,o,a,i,r)}},ZS={bulb:[[460,`square`,.22],[690,`sawtooth`,.1]],car:[[415,`square`,.18],[523,`square`,.16]],bike:[[620,`square`,.2]],air:[[196,`sawtooth`,.22],[247,`sawtooth`,.2],[294,`sawtooth`,.12]]},QS={rickshaw:`bulb`,taxi:`car`,police:`car`,motorbike:`bike`,bus:`air`,truck:`air`},$S={rickshaw:{idle:30,top:74,wave:`sawtooth`,cutoff:380,chug:.75,gain:.32},taxi:{idle:42,top:150,wave:`sawtooth`,cutoff:700,chug:.15,gain:.22},police:{idle:46,top:165,wave:`sawtooth`,cutoff:800,chug:.12,gain:.22},motorbike:{idle:55,top:230,wave:`sawtooth`,cutoff:1400,chug:.45,gain:.2},bus:{idle:26,top:72,wave:`sawtooth`,cutoff:320,chug:.3,gain:.34},truck:{idle:24,top:66,wave:`sawtooth`,cutoff:300,chug:.35,gain:.36}},eC=90,tC=class{constructor(){this.synth=new XS,this.engine=null,this.horn=null,this.siren=null,this.ambience=null,this.lastMoney=null,this.lastStars=0,this.lx=0,this.lz=0}unlock(){this.synth.unlock(),this.synth.ready&&!this.engine&&(this.engine=new nC(this.synth),this.horn=new rC(this.synth),this.siren=new iC(this.synth),this.ambience=new aC(this.synth))}falloff(e,t){let n=Math.hypot(e-this.lx,t-this.lz);return n>=eC?0:1/(1+n/12)*(1-n/eC)}handleEvents(e,t){if(!this.synth.ready)return;let n=this.synth,r=e.player.vehicleId;for(let i of t){let t=i.type;switch(i.type){case`horn`:{if(i.vehicle===r)break;let t=Cd(e,i.vehicle);t&&n.honk(QS[t.type]??`car`,.22+Math.random()*.2,.9*this.falloff(t.x,t.z));break}case`crash`:i.impact>1.5&&n.crash(Math.min(1,i.impact/18),this.falloff(i.x,i.z));break;case`explode`:n.explosion(Math.max(.25,this.falloff(i.x,i.z)));break;case`pedHit`:n.punch(.8);break;case`punch`:n.punch(i.hit<0?.25:.8);break;case`enter`:case`exit`:n.door(.8);break;default:t===`wasted`||t===`busted`?n.sting():t===`paintShop`&&n.spray(.9)}}}quiet(){this.engine?.set(null),this.horn?.set(null),this.siren?.set(0)}update(e,t){let n=Cd(e,e.player.vehicleId),r=n??e.player.walker;if(this.lx=r.x,this.lz=r.z,!this.synth.ready)return;this.engine?.set(n&&n.stage!==`wreck`?n:null),this.horn?.set(n&&n.horn?QS[n.type]:null);let i=0;for(let t of e.vehicles)t.siren===!0&&(i=Math.max(i,t===n?.5:this.falloff(t.x,t.z)*1.6));this.siren?.set(Math.min(1,i)),this.ambience?.update(t);let a=e,o=typeof a.player.money==`number`?a.player.money:null;o!==null&&this.lastMoney!==null&&o>this.lastMoney&&this.synth.money(),this.lastMoney=o;let s=typeof a.wanted?.stars==`number`?a.wanted.stars:0;s>this.lastStars&&this.synth.alert(1),this.lastStars=s}},nC=class{constructor(e){this.type=null;let t=e.ctx;this.ctx=t,this.osc=t.createOscillator(),this.sub=t.createOscillator(),this.sub.type=`sine`,this.lfo=t.createOscillator(),this.lfo.type=`square`,this.lfoDepth=t.createGain(),this.am=t.createGain(),this.filter=t.createBiquadFilter(),this.filter.type=`lowpass`,this.filter.Q.value=2,this.out=t.createGain(),this.out.gain.value=0;let n=t.createGain();n.gain.value=.6,this.osc.connect(this.filter),this.sub.connect(n).connect(this.filter),this.filter.connect(this.am).connect(this.out).connect(e.soundBus),this.lfo.connect(this.lfoDepth).connect(this.am.gain),this.osc.start(),this.sub.start(),this.lfo.start()}set(e){let t=this.ctx.currentTime;if(!e){this.out.gain.setTargetAtTime(0,t,.08),this.type=null;return}let n=$S[e.type]??$S.taxi;this.type!==e.type&&(this.type=e.type,this.osc.type=n.wave,this.am.gain.value=1-n.chug/2,this.lfoDepth.gain.value=n.chug/2);let r=Math.min(1,ed(e)/Math.max(1,q[e.type].maxSpeed)),i=Math.max(e.inThrottle,e.inBrake*.5),a=n.idle+(n.top-n.idle)*Math.min(1,r*.9+i*.15);this.osc.frequency.setTargetAtTime(a,t,.06),this.sub.frequency.setTargetAtTime(a/2,t,.06),this.lfo.frequency.setTargetAtTime(a/2,t,.06),this.filter.frequency.setTargetAtTime(n.cutoff*(1+r*2+i*.8),t,.08),this.out.gain.setTargetAtTime(n.gain*(.55+.3*i+.25*r),t,.08)}},rC=class{constructor(e){this.kind=null,this.nodes=[],this.out=null,this.s=e}set(e){if(e===this.kind||(this.stop(),this.kind=e,!e))return;let t=this.s.ctx,n=t.currentTime,r=t.createGain();r.gain.setValueAtTime(1e-4,n),r.gain.exponentialRampToValueAtTime(1,n+.015);let i=t.createBiquadFilter();i.type=`bandpass`,i.frequency.value=e===`air`?700:1400,i.Q.value=.6,r.connect(i).connect(this.s.soundBus);for(let[i,a,o]of ZS[e]){let s=t.createOscillator();s.type=a,e===`bulb`?(s.frequency.setValueAtTime(i*1.1,n),s.frequency.exponentialRampToValueAtTime(i*.94,n+.18)):s.frequency.value=i;let c=t.createGain();c.gain.value=o*2.2,s.connect(c).connect(r),s.start(n),this.nodes.push(s)}this.out=r}stop(){let e=this.s.ctx;if(!e||!this.out)return;let t=e.currentTime;this.out.gain.cancelScheduledValues(t),this.out.gain.setTargetAtTime(1e-4,t,.02);for(let e of this.nodes)e.stop(t+.12);this.nodes=[],this.out=null}},iC=class{constructor(e){let t=e.ctx;this.ctx=t;let n=t.createOscillator();n.type=`sawtooth`,n.frequency.value=950;let r=t.createOscillator();r.type=`triangle`,r.frequency.value=.55;let i=t.createGain();i.gain.value=330,r.connect(i).connect(n.frequency);let a=t.createBiquadFilter();a.type=`bandpass`,a.frequency.value=1100,a.Q.value=.7,this.out=t.createGain(),this.out.gain.value=0,n.connect(a).connect(this.out).connect(e.soundBus),n.start(),r.start()}set(e){this.out.gain.setTargetAtTime(e*.12,this.ctx.currentTime,.2)}},aC=class{constructor(e){this.nextHonk=2,this.s=e;let t=e.ctx,n=e.musicBus,r=e.noiseLoop(),i=t.createBiquadFilter();i.type=`bandpass`,i.frequency.value=380,i.Q.value=.9;let a=t.createGain();a.gain.value=.16;let o=t.createOscillator();o.frequency.value=.13;let s=t.createGain();s.gain.value=.05,o.connect(s).connect(a.gain),r.connect(i).connect(a).connect(n);let c=e.noiseLoop(),l=t.createBiquadFilter();l.type=`bandpass`,l.frequency.value=1700,l.Q.value=.4;let u=t.createGain();u.gain.value=.025,c.connect(l).connect(u).connect(n),r.start(0,.3),c.start(0,1.1),o.start(),this.far=t.createBiquadFilter(),this.far.type=`lowpass`,this.far.frequency.value=1300,this.far.connect(n)}update(e){if(this.nextHonk-=e,this.nextHonk>0)return;this.nextHonk=1.2+Math.random()*4;let t=[`bulb`,`bulb`,`car`,`bike`,`air`],n=t[Math.random()*t.length|0],r=.18+Math.random()*.25,i=Math.random()<.4?2:1;for(let e=0;e<i;e++)this.s.honk(n,.15+Math.random()*.2,r,this.far,e*.28)}};function oC(){try{return matchMedia(`(pointer: coarse)`).matches}catch{return!1}}var sC={touch:ee.touch??(oC()&&(navigator.maxTouchPoints??0)>0),phone:oC()&&Math.min(screen.width,screen.height)<820},cC=[`low`,`medium`,`high`];function lC(e){let t=window.devicePixelRatio||1;return e===`low`?Math.min(t,1)*.85:e===`medium`?Math.min(t,1.25):Math.min(t,2)}var uC=class{constructor(e){this.level=`high`,this.setting=`auto`,this.autoLevel=sC.phone?`low`:`high`,this.slowT=0,this.frames=0,this.time=0,this.apply=e}set(e){this.setting=e,this.update()}update(){let e=this.setting===`auto`?this.autoLevel:this.setting;this.level=e,this.apply(lC(e),e)}frame(e){if(this.setting!==`auto`||this.autoLevel===`low`||(this.frames++,this.time+=e,this.time<.5))return;let t=this.frames/this.time;this.frames=0,this.time=0,this.slowT=t<45?this.slowT+.5:0,this.slowT>=3&&(this.slowT=0,this.autoLevel=cC[Math.max(0,cC.indexOf(this.autoLevel)-1)],this.update())}},dC=7040886,fC=9077880,pC=E_.plaza,mC=13218954,hC=14469536,gC=12159838,_C=8220512,vC=15895580;function yC(e,t=1){let n=e.plan.raster,{minX:r,minZ:i,maxX:a,maxZ:o}=cy,s=Math.ceil((a-r)*t),c=Math.ceil((o-i)*t),l=new Uint8ClampedArray(s*c*4),u=new Set;for(let t of e.streets.segments)if(t.kind===`lane`)for(let e of t.pts)n.at(e[0],e[1])>=0&&u.add(Math.floor(e[0]/4)*1e3+Math.floor(e[1]/4));for(let e=0;e<c;e++)for(let a=0;a<s;a++){let o=r+(a+.5)/t,c=i+(e+.5)/t,d=n.at(o,c),f=hC;if(d>=0){let e=n.road[d],t=n.occ[d];e===1?f=u.has(Math.floor(o/4)*1e3+Math.floor(c/4))?fC:dC:n.water[d]?f=E_.water:n.wall[d]?f=E_.wall:n.rail[d]?f=_C:e===3?f=pC:e===2?f=mC:t===Uv.Building?f=gC:t===Uv.Green&&(f=E_.park)}let p=(e*s+a)*4;l[p]=f>>16&255,l[p+1]=f>>8&255,l[p+2]=f&255,l[p+3]=255}let d=(e,n,a,o,u)=>{let d=Math.max(0,Math.round((e-r)*t)),f=Math.min(s,Math.max(d+1,Math.round((a-r)*t))),p=Math.max(0,Math.round((n-i)*t)),m=Math.min(c,Math.max(p+1,Math.round((o-i)*t)));for(let e=p;e<m;e++)for(let t=d;t<f;t++){let n=(e*s+t)*4;l[n]=u>>16&255,l[n+1]=u>>8&255,l[n+2]=u&255}};for(let t of e.plan.landmarks)if(t.kind!==`maidan`&&t.kind!==`dhobiGhat`)for(let e of t.parts){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let a of e.poly)t=Math.min(t,a[0]),n=Math.min(n,a[1]),r=Math.max(r,a[0]),i=Math.max(i,a[1]);d(t,n,r,i,vC)}for(let t of e.roundabouts){let e=t.island*.7;d(t.x-e,t.z-e,t.x+e,t.z+e,E_.island)}return{width:s,height:c,data:l,pxPerMetre:t,minX:r,minZ:i}}function bC(e,t=1){let n=yC(e,t),r=document.createElement(`canvas`);return r.width=n.width,r.height=n.height,r.getContext(`2d`).putImageData(new ImageData(new Uint8ClampedArray(n.data),n.width,n.height),0,0),{canvas:r,image:n,toPixel:(e,t)=>({px:(e-n.minX)*n.pxPerMetre,py:(t-n.minZ)*n.pxPerMetre})}}var xC=`#d8c49a`;function SC(e){return Cd(e,e.player.vehicleId)??e.player.walker}function CC(e,t,n,r,i){e.save(),e.translate(t,n),e.rotate(r),e.beginPath(),e.moveTo(0,-i),e.lineTo(i*.75,i*.8),e.lineTo(0,i*.4),e.lineTo(-i*.75,i*.8),e.closePath(),e.fillStyle=`#fff`,e.lineWidth=Math.max(2,i*.22),e.strokeStyle=`#2b1d0e`,e.stroke(),e.fill(),e.restore()}function wC(e,t,n,r){e.beginPath(),e.arc(t,n,r,0,Math.PI*2),e.fillStyle=`#f6b324`,e.fill(),e.lineWidth=Math.max(2,r*.35),e.strokeStyle=`#2b1d0e`,e.stroke()}var TC={job:`#e0457b`,garage:`#13a39a`,locked:`#8d8478`},EC=[];function DC(e,t,n,r,i){e.beginPath(),t.kind===`garage`?e.rect(n-i,r-i,i*2,i*2):(e.moveTo(n,r-i*1.25),e.lineTo(n+i*1.05,r),e.lineTo(n,r+i*1.25),e.lineTo(n-i*1.05,r),e.closePath()),e.fillStyle=TC[t.kind],e.fill(),e.lineWidth=Math.max(1.5,i*.3),e.strokeStyle=`#2b1d0e`,e.stroke()}function OC(e,t,n,r,i,a){for(let o of Fg(t,EC)){if(o.kind===`locked`&&!i)continue;let[t,s]=n(o.x,o.z);a>0&&(t<-r||s<-r||t>a+r||s>a+r)||DC(e,o,t,s,r)}}function kC(e){return e.type===`police`||e.siren===!0}function AC(e,t,n,r,i,a,o){let s=SC(r),c=t/(2*a),l=n.toPixel(s.x,s.z),u=n.pxPerMetre;e.save(),e.clearRect(0,0,t,t),e.beginPath(),e.arc(t/2,t/2,t/2,0,Math.PI*2),e.clip(),e.fillStyle=xC,e.fillRect(0,0,t,t),e.imageSmoothingEnabled=!1,e.drawImage(n.canvas,l.px-a*u,l.py-a*u,2*a*u,2*a*u,0,0,t,t);let d=(e,n)=>[t/2+(e-s.x)*c,t/2+(n-s.z)*c];for(let n of r.vehicles){if(!kC(n)||n.id===r.player.vehicleId)continue;let[i,a]=d(n.x,n.z);if(i<-4||a<-4||i>t+4||a>t+4)continue;let s=n.siren===!0;e.beginPath(),e.arc(i,a,t*.03,0,Math.PI*2),e.fillStyle=s&&o?`#e53935`:`#3d8bfd`,e.fill()}if(OC(e,r,d,t*.04,!1,t),i?.target){let[n,r]=d(i.target.x,i.target.z),a=n-t/2,o=r-t/2,s=Math.hypot(a,o),c=t/2-t*.07;s>c&&(n=t/2+a/s*c,r=t/2+o/s*c),wC(e,n,r,t*.045)}CC(e,t/2,t/2,s.heading,t*.075),e.restore()}function jC(e,t,n,r,i,a){let o=SC(i);e.fillStyle=xC,e.fillRect(0,0,t,n);let s=Math.min(t/r.canvas.width,n/r.canvas.height),c=(t-r.canvas.width*s)/2,l=(n-r.canvas.height*s)/2;e.imageSmoothingEnabled=s<1,e.drawImage(r.canvas,c,l,r.canvas.width*s,r.canvas.height*s);let u=(e,t)=>{let n=r.toPixel(e,t);return[c+n.px*s,l+n.py*s]};if(OC(e,i,u,Math.max(6,t*.011),!0,0),a?.target){let[n,r]=u(a.target.x,a.target.z);wC(e,n,r,Math.max(7,t*.014))}let[d,f]=u(o.x,o.z);CC(e,d,f,o.heading,Math.max(10,t*.02))}var MC=Du();function NC(e){let t=e.player;if(t.downT>0)return`none`;let n=Cd(e,t.vehicleId);if(n)return ed(n)<=r.exitMaxSpeed?`getOut`:`none`;let i=t.walker,a=null,o=r.enterReach;for(let t of e.vehicles){if(t.stage===`wreck`||t.driver===`player`||ed(t)>r.enterMaxSpeed||Math.abs(t.x-i.x)>8||Math.abs(t.z-i.z)>8)continue;let e=Pu(i.x,i.z,nd(t,MC));e<=o&&(o=e,a=t)}return a?a.driver===`npc`?`takeOver`:`getIn`:`none`}var PC=class{constructor(e,t,n,r,i){this.starEls=[],this.shown={money:NaN,health:NaN,veh:NaN,stars:-1,flash:!1,speed:-1,hint:``,obj:``,bust:-1},this.objectiveView=null,this.shownMoney=0,this.mapT=0,this.src=t,this.touch=n,this.root=$(`div`,`hud`,``,e);let a=$(`div`,`hud-left`,``,this.root);this.money=$(`div`,`money`,``,a),this.health=$(`div`,`bar`,``,a),$(`i`,``,``,this.health),this.vehBar=$(`div`,`bar veh`,``,a),$(`i`,``,``,this.vehBar),this.stars=$(`div`,`stars`,``,a);for(let e=0;e<4;e++){let e=$(`span`,`off`,``,this.stars);e.innerHTML=HS(`star`),this.starEls.push(e)}this.bust=$(`div`,`bar bust`,``,a),$(`i`,``,``,this.bust),$(`span`,``,c(`hud.bust`),this.bust),VS(this.bust,!1);let o=$(`div`,`hud-right`,``,this.root),s=$(`div`,`map-wrap`,``,o);this.mapCanvas=$(`canvas`,`minimap`,``,s),this.mapCtx=this.mapCanvas.getContext(`2d`),$(`span`,`map-n`,`N`,s),s.addEventListener(`click`,i);let l=BS(`icon-btn pause-btn`,``,r,o);l.innerHTML=HS(`pause`),l.setAttribute(`aria-label`,c(`hud.pause`)),this.speed=$(`div`,`speed`,``,this.root),this.speedNum=$(`b`,``,`0`,this.speed),$(`span`,``,c(`hud.speed`),this.speed),VS(this.speed,!1),this.top=$(`div`,`top-center`,``,this.root),this.objective=$(`div`,`objective`,``,this.top),this.objArrow=$(`span`,`arrow`,``,this.objective),this.objArrow.innerHTML=HS(`arrow`),this.objText=$(`span`,``,``,this.objective),this.objDist=$(`span`,`dist`,``,this.objective),VS(this.objective,!1),this.hint=$(`div`,`hint`,``,this.root),VS(this.hint,!1)}setObjective(e){this.objectiveView=e}get objectiveNow(){return this.objectiveView}frame(e,t,n){let r=e,i=this.shown,a=typeof r.player.money==`number`?r.player.money:0,o=a-this.shownMoney;this.shownMoney=Math.abs(o)<1?a:this.shownMoney+o*Math.min(1,t*8);let s=Math.round(this.shownMoney);s!==i.money&&(i.money=s,this.money.innerHTML=`<span class="cur">₹</span>${US(s)}`);let l=e.player.walker,u=Math.max(0,Math.min(1,l.health/Math.max(1,l.maxHealth)));Math.abs(u-i.health)>.004&&(i.health=u,this.health.firstChild.style.transform=`scaleX(${u})`,this.health.classList.toggle(`low`,u<.3));let d=Cd(e,e.player.vehicleId),f=d?Math.max(0,Math.min(1,d.health/q[d.type].health)):-1;Math.abs(f-i.veh)>.004&&(i.veh=f,VS(this.vehBar,f>=0),f>=0&&(this.vehBar.firstChild.style.transform=`scaleX(${f})`,this.vehBar.classList.toggle(`low`,f<.3)));let p=Math.max(0,Math.min(4,Math.round(typeof r.wanted?.stars==`number`?r.wanted.stars:0))),m=p>0&&r.wanted?.seen===!1;(p!==i.stars||m!==i.flash)&&(i.stars=p,i.flash=m,VS(this.stars,p>0),this.starEls.forEach((e,t)=>e.className=t<p?`on`:`off`),this.stars.classList.toggle(`flash`,m));let h=Math.round(Math.max(0,Math.min(1,r.wanted?.bust??0))*50)/50;h!==i.bust&&(i.bust=h,VS(this.bust,h>0),this.bust.firstChild.style.transform=`scaleX(${h})`);let g=d?Math.round(ed(d)*3.6):-1;g!==i.speed&&(i.speed=g,VS(this.speed,g>=0),g>=0&&(this.speedNum.textContent=String(g)));let _=n===`none`?``:c(n===`getIn`?`hint.getIn`:n===`takeOver`?`hint.takeOver`:`hint.getOut`,{key:`E`}),v=n===`getOut`&&d&&ed(d)>.5?``:_;v!==i.hint&&(i.hint=v,this.hint.textContent=v,VS(this.hint,!!v&&!this.touch)),this.updateObjective(e),this.mapT-=t,this.mapT<=0&&(this.mapT=1/30,this.drawMap(e,d))}updateObjective(e){let t=this.objectiveView,n=t?.text??``;if(n!==this.shown.obj&&(this.shown.obj=n,this.objText.textContent=n,VS(this.objective,!!n)),!t||(VS(this.objArrow,!!t.target),VS(this.objDist,!!t.target),!t.target))return;let r=SC(e),i=t.target.x-r.x,a=t.target.z-r.z;this.objArrow.style.transform=`rotate(${Math.atan2(i,-a)}rad)`,this.objDist.textContent=c(`hud.distance`,{m:Math.round(Math.hypot(i,a))})}drawMap(e,t){let n=this.mapCanvas.clientWidth;if(!n)return;let r=Math.round(n*Math.min(2,window.devicePixelRatio||1));this.mapCanvas.width!==r&&(this.mapCanvas.width=r,this.mapCanvas.height=r);let i=t?90+Math.min(70,ed(t)*2.5):70;AC(this.mapCtx,r,this.src,e,this.objectiveView,i,Math.floor(e.time*3)%2==0)}},FC=class{constructor(e,t){this.root=$(`div`,`screen start`,``,e);let n=$(`div`,`logo`,``,this.root);n.innerHTML=`RICKSHAW<small>RUSH</small>`,$(`div`,`tagline`,c(`title.tagline`),this.root),BS(`big-btn`,c(`title.play`),t,this.root),this.root.addEventListener(`click`,t)}},IC=class{constructor(e,t,n,r){this.qualityBtns=new Map,this.h=r,this.settings=t,this.root=$(`div`,`screen dim`,``,e);let i=$(`div`,`panel`,``,this.root);this.title=$(`h2`,``,c(`pause.title`),i);let a=$(`div`,`body`,``,i);BS(`btn primary`,c(`pause.resume`),()=>r.resume(),a),BS(`btn`,c(`pause.map`),()=>r.map(),a),BS(`btn`,c(`pause.settings`),()=>this.view(`settings`),a),BS(`btn`,c(`pause.controls`),()=>this.view(`controls`),a),this.helpTitle=$(`div`,`note`,c(`pause.help`),a),this.help=$(`div`,`body`,``,a),this.help.style.flex=`none`;let o=$(`div`,`body`,``,i);this.slider(o,`settings.sound`,t.sound,e=>t.sound=e),this.slider(o,`settings.music`,t.music,e=>t.music=e);let s=$(`div`,`row`,``,o);$(`span`,``,c(`settings.quality`),s);let l=$(`div`,`seg`,``,s);for(let e of[`auto`,`low`,`medium`,`high`]){let n=BS(``,c(`quality.${e}`),()=>{t.quality=e,this.markQuality(),r.settings(t)},l);this.qualityBtns.set(e,n)}this.markQuality(),$(`div`,``,``,o).style.flex=`1`,BS(`btn`,c(`pause.back`),()=>this.view(`main`),o);let u=$(`div`,`body`,``,i),d=$(`div`,`keys`,``,u),f=(e,t)=>{$(`kbd`,``,e,d),$(`span`,``,c(t),d)};f(c(`controls.moveKeys`),`controls.move`),f(`E`,`controls.use`),f(`F`,`controls.punch`),f(`Space`,`controls.handbrake`),f(`H`,`controls.horn`),f(`M`,`controls.map`),f(`Esc / P`,`controls.pause`);let p=$(`div`,`note`,c(`controls.touch`),u);n&&u.insertBefore(p,d),$(`div`,``,``,u).style.flex=`1`,BS(`btn`,c(`pause.back`),()=>this.view(`main`),u),this.views={main:a,settings:o,controls:u},this.view(`main`)}slider(e,t,n,r){let i=$(`label`,`row`,``,e);$(`span`,``,c(t),i);let a=$(`input`,``,``,i);a.type=`range`,a.min=`0`,a.max=`100`,a.value=String(Math.round(n*100)),a.addEventListener(`input`,()=>{r(Number(a.value)/100),this.h.settings(this.settings)})}markQuality(){for(let[e,t]of this.qualityBtns)t.classList.toggle(`on`,e===this.settings.quality)}view(e){for(let[t,n]of Object.entries(this.views))VS(n,t===e);this.title.textContent=c(e===`main`?`pause.title`:e===`settings`?`pause.settings`:`pause.controls`)}open(){this.view(`main`),this.help.textContent=``;let e=this.h.offers();VS(this.helpTitle,e.length>0);for(let t of e){let e=BS(`btn reward`,``,()=>this.h.reward(t.reason),this.help);e.innerHTML=`${HS(`play`)}<span>${c(t.label)}</span><span class="ad">${c(`reward.ad`)}</span>`}}back(){return!this.views.main.classList.contains(`hidden`)||(this.view(`main`),!1)}},LC=class{constructor(e,t,n){this.src=t,this.root=$(`div`,`screen map-screen`,``,e),this.canvas=$(`canvas`,``,``,this.root),this.ctx=this.canvas.getContext(`2d`);let r=$(`div`,`legend`,``,this.root);r.innerHTML=`<span><i style="background:#fff"></i>${c(`map.you`)}</span><span><i style="background:#f6b324"></i>${c(`map.objective`)}</span><span><i style="background:#e0457b"></i>${c(`map.job`)}</span><span><i style="background:#13a39a"></i>${c(`map.garage`)}</span>`,BS(`btn primary`,c(`map.close`),n,r),this.root.addEventListener(`click`,n)}draw(e,t){let n=this.root.getBoundingClientRect(),r=Math.max(100,Math.min(n.width-32,n.height-100)),i=Math.round(r*Math.min(2,window.devicePixelRatio||1));this.canvas.width=i,this.canvas.height=i,this.canvas.style.width=`${r}px`,this.canvas.style.height=`${r}px`,jC(this.ctx,i,i,this.src,e,t)}},RC=class{constructor(e){this.root=$(`div`,`screen end`,``,e),this.h1=$(`h1`,``,``,this.root),this.sub=$(`p`,``,``,this.root),this.btns=$(`div`,`btns`,``,this.root)}open(e,t,n,r,i){this.root.classList.toggle(`busted`,e===`busted`),this.root.classList.toggle(`passed`,e===`passed`),this.root.classList.toggle(`failed`,e===`failed`);let a={wasted:`end.wasted`,busted:`end.busted`,passed:`end.passed`,failed:`end.failed`},o={wasted:`end.wastedSub`,busted:`end.bustedSub`,passed:`end.passedSub`,failed:`end.failedSub`};this.h1.textContent=c(a[e]),this.sub.textContent=i??c(o[e]),this.btns.textContent=``;for(let e of t){let t=BS(`btn reward`,``,()=>n(e.reason),this.btns);t.innerHTML=`${HS(`play`)}<span>${c(e.label)}</span><span class="ad">${c(`reward.ad`)}</span>`}BS(`btn primary`,c(`end.continue`),r,this.btns)}},zC={getIn:[`tip.getIn`,`tip.getInTouch`],drive:[`tip.drive`,`tip.driveTouch`],job:[`tip.job`,`tip.jobTouch`]},BC=class{constructor(e,t,n,r){this.current=null,this.time=0,this.driven=0,this.box=$(`div`,`tip`,``,e),VS(this.box,!1),this.seen=new Set(t),this.touch=n,this.onSeen=r}get showing(){return this.current}start(e){if(this.seen.has(e))return;this.current=e,this.time=0;let[t,n]=zC[e];this.box.textContent=c(this.touch?n:t,{key:`M`}),VS(this.box,!0)}finish(e){this.current&&(this.seen.add(this.current),this.onSeen([...this.seen])),this.current=null,VS(this.box,!1),e&&this.start(e)}begin(e){e.player.vehicleId>=0?this.start(`drive`):this.start(`getIn`)}frame(e,t){let n=Cd(e,e.player.vehicleId);if(!this.current){n&&!this.seen.has(`drive`)&&this.seen.has(`getIn`)&&this.start(`drive`);return}switch(this.time+=t,this.current){case`getIn`:n&&this.finish(`drive`);break;case`drive`:n&&(this.driven+=ed(n)*t),(this.driven>60||this.time>9)&&this.finish(`job`);break;case`job`:(this.time>7||e.missions.active||e.missions.fare.phase!==`idle`)&&this.finish(null)}}},VC=56,HC=class{constructor(e,t){this.stickId=null,this.cx=0,this.cy=0,this.gas=0,this.brake=0,this.mode=``,this.useShown=``,this.sink=t,this.root=$(`div`,`touch foot`,``,e),this.zone=$(`div`,`stick-zone`,``,this.root),this.base=$(`div`,`stick-base`,``,this.zone),this.knob=$(`div`,`stick-knob`,``,this.base),this.layout(),this.zone.addEventListener(`pointerdown`,e=>this.stickDown(e)),this.zone.addEventListener(`pointermove`,e=>this.stickMove(e));let n=e=>this.stickUp(e);this.zone.addEventListener(`pointerup`,n),this.zone.addEventListener(`pointercancel`,n),this.zone.addEventListener(`lostpointercapture`,n);let r=$(`div`,`pad`,``,this.root);this.hold(r,`gas`,c(`touch.gas`),e=>{this.gas=+!!e,this.sink.setPedals(this.gas,this.brake)}),this.hold(r,`brake`,c(`touch.brake`),e=>{this.brake=+!!e,this.sink.setPedals(this.gas,this.brake)}),this.hold(r,`drift`,c(`touch.drift`),e=>this.sink.setButton(`handbrake`,e)),this.hold(r,`horn`,c(`touch.horn`),e=>this.sink.setButton(`horn`,e)),this.hold(r,`punch`,c(`touch.punch`),e=>this.sink.setButton(`action`,e)),this.use=this.hold(r,`use`,c(`touch.in`),e=>this.sink.setButton(`use`,e)),window.addEventListener(`resize`,()=>this.layout())}hold(e,t,n,r){let i=$(`button`,`tbtn ${t}`,n,e);i.type=`button`;let a=null;i.addEventListener(`pointerdown`,e=>{if(e.preventDefault(),a===null){a=e.pointerId;try{i.setPointerCapture(e.pointerId)}catch{}i.classList.add(`down`),r(!0)}});let o=e=>{e.pointerId===a&&(a=null,i.classList.remove(`down`),r(!1))};return i.addEventListener(`pointerup`,o),i.addEventListener(`pointercancel`,o),i.addEventListener(`lostpointercapture`,o),i.addEventListener(`contextmenu`,e=>e.preventDefault()),i}layout(){if(this.stickId!==null)return;let e=this.zone.getBoundingClientRect(),t=Math.min(130,e.width*.4),n=e.height-Math.min(130,e.height*.4);this.base.style.left=`${t}px`,this.base.style.top=`${n}px`,this.knob.style.transform=``,this.base.style.opacity=`0.55`}stickDown(e){if(this.stickId!==null)return;e.preventDefault(),this.stickId=e.pointerId;try{this.zone.setPointerCapture(e.pointerId)}catch{}let t=this.zone.getBoundingClientRect();this.cx=Math.max(64,e.clientX-t.left),this.cy=Math.min(t.height-VC-8,e.clientY-t.top),this.base.style.left=`${this.cx}px`,this.base.style.top=`${this.cy}px`,this.base.style.opacity=`1`,this.stickMove(e)}stickMove(e){if(e.pointerId!==this.stickId)return;let t=this.zone.getBoundingClientRect(),n=e.clientX-t.left-this.cx,r=e.clientY-t.top-this.cy,i=Math.hypot(n,r);i>VC&&(n=n/i*VC,r=r/i*VC),this.knob.style.transform=`translate(${n}px, ${r}px)`;let a=Math.min(1,Math.max(0,(Math.min(i,VC)-6)/42)),o=i>0?a/Math.min(i,VC):0;this.sink.setStick(n*o,-r*o)}stickUp(e){e.pointerId===this.stickId&&(this.stickId=null,this.sink.setStick(0,0),this.layout())}frame(e,t){let n=e?`drive`:`foot`;n!==this.mode&&(this.mode=n,this.root.classList.toggle(`drive`,e),this.root.classList.toggle(`foot`,!e)),t!==this.useShown&&(this.useShown=t,this.use.textContent=c(e?`touch.out`:`touch.in`),this.use.classList.toggle(`dim`,t===`none`),this.use.classList.toggle(`ready`,!e&&t!==`none`))}releaseAll(){this.stickId=null,this.gas=this.brake=0;for(let e of this.root.querySelectorAll(`.down`))e.classList.remove(`down`);this.sink.release(),this.layout()}},UC=class{constructor(e,t){this.mode=`start`,this.touch=null,this.toastT=0,this.toastQ=[],this.prevPause=!0,this.world=null,this.busy=!1,this.mapFrom=`play`,this.d=t,this.root=$(`div`,``,``,e),this.root.id=`ui`,this.root.classList.toggle(`is-touch`,!!t.touch),this.hud=new PC(this.root,t.map,!!t.touch,()=>this.setMode(`pause`),()=>this.setMode(`map`)),t.touch&&(this.touch=new HC(this.root,t.touch)),this.tips=new BC(this.hud.top,t.settings.tips,!!t.touch,e=>{t.settings.tips=e,t.onSettings(t.settings)}),this.start=new FC(this.root,()=>this.play()),this.pause=new IC(this.root,t.settings,!!t.touch,{resume:()=>this.setMode(`play`),map:()=>this.setMode(`map`),settings:e=>t.onSettings(e),offers:()=>this.offers([`clearStars`,`repairCar`]),reward:e=>void this.reward(e,()=>this.pause.open())}),this.mapScreen=new LC(this.root,t.map,()=>this.setMode(this.mapFrom)),this.end=new RC(this.root),this.toastEl=$(`div`,`toast hidden`,``,this.root),window.addEventListener(`keydown`,e=>this.key(e)),this.apply()}get blocking(){return this.mode!==`play`}play(){this.mode===`start`&&(this.d.onPlay(),this.setMode(`play`),this.world&&this.tips.begin(this.world))}setMode(e){e===this.mode||this.busy||(e===`map`&&(this.mapFrom=this.mode===`pause`?`pause`:`play`),this.mode=e,e===`pause`&&this.pause.open(),this.apply(),e===`map`&&this.world&&this.mapScreen.draw(this.world,this.hud.objectiveNow),this.d.onMode(e))}apply(){let e=this.mode;VS(this.start.root,e===`start`),VS(this.hud.root,e!==`start`),VS(this.pause.root,e===`pause`),VS(this.mapScreen.root,e===`map`),VS(this.end.root,e===`end`),this.touch&&(VS(this.touch.root,e===`play`),e===`play`?requestAnimationFrame(()=>this.touch?.layout()):this.touch.releaseAll())}key(e){if(e.repeat)return;let t=this.mode;t===`start`&&(e.code===`Enter`||e.code===`Space`)?(e.preventDefault(),this.play()):e.code===`KeyM`&&(t===`play`||t===`map`)?this.setMode(t===`map`?this.mapFrom:`map`):(e.code===`Escape`||e.code===`KeyP`)&&(t===`pause`&&this.pause.back()?this.setMode(`play`):t===`map`&&this.setMode(this.mapFrom))}controls(e){e.pause&&!this.prevPause&&this.mode===`play`&&this.setMode(`pause`),this.prevPause=e.pause}handleEvents(e){for(let t of e){let e=t.type;(e===`wasted`||e===`busted`)&&this.mode===`play`&&this.showEnd(e)}}showEnd(e,t){this.setMode(`end`);let n=this.offers({wasted:[`revive`],busted:[`refundFine`],passed:[`doubleMoney`],failed:[]}[e]);this.end.open(e,n,n=>void this.reward(n,()=>this.showEnd(e,t),()=>this.setMode(`play`)),()=>void this.continueAfterEnd(e),t)}async continueAfterEnd(e){if(!this.busy){this.busy=!0;try{await this.d.onEndContinue(e)}finally{this.busy=!1}this.setMode(`play`)}}offers(e){let t={clearStars:`reward.clearStars`,repairCar:`reward.repairCar`,revive:`end.revive`,doubleMoney:`reward.doubleMoney`,refundFine:`reward.refundFine`};return e.filter(e=>this.d.canOffer(e)).map(e=>({reason:e,label:t[e]}))}async reward(e,t,n){if(this.busy)return;this.busy=!0;let r=!1;try{r=await this.d.offer(e)}finally{this.busy=!1}r||this.toast(c(`reward.failed`)),r&&n?n():t()}toast(e,t=2.5){if(this.toastT>0){e===this.toastEl.textContent?this.toastT=Math.max(this.toastT,t):this.toastQ.length<3&&!this.toastQ.some(t=>t.text===e)&&(this.toastQ.push({text:e,seconds:t}),this.toastT=Math.min(this.toastT,1.4));return}this.toastEl.textContent=e,this.toastT=t,VS(this.toastEl,!0)}get tip(){return this.tips.showing}setObjective(e){this.hud.setObjective(e)}frame(e,t){if(this.world=e,this.toastT>0&&(this.toastT-=t,this.toastT<=0)){let e=this.toastQ.shift();e?this.toast(e.text,e.seconds):VS(this.toastEl,!1)}if(this.mode===`start`)return;let n=NC(e);this.hud.frame(e,t,n),this.mode===`play`&&(this.touch?.frame(e.player.vehicleId>=0,n),this.tips.frame(e,t))}},WC=`rr.settings`;function GC(){return{sound:.8,music:.6,quality:`auto`,tips:[]}}function KC(e){let t=GC();if(!e||typeof e!=`object`)return t;let n=e,r=(e,t)=>typeof e==`number`&&e>=0&&e<=1?e:t;return{sound:r(n.sound,t.sound),music:r(n.music,t.music),quality:n.quality===`low`||n.quality===`medium`||n.quality===`high`||n.quality===`auto`?n.quality:t.quality,tips:Array.isArray(n.tips)?n.tips.filter(e=>typeof e==`string`).slice(0,50):[]}}async function qC(e,t,n,r){let i=KC(await AS(WC)),a=new tC;zS.click=()=>a.synth.click();let o=new uC(e=>{t.renderer.setPixelRatio(e),t.resize()});o.set(i.quality),a.synth.setVolumes(i.sound,i.music);let s=null,c=()=>{s&&clearTimeout(s),s=setTimeout(()=>void jS(WC,i),400)},l=bC(n),u=()=>M.setPlaying(d.mode===`play`&&!M.paused),d=new UC(document.body,{map:{canvas:l.canvas,toPixel:l.toPixel,pxPerMetre:l.image.pxPerMetre},touch:sC.touch?r.touch:null,settings:i,onPlay:()=>a.unlock(),onSettings:e=>{a.synth.setVolumes(e.sound,e.music),o.set(e.quality),c()},onMode:e=>{r.releaseAll(),e!==`play`&&a.quiet(),u()},canOffer:CS,offer:wS,onEndContinue:async t=>{zm(e),await M.showMidgame(t===`passed`||t===`failed`?`mission`:t)}});M.onChange(()=>{a.synth.setSuspended(M.paused),a.synth.setMuted(M.muted),u()}),a.synth.setMuted(M.muted);let f=()=>{d.mode!==`start`&&!M.paused&&a.unlock()};window.addEventListener(`pointerdown`,f),window.addEventListener(`keydown`,f),ee.debug&&Object.assign(window.__rr,{ui:d,audio:a,platform:M,quality:o,registerReward:SS,state:()=>({mode:d.mode,tick:e.tick,silent:a.synth.silent,playing:M.isPlaying,quality:o.level})});let p=0;return{get blocking(){return d.blocking},ui:d,audio:a,controls:e=>d.controls(e),handleEvents:t=>{a.handleEvents(e,t),d.handleEvents(t)},frame:t=>{o.frame(t),a.update(e,t),d.frame(e,t)},idleFrame:n=>{d.frame(e,n),p-=n,p<=0&&(p=.25,t.render(e,1,0))}}}async function JC(){await M.init(),s(M.language());let t=document.getElementById(`app`),n=fy(),r=u_({static:n.staticWorld});mS(r,n);let i=Number(new URLSearchParams(location.search).get(`density`)),a=(navigator.hardwareConcurrency||4)<=4||matchMedia(`(pointer: coarse)`).matches,o=new yS(i>0?i:a?void 0:1,i>0);Ap(r,o.density),o_(r,n);let c=new g,l=new sS(t,r);l.attachCity(n);let u=ee.debug?new TS:null,d=new cS(e,5);ee.debug&&(window.__rr={world:r,view:l,city:n}),l.snapCamera(r);let f=await qC(r,l,n,c);SS(`clearStars`,{available:()=>r.wanted.stars>0,grant:()=>void Lm(r)}),SS(`revive`,{available:()=>r.life.state===`wasted`||r.life.lastAt===`hospital`&&r.life.reviveT>0,grant:()=>void Im(r)}),SS(`repairCar`,{available:()=>Hm(r),grant:()=>void Rm(r)});let p=await YS(r,f);M.onChange(()=>{M.paused&&c.releaseAll()});let m=performance.now(),h=t=>{requestAnimationFrame(h);let n=Math.min(.25,(t-m)/1e3);if(m=t,M.paused){d.reset();return}if(f.blocking){d.reset(),f.idleFrame(n);return}let i=d.advance(n);for(let t=0;t<i;t++){let t=c.read();f.controls(t),p_(r,t,e),l.handleEvents(r.events),f.handleEvents(r.events),p.handleEvents(r.events)}if(l.render(r,d.alpha,n),f.frame(n),p.frame(n),o.frame(n)&&Ap(r,o.density),u){let e=l.stats();u.frame(n,{calls:e.calls,triangles:e.triangles,entities:f_(r)})}};requestAnimationFrame(h),document.getElementById(`loading`)?.remove(),M.loadingFinished()}JC();export{v as n,_ as t};