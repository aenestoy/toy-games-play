(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=``+new URL(`lilita-one-latin-400-normal-87r-Z-Re.woff2`,import.meta.url).href,t=``+new URL(`demo-valley.bin-BtSKVXF_.gz`,import.meta.url).href;function n(e){let t=``;for(let n=0;n<e.length;){let r=e[n++],i;r<128?i=r:r<224?i=(r&31)<<6|e[n++]&63:r<240?(i=(r&15)<<12|(e[n]&63)<<6|e[n+1]&63,n+=2):(i=(r&7)<<18|(e[n]&63)<<12|(e[n+1]&63)<<6|e[n+2]&63,n+=3),t+=String.fromCodePoint(i)}return t}var r=[1],i=class{constructor(e){this.p=0,this.b=e,this.view=new DataView(e.buffer,e.byteOffset,e.byteLength)}u8(){return this.view.getUint8(this.p++)}u16(){let e=this.view.getUint16(this.p,!0);return this.p+=2,e}i16(){let e=this.view.getInt16(this.p,!0);return this.p+=2,e}u32(){let e=this.view.getUint32(this.p,!0);return this.p+=4,e}f32(){let e=this.view.getFloat32(this.p,!0);return this.p+=4,e}f32s(e){let t=new Float32Array(e);for(let n=0;n<e;n++)t[n]=this.f32();return t}u8s(e){let t=this.b.slice(this.p,this.p+e);return this.p+=e,t}};function a(e){let t=new i(e),n=``;for(let e=0;e<4;e++)n+=String.fromCharCode(t.u8());if(n!==`TRKS`)throw Error(`not a region file`);let a=t.u16();if(!r.includes(a))throw Error(`region format ${a} is not supported (this game reads ${r.join(`, `)})`);let o=t.u16(),s=t.u32(),c=new Map;for(let n=0;n<o;n++){let n=``;for(let e=0;e<4;e++)n+=String.fromCharCode(t.u8());let r=t.u32(),i=t.u32();if(r+i>e.length)throw Error(`region block ${n} runs past the end`);c.set(n.trim(),e.subarray(r,r+i))}return{formatVersion:a,regionVersion:s,blocks:c}}function o(e,t){let n=e.blocks.get(t);if(!n)throw Error(`region block ${t} is missing`);return n}var s=e=>JSON.parse(n(e));function c(e){let t=a(e),n=s(o(t,`META`)),r;{let e=new i(o(t,`HGT`)),n=e.f32(),a=e.f32(),s=e.f32(),c=e.u16(),l=e.u16(),u=e.f32(),d=new Float32Array(c*l);for(let t=0;t<l;t++){let n=0;for(let r=0;r<c;r++)n=n+e.i16()<<16>>16,d[t*c+r]=n*u}r={x0:n,z0:a,cell:s,nx:c,nz:l,h:d}}let c;{let e=new i(o(t,`RIV`)),n=e.u32();c={x:e.f32s(n),z:e.f32s(n)}}let l;{let e=new i(o(t,`RD`)),n=e.u32(),r=s(e.u8s(n)),a=e.u32(),c=e.f32s(a),u=e.f32s(a),d=e.f32s(a),f=e.f32s(a),p=e.f32s(a),m=e.u8s(a),h=e.u8s(a);l={roads:r.roads,nodes:r.nodes,offset:Int32Array.from(r.offset),count:Int32Array.from(r.count),x:c,z:u,y:d,hw:f,lim:p,kind:m,flags:h}}return{meta:{...n,version:t.regionVersion},height:r,river:c,roads:l,places:s(o(t,`PL`)),junctions:s(o(t,`JN`)),landmarks:s(o(t,`LM`)),zones:s(o(t,`ZN`)),jobs:s(o(t,`JB`)),gates:s(o(t,`GT`)),climate:s(o(t,`CLM`)),traffic:s(o(t,`TRF`))}}function l(e,t,n){let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)}var u=(e,t,n)=>e<t?t:e>n?n:e,d=(e,t,n)=>e+(t-e)*n;function f(e,t){let n=t-e;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return n}function p(e,t,n){return e+f(e,t)*n}var m=class{constructor(e,t,n,r=32){this.grid=new Map,this.x=e,this.z=t,this.group=n,this.cell=r;for(let i=0;i<e.length-1;i++){if(n[i]!==n[i+1])continue;let a=Math.floor(Math.min(e[i],e[i+1])/r),o=Math.floor(Math.max(e[i],e[i+1])/r),s=Math.floor(Math.min(t[i],t[i+1])/r),c=Math.floor(Math.max(t[i],t[i+1])/r);for(let e=a;e<=o;e++)for(let t=s;t<=c;t++){let n=this.key(e,t),r=this.grid.get(n);r||this.grid.set(n,r=[]),r.push(i)}}}key(e,t){return(e+2048)*4096+(t+2048)}nearestY(e,t,n,r,i,a={d:0,i:0,t:0,side:0}){let o=this.cell,s=Math.ceil(n/o),c=Math.floor(e/o),l=Math.floor(t/o),u=1/0,d=0,f=-1,p=0,m=this.x,h=this.z,g=n*n;for(let n=c-s;n<=c+s;n++)for(let a=l-s;a<=l+s;a++){let o=this.grid.get(this.key(n,a));if(o)for(let n=0;n<o.length;n++){let a=o[n],s=m[a],c=h[a],l=m[a+1]-s,_=h[a+1]-c,v=l*l+_*_||1,y=((e-s)*l+(t-c)*_)/v;y=y<0?0:y>1?1:y;let b=s+l*y-e,x=c+_*y-t,S=b*b+x*x;if(S>g)continue;let C=r[a]+(r[a+1]-r[a])*y-i,w=S+9*C*C;w<u&&(u=w,d=S,f=a,p=y)}}if(f<0)return null;let _=m[f+1]-m[f],v=h[f+1]-h[f];return a.d=Math.sqrt(d),a.i=f,a.t=p,a.side=_*(t-h[f])-v*(e-m[f]),a}nearest(e,t,n,r={d:0,i:0,t:0,side:0}){let i=this.cell,a=Math.ceil(n/i),o=Math.floor(e/i),s=Math.floor(t/i),c=n*n,l=-1,u=0,d=this.x,f=this.z;for(let n=o-a;n<=o+a;n++)for(let r=s-a;r<=s+a;r++){let i=this.grid.get(this.key(n,r));if(i)for(let n=0;n<i.length;n++){let r=i[n],a=d[r],o=f[r],s=d[r+1]-a,p=f[r+1]-o,m=s*s+p*p||1,h=((e-a)*s+(t-o)*p)/m;h=h<0?0:h>1?1:h;let g=a+s*h-e,_=o+p*h-t,v=g*g+_*_;v<c&&(c=v,l=r,u=h)}}if(l<0)return null;let p=d[l+1]-d[l],m=f[l+1]-f[l];return r.d=Math.sqrt(c),r.i=l,r.t=u,r.side=p*(t-f[l])-m*(e-d[l]),r}},h=class{constructor(e){this.places={},this.ROADS={},this.roadList=[],this.rHit={d:0,i:0,t:0,side:0},this.sHit={d:0,i:0,t:0,side:0},this.region=e;let t=e.meta;this.waterY=t.waterY,this.riverHalf=t.riverHalf,this.roadHalf=t.roadHalf,this.hg=e.height,this.placeList=e.places;for(let t of e.places)this.places[t.id]=t;let n=e.roads;this.RX=n.x,this.RZ=n.z,this.RY=n.y,this.RHW=n.hw,this.RLIM=n.lim,this.RKIND=n.kind;let r=n.x.length;this.RBRIDGE=new Uint8Array(r),this.ROVER=new Uint8Array(r);for(let e=0;e<r;e++)this.RBRIDGE[e]=n.flags[e]&1?1:0,this.ROVER[e]=n.flags[e]&2?1:0;let i=new Int16Array(r),a=new Int16Array(r),o=new Float32Array(r);n.roads.forEach((e,t)=>{let r=n.offset[t],s=n.count[t],c=0;for(let e=0;e<s;e++){let s=r+e;e>0&&(c+=Math.hypot(n.x[s]-n.x[s-1],n.z[s]-n.z[s-1])),o[s]=c,i[s]=t,a[s]=this.ROVER[s]?-1e3-s:t}let l={id:e.id,index:t,o:r,n:s,len:c,def:e};this.ROADS[e.id]=l,this.roadList.push(l)}),this.RS=o,this.roads=new m(this.RX,this.RZ,i,32),this.flatRoads=new m(this.RX,this.RZ,a,32),this.river=new m(e.river.x,e.river.z,new Int16Array(e.river.x.length),48),this.junctions=e.junctions;let s=e.junctions.main,c=Math.hypot(s.x1-s.x0,s.z1-s.z0);this.mainDir={x:(s.x1-s.x0)/c,z:(s.z1-s.z0)/c},this.crossings=s.crossS.map(e=>({x:s.x0+this.mainDir.x*e,z:s.z0+this.mainDir.z*e})),this.gates=e.gates,this.jobs=e.jobs,this.climate=e.climate,this.landmarks=e.landmarks;let l=e.zones.find(e=>e.kind===`speed`&&e.place),u=l?this.places[l.place]:null;this.speedZone=l&&u?{x:u.x,z:u.z,r:l.r??0,kmh:l.kmh??50}:null}landmark(e){return this.landmarks.find(t=>t.type===e)}padHeight(e){return this.places[e].h}riverDist(e,t,n=90){let r=this.river.nearest(e,t,n,this.rHit);return r?r.d:n}roadYAt(e){return d(this.RY[e.i],this.RY[e.i+1],e.t)}groundAt(e,t){let n=this.hg,r=(e-n.x0)/n.cell,i=(t-n.z0)/n.cell,a=n.nx-1,o=n.nz-1;r=r<0?0:r>a?a:r,i=i<0?0:i>o?o:i;let s=Math.floor(r),c=Math.floor(i);s>=a&&(s=a-1),c>=o&&(c=o-1);let l=r-s,u=i-c,d=n.h,f=c*n.nx+s,p=d[f],m=d[f+1],h=d[f+n.nx];if(l+u<=1)return p+(m-p)*l+(h-p)*u;let g=d[f+n.nx+1];return g+(h-g)*(1-l)+(m-g)*(1-u)}gridHeight(e,t){return this.hg.h[t*this.hg.nx+e]}surfaceAt(e,t,n=NaN){let r=Number.isNaN(n)?this.roads.nearest(e,t,24,this.sHit):this.roads.nearestY(e,t,24,this.RY,n,this.sHit);if(r){let n=this.roadYAt(r),i=this.RHW[r.i];if(this.RBRIDGE[r.i]||this.ROVER[r.i]||r.d<i+.5)return n;if(r.d<i+4)return d(n,this.groundAt(e,t),l(i+.5,i+4,r.d))}return this.groundAt(e,t)}buildRoute(e){let t=this.jobs.find(t=>t.to===e);if(!t)throw Error(`no job template to ${e}`);let n=[],r=[],i=[],a=[];for(let e of t.route){let t=this.ROADS[e];a.push({id:e,i0:n.length});for(let e=+!!n.length;e<t.n;e++){let a=t.o+e;n.push(this.RX[a]),r.push(this.RZ[a]),i.push(this.RY[a])}}let o=new Float32Array(n.length);for(let e=1;e<n.length;e++)o[e]=o[e-1]+Math.hypot(n[e]-n[e-1],r[e]-r[e-1]);return{x:Float32Array.from(n),z:Float32Array.from(r),y:Float32Array.from(i),s:o,len:o[o.length-1],n:n.length,parts:a}}roadPointAt(e,t){let n=this.ROADS[e];t<0&&(t=n.len+t);let r=this.RS,i=n.o,a=n.o+n.n-1;for(;i<a-1&&r[i+1]<t;)i++;let o=Math.min(1,Math.max(0,(t-r[i])/Math.max(.001,r[i+1]-r[i])));return{x:d(this.RX[i],this.RX[i+1],o),z:d(this.RZ[i],this.RZ[i+1],o),y:d(this.RY[i],this.RY[i+1],o),h:Math.atan2(this.RX[i+1]-this.RX[i],this.RZ[i+1]-this.RZ[i])}}gatePose(e){let t=this.gates.find(t=>t.id===e);return{...this.roadPointAt(t.road,t.s),gate:t,road:this.ROADS[t.road]}}isRing(e){return this.region.roads.roads[this.roads.group[e]]?.ring??!1}isCross(e){return this.region.roads.roads[this.roads.group[e]]?.cross??!1}},g=[`garage`,`warehouse`,`fuel`],_=[0,1,1.25,1.5,1.8],v=[0,20,32,48,70],y=[0,60,120,220,400],b=[0,85,92,99,108],x={garage:{cost:[0,0,100,300,700],time:[0,0,30,60,120]},warehouse:{cost:[0,0,150,340,780],time:[0,0,30,60,120]},fuel:{cost:[0,100,220,420,850],time:[0,20,40,75,120]}},S=[0,23.5,25.5,27.5,30],C=[0,4.9,5.3,5.8,6.4],w=[0,.6,.78,.92,1],T=`ts.profile`,E=`ts.settings`,D=`truckstead.progress`,O=`truckstead.muted`;function k(e,t=`demo-valley`){return{v:2,rev:0,savedAt:0,lastSeen:e,gameVersion:``,region:t,money:0,levels:{garage:1,warehouse:1,fuel:0},build:null,deliveries:0,earned:0,fuelStored:0,fuelAt:e,firstDone:!1,gatesSeen:[],jobSeed:1,rulesSeen:!1}}function A(){return{v:1,rev:0,savedAt:0,lang:``,muted:!1,roadArrows:`auto`}}var j=e=>!!e&&typeof e==`object`&&!Array.isArray(e),M=(e,t,n=-1/0,r=1/0)=>{let i=typeof e==`number`?e:typeof e==`string`?Number(e):NaN;return Number.isFinite(i)?Math.min(r,Math.max(n,i)):t},N=(e,t,n=-1/0,r=1/0)=>Math.round(M(e,t,n,r)),P=(e,t)=>typeof e==`boolean`?e:t,ee=e=>typeof e==`string`&&g.includes(e);function te(e,t){let n={v:2,rev:0,savedAt:0,lastSeen:t,region:`demo-valley`,money:e.money,levels:e.levels,build:e.build,deliveries:e.deliveries,earned:e.earned,fuelStored:e.fuelStored,fuelAt:e.fuelAt,firstDone:e.firstDone,gatesSeen:e.ridgeOpenSeen===!0?[`ridge`]:[],jobSeed:e.jobSeed,rulesSeen:e.rulesSeen},r={};return(e.roadArrows===`auto`||e.roadArrows===`on`||e.roadArrows===`off`)&&(r.roadArrows=e.roadArrows),{profile:n,settings:r}}var ne={1:(e,t)=>te(e,t).profile};function re(e,t){let n=k(t);if(!j(e))return n;let r=e,i=N(r.v,0);for(;i<2&&ne[i];){try{r=ne[i](r,t)}catch{return n}i=N(r.v,i+1)}if(i!==2)return n;let a=j(r.levels)?r.levels:{},o={garage:N(a.garage,n.levels.garage,1,4),warehouse:N(a.warehouse,n.levels.warehouse,1,4),fuel:N(a.fuel,n.levels.fuel,0,4)},s=null;return j(r.build)&&ee(r.build.id)&&o[r.build.id]<4&&(s={id:r.build.id,until:M(r.build.until,t,0),total:M(r.build.total,1,1,86400)}),{v:2,rev:N(r.rev,0,0),savedAt:M(r.savedAt,0,0),lastSeen:M(r.lastSeen,t,0),gameVersion:typeof r.gameVersion==`string`?r.gameVersion.slice(0,32):``,region:typeof r.region==`string`&&r.region?r.region.slice(0,64):n.region,money:M(r.money,0,0,0xe8d4a51000),levels:o,build:s,deliveries:N(r.deliveries,0,0),earned:M(r.earned,0,0,0xe8d4a51000),fuelStored:M(r.fuelStored,0,0,1e9),fuelAt:M(r.fuelAt,t,0),firstDone:P(r.firstDone,!1),gatesSeen:Array.isArray(r.gatesSeen)?r.gatesSeen.filter(e=>typeof e==`string`).slice(0,64):[],jobSeed:N(r.jobSeed,1,1,2**31-1),rulesSeen:P(r.rulesSeen,!1)}}function ie(e){let t=A();if(!j(e))return t;let n=e.roadArrows;return{v:1,rev:N(e.rev,0,0),savedAt:M(e.savedAt,0,0),lang:typeof e.lang==`string`?e.lang.slice(0,8):``,muted:P(e.muted,!1),roadArrows:n===`auto`||n===`on`||n===`off`?n:t.roadArrows}}var ae={"fmt.money":"${n}","fmt.km":`{n} km`,"fmt.m":`{n} m`,"fmt.sec":`{n}s`,"fmt.minSec":`{m}:{s}`,"fmt.minutes":`~{n} min`,"fmt.kmh":`km/h`,"hud.settings":`Settings`,"hud.sound":`Sound`,"hud.pause":`Pause`,"hud.horn":`Horn`,"hud.map":`Map`,"hud.closeMap":`Close map`,"hud.gas":`GAS`,"hud.brake":`BRAKE`,"hud.hintSteer":`STEER`,"hud.hintHold":`HOLD`,"hud.hintKeys":`← → steer · ↑ gas · ↓ brake`,"hud.mapButton":`MAP`,"hud.drive":`DRIVE`,"hud.baseLv":`<span class="w">BASE </span>LV {n}`,"hud.gateOpen":`<b class="ok">{area} OPEN</b> <span>new jobs on the board</span>`,"hud.gateLocked":`<span>{area} opens at <b>BASE LV {n}</b></span>`,"drive.roundabout":`Roundabout · take the {ord} exit`,"drive.ord1":`1st`,"drive.ord2":`2nd`,"drive.ord3":`3rd`,"drive.ord4":`4th`,"drive.bendLeft":`Bend left`,"drive.bendRight":`Bend right`,"drive.follow":`Follow the road`,"drive.info":`{dest} · {dist} · {cargo} {pay}`,"drive.infoShort":`{dest} · {cargo} {pay}`,"drive.brakeZone":`BRAKE IN THE GREEN ZONE`,"drive.redLight":`RED LIGHT · STOP AT THE LINE`,"drive.yellow":`YELLOW · SLOW DOWN`,"drive.slowZone":`SLOW DOWN · {n} ZONE`,"drive.offRoute":`OFF ROUTE · CHECK THE MAP`,"drive.wrongWay":`WRONG WAY · TURN AROUND`,"drive.townZone":`TOWN ZONE<small>{n} km/h · stop at red lights · safe driving pays a bonus</small>`,"drive.fineRed":`Ran a red light`,"drive.fineSpeed":`Speeding in town`,"drive.fineHit":`Hit a car`,"drive.fine":`-{amount} {what}`,"deliver.big":`+{pay}<small>DELIVERED!</small>`,"deliver.bigBonus":`+{pay}<small>SAFE DRIVER BONUS!</small>`,"deliver.title":`Delivered!`,"deliver.route":`{cargo} → {dest}`,"deliver.roadPay":`Road pay`,"deliver.warehouse":`Warehouse bonus`,"deliver.safe":`Safe driver bonus`,"deliver.fines":`Traffic fines`,"deliver.double":`×2 PAYOUT`,"deliver.depot":`DEPOT`,"deliver.canBuild":`You can build something at the depot!`,"deliver.bonus":`+{n} bonus!`,"area.openBig":`{area}<small>NEW REGION OPEN!</small>`,"pause.title":`Paused`,"pause.map":`Map`,"pause.settings":`Settings`,"pause.depot":`Back to depot`,"pause.resume":`RESUME`,"pause.job":`{cargo} → {dest} · {pay}`,"jobs.title":`Job Board`,"jobs.sub":`Pick a load. Longer roads pay more.`,"jobs.newRegion":`NEW REGION`,"jobs.meta":`{dist} · {min}`,"jobs.lockedMeta":`{dist} · big pay`,"jobs.lockedPay":`BASE LV {n}`,"jobs.locked":`Reach BASE LV {n} to open {area}`,"jobs.close":`Close`,"bld.garage":`Garage`,"bld.warehouse":`Warehouse`,"bld.fuel":`Fuel Station`,"bld.lv":`Lv {n}`,"bld.titleLv":`{name} · Lv {n}`,"bld.plot":`Plot`,"bld.now":`Now`,"bld.empty":`Empty`,"bld.build":`Build`,"bld.next":`Next`,"bld.time":`Build time`,"bld.building":`Building… {t}`,"bld.finishNow":`FINISH NOW`,"bld.max":`Max level in this demo`,"bld.buildFor":`BUILD {cost}`,"bld.upgradeFor":`UPGRADE {cost}`,"bld.busy":`Your builder is busy. One build at a time.`,"bld.needMoney":`Need {n} more. Deliver cargo!`,"bld.started":`{name} building… {t}`,"bld.upgrading":`{name} upgrading… {t}`,"bld.ready":`{name} Lv {n} ready!`,"bld.close":`Close`,"bld.labelMax":`LV {n} · MAX`,"bld.labelBuild":`BUILD · {cost}`,"bld.labelLv":`LV {n} · {cost}`,"perk.garageNew":`New truck · top speed {n} km/h`,"perk.garage":`Truck top speed {n} km/h`,"perk.warehouse":`Bigger loads · pay ×{n}`,"perk.fuel0":`Earns money while you drive`,"perk.fuel":`Earns {rate}/min · holds {cap}`,"set.title":`Settings`,"set.graphics":`Graphics`,"set.graphicsNow":`Graphics (now {tier})`,"set.auto":`Auto`,"set.high":`High`,"set.low":`Low`,"set.lowNote":`Low hides small props and water motion, drives fewer cars and draws fewer pixels, for older phones.`,"set.arrows":`Arrows painted on the road`,"set.arrowsAuto":`First 3 jobs`,"set.arrowsOn":`Always`,"set.arrowsOff":`Off`,"set.language":`Language`,"set.sound":`Sound on / off`,"set.privacy":`Privacy`,"set.ok":`OK`,"set.graphicsToast":`Graphics: {tier}`,"set.lowSmoother":`Low (smoother)`,"map.title":`TRUCKSTEAD COUNTY`,"map.north":`N`,"map.unlocks":`Unlocks at Base Lv {n}`,"map.locked":`LOCKED`,"map.lockedText":`{area} is behind a gate.`,"map.lockedHow":`Build and upgrade at the depot to open it.`,"map.take":`TAKE JOB`,"map.current":`Your current delivery`,"map.busy":`Deliver your current load first`,"map.toGo":`{dist} to go`,"map.card":`{cargo} · {dist}`,"load.fail":`Could not start: {msg}`,"place.depot":`Depot`,"place.farm":`Green Acre Farm`,"place.town":`Maple Town`,"place.port":`Bluewater Port`,"place.mill":`Pine Ridge Mill`,"area.ridge":`Pine Ridge`,"cargo.seedSacks":`Seed Sacks`,"cargo.feedBags":`Feed Bags`,"cargo.tractorParts":`Tractor Parts`,"cargo.fencePosts":`Fence Posts`,"cargo.bricks":`Bricks`,"cargo.groceries":`Groceries`,"cargo.furniture":`Furniture`,"cargo.paintDrums":`Paint Drums`,"cargo.timber":`Timber`,"cargo.exportCrates":`Export Crates`,"cargo.container":`Container`,"cargo.machinery":`Machinery`,"cargo.oliveOil":`Olive Oil`,"cargo.sawBlades":`Saw Blades`,"cargo.fuelDrums":`Fuel Drums`,"cargo.toolCrates":`Tool Crates`},F=`modulepreload`,oe=function(e,t){return new URL(e,t).href},se={},I=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=oe(t,n),t=s(t),t in se)return;se[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:F,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},ce=[{id:`en`,name:`English`},{id:`tr`,name:`Türkçe`}],le={en:async()=>ae,tr:()=>I(()=>import(`./tr-u2upTLlU.js`).then(e=>e.tr),[],import.meta.url)},ue={en:ae},de=e=>typeof e==`string`&&Object.prototype.hasOwnProperty.call(le,e);async function fe(e){if(ue[e])return!0;try{return ue[e]=await le[e](),!0}catch(t){return console.warn(`[truckstead] language table did not load`,e,t),!1}}var pe=`en`,me=ae,he=null,ge=null,_e=[],ve=()=>pe;function ye(e){if(e!==pe&&ue[e]){pe=e,me=ue[e],he=null,ge=null;for(let t of _e)t(e)}}var be=()=>pe===`en`?`en-US`:pe;function L(e,t){try{return he??(he=new Intl.PluralRules(be())),e[he.select(t)]??e.other}catch{return t===1&&e.one?e.one:e.other}}function R(e,t){let n=me[e]??ae[e],r=typeof n==`string`?n:L(n,Number(t?.n??0));return t&&(r=r.replace(/\{(\w+)\}/g,(e,n)=>n in t?String(t[n]):e)),r}var xe=e=>e in ae;function Se(e){try{return ge??(ge=new Intl.NumberFormat(be(),{maximumFractionDigits:0})),ge.format(e)}catch{return String(Math.round(e))}}var z=e=>R(`fmt.money`,{n:Se(Math.round(e))});function Ce(e){if(e>=1e3){let t=(e/1e3).toFixed(1);try{t=(e/1e3).toLocaleString(be(),{minimumFractionDigits:1,maximumFractionDigits:1})}catch{}return R(`fmt.km`,{n:t})}return R(`fmt.m`,{n:Math.max(0,Math.round(e/10)*10)})}function B(e){return e=Math.max(0,Math.ceil(e)),e>=60?R(`fmt.minSec`,{m:Math.floor(e/60),s:String(e%60).padStart(2,`0`)}):R(`fmt.sec`,{n:e})}var V=e=>xe(`place.`+e)?R(`place.`+e):e,we=e=>xe(`cargo.`+e)?R(`cargo.`+e):e,Te=e=>xe(`area.`+e)?R(`area.`+e):e;function Ee(e){if(typeof e!=`string`||!e)return null;let t=e.trim().toLowerCase().split(/[-_]/)[0];return de(t)?t:null}function De(){try{return Ee(new URLSearchParams(location.search).get(`lang`))}catch{return null}}function Oe(){try{let e=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language];for(let t of e){let e=Ee(t);if(e)return e}}catch{}return null}function ke(e,t){return De()??Ee(e)??Ee(t)??Oe()??`en`}var Ae=0;async function je(e){let t=++Ae,n=await fe(e);if(t===Ae){ye(n?e:`en`);try{document.documentElement.lang=ve()}catch{}}}var Me=(()=>{try{return new URLSearchParams(location.search)}catch{return new URLSearchParams}})(),Ne=()=>Date.now(),Pe=()=>performance.now(),Fe=`ts.quality`,Ie=`truckstead.quality`;function Le(){let e=Me.get(`quality`);if(e===`high`||e===`low`||e===`auto`)return e;try{let e=localStorage.getItem(Fe)??localStorage.getItem(Ie);if(e===`high`||e===`low`||e===`auto`)return e}catch{}return`auto`}function Re(e){try{localStorage.setItem(Fe,e)}catch{}}function ze(e){let t=null,n=!1,r=[],i=n=>{if(t)try{n(t)}catch{}else e&&r.length<50&&r.push(n)};return{start(a){e&&!n&&(n=!0,e().then(e=>{if(!e.st.start(a)){r.length=0;return}t=e.st,r.splice(0).forEach(e=>i(e))}).catch(()=>{r.length=0}))},screen:e=>i(t=>t.screen(e)),event:(e,t)=>i(n=>n.event(e,t)),set:e=>i(t=>t.set(e)),error:e=>i(t=>{typeof t.error==`function`&&t.error(e)}),client:()=>t}}var Be=`0.2.0`,Ve=`truckstead`,He=Be,Ue=()=>I(()=>import(`./src-BLtBO-gg.js`),[],import.meta.url),We=ze(Ue),Ge=[[180,`m3`],[300,`m5`],[600,`m10`]],Ke=`ts.st.play`,qe=5;function Je(){let e=null;try{e=window.localStorage}catch{e=null}let t=0;try{t=Math.max(0,Number(e?.getItem(Ke))||0)}catch{}if(t>=Ge[Ge.length-1][0])return;let n=window.setInterval(()=>{try{if(document.visibilityState===`hidden`)return;t+=qe;for(let[e,n]of Ge)t>=e&&We.event(n,{once:!0});try{e?.setItem(Ke,String(t))}catch{}t>=Ge[Ge.length-1][0]&&window.clearInterval(n)}catch{}},qe*1e3)}function Ye(e,t){We.start({game:Ve,version:He,portal:e,lang:t}),Xe(),Ue&&Je()}function Xe(){if(Ue)try{window.__tsErr?.take(e=>We.error(e))}catch{}}function Ze(e){try{window.__tsErrState=e}catch{}}var Qe=60,$e=500,et=50,tt=1e3,nt=()=>typeof performance<`u`?performance.now():Date.now();function rt(e){try{We.event(e)}catch{}}var it=e=>e<2?`load_s2`:e<5?`load_s5`:e<10?`load_s10`:e<20?`load_s20`:`load_s30p`,at=e=>e<1?`region_load_s1`:e<3?`region_load_s3`:e<6?`region_load_s6`:`region_load_s10p`,ot=e=>e>=55?`fps_60`:e>=45?`fps_45`:e>=30?`fps_30`:e>=20?`fps_20`:`fps_low`,st=e=>e<=0?`hitch_0`:e<=5?`hitch_1`:e<=20?`hitch_6`:`hitch_21`,ct=new class{constructor(){this.loadDone=!1,this.hiddenEarly=!1,this.blockedDone=!1,this.regionDone=!1,this.lowDone=!1,this.fpsDone=!1,this.last=0,this.prevPlay=!1,this.settleUntil=0,this.ms=0,this.frames=0,this.hitches=0;try{document.visibilityState===`hidden`&&(this.hiddenEarly=!0);let e=()=>this.settle();document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`?this.loadDone||(this.hiddenEarly=!0):e()}),window.addEventListener(`resize`,e),window.addEventListener(`orientationchange`,e)}catch{}}settle(){this.settleUntil=nt()+$e}frame(e,t){if(this.loadDone||(this.loadDone=!0,this.hiddenEarly||rt(it(e/1e3))),this.fpsDone)return;let n=this.last;if(this.last=e,!t){this.prevPlay=!1;return}let r=this.prevPlay;if(this.prevPlay=!0,!r||e<this.settleUntil)return;let i=e-n;i<=0||i>tt||(this.ms+=i,this.frames++,i>et&&this.hitches++,this.ms>=Qe*1e3&&(this.fpsDone=!0,rt(ot(this.frames*1e3/this.ms)),rt(st(this.hitches))))}regionLoaded(e){this.regionDone||(this.regionDone=!0,rt(at(e)))}qualityDropped(){this.lowDone||(this.lowDone=!0,rt(`quality_auto_low`))}offer(){rt(`ad_rew_offer`)}blocked(){this.blockedDone||(this.blockedDone=!0,rt(`ad_blocked`))}rewardedClick(){rt(`ad_rew_click`)}rewarded(e){rt(e?`ad_rew_done`:`ad_rew_fail`)}},lt=class{constructor(e={},t=1500){this.name=`local`,this.hooks=e,this.adDurationMs=t}async init(){console.info(`[portal:local] init`)}loadingFinished(){console.info(`[portal:local] loadingFinished`)}gameplayStart(){console.info(`[portal:local] gameplayStart`)}gameplayStop(){console.info(`[portal:local] gameplayStop`)}happyTime(){console.info(`[portal:local] happyTime`)}async showInterstitial(){await this.fakeAd(`INTERSTITIAL AD (simulated)`)}async showRewarded(){return await this.fakeAd(`REWARDED AD (simulated)`),!0}async save(e,t){try{localStorage.setItem(this.k(e),JSON.stringify(t))}catch{}}async load(e){try{let t=localStorage.getItem(this.k(e));return t===null?void 0:JSON.parse(t)}catch{return}}getLanguage(){return(navigator.language||`en`).slice(0,2).toLowerCase()||`en`}k(e){return`game:${e}`}fakeAd(e){this.hooks.onAdStart?.();let t=document.createElement(`div`);return t.textContent=e,Object.assign(t.style,{position:`fixed`,inset:`0`,display:`flex`,alignItems:`center`,justifyContent:`center`,background:`rgba(0,0,0,0.85)`,color:`#fff`,font:`600 24px system-ui, sans-serif`,zIndex:`9999`}),document.body.appendChild(t),new Promise(e=>{setTimeout(()=>{t.remove(),this.hooks.onAdEnd?.(),e()},this.adDurationMs)})}};function ut(e,t=8e3){return new Promise((n,r)=>{if(document.querySelector(`script[src="${e}"]`))return n();let i=document.createElement(`script`);i.src=e,i.async=!0;let a=setTimeout(()=>r(Error(`script timeout: ${e}`)),t);i.onload=()=>{clearTimeout(a),n()},i.onerror=()=>{clearTimeout(a),r(Error(`script failed: ${e}`))},document.head.appendChild(i)})}var dt=[`/sdk.js`,`https://sdk.games.s3.yandex.net/sdk.js`];function ft(){let e=new URLSearchParams(location.search).get(`portal`);if(e===`crazygames`||e===`poki`||e===`yandex`||e===`local`)return e;let t=[location.hostname,pt(document.referrer)].join(` `);return/crazygames\.com|1001juegos\.com|crazygames\.[a-z.]+/.test(t)?`crazygames`:/poki\.com|poki-gdn\.com/.test(t)?`poki`:/yandex\.(ru|net|com)|games\.s3\.yandex/.test(t)?`yandex`:`local`}function pt(e){try{return e?new URL(e).hostname:``}catch{return``}}async function mt(e={},t=ft(),n={}){switch(t){case`crazygames`:{let{CrazyGamesPortal:t}=await I(async()=>{let{CrazyGamesPortal:e}=await import(`./crazygames-Bi7qX5Ce.js`);return{CrazyGamesPortal:e}},[],import.meta.url);return new t(e)}case`poki`:{let{PokiPortal:t}=await I(async()=>{let{PokiPortal:e}=await import(`./poki-BXzjmZWb.js`);return{PokiPortal:e}},[],import.meta.url);return new t(e)}case`yandex`:{let{YandexPortal:t}=await I(async()=>{let{YandexPortal:e}=await import(`./yandex-DN4PHtX_.js`);return{YandexPortal:e}},[],import.meta.url);return new t(e,dt)}default:return new lt(e)}}var ht=6e3,gt=class{constructor(){this.muted=!1,this.portalMuted=!1,this.pausedForAd=!1,this.forcedMute=!1,this.rewardedOff=!1,this.adStartedInCall=!1,this.listeners=new Set}get silent(){return this.muted||this.portalMuted||this.pausedForAd||this.awayFromScreen}get paused(){return this.pausedForAd||typeof document<`u`&&document.hidden}get adActive(){return this.pausedForAd}get effectivelyMuted(){return this.muted||this.portalMuted}onChange(e){this.listeners.add(e)}notify(){for(let e of this.listeners)e()}async init(){let e={onAdStart:()=>{this.adStartedInCall=!0,this.pausedForAd=!0,this.notify()},onAdEnd:()=>{this.pausedForAd&&(this.pausedForAd=!1,ct?.settle(),this.notify())},onMuteChange:e=>{this.portalMuted=e,this.notify()}};try{this.portal=await mt(e)}catch(t){console.warn(`[truckstead] portal adapter failed, playing without it`,t),this.portal=new _t(e),this.rewardedOff=!0}let t=Promise.resolve().then(()=>this.portal.init()).then(()=>!0,e=>(console.warn(`[truckstead] portal init failed`,e),!0));await Promise.race([t,new Promise(e=>setTimeout(()=>e(!1),ht))])?this.sdkPresent()||(this.rewardedOff=!0):(console.warn(`[truckstead] portal init still pending after`,ht,`ms: playing on without it`),this.portal.name!==`local`&&(this.rewardedOff=!0),t.then(()=>{this.sdkPresent()&&(this.rewardedOff=!1)}));let n=`en`;try{n=this.portal.getLanguage()}catch{}Ye(this.portal.name,n),Me.get(`mute`)===`1`&&(this.muted=!0,this.forcedMute=!0),document.addEventListener(`visibilitychange`,()=>this.notify()),window.addEventListener(`blur`,()=>this.notify()),window.addEventListener(`focus`,()=>this.notify()),this.notify()}portalFlag(){let e=this.portal?.rewardedAvailable;try{if(typeof e==`function`)return!!e.call(this.portal);if(typeof e==`boolean`)return e}catch{return!1}}sdkPresent(){return this.portalFlag()===!1?!1:this.portal.name===`local`||!!this.portal.sdk}get rewardedReady(){return this.rewardedOff||!this.portal||!this.sdkPresent()?!1:this.portalFlag()??!0}async showRewarded(){if(!this.rewardedReady)return!1;ct?.rewardedClick(),this.adStartedInCall=!1;let e=!1;try{e=await this.portal.showRewarded()===!0}catch(t){console.warn(`[truckstead] rewarded ad failed`,t),e=!1}return!e&&!this.adStartedInCall&&(this.rewardedOff=!0),e&&We.event(`first_ad`,{once:!0}),ct?.rewarded(e),this.rewardedOff&&ct?.blocked(),this.pausedForAd&&(this.pausedForAd=!1,this.notify()),e}get awayFromScreen(){if(typeof document>`u`)return!1;if(document.hidden)return!0;let e=location.hostname;return(e===`localhost`||e===`127.0.0.1`||e===`[::1]`)&&!document.hasFocus()}toggleMute(){return this.muted=!this.muted,this.notify(),this.muted}setMuted(e){this.forcedMute||(this.muted=e,this.notify())}get muteForced(){return this.forcedMute}},_t=class extends lt{async showInterstitial(){}async showRewarded(){return!1}},vt=new gt;async function yt(e){let t=await fetch(e);if(!t.ok)throw Error(`region file ${t.status}`);let n=new Uint8Array(await t.arrayBuffer());if(!(n.length>2&&n[0]===31&&n[1]===139))return n;if(typeof DecompressionStream<`u`)try{let e=new Blob([n]).stream().pipeThrough(new DecompressionStream(`gzip`));return new Uint8Array(await new Response(e).arrayBuffer())}catch{}let{gunzipSync:r}=await I(async()=>{let{gunzipSync:e}=await import(`./browser-DVTTPdyi.js`);return{gunzipSync:e}},[],import.meta.url);return r(n)}var bt=5e3;function xt(e){try{let t=localStorage.getItem(`ts.mirror.`+e);return t?JSON.parse(t):void 0}catch{return}}function St(e,t){try{localStorage.setItem(`ts.mirror.`+e,JSON.stringify(t))}catch{}}var Ct=e=>e&&typeof e==`object`&&typeof e.rev==`number`?e.rev:-1,wt=class{constructor(e,t,n){this.value=null,this.dirty=!1,this.lastWrite=0,this.writes=0,this.portal=e,this.key=t,this.clock=n}async load(){let e;try{e=await this.portal.load(this.key)}catch{e=void 0}let t=xt(this.key);return e==null?t:t===void 0?e:Ct(t)>Ct(e)?t:e}attach(e){this.value=e}markDirty(){this.dirty=!0}tick(){this.dirty&&this.clock()-this.lastWrite>=bt&&this.flush()}async flush(){let e=this.value;if(e){this.dirty=!1,this.lastWrite=this.clock(),e.rev=(e.rev|0)+1,e.savedAt=this.clock(),this.writes++,St(this.key,e);try{await this.portal.save(this.key,e)}catch(e){console.warn(`[truckstead] save failed`,this.key,e),this.dirty=!0}}}static backup(e,t){try{t!==void 0&&localStorage.setItem(e+`.bak`,JSON.stringify(t))}catch{}}},Tt,Et,Dt,Ot,kt,At,jt,Mt,Nt,Pt=1e3,Ft=1001,It=1002,Lt=1003,Rt=1004,zt=1005,Bt=1006,Vt=1007,Ht=1008,Ut=1009,Wt=1010,Gt=1011,Kt=1012,qt=1013,Jt=1014,Yt=1015,Xt=1016,Zt=1017,Qt=1018,$t=1020,en=35902,tn=35899,nn=1021,rn=1022,an=1023,on=1026,sn=1027,cn=1028,ln=1029,un=1030,dn=1031,fn=1033,pn=33776,mn=33777,hn=33778,gn=33779,_n=35840,vn=35841,yn=35842,bn=35843,xn=36196,Sn=37492,Cn=37496,wn=37488,Tn=37489,En=37490,Dn=37491,On=37808,kn=37809,An=37810,jn=37811,Mn=37812,Nn=37813,Pn=37814,Fn=37815,In=37816,Ln=37817,Rn=37818,zn=37819,Bn=37820,Vn=37821,Hn=36492,Un=36494,Wn=36495,Gn=36283,Kn=36284,qn=36285,Jn=36286,Yn=2300,Xn=2301,Zn=2302,Qn=2303,$n=2400,er=2401,tr=2402,nr=3200,rr=`srgb`,ir=`srgb-linear`,ar=`linear`,or=`srgb`,sr=7680,cr=35044,lr=35048,ur=2e3;function dr(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function fr(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function pr(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function mr(){let e=pr(`canvas`);return e.style.display=`block`,e}var hr={};function gr(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function _r(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function H(...e){e=_r(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function U(...e){e=_r(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function vr(...e){let t=e.join(` `);t in hr||(hr[t]=!0,H(...e))}function yr(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var br={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},xr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Sr=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Cr=Math.PI/180,wr=180/Math.PI;function Tr(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Sr[e&255]+Sr[e>>8&255]+Sr[e>>16&255]+Sr[e>>24&255]+`-`+Sr[t&255]+Sr[t>>8&255]+`-`+Sr[t>>16&15|64]+Sr[t>>24&255]+`-`+Sr[n&63|128]+Sr[n>>8&255]+`-`+Sr[n>>16&255]+Sr[n>>24&255]+Sr[r&255]+Sr[r>>8&255]+Sr[r>>16&255]+Sr[r>>24&255]).toLowerCase()}function W(e,t,n){return Math.max(t,Math.min(n,e))}function Er(e,t){return(e%t+t)%t}function Dr(e,t,n){return(1-n)*e+n*t}function Or(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function kr(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}jt=Symbol.iterator;var G=class{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(W(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[jt](){yield this.x,yield this.y}};Tt=G,Tt.prototype.isVector2=!0;var Ar=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:H(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(W(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};Mt=Symbol.iterator;var K=class{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Mr.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Mr.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this.z=W(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this.z=W(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return jr.copy(this).projectOnVector(e),this.sub(jr)}reflect(e){return this.sub(jr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(W(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Mt](){yield this.x,yield this.y,yield this.z}};Et=K,Et.prototype.isVector3=!0;var jr=new K,Mr=new Ar,q=class{constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return vr(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Nr.makeScale(e,t)),this}rotate(e){return vr(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Nr.makeRotation(-e)),this}translate(e,t){return vr(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Nr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Dt=q,Dt.prototype.isMatrix3=!0;var Nr=new q,Pr=new q().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fr=new q().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ir(){let e={enabled:!0,workingColorSpace:ir,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Rr(e.r),e.g=Rr(e.g),e.b=Rr(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=zr(e.r),e.g=zr(e.g),e.b=zr(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?ar:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return vr(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return vr(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[ir]:{primaries:t,whitePoint:r,transfer:ar,toXYZ:Pr,fromXYZ:Fr,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:rr},outputColorSpaceConfig:{drawingBufferColorSpace:rr}},[rr]:{primaries:t,whitePoint:r,transfer:or,toXYZ:Pr,fromXYZ:Fr,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:rr}}}),e}var Lr=Ir();function Rr(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function zr(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Br,Vr=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Br===void 0&&(Br=pr(`canvas`)),Br.width=e.width,Br.height=e.height;let t=Br.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Br}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=pr(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Rr(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Rr(t[e]/255)*255):t[e]=Rr(t[e]);return{data:t,width:e.width,height:e.height}}return H(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Hr=0,Ur=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Hr++}),this.uuid=Tr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Wr(r[t].image)):e.push(Wr(r[t]))}else e=Wr(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Wr(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Vr.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(H(`Texture: Unable to serialize Texture.`),{})}var Gr=0,Kr=new K,qr=class e extends xr{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=Ft,i=Ft,a=Bt,o=Ht,s=an,c=Ut,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gr++}),this.uuid=Tr(),this.name=``,this.source=new Ur(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new G(0,0),this.repeat=new G(1,1),this.center=new G(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new q,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Kr).x}get height(){return this.source.getSize(Kr).y}get depth(){return this.source.getSize(Kr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){H(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){H(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Pt:e.x-=Math.floor(e.x);break;case Ft:e.x=e.x<0?0:1;break;case It:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Pt:e.y-=Math.floor(e.y);break;case Ft:e.y=e.y<0?0:1;break;case It:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};qr.DEFAULT_IMAGE=null,qr.DEFAULT_MAPPING=300,qr.DEFAULT_ANISOTROPY=1,Nt=Symbol.iterator;var Jr=class{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this.z=W(this.z,e.z,t.z),this.w=W(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this.z=W(this.z,e,t),this.w=W(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Nt](){yield this.x,yield this.y,yield this.z,yield this.w}};Ot=Jr,Ot.prototype.isVector4=!0;var Yr=class extends xr{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Jr(0,0,e,t),this.scissorTest=!1,this.viewport=new Jr(0,0,e,t),this.textures=[];let r=new qr({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Ur(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Xr=class extends Yr{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Zr=class extends qr{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Ft,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Qr=class extends qr{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Ft,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},$r=class e{constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/ei.setFromMatrixColumn(e,0).length(),i=1/ei.setFromMatrixColumn(e,1).length(),a=1/ei.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ni,e,ri)}lookAt(e,t,n){let r=this.elements;return oi.subVectors(e,t),oi.lengthSq()===0&&(oi.z=1),oi.normalize(),ii.crossVectors(n,oi),ii.lengthSq()===0&&(Math.abs(n.z)===1?oi.x+=1e-4:oi.z+=1e-4,oi.normalize(),ii.crossVectors(n,oi)),ii.normalize(),ai.crossVectors(oi,ii),r[0]=ii.x,r[4]=ai.x,r[8]=oi.x,r[1]=ii.y,r[5]=ai.y,r[9]=oi.y,r[2]=ii.z,r[6]=ai.z,r[10]=oi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],ee=r[11],te=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*ee,i[12]=a*w+o*O+s*M+c*te,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*ee,i[13]=l*w+u*O+d*M+f*te,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*ee,i[14]=p*w+m*O+h*M+g*te,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*ee,i[15]=_*w+v*O+y*M+b*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=ei.set(r[0],r[1],r[2]).length(),o=ei.set(r[4],r[5],r[6]).length(),s=ei.set(r[8],r[9],r[10]).length();i<0&&(a=-a),ti.copy(this);let c=1/a,l=1/o,u=1/s;return ti.elements[0]*=c,ti.elements[1]*=c,ti.elements[2]*=c,ti.elements[4]*=l,ti.elements[5]*=l,ti.elements[6]*=l,ti.elements[8]*=u,ti.elements[9]*=u,ti.elements[10]*=u,t.setFromRotationMatrix(ti),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=ur,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=ur,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};kt=$r,kt.prototype.isMatrix4=!0;var ei=new K,ti=new $r,ni=new K(0,0,0),ri=new K(1,1,1),ii=new K,ai=new K,oi=new K,si=new $r,ci=new Ar,li=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(W(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-W(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(W(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-W(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(W(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-W(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:H(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return si.makeRotationFromQuaternion(e),this.setFromRotationMatrix(si,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ci.setFromEuler(this),this.setFromQuaternion(ci,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};li.DEFAULT_ORDER=`XYZ`;var ui=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},di=0,fi=new K,pi=new Ar,mi=new $r,hi=new K,gi=new K,_i=new K,vi=new Ar,yi=new K(1,0,0),bi=new K(0,1,0),xi=new K(0,0,1),Si={type:`added`},Ci={type:`removed`},wi={type:`childadded`,child:null},Ti={type:`childremoved`,child:null},Ei=class e extends xr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:di++}),this.uuid=Tr(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new K,n=new li,r=new Ar,i=new K(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new $r},normalMatrix:{value:new q}}),this.matrix=new $r,this.matrixWorld=new $r,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ui,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return pi.setFromAxisAngle(e,t),this.quaternion.multiply(pi),this}rotateOnWorldAxis(e,t){return pi.setFromAxisAngle(e,t),this.quaternion.premultiply(pi),this}rotateX(e){return this.rotateOnAxis(yi,e)}rotateY(e){return this.rotateOnAxis(bi,e)}rotateZ(e){return this.rotateOnAxis(xi,e)}translateOnAxis(e,t){return fi.copy(e).applyQuaternion(this.quaternion),this.position.add(fi.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(yi,e)}translateY(e){return this.translateOnAxis(bi,e)}translateZ(e){return this.translateOnAxis(xi,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?hi.copy(e):hi.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),gi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mi.lookAt(gi,hi,this.up):mi.lookAt(hi,gi,this.up),this.quaternion.setFromRotationMatrix(mi),r&&(mi.extractRotation(r.matrixWorld),pi.setFromRotationMatrix(mi),this.quaternion.premultiply(pi.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(U(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Si),wi.child=e,this.dispatchEvent(wi),wi.child=null):U(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ci),Ti.child=e,this.dispatchEvent(Ti),Ti.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(mi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Si),wi.child=e,this.dispatchEvent(wi),wi.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gi,e,_i),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gi,vi,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Ei.DEFAULT_UP=new K(0,1,0),Ei.DEFAULT_MATRIX_AUTO_UPDATE=!0,Ei.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Di=class extends Ei{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Oi={type:`move`},ki=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Di,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Di,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Di,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Oi)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Di;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Ai={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ji={h:0,s:0,l:0},Mi={h:0,s:0,l:0};function Ni(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var J=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=rr){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Lr.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Lr.workingColorSpace){return this.r=e,this.g=t,this.b=n,Lr.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Lr.workingColorSpace){if(e=Er(e,1),t=W(t,0,1),n=W(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Ni(i,r,e+1/3),this.g=Ni(i,r,e),this.b=Ni(i,r,e-1/3)}return Lr.colorSpaceToWorking(this,r),this}setStyle(e,t=rr){function n(t){t!==void 0&&parseFloat(t)<1&&H(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:H(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);H(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=rr){let n=Ai[e.toLowerCase()];return n===void 0?H(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Rr(e.r),this.g=Rr(e.g),this.b=Rr(e.b),this}copyLinearToSRGB(e){return this.r=zr(e.r),this.g=zr(e.g),this.b=zr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=rr){return Lr.workingToColorSpace(Pi.copy(this),e),Math.round(W(Pi.r*255,0,255))*65536+Math.round(W(Pi.g*255,0,255))*256+Math.round(W(Pi.b*255,0,255))}getHexString(e=rr){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Lr.workingColorSpace){Lr.workingToColorSpace(Pi.copy(this),t);let n=Pi.r,r=Pi.g,i=Pi.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Lr.workingColorSpace){return Lr.workingToColorSpace(Pi.copy(this),t),e.r=Pi.r,e.g=Pi.g,e.b=Pi.b,e}getStyle(e=rr){Lr.workingToColorSpace(Pi.copy(this),e);let t=Pi.r,n=Pi.g,r=Pi.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(ji),this.setHSL(ji.h+e,ji.s+t,ji.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ji),e.getHSL(Mi);let n=Dr(ji.h,Mi.h,t),r=Dr(ji.s,Mi.s,t),i=Dr(ji.l,Mi.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Pi=new J;J.NAMES=Ai;var Fi=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new J(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ii=class extends Ei{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new li,this.environmentIntensity=1,this.environmentRotation=new li,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Li=new K,Ri=new K,zi=new K,Bi=new K,Vi=new K,Hi=new K,Ui=new K,Wi=new K,Gi=new K,Ki=new K,qi=new Jr,Ji=new Jr,Yi=new Jr,Xi=class e{constructor(e=new K,t=new K,n=new K){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Li.subVectors(e,t),r.cross(Li);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Li.subVectors(r,t),Ri.subVectors(n,t),zi.subVectors(e,t);let a=Li.dot(Li),o=Li.dot(Ri),s=Li.dot(zi),c=Ri.dot(Ri),l=Ri.dot(zi),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Bi)!==null&&Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Bi)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Bi.x),s.addScaledVector(a,Bi.y),s.addScaledVector(o,Bi.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return qi.setScalar(0),Ji.setScalar(0),Yi.setScalar(0),qi.fromBufferAttribute(e,t),Ji.fromBufferAttribute(e,n),Yi.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(qi,i.x),a.addScaledVector(Ji,i.y),a.addScaledVector(Yi,i.z),a}static isFrontFacing(e,t,n,r){return Li.subVectors(n,t),Ri.subVectors(e,t),Li.cross(Ri).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Li.subVectors(this.c,this.b),Ri.subVectors(this.a,this.b),Li.cross(Ri).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Vi.subVectors(r,n),Hi.subVectors(i,n),Wi.subVectors(e,n);let s=Vi.dot(Wi),c=Hi.dot(Wi);if(s<=0&&c<=0)return t.copy(n);Gi.subVectors(e,r);let l=Vi.dot(Gi),u=Hi.dot(Gi);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Vi,a);Ki.subVectors(e,i);let f=Vi.dot(Ki),p=Hi.dot(Ki);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Hi,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Ui.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Ui,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Vi,a).addScaledVector(Hi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Zi=class{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint($i.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint($i.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=$i.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,$i):$i.fromBufferAttribute(r,t),$i.applyMatrix4(e.matrixWorld),this.expandByPoint($i);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),ea.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),ea.copy(e.boundingBox)),ea.applyMatrix4(e.matrixWorld),this.union(ea)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$i),$i.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(sa),ca.subVectors(this.max,sa),ta.subVectors(e.a,sa),na.subVectors(e.b,sa),ra.subVectors(e.c,sa),ia.subVectors(na,ta),aa.subVectors(ra,na),oa.subVectors(ta,ra);let t=[0,-ia.z,ia.y,0,-aa.z,aa.y,0,-oa.z,oa.y,ia.z,0,-ia.x,aa.z,0,-aa.x,oa.z,0,-oa.x,-ia.y,ia.x,0,-aa.y,aa.x,0,-oa.y,oa.x,0];return!da(t,ta,na,ra,ca)||(t=[1,0,0,0,1,0,0,0,1],!da(t,ta,na,ra,ca))?!1:(la.crossVectors(ia,aa),t=[la.x,la.y,la.z],da(t,ta,na,ra,ca))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$i).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($i).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Qi=[new K,new K,new K,new K,new K,new K,new K,new K],$i=new K,ea=new Zi,ta=new K,na=new K,ra=new K,ia=new K,aa=new K,oa=new K,sa=new K,ca=new K,la=new K,ua=new K;function da(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){ua.fromArray(e,a);let o=i.x*Math.abs(ua.x)+i.y*Math.abs(ua.y)+i.z*Math.abs(ua.z),s=t.dot(ua),c=n.dot(ua),l=r.dot(ua);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var fa=new K,pa=new G,ma=0,ha=class extends xr{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ma++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=cr,this.updateRanges=[],this.gpuType=Yt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)pa.fromBufferAttribute(this,t),pa.applyMatrix3(e),this.setXY(t,pa.x,pa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)fa.fromBufferAttribute(this,t),fa.applyMatrix3(e),this.setXYZ(t,fa.x,fa.y,fa.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)fa.fromBufferAttribute(this,t),fa.applyMatrix4(e),this.setXYZ(t,fa.x,fa.y,fa.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)fa.fromBufferAttribute(this,t),fa.applyNormalMatrix(e),this.setXYZ(t,fa.x,fa.y,fa.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)fa.fromBufferAttribute(this,t),fa.transformDirection(e),this.setXYZ(t,fa.x,fa.y,fa.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Or(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=kr(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Or(t,this.array)),t}setX(e,t){return this.normalized&&(t=kr(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Or(t,this.array)),t}setY(e,t){return this.normalized&&(t=kr(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Or(t,this.array)),t}setZ(e,t){return this.normalized&&(t=kr(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Or(t,this.array)),t}setW(e,t){return this.normalized&&(t=kr(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=kr(t,this.array),n=kr(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=kr(t,this.array),n=kr(n,this.array),r=kr(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=kr(t,this.array),n=kr(n,this.array),r=kr(r,this.array),i=kr(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},ga=class extends ha{constructor(e,t,n){super(new Uint16Array(e),t,n)}},_a=class extends ha{constructor(e,t,n){super(new Uint32Array(e),t,n)}},va=class extends ha{constructor(e,t,n){super(new Float32Array(e),t,n)}},ya=new Zi,ba=new K,xa=new K,Sa=class{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?ya.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ba.subVectors(e,this.center);let t=ba.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(ba,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ba.copy(e.center).add(xa)),this.expandByPoint(ba.copy(e.center).sub(xa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Ca=0,wa=new $r,Ta=new Ei,Ea=new K,Da=new Zi,Oa=new Zi,ka=new K,Aa=class e extends xr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ca++}),this.uuid=Tr(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(dr(e)?_a:ga)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new q().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return wa.makeRotationFromQuaternion(e),this.applyMatrix4(wa),this}rotateX(e){return wa.makeRotationX(e),this.applyMatrix4(wa),this}rotateY(e){return wa.makeRotationY(e),this.applyMatrix4(wa),this}rotateZ(e){return wa.makeRotationZ(e),this.applyMatrix4(wa),this}translate(e,t,n){return wa.makeTranslation(e,t,n),this.applyMatrix4(wa),this}scale(e,t,n){return wa.makeScale(e,t,n),this.applyMatrix4(wa),this}lookAt(e){return Ta.lookAt(e),Ta.updateMatrix(),this.applyMatrix4(Ta.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ea).negate(),this.translate(Ea.x,Ea.y,Ea.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new va(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&H(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){U(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Da.setFromBufferAttribute(n),this.morphTargetsRelative?(ka.addVectors(this.boundingBox.min,Da.min),this.boundingBox.expandByPoint(ka),ka.addVectors(this.boundingBox.max,Da.max),this.boundingBox.expandByPoint(ka)):(this.boundingBox.expandByPoint(Da.min),this.boundingBox.expandByPoint(Da.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&U(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sa);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){U(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new K,1/0);return}if(e){let n=this.boundingSphere.center;if(Da.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Oa.setFromBufferAttribute(n),this.morphTargetsRelative?(ka.addVectors(Da.min,Oa.min),Da.expandByPoint(ka),ka.addVectors(Da.max,Oa.max),Da.expandByPoint(ka)):(Da.expandByPoint(Oa.min),Da.expandByPoint(Oa.max))}Da.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)ka.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(ka));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)ka.fromBufferAttribute(a,t),o&&(Ea.fromBufferAttribute(e,t),ka.add(Ea)),r=Math.max(r,n.distanceToSquared(ka))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&U(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){U(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new ha(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new K,s[e]=new K;let c=new K,l=new K,u=new K,d=new G,f=new G,p=new G,m=new K,h=new K;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new K,y=new K,b=new K,x=new K;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new ha(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new K,i=new K,a=new K,o=new K,s=new K,c=new K,l=new K,u=new K;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ka.fromBufferAttribute(e,t),ka.normalize(),e.setXYZ(t,ka.x,ka.y,ka.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new ha(a,r,i)}if(this.index===null)return H(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},ja=new K,Ma=new K,Na=new q,Pa=class{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=ja.subVectors(n,t).cross(Ma.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(ja),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Na.getNormalMatrix(e),r=this.coplanarPoint(ja).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Fa=0,Ia=class extends xr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fa++}),this.uuid=Tr(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new J(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=sr,this.stencilZFail=sr,this.stencilZPass=sr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){H(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){H(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new J().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Pa().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new G().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new G().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},La=new K,Ra=new K,za=new K,Ba=new K,Va=class{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,La)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=La.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(La.copy(this.origin).addScaledVector(this.direction,t),La.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ra.copy(e).add(t).multiplyScalar(.5),za.copy(t).sub(e).normalize(),Ba.copy(this.origin).sub(Ra);let i=e.distanceTo(t)*.5,a=-this.direction.dot(za),o=Ba.dot(this.direction),s=-Ba.dot(za),c=Ba.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Ra).addScaledVector(za,d),f}intersectSphere(e,t){if(e.radius<0)return null;La.subVectors(e.center,this.origin);let n=La.dot(this.direction),r=La.dot(La)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,La)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,ee=C/w,te=1/w,ne=T-P*D,re=E-ee*D,ie=O-P*A,ae=k-ee*A,F=j-P*N,oe=M-ee*N,se=F*ae-oe*ie,I=ne*oe-re*F,ce=ie*re-ae*ne;if(r){if(se<0||I<0||ce<0)return null}else if((se<0||I<0||ce<0)&&(se>0||I>0||ce>0))return null;let le=se+I+ce;if(le===0)return null;let ue=te*(se*D+I*A+ce*N);return(le>0?ue<0:ue>0)?null:this.at(ue/le,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ha=class extends Ia{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ua=new $r,Wa=new Va,Ga=new Sa,Ka=new K,qa=new K,Ja=new K,Ya=new K,Xa=new K,Za=new K,Qa=new K,$a=new K,eo=class extends Ei{constructor(e=new Aa,t=new Ha){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Za.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Xa.fromBufferAttribute(s,e),a?Za.addScaledVector(Xa,r):Za.addScaledVector(Xa.sub(t),r))}t.add(Za)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ga.copy(n.boundingSphere),Ga.applyMatrix4(i),Wa.copy(e.ray).recast(e.near),!(Ga.containsPoint(Wa.origin)===!1&&(Wa.intersectSphere(Ga,Ka)===null||Wa.origin.distanceToSquared(Ka)>(e.far-e.near)**2))&&(Ua.copy(i).invert(),Wa.copy(e.ray).applyMatrix4(Ua),(n.boundingBox===null||Wa.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Wa)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=no(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=no(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=no(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=no(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function to(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;$a.copy(s),$a.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo($a);return l<n.near||l>n.far?null:{distance:l,point:$a.clone(),object:e}}function no(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,qa),e.getVertexPosition(c,Ja),e.getVertexPosition(l,Ya);let u=to(e,t,n,r,qa,Ja,Ya,Qa);if(u){let e=new K;Xi.getBarycoord(Qa,qa,Ja,Ya,e),i&&(u.uv=Xi.getInterpolatedAttribute(i,s,c,l,e,new G)),a&&(u.uv1=Xi.getInterpolatedAttribute(a,s,c,l,e,new G)),o&&(u.normal=Xi.getInterpolatedAttribute(o,s,c,l,e,new K),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new K,materialIndex:0};Xi.getNormal(qa,Ja,Ya,t.normal),u.face=t,u.barycoord=e}return u}var ro=class extends qr{constructor(e=null,t=1,n=1,r,i,a,o,s,c=Lt,l=Lt,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},io=class extends ha{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ao=new $r,oo=new $r,so=[],co=new Zi,lo=new $r,uo=new eo,fo=new Sa,po=class extends eo{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new io(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,lo)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Zi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ao),co.copy(e.boundingBox).applyMatrix4(ao),this.boundingBox.union(co)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Sa),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ao),fo.copy(e.boundingSphere).applyMatrix4(ao),this.boundingSphere.union(fo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(uo.geometry=this.geometry,uo.material=this.material,uo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fo.copy(this.boundingSphere),fo.applyMatrix4(n),e.ray.intersectsSphere(fo)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,ao),oo.multiplyMatrices(n,ao),uo.matrixWorld=oo,uo.raycast(e,so);for(let e=0,n=so.length;e<n;e++){let n=so[e];n.instanceId=i,n.object=this,t.push(n)}so.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new io(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ro(new Float32Array(r*this.count),r,this.count,cn,Yt));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},mo=new Sa,ho=new G(.5,.5),go=new K,_o=class{constructor(e=new Pa,t=new Pa,n=new Pa,r=new Pa,i=new Pa,a=new Pa){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ur,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),mo.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),mo.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(mo)}intersectsSprite(e){return mo.center.set(0,0,0),mo.radius=.7071067811865476+ho.distanceTo(e.center),mo.applyMatrix4(e.matrixWorld),this.intersectsSphere(mo)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(go.x=r.normal.x>0?e.max.x:e.min.x,go.y=r.normal.y>0?e.max.y:e.min.y,go.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(go)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},vo=class extends Ia{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new J(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},yo=new $r,bo=new Va,xo=new Sa,So=new K,Co=class extends Ei{constructor(e=new Aa,t=new vo){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xo.copy(n.boundingSphere),xo.applyMatrix4(r),xo.radius+=i,e.ray.intersectsSphere(xo)===!1)return;yo.copy(r).invert(),bo.copy(e.ray).applyMatrix4(yo);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);So.fromBufferAttribute(l,n),wo(So,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)So.fromBufferAttribute(l,a),wo(So,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function wo(e,t,n,r,i,a,o){let s=bo.distanceSqToPoint(e);if(s<n){let n=new K;bo.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var To=class extends qr{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Eo=class extends qr{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Do=class extends qr{constructor(e,t,n=Jt,r,i,a,o=Lt,s=Lt,c,l=on,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ur(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Oo=class extends Do{constructor(e,t=Jt,n=301,r,i,a=Lt,o=Lt,s,c=on){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ko=class extends qr{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ao=class e extends Aa{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new va(c,3)),this.setAttribute(`normal`,new va(l,3)),this.setAttribute(`uv`,new va(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new K;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},jo=class e extends Aa{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new K,l=new G;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new va(a,3)),this.setAttribute(`normal`,new va(o,3)),this.setAttribute(`uv`,new va(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Mo=class e extends Aa{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new va(u,3)),this.setAttribute(`normal`,new va(d,3)),this.setAttribute(`uv`,new va(f,2));function _(){let a=new K,_=new K,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new G,m=new K,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},No=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){H(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new G:new K);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new K,r=[],i=[],a=[],o=new K,s=new $r;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new K)}i[0]=new K,a[0]=new K;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(W(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(W(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Po=class extends No{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new G){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Fo=class extends Po{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Io(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var Lo=new K,Ro=new K,zo=new Io,Bo=new Io,Vo=new Io,Ho=class extends No{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new K){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Ro.subVectors(r[0],r[1]).add(r[0]),c=Ro);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(Lo.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=Lo),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),zo.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Bo.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Vo.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(zo.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Bo.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Vo.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(zo.calc(s),Bo.calc(s),Vo.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new K().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Uo(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Wo(e,t){let n=1-e;return n*n*t}function Go(e,t){return 2*(1-e)*e*t}function Ko(e,t){return e*e*t}function qo(e,t,n,r){return Wo(e,t)+Go(e,n)+Ko(e,r)}function Jo(e,t){let n=1-e;return n*n*n*t}function Yo(e,t){let n=1-e;return 3*n*n*e*t}function Xo(e,t){return 3*(1-e)*e*e*t}function Zo(e,t){return e*e*e*t}function Qo(e,t,n,r,i){return Jo(e,t)+Yo(e,n)+Xo(e,r)+Zo(e,i)}var $o=class extends No{constructor(e=new G,t=new G,n=new G,r=new G){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Qo(e,r.x,i.x,a.x,o.x),Qo(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},es=class extends No{constructor(e=new K,t=new K,n=new K,r=new K){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Qo(e,r.x,i.x,a.x,o.x),Qo(e,r.y,i.y,a.y,o.y),Qo(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ts=class extends No{constructor(e=new G,t=new G){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new G){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new G){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ns=class extends No{constructor(e=new K,t=new K){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new K){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new K){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},rs=class extends No{constructor(e=new G,t=new G,n=new G){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(qo(e,r.x,i.x,a.x),qo(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},is=class extends No{constructor(e=new K,t=new K,n=new K){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(qo(e,r.x,i.x,a.x),qo(e,r.y,i.y,a.y),qo(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},as=class extends No{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new G){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Uo(o,s.x,c.x,l.x,u.x),Uo(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new G().fromArray(n))}return this}},os=Object.freeze({__proto__:null,ArcCurve:Fo,CatmullRomCurve3:Ho,CubicBezierCurve:$o,CubicBezierCurve3:es,EllipseCurve:Po,LineCurve:ts,LineCurve3:ns,QuadraticBezierCurve:rs,QuadraticBezierCurve3:is,SplineCurve:as}),ss=class extends No{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new os[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new os[n.type]().fromJSON(n))}return this}},cs=class extends ss{constructor(e){super(),this.type=`Path`,this.currentPoint=new G,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ts(this.currentPoint.clone(),new G(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new rs(this.currentPoint.clone(),new G(e,t),new G(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new $o(this.currentPoint.clone(),new G(e,t),new G(n,r),new G(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new as([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new Po(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ls=class extends cs{constructor(e){super(e),this.uuid=Tr(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new cs().fromJSON(n))}return this}};function us(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=ds(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=vs(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return ps(a,o,n,s,c,l,0),o}function ds(e,t,n,r,i){let a;if(i===Hs(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=zs(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=zs(i/r|0,e[i],e[i+1],a);return a&&js(a,a.next)&&(Bs(a),a=a.next),a}function fs(e,t){if(!e)return e;t||(t=e);let n=e,r;do if(r=!1,!n.steiner&&(js(n,n.next)||As(n.prev,n,n.next)===0)){if(Bs(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function ps(e,t,n,r,i,a,o){if(!e)return;!o&&a&&Cs(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?hs(e,r,i,a):ms(e)){t.push(c.i,e.i,l.i),Bs(e),e=l.next,s=l.next;continue}if(e=l,e===s){o?o===1?(e=gs(fs(e),t),ps(e,t,n,r,i,a,2)):o===2&&_s(e,t,n,r,i,a):ps(fs(e),t,n,r,i,a,1);break}}}function ms(e){let t=e.prev,n=e,r=e.next;if(As(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&Os(i,s,a,c,o,l,m.x,m.y)&&As(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function hs(e,t,n,r){let i=e.prev,a=e,o=e.next;if(As(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=Ts(p,m,t,n,r),v=Ts(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Os(s,u,c,d,l,f,y.x,y.y)&&As(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Os(s,u,c,d,l,f,b.x,b.y)&&As(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Os(s,u,c,d,l,f,y.x,y.y)&&As(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Os(s,u,c,d,l,f,b.x,b.y)&&As(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function gs(e,t){let n=e;do{let r=n.prev,i=n.next.next;!js(r,i)&&Ms(r,n,n.next,i)&&Is(r,i)&&Is(i,r)&&(t.push(r.i,n.i,i.i),Bs(n),Bs(n.next),n=e=i),n=n.next}while(n!==e);return fs(n)}function _s(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&ks(o,e)){let s=Rs(o,e);o=fs(o,o.next),s=fs(s,s.next),ps(o,t,n,r,i,a,0),ps(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function vs(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=ds(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(Es(o))}i.sort(ys);for(let e=0;e<i.length;e++)n=bs(i[e],n);return n}function ys(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function bs(e,t){let n=xs(e,t);if(!n)return t;let r=Rs(n,e);return fs(r,r.next),fs(n,n.next)}function xs(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(js(e,n))return n;do{if(js(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&Ds(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);Is(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&Ss(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function Ss(e,t){return As(e.prev,e,t.prev)<0&&As(t.next,e,e.next)<0}function Cs(e,t,n,r){let i=e;do i.z===0&&(i.z=Ts(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,ws(i)}function ws(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function Ts(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Es(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Ds(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Os(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&Ds(e,t,n,r,i,a,o,s)}function ks(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Fs(e,t)&&(Is(e,t)&&Is(t,e)&&Ls(e,t)&&(As(e.prev,e,t.prev)||As(e,t.prev,t))||js(e,t)&&As(e.prev,e,e.next)>0&&As(t.prev,t,t.next)>0)}function As(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function js(e,t){return e.x===t.x&&e.y===t.y}function Ms(e,t,n,r){let i=Ps(As(e,t,n)),a=Ps(As(e,t,r)),o=Ps(As(n,r,e)),s=Ps(As(n,r,t));return!!(i!==a&&o!==s||i===0&&Ns(e,n,t)||a===0&&Ns(e,r,t)||o===0&&Ns(n,e,r)||s===0&&Ns(n,t,r))}function Ns(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Ps(e){return e>0?1:e<0?-1:0}function Fs(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&Ms(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Is(e,t){return As(e.prev,e,e.next)<0?As(e,t,e.next)>=0&&As(e,e.prev,t)>=0:As(e,t,e.prev)<0||As(e,e.next,t)<0}function Ls(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Rs(e,t){let n=Vs(e.i,e.x,e.y),r=Vs(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function zs(e,t,n,r){let i=Vs(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Bs(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Vs(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Hs(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var Us=class{static triangulate(e,t,n=2){return us(e,t,n)}},Ws=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];Gs(e),Ks(n,e);let a=e.length;t.forEach(Gs);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,Ks(n,t[e]);let o=Us.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function Gs(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Ks(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var qs=class e extends Aa{constructor(e=new ls([new G(.5,.5),new G(-.5,.5),new G(-.5,-.5),new G(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new va(r,3)),this.setAttribute(`uv`,new va(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?Js:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new K,b=new K,x=new K}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!Ws.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];Ws.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));if(s<=10000000000000001e-36*c*c){e.splice(r,1),n--;continue}t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||U(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new G(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new G(r/a,i/a)}let j=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),j[e]=A(D[e],D[n],D[r]);let M=[],N,P=j.concat();for(let e=0,t=E;e<t;e++){let t=w[e];N=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),N[e]=A(t[e],t[r],t[i]);M.push(N),P=P.concat(N)}let ee;if(p===0)ee=Ws.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],j[t],a);F(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];N=M[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],N[e],a);F(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}ee=Ws.triangulateShape(e,t)}let te=ee.length,ne=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],P[e],ne):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),F(x.x,x.y,x.z)):F(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],P[t],ne):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),F(x.x,x.y,x.z)):F(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],j[e],r);F(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];N=M[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],N[e],r);_?F(i.x,i.y+g[s-1].y,g[s-1].x+n):F(i.x,i.y,c+n)}}}re(),ie();function re(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<te;e++){let n=ee[e];oe(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<te;e++){let n=ee[e];oe(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<te;e++){let t=ee[e];oe(t[2],t[1],t[0])}for(let e=0;e<te;e++){let t=ee[e];oe(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function ie(){let e=r.length/3,t=0;ae(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];ae(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function ae(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);se(t+r+n,t+i+n,t+i+a,t+r+a)}}}function F(e,t,n){a.push(e),a.push(t),a.push(n)}function oe(e,t,i){I(e),I(t),I(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);ce(o[0]),ce(o[1]),ce(o[2])}function se(e,t,i,a){I(e),I(t),I(a),I(t),I(i),I(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);ce(s[0]),ce(s[1]),ce(s[3]),ce(s[1]),ce(s[2]),ce(s[3])}function I(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function ce(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Ys(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new os[i.type]().fromJSON(i)),new e(r,t.options)}},Js={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new G(a,o),new G(s,c),new G(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new G(o,1-c),new G(l,1-d),new G(f,1-m),new G(h,1-_)]:[new G(s,1-c),new G(u,1-d),new G(p,1-m),new G(g,1-_)]}};function Ys(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var Xs=class e extends Aa{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new va(p,3)),this.setAttribute(`normal`,new va(m,3)),this.setAttribute(`uv`,new va(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Zs=class e extends Aa{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new K,p=new G;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new va(s,3)),this.setAttribute(`normal`,new va(c,3)),this.setAttribute(`uv`,new va(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Qs=class e extends Aa{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new K,d=new K,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new va(p,3)),this.setAttribute(`normal`,new va(m,3)),this.setAttribute(`uv`,new va(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function $s(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(tc(i))i.isRenderTargetTexture?(H(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(tc(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function ec(e){let t={};for(let n=0;n<e.length;n++){let r=$s(e[n]);for(let e in r)t[e]=r[e]}return t}function tc(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function nc(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function rc(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Lr.workingColorSpace}var ic={clone:$s,merge:ec},ac=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,oc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,sc=class extends Ia{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ac,this.fragmentShader=oc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$s(e.uniforms),this.uniformsGroups=nc(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new J().setHex(r.value);break;case`v2`:this.uniforms[n].value=new G().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new K().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Jr().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new q().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new $r().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},cc=class extends sc{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},lc=class extends Ia{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new J(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new G(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},uc=class extends Ia{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=nr,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},dc=class extends Ia{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function fc(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function pc(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var mc=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},hc=class extends mc{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:$n,endingEnd:$n}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case er:i=e,o=2*t-n;break;case tr:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case er:a=e,s=2*n-t;break;case tr:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},gc=class extends mc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},_c=class extends mc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},vc=class extends mc{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=xc(n,t,g,y,r);i[p]=yc(x,o,_,b,m)}return i}};function yc(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function bc(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function xc(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=yc(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=bc(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Sc=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=fc(t,this.TimeBufferType),this.values=fc(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:fc(e.times,Array),values:fc(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),pc(e.settings)&&(n.settings={inTangents:fc(e.settings.inTangents,Array),outTangents:fc(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new _c(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new gc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new hc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new vc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Yn:t=this.InterpolantFactoryMethodDiscrete;break;case Xn:t=this.InterpolantFactoryMethodLinear;break;case Zn:t=this.InterpolantFactoryMethodSmooth;break;case Qn:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return H(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Yn;case this.InterpolantFactoryMethodLinear:return Xn;case this.InterpolantFactoryMethodSmooth:return Zn;case this.InterpolantFactoryMethodBezier:return Qn}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;pc(this.settings)&&(Cc(this.settings.inTangents,e),Cc(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(U(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(U(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){U(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){U(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&fr(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){U(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Zn,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,pc(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Cc(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Sc.prototype.ValueTypeName=``,Sc.prototype.TimeBufferType=Float32Array,Sc.prototype.ValueBufferType=Float32Array,Sc.prototype.DefaultInterpolation=Xn;var wc=class extends Sc{constructor(e,t,n){super(e,t,n)}};wc.prototype.ValueTypeName=`bool`,wc.prototype.ValueBufferType=Array,wc.prototype.DefaultInterpolation=Yn,wc.prototype.InterpolantFactoryMethodLinear=void 0,wc.prototype.InterpolantFactoryMethodSmooth=void 0;var Tc=class extends Sc{constructor(e,t,n,r){super(e,t,n,r)}};Tc.prototype.ValueTypeName=`color`;var Ec=class extends Sc{constructor(e,t,n,r){super(e,t,n,r)}};Ec.prototype.ValueTypeName=`number`;var Dc=class extends mc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Ar.slerpFlat(i,0,a,c-o,a,c,s);return i}},Oc=class extends Sc{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Dc(this.times,this.values,this.getValueSize(),e)}};Oc.prototype.ValueTypeName=`quaternion`,Oc.prototype.InterpolantFactoryMethodSmooth=void 0;var kc=class extends Sc{constructor(e,t,n){super(e,t,n)}};kc.prototype.ValueTypeName=`string`,kc.prototype.ValueBufferType=Array,kc.prototype.DefaultInterpolation=Yn,kc.prototype.InterpolantFactoryMethodLinear=void 0,kc.prototype.InterpolantFactoryMethodSmooth=void 0;var Ac=class extends Sc{constructor(e,t,n,r){super(e,t,n,r)}};Ac.prototype.ValueTypeName=`vector`;var jc=class extends Ei{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new J(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Mc=class extends jc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Ei.DEFAULT_UP),this.updateMatrix(),this.groundColor=new J(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Nc=new $r,Pc=new K,Fc=new K,Ic=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new G(512,512),this.mapType=Ut,this.map=null,this.mapPass=null,this.matrix=new $r,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _o,this._frameExtents=new G(1,1),this._viewportCount=1,this._viewports=[new Jr(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Pc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Pc),Fc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Fc),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Nc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Nc,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Nc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Lc=new K,Rc=new Ar,zc=new K,Bc=class extends Ei{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new $r,this.projectionMatrix=new $r,this.projectionMatrixInverse=new $r,this.coordinateSystem=ur,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Lc,Rc,zc),zc.x===1&&zc.y===1&&zc.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lc,Rc,zc.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Lc,Rc,zc),zc.x===1&&zc.y===1&&zc.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lc,Rc,zc.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Vc=new K,Hc=new G,Uc=new G,Wc=class extends Bc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=wr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Cr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return wr*2*Math.atan(Math.tan(Cr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Vc.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vc.x,Vc.y).multiplyScalar(-e/Vc.z),Vc.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vc.x,Vc.y).multiplyScalar(-e/Vc.z)}getViewSize(e,t){return this.getViewBounds(e,Hc,Uc),t.subVectors(Uc,Hc)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Cr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Gc=class extends Bc{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Kc=class extends Ic{constructor(){super(new Gc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},qc=class extends jc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Ei.DEFAULT_UP),this.updateMatrix(),this.target=new Ei,this.shadow=new Kc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Jc=-90,Yc=1,Xc=class extends Ei{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Wc(Jc,Yc,e,t);r.layers=this.layers,this.add(r);let i=new Wc(Jc,Yc,e,t);i.layers=this.layers,this.add(i);let a=new Wc(Jc,Yc,e,t);a.layers=this.layers,this.add(a);let o=new Wc(Jc,Yc,e,t);o.layers=this.layers,this.add(o);let s=new Wc(Jc,Yc,e,t);s.layers=this.layers,this.add(s);let c=new Wc(Jc,Yc,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Zc=class extends Wc{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Qc=`\\[\\]\\.:\\/`,$c=RegExp(`[\\[\\]\\.:\\/]`,`g`),el=`[^\\[\\]\\.:\\/]`,tl=`[^`+Qc.replace(`\\.`,``)+`]`,nl=`((?:WC+[\\/:])*)`.replace(`WC`,el),rl=`(WCOD+)?`.replace(`WCOD`,tl),il=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,el),al=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,el),ol=RegExp(`^`+nl+rl+il+al+`$`),sl=[`material`,`materials`,`bones`,`map`],cl=class{constructor(e,t,n){let r=n||ll.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ll=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace($c,``)}static parseTrackName(e){let t=ol.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);sl.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){H(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){U(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){U(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){U(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){U(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){U(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;U(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ll.Composite=cl,ll.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ll.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ll.prototype.GetterByBindingType=[ll.prototype._getValue_direct,ll.prototype._getValue_array,ll.prototype._getValue_arrayElement,ll.prototype._getValue_toArray],ll.prototype.SetterByBindingTypeAndVersioning=[[ll.prototype._setValue_direct,ll.prototype._setValue_direct_setNeedsUpdate,ll.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ll.prototype._setValue_array,ll.prototype._setValue_array_setNeedsUpdate,ll.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ll.prototype._setValue_arrayElement,ll.prototype._setValue_arrayElement_setNeedsUpdate,ll.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ll.prototype._setValue_fromArray,ll.prototype._setValue_fromArray_setNeedsUpdate,ll.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],At=class{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}},At.prototype.isMatrix2=!0;function ul(e,t,n,r){let i=dl(r);switch(n){case nn:return e*t;case cn:return e*t/i.components*i.byteLength;case ln:return e*t/i.components*i.byteLength;case un:return e*t*2/i.components*i.byteLength;case dn:return e*t*2/i.components*i.byteLength;case rn:return e*t*3/i.components*i.byteLength;case an:return e*t*4/i.components*i.byteLength;case fn:return e*t*4/i.components*i.byteLength;case pn:case mn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case hn:case gn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case vn:case bn:return Math.max(e,16)*Math.max(t,8)/4;case _n:case yn:return Math.max(e,8)*Math.max(t,8)/2;case xn:case Sn:case wn:case Tn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Cn:case En:case Dn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case On:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case kn:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case An:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case jn:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Mn:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Nn:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Pn:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Fn:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case In:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Ln:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Rn:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case zn:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Bn:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Vn:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Hn:case Un:case Wn:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Gn:case Kn:return Math.ceil(e/4)*Math.ceil(t/4)*8;case qn:case Jn:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function dl(e){switch(e){case Ut:case Wt:return{byteLength:1,components:1};case Kt:case Gt:case Xt:return{byteLength:2,components:1};case Zt:case Qt:return{byteLength:2,components:4};case Jt:case qt:case Yt:return{byteLength:4,components:1};case en:case tn:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?H(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function fl(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function pl(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Y={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},X={common:{diffuse:{value:new J(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new q}},envmap:{envMap:{value:null},envMapRotation:{value:new q},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new q}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new q}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new q},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new q},normalScale:{value:new G(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new q},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new q}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new q}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new q}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new J(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new K},probesMax:{value:new K},probesResolution:{value:new K}},points:{diffuse:{value:new J(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0},uvTransform:{value:new q}},sprite:{diffuse:{value:new J(16777215)},opacity:{value:1},center:{value:new G(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}}},ml={basic:{uniforms:ec([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.fog]),vertexShader:Y.meshbasic_vert,fragmentShader:Y.meshbasic_frag},lambert:{uniforms:ec([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new J(0)},envMapIntensity:{value:1}}]),vertexShader:Y.meshlambert_vert,fragmentShader:Y.meshlambert_frag},phong:{uniforms:ec([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new J(0)},specular:{value:new J(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Y.meshphong_vert,fragmentShader:Y.meshphong_frag},standard:{uniforms:ec([X.common,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.roughnessmap,X.metalnessmap,X.fog,X.lights,{emissive:{value:new J(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag},toon:{uniforms:ec([X.common,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.gradientmap,X.fog,X.lights,{emissive:{value:new J(0)}}]),vertexShader:Y.meshtoon_vert,fragmentShader:Y.meshtoon_frag},matcap:{uniforms:ec([X.common,X.bumpmap,X.normalmap,X.displacementmap,X.fog,{matcap:{value:null}}]),vertexShader:Y.meshmatcap_vert,fragmentShader:Y.meshmatcap_frag},points:{uniforms:ec([X.points,X.fog]),vertexShader:Y.points_vert,fragmentShader:Y.points_frag},dashed:{uniforms:ec([X.common,X.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Y.linedashed_vert,fragmentShader:Y.linedashed_frag},depth:{uniforms:ec([X.common,X.displacementmap]),vertexShader:Y.depth_vert,fragmentShader:Y.depth_frag},normal:{uniforms:ec([X.common,X.bumpmap,X.normalmap,X.displacementmap,{opacity:{value:1}}]),vertexShader:Y.meshnormal_vert,fragmentShader:Y.meshnormal_frag},sprite:{uniforms:ec([X.sprite,X.fog]),vertexShader:Y.sprite_vert,fragmentShader:Y.sprite_frag},background:{uniforms:{uvTransform:{value:new q},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Y.background_vert,fragmentShader:Y.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new q}},vertexShader:Y.backgroundCube_vert,fragmentShader:Y.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Y.cube_vert,fragmentShader:Y.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Y.equirect_vert,fragmentShader:Y.equirect_frag},distance:{uniforms:ec([X.common,X.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Y.distance_vert,fragmentShader:Y.distance_frag},shadow:{uniforms:ec([X.lights,X.fog,{color:{value:new J(0)},opacity:{value:1}}]),vertexShader:Y.shadow_vert,fragmentShader:Y.shadow_frag}};ml.physical={uniforms:ec([ml.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new q},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new q},clearcoatNormalScale:{value:new G(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new q},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new q},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new q},sheen:{value:0},sheenColor:{value:new J(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new q},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new q},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new q},transmissionSamplerSize:{value:new G},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new q},attenuationDistance:{value:0},attenuationColor:{value:new J(0)},specularColor:{value:new J(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new q},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new q},anisotropyVector:{value:new G},anisotropyMap:{value:null},anisotropyMapTransform:{value:new q}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag};var hl={r:0,b:0,g:0},gl=new $r,_l=new q;_l.set(-1,0,0,0,1,0,0,0,1);function vl(e,t,n,r,i,a){let o=new J(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new eo(new Ao(1,1,1),new sc({name:`BackgroundCubeMaterial`,uniforms:$s(ml.backgroundCube.uniforms),vertexShader:ml.backgroundCube.vertexShader,fragmentShader:ml.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(gl.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(_l),l.material.toneMapped=Lr.getTransfer(i.colorSpace)!==or,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new eo(new Xs(2,2),new sc({name:`BackgroundMaterial`,uniforms:$s(ml.background.uniforms),vertexShader:ml.background.vertexShader,fragmentShader:ml.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Lr.getTransfer(i.colorSpace)!==or,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(hl,rc(e)),n.buffers.color.setClear(hl.r,hl.g,hl.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function yl(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function bl(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function xl(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(H(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&H(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Sl(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Pa,s=new q,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Cl=4,wl=6,Tl=20,El=256,Dl=new Gc,Ol=new J,kl=null,Al=0,jl=0,Ml=!1,Nl=new K,Pl=new K,Fl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Nl}=i;kl=this._renderer.getRenderTarget(),Al=this._renderer.getActiveCubeFace(),jl=this._renderer.getActiveMipmapLevel(),Ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(kl,Al,jl),this._renderer.xr.enabled=Ml,e.scissorTest=!1,Rl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),kl=this._renderer.getRenderTarget(),Al=this._renderer.getActiveCubeFace(),jl=this._renderer.getActiveMipmapLevel(),Ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:Xt,format:an,colorSpace:ir,depthBuffer:!1},r=Ll(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ll(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Il(r)),this._blurMaterial=Bl(r,e,t),this._ggxMaterial=zl(r,e,t)}return r}_compileMaterial(e){let t=new eo(new Aa,e);this._renderer.compile(t,Dl)}_sceneToCubeUV(e,t,n,r,i){let a=new Wc(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Ol),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new eo(new Ao,new Ha({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Ol),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Rl(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vl());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Rl(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Dl)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Cl?n-d+Cl:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Rl(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Dl),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Rl(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Dl)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Rl(t,3*l*(r>this._lodMax-Cl?r-this._lodMax+Cl:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Dl)}};function Il(e){let t=[],n=[],r=e,i=e-Cl+1+wl;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Pl.set(1,r,n):e===1?Pl.set(-n,1,-r):e===2?Pl.set(-n,r,1):e===3?Pl.set(-1,r,-n):e===4?Pl.set(-n,-1,r):Pl.set(n,r,-1),Pl.toArray(l,(e*6+t)*3)}}let u=new Aa;u.setAttribute(`position`,new ha(c,3)),u.setAttribute(`outputDirection`,new ha(l,3)),n.push(new eo(u,null)),r>Cl&&r--}return{lodMeshes:n,sizeLods:t}}function Ll(e,t,n){let r=new Xr(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Rl(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function zl(e,t,n){return new sc({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:El,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ul(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Bl(e,t,n){return new sc({name:`SphericalGaussianBlur`,defines:{SAMPLES:Tl,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ul(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Vl(){return new sc({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Ul(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Hl(){return new sc({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ul(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ul(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Wl=class extends Xr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new To(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ao(5,5,5),i=new sc({name:`CubemapFromEquirect`,uniforms:$s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new eo(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Bt),new Xc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Gl(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Wl(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Fl(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Fl(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Kl(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&vr(`WebGLRenderer: `+e+` extension not supported.`),t}}}function ql(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?_a:ga)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Jl(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Yl(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:U(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Xl(e,t,n){let r=new WeakMap,i=new Jr;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Zr(h,p,m,u);g.type=Yt,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new G(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Zl(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Ql={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function $l(e,t,n,r,i,a){let o=new Xr(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Aa;l.setAttribute(`position`,new va([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new va([0,2,0,0,2,0],2));let u=new cc({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new eo(l,u),f=new Gc(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new Xr(t,n,{type:Xt,depthBuffer:!1,stencilBuffer:!1}),c=new Xr(t,n,{type:Xt,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Lr.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Ql[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var eu=new qr,tu=new Do(1,1),nu=new Zr,ru=new Qr,iu=new To,au=[],ou=[],su=new Float32Array(16),cu=new Float32Array(9),lu=new Float32Array(4);function uu(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=au[i];if(a===void 0&&(a=new Float32Array(i),au[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function du(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function fu(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function pu(e,t){let n=ou[t];n===void 0&&(n=new Int32Array(t),ou[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function mu(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function hu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(du(n,t))return;e.uniform2fv(this.addr,t),fu(n,t)}}function gu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(du(n,t))return;e.uniform3fv(this.addr,t),fu(n,t)}}function _u(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(du(n,t))return;e.uniform4fv(this.addr,t),fu(n,t)}}function vu(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(du(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),fu(n,t)}else{if(du(n,r))return;lu.set(r),e.uniformMatrix2fv(this.addr,!1,lu),fu(n,r)}}function yu(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(du(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),fu(n,t)}else{if(du(n,r))return;cu.set(r),e.uniformMatrix3fv(this.addr,!1,cu),fu(n,r)}}function bu(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(du(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),fu(n,t)}else{if(du(n,r))return;su.set(r),e.uniformMatrix4fv(this.addr,!1,su),fu(n,r)}}function xu(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Su(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(du(n,t))return;e.uniform2iv(this.addr,t),fu(n,t)}}function Cu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(du(n,t))return;e.uniform3iv(this.addr,t),fu(n,t)}}function wu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(du(n,t))return;e.uniform4iv(this.addr,t),fu(n,t)}}function Tu(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Eu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(du(n,t))return;e.uniform2uiv(this.addr,t),fu(n,t)}}function Du(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(du(n,t))return;e.uniform3uiv(this.addr,t),fu(n,t)}}function Ou(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(du(n,t))return;e.uniform4uiv(this.addr,t),fu(n,t)}}function ku(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(tu.compareFunction=n.isReversedDepthBuffer()?518:515,a=tu):a=eu,n.setTexture2D(t||a,i)}function Au(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||ru,i)}function ju(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||iu,i)}function Mu(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||nu,i)}function Nu(e){switch(e){case 5126:return mu;case 35664:return hu;case 35665:return gu;case 35666:return _u;case 35674:return vu;case 35675:return yu;case 35676:return bu;case 5124:case 35670:return xu;case 35667:case 35671:return Su;case 35668:case 35672:return Cu;case 35669:case 35673:return wu;case 5125:return Tu;case 36294:return Eu;case 36295:return Du;case 36296:return Ou;case 35678:case 36198:case 36298:case 36306:case 35682:return ku;case 35679:case 36299:case 36307:return Au;case 35680:case 36300:case 36308:case 36293:return ju;case 36289:case 36303:case 36311:case 36292:return Mu}}function Pu(e,t){e.uniform1fv(this.addr,t)}function Fu(e,t){let n=uu(t,this.size,2);e.uniform2fv(this.addr,n)}function Iu(e,t){let n=uu(t,this.size,3);e.uniform3fv(this.addr,n)}function Lu(e,t){let n=uu(t,this.size,4);e.uniform4fv(this.addr,n)}function Ru(e,t){let n=uu(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function zu(e,t){let n=uu(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Bu(e,t){let n=uu(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Vu(e,t){e.uniform1iv(this.addr,t)}function Hu(e,t){e.uniform2iv(this.addr,t)}function Uu(e,t){e.uniform3iv(this.addr,t)}function Wu(e,t){e.uniform4iv(this.addr,t)}function Gu(e,t){e.uniform1uiv(this.addr,t)}function Ku(e,t){e.uniform2uiv(this.addr,t)}function qu(e,t){e.uniform3uiv(this.addr,t)}function Ju(e,t){e.uniform4uiv(this.addr,t)}function Yu(e,t,n){let r=this.cache,i=t.length,a=pu(n,i);du(r,a)||(e.uniform1iv(this.addr,a),fu(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?tu:eu;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Xu(e,t,n){let r=this.cache,i=t.length,a=pu(n,i);du(r,a)||(e.uniform1iv(this.addr,a),fu(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||ru,a[e])}function Zu(e,t,n){let r=this.cache,i=t.length,a=pu(n,i);du(r,a)||(e.uniform1iv(this.addr,a),fu(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||iu,a[e])}function Qu(e,t,n){let r=this.cache,i=t.length,a=pu(n,i);du(r,a)||(e.uniform1iv(this.addr,a),fu(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||nu,a[e])}function $u(e){switch(e){case 5126:return Pu;case 35664:return Fu;case 35665:return Iu;case 35666:return Lu;case 35674:return Ru;case 35675:return zu;case 35676:return Bu;case 5124:case 35670:return Vu;case 35667:case 35671:return Hu;case 35668:case 35672:return Uu;case 35669:case 35673:return Wu;case 5125:return Gu;case 36294:return Ku;case 36295:return qu;case 36296:return Ju;case 35678:case 36198:case 36298:case 36306:case 35682:return Yu;case 35679:case 36299:case 36307:return Xu;case 35680:case 36300:case 36308:case 36293:return Zu;case 36289:case 36303:case 36311:case 36292:return Qu}}var ed=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Nu(t.type)}},td=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=$u(t.type)}},nd=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},rd=/(\w+)(\])?(\[|\.)?/g;function id(e,t){e.seq.push(t),e.map[t.id]=t}function ad(e,t,n){let r=e.name,i=r.length;for(rd.lastIndex=0;;){let a=rd.exec(r),o=rd.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){id(n,l===void 0?new ed(s,e,t):new td(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new nd(s),id(n,e)),n=e}}}var od=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);ad(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function sd(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var cd=37297,ld=0;function ud(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var dd=new q;function fd(e){Lr._getMatrix(dd,Lr.workingColorSpace,e);let t=`mat3( ${dd.elements.map(e=>e.toFixed(4))} )`;switch(Lr.getTransfer(e)){case ar:return[t,`LinearTransferOETF`];case or:return[t,`sRGBTransferOETF`];default:return H(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function pd(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+ud(e.getShaderSource(t),r)}return i}function md(e,t){let n=fd(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var hd={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function gd(e,t){let n=hd[t];return n===void 0?(H(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var _d=new K;function vd(){return Lr.getLuminanceCoefficients(_d),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${_d.x.toFixed(4)}, ${_d.y.toFixed(4)}, ${_d.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function yd(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Sd).join(`
`)}function bd(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function xd(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Sd(e){return e!==``}function Cd(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function wd(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Td=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ed(e){return e.replace(Td,Od)}var Dd=new Map;function Od(e,t){let n=Y[t];if(n===void 0){let e=Dd.get(t);if(e!==void 0)n=Y[e],H(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Ed(n)}var kd=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ad(e){return e.replace(kd,jd)}function jd(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Md(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var Nd={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Pd(e){return Nd[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Fd={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Id(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Fd[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Ld={302:`ENVMAP_MODE_REFRACTION`};function Rd(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Ld[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var zd={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Bd(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:zd[e.combine]||`ENVMAP_BLENDING_NONE`}function Vd(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Hd(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Pd(n),l=Id(n),u=Rd(n),d=Bd(n),f=Vd(n),p=yd(n),m=bd(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Sd).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Sd).join(`
`),_.length>0&&(_+=`
`)):(g=[Md(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Sd).join(`
`),_=[Md(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Y.tonemapping_pars_fragment,n.toneMapping===0?``:gd(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Y.colorspace_pars_fragment,md(`linearToOutputTexel`,n.outputColorSpace),vd(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Sd).join(`
`)),o=Ed(o),o=Cd(o,n),o=wd(o,n),s=Ed(s),s=Cd(s,n),s=wd(s,n),o=Ad(o),s=Ad(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=sd(i,i.VERTEX_SHADER,y),S=sd(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=pd(i,x,`vertex`),n=pd(i,S,`fragment`);U(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):H(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new od(i,h),T=xd(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,cd)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=ld++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Ud=0,Wd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Gd(e),t.set(e,n)),n}},Gd=class{constructor(e){this.id=Ud++,this.code=e,this.usedTimes=0}};function Kd(e){return e===1030||e===37490||e===36285}function qd(e,t,n,r,i,a){let o=new ui,s=new Wd,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&H(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=ml[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,P=h.isBatchedMesh===!0,ee=!!i.map,te=!!i.matcap,ne=!!x,re=!!i.aoMap,ie=!!i.lightMap,ae=!!i.bumpMap&&i.wireframe===!1,F=!!i.normalMap,oe=!!i.displacementMap,se=!!i.emissiveMap,I=!!i.metalnessMap,ce=!!i.roughnessMap,le=i.anisotropy>0,ue=i.clearcoat>0,de=i.dispersion>0,fe=i.retroreflectivity>0,pe=i.iridescence>0,me=i.sheen>0,he=i.transmission>0,ge=le&&!!i.anisotropyMap,_e=ue&&!!i.clearcoatMap,ve=ue&&!!i.clearcoatNormalMap,ye=ue&&!!i.clearcoatRoughnessMap,be=pe&&!!i.iridescenceMap,L=pe&&!!i.iridescenceThicknessMap,R=me&&!!i.sheenColorMap,xe=me&&!!i.sheenRoughnessMap,Se=!!i.specularMap,z=!!i.specularColorMap,Ce=!!i.specularIntensityMap,B=he&&!!i.transmissionMap,V=he&&!!i.thicknessMap,we=!!i.gradientMap,Te=!!i.alphaMap,Ee=i.alphaTest>0,De=!!i.alphaHash,Oe=!!i.extensions,ke=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(ke=e.toneMapping);let Ae={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:P,batchingColor:P&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Lr.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ee,matcap:te,envMap:ne,envMapMode:ne&&x.mapping,envMapCubeUVHeight:S,aoMap:re,lightMap:ie,bumpMap:ae,normalMap:F,displacementMap:oe,emissiveMap:se,normalMapObjectSpace:F&&i.normalMapType===1,normalMapTangentSpace:F&&i.normalMapType===0,packedNormalMap:F&&i.normalMapType===0&&Kd(i.normalMap.format),metalnessMap:I,roughnessMap:ce,anisotropy:le,anisotropyMap:ge,clearcoat:ue,clearcoatMap:_e,clearcoatNormalMap:ve,clearcoatRoughnessMap:ye,dispersion:de,retroreflection:fe,iridescence:pe,iridescenceMap:be,iridescenceThicknessMap:L,sheen:me,sheenColorMap:R,sheenRoughnessMap:xe,specularMap:Se,specularColorMap:z,specularIntensityMap:Ce,transmission:he,transmissionMap:B,thicknessMap:V,gradientMap:we,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Te,alphaTest:Ee,alphaHash:De,combine:i.combine,mapUv:ee&&m(i.map.channel),aoMapUv:re&&m(i.aoMap.channel),lightMapUv:ie&&m(i.lightMap.channel),bumpMapUv:ae&&m(i.bumpMap.channel),normalMapUv:F&&m(i.normalMap.channel),displacementMapUv:oe&&m(i.displacementMap.channel),emissiveMapUv:se&&m(i.emissiveMap.channel),metalnessMapUv:I&&m(i.metalnessMap.channel),roughnessMapUv:ce&&m(i.roughnessMap.channel),anisotropyMapUv:ge&&m(i.anisotropyMap.channel),clearcoatMapUv:_e&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ve&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:L&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:R&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:xe&&m(i.sheenRoughnessMap.channel),specularMapUv:Se&&m(i.specularMap.channel),specularColorMapUv:z&&m(i.specularColorMap.channel),specularIntensityMapUv:Ce&&m(i.specularIntensityMap.channel),transmissionMapUv:B&&m(i.transmissionMap.channel),thicknessMapUv:V&&m(i.thicknessMap.channel),alphaMapUv:Te&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(F||le),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(ee||Te),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&F===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:ke,decodeVideoTexture:ee&&i.map.isVideoTexture===!0&&Lr.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:se&&i.emissiveMap.isVideoTexture===!0&&Lr.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Oe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Oe&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ae.vertexUv1s=c.has(1),Ae.vertexUv2s=c.has(2),Ae.vertexUv3s=c.has(3),c.clear(),Ae}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=ml[t];n=ic.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Hd(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Jd(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Yd(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Xd(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Zd(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Yd),r.length>1&&r.sort(t||Xd),i.length>1&&i.sort(t||Xd)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Qd(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Zd,e.set(t,[i])):n>=r.length?(i=new Zd,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function $d(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new K,color:new J};break;case`SpotLight`:n={position:new K,direction:new K,color:new J,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new K,color:new J,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new K,skyColor:new J,groundColor:new J};break;case`RectAreaLight`:n={color:new J,position:new K,halfWidth:new K,halfHeight:new K}}return e[t.id]=n,n}}}function ef(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var tf=0;function nf(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function rf(e){let t=new $d,n=ef(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new K);let i=new K,a=new $r,o=new $r;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(nf);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=X.LTC_FLOAT_1,r.rectAreaLTC2=X.LTC_FLOAT_2):(r.rectAreaLTC1=X.LTC_HALF_1,r.rectAreaLTC2=X.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=tf++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function af(e){let t=new rf(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function of(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new af(e),t.set(n,[a])):r>=i.length?(a=new af(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var sf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,cf=`uniform sampler2D shadow_pass;
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
}`,lf=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],uf=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],df=new $r,ff=new K,pf=new K;function mf(e,t,n){let r=new _o,i=new G,a=new G,o=new Jr,s=new uc,c=new dc,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new sc({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new G},radius:{value:4}},vertexShader:sf,fragmentShader:cf}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Aa;m.setAttribute(`position`,new ha(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new eo(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(H(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){H(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){H(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Xr(i.x,i.y,{format:un,type:Xt,minFilter:Bt,magFilter:Bt,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Do(i.x,i.y,Yt),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=on,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Lt,d.map.depthTexture.magFilter=Lt}else l.isPointLight?(d.map=new Wl(i.x),d.map.depthTexture=new Oo(i.x,Jt)):(d.map=new Xr(i.x,i.y),d.map.depthTexture=new Do(i.x,i.y,Jt)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=on,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=Bt,d.map.depthTexture.magFilter=Bt):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Lt,d.map.depthTexture.magFilter=Lt);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),ff.setFromMatrixPosition(l.matrixWorld),e.position.copy(ff),pf.copy(e.position),pf.add(lf[t]),e.up.copy(uf[t]),e.lookAt(pf),e.updateMatrixWorld(),n.makeTranslation(-ff.x,-ff.y,-ff.z),df.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(df,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new Xr(i.x,i.y,{format:un,type:Xt}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function hf(e,t){function n(){let t=!1,n=new Jr,r=null,i=new Jr(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?I(e.DEPTH_TEST):ce(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=br[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?I(e.STENCIL_TEST):ce(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,ee=e.getParameter(e.VERSION);ee.indexOf(`WebGL`)===-1?ee.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(ee)[1]),N=P>=1);let te=null,ne={},re=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new Jr().fromArray(re),F=new Jr().fromArray(ie);function oe(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let se={};se[e.TEXTURE_2D]=oe(e.TEXTURE_2D,e.TEXTURE_2D,1),se[e.TEXTURE_CUBE_MAP]=oe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[e.TEXTURE_2D_ARRAY]=oe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),se[e.TEXTURE_3D]=oe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),I(e.DEPTH_TEST),o.setFunc(3),ge(!1),_e(1),I(e.CULL_FACE),me(0);function I(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ce(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function le(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ue(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function de(t){return h!==t&&(e.useProgram(t),h=t,!0)}let fe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};fe[103]=e.MIN,fe[104]=e.MAX;let pe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function me(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(ce(e.BLEND),g=!1);return}if(g===!1&&(I(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:U(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:U(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:U(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:U(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a=a||n,o=o||r,s=s||i,(n!==v||a!==x)&&(e.blendEquationSeparate(fe[n],fe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(pe[r],pe[i],pe[o],pe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function he(t,n){t.side===2?ce(e.CULL_FACE):I(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ge(r),t.blending===1&&t.transparent===!1?me(0):me(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ye(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?I(e.SAMPLE_ALPHA_TO_COVERAGE):ce(e.SAMPLE_ALPHA_TO_COVERAGE)}function ge(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function _e(t){t===0?ce(e.CULL_FACE):(I(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ve(t){t!==k&&(N&&e.lineWidth(t),k=t)}function ye(t,n,r){t?(I(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ce(e.POLYGON_OFFSET_FILL)}function be(t){t?I(e.SCISSOR_TEST):ce(e.SCISSOR_TEST)}function L(t){t===void 0&&(t=e.TEXTURE0+M-1),te!==t&&(e.activeTexture(t),te=t)}function R(t,n,r){r===void 0&&(r=te===null?e.TEXTURE0+M-1:te);let i=ne[r];i===void 0&&(i={type:void 0,texture:void 0},ne[r]=i),(i.type!==t||i.texture!==n)&&(te!==r&&(e.activeTexture(r),te=r),e.bindTexture(t,n||se[t]),i.type=t,i.texture=n)}function xe(){let t=ne[te];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Se(){try{e.compressedTexImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function z(){try{e.compressedTexImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ce(){try{e.texSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function B(){try{e.texSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function V(){try{e.compressedTexSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function we(){try{e.compressedTexSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Te(){try{e.texStorage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ee(){try{e.texStorage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function De(){try{e.texImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Oe(){try{e.texImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function ke(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ae(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function je(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function Me(t){F.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),F.copy(t))}function Ne(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Pe(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Fe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},te=null,ne={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ae.set(0,0,e.canvas.width,e.canvas.height),F.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:I,disable:ce,bindFramebuffer:le,drawBuffers:ue,useProgram:de,setBlending:me,setMaterial:he,setFlipSided:ge,setCullFace:_e,setLineWidth:ve,setPolygonOffset:ye,setScissorTest:be,activeTexture:L,bindTexture:R,unbindTexture:xe,compressedTexImage2D:Se,compressedTexImage3D:z,texImage2D:De,texImage3D:Oe,pixelStorei:Ae,getParameter:ke,updateUBOMapping:Ne,uniformBlockBinding:Pe,texStorage2D:Te,texStorage3D:Ee,texSubImage2D:Ce,texSubImage3D:B,compressedTexSubImage2D:V,compressedTexSubImage3D:we,scissor:je,viewport:Me,reset:Fe}}function gf(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new G,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):pr(`canvas`)}function g(e,t,n){let r=1,i=Se(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),H(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&H(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];H(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||H(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?ar:Lr.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,H(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function j(e){O=e}function M(){let e=O;return e>=i.maxTextures&&H(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function N(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function P(t,i){let a=r.get(t);if(t.isVideoTexture&&R(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)H(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)H(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ce(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function ee(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){ce(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function te(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){ce(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ne(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){le(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let re={[Pt]:e.REPEAT,[Ft]:e.CLAMP_TO_EDGE,[It]:e.MIRRORED_REPEAT},ie={[Lt]:e.NEAREST,[Rt]:e.NEAREST_MIPMAP_NEAREST,[zt]:e.NEAREST_MIPMAP_LINEAR,[Bt]:e.LINEAR,[Vt]:e.LINEAR_MIPMAP_NEAREST,[Ht]:e.LINEAR_MIPMAP_LINEAR},ae={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function F(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&H(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,re[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,re[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,re[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ie[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ie[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ae[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function oe(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=N(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function se(e,t,n){return Math.floor(Math.floor(e/n)/t)}function I(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=se(n.start,r.width,4),c=se(t.start,r.width,4);n.start<=i+1&&a===c&&se(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function ce(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=oe(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Lr.getPrimaries(Lr.workingColorSpace),r=o.colorSpace===``?null:Lr.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=xe(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);F(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===sn,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&I(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=ul(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=ul(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=Se(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=Se(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function le(t,o,s){if(o.image.length!==6)return;let c=oe(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Lr.getPrimaries(Lr.workingColorSpace),r=o.colorSpace===``?null:Lr.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=xe(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);F(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=Se(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ue(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),L(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,be(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function de(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;L(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,be(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,be(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);L(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,be(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,be(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function fe(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),F(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else P(i.depthTexture,0);let u=l.__webglTexture,d=be(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)L(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)L(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function pe(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)fe(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?fe(i.__webglFramebuffer[0],t,0):fe(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),de(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),de(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function me(t,n,i){let a=r.get(t);n!==void 0&&ue(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&pe(t)}function he(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&L(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=be(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),de(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),F(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)ue(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else ue(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),F(c,a),ue(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),F(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)ue(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else ue(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&pe(t)}function ge(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let _e=[],ve=[];function ye(t){if(t.samples>0){if(L(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(_e.length=0,ve.length=0,_e.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(_e.push(l),ve.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,ve)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,_e))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function be(e){return Math.min(i.maxSamples,e.samples)}function L(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function R(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function xe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Lr.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&H(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):U(`WebGLTextures: Unsupported texture color space:`,n)),t}function Se(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=M,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=j,this.setTexture2D=P,this.setTexture2DArray=ee,this.setTexture3D=te,this.setTextureCube=ne,this.rebindTextures=me,this.setupRenderTarget=he,this.updateRenderTargetMipmap=ge,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=L,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function _f(e,t){function n(n,r=``){let i,a=Lr.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var vf=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yf=`
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

}`,bf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ko(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new sc({vertexShader:vf,fragmentShader:yf,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new eo(new Xs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},xf=class extends xr{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new bf,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new G,C=null,w=null,T=new Wc;T.viewport=new Jr;let E=new Wc;E.viewport=new Jr;let D=[T,E],O=new Zc,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new ki,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new ki,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new ki,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function M(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,M),r.removeEventListener(`inputsourceschange`,N);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,F.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,M),r.addEventListener(`inputsourceschange`,N),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?sn:on,a=_.stencil?$t:Jt);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Xr(d.textureWidth,d.textureHeight,{format:an,type:Ut,depthTexture:new Do(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Xr(f.framebufferWidth,f.framebufferHeight,{format:an,type:Ut,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),F.setContext(r),F.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function N(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let P=new K,ee=new K;function te(e,t,n){P.setFromMatrixPosition(t.matrixWorld),ee.setFromMatrixPosition(n.matrixWorld);let r=P.distanceTo(ee),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ne(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;ne(O,i);for(let e=0;e<a.length;e++)ne(a[e],i);a.length===2?te(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),re(e,O,i)};function re(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=wr*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let ie=null;function ae(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Wc,o.layers.enable(n),o.viewport=new Jr,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new ko,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ie&&ie(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let F=new fl;F.setAnimationLoop(ae),this.setAnimationLoop=function(e){ie=e},this.dispose=function(){}}},Sf=new $r,Cf=new q;Cf.set(-1,0,0,0,1,0,0,0,1);function wf(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,rc(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Sf.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Cf),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Tf(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return U(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?H(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):H(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Ef=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Df=null;function Of(){return Df===null&&(Df=new ro(Ef,16,16,un,Xt),Df.name=`DFG_LUT`,Df.minFilter=Bt,Df.magFilter=Bt,Df.wrapS=Ft,Df.wrapT=Ft,Df.generateMipmaps=!1,Df.needsUpdate=!0),Df}var kf=class{constructor(e={}){let{canvas:t=mr(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Ut}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([fn,dn,ln]),g=new Set([Ut,Jt,Kt,$t,Zt,Qt]),_=new Uint32Array(4),v=new Int32Array(4),y=new K,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=rr;let j=0,M=0,N=null,P=-1,ee=null,te=new Jr,ne=new Jr,re=null,ie=new J(0),ae=0,F=t.width,oe=t.height,se=1,I=null,ce=null,le=new Jr(0,0,F,oe),ue=new Jr(0,0,F,oe),de=!1,fe=new _o,pe=!1,me=!1,he=new $r,ge=new K,_e=new Jr,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ye=!1;function be(){return N===null?se:1}let L=n;function R(e,n){return t.getContext(e,n)}let xe,Se,z,Ce,B,V,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,Ue,!1),t.addEventListener(`webglcontextrestored`,We,!1),t.addEventListener(`webglcontextcreationerror`,Ge,!1),L===null){let t=`webgl2`;if(L=R(t,e),L===null)throw R(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Ve()}catch(e){throw t.removeEventListener(`webglcontextlost`,Ue,!1),t.removeEventListener(`webglcontextrestored`,We,!1),t.removeEventListener(`webglcontextcreationerror`,Ge,!1),U(`WebGLRenderer: `+e.message),e}function Ve(){xe=new Kl(L),xe.init(),Re=new _f(L,xe),Se=new xl(L,xe,e,Re),z=new hf(L,xe),Se.reversedDepthBuffer&&d&&z.buffers.depth.setReversed(!0),O=L.createFramebuffer(),k=L.createFramebuffer(),A=L.createFramebuffer(),Ce=new Yl(L),B=new Jd,V=new gf(L,xe,z,B,Se,Re,Ce),we=new Gl(T),Te=new pl(L),ze=new yl(L,Te),Ee=new ql(L,Te,Ce,ze),De=new Zl(L,Ee,Te,ze,Ce),Fe=new Xl(L,Se,V),Me=new Sl(B),Oe=new qd(T,we,xe,Se,ze,Me),ke=new wf(T,B),Ae=new Qd,je=new of(xe),Pe=new vl(T,we,z,De,p,s),Ne=new mf(T,De,Se),Be=new Tf(L,Ce,Se,z),Ie=new bl(L,xe,Ce),Le=new Jl(L,xe,Ce),Ce.programs=Oe.programs,T.capabilities=Se,T.extensions=xe,T.properties=B,T.renderLists=Ae,T.shadowMap=Ne,T.state=z,T.info=Ce}m!==1009&&(w=new $l(m,t.width,t.height,o,r,i));let He=new xf(T,L);this.xr=He,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let e=xe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=xe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(e){e!==void 0&&(se=e,this.setSize(F,oe,!1))},this.getSize=function(e){return e.set(F,oe)},this.setSize=function(e,n,r=!0){if(He.isPresenting){H(`WebGLRenderer: Can't change size while VR device is presenting.`);return}F=e,oe=n,t.width=Math.floor(e*se),t.height=Math.floor(n*se),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(F*se,oe*se).floor()},this.setDrawingBufferSize=function(e,n,r){F=e,oe=n,se=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){U(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){H(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(te)},this.getViewport=function(e){return e.copy(le)},this.setViewport=function(e,t,n,r){e.isVector4?le.set(e.x,e.y,e.z,e.w):le.set(e,t,n,r),z.viewport(te.copy(le).multiplyScalar(se).round())},this.getScissor=function(e){return e.copy(ue)},this.setScissor=function(e,t,n,r){e.isVector4?ue.set(e.x,e.y,e.z,e.w):ue.set(e,t,n,r),z.scissor(ne.copy(ue).multiplyScalar(se).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(e){z.setScissorTest(de=e)},this.setOpaqueSort=function(e){I=e},this.setTransparentSort=function(e){ce=e},this.getClearColor=function(e){return e.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor(...arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=Pe.getClearColor(),r=Pe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,L.clearBufferuiv(L.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,L.clearBufferiv(L.COLOR,0,v))}else r|=L.COLOR_BUFFER_BIT}t&&(r|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&L.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Ue,!1),t.removeEventListener(`webglcontextrestored`,We,!1),t.removeEventListener(`webglcontextcreationerror`,Ge,!1),Pe.dispose(),Ae.dispose(),je.dispose(),B.dispose(),we.dispose(),De.dispose(),ze.dispose(),Be.dispose(),Oe.dispose(),He.dispose(),He.removeEventListener(`sessionstart`,Qe),He.removeEventListener(`sessionend`,$e),et.stop()};function Ue(e){e.preventDefault(),gr(`WebGLRenderer: Context Lost.`),E=!0}function We(){gr(`WebGLRenderer: Context Restored.`),E=!1;let e=Ce.autoReset,t=Ne.enabled,n=Ne.autoUpdate,r=Ne.needsUpdate,i=Ne.type;Ve(),Ce.autoReset=e,Ne.enabled=t,Ne.autoUpdate=n,Ne.needsUpdate=r,Ne.type=i}function Ge(e){U(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Ke(e){let t=e.target;t.removeEventListener(`dispose`,Ke),qe(t)}function qe(e){Je(e),B.remove(e)}function Je(e){let t=B.get(e).programs;t!==void 0&&(t.forEach(function(e){Oe.releaseProgram(e)}),e.isShaderMaterial&&Oe.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ve);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=ut(e,t,n,r,i);z.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ee.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;ze.setup(i,r,s,n,c);let h,g=Ie;if(c!==null&&(h=Te.get(c),g=Le,g.setIndex(h)),i.isMesh)r.wireframe===!0?(z.setLineWidth(r.wireframeLinewidth*be()),g.setMode(L.LINES)):g.setMode(L.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),z.setLineWidth(e*be()),i.isLineSegments?g.setMode(L.LINES):i.isLineLoop?g.setMode(L.LINE_LOOP):g.setMode(L.LINE_STRIP)}else i.isPoints?g.setMode(L.POINTS):i.isSprite&&g.setMode(L.TRIANGLES);if(i.isBatchedMesh){if(xe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Te.get(c).bytesPerElement:1,o=B.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(L,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Ye(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),pe===!0&&Me.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,ot(e,t,r),e.side=0,e.needsUpdate=!0,ot(e,t,r),e.side=2):ot(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=je.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),me=this.localClippingEnabled,pe=Me.init(this.clippingPlanes,me),pe===!0&&Me.setGlobalState(this.clippingPlanes,t),D!==null&&Ne.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];Ye(o,n,t,e),r.add(o)}else Ye(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=B.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}xe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Xe=null;function Ze(e){Xe&&Xe(e)}function Qe(){et.stop()}function $e(){et.start()}let et=new fl;et.setAnimationLoop(Ze),typeof self<`u`&&et.setContext(self),this.setAnimationLoop=function(e){Xe=e,He.setAnimationLoop(e),e===null?et.stop():et.start()},He.addEventListener(`sessionstart`,Qe),He.addEventListener(`sessionend`,$e),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){U(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=He.enabled===!0&&He.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),He.enabled===!0&&He.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(He.cameraAutoUpdate===!0&&He.updateCamera(t),t=He.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=je.get(e,C.length),x.init(t),x.state.textureUnits=V.getTextureUnits(),C.push(x),he.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),fe.setFromProjectionMatrix(he,ur,t.reversedDepth),me=this.localClippingEnabled,pe=Me.init(this.clippingPlanes,me),b=Ae.get(e,S.length),b.init(),S.push(b),He.enabled===!0&&He.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&tt(e,t,-1/0,T.sortObjects)}tt(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(I,ce),ye=He.enabled===!1||He.isPresenting===!1||He.hasDepthSensing()===!1,ye&&Pe.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),pe===!0&&Me.beginShadows();let i=x.state.shadowsArray;if(Ne.render(i,e,t),pe===!0&&Me.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];rt(n,r,e,a)}ye&&Pe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];nt(b,e,n,n.viewport)}}else r.length>0&&rt(n,r,e,t),ye&&Pe.render(e),nt(b,e,t)}N!==null&&M===0&&(V.updateMultisampleRenderTarget(N),V.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),ze.resetDefaultState(),P=-1,ee=null,C.pop(),C.length>0?(x=C[C.length-1],V.setTextureUnits(x.state.textureUnits),pe===!0&&Me.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function tt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(fe)){r&&_e.setFromMatrixPosition(e.matrixWorld).applyMatrix4(he);let i=De.update(e),a=e.material;a.visible&&b.push(e,i,a,n,_e.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(fe))){let i=De.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),_e.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),_e.copy(e.boundingSphere.center)),_e.applyMatrix4(e.matrixWorld).applyMatrix4(he)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,_e.z,s,t)}}else a.visible&&b.push(e,i,a,n,_e.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)tt(i[e],t,n,r)}function nt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),pe===!0&&Me.setGlobalState(T.clippingPlanes,n),r&&z.viewport(te.copy(r)),i.length>0&&it(i,t,n),a.length>0&&it(a,t,n),o.length>0&&it(o,t,n),z.buffers.depth.setTest(!0),z.buffers.depth.setMask(!0),z.buffers.color.setMask(!0),z.setPolygonOffset(!1)}function rt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=xe.has(`EXT_color_buffer_half_float`)||xe.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Xr(1,1,{generateMipmaps:!0,type:e?Xt:Ut,minFilter:Ht,samples:Math.max(4,Se.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Lr.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||te;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ie),ae=T.getClearAlpha(),ae<1&&T.setClearColor(16777215,.5),T.clear(),ye&&Pe.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),pe===!0&&Me.setGlobalState(T.clippingPlanes,r),it(e,n,r),V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a),xe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,at(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ie,ae),d!==void 0&&(r.viewport=d),T.toneMapping=u}function it(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&at(o,t,n,s,l,c)}}function at(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function ot(e,t,n){t.isScene!==!0&&(t=ve);let r=B.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Oe.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Oe.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=we.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Ke),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return ct(e,s),d}else s.uniforms=Oe.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Oe.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Me.uniform),ct(e,s),r.needsLights=ft(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function st(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=od.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function ct(e,t){let n=B.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function lt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function ut(e,t,n,r,i){t.isScene!==!0&&(t=ve),V.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Lr.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=we.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=B.get(r),y=x.state.lights;if(pe===!0&&(me===!0||e!==ee)){let t=e===ee&&r.id===P;Me.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Me.numPlanes||v.numIntersection!==Me.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=ot(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(z.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==P&&(P=r.id,w=!0),v.needsLights){let e=lt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||ee!==e){z.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(L,`projectionMatrix`,e.projectionMatrix),O.setValue(L,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(L,ge.setFromMatrixPosition(e.matrixWorld)),Se.logarithmicDepthBuffer&&O.setValue(L,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(L,`isOrthographic`,e.isOrthographicCamera===!0),ee!==e&&(ee=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(L,`sunShadowMap`,y.state.sunShadowMap,V),y.state.directionalShadowMap.length>0&&O.setValue(L,`directionalShadowMap`,y.state.directionalShadowMap,V),y.state.spotShadowMap.length>0&&O.setValue(L,`spotShadowMap`,y.state.spotShadowMap,V),y.state.pointShadowMap.length>0&&O.setValue(L,`pointShadowMap`,y.state.pointShadowMap,V)),i.isSkinnedMesh){O.setOptional(L,i,`bindMatrix`),O.setOptional(L,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(L,`boneTexture`,e.boneTexture,V))}i.isBatchedMesh&&(O.setOptional(L,i,`batchingTexture`),O.setValue(L,`batchingTexture`,i._matricesTexture,V),O.setOptional(L,i,`batchingIdTexture`),O.setValue(L,`batchingIdTexture`,i._indirectTexture,V),O.setOptional(L,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(L,`batchingColorTexture`,i._colorsTexture,V));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Fe.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(L,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Of()),w){if(O.setValue(L,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&dt(k,E),a&&r.fog===!0&&ke.refreshFogUniforms(k,a),ke.refreshMaterialUniforms(k,r,se,oe,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}od.upload(L,st(v),k,V)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(od.upload(L,st(v),k,V),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(L,`center`,i.center),O.setValue(L,`modelViewMatrix`,i.modelViewMatrix),O.setValue(L,`normalMatrix`,i.normalMatrix),O.setValue(L,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Be.update(n,S),Be.bind(n,S)}}return S}function dt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function ft(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=B.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),B.get(e.texture).__webglTexture=t,B.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=B.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,j=t,M=n;let r=null,i=!1,a=!1;if(e){let o=B.get(e);if(o.__useDefaultFramebuffer!==void 0){z.bindFramebuffer(L.FRAMEBUFFER,o.__webglFramebuffer),te.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest,z.viewport(te),z.scissor(ne),z.setScissorTest(re),P=-1;return}if(o.__webglFramebuffer===void 0)V.setupRenderTarget(e);else if(o.__hasExternalTextures)V.rebindTextures(e,B.get(e.texture).__webglTexture,B.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&B.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);V.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=B.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&V.useMultisampledRTT(e)===!1?B.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,te.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest}else te.copy(le).multiplyScalar(se).floor(),ne.copy(ue).multiplyScalar(se).floor(),re=de;if(n!==0&&(r=O),z.bindFramebuffer(L.FRAMEBUFFER,r)&&z.drawBuffers(e,r),z.viewport(te),z.scissor(ne),z.setScissorTest(re),i){let r=B.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=B.get(e.textures[t]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=B.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,t.__webglTexture,n)}P=-1};function pt(e){let t=B.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Se.textureFormatReadable(e.format),t.__typeReadable=Se.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){z.bindFramebuffer(L.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s);let u=pt(o);if(u.__formatReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&L.readPixels(t,n,r,i,Re.convert(c),Re.convert(l),a)}finally{let e=N===null?null:B.get(N).__webglFramebuffer;z.bindFramebuffer(L.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){z.bindFramebuffer(L.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s);let d=pt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,f),L.bufferData(L.PIXEL_PACK_BUFFER,a.byteLength,L.STREAM_READ),L.readPixels(t,n,r,i,Re.convert(l),Re.convert(u),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);let p=N===null?null:B.get(N).__webglFramebuffer;z.bindFramebuffer(L.FRAMEBUFFER,p);let m=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await yr(L,m,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,f),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,a),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(f),L.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;V.setTexture2D(e,0),L.copyTexSubImage2D(L.TEXTURE_2D,n,0,0,o,s,i,a),z.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Re.convert(t.format),_=Re.convert(t.type),v;t.isData3DTexture?(V.setTexture3D(t,0),v=L.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(V.setTexture2DArray(t,0),v=L.TEXTURE_2D_ARRAY):(V.setTexture2D(t,0),v=L.TEXTURE_2D),z.activeTexture(L.TEXTURE0),z.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,t.flipY),z.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),z.pixelStorei(L.UNPACK_ALIGNMENT,t.unpackAlignment);let y=z.getParameter(L.UNPACK_ROW_LENGTH),b=z.getParameter(L.UNPACK_IMAGE_HEIGHT),x=z.getParameter(L.UNPACK_SKIP_PIXELS),S=z.getParameter(L.UNPACK_SKIP_ROWS),C=z.getParameter(L.UNPACK_SKIP_IMAGES);z.pixelStorei(L.UNPACK_ROW_LENGTH,h.width),z.pixelStorei(L.UNPACK_IMAGE_HEIGHT,h.height),z.pixelStorei(L.UNPACK_SKIP_PIXELS,l),z.pixelStorei(L.UNPACK_SKIP_ROWS,u),z.pixelStorei(L.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=B.get(e),r=B.get(t),h=B.get(n.__renderTarget),g=B.get(r.__renderTarget);z.bindFramebuffer(L.READ_FRAMEBUFFER,h.__webglFramebuffer),z.bindFramebuffer(L.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,B.get(e).__webglTexture,i,d+n),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,B.get(t).__webglTexture,a,m+n)),L.blitFramebuffer(l,u,o,s,f,p,o,s,L.DEPTH_BUFFER_BIT,L.NEAREST);z.bindFramebuffer(L.READ_FRAMEBUFFER,null),z.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||B.has(e)){let n=B.get(e),r=B.get(t);z.bindFramebuffer(L.READ_FRAMEBUFFER,k),z.bindFramebuffer(L.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,n.__webglTexture,i),T?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,r.__webglTexture,a),i===0?T?L.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):L.copyTexSubImage2D(v,a,f,p,l,u,o,s):L.blitFramebuffer(l,u,o,s,f,p,o,s,L.COLOR_BUFFER_BIT,L.NEAREST);z.bindFramebuffer(L.READ_FRAMEBUFFER,null),z.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?L.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h);z.pixelStorei(L.UNPACK_ROW_LENGTH,y),z.pixelStorei(L.UNPACK_IMAGE_HEIGHT,b),z.pixelStorei(L.UNPACK_SKIP_PIXELS,x),z.pixelStorei(L.UNPACK_SKIP_ROWS,S),z.pixelStorei(L.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&L.generateMipmap(v),z.unbindTexture()},this.initRenderTarget=function(e){B.get(e).__webglFramebuffer===void 0&&V.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?V.setTextureCube(e,0):e.isData3DTexture?V.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?V.setTexture2DArray(e,0):V.setTexture2D(e,0),z.unbindTexture()},this.resetState=function(){j=0,M=0,N=null,z.reset(),ze.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return ur}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Lr._getDrawingBufferColorSpace(e),t.unpackColorSpace=Lr._getUnpackColorSpace()}},Af=()=>({steer:0,gas:0,brake:0}),jf={high:{prMax:1.5,view:760,fogFar:740,detail:!0,water:!0,life:!0,particles:1,cars:14},low:{prMax:1,view:560,fogFar:540,detail:!1,water:!1,life:!1,particles:.5,cars:7}};function Mf(e,t){let n=Math.imul(e,374761393)^Math.imul(t,668265263);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967295}function Nf(e,t){let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r,o=i*i*(3-2*i),s=a*a*(3-2*a),c=Mf(n,r),l=Mf(n+1,r),u=Mf(n,r+1),d=Mf(n+1,r+1);return c+(l-c)*o+(u-c)*s+(c-l-u+d)*o*s}function Pf(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ff(e){return e.levels.garage+e.levels.warehouse+e.levels.fuel-1}function If(e,t){return!t||Ff(e)>=t.level}function Lf(e,t){let n=e.levels.fuel;if(n<=0){e.fuelAt=t;return}let r=v[n]*Math.max(0,t-e.fuelAt)/6e4;e.fuelStored=Math.min(y[n],e.fuelStored+r),e.fuelAt=t}function Rf(e,t){if(e.build&&t>=e.build.until){let n=e.build.id;return n===`fuel`&&Lf(e,t),e.levels[n]=Math.min(4,e.levels[n]+1),e.build=null,n}return null}function zf(e,t){let n=e.levels[t]+1;return n>4?`max`:e.build?`busy`:e.money<x[t].cost[n]?`money`:null}function Bf(e,t,n){let r=e.levels[t]+1,i=x[t];e.money-=i.cost[r],t===`fuel`&&Lf(e,n),e.build={id:t,until:n+i.time[r]*1e3,total:i.time[r]}}var Vf=new Map;function Hf(e,t){let n=e.region.meta.id+`:`+t,r=Vf.get(n);return r===void 0&&Vf.set(n,r=e.buildRoute(t).len),r}function Uf(e,t,n,r,i){let a=t.cargo[r()*t.cargo.length|0],o=Math.round(t.pay*_[n.levels.warehouse]*(.92+r()*.2)/5)*5;return{to:t.to,cargo:a.id,kind:a.kind,pay:o,dist:Hf(e,t.to),seed:i}}function Wf(e,t){let n=e.jobs.find(e=>e.first)??e.jobs[0],r=n.cargo.find(e=>e.id===n.first?.cargo)??n.cargo[0];return{to:n.to,cargo:r.id,kind:r.kind,pay:Math.round(n.pay*_[t.levels.warehouse]),dist:Hf(e,n.to),seed:n.first?.seed??3}}function Gf(e,t){return e.jobs.filter(n=>!n.gate||If(t,e.gates.find(e=>e.id===n.gate)))}function Kf(e,t){let n=Pf(t.jobSeed*7919+13);return Gf(e,t).map((r,i)=>Uf(e,r,t,n,t.jobSeed*10+i))}function qf(e,t){let n=Math.max(0,Math.min(e.n-2,t));return Math.atan2(e.x[n+1]-e.x[n],e.z[n+1]-e.z[n])}function Jf(e,t,n){let r=e.s[t]+n,i=t;if(n>=0)for(;i<e.n-1&&e.s[i]<r;)i++;else for(;i>0&&e.s[i]>r;)i--;return i}function Yf(e,t){let n=[],r=t.parts.filter(t=>e.ROADS[t.id]?.def.ring);r.length&&n.push({i:r[0].i0,icon:`round`,exit:r.length});let i=r.length?t.parts[t.parts.indexOf(r[r.length-1])+1]?.i0??0:0,a=Math.max(i+10,0);for(;a<t.n-12;){let e=qf(t,Jf(t,a,-12)),r=Jf(t,a,60),i=f(e,qf(t,r));Math.abs(i)>.85?(n.push({i:a,icon:i>0?`left`:`right`,exit:0}),a=Jf(t,r,60)):a+=3}return n.sort((e,t)=>e.i-t.i)}function Xf(e){let t=e.junctions.main;return{main:t.crossHw+4.2,cross:t.hw+4.2}}function Zf(e){return e.padHeight(e.junctions.main.place)}function Qf(e){let t=e.junctions.main.hw,n=e.junctions.main.crossHw,r=Zf(e)+5.4,i=[],a=e.mainDir,o={x:-a.z,z:a.x};return e.crossings.forEach((e,s)=>{for(let[c,l,u,d,f]of[[`main`,a,n+3,4.5,t+2.8],[`main`,{x:-a.x,z:-a.z},n+3,4.5,t+2.8],[`cross`,o,t+3,2.5,n+2.6],[`cross`,{x:-o.x,z:-o.z},t+3,2.5,n+2.6]]){let t=-l.z,n=l.x;i.push({crossing:s,axis:c,ax:l.x,az:l.z,x:e.x+l.x*u+t*d,y:r,z:e.z+l.z*u+n*d,px:e.x+l.x*u+t*f,pz:e.z+l.z*u+n*f})}}),i}var $f=class{constructor(e){this.t=0,this.fines=[],this.speedT=0,this.speedCool=0,this.hitCool=0,this.lastAlong=[],this.inZone=!1,this.enabled=!0,this.onFine=null,this.geo=e,this.heads=Qf(e),this.back=Xf(e),this.lastAlong=this.heads.map(()=>1/0)}light(e,t){let n=this.geo.junctions.lights,r=(this.t+e*n.offset)%n.cycle;return t===`main`?r<n.mainGreen?`green`:r<n.mainYellow?`yellow`:`red`:r<n.crossRedUntil?`red`:r<n.crossGreen?`green`:r<n.crossYellow?`yellow`:`red`}stopAhead(e,t,n,r=45){let i=this.geo.crossings,a=i[0];if(!a||Math.abs(e-a.x)>260||Math.abs(t-a.z)>260)return 1/0;let o=Math.sin(n),s=Math.cos(n),c=1/0;for(let n of this.heads){if(o*n.ax+s*n.az<.8)continue;let a=i[n.crossing],l=this.back[n.axis],u=a.x-n.ax*l,d=a.z-n.az*l,f=(u-e)*n.ax+(d-t)*n.az,p=Math.abs((e-a.x)*-n.az+(t-a.z)*n.ax);f<0||f>r||p>9||this.light(n.crossing,n.axis)!==`green`&&(c=Math.min(c,f))}return c}aheadState(e,t,n){let r=this.geo.crossings,i=r[0];if(!i||Math.abs(e-i.x)>260||Math.abs(t-i.z)>260)return null;let a=Math.sin(n),o=Math.cos(n),s=null;for(let n of this.heads){if(a*n.ax+o*n.az<.8)continue;let i=r[n.crossing],c=this.back[n.axis],l=(i.x-n.ax*c-e)*n.ax+(i.z-n.az*c-t)*n.az,u=Math.abs((e-i.x)*-n.az+(t-i.z)*n.ax);l<-2||l>70||u>9||(!s||l<s.dist)&&(s={light:this.light(n.crossing,n.axis),dist:l})}return s}reset(){this.fines=[],this.speedT=0,this.lastAlong=this.heads.map(()=>1/0)}fine(e){this.enabled&&(this.fines.push(e),this.onFine?.(e))}update(e,t){if(this.t+=e,this.speedCool-=e,this.hitCool-=e,!t)return;let n=this.geo.speedZone;this.inZone=!!n&&Math.hypot(t.x-n.x,t.z-n.z)<n.r;let r=t.speed*3.6;n&&this.inZone&&r>n.kmh+10?this.speedT+=e:this.speedT=Math.max(0,this.speedT-e*2),this.speedT>1.5&&this.speedCool<=0&&(this.fine({kind:`speed`,amount:5}),this.speedCool=6,this.speedT=0);let i=Math.sin(t.h),a=Math.cos(t.h),o=this.geo.crossings;for(let e=0;e<this.heads.length;e++){let n=this.heads[e],r=o[n.crossing],s=this.back[n.axis],c=(r.x-n.ax*s-t.x)*n.ax+(r.z-n.az*s-t.z)*n.az,l=Math.abs((t.x-r.x)*-n.az+(t.z-r.z)*n.ax),u=i*n.ax+a*n.az>.7,d=this.lastAlong[e];u&&l<9&&d>0&&d<30&&c<=0&&t.speed>1&&this.light(n.crossing,n.axis)===`red`&&this.fine({kind:`red`,amount:15}),this.lastAlong[e]=l<9&&u?c:1/0}}hitCar(){this.hitCool>0||(this.hitCool=2,this.fine({kind:`hit`,amount:10}))}settle(e){let t=0;for(let e of this.fines)t+=e.amount;return{fines:Math.min(t,Math.round(e*.4)),bonus:t===0?Math.max(5,Math.round(e*.1/5)*5):0}}},ep=class{constructor(e){this.cars=[],this.onHit=null,this.hitPts=[0,0,0,0,0,0,0,0],this.geo=e;let t=e.region.traffic;t.spawns.forEach(({road:n,dir:r,s:i,lane:a},o)=>{let s=(e.ROADS[n].def.kind===1?t.cruise.motorway:t.cruise.road)+o%3*2;this.cars.push({road:n,s:i,dir:r,lane:a,v:s,cruise:s,pause:0,scale:1,x:0,z:0,y:0,h:0,k:e.ROADS[n].o,px:0,pz:0,py:0,ph:0,pscale:1})}),this.active=this.cars.length}get max(){return this.cars.length}setActive(e){this.active=Math.max(0,Math.min(this.cars.length,e))}carAhead(e,t,n,r,i=40){let a=Math.sin(r),o=Math.cos(r),s=1/0;for(let r=0;r<this.active;r++){let c=this.cars[r],l=c.x-e,u=c.z-t,d=l*a+u*o;d<=0||d>i||Math.abs(c.y-n)>3||Math.abs(l*o-u*a)<2.8&&(s=Math.min(s,d))}return s}update(e,t,n){let r=this.geo,{RS:i,RX:a,RZ:o,RY:s,RKIND:c,RHW:l}=r;for(let u=0;u<this.active;u++){let d=this.cars[u];d.px=d.x,d.pz=d.z,d.py=d.y,d.ph=d.h,d.pscale=d.scale;let f=r.ROADS[d.road],p=d.cruise,m=Math.sin(d.h),h=Math.cos(d.h);if(n){let e=n.stopAhead(d.x,d.z,d.h,40);e<1/0&&(p=Math.min(p,Math.max(0,(e-1.5)*.7)))}for(let e=0;e<this.active;e++){let t=this.cars[e];if(e===u||t.road!==d.road||t.dir!==d.dir||t.lane!==d.lane)continue;let n=(t.s-d.s)*d.dir;n>0&&n<16&&(p=Math.min(p,Math.max(0,(n-7)*.9)))}if(t){let e=t.x-d.x,n=t.z-d.z,r=e*m+n*h,i=Math.abs(e*h-n*m);r>0&&r<22&&i<3.6&&Math.abs(t.y-d.y)<4&&(p=0);let a=this.hitPts;a[0]=t.x,a[1]=t.z,a[2]=t.x+Math.sin(t.h)*2.5,a[3]=t.z+Math.cos(t.h)*2.5,a[4]=(t.ax+t.x)/2,a[5]=(t.az+t.z)/2,a[6]=t.ax,a[7]=t.az;for(let e=0;e<8;e+=2)if(Math.hypot(a[e]-d.x,a[e+1]-d.z)<3.1&&d.pause<=0&&Math.abs(t.y-d.y)<3){t.hitCar(Math.abs(t.speed)+d.v*.5),this.onHit?.(),d.pause=2.5,d.v=0,d.s-=d.dir*3;break}}d.pause>0&&(d.pause-=e,p=0),d.v+=Math.max(-9*e,Math.min(3*e,p-d.v)),d.s+=d.dir*d.v*e;let g=f.len,_=d.dir>0?g-25:25,v=!1;d.dir>0&&d.s>_||d.dir<0&&d.s<_?(d.scale-=e*3,d.scale<=0&&(d.s=d.dir>0?25:g-25,d.k=f.o,v=!0)):d.scale=Math.min(1,d.scale+e*3);let y=f.o,b=y+f.n-2,x=Math.min(Math.max(d.k,y),b);for(;x<b&&i[x+1]<d.s;)x++;for(;x>y&&i[x]>d.s;)x--;d.k=x;let S=Math.min(1,Math.max(0,(d.s-i[x])/Math.max(.01,i[x+1]-i[x]))),C=a[x+1]-a[x],w=o[x+1]-o[x],T=Math.hypot(C,w)||1,E=C/T*d.dir,D=w/T*d.dir;d.h=Math.atan2(E,D);let O=c[x]===1?d.lane?5.9:2.1:l[x]>5.5?1.9:2.3;d.x=a[x]+C*S-D*O,d.z=o[x]+w*S+E*O,d.y=s[x]+(s[x+1]-s[x])*S,v&&(d.px=d.x,d.pz=d.z,d.py=d.y,d.ph=d.h)}}},tp=4.6,np=-1.9,rp=9.2,ip=[`x`,`z`,`y`,`h`,`pitch`,`roll`,`bounce`,`ax`,`az`,`ay`,`phi`,`swing`,`steerAngle`,`wheelSpin`],ap=class{constructor(e){this.x=0,this.z=0,this.y=0,this.h=0,this.vx=0,this.vz=0,this.speed=0,this.steerAngle=0,this.yawRate=0,this.pitch=0,this.roll=0,this.ax=0,this.az=0,this.ay=0,this.phi=0,this.swing=0,this.swingV=0,this.bounce=0,this.bounceV=0,this.wheelSpin=0,this.offroad=!1,this.braking=!1,this.gateLocked=!0,this.vmax=S[1],this.accel=C[1],this.assist=!0,this.level=1,this.onBump=null,this.bumpCooldown=0,this.hit={d:0,i:0,t:0,side:0},this.geo=e,this.prev={},this.snap()}snap(){for(let e of ip)this.prev[e]=this[e]}setLevel(e){this.level=e,this.vmax=S[u(e,1,4)],this.accel=C[u(e,1,4)]}place(e,t,n){let r=this.geo;this.x=e,this.z=t,this.h=n,this.vx=this.vz=this.speed=0,this.steerAngle=this.yawRate=0,this.swing=this.swingV=0;let i=Math.sin(n),a=Math.cos(n);this.ax=e+i*-11.1,this.az=t+a*-11.1,this.phi=n,this.y=r.surfaceAt(e,t),this.ay=r.surfaceAt(this.ax,this.az,this.ay),this.bounce=this.bounceV=0,this.snap()}update(e,t){let n=this.geo,{RHW:r,RLIM:i,RX:a,RZ:o,RS:s,RY:c,roads:l}=n,d=Math.sin(this.h),p=Math.cos(this.h),m=-p,h=d,g=this.vx*d+this.vz*p,_=this.vx*m+this.vz*h,v=(n.surfaceAt(this.x+d*2.5,this.z+p*2.5,this.y)-n.surfaceAt(this.x-d*2.1,this.z-p*2.1,this.y))/4.6,y=l.nearestY(this.x,this.z,60,c,this.y,this.hit);this.offroad=!y||y.d>r[y.i]+1;let b=y?y.i:0,x=0,S=t.gas,C=t.brake;this.braking=C>0&&g>.5,S>0&&(x+=g<-.5?10*S:this.accel*S*(1-u(g/this.vmax,0,1)**2.2)),C>0&&(x-=g>.5?11*C:3.2*C*(1-u(-g/7,0,1)));let w=Math.sign(g),T=.3+.0016*g*g;S===0&&C===0&&(T+=.8),this.offroad&&(T+=1.6+.04*g*g),x-=9.8*v*.75;let E=g;g+=x*e;let D=T*e;Math.abs(g)<=D&&S===0&&C===0?g=0:g-=w*Math.min(D,Math.abs(g)),E>0&&g<0&&C===0&&(g=0),_*=Math.exp(-(this.offroad?4:7)*e);let O=t.steer;if(this.assist&&Math.abs(t.steer)<.05&&y&&!this.offroad&&Math.abs(g)>3){let e=b,t=Math.atan2(a[e+1]-a[e],o[e+1]-o[e]),n=f(this.h,t);Math.abs(n)>Math.PI/2&&(n=f(this.h,t+Math.PI)),O=u(-n*1.4,-.35,.35)*Math.sign(g)}let k=.55/(1+Math.abs(g)*.085),A=O*k,j=Math.abs(A)<Math.abs(this.steerAngle)?3.2:2;this.steerAngle+=u(A-this.steerAngle,-j*e,j*e);let M=-g/tp*Math.tan(this.steerAngle),N=(M-this.yawRate)/e;this.yawRate=M,this.h+=M*e,this.vx=d*g+m*_,this.vz=p*g+h*_,this.x+=this.vx*e,this.z+=this.vz*e,this.speed=g,this.bumpCooldown-=e;let P=l.nearestY(this.x,this.z,60,c,this.y,this.hit);if(P){let e=P.i,t=i[e];if(P.d>t){let n=a[e]+(a[e+1]-a[e])*P.t,r=o[e]+(o[e+1]-o[e])*P.t,i=(this.x-n)/P.d,s=(this.z-r)/P.d;this.x=n+i*t,this.z=r+s*t;let c=this.vx*i+this.vz*s;c>0&&(this.vx-=i*c*1.3,this.vz-=s*c*1.3,this.bump(c))}if(this.gateLocked)for(let t of n.gates){let r=n.ROADS[t.road];if(e<r.o||e>=r.o+r.n-1)continue;let i=s[e]+(s[e+1]-s[e])*P.t;if(i>t.s-7){let n=i-(t.s-7),r=a[e+1]-a[e],s=o[e+1]-o[e],c=Math.hypot(r,s)||1;this.x-=r/c*n,this.z-=s/c*n;let l=(this.vx*r+this.vz*s)/c;l>0&&(this.vx-=r/c*l*1.4,this.vz-=s/c*l*1.4,this.bump(l))}}}{let e=n.junctions.ring,t=this.x-e.x,r=this.z-e.z,i=Math.hypot(t,r),a=e.r-5-1.2;if(i<a&&i>.01){this.x=e.x+t/i*a,this.z=e.z+r/i*a;let n=-(this.vx*t+this.vz*r)/i;n>0&&(this.vx+=t/i*n*1.3,this.vz+=r/i*n*1.3,this.bump(n))}}let ee=n.surfaceAt(this.x,this.z,this.y),te=ee-this.y;this.y=ee,this.bounceV+=(-60*this.bounce-7*this.bounceV-te*30)*e,this.bounce=u(this.bounce+this.bounceV*e,-.25,.25),this.pitch+=(Math.atan(v)-this.pitch)*Math.min(1,e*10);let ne=g*M;this.roll+=(u(ne*.016,-.09,.09)-this.roll)*Math.min(1,e*6);let re=this.x+Math.sin(this.h)*np,ie=this.z+Math.cos(this.h)*np,ae=re-this.ax,F=ie-this.az,oe=Math.hypot(ae,F)||1;this.ax=re-ae/oe*rp,this.az=ie-F/oe*rp,this.phi=Math.atan2(re-this.ax,ie-this.az);let se=f(this.h,this.phi);Math.abs(se)>1.1&&(this.phi=this.h+Math.sign(se)*1.1,this.ax=re-Math.sin(this.phi)*rp,this.az=ie-Math.cos(this.phi)*rp),this.swingV+=(-22*this.swing-3.4*this.swingV+u(N,-4,4)*.05)*e,this.swing=u(this.swing+this.swingV*e,-.07,.07),this.ay=n.surfaceAt(this.ax,this.az),this.wheelSpin+=g*e/.55}bump(e){e>1.5&&this.bumpCooldown<=0?(this.vx*=.6,this.vz*=.6,this.bounceV+=1.2,this.bumpCooldown=.5,this.onBump?.(u(e/8,.3,1))):(this.vx*=.985,this.vz*=.985)}hitCar(e){this.vx*=.5,this.vz*=.5,this.bounceV+=1,this.onBump?.(u(e/8,.4,1))}},op=1/60,sp=2,cp=class{constructor(e){this.mode=`idle`,this.job=null,this.route=null,this.turns=[],this.routeIdx=0,this.offRoute=0,this.toEnd=1/0,this.left=0,this.off=0,this.wrongWay=!1,this.frozen=!1,this.autopilot=!1,this.ticks=0,this.events=[],this.applied=Af(),this.ctl=Af(),this.geo=e,this.truck=new ap(e),this.traffic=new ep(e),this.rules=new $f(e),this.truck.onBump=e=>this.events.push({type:`bump`,power:e}),this.rules.onFine=e=>this.events.push({type:`fine`,fine:e}),this.traffic.onHit=()=>{this.mode===`drive`&&this.rules.enabled&&this.rules.hitCar()},this.traffic.update(0,null,null);for(let e of this.traffic.cars)e.px=e.x,e.pz=e.z,e.py=e.y,e.ph=e.h}startJob(e,t){this.job=e,this.mode=`drive`;let n=this.route=this.geo.buildRoute(e.to);this.routeIdx=0,this.offRoute=0,this.wrongWay=!1,this.toEnd=1/0,this.left=n.len;let r=Math.atan2(n.x[3]-n.x[0],n.z[3]-n.z[0]);this.truck.place(n.x[0],n.z[0]+10,r),this.turns=Yf(this.geo,n),this.rules.reset(),this.rules.enabled=t}park(e,t,n){this.mode=`idle`,this.job=null,this.truck.place(e,t,n)}tick(e){this.ticks++;let t=this.truck;if(t.snap(),this.mode===`drive`&&!this.frozen)this.tickDrive(this.autopilot?this.autopilotControls():e);else if(this.mode===`arrive`){let e=this.ctl;e.steer=0,e.gas=0,e.brake=1,this.step(e)}this.rules.update(op,this.mode===`drive`&&!this.frozen?t:null),this.traffic.update(op,this.mode===`drive`?t:null,this.rules)}step(e){let t=op/sp;for(let n=0;n<sp;n++)this.truck.update(t,e)}tickDrive(e){this.applied=e;let t=this.route,n=this.truck;this.step(e);let r=this.routeIdx,i=1/0;for(let e=Math.max(0,this.routeIdx-8);e<Math.min(t.n,this.routeIdx+40);e++){let a=(t.x[e]-n.x)**2+(t.z[e]-n.z)**2;a<i&&(i=a,r=e)}this.routeIdx=r;let a=Math.sqrt(i);this.off=a,this.left=Math.max(0,t.len-t.s[r]);let o=t.n-1;this.toEnd=Math.hypot(t.x[o]-n.x,t.z[o]-n.z);let s=Math.atan2(t.x[Math.min(o,r+1)]-t.x[r],t.z[Math.min(o,r+1)]-t.z[r]);this.wrongWay=Math.abs(f(n.h,s))>2&&n.speed>2&&a<20,this.offRoute=a>22?this.offRoute+op:0,this.toEnd<13&&Math.abs(n.speed)<2.5&&(this.mode=`arrive`,this.events.push({type:`arrived`}))}autopilotControls(){let e=this.ctl,t=this.route,n=this.truck,r=Math.abs(n.speed),i=this.routeIdx,a=e=>{let n=i,r=t.s[i]+e;for(;n<t.n-1&&t.s[n]<r;)n++;return n},o=a(9+r*.8),s=Math.min(o+1,t.n-1),c=Math.atan2(t.x[s]-t.x[o],t.z[s]-t.z[o]),l=t.x[o]-Math.cos(c)*2,d=t.z[o]+Math.sin(c)*2;e.steer=u(-f(n.h,Math.atan2(l-n.x,d-n.z))*2.4,-1,1);let p=a(55),m=Math.atan2(t.x[Math.min(i+1,t.n-1)]-t.x[i],t.z[Math.min(i+1,t.n-1)]-t.z[i]),h=Math.atan2(t.x[Math.min(p+1,t.n-1)]-t.x[p],t.z[Math.min(p+1,t.n-1)]-t.z[p]),g=u(30-Math.abs(f(m,h))*22,7,n.vmax),_=t.len-t.s[i];_<70&&(g=Math.min(g,1.2+_*.2));let v=this.geo.speedZone;v&&this.rules.inZone&&(g=Math.min(g,(v.kmh-4)/3.6));let y=this.rules.stopAhead(n.x,n.z,n.h,60);y<1/0&&(g=Math.min(g,Math.max(0,(y-4)*.45)));let b=this.traffic.carAhead(n.x,n.z,n.y,n.h,45);return b<1/0&&(g=Math.min(g,Math.max(0,(b-13)*.5))),e.gas=+(r<g-.5),e.brake=+(r>g+1.5),e}},lp=class{constructor(e,t){this.exhaustT=0,this.dustT=0,this.tmp=new K,this.p=e,this.view=t}drive(e,t,n,r){let i=Math.abs(t.speed);if(this.exhaustT-=e,this.exhaustT<=0){this.exhaustT=(n?.045:.12)/r;for(let e=-1;e<=1;e+=2)this.view.stackTop(e,this.tmp),this.p.emit(this.tmp.x,this.tmp.y,this.tmp.z,-t.vx*.3+(Math.random()-.5),2.2+Math.random(),-t.vz*.3+(Math.random()-.5),n?6974835:10132899,n?.32:.2,.4,1.7,.9,-.5)}this.dustT-=e,i>7&&this.dustT<=0&&(this.dustT=(t.offroad?.05:.14)/r,this.dust(t,t.offroad?1.4:.6))}dust(e,t=1){for(let n=-1;n<=1;n+=2)this.view.rearWheel(n,this.tmp),this.p.emit(this.tmp.x,this.tmp.y+.3,this.tmp.z,(Math.random()-.5)*2-e.vx*.15,.8+Math.random(),(Math.random()-.5)*2-e.vz*.15,e.offroad?13808255:15260868,.22*t,.8,2.8,.8)}confetti(e,t,n){for(let r=0;r<40;r++){let r=Math.random()*Math.PI*2,i=4+Math.random()*6;this.p.emit(e,t+3,n,Math.cos(r)*i,6+Math.random()*6,Math.sin(r)*i,Math.random()<.5?16765773:16774064,1,.9,.4,1.4,9)}}buildDust(e,t,n){for(let r=0;r<24;r++)this.p.emit(e+(Math.random()-.5)*20,t+1,n+(Math.random()-.5)*16,(Math.random()-.5)*6,2+Math.random()*3,(Math.random()-.5)*6,14205594,.5,2,6,1.2)}sparkle(e,t,n){let r=Math.random()*Math.PI*2,i=3+Math.random()*6;this.p.emit(e,t,n,Math.cos(r)*i,5+Math.random()*8,Math.sin(r)*i,Math.random()<.5?16765773:16777215,1,1.2,.3,1.3,9)}};function up(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function dp(e,t={r:0,g:0,b:0}){return e=Math.floor(e),t.r=up((e>>16&255)/255),t.g=up((e>>8&255)/255),t.b=up((e&255)/255),t}function fp(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var pp=(e,t)=>(e%t+t)%t,mp=e=>Math.max(0,Math.min(1,e));function hp(e,t,n,r){let i=e.r,a=e.g,o=e.b,s=Math.max(i,a,o),c=Math.min(i,a,o),l=0,u=0,d=(c+s)/2;if(c!==s){let e=s-c;switch(u=d<=.5?e/(s+c):e/(2-s-c),s){case i:l=(a-o)/e+(a<o?6:0);break;case a:l=(o-i)/e+2;break;case o:l=(i-a)/e+4}l/=6}let f=pp(l+t,1),p=mp(u+n),m=mp(d+r);if(p===0)e.r=e.g=e.b=m;else{let t=m<=.5?m*(1+p):m+p-m*p,n=2*m-t;e.r=fp(n,t,f+1/3),e.g=fp(n,t,f),e.b=fp(n,t,f-1/3)}return e}var gp=new Map;function _p(e){let t=gp.get(e);return t||gp.set(e,t=dp(e)),t}function vp(e,t){return hp(dp(e),0,0,t)}function yp(){let e=new Float64Array(16);return e[0]=e[5]=e[10]=e[15]=1,e}function bp(e,t){return e.set(t),e}function xp(e,t,n){let r=t[0],i=t[4],a=t[8],o=t[12],s=t[1],c=t[5],l=t[9],u=t[13],d=t[2],f=t[6],p=t[10],m=t[14],h=t[3],g=t[7],_=t[11],v=t[15],y=n[0],b=n[4],x=n[8],S=n[12],C=n[1],w=n[5],T=n[9],E=n[13],D=n[2],O=n[6],k=n[10],A=n[14],j=n[3],M=n[7],N=n[11],P=n[15];return e[0]=r*y+i*C+a*D+o*j,e[4]=r*b+i*w+a*O+o*M,e[8]=r*x+i*T+a*k+o*N,e[12]=r*S+i*E+a*A+o*P,e[1]=s*y+c*C+l*D+u*j,e[5]=s*b+c*w+l*O+u*M,e[9]=s*x+c*T+l*k+u*N,e[13]=s*S+c*E+l*A+u*P,e[2]=d*y+f*C+p*D+m*j,e[6]=d*b+f*w+p*O+m*M,e[10]=d*x+f*T+p*k+m*N,e[14]=d*S+f*E+p*A+m*P,e[3]=h*y+g*C+_*D+v*j,e[7]=h*b+g*w+_*O+v*M,e[11]=h*x+g*T+_*k+v*N,e[15]=h*S+g*E+_*A+v*P,e}var Sp=()=>{let e=new Float64Array(4);return e[3]=1,e};function Cp(e,t){let n=t/2,r=Math.sin(n);return e[0]=0*r,e[1]=1*r,e[2]=0*r,e[3]=Math.cos(n),e}function wp(e,t,n,r){let i=Math.cos(t/2),a=Math.cos(n/2),o=Math.cos(r/2),s=Math.sin(t/2),c=Math.sin(n/2),l=Math.sin(r/2);return e[0]=s*a*o+i*c*l,e[1]=i*c*o-s*a*l,e[2]=i*a*l-s*c*o,e[3]=i*a*o+s*c*l,e}function Tp(e,t,n,r,i,a,o){let s=t*i+n*a+r*o+1;s<1e-8?(s=0,Math.abs(t)>Math.abs(r)?(e[0]=-n,e[1]=t,e[2]=0,e[3]=s):(e[0]=0,e[1]=-r,e[2]=n,e[3]=s)):(e[0]=n*o-r*a,e[1]=r*i-t*o,e[2]=t*a-n*i,e[3]=s);let c=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3]);return c===0?(e[0]=e[1]=e[2]=0,e[3]=1):(c=1/c,e[0]*=c,e[1]*=c,e[2]*=c,e[3]*=c),e}function Ep(e,t,n,r,i,a,o,s){let c=i[0],l=i[1],u=i[2],d=i[3],f=c+c,p=l+l,m=u+u,h=c*f,g=c*p,_=c*m,v=l*p,y=l*m,b=u*m,x=d*f,S=d*p,C=d*m;return e[0]=(1-(v+b))*a,e[1]=(g+C)*a,e[2]=(_-S)*a,e[3]=0,e[4]=(g-C)*o,e[5]=(1-(h+b))*o,e[6]=(y+x)*o,e[7]=0,e[8]=(_+S)*s,e[9]=(y-x)*s,e[10]=(1-(h+v))*s,e[11]=0,e[12]=t,e[13]=n,e[14]=r,e[15]=1,e}var Dp={box:new Float32Array([.5,.5,.5,.5,-.5,.5,.5,.5,-.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,-.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,.5,.5,-.5,-.5,-.5,-.5,-.5,.5,-.5,.5,.5,-.5,.5,-.5,-.5,.5,.5,.5,.5,-.5,-.5,.5,.5,.5,.5,.5,.5,.5,-.5,-.5,-.5,.5,-.5,-.5,-.5,.5,-.5,.5,-.5,-.5,-.5,.5,-.5,-.5,.5,-.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,.5,.5,-.5,-.5,.5,.5,-.5,.5,.5,.5,.5,.5,.5,-.5,.5,-.5,-.5,-.5,.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,-.5,.5,-.5]),cyl6:new Float32Array([0,.5,.5,0,-.5,.5,.4330126941204071,.5,.25,0,-.5,.5,.4330126941204071,-.5,.25,.4330126941204071,.5,.25,.4330126941204071,.5,.25,.4330126941204071,-.5,.25,.4330126941204071,.5,-.25,.4330126941204071,-.5,.25,.4330126941204071,-.5,-.25,.4330126941204071,.5,-.25,.4330126941204071,.5,-.25,.4330126941204071,-.5,-.25,6123234262925839e-32,.5,-.5,.4330126941204071,-.5,-.25,6123234262925839e-32,-.5,-.5,6123234262925839e-32,.5,-.5,6123234262925839e-32,.5,-.5,6123234262925839e-32,-.5,-.5,-.4330126941204071,.5,-.25,6123234262925839e-32,-.5,-.5,-.4330126941204071,-.5,-.25,-.4330126941204071,.5,-.25,-.4330126941204071,.5,-.25,-.4330126941204071,-.5,-.25,-.4330126941204071,.5,.25,-.4330126941204071,-.5,-.25,-.4330126941204071,-.5,.25,-.4330126941204071,.5,.25,-.4330126941204071,.5,.25,-.4330126941204071,-.5,.25,-12246468525851679e-32,.5,.5,-.4330126941204071,-.5,.25,-12246468525851679e-32,-.5,.5,-12246468525851679e-32,.5,.5,0,.5,.5,.4330126941204071,.5,.25,0,.5,0,.4330126941204071,.5,.25,.4330126941204071,.5,-.25,0,.5,0,.4330126941204071,.5,-.25,6123234262925839e-32,.5,-.5,0,.5,0,6123234262925839e-32,.5,-.5,-.4330126941204071,.5,-.25,0,.5,0,-.4330126941204071,.5,-.25,-.4330126941204071,.5,.25,0,.5,0,-.4330126941204071,.5,.25,-12246468525851679e-32,.5,.5,0,.5,0,.4330126941204071,-.5,.25,0,-.5,.5,0,-.5,0,.4330126941204071,-.5,-.25,.4330126941204071,-.5,.25,0,-.5,0,6123234262925839e-32,-.5,-.5,.4330126941204071,-.5,-.25,0,-.5,0,-.4330126941204071,-.5,-.25,6123234262925839e-32,-.5,-.5,0,-.5,0,-.4330126941204071,-.5,.25,-.4330126941204071,-.5,-.25,0,-.5,0,-12246468525851679e-32,-.5,.5,-.4330126941204071,-.5,.25,0,-.5,0]),cyl8:new Float32Array([0,.5,.5,0,-.5,.5,.3535533845424652,.5,.3535533845424652,0,-.5,.5,.3535533845424652,-.5,.3535533845424652,.3535533845424652,.5,.3535533845424652,.3535533845424652,.5,.3535533845424652,.3535533845424652,-.5,.3535533845424652,.5,.5,30616171314629196e-33,.3535533845424652,-.5,.3535533845424652,.5,-.5,30616171314629196e-33,.5,.5,30616171314629196e-33,.5,.5,30616171314629196e-33,.5,-.5,30616171314629196e-33,.3535533845424652,.5,-.3535533845424652,.5,-.5,30616171314629196e-33,.3535533845424652,-.5,-.3535533845424652,.3535533845424652,.5,-.3535533845424652,.3535533845424652,.5,-.3535533845424652,.3535533845424652,-.5,-.3535533845424652,6123234262925839e-32,.5,-.5,.3535533845424652,-.5,-.3535533845424652,6123234262925839e-32,-.5,-.5,6123234262925839e-32,.5,-.5,6123234262925839e-32,.5,-.5,6123234262925839e-32,-.5,-.5,-.3535533845424652,.5,-.3535533845424652,6123234262925839e-32,-.5,-.5,-.3535533845424652,-.5,-.3535533845424652,-.3535533845424652,.5,-.3535533845424652,-.3535533845424652,.5,-.3535533845424652,-.3535533845424652,-.5,-.3535533845424652,-.5,.5,-9184850732644269e-32,-.3535533845424652,-.5,-.3535533845424652,-.5,-.5,-9184850732644269e-32,-.5,.5,-9184850732644269e-32,-.5,.5,-9184850732644269e-32,-.5,-.5,-9184850732644269e-32,-.3535533845424652,.5,.3535533845424652,-.5,-.5,-9184850732644269e-32,-.3535533845424652,-.5,.3535533845424652,-.3535533845424652,.5,.3535533845424652,-.3535533845424652,.5,.3535533845424652,-.3535533845424652,-.5,.3535533845424652,-12246468525851679e-32,.5,.5,-.3535533845424652,-.5,.3535533845424652,-12246468525851679e-32,-.5,.5,-12246468525851679e-32,.5,.5,0,.5,.5,.3535533845424652,.5,.3535533845424652,0,.5,0,.3535533845424652,.5,.3535533845424652,.5,.5,30616171314629196e-33,0,.5,0,.5,.5,30616171314629196e-33,.3535533845424652,.5,-.3535533845424652,0,.5,0,.3535533845424652,.5,-.3535533845424652,6123234262925839e-32,.5,-.5,0,.5,0,6123234262925839e-32,.5,-.5,-.3535533845424652,.5,-.3535533845424652,0,.5,0,-.3535533845424652,.5,-.3535533845424652,-.5,.5,-9184850732644269e-32,0,.5,0,-.5,.5,-9184850732644269e-32,-.3535533845424652,.5,.3535533845424652,0,.5,0,-.3535533845424652,.5,.3535533845424652,-12246468525851679e-32,.5,.5,0,.5,0,.3535533845424652,-.5,.3535533845424652,0,-.5,.5,0,-.5,0,.5,-.5,30616171314629196e-33,.3535533845424652,-.5,.3535533845424652,0,-.5,0,.3535533845424652,-.5,-.3535533845424652,.5,-.5,30616171314629196e-33,0,-.5,0,6123234262925839e-32,-.5,-.5,.3535533845424652,-.5,-.3535533845424652,0,-.5,0,-.3535533845424652,-.5,-.3535533845424652,6123234262925839e-32,-.5,-.5,0,-.5,0,-.5,-.5,-9184850732644269e-32,-.3535533845424652,-.5,-.3535533845424652,0,-.5,0,-.3535533845424652,-.5,.3535533845424652,-.5,-.5,-9184850732644269e-32,0,-.5,0,-12246468525851679e-32,-.5,.5,-.3535533845424652,-.5,.3535533845424652,0,-.5,0]),cyl12:new Float32Array([0,.5,.5,0,-.5,.5,.25,.5,.4330126941204071,0,-.5,.5,.25,-.5,.4330126941204071,.25,.5,.4330126941204071,.25,.5,.4330126941204071,.25,-.5,.4330126941204071,.4330126941204071,.5,.25,.25,-.5,.4330126941204071,.4330126941204071,-.5,.25,.4330126941204071,.5,.25,.4330126941204071,.5,.25,.4330126941204071,-.5,.25,.5,.5,30616171314629196e-33,.4330126941204071,-.5,.25,.5,-.5,30616171314629196e-33,.5,.5,30616171314629196e-33,.5,.5,30616171314629196e-33,.5,-.5,30616171314629196e-33,.4330126941204071,.5,-.25,.5,-.5,30616171314629196e-33,.4330126941204071,-.5,-.25,.4330126941204071,.5,-.25,.4330126941204071,.5,-.25,.4330126941204071,-.5,-.25,.25,.5,-.4330126941204071,.4330126941204071,-.5,-.25,.25,-.5,-.4330126941204071,.25,.5,-.4330126941204071,.25,.5,-.4330126941204071,.25,-.5,-.4330126941204071,6123234262925839e-32,.5,-.5,.25,-.5,-.4330126941204071,6123234262925839e-32,-.5,-.5,6123234262925839e-32,.5,-.5,6123234262925839e-32,.5,-.5,6123234262925839e-32,-.5,-.5,-.25,.5,-.4330126941204071,6123234262925839e-32,-.5,-.5,-.25,-.5,-.4330126941204071,-.25,.5,-.4330126941204071,-.25,.5,-.4330126941204071,-.25,-.5,-.4330126941204071,-.4330126941204071,.5,-.25,-.25,-.5,-.4330126941204071,-.4330126941204071,-.5,-.25,-.4330126941204071,.5,-.25,-.4330126941204071,.5,-.25,-.4330126941204071,-.5,-.25,-.5,.5,-9184850732644269e-32,-.4330126941204071,-.5,-.25,-.5,-.5,-9184850732644269e-32,-.5,.5,-9184850732644269e-32,-.5,.5,-9184850732644269e-32,-.5,-.5,-9184850732644269e-32,-.4330126941204071,.5,.25,-.5,-.5,-9184850732644269e-32,-.4330126941204071,-.5,.25,-.4330126941204071,.5,.25,-.4330126941204071,.5,.25,-.4330126941204071,-.5,.25,-.25,.5,.4330126941204071,-.4330126941204071,-.5,.25,-.25,-.5,.4330126941204071,-.25,.5,.4330126941204071,-.25,.5,.4330126941204071,-.25,-.5,.4330126941204071,-12246468525851679e-32,.5,.5,-.25,-.5,.4330126941204071,-12246468525851679e-32,-.5,.5,-12246468525851679e-32,.5,.5,0,.5,.5,.25,.5,.4330126941204071,0,.5,0,.25,.5,.4330126941204071,.4330126941204071,.5,.25,0,.5,0,.4330126941204071,.5,.25,.5,.5,30616171314629196e-33,0,.5,0,.5,.5,30616171314629196e-33,.4330126941204071,.5,-.25,0,.5,0,.4330126941204071,.5,-.25,.25,.5,-.4330126941204071,0,.5,0,.25,.5,-.4330126941204071,6123234262925839e-32,.5,-.5,0,.5,0,6123234262925839e-32,.5,-.5,-.25,.5,-.4330126941204071,0,.5,0,-.25,.5,-.4330126941204071,-.4330126941204071,.5,-.25,0,.5,0,-.4330126941204071,.5,-.25,-.5,.5,-9184850732644269e-32,0,.5,0,-.5,.5,-9184850732644269e-32,-.4330126941204071,.5,.25,0,.5,0,-.4330126941204071,.5,.25,-.25,.5,.4330126941204071,0,.5,0,-.25,.5,.4330126941204071,-12246468525851679e-32,.5,.5,0,.5,0,.25,-.5,.4330126941204071,0,-.5,.5,0,-.5,0,.4330126941204071,-.5,.25,.25,-.5,.4330126941204071,0,-.5,0,.5,-.5,30616171314629196e-33,.4330126941204071,-.5,.25,0,-.5,0,.4330126941204071,-.5,-.25,.5,-.5,30616171314629196e-33,0,-.5,0,.25,-.5,-.4330126941204071,.4330126941204071,-.5,-.25,0,-.5,0,6123234262925839e-32,-.5,-.5,.25,-.5,-.4330126941204071,0,-.5,0,-.25,-.5,-.4330126941204071,6123234262925839e-32,-.5,-.5,0,-.5,0,-.4330126941204071,-.5,-.25,-.25,-.5,-.4330126941204071,0,-.5,0,-.5,-.5,-9184850732644269e-32,-.4330126941204071,-.5,-.25,0,-.5,0,-.4330126941204071,-.5,.25,-.5,-.5,-9184850732644269e-32,0,-.5,0,-.25,-.5,.4330126941204071,-.4330126941204071,-.5,.25,0,-.5,0,-12246468525851679e-32,-.5,.5,-.25,-.5,.4330126941204071,0,-.5,0]),disc6:new Float32Array([.5,0,0,.25,26514381180325745e-33,-.4330126941204071,0,0,0,.25,26514381180325745e-33,-.4330126941204071,-.25,26514381180325745e-33,-.4330126941204071,0,0,0,-.25,26514381180325745e-33,-.4330126941204071,-.5,374939976039497e-47,-6123234262925839e-32,0,0,0,-.5,374939976039497e-47,-6123234262925839e-32,-.25,-26514381180325745e-33,.4330126941204071,0,0,0,-.25,-26514381180325745e-33,.4330126941204071,.25,-26514381180325745e-33,.4330126941204071,0,0,0,.25,-26514381180325745e-33,.4330126941204071,.5,-749879952078994e-47,12246468525851679e-32,0,0,0]),tube6:new Float32Array([0,.5,.5,0,-.5,.5,.4330126941204071,.5,.25,0,-.5,.5,.4330126941204071,-.5,.25,.4330126941204071,.5,.25,.4330126941204071,.5,.25,.4330126941204071,-.5,.25,.4330126941204071,.5,-.25,.4330126941204071,-.5,.25,.4330126941204071,-.5,-.25,.4330126941204071,.5,-.25,.4330126941204071,.5,-.25,.4330126941204071,-.5,-.25,6123234262925839e-32,.5,-.5,.4330126941204071,-.5,-.25,6123234262925839e-32,-.5,-.5,6123234262925839e-32,.5,-.5,6123234262925839e-32,.5,-.5,6123234262925839e-32,-.5,-.5,-.4330126941204071,.5,-.25,6123234262925839e-32,-.5,-.5,-.4330126941204071,-.5,-.25,-.4330126941204071,.5,-.25,-.4330126941204071,.5,-.25,-.4330126941204071,-.5,-.25,-.4330126941204071,.5,.25,-.4330126941204071,-.5,-.25,-.4330126941204071,-.5,.25,-.4330126941204071,.5,.25,-.4330126941204071,.5,.25,-.4330126941204071,-.5,.25,-12246468525851679e-32,.5,.5,-.4330126941204071,-.5,.25,-12246468525851679e-32,-.5,.5,-12246468525851679e-32,.5,.5]),ocone6:new Float32Array([0,-.5,.5,.4330126941204071,-.5,.25,0,.5,0,.4330126941204071,-.5,.25,.4330126941204071,-.5,-.25,0,.5,0,.4330126941204071,-.5,-.25,6123234262925839e-32,-.5,-.5,0,.5,0,6123234262925839e-32,-.5,-.5,-.4330126941204071,-.5,-.25,0,.5,0,-.4330126941204071,-.5,-.25,-.4330126941204071,-.5,.25,0,.5,0,-.4330126941204071,-.5,.25,-12246468525851679e-32,-.5,.5,0,.5,0]),cone5:new Float32Array([0,-.5,.5,.4755282700061798,-.5,.15450850129127502,0,.5,0,.4755282700061798,-.5,.15450850129127502,.29389262199401855,-.5,-.404508501291275,0,.5,0,.29389262199401855,-.5,-.404508501291275,-.29389262199401855,-.5,-.404508501291275,0,.5,0,-.29389262199401855,-.5,-.404508501291275,-.4755282700061798,-.5,.15450850129127502,0,.5,0,-.4755282700061798,-.5,.15450850129127502,-12246468525851679e-32,-.5,.5,0,.5,0,.4755282700061798,-.5,.15450850129127502,0,-.5,.5,0,-.5,0,.29389262199401855,-.5,-.404508501291275,.4755282700061798,-.5,.15450850129127502,0,-.5,0,-.29389262199401855,-.5,-.404508501291275,.29389262199401855,-.5,-.404508501291275,0,-.5,0,-.4755282700061798,-.5,.15450850129127502,-.29389262199401855,-.5,-.404508501291275,0,-.5,0,-12246468525851679e-32,-.5,.5,-.4755282700061798,-.5,.15450850129127502,0,-.5,0]),cone6:new Float32Array([0,-.5,.5,.4330126941204071,-.5,.25,0,.5,0,.4330126941204071,-.5,.25,.4330126941204071,-.5,-.25,0,.5,0,.4330126941204071,-.5,-.25,6123234262925839e-32,-.5,-.5,0,.5,0,6123234262925839e-32,-.5,-.5,-.4330126941204071,-.5,-.25,0,.5,0,-.4330126941204071,-.5,-.25,-.4330126941204071,-.5,.25,0,.5,0,-.4330126941204071,-.5,.25,-12246468525851679e-32,-.5,.5,0,.5,0,.4330126941204071,-.5,.25,0,-.5,.5,0,-.5,0,.4330126941204071,-.5,-.25,.4330126941204071,-.5,.25,0,-.5,0,6123234262925839e-32,-.5,-.5,.4330126941204071,-.5,-.25,0,-.5,0,-.4330126941204071,-.5,-.25,6123234262925839e-32,-.5,-.5,0,-.5,0,-.4330126941204071,-.5,.25,-.4330126941204071,-.5,-.25,0,-.5,0,-12246468525851679e-32,-.5,.5,-.4330126941204071,-.5,.25,0,-.5,0]),cone8:new Float32Array([0,-.5,.5,.3535533845424652,-.5,.3535533845424652,0,.5,0,.3535533845424652,-.5,.3535533845424652,.5,-.5,30616171314629196e-33,0,.5,0,.5,-.5,30616171314629196e-33,.3535533845424652,-.5,-.3535533845424652,0,.5,0,.3535533845424652,-.5,-.3535533845424652,6123234262925839e-32,-.5,-.5,0,.5,0,6123234262925839e-32,-.5,-.5,-.3535533845424652,-.5,-.3535533845424652,0,.5,0,-.3535533845424652,-.5,-.3535533845424652,-.5,-.5,-9184850732644269e-32,0,.5,0,-.5,-.5,-9184850732644269e-32,-.3535533845424652,-.5,.3535533845424652,0,.5,0,-.3535533845424652,-.5,.3535533845424652,-12246468525851679e-32,-.5,.5,0,.5,0,.3535533845424652,-.5,.3535533845424652,0,-.5,.5,0,-.5,0,.5,-.5,30616171314629196e-33,.3535533845424652,-.5,.3535533845424652,0,-.5,0,.3535533845424652,-.5,-.3535533845424652,.5,-.5,30616171314629196e-33,0,-.5,0,6123234262925839e-32,-.5,-.5,.3535533845424652,-.5,-.3535533845424652,0,-.5,0,-.3535533845424652,-.5,-.3535533845424652,6123234262925839e-32,-.5,-.5,0,-.5,0,-.5,-.5,-9184850732644269e-32,-.3535533845424652,-.5,-.3535533845424652,0,-.5,0,-.3535533845424652,-.5,.3535533845424652,-.5,-.5,-9184850732644269e-32,0,-.5,0,-12246468525851679e-32,-.5,.5,-.3535533845424652,-.5,.3535533845424652,0,-.5,0]),ico:new Float32Array([-.4253253936767578,0,.2628655433654785,0,.2628655433654785,.4253253936767578,-.2628655433654785,.4253253936767578,0,0,.2628655433654785,.4253253936767578,.2628655433654785,.4253253936767578,0,-.2628655433654785,.4253253936767578,0,.2628655433654785,.4253253936767578,0,0,.2628655433654785,-.4253253936767578,-.2628655433654785,.4253253936767578,0,0,.2628655433654785,-.4253253936767578,-.4253253936767578,0,-.2628655433654785,-.2628655433654785,.4253253936767578,0,-.4253253936767578,0,-.2628655433654785,-.4253253936767578,0,.2628655433654785,-.2628655433654785,.4253253936767578,0,0,.2628655433654785,.4253253936767578,.4253253936767578,0,.2628655433654785,.2628655433654785,.4253253936767578,0,-.4253253936767578,0,.2628655433654785,0,-.2628655433654785,.4253253936767578,0,.2628655433654785,.4253253936767578,-.4253253936767578,0,-.2628655433654785,-.2628655433654785,-.4253253936767578,0,-.4253253936767578,0,.2628655433654785,0,.2628655433654785,-.4253253936767578,0,-.2628655433654785,-.4253253936767578,-.4253253936767578,0,-.2628655433654785,.2628655433654785,.4253253936767578,0,.4253253936767578,0,-.2628655433654785,0,.2628655433654785,-.4253253936767578,.4253253936767578,0,.2628655433654785,0,-.2628655433654785,.4253253936767578,.2628655433654785,-.4253253936767578,0,0,-.2628655433654785,.4253253936767578,-.2628655433654785,-.4253253936767578,0,.2628655433654785,-.4253253936767578,0,-.2628655433654785,-.4253253936767578,0,0,-.2628655433654785,-.4253253936767578,.2628655433654785,-.4253253936767578,0,0,-.2628655433654785,-.4253253936767578,.4253253936767578,0,-.2628655433654785,.2628655433654785,-.4253253936767578,0,.4253253936767578,0,-.2628655433654785,.4253253936767578,0,.2628655433654785,.2628655433654785,-.4253253936767578,0,.4253253936767578,0,.2628655433654785,0,.2628655433654785,.4253253936767578,0,-.2628655433654785,.4253253936767578,0,-.2628655433654785,.4253253936767578,-.4253253936767578,0,.2628655433654785,-.2628655433654785,-.4253253936767578,0,-.2628655433654785,-.4253253936767578,0,-.4253253936767578,0,-.2628655433654785,0,-.2628655433654785,-.4253253936767578,0,-.2628655433654785,-.4253253936767578,0,.2628655433654785,-.4253253936767578,.4253253936767578,0,-.2628655433654785,.4253253936767578,0,-.2628655433654785,.2628655433654785,.4253253936767578,0,.4253253936767578,0,.2628655433654785]),dode:new Float32Array([0,.17841105163097382,.46708616614341736,.28867512941360474,.28867512941360474,.28867512941360474,-.28867512941360474,.28867512941360474,.28867512941360474,.28867512941360474,.28867512941360474,.28867512941360474,.17841105163097382,.46708616614341736,0,-.28867512941360474,.28867512941360474,.28867512941360474,.17841105163097382,.46708616614341736,0,-.17841105163097382,.46708616614341736,0,-.28867512941360474,.28867512941360474,.28867512941360474,.46708616614341736,0,.17841105163097382,.46708616614341736,0,-.17841105163097382,.28867512941360474,.28867512941360474,.28867512941360474,.46708616614341736,0,-.17841105163097382,.28867512941360474,.28867512941360474,-.28867512941360474,.28867512941360474,.28867512941360474,.28867512941360474,.28867512941360474,.28867512941360474,-.28867512941360474,.17841105163097382,.46708616614341736,0,.28867512941360474,.28867512941360474,.28867512941360474,.28867512941360474,-.28867512941360474,-.28867512941360474,0,-.17841105163097382,-.46708616614341736,.46708616614341736,0,-.17841105163097382,0,-.17841105163097382,-.46708616614341736,0,.17841105163097382,-.46708616614341736,.46708616614341736,0,-.17841105163097382,0,.17841105163097382,-.46708616614341736,.28867512941360474,.28867512941360474,-.28867512941360474,.46708616614341736,0,-.17841105163097382,-.28867512941360474,-.28867512941360474,-.28867512941360474,-.46708616614341736,0,-.17841105163097382,0,-.17841105163097382,-.46708616614341736,-.46708616614341736,0,-.17841105163097382,-.28867512941360474,.28867512941360474,-.28867512941360474,0,-.17841105163097382,-.46708616614341736,-.28867512941360474,.28867512941360474,-.28867512941360474,0,.17841105163097382,-.46708616614341736,0,-.17841105163097382,-.46708616614341736,-.17841105163097382,-.46708616614341736,0,-.28867512941360474,-.28867512941360474,.28867512941360474,-.28867512941360474,-.28867512941360474,-.28867512941360474,-.28867512941360474,-.28867512941360474,.28867512941360474,-.46708616614341736,0,.17841105163097382,-.28867512941360474,-.28867512941360474,-.28867512941360474,-.46708616614341736,0,.17841105163097382,-.46708616614341736,0,-.17841105163097382,-.28867512941360474,-.28867512941360474,-.28867512941360474,0,.17841105163097382,-.46708616614341736,-.28867512941360474,.28867512941360474,-.28867512941360474,.28867512941360474,.28867512941360474,-.28867512941360474,-.28867512941360474,.28867512941360474,-.28867512941360474,-.17841105163097382,.46708616614341736,0,.28867512941360474,.28867512941360474,-.28867512941360474,-.17841105163097382,.46708616614341736,0,.17841105163097382,.46708616614341736,0,.28867512941360474,.28867512941360474,-.28867512941360474,-.46708616614341736,0,-.17841105163097382,-.46708616614341736,0,.17841105163097382,-.28867512941360474,.28867512941360474,-.28867512941360474,-.46708616614341736,0,.17841105163097382,-.28867512941360474,.28867512941360474,.28867512941360474,-.28867512941360474,.28867512941360474,-.28867512941360474,-.28867512941360474,.28867512941360474,.28867512941360474,-.17841105163097382,.46708616614341736,0,-.28867512941360474,.28867512941360474,-.28867512941360474,-.28867512941360474,-.28867512941360474,.28867512941360474,0,-.17841105163097382,.46708616614341736,-.46708616614341736,0,.17841105163097382,0,-.17841105163097382,.46708616614341736,0,.17841105163097382,.46708616614341736,-.46708616614341736,0,.17841105163097382,0,.17841105163097382,.46708616614341736,-.28867512941360474,.28867512941360474,.28867512941360474,-.46708616614341736,0,.17841105163097382,.17841105163097382,-.46708616614341736,0,-.17841105163097382,-.46708616614341736,0,.28867512941360474,-.28867512941360474,-.28867512941360474,-.17841105163097382,-.46708616614341736,0,-.28867512941360474,-.28867512941360474,-.28867512941360474,.28867512941360474,-.28867512941360474,-.28867512941360474,-.28867512941360474,-.28867512941360474,-.28867512941360474,0,-.17841105163097382,-.46708616614341736,.28867512941360474,-.28867512941360474,-.28867512941360474,0,-.17841105163097382,.46708616614341736,.28867512941360474,-.28867512941360474,.28867512941360474,0,.17841105163097382,.46708616614341736,.28867512941360474,-.28867512941360474,.28867512941360474,.46708616614341736,0,.17841105163097382,0,.17841105163097382,.46708616614341736,.46708616614341736,0,.17841105163097382,.28867512941360474,.28867512941360474,.28867512941360474,0,.17841105163097382,.46708616614341736,.28867512941360474,-.28867512941360474,.28867512941360474,.17841105163097382,-.46708616614341736,0,.46708616614341736,0,.17841105163097382,.17841105163097382,-.46708616614341736,0,.28867512941360474,-.28867512941360474,-.28867512941360474,.46708616614341736,0,.17841105163097382,.28867512941360474,-.28867512941360474,-.28867512941360474,.46708616614341736,0,-.17841105163097382,.46708616614341736,0,.17841105163097382,-.17841105163097382,-.46708616614341736,0,.17841105163097382,-.46708616614341736,0,-.28867512941360474,-.28867512941360474,.28867512941360474,.17841105163097382,-.46708616614341736,0,.28867512941360474,-.28867512941360474,.28867512941360474,-.28867512941360474,-.28867512941360474,.28867512941360474,.28867512941360474,-.28867512941360474,.28867512941360474,0,-.17841105163097382,.46708616614341736,-.28867512941360474,-.28867512941360474,.28867512941360474]),sphere:new Float32Array([0,.5,0,-.25,.4330126941204071,0,-.1767766922712326,.4330126941204071,.1767766922712326,0,.5,0,-.1767766922712326,.4330126941204071,.1767766922712326,-15308085657314598e-33,.4330126941204071,.25,0,.5,0,-15308085657314598e-33,.4330126941204071,.25,.1767766922712326,.4330126941204071,.1767766922712326,0,.5,0,.1767766922712326,.4330126941204071,.1767766922712326,.25,.4330126941204071,30616171314629196e-33,0,.5,0,.25,.4330126941204071,30616171314629196e-33,.1767766922712326,.4330126941204071,-.1767766922712326,0,.5,0,.1767766922712326,.4330126941204071,-.1767766922712326,45924253663221344e-33,.4330126941204071,-.25,0,.5,0,45924253663221344e-33,.4330126941204071,-.25,-.1767766922712326,.4330126941204071,-.1767766922712326,0,.5,0,-.1767766922712326,.4330126941204071,-.1767766922712326,-.25,.4330126941204071,-6123234262925839e-32,-.1767766922712326,.4330126941204071,.1767766922712326,-.25,.4330126941204071,0,-.3061862289905548,.25,.3061862289905548,-.25,.4330126941204071,0,-.4330126941204071,.25,0,-.3061862289905548,.25,.3061862289905548,-15308085657314598e-33,.4330126941204071,.25,-.1767766922712326,.4330126941204071,.1767766922712326,-26514381180325745e-33,.25,.4330126941204071,-.1767766922712326,.4330126941204071,.1767766922712326,-.3061862289905548,.25,.3061862289905548,-26514381180325745e-33,.25,.4330126941204071,.1767766922712326,.4330126941204071,.1767766922712326,-15308085657314598e-33,.4330126941204071,.25,.3061862289905548,.25,.3061862289905548,-15308085657314598e-33,.4330126941204071,.25,-26514381180325745e-33,.25,.4330126941204071,.3061862289905548,.25,.3061862289905548,.25,.4330126941204071,30616171314629196e-33,.1767766922712326,.4330126941204071,.1767766922712326,.4330126941204071,.25,5302876236065149e-32,.1767766922712326,.4330126941204071,.1767766922712326,.3061862289905548,.25,.3061862289905548,.4330126941204071,.25,5302876236065149e-32,.1767766922712326,.4330126941204071,-.1767766922712326,.25,.4330126941204071,30616171314629196e-33,.3061862289905548,.25,-.3061862289905548,.25,.4330126941204071,30616171314629196e-33,.4330126941204071,.25,5302876236065149e-32,.3061862289905548,.25,-.3061862289905548,45924253663221344e-33,.4330126941204071,-.25,.1767766922712326,.4330126941204071,-.1767766922712326,7954314354097723e-32,.25,-.4330126941204071,.1767766922712326,.4330126941204071,-.1767766922712326,.3061862289905548,.25,-.3061862289905548,7954314354097723e-32,.25,-.4330126941204071,-.1767766922712326,.4330126941204071,-.1767766922712326,45924253663221344e-33,.4330126941204071,-.25,-.3061862289905548,.25,-.3061862289905548,45924253663221344e-33,.4330126941204071,-.25,7954314354097723e-32,.25,-.4330126941204071,-.3061862289905548,.25,-.3061862289905548,-.25,.4330126941204071,-6123234262925839e-32,-.1767766922712326,.4330126941204071,-.1767766922712326,-.4330126941204071,.25,-10605752472130298e-32,-.1767766922712326,.4330126941204071,-.1767766922712326,-.3061862289905548,.25,-.3061862289905548,-.4330126941204071,.25,-10605752472130298e-32,-.3061862289905548,.25,.3061862289905548,-.4330126941204071,.25,0,-.3535533845424652,30616171314629196e-33,.3535533845424652,-.4330126941204071,.25,0,-.5,30616171314629196e-33,0,-.3535533845424652,30616171314629196e-33,.3535533845424652,-26514381180325745e-33,.25,.4330126941204071,-.3061862289905548,.25,.3061862289905548,-30616171314629196e-33,30616171314629196e-33,.5,-.3061862289905548,.25,.3061862289905548,-.3535533845424652,30616171314629196e-33,.3535533845424652,-30616171314629196e-33,30616171314629196e-33,.5,.3061862289905548,.25,.3061862289905548,-26514381180325745e-33,.25,.4330126941204071,.3535533845424652,30616171314629196e-33,.3535533845424652,-26514381180325745e-33,.25,.4330126941204071,-30616171314629196e-33,30616171314629196e-33,.5,.3535533845424652,30616171314629196e-33,.3535533845424652,.4330126941204071,.25,5302876236065149e-32,.3061862289905548,.25,.3061862289905548,.5,30616171314629196e-33,6123234262925839e-32,.3061862289905548,.25,.3061862289905548,.3535533845424652,30616171314629196e-33,.3535533845424652,.5,30616171314629196e-33,6123234262925839e-32,.3061862289905548,.25,-.3061862289905548,.4330126941204071,.25,5302876236065149e-32,.3535533845424652,30616171314629196e-33,-.3535533845424652,.4330126941204071,.25,5302876236065149e-32,.5,30616171314629196e-33,6123234262925839e-32,.3535533845424652,30616171314629196e-33,-.3535533845424652,7954314354097723e-32,.25,-.4330126941204071,.3061862289905548,.25,-.3061862289905548,9184850732644269e-32,30616171314629196e-33,-.5,.3061862289905548,.25,-.3061862289905548,.3535533845424652,30616171314629196e-33,-.3535533845424652,9184850732644269e-32,30616171314629196e-33,-.5,-.3061862289905548,.25,-.3061862289905548,7954314354097723e-32,.25,-.4330126941204071,-.3535533845424652,30616171314629196e-33,-.3535533845424652,7954314354097723e-32,.25,-.4330126941204071,9184850732644269e-32,30616171314629196e-33,-.5,-.3535533845424652,30616171314629196e-33,-.3535533845424652,-.4330126941204071,.25,-10605752472130298e-32,-.3061862289905548,.25,-.3061862289905548,-.5,30616171314629196e-33,-12246468525851679e-32,-.3061862289905548,.25,-.3061862289905548,-.3535533845424652,30616171314629196e-33,-.3535533845424652,-.5,30616171314629196e-33,-12246468525851679e-32,-.3535533845424652,30616171314629196e-33,.3535533845424652,-.5,30616171314629196e-33,0,-.3061862289905548,-.25,.3061862289905548,-.5,30616171314629196e-33,0,-.4330126941204071,-.25,0,-.3061862289905548,-.25,.3061862289905548,-30616171314629196e-33,30616171314629196e-33,.5,-.3535533845424652,30616171314629196e-33,.3535533845424652,-26514381180325745e-33,-.25,.4330126941204071,-.3535533845424652,30616171314629196e-33,.3535533845424652,-.3061862289905548,-.25,.3061862289905548,-26514381180325745e-33,-.25,.4330126941204071,.3535533845424652,30616171314629196e-33,.3535533845424652,-30616171314629196e-33,30616171314629196e-33,.5,.3061862289905548,-.25,.3061862289905548,-30616171314629196e-33,30616171314629196e-33,.5,-26514381180325745e-33,-.25,.4330126941204071,.3061862289905548,-.25,.3061862289905548,.5,30616171314629196e-33,6123234262925839e-32,.3535533845424652,30616171314629196e-33,.3535533845424652,.4330126941204071,-.25,5302876236065149e-32,.3535533845424652,30616171314629196e-33,.3535533845424652,.3061862289905548,-.25,.3061862289905548,.4330126941204071,-.25,5302876236065149e-32,.3535533845424652,30616171314629196e-33,-.3535533845424652,.5,30616171314629196e-33,6123234262925839e-32,.3061862289905548,-.25,-.3061862289905548,.5,30616171314629196e-33,6123234262925839e-32,.4330126941204071,-.25,5302876236065149e-32,.3061862289905548,-.25,-.3061862289905548,9184850732644269e-32,30616171314629196e-33,-.5,.3535533845424652,30616171314629196e-33,-.3535533845424652,7954314354097723e-32,-.25,-.4330126941204071,.3535533845424652,30616171314629196e-33,-.3535533845424652,.3061862289905548,-.25,-.3061862289905548,7954314354097723e-32,-.25,-.4330126941204071,-.3535533845424652,30616171314629196e-33,-.3535533845424652,9184850732644269e-32,30616171314629196e-33,-.5,-.3061862289905548,-.25,-.3061862289905548,9184850732644269e-32,30616171314629196e-33,-.5,7954314354097723e-32,-.25,-.4330126941204071,-.3061862289905548,-.25,-.3061862289905548,-.5,30616171314629196e-33,-12246468525851679e-32,-.3535533845424652,30616171314629196e-33,-.3535533845424652,-.4330126941204071,-.25,-10605752472130298e-32,-.3535533845424652,30616171314629196e-33,-.3535533845424652,-.3061862289905548,-.25,-.3061862289905548,-.4330126941204071,-.25,-10605752472130298e-32,-.3061862289905548,-.25,.3061862289905548,-.4330126941204071,-.25,0,-.1767766922712326,-.4330126941204071,.1767766922712326,-.4330126941204071,-.25,0,-.25,-.4330126941204071,0,-.1767766922712326,-.4330126941204071,.1767766922712326,-26514381180325745e-33,-.25,.4330126941204071,-.3061862289905548,-.25,.3061862289905548,-15308085657314598e-33,-.4330126941204071,.25,-.3061862289905548,-.25,.3061862289905548,-.1767766922712326,-.4330126941204071,.1767766922712326,-15308085657314598e-33,-.4330126941204071,.25,.3061862289905548,-.25,.3061862289905548,-26514381180325745e-33,-.25,.4330126941204071,.1767766922712326,-.4330126941204071,.1767766922712326,-26514381180325745e-33,-.25,.4330126941204071,-15308085657314598e-33,-.4330126941204071,.25,.1767766922712326,-.4330126941204071,.1767766922712326,.4330126941204071,-.25,5302876236065149e-32,.3061862289905548,-.25,.3061862289905548,.25,-.4330126941204071,30616171314629196e-33,.3061862289905548,-.25,.3061862289905548,.1767766922712326,-.4330126941204071,.1767766922712326,.25,-.4330126941204071,30616171314629196e-33,.3061862289905548,-.25,-.3061862289905548,.4330126941204071,-.25,5302876236065149e-32,.1767766922712326,-.4330126941204071,-.1767766922712326,.4330126941204071,-.25,5302876236065149e-32,.25,-.4330126941204071,30616171314629196e-33,.1767766922712326,-.4330126941204071,-.1767766922712326,7954314354097723e-32,-.25,-.4330126941204071,.3061862289905548,-.25,-.3061862289905548,45924253663221344e-33,-.4330126941204071,-.25,.3061862289905548,-.25,-.3061862289905548,.1767766922712326,-.4330126941204071,-.1767766922712326,45924253663221344e-33,-.4330126941204071,-.25,-.3061862289905548,-.25,-.3061862289905548,7954314354097723e-32,-.25,-.4330126941204071,-.1767766922712326,-.4330126941204071,-.1767766922712326,7954314354097723e-32,-.25,-.4330126941204071,45924253663221344e-33,-.4330126941204071,-.25,-.1767766922712326,-.4330126941204071,-.1767766922712326,-.4330126941204071,-.25,-10605752472130298e-32,-.3061862289905548,-.25,-.3061862289905548,-.25,-.4330126941204071,-6123234262925839e-32,-.3061862289905548,-.25,-.3061862289905548,-.1767766922712326,-.4330126941204071,-.1767766922712326,-.25,-.4330126941204071,-6123234262925839e-32,-.1767766922712326,-.4330126941204071,.1767766922712326,-.25,-.4330126941204071,0,0,-.5,0,-15308085657314598e-33,-.4330126941204071,.25,-.1767766922712326,-.4330126941204071,.1767766922712326,0,-.5,0,.1767766922712326,-.4330126941204071,.1767766922712326,-15308085657314598e-33,-.4330126941204071,.25,0,-.5,0,.25,-.4330126941204071,30616171314629196e-33,.1767766922712326,-.4330126941204071,.1767766922712326,0,-.5,0,.1767766922712326,-.4330126941204071,-.1767766922712326,.25,-.4330126941204071,30616171314629196e-33,0,-.5,0,45924253663221344e-33,-.4330126941204071,-.25,.1767766922712326,-.4330126941204071,-.1767766922712326,0,-.5,0,-.1767766922712326,-.4330126941204071,-.1767766922712326,45924253663221344e-33,-.4330126941204071,-.25,0,-.5,0,-.25,-.4330126941204071,-6123234262925839e-32,-.1767766922712326,-.4330126941204071,-.1767766922712326,0,-.5,0]),prism:new Float32Array([-.5,0,-.5,0,1,-.5,.5,0,-.5,.5,0,.5,0,1,.5,-.5,0,.5,-.5,0,-.5,.5,0,-.5,-.5,0,.5,.5,0,-.5,.5,0,.5,-.5,0,.5,.5,0,-.5,0,1,-.5,.5,0,.5,0,1,-.5,0,1,.5,.5,0,.5,0,1,-.5,-.5,0,-.5,0,1,.5,-.5,0,-.5,-.5,0,.5,0,1,.5])},Op=class{constructor(){this.a=new Float32Array(1024),this.n=0}push3(e,t,n){if(this.n+3>this.a.length){let e=new Float32Array(this.a.length*2);e.set(this.a),this.a=e}this.a[this.n++]=e,this.a[this.n++]=t,this.a[this.n++]=n}take(){return this.a.slice(0,this.n)}},kp=class{constructor(){this.p=new Op,this.c=new Op,this.base=yp(),this.ao=null,this.stack=[],this.aoStack=[]}get empty(){return this.p.n===0}push(e){this.stack.push(bp(yp(),this.base)),this.aoStack.push(this.ao),this.base=xp(yp(),this.base,e),this.ao=this.base[13]}pop(){this.base=this.stack.pop()??yp(),this.ao=this.aoStack.pop()??null}at(e,t,n,r=0,i=1){this.push(Ep(yp(),e,t,n,Cp(Sp(),r),i,i,i))}tri(e,t,n,r,i,a,o,s,c,l){this.p.push3(e,t,n),this.p.push3(r,i,a),this.p.push3(o,s,c);for(let e=0;e<3;e++)this.c.push3(l.r,l.g,l.b)}shape(e,t,n){let r=xp(Mp,this.base,t),i=this.ao;for(let t=0;t<e.length;t+=3){let a=e[t],o=e[t+1],s=e[t+2],c=1/(r[3]*a+r[7]*o+r[11]*s+r[15]),l=(r[0]*a+r[4]*o+r[8]*s+r[12])*c,u=(r[1]*a+r[5]*o+r[9]*s+r[13])*c,d=(r[2]*a+r[6]*o+r[10]*s+r[14])*c;if(this.p.push3(l,u,d),i===null)this.c.push3(n.r,n.g,n.b);else{let e=u-i,t=e<=0?.6:e>=3?1:.6+.4*Math.sqrt(e/3);this.c.push3(n.r*t,n.g*t,n.b*t)}}}build(){let e=this.p.take();return{position:e,color:this.c.take(),normal:Ap(e),sphere:jp(e)}}};function Ap(e){let t=new Float32Array(e.length);for(let n=0;n<e.length;n+=9){let r=e[n],i=e[n+1],a=e[n+2],o=e[n+3],s=e[n+4],c=e[n+5],l=e[n+6],u=e[n+7],d=e[n+8],f=l-o,p=u-s,m=d-c,h=r-o,g=i-s,_=a-c,v=p*_-m*g,y=m*h-f*_,b=f*g-p*h;for(let e=0;e<3;e++)t[n+e*3]=v,t[n+e*3+1]=y,t[n+e*3+2]=b}for(let e=0;e<t.length;e+=3){let n=t[e],r=t[e+1],i=t[e+2],a=1/(Math.sqrt(n*n+r*r+i*i)||1);t[e]=n*a,t[e+1]=r*a,t[e+2]=i*a}return t}function jp(e){if(!e.length)return[0,0,0,0];let t=1/0,n=1/0,r=1/0,i=-1/0,a=-1/0,o=-1/0;for(let s=0;s<e.length;s+=3){let c=e[s],l=e[s+1],u=e[s+2];c<t&&(t=c),l<n&&(n=l),u<r&&(r=u),c>i&&(i=c),l>a&&(a=l),u>o&&(o=u)}let s=(t+i)*.5,c=(n+a)*.5,l=(r+o)*.5,u=0;for(let t=0;t<e.length;t+=3){let n=s-e[t],r=c-e[t+1],i=l-e[t+2];u=Math.max(u,n*n+r*r+i*i)}return[s,c,l,Math.sqrt(u)]}var Mp=yp(),Np=yp(),Pp=Sp();function Z(e,t,n,r,i,a,o,s,c,l=0,u=0,d=0){wp(Pp,u,l,d),Ep(Np,r,i,a,Pp,o,s,c),e.shape(Dp[t],Np,typeof n==`number`?_p(n):n)}function Q(e,t,n,r,i,a,o,s,c=0){Z(e,`box`,t,n,r+o/2,i,a,o,s,c)}function Fp(e,t,n,r,i,a,o,s,c,l=c){let u=a-n,d=o-r,f=s-i,p=Math.sqrt(u*u+d*d+f*f);if(p<1e-4)return;let m=1/p;u*=m,d*=m,f*=m,Tp(Pp,0,0,1,u,d,f),Ep(Np,(n+a)/2,(r+o)/2,(i+s)/2,Pp,c,l,p),e.shape(Dp.box,Np,typeof t==`number`?_p(t):t)}var Ip=[5216828,6138437,7059534,4164154],Lp=[3111498,2780485,3835730],Rp=[16049089,16502949,13494002,16172999,15265992,16777215,16377759],zp=[13129021,10239795,4020864,5982827,14254635];function Bp(e,t,n=1){let r=Lp[t()*Lp.length|0];Z(e,`disc6`,4161338,0,.12,0,4.4*n,1,4.4*n,t()*3),Z(e,`tube6`,8016438,0,1*n,0,.6*n,2*n,.6*n),Z(e,`ocone6`,vp(r,(t()-.5)*.06),0,3.4*n,0,4.4*n,4*n,4.4*n,t()*3),Z(e,`ocone6`,vp(r,.03),0,5.6*n,0,3.3*n,3.4*n,3.3*n,t()*3),Z(e,`ocone6`,vp(r,.06),0,7.5*n,0,2.1*n,2.8*n,2.1*n,t()*3)}function Vp(e,t,n=1){let r=Ip[t()*Ip.length|0];Z(e,`disc6`,4885052,0,.12,0,5.2*n,1,5.2*n,t()*3),Z(e,`tube6`,8016438,0,1.4*n,0,.7*n,2.8*n,.7*n),Z(e,`ico`,vp(r,(t()-.5)*.08),0,4.2*n,0,5*n,4.4*n,5*n,t()*3,t()),Z(e,`ico`,vp(r,.05),1.1*n,5.4*n,.4*n,3*n,2.8*n,3*n,t()*3)}function Hp(e,t,n=1){Z(e,`ico`,vp(Ip[t()*Ip.length|0],-.03),0,.7*n,0,2.4*n,1.7*n,2.4*n,t()*3)}function Up(e,t,n=1){Z(e,`dode`,vp(10129801,(t()-.5)*.1),0,.5*n,0,3*n*(.8+t()*.5),2*n,2.6*n,t()*6,t()*.4)}function Wp(e,t,n=!1){let r=n?12:8+t()*3,i=n?10:7+t()*2,a=n?7.5:4+t()*1.5,o=Rp[t()*Rp.length|0],s=zp[t()*zp.length|0];Q(e,12168602,0,0,0,r+.6,.5,i+.6),Q(e,o,0,.5,0,r,a,i),Z(e,`prism`,s,0,.5+a,0,r+1.2,3+t()*1.5,i+1,0),Z(e,`box`,8014640,0,1.6,i/2+.05,1.3,2.2,.15);let c=6061987;for(let t of[-r/3,r/3])Z(e,`box`,c,t,.5+a*.55,i/2+.05,1.3,1.2,.12),Z(e,`box`,16777215,t,.5+a*.55-.7,i/2+.1,1.6,.18,.2);if(n)for(let t of[-r/3,r/3])Z(e,`box`,c,t,.5+a*.2,i/2+.05,1.3,1.2,.12);t()<.6&&Q(e,9276813,r*.25,.5+a,-i*.2,.8,3,.8)}function Gp(e,t){let n=[16769162,11066076,16032675,12839053][t()*4|0];Q(e,n,0,0,0,12,6,9),Q(e,vp(n,-.2),0,6,0,12.4,.6,9.4),Z(e,`box`,6061987,0,2,4.55,12*.7,2.4,.12);for(let t=0;t<6;t++)Z(e,`box`,t%2?16777215:15087942,-12*.35+(t+.5)*(12*.7)/6,3.6,5.4,12*.7/6,.2,1.8,0,-.35);Z(e,`box`,16774102,0,5,4.6,12*.6,1,.15)}function Kp(e){Q(e,15326403,0,0,0,7,20,7),Q(e,13615007,0,20,0,8,1,8),Q(e,15326403,0,21,0,6,6,6);for(let t=0;t<4;t++){let n=t*Math.PI/2;Z(e,`cyl12`,16777215,Math.sin(n)*3.05,24,Math.cos(n)*3.05,3.4,.2,3.4,n,Math.PI/2),Z(e,`box`,1911364,Math.sin(n)*3.2,24.4,Math.cos(n)*3.2,.25,1.4,.1,n)}Z(e,`cone8`,4020864,0,31,0,8.5,8,8.5,Math.PI/8),Z(e,`sphere`,16762941,0,35.4,0,.9,.9,.9)}function qp(e){Q(e,12007983,0,0,0,16,8,22),Z(e,`prism`,7023140,0,8,0,17.5,6,23),Z(e,`box`,16777215,0,3.4,11.05,7.2,6.8,.2),Z(e,`box`,10694698,0,3.4,11.12,6.4,6.2,.2),Z(e,`box`,16777215,0,3.4,11.2,.35,8.4,.12,0,0,.78),Z(e,`box`,16777215,0,3.4,11.2,.35,8.4,.12,0,0,-.78),Z(e,`box`,16777215,0,10.2,11.2,2.4,2.4,.2)}function Jp(e){Z(e,`cyl12`,14673642,0,9,0,6,18,6),Z(e,`sphere`,11056315,0,18,0,6,4,6);for(let t=1;t<5;t++)Z(e,`cyl12`,12174538,0,t*3.6,0,6.15,.3,6.15)}function Yp(e){Z(e,`cyl8`,15123306,0,.9,0,1.8,2.2,1.8,0,0,Math.PI/2)}function Xp(e,t){let n=Math.max(1,Math.round(t/3));for(let r=0;r<=n;r++)Z(e,`box`,15852486,-t/2+r*t/n,.7,0,.25,1.4,.25);Z(e,`box`,15852486,0,1.05,0,t,.18,.12),Z(e,`box`,15852486,0,.55,0,t,.18,.12)}var Zp=[15087942,1933270,16032353,2792847,16762941,7097014,15167313];function Qp(e,t,n=12){Q(e,t,0,0,0,2.44,2.6,n);let r=vp(t,-.12);for(let t=0;t<7;t++){let i=-n/2+.6+t*(n-1.2)/6;Z(e,`box`,r,1.24,1.3,i,.08,2.5,.3),Z(e,`box`,r,-1.24,1.3,i,.08,2.5,.3)}Z(e,`box`,r,0,1.3,n/2+.03,2.2,2.4,.06)}function $p(e,t,n,r,i){for(let a=0;a<n;a++)for(let n=0;n<r;n++){let r=1+(t()*i|0);for(let i=0;i<r;i++)e.at(a*2.7,i*2.62,n*12.6),Qp(e,Zp[t()*Zp.length|0]),e.pop()}}function em(e,t=16762941){for(let n of[-5,5])for(let r of[-4,4])Q(e,t,n,0,r,1,22,1);Q(e,t,0,20,4,11,1.2,1),Q(e,t,0,20,-4,11,1.2,1),Q(e,vp(t,-.1),0,22,8,2,1.6,44),Q(e,3885658,0,22.5,-2,5,3.5,6),Z(e,`box`,5592405,0,16,22,.15,12,.15),Q(e,3355443,0,9.5,22,3,.6,1.5)}function tm(e){Q(e,2372685,0,-2,0,14,5,60),Z(e,`prism`,2372685,0,-2,33.4,14,5,7,0,0,Math.PI),Q(e,12597547,0,-2,0,14.1,1.4,60.1),Q(e,15330543,0,3,-22,12,4,10),Q(e,15330543,0,7,-23,9,3.4,7),Z(e,`box`,3888752,0,8.6,-19.4,8,1,.2),Z(e,`cyl8`,15087942,0,12,-25,2.4,4,2.4)}function nm(e){for(let t=0;t<6;t++)Z(e,`cyl12`,t%2?15087942:16777215,0,2+t*4,0,5-t*.35,4,5-t*.35);Z(e,`cyl8`,3355443,0,24.5,0,4,1,4),Z(e,`cyl8`,16774064,0,26.3,0,2.6,2.6,2.6),Z(e,`cone8`,15087942,0,28.8,0,3.6,2.4,3.6)}function rm(e,t,n,r,i,a){Q(e,i,0,0,0,t,r,n),Z(e,`prism`,a,0,r,0,t+1,2.4,n+1)}function im(e,t){for(let n=0;n<3;n++)for(let r=0;r<4-n;r++)Z(e,`cyl8`,vp(9067062,(t()-.5)*.08),-2.4+r*1.6+n*.8,.7+n*1.35,0,1.4,9,1.4,0,Math.PI/2),Z(e,`cyl8`,14727039,-2.4+r*1.6+n*.8,.7+n*1.35,4.52,1.2,.05,1.2,0,Math.PI/2)}function am(e,t,n){for(let r=0;r<n;r++){let n=1.2+t()*.6;Z(e,`box`,vp(13145434,(t()-.5)*.1),(t()-.5)*6,n/2,(t()-.5)*6,n,n,n,t()*1.5)}}function om(e,t,n=1){Z(e,`disc6`,4885052,0,.12,0,3.6*n,1,3.6*n,t()*3),Z(e,`tube6`,15921126,0,2.2*n,0,.45*n,4.4*n,.45*n);for(let t=0;t<3;t++)Z(e,`box`,3815994,0,(1+t*1.2)*n,.2*n,.3*n,.1*n,.1*n,t);Z(e,`ico`,vp(10275930,(t()-.5)*.08),0,5.4*n,0,3.2*n,4.2*n,3.2*n,t()*3)}function sm(e,t,n=1){Z(e,`disc6`,4161338,0,.12,0,3*n,1,3*n,t()*3),Z(e,`tube6`,7031347,0,.6*n,0,.5*n,1.2*n,.5*n),Z(e,`ocone6`,vp(3107647,(t()-.5)*.06),0,5*n,0,2.6*n,8.5*n,2.6*n,t()*3)}function cm(e,t,n=1){let r=[15311419,14246443,15909198][t()*3|0];Z(e,`disc6`,4885052,0,.12,0,5*n,1,5*n,t()*3),Z(e,`tube6`,8016438,0,1.4*n,0,.7*n,2.8*n,.7*n),Z(e,`ico`,vp(r,(t()-.5)*.06),0,4.3*n,0,5*n,4.2*n,5*n,t()*3,t())}function lm(e,t){let n=vp(t()<.5?6201150:8173900,(t()-.5)*.06);Z(e,`cone5`,n,0,.35,0,.9,.7,.9,t()*3),t()<.5&&Z(e,`cone5`,n,.5,.28,.2,.6,.56,.6,t()*3)}var um=[16739179,16767293,16777215,13073919,16752451];function dm(e,t){let n=um[t()*um.length|0];for(let r=0;r<4;r++)Z(e,`cone5`,n,(t()-.5)*1.6,.3,(t()-.5)*1.6,.35,.3,.35,0,Math.PI);Z(e,`cone5`,6201150,0,.2,0,1.1,.4,1.1,t())}function fm(e){Z(e,`tube6`,4212303,0,3.5,0,.25,7,.25),Z(e,`box`,4212303,.8,7,0,1.8,.18,.18),Z(e,`box`,16774064,1.5,6.8,0,.7,.3,.45)}function pm(e){Z(e,`box`,10251075,0,.55,0,2.4,.12,.6),Z(e,`box`,10251075,0,.95,-.28,2.4,.5,.1);for(let t of[-1,1])Z(e,`box`,4212303,t,.27,0,.12,.55,.55)}function mm(e,t){for(let t of[-1.6,1.6])for(let n of[-1,1])Z(e,`box`,15852486,t,1.2,n,.15,2.4,.15);Z(e,`box`,10251075,0,.9,0,3.4,.2,2.1);for(let n=0;n<4;n++)Z(e,`box`,n%2?16777215:t,-1.3+n*.87,2.55,0,.87,.18,2.4,0,.18);for(let t=0;t<5;t++)Z(e,`sphere`,[16739179,16767293,8173900,16752451][t%4],-1.2+t*.6,1.15,.3,.45,.4,.45)}function hm(e){Z(e,`cyl8`,2830134,0,.45,0,.6,.9,.6),Z(e,`cyl8`,2830134,0,.95,0,.8,.15,.8)}function gm(e,t){Z(e,`tube6`,14540253,0,4,0,.18,8,.18),Z(e,`box`,t,1,7.2,0,2,1.2,.06)}function _m(e,t){for(let n=0;n<14;n++){let r=n/14*Math.PI*2,i=(n+1)/14*Math.PI*2,a=Math.cos(r)*t,o=Math.sin(r)*t,s=Math.cos(i)*t,c=Math.sin(i)*t;e.at((a+s)/2,0,(o+c)/2,Math.atan2(-(c-o),s-a)),Xp(e,Math.hypot(s-a,c-o)),e.pop()}}var vm=[16176824,13624304,16049089,15254724,14149829,15921126];function ym(e,t){let n=10+t()*3,r=t()<.5?2:3,i=r*3.3+.6,a=vm[t()*vm.length|0];Q(e,a,0,0,0,n,i,9),Q(e,vp(a,-.15),0,i,0,n+.4,.7,9.4),Q(e,vp(a,-.08),0,0,4.55,n,.8,.12),Z(e,`box`,7031347,n*.3,1.3,4.56,1.3,2.4,.12);let o=Math.max(2,Math.round(n/3.2));for(let t=0;t<r;t++)for(let r=0;r<o;r++){let i=-n/2+(r+.5)*(n/o);t===0&&Math.abs(i-n*.3)<1.4||(Z(e,`box`,5205908,i,1.8+t*3.3,4.56,1.2,1.5,.1),Z(e,`box`,16777215,i,1+t*3.3,4.6,1.5,.15,.2))}if(t()<.5)for(let r=0;r<5;r++)Z(e,`box`,r%2?16777215:[2792847,15087942,1933270][t()*3|0],-n/2+1+r*((n-2)/5)+(n-2)/10,3.1,5.2,(n-2)/5,.15,1.4,0,-.3)}function bm(e,t){Z(e,`box`,t,0,.75,0,1.9,.8,4.2),Z(e,`box`,t,0,1.45,-.3,1.7,.7,2.2),Z(e,`box`,3824250,0,1.45,-.3,1.74,.5,1.9);for(let t of[-.9,.9])for(let n of[-1.35,1.35])Z(e,`cyl8`,2236962,t,.38,n,.76,.3,.76,0,0,Math.PI/2)}function xm(e,t){Z(e,`cyl8`,16777215,0,.75,0,1.2,.08,1.2),Z(e,`cyl6`,4212303,0,.37,0,.12,.75,.12),Z(e,`tube6`,14540253,0,1.4,0,.08,2.8,.08),Z(e,`cone8`,t,0,2.8,0,3,.8,3);for(let t of[0,Math.PI])Z(e,`box`,10251075,Math.cos(t)*1,.45,Math.sin(t)*1,.5,.08,.5)}function Sm(e,t=!1){let n=new Aa,r=new ha(e.position,3),i=new ha(e.color,3),a=new ha(e.normal,3);if(t){let e=function(){this.array=null};r.onUpload(e),i.onUpload(e),a.onUpload(e)}return n.setAttribute(`position`,r),n.setAttribute(`color`,i),n.setAttribute(`normal`,a),n.boundingSphere=new Sa(new K(e.sphere[0],e.sphere[1],e.sphere[2]),e.sphere[3]),n}function Cm(){return new lc({vertexColors:!0})}var wm={garage:[8,8,9,11,13],warehouse:[8,8,10,12,16],fuel:[4,7,8,11,12]};function Tm(e){let t=e.landmark(`depotYard`),n=e.places[t.place],r={};for(let e of Object.keys(wm))r[e]={x:n.x+t.slots[e][0],z:n.z+t.slots[e][1],top:wm[e]};return r}function Em(e,t){let n=[10466504,10466504,12109782,13621731,15133938][t],r=[2832981,2832981,2832981,1911364,1911364][t],i=t>=3?3:t>=2?2:1,a=i*8+4,o=t>=3?8:t>=2?7:6,s=t>=3?14:12;Q(e,9278363,0,0,0,a+2,.3,s+5),Q(e,n,0,.3,-1,a,o,s),Q(e,r,0,.3+o,-1,a+.8,.6,s+.8);for(let t=0;t<i;t++){let n=-a/2+2+4+t*8;Z(e,`box`,13225686,n,.3+2.4,s/2-.95,6.4,4.8,.2);for(let t=0;t<6;t++)Z(e,`box`,10133931,n,.8+t*.8,s/2-.82,6.4,.08,.1);Z(e,`box`,16762941,n,.3+5.1,s/2-.85,6.8,.25,.15)}if(t>=2){Q(e,15764004,0,.3+o-1.1,s/2-.95,a,.5,.14);for(let t=0;t<2;t++)Z(e,`cyl8`,10133931,-a/4+a/2*t,.3+o+1,-2,1.2,1.4,1.2);for(let t=0;t<4;t++)Z(e,`cyl12`,2237739,a/2+1.8,.35+t*.5,s/2-1,1.6,.45,1.6)}if(t>=3){Q(e,16777215,-a/2-3.5,.3,-2,7,9.5,9);for(let t=0;t<2;t++)Z(e,`box`,6061987,-a/2-3.5,3+t*3.8,2.55,5,1.8,.12);Q(e,4212303,-5,.3+o+.6,-3,.4,3,.4),Q(e,4212303,5,.3+o+.6,-3,.4,3,.4),Q(e,16762941,0,.3+o+2.4,-3,13,2.6,.4),Q(e,15087942,0,.3+o+2.9,-2.75,11.5,.7,.1),Q(e,14540253,a/2+2,0,-6,.25,13,.25),Z(e,`box`,15087942,a/2+3.4,12,-6,2.6,1.6,.08)}t>=4&&(Q(e,10477813,a/2+5,.3,1,8,5.5,9),Q(e,16762941,a/2+5,5.8,1,8.4,.5,9.4),Z(e,`sphere`,15330543,-a/2-3.5,11.2,-2,2.4,1,2.4,0,.6),Q(e,16762941,0,.3+o,s/2-.5,a+.8,.3,.3))}function Dm(e,t){if(t<=1){Q(e,9278363,0,0,0,16,.3,16),rm(e,12,10,5,11565647,8014640),Z(e,`box`,8014640,0,2.2,5.05,5,4.2,.2),e.at(0,0,7),am(e,km(t),3),e.pop();return}let n=t>=3?24:18,r=t>=4?11:t>=3?9:7,i=t>=3?14:12,a=t>=3?7315400:8366281;Q(e,9278363,0,0,0,n+4,.3,i+8),Q(e,a,0,.3,-2,n,r,i);for(let t=0;t<=n/1.5;t++)Z(e,`box`,vp(a,-.08),-n/2+t*1.5,.3+r/2,i/2-1.95,.25,r,.12);Z(e,`prism`,15330543,0,.3+r,-2,n+1,2.2,i+1);let o=t>=3?2:1;for(let t=0;t<o;t++){let r=o===1?0:-n/4+n/2*t;Z(e,`box`,3885658,r,2.9,i/2-1.9,5,4.4,.2),Q(e,10133671,r,.3,i/2+.5,6,1.2,3),Q(e,16762941,r,1.5,i/2+2,6,.08,.2)}let s=km(t);for(let r=0;r<(t>=3?12:6);r++){let t=1.3;Z(e,`box`,vp(13145434,(s()-.5)*.1),n/2+2+r%2*1.4,.95+Math.floor(r/6)*t,-i/2+2+(r>>1)%3*1.5,t,t,t)}if(t>=3){Q(e,16762941,-n/2-3,.3,6,1.6,1.4,2.4),Q(e,2830134,-n/2-3,1.7,5.6,1.4,1.4,.1),Q(e,2830134,-n/2-3,.3,7.5,.1,3.2,.1);for(let t=0;t<3;t++)Q(e,12174538,-n/3+n/3*t,.3+r+1,-6,2,1.2,2)}if(t>=4){for(let t of[-n/2-8,n/2+8])Q(e,15087942,t,.3,-i-4,.8,12,.8),Q(e,15087942,t,.3,-i+8,.8,12,.8),Fp(e,15087942,t,12.3,-i-4,t,12.3,-i+8,.8);Fp(e,15087942,-n/2-8,12.6,-i+2,n/2+8,12.6,-i+2,1.2),e.at(-n/2+2,.3,-i-6),$p(e,s,6,1,2),e.pop(),e.at(n/2+4,.3,-2),Jp(e),e.pop()}}function Om(e,t){if(t===0){Q(e,13218954,0,0,0,18,.25,14);for(let[t,n]of[[-9,-7],[9,-7],[-9,7],[9,7]])Q(e,16762941,t,0,n,.3,1.2,.3);for(let[t,n,r,i]of[[-9,-7,9,-7],[9,-7,9,7],[9,7,-9,7],[-9,7,-9,-7]])Fp(e,15087942,t,1,n,r,1,i,.08);Q(e,4212303,6,0,8.5,.2,2.2,.2),Z(e,`box`,16777215,6,2.6,8.5,2.6,1.4,.1),Z(e,`box`,2792779,6,2.6,8.56,2.2,1,.05);return}let n=Math.min(3,t),r=t>=3?18:t>=2?14:10,i=t>=3?9:t>=2?8:7;Q(e,12172997,0,0,0,r+8,.3,i+8);for(let t=0;t<n;t++){let i=n===1?0:-r/2+3+t*(r-6)/(n-1);Q(e,10133671,i,.3,0,1.6,.3,3.6),Q(e,15087942,i,.6,0,1,2,1.2),Z(e,`box`,16777215,i,2.1,.62,.8,.5,.05)}for(let t of[-r/2+1,r/2-1])for(let n of[-i/2+1,i/2-1])Q(e,15658734,t,.3,n,.5,5.2,.5);Q(e,16777215,0,5.5,0,r,.8,i),Q(e,15087942,0,5.5,0,r+.2,.35,i+.2),t>=2&&Q(e,16762941,0,6.3,0,r+.2,.18,i+.2);let a=t>=3?11:t>=2?7:4;if(Q(e,16183783,0,.3,-i/2-4,a,t>=3?4.5:3.2,4),Z(e,`box`,6061987,0,1.8,-i/2-1.95,a*.7,1.4,.1),Q(e,15087942,0,t>=3?4.8:3.5,-i/2-4,a+.4,.4,4.4),t>=2){let n=t>=3?10:7;Q(e,4212303,r/2+2.5,.3,3,.5,n,.5),Q(e,16762941,r/2+2.5,.3+n-1,3,3.2,2.6,.5),Q(e,15087942,r/2+2.5,.3+n-.3,3.1,2.8,.8,.5)}if(t>=3&&Z(e,`cyl12`,2792779,-r/2-2.5,1.6,2,3.4,2.6,3.4,0,0,Math.PI/2),t>=4){Q(e,15330543,-r/2-6,.3,-2,6,5,8);for(let t of[-4,0])Z(e,`cyl8`,1933270,-r/2-6,2.6,t,1.5,4.2,1.5);for(let t=0;t<10;t++)Z(e,`cone5`,[15087942,16762941,1933270][t%3],-r/2+r/9*t,6.9,i/2+.3,.6,.8,.1,0,0,Math.PI)}}function km(e){let t=1234+e*77;return()=>(t=(t*9301+49297)%233280)/233280}function Am(e,t,n,r){let i=15764004,a=Math.max(2,Math.round(t/4)),o=Math.max(2,Math.round(n/4));for(let o=0;o<=a;o++)for(let s of[-n/2,n/2])Q(e,i,-t/2+o*t/a,0,s,.2,r,.2);for(let a=1;a<o;a++)for(let s of[-t/2,t/2])Q(e,i,s,0,-n/2+a*n/o,.2,r,.2);for(let i=2;i<r;i+=2.5)for(let r of[-n/2,n/2])Z(e,`box`,13145434,0,i,r,t+.4,.15,.8);for(let i=2;i<r;i+=2.5)for(let r of[-t/2,t/2])Z(e,`box`,13145434,r,i,0,.8,.15,n+.4);Q(e,16762941,t/2+2,0,n/2+2,.8,r+6,.8),Fp(e,16762941,t/2+2,r+6,n/2+2,-t/4,r+6,n/2+2,.6),Fp(e,3355443,-t/4+1,r+6,n/2+2,-t/4+1,r+1.5,n/2+2,.08)}var jm={garage:[30,18],warehouse:[28,20],fuel:[22,18]},Mm=class{constructor(e,t,n){this.group=new Di,this.meshes={},this.scaffolds={},this.pops=[],this.mat=e,this.slots=Tm(t),this.y=t.padHeight(t.landmark(`depotYard`).place);let r=this.slots;for(let t of Object.keys(r)){let i=new eo(this.geometry(t,n[t]),e);i.position.set(r[t].x,this.y+.1,r[t].z),this.meshes[t]=i,this.scaffolds[t]=null,this.group.add(i)}}geometry(e,t){let n=new kp;return e===`garage`?Em(n,t):e===`warehouse`?Dm(n,t):Om(n,t),Sm(n.build())}setLevel(e,t,n){let r=this.meshes[e];r.geometry.dispose(),r.geometry=this.geometry(e,t),n&&this.pops.push({id:e,t:0})}setBuilding(e){let t=this.slots;for(let n of Object.keys(t)){let r=n===e,i=this.scaffolds[n];if(r&&!i){let e=new kp,[r,i]=jm[n];Am(e,r,i,t[n].top[4]*.8);let a=new eo(Sm(e.build()),this.mat);a.position.set(t[n].x,this.y+.1,t[n].z),this.group.add(a),this.scaffolds[n]=a}else!r&&i&&(this.group.remove(i),i.geometry.dispose(),this.scaffolds[n]=null)}}anchor(e,t,n){let r=this.slots[e];return n.set(r.x,this.y+r.top[Math.min(4,t)]+3,r.z)}update(e){for(let t of this.pops){t.t+=e;let n=this.meshes[t.id],r=Math.min(1,t.t/.7),i=1+Math.sin(r*Math.PI*2.5)*(1-r)*.25;n.scale.set(1/Math.sqrt(i),r<.15?.3+r*4:i,1/Math.sqrt(i))}this.pops.length&&(this.pops=this.pops.filter(e=>e.t>=.7?(this.meshes[e.id].scale.set(1,1,1),!1):!0))}},Nm=class{constructor(e){this.mode=`chase`,this.portrait=!1,this.pos=new K,this.look=new K,this.yaw=0,this.orbitA=0,this.blend=1,this.shake=0,this.t=0,this.baseFocus=new K(0,1,42),this.tmpP=new K,this.tmpL=new K,this.geo=e,this.cam=new Wc(60,16/9,.5,1e3)}setMode(e,t,n=!1){e===`orbit`&&(this.orbitA=t.h+Math.PI*.75),this.mode=e,this.blend=+!!n,n&&(this.yaw=t.h,this.desired(t,0),this.pos.copy(this.tmpP),this.look.copy(this.tmpL))}kick(e){this.shake=Math.max(this.shake,e)}desired(e,t){let n=Math.abs(e.speed),r=60;if(this.mode===`chase`){let i=(e.speed,e.h);this.yaw+=f(this.yaw,i)*(1-Math.exp(-t*3.2));let a=Math.sin(this.yaw),o=Math.cos(this.yaw),s=this.portrait?27+n*.15:21.5+n*.12,c=this.portrait?13.5+n*.04:10+n*.04;this.tmpP.set(e.x-a*s,e.y+c,e.z-o*s),this.tmpL.set(e.x+a*(9+n*.4),e.y+3.2,e.z+o*(9+n*.4)),r=(this.portrait?70:56)+n*.36}else if(this.mode===`orbit`){this.orbitA+=t*.2;let n=(e.x+e.ax)/2,i=(e.z+e.az)/2,a=this.portrait?34:27;this.tmpP.set(n+Math.sin(this.orbitA)*a,e.y+(this.portrait?12:8),i+Math.cos(this.orbitA)*a),this.tmpL.set(n,e.y-(this.portrait?4:2),i),r=this.portrait?72:55}else{let e=this.baseFocus,t=Math.sin(this.t*.15)*4;this.portrait?(this.tmpP.set(e.x+t,e.y+88,e.z+92),r=60):(this.tmpP.set(e.x+t,e.y+50,e.z+78),r=48),this.tmpL.set(e.x,e.y,e.z-6)}return r}update(e,t){this.t+=e;let n=this.desired(t,e);this.blend=Math.min(1,this.blend+e*1.2);let r=this.mode===`chase`?1-Math.exp(-e*(4+8*this.blend*this.blend)):1-Math.exp(-e*(1.5+3*this.blend));this.pos.lerp(this.tmpP,r),this.look.lerp(this.tmpL,Math.min(1,r*1.4));let i=this.geo.groundAt(this.pos.x,this.pos.z)+2.2;if(this.pos.y<i&&(this.pos.y=i),this.cam.position.copy(this.pos),this.shake>0){this.shake=Math.max(0,this.shake-e*2.5);let t=this.shake*.35;this.cam.position.x+=(Math.random()-.5)*t,this.cam.position.y+=(Math.random()-.5)*t}this.cam.lookAt(this.look),Math.abs(this.cam.fov-n)>.05&&(this.cam.fov+=(n-this.cam.fov)*Math.min(1,e*3),this.cam.updateProjectionMatrix())}},Pm=[16747136,8444159,16769154,10868391,13538264,16755601,11583173,16774557],Fm=new Ei;function Im(){let e=new kp;return Z(e,`box`,3885675,-.13,.42,0,.2,.84,.22),Z(e,`box`,3885675,.13,.42,0,.2,.84,.22),Z(e,`box`,16777215,0,1.18,0,.56,.72,.32),Z(e,`box`,16777215,-.34,1.15,0,.13,.62,.15),Z(e,`box`,16777215,.34,1.15,0,.13,.62,.15),Z(e,`box`,16176051,0,1.72,0,.34,.36,.32),Z(e,`box`,5913386,0,1.92,-.02,.36,.1,.34),Sm(e.build())}function Lm(){let e=new kp;Z(e,`box`,16052714,0,1.25,0,1,.9,2),Z(e,`box`,2829099,.3,1.45,.2,.45,.55,.7),Z(e,`box`,2829099,-.35,1.2,-.5,.35,.5,.6),Z(e,`box`,16052714,0,1.45,1.2,.6,.6,.6),Z(e,`box`,15906229,0,1.3,1.52,.5,.3,.12);for(let t of[-.35,.35])for(let n of[-.75,.75])Z(e,`box`,3815994,t,.4,n,.2,.8,.2);return Z(e,`box`,15260080,.25,1.82,1.2,.08,.2,.08),Z(e,`box`,15260080,-.25,1.82,1.2,.08,.2,.08),Sm(e.build())}function Rm(){let e=new kp;Z(e,`ico`,16513781,0,.9,0,1.2,.9,1.5),Z(e,`box`,3092271,0,1.05,.75,.38,.42,.45);for(let t of[-.25,.25])for(let n of[-.4,.4])Z(e,`box`,3092271,t,.3,n,.12,.6,.12);return Sm(e.build())}var zm=class{constructor(e,t){this.group=new Di,this.walkers=[],this.grazers=[],this.t=0,this.enabled=!0;let n=Pf(77),r=t.landmark(`harbour`),i=t.landmark(`animalPen`),a=t.landmark(`farmstead`),o=t.landmark(`townCentre`),s=this.town=t.places[o.place],c=this.port=t.places[r.place];this.farm=t.places[a.place],this.pen={x:i.x,z:i.z,r:i.r},this.cranes=r.cranes,this.portY=t.padHeight(r.place);let l=s.h,u=t.junctions.main,d=t.mainDir;for(let e=0;e<8;e++){let e=n()*Math.PI*2,t=14+n()*16,r=e+(n()-.5)*1.4,i=14+n()*16;this.walkers.push({ax:s.x+Math.cos(e)*t,az:s.z+Math.sin(e)*t,bx:s.x+Math.cos(r)*i,bz:s.z+Math.sin(r)*i,y:l,t:n(),speed:.05+n()*.04,pause:0,dir:1})}for(let e=0;e<12;e++){let t=e%2?1:-1,r=8+n()*150,i=r+25+n()*30,a=t*(8.2+n()*1.6),o=e=>[u.x0+d.x*e-d.z*a,u.z0+d.z*e+d.x*a],[s,c]=o(r),[f,p]=o(i);this.walkers.push({ax:s,az:c,bx:f,bz:p,y:l+.24,t:n(),speed:.03+n()*.02,pause:0,dir:1})}for(let e=0;e<8;e++){let e=c.z-60+n()*120;this.walkers.push({ax:c.x+20+n()*20,az:e,bx:c.x+40+n()*22,bz:e+(n()-.5)*30,y:this.portY+.05,t:n(),speed:.04+n()*.03,pause:0,dir:1})}this.people=new po(Im(),e,this.walkers.length),this.walkers.forEach((e,t)=>this.people.setColorAt(t,new J(Pm[t%Pm.length])));let f=this.pen;for(let e=0;e<11;e++){let e=n()*Math.PI*2,r=n()*f.r*.8,i=f.x+Math.cos(e)*r,a=f.z+Math.sin(e)*r;this.grazers.push({x:i,z:a,h:n()*6,tx:i,tz:a,wait:n()*4,y:t.groundAt(i,a)})}this.cows=new po(Lm(),e,5),this.sheep=new po(Rm(),e,6);let p=new kp;Z(p,`box`,3885658,0,0,0,3,1.4,3),this.trolley=new po(Sm(p.build()),e,2);let m=new kp;Z(m,`box`,3355443,0,2.9,0,2.6,.3,.8),Z(m,`box`,15167313,0,1.3,0,12,2.6,2.44);for(let e=0;e<7;e++)Z(m,`box`,12867391,-5.4+e*1.8,1.3,1.24,.3,2.5,.08);this.load=new po(Sm(m.build()),e,2),this.load.setColorAt(0,new J(16777215)),this.load.setColorAt(1,new J(10474495));let h=new kp;Z(h,`box`,2236962,0,-.5,0,.12,1,.12),this.cable=new po(Sm(h.build()),e,2);for(let e of[this.people,this.cows,this.sheep,this.trolley,this.load,this.cable])e.frustumCulled=!1,this.group.add(e)}update(e,t){this.t+=e;let n=(e,n,r)=>(e-t.x)**2+(n-t.z)**2<r*r,{town:r,port:i,farm:a,pen:o}=this,s=this.enabled&&(n(r.x,r.z,480)||n(i.x,i.z,420)),c=this.enabled&&n(a.x,a.z,420),l=this.enabled&&n(i.x,i.z,650);if(this.people.visible=s,this.cows.visible=this.sheep.visible=c,this.trolley.visible=this.load.visible=this.cable.visible=l,s){for(let t=0;t<this.walkers.length;t++){let n=this.walkers[t];n.pause>0?n.pause-=e:(n.t+=n.dir*n.speed*e,(n.t>1||n.t<0)&&(n.dir=n.dir>0?-1:1,n.t=Math.min(1,Math.max(0,n.t)),n.pause=1+t%4));let r=n.ax+(n.bx-n.ax)*n.t,i=n.az+(n.bz-n.az)*n.t,a=n.pause<=0;Fm.position.set(r,n.y+(a?Math.abs(Math.sin(this.t*7+t))*.08:0),i),Fm.rotation.set(0,Math.atan2((n.bx-n.ax)*n.dir,(n.bz-n.az)*n.dir),a?Math.sin(this.t*7+t)*.05:0),Fm.scale.setScalar(1),Fm.updateMatrix(),this.people.setMatrixAt(t,Fm.matrix)}this.people.instanceMatrix.needsUpdate=!0}if(c){for(let t=0;t<this.grazers.length;t++){let n=this.grazers[t];if(n.wait-=e,n.wait<=0){let t=n.tx-n.x,r=n.tz-n.z,i=Math.hypot(t,r);if(i<.3){let e=Math.random()*Math.PI*2,t=Math.random()*o.r*.8;n.tx=o.x+Math.cos(e)*t,n.tz=o.z+Math.sin(e)*t,n.wait=2+Math.random()*5}else{let a=Math.min(i,.7*e);n.x+=t/i*a,n.z+=r/i*a,n.h=Math.atan2(t,r)}}let r=n.wait>0?Math.sin(this.t*2+t)*.04:0;Fm.position.set(n.x,n.y,n.z),Fm.rotation.set(r,n.h,0),Fm.scale.setScalar(1),Fm.updateMatrix(),t<5?this.cows.setMatrixAt(t,Fm.matrix):this.sheep.setMatrixAt(t-5,Fm.matrix)}this.cows.instanceMatrix.needsUpdate=!0,this.sheep.instanceMatrix.needsUpdate=!0}if(l){for(let e=0;e<this.cranes.length;e++){let t=this.cranes[e],n=(this.t/12+e*.43)%1,r=n<.25?n/.25:n<.5?1:n<.75?1-(n-.5)/.25:0,a=r*r*(3-2*r),o=n>=.25&&n<.5?Math.sin((n-.25)/.25*Math.PI):0,s=i.x+62+2+a*24,c=i.z+t,l=this.portY+21.4;Fm.rotation.set(0,Math.PI/2,0),Fm.scale.setScalar(1),Fm.position.set(s,l,c),Fm.updateMatrix(),this.trolley.setMatrixAt(e,Fm.matrix);let u=5+o*9+(1-a)*2;Fm.position.set(s,l-u-3.2,c),Fm.updateMatrix(),this.load.setMatrixAt(e,Fm.matrix),Fm.position.set(s,l-.7,c),Fm.scale.set(1,u-.5,1),Fm.updateMatrix(),this.cable.setMatrixAt(e,Fm.matrix)}this.trolley.instanceMatrix.needsUpdate=!0,this.load.instanceMatrix.needsUpdate=!0,this.cable.instanceMatrix.needsUpdate=!0}}},Bm=class{constructor(e){this.shown=[],this.c=new J;let t=new kp;Z(t,`sphere`,16777215,0,0,0,.44,.44,.2),this.bulbs=new po(Sm(t.build()),new Ha({vertexColors:!0,toneMapped:!1}),e.heads.length*3);let n=new Ei;e.heads.forEach((e,t)=>{for(let r=0;r<3;r++)n.position.set(e.x-e.ax*.25,e.y+.46-r*.46,e.z-e.az*.25),n.rotation.set(0,Math.atan2(-e.ax,-e.az),0),n.updateMatrix(),this.bulbs.setMatrixAt(t*3+r,n.matrix),this.bulbs.setColorAt(t*3+r,new J(2236962))})}sync(e){let t=!1;for(let n=0;n<e.heads.length;n++){let r=e.heads[n],i=e.light(r.crossing,r.axis);if(this.shown[n]===i)continue;this.shown[n]=i,t=!0;let a=this.c;this.bulbs.setColorAt(n*3,a.setHex(i===`red`?16726832:3806482)),this.bulbs.setColorAt(n*3+1,a.setHex(i===`yellow`?16761370:3813394)),this.bulbs.setColorAt(n*3+2,a.setHex(i===`green`?3473258:1194524))}t&&this.bulbs.instanceColor&&(this.bulbs.instanceColor.needsUpdate=!0)}};function Vm(){let e=document.createElement(`canvas`);e.width=64,e.height=64;let t=e.getContext(`2d`);t.lineJoin=`round`,t.lineCap=`round`,t.beginPath(),t.moveTo(12,46),t.lineTo(32,20),t.lineTo(52,46),t.lineWidth=17,t.strokeStyle=`rgba(20,60,30,0.55)`,t.stroke(),t.lineWidth=10,t.strokeStyle=`#8dff6a`,t.stroke();let n=new Eo(e);return n.wrapS=Ft,n.wrapT=Pt,n.colorSpace=rr,n}function Hm(){let e=document.createElement(`canvas`);e.width=4,e.height=128;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,0,128);return n.addColorStop(0,`rgba(255,255,255,0)`),n.addColorStop(1,`rgba(255,255,255,0.9)`),t.fillStyle=n,t.fillRect(0,0,4,128),new Eo(e)}var Um=class{constructor(){this.group=new Di,this.strip=null,this.stripTex=Vm(),this.zone=new Di,this.clock=0,this.ring=new eo(new Zs(10,13,40).rotateX(-Math.PI/2),new Ha({color:9305962,transparent:!0,opacity:.75,depthWrite:!1}));let e=new eo(new jo(10,40).rotateX(-Math.PI/2),new Ha({color:9305962,transparent:!0,opacity:.22,depthWrite:!1}));this.beamMat=new Ha({map:Hm(),color:7143226,transparent:!0,opacity:.55,depthWrite:!1,side:2,fog:!1});let t=new eo(new Mo(7,9,90,20,1,!0),this.beamMat);t.position.y=45,this.ring.position.y=.25,e.position.y=.22,this.zone.add(this.ring,e,t),this.zone.visible=!1;let n=new ls;n.moveTo(0,2.2),n.lineTo(1.6,.2),n.lineTo(.6,.2),n.lineTo(.6,-1.8),n.lineTo(-.6,-1.8),n.lineTo(-.6,.2),n.lineTo(-1.6,.2),n.lineTo(0,2.2);let r=new qs(n,{depth:.4,bevelEnabled:!1}).rotateX(Math.PI/2);this.guide=new eo(r,new lc({color:9305962,emissive:2779930})),this.guide.visible=!1,this.group.add(this.zone,this.guide)}setRoute(e){this.strip&&(this.group.remove(this.strip),this.strip.geometry.dispose());let t=e.n-1,n=new Float32Array(t*18),r=new Float32Array(t*12),i=1.4,a=0,o=0;for(let s=0;s<t;s++){let t=s+1,c=e.x[t]-e.x[s],l=e.z[t]-e.z[s],u=Math.hypot(c,l)||1,d=-l/u,f=c/u,p=[e.x[s]+d*i,e.y[s]+.16,e.z[s]+f*i],m=[e.x[s]-d*i,e.y[s]+.16,e.z[s]-f*i],h=[e.x[t]-d*i,e.y[t]+.16,e.z[t]-f*i],g=[e.x[t]+d*i,e.y[t]+.16,e.z[t]+f*i],_=e.s[s]/4.5,v=e.s[t]/4.5;for(let e of[p,h,m,p,g,h])n[a++]=e[0],n[a++]=e[1],n[a++]=e[2];for(let e of[0,_,1,v,1,_,0,_,0,v,1,v])r[o++]=e}let s=new Aa;s.setAttribute(`position`,new ha(n,3)),s.setAttribute(`uv`,new ha(r,2)),s.computeBoundingSphere(),this.strip=new eo(s,new Ha({map:this.stripTex,transparent:!0,depthWrite:!1,side:2,polygonOffset:!0,polygonOffsetFactor:-4})),this.strip.frustumCulled=!1,this.group.add(this.strip);let c=e.n-1;this.zone.position.set(e.x[c],e.y[c],e.z[c]),this.zone.visible=!0}clear(){this.zone.visible=!1,this.guide.visible=!1,this.strip&&(this.strip.visible=!1)}hideZone(){this.zone.visible=!1,this.strip&&(this.strip.visible=!1)}drive(e,t,n,r,i,a){this.strip&&(this.strip.visible=t,this.strip.geometry.setDrawRange(Math.max(0,e-2)*6,570)),this.guide.visible=n,n&&(this.guide.position.set(r.x+Math.sin(r.h)*4,r.y+7.5+Math.sin(this.clock*5)*.3,r.z+Math.cos(r.h)*4),this.guide.rotation.set(0,Math.atan2(i-r.x,a-r.z),0))}update(e,t){if(this.clock+=e,this.stripTex.offset.y-=e*1.4,this.ring.scale.setScalar(1+Math.sin(this.clock*4)*.04),this.zone.visible){let e=Math.hypot(t.x-this.zone.position.x,t.z-this.zone.position.z);this.beamMat.opacity=.55*u((e-35)/70,0,1)}}},Wm=220,Gm=class{constructor(){this.pos=new Float32Array(660),this.col=new Float32Array(880),this.size=new Float32Array(Wm),this.vel=new Float32Array(660),this.life=new Float32Array(Wm),this.maxLife=new Float32Array(Wm),this.s0=new Float32Array(Wm),this.s1=new Float32Array(Wm),this.a0=new Float32Array(Wm),this.grav=new Float32Array(Wm),this.next=0,this.geo=new Aa,this.geo.setAttribute(`position`,new ha(this.pos,3).setUsage(lr)),this.geo.setAttribute(`rgba`,new ha(this.col,4).setUsage(lr)),this.geo.setAttribute(`size`,new ha(this.size,1).setUsage(lr)),this.mat=new sc({uniforms:{uScale:{value:400}},vertexShader:`
        attribute float size; attribute vec4 rgba; varying vec4 vC; uniform float uScale;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * uScale / max(1.0, -mv.z);
          gl_Position = projectionMatrix * mv;
          vC = rgba;
        }`,fragmentShader:`
        varying vec4 vC;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = dot(c, c);
          if (d > 0.25 || vC.a < 0.01) discard;
          gl_FragColor = vec4(vC.rgb, vC.a * (1.0 - d * 3.2));
        }`,transparent:!0,depthWrite:!1}),this.points=new Co(this.geo,this.mat),this.points.frustumCulled=!1}setScale(e,t){this.mat.uniforms.uScale.value=e/(2*Math.tan(t*Math.PI/360))}emit(e,t,n,r,i,a,o,s,c,l,u,d=0){let f=this.next;this.next=(this.next+1)%Wm,this.pos[f*3]=e,this.pos[f*3+1]=t,this.pos[f*3+2]=n,this.vel[f*3]=r,this.vel[f*3+1]=i,this.vel[f*3+2]=a,this.col[f*4]=(o>>16&255)/255,this.col[f*4+1]=(o>>8&255)/255,this.col[f*4+2]=(o&255)/255,this.col[f*4+3]=s,this.a0[f]=s,this.s0[f]=c,this.s1[f]=l,this.size[f]=c,this.life[f]=u,this.maxLife[f]=u,this.grav[f]=d}update(e){for(let t=0;t<Wm;t++){if(this.life[t]<=0){this.col[t*4+3]!==0&&(this.col[t*4+3]=0);continue}this.life[t]-=e;let n=1-Math.max(0,this.life[t])/this.maxLife[t];this.vel[t*3+1]-=this.grav[t]*e;let r=Math.exp(-1.6*e);this.vel[t*3]*=r,this.vel[t*3+2]*=r,this.pos[t*3]+=this.vel[t*3]*e,this.pos[t*3+1]+=this.vel[t*3+1]*e,this.pos[t*3+2]+=this.vel[t*3+2]*e,this.size[t]=this.s0[t]+(this.s1[t]-this.s0[t])*n,this.col[t*4+3]=this.a0[t]*(1-n)*Math.min(1,n*8+.3)}this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.rgba.needsUpdate=!0,this.geo.attributes.size.needsUpdate=!0}},Km=new Ei,qm=class{constructor(e,t,n){let r=new kp;r.ao=0,Z(r,`box`,16777215,0,.75,0,1.9,.8,4.2),Z(r,`box`,16777215,0,1.45,-.3,1.7,.7,2.2),Z(r,`box`,3824250,0,1.45,-.3,1.74,.5,1.9),Z(r,`box`,4473924,0,.45,2.12,1.95,.3,.1),Z(r,`box`,4473924,0,.45,-2.12,1.95,.3,.1);for(let e of[-.65,.65])Z(r,`box`,16773824,e,.85,2.11,.4,.2,.05),Z(r,`box`,14034984,e,.85,-2.11,.4,.18,.05);for(let e of[-.9,.9])for(let t of[-1.35,1.35])Z(r,`cyl8`,2236962,e,.38,t,.76,.3,.76,0,0,Math.PI/2),Z(r,`cyl8`,13620184,e*1.02,.38,t,.4,.3,.4,0,0,Math.PI/2);this.mesh=new po(Sm(r.build()),e,t.max),this.mesh.frustumCulled=!1;for(let e=0;e<t.max;e++)this.mesh.setColorAt(e,new J(n[e%n.length]));this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}sync(e,t){this.mesh.count=e.active;for(let n=0;n<e.active;n++){let r=e.cars[n];Km.position.set(d(r.px,r.x,t),d(r.py,r.y,t)+.06,d(r.pz,r.z,t)),Km.rotation.set(0,p(r.ph,r.h,t),0);let i=Math.max(.001,d(r.pscale,r.scale,t));Km.scale.set(i,i,i),Km.updateMatrix(),this.mesh.setMatrixAt(n,Km.matrix)}this.mesh.instanceMatrix.needsUpdate=!0}},Jm=[{body:15087942,accent:16777215,trim:14278114},{body:15087942,accent:16777215,trim:14278114},{body:15764004,accent:1911364,trim:15265007},{body:1933270,accent:16762941,trim:15659765},{body:2303791,accent:16762941,trim:16767338}];function Ym(e){let t=Jm[u(e,1,4)],n=new kp;n.ao=.2;let r=2902635,i=2830134;Q(n,i,0,.75,-.5,1.1,.4,7.2),Q(n,t.trim,0,.55,3.55,2.55,.5,.4),Z(n,`box`,t.body,0,1.78,2.55,2.2,1.15,1.95),Z(n,`box`,vp(t.body,.06),0,2.38,2.5,2.1,.08,1.85),Z(n,`box`,t.trim,0,1.72,3.54,1.35,1.05,.12);for(let e=0;e<4;e++)Z(n,`box`,i,0,1.36+e*.24,3.6,1.15,.07,.05);for(let e=-2;e<=2;e++)Z(n,`box`,t.trim,e*.26,1.72,3.62,.05,.95,.04);for(let e of[-1,1])Z(n,`box`,16753978,e*1.05,.62,3.76,.22,.14,.05);Z(n,`box`,16774870,0,.56,3.77,.6,.22,.03),Z(n,`box`,t.trim,0,2.47,3.3,.12,.14,.3);for(let r of[-1,1]){Z(n,`box`,16774856,r*.88,1.52,3.52,.42,.3,.12),Z(n,`box`,t.trim,r*.88,1.52,3.5,.5,.38,.08),Z(n,`box`,vp(t.body,-.2),r*1.232,2.4,1.72,.02,1.9,.04),Z(n,`box`,vp(t.body,-.2),r*1.232,2.4,-.2,.02,1.9,.04),Z(n,`box`,t.trim,r*1.24,2.2,1.45,.04,.08,.3),Z(n,`box`,16753978,r*1.12,1.35,3.1,.06,.12,.2),Z(n,`box`,vp(t.body,-.08),r*1.13,1.28,2.5,.35,.5,1.5),Z(n,`box`,t.accent,r*1.105,1.9,2.5,.03,.18,1.9),Z(n,`box`,t.accent,r*1.23,2.05,.75,.03,.22,2.1),Z(n,`cyl12`,t.trim,r*1.12,1,.55,.72,1.3,.72,0,Math.PI/2),Z(n,`box`,i,r*1.2,.72,1.55,.35,.12,.6);let a=e>=3?3.4:2.8;Z(n,`cyl8`,t.trim,r*1.2,2.2+a/2,-.25,.3,a,.3),Z(n,`box`,t.trim,r*1.35,2.75,1.78,.28,.05,.05),Z(n,`box`,i,r*1.5,2.95,1.75,.1,.7,.34),Z(n,`box`,10470368,r*1.5,2.95,1.93,.07,.6,.02),Z(n,`box`,i,r*1.2,3.05,-.25,.36,.9,.36),Z(n,`box`,i,r*1.08,1.45,-2.05,.75,.12,2.5),Z(n,`box`,1118481,r*1.08,.75,-3.35,.7,.8,.06),Z(n,`box`,t.trim,r*1.08,.85,-3.37,.34,.18,.02),Z(n,`box`,15087942,r*.45,.95,-4.12,.3,.16,.05)}Z(n,`box`,t.body,0,2.5,.75,2.45,2.1,2.1),Z(n,`box`,r,0,2.95,1.82,2.2,.95,.06,0,-.12),Z(n,`box`,t.trim,0,2.95,1.8,.06,.95,.08,0,-.12),Z(n,`box`,vp(t.body,-.12),0,3.48,1.9,2.3,.14,.3);for(let e of[-1,1])Z(n,`cyl8`,t.trim,e*.55,3.72,1.2,.14,.7,.14,0,Math.PI/2);for(let e of[-1,1])Z(n,`box`,r,e*1.235,2.95,.95,.04,.8,1.05);Z(n,`box`,vp(t.body,-.1),0,3.6,.75,2.5,.1,2.15),e>=3?(Z(n,`box`,t.body,0,2.7,-.95,2.45,2.5,1.4),Z(n,`box`,t.accent,0,3.97,-.95,2.47,.12,1.42),Z(n,`box`,t.body,0,4.25,.35,2.3,.9,1.6,0,.35)):e>=2&&Z(n,`box`,t.body,0,4,.5,2.3,.75,1.3,0,.3);for(let t=-2;t<=2;t++)Z(n,`box`,e>=4?16767338:16753978,t*.4,3.7,1.72,.22,.14,.14);if(e>=4){Z(n,`box`,t.trim,0,1.05,3.85,2.6,.12,.12);for(let e of[-1,1])Z(n,`box`,t.trim,e*1.1,1.5,3.85,.12,1,.12)}return Z(n,`box`,3817287,0,1.12,np,1.5,.18,1.3),Sm(n.build())}var Xm=[15087942,1933270,2792847,16032353,7097014];function Zm(e,t,n){let r=new kp;r.ao=.1;let i=2830134;Z(r,`box`,8028298,0,1.45,-5.85,2.5,.28,12.9),Z(r,`box`,16762941,0,1.45,-5.85,2.52,.08,12.92),Z(r,`box`,i,0,1.05,-5.85,1,.5,12.6);for(let e of[-1,1])Z(r,`box`,14278114,e*1.2,.95,-5.2,.05,.3,5.2),Z(r,`box`,15087942,e*.95,1.2,-12.32,.35,.22,.05),Z(r,`box`,i,e*1.05,1.1,-9.2,.75,.12,2.6),Z(r,`box`,i,e*.9,.6,-2,.18,1,.18),Z(r,`box`,1118481,e*1.05,.62,-10.75,.72,.75,.05),Z(r,`box`,14278114,e*1.05,.72,-10.78,.3,.14,.02),Z(r,`box`,16753978,e*1.23,1.45,-8,.04,.14,.24),Z(r,`box`,16753978,e*1.23,1.45,-3,.04,.14,.24);Z(r,`box`,3817287,0,.8,-12.2,2.3,.16,.16);for(let e=0;e<8;e++)Z(r,`box`,e%2?16777215:15087942,-1.05+e*.3,1.25,-12.33,.3,.1,.03);let a=n*9301+49297,o=()=>(a=(a*9301+49297)%233280)/233280,s=e===`container`?t>=.9?12.2:6.1:12.2*Math.min(1,.55+t*.5),c=-.2;if(e===`container`){let e=t>=.9?1:2;for(let t=0;t<e;t++)r.at(0,1.59,c-s/2-t*(s+.1)),Qp(r,Xm[(n+t)%Xm.length],s),r.pop()}else if(e===`crates`){let e=Math.max(2,Math.round(s/1.9)),n=t>.9?3:2;for(let t=0;t<e;t++)for(let e=0;e<n-+(t%3==2);e++)for(let n of[-.62,.62])Z(r,`box`,vp(13145434,(o()-.5)*.12),n,2.19+e*1.18,-1.15-t*1.9,1.15,1.15,1.7,(o()-.5)*.08),Z(r,`box`,vp(13145434,-.18),n,2.19+e*1.18,-1.15-t*1.9,1.17,.12,1.72)}else if(e===`sacks`){let e=Math.max(2,Math.round(s/2.2));for(let n=0;n<e;n++){let e=-1.3-n*2.2;Z(r,`box`,10251075,0,1.6700000000000002,e,2.3,.16,2);let i=t>.9?4:3;for(let t=0;t<i;t++)for(let n of[-.56,.56]){let i=1.9900000000000002+t*.46,a=(o()-.5)*.12;Z(r,`box`,vp(15852486,(o()-.5)*.08),n,i,e,1.05,.42,1.75,a),Z(r,`box`,14272418,n,i+.05,e-.55,1.07,.36,.08,a),Z(r,`box`,4033086,n,i,e+.1,.5,.43,.5,a)}}}else if(e===`bricks`){let e=Math.max(2,Math.round(s/2.1));for(let n=0;n<e;n++){let e=-1.25-n*2.1;Z(r,`box`,10251075,0,1.6700000000000002,e,2.3,.16,1.9);let i=t>.9?1.4:1.1;Z(r,`box`,vp(11883067,(o()-.5)*.08),0,1.75+i/2,e,2.1,i,1.7);for(let t=1;t<4;t++)Z(r,`box`,14206640,0,1.75+t*i/4,e,2.12,.05,1.72)}}else if(e===`logs`){for(let e=0;e<4;e++)for(let t of[-1,1])Z(r,`box`,3817287,t*1.18,2.79,-1.7-e*3.2,.14,2.4,.14);let e=t>.9?4:3;for(let t=0;t<e;t++)for(let e=0;e<4-t%2;e++){let n=-.9+e*.6+t%2*.3,i=1.8900000000000001+t*.52;Z(r,`cyl8`,vp(9067062,(o()-.5)*.1),n,i,c-s/2,.58,s,.58,0,Math.PI/2),Z(r,`cyl8`,14727039,n,i,-.22,.5,.04,.5,0,Math.PI/2),Z(r,`cyl8`,14727039,n,i,c-s+.02,.5,.04,.5,0,Math.PI/2)}}else{let e=Math.max(2,Math.round(s/1.3));for(let t=0;t<e;t++)for(let e of[-.65,.65]){let n=(t+ +(e>0))%3==0?15087942:1933270;Z(r,`cyl12`,n,e,2.34,-.8999999999999999-t*1.3,1.15,1.5,1.15),Z(r,`cyl12`,vp(n,-.15),e,2.59,-.8999999999999999-t*1.3,1.18,.08,1.18)}}return Sm(r.build())}function Qm(){let e=document.createElement(`canvas`);e.width=e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,4,32,32,32);return n.addColorStop(0,`rgba(0,0,0,0.55)`),n.addColorStop(.6,`rgba(0,0,0,0.3)`),n.addColorStop(1,`rgba(0,0,0,0)`),t.fillStyle=n,t.fillRect(0,0,64,64),new Eo(e)}var $m=new Ei,eh=new $r;function th(e,t,n){let r=e.prev;return n.x=d(r.x,e.x,t),n.z=d(r.z,e.z,t),n.y=d(r.y,e.y,t),n.h=p(r.h,e.h,t),n.pitch=d(r.pitch,e.pitch,t),n.roll=d(r.roll,e.roll,t),n.bounce=d(r.bounce,e.bounce,t),n.ax=d(r.ax,e.ax,t),n.az=d(r.az,e.az,t),n.ay=d(r.ay,e.ay,t),n.phi=p(r.phi,e.phi,t),n.swing=d(r.swing,e.swing,t),n.steerAngle=d(r.steerAngle,e.steerAngle,t),n.wheelSpin=d(r.wheelSpin,e.wheelSpin,t),n.speed=e.speed,n}var nh=()=>({x:0,z:0,y:0,h:0,pitch:0,roll:0,bounce:0,ax:0,az:0,ay:0,phi:0,swing:0,steerAngle:0,wheelSpin:0,speed:0}),rh=class{constructor(e){this.root=new Di,this.trailerGroup=new Di,this.cabGroup=new Di,this.brakeMat=new Ha({color:5902352,toneMapped:!1}),this.level=1,this.cab=new eo(Ym(1),e),this.cabGroup.add(this.cab),this.trailer=new eo(Zm(`sacks`,.6,1),e),this.trailerGroup.add(this.trailer);let t=new kp;Z(t,`cyl12`,2237739,0,0,0,1.1,1,1.1,0,0,Math.PI/2),Z(t,`cyl12`,3027512,0,0,0,1,1.02,1,0,0,Math.PI/2),Z(t,`cyl12`,14278114,0,0,0,.72,1.05,.72,0,0,Math.PI/2),Z(t,`cyl8`,15087942,0,0,0,.26,1.09,.26,0,0,Math.PI/2);for(let e=0;e<5;e++){let n=e/5*Math.PI*2;for(let e of[-.535,.535])Z(t,`box`,9080726,e,Math.cos(n)*.22,Math.sin(n)*.22,.04,.07,.07)}this.wheels=new po(Sm(t.build()),e,10),this.wheels.frustumCulled=!1;let n=new Ha({map:Qm(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2});this.shadowT=new eo(new Xs(3.6,8.4).rotateX(-Math.PI/2),n),this.shadowR=new eo(new Xs(3.6,14).rotateX(-Math.PI/2),n);let r=new kp;for(let e of[-1,1])Z(r,`box`,16777215,e*.95,1.2,-12.36,.36,.24,.04);this.brakeGlow=new eo(Sm(r.build()),this.brakeMat),this.trailerGroup.add(this.brakeGlow),this.root.add(this.cabGroup,this.trailerGroup,this.wheels,this.shadowT,this.shadowR)}setLevel(e){e!==this.level&&(this.level=e,this.cab.geometry.dispose(),this.cab.geometry=Ym(e))}setCargo(e,t,n){this.trailer.geometry.dispose(),this.trailer.geometry=Zm(e,t,n)}sync(e,t){this.brakeMat.color.setHex(t?16722474:5902352);let n=this.cabGroup;n.position.set(e.x,e.y+e.bounce,e.z),n.rotation.set(0,0,0),n.rotation.order=`YXZ`,n.rotation.y=e.h,n.rotation.x=-e.pitch,n.rotation.z=e.roll,n.updateMatrix();let r=e.x+Math.sin(e.h)*np,i=e.z+Math.cos(e.h)*np,a=e.y+Math.sin(e.pitch)*np+.02,o=this.trailerGroup;o.position.set(r,a+e.bounce*.5,i),o.rotation.order=`YXZ`;let s=e.phi+e.swing;o.rotation.y=s,o.rotation.x=Math.atan2(e.ay-e.y,rp)*1,o.rotation.z=e.roll*.6,o.updateMatrix();let c=e.wheelSpin;n.updateMatrixWorld(),o.updateMatrixWorld();let l=-e.steerAngle;this.wheel(0,n,1.08,.55,2.5,.42,l,.55,c),this.wheel(1,n,-1.08,.55,2.5,.42,l,.55,c),this.wheel(2,n,1.02,.55,-1.4,.7,0,.55,c),this.wheel(3,n,-1.02,.55,-1.4,.7,0,.55,c),this.wheel(4,n,1.02,.55,-2.7,.7,0,.55,c),this.wheel(5,n,-1.02,.55,-2.7,.7,0,.55,c),this.wheel(6,o,1.02,.5,-8.55,.7,0,.52,c),this.wheel(7,o,-1.02,.5,-8.55,.7,0,.52,c),this.wheel(8,o,1.02,.5,-9.85,.7,0,.52,c),this.wheel(9,o,-1.02,.5,-9.85,.7,0,.52,c),this.wheels.instanceMatrix.needsUpdate=!0,this.shadowT.position.set(e.x+Math.sin(e.h)*.4,e.y+.1,e.z+Math.cos(e.h)*.4),this.shadowT.rotation.y=e.h;let u=(r+e.ax)/2-Math.sin(e.phi)*1.6,d=(i+e.az)/2-Math.cos(e.phi)*1.6;this.shadowR.position.set(u,(a+e.ay)/2+.12,d),this.shadowR.rotation.y=e.phi}wheel(e,t,n,r,i,a,o,s,c){$m.position.set(n,r,i),$m.rotation.set(c,o,0,`YXZ`),$m.scale.set(a,s/.55,s/.55),$m.updateMatrix(),eh.multiplyMatrices(t.matrix,$m.matrix),this.wheels.setMatrixAt(e,eh)}stackTop(e,t){let n=this.level>=3?5.6:5;return t.set(e*1.2,n,-.25).applyMatrix4(this.cabGroup.matrix)}rearWheel(e,t){return t.set(e*1.1,.2,-9.2).applyMatrix4(this.trailerGroup.matrix)}};function ih(e,t,n){let r=document.createElement(`canvas`);r.width=512,r.height=e.length>1?256:88;let i=r.getContext(`2d`);i.fillStyle=t,i.beginPath(),i.roundRect(4,4,r.width-8,r.height-8,22),i.fill(),i.lineWidth=8,i.strokeStyle=`#ffffff`,i.stroke(),i.fillStyle=n,i.textAlign=`center`,i.textBaseline=`middle`,e.forEach((t,n)=>{i.font=`${n===0?64:40}px "Lilita One", system-ui, sans-serif`;let a=e.length===1?r.height/2+2:80+n*90;i.fillText(t,r.width/2,a,r.width-40)});let a=new Eo(r);return a.colorSpace=rr,a.anisotropy=4,a}function ah(e){let t=e.landmark(`signs`);if(!t)return null;let n=document.createElement(`canvas`);n.width=512,n.height=512;let r=n.getContext(`2d`),i=(e,t,n,i,a)=>{r.fillStyle=`#2a7a4a`,r.beginPath(),r.roundRect(e+3,t+3,n-6,i-6,14),r.fill(),r.lineWidth=5,r.strokeStyle=`#ffffff`,r.stroke(),r.fillStyle=`#ffffff`,r.textAlign=`center`,r.textBaseline=`middle`,a.forEach((o,s)=>{r.font=`${a.length>1?36:34}px "Lilita One", system-ui, sans-serif`,r.fillText(o,e+n/2,t+i/(a.length+1)*(s+1)+2,n-24)})};i(0,0,512,192,t.junction.lines);let a=[[0,192],[256,192],[0,272],[256,272]];t.boards.slice(0,4).forEach((t,n)=>i(a[n][0],a[n][1],256,80,[e.places[t.place].sign])),r.fillStyle=`#4a4f57`,r.fillRect(0,400,64,64);let o=new Eo(n);o.colorSpace=rr,o.anisotropy=4;let s=[],c=[],l=[32/512,1-432/512],u=(e,t,n,r,i,a,o,u,d,f,p=!0)=>{let m=Math.cos(r),h=-Math.sin(r),g=Math.sin(r)*.05,_=Math.cos(r)*.05,v=(r,i,a)=>[e+m*r+(a?-g:g),t+i,n+h*r+(a?-_:_)],y=(e,t)=>[o+(d-o)*e,1-(u+(f-u)*t)],b=v(-i/2,-a/2,!1),x=v(i/2,-a/2,!1),S=v(i/2,a/2,!1),C=v(-i/2,a/2,!1);if(s.push(...b,...x,...S,...b,...S,...C),c.push(...y(0,1),...y(1,1),...y(1,0),...y(0,1),...y(1,0),...y(0,0)),p){let e=v(-i/2,-a/2,!0),t=v(i/2,-a/2,!0),n=v(i/2,a/2,!0),r=v(-i/2,a/2,!0);s.push(...e,...t,...n,...e,...n,...r);for(let e=0;e<6;e++)c.push(...l)}},d=(e,t,n,r)=>{for(let i of[0,Math.PI/2])u(e,t+r/2,n,i,.3,r,l[0],1-l[1],l[0],1-l[1],!1)},f=(t,n,r,i,a,o,s,c,l)=>{let f=e.roadPointAt(t,n),p=f.x+Math.cos(f.h)*(e.roadHalf+3),m=f.z-Math.sin(f.h)*(e.roadHalf+3);d(p,f.y-.3,m,r),u(p,f.y+r+a/2-.3,m,f.h+Math.PI,i,a,o,s,c,l)};f(t.junction.road,t.junction.s,3,6.4,2.4,0,0,1,192/512),t.boards.slice(0,4).forEach((e,t)=>{let[n,r]=a[t];f(e.road,e.s,2.4,5,1.6,n/512,r/512,(n+256)/512,(r+80)/512)});let p=new Aa;return p.setAttribute(`position`,new va(s,3)),p.setAttribute(`uv`,new va(c,2)),p.computeBoundingSphere(),new eo(p,new Ha({map:o,side:2,toneMapped:!1}))}function oh(){return new sc({uniforms:ic.merge([X.fog,{uTime:{value:0},uDeep:{value:new J(3118544)},uLight:{value:new J(6079466)}}]),vertexShader:`
      varying vec3 vW;
      #include <fog_pars_vertex>
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        vW = w.xyz;
        vec4 mvPosition = viewMatrix * w;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,fragmentShader:`
      uniform float uTime;
      uniform vec3 uDeep;
      uniform vec3 uLight;
      varying vec3 vW;
      #include <fog_pars_fragment>
      void main() {
        float n = sin(vW.x * 0.07 + uTime * 0.8) * sin(vW.z * 0.06 - uTime * 0.6)
                + 0.5 * sin((vW.x + vW.z) * 0.13 + uTime * 1.4);
        vec3 col = mix(uDeep, uLight, 0.5 + 0.3 * n);
        float g = sin(vW.x * 0.45 + uTime * 2.1) * sin(vW.z * 0.38 - uTime * 1.7);
        col += vec3(0.35) * smoothstep(0.93, 1.0, g);
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`,fog:!0})}var sh=class{constructor(e,t,n){this.group=new Di,this.sky=new Di,this.chunks=[],this.details=[],this.detailOn=!0,this.viewDist=760,this.waterAnim=!0,this.windmill=new Di,this.gateArm=new Di,this.gateSign=null,this.gateOpen=0,this.gateTarget=0,this.gateTexts={open:[]},this.clouds=null,this.time=0;for(let[e,r]of[[this.chunks,t.chunks],[this.details,t.details]])for(let t of r){let r=new eo(Sm(t,!0),n);r.matrixAutoUpdate=!1,e.push(r),this.group.add(r)}this.waterMat=oh();let r=e.region.meta.bounds,i=new eo(new Xs(7e3,7e3).rotateX(-Math.PI/2),this.waterMat);i.position.set((r.x0+r.x1)/2,e.waterY,(r.z0+r.z1)/2),i.matrixAutoUpdate=!1,i.updateMatrix(),this.group.add(i),this.buildDynamic(e,n);let a=ah(e);a&&this.group.add(a),this.buildSky()}buildDynamic(e,t){let n=e.roadHalf,r=e.landmark(`windmill`);if(r){let n=e.places[r.place],i=new kp;for(let e=0;e<4;e++){let t=e*Math.PI/2;Z(i,`box`,16053488,Math.cos(t)*5,Math.sin(t)*5,0,10,1.6,.2,0,0,t),Z(i,`box`,10239795,Math.cos(t)*9,Math.sin(t)*9,.12,2.2,1.7,.1,0,0,t)}Z(i,`cyl8`,7023140,0,0,0,1.4,1,1.4,0,Math.PI/2),this.windmill.add(new eo(Sm(i.build()),t)),this.windmill.position.set(n.x+r.dx,n.h+13,n.z+r.dz+2.8),this.windmill.rotation.y=.5,this.group.add(this.windmill)}let i=e.landmark(`gateArm`);if(i){let r=e.gatePose(i.gate);this.gateTexts={open:i.open};let a=new kp,o=n*2+2;for(let e=0;e<6;e++)Z(a,`box`,e%2?16777215:15087942,(e+.5)*(o/6),0,0,o/6,.5,.3);Z(a,`box`,1911364,0,0,0,1.2,1.2,1.2),this.gateArm.add(new eo(Sm(a.build()),t));let s=Math.cos(r.h),c=-Math.sin(r.h);this.gateArm.position.set(r.x-s*(n+1.2),r.y+2.6,r.z-c*(n+1.2)),this.gateArm.rotation.order=`YXZ`,this.gateArm.rotation.y=r.h,this.group.add(this.gateArm);let l=new eo(new Xs(10,5),new Ha({map:ih(i.locked,`#1d2a44`,`#ffc83d`),toneMapped:!1})),u=r.x+s*(n+7)-Math.sin(r.h)*3,d=r.z+c*(n+7)-Math.cos(r.h)*3;l.position.set(u,r.y+4.2,d),l.rotation.y=r.h+Math.PI,this.gateSign=l,this.group.add(l);let f=new kp;Q(f,4212303,0,-4.2,0,.4,3,.4),l.add(new eo(Sm(f.build()),t))}let a=e.landmark(`depotSign`);if(a){let t=e.places[a.place],n=new Ha({map:ih([a.text],`#1d2a44`,`#ffffff`),toneMapped:!1});for(let e of[0,Math.PI]){let r=new eo(new Xs(20,3.4),n);r.position.set(t.x,t.h+14.5,t.z-52+(e?-.62:.62)),r.rotation.y=e,this.group.add(r)}}}setGateOpen(e,t=!1){if(this.gateTarget=+!!e,t&&(this.gateOpen=this.gateTarget),e&&this.gateSign){let e=this.gateSign.material;e.map?.dispose(),e.map=ih(this.gateTexts.open,`#2a9d4b`,`#ffffff`),e.needsUpdate=!0}}setQuality(e,t,n){this.detailOn=e,this.waterAnim=t,this.viewDist=n}buildSky(){let e=new Qs(900,24,14),t=e.attributes.position,n=[],r=new J(4034528),i=new J(11131127),a=new J(16771532),o=new J(16763274),s=new J,c=new K(-.7,0,.45).normalize(),l=new K;for(let e=0;e<t.count;e++){let u=Math.max(0,t.getY(e)/900);u<.18?s.copy(a).lerp(i,u/.18):s.copy(i).lerp(r,((u-.18)/.82)**.7),l.set(t.getX(e),0,t.getZ(e)).normalize();let d=Math.max(0,l.dot(c));s.lerp(o,d**3*(1-Math.min(1,u*3))*.6),n.push(s.r,s.g,s.b)}e.setAttribute(`color`,new va(n,3));let u=new eo(e,new Ha({vertexColors:!0,side:1,fog:!1,depthWrite:!1}));u.renderOrder=-3,this.sky.add(u);let d=new kp,f=[];for(let e=0;e<=72;e++){let t=e/72*Math.PI*2,n=Math.max(0,Math.cos(t));f.push((50+120*Nf(e*.33,3)+70*Nf(e*1.1,9))*(1-.85*n**.7))}for(let e=0;e<72;e++){let t=e/72*Math.PI*2,n=(e+1)/72*Math.PI*2,r=(t+n)/2,i=f[e],a=f[e+1],o=Math.max(i,a)+25*Nf(e*2.7,1),s=vp(9680073,(Nf(e,5)-.5)*.06),c=Math.cos(t)*860,l=Math.sin(t)*860,u=Math.cos(n)*860,p=Math.sin(n)*860,m=Math.cos(r)*840,h=Math.sin(r)*840;d.tri(c,-40,l,u,-40,p,u,a,p,s),d.tri(c,-40,l,u,a,p,c,i,l,s),d.tri(c,i,l,u,a,p,m,o,h,o>150?_p(15003381):vp(8825023,.02))}let p=new eo(Sm(d.build()),new Ha({vertexColors:!0,fog:!1,side:2}));p.renderOrder=-2,this.sky.add(p);let m=new kp,h=Pf(99);for(let e=0;e<16;e++){let e=h()*Math.PI*2,t=420+h()*340,n=170+h()*110;for(let r=0;r<4;r++){let i=30+h()*30;Z(m,`ico`,r===0?16777215:15857402,Math.cos(e)*t+(h()-.5)*60,n+(h()-.5)*12,Math.sin(e)*t+(h()-.5)*60,i*1.6,i*.5,i,h()*3)}}let g=new eo(Sm(m.build()),new Ha({vertexColors:!0,fog:!1}));g.renderOrder=-1,this.clouds=g,this.sky.add(g)}update(e,t){this.time+=e,this.sky.position.set(t.x,0,t.z),this.clouds&&(this.clouds.rotation.y=this.time*.004),this.windmill.rotation.z=this.time*.9,this.gateOpen!==this.gateTarget&&(this.gateOpen+=Math.sign(this.gateTarget-this.gateOpen)*Math.min(Math.abs(this.gateTarget-this.gateOpen),e*.7)),this.gateArm.rotation.z=this.gateOpen*Math.PI/2.2;for(let e of this.chunks){let n=e.geometry.boundingSphere,r=n.center.x-t.x,i=n.center.z-t.z,a=this.viewDist+n.radius;e.visible=r*r+i*i<a*a}for(let e of this.details){if(!this.detailOn){e.visible=!1;continue}let n=e.geometry.boundingSphere,r=n.center.x-t.x,i=n.center.z-t.z,a=300+n.radius;e.visible=r*r+i*i<a*a}this.waterAnim&&(this.waterMat.uniforms.uTime.value=this.time)}},ch=class{constructor(e,t,n,r,i,a){this.scene=new Ii,this.particles=new Gm,this.markers=new Um,this.pose=nh(),this.tmp=new K,this.renderer=new kf({canvas:e,antialias:!0,powerPreference:`high-performance`,stencil:!1}),this.scene.background=new J(15984338),this.fog=new Fi(15787216,260,a),this.scene.fog=this.fog,this.scene.add(new Mc(15135487,9076060,2.35));let o=new qc(16768174,1.8);o.position.set(-.7,.75,.45),this.scene.add(o);let s=Cm();this.rig=new Nm(t),this.world=new sh(t,n,s),this.scene.add(this.world.group,this.world.sky),this.truck=new rh(s),this.scene.add(this.truck.root),this.scene.add(this.particles.points),this.traffic=new qm(s,r.traffic,t.region.traffic.colors),this.lights=new Bm(r.rules),this.scene.add(this.lights.bulbs,this.traffic.mesh),this.life=new zm(s,t),this.scene.add(this.life.group),this.base=new Mm(s,t,i),this.scene.add(this.base.group),this.scene.add(this.markers.group)}setFogFar(e){this.fog.far=e}updatePose(e,t){return th(e.truck,t,this.pose)}draw(e,t,n){let r=this.updatePose(e,t);this.truck.sync(r,e.truck.braking),this.traffic.sync(e.traffic,t),this.lights.sync(e.rules),this.rig.update(n,r);let i=this.rig.cam.position;this.world.update(n,i),this.life.update(n,i),this.base.update(n),this.particles.update(n),this.particles.setScale(this.renderer.domElement.height,this.rig.cam.fov),this.markers.update(n,i),this.renderer.render(this.scene,this.rig.cam)}toScreen(e){this.tmp.copy(e).project(this.rig.cam);let t=this.renderer.domElement;return{x:(this.tmp.x+1)/2*(t.clientWidth||window.innerWidth),y:(1-this.tmp.y)/2*(t.clientHeight||window.innerHeight)}}resize(e,t,n){this.renderer.setPixelRatio(n),this.renderer.setSize(e,t,!1),this.rig.cam.aspect=e/t,this.rig.portrait=t>e*1.05,this.rig.cam.updateProjectionMatrix()}},lh={sound:`<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,mute:`<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,pause:`<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>`,horn:`<svg viewBox="0 0 24 24"><path d="M3 10v4h3l7 5V5L6 10z" fill="currentColor"/><path d="M16 12h5M15.5 7.5l4-2M15.5 16.5l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,left:`<svg viewBox="0 0 24 24"><path d="M15 4L7 12l8 8" stroke="currentColor" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,right:`<svg viewBox="0 0 24 24"><path d="M9 4l8 8-8 8" stroke="currentColor" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,arrow:`<svg viewBox="0 0 24 24"><path d="M12 3l7 9h-4v9H9v-9H5z" fill="currentColor"/></svg>`,star:`<svg viewBox="0 0 24 24"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z" fill="currentColor"/></svg>`,lock:`<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2" fill="currentColor"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="2.4" fill="none"/></svg>`,play:`<svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z" fill="currentColor"/></svg>`,turnLeft:`<svg viewBox="0 0 24 24"><path d="M16 21v-8a4 4 0 0 0-4-4H6" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M9 4.5L4 9l5 4.5z" fill="currentColor"/></svg>`,turnRight:`<svg viewBox="0 0 24 24"><path d="M8 21v-8a4 4 0 0 1 4-4h6" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M15 4.5L20 9l-5 4.5z" fill="currentColor"/></svg>`,round:`<svg viewBox="0 0 24 24"><circle cx="12" cy="11" r="4.5" stroke="currentColor" stroke-width="2.6" fill="none"/><path d="M12 22v-6.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M16.5 11h5M21 8l2 3-2 3" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,gear:`<svg viewBox="0 0 24 24"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm8.2 4.8l1.8 1.4-2 3.4-2.1-.8a7.6 7.6 0 0 1-1.9 1.1L15.6 21h-3.9l-.4-2.6a7.6 7.6 0 0 1-1.9-1.1l-2.1.8-2-3.4 1.8-1.4a7.4 7.4 0 0 1 0-2.2L5.3 9.7l2-3.4 2.1.8a7.6 7.6 0 0 1 1.9-1.1L11.7 3h3.9l.4 2.6a7.6 7.6 0 0 1 1.9 1.1l2.1-.8 2 3.4-1.8 1.4a7.4 7.4 0 0 1 0 2.2z" fill="currentColor"/></svg>`,map:`<svg viewBox="0 0 24 24"><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 3v15M15 6v15" stroke="currentColor" stroke-width="2"/></svg>`,hammer:`<svg viewBox="0 0 24 24"><path d="M3 20l9-9 2 2-9 9zM11 6l4-4 7 7-4 4z" fill="currentColor"/></svg>`},uh=class{constructor(e){this.onAct=null,this.el={},this.cache=new Map,this.labelEls=new Map,this.moneyShown=0,e.innerHTML=`
      <canvas id="c"></canvas>
      <div id="hud">
        <div class="top">
          <div class="pill money"><i class="coin">$</i><span data-el="money">0</span></div>
          <div class="pill lvl" data-el="lvl"></div>
          <div class="grow"></div>
          <button class="round" data-act="settings" data-i18n-aria="hud.settings">${lh.gear}</button>
          <button class="round" data-act="mute" data-el="mute" data-i18n-aria="hud.sound">${lh.sound}</button>
          <button class="round drive-only" data-act="pause" data-i18n-aria="hud.pause">${lh.pause}</button>
        </div>
        <div class="nav drive-only" data-el="nav">
          <div class="nav-row"><span class="nav-arrow" data-el="navArrow">${lh.arrow}</span><span data-el="turn"></span><b data-el="dist"></b></div>
          <div class="nav-bar"><i data-el="navBar"></i></div>
          <div class="nav-cargo" data-el="cargo"></div>
        </div>
        <div class="warn" data-el="warn"></div>
        <div class="speed drive-only"><b data-el="speed">0</b><small data-i18n="fmt.kmh"></small></div>
        <div class="controls drive-only" data-el="controls">
          <div class="steer" data-el="steer"><div class="half">${lh.left}</div><div class="half">${lh.right}</div></div>
          <div class="pedals">
            <div class="col">
              <button class="horn" data-el="horn" data-i18n-aria="hud.horn">${lh.horn}</button>
              <div class="pedal brake" data-el="brake" data-i18n="hud.brake"></div>
            </div>
            <div class="pedal gas" data-el="gas" data-i18n="hud.gas"></div>
          </div>
        </div>
        <div class="hint" data-el="hint">
          <div class="hint-steer"><span class="finger"></span><span data-i18n="hud.hintSteer"></span></div>
          <div class="hint-gas"><span class="finger"></span><span data-i18n="hud.hintHold"></span></div>
          <div class="hint-keys" data-i18n="hud.hintKeys"></div>
        </div>
        <div class="base-only base-bar">
          <div class="gatebar" data-el="gatebar"></div>
          <button class="btn map" data-act="map">${lh.map}<span data-i18n="hud.mapButton"></span></button>
          <button class="btn xl go" data-act="jobs">${lh.play}<span data-i18n="hud.drive"></span></button>
        </div>
        <div class="labels base-only" data-el="labels"></div>
        <div class="toasts" data-el="toasts"></div>
        <div class="big" data-el="big"></div>
        <div class="coins" data-el="coins"></div>
        <div class="panel-wrap" data-el="panelWrap" hidden><div class="panel" data-el="panel"></div></div>
        <div class="fade" data-el="fade"></div>
      </div>`,this.root=e.querySelector(`#hud`),this.canvas=e.querySelector(`#c`),e.querySelectorAll(`[data-el]`).forEach(e=>this.el[e.dataset.el]=e),this.steer=this.el.steer,this.gas=this.el.gas,this.brake=this.el.brake,this.horn=this.el.horn,this.root.addEventListener(`click`,e=>{let t=e.target.closest(`[data-act]`);t&&!t.hasAttribute(`disabled`)&&(e.preventDefault(),this.onAct?.(t.dataset.act,t.dataset.arg??``))}),this.relabel(),window.matchMedia(`(pointer: coarse)`).matches&&document.body.classList.add(`touch`),window.addEventListener(`touchstart`,()=>document.body.classList.add(`touch`),{once:!0,passive:!0})}relabel(){this.root.querySelectorAll(`[data-i18n]`).forEach(e=>e.textContent=R(e.dataset.i18n)),this.root.querySelectorAll(`[data-i18n-aria]`).forEach(e=>e.setAttribute(`aria-label`,R(e.dataset.i18nAria))),this.cache.clear()}set(e,t){this.cache.get(e)!==t&&(this.cache.set(e,t),this.el[e].innerHTML=t)}mode(e){this.root.dataset.mode=e}setMoney(e,t=!0){t&&(this.moneyShown=e),this.set(`money`,z(this.moneyShown))}tickMoney(e,t){if(Math.abs(this.moneyShown-e)<.5){this.moneyShown!==e&&(this.moneyShown=e,this.setMoney(e,!1));return}this.moneyShown+=(e-this.moneyShown)*Math.min(1,t*6)+Math.sign(e-this.moneyShown)*.5,this.setMoney(e,!1)}bumpMoney(){let e=this.el.money.parentElement;e.classList.remove(`bump`),e.offsetWidth,e.classList.add(`bump`)}moneyRect(){return this.el.money.parentElement.getBoundingClientRect()}setLevel(e){this.set(`lvl`,`${lh.star}<span>${R(`hud.baseLv`,{n:e})}</span>`)}setGateBar(e,t,n,r){if(n)this.set(`gatebar`,R(`hud.gateOpen`,{area:r.toLocaleUpperCase()}));else{let n=Array.from({length:t},(t,n)=>`<i class="${n<e?`on`:``}"></i>`).join(``);this.set(`gatebar`,`${lh.lock}${R(`hud.gateLocked`,{area:r,n:t})}<span class="pips">${n}</span>`)}}setMuted(e){this.set(`mute`,e?lh.mute:lh.sound)}nav(e,t,n,r,i){this.set(`navArrow`,e===`left`?lh.turnLeft:e===`right`?lh.turnRight:e===`round`?lh.round:lh.arrow),this.set(`turn`,t),this.set(`dist`,n),this.set(`cargo`,r),this.el.navBar.style.transform=`scaleX(${Math.max(0,Math.min(1,i)).toFixed(3)})`}warn(e){this.set(`warn`,e),this.el.warn.classList.toggle(`on`,!!e)}speed(e){this.set(`speed`,String(Math.round(e)))}hint(e){this.el.hint.classList.toggle(`on`,e)}toast(e,t=``){let n=document.createElement(`div`);n.className=`toast `+t,n.innerHTML=e,this.el.toasts.appendChild(n),setTimeout(()=>n.classList.add(`out`),2600),setTimeout(()=>n.remove(),3100)}big(e){let t=this.el.big;t.innerHTML=e,t.classList.remove(`show`),t.offsetWidth,t.classList.add(`show`)}panel(e,t=!1){this.el.panel.innerHTML=e,this.el.panelWrap.classList.toggle(`low`,t),this.el.panelWrap.hidden=!1}closePanel(){this.el.panelWrap.hidden=!0}get panelOpen(){return!this.el.panelWrap.hidden}async fade(e){let t=this.el.fade;t.classList.add(`on`),await new Promise(e=>setTimeout(e,260)),e(),await new Promise(e=>setTimeout(e,60)),t.classList.remove(`on`)}flyCoins(e,t,n,r){let i=this.moneyRect(),a=i.left+18,o=i.top+i.height/2;for(let i=0;i<n;i++){let n=document.createElement(`i`);n.className=`fly`,n.textContent=`$`,this.el.coins.appendChild(n);let s=e+(Math.random()-.5)*80,c=t+(Math.random()-.5)*50,l=s+(Math.random()-.5)*160,u=c-80-Math.random()*120,d=i*55,f=650+Math.random()*150,p=performance.now()+d,m=e=>{let t=(e-p)/f;if(t<0){n.style.transform=`translate(${s}px, ${c}px) scale(0)`,requestAnimationFrame(m);return}if(t>=1){n.remove(),r(i);return}let d=t*t*(3-2*t),h=1-d,g=h*h*s+2*h*d*l+d*d*a,_=h*h*c+2*h*d*u+d*d*o,v=t<.2?t*6:1.2-t*.5;n.style.transform=`translate(${g}px, ${_}px) scale(${v.toFixed(2)})`,requestAnimationFrame(m)};requestAnimationFrame(m)}}labels(e){let t=new Set;for(let n of e){t.add(n.id);let e=this.labelEls.get(n.id);e||(e=document.createElement(`button`),e.className=`blabel`,this.el.labels.appendChild(e),this.labelEls.set(n.id,e)),e.hidden=!n.visible,e.dataset.act=n.id.startsWith(`b:`)?`building`:n.id,e.dataset.arg=n.id.slice(2);let r=`blabel `+(n.cls??``);e.className!==r&&(e.className=r),this.cache.get(`lbl:`+n.id)!==n.html&&(this.cache.set(`lbl:`+n.id,n.html),e.innerHTML=n.html),e.style.transform=`translate(${n.x.toFixed(1)}px, ${n.y.toFixed(1)}px) translate(-50%, -100%)`}for(let[e,n]of this.labelEls)t.has(e)||(n.hidden=!0)}},dh=.4,fh=class{constructor(e){this.b=e,this.w=Math.round((e.x1-e.x0)*dh),this.h=Math.round((e.z1-e.z0)*dh)}x(e){return(e-this.b.x0)*dh}y(e){return(e-this.b.z0)*dh}},ph=`#4a3a2a`;function mh(e,t,n,r,i,a=!1){let o={depot:`#ffc83d`,farm:`#e2574c`,town:`#4f8fd6`,port:`#2a9d8f`,mill:`#6f8f4a`,gate:`#e2574c`};e.save(),e.translate(n,r),e.beginPath(),e.arc(0,0,i,0,Math.PI*2),e.fillStyle=a?`#9a948a`:o[t]??`#4f8fd6`,e.fill(),e.lineWidth=Math.max(1.5,i*.18),e.strokeStyle=`#fffaf0`,e.stroke(),e.lineWidth=Math.max(1,i*.1),e.strokeStyle=ph,e.beginPath(),e.arc(0,0,i+e.lineWidth*.9,0,Math.PI*2),e.stroke();let s=i*.55;e.fillStyle=`#fffaf0`,e.strokeStyle=`#fffaf0`,e.lineWidth=Math.max(1.2,i*.16),e.lineJoin=`round`,e.lineCap=`round`,e.beginPath(),t===`depot`?(e.rect(-s,-s*.35,s*1.1,s*.8),e.rect(s*.2,-s*.05,s*.8,s*.5),e.fill(),e.fillStyle=ph,e.beginPath(),e.arc(-s*.55,s*.55,s*.24,0,Math.PI*2),e.arc(s*.6,s*.55,s*.24,0,Math.PI*2),e.fill()):t===`farm`?(e.moveTo(-s,s*.8),e.lineTo(-s,-s*.1),e.lineTo(0,-s*.85),e.lineTo(s,-s*.1),e.lineTo(s,s*.8),e.closePath(),e.fill(),e.strokeStyle=o.farm,e.beginPath(),e.moveTo(-s*.4,s*.8),e.lineTo(s*.4,0),e.moveTo(s*.4,s*.8),e.lineTo(-s*.4,0),e.stroke()):t===`town`?(e.moveTo(-s,s*.8),e.lineTo(-s,-s*.1),e.lineTo(-s*.45,-s*.6),e.lineTo(0,-s*.1),e.lineTo(0,-s*.9),e.lineTo(s*.5,-s*.9),e.lineTo(s*.5,-s*.3),e.lineTo(s,-s*.3),e.lineTo(s,s*.8),e.closePath(),e.fill()):t===`port`?(e.moveTo(0,-s*.9),e.lineTo(0,s*.8),e.moveTo(-s*.5,-s*.45),e.lineTo(s*.5,-s*.45),e.moveTo(-s*.85,s*.15),e.quadraticCurveTo(-s*.7,s*.85,0,s*.8),e.quadraticCurveTo(s*.7,s*.85,s*.85,s*.15),e.stroke()):t===`mill`?(e.moveTo(0,-s),e.lineTo(s*.8,s*.45),e.lineTo(-s*.8,s*.45),e.closePath(),e.fill(),e.fillRect(-s*.15,s*.4,s*.3,s*.45)):(e.fillRect(-s*.65,-s*.1,s*1.3,s),e.beginPath(),e.arc(0,-s*.1,s*.45,Math.PI,0),e.stroke()),e.restore()}function hh(e,t){let n=e.waterY,r=e=>e<n,i=t.b,a=t.w,o=t.h,s=e=>t.x(e),c=e=>t.y(e),l=(t,n)=>e.groundAt(t,n),{RBRIDGE:u,ROVER:d,RX:f,RZ:p,river:m,roads:h}=e,g=e.junctions.ring,_=document.createElement(`canvas`);_.width=a,_.height=o;let v=_.getContext(`2d`);v.fillStyle=`#efe0b9`,v.fillRect(0,0,a,o);let y=Math.ceil(a/10)+1,b=Math.ceil(o/10)+1,x=document.createElement(`canvas`);x.width=y,x.height=b;let S=x.getContext(`2d`),C=S.createImageData(y,b),w=new Float32Array(y*b);for(let e=0;e<b;e++)for(let t=0;t<y;t++)w[e*y+t]=l(i.x0+t*10/dh,i.z0+e*10/dh);for(let e=0;e<b;e++)for(let t=0;t<y;t++){let i=w[e*y+t],a=w[e*y+Math.min(y-1,t+1)]-i,o=w[Math.min(b-1,e+1)*y+t]-i,s=Math.max(-.22,Math.min(.18,(-a+o)*.02)),c,l,u;r(i)?[c,l,u]=[128,186,214]:i<n+1.2?[c,l,u]=[234,218,168]:i>110?[c,l,u]=[246,242,232]:i>60?[c,l,u]=[196,184,156]:i>25?[c,l,u]=[178,196,128]:[c,l,u]=[190,212,138];let d=1+s,f=(e*y+t)*4;C.data[f]=Math.min(255,c*d),C.data[f+1]=Math.min(255,l*d),C.data[f+2]=Math.min(255,u*d),C.data[f+3]=255}S.putImageData(C,0,0),v.imageSmoothingEnabled=!0,v.globalAlpha=.92,v.drawImage(x,0,0,y*10,b*10),v.globalAlpha=1;let T=Pf(5);v.fillStyle=`rgba(120, 90, 50, 0.05)`;for(let e=0;e<2500;e++)v.fillRect(T()*a,T()*o,1+T()*2,1+T()*2);v.strokeStyle=`rgba(60, 110, 150, 0.55)`,v.lineWidth=2,v.beginPath();for(let e=0;e<m.x.length;e++){let t=s(m.x[e]),n=c(m.z[e]);e?v.lineTo(t,n):v.moveTo(t,n)}v.stroke(),v.strokeStyle=`rgba(255, 255, 255, 0.55)`,v.lineWidth=1.5;for(let t=0;t<40;t++){let t=s(e.region.meta.map.seaX+T()*230),n=T()*o;r(l(i.x0+t/.4,i.z0+n/.4))&&(v.beginPath(),v.moveTo(t,n),v.quadraticCurveTo(t+5,n-4,t+10,n),v.quadraticCurveTo(t+15,n+4,t+20,n),v.stroke())}for(let e=i.z0;e<i.z1;e+=34)for(let t=i.x0;t<i.x1;t+=34){let r=t+(T()-.5)*28,i=e+(T()-.5)*28,a=l(r,i);if(h.nearest(r,i,40)||a<n+1.5)continue;let o=s(r),u=c(i);if(a>70){if(T()<.25){let e=7+T()*6;v.fillStyle=`#a89878`,v.beginPath(),v.moveTo(o-e,u+e*.6),v.lineTo(o,u-e),v.lineTo(o+e,u+e*.6),v.fill(),v.fillStyle=`#fbf8f0`,v.beginPath(),v.moveTo(o-e*.35,u-e*.45),v.lineTo(o,u-e),v.lineTo(o+e*.35,u-e*.45),v.fill()}continue}if(Nf(r/280+20,i/280-3)>.55||i<-1150&&T()<.5){let e=3.2+T()*1.6;v.fillStyle=i<-1150||a>32?`#4f7a4a`:`#5f8f4c`,v.beginPath(),v.moveTo(o-e,u+e),v.lineTo(o,u-e*1.4),v.lineTo(o+e,u+e),v.fill()}}let E=e.places[e.climate.fields.place];for(let e=0;e<9;e++){let t=-.4+e*.62,n=130+e%3*45,r=s(E.x-60+Math.cos(t)*n),i=c(E.z+60+Math.sin(t)*n);v.save(),v.translate(r,i),v.rotate(.6);for(let t=0;t<4;t++)v.fillStyle=[`#e7c56a`,`#9cc05a`,`#b98a55`,`#f0d58a`][(t+e)%4],v.fillRect(-14,-10+t*5,28,5);v.restore()}let D=(e,t)=>{v.strokeStyle=t,v.lineWidth=e,v.lineCap=`round`,v.lineJoin=`round`,v.beginPath();for(let e=0;e<f.length;e++){let t=s(f[e]),n=c(p[e]);e===0||h.group[e]!==h.group[e-1]?v.moveTo(t,n):v.lineTo(t,n)}v.stroke()};D(8,ph),D(5,`#fff4d6`),v.lineCap=`round`;for(let t of e.roadList.filter(e=>e.def.kind===1))for(let[e,n]of[[12,ph],[8,`#f2b84b`]]){v.strokeStyle=n,v.lineWidth=e,v.beginPath();for(let e=t.o;e<t.o+t.n;e++)(e===t.o?v.moveTo:v.lineTo).call(v,s(f[e]),c(p[e]));v.stroke()}v.fillStyle=`#9cc05a`,v.strokeStyle=ph,v.lineWidth=1.5,v.beginPath(),v.arc(s(g.x),c(g.z),(g.r-5)*dh,0,Math.PI*2),v.fill(),v.stroke(),v.lineWidth=7,v.strokeStyle=`#3d7cc9`,v.beginPath();for(let e=0;e<f.length-1;e++)d[e]&&d[e+1]&&(v.moveTo(s(f[e]),c(p[e])),v.lineTo(s(f[e+1]),c(p[e+1])));v.stroke(),v.strokeStyle=`#d64534`,v.lineWidth=9,v.beginPath();for(let e=0;e<f.length-1;e++)u[e]&&u[e+1]&&h.group[e]===h.group[e+1]&&(v.moveTo(s(f[e]),c(p[e])),v.lineTo(s(f[e+1]),c(p[e+1])));v.stroke(),v.strokeStyle=`#fff4d6`,v.lineWidth=4,v.stroke();for(let t of e.gates){let n=e.roadPointAt(t.road,t.s);v.save(),v.translate(s(n.x),c(n.z)),v.rotate(-n.h),v.fillStyle=`#e2574c`,v.fillRect(-7,-2,14,4),v.restore()}return _}var gh=330,_h=class{constructor(e,t,n){this.size=0,this.t=0,this.img=t,this.info=n,this.el=document.createElement(`button`),this.el.className=`minimap drive-only`,this.el.dataset.act=`map`,this.el.dataset.i18nAria=`hud.map`,this.el.setAttribute(`aria-label`,R(`hud.map`)),this.canvas=document.createElement(`canvas`),this.el.appendChild(this.canvas),e.appendChild(this.el),this.g=this.canvas.getContext(`2d`)}draw(e,t){this.t+=t;let n=this.el.clientWidth;if(!n)return;let r=Math.min(2,window.devicePixelRatio||1),i=Math.round(n*r);i!==this.size&&(this.size=i,this.canvas.width=this.canvas.height=i);let a=this.info.frame,o=this.g,s=i/2,c=s-2*r,l=c/(gh*dh),u=e.h-Math.PI,d=Math.cos(u),f=Math.sin(u),p=a.x(e.x),m=a.y(e.z),h=(e,t)=>{let n=a.x(e)-p,r=a.y(t)-m;return[s+(n*d-r*f)*l,s+(n*f+r*d)*l]};if(o.setTransform(1,0,0,1,0,0),o.clearRect(0,0,i,i),o.save(),o.beginPath(),o.arc(s,s,c,0,Math.PI*2),o.clip(),o.fillStyle=`#efe0b9`,o.fillRect(0,0,i,i),o.translate(s,s),o.rotate(u),o.scale(l,l),o.translate(-p,-m),o.drawImage(this.img,0,0),e.route){let t=e.route;o.lineCap=`round`,o.lineJoin=`round`,o.beginPath();for(let n=Math.max(0,e.routeIdx-1);n<t.n;n+=2){let r=a.x(t.x[n]),i=a.y(t.z[n]);n<=e.routeIdx?o.moveTo(r,i):o.lineTo(r,i)}o.lineTo(a.x(t.x[t.n-1]),a.y(t.z[t.n-1])),o.strokeStyle=`#1d5a2c`,o.lineWidth=6.5*r/l,o.stroke(),o.strokeStyle=`#6dff6a`,o.lineWidth=3.8*r/l,o.stroke()}o.setTransform(1,0,0,1,0,0);for(let t of this.info.places){let[n,i]=h(t.x,t.z);Math.hypot(n-s,i-s)<c-6*r&&mh(o,t.icon,n,i,8.5*r,e.locked.has(t.id))}let g=e.dest?this.info.places.find(t=>t.id===e.dest):void 0;if(g){let[e,t]=h(g.x,g.z),n=Math.hypot(e-s,t-s),i=1+.25*Math.sin(this.t*6);if(n<c-10*r)o.strokeStyle=`#2fbf5b`,o.lineWidth=3*r,o.beginPath(),o.arc(e,t,13*r*i,0,Math.PI*2),o.stroke();else{let n=Math.atan2(t-s,e-s),a=s+Math.cos(n)*(c-9*r),l=s+Math.sin(n)*(c-9*r);o.save(),o.translate(a,l),o.rotate(n),o.fillStyle=`#2fbf5b`,o.strokeStyle=`#123`,o.lineWidth=1.5*r,o.beginPath(),o.moveTo(8*r*i,0),o.lineTo(-6*r,-7*r),o.lineTo(-6*r,7*r),o.closePath(),o.fill(),o.stroke(),o.restore()}}o.fillStyle=`#ffc83d`,o.strokeStyle=`#1d2a44`,o.lineWidth=2*r,o.beginPath(),o.moveTo(s,s-10*r),o.lineTo(s+7*r,s+8*r),o.lineTo(s,s+4*r),o.lineTo(s-7*r,s+8*r),o.closePath(),o.fill(),o.stroke(),o.restore(),o.strokeStyle=`#1d2a44`,o.lineWidth=3*r,o.beginPath(),o.arc(s,s,c,0,Math.PI*2),o.stroke();let _=s+Math.sin(u)*(c-1*r),v=s-Math.cos(u)*(c-1*r);o.fillStyle=`#e2574c`,o.beginPath(),o.arc(_,v,7*r,0,Math.PI*2),o.fill(),o.fillStyle=`#fff`,o.font=`${10*r}px "Lilita One", system-ui, sans-serif`,o.textAlign=`center`,o.textBaseline=`middle`,o.fillText(R(`map.north`),_,v+.5*r)}},vh=class{constructor(e,t,n){this.onTake=null,this.onClose=null,this.last=null,this.img=t,this.info=n,this.el=document.createElement(`div`),this.el.className=`mapview`,this.el.hidden=!0,this.el.innerHTML=`
      <div class="map-frame">
        <canvas class="map-canvas"></canvas>
        <div class="map-pins"></div>
        <div class="map-title"></div>
        <div class="map-card" hidden></div>
      </div>
      <button class="map-close">✕</button>`,e.appendChild(this.el),this.frame=this.el.querySelector(`.map-frame`),this.canvas=this.el.querySelector(`.map-canvas`),this.pins=this.el.querySelector(`.map-pins`),this.card=this.el.querySelector(`.map-card`),this.title=this.el.querySelector(`.map-title`),this.closeBtn=this.el.querySelector(`.map-close`),this.canvas.width=n.frame.w,this.canvas.height=n.frame.h,this.closeBtn.addEventListener(`click`,()=>this.close()),this.el.addEventListener(`click`,e=>{let t=e.target,n=t.closest(`[data-pin]`),r=t.closest(`[data-take]`);if(r){this.onTake?.(Number(r.dataset.take));return}n?this.showCard(n.dataset.pin):t.closest(`.map-card`)||(this.card.hidden=!0)}),window.addEventListener(`resize`,()=>this.layout())}get isOpen(){return!this.el.hidden}open(e,t,n){this.last={s:e,jobs:t,canTake:n},this.title.textContent=R(`map.title`),this.closeBtn.setAttribute(`aria-label`,R(`hud.closeMap`)),this.el.hidden=!1,this.card.hidden=!0,this.layout(),this.paint()}close(){this.el.hidden||(this.el.hidden=!0,this.onClose?.())}layout(){if(this.el.hidden)return;let e=window.innerWidth-24,t=window.innerHeight-24,n=this.info.frame.w/this.info.frame.h,r=e,i=r/n;i>t&&(i=t,r=i*n),this.frame.style.width=`${Math.floor(r)}px`,this.frame.style.height=`${Math.floor(i)}px`}place(e){return this.info.places.find(t=>t.id===e)}paint(){let e=this.last;if(!e)return;let t=this.info.frame,n=t.w,r=t.h,i=this.info.lockedArea,a=this.canvas.getContext(`2d`);if(a.drawImage(this.img,0,0),e.s.locked.size){a.save(),a.beginPath(),i.forEach(([e,n],r)=>r?a.lineTo(t.x(e),t.y(n)):a.moveTo(t.x(e),t.y(n))),a.closePath(),a.fillStyle=`rgba(120, 112, 100, 0.55)`,a.fill(),a.clip(),a.strokeStyle=`rgba(70, 60, 50, 0.3)`,a.lineWidth=3;for(let e=-r;e<n;e+=16)a.beginPath(),a.moveTo(e,0),a.lineTo(e+r,r),a.stroke();a.restore(),a.setLineDash([10,8]),a.strokeStyle=`#4a3a2a`,a.lineWidth=3,a.beginPath(),i.forEach(([e,n],r)=>r?a.lineTo(t.x(e),t.y(n)):a.moveTo(t.x(e),t.y(n))),a.closePath(),a.stroke(),a.setLineDash([])}if(e.s.route){let n=e.s.route;a.setLineDash([14,9]),a.lineCap=`round`,a.strokeStyle=`#d63a2f`,a.lineWidth=6,a.beginPath();for(let r=e.s.routeIdx;r<n.n;r+=2)(r===e.s.routeIdx?a.moveTo:a.lineTo).call(a,t.x(n.x[r]),t.y(n.z[r]));a.stroke(),a.setLineDash([])}for(let n of this.info.places)mh(a,n.icon,t.x(n.x),t.y(n.z),17,e.s.locked.has(n.id));let o=n-70,s=r-80;a.save(),a.translate(o,s),a.fillStyle=`rgba(255, 250, 235, 0.8)`,a.beginPath(),a.arc(0,0,40,0,Math.PI*2),a.fill();for(let e=0;e<4;e++)a.rotate(Math.PI/2),a.fillStyle=e===3?`#d63a2f`:`#4a3a2a`,a.beginPath(),a.moveTo(0,-36),a.lineTo(7,0),a.lineTo(-7,0),a.closePath(),a.fill();a.restore(),a.fillStyle=`#4a3a2a`,a.font=`22px "Lilita One", system-ui, sans-serif`,a.textAlign=`center`,a.fillText(R(`map.north`),o,s-46);let c=t.x(e.s.x),l=t.y(e.s.z);a.save(),a.translate(c,l),a.rotate(Math.PI-e.s.h),a.fillStyle=`#ffc83d`,a.strokeStyle=`#1d2a44`,a.lineWidth=3,a.beginPath(),a.moveTo(0,-16),a.lineTo(11,12),a.lineTo(0,6),a.lineTo(-11,12),a.closePath(),a.fill(),a.stroke(),a.restore();let u=a.createRadialGradient(n/2,r/2,Math.min(n,r)*.42,n/2,r/2,Math.max(n,r)*.72);u.addColorStop(0,`rgba(120, 80, 30, 0)`),u.addColorStop(1,`rgba(120, 80, 30, 0.35)`),a.fillStyle=u,a.fillRect(0,0,n,r);let d=(e,i)=>`left:${(t.x(e)/n*100).toFixed(2)}%;top:${(t.y(i)/r*100).toFixed(2)}%`,f=``;for(let t of this.info.places){let n=e.s.locked.has(t.id);f+=`<div class="map-name ${n?`locked`:``}" style="${d(t.x,t.z)}">${V(t.id)}${n?`<small>${R(`map.unlocks`,{n:this.info.gateLevel})}</small>`:``}</div>`}for(let t of e.jobs){let n=this.place(t.to),r=e.s.dest===t.to&&!e.canTake;f+=`<button class="map-pin ${r?`cur`:``}" data-pin="${t.index}" style="${d(n.x,n.z)}"><b>${z(t.pay)}</b></button>`}for(let t of e.s.locked){let e=this.place(t);f+=`<button class="map-pin locked" data-pin="locked:${t}" style="${d(e.x,e.z)}"><b>${R(`map.locked`)}</b></button>`}this.pins.innerHTML=f}showCard(e){let t=this.last;if(!t)return;let n;if(e.startsWith(`locked:`))n=`<h3>${V(e.slice(7))}</h3><p>${R(`map.lockedText`,{area:Te(this.info.area)})}</p><p class="big">${R(`map.unlocks`,{n:this.info.gateLevel})}</p><p>${R(`map.lockedHow`)}</p>`;else{let r=t.jobs.find(t=>t.index===Number(e));if(!r)return;let i=t.s.dest===r.to&&!t.canTake;n=`<h3>${V(r.to)}</h3><p>${R(`map.card`,{cargo:r.cargo,dist:r.dist})}</p><p class="big">${z(r.pay)}</p>${t.canTake?`<button class="btn primary" data-take="${r.index}">${R(`map.take`)}</button>`:`<p>${R(i?`map.current`:`map.busy`)}</p>`}`}this.card.innerHTML=n,this.card.hidden=!1}},yh=e=>R(`bld.${e}`);function bh(e,t){return e===`garage`?R(t>=3?`perk.garageNew`:`perk.garage`,{n:b[t]}):e===`warehouse`?R(`perk.warehouse`,{n:_[t].toFixed(2).replace(/0$/,``)}):t===0?R(`perk.fuel0`):R(`perk.fuel`,{rate:z(v[t]),cap:z(y[t])})}function xh(e){let t=Math.round(e.pay/e.mult);return`
      <h2>${R(`deliver.title`)}</h2>
      <div class="sub">${R(`deliver.route`,{cargo:we(e.cargo),dest:V(e.to)})}</div>
      <div class="payout">+${z(e.total)}</div>
      <div class="stat"><span>${R(`deliver.roadPay`)}</span><b>${z(t)}</b></div>
      ${e.mult>1?`<div class="stat"><span>${R(`deliver.warehouse`)}</span><b>+${z(e.pay-t)}</b></div>`:``}
      ${e.bonus?`<div class="stat good"><span>${R(`deliver.safe`)}</span><b>+${z(e.bonus)}</b></div>`:``}
      ${e.fines?`<div class="stat bad"><span>${R(`deliver.fines`)}</span><b>-${z(e.fines)}</b></div>`:``}
      <div class="row">
        ${e.adOk?`<button class="btn ad" data-act="double">${lh.play}<span>${R(`deliver.double`)}</span></button>`:``}
        <button class="btn primary" data-act="depot"><span>${R(`deliver.depot`)}</span>${lh.right}</button>
      </div>
      ${e.anyUpgrade?`<div class="small">${R(`deliver.canBuild`)}</div>`:``}`}function Sh(e){return`<h2>${R(`pause.title`)}</h2><div class="sub">${e?R(`pause.job`,{cargo:we(e.cargo),dest:V(e.to),pay:z(e.pay)}):``}</div>
          <div class="row"><button class="btn ghost" data-act="map">${R(`pause.map`)}</button><button class="btn ghost" data-act="settings">${R(`pause.settings`)}</button><button class="btn ghost" data-act="abandon">${R(`pause.depot`)}</button><button class="btn primary" data-act="resume">${R(`pause.resume`)}</button></div>`}function Ch(e){let t=Math.round(e/17/60*2)/2||1,n=String(t);try{n=t.toLocaleString(document.documentElement.lang||`en`,{maximumFractionDigits:1})}catch{}return R(`fmt.minutes`,{n})}function wh(e,t){let n=e.map((e,t)=>`<button class="job ${e.fresh?`new`:``}" data-act="take" data-arg="${t}">
          ${e.fresh?`<span class="chip">${R(`jobs.newRegion`)}</span>`:``}
          <span class="dest">${V(e.to)}</span>
          <span class="cargo">${we(e.cargo)}</span>
          <span class="meta">${R(`jobs.meta`,{dist:Ce(e.dist),min:Ch(e.dist)})}</span>
          <span class="pay">${z(e.pay)}</span></button>`).join(``),r=t.map(e=>`<button class="job locked" data-act="locked"><span class="dest">${V(e.to)}</span><span class="cargo">${we(e.cargo)}</span><span class="meta">${R(`jobs.lockedMeta`,{dist:Ce(e.dist)})}</span><span class="pay">${lh.lock} ${R(`jobs.lockedPay`,{n:e.level})}</span></button>`).join(``);return`<h2>${R(`jobs.title`)}</h2><div class="sub">${R(`jobs.sub`)}</div><div class="jobs">${n}${r}</div>
      <div class="row"><button class="btn ghost" data-act="close">${R(`jobs.close`)}</button></div>`}function Th(e,t,n,r,i,a,o){let s=x[e],c=t+1,l=`<div class="levels">${Array.from({length:4},(e,n)=>`<i class="${n<t?`on`:``}">${lh.star}</i>`).join(``)}</div>`;l+=`<div class="stat"><span>${R(t===0?`bld.plot`:`bld.now`)}</span><b>${t===0?R(`bld.empty`):bh(e,t)}</b></div>`,c<=4&&(l+=`<div class="stat"><span>${R(t===0?`bld.build`:`bld.next`)}</span><b>${bh(e,c)}</b></div>`,l+=`<div class="stat"><span>${R(`bld.time`)}</span><b>${B(s.time[c])}</b></div>`);let u=`<button class="btn ghost" data-act="close">${R(`bld.close`)}</button>`,d=``;if(r){let e=(r.until-i)/1e3;l+=`<div class="timer">${R(`bld.building`,{t:B(e)})}</div>`,o&&(u+=`<button class="btn ad" data-act="rush">${lh.play}<span>${R(`bld.finishNow`)}</span></button>`)}else if(n===`max`)d=R(`bld.max`);else{let r=s.cost[c];u+=`<button class="btn gold" data-act="upgrade" data-arg="${e}" ${n?`disabled`:``}>${R(t===0?`bld.buildFor`:`bld.upgradeFor`,{cost:z(r)})}</button>`,n===`busy`&&(d=R(`bld.busy`)),n===`money`&&(d=R(`bld.needMoney`,{n:z(r-a)}))}return`<h2>${t>0?R(`bld.titleLv`,{name:yh(e),n:t}):yh(e)}</h2>${l}<div class="row">${u}</div>${d?`<div class="small">${d}</div>`:``}`}function Eh(e,t,n,r){if(n){let t=(n.until-r)/1e3,i=Math.min(1,Math.max(0,1-t/n.total));return{html:`${yh(e)}<small>${B(t)}</small><span class="bar"><i style="width:${(i*100).toFixed(0)}%"></i></span>`,progress:i}}if(t>=4)return{html:`${yh(e)}<small>${R(`bld.labelMax`,{n:t})}</small>`,progress:1};let i=z(x[e].cost[t+1]);return{html:`${yh(e)}<small>${t===0?R(`bld.labelBuild`,{cost:i}):R(`bld.labelLv`,{n:t,cost:i})}</small>`,progress:0}}function Dh(e){let t=(t,n)=>`<button class="btn ${e.quality===t?`gold`:`ghost`}" data-act="quality" data-arg="${t}">${n}</button>`,n=e.tier===`high`?R(`set.high`):R(`set.low`);return`<h2>${R(`set.title`)}</h2>
      <div class="sub">${e.quality===`auto`?R(`set.graphicsNow`,{tier:n}):R(`set.graphics`)}</div>
      <div class="row">${t(`auto`,R(`set.auto`))}${t(`high`,R(`set.high`))}${t(`low`,R(`set.low`))}</div>
      <div class="small">${R(`set.lowNote`)}</div>
      <div class="sub" style="margin-top:10px">${R(`set.arrows`)}</div>
      <div class="row">${[`auto`,`on`,`off`].map(t=>`<button class="btn ${e.arrows===t?`gold`:`ghost`}" data-act="arrows" data-arg="${t}">${R(t===`auto`?`set.arrowsAuto`:t===`on`?`set.arrowsOn`:`set.arrowsOff`)}</button>`).join(``)}</div>
      <div class="sub" style="margin-top:10px">${R(`set.language`)}</div>
      <div class="row">${ce.map(t=>`<button class="btn ${e.lang===t.id?`gold`:`ghost`}" data-act="lang" data-arg="${t.id}">${t.name}</button>`).join(``)}</div>
      <div class="row"><button class="btn ghost" data-act="mute">${R(`set.sound`)}</button>${e.privacy?`<button class="btn ghost" data-act="privacy">${R(`set.privacy`)}</button>`:``}<button class="btn primary" data-act="${e.driving?`resume`:`close`}">${R(`set.ok`)}</button></div>`}var Oh=(e,t)=>{if(!e.length)return 0;let n=[...e].sort((e,t)=>e-t);return n[Math.min(n.length-1,Math.floor(t/100*n.length))]},kh=class{constructor(e,t,n){this.t=0,this.gpu=`?`,this.src=t;try{let e=n.getExtension(`WEBGL_debug_renderer_info`);this.gpu=String(e?n.getParameter(e.UNMASKED_RENDERER_WEBGL):n.getParameter(n.RENDERER))}catch{}this.el=document.createElement(`div`),this.el.className=`perfhud`,this.el.innerHTML=`<pre></pre><button type="button">COPY REPORT</button>`,this.text=this.el.querySelector(`pre`),this.el.querySelector(`button`).addEventListener(`click`,e=>{e.stopPropagation(),this.copy(e.currentTarget)}),e.appendChild(this.el)}stats(){let e=this.src.gaps.slice(-600),t=this.src.work.slice(-600),n=e.reduce((e,t)=>e+t,0)/Math.max(1,e.length);return{fps:n?+(1e3/n).toFixed(1):0,frame_p50:+Oh(e,50).toFixed(1),frame_p95:+Oh(e,95).toFixed(1),frame_p99:+Oh(e,99).toFixed(1),slow_frames_pct:+(100*e.filter(e=>e>20).length/Math.max(1,e.length)).toFixed(1),work_p50:+Oh(t,50).toFixed(2),work_p95:+Oh(t,95).toFixed(2),...this.src.info()}}update(e){if(this.t+=e,this.t<.5)return;this.t=0;let t=this.stats();this.text.textContent=`${t.fps} fps  ${t.frame_p50}/${t.frame_p95} ms\nwork ${t.work_p50}/${t.work_p95} ms\n${t.calls} calls ${Math.round(Number(t.tris)/1e3)}k tris\n${t.quality} x${t.pixelRatio}`}async copy(e){let t=this.stats(),n=[`Truckstead perf report`,new Date().toISOString(),`device: ${navigator.userAgent}`,`screen: ${screen.width}x${screen.height} css, dpr ${window.devicePixelRatio}, view ${innerWidth}x${innerHeight}`,`gpu: ${this.gpu}`,`cores: ${navigator.hardwareConcurrency??`?`}, memory: ${navigator.deviceMemory??`?`} GB`,...Object.entries(t).map(([e,t])=>`${e}: ${t}`),`(last ~10 s; frame = time between frames, work = game JS per frame)`].join(`
`),r=!1;try{await navigator.clipboard.writeText(n),r=!0}catch{let e=document.createElement(`textarea`);e.value=n,document.body.appendChild(e),e.select();try{r=document.execCommand(`copy`)}catch{r=!1}e.remove()}e.textContent=r?`COPIED!`:`COPY FAILED`,setTimeout(()=>e.textContent=`COPY REPORT`,1500)}},$=null,Ah=null,jh=null,Mh=null;function Nh(){if(!$||!Ah)return;let e=vt.silent;Ah.gain.setTargetAtTime(e?0:.9,$.currentTime,.03),document.hidden&&$.state===`running`?$.suspend().catch(()=>void 0):!document.hidden&&!e&&$.state===`suspended`&&$.resume().catch(()=>void 0)}function Ph(){try{if(!$){let e=window.AudioContext||window.webkitAudioContext;if(!e)return;$=new e,Ah=$.createGain(),Ah.gain.value=0,Ah.connect($.destination),jh=$.createBuffer(1,$.sampleRate,$.sampleRate);let t=jh.getChannelData(0);for(let e=0;e<t.length;e++)t[e]=Math.random()*2-1;Fh(),vt.onChange(Nh)}$.state===`suspended`&&!vt.silent&&$.resume().catch(()=>void 0),Nh()}catch{}}function Fh(){if(!$||!Ah)return;let e=$.createOscillator(),t=$.createOscillator();e.type=`sawtooth`,t.type=`square`;let n=$.createBiquadFilter();n.type=`lowpass`,n.Q.value=3;let r=$.createGain();r.gain.value=.7;let i=$.createOscillator();i.type=`sine`;let a=$.createGain();a.gain.value=.3,i.connect(a),a.connect(r.gain);let o=$.createGain();o.gain.value=.55;let s=$.createGain();s.gain.value=0,e.connect(n),t.connect(o),o.connect(n),n.connect(r),r.connect(s),s.connect(Ah),e.start(),t.start(),i.start(),Mh={a:e,b:t,lfo:i,lfoGain:a,filter:n,gain:s,chug:r}}function Ih(e,t,n){if(!$||!Mh)return;let r=$.currentTime,i=Math.min(4,Math.floor(e*5)),a=e*5-i,o=Math.min(1,.18+(i===0?a*.8:.35+a*.55)*.8+t*.06),s=38+o*62;Mh.a.frequency.setTargetAtTime(s,r,.06),Mh.b.frequency.setTargetAtTime(s*.5,r,.06),Mh.lfo.frequency.setTargetAtTime(s*.25,r,.06),Mh.filter.frequency.setTargetAtTime(260+o*700+t*500,r,.08),Mh.gain.gain.setTargetAtTime(n?.05+t*.05+o*.03:0,r,n?.1:.25)}function Lh(e,t,n,r,i){let a=$.createGain();return a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(n,t+r),a.gain.exponentialRampToValueAtTime(1e-4,t+r+i),e.connect(a),a.connect(Ah),a}function Rh(e,t,n,r,i,a){let o=$.createOscillator();o.type=e,o.frequency.setValueAtTime(t,n),a&&o.frequency.exponentialRampToValueAtTime(a,n+i),Lh(o,n,r,.005,i),o.start(n),o.stop(n+i+.05)}function zh(e,t,n,r,i,a=1){let o=$.createBufferSource();o.buffer=jh;let s=$.createBiquadFilter();s.type=r,s.frequency.value=i,s.Q.value=a,o.connect(s),Lh(s,e,t,.01,n),o.start(e,Math.random()*.5),o.stop(e+n+.05)}var Bh=()=>!!$&&!!Ah&&$.state===`running`&&!vt.silent,Vh={horn(){if(!Bh())return;let e=$.currentTime;for(let t of[233,294]){let n=$.createOscillator();n.type=`sawtooth`,n.frequency.value=t;let r=$.createBiquadFilter();r.type=`lowpass`,r.frequency.value=1400,n.connect(r);let i=$.createGain();i.gain.setValueAtTime(1e-4,e),i.gain.exponentialRampToValueAtTime(.09,e+.03),i.gain.setValueAtTime(.09,e+.45),i.gain.exponentialRampToValueAtTime(1e-4,e+.6),r.connect(i),i.connect(Ah),n.start(e),n.stop(e+.65)}},airBrake(){Bh()&&zh($.currentTime,.12,.55,`highpass`,2500)},bump(e=1){if(!Bh())return;let t=$.currentTime;zh(t,.25*e,.25,`lowpass`,260),Rh(`sine`,90,t,.25*e,.22,40)},coin(e=0){if(!Bh())return;let t=$.currentTime,n=1050*1.0595**(e%12);Rh(`triangle`,n,t,.08,.08),Rh(`triangle`,n*1.5,t+.06,.07,.16)},hammer(){if(!Bh())return;let e=$.currentTime;for(let t=0;t<3;t++){let n=e+t*.16;zh(n,.18,.07,`bandpass`,2400,3),Rh(`sine`,150,n,.2,.09,70)}},click(){Bh()&&Rh(`square`,660,$.currentTime,.035,.05)},deny(){Bh()&&Rh(`square`,180,$.currentTime,.05,.18,120)},delivered(){if(!Bh())return;let e=$.currentTime;[523,659,784,1047].forEach((t,n)=>Rh(`triangle`,t,e+n*.09,.09,.25))},levelUp(){if(!Bh())return;let e=$.currentTime;[392,523,659,784,1047,1319].forEach((t,n)=>Rh(n%2?`square`:`triangle`,t,e+n*.07,.06,.3))},whoosh(){Bh()&&zh($.currentTime,.08,.35,`bandpass`,900,.7)}},Hh=class{constructor(e,t,n,r){this.c={steer:0,gas:0,brake:0},this.keys=new Set,this.steerTouch=new Map,this.gasTouch=new Set,this.brakeTouch=new Set,this.onHorn=null,this.onAnyInput=null,this.enabled=!0,window.addEventListener(`keydown`,e=>{if(e.repeat)return;let t=e.key.toLowerCase();this.keys.add(t),t===`h`&&this.onHorn?.(),[`arrowup`,`arrowdown`,`arrowleft`,`arrowright`,` `].includes(t)&&e.preventDefault(),this.onAnyInput?.()}),window.addEventListener(`keyup`,e=>this.keys.delete(e.key.toLowerCase())),window.addEventListener(`blur`,()=>this.keys.clear());let i=t=>{let n=e.getBoundingClientRect();return(t.clientX-n.left)/n.width<.5?-1:1},a=(e,t)=>e.addEventListener(`pointerdown`,n=>{n.preventDefault();try{e.setPointerCapture(n.pointerId)}catch{}t(n),this.onAnyInput?.()}),o=(e,t)=>{for(let n of[`pointerup`,`pointercancel`,`lostpointercapture`])e.addEventListener(n,e=>t(e.pointerId))};a(e,e=>this.steerTouch.set(e.pointerId,i(e))),e.addEventListener(`pointermove`,e=>{this.steerTouch.has(e.pointerId)&&this.steerTouch.set(e.pointerId,i(e))}),o(e,e=>this.steerTouch.delete(e)),a(t,e=>this.gasTouch.add(e.pointerId)),o(t,e=>this.gasTouch.delete(e)),a(n,e=>this.brakeTouch.add(e.pointerId)),o(n,e=>this.brakeTouch.delete(e)),a(r,()=>this.onHorn?.());for(let i of[e,t,n,r])i.addEventListener(`contextmenu`,e=>e.preventDefault())}read(){if(!this.enabled)return this.c.steer=0,this.c.gas=0,this.c.brake=0,this.c;let e=this.keys,t=0;(e.has(`arrowleft`)||e.has(`a`))&&--t,(e.has(`arrowright`)||e.has(`d`))&&(t+=1);for(let e of this.steerTouch.values())t+=e;return this.c.steer=Math.max(-1,Math.min(1,t)),this.c.gas=e.has(`arrowup`)||e.has(`w`)||this.gasTouch.size>0?1:0,this.c.brake=e.has(`arrowdown`)||e.has(`s`)||e.has(` `)||this.brakeTouch.size>0?1:0,this.c}get touching(){return this.steerTouch.size+this.gasTouch.size+this.brakeTouch.size>0}clear(){this.keys.clear(),this.steerTouch.clear(),this.gasTouch.clear(),this.brakeTouch.clear()}},Uh=Number(Me.get(`pr`))||0,Wh=e=>Uh||Math.min(window.devicePixelRatio||1,jf[e].prMax),Gh=!0,Kh=class{constructor(e){this.jobs=[],this.lastSettle={fines:0,bonus:0,total:0},this.timeScale=1,this.perf={work:[],gap:[]},this.hintLeft=0,this.gasHeld=0,this.uiT=0,this.saveT=0,this.mapT=0,this.moneyTarget=0,this.panel=null,this.pendingPops=new Set,this.perfHud=null,this.slowT=0,this.emaFrame=16.7,this.last=performance.now(),this.acc=0,this.input0=Af(),this.tmpV=new K,this.labelList=[],this.locked=new Set,this.lockedAt=-1,this.ms={x:0,z:0,h:0,route:null,routeIdx:0,dest:null,locked:this.locked},this.labelCache=new Map,this.geo=e.geo,this.profile=e.profile,this.settings=e.settings,this.profileStore=e.profileStore,this.settingsStore=e.settingsStore,this.profileStore.attach(this.profile),this.settingsStore.attach(this.settings),this.quality=e.quality,this.tier=this.quality===`low`?`low`:`high`,this.pr=Wh(this.tier),this.moneyTarget=this.profile.money;let t=this.geo;this.gate=t.gates[0];let n=t.landmark(`depotYard`),r=t.places[n.place];this.park={x:r.x+n.park[0],z:r.z+n.park[1],h:n.park[2]},this.ui=new uh(document.getElementById(`app`)),this.sim=new cp(t),this.sim.autopilot=Me.get(`bot`)===`1`,this.view=new ch(this.ui.canvas,t,e.meshes,this.sim,this.profile.levels,jf[this.tier].fogFar),this.view.rig.baseFocus.set(r.x+n.focus[0],n.focus[1],r.z+n.focus[2]),this.effects=new lp(this.view.particles,this.view.truck),this.view.base.setBuilding(this.profile.build?.id??null),this.view.truck.setLevel(this.profile.levels.garage),this.sim.truck.setLevel(this.profile.levels.garage);let i=this.gateIsOpen;this.view.world.setGateOpen(i,!0),this.sim.truck.gateLocked=!i,this.input=new Hh(this.ui.steer,this.ui.gas,this.ui.brake,this.ui.horn),this.input.onHorn=()=>{Ph(),Vh.horn()},this.ui.onAct=(e,t)=>this.act(e,t),this.mapInfo={frame:new fh(t.region.meta.map),places:t.placeList,lockedArea:t.region.meta.lockedArea,area:this.gate?.id??``,gateLevel:this.gate?.level??0};let a=hh(t,this.mapInfo.frame);this.minimap=new _h(this.ui.root,a,this.mapInfo),this.mapView=new vh(this.ui.root,a,this.mapInfo),this.mapView.onTake=e=>{let t=this.jobs[e];t&&this.mode===`base`&&(this.mapView.close(),this.startJob(t))},this.mapView.onClose=()=>{this.mode===`drive`&&!this.ui.panelOpen&&vt.portal.gameplayStart()},Me.get(`perf`)===`1`&&(this.perfHud=new kh(this.ui.root,{gaps:this.perf.gap,work:this.perf.work,info:()=>this.perfInfo()},this.view.renderer.getContext())),this.applyTier(!1);for(let e of[`pointerdown`,`keydown`])window.addEventListener(e,()=>Ph(),{capture:!0});vt.onChange(()=>this.ui.setMuted(vt.effectivelyMuted)),this.ui.setMuted(vt.effectivelyMuted),this.ui.setMoney(this.profile.money),this.refreshLevel(),this.jobs=Kf(t,this.profile),window.addEventListener(`resize`,()=>this.resize()),document.addEventListener(`visibilitychange`,()=>{document.hidden&&this.flush()}),window.addEventListener(`pagehide`,()=>this.flush()),this.resize()}get mode(){return this.sim.mode===`idle`?`base`:this.sim.mode}get job(){return this.sim.job}get route(){return this.sim.route}get routeIdx(){return this.sim.routeIdx}set routeIdx(e){this.sim.routeIdx=e}get truck(){return this.sim.truck}get rules(){return this.sim.rules}get rig(){return this.view.rig}get renderer(){return this.view.renderer}get autopilot(){return this.sim.autopilot}set autopilot(e){this.sim.autopilot=e}get gateIsOpen(){return If(this.profile,this.gate)}start(){let e=Ne();Lf(this.profile,e);let t=Rf(this.profile,e);t&&this.onBuilt(t,!1),this.profile.firstDone?this.enterBase(!0):this.startJob(Wf(this.geo,this.profile),!0),requestAnimationFrame(e=>this.frame(e))}resize(){let e=this.ui.canvas;this.view.resize(e.clientWidth||window.innerWidth,e.clientHeight||window.innerHeight,this.pr)}refreshLevel(){let e=Ff(this.profile);this.ui.setLevel(e),this.gate&&this.ui.setGateBar(e,this.gate.level,this.gateIsOpen,Te(this.gate.id))}persist(){this.profile.lastSeen=Ne(),this.profileStore.flush()}flush(){this.persist(),this.settingsStore.flush()}startJob(e,t=!1){let n=()=>{this.ui.closePanel(),this.panel=null,this.ui.mode(`drive`),this.ui.labels([]),this.mapView.close(),this.sim.startJob(e,this.profile.firstDone);let t=this.sim.route;this.view.truck.setCargo(e.kind,w[this.profile.levels.warehouse],e.seed),this.view.markers.setRoute(t),this.input.enabled=!0,this.input.clear(),this.view.rig.setMode(`chase`,this.sim.truck,!0),this.hintLeft=this.profile.firstDone?0:12,this.gasHeld=0,vt.portal.gameplayStart(),We.screen(`drive`)};t?n():this.ui.fade(n)}deliver(){let e=this.sim.job;if(!e)return;this.input.enabled=!1,this.ui.mode(`arrive`),this.ui.warn(``),this.ui.hint(!1),this.hintLeft=0;let t=this.profile,n=t.money,r=this.sim.rules.settle(e.pay),i=e.pay-r.fines+r.bonus;this.lastSettle={...r,total:i},t.money+=i,t.deliveries++,t.earned+=i;let a=!t.firstDone;t.firstDone=!0,t.jobSeed++,this.jobs=Kf(this.geo,t),this.persist(),Vh.airBrake(),Vh.delivered(),this.ui.big(r.bonus?R(`deliver.bigBonus`,{pay:z(i)}):R(`deliver.big`,{pay:z(i)})),this.payCoins(this.truckScreen(),n,i);let o=this.sim.truck;this.effects.confetti(o.x,o.y,o.z),this.view.rig.setMode(`orbit`,o),this.view.markers.hideZone(),vt.portal.gameplayStop(),vt.portal.happyTime(),We.screen(`delivered`),a&&We.event(`first_delivery`,{once:!0}),setTimeout(()=>{this.mode===`arrive`&&this.showDelivered(e)},1700)}truckScreen(){let e=this.sim.truck;return this.view.toScreen(this.tmpV.set(e.x,e.y+3,e.z))}payCoins(e,t,n){let r=u(Math.round(6+n/25),6,18);this.moneyTarget=t,this.ui.flyCoins(e.x,e.y,r,e=>{this.moneyTarget=Math.min(this.profile.money,t+Math.round(n*(e+1)/r)),Vh.coin(e),this.ui.bumpMoney()}),setTimeout(()=>this.moneyTarget=this.profile.money,2200)}onFine(e){let t=e.kind===`red`?R(`drive.fineRed`):e.kind===`speed`?R(`drive.fineSpeed`):R(`drive.fineHit`);this.ui.toast(R(`drive.fine`,{amount:z(e.amount),what:t}),`bad`),Vh.deny()}get roadArrows(){let e=this.settings.roadArrows;return e===`on`||e===`auto`&&this.profile.deliveries<3}showDelivered(e){let t=_[this.profile.levels.warehouse],n=g.some(e=>zf(this.profile,e)===null);this.panel={kind:`delivered`,arg:``};let r=vt.rewardedReady;r&&ct?.offer(),this.ui.panel(xh({cargo:e.cargo,to:e.to,total:this.lastSettle.total,pay:e.pay,mult:t,bonus:this.lastSettle.bonus,fines:this.lastSettle.fines,anyUpgrade:n,adOk:r}),!0)}enterBase(e=!1){let t=()=>{this.ui.closePanel(),this.panel=null,this.ui.mode(`base`),this.ui.warn(``),this.view.markers.clear(),this.sim.park(this.park.x,this.park.z,this.park.h),this.input.enabled=!1,this.view.rig.setMode(`base`,this.sim.truck,!0);for(let e of this.pendingPops)this.view.base.setLevel(e,this.profile.levels[e],!0);this.pendingPops.size&&Vh.levelUp(),this.pendingPops.clear(),this.gate&&this.gateIsOpen&&!this.profile.gatesSeen.includes(this.gate.id)&&this.announceGate(),vt.portal.gameplayStop(),We.screen(`base`)};e?t():this.ui.fade(t)}announceGate(){let e=this.gate;this.profile.gatesSeen.push(e.id),this.view.world.setGateOpen(!0),this.sim.truck.gateLocked=!1,this.jobs=Kf(this.geo,this.profile),this.ui.big(R(`area.openBig`,{area:Te(e.id).toLocaleUpperCase(ve())})),Vh.levelUp(),We.event(`ridge_open`,{once:!0}),this.persist()}act(e,t){switch(Ph(),Vh.click(),e){case`mute`:vt.toggleMute(),vt.muteForced||(this.settings.muted=vt.muted,this.settingsStore.flush());break;case`pause`:if(this.mode!==`drive`)break;this.panel={kind:`pause`,arg:``},vt.portal.gameplayStop(),this.ui.panel(Sh(this.sim.job));break;case`resume`:this.ui.closePanel(),this.panel=null,this.mode===`drive`&&vt.portal.gameplayStart();break;case`abandon`:this.enterBase();break;case`close`:this.ui.closePanel(),this.panel=null;break;case`jobs`:this.openJobs();break;case`take`:{let e=this.jobs[Number(t)];e&&this.startJob(e);break}case`locked`:Vh.deny(),this.gate&&this.ui.toast(R(`jobs.locked`,{n:this.gate.level,area:Te(this.gate.id)}));break;case`depot`:this.enterBase();break;case`double`:this.doublePay();break;case`building`:this.openBuilding(t);break;case`upgrade`:this.upgrade(t);break;case`rush`:this.rush();break;case`collect`:this.collectFuel();break;case`map`:this.openMap();break;case`settings`:this.openSettings();break;case`arrows`:this.settings.roadArrows=t,this.settingsStore.flush(),this.openSettings();break;case`lang`:this.setLanguage(t);break;case`privacy`:try{window.open(`privacy.html`,`_blank`,`noopener`)}catch{}break;case`quality`:{this.quality=t,Re(this.quality);let e=this.quality===`low`?`low`:`high`;(e!==this.tier||this.quality!==`auto`)&&(this.tier=e,this.applyTier(!1)),this.openSettings();break}}}async setLanguage(e){this.settings.lang=e,this.settingsStore.flush(),await je(e),this.ui.relabel(),this.ui.setMoney(this.moneyTarget),this.refreshLevel(),We.set({lang:e}),this.panel?.kind===`settings`&&this.openSettings()}openJobs(){this.panel={kind:`jobs`,arg:``};let e=new Set(Gf(this.geo,this.profile).map(e=>e.to)),t=this.jobs.map(e=>({to:e.to,cargo:e.cargo,pay:e.pay,dist:e.dist,fresh:!!this.geo.jobs.find(t=>t.to===e.to)?.gate})),n=this.geo.jobs.filter(t=>!e.has(t.to)).map(e=>({to:e.to,cargo:e.cargo[0].id,dist:Hf(this.geo,e.to),level:this.geo.gates.find(t=>t.id===e.gate)?.level??0}));this.ui.panel(wh(t,n))}openBuilding(e){this.panel={kind:`building`,arg:e},this.renderBuilding(e)}renderBuilding(e){let t=this.profile,n=t.build?.id===e?t.build:null;this.ui.panel(Th(e,t.levels[e],zf(t,e),n,Ne(),t.money,vt.rewardedReady))}upgrade(e){let t=this.profile;if(zf(t,e)!==null){Vh.deny();return}let n=t.levels[e]===0;Bf(t,e,Ne()),this.moneyTarget=t.money,this.ui.setMoney(t.money),this.view.base.setBuilding(e),Vh.hammer();let r=this.view.base.slots[e];this.effects.buildDust(r.x,this.view.base.y,r.z),this.ui.closePanel(),this.panel=null;let i=yh(e);this.ui.toast(R(n?`bld.started`:`bld.upgrading`,{name:i,t:B(t.build.total)}),`gold`),We.event(`first_build`,{once:!0}),this.persist()}async rush(){this.profile.build&&(await vt.showRewarded()&&this.profile.build?(this.profile.build.until=Ne(),this.checkBuild()):this.panel?.kind===`building`&&this.renderBuilding(this.panel.arg))}async doublePay(){if(!this.sim.job&&this.mode!==`arrive`)return;let e=document.querySelector(`[data-act="double"]`);e?.setAttribute(`disabled`,``);let t=await vt.showRewarded(),n=this.sim.job;if(t&&n){let t=this.profile.money,r=this.lastSettle.total||n.pay;this.profile.money+=r,this.profile.earned+=r,this.persist();let i=e?.getBoundingClientRect();this.payCoins(i?{x:i.left+i.width/2,y:i.top}:this.truckScreen(),t,r),this.ui.toast(R(`deliver.bonus`,{n:z(r)}),`good`)}else vt.rewardedReady||e?.remove()}collectFuel(){let e=this.profile,t=Math.floor(e.fuelStored);if(t<1)return;let n=e.money;e.money+=t,e.fuelStored-=t,e.earned+=t;let r=this.view.toScreen(this.view.base.anchor(`fuel`,e.levels.fuel,this.tmpV));this.payCoins(r,n,t),this.persist()}checkBuild(){let e=Rf(this.profile,Ne());e&&this.onBuilt(e,!0)}onBuilt(e,t){let n=this.profile.levels[e],r=this.view.base;if(r.setBuilding(null),this.mode===`base`||!t?r.setLevel(e,n,t):this.pendingPops.add(e),e===`garage`&&(this.view.truck.setLevel(n),this.sim.truck.setLevel(n)),t&&(Vh.levelUp(),this.ui.toast(R(`bld.ready`,{name:yh(e),n}),`good`),this.mode===`base`))for(let t=0;t<30;t++)this.effects.sparkle(r.slots[e].x,r.y+6,r.slots[e].z);this.jobs=this.mode===`drive`?this.jobs:Kf(this.geo,this.profile),this.refreshLevel(),this.gate&&this.gateIsOpen&&(this.sim.truck.gateLocked=!1,!this.profile.gatesSeen.includes(this.gate.id)&&this.mode===`base`&&t&&this.announceGate()),this.panel?.kind===`building`&&this.renderBuilding(this.panel.arg),this.persist()}frame(e){requestAnimationFrame(e=>this.frame(e));let t=e-this.last;if(this.last=e,vt.paused){Ih(0,0,!1),ct?.frame(e,!1);return}let n=Pe(),r=Math.min(.05,t/1e3);Math.abs(r-.016666666666666666)<.002&&(r=op);let i=r*this.timeScale,a=this.ui.panelOpen||this.mapView.isOpen;this.sim.frozen=a;let o=this.input.read(),s=this.input0;s.steer=o.steer,s.gas=o.gas,s.brake=o.brake,this.acc+=i;let c=5*Math.max(1,Math.ceil(this.timeScale)),l=0;for(;this.acc>=.016666666666666666&&l<c;)this.sim.tick(s),this.acc-=op,l++;l===c&&this.acc>.016666666666666666&&(this.acc=op*.5),this.handleEvents();let u=this.acc/op;this.update(i,u,a),this.view.draw(this.sim,u,i);let d=Pe()-n;this.perf.work.push(d),this.perf.gap.push(t),this.perf.work.length>2e4&&(this.perf.work.splice(0,1e4),this.perf.gap.splice(0,1e4)),this.adapt(t),ct?.frame(e,this.mode===`drive`&&!a)}handleEvents(){let e=this.sim.events;for(let t=0;t<e.length;t++){let n=e[t];if(n.type===`bump`){Vh.bump(n.power),this.view.rig.kick(n.power);for(let e=0;e<8;e++)this.effects.dust(this.sim.truck,1.5)}else n.type===`fine`?this.onFine(n.fine):n.type===`arrived`&&this.deliver()}e.length=0}adapt(e){if(Me.get(`noadapt`)===`1`||e>200)return;this.emaFrame+=(e-this.emaFrame)*.05;let t=this.quality===`auto`&&this.tier===`high`||this.pr>.75;this.emaFrame>24&&t?(this.slowT+=e/1e3,this.slowT>3&&(this.slowT=0,this.quality===`auto`&&this.tier===`high`?(this.tier=`low`,this.applyTier(!0),ct?.qualityDropped()):(this.pr=Math.max(.75,this.pr-.25),this.resize()))):this.slowT=0}applyTier(e){let t=jf[this.tier];this.view.world.setQuality(t.detail,t.water,t.view),this.view.life.enabled=t.life,this.sim.traffic.setActive(t.cars),this.view.setFogFar(t.fogFar),this.pr=Wh(this.tier),this.resize(),e&&this.ui.toast(R(`set.graphicsToast`,{tier:this.tier===`high`?R(`set.high`):R(`set.lowSmoother`)}))}perfInfo(){let e=this.view.renderer;return{mode:this.mode,quality:`${this.quality}/${this.tier}`,pixelRatio:e.getPixelRatio(),calls:e.info.render.calls,tris:e.info.render.triangles,buffer:`${e.domElement.width}x${e.domElement.height}`}}lockedPlaces(){let e=Ff(this.profile);if(e!==this.lockedAt){this.lockedAt=e;let t=new Set(Gf(this.geo,this.profile).map(e=>e.to));this.locked=new Set(this.geo.jobs.filter(e=>!t.has(e.to)).map(e=>e.to))}return this.locked}mapState(){let e=this.view.pose,t=this.ms;return t.x=e.x,t.z=e.z,t.h=e.h,t.route=this.mode===`drive`?this.sim.route:null,t.routeIdx=this.sim.routeIdx,t.dest=this.mode===`drive`&&this.sim.job?this.sim.job.to:null,t.locked=this.lockedPlaces(),t}openMap(){let e=this.mapState(),t,n=this.sim.job,r=this.sim.route;t=this.mode===`drive`&&n?[{to:n.to,cargo:we(n.cargo),pay:n.pay,dist:R(`map.toGo`,{dist:Ce(r?r.len-r.s[this.sim.routeIdx]:n.dist)}),index:-1}]:this.jobs.map((e,t)=>({to:e.to,cargo:we(e.cargo),pay:e.pay,dist:Ce(e.dist),index:t})),this.mode===`drive`&&vt.portal.gameplayStop(),this.ui.closePanel(),this.panel=null,this.mapView.open(e,t,this.mode===`base`),We.screen(`map`)}openSettings(){this.panel={kind:`settings`,arg:``},this.ui.panel(Dh({quality:this.quality,tier:this.tier,arrows:this.settings.roadArrows,lang:ve(),driving:this.mode===`drive`,privacy:Gh}))}update(e,t,n){if(this.saveT+=e,this.saveT>1){this.saveT=0;let e=this.profile.fuelStored;Lf(this.profile,Ne()),this.checkBuild(),this.profile.lastSeen=Ne(),this.profile.fuelStored!==e&&this.profileStore.markDirty(),this.profileStore.tick(),this.settingsStore.tick()}this.panel?.kind===`building`&&this.profile.build?.id===this.panel.arg&&(this.uiT+=e,this.uiT>.5&&(this.uiT=0,this.renderBuilding(this.panel.arg))),this.view.updatePose(this.sim,t),this.mode===`drive`&&!n?this.updateDrive(e):this.mode===`arrive`?Ih(Math.abs(this.sim.truck.speed)/this.sim.truck.vmax,0,!0):Ih(0,0,this.mode===`drive`),this.mode===`base`&&this.updateBase(),this.mapT+=e,this.mode===`drive`&&this.mapT>.075&&(this.minimap.draw(this.mapState(),this.mapT),this.mapT=0),this.perfHud?.update(e),this.ui.tickMoney(this.moneyTarget,e)}updateDrive(e){let t=this.sim,n=t.route,r=t.truck,i=t.applied,a=t.routeIdx,o=n.n-1,s=Math.min(o,a+6),c=t.offRoute>.6||t.wrongWay;this.view.markers.drive(a,this.roadArrows,c,this.view.pose,n.x[s],n.z[s]);let l=Math.abs(r.speed);Ih(l/r.vmax,i.gas,!0),this.effects.drive(e,r,i.gas,jf[this.tier].particles);let u=t.rules.aheadState(r.x,r.z,r.h),d=l*3.6,f=this.geo.speedZone;t.rules.inZone&&f&&!this.profile.rulesSeen&&(this.profile.rulesSeen=!0,this.ui.big(R(`drive.townZone`,{n:f.kmh})),this.persist());let p=this.ui.root.querySelector(`[data-el="warn"]`);t.toEnd<40||t.left<45?(this.ui.warn(l>2.5?R(`drive.brakeZone`):``),p?.classList.add(`go`)):u&&u.light!==`green`&&u.dist<60&&l>.8?(p?.classList.remove(`go`),this.ui.warn(u.light===`red`?R(`drive.redLight`):R(`drive.yellow`))):t.rules.inZone&&f&&d>f.kmh+4?(p?.classList.remove(`go`),this.ui.warn(R(`drive.slowZone`,{n:f.kmh}))):t.offRoute>1.2?(p?.classList.remove(`go`),this.ui.warn(R(`drive.offRoute`))):t.wrongWay?(p?.classList.remove(`go`),this.ui.warn(R(`drive.wrongWay`))):this.ui.warn(``),this.hintLeft>0?(i.gas&&(this.gasHeld+=e),(this.gasHeld>1.5||this.input.touching)&&(this.hintLeft-=e*(this.gasHeld>1.5?3:1)),this.gasHeld>3&&(this.hintLeft=0),this.ui.hint(this.hintLeft>0)):this.ui.hint(!1),this.uiT+=e;let m=t.job;if(this.uiT>.12&&m){this.uiT=0;let e=t.turns.find(e=>e.i>=a-2),r=e?n.s[e.i]-n.s[a]:1/0,i=z(m.pay),o=V(m.to),s=we(m.cargo);if(e&&r<450){let a=e.icon===`round`?R(`drive.roundabout`,{ord:R(`drive.ord${Math.min(4,e.exit)}`)}):e.icon===`left`?R(`drive.bendLeft`):R(`drive.bendRight`);this.ui.nav(e.icon,a,Ce(Math.max(0,r)),R(`drive.info`,{dest:o,dist:Ce(t.left),cargo:s,pay:i}),1-t.left/n.len)}else this.ui.nav(`straight`,R(`drive.follow`),Ce(t.left),R(`drive.infoShort`,{dest:o,cargo:s,pay:i}),1-t.left/n.len);this.ui.speed(l*3.6)}}label(e,t,n){let r=this.labelCache.get(e);return r||this.labelCache.set(e,r={key:``,label:{id:e,x:0,y:0,visible:!0,html:``,cls:``}}),r.key!==t&&(r.key=t,r.label.html=n()),r.label}updateBase(){let e=this.profile,t=this.view.base,n=this.labelList;n.length=0;let r=Ne(),i=!this.ui.panelOpen,a=ve();for(let o of g){let s=e.levels[o],c=this.view.toScreen(t.anchor(o,s,this.tmpV)),l=e.build?.id===o?e.build:null,d=!l&&s<4&&zf(e,o)===null,f=l?`${s}|${Math.ceil((l.until-r)/1e3)}|${Math.round(u(1-(l.until-r)/1e3/l.total,0,1)*100)}|${a}`:`${s}|${a}`,p=this.label(`b:`+o,f,()=>Eh(o,s,l,r).html);p.x=c.x,p.y=c.y,p.visible=i,p.cls=l?`busy`:d?`can`:``,n.push(p)}if(e.levels.fuel>0&&e.fuelStored>=1&&e.build?.id!==`fuel`){let r=t.slots.fuel,o=this.view.toScreen(this.tmpV.set(r.x+14,t.y+9,r.z)),s=Math.floor(e.fuelStored),c=this.label(`collect`,`${s}|${a}`,()=>z(s));c.x=o.x,c.y=o.y,c.visible=i,c.cls=`collect`,n.push(c)}this.ui.labels(n)}};async function qh(e,t){if(Me.get(`worker`)!==`0`&&typeof Worker<`u`)try{return await new Promise((t,n)=>{let r=new Worker(new URL(``+new URL(`worldgen.worker-D7GewG0x.js`,import.meta.url).href,``+import.meta.url),{type:`module`}),i=setTimeout(()=>{r.terminate(),n(Error(`world generation took too long`))},3e4);r.onmessage=e=>{clearTimeout(i),r.terminate(),e.data.error?n(Error(e.data.error)):t({chunks:e.data.chunks,details:e.data.details,ms:e.data.ms,where:`worker`})},r.onerror=e=>{clearTimeout(i),r.terminate(),n(Error(e.message||`worker failed`))};let a=e.slice().buffer;r.postMessage({id:1,bytes:a},[a])})}catch(e){console.warn(`[truckstead] world worker failed, building on the main thread`,e)}let n=performance.now(),{generateWorld:r}=await I(async()=>{let{generateWorld:e}=await import(`./world-C2kQW-3q.js`);return{generateWorld:e}},[],import.meta.url);return{...r(t),ms:performance.now()-n,where:`main`}}async function Jh(){try{let t=new FontFace(`Lilita One`,`url(${e}) format("woff2")`,{weight:`400`});document.fonts.add(t),await Promise.race([t.load(),new Promise(e=>setTimeout(e,2500))])}catch{}}async function Yh(){let e=Ne(),t=vt.portal,n=new wt(t,T,Ne),r=new wt(t,E,Ne),i=Me.get(`fresh`)===`1`,a=i?void 0:await n.load(),o=i?void 0:await r.load(),s=!1;if(!i&&a==null){let n=await t.load(D).catch(()=>void 0);if(n&&typeof n==`object`&&(wt.backup(T,n),a=n,s=!0,o==null)){let r=await t.load(O).catch(()=>void 0);o={...te(n,e).settings,...typeof r==`boolean`?{muted:r}:{}}}}let c=re(a,e);c.gameVersion=Be;let l=ie(o);return n.attach(c),r.attach(l),s&&(n.flush(),r.flush()),{profile:c,settings:l,profileStore:n,settingsStore:r}}async function Xh(){Ze(()=>`boot`);let e=Jh(),n=yt(t);await vt.init();let r=await Yh();vt.setMuted(r.settings.muted);let i=null;try{i=vt.portal.name===`local`?null:vt.portal.getLanguage()}catch{i=null}await je(ke(r.settings.lang,i));let a=performance.now(),o=await n,s=new h(c(o)),l=qh(o,s);await e;let u=await l;ct?.regionLoaded((performance.now()-a)/1e3),await new Promise(e=>setTimeout(e,30));let d=new Kh({geo:s,meshes:u,...r,quality:Le()}),f=performance.now()-a;document.getElementById(`loading`)?.remove(),vt.portal.loadingFinished(!0),d.start(),Ze(()=>d.mode),window.__demo={game:d,buildMs:f,worldMs:u.ms,worldWhere:u.where,services:vt,get state(){let e=d,t=e.renderer;return{mode:e.mode,money:e.profile.money,levels:{...e.profile.levels},build:e.profile.build,deliveries:e.profile.deliveries,routeLeft:e.route&&e.mode===`drive`?e.route.len-e.route.s[e.routeIdx]:null,speed:e.truck.speed,pos:[e.truck.x,e.truck.z],pr:t.getPixelRatio(),calls:t.info.render.calls,tris:t.info.render.triangles,lang:document.documentElement.lang,paused:vt.paused,silent:vt.silent,ticks:e.sim.ticks}},set autopilot(e){d.autopilot=e},set timeScale(e){d.timeScale=e},openMap:()=>d.openMap(),padY:s.padHeight(`depot`)}}Xh().catch(e=>{console.error(e);let t=document.getElementById(`loading`);t&&(t.textContent=R(`load.fail`,{msg:e instanceof Error?e.message:String(e)}))});export{Kp as A,Qf as B,Bp as C,Gp as D,tm as E,Q as F,ut as G,Pf as H,Z as I,u as K,_p as L,lm as M,kp as N,Jp as O,Fp as P,dp as R,bm as S,rm as T,Nf as U,Zf as V,lt as W,Wp as _,hm as a,nm as b,$p as c,am as d,sm as f,Yp as g,dm as h,om as i,ym as j,mm as k,_m as l,gm as m,qp as n,Hp as o,Xp as p,l as q,pm as r,xm as s,cm as t,em as u,fm as v,Up as w,im as x,Vp as y,hp as z};