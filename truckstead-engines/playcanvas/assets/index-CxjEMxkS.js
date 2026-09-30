(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`2.22.6`,t=`dfcc50f`;function n(e,t){for(let r in t){let i=t[r];e[r]=Array.isArray(i)?n([],i):i&&typeof i==`object`?n({},i):i}return e}var r={create(){return`xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g,e=>{let t=Math.random()*16|0;return(e===`x`?t:t&3|8).toString(16)})}},i={delimiter:`/`,join(...e){let t=e[0];for(let n=0;n<e.length-1;n++){let r=e[n],a=e[n+1];if(a[0]===i.delimiter){t=a;continue}r&&a&&r[r.length-1]!==i.delimiter&&a[0]!==i.delimiter?t+=i.delimiter+a:t+=a}return t},normalize(e){let t=e.startsWith(i.delimiter),n=e.endsWith(i.delimiter),r=e.split(`/`),a=``,o=[];for(let e=0;e<r.length;e++)if(r[e]!==``&&r[e]!==`.`){if(r[e]===`..`&&o.length>0){o=o.slice(0,o.length-2);continue}e>0&&o.push(i.delimiter),o.push(r[e])}return a=o.join(``),!t&&a[0]===i.delimiter&&(a=a.slice(1)),n&&a[a.length-1]!==i.delimiter&&(a+=i.delimiter),a},split(e){let t=e.lastIndexOf(i.delimiter);return t===-1?[``,e]:[e.substring(0,t),e.substring(t+1)]},getBasename(e){return i.split(e)[1]},getDirectory(e){return i.split(e)[0]},getExtension(e){let t=e.split(`?`)[0].split(`.`).pop();return t===e?``:`.${t}`},isRelativePath(e){return e.charAt(0)!==`/`&&e.match(/:\/\//)===null},extractPath(e){let t=``,n=e.split(`/`),r=0;if(n.length>1){if(i.isRelativePath(e)){if(n[0]===`.`)for(r=0;r<n.length-1;++r)t+=r===0?n[r]:`/${n[r]}`;else if(n[0]===`..`)for(r=0;r<n.length-1;++r)t+=r===0?n[r]:`/${n[r]}`;else for(t=`.`,r=0;r<n.length-1;++r)t+=`/${n[r]}`}else for(r=0;r<n.length-1;++r)t+=r===0?n[r]:`/${n[r]}`}return t}},a=typeof navigator<`u`?navigator.userAgent:``,o=typeof window<`u`?`browser`:typeof global<`u`?`node`:`worker`,s=/android/i.test(a)?`android`:/ip(?:[ao]d|hone)/i.test(a)?`ios`:/windows/i.test(a)?`windows`:/mac os/i.test(a)?`osx`:/linux/i.test(a)?`linux`:/cros/i.test(a)?`cros`:null,c=o===`browser`?/Chrome\/|Chromium\/|Edg.*\//.test(a)?`chrome`:/Safari\//.test(a)?`safari`:/Firefox\//.test(a)?`firefox`:`other`:null,l=/xbox/i.test(a),u=/Macintosh/i.test(a)&&typeof navigator<`u`&&navigator.maxTouchPoints>0&&!/iPhone|iPad|iPod/i.test(a),d=o===`browser`&&(`ontouchstart`in window||`maxTouchPoints`in navigator&&navigator.maxTouchPoints>0),f=o===`browser`&&(!!navigator.getGamepads||!!navigator.webkitGetGamepads),p=typeof Worker<`u`,m={name:s,environment:o,global:(typeof globalThis<`u`&&globalThis)??(o===`browser`&&window)??(o===`node`&&global)??(o===`worker`&&self),browser:o===`browser`,worker:o===`worker`,desktop:[`windows`,`osx`,`linux`,`cros`].includes(s),mobile:[`android`,`ios`].includes(s),ios:s===`ios`,android:s===`android`,visionos:u,xbox:l,gamepads:f,touch:d,workers:p,browserName:c};function h(e){"@babel/helpers - typeof";return h=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},h(e)}function g(e,t){if(h(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(h(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function _(e){var t=g(e,`string`);return h(t)==`symbol`?t:t+``}function v(e,t,n){return(t=_(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var y=class{constructor(e,t,n,r,i=!1){v(this,`handler`,void 0),v(this,`name`,void 0),v(this,`callback`,void 0),v(this,`scope`,void 0),v(this,`_once`,void 0),v(this,`_removed`,!1),this.handler=e,this.name=t,this.callback=n,this.scope=r,this._once=i}off(){this._removed||this.handler.offByHandle(this)}on(e,t,n=this){return this.handler._addCallback(e,t,n,!1)}once(e,t,n=this){return this.handler._addCallback(e,t,n,!0)}set removed(e){e&&(this._removed=!0)}get removed(){return this._removed}toJSON(e){}},b=class{constructor(){v(this,`_callbacks`,new Map),v(this,`_callbackActive`,new Map)}initEventHandler(){this._callbacks=new Map,this._callbackActive=new Map}_addCallback(e,t,n,r){if(this._callbacks.has(e)||this._callbacks.set(e,[]),this._callbackActive.has(e)){let t=this._callbackActive.get(e);t&&t===this._callbacks.get(e)&&this._callbackActive.set(e,t.slice())}let i=new y(this,e,t,n,r);return this._callbacks.get(e).push(i),i}on(e,t,n=this){return this._addCallback(e,t,n,!1)}once(e,t,n=this){return this._addCallback(e,t,n,!0)}off(e,t,n){if(e)this._callbackActive.has(e)&&this._callbackActive.get(e)===this._callbacks.get(e)&&this._callbackActive.set(e,this._callbackActive.get(e).slice());else for(let[e,t]of this._callbackActive)this._callbacks.has(e)&&this._callbacks.get(e)===t&&this._callbackActive.set(e,t.slice());if(!e){for(let e of this._callbacks.values())for(let t=0;t<e.length;t++)e[t].removed=!0;this._callbacks.clear()}else if(t){let r=this._callbacks.get(e);if(!r)return this;for(let e=0;e<r.length;e++)r[e].callback===t&&(n&&r[e].scope!==n||(r[e].removed=!0,r.splice(e,1),e--));r.length===0&&this._callbacks.delete(e)}else{let t=this._callbacks.get(e);if(t){for(let e=0;e<t.length;e++)t[e].removed=!0;this._callbacks.delete(e)}}return this}offByHandle(e){let t=e.name;e.removed=!0,this._callbackActive.has(t)&&this._callbackActive.get(t)===this._callbacks.get(t)&&this._callbackActive.set(t,this._callbackActive.get(t).slice());let n=this._callbacks.get(t);if(!n)return this;let r=n.indexOf(e);return r!==-1&&(n.splice(r,1),n.length===0&&this._callbacks.delete(t)),this}fire(e,t,n,r,i,a,o,s,c){if(!e)return this;let l=this._callbacks.get(e);if(!l)return this;let u;this._callbackActive.has(e)?this._callbackActive.get(e)!==l&&(u=l.slice()):this._callbackActive.set(e,l);for(let l=0;(u||this._callbackActive.get(e))&&l<(u||this._callbackActive.get(e)).length;l++){let d=(u||this._callbackActive.get(e))[l];if(d.callback&&(d.callback.call(d.scope,t,n,r,i,a,o,s,c),d._once)){let t=this._callbacks.get(e),n=t?t.indexOf(d):-1;if(n!==-1){this._callbackActive.get(e)===t&&this._callbackActive.set(e,this._callbackActive.get(e).slice());let r=this._callbacks.get(e);if(!r)continue;r[n].removed=!0,r.splice(n,1),r.length===0&&this._callbacks.delete(e)}}}return u||this._callbackActive.delete(e),this}hasEvent(e){return!!this._callbacks.get(e)?.length}},x=class extends b{constructor(e){super(),v(this,`_index`,{}),v(this,`_list`,[]),v(this,`_parent`,void 0),this._parent=e}add(...e){let t=!1,n=this._processArguments(e,!0);if(!n.length)return t;for(let e=0;e<n.length;e++)this._index[n[e]]||(t=!0,this._index[n[e]]=!0,this._list.push(n[e]),this.fire(`add`,n[e],this._parent));return t&&this.fire(`change`,this._parent),t}remove(...e){let t=!1;if(!this._list.length)return t;let n=this._processArguments(e,!0);if(!n.length)return t;for(let e=0;e<n.length;e++)this._index[n[e]]&&(t=!0,delete this._index[n[e]],this._list.splice(this._list.indexOf(n[e]),1),this.fire(`remove`,n[e],this._parent));return t&&this.fire(`change`,this._parent),t}clear(){if(!this._list.length)return;let e=this._list.slice(0);this._list=[],this._index={};for(let t=0;t<e.length;t++)this.fire(`remove`,e[t],this._parent);this.fire(`change`,this._parent)}has(...e){return this._list.length?this._has(this._processArguments(e)):!1}_has(e){if(!this._list.length||!e.length)return!1;for(let t=0;t<e.length;t++)if(e[t].length===1){if(this._index[e[t][0]])return!0}else{let n=!0;for(let r=0;r<e[t].length;r++)if(!this._index[e[t][r]]){n=!1;break}if(n)return!0}return!1}list(){return this._list.slice(0)}_processArguments(e,t){let n=[],r=[];if(!e||!e.length)return n;for(let i=0;i<e.length;i++)if(e[i]instanceof Array){t||(r=[]);for(let a=0;a<e[i].length;a++)typeof e[i][a]==`string`&&(t?n.push(e[i][a]):r.push(e[i][a]));!t&&r.length&&n.push(r)}else typeof e[i]==`string`&&(t?n.push(e[i]):n.push([e[i]]));return n}get size(){return this._list.length}};v(x,`EVENT_ADD`,`add`),v(x,`EVENT_REMOVE`,`remove`),v(x,`EVENT_CHANGE`,`change`);var S=typeof window<`u`&&window.performance&&window.performance.now?performance.now.bind(performance):Date.now,C=/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,w=class{constructor(e){v(this,`scheme`,void 0),v(this,`authority`,void 0),v(this,`path`,void 0),v(this,`query`,void 0),v(this,`fragment`,void 0);let t=e.match(C);this.scheme=t[2],this.authority=t[4],this.path=t[5],this.query=t[7],this.fragment=t[9]}toString(){let e=``;return this.scheme&&(e+=`${this.scheme}:`),this.authority&&(e+=`//${this.authority}`),e+=this.path,this.query&&(e+=`?${this.query}`),this.fragment&&(e+=`#${this.fragment}`),e}getQuery(){let e={};if(this.query){let t=decodeURIComponent(this.query).split(`&`);for(let n of t){let t=n.split(`=`);e[t[0]]=t[1]}}return e}setQuery(e){let t=``;for(let n in e)e.hasOwnProperty(n)&&(t!==``&&(t+=`&`),t+=`${encodeURIComponent(n)}=${encodeURIComponent(e[n])}`);this.query=t}},T=class e{static set(e,t=!0){}static get(t){return e._traceChannels.has(t)}};v(T,`_traceChannels`,new Set),v(T,`stack`,!1);var E={DEG_TO_RAD:Math.PI/180,RAD_TO_DEG:180/Math.PI,clamp(e,t,n){return e>=n?n:e<=t?t:e},intToBytes24(e){return[e>>16&255,e>>8&255,e&255]},intToBytes32(e){return[e>>24&255,e>>16&255,e>>8&255,e&255]},bytesToInt24(e,t,n){return e.length&&(n=e[2],t=e[1],e=e[0]),e<<16|t<<8|n},bytesToInt32(e,t,n,r){return e.length&&(r=e[3],n=e[2],t=e[1],e=e[0]),(e<<24|t<<16|n<<8|r)>>>0},lerp(e,t,n){return e+(t-e)*E.clamp(n,0,1)},lerpUnclamped(e,t,n){return e+(t-e)*n},lerpAngle(e,t,n){return t-e>180&&(t-=360),t-e<-180&&(t+=360),E.lerp(e,t,E.clamp(n,0,1))},powerOfTwo(e){return e!==0&&!(e&e-1)},nextPowerOfTwo(e){return e--,e|=e>>1,e|=e>>2,e|=e>>4,e|=e>>8,e|=e>>16,e++,e},nearestPowerOfTwo(e){return 2**Math.round(Math.log2(e))},random(e,t){let n=t-e;return Math.random()*n+e},smoothstep(e,t,n){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))},smootherstep(e,t,n){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))},roundUp(e,t){return t===0?e:Math.ceil(e/t)*t},between(e,t,n,r){let i=Math.min(t,n),a=Math.max(t,n);return r?e>=i&&e<=a:e>i&&e<a}},D,O=class{constructor(e=0,t=0,n=0,r=1){v(this,`r`,void 0),v(this,`g`,void 0),v(this,`b`,void 0),v(this,`a`,void 0);let i=e.length;i===3||i===4?(this.r=e[0],this.g=e[1],this.b=e[2],this.a=e[3]??1):(this.r=e,this.g=t,this.b=n,this.a=r)}clone(){let e=this.constructor;return new e(this.r,this.g,this.b,this.a)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this.a=e.a,this}equals(e){return this.r===e.r&&this.g===e.g&&this.b===e.b&&this.a===e.a}set(e,t,n,r=1){return this.r=e,this.g=t,this.b=n,this.a=r,this}lerp(e,t,n){return this.r=e.r+n*(t.r-e.r),this.g=e.g+n*(t.g-e.g),this.b=e.b+n*(t.b-e.b),this.a=e.a+n*(t.a-e.a),this}linear(e=this){return this.r=e.r**2.2,this.g=e.g**2.2,this.b=e.b**2.2,this.a=e.a,this}gamma(e=this){return this.r=e.r**(1/2.2),this.g=e.g**(1/2.2),this.b=e.b**(1/2.2),this.a=e.a,this}mulScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}fromString(e){let t=parseInt(e.replace(`#`,`0x`),16),n;return e.length>7?n=E.intToBytes32(t):(n=E.intToBytes24(t),n[3]=255),this.set(n[0]/255,n[1]/255,n[2]/255,n[3]/255),this}fromArray(e,t=0){return this.r=e[t]??this.r,this.g=e[t+1]??this.g,this.b=e[t+2]??this.b,this.a=e[t+3]??this.a,this}toString(e,t){let{r:n,g:r,b:i,a}=this;if(t||n>1||r>1||i>1)return`${n.toFixed(3)}, ${r.toFixed(3)}, ${i.toFixed(3)}, ${a.toFixed(3)}`;let o=`#${((1<<24)+(Math.round(n*255)<<16)+(Math.round(r*255)<<8)+Math.round(i*255)).toString(16).slice(1)}`;if(e===!0){let e=Math.round(a*255).toString(16);this.a<16/255?o+=`0${e}`:o+=e}return o}toArray(e=[],t=0,n=!0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,n&&(e[t+3]=this.a),e}};D=O,v(O,`BLACK`,Object.freeze(new D(0,0,0,1))),v(O,`BLUE`,Object.freeze(new D(0,0,1,1))),v(O,`CYAN`,Object.freeze(new D(0,1,1,1))),v(O,`GRAY`,Object.freeze(new D(.5,.5,.5,1))),v(O,`GREEN`,Object.freeze(new D(0,1,0,1))),v(O,`MAGENTA`,Object.freeze(new D(1,0,1,1))),v(O,`RED`,Object.freeze(new D(1,0,0,1))),v(O,`WHITE`,Object.freeze(new D(1,1,1,1))),v(O,`YELLOW`,Object.freeze(new D(1,1,0,1)));var ee=new Float32Array(1),te=new Int32Array(ee.buffer),ne=class{static float2Half(e){ee[0]=e;let t=te[0],n=t>>16&32768,r=t>>12&2047,i=t>>23&255;return i<103?n:i>142?(n|=31744,n|=(i===255?0:1)&&t&8388607,n):i<113?(r|=2048,n|=(r>>114-i)+(r>>113-i&1),n):(n|=i-112<<10|r>>1,n+=r&1,n)}static float2RGBA8(e,t){ee[0]=e;let n=te[0];t.r=(n>>24&255)/255,t.g=(n>>16&255)/255,t.b=(n>>8&255)/255,t.a=(n&255)/255}},re,k=class{constructor(e=0,t=0,n=0){v(this,`x`,void 0),v(this,`y`,void 0),v(this,`z`,void 0),e.length===3?(this.x=e[0],this.y=e[1],this.z=e[2]):(this.x=e,this.y=t,this.z=n)}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}add2(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addScaled(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}clone(){let e=this.constructor;return new e(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}cross(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-o*i,this.y=i*a-s*n,this.z=n*o-a*r,this}distance(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return Math.sqrt(t*t+n*n+r*r)}div(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}div2(e,t){return this.x=e.x/t.x,this.y=e.y/t.y,this.z=e.z/t.z,this}divScalar(e){return this.x/=e,this.y/=e,this.z/=e,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}equals(e){return this.x===e.x&&this.y===e.y&&this.z===e.z}equalsApprox(e,t=1e-6){return Math.abs(this.x-e.x)<t&&Math.abs(this.y-e.y)<t&&Math.abs(this.z-e.z)<t}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}lerp(e,t,n){return this.x=e.x+n*(t.x-e.x),this.y=e.y+n*(t.y-e.y),this.z=e.z+n*(t.z-e.z),this}mul(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}mul2(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}mulScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}scale(e){return this.mulScalar(e)}normalize(e=this){let t=e.x*e.x+e.y*e.y+e.z*e.z;if(t>0){let n=1/Math.sqrt(t);this.x=e.x*n,this.y=e.y*n,this.z=e.z*n}return this}floor(e=this){return this.x=Math.floor(e.x),this.y=Math.floor(e.y),this.z=Math.floor(e.z),this}ceil(e=this){return this.x=Math.ceil(e.x),this.y=Math.ceil(e.y),this.z=Math.ceil(e.z),this}round(e=this){return this.x=Math.round(e.x),this.y=Math.round(e.y),this.z=Math.round(e.z),this}min(e){return e.x<this.x&&(this.x=e.x),e.y<this.y&&(this.y=e.y),e.z<this.z&&(this.z=e.z),this}max(e){return e.x>this.x&&(this.x=e.x),e.y>this.y&&(this.y=e.y),e.z>this.z&&(this.z=e.z),this}project(e){let t=(this.x*e.x+this.y*e.y+this.z*e.z)/(e.x*e.x+e.y*e.y+e.z*e.z);return this.x=e.x*t,this.y=e.y*t,this.z=e.z*t,this}set(e,t,n){return this.x=e,this.y=t,this.z=n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}sub2(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}fromArray(e,t=0){return this.x=e[t]??this.x,this.y=e[t+1]??this.y,this.z=e[t+2]??this.z,this}toString(){return`[${this.x}, ${this.y}, ${this.z}]`}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}};re=k,v(k,`ZERO`,Object.freeze(new re(0,0,0))),v(k,`HALF`,Object.freeze(new re(.5,.5,.5))),v(k,`ONE`,Object.freeze(new re(1,1,1))),v(k,`UP`,Object.freeze(new re(0,1,0))),v(k,`DOWN`,Object.freeze(new re(0,-1,0))),v(k,`RIGHT`,Object.freeze(new re(1,0,0))),v(k,`LEFT`,Object.freeze(new re(-1,0,0))),v(k,`FORWARD`,Object.freeze(new re(0,0,-1))),v(k,`BACK`,Object.freeze(new re(0,0,1)));var ie,ae=class{constructor(){v(this,`data`,new Float32Array(9)),this.data[0]=this.data[4]=this.data[8]=1}clone(){let e=this.constructor;return new e().copy(this)}copy(e){let t=e.data,n=this.data;return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],this}set(e){let t=this.data;return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],this}getX(e=new k){return e.set(this.data[0],this.data[1],this.data[2])}getY(e=new k){return e.set(this.data[3],this.data[4],this.data[5])}getZ(e=new k){return e.set(this.data[6],this.data[7],this.data[8])}equals(e){let t=this.data,n=e.data;return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]&&t[8]===n[8]}isIdentity(){let e=this.data;return e[0]===1&&e[1]===0&&e[2]===0&&e[3]===0&&e[4]===1&&e[5]===0&&e[6]===0&&e[7]===0&&e[8]===1}setIdentity(){let e=this.data;return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1,this}toString(){return`[${this.data.join(`, `)}]`}transpose(e=this){let t=e.data,n=this.data;if(t===n){let e;e=t[1],n[1]=t[3],n[3]=e,e=t[2],n[2]=t[6],n[6]=e,e=t[5],n[5]=t[7],n[7]=e}else n[0]=t[0],n[1]=t[3],n[2]=t[6],n[3]=t[1],n[4]=t[4],n[5]=t[7],n[6]=t[2],n[7]=t[5],n[8]=t[8];return this}setFromMat4(e){let t=e.data,n=this.data;return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[4],n[4]=t[5],n[5]=t[6],n[6]=t[8],n[7]=t[9],n[8]=t[10],this}setFromQuat(e){let t=e.x,n=e.y,r=e.z,i=e.w,a=t+t,o=n+n,s=r+r,c=t*a,l=t*o,u=t*s,d=n*o,f=n*s,p=r*s,m=i*a,h=i*o,g=i*s,_=this.data;return _[0]=1-(d+p),_[1]=l+g,_[2]=u-h,_[3]=l-g,_[4]=1-(c+p),_[5]=f+m,_[6]=u+h,_[7]=f-m,_[8]=1-(c+d),this}invertMat4(e){let t=e.data,n=t[0],r=t[1],i=t[2],a=t[4],o=t[5],s=t[6],c=t[8],l=t[9],u=t[10],d=u*o-s*l,f=-u*r+i*l,p=s*r-i*o,m=-u*a+s*c,h=u*n-i*c,g=-s*n+i*a,_=l*a-o*c,v=-l*n+r*c,y=o*n-r*a,b=n*d+r*m+i*_;if(b===0)this.setIdentity();else{let e=1/b,t=this.data;t[0]=d*e,t[1]=f*e,t[2]=p*e,t[3]=m*e,t[4]=h*e,t[5]=g*e,t[6]=_*e,t[7]=v*e,t[8]=y*e}return this}transformVector(e,t=new k){let n=this.data,{x:r,y:i,z:a}=e;return t.x=r*n[0]+i*n[3]+a*n[6],t.y=r*n[1]+i*n[4]+a*n[7],t.z=r*n[2]+i*n[5]+a*n[8],t}};ie=ae,v(ae,`IDENTITY`,Object.freeze(new ie)),v(ae,`ZERO`,Object.freeze(new ie().set([0,0,0,0,0,0,0,0,0])));var oe,A=class{constructor(e=0,t=0){v(this,`x`,void 0),v(this,`y`,void 0),e.length===2?(this.x=e[0],this.y=e[1]):(this.x=e,this.y=t)}add(e){return this.x+=e.x,this.y+=e.y,this}add2(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addScaled(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}clone(){let e=this.constructor;return new e(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}cross(e){return this.x*e.y-this.y*e.x}distance(e){let t=this.x-e.x,n=this.y-e.y;return Math.sqrt(t*t+n*n)}div(e){return this.x/=e.x,this.y/=e.y,this}div2(e,t){return this.x=e.x/t.x,this.y=e.y/t.y,this}divScalar(e){return this.x/=e,this.y/=e,this}dot(e){return this.x*e.x+this.y*e.y}equals(e){return this.x===e.x&&this.y===e.y}equalsApprox(e,t=1e-6){return Math.abs(this.x-e.x)<t&&Math.abs(this.y-e.y)<t}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}lengthSq(){return this.x*this.x+this.y*this.y}lerp(e,t,n){return this.x=e.x+n*(t.x-e.x),this.y=e.y+n*(t.y-e.y),this}mul(e){return this.x*=e.x,this.y*=e.y,this}mul2(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this}mulScalar(e){return this.x*=e,this.y*=e,this}scale(e){return this.mulScalar(e)}normalize(e=this){let t=e.x*e.x+e.y*e.y;if(t>0){let n=1/Math.sqrt(t);this.x=e.x*n,this.y=e.y*n}return this}rotate(e){let t=Math.atan2(this.x,this.y)+e*E.DEG_TO_RAD,n=Math.sqrt(this.x*this.x+this.y*this.y);return this.x=Math.sin(t)*n,this.y=Math.cos(t)*n,this}angle(){return Math.atan2(this.x,this.y)*E.RAD_TO_DEG}angleTo(e){return Math.atan2(this.x*e.y+this.y*e.x,this.x*e.x+this.y*e.y)*E.RAD_TO_DEG}floor(e=this){return this.x=Math.floor(e.x),this.y=Math.floor(e.y),this}ceil(e=this){return this.x=Math.ceil(e.x),this.y=Math.ceil(e.y),this}round(e=this){return this.x=Math.round(e.x),this.y=Math.round(e.y),this}min(e){return e.x<this.x&&(this.x=e.x),e.y<this.y&&(this.y=e.y),this}max(e){return e.x>this.x&&(this.x=e.x),e.y>this.y&&(this.y=e.y),this}set(e,t){return this.x=e,this.y=t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}sub2(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}subScalar(e){return this.x-=e,this.y-=e,this}fromArray(e,t=0){return this.x=e[t]??this.x,this.y=e[t+1]??this.y,this}toString(){return`[${this.x}, ${this.y}]`}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}static angleRad(e,t){return Math.atan2(e.x*t.y-e.y*t.x,e.x*t.x+e.y*t.y)}};oe=A,v(A,`ZERO`,Object.freeze(new oe(0,0))),v(A,`HALF`,Object.freeze(new oe(.5,.5))),v(A,`ONE`,Object.freeze(new oe(1,1))),v(A,`UP`,Object.freeze(new oe(0,1))),v(A,`DOWN`,Object.freeze(new oe(0,-1))),v(A,`RIGHT`,Object.freeze(new oe(1,0))),v(A,`LEFT`,Object.freeze(new oe(-1,0)));var se,j=class{constructor(e=0,t=0,n=0,r=0){v(this,`x`,void 0),v(this,`y`,void 0),v(this,`z`,void 0),v(this,`w`,void 0),e.length===4?(this.x=e[0],this.y=e[1],this.z=e[2],this.w=e[3]):(this.x=e,this.y=t,this.z=n,this.w=r)}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}add2(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addScaled(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}clone(){let e=this.constructor;return new e(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w,this}div(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}div2(e,t){return this.x=e.x/t.x,this.y=e.y/t.y,this.z=e.z/t.z,this.w=e.w/t.w,this}divScalar(e){return this.x/=e,this.y/=e,this.z/=e,this.w/=e,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}equals(e){return this.x===e.x&&this.y===e.y&&this.z===e.z&&this.w===e.w}equalsApprox(e,t=1e-6){return Math.abs(this.x-e.x)<t&&Math.abs(this.y-e.y)<t&&Math.abs(this.z-e.z)<t&&Math.abs(this.w-e.w)<t}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}lerp(e,t,n){return this.x=e.x+n*(t.x-e.x),this.y=e.y+n*(t.y-e.y),this.z=e.z+n*(t.z-e.z),this.w=e.w+n*(t.w-e.w),this}mul(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}mul2(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this.w=e.w*t.w,this}mulScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}scale(e){return this.mulScalar(e)}normalize(e=this){let t=e.x*e.x+e.y*e.y+e.z*e.z+e.w*e.w;if(t>0){let n=1/Math.sqrt(t);this.x=e.x*n,this.y=e.y*n,this.z=e.z*n,this.w=e.w*n}return this}floor(e=this){return this.x=Math.floor(e.x),this.y=Math.floor(e.y),this.z=Math.floor(e.z),this.w=Math.floor(e.w),this}ceil(e=this){return this.x=Math.ceil(e.x),this.y=Math.ceil(e.y),this.z=Math.ceil(e.z),this.w=Math.ceil(e.w),this}round(e=this){return this.x=Math.round(e.x),this.y=Math.round(e.y),this.z=Math.round(e.z),this.w=Math.round(e.w),this}min(e){return e.x<this.x&&(this.x=e.x),e.y<this.y&&(this.y=e.y),e.z<this.z&&(this.z=e.z),e.w<this.w&&(this.w=e.w),this}max(e){return e.x>this.x&&(this.x=e.x),e.y>this.y&&(this.y=e.y),e.z>this.z&&(this.z=e.z),e.w>this.w&&(this.w=e.w),this}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}sub2(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}fromArray(e,t=0){return this.x=e[t]??this.x,this.y=e[t+1]??this.y,this.z=e[t+2]??this.z,this.w=e[t+3]??this.w,this}toString(){return`[${this.x}, ${this.y}, ${this.z}, ${this.w}]`}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}};se=j,v(j,`ZERO`,Object.freeze(new se(0,0,0,0))),v(j,`HALF`,Object.freeze(new se(.5,.5,.5,.5))),v(j,`ONE`,Object.freeze(new se(1,1,1,1)));var ce,le=new A,ue=new k,de=new k,fe=new k,pe=new k,M=class e{constructor(){v(this,`data`,new Float32Array(16)),this.data[0]=this.data[5]=this.data[10]=this.data[15]=1}static _getPerspectiveHalfSize(e,t,n,r,i){i?(e.x=r*Math.tan(t*Math.PI/360),e.y=e.x/n):(e.y=r*Math.tan(t*Math.PI/360),e.x=e.y*n)}add2(e,t){let n=e.data,r=t.data,i=this.data;return i[0]=n[0]+r[0],i[1]=n[1]+r[1],i[2]=n[2]+r[2],i[3]=n[3]+r[3],i[4]=n[4]+r[4],i[5]=n[5]+r[5],i[6]=n[6]+r[6],i[7]=n[7]+r[7],i[8]=n[8]+r[8],i[9]=n[9]+r[9],i[10]=n[10]+r[10],i[11]=n[11]+r[11],i[12]=n[12]+r[12],i[13]=n[13]+r[13],i[14]=n[14]+r[14],i[15]=n[15]+r[15],this}add(e){return this.add2(this,e)}clone(){let e=this.constructor;return new e().copy(this)}copy(e){let t=e.data,n=this.data;return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],this}equals(e){let t=this.data,n=e.data;return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]&&t[8]===n[8]&&t[9]===n[9]&&t[10]===n[10]&&t[11]===n[11]&&t[12]===n[12]&&t[13]===n[13]&&t[14]===n[14]&&t[15]===n[15]}isIdentity(){let e=this.data;return e[0]===1&&e[1]===0&&e[2]===0&&e[3]===0&&e[4]===0&&e[5]===1&&e[6]===0&&e[7]===0&&e[8]===0&&e[9]===0&&e[10]===1&&e[11]===0&&e[12]===0&&e[13]===0&&e[14]===0&&e[15]===1}mul2(e,t){let n=e.data,r=t.data,i=this.data,a=n[0],o=n[1],s=n[2],c=n[3],l=n[4],u=n[5],d=n[6],f=n[7],p=n[8],m=n[9],h=n[10],g=n[11],_=n[12],v=n[13],y=n[14],b=n[15],x,S,C,w;return x=r[0],S=r[1],C=r[2],w=r[3],i[0]=a*x+l*S+p*C+_*w,i[1]=o*x+u*S+m*C+v*w,i[2]=s*x+d*S+h*C+y*w,i[3]=c*x+f*S+g*C+b*w,x=r[4],S=r[5],C=r[6],w=r[7],i[4]=a*x+l*S+p*C+_*w,i[5]=o*x+u*S+m*C+v*w,i[6]=s*x+d*S+h*C+y*w,i[7]=c*x+f*S+g*C+b*w,x=r[8],S=r[9],C=r[10],w=r[11],i[8]=a*x+l*S+p*C+_*w,i[9]=o*x+u*S+m*C+v*w,i[10]=s*x+d*S+h*C+y*w,i[11]=c*x+f*S+g*C+b*w,x=r[12],S=r[13],C=r[14],w=r[15],i[12]=a*x+l*S+p*C+_*w,i[13]=o*x+u*S+m*C+v*w,i[14]=s*x+d*S+h*C+y*w,i[15]=c*x+f*S+g*C+b*w,this}mulAffine2(e,t){let n=e.data,r=t.data,i=this.data,a=n[0],o=n[1],s=n[2],c=n[4],l=n[5],u=n[6],d=n[8],f=n[9],p=n[10],m=n[12],h=n[13],g=n[14],_,v,y;return _=r[0],v=r[1],y=r[2],i[0]=a*_+c*v+d*y,i[1]=o*_+l*v+f*y,i[2]=s*_+u*v+p*y,i[3]=0,_=r[4],v=r[5],y=r[6],i[4]=a*_+c*v+d*y,i[5]=o*_+l*v+f*y,i[6]=s*_+u*v+p*y,i[7]=0,_=r[8],v=r[9],y=r[10],i[8]=a*_+c*v+d*y,i[9]=o*_+l*v+f*y,i[10]=s*_+u*v+p*y,i[11]=0,_=r[12],v=r[13],y=r[14],i[12]=a*_+c*v+d*y+m,i[13]=o*_+l*v+f*y+h,i[14]=s*_+u*v+p*y+g,i[15]=1,this}mul(e){return this.mul2(this,e)}transformPoint(e,t=new k){let n=this.data,{x:r,y:i,z:a}=e;return t.x=r*n[0]+i*n[4]+a*n[8]+n[12],t.y=r*n[1]+i*n[5]+a*n[9]+n[13],t.z=r*n[2]+i*n[6]+a*n[10]+n[14],t}transformVector(e,t=new k){let n=this.data,{x:r,y:i,z:a}=e;return t.x=r*n[0]+i*n[4]+a*n[8],t.y=r*n[1]+i*n[5]+a*n[9],t.z=r*n[2]+i*n[6]+a*n[10],t}transformVec4(e,t=new j){let n=this.data,{x:r,y:i,z:a,w:o}=e;return t.x=r*n[0]+i*n[4]+a*n[8]+o*n[12],t.y=r*n[1]+i*n[5]+a*n[9]+o*n[13],t.z=r*n[2]+i*n[6]+a*n[10]+o*n[14],t.w=r*n[3]+i*n[7]+a*n[11]+o*n[15],t}setLookAt(e,t,n){fe.sub2(e,t).normalize(),de.copy(n).normalize(),ue.cross(de,fe).normalize(),de.cross(fe,ue);let r=this.data;return r[0]=ue.x,r[1]=ue.y,r[2]=ue.z,r[3]=0,r[4]=de.x,r[5]=de.y,r[6]=de.z,r[7]=0,r[8]=fe.x,r[9]=fe.y,r[10]=fe.z,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}setFrustum(e,t,n,r,i,a){let o=2*i,s=t-e,c=r-n,l=a-i,u=this.data;return u[0]=o/s,u[1]=0,u[2]=0,u[3]=0,u[4]=0,u[5]=o/c,u[6]=0,u[7]=0,u[8]=(t+e)/s,u[9]=(r+n)/c,u[10]=(-a-i)/l,u[11]=-1,u[12]=0,u[13]=0,u[14]=-o*a/l,u[15]=0,this}setPerspective(t,n,r,i,a){return e._getPerspectiveHalfSize(le,t,n,r,a),this.setFrustum(-le.x,le.x,-le.y,le.y,r,i)}setOrtho(e,t,n,r,i,a){let o=this.data;return o[0]=2/(t-e),o[1]=0,o[2]=0,o[3]=0,o[4]=0,o[5]=2/(r-n),o[6]=0,o[7]=0,o[8]=0,o[9]=0,o[10]=-2/(a-i),o[11]=0,o[12]=-(t+e)/(t-e),o[13]=-(r+n)/(r-n),o[14]=-(a+i)/(a-i),o[15]=1,this}setFromAxisAngle(e,t){t*=E.DEG_TO_RAD;let{x:n,y:r,z:i}=e,a=Math.cos(t),o=Math.sin(t),s=1-a,c=s*n,l=s*r,u=this.data;return u[0]=c*n+a,u[1]=c*r+o*i,u[2]=c*i-o*r,u[3]=0,u[4]=c*r-o*i,u[5]=l*r+a,u[6]=l*i+o*n,u[7]=0,u[8]=c*i+o*r,u[9]=l*i-n*o,u[10]=s*i*i+a,u[11]=0,u[12]=0,u[13]=0,u[14]=0,u[15]=1,this}setTranslate(e,t,n){let r=this.data;return r[0]=1,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=1,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=1,r[11]=0,r[12]=e,r[13]=t,r[14]=n,r[15]=1,this}setScale(e,t,n){let r=this.data;return r[0]=e,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=t,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=n,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,this}setViewport(e,t,n,r){let i=this.data;return i[0]=n*.5,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=r*.5,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=.5,i[11]=0,i[12]=e+n*.5,i[13]=t+r*.5,i[14]=.5,i[15]=1,this}setReflection(e,t){let n=e.x,r=e.y,i=e.z,a=this.data;return a[0]=1-2*n*n,a[1]=-2*n*r,a[2]=-2*n*i,a[3]=0,a[4]=-2*n*r,a[5]=1-2*r*r,a[6]=-2*r*i,a[7]=0,a[8]=-2*n*i,a[9]=-2*r*i,a[10]=1-2*i*i,a[11]=0,a[12]=-2*n*t,a[13]=-2*r*t,a[14]=-2*i*t,a[15]=1,this}invert(e=this){let t=e.data,n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],p=t[11],m=t[12],h=t[13],g=t[14],_=t[15],v=n*s-r*o,y=n*c-i*o,b=n*l-a*o,x=r*c-i*s,S=r*l-a*s,C=i*l-a*c,w=u*h-d*m,T=u*g-f*m,E=u*_-p*m,D=d*g-f*h,O=d*_-p*h,ee=f*_-p*g,te=v*ee-y*O+b*D+x*E-S*T+C*w;if(te===0)this.setIdentity();else{let e=1/te,t=this.data;t[0]=(s*ee-c*O+l*D)*e,t[1]=(-r*ee+i*O-a*D)*e,t[2]=(h*C-g*S+_*x)*e,t[3]=(-d*C+f*S-p*x)*e,t[4]=(-o*ee+c*E-l*T)*e,t[5]=(n*ee-i*E+a*T)*e,t[6]=(-m*C+g*b-_*y)*e,t[7]=(u*C-f*b+p*y)*e,t[8]=(o*O-s*E+l*w)*e,t[9]=(-n*O+r*E-a*w)*e,t[10]=(m*S-h*b+_*v)*e,t[11]=(-u*S+d*b-p*v)*e,t[12]=(-o*D+s*T-c*w)*e,t[13]=(n*D-r*T+i*w)*e,t[14]=(-m*x+h*y-g*v)*e,t[15]=(u*x-d*y+f*v)*e}return this}set(e){let t=this.data;return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],this}setIdentity(){let e=this.data;return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}setTRS(e,t,n){let r=t.x,i=t.y,a=t.z,o=t.w,s=n.x,c=n.y,l=n.z,u=r+r,d=i+i,f=a+a,p=r*u,m=r*d,h=r*f,g=i*d,_=i*f,v=a*f,y=o*u,b=o*d,x=o*f,S=this.data;return S[0]=(1-(g+v))*s,S[1]=(m+x)*s,S[2]=(h-b)*s,S[3]=0,S[4]=(m-x)*c,S[5]=(1-(p+v))*c,S[6]=(_+y)*c,S[7]=0,S[8]=(h+b)*l,S[9]=(_-y)*l,S[10]=(1-(p+g))*l,S[11]=0,S[12]=e.x,S[13]=e.y,S[14]=e.z,S[15]=1,this}transpose(e=this){let t=e.data,n=this.data;if(t===n){let e;e=t[1],n[1]=t[4],n[4]=e,e=t[2],n[2]=t[8],n[8]=e,e=t[3],n[3]=t[12],n[12]=e,e=t[6],n[6]=t[9],n[9]=e,e=t[7],n[7]=t[13],n[13]=e,e=t[11],n[11]=t[14],n[14]=e}else n[0]=t[0],n[1]=t[4],n[2]=t[8],n[3]=t[12],n[4]=t[1],n[5]=t[5],n[6]=t[9],n[7]=t[13],n[8]=t[2],n[9]=t[6],n[10]=t[10],n[11]=t[14],n[12]=t[3],n[13]=t[7],n[14]=t[11],n[15]=t[15];return this}getTranslation(e=new k){return e.set(this.data[12],this.data[13],this.data[14])}getX(e=new k){return e.set(this.data[0],this.data[1],this.data[2])}getY(e=new k){return e.set(this.data[4],this.data[5],this.data[6])}getZ(e=new k){return e.set(this.data[8],this.data[9],this.data[10])}getScale(e=new k){return this.getX(ue),this.getY(de),this.getZ(fe),e.set(ue.length(),de.length(),fe.length()),e}get scaleSign(){return this.getX(ue),this.getY(de),this.getZ(fe),ue.cross(ue,de),ue.dot(fe)<0?-1:1}setFromEulerAngles(e,t,n){e*=E.DEG_TO_RAD,t*=E.DEG_TO_RAD,n*=E.DEG_TO_RAD;let r=Math.sin(-e),i=Math.cos(-e),a=Math.sin(-t),o=Math.cos(-t),s=Math.sin(-n),c=Math.cos(-n),l=this.data;return l[0]=o*c,l[1]=-o*s,l[2]=a,l[3]=0,l[4]=i*s+c*r*a,l[5]=i*c-r*a*s,l[6]=-o*r,l[7]=0,l[8]=r*s-i*c*a,l[9]=c*r+i*a*s,l[10]=i*o,l[11]=0,l[12]=0,l[13]=0,l[14]=0,l[15]=1,this}getEulerAngles(e=new k){this.getScale(pe);let t=pe.x,n=pe.y,r=pe.z;if(t===0||n===0||r===0)return e.set(0,0,0);let i=this.data,a=Math.asin(-i[2]/t),o=Math.PI*.5,s,c;return a<o?a>-o?(s=Math.atan2(i[6]/n,i[10]/r),c=Math.atan2(i[1]/t,i[0]/t)):(c=0,s=-Math.atan2(i[4]/n,i[5]/n)):(c=0,s=Math.atan2(i[4]/n,i[5]/n)),e.set(s,a,c).mulScalar(E.RAD_TO_DEG)}toString(){return`[${this.data.join(`, `)}]`}};ce=M,v(M,`IDENTITY`,Object.freeze(new ce)),v(M,`ZERO`,Object.freeze(new ce().set([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])));var me,N=class{constructor(e=0,t=0,n=0,r=1){v(this,`x`,void 0),v(this,`y`,void 0),v(this,`z`,void 0),v(this,`w`,void 0),e.length===4?(this.x=e[0],this.y=e[1],this.z=e[2],this.w=e[3]):(this.x=e,this.y=t,this.z=n,this.w=r)}clone(){let e=this.constructor;return new e(this.x,this.y,this.z,this.w)}conjugate(e=this){return this.x=e.x*-1,this.y=e.y*-1,this.z=e.z*-1,this.w=e.w,this}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}equals(e){return this.x===e.x&&this.y===e.y&&this.z===e.z&&this.w===e.w}equalsApprox(e,t=1e-6){return Math.abs(this.x-e.x)<t&&Math.abs(this.y-e.y)<t&&Math.abs(this.z-e.z)<t&&Math.abs(this.w-e.w)<t}getAxisAngle(e){let t=Math.acos(this.w)*2,n=Math.sin(t/2);return n===0?(e.x=1,e.y=0,e.z=0):(e.x=this.x/n,e.y=this.y/n,e.z=this.z/n,(e.x<0||e.y<0||e.z<0)&&(e.x*=-1,e.y*=-1,e.z*=-1,t*=-1)),t*E.RAD_TO_DEG}getEulerAngles(e=new k){let t,n,r,i=this.x,a=this.y,o=this.z,s=this.w,c=2*(s*a-i*o);return c<=-.99999?(t=2*Math.atan2(i,s),n=-Math.PI/2,r=0):c>=.99999?(t=2*Math.atan2(i,s),n=Math.PI/2,r=0):(t=Math.atan2(2*(s*i+a*o),1-2*(i*i+a*a)),n=Math.asin(c),r=Math.atan2(2*(s*o+i*a),1-2*(a*a+o*o))),e.set(t,n,r).mulScalar(E.RAD_TO_DEG)}invert(e=this){return this.conjugate(e).normalize()}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}lerp(e,t,n){let r=(1-n)*(e.dot(t)<0?-1:1);return this.x=e.x*r+t.x*n,this.y=e.y*r+t.y*n,this.z=e.z*r+t.z*n,this.w=e.w*r+t.w*n,this.normalize()}mul(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.x,o=e.y,s=e.z,c=e.w;return this.x=i*a+t*c+n*s-r*o,this.y=i*o+n*c+r*a-t*s,this.z=i*s+r*c+t*o-n*a,this.w=i*c-t*a-n*o-r*s,this}mulScalar(e,t=this){return this.x=t.x*e,this.y=t.y*e,this.z=t.z*e,this.w=t.w*e,this}mul2(e,t){let n=e.x,r=e.y,i=e.z,a=e.w,o=t.x,s=t.y,c=t.z,l=t.w;return this.x=a*o+n*l+r*c-i*s,this.y=a*s+r*l+i*o-n*c,this.z=a*c+i*l+n*s-r*o,this.w=a*l-n*o-r*s-i*c,this}normalize(e=this){let t=e.length();return t===0?(this.x=this.y=this.z=0,this.w=1):(t=1/t,this.x=e.x*t,this.y=e.y*t,this.z=e.z*t,this.w=e.w*t),this}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setFromAxisAngle(e,t){t*=.5*E.DEG_TO_RAD;let n=Math.sin(t),r=Math.cos(t);return this.x=n*e.x,this.y=n*e.y,this.z=n*e.z,this.w=r,this}setFromEulerAngles(e,t,n){if(e instanceof k){let r=e;e=r.x,t=r.y,n=r.z}let r=.5*E.DEG_TO_RAD;e*=r,t*=r,n*=r;let i=Math.sin(e),a=Math.cos(e),o=Math.sin(t),s=Math.cos(t),c=Math.sin(n),l=Math.cos(n);return this.x=i*s*l-a*o*c,this.y=a*o*l+i*s*c,this.z=a*s*c-i*o*l,this.w=a*s*l+i*o*c,this}setFromMat4(e){let t=e.data,n=t[0],r=t[1],i=t[2],a=t[4],o=t[5],s=t[6],c=t[8],l=t[9],u=t[10];n*(o*u-s*l)-r*(a*u-s*c)+i*(a*l-o*c)<0&&(n=-n,r=-r,i=-i);let d;return d=n*n+r*r+i*i,d===0||(d=1/Math.sqrt(d),n*=d,r*=d,i*=d,d=a*a+o*o+s*s,d===0)||(d=1/Math.sqrt(d),a*=d,o*=d,s*=d,d=c*c+l*l+u*u,d===0)?this.set(0,0,0,1):(d=1/Math.sqrt(d),c*=d,l*=d,u*=d,u<0?n>o?this.set(1+n-o-u,r+a,c+i,s-l):this.set(r+a,1-n+o-u,s+l,c-i):n<-o?this.set(c+i,s+l,1-n-o+u,r-a):this.set(s-l,c-i,r-a,1+n+o+u),this.mulScalar(1/this.length()))}setFromDirections(e,t){let n=1+e.dot(t);return n<2**-52?Math.abs(e.x)>Math.abs(e.y)?(this.x=-e.z,this.y=0,this.z=e.x,this.w=0):(this.x=0,this.y=-e.z,this.z=e.y,this.w=0):(this.x=e.y*t.z-e.z*t.y,this.y=e.z*t.x-e.x*t.z,this.z=e.x*t.y-e.y*t.x,this.w=n),this.normalize()}slerp(e,t,n){let r=e.x,i=e.y,a=e.z,o=e.w,s=t.x,c=t.y,l=t.z,u=t.w,d=o*u+r*s+i*c+a*l;if(d<0&&(u=-u,s=-s,c=-c,l=-l,d=-d),Math.abs(d)>=1)return this.w=o,this.x=r,this.y=i,this.z=a,this;let f=Math.acos(d),p=Math.sqrt(1-d*d);if(Math.abs(p)<.001)return this.w=o*.5+u*.5,this.x=r*.5+s*.5,this.y=i*.5+c*.5,this.z=a*.5+l*.5,this;let m=Math.sin((1-n)*f)/p,h=Math.sin(n*f)/p;return this.w=o*m+u*h,this.x=r*m+s*h,this.y=i*m+c*h,this.z=a*m+l*h,this}transformVector(e,t=new k){let n=e.x,r=e.y,i=e.z,a=this.x,o=this.y,s=this.z,c=this.w,l=c*n+o*i-s*r,u=c*r+s*n-a*i,d=c*i+a*r-o*n,f=-a*n-o*r-s*i;return t.x=l*c+f*-a+u*-s-d*-o,t.y=u*c+f*-o+d*-a-l*-s,t.z=d*c+f*-s+l*-o-u*-a,t}fromArray(e,t=0){return this.x=e[t]??this.x,this.y=e[t+1]??this.y,this.z=e[t+2]??this.z,this.w=e[t+3]??this.w,this}toString(){return`[${this.x}, ${this.y}, ${this.z}, ${this.w}]`}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}};me=N,v(N,`IDENTITY`,Object.freeze(new me(0,0,0,1))),v(N,`ZERO`,Object.freeze(new me(0,0,0,0)));var he=new k,ge=new k,_e=new k,ve=new k,ye=new k,be=class e{constructor(e,t){v(this,`center`,new k),v(this,`halfExtents`,new k(.5,.5,.5)),v(this,`_min`,new k),v(this,`_max`,new k),e&&this.center.copy(e),t&&this.halfExtents.copy(t)}add(e){let t=this.center,n=t.x,r=t.y,i=t.z,a=this.halfExtents,o=a.x,s=a.y,c=a.z,l=n-o,u=n+o,d=r-s,f=r+s,p=i-c,m=i+c,h=e.center,g=h.x,_=h.y,v=h.z,y=e.halfExtents,b=y.x,x=y.y,S=y.z,C=g-b,w=g+b,T=_-x,E=_+x,D=v-S,O=v+S;C<l&&(l=C),w>u&&(u=w),T<d&&(d=T),E>f&&(f=E),D<p&&(p=D),O>m&&(m=O),t.x=(l+u)*.5,t.y=(d+f)*.5,t.z=(p+m)*.5,a.x=(u-l)*.5,a.y=(f-d)*.5,a.z=(m-p)*.5}copy(e){this.center.copy(e.center),this.halfExtents.copy(e.halfExtents)}clone(){return new e(this.center,this.halfExtents)}intersects(e){let t=this.getMax(),n=this.getMin(),r=e.getMax(),i=e.getMin();return n.x<=r.x&&t.x>=i.x&&n.y<=r.y&&t.y>=i.y&&n.z<=r.z&&t.z>=i.z}_intersectsRay(e,t){let n=he.copy(this.getMin()).sub(e.origin),r=ge.copy(this.getMax()).sub(e.origin),i=e.direction;i.x===0?(n.x=n.x<0?-Number.MAX_VALUE:Number.MAX_VALUE,r.x=r.x<0?-Number.MAX_VALUE:Number.MAX_VALUE):(n.x/=i.x,r.x/=i.x),i.y===0?(n.y=n.y<0?-Number.MAX_VALUE:Number.MAX_VALUE,r.y=r.y<0?-Number.MAX_VALUE:Number.MAX_VALUE):(n.y/=i.y,r.y/=i.y),i.z===0?(n.z=n.z<0?-Number.MAX_VALUE:Number.MAX_VALUE,r.z=r.z<0?-Number.MAX_VALUE:Number.MAX_VALUE):(n.z/=i.z,r.z/=i.z);let a=_e.set(Math.min(n.x,r.x),Math.min(n.y,r.y),Math.min(n.z,r.z)),o=ve.set(Math.max(n.x,r.x),Math.max(n.y,r.y),Math.max(n.z,r.z)),s=Math.min(Math.min(o.x,o.y),o.z),c=Math.max(Math.max(a.x,a.y),a.z),l=s>=c&&c>=0;return l&&t.copy(e.direction).mulScalar(c).add(e.origin),l}_fastIntersectsRay(e){let t=he,n=ge,r=_e,i=ve,a=ye,o=e.direction;return t.sub2(e.origin,this.center),i.set(Math.abs(t.x),Math.abs(t.y),Math.abs(t.z)),r.mul2(t,o),!(i.x>this.halfExtents.x&&r.x>=0||i.y>this.halfExtents.y&&r.y>=0||i.z>this.halfExtents.z&&r.z>=0||(a.set(Math.abs(o.x),Math.abs(o.y),Math.abs(o.z)),n.cross(o,t),n.set(Math.abs(n.x),Math.abs(n.y),Math.abs(n.z)),n.x>this.halfExtents.y*a.z+this.halfExtents.z*a.y)||n.y>this.halfExtents.x*a.z+this.halfExtents.z*a.x||n.z>this.halfExtents.x*a.y+this.halfExtents.y*a.x)}intersectsRay(e,t){return t?this._intersectsRay(e,t):this._fastIntersectsRay(e)}setMinMax(e,t){this.center.add2(t,e).mulScalar(.5),this.halfExtents.sub2(t,e).mulScalar(.5)}getMin(){return this._min.copy(this.center).sub(this.halfExtents)}getMax(){return this._max.copy(this.center).add(this.halfExtents)}containsPoint(e){let t=this.center,n=this.halfExtents;return!(e.x<t.x-n.x||e.x>t.x+n.x||e.y<t.y-n.y||e.y>t.y+n.y||e.z<t.z-n.z||e.z>t.z+n.z)}closestPoint(e,t=new k){let n=this.center,r=this.halfExtents;return t.set(Math.max(n.x-r.x,Math.min(e.x,n.x+r.x)),Math.max(n.y-r.y,Math.min(e.y,n.y+r.y)),Math.max(n.z-r.z,Math.min(e.z,n.z+r.z)))}setFromTransformedAabb(e,t,n=!1){let r=e.center,i=e.halfExtents,a=t.data,o=a[0],s=a[4],c=a[8],l=a[1],u=a[5],d=a[9],f=a[2],p=a[6],m=a[10];if(n){let e=o*o+s*s+c*c;if(e>0){let t=1/Math.sqrt(e);o*=t,s*=t,c*=t}if(e=l*l+u*u+d*d,e>0){let t=1/Math.sqrt(e);l*=t,u*=t,d*=t}if(e=f*f+p*p+m*m,e>0){let t=1/Math.sqrt(e);f*=t,p*=t,m*=t}}this.center.set(a[12]+o*r.x+s*r.y+c*r.z,a[13]+l*r.x+u*r.y+d*r.z,a[14]+f*r.x+p*r.y+m*r.z),this.halfExtents.set(Math.abs(o)*i.x+Math.abs(s)*i.y+Math.abs(c)*i.z,Math.abs(l)*i.x+Math.abs(u)*i.y+Math.abs(d)*i.z,Math.abs(f)*i.x+Math.abs(p)*i.y+Math.abs(m)*i.z)}static computeMinMax(e,t,n,r=e.length/3){if(r>0){let i=e[0],a=e[1],o=e[2],s=i,c=a,l=o,u=r*3;for(let t=3;t<u;t+=3){let n=e[t],r=e[t+1],u=e[t+2];n<i&&(i=n),r<a&&(a=r),u<o&&(o=u),n>s&&(s=n),r>c&&(c=r),u>l&&(l=u)}t.set(i,a,o),n.set(s,c,l)}}compute(t,n){e.computeMinMax(t,he,ge,n),this.setMinMax(he,ge)}intersectsBoundingSphere(e){return this._distanceToBoundingSphereSq(e)<=e.radius*e.radius}_distanceToBoundingSphereSq(e){let t=this.getMin(),n=this.getMax(),r=0,i=[`x`,`y`,`z`];for(let a=0;a<3;++a){let o=0,s=e.center[i[a]],c=t[i[a]],l=n[i[a]],u=0;s<c&&(u=c-s,o+=u*u),s>l&&(u=s-l,o+=u*u),r+=o}return r}_expand(e,t){he.add2(this.getMin(),e),ge.add2(this.getMax(),t),this.setMinMax(he,ge)}},xe=new k,Se=new k,Ce=class{constructor(e=new k,t=.5){v(this,`center`,void 0),v(this,`radius`,void 0),this.center=e,this.radius=t}containsPoint(e){let t=xe.sub2(e,this.center).lengthSq(),n=this.radius;return t<n*n}intersectsRay(e,t){let n=xe.copy(e.origin).sub(this.center),r=n.dot(Se.copy(e.direction).normalize()),i=n.dot(n)-this.radius*this.radius;if(i>0&&r>0)return!1;let a=r*r-i;if(a<0)return!1;let o=Math.abs(-r-Math.sqrt(a));return t&&t.copy(e.direction).mulScalar(o).add(e.origin),!0}intersectsBoundingSphere(e){xe.sub2(e.center,this.center);let t=e.radius+this.radius;return xe.lengthSq()<=t*t}},we=class{constructor(e=k.UP,t=0){v(this,`normal`,new k),v(this,`distance`,void 0),this.normal.copy(e),this.distance=t}clone(){let e=this.constructor;return new e().copy(this)}copy(e){return this.normal.copy(e.normal),this.distance=e.distance,this}intersectsLine(e,t,n){let r=this.distance,i=this.normal.dot(e)+r,a=i/(i-(this.normal.dot(t)+r)),o=a>=0&&a<=1;return o&&n&&n.lerp(e,t,a),o}intersectsRay(e,t){let n=this.normal.dot(e.direction);if(n===0)return!1;let r=-(this.normal.dot(e.origin)+this.distance)/n;return r>=0&&t&&t.copy(e.direction).mulScalar(r).add(e.origin),r>=0}normalize(){let e=1/this.normal.length();return this.normal.mulScalar(e),this.distance*=e,this}set(e,t,n,r){return this.normal.set(e,t,n),this.distance=r,this}setFromPointNormal(e,t){return this.normal.copy(t),this.distance=-this.normal.dot(e),this}},Te=new k,Ee=new k,De=new k,Oe=new k,ke=[new we,new we,new we,new we,new we,new we];function Ae(e,t,n,r){Te.cross(t.normal,n.normal);let i=e.normal.dot(Te);if(Math.abs(i)<1e-6)return!1;Ee.cross(n.normal,e.normal),De.cross(e.normal,t.normal);let a=-1/i;return r.set((e.distance*Te.x+t.distance*Ee.x+n.distance*De.x)*a,(e.distance*Te.y+t.distance*Ee.y+n.distance*De.y)*a,(e.distance*Te.z+t.distance*Ee.z+n.distance*De.z)*a),isFinite(r.x)&&isFinite(r.y)&&isFinite(r.z)}var je=class{constructor(){v(this,`planeData`,new Float32Array(24))}get planes(){return[]}clone(){let e=this.constructor;return new e().copy(this)}copy(e){return this.planeData.set(e.planeData),this}getPlane(e,t){let n=this.planeData,r=e*4;return t.normal.set(n[r],n[r+1],n[r+2]),t.distance=n[r+3],t}setPlane(e,t){let{normal:n,distance:r}=t;return this._setPlane(e,n.x,n.y,n.z,r),this}_setPlane(e,t,n,r,i){let a=1/Math.sqrt(t*t+n*n+r*r),o=this.planeData,s=e*4;o[s]=t*a,o[s+1]=n*a,o[s+2]=r*a,o[s+3]=i*a}setFromMat4(e){let t=e.data,n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],p=t[11],m=t[12],h=t[13],g=t[14],_=t[15];this._setPlane(0,a-n,l-o,p-u,_-m),this._setPlane(1,a+n,l+o,p+u,_+m),this._setPlane(2,a+r,l+s,p+d,_+h),this._setPlane(3,a-r,l-s,p-d,_-h),this._setPlane(4,a-i,l-c,p-f,_-g),this._setPlane(5,a+i,l+c,p+f,_+g)}containsPoint(e){let t=this.planeData,{x:n,y:r,z:i}=e;for(let e=0;e<24;e+=4)if(t[e]*n+t[e+1]*r+t[e+2]*i+t[e+3]<=0)return!1;return!0}add(e){let t=this.planeData;for(let t=0;t<6;t++)e.getPlane(t,ke[t]);for(let e=4;e<=5;e++)for(let n=0;n<=1;n++)for(let r=2;r<=3;r++)if(Ae(ke[e],ke[n],ke[r],Oe))for(let e=0;e<24;e+=4){let n=t[e]*Oe.x+t[e+1]*Oe.y+t[e+2]*Oe.z+t[e+3];n<0&&(t[e+3]-=n)}return this}containsSphere(e){let t=this.planeData,{center:n,radius:r}=e,{x:i,y:a,z:o}=n,s=0;for(let e=0;e<24;e+=4){let n=t[e]*i+t[e+1]*a+t[e+2]*o+t[e+3];if(n<=-r)return 0;n>r&&s++}return s===6?2:1}containsAabb(e){let t=this.planeData,{center:n,halfExtents:r}=e,{x:i,y:a,z:o}=n,s=r.x,c=r.y,l=r.z;for(let e=0;e<24;e+=4){let n=t[e],r=t[e+1],u=t[e+2],d=Math.abs(n)*s+Math.abs(r)*c+Math.abs(u)*l;if(n*i+r*a+u*o+t[e+3]<=-d)return!1}return!0}},Me=`bottom`,Ne=`native`,Pe=[1,2,4],Fe=new Map([[0,{name:`A8`,size:1,ldr:!0}],[52,{name:`R8`,size:1,ldr:!0,msaa:!0,msaaResolve:!0}],[1,{name:`L8`,size:1,ldr:!0}],[2,{name:`LA8`,size:2,ldr:!0}],[53,{name:`RG8`,size:2,ldr:!0,msaa:!0,msaaResolve:!0}],[3,{name:`RGB565`,size:2,ldr:!0}],[4,{name:`RGBA5551`,size:2,ldr:!0}],[5,{name:`RGBA4`,size:2,ldr:!0}],[6,{name:`RGB8`,size:4,ldr:!0,msaa:!0,msaaResolve:!0}],[7,{name:`RGBA8`,size:4,ldr:!0,srgbFormat:20,msaa:!0,msaaResolve:!0}],[50,{name:`R16F`,size:2,msaa:!0,msaaResolve:!0}],[51,{name:`RG16F`,size:4,msaa:!0,msaaResolve:!0}],[11,{name:`RGB16F`,size:8}],[12,{name:`RGBA16F`,size:8,msaa:!0,msaaResolve:!0}],[13,{name:`RGB32F`,size:16}],[14,{name:`RGBA32F`,size:16}],[15,{name:`R32F`,size:4,msaa:!0}],[70,{name:`RG32F`,size:8}],[71,{name:`RGB9E5`,size:4}],[72,{name:`RG8S`,size:2}],[73,{name:`RGBA8S`,size:4}],[74,{name:`RGB10A2`,size:4,msaa:!0,msaaResolve:!0}],[75,{name:`RGB10A2U`,size:4,isUint:!0,msaa:!0}],[16,{name:`DEPTH`,size:4,msaa:!0}],[69,{name:`DEPTH16`,size:2,msaa:!0}],[17,{name:`DEPTHSTENCIL`,size:4,msaa:!0}],[18,{name:`111110F`,size:4,msaa:!0,msaaResolve:!0}],[19,{name:`SRGB8`,size:4,ldr:!0,srgb:!0}],[20,{name:`SRGBA8`,size:4,ldr:!0,srgb:!0,msaa:!0,msaaResolve:!0}],[31,{name:`BGRA8`,size:4,ldr:!0,msaa:!0,msaaResolve:!0}],[64,{name:`SBGRA8`,size:4,ldr:!0,srgb:!0,msaa:!0,msaaResolve:!0}],[8,{name:`DXT1`,blockSize:8,ldr:!0,srgbFormat:54}],[9,{name:`DXT3`,blockSize:16,ldr:!0,srgbFormat:55}],[10,{name:`DXT5`,blockSize:16,ldr:!0,srgbFormat:56}],[21,{name:`ETC1`,blockSize:8,ldr:!0}],[22,{name:`ETC2_RGB`,blockSize:8,ldr:!0,srgbFormat:61}],[23,{name:`ETC2_RGBA`,blockSize:16,ldr:!0,srgbFormat:62}],[24,{name:`PVRTC_2BPP_RGB_1`,ldr:!0,blockSize:8}],[25,{name:`PVRTC_2BPP_RGBA_1`,ldr:!0,blockSize:8}],[26,{name:`PVRTC_4BPP_RGB_1`,ldr:!0,blockSize:8}],[27,{name:`PVRTC_4BPP_RGBA_1`,ldr:!0,blockSize:8}],[28,{name:`ASTC_4x4`,blockSize:16,ldr:!0,srgbFormat:63}],[29,{name:`ATC_RGB`,blockSize:8,ldr:!0}],[30,{name:`ATC_RGBA`,blockSize:16,ldr:!0}],[65,{name:`BC6H_RGBF`,blockSize:16}],[66,{name:`BC6H_RGBUF`,blockSize:16}],[67,{name:`BC7_RGBA`,blockSize:16,ldr:!0,srgbFormat:68}],[54,{name:`DXT1_SRGB`,blockSize:8,ldr:!0,srgb:!0}],[55,{name:`DXT3_SRGBA`,blockSize:16,ldr:!0,srgb:!0}],[56,{name:`DXT5_SRGBA`,blockSize:16,ldr:!0,srgb:!0}],[61,{name:`ETC2_SRGB`,blockSize:8,ldr:!0,srgb:!0}],[62,{name:`ETC2_SRGBA`,blockSize:16,ldr:!0,srgb:!0}],[63,{name:`ASTC_4x4_SRGB`,blockSize:16,ldr:!0,srgb:!0}],[68,{name:`BC7_SRGBA`,blockSize:16,ldr:!0,srgb:!0}],[32,{name:`R8I`,size:1,isInt:!0,msaa:!0}],[34,{name:`R16I`,size:2,isInt:!0,msaa:!0}],[36,{name:`R32I`,size:4,isInt:!0}],[38,{name:`RG8I`,size:2,isInt:!0,msaa:!0}],[40,{name:`RG16I`,size:4,isInt:!0,msaa:!0}],[42,{name:`RG32I`,size:8,isInt:!0}],[44,{name:`RGBA8I`,size:4,isInt:!0,msaa:!0}],[46,{name:`RGBA16I`,size:8,isInt:!0,msaa:!0}],[48,{name:`RGBA32I`,size:16,isInt:!0}],[33,{name:`R8U`,size:1,isUint:!0,msaa:!0}],[35,{name:`R16U`,size:2,isUint:!0,msaa:!0}],[37,{name:`R32U`,size:4,isUint:!0}],[39,{name:`RG8U`,size:2,isUint:!0,msaa:!0}],[41,{name:`RG16U`,size:4,isUint:!0,msaa:!0}],[43,{name:`RG32U`,size:8,isUint:!0}],[45,{name:`RGBA8U`,size:4,isUint:!0,msaa:!0}],[47,{name:`RGBA16U`,size:8,isUint:!0,msaa:!0}],[49,{name:`RGBA32U`,size:16,isUint:!0}]]),Ie=e=>Fe.get(e)?.blockSize!==void 0,Le=e=>Fe.get(e)?.srgb===!0,Re=e=>{let t=Fe.get(e);return t?.isInt===!0||t?.isUint===!0},ze={sampler:`sampler2D`,returnType:`vec4`},Be={sampler:`usampler2D`,returnType:`uvec4`},Ve={sampler:`isampler2D`,returnType:`ivec4`},He={textureType:`texture_2d<f32>`,returnType:`vec4f`},Ue={textureType:`texture_2d<u32>`,returnType:`vec4u`},We={textureType:`texture_2d<i32>`,returnType:`vec4i`},Ge=e=>{let t=Fe.get(e);return t?.isUint?Be:t?.isInt?Ve:ze},Ke=e=>{let t=Fe.get(e);return t?.isUint?Ue:t?.isInt?We:He},qe=e=>Fe.get(e)?.srgbFormat||e,Je=e=>{for(let[t,n]of Fe)if(n.srgbFormat===e)return t;return e},Ye=e=>{let t=Fe.get(e);return!(!t?.ldr||t?.srgb)},Xe=e=>{switch(e){case 15:case 70:case 13:case 14:return Float32Array;case 36:case 42:case 48:return Int32Array;case 37:case 43:case 49:case 71:case 74:case 75:return Uint32Array;case 34:case 40:case 46:return Int16Array;case 35:case 41:case 47:case 3:case 4:case 5:case 50:case 51:case 11:case 12:return Uint16Array;case 32:case 38:case 44:case 72:case 73:return Int8Array;default:return Uint8Array}},P=`POSITION`,Ze=`NORMAL`,Qe=`TANGENT`,$e=`BLENDWEIGHT`,et=`BLENDINDICES`,tt=`COLOR`,nt=`TEXCOORD`,rt=`TEXCOORD0`,it=`TEXCOORD1`,at=`TEXCOORD2`,ot=`TEXCOORD3`,st=`TEXCOORD4`,ct=`TEXCOORD5`,lt=`TEXCOORD6`,ut=`TEXCOORD7`,dt=`ATTR0`,ft=`ATTR1`,pt=`ATTR2`,mt=`ATTR3`,ht=`ATTR4`,gt=`ATTR5`,_t=`ATTR6`,vt=`ATTR7`,yt=`ATTR8`,bt=`ATTR9`,xt=`ATTR10`,St=`ATTR11`,Ct=`ATTR12`,wt=`ATTR13`,Tt=`ATTR14`,Et=`ATTR15`,Dt=`default`,Ot=`rgbm`,kt=`rgbe`,At=`rgbp`,jt=`swizzleGGGR`,Mt=`2d-array`,Nt=`cube`,Pt=`none`,Ft=`cube`,It=`octahedral`,Lt=`glsl`,Rt=`wgsl`,zt=`bool.int.float.vec2.vec3.vec4.ivec2.ivec3.ivec4.bvec2.bvec3.bvec4.mat2.mat3.mat4.sampler2D.samplerCube..sampler2DShadow.samplerCubeShadow.sampler3D.....sampler2DArray.uint.uvec2.uvec3.uvec4.............isampler2D.usampler2D.isamplerCube.usamplerCube.isampler3D.usampler3D.isampler2DArray.usampler2DArray`.split(`.`),Bt=[[`bool`],[`i32`],[`f32`],[`vec2f`,`vec2<f32>`],[`vec3f`,`vec3<f32>`],[`vec4f`,`vec4<f32>`],[`vec2i`,`vec2<i32>`],[`vec3i`,`vec3<i32>`],[`vec4i`,`vec4<i32>`],[`vec2<bool>`],[`vec3<bool>`],[`vec4<bool>`],[`mat2x2f`,`mat2x2<f32>`],[`mat3x3f`,`mat3x3<f32>`],[`mat4x4f`,`mat4x4<f32>`],[`texture_2d<f32>`],[`texture_cube<f32>`],[`array<f32>`],[`texture_depth_2d`],[`texture_depth_cube`],[`texture_3d<f32>`],[`array<vec2<f32>>`],[`array<vec3<f32>>`],[`array<vec4<f32>>`],[`array<mat4x4<f32>>`],[`texture_2d_array<f32>`],[`u32`],[`vec2u`,`vec2<u32>`],[`vec3u`,`vec3<u32>`],[`vec4u`,`vec4<u32>`],[`array<i32>`],[`array<u32>`],[`array<bool>`],[`array<vec2i>`,`array<vec2<i32>>`],[`array<vec2u>`,`array<vec2<u32>>`],[`array<vec2b>`,`array<vec2<bool>>`],[`array<vec3i>`,`array<vec3<i32>>`],[`array<vec3u>`,`array<vec3<u32>>`],[`array<vec3b>`,`array<vec3<bool>>`],[`array<vec4i>`,`array<vec4<i32>>`],[`array<vec4u>`,`array<vec4<u32>>`],[`array<vec4b>`,`array<vec4<bool>>`],[`texture_2d<i32>`],[`texture_2d<u32>`],[`texture_cube<i32>`],[`texture_cube<u32>`],[`texture_3d<i32>`],[`texture_3d<u32>`],[`texture_2d_array<i32>`],[`texture_2d_array<u32>`]],Vt=new Map;Bt.forEach((e,t)=>{e.forEach(e=>Vt.set(e,t))}),new Uint8Array([4,4,6,6,6,6,4,4,4,4,4,4,6,6,6,4,4,6,4,4,4,6,6,6,6,4,5,5,5,5,4,5,4,4,5,4,4,5,4,4,5,4,4,5,4,5,4,5,4,5]);var Ht=`webgl2`,Ut=[`view`,`mesh`,`mesh_ub`],Wt=`default`,Gt=`_unused_float_uniform`,Kt=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Uint16Array],qt=[1,1,2,2,4,4,4,2],Jt=[Uint8Array,Uint16Array,Uint32Array],Yt=[1,2,4],Xt=new Map([[`float`,`f32`],[`vec2`,`vec2f`],[`vec3`,`vec3f`],[`vec4`,`vec4f`],[`int`,`i32`],[`ivec2`,`vec2i`],[`ivec3`,`vec3i`],[`ivec4`,`vec4i`],[`uint`,`u32`],[`uvec2`,`vec2u`],[`uvec3`,`vec3u`],[`uvec4`,`vec4u`]]),F={};F[P]=0,F[Ze]=1,F[$e]=2,F[et]=3,F[tt]=4,F[rt]=5,F[it]=6,F[at]=7,F[ot]=8,F[st]=9,F[ct]=10,F[lt]=11,F[ut]=12,F[Qe]=13,F[dt]=0,F[ft]=1,F[pt]=2,F[mt]=3,F[ht]=4,F[gt]=5,F[_t]=6,F[vt]=7,F[yt]=8,F[bt]=9,F[xt]=10,F[St]=11,F[Ct]=12,F[wt]=13,F[Tt]=14,F[Et]=15;var Zt=0,Qt=class{constructor(e,t){v(this,`slot`,-1),v(this,`scopeId`,null),this.name=e,this.visibility=t}},$t=class extends Qt{},en=class extends Qt{constructor(e,t,n=!1){super(e,t),v(this,`format`,``),this.readOnly=n}},tn=class extends Qt{constructor(e,t,n=`2d`,r=0,i=!0,a=null,o=!1){super(e,t),v(this,`samplerName`,null),v(this,`hasSampler`,void 0),v(this,`multisampled`,void 0),this.textureDimension=n,this.multisampled=o,this.hasSampler=!o&&i,this.samplerName=o?null:a??`${e}_sampler`,this.sampleType=o&&r===0?1:r}},nn=class extends Qt{constructor(e,t=7,n=`2d`,r=!0,i=!1){super(e,4),this.format=t,this.textureDimension=n,this.write=r,this.read=i}},rn=class{constructor(e,t){v(this,`uniformBufferFormats`,[]),v(this,`textureFormats`,[]),v(this,`storageTextureFormats`,[]),v(this,`storageBufferFormats`,[]),this.id=Zt++;let n=0;t.forEach(e=>{e.slot=n++,e instanceof tn&&e.hasSampler&&n++,e instanceof $t?this.uniformBufferFormats.push(e):e instanceof tn?this.textureFormats.push(e):e instanceof nn?this.storageTextureFormats.push(e):e instanceof en&&this.storageBufferFormats.push(e)}),this.device=e;let r=e.scope;this.bufferFormatsMap=new Map,this.uniformBufferFormats.forEach((e,t)=>this.bufferFormatsMap.set(e.name,t)),this.textureFormatsMap=new Map,this.textureFormats.forEach((e,t)=>{this.textureFormatsMap.set(e.name,t),e.scopeId=r.resolve(e.name)}),this.storageTextureFormatsMap=new Map,this.storageTextureFormats.forEach((e,t)=>{this.storageTextureFormatsMap.set(e.name,t),e.scopeId=r.resolve(e.name)}),this.storageBufferFormatsMap=new Map,this.storageBufferFormats.forEach((e,t)=>{this.storageBufferFormatsMap.set(e.name,t),e.scopeId=r.resolve(e.name)}),this.impl=e.createBindGroupFormatImpl(this)}destroy(){this.impl.destroy()}getTexture(e){let t=this.textureFormatsMap.get(e);return t===void 0?null:this.textureFormats[t]}getStorageTexture(e){let t=this.storageTextureFormatsMap.get(e);return t===void 0?null:this.storageTextureFormats[t]}loseContext(){}},an=class{constructor(){v(this,`_cache`,new Map)}get(e,t){return this._cache.has(e)||(this._cache.set(e,t()),e.on(`destroy`,()=>{this.remove(e)}),e.on(`devicelost`,()=>{this._cache.get(e)?.loseContext?.(e)})),this._cache.get(e)}remove(e){this._cache.get(e)?.destroy?.(e),this._cache.delete(e)}},on=class e{static calcLevelDimension(e,t){return Math.max(e>>t,1)}static calcMipLevelsCount(e,t,n=1){return 1+Math.floor(Math.log2(Math.max(e,t,n)))}static calcLevelGpuSize(e,t,n,r){let i=Fe.get(r),a=Fe.get(r)?.size??0;if(a>0)return e*t*n*a;let o=i.blockSize??0,s=Math.floor((e+3)/4),c=Math.floor((t+3)/4),l=Math.floor((n+3)/4);return(r===24||r===25)&&(s=Math.max(Math.floor(s/2),1)),s*c*l*o}static calcGpuSize(t,n,r,i,a,o){let s=0;for(;s+=e.calcLevelGpuSize(t,n,r,i),!(!a||t===1&&n===1&&r===1);)t=Math.max(t>>1,1),n=Math.max(n>>1,1),r=Math.max(r>>1,1);return s*(o?6:1)}static calcTextureSize(e,t,n=1){let r=Math.ceil(Math.sqrt(e));return n>1&&(r=E.roundUp(r,n)),t.set(r,Math.ceil(e/r))}},sn=class{constructor(){v(this,`map`,new Map),v(this,`id`,0)}get(e){let t=this.map.get(e);return t===void 0&&(t=this.id++,this.map.set(e,t)),t}},cn=new sn,ln=class{constructor(e,t=0,n=1,r=0,i=1){v(this,`texture`,void 0),v(this,`baseMipLevel`,void 0),v(this,`mipLevelCount`,void 0),v(this,`baseArrayLayer`,void 0),v(this,`arrayLayerCount`,void 0),v(this,`key`,void 0),this.texture=e,this.baseMipLevel=t,this.mipLevelCount=n,this.baseArrayLayer=r,this.arrayLayerCount=i,this.key=cn.get(`${t}:${n}:${r}:${i}`)}},un=0,dn=class e{static createDataTexture2D(t,n,r,i,a,o){return new e(t,{name:n,width:r,height:i,format:a,mipmaps:!1,minFilter:0,magFilter:0,addressU:1,addressV:1,levels:o})}constructor(e,t={}){v(this,`name`,void 0),v(this,`_gpuSize`,0),v(this,`releaseSourceAfterUpload`,!1),v(this,`id`,un++),v(this,`_invalid`,!1),v(this,`_lockedLevel`,-1),v(this,`_lockedMode`,0),v(this,`renderVersionDirty`,0),v(this,`uploadVersion`,0),v(this,`_storage`,!1),v(this,`_samples`,1),v(this,`_numLevels`,0),v(this,`_numLevelsRequested`,void 0),this.device=e,this.name=t.name??``,this._width=Math.floor(t.width??4),this._height=Math.floor(t.height??4);let n=t.format??7;this._format=t.srgb?qe(n):n,this._compressed=Ie(this._format),this._integerFormat=Re(this._format),this._integerFormat&&(t.minFilter=0,t.magFilter=0),this._volume=t.volume??!1,this._depth=Math.floor(t.depth??1),this._arrayLength=Math.floor(t.arrayLength??0),this._storage=t.storage??!1,this._cubemap=t.cubemap??!1,this._flipY=t.flipY??!1,this._premultiplyAlpha=t.premultiplyAlpha??!1,(t.samples??1)>1&&e.isWebGPU&&(this._samples=e.maxSamples),this._mipmaps=(t.mipmaps??!0)&&this._samples===1,this._numLevelsRequested=t.numLevels,t.numLevels!==void 0&&(this._numLevels=t.numLevels),this._updateNumLevels(),this._minFilter=t.minFilter??5,this._magFilter=t.magFilter??1,this._anisotropy=t.anisotropy??1,this._addressU=t.addressU??0,this._addressV=t.addressV??0,this._addressW=t.addressW??0,this._compareOnRead=t.compareOnRead??!1,this._compareFunc=t.compareFunc??1,this._type=t.type??`default`,this.projection=Pt,this._cubemap?this.projection=Ft:t.projection&&t.projection!==`cube`&&(this.projection=t.projection),this._levels=t.levels;let r=!!t.levels;this._levels||this._clearLevels(),this.recreateImpl(r),this._samples>1&&(this._gpuSize=this.gpuSize,this.adjustVramSizeTracking(e._vram,this._gpuSize))}destroy(){let e=this.device;e&&(e.onTextureDestroyed(this),this.impl.destroy(e),this.adjustVramSizeTracking(e._vram,-this._gpuSize),this.releaseSourceAfterUpload&&this.releaseImageSources(),this._levels=null,this.device=null)}releaseImageSources(){if(this.releaseSourceAfterUpload=!1,!(typeof ImageBitmap>`u`||!this._levels))for(let e=0;e<this._levels.length;e++){let t=this._levels[e];if(t instanceof ImageBitmap)t.close(),this._levels[e]=null;else if(Array.isArray(t))for(let e=0;e<t.length;e++)t[e]instanceof ImageBitmap&&(t[e].close(),t[e]=null)}}setReleaseSourceAfterUpload(){this.releaseSourceAfterUpload=!0,!this._needsUpload&&!this._needsMipmapsUpload&&this.releaseImageSources()}recreateImpl(e=!0){let{device:t}=this;this.impl?.destroy(t),this.impl=null,this.impl=t.createTextureImpl(this),this.dirtyAll(),e&&this.upload()}_clearLevels(){this._levels=this._cubemap?[[null,null,null,null,null,null]]:[null]}resize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){let r=this.device;this.adjustVramSizeTracking(r._vram,-this._gpuSize),this._gpuSize=0,this.impl.destroy(r),this._clearLevels(),this._width=Math.floor(e),this._height=Math.floor(t),this._depth=Math.floor(n),this._updateNumLevels(),this.impl=r.createTextureImpl(this),this.dirtyAll(),this._samples>1&&(this._gpuSize=this.gpuSize,this.adjustVramSizeTracking(r._vram,this._gpuSize))}}loseContext(){this.impl.loseContext(),this.dirtyAll()}adjustVramSizeTracking(e,t){e.tex+=t}propertyChanged(e){this.impl.propertyChanged(e),this.renderVersionDirty=this.device.renderVersion}_updateNumLevels(){let e=this.mipmaps?on.calcMipLevelsCount(this.width,this.height):1,t=this._numLevelsRequested;this._numLevels=Math.min(t??e,e),this._mipmaps=this._numLevels>1}get lockedMode(){return this._lockedMode}set minFilter(e){this._minFilter!==e&&(Re(this._format)||(this._minFilter=e,this.propertyChanged(1)))}get minFilter(){return this._minFilter}set magFilter(e){this._magFilter!==e&&(Re(this._format)||(this._magFilter=e,this.propertyChanged(2)))}get magFilter(){return this._magFilter}set addressU(e){this._addressU!==e&&(this._addressU=e,this.propertyChanged(4))}get addressU(){return this._addressU}set addressV(e){this._addressV!==e&&(this._addressV=e,this.propertyChanged(8))}get addressV(){return this._addressV}set addressW(e){this._volume&&e!==this._addressW&&(this._addressW=e,this.propertyChanged(16))}get addressW(){return this._addressW}set compareOnRead(e){this._compareOnRead!==e&&(this._compareOnRead=e,this.propertyChanged(32))}get compareOnRead(){return this._compareOnRead}set compareFunc(e){this._compareFunc!==e&&(this._compareFunc=e,this.propertyChanged(64))}get compareFunc(){return this._compareFunc}set anisotropy(e){this._anisotropy!==e&&(this._anisotropy=e,this.propertyChanged(128))}get anisotropy(){return this._anisotropy}set mipmaps(e){if(this._mipmaps!==e&&!Re(this._format)){let t=this._mipmaps,n=this._numLevels;this._mipmaps=e,this._updateNumLevels(),(this.array||this.device.isWebGPU)&&this._numLevels!==n?this.recreateImpl():this._mipmaps!==t&&(this.propertyChanged(1),this._mipmaps?(this._needsMipmapsUpload=!0,this.device?.texturesToUpload?.add(this)):this._needsMipmapsUpload=!1)}}get mipmaps(){return this._mipmaps}get numLevels(){return this._numLevels}get storage(){return this._storage}get samples(){return this._samples}get width(){return this._width}get height(){return this._height}get depth(){return this._depth}get format(){return this._format}get cubemap(){return this._cubemap}get gpuSize(){let e=this._mipmaps&&!(this._compressed&&this._levels.length===1);return on.calcGpuSize(this._width,this._height,this._depth,this._format,e,this._cubemap)*this._samples}get array(){return this._arrayLength>0}get arrayLength(){return this._arrayLength}get volume(){return this._volume}set type(e){this._type!==e&&(this._type=e,this.device._shadersDirty=!0)}get type(){return this._type}set rgbm(e){this.type=e?Ot:Dt}get rgbm(){return this.type===Ot}set swizzleGGGR(e){this.type=e?jt:Dt}get swizzleGGGR(){return this.type===jt}get _glTexture(){return this.impl._glTexture}set srgb(e){if(e!==Le(this.format)){if(e){let e=qe(this.format);this._format!==e&&(this._format=e,this.recreateImpl(),this.device._shadersDirty=!0)}else{let e=Je(this.format);this._format!==e&&(this._format=e,this.recreateImpl(),this.device._shadersDirty=!0)}}}get srgb(){return Le(this.format)}set flipY(e){this._flipY!==e&&(this._flipY=e,this.markForUpload())}get flipY(){return this._flipY}set premultiplyAlpha(e){this._premultiplyAlpha!==e&&(this._premultiplyAlpha=e,this.markForUpload())}get premultiplyAlpha(){return this._premultiplyAlpha}get pot(){return E.powerOfTwo(this._width)&&E.powerOfTwo(this._height)}get encoding(){switch(this.type){case Ot:return`rgbm`;case kt:return`rgbe`;case At:return`rgbp`}return Ye(this.format)?`srgb`:`linear`}dirtyAll(){this._levelsUpdated=this._cubemap?[[!0,!0,!0,!0,!0,!0]]:[!0],this.markForUpload(),this._needsMipmapsUpload=this._mipmaps,this._mipmapsUploaded=!1,this.propertyChanged(255)}lock(e={}){e.level??(e.level=0),e.face??(e.face=0),e.mode??(e.mode=2),this._lockedMode=e.mode,this._lockedLevel=e.level;let t=this.cubemap?this._levels[e.face]:this._levels;if(!t[e.level]){let n=Math.max(1,this._width>>e.level),r=Math.max(1,this._height>>e.level),i=Math.max(1,this._depth>>e.level),a=new ArrayBuffer(on.calcLevelGpuSize(n,r,i,this._format));t[e.level]=new(Xe(this._format))(a)}return t[e.level]}setSource(e,t=0){if(this.device._isHTMLElementInterface(e)&&(!this.device.supportsHtmlTextures||this._cubemap||this._volume))return;let n=!1,r,i;if(this._cubemap){if(e[0]){r=e[0].width||0,i=e[0].height||0;for(let t=0;t<6;t++){let a=e[t];if(!a||a.width!==r||a.height!==i||!this.device._isBrowserInterface(a)){n=!0;break}}}else n=!0;if(!n)for(let n=0;n<6;n++)this._levels[t][n]!==e[n]&&(this._levelsUpdated[t][n]=!0)}else if(this.device._isBrowserInterface(e)||(n=!0),!n){if(e!==this._levels[t]&&(this._levelsUpdated[t]=!0),e instanceof HTMLVideoElement)r=e.videoWidth,i=e.videoHeight;else if(this.device._isHTMLElementInterface(e)){let t=e.getBoundingClientRect();r=Math.floor(t.width)||1,i=Math.floor(t.height)||1}else r=e.width,i=e.height}if(n){if(this._width=4,this._height=4,this._cubemap)for(let e=0;e<6;e++)this._levels[t][e]=null,this._levelsUpdated[t][e]=!0;else this._levels[t]=null,this._levelsUpdated[t]=!0}else t===0&&(this._width=r,this._height=i),this._levels[t]=e;(this._invalid!==n||!n)&&(this._invalid=n,this.upload())}getSource(e=0){return this._levels[e]}unlock(){this._lockedMode,this._lockedMode===2&&this.upload(),this._lockedLevel=-1,this._lockedMode=0}markForUpload(){this._needsUpload=!0,this.device&&(this.uploadVersion=this.device.renderVersion),this.device?.texturesToUpload?.add(this)}upload(){this.markForUpload(),this._needsMipmapsUpload=this._mipmaps,this.impl.uploadImmediate?.(this.device,this)}read(e,t,n,r,i={}){return this.impl.read?.(e,t,n,r,i)}write(e,t,n,r,i){return this.impl.write?.(e,t,n,r,i)}_validateCopy(e,t){return!0}copy(e,t={}){return this._validateCopy(e,t)?this.impl.copy?.(e,t)??!0:!1}getView(e=0,t=1,n=0,r=1){return new ln(this,e,t,n,r)}},fn={white:[255,255,255,255],gray:[128,128,128,255],black:[0,0,0,255],normal:[128,128,255,255],pink:[255,128,255,255]},pn=class{constructor(){v(this,`map`,new Map)}destroy(){this.map.forEach(e=>{e.destroy()})}},mn=new an,hn=(e,t)=>{let n=mn.get(e,()=>new pn);if(!n.map.has(t)){let r=new dn(e,{name:`built-in-texture-${t}`,width:1,height:1,format:7}),i=r.lock(),a=fn[t];i.set(a),r.unlock(),n.map.set(t,r)}return n.map.get(t)},gn=0,_n=class{constructor(){v(this,`bindGroup`,void 0),v(this,`offsets`,[])}},vn=class{constructor(e,t,n){v(this,`renderVersionUpdated`,-1),v(this,`uniformBuffers`,void 0),v(this,`uniformBufferOffsets`,[]),v(this,`_uniformBufferContainers`,[]),v(this,`_textureImpls`,[]),v(this,`_storageTextureImpls`,[]),this.id=gn++,this.device=e,this.format=t,this.dirty=!0,this.impl=e.createBindGroupImpl(this),this.textures=[],this.storageTextures=[],this.storageBuffers=[],this.uniformBuffers=[],this.defaultUniformBuffer=n,n&&this.setUniformBuffer(Wt,n)}destroy(){this.impl.destroy(),this.impl=null,this.format=null,this.defaultUniformBuffer=null}setUniformBuffer(e,t){let n=this.format.bufferFormatsMap.get(e);this.uniformBuffers[n]!==t&&(this.uniformBuffers[n]=t,this.dirty=!0)}setStorageBuffer(e,t){let n=this.format.storageBufferFormatsMap.get(e);this.storageBuffers[n]!==t&&(this.storageBuffers[n]=t,this.dirty=!0)}setTexture(e,t){let n=this.format.textureFormatsMap.get(e),r=t instanceof ln?t.texture:t;this.textures[n]===t?(this.renderVersionUpdated<r.renderVersionDirty||this._textureImpls[n]!==r.impl)&&(this.dirty=!0):(this.textures[n]=t,this.dirty=!0),this._textureImpls[n]=r.impl}setStorageTexture(e,t){let n=this.format.storageTextureFormatsMap.get(e),r=t instanceof ln?t.texture:t;this.storageTextures[n]===t?(this.renderVersionUpdated<r.renderVersionDirty||this._storageTextureImpls[n]!==r.impl)&&(this.dirty=!0):(this.storageTextures[n]=t,this.dirty=!0),this._storageTextureImpls[n]=r.impl}updateUniformBuffers(){for(let e=0;e<this.uniformBuffers.length;e++)this.uniformBuffers[e].update()}update(){let{textureFormats:e,storageTextureFormats:t,storageBufferFormats:n}=this.format;for(let t=0;t<e.length;t++){let n=e[t],r=n.scopeId.value;r||(n.name===`uSceneDepthMap`&&(r=hn(this.device,`white`)),n.name===`uSceneColorMap`&&(r=hn(this.device,`pink`)),r||(r=hn(this.device,`pink`))),this.setTexture(n.name,r)}for(let e=0;e<t.length;e++){let n=t[e],r=n.scopeId.value;this.setStorageTexture(n.name,r)}for(let e=0;e<n.length;e++){let t=n[e],r=t.scopeId.value;this.setStorageBuffer(t.name,r)}this.uniformBufferOffsets.length=this.uniformBuffers.length;for(let e=0;e<this.uniformBuffers.length;e++){let t=this.uniformBuffers[e];if(this.uniformBufferOffsets[e]=t.offset,!t.persistent){let n=t.allocation.gpuBuffer;this._uniformBufferContainers[e]!==n&&(this._uniformBufferContainers[e]=n,this.dirty=!0)}}this.dirty&&(this.dirty=!1,this.renderVersionUpdated=this.device.renderVersion,this.impl.update(this))}},I={set(e,t,n,r=1){return e&~(r<<n)|t<<n},get(e,t,n=1){return e>>t&n},all(e,t,n=1){let r=n<<t;return(e&r)===r},any(e,t,n=1){return(e&n<<t)!==0}},yn,bn=new sn,xn=7,Sn=31,Cn=0,wn=3,Tn=8,En=13,Dn=16,On=21,kn=26,An=27,jn=28,Mn=29,Nn=30,Pn=15,Fn=kn,In=1<<31,Ln=2147483647,Rn=8,zn=e=>e>=13&&e<=16,Bn=e=>zn(I.get(e,wn,Sn))||zn(I.get(e,Tn,Sn))||zn(I.get(e,Dn,Sn))||zn(I.get(e,On,Sn)),Vn=class e{constructor(e=!1,t=0,n=1,r=0,i,a,o,s=!0,c=!0,l=!0,u=!0){v(this,`attachment0`,0),v(this,`_attachments`,null),v(this,`_key`,0),v(this,`_keyDirty`,!1),this.setColorBlend(t,n,r),this.setAlphaBlend(i??t,a??n,o??r),this.setColorWrite(s,c,l,u),this.blend=e}set blend(e){this.attachment0=I.set(this.attachment0,+!!e,Nn),this._keyDirty=!0}get blend(){return I.all(this.attachment0,Nn)}setColorBlend(e,t,n){this.attachment0=I.set(this.attachment0,e,Cn,xn),this.attachment0=I.set(this.attachment0,t,wn,Sn),this.attachment0=I.set(this.attachment0,n,Tn,Sn),this._keyDirty=!0}setAlphaBlend(e,t,n){this.attachment0=I.set(this.attachment0,e,En,xn),this.attachment0=I.set(this.attachment0,t,Dn,Sn),this.attachment0=I.set(this.attachment0,n,On,Sn),this._keyDirty=!0}setColorWrite(e,t,n,r){this.redWrite=e,this.greenWrite=t,this.blueWrite=n,this.alphaWrite=r}get colorOp(){return I.get(this.attachment0,Cn,xn)}get colorSrcFactor(){return I.get(this.attachment0,wn,Sn)}get colorDstFactor(){return I.get(this.attachment0,Tn,Sn)}get alphaOp(){return I.get(this.attachment0,En,xn)}get alphaSrcFactor(){return I.get(this.attachment0,Dn,Sn)}get alphaDstFactor(){return I.get(this.attachment0,On,Sn)}set redWrite(e){this.attachment0=I.set(this.attachment0,+!!e,kn),this._keyDirty=!0}get redWrite(){return I.all(this.attachment0,kn)}set greenWrite(e){this.attachment0=I.set(this.attachment0,+!!e,An),this._keyDirty=!0}get greenWrite(){return I.all(this.attachment0,An)}set blueWrite(e){this.attachment0=I.set(this.attachment0,+!!e,jn),this._keyDirty=!0}get blueWrite(){return I.all(this.attachment0,jn)}set alphaWrite(e){this.attachment0=I.set(this.attachment0,+!!e,Mn),this._keyDirty=!0}get alphaWrite(){return I.all(this.attachment0,Mn)}get allWrite(){return I.get(this.attachment0,Fn,Pn)}get hasAttachmentOverrides(){return this.attachment0<0}setAttachment(e,t){this._attachments??(this._attachments=new Int32Array(Rn)),this._attachments[e]=t?t.attachment0&Ln:0,this._attachmentsUpdated()}clearAttachment(e){this.setAttachment(e,null)}getAttachment(e,t){let n=this.hasAttachmentOverrides?this._attachments[e]:0;return t.attachment0=n===0?this.attachment0&Ln:n,t}_attachmentsUpdated(){let e=this._attachments,t=!1;for(let n=1;n<Rn;n++)if(e[n]!==0){t=!0;break}this.attachment0=t?this.attachment0|In:this.attachment0&Ln,t?this._evalKey():this._keyDirty=!1}_evalKey(){this._key=In|bn.get(`${this.attachment0}-${this._attachments.join(`-`)}`),this._keyDirty=!1}get usesDualSourceBlending(){if(Bn(this.attachment0))return!0;if(this.hasAttachmentOverrides){let e=this._attachments;for(let t=1;t<Rn;t++)if(e[t]!==0&&Bn(e[t]))return!0}return!1}copy(e){return this.attachment0=e.attachment0,e.hasAttachmentOverrides&&(this._attachments??(this._attachments=new Int32Array(Rn)),this._attachments.set(e._attachments)),this._key=e._key,this._keyDirty=e._keyDirty,this}clone(){return new this.constructor().copy(this)}get key(){return this.attachment0>=0?this.attachment0:(this._keyDirty&&this._evalKey(),this._key)}equals(e){return this.key===e.key}static get DEFAULT(){return e.NOBLEND}};yn=Vn,v(Vn,`NOBLEND`,Object.freeze(new yn)),v(Vn,`NOWRITE`,Object.freeze(new yn(void 0,void 0,void 0,void 0,void 0,void 0,void 0,!1,!1,!1,!1))),v(Vn,`ALPHABLEND`,Object.freeze(new yn(!0,0,6,8))),v(Vn,`ADDBLEND`,Object.freeze(new yn(!0,0,1,1)));var Hn,Un=new sn,Wn=7,Gn=0,Kn=3,qn=class{constructor(e=3,t=!0){v(this,`data`,0),v(this,`_depthBias`,0),v(this,`_depthBiasSlope`,0),v(this,`key`,0),this.func=e,this.write=t}set test(e){this.func=e?3:7,this.updateKey()}get test(){return this.func!==7}set write(e){this.data=I.set(this.data,+!!e,Kn),this.updateKey()}get write(){return I.all(this.data,Kn)}set func(e){this.data=I.set(this.data,e,Gn,Wn),this.updateKey()}get func(){return I.get(this.data,Gn,Wn)}set depthBias(e){this._depthBias=e,this.updateKey()}get depthBias(){return this._depthBias}set depthBiasSlope(e){this._depthBiasSlope=e,this.updateKey()}get depthBiasSlope(){return this._depthBiasSlope}copy(e){return this.data=e.data,this._depthBias=e._depthBias,this._depthBiasSlope=e._depthBiasSlope,this.key=e.key,this}clone(){return new this.constructor().copy(this)}updateKey(){let{data:e,_depthBias:t,_depthBiasSlope:n}=this,r=`${e}-${t}-${n}`;this.key=Un.get(r)}equals(e){return this.key===e.key}};Hn=qn,v(qn,`DEFAULT`,Object.freeze(new Hn)),v(qn,`NODEPTH`,Object.freeze(new Hn(7,!1))),v(qn,`WRITEDEPTH`,Object.freeze(new Hn(7,!0)));var Jn=class{static createStorageView(e,t,n=0,r){let i=e.storage,a=ArrayBuffer.isView(i),o=a?i.buffer:i,s=(a?i.byteOffset:0)+n,c=t.BYTES_PER_ELEMENT;return new t(o,s,r??Math.floor((e.numBytes-n)/c))}},Yn=0,Xn=class{constructor(e,t,n,r=0,i,a){this.device=e,this.format=t,this.numIndices=n,this.usage=r,this.id=Yn++,this.impl=e.createIndexBufferImpl(this,a);let o=Yt[t];this.bytesPerIndex=o,this.numBytes=this.numIndices*o,i?this.setData(i):this.storage=new ArrayBuffer(this.numBytes),this.adjustVramSizeTracking(e._vram,this.numBytes),this.device.buffers.add(this)}destroy(){let e=this.device;e.buffers.delete(this),this.device.indexBuffer===this&&(this.device.indexBuffer=null),this.impl.initialized&&(this.impl.destroy(e),this.adjustVramSizeTracking(e._vram,-this.storage.byteLength))}adjustVramSizeTracking(e,t){e.ib+=t}loseContext(){this.impl.loseContext()}restoreContext(){this.unlock()}getFormat(){return this.format}getNumIndices(){return this.numIndices}lock(){return this.storage}unlock(){this.impl.unlock(this)}setData(e){return e.byteLength===this.numBytes&&(this.storage=e,this.unlock(),!0)}writeData(e,t){let n=Jn.createStorageView(this,Jt[this.format]);if(e.length>t){if(ArrayBuffer.isView(e))e=e.subarray(0,t),n.set(e);else for(let r=0;r<t;r++)n[r]=e[r]}else n.set(e);this.unlock()}readData(e){let t=Jn.createStorageView(this,Jt[this.format]),n=this.numIndices;if(ArrayBuffer.isView(e))e.set(e.length>=n?t:t.subarray(0,e.length));else{e.length=0;for(let r=0;r<n;r++)e[r]=t[r]}return n}},Zn=class{constructor(){v(this,`globalId`,0),v(this,`revision`,0)}equals(e){return this.globalId===e.globalId&&this.revision===e.revision}copy(e){this.globalId=e.globalId,this.revision=e.revision}reset(){this.globalId=0,this.revision=0}},Qn=0,$n=class{constructor(){Qn++,this.version=new Zn,this.version.globalId=Qn}increment(){this.version.revision++}},er=class{constructor(e){this.name=e,this.value=null,this.versionObject=new $n}toJSON(e){}setValue(e){this.value=e,this.versionObject.increment()}getValue(){return this.value}},tr=class{constructor(e){this.name=e,this.variables=new Map}resolve(e){return this.variables.has(e)||this.variables.set(e,new er(e)),this.variables.get(e)}removeValue(e){for(let t of this.variables.values())t.value===e&&(t.value=null)}},nr=0,rr=class{constructor(e,t,n,r){v(this,`usage`,0),v(this,`_vaoKeyPart`,null),this.usage=r?.usage??0,this.device=e,this.format=t,this.numVertices=n,this.id=nr++,this.impl=e.createVertexBufferImpl(this,t,r),this.numBytes=t.verticesByteSize?t.verticesByteSize:t.size*n,this.adjustVramSizeTracking(e._vram,this.numBytes);let i=r?.data;i?this.setData(i):this.storage=new ArrayBuffer(this.numBytes),this.device.buffers.add(this)}get vaoKeyPart(){return this._vaoKeyPart??(this._vaoKeyPart=`${this.id}_${this.format.renderingHash}_`),this._vaoKeyPart}destroy(){let e=this.device;e.buffers.delete(this),this.impl.initialized&&(this.impl.destroy(e),this.adjustVramSizeTracking(e._vram,-this.storage.byteLength))}adjustVramSizeTracking(e,t){e.vb+=t}loseContext(){this.impl.loseContext()}restoreContext(){this.unlock()}getFormat(){return this.format}getUsage(){return this.usage}getNumVertices(){return this.numVertices}lock(){return this.storage}unlock(){this.impl.unlock(this)}setData(e){return e.byteLength===this.numBytes&&(this.storage=e,this.unlock(),!0)}};function ir(e){if(e==null)return 0;let t=0;for(let n=0,r=e.length;n<r;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return t}function ar(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e[n],t*=16777619;return t>>>0}var or=new sn,sr=[2,4,8,12,16],cr=new an,lr=class e{constructor(e,t,n){this.device=e,this._elements=[],this.hasUv0=!1,this.hasUv1=!1,this.hasColor=!1,this.hasTangents=!1,this.verticesByteSize=0,this.vertexCount=n,this.interleaved=n===void 0,this.instancing=!1,this.size=t.reduce((e,t)=>e+Math.ceil(t.components*qt[t.type]/4)*4,0);let r=0,i;for(let e=0,a=t.length;e<a;e++){let a=t[e];i=a.components*qt[a.type],n&&(r=E.roundUp(r,i));let o=a.asInt??!1,s=o?!1:a.normalize??!1,c={name:a.semantic,offset:n?r:a.hasOwnProperty(`offset`)?a.offset:r,stride:n?i:a.hasOwnProperty(`stride`)?a.stride:this.size,dataType:a.type,numComponents:a.components,normalize:s,size:i,asInt:o};this._elements.push(c),r+=n?i*n:Math.ceil(i/4)*4,a.semantic===`TEXCOORD0`?this.hasUv0=!0:a.semantic===`TEXCOORD1`?this.hasUv1=!0:a.semantic===`COLOR`?this.hasColor=!0:a.semantic===`TANGENT`&&(this.hasTangents=!0)}n&&(this.verticesByteSize=r),this._evaluateHash()}get elements(){return this._elements}static getDefaultInstancingFormat(t){return cr.get(t,()=>new e(t,[{semantic:St,components:4,type:6},{semantic:Ct,components:4,type:6},{semantic:Tt,components:4,type:6},{semantic:Et,components:4,type:6}]))}static get defaultInstancingFormat(){return null}static isElementValid(e,t){let n=t.components*qt[t.type];return!(e.isWebGPU&&!sr.includes(n))}update(){this._evaluateHash()}_evaluateHash(){let e=[],t=[],n=this._elements.length;for(let r=0;r<n;r++){let{name:n,dataType:i,numComponents:a,normalize:o,offset:s,stride:c,size:l,asInt:u}=this._elements[r],d=n+i+a+o+u;e.push(d);let f=d+s+c+l;t.push(f)}e.sort();let r=e.join();this.batchingHash=ir(r),this.shaderProcessingHashString=r,this.renderingHashString=t.join(`_`),this.renderingHash=or.get(this.renderingHashString)}},ur,dr=new sn,fr=class{set func(e){this._func=e,this._dirty=!0}get func(){return this._func}set ref(e){this._ref=e,this._dirty=!0}get ref(){return this._ref}set fail(e){this._fail=e,this._dirty=!0}get fail(){return this._fail}set zfail(e){this._zfail=e,this._dirty=!0}get zfail(){return this._zfail}set zpass(e){this._zpass=e,this._dirty=!0}get zpass(){return this._zpass}set readMask(e){this._readMask=e,this._dirty=!0}get readMask(){return this._readMask}set writeMask(e){this._writeMask=e,this._dirty=!0}get writeMask(){return this._writeMask}constructor(e={}){v(this,`_func`,void 0),v(this,`_ref`,void 0),v(this,`_fail`,void 0),v(this,`_zfail`,void 0),v(this,`_zpass`,void 0),v(this,`_readMask`,void 0),v(this,`_writeMask`,void 0),v(this,`_dirty`,!0),v(this,`_key`,void 0),this._func=e.func??7,this._ref=e.ref??0,this._readMask=e.readMask??255,this._writeMask=e.writeMask??255,this._fail=e.fail??0,this._zfail=e.zfail??0,this._zpass=e.zpass??0,this._evalKey()}_evalKey(){let{_func:e,_ref:t,_fail:n,_zfail:r,_zpass:i,_readMask:a,_writeMask:o}=this,s=`${e},${t},${n},${r},${i},${a},${o}`;this._key=dr.get(s),this._dirty=!1}get key(){return this._dirty&&this._evalKey(),this._key}copy(e){return this._func=e._func,this._ref=e._ref,this._readMask=e._readMask,this._writeMask=e._writeMask,this._fail=e._fail,this._zfail=e._zfail,this._zpass=e._zpass,this._dirty=e._dirty,this._key=e._key,this}clone(){return new this.constructor().copy(this)}};ur=fr,v(fr,`DEFAULT`,Object.freeze(new ur));var L=new Vn,pr=new qn,mr=class t extends b{constructor(t,n){var r,i,a,o,s,c,l,u,d;super(),v(this,`canvas`,void 0),v(this,`backBuffer`,null),v(this,`backBufferSize`,new A),v(this,`backBufferFormat`,void 0),v(this,`backBufferAntialias`,!1),v(this,`isWebGPU`,!1),v(this,`isWebGL2`,!1),v(this,`isNull`,!1),v(this,`isHdr`,!1),v(this,`scope`,void 0),v(this,`maxIndirectDrawCount`,1024),v(this,`maxIndirectDispatchCount`,256),v(this,`maxAnisotropy`,void 0),v(this,`maxCubeMapSize`,void 0),v(this,`maxTextureSize`,void 0),v(this,`maxVolumeSize`,void 0),v(this,`maxColorAttachments`,1),v(this,`precision`,void 0),v(this,`samples`,void 0),v(this,`maxSamples`,1),v(this,`supportsStencil`,void 0),v(this,`supportsMultiDraw`,!0),v(this,`supportsCompute`,!1),v(this,`supportsStorageTextureRead`,!1),v(this,`supportsSubgroups`,!1),v(this,`supportsSubgroupSizeControl`,!1),v(this,`supportsSubgroupUniformity`,!1),v(this,`supportsSubgroupId`,!1),v(this,`supportsLinearIndexing`,!1),v(this,`supportsPointerCompositeAccess`,!1),v(this,`supportsPacked4x8IntegerDotProduct`,!1),v(this,`supportsTextureAndSamplerLet`,!1),v(this,`supportsUnrestrictedPointerParameters`,!1),v(this,`maxSubgroupSize`,0),v(this,`minSubgroupSize`,0),v(this,`renderTarget`,null),v(this,`shaders`,[]),v(this,`textures`,new Set),v(this,`texturesToUpload`,new Set),v(this,`targets`,new Set),v(this,`renderVersion`,0),v(this,`renderPassIndex`,void 0),v(this,`insideRenderPass`,!1),v(this,`supportsUniformBuffers`,!1),v(this,`supportsClipDistances`,!1),v(this,`supportsTransientAttachments`,!1),v(this,`supportsTextureFormatTier1`,!1),v(this,`supportsTextureFormatTier2`,!1),v(this,`supportsPrimitiveIndex`,!1),v(this,`supportsDualSourceBlending`,!1),v(this,`supportsIndependentBlending`,!1),v(this,`supportsShaderF16`,!1),v(this,`supportsHtmlTextures`,!1),v(this,`textureFloatRenderable`,void 0),v(this,`textureHalfFloatRenderable`,void 0),v(this,`textureRG11B10Renderable`,!1),v(this,`textureFloatFilterable`,!1),v(this,`textureFloatBlendable`,!1),v(this,`quadVertexBuffer`,void 0),v(this,`quadIndexBuffer`,void 0),v(this,`blendState`,new Vn),v(this,`depthState`,new qn),v(this,`stencilEnabled`,!1),v(this,`stencilFront`,new fr),v(this,`stencilBack`,new fr),v(this,`dynamicBuffers`,void 0),v(this,`gpuProfiler`,void 0),v(this,`_destroyed`,!1),v(this,`defaultClearOptions`,{color:[0,0,0,1],depth:1,stencil:0,flags:3}),v(this,`clientRect`,{width:0,height:0}),v(this,`_shadersDirty`,!1),v(this,`capsDefines`,new Map),v(this,`mapsToClear`,new Set),this.canvas=t,`setAttribute`in t&&t.setAttribute(`data-engine`,`PlayCanvas ${e}`),this.initOptions={...n},(r=this.initOptions).alpha??(r.alpha=!0),(i=this.initOptions).depth??(i.depth=!0),(a=this.initOptions).stencil??(a.stencil=!0),(o=this.initOptions).antialias??(o.antialias=!0),(s=this.initOptions).powerPreference??(s.powerPreference=`high-performance`),(c=this.initOptions).displayFormat??(c.displayFormat=`ldr`),(l=this.initOptions).transientColor??(l.transientColor=!1),(u=this.initOptions).transientDepth??(u.transientDepth=!1),(d=this.initOptions).xrCompatible??(d.xrCompatible=m.browser&&!!navigator.xr),this._maxPixelRatio=m.browser?Math.min(1,window.devicePixelRatio):1,this.buffers=new Set,this._vram={tex:0,vb:0,ib:0,ub:0,sb:0},this._shaderStats={vsCompiled:0,fsCompiled:0,linked:0,materialShaders:0,compileTime:0},this.initializeContextCaches(),this._drawCallsPerFrame=0,this._shaderSwitchesPerFrame=0,this._primsPerFrame=[];for(let e=0;e<=6;e++)this._primsPerFrame[e]=0;this._renderTargetCreationTime=0,this.scope=new tr(`Device`),this.textureBias=this.scope.resolve(`textureBias`),this.textureBias.setValue(0),this.updateClientRect()}postInit(){let e=new lr(this,[{semantic:P,components:2,type:6}]),t=new Float32Array([-1,-1,1,-1,-1,1,1,1]);this.quadVertexBuffer=new rr(this,e,4,{data:t});let n=new Uint16Array([0,1,2,2,1,3]);this.quadIndexBuffer=new Xn(this,1,6,0,n.buffer)}initCapsDefines(){let{capsDefines:e}=this;e.clear(),this.textureFloatFilterable&&e.set(`CAPS_TEXTURE_FLOAT_FILTERABLE`,``),this.textureFloatRenderable&&e.set(`CAPS_TEXTURE_FLOAT_RENDERABLE`,``),this.supportsMultiDraw&&e.set(`CAPS_MULTI_DRAW`,``),this.supportsDualSourceBlending&&e.set(`CAPS_DUAL_SOURCE_BLENDING`,``),this.supportsPrimitiveIndex&&e.set(`CAPS_PRIMITIVE_INDEX`,``),this.supportsShaderF16&&e.set(`CAPS_SHADER_F16`,``),this.supportsSubgroups&&e.set(`CAPS_SUBGROUPS`,``),this.supportsSubgroupSizeControl&&e.set(`CAPS_SUBGROUP_SIZE_CONTROL`,``),this.supportsSubgroupId&&e.set(`CAPS_SUBGROUP_ID`,``),this.supportsLinearIndexing&&e.set(`CAPS_LINEAR_INDEXING`,``),this.supportsUnrestrictedPointerParameters&&e.set(`CAPS_UNRESTRICTED_POINTER_PARAMETERS`,``),this.supportsPointerCompositeAccess&&e.set(`CAPS_POINTER_COMPOSITE_ACCESS`,``),this.supportsPacked4x8IntegerDotProduct&&e.set(`CAPS_PACKED_4X8_INTEGER_DOT_PRODUCT`,``),this.supportsTextureAndSamplerLet&&e.set(`CAPS_TEXTURE_AND_SAMPLER_LET`,``),this.supportsStorageTextureRead&&e.set(`CAPS_STORAGE_TEXTURE_READ`,``),m.desktop&&e.set(`PLATFORM_DESKTOP`,``),m.mobile&&e.set(`PLATFORM_MOBILE`,``),m.android&&e.set(`PLATFORM_ANDROID`,``),m.ios&&e.set(`PLATFORM_IOS`,``)}destroy(){this.fire(`destroy`),this.quadVertexBuffer?.destroy(),this.quadVertexBuffer=null,this.quadIndexBuffer?.destroy(),this.quadIndexBuffer=null,this.dynamicBuffers?.destroy(),this.dynamicBuffers=null,this.gpuProfiler?.destroy(),this.gpuProfiler=null,this._destroyed=!0}onDestroyShader(e){this.fire(`destroy:shader`,e);let t=this.shaders.indexOf(e);t!==-1&&this.shaders.splice(t,1)}onTextureDestroyed(e){this.textures.delete(e),this.texturesToUpload.delete(e),this.scope.removeValue(e)}postDestroy(){this.scope=null,this.canvas=null}loseContext(){this.contextLost=!0,this.backBufferSize.set(-1,-1);for(let e of this.textures)e.loseContext();for(let e of this.buffers)e.loseContext();for(let e of this.targets)e.loseContext();this.gpuProfiler?.loseContext()}restoreContext(){this.contextLost=!1,this.initializeRenderState(),this.initializeContextCaches();for(let e of this.buffers)e.restoreContext();this.gpuProfiler?.restoreContext?.()}toJSON(e){}initializeContextCaches(){this.vertexBuffers=[],this.shader=null,this.shaderValid=void 0,this.shaderAsyncCompile=!1,this.renderTarget=null}initializeRenderState(){this.blendState=new Vn,this.depthState=new qn,this.cullMode=1,this.frontFace=0,this.alphaToCoverage=!1,this.vx=this.vy=this.vw=this.vh=0,this.sx=this.sy=this.sw=this.sh=0,this.blendColor=new O(0,0,0,0)}get boneLimit(){return 1024}get webgl2(){return this.isWebGL2}get textureFloatHighPrecision(){return!0}get extBlendMinmax(){return!0}get extTextureHalfFloat(){return!0}get extTextureLod(){return!0}get textureHalfFloatFilterable(){return!0}get supportsMrt(){return!0}get supportsVolumeTextures(){return!0}get supportsInstancing(){return!0}get textureHalfFloatUpdatable(){return!0}get extTextureFloat(){return!0}get extStandardDerivatives(){return!0}setBlendFunction(e,t){let n=this.blendState;L.copy(n),L.setColorBlend(n.colorOp,e,t),L.setAlphaBlend(n.alphaOp,e,t),this.setBlendState(L)}setBlendFunctionSeparate(e,t,n,r){let i=this.blendState;L.copy(i),L.setColorBlend(i.colorOp,e,t),L.setAlphaBlend(i.alphaOp,n,r),this.setBlendState(L)}setBlendEquation(e){let t=this.blendState;L.copy(t),L.setColorBlend(e,t.colorSrcFactor,t.colorDstFactor),L.setAlphaBlend(e,t.alphaSrcFactor,t.alphaDstFactor),this.setBlendState(L)}setBlendEquationSeparate(e,t){let n=this.blendState;L.copy(n),L.setColorBlend(e,n.colorSrcFactor,n.colorDstFactor),L.setAlphaBlend(t,n.alphaSrcFactor,n.alphaDstFactor),this.setBlendState(L)}setColorWrite(e,t,n,r){let i=this.blendState;L.copy(i),L.setColorWrite(e,t,n,r),this.setBlendState(L)}getBlending(){return this.blendState.blend}setBlending(e){L.copy(this.blendState),L.blend=e,this.setBlendState(L)}setDepthWrite(e){pr.copy(this.depthState),pr.write=e,this.setDepthState(pr)}setDepthFunc(e){pr.copy(this.depthState),pr.func=e,this.setDepthState(pr)}setDepthTest(e){pr.copy(this.depthState),pr.test=e,this.setDepthState(pr)}getCullMode(){return this.cullMode}setStencilState(e,t){}setBlendState(e){}setBlendColor(e,t,n,r){}setDepthState(e){}setCullMode(e){}setFrontFace(e){}setDrawStates(e=Vn.NOBLEND,t=qn.NODEPTH,n=0,r=0,i,a){this.setBlendState(e),this.setDepthState(t),this.setCullMode(n),this.setFrontFace(r),this.setStencilState(i,a)}setRenderTarget(e){this.renderTarget=e}setVertexBuffer(e){e&&this.vertexBuffers.push(e)}clearVertexBuffer(){this.vertexBuffers.length=0}getIndirectDrawSlot(e=1){return 0}get indirectDrawBuffer(){return null}getIndirectDispatchSlot(e=1){return 0}get indirectDispatchBuffer(){return null}getRenderTarget(){return this.renderTarget}initRenderTarget(e){e.initialized||(e.init(),this.targets.add(e))}draw(e,t,n,r,i=!0,a=!0){}_isBrowserInterface(e){return this._isImageBrowserInterface(e)||this._isImageCanvasInterface(e)||this._isImageVideoInterface(e)||this._isHTMLElementInterface(e)}_isImageBrowserInterface(e){return typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement}_isImageCanvasInterface(e){return typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement}_isImageVideoInterface(e){return typeof HTMLVideoElement<`u`&&e instanceof HTMLVideoElement}_isHTMLElementInterface(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement&&!(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement)&&!(typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement)&&!(typeof HTMLVideoElement<`u`&&e instanceof HTMLVideoElement)}resizeCanvas(e,t){let n=Math.min(this._maxPixelRatio,m.browser?window.devicePixelRatio:1),r=Math.floor(e*n),i=Math.floor(t*n);(r!==this.canvas.width||i!==this.canvas.height)&&this.setResolution(r,i)}setResolution(e,n){this.canvas.width=e,this.canvas.height=n,this.fire(t.EVENT_RESIZE,e,n)}update(){this.updateClientRect()}updateClientRect(){if(typeof this.canvas.getBoundingClientRect==`function`){let e=this.canvas.getBoundingClientRect();this.clientRect.width=e.width,this.clientRect.height=e.height}else this.clientRect.width=this.canvas.width??0,this.clientRect.height=this.canvas.height??0}get width(){return this.canvas.width}get height(){return this.canvas.height}set fullscreen(e){}get fullscreen(){return!1}set maxPixelRatio(e){this._maxPixelRatio=e}get maxPixelRatio(){return this._maxPixelRatio}get deviceType(){return this._deviceType}startRenderPass(e){}endRenderPass(e){}startComputePass(e){}endComputePass(){}frameStart(){this.renderPassIndex=0,this.renderVersion++}frameEnd(){this.mapsToClear.forEach(e=>e.clear()),this.mapsToClear.clear()}computeDispatch(e,t=`Unnamed`){}getRenderableHdrFormat(e=[18,12,14],t=!0,n=1,r=!1){for(let i=0;i<e.length;i++){let a=e[i];switch(a){case 18:if(this.textureRG11B10Renderable)return a;break;case 50:case 51:case 12:if(this.textureHalfFloatRenderable)return a;break;case 15:case 70:case 14:if(this.isWebGPU&&n>1)continue;if(this.textureFloatRenderable&&(!t||this.textureFloatFilterable)&&(!r||this.textureFloatBlendable))return a}}}validateAttributes(e,t){}};v(mr,`EVENT_RESIZE`,`resizecanvas`);var hr=0,gr=class{constructor(e={}){v(this,`name`,void 0),v(this,`_device`,void 0),v(this,`_colorBuffer`,void 0),v(this,`_colorBuffers`,void 0),v(this,`_depthBuffer`,void 0),v(this,`_resolveBuffers`,null),v(this,`_depthResolveBuffer`,null),v(this,`_depth`,void 0),v(this,`_stencil`,void 0),v(this,`_samples`,void 0),v(this,`_transientColor`,void 0),v(this,`_transientDepth`,void 0),v(this,`autoResolve`,void 0),v(this,`_depthResolveMode`,`min`),v(this,`_face`,void 0),v(this,`_mipLevel`,void 0),v(this,`_mipmaps`,void 0),v(this,`_width`,void 0),v(this,`_height`,void 0),v(this,`_flipY`,void 0),v(this,`_origin`,void 0),this.id=hr++;let t=e.colorBuffer?.device??e.colorBuffers?.[0].device??e.depthBuffer?.device??e.graphicsDevice;this._device=t;let{maxSamples:n}=this._device,r=(e.colorBuffers??(e.colorBuffer?[e.colorBuffer]:void 0))?.find(e=>e?.samples>1),i=(e.depthBuffer?.samples??1)>1?e.depthBuffer:void 0,a=r??i,o=!!a;if(o?this._samples=a.samples:(this._samples=Math.min(e.samples??1,n),t.isWebGPU&&(this._samples=this._samples>1?n:1)),this._colorBuffer=e.colorBuffer,e.colorBuffer&&(this._colorBuffers=[e.colorBuffer]),this._depthBuffer=e.depthBuffer,this._face=e.face??0,this._depthBuffer){let e=this._depthBuffer._format;e===16||e===69?(this._depth=!0,this._stencil=!1):e===17?(this._depth=!0,this._stencil=!0):e===15&&this._depthBuffer.device.isWebGPU&&this._samples>1?(this._depth=!0,this._stencil=!1):(this._depth=!1,this._stencil=!1)}else this._depth=e.depth??!0,this._stencil=e.stencil??!1;e.colorBuffers&&(this._colorBuffers||(this._colorBuffers=[...e.colorBuffers],this._colorBuffer=e.colorBuffers[0]));let s=e.resolveBuffers??(e.resolveBuffer===void 0?void 0:[e.resolveBuffer]);s&&o&&(this._resolveBuffers=[...s]),e.depthResolveBuffer&&i&&(this._depthResolveBuffer=e.depthResolveBuffer),this.autoResolve=e.autoResolve??!0,this.name=e.name,this.name||(this.name=this._colorBuffer?.name),this.name||(this.name=this._depthBuffer?.name),this.name||(this.name=`Untitled`),this.depthResolveMode=e.depthResolveMode??`min`;let c=!!this._device.supportsTransientAttachments;this._transientColor=(e.transientColor??!1)&&c&&this._samples>1&&!o,e.transientColor,this._transientDepth=(e.transientDepth??!1)&&c&&!this._depthBuffer,(e.transientDepth??!1)&&this._depthBuffer,e.origin===`top`?(this._flipY=!t.isWebGPU,this._origin=`top`):e.origin===`bottom`?(this._flipY=t.isWebGPU,this._origin=Me):e.origin===`native`?(this._flipY=!1,this._origin=Ne):(e.flipY,this._flipY=e.flipY??!1,this._origin=this._flipY?t.isWebGPU?Me:`top`:Ne),this._mipLevel=e.mipLevel??0,this._mipLevel>0&&o&&(this._mipLevel=0),this._mipLevel>0&&this._depth&&(this._mipLevel=0),this._mipmaps=e.mipLevel===void 0,this.evaluateDimensions(),this.validateMrt(),this.impl=t.createRenderTargetImpl(this)}destroy(){let e=this._device;e&&(e.targets.delete(this),e.renderTarget===this&&e.setRenderTarget(null),this.destroyFrameBuffers())}destroyFrameBuffers(){let e=this._device;e&&this.impl.destroy(e)}destroyTextureBuffers(){this._depthBuffer?.destroy(),this._depthBuffer=null,this._colorBuffers?.forEach(e=>{e.destroy()}),this._colorBuffers=null,this._colorBuffer=null,this._resolveBuffers?.forEach(e=>{e?.destroy()}),this._resolveBuffers=null,this._depthResolveBuffer?.destroy(),this._depthResolveBuffer=null}resize(e,t){if(!(this.mipLevel>0)&&(this._depthBuffer?.resize(e,t),this._colorBuffers?.forEach(n=>{n.resize(e,t)}),this._resolveBuffers?.forEach(n=>{n?.resize(e,t)}),this._depthResolveBuffer?.resize(e,t),this._width!==e||this._height!==t)){this.destroyFrameBuffers();let e=this._device;e.renderTarget===this&&e.setRenderTarget(null),this.evaluateDimensions(),this.validateMrt(),this.impl=e.createRenderTargetImpl(this)}}validateMrt(){}evaluateDimensions(){let e=this._colorBuffer??this._depthBuffer;e&&(this._width=e.width,this._height=e.height,this._mipLevel>0&&(this._width=on.calcLevelDimension(this._width,this._mipLevel),this._height=on.calcLevelDimension(this._height,this._mipLevel)))}init(){this.impl.init(this._device,this)}get initialized(){return this.impl.initialized}get device(){return this._device}loseContext(){this.impl.loseContext()}resolve(e=!0,t=!!this._depthBuffer){this._device&&this._samples>1&&this.impl.resolve(this._device,this,e,t)}copy(e,t,n){if(!this._device){if(e._device)this._device=e._device;else return!1}return this._device.copyRenderTarget(e,this,t,n)}set flipY(e){this._flipY=e,this._origin=e?this._device.isWebGPU?Me:`top`:Ne}get flipY(){return this._flipY}get origin(){return this._origin}get samples(){return this._samples}set depthResolveMode(e){this._depthResolveMode=e}get depthResolveMode(){return this._depthResolveMode}get transientColor(){return this._transientColor}get transientDepth(){return this._transientDepth}get depth(){return this._depth}get stencil(){return this._stencil}get colorBuffer(){return this._colorBuffer}get colorBufferCount(){return this._colorBuffers?.length??0}getColorBuffer(e){return this._colorBuffers?.[e]}get resolveBuffer(){return this._resolveBuffers?.[0]??null}getResolveBuffer(e=0){return this._resolveBuffers?.[e]??null}get depthBuffer(){return this._depthBuffer}get depthResolveBuffer(){return this._depthResolveBuffer}get face(){return this._face}get mipLevel(){return this._mipLevel}get mipmaps(){return this._mipmaps}get width(){return this._width??this._device.width}get height(){return this._height??this._device.height}set _glFrameBuffer(e){}get _glFrameBuffer(){return this.impl._glFrameBuffer}isColorBufferSrgb(e=0){if(this.device.backBuffer===this)return Le(this.device.backBufferFormat);let t=this.getColorBuffer(e);return t?Le(t.format):!1}},_r={equals(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}},vr=class{constructor(){v(this,`_refCount`,0)}incRefCount(){this._refCount++}decRefCount(){this._refCount--}get refCount(){return this._refCount}},yr=class extends vr{constructor(e){super(),v(this,`object`,void 0),this.object=e,this.incRefCount()}},br=class{constructor(){v(this,`cache`,new Map)}destroy(){this.cache.forEach(e=>{e.object?.destroy()}),this.cache.clear()}clear(){this.cache.clear()}get(e){let t=this.cache.get(e);return t?(t.incRefCount(),t.object):null}set(e,t){this.cache.set(e,new yr(t))}release(e){let t=this.cache.get(e);t&&(t.decRefCount(),t.refCount===0&&(this.cache.delete(e),t.object?.destroy()))}},xr=class extends br{loseContext(e){this.clear()}},Sr=new an,Cr=e=>Sr.get(e,()=>new xr),wr=class{constructor(e){v(this,`_name`,void 0),v(this,`device`,void 0),v(this,`_enabled`,!0),v(this,`_skipStart`,!1),v(this,`_skipEnd`,!1),v(this,`executeEnabled`,!0),v(this,`requiresCubemaps`,!1),v(this,`beforePasses`,[]),v(this,`afterPasses`,[]),this.device=e}set name(e){this._name=e}get name(){return this._name||(this._name=this.constructor.name),this._name}set enabled(e){this._enabled!==e&&(this._enabled=e,e?this.onEnable():this.onDisable())}get enabled(){return this._enabled}onEnable(){}onDisable(){}frameUpdate(){}before(){}execute(){}after(){}destroy(){}render(){this.enabled&&(this.before(),this.executeEnabled&&this.execute(),this.after(),this.device.renderPassIndex++)}},Tr=class{constructor(){v(this,`clearValue`,new O(0,0,0,1)),v(this,`clearValueLinear`,new O(0,0,0,1)),v(this,`clear`,!1),v(this,`store`,!1),v(this,`resolve`,!0),v(this,`genMipmaps`,!1)}},Er=class{constructor(){v(this,`clearDepthValue`,1),v(this,`clearStencilValue`,0),v(this,`clearDepth`,!1),v(this,`clearStencil`,!1),v(this,`storeDepth`,!1),v(this,`resolveDepth`,!1),v(this,`storeStencil`,!1)}},Dr=class extends wr{constructor(...e){super(...e),v(this,`renderTarget`,void 0),v(this,`_options`,void 0),v(this,`samples`,0),v(this,`colorArrayOps`,[]),v(this,`depthStencilOps`,void 0),v(this,`requiresCubemaps`,!0),v(this,`fullSizeClearRect`,!0)}get colorOps(){return this.colorArrayOps[0]}set scaleX(e){this._options.scaleX=e}get scaleX(){return this._options.scaleX}set scaleY(e){this._options.scaleY=e}get scaleY(){return this._options.scaleY}set options(e){this._options=e,e&&(this.scaleX=this.scaleX??1,this.scaleY=this.scaleY??1)}get options(){return this._options}init(e=null,t){this.options=t,this.renderTarget=e,this.samples=Math.max(this.renderTarget?this.renderTarget.samples:this.device.samples,1),this.allocateAttachments(),this.postInit()}allocateAttachments(){let e=this.renderTarget;this.depthStencilOps=new Er,e?.depthBuffer&&(this.depthStencilOps.storeDepth=!0,e.depthResolveBuffer&&(this.depthStencilOps.resolveDepth=!0));let t=e?e._colorBuffers?.length??0:1;this.colorArrayOps.length=0;for(let n=0;n<t;n++){let t=new Tr;this.colorArrayOps[n]=t;let r=e?._colorBuffers?.[n];if(this.samples===1)t.store=!0,t.resolve=!1;else if(r?.samples>1){let r=!!e.getResolveBuffer(n);t.resolve=r,t.store=!r}e?.mipmaps&&r?.mipmaps&&(t.genMipmaps=!Re(r._format))}}postInit(){}frameUpdate(){if(this._options&&this.renderTarget){let e=this._options.resizeSource??this.device.backBuffer,t=Math.floor(e.width*this.scaleX),n=Math.floor(e.height*this.scaleY);this.renderTarget.resize(t,n)}}setClearColor(e,t){let n=this.colorArrayOps.length,r=t??0,i=t===void 0?n:t+1;for(let t=r;t<i;t++){let n=this.colorArrayOps[t];n&&(e&&(n.clearValue.copy(e),n.clearValueLinear.linear(e)),n.clear=!!e)}}setClearDepth(e){e!==void 0&&(this.depthStencilOps.clearDepthValue=e),this.depthStencilOps.clearDepth=e!==void 0}setClearStencil(e){e!==void 0&&(this.depthStencilOps.clearStencilValue=e),this.depthStencilOps.clearStencil=e!==void 0}render(){if(this.enabled){let e=this.device,t=this.renderTarget!==void 0;this.before(),this.executeEnabled&&(t&&!this._skipStart&&e.startRenderPass(this),this.execute(),t&&!this._skipEnd&&e.endRenderPass(this)),this.after(),e.renderPassIndex++}}},Or=[];Or[2]=1,Or[3]=2,Or[4]=3,Or[5]=4,Or[1]=1,Or[6]=2,Or[7]=3,Or[8]=4,Or[0]=1,Or[9]=2,Or[10]=3,Or[11]=4,Or[12]=8,Or[13]=12,Or[14]=16,Or[26]=1,Or[27]=2,Or[28]=3,Or[29]=4;var R=class{get isArrayType(){return this.count>0}constructor(e,t,n=0){if(v(this,`name`,void 0),v(this,`type`,void 0),v(this,`byteSize`,void 0),v(this,`offset`,void 0),v(this,`scopeId`,void 0),v(this,`count`,void 0),v(this,`numComponents`,void 0),this.shortName=e,this.name=n?`${e}[0]`:e,this.type=t,this.numComponents=Or[t],this.updateType=t,n>0)switch(t){case 2:this.updateType=17;break;case 1:this.updateType=30;break;case 26:this.updateType=31;break;case 0:this.updateType=32;break;case 3:this.updateType=21;break;case 6:this.updateType=33;break;case 27:this.updateType=34;break;case 9:this.updateType=35;break;case 4:this.updateType=22;break;case 7:this.updateType=36;break;case 28:this.updateType=37;break;case 10:this.updateType=38;break;case 5:this.updateType=23;break;case 8:this.updateType=39;break;case 29:this.updateType=40;break;case 11:this.updateType=41;break;case 14:this.updateType=24}this.count=n;let r=this.numComponents;n&&(r=E.roundUp(r,4)),this.byteSize=r*4,n&&(this.byteSize*=n)}calculateOffset(e){let t=this.byteSize<=8?this.byteSize:16;this.count&&(t=16),e=E.roundUp(e,t),this.offset=e/4}},kr=class{constructor(e,t){v(this,`byteSize`,0),v(this,`map`,new Map),this.scope=e.scope,this.uniforms=t;let n=0;for(let e=0;e<t.length;e++){let r=t[e];r.calculateOffset(n),n=r.offset*4+r.byteSize,r.scopeId=this.scope.resolve(r.name),this.map.set(r.name,r)}this.byteSize=E.roundUp(n,16)}get(e){return this.map.get(e)}},Ar=/[ \t]*(\battribute\b|\bvarying\b|\buniform\b)/g,jr=/(\battribute\b|\bvarying\b|\bout\b|\buniform\b)[ \t]*([^;]+)(;+)/g,Mr=/([\w-]+)\[(.*?)\]/,Nr=new Set([`highp`,`mediump`,`lowp`]),Pr=new Set([`sampler2DShadow`,`samplerCubeShadow`,`sampler2DArrayShadow`]),Fr={sampler2D:`2d`,sampler3D:`3d`,samplerCube:Nt,samplerCubeShadow:Nt,sampler2DShadow:`2d`,sampler2DArray:Mt,sampler2DArrayShadow:Mt,isampler2D:`2d`,usampler2D:`2d`,isampler3D:`3d`,usampler3D:`3d`,isamplerCube:Nt,usamplerCube:Nt,isampler2DArray:Mt,usampler2DArray:Mt},Ir={"2d":`texture2D`,[Nt]:`textureCube`,"3d":`texture3D`,[Mt]:`texture2DArray`},Lr=class{constructor(e,t){this.line=e;let n=e.trim().split(/\s+/);if(Nr.has(n[0])&&(this.precision=n.shift()),this.type=n.shift(),e.includes(`,`),e.includes(`[`)){let e=n.join(` `),r=Mr.exec(e);this.name=r[1],this.arraySize=Number(r[2]),isNaN(this.arraySize)&&(t.failed=!0)}else this.name=n.shift(),this.arraySize=0;this.isSampler=this.type.indexOf(`sampler`)!==-1,this.isSignedInt=this.type.indexOf(`isampler`)!==-1,this.isUnsignedInt=this.type.indexOf(`usampler`)!==-1}},Rr=class e{static run(t,n,r){let i=new Map,a=e.extract(n.vshader),o=e.extract(n.fshader),s=new Map,c=e.processAttributes(a.attributes,n.attributes,s,n.processingOptions),l=e.processVaryings(a.varyings,i,!0),u=e.processVaryings(o.varyings,i,!1),d=e.processOuts(o.outs),f=a.uniforms.concat(o.uniforms),p=Array.from(new Set(f)).map(e=>new Lr(e,r)),m=e.processUniforms(t,p,n.processingOptions,r),h=`${c}
${l}
${m.code}`,g=a.src.replace(e.MARKER,h),_=`${u}
${d}
${m.code}`;return{vshader:g,fshader:o.src.replace(e.MARKER,_),attributes:s,meshUniformBufferFormat:m.meshUniformBufferFormat,meshBindGroupFormat:m.meshBindGroupFormat}}static extract(t,n=!1){let r=[],i=[],a=[],o=[],s=`${e.MARKER}
`,c;for(;(c=Ar.exec(t))!==null;){let l=c[1];if(!(n&&l!==`uniform`))switch(l){case`attribute`:case`varying`:case`uniform`:case`out`:{jr.lastIndex=c.index;let n=jr.exec(t);l===`attribute`?r.push(n[2]):l===`varying`?i.push(n[2]):l===`out`?a.push(n[2]):l===`uniform`&&o.push(n[2]),t=e.cutOut(t,c.index,jr.lastIndex,s),Ar.lastIndex=c.index+s.length,s=``;break}}}return{src:t,attributes:r,varyings:i,outs:a,uniforms:o}}static parseUniformLines(e,t){return e.map(e=>new Lr(e,t))}static processUniforms(t,n,r,i){let a=[],o=[];n.forEach(e=>{e.isSampler?a.push(e):o.push(e)});let s=[];o.forEach(e=>{if(!r.hasUniform(e.name)){let t=zt.indexOf(e.type),n=new R(e.name,t,e.arraySize);s.push(n)}}),s.length===0&&s.push(new R(Gt,2));let c=s.length?new kr(t,s):null,l=[];a.forEach(e=>{if(!r.hasTexture(e.name)){let t=0;e.isSignedInt?t=3:e.isUnsignedInt?t=4:(e.precision===`highp`&&(t=1),Pr.has(e.type)&&(t=2));let n=Fr[e.type];l.push(new tn(e.name,3,n,t))}});let u=new rn(t,l),d=``;return r.uniformFormats.forEach((t,n)=>{t&&(d+=e.getUniformShaderDeclaration(t,n,0))}),c&&(d+=e.getUniformShaderDeclaration(c,2,0)),r.bindGroupFormats.forEach((t,n)=>{t&&(d+=e.getTexturesShaderDeclaration(t,n))}),d+=e.getTexturesShaderDeclaration(u,1),{code:d,meshUniformBufferFormat:c,meshBindGroupFormat:u}}static processVaryings(t,n,r){let i=``,a=r?`out`:`in`;return t.forEach((t,o)=>{let s=e.splitToWords(t),c=s.slice(0,-1).join(` `),l=s[s.length-1];r?n.set(l,o):o=n.get(l),i+=`layout(location = ${o}) ${a} ${c} ${l};
`}),i}static processOuts(e){let t=``;return e.forEach((e,n)=>{t+=`layout(location = ${n}) out ${e};
`}),t}static getTypeCount(e){let t=e.substring(e.length-1),n=parseInt(t,10);return isNaN(n)?1:n}static processAttributes(t,n,r,i){let a=``,o={};return t.forEach(t=>{let s=e.splitToWords(t),c=s[0],l=s[1];if(n.hasOwnProperty(l)){let t=n[l],s=F[t];o[s]=t,r.set(s,l);let u,d=i.getVertexElement(t);if(d){let t=d.dataType;if(t!==6&&t!==7&&!d.normalize&&!d.asInt){let n=e.getTypeCount(c),r=`_private_${l}`;u=`vec${n} ${l} = vec${n}(${r});
`,l=r;let i=t===0||t===2||t===4;c=n===1?i?`int`:`uint`:i?`ivec${n}`:`uvec${n}`}}a+=`layout(location = ${s}) in ${c} ${l};
`,u&&(a+=u)}}),a}static splitToWords(e){return e=e.replace(/\s+/g,` `).trim(),e.split(` `)}static cutOut(e,t,n,r){return e.substring(0,t)+r+e.substring(n)}static getUniformShaderDeclaration(e,t,n){let r=`layout(set = ${t}, binding = ${n}, std140) uniform ub_${Ut[t]} {
`;return e.uniforms.forEach(e=>{let t=zt[e.type];r+=`    ${t} ${e.shortName}${e.count?`[${e.count}]`:``};
`}),`${r}};
`}static getTexturesShaderDeclaration(e,t){let n=``;return e.textureFormats.forEach(e=>{let r=Ir[e.textureDimension],i=r===`texture2DArray`,a=e.sampleType===4?`u`:e.sampleType===3?`i`:``;r=`${a}${r}`;let o=``,s=``;i&&(o=`_texture`,s=`#define ${e.name} ${a}sampler2DArray(${e.name}${o}, ${e.name}_sampler)
`),n+=`layout(set = ${t}, binding = ${e.slot}) uniform ${r} ${e.name}${o};
`,e.hasSampler&&(n+=`layout(set = ${t}, binding = ${e.slot+1}) uniform sampler ${e.name}_sampler;
`),n+=s}),n}};v(Rr,`MARKER`,`@@@`);var zr=/[ \t]*#(ifn?def|if|endif|else|elif|define|undef|extension|include)/g,Br=/define[ \t]+([^\n]+)\r?(?:\n|$)/g,Vr=/extension[ \t]+([\w-]+)[ \t]*:[ \t]*(enable|require)/g,Hr=/undef[ \t]+([^\n]+)\r?(?:\n|$)/g,Ur=/(ifdef|ifndef|if)[ \t]*([^\r\n]+)\r?\n/g,Wr=/(endif|else|elif)(?:[ \t]+([^\r\n]*))?\r?\n?/g,Gr=/\{?[\w-]+\}?/,Kr=/(!|\s)?defined\(([\w-]+)\)/,qr=/!?defined\s*\([^)]*\)/g,Jr=/!?defined\s*$/,Yr=/([a-z_]\w*)\s*(==|!=|<|<=|>|>=)\s*([\w"']+)/i,Xr=/[+\-]/g,Zr=/include[ \t]+"([\w-]+)(?:\s*,\s*([\w-]+))?"/g,Qr=/\{i\}/g,$r=/(pcFragColor[1-8])\b/g,ei=/^\d+(?:\.\d+)?$/,ti=class e{static run(t,n=new Map,r={}){e.sourceName=r.sourceName,t=this.stripComments(t),t=t.split(/\r?\n/).map(e=>e.trimEnd()).join(`
`);let i=new Map,a=new Map;if(t=this._preprocess(t,i,a,n,r.stripDefines),t===null)return null;let o=new Map;return i.forEach((e,t)=>{Number.isInteger(parseFloat(e))&&!e.includes(`.`)&&o.set(t,e)}),t=this.stripComments(t),t=this.injectDefines(t,a),t=this.stripUnusedColorAttachments(t,r),t=this.RemoveEmptyLines(t),t=this.processArraySize(t,o),t}static stripUnusedColorAttachments(e,t){if(t.stripUnusedColorAttachments){let t=new Map;if(e.match($r)?.forEach(e=>{let n=parseInt(e.charAt(e.length-1),10);t.set(n,(t.get(n)??0)+1)}),Array.from(t.values()).some(e=>e===1)){let n=e.split(`
`),r=[];for(let e=0;e<n.length;e++){let i=n[e].match($r);if(i){let e=parseInt(i[0].charAt(i[0].length-1),10);if(e>0&&t.get(e)===1)continue}r.push(n[e])}e=r.join(`
`)}}return e}static stripComments(e){return e.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,`$1`)}static processArraySize(e,t){return e!==null&&t.forEach((t,n)=>{e=e.replace(RegExp(`\\[${n}\\]`,`g`),`[${t}]`)}),e}static injectDefines(e,t){if(e!==null&&t.size>0){let n=e.split(`
`);t.forEach((e,t)=>{let r=new RegExp(t,`g`);for(let t=0;t<n.length;t++)n[t].includes(`#`)||(n[t]=n[t].replace(r,e))}),e=n.join(`
`)}return e}static RemoveEmptyLines(e){return e!==null&&(e=e.split(/\r?\n/).map(e=>e.trim()===``?``:e).join(`
`),e=e.replace(/(\n\n){3,}/g,`

`)),e}static _preprocess(t,n=new Map,r,i,a){let o=t,s=[],c=!1,l;for(;(l=zr.exec(t))!==null&&!c;){let u=l[1];switch(u){case`define`:{Br.lastIndex=l.index;let i=Br.exec(t);c||(c=i===null);let o=i[1];Gr.lastIndex=i.index;let u=Gr.exec(o)[0],d=o.substring(u.length).trim();d===``&&(d=`true`);let f=e._keep(s),p=a;if(f){let e=u.startsWith(`{`)&&u.endsWith(`}`);e&&(p=!0),e?r.set(u,d):n.set(u,d),p&&(t=t.substring(0,i.index-1)+t.substring(Br.lastIndex),zr.lastIndex=i.index-1)}p||(zr.lastIndex=i.index+i[0].length);break}case`undef`:{Hr.lastIndex=l.index;let r=Hr.exec(t),i=r[1].trim();e._keep(s)&&(n.delete(i),a&&(t=t.substring(0,r.index-1)+t.substring(Hr.lastIndex),zr.lastIndex=r.index-1)),a||(zr.lastIndex=r.index+r[0].length);break}case`extension`:{Vr.lastIndex=l.index;let r=Vr.exec(t);if(c||(c=r===null),r){let t=r[1];e._keep(s)&&n.set(t,`true`)}zr.lastIndex=r.index+r[0].length;break}case`ifdef`:case`ifndef`:case`if`:{Ur.lastIndex=l.index;let r=Ur.exec(t),i=r[2],a=e.evaluate(i,n);c||(c=a.error);let o=a.result;u===`ifndef`&&(o=!o),s.push({anyKeep:o,keep:o,start:l.index,end:Ur.lastIndex}),zr.lastIndex=r.index+r[0].length;break}case`endif`:case`else`:case`elif`:{Wr.lastIndex=l.index;let r=Wr.exec(t),i=s.pop();if(!i){console.error(`Shader preprocessing encountered "#${r[1]}" without a preceding #if #ifdef #ifndef while preprocessing ${e.sourceName} on line:
 ${t.substring(l.index,l.index+100)}...`,{source:o}),c=!0;continue}let a=i.keep?t.substring(i.end,l.index):``;t=t.substring(0,i.start)+a+t.substring(Wr.lastIndex),zr.lastIndex=i.start+a.length;let u=r[1];if(u===`else`||u===`elif`){let t=!1;if(!i.anyKeep){if(u===`else`)t=!i.keep;else{let i=e.evaluate(r[2],n);t=i.result,c||(c=i.error)}}s.push({anyKeep:i.anyKeep||t,keep:t,start:zr.lastIndex,end:zr.lastIndex})}break}case`include`:{Zr.lastIndex=l.index;let r=Zr.exec(t);if(c||(c=r===null),!r){c=!0;continue}let a=r[1].trim(),u=r[2]?.trim();if(e._keep(s)){let s=i?.get(a);if(s!==void 0){if(s=this.stripComments(s),u){let r=n.get(u),i=parseFloat(r);if(Number.isInteger(i)){let e=``;for(let t=0;t<i;t++)e+=s.replace(Qr,String(t));s=e}else console.error(`Include Count identifier "${u}" not resolved while preprocessing ${e.sourceName} on line:
 ${t.substring(l.index,l.index+100)}...`,{originalSource:o,source:t}),c=!0}t=t.substring(0,r.index-1)+s+t.substring(Zr.lastIndex),zr.lastIndex=r.index-1}else{console.error(`Include "${a}" not resolved while preprocessing ${e.sourceName}`,{originalSource:o,source:t}),c=!0;continue}}break}}}return s.length>0&&(console.error(`Shader preprocessing reached the end of the file without encountering the necessary #endif to close a preceding #if, #ifdef, or #ifndef block. ${e.sourceName}`),c=!0),c?(console.error(`Failed to preprocess shader: `,{source:o}),null):t}static _keep(e){for(let t=0;t<e.length;t++)if(!e[t].keep)return!1;return!0}static evaluateAtomicExpression(e,t){let n=!1;e=e.trim();let r=!1;if(e===`true`)return{result:!0,error:n};if(e===`false`)return{result:!1,error:n};if(ei.test(e))return{result:parseFloat(e)!==0,error:n};let i=Kr.exec(e);if(i){r=i[1]===`!`,e=i[2].trim();let a=t.has(e);return{result:r?!a:a,error:n}}let a=Yr.exec(e);if(a){let e=t.get(a[1].trim())??a[1].trim(),r=t.get(a[3].trim())??a[3].trim(),i=a[2].trim(),o=!1;switch(i){case`==`:o=e===r;break;case`!=`:o=e!==r;break;case`<`:o=e<r;break;case`<=`:o=e<=r;break;case`>`:o=e>r;break;case`>=`:o=e>=r;break;default:n=!0}return{result:o,error:n}}return{result:t.has(e),error:n}}static processParentheses(t,n){let r=!1,i=t.trim();for(;i.startsWith(`(`)&&i.endsWith(`)`);){let e=0,t=!0;for(let n=0;n<i.length-1;n++)if(i[n]===`(`)e++;else if(i[n]===`)`&&(e--,e===0)){t=!1;break}if(t)i=i.slice(1,-1).trim();else break}for(;;){let t=!1,a=0,o=0,s=-1,c=-1,l=0;for(let e=0;e<i.length;e++)if(i[e]===`(`){let n=i.substring(0,e);Jr.test(n)?l++:l===0&&(a++,a>o&&(o=a,s=e),t=!0)}else i[e]===`)`&&(l>0?l--:a>0&&(a===o&&s!==-1&&(c=e),a--));if(!t||s===-1||c===-1)break;let u=i.substring(s+1,c),{result:d,error:f}=e.evaluate(u,n);r=r||f,i=i.substring(0,s)+(d?`true`:`false`)+i.substring(c+1)}return{expression:i,error:r}}static evaluate(t,n){let r=Xr.exec(t)===null,i=t,a=!1;if(t.replace(qr,``).indexOf(`(`)!==-1){let r=e.processParentheses(t,n);i=r.expression,a=r.error}if(a)return{result:!1,error:!0};let o=i.split(`||`);for(let t of o){let i=t.split(`&&`),a=!0;for(let t of i){let{result:r,error:i}=e.evaluateAtomicExpression(t.trim(),n);if(!r||i){a=!1;break}}if(a)return{result:!0,error:!r}}return{result:!1,error:!r}}};v(ti,`sourceName`,void 0);var ni=`
#ifdef DUAL_SOURCE_BLENDING
#extension GL_EXT_blend_func_extended : require
#endif
#ifndef outType_0
#define outType_0 vec4
#endif
#ifdef DUAL_SOURCE_BLENDING
layout(location = 0, index = 0) out highp outType_0 pcFragColor0;
layout(location = 0, index = 1) out highp outType_0 pcFragColorSecondary;
#else
layout(location = 0) out highp outType_0 pcFragColor0;
#if COLOR_ATTACHMENT_1
layout(location = 1) out highp outType_1 pcFragColor1;
#endif
#if COLOR_ATTACHMENT_2
layout(location = 2) out highp outType_2 pcFragColor2;
#endif
#if COLOR_ATTACHMENT_3
layout(location = 3) out highp outType_3 pcFragColor3;
#endif
#if COLOR_ATTACHMENT_4
layout(location = 4) out highp outType_4 pcFragColor4;
#endif
#if COLOR_ATTACHMENT_5
layout(location = 5) out highp outType_5 pcFragColor5;
#endif
#if COLOR_ATTACHMENT_6
layout(location = 6) out highp outType_6 pcFragColor6;
#endif
#if COLOR_ATTACHMENT_7
layout(location = 7) out highp outType_7 pcFragColor7;
#endif
#endif
#define gl_FragColor pcFragColor0
#define varying in
#define texture2D texture
#define texture2DBias texture
#define textureCube texture
#define texture2DProj textureProj
#define texture2DLod textureLod
#define texture2DProjLod textureProjLod
#define textureCubeLod textureLod
#define texture2DGrad textureGrad
#define texture2DProjGrad textureProjGrad
#define textureCubeGrad textureGrad
#define utexture2D texture
#define itexture2D texture
#define texture2DLodEXT texture2DLodEXT_is_no_longer_supported_use_texture2DLod_instead
#define texture2DProjLodEXT texture2DProjLodEXT_is_no_longer_supported_use_texture2DProjLod
#define textureCubeLodEXT textureCubeLodEXT_is_no_longer_supported_use_textureCubeLod_instead
#define texture2DGradEXT texture2DGradEXT_is_no_longer_supported_use_texture2DGrad_instead
#define texture2DProjGradEXT texture2DProjGradEXT_is_no_longer_supported_use_texture2DProjGrad_instead
#define textureCubeGradEXT textureCubeGradEXT_is_no_longer_supported_use_textureCubeGrad_instead
#define textureShadow(res, uv) textureGrad(res, uv, vec2(1, 1), vec2(1, 1))
#define SHADOWMAP_PASS(name) name
#define SHADOWMAP_ACCEPT(name) sampler2DShadow name
#define TEXTURE_PASS(name) name
#define TEXTURE_ACCEPT(name) sampler2D name
#define TEXTURE_ACCEPT_HIGHP(name) highp sampler2D name
#define GL2
`,ri=`
#extension GL_ANGLE_multi_draw : enable
#define attribute in
#define varying out
#define texture2D texture
#define utexture2D texture
#define itexture2D texture
#define GL2
#define VERTEXSHADER
#define TEXTURE_PASS(name) name
#define TEXTURE_ACCEPT(name) sampler2D name
#define TEXTURE_ACCEPT_HIGHP(name) highp sampler2D name
`,ii=`
#extension GL_EXT_samplerless_texture_functions : require
#ifndef outType_0
#define outType_0 vec4
#endif
#ifndef outType_1
#define outType_1 vec4
#endif
#ifndef outType_2
#define outType_2 vec4
#endif
#ifndef outType_3
#define outType_3 vec4
#endif
#ifndef outType_4
#define outType_4 vec4
#endif
#ifndef outType_5
#define outType_5 vec4
#endif
#ifndef outType_6
#define outType_6 vec4
#endif
#ifndef outType_7
#define outType_7 vec4
#endif
#ifdef DUAL_SOURCE_BLENDING
layout(location = 0, index = 0) out highp outType_0 pcFragColor0;
layout(location = 0, index = 1) out highp outType_0 pcFragColorSecondary;
#else
layout(location = 0) out highp outType_0 pcFragColor0;
layout(location = 1) out highp outType_1 pcFragColor1;
layout(location = 2) out highp outType_2 pcFragColor2;
layout(location = 3) out highp outType_3 pcFragColor3;
layout(location = 4) out highp outType_4 pcFragColor4;
layout(location = 5) out highp outType_5 pcFragColor5;
layout(location = 6) out highp outType_6 pcFragColor6;
layout(location = 7) out highp outType_7 pcFragColor7;
#endif
#define gl_FragColor pcFragColor0
#define texture2D(res, uv) texture(sampler2D(res, res ## _sampler), uv)
#define texture2DBias(res, uv, bias) texture(sampler2D(res, res ## _sampler), uv, bias)
#define texture2DLod(res, uv, lod) textureLod(sampler2D(res, res ## _sampler), uv, lod)
#define textureCube(res, uv) texture(samplerCube(res, res ## _sampler), uv)
#define textureCubeLod(res, uv, lod) textureLod(samplerCube(res, res ## _sampler), uv, lod)
#define textureShadow(res, uv) textureLod(sampler2DShadow(res, res ## _sampler), uv, 0.0)
#define itexture2D(res, uv) texture(isampler2D(res, res ## _sampler), uv)
#define utexture2D(res, uv) texture(usampler2D(res, res ## _sampler), uv)
#define texture2DLodEXT texture2DLodEXT_is_no_longer_supported_use_texture2DLod_instead
#define texture2DProjLodEXT texture2DProjLodEXT_is_no_longer_supported_use_texture2DProjLod
#define textureCubeLodEXT textureCubeLodEXT_is_no_longer_supported_use_textureCubeLod_instead
#define texture2DGradEXT texture2DGradEXT_is_no_longer_supported_use_texture2DGrad_instead
#define texture2DProjGradEXT texture2DProjGradEXT_is_no_longer_supported_use_texture2DProjGrad_instead
#define textureCubeGradEXT textureCubeGradEXT_is_no_longer_supported_use_textureCubeGrad_instead
#define SHADOWMAP_PASS(name) name, name ## _sampler
#define SHADOWMAP_ACCEPT(name) texture2D name, sampler name ## _sampler
#define TEXTURE_PASS(name) name, name ## _sampler
#define TEXTURE_ACCEPT(name) texture2D name, sampler name ## _sampler
#define TEXTURE_ACCEPT_HIGHP TEXTURE_ACCEPT
#define GL2
#define WEBGPU
`,ai=`
#extension GL_EXT_samplerless_texture_functions : require
#define texture2D(res, uv) texture(sampler2D(res, res ## _sampler), uv)
#define itexture2D(res, uv) texture(isampler2D(res, res ## _sampler), uv)
#define utexture2D(res, uv) texture(usampler2D(res, res ## _sampler), uv)
#define TEXTURE_PASS(name) name, name ## _sampler
#define TEXTURE_ACCEPT(name) texture2D name, sampler name ## _sampler
#define TEXTURE_ACCEPT_HIGHP TEXTURE_ACCEPT
#define GL2
#define WEBGPU
#define VERTEXSHADER
#define gl_VertexID gl_VertexIndex
#define gl_InstanceID gl_InstanceIndex
`,oi=`
`,si=`
#define VERTEXSHADER
`,ci=`
vec2 getGrabScreenPos(vec4 clipPos) {
	vec2 uv = (clipPos.xy / clipPos.w) * 0.5 + 0.5;
	#ifdef WEBGPU
		uv.y = 1.0 - uv.y;
	#endif
	return uv;
}
vec2 getImageEffectUV(vec2 uv) {
	#ifdef WEBGPU
		uv.y = 1.0 - uv.y;
	#endif
	return uv;
}
`,li=`
#define WEBGPU
fn getGrabScreenPos(clipPos: vec4<f32>) -> vec2<f32> {
	var uv: vec2<f32> = (clipPos.xy / clipPos.w) * 0.5 + vec2<f32>(0.5);
	uv.y = 1.0 - uv.y;
	return uv;
}
fn getImageEffectUV(uv: vec2<f32>) -> vec2<f32> {
	var modifiedUV: vec2<f32> = uv;
	modifiedUV.y = 1.0 - modifiedUV.y;
	return modifiedUV;
}
struct WrappedF32 { @size(16) element: f32 }
struct WrappedI32 { @size(16) element: i32 }
struct WrappedU32 { @size(16) element: u32 }
struct WrappedVec2F { @size(16) element: vec2f }
struct WrappedVec2I { @size(16) element: vec2i }
struct WrappedVec2U { @size(16) element: vec2u }
`,ui=`
#ifdef CAPS_SHADER_F16
	alias half = f16;
	alias half2 = vec2<f16>;
	alias half3 = vec3<f16>;
	alias half4 = vec4<f16>;
	alias half2x2 = mat2x2<f16>;
	alias half3x3 = mat3x3<f16>;
	alias half4x4 = mat4x4<f16>;
#else
	alias half = f32;
	alias half2 = vec2f;
	alias half3 = vec3f;
	alias half4 = vec4f;
	alias half2x2 = mat2x2f;
	alias half3x3 = mat3x3f;
	alias half4x4 = mat4x4f;
#endif
`,di={vertex_position:P,vertex_normal:Ze,vertex_tangent:Qe,vertex_texCoord0:rt,vertex_texCoord1:it,vertex_texCoord2:at,vertex_texCoord3:ot,vertex_texCoord4:st,vertex_texCoord5:ct,vertex_texCoord6:lt,vertex_texCoord7:ut,vertex_color:tt,vertex_boneIndices:et,vertex_boneWeights:$e},fi=class e{static createDefinition(t,n){let r=e=>{let t=e.fragmentOutputTypes??`vec4`;return Array.isArray(t)||(t=[t]),t},i=(e,n,i,a)=>{let o=t.isWebGPU?e:n,s=``;if(!i){a.useDualSourceBlending&&(s+=`#define DUAL_SOURCE_BLENDING
`);let e=r(a);for(let n=0;n<t.maxColorAttachments;n++){s+=`#define COLOR_ATTACHMENT_${n}
`;let t=e[n]??`vec4`;s+=`#define outType_${n} ${t}
`}}return s+o},a=(n,i)=>{let a=e.getWGSLEnables(t,n?`vertex`:`fragment`,!n&&i.useDualSourceBlending);if(!n){let e=r(i);for(let n=0;n<t.maxColorAttachments;n++){let t=e[n]??`vec4`,r=Xt.get(t);a+=`alias pcOutType${n} = ${r};
`}}return a},o=n.name??`Untitled`,s,c,l=e.getDefinesCode(t,n.vertexDefines),u=e.getDefinesCode(t,n.fragmentDefines);return n.shaderLanguage===`wgsl`?(s=`
								${a(!0,n)}
								${l}
								${ui}
								${si}
								${li}
								${n.vertexCode}
						`,c=`
								${a(!1,n)}
								${u}
								${ui}
								${oi}
								${li}
								${n.fragmentCode}
						`):(s=`${e.versionCode(t)+i(ai,ri,!0,n)+l+e.precisionCode(t)}
								${ci}
								${e.getShaderNameCode(o)}
								${n.vertexCode}`,c=`${(n.fragmentPreamble||``)+e.versionCode(t)+i(ii,ni,!1,n)+u+e.precisionCode(t)}
								${ci}
								${e.getShaderNameCode(o)}
								${n.fragmentCode}`),{name:o,shaderLanguage:n.shaderLanguage??`glsl`,attributes:n.attributes,vshader:s,vincludes:n.vertexIncludes,fincludes:n.fragmentIncludes,fshader:c,feedbackVaryings:n.feedbackVaryings,feedbackVaryingsMode:n.feedbackVaryingsMode,useTransformFeedback:n.useTransformFeedback,meshUniformBufferFormat:n.meshUniformBufferFormat,meshBindGroupFormat:n.meshBindGroupFormat,useDualSourceBlending:!!n.useDualSourceBlending}}static getWGSLEnables(e,t,n=!1){let r=``;return e.supportsShaderF16&&(r+=`enable f16;
`),t===`fragment`&&e.supportsPrimitiveIndex&&(r+=`enable primitive_index;
`),t===`fragment`&&n&&(r+=`enable dual_source_blending;
`),e.supportsSubgroups&&(r+=`enable subgroups;
`),e.supportsSubgroupId&&(r+=`requires subgroup_id;
`),t===`compute`&&e.supportsLinearIndexing&&(r+=`requires linear_indexing;
`),e.supportsUnrestrictedPointerParameters&&(r+=`requires unrestricted_pointer_parameters;
`),e.supportsPointerCompositeAccess&&(r+=`requires pointer_composite_access;
`),e.supportsPacked4x8IntegerDotProduct&&(r+=`requires packed_4x8_integer_dot_product;
`),e.supportsTextureAndSamplerLet&&(r+=`requires texture_and_sampler_let;
`),r}static getDefinesCode(e,t){let n=``;return e.capsDefines.forEach((e,t)=>{n+=`#define ${t} ${e}
`}),n+=`
`,t?.forEach((e,t)=>{n+=`#define ${t} ${e}
`}),n+=`
`,n}static getShaderNameCode(e){return`#define SHADER_NAME ${e}
`}static versionCode(e){return e.isWebGPU?`#version 450
`:`#version 300 es
`}static precisionCode(e,t){t&&t!==`highp`&&t!==`mediump`&&t!==`lowp`&&(t=null),t&&(t===`highp`&&e.maxPrecision!==`highp`&&(t=`mediump`),t===`mediump`&&e.maxPrecision===`lowp`&&(t=`lowp`));let n=t||e.precision;return`
						precision ${n} float;
						precision ${n} int;
						precision ${n} usampler2D;
						precision ${n} isampler2D;
						precision ${n} sampler2DShadow;
						precision ${n} samplerCubeShadow;
						precision ${n} sampler2DArray;
				`}static collectAttributes(e){let t={},n=0,r=e.indexOf(`attribute`);for(;r>=0&&!(r>0&&e[r-1]===`/`);){let i=!1;if(r>0){let t=e.lastIndexOf(`
`,r);t=t===-1?0:t+1,e.substring(t,r).includes(`#`)&&(i=!0)}if(!i){let i=e.indexOf(`;`,r),a=e.lastIndexOf(` `,i),o=e.substring(a+1,i);if(!t[o]){let e=di[o];e===void 0?(t[o]=`ATTR${n}`,n++):t[o]=e}}r=e.indexOf(`attribute`,r+1)}return t}},pi=0,mi=class{constructor(e,t){if(v(this,`meshUniformBufferFormat`,void 0),v(this,`meshBindGroupFormat`,void 0),v(this,`attributes`,new Map),this.id=pi++,this.device=e,t={...t},this.definition=t,this.name=t.name||`Untitled`,this.init(),t.cshader){let n=fi.getWGSLEnables(e,`compute`)+fi.getDefinesCode(e,t.cdefines)+t.cshader,r=new Map(t.cincludes);r.has(`halfTypesCS`)||r.set(`halfTypesCS`,ui),t.cshader=ti.run(n,r,{sourceName:`compute shader for ${this.label}`,stripDefines:!0})}else{let n=t.shaderLanguage===Rt;t.vshader=ti.run(t.vshader,t.vincludes,{sourceName:`vertex shader for ${this.label}`,stripDefines:n}),t.shaderLanguage===`glsl`&&(t.attributes??(t.attributes=fi.collectAttributes(t.vshader)));let r=e.isWebGL2&&(m.name===`osx`||m.name===`ios`);if(t.fshader=ti.run(t.fshader,t.fincludes,{stripUnusedColorAttachments:r,stripDefines:n,sourceName:`fragment shader for ${this.label}`}),!t.vshader||!t.fshader){this.failed=!0;return}}this.impl=e.createShaderImpl(this)}init(){this.ready=!1,this.failed=!1}get label(){return`Shader Id ${this.id} (${this.definition.shaderLanguage===`wgsl`?`WGSL`:`GLSL`}) ${this.name}`}destroy(){this.device.onDestroyShader(this),this.impl.destroy(this)}loseContext(){this.init(),this.impl.loseContext()}restoreContext(){this.impl.restoreContext(this.device,this)}},hi=class{constructor(){v(this,`gpuBuffer`,void 0),v(this,`stagingBuffer`,void 0),v(this,`offset`,void 0),v(this,`size`,void 0)}},gi=class{constructor(){v(this,`storage`,void 0),v(this,`gpuBuffer`,void 0),v(this,`offset`,void 0)}},_i=class{constructor(e,t,n){v(this,`bufferSize`,void 0),v(this,`gpuBuffers`,[]),v(this,`stagingBuffers`,[]),v(this,`usedBuffers`,[]),v(this,`activeBuffer`,null),this.device=e,this.bufferSize=t,this.bufferAlignment=n}destroy(){this.gpuBuffers.forEach(e=>{e.destroy(this.device)}),this.gpuBuffers=null,this.stagingBuffers.forEach(e=>{e.destroy(this.device)}),this.stagingBuffers=null,this.usedBuffers=null,this.activeBuffer=null}alloc(e,t){if(this.activeBuffer){let e=E.roundUp(this.activeBuffer.size,this.bufferAlignment);this.bufferSize-e<t&&this.scheduleSubmit()}if(!this.activeBuffer){let e=this.gpuBuffers.pop();e||(e=this.createBuffer(this.device,this.bufferSize,!1));let t=this.stagingBuffers.pop();t||(t=this.createBuffer(this.device,this.bufferSize,!0)),this.activeBuffer=new hi,this.activeBuffer.stagingBuffer=t,this.activeBuffer.gpuBuffer=e,this.activeBuffer.offset=0,this.activeBuffer.size=0}let n=this.activeBuffer,r=E.roundUp(n.size,this.bufferAlignment);e.gpuBuffer=n.gpuBuffer,e.offset=r,e.storage=n.stagingBuffer.alloc(r,t),n.size=r+t}scheduleSubmit(){this.activeBuffer&&(this.usedBuffers.push(this.activeBuffer),this.activeBuffer=null)}submit(){this.scheduleSubmit()}},z=[];z[2]=function(e,t,n){let r=e.storageFloat32;r[n]=t},z[3]=(e,t,n)=>{let r=e.storageFloat32;r[n]=t[0],r[n+1]=t[1]},z[4]=(e,t,n)=>{let r=e.storageFloat32;r[n]=t[0],r[n+1]=t[1],r[n+2]=t[2]},z[5]=(e,t,n)=>{let r=e.storageFloat32;r[n]=t[0],r[n+1]=t[1],r[n+2]=t[2],r[n+3]=t[3]},z[1]=function(e,t,n){let r=e.storageInt32;r[n]=t},z[6]=function(e,t,n){let r=e.storageInt32;r[n]=t[0],r[n+1]=t[1]},z[7]=function(e,t,n){let r=e.storageInt32;r[n]=t[0],r[n+1]=t[1],r[n+2]=t[2]},z[8]=function(e,t,n){let r=e.storageInt32;r[n]=t[0],r[n+1]=t[1],r[n+2]=t[2],r[n+3]=t[3]},z[12]=(e,t,n)=>{let r=e.storageFloat32;r[n]=t[0],r[n+1]=t[1],r[n+4]=t[2],r[n+5]=t[3],r[n+8]=t[4],r[n+9]=t[5]},z[13]=(e,t,n)=>{let r=e.storageFloat32;r[n]=t[0],r[n+1]=t[1],r[n+2]=t[2],r[n+4]=t[3],r[n+5]=t[4],r[n+6]=t[5],r[n+8]=t[6],r[n+9]=t[7],r[n+10]=t[8]},z[17]=function(e,t,n,r){let i=e.storageFloat32;for(let e=0;e<r;e++)i[n+e*4]=t[e]},z[21]=(e,t,n,r)=>{let i=e.storageFloat32;for(let e=0;e<r;e++)i[n+e*4]=t[e*2],i[n+e*4+1]=t[e*2+1]},z[22]=(e,t,n,r)=>{let i=e.storageFloat32;for(let e=0;e<r;e++)i[n+e*4]=t[e*3],i[n+e*4+1]=t[e*3+1],i[n+e*4+2]=t[e*3+2]},z[26]=(e,t,n,r)=>{let i=e.storageUint32;i[n]=t},z[27]=(e,t,n,r)=>{let i=e.storageUint32;i[n]=t[0],i[n+1]=t[1]},z[28]=(e,t,n,r)=>{let i=e.storageUint32;i[n]=t[0],i[n+1]=t[1],i[n+2]=t[2]},z[29]=(e,t,n,r)=>{let i=e.storageUint32;i[n]=t[0],i[n+1]=t[1],i[n+2]=t[2],i[n+3]=t[3]},z[30]=function(e,t,n,r){let i=e.storageInt32;for(let e=0;e<r;e++)i[n+e*4]=t[e]},z[32]=z[30],z[31]=function(e,t,n,r){let i=e.storageUint32;for(let e=0;e<r;e++)i[n+e*4]=t[e]},z[33]=(e,t,n,r)=>{let i=e.storageInt32;for(let e=0;e<r;e++)i[n+e*4]=t[e*2],i[n+e*4+1]=t[e*2+1]},z[35]=z[33],z[34]=(e,t,n,r)=>{let i=e.storageUint32;for(let e=0;e<r;e++)i[n+e*4]=t[e*2],i[n+e*4+1]=t[e*2+1]},z[36]=(e,t,n,r)=>{let i=e.storageInt32;for(let e=0;e<r;e++)i[n+e*4]=t[e*3],i[n+e*4+1]=t[e*3+1],i[n+e*4+2]=t[e*3+2]},z[38]=z[36],z[37]=(e,t,n,r)=>{let i=e.storageUint32;for(let e=0;e<r;e++)i[n+e*4]=t[e*3],i[n+e*4+1]=t[e*3+1],i[n+e*4+2]=t[e*3+2]};var vi=class{constructor(e,t,n=!0){if(v(this,`device`,void 0),v(this,`persistent`,void 0),v(this,`allocation`,void 0),v(this,`storageFloat32`,void 0),v(this,`storageInt32`,void 0),v(this,`storageUint32`,void 0),this.device=e,this.format=t,this.persistent=n,n){this.impl=e.createUniformBufferImpl(this);let n=new ArrayBuffer(t.byteSize);this.assignStorage(new Int32Array(n)),e._vram.ub+=this.format.byteSize,this.device.buffers.add(this)}else this.allocation=new gi}destroy(){if(this.persistent){let e=this.device;e.buffers.delete(this),this.impl.destroy(e),e._vram.ub-=this.format.byteSize}}get offset(){return this.persistent?0:this.allocation.offset}assignStorage(e){this.storageInt32=e,this.storageUint32=new Uint32Array(e.buffer,e.byteOffset,e.byteLength/4),this.storageFloat32=new Float32Array(e.buffer,e.byteOffset,e.byteLength/4)}loseContext(){this.impl?.loseContext()}restoreContext(){this.impl?.unlock(this)}setUniform(e,t){let n=e.offset;if(t!=null){let r=z[e.updateType];r?r(this,t,n,e.count):this.storageFloat32.set(t,n)}}set(e,t){let n=this.format.map.get(e);n&&this.setUniform(n,t)}startUpdate(e){if(!this.persistent){let t=this.allocation;this.device.dynamicBuffers.alloc(t,this.format.byteSize),this.assignStorage(t.storage),e&&(e.bindGroup=t.gpuBuffer.getBindGroup(this),e.offsets[0]=t.offset)}}endUpdate(){this.persistent?this.impl.unlock(this):(this.allocation.gpuBuffer.upload(),this.storageFloat32=null,this.storageInt32=null)}update(e){this.startUpdate(e);let t=this.format.uniforms;for(let e=0;e<t.length;e++){let n=t[e].scopeId.value;this.setUniform(t[e],n)}this.endUpdate()}},yi=class{constructor(e){v(this,`device`,void 0),v(this,`bindGroupCache`,new Map),this.device=e,this.bindGroupFormat=new rn(this.device,[new $t(Wt,3)])}upload(){}getBindGroup(e){let t=e.format.byteSize,n=this.bindGroupCache.get(t);return n||(n=new vn(this.device,this.bindGroupFormat,e),n.update(),this.bindGroupCache.set(t,n)),n}},bi=class{constructor(){v(this,`frameAllocations`,[]),v(this,`pastFrameAllocations`,new Map),v(this,`_enabled`,!1),v(this,`_enableRequest`,!1),v(this,`_frameTime`,0),v(this,`_passTimings`,new Map),v(this,`_nameCache`,new Map),v(this,`maxCount`,9999)}loseContext(){this.pastFrameAllocations.clear()}set enabled(e){this._enableRequest=e}get enabled(){return this._enableRequest}get passTimings(){return this._passTimings}processEnableRequest(){this._enableRequest!==this._enabled&&(this._enabled=this._enableRequest,this._enabled||(this._frameTime=0))}request(e){this.pastFrameAllocations.set(e,this.frameAllocations),this.frameAllocations=[]}_parsePassName(e){let t=this._nameCache.get(e);return t===void 0&&(t=e.startsWith(`RenderPass`)?e.substring(10):e,this._nameCache.set(e,t)),t}report(e,t,n){if(t){let r=this.pastFrameAllocations.get(e);if(!r)return;t.length>0&&(this._frameTime=n??t.reduce((e,t)=>e+t,0)),this._passTimings.clear();for(let e=0;e<r.length;++e){let n=r[e],i=t[e],a=this._parsePassName(n);this._passTimings.set(a,(this._passTimings.get(a)||0)+i)}if(T.get(`GpuTimings`)){let e=0;for(let n=0;n<r.length;++n)r[n],e+=t[n]}}this.pastFrameAllocations.delete(e)}getSlot(e){if(this.frameAllocations.length>=this.maxCount)return-1;let t=this.frameAllocations.length;return this.frameAllocations.push(e),t}get slotCount(){return this.frameAllocations.length}},xi=`modulepreload`,Si=function(e,t){return new URL(e,t).href},Ci={},wi=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=Si(t,n),t=s(t),t in Ci)return;Ci[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:xi,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Ti=class{constructor(){v(this,`bufferId`,null)}destroy(e){this.bufferId&&(e.gl.deleteBuffer(this.bufferId),this.bufferId=null)}get initialized(){return!!this.bufferId}loseContext(){this.bufferId=null}unlock(e,t,n,r){let i=e.gl;if(this.bufferId)i.bindBuffer(n,this.bufferId),i.bufferSubData(n,0,r);else{let e;switch(t){case 0:e=i.STATIC_DRAW;break;case 1:e=i.DYNAMIC_DRAW;break;case 2:e=i.STREAM_DRAW;break;case 3:e=i.DYNAMIC_COPY}this.bufferId=i.createBuffer(),i.bindBuffer(n,this.bufferId),i.bufferData(n,r,e)}}},Ei=class extends Ti{constructor(...e){super(...e),v(this,`vao`,null)}destroy(e){super.destroy(e),e.unbindVertexArray()}loseContext(){super.loseContext(),this.vao=null}unlock(e){let t=e.device;super.unlock(t,e.usage,t.gl.ARRAY_BUFFER,e.storage)}},Di=class extends Ti{constructor(e){super();let t=e.device.gl,n=e.format;n===0?this.glFormat=t.UNSIGNED_BYTE:n===1?this.glFormat=t.UNSIGNED_SHORT:n===2&&(this.glFormat=t.UNSIGNED_INT)}unlock(e){let t=e.device;super.unlock(t,e.usage,t.gl.ELEMENT_ARRAY_BUFFER,e.storage)}},Oi=class{constructor(e,t,n,r){if(this.locationId=r,this.scopeId=e.scope.resolve(t),this.version=new Zn,t.substring(t.length-3)===`[0]`)switch(n){case 2:n=17;break;case 1:n=30;break;case 26:n=31;break;case 0:n=32;break;case 3:n=21;break;case 6:n=33;break;case 27:n=34;break;case 9:n=35;break;case 4:n=22;break;case 7:n=36;break;case 28:n=37;break;case 10:n=38;break;case 5:n=23;break;case 8:n=39;break;case 29:n=40;break;case 11:n=41}this.dataType=n,this.value=[null,null,null,null],this.array=[]}},ki=class e extends Rr{static run(t,n,r){let i=e.extract(n.vshader,!0),a=e.extract(n.fshader,!0),o=i.uniforms.concat(a.uniforms),s=Array.from(new Set(o)),c=e.parseUniformLines(s,r),l=e.processUniformsGL2(c,n.processingOptions);return{vshader:i.src.replace(Rr.MARKER,l),fshader:a.src.replace(Rr.MARKER,l)}}static processUniformsGL2(t,n){let r=``,i=n.uniformFormats[0];return i&&(r+=e.getUniformShaderDeclarationGL2(i,0)),t.forEach(e=>{n.hasUniform(e.name)||(r+=`uniform ${e.line};
`)}),r}static getUniformShaderDeclarationGL2(e,t){let n=`layout(std140) uniform ub_${Ut[t]} {
`;return e.uniforms.forEach(e=>{let t=zt[e.type];n+=`    ${t} ${e.shortName}${e.count?`[${e.count}]`:``};
`}),`${n}};
`}},Ai=new Set([`gl_VertexID`,`gl_InstanceID`,`gl_DrawID`,`gl_BaseVertex`,`gl_BaseInstance`]),ji=class{constructor(){v(this,`map`,new Map)}destroy(e){this.map.forEach(t=>{e.gl.deleteShader(t)})}loseContext(e){this.map.clear()}},Mi=new an,Ni=new an,Pi=class{constructor(e){v(this,`compileDuration`,0),this.init(),this.compile(e.device,e),this.link(e.device,e),e.device.shaders.push(e)}destroy(e){this.glProgram&&(e.device.gl.deleteProgram(this.glProgram),this.glProgram=null)}init(){this.uniforms=[],this.samplers=[],this.attributes=[],this.glProgram=null,this.glVertexShader=null,this.glFragmentShader=null,this._vsource=null,this._fsource=null}loseContext(){this.init()}restoreContext(e,t){this.compile(e,t),this.link(e,t)}compile(e,t){let n=t.definition,r=n.vshader,i=n.fshader;if(n.processingOptions){let a=ki.run(e,n,t);r=a.vshader,i=a.fshader}this._vsource=r,this._fsource=i,this.glVertexShader=this._compileShaderSource(e,r,!0),this.glFragmentShader=this._compileShaderSource(e,i,!1)}link(e,t){if(this.glProgram)return;let n=e.gl;if(n.isContextLost())return;let r=n.createProgram();this.glProgram=r,n.attachShader(r,this.glVertexShader),n.attachShader(r,this.glFragmentShader);let i=t.definition,a=i.attributes;if(i.useTransformFeedback){let e=i.feedbackVaryings;if(!e){e=[];for(let t in a)a.hasOwnProperty(t)&&e.push(`out_${t}`)}let t=n.INTERLEAVED_ATTRIBS;i.feedbackVaryingsMode===1&&(t=n.SEPARATE_ATTRIBS),n.transformFeedbackVaryings(r,e,t)}let o={};for(let e in a)if(a.hasOwnProperty(e)){let t=F[a[e]];o[t]=e,n.bindAttribLocation(r,t,e)}n.linkProgram(r)}_compileShaderSource(e,t,n){let r=e.gl;if(r.isContextLost())return null;let i=(n?Mi:Ni).get(e,()=>new ji),a=i.map.get(t);return a||(a=r.createShader(n?r.VERTEX_SHADER:r.FRAGMENT_SHADER),r.shaderSource(a,t),r.compileShader(a),i.map.set(t,a)),a}finalize(e,t){let n=e.gl;if(n.isContextLost())return!0;let r=this.glProgram,i=t.definition;if(!n.getProgramParameter(r,n.LINK_STATUS)){if(!this._isCompiled(e,t,this.glVertexShader,this._vsource,`vertex`)||!this._isCompiled(e,t,this.glFragmentShader,this._fsource,`fragment`))return!1;let i=`Failed to link shader program. Error: ${n.getProgramInfoLog(r)}`;return console.error(i),!1}let a=n.getProgramParameter(r,n.ACTIVE_ATTRIBUTES);t.attributes.clear();for(let e=0;e<a;e++){let a=n.getActiveAttrib(r,e),o=n.getAttribLocation(r,a.name);Ai.has(a.name)||(i.attributes[a.name]===void 0?(console.error(`Vertex shader attribute "${a.name}" is not mapped to a semantic in shader definition, shader [${t.label}]`,t),t.failed=!0):t.attributes.set(o,a.name))}let o=e._samplerTypes,s=n.getProgramParameter(r,n.ACTIVE_UNIFORMS);for(let t=0;t<s;t++){let i=n.getActiveUniform(r,t),a=n.getUniformLocation(r,i.name);if(Ai.has(i.name)||a===null)continue;let s=new Oi(e,i.name,e.pcUniformType[i.type],a);o.has(i.type)?this.samplers.push(s):this.uniforms.push(s)}let c=n.getProgramParameter(r,n.ACTIVE_UNIFORM_BLOCKS);for(let e=0;e<c;e++){let t=n.getActiveUniformBlockName(r,e),i=t.startsWith(`ub_`)?t.substring(3):t,a=Ut.indexOf(i),o=a>=0?a:e;n.uniformBlockBinding(r,e,o)}return t.ready=!0,!0}_isCompiled(e,t,n,r,i){let a=e.gl;if(!a.getShaderParameter(n,a.COMPILE_STATUS)){let e=a.getShaderInfoLog(n),[t,o]=this._processError(r,e),s=`Failed to compile ${i} shader:

${e}
${t} while rendering undefined`;return console.error(s),!1}return!0}isLinked(e){let{extParallelShaderCompile:t}=e;return!t||e.gl.getProgramParameter(this.glProgram,t.COMPLETION_STATUS_KHR)}_processError(e,t){let n={},r=``;if(e){let i=e.split(`
`),a=0,o=i.length;if(t&&t.startsWith(`ERROR:`)){let e=t.match(/^ERROR:\s(\d+):(\d+):\s*(.+)/);e&&(n.message=e[3],n.line=parseInt(e[2],10),a=Math.max(0,n.line-6),o=Math.min(i.length,n.line+5))}for(let e=a;e<o;e++){let t=e+1===n.line?`> `:`  `;r+=`${t}${e+1}:	${i[e]}
`}n.source=e}return[r,n]}},Fi=class extends Ti{unlock(e){let t=e.device,n=t.gl;super.unlock(t,1,n.UNIFORM_BUFFER,e.storageInt32)}},Ii=class{constructor(){v(this,`buffers`,[])}update(e){let t=e.uniformBuffers;this.buffers.length=t.length;for(let e=0;e<t.length;e++){let n=t[e];this.buffers[e]=n.persistent?n.impl:n.allocation.gpuBuffer}}destroy(){this.buffers.length=0}},Li=class{destroy(){}},Ri=class extends yi{constructor(e,t){super(e),v(this,`bufferId`,null),v(this,`storage`,void 0),v(this,`size`,void 0),this.size=t,this.storage=new Int32Array(t/4),e._vram.ub+=t}destroy(e){this.bufferId&&(e.gl.deleteBuffer(this.bufferId),this.bufferId=null),e._vram.ub-=this.size}loseContext(){this.bufferId=null}upload(){let e=this.device.gl;this.bufferId||(this.bufferId=e.createBuffer()),e.bindBuffer(e.UNIFORM_BUFFER,this.bufferId),e.bufferData(e.UNIFORM_BUFFER,this.storage,e.STREAM_DRAW)}},zi=class extends _i{constructor(e){super(e,0,0),v(this,`free`,new Map),v(this,`used`,[])}destroy(){this.used.forEach(e=>e.destroy(this.device)),this.free.forEach(e=>e.forEach(e=>e.destroy(this.device))),this.used=null,this.free=null}alloc(e,t){let n=this.free.get(t)?.pop();n||(n=new Ri(this.device,t)),this.used.push(n),e.gpuBuffer=n,e.offset=0,e.storage=n.storage}onFrameEnd(){let e=this.used;for(let t=0;t<e.length;t++){let n=e[t],r=this.free.get(n.size);r||(r=[],this.free.set(n.size,r)),r.push(n)}e.length=0}loseContext(){this.onFrameEnd(),this.free.forEach(e=>{e.forEach(e=>e.loseContext())})}},Bi=class{constructor(e){v(this,`indexSizeBytes`,void 0),v(this,`glCounts`,null),v(this,`glOffsetsBytes`,null),v(this,`glInstanceCounts`,null),this.indexSizeBytes=e}allocate(e){this.glCounts&&this.glCounts.length===e||(this.glCounts=new Int32Array(e),this.glOffsetsBytes=new Int32Array(e),this.glInstanceCounts=new Int32Array(e))}add(e,t,n,r){this.glCounts[e]=t,this.glOffsetsBytes[e]=r*this.indexSizeBytes,this.glInstanceCounts[e]=n}update(e){return 0}};function Vi(e,t){let n=e.width,r=e.height;if(n>t||r>t){let i=t/Math.max(n,r),a=Math.floor(n*i),o=Math.floor(r*i),s=document.createElement(`canvas`);return s.width=a,s.height=o,s.getContext(`2d`).drawImage(e,0,0,n,r,0,0,a,o),s}return e}var Hi=class{constructor(e){v(this,`_glTexture`,null),v(this,`_glTarget`,void 0),v(this,`_glFormat`,void 0),v(this,`_glInternalFormat`,void 0),v(this,`_glPixelType`,void 0),v(this,`_glCreated`,void 0),v(this,`dirtyParameterFlags`,0),this.texture=e}destroy(e){if(this._glTexture){for(let t=0;t<e.textureUnits.length;t++){let n=e.textureUnits[t];for(let e=0;e<n.length;e++)n[e]===this._glTexture&&(n[e]=null)}e.gl.deleteTexture(this._glTexture),this._glTexture=null}}loseContext(){this._glTexture=null}propertyChanged(e){this.dirtyParameterFlags|=e}initialize(e,t){let n=e.gl;switch(this._glTexture=n.createTexture(),this._glTarget=t._cubemap?n.TEXTURE_CUBE_MAP:t._volume?n.TEXTURE_3D:t.array?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D,t._format){case 0:this._glFormat=n.ALPHA,this._glInternalFormat=n.ALPHA,this._glPixelType=n.UNSIGNED_BYTE;break;case 1:this._glFormat=n.LUMINANCE,this._glInternalFormat=n.LUMINANCE,this._glPixelType=n.UNSIGNED_BYTE;break;case 2:this._glFormat=n.LUMINANCE_ALPHA,this._glInternalFormat=n.LUMINANCE_ALPHA,this._glPixelType=n.UNSIGNED_BYTE;break;case 52:this._glFormat=n.RED,this._glInternalFormat=n.R8,this._glPixelType=n.UNSIGNED_BYTE;break;case 53:this._glFormat=n.RG,this._glInternalFormat=n.RG8,this._glPixelType=n.UNSIGNED_BYTE;break;case 3:this._glFormat=n.RGB,this._glInternalFormat=n.RGB565,this._glPixelType=n.UNSIGNED_SHORT_5_6_5;break;case 4:this._glFormat=n.RGBA,this._glInternalFormat=n.RGB5_A1,this._glPixelType=n.UNSIGNED_SHORT_5_5_5_1;break;case 5:this._glFormat=n.RGBA,this._glInternalFormat=n.RGBA4,this._glPixelType=n.UNSIGNED_SHORT_4_4_4_4;break;case 6:this._glFormat=n.RGB,this._glInternalFormat=n.RGB8,this._glPixelType=n.UNSIGNED_BYTE;break;case 7:this._glFormat=n.RGBA,this._glInternalFormat=n.RGBA8,this._glPixelType=n.UNSIGNED_BYTE;break;case 31:case 64:break;case 71:this._glFormat=n.RGB,this._glInternalFormat=n.RGB9_E5,this._glPixelType=n.UNSIGNED_INT_5_9_9_9_REV;break;case 72:this._glFormat=n.RG,this._glInternalFormat=n.RG8_SNORM,this._glPixelType=n.BYTE;break;case 73:this._glFormat=n.RGBA,this._glInternalFormat=n.RGBA8_SNORM,this._glPixelType=n.BYTE;break;case 74:this._glFormat=n.RGBA,this._glInternalFormat=n.RGB10_A2,this._glPixelType=n.UNSIGNED_INT_2_10_10_10_REV;break;case 75:this._glFormat=n.RGBA_INTEGER,this._glInternalFormat=n.RGB10_A2UI,this._glPixelType=n.UNSIGNED_INT_2_10_10_10_REV;break;case 8:this._glFormat=n.RGB,this._glInternalFormat=e.extCompressedTextureS3TC.COMPRESSED_RGB_S3TC_DXT1_EXT;break;case 9:this._glFormat=n.RGBA,this._glInternalFormat=e.extCompressedTextureS3TC.COMPRESSED_RGBA_S3TC_DXT3_EXT;break;case 10:this._glFormat=n.RGBA,this._glInternalFormat=e.extCompressedTextureS3TC.COMPRESSED_RGBA_S3TC_DXT5_EXT;break;case 21:this._glFormat=n.RGB,this._glInternalFormat=e.extCompressedTextureETC1.COMPRESSED_RGB_ETC1_WEBGL;break;case 24:this._glFormat=n.RGB,this._glInternalFormat=e.extCompressedTexturePVRTC.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;break;case 25:this._glFormat=n.RGBA,this._glInternalFormat=e.extCompressedTexturePVRTC.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;break;case 26:this._glFormat=n.RGB,this._glInternalFormat=e.extCompressedTexturePVRTC.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;break;case 27:this._glFormat=n.RGBA,this._glInternalFormat=e.extCompressedTexturePVRTC.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;break;case 22:this._glFormat=n.RGB,this._glInternalFormat=e.extCompressedTextureETC.COMPRESSED_RGB8_ETC2;break;case 23:this._glFormat=n.RGBA,this._glInternalFormat=e.extCompressedTextureETC.COMPRESSED_RGBA8_ETC2_EAC;break;case 28:this._glFormat=n.RGBA,this._glInternalFormat=e.extCompressedTextureASTC.COMPRESSED_RGBA_ASTC_4x4_KHR;break;case 29:this._glFormat=n.RGB,this._glInternalFormat=e.extCompressedTextureATC.COMPRESSED_RGB_ATC_WEBGL;break;case 30:this._glFormat=n.RGBA,this._glInternalFormat=e.extCompressedTextureATC.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL;break;case 65:this._glFormat=n.RGB,this._glInternalFormat=e.extTextureCompressionBPTC.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;break;case 66:this._glFormat=n.RGB,this._glInternalFormat=e.extTextureCompressionBPTC.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;break;case 67:this._glFormat=n.RGBA,this._glInternalFormat=e.extTextureCompressionBPTC.COMPRESSED_RGBA_BPTC_UNORM_EXT;break;case 54:this._glFormat=n.SRGB,this._glInternalFormat=e.extCompressedTextureS3TC_SRGB.COMPRESSED_SRGB_S3TC_DXT1_EXT;break;case 55:this._glFormat=n.SRGB_ALPHA,this._glInternalFormat=e.extCompressedTextureS3TC_SRGB.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;break;case 56:this._glFormat=n.SRGB_ALPHA,this._glInternalFormat=e.extCompressedTextureS3TC_SRGB.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;break;case 61:this._glFormat=n.SRGB,this._glInternalFormat=e.extCompressedTextureETC.COMPRESSED_SRGB8_ETC2;break;case 62:this._glFormat=n.SRGB_ALPHA,this._glInternalFormat=e.extCompressedTextureETC.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;break;case 63:this._glFormat=n.SRGB_ALPHA,this._glInternalFormat=e.extCompressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;break;case 68:this._glFormat=n.RGBA,this._glInternalFormat=e.extTextureCompressionBPTC.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT;break;case 50:this._glFormat=n.RED,this._glInternalFormat=n.R16F,this._glPixelType=n.HALF_FLOAT;break;case 51:this._glFormat=n.RG,this._glInternalFormat=n.RG16F,this._glPixelType=n.HALF_FLOAT;break;case 11:this._glFormat=n.RGB,this._glInternalFormat=n.RGB16F,this._glPixelType=n.HALF_FLOAT;break;case 12:this._glFormat=n.RGBA,this._glInternalFormat=n.RGBA16F,this._glPixelType=n.HALF_FLOAT;break;case 13:this._glFormat=n.RGB,this._glInternalFormat=n.RGB32F,this._glPixelType=n.FLOAT;break;case 14:this._glFormat=n.RGBA,this._glInternalFormat=n.RGBA32F,this._glPixelType=n.FLOAT;break;case 15:this._glFormat=n.RED,this._glInternalFormat=n.R32F,this._glPixelType=n.FLOAT;break;case 70:this._glFormat=n.RG,this._glInternalFormat=n.RG32F,this._glPixelType=n.FLOAT;break;case 16:this._glFormat=n.DEPTH_COMPONENT,this._glInternalFormat=n.DEPTH_COMPONENT32F,this._glPixelType=n.FLOAT;break;case 69:this._glFormat=n.DEPTH_COMPONENT,this._glInternalFormat=n.DEPTH_COMPONENT16,this._glPixelType=n.UNSIGNED_SHORT;break;case 17:this._glFormat=n.DEPTH_STENCIL,this._glInternalFormat=n.DEPTH24_STENCIL8,this._glPixelType=n.UNSIGNED_INT_24_8;break;case 18:this._glFormat=n.RGB,this._glInternalFormat=n.R11F_G11F_B10F,this._glPixelType=n.UNSIGNED_INT_10F_11F_11F_REV;break;case 19:this._glFormat=n.RGB,this._glInternalFormat=n.SRGB8,this._glPixelType=n.UNSIGNED_BYTE;break;case 20:this._glFormat=n.RGBA,this._glInternalFormat=n.SRGB8_ALPHA8,this._glPixelType=n.UNSIGNED_BYTE;break;case 32:this._glFormat=n.RED_INTEGER,this._glInternalFormat=n.R8I,this._glPixelType=n.BYTE;break;case 33:this._glFormat=n.RED_INTEGER,this._glInternalFormat=n.R8UI,this._glPixelType=n.UNSIGNED_BYTE;break;case 34:this._glFormat=n.RED_INTEGER,this._glInternalFormat=n.R16I,this._glPixelType=n.SHORT;break;case 35:this._glFormat=n.RED_INTEGER,this._glInternalFormat=n.R16UI,this._glPixelType=n.UNSIGNED_SHORT;break;case 36:this._glFormat=n.RED_INTEGER,this._glInternalFormat=n.R32I,this._glPixelType=n.INT;break;case 37:this._glFormat=n.RED_INTEGER,this._glInternalFormat=n.R32UI,this._glPixelType=n.UNSIGNED_INT;break;case 38:this._glFormat=n.RG_INTEGER,this._glInternalFormat=n.RG8I,this._glPixelType=n.BYTE;break;case 39:this._glFormat=n.RG_INTEGER,this._glInternalFormat=n.RG8UI,this._glPixelType=n.UNSIGNED_BYTE;break;case 40:this._glFormat=n.RG_INTEGER,this._glInternalFormat=n.RG16I,this._glPixelType=n.SHORT;break;case 41:this._glFormat=n.RG_INTEGER,this._glInternalFormat=n.RG16UI,this._glPixelType=n.UNSIGNED_SHORT;break;case 42:this._glFormat=n.RG_INTEGER,this._glInternalFormat=n.RG32I,this._glPixelType=n.INT;break;case 43:this._glFormat=n.RG_INTEGER,this._glInternalFormat=n.RG32UI,this._glPixelType=n.UNSIGNED_INT;break;case 44:this._glFormat=n.RGBA_INTEGER,this._glInternalFormat=n.RGBA8I,this._glPixelType=n.BYTE;break;case 45:this._glFormat=n.RGBA_INTEGER,this._glInternalFormat=n.RGBA8UI,this._glPixelType=n.UNSIGNED_BYTE;break;case 46:this._glFormat=n.RGBA_INTEGER,this._glInternalFormat=n.RGBA16I,this._glPixelType=n.SHORT;break;case 47:this._glFormat=n.RGBA_INTEGER,this._glInternalFormat=n.RGBA16UI,this._glPixelType=n.UNSIGNED_SHORT;break;case 48:this._glFormat=n.RGBA_INTEGER,this._glInternalFormat=n.RGBA32I,this._glPixelType=n.INT;break;case 49:this._glFormat=n.RGBA_INTEGER,this._glInternalFormat=n.RGBA32UI,this._glPixelType=n.UNSIGNED_INT}this._glCreated=!1}upload(e,t){let n=e.gl;if(!t._needsUpload&&t._needsMipmapsUpload&&t._mipmapsUploaded)return;let r=0,i,a,o=t.numLevels;for(t.array&&!this._glCreated&&n.texStorage3D(n.TEXTURE_2D_ARRAY,o,this._glInternalFormat,t._width,t._height,t._arrayLength);t._levels[r]||r===0;){if(!t._needsUpload&&r===0){r++;continue}if(r&&(!t._needsMipmapsUpload||!t._mipmaps))break;if(i=t._levels[r],a=1/2**r,r===1&&!t._compressed&&!t._integerFormat&&t._levels.length<o&&(n.generateMipmap(this._glTarget),t._mipmapsUploaded=!0),t._cubemap){let o;if(e._isBrowserInterface(i[0]))for(o=0;o<6;o++){if(!t._levelsUpdated[0][o])continue;let a=i[o];e._isImageBrowserInterface(a)&&(a.width>e.maxCubeMapSize||a.height>e.maxCubeMapSize)&&(a=Vi(a,e.maxCubeMapSize),r===0&&(t._width=a.width,t._height=a.height)),e.setUnpackFlipY(!1),e.setUnpackPremultiplyAlpha(t._premultiplyAlpha),this._glCreated?n.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+o,r,0,0,this._glFormat,this._glPixelType,a):n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+o,r,this._glInternalFormat,this._glFormat,this._glPixelType,a)}else for(a=1/2**r,o=0;o<6;o++){if(!t._levelsUpdated[0][o])continue;let s=i[o];t._compressed?this._glCreated&&s?n.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+o,r,0,0,Math.max(t._width*a,1),Math.max(t._height*a,1),this._glInternalFormat,s):n.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+o,r,this._glInternalFormat,Math.max(t._width*a,1),Math.max(t._height*a,1),0,s):(e.setUnpackFlipY(!1),e.setUnpackPremultiplyAlpha(t._premultiplyAlpha),e.setUnpackAlignment(1),this._glCreated&&s?n.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+o,r,0,0,Math.max(t._width*a,1),Math.max(t._height*a,1),this._glFormat,this._glPixelType,s):n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+o,r,this._glInternalFormat,Math.max(t._width*a,1),Math.max(t._height*a,1),0,this._glFormat,this._glPixelType,s))}}else if(t._volume)t._compressed?n.compressedTexImage3D(n.TEXTURE_3D,r,this._glInternalFormat,Math.max(t._width*a,1),Math.max(t._height*a,1),Math.max(t._depth*a,1),0,i):(e.setUnpackFlipY(!1),e.setUnpackPremultiplyAlpha(t._premultiplyAlpha),e.setUnpackAlignment(1),n.texImage3D(n.TEXTURE_3D,r,this._glInternalFormat,Math.max(t._width*a,1),Math.max(t._height*a,1),Math.max(t._depth*a,1),0,this._glFormat,this._glPixelType,i));else if(t.array){if(Array.isArray(i)&&t._arrayLength===i.length){if(t._compressed)for(let e=0;e<t._arrayLength;e++)n.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,r,0,0,e,Math.max(Math.floor(t._width*a),1),Math.max(Math.floor(t._height*a),1),1,this._glInternalFormat,i[e]);else{e.setUnpackAlignment(1);for(let e=0;e<t._arrayLength;e++)n.texSubImage3D(n.TEXTURE_2D_ARRAY,r,0,0,e,Math.max(Math.floor(t._width*a),1),Math.max(Math.floor(t._height*a),1),1,this._glFormat,this._glPixelType,i[e])}}}else{if(e._isBrowserInterface(i)){if(e._isHTMLElementInterface(i)&&e.supportsHtmlTextures){e.setUnpackFlipY(t._flipY),e.setUnpackPremultiplyAlpha(t._premultiplyAlpha);let a=i.getBoundingClientRect(),o=Math.floor(a.width)||t._width,s=Math.floor(a.height)||t._height;n.texElementImage2D(n.TEXTURE_2D,this._glInternalFormat,i),r===0&&(t._width=o,t._height=s)}else{e._isImageBrowserInterface(i)&&(i.width>e.maxTextureSize||i.height>e.maxTextureSize)&&(i=Vi(i,e.maxTextureSize),r===0&&(t._width=i.width,t._height=i.height));let a=i.width||i.videoWidth,o=i.height||i.videoHeight;e.setUnpackFlipY(t._flipY),e.setUnpackPremultiplyAlpha(t._premultiplyAlpha),this._glCreated&&t._width===a&&t._height===o&&!e._isImageVideoInterface(i)?n.texSubImage2D(n.TEXTURE_2D,r,0,0,this._glFormat,this._glPixelType,i):(n.texImage2D(n.TEXTURE_2D,r,this._glInternalFormat,this._glFormat,this._glPixelType,i),r===0&&(t._width=a,t._height=o))}}else a=1/2**r,t._compressed?this._glCreated&&i?n.compressedTexSubImage2D(n.TEXTURE_2D,r,0,0,Math.max(Math.floor(t._width*a),1),Math.max(Math.floor(t._height*a),1),this._glInternalFormat,i):n.compressedTexImage2D(n.TEXTURE_2D,r,this._glInternalFormat,Math.max(Math.floor(t._width*a),1),Math.max(Math.floor(t._height*a),1),0,i):(e.setUnpackFlipY(!1),e.setUnpackPremultiplyAlpha(t._premultiplyAlpha),e.setUnpackAlignment(1),this._glCreated&&i?n.texSubImage2D(n.TEXTURE_2D,r,0,0,Math.max(t._width*a,1),Math.max(t._height*a,1),this._glFormat,this._glPixelType,i):n.texImage2D(n.TEXTURE_2D,r,this._glInternalFormat,Math.max(t._width*a,1),Math.max(t._height*a,1),0,this._glFormat,this._glPixelType,i));t._mipmapsUploaded=r!==0}r++}if(t._needsUpload){if(t._cubemap)for(let e=0;e<6;e++)t._levelsUpdated[0][e]=!1;else t._levelsUpdated[0]=!1}!t._compressed&&!t._integerFormat&&t._mipmaps&&t._needsMipmapsUpload&&t._levels.length===1&&(n.generateMipmap(this._glTarget),t._mipmapsUploaded=!0),t._gpuSize&&t.adjustVramSizeTracking(e._vram,-t._gpuSize),t._gpuSize=t.gpuSize,t.adjustVramSizeTracking(e._vram,t._gpuSize),t.releaseSourceAfterUpload&&t.releaseImageSources(),this._glCreated=!0}uploadImmediate(e,t){(t._needsUpload||t._needsMipmapsUpload)&&(e.setTexture(t,0),t._needsUpload=!1,t._needsMipmapsUpload=!1)}read(e,t,n,r,i){let a=this.texture;return a.device.readTextureAsync(a,e,t,n,r,i)}write(e,t,n,r,i){let{texture:a}=this,{device:o}=a;return o.setTexture(a,0),o.writeTextureAsync(a,e,t,n,r,i)}copy(e,t){return this.texture.device.copyTextureToTexture(e,this.texture,t)}},Ui=new an,Wi=class{constructor(e,t){v(this,`msaaFB`,void 0),v(this,`resolveFB`,void 0),this.msaaFB=e,this.resolveFB=t}destroy(e){this.msaaFB&&(e.deleteRenderbuffer(this.msaaFB),this.msaaFB=null),this.resolveFB&&(e.deleteRenderbuffer(this.resolveFB),this.resolveFB=null)}},Gi=class{constructor(){v(this,`_glFrameBuffer`,null),v(this,`_glDepthBuffer`,null),v(this,`_glResolveFrameBuffer`,null),v(this,`colorMrtFramebuffers`,null),v(this,`_glMsaaColorBuffers`,[]),v(this,`_glMsaaDepthBuffer`,null),v(this,`msaaDepthBufferKey`,void 0),v(this,`suppliedColorFramebuffer`,void 0),v(this,`_isInitialized`,!1)}destroy(e){let t=e.gl;this._isInitialized=!1,this._glFrameBuffer&&(this._glFrameBuffer!==this.suppliedColorFramebuffer&&t.deleteFramebuffer(this._glFrameBuffer),this._glFrameBuffer=null),this._glDepthBuffer&&(t.deleteRenderbuffer(this._glDepthBuffer),this._glDepthBuffer=null),this._glResolveFrameBuffer&&(this._glResolveFrameBuffer!==this.suppliedColorFramebuffer&&t.deleteFramebuffer(this._glResolveFrameBuffer),this._glResolveFrameBuffer=null),this._glMsaaColorBuffers.forEach(e=>{t.deleteRenderbuffer(e)}),this._glMsaaColorBuffers.length=0,this.colorMrtFramebuffers?.forEach(e=>{e.destroy(t)}),this.colorMrtFramebuffers=null,this._glMsaaDepthBuffer&&(this._glMsaaDepthBuffer=null,this.msaaDepthBufferKey&&Cr(e).release(this.msaaDepthBufferKey)),this.suppliedColorFramebuffer=void 0}get initialized(){return this._isInitialized}init(e,t){let n=e.gl;this._isInitialized=!0;let r=[];if(this.suppliedColorFramebuffer!==void 0)this._glFrameBuffer=this.suppliedColorFramebuffer;else{this._glFrameBuffer=n.createFramebuffer(),e.setFramebuffer(this._glFrameBuffer);let i=t._colorBuffers?.length??0,a=n.COLOR_ATTACHMENT0;for(let o=0;o<i;++o){let i=t.getColorBuffer(o);i&&(i.impl._glTexture||(i._width=Math.min(i.width,e.maxRenderBufferSize),i._height=Math.min(i.height,e.maxRenderBufferSize),e.setTexture(i,0)),n.framebufferTexture2D(n.FRAMEBUFFER,a+o,i._cubemap?n.TEXTURE_CUBE_MAP_POSITIVE_X+t._face:n.TEXTURE_2D,i.impl._glTexture,t.mipLevel),r.push(a+o))}n.drawBuffers(r);let o=t._depthBuffer;if(o||t._depth){let r=t._stencil?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(o)o.impl._glTexture||(o._width=Math.min(o.width,e.maxRenderBufferSize),o._height=Math.min(o.height,e.maxRenderBufferSize),e.setTexture(o,0)),n.framebufferTexture2D(n.FRAMEBUFFER,r,o._cubemap?n.TEXTURE_CUBE_MAP_POSITIVE_X+t._face:n.TEXTURE_2D,t._depthBuffer.impl._glTexture,t.mipLevel);else if(!(t._samples>1)){this._glDepthBuffer||(this._glDepthBuffer=n.createRenderbuffer());let e=t._stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT32F;n.bindRenderbuffer(n.RENDERBUFFER,this._glDepthBuffer),n.renderbufferStorage(n.RENDERBUFFER,e,t.width,t.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,r,n.RENDERBUFFER,this._glDepthBuffer),n.bindRenderbuffer(n.RENDERBUFFER,null)}}}if(t._samples>1){this._glResolveFrameBuffer=this._glFrameBuffer,this._glFrameBuffer=n.createFramebuffer(),e.setFramebuffer(this._glFrameBuffer);let i=t._colorBuffers?.length??0;if(this.suppliedColorFramebuffer!==void 0){let r=n.createRenderbuffer();this._glMsaaColorBuffers.push(r);let i=e.backBufferFormat===7?n.RGBA8:n.RGB8;n.bindRenderbuffer(n.RENDERBUFFER,r),n.renderbufferStorageMultisample(n.RENDERBUFFER,t._samples,i,t.width,t.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,r)}else for(let e=0;e<i;++e){let r=t.getColorBuffer(e);if(r){let i=n.createRenderbuffer();this._glMsaaColorBuffers.push(i),n.bindRenderbuffer(n.RENDERBUFFER,i),n.renderbufferStorageMultisample(n.RENDERBUFFER,t._samples,r.impl._glInternalFormat,t.width,t.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+e,n.RENDERBUFFER,i)}}if(t._depth){let r=t._stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT32F,i=t._stencil?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,a,o=t._depthBuffer;o&&(a=`${o.id}:${t.width}:${t.height}:${t._samples}:${r}:${i}`,this._glMsaaDepthBuffer=Cr(e).get(a)),this._glMsaaDepthBuffer||(this._glMsaaDepthBuffer=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,this._glMsaaDepthBuffer),n.renderbufferStorageMultisample(n.RENDERBUFFER,t._samples,r,t.width,t.height),this._glMsaaDepthBuffer.destroy=function(){n.deleteRenderbuffer(this)},o&&Cr(e).set(a,this._glMsaaDepthBuffer)),this.msaaDepthBufferKey=a,n.framebufferRenderbuffer(n.FRAMEBUFFER,i,n.RENDERBUFFER,this._glMsaaDepthBuffer)}i>1&&(this._createMsaaMrtFramebuffers(e,t,i),e.setFramebuffer(this._glFrameBuffer),n.drawBuffers(r))}}_createMsaaMrtFramebuffers(e,t,n){let r=e.gl;this.colorMrtFramebuffers=[];for(let i=0;i<n;++i){let n=t.getColorBuffer(i),a=r.createFramebuffer();e.setFramebuffer(a);let o=this._glMsaaColorBuffers[i];r.bindRenderbuffer(r.RENDERBUFFER,o),r.renderbufferStorageMultisample(r.RENDERBUFFER,t._samples,n.impl._glInternalFormat,t.width,t.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,o),r.drawBuffers([r.COLOR_ATTACHMENT0]);let s=r.createFramebuffer();e.setFramebuffer(s),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,n._cubemap?r.TEXTURE_CUBE_MAP_POSITIVE_X+t._face:r.TEXTURE_2D,n.impl._glTexture,0),this.colorMrtFramebuffers[i]=new Wi(a,s)}}_checkFbo(e,t,n=``){let r=`${n}:${t._colorBuffers?.map(e=>e?.format??-1).join(`,`)??``}:${t._depth?t._depthBuffer?`dt${t._depthBuffer.format}`:t._stencil?`ds`:`d`:``}:${t._samples}`,i=Ui.get(e,()=>{let e=new Set;return e.loseContext=()=>e.clear(),e});if(i.has(r))return;let a=e.gl,o=a.checkFramebufferStatus(a.FRAMEBUFFER);switch(o){case a.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:break;case a.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:break;case a.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:break;case a.FRAMEBUFFER_UNSUPPORTED:}o===a.FRAMEBUFFER_COMPLETE&&i.add(r)}loseContext(){this._glFrameBuffer=null,this._glDepthBuffer=null,this._glResolveFrameBuffer=null,this._glMsaaColorBuffers.length=0,this._glMsaaDepthBuffer=null,this.msaaDepthBufferKey=void 0,this.colorMrtFramebuffers=null,this.suppliedColorFramebuffer=void 0,this._isInitialized=!1}internalResolve(e,t,n,r,i){e.setScissor(0,0,r.width,r.height);let a=e.gl;a.bindFramebuffer(a.READ_FRAMEBUFFER,t),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,n),a.blitFramebuffer(0,0,r.width,r.height,0,0,r.width,r.height,i,a.NEAREST)}resolve(e,t,n,r){let i=e.gl;if(this.colorMrtFramebuffers){if(n)for(let n=0;n<this.colorMrtFramebuffers.length;n++){let r=this.colorMrtFramebuffers[n];this.internalResolve(e,r.msaaFB,r.resolveFB,t,i.COLOR_BUFFER_BIT)}r&&this.internalResolve(e,this._glFrameBuffer,this._glResolveFrameBuffer,t,i.DEPTH_BUFFER_BIT)}else{let a=!!e.defaultFramebuffer&&this._glResolveFrameBuffer===e.defaultFramebuffer;n&&a&&m.visionos&&(e.resolveMsaaColorToXrFramebufferViaQuads(this._glFrameBuffer,this._glResolveFrameBuffer,t.width,t.height),n=!1),(n||r)&&this.internalResolve(e,this._glFrameBuffer,this._glResolveFrameBuffer,t,(n?i.COLOR_BUFFER_BIT:0)|(r?i.DEPTH_BUFFER_BIT:0))}i.bindFramebuffer(i.FRAMEBUFFER,this._glFrameBuffer)}},Ki=class{constructor(e){v(this,`availablePBOs`,[]),v(this,`pendingPBOs`,[]),this.uploadStream=e,this.useSingleBuffer=e.useSingleBuffer}destroy(){let e=this.uploadStream.device.gl;this.availablePBOs.forEach(t=>e.deleteBuffer(t.pbo)),this.pendingPBOs.forEach(t=>{t.sync&&e.deleteSync(t.sync),e.deleteBuffer(t.pbo)})}_onDeviceLost(){this.availablePBOs.length=0,this.pendingPBOs.length=0}update(e){let t=this.uploadStream.device.gl,n=this.pendingPBOs;for(let e=n.length-1;e>=0;e--){let r=n[e],i=t.clientWaitSync(r.sync,0,0);(i===t.CONDITION_SATISFIED||i===t.ALREADY_SIGNALED)&&(t.deleteSync(r.sync),this.availablePBOs.push({pbo:r.pbo,size:r.size}),n.splice(e,1))}let r=this.availablePBOs;for(let n=r.length-1;n>=0;n--)r[n].size<e&&(t.deleteBuffer(r[n].pbo),r.splice(n,1))}upload(e,t,n,r){this.useSingleBuffer?this.uploadDirect(e,t,n,r):this.uploadPBO(e,t,n,r)}uploadDirect(e,t,n,r){let i=this.uploadStream.device,a=i.gl,o=t.impl;i.setTexture(t,0),i.activeTexture(0),i.bindTexture(t),i.setUnpackFlipY(!1),i.setUnpackPremultiplyAlpha(!1),i.setUnpackAlignment(e.BYTES_PER_ELEMENT);let s=e;if(o._glPixelType===a.UNSIGNED_BYTE&&e.BYTES_PER_ELEMENT!==1){let t=r*e.BYTES_PER_ELEMENT;s=new Uint8Array(e.buffer,e.byteOffset,t)}a.texImage2D(a.TEXTURE_2D,0,o._glInternalFormat,t.width,t.height,0,o._glFormat,o._glPixelType,s),o._glCreated=!0}uploadPBO(e,t,n,r){let i=this.uploadStream.device,a=i.gl,o=t.width,s=r*e.BYTES_PER_ELEMENT;this.update(s);let c=n/o,l=r/o,u=this.availablePBOs.pop()??{pbo:a.createBuffer(),size:s};a.bindBuffer(a.PIXEL_UNPACK_BUFFER,u.pbo),a.bufferData(a.PIXEL_UNPACK_BUFFER,s,a.STREAM_DRAW),a.bufferSubData(a.PIXEL_UNPACK_BUFFER,0,new Uint8Array(e.buffer,e.byteOffset,s)),a.bindBuffer(a.PIXEL_UNPACK_BUFFER,null),i.setTexture(t,0),i.activeTexture(0),i.bindTexture(t),a.bindBuffer(a.PIXEL_UNPACK_BUFFER,u.pbo),i.setUnpackFlipY(!1),i.setUnpackPremultiplyAlpha(!1),i.setUnpackAlignment(e.BYTES_PER_ELEMENT),a.pixelStorei(a.UNPACK_ROW_LENGTH,0),a.pixelStorei(a.UNPACK_SKIP_ROWS,0),a.pixelStorei(a.UNPACK_SKIP_PIXELS,0);let d=t.impl;a.texSubImage2D(a.TEXTURE_2D,0,0,c,o,l,d._glFormat,d._glPixelType,0),a.bindBuffer(a.PIXEL_UNPACK_BUFFER,null);let f=a.fenceSync(a.SYNC_GPU_COMMANDS_COMPLETE,0);this.pendingPBOs.push({pbo:u.pbo,size:s,sync:f}),a.flush()}},qi=class{constructor(e){v(this,`_presentationLayer`,null),v(this,`_graphicsBinding`,null),v(this,`_cameraFbSource`,null),v(this,`_cameraFbDest`,null),this.xrBridge=e}destroy(e){this._graphicsBinding=null,this._presentationLayer=null,this._deleteCameraFramebuffers(e)}_deleteCameraFramebuffers(e){if(this._cameraFbSource){let t=e.gl;t.deleteFramebuffer(this._cameraFbSource),this._cameraFbSource=null,t.deleteFramebuffer(this._cameraFbDest),this._cameraFbDest=null}}beginFrame(e,t){let n=e.session.renderState.baseLayer;this.xrBridge.device.defaultFramebuffer=n?n.framebuffer:null}endFrame(){this.xrBridge.device.defaultFramebuffer=null}get presentationLayer(){return this._presentationLayer}get graphicsBinding(){return this._graphicsBinding}getFramebufferSize(e,t){let n=e.session.renderState.baseLayer;if(!n){t.set(0,0);return}t.set(n.framebufferWidth,n.framebufferHeight)}getViewport(e,t){let n=e.session.renderState.baseLayer;return n?n.getViewport(t):{x:0,y:0,width:0,height:0}}attachPresentation(e,t){let n=this.xrBridge.device;if(this._presentationLayer=new XRWebGLLayer(e,n.gl,{alpha:!0,depth:!0,stencil:!0,framebufferScaleFactor:t.framebufferScaleFactor,antialias:!1}),window.XRWebGLBinding)try{this._graphicsBinding=new XRWebGLBinding(e,n.gl)}catch(e){this.xrBridge._onBindingError?.(e)}e.updateRenderState({baseLayer:this._presentationLayer,depthNear:t.depthNear,depthFar:t.depthFar})}releasePresentation(){this._graphicsBinding=null}syncCameraColorTexture(e,t){if(!this._graphicsBinding)return;let n=this.xrBridge.device,r=n.gl,i=this._graphicsBinding.getCameraImage(e);if(!i)return;this._cameraFbSource||(this._cameraFbSource=r.createFramebuffer(),this._cameraFbDest=r.createFramebuffer());let a=e.width,o=e.height;n.setFramebuffer(this._cameraFbSource),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,i,0),n.setFramebuffer(this._cameraFbDest),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t.impl._glTexture,0),r.bindFramebuffer(r.READ_FRAMEBUFFER,this._cameraFbSource),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,this._cameraFbDest),r.blitFramebuffer(0,o,a,0,0,0,a,o,r.COLOR_BUFFER_BIT,r.NEAREST),n.setFramebuffer(n.defaultFramebuffer)}syncCameraDepthTexture(e,t,n){if(!e?.texture)return;let r=this.xrBridge.device.gl;switch(t.impl._glTexture=e.texture,e.textureType===`texture-array`?t.impl._glTarget=r.TEXTURE_2D_ARRAY:t.impl._glTarget=r.TEXTURE_2D,n){case 15:t.impl._glInternalFormat=r.R32F,t.impl._glPixelType=r.FLOAT,t.impl._glFormat=r.RED;break;case 16:t.impl._glInternalFormat=r.DEPTH_COMPONENT16,t.impl._glPixelType=r.UNSIGNED_SHORT,t.impl._glFormat=r.DEPTH_COMPONENT}t.impl._glCreated=!0}onGraphicsDeviceLost(){let e=this.xrBridge._session;if(!e)return;let t=e.renderState;this._graphicsBinding=null,this._presentationLayer=null,this._cameraFbSource=null,this._cameraFbDest=null,e.updateRenderState({baseLayer:this._presentationLayer,depthNear:t.depthNear,depthFar:t.depthFar})}onGraphicsDeviceRestored(){let e=this.xrBridge;if(!e._session)return;let t=e.device,n=e.eventHandler;setTimeout(()=>{e._session&&t.gl.makeXRCompatible().then(()=>{if(!e._session)return;let t=e._session.renderState;e.attachPresentation(e._session,{framebufferScaleFactor:e._framebufferScaleFactor,depthNear:t.depthNear,depthFar:t.depthFar,onBindingError:e._onBindingError})}).catch(e=>{n.fire(`error`,e)})},0)}},Ji={type:4,base:0,count:6,indexed:!0},Yi=`
	attribute vec2 vertex_position;
	varying vec2 pcTexCoord;
	void main() {
		gl_Position = vec4(vertex_position, 0.0, 1.0);
		pcTexCoord = vertex_position * 0.5 + 0.5;
	}
`,Xi=`
	uniform sampler2D pcSource;
	varying vec2 pcTexCoord;
	void main() {
		gl_FragColor = texture2D(pcSource, pcTexCoord);
	}
`,Zi=class{constructor(e){v(this,`_device`,void 0),v(this,`_shader`,null),v(this,`_scratchTex`,null),v(this,`_scratchRt`,null),v(this,`_sourceId`,null),this._device=e}_getShader(){if(!this._shader){let e=this._device;this._shader=new mi(e,fi.createDefinition(e,{name:`XrMsaaCopy`,attributes:{vertex_position:P},vertexCode:Yi,fragmentCode:Xi})),this._sourceId=e.scope.resolve(`pcSource`)}return this._shader}_ensureScratch(e,t){let n=this._device;this._scratchTex&&(this._scratchTex.width!==e||this._scratchTex.height!==t)&&(this._scratchRt.destroy(),this._scratchRt=null,this._scratchTex.destroy(),this._scratchTex=null),this._scratchTex||(this._scratchTex=dn.createDataTexture2D(n,`XrMsaaScratch`,e,t,n.backBufferFormat),this._scratchRt=new gr({colorBuffer:this._scratchTex,depth:!1,stencil:!1})),this._scratchRt.impl.initialized||this._scratchRt.impl.init(n,this._scratchRt)}copy(e,t,n,r){this._ensureScratch(n,r);let i=this._device,a=i.gl;a.bindFramebuffer(a.READ_FRAMEBUFFER,e),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,this._scratchRt.impl._glFrameBuffer),a.blitFramebuffer(0,0,n,r,0,0,n,r,a.COLOR_BUFFER_BIT,a.NEAREST),i.setDrawStates(Vn.NOBLEND,qn.NODEPTH),i.setFramebuffer(t),i.setShader(this._getShader()),i.clearVertexBuffer(),i.setVertexBuffer(i.quadVertexBuffer),this._sourceId.setValue(this._scratchTex);let{vx:o,vy:s,vw:c,vh:l,sx:u,sy:d,sw:f,sh:p}=i;i.setViewport(0,0,n,r),i.setScissor(0,0,n,r),i.draw(Ji,i.quadIndexBuffer),i.setViewport(o,s,c,l),i.setScissor(u,d,f,p),i.setFramebuffer(e)}destroy(){this._shader?.destroy(),this._shader=null,this._scratchRt?.destroy(),this._scratchRt=null,this._scratchTex?.destroy(),this._scratchTex=null,this._sourceId=null}},Qi=class{constructor(){v(this,`renderVersion`,void 0),v(this,`queries`,[])}destroy(e){this.queries.forEach(t=>e.deleteQuery(t)),this.queries=null}},$i=class extends bi{constructor(e){super(),v(this,`device`,void 0),v(this,`freeQueries`,[]),v(this,`frameQueries`,[]),v(this,`previousFrameQueries`,[]),v(this,`timings`,[]),this.device=e,this.ext=e.extDisjointTimerQuery}destroy(){this.freeQueries.forEach(e=>this.device.gl.deleteQuery(e)),this.frameQueries.forEach(e=>this.device.gl.deleteQuery(e)),this.previousFrameQueries.forEach(e=>e.destroy(this.device.gl)),this.freeQueries=null,this.frameQueries=null,this.previousFrameQueries=null}loseContext(){super.loseContext(),this.freeQueries=[],this.frameQueries=[],this.previousFrameQueries=[]}restoreContext(){this.ext=this.device.extDisjointTimerQuery}getQuery(){return this.freeQueries.pop()??this.device.gl.createQuery()}start(e){if(this.ext){let t=this.getSlot(e),n=this.getQuery();return this.frameQueries[t]=n,this.device.gl.beginQuery(this.ext.TIME_ELAPSED_EXT,n),t}}end(e){e!==void 0&&this.device.gl.endQuery(this.ext.TIME_ELAPSED_EXT)}frameStart(){this.processEnableRequest(),this._enabled&&(this.frameGPUMarkerSlot=this.start(`GpuFrame`))}frameEnd(){this._enabled&&this.end(this.frameGPUMarkerSlot)}request(){if(this._enabled){let e=this.ext,t=this.device.gl,n=this.device.renderVersion,r=this.frameQueries;if(r.length>0){this.frameQueries=[];let e=new Qi;e.queries=r,e.renderVersion=n,this.previousFrameQueries.push(e)}if(this.previousFrameQueries.length>0){let n=this.previousFrameQueries[0],r=n.queries,i=r[r.length-1],a=t.getQueryParameter(i,t.QUERY_RESULT_AVAILABLE),o=t.getParameter(e.GPU_DISJOINT_EXT);if(a&&!o){this.previousFrameQueries.shift();let e=this.timings;e.length=0;for(let n=0;n<r.length;n++){let i=r[n],a=t.getQueryParameter(i,t.QUERY_RESULT);e[n]=a*1e-6,this.freeQueries.push(i)}this.report(n.renderVersion,e)}o&&(this.previousFrameQueries.forEach(e=>{this.report(e.renderVersion,null),e.destroy(t)}),this.previousFrameQueries.length=0)}super.request(n)}}},ea=new Vn,ta=8,na=new Float32Array(4),ra=new Int32Array(4),ia=new Uint32Array(4),aa={flags:0,color:[0,0,0,1],depth:1,stencil:0},oa=e=>{switch(e){case 52:return 1;case 53:return 2;default:return 0}},sa=[],ca=100,la=class extends mr{constructor(e,t={}){super(e,t),v(this,`gl`,void 0),v(this,`_defaultFramebuffer`,null),v(this,`_defaultFramebufferChanged`,!1),v(this,`_xrMsaaCopy`,null),v(this,`_readbackCopies`,new Set),t=this.initOptions,this.initTextureUnits(),this.contextLost=!1,this._contextLostHandler=e=>{e.preventDefault(),this.loseContext()},this._contextRestoredHandler=()=>{this.restoreContext()};let n=typeof navigator<`u`&&navigator.userAgent;if(this.forceDisableMultisampling=n&&n.includes(`AppleWebKit`)&&(n.includes(`Version/15.4`)||n.includes(`OS 15_4`)),this.forceDisableMultisampling&&(t.antialias=!1),m.browserName===`firefox`){let e=(typeof navigator<`u`?navigator.userAgent:``).match(/Firefox\/(\d+(\.\d+)*)/),n=e?e[1]:null;if(n){let e=parseFloat(n);(m.name===`windows`&&(e>=120||e===115)||m.name===`android`&&e>=132)&&(t.antialias=!1)}}this.backBufferAntialias=t.antialias??!1,t.antialias=!1;let r=t.gl??e.getContext(`webgl2`,t);if(!r)throw Error(`WebGL not supported`);this.gl=r,this.isWebGL2=!0,this._deviceType=Ht,this.updateBackbufferFormat(null);let i=m.browserName===`chrome`,a=m.browserName===`safari`,o=m.browser&&navigator.appVersion.indexOf(`Mac`)!==-1;this._tempEnableSafariTextureUnitWorkaround=a,this._tempMacChromeBlitFramebufferWorkaround=o&&i&&!t.alpha,e.addEventListener(`webglcontextlost`,this._contextLostHandler,!1),e.addEventListener(`webglcontextrestored`,this._contextRestoredHandler,!1),this.initializeExtensions(),this.initializeCapabilities(),this.initializeRenderState(),this.initializeContextCaches(),this.createBackbuffer(null),this.dynamicBuffers=new zi(this),this.supportsImageBitmap=!a&&typeof ImageBitmap<`u`,this._samplerTypes=new Set([r.SAMPLER_2D,r.SAMPLER_CUBE,r.UNSIGNED_INT_SAMPLER_2D,r.INT_SAMPLER_2D,r.SAMPLER_2D_SHADOW,r.SAMPLER_CUBE_SHADOW,r.SAMPLER_3D,r.INT_SAMPLER_3D,r.UNSIGNED_INT_SAMPLER_3D,r.SAMPLER_2D_ARRAY,r.INT_SAMPLER_2D_ARRAY,r.UNSIGNED_INT_SAMPLER_2D_ARRAY]),this.glAddress=[r.REPEAT,r.CLAMP_TO_EDGE,r.MIRRORED_REPEAT],this.glBlendEquation=[r.FUNC_ADD,r.FUNC_SUBTRACT,r.FUNC_REVERSE_SUBTRACT,r.MIN,r.MAX],this.glBlendFunctionColor=[r.ZERO,r.ONE,r.SRC_COLOR,r.ONE_MINUS_SRC_COLOR,r.DST_COLOR,r.ONE_MINUS_DST_COLOR,r.SRC_ALPHA,r.SRC_ALPHA_SATURATE,r.ONE_MINUS_SRC_ALPHA,r.DST_ALPHA,r.ONE_MINUS_DST_ALPHA,r.CONSTANT_COLOR,r.ONE_MINUS_CONSTANT_COLOR,this.extBlendFuncExtended?.SRC1_COLOR_WEBGL,this.extBlendFuncExtended?.ONE_MINUS_SRC1_COLOR_WEBGL,this.extBlendFuncExtended?.SRC1_ALPHA_WEBGL,this.extBlendFuncExtended?.ONE_MINUS_SRC1_ALPHA_WEBGL],this.glBlendFunctionAlpha=[r.ZERO,r.ONE,r.SRC_COLOR,r.ONE_MINUS_SRC_COLOR,r.DST_COLOR,r.ONE_MINUS_DST_COLOR,r.SRC_ALPHA,r.SRC_ALPHA_SATURATE,r.ONE_MINUS_SRC_ALPHA,r.DST_ALPHA,r.ONE_MINUS_DST_ALPHA,r.CONSTANT_ALPHA,r.ONE_MINUS_CONSTANT_ALPHA,this.extBlendFuncExtended?.SRC1_COLOR_WEBGL,this.extBlendFuncExtended?.ONE_MINUS_SRC1_COLOR_WEBGL,this.extBlendFuncExtended?.SRC1_ALPHA_WEBGL,this.extBlendFuncExtended?.ONE_MINUS_SRC1_ALPHA_WEBGL],this.glComparison=[r.NEVER,r.LESS,r.EQUAL,r.LEQUAL,r.GREATER,r.NOTEQUAL,r.GEQUAL,r.ALWAYS],this.glStencilOp=[r.KEEP,r.ZERO,r.REPLACE,r.INCR,r.INCR_WRAP,r.DECR,r.DECR_WRAP,r.INVERT],this.glClearFlag=[0,r.COLOR_BUFFER_BIT,r.DEPTH_BUFFER_BIT,r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT,r.STENCIL_BUFFER_BIT,r.STENCIL_BUFFER_BIT|r.COLOR_BUFFER_BIT,r.STENCIL_BUFFER_BIT|r.DEPTH_BUFFER_BIT,r.STENCIL_BUFFER_BIT|r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT],this.glCull=[0,r.BACK,r.FRONT,r.FRONT_AND_BACK],this.glFrontFace=[r.CCW,r.CW],this.glFilter=[r.NEAREST,r.LINEAR,r.NEAREST_MIPMAP_NEAREST,r.NEAREST_MIPMAP_LINEAR,r.LINEAR_MIPMAP_NEAREST,r.LINEAR_MIPMAP_LINEAR],this.glPrimitive=[r.POINTS,r.LINES,r.LINE_LOOP,r.LINE_STRIP,r.TRIANGLES,r.TRIANGLE_STRIP,r.TRIANGLE_FAN],this.glType=[r.BYTE,r.UNSIGNED_BYTE,r.SHORT,r.UNSIGNED_SHORT,r.INT,r.UNSIGNED_INT,r.FLOAT,r.HALF_FLOAT],this.pcUniformType={},this.pcUniformType[r.BOOL]=0,this.pcUniformType[r.INT]=1,this.pcUniformType[r.FLOAT]=2,this.pcUniformType[r.FLOAT_VEC2]=3,this.pcUniformType[r.FLOAT_VEC3]=4,this.pcUniformType[r.FLOAT_VEC4]=5,this.pcUniformType[r.INT_VEC2]=6,this.pcUniformType[r.INT_VEC3]=7,this.pcUniformType[r.INT_VEC4]=8,this.pcUniformType[r.BOOL_VEC2]=9,this.pcUniformType[r.BOOL_VEC3]=10,this.pcUniformType[r.BOOL_VEC4]=11,this.pcUniformType[r.FLOAT_MAT2]=12,this.pcUniformType[r.FLOAT_MAT3]=13,this.pcUniformType[r.FLOAT_MAT4]=14,this.pcUniformType[r.SAMPLER_2D]=15,this.pcUniformType[r.SAMPLER_CUBE]=16,this.pcUniformType[r.UNSIGNED_INT]=26,this.pcUniformType[r.UNSIGNED_INT_VEC2]=27,this.pcUniformType[r.UNSIGNED_INT_VEC3]=28,this.pcUniformType[r.UNSIGNED_INT_VEC4]=29,this.pcUniformType[r.SAMPLER_2D_SHADOW]=18,this.pcUniformType[r.SAMPLER_CUBE_SHADOW]=19,this.pcUniformType[r.SAMPLER_2D_ARRAY]=25,this.pcUniformType[r.SAMPLER_3D]=20,this.pcUniformType[r.INT_SAMPLER_2D]=42,this.pcUniformType[r.UNSIGNED_INT_SAMPLER_2D]=43,this.pcUniformType[r.INT_SAMPLER_CUBE]=44,this.pcUniformType[r.UNSIGNED_INT_SAMPLER_2D]=45,this.pcUniformType[r.INT_SAMPLER_3D]=46,this.pcUniformType[r.UNSIGNED_INT_SAMPLER_3D]=47,this.pcUniformType[r.INT_SAMPLER_2D_ARRAY]=48,this.pcUniformType[r.UNSIGNED_INT_SAMPLER_2D_ARRAY]=49,this.targetToSlot={},this.targetToSlot[r.TEXTURE_2D]=0,this.targetToSlot[r.TEXTURE_CUBE_MAP]=1,this.targetToSlot[r.TEXTURE_3D]=2;let s,c,l,u,d;this.commitFunction=[],this.commitFunction[0]=function(e,t){e.value!==t&&(r.uniform1i(e.locationId,t),e.value=t)},this.commitFunction[1]=this.commitFunction[0],this.commitFunction[2]=function(e,t){e.value!==t&&(r.uniform1f(e.locationId,t),e.value=t)},this.commitFunction[3]=function(e,t){d=e.value,s=t[0],c=t[1],(d[0]!==s||d[1]!==c)&&(r.uniform2fv(e.locationId,t),d[0]=s,d[1]=c)},this.commitFunction[4]=function(e,t){d=e.value,s=t[0],c=t[1],l=t[2],(d[0]!==s||d[1]!==c||d[2]!==l)&&(r.uniform3fv(e.locationId,t),d[0]=s,d[1]=c,d[2]=l)},this.commitFunction[5]=function(e,t){d=e.value,s=t[0],c=t[1],l=t[2],u=t[3],(d[0]!==s||d[1]!==c||d[2]!==l||d[3]!==u)&&(r.uniform4fv(e.locationId,t),d[0]=s,d[1]=c,d[2]=l,d[3]=u)},this.commitFunction[6]=function(e,t){d=e.value,s=t[0],c=t[1],(d[0]!==s||d[1]!==c)&&(r.uniform2iv(e.locationId,t),d[0]=s,d[1]=c)},this.commitFunction[9]=this.commitFunction[6],this.commitFunction[7]=function(e,t){d=e.value,s=t[0],c=t[1],l=t[2],(d[0]!==s||d[1]!==c||d[2]!==l)&&(r.uniform3iv(e.locationId,t),d[0]=s,d[1]=c,d[2]=l)},this.commitFunction[10]=this.commitFunction[7],this.commitFunction[8]=function(e,t){d=e.value,s=t[0],c=t[1],l=t[2],u=t[3],(d[0]!==s||d[1]!==c||d[2]!==l||d[3]!==u)&&(r.uniform4iv(e.locationId,t),d[0]=s,d[1]=c,d[2]=l,d[3]=u)},this.commitFunction[11]=this.commitFunction[8],this.commitFunction[12]=function(e,t){r.uniformMatrix2fv(e.locationId,!1,t)},this.commitFunction[13]=function(e,t){r.uniformMatrix3fv(e.locationId,!1,t)},this.commitFunction[14]=function(e,t){r.uniformMatrix4fv(e.locationId,!1,t)},this.commitFunction[17]=function(e,t){r.uniform1fv(e.locationId,t)},this.commitFunction[21]=function(e,t){r.uniform2fv(e.locationId,t)},this.commitFunction[22]=function(e,t){r.uniform3fv(e.locationId,t)},this.commitFunction[23]=function(e,t){r.uniform4fv(e.locationId,t)},this.commitFunction[26]=function(e,t){e.value!==t&&(r.uniform1ui(e.locationId,t),e.value=t)},this.commitFunction[27]=function(e,t){d=e.value,s=t[0],c=t[1],(d[0]!==s||d[1]!==c)&&(r.uniform2uiv(e.locationId,t),d[0]=s,d[1]=c)},this.commitFunction[28]=function(e,t){d=e.value,s=t[0],c=t[1],l=t[2],(d[0]!==s||d[1]!==c||d[2]!==l)&&(r.uniform3uiv(e.locationId,t),d[0]=s,d[1]=c,d[2]=l)},this.commitFunction[29]=function(e,t){d=e.value,s=t[0],c=t[1],l=t[2],u=t[3],(d[0]!==s||d[1]!==c||d[2]!==l||d[3]!==u)&&(r.uniform4uiv(e.locationId,t),d[0]=s,d[1]=c,d[2]=l,d[3]=u)},this.commitFunction[30]=function(e,t){r.uniform1iv(e.locationId,t)},this.commitFunction[31]=function(e,t){r.uniform1uiv(e.locationId,t)},this.commitFunction[32]=this.commitFunction[30],this.commitFunction[33]=function(e,t){r.uniform2iv(e.locationId,t)},this.commitFunction[34]=function(e,t){r.uniform2uiv(e.locationId,t)},this.commitFunction[35]=this.commitFunction[33],this.commitFunction[36]=function(e,t){r.uniform3iv(e.locationId,t)},this.commitFunction[37]=function(e,t){r.uniform3uiv(e.locationId,t)},this.commitFunction[38]=this.commitFunction[36],this.commitFunction[39]=function(e,t){r.uniform4iv(e.locationId,t)},this.commitFunction[40]=function(e,t){r.uniform4uiv(e.locationId,t)},this.commitFunction[41]=this.commitFunction[39],this.commitFunction[24]=function(e,t){r.uniformMatrix4fv(e.locationId,!1,t)},this.constantTexSource=this.scope.resolve(`source`),this.postInit()}postInit(){super.postInit(),this.gpuProfiler=new $i(this)}destroy(){super.destroy();for(let e of[...this._readbackCopies])e.abandon();let e=this.gl;this.feedback&&e.deleteTransformFeedback(this.feedback),this.clearVertexArrayObjectCache(),this._xrMsaaCopy?.destroy(),this._xrMsaaCopy=null,this.canvas.removeEventListener(`webglcontextlost`,this._contextLostHandler,!1),this.canvas.removeEventListener(`webglcontextrestored`,this._contextRestoredHandler,!1),this._contextLostHandler=null,this._contextRestoredHandler=null,this.gl=null,super.postDestroy()}createBackbuffer(e){this.supportsStencil=this.initOptions.stencil,this.backBuffer=new gr({name:`WebglFramebuffer`,graphicsDevice:this,depth:this.initOptions.depth,stencil:this.supportsStencil,samples:this.samples}),this.backBuffer.impl.suppliedColorFramebuffer=e}updateBackbufferFormat(e){let t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,e);let n=this.gl.getParameter(this.gl.ALPHA_BITS);this.backBufferFormat=n?7:6}updateBackbuffer(){let e=this.canvas.width!==this.backBufferSize.x||this.canvas.height!==this.backBufferSize.y;(this._defaultFramebufferChanged||e)&&(this._defaultFramebufferChanged&&this.updateBackbufferFormat(this._defaultFramebuffer),this._defaultFramebufferChanged=!1,this.backBufferSize.set(this.canvas.width,this.canvas.height),this.backBuffer.destroy(),this.createBackbuffer(this._defaultFramebuffer))}createVertexBufferImpl(e,t){return new Ei}createIndexBufferImpl(e){return new Di(e)}createShaderImpl(e){return new Pi(e)}createUniformBufferImpl(e){return new Fi}createBindGroupFormatImpl(e){return new Li}createBindGroupImpl(e){return new Ii}setBindGroup(e,t,n){let r=this.gl,i=t.impl.buffers;for(let t=0;t<i.length;t++)r.bindBufferBase(r.UNIFORM_BUFFER,e,i[t].bufferId)}createDrawCommandImpl(e){return new Bi(e.indexSizeBytes)}createTextureImpl(e){return this.textures.add(e),new Hi(e)}createXrBridgeImpl(e){return new qi(e)}createRenderTargetImpl(e){return new Gi}createUploadStreamImpl(e){return new Ki(e)}getPrecision(){let e=this.gl,t=`highp`;if(e.getShaderPrecisionFormat){let n=e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT),r=e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT),i=e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT),a=e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT);if(n&&r&&i&&a){let e=n.precision>0&&i.precision>0,o=r.precision>0&&a.precision>0;e||(t=o?`mediump`:`lowp`)}}return t}getExtension(){for(let e=0;e<arguments.length;e++)if(this.supportedExtensions.indexOf(arguments[e])!==-1)return this.gl.getExtension(arguments[e]);return null}get extDisjointTimerQuery(){return this._extDisjointTimerQuery||(this._extDisjointTimerQuery=this.getExtension(`EXT_disjoint_timer_query_webgl2`,`EXT_disjoint_timer_query`)),this._extDisjointTimerQuery}initializeExtensions(){let e=this.gl;this.supportedExtensions=e.getSupportedExtensions()??[],this._extDisjointTimerQuery=null,this.textureRG11B10Renderable=!0,this.extColorBufferFloat=this.getExtension(`EXT_color_buffer_float`),this.textureFloatRenderable=!!this.extColorBufferFloat,this.extColorBufferHalfFloat=this.getExtension(`EXT_color_buffer_half_float`),this.textureHalfFloatRenderable=!!this.extColorBufferHalfFloat||!!this.extColorBufferFloat,this.extDebugRendererInfo=this.getExtension(`WEBGL_debug_renderer_info`),this.extTextureFloatLinear=this.getExtension(`OES_texture_float_linear`),this.textureFloatFilterable=!!this.extTextureFloatLinear,this.extFloatBlend=this.getExtension(`EXT_float_blend`),this.textureFloatBlendable=!!this.extFloatBlend,this.extBlendFuncExtended=this.getExtension(`WEBGL_blend_func_extended`),this.supportsDualSourceBlending=!!this.extBlendFuncExtended,this.extDrawBuffersIndexed=this.getExtension(`OES_draw_buffers_indexed`),this.supportsIndependentBlending=!!this.extDrawBuffersIndexed,this.extTextureFilterAnisotropic=this.getExtension(`EXT_texture_filter_anisotropic`,`WEBKIT_EXT_texture_filter_anisotropic`),this.extParallelShaderCompile=this.getExtension(`KHR_parallel_shader_compile`),this.extMultiDraw=this.getExtension(`WEBGL_multi_draw`),this.supportsMultiDraw=!!this.extMultiDraw,this.extCompressedTextureETC1=this.getExtension(`WEBGL_compressed_texture_etc1`),this.extCompressedTextureETC=this.getExtension(`WEBGL_compressed_texture_etc`),this.extCompressedTexturePVRTC=this.getExtension(`WEBGL_compressed_texture_pvrtc`,`WEBKIT_WEBGL_compressed_texture_pvrtc`),this.extCompressedTextureS3TC=this.getExtension(`WEBGL_compressed_texture_s3tc`,`WEBKIT_WEBGL_compressed_texture_s3tc`),this.extCompressedTextureS3TC_SRGB=this.getExtension(`WEBGL_compressed_texture_s3tc_srgb`),this.extCompressedTextureATC=this.getExtension(`WEBGL_compressed_texture_atc`),this.extCompressedTextureASTC=this.getExtension(`WEBGL_compressed_texture_astc`),this.extTextureCompressionBPTC=this.getExtension(`EXT_texture_compression_bptc`),this.supportsHtmlTextures=typeof e.texElementImage2D==`function`}initializeCapabilities(){let e=this.gl,t,n=typeof navigator<`u`?navigator.userAgent:``;this.maxPrecision=this.precision=this.getPrecision(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxCubeMapSize=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),this.maxRenderBufferSize=e.getParameter(e.MAX_RENDERBUFFER_SIZE),this.maxTextures=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.maxCombinedTextures=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),this.maxVertexTextures=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),this.vertexUniformsCount=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),this.fragmentUniformsCount=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),this.maxColorAttachments=e.getParameter(e.MAX_COLOR_ATTACHMENTS),this.maxVolumeSize=e.getParameter(e.MAX_3D_TEXTURE_SIZE),t=this.extDebugRendererInfo,this.unmaskedRenderer=t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):``,this.unmaskedVendor=t?e.getParameter(t.UNMASKED_VENDOR_WEBGL):``;let r=/\bMali-G52+/,i=/SM-[a-zA-Z0-9]+/;this.supportsGpuParticles=!(this.unmaskedVendor===`ARM`&&n.match(i))&&!this.unmaskedRenderer.match(r),t=this.extTextureFilterAnisotropic,this.maxAnisotropy=t?e.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT):1;let a=!this.forceDisableMultisampling;this.maxSamples=a?e.getParameter(e.MAX_SAMPLES):1,this.maxSamples=Math.min(this.maxSamples,4),this.samples=a&&this.backBufferAntialias?this.maxSamples:1,this.supportsAreaLights=!m.android,this.maxTextures<=8&&(this.supportsAreaLights=!1),this.initCapsDefines()}initializeRenderState(){super.initializeRenderState();let e=this.gl;e.disable(e.BLEND),e.blendFunc(e.ONE,e.ZERO),e.blendEquation(e.FUNC_ADD),e.colorMask(!0,!0,!0,!0),e.blendColor(0,0,0,0),e.enable(e.CULL_FACE),this.cullFace=e.BACK,e.cullFace(e.BACK),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.depthMask(!0),this.stencil=!1,e.disable(e.STENCIL_TEST),this.stencilFuncFront=this.stencilFuncBack=7,this.stencilRefFront=this.stencilRefBack=0,this.stencilMaskFront=this.stencilMaskBack=255,e.stencilFunc(e.ALWAYS,0,255),this.stencilFailFront=this.stencilFailBack=0,this.stencilZfailFront=this.stencilZfailBack=0,this.stencilZpassFront=this.stencilZpassBack=0,this.stencilWriteMaskFront=255,this.stencilWriteMaskBack=255,e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.stencilMask(255),this.alphaToCoverage=!1,this.raster=!0,e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.disable(e.RASTERIZER_DISCARD),this.depthBiasEnabled=!1,e.disable(e.POLYGON_OFFSET_FILL),this.clearDepth=1,e.clearDepth(1),this.clearColor=new O(0,0,0,0),e.clearColor(0,0,0,0),this.clearStencil=0,e.clearStencil(0),e.hint(e.FRAGMENT_SHADER_DERIVATIVE_HINT,e.NICEST),e.enable(e.SCISSOR_TEST),this.textureUnit=0,e.activeTexture(e.TEXTURE0),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE),this.unpackFlipY=!1,e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),this.unpackPremultiplyAlpha=!1,e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),this.unpackAlignment=1,e.pixelStorei(e.UNPACK_ALIGNMENT,1)}initTextureUnits(e=16){this.textureUnits=[];for(let t=0;t<e;t++)this.textureUnits.push([null,null,null])}initializeContextCaches(){super.initializeContextCaches(),this._vaoMap=new Map,this.boundVao=null,this.activeFramebuffer=null,this.feedback=null,this.transformFeedbackBuffers=null,this.textureUnit=0,this.initTextureUnits(this.maxCombinedTextures)}loseContext(){super.loseContext();for(let e of[...this._readbackCopies])e.fail();for(let e of this.shaders)e.loseContext();this.dynamicBuffers.loseContext(),this.fire(`devicelost`)}restoreContext(){this.initializeExtensions(),this.initializeCapabilities(),super.restoreContext();for(let e of this.shaders)e.restoreContext();this.fire(`devicerestored`)}setViewport(e,t,n,r){(this.vx!==e||this.vy!==t||this.vw!==n||this.vh!==r)&&(this.gl.viewport(e,t,n,r),this.vx=e,this.vy=t,this.vw=n,this.vh=r)}setScissor(e,t,n,r){(this.sx!==e||this.sy!==t||this.sw!==n||this.sh!==r)&&(this.gl.scissor(e,t,n,r),this.sx=e,this.sy=t,this.sw=n,this.sh=r)}setFramebuffer(e){if(this.activeFramebuffer!==e){let t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,e),this.activeFramebuffer=e}}resolveMsaaColorToXrFramebufferViaQuads(e,t,n,r){this._xrMsaaCopy??(this._xrMsaaCopy=new Zi(this)),this._xrMsaaCopy.copy(e,t,n,r)}copyRenderTarget(e,t,n,r){let i=this.gl;if(e===this.backBuffer&&(e=null),n){if(!t){if(!e._colorBuffer)return!1}else if(e&&(!e._colorBuffer||!t._colorBuffer||e._colorBuffer._format!==t._colorBuffer._format))return!1}if(r&&e&&!e._depth&&(!e._depthBuffer||!t._depthBuffer||e._depthBuffer._format!==t._depthBuffer._format))return!1;let a=this.renderTarget;this.renderTarget=t,this.updateBegin();let o=e?e.impl._glFrameBuffer:this.backBuffer?.impl._glFrameBuffer,s=t?t.impl._glFrameBuffer:this.backBuffer?.impl._glFrameBuffer;i.bindFramebuffer(i.READ_FRAMEBUFFER,o),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,s);let c=e?e.width:t?t.width:this.width,l=e?e.height:t?t.height:this.height;return i.blitFramebuffer(0,0,c,l,0,0,c,l,(n?i.COLOR_BUFFER_BIT:0)|(r?i.DEPTH_BUFFER_BIT:0),i.NEAREST),this.renderTarget=a,i.bindFramebuffer(i.FRAMEBUFFER,a?a.impl._glFrameBuffer:null),!0}copyTextureToTexture(e,t,n={}){let r=this.gl,i=n.sourceMipLevel??0,a=n.destMipLevel??0,o=n.face??0,s=n.sourceX??0,c=n.sourceY??0,l=n.destX??0,u=n.destY??0,d=n.width??Math.max(1,e.width>>i),f=n.height??Math.max(1,e.height>>i),p=n.sourceRenderTarget??new gr({name:`TextureCopySource`,colorBuffer:e,depth:!1,face:o,mipLevel:i}),m=this.renderTarget;this.setRenderTarget(p),this.initRenderTarget(p),this.setFramebuffer(p.impl._glFrameBuffer),this.setTexture(t,0);let h=t.cubemap?r.TEXTURE_CUBE_MAP_POSITIVE_X+o:r.TEXTURE_2D;return r.copyTexSubImage2D(h,a,l,u,s,c,d,f),n.sourceRenderTarget||p.destroy(),this.setRenderTarget(m),this.setFramebuffer(m?m.impl._glFrameBuffer:this.backBuffer?.impl._glFrameBuffer),!0}frameStart(){if(super.frameStart(),this._readbackCopies.size>0)for(let e of[...this._readbackCopies])e.run();this.updateBackbuffer(),this.gpuProfiler.frameStart()}frameEnd(){super.frameEnd(),this.gpuProfiler.frameEnd(),this.gpuProfiler.request(),this.dynamicBuffers.onFrameEnd()}startRenderPass(e){let t=e.renderTarget??this.backBuffer;this.renderTarget=t,this.updateBegin();let{width:n,height:r}=t;this.setViewport(0,0,n,r),this.setScissor(0,0,n,r);let i=e.depthStencilOps,a=0;i.clearDepth&&(a|=2,aa.depth=i.clearDepthValue),i.clearStencil&&(a|=4,aa.stencil=i.clearStencilValue);let o=t._colorBuffers?.length??0,s=e.colorOps,c=o>1||o===1&&Re(t._colorBuffers[0].format);if(!c&&s?.clear){a|=1;let{clearValue:e}=s,t=aa.color;t[0]=e.r,t[1]=e.g,t[2]=e.b,t[3]=e.a}if(a!==0&&(aa.flags=a,this.clear(aa)),c){let n=this.gl,{colorArrayOps:r}=e,i=!1;for(let e=0;e<o;e++){let a=r[e];if(a?.clear){i||(this.setBlendState(Vn.NOBLEND),i=!0);let{clearValue:r}=a,o=Fe.get(t._colorBuffers[e].format),s=o?.isUint?ia:o?.isInt?ra:na;s[0]=r.r,s[1]=r.g,s[2]=r.b,s[3]=r.a,o?.isUint?n.clearBufferuiv(n.COLOR,e,s):o?.isInt?n.clearBufferiv(n.COLOR,e,s):n.clearBufferfv(n.COLOR,e,s)}}}this.insideRenderPass=!0}endRenderPass(e){this.unbindVertexArray();let t=this.renderTarget,n=e.colorArrayOps.length;if(t){sa.length=0;let r=this.gl;for(let t=0;t<n;t++){let n=e.colorArrayOps[t];n.store||n.resolve||sa.push(r.COLOR_ATTACHMENT0+t)}t!==this.backBuffer&&(e.depthStencilOps.storeDepth||sa.push(r.DEPTH_ATTACHMENT),e.depthStencilOps.storeStencil||sa.push(r.STENCIL_ATTACHMENT)),sa.length>0&&e.fullSizeClearRect&&r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,sa),n&&e.colorOps?.resolve&&e.samples>1&&t.autoResolve&&t.resolve(!0,!1),t.depthBuffer&&e.depthStencilOps.resolveDepth&&e.samples>1&&t.autoResolve&&t.resolve(!1,!0);for(let r=0;r<n;r++)if(e.colorArrayOps[r].genMipmaps){let e=t._colorBuffers[r];e&&e.impl._glTexture&&e.mipmaps&&(this.activeTexture(this.maxCombinedTextures-1),this.bindTexture(e),this.gl.generateMipmap(e.impl._glTarget))}}this.insideRenderPass=!1}set defaultFramebuffer(e){this._defaultFramebuffer!==e&&(this._defaultFramebuffer=e,this._defaultFramebufferChanged=!0)}get defaultFramebuffer(){return this._defaultFramebuffer}updateBegin(){if(this.boundVao=null,this._tempEnableSafariTextureUnitWorkaround)for(let e=0;e<this.textureUnits.length;++e)for(let t=0;t<3;++t)this.textureUnits[e][t]=null;let e=this.renderTarget??this.backBuffer,t=e.impl;t.initialized||this.initRenderTarget(e),this.setFramebuffer(t._glFrameBuffer)}updateEnd(){this.unbindVertexArray();let e=this.renderTarget;if(e&&e!==this.backBuffer){e._samples>1&&e.autoResolve&&e.resolve();let t=e._colorBuffer;t&&t.impl._glTexture&&t.mipmaps&&(this.activeTexture(this.maxCombinedTextures-1),this.bindTexture(t),this.gl.generateMipmap(t.impl._glTarget))}}setUnpackFlipY(e){if(this.unpackFlipY!==e){this.unpackFlipY=e;let t=this.gl;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,e)}}setUnpackPremultiplyAlpha(e){if(this.unpackPremultiplyAlpha!==e){this.unpackPremultiplyAlpha=e;let t=this.gl;t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,e)}}setUnpackAlignment(e){this.unpackAlignment!==e&&(this.unpackAlignment=e,this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT,e))}activeTexture(e){this.textureUnit!==e&&(this.gl.activeTexture(this.gl.TEXTURE0+e),this.textureUnit=e)}bindTexture(e){let t=e.impl,n=t._glTarget,r=t._glTexture,i=this.textureUnit,a=this.targetToSlot[n];this.textureUnits[i][a]!==r&&(this.gl.bindTexture(n,r),this.textureUnits[i][a]=r)}bindTextureOnUnit(e,t){let n=e.impl,r=n._glTarget,i=n._glTexture,a=this.targetToSlot[r];this.textureUnits[t][a]!==i&&(this.activeTexture(t),this.gl.bindTexture(r,i),this.textureUnits[t][a]=i)}setTextureParameters(e){let t=this.gl,n=e.impl.dirtyParameterFlags,r=e.impl._glTarget;if(n&1){let n=e._minFilter;(!e._mipmaps||e._compressed&&e._levels.length===1)&&(n===2||n===3?n=0:(n===4||n===5)&&(n=1)),t.texParameteri(r,t.TEXTURE_MIN_FILTER,this.glFilter[n])}if(n&2&&t.texParameteri(r,t.TEXTURE_MAG_FILTER,this.glFilter[e._magFilter]),n&4&&t.texParameteri(r,t.TEXTURE_WRAP_S,this.glAddress[e._addressU]),n&8&&t.texParameteri(r,t.TEXTURE_WRAP_T,this.glAddress[e._addressV]),n&16&&t.texParameteri(r,t.TEXTURE_WRAP_R,this.glAddress[e._addressW]),n&32&&t.texParameteri(r,t.TEXTURE_COMPARE_MODE,e._compareOnRead?t.COMPARE_REF_TO_TEXTURE:t.NONE),n&64&&t.texParameteri(r,t.TEXTURE_COMPARE_FUNC,this.glComparison[e._compareFunc]),n&128){let n=this.extTextureFilterAnisotropic;n&&t.texParameterf(r,n.TEXTURE_MAX_ANISOTROPY_EXT,E.clamp(Math.round(e._anisotropy),1,this.maxAnisotropy))}}setTexture(e,t){let n=e.impl;n._glTexture||n.initialize(this,e),n.dirtyParameterFlags>0||e._needsUpload||e._needsMipmapsUpload?(this.activeTexture(t),this.bindTexture(e),n.dirtyParameterFlags&&(this.setTextureParameters(e),n.dirtyParameterFlags=0),(e._needsUpload||e._needsMipmapsUpload)&&(n.upload(this,e),e._needsUpload=!1,e._needsMipmapsUpload=!1)):this.bindTextureOnUnit(e,t)}_vertexArrayKey(e){let t=``;for(let n=0;n<e.length;n++)t+=e[n].vaoKeyPart;return t}removeVertexArrayFromCache(e){if(e.length>1){let t=this._vertexArrayKey(e),n=this._vaoMap.get(t);n&&(this._vaoMap.delete(t),this.gl.deleteVertexArray(n))}}createVertexArray(e){let t,n,r=e.length>1;if(r&&(t=this._vertexArrayKey(e),n=this._vaoMap.get(t)),!n){let i=this.gl;n=i.createVertexArray(),i.bindVertexArray(n),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,null);for(let t=0;t<e.length;t++){let n=e[t];i.bindBuffer(i.ARRAY_BUFFER,n.impl.bufferId);let r=n.format.elements;for(let e=0;e<r.length;e++){let t=r[e],a=F[t.name];t.asInt?i.vertexAttribIPointer(a,t.numComponents,this.glType[t.dataType],t.stride,t.offset):i.vertexAttribPointer(a,t.numComponents,this.glType[t.dataType],t.normalize,t.stride,t.offset),i.enableVertexAttribArray(a),n.format.instancing&&i.vertexAttribDivisor(a,1)}}i.bindVertexArray(null),i.bindBuffer(i.ARRAY_BUFFER,null),r&&this._vaoMap.set(t,n)}return n}unbindVertexArray(){this.boundVao&&(this.boundVao=null,this.gl.bindVertexArray(null))}setBuffers(e){let t=this.gl,n;if(this.vertexBuffers.length===1){let e=this.vertexBuffers[0];e.impl.vao||(e.impl.vao=this.createVertexArray(this.vertexBuffers)),n=e.impl.vao}else n=this.createVertexArray(this.vertexBuffers);this.boundVao!==n&&(this.boundVao=n,t.bindVertexArray(n));let r=e?e.impl.bufferId:null;t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,r)}_multiDrawLoopFallback(e,t,n,r,i){let a=this.gl;if(t.indexed){let t=n.impl.glFormat,{glCounts:o,glOffsetsBytes:s,glInstanceCounts:c,count:l}=i.impl;if(r>0)for(let n=0;n<l;n++)a.drawElementsInstanced(e,o[n],t,s[n],c[n]);else for(let n=0;n<l;n++)a.drawElements(e,o[n],t,s[n])}else{let{glCounts:t,glOffsetsBytes:n,glInstanceCounts:o,count:s}=i.impl;if(r>0)for(let r=0;r<s;r++)a.drawArraysInstanced(e,n[r],t[r],o[r]);else for(let r=0;r<s;r++)a.drawArrays(e,n[r],t[r])}}draw(e,t,n,r,i=!0,a=!0){let o=this.shader;if(o&&(this.activateShader(),this.shaderValid)){let a=this.gl;i&&this.setBuffers(t);let s=0,c=o.impl.samplers;for(let e=0,t=c.length;e<t;e++){let t=c[e],n=t.scopeId.value;if(!n){let e=t.scopeId.name;e===`uSceneDepthMap`&&(n=hn(this,`white`)),e===`uSceneColorMap`&&(n=hn(this,`pink`)),n||(n=hn(this,`pink`))}if(n instanceof dn){let e=n;this.setTexture(e,s),t.slot!==s&&(a.uniform1i(t.locationId,s),t.slot=s),s++}else{t.array.length=0;let e=n.length;for(let r=0;r<e;r++){let e=n[r];this.setTexture(e,s),t.array[r]=s,s++}a.uniform1iv(t.locationId,t.array)}}let l=o.impl.uniforms;for(let e=0,t=l.length;e<t;e++){let t=l[e],n=t.scopeId,r=t.version,i=n.versionObject.version;if(r.globalId!==i.globalId||r.revision!==i.revision){r.globalId=i.globalId,r.revision=i.revision;let e=n.value;e!=null&&this.commitFunction[t.dataType](t,e)}}let u=this.transformFeedbackBuffers;if(u){for(let e=0;e<u.length;e++)a.bindBufferBase(a.TRANSFORM_FEEDBACK_BUFFER,e,u[e].impl.bufferId);a.beginTransformFeedback(a.POINTS)}let d=this.glPrimitive[e.type],f=e.count;if(r){if(this.extMultiDraw){let i=r.impl;if(e.indexed){let e=t.impl.glFormat;n>0?this.extMultiDraw.multiDrawElementsInstancedWEBGL(d,i.glCounts,0,e,i.glOffsetsBytes,0,i.glInstanceCounts,0,r.count):this.extMultiDraw.multiDrawElementsWEBGL(d,i.glCounts,0,e,i.glOffsetsBytes,0,r.count)}else n>0?this.extMultiDraw.multiDrawArraysInstancedWEBGL(d,i.glOffsetsBytes,0,i.glCounts,0,i.glInstanceCounts,0,r.count):this.extMultiDraw.multiDrawArraysWEBGL(d,i.glOffsetsBytes,0,i.glCounts,0,r.count)}else this._multiDrawLoopFallback(d,e,t,n,r)}else if(e.indexed){let r=t.impl.glFormat,i=e.base*t.bytesPerIndex;n>0?a.drawElementsInstanced(d,f,r,i,n):a.drawElements(d,f,r,i)}else{let t=e.base;n>0?a.drawArraysInstanced(d,t,f,n):a.drawArrays(d,t,f)}if(u){a.endTransformFeedback();for(let e=0;e<u.length;e++)a.bindBufferBase(a.TRANSFORM_FEEDBACK_BUFFER,e,null)}this._drawCallsPerFrame++}a&&this.clearVertexBuffer()}clear(e){let t=this.defaultClearOptions;e=e||t;let n=e.flags??t.flags;if(n!==0){let r=this.gl;if(n&1){let n=e.color??t.color,r=n[0],i=n[1],a=n[2],o=n[3],s=this.clearColor;(r!==s.r||i!==s.g||a!==s.b||o!==s.a)&&(this.gl.clearColor(r,i,a,o),this.clearColor.set(r,i,a,o)),this.setBlendState(Vn.NOBLEND)}if(n&2){let n=e.depth??t.depth;n!==this.clearDepth&&(this.gl.clearDepth(n),this.clearDepth=n),this.setDepthState(qn.WRITEDEPTH)}if(n&4){let n=e.stencil??t.stencil;n!==this.clearStencil&&(this.gl.clearStencil(n),this.clearStencil=n),r.stencilMask(255),this.stencilWriteMaskFront=255,this.stencilWriteMaskBack=255}r.clear(this.glClearFlag[n])}}submit(){this.gl.flush()}readPixels(e,t,n,r,i){let a=this.gl;a.readPixels(e,t,n,r,a.RGBA,a.UNSIGNED_BYTE,i)}clientWaitAsync(e,t){let n=this.gl,r=n.fenceSync(n.SYNC_GPU_COMMANDS_COMPLETE,0);return this.submit(),new Promise((i,a)=>{function o(){let s=n.clientWaitSync(r,e,0);s===n.TIMEOUT_EXPIRED?setTimeout(o,t):(n.deleteSync(r),s===n.WAIT_FAILED?a(Error(`webgl clientWaitSync sync failed`)):i())}o()})}async readPixelsAsync(e,t,n,r,i,a=!1,o=!1){let s=this.gl,c,l;if(a)c=s.RGBA,l=s.UNSIGNED_BYTE;else{let e=this.renderTarget.colorBuffer?.impl;c=e?._glFormat??s.RGBA,l=e?._glPixelType??s.UNSIGNED_BYTE}let u=s.createBuffer();s.bindBuffer(s.PIXEL_PACK_BUFFER,u),s.bufferData(s.PIXEL_PACK_BUFFER,i.byteLength,s.STREAM_READ),s.readPixels(e,t,n,r,c,l,0),s.bindBuffer(s.PIXEL_PACK_BUFFER,null),await this.clientWaitAsync(0,16);let d=()=>{s.bindBuffer(s.PIXEL_PACK_BUFFER,u),s.getBufferSubData(s.PIXEL_PACK_BUFFER,0,i),s.bindBuffer(s.PIXEL_PACK_BUFFER,null),s.deleteBuffer(u)};if(this._destroyed)return s.deleteBuffer(u),i;if(this.contextLost)throw s.deleteBuffer(u),Error(`Texture read did not complete, as the WebGL context was lost.`);return o?(await new Promise((e,t)=>{let n={timer:0,settled:!1,end:e=>{n.settled||(n.settled=!0,clearTimeout(n.timer),this._readbackCopies.delete(n),e())},run:()=>n.end(()=>{d(),e()}),abandon:()=>n.end(e),fail:()=>n.end(()=>{t(Error(`Texture read did not complete, as the WebGL context was lost.`))})};n.timer=setTimeout(n.run,ca),this._readbackCopies.add(n)}),i):(d(),i)}readTextureAsync(e,t,n,r,i,a){let o=a.face??0,s=a.mipLevel??0,c=a.renderTarget??new gr({colorBuffer:e,depth:!1,face:o,mipLevel:s}),l=oa(e._format),u=l>0,d=Xe(e._format),f=a.data??new d(on.calcLevelGpuSize(r,i,1,e._format)/d.BYTES_PER_ELEMENT),p=u?new Uint8Array(r*i*4):f;this.setRenderTarget(c),this.initRenderTarget(c),this.setFramebuffer(c.impl._glFrameBuffer),a.immediate&&this.gl.flush();let m=!!a.renderTarget,h=()=>{m||(m=!0,this.off(`destroy`,h),c.destroy())};return m||this.on(`destroy`,h),new Promise((e,o)=>{this.readPixelsAsync(t,n,r,i,p,u,a.frequent??!1).then(t=>{if(h(),this._destroyed){o(Error(`Texture read did not complete, as the graphics device was destroyed.`));return}if(u){let n=r*i;for(let e=0;e<n;e++)for(let n=0;n<l;n++)f[e*l+n]=t[e*4+n];e(f)}else e(t)}).catch(e=>{h(),o(e)})})}async writeTextureAsync(e,t,n,r,i,a){let o=this.gl,s=e.impl,c=s?._glFormat??o.RGBA,l=s?._glPixelType??o.UNSIGNED_BYTE,u=o.createBuffer();o.bindBuffer(o.PIXEL_UNPACK_BUFFER,u),o.bufferData(o.PIXEL_UNPACK_BUFFER,a,o.STREAM_DRAW),o.bindTexture(o.TEXTURE_2D,s._glTexture),o.texSubImage2D(o.TEXTURE_2D,0,t,n,r,i,c,l,0),o.bindBuffer(o.PIXEL_UNPACK_BUFFER,null),e._needsUpload=!1,e._mipmapsUploaded=!1,await this.clientWaitAsync(0,16)}setAlphaToCoverage(e){this.alphaToCoverage!==e&&(this.alphaToCoverage=e,e?this.gl.enable(this.gl.SAMPLE_ALPHA_TO_COVERAGE):this.gl.disable(this.gl.SAMPLE_ALPHA_TO_COVERAGE))}setTransformFeedbackBuffers(e){let t=this.gl,n=e?.length?e:null,r=this.transformFeedbackBuffers!==null;this.transformFeedbackBuffers=n,n?r||(this.feedback??(this.feedback=t.createTransformFeedback()),t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,this.feedback)):r&&t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,null)}setRaster(e){this.raster!==e&&(this.raster=e,e?this.gl.disable(this.gl.RASTERIZER_DISCARD):this.gl.enable(this.gl.RASTERIZER_DISCARD))}setStencilTest(e){if(this.stencil!==e){let t=this.gl;e?t.enable(t.STENCIL_TEST):t.disable(t.STENCIL_TEST),this.stencil=e}}setStencilFunc(e,t,n){(this.stencilFuncFront!==e||this.stencilRefFront!==t||this.stencilMaskFront!==n||this.stencilFuncBack!==e||this.stencilRefBack!==t||this.stencilMaskBack!==n)&&(this.gl.stencilFunc(this.glComparison[e],t,n),this.stencilFuncFront=this.stencilFuncBack=e,this.stencilRefFront=this.stencilRefBack=t,this.stencilMaskFront=this.stencilMaskBack=n)}setStencilFuncFront(e,t,n){if(this.stencilFuncFront!==e||this.stencilRefFront!==t||this.stencilMaskFront!==n){let r=this.gl;r.stencilFuncSeparate(r.FRONT,this.glComparison[e],t,n),this.stencilFuncFront=e,this.stencilRefFront=t,this.stencilMaskFront=n}}setStencilFuncBack(e,t,n){if(this.stencilFuncBack!==e||this.stencilRefBack!==t||this.stencilMaskBack!==n){let r=this.gl;r.stencilFuncSeparate(r.BACK,this.glComparison[e],t,n),this.stencilFuncBack=e,this.stencilRefBack=t,this.stencilMaskBack=n}}setStencilOperation(e,t,n,r){(this.stencilFailFront!==e||this.stencilZfailFront!==t||this.stencilZpassFront!==n||this.stencilFailBack!==e||this.stencilZfailBack!==t||this.stencilZpassBack!==n)&&(this.gl.stencilOp(this.glStencilOp[e],this.glStencilOp[t],this.glStencilOp[n]),this.stencilFailFront=this.stencilFailBack=e,this.stencilZfailFront=this.stencilZfailBack=t,this.stencilZpassFront=this.stencilZpassBack=n),(this.stencilWriteMaskFront!==r||this.stencilWriteMaskBack!==r)&&(this.gl.stencilMask(r),this.stencilWriteMaskFront=r,this.stencilWriteMaskBack=r)}setStencilOperationFront(e,t,n,r){(this.stencilFailFront!==e||this.stencilZfailFront!==t||this.stencilZpassFront!==n)&&(this.gl.stencilOpSeparate(this.gl.FRONT,this.glStencilOp[e],this.glStencilOp[t],this.glStencilOp[n]),this.stencilFailFront=e,this.stencilZfailFront=t,this.stencilZpassFront=n),this.stencilWriteMaskFront!==r&&(this.gl.stencilMaskSeparate(this.gl.FRONT,r),this.stencilWriteMaskFront=r)}setStencilOperationBack(e,t,n,r){(this.stencilFailBack!==e||this.stencilZfailBack!==t||this.stencilZpassBack!==n)&&(this.gl.stencilOpSeparate(this.gl.BACK,this.glStencilOp[e],this.glStencilOp[t],this.glStencilOp[n]),this.stencilFailBack=e,this.stencilZfailBack=t,this.stencilZpassBack=n),this.stencilWriteMaskBack!==r&&(this.gl.stencilMaskSeparate(this.gl.BACK,r),this.stencilWriteMaskBack=r)}applyBlendState(e,t){let n=this.gl,{blend:r,colorOp:i,alphaOp:a,colorSrcFactor:o,colorDstFactor:s,alphaSrcFactor:c,alphaDstFactor:l}=e;if((!t||t.blend!==r)&&(r?n.enable(n.BLEND):n.disable(n.BLEND)),!t||t.colorOp!==i||t.alphaOp!==a){let e=this.glBlendEquation;n.blendEquationSeparate(e[i],e[a])}(!t||t.colorSrcFactor!==o||t.colorDstFactor!==s||t.alphaSrcFactor!==c||t.alphaDstFactor!==l)&&n.blendFuncSeparate(this.glBlendFunctionColor[o],this.glBlendFunctionColor[s],this.glBlendFunctionAlpha[c],this.glBlendFunctionAlpha[l]),(!t||t.allWrite!==e.allWrite)&&n.colorMask(e.redWrite,e.greenWrite,e.blueWrite,e.alphaWrite)}applyBlendStateIndexed(e,t){let n=this.gl,r=this.extDrawBuffersIndexed,{blend:i,colorOp:a,alphaOp:o,colorSrcFactor:s,colorDstFactor:c,alphaSrcFactor:l,alphaDstFactor:u}=t;i?r.enableiOES(n.BLEND,e):r.disableiOES(n.BLEND,e);let d=this.glBlendEquation;r.blendEquationSeparateiOES(e,d[a],d[o]),r.blendFuncSeparateiOES(e,this.glBlendFunctionColor[s],this.glBlendFunctionColor[c],this.glBlendFunctionAlpha[l],this.glBlendFunctionAlpha[u]),r.colorMaskiOES(e,t.redWrite,t.greenWrite,t.blueWrite,t.alphaWrite)}setBlendState(e){let t=this.blendState;if(!t.equals(e)){if((e.hasAttachmentOverrides||t.hasAttachmentOverrides)&&this.supportsIndependentBlending){e.getAttachment(0,ea),this.applyBlendState(ea);let t=ea.key;if(e.hasAttachmentOverrides){let n=Math.min(ta,this.maxColorAttachments);for(let r=1;r<n;r++)e.getAttachment(r,ea),ea.key!==t&&this.applyBlendStateIndexed(r,ea)}}else this.applyBlendState(e,t);t.copy(e)}}setBlendColor(e,t,n,r){let i=this.blendColor;(e!==i.r||t!==i.g||n!==i.b||r!==i.a)&&(this.gl.blendColor(e,t,n,r),i.set(e,t,n,r))}setStencilState(e,t){e||t?(this.setStencilTest(!0),e===t?(this.setStencilFunc(e.func,e.ref,e.readMask),this.setStencilOperation(e.fail,e.zfail,e.zpass,e.writeMask)):(e??(e=fr.DEFAULT),this.setStencilFuncFront(e.func,e.ref,e.readMask),this.setStencilOperationFront(e.fail,e.zfail,e.zpass,e.writeMask),t??(t=fr.DEFAULT),this.setStencilFuncBack(t.func,t.ref,t.readMask),this.setStencilOperationBack(t.fail,t.zfail,t.zpass,t.writeMask))):this.setStencilTest(!1)}setDepthState(e){let t=this.depthState;if(!t.equals(e)){let n=this.gl,r=e.write;t.write!==r&&n.depthMask(r);let{func:i,test:a}=e;!a&&r&&(a=!0,i=7),t.func!==i&&n.depthFunc(this.glComparison[i]),t.test!==a&&(a?n.enable(n.DEPTH_TEST):n.disable(n.DEPTH_TEST));let{depthBias:o,depthBiasSlope:s}=e;o||s?(this.depthBiasEnabled||(this.depthBiasEnabled=!0,this.gl.enable(this.gl.POLYGON_OFFSET_FILL)),n.polygonOffset(s,o)):this.depthBiasEnabled&&(this.depthBiasEnabled=!1,this.gl.disable(this.gl.POLYGON_OFFSET_FILL)),t.copy(e)}}setCullMode(e){if(this.cullMode!==e){if(e===0)this.gl.disable(this.gl.CULL_FACE);else{this.cullMode===0&&this.gl.enable(this.gl.CULL_FACE);let t=this.glCull[e];this.cullFace!==t&&(this.gl.cullFace(t),this.cullFace=t)}this.cullMode=e}}setFrontFace(e){if(this.frontFace!==e){let t=this.glFrontFace[e];this.gl.frontFace(t),this.frontFace=e}}setShader(e,t=!1){e!==this.shader&&(this.shader=e,this.shaderAsyncCompile=t,this.shaderValid=void 0)}activateShader(){let{shader:e}=this,{impl:t}=e;this.shaderValid===void 0&&(e.failed?this.shaderValid=!1:e.ready||(this.shaderAsyncCompile?t.isLinked(this)?t.finalize(this,e)||(e.failed=!0,this.shaderValid=!1):this.shaderValid=!1:t.finalize(this,e)||(e.failed=!0,this.shaderValid=!1))),this.shaderValid===void 0&&(this.gl.useProgram(t.glProgram),this.shaderValid=!0)}clearVertexArrayObjectCache(){let e=this.gl;this._vaoMap.forEach((t,n,r)=>{e.deleteVertexArray(t)}),this._vaoMap.clear()}set fullscreen(e){e?this.gl.canvas.requestFullscreen():document.exitFullscreen()}get fullscreen(){return!!document.fullscreenElement}},ua=class{get maxCount(){return this._maxCount}get count(){return this._count}constructor(e,t=0){v(this,`device`,void 0),v(this,`indexSizeBytes`,void 0),v(this,`_maxCount`,0),v(this,`impl`,null),v(this,`_count`,1),v(this,`slotIndex`,0),v(this,`primitiveCount`,0),this.device=e,this.indexSizeBytes=t,this.impl=e.createDrawCommandImpl(this)}destroy(){this.impl?.destroy?.(),this.impl=null}allocate(e){this._maxCount=e,this.impl.allocate?.(e)}add(e,t,n,r,i=0,a=0){this.impl.add(e,t,n,r,i,a)}update(e){this._count=e,this.primitiveCount=this.impl.update?.(e)??0}};function da(e){this.array[this.index]=e}function fa(e,t){this.array[this.index]=e,this.array[this.index+1]=t}function pa(e,t,n){this.array[this.index]=e,this.array[this.index+1]=t,this.array[this.index+2]=n}function ma(e,t,n,r){this.array[this.index]=e,this.array[this.index+1]=t,this.array[this.index+2]=n,this.array[this.index+3]=r}function ha(e,t,n){this.array[e]=t[n]}function ga(e,t,n){this.array[e]=t[n],this.array[e+1]=t[n+1]}function _a(e,t,n){this.array[e]=t[n],this.array[e+1]=t[n+1],this.array[e+2]=t[n+2]}function va(e,t,n){this.array[e]=t[n],this.array[e+1]=t[n+1],this.array[e+2]=t[n+2],this.array[e+3]=t[n+3]}function ya(e,t,n){t[n]=this.array[e]}function ba(e,t,n){t[n]=this.array[e],t[n+1]=this.array[e+1]}function xa(e,t,n){t[n]=this.array[e],t[n+1]=this.array[e+1],t[n+2]=this.array[e+2]}function Sa(e,t,n){t[n]=this.array[e],t[n+1]=this.array[e+1],t[n+2]=this.array[e+2],t[n+3]=this.array[e+3]}var Ca=class{constructor(e,t,n){switch(this.index=0,this.numComponents=t.numComponents,this.array=n.interleaved?new Kt[t.dataType](e,t.offset):new Kt[t.dataType](e,t.offset,n.vertexCount*t.numComponents),this.stride=t.stride/this.array.constructor.BYTES_PER_ELEMENT,t.numComponents){case 1:this.set=da,this.getToArray=ya,this.setFromArray=ha;break;case 2:this.set=fa,this.getToArray=ba,this.setFromArray=ga;break;case 3:this.set=pa,this.getToArray=xa,this.setFromArray=_a;break;case 4:this.set=ma,this.getToArray=Sa,this.setFromArray=va}}get(e){return this.array[this.index+e]}set(e,t,n,r){}getToArray(e,t,n){}setFromArray(e,t,n){}},wa=class{constructor(e){this.vertexBuffer=e,this.vertexFormatSize=e.getFormat().size,this.buffer=this.vertexBuffer.lock(),this.accessors=[],this.element={};let t=this.vertexBuffer.getFormat();for(let e=0;e<t.elements.length;e++){let n=t.elements[e];this.accessors[e]=new Ca(this.buffer,n,t),this.element[n.name]=this.accessors[e]}}next(e=1){let t=0,n=this.accessors,r=this.accessors.length;for(;t<r;){let r=n[t++];r.index+=e*r.stride}}end(){this.vertexBuffer.unlock()}writeData(e,t,n){let r=this.element[e];if(r){n>this.vertexBuffer.numVertices&&(n=this.vertexBuffer.numVertices);let e=r.numComponents;if(this.vertexBuffer.getFormat().interleaved){let i=0;for(let a=0;a<n;a++)r.setFromArray(i,t,a*e),i+=r.stride}else if(t.length>n*e){let i=n*e;if(ArrayBuffer.isView(t))t=t.subarray(0,i),r.array.set(t);else for(let e=0;e<i;e++)r.array[e]=t[e]}else r.array.set(t)}}readData(e,t){let n=this.element[e],r=0;if(n){r=this.vertexBuffer.numVertices;let e,i=n.numComponents,a=r*i;if(this.vertexBuffer.getFormat().interleaved){Array.isArray(t)&&(t.length=0),n.index=0;let a=0;for(e=0;e<r;e++)n.getToArray(a,t,e*i),a+=n.stride}else if(ArrayBuffer.isView(t))t.set(t.length>=a?n.array:n.array.subarray(0,t.length));else for(t.length=0,e=0;e<a;e++)t[e]=n.array[e]}return r}},Ta=class e{constructor(){v(this,`withCredentials`,!1),v(this,`_maxConcurrentRequests`,128),v(this,`_activeRequests`,0),v(this,`_sendQueue`,[]),v(this,`_sendQueueHead`,0)}set maxConcurrentRequests(e){this._maxConcurrentRequests=e,this._pump()}get maxConcurrentRequests(){return this._maxConcurrentRequests}get(e,t,n){typeof t==`function`&&(n=t,t={});let r=this.request(`GET`,e,t,n),{progress:i}=t;if(i){let e=e=>{e.lengthComputable&&i.fire(`progress`,e.loaded,e.total)},t=n=>{e(n),r.removeEventListener(`loadstart`,e),r.removeEventListener(`progress`,e),r.removeEventListener(`loadend`,t)};r.addEventListener(`loadstart`,e),r.addEventListener(`progress`,e),r.addEventListener(`loadend`,t)}return r}post(e,t,n,r){return typeof n==`function`&&(r=n,n={}),n.postdata=t,this.request(`POST`,e,n,r)}put(e,t,n,r){return typeof n==`function`&&(r=n,n={}),n.postdata=t,this.request(`PUT`,e,n,r)}del(e,t,n){return typeof t==`function`&&(n=t,t={}),this.request(`DELETE`,e,t,n)}request(t,r,i,a){let o,s,c,l=!1;if(typeof i==`function`&&(a=i,i={}),i.retry&&(i=Object.assign({retries:0,maxRetries:5},i)),i.callback=a,i.async??(i.async=!0),i.headers??(i.headers={}),i.postdata!=null){if(i.postdata instanceof Document)c=i.postdata;else if(i.postdata instanceof FormData)c=i.postdata;else if(i.postdata instanceof Object){let t=i.headers[`Content-Type`];switch(t===void 0&&(i.headers[`Content-Type`]=e.ContentType.FORM_URLENCODED,t=i.headers[`Content-Type`]),t){case e.ContentType.FORM_URLENCODED:{c=``;let e=!0;for(let t in i.postdata)if(i.postdata.hasOwnProperty(t)){e?e=!1:c+=`&`;let n=encodeURIComponent(t),r=encodeURIComponent(i.postdata[t]);c+=`${n}=${r}`}break}default:case e.ContentType.JSON:t??(i.headers[`Content-Type`]=e.ContentType.JSON),c=JSON.stringify(i.postdata)}}else c=i.postdata}if(i.cache===!1){let e=S();o=new w(r),o.query?o.query=`${o.query}&ts=${e}`:o.query=`ts=${e}`,r=o.toString()}i.query&&(o=new w(r),s=n(o.getQuery(),i.query),o.setQuery(s),r=o.toString());let u=new XMLHttpRequest;u.open(t,r,i.async),u.withCredentials=i.withCredentials===void 0?this.withCredentials:i.withCredentials,u.responseType=i.responseType||this._guessResponseType(r);for(let e in i.headers)i.headers.hasOwnProperty(e)&&u.setRequestHeader(e,i.headers[e]);return u.onreadystatechange=()=>{this._onReadyStateChange(t,r,i,u)},u.onerror=()=>{this._onError(t,r,i,u),l=!0},this._acquire(u,i,()=>{try{u.send(c)}catch(e){this._releaseSlot(u),!l&&typeof i.error==`function`&&i.error(u.status,u,e)}}),u}_guessResponseType(t){let n=new w(t),r=i.getExtension(n.path).toLowerCase();return e.binaryExtensions.indexOf(r)>=0?e.ResponseType.ARRAY_BUFFER:r===`.json`?e.ResponseType.JSON:r===`.xml`?e.ResponseType.DOCUMENT:e.ResponseType.TEXT}_isBinaryContentType(t){return[e.ContentType.BASIS,e.ContentType.BIN,e.ContentType.DDS,e.ContentType.GLB,e.ContentType.MP3,e.ContentType.MP4,e.ContentType.OGG,e.ContentType.OPUS,e.ContentType.WAV].indexOf(t)>=0}_isBinaryResponseType(t){return t===e.ResponseType.ARRAY_BUFFER||t===e.ResponseType.BLOB||t===e.ResponseType.JSON}_onReadyStateChange(e,t,n,r){if(r.readyState===4)switch(r.status){case 0:r.responseURL&&r.responseURL.startsWith(`file:///`)?this._onSuccess(e,t,n,r):this._onError(e,t,n,r);break;case 200:case 201:case 206:case 304:this._onSuccess(e,t,n,r);break;default:this._onError(e,t,n,r)}}_onSuccess(t,n,r,i){this._releaseSlot(i);let a,o,s=i.getResponseHeader(`Content-Type`);s&&(o=s.split(`;`)[0].trim());try{a=this._isBinaryContentType(o)||this._isBinaryResponseType(i.responseType)?i.response:o===e.ContentType.JSON||n.split(`?`)[0].endsWith(`.json`)?JSON.parse(i.responseText):i.responseType===e.ResponseType.DOCUMENT||o===e.ContentType.XML?i.responseXML:i.responseText,r.callback(null,a)}catch(e){r.callback(e)}}_onError(t,n,r,i){if(this._releaseSlot(i),!r.retrying){if(r.retry&&r.retries<r.maxRetries){r.retries++,r.retrying=!0;let a=E.clamp(2**r.retries*e.retryDelay,0,r.maxRetryDelay||5e3);console.log(`${t}: ${n} - Error ${i.status}. Retrying in ${a} ms`),setTimeout(()=>{r.retrying=!1,this.request(t,n,r,r.callback)},a)}else r.callback(i.status===0?`Network error`:i.status,null)}}_acquire(e,t,n){let r=this._maxConcurrentRequests,i=r>0&&Number.isFinite(r)&&t.async!==!1;!i||this._activeRequests<r?(i&&(this._activeRequests++,e._slotHeld=!0),n()):this._sendQueue.push({xhr:e,send:n})}_releaseSlot(e){e._slotHeld&&(e._slotHeld=!1,this._activeRequests--,this._pump())}_pump(){let e=this._maxConcurrentRequests;if(e>0&&Number.isFinite(e))for(;this._sendQueueHead<this._sendQueue.length&&this._activeRequests<e;){let{xhr:e,send:t}=this._sendQueue[this._sendQueueHead++];this._activeRequests++,e._slotHeld=!0,t()}else for(;this._sendQueueHead<this._sendQueue.length;)this._sendQueue[this._sendQueueHead++].send();this._sendQueueHead===this._sendQueue.length?(this._sendQueue.length=0,this._sendQueueHead=0):this._sendQueueHead>256&&(this._sendQueue=this._sendQueue.slice(this._sendQueueHead),this._sendQueueHead=0)}};v(Ta,`ContentType`,{AAC:`audio/aac`,BASIS:`image/basis`,BIN:`application/octet-stream`,DDS:`image/dds`,FORM_URLENCODED:`application/x-www-form-urlencoded`,GIF:`image/gif`,GLB:`model/gltf-binary`,JPEG:`image/jpeg`,JSON:`application/json`,MP3:`audio/mpeg`,MP4:`audio/mp4`,OGG:`audio/ogg`,OPUS:`audio/ogg; codecs="opus"`,PNG:`image/png`,TEXT:`text/plain`,WAV:`audio/x-wav`,XML:`application/xml`}),v(Ta,`ResponseType`,{TEXT:`text`,ARRAY_BUFFER:`arraybuffer`,BLOB:`blob`,DOCUMENT:`document`,JSON:`json`}),v(Ta,`binaryExtensions`,[`.model`,`.wav`,`.ogg`,`.mp3`,`.mp4`,`.m4a`,`.aac`,`.dds`,`.basis`,`.glb`,`.opus`]),v(Ta,`retryDelay`,100);var Ea=new Ta,Da={0:`SUBTRACTIVE`,1:`ADDITIVE`,2:`NORMAL`,3:`NONE`,4:`PREMULTIPLIED`,5:`MULTIPLICATIVE`,6:`ADDITIVEALPHA`,7:`MULTIPLICATIVE2X`,8:`SCREEN`,9:`MIN`,10:`MAX`},Oa=`none`,ka=`linear`,Aa={0:`NONE`,2:`SCHLICK`},ja={0:`DIRECTIONAL`,1:`OMNI`,2:`SPOT`},Ma={0:`PUNCTUAL`,1:`RECT`,2:`DISK`,3:`SPHERE`},Na={0:`LINEAR`,1:`INVERSESQUARED`},Pa=new Map([[5,{name:`PCF1_32F`,kind:`PCF1`,format:16,pcf:!0}],[0,{name:`PCF3_32F`,kind:`PCF3`,format:16,pcf:!0}],[4,{name:`PCF5_32F`,kind:`PCF5`,format:16,pcf:!0}],[7,{name:`PCF1_16F`,kind:`PCF1`,format:69,pcf:!0}],[8,{name:`PCF3_16F`,kind:`PCF3`,format:69,pcf:!0}],[9,{name:`PCF5_16F`,kind:`PCF5`,format:69,pcf:!0}],[2,{name:`VSM_16F`,kind:`VSM`,format:12,vsm:!0}],[3,{name:`VSM_32F`,kind:`VSM`,format:14,vsm:!0}],[6,{name:`PCSS_32F`,kind:`PCSS`,format:15,pcss:!0}]]),Fa={0:`NONE`,1:`BOX`},Ia={0:`NONE`,1:`SRGB`},La=[`LINEAR`,`FILMIC`,`HEJL`,`ACES`,`ACES2`,`NEUTRAL`,`NONE`],Ra={0:`NONE`,1:`AO`,2:`GLOSSDEPENDENT`},za=`none`,Ba=`envAtlas`,Va=`envAtlasHQ`,Ha=`cubeMap`,Ua=`sphereMap`,Wa={[za]:`NONE`,[Ba]:`ENVATLAS`,[Va]:`ENVATLASHQ`,[Ha]:`CUBEMAP`,[Ua]:`SPHEREMAP`},Ga=`ambientSH`,Ka=`envAtlas`,qa=`constant`,Ja={[Ga]:`AMBIENTSH`,[Ka]:`ENVALATLAS`,[qa]:`CONSTANT`},Ya=1024,Xa=2048,Za=4096,Qa=8192,$a=16384,eo={0:`SIMPLE`,1:`SLICED`,2:`TILED`},to=`infinite`,no=`dome`,ro=`none`,io=`bayer2`,ao=`bayer4`,oo=`bayer8`,so=`bayer16`,co=`bluenoise`,lo=`ignnoise`,uo=`offset`,fo=`occlusion`,po={[uo]:`OFFSET`,[fo]:`OCCLUSION`},mo={[ro]:`NONE`,[io]:`BAYER2`,[ao]:`BAYER4`,[oo]:`BAYER8`,[so]:`BAYER16`,[co]:`BLUENOISE`,[lo]:`IGNNOISE`},ho=`prerender`,go=`postrender`,_o=`prerender:layer`,vo=`postrender:layer`,yo=`precull`,bo=`postcull`,xo=`cull:end`,So=`pcShadowCamera`,Co=`compact`,wo=`distance`,To={depth:`uSceneDepthMap`},Eo=class{constructor(e,t){v(this,`uniformFormats`,[]),v(this,`bindGroupFormats`,[]),v(this,`vertexFormat`,void 0),this.uniformFormats[0]=e,this.vertexFormat=t}hasUniform(e){for(let t=0;t<this.uniformFormats.length;t++)if(this.uniformFormats[t]?.get(e))return!0;return!1}hasTexture(e){for(let t=0;t<this.bindGroupFormats.length;t++)if(this.bindGroupFormats[t]?.getTexture(e))return!0;return!1}getVertexElement(e){return this.vertexFormat?.elements.find(t=>t.name===e)}generateKey(e){let t=JSON.stringify(this.uniformFormats)+JSON.stringify(this.bindGroupFormats);return e.isWebGPU&&(t+=this.vertexFormat?.shaderProcessingHashString),t}},Do=new an;function Oo(e){return Do.get(e)}function ko(e,t){Do.get(e,()=>t)}var Ao=class{static definesHash(e){let t=Array.from(e).sort((e,t)=>e[0]>t[0]?1:-1);return ir(JSON.stringify(t))}},jo=new an,Mo=class{constructor(e,t,n={}){v(this,`index`,void 0),v(this,`name`,void 0),v(this,`defines`,new Map),this.name=e,this.index=t,Object.assign(this,n),this.buildShaderDefines()}buildShaderDefines(){let e;if(this.isShadow){if(e=`SHADOW`,this.lightType!==void 0){let e=Pa.get(this.shadowType);(this.lightType===0||!e.vsm&&this.lightType===2)&&this.defines.set(`PERSPECTIVE_DEPTH`,``),this.defines.set(`LIGHT_TYPE`,`${ja[this.lightType]}`),this.defines.set(`SHADOW_TYPE`,`${e.name}`)}}else this.isForward?e=`FORWARD`:this.index===3?e=`PICK`:this.index===4&&(e=`PICK`,this.defines.set(`DEPTH_PICK_PASS`,``));e&&this.defines.set(`${e}_PASS`,``),this.defines.set(`${this.name.toUpperCase()}_PASS`,``)}},No=class e{constructor(){v(this,`passesNamed`,new Map),v(this,`passesIndexed`,[]),v(this,`nextIndex`,0);let e=(e,t,n)=>{this.allocate(e,n)};e(`forward`,0,{isForward:!0}),e(`prepass`,1),e(`shadow`,2),e(`pick`,3),e(`depth_pick`,4)}static get(t){return jo.get(t,()=>new e)}allocate(e,t){let n=this.passesNamed.get(e);return n===void 0&&(n=new Mo(e,this.nextIndex,t),this.passesNamed.set(n.name,n),this.passesIndexed[n.index]=n,this.nextIndex++),n}getByIndex(e){return this.passesIndexed[e]}getByName(e){return this.passesNamed.get(e)}},Po=class extends Map{constructor(e){super(),v(this,`_validations`,void 0),v(this,`_keyDirty`,!1),v(this,`_key`,``),this._validations=e}set(e,t){return(!this.has(e)||this.get(e)!==t)&&this.markDirty(),super.set(e,t)}add(e,t=!0){for(let[n,r]of Object.entries(e))(t||!this.has(n))&&this.set(n,r);return this}delete(e){let t=this.has(e),n=super.delete(e);return t&&n&&this.markDirty(),n}clear(){this.size>0&&this.markDirty(),super.clear()}markDirty(){this._dirty=!0,this._keyDirty=!0}isDirty(){return this._dirty}resetDirty(){this._dirty=!1}get key(){return this._keyDirty&&(this._keyDirty=!1,this._key=Array.from(this.entries()).sort(([e],[t])=>e<t?-1:+(e>t)).map(([e,t])=>`${e}=${ir(t)}`).join(`,`)),this._key}copy(e){for(let t of this.keys())e.has(t)||this.delete(t);for(let[t,n]of e)this.set(t,n);return this}},Fo=new an,Io=class e{constructor(){v(this,`glsl`,new Po(e._validations)),v(this,`wgsl`,new Po(e._validations)),v(this,`version`,``)}static get(t,n=Lt){let r=Fo.get(t,()=>new e);return n===`glsl`?r.glsl:r.wgsl}static registerValidation(e,t){}get useWGSL(){return this.glsl.size===0||this.wgsl.size>0}get key(){return`GLSL:${this.glsl.key}|WGSL:${this.wgsl.key}|API:${this.version}`}isDirty(){return this.glsl.isDirty()||this.wgsl.isDirty()}resetDirty(){this.glsl.resetDirty(),this.wgsl.resetDirty()}copy(e){return this.version=e.version,this.glsl.copy(e.glsl),this.wgsl.copy(e.wgsl),this}};v(Io,`_validations`,new Map);var Lo=class{static merge(...e){let t=new Map(e[0]??[]);for(let n=1;n<e.length;n++){let r=e[n];if(r)for(let[e,n]of r)t.set(e,n)}return t}},Ro=class extends Ao{constructor(e,t){super(),this.key=e,this.shaderDefinition=t}generateKey(e){return this.key}createShaderDefinition(e,t){return this.shaderDefinition}},zo=class e{static createShader(e,t){let n=Oo(e),r=n.getCachedShader(t.uniqueName);if(!r){let i=e.isWebGPU&&(!!t.vertexWGSL||!!t.vertexChunk)&&(!!t.fragmentWGSL||!!t.fragmentChunk),a=Io.get(e,i?Rt:Lt),o=t.vertexChunk?a.get(t.vertexChunk):i?t.vertexWGSL:t.vertexGLSL,s=t.fragmentChunk?a.get(t.fragmentChunk):i?t.fragmentWGSL:t.fragmentGLSL,c=Lo.merge(a,t.fragmentIncludes),l=Lo.merge(a,t.vertexIncludes);r=new mi(e,fi.createDefinition(e,{name:t.uniqueName,shaderLanguage:i?Rt:Lt,attributes:t.attributes,vertexCode:o,fragmentCode:s,useTransformFeedback:t.useTransformFeedback,vertexIncludes:l,vertexDefines:t.vertexDefines,fragmentIncludes:c,fragmentDefines:t.fragmentDefines,fragmentOutputTypes:t.fragmentOutputTypes,useDualSourceBlending:t.useDualSourceBlending})),n.setCachedShader(t.uniqueName,r)}return r}static getCoreDefines(e,t){let n=new Map(e.defines);return t.cameraShaderParams.defines.forEach((e,t)=>n.set(t,e)),No.get(t.device).getByIndex(t.pass).defines.forEach((e,t)=>n.set(t,e)),n}static processShader(e,t){let n=e.definition,r=new Ro(`${n.name??`shader`}-id-${e.id}`,n),i=`shader`,a=Oo(e.device);a.register(i,r);let o=a.getProgram(i,{},t);return a.unregister(i),o}static getScreenDepthChunkKey(e){let{sceneDepthMapLinear:t,sceneDepthMapPacked:n,sceneDepthMapReciprocal:r}=e;return t?n?`-linearPacked`:r?`-linearReciprocal`:`-linear`:``}static addScreenDepthChunkDefines(t,n){return t.sceneDepthMapLinear&&(n.set(`SCENE_DEPTHMAP_LINEAR`,``),t.sceneDepthMapPacked&&n.set(`SCENE_DEPTHMAP_PACKED`,``),t.sceneDepthMapReciprocal&&n.set(`SCENE_DEPTHMAP_RECIPROCAL`,``)),e.getScreenDepthChunkKey(t)}},Bo={type:4,base:0,count:6,indexed:!0},Vo=new j,Ho=new j,Uo=new _n,Wo=class{constructor(e){v(this,`uniformBuffer`,void 0),v(this,`bindGroup`,void 0);let t=e.device;if(this.shader=e,t.supportsUniformBuffers){let n=new Eo;this.shader=zo.processShader(e,n);let r=this.shader.meshUniformBufferFormat;r&&(this.uniformBuffer=new vi(t,r,!1));let i=this.shader.meshBindGroupFormat;this.bindGroup=new vn(t,i)}}destroy(){this.uniformBuffer?.destroy(),this.uniformBuffer=null,this.bindGroup?.destroy(),this.bindGroup=null}render(e,t,n){let r=this.shader.device;e&&(Vo.set(r.vx,r.vy,r.vw,r.vh),Ho.set(r.sx,r.sy,r.sw,r.sh),t=t??e,r.setViewport(e.x,e.y,e.z,e.w),r.setScissor(t.x,t.y,t.z,t.w)),r.setVertexBuffer(r.quadVertexBuffer);let i=this.shader;if(r.setShader(i),r.supportsUniformBuffers){r.setBindGroup(0,r.emptyBindGroup);let e=this.bindGroup;e.update(),r.setBindGroup(1,e);let t=this.uniformBuffer;t?(t.update(Uo),r.setBindGroup(2,Uo.bindGroup,Uo.offsets)):r.setBindGroup(2,r.emptyBindGroup)}r.draw(Bo,r.quadIndexBuffer,n),e&&(r.setViewport(Vo.x,Vo.y,Vo.z,Vo.w),r.setScissor(Ho.x,Ho.y,Ho.z,Ho.w))}},Go=class extends Dr{constructor(e,t,n,r){super(e),this.quad=t,this.rect=n,this.scissorRect=r}execute(){let{device:e}=this;e.setDrawStates(e.blendState),this.quad.render(this.rect,this.scissorRect)}},Ko=new j;function qo(e,t,n,r,i){arguments[5];let a=new Wo(n);r||(r=Ko,r.x=0,r.y=0,r.z=t?t.width:e.width,r.w=t?t.height:e.height);let o=new Go(e,a,r,i);o.init(t),o.colorOps.clear=!1,o.depthStencilOps.clearDepth=!1,e.isWebGPU&&t===null&&e.samples>1&&(o.colorOps.store=!0),o.render(),a.destroy()}var Jo=class{constructor(e,t,n,r,i=[0]){v(this,`_ui`,!1),v(this,`_sprite`,!1),v(this,`_obj`,{model:[],element:[],sprite:[],render:[]}),v(this,`id`,void 0),v(this,`name`,void 0),v(this,`dynamic`,void 0),v(this,`maxAabbSize`,void 0),v(this,`layers`,void 0),this.id=e,this.name=t,this.dynamic=n,this.maxAabbSize=r,this.layers=i}};v(Jo,`MODEL`,`model`),v(Jo,`ELEMENT`,`element`),v(Jo,`SPRITE`,`sprite`),v(Jo,`RENDER`,`render`);var Yo=new M,Xo=class{constructor(e){v(this,`bones`,void 0),this._dirty=!0,this._rootBone=null,this._skinUpdateIndex=-1,this._updateBeforeCull=!0,e&&this.initSkin(e)}set rootBone(e){this._rootBone=e}get rootBone(){return this._rootBone}init(e,t){let n=t*3,r=Math.ceil(Math.sqrt(n));r=E.roundUp(r,3);let i=Math.ceil(n/r);this.boneTexture=new dn(e,{width:r,height:i,format:14,mipmaps:!1,minFilter:0,magFilter:0,name:`skin`}),this.matrixPalette=this.boneTexture.lock({mode:1}),this.boneTexture.unlock()}destroy(){this.boneTexture&&(this.boneTexture.destroy(),this.boneTexture=null)}resolve(e,t){this.rootBone=e;let n=this.skin,r=[];for(let i=0;i<n.boneNames.length;i++){let a=n.boneNames[i],o=e.findByName(a);o||(o=t),r.push(o)}this.bones=r}initSkin(e){this.skin=e,this.bones=[];let t=e.inverseBindPose.length;this.init(e.device,t),this.matrices=[];for(let e=0;e<t;e++)this.matrices[e]=new M}uploadBones(e){this.boneTexture.upload()}_updateMatrices(e,t){if(this._skinUpdateIndex!==t){this._skinUpdateIndex=t,Yo.copy(e.getWorldTransform()).invert();for(let e=this.bones.length-1;e>=0;e--)this.matrices[e].mulAffine2(Yo,this.bones[e].getWorldTransform()),this.matrices[e].mulAffine2(this.matrices[e],this.skin.inverseBindPose[e])}}updateMatrices(e,t){this._updateBeforeCull&&this._updateMatrices(e,t)}updateMatrixPalette(e,t){this._updateMatrices(e,t);let n=this.matrixPalette,r=this.bones.length;for(let e=0;e<r;e++){let t=this.matrices[e].data,r=e*12;n[r]=t[0],n[r+1]=t[4],n[r+2]=t[8],n[r+3]=t[12],n[r+4]=t[1],n[r+5]=t[5],n[r+6]=t[9],n[r+7]=t[13],n[r+8]=t[2],n[r+9]=t[6],n[r+10]=t[10],n[r+11]=t[14]}this.uploadBones(this.skin.device)}},Zo=0,Qo=(e,t,n)=>{if(ArrayBuffer.isView(t))e.set(n===t.length?t:t.subarray(0,n));else for(let r=0;r<n;r++)e[r]=t[r]},$o=class{constructor(){this.initDefaults()}initDefaults(){this.recreate=!1,this.verticesUsage=0,this.indicesUsage=0,this.maxVertices=0,this.maxIndices=0,this.vertexCount=0,this.indexCount=0,this.vertexStreamsUpdated=!1,this.indexStreamUpdated=!1,this.vertexStreamDictionary={},this.indices=null}_changeVertexCount(e,t){this.vertexCount||(this.vertexCount=e)}};v($o,`DEFAULT_COMPONENTS_POSITION`,3),v($o,`DEFAULT_COMPONENTS_NORMAL`,3),v($o,`DEFAULT_COMPONENTS_UV`,2),v($o,`DEFAULT_COMPONENTS_COLORS`,4);var es=class{constructor(e,t,n,r,i){this.data=e,this.componentCount=t,this.dataType=n,this.dataTypeNormalize=r,this.asInt=i}},ts=class e extends vr{constructor(e,t){super(),v(this,`indexBuffer`,[null]),v(this,`vertexBuffer`,null),v(this,`primitive`,[{type:0,base:0,baseVertex:0,count:0}]),v(this,`skin`,null),v(this,`boneAabb`,null),v(this,`_aabbVer`,0),v(this,`_aabb`,new be),v(this,`_geometryData`,null),v(this,`_morph`,null),v(this,`_storageIndex`,!1),v(this,`_storageVertex`,!1),this.id=Zo++,this.device=e,this._storageIndex=t?.storageIndex||!1,this._storageVertex=t?.storageVertex||!1}static fromGeometry(t,n,r={}){let i=new e(t,r),{positions:a,normals:o,tangents:s,colors:c,uvs:l,uvs1:u,blendIndices:d,blendWeights:f,indices:p}=n;return a&&i.setPositions(a),o&&i.setNormals(o),s&&i.setVertexStream(Qe,s,4),c&&i.setColors32(c),l&&i.setUvs(0,l),u&&i.setUvs(1,u),d&&i.setVertexStream(et,d,4,d.length/4,1),f&&i.setVertexStream($e,f,4),p&&i.setIndices(p),i.update(),i}set morph(e){e!==this._morph&&(this._morph&&this._morph.decRefCount(),this._morph=e,e&&e.incRefCount())}get morph(){return this._morph}set aabb(e){this._aabb=e,this._aabbVer++}get aabb(){return this._aabb}destroy(){let e=this.morph;e&&(this.morph=null,e.refCount<1&&e.destroy()),this.vertexBuffer&&(this.vertexBuffer.destroy(),this.vertexBuffer=null);for(let e=0;e<this.indexBuffer.length;e++)this._destroyIndexBuffer(e);this.indexBuffer.length=0,this._geometryData=null}_destroyIndexBuffer(e){this.indexBuffer[e]&&(this.indexBuffer[e].destroy(),this.indexBuffer[e]=null)}_initBoneAabbs(e){this.boneAabb=[],this.boneUsed=[];let t,n,r,i,a,o=[],s=[],c=this.boneUsed,l=this.skin.boneNames.length,u,d,f;for(let e=0;e<l;e++)o[e]=new k(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),s[e]=new k(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);let p=new wa(this.vertexBuffer),m=p.element[P],h=p.element[$e],g=p.element[et],_=this.vertexBuffer.numVertices;for(let l=0;l<_;l++){for(let p=0;p<4;p++)if(h.array[h.index+p]>0){let h=g.array[g.index+p];if(c[h]=!0,t=m.array[m.index],n=m.array[m.index+1],r=m.array[m.index+2],i=s[h],a=o[h],a.x>t&&(a.x=t),a.y>n&&(a.y=n),a.z>r&&(a.z=r),i.x<t&&(i.x=t),i.y<n&&(i.y=n),i.z<r&&(i.z=r),e){let o=u=t,s=d=n,c=f=r;for(let t=0;t<e.length;t++){let n=e[t],r=n.deltaPositions[l*3],i=n.deltaPositions[l*3+1],a=n.deltaPositions[l*3+2];r<0?o+=r:u+=r,i<0?s+=i:d+=i,a<0?c+=a:f+=a}a.x>o&&(a.x=o),a.y>s&&(a.y=s),a.z>c&&(a.z=c),i.x<u&&(i.x=u),i.y<d&&(i.y=d),i.z<f&&(i.z=f)}}p.next()}let v=this.vertexBuffer.getFormat().elements.find(e=>e.name===P);if(v&&v.normalize){let e=(()=>{switch(v.dataType){case 0:return e=>Math.max(e/127,-1);case 1:return e=>e/255;case 2:return e=>Math.max(e/32767,-1);case 3:return e=>e/65535;default:return e=>e}})();for(let t=0;t<l;t++)if(c[t]){let n=o[t],r=s[t];n.set(e(n.x),e(n.y),e(n.z)),r.set(e(r.x),e(r.y),e(r.z))}}for(let e=0;e<l;e++){let t=new be;t.setMinMax(o[e],s[e]),this.boneAabb.push(t)}}_initGeometryData(){this._geometryData||(this._geometryData=new $o,this.vertexBuffer&&(this._geometryData.vertexCount=this.vertexBuffer.numVertices,this._geometryData.maxVertices=this.vertexBuffer.numVertices),this.indexBuffer.length>0&&this.indexBuffer[0]&&(this._geometryData.indexCount=this.indexBuffer[0].numIndices,this._geometryData.maxIndices=this.indexBuffer[0].numIndices))}clear(e,t,n=0,r=0){this._initGeometryData(),this._geometryData.initDefaults(),this._geometryData.recreate=!0,this._geometryData.maxVertices=n,this._geometryData.maxIndices=r,this._geometryData.verticesUsage=+!!e,this._geometryData.indicesUsage=+!!t}setVertexStream(e,t,n,r,i=6,a=!1,o=!1){this._initGeometryData();let s=r||t.length/n;this._geometryData._changeVertexCount(s,e),this._geometryData.vertexStreamsUpdated=!0,this._geometryData.vertexStreamDictionary[e]=new es(t,n,i,a,o)}getVertexStream(e,t){let n=0,r=!1;if(this._geometryData){let i=this._geometryData.vertexStreamDictionary[e];if(i){r=!0,n=this._geometryData.vertexCount;let e=n*i.componentCount;if(ArrayBuffer.isView(t))Qo(t,i.data,Math.min(t.length,e));else{t.length=0;for(let n=0;n<e;n++)t[n]=i.data[n]}}}return r||this.vertexBuffer&&(n=new wa(this.vertexBuffer).readData(e,t)),n}setPositions(e,t=$o.DEFAULT_COMPONENTS_POSITION,n){this.setVertexStream(P,e,t,n,6,!1)}setNormals(e,t=$o.DEFAULT_COMPONENTS_NORMAL,n){this.setVertexStream(Ze,e,t,n,6,!1)}setUvs(e,t,n=$o.DEFAULT_COMPONENTS_UV,r){this.setVertexStream(nt+e,t,n,r,6,!1)}setColors(e,t=$o.DEFAULT_COMPONENTS_COLORS,n){this.setVertexStream(tt,e,t,n,6,!1)}setColors32(e,t){this.setVertexStream(tt,e,$o.DEFAULT_COMPONENTS_COLORS,t,1,!0)}setIndices(e,t){this._initGeometryData(),this._geometryData.indexStreamUpdated=!0,this._geometryData.indices=e,this._geometryData.indexCount=t||e.length}getPositions(e){return this.getVertexStream(P,e)}getNormals(e){return this.getVertexStream(Ze,e)}getUvs(e,t){return this.getVertexStream(nt+e,t)}getColors(e){return this.getVertexStream(tt,e)}getIndices(e){let t=0;if(this._geometryData&&this._geometryData.indices){let n=this._geometryData.indices;if(t=this._geometryData.indexCount,ArrayBuffer.isView(e))Qo(e,n,Math.min(e.length,t));else{e.length=0;for(let r=0;r<t;r++)e[r]=n[r]}}else this.indexBuffer.length>0&&this.indexBuffer[0]&&(t=this.indexBuffer[0].readData(e));return t}update(e=4,t=!0){if(this._geometryData){if(t){let e=this._geometryData.vertexStreamDictionary[P];e&&e.componentCount===3&&(this._aabb.compute(e.data,this._geometryData.vertexCount),this._aabbVer++)}let n=this._geometryData.recreate;this._geometryData.vertexCount>this._geometryData.maxVertices&&(n=!0,this._geometryData.maxVertices=this._geometryData.vertexCount),n&&this.vertexBuffer&&(this.vertexBuffer.destroy(),this.vertexBuffer=null);let r=this._geometryData.recreate;this._geometryData.indexCount>this._geometryData.maxIndices&&(r=!0,this._geometryData.maxIndices=this._geometryData.indexCount),r&&this.indexBuffer.length>0&&this.indexBuffer[0]&&(this.indexBuffer[0].destroy(),this.indexBuffer[0]=null),this._geometryData.vertexStreamsUpdated&&this._updateVertexBuffer(),this._geometryData.indexStreamUpdated&&this._updateIndexBuffer(),this.primitive[0].type=e,this.indexBuffer.length>0&&this.indexBuffer[0]?this._geometryData.indexStreamUpdated&&(this.primitive[0].count=this._geometryData.indexCount,this.primitive[0].indexed=!0):this._geometryData.vertexStreamsUpdated&&(this.primitive[0].count=this._geometryData.vertexCount,this.primitive[0].indexed=!1),this._geometryData.vertexCount=0,this._geometryData.indexCount=0,this._geometryData.vertexStreamsUpdated=!1,this._geometryData.indexStreamUpdated=!1,this._geometryData.recreate=!1,this.updateRenderStates()}}_buildVertexFormat(e){let t=[];for(let e in this._geometryData.vertexStreamDictionary){let n=this._geometryData.vertexStreamDictionary[e];t.push({semantic:e,components:n.componentCount,type:n.dataType,normalize:n.dataTypeNormalize,asInt:n.asInt})}return new lr(this.device,t,e)}_updateVertexBuffer(){if(!this.vertexBuffer){let e=this._geometryData.maxVertices,t=this._buildVertexFormat(e);this.vertexBuffer=new rr(this.device,t,e,{usage:this._geometryData.verticesUsage,storage:this._storageVertex})}let e=new wa(this.vertexBuffer),t=this._geometryData.vertexCount;for(let n in this._geometryData.vertexStreamDictionary){let r=this._geometryData.vertexStreamDictionary[n];e.writeData(n,r.data,t),delete this._geometryData.vertexStreamDictionary[n]}e.end()}_updateIndexBuffer(){if(this.indexBuffer.length<=0||!this.indexBuffer[0]){let e=this._geometryData.maxVertices,t=e>65535||e===0?2:1,n=this._storageIndex?{storage:!0}:void 0;this.indexBuffer[0]=new Xn(this.device,t,this._geometryData.maxIndices,this._geometryData.indicesUsage,void 0,n)}let e=this._geometryData.indices;e&&(this.indexBuffer[0].writeData(e,this._geometryData.indexCount),this._geometryData.indices=null)}prepareRenderState(e){e===1?this.generateWireframe():e===2&&(this.primitive[2]={type:0,base:0,baseVertex:0,count:this.vertexBuffer?this.vertexBuffer.numVertices:0,indexed:!1})}updateRenderStates(){this.primitive[2]&&this.prepareRenderState(2),this.primitive[1]&&this.prepareRenderState(1)}generateWireframe(){this._destroyIndexBuffer(1);let e=this.vertexBuffer.numVertices,t,n;if(this.indexBuffer.length>0&&this.indexBuffer[0]){let r=[[0,1],[1,2],[2,0]],i=this.primitive[0].base,a=this.primitive[0].count,o=this.primitive[0].baseVertex||0,s=this.indexBuffer[0],c=Jt[s.format],l=new c(s.storage),u=new c(a*2),d=new Set,f=0;for(let t=i;t<i+a;t+=3)for(let n=0;n<3;n++){let i=l[t+r[n][0]]+o,a=l[t+r[n][1]]+o,s=i>a?a*e+i:i*e+a;d.has(s)||(d.add(s),u[f++]=i,u[f++]=a)}d.clear(),n=s.format,t=u.slice(0,f)}else{let r=e-e%3,i=r/3*6;n=i>65535?2:1,t=i>65535?new Uint32Array(i):new Uint16Array(i);let a=0;for(let e=0;e<r;e+=3)t[a++]=e,t[a++]=e+1,t[a++]=e+1,t[a++]=e+2,t[a++]=e+2,t[a++]=e}let r=new Xn(this.vertexBuffer.device,n,t.length,0,t.buffer);this.primitive[1]={type:1,base:0,baseVertex:0,count:t.length,indexed:!0},this.indexBuffer[1]=r}},ns=new M,rs=new k,is=new N,as=new N,os=new k,ss=new k,cs=new M,ls=new N,us=new k,ds=new M,fs=new N,ps=new N,ms=new M,hs=new k,gs=new k;function _s(e,t){return e instanceof Function?e:n=>{let r=n[e];return r instanceof Function&&(r=r()),r===t}}function vs(e,t){if(t(e))return e;let n=e._children,r=n.length;for(let e=0;e<r;++e){let r=vs(n[e],t);if(r)return r}return null}var ys=class extends b{constructor(e=`Untitled`){super(),v(this,`name`,void 0),v(this,`tags`,new x(this)),v(this,`localPosition`,new k),v(this,`localRotation`,new N),v(this,`localScale`,new k(1,1,1)),v(this,`localEulerAngles`,new k),v(this,`position`,new k),v(this,`rotation`,new N),v(this,`eulerAngles`,new k),v(this,`_scale`,null),v(this,`localTransform`,new M),v(this,`_dirtyLocal`,!1),v(this,`_aabbVer`,0),v(this,`_frozen`,!1),v(this,`worldTransform`,new M),v(this,`_dirtyWorld`,!1),v(this,`_worldScaleSign`,0),v(this,`_normalMatrix`,new ae),v(this,`_dirtyNormal`,!0),v(this,`_right`,null),v(this,`_up`,null),v(this,`_forward`,null),v(this,`_parent`,null),v(this,`_children`,[]),v(this,`_graphDepth`,0),v(this,`_enabled`,!0),v(this,`_enabledInHierarchy`,!1),v(this,`scaleCompensation`,!1),this.name=e}get right(){return this._right||(this._right=new k),this.getWorldTransform().getX(this._right).normalize()}get up(){return this._up||(this._up=new k),this.getWorldTransform().getY(this._up).normalize()}get forward(){return this._forward||(this._forward=new k),this.getWorldTransform().getZ(this._forward).normalize().mulScalar(-1)}get normalMatrix(){let e=this._normalMatrix;return this._dirtyNormal&&(e.invertMat4(this.getWorldTransform()).transpose(),this._dirtyNormal=!1),e}set enabled(e){this._enabled!==e&&(this._enabled=e,(e&&this._parent?.enabled||!e)&&this._notifyHierarchyStateChanged(this,e))}get enabled(){return this._enabled&&this._enabledInHierarchy}get parent(){return this._parent}get path(){let e=this._parent;if(!e)return``;let t=this.name;for(;e&&e._parent;)t=`${e.name}/${t}`,e=e._parent;return t}get root(){let e=this;for(;e._parent;)e=e._parent;return e}get children(){return this._children}getChildren(){return this.children}getName(){return this.name}getPath(){return this.path}getRoot(){return this.root}getParent(){return this.parent}setName(e){this.name=e}get graphDepth(){return this._graphDepth}_notifyHierarchyStateChanged(e,t){e._onHierarchyStateChanged(t);let n=e._children;for(let e=0,r=n.length;e<r;e++)n[e]._enabled&&this._notifyHierarchyStateChanged(n[e],t)}_onHierarchyStateChanged(e){this._enabledInHierarchy=e,e&&!this._frozen&&this._unfreezeParentToRoot()}_cloneInternal(e){e.name=this.name;let t=this.tags._list;e.tags.clear();for(let n=0;n<t.length;n++)e.tags.add(t[n]);e.localPosition.copy(this.localPosition),e.localRotation.copy(this.localRotation),e.localScale.copy(this.localScale),e.localEulerAngles.copy(this.localEulerAngles),e.position.copy(this.position),e.rotation.copy(this.rotation),e.eulerAngles.copy(this.eulerAngles),e.localTransform.copy(this.localTransform),e._dirtyLocal=this._dirtyLocal,e.worldTransform.copy(this.worldTransform),e._dirtyWorld=this._dirtyWorld,e._dirtyNormal=this._dirtyNormal,e._aabbVer=this._aabbVer+1,e._enabled=this._enabled,e.scaleCompensation=this.scaleCompensation,e._enabledInHierarchy=!1}clone(){let e=new this.constructor;return this._cloneInternal(e),e}copy(e){return e._cloneInternal(this),this}destroy(){this.remove();let e=this._children;for(;e.length;){let t=e.pop();t._parent=null,t.destroy()}this.fire(`destroy`,this),this.off()}find(e,t){let n=[],r=_s(e,t);return this.forEach(e=>{r(e)&&n.push(e)}),n}findOne(e,t){let n=_s(e,t);return vs(this,n)}findByTag(...e){let t=[],n=(r,i)=>{i&&r.tags.has(...e)&&t.push(r);for(let e=0;e<r._children.length;e++)n(r._children[e],!0)};return n(this,!1),t}findByName(e){return this.findOne(`name`,e)}findByPath(e){let t=Array.isArray(e)?e:e.split(`/`),n=this;for(let e=0,r=t.length;e<r;++e)if(n=n.children.find(n=>n.name===t[e]),!n)return null;return n}forEach(e,t){e.call(t,this);let n=this._children,r=n.length;for(let i=0;i<r;++i)n[i].forEach(e,t)}isDescendantOf(e){let t=this._parent;for(;t;){if(t===e)return!0;t=t._parent}return!1}isAncestorOf(e){return e.isDescendantOf(this)}getEulerAngles(){return this.getWorldTransform().getEulerAngles(this.eulerAngles),this.eulerAngles}getLocalEulerAngles(){return this.localRotation.getEulerAngles(this.localEulerAngles),this.localEulerAngles}getLocalPosition(){return this.localPosition}getLocalRotation(){return this.localRotation}getLocalScale(){return this.localScale}getLocalTransform(){return this._dirtyLocal&&(this.localTransform.setTRS(this.localPosition,this.localRotation,this.localScale),this._dirtyLocal=!1),this.localTransform}getPosition(){return this.getWorldTransform().getTranslation(this.position),this.position}getRotation(){return this.rotation.setFromMat4(this.getWorldTransform()),this.rotation}getScale(){return this._scale||(this._scale=new k),this.getWorldTransform().getScale(this._scale)}getWorldTransform(){return!this._dirtyLocal&&!this._dirtyWorld?this.worldTransform:(this._parent&&this._parent.getWorldTransform(),this._sync(),this.worldTransform)}get worldScaleSign(){return this._worldScaleSign===0&&(this._worldScaleSign=this.getWorldTransform().scaleSign),this._worldScaleSign}remove(){this._parent?.removeChild(this)}reparent(e,t){this.remove(),e&&(t>=0?e.insertChild(this,t):e.addChild(this))}setLocalEulerAngles(e,t,n){this.localRotation.setFromEulerAngles(e,t,n),this._dirtyLocal||this._dirtifyLocal()}setLocalPosition(e,t,n){e instanceof k?this.localPosition.copy(e):this.localPosition.set(e,t,n),this._dirtyLocal||this._dirtifyLocal()}setLocalRotation(e,t,n,r){e instanceof N?this.localRotation.copy(e):this.localRotation.set(e,t,n,r),this._dirtyLocal||this._dirtifyLocal()}setLocalScale(e,t,n){e instanceof k?this.localScale.copy(e):this.localScale.set(e,t,n),this._dirtyLocal||this._dirtifyLocal()}_dirtifyLocal(){this._dirtyLocal||(this._dirtyLocal=!0,this._dirtyWorld||this._dirtifyWorld())}_unfreezeParentToRoot(){let e=this._parent;for(;e;)e._frozen=!1,e=e._parent}_dirtifyWorld(){this._dirtyWorld||this._unfreezeParentToRoot(),this._dirtifyWorldInternal()}_dirtifyWorldInternal(){if(!this._dirtyWorld){this._frozen=!1,this._dirtyWorld=!0;for(let e=0;e<this._children.length;e++)this._children[e]._dirtyWorld||this._children[e]._dirtifyWorldInternal()}this._dirtyNormal=!0,this._worldScaleSign=0,this._aabbVer++}setPosition(e,t,n){e instanceof k?us.copy(e):us.set(e,t,n),this._parent===null?this.localPosition.copy(us):(ds.copy(this._parent.getWorldTransform()).invert(),ds.transformPoint(us,this.localPosition)),this._dirtyLocal||this._dirtifyLocal()}setRotation(e,t,n,r){if(e instanceof N?fs.copy(e):fs.set(e,t,n,r),this._parent===null)this.localRotation.copy(fs);else{let e=this._parent.getRotation();ps.copy(e).invert(),this.localRotation.copy(ps).mul(fs)}this._dirtyLocal||this._dirtifyLocal()}setPositionAndRotation(e,t){if(this._parent===null)this.localPosition.copy(e),this.localRotation.copy(t);else{let n=this._parent.getWorldTransform();ds.copy(n).invert(),ds.transformPoint(e,this.localPosition),this.localRotation.setFromMat4(ds).mul(t)}this._dirtyLocal||this._dirtifyLocal()}setEulerAngles(e,t,n){if(this.localRotation.setFromEulerAngles(e,t,n),this._parent!==null){let e=this._parent.getRotation();ps.copy(e).invert(),this.localRotation.mul2(ps,this.localRotation)}this._dirtyLocal||this._dirtifyLocal()}addChild(e){this._prepareInsertChild(e),this._children.push(e),this._onInsertChild(e)}addChildAndSaveTransform(e){let t=e.getPosition(),n=e.getRotation();this._prepareInsertChild(e),e.setPosition(cs.copy(this.worldTransform).invert().transformPoint(t)),e.setRotation(ls.copy(this.getRotation()).invert().mul(n)),this._children.push(e),this._onInsertChild(e)}insertChild(e,t){this._prepareInsertChild(e),this._children.splice(t,0,e),this._onInsertChild(e)}_prepareInsertChild(e){e.remove()}_fireOnHierarchy(e,t,n){this.fire(e,n);for(let e=0;e<this._children.length;e++)this._children[e]._fireOnHierarchy(t,t,n)}_onInsertChild(e){e._parent=this;let t=e._enabled&&this.enabled;e._enabledInHierarchy!==t&&(e._enabledInHierarchy=t,e._notifyHierarchyStateChanged(e,t)),e._updateGraphDepth(),e._dirtifyWorld(),this._frozen&&e._unfreezeParentToRoot(),e._fireOnHierarchy(`insert`,`inserthierarchy`,this),this.fire&&this.fire(`childinsert`,e)}_updateGraphDepth(){this._graphDepth=this._parent?this._parent._graphDepth+1:0;for(let e=0,t=this._children.length;e<t;e++)this._children[e]._updateGraphDepth()}removeChild(e){let t=this._children.indexOf(e);t!==-1&&(this._children.splice(t,1),e._parent=null,e._fireOnHierarchy(`remove`,`removehierarchy`,this),this.fire(`childremove`,e))}_sync(){if(this._dirtyLocal&&(this.localTransform.setTRS(this.localPosition,this.localRotation,this.localScale),this._dirtyLocal=!1),this._dirtyWorld){if(this._parent===null)this.worldTransform.copy(this.localTransform);else if(this.scaleCompensation){let e,t=this._parent,n=this.localScale,r=t;if(r){for(;r&&r.scaleCompensation;)r=r._parent;r&&(r=r._parent,r&&(e=r.worldTransform.getScale(),os.mul2(e,this.localScale),n=os))}as.setFromMat4(t.worldTransform),is.mul2(as,this.localRotation);let i=t.worldTransform;t.scaleCompensation&&(ss.mul2(e,t.getLocalScale()),ns.setTRS(t.worldTransform.getTranslation(rs),as,ss),i=ns),i.transformPoint(this.localPosition,rs),this.worldTransform.setTRS(rs,is,n)}else this.worldTransform.mulAffine2(this._parent.worldTransform,this.localTransform);this._dirtyWorld=!1}}syncHierarchy(){if(!this._enabled||this._frozen)return;this._frozen=!0,(this._dirtyLocal||this._dirtyWorld)&&this._sync();let e=this._children;for(let t=0,n=e.length;t<n;t++)e[t].syncHierarchy()}lookAt(e,t,n,r=0,i=1,a=0){if(e instanceof k)hs.copy(e),t instanceof k?gs.copy(t):gs.copy(k.UP);else if(n===void 0)return;else hs.set(e,t,n),gs.set(r,i,a);ms.setLookAt(this.getPosition(),hs,gs),fs.setFromMat4(ms),this.setRotation(fs)}translate(e,t,n){e instanceof k?us.copy(e):us.set(e,t,n),us.add(this.getPosition()),this.setPosition(us)}translateLocal(e,t,n){e instanceof k?us.copy(e):us.set(e,t,n),this.localRotation.transformVector(us,us),this.localPosition.add(us),this._dirtyLocal||this._dirtifyLocal()}rotate(e,t,n){if(fs.setFromEulerAngles(e,t,n),this._parent===null)this.localRotation.mul2(fs,this.localRotation);else{let e=this.getRotation(),t=this._parent.getRotation();ps.copy(t).invert(),fs.mul2(ps,fs),this.localRotation.mul2(fs,e)}this._dirtyLocal||this._dirtifyLocal()}rotateLocal(e,t,n){fs.setFromEulerAngles(e,t,n),this.localRotation.mul(fs),this._dirtyLocal||this._dirtifyLocal()}},bs=new an;function xs(e){return bs.get(e)}function Ss(e,t){bs.get(e,()=>t)}var Cs=class{constructor(){v(this,`cache`,new Map)}destroy(){this.cache.forEach((e,t)=>{t.destroy()}),this.cache.clear()}incRef(e){let t=(this.cache.get(e)||0)+1;this.cache.set(e,t)}decRef(e){if(e){let t=this.cache.get(e);t&&(t--,t===0?(this.cache.delete(e),e.destroy()):this.cache.set(e,t))}}},ws=class{static incRef(e){this.cache.incRef(e)}static decRef(e){this.cache.decRef(e)}static destroy(){this.cache.destroy()}};v(ws,`cache`,new Cs);var Ts=new class{constructor(){v(this,`_counter`,0)}get(){return this._counter++}},Es=new be,Ds=new be,Os=new Set,ks=new Uint32Array(4),As=class{constructor(e){v(this,`vertexBuffer`,null),v(this,`_destroyVertexBuffer`,!1),this.count=e}destroy(){this._destroyVertexBuffer&&this.vertexBuffer?.destroy(),this.vertexBuffer=null}},js=class{constructor(){v(this,`shader`,void 0),v(this,`bindGroup`,null),v(this,`uniformBuffer`,null),v(this,`hashes`,void 0)}getBindGroup(e){if(!this.bindGroup){let t=this.shader.meshBindGroupFormat;this.bindGroup=new vn(e,t)}return this.bindGroup}getUniformBuffer(e){if(!this.uniformBuffer){let t=this.shader.meshUniformBufferFormat;this.uniformBuffer=new vi(e,t,!1)}return this.uniformBuffer}destroy(){this.bindGroup?.destroy(),this.bindGroup=null,this.uniformBuffer?.destroy(),this.uniformBuffer=null}},Ms=class e{constructor(e,t,n=null){if(v(this,`castShadow`,!1),v(this,`shadowCascadeMask`,255),v(this,`cull`,!0),v(this,`drawOrder`,0),v(this,`_drawBucket`,127),v(this,`node`,void 0),v(this,`visible`,!0),v(this,`shaderPassMask`,4294967295),v(this,`visibleThisFrame`,!1),v(this,`flipFacesFactor`,1),v(this,`gsplatInstance`,null),v(this,`id`,Ts.get()),v(this,`isVisibleFunc`,null),v(this,`instancingData`,null),v(this,`indirectData`,null),v(this,`drawCommands`,null),v(this,`meshMetaData`,null),v(this,`parameters`,{}),v(this,`pick`,!0),v(this,`stencilFront`,null),v(this,`stencilBack`,null),v(this,`transparent`,!1),v(this,`_aabb`,new be),v(this,`_aabbVer`,-1),v(this,`_aabbMeshVer`,-1),v(this,`_customAabb`,null),v(this,`_updateAabb`,!0),v(this,`_updateAabbFunc`,null),v(this,`_sortKeyShadow`,0),v(this,`_sortKeyForward`,0),v(this,`_sortKeyDynamic`,0),v(this,`_layer`,15),v(this,`_material`,null),v(this,`_skinInstance`,null),v(this,`_morphInstance`,null),v(this,`_receiveShadow`,!0),v(this,`_renderStyle`,0),v(this,`_screenSpace`,!1),v(this,`_shaderCache`,new Map),v(this,`_shaderDefs`,65536),v(this,`_calculateSortDistance`,null),this.node=n,this._mesh=e,e.incRefCount(),this.material=t,e.vertexBuffer){let t=e.vertexBuffer.format;this._shaderDefs|=t.hasUv0?4:0,this._shaderDefs|=t.hasUv1?8:0,this._shaderDefs|=t.hasColor?16:0,this._shaderDefs|=t.hasTangents?512:0}this.updateKey()}set drawBucket(e){this._drawBucket=Math.floor(e)&255,this.updateKey()}get drawBucket(){return this._drawBucket}set renderStyle(e){this._renderStyle=e,this.mesh.prepareRenderState(e)}get renderStyle(){return this._renderStyle}set mesh(e){e!==this._mesh&&(this._mesh&&this._mesh.decRefCount(),this._mesh=e,e&&e.incRefCount())}get mesh(){return this._mesh}set aabb(e){this._aabb=e}get aabb(){if(!this._updateAabb)return this._aabb;if(this._updateAabbFunc)return this._updateAabbFunc(this._aabb);let e=this._customAabb,t=!!e;if(!e){if(e=Es,this.skinInstance){if(!this.mesh.boneAabb){let e=this._morphInstance?this._morphInstance.morph._targets:null;this.mesh._initBoneAabbs(e)}let n=this.mesh.boneUsed,r=!0;for(let t=0;t<this.mesh.boneAabb.length;t++)n[t]&&(Ds.setFromTransformedAabb(this.mesh.boneAabb[t],this.skinInstance.matrices[t]),r?(r=!1,e.center.copy(Ds.center),e.halfExtents.copy(Ds.halfExtents)):e.add(Ds));t=!0}else if(this.node._aabbVer!==this._aabbVer||this.mesh._aabbVer!==this._aabbMeshVer){if(this.mesh?(e.center.copy(this.mesh.aabb.center),e.halfExtents.copy(this.mesh.aabb.halfExtents)):(e.center.set(0,0,0),e.halfExtents.set(0,0,0)),this.mesh&&this.mesh.morph){let t=this.mesh.morph.aabb;e._expand(t.getMin(),t.getMax())}t=!0,this._aabbVer=this.node._aabbVer,this._aabbMeshVer=this.mesh._aabbVer}}return t&&this._aabb.setFromTransformedAabb(e,this.node.getWorldTransform()),this._aabb}clearShaders(){this._shaderCache.forEach(e=>{e.destroy()}),this._shaderCache.clear()}getShaderInstance(e,t,n,r,i,a){let o=this._shaderDefs;ks[0]=e,ks[1]=t,ks[2]=o,ks[3]=r.hash;let s=ar(ks),c=this._shaderCache.get(s);if(!c){let t=this._material;if(c=new js,c.shader=t.variants.get(s),c.hashes=new Uint32Array(ks),!c.shader){let l=t.getShaderVariant({device:this.mesh.device,scene:n,objDefs:o,cameraShaderParams:r,pass:e,sortedLights:a,viewUniformFormat:i,vertexFormat:this.mesh.vertexBuffer?.format});t.variants.set(s,l),c.shader=l}this._shaderCache.set(s,c)}return c}set material(e){this.clearShaders();let t=this._material;t&&t.removeMeshInstanceRef(this),this._material=e,e&&(e.addMeshInstanceRef(this),this.transparent=e.transparent,this.updateKey())}get material(){return this._material}_updateShaderDefs(e){e!==this._shaderDefs&&(this._shaderDefs=e,this.clearShaders())}set calculateSortDistance(e){this._calculateSortDistance=e}get calculateSortDistance(){return this._calculateSortDistance}set receiveShadow(e){this._receiveShadow!==e&&(this._receiveShadow=e,this._updateShaderDefs(e?this._shaderDefs&-2:this._shaderDefs|1))}get receiveShadow(){return this._receiveShadow}set batching(e){this._updateShaderDefs(e?this._shaderDefs|$a:this._shaderDefs&~$a)}get batching(){return(this._shaderDefs&$a)!==0}set skinInstance(e){this._skinInstance=e,this._updateShaderDefs(e?this._shaderDefs|2:this._shaderDefs&-3),this._setupSkinUpdate()}get skinInstance(){return this._skinInstance}set morphInstance(e){this._morphInstance?.destroy(),this._morphInstance=e;let t=this._shaderDefs;t=e&&e.morph.morphPositions?t|Ya:t&~Ya,t=e&&e.morph.morphNormals?t|Xa:t&~Xa,t=e&&e.morph.intRenderFormat?t|Qa:t&~Qa,this._updateShaderDefs(t)}get morphInstance(){return this._morphInstance}set screenSpace(e){this._screenSpace!==e&&(this._screenSpace=e,this._updateShaderDefs(e?this._shaderDefs|256:this._shaderDefs&-257))}get screenSpace(){return this._screenSpace}set key(e){this._sortKeyForward=e}get key(){return this._sortKeyForward}set mask(e){let t=this._shaderDefs&65535;this._updateShaderDefs(t|e<<16)}get mask(){return this._shaderDefs>>16}set instancingCount(e){this.instancingData&&(this.instancingData.count=e)}get instancingCount(){return this.instancingData?this.instancingData.count:0}destroy(){let t=this.mesh;t&&(this.mesh=null,t.refCount<1&&t.destroy()),this.setRealtimeLightmap(e.lightmapParamNames[0],null),this.setRealtimeLightmap(e.lightmapParamNames[1],null),this._skinInstance?.destroy(),this._skinInstance=null,this.morphInstance?.destroy(),this.morphInstance=null,this.clearShaders(),this.material=null,this.instancingData?.destroy(),this.destroyDrawCommands()}destroyDrawCommands(){if(this.drawCommands){for(let e of this.drawCommands.values())e?.destroy();this.drawCommands=null}}static _prepareRenderStyleForArray(e,t){if(e){for(let n=0;n<e.length;n++){e[n]._renderStyle=t;let r=e[n].mesh;Os.has(r)||(Os.add(r),r.prepareRenderState(t))}Os.clear()}}_isVisible(e){return this.visible?this.isVisibleFunc?this.isVisibleFunc(e):e.frustum.containsAabb(this.aabb):!1}updateKey(){let{material:e}=this;this._sortKeyForward=this._drawBucket<<23|(e.alphaToCoverage||e.alphaTest?4194304:0)|e.id&4194303}setInstancing(e,t=!1){e?(e===!0?this.instancingData=new As(0):(this.instancingData=new As(e.numVertices),this.instancingData.vertexBuffer=e,e.format.instancing=!0),this.cull=t):(this.instancingData=null,this.cull=!0),this._updateShaderDefs(e instanceof rr?this._shaderDefs|32:this._shaderDefs&-33)}setIndirect(e,t,n=1){let r=e?.camera??null;if(t===-1)this._deleteDrawCommandsKey(r);else{this.drawCommands??(this.drawCommands=new Map);let e=this.drawCommands.get(r)??new ua(this.mesh.device);e.slotIndex=t,e.update(n),this.drawCommands.set(r,e),this.mesh.device.mapsToClear.add(this.drawCommands)}}setMultiDraw(e,t=1){let n=e?.camera??null,r;if(t===0)this._deleteDrawCommandsKey(n);else{if(this.drawCommands??(this.drawCommands=new Map),r=this.drawCommands.get(n),!r){let e=this.mesh.indexBuffer?.[0]?.format,t=e===void 0?0:Pe[e];r=new ua(this.mesh.device,t),this.drawCommands.set(n,r)}r.allocate(t)}return r}_deleteDrawCommandsKey(e){let t=this.drawCommands;t&&(t.get(e)?.destroy(),t.delete(e),t.size===0&&this.destroyDrawCommands())}getDrawCommands(e){let t=this.drawCommands;if(t)return t.get(e)??t.get(null)}getIndirectMetaData(){let e=this.mesh?.primitive[this.renderStyle],t=this.meshMetaData??(this.meshMetaData=new Int32Array(4));return t[0]=e.count,t[1]=e.base,t[2]=e.baseVertex,t}ensureMaterial(e){this.material||(this.material=xs(e))}clearParameters(){this.parameters={}}getParameters(){return this.parameters}getParameter(e){return this.parameters[e]}setParameter(e,t){let n=this.parameters[e];n?n.data=t:this.parameters[e]={scopeId:null,data:t}}setRealtimeLightmap(e,t){let n=this.getParameter(e);n!==t&&(n&&ws.decRef(n.data),t?(ws.incRef(t),this.setParameter(e,t)):this.deleteParameter(e))}deleteParameter(e){this.parameters[e]&&delete this.parameters[e]}setParameters(e){let t=this.parameters;for(let n in t){let r=t[n];r.scopeId||(r.scopeId=e.scope.resolve(n)),r.scopeId.setValue(r.data)}}setLightmapped(t){t?this.mask=(this.mask|2)&-6:(this.setRealtimeLightmap(e.lightmapParamNames[0],null),this.setRealtimeLightmap(e.lightmapParamNames[1],null),this._shaderDefs&=~(192|Za),this.mask=(this.mask|1)&-7)}setCustomAabb(e){e?this._customAabb?this._customAabb.copy(e):this._customAabb=e.clone():(this._customAabb=null,this._aabbVer=-1),this._setupSkinUpdate()}_setupSkinUpdate(){this._skinInstance&&(this._skinInstance._updateBeforeCull=!this._customAabb)}};v(Ms,`lightmapParamNames`,[`texture_lightMap`,`texture_dirLightMap`]);var Ns=`uSceneColorMap`,Ps=class extends wr{constructor(...e){super(...e),v(this,`colorRenderTarget`,null),v(this,`source`,null)}destroy(){super.destroy(),this.releaseRenderTarget(this.colorRenderTarget)}shouldReallocate(e,t,n){if(e?.colorBuffer.format!==n)return!0;let r=t?.width||this.device.width,i=t?.height||this.device.height;return!e||r!==e.width||i!==e.height}allocateRenderTarget(e,t,n,r){let i=new dn(n,{name:Ns,format:r,width:t?t.colorBuffer.width:n.width,height:t?t.colorBuffer.height:n.height,mipmaps:!0,minFilter:5,magFilter:1,addressU:1,addressV:1});return e?(e.destroyFrameBuffers(),e._colorBuffer=i,e._colorBuffers=[i],e.evaluateDimensions()):e=new gr({name:`ColorGrabRT`,colorBuffer:i,depth:!1,stencil:!1,autoResolve:!1}),e}releaseRenderTarget(e){e&&(e.destroyTextureBuffers(),e.destroy())}frameUpdate(){let e=this.device,t=this.source,n=t?.colorBuffer.format??this.device.backBufferFormat;this.shouldReallocate(this.colorRenderTarget,t?.colorBuffer,n)&&(this.releaseRenderTarget(this.colorRenderTarget),this.colorRenderTarget=this.allocateRenderTarget(this.colorRenderTarget,t,e,n));let r=this.colorRenderTarget.colorBuffer;e.scope.resolve(Ns).setValue(r)}execute(){let e=this.device,t=this.source,n=this.colorRenderTarget.colorBuffer;e.isWebGPU?(e.copyRenderTarget(t,this.colorRenderTarget,!0,!1),e.mipmapRenderer.generate(this.colorRenderTarget.colorBuffer.impl)):(e.copyRenderTarget(t,this.colorRenderTarget,!0,!1),e.activeTexture(e.maxCombinedTextures-1),e.bindTexture(n),e.gl.generateMipmap(n.impl._glTarget))}},Fs=`uSceneDepthMap`,Is=class extends wr{constructor(e,t){super(e),v(this,`depthRenderTarget`,null),v(this,`camera`,null),this.camera=t}destroy(){super.destroy(),this.releaseRenderTarget(this.depthRenderTarget)}shouldReallocate(e,t){let n=t?.width||this.device.width,r=t?.height||this.device.height;return!e||n!==e.width||r!==e.height}allocateRenderTarget(e,t,n,r,i){let a=dn.createDataTexture2D(n,Fs,t?t.colorBuffer.width:n.width,t?t.colorBuffer.height:n.height,r);return e?(e.destroyFrameBuffers(),i?e._depthBuffer=a:(e._colorBuffer=a,e._colorBuffers=[a]),e.evaluateDimensions()):e=new gr({name:`DepthGrabRT`,colorBuffer:i?null:a,depthBuffer:i?a:null,depth:!i,stencil:n.supportsStencil,autoResolve:!1}),e}releaseRenderTarget(e){e&&(e.destroyTextureBuffers(),e.destroy())}before(){let e=this.camera,t=this.device,n=e?.renderTarget??t.backBuffer,r=!0,i=n.stencil?17:16;t.isWebGPU&&n.samples>1&&(i=15,r=!1);let a=e.renderTarget?.depthBuffer??e.renderTarget?.colorBuffer;this.shouldReallocate(this.depthRenderTarget,a)&&(this.releaseRenderTarget(this.depthRenderTarget),this.depthRenderTarget=this.allocateRenderTarget(this.depthRenderTarget,e.renderTarget,t,i,r));let o=r?this.depthRenderTarget.depthBuffer:this.depthRenderTarget.colorBuffer;t.scope.resolve(Fs).setValue(o),e.publishSceneDepthMap(o,t.renderVersion)}execute(){let e=this.device;if(e.isWebGL2&&e.renderTarget.samples>1){let t=e.renderTarget.impl._glFrameBuffer,n=this.depthRenderTarget;e.renderTarget=n,e.updateBegin(),this.depthRenderTarget.impl.internalResolve(e,t,n.impl._glFrameBuffer,this.depthRenderTarget,e.gl.DEPTH_BUFFER_BIT)}else e.copyRenderTarget(e.renderTarget,this.depthRenderTarget,!1,!0)}},Ls=class{constructor(){v(this,`_gammaCorrection`,1),v(this,`_toneMapping`,0),v(this,`_srgbRenderTarget`,!1),v(this,`_ssaoEnabled`,!1),v(this,`_fog`,Oa),v(this,`_sceneDepthMapLinear`,!1),v(this,`_sceneDepthMapPacked`,!1),v(this,`_sceneDepthMapReciprocal`,!1),v(this,`_sceneTextures`,[]),v(this,`_hash`,void 0),v(this,`_defines`,new Map),v(this,`_definesDirty`,!0)}get hash(){if(this._hash===void 0){let e=`${this.gammaCorrection}_${this.toneMapping}_${this.srgbRenderTarget}_${this.fog}_${this.ssaoEnabled}_${this.sceneDepthMapLinear}_${this.sceneDepthMapPacked}_${this.sceneDepthMapReciprocal}_${this._sceneTextures.join(`-`)}`;this._hash=ir(e)}return this._hash}get defines(){let e=this._defines;return this._definesDirty&&(this._definesDirty=!1,e.clear(),this._sceneDepthMapLinear&&(e.set(`SCENE_DEPTHMAP_LINEAR`,``),this._sceneDepthMapPacked&&e.set(`SCENE_DEPTHMAP_PACKED`,``),this._sceneDepthMapReciprocal&&e.set(`SCENE_DEPTHMAP_RECIPROCAL`,``)),this._sceneTextures.forEach((t,n)=>{let r=t.toUpperCase();e.set(`SCENE_TEXTURE_${r}`,``),e.set(`{SCENE_TEXTURE_${r}_SLOT}`,String(n+1))}),this.shaderOutputGamma===1&&e.set(`SCENE_COLORMAP_GAMMA`,``),e.set(`FOG`,this._fog.toUpperCase()),e.set(`TONEMAP`,La[this._toneMapping]),e.set(`GAMMA`,Ia[this.shaderOutputGamma])),e}markDirty(){this._hash=void 0,this._definesDirty=!0}set fog(e){this._fog!==e&&(this._fog=e,this.markDirty())}get fog(){return this._fog}set ssaoEnabled(e){this._ssaoEnabled!==e&&(this._ssaoEnabled=e,this.markDirty())}get ssaoEnabled(){return this._ssaoEnabled}set gammaCorrection(e){this._gammaCorrectionAssigned=!0,this._gammaCorrection!==e&&(this._gammaCorrection=e,this.markDirty())}get gammaCorrection(){return this._gammaCorrection}set toneMapping(e){this._toneMapping!==e&&(this._toneMapping=e,this.markDirty())}get toneMapping(){return this._toneMapping}set srgbRenderTarget(e){this._srgbRenderTarget!==e&&(this._srgbRenderTarget=e,this.markDirty())}get srgbRenderTarget(){return this._srgbRenderTarget}set sceneDepthMapLinear(e){this._sceneDepthMapLinear!==e&&(this._sceneDepthMapLinear=e,this.markDirty())}get sceneDepthMapLinear(){return this._sceneDepthMapLinear}set sceneDepthMapPacked(e){this._sceneDepthMapPacked!==e&&(this._sceneDepthMapPacked=e,this.markDirty())}get sceneDepthMapPacked(){return this._sceneDepthMapPacked}set sceneDepthMapReciprocal(e){this._sceneDepthMapReciprocal!==e&&(this._sceneDepthMapReciprocal=e,this.markDirty())}get sceneDepthMapReciprocal(){return this._sceneDepthMapReciprocal}set sceneTextures(e){let t=e??[];_r.equals(this._sceneTextures,t)||(this._sceneTextures=t.slice(),this.markDirty())}get sceneTextures(){return this._sceneTextures}get shaderOutputGamma(){return+(this._gammaCorrection===1&&!this._srgbRenderTarget)}},Rs=new k,zs=new k,Bs=new k,Vs=new M,Hs=new M,Us=new je,Ws=new M,Gs=new M,Ks=new M,qs=[new k,new k,new k,new k,new k,new k,new k,new k],Js=class e{static applyShaderProjectionTransform(t,n,r,i){if(!r&&!i)return n.copy(t),n;if(r&&i){let r=e._applyShaderProjectionScratch;return r.mul2(e._flipYProjectionMatrix,t),n.mul2(e._webGpuDepthRangeMatrix,r),n}return r?(n.mul2(e._flipYProjectionMatrix,t),n):(n.mul2(e._webGpuDepthRangeMatrix,t),n)}constructor(e){v(this,`shaderPassInfo`,null),v(this,`renderPassColorGrab`,null),v(this,`renderPassDepthGrab`,null),v(this,`fogParams`,null),v(this,`shaderParams`,new Ls),v(this,`framePasses`,[]),v(this,`beforePasses`,[]),v(this,`sceneDepthMap`,null),v(this,`sceneDepthMapVersion`,-1),v(this,`jitter`,0),v(this,`device`,void 0),this.device=e,this._aspectRatio=16/9,this._aspectRatioMode=0,this._calculateProjection=null,this._calculateTransform=null,this._clearColor=new O(.75,.75,.75,1),this._clearColorBuffer=!0,this._clearDepth=1,this._clearDepthBuffer=!0,this._clearStencil=0,this._clearStencilBuffer=!0,this._cullFaces=!0,this._farClip=1e3,this._flipFaces=!1,this._fov=45,this._frustumCulling=!0,this._horizontalFov=!1,this._layers=[0,1,2,4,3],this._layersSet=new Set(this._layers),this._nearClip=.1,this._node=null,this._orthoHeight=10,this._projection=0,this._projectionOffset=new A,this._rect=new j(0,0,1,1),this._renderTarget=null,this._scissorRect=new j(0,0,1,1),this._scissorRectClear=!1,this._aperture=16,this._shutter=1/1e3,this._sensitivity=1e3,this._projMat=new M,this._projMatDirty=!0,this._projMatSkybox=new M,this._viewMat=new M,this._viewMatDirty=!0,this._viewProjMat=new M,this._viewProjMatDirty=!0,this._shaderMatricesVersion=0,this._viewProjInverse=new M,this._viewProjCurrent=null,this._viewProjPrevious=new M,this._jitters=[0,0,0,0],this.frustum=new je,this._cullLayers=new Set,this._xrViews=null,this._xrProperties={horizontalFov:this._horizontalFov,fov:this._fov,aspectRatio:this._aspectRatio,farClip:this._farClip,nearClip:this._nearClip}}destroy(){this.renderPassColorGrab?.destroy(),this.renderPassColorGrab=null,this.renderPassDepthGrab?.destroy(),this.renderPassDepthGrab=null,this.framePasses.length=0,this.beforePasses.length=0,this.sceneDepthMap=null}publishSceneDepthMap(e,t){this.sceneDepthMap=e,this.sceneDepthMapVersion=t}_storeShaderMatrices(e,t,n,r){this._shaderMatricesVersion!==r&&(this._shaderMatricesVersion=r,this._viewProjPrevious.copy(this._viewProjCurrent??e),this._viewProjCurrent??(this._viewProjCurrent=new M),this._viewProjCurrent.copy(e),this._viewProjInverse.invert(e),this._jitters[2]=this._jitters[0],this._jitters[3]=this._jitters[1],this._jitters[0]=t,this._jitters[1]=n)}get fullSizeClearRect(){let e=this._scissorRectClear?this.scissorRect:this._rect;return e.x===0&&e.y===0&&e.z===1&&e.w===1}set aspectRatio(e){this._aspectRatio!==e&&(this._aspectRatio=e,this._projMatDirty=!0)}get aspectRatio(){if(this.xrActive)return this._xrProperties.aspectRatio;if(this._aspectRatioMode===0){let e=this.calculateAspectRatio();this._aspectRatio!==e&&(this._aspectRatio=e,this._projMatDirty=!0)}return this._aspectRatio}set aspectRatioMode(e){this._aspectRatioMode!==e&&(this._aspectRatioMode=e,this._projMatDirty=!0)}get aspectRatioMode(){return this._aspectRatioMode}set calculateProjection(e){this._calculateProjection=e,this._projMatDirty=!0}get calculateProjection(){return this._calculateProjection}set calculateTransform(e){this._calculateTransform=e}get calculateTransform(){return this._calculateTransform}set clearColor(e){this._clearColor.copy(e)}get clearColor(){return this._clearColor}set clearColorBuffer(e){this._clearColorBuffer=e}get clearColorBuffer(){return this._clearColorBuffer}set clearDepth(e){this._clearDepth=e}get clearDepth(){return this._clearDepth}set clearDepthBuffer(e){this._clearDepthBuffer=e}get clearDepthBuffer(){return this._clearDepthBuffer}set clearStencil(e){this._clearStencil=e}get clearStencil(){return this._clearStencil}set clearStencilBuffer(e){this._clearStencilBuffer=e}get clearStencilBuffer(){return this._clearStencilBuffer}set cullFaces(e){this._cullFaces=e}get cullFaces(){return this._cullFaces}set farClip(e){this._farClip!==e&&(this._farClip=e,this._projMatDirty=!0)}get farClip(){return this.xrActive?this._xrProperties.farClip:this._farClip}set flipFaces(e){this._flipFaces=e}get flipFaces(){return this._flipFaces}set fov(e){this._fov!==e&&(this._fov=e,this._projMatDirty=!0)}get fov(){return this.xrActive?this._xrProperties.fov:this._fov}set frustumCulling(e){this._frustumCulling=e}get frustumCulling(){return this._frustumCulling}set horizontalFov(e){this._horizontalFov!==e&&(this._horizontalFov=e,this._projMatDirty=!0)}get horizontalFov(){return this.xrActive?this._xrProperties.horizontalFov:this._horizontalFov}set layers(e){this._layers=e.slice(0),this._layersSet=new Set(this._layers)}get layers(){return this._layers}get layersSet(){return this._layersSet}set nearClip(e){this._nearClip!==e&&(this._nearClip=e,this._projMatDirty=!0)}get nearClip(){return this.xrActive?this._xrProperties.nearClip:this._nearClip}set node(e){this._node=e}get node(){return this._node}set orthoHeight(e){this._orthoHeight!==e&&(this._orthoHeight=e,this._projMatDirty=!0)}get orthoHeight(){return this._orthoHeight}set projection(e){this._projection!==e&&(this._projection=e,this._projMatDirty=!0)}get projection(){return this._projection}get projectionMatrix(){return this._evaluateProjectionMatrix(),this._projMat}set projectionOffset(e){this._projectionOffset.copy(e),this._projMatDirty=!0}get projectionOffset(){return this._projectionOffset}set rect(e){this._rect.copy(e),this._projMatDirty=!0}get rect(){return this._rect}set renderTarget(e){this._renderTarget=e,this._projMatDirty=!0}get renderTarget(){return this._renderTarget}set scissorRect(e){this._scissorRect.copy(e)}get scissorRect(){return this._scissorRect}get viewMatrix(){if(this._viewMatDirty){let e=this._node.getWorldTransform();this._viewMat.copy(e).invert(),this._viewMatDirty=!1}return this._viewMat}set aperture(e){this._aperture=e}get aperture(){return this._aperture}set sensitivity(e){this._sensitivity=e}get sensitivity(){return this._sensitivity}set shutter(e){this._shutter=e}get shutter(){return this._shutter}set xrViews(e){e!==null!=(this._xrViews!==null)&&(this._projMatDirty=!0),this._xrViews=e}get xrViews(){return this._xrViews}get xrActive(){return this._xrViews!==null}addCullLayer(e){let t=this._cullLayers.size===0;return this._cullLayers.add(e),t}get cullLayers(){return this._cullLayers}clearCullLayers(){this._cullLayers.clear()}calculateAspectRatio(e){let t=e??this._renderTarget,n=t?t.width:this.device.width,r=t?t.height:this.device.height;return n*this._rect.z/(r*this._rect.w)}clone(){return new e(this.device).copy(this)}copy(e){return this._aspectRatio=e._aspectRatio,this._farClip=e._farClip,this._fov=e._fov,this._horizontalFov=e._horizontalFov,this._nearClip=e._nearClip,this._xrProperties.aspectRatio=e._xrProperties.aspectRatio,this._xrProperties.farClip=e._xrProperties.farClip,this._xrProperties.fov=e._xrProperties.fov,this._xrProperties.horizontalFov=e._xrProperties.horizontalFov,this._xrProperties.nearClip=e._xrProperties.nearClip,this.aspectRatioMode=e.aspectRatioMode,this.calculateProjection=e.calculateProjection,this.calculateTransform=e.calculateTransform,this.clearColor=e.clearColor,this.clearColorBuffer=e.clearColorBuffer,this.clearDepth=e.clearDepth,this.clearDepthBuffer=e.clearDepthBuffer,this.clearStencil=e.clearStencil,this.clearStencilBuffer=e.clearStencilBuffer,this.cullFaces=e.cullFaces,this.flipFaces=e.flipFaces,this.frustumCulling=e.frustumCulling,this.layers=e.layers,this.orthoHeight=e.orthoHeight,this.projection=e.projection,this.projectionOffset=e.projectionOffset,this.rect=e.rect,this.renderTarget=e.renderTarget,this.scissorRect=e.scissorRect,this.aperture=e.aperture,this.shutter=e.shutter,this.sensitivity=e.sensitivity,this.shaderPassInfo=e.shaderPassInfo,this.jitter=e.jitter,this._projMatDirty=!0,this}_enableRenderPassColorGrab(e,t){t?this.renderPassColorGrab||(this.renderPassColorGrab=new Ps(e)):(this.renderPassColorGrab?.destroy(),this.renderPassColorGrab=null)}_enableRenderPassDepthGrab(e,t,n){n?this.renderPassDepthGrab||(this.renderPassDepthGrab=new Is(e,this)):(this.renderPassDepthGrab?.destroy(),this.renderPassDepthGrab=null)}_updateViewProjMat(){(this._projMatDirty||this._viewMatDirty||this._viewProjMatDirty)&&(this._viewProjMat.mul2(this.projectionMatrix,this.viewMatrix),this._viewProjMatDirty=!1)}updateViewTransforms(){let e=this.xrViews;if(!e)return;let t=this._node?.parent?.getWorldTransform()??null;for(let n=0;n<e.length;n++)e[n].updateTransforms(t)}updateXrFrustum(){let e=this.xrViews;if(!e?.length)return!1;Hs.mul2(e[0].projMat,e[0].viewOffMat),this.frustum.setFromMat4(Hs);for(let t=1;t<e.length;t++)Hs.mul2(e[t].projMat,e[t].viewOffMat),Us.setFromMat4(Hs),this.frustum.add(Us);return!0}updateFrustum(){if(this.updateXrFrustum())return;let e=this.projectionMatrix;if(this.calculateProjection&&this.calculateProjection(e,0),this.calculateTransform)this.calculateTransform(Ws,0);else{let e=this._node.getPosition(),t=this._node.getRotation();Ws.setTRS(e,t,k.ONE)}Gs.copy(Ws).invert(),Ks.mul2(e,Gs),this.frustum.setFromMat4(Ks)}worldToScreen(e,t,n,r=new k){this._updateViewProjMat(),this._viewProjMat.transformPoint(e,r);let i=this._viewProjMat.data,a=e.x*i[3]+e.y*i[7]+e.z*i[11]+1*i[15];r.x=(r.x/a+1)*.5,r.y=(1-r.y/a)*.5;let{x:o,y:s,z:c,w:l}=this._rect;return r.x=r.x*c*t+o*t,r.y=r.y*l*n+(1-s-l)*n,r}screenToWorld(e,t,n,r,i,a=new k){let{x:o,y:s,z:c,w:l}=this._rect,u=this.farClip-this.nearClip;if(Rs.set((e-o*r)/(c*r),1-(t-(1-s-l)*i)/(l*i),n/u),Rs.mulScalar(2),Rs.sub(k.ONE),this._projection===0){M._getPerspectiveHalfSize(zs,this.fov,this.aspectRatio,this.nearClip,this.horizontalFov);let e=this.xrActive?A.ZERO:this._projectionOffset;zs.x*=Rs.x+e.x,zs.y*=Rs.y+e.y;let t=this._node.getWorldTransform();zs.z=-this.nearClip,t.transformPoint(zs,Bs);let r=this._node.getPosition();a.sub2(Bs,r),a.normalize(),a.mulScalar(n),a.add(r)}else this._updateViewProjMat(),Vs.copy(this._viewProjMat).invert(),Vs.transformPoint(Rs,a);return a}_evaluateProjectionMatrix(){let e=this.aspectRatio;if(this._projMatDirty){let t=this._projectionOffset;if(this._projection===0)this._projMat.setPerspective(this.fov,e,this.nearClip,this.farClip,this.horizontalFov),this._projMat.data[8]=t.x,this._projMat.data[9]=t.y,this._projMatSkybox.copy(this._projMat);else{let n=this._orthoHeight,r=n*e;this._projMat.setOrtho(-r,r,-n,n,this.nearClip,this.farClip),this._projMat.data[12]=-t.x,this._projMat.data[13]=-t.y,this._projMatSkybox.setPerspective(this.fov,e,this.nearClip,this.farClip),this._projMatSkybox.data[8]=t.x,this._projMatSkybox.data[9]=t.y}this._projMatDirty=!1}}getProjectionMatrixSkybox(){return this._evaluateProjectionMatrix(),this._projMatSkybox}getExposure(){return 1/(2**Math.log2(this._aperture*this._aperture/this._shutter*100/this._sensitivity)*1.2)}getScreenSize(e){if(this._projection===0){let t=this._node.getPosition().distance(e.center);if(t<e.radius)return 1;let n=Math.asin(e.radius/t),r=Math.tan(n),i=Math.tan(this.fov/2*E.DEG_TO_RAD);return Math.min(r/i,1)}return E.clamp(e.radius/this._orthoHeight,0,1)}getFrustumCorners(e=this.nearClip,t=this.farClip){let n=this.fov*E.DEG_TO_RAD,r=this.xrActive?A.ZERO:this._projectionOffset,i,a;this.projection===0?this.horizontalFov?(i=e*Math.tan(n/2),a=i/this.aspectRatio):(a=e*Math.tan(n/2),i=a*this.aspectRatio):(a=this._orthoHeight,i=a*this.aspectRatio);let o=r.x*i,s=r.y*a,c=qs;return c[0].x=o+i,c[0].y=s-a,c[0].z=-e,c[1].x=o+i,c[1].y=s+a,c[1].z=-e,c[2].x=o-i,c[2].y=s+a,c[2].z=-e,c[3].x=o-i,c[3].y=s-a,c[3].z=-e,this._projection===0&&(this.horizontalFov?(i=t*Math.tan(n/2),a=i/this.aspectRatio):(a=t*Math.tan(n/2),i=a*this.aspectRatio),o=r.x*i,s=r.y*a),c[4].x=o+i,c[4].y=s-a,c[4].z=-t,c[5].x=o+i,c[5].y=s+a,c[5].z=-t,c[6].x=o-i,c[6].y=s+a,c[6].z=-t,c[7].x=o-i,c[7].y=s-a,c[7].z=-t,c}setXrProperties(e){Object.assign(this._xrProperties,e),this._projMatDirty=!0}fillShaderParams(e){let t=this._farClip;return e[0]=1/t,e[1]=t,e[2]=this._nearClip,e[3]=+(this._projection===1),e}};v(Js,`_flipYProjectionMatrix`,new M().setScale(1,-1,1)),v(Js,`_webGpuDepthRangeMatrix`,new M().set([1,0,0,0,0,1,0,0,0,0,.5,0,0,0,.5,1])),v(Js,`_applyShaderProjectionScratch`,new M);var Ys=new M,Xs=new M,Zs=new M,Qs=class e{static create(t,n,r,i){let a=new Js(t);switch(a.node=new ys(n),a.aspectRatio=1,a.aspectRatioMode=1,a._scissorRectClear=!0,r){case 1:a.node.setRotation(e.pointLightRotations[i]),a.fov=90,a.projection=0;break;case 2:a.projection=0;break;case 0:a.projection=1}return a}static evalSpotCookieMatrix(t){let n=e._spotCookieCamera;n||(n=e.create(t.device,`SpotCookieCamera`,2),e._spotCookieCamera=n),n.fov=t._outerConeAngle*2;let r=n._node;r.setPosition(t._node.getPosition()),r.setRotation(t._node.getRotation()),r.rotateLocal(-90,0,0),Ys.setTRS(r.getPosition(),r.getRotation(),k.ONE).invert(),Xs.mul2(n.projectionMatrix,Ys);let i=t.cookieMatrix,a=t.atlasViewport;return Zs.setViewport(a.x,a.y,a.z,a.w),i.mul2(Zs,Xs),i}};v(Qs,`pointLightRotations`,[new N().setFromEulerAngles(0,90,180),new N().setFromEulerAngles(0,-90,180),new N().setFromEulerAngles(90,0,0),new N().setFromEulerAngles(-90,0,0),new N().setFromEulerAngles(0,180,180),new N().setFromEulerAngles(0,0,180)]),v(Qs,`_spotCookieCamera`,null);var $s=new k,ec=new Float32Array(6),tc=new k(-.5,0,0),nc=new k(0,0,.5),B={POSITION_RANGE:0,DIRECTION_FLAGS:1,COLOR_ANGLES_BIAS:2,PROJ_MAT_0:3,ATLAS_VIEWPORT:3,PROJ_MAT_1:4,PROJ_MAT_2:5,PROJ_MAT_3:6,AREA_DATA_WIDTH:7,AREA_DATA_HEIGHT:8,COUNT:9},rc={LIGHTSHAPE_PUNCTUAL:`0u`,LIGHTSHAPE_RECT:`1u`,LIGHTSHAPE_DISK:`2u`,LIGHTSHAPE_SPHERE:`3u`,LIGHT_COLOR_DIVIDER:`100.0`},ic=(e,t)=>Object.keys(e).map(n=>`#define {${t}${n}} ${e[n]}`).join(`
`),ac=`

		${ic(B,`CLUSTER_TEXTURE_`)}
		${ic(rc,``)}
`,oc=class{constructor(e){v(this,`areaLightsEnabled`,!1),v(this,`lightsTexture`,null),v(this,`_maxLights`,0),this.device=e,Io.get(e,Lt).set(`lightBufferDefinesPS`,ac),Io.get(e,Rt).set(`lightBufferDefinesPS`,ac),this.cookiesEnabled=!1,this.shadowsEnabled=!1,this.areaLightsEnabled=!1,this._lightsTextureId=this.device.scope.resolve(`lightsTexture`),this.maxLights=256,this.invMaxColorValue=0,this.invMaxAttenuation=0,this.boundsMin=new k,this.boundsDelta=new k}set maxLights(e){if(this._maxLights!==e){this._maxLights=e;let t=B.COUNT;this.lightsFloat=new Float32Array(4*t*e),this.lightsUint=new Uint32Array(this.lightsFloat.buffer),this.lightsTexture?.destroy(),this.lightsTexture=this.createTexture(this.device,t,e,14,`LightsTexture`)}}get maxLights(){return this._maxLights}destroy(){this.lightsTexture?.destroy(),this.lightsTexture=null}createTexture(e,t,n,r,i){return new dn(e,{name:i,width:t,height:n,mipmaps:!1,format:r,addressU:1,addressV:1,type:Dt,magFilter:0,minFilter:0,anisotropy:1})}setBounds(e,t){this.boundsMin.copy(e),this.boundsDelta.copy(t)}uploadTextures(){this.lightsTexture.lock().set(this.lightsFloat),this.lightsTexture.unlock()}updateUniforms(){this._lightsTextureId.setValue(this.lightsTexture)}getSpotDirection(e,t){t._node.getWorldTransform().getY(e).mulScalar(-1),e.normalize()}getLightAreaSizes(e){let t=e._node.getWorldTransform();return t.transformVector(tc,$s),ec[0]=$s.x,ec[1]=$s.y,ec[2]=$s.z,t.transformVector(nc,$s),ec[3]=$s.x,ec[4]=$s.y,ec[5]=$s.z,ec}addLightData(e,t){let n=e._type===2,r=e.atlasViewportAllocated,i=this.cookiesEnabled&&!!e._cookie&&r,a=this.areaLightsEnabled&&e.shape!==0,o=this.shadowsEnabled&&e.castShadows&&r,s=e._node.getPosition(),c=null,l=null;n?o?c=e.getRenderData(null,0).shadowMatrix:i&&(c=Qs.evalSpotCookieMatrix(e)):(o||i)&&(l=e.atlasViewport);let u=this.lightsFloat,d=this.lightsUint,f=t*this.lightsTexture.width*4;u[f+4*B.POSITION_RANGE+0]=s.x,u[f+4*B.POSITION_RANGE+1]=s.y,u[f+4*B.POSITION_RANGE+2]=s.z,u[f+4*B.POSITION_RANGE+3]=e.attenuationEnd;let p=e.clusteredData;if(d[f+4*B.COLOR_ANGLES_BIAS+0]=p[0],d[f+4*B.COLOR_ANGLES_BIAS+1]=p[1],d[f+4*B.COLOR_ANGLES_BIAS+2]=p[2],e.castShadows){let t=e.getRenderData(null,0),n=e._getUniformBiasValues(t),r=ne.float2Half(n.bias),i=ne.float2Half(n.normalBias);d[f+4*B.COLOR_ANGLES_BIAS+3]=r|i<<16}if(n&&(this.getSpotDirection($s,e),u[f+4*B.DIRECTION_FLAGS+0]=$s.x,u[f+4*B.DIRECTION_FLAGS+1]=$s.y,u[f+4*B.DIRECTION_FLAGS+2]=$s.z),d[f+4*B.DIRECTION_FLAGS+3]=e.getClusteredFlags(o,i),c){let e=c.data;for(let t=0;t<16;t++)u[f+4*B.PROJ_MAT_0+t]=e[t]}if(l&&(u[f+4*B.ATLAS_VIEWPORT+0]=l.x,u[f+4*B.ATLAS_VIEWPORT+1]=l.y,u[f+4*B.ATLAS_VIEWPORT+2]=l.z/3),a){let t=this.getLightAreaSizes(e);u[f+4*B.AREA_DATA_WIDTH+0]=t[0],u[f+4*B.AREA_DATA_WIDTH+1]=t[1],u[f+4*B.AREA_DATA_WIDTH+2]=t[2],u[f+4*B.AREA_DATA_HEIGHT+0]=t[3],u[f+4*B.AREA_DATA_HEIGHT+1]=t[4],u[f+4*B.AREA_DATA_HEIGHT+2]=t[5]}}},sc=new A,cc=new k,lc=new k,uc=new k,dc=new be,fc=class{constructor(){this.light=null,this.min=new k,this.max=new k}},pc=class{constructor(e){v(this,`clusterTexture`,void 0),this.device=e,this.name=`Untitled`,this.reportCount=0,this.boundsMin=new k,this.boundsMax=new k,this.boundsDelta=new k,this._cells=new k(1,1,1),this._cellsLimit=new k,this.cells=this._cells,this.maxCellLightCount=4,this._usedLights=[],this._usedLights.push(new fc),this.lightsBuffer=new oc(e),this.registerUniforms(e)}get usedLights(){return this._usedLights}set maxCellLightCount(e){e!==this._maxCellLightCount&&(this._maxCellLightCount=e,this._cellsDirty=!0)}get maxCellLightCount(){return this._maxCellLightCount}set maxLights(e){e!==this.maxLights&&(this.lightsBuffer.maxLights=e+1,this._cellsDirty=!0)}get maxLights(){return this.lightsBuffer.maxLights-1}set cells(e){cc.copy(e).floor(),this._cells.equals(cc)||(this._cells.copy(cc),this._cellsLimit.copy(cc).sub(k.ONE),this._cellsDirty=!0)}get cells(){return this._cells}destroy(){this.lightsBuffer.destroy(),this.releaseClusterTexture()}releaseClusterTexture(){this.clusterTexture&&(this.clusterTexture.destroy(),this.clusterTexture=null)}registerUniforms(e){this._numClusteredLightsId=e.scope.resolve(`numClusteredLights`),this._clusterMaxCellsId=e.scope.resolve(`clusterMaxCells`),this._clusterWorldTextureId=e.scope.resolve(`clusterWorldTexture`),this._clusterBoundsMinId=e.scope.resolve(`clusterBoundsMin`),this._clusterBoundsMinData=new Float32Array(3),this._clusterBoundsDeltaId=e.scope.resolve(`clusterBoundsDelta`),this._clusterBoundsDeltaData=new Float32Array(3),this._clusterCellsCountByBoundsSizeId=e.scope.resolve(`clusterCellsCountByBoundsSize`),this._clusterCellsCountByBoundsSizeData=new Float32Array(3),this._clusterCellsDotId=e.scope.resolve(`clusterCellsDot`),this._clusterCellsDotData=new Int32Array(3),this._clusterCellsMaxId=e.scope.resolve(`clusterCellsMax`),this._clusterCellsMaxData=new Int32Array(3),this._clusterTextureWidthId=e.scope.resolve(`clusterTextureWidth`)}updateParams(e){e&&(this.cells=e.cells,this.maxCellLightCount=e.maxLightsPerCell,this.maxLights=e.maxLights,this.lightsBuffer.cookiesEnabled=e.cookiesEnabled,this.lightsBuffer.shadowsEnabled=e.shadowsEnabled,this.lightsBuffer.areaLightsEnabled=e.areaLightsEnabled)}updateCells(){if(this._cellsDirty){this._cellsDirty=!1;let e=this._cells.x,t=this._cells.y,n=this._cells.z,r=e*t*n,i=this.maxCellLightCount*r,{x:a,y:o}=on.calcTextureSize(i,sc,this.maxCellLightCount);this._clusterCellsMaxData[0]=e,this._clusterCellsMaxData[1]=t,this._clusterCellsMaxData[2]=n,this._clusterCellsDotData[0]=this.maxCellLightCount,this._clusterCellsDotData[1]=e*n*this.maxCellLightCount,this._clusterCellsDotData[2]=e*this.maxCellLightCount;let s=this.maxLights>255;this.clusters=s?new Uint16Array(i):new Uint8ClampedArray(i),this.counts=new Int32Array(r),this.releaseClusterTexture(),this.clusterTexture=this.lightsBuffer.createTexture(this.device,a,o,s?35:33,`ClusterTexture`)}}uploadTextures(){this.clusterTexture.lock().set(this.clusters),this.clusterTexture.unlock(),this.lightsBuffer.uploadTextures()}updateUniforms(){this._numClusteredLightsId.setValue(this._usedLights.length),this.lightsBuffer.updateUniforms(),this._clusterWorldTextureId.setValue(this.clusterTexture),this._clusterMaxCellsId.setValue(this.maxCellLightCount);let e=this.boundsDelta;this._clusterCellsCountByBoundsSizeData[0]=this._cells.x/e.x,this._clusterCellsCountByBoundsSizeData[1]=this._cells.y/e.y,this._clusterCellsCountByBoundsSizeData[2]=this._cells.z/e.z,this._clusterCellsCountByBoundsSizeId.setValue(this._clusterCellsCountByBoundsSizeData),this._clusterBoundsMinData[0]=this.boundsMin.x,this._clusterBoundsMinData[1]=this.boundsMin.y,this._clusterBoundsMinData[2]=this.boundsMin.z,this._clusterBoundsDeltaData[0]=e.x,this._clusterBoundsDeltaData[1]=e.y,this._clusterBoundsDeltaData[2]=e.z,this._clusterBoundsMinId.setValue(this._clusterBoundsMinData),this._clusterBoundsDeltaId.setValue(this._clusterBoundsDeltaData),this._clusterCellsDotId.setValue(this._clusterCellsDotData),this._clusterCellsMaxId.setValue(this._clusterCellsMaxData),this._clusterTextureWidthId.setValue(this.clusterTexture.width)}evalLightCellMinMax(e,t,n){t.copy(e.min),t.sub(this.boundsMin),t.div(this.boundsDelta),t.mul2(t,this.cells),t.floor(),n.copy(e.max),n.sub(this.boundsMin),n.div(this.boundsDelta),n.mul2(n,this.cells),n.ceil(),t.max(k.ZERO),n.min(this._cellsLimit)}collectLights(e){let t=this.lightsBuffer.maxLights,n=this._usedLights,r=1;e.forEach(e=>{let i=!!(e.mask&3),a=e.type===2&&e._outerConeAngle===0;if(e.enabled&&e.type!==0&&e.visibleThisFrame&&e.intensity>0&&i&&!a&&r<t){let t;r<n.length?t=n[r]:(t=new fc,n.push(t)),t.light=e,e.getBoundingBox(dc),t.min.copy(dc.getMin()),t.max.copy(dc.getMax()),r++}}),n.length=r}evaluateBounds(){let e=this._usedLights,t=this.boundsMin,n=this.boundsMax;if(e.length>1){t.copy(e[1].min),n.copy(e[1].max);for(let r=2;r<e.length;r++)t.min(e[r].min),n.max(e[r].max)}else t.set(0,0,0),n.set(1,1,1);this.boundsDelta.sub2(n,t),this.lightsBuffer.setBounds(t,this.boundsDelta)}updateClusters(e){this.counts.fill(0),this.clusters.fill(0),this.lightsBuffer.areaLightsEnabled=e?e.areaLightsEnabled:!1;let t=this._cells.x,n=this._cells.z,r=this.counts,i=this._maxCellLightCount,a=this.clusters,o=this.maxCellLightCount,s=this._usedLights;for(let e=1;e<s.length;e++){let c=s[e],l=c.light;this.lightsBuffer.addLightData(l,e),this.evalLightCellMinMax(c,lc,uc);let u=lc.x,d=uc.x,f=lc.y,p=uc.y,m=lc.z,h=uc.z;for(let s=u;s<=d;s++)for(let c=m;c<=h;c++)for(let l=f;l<=p;l++){let u=s+t*(c+l*n),d=r[u];d<i&&(a[o*u+d]=e,r[u]=d+1)}}}update(e,t=null){this.updateParams(t),this.updateCells(),this.collectLights(e),this.evaluateBounds(),this.updateClusters(t),this.uploadTextures()}activate(){this.updateUniforms()}},mc=`muPIHORMLNDCz4DxVR/ZvYfAUVEFR47KRIC4nwAAAAAP7WxlhD6Ci+2HCe7BF8jRAPZwdH2UPpI5PdLCJdkvG4UTaNDJ/0crAzne71GCrb4kbdMjjCEGzdX6fNxDMLJq5xkeoIVTdfiZkodEeArmZmp/FQzFjD4x8iOW7Dg64n+3mWqyEwLxXT8zoJXfbw8QJKDCaarUYyTlMzNFHbgUe9IQV7g4YOgtSKpIFZJ0qERm7u4PpmiF89ktHWCywaGmD6h+hfh2/Zd8KYlKqqo4Cem4T42bT/Z9FpCQF1hhSjfBzZ5XFn/y3jegWC6u86KuELRundQS/1Rp+XuKKGIgRv3CvP5y749yqLlFO495JOT3+f2CXgd71npU0/KjjpkZucbJ5m78IVyuSrSozc9jgBUhDrz0hFsyb7LFUH9//wJbBgLdNWJZObfKxrNt8TliLA9w9sXFv6g26iXpf6r/BqcAusj/QzGBZuoUGeEtw8BCXCZ3jUiw4hvM18ZVqlUD3C40LAFXW6FRjuAZGRNstb0/qVk4skwyT+MHrvRorI4rKHVMWZmKyAkzL/78u/9pMQuX14pZN50b2PHn6fRxeaCQLsfT4dpvIkWWFuFVENZIh+8xgR6lU+85W0PPdAu1j99kcCG40JBQa4JMyRzq6qriOBLtqF87vpCJan0WEduVr/mOYkS00urVA0mA6M3031+GmGmW48PaJDYOEIb3bIXWPaLoAOEinX1TN3+/vwhG6nqJu0TdHpedS7QsGZIoxH3nQYYjQP1jmbahlbNngw5ogsGk1y50XZyUmQBY+/JBJ3Unu4dApm+WmPwHPU9gLb+4mHh4BiY6M86pq+WeTyWdI3s0CXPEtHGXZ8zMZgUoyRomBi1VdazzuN+WOmQ9Pa0Z0tlNopUi8AJ4x2Xn4mmOKEbXLxlbVsWu8XhuDGYFOGCRVdSqDPXrHU5SDdUlti3k5///SBwzTMwK3L4a1H7w4lnpEas6////AfX8asyIBfeFXVJ3tgvxQ/blZuUKyIODIfr/UzdWNu7pciLBpdZRZ4pIfZ1R6szq+XNxkGG///8EZFpu7VHAhFWqHEOrB9unw+YQa5o8/9IR/V5/zq+986rJSyfgJKt2u9hxU1wzyQWPjJGvzG9+eWWxGFOHVKqI4jBQALwZZswesnvZ2UmmkEXdiRpz8B+oWE7PY70ZTMndisYSXg2TqoI+3y9BxbnY2Y4EfbdcRhAvG59NqDENNYbxKvK5HJfPG5M+Wi2AcpLVJrD6caiEOzgSoVNSgQK8fm2M3zGcF4xtClv/8Hs9oD7C3jitTATYNQxmKqKf1LhIxzf1bmfiNn7UKFmcJu4sLqVLwxGSue3taBEyknkw5hXTsUCvqmmL/f8n/w0giR7Hu/9EHvpkz3yuu64TioMkzdTJ30i0+hFnQqW1+v9mMwq+z9qGX0UFu9MomvVG2xod6vc12AAAAACq7sGa5qptFR0jF3nQt/D+7PibKYahaxP3hEixPbGi9nwNf2LAa7LkEZRKxzXeCD64Xpii5n+8Kpg8eHIv7AWXZltgMoGltmoJ0XGdOCL8WkzphvR9N2o3ARSZ42l5e5Pe4B58MCRlP3EKv+mcloknH+fto5BWsmEutW6KvjOVsznFCktkSczVk4aGvj9VXlRcLeDoKG8RkBgdcNG2bf8HUL4MT2DM+ar7NImJhKpxakX4Vk0CnP+/XNhl5UsP0lXgeZXPoDBMSW5An+DXlTCO5FQGwSPYwHLKYVIimEdAoVe49rQLaaNcye5LxU2/c5TijTgJtD5eQQIe1snxauj5jZsxJBUJdoP/zqpjqv8qBruoPsVsP8N44PCUW5Dd0DzqjSS/Dl5mI9cn1w2ndN/0KAEm1QAAAACwu6KM/083IBbH5bPa/9oHUwcU8I9v3j6/v18QYammrf+P6VL///8BrpuM3fOLCxaLNOFNF1zPbPYTP65ni6njft4eVcyrVXRQFrs52tr35StiSp55edVDCBC0H5rIfac6nzUwxQSt7y15QoKb+5zebEQUmVbrPjXuUa19Ey7sqXMiSUKHaw72PJKDdrutJoQr3u6lEYJ8K0MakWKj9zjTFi4X94TsKYco0GrLeB60M6D8M/80rhXUW8iMequg8y5F838WI0+gp3GBN5Kj/xIOxTWQuUaPV/LwvARr1VH93BFgGZR1MFW0Ua30GbYmdnAgo9VWy8SQtpDUgGE2r2zq2eTEMCL7sMKmE1hchVhuF/TCq9iXKEm86kzOf3Rp9ZnCxbpDUj+FKNxVyXe6pVZkRXv/m95SnB/EB8aME29N85MtAcDoXWlor8De2Q5Dg1tar+8wgiZufbMam81j//ASUohoR/zSh2KG4bvT6mkIPz6C5/98DC3LaWlaEZ1zA5JORZRu6J/a0GY285sEYzw71YqOT1ihAG0z5SDt1xNiDQWZdFpndArp6xWhqSDkRb4kSJEHb9liPvw7uLV/6i5MVf//A9Qjr8xkAEUh+KDI+zdtJ68d6MBOktg1iyp/SCq8O9f5pbamn1VVVQPRTWqNBvhQKa07s6P0lc9Luu/3gw4HeyOUfz8MxMwV4UQhua+t9cr4bz/nIB2wnDSK1K7I94M+s6C84htaX/CNlMQUSs2KJO+yaebfTbkNX5yWcqEJevo0vbKUiETuFXiL019A3E+lmsyZMwXrXLLiQAZ5t9+jI3JobhJTMiDH5ZOQ+8Jau5555NMjHSscP9qCVaa40doh+1a3Ukf6jqBmLddgh79/fwTfCyqiuldNkUoy+nUp+4nerwg0OjtGv2x485PJOJvUEokNhYIdWjpx7BWk0VZGWOp3jSFTJ2bnu6KCduZtG/UcBC9RZ3W/jMSfSMw4Etr/DoD/XYP2V5Ovw+YoM3F5g2dGLdvuG6ZkVGLE6Dk5Zr+sdSyGliJP1y2OFf/KFO0RWO+3gsGhesTnfZVpTd8/HwgO216gwaqo+vY3TljfJWowY+i0p0Os4SLn/1wLqDHMlszggmT/D8MRFzs+pLv6LNJSsNZ/r41mWi/rF6ZcKp/yzJdK0VU44hskq3RGpgO6mIpJDsf/mZkFrz0yYOMLbuaj/wp1v7JMFM5eqvBhmTd7U8frQAtHtys4zgpjZmzUhOVTfNNLifElGXADlqHGKrkBT/nYwX8ZRm3RjvyPvjKyEqEGKUpVnvOGx+NKPHiWM//ZDpDVGvvrjmk8RPF/wiYZD3+Us8YCXjrVOfjdd1UPAfjLp8jgSn4me7DPTpz1Ggy9XL80guFO7ECT10AvILKfD18Qx+KY/f8aRqu0oOO8hfKRFZa9PUJwCsp6VdZz6LFkm2b9Pl2LIifCwzRy7TpdG2uAtOxP2OemY26bJMa9ZGSLIRlMsgpDpnDJwd0oa5pQ13x1hrHf52HpulUWonGWsfXZbSQYKu9bnEN76ciQih0opN3deDVrbrxorfVlnCmL1R9zq3ePGWIv21c7pW8kEiFTM5JX8dAw867s/60cf79/BH+MDFCZBHlz1L+qGOJf/1txhhmrf3//As+RIJwevDb+fgNXVeHw67QptZegayhrEwr5Gy+EPo1RLaMtPbqOZYoVzXzwzjMFWZxyUG9YUIf6////AQWy84iAygLk9COtXt92+0mT/xg0zMzMBeLkb8y9SL2TDXgSX422hDgpGNLJyuPioA+YJ91G8znrpNqHkwYyscaJDEc9Vc+j4cXle3hvcd2JqDQH2lBZxDn6mUTs0b75raMvbs727codX01Anj8f3wir9P2xQaQ22v/TxCMglKDFoTjaP01XTLgxnTvPv02JgEUrW6UDgOnobFpLdvKdlypgIzPcq14fgXU5tvVW0FEs7VRlsG1IyA69fN4n+awHhT34cE+xUvdj86C8LgAsFheTjI9Ht9EyYAAAAAAVBVKRx2wLgUTI0/2QfyJo2riRw3JDqzEShmx/Lifo6mRkQVbS7X53t+EvKxcXogtdts31e9MRHdcHgsA8rt4/mt2unlzQ/wsU8Gu7+W6Oj7eD8EQdDp5XlCsVaS/AV/t5ZpPOHR3rGpyAJe9IPV+xMrBL1Oz/8MQhFs31h0N1cVnq371uqIJYHyafKH1jteAK3VpMXBcuC+yt0ZeKyRUY4QhdrJJ4tJ1wg3Hu6kDsbovxupTMkGdRrm8oZSoYPbJ+PwH/xotgTdkA1205vUEfnqkI04T/fnnd1fiZW5AwNcggd7fi4j5zasmcntZexIxqFZQMzMJpfndmI5jn17cgn5EV5t9XN0C///8Q9wlJpMGXdoiaMTG2sVyHQsn8mWRISCLNG777S0OuDRP2GlLcJ2UeOg7Fo8hTNPeJ//iTJhyqxhKRUntdXOihq2wfKfH///8B0GGrwT+fSOQRdctKxjjGCSS11d6BlQ9BDfE0J6Z25FaNTKGpFKNCMr2G/041KpWwBLVe1k08vncseQbKZdXi8x1t9XA45U/Wd43D9wAh3Tal0aiLVzGPusOZ1F+W3TWoqlX/A95+dNef11TsuGful+ctGssldk3fqpfqh+43XTxL42+leSHoF/dWHYGX6maqUEuLX7UB+r/6Llr4LKocbVIeu+hB9QTPfz9fCP8RyWmX4SmbhMFsNtCijV7lVcwejLKlvl0GfCndnWV7/39VBrtTRuUx92oke3GBgKkC5fdGK0YvNK+xenKaDmsHDjNFUM3NMz3ZiXXFuLgojosPVCDEl2W5BjX3Ms+j0GSqACHmh0+RPWyuNm/Qe8vFf9AW7N1uRaxWirrUytqEJnJ4/Flm8hSoiZ2NQBsS6w/yQlC4gCaFo8q4nyY6AFdo4hiwhBXzbNKKvZvktCjSCukRR/BbYVbNwZi2Yh3hGodEacLW8qijiWJODf0P2bhfaiPspPT4lYJBgi/KfcFwCfvyUIgkJOv///8CG/JEepRBLaMFE+2TgrqsJXOVOWHt6g/bFwVLLMVBsMR50dis/39/AlBX+/rMTJkUQrnlxpR2iu0Tp8tATkRYGmDIrcAiRP8PjoWIlb7/0ecTdSCE9Y58+a+n/FovJQTVF4F2jAxMZhTgrM/KVS5BQu6bVbkWY5HXnxRshks3urDdW4RkWp4M4TeLmFK5KF/uHkkiO5Kv96RioH984v/CSDBnG+BwlnU9B+o7Y+0X0Nob+0pLsStxjvPXMy2eCpzhOWV4XbObBHN4UE2sLQ/DIqXhOzxVf38GlTi6aG7EnePO7TRJm9yOfUUcqq1I2iQHrVDqn3TUNRi/lMw8KbMW/3/nqCz/Ef8PoW5Qxcz2yHR/f78EPB2Stbd+ZFmfNTUYILzsb9YNhpaHcaymYrBiNHmFE3Y4ccYJ25Prqm7zHobGHED8/93ZNlWro9vcKivGZs31UiK1k5zjUhexUgbqJb+fUTjxce/7Zly8a5KMC1fX5nfjPgibdvzbXV1jRT2asXvmSAusaLdq1TSIJ8fXINk5AtT34EWPAsfP9IFQqM5K11O6saoHJA==`,hc=null,gc=()=>{if(!hc){let e=atob(mc);hc=Uint8Array.from(e,e=>e.charCodeAt(0))}},_c=()=>(gc(),hc),vc=class{constructor(e=0){v(this,`seed`,0),this.seed=e*4,gc()}_next(){this.seed=(this.seed+4)%hc.length}value(){return this._next(),hc[this.seed]/255}vec4(e=new j){return this._next(),e.set(hc[this.seed],hc[this.seed+1],hc[this.seed+2],hc[this.seed+3]).mulScalar(1/255)}},yc=[new k(-1,0,0),new k(1,0,0),new k(0,-1,0),new k(0,1,0),new k(0,0,-1),new k(0,0,1)],bc=class{constructor(){v(this,`colors`,new Float32Array(18))}update(e,t){let n=this.colors,{r,g:i,b:a}=e;for(let e=0;e<6;e++)n[e*3]=r,n[e*3+1]=i,n[e*3+2]=a;for(let e=0;e<t.length;e++){let r=t[e];if(r._type===0)for(let e=0;e<6;e++){let t=Math.max(yc[e].dot(r._direction),0)*r._intensity,i=r._color;n[e*3]+=i.r*t,n[e*3+1]+=i.g*t,n[e*3+2]+=i.b*t}}}},xc=(e,t,n,r)=>{let i=new dn(e,{name:`${t}${n}`,width:n,height:n,format:7,addressU:0,addressV:0,type:Dt,magFilter:0,minFilter:0,anisotropy:1,mipmaps:!1});return i.lock().set(r),i.unlock(),i},Sc=new an,Cc=e=>Sc.get(e,()=>{let t=_c();return xc(e,`BlueNoise`,Math.sqrt(t.length/4),t)}),wc=class e{constructor(e,t){this.texture=e,this.cached=!1,this.renderTargets=t}destroy(){this.texture&&(this.texture.destroy(),this.texture=null);let e=this.renderTargets;for(let t=0;t<e.length;t++)e[t].destroy();this.renderTargets.length=0}static create(e,t){let n=null;return n=t._type===1?this.createCubemap(e,t._shadowResolution,t._shadowType):this.create2dMap(e,t._shadowResolution,t._shadowType),n}static createAtlas(e,t,n){let r=this.create2dMap(e,t,n),i=r.renderTargets,a=i[0];for(let e=0;e<5;e++)i.push(a);return r}static create2dMap(t,n,r){let i=Pa.get(r),a=i.format;a===15&&!t.textureFloatRenderable&&t.textureHalfFloatRenderable&&(a=50);let o=Fe.get(a)?.name,s=1;r===3&&(s=+!!t.textureFloatFilterable),r===6&&(s=0);let c=new dn(t,{format:a,width:n,height:n,mipmaps:!1,minFilter:s,magFilter:s,addressU:1,addressV:1,name:`ShadowMap2D_${o}`}),l=null;return i?.pcf?(c.compareOnRead=!0,c.compareFunc=1,l=new gr({depthBuffer:c,origin:Me})):l=new gr({colorBuffer:c,depth:!0,origin:Me}),new e(c,[l])}static createCubemap(t,n,r){let i=Pa.get(r),a=Fe.get(i.format)?.name,o=r===6,s=+!o,c=new dn(t,{format:i?.format,width:n,height:n,cubemap:!0,mipmaps:!1,minFilter:s,magFilter:s,addressU:1,addressV:1,name:`ShadowMapCube_${a}`});o||(c.compareOnRead=!0,c.compareFunc=1);let l=[];for(let e=0;e<6;e++)o?l.push(new gr({colorBuffer:c,face:e,depth:!0})):l.push(new gr({depthBuffer:c,face:e}));return new e(c,l)}},Tc=[],Ec=[],Dc=new j,Oc=new j,kc=class{constructor(e){this.size=Math.floor(e.w*1024),this.used=!1,this.lightId=-1,this.rect=e}},Ac=class{constructor(e){this.device=e,this.version=1,this.shadowAtlasResolution=2048,this.shadowAtlas=null,this.shadowEdgePixels=3,this.cookieAtlasResolution=4,this.cookieAtlas=dn.createDataTexture2D(this.device,`CookieAtlas`,this.cookieAtlasResolution,this.cookieAtlasResolution,20),this.cookieRenderTarget=new gr({colorBuffer:this.cookieAtlas,depth:!1,origin:Me}),this.slots=[],this.atlasSplit=[],this.cubeSlotsOffsets=[new A(0,0),new A(0,1),new A(1,0),new A(1,1),new A(2,0),new A(2,1)],this.scissorVec=new j,this.allocateShadowAtlas(1),this.allocateCookieAtlas(1),this.allocateUniforms()}destroy(){this.destroyShadowAtlas(),this.destroyCookieAtlas()}destroyShadowAtlas(){this.shadowAtlas?.destroy(),this.shadowAtlas=null}destroyCookieAtlas(){this.cookieAtlas?.destroy(),this.cookieAtlas=null,this.cookieRenderTarget?.destroy(),this.cookieRenderTarget=null}allocateShadowAtlas(e,t=0){let n=this.shadowAtlas?.texture.format,r=Pa.get(t).format;if(!this.shadowAtlas||this.shadowAtlas.texture.width!==e||n!==r){this.version++,this.destroyShadowAtlas(),this.shadowAtlas=wc.createAtlas(this.device,e,t),this.shadowAtlas.cached=!0;let n=4/this.shadowAtlasResolution;this.scissorVec.set(n,n,-2*n,-2*n)}}allocateCookieAtlas(e){this.cookieAtlas.width!==e&&(this.cookieRenderTarget.resize(e,e),this.version++)}allocateUniforms(){this._shadowAtlasTextureId=this.device.scope.resolve(`shadowAtlasTexture`),this._shadowAtlasParamsId=this.device.scope.resolve(`shadowAtlasParams`),this._shadowAtlasParams=new Float32Array(2),this._cookieAtlasTextureId=this.device.scope.resolve(`cookieAtlasTexture`)}updateUniforms(){let e=this.shadowAtlas.renderTargets[0].depthBuffer;this._shadowAtlasTextureId.setValue(e),this._shadowAtlasParams[0]=this.shadowAtlasResolution,this._shadowAtlasParams[1]=this.shadowEdgePixels,this._shadowAtlasParamsId.setValue(this._shadowAtlasParams),this._cookieAtlasTextureId.setValue(this.cookieAtlas)}subdivide(e,t){let n=t.atlasSplit;if(!n){let t=Math.ceil(Math.sqrt(e));n=Ec,n[0]=t,n.length=1}if(!((e,t)=>e.length===t.length&&e.every((e,n)=>e===t[n]))(n,this.atlasSplit)){this.version++,this.slots.length=0,this.atlasSplit.length=0,this.atlasSplit.push(...n);let e=this.atlasSplit[0];if(e>1){let t=1/e;for(let n=0;n<e;n++)for(let r=0;r<e;r++){let i=new j(n*t,r*t,t,t),a=this.atlasSplit[1+n*e+r];if(a>1)for(let e=0;e<a;e++)for(let n=0;n<a;n++){let r=t/a,o=new j(i.x+e*r,i.y+n*r,r,r);this.slots.push(new kc(o))}else this.slots.push(new kc(i))}}else this.slots.push(new kc(new j(0,0,1,1)));this.slots.sort((e,t)=>t.size-e.size)}}collectLights(e,t){let n=t.cookiesEnabled,r=t.shadowsEnabled,i=!1,a=!1,o=Tc;return o.length=0,(n||r)&&(e=>{for(let t=0;t<e.length;t++){let s=e[t];if(s.visibleThisFrame){let e=r&&s.castShadows,t=n&&!!s.cookie;i||(i=e),a||(a=t),(e||t)&&o.push(s)}}})(e),o.sort((e,t)=>t.maxScreenSize-e.maxScreenSize),i&&this.allocateShadowAtlas(this.shadowAtlasResolution,t.shadowType),a&&this.allocateCookieAtlas(this.cookieAtlasResolution),(i||a)&&this.subdivide(o.length,t),o}setupSlot(e,t){e.atlasViewport.copy(t);let n=e.numShadowFaces;for(let r=0;r<n;r++)if(e.castShadows||e._cookie){if(Dc.copy(t),Oc.copy(t),e._type===2&&Dc.add(this.scissorVec),e._type===1){let e=Dc.z/3,t=this.cubeSlotsOffsets[r];Dc.x+=e*t.x,Dc.y+=e*t.y,Dc.z=e,Dc.w=e,Oc.copy(Dc)}if(e.castShadows){let t=e.getRenderData(null,r);t.shadowViewport.copy(Dc),t.shadowScissor.copy(Oc)}}}assignSlot(e,t,n){e.atlasViewportAllocated=!0;let r=this.slots[t];r.lightId=e.id,r.used=!0,n&&(e.atlasSlotUpdated=!0,e.atlasVersion=this.version,e.atlasSlotIndex=t)}update(e,t){this.shadowAtlasResolution=t.shadowAtlasResolution,this.cookieAtlasResolution=t.cookieAtlasResolution;let n=this.collectLights(e,t);if(n.length>0){let e=this.slots;for(let t=0;t<e.length;t++)e[t].used=!1;let t=Math.min(n.length,e.length);for(let r=0;r<t;r++){let t=n[r];t.castShadows&&(t._shadowMap=this.shadowAtlas);let i=e[t.atlasSlotIndex];if(t.atlasVersion===this.version&&t.id===i?.lightId){let n=e[t.atlasSlotIndex];n.size===e[r].size&&!n.used&&this.assignSlot(t,t.atlasSlotIndex,!1)}}let r=0;for(let i=0;i<t;i++){for(;r<e.length&&e[r].used;)r++;let t=n[i];t.atlasViewportAllocated||this.assignSlot(t,r,!0);let a=e[t.atlasSlotIndex];this.setupSlot(t,a.rect)}}this.updateUniforms()}},jc=[];jc[0]={src:1,dst:1,op:2},jc[3]={src:1,dst:0,op:0},jc[2]={src:6,dst:8,op:0,alphaSrc:1},jc[4]={src:1,dst:8,op:0},jc[1]={src:1,dst:1,op:0},jc[6]={src:6,dst:1,op:0},jc[7]={src:4,dst:2,op:0},jc[8]={src:5,dst:1,op:0},jc[5]={src:4,dst:0,op:0},jc[9]={src:1,dst:1,op:3},jc[10]={src:1,dst:1,op:4};var Mc=0,Nc=class{constructor(){v(this,`meshInstances`,new Set),v(this,`name`,`Untitled`),v(this,`userId`,``),v(this,`id`,Mc++),v(this,`variants`,new Map),v(this,`defines`,new Map),v(this,`_definesDirty`,!1),v(this,`_definesKey`,null),v(this,`parameters`,{}),v(this,`alphaTest`,0),v(this,`alphaToCoverage`,!1),v(this,`_blendState`,new Vn),v(this,`_sceneTexturesWrite`,void 0),v(this,`_depthState`,new qn),v(this,`cull`,1),v(this,`frontFace`,0),v(this,`stencilFront`,null),v(this,`stencilBack`,null),v(this,`_shaderChunks`,null),v(this,`_oldChunks`,{}),v(this,`_dirtyShader`,!0),v(this,`_shaderVersion`,0),v(this,`_scene`,null),v(this,`_updateVersion`,0),v(this,`_preparedVersion`,-1)}set flatShading(e){this.setDefine(`FLAT_SHADING`,e)}get flatShading(){return this.defines.has(`FLAT_SHADING`)}get hasShaderChunks(){return this._shaderChunks!=null}get shaderChunks(){return this._shaderChunks||(this._shaderChunks=new Io),this._shaderChunks}getShaderChunks(e=Lt){let t=this.shaderChunks;return e===`glsl`?t.glsl:t.wgsl}set shaderChunksVersion(e){this.shaderChunks.version=e}get shaderChunksVersion(){return this.shaderChunks.version}set chunks(e){this._oldChunks=e}get chunks(){return Object.assign(this._oldChunks,Object.fromEntries(this.shaderChunks.glsl)),this._oldChunks}set depthBias(e){this._depthState.depthBias=e}get depthBias(){return this._depthState.depthBias}set slopeDepthBias(e){this._depthState.depthBiasSlope=e}get slopeDepthBias(){return this._depthState.depthBiasSlope}get updateVersion(){return this._updateVersion}get dirty(){}set redWrite(e){this._blendState.redWrite=e}get redWrite(){return this._blendState.redWrite}set greenWrite(e){this._blendState.greenWrite=e}get greenWrite(){return this._blendState.greenWrite}set blueWrite(e){this._blendState.blueWrite=e}get blueWrite(){return this._blendState.blueWrite}set alphaWrite(e){this._blendState.alphaWrite=e}get alphaWrite(){return this._blendState.alphaWrite}get transparent(){return this._blendState.blend}set sceneTexturesWrite(e){this._sceneTexturesWrite=e}get sceneTexturesWrite(){return this._sceneTexturesWrite??!this.transparent}_updateTransparency(){for(let e of this.meshInstances)e.transparent=this.transparent}set blendState(e){let t=this._blendState.usesDualSourceBlending;this._blendState.copy(e),this._updateTransparency(),t!==this._blendState.usesDualSourceBlending&&this.clearVariants()}get blendState(){return this._blendState}set blendType(e){let t=this._blendState.usesDualSourceBlending,n=jc[e];this._blendState.setColorBlend(n.op,n.src,n.dst),this._blendState.setAlphaBlend(n.alphaOp??n.op,n.alphaSrc??n.src,n.alphaDst??n.dst);let r=e!==3;this._blendState.blend!==r&&(this._blendState.blend=r,this._updateTransparency()),this._updateMeshInstanceKeys(),t!==this._blendState.usesDualSourceBlending&&this.clearVariants()}get blendType(){if(!this.transparent)return 3;let{colorOp:e,colorSrcFactor:t,colorDstFactor:n,alphaOp:r,alphaSrcFactor:i,alphaDstFactor:a}=this._blendState;for(let o=0;o<jc.length;o++){let s=jc[o];if(s.src===t&&s.dst===n&&s.op===e&&s.src===i&&s.dst===a&&s.op===r)return o}return 2}set depthState(e){this._depthState.copy(e)}get depthState(){return this._depthState}set depthTest(e){this._depthState.test=e}get depthTest(){return this._depthState.test}set depthFunc(e){this._depthState.func=e}get depthFunc(){return this._depthState.func}set depthWrite(e){this._depthState.write=e}get depthWrite(){return this._depthState.write}copy(e){this.name=e.name,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this._blendState.copy(e._blendState),this._depthState.copy(e._depthState),this._sceneTexturesWrite=e._sceneTexturesWrite,this.cull=e.cull,this.frontFace=e.frontFace,this.stencilFront=e.stencilFront?.clone(),e.stencilBack&&(this.stencilBack=e.stencilFront===e.stencilBack?this.stencilFront:e.stencilBack.clone()),this.clearParameters();for(let t in e.parameters)e.parameters.hasOwnProperty(t)&&this._setParameterSimple(t,e.parameters[t].data);return this.defines.clear(),e.defines.forEach((e,t)=>this.defines.set(t,e)),this._definesKey=null,this._shaderChunks=e.hasShaderChunks?new Io:null,this._shaderChunks?.copy(e._shaderChunks),this}clone(){return new this.constructor().copy(this)}_updateMeshInstanceKeys(){for(let e of this.meshInstances)e.updateKey()}_clearVariantsIfDirty(){this._dirtyShader&&(this.clearVariants(),this._dirtyShader=!1)}updateUniforms(e,t){this._clearVariantsIfDirty()}prepareForRender(e,t){let n=this._updateVersion;this._preparedVersion!==n&&(this.updateUniforms(e,t),this._preparedVersion=n)}getShaderVariant(e){}update(){if(Object.keys(this._oldChunks).length>0)for(let[e,t]of Object.entries(this._oldChunks))this.shaderChunks.glsl.set(e,t),delete this._oldChunks[e];(this._definesDirty||this._shaderChunks?.isDirty())&&(this._definesDirty=!1,this._shaderChunks?.resetDirty(),this._dirtyShader=!0),this._clearVariantsIfDirty(),this._updateVersion++}clearParameters(){this.parameters={}}getParameters(){return this.parameters}clearVariants(){this.variants.clear();for(let e of this.meshInstances)e.clearShaders()}getParameter(e){return this.parameters[e]}_setParameterSimple(e,t){let n=this.parameters[e];n?n.data=t:this.parameters[e]={scopeId:null,data:t}}setParameter(e,t){if(t===void 0&&typeof e==`object`){let n=e;if(n.length){for(let e=0;e<n.length;e++)this.setParameter(n[e]);return}e=n.name,t=n.value}this._setParameterSimple(e,t)}deleteParameter(e){this.parameters[e]&&delete this.parameters[e]}setParameters(e,t){let n=this.parameters;t===void 0&&(t=n);for(let r in t){let t=n[r];t&&(t.scopeId||(t.scopeId=e.scope.resolve(r)),t.scopeId.setValue(t.data))}}setDefine(e,t){let n=!1,{defines:r}=this;t!==void 0&&t!==!1?(n=!r.has(e)||r.get(e)!==t,r.set(e,t)):(n=r.has(e),r.delete(e)),this._definesDirty||(this._definesDirty=n),n&&(this._definesKey=null)}get definesKey(){return this._definesKey===null&&(this._definesKey=Array.from(this.defines).sort(([e],[t])=>e<t?-1:+(e>t)).map(([e,t])=>`${e}=${t}`).join(`,`)),this._definesKey}getDefine(e){return this.defines.has(e)}destroy(){this.variants.clear();for(let e of this.meshInstances)if(e.clearShaders(),e._material=null,e.mesh){let t=xs(e.mesh.device);this!==t&&(e.material=t)}this.meshInstances.clear()}addMeshInstanceRef(e){this.meshInstances.add(e)}removeMeshInstanceRef(e){this.meshInstances.delete(e)}set shader(e){}get shader(){return null}set blend(e){this.blendState.blend=e}get blend(){return this.blendState.blend}},Pc=class{constructor(){this.cache=new Map}destroy(){this.clear(),this.cache=null}clear(){this.cache.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.cache.clear()}getKey(e){return`${e._type===1}-${e._shadowType}-${e._shadowResolution}`}get(e,t){let n=this.getKey(t),r=this.cache.get(n);if(r&&r.length)return r.pop();let i=wc.create(e,t);return i.cached=!0,i}add(e,t){let n=this.getKey(e),r=this.cache.get(n);r?r.push(t):this.cache.set(n,[t])}},Fc=class extends Dr{constructor(e,t,n,r,i){super(e),this.requiresCubemaps=!1,this.shadowRenderer=t,this.light=n,this.face=r,this.applyVsm=i,this.shadowCamera=t.prepareFace(n,null,r),t.setupRenderPass(this,this.shadowCamera,!0)}execute(){this.shadowRenderer.renderFace(this.light,null,this.face,!1)}after(){this.applyVsm&&this.shadowRenderer.renderVsm(this.light,this.shadowCamera)}},Ic=class{constructor(e,t){v(this,`shadowLights`,[]),v(this,`renderer`,void 0),v(this,`shadowRenderer`,void 0),v(this,`device`,void 0),this.renderer=e,this.shadowRenderer=t,this.device=e.device}prepareShadowMap(e){!this.renderer.scene.clusteredLightingEnabled&&!e._shadowMap&&(e._shadowMap=wc.create(this.device,e))}cull(e,t,n=null){let r=this.renderer.scene.clusteredLightingEnabled;e.visibleThisFrame=!0,this.prepareShadowMap(e);let i=e._type,a=i===2?1:6;for(let o=0;o<a;o++){let a=e.getRenderData(null,o),s=a.shadowCamera;s.nearClip=e.attenuationEnd/1e3,s.farClip=e.attenuationEnd;let c=s._node,l=e._node;if(c.setPosition(l.getPosition()),i===2)s.fov=e._outerConeAngle*2,c.setRotation(l.getRotation()),c.rotateLocal(-90,0,0);else if(i===1){if(r){let t=2/(this.shadowRenderer.lightTextureAtlas.shadowAtlasResolution*e.atlasViewport.z/3)*this.shadowRenderer.lightTextureAtlas.shadowEdgePixels;s.fov=Math.atan(1+t)*E.RAD_TO_DEG*2}else s.fov=90}s.updateFrustum(),i===2&&this.shadowRenderer.cullShadowCasters(t,e,a.visibleCasters,s,n)}i===1&&this.shadowRenderer.cullShadowCastersOmni(t,e,n)}prepareLights(e,t){e.length=0;let n;for(let r=0;r<t.length;r++){let i=t[r];if(this.shadowRenderer.needsShadowRendering(i)&&i.atlasViewportAllocated){e.push(i);for(let e=0;e<i.numShadowFaces;e++)n=this.shadowRenderer.prepareFace(i,null,e)}}return n}buildNonClusteredRenderPasses(e,t){for(let n=0;n<t.length;n++){let r=t[n];if(this.shadowRenderer.needsShadowRendering(r)){let t=r._type===2,n=r.numShadowFaces;for(let i=0;i<n;i++){let n=new Fc(this.device,this.shadowRenderer,r,i,t);e.addRenderPass(n)}}}}},Lc=class extends Dr{constructor(e,t,n,r,i){super(e),this.shadowRenderer=t,this.light=n,this.camera=r,this.allCascadesRendering=i}execute(){let{light:e,camera:t,shadowRenderer:n,allCascadesRendering:r}=this,i=e.numShadowFaces,a=e.shadowUpdateOverrides;for(let o=0;o<i;o++)a?.[o]!==0&&n.renderFace(e,t,o,!r),a?.[o]===1&&(a[o]=0)}after(){this.shadowRenderer.renderVsm(this.light,this.camera)}},Rc=new be,zc=[new be,new be,new be,new be],Bc=[!1,!1,!1,!1],Vc=[0,0,0,0],Hc=new k,Uc=new M,V=[new k,new k,new k,new k,new k,new k,new k,new k],Wc={min:0,max:0};function Gc(e,t,n){V[0].x=V[1].x=V[2].x=V[3].x=t.x,V[1].y=V[3].y=V[7].y=V[5].y=t.y,V[2].z=V[3].z=V[6].z=V[7].z=t.z,V[4].x=V[5].x=V[6].x=V[7].x=n.x,V[0].y=V[2].y=V[4].y=V[6].y=n.y,V[0].z=V[1].z=V[4].z=V[5].z=n.z;let r=9999999999,i=-9999999999;for(let t=0;t<8;++t){e.transformPoint(V[t],V[t]);let n=V[t].z;n<r&&(r=n),n>i&&(i=n)}return Wc.min=r,Wc.max=i,Wc}var Kc=class{constructor(e,t){v(this,`renderer`,void 0),v(this,`shadowRenderer`,void 0),v(this,`device`,void 0),this.renderer=e,this.shadowRenderer=t,this.device=e.device}prepareShadowMap(e){e.visibleThisFrame=!0,e._shadowMap||(e._shadowMap=wc.create(this.device,e))}cull(e,t,n,r=null){let i=n._nearClip;this.generateSplitDistances(e,i,Math.min(n._farClip,e.shadowDistance));let a=e.shadowUpdateOverrides,o=0;for(let s=0;s<e.numCascades&&a?.[s]!==0;s++){let a=e.getRenderData(n,s),c=a.shadowCamera;c.renderTarget=e._shadowMap.renderTargets[0],a.shadowViewport.copy(e.cascades[s]),a.shadowScissor.copy(e.cascades[s]);let l=c._node,u=e._node;l.setPosition(u.getPosition()),l.setRotation(u.getRotation()),l.rotateLocal(-90,0,0);let d=s===0?i:e._shadowCascadeDistances[s-1],f=e._shadowCascadeDistances[s],p=n.getFrustumCorners(d,f);Hc.set(0,0,0);let m=n.node.getWorldTransform();for(let e=0;e<8;e++)m.transformPoint(p[e],p[e]),Hc.add(p[e]);Hc.mulScalar(1/8);let h=0;for(let e=0;e<8;e++){let t=p[e].sub(Hc).length();t>h&&(h=t)}let g=l.right,_=l.up,v=l.forward,y=.25*e._shadowResolution/h,b=Math.ceil(Hc.dot(_)*y)/y,x=Math.ceil(Hc.dot(g)*y)/y,S=_.mulScalar(b),C=g.mulScalar(x),w=Hc.dot(v),T=v.mulScalar(w);Hc.add2(S,C).add(T),l.setPosition(Hc),l.translateLocal(0,0,1e6),c.nearClip=.01,c.farClip=2e6,c.orthoHeight=h,c.updateFrustum(),this.shadowRenderer.cullShadowCasters(t,e,a.visibleCasters,c,r);let E=1<<s,D=a.visibleCasters,O=D.length,ee=0,te=zc[s];for(let e=0;e<O;e++){let t=D[e];t.shadowCascadeMask&E&&(D[ee++]=t,ee===1?te.copy(t.aabb):te.add(t.aabb))}O!==ee&&(D.length=ee),Bc[s]=ee>0,Vc[s]=h,o++}let s=!1;if(e._isPcss)for(let e=0;e<o;e++)Bc[e]&&(s?Rc.add(zc[e]):(Rc.copy(zc[e]),s=!0));for(let t=0;t<o;t++){let r;if(s)r=Rc;else if(Bc[t])r=zc[t];else continue;let i=e.getRenderData(n,t),a=i.shadowCamera,o=a._node;Uc.copy(o.getWorldTransform()).invert();let c=Gc(Uc,r.getMin(),r.getMax());o.translateLocal(0,0,c.max+.1),a.farClip=c.max-c.min+.2,i.projectionCompensation=Vc[t]}}generateSplitDistances(e,t,n){e._shadowCascadeDistances.fill(n);for(let r=1;r<e.numCascades;r++){let i=r/e.numCascades,a=t+(n-t)*i,o=t*(n/t)**i,s=E.lerp(a,o,e.cascadeDistribution);e._shadowCascadeDistances[r-1]=s}}getLightRenderPass(e,t){let n=null;if(this.shadowRenderer.needsShadowRendering(e)){let r=e.numShadowFaces,i=e.shadowUpdateOverrides,a=!0,o;for(let n=0;n<r;n++)i?.[n]===0&&(a=!1),o=this.shadowRenderer.prepareFace(e,t,n);n=new Lc(this.device,this.shadowRenderer,e,t,a),this.shadowRenderer.setupRenderPass(n,o,a)}return n}},qc=new Set,Jc=[],Yc=[],Xc=new M,Zc=new M,Qc=new Float32Array(2),$c=new j(1,1,0,0),el=new M;function tl(e,t){return Math.exp(-(e*e)/(2*t*t))}function nl(e){let t=(e-1)/6,n=(e-1)*.5,r=Array(e),i=0;for(let a=0;a<e;++a)r[a]=tl(a-n,t),i+=r[a];for(let t=0;t<e;++t)r[t]/=i;return r}var rl=class{constructor(e,t){v(this,`shadowPassCache`,[]),v(this,`_casterLists`,[]),this.device=e.device,this.renderer=e,this.lightTextureAtlas=t;let n=this.device.scope;this.sourceId=n.resolve(`source`),this.pixelOffsetId=n.resolve(`pixelOffset`),this.weightId=n.resolve(`weight[0]`),this.blurVsmShader=[{},{}],this.blurVsmWeights={},this.shadowMapLightRadiusId=n.resolve(`light_radius`),this.viewUniformFormat=null,this.blendStateWrite=new Vn,this.blendStateNoWrite=new Vn,this.blendStateNoWrite.setColorWrite(!1,!1,!1,!1)}static createShadowCamera(e,t,n,r){let i=Qs.create(e,So,n,r),a=Pa.get(t),o=a?.vsm??!1,s=a?.pcf??!1;return i.clearColor=o?new O(0,0,0,0):new O(1,1,1,1),i.clearDepthBuffer=!0,i.clearStencilBuffer=!1,i.clearColorBuffer=!s,i}_cullShadowCastersInternal(e,t,n){let r=e.length;for(let i=0;i<r;i++){let r=e[i];r.castShadow&&(!r.cull||r._isVisible(n))&&(r.visibleThisFrame=!0,t.push(r))}}cullShadowCasters(e,t,n,r,i){this.renderer.scene?.fire(yo,null),n.length=0;let a=this._collectCasterLists(e,t,i);for(let e=0;e<a.length;e++)this._cullShadowCastersInternal(a[e],n,r);n.sort(this.sortCompareShader),this.renderer.scene?.fire(bo,null)}_collectCasterLists(e,t,n){let r=this._casterLists;if(r.length=0,n)r.push(n);else{let n=e.layerList,i=n.length;for(let e=0;e<i;e++){let i=n[e];i._lightsSet.has(t)&&(qc.has(i)||(qc.add(i),r.push(i.shadowCasters)))}qc.clear()}return r}cullShadowCastersOmni(e,t,n){this.renderer.scene?.fire(yo,null);for(let e=0;e<6;e++){let n=t.getRenderData(null,e),r=n.visibleCasters;r.length=0,Jc[e]=r,Yc[e]=n.shadowCamera}let r=t._node.getPosition(),i=r.x,a=r.y,o=r.z,s=Yc[0],c=s.nearClip,l=s.farClip,u=Math.tan(s.fov*.5*E.DEG_TO_RAD),d=l*u,f=this._collectCasterLists(e,t,n);for(let e=0;e<f.length;e++){let t=f[e],n=t.length;for(let e=0;e<n;e++){let n=t[e];if(!n.castShadow)continue;if(!n.cull||n.isVisibleFunc){for(let e=0;e<6;e++)(!n.cull||n._isVisible(Yc[e]))&&(n.visibleThisFrame=!0,Jc[e].push(n));continue}if(!n.visible)continue;let r=n.aabb.center,s=n._aabb.halfExtents,f=s.x,p=s.y,m=s.z,h=r.x-i,g=r.y-a,_=r.z-o;if(h>d+f||h<-d-f||g>d+p||g<-d-p||_>d+m||_<-d-m)continue;let v=u*h,y=u*g,b=u*_,x=-(u*f+p),S=-(u*f+m),C=-(u*p+f),w=-(u*p+m),T=-(u*m+f),E=-(u*m+p),D=!1;h+f>c&&h-f<l&&v-g>x&&v+g>x&&v-_>S&&v+_>S&&(Jc[0].push(n),D=!0),-h+f>c&&-h-f<l&&-v-g>x&&-v+g>x&&-v-_>S&&-v+_>S&&(Jc[1].push(n),D=!0),g+p>c&&g-p<l&&y-h>C&&y+h>C&&y-_>w&&y+_>w&&(Jc[2].push(n),D=!0),-g+p>c&&-g-p<l&&-y-h>C&&-y+h>C&&-y-_>w&&-y+_>w&&(Jc[3].push(n),D=!0),_+m>c&&_-m<l&&b-h>T&&b+h>T&&b-g>E&&b+g>E&&(Jc[4].push(n),D=!0),-_+m>c&&-_-m<l&&-b-h>T&&-b+h>T&&-b-g>E&&-b+g>E&&(Jc[5].push(n),D=!0),D&&(n.visibleThisFrame=!0)}}for(let e=0;e<6;e++)Jc[e].sort(this.sortCompareShader),Jc[e]=null,Yc[e]=null;this.renderer.scene?.fire(bo,null)}sortCompareShader(e,t){let n=e._sortKeyShadow,r=t._sortKeyShadow;return n===r?t.mesh.id-e.mesh.id:r-n}setupRenderState(e,t){let n=this.renderer.scene.clusteredLightingEnabled?t._isPcf:t._isPcf&&t._type!==1;e.setBlendState(n?this.blendStateNoWrite:this.blendStateWrite),e.setDepthState(t.shadowDepthState),e.setStencilState(null,null)}dispatchUniforms(e,t,n,r){let i=t._node;e._type!==0&&(this.renderer.dispatchViewPos(i.getPosition()),this.shadowMapLightRadiusId.setValue(e.attenuationEnd)),Xc.setTRS(i.getPosition(),i.getRotation(),k.ONE).invert(),Zc.mul2(t.projectionMatrix,Xc);let a=n.shadowViewport;t.rect=a,t.scissorRect=n.shadowScissor,el.setViewport(a.x,a.y,a.z,a.w),n.shadowMatrix.mul2(el,Zc),e._type===0&&e._shadowMatrixPalette.set(n.shadowMatrix.data,r*16)}getShadowPass(e){let t=e._type,n=e._shadowType,r=this.shadowPassCache[t]?.[n];if(!r){let e=`ShadowPass_${t}_${n}`;r=No.get(this.device).allocate(e,{isShadow:!0,lightType:t,shadowType:n}),this.shadowPassCache[t]||(this.shadowPassCache[t]=[]),this.shadowPassCache[t][n]=r}return r.index}submitCasters(e,t,n){let r=this.device,i=this.renderer,a=i.scene,o=this.getShadowPass(t),s=n.shaderParams,c=n.renderTarget.flipY?-1:1,l=e.length;for(let t=0;t<l;t++){let l=e[t],u=l.mesh,d=l.instancingData;if(d&&d.count<=0&&!l.getDrawCommands(n))continue;l.ensureMaterial(r);let f=l.material;i.setBaseConstants(r,f),i.setSkinning(r,l),f.prepareForRender(r,a),i.setupCullModeAndFrontFace(!0,c,l),f.setParameters(r),l.setParameters(r);let p=l.getShaderInstance(o,0,a,s,this.viewUniformFormat),m=p.shader;if(m.failed)continue;l._sortKeyShadow=m.id,r.setShader(m),i.setVertexBuffers(r,u),i.setMorphing(r,l.morphInstance),d&&r.setVertexBuffer(d.vertexBuffer),i.setMeshInstanceMatrices(l),i.setupMeshUniformBuffers(p);let h=l.renderStyle,g=l.getDrawCommands(n);r.draw(u.primitive[h],u.indexBuffer[h],d?.count,g),i._shadowDrawCalls++,d&&i._instancedDrawCalls++}}needsShadowRendering(e){return e.enabled&&e.castShadows&&e.shadowUpdateMode!==0&&e.visibleThisFrame}getLightRenderData(e,t,n){return e.getRenderData(e._type===0?t:null,n)}setupRenderPass(e,t,n){let r=t.renderTarget;e.init(r),e.depthStencilOps.clearDepthValue=1,e.depthStencilOps.clearDepth=n,r.depthBuffer?e.depthStencilOps.storeDepth=!0:(e.colorOps.clearValue.copy(t.clearColor),e.colorOps.clear=n,e.depthStencilOps.storeDepth=!1),e.requiresCubemaps=!1}prepareFace(e,t,n){let r=e._type,i=this.getLightRenderData(e,t,n).shadowCamera,a=r===0?0:n;return i.renderTarget=e._shadowMap.renderTargets[a],i}renderFace(e,t,n,r){let i=this.device,a=this.getLightRenderData(e,t,n),o=a.shadowCamera;this.dispatchUniforms(e,o,a,n);let s=o.renderTarget,c=this.renderer;c.setCameraUniforms(o,s),c.setupViewUniformBuffers(this.viewUniformFormat,null),c.setupViewport(o,s),r&&c.clear(o),this.setupRenderState(i,e),this.submitCasters(a.visibleCasters,e,o)}renderVsm(e,t){e._isVsm&&e._vsmBlurSize>1&&(!this.renderer.scene.clusteredLightingEnabled||e._type===0)&&this.applyVsmBlur(e,t)}getVsmBlurShader(e,t){let n=this.blurVsmShader,r=n[e][t];if(!r){this.blurVsmWeights[t]=nl(t);let i=new Map;i.set(`{SAMPLES}`,t),e===1&&i.set(`GAUSS`,``),r=zo.createShader(this.device,{uniqueName:`blurVsm${e}${t}`,attributes:{vertex_position:P},vertexChunk:`fullscreenQuadVS`,fragmentChunk:`blurVSMPS`,fragmentDefines:i}),n[e][t]=r}return r}applyVsmBlur(e,t){let n=this.device;n.setBlendState(Vn.NOBLEND);let r=e.getRenderData(e._type===0?t:null,0).shadowCamera.renderTarget,i=this.renderer.shadowMapCache.get(n,e),a=i.renderTargets[0],o=e.vsmBlurMode,s=e._vsmBlurSize,c=this.getVsmBlurShader(o,s);$c.z=e._shadowResolution-2,$c.w=$c.z,this.sourceId.setValue(r.colorBuffer),Qc[0]=1/e._shadowResolution,Qc[1]=0,this.pixelOffsetId.setValue(Qc),o===1&&this.weightId.setValue(this.blurVsmWeights[s]),qo(n,a,c,null,$c),this.sourceId.setValue(a.colorBuffer),Qc[1]=Qc[0],Qc[0]=0,this.pixelOffsetId.setValue(Qc),qo(n,r,c,null,$c),this.renderer.shadowMapCache.add(e,i)}initViewUniformFormat(){this.viewUniformFormat||(this.viewUniformFormat=new kr(this.device,[new R(`matrix_viewProjection`,14)]))}frameUpdate(){this.initViewUniformFormat()}},il=class extends wr{constructor(e){super(e),v(this,`children`,[]),this.name=`FramePassMultiView`}addChild(e){this.children.push(e)}render(){if(!this.enabled)return;let e=this.device,t=e.xrSubImages,n=t?.length??0,r=this.children,i=r.length;if(n===0){for(let e=0;e<i;e++)r[e].render();return}let a=e.backBuffer?.impl,o=e.xrColorTexture,s=a?.assignedColorTexture??null,c=a?.colorAttachments?.[0]?.format??null;for(let o=0;o<n;o++){let n=t[o];e.xrCurrentViewIndex=o,e.xrColorTexture=n.colorTexture,e.xrColorTextureViewDescriptor=n.viewDescriptor,a?.assignColorTexture?.(n.colorTexture,n.viewFormat);for(let e=0;e<i;e++)r[e].render()}e.xrCurrentViewIndex=-1,e.xrColorTextureViewDescriptor=null,e.xrColorTexture=o??null,a&&s&&c&&a.assignedColorTexture!==s&&a.assignColorTexture(s,c)}},al=[],ol=class{constructor(e){v(this,`_empty`,null),v(this,`_allocated`,[]),v(this,`_clusters`,new Map),this.device=e}destroy(){this._empty&&(this._empty.destroy(),this._empty=null),this._allocated.forEach(e=>{e.destroy()}),this._allocated.length=0,this._clusters.clear()}get count(){return this._allocated.length}get empty(){if(!this._empty){let e=new pc(this.device);e.name=`ClusterEmpty`,e.update([]),this._empty=e}return this._empty}_assignClustersForPass(e){let t=e.layerRenderSteps;if(!t)return;let n=t.length;for(let e=0;e<n;e++){let n=t[e];n.lightClusters=null;let r=n.layer;if(r.hasClusteredLights&&r.meshInstances.length){let e=r.getLightIdHash(),t=this._clusters.get(e)?.lightClusters;t||(t=al.pop()??new pc(this.device),this._allocated.push(t),this._clusters.set(e,n)),n.lightClusters=t}n.lightClusters||(n.lightClusters=this.empty)}}assign(e){al.push(...this._allocated),this._allocated.length=0,this._clusters.clear();let t=e.length;for(let n=0;n<t;n++){let t=e[n];if(t instanceof il){let e=t.children;for(let t=0;t<e.length;t++)this._assignClustersForPass(e[t])}else this._assignClustersForPass(t)}al.forEach(e=>e.destroy()),al.length=0}update(e,t){this.assign(e),this._clusters.forEach(e=>{let n=e.layer;e.lightClusters.update(n.clusteredLightsSet,t)})}},sl=new j,cl=[],ll=class e extends Dr{constructor(e,t){super(e),v(this,`_quadRenderer2D`,null),v(this,`_quadRendererCube`,null),v(this,`_filteredLights`,[]),v(this,`_forceCopy`,!1),v(this,`_evtDeviceRestored`,null),this._cubeSlotsOffsets=t,this.requiresCubemaps=!1,this.blitTextureId=e.scope.resolve(`blitTexture`),this.invViewProjId=e.scope.resolve(`invViewProj`),this._evtDeviceRestored=e.on(`devicerestored`,this.onDeviceRestored,this)}destroy(){this._quadRenderer2D?.destroy(),this._quadRenderer2D=null,this._quadRendererCube?.destroy(),this._quadRendererCube=null,this._evtDeviceRestored?.off(),this._evtDeviceRestored=null}static create(t,n){let r=new e(t.device,n);return r.init(t),r.colorOps.clear=!1,r.depthStencilOps.clearDepth=!1,r}onDeviceRestored(){this._forceCopy=!0}update(e){let t=this._filteredLights;this.filter(e,t),this.executeEnabled=t.length>0}filter(e,t){for(let n=0;n<e.length;n++){let r=e[n];if(r._type===0||!r.atlasViewportAllocated)continue;let i=r.cookie&&r.cookie.uploadVersion!==r.cookieRenderVersion;(r.atlasSlotUpdated||i||this._forceCopy)&&r.enabled&&r.cookie&&r.visibleThisFrame&&t.push(r)}this._forceCopy=!1}initInvViewProjMatrices(){if(!cl.length)for(let e=0;e<6;e++){let t=Qs.create(this.device,null,1,e),n=t.projectionMatrix,r=t.node.getLocalTransform().clone().invert();cl[e]=new M().mul2(n,r).invert()}}get quadRenderer2D(){if(!this._quadRenderer2D){let e=zo.createShader(this.device,{uniqueName:`cookieRenderer2d`,attributes:{vertex_position:P},vertexChunk:`cookieBlitVS`,fragmentChunk:`cookieBlit2DPS`});this._quadRenderer2D=new Wo(e)}return this._quadRenderer2D}get quadRendererCube(){if(!this._quadRendererCube){let e=zo.createShader(this.device,{uniqueName:`cookieRendererCube`,attributes:{vertex_position:P},vertexChunk:`cookieBlitVS`,fragmentChunk:`cookieBlitCubePS`});this._quadRendererCube=new Wo(e)}return this._quadRendererCube}execute(){this.device.setDrawStates();let e=this.renderTarget.colorBuffer.width,t=this._cubeSlotsOffsets,n=this._filteredLights;for(let r=0;r<n.length;r++){let i=n[r],a=i.numShadowFaces,o=a>1?this.quadRendererCube:this.quadRenderer2D;a>1&&this.initInvViewProjMatrices(),this.blitTextureId.setValue(i.cookie),i.cookieRenderVersion=i.cookie.uploadVersion;for(let n=0;n<a;n++){if(sl.copy(i.atlasViewport),a>1){let e=sl.z/3,r=t[n];sl.x+=e*r.x,sl.y+=e*r.y,sl.z=e,sl.w=e,this.invViewProjId.setValue(cl[n].data)}sl.mulScalar(e),o.render(sl)}}n.length=0}},ul=class extends Dr{constructor(e,t,n){super(e),this.requiresCubemaps=!1,this.shadowRenderer=t,this.shadowRendererLocal=n}update(e){let t=this.shadowRendererLocal.shadowLights,n=this.shadowRendererLocal.prepareLights(t,e),r=t.length;this.enabled=r>0,r&&this.shadowRenderer.setupRenderPass(this,n,!1)}execute(){let e=this.shadowRendererLocal.shadowLights,t=e.length;for(let n=0;n<t;n++){let t=e[n];for(let e=0;e<t.numShadowFaces;e++)this.shadowRenderer.renderFace(t,null,e,!0)}e.length=0}},dl=class extends wr{constructor(e,t,n,r,i){super(e),this.renderer=t,this.frameGraph=null,this.cookiesRenderPass=ll.create(i.cookieRenderTarget,i.cubeSlotsOffsets),this.beforePasses.push(this.cookiesRenderPass),this.shadowRenderPass=new ul(e,n,r),this.beforePasses.push(this.shadowRenderPass)}update(e,t,n,r,i){this.frameGraph=e,this.cookiesRenderPass.enabled=n,n&&this.cookiesRenderPass.update(r),this.shadowRenderPass.enabled=t,t&&this.shadowRenderPass.update(i)}destroy(){this.cookiesRenderPass.destroy(),this.cookiesRenderPass=null}execute(){let{renderer:e}=this,{scene:t}=e;e.worldClustersAllocator.update(this.frameGraph.renderPasses,t.lighting)}},fl=new Ce,pl=new Set,ml=class{constructor(e){v(this,`processingMeshInstances`,new Set),v(this,`_cullCameras`,[]),v(this,`cameraDirShadowLights`,new Map),v(this,`dirLightShadows`,new Map),this.renderer=e}cullMeshInstances(e,t,n){let r=n.opaque;r.length=0;let i=n.transparent;i.length=0;let a=e.frustumCulling,o=t.length;for(let n=0;n<o;n++){let o=t[n];o.visible&&(!a||!o.cull||o._isVisible(e))&&(o.visibleThisFrame=!0,(o.transparent?i:r).push(o),(o.skinInstance||o.morphInstance||o.gsplatInstance)&&(this.processingMeshInstances.add(o),o.gsplatInstance&&o.gsplatInstance.cameras.push(e)))}}cullLights(e,t){let{scene:n}=this.renderer,r=n.clusteredLightingEnabled,i=n.physicalUnits;for(let a=0;a<t.length;a++){let o=t[a];if(o.enabled){if(o._type!==0){if(o.getBoundingSphere(fl),e.frustum.containsSphere(fl)){o.visibleThisFrame=!0,o.usePhysicalUnits=i;let t=e.getScreenSize(fl);o.maxScreenSize=Math.max(o.maxScreenSize,t)}else r||o.castShadows&&!o.shadowMap&&(o.visibleThisFrame=!0)}else o.usePhysicalUnits=n.physicalUnits}}}cullShadowmaps(e){let{renderer:t}=this,n=t.localLights;for(let r=0;r<n.length;r++){let i=n[r];i._type!==0&&i.visibleThisFrame&&i.castShadows&&i.shadowUpdateMode!==0&&t._shadowRendererLocal.cull(i,e)}this.cameraDirShadowLights.forEach((n,r)=>{for(let i=0;i<n.length;i++)t._shadowRendererDirectional.cull(n[i],e,r)})}consumeOneShotShadows(){let{renderer:e}=this,t=e.scene.clusteredLightingEnabled,n=e.shadowRenderer,r=e.localLights;for(let i=0;i<r.length;i++){let a=r[i];n.needsShadowRendering(a)&&(!t||a.atlasViewportAllocated)&&(e._shadowMapUpdates+=a.numShadowFaces,a.shadowUpdateMode===1&&(a.shadowUpdateMode=0))}this.cameraDirShadowLights.forEach(t=>{for(let r=0;r<t.length;r++){let i=t[r];n.needsShadowRendering(i)&&(e._shadowMapUpdates+=i.numShadowFaces,i.shadowUpdateMode===1&&(i.shadowUpdateMode=0))}})}collectDirectionalShadowLights(e){let{renderer:t}=this;this.cameraDirShadowLights.clear();let n=e.cameras;for(let r=0;r<n.length;r++){let i=n[r];if(i.enabled){let n=i.camera,r,a=n.layers;for(let n=0;n<a.length;n++){let i=e.getLayerById(a[n]);if(i){let e=i.splitLights[0];for(let n=0;n<e.length;n++){let i=e[n];i.castShadows&&!pl.has(i)&&(pl.add(i),r=r??[],r.push(i),t._shadowRendererDirectional.prepareShadowMap(i))}}}r&&this.cameraDirShadowLights.set(n,r),pl.clear()}}}updateLightVisibility(e){let{renderer:t}=this,{scene:n}=t,r=t.lights;for(let e=0;e<r.length;e++)r[e].beginFrame();let i=e.cameras.length;for(let t=0;t<i;t++){let n=e.cameras[t];n.camera.updateFrustum();let r=n.layers;for(let t=0;t<r.length;t++){let i=e.getLayerById(r[t]);i&&i.enabled&&this.cullLights(n.camera,i._lights)}}let a=n.clusteredLightingEnabled;a&&t.updateLightTextureAtlas();let o=t.localLights;for(let e=0;e<o.length;e++){let n=o[e];n._type!==0&&(a?n.atlasSlotUpdated&&n.shadowUpdateMode===0&&(n.shadowUpdateMode=1):n.castShadows&&n.visibleThisFrame&&!n._shadowMap&&(t._shadowRendererLocal.prepareShadowMap(n),n.shadowUpdateMode===0&&(n.shadowUpdateMode=1)))}this.collectDirectionalShadowLights(e)}requestMeshInstanceCull(e,t){e.addCullLayer(t)&&this._cullCameras.push(e)}executeMeshInstanceCull(){let{renderer:e}=this,{scene:t}=e,n=this._cullCameras;for(let e=0;e<n.length;e++){let r=n[e],i=r.node?.camera??null;t?.fire(yo,i),r.updateFrustum();for(let e of r.cullLayers)this.cullMeshInstances(r,e.meshInstances,e.getCulledInstances(r));t?.fire(bo,i),r.clearCullLayers()}n.length=0}cullComposition(e){let{renderer:t}=this,{scene:n}=t;this.processingMeshInstances.clear(),t._camerasRendered+=e.cameras.length,this.executeMeshInstanceCull(),this.cullShadowmaps(e),n?.fire(xo)}},hl=0,gl=new M,_l=new M,vl=new M,yl=new ae,bl=new Set,xl=new Set,Sl=new _n,Cl=[0,0,0,1],wl={color:Cl,depth:1,stencil:0,flags:0},Tl=[new A(.5,.333333),new A(.25,.666667),new A(.75,.111111),new A(.125,.444444),new A(.625,.777778),new A(.375,.222222),new A(.875,.555556),new A(.0625,.888889),new A(.5625,.037037),new A(.3125,.37037),new A(.8125,.703704),new A(.1875,.148148),new A(.6875,.481481),new A(.4375,.814815),new A(.9375,.259259),new A(.03125,.592593)],El=new M,Dl=new M,Ol=new M,kl=new M,Al=new Set,jl=[],Ml=[],Nl=class{constructor(e,t){v(this,`clustersDebugRendered`,!1),v(this,`scene`,void 0),v(this,`culler`,void 0),v(this,`worldClustersAllocator`,void 0),v(this,`lights`,[]),v(this,`localLights`,[]),v(this,`_viewUniformBuffers`,new WeakMap),v(this,`_dynamicViewBindGroup`,new _n),v(this,`_viewBindGroups`,[]),v(this,`_viewBindGroupOffsets`,[]),v(this,`_viewOffsetScratch`,[0]),v(this,`blueNoise`,new vc(123)),v(this,`gsplatDirector`,null),this.device=e,this.scene=t,this.worldClustersAllocator=new ol(e),this.lightTextureAtlas=new Ac(e),this.shadowMapCache=new Pc,this.shadowRenderer=new rl(this,this.lightTextureAtlas),this._shadowRendererLocal=new Ic(this,this.shadowRenderer),this._shadowRendererDirectional=new Kc(this,this.shadowRenderer),this.culler=new ml(this),this.scene.clusteredLightingEnabled&&(this._renderPassUpdateClustered=new dl(this.device,this,this.shadowRenderer,this._shadowRendererLocal,this.lightTextureAtlas)),this.viewUniformFormat=null,this._skinTime=0,this._morphTime=0,this._cullTime=0,this._shadowMapTime=0,this._lightClustersTime=0,this._layerCompositionUpdateTime=0,this._shadowDrawCalls=0,this._skinDrawCalls=0,this._instancedDrawCalls=0,this._shadowMapUpdates=0,this._numDrawCallsCulled=0,this._camerasRendered=0,this._lightClusters=0,this._gsplatCount=0;let n=e.scope;this.boneTextureId=n.resolve(`texture_poseMap`),this.modelMatrixId=n.resolve(`matrix_model`),this.normalMatrixId=n.resolve(`matrix_normal`),this.viewInvId=n.resolve(`matrix_viewInverse`),this.viewPos=new Float32Array(3),this.viewPosId=n.resolve(`view_position`),this.projId=n.resolve(`matrix_projection`),this.projSkyboxId=n.resolve(`matrix_projectionSkybox`),this.viewId=n.resolve(`matrix_view`),this.viewId3=n.resolve(`matrix_view3`),this.viewProjId=n.resolve(`matrix_viewProjection`),this.flipYId=n.resolve(`projectionFlipY`),this.tbnBasis=n.resolve(`tbnBasis`),this.cameraParams=new Float32Array(4),this.cameraParamsId=n.resolve(`camera_params`),this.viewportSize=new Float32Array(4),this.viewportSizeId=n.resolve(`viewport_size`),this.viewIndexId=n.resolve(`view_index`),this.viewIndexId.setValue(0),this.blueNoiseJitterVersion=0,this.blueNoiseJitterVec=new j,this.blueNoiseJitterData=new Float32Array(4),this.blueNoiseJitterId=n.resolve(`blueNoiseJitter`),this.blueNoiseTextureId=n.resolve(`blueNoiseTex32`),this.alphaTestId=n.resolve(`alpha_ref`),this.opacityMapId=n.resolve(`texture_opacityMap`),this.exposureId=n.resolve(`exposure`),this.morphPositionTex=n.resolve(`morphPositionTex`),this.morphNormalTex=n.resolve(`morphNormalTex`),this.morphTexParams=n.resolve(`morph_tex_params`),this.lightCube=new bc,this.constantLightCube=n.resolve(`lightCube[0]`)}destroy(){this.shadowRenderer=null,this._shadowRendererLocal=null,this._shadowRendererDirectional=null,this.shadowMapCache.destroy(),this.shadowMapCache=null,this._renderPassUpdateClustered?.destroy(),this._renderPassUpdateClustered=null,this.worldClustersAllocator.destroy(),this.worldClustersAllocator=null,this.lightTextureAtlas.destroy(),this.lightTextureAtlas=null,this.gsplatDirector?.destroy(),this.gsplatDirector=null}setupViewport(e,t){let n=this.device,r=t?t.width:n.width,i=t?t.height:n.height,a=e.rect,o=Math.floor(a.x*r),s=Math.floor(a.y*i),c=Math.floor(a.z*r),l=Math.floor(a.w*i);if(n.setViewport(o,s,c,l),e._scissorRectClear){let t=e.scissorRect;o=Math.floor(t.x*r),s=Math.floor(t.y*i),c=Math.floor(t.z*r),l=Math.floor(t.w*i)}n.setScissor(o,s,c,l)}setCameraUniforms(e,t){let n=t?.flipY,r=null;if(e.xrActive)r=e.xrViews,e.updateViewTransforms();else{let r=e.projectionMatrix;e.calculateProjection&&e.calculateProjection(r,0);let i=e.getProjectionMatrixSkybox(),a=this.device.isWebGPU;r=Js.applyShaderProjectionTransform(r,El,n,a),i=Js.applyShaderProjectionTransform(i,Dl,n,a);let{jitter:o}=e,s=0,c=0;if(o>0){let e=t?t.width:this.device.width,n=t?t.height:this.device.height,a=Tl[this.device.renderVersion%Tl.length];s=o*(a.x*2-1)/e,c=o*(a.y*2-1)/n,r=Ol.copy(r),r.data[8]+=s,r.data[9]+=c,i=kl.copy(i),i.data[8]+=s,i.data[9]+=c,this.blueNoiseJitterVersion!==this.device.renderVersion&&(this.blueNoiseJitterVersion=this.device.renderVersion,this.blueNoise.vec4(this.blueNoiseJitterVec))}let l=o>0?this.blueNoiseJitterVec:j.ZERO;if(this.blueNoiseJitterData[0]=l.x,this.blueNoiseJitterData[1]=l.y,this.blueNoiseJitterData[2]=l.z,this.blueNoiseJitterData[3]=l.w,this.blueNoiseJitterId.setValue(this.blueNoiseJitterData),this.projId.setValue(r.data),this.projSkyboxId.setValue(i.data),e.calculateTransform)e.calculateTransform(_l,0);else{let t=e._node.getPosition(),n=e._node.getRotation();_l.setTRS(t,n,k.ONE)}this.viewInvId.setValue(_l.data),vl.copy(_l).invert(),this.viewId.setValue(vl.data),yl.setFromMat4(vl),this.viewId3.setValue(yl.data),gl.mul2(r,vl),this.viewProjId.setValue(gl.data),e._storeShaderMatrices(gl,s,c,this.device.renderVersion),this.dispatchViewPos(e._node.getPosition()),e.frustum.setFromMat4(gl)}this.flipYId.setValue(n?-1:1),this.tbnBasis.setValue(this.device.isWebGPU===!!n?1:-1),this.cameraParamsId.setValue(e.fillShaderParams(this.cameraParams));let i=e.xrActive?e.xrViews[0]??null:null,a=i?i.viewport.z:t?t.width:this.device.width,o=i?i.viewport.w:t?t.height:this.device.height;return a*=e.rect.z,o*=e.rect.w,this.viewportSize[0]=a,this.viewportSize[1]=o,this.viewportSize[2]=1/a,this.viewportSize[3]=1/o,this.viewportSizeId.setValue(this.viewportSize),this.exposureId.setValue(this.scene.physicalUnits?e.getExposure():this.scene.exposure),r}clear(e,t,n,r){let i=(t??e._clearColorBuffer?1:0)|(n??e._clearDepthBuffer?2:0)|(r??e._clearStencilBuffer?4:0);if(i){let t=this.device,n=e._clearColor;Cl[0]=n.r,Cl[1]=n.g,Cl[2]=n.b,Cl[3]=n.a,wl.depth=e._clearDepth,wl.stencil=e._clearStencil,wl.flags=i,t.clear(wl)}}setupCullModeAndFrontFace(e,t,n){let r=n.material,i=t*n.flipFacesFactor*n.node.worldScaleSign,a=r.frontFace;i<0&&(a=+(a===0)),this.device.setCullMode(e?r.cull:0),this.device.setFrontFace(a)}setupCullMode(e,t,n){this.setupCullModeAndFrontFace(e,t,n)}setBaseConstants(e,t){e.setCullMode(t.cull),e.setFrontFace(t.frontFace),t.opacityMap&&this.opacityMapId.setValue(t.opacityMap),(t.opacityMap||t.alphaTest>0)&&this.alphaTestId.setValue(t.alphaTest)}updateCpuSkinMatrices(e){hl++;let t=e.length;if(t!==0)for(let n=0;n<t;n++){let t=e[n].skinInstance;t&&(t.updateMatrices(e[n].node,hl),t._dirty=!0)}}updateGpuSkinMatrices(e){for(let t of e){let e=t.skinInstance;e&&e._dirty&&(e.updateMatrixPalette(t.node,hl),e._dirty=!1)}}updateMorphing(e){for(let t of e){let e=t.morphInstance;e&&e._dirty&&e.update()}}updateGSplats(e){for(let t of e)t.gsplatInstance?.update()}gpuUpdate(e){this.updateGpuSkinMatrices(e),this.updateMorphing(e),this.updateGSplats(e)}setVertexBuffers(e,t){e.setVertexBuffer(t.vertexBuffer)}setMorphing(e,t){t&&(t.prepareRendering(e),e.setVertexBuffer(t.morph.vertexBufferIds),this.morphPositionTex.setValue(t.texturePositions),this.morphNormalTex.setValue(t.textureNormals),this.morphTexParams.setValue(t._textureParams))}setSkinning(e,t){let n=t.skinInstance;if(n){this._skinDrawCalls++;let e=n.boneTexture;this.boneTextureId.setValue(e)}}dispatchViewPos(e){let t=this.viewPos;t[0]=e.x,t[1]=e.y,t[2]=e.z,this.viewPosId.setValue(t)}initViewUniformFormat(e){if(!this.viewUniformFormat){let t=[new R(`matrix_view`,14),new R(`matrix_viewInverse`,14),new R(`matrix_projection`,14),new R(`matrix_projectionSkybox`,14),new R(`matrix_viewProjection`,14),new R(`matrix_view3`,13),new R(`cubeMapRotationMatrix`,13),new R(`view_position`,4),new R(`viewport_size`,5),new R(`skyboxIntensity`,2),new R(`exposure`,2),new R(`view_index`,26)];e&&t.push(new R(`clusterCellsCountByBoundsSize`,4),new R(`clusterBoundsMin`,4),new R(`clusterBoundsDelta`,4),new R(`clusterCellsDot`,7),new R(`clusterCellsMax`,7),new R(`shadowAtlasParams`,3),new R(`clusterMaxCells`,1),new R(`numClusteredLights`,1),new R(`clusterTextureWidth`,1)),this.viewUniformFormat=new kr(this.device,t)}}setupViewUniforms(e,t){this.projId.setValue(e.projMat.data),this.projSkyboxId.setValue(e.projMat.data),this.viewId.setValue(e.viewOffMat.data),this.viewInvId.setValue(e.viewInvOffMat.data),this.viewId3.setValue(e.viewMat3.data),this.viewProjId.setValue(e.projViewOffMat.data),this.viewPosId.setValue(e.positionData),this.viewIndexId.setValue(t)}getViewUniformBuffer(e){let t=this._viewUniformBuffers.get(e);return t||(t=new vi(this.device,e,!1),this._viewUniformBuffers.set(e,t)),t}setupViewUniformBuffers(e,t){let{device:n}=this,r=this.getViewUniformBuffer(e);if(t){let e=t.length;for(let n=0;n<e;n++)this.setupViewUniforms(t[n],n),r.update(this._dynamicViewBindGroup),this._viewBindGroups[n]=this._dynamicViewBindGroup.bindGroup,this._viewBindGroupOffsets[n]=this._dynamicViewBindGroup.offsets[0]}else r.update(this._dynamicViewBindGroup),n.setBindGroup(0,this._dynamicViewBindGroup.bindGroup,this._dynamicViewBindGroup.offsets)}setupMeshUniformBuffers(e){let t=this.device;if(t.supportsUniformBuffers){let n=e.getBindGroup(t);n.update(),t.setBindGroup(1,n),e.getUniformBuffer(t).update(Sl),t.setBindGroup(2,Sl.bindGroup,Sl.offsets)}}setMeshInstanceMatrices(e,t=!1){let n=e.node.worldTransform;this.modelMatrixId.setValue(n.data),t&&this.normalMatrixId.setValue(e.node.normalMatrix.data)}collectLights(e){this.lights.length=0,this.localLights.length=0;let t=this.scene._stats,n=e.layerList.length;for(let t=0;t<n;t++){let n=e.layerList[t];if(!xl.has(n)){xl.add(n);let e=n._lights;for(let t=0;t<e.length;t++){let n=e[t];bl.has(n)||(bl.add(n),this.lights.push(n),n._type!==0&&this.localLights.push(n))}}}t.lights=this.lights.length,bl.clear(),xl.clear()}updateShaders(e,t){let n=e.length;for(let r=0;r<n;r++){let n=e[r].material;if(n&&!Al.has(n)&&(Al.add(n),n.getShaderVariant!==Nc.prototype.getShaderVariant)){if(t&&(!n.useLighting||n.emitter&&!n.emitter.lighting))continue;n.clearVariants()}}Al.clear()}updateFrameUniforms(){this.blueNoiseTextureId.setValue(Cc(this.device))}beginFrame(e){let t=this.scene,n=t.updateShaders||this.device._shadersDirty,r=0,i=e.layerList,a=i.length;for(let e=0;e<a;e++){let t=i[e].meshInstances,a=t.length;r+=a;for(let e=0;e<a;e++){let r=t[e];r.visibleThisFrame=!1,n&&jl.push(r),r.skinInstance&&Ml.push(r)}}if(n){let e=!t.updateShaders||!this.device._shadersDirty;this.updateShaders(jl,e),t.updateShaders=!1,this.device._shadersDirty=!1,t._shaderVersion++}this.updateFrameUniforms(),this.updateCpuSkinMatrices(Ml),jl.length=0,Ml.length=0}updateLightTextureAtlas(){this.lightTextureAtlas.update(this.localLights,this.scene.lighting)}updateLayerComposition(e){let t=e.layerList.length,n=this.scene._shaderVersion;for(let r=0;r<t;r++){let t=e.layerList[r];t._shaderVersion=n}e._update()}frameUpdate(){this.clustersDebugRendered=!1,this.initViewUniformFormat(this.scene.clusteredLightingEnabled),this.culler.dirLightShadows.clear()}},Pl=class{constructor(e,t,n,r){v(this,`cameraComponent`,void 0),v(this,`layer`,void 0),v(this,`transparent`,void 0),v(this,`renderTarget`,void 0),v(this,`lightClusters`,null),v(this,`clearColor`,!1),v(this,`clearDepth`,!1),v(this,`clearStencil`,!1),v(this,`firstCameraUse`,!1),v(this,`lastCameraUse`,!1),this.cameraComponent=e,this.layer=t,this.transparent=n,this.renderTarget=r}setupClears(e,t){this.clearColor=e?.clearColorBuffer||t.clearColorBuffer,this.clearDepth=e?.clearDepthBuffer||t.clearDepthBuffer,this.clearStencil=e?.clearStencilBuffer||t.clearStencilBuffer}},Fl=class extends Dr{constructor(e,t,n,r){super(e),v(this,`layerComposition`,void 0),v(this,`scene`,void 0),v(this,`renderer`,void 0),v(this,`layerRenderSteps`,[]),v(this,`gammaCorrection`,void 0),v(this,`toneMapping`,void 0),v(this,`sceneTextures`,void 0),v(this,`sceneTexturesCamera`,null),v(this,`clearSceneTextures`,!1),v(this,`noDepthClear`,!1),this.layerComposition=t,this.scene=n,this.renderer=r}get rendersAnything(){return this.layerRenderSteps.length>0}addLayerRenderStep(e){this.layerRenderSteps.push(e)}addLayer(e,t,n,r=!0){let i=new Pl(e,t,n,this.renderTarget);if(r){let n=this.layerRenderSteps.length===0;i.setupClears(n?e:void 0,t)}this.addLayerRenderStep(i)}updateDirectionalShadows(){let{renderer:e,layerRenderSteps:t}=this;for(let n=0;n<t.length;n++){let r=t[n].cameraComponent.camera,i=this.renderer.culler.cameraDirShadowLights.get(r);if(i)for(let t=0;t<i.length;t++){let n=i[t];if(e.culler.dirLightShadows.get(n)!==r){e.culler.dirLightShadows.set(n,r);let t=e._shadowRendererDirectional.getLightRenderPass(n,r);t&&this.beforePasses.push(t)}}}}updateCameraBeforePasses(){for(let e=0;e<this.layerRenderSteps.length;e++){let t=this.layerRenderSteps[e];if(t.firstCameraUse){let e=t.cameraComponent?.camera;if(e){let{beforePasses:t}=e;for(let e=0;e<t.length;e++)this.beforePasses.push(t[e])}}}}updateClears(){let e=this.layerRenderSteps[0];if(e){let t=e.cameraComponent.camera,n=t.fullSizeClearRect,r=this.sceneTextures?.length?0:void 0;this.setClearColor(n&&e.clearColor?t.clearColor:void 0,r),this.setClearDepth(n&&e.clearDepth&&!this.noDepthClear?t.clearDepth:void 0),this.setClearStencil(n&&e.clearStencil?t.clearStencil:void 0)}}frameUpdate(){super.frameUpdate(),this.updateDirectionalShadows(),this.updateCameraBeforePasses(),this.updateClears();let{renderer:e,layerComposition:t,layerRenderSteps:n}=this;for(let r=0;r<n.length;r++){let i=n[r];t.isEnabled(i.layer,i.transparent)&&e.culler.requestMeshInstanceCull(i.cameraComponent.camera,i.layer)}}before(){let{layerRenderSteps:e}=this;if(this.clearSceneTextures){let{scope:e}=this.device;this.sceneTextures.forEach(t=>{e.resolve(To[t]).setValue(null)})}for(let t=0;t<e.length;t++){let n=e[t];n.firstCameraUse&&this.scene.fire(ho,n.cameraComponent)}}execute(){let{layerComposition:e,layerRenderSteps:t}=this;for(let n=0;n<t.length;n++){let r=t[n],i=r.layer;e.isEnabled(i,r.transparent)&&this.renderLayerRenderStep(r,n===0)}}after(){let e=this.sceneTextures;if(this.sceneTexturesCamera&&e?.length){let{renderTarget:t}=this;for(let n=0;n<e.length;n++){let r=To[e[n]],i=t.getColorBuffer(n+1);this.device.scope.resolve(r).setValue(i),e[n]===`depth`&&this.sceneTexturesCamera.publishSceneDepthMap(i,this.device.renderVersion)}}for(let e=0;e<this.layerRenderSteps.length;e++){let t=this.layerRenderSteps[e];t.lastCameraUse&&this.scene.fire(go,t.cameraComponent)}this.beforePasses.length=0}renderLayerRenderStep(e,t){let{renderer:n,scene:r}=this,i=n.device,{layer:a,transparent:o,cameraComponent:s}=e;if(s){let c=s.gammaCorrection,l=s.toneMapping,u=s.shaderParams.sceneTextures;this.sceneTextures!==void 0&&(s.shaderParams.sceneTextures=this.sceneTextures),this.gammaCorrection!==void 0&&(s.gammaCorrection=this.gammaCorrection),this.toneMapping!==void 0&&(s.toneMapping=this.toneMapping),r.fire(_o,s,a,o);let d={lightClusters:e.lightClusters},f=s.camera.shaderPassInfo?.index??0;(!t||!s.camera.fullSizeClearRect)&&(d.clearColor=e.clearColor,d.clearDepth=e.clearDepth,d.clearStencil=e.clearStencil);let p=e.renderTarget??i.backBuffer;n.renderForwardLayer(s.camera,p,a,o,f,d),i.setBlendState(Vn.NOBLEND),i.setStencilState(null,null),i.setAlphaToCoverage(!1),r.fire(vo,s,a,o),this.gammaCorrection!==void 0&&(s.gammaCorrection=c),this.toneMapping!==void 0&&(s.toneMapping=l),this.sceneTextures!==void 0&&(s.shaderParams.sceneTextures=u)}}},Il=class extends wr{constructor(e,t,n){super(e),this.renderer=t,this.renderAction=n}execute(){this.renderAction.camera.onPostprocessing()}},Ll=new Vn,Rl=[];function zl(e,t){if(e.hasAttachmentOverrides)return e;let n=Rl[t]??(Rl[t]=new Map),r=e.key,i=n.get(r);if(!i){Ll.copy(e),Ll.setColorWrite(!1,!1,!1,!1),i=e.clone();for(let e=1;e<t;e++)i.setAttachment(e,Ll);n.set(r,i)}return i}var Bl=[[],[],[]],Vl=new O,Hl={drawCalls:[],shaderInstances:[],isNewMaterial:[],lightMaskChanged:[],clear:function(){this.drawCalls.length=0,this.shaderInstances.length=0,this.isNewMaterial.length=0,this.lightMaskChanged.length=0}};function Ul(e){let t=[];for(let n=0;n<e;++n){let r=Math.sqrt(n+.5)/Math.sqrt(e);t.push(r)}return t}function Wl(e){let t=[];for(let n=0;n<e;n++){let r=n/e,i=Math.sqrt(r*r);t.push(i)}return t}var Gl=class extends Nl{constructor(e,t){super(e,t);let n=this.device;this._forwardDrawCalls=0,this._materialSwitches=0,this._depthMapTime=0,this._forwardTime=0,this._sortTime=0;let r=n.scope;this.fogColorId=r.resolve(`fog_color`),this.fogStartId=r.resolve(`fog_start`),this.fogEndId=r.resolve(`fog_end`),this.fogDensityId=r.resolve(`fog_density`),this.ambientId=r.resolve(`light_globalAmbient`),this.skyboxIntensityId=r.resolve(`skyboxIntensity`),this.cubeMapRotationMatrixId=r.resolve(`cubeMapRotationMatrix`),this.pcssDiskSamplesId=r.resolve(`pcssDiskSamples[0]`),this.pcssSphereSamplesId=r.resolve(`pcssSphereSamples[0]`),this.lightColorId=[],this.lightDir=[],this.lightDirId=[],this.lightShadowMapId=[],this.lightShadowMatrixId=[],this.lightShadowParamsId=[],this.lightShadowIntensity=[],this.lightRadiusId=[],this.lightPos=[],this.lightPosId=[],this.lightWidth=[],this.lightWidthId=[],this.lightHeight=[],this.lightHeightId=[],this.lightInAngleId=[],this.lightOutAngleId=[],this.lightCookieId=[],this.lightCookieIntId=[],this.lightCookieMatrixId=[],this.lightCookieOffsetId=[],this.lightShadowSearchAreaId=[],this.lightCameraParamsId=[],this.lightSoftShadowParamsId=[],this.shadowMatrixPaletteId=[],this.shadowCascadeDistancesId=[],this.shadowCascadeCountId=[],this.shadowCascadeBlendId=[],this.shadowCascadeRadiiId=[],this.screenSizeId=r.resolve(`uScreenSize`),this._screenSize=new Float32Array(4),this.fogColor=new Float32Array(3),this.ambientColor=new Float32Array(3),this.pcssDiskSamples=Ul(16),this.pcssSphereSamples=Wl(16)}destroy(){super.destroy()}dispatchGlobalLights(e){let t=this.ambientColor;if(Vl.linear(e.ambientLight),t[0]=Vl.r,t[1]=Vl.g,t[2]=Vl.b,e.physicalUnits)for(let n=0;n<3;n++)t[n]*=e.ambientLuminance;this.ambientId.setValue(t),this.skyboxIntensityId.setValue(e.physicalUnits?e.skyboxLuminance:e.skyboxIntensity),this.cubeMapRotationMatrixId.setValue(e._skyboxRotationMat3.data)}_resolveLight(e,t){let n=`light${t}`;this.lightColorId[t]=e.resolve(`${n}_color`),this.lightDir[t]=new Float32Array(3),this.lightDirId[t]=e.resolve(`${n}_direction`),this.lightShadowMapId[t]=e.resolve(`${n}_shadowMap`),this.lightShadowMatrixId[t]=e.resolve(`${n}_shadowMatrix`),this.lightShadowParamsId[t]=e.resolve(`${n}_shadowParams`),this.lightShadowIntensity[t]=e.resolve(`${n}_shadowIntensity`),this.lightShadowSearchAreaId[t]=e.resolve(`${n}_shadowSearchArea`),this.lightRadiusId[t]=e.resolve(`${n}_radius`),this.lightPos[t]=new Float32Array(3),this.lightPosId[t]=e.resolve(`${n}_position`),this.lightWidth[t]=new Float32Array(3),this.lightWidthId[t]=e.resolve(`${n}_halfWidth`),this.lightHeight[t]=new Float32Array(3),this.lightHeightId[t]=e.resolve(`${n}_halfHeight`),this.lightInAngleId[t]=e.resolve(`${n}_innerConeAngle`),this.lightOutAngleId[t]=e.resolve(`${n}_outerConeAngle`),this.lightCookieId[t]=e.resolve(`${n}_cookie`),this.lightCookieIntId[t]=e.resolve(`${n}_cookieIntensity`),this.lightCookieMatrixId[t]=e.resolve(`${n}_cookieMatrix`),this.lightCookieOffsetId[t]=e.resolve(`${n}_cookieOffset`),this.lightCameraParamsId[t]=e.resolve(`${n}_cameraParams`),this.lightSoftShadowParamsId[t]=e.resolve(`${n}_softShadowParams`),this.shadowMatrixPaletteId[t]=e.resolve(`${n}_shadowMatrixPalette[0]`),this.shadowCascadeDistancesId[t]=e.resolve(`${n}_shadowCascadeDistances`),this.shadowCascadeCountId[t]=e.resolve(`${n}_shadowCascadeCount`),this.shadowCascadeBlendId[t]=e.resolve(`${n}_shadowCascadeBlend`),this.shadowCascadeRadiiId[t]=e.resolve(`${n}_shadowCascadeRadii`)}setLTCDirectionalLight(e,t,n,r,i){this.lightPos[t][0]=r.x-n.x*i,this.lightPos[t][1]=r.y-n.y*i,this.lightPos[t][2]=r.z-n.z*i,this.lightPosId[t].setValue(this.lightPos[t]);let a=e.transformVector(new k(-.5,0,0));this.lightWidth[t][0]=a.x*i,this.lightWidth[t][1]=a.y*i,this.lightWidth[t][2]=a.z*i,this.lightWidthId[t].setValue(this.lightWidth[t]);let o=e.transformVector(new k(0,0,.5));this.lightHeight[t][0]=o.x*i,this.lightHeight[t][1]=o.y*i,this.lightHeight[t][2]=o.z*i,this.lightHeightId[t].setValue(this.lightHeight[t])}dispatchDirectLights(e,t,n){let r=0,i=this.device.scope;for(let a=0;a<e.length;a++){if(!(e[a].mask&t))continue;let o=e[a],s=o._node.getWorldTransform();if(this.lightColorId[r]||this._resolveLight(i,r),this.lightColorId[r].setValue(o._colorLinear),s.getY(o._direction).mulScalar(-1),o._direction.normalize(),this.lightDir[r][0]=o._direction.x,this.lightDir[r][1]=o._direction.y,this.lightDir[r][2]=o._direction.z,this.lightDirId[r].setValue(this.lightDir[r]),o.shape!==0&&this.setLTCDirectionalLight(s,r,o._direction,n._node.getPosition(),n.farClip),o.castShadows){let e=o.getRenderData(n,0),t=o._getUniformBiasValues(e);if(this.lightShadowMapId[r].setValue(e.shadowBuffer),this.lightShadowMatrixId[r].setValue(e.shadowMatrix.data),this.shadowMatrixPaletteId[r].setValue(o._shadowMatrixPalette),this.shadowCascadeDistancesId[r].setValue(o._shadowCascadeDistances),this.shadowCascadeCountId[r].setValue(o.numCascades),this.shadowCascadeBlendId[r].setValue(1-o.cascadeBlend),this.lightShadowIntensity[r].setValue(o.shadowIntensity),o._isPcss){this.lightSoftShadowParamsId[r].setValue(o._softShadowParams),e.shadowCamera.renderTarget&&this.lightShadowSearchAreaId[r].setValue(o.penumbraSize/e.shadowCamera.renderTarget.width*e.projectionCompensation);let t=o._shadowCameraParams;t.length=4,t[0]=e.projectionCompensation,t[1]=e.shadowCamera._farClip,t[2]=e.shadowCamera._nearClip,t[3]=1,this.lightCameraParamsId[r].setValue(t);let i=o._shadowCascadeRadii??(o._shadowCascadeRadii=new Float32Array(4));for(let t=0;t<4;t++){let r=t<o.numCascades?o.getRenderData(n,t).projectionCompensation:0;i[t]=r>0?r:e.projectionCompensation}this.shadowCascadeRadiiId[r].setValue(i)}let i=o._shadowRenderParams;i.length=4,i[0]=o._shadowResolution,i[1]=t.normalBias,i[2]=t.bias,i[3]=0,this.lightShadowParamsId[r].setValue(i)}r++}return r}setLTCPositionalLight(e,t){let n=e.transformVector(new k(-.5,0,0));this.lightWidth[t][0]=n.x,this.lightWidth[t][1]=n.y,this.lightWidth[t][2]=n.z,this.lightWidthId[t].setValue(this.lightWidth[t]);let r=e.transformVector(new k(0,0,.5));this.lightHeight[t][0]=r.x,this.lightHeight[t][1]=r.y,this.lightHeight[t][2]=r.z,this.lightHeightId[t].setValue(this.lightHeight[t])}dispatchOmniLight(e,t,n){let r=t._node.getWorldTransform();if(this.lightColorId[n]||this._resolveLight(e,n),this.lightRadiusId[n].setValue(t.attenuationEnd),this.lightColorId[n].setValue(t._colorLinear),r.getTranslation(t._position),this.lightPos[n][0]=t._position.x,this.lightPos[n][1]=t._position.y,this.lightPos[n][2]=t._position.z,this.lightPosId[n].setValue(this.lightPos[n]),t.shape!==0&&this.setLTCPositionalLight(r,n),t.castShadows){let e=t.getRenderData(null,0);this.lightShadowMapId[n].setValue(e.shadowBuffer);let r=t._getUniformBiasValues(e),i=t._shadowRenderParams;i.length=4,i[0]=t._shadowResolution,i[1]=r.normalBias,i[2]=r.bias,i[3]=1/t.attenuationEnd,this.lightShadowParamsId[n].setValue(i),this.lightShadowIntensity[n].setValue(t.shadowIntensity);let a=t.penumbraSize/e.shadowCamera.renderTarget.width;this.lightShadowSearchAreaId[n].setValue(a);let o=t._shadowCameraParams;o.length=4,o[0]=0,o[1]=e.shadowCamera._farClip,o[2]=e.shadowCamera._nearClip,o[3]=0,this.lightCameraParamsId[n].setValue(o)}t._cookie&&(this.lightCookieId[n].setValue(t._cookie),this.lightShadowMatrixId[n].setValue(r.data),this.lightCookieIntId[n].setValue(t.cookieIntensity))}dispatchSpotLight(e,t,n){let r=t._node.getWorldTransform();if(this.lightColorId[n]||this._resolveLight(e,n),this.lightInAngleId[n].setValue(t._innerConeAngleCos),this.lightOutAngleId[n].setValue(t._outerConeAngleCos),this.lightRadiusId[n].setValue(t.attenuationEnd),this.lightColorId[n].setValue(t._colorLinear),r.getTranslation(t._position),this.lightPos[n][0]=t._position.x,this.lightPos[n][1]=t._position.y,this.lightPos[n][2]=t._position.z,this.lightPosId[n].setValue(this.lightPos[n]),t.shape!==0&&this.setLTCPositionalLight(r,n),r.getY(t._direction).mulScalar(-1),t._direction.normalize(),this.lightDir[n][0]=t._direction.x,this.lightDir[n][1]=t._direction.y,this.lightDir[n][2]=t._direction.z,this.lightDirId[n].setValue(this.lightDir[n]),t.castShadows){let e=t.getRenderData(null,0);this.lightShadowMapId[n].setValue(e.shadowBuffer),this.lightShadowMatrixId[n].setValue(e.shadowMatrix.data);let r=t._getUniformBiasValues(e),i=t._shadowRenderParams;i.length=4,i[0]=t._shadowResolution,i[1]=r.normalBias,i[2]=r.bias,i[3]=1/t.attenuationEnd,this.lightShadowParamsId[n].setValue(i),this.lightShadowIntensity[n].setValue(t.shadowIntensity);let a=t.penumbraSize/e.shadowCamera.renderTarget.width,o=e.shadowCamera._fov*E.DEG_TO_RAD,s=1/Math.tan(o/2);this.lightShadowSearchAreaId[n].setValue(a*s);let c=t._shadowCameraParams;c.length=4,c[0]=0,c[1]=e.shadowCamera._farClip,c[2]=e.shadowCamera._nearClip,c[3]=0,this.lightCameraParamsId[n].setValue(c)}if(t._cookie){if(!t.castShadows){let e=Qs.evalSpotCookieMatrix(t);this.lightShadowMatrixId[n].setValue(e.data)}this.lightCookieId[n].setValue(t._cookie),this.lightCookieIntId[n].setValue(t.cookieIntensity),t._cookieTransform&&(t._cookieTransformUniform[0]=t._cookieTransform.x,t._cookieTransformUniform[1]=t._cookieTransform.y,t._cookieTransformUniform[2]=t._cookieTransform.z,t._cookieTransformUniform[3]=t._cookieTransform.w,this.lightCookieMatrixId[n].setValue(t._cookieTransformUniform),t._cookieOffsetUniform[0]=t._cookieOffset.x,t._cookieOffsetUniform[1]=t._cookieOffset.y,this.lightCookieOffsetId[n].setValue(t._cookieOffsetUniform))}}dispatchLocalLights(e,t,n){let r=n,i=this.device.scope,a=e[1],o=a.length;for(let e=0;e<o;e++){let n=a[e];n.mask&t&&(this.dispatchOmniLight(i,n,r),r++)}let s=e[2],c=s.length;for(let e=0;e<c;e++){let n=s[e];n.mask&t&&(this.dispatchSpotLight(i,n,r),r++)}}renderForwardPrepareMaterials(e,t,n,r,i,a,o){let s=e.fogParams??this.scene.fog,c=e.shaderParams;c.fog=s.type,c.srgbRenderTarget=t?.isColorBufferSrgb(0)??!1;let l=(e,t,n,r)=>{Hl.drawCalls.push(e),Hl.shaderInstances.push(t),Hl.isNewMaterial.push(n),Hl.lightMaskChanged.push(r)};Hl.clear();let u=this.device,d=this.scene,f=d.clusteredLightingEnabled,p=i?.getLightHash(f)??0,m=null,h,g,_=n.length;for(let t=0;t<_;t++){let i=n[t];if(!(i.shaderPassMask&1<<a))continue;let s=i.instancingData;if(s&&s.count<=0&&!i.getDrawCommands(e))continue;i.ensureMaterial(u);let f=i.material,_=i._shaderDefs,v=i.mask;f&&f===m&&_!==h&&(m=null),f!==m&&(this._materialSwitches++,f._scene=d,f.prepareForRender(u,d)),l(i,i.getShaderInstance(a,p,d,c,o,r),f!==m,!m||v!==g),m=f,h=_,g=v}return Hl}renderForwardInternal(e,t,n,r,i,a){let o=this.device,s=this.scene,c=a?-1:1,l=s.clusteredLightingEnabled,u=e.shaderParams.sceneTextures.length>0?o.renderTarget?.colorBufferCount??1:1,d=e.xrActive&&e.xrViews.length?e.xrViews:null,f=o.xrCurrentViewIndex??-1,p=d&&f>=0?f:0,m=d&&f>=0?f+1:d?d.length:0,h=t.drawCalls.length;for(let r=0;r<h;r++){let a=t.drawCalls[r],s=t.isNewMaterial[r],f=t.lightMaskChanged[r],g=t.shaderInstances[r],_=a.material,v=a.mask;if(g.shader.failed)continue;if(s){if(o.setShader(g.shader,!1),_.setParameters(o),f){let t=this.dispatchDirectLights(n[0],v,e);l||this.dispatchLocalLights(n,v,t)}this.alphaTestId.setValue(_.alphaTest);let t=u>1&&!_.sceneTexturesWrite?zl(_.blendState,u):_.blendState;o.setBlendState(t),o.setDepthState(_.depthState),o.setAlphaToCoverage(_.alphaToCoverage)}this.setupCullModeAndFrontFace(e._cullFaces,c,a);let y=a.stencilFront??_.stencilFront,b=a.stencilBack??_.stencilBack;o.setStencilState(y,b),a.setParameters(o),o.scope.resolve(`meshInstanceId`).setValue(a.id);let x=a.mesh;this.setVertexBuffers(o,x),this.setMorphing(o,a.morphInstance),this.setSkinning(o,a);let S=a.instancingData;S&&o.setVertexBuffer(S.vertexBuffer),this.setMeshInstanceMatrices(a,!0),this.setupMeshUniformBuffers(g);let C=a.renderStyle,w=x.indexBuffer[C];i?.(a,r);let T=a.getDrawCommands(e);if(d)for(let e=p;e<m;e++){let t=d[e];o.setViewport(t.viewport.x,t.viewport.y,t.viewport.z,t.viewport.w),this._viewOffsetScratch[0]=this._viewBindGroupOffsets[e],o.setBindGroup(0,this._viewBindGroups[e],this._viewOffsetScratch);let n=e===p,r=e===m-1;o.draw(x.primitive[C],w,S?.count,T,n,r),this._forwardDrawCalls++,a.instancingData&&this._instancedDrawCalls++}else o.draw(x.primitive[C],w,S?.count,T),this._forwardDrawCalls++,a.instancingData&&this._instancedDrawCalls++;r<h-1&&!t.isNewMaterial[r+1]&&_.setParameters(o,a.parameters)}}renderForward(e,t,n,r,i,a,o,s,c){let l=this.renderForwardPrepareMaterials(e,t,n,r,o,i,c);this.renderForwardInternal(e,l,r,i,a,s),Hl.clear()}renderForwardLayer(e,t,n,r,i,a={}){let{scene:o}=this,s=o.clusteredLightingEnabled;this.setupViewport(e,t);let c,l;if(n){n.sortVisible(e,r);let t=n.getCulledInstances(e);c=r?t.transparent:t.opaque,o.immediate.onPreRenderLayer(n,c,r),n.requiresLightCube&&(this.lightCube.update(o.ambientLight,n._lights),this.constantLightCube.setValue(this.lightCube.colors)),l=n.splitLights}else c=a.meshInstances,l=a.splitLights??Bl;s&&((a.lightClusters??this.worldClustersAllocator.empty).activate(),n&&!this.clustersDebugRendered&&o.lighting.debugLayer===n.id&&(this.clustersDebugRendered=!0)),o._activeCamera=e;let u=e.fogParams??this.scene.fog;this.setFogConstants(u);let d=this.setCameraUniforms(e,t);this.initViewUniformFormat(o.clusteredLightingEnabled);let f=a.viewUniformFormat??this.viewUniformFormat;this.setupViewUniformBuffers(f,d);let p=a.clearColor??!1,m=a.clearDepth??!1,h=a.clearStencil??!1;(p||m||h)&&this.clear(e,p,m,h);let g=!!(e._flipFaces^t?.flipY),_=this._forwardDrawCalls;this.renderForward(e,t,c,l,i,a.drawCallback??null,n,g,f),n&&(n._forwardDrawCalls+=this._forwardDrawCalls-_)}setFogConstants(e){if(e.type!==`none`){Vl.linear(e.color);let t=this.fogColor;t[0]=Vl.r,t[1]=Vl.g,t[2]=Vl.b,this.fogColorId.setValue(t),e.type===`linear`?(this.fogStartId.setValue(e.start),this.fogEndId.setValue(e.end)):this.fogDensityId.setValue(e.density)}}setSceneConstants(){let e=this.scene;this.dispatchGlobalLights(e);let t=this.device;this._screenSize[0]=t.width,this._screenSize[1]=t.height,this._screenSize[2]=1/t.width,this._screenSize[3]=1/t.height,this.screenSizeId.setValue(this._screenSize),this.pcssDiskSamplesId.setValue(this.pcssDiskSamples),this.pcssSphereSamplesId.setValue(this.pcssSphereSamples)}buildFrameGraph(e,t){let n=this.scene;if(e.reset(),n.clusteredLightingEnabled){let{shadowsEnabled:t,cookiesEnabled:r}=n.lighting;this._renderPassUpdateClustered.update(e,t,r,this.lights,this.localLights),e.addRenderPass(this._renderPassUpdateClustered)}else this._shadowRendererLocal.buildNonClusteredRenderPasses(e,this.localLights);let r=0,i=!0,a=null,o=t._renderActions;for(let n=r;n<o.length;n++){let s=o[n],{layer:c,camera:l}=s,u=this._isMultiview(l);if(s.useCameraPasses)u&&e.beginMultiView(this.device),l.camera.framePasses.forEach(t=>{e.addRenderPass(t)}),u&&e.endMultiView();else{let d=c.id===1,f=d&&(l.renderSceneColorMap||l.renderSceneDepthMap);i&&(i=!1,r=n,a=s.renderTarget);let p=o[n+1],m=(p?!p.useCameraPasses&&p.layer.id===1:!1)&&(l.renderSceneColorMap||l.renderSceneDepthMap),h=p?p.firstCameraUse&&this.culler.cameraDirShadowLights.has(p.camera.camera):!1;if(!p||p.renderTarget!==a||p.camera!==l||h||m||f){let o=d&&r===n;if(u&&(l.renderSceneColorMap||l.renderSceneDepthMap||s.triggerPostprocess&&l?.onPostprocessing),u&&e.beginMultiView(this.device),o||this.addMainRenderPass(e,t,a,r,n),d){if(l.renderSceneColorMap){let t=l.camera.renderPassColorGrab;t.source=l.renderTarget,e.addRenderPass(t)}l.renderSceneDepthMap&&e.addRenderPass(l.camera.renderPassDepthGrab)}if(s.triggerPostprocess&&l?.onPostprocessing){let t=new Il(this.device,this,s);e.addRenderPass(t)}u&&e.endMultiView(),i=!0}}}}_isMultiview(e){let t=e.camera;return this.device.isWebGPU&&!!t?.xrActive&&t.xrViews.length>=2}addMainRenderPass(e,t,n,r,i){let a=new Fl(this.device,t,this.scene,this);a.init(n);let o=t._renderActions;for(let e=r;e<=i;e++)a.addLayerRenderStep(this._layerRenderStepFromRenderAction(o[e]));e.addRenderPass(a)}_layerRenderStepFromRenderAction(e){let t=new Pl(e.camera,e.layer,e.transparent,e.renderTarget);return t.clearColor=e.clearColor,t.clearDepth=e.clearDepth,t.clearStencil=e.clearStencil,t.firstCameraUse=e.firstCameraUse,t.lastCameraUse=e.lastCameraUse,t}update(e){this.frameUpdate(),this.shadowRenderer.frameUpdate(),this.scene._updateSkyMesh(),this.updateLayerComposition(e),this.collectLights(e),this.beginFrame(e),this.setSceneConstants(),this.gsplatDirector?.update(e),this.culler.updateLightVisibility(e)}cull(e){this.culler.cullComposition(e),this.gsplatDirector?.updateShadows(),this.gpuUpdate(this.culler.processingMeshInstances),this.culler.consumeOneShotShadows()}},Kl=0,ql=[],Jl=new Set;function Yl(e,t){return e.drawOrder-t.drawOrder}function Xl(e,t){let n=e._sortKeyForward,r=t._sortKeyForward;return n===r?t.mesh.id-e.mesh.id:r-n}function Zl(e,t){return t._sortKeyDynamic-e._sortKeyDynamic}function Ql(e,t){return e._sortKeyDynamic-t._sortKeyDynamic}var $l=[null,Yl,Xl,Zl,Ql],eu=class{constructor(){v(this,`opaque`,[]),v(this,`transparent`,[])}},tu=class{constructor(e={}){v(this,`id`,void 0),v(this,`name`,void 0),v(this,`_enabled`,!0),v(this,`_refCounter`,1),v(this,`opaqueSortMode`,2),v(this,`transparentSortMode`,3),v(this,`customSortCallback`,null),v(this,`customCalculateSortValues`,null),v(this,`_clearColorBuffer`,!1),v(this,`_clearDepthBuffer`,!1),v(this,`_clearStencilBuffer`,!1),v(this,`onEnable`,void 0),v(this,`onDisable`,void 0),v(this,`meshInstances`,[]),v(this,`meshInstancesSet`,new Set),v(this,`shadowCasters`,[]),v(this,`shadowCastersSet`,new Set),v(this,`_visibleInstances`,new WeakMap),v(this,`_lights`,[]),v(this,`_lightsSet`,new Set),v(this,`_clusteredLightsSet`,new Set),v(this,`_splitLights`,[[],[],[]]),v(this,`_splitLightsDirty`,!0),v(this,`_lightHash`,0),v(this,`_lightHashDirty`,!1),v(this,`_lightIdHash`,0),v(this,`_lightIdHashDirty`,!1),v(this,`requiresLightCube`,!1),v(this,`cameras`,[]),v(this,`camerasSet`,new Set),v(this,`gsplatPlacements`,[]),v(this,`gsplatPlacementsSet`,new Set),v(this,`gsplatShadowCasters`,[]),v(this,`gsplatShadowCastersSet`,new Set),v(this,`gsplatPlacementsDirty`,!0),v(this,`_dirtyComposition`,!1),v(this,`_shaderVersion`,-1),e.id===void 0?this.id=Kl++:(this.id=e.id,Kl=Math.max(this.id+1,Kl)),this.name=e.name,this._enabled=e.enabled??!0,this._refCounter=+!!this._enabled,this.opaqueSortMode=e.opaqueSortMode??2,this.transparentSortMode=e.transparentSortMode??3,this._clearColorBuffer=!!e.clearColorBuffer,this._clearDepthBuffer=!!e.clearDepthBuffer,this._clearStencilBuffer=!!e.clearStencilBuffer,this.onEnable=e.onEnable,this.onDisable=e.onDisable,this._enabled&&this.onEnable&&this.onEnable()}set enabled(e){e!==this._enabled&&(this._dirtyComposition=!0,this.gsplatPlacementsDirty=!0,this._enabled=e,e?(this.incrementCounter(),this.onEnable&&this.onEnable()):(this.decrementCounter(),this.onDisable&&this.onDisable()))}get enabled(){return this._enabled}set clearColorBuffer(e){this._clearColorBuffer=e,this._dirtyComposition=!0}get clearColorBuffer(){return this._clearColorBuffer}set clearDepthBuffer(e){this._clearDepthBuffer=e,this._dirtyComposition=!0}get clearDepthBuffer(){return this._clearDepthBuffer}set clearStencilBuffer(e){this._clearStencilBuffer=e,this._dirtyComposition=!0}get clearStencilBuffer(){return this._clearStencilBuffer}get hasClusteredLights(){return this._clusteredLightsSet.size>0}get clusteredLightsSet(){return this._clusteredLightsSet}incrementCounter(){this._refCounter===0&&(this._enabled=!0,this.onEnable&&this.onEnable()),this._refCounter++}decrementCounter(){if(this._refCounter===1)this._enabled=!1,this.onDisable&&this.onDisable();else if(this._refCounter===0)return;this._refCounter--}addGSplatPlacement(e){this.gsplatPlacementsSet.has(e)||(this.gsplatPlacements.push(e),this.gsplatPlacementsSet.add(e),this.gsplatPlacementsDirty=!0)}removeGSplatPlacement(e){let t=this.gsplatPlacements.indexOf(e);t>=0&&(this.gsplatPlacements.splice(t,1),this.gsplatPlacementsSet.delete(e),this.gsplatPlacementsDirty=!0)}addGSplatShadowCaster(e){this.gsplatShadowCastersSet.has(e)||(this.gsplatShadowCasters.push(e),this.gsplatShadowCastersSet.add(e),this.gsplatPlacementsDirty=!0)}removeGSplatShadowCaster(e){let t=this.gsplatShadowCasters.indexOf(e);t>=0&&(this.gsplatShadowCasters.splice(t,1),this.gsplatShadowCastersSet.delete(e),this.gsplatPlacementsDirty=!0)}addMeshInstances(e,t){let n=this.meshInstances,r=this.meshInstancesSet;Jl.clear();for(let t=0;t<e.length;t++){let i=e[t];if(!r.has(i)){n.push(i),r.add(i);let e=i.material;e&&Jl.add(e)}}if(t||this.addShadowCasters(e),Jl.size>0){let e=this._shaderVersion;Jl.forEach(t=>{e>=0&&t._shaderVersion!==e&&(t.getShaderVariant!==Nc.prototype.getShaderVariant&&t.clearVariants(),t._shaderVersion=e)}),Jl.clear()}}removeMeshInstances(e,t){let n=this.meshInstances,r=this.meshInstancesSet;for(let t=0;t<e.length;t++){let i=e[t];if(r.has(i)){r.delete(i);let e=n.indexOf(i);e>=0&&n.splice(e,1)}}t||this.removeShadowCasters(e)}addShadowCasters(e){let t=this.shadowCasters,n=this.shadowCastersSet;for(let r=0;r<e.length;r++){let i=e[r];i.castShadow&&!n.has(i)&&(n.add(i),t.push(i))}}removeShadowCasters(e){let t=this.shadowCasters,n=this.shadowCastersSet;for(let r=0;r<e.length;r++){let i=e[r];if(n.has(i)){n.delete(i);let e=t.indexOf(i);e>=0&&t.splice(e,1)}}}clearMeshInstances(e=!1){this.meshInstances.length=0,this.meshInstancesSet.clear(),e||(this.shadowCasters.length=0,this.shadowCastersSet.clear())}markLightsDirty(){this._lightHashDirty=!0,this._lightIdHashDirty=!0,this._splitLightsDirty=!0}hasLight(e){return this._lightsSet.has(e)}addLight(e){let t=e.light;this._lightsSet.has(t)||(this._lightsSet.add(t),this._lights.push(t),this.markLightsDirty()),t.type!==0&&this._clusteredLightsSet.add(t)}removeLight(e){let t=e.light;this._lightsSet.has(t)&&(this._lightsSet.delete(t),this._lights.splice(this._lights.indexOf(t),1),this.markLightsDirty()),t.type!==0&&this._clusteredLightsSet.delete(t)}clearLights(){this._lightsSet.forEach(e=>e.removeLayer(this)),this._lightsSet.clear(),this._clusteredLightsSet.clear(),this._lights.length=0,this.markLightsDirty()}get splitLights(){if(this._splitLightsDirty){this._splitLightsDirty=!1;let e=this._splitLights;for(let t=0;t<e.length;t++)e[t].length=0;let t=this._lights;for(let n=0;n<t.length;n++){let r=t[n];r.enabled&&e[r._type].push(r)}for(let t=0;t<e.length;t++)e[t].sort((e,t)=>e.key-t.key)}return this._splitLights}evaluateLightHash(e,t,n){let r=0,i=this._lights;for(let r=0;r<i.length;r++){let a=i[r].type!==0;(e&&a||t&&!a)&&ql.push(n?i[r].id:i[r].key)}return ql.length>0&&(ql.sort(),r=ar(ql),ql.length=0),r}getLightHash(e){return this._lightHashDirty&&(this._lightHashDirty=!1,this._lightHash=this.evaluateLightHash(!e,!0,!1)),this._lightHash}getLightIdHash(){return this._lightIdHashDirty&&(this._lightIdHashDirty=!1,this._lightIdHash=this.evaluateLightHash(!0,!1,!0)),this._lightIdHash}addCamera(e){this.camerasSet.has(e.camera)||(this.camerasSet.add(e.camera),this.cameras.push(e),this._dirtyComposition=!0)}removeCamera(e){if(this.camerasSet.has(e.camera)){this.camerasSet.delete(e.camera);let t=this.cameras.indexOf(e);this.cameras.splice(t,1),this._dirtyComposition=!0}}clearCameras(){this.cameras.length=0,this.camerasSet.clear(),this._dirtyComposition=!0}_calculateSortDistances(e,t,n){let r=e.length,{x:i,y:a,z:o}=t,{x:s,y:c,z:l}=n;for(let u=0;u<r;u++){let r=e[u],d;if(r.calculateSortDistance)d=r.calculateSortDistance(r,t,n);else{let e=r.aabb.center;d=(e.x-i)*s+(e.y-a)*c+(e.z-o)*l}r._sortKeyDynamic=r._drawBucket*1e9+d}}getCulledInstances(e){let t=this._visibleInstances.get(e);return t||(t=new eu,this._visibleInstances.set(e,t)),t}sortVisible(e,t){let n=t?this.transparentSortMode:this.opaqueSortMode;if(n===0)return;let r=this.getCulledInstances(e),i=t?r.transparent:r.opaque,a=e.node;if(n===5){let e=a.getPosition(),t=a.forward;this.customCalculateSortValues&&this.customCalculateSortValues(i,i.length,e,t),this.customSortCallback&&i.sort(this.customSortCallback)}else{if(n===3||n===4){let e=a.getPosition(),t=a.forward;this._calculateSortDistances(i,e,t)}i.sort($l[n])}}},nu=(e,t)=>e.priority-t.priority,ru=e=>e.sort(nu),iu=class{constructor(){v(this,`camera`,null),this.layer=null,this.transparent=!1,this.renderTarget=null,this.clearColor=!1,this.clearDepth=!1,this.clearStencil=!1,this.triggerPostprocess=!1,this.firstCameraUse=!1,this.lastCameraUse=!1,this.useCameraPasses=!1}setupClears(e,t){this.clearColor=e?.clearColorBuffer||t.clearColorBuffer,this.clearDepth=e?.clearDepthBuffer||t.clearDepthBuffer,this.clearStencil=e?.clearStencilBuffer||t.clearStencilBuffer}},au=class extends b{constructor(e=`Untitled`){super(),v(this,`layerList`,[]),v(this,`layerIdMap`,new Map),v(this,`layerNameMap`,new Map),v(this,`layerOpaqueIndexMap`,new Map),v(this,`layerTransparentIndexMap`,new Map),v(this,`subLayerList`,[]),v(this,`subLayerEnabled`,[]),v(this,`cameras`,[]),v(this,`camerasSet`,new Set),v(this,`_renderActions`,[]),v(this,`_dirty`,!1),this.name=e,this._opaqueOrder={},this._transparentOrder={}}markDirty(){this._dirty=!0}_update(){let e=this.layerList.length;if(!this._dirty){for(let t=0;t<e;t++)if(this.layerList[t]._dirtyComposition){this._dirty=!0;break}}if(this._dirty){this._dirty=!1,this.cameras.length=0,this.camerasSet.clear();for(let t=0;t<e;t++){let e=this.layerList[t];e._dirtyComposition=!1;for(let t=0;t<e.cameras.length;t++){let n=e.cameras[t];this.camerasSet.has(n.camera)||(this.camerasSet.add(n.camera),this.cameras.push(n))}}this.cameras.length>1&&ru(this.cameras);let t=[],n=0;this._renderActions.length=0;for(let r=0;r<this.cameras.length;r++){let i=this.cameras[r];if(t.length=0,i.camera.framePasses.length>0){this.addDummyRenderAction(n,i),n++;continue}let a=!0,o=n,s=null,c=!1;for(let r=0;r<e;r++){let e=this.layerList[r];if(e.enabled&&this.subLayerEnabled[r]&&e.cameras.length>0&&i.layers.indexOf(e.id)>=0){t.push(e),!c&&e.id===i.disablePostEffectsLayer&&(c=!0,s&&(s.triggerPostprocess=!0));let o=this.subLayerList[r];s=this.addRenderAction(n,e,o,i,a,c),n++,a=!1}}o<n&&(s.lastCameraUse=!0),!c&&s&&(s.triggerPostprocess=!0),i.renderTarget&&i.postEffectsEnabled&&this.propagateRenderTarget(o-1,i)}this._logRenderActions()}}getNextRenderAction(e){let t=new iu;return this._renderActions.push(t),t}addDummyRenderAction(e,t){let n=this.getNextRenderAction(e);n.camera=t,n.useCameraPasses=!0}addRenderAction(e,t,n,r,i,a){let o=t.id===1?null:r.renderTarget,s=!1,c=this._renderActions;for(let t=e-1;t>=0;t--)if(c[t].camera===r&&c[t].renderTarget===o){s=!0;break}a&&r.postEffectsEnabled&&(o=null);let l=this.getNextRenderAction(e);l.triggerPostprocess=!1,l.layer=t,l.transparent=n,l.camera=r,l.renderTarget=o,l.firstCameraUse=i,l.lastCameraUse=!1;let u=i||!s,d=t.clearColorBuffer||t.clearDepthBuffer||t.clearStencilBuffer;return(u||d)&&l.setupClears(u?r:void 0,t),l}propagateRenderTarget(e,t){for(let n=e;n>=0;n--){let e=this._renderActions[n],r=e.layer;if(e.renderTarget&&r.id!==1)break;if(r.id===1)continue;if(e.useCameraPasses)break;let i=e?.camera.camera;if(i&&(!t.camera.rect.equals(i.rect)||!t.camera.scissorRect.equals(i.scissorRect)))break;e.renderTarget=t.renderTarget}}_logRenderActions(){}_isLayerAdded(e){return this.layerIdMap.get(e.id)===e}_isSublayerAdded(e,t){return(t?this.layerTransparentIndexMap:this.layerOpaqueIndexMap).get(e)!==void 0}push(e){this._isLayerAdded(e)||(this.layerList.push(e),this.layerList.push(e),this._opaqueOrder[e.id]=this.subLayerList.push(!1)-1,this._transparentOrder[e.id]=this.subLayerList.push(!0)-1,this.subLayerEnabled.push(!0),this.subLayerEnabled.push(!0),this._updateLayerMaps(),this._dirty=!0,this.fire(`add`,e))}insert(e,t){if(this._isLayerAdded(e))return;this.layerList.splice(t,0,e,e),this.subLayerList.splice(t,0,!1,!0);let n=this.layerList.length;this._updateOpaqueOrder(t,n-1),this._updateTransparentOrder(t,n-1),this.subLayerEnabled.splice(t,0,!0,!0),this._updateLayerMaps(),this._dirty=!0,this.fire(`add`,e)}remove(e){let t=this.layerList.indexOf(e);for(delete this._opaqueOrder[t],delete this._transparentOrder[t];t>=0;)this.layerList.splice(t,1),this.subLayerList.splice(t,1),this.subLayerEnabled.splice(t,1),t=this.layerList.indexOf(e),this._dirty=!0,this.fire(`remove`,e);let n=this.layerList.length;this._updateOpaqueOrder(0,n-1),this._updateTransparentOrder(0,n-1),this._updateLayerMaps()}pushOpaque(e){this._isSublayerAdded(e,!1)||(this.layerList.push(e),this._opaqueOrder[e.id]=this.subLayerList.push(!1)-1,this.subLayerEnabled.push(!0),this._updateLayerMaps(),this._dirty=!0,this.fire(`add`,e))}insertOpaque(e,t){if(this._isSublayerAdded(e,!1))return;this.layerList.splice(t,0,e),this.subLayerList.splice(t,0,!1);let n=this.subLayerList.length;this._updateOpaqueOrder(t,n-1),this.subLayerEnabled.splice(t,0,!0),this._updateLayerMaps(),this._dirty=!0,this.fire(`add`,e)}removeOpaque(e){for(let t=0,n=this.layerList.length;t<n;t++)if(this.layerList[t]===e&&!this.subLayerList[t]){this.layerList.splice(t,1),this.subLayerList.splice(t,1),n--,this._updateOpaqueOrder(t,n-1),this.subLayerEnabled.splice(t,1),this._dirty=!0,this.layerList.indexOf(e)<0&&this.fire(`remove`,e);break}this._updateLayerMaps()}pushTransparent(e){this._isSublayerAdded(e,!0)||(this.layerList.push(e),this._transparentOrder[e.id]=this.subLayerList.push(!0)-1,this.subLayerEnabled.push(!0),this._updateLayerMaps(),this._dirty=!0,this.fire(`add`,e))}insertTransparent(e,t){if(this._isSublayerAdded(e,!0))return;this.layerList.splice(t,0,e),this.subLayerList.splice(t,0,!0);let n=this.subLayerList.length;this._updateTransparentOrder(t,n-1),this.subLayerEnabled.splice(t,0,!0),this._updateLayerMaps(),this._dirty=!0,this.fire(`add`,e)}removeTransparent(e){for(let t=0,n=this.layerList.length;t<n;t++)if(this.layerList[t]===e&&this.subLayerList[t]){this.layerList.splice(t,1),this.subLayerList.splice(t,1),n--,this._updateTransparentOrder(t,n-1),this.subLayerEnabled.splice(t,1),this._dirty=!0,this.layerList.indexOf(e)<0&&this.fire(`remove`,e);break}this._updateLayerMaps()}getOpaqueIndex(e){return this.layerOpaqueIndexMap.get(e)??-1}getTransparentIndex(e){return this.layerTransparentIndexMap.get(e)??-1}isEnabled(e,t){if(e.enabled){let n=t?this.getTransparentIndex(e):this.getOpaqueIndex(e);if(n>=0)return this.subLayerEnabled[n]}return!1}isSubLayerRenderedByCamera(e,t){let n=this.layerList[e];return n.enabled&&this.subLayerEnabled[e]&&n.camerasSet.has(t)}_updateLayerMaps(){this.layerIdMap.clear(),this.layerNameMap.clear(),this.layerOpaqueIndexMap.clear(),this.layerTransparentIndexMap.clear();for(let e=0;e<this.layerList.length;e++){let t=this.layerList[e];this.layerIdMap.set(t.id,t),this.layerNameMap.set(t.name,t),(this.subLayerList[e]?this.layerTransparentIndexMap:this.layerOpaqueIndexMap).set(t,e)}}getLayerById(e){return this.layerIdMap.get(e)??null}getLayerByName(e){return this.layerNameMap.get(e)??null}_updateOpaqueOrder(e,t){for(let n=e;n<=t;n++)this.subLayerList[n]===!1&&(this._opaqueOrder[this.layerList[n].id]=n)}_updateTransparentOrder(e,t){for(let n=e;n<=t;n++)this.subLayerList[n]===!0&&(this._transparentOrder[this.layerList[n].id]=n)}_sortLayersDescending(e,t,n){let r=-1,i=-1;for(let t=0,i=e.length;t<i;t++){let i=e[t];n.hasOwnProperty(i)&&(r=Math.max(r,n[i]))}for(let e=0,r=t.length;e<r;e++){let r=t[e];n.hasOwnProperty(r)&&(i=Math.max(i,n[r]))}return r===-1&&i!==-1?1:i===-1&&r!==-1?-1:i-r}sortTransparentLayers(e,t){return this._sortLayersDescending(e,t,this._transparentOrder)}sortOpaqueLayers(e,t){return this._sortLayersDescending(e,t,this._opaqueOrder)}},ou=new k,su={bias:0,normalBias:0},cu=new O,lu={r:0,g:1,b:2,a:3},uu={directional:0,omni:1,point:1,spot:2},du=[[new j(0,0,1,1)],[new j(0,0,.5,.5),new j(0,.5,.5,.5)],[new j(0,0,.5,.5),new j(0,.5,.5,.5),new j(.5,0,.5,.5)],[new j(0,0,.5,.5),new j(0,.5,.5,.5),new j(.5,0,.5,.5),new j(.5,.5,.5,.5)]],fu={rrr:1,ggg:2,bbb:4,aaa:8,rgb:7},pu=0,mu=class{constructor(e,t,n){this.light=n,this.camera=e,this.shadowCamera=rl.createShadowCamera(n.device,n._shadowType,n._type,t),this.shadowMatrix=new M,this.shadowViewport=new j(0,0,1,1),this.shadowScissor=new j(0,0,1,1),this.projectionCompensation=0,this.face=t,this.visibleCasters=[]}get shadowBuffer(){let e=this.shadowCamera.renderTarget;return e?this.light._isPcf?e.depthBuffer:e.colorBuffer:null}},hu=class e{constructor(e,t){v(this,`layers`,new Set),v(this,`clusteredLighting`,void 0),v(this,`shadowDepthState`,qn.DEFAULT.clone()),v(this,`volumetricScattering`,1),v(this,`clusteredFlags`,0),v(this,`clusteredData`,new Uint32Array(3)),v(this,`clusteredData16`,new Uint16Array(this.clusteredData.buffer)),v(this,`_evtDeviceRestored`,null),this.device=e,this.clusteredLighting=t,this.id=pu++,this._evtDeviceRestored=e.on(`devicerestored`,this.onDeviceRestored,this),this._type=0,this._color=new O(.8,.8,.8),this._intensity=1,this._affectSpecularity=!0,this._luminance=0,this._castShadows=!1,this._enabled=!1,this._mask=1,this.isStatic=!1,this.key=0,this.bakeDir=!0,this.bakeNumSamples=1,this.bakeArea=0,this.attenuationStart=10,this.attenuationEnd=10,this._falloffMode=0,this._shadowType=0,this._vsmBlurSize=11,this.vsmBlurMode=1,this.vsmBias=.0025,this._cookie=null,this.cookieIntensity=1,this._cookieFalloff=!0,this._cookieChannel=`rgb`,this._cookieTransform=null,this._cookieTransformUniform=new Float32Array(4),this._cookieOffset=null,this._cookieOffsetUniform=new Float32Array(2),this._cookieTransformSet=!1,this._cookieOffsetSet=!1,this._innerConeAngle=40,this._outerConeAngle=45,this.cascades=null,this._shadowMatrixPalette=null,this._shadowCascadeDistances=null,this.numCascades=1,this._cascadeBlend=0,this.cascadeDistribution=.5,this._shape=0,this._colorLinear=new Float32Array(3),this._updateLinearColor(),this._position=new k(0,0,0),this._direction=new k(0,0,0),this._innerConeAngleCos=Math.cos(this._innerConeAngle*E.DEG_TO_RAD),this._updateOuterAngle(this._outerConeAngle),this._usePhysicalUnits=void 0,this._shadowMap=null,this._shadowRenderParams=[],this._shadowCameraParams=[],this._shadowCascadeRadii=null,this.shadowDistance=40,this._shadowResolution=1024,this._shadowBias=-5e-4,this._shadowIntensity=1,this._normalOffsetBias=0,this.shadowUpdateMode=2,this.shadowUpdateOverrides=null,this._isVsm=!1,this._isPcf=!0,this._isPcss=!1,this._softShadowParams=new Float32Array(4),this.shadowSamples=16,this.shadowBlockerSamples=16,this.penumbraSize=1,this.penumbraFalloff=1,this._cookieMatrix=null,this._atlasViewport=null,this.atlasViewportAllocated=!1,this.atlasVersion=0,this.atlasSlotIndex=0,this.atlasSlotUpdated=!1,this.cookieRenderVersion=-1,this._node=null,this._renderData=[],this.visibleThisFrame=!1,this.maxScreenSize=0,this._updateShadowBias()}destroy(){this._evtDeviceRestored?.off(),this._evtDeviceRestored=null,this._destroyShadowMap(),this.releaseRenderData(),this._renderData=null}onDeviceRestored(){this.shadowUpdateMode===0&&(this.shadowUpdateMode=1)}releaseRenderData(){this._renderData&&(this._renderData.length=0)}addLayer(e){this.layers.add(e)}removeLayer(e){this.layers.delete(e)}set shadowSamples(e){this._softShadowParams[0]=e}get shadowSamples(){return this._softShadowParams[0]}set shadowBlockerSamples(e){this._softShadowParams[1]=e}get shadowBlockerSamples(){return this._softShadowParams[1]}set shadowBias(e){this._shadowBias!==e&&(this._shadowBias=e,this._updateShadowBias())}get shadowBias(){return this._shadowBias}set numCascades(e){(!this.cascades||this.numCascades!==e)&&(this.cascades=du[e-1],this._shadowMatrixPalette=new Float32Array(64),this._shadowCascadeDistances=new Float32Array(4),this._destroyShadowMap(),this.updateKey())}get numCascades(){return this.cascades.length}set cascadeBlend(e){this._cascadeBlend!==e&&(this._cascadeBlend=e,this.updateKey())}get cascadeBlend(){return this._cascadeBlend}set shadowMap(e){this._shadowMap!==e&&(this._destroyShadowMap(),this._shadowMap=e)}get shadowMap(){return this._shadowMap}set mask(e){this._mask!==e&&(this._mask=e,this.updateKey(),this.updateClusteredFlags())}get mask(){return this._mask}get numShadowFaces(){let e=this._type;return e===0?this.numCascades:e===1?6:1}set type(e){if(this._type===e)return;this._type=e,this._destroyShadowMap(),this._updateShadowBias(),this.updateKey(),this.updateClusteredFlags();let t=this._shadowType;this._shadowType=null,this.shadowUpdateOverrides=null,this.shadowType=t}get type(){return this._type}set shape(e){if(this._shape===e)return;this._shape=e,this._destroyShadowMap(),this.updateKey(),this.updateClusteredFlags();let t=this._shadowType;this._shadowType=null,this.shadowType=t}get shape(){return this._shape}set usePhysicalUnits(e){this._usePhysicalUnits!==e&&(this._usePhysicalUnits=e,this._updateLinearColor())}get usePhysicalUnits(){return this._usePhysicalUnits}set shadowType(e){if(this._shadowType===e)return;let t=Pa.get(e);t||(e=0);let n=this.device;e===6&&(!n.textureFloatRenderable||!n.textureFloatFilterable)&&(e=0),this._type===1&&e!==5&&e!==0&&e!==7&&e!==8&&e!==6&&(e=0),e===3&&(!n.textureFloatRenderable||!n.textureFloatFilterable)&&(e=2),e===2&&!n.textureHalfFloatRenderable&&(e=0),t=Pa.get(e),this._isVsm=t?.vsm??!1,this._isPcf=t?.pcf??!1,this._isPcss=t?.pcss??!1,this._shadowType=e,this._updateShadowBias(),this._destroyShadowMap(),this.updateKey()}get shadowType(){return this._shadowType}set enabled(e){this._enabled!==e&&(this._enabled=e,this.layersDirty())}get enabled(){return this._enabled}set castShadows(e){this._castShadows!==e&&(this._castShadows=e,this._destroyShadowMap(),this.layersDirty(),this.updateKey())}get castShadows(){return this._castShadows&&this._mask!==4&&this._mask!==0}set shadowIntensity(e){this._shadowIntensity!==e&&(this._shadowIntensity=e,this.updateKey())}get shadowIntensity(){return this._shadowIntensity}get bakeShadows(){return this._castShadows&&this._mask===4}set shadowResolution(e){this._shadowResolution!==e&&(e=this._type===1?Math.min(e,this.device.maxCubeMapSize):Math.min(e,this.device.maxTextureSize),this._shadowResolution=e,this._destroyShadowMap())}get shadowResolution(){return this._shadowResolution}set vsmBlurSize(e){this._vsmBlurSize!==e&&(e%2==0&&e++,this._vsmBlurSize=e)}get vsmBlurSize(){return this._vsmBlurSize}set normalOffsetBias(e){if(this._normalOffsetBias!==e){let t=!this._normalOffsetBias&&e||this._normalOffsetBias&&!e;this._normalOffsetBias=e,t&&this.updateKey()}}get normalOffsetBias(){return this._normalOffsetBias}set falloffMode(e){this._falloffMode!==e&&(this._falloffMode=e,this.updateKey(),this.updateClusteredFlags())}get falloffMode(){return this._falloffMode}set innerConeAngle(e){this._innerConeAngle!==e&&(this._innerConeAngle=e,this._innerConeAngleCos=Math.cos(e*E.DEG_TO_RAD),this.updateClusterData(!1,!0),this._usePhysicalUnits&&this._updateLinearColor())}get innerConeAngle(){return this._innerConeAngle}set outerConeAngle(e){this._outerConeAngle!==e&&(this._outerConeAngle=e,this._updateOuterAngle(e),this._usePhysicalUnits&&this._updateLinearColor())}get outerConeAngle(){return this._outerConeAngle}set penumbraSize(e){this._penumbraSize=e,this._softShadowParams[2]=e}get penumbraSize(){return this._penumbraSize}set penumbraFalloff(e){this._softShadowParams[3]=e}get penumbraFalloff(){return this._softShadowParams[3]}_updateOuterAngle(e){let t=e*E.DEG_TO_RAD;this._outerConeAngleCos=Math.cos(t),this._outerConeAngleSin=Math.sin(t),this.updateClusterData(!1,!0)}set intensity(e){this._intensity!==e&&(this._intensity=e,this._updateLinearColor())}get intensity(){return this._intensity}set affectSpecularity(e){this._type===0&&(this._affectSpecularity=e,this.updateKey())}get affectSpecularity(){return this._affectSpecularity}set luminance(e){this._luminance!==e&&(this._luminance=e,this._updateLinearColor())}get luminance(){return this._luminance}get cookieMatrix(){return this._cookieMatrix||(this._cookieMatrix=new M),this._cookieMatrix}get atlasViewport(){return this._atlasViewport||(this._atlasViewport=new j(0,0,1,1)),this._atlasViewport}set cookie(e){this._cookie!==e&&(this._cookie=e,this.updateKey())}get cookie(){return this._cookie}set cookieFalloff(e){this._cookieFalloff!==e&&(this._cookieFalloff=e,this.updateKey())}get cookieFalloff(){return this._cookieFalloff}set cookieChannel(e){if(this._cookieChannel!==e){if(e.length<3){let t=e.charAt(e.length-1),n=3-e.length;for(let r=0;r<n;r++)e+=t}this._cookieChannel=e,this.updateKey(),this.updateClusteredFlags()}}get cookieChannel(){return this._cookieChannel}set cookieTransform(e){this._cookieTransform!==e&&(this._cookieTransform=e,this._cookieTransformSet=!!e,e&&!this._cookieOffset&&(this.cookieOffset=new A,this._cookieOffsetSet=!1),this.updateKey())}get cookieTransform(){return this._cookieTransform}set cookieOffset(e){this._cookieOffset!==e&&((this._cookieTransformSet||e)&&!e&&this._cookieOffset?this._cookieOffset.set(0,0):this._cookieOffset=e,this._cookieOffsetSet=!!e,e&&!this._cookieTransform&&(this.cookieTransform=new j(1,1,0,0),this._cookieTransformSet=!1),this.updateKey())}get cookieOffset(){return this._cookieOffset}beginFrame(){this.visibleThisFrame=this._type===0&&this._enabled,this.maxScreenSize=0,this.atlasViewportAllocated=!1,this.atlasSlotUpdated=!1}_destroyShadowMap(){if(this.releaseRenderData(),this._shadowMap&&(this._shadowMap.cached||this._shadowMap.destroy(),this._shadowMap=null),this.shadowUpdateMode===0&&(this.shadowUpdateMode=1),this.shadowUpdateOverrides)for(let e=0;e<this.shadowUpdateOverrides.length;e++)this.shadowUpdateOverrides[e]===0&&(this.shadowUpdateOverrides[e]=1)}getRenderData(e,t){for(let n=0;n<this._renderData.length;n++){let r=this._renderData[n];if(r.camera===e&&r.face===t)return r}let n=new mu(e,t,this);return this._renderData.push(n),n}clone(){let t=new e(this.device,this.clusteredLighting);return t.type=this._type,t.setColor(this._color),t.intensity=this._intensity,t.affectSpecularity=this._affectSpecularity,t.luminance=this._luminance,t.castShadows=this.castShadows,t._enabled=this._enabled,t.attenuationStart=this.attenuationStart,t.attenuationEnd=this.attenuationEnd,t.falloffMode=this._falloffMode,t.shadowType=this._shadowType,t.vsmBlurSize=this._vsmBlurSize,t.vsmBlurMode=this.vsmBlurMode,t.vsmBias=this.vsmBias,t.shadowUpdateMode=this.shadowUpdateMode,t.mask=this.mask,this.shadowUpdateOverrides&&(t.shadowUpdateOverrides=this.shadowUpdateOverrides.slice()),t.innerConeAngle=this._innerConeAngle,t.outerConeAngle=this._outerConeAngle,t.numCascades=this.numCascades,t.cascadeDistribution=this.cascadeDistribution,t.cascadeBlend=this._cascadeBlend,t.shape=this._shape,t.shadowDepthState.copy(this.shadowDepthState),t.shadowBias=this.shadowBias,t.normalOffsetBias=this._normalOffsetBias,t.shadowResolution=this._shadowResolution,t.shadowDistance=this.shadowDistance,t.shadowIntensity=this.shadowIntensity,t.shadowSamples=this.shadowSamples,t.shadowBlockerSamples=this.shadowBlockerSamples,t.penumbraSize=this.penumbraSize,t.penumbraFalloff=this.penumbraFalloff,t.volumetricScattering=this.volumetricScattering,t}static getLightUnitConversion(e,t=Math.PI/4,n=0){switch(e){case 2:{let e=Math.cos(t),r=Math.cos(n);return 2*Math.PI*(1-r+(r-e)/2)}case 1:return 4*Math.PI;case 0:return 1}}_getUniformBiasValues(e){let t=e.shadowCamera._farClip;switch(this._type){case 1:su.bias=this.shadowBias,su.normalBias=this._normalOffsetBias;break;case 2:su.bias=this._isVsm?-2e-4:this.shadowBias*20,su.normalBias=this._isVsm?this.vsmBias/(this.attenuationEnd/7):this._normalOffsetBias;break;case 0:su.bias=this._isVsm?-2e-4:this.shadowBias/t*100,su.normalBias=this._isVsm?this.vsmBias/(t/7):this._normalOffsetBias}return su}getColor(){return this._color}getBoundingSphere(e){if(this._type===2){let t=this.attenuationEnd,n=this._outerConeAngle,r=this._outerConeAngleCos,i=this._node;ou.copy(i.up),n>45?(e.radius=t*this._outerConeAngleSin,ou.mulScalar(-t*r)):(e.radius=t/(2*r),ou.mulScalar(-e.radius)),e.center.add2(i.getPosition(),ou)}else this._type===1&&(e.center.copy(this._node.getPosition()),e.radius=this.attenuationEnd)}getBoundingBox(e){if(this._type===2){let t=this.attenuationEnd,n=this._outerConeAngle,r=this._node,i=Math.abs(Math.sin(n*E.DEG_TO_RAD)*t);e.center.set(0,-t*.5,0),e.halfExtents.set(i,t*.5,i),e.setFromTransformedAabb(e,r.getWorldTransform(),!0)}else this._type===1&&(e.center.copy(this._node.getPosition()),e.halfExtents.set(this.attenuationEnd,this.attenuationEnd,this.attenuationEnd))}_updateShadowBias(){if(this._type===1&&!this.clusteredLighting||this._isPcss)this.shadowDepthState.depthBias=0,this.shadowDepthState.depthBiasSlope=0;else{let e=this.shadowBias*-1e3;this.shadowDepthState.depthBias=e,this.shadowDepthState.depthBiasSlope=e}}_updateLinearColor(){let t=this._intensity;this._usePhysicalUnits&&(t=this._luminance/e.getLightUnitConversion(this._type,this._outerConeAngle*E.DEG_TO_RAD,this._innerConeAngle*E.DEG_TO_RAD));let n=this._color,r=this._colorLinear;t>=1?cu.linear(n).mulScalar(t):cu.copy(n).mulScalar(t).linear(),r[0]=cu.r,r[1]=cu.g,r[2]=cu.b,this.updateClusterData(!0)}setColor(){arguments.length===1?this._color.set(arguments[0].r,arguments[0].g,arguments[0].b):arguments.length===3&&this._color.set(arguments[0],arguments[1],arguments[2]),this._updateLinearColor()}layersDirty(){this.layers.forEach(e=>{e.hasLight(this)&&e.markLightsDirty()})}updateKey(){let e=this._type<<29|this._shadowType<<25|this._falloffMode<<23|(this._normalOffsetBias===0?0:1)<<22|!!this._cookie<<21|!!this._cookieFalloff<<20|lu[this._cookieChannel.charAt(0)]<<18|!!this._cookieTransform<<12|this._shape<<10|(this.numCascades>1)<<9|(this._cascadeBlend>0)<<8|!!this.affectSpecularity<<7|this.mask<<6|!!this._castShadows<<3;this._cookieChannel.length===3&&(e|=lu[this._cookieChannel.charAt(1)]<<16,e|=lu[this._cookieChannel.charAt(2)]<<14),e!==this.key&&this.layersDirty(),this.key=e}updateClusteredFlags(){let e=!!(this.mask&1),t=!!(this.mask&2);this.clusteredFlags=(this.type===2)<<30|(this._shape&3)<<28|(this._falloffMode&1)<<27|(fu[this._cookieChannel]??0)<<23|!!e<<22|!!t<<21}getClusteredFlags(e,t){return this.clusteredFlags|((e?Math.floor(this.shadowIntensity*255):0)&255)<<0|((t?Math.floor(this.cookieIntensity*255):0)&255)<<8}updateClusterData(e,t){let{clusteredData16:n}=this,r=ne.float2Half;if(e&&(n[0]=r(E.clamp(this._colorLinear[0]/100,0,65504)),n[1]=r(E.clamp(this._colorLinear[1]/100,0,65504)),n[2]=r(E.clamp(this._colorLinear[2]/100,0,65504))),t){let e=.5,t=0,i=.99,a=Math.cos(this._innerConeAngle*i*E.DEG_TO_RAD);a>e&&(a=1-a,t|=1);let o=Math.cos(this._outerConeAngle*i*E.DEG_TO_RAD);o>e&&(o=1-o,t|=2),n[3]=t,n[4]=r(a),n[5]=r(o)}}},gu=class{constructor(e,t,n){v(this,`_areaLightsEnabled`,!1),v(this,`_cells`,new k(10,3,10)),v(this,`_maxLightsPerCell`,255),v(this,`_maxLights`,255),v(this,`_shadowsEnabled`,!0),v(this,`_shadowType`,0),v(this,`_shadowAtlasResolution`,2048),v(this,`_cookiesEnabled`,!1),v(this,`_cookieAtlasResolution`,2048),v(this,`debugLayer`,void 0),v(this,`atlasSplit`,null),this._supportsAreaLights=e,this._maxTextureSize=t,this._dirtyLightsFnc=n}applySettings(e){this.shadowsEnabled=e.lightingShadowsEnabled??this.shadowsEnabled,this.cookiesEnabled=e.lightingCookiesEnabled??this.cookiesEnabled,this.areaLightsEnabled=e.lightingAreaLightsEnabled??this.areaLightsEnabled,this.shadowAtlasResolution=e.lightingShadowAtlasResolution??this.shadowAtlasResolution,this.cookieAtlasResolution=e.lightingCookieAtlasResolution??this.cookieAtlasResolution,this.maxLightsPerCell=e.lightingMaxLightsPerCell??this.maxLightsPerCell,this.maxLights=e.lightingMaxLights??this.maxLights,this.shadowType=e.lightingShadowType??this.shadowType,e.lightingCells&&(this.cells=new k(e.lightingCells))}set cells(e){this._cells.copy(e)}get cells(){return this._cells}set maxLightsPerCell(e){this._maxLightsPerCell=E.clamp(e,1,255)}get maxLightsPerCell(){return this._maxLightsPerCell}set maxLights(e){this._maxLights=E.clamp(e,1,Math.min(65535,this._maxTextureSize-1))}get maxLights(){return this._maxLights}set cookieAtlasResolution(e){this._cookieAtlasResolution=E.clamp(e,32,this._maxTextureSize)}get cookieAtlasResolution(){return this._cookieAtlasResolution}set shadowAtlasResolution(e){this._shadowAtlasResolution=E.clamp(e,32,this._maxTextureSize)}get shadowAtlasResolution(){return this._shadowAtlasResolution}set shadowType(e){this._shadowType!==e&&(this._shadowType=e,this._dirtyLightsFnc())}get shadowType(){return this._shadowType}set cookiesEnabled(e){this._cookiesEnabled!==e&&(this._cookiesEnabled=e,this._dirtyLightsFnc())}get cookiesEnabled(){return this._cookiesEnabled}set areaLightsEnabled(e){this._supportsAreaLights&&this._areaLightsEnabled!==e&&(this._areaLightsEnabled=e,this._dirtyLightsFnc())}get areaLightsEnabled(){return this._areaLightsEnabled}set shadowsEnabled(e){this._shadowsEnabled!==e&&(this._shadowsEnabled=e,this._dirtyLightsFnc())}get shadowsEnabled(){return this._shadowsEnabled}},_u=class e{constructor(e){this.morph=e,e.incRefCount(),this.device=e.device;let t=e._targets.length;this.shader=this._createShader(t),this._weights=[],this._weightMap=new Map;for(let t=0;t<e._targets.length;t++){let n=e._targets[t];n.name&&this._weightMap.set(n.name,t),this.setWeight(t,n.defaultWeight)}this._shaderMorphWeights=new Float32Array(t),this._shaderMorphIndex=new Uint32Array(t);let n=(t,n)=>(this[n]=e._createTexture(t,e._renderTextureFormat),new gr({colorBuffer:this[n],depth:!1}));e.morphPositions&&(this.rtPositions=n(`MorphRTPos`,`texturePositions`)),e.morphNormals&&(this.rtNormals=n(`MorphRTNrm`,`textureNormals`)),this._textureParams=new Float32Array([e.morphTextureWidth,e.morphTextureHeight]);let r=e.aabb.halfExtents;this._aabbSize=new Float32Array([r.x*4,r.y*4,r.z*4]);let i=e.aabb.getMin();this._aabbMin=new Float32Array([i.x*2,i.y*2,i.z*2]),this._aabbNrmSize=new Float32Array([2,2,2]),this._aabbNrmMin=new Float32Array([-1,-1,-1]),this.aabbSizeId=this.device.scope.resolve(`aabbSize`),this.aabbMinId=this.device.scope.resolve(`aabbMin`),this.morphTextureId=this.device.scope.resolve(`morphTexture`),this.morphFactor=this.device.scope.resolve(`morphFactor[0]`),this.morphIndex=this.device.scope.resolve(`morphIndex[0]`),this.countId=this.device.scope.resolve(`count`),this.zeroTextures=!1}destroy(){this.shader=null;let e=this.morph;e&&(this.morph=null,e.decRefCount(),e.refCount<1&&e.destroy()),this.rtPositions?.destroy(),this.rtPositions=null,this.texturePositions?.destroy(),this.texturePositions=null,this.rtNormals?.destroy(),this.rtNormals=null,this.textureNormals?.destroy(),this.textureNormals=null}clone(){return new e(this.morph)}_getWeightIndex(e){return typeof e==`string`?this._weightMap.get(e):e}getWeight(e){let t=this._getWeightIndex(e);return this._weights[t]}setWeight(e,t){let n=this._getWeightIndex(e);this._weights[n]=t,this._dirty=!0}_createShader(e){let t=new Map;t.set(`{MORPH_TEXTURE_MAX_COUNT}`,e),this.morph.intRenderFormat&&t.set(`MORPH_INT`,``);let n=this.morph.intRenderFormat?`uvec4`:`vec4`;return zo.createShader(this.device,{uniqueName:`TextureMorphShader_${e}-${this.morph.intRenderFormat?`int`:`float`}`,attributes:{vertex_position:P},vertexChunk:`morphVS`,fragmentChunk:`morphPS`,fragmentDefines:t,fragmentOutputTypes:[n]})}_updateTextureRenderTarget(e,t,n){let{morph:r,device:i}=this;this.setAabbUniforms(n),this.morphTextureId.setValue(n?r.targetsTexturePositions:r.targetsTextureNormals),i.setBlendState(Vn.NOBLEND),this.countId.setValue(t),this.morphFactor.setValue(this._shaderMorphWeights),this.morphIndex.setValue(this._shaderMorphIndex),qo(i,e,this.shader)}_updateTextureMorph(e){this.device,(e>0||!this.zeroTextures)&&(this.rtPositions&&this._updateTextureRenderTarget(this.rtPositions,e,!0),this.rtNormals&&this._updateTextureRenderTarget(this.rtNormals,e,!1),this.zeroTextures=e===0)}setAabbUniforms(e=!0){this.aabbSizeId.setValue(e?this._aabbSize:this._aabbNrmSize),this.aabbMinId.setValue(e?this._aabbMin:this._aabbNrmMin)}prepareRendering(e){this.setAabbUniforms()}update(){this._dirty=!1;let e=this.morph._targets,t=this._shaderMorphWeights,n=this._shaderMorphIndex,r=0;for(let i=0;i<e.length;i++)Math.abs(this.getWeight(i))>1e-5&&(t[r]=this.getWeight(i),n[r]=i,r++);this._updateTextureMorph(r)}},vu=new class extends Ao{generateKey(e){let t=e.shaderDesc,n=t.vertexGLSL?ir(t.vertexGLSL):0,r=t.fragmentGLSL?ir(t.fragmentGLSL):0,i=t.vertexWGSL?ir(t.vertexWGSL):0,a=t.fragmentWGSL?ir(t.fragmentWGSL):0,o=Ao.definesHash(e.defines),s=e.shaderChunks?.key??``,c=`${t.uniqueName}_${o}_${n}_${r}_${i}_${a}_${s}`;return e.skin&&(c+=`_skin`),e.useInstancing&&(c+=`_inst`),e.useMorphPosition&&(c+=`_morphp`),e.useMorphNormal&&(c+=`_morphn`),e.useMorphTextureBasedInt&&(c+=`_morphi`),e.useDualSourceBlending&&(c+=`_dualSource`),c}createAttributesDefinition(e,t){let n=t.shaderDesc.attributes,r=n?{...n}:void 0;t.skin&&(r.vertex_boneWeights=$e,r.vertex_boneIndices=et),(t.useMorphPosition||t.useMorphNormal)&&(r.morph_vertex_id=Et),e.attributes=r}addSharedDefines(e,t){t.skin&&e.set(`SKIN`,!0),t.useInstancing&&e.set(`INSTANCING`,!0),(t.useMorphPosition||t.useMorphNormal)&&(e.set(`MORPHING`,!0),t.useMorphTextureBasedInt&&e.set(`MORPHING_INT`,!0),t.useMorphPosition&&e.set(`MORPHING_POSITION`,!0),t.useMorphNormal&&e.set(`MORPHING_NORMAL`,!0))}createVertexDefinition(e,t,n,r){let i=t.shaderDesc,a=new Map(n);a.set(`transformInstancingVS`,``);let o=new Map(t.defines);this.addSharedDefines(o,t),e.vertexCode=r?i.vertexWGSL:i.vertexGLSL,e.vertexIncludes=a,e.vertexDefines=o}createFragmentDefinition(e,t,n,r){let i=t.shaderDesc,a=new Map(n),o=new Map(t.defines);this.addSharedDefines(o,t),e.fragmentCode=r?i.fragmentWGSL:i.fragmentGLSL,e.fragmentIncludes=a,e.fragmentDefines=o}createShaderDefinition(e,t){let n=t.shaderDesc,r=e.isWebGPU&&!!n.vertexWGSL&&!!n.fragmentWGSL&&(t.shaderChunks?.useWGSL??!0),i={name:`ShaderMaterial-${n.uniqueName}`,shaderLanguage:r?Rt:Lt,fragmentOutputTypes:n.fragmentOutputTypes,useDualSourceBlending:t.useDualSourceBlending,meshUniformBufferFormat:n.meshUniformBufferFormat,meshBindGroupFormat:n.meshBindGroupFormat},a=r?Rt:Lt,o=Lo.merge(Io.get(e,a),t.shaderChunks[a]);return this.createAttributesDefinition(i,t),this.createVertexDefinition(i,t,o,r),this.createFragmentDefinition(i,t,o,r),fi.createDefinition(e,i)}},yu=class extends Nc{constructor(e){super(),v(this,`_shaderDesc`,void 0),this.sceneTexturesWrite=!1,this.shaderDesc=e}set shaderDesc(e){if(this._shaderDesc=void 0,e&&(this._shaderDesc={uniqueName:e.uniqueName,attributes:e.attributes,fragmentOutputTypes:e.fragmentOutputTypes,vertexGLSL:e.vertexGLSL,fragmentGLSL:e.fragmentGLSL,vertexWGSL:e.vertexWGSL,fragmentWGSL:e.fragmentWGSL},e.vertexCode||e.fragmentCode||e.shaderLanguage)){let t=e.shaderLanguage??`glsl`;t===`glsl`?(this._shaderDesc.vertexGLSL=e.vertexCode,this._shaderDesc.fragmentGLSL=e.fragmentCode):t===`wgsl`&&(this._shaderDesc.vertexWGSL=e.vertexCode,this._shaderDesc.fragmentWGSL=e.fragmentCode)}this.clearVariants()}get shaderDesc(){return this._shaderDesc}copy(e){return super.copy(e),this.shaderDesc=e.shaderDesc,this}getShaderVariant(e){let{objDefs:t}=e,n=No.get(e.device).getByIndex(e.pass),r={defines:zo.getCoreDefines(this,e),skin:!!(t&2),useInstancing:!!(t&32),useMorphPosition:(t&Ya)!==0,useMorphNormal:(t&Xa)!==0,useMorphTextureBasedInt:(t&Qa)!==0,pass:e.pass,gamma:e.cameraShaderParams.shaderOutputGamma,toneMapping:e.cameraShaderParams.toneMapping,fog:e.cameraShaderParams.fog,useDualSourceBlending:n.isForward&&this.blendState.usesDualSourceBlending,shaderDesc:this.shaderDesc,shaderChunks:this.shaderChunks},i=new Eo(e.viewUniformFormat,e.vertexFormat),a=Oo(e.device);return a.register(`shader-material`,vu),a.getProgram(`shader-material`,r,i,this.userId)}},bu=`
uniform highp {sampler} {name};
{returnType} load{funcName}() { return texelFetch({name}, splat.uv, 0); }
{returnType} load{funcName}WithIndex(uint index) { return texelFetch({name}, ivec2(index % splatTextureSize, index / splatTextureSize), 0); }
`,xu=`
var {name}: {textureType};
fn load{funcName}() -> {returnType} { return textureLoad({name}, splat.uv, 0); }
fn load{funcName}WithIndex(index: u32) -> {returnType} { return textureLoad({name}, vec2i(i32(index % uniform.splatTextureSize), i32(index / uniform.splatTextureSize)), 0); }
`,Su=`
@group(0) @binding({binding}) var {name}: {textureType};
fn load{funcName}() -> {returnType} { return textureLoad({name}, splat.uv, 0); }
fn load{funcName}WithIndex(index: u32) -> {returnType} { return textureLoad({name}, vec2i(i32(index % uniforms.splatTextureSize), i32(index / uniforms.splatTextureSize)), 0); }
`,Cu=`
void write{funcName}({returnType} value) {
#if {defineGuard}
	pcFragColor{index} = value;
#endif
}
`,wu=`
fn write{funcName}(value: {returnType}) {
#if {defineGuard}
	processOutput.{colorSlot} = value;
#endif
}
`,Tu=`
vec3 getCenter() { return loadDataCenter().xyz; }
vec4 getColor() { return loadDataColor(); }
vec3 getScale() { return loadDataScale().xyz; }
vec4 getRotation() { return loadDataRotation(); }
`,Eu=`
fn getCenter() -> vec3f { return loadDataCenter().xyz; }
fn getColor() -> vec4f { return loadDataColor(); }
fn getScale() -> vec3f { return loadDataScale().xyz; }
fn getRotation() -> vec4f { return loadDataRotation(); }
`,Du=`
	vec3 getCenter() { return loadDataCenter().xyz; }
	vec4 getColor() { return loadDataColor(); }
	vec3 getScale() { return vec3(loadDataCenter().w); }
	vec4 getRotation() { return vec4(0.0, 0.0, 0.0, 1.0); }
`,Ou=`
	fn getCenter() -> vec3f { return loadDataCenter().xyz; }
	fn getColor() -> vec4f { return loadDataColor(); }
	fn getScale() -> vec3f { return vec3f(loadDataCenter().w); }
	fn getRotation() -> vec4f { return vec4f(0.0, 0.0, 0.0, 1.0); }
`,ku=e=>e.map(e=>`${e.name}:${e.format}:${e.storage}`).join(`,`),Au=0,ju=/\{name\}/g,Mu=/\{sampler\}/g,Nu=/\{textureType\}/g,Pu=/\{returnType\}/g,Fu=/\{funcName\}/g,Iu=/\{binding\}/g,Lu=/\{index\}/g,Ru=/\{colorSlot\}/g,zu=/\{defineGuard\}/g,Bu=class e{constructor(e,t,n){v(this,`_device`,void 0),v(this,`streams`,void 0),v(this,`_read`,void 0),v(this,`allowStreamRemoval`,!1),v(this,`dataFormat`,null),v(this,`_extraStreams`,[]),v(this,`_streamNames`,new Set),v(this,`_extraStreamsVersion`,++Au),v(this,`_hash`,void 0),v(this,`_resourceStreams`,null),v(this,`_instanceStreams`,null),this._device=e,this.streams=[...t],this._streamNames=new Set(this.streams.map(e=>e.name));let r=e.isWebGPU;this._read=r?n.readWGSL:n.readGLSL}get hash(){if(this._hash===void 0){let e=ku(this.streams),t=ku(this._extraStreams);this._hash=ir(e+t+this._read)}return this._hash}get extraStreamsVersion(){return this._extraStreamsVersion}get extraStreams(){return this._extraStreams}get resourceStreams(){return this._resourceStreams===null&&(this._resourceStreams=[...this.streams.filter(e=>e.storage!==1),...this._extraStreams.filter(e=>e.storage!==1)]),this._resourceStreams}get instanceStreams(){return this._instanceStreams===null&&(this._instanceStreams=this._extraStreams.filter(e=>e.storage===1)),this._instanceStreams}addExtraStreams(e){if(!e||e.length===0)return;let t=!1;for(let n of e)this._streamNames.has(n.name)||(this._extraStreams.push({name:n.name,format:n.format,storage:n.storage??0}),this._streamNames.add(n.name),t=!0);t&&(this._extraStreamsVersion=++Au,this._invalidateCaches())}removeExtraStreams(e){if(!this.allowStreamRemoval)return;let t=!1;for(let n of e){let e=this._extraStreams.findIndex(e=>e.name===n);e!==-1&&(this._extraStreams.splice(e,1),this._streamNames.delete(n),t=!0)}t&&(this._extraStreamsVersion=++Au,this._invalidateCaches())}getInputDeclarations(e){let t=this._device.isWebGPU,n=t?xu:bu,r=t?Ke:Ge,i=[],a=[...this.streams,...this._extraStreams];e&&(a=a.filter(t=>e.includes(t.name)));for(let e of a){let a=r(e.format),o=e.name.charAt(0).toUpperCase()+e.name.slice(1),s=a.textureType??``;t&&e.format===14&&(s=`texture_2d<uff>`);let c=n.replace(ju,e.name).replace(Mu,a.sampler??``).replace(Nu,s).replace(Pu,a.returnType).replace(Fu,o);i.push(c)}return i.join(`
`)}getReadCode(){return this._read}getComputeInputDeclarations(e,t){let n=[],r=[...this.streams,...this._extraStreams];t&&(r=r.filter(e=>t.includes(e.name)));for(let t=0;t<r.length;t++){let i=r[t],a=Ke(i.format),o=i.name.charAt(0).toUpperCase()+i.name.slice(1),s=a.textureType??``;i.format===14&&(s=`texture_2d<uff>`);let c=Su.replace(Iu,String(e+t)).replace(ju,i.name).replace(Nu,s).replace(Pu,a.returnType).replace(Fu,o);n.push(c)}return n.join(`
`)}getComputeBindFormats(e){let t=[...this.streams,...this._extraStreams];return e&&(t=t.filter(t=>e.includes(t.name))),t.map(e=>{let t=Fe.get(e.format),n=0;return t?.isUint?n=4:t?.isInt&&(n=3),new tn(e.name,4,void 0,n,!1)})}setWriteCode(e,t){this._write=this._device.isWebGPU?t:e}getWriteCode(){return this._write}getOutputDeclarations(e){let t=this._device.isWebGPU,n=[],r=t?wu:Cu,i=t?Ke:Ge;for(let t=0;t<e.length;t++){let a=e[t],o=i(a.format),s=a.name.charAt(0).toUpperCase()+a.name.slice(1),c=t===0?`color`:`color${t}`,l=r.replace(Fu,s).replace(Pu,o.returnType).replace(Lu,String(t)).replace(Ru,c).replace(zu,`1`);n.push(l)}return n.join(`
`)}getOutputStubs(e){let t=this._device.isWebGPU,n=[],r=t?wu:Cu,i=t?Ke:Ge;for(let t of e){let e=i(t.format),a=t.name.charAt(0).toUpperCase()+t.name.slice(1),o=r.replace(Fu,a).replace(Pu,e.returnType).replace(zu,`0`);n.push(o)}return n.join(`
`)}getStream(e){let t=this.streams.find(t=>t.name===e);return t||(t=this._extraStreams.find(t=>t.name===e)),t}_invalidateCaches(){this._hash=void 0,this._resourceStreams=null,this._instanceStreams=null}static createDefaultFormat(t){return new e(t,[{name:`dataColor`,format:12},{name:`dataCenter`,format:14},{name:`dataScale`,format:12},{name:`dataRotation`,format:12}],{readGLSL:Tu,readWGSL:Eu})}static createSimpleFormat(t){return new e(t,[{name:`dataCenter`,format:14},{name:`dataColor`,format:12}],{readGLSL:Du,readWGSL:Ou})}},Vu=`
flat varying {type} user_{name};
void set{funcName}({type} value) { user_{name} = value; }
`,Hu=`
flat varying {type} user_{name};
{type} get{funcName}() { return user_{name}; }
`,Uu=`
varying @interpolate(flat) user_{name}: {type};
var<private> _user_{name}: {type};
fn set{funcName}(value: {type}) { _user_{name} = value; }
`,Wu=`
output.user_{name} = _user_{name};
`,Gu=`
var<private> _user_{name}: {type};
fn set{funcName}(value: {type}) { _user_{name} = value; }
`,Ku=`
varying @interpolate(flat) user_{name}: {type};
fn get{funcName}() -> {type} { return user_{name}; }
`,qu=`
projCache[base + {word}u] = {value};
`,Ju=`
output.user_{name} = {value};
`,Yu={6:[`float`,`vec2`,`vec3`,`vec4`],4:[`int`,`ivec2`,`ivec3`,`ivec4`],5:[`uint`,`uvec2`,`uvec3`,`uvec4`]},Xu={6:[`f32`,`vec2f`,`vec3f`,`vec4f`],4:[`i32`,`vec2i`,`vec3i`,`vec4i`],5:[`u32`,`vec2u`,`vec3u`,`vec4u`]},Zu=[`x`,`y`,`z`,`w`],Qu=/\{name\}/g,$u=/\{type\}/g,ed=/\{funcName\}/g,td=/\{word\}/g,nd=/\{value\}/g,rd=[`gsplatUserVaryingsVS`,`gsplatUserVaryingsPS`],id=[`gsplatUserVaryingsVS`,`gsplatUserVaryingsFlushVS`,`gsplatUserVaryingsCS`,`gsplatUserVaryingsPS`,`gsplatUserCacheWriteCS`,`gsplatUserCacheReadVS`],ad=e=>e.charAt(0).toUpperCase()+e.slice(1),od=(e,t)=>e===5?t:`bitcast<u32>(${t})`,sd=(e,t)=>e===5?t:e===4?`bitcast<i32>(${t})`:`bitcast<f32>(${t})`,cd=class{constructor(e){v(this,`_device`,void 0),v(this,`_streams`,[]),v(this,`_words`,0),v(this,`_version`,0),this._device=e}get streams(){return this._streams}get words(){return this._words}get version(){return this._version}add(e){for(let t of e)this._streams.push({name:t.name,type:t.type,components:t.components});this._changed()}remove(e){let t=this._streams.length;this._streams=this._streams.filter(t=>!e.includes(t.name)),this._streams.length!==t&&this._changed()}_changed(){this._words=this._streams.reduce((e,t)=>e+t.components,0),this._version++}_generateChunks(){let e=this._device.isWebGPU,t=e?Xu:Yu,n=e?Uu:Vu,r=e?Ku:Hu,i=[],a=[],o=[],s=[],c=[],l=[],u=0;for(let d of this._streams){let{name:f,type:p,components:m}=d,h=t[p][m-1],g=ad(f),_=e=>e.replace(Qu,f).replace($u,h).replace(ed,g);if(i.push(_(n)),a.push(_(r)),e){o.push(_(Wu)),s.push(_(Gu));let e=[];for(let t=0;t<m;t++){let n=m===1?`_user_${f}`:`_user_${f}.${Zu[t]}`;c.push(qu.replace(td,String(8+u+t)).replace(nd,od(p,n))),e.push(sd(p,`projCache[base + ${8+u+t}u]`))}l.push(Ju.replace(Qu,f).replace(nd,m===1?e[0]:`${h}(${e.join(`, `)})`))}u+=m}let d={gsplatUserVaryingsVS:i.join(``),gsplatUserVaryingsPS:a.join(``)};return e&&(d.gsplatUserVaryingsFlushVS=o.join(``),d.gsplatUserVaryingsCS=s.join(``),d.gsplatUserCacheWriteCS=c.join(``),d.gsplatUserCacheReadVS=l.join(``)),d}apply(e){let t=this._device.isWebGPU,n=e.getShaderChunks(t?Rt:Lt);if(e.setDefine(`GSPLAT_USER_VARYINGS`,this._streams.length>0),this._streams.length>0){let e=this._generateChunks();for(let t in e)n.set(t,e[t])}else(t?id:rd).forEach(e=>n.delete(e));e.update()}},ld=`
uvec4 cachedTransformA;
vec3 getCenter() {
	cachedTransformA = loadDataTransformA();
	return vec3(uintBitsToFloat(cachedTransformA.r), uintBitsToFloat(cachedTransformA.g), uintBitsToFloat(cachedTransformA.b));
}
float getOpacity() {
	return float(cachedTransformA.a >> 24u) / 255.0;
}
vec3 getColor() {
	uint data = loadDataColor().x;
	float r = float(data & 0x7FFu) * (4.0 / 2047.0);
	float g = float((data >> 11u) & 0x7FFu) * (4.0 / 2047.0);
	float b = float((data >> 22u) & 0x3FFu) * (4.0 / 1023.0);
	return vec3(r, g, b);
}
vec4 getRotation() {
	uint data = loadDataTransformB().x;
	vec3 p = vec3(
		float(data & 0x7FFu) / 2047.0 * 2.0 - 1.0,
		float((data >> 11u) & 0x7FFu) / 2047.0 * 2.0 - 1.0,
		float((data >> 22u) & 0x3FFu) / 1023.0 * 2.0 - 1.0
	);
	float d = dot(p, p);
	return vec4(1.0 - d, sqrt(max(0.0, 2.0 - d)) * p);
}
vec3 getScale() {
	uint data = cachedTransformA.a;
	float sx = float(data & 0xFFu);
	float sy = float((data >> 8u) & 0xFFu);
	float sz = float((data >> 16u) & 0xFFu);
	const float logRange = 21.0 / 255.0;
	const float logMin = -12.0;
	return vec3(
		sx == 0.0 ? 0.0 : exp(sx * logRange + logMin),
		sy == 0.0 ? 0.0 : exp(sy * logRange + logMin),
		sz == 0.0 ? 0.0 : exp(sz * logRange + logMin)
	);
}
`,ud=`
void writeSplat(vec3 center, vec4 rotation, vec3 scale, vec4 color) {
	vec3 rgb = clamp(color.rgb, 0.0, 4.0);
	uint rBits = uint(rgb.r * (2047.0 / 4.0) + 0.5);
	uint gBits = uint(rgb.g * (2047.0 / 4.0) + 0.5);
	uint bBits = uint(rgb.b * (1023.0 / 4.0) + 0.5);
	writeDataColor(uvec4(rBits | (gBits << 11u) | (bBits << 22u), 0u, 0u, 0u));
	#ifndef GSPLAT_COLOR_ONLY
		vec4 q = rotation;
		if (q.w < 0.0) q = -q;
		vec3 p = q.xyz * inversesqrt(1.0 + q.w);
		uint aBitsQ = uint(clamp((p.x * 0.5 + 0.5) * 2047.0 + 0.5, 0.0, 2047.0));
		uint bBitsQ = uint(clamp((p.y * 0.5 + 0.5) * 2047.0 + 0.5, 0.0, 2047.0));
		uint cBitsQ = uint(clamp((p.z * 0.5 + 0.5) * 1023.0 + 0.5, 0.0, 1023.0));
		uint packedQuat = aBitsQ | (bBitsQ << 11u) | (cBitsQ << 22u);
		const float invLogRange = 255.0 / 21.0;
		const float logMin = -12.0;
		uint sxBits = scale.x < 1e-10 ? 0u : uint(clamp((log(scale.x) - logMin) * invLogRange + 0.5, 1.0, 255.0));
		uint syBits = scale.y < 1e-10 ? 0u : uint(clamp((log(scale.y) - logMin) * invLogRange + 0.5, 1.0, 255.0));
		uint szBits = scale.z < 1e-10 ? 0u : uint(clamp((log(scale.z) - logMin) * invLogRange + 0.5, 1.0, 255.0));
		uint alphaBits = uint(clamp(color.a, 0.0, 1.0) * 255.0 + 0.5);
		uint packedScaleAlpha = sxBits | (syBits << 8u) | (szBits << 16u) | (alphaBits << 24u);
		writeDataTransformA(uvec4(floatBitsToUint(center.x), floatBitsToUint(center.y), floatBitsToUint(center.z), packedScaleAlpha));
		writeDataTransformB(uvec4(packedQuat, 0u, 0u, 0u));
	#endif
}
`,dd=`
uvec4 cachedTransformA;
uvec2 cachedTransformB;
vec4 cachedColor;
vec3 getCenter() {
	cachedTransformA = loadDataTransformA();
	cachedTransformB = loadDataTransformB().xy;
	return vec3(uintBitsToFloat(cachedTransformA.r), uintBitsToFloat(cachedTransformA.g), uintBitsToFloat(cachedTransformA.b));
}
float getOpacity() {
	#ifdef GSPLAT_COLOR_FLOAT
		cachedColor = loadDataColor();
	#else
		uvec4 packedColor = loadDataColor();
		uint packed_rg = packedColor.r | (packedColor.g << 16u);
		uint packed_ba = packedColor.b | (packedColor.a << 16u);
		cachedColor = vec4(unpackHalf2x16(packed_rg), unpackHalf2x16(packed_ba));
	#endif
	return cachedColor.a;
}
vec3 getColor() {
	return cachedColor.rgb;
}
vec4 getRotation() {
	vec2 rotXY = unpackHalf2x16(cachedTransformA.a);
	vec2 rotZscaleX = unpackHalf2x16(cachedTransformB.x);
	vec3 rotXYZ = vec3(rotXY, rotZscaleX.x);
	return vec4(rotXYZ, sqrt(max(0.0, 1.0 - dot(rotXYZ, rotXYZ)))).wxyz;
}
vec3 getScale() {
	vec2 rotZscaleX = unpackHalf2x16(cachedTransformB.x);
	vec2 scaleYZ = unpackHalf2x16(cachedTransformB.y);
	return vec3(rotZscaleX.y, scaleYZ);
}
`,fd=`
void writeSplat(vec3 center, vec4 rotation, vec3 scale, vec4 color) {
	#ifdef GSPLAT_COLOR_UINT
		uint packed_rg = packHalf2x16(color.rg);
		uint packed_ba = packHalf2x16(color.ba);
		writeDataColor(uvec4(
			packed_rg & 0xFFFFu,
			packed_rg >> 16u,
			packed_ba & 0xFFFFu,
			packed_ba >> 16u
		));
	#else
		writeDataColor(color);
	#endif
	#ifndef GSPLAT_COLOR_ONLY
		writeDataTransformA(uvec4(floatBitsToUint(center.x), floatBitsToUint(center.y), floatBitsToUint(center.z), packHalf2x16(rotation.xy)));
		writeDataTransformB(uvec4(packHalf2x16(vec2(rotation.z, scale.x)), packHalf2x16(scale.yz), 0u, 0u));
	#endif
}
`,pd=`
var<private> cachedTransformA: vec4u;
fn getCenter() -> vec3f {
	cachedTransformA = loadDataTransformA();
	return vec3f(bitcast<f32>(cachedTransformA.r), bitcast<f32>(cachedTransformA.g), bitcast<f32>(cachedTransformA.b));
}
fn getOpacity() -> f32 {
	return f32(cachedTransformA.a >> 24u) / 255.0;
}
fn getColor() -> vec3f {
	let data = loadDataColor().x;
	let r = f32(data & 0x7FFu) * (4.0 / 2047.0);
	let g = f32((data >> 11u) & 0x7FFu) * (4.0 / 2047.0);
	let b = f32((data >> 22u) & 0x3FFu) * (4.0 / 1023.0);
	return vec3f(r, g, b);
}
fn getRotation() -> vec4f {
	let data = loadDataTransformB().x;
	let p = vec3f(
		f32(data & 0x7FFu) / 2047.0 * 2.0 - 1.0,
		f32((data >> 11u) & 0x7FFu) / 2047.0 * 2.0 - 1.0,
		f32((data >> 22u) & 0x3FFu) / 1023.0 * 2.0 - 1.0
	);
	let d = dot(p, p);
	return vec4f(1.0 - d, sqrt(max(0.0, 2.0 - d)) * p);
}
fn getScale() -> vec3f {
	let data = cachedTransformA.a;
	let sx = f32(data & 0xFFu);
	let sy = f32((data >> 8u) & 0xFFu);
	let sz = f32((data >> 16u) & 0xFFu);
	let logRange = 21.0 / 255.0;
	let logMin = -12.0;
	return vec3f(
		select(exp(sx * logRange + logMin), 0.0, sx == 0.0),
		select(exp(sy * logRange + logMin), 0.0, sy == 0.0),
		select(exp(sz * logRange + logMin), 0.0, sz == 0.0)
	);
}
`,md=`
fn writeSplat(center: vec3f, rotation: vec4f, scale: vec3f, color: vec4f) {
	let rgb = clamp(color.rgb, vec3f(0.0), vec3f(4.0));
	let rBits = u32(rgb.r * (2047.0 / 4.0) + 0.5);
	let gBits = u32(rgb.g * (2047.0 / 4.0) + 0.5);
	let bBits = u32(rgb.b * (1023.0 / 4.0) + 0.5);
	writeDataColor(vec4u(rBits | (gBits << 11u) | (bBits << 22u), 0u, 0u, 0u));
	#ifndef GSPLAT_COLOR_ONLY
		var q = rotation;
		if (q.w < 0.0) { q = -q; }
		let p = q.xyz * inverseSqrt(1.0 + q.w);
		let aBitsQ = u32(clamp(p.x * 0.5 + 0.5, 0.0, 1.0) * 2047.0 + 0.5);
		let bBitsQ = u32(clamp(p.y * 0.5 + 0.5, 0.0, 1.0) * 2047.0 + 0.5);
		let cBitsQ = u32(clamp(p.z * 0.5 + 0.5, 0.0, 1.0) * 1023.0 + 0.5);
		let packedQuat = aBitsQ | (bBitsQ << 11u) | (cBitsQ << 22u);
		let invLogRange = 255.0 / 21.0;
		let logMin = -12.0;
		let sxBits = select(u32(clamp((log(scale.x) - logMin) * invLogRange + 0.5, 1.0, 255.0)), 0u, scale.x < 1e-10);
		let syBits = select(u32(clamp((log(scale.y) - logMin) * invLogRange + 0.5, 1.0, 255.0)), 0u, scale.y < 1e-10);
		let szBits = select(u32(clamp((log(scale.z) - logMin) * invLogRange + 0.5, 1.0, 255.0)), 0u, scale.z < 1e-10);
		let alphaBits = u32(clamp(color.a, 0.0, 1.0) * 255.0 + 0.5);
		let packedScaleAlpha = sxBits | (syBits << 8u) | (szBits << 16u) | (alphaBits << 24u);
		writeDataTransformA(vec4u(bitcast<u32>(center.x), bitcast<u32>(center.y), bitcast<u32>(center.z), packedScaleAlpha));
		writeDataTransformB(vec4u(packedQuat, 0u, 0u, 0u));
	#endif
}
`,hd=`
var<private> cachedTransformA: vec4u;
var<private> cachedTransformB: vec2u;
var<private> cachedColor: vec4f;
fn getCenter() -> vec3f {
	cachedTransformA = loadDataTransformA();
	cachedTransformB = loadDataTransformB().xy;
	return vec3f(bitcast<f32>(cachedTransformA.r), bitcast<f32>(cachedTransformA.g), bitcast<f32>(cachedTransformA.b));
}
fn getOpacity() -> f32 {
	#ifdef GSPLAT_COLOR_FLOAT
		cachedColor = loadDataColor();
	#else
		let packedColor = loadDataColor();
		let packed_rg = packedColor.r | (packedColor.g << 16u);
		let packed_ba = packedColor.b | (packedColor.a << 16u);
		cachedColor = vec4f(unpack2x16float(packed_rg), unpack2x16float(packed_ba));
	#endif
	return cachedColor.a;
}
fn getColor() -> vec3f {
	return cachedColor.rgb;
}
fn getRotation() -> vec4f {
	let rotXY = unpack2x16float(cachedTransformA.a);
	let rotZscaleX = unpack2x16float(cachedTransformB.x);
	let rotXYZ = vec3f(rotXY, rotZscaleX.x);
	return vec4f(rotXYZ, sqrt(max(0.0, 1.0 - dot(rotXYZ, rotXYZ)))).wxyz;
}
fn getScale() -> vec3f {
	let rotZscaleX = unpack2x16float(cachedTransformB.x);
	let scaleYZ = unpack2x16float(cachedTransformB.y);
	return vec3f(rotZscaleX.y, scaleYZ);
}
`,gd=`
fn writeSplat(center: vec3f, rotation: vec4f, scale: vec3f, color: vec4f) {
	writeDataColor(color);
	#ifndef GSPLAT_COLOR_ONLY
		writeDataTransformA(vec4u(bitcast<u32>(center.x), bitcast<u32>(center.y), bitcast<u32>(center.z), pack2x16float(rotation.xy)));
		writeDataTransformB(vec4u(pack2x16float(vec2f(rotation.z, scale.x)), pack2x16float(scale.yz), 0u, 0u));
	#endif
}
`,_d=1e6,vd=class{constructor(e){v(this,`_material`,new yu),v(this,`_format`,void 0),v(this,`_device`,void 0),v(this,`_dataFormat`,Co),v(this,`radialSorting`,!1),v(this,`_renderer`,0),v(this,`_currentRenderer`,1),v(this,`dirty`,!1),v(this,`_debug`,0),v(this,`_enableIds`,!1),v(this,`lodUpdateDistance`,1),v(this,`lodUpdateAngle`,0),v(this,`_lodBehindPenalty`,1),v(this,`_lodUnderfillLimit`,0),v(this,`_splatBudget`,_d),v(this,`_lodMode`,wo),v(this,`_colorRamp`,null),v(this,`colorRampIntensity`,1),v(this,`useFog`,!0),v(this,`useTonemap`,!0),v(this,`colorUpdateAngle`,10),v(this,`_fisheye`,0),v(this,`cooldownTicks`,100),v(this,`sceneDepthWrite`,!1),v(this,`_varyings`,void 0),v(this,`_appliedVaryingsVersion`,0),this._device=e,this._currentRenderer=this._resolveRenderer(this._renderer),this._format=this._createFormat(Co),this._varyings=new cd(e),this._material.setParameter(`alphaClip`,.3),this._material.setParameter(`alphaClipForward`,1/255),this._material.setParameter(`minPixelSize`,2),this._material.setParameter(`minContribution`,3),this._material.setParameter(`foveationStrength`,0),this._material.setParameter(`foveationCenter`,.3)}_createFormat(e){let t;if(e===`compact`)t=new Bu(this._device,[{name:`dataColor`,format:37},{name:`dataTransformA`,format:49},{name:`dataTransformB`,format:37}],{readGLSL:ld,readWGSL:pd}),t.setWriteCode(ud,md);else{let e=this._device.getRenderableHdrFormat([12])||47;t=new Bu(this._device,[{name:`dataColor`,format:e},{name:`dataTransformA`,format:49},{name:`dataTransformB`,format:43}],{readGLSL:dd,readWGSL:hd}),t.setWriteCode(fd,gd)}return t.allowStreamRemoval=!0,t.dataFormat=e,t}_resolveRenderer(e){return e===0?this._device.isWebGPU?2:1:e===2&&!this._device.isWebGPU?1:e}set renderer(e){e===3&&(e=0),this._renderer!==e&&(this._renderer=e,this._currentRenderer=this._resolveRenderer(e))}get renderer(){return this._renderer}get currentRenderer(){return this._currentRenderer}set debug(e){if(e!==3&&this._debug!==e){let t=this._debug;this._debug=e,(e===1||t===1)&&(this.dirty=!0)}}get debug(){return this._debug}set colorizeLod(e){this.debug=+!!e}get colorizeLod(){return this._debug===1}set debugAabbs(e){this.debug=e?4:0}get debugAabbs(){return this._debug===4}set debugNodeAabbs(e){this.debug=e?5:0}get debugNodeAabbs(){return this._debug===5}set enableIds(e){e&&!this._enableIds?(this._enableIds=!0,this._format.getStream(`pcId`)||this._format.addExtraStreams([{name:`pcId`,format:37}])):!e&&this._enableIds&&(this._enableIds=!1,this._format.removeExtraStreams([`pcId`]))}get enableIds(){return this._enableIds}set lodBehindPenalty(e){this._lodBehindPenalty!==e&&(this._lodBehindPenalty=e,this.dirty=!0)}get lodBehindPenalty(){return this._lodBehindPenalty}set lodRangeMin(e){}get lodRangeMin(){return 0}set lodRangeMax(e){}get lodRangeMax(){return 99}set lodUnderfillLimit(e){this._lodUnderfillLimit!==e&&(this._lodUnderfillLimit=e,this.dirty=!0)}get lodUnderfillLimit(){return this._lodUnderfillLimit}set splatBudget(e){this._splatBudget!==e&&(this._splatBudget=e,this.dirty=!0)}get splatBudget(){return this._splatBudget}set lodMode(e){(e===`error`||e===`distance`)&&this._lodMode!==e&&(this._lodMode=e,this.dirty=!0)}get lodMode(){return this._lodMode}set colorRamp(e){this._colorRamp!==e&&(this._colorRamp=e,this.dirty=!0)}get colorRamp(){return this._colorRamp}set colorizeColorUpdate(e){this.debug=e?2:0}get colorizeColorUpdate(){return this._debug===2}set colorUpdateDistance(e){}get colorUpdateDistance(){return 0}set colorUpdateDistanceLodScale(e){}get colorUpdateDistanceLodScale(){return 0}set colorUpdateAngleLodScale(e){}get colorUpdateAngleLodScale(){return 0}set alphaClip(e){this._material.setParameter(`alphaClip`,e),this._material.update()}get alphaClip(){return this._material.getParameter(`alphaClip`)?.data??.3}set alphaClipForward(e){this._material.setParameter(`alphaClipForward`,e),this._material.update()}get alphaClipForward(){return this._material.getParameter(`alphaClipForward`)?.data??1/255}set minPixelSize(e){this._material.setParameter(`minPixelSize`,e),this._material.update()}get minPixelSize(){return this._material.getParameter(`minPixelSize`)?.data??2}set minContribution(e){this._material.setParameter(`minContribution`,e),this._material.update()}get minContribution(){return this._material.getParameter(`minContribution`)?.data??3}set foveationStrength(e){this._material.setParameter(`foveationStrength`,e),this._material.update()}get foveationStrength(){return this._material.getParameter(`foveationStrength`)?.data??0}set foveationCenter(e){this._material.setParameter(`foveationCenter`,e),this._material.update()}get foveationCenter(){return this._material.getParameter(`foveationCenter`)?.data??.3}set antiAlias(e){this._material.setDefine(`GSPLAT_AA`,e),this._material.update()}get antiAlias(){return!!this._material.getDefine(`GSPLAT_AA`)}set twoDimensional(e){this._material.setDefine(`GSPLAT_2DGS`,e),this._material.update()}get twoDimensional(){return!!this._material.getDefine(`GSPLAT_2DGS`)}set fisheye(e){if(this._fisheye!==e){let t=this._fisheye>0;this._fisheye=e;let n=e>0;t!==n&&(this._material.setDefine(`GSPLAT_FISHEYE`,n),this._material.update())}}get fisheye(){return this._fisheye}set dataFormat(e){if(this._dataFormat!==e){this._dataFormat=e;let t=this._format.extraStreams.map(e=>({name:e.name,format:e.format,storage:e.storage}));this._format=this._createFormat(e),t.length>0&&this._format.addExtraStreams(t),this.dirty=!0}}get dataFormat(){return this._dataFormat}get material(){return this._material}get format(){return this._format}get varyings(){return this._varyings}applySettings(e){this.radialSorting=e.gsplatRadialSorting??this.radialSorting,this.lodUpdateDistance=e.gsplatLodUpdateDistance??this.lodUpdateDistance,this.lodUpdateAngle=e.gsplatLodUpdateAngle??this.lodUpdateAngle,this.lodBehindPenalty=e.gsplatLodBehindPenalty??this.lodBehindPenalty,this.lodUnderfillLimit=e.gsplatLodUnderfillLimit??this.lodUnderfillLimit,this.splatBudget=e.gsplatSplatBudget??this.splatBudget,this.lodMode=e.gsplatLodMode??this.lodMode,this.alphaClip=e.gsplatAlphaClip??this.alphaClip,this.alphaClipForward=e.gsplatAlphaClipForward??this.alphaClipForward,this.minPixelSize=e.gsplatMinPixelSize??this.minPixelSize,this.minContribution=e.gsplatMinContribution??this.minContribution,this.foveationStrength=e.gsplatFoveationStrength??this.foveationStrength,this.foveationCenter=e.gsplatFoveationCenter??this.foveationCenter,this.antiAlias=e.gsplatAntiAlias??this.antiAlias,this.useFog=e.gsplatUseFog??this.useFog,this.useTonemap=e.gsplatUseTonemap??this.useTonemap,this.colorUpdateAngle=e.gsplatColorUpdateAngle??this.colorUpdateAngle,this.cooldownTicks=e.gsplatCooldownTicks??this.cooldownTicks,this.dataFormat=e.gsplatDataFormat??this.dataFormat,this.enableIds=e.gsplatEnableIds??this.enableIds}frameEnd(){this.dirty=!1}frameUpdate(){this._appliedVaryingsVersion!==this._varyings.version&&(this._appliedVaryingsVersion=this._varyings.version,this._varyings.apply(this._material))}},yd=class{constructor(){v(this,`enabled`,!1),v(this,`k`,1),v(this,`invK`,1),v(this,`cornerScale`,1),v(this,`projMat00`,1),v(this,`projMat11`,1),v(this,`maxTheta`,Math.PI),v(this,`_lastT`,-1),v(this,`_lastFov`,-1),v(this,`_lastP00`,0),v(this,`_lastP11`,0)}update(e,t,n){n.data[15]===1&&(e=0);let r=n.data[0],i=n.data[5];if(e===this._lastT&&t===this._lastFov&&r===this._lastP00&&i===this._lastP11)return;if(this._lastT=e,this._lastFov=t,this._lastP00=r,this._lastP11=i,e<=0){this.enabled=!1,this.k=1,this.invK=1,this.cornerScale=1,this.maxTheta=Math.PI;return}this.enabled=!0;let a=t/180+.15,o=Math.max(1,t/180+.05),s=o*(a/o)**+e;this.k=s,this.invK=1/s,this.cornerScale=1+(Math.SQRT2-1)*e;let c=Math.min(s*Math.PI/2,3.13),l=this.cornerScale,u=Math.min(Math.atan2(1,r),c-.01);this.projMat00=l/(s*Math.tan(u/s));let d=Math.min(Math.atan2(1,i),c-.01);this.projMat11=l/(s*Math.tan(d/s)),this.maxTheta=c}},bd={linear:`decodeLinear`,srgb:`decodeGamma`,rgbm:`decodeRGBM`,rgbe:`decodeRGBE`,rgbp:`decodeRGBP`,xy:`unpackNormalXY`,xyz:`unpackNormalXYZ`},xd={linear:`encodeLinear`,srgb:`encodeGamma`,rgbm:`encodeRGBM`,rgbe:`encodeRGBE`,rgbp:`encodeRGBP`},Sd=class{static decodeFunc(e){return bd[e]??`decodeGamma`}static encodeFunc(e){return xd[e]??`encodeGamma`}},Cd=(e,t)=>{let n=t.length/3,r=e.length/3,i=new k,a=new k,o=new k,s=new k,c=new k,l=new k,u=[];for(let t=0;t<e.length;t++)u[t]=0;for(let r=0;r<n;r++){let n=t[r*3],d=t[r*3+1],f=t[r*3+2];i.set(e[n*3],e[n*3+1],e[n*3+2]),a.set(e[d*3],e[d*3+1],e[d*3+2]),o.set(e[f*3],e[f*3+1],e[f*3+2]),s.sub2(a,i),c.sub2(o,i),l.cross(s,c).normalize(),u[n*3]+=l.x,u[n*3+1]+=l.y,u[n*3+2]+=l.z,u[d*3]+=l.x,u[d*3+1]+=l.y,u[d*3+2]+=l.z,u[f*3]+=l.x,u[f*3+1]+=l.y,u[f*3+2]+=l.z}for(let e=0;e<r;e++){let t=u[e*3],n=u[e*3+1],r=u[e*3+2],i=1/Math.sqrt(t*t+n*n+r*r);u[e*3]*=i,u[e*3+1]*=i,u[e*3+2]*=i}return u},wd=(e,t,n,r)=>{let i=r.length/3,a=e.length/3,o=new k,s=new k,c=new k,l=new A,u=new A,d=new A,f=new k,p=new k,m=new Float32Array(a*3),h=new Float32Array(a*3),g=[];for(let t=0;t<i;t++){let i=r[t*3],a=r[t*3+1],g=r[t*3+2];o.set(e[i*3],e[i*3+1],e[i*3+2]),s.set(e[a*3],e[a*3+1],e[a*3+2]),c.set(e[g*3],e[g*3+1],e[g*3+2]),l.set(n[i*2],n[i*2+1]),u.set(n[a*2],n[a*2+1]),d.set(n[g*2],n[g*2+1]);let _=s.x-o.x,v=c.x-o.x,y=s.y-o.y,b=c.y-o.y,x=s.z-o.z,S=c.z-o.z,C=u.x-l.x,w=d.x-l.x,T=u.y-l.y,E=d.y-l.y,D=C*E-w*T;if(D===0)f.set(0,1,0),p.set(1,0,0);else{let e=1/D;f.set((E*_-T*v)*e,(E*y-T*b)*e,(E*x-T*S)*e),p.set((C*v-w*_)*e,(C*b-w*y)*e,(C*S-w*x)*e)}m[i*3+0]+=f.x,m[i*3+1]+=f.y,m[i*3+2]+=f.z,m[a*3+0]+=f.x,m[a*3+1]+=f.y,m[a*3+2]+=f.z,m[g*3+0]+=f.x,m[g*3+1]+=f.y,m[g*3+2]+=f.z,h[i*3+0]+=p.x,h[i*3+1]+=p.y,h[i*3+2]+=p.z,h[a*3+0]+=p.x,h[a*3+1]+=p.y,h[a*3+2]+=p.z,h[g*3+0]+=p.x,h[g*3+1]+=p.y,h[g*3+2]+=p.z}let _=new k,v=new k,y=new k,b=new k;for(let e=0;e<a;e++){y.set(t[e*3],t[e*3+1],t[e*3+2]),_.set(m[e*3],m[e*3+1],m[e*3+2]),v.set(h[e*3],h[e*3+1],h[e*3+2]);let n=y.dot(_);b.copy(y).mulScalar(n),b.sub2(_,b).normalize(),g[e*4]=b.x,g[e*4+1]=b.y,g[e*4+2]=b.z,b.cross(y,_),g[e*4+3]=b.dot(v)<0?-1:1}return g},Td=class{constructor(){v(this,`positions`,void 0),v(this,`normals`,void 0),v(this,`colors`,void 0),v(this,`uvs`,void 0),v(this,`uvs1`,void 0),v(this,`blendIndices`,void 0),v(this,`blendWeights`,void 0),v(this,`tangents`,void 0),v(this,`indices`,void 0)}calculateNormals(){this.normals=Cd(this.positions,this.indices)}calculateTangents(){this.tangents=wd(this.positions,this.normals,this.uvs,this.indices)}},Ed=8/64,Dd=1-Ed*2,Od=class extends Td{constructor(e={}){super();let t=e.halfExtents??new k(.5,.5,.5),n=e.widthSegments??1,r=e.lengthSegments??1,i=e.heightSegments??1,a=e.yOffset??0,o=-t.y+a,s=t.y+a,c=[new k(-t.x,o,t.z),new k(t.x,o,t.z),new k(t.x,s,t.z),new k(-t.x,s,t.z),new k(t.x,o,-t.z),new k(-t.x,o,-t.z),new k(-t.x,s,-t.z),new k(t.x,s,-t.z)],l=[[0,1,3],[4,5,7],[3,2,6],[1,0,4],[1,4,2],[5,0,6]],u=[[0,0,1],[0,0,-1],[0,1,0],[0,-1,0],[1,0,0],[-1,0,0]],d={FRONT:0,BACK:1,TOP:2,BOTTOM:3,RIGHT:4,LEFT:5},f=[],p=[],m=[],h=[],g=[],_=0,v=(e,t,n)=>{let r=new k,i=new k,a=new k,o=new k;for(let s=0;s<=t;s++)for(let d=0;d<=n;d++){r.lerp(c[l[e][0]],c[l[e][1]],s/t),i.lerp(c[l[e][0]],c[l[e][2]],d/n),a.sub2(i,c[l[e][0]]),o.add2(r,a);let v=s/t,y=d/n;f.push(o.x,o.y,o.z),p.push(u[e][0],u[e][1],u[e][2]),m.push(v,1-y),v=v*Dd+Ed,y=y*Dd+Ed,v/=3,y/=3,v+=e%3/3,y+=Math.floor(e/3)/3,h.push(v,1-y),s<t&&d<n&&(g.push(_+n+1,_+1,_),g.push(_+n+1,_+n+2,_+1)),_++}};v(d.FRONT,n,i),v(d.BACK,n,i),v(d.TOP,n,r),v(d.BOTTOM,n,r),v(d.RIGHT,r,i),v(d.LEFT,r,i),this.positions=f,this.normals=p,this.uvs=m,this.uvs1=h,this.indices=g,e.calculateTangents&&this.calculateTangents()}},kd=class extends Td{constructor(e={}){super();let t=e.radius??.5,n=e.latitudeBands??16,r=e.longitudeBands??16,i=[],a=[],o=[],s=[];for(let e=0;e<=n;e++){let s=e*Math.PI/n,c=Math.sin(s),l=Math.cos(s);for(let s=0;s<=r;s++){let u=s*2*Math.PI/r-Math.PI/2,d=Math.sin(u),f=Math.cos(u)*c,p=l,m=d*c,h=1-s/r,g=1-e/n;i.push(f*t,p*t,m*t),a.push(f,p,m),o.push(h,1-g)}}for(let e=0;e<n;++e)for(let t=0;t<r;++t){let n=e*(r+1)+t,i=n+r+1;s.push(n+1,i,n),s.push(n+1,i+1,i)}this.positions=i,this.normals=a,this.uvs=o,this.uvs1=o,this.indices=s,e.calculateTangents&&this.calculateTangents()}},Ad=class extends kd{constructor(e={}){let t=.5,n=e.latitudeBands??16,r=e.longitudeBands??16;super({radius:t,latitudeBands:n,longitudeBands:r});let i=this.positions;for(let e=0;e<i.length;e+=3){let n=i[e]/t,r=i[e+1]/t,a=i[e+2]/t;r<0&&(r*=.3,n*n+a*a<.9025&&(r=-.1)),r+=.1,r*=t,i[e+1]=r}}},jd=class e{static create(t,n){switch(n){case`box`:return e.box(t);case no:return e.dome(t)}return e.infinite(t)}static infinite(e){return ts.fromGeometry(e,new Od(e))}static box(e){return ts.fromGeometry(e,new Od({yOffset:.5}))}static dome(e){let t=new Ad({latitudeBands:50,longitudeBands:50});return t.normals=void 0,t.uvs=void 0,ts.fromGeometry(e,t)}},Md=class{constructor(e,t,n,r,i){v(this,`meshInstance`,null),v(this,`_depthWrite`,!1);let a=new yu({uniqueName:`SkyMaterial`,vertexGLSL:Io.get(e,Lt).get(`skyboxVS`),fragmentGLSL:Io.get(e,Lt).get(`skyboxPS`),vertexWGSL:Io.get(e,Rt).get(`skyboxVS`),fragmentWGSL:Io.get(e,Rt).get(`skyboxPS`),attributes:{aPosition:P}});a.setDefine(`{SKYBOX_DECODE_FNC}`,Sd.decodeFunc(r.encoding)),i!==`infinite`&&a.setDefine(`SKYMESH`,``),r.cubemap&&a.setDefine(`SKY_CUBEMAP`,``),a.setParameter(`skyboxHighlightMultiplier`,t.skyboxHighlightMultiplier),r.cubemap?a.setParameter(`texture_cubeMap`,r):(a.setParameter(`texture_envAtlas`,r),a.setParameter(`mipLevel`,t.skyboxMip)),a.cull=2,a.depthWrite=this._depthWrite;let o=t.layers.getLayerById(2);if(o){let t=new Ms(jd.create(e,i),a,n);this.meshInstance=t,t.cull=!1,t.pick=!1,o.addMeshInstances([t]),this.skyLayer=o}}destroy(){this.meshInstance&&(this.skyLayer&&this.skyLayer.removeMeshInstances([this.meshInstance]),this.meshInstance.destroy(),this.meshInstance=null)}set depthWrite(e){if(this._depthWrite=e,this.meshInstance){let t=this.meshInstance.material;t.depthWrite=e,t.sceneTexturesWrite=e&&t.getDefine(`SKYMESH`)}}get depthWrite(){return this._depthWrite}},Nd=class{constructor(e){v(this,`_type`,to),v(this,`_center`,new k(0,1,0)),v(this,`skyMesh`,null),v(this,`_depthWrite`,!1),v(this,`_fisheye`,0),v(this,`_fisheyeProj`,null),v(this,`node`,new ys(`SkyMeshNode`)),this.device=e.device,this.scene=e,this.center=new k(0,1,0),this.centerArray=new Float32Array(3),this.projectedSkydomeCenterId=this.device.scope.resolve(`projectedSkydomeCenter`),this._preRenderEvt=e.on(`prerender`,this._onPreRender,this)}destroy(){this._preRenderEvt.off(),this.resetSkyMesh()}applySettings(e){this.type=e.skyType??`infinite`,this.node.setLocalPosition(new k(e.skyMeshPosition??[0,0,0])),this.node.setLocalEulerAngles(new k(e.skyMeshRotation??[0,0,0])),this.node.setLocalScale(new k(e.skyMeshScale??[1,1,1])),e.skyCenter&&(this._center=new k(e.skyCenter))}set type(e){this._type!==e&&(this._type=e,this.scene.updateShaders=!0,this.updateSkyMesh())}get type(){return this._type}set center(e){this._center.copy(e)}get center(){return this._center}set depthWrite(e){this._depthWrite!==e&&(this._depthWrite=e,this.skyMesh&&(this.skyMesh.depthWrite=e))}get depthWrite(){return this._depthWrite}set fisheye(e){if(this._fisheye!==e){let t=this._fisheye>0;this._fisheye=e;let n=e>0;t!==n&&(this._fisheyeProj??(this._fisheyeProj=new yd),this._type===`infinite`&&this._setFisheyeDefine(n))}}get fisheye(){return this._fisheye}updateSkyMesh(){let e=this.scene._getSkyboxTex();e&&(this.resetSkyMesh(),this.skyMesh=new Md(this.device,this.scene,this.node,e,this.type),this.skyMesh.depthWrite=this._depthWrite,this._fisheye>0&&this.type===`infinite`&&this._setFisheyeDefine(!0),this.scene.fire(`set:skybox`,e))}resetSkyMesh(){this.skyMesh?.destroy(),this.skyMesh=null}update(){if(this.type!==`infinite`){let{center:e,centerArray:t}=this,n=new k;this.node.getWorldTransform().transformPoint(e,n),t[0]=n.x,t[1]=n.y,t[2]=n.z,this.projectedSkydomeCenterId.setValue(t)}}_setFisheyeDefine(e){if(this.skyMesh?.meshInstance){let t=this.skyMesh.meshInstance.material;t.setDefine(`SKY_FISHEYE`,e),t.update()}}_onPreRender(e){if(this._fisheye>0&&this._fisheyeProj&&this.skyMesh?.meshInstance){let t=e.camera,n=this._fisheyeProj;n.update(this._fisheye,t.fov,t.projectionMatrix);let r=this.skyMesh.meshInstance.material;r.setParameter(`fisheye_k`,n.k),r.setParameter(`fisheye_invK`,n.invK),r.setParameter(`fisheye_projMat00`,n.projMat00),r.setParameter(`fisheye_projMat11`,n.projMat11)}}},Pd=new ys;Pd.worldTransform=M.IDENTITY,Pd._dirtyWorld=Pd._dirtyNormal=!1;var Fd=256,Id=100,Ld=class{constructor(e,t,n){v(this,`_positions`,new Float32Array),v(this,`_colors`,new Float32Array),v(this,`_vertexCount`,0),v(this,`_capacity`,0),v(this,`_peakVertexCount`,0),v(this,`_framesSinceHighUse`,0),this.material=t,this.layer=n,this.mesh=new ts(e),this.meshInstance=null}_reserve(e){let t=this._vertexCount+e;if(t<=this._capacity)return;let n=Math.max(this._capacity,Fd);for(;n<t;)n*=2;this._setCapacity(n)}_setCapacity(e){let t=new Float32Array(e*3),n=new Float32Array(e*4),r=Math.min(this._vertexCount,e);r>0&&(t.set(this._positions.subarray(0,r*3)),n.set(this._colors.subarray(0,r*4))),this._positions=t,this._colors=n,this._capacity=e}allocate(e){this._reserve(e);let t=this._vertexCount;return this._vertexCount+=e,t}_writeUniformColor(e,t,n){let r=this._colors,{r:i,g:a,b:o,a:s}=e,c=t*4;for(let e=0;e<n;e++)r[c++]=i,r[c++]=a,r[c++]=o,r[c++]=s}addLines(e,t){let n=e.length,r=this._vertexCount;this._reserve(n);let i=this._positions,a=r*3;for(let t=0;t<n;t++){let n=e[t];i[a++]=n.x,i[a++]=n.y,i[a++]=n.z}if(t.length){let e=this._colors,i=r*4;for(let r=0;r<n;r++){let n=t[r];e[i++]=n.r,e[i++]=n.g,e[i++]=n.b,e[i++]=n.a}}else this._writeUniformColor(t,r,n);this._vertexCount+=n}addLinesArrays(e,t){let n=e.length,r=n/3,i=this._vertexCount;this._reserve(r);let a=this._positions,o=i*3;for(let t=0;t<n;t++)a[o++]=e[t];if(t.length){let e=this._colors,n=r*4,a=i*4;for(let r=0;r<n;r++)e[a++]=t[r]}else this._writeUniformColor(t,i,r);this._vertexCount+=r}onPreRender(e,t){this._vertexCount>0&&this.material.transparent===t&&(this.mesh.setPositions(this._positions,3,this._vertexCount),this.mesh.setColors(this._colors,4,this._vertexCount),this.mesh.update(1,!1),this.meshInstance||(this.meshInstance=new Ms(this.mesh,this.material,Pd),this.meshInstance.cull=!1),e.push(this.meshInstance))}clear(){if(this._vertexCount*2>this._capacity?(this._framesSinceHighUse=0,this._peakVertexCount=0):(this._framesSinceHighUse++,this._peakVertexCount=Math.max(this._peakVertexCount,this._vertexCount)),this._vertexCount=0,this._framesSinceHighUse>=Id&&this._capacity>Fd){let e=Fd;for(;e<this._peakVertexCount;)e*=2;e<this._capacity&&this._setCapacity(e),this._peakVertexCount=0,this._framesSinceHighUse=0}}},Rd=class{constructor(e){this.device=e,this.map=new Map}getBatch(e,t){let n=this.map.get(e);return n||(n=new Ld(this.device,e,t),this.map.set(e,n)),n}onPreRender(e,t){this.map.forEach(n=>{n.onPreRender(e,t)})}clear(){this.map.forEach(e=>e.clear())}},zd=class{constructor(){v(this,`_positions`,null),v(this,`_colors`,null),v(this,`_cursor`,0),v(this,`_end`,0),v(this,`_r`,1),v(this,`_g`,1),v(this,`_b`,1),v(this,`_a`,1)}reset(e,t,n,r,i){this._positions=e,this._colors=t,this._cursor=n,this._end=n+r,this.setColor(i)}setColor(e){this._r=e.r,this._g=e.g,this._b=e.b,this._a=e.a}get filled(){return this._cursor===this._end}get positions(){return this._positions}get colors(){return this._colors}set cursor(e){this._cursor=e}get cursor(){return this._cursor}get end(){return this._end}segment(e,t,n,r,i,a){let o=this._positions,s=this._colors,c=this._cursor,l=c*3;o[l++]=e,o[l++]=t,o[l++]=n,o[l++]=r,o[l++]=i,o[l]=a;let u=this._r,d=this._g,f=this._b,p=this._a,m=c*4;s[m++]=u,s[m++]=d,s[m++]=f,s[m++]=p,s[m++]=u,s[m++]=d,s[m++]=f,s[m]=p,this._cursor=c+2}vertex(e,t,n,r,i,a,o){let s=this._cursor,c=s*3,l=this._positions;l[c++]=e,l[c++]=t,l[c]=n;let u=s*4,d=this._colors;d[u++]=r,d[u++]=i,d[u++]=a,d[u]=o,this._cursor=s+1}},Bd=[],Vd=new k,Hd=class{constructor(e){v(this,`shaderDescs`,new Map),this.device=e,this.quadMesh=null,this.textureShader=null,this.depthTextureShader=null,this.cubeLocalPos=null,this.cubeWorldPos=null,this.batchesMap=new Map,this.allBatches=new Set,this.updatedLayers=new Set,this.lineWriter=new zd,this._materialDepth=null,this._materialNoDepth=null,this.layerMeshInstances=new Map}createMaterial(e){let t=new yu({uniqueName:`ImmediateLine`,vertexGLSL:Io.get(this.device,Lt).get(`immediateLineVS`),fragmentGLSL:Io.get(this.device,Lt).get(`immediateLinePS`),vertexWGSL:Io.get(this.device,Rt).get(`immediateLineVS`),fragmentWGSL:Io.get(this.device,Rt).get(`immediateLinePS`),attributes:{vertex_position:P,vertex_color:tt}});return t.blendType=2,t.depthTest=e,t.update(),t}get materialDepth(){return this._materialDepth||(this._materialDepth=this.createMaterial(!0)),this._materialDepth}get materialNoDepth(){return this._materialNoDepth||(this._materialNoDepth=this.createMaterial(!1)),this._materialNoDepth}getBatch(e,t){let n=this.batchesMap.get(e);n||(n=new Rd(this.device),this.batchesMap.set(e,n)),this.allBatches.add(n);let r=t?this.materialDepth:this.materialNoDepth;return n.getBatch(r,e)}allocateLines(e,t,n,r){let i=this.lineWriter,a=this.getBatch(r,n),o=a.allocate(e);return i.reset(a._positions,a._colors,o,e,t),i}getShaderDesc(e,t,n){return this.shaderDescs.has(e)||this.shaderDescs.set(e,{uniqueName:`DebugShader:${e}`,vertexGLSL:`
					attribute vec2 vertex_position;
					uniform mat4 matrix_model;
					varying vec2 uv0;
					void main(void) {
						gl_Position = matrix_model * vec4(vertex_position, 0, 1);
						uv0 = vertex_position.xy + 0.5;
					}
				`,vertexWGSL:`
					attribute vertex_position: vec2f;
					uniform matrix_model: mat4x4f;
					varying uv0: vec2f;
					@vertex fn vertexMain(input: VertexInput) -> VertexOutput {
						var output: VertexOutput;
						output.position = uniform.matrix_model * vec4f(input.vertex_position, 0.0, 1.0);
						output.uv0 = input.vertex_position.xy + vec2f(0.5);
						return output;
					}
				`,fragmentGLSL:t,fragmentWGSL:n,attributes:{vertex_position:P}}),this.shaderDescs.get(e)}getTextureShaderDesc(e){let t=Sd.decodeFunc(e);return this.getShaderDesc(`textureShader-${e}`,`
			#include "gammaPS"
			varying vec2 uv0;
			uniform sampler2D colorMap;
			void main (void) {
				vec3 linearColor = ${t}(texture2D(colorMap, uv0));
				gl_FragColor = vec4(gammaCorrectOutput(linearColor), 1);
			}
		`,`
			#include "gammaPS"
			varying uv0: vec2f;
			var colorMap: texture_2d<f32>;
			var colorMapSampler: sampler;
			@fragment fn fragmentMain(input : FragmentInput) -> FragmentOutput {
				var output: FragmentOutput;
				let sampledTex = textureSample(colorMap, colorMapSampler, input.uv0);
				let linearColor: vec3f = ${t}(sampledTex);
				output.color = vec4f(gammaCorrectOutput(linearColor), 1.0);
				return output;
			}
		`)}getUnfilterableTextureShaderDesc(){return this.getShaderDesc(`textureShaderUnfilterable`,`
			varying vec2 uv0;
			uniform highp sampler2D colorMap;
			void main (void) {
				ivec2 uv = ivec2(uv0 * textureSize(colorMap, 0));
				gl_FragColor = vec4(texelFetch(colorMap, uv, 0).xyz, 1);
			}
		`,`
			varying uv0: vec2f;
			var colorMap: texture_2d<uff>;
			@fragment fn fragmentMain(input : FragmentInput) -> FragmentOutput {
				var output: FragmentOutput;
				let uv : vec2<i32> = vec2<i32>(input.uv0 * vec2f(textureDimensions(colorMap, 0)));
				let fetchedColor : vec4f = textureLoad(colorMap, uv, 0);
				output.color = vec4f(fetchedColor.xyz, 1.0);
				return output;
			}
		`)}getDepthTextureShaderDesc(){return this.getShaderDesc(`depthTextureShader`,`
			#include "screenDepthPS"
			#include "gammaPS"
			varying vec2 uv0;
			void main() {
				float depth = getLinearScreenDepth(getImageEffectUV(uv0)) * camera_params.x;
				gl_FragColor = vec4(gammaCorrectOutput(vec3(depth)), 1.0);
			}
		`,`
			#include "screenDepthPS"
			#include "gammaPS"
			varying uv0: vec2f;
			@fragment fn fragmentMain(input: FragmentInput) -> FragmentOutput {
				var output: FragmentOutput;
				let depth: f32 = getLinearScreenDepth(getImageEffectUV(input.uv0)) * uniform.camera_params.x;
				output.color = vec4f(gammaCorrectOutput(vec3f(depth)), 1.0);
				return output;
			}
		`)}getQuadMesh(){return this.quadMesh||(this.quadMesh=new ts(this.device),this.quadMesh.setPositions([-.5,-.5,0,.5,-.5,0,-.5,.5,0,.5,.5,0]),this.quadMesh.update(5)),this.quadMesh}drawMesh(e,t,n,r,i){r||(r=new Ms(n,e,this.getGraphNode(t)));let a=this.layerMeshInstances.get(i);a||(a=[],this.layerMeshInstances.set(i,a)),a.push(r)}drawWireAlignedBox(e,t,n,r,i,a){if(a){let n=(e,t,n)=>{Vd.set(e,t,n),a.transformPoint(Vd,Vd),Bd.push(Vd.x,Vd.y,Vd.z)};n(e.x,e.y,e.z),n(e.x,t.y,e.z),n(e.x,t.y,e.z),n(t.x,t.y,e.z),n(t.x,t.y,e.z),n(t.x,e.y,e.z),n(t.x,e.y,e.z),n(e.x,e.y,e.z),n(e.x,e.y,t.z),n(e.x,t.y,t.z),n(e.x,t.y,t.z),n(t.x,t.y,t.z),n(t.x,t.y,t.z),n(t.x,e.y,t.z),n(t.x,e.y,t.z),n(e.x,e.y,t.z),n(e.x,e.y,e.z),n(e.x,e.y,t.z),n(e.x,t.y,e.z),n(e.x,t.y,t.z),n(t.x,t.y,e.z),n(t.x,t.y,t.z),n(t.x,e.y,e.z),n(t.x,e.y,t.z)}else Bd.push(e.x,e.y,e.z,e.x,t.y,e.z,e.x,t.y,e.z,t.x,t.y,e.z,t.x,t.y,e.z,t.x,e.y,e.z,t.x,e.y,e.z,e.x,e.y,e.z,e.x,e.y,t.z,e.x,t.y,t.z,e.x,t.y,t.z,t.x,t.y,t.z,t.x,t.y,t.z,t.x,e.y,t.z,t.x,e.y,t.z,e.x,e.y,t.z,e.x,e.y,e.z,e.x,e.y,t.z,e.x,t.y,e.z,e.x,t.y,t.z,t.x,t.y,e.z,t.x,t.y,t.z,t.x,e.y,e.z,t.x,e.y,t.z);this.getBatch(i,r).addLinesArrays(Bd,n),Bd.length=0}drawWireSphere(e,t,n,r,i,a){let o=2*Math.PI/r,s=0;for(let n=0;n<r;n++){let n=Math.sin(s),r=Math.cos(s);s+=o;let i=Math.sin(s),a=Math.cos(s);Bd.push(e.x+t*n,e.y,e.z+t*r),Bd.push(e.x+t*i,e.y,e.z+t*a),Bd.push(e.x+t*n,e.y+t*r,e.z),Bd.push(e.x+t*i,e.y+t*a,e.z),Bd.push(e.x,e.y+t*n,e.z+t*r),Bd.push(e.x,e.y+t*i,e.z+t*a)}this.getBatch(a,i).addLinesArrays(Bd,n),Bd.length=0}getGraphNode(e){let t=new ys(`ImmediateDebug`);return t.worldTransform=e,t._dirtyWorld=t._dirtyNormal=!1,t}onPreRenderLayer(e,t,n){if(this.batchesMap.forEach((r,i)=>{i===e&&r.onPreRender(t,n)}),!this.updatedLayers.has(e)){this.updatedLayers.add(e);let n=this.layerMeshInstances.get(e);if(n){for(let e=0;e<n.length;e++)t.push(n[e]);n.length=0}}}onPostRender(){this.allBatches.forEach(e=>e.clear()),this.allBatches.clear(),this.updatedLayers.clear()}},Ud=2.399963229728653,Wd={circlePoint(e){let t=Math.sqrt(Math.random()),n=Math.random()*2*Math.PI;e.x=t*Math.cos(n),e.y=t*Math.sin(n)},circlePointDeterministic(e,t,n){let r=t*Ud,i=Math.sqrt(t/n);e.x=i*Math.cos(r),e.y=i*Math.sin(r)},spherePointDeterministic(e,t,n,r=0,i=1){r=1-2*r,i=1-2*i;let a=E.lerp(r,i,t/n),o=Math.sqrt(1-a*a),s=Ud*t;e.x=Math.cos(s)*o,e.y=a,e.z=Math.sin(s)*o},radicalInverse(e){let t=(e<<16|e>>>16)>>>0;return t=((t&1431655765)<<1|(t&2863311530)>>>1)>>>0,t=((t&858993459)<<2|(t&3435973836)>>>2)>>>0,t=((t&252645135)<<4|(t&4042322160)>>>4)>>>0,t=((t&16711935)<<8|(t&4278255360)>>>8)>>>0,t*23283064365386963e-26}},Gd=e=>{switch(e){case Ft:return`Cubemap`;case It:return`Octahedral`;default:return`Equirect`}},Kd=(e,t,n)=>{if(e<=0)t[n+0]=0,t[n+1]=0,t[n+2]=0,t[n+3]=0;else if(e>=1)t[n+0]=255,t[n+1]=0,t[n+2]=0,t[n+3]=0;else{let r=1*e%1,i=255*e%1,a=65025*e%1,o=16581375*e%1;r-=i/255,i-=a/255,a-=o/255,t[n+0]=Math.min(255,Math.floor(r*256)),t[n+1]=Math.min(255,Math.floor(i*256)),t[n+2]=Math.min(255,Math.floor(a*256)),t[n+3]=Math.min(255,Math.floor(o*256))}},qd=e=>{let t=e.length,n=Math.min(t,512),r=Math.ceil(t/n),i=new Uint8Array(n*r*4),a=0;for(let n=0;n<t;n+=4)Kd(e[n+0]*.5+.5,i,a+0),Kd(e[n+1]*.5+.5,i,a+4),Kd(e[n+2]*.5+.5,i,a+8),Kd(e[n+3]/8,i,a+12),a+=16;return{width:n,height:r,data:i}},Jd=(e,t,n,r)=>{let i=n*2*Math.PI,a=(1-t)**(1/(r+1)),o=Math.sqrt(1-a*a);e.set(Math.cos(i)*o,Math.sin(i)*o,a).normalize()},Yd=(e,t,n)=>{let r=n*2*Math.PI,i=Math.sqrt(1-t),a=Math.sqrt(t);e.set(Math.cos(r)*a,Math.sin(r)*a,i).normalize()},Xd=(e,t,n,r)=>{let i=n*2*Math.PI,a=Math.sqrt((1-t)/(1+(r*r-1)*t)),o=Math.sqrt(1-a*a);e.set(Math.cos(i)*o,Math.sin(i)*o,a).normalize()},Zd=(e,t)=>{let n=e*t,r=t/(1-e*e+n*n);return r*r*(1/Math.PI)},Qd=(e,t)=>{let n=new k,r=[];for(let i=0;i<e;++i)Jd(n,i/e,Wd.radicalInverse(i),t),r.push(n.x,n.y,n.z,0);return r},$d=(e,t)=>{let n=t/e,r=new k,i=[];for(let t=0;t<e;++t){Yd(r,t/e,Wd.radicalInverse(t));let a=r.z/Math.PI,o=.5*Math.log2(n/a);i.push(r.x,r.y,r.z,o)}return i},ef={16:{2:26,8:20,32:17,128:16,512:16},32:{2:53,8:40,32:34,128:32,512:32},128:{2:214,8:163,32:139,128:130,512:128},1024:{2:1722,8:1310,32:1114,128:1041,512:1025}},tf=(e,t)=>{let n=ef[e];return n&&n[t]||e},nf=(e,t,n)=>{let r=n/e,i=1-Math.log2(t)/11,a=i*i,o=new k,s=new k,c=new k(0,0,1),l=[],u=tf(e,t);for(let e=0;e<u;++e){Xd(o,e/u,Wd.radicalInverse(e),a);let t=o.z;if(s.set(o.x,o.y,o.z).mulScalar(2*t).sub(c),s.z>0){let e=Zd(Math.min(1,t),a)/4+.001,n=.5*Math.log2(r/e);l.push(s.x,s.y,s.z,n)}}for(;l.length<e*4;)l.push(0,0,0,0);return l},rf=(e,t,n)=>{let r=qd(n);return new dn(e,{name:t,width:r.width,height:r.height,mipmaps:!1,minFilter:0,magFilter:0,levels:[r.data]})},af=class{constructor(e=!0){v(this,`map`,new Map),this.destroyContent=e}destroy(){this.destroyContent&&this.map.forEach((e,t)=>{e.destroy()})}get(e,t){if(!this.map.has(e)){let n=t();return this.map.set(e,n),n}return this.map.get(e)}},of=new af(!1),sf=new an,cf=(e,t,n)=>sf.get(e,()=>new af).get(t,()=>rf(e,t,of.get(t,n))),lf=(e,t,n)=>cf(e,`lambert-samples-${t}-${n}`,()=>$d(t,n)),uf=(e,t,n)=>cf(e,`phong-samples-${t}-${n}`,()=>Qd(t,n)),df=(e,t,n,r)=>cf(e,`ggx-samples-${t}-${n}-${r}`,()=>nf(t,n,r));function ff(e,t,n={}){let r=n.seamPixels??0,i=(n.rect?.z??t.width)-r*2,a=(n.rect?.w??t.height)-r*2;if(i<1||a<1)return!1;let o={none:`reproject`,lambert:`prefilterSamplesUnweighted`,phong:`prefilterSamplesUnweighted`,ggx:`prefilterSamples`},s=n.hasOwnProperty(`specularPower`)?n.specularPower:1,c=n.hasOwnProperty(`face`)?n.face:null,l=n.hasOwnProperty(`distribution`)?n.distribution:s===1?`none`:`phong`,u=o[l]||`reproject`,d=u.startsWith(`prefilterSamples`),f=Sd.decodeFunc(e.encoding),p=Sd.encodeFunc(t.encoding),m=`sample${Gd(e.projection)}`,h=`getDirection${Gd(t.projection)}`,g=n.hasOwnProperty(`numSamples`)?n.numSamples:1024,_=`ReprojectShader:${u}_${f}_${p}_${m}_${h}_${g}`,v=e.device,y=Oo(v).getCachedShader(_);if(!y){let t=new Map;d&&t.set(`USE_SAMPLES_TEX`,``),e.cubemap&&t.set(`CUBEMAP_SOURCE`,``),t.set(`{PROCESS_FUNC}`,u),t.set(`{DECODE_FUNC}`,f),t.set(`{ENCODE_FUNC}`,p),t.set(`{SOURCE_FUNC}`,m),t.set(`{TARGET_FUNC}`,h),t.set(`{NUM_SAMPLES}`,g),t.set(`{NUM_SAMPLES_SQRT}`,Math.round(Math.sqrt(g)).toFixed(1)),y=zo.createShader(v,{uniqueName:_,attributes:{vertex_position:P},vertexChunk:`reprojectVS`,fragmentChunk:`reprojectPS`,fragmentDefines:t})}v.setBlendState(Vn.NOBLEND),v.scope.resolve(e.cubemap?`sourceCube`:`sourceTex`).setValue(e);let b=v.scope.resolve(`params`),x=v.scope.resolve(`uvMod`);r>0?x.setValue([(i+r*2)/i,(a+r*2)/a,-r/i,-r/a]):x.setValue([1,1,0,0]);let S=[0,t.width*t.height*(t.cubemap?6:1),e.width*e.height*(e.cubemap?6:1)];if(d){let t=e.width*e.height*(e.cubemap?6:1),n=l===`ggx`?df(v,g,s,t):l===`lambert`?lf(v,g,t):uf(v,g,s);v.scope.resolve(`samplesTex`).setValue(n),v.scope.resolve(`samplesTexInverseSize`).setValue([1/n.width,1/n.height])}for(let e=0;e<(t.cubemap?6:1);e++)if(c===null||e===c){let r=new gr({colorBuffer:t,face:e,depth:!1,origin:Me});S[0]=e,b.setValue(S),qo(v,r,y,n?.rect),r.destroy()}return!0}var pf=(e,t=0)=>1+Math.floor(Math.log2(Math.max(e,t))),mf=e=>e.textureHalfFloatRenderable,hf=e=>e.textureFloatRenderable,gf=e=>mf(e)?12:hf(e)?14:7,_f=e=>7,vf=(e,t,n,r)=>new dn(e,{name:`lighting-${t}`,cubemap:!0,width:t,height:t,format:n,type:n===7?At:Dt,addressU:1,addressV:1,mipmaps:!!r}),yf=class{static generateSkyboxCubemap(e,t){let n=e.device,r=vf(n,t||(e.cubemap?e.width:e.width/4),7,!1);return ff(e,r,{numSamples:1024}),r}static generateLightingSource(e,t){let n=e.device,r=gf(n),i=t?.target||new dn(n,{name:`lighting-source`,cubemap:!0,width:t?.size||128,height:t?.size||128,format:r,type:r===7?`rgbp`:`default`,addressU:1,addressV:1,mipmaps:!0});return ff(e,i,{numSamples:e.mipmaps?1:1024}),i}static generateAtlas(e,t){let n=e.device,r=_f(n),i=t?.target||new dn(n,{name:`envAtlas`,width:t?.size||512,height:t?.size||512,format:r,type:r===7?`rgbp`:`default`,projection:`equirect`,addressU:1,addressV:1,mipmaps:!1}),a=i.width/512,o=new j(0,0,512*a,256*a),s=pf(256)-pf(4);for(let t=0;t<s;++t)ff(e,i,{numSamples:1,rect:o,seamPixels:a}),o.x+=o.w,o.y+=o.w,o.z=Math.max(1,Math.floor(o.z*.5)),o.w=Math.max(1,Math.floor(o.w*.5));o.set(0,256*a,256*a,128*a);for(let n=1;n<7;++n)ff(e,i,{numSamples:t?.numReflectionSamples||1024,distribution:t?.distribution||`ggx`,specularPower:Math.max(1,2048>>n*2),rect:o,seamPixels:a}),o.y+=o.w,o.z=Math.max(1,Math.floor(o.z*.5)),o.w=Math.max(1,Math.floor(o.w*.5));return o.set(128*a,384*a,64*a,32*a),ff(e,i,{numSamples:t?.numAmbientSamples||2048,distribution:`lambert`,rect:o,seamPixels:a}),i}static generatePrefilteredAtlas(e,t){let n=e[0].device,r=e[0].format,i=e[0].type,a=t?.target||new dn(n,{name:`envPrefilteredAtlas`,width:t?.size||512,height:t?.size||512,format:r,type:i,projection:`equirect`,addressU:1,addressV:1,mipmaps:!1}),o=a.width/512,s=new j(0,0,512*o,256*o),c=pf(512);for(let t=0;t<c;++t)ff(e[0],a,{numSamples:1,rect:s,seamPixels:o}),s.x+=s.w,s.y+=s.w,s.z=Math.max(1,Math.floor(s.z*.5)),s.w=Math.max(1,Math.floor(s.w*.5));s.set(0,256*o,256*o,128*o);for(let t=1;t<e.length;++t)ff(e[t],a,{numSamples:1,rect:s,seamPixels:o}),s.y+=s.w,s.z=Math.max(1,Math.floor(s.z*.5)),s.w=Math.max(1,Math.floor(s.w*.5));return s.set(128*o,384*o,64*o,32*o),t?.legacyAmbient?ff(e[5],a,{numSamples:1,rect:s,seamPixels:o}):ff(e[0],a,{numSamples:t?.numSamples||2048,distribution:`lambert`,rect:s,seamPixels:o}),a}},bf=class{constructor(){v(this,`type`,Oa),v(this,`color`,new O(0,0,0)),v(this,`density`,0),v(this,`start`,1),v(this,`end`,1e3)}},xf=class extends b{constructor(e){super(),v(this,`ambientBake`,!1),v(this,`ambientBakeOcclusionBrightness`,0),v(this,`ambientBakeOcclusionContrast`,0),v(this,`ambientLight`,new O(0,0,0)),v(this,`ambientLuminance`,0),v(this,`exposure`,1),v(this,`lightmapSizeMultiplier`,1),v(this,`lightmapMaxResolution`,2048),v(this,`lightmapMode`,1),v(this,`lightmapFilterEnabled`,!1),v(this,`lightmapHDR`,!1),v(this,`root`,null),v(this,`physicalUnits`,!1),v(this,`_envAtlas`,null),v(this,`_skyboxCubeMap`,null),v(this,`_fogParams`,new bf),this.device=e,this._gravity=new k(0,-9.8,0),this._layers=null,this._prefilteredCubemaps=[],this._internalEnvAtlas=null,this._skyboxIntensity=1,this._skyboxLuminance=0,this._skyboxMip=0,this._skyboxHighlightMultiplier=1,this._skyboxRotationShaderInclude=!1,this._skyboxRotation=new N,this._skyboxRotationMat3=new ae,this._skyboxRotationMat4=new M,this._ambientBakeNumSamples=1,this._ambientBakeSpherePart=.4,this._lightmapFilterRange=10,this._lightmapFilterSmoothness=.2,this._clusteredLightingEnabled=!0,this._lightingParams=new gu(this.device.supportsAreaLights,this.device.maxTextureSize,()=>{this.updateShaders=!0}),this.gsplatCentersEnabled=!0,this._gsplatParams=new vd(this.device),this._sky=new Nd(this),this._stats={meshInstances:0,lights:0,dynamicLights:0,bakedLights:0,updateShadersTime:0},this.updateShaders=!0,this._shaderVersion=0,this.immediate=new Hd(this.device)}get defaultDrawLayer(){return this.layers.getLayerById(3)}set ambientBakeNumSamples(e){this._ambientBakeNumSamples=E.clamp(Math.floor(e),1,255)}get ambientBakeNumSamples(){return this._ambientBakeNumSamples}set ambientBakeSpherePart(e){this._ambientBakeSpherePart=E.clamp(e,.001,1)}get ambientBakeSpherePart(){return this._ambientBakeSpherePart}set clusteredLightingEnabled(e){if(!this.device.isWebGPU||e){if(!this._clusteredLightingEnabled&&e){console.error(`Turning on disabled clustered lighting is not currently supported`);return}this._clusteredLightingEnabled=e}}get clusteredLightingEnabled(){return this._clusteredLightingEnabled}set envAtlas(e){e!==this._envAtlas&&(this._envAtlas=e,e&&(e.addressU=1,e.addressV=1,e.minFilter=1,e.magFilter=1,e.mipmaps=!1),this._prefilteredCubemaps=[],this._internalEnvAtlas&&(this._internalEnvAtlas.destroy(),this._internalEnvAtlas=null),this._resetSkyMesh())}get envAtlas(){return this._envAtlas}set layers(e){let t=this._layers;this._layers=e,this.fire(`set:layers`,t,e)}get layers(){return this._layers}get sky(){return this._sky}get lighting(){return this._lightingParams}get gsplat(){return this._gsplatParams}get fog(){return this._fogParams}set lightmapFilterRange(e){this._lightmapFilterRange=Math.max(e,.001)}get lightmapFilterRange(){return this._lightmapFilterRange}set lightmapFilterSmoothness(e){this._lightmapFilterSmoothness=Math.max(e,.001)}get lightmapFilterSmoothness(){return this._lightmapFilterSmoothness}set prefilteredCubemaps(e){e=e||[];let t=this._prefilteredCubemaps;(t.length!==e.length||t.some((t,n)=>t!==e[n]))&&(e.length===6&&e.every(e=>!!e)?(this._internalEnvAtlas=yf.generatePrefilteredAtlas(e,{target:this._internalEnvAtlas}),this._envAtlas=this._internalEnvAtlas):(this._internalEnvAtlas&&(this._internalEnvAtlas.destroy(),this._internalEnvAtlas=null),this._envAtlas=null),this._prefilteredCubemaps=e.slice(),this._resetSkyMesh())}get prefilteredCubemaps(){return this._prefilteredCubemaps}set skybox(e){e!==this._skyboxCubeMap&&(this._skyboxCubeMap=e,this._resetSkyMesh())}get skybox(){return this._skyboxCubeMap}set skyboxIntensity(e){e!==this._skyboxIntensity&&(this._skyboxIntensity=e,this._resetSkyMesh())}get skyboxIntensity(){return this._skyboxIntensity}set skyboxLuminance(e){e!==this._skyboxLuminance&&(this._skyboxLuminance=e,this._resetSkyMesh())}get skyboxLuminance(){return this._skyboxLuminance}set skyboxMip(e){e!==this._skyboxMip&&(this._skyboxMip=e,this._resetSkyMesh())}get skyboxMip(){return this._skyboxMip}set skyboxHighlightMultiplier(e){e!==this._skyboxHighlightMultiplier&&(this._skyboxHighlightMultiplier=e,this._resetSkyMesh())}get skyboxHighlightMultiplier(){return this._skyboxHighlightMultiplier}set skyboxRotation(e){if(!this._skyboxRotation.equals(e)){let t=e.equals(N.IDENTITY);this._skyboxRotation.copy(e),t?this._skyboxRotationMat3.setIdentity():(this._skyboxRotationMat4.setTRS(k.ZERO,e,k.ONE),this._skyboxRotationMat3.invertMat4(this._skyboxRotationMat4)),!this._skyboxRotationShaderInclude&&!t&&(this._skyboxRotationShaderInclude=!0,this._resetSkyMesh())}}get skyboxRotation(){return this._skyboxRotation}destroy(){this._sky.destroy(),this.root=null,this.off()}drawLine(e,t,n=O.WHITE,r=!0,i=this.defaultDrawLayer){this.immediate.getBatch(i,r).addLines([e,t],[n,n])}drawLines(e,t,n=!0,r=this.defaultDrawLayer){this.immediate.getBatch(r,n).addLines(e,t)}drawLineArrays(e,t,n=!0,r=this.defaultDrawLayer){this.immediate.getBatch(r,n).addLinesArrays(e,t)}applySettings(e){let t=e.physics,n=e.render;this._gravity.set(t.gravity[0],t.gravity[1],t.gravity[2]),this.ambientLight.set(n.global_ambient[0],n.global_ambient[1],n.global_ambient[2]),this.ambientLuminance=n.ambientLuminance,this.fog.type=n.fog,this.fog.color.set(n.fog_color[0],n.fog_color[1],n.fog_color[2]),this.fog.start=n.fog_start,this.fog.end=n.fog_end,this.fog.density=n.fog_density,this.lightmapSizeMultiplier=n.lightmapSizeMultiplier,this.lightmapMaxResolution=n.lightmapMaxResolution,this.lightmapMode=n.lightmapMode,this.exposure=n.exposure,this._skyboxIntensity=n.skyboxIntensity??1,this._skyboxLuminance=n.skyboxLuminance??2e4,this._skyboxMip=n.skyboxMip??0,n.skyboxRotation&&(this.skyboxRotation=new N().setFromEulerAngles(n.skyboxRotation[0],n.skyboxRotation[1],n.skyboxRotation[2])),this.sky.applySettings(n),this.clusteredLightingEnabled=n.clusteredLightingEnabled??!1,this.lighting.applySettings(n),this.gsplat.applySettings(n),[`lightmapFilterEnabled`,`lightmapFilterRange`,`lightmapFilterSmoothness`,`ambientBake`,`ambientBakeNumSamples`,`ambientBakeSpherePart`,`ambientBakeOcclusionBrightness`,`ambientBakeOcclusionContrast`].forEach(e=>{n.hasOwnProperty(e)&&(this[e]=n[e])}),this._resetSkyMesh()}_getSkyboxTex(){let e=this._prefilteredCubemaps;return this._skyboxMip?e[[0,1,3,4,5,6][this._skyboxMip]]||this._envAtlas||e[0]||this._skyboxCubeMap:this._skyboxCubeMap||e[0]||this._envAtlas}_updateSkyMesh(){this.sky.skyMesh||this.sky.updateSkyMesh(),this.sky.update()}_resetSkyMesh(){this.sky.resetSkyMesh(),this.updateShaders=!0}setSkybox(e){e?(this.skybox=e[0]||null,e[1]&&!e[1].cubemap?this.envAtlas=e[1]:this.prefilteredCubemaps=e.slice(1)):(this.skybox=null,this.envAtlas=null)}get lightmapPixelFormat(){return this.lightmapHDR&&this.device.getRenderableHdrFormat()||7}get defaultMaterial(){return xs(this.device)}set fogColor(e){this.fog.color=e}get fogColor(){return this.fog.color}set fogEnd(e){this.fog.end=e}get fogEnd(){return this.fog.end}set fogStart(e){this.fog.start=e}get fogStart(){return this.fog.start}set fogDensity(e){this.fog.density=e}get fogDensity(){return this.fog.density}set skyboxPrefiltered128(e){this._prefilteredCubemaps[0]=e,this.updateShaders=!0}get skyboxPrefiltered128(){return this._prefilteredCubemaps[0]}set skyboxPrefiltered64(e){this._prefilteredCubemaps[1]=e,this.updateShaders=!0}get skyboxPrefiltered64(){return this._prefilteredCubemaps[1]}set skyboxPrefiltered32(e){this._prefilteredCubemaps[2]=e,this.updateShaders=!0}get skyboxPrefiltered32(){return this._prefilteredCubemaps[2]}set skyboxPrefiltered16(e){this._prefilteredCubemaps[3]=e,this.updateShaders=!0}get skyboxPrefiltered16(){return this._prefilteredCubemaps[3]}set skyboxPrefiltered8(e){this._prefilteredCubemaps[4]=e,this.updateShaders=!0}get skyboxPrefiltered8(){return this._prefilteredCubemaps[4]}set skyboxPrefiltered4(e){this._prefilteredCubemaps[5]=e,this.updateShaders=!0}get skyboxPrefiltered4(){return this._prefilteredCubemaps[5]}get models(){return this._models??(this._models=[]),this._models}};v(xf,`EVENT_SETLAYERS`,`set:layers`),v(xf,`EVENT_SETSKYBOX`,`set:skybox`),v(xf,`EVENT_PRERENDER`,`prerender`),v(xf,`EVENT_POSTRENDER`,`postrender`),v(xf,`EVENT_PRERENDER_LAYER`,`prerender:layer`),v(xf,`EVENT_POSTRENDER_LAYER`,`postrender:layer`),v(xf,`EVENT_PRECULL`,`precull`),v(xf,`EVENT_POSTCULL`,`postcull`);var Sf=class{constructor(){v(this,`hasTangents`,!1),v(this,`shaderChunks`,null),v(this,`pass`,0),v(this,`alphaTest`,!1),v(this,`blendType`,3),v(this,`separateAmbient`,!1),v(this,`screenSpace`,!1),v(this,`skin`,!1),v(this,`batch`,!1),v(this,`useInstancing`,!1),v(this,`useMorphPosition`,!1),v(this,`useMorphNormal`,!1),v(this,`useMorphTextureBasedInt`,!1),v(this,`nineSlicedMode`,0),v(this,`clusteredLightingEnabled`,!0),v(this,`clusteredLightingCookiesEnabled`,!1),v(this,`clusteredLightingShadowsEnabled`,!1),v(this,`clusteredLightingShadowType`,0),v(this,`clusteredLightingAreaLightsEnabled`,!1),v(this,`vertexColors`,!1),v(this,`useVertexColorGamma`,!1),v(this,`lightMapEnabled`,!1),v(this,`dirLightMapEnabled`,!1),v(this,`useHeights`,!1),v(this,`useNormals`,!1),v(this,`useClearCoatNormals`,!1),v(this,`useAo`,!1),v(this,`diffuseMapEnabled`,!1),v(this,`pixelSnap`,!1),v(this,`ambientSH`,!1),v(this,`ssao`,!1),v(this,`twoSidedLighting`,!1),v(this,`occludeDirect`,!1),v(this,`occludeSpecular`,0),v(this,`occludeSpecularFloat`,!1),v(this,`useMsdf`,!1),v(this,`msdfTextAttribute`,!1),v(this,`alphaToCoverage`,!1),v(this,`opacityFadesSpecular`,!1),v(this,`opacityDither`,ro),v(this,`opacityShadowDither`,ro),v(this,`cubeMapProjection`,0),v(this,`useSpecular`,!1),v(this,`useSpecularityFactor`,!1),v(this,`enableGGXSpecular`,!1),v(this,`fresnelModel`,0),v(this,`useRefraction`,!1),v(this,`useClearCoat`,!1),v(this,`useSheen`,!1),v(this,`useIridescence`,!1),v(this,`useMetalness`,!1),v(this,`useDynamicRefraction`,!1),v(this,`dispersion`,!1),v(this,`fog`,Oa),v(this,`gamma`,0),v(this,`toneMap`,-1),v(this,`reflectionSource`,za),v(this,`reflectionEncoding`,null),v(this,`reflectionCubemapEncoding`,null),v(this,`ambientSource`,`constant`),v(this,`ambientEncoding`,null),v(this,`skyboxIntensity`,1),v(this,`useCubeMapRotation`,!1),v(this,`lightMapWithoutAmbient`,!1),v(this,`lights`,[]),v(this,`noShadow`,!1),v(this,`lightMaskDynamic`,0),v(this,`userAttributes`,{}),v(this,`linearDepth`,!1),v(this,`shadowCatcher`,!1)}},Cf=class e{static update(t,n,r,i,a,o,s){e.updateSharedOptions(t,n,r,a,o,i),e.updateMaterialOptions(t,n),e.updateEnvOptions(t,n,r,i),e.updateLightingOptions(t,n,r,a,s)}static updateSharedOptions(e,t,n,r,i,a){e.shaderChunks=t.shaderChunks,e.pass=i,e.linearDepth=i===1||!!a?.sceneTextures.includes(`depth`),e.alphaTest=t.alphaTest>0,e.blendType=t.blendType,e.screenSpace=r&&!!(r&256),e.skin=r&&!!(r&2),e.useInstancing=r&&!!(r&32),e.useMorphPosition=r&&!!(r&1024),e.useMorphNormal=r&&!!(r&2048),e.useMorphTextureBasedInt=r&&!!(r&8192),e.hasTangents=r&&!!(r&512),e.nineSlicedMode=t.nineSlicedMode||0,t.useLighting&&n.clusteredLightingEnabled?(e.clusteredLightingEnabled=!0,e.clusteredLightingCookiesEnabled=n.lighting.cookiesEnabled,e.clusteredLightingShadowsEnabled=n.lighting.shadowsEnabled,e.clusteredLightingShadowType=n.lighting.shadowType,e.clusteredLightingAreaLightsEnabled=n.lighting.areaLightsEnabled):(e.clusteredLightingEnabled=!1,e.clusteredLightingCookiesEnabled=!1,e.clusteredLightingShadowsEnabled=!1,e.clusteredLightingAreaLightsEnabled=!1)}static updateMaterialOptions(e,t){e.separateAmbient=!1,e.pixelSnap=t.pixelSnap,e.ambientSH=t.ambientSH,e.twoSidedLighting=t.twoSidedLighting,e.occludeDirect=t.occludeDirect,e.occludeSpecular=t.occludeSpecular,e.occludeSpecularFloat=t.occludeSpecularIntensity!==1,e.useMsdf=!1,e.msdfTextAttribute=!1,e.alphaToCoverage=t.alphaToCoverage,e.opacityFadesSpecular=t.opacityFadesSpecular,e.opacityDither=t.opacityDither,e.cubeMapProjection=0,e.useSpecular=t.hasSpecular,e.useSpecularityFactor=t.hasSpecularityFactor,e.enableGGXSpecular=t.ggxSpecular,e.useAnisotropy=!1,e.fresnelModel=t.fresnelModel,e.useRefraction=t.hasRefraction,e.useClearCoat=t.hasClearCoat,e.useSheen=t.hasSheen,e.useIridescence=t.hasIrridescence,e.useMetalness=t.hasMetalness,e.useDynamicRefraction=t.dynamicRefraction,e.dispersion=t.dispersion>0,e.vertexColors=!1,e.lightMapEnabled=t.hasLighting,e.dirLightMapEnabled=t.dirLightMap,e.useHeights=t.hasHeights,e.useNormals=t.hasNormals,e.useClearCoatNormals=t.hasClearCoatNormals,e.useAo=t.hasAo,e.diffuseMapEnabled=t.hasDiffuseMap}static updateEnvOptions(e,t,n,r){e.fog=t.useFog?r.fog:Oa,e.gamma=r.shaderOutputGamma,e.toneMap=t.useTonemap?r.toneMapping:6,t.useSkybox&&n.envAtlas&&n.skybox?(e.reflectionSource=Va,e.reflectionEncoding=n.envAtlas.encoding,e.reflectionCubemapEncoding=n.skybox.encoding):t.useSkybox&&n.envAtlas?(e.reflectionSource=Ba,e.reflectionEncoding=n.envAtlas.encoding):t.useSkybox&&n.skybox?(e.reflectionSource=Ha,e.reflectionEncoding=n.skybox.encoding):(e.reflectionSource=za,e.reflectionEncoding=null),t.ambientSH?(e.ambientSource=Ga,e.ambientEncoding=null):e.reflectionSource!==`none`&&n.envAtlas?(e.ambientSource=Ka,e.ambientEncoding=n.envAtlas.encoding):(e.ambientSource=qa,e.ambientEncoding=null);let i=e.reflectionSource!==za;e.skyboxIntensity=i,e.useCubeMapRotation=i&&n._skyboxRotationShaderInclude}static updateLightingOptions(t,n,r,i,a){if(t.lightMapWithoutAmbient=!1,n.useLighting){let n=[],o=i?i>>16:1;t.lightMaskDynamic=!!(o&1),t.lightMapWithoutAmbient=!1,a&&(e.collectLights(0,a[0],n,o),r.clusteredLightingEnabled||(e.collectLights(1,a[1],n,o),e.collectLights(2,a[2],n,o))),t.lights=n}else t.lights=[];(t.lights.length===0&&!r.clusteredLightingEnabled||i&1)&&(t.noShadow=!0)}static collectLights(e,t,n,r){for(let e=0;e<t.length;e++){let i=t[e];i.enabled&&i.mask&r&&n.push(i)}}},wf={vertex_normal:Ze,vertex_tangent:Qe,vertex_texCoord0:rt,vertex_texCoord1:it,vertex_color:tt,vertex_boneWeights:$e,vertex_boneIndices:et},Tf=class{constructor(e,t,n=!0){v(this,`varyingsCode`,``),v(this,`device`,void 0),v(this,`options`,void 0),v(this,`shaderLanguage`,void 0),v(this,`vDefines`,new Map),v(this,`fDefines`,new Map),v(this,`includes`,new Map),v(this,`chunks`,null),this.device=e,this.options=t;let r=t.shaderChunks;if(this.shaderLanguage=e.isWebGPU&&n&&(!r||r.useWGSL)?Rt:Lt,e.isWebGPU&&this.shaderLanguage===`glsl`&&e.hasTranspilers,this.attributes={vertex_position:P},t.userAttributes)for(let[e,n]of Object.entries(t.userAttributes))this.attributes[n]=e;let i=Io.get(e,this.shaderLanguage);this.chunks=new Map(i),r&&(this.shaderLanguage===`glsl`?r.glsl:r.wgsl).forEach((e,t)=>{for(let t in wf)wf.hasOwnProperty(t)&&e.indexOf(t)>=0&&(this.attributes[t]=wf[t]);this.chunks.set(t,e)}),this.shaderPassInfo=No.get(this.device).getByIndex(t.pass),this.shadowPass=this.shaderPassInfo.isShadow,this.lighting=t.lights.length>0||t.dirLightMapEnabled||t.clusteredLightingEnabled,this.reflections=t.reflectionSource!==za,this.needsNormal=this.lighting||this.reflections||t.useRefraction||t.useSpecular||t.ambientSH||t.useHeights||t.enableGGXSpecular||t.clusteredLightingEnabled&&!this.shadowPass||t.useClearCoatNormals,this.needsNormal=this.needsNormal&&!this.shadowPass,this.needsSceneColor=t.useDynamicRefraction,this.needsScreenSize=t.useDynamicRefraction,this.needsTransforms=t.useDynamicRefraction,this.vshader=null,this.fshader=null}fDefineSet(e,t,n=``){e&&this.fDefines.set(t,n)}sharedDefineSet(e,t,n=``){e&&(this.vDefines.set(t,n),this.fDefines.set(t,n))}generateVertexShader(e,t,n){let{options:r,vDefines:i,attributes:a}=this,o=new Map;if(o.set(`vPositionW`,`vec3`),(r.nineSlicedMode===1||r.nineSlicedMode===2)&&i.set(`NINESLICED`,!0),this.options.linearDepth&&(i.set(`LINEAR_DEPTH`,!0),o.set(`vLinearDepth`,`float`)),this.needsNormal&&i.set(`NORMALS`,!0),this.options.useInstancing){let e=Io.get(this.device,this.shaderLanguage);this.chunks.get(`transformInstancingVS`)===e.get(`transformInstancingVS`)&&(a.instance_line1=St,a.instance_line2=Ct,a.instance_line3=Tt,a.instance_line4=Et)}this.needsNormal&&(a.vertex_normal=Ze,o.set(`vNormalW`,`vec3`),r.hasTangents&&(r.useHeights||r.useNormals||r.useClearCoatNormals||r.enableGGXSpecular)?(i.set(`TANGENTS`,!0),a.vertex_tangent=Qe,o.set(`vTangentW`,`vec3`),o.set(`vBinormalW`,`vec3`)):r.enableGGXSpecular&&(i.set(`GGX_SPECULAR`,!0),o.set(`vObjectSpaceUpW`,`vec3`)));for(let n=0;n<2;n++)e[n]&&(i.set(`UV${n}`,!0),a[`vertex_texCoord${n}`]=`TEXCOORD${n}`),t[n]&&(i.set(`UV${n}_UNMODIFIED`,!0),o.set(`vUv${n}`,`vec2`));let s=0,c=new Set;n.forEach(e=>{let{id:t,uv:n,name:r}=e,a=t+n*100;if(!c.has(a)){c.add(a),o.set(`vUV${n}_${t}`,`vec2`);let e=`texture_${r}MapTransform`;i.set(`{TRANSFORM_NAME_${s}}`,e),i.set(`{TRANSFORM_UV_${s}}`,n),i.set(`{TRANSFORM_ID_${s}}`,t),s++}}),i.set(`UV_TRANSFORMS_COUNT`,s),r.vertexColors&&(a.vertex_color=tt,i.set(`VERTEX_COLOR`,!0),o.set(`vVertexColor`,`vec4`),r.useVertexColorGamma&&i.set(`STD_VERTEX_COLOR_GAMMA`,``)),r.useMsdf&&r.msdfTextAttribute&&(a.vertex_outlineParameters=yt,a.vertex_shadowParameters=bt,i.set(`MSDF`,!0)),(r.useMorphPosition||r.useMorphNormal)&&(this.sharedDefineSet(!0,`MORPHING`,!0),this.sharedDefineSet(r.useMorphTextureBasedInt,`MORPHING_INT`,!0),this.sharedDefineSet(r.useMorphPosition,`MORPHING_POSITION`,!0),this.sharedDefineSet(r.useMorphNormal,`MORPHING_NORMAL`,!0),a.morph_vertex_id=Et),r.skin&&(a.vertex_boneIndices=et,r.batch?this.sharedDefineSet(!0,`BATCH`,!0):(a.vertex_boneWeights=$e,this.sharedDefineSet(!0,`SKIN`,!0))),this.sharedDefineSet(r.useInstancing,`INSTANCING`,!0),this.sharedDefineSet(r.screenSpace,`SCREENSPACE`,!0),r.pixelSnap&&i.set(`PIXELSNAP`,!0),o.forEach((e,t)=>{this.varyingsCode+=`#define VARYING_${t.toUpperCase()}
`,this.varyingsCode+=this.shaderLanguage===`wgsl`?`varying ${t}: ${Xt.get(e)};
`:`varying ${e} ${t};
`}),this.includes.set(`varyingsVS`,this.varyingsCode),this.includes.set(`varyingsPS`,this.varyingsCode),this.vshader=`
						#include "litMainVS"
				`}_setupLightingDefines(e,t){let n=this.fDefines,r=this.options;if(this.fDefines.set(`LIGHT_COUNT`,r.lights.length),e&&n.set(`AREA_LIGHTS`,!0),t&&this.lighting&&(n.set(`LIT_CLUSTERED_LIGHTS`,!0),r.clusteredLightingCookiesEnabled&&n.set(`CLUSTER_COOKIES`,!0),r.clusteredLightingAreaLightsEnabled&&n.set(`CLUSTER_AREALIGHTS`,!0),r.lightMaskDynamic&&n.set(`CLUSTER_MESH_DYNAMIC_LIGHTS`,!0),r.clusteredLightingShadowsEnabled&&!r.noShadow)){let e=Pa.get(r.clusteredLightingShadowType);n.set(`CLUSTER_SHADOWS`,!0),n.set(`SHADOW_KIND_${e.kind}`,!0),n.set(`CLUSTER_SHADOW_TYPE_${e.kind}`,!0)}for(let i=0;i<r.lights.length;i++){let a=r.lights[i],o=a._type;if(t&&o!==0)continue;let s=e&&a._shape?a._shape:0,c=a._shadowType,l=a.castShadows&&!r.noShadow,u=Pa.get(c);n.set(`LIGHT${i}`,!0),n.set(`LIGHT${i}TYPE`,`${ja[o]}`),n.set(`LIGHT${i}SHADOWTYPE`,`${u.name}`),n.set(`LIGHT${i}SHAPE`,`${Ma[s]}`),n.set(`LIGHT${i}FALLOFF`,`${Na[a._falloffMode]}`),a.affectSpecularity&&n.set(`LIGHT${i}AFFECT_SPECULARITY`,!0),a._cookie&&(o===2&&!a._cookie._cubemap||o===1&&a._cookie._cubemap)&&(n.set(`LIGHT${i}COOKIE`,!0),n.set(`{LIGHT${i}COOKIE_CHANNEL}`,a._cookieChannel),o===2&&(a._cookieTransform&&n.set(`LIGHT${i}COOKIE_TRANSFORM`,!0),a._cookieFalloff&&n.set(`LIGHT${i}COOKIE_FALLOFF`,!0))),l&&(n.set(`LIGHT${i}CASTSHADOW`,!0),u.pcf&&n.set(`LIGHT${i}SHADOW_PCF`,!0),a._normalOffsetBias&&!a._isVsm&&n.set(`LIGHT${i}_SHADOW_SAMPLE_NORMAL_OFFSET`,!0),o===0&&(n.set(`LIGHT${i}_SHADOW_SAMPLE_ORTHO`,!0),a.cascadeBlend>0&&n.set(`LIGHT${i}_SHADOW_CASCADE_BLEND`,!0),a.numCascades>1&&n.set(`LIGHT${i}_SHADOW_CASCADES`,!0)),(u.pcf||u.pcss||this.device.isWebGPU)&&n.set(`LIGHT${i}_SHADOW_SAMPLE_SOURCE_ZBUFFER`,!0),o===1&&n.set(`LIGHT${i}_SHADOW_SAMPLE_POINT`,!0)),l&&(n.set(`SHADOW_KIND_${u.kind}`,!0),o===0&&n.set(`SHADOW_DIRECTIONAL`,!0))}}prepareForwardPass(e){let{options:t}=this,n=t.clusteredLightingEnabled&&t.clusteredLightingAreaLightsEnabled||t.lights.some(e=>e._shape&&e._shape!==0),r=!t.lightMapEnabled||t.lightMapWithoutAmbient,i=this.needsNormal&&(t.useNormals||t.useClearCoatNormals||t.useHeights||t.enableGGXSpecular);t.useSpecular&&(this.fDefineSet(!0,`LIT_SPECULAR`),this.fDefineSet(this.reflections,`LIT_REFLECTIONS`),this.fDefineSet(t.useClearCoat,`LIT_CLEARCOAT`),this.fDefineSet(t.fresnelModel>0,`LIT_SPECULAR_FRESNEL`),this.fDefineSet(t.useSheen,`LIT_SHEEN`),this.fDefineSet(t.useIridescence,`LIT_IRIDESCENCE`)),this.fDefineSet(this.lighting&&t.useSpecular||this.reflections,`LIT_SPECULAR_OR_REFLECTION`),this.fDefineSet(this.needsSceneColor,`LIT_SCENE_COLOR`),this.fDefineSet(this.needsScreenSize,`LIT_SCREEN_SIZE`),this.fDefineSet(this.needsTransforms,`LIT_TRANSFORMS`),this.fDefineSet(this.needsNormal,`LIT_NEEDS_NORMAL`),this.fDefineSet(this.lighting,`LIT_LIGHTING`),this.fDefineSet(t.useMetalness,`LIT_METALNESS`),this.fDefineSet(t.enableGGXSpecular,`LIT_GGX_SPECULAR`),this.fDefineSet(t.useAnisotropy,`LIT_ANISOTROPY`),this.fDefineSet(t.useSpecularityFactor,`LIT_SPECULARITY_FACTOR`),this.fDefineSet(t.useCubeMapRotation,`CUBEMAP_ROTATION`),this.fDefineSet(t.occludeSpecularFloat,`LIT_OCCLUDE_SPECULAR_FLOAT`),this.fDefineSet(t.separateAmbient,`LIT_SEPARATE_AMBIENT`),this.fDefineSet(t.twoSidedLighting,`LIT_TWO_SIDED_LIGHTING`),this.fDefineSet(t.lightMapEnabled,`LIT_LIGHTMAP`),this.fDefineSet(t.dirLightMapEnabled,`LIT_DIR_LIGHTMAP`),this.fDefineSet(t.skyboxIntensity>0,`LIT_SKYBOX_INTENSITY`),this.fDefineSet(t.clusteredLightingShadowsEnabled,`LIT_CLUSTERED_SHADOWS`),this.fDefineSet(t.clusteredLightingAreaLightsEnabled,`LIT_CLUSTERED_AREA_LIGHTS`),this.fDefineSet(i,`LIT_TBN`),this.fDefineSet(r,`LIT_ADD_AMBIENT`),this.fDefineSet(t.hasTangents,`LIT_TANGENTS`),this.fDefineSet(t.useNormals,`LIT_USE_NORMALS`),this.fDefineSet(t.useClearCoatNormals,`LIT_USE_CLEARCOAT_NORMALS`),this.fDefineSet(t.useRefraction,`LIT_REFRACTION`),this.fDefineSet(t.useDynamicRefraction,`LIT_DYNAMIC_REFRACTION`),this.fDefineSet(t.dispersion,`LIT_DISPERSION`),this.fDefineSet(t.useHeights,`LIT_HEIGHTS`),this.fDefineSet(t.opacityFadesSpecular,`LIT_OPACITY_FADES_SPECULAR`),this.fDefineSet(t.alphaToCoverage,`LIT_ALPHA_TO_COVERAGE`),this.fDefineSet(t.alphaTest,`LIT_ALPHA_TEST`),this.fDefineSet(t.useMsdf,`LIT_MSDF`),this.fDefineSet(t.ssao,`LIT_SSAO`),this.fDefineSet(t.useAo,`LIT_AO`),this.fDefineSet(t.occludeDirect,`LIT_OCCLUDE_DIRECT`),this.fDefineSet(t.msdfTextAttribute,`LIT_MSDF_TEXT_ATTRIBUTE`),this.fDefineSet(t.diffuseMapEnabled,`LIT_DIFFUSE_MAP`),this.fDefineSet(t.shadowCatcher,`LIT_SHADOW_CATCHER`),this.fDefineSet(!0,`LIT_FRESNEL_MODEL`,Aa[t.fresnelModel]),this.fDefineSet(!0,`LIT_NONE_SLICE_MODE`,eo[t.nineSlicedMode]),this.fDefineSet(!0,`LIT_BLEND_TYPE`,Da[t.blendType]),this.fDefineSet(!0,`LIT_CUBEMAP_PROJECTION`,Fa[t.cubeMapProjection]),this.fDefineSet(!0,`LIT_OCCLUDE_SPECULAR`,Ra[t.occludeSpecular]),this.fDefineSet(!0,`LIT_REFLECTION_SOURCE`,Wa[t.reflectionSource]),this.fDefineSet(!0,`LIT_AMBIENT_SOURCE`,Ja[t.ambientSource]),this.fDefineSet(!0,`{lightingUv}`,e??``),this.fDefineSet(!0,`{reflectionDecode}`,Sd.decodeFunc(t.reflectionEncoding)),this.fDefineSet(!0,`{reflectionCubemapDecode}`,Sd.decodeFunc(t.reflectionCubemapEncoding)),this.fDefineSet(!0,`{ambientDecode}`,Sd.decodeFunc(t.ambientEncoding)),this._setupLightingDefines(n,t.clusteredLightingEnabled)}preparePrepassPass(){let{options:e}=this;this.fDefineSet(e.alphaTest,`LIT_ALPHA_TEST`),this.fDefineSet(!0,`STD_OPACITY_DITHER`,mo[e.opacityShadowDither])}prepareShadowPass(){let{options:e}=this;this.fDefineSet(e.alphaTest,`LIT_ALPHA_TEST`)}generateFragmentShader(e,t,n){let r=this.options;this.includes.set(`frontendDeclPS`,e??``),this.includes.set(`frontendCodePS`,t??``),r.pass===3||(r.pass===1?this.preparePrepassPass():this.shadowPass?this.prepareShadowPass():this.prepareForwardPass(n)),this.fshader=`
						#include "litMainPS"
				`}},Ef={generateKey(e){return`lit${Object.keys(e).sort().map(t=>t===`shaderChunks`?e.shaderChunks?.key??``:t===`lights`?Ef.generateLightsKey(e):t+e[t]).join(`
`)}`},generateLightsKey(e){return`lights:${e.lights.map(t=>!e.clusteredLightingEnabled||t._type===0?`${t.key},`:``).join(``)}`}},Df=class{constructor(){v(this,`defines`,new Map),v(this,`useDualSourceBlending`,!1),v(this,`forceUv1`,!1),v(this,`metalnessTint`,!1),v(this,`glossTint`,!1),v(this,`emissiveEncoding`,`linear`),v(this,`lightMapEncoding`,`linear`),v(this,`vertexColorGamma`,!1),v(this,`packedNormal`,!1),v(this,`normalDetailPackedNormal`,!1),v(this,`clearCoatPackedNormal`,!1),v(this,`glossInvert`,!1),v(this,`sheenGlossInvert`,!1),v(this,`clearCoatGlossInvert`,!1),v(this,`useAO`,!1),v(this,`litOptions`,new Sf)}get pass(){return this.litOptions.pass}};function Of(e,t){e!==`pass`&&Object.defineProperty(Df.prototype,e,{get:function(){return this.litOptions[t||e]},set:function(n){this.litOptions[t||e]=n}})}Of(`refraction`,`useRefraction`);var kf=new Sf,Af=Object.getOwnPropertyNames(kf);for(let e in Af)Of(Af[e]);var jf=new Map,Mf=e=>Object.keys(e).filter(e=>e!==`litOptions`).sort(),Nf=new class extends Ao{constructor(...e){super(...e),v(this,`optionsContext`,new Df),v(this,`optionsContextMin`,new Df)}generateKey(e){let t;return e===this.optionsContextMin?(this.propsMin||(this.propsMin=Mf(e)),t=this.propsMin):e===this.optionsContext?(this.props||(this.props=Mf(e)),t=this.props):t=Mf(e),`standard:
${Ao.definesHash(e.defines)}
${t.map(t=>t+e[t]).join(`
`)}${Ef.generateKey(e.litOptions)}`}_getUvSourceExpression(e,t,n,r=!0){let i=n[e],a=n[t],o=n.litOptions.pass===0,s;return o&&n.litOptions.nineSlicedMode===1||o&&n.litOptions.nineSlicedMode===2?s=`nineSlicedUv`:(s=i===0?`vUv${a}`:`vUV${a}_${i}`,o&&r&&n.heightMap&&e!==`heightMapTransform`&&(s+=` + dUvOffset`)),s}_validateMapChunk(e,t,n,r){}_addMapDefines(e,t,n,r,i,a,o=null){let s=`${t}Map`,c=t.toUpperCase(),l=`${s}Uv`,u=`${s}Identifier`,d=`${s}Transform`,f=`${s}Channel`,p=`${t}VertexColorChannel`,m=`${t}Tint`,h=`${t}VertexColor`,g=`${t}Mode`,_=`${t}Invert`,v=r[m],y=r[h],b=r[s],x=r[u],S=r[g],C=i.get(n);if(b){e.set(`STD_${c}_TEXTURE`,``);let t=this._getUvSourceExpression(d,l,r);e.set(`{STD_${c}_TEXTURE_UV}`,t),e.set(`{STD_${c}_TEXTURE_CHANNEL}`,r[f]);let n=`{STD_${c}_TEXTURE_NAME}`;if(C.includes(n)){let t=`texture_${s}`,r=a[x];r?t=r:(a[x]=t,e.set(`STD_${c}_TEXTURE_ALLOCATE`,``)),e.set(n,t)}if(o){let t=r[f]===`aaa`?`passThrough`:Sd.decodeFunc(o);e.set(`{STD_${c}_TEXTURE_DECODE}`,t)}}y&&(e.set(`STD_${c}_VERTEX`,``),e.set(`{STD_${c}_VERTEX_CHANNEL}`,r[p])),S&&e.set(`{STD_${c}_DETAILMODE}`,S),v&&e.set(`STD_${c}_CONSTANT`,``),r[_]&&e.set(`STD_${c}_INVERT`,``)}_correctChannel(e,t,n){let r=n.get(e);if(r>0){if(r<t.length)return t.substring(0,r);if(r>t.length){let e=t,n=e.charAt(e.length-1),i=r-e.length;for(let t=0;t<i;t++)e+=n;return e}return t}}createVertexShader(e,t){let n=[],r=[],i=[];for(let e of jf.keys()){let a=`${e}Map`;if(t[`${e}VertexColor`]){let n=`${e}VertexColorChannel`;t[n]=this._correctChannel(e,t[n],jf)}if(t[a]){let o=`${a}Channel`,s=`${a}Transform`,c=`${a}Uv`;t[c]=Math.min(t[c],1),t[o]=this._correctChannel(e,t[o],jf);let l=t[c];n[l]=!0,r[l]=r[l]||t[a]&&!t[s],t[s]&&i.push({name:e,id:t[s],uv:t[c]})}}t.forceUv1&&(n[1]=!0,r[1]=r[1]===void 0||r[1]),e.generateVertexShader(n,r,i)}prepareFragmentDefines(e,t,n){let r=(e,n,r=``)=>{e&&t.set(n,r)};r(e.lightMap,`STD_LIGHTMAP`,``),r(e.lightVertexColor,`STD_LIGHT_VERTEX_COLOR`,``),r(e.dirLightMap&&e.litOptions.useSpecular,`STD_LIGHTMAP_DIR`,``),r(e.heightMap,`STD_HEIGHT_MAP`,``),r(!0,`STD_PARALLAX`,po[e.parallaxMode??`offset`]),r(e.parallaxSelfShadow,`STD_PARALLAX_SELF_SHADOW`,``),r(e.useSpecularColor,`STD_SPECULAR_COLOR`,``),r(e.useSpecularColor&&(e.litOptions.useSpecular||e.litOptions.useRefraction),`STD_SPECULAR_CONSTANT`,``),r(e.aoMap||e.aoVertexColor||e.useAO,`STD_AO`,``),r(!0,`STD_OPACITY_DITHER`,mo[n.isForward?e.litOptions.opacityDither:e.litOptions.opacityShadowDither])}createShaderDefinition(e,t){let n=No.get(e).getByIndex(t.litOptions.pass),r=n.isForward,i=new Tf(e,t.litOptions);this.createVertexShader(i,t);let a={};t.litOptions.fresnelModel=t.litOptions.fresnelModel===0?2:t.litOptions.fresnelModel;let o=i.fDefines;this.prepareFragmentDefines(t,o,n);let s=``;if(r){if(t.heightMap&&this._addMapDefines(o,`height`,`parallaxPS`,t,i.chunks,a),(t.litOptions.blendType!==3||t.litOptions.alphaTest||t.litOptions.alphaToCoverage||t.litOptions.opacityDither!==`none`)&&this._addMapDefines(o,`opacity`,`opacityPS`,t,i.chunks,a),i.needsNormal){if((t.normalMap||t.clearCoatNormalMap||t.heightMap)&&!t.litOptions.hasTangents){let e=t.normalMap?`normalMap`:t.clearCoatNormalMap?`clearCoatNormalMap`:`heightMap`;s=this._getUvSourceExpression(`${e}Transform`,`${e}Uv`,t,!1)}this._addMapDefines(o,`normalDetail`,`normalMapPS`,t,i.chunks,a,t.normalDetailPackedNormal?`xy`:`xyz`),this._addMapDefines(o,`normal`,`normalMapPS`,t,i.chunks,a,t.packedNormal?`xy`:`xyz`)}t.diffuseDetail&&this._addMapDefines(o,`diffuseDetail`,`diffusePS`,t,i.chunks,a,t.diffuseDetailEncoding),this._addMapDefines(o,`diffuse`,`diffusePS`,t,i.chunks,a,t.diffuseEncoding),t.litOptions.useRefraction&&(this._addMapDefines(o,`refraction`,`transmissionPS`,t,i.chunks,a),this._addMapDefines(o,`thickness`,`thicknessPS`,t,i.chunks,a),t.litOptions.useMetalness||this._addMapDefines(o,`ior`,`iorPS`,t,i.chunks,a)),t.litOptions.useIridescence&&(this._addMapDefines(o,`iridescence`,`iridescencePS`,t,i.chunks,a),this._addMapDefines(o,`iridescenceThickness`,`iridescenceThicknessPS`,t,i.chunks,a)),(i.lighting&&t.litOptions.useSpecular||i.reflections||t.litOptions.useRefraction)&&(t.litOptions.useSheen&&(this._addMapDefines(o,`sheen`,`sheenPS`,t,i.chunks,a,t.sheenEncoding),this._addMapDefines(o,`sheenGloss`,`sheenGlossPS`,t,i.chunks,a)),t.litOptions.useMetalness&&(this._addMapDefines(o,`metalness`,`metalnessPS`,t,i.chunks,a),this._addMapDefines(o,`ior`,`iorPS`,t,i.chunks,a)),t.litOptions.useSpecularityFactor&&this._addMapDefines(o,`specularityFactor`,`specularityFactorPS`,t,i.chunks,a),t.useSpecularColor&&this._addMapDefines(o,`specular`,`specularPS`,t,i.chunks,a,t.specularEncoding),this._addMapDefines(o,`gloss`,`glossPS`,t,i.chunks,a)),t.aoDetail&&this._addMapDefines(o,`aoDetail`,`aoPS`,t,i.chunks,a),(t.aoMap||t.aoVertexColor||t.useAO)&&this._addMapDefines(o,`ao`,`aoPS`,t,i.chunks,a),this._addMapDefines(o,`emissive`,`emissivePS`,t,i.chunks,a,t.emissiveEncoding),t.litOptions.useClearCoat&&(this._addMapDefines(o,`clearCoat`,`clearCoatPS`,t,i.chunks,a),this._addMapDefines(o,`clearCoatGloss`,`clearCoatGlossPS`,t,i.chunks,a),this._addMapDefines(o,`clearCoatNormal`,`clearCoatNormalPS`,t,i.chunks,a,t.clearCoatPackedNormal?`xy`:`xyz`)),t.litOptions.enableGGXSpecular&&this._addMapDefines(o,`anisotropy`,`anisotropyPS`,t,i.chunks,a),(t.lightMap||t.lightVertexColor)&&this._addMapDefines(o,`light`,`lightmapPS`,t,i.chunks,a,t.lightMapEncoding)}else{let e=t.litOptions.opacityShadowDither;(t.litOptions.alphaTest||e)&&this._addMapDefines(o,`opacity`,`opacityPS`,t,i.chunks,a)}i.generateFragmentShader(i.chunks.get(`stdDeclarationPS`),i.chunks.get(`stdFrontEndPS`),s);let c=Lo.merge(i.chunks,i.includes),l=i.vDefines;t.defines.forEach((e,t)=>l.set(t,e)),t.defines.forEach((e,t)=>o.set(t,e));let u=fi.createDefinition(e,{name:`StandardShader`,attributes:i.attributes,shaderLanguage:i.shaderLanguage,vertexCode:i.vshader,fragmentCode:i.fshader,vertexIncludes:c,fragmentIncludes:c,fragmentDefines:o,vertexDefines:l,useDualSourceBlending:t.useDualSourceBlending});return i.shaderPassInfo.isForward&&(u.tag=1),u}},Pf=(e,t)=>{let n=e[0].value,r=e[1].value,i=t[0].value,a=t[1].value;return n[0]===i[0]&&n[1]===i[1]&&n[2]===i[2]&&r[0]===a[0]&&r[1]===a[1]&&r[2]===a[2]},Ff=class{constructor(){v(this,`_dirty`,!0),v(this,`_mutable`,!1),v(this,`_ids`,new Map),v(this,`_states`,new Map)}reset(){this._ids.clear(),this._states.clear(),this._dirty=!0,this._mutable=!1}markDirty(){this._dirty=!0}markMutable(){this._dirty=!0,this._mutable=!0}update(e){if(!this._dirty&&!this._mutable)return!1;this._dirty=!1;let t=!1;for(let n of jf.keys()){let r=+!!e[`_${n}Map`],i=e[`_${n}MapUv`],a=e[`_${n}MapTiling`],o=e[`_${n}MapOffset`],s=e[`_${n}MapRotation`],c=this._states.get(n);c||(c=new Float64Array(7),c[0]=-1,this._states.set(n,c)),(c[0]!==r||r&&(c[1]!==i||c[2]!==a.x||c[3]!==a.y||c[4]!==o.x||c[5]!==o.y||c[6]!==s))&&(c[0]=r,c[1]=i,c[2]=a.x,c[3]=a.y,c[4]=o.x,c[5]=o.y,c[6]=s,t=!0)}return t?this._updateIds(e):!1}_updateIds(e){let t=[],n=this._ids,r=new Map,i=!1,a=1;for(let o of jf.keys()){let s=0;if(e[`_${o}Map`]){let n=e.getUniform(`${o}MapTransform`);if(n){let r=e[`_${o}MapUv`],i=t[r]??(t[r]=[]),c;for(let e=0;e<i.length;e++)if(Pf(i[e].transform,n)){c=i[e];break}c?s=c.id:(s=a,i.push({id:s,transform:n}))}}r.set(o,s),i||(i=(n.get(o)??0)!==s),a++}return this._ids=r,i}getId(e){return this._ids.get(e)??0}},If=e=>e.r!==0||e.g!==0||e.b!==0,Lf=class{updateMinRef(e,t,n,r,i,a){this._updateSharedOptions(e,t,n,r,i),this._updateMinOptions(e,n,i),this._updateUVOptions(e,n,r,!0)}updateRef(e,t,n,r,i,a,o){this._updateSharedOptions(e,t,r,i,a,n),this._updateEnvOptions(e,r,t,n),this._updateMaterialOptions(e,r,t),e.litOptions.hasTangents=i&&!!(i&512),this._updateLightOptions(e,t,r,i,o),this._updateUVOptions(e,r,i,!1,n)}_updateSharedOptions(e,t,n,r,i,a){e.forceUv1=n.forceUv1,e.litOptions.linearDepth=i===1||!!a?.sceneTextures.includes(`depth`),n.userAttributes&&(e.litOptions.userAttributes=Object.fromEntries(n.userAttributes.entries())),e.litOptions.shaderChunks=n.shaderChunks,e.litOptions.pass=i,e.litOptions.alphaTest=n.alphaTest>0,e.litOptions.blendType=n.blendType,e.litOptions.screenSpace=r&&!!(r&256),e.litOptions.skin=r&&!!(r&2),e.litOptions.batch=r&&!!(r&16384),e.litOptions.useInstancing=r&&!!(r&32),e.litOptions.useMorphPosition=r&&!!(r&1024),e.litOptions.useMorphNormal=r&&!!(r&2048),e.litOptions.useMorphTextureBasedInt=r&&!!(r&8192),e.litOptions.nineSlicedMode=n.nineSlicedMode||0,t.clusteredLightingEnabled&&n.useLighting?(e.litOptions.clusteredLightingEnabled=!0,e.litOptions.clusteredLightingCookiesEnabled=t.lighting.cookiesEnabled,e.litOptions.clusteredLightingShadowsEnabled=t.lighting.shadowsEnabled,e.litOptions.clusteredLightingShadowType=t.lighting.shadowType,e.litOptions.clusteredLightingAreaLightsEnabled=t.lighting.areaLightsEnabled):(e.litOptions.clusteredLightingEnabled=!1,e.litOptions.clusteredLightingCookiesEnabled=!1,e.litOptions.clusteredLightingShadowsEnabled=!1,e.litOptions.clusteredLightingAreaLightsEnabled=!1)}_updateUVOptions(e,t,n,r,i){let a=!1,o=!1,s=!1;n&&(a=!!(n&4),o=!!(n&8),s=!!(n&16)),e.litOptions.vertexColors=!1;let c={};for(let n of jf.keys())this._updateTexOptions(e,t,n,a,o,s,r,c);e.litOptions.ssao=i?.ssaoEnabled,e.useAO=e.litOptions.ssao,e.litOptions.lightMapEnabled=e.lightMap,e.litOptions.dirLightMapEnabled=e.dirLightMap,e.litOptions.useHeights=e.heightMap,e.parallaxMode=e.heightMap?t.parallaxMode:uo,e.parallaxSelfShadow=e.parallaxMode===`occlusion`&&t.parallaxShadowSamples>0,e.litOptions.useNormals=e.normalMap,e.litOptions.useClearCoatNormals=e.clearCoatNormalMap,e.litOptions.useAo=e.aoMap||e.aoVertexColor||e.litOptions.ssao,e.litOptions.diffuseMapEnabled=e.diffuseMap}_updateTexOptions(e,t,n,r,i,a,o,s){let c=n===`opacity`;if(!o||c){let o=`${n}Map`,l=`${n}VertexColor`,u=`${n}VertexColorChannel`,d=`${o}Channel`,f=`${o}Transform`,p=`${o}Uv`,m=`${o}Identifier`;if(n!==`light`&&(e[o]=!1,e[m]=void 0,e[d]=``,e[f]=0,e[p]=0),e[l]=!1,e[u]=``,c&&t.blendType===3&&t.alphaTest===0&&!t.alphaToCoverage&&t.opacityDither===`none`)return;if(n!==`height`&&t[l]&&a&&(e[l]=t[l],e[u]=t[u],e.litOptions.vertexColors=!0),t[o]){let a=!0;if(t[p]===0&&!r&&(a=!1),t[p]===1&&!i&&(a=!1),a){let r=t[o].id,i=s[r];i===void 0&&(s[r]=n,i=n),e[o]=!!t[o],e[m]=i,e[f]=t._getMapTransformId(n),e[d]=t[d],e[p]=t[p]}}}}_updateMinOptions(e,t,n){let r=n===1;e.litOptions.opacityShadowDither=r?t.opacityDither:t.opacityShadowDither,e.litOptions.lights=[]}_updateMaterialOptions(e,t,n){let r=!!(t.useMetalness||t.specularMap||t.sphereMap||t.cubeMap||If(t.specular)||t.specularityFactor>0&&t.useMetalness||t.enableGGXSpecular||t.clearCoat>0),i=!t.useMetalness||t.useMetalnessSpecularColor,a=r&&t.useMetalnessSpecularColor&&(t.specularityFactorTint||t.specularityFactor!==1),o=e=>e?e.format===10||e.type===`swizzleGGGR`:!1,s=(e,t)=>Math.abs(e-t)<1e-4;e.specularityFactorTint=a,e.metalnessTint=t.useMetalness&&t.metalness<1,e.glossTint=!0,e.diffuseEncoding=t.diffuseMap?.encoding,e.diffuseDetailEncoding=t.diffuseDetailMap?.encoding,e.emissiveEncoding=t.emissiveMap?.encoding,e.lightMapEncoding=t.lightMap?.encoding,e.packedNormal=o(t.normalMap),e.refractionTint=!s(t.refraction,1),e.refractionIndexTint=!s(t.refractionIndex,1/1.5),e.thicknessTint=t.useDynamicRefraction&&t.thickness!==1,e.specularEncoding=t.specularMap?.encoding,e.sheenEncoding=t.sheenMap?.encoding,e.aoMapUv=t.aoUvSet,e.aoDetail=!!t.aoDetailMap,e.diffuseDetail=!!t.diffuseDetailMap,e.normalDetail=!!t.normalMap,e.normalDetailPackedNormal=o(t.normalDetailMap),e.diffuseDetailMode=t.diffuseDetailMode,e.aoDetailMode=t.aoDetailMode,e.clearCoatGloss=!!t.clearCoatGloss,e.clearCoatPackedNormal=o(t.clearCoatNormalMap),e.iorTint=!s(t.refractionIndex,1/1.5),e.iridescenceTint=t.iridescence!==1,e.glossInvert=t.glossInvert,e.sheenGlossInvert=t.sheenGlossInvert,e.clearCoatGlossInvert=t.clearCoatGlossInvert,e.useSpecularColor=i,e.litOptions.separateAmbient=!1,e.litOptions.pixelSnap=t.pixelSnap,e.litOptions.ambientSH=!!t.ambientSH,e.litOptions.twoSidedLighting=t.twoSidedLighting,e.litOptions.occludeSpecular=t.occludeSpecular,e.litOptions.occludeSpecularFloat=t.occludeSpecularIntensity!==1,e.litOptions.useMsdf=!!t.msdfMap,e.litOptions.msdfTextAttribute=!!t.msdfTextAttribute,e.litOptions.alphaToCoverage=t.alphaToCoverage,e.litOptions.opacityFadesSpecular=t.opacityFadesSpecular,e.litOptions.opacityDither=t.opacityDither,e.litOptions.cubeMapProjection=t.cubeMapProjection,e.litOptions.occludeDirect=t.occludeDirect,e.litOptions.useSpecular=r,e.litOptions.useSpecularityFactor=(a||!!t.specularityFactorMap)&&t.useMetalnessSpecularColor,e.litOptions.enableGGXSpecular=t.enableGGXSpecular,e.litOptions.useAnisotropy=t.enableGGXSpecular&&(t.anisotropyIntensity>0||!!t.anisotropyMap),e.litOptions.fresnelModel=t.fresnelModel,e.litOptions.useRefraction=(t.refraction||!!t.refractionMap)&&(t.useDynamicRefraction||e.litOptions.reflectionSource!==`none`),e.litOptions.useClearCoat=!!t.clearCoat,e.litOptions.useSheen=t.useSheen,e.litOptions.useIridescence=t.useIridescence&&t.iridescence!==0,e.litOptions.useMetalness=t.useMetalness,e.litOptions.useDynamicRefraction=t.useDynamicRefraction,e.litOptions.dispersion=t.dispersion>0,e.litOptions.shadowCatcher=t.shadowCatcher,e.litOptions.useVertexColorGamma=t.vertexColorGamma}_updateEnvOptions(e,t,n,r){e.litOptions.fog=t.useFog?r.fog:Oa,e.litOptions.gamma=r.shaderOutputGamma,e.litOptions.toneMap=t.useTonemap?r.toneMapping:6;let i=!1;if(t.envAtlas&&t.cubeMap?(e.litOptions.reflectionSource=Va,e.litOptions.reflectionEncoding=t.envAtlas.encoding,e.litOptions.reflectionCubemapEncoding=t.cubeMap.encoding):t.envAtlas?(e.litOptions.reflectionSource=Ba,e.litOptions.reflectionEncoding=t.envAtlas.encoding):t.cubeMap?(e.litOptions.reflectionSource=Ha,e.litOptions.reflectionEncoding=t.cubeMap.encoding):t.sphereMap?(e.litOptions.reflectionSource=Ua,e.litOptions.reflectionEncoding=t.sphereMap.encoding):t.useSkybox&&n.envAtlas&&n.skybox?(e.litOptions.reflectionSource=Va,e.litOptions.reflectionEncoding=n.envAtlas.encoding,e.litOptions.reflectionCubemapEncoding=n.skybox.encoding,i=!0):t.useSkybox&&n.envAtlas?(e.litOptions.reflectionSource=Ba,e.litOptions.reflectionEncoding=n.envAtlas.encoding,i=!0):t.useSkybox&&n.skybox?(e.litOptions.reflectionSource=Ha,e.litOptions.reflectionEncoding=n.skybox.encoding,i=!0):(e.litOptions.reflectionSource=za,e.litOptions.reflectionEncoding=null),t.ambientSH)e.litOptions.ambientSource=Ga,e.litOptions.ambientEncoding=null;else{let r=t.envAtlas||(t.useSkybox&&n.envAtlas?n.envAtlas:null);r&&!t.sphereMap?(e.litOptions.ambientSource=Ka,e.litOptions.ambientEncoding=r.encoding):(e.litOptions.ambientSource=qa,e.litOptions.ambientEncoding=null)}e.litOptions.skyboxIntensity=i,e.litOptions.useCubeMapRotation=i&&n._skyboxRotationShaderInclude}_updateLightOptions(e,t,n,r,i){if(e.lightMap=!1,e.lightMapChannel=``,e.lightMapUv=0,e.lightMapTransform=0,e.litOptions.lightMapWithoutAmbient=!1,e.dirLightMap=!1,r&&(e.litOptions.noShadow=!!(r&1),r&64&&(e.lightMapEncoding=t.lightmapPixelFormat===7?`rgbm`:`linear`,e.lightMap=!0,e.lightMapChannel=`rgb`,e.lightMapUv=1,e.lightMapTransform=0,e.litOptions.lightMapWithoutAmbient=!n.lightMap,r&128&&(e.dirLightMap=!0),r&4096&&(e.litOptions.lightMapWithoutAmbient=!1))),n.useLighting){let n=[],a=r?r>>16:1;e.litOptions.lightMaskDynamic=!!(a&1),i&&(Cf.collectLights(0,i[0],n,a),t.clusteredLightingEnabled||(Cf.collectLights(1,i[1],n,a),Cf.collectLights(2,i[2],n,a))),e.litOptions.lights=n}else e.litOptions.lights=[];e.litOptions.lights.length===0&&!t.clusteredLightingEnabled&&(e.litOptions.noShadow=!0)}};function H(e,t=!0,n=!0){let r={};return r[`${e}Map`]=`texture`,r[`${e}MapTiling`]=`vec2`,r[`${e}MapOffset`]=`vec2`,r[`${e}MapRotation`]=`number`,r[`${e}MapUv`]=`number`,t&&(r[`${e}MapChannel`]=`string`,n&&(r[`${e}VertexColor`]=`boolean`,r[`${e}VertexColorChannel`]=`string`)),r}var Rf={name:`string`,chunks:`chunks`,mappingFormat:`string`,_engine:`boolean`,ambient:`rgb`,...H(`ao`),...H(`aoDetail`,!0,!1),aoDetailMode:`string`,aoIntensity:`number`,diffuse:`rgb`,...H(`diffuse`),...H(`diffuseDetail`,!0,!1),diffuseDetailMode:`string`,vertexColorGamma:`boolean`,specular:`rgb`,...H(`specular`),occludeSpecular:`enum:occludeSpecular`,specularityFactor:`number`,specularityFactorTint:`boolean`,...H(`specularityFactor`),useMetalness:`boolean`,metalness:`number`,enableGGXSpecular:`boolean`,metalnessTint:`boolean`,...H(`metalness`),useMetalnessSpecularColor:`boolean`,anisotropyIntensity:`number`,anisotropyRotation:`number`,...H(`anisotropy`),shininess:`number`,gloss:`number`,glossInvert:`boolean`,...H(`gloss`),clearCoat:`number`,...H(`clearCoat`),clearCoatGloss:`number`,clearCoatGlossInvert:`boolean`,...H(`clearCoatGloss`),clearCoatBumpiness:`number`,...H(`clearCoatNormal`,!1),useSheen:`boolean`,sheen:`rgb`,...H(`sheen`),sheenGloss:`number`,sheenGlossInvert:`boolean`,...H(`sheenGloss`),fresnelModel:`number`,emissive:`rgb`,...H(`emissive`),emissiveIntensity:`number`,...H(`normal`,!1),bumpiness:`number`,...H(`normalDetail`,!1),normalDetailMapBumpiness:`number`,...H(`height`,!0,!1),heightMapFactor:`number`,heightMapBase:`number`,parallaxMode:`string`,parallaxSamples:`number`,parallaxShadowSamples:`number`,alphaToCoverage:`boolean`,alphaTest:`number`,alphaFade:`number`,alphaDither:`number`,opacity:`number`,...H(`opacity`),opacityFadesSpecular:`boolean`,opacityDither:`string`,opacityShadowDither:`string`,reflectivity:`number`,refraction:`number`,refractionTint:`boolean`,...H(`refraction`),refractionIndex:`number`,dispersion:`number`,thickness:`number`,thicknessTint:`boolean`,...H(`thickness`),attenuation:`rgb`,attenuationDistance:`number`,useDynamicRefraction:`boolean`,sphereMap:`texture`,cubeMap:`cubemap`,cubeMapProjection:`number`,cubeMapProjectionBox:`boundingbox`,useIridescence:`boolean`,iridescence:`number`,iridescenceTint:`boolean`,...H(`iridescence`),iridescenceThicknessTint:`boolean`,iridescenceThicknessMin:`number`,iridescenceThicknessMax:`number`,iridescenceRefractionIndex:`number`,...H(`iridescenceThickness`),...H(`light`),depthTest:`boolean`,depthFunc:`enum:depthFunc`,depthWrite:`boolean`,depthBias:`number`,slopeDepthBias:`number`,cull:`enum:cull`,blendType:`enum:blendType`,useFog:`boolean`,useLighting:`boolean`,useSkybox:`boolean`,useTonemap:`boolean`,envAtlas:`texture`,twoSidedLighting:`boolean`,flatShading:`boolean`,shadowCatcher:`boolean`},zf=[];for(let e in Rf)Rf[e]===`texture`&&zf.push(e);var Bf=[];for(let e in Rf)Rf[e]===`cubemap`&&Bf.push(e);var Vf={},Hf={},Uf=new Set,Wf=new O,Gf=e=>e.r===0&&e.g===0&&e.b===0,Kf=class extends Nc{constructor(){super(),v(this,`userAttributes`,new Map),v(this,`_specularIsBlack`,void 0),v(this,`_mapTransforms`,new Ff),v(this,`onUpdateShader`,void 0),this._assetReferences={},this._activeParams=new Set,this._activeLightingParams=new Set,this.shaderOptBuilder=new Lf,this.reset(),this._specularIsBlack=Gf(this._specular)}reset(){Object.keys(Vf).forEach(e=>{this[`_${e}`]=Vf[e].value()}),this._uniformCache={},this._mapTransforms.reset()}copy(e){return super.copy(e),Object.keys(Vf).forEach(t=>{this[t]=Vf[t].copyFromBacking?e[`_${t}`]:e[t]}),this._alphaDither=e._alphaDither,this.userAttributes=new Map(e.userAttributes),this}update(){this._mapTransforms.update(this)&&(this._dirtyShader=!0);let e=Gf(this._specular);this._specularIsBlack!==e&&(this._specularIsBlack=e,this._dirtyShader=!0),super.update()}_getMapTransformId(e){return this._mapTransforms.getId(e)}setAttribute(e,t){this.userAttributes.set(t,e)}_setParameter(e,t){Uf.add(e),this.setParameter(e,t)}_setParameters(e){e.forEach(e=>{this._setParameter(e.name,e.value)})}_processParameters(e){let t=this[e];t.forEach(e=>{Uf.has(e)||delete this.parameters[e]}),this[e]=Uf,Uf=t,Uf.clear()}_updateMap(e){let t=`${e}Map`,n=this[t];if(n){this._setParameter(`texture_${t}`,n);let e=`${t}Transform`,r=this.getUniform(e);r&&this._setParameters(r)}}_allocUniform(e,t){let n=this._uniformCache[e];return n||(n=t(),this._uniformCache[e]=n),n}getUniform(e,t,n){return Hf[e](this,t,n)}updateUniforms(e,t){this._mapTransforms.update(this)&&(this._dirtyShader=!0);let n=n=>this.getUniform(n,e,t);this._setParameter(`material_ambient`,n(`ambient`)),this._setParameter(`material_diffuse`,n(`diffuse`)),this._setParameter(`material_specular`,n(`specular`)),this._setParameter(`material_aoIntensity`,this.aoIntensity),this.useMetalness&&((!this.metalnessMap||this.metalness<1)&&this._setParameter(`material_metalness`,this.metalness),(!this.specularityFactorMap||this.specularityFactorTint||this.specularityFactor!==1)&&this._setParameter(`material_specularityFactor`,this.specularityFactor),this._setParameter(`material_sheen`,n(`sheen`)),this._setParameter(`material_sheenGloss`,this.sheenGloss),this._setParameter(`material_refractionIndex`,this.refractionIndex)),this.enableGGXSpecular&&(this._setParameter(`material_anisotropyIntensity`,this.anisotropyIntensity),this._setParameter(`material_anisotropyRotation`,[Math.cos(this.anisotropyRotation*E.DEG_TO_RAD),Math.sin(this.anisotropyRotation*E.DEG_TO_RAD)])),this.clearCoat>0&&(this._setParameter(`material_clearCoat`,this.clearCoat),this._setParameter(`material_clearCoatGloss`,this.clearCoatGloss),this._setParameter(`material_clearCoatBumpiness`,this.clearCoatBumpiness)),this._setParameter(`material_gloss`,this.gloss),this._setParameter(`material_emissive`,n(`emissive`)),this._setParameter(`material_emissiveIntensity`,this.emissiveIntensity),this.refraction>0&&this._setParameter(`material_refraction`,this.refraction),!this.useMetalness&&(this.refraction>0||this.refractionMap)&&this._setParameter(`material_refractionIndex`,this.refractionIndex),this.dispersion>0&&this._setParameter(`material_dispersion`,this.dispersion),this.useDynamicRefraction&&(this._setParameter(`material_thickness`,this.thickness),this._setParameter(`material_attenuation`,n(`attenuation`)),this._setParameter(`material_invAttenuationDistance`,this.attenuationDistance===0?0:1/this.attenuationDistance)),this.useIridescence&&(this._setParameter(`material_iridescence`,this.iridescence),this._setParameter(`material_iridescenceRefractionIndex`,this.iridescenceRefractionIndex),this._setParameter(`material_iridescenceThicknessMin`,this.iridescenceThicknessMin),this._setParameter(`material_iridescenceThicknessMax`,this.iridescenceThicknessMax)),this._setParameter(`material_opacity`,this.opacity);let r=this._opacity>0?this.alphaDither/this._opacity:1;this._setParameter(`material_alphaDitherScale`,r),this.opacityFadesSpecular===!1&&this._setParameter(`material_alphaFade`,this.alphaFade),this.occludeSpecular&&this._setParameter(`material_occludeSpecularIntensity`,this.occludeSpecularIntensity),this.cubeMapProjection===1&&this._setParameter(n(`cubeMapProjectionBox`));for(let e of jf.keys())this._updateMap(e);this.ambientSH&&this._setParameter(`ambientSH[0]`,this.ambientSH),this.normalMap&&this._setParameter(`material_bumpiness`,this.bumpiness),this.normalMap&&this.normalDetailMap&&this._setParameter(`material_normalDetailMapBumpiness`,this.normalDetailMapBumpiness),this.heightMap&&(this._setParameter(`material_heightMapFactor`,n(`heightMapFactor`)),this._setParameter(`material_heightMapBase`,this.heightMapBase),this.parallaxMode===`occlusion`&&(this._setParameter(`material_parallaxSamples`,this.parallaxSamples),this.parallaxShadowSamples>0&&this._setParameter(`material_parallaxShadowSamples`,this.parallaxShadowSamples))),this.envAtlas&&this.cubeMap?(this._setParameter(`texture_envAtlas`,this.envAtlas),this._setParameter(`texture_cubeMap`,this.cubeMap)):this.envAtlas?this._setParameter(`texture_envAtlas`,this.envAtlas):this.cubeMap?this._setParameter(`texture_cubeMap`,this.cubeMap):this.sphereMap&&this._setParameter(`texture_sphereMap`,this.sphereMap),this._setParameter(`material_reflectivity`,this.reflectivity),this._processParameters(`_activeParams`),super.updateUniforms(e,t)}updateEnvUniforms(e,t){!(this.envAtlas||this.cubeMap||this.sphereMap)&&this.useSkybox&&(t.envAtlas&&t.skybox?(this._setParameter(`texture_envAtlas`,t.envAtlas),this._setParameter(`texture_cubeMap`,t.skybox)):t.envAtlas?this._setParameter(`texture_envAtlas`,t.envAtlas):t.skybox&&this._setParameter(`texture_cubeMap`,t.skybox)),this._processParameters(`_activeLightingParams`)}getShaderVariant(e){let{device:t,scene:n,pass:r,objDefs:i,sortedLights:a,cameraShaderParams:o}=e;this.updateEnvUniforms(t,n);let s=No.get(t).getByIndex(r),c=r===3||r===1||s.isShadow,l=c?Nf.optionsContextMin:Nf.optionsContext;l.defines=zo.getCoreDefines(this,e),c?this.shaderOptBuilder.updateMinRef(l,n,this,i,r,a):this.shaderOptBuilder.updateRef(l,n,o,this,i,r,a);let u=s.isForward&&this.blendState.usesDualSourceBlending;l.useDualSourceBlending=u,this.useFog||l.defines.set(`FOG`,`NONE`),l.defines.set(`TONEMAP`,La[l.litOptions.toneMap]),this.onUpdateShader&&(l=this.onUpdateShader(l)),l.useDualSourceBlending=u;let d=new Eo(e.viewUniformFormat,e.vertexFormat),f=Oo(t);return f.register(`standard`,Nf),f.getProgram(`standard`,l,d,this.userId)}destroy(){for(let e in this._assetReferences)this._assetReferences[e]._unbind();this._assetReferences=null,super.destroy()}set shininess(e){Object.assign(this,{gloss:e*.01})}get shininess(){return this.gloss*100}set useGammaTonemap(e){Object.assign(this,{useTonemap:e})}get useGammaTonemap(){return this.useTonemap}set anisotropy(e){Object.assign(this,{anisotropyIntensity:Math.abs(e),anisotropyRotation:e>=0?0:90})}get anisotropy(){let e=Math.sign(Math.cos(this.anisotropyRotation*E.DEG_TO_RAD*2));return this.anisotropyIntensity*e}};v(Kf,`TEXTURE_PARAMETERS`,zf),v(Kf,`CUBEMAP_PARAMETERS`,Bf);var qf=(e,t)=>{Hf[e]=t},Jf=(e,t,n,r,i=!1)=>{Object.defineProperty(Kf.prototype,e,{get:r||function(){return this[`_${e}`]},set:n}),Vf[e]={value:t,copyFromBacking:i}},Yf=e=>{let t=`_${e.name}`,n=e.dirtyShaderFunc||(()=>!0),r=e.onGet,i=e.onSet,a=function(e){let r=this[t];r!==e&&(this._dirtyShader=this._dirtyShader||n(r,e),this[t]=e,i?.call(this))},o=e.getterFunc||r&&function(){return r.call(this),this[t]};Jf(e.name,()=>e.defaultValue,a,o,!!r)},Xf=e=>{let t=`_${e.name}`,n=e.dirtyShaderFunc||(()=>!0),r=e.onGet,i=e.onSet,a=function(e){let r=this[t];r.equals(e)||(this._dirtyShader=this._dirtyShader||n(r,e),this[t]=r.copy(e),i?.call(this))},o=e.getterFunc||r&&function(){return r.call(this),this[t]};Jf(e.name,()=>e.defaultValue.clone(),a,o,!!r)},Zf=e=>e.defaultValue&&e.defaultValue.clone?Xf(e):Yf(e),Qf=function(){this._mapTransforms.markDirty()},$f=function(){this._mapTransforms.markMutable()};function U(e,t=`rgb`,n=!0,r=0){jf.set(e,t.length||-1),Zf({name:`${e}Map`,defaultValue:null,dirtyShaderFunc:(e,t)=>!!e!=!!t||e&&(e.type!==t.type||e.format!==t.format),onSet:Qf}),Zf({name:`${e}MapTiling`,defaultValue:new A(1,1),dirtyShaderFunc:()=>!1,onSet:Qf,onGet:$f}),Zf({name:`${e}MapOffset`,defaultValue:new A(0,0),dirtyShaderFunc:()=>!1,onSet:Qf,onGet:$f}),Zf({name:`${e}MapRotation`,defaultValue:0,dirtyShaderFunc:()=>!1,onSet:Qf}),Zf({name:`${e}MapUv`,defaultValue:r,onSet:Qf}),t&&(Zf({name:`${e}MapChannel`,defaultValue:t}),n&&(Zf({name:`${e}VertexColor`,defaultValue:!1}),Zf({name:`${e}VertexColorChannel`,defaultValue:t})));let i=`${e}MapTiling`,a=`${e}MapOffset`,o=`${e}MapRotation`,s=`${e}MapTransform`;qf(s,(e,t,n)=>{let r=e[`_${i}`],c=e[`_${a}`],l=e[`_${o}`];if(r.x===1&&r.y===1&&c.x===0&&c.y===0&&l===0)return null;let u=e._allocUniform(s,()=>[{name:`texture_${s}0`,value:new Float32Array(3)},{name:`texture_${s}1`,value:new Float32Array(3)}]),d=Math.cos(l*E.DEG_TO_RAD),f=Math.sin(l*E.DEG_TO_RAD),p=u[0].value;p[0]=d*r.x,p[1]=-f*r.y,p[2]=c.x;let m=u[1].value;return m[0]=f*r.x,m[1]=d*r.y,m[2]=1-r.y-c.y,u})}function ep(e,t){Zf({name:e,defaultValue:t,dirtyShaderFunc:()=>!1}),qf(e,(t,n,r)=>{let i=t._allocUniform(e,()=>new Float32Array(3)),a=t[`_${e}`];return Wf.linear(a),i[0]=Wf.r,i[1]=Wf.g,i[2]=Wf.b,i})}function W(e,t,n){Zf({name:e,defaultValue:t,dirtyShaderFunc:(e,t)=>(e===0||e===1)!=(t===0||t===1)}),qf(e,n)}function tp(e,t){Zf({name:e,defaultValue:null,dirtyShaderFunc:(e,t)=>!!e==!!t}),qf(e,t)}function G(e,t){Zf({name:e,defaultValue:t})}function np(){ep(`ambient`,new O(1,1,1)),ep(`diffuse`,new O(1,1,1)),ep(`specular`,new O(0,0,0)),ep(`emissive`,new O(0,0,0)),ep(`sheen`,new O(1,1,1)),ep(`attenuation`,new O(1,1,1)),W(`emissiveIntensity`,1),W(`specularityFactor`,1),W(`sheenGloss`,0),W(`gloss`,.25),W(`aoIntensity`,1),W(`heightMapFactor`,1,(e,t,n)=>e.heightMapFactor*.1),Zf({name:`heightMapBase`,defaultValue:.5,dirtyShaderFunc:()=>!1}),W(`parallaxSamples`,16),Jf(`parallaxShadowSamples`,()=>0,function(e){this._parallaxShadowSamples!==e&&(this._parallaxShadowSamples===0!=(e===0)&&(this._dirtyShader=!0),this._parallaxShadowSamples=e)}),W(`opacity`,1),W(`alphaFade`,1),Zf({name:`alphaDither`,defaultValue:null,dirtyShaderFunc:()=>!1,getterFunc:function(){return this._alphaDither??this._opacity}}),W(`alphaTest`,0),W(`bumpiness`,1),W(`normalDetailMapBumpiness`,1),W(`reflectivity`,1),W(`occludeSpecularIntensity`,1),W(`refraction`,0),W(`refractionIndex`,1/1.5,(e,t,n)=>Math.max(.001,e.refractionIndex)),W(`dispersion`,0),W(`thickness`,0),W(`attenuationDistance`,0),W(`metalness`,1),W(`anisotropyIntensity`,0),W(`anisotropyRotation`,0),W(`clearCoat`,0),W(`clearCoatGloss`,1),W(`clearCoatBumpiness`,1),W(`aoUvSet`,0,null),W(`iridescence`,0),W(`iridescenceRefractionIndex`,1/1.5),W(`iridescenceThicknessMin`,0),W(`iridescenceThicknessMax`,0),tp(`ambientSH`),tp(`cubeMapProjectionBox`,(e,t,n)=>{let r=e._allocUniform(`cubeMapProjectionBox`,()=>[{name:`envBoxMin`,value:new Float32Array(3)},{name:`envBoxMax`,value:new Float32Array(3)}]),i=e.cubeMapProjectionBox.getMin(),a=r[0].value;a[0]=i.x,a[1]=i.y,a[2]=i.z;let o=e.cubeMapProjectionBox.getMax(),s=r[1].value;return s[0]=o.x,s[1]=o.y,s[2]=o.z,r}),G(`specularityFactorTint`,!1),G(`useMetalness`,!1),G(`useMetalnessSpecularColor`,!1),G(`useSheen`,!1),G(`enableGGXSpecular`,!1),G(`occludeDirect`,!1),G(`opacityFadesSpecular`,!0),G(`occludeSpecular`,1),G(`fresnelModel`,2),G(`useDynamicRefraction`,!1),G(`cubeMapProjection`,0),G(`useFog`,!0),G(`useLighting`,!0),G(`useTonemap`,!0),G(`useSkybox`,!0),G(`forceUv1`,!1),G(`pixelSnap`,!1),G(`twoSidedLighting`,!1),G(`nineSlicedMode`,void 0),G(`msdfTextAttribute`,!1),G(`useIridescence`,!1),G(`glossInvert`,!1),G(`sheenGlossInvert`,!1),G(`clearCoatGlossInvert`,!1),G(`parallaxMode`,uo),G(`opacityDither`,ro),G(`opacityShadowDither`,ro),G(`shadowCatcher`,!1),G(`vertexColorGamma`,!1),U(`diffuse`),U(`specular`),U(`emissive`),U(`thickness`,`g`),U(`specularityFactor`,`g`),U(`normal`,``),U(`metalness`,`g`),U(`gloss`,`g`),U(`opacity`,`a`),U(`refraction`,`g`),U(`height`,`g`,!1),U(`ao`,`g`),U(`light`,`rgb`,!0,1),U(`msdf`,``),U(`diffuseDetail`,`rgb`,!1),U(`normalDetail`,``),U(`aoDetail`,`g`,!1),U(`clearCoat`,`g`),U(`clearCoatGloss`,`g`),U(`clearCoatNormal`,``),U(`sheen`,`rgb`),U(`sheenGloss`,`g`),U(`iridescence`,`g`),U(`iridescenceThickness`,`g`),U(`anisotropy`,``),G(`diffuseDetailMode`,`mul`),G(`aoDetailMode`,`mul`),tp(`cubeMap`),tp(`sphereMap`),tp(`envAtlas`);let e=function(){return this._prefilteredCubemaps},t=function(e){let t=this._prefilteredCubemaps;e=e||[];let n=!1,r=!0;for(let i=0;i<6;++i){let a=e[i]||null;t[i]!==a&&(t[i]=a,n=!0),r=r&&!!t[i]}n&&(r?this.envAtlas=yf.generatePrefilteredAtlas(t,{target:this.envAtlas}):this.envAtlas&&(this.envAtlas.destroy(),this.envAtlas=null),this._dirtyShader=!0)},n=[null,null,null,null,null,null];Jf(`prefilteredCubemaps`,()=>n.slice(),t,e)}np();function rp(e,t){Object.defineProperty(Kf.prototype,t,{get:function(){return this[e]},set:function(t){this[e]=t}})}function ip(e){Object.defineProperty(Kf.prototype,e,{get:function(){return!0},set:function(e){}})}ip(`sheenTint`),ip(`diffuseTint`),ip(`emissiveTint`),ip(`ambientTint`),ip(`specularTint`),rp(`aoVertexColor`,`aoMapVertexColor`),rp(`diffuseVertexColor`,`diffuseMapVertexColor`),rp(`specularVertexColor`,`specularMapVertexColor`),rp(`emissiveVertexColor`,`emissiveMapVertexColor`),rp(`metalnessVertexColor`,`metalnessMapVertexColor`),rp(`glossVertexColor`,`glossMapVertexColor`),rp(`opacityVertexColor`,`opacityMapVertexColor`),rp(`lightVertexColor`,`lightMapVertexColor`),rp(`sheenGloss`,`sheenGlossiness`),rp(`clearCoatGloss`,`clearCoatGlossiness`);var ap=8/64,op=1-ap*2,sp=class extends Td{constructor(e,t,n,r,i,a){super();let o=new k,s=new k,c=new k,l=new k,u=new k,d=new k,f=[],p=[],m=[],h=[],g=[],_;if(n>0)for(let a=0;a<=r;a++)for(let _=0;_<=i;_++){let v=_/i*2*Math.PI-Math.PI,y=Math.sin(v),b=Math.cos(v);u.set(y*e,-n/2,b*e),l.set(y*t,n/2,b*t),o.lerp(u,l,a/r),s.sub2(l,u).normalize(),d.set(b,0,-y),c.cross(d,s).normalize(),f.push(o.x,o.y,o.z),p.push(c.x,c.y,c.z);let x=_/i,S=a/r;m.push(x,1-S);let C=S;if(S=x,x=C,x=x*op+ap,S=S*op+ap,x/=3,h.push(x,1-S),a<r&&_<i){let e=a*(i+1)+_,t=a*(i+1)+(_+1),n=(a+1)*(i+1)+_,r=(a+1)*(i+1)+(_+1);g.push(e,t,n),g.push(t,r,n)}}if(a){let e=Math.floor(i/2),a=i,o=n/2;for(let n=0;n<=e;n++){let r=n*Math.PI*.5/e,i=Math.sin(r),s=Math.cos(r);for(let r=0;r<=a;r++){let c=r*2*Math.PI/a-Math.PI/2,l=Math.sin(c),u=Math.cos(c)*i,d=s,g=l*i,_=1-r/a,v=1-n/e;f.push(u*t,d*t+o,g*t),p.push(u,d,g),m.push(_,1-v),_=_*op+ap,v=v*op+ap,_/=3,v/=3,_+=1/3,h.push(_,1-v)}}_=(r+1)*(i+1);for(let t=0;t<e;++t)for(let e=0;e<a;++e){let n=t*(a+1)+e,r=n+a+1;g.push(_+n+1,_+r,_+n),g.push(_+n+1,_+r+1,_+r)}for(let n=0;n<=e;n++){let r=Math.PI*.5+n*Math.PI*.5/e,i=Math.sin(r),s=Math.cos(r);for(let r=0;r<=a;r++){let c=r*2*Math.PI/a-Math.PI/2,l=Math.sin(c),u=Math.cos(c)*i,d=s,g=l*i,_=1-r/a,v=1-n/e;f.push(u*t,d*t-o,g*t),p.push(u,d,g),m.push(_,1-v),_=_*op+ap,v=v*op+ap,_/=3,v/=3,_+=2/3,h.push(_,1-v)}}_=(r+1)*(i+1)+(a+1)*(e+1);for(let t=0;t<e;++t)for(let e=0;e<a;++e){let n=t*(a+1)+e,r=n+a+1;g.push(_+n+1,_+r,_+n),g.push(_+n+1,_+r+1,_+r)}}else{if(_=(r+1)*(i+1),e>0)for(let t=0;t<i;t++){let r=t/i*2*Math.PI,a=Math.sin(r),o=-n/2,s=Math.cos(r),c=1-(a+1)/2,l=(s+1)/2;f.push(a*e,o,s*e),p.push(0,-1,0),m.push(c,1-l),c=c*op+ap,l=l*op+ap,c/=3,l/=3,c+=1/3,h.push(c,1-l),t>1&&g.push(_,_+t,_+t-1)}if(_+=i,t>0)for(let e=0;e<i;e++){let r=e/i*2*Math.PI,a=Math.sin(r),o=n/2,s=Math.cos(r),c=1-(a+1)/2,l=(s+1)/2;f.push(a*t,o,s*t),p.push(0,1,0),m.push(c,1-l),c=c*op+ap,l=l*op+ap,c/=3,l/=3,c+=2/3,h.push(c,1-l),e>1&&g.push(_,_+e-1,_+e)}}this.positions=f,this.normals=p,this.uvs=m,this.uvs1=h,this.indices=g}},cp=class extends sp{constructor(e={}){let t=e.radius??.3,n=e.height??1,r=e.heightSegments??1,i=e.sides??20;super(t,t,n-2*t,r,i,!0),e.calculateTangents&&this.calculateTangents()}},lp=class extends sp{constructor(e={}){let t=e.baseRadius??.5,n=e.peakRadius??0,r=e.height??1,i=e.heightSegments??5,a=e.capSegments??18;super(t,n,r,i,a,!1),e.calculateTangents&&this.calculateTangents()}},up=class extends sp{constructor(e={}){let t=e.radius??.5,n=e.height??1,r=e.heightSegments??5,i=e.capSegments??20;super(t,t,n,r,i,!1),e.calculateTangents&&this.calculateTangents()}},dp=class extends Td{constructor(e={}){super();let t=e.halfExtents??new A(.5,.5),n=e.widthSegments??5,r=e.lengthSegments??5,i=[],a=[],o=[],s=[],c=0;for(let e=0;e<=n;e++)for(let l=0;l<=r;l++){let u=-t.x+2*t.x*e/n,d=-(-t.y+2*t.y*l/r),f=e/n,p=l/r;i.push(u,0,d),a.push(0,1,0),o.push(f,1-p),e<n&&l<r&&(s.push(c+r+1,c+1,c),s.push(c+r+1,c+r+2,c+1)),c++}this.positions=i,this.normals=a,this.uvs=o,this.uvs1=o,this.indices=s,e.calculateTangents&&this.calculateTangents()}},fp=class extends Td{constructor(e={}){super();let t=e.tubeRadius??.2,n=e.ringRadius??.3,r=(e.sectorAngle??360)*E.DEG_TO_RAD,i=e.segments??30,a=e.sides??20,o=[],s=[],c=[],l=[];for(let e=0;e<=a;e++)for(let u=0;u<=i;u++){let d=Math.cos(r*u/i)*(n+t*Math.cos(2*Math.PI*e/a)),f=Math.sin(2*Math.PI*e/a)*t,p=Math.sin(r*u/i)*(n+t*Math.cos(2*Math.PI*e/a)),m=Math.cos(r*u/i)*Math.cos(2*Math.PI*e/a),h=Math.sin(2*Math.PI*e/a),g=Math.sin(r*u/i)*Math.cos(2*Math.PI*e/a),_=e/a,v=1-u/i;if(o.push(d,f,p),s.push(m,h,g),c.push(_,1-v),e<a&&u<i){let t=e*(i+1)+u,n=(e+1)*(i+1)+u,r=e*(i+1)+(u+1),a=(e+1)*(i+1)+(u+1);l.push(t,n,r),l.push(n,a,r)}}this.positions=o,this.normals=s,this.uvs=c,this.uvs1=c,this.indices=l,e.calculateTangents&&this.calculateTangents()}},pp=class{constructor(e,t){v(this,`processedCache`,new Map),v(this,`definitionsCache`,new Map),v(this,`_generators`,new Map),this._device=e,this._isClearingCache=!1,this._precached=!1,this._programsCollection=[],this._defaultStdMatOption=new Df,this._defaultStdMatOptionMin=new Df;let n=new Ls;t.shaderOptBuilder.updateRef(this._defaultStdMatOption,{},n,t,null,[],0,null),t.shaderOptBuilder.updateMinRef(this._defaultStdMatOptionMin,{},t,null,2,null),e.on(`destroy:shader`,e=>{this.removeFromCache(e)})}destroy(){this.clearCache()}register(e,t){this._generators.has(e)||this._generators.set(e,t)}unregister(e){this._generators.has(e)&&this._generators.delete(e)}isRegistered(e){return this._generators.has(e)}generateShaderDefinition(e,t,n,r){let i=this.definitionsCache.get(n);if(!i){let a;r.litOptions?.lights&&(a=r.litOptions.lights,r.litOptions.lights=a.map(e=>{let t=e.clone?e.clone():e;return t.key=e.key,t})),this.storeNewProgram(t,r),r.litOptions?.lights&&(r.litOptions.lights=a),this._precached;let o=this._device;i=e.createShaderDefinition(o,r),i.name=i.name??(r.pass?`${t}-pass:${r.pass}`:t),this.definitionsCache.set(n,i)}return i}getCachedShader(e){return this.processedCache.get(e)}setCachedShader(e,t){this.processedCache.set(e,t)}getProgram(e,t,n,r){let i=this._generators.get(e);if(!i)return null;let a=ir(i.generateKey(t)),o=`${a}#${ir(n.generateKey(this._device))}`,s=this.getCachedShader(o);if(!s){let c=this.generateShaderDefinition(i,e,a,t),l=``,u;t.pass!==void 0&&(u=No.get(this._device).getByIndex(t.pass),l=`-${u.name}`),this._device.fire(`shader:generate`,{userMaterialId:r,shaderPassInfo:u,definition:c});let d={name:`${c.name}${l}-proc`,attributes:c.attributes,vshader:c.vshader,vincludes:c.vincludes,fincludes:c.fincludes,fshader:c.fshader,processingOptions:n,shaderLanguage:c.shaderLanguage,useDualSourceBlending:c.useDualSourceBlending,meshUniformBufferFormat:c.meshUniformBufferFormat,meshBindGroupFormat:c.meshBindGroupFormat};s=new mi(this._device,d),this.setCachedShader(o,s)}return s}storeNewProgram(e,t){let n={};if(e===`standard`){let e=this._getDefaultStdMatOptions(t.pass);for(let r in t)(t.hasOwnProperty(r)&&e[r]!==t[r]||r===`pass`)&&(n[r]=t[r]);for(let e in t.litOptions)n[e]=t.litOptions[e]}else n=t;this._programsCollection.push(JSON.stringify({name:e,options:n}))}dumpPrograms(){let n=`let device = pc.app ? pc.app.graphicsDevice : pc.Application.getApplication().graphicsDevice;
`;n+=`let shaders = [`,this._programsCollection[0]&&(n+=`
	${this._programsCollection[0]}`);for(let e=1;e<this._programsCollection.length;++e)n+=`,
	${this._programsCollection[e]}`;n+=`
];
`,n+=`pc.getProgramLibrary(device).precompile(shaders);
`,n+=`if (pc.version != "${e}" || pc.revision != "${t}")
`,n+=`	console.warn("precompile-shaders.js: engine version mismatch, rebuild shaders lib with current engine");`;let r=document.createElement(`a`);r.setAttribute(`href`,`data:text/plain;charset=utf-8,${encodeURIComponent(n)}`),r.setAttribute(`download`,`precompile-shaders.js`),r.style.display=`none`,document.body.appendChild(r),r.click(),document.body.removeChild(r)}clearCache(){this._isClearingCache=!0,this.processedCache.forEach(e=>{e.destroy()}),this.processedCache.clear(),this._isClearingCache=!1}removeFromCache(e){this._isClearingCache||this.processedCache.forEach((t,n)=>{e===t&&this.processedCache.delete(n)})}_getDefaultStdMatOptions(e){let t=No.get(this._device).getByIndex(e);return e===3||e===1||t.isShadow?this._defaultStdMatOptionMin:this._defaultStdMatOption}precompile(e){if(e){let t=Array(e.length);for(let n=0;n<e.length;n++){if(e[n].name===`standard`){let t=e[n].options,r=this._getDefaultStdMatOptions(t.pass);for(let e in r)r.hasOwnProperty(e)&&t[e]===void 0&&(t[e]=r[e])}t[n]=this.getProgram(e[n].name,e[n].options)}}this._precached=!0}},mp=`FILL_WINDOW`,hp=`KEEP_ASPECT`,gp=`AUTO`,_p=`FIXED`,vp;function yp(){return vp}function bp(e){vp=e}var xp=class{constructor(){v(this,`renderPasses`,[]),v(this,`renderTargetMap`,new Map),v(this,`multiview`,null)}beginMultiView(e){this.multiview=new il(e)}endMultiView(){let e=this.multiview;this.multiview=null,e?.children.length&&this.renderPasses.push(e)}addRenderPass(e){e.frameUpdate();let t=e.beforePasses;for(let e=0;e<t.length;e++){let n=t[e];n.enabled&&this.addRenderPass(n)}e.enabled&&(this.multiview?this.multiview.addChild(e):this.renderPasses.push(e));let n=e.afterPasses;for(let e=0;e<n.length;e++){let t=n[e];t.enabled&&this.addRenderPass(t)}}reset(){this.renderPasses.length=0}compile(){this._compilePasses(this.renderPasses);for(let e=0;e<this.renderPasses.length;e++){let t=this.renderPasses[e];t instanceof il&&this._compilePasses(t.children)}}_compilePasses(e){let t=this.renderTargetMap;for(let n=0;n<e.length;n++){let r=e[n];r._skipStart=!1,r._skipEnd=!1;let i=r.renderTarget;if(i!==void 0){let e=t.get(i);if(e){let t=r.colorArrayOps.length;for(let n=0;n<t;n++)r.colorArrayOps[n].clear||(e.colorArrayOps[n].store=!0);r.depthStencilOps.clearDepth||(e.depthStencilOps.storeDepth=!0),r.depthStencilOps.clearStencil||(e.depthStencilOps.storeStencil=!0)}t.set(i,r)}}for(let t=0;t<e.length-1;t++){let n=e[t],r=n.renderTarget,i=e[t+1];r===i.renderTarget&&r!==void 0&&(i.depthStencilOps.clearDepth||i.depthStencilOps.clearStencil||i.colorArrayOps.some(e=>e.clear)||n.afterPasses.length>0||i.beforePasses.length>0||(n._skipEnd=!0,i._skipStart=!0))}let n=null,r=null;for(let t=0;t<e.length;t++){let i=e[t],a=i.renderTarget,o=a?.colorBuffer;if(o?.cubemap){if(n===o){let e=r.colorArrayOps.length;for(let t=0;t<e;t++)r.colorArrayOps[t].mipmaps=!1}n=a.colorBuffer,r=i}else i.requiresCubemaps&&(n=null,r=null)}t.clear()}render(e){this.compile();let t=this.renderPasses;for(let e=0;e<t.length;e++)t[e].render()}},Sp=class{constructor(e,t){this.texture0=e,this.texture1=t}destroy(){this.texture0?.destroy(),this.texture1?.destroy()}},Cp=new an,wp=class e{static createTexture(e,t,n,r=``){return new dn(e,{name:`AreaLightLUT${r}`,width:n,height:n,format:t,addressU:1,addressV:1,type:Dt,magFilter:1,minFilter:0,anisotropy:1,mipmaps:!1})}static applyTextures(e,t,n){Cp.remove(e),Cp.get(e,()=>new Sp(t,t===n?null:n)),e.scope.resolve(`areaLightsLutTex1`).setValue(t),e.scope.resolve(`areaLightsLutTex2`).setValue(n)}static createPlaceholder(t){let n=e.createTexture(t,12,2,`placeholder`);n.lock().fill(0),n.unlock(),e.applyTextures(t,n,n)}static set(t,n,r){function i(t,n,r){let i=e.createTexture(t,r,64);return i.lock().set(n),i.unlock(),i}function a(e){let t=e.length,n=new Uint16Array(t),r=ne.float2Half;for(let i=0;i<t;i++)n[i]=r(e[i]);return n}let o=n,s=r,c=a(o),l=a(s),u=i(t,c,12),d=i(t,l,12);e.applyTextures(t,u,d)}},Tp=`en-US`,Ep={en:`en-US`,es:`en-ES`,zh:`zh-CN`,"zh-HK":`zh-TW`,"zh-TW":`zh-HK`,"zh-MO":`zh-HK`,fr:`fr-FR`,de:`de-DE`,it:`it-IT`,ru:`ru-RU`,ja:`ja-JP`},Dp={};function Op(e,t){for(let n=0,r=e.length;n<r;n++)Dp[e[n]]=t}function kp(e){let t=e.indexOf(`-`);return t===-1?e:e.substring(0,t)}function Ap(e,t){let n=e.indexOf(`-`);return n===-1?t:t+e.substring(n)}function jp(e,t){if(t[e])return e;let n=Ep[e];if(n&&t[n])return n;let r=kp(e);return n=Ep[r],t[n]?n:t[r]?r:Tp}Op([`ja`,`ko`,`th`,`vi`,`zh`,`id`],e=>0),Op([`fa`,`hi`],e=>e>=0&&e<=1?0:1),Op([`fr`,`pt`],e=>e>=0&&e<2?0:1),Op([`da`],e=>e===1||!Number.isInteger(e)&&e>=0&&e<=1?0:1),Op([`de`,`en`,`it`,`el`,`es`,`tr`,`fi`,`sv`,`nb`,`no`,`ur`],e=>e===1?0:1),Op([`ru`,`uk`],e=>{if(Number.isInteger(e)){let t=e%10,n=e%100;if(t===1&&n!==11)return 0;if(t>=2&&t<=4&&(n<12||n>14))return 1;if(t===0||t>=5&&t<=9||n>=11&&n<=14)return 2}return 3}),Op([`pl`],e=>{if(Number.isInteger(e)){if(e===1)return 0;let t=e%10,n=e%100;if(t>=2&&t<=4&&(n<12||n>14))return 1;if(t>=0&&t<=1||t>=5&&t<=9||n>=12&&n<=14)return 2}return 3}),Op([`ar`],e=>{if(e===0)return 0;if(e===1)return 1;if(e===2)return 2;if(Number.isInteger(e)){let t=e%100;if(t>=3&&t<=10)return 3;if(t>=11&&t<=99)return 4}return 5});var Mp=Dp[kp(Tp)];function Np(e){return Dp[e]||Mp}var Pp=RegExp(`^\\s*(?:(?:[a-z]+[a-z0-9\\-+.]*:)?//|data:|blob:)`,`i`),Fp=class{constructor(e=``,t=``,n=null,r=null,i=null,a=null){this.url=e,this.filename=t,this.hash=n,this.size=r,this.opt=i,this.contents=a}equals(e){return this.url===e.url&&this.filename===e.filename&&this.hash===e.hash&&this.size===e.size&&this.opt===e.opt&&this.contents===e.contents}},Ip=-1,Lp={pvr:`extCompressedTexturePVRTC`,dxt:`extCompressedTextureS3TC`,etc2:`extCompressedTextureETC`,etc1:`extCompressedTextureETC1`,basis:`canvas`},Rp=[`pvr`,`dxt`,`etc2`,`etc1`,`basis`],zp=class extends b{constructor(e,t,n,r={},i={}){super(),v(this,`_file`,null),v(this,`_i18n`,{}),v(this,`_preload`,!1),v(this,`_resources`,[]),v(this,`id`,Ip--),v(this,`loaded`,!1),v(this,`loading`,!1),v(this,`options`,{}),v(this,`registry`,null),v(this,`tags`,new x(this)),v(this,`type`,void 0),v(this,`urlObject`,null),this._name=e||``,this.type=t,this._data=r||{},this.options=i||{},n&&(this.file=n)}set name(e){if(this._name===e)return;let t=this._name;this._name=e,this.fire(`name`,this,this._name,t)}get name(){return this._name}set file(e){if(e&&e.variants&&[`texture`,`textureatlas`,`bundle`].indexOf(this.type)!==-1){let t=this.registry?._loader?._app||yp(),n=t?.graphicsDevice;if(n)for(let r=0,i=Rp.length;r<i;r++){let i=Rp[r];if(e.variants[i]&&n[Lp[i]]){e=e.variants[i];break}if(t.enableBundles){let e=t.bundles.listBundlesForAsset(this);if(e&&e.find(e=>e?.file?.variants[i]))break}}}let t=this._file,n=e?new Fp(e.url,e.filename,e.hash,e.size,e.opt,e.contents):null;(!!n!=!!t||n&&!n.equals(t))&&(this._file=n,this.fire(`change`,this,`file`,n,t),this.reload())}get file(){return this._file}set data(e){let t=this._data;this._data=e,e!==t&&(this.fire(`change`,this,`data`,e,t),this.loaded&&this.registry._loader.patch(this,this.registry))}get data(){return this._data}set resource(e){let t=this._resources[0];this._resources[0]=e,this.fire(`change`,this,`resource`,e,t)}get resource(){return this._resources[0]}set resources(e){let t=this._resources;this._resources=e,this.fire(`change`,this,`resources`,e,t)}get resources(){return this._resources}set preload(e){e=!!e,this._preload!==e&&(this._preload=e,this._preload&&!this.loaded&&!this.loading&&this.registry&&this.registry.load(this))}get preload(){return this._preload}set loadFaces(e){e=!!e,(!this.hasOwnProperty(`_loadFaces`)||e!==this._loadFaces)&&(this._loadFaces=e,this.loaded&&this.registry._loader.patch(this,this.registry))}get loadFaces(){return this._loadFaces}getFileUrl(){let e=this.file;if(!e||!e.url)return null;let t=e.url;if(this.registry&&this.registry.prefix&&!Pp.test(t)&&(t=this.registry.prefix+t),this.type!==`script`&&e.hash){let n=t.indexOf(`?`)===-1?`?`:`&`;t+=`${n}t=${e.hash}`}return t}getAbsoluteUrl(e){if(e.startsWith(`blob:`)||e.startsWith(`data:`))return e;let t=i.getDirectory(this.file.url);return i.join(t,e)}getLocalizedAssetId(e){return e=jp(e,this._i18n),this._i18n[e]||null}addLocalizedAssetId(e,t){this._i18n[e]=t,this.fire(`add:localized`,e,t)}removeLocalizedAssetId(e){let t=this._i18n[e];t&&(delete this._i18n[e],this.fire(`remove:localized`,e,t))}ready(e,t){t=t||this,this.loaded?e.call(t,this):this.once(`load`,n=>{e.call(t,n)})}reload(){this.loaded&&(this.loaded=!1,this.registry.load(this))}unload(){if(!this.loaded&&this._resources.length===0)return;this.fire(`unload`,this),this.registry?.fire(`unload:${this.id}`,this);let e=this._resources;this.urlObject&&(URL.revokeObjectURL(this.urlObject),this.urlObject=null),this.resources=[],this.loaded=!1,this.file&&this.registry?._loader.clearCache(this.getFileUrl(),this.type);for(let t=0;t<e.length;++t)e[t]?.destroy?.()}static fetchArrayBuffer(e,t,n,r=0){n?.file?.contents?setTimeout(()=>{t(null,n.file.contents)}):Ea.get(e,{cache:!0,responseType:`arraybuffer`,retry:r>0,maxRetries:r,progress:n},t)}};v(zp,`EVENT_LOAD`,`load`),v(zp,`EVENT_UNLOAD`,`unload`),v(zp,`EVENT_REMOVE`,`remove`),v(zp,`EVENT_ERROR`,`error`),v(zp,`EVENT_CHANGE`,`change`),v(zp,`EVENT_PROGRESS`,`progress`),v(zp,`EVENT_ADDLOCALIZED`,`add:localized`),v(zp,`EVENT_REMOVELOCALIZED`,`remove:localized`);var Bp=class{constructor(e=null){v(this,`_index`,{}),v(this,`_key`,void 0),this._key=e}addItem(e){let t=e.tags._list;for(let n of t)this.add(n,e)}removeItem(e){let t=e.tags._list;for(let n of t)this.remove(n,e)}add(e,t){this._index[e]&&this._index[e].list.indexOf(t)!==-1||(this._index[e]||(this._index[e]={list:[]},this._key&&(this._index[e].keys={})),this._index[e].list.push(t),this._key&&(this._index[e].keys[t[this._key]]=t))}remove(e,t){if(!this._index[e]||this._key&&!this._index[e].keys[t[this._key]])return;let n=this._index[e].list.indexOf(t);n!==-1&&(this._index[e].list.splice(n,1),this._key&&delete this._index[e].keys[t[this._key]],this._index[e].list.length===0&&delete this._index[e])}find(e){let t={},n=[],r,i,a,o,s,c=(e,t)=>this._index[e].list.length-this._index[t].list.length;for(let l=0;l<e.length;l++){if(i=e[l],i instanceof Array){if(i.length===0)continue;if(i.length===1)i=i[0];else{s=!1;for(let e=0;e<i.length;e++)if(!this._index[i[e]]){s=!0;break}if(s)continue;a=i.slice(0).sort(c),o=a.slice(1),o.length===1&&(o=o[0]);for(let e=0;e<this._index[a[0]].list.length;e++)r=this._index[a[0]].list[e],(this._key?!t[r[this._key]]:n.indexOf(r)===-1)&&r.tags.has(o)&&(this._key&&(t[r[this._key]]=!0),n.push(r));continue}}if(i&&typeof i==`string`&&this._index[i])for(let e=0;e<this._index[i].list.length;e++)r=this._index[i].list[e],this._key?t[r[this._key]]||(t[r[this._key]]=!0,n.push(r)):n.indexOf(r)===-1&&n.push(r)}return n}},Vp=class extends b{constructor(e){super(),v(this,`_assets`,new Set),v(this,`_loader`,void 0),v(this,`_idToAsset`,new Map),v(this,`_urlToAsset`,new Map),v(this,`_nameToAsset`,new Map),v(this,`_tags`,new Bp(`id`)),v(this,`prefix`,null),v(this,`bundles`,null),this._loader=e}get loader(){return this._loader}list(e={}){let t=Array.from(this._assets);return e.preload===void 0?t:t.filter(t=>t.preload===e.preload)}add(e){this._assets.has(e)||(this._assets.add(e),this._idToAsset.set(e.id,e),e.file?.url&&this._urlToAsset.set(e.file.url,e),this._nameToAsset.has(e.name)||this._nameToAsset.set(e.name,new Set),this._nameToAsset.get(e.name).add(e),e.on(`name`,this._onNameChange,this),e.registry=this,this._tags.addItem(e),e.tags.on(`add`,this._onTagAdd,this),e.tags.on(`remove`,this._onTagRemove,this),this.fire(`add`,e),this.fire(`add:${e.id}`,e),e.file?.url&&this.fire(`add:url:${e.file.url}`,e),e.preload&&this.load(e))}remove(e){if(!this._assets.has(e))return!1;if(this._assets.delete(e),this._idToAsset.delete(e.id),e.file?.url&&this._urlToAsset.delete(e.file.url),e.off(`name`,this._onNameChange,this),this._nameToAsset.has(e.name)){let t=this._nameToAsset.get(e.name);t.delete(e),t.size===0&&this._nameToAsset.delete(e.name)}return this._tags.removeItem(e),e.tags.off(`add`,this._onTagAdd,this),e.tags.off(`remove`,this._onTagRemove,this),e.fire(`remove`,e),this.fire(`remove`,e),this.fire(`remove:${e.id}`,e),e.file?.url&&this.fire(`remove:url:${e.file.url}`,e),!0}destroy(){for(let e of this._assets)e.off(`name`,this._onNameChange,this),e.tags.off(`add`,this._onTagAdd,this),e.tags.off(`remove`,this._onTagRemove,this),e.registry===this&&(e.registry=null);this._assets.clear(),this._idToAsset.clear(),this._urlToAsset.clear(),this._nameToAsset.clear(),this._tags=null,this.bundles=null,this.off()}get(e){return this._idToAsset.get(Number(e))}getByUrl(e){return this._urlToAsset.get(e)}load(e,t){if((e.loading||e.loaded)&&!t?.force)return;let n=e.file,r=()=>{this.fire(`load`,e),this.fire(`load:${e.id}`,e),n&&n.url&&this.fire(`load:url:${n.url}`,e),e.fire(`load`,e)},i=t=>{if(t instanceof Array?e.resources=t:e.resource=t,this._loader.patch(e,this),e.type===`bundle`){let t=e.data.assets;for(let e=0;e<t.length;e++){let n=this._idToAsset.get(t[e]);n&&!n.loaded&&this.load(n,{force:!0})}e.resource.loaded?r():(this.fire(`load:start`,e),this.fire(`load:start:${e.id}`,e),n&&n.url&&this.fire(`load:start:url:${n.url}`,e),e.fire(`load:start`,e),e.resource.on(`load`,r))}else r()},a=(t,n,r)=>{if(e.loaded=!0,e.loading=!1,t)this.fire(`error`,t,e),this.fire(`error:${e.id}`,t,e),e.fire(`error`,t,e);else{if(e.type===`script`){let t=this._loader.getHandler(`script`);t._cache[e.id]&&t._cache[e.id].parentNode===document.head&&document.head.removeChild(t._cache[e.id]),r&&(t._cache[e.id]=r)}i(n)}};if(n||e.type===`cubemap`){this.fire(`load:start`,e),this.fire(`load:${e.id}:start`,e),e.loading=!0;let n=e.getFileUrl();if(e.type===`bundle`){let t=e.data.assets;for(let e=0;e<t.length;e++){let n=this._idToAsset.get(t[e]);n&&(n.loaded||n.resource||n.loading||(n.loading=!0))}}this._loader.load(n,e.type,a,e,t)}else{let t=this._loader.open(e.type,e.data);e.loaded=!0,i(t)}}loadFromUrl(e,t,n){this.loadFromUrlAndFilename(e,null,t,n)}loadFromUrlAndFilename(e,t,n,r){let a=i.getBasename(t||e),o={filename:t||a,url:e},s=this.getByUrl(e);if(!s)s=new zp(a,n,o),this.add(s);else if(s.loaded){r(s.loadFromUrlError||null,s);return}let c=e=>{e.once(`load`,e=>{n===`material`?this._loadTextures(e,(t,n)=>{r(t,e)}):r(null,e)}),e.once(`error`,t=>{t&&(this.loadFromUrlError=t),r(t,e)}),this.load(e)};s.resource?r(null,s):n===`model`?this._loadModel(s,c):c(s)}_loadModel(e,t){let n=e.getFileUrl(),r=i.getExtension(n);if(r===`.json`||r===`.glb`){let a=i.getDirectory(n),o=i.getBasename(n),s=i.join(a,o.replace(r,`.mapping.json`));this._loader.load(s,`json`,(n,r)=>{n?(e.data={mapping:[]},t(e)):this._loadMaterials(e,r,(n,i)=>{e.data=r,t(e)})})}else t(e)}_loadMaterials(e,t,n){let r=[],i=0,a=(e,t)=>{this._loadTextures(t,(e,a)=>{r.push(t),r.length===i&&n(null,r)})};for(let n=0;n<t.mapping.length;n++){let r=t.mapping[n].path;if(r){i++;let t=e.getAbsoluteUrl(r);this.loadFromUrl(t,`material`,a)}}i===0&&n(null,r)}_loadTextures(e,t){let n=[],r=0,i=e.data;if(i.mappingFormat!==`path`){t(null,n);return}let a=(i,a)=>{i&&console.error(`Failed to load material texture for "${e.name}": ${i?.message??i}`,i),n.push(a),n.length===r&&t(null,n)},o=zf;for(let t=0;t<o.length;t++){let n=i[o[t]];if(n&&typeof n==`string`){r++;let t=e.getAbsoluteUrl(n);this.loadFromUrl(t,`texture`,a)}}r===0&&t(null,n)}_onTagAdd(e,t){this._tags.add(e,t)}_onTagRemove(e,t){this._tags.remove(e,t)}_onNameChange(e,t,n){if(this._nameToAsset.has(n)){let t=this._nameToAsset.get(n);t.delete(e),t.size===0&&this._nameToAsset.delete(n)}this._nameToAsset.has(e.name)||this._nameToAsset.set(e.name,new Set),this._nameToAsset.get(e.name).add(e)}findByTag(...e){return this._tags.find(e)}filter(e){return Array.from(this._assets).filter(t=>e(t))}find(e,t){let n=this._nameToAsset.get(e);if(!n)return null;for(let e of n)if(!t||e.type===t)return e;return null}findAll(e,t){let n=this._nameToAsset.get(e);if(!n)return[];let r=Array.from(n);return t?r.filter(e=>e.type===t):r}log(){}getAssetById(e){return this.get(e)}};v(Vp,`EVENT_LOAD`,`load`),v(Vp,`EVENT_ADD`,`add`),v(Vp,`EVENT_REMOVE`,`remove`),v(Vp,`EVENT_ERROR`,`error`);var Hp=class{constructor(e){v(this,`_idToBundle`,new Map),v(this,`_assetToBundles`,new Map),v(this,`_urlsToBundles`,new Map),v(this,`_fileRequests`,new Map),this._assets=e,this._assets.bundles=this,this._assets.on(`add`,this._onAssetAdd,this),this._assets.on(`remove`,this._onAssetRemove,this)}_onAssetAdd(e){if(e.type===`bundle`){this._idToBundle.set(e.id,e),this._assets.on(`load:start:${e.id}`,this._onBundleLoadStart,this),this._assets.on(`load:${e.id}`,this._onBundleLoad,this),this._assets.on(`error:${e.id}`,this._onBundleError,this);let t=e.data.assets;for(let n=0;n<t.length;n++)this._indexAssetInBundle(t[n],e)}else this._assetToBundles.has(e.id)&&this._indexAssetFileUrls(e)}_unbindAssetEvents(e){this._assets.off(`load:start:${e}`,this._onBundleLoadStart,this),this._assets.off(`load:${e}`,this._onBundleLoad,this),this._assets.off(`error:${e}`,this._onBundleError,this)}_indexAssetInBundle(e,t){let n=this._assetToBundles.get(e);n||(n=new Set,this._assetToBundles.set(e,n)),n.add(t);let r=this._assets.get(e);r&&this._indexAssetFileUrls(r)}_indexAssetFileUrls(e){let t=this._getAssetFileUrls(e);if(t)for(let n=0;n<t.length;n++){let r=this._assetToBundles.get(e.id);r&&this._urlsToBundles.set(t[n],r)}}_getAssetFileUrls(e){let t=e.getFileUrl();if(!t)return null;t=t.split(`?`)[0];let n=[t];if(e.type===`font`){let r=e.data.info.maps.length;for(let e=1;e<r;e++)n.push(t.replace(`.png`,`${e}.png`))}return n}_onAssetRemove(e){if(e.type===`bundle`){this._idToBundle.delete(e.id),this._unbindAssetEvents(e.id);let t=e.data.assets;for(let n=0;n<t.length;n++){let r=this._assetToBundles.get(t[n]);if(r&&(r.delete(e),r.size===0)){this._assetToBundles.delete(t[n]);for(let[e,t]of this._urlsToBundles)t===r&&this._urlsToBundles.delete(e)}}this._onBundleError(`Bundle ${e.id} was removed`)}else{if(!this._assetToBundles.get(e.id))return;this._assetToBundles.delete(e.id);let t=this._getAssetFileUrls(e);if(!t)return;for(let e=0;e<t.length;e++)this._urlsToBundles.delete(t[e])}}_onBundleLoadStart(e){e.resource.on(`add`,(e,t)=>{let n=this._fileRequests.get(e);if(n){for(let e=0;e<n.length;e++)n[e](null,t);this._fileRequests.delete(e)}})}_onBundleLoad(e){if(!e.resource){this._onBundleError(`Bundle ${e.id} failed to load`);return}if(this._fileRequests)for(let[t,n]of this._fileRequests){let r=this._urlsToBundles.get(t);if(!r||!r.has(e))continue;let i=decodeURIComponent(t),a,o;if(e.resource.has(i))o=e.resource.get(i);else if(e.resource.loaded)a=`Bundle ${e.id} does not contain URL ${t}`;else continue;for(let e=0;e<n.length;e++)n[e](a,a||o);this._fileRequests.delete(t)}}_onBundleError(e){for(let[t,n]of this._fileRequests)if(!this._findLoadedOrLoadingBundleForUrl(t)){for(let t=0;t<n.length;t++)n[t](e);this._fileRequests.delete(t)}}_findLoadedOrLoadingBundleForUrl(e){let t=this._urlsToBundles.get(e);if(!t)return null;let n=null;for(let e of t)if(e.loaded&&e.resource)return e;else e.loading&&(n=e);return n}listBundlesForAsset(e){let t=this._assetToBundles.get(e.id);return t?Array.from(t):null}list(){return Array.from(this._idToBundle.values())}hasUrl(e){return this._urlsToBundles.has(e)}urlIsLoadedOrLoading(e){return!!this._findLoadedOrLoadingBundleForUrl(e)}loadUrl(e,t){let n=this._findLoadedOrLoadingBundleForUrl(e);if(!n){t(`URL ${e} not found in any bundles`);return}if(n.loaded){let r=decodeURIComponent(e);if(n.resource.has(r)){t(null,n.resource.get(r));return}if(n.resource.loaded){t(`Bundle ${n.id} does not contain URL ${e}`);return}}let r=this._fileRequests.get(e);r||(r=[],this._fileRequests.set(e,r)),r.push(t)}destroy(){this._assets.off(`add`,this._onAssetAdd,this),this._assets.off(`remove`,this._onAssetRemove,this);for(let e of this._idToBundle.keys())this._unbindAssetEvents(e);this._assets=null,this._idToBundle.clear(),this._idToBundle=null,this._assetToBundles.clear(),this._assetToBundles=null,this._urlsToBundles.clear(),this._urlsToBundles=null,this._fileRequests.clear(),this._fileRequests=null}},Up=class extends b{constructor(){super(),v(this,`anim`,void 0),v(this,`animation`,void 0),v(this,`audiolistener`,void 0),v(this,`button`,void 0),v(this,`camera`,void 0),v(this,`collision`,void 0),v(this,`element`,void 0),v(this,`gsplat`,void 0),v(this,`joint`,void 0),v(this,`layoutchild`,void 0),v(this,`layoutgroup`,void 0),v(this,`light`,void 0),v(this,`model`,void 0),v(this,`particlesystem`,void 0),v(this,`render`,void 0),v(this,`rigidbody`,void 0),v(this,`screen`,void 0),v(this,`script`,void 0),v(this,`scrollbar`,void 0),v(this,`scrollview`,void 0),v(this,`sound`,void 0),v(this,`sprite`,void 0),v(this,`zone`,void 0),this.list=[]}add(e){let t=e.id;if(this[t])throw Error(`ComponentSystem name '${t}' already registered or not allowed`);this[t]=e,this.list.push(e)}remove(e){let t=e.id;if(!this[t])throw Error(`No ComponentSystem named '${t}' registered`);let n=this.list.indexOf(this[t]);n!==-1&&this.list.splice(n,1),delete this[t]}destroy(){this.off();for(let e=0;e<this.list.length;e++)this.list[e].destroy()}},Wp=class extends b{constructor(...e){super(...e),v(this,`_index`,new Map),v(this,`_loaded`,!1)}addFile(e,t){this._index.has(e)||(this._index.set(e,t),this.fire(`add`,e,t))}has(e){return this._index.has(e)}get(e){return this._index.get(e)||null}destroy(){this._index.clear()}set loaded(e){e&&!this._loaded&&(this._loaded=!0,this.fire(`load`))}get loaded(){return this._loaded}};v(Wp,`EVENT_ADD`,`add`),v(Wp,`EVENT_LOAD`,`load`);var Gp=class extends b{constructor(e,t=``){super(),v(this,`headerSize`,512),v(this,`paddingSize`,512),v(this,`bytesRead`,0),v(this,`bytesReceived`,0),v(this,`headerRead`,!1),v(this,`reader`,null),v(this,`data`,new Uint8Array),v(this,`decoder`,null),v(this,`prefix`,``),v(this,`fileName`,``),v(this,`fileSize`,0),v(this,`fileType`,``),v(this,`ustarFormat`,``),this.prefix=t||``,this.reader=e.body.getReader(),this.reader.read().then(e=>{this.pump(e.done,e.value)}).catch(e=>{this.fire(`error`,e)})}pump(e,t){if(e)return this.fire(`done`),null;this.bytesReceived+=t.byteLength;let n=new Uint8Array(this.data.length+t.length);for(n.set(this.data),n.set(t,this.data.length),this.data=n;this.readFile(););return this.reader.read().then(e=>{this.pump(e.done,e.value)}).catch(e=>{this.fire(`error`,e)})}readFile(){if(!this.headerRead&&this.bytesReceived>this.bytesRead+this.headerSize){this.headerRead=!0;let e=new DataView(this.data.buffer,this.bytesRead,this.headerSize);this.decoder??(this.decoder=new TextDecoder(`windows-1252`));let t=this.decoder.decode(e);if(this.fileName=t.substring(0,100).replace(/\0/g,``),this.fileSize=parseInt(t.substring(124,136),8),this.fileType=t.substring(156,157),this.ustarFormat=t.substring(257,263),this.ustarFormat.indexOf(`ustar`)!==-1){let e=t.substring(345,500).replace(/\0/g,``);e.length>0&&(this.fileName=e.trim()+this.fileName.trim())}this.bytesRead+=512}if(this.headerRead){if(this.bytesReceived<this.bytesRead+this.fileSize)return!1;if(this.fileType===``||this.fileType===`0`){let e=new DataView(this.data.buffer,this.bytesRead,this.fileSize),t={name:this.prefix+this.fileName,size:this.fileSize,data:e};this.fire(`file`,t)}this.bytesRead+=this.fileSize,this.headerRead=!1;let e=this.bytesRead%this.paddingSize;return e!==0&&(this.bytesRead+=this.paddingSize-e),!0}return!1}},Kp=class{constructor(e,t){v(this,`handlerType`,``),v(this,`_app`,void 0),v(this,`_maxRetries`,0),v(this,`_parsers`,[]),this._app=e,this.handlerType=t}get app(){return this._app}set maxRetries(e){this._maxRetries=e}get maxRetries(){return this._maxRetries}addParser(e,t){e&&typeof e.canParse==`function`&&(e.handler=this,this._parsers.push(e))}removeParser(e){let t=this._parsers.indexOf(e);t!==-1&&(this._parsers.splice(t,1),e.handler=null)}get parsers(){return this._parsers.slice()}fetch(e,t,n,r){if(typeof e==`string`&&(e={load:e,original:e}),t===Ta.ResponseType.ARRAY_BUFFER){zp.fetchArrayBuffer(e.load,n,r,this.maxRetries);return}Ea.get(e.load,{responseType:t,retry:this.maxRetries>0,maxRetries:this.maxRetries},n)}_makeContext(e,t){let n=e&&typeof e==`object`?e.original:e,r=n?n.split(`?`)[0]:``;return{url:n??null,ext:n?i.getExtension(r).toLowerCase().replace(`.`,``):``,basename:n?i.getBasename(r).toLowerCase():``,asset:t,app:this._app}}_selectParser(e){for(let t=this._parsers.length-1;t>=0;t--)if(this._parsers[t].canParse(e))return this._parsers[t];return null}load(e,t,n){if(this._parsers.length===0)return;typeof e==`string`&&(e={load:e,original:e});let r=this._makeContext(e,n),i=this._selectParser(r);if(!i){t(`No parser found for resource: ${r.url}`);return}i.load(e,t,n)}open(e,t,n){if(this._parsers.length===0)return t;let r=this._selectParser(this._makeContext(e,n));return r?.open?r.open(e,t,n):t}patch(e,t){}},qp=class extends Kp{constructor(e){super(e,`bundle`),this._assets=e.assets}_fetchRetries(e,t,n=0){return new Promise((r,i)=>{let a=()=>{fetch(e,t).then(r).catch(e=>{n++,n<this.maxRetries?a():i(e)})};a()})}load(e,t){typeof e==`string`&&(e={load:e,original:e}),this._fetchRetries(e.load,{mode:`cors`},this.maxRetries).then(e=>{let n=new Wp;t(null,n);let r=new Gp(e,this._assets.prefix);r.on(`file`,e=>{n.addFile(e.name,e.data)}),r.on(`done`,()=>{n.loaded=!0}),r.on(`error`,e=>{t(e)})}).catch(e=>{t(e)})}open(e,t){return t}},Jp=class e{constructor(e){this._handlers={},this._requests={},this._cache={},this._app=e}addHandler(e,t){this._handlers[e]=t,t._loader=this}removeHandler(e){delete this._handlers[e]}getHandler(e){return this._handlers[e]}static makeKey(e,t){return`${e}-${t}`}load(t,n,r,i,a){let o=this._handlers[n];if(!o){r(`No resource handler for asset type: '${n}' when loading [${t}]`);return}if(!t){this._loadNull(o,r,i);return}let s=e.makeKey(t,n);if(this._cache[s]!==void 0)r(null,this._cache[s]);else if(this._requests[s])this._requests[s].push(r);else{this._requests[s]=[r];let e=this,n=function(t,n){if(t){e._onFailure(s,t);return}if(n.load instanceof DataView){if(o.openBinary){if(!e._requests[s])return;try{let t=o.openBinary(n.load);e._onSuccess(s,t)}catch(t){e._onFailure(s,t)}return}n.load=URL.createObjectURL(new Blob([n.load])),i&&(i.urlObject&&URL.revokeObjectURL(i.urlObject),i.urlObject=n.load)}o.load(n,(t,r,a)=>{if(e._requests[s]){if(t){e._onFailure(s,t);return}try{e._onSuccess(s,o.open(n.original,r,i),a)}catch(t){e._onFailure(s,t)}}},i)},c=t.split(`?`)[0];if(this._app.enableBundles&&this._app.bundles.hasUrl(c)&&!(a&&a.bundlesIgnore)){if(!this._app.bundles.urlIsLoadedOrLoading(c)){let e=this._app.bundles.listBundlesForAsset(i),t;a&&a.bundlesFilter&&(t=a.bundlesFilter(e)),t||(e?.sort((e,t)=>e.file.size-t.file.size),t=e?.[0]),t&&this._app.assets?.load(t)}this._app.bundles.loadUrl(c,(e,t)=>{n(e,{load:t,original:c})})}else n(null,{load:t,original:i&&i.file.filename||t})}}_loadNull(e,t,n){e.load(null,function(r,i,a){if(r)t(r);else try{t(null,e.open(null,i,n),a)}catch(e){t(e)}},n)}_onSuccess(e,t,n){t===null?delete this._cache[e]:this._cache[e]=t;for(let r=0;r<this._requests[e].length;r++)this._requests[e][r](null,t,n);delete this._requests[e]}_onFailure(e,t){if(console.error(`Failed to load resource [${e}]: ${t?.message??t}`,t),this._requests[e]){for(let n=0;n<this._requests[e].length;n++)this._requests[e][n](t);delete this._requests[e]}}open(e,t){let n=this._handlers[e];return n?n.open(null,t):(console.warn(`No resource handler found for: ${e}`),t)}patch(e,t){let n=this._handlers[e.type];if(!n){console.warn(`No resource handler found for: ${e.type}`);return}n.patch&&n.patch(e,t)}clearCache(t,n){let r=e.makeKey(t,n);delete this._cache[r]}getFromCache(t,n){let r=e.makeKey(t,n);if(this._cache[r])return this._cache[r]}enableRetry(e=5){e=Math.max(0,Math.floor(e))||0;for(let t in this._handlers)this._handlers[t].maxRetries=e}disableRetry(){for(let e in this._handlers)this._handlers[e].maxRetries=0}set maxConcurrentRequests(e){Ea.maxConcurrentRequests=Math.max(0,Math.floor(e))||0}get maxConcurrentRequests(){return Ea.maxConcurrentRequests}set withCredentials(e){Ea.withCredentials=!!e}get withCredentials(){return Ea.withCredentials}destroy(){this._handlers={},this._requests={},this._cache={},this._app=null}},Yp=class{_validate(e){if(!e.header)throw Error(`I18n#addData: Missing "header" field`);if(!e.header.version)throw Error(`I18n#addData: Missing "header.version" field`);if(e.header.version!==1)throw Error(`I18n#addData: Invalid "header.version" field`);if(!e.data)throw Error(`I18n#addData: Missing "data" field`);if(!Array.isArray(e.data))throw Error(`I18n#addData: "data" field must be an array`);for(let t=0,n=e.data.length;t<n;t++){let n=e.data[t];if(!n.info)throw Error(`I18n#addData: missing "data[${t}].info" field`);if(!n.info.locale)throw Error(`I18n#addData: missing "data[${t}].info.locale" field`);if(typeof n.info.locale!=`string`)throw Error(`I18n#addData: "data[${t}].info.locale" must be a string`);if(!n.messages)throw Error(`I18n#addData: missing "data[${t}].messages" field`)}}parse(e){return e.data}},Xp=class e extends b{constructor(e){super(),this.locale=Tp,this._translations={},this._availableLangs={},this._app=e,this._assets=[],this._parser=new Yp}set assets(e){let t={};for(let n=0,r=e.length;n<r;n++){let r=e[n]instanceof zp?e[n].id:e[n];t[r]=!0}let n=this._assets.length;for(;n--;){let e=this._assets[n];if(!t[e]){this._app.assets.off(`add:${e}`,this._onAssetAdd,this);let t=this._app.assets.get(e);t&&this._onAssetRemove(t),this._assets.splice(n,1)}}for(let e in t){let t=parseInt(e,10);if(this._assets.indexOf(t)!==-1)continue;this._assets.push(t);let n=this._app.assets.get(t);n?this._onAssetAdd(n):this._app.assets.once(`add:${t}`,this._onAssetAdd,this)}}get assets(){return this._assets}set locale(t){if(this._locale===t)return;let n=kp(t);if(n===`in`&&(n=`id`,t=Ap(t,n),this._locale===t))return;let r=this._locale;this._locale=t,this._lang=n,this._pluralFn=Np(this._lang),this.fire(e.EVENT_CHANGE,t,r)}get locale(){return this._locale}static findAvailableLocale(e,t){return jp(e,t)}findAvailableLocale(e){if(this._translations[e])return e;let t=kp(e);return this._findFallbackLocale(e,t)}getText(e,t){let n=e,r;t||(t=this._locale,r=this._lang);let i=this._translations[t];return i||(r||(r=kp(t)),t=this._findFallbackLocale(t,r),i=this._translations[t]),i&&i.hasOwnProperty(e)&&(n=i[e],Array.isArray(n)&&(n=n[0]),n??(n=e)),n}getPluralText(e,t,n){let r=e,i,a;n?(i=kp(n),a=Np(i)):(n=this._locale,i=this._lang,a=this._pluralFn);let o=this._translations[n];if(o||(n=this._findFallbackLocale(n,i),i=kp(n),a=Np(i),o=this._translations[n]),o&&o[e]&&a){let n=a(t);r=o[e][n],r??(r=e)}return r}addData(e){let t;try{t=this._parser.parse(e)}catch(e){console.error(`I18n.addData: failed to parse localization data: ${e?.message??e}`,e);return}for(let e=0,n=t.length;e<n;e++){let n=t[e],r=n.info.locale,i=n.messages;if(!this._translations[r]){this._translations[r]={};let e=kp(r);this._availableLangs[e]||(this._availableLangs[e]=r)}Object.assign(this._translations[r],i),this.fire(`data:add`,r,i)}}removeData(e){let t;try{t=this._parser.parse(e)}catch(e){console.error(`I18n.removeData: failed to parse localization data: ${e?.message??e}`,e);return}for(let e=0,n=t.length;e<n;e++){let n=t[e],r=n.info.locale,i=this._translations[r];if(!i)continue;let a=n.messages;for(let e in a)delete i[e];Object.keys(i).length===0&&(delete this._translations[r],delete this._availableLangs[kp(r)]),this.fire(`data:remove`,r,a)}}destroy(){this._translations=null,this._availableLangs=null,this._assets=null,this._parser=null,this.off()}_findFallbackLocale(e,t){let n=Ep[e];return n&&this._translations[n]||(n=Ep[t],n&&this._translations[n])||(n=this._availableLangs[t],n&&this._translations[n])?n:Tp}_onAssetAdd(e){e.on(`load`,this._onAssetLoad,this),e.on(`change`,this._onAssetChange,this),e.on(`remove`,this._onAssetRemove,this),e.on(`unload`,this._onAssetUnload,this),e.resource&&this._onAssetLoad(e)}_onAssetLoad(e){this.addData(e.resource)}_onAssetChange(e){e.resource&&this.addData(e.resource)}_onAssetRemove(e){e.off(`load`,this._onAssetLoad,this),e.off(`change`,this._onAssetChange,this),e.off(`remove`,this._onAssetRemove,this),e.off(`unload`,this._onAssetUnload,this),e.resource&&this.removeData(e.resource),this._app.assets.once(`add:${e.id}`,this._onAssetAdd,this)}_onAssetUnload(e){e.resource&&this.removeData(e.resource)}};v(Xp,`EVENT_CHANGE`,`change`);var Zp=`initialize`,Qp=`postInitialize`,$p=new Set(`system.entity.create.destroy.swap.move.data.scripts._scripts._scriptsIndex._scriptsData._declarationOrder.enabled._oldState.onEnable.onDisable.onPostStateChange._onSetEnabled._checkState._onBeforeRemove._onInitializeAttributes._onInitialize._onPostInitialize._onUpdate._onPostUpdate._callbacks._callbackActive.has.get.on.off.fire.once.hasEvent.worker`.split(`.`)),em=class extends b{constructor(e){super(),v(this,`app`,void 0),v(this,`entity`,void 0),v(this,`_enabled`,void 0),v(this,`_enabledOld`,void 0),v(this,`_initialized`,void 0),v(this,`_postInitialized`,void 0),v(this,`__destroyed`,void 0),v(this,`__scriptType`,void 0),v(this,`__executionOrder`,void 0),this.initScript(e)}set enabled(e){this._enabled=!!e,this.enabled!==this._enabledOld&&(this._enabledOld=this.enabled,this.fire(this.enabled?`enable`:`disable`),this.fire(`state`,this.enabled),!this._initialized&&this.enabled&&(this._initialized=!0,this.fire(`preInitialize`),this.initialize&&this.entity.script._scriptMethod(this,Zp)),this._initialized&&!this._postInitialized&&this.enabled&&!this.entity.script._beingEnabled&&(this._postInitialized=!0,this.postInitialize&&this.entity.script._scriptMethod(this,Qp)))}get enabled(){return this._enabled&&!this._destroyed&&this.entity.script.enabled&&this.entity.enabled}initScript(e){let t=this.constructor;this.app=e.app,this.entity=e.entity,this._enabled=typeof e.enabled!=`boolean`||e.enabled,this._enabledOld=this.enabled,this.__destroyed=!1,this.__scriptType=t,this.__executionOrder=-1}static set scriptName(e){this.__name=e}static get scriptName(){return this.__name}};v(em,`EVENT_ENABLE`,`enable`),v(em,`EVENT_DISABLE`,`disable`),v(em,`EVENT_STATE`,`state`),v(em,`EVENT_DESTROY`,`destroy`),v(em,`EVENT_ATTR`,`attr`),v(em,`EVENT_ERROR`,`error`),v(em,`__name`,null),v(em,`__getScriptName`,rm);var tm=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s\/]*)\s*/,nm=e=>e&&e[0].toLowerCase()+e.substring(1);function rm(e){if(typeof e!=`function`)return;if(Object.prototype.hasOwnProperty.call(e,`scriptName`)&&e.scriptName)return e.scriptName;if(`name`in Function.prototype)return e.name;if(e===Function||e===Function.prototype.constructor)return`Function`;let t=`${e}`.match(tm);return t?t[1]:void 0}function im(e){if(typeof e!=`function`)return;if(Object.prototype.hasOwnProperty.call(e,`__name`)&&e.__name)return e.__name;if(Object.prototype.hasOwnProperty.call(e,`scriptName`)&&e.scriptName)return e.scriptName;let t=rm(e);return t?nm(t):void 0}var am=class extends b{constructor(e){super(),v(this,`_scripts`,new Map),v(this,`_list`,[]),v(this,`_scriptSchemas`,new Map),this.app=e}destroy(){this.app=null,this.off()}addSchema(e,t){t&&this._scriptSchemas.set(e,t)}getSchema(e){return this._scriptSchemas.get(e)}add(e){let t=im(e);return!t||$p.has(t)?!1:(e.__name=t,this._scripts.has(t)?(setTimeout(()=>{if(e.prototype.swap){let n=this._scripts.get(t),r=this._list.indexOf(n);this._list[r]=e,this._scripts.set(t,e),this.fire(`swap`,t,e),this.fire(`swap:${t}`,e)}else console.warn(`script registry already has '${t}' script, define 'swap' method for new script type to enable code hot swapping`)}),!1):(this._scripts.set(t,e),this._list.push(e),this.fire(`add`,t,e),this.fire(`add:${t}`,e),setTimeout(()=>{if(!this._scripts.has(t)||!this.app||!this.app.systems||!this.app.systems.script)return;let e=this.app.systems.script._components,n=[],r=[];for(e.loopIndex=0;e.loopIndex<e.length;e.loopIndex++){let r=e.items[e.loopIndex],i=r._scriptsIndex[t];if(i&&i.awaiting){let e=r.create(t,{preloading:!0,ind:r._awaitingInsertIndex(t),enabled:i.enabled,attributes:i.attributes,properties:i.properties});e&&n.push(e);for(let e of r.scripts)r.initializeAttributes(e)}}for(let e=0;e<n.length;e++)n[e].enabled&&(n[e]._initialized=!0,r.push(n[e]),n[e].initialize&&n[e].initialize());for(let e=0;e<r.length;e++)r[e].enabled&&!r[e]._postInitialized&&(r[e]._postInitialized=!0,r[e].postInitialize&&r[e].postInitialize())}),!0))}remove(e){let t=e,n=e;if(typeof n==`string`?t=this.get(n):n=t.__name,this.get(n)!==t)return!1;this._scripts.delete(n);let r=this._list.indexOf(t);return this._list.splice(r,1),this.fire(`remove`,n,t),this.fire(`remove:${n}`,t),!0}get(e){return this._scripts.get(e)||null}has(e){if(typeof e==`string`)return this._scripts.has(e);if(!e)return!1;let t=e.__name;return this._scripts.get(t)===e}list(){return this._list}},om=(e,t)=>e.constructor.order-t.constructor.order,sm=e=>e.sort(om),cm=[],lm=[],um=()=>lm.pop()??[],dm=e=>{e.length=0,lm.push(e)},fm=class e extends ys{constructor(e,t=yp()){super(e),v(this,`anim`,void 0),v(this,`animation`,void 0),v(this,`audiolistener`,void 0),v(this,`button`,void 0),v(this,`camera`,void 0),v(this,`collision`,void 0),v(this,`element`,void 0),v(this,`gsplat`,void 0),v(this,`joint`,void 0),v(this,`layoutchild`,void 0),v(this,`layoutgroup`,void 0),v(this,`light`,void 0),v(this,`model`,void 0),v(this,`particlesystem`,void 0),v(this,`render`,void 0),v(this,`rigidbody`,void 0),v(this,`screen`,void 0),v(this,`script`,void 0),v(this,`scrollbar`,void 0),v(this,`scrollview`,void 0),v(this,`sound`,void 0),v(this,`sprite`,void 0),v(this,`c`,{}),v(this,`_app`,void 0),v(this,`_destroying`,!1),v(this,`_guid`,null),v(this,`_template`,!1),this._app=t}addComponent(e,t){let n=this._app.systems[e];return!n||this.c[e]?null:n.addComponent(this,t)}removeComponent(e){let t=this._app.systems[e];t&&this.c[e]&&t.removeComponent(this)}findComponent(e){let t=this.findOne(t=>t.c?.[e]);return t&&t.c[e]}findComponents(e){return this.find(t=>t.c?.[e]).map(t=>t.c[e])}findScript(e){return this.findOne(t=>t.c?.script?.has(e))?.c.script.get(e)}findScripts(e){return this.find(t=>t.c?.script?.has(e)).map(t=>t.c.script.get(e))}set guid(e){let t=this._app._entityIndex;this._guid&&delete t[this._guid],this._guid=e,t[this._guid]=this}get guid(){return this._guid||(this.guid=r.create()),this._guid}getGuid(){return this.guid}setGuid(e){this.guid=e}_notifyHierarchyStateChanged(e,t){let n=!1;e===this&&cm.length===0&&(n=!0),e._beingEnabled=!0,e._onHierarchyStateChanged(t),e._onHierarchyStatePostChanged&&cm.push(e);let r=e._children;for(let e=0,n=r.length;e<n;e++)r[e]._enabled&&this._notifyHierarchyStateChanged(r[e],t);if(e._beingEnabled=!1,n){for(let e=0;e<cm.length;e++)cm[e]._onHierarchyStatePostChanged();cm.length=0}}_onHierarchyStateChanged(e){super._onHierarchyStateChanged(e);let t=this._getSortedComponents();for(let n=0;n<t.length;n++){let r=t[n];r.enabled&&(e?r.onEnable():r.onDisable())}dm(t)}_onHierarchyStatePostChanged(){let e=this._getSortedComponents();for(let t=0;t<e.length;t++)e[t].onPostStateChange();dm(e)}findByGuid(e){if(this._guid===e)return this;let t=this._app._entityIndex[e];return t&&(t===this||t.isDescendantOf(this))?t:null}destroy(){this._destroying=!0;for(let e in this.c)this.c[e].enabled=!1;for(let e in this.c)this.c[e].system.removeComponent(this);super.destroy(),this._guid&&delete this._app._entityIndex[this._guid],this._destroying=!1}clone(){let e={},t=this._cloneRecursively(e);return e[this.guid]=t,pm(this,this,t,e),t}_getSortedComponents(){let e=this.c,t=um(),n=0;for(let r in e)if(e.hasOwnProperty(r)){let i=e[r];n|=i.constructor.order!==0,t.push(i)}return n&&t.length>1&&sm(t),t}_cloneRecursively(t){let n=new this.constructor(void 0,this._app);super._cloneInternal(n);for(let e in this.c)this.c[e].system.cloneComponent(this,n);for(let r=0;r<this._children.length;r++){let i=this._children[r];if(i instanceof e){let e=i._cloneRecursively(t);n.addChild(e),t[i.guid]=e}}return n}};v(fm,`EVENT_DESTROY`,`destroy`);function pm(e,t,n,r){if(t instanceof fm){let i=t.c;for(let t in i){let a=i[t],o=a.system.getPropertiesOfType(`entity`);for(let i=0,s=o.length;i<s;i++){let s=o[i].name,c=a[s];if(e.findByGuid(c)){let e=r[c].guid;e&&(n.c[t][s]=e)}}}i.script&&n.script.resolveDuplicatedEntityReferenceProperties(i.script,r),i.render&&n.render.resolveDuplicatedEntityReferenceProperties(i.render,r),i.button&&n.button.resolveDuplicatedEntityReferenceProperties(i.button,r),i.joint&&n.joint.resolveDuplicatedEntityReferenceProperties(i.joint,r),i.scrollview&&n.scrollview.resolveDuplicatedEntityReferenceProperties(i.scrollview,r),i.scrollbar&&n.scrollbar.resolveDuplicatedEntityReferenceProperties(i.scrollbar,r),i.anim&&n.anim.resolveDuplicatedEntityReferenceProperties(i.anim,r);let a=t.children.filter(e=>e instanceof fm),o=n.children.filter(e=>e instanceof fm);for(let t=0,n=a.length;t<n;t++)pm(e,a[t],o[t],r)}}var mm=class{constructor(e,t){v(this,`name`,void 0),v(this,`url`,void 0),v(this,`data`,null),v(this,`_loading`,!1),v(this,`_onLoadedCallbacks`,[]),this.name=e,this.url=t}get loaded(){return!!this.data}get loading(){return this._loading}},hm=class{constructor(e){v(this,`_app`,void 0),v(this,`_list`,[]),v(this,`_index`,{}),v(this,`_urlIndex`,{}),this._app=e}destroy(){this._app=null}list(){return this._list}add(e,t){if(this._index.hasOwnProperty(e))return!1;let n=new mm(e,t),r=this._list.push(n);return this._index[n.name]=r-1,this._urlIndex[n.url]=r-1,!0}find(e){return this._index.hasOwnProperty(e)?this._list[this._index[e]]:null}findByUrl(e){return this._urlIndex.hasOwnProperty(e)?this._list[this._urlIndex[e]]:null}remove(e){if(this._index.hasOwnProperty(e)){let t=this._index[e],n=this._list[t];delete this._urlIndex[n.url],delete this._index[e],this._list.splice(t,1);for(let e=0;e<this._list.length;e++)n=this._list[e],this._index[n.name]=e,this._urlIndex[n.url]=e}}_loadSceneData(e,t,n){let r=this._app,a=e;if(typeof e==`string`&&(e=this.findByUrl(a)||this.find(a)||new mm(`Untitled`,a)),a=e.url,!a){n(`Cannot find scene to load`);return}if(e.loaded){n(null,e);return}r.assets&&r.assets.prefix&&!Pp.test(a)&&(a=i.join(r.assets.prefix,a)),e._onLoadedCallbacks.push(n),e._loading||r.loader.getHandler(`hierarchy`).load(a,(n,r)=>{e.data=r,e._loading=!1;for(let t=0;t<e._onLoadedCallbacks.length;t++)e._onLoadedCallbacks[t](n,e);t||(e.data=null),e._onLoadedCallbacks.length=0}),e._loading=!0}loadSceneData(e,t){this._loadSceneData(e,!0,t)}unloadSceneData(e){typeof e==`string`&&(e=this.findByUrl(e)),e&&(e.data=null)}_loadSceneHierarchy(e,t,n){this._loadSceneData(e,!1,(e,r)=>{if(e){n&&n(e);return}t&&t(r);let i=this._app;i._preloadScripts(r.data,()=>{let e=i.loader.getHandler(`hierarchy`);i.systems.script.preloading=!0;let t=e.open(r.url,r.data);i.systems.script.preloading=!1,i.loader.clearCache(r.url,`hierarchy`),i.root.addChild(t),i.systems.fire(`initialize`,t),i.systems.fire(`postInitialize`,t),i.systems.fire(`postPostInitialize`,t),n&&n(null,t)})})}loadSceneHierarchy(e,t){this._loadSceneHierarchy(e,null,t)}loadSceneSettings(e,t){this._loadSceneData(e,!1,(e,n)=>{e?t&&t(e):(this._app.applySceneSettings(n.data.settings),t&&t(null))})}changeScene(e,t){let n=this._app;this._loadSceneHierarchy(e,e=>{let{children:t}=n.root;for(;t.length;)t[0].destroy();n.applySceneSettings(e.data.settings)},t)}loadScene(e,t){let n=this._app,r=n.loader.getHandler(`scene`);n.assets&&n.assets.prefix&&!Pp.test(e)&&(e=i.join(n.assets.prefix,e)),r.load(e,(i,a)=>{i?t&&t(i):n._preloadScripts(a,()=>{n.systems.script.preloading=!0;let i=r.open(e,a),o=this.findByUrl(e);o&&!o.loaded&&(o.data=a),n.systems.script.preloading=!1,n.loader.clearCache(e,`scene`),n.loader.patch({resource:i,type:`scene`},n.assets),n.root.addChild(i.root),n.systems.rigidbody&&n.systems.rigidbody.gravity.set(i._gravity.x,i._gravity.y,i._gravity.z),t&&t(null,i)})})}},gm=class{constructor(e){v(this,`_app`,void 0),this._app=e;let t=e.graphicsDevice;this.frame={fps:0,ms:0,dt:0,updateStart:0,updateTime:0,renderStart:0,renderTime:0,physicsStart:0,physicsTime:0,scriptUpdateStart:0,scriptUpdate:0,scriptPostUpdateStart:0,scriptPostUpdate:0,animUpdateStart:0,animUpdate:0,cullTime:0,sortTime:0,skinTime:0,morphTime:0,instancingTime:0,triangles:0,gsplats:0,gsplatSort:0,gsplatBufferCopy:0,otherPrimitives:0,shaders:0,materials:0,cameras:0,shadowMapUpdates:0,shadowMapTime:0,depthMapTime:0,forwardTime:0,lightClustersTime:0,lightClusters:0,_timeToCountFrames:0,_fpsAccum:0},this.drawCalls={forward:0,depth:0,shadow:0,immediate:0,misc:0,total:0,skinned:0,instanced:0,removedByInstancing:0},this.misc={renderTargetCreationTime:0},this.particles={updatesPerFrame:0,_updatesPerFrame:0,frameTime:0,_frameTime:0},this.shaders=t._shaderStats,this.vram=t._vram,this.gpu=t.gpuProfiler?.passTimings??new Map,Object.defineProperty(this.vram,"totalUsed",{get:function(){return this.tex+this.vb+this.ib+this.ub+this.sb}}),Object.defineProperty(this.vram,"geom",{get:function(){return this.vb+this.ib}}),Object.defineProperty(this.vram,"buffers",{get:function(){return this.ub+this.sb}})}get scene(){return this._app.scene._stats}get lightmapper(){return this._app.lightmapper?.stats}get batcher(){let e=this._app._batcher;return e?e._stats:null}updateBasic(e,t,n,r,i){let a=this.frame;a.dt=t,a.ms=n,e>a._timeToCountFrames?(a.fps=a._fpsAccum,a._fpsAccum=0,a._timeToCountFrames=e+1e3):a._fpsAccum++,this.drawCalls.total=i._drawCallsPerFrame,i._drawCallsPerFrame=0,a.gsplats=r._gsplatCount,a.gsplatBufferCopy=r._gsplatBufferCopy??0}updateDetailed(e,t){let n=this.frame;n.cameras=e._camerasRendered,n.materials=e._materialSwitches,n.shaders=t._shaderSwitchesPerFrame,n.shadowMapUpdates=e._shadowMapUpdates,n.shadowMapTime=e._shadowMapTime,n.depthMapTime=e._depthMapTime,n.forwardTime=e._forwardTime;let r=t._primsPerFrame;n.triangles=r[4]/3+Math.max(r[5]-2,0)+Math.max(r[6]-2,0),n.cullTime=e._cullTime,n.sortTime=e._sortTime,n.skinTime=e._skinTime,n.morphTime=e._morphTime,n.lightClusters=e._lightClusters,n.lightClustersTime=e._lightClustersTime,n.otherPrimitives=0;for(let e=0;e<r.length;e++)e<4&&(n.otherPrimitives+=r[e]),r[e]=0;e._camerasRendered=0,e._materialSwitches=0,e._shadowMapUpdates=0,t._shaderSwitchesPerFrame=0,e._cullTime=0,e._layerCompositionUpdateTime=0,e._lightClustersTime=0,e._sortTime=0,e._skinTime=0,e._morphTime=0,e._shadowMapTime=0,e._depthMapTime=0,e._forwardTime=0,n=this.drawCalls,n.forward=e._forwardDrawCalls,n.culled=e._numDrawCallsCulled,n.depth=0,n.shadow=e._shadowDrawCalls,n.skinned=e._skinDrawCalls,n.immediate=0,n.instanced=0,n.removedByInstancing=0,n.misc=n.total-(n.forward+n.shadow),e._depthDrawCalls=0,e._shadowDrawCalls=0,e._forwardDrawCalls=0,e._numDrawCallsCulled=0,e._skinDrawCalls=0,e._immediateRendered=0,e._instancedDrawCalls=0,this.misc.renderTargetCreationTime=t.renderTargetCreationTime,n=this.particles,n.updatesPerFrame=n._updatesPerFrame,n.frameTime=n._frameTime,n._updatesPerFrame=0,n._frameTime=0}frameEnd(){this.frame.gsplatSort=0}},_m={alphaTestPS:`
uniform float alpha_ref;
void alphaTest(float a) {
	if (a < alpha_ref) discard;
}
`,ambientPS:`
#ifdef LIT_AMBIENT_SOURCE == AMBIENTSH
	uniform vec3 ambientSH[9];
#endif
#if LIT_AMBIENT_SOURCE == ENVALATLAS
	#include "envAtlasPS"
	#ifndef ENV_ATLAS
	#define ENV_ATLAS
		uniform sampler2D texture_envAtlas;
	#endif
#endif
void addAmbient(vec3 worldNormal) {
	#ifdef LIT_AMBIENT_SOURCE == AMBIENTSH
		vec3 n = cubeMapRotate(worldNormal);
		vec3 color =
			ambientSH[0] +
			ambientSH[1] * n.x +
			ambientSH[2] * n.y +
			ambientSH[3] * n.z +
			ambientSH[4] * n.x * n.z +
			ambientSH[5] * n.z * n.y +
			ambientSH[6] * n.y * n.x +
			ambientSH[7] * (3.0 * n.z * n.z - 1.0) +
			ambientSH[8] * (n.x * n.x - n.y * n.y);
		dDiffuseLight += processEnvironment(max(color, vec3(0.0)));
	#endif
	#if LIT_AMBIENT_SOURCE == ENVALATLAS
		vec3 dir = normalize(cubeMapRotate(worldNormal) * vec3(-1.0, 1.0, 1.0));
		vec2 uv = mapUv(toSphericalUv(dir), vec4(128.0, 256.0 + 128.0, 64.0, 32.0) / atlasSize);
		vec4 raw = texture2D(texture_envAtlas, uv);
		vec3 linear = {ambientDecode}(raw);
		dDiffuseLight += processEnvironment(linear);
	#endif
	#if LIT_AMBIENT_SOURCE == CONSTANT
		dDiffuseLight += light_globalAmbient;
	#endif
}
`,anisotropyPS:`
#ifdef LIT_GGX_SPECULAR
	uniform float material_anisotropyIntensity;
	uniform vec2 material_anisotropyRotation;
#endif
void getAnisotropy() {
	dAnisotropy = 0.0;
	dAnisotropyRotation = vec2(1.0, 0.0);
#ifdef LIT_GGX_SPECULAR
	dAnisotropy = material_anisotropyIntensity;
	dAnisotropyRotation = material_anisotropyRotation;
#endif
	#ifdef STD_ANISOTROPY_TEXTURE
	vec3 anisotropyTex = texture2DBias({STD_ANISOTROPY_TEXTURE_NAME}, {STD_ANISOTROPY_TEXTURE_UV}, textureBias).rgb;
	dAnisotropy *= anisotropyTex.b;
	vec2 anisotropyRotationFromTex = anisotropyTex.rg * 2.0 - vec2(1.0);
	mat2 rotationMatrix = mat2(dAnisotropyRotation.x, dAnisotropyRotation.y, -dAnisotropyRotation.y, dAnisotropyRotation.x);
	dAnisotropyRotation = rotationMatrix * anisotropyRotationFromTex;
	#endif
	
	dAnisotropy = clamp(dAnisotropy, 0.0, 1.0);
}
`,aoPS:`
#if defined(STD_AO_TEXTURE) || defined(STD_AO_VERTEX)
	uniform float material_aoIntensity;
#endif
#ifdef STD_AODETAIL_TEXTURE
	#include "detailModesPS"
#endif
void getAO() {
	dAo = 1.0;
	#ifdef STD_AO_TEXTURE
		float aoBase = texture2DBias({STD_AO_TEXTURE_NAME}, {STD_AO_TEXTURE_UV}, textureBias).{STD_AO_TEXTURE_CHANNEL};
		#ifdef STD_AODETAIL_TEXTURE
			float aoDetail = texture2DBias({STD_AODETAIL_TEXTURE_NAME}, {STD_AODETAIL_TEXTURE_UV}, textureBias).{STD_AODETAIL_TEXTURE_CHANNEL};
			aoBase = detailMode_{STD_AODETAIL_DETAILMODE}(vec3(aoBase), vec3(aoDetail)).r;
		#endif
		dAo *= aoBase;
	#endif
	#ifdef STD_AO_VERTEX
		dAo *= saturate(vVertexColor.{STD_AO_VERTEX_CHANNEL});
	#endif
	#if defined(STD_AO_TEXTURE) || defined(STD_AO_VERTEX)
		dAo = mix(1.0, dAo, material_aoIntensity);
	#endif
}
`,aoDiffuseOccPS:`
void occludeDiffuse(float ao) {
	dDiffuseLight *= ao;
}
`,aoSpecOccPS:`
#if LIT_OCCLUDE_SPECULAR != NONE
	#ifdef LIT_OCCLUDE_SPECULAR_FLOAT
		uniform float material_occludeSpecularIntensity;
	#endif
#endif
void occludeSpecular(float gloss, float ao, vec3 worldNormal, vec3 viewDir) {
	#if LIT_OCCLUDE_SPECULAR == AO
		#ifdef LIT_OCCLUDE_SPECULAR_FLOAT
			float specOcc = mix(1.0, ao, material_occludeSpecularIntensity);
		#else
			float specOcc = ao;
		#endif
	#endif
	#if LIT_OCCLUDE_SPECULAR == GLOSSDEPENDENT
		float specPow = exp2(gloss * 11.0);
		float specOcc = saturate(pow(dot(worldNormal, viewDir) + ao, 0.01 * specPow) - 1.0 + ao);
		#ifdef LIT_OCCLUDE_SPECULAR_FLOAT
			specOcc = mix(1.0, specOcc, material_occludeSpecularIntensity);
		#endif
	#endif
	#if LIT_OCCLUDE_SPECULAR != NONE
		dSpecularLight *= specOcc;
		dReflection *= specOcc;
		#ifdef LIT_SHEEN
			sSpecularLight *= specOcc;
			sReflection *= specOcc;
		#endif
	#endif
}
`,bakeDirLmEndPS:`
	vec4 dirLm = texture2D(texture_dirLightMap, vUv1);
	if (bakeDir > 0.5) {
		if (dAtten > 0.00001) {
			dirLm.xyz = dirLm.xyz * 2.0 - vec3(1.0);
			dAtten = saturate(dAtten);
			gl_FragColor.rgb = normalize(dLightDirNormW.xyz*dAtten + dirLm.xyz*dirLm.w) * 0.5 + vec3(0.5);
			gl_FragColor.a = dirLm.w + dAtten;
			gl_FragColor.a = max(gl_FragColor.a, 1.0 / 255.0);
		} else {
			gl_FragColor = dirLm;
		}
	} else {
		gl_FragColor.rgb = dirLm.xyz;
		gl_FragColor.a = max(dirLm.w, dAtten > 0.00001 ? (1.0/255.0) : 0.0);
	}
`,bakeLmEndPS:`
#ifdef LIT_LIGHTMAP_BAKING_ADD_AMBIENT
	dDiffuseLight = ((dDiffuseLight - 0.5) * max(ambientBakeOcclusionContrast + 1.0, 0.0)) + 0.5;
	dDiffuseLight += vec3(ambientBakeOcclusionBrightness);
	dDiffuseLight = saturate(dDiffuseLight);
	dDiffuseLight *= dAmbientLight;
#endif
#ifdef LIGHTMAP_RGBM
	gl_FragColor.rgb = dDiffuseLight;
	gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(0.5));
	gl_FragColor.rgb /= 8.0;
	gl_FragColor.a = clamp( max( max( gl_FragColor.r, gl_FragColor.g ), max( gl_FragColor.b, 1.0 / 255.0 ) ), 0.0,1.0 );
	gl_FragColor.a = ceil(gl_FragColor.a * 255.0) / 255.0;
	gl_FragColor.rgb /= gl_FragColor.a;
#else
	gl_FragColor = vec4(dDiffuseLight, 1.0);
#endif
`,basePS:`
uniform vec3 view_position;
uniform vec3 light_globalAmbient;
float square(float x) {
	return x*x;
}
float saturate(float x) {
	return clamp(x, 0.0, 1.0);
}
vec3 saturate(vec3 x) {
	return clamp(x, vec3(0.0), vec3(1.0));
}
`,baseNineSlicedPS:`
#define NINESLICED
varying vec2 vMask;
varying vec2 vTiledUv;
uniform mediump vec4 innerOffset;
uniform mediump vec2 outerScale;
uniform mediump vec4 atlasRect;
vec2 nineSlicedUv;
`,baseNineSlicedTiledPS:`
#define NINESLICED
#define NINESLICETILED
varying vec2 vMask;
varying vec2 vTiledUv;
uniform mediump vec4 innerOffset;
uniform mediump vec2 outerScale;
uniform mediump vec4 atlasRect;
vec2 nineSlicedUv;
`,bayerPS:`
float bayer2(vec2 p) {
	return mod(2.0 * p.y + p.x + 1.0, 4.0);
}
float bayer4(vec2 p) {
	vec2 p1 = mod(p, 2.0);
	vec2 p2 = floor(0.5 * mod(p, 4.0));
	return 4.0 * bayer2(p1) + bayer2(p2);
}
float bayer8(vec2 p) {
	vec2 p1 = mod(p, 2.0);
	vec2 p2 = floor(0.5 * mod(p, 4.0));
	vec2 p4 = floor(0.25 * mod(p, 8.0));
	return 4.0 * (4.0 * bayer2(p1) + bayer2(p2)) + bayer2(p4);
}
float bayer16(vec2 p) {
	vec2 p1 = mod(p, 2.0);
	vec2 p2 = floor(0.5 * mod(p, 4.0));
	vec2 p4 = floor(0.25 * mod(p, 8.0));
	vec2 p8 = floor(0.125 * mod(p, 16.0));
	return 4.0 * (4.0 * (4.0 * bayer2(p1) + bayer2(p2)) + bayer2(p4)) + bayer2(p8);
}
`,blurVSMPS:`
varying vec2 vUv0;
uniform sampler2D source;
uniform vec2 pixelOffset;
#ifdef GAUSS
	uniform float weight[{SAMPLES}];
#endif
void main(void) {
	vec3 moments = vec3(0.0);
	vec2 uv = vUv0 - pixelOffset * (float({SAMPLES}) * 0.5);
	for (int i = 0; i < {SAMPLES}; i++) {
		vec4 c = texture2D(source, uv + pixelOffset * float(i));
		#ifdef GAUSS
			moments += c.xyz * weight[i];
		#else
			moments += c.xyz;
		#endif
	}
	#ifndef GAUSS
		moments *= 1.0 / float({SAMPLES});
	#endif
	gl_FragColor = vec4(moments.x, moments.y, moments.z, 1.0);
}
`,clearCoatPS:`
uniform float material_clearCoat;
void getClearCoat() {
	ccSpecularity = material_clearCoat;
	#ifdef STD_CLEARCOAT_TEXTURE
	ccSpecularity *= texture2DBias({STD_CLEARCOAT_TEXTURE_NAME}, {STD_CLEARCOAT_TEXTURE_UV}, textureBias).{STD_CLEARCOAT_TEXTURE_CHANNEL};
	#endif
	#ifdef STD_CLEARCOAT_VERTEX
	ccSpecularity *= saturate(vVertexColor.{STD_CLEARCOAT_VERTEX_CHANNEL});
	#endif
}
`,clearCoatGlossPS:`
uniform float material_clearCoatGloss;
void getClearCoatGlossiness() {
	ccGlossiness = material_clearCoatGloss;
	#ifdef STD_CLEARCOATGLOSS_TEXTURE
	ccGlossiness *= texture2DBias({STD_CLEARCOATGLOSS_TEXTURE_NAME}, {STD_CLEARCOATGLOSS_TEXTURE_UV}, textureBias).{STD_CLEARCOATGLOSS_TEXTURE_CHANNEL};
	#endif
	#ifdef STD_CLEARCOATGLOSS_VERTEX
	ccGlossiness *= saturate(vVertexColor.{STD_CLEARCOATGLOSS_VERTEX_CHANNEL});
	#endif
	#ifdef STD_CLEARCOATGLOSS_INVERT
	ccGlossiness = 1.0 - ccGlossiness;
	#endif
	ccGlossiness += 0.0000001;
}
`,clearCoatNormalPS:`
#ifdef STD_CLEARCOATNORMAL_TEXTURE
uniform float material_clearCoatBumpiness;
#endif
void getClearCoatNormal() {
#ifdef STD_CLEARCOATNORMAL_TEXTURE
	vec3 normalMap = {STD_CLEARCOATNORMAL_TEXTURE_DECODE}(texture2DBias({STD_CLEARCOATNORMAL_TEXTURE_NAME}, {STD_CLEARCOATNORMAL_TEXTURE_UV}, textureBias));
	normalMap = mix(vec3(0.0, 0.0, 1.0), normalMap, material_clearCoatBumpiness);
	ccNormalW = normalize(dTBN * normalMap);
#else
	ccNormalW = dVertexNormalW;
#endif
}
`,clusteredLightCookiesPS:`
vec3 _getCookieClustered(TEXTURE_ACCEPT(tex), vec2 uv, float intensity, vec4 cookieChannel) {
	vec4 pixel = mix(vec4(1.0), texture2DLod(tex, uv, 0.0), intensity);
	bool isRgb = dot(cookieChannel.rgb, vec3(1.0)) == 3.0;
	return isRgb ? pixel.rgb : vec3(dot(pixel, cookieChannel));
}
vec3 getCookie2DClustered(TEXTURE_ACCEPT(tex), mat4 transform, vec3 worldPosition, float intensity, vec4 cookieChannel) {
	vec4 projPos = transform * vec4(worldPosition, 1.0);
	return _getCookieClustered(TEXTURE_PASS(tex), projPos.xy / projPos.w, intensity, cookieChannel);
}
vec3 getCookieCubeClustered(TEXTURE_ACCEPT(tex), vec3 dir, float intensity, vec4 cookieChannel, float shadowTextureResolution, float shadowEdgePixels, vec3 omniAtlasViewport) {
	vec2 uv = getCubemapAtlasCoordinates(omniAtlasViewport, shadowEdgePixels, shadowTextureResolution, dir);
	return _getCookieClustered(TEXTURE_PASS(tex), uv, intensity, cookieChannel);
}
`,clusteredLightShadowsPS:`
vec3 _getShadowCoordPerspZbuffer(mat4 shadowMatrix, vec4 shadowParams, vec3 wPos) {
	vec4 projPos = shadowMatrix * vec4(wPos, 1.0);
	projPos.xyz /= projPos.w;
	return projPos.xyz;
}
vec3 getShadowCoordPerspZbufferNormalOffset(mat4 shadowMatrix, vec4 shadowParams, vec3 normal) {
	vec3 wPos = vPositionW + normal * shadowParams.y;
	return _getShadowCoordPerspZbuffer(shadowMatrix, shadowParams, wPos);
}
vec3 normalOffsetPointShadow(vec4 shadowParams, vec3 lightPos, vec3 lightDir, vec3 lightDirNorm, vec3 normal) {
	float distScale = length(lightDir);
	vec3 wPos = vPositionW + normal * shadowParams.y * clamp(1.0 - dot(normal, -lightDirNorm), 0.0, 1.0) * distScale;
	vec3 dir = wPos - lightPos;
	return dir;
}
#if defined(CLUSTER_SHADOW_TYPE_PCF1)
float getShadowOmniClusteredPCF1(SHADOWMAP_ACCEPT(shadowMap), vec4 shadowParams, vec3 omniAtlasViewport, float shadowEdgePixels, vec3 lightDir) {
	float shadowTextureResolution = shadowParams.x;
	vec2 uv = getCubemapAtlasCoordinates(omniAtlasViewport, shadowEdgePixels, shadowTextureResolution, lightDir);
	float shadowZ = length(lightDir) * shadowParams.w + shadowParams.z;
	return textureShadow(shadowMap, vec3(uv, shadowZ));
}
#endif
#if defined(CLUSTER_SHADOW_TYPE_PCF3)
float getShadowOmniClusteredPCF3(SHADOWMAP_ACCEPT(shadowMap), vec4 shadowParams, vec3 omniAtlasViewport, float shadowEdgePixels, vec3 lightDir) {
	float shadowTextureResolution = shadowParams.x;
	vec2 uv = getCubemapAtlasCoordinates(omniAtlasViewport, shadowEdgePixels, shadowTextureResolution, lightDir);
	float shadowZ = length(lightDir) * shadowParams.w + shadowParams.z;
	vec3 shadowCoord = vec3(uv, shadowZ);
	return getShadowPCF3x3(SHADOWMAP_PASS(shadowMap), shadowCoord, shadowParams);
}
#endif
#if defined(CLUSTER_SHADOW_TYPE_PCF5)
float getShadowOmniClusteredPCF5(SHADOWMAP_ACCEPT(shadowMap), vec4 shadowParams, vec3 omniAtlasViewport, float shadowEdgePixels, vec3 lightDir) {
	float shadowTextureResolution = shadowParams.x;
	vec2 uv = getCubemapAtlasCoordinates(omniAtlasViewport, shadowEdgePixels, shadowTextureResolution, lightDir);
	float shadowZ = length(lightDir) * shadowParams.w + shadowParams.z;
	vec3 shadowCoord = vec3(uv, shadowZ);
	return getShadowPCF5x5(SHADOWMAP_PASS(shadowMap), shadowCoord, shadowParams);
}
#endif
#if defined(CLUSTER_SHADOW_TYPE_PCF1)
float getShadowSpotClusteredPCF1(SHADOWMAP_ACCEPT(shadowMap), vec3 shadowCoord, vec4 shadowParams) {
	return textureShadow(shadowMap, shadowCoord);
}
#endif
#if defined(CLUSTER_SHADOW_TYPE_PCF3)
float getShadowSpotClusteredPCF3(SHADOWMAP_ACCEPT(shadowMap), vec3 shadowCoord, vec4 shadowParams) {
	return getShadowSpotPCF3x3(SHADOWMAP_PASS(shadowMap), shadowCoord, shadowParams);
}
#endif
#if defined(CLUSTER_SHADOW_TYPE_PCF5)
float getShadowSpotClusteredPCF5(SHADOWMAP_ACCEPT(shadowMap), vec3 shadowCoord, vec4 shadowParams) {
	return getShadowPCF5x5(SHADOWMAP_PASS(shadowMap), shadowCoord, shadowParams);
}
#endif
`,clusteredLightUtilsPS:`
vec2 getCubemapFaceCoordinates(const vec3 dir, out float faceIndex, out vec2 tileOffset)
{
	vec3 vAbs = abs(dir);
	float ma;
	vec2 uv;
	if (vAbs.z >= vAbs.x && vAbs.z >= vAbs.y) {
		faceIndex = dir.z < 0.0 ? 5.0 : 4.0;
		ma = 0.5 / vAbs.z;
		uv = vec2(dir.z < 0.0 ? -dir.x : dir.x, -dir.y);
		tileOffset.x = 2.0;
		tileOffset.y = dir.z < 0.0 ? 1.0 : 0.0;
	} else if(vAbs.y >= vAbs.x) {
		faceIndex = dir.y < 0.0 ? 3.0 : 2.0;
		ma = 0.5 / vAbs.y;
		uv = vec2(dir.x, dir.y < 0.0 ? -dir.z : dir.z);
		tileOffset.x = 1.0;
		tileOffset.y = dir.y < 0.0 ? 1.0 : 0.0;
	} else {
		faceIndex = dir.x < 0.0 ? 1.0 : 0.0;
		ma = 0.5 / vAbs.x;
		uv = vec2(dir.x < 0.0 ? dir.z : -dir.z, -dir.y);
		tileOffset.x = 0.0;
		tileOffset.y = dir.x < 0.0 ? 1.0 : 0.0;
	}
	return uv * ma + 0.5;
}
vec2 getCubemapAtlasCoordinates(const vec3 omniAtlasViewport, float shadowEdgePixels, float shadowTextureResolution, const vec3 dir) {
	float faceIndex;
	vec2 tileOffset;
	vec2 uv = getCubemapFaceCoordinates(dir, faceIndex, tileOffset);
	float atlasFaceSize = omniAtlasViewport.z;
	float tileSize = shadowTextureResolution * atlasFaceSize;
	float offset = shadowEdgePixels / tileSize;
	uv = uv * vec2(1.0 - offset * 2.0) + vec2(offset * 1.0);
	uv *= atlasFaceSize;
	uv += tileOffset * atlasFaceSize;
	uv += omniAtlasViewport.xy;
	return uv;
}
`,clusteredLightPS:`
#include "lightBufferDefinesPS"
#include "clusteredLightUtilsPS"
#ifdef CLUSTER_COOKIES
	#include "clusteredLightCookiesPS"
#endif
#ifdef CLUSTER_SHADOWS
	#include "clusteredLightShadowsPS"
#endif
uniform highp usampler2D clusterWorldTexture;
uniform highp sampler2D lightsTexture;
#ifdef CLUSTER_SHADOWS
	uniform sampler2DShadow shadowAtlasTexture;
#endif
#ifdef CLUSTER_COOKIES
	uniform sampler2D cookieAtlasTexture;
#endif
uniform int clusterMaxCells;
uniform int numClusteredLights;
uniform int clusterTextureWidth;
uniform vec3 clusterCellsCountByBoundsSize;
uniform vec3 clusterBoundsMin;
uniform vec3 clusterBoundsDelta;
uniform ivec3 clusterCellsDot;
uniform ivec3 clusterCellsMax;
uniform vec2 shadowAtlasParams;
struct ClusterLightData {
	vec3 position;
	int lightIndex;
	vec3 direction;
	uint shape;
	vec3 color;
	float shadowIntensity;
	float range;
	float biasesData;
	float cookieIntensity;
	bool isSpot;
	bool falloffModeLinear;
	bool isDynamic;
	bool isLightmapped;
};
struct ClusterLightSpotData {
	float innerConeAngleCos;
	float outerConeAngleCos;
};
struct ClusterLightAreaData {
	vec3 halfWidth;
	vec3 halfHeight;
};
struct ClusterLightShadowData {
	float shadowBias;
	float shadowNormalBias;
};
mat4 lightProjectionMatrix;
uint clusterLightData_flags;
float clusterLightData_anglesData;
uint clusterLightData_colorBFlagsData;
vec4 sampleLightTextureF(int lightIndex, int index) {
	return texelFetch(lightsTexture, ivec2(index, lightIndex), 0);
}
ClusterLightData decodeClusterLightCore(int lightIndex) {
	ClusterLightData clusterLightData;
	clusterLightData.lightIndex = lightIndex;
	vec4 halfData = sampleLightTextureF(lightIndex, {CLUSTER_TEXTURE_COLOR_ANGLES_BIAS});
	clusterLightData_anglesData = halfData.z;
	clusterLightData.biasesData = halfData.w;
	clusterLightData_colorBFlagsData = floatBitsToUint(halfData.y);
	vec2 colorRG = unpackHalf2x16(floatBitsToUint(halfData.x));
	vec2 colorB_flags = unpackHalf2x16(clusterLightData_colorBFlagsData);
	clusterLightData.color = vec3(colorRG, colorB_flags.x) * {LIGHT_COLOR_DIVIDER};
	vec4 lightPosRange = sampleLightTextureF(lightIndex, {CLUSTER_TEXTURE_POSITION_RANGE});
	clusterLightData.position = lightPosRange.xyz;
	clusterLightData.range = lightPosRange.w;
	vec4 lightDir_Flags = sampleLightTextureF(lightIndex, {CLUSTER_TEXTURE_DIRECTION_FLAGS});
	clusterLightData.direction = lightDir_Flags.xyz;
	clusterLightData_flags = floatBitsToUint(lightDir_Flags.w);
	clusterLightData.isSpot = (clusterLightData_flags & (1u << 30u)) != 0u;
	clusterLightData.shape = (clusterLightData_flags >> 28u) & 0x3u;
	clusterLightData.falloffModeLinear = (clusterLightData_flags & (1u << 27u)) == 0u;
	clusterLightData.shadowIntensity = float((clusterLightData_flags >> 0u) & 0xFFu) / 255.0;
	clusterLightData.cookieIntensity = float((clusterLightData_flags >> 8u) & 0xFFu) / 255.0;
	clusterLightData.isDynamic = (clusterLightData_flags & (1u << 22u)) != 0u;
	clusterLightData.isLightmapped = (clusterLightData_flags & (1u << 21u)) != 0u;
	return clusterLightData;
}
ClusterLightSpotData decodeClusterLightSpot() {
	uint angleFlags = (clusterLightData_colorBFlagsData >> 16u) & 0xFFFFu;
	vec2 angleValues = unpackHalf2x16(floatBitsToUint(clusterLightData_anglesData));
	float innerVal = angleValues.x;
	float outerVal = angleValues.y;
	float innerIsVersine = float(angleFlags & 1u);
	float outerIsVersine = float((angleFlags >> 1u) & 1u);
	return ClusterLightSpotData(
		mix(innerVal, 1.0 - innerVal, innerIsVersine),
		mix(outerVal, 1.0 - outerVal, outerIsVersine)
	);
}
vec3 decodeClusterLightOmniAtlasViewport(int lightIndex) {
	return sampleLightTextureF(lightIndex, {CLUSTER_TEXTURE_PROJ_MAT_0}).xyz;
}
ClusterLightAreaData decodeClusterLightAreaData(int lightIndex) {
	return ClusterLightAreaData(
		sampleLightTextureF(lightIndex, {CLUSTER_TEXTURE_AREA_DATA_WIDTH}).xyz,
		sampleLightTextureF(lightIndex, {CLUSTER_TEXTURE_AREA_DATA_HEIGHT}).xyz
	);
}
mat4 decodeClusterLightProjectionMatrixData(int lightIndex) {
	vec4 m0 = sampleLightTextureF(lightIndex, {CLUSTER_TEXTURE_PROJ_MAT_0});
	vec4 m1 = sampleLightTextureF(lightIndex, {CLUSTER_TEXTURE_PROJ_MAT_1});
	vec4 m2 = sampleLightTextureF(lightIndex, {CLUSTER_TEXTURE_PROJ_MAT_2});
	vec4 m3 = sampleLightTextureF(lightIndex, {CLUSTER_TEXTURE_PROJ_MAT_3});
	return mat4(m0, m1, m2, m3);
}
ClusterLightShadowData decodeClusterLightShadowData(float biasesData) {
	vec2 biases = unpackHalf2x16(floatBitsToUint(biasesData));
	return ClusterLightShadowData(biases.x, biases.y);
}
vec4 decodeClusterLightCookieData() {
	uint cookieFlags = (clusterLightData_flags >> 23u) & 0x0Fu;
	vec4 mask = vec4(uvec4(cookieFlags) & uvec4(1u, 2u, 4u, 8u));
	return step(1.0, mask);
}
void evaluateLight(
	ClusterLightData light, 
	vec3 worldNormal, 
	vec3 viewDir, 
	vec3 reflectionDir,
#if defined(LIT_CLEARCOAT)
	vec3 clearcoatReflectionDir,
#endif
	float gloss, 
	vec3 specularity, 
	vec3 geometricNormal, 
	mat3 tbn, 
#if defined(LIT_IRIDESCENCE)
	vec3 iridescenceFresnel,
#endif
	vec3 clearcoat_worldNormal,
	float clearcoat_gloss,
	float sheen_gloss,
	float iridescence_intensity
) {
	vec3 cookieAttenuation = vec3(1.0);
	float diffuseAttenuation = 1.0;
	float falloffAttenuation = 1.0;
	vec3 lightDirW = evalOmniLight(light.position);
	vec3 lightDirNormW = normalize(lightDirW);
	#ifdef CLUSTER_AREALIGHTS
	if (light.shape != {LIGHTSHAPE_PUNCTUAL}) {
		ClusterLightAreaData areaData = decodeClusterLightAreaData(light.lightIndex);
		if (light.shape == {LIGHTSHAPE_RECT}) {
			calcRectLightValues(light.position, areaData.halfWidth, areaData.halfHeight);
		} else if (light.shape == {LIGHTSHAPE_DISK}) {
			calcDiskLightValues(light.position, areaData.halfWidth, areaData.halfHeight);
		} else {
			calcSphereLightValues(light.position, areaData.halfWidth, areaData.halfHeight);
		}
		falloffAttenuation = getFalloffWindow(light.range, lightDirW);
	} else
	#endif
	{
		if (light.falloffModeLinear)
			falloffAttenuation = getFalloffLinear(light.range, lightDirW);
		else
			falloffAttenuation = getFalloffInvSquared(light.range, lightDirW);
	}
	if (falloffAttenuation > 0.00001) {
		#ifdef CLUSTER_AREALIGHTS
		if (light.shape != {LIGHTSHAPE_PUNCTUAL}) {
			if (light.shape == {LIGHTSHAPE_RECT}) {
				diffuseAttenuation = getRectLightDiffuse(worldNormal, viewDir, lightDirW, lightDirNormW) * 16.0;
			} else if (light.shape == {LIGHTSHAPE_DISK}) {
				diffuseAttenuation = getDiskLightDiffuse(worldNormal, viewDir, lightDirW, lightDirNormW) * 16.0;
			} else {
				diffuseAttenuation = getSphereLightDiffuse(worldNormal, viewDir, lightDirW, lightDirNormW) * 16.0;
			}
		} else
		#endif
		{
			falloffAttenuation *= getLightDiffuse(worldNormal, viewDir, lightDirNormW); 
		}
		if (light.isSpot) {
			ClusterLightSpotData spotData = decodeClusterLightSpot();
			falloffAttenuation *= getSpotEffect(light.direction, spotData.innerConeAngleCos, spotData.outerConeAngleCos, lightDirNormW);
		}
		#if defined(CLUSTER_COOKIES) || defined(CLUSTER_SHADOWS)
		if (falloffAttenuation > 0.00001) {
			if (light.shadowIntensity > 0.0 || light.cookieIntensity > 0.0) {
				vec3 omniAtlasViewport = vec3(0.0);
				if (light.isSpot) {
					lightProjectionMatrix = decodeClusterLightProjectionMatrixData(light.lightIndex);
				} else {
					omniAtlasViewport = decodeClusterLightOmniAtlasViewport(light.lightIndex);
				}
				float shadowTextureResolution = shadowAtlasParams.x;
				float shadowEdgePixels = shadowAtlasParams.y;
				#ifdef CLUSTER_COOKIES
				if (light.cookieIntensity > 0.0) {
					vec4 cookieChannelMask = decodeClusterLightCookieData();
					if (light.isSpot) {
						cookieAttenuation = getCookie2DClustered(TEXTURE_PASS(cookieAtlasTexture), lightProjectionMatrix, vPositionW, light.cookieIntensity, cookieChannelMask);
					} else {
						cookieAttenuation = getCookieCubeClustered(TEXTURE_PASS(cookieAtlasTexture), lightDirW, light.cookieIntensity, cookieChannelMask, shadowTextureResolution, shadowEdgePixels, omniAtlasViewport);
					}
				}
				#endif
				#ifdef CLUSTER_SHADOWS
				if (light.shadowIntensity > 0.0) {
					ClusterLightShadowData shadowData = decodeClusterLightShadowData(light.biasesData);
					vec4 shadowParams = vec4(shadowTextureResolution, shadowData.shadowNormalBias, shadowData.shadowBias, 1.0 / light.range);
					if (light.isSpot) {
						vec3 shadowCoord = getShadowCoordPerspZbufferNormalOffset(lightProjectionMatrix, shadowParams, geometricNormal);
						
						#if defined(CLUSTER_SHADOW_TYPE_PCF1)
							float shadow = getShadowSpotClusteredPCF1(SHADOWMAP_PASS(shadowAtlasTexture), shadowCoord, shadowParams);
						#elif defined(CLUSTER_SHADOW_TYPE_PCF3)
							float shadow = getShadowSpotClusteredPCF3(SHADOWMAP_PASS(shadowAtlasTexture), shadowCoord, shadowParams);
						#elif defined(CLUSTER_SHADOW_TYPE_PCF5)
							float shadow = getShadowSpotClusteredPCF5(SHADOWMAP_PASS(shadowAtlasTexture), shadowCoord, shadowParams);
						#elif defined(CLUSTER_SHADOW_TYPE_PCSS)
							float shadow = getShadowSpotClusteredPCSS(SHADOWMAP_PASS(shadowAtlasTexture), shadowCoord, shadowParams);
						#endif
						falloffAttenuation *= mix(1.0, shadow, light.shadowIntensity);
					} else {
						vec3 dir = normalOffsetPointShadow(shadowParams, light.position, lightDirW, lightDirNormW, geometricNormal);
						#if defined(CLUSTER_SHADOW_TYPE_PCF1)
							float shadow = getShadowOmniClusteredPCF1(SHADOWMAP_PASS(shadowAtlasTexture), shadowParams, omniAtlasViewport, shadowEdgePixels, dir);
						#elif defined(CLUSTER_SHADOW_TYPE_PCF3)
							float shadow = getShadowOmniClusteredPCF3(SHADOWMAP_PASS(shadowAtlasTexture), shadowParams, omniAtlasViewport, shadowEdgePixels, dir);
						#elif defined(CLUSTER_SHADOW_TYPE_PCF5)
							float shadow = getShadowOmniClusteredPCF5(SHADOWMAP_PASS(shadowAtlasTexture), shadowParams, omniAtlasViewport, shadowEdgePixels, dir);
						#endif
						falloffAttenuation *= mix(1.0, shadow, light.shadowIntensity);
					}
				}
				#endif
			}
		}
		#endif
		#ifdef CLUSTER_AREALIGHTS
		if (light.shape != {LIGHTSHAPE_PUNCTUAL}) {
			{
				vec3 areaDiffuse = (diffuseAttenuation * falloffAttenuation) * light.color * cookieAttenuation;
				#if defined(LIT_SPECULAR)
					areaDiffuse = mix(areaDiffuse, vec3(0), dLTCSpecFres);
				#endif
				dDiffuseLight += areaDiffuse;
			}
			#ifdef LIT_SPECULAR
				float areaLightSpecular;
				if (light.shape == {LIGHTSHAPE_RECT}) {
					areaLightSpecular = getRectLightSpecular(worldNormal, viewDir);
				} else if (light.shape == {LIGHTSHAPE_DISK}) {
					areaLightSpecular = getDiskLightSpecular(worldNormal, viewDir);
				} else {
					areaLightSpecular = getSphereLightSpecular(worldNormal, viewDir);
				}
				dSpecularLight += dLTCSpecFres * areaLightSpecular * falloffAttenuation * light.color * cookieAttenuation;
				#ifdef LIT_CLEARCOAT
					float areaLightSpecularCC;
					if (light.shape == {LIGHTSHAPE_RECT}) {
						areaLightSpecularCC = getRectLightSpecular(clearcoat_worldNormal, viewDir);
					} else if (light.shape == {LIGHTSHAPE_DISK}) {
						areaLightSpecularCC = getDiskLightSpecular(clearcoat_worldNormal, viewDir);
					} else {
						areaLightSpecularCC = getSphereLightSpecular(clearcoat_worldNormal, viewDir);
					}
					ccSpecularLight += ccLTCSpecFres * areaLightSpecularCC * falloffAttenuation * light.color  * cookieAttenuation;
				#endif
			#endif
		} else
		#endif
		{
			{
				vec3 punctualDiffuse = falloffAttenuation * light.color * cookieAttenuation;
				#if defined(CLUSTER_AREALIGHTS)
				#if defined(LIT_SPECULAR)
					punctualDiffuse = mix(punctualDiffuse, vec3(0), specularity);
				#endif
				#endif
				dDiffuseLight += punctualDiffuse;
			}
	 
			#ifdef LIT_SPECULAR
				vec3 halfDir = normalize(-lightDirNormW + viewDir);
				
				#ifdef LIT_SPECULAR_FRESNEL
					dSpecularLight += 
						getLightSpecular(halfDir, reflectionDir, worldNormal, viewDir, lightDirNormW, gloss, tbn) * falloffAttenuation * light.color * cookieAttenuation * 
						getFresnel(
							dot(viewDir, halfDir), 
							gloss, 
							specularity
						#if defined(LIT_IRIDESCENCE)
							, iridescenceFresnel,
							iridescence_intensity
						#endif
							);
				#else
					dSpecularLight += getLightSpecular(halfDir, reflectionDir, worldNormal, viewDir, lightDirNormW, gloss, tbn) * falloffAttenuation * light.color * cookieAttenuation * specularity;
				#endif
				#ifdef LIT_CLEARCOAT
					#ifdef LIT_SPECULAR_FRESNEL
						ccSpecularLight += getLightSpecular(halfDir, clearcoatReflectionDir, clearcoat_worldNormal, viewDir, lightDirNormW, clearcoat_gloss, tbn) * falloffAttenuation * light.color * cookieAttenuation * getFresnelCC(dot(viewDir, halfDir));
					#else
						ccSpecularLight += getLightSpecular(halfDir, clearcoatReflectionDir, clearcoat_worldNormal, viewDir, lightDirNormW, clearcoat_gloss, tbn) * falloffAttenuation * light.color * cookieAttenuation; 
					#endif
				#endif
				#ifdef LIT_SHEEN
					sSpecularLight += getLightSpecularSheen(halfDir, worldNormal, viewDir, lightDirNormW, sheen_gloss) * falloffAttenuation * light.color * cookieAttenuation;
				#endif
			#endif
		}
	}
	dAtten = falloffAttenuation;
	dLightDirNormW = lightDirNormW;
}
void evaluateClusterLight(
	int lightIndex, 
	vec3 worldNormal, 
	vec3 viewDir, 
	vec3 reflectionDir, 
#if defined(LIT_CLEARCOAT)
	vec3 clearcoatReflectionDir,
#endif
	float gloss, 
	vec3 specularity, 
	vec3 geometricNormal, 
	mat3 tbn, 
#if defined(LIT_IRIDESCENCE)
	vec3 iridescenceFresnel,
#endif
	vec3 clearcoat_worldNormal,
	float clearcoat_gloss,
	float sheen_gloss,
	float iridescence_intensity
) {
	ClusterLightData clusterLightData = decodeClusterLightCore(lightIndex);
	#ifdef CLUSTER_MESH_DYNAMIC_LIGHTS
		bool acceptLightMask = clusterLightData.isDynamic;
	#else
		bool acceptLightMask = clusterLightData.isLightmapped;
	#endif
	if (acceptLightMask)
		evaluateLight(
			clusterLightData, 
			worldNormal, 
			viewDir, 
			reflectionDir, 
#if defined(LIT_CLEARCOAT)
			clearcoatReflectionDir, 
#endif
			gloss, 
			specularity, 
			geometricNormal, 
			tbn, 
#if defined(LIT_IRIDESCENCE)
			iridescenceFresnel,
#endif
			clearcoat_worldNormal,
			clearcoat_gloss,
			sheen_gloss,
			iridescence_intensity
		);
}
void addClusteredLights(
	vec3 worldNormal, 
	vec3 viewDir, 
	vec3 reflectionDir, 
#if defined(LIT_CLEARCOAT)
	vec3 clearcoatReflectionDir,
#endif
	float gloss, 
	vec3 specularity, 
	vec3 geometricNormal, 
	mat3 tbn, 
#if defined(LIT_IRIDESCENCE)
	vec3 iridescenceFresnel,
#endif
	vec3 clearcoat_worldNormal,
	float clearcoat_gloss,
	float sheen_gloss,
	float iridescence_intensity
) {
	if (numClusteredLights <= 1)
		return;
	ivec3 cellCoords = ivec3(floor((vPositionW - clusterBoundsMin) * clusterCellsCountByBoundsSize));
	if (!(any(lessThan(cellCoords, ivec3(0))) || any(greaterThanEqual(cellCoords, clusterCellsMax)))) {
		int cellIndex = cellCoords.x * clusterCellsDot.x + cellCoords.y * clusterCellsDot.y + cellCoords.z * clusterCellsDot.z;
		int clusterV = cellIndex / clusterTextureWidth;
		int clusterU = cellIndex - clusterV * clusterTextureWidth;
		for (int lightCellIndex = 0; lightCellIndex < clusterMaxCells; lightCellIndex++) {
			uint lightIndex = texelFetch(clusterWorldTexture, ivec2(clusterU + lightCellIndex, clusterV), 0).x;
			if (lightIndex == 0u)
				break;
			evaluateClusterLight(
				int(lightIndex), 
				worldNormal, 
				viewDir, 
				reflectionDir,
#if defined(LIT_CLEARCOAT)
				clearcoatReflectionDir,
#endif
				gloss, 
				specularity, 
				geometricNormal, 
				tbn, 
#if defined(LIT_IRIDESCENCE)
				iridescenceFresnel,
#endif
				clearcoat_worldNormal,
				clearcoat_gloss,
				sheen_gloss,
				iridescence_intensity
			); 
		}
	}
}
`,combinePS:`
vec3 combineColor(vec3 albedo, vec3 sheenSpecularity, float clearcoatSpecularity) {
	vec3 ret = vec3(0);
#ifdef LIT_OLD_AMBIENT
	ret += (dDiffuseLight - light_globalAmbient) * albedo + material_ambient * light_globalAmbient;
#else
	ret += albedo * dDiffuseLight;
#endif
#ifdef LIT_SPECULAR
	ret += dSpecularLight;
#endif
#ifdef LIT_REFLECTIONS
	ret += dReflection.rgb * dReflection.a;
#endif
#ifdef LIT_SHEEN
	float sheenScaling = 1.0 - max(max(sheenSpecularity.r, sheenSpecularity.g), sheenSpecularity.b) * 0.157;
	ret = ret * sheenScaling + (sSpecularLight + sReflection.rgb) * sheenSpecularity;
#endif
#ifdef LIT_CLEARCOAT
	float clearCoatScaling = 1.0 - ccFresnel * clearcoatSpecularity;
	ret = ret * clearCoatScaling + (ccSpecularLight + ccReflection) * clearcoatSpecularity;
#endif
	return ret;
}
`,cookieBlit2DPS:`
	varying vec2 uv0;
	uniform sampler2D blitTexture;
	void main(void) {
		gl_FragColor = texture2D(blitTexture, uv0);
	}
`,cookieBlitCubePS:`
	varying vec2 uv0;
	uniform samplerCube blitTexture;
	uniform mat4 invViewProj;
	void main(void) {
		vec4 projPos = vec4(uv0 * 2.0 - 1.0, 0.5, 1.0);
		vec4 worldPos = invViewProj * projPos;
		gl_FragColor = textureCube(blitTexture, worldPos.xyz);
	}
`,cookieBlitVS:`
	attribute vec2 vertex_position;
	varying vec2 uv0;
	void main(void) {
		gl_Position = vec4(vertex_position, 0.5, 1.0);
		uv0 = vertex_position.xy * 0.5 + 0.5;
		#ifndef WEBGPU
			uv0.y = 1.0 - uv0.y;
		#endif
	}
`,cookiePS:`
vec4 getCookie2D(sampler2D tex, mat4 transform, float intensity) {
	vec4 projPos = transform * vec4(vPositionW, 1.0);
	projPos.xy /= projPos.w;
	return mix(vec4(1.0), texture2D(tex, projPos.xy), intensity);
}
vec4 getCookie2DClip(sampler2D tex, mat4 transform, float intensity) {
	vec4 projPos = transform * vec4(vPositionW, 1.0);
	projPos.xy /= projPos.w;
	if (projPos.x < 0.0 || projPos.x > 1.0 || projPos.y < 0.0 || projPos.y > 1.0 || projPos.z < 0.0) return vec4(0.0);
	return mix(vec4(1.0), texture2D(tex, projPos.xy), intensity);
}
vec4 getCookie2DXform(sampler2D tex, mat4 transform, float intensity, vec4 cookieMatrix, vec2 cookieOffset) {
	vec4 projPos = transform * vec4(vPositionW, 1.0);
	projPos.xy /= projPos.w;
	projPos.xy += cookieOffset;
	vec2 uv = mat2(cookieMatrix) * (projPos.xy-vec2(0.5)) + vec2(0.5);
	return mix(vec4(1.0), texture2D(tex, uv), intensity);
}
vec4 getCookie2DClipXform(sampler2D tex, mat4 transform, float intensity, vec4 cookieMatrix, vec2 cookieOffset) {
	vec4 projPos = transform * vec4(vPositionW, 1.0);
	projPos.xy /= projPos.w;
	projPos.xy += cookieOffset;
	if (projPos.x < 0.0 || projPos.x > 1.0 || projPos.y < 0.0 || projPos.y > 1.0 || projPos.z < 0.0) return vec4(0.0);
	vec2 uv = mat2(cookieMatrix) * (projPos.xy-vec2(0.5)) + vec2(0.5);
	return mix(vec4(1.0), texture2D(tex, uv), intensity);
}
vec4 getCookieCube(samplerCube tex, mat4 transform, float intensity) {
	return mix(vec4(1.0), textureCube(tex, dLightDirNormW * mat3(transform)), intensity);
}
`,cubeMapProjectPS:`
#if LIT_CUBEMAP_PROJECTION == BOX
	uniform vec3 envBoxMin;
	uniform vec3 envBoxMax;
#endif
vec3 cubeMapProject(vec3 nrdir) {
	#if LIT_CUBEMAP_PROJECTION == NONE
		return cubeMapRotate(nrdir);
	#endif
	#if LIT_CUBEMAP_PROJECTION == BOX
		nrdir = cubeMapRotate(nrdir);
		vec3 rbmax = (envBoxMax - vPositionW) / nrdir;
		vec3 rbmin = (envBoxMin - vPositionW) / nrdir;
		vec3 rbminmax = mix(rbmin, rbmax, vec3(greaterThan(nrdir, vec3(0.0))));
		float fa = min(min(rbminmax.x, rbminmax.y), rbminmax.z);
		vec3 posonbox = vPositionW + nrdir * fa;
		vec3 envBoxPos = (envBoxMin + envBoxMax) * 0.5;
		return normalize(posonbox - envBoxPos);
	#endif
}
`,cubeMapRotatePS:`
#ifdef CUBEMAP_ROTATION
uniform mat3 cubeMapRotationMatrix;
#endif
vec3 cubeMapRotate(vec3 refDir) {
#ifdef CUBEMAP_ROTATION
	return refDir * cubeMapRotationMatrix;
#else
	return refDir;
#endif
}
`,debugOutputPS:`
#ifdef DEBUG_ALBEDO_PASS
gl_FragColor = vec4(gammaCorrectOutput(dAlbedo), 1.0);
#endif
#ifdef DEBUG_UV0_PASS
gl_FragColor = vec4(litArgs_albedo , 1.0);
#endif
#ifdef DEBUG_WORLD_NORMAL_PASS
gl_FragColor = vec4(litArgs_worldNormal * 0.5 + 0.5, 1.0);
#endif
#ifdef DEBUG_OPACITY_PASS
gl_FragColor = vec4(vec3(litArgs_opacity) , 1.0);
#endif
#ifdef DEBUG_SPECULARITY_PASS
gl_FragColor = vec4(litArgs_specularity, 1.0);
#endif
#ifdef DEBUG_GLOSS_PASS
gl_FragColor = vec4(vec3(litArgs_gloss) , 1.0);
#endif
#ifdef DEBUG_METALNESS_PASS
gl_FragColor = vec4(vec3(litArgs_metalness) , 1.0);
#endif
#ifdef DEBUG_AO_PASS
gl_FragColor = vec4(vec3(litArgs_ao) , 1.0);
#endif
#ifdef DEBUG_EMISSION_PASS
gl_FragColor = vec4(gammaCorrectOutput(litArgs_emission), 1.0);
#endif
`,debugProcessFrontendPS:`
#ifdef DEBUG_LIGHTING_PASS
litArgs_albedo = vec3(0.5);
#endif
#ifdef DEBUG_UV0_PASS
#ifdef VARYING_VUV0
litArgs_albedo = vec3(vUv0, 0);
#else
litArgs_albedo = vec3(0);
#endif
#endif
`,detailModesPS:`
#ifndef _DETAILMODES_INCLUDED_
#define _DETAILMODES_INCLUDED_
vec3 detailMode_mul(vec3 c1, vec3 c2) {
	return c1 * c2;
}
vec3 detailMode_add(vec3 c1, vec3 c2) {
	return c1 + c2;
}
vec3 detailMode_screen(vec3 c1, vec3 c2) {
	return 1.0 - (1.0 - c1)*(1.0 - c2);
}
vec3 detailMode_overlay(vec3 c1, vec3 c2) {
	return mix(1.0 - 2.0 * (1.0 - c1)*(1.0 - c2), 2.0 * c1 * c2, step(c1, vec3(0.5)));
}
vec3 detailMode_min(vec3 c1, vec3 c2) {
	return min(c1, c2);
}
vec3 detailMode_max(vec3 c1, vec3 c2) {
	return max(c1, c2);
}
#endif
`,diffusePS:`
uniform vec3 material_diffuse;
#ifdef STD_DIFFUSEDETAIL_TEXTURE
	#include "detailModesPS"
#endif
void getAlbedo() {
	dAlbedo = material_diffuse.rgb;
	#ifdef STD_DIFFUSE_TEXTURE
		vec3 albedoTexture = {STD_DIFFUSE_TEXTURE_DECODE}(texture2DBias({STD_DIFFUSE_TEXTURE_NAME}, {STD_DIFFUSE_TEXTURE_UV}, textureBias)).{STD_DIFFUSE_TEXTURE_CHANNEL};
		#ifdef STD_DIFFUSEDETAIL_TEXTURE
			vec3 albedoDetail = {STD_DIFFUSEDETAIL_TEXTURE_DECODE}(texture2DBias({STD_DIFFUSEDETAIL_TEXTURE_NAME}, {STD_DIFFUSEDETAIL_TEXTURE_UV}, textureBias)).{STD_DIFFUSEDETAIL_TEXTURE_CHANNEL};
			albedoTexture = detailMode_{STD_DIFFUSEDETAIL_DETAILMODE}(albedoTexture, albedoDetail);
		#endif
		dAlbedo *= albedoTexture;
	#endif
	#ifdef STD_DIFFUSE_VERTEX
		dAlbedo *= saturate(vVertexColor.{STD_DIFFUSE_VERTEX_CHANNEL});
	#endif
}
`,decodePS:`
#ifndef _DECODE_INCLUDED_
#define _DECODE_INCLUDED_
vec3 decodeLinear(vec4 raw) {
	return raw.rgb;
}
float decodeGamma(float raw) {
	return pow(raw, 2.2);
}
vec3 decodeGamma(vec3 raw) {
	return pow(raw, vec3(2.2));
}
vec3 decodeGamma(vec4 raw) {
	return pow(raw.xyz, vec3(2.2));
}
vec3 decodeRGBM(vec4 raw) {
	vec3 color = (8.0 * raw.a) * raw.rgb;
	return color * color;
}
vec3 decodeRGBP(vec4 raw) {
	vec3 color = raw.rgb * (-raw.a * 7.0 + 8.0);
	return color * color;
}
vec3 decodeRGBE(vec4 raw) {
	if (raw.a == 0.0) {
		return vec3(0.0, 0.0, 0.0);
	} else {
		return raw.xyz * pow(2.0, raw.w * 255.0 - 128.0);
	}
}
vec4 passThrough(vec4 raw) {
	return raw;
}
vec3 unpackNormalXYZ(vec4 nmap) {
	return nmap.xyz * 2.0 - 1.0;
}
vec3 unpackNormalXY(vec4 nmap) {
	vec3 normal;
	normal.xy = nmap.wy * 2.0 - 1.0;
	normal.z = sqrt(1.0 - clamp(dot(normal.xy, normal.xy), 0.0, 1.0));
	return normal;
}
#endif
`,emissivePS:`
uniform vec3 material_emissive;
uniform float material_emissiveIntensity;
void getEmission() {
	dEmission = material_emissive * material_emissiveIntensity;
	#ifdef STD_EMISSIVE_TEXTURE
	dEmission *= {STD_EMISSIVE_TEXTURE_DECODE}(texture2DBias({STD_EMISSIVE_TEXTURE_NAME}, {STD_EMISSIVE_TEXTURE_UV}, textureBias)).{STD_EMISSIVE_TEXTURE_CHANNEL};
	#endif
	#ifdef STD_EMISSIVE_VERTEX
	dEmission *= saturate(vVertexColor.{STD_EMISSIVE_VERTEX_CHANNEL});
	#endif
}
`,encodePS:`
vec4 encodeLinear(vec3 source) {
	return vec4(source, 1.0);
}
vec4 encodeGamma(vec3 source) {
	return vec4(pow(source + 0.0000001, vec3(1.0 / 2.2)), 1.0);
}
vec4 encodeRGBM(vec3 source) {
	vec4 result;
	result.rgb = pow(source.rgb, vec3(0.5));
	result.rgb *= 1.0 / 8.0;
	result.a = saturate( max( max( result.r, result.g ), max( result.b, 1.0 / 255.0 ) ) );
	result.a = ceil(result.a * 255.0) / 255.0;
	result.rgb /= result.a;
	return result;
}
vec4 encodeRGBP(vec3 source) {
	vec3 gamma = pow(source, vec3(0.5));
	float maxVal = min(8.0, max(1.0, max(gamma.x, max(gamma.y, gamma.z))));
	float v = 1.0 - ((maxVal - 1.0) / 7.0);
	v = ceil(v * 255.0) / 255.0;
	return vec4(gamma / (-v * 7.0 + 8.0), v);	
}
vec4 encodeRGBE(vec3 source) {
	float maxVal = max(source.x, max(source.y, source.z));
	if (maxVal < 1e-32) {
		return vec4(0, 0, 0, 0);
	} else {
		float e = ceil(log2(maxVal));
		return vec4(source / pow(2.0, e), (e + 128.0) / 255.0);
	}
}
`,endPS:`
	gl_FragColor.rgb = combineColor(litArgs_albedo, litArgs_sheen_specularity, litArgs_clearcoat_specularity);
	gl_FragColor.rgb += litArgs_emission;
	gl_FragColor.rgb = addFog(gl_FragColor.rgb);
	gl_FragColor.rgb = toneMap(gl_FragColor.rgb);
	gl_FragColor.rgb = gammaCorrectOutput(gl_FragColor.rgb);
`,envAtlasPS:`
#ifndef _ENVATLAS_INCLUDED_
#define _ENVATLAS_INCLUDED_
const float atlasSize = 512.0;
const float seamSize = 1.0 / atlasSize;
vec2 mapUv(vec2 uv, vec4 rect) {
	return vec2(mix(rect.x + seamSize, rect.x + rect.z - seamSize, uv.x),
				mix(rect.y + seamSize, rect.y + rect.w - seamSize, uv.y));
}
vec2 mapRoughnessUv(vec2 uv, float level) {
	float t = 1.0 / exp2(level);
	return mapUv(uv, vec4(0, 1.0 - t, t, t * 0.5));
}
vec2 mapShinyUv(vec2 uv, float level) {
	float t = 1.0 / exp2(level);
	return mapUv(uv, vec4(1.0 - t, 1.0 - t, t, t * 0.5));
}
#endif
`,envProcPS:`
#ifdef LIT_SKYBOX_INTENSITY
	uniform float skyboxIntensity;
#endif
vec3 processEnvironment(vec3 color) {
	#ifdef LIT_SKYBOX_INTENSITY
		return color * skyboxIntensity;
	#else
		return color;
	#endif
}
`,falloffInvSquaredPS:`
float getFalloffWindow(float lightRadius, vec3 lightDir) {
	float sqrDist = dot(lightDir, lightDir);
	float invRadius = 1.0 / lightRadius;
	return square(saturate(1.0 - square(sqrDist * square(invRadius))));
}
float getFalloffInvSquared(float lightRadius, vec3 lightDir) {
	float sqrDist = dot(lightDir, lightDir);
	float falloff = 1.0 / (sqrDist + 1.0);
	float invRadius = 1.0 / lightRadius;
	falloff *= 16.0;
	falloff *= square(saturate(1.0 - square(sqrDist * square(invRadius))));
	return falloff;
}
`,falloffLinearPS:`
float getFalloffLinear(float lightRadius, vec3 lightDir) {
	float d = length(lightDir);
	return max(((lightRadius - d) / lightRadius), 0.0);
}
`,flatNormalPS:`
#ifndef TBNBASIS
	#define TBNBASIS
	uniform float tbnBasis;
#endif
vec3 getFlatNormal(vec3 worldPos) {
	vec3 normal = cross(dFdx(worldPos), dFdy(worldPos));
	float basis = gl_FrontFacing ? tbnBasis : -tbnBasis;
	float len = length(normal);
	return len > 0.0 ? normal * (basis / len) : vec3(0.0, 1.0, 0.0);
}
`,floatAsUintPS:`
#ifndef FLOAT_AS_UINT
#define FLOAT_AS_UINT
vec4 float2uint(float value) {
	uint intBits = floatBitsToUint(value);
	return vec4(
		float((intBits >> 24u) & 0xFFu) / 255.0,
		float((intBits >> 16u) & 0xFFu) / 255.0,
		float((intBits >> 8u) & 0xFFu) / 255.0,
		float(intBits & 0xFFu) / 255.0
	);
}
float uint2float(vec4 value) {
	uint intBits = 
		(uint(value.r * 255.0) << 24u) |
		(uint(value.g * 255.0) << 16u) |
		(uint(value.b * 255.0) << 8u) |
		uint(value.a * 255.0);
	return uintBitsToFloat(intBits);
}
vec4 float2vec4(float value) {
	#if defined(CAPS_TEXTURE_FLOAT_RENDERABLE)
		return vec4(value, 1.0, 1.0, 1.0);
	#else
		return float2uint(value);
	#endif
}
#endif
`,sceneTexturesPS:`
#ifndef SCENE_TEXTURES
#define SCENE_TEXTURES
void writeSceneTextureDepth(float linearDepth, float alpha) {
	#ifdef SCENE_TEXTURE_DEPTH
		pcFragColor{SCENE_TEXTURE_DEPTH_SLOT} = vec4(alpha / max(linearDepth, 1e-6), 0.0, 0.0, alpha);
	#endif
}
#endif
`,fogPS:`
float dBlendModeFogFactor = 1.0;
#if (FOG != NONE)
	uniform vec3 fog_color;
	#if (FOG == LINEAR)
		uniform float fog_start;
		uniform float fog_end;
	#else
		uniform float fog_density;
	#endif
#endif
#ifdef VERTEXSHADER
	float getFogFactor(float depth) {
#else
	float getFogFactor() {
		float depth = gl_FragCoord.z / gl_FragCoord.w;
#endif
	float fogFactor = 0.0;
	#if (FOG == LINEAR)
		fogFactor = (fog_end - depth) / (fog_end - fog_start);
	#elif (FOG == EXP)
		fogFactor = exp(-depth * fog_density);
	#elif (FOG == EXP2)
		fogFactor = exp(-depth * depth * fog_density * fog_density);
	#endif
	return clamp(fogFactor, 0.0, 1.0);
}
#ifdef VERTEXSHADER
	vec3 addFog(vec3 color, float depth) {
		#if (FOG != NONE)
			return mix(fog_color * dBlendModeFogFactor, color, getFogFactor(depth));
		#endif
		return color;
	}
#else
	vec3 addFog(vec3 color) {
		#if (FOG != NONE)
			return mix(fog_color * dBlendModeFogFactor, color, getFogFactor());
		#endif
		return color;
	}
#endif
`,fresnelSchlickPS:`
float pow5(float x) {
	float x2 = x * x;
	return x2 * x2 * x;
}
vec3 getFresnel(
		float cosTheta, 
		float gloss, 
		vec3 specularity
#if defined(LIT_IRIDESCENCE)
		, vec3 iridescenceFresnel, 
		float iridescenceIntensity
#endif
	) {
	float fresnel = pow5(1.0 - saturate(cosTheta));
	float glossSq = gloss * gloss;
	float specIntensity = max(specularity.r, max(specularity.g, specularity.b));
	vec3 ret = specularity + (max(vec3(glossSq * specIntensity), specularity) - specularity) * fresnel;
#if defined(LIT_IRIDESCENCE)
	return mix(ret, iridescenceFresnel, iridescenceIntensity);
#else
	return ret;
#endif	
}
float getFresnelCC(float cosTheta) {
	float fresnel = pow5(1.0 - saturate(cosTheta));
	return 0.04 + (1.0 - 0.04) * fresnel;
}
`,frontendCodePS:``,frontendDeclPS:``,fullscreenQuadVS:`
attribute vec2 vertex_position;
varying vec2 vUv0;
void main(void)
{
	gl_Position = vec4(vertex_position, 0.5, 1.0);
	vUv0 = vertex_position.xy * 0.5 + 0.5;
}
`,gammaPS:`
#include "decodePS"
#if (GAMMA == SRGB)
	float gammaCorrectInput(float color) {
		return decodeGamma(color);
	}
	vec3 gammaCorrectInput(vec3 color) {
		return decodeGamma(color);
	}
	vec4 gammaCorrectInput(vec4 color) {
		return vec4(decodeGamma(color.xyz), color.w);
	}
	vec3 gammaCorrectOutput(vec3 color) {
		return pow(color + 0.0000001, vec3(1.0 / 2.2));
	}
#else
	float gammaCorrectInput(float color) {
		return color;
	}
	vec3 gammaCorrectInput(vec3 color) {
		return color;
	}
	vec4 gammaCorrectInput(vec4 color) {
		return color;
	}
	vec3 gammaCorrectOutput(vec3 color) {
		return color;
	}
#endif
`,gles3PS:ni,gles3VS:ri,glossPS:`
#ifdef STD_GLOSS_CONSTANT
uniform float material_gloss;
#endif
void getGlossiness() {
	dGlossiness = 1.0;
	#ifdef STD_GLOSS_CONSTANT
	dGlossiness *= material_gloss;
	#endif
	#ifdef STD_GLOSS_TEXTURE
	dGlossiness *= texture2DBias({STD_GLOSS_TEXTURE_NAME}, {STD_GLOSS_TEXTURE_UV}, textureBias).{STD_GLOSS_TEXTURE_CHANNEL};
	#endif
	#ifdef STD_GLOSS_VERTEX
	dGlossiness *= saturate(vVertexColor.{STD_GLOSS_VERTEX_CHANNEL});
	#endif
	#ifdef STD_GLOSS_INVERT
	dGlossiness = 1.0 - dGlossiness;
	#endif
	dGlossiness += 0.0000001;
}
`,quadVS:`
	attribute vec2 aPosition;
	varying vec2 uv0;
	void main(void)
	{
		gl_Position = vec4(aPosition, 0.0, 1.0);
		uv0 = getImageEffectUV((aPosition.xy + 1.0) * 0.5);
	}
`,immediateLinePS:`
		#include "gammaPS"
		varying vec4 color;
		void main(void) {
			gl_FragColor = vec4(gammaCorrectOutput(decodeGamma(color.rgb)), color.a);
		}
`,immediateLineVS:`
	attribute vec4 vertex_position;
	attribute vec4 vertex_color;
	uniform mat4 matrix_model;
	uniform mat4 matrix_viewProjection;
	varying vec4 color;
	void main(void) {
		color = vertex_color;
		gl_Position = matrix_viewProjection * matrix_model * vertex_position;
	}
`,iridescenceDiffractionPS:`
uniform float material_iridescenceRefractionIndex;
float iridescence_iorToFresnel(float transmittedIor, float incidentIor) {
	return pow((transmittedIor - incidentIor) / (transmittedIor + incidentIor), 2.0);
}
vec3 iridescence_iorToFresnel(vec3 transmittedIor, float incidentIor) {
	return pow((transmittedIor - vec3(incidentIor)) / (transmittedIor + vec3(incidentIor)), vec3(2.0));
}
vec3 iridescence_fresnelToIor(vec3 f0) {
	vec3 sqrtF0 = sqrt(f0);
	return (vec3(1.0) + sqrtF0) / (vec3(1.0) - sqrtF0);
}
vec3 iridescence_sensitivity(float opd, vec3 shift) {
	float PI = 3.141592653589793;
	float phase = 2.0 * PI * opd * 1.0e-9;
	const vec3 val = vec3(5.4856e-13, 4.4201e-13, 5.2481e-13);
	const vec3 pos = vec3(1.6810e+06, 1.7953e+06, 2.2084e+06);
	const vec3 var = vec3(4.3278e+09, 9.3046e+09, 6.6121e+09);
	vec3 xyz = val * sqrt(2.0 * PI * var) * cos(pos * phase + shift) * exp(-pow(phase, 2.0) * var);
	xyz.x += 9.7470e-14 * sqrt(2.0 * PI * 4.5282e+09) * cos(2.2399e+06 * phase + shift[0]) * exp(-4.5282e+09 * pow(phase, 2.0));
	xyz /= vec3(1.0685e-07);
	const mat3 XYZ_TO_REC709 = mat3(
		3.2404542, -0.9692660,  0.0556434,
	   -1.5371385,  1.8760108, -0.2040259,
	   -0.4985314,  0.0415560,  1.0572252
	);
	return XYZ_TO_REC709 * xyz;
}
float iridescence_fresnel(float cosTheta, float f0) {
	float x = clamp(1.0 - cosTheta, 0.0, 1.0);
	float x2 = x * x;
	float x5 = x * x2 * x2;
	return f0 + (1.0 - f0) * x5;
} 
vec3 iridescence_fresnel(float cosTheta, vec3 f0) {
	float x = clamp(1.0 - cosTheta, 0.0, 1.0);
	float x2 = x * x;
	float x5 = x * x2 * x2; 
	return f0 + (vec3(1.0) - f0) * x5;
}
vec3 calcIridescence(float outsideIor, float cosTheta, vec3 base_f0, float iridescenceThickness) {
	float PI = 3.141592653589793;
	float iridescenceIor = mix(outsideIor, material_iridescenceRefractionIndex, smoothstep(0.0, 0.03, iridescenceThickness));
	float sinTheta2Sq = pow(outsideIor / iridescenceIor, 2.0) * (1.0 - pow(cosTheta, 2.0));
	float cosTheta2Sq = 1.0 - sinTheta2Sq;
	if (cosTheta2Sq < 0.0) {
		return vec3(1.0);
	}
	float cosTheta2 = sqrt(cosTheta2Sq);
	float r0 = iridescence_iorToFresnel(iridescenceIor, outsideIor);
	float r12 = iridescence_fresnel(cosTheta, r0);
	float r21 = r12;
	float t121 = 1.0 - r12;
	float phi12 = iridescenceIor < outsideIor ? PI : 0.0;
	float phi21 = PI - phi12;
	vec3 baseIor = iridescence_fresnelToIor(base_f0 + vec3(0.0001));
	vec3 r1 = iridescence_iorToFresnel(baseIor, iridescenceIor);
	vec3 r23 = iridescence_fresnel(cosTheta2, r1);
	vec3 phi23 = vec3(0.0);
	if (baseIor[0] < iridescenceIor) phi23[0] = PI;
	if (baseIor[1] < iridescenceIor) phi23[1] = PI;
	if (baseIor[2] < iridescenceIor) phi23[2] = PI;
	float opd = 2.0 * iridescenceIor * iridescenceThickness * cosTheta2;
	vec3 phi = vec3(phi21) + phi23; 
	vec3 r123Sq = clamp(r12 * r23, 1e-5, 0.9999);
	vec3 r123 = sqrt(r123Sq);
	vec3 rs = pow(t121, 2.0) * r23 / (1.0 - r123Sq);
	vec3 c0 = r12 + rs;
	vec3 i = c0;
	vec3 cm = rs - t121;
	for (int m = 1; m <= 2; m++) {
		cm *= r123;
		vec3 sm = 2.0 * iridescence_sensitivity(float(m) * opd, float(m) * phi);
		i += cm * sm;
	}
	return max(i, vec3(0.0));
}
vec3 getIridescence(float cosTheta, vec3 specularity, float iridescenceThickness) {
	return calcIridescence(1.0, cosTheta, specularity, iridescenceThickness);
}
`,iridescencePS:`
#ifdef STD_IRIDESCENCE_CONSTANT
uniform float material_iridescence;
#endif
void getIridescence() {
	float iridescence = 1.0;
	#ifdef STD_IRIDESCENCE_CONSTANT
	iridescence *= material_iridescence;
	#endif
	#ifdef STD_IRIDESCENCE_TEXTURE
	iridescence *= texture2DBias({STD_IRIDESCENCE_TEXTURE_NAME}, {STD_IRIDESCENCE_TEXTURE_UV}, textureBias).{STD_IRIDESCENCE_TEXTURE_CHANNEL};
	#endif
	dIridescence = iridescence; 
}
`,iridescenceThicknessPS:`
uniform float material_iridescenceThicknessMax;
#ifdef STD_IRIDESCENCETHICKNESS_TEXTURE
uniform float material_iridescenceThicknessMin;
#endif
void getIridescenceThickness() {
	#ifdef STD_IRIDESCENCETHICKNESS_TEXTURE
		float blend = texture2DBias({STD_IRIDESCENCETHICKNESS_TEXTURE_NAME}, {STD_IRIDESCENCETHICKNESS_TEXTURE_UV}, textureBias).{STD_IRIDESCENCETHICKNESS_TEXTURE_CHANNEL};
		float iridescenceThickness = mix(material_iridescenceThicknessMin, material_iridescenceThicknessMax, blend);
	#else
		float iridescenceThickness = material_iridescenceThicknessMax;
	#endif
	dIridescenceThickness = iridescenceThickness; 
}
`,iorPS:`
#ifdef STD_IOR_CONSTANT
uniform float material_refractionIndex;
#endif
void getIor() {
#ifdef STD_IOR_CONSTANT
	dIor = material_refractionIndex;
#else
	dIor = 1.0 / 1.5;
#endif
}
`,lightDeclarationPS:`
#if defined(LIGHT{i})
	uniform vec3 light{i}_color;
	#if LIGHT{i}TYPE == DIRECTIONAL
		uniform vec3 light{i}_direction;
	#else
		#define LIT_CODE_LIGHTS_POINT
		uniform vec3 light{i}_position;
		uniform float light{i}_radius;
		#if LIGHT{i}TYPE == SPOT
			#define LIT_CODE_LIGHTS_SPOT
			uniform vec3 light{i}_direction;
			uniform float light{i}_innerConeAngle;
			uniform float light{i}_outerConeAngle;
		#endif
	#endif
	#if LIGHT{i}SHAPE != PUNCTUAL
		#define LIT_CODE_FALLOFF_SQUARED
		#if LIGHT{i}TYPE == DIRECTIONAL
			uniform vec3 light{i}_position;
		#endif
		uniform vec3 light{i}_halfWidth;
		uniform vec3 light{i}_halfHeight;
	#else
		#if LIGHT{i}FALLOFF == LINEAR
			#define LIT_CODE_FALLOFF_LINEAR
		#endif
		#if LIGHT{i}FALLOFF == INVERSESQUARED
			#define LIT_CODE_FALLOFF_SQUARED
		#endif
	#endif
	#if defined(LIGHT{i}CASTSHADOW)
		#if LIGHT{i}TYPE != OMNI
			uniform mat4 light{i}_shadowMatrix;
		#endif
		uniform float light{i}_shadowIntensity;
		uniform vec4 light{i}_shadowParams;
		#if LIGHT{i}SHADOWTYPE == PCSS_32F
			uniform float light{i}_shadowSearchArea;
			uniform vec4 light{i}_cameraParams;
			#if LIGHT{i}TYPE == DIRECTIONAL
				uniform vec4 light{i}_softShadowParams;
				uniform vec4 light{i}_shadowCascadeRadii;
			#endif
		#endif
		#if LIGHT{i}TYPE == DIRECTIONAL
			uniform mat4 light{i}_shadowMatrixPalette[4];
			uniform vec4 light{i}_shadowCascadeDistances;
			uniform int light{i}_shadowCascadeCount;
			uniform float light{i}_shadowCascadeBlend;
		#endif
		#if LIGHT{i}TYPE == OMNI
			#if defined(LIGHT{i}SHADOW_PCF)
				uniform samplerCubeShadow light{i}_shadowMap;
			#else
				uniform samplerCube light{i}_shadowMap;
			#endif
		#else
			#if defined(LIGHT{i}SHADOW_PCF)
				uniform sampler2DShadow light{i}_shadowMap;
			#else
				uniform sampler2D light{i}_shadowMap;
			#endif
		#endif
	#endif
	#if defined(LIGHT{i}COOKIE)
		#define LIT_CODE_COOKIE
		#if LIGHT{i}TYPE == OMNI
			uniform samplerCube light{i}_cookie;
			uniform float light{i}_cookieIntensity;
			uniform mat4 light{i}_shadowMatrix;
		#endif
		#if LIGHT{i}TYPE == SPOT
			uniform sampler2D light{i}_cookie;
			uniform float light{i}_cookieIntensity;
			#if !defined(LIGHT{i}CASTSHADOW)
				uniform mat4 light{i}_shadowMatrix;
			#endif
			#if defined(LIGHT{i}COOKIE_TRANSFORM)
				uniform vec4 light{i}_cookieMatrix;
				uniform vec2 light{i}_cookieOffset;
			#endif
		#endif
	#endif
#endif
`,lightDiffuseLambertPS:`
float getLightDiffuse(vec3 worldNormal, vec3 viewDir, vec3 lightDirNorm) {
	return max(dot(worldNormal, -lightDirNorm), 0.0);
}
`,lightDirPointPS:`
vec3 evalOmniLight(vec3 lightPosW) {
	return vPositionW - lightPosW;
}
`,lightEvaluationPS:`
#if defined(LIGHT{i})
	evaluateLight{i}(
		#if defined(LIT_IRIDESCENCE)
			iridescenceFresnel
		#endif
	);
#endif
`,lightFunctionLightPS:`
#if defined(LIGHT{i})
void evaluateLight{i}(
	#if defined(LIT_IRIDESCENCE)
		vec3 iridescenceFresnel
	#endif
) {
	vec3 lightColor = light{i}_color;
	#if LIGHT{i}TYPE == DIRECTIONAL && !defined(LIT_SHADOW_CATCHER)
		if (all(equal(lightColor, vec3(0.0)))) {
			return;
		}
	#endif
	#if LIGHT{i}TYPE == DIRECTIONAL
		dLightDirNormW = light{i}_direction;
		dAtten = 1.0;
	#else
		
		vec3 lightDirW = evalOmniLight(light{i}_position);
		dLightDirNormW = normalize(lightDirW);
		#if defined(LIGHT{i}COOKIE)
			#if LIGHT{i}TYPE == SPOT
				#ifdef LIGHT{i}COOKIE_FALLOFF
					#ifdef LIGHT{i}COOKIE_TRANSFORM
						vec3 cookieAttenuation = getCookie2DXform(light{i}_cookie, light{i}_shadowMatrix, light{i}_cookieIntensity, light{i}_cookieMatrix, light{i}_cookieOffset).{LIGHT{i}COOKIE_CHANNEL};
					#else
						vec3 cookieAttenuation = getCookie2D(light{i}_cookie, light{i}_shadowMatrix, light{i}_cookieIntensity).{LIGHT{i}COOKIE_CHANNEL};
					#endif
				#else
					#ifdef LIGHT{i}COOKIE_TRANSFORM
						vec3 cookieAttenuation = getCookie2DClipXform(light{i}_cookie, light{i}_shadowMatrix, light{i}_cookieIntensity, light{i}_cookieMatrix, light{i}_cookieOffset).{LIGHT{i}COOKIE_CHANNEL};
					#else
						vec3 cookieAttenuation = getCookie2DClip(light{i}_cookie, light{i}_shadowMatrix, light{i}_cookieIntensity).{LIGHT{i}COOKIE_CHANNEL};
					#endif
				#endif
			#endif
			#if LIGHT{i}TYPE == OMNI
				vec3 cookieAttenuation = getCookieCube(light{i}_cookie, light{i}_shadowMatrix, light{i}_cookieIntensity).{LIGHT{i}COOKIE_CHANNEL};
			#endif
			lightColor *= cookieAttenuation;
		#endif
		#if LIGHT{i}SHAPE == PUNCTUAL
			#if LIGHT{i}FALLOFF == LINEAR
				dAtten = getFalloffLinear(light{i}_radius, lightDirW);
			#else
				dAtten = getFalloffInvSquared(light{i}_radius, lightDirW);
			#endif
		#else
			dAtten = getFalloffWindow(light{i}_radius, lightDirW);
		#endif
		#if LIGHT{i}TYPE == SPOT
			#if !defined(LIGHT{i}COOKIE) || defined(LIGHT{i}COOKIE_FALLOFF)
				dAtten *= getSpotEffect(light{i}_direction, light{i}_innerConeAngle, light{i}_outerConeAngle, dLightDirNormW);
			#endif
		#endif
	#endif
	if (dAtten < 0.00001) {
		return;
	}
	#if LIGHT{i}SHAPE != PUNCTUAL
		#if LIGHT{i}SHAPE == RECT
			calcRectLightValues(light{i}_position, light{i}_halfWidth, light{i}_halfHeight);
		#elif LIGHT{i}SHAPE == DISK
			calcDiskLightValues(light{i}_position, light{i}_halfWidth, light{i}_halfHeight);
		#elif LIGHT{i}SHAPE == SPHERE
			calcSphereLightValues(light{i}_position, light{i}_halfWidth, light{i}_halfHeight);
		#endif
	#endif
	#if LIGHT{i}SHAPE != PUNCTUAL
		#if LIGHT{i}TYPE == DIRECTIONAL
			float attenDiffuse = getLightDiffuse(litArgs_worldNormal, dViewDirW, dLightDirNormW);
		#else
			#if LIGHT{i}SHAPE == RECT
				float attenDiffuse = getRectLightDiffuse(litArgs_worldNormal, dViewDirW, lightDirW, dLightDirNormW) * 16.0;
			#elif LIGHT{i}SHAPE == DISK
				float attenDiffuse = getDiskLightDiffuse(litArgs_worldNormal, dViewDirW, lightDirW, dLightDirNormW) * 16.0;
			#elif LIGHT{i}SHAPE == SPHERE
				float attenDiffuse = getSphereLightDiffuse(litArgs_worldNormal, dViewDirW, lightDirW, dLightDirNormW) * 16.0;
			#endif
		#endif
	#else
		dAtten *= getLightDiffuse(litArgs_worldNormal, vec3(0.0), dLightDirNormW);
	#endif
	#ifdef LIGHT{i}CASTSHADOW
		#if LIGHT{i}TYPE == DIRECTIONAL
			float shadow = getShadow{i}(vec3(0.0));
		#else
			float shadow = getShadow{i}(lightDirW);
		#endif
		shadow = mix(1.0, shadow, light{i}_shadowIntensity);
		dAtten *= shadow;
		#if defined(LIT_SHADOW_CATCHER) && LIGHT{i}TYPE == DIRECTIONAL
			dShadowCatcher *= shadow;
		#endif			
	#endif
	#if defined(STD_PARALLAX_SELF_SHADOW) && LIGHT{i}TYPE == DIRECTIONAL
		dAtten *= getParallaxSelfShadow(dLightDirNormW);
	#endif
	#if LIGHT{i}SHAPE != PUNCTUAL
		#ifdef LIT_SPECULAR
			dDiffuseLight += ((attenDiffuse * dAtten) * lightColor) * (1.0 - dLTCSpecFres);
		#else
			dDiffuseLight += (attenDiffuse * dAtten) * lightColor;
		#endif						
	#else
		#if defined(AREA_LIGHTS) && defined(LIT_SPECULAR)
			dDiffuseLight += (dAtten * lightColor) * (1.0 - litArgs_specularity);
		#else
			dDiffuseLight += dAtten * lightColor;
		#endif
	#endif
	#ifdef LIGHT{i}AFFECT_SPECULARITY
		#if LIGHT{i}SHAPE != PUNCTUAL
			#ifdef LIT_CLEARCOAT
				#if LIGHT{i}SHAPE == RECT
					ccSpecularLight += ccLTCSpecFres * getRectLightSpecular(litArgs_clearcoat_worldNormal, dViewDirW) * dAtten * lightColor;
				#elif LIGHT{i}SHAPE == DISK
					ccSpecularLight += ccLTCSpecFres * getDiskLightSpecular(litArgs_clearcoat_worldNormal, dViewDirW) * dAtten * lightColor;
				#elif LIGHT{i}SHAPE == SPHERE
					ccSpecularLight += ccLTCSpecFres * getSphereLightSpecular(litArgs_clearcoat_worldNormal, dViewDirW) * dAtten * lightColor;
				#endif
			#endif
			#ifdef LIT_SPECULAR
				#if LIGHT{i}SHAPE == RECT
					dSpecularLight += dLTCSpecFres * getRectLightSpecular(litArgs_worldNormal, dViewDirW) * dAtten * lightColor;
				#elif LIGHT{i}SHAPE == DISK
					dSpecularLight += dLTCSpecFres * getDiskLightSpecular(litArgs_worldNormal, dViewDirW) * dAtten * lightColor;
				#elif LIGHT{i}SHAPE == SPHERE
					dSpecularLight += dLTCSpecFres * getSphereLightSpecular(litArgs_worldNormal, dViewDirW) * dAtten * lightColor;
				#endif
			#endif
		#else
			#if LIGHT{i}TYPE == DIRECTIONAL && LIT_FRESNEL_MODEL != NONE
				#define LIGHT{i}FRESNEL
			#endif
			#ifdef LIT_SPECULAR
				vec3 halfDirW = normalize(-dLightDirNormW + dViewDirW);
			#endif
			#ifdef LIT_CLEARCOAT
				vec3 lightspecularCC = getLightSpecular(halfDirW, ccReflDirW, litArgs_clearcoat_worldNormal, dViewDirW, dLightDirNormW, litArgs_clearcoat_gloss, dTBN) * dAtten * lightColor;
				#ifdef LIGHT{i}FRESNEL
					lightspecularCC *= getFresnelCC(dot(dViewDirW, halfDirW));
				#endif
				ccSpecularLight += lightspecularCC;
			#endif
			#ifdef LIT_SHEEN
				sSpecularLight += getLightSpecularSheen(halfDirW, litArgs_worldNormal, dViewDirW, dLightDirNormW, litArgs_sheen_gloss) * dAtten * lightColor;
			#endif
			#ifdef LIT_SPECULAR
				vec3 lightSpecular = getLightSpecular(halfDirW, dReflDirW, litArgs_worldNormal, dViewDirW, dLightDirNormW, litArgs_gloss, dTBN) * dAtten * lightColor;
				#ifdef LIGHT{i}FRESNEL
					#if defined(LIT_IRIDESCENCE)
						lightSpecular *= getFresnel(dot(dViewDirW, halfDirW), litArgs_gloss, litArgs_specularity, iridescenceFresnel, litArgs_iridescence_intensity);
					#else
						lightSpecular *= getFresnel(dot(dViewDirW, halfDirW), litArgs_gloss, litArgs_specularity);
					#endif
				#else
					lightSpecular *= litArgs_specularity;
				#endif
				
				dSpecularLight += lightSpecular;
			#endif
		#endif
	#endif
}
#endif
`,lightFunctionShadowPS:`
#ifdef LIGHT{i}CASTSHADOW
	#ifdef LIGHT{i}_SHADOW_SAMPLE_POINT
		vec3 getShadowSampleCoordOmni{i}(vec4 shadowParams, vec3 worldPosition, vec3 lightPos, inout vec3 lightDir, vec3 lightDirNorm, vec3 normal) {
			#ifdef LIGHT{i}_SHADOW_SAMPLE_NORMAL_OFFSET
				float distScale = length(lightDir);
				vec3 surfacePosition = worldPosition + normal * shadowParams.y * clamp(1.0 - dot(normal, -lightDirNorm), 0.0, 1.0) * distScale;
				lightDir = surfacePosition - lightPos;
			#endif
			return lightDir;
		}
	#endif
	#ifndef LIGHT{i}_SHADOW_SAMPLE_POINT
		vec3 getShadowSampleCoord{i}(mat4 shadowTransform, vec4 shadowParams, vec3 worldPosition, vec3 lightPos, inout vec3 lightDir, vec3 lightDirNorm, vec3 normal) {
			vec3 surfacePosition = worldPosition;
			#ifdef LIGHT{i}_SHADOW_SAMPLE_SOURCE_ZBUFFER
				#ifdef LIGHT{i}_SHADOW_SAMPLE_NORMAL_OFFSET
					surfacePosition = surfacePosition + normal * shadowParams.y;
				#endif
			#else
				#ifdef LIGHT{i}_SHADOW_SAMPLE_NORMAL_OFFSET
					#ifdef LIGHT{i}_SHADOW_SAMPLE_ORTHO
						float distScale = 1.0;
					#else
						float distScale = abs(dot(worldPosition - lightPos, lightDirNorm));
					#endif
					surfacePosition = surfacePosition + normal * shadowParams.y * clamp(1.0 - dot(normal, -lightDirNorm), 0.0, 1.0) * distScale;
				#endif
			#endif
			vec4 positionInShadowSpace = shadowTransform * vec4(surfacePosition, 1.0);
			#ifdef LIGHT{i}_SHADOW_SAMPLE_ORTHO
				positionInShadowSpace.z = saturate(positionInShadowSpace.z) - 0.0001;
			#else
				#ifdef LIGHT{i}_SHADOW_SAMPLE_SOURCE_ZBUFFER
					positionInShadowSpace.xyz /= positionInShadowSpace.w;
				#else
					positionInShadowSpace.xy /= positionInShadowSpace.w;
					positionInShadowSpace.z = length(lightDir) * shadowParams.w;
				#endif
			#endif
			return positionInShadowSpace.xyz;
		}
	#endif
	float getShadow{i}(vec3 lightDirW) {
		#if LIGHT{i}TYPE == OMNI
			vec3 shadowCoord = getShadowSampleCoordOmni{i}(light{i}_shadowParams, vPositionW, light{i}_position, lightDirW, dLightDirNormW, dVertexNormalW);
		#else
			#ifdef LIGHT{i}_SHADOW_CASCADES
				int cascadeIndex = getShadowCascadeIndex(light{i}_shadowCascadeDistances, light{i}_shadowCascadeCount);
				#ifdef LIGHT{i}_SHADOW_CASCADE_BLEND
					cascadeIndex = ditherShadowCascadeIndex(cascadeIndex, light{i}_shadowCascadeDistances, light{i}_shadowCascadeCount, light{i}_shadowCascadeBlend);
				#endif
				mat4 shadowMatrix = light{i}_shadowMatrixPalette[cascadeIndex];
			#else
				mat4 shadowMatrix = light{i}_shadowMatrix;
			#endif
			#if LIGHT{i}TYPE == DIRECTIONAL
				vec3 shadowCoord = getShadowSampleCoord{i}(shadowMatrix, light{i}_shadowParams, vPositionW, vec3(0.0), lightDirW, dLightDirNormW, dVertexNormalW);
			#else
				vec3 shadowCoord = getShadowSampleCoord{i}(shadowMatrix, light{i}_shadowParams, vPositionW, light{i}_position, lightDirW, dLightDirNormW, dVertexNormalW);
			#endif
		#endif
		#if LIGHT{i}TYPE == DIRECTIONAL
			shadowCoord = fadeShadow(shadowCoord, light{i}_shadowCascadeDistances);
		#endif
		#if LIGHT{i}TYPE == DIRECTIONAL
			#if LIGHT{i}SHADOWTYPE == VSM_16F
				return getShadowVSM16(SHADOWMAP_PASS(light{i}_shadowMap), shadowCoord, light{i}_shadowParams, 5.54);
			#endif
			#if LIGHT{i}SHADOWTYPE == VSM_32F
				return getShadowVSM32(SHADOWMAP_PASS(light{i}_shadowMap), shadowCoord, light{i}_shadowParams, 15.0);
			#endif
			#if LIGHT{i}SHADOWTYPE == PCSS_32F
				#if LIGHT{i}SHAPE != PUNCTUAL
					vec2 shadowSearchArea = vec2(length(light{i}_halfWidth), length(light{i}_halfHeight)) * light{i}_shadowSearchArea;
					return getShadowPCSS(SHADOWMAP_PASS(light{i}_shadowMap), shadowCoord, light{i}_shadowParams, light{i}_cameraParams, shadowSearchArea, lightDirW);
				#else
					vec4 pcssCameraParams = light{i}_cameraParams;
					#ifdef LIGHT{i}_SHADOW_CASCADES
						pcssCameraParams.x = light{i}_shadowCascadeRadii[cascadeIndex];
					#endif
					return getShadowPCSS(SHADOWMAP_PASS(light{i}_shadowMap), shadowCoord, light{i}_shadowParams, pcssCameraParams, light{i}_softShadowParams, lightDirW);
				#endif
			#endif
			#if LIGHT{i}SHADOWTYPE == PCF1_16F || LIGHT{i}SHADOWTYPE == PCF1_32F
				return getShadowPCF1x1(SHADOWMAP_PASS(light{i}_shadowMap), shadowCoord, light{i}_shadowParams);
			#endif
			#if LIGHT{i}SHADOWTYPE == PCF3_16F || LIGHT{i}SHADOWTYPE == PCF3_32F
				return getShadowPCF3x3(SHADOWMAP_PASS(light{i}_shadowMap), shadowCoord, light{i}_shadowParams);
			#endif
			#if LIGHT{i}SHADOWTYPE == PCF5_16F || LIGHT{i}SHADOWTYPE == PCF5_32F
				return getShadowPCF5x5(SHADOWMAP_PASS(light{i}_shadowMap), shadowCoord, light{i}_shadowParams);
			#endif
		#endif
		#if LIGHT{i}TYPE == SPOT
			#if LIGHT{i}SHADOWTYPE == VSM_16F
				return getShadowSpotVSM16(SHADOWMAP_PASS(light{i}_shadowMap), shadowCoord, light{i}_shadowParams, 5.54, lightDirW);
			#endif
			#if LIGHT{i}SHADOWTYPE == VSM_32F
				return getShadowSpotVSM32(SHADOWMAP_PASS(light{i}_shadowMap), shadowCoord, light{i}_shadowParams, 15.0, lightDirW);
			#endif
			#if LIGHT{i}SHADOWTYPE == PCSS_32F
				#if LIGHT{i}SHAPE != PUNCTUAL
					vec2 shadowSearchArea = vec2(length(light{i}_halfWidth), length(light{i}_halfHeight)) * light{i}_shadowSearchArea;
				#else
					vec2 shadowSearchArea = vec2(light{i}_shadowSearchArea);
				#endif
				return getShadowSpotPCSS(SHADOWMAP_PASS(light{i}_shadowMap), shadowCoord, light{i}_shadowParams, light{i}_cameraParams, shadowSearchArea, lightDirW);
			#endif
			#if LIGHT{i}SHADOWTYPE == PCF1_16F || LIGHT{i}SHADOWTYPE == PCF1_32F
				return getShadowSpotPCF1x1(SHADOWMAP_PASS(light{i}_shadowMap), shadowCoord, light{i}_shadowParams);
			#endif
			#if LIGHT{i}SHADOWTYPE == PCF3_16F || LIGHT{i}SHADOWTYPE == PCF3_32F
				return getShadowSpotPCF3x3(SHADOWMAP_PASS(light{i}_shadowMap), shadowCoord, light{i}_shadowParams);
			#endif
			#if LIGHT{i}SHADOWTYPE == PCF5_16F || LIGHT{i}SHADOWTYPE == PCF5_32F
				return getShadowSpotPCF5x5(SHADOWMAP_PASS(light{i}_shadowMap), shadowCoord, light{i}_shadowParams);
			#endif
		#endif
		#if LIGHT{i}TYPE == OMNI
			#if LIGHT{i}SHADOWTYPE == PCSS_32F
				#if LIGHT{i}SHAPE != PUNCTUAL
					vec2 shadowSearchArea = vec2(length(light{i}_halfWidth), length(light{i}_halfHeight)) * light{i}_shadowSearchArea;
				#else
					vec2 shadowSearchArea = vec2(light{i}_shadowSearchArea);
				#endif
				return getShadowOmniPCSS(SHADOWMAP_PASS(light{i}_shadowMap), shadowCoord, light{i}_shadowParams, light{i}_cameraParams, shadowSearchArea, lightDirW);
			#endif
			#if LIGHT{i}SHADOWTYPE == PCF1_16F || LIGHT{i}SHADOWTYPE == PCF1_32F
				return getShadowOmniPCF1x1(SHADOWMAP_PASS(light{i}_shadowMap), shadowCoord, light{i}_shadowParams, lightDirW);
			#endif
			#if LIGHT{i}SHADOWTYPE == PCF3_16F || LIGHT{i}SHADOWTYPE == PCF3_32F
				return getShadowOmniPCF3x3(SHADOWMAP_PASS(light{i}_shadowMap), shadowCoord, light{i}_shadowParams, lightDirW);
			#endif
		#endif
	}
#endif
`,lightingPS:`
#ifdef LIT_CLUSTERED_LIGHTS
	#define LIT_CODE_FALLOFF_LINEAR
	#define LIT_CODE_FALLOFF_SQUARED
	#define LIT_CODE_LIGHTS_POINT
	#define LIT_CODE_LIGHTS_SPOT
#endif
#ifdef AREA_LIGHTS
	uniform highp sampler2D areaLightsLutTex1;
	uniform highp sampler2D areaLightsLutTex2;
#endif
#ifdef LIT_LIGHTING
	#include "lightDiffuseLambertPS"
	#if defined(AREA_LIGHTS) || defined(LIT_CLUSTERED_AREA_LIGHTS)
		#include "ltcPS"
	#endif
#endif
#ifdef SHADOW_DIRECTIONAL
	#include "shadowCascadesPS"
#endif
#if defined(SHADOW_KIND_PCF1)
	#include "shadowPCF1PS"
#endif
#if defined(SHADOW_KIND_PCF3)
	#include "shadowPCF3PS"
#endif
#if defined(SHADOW_KIND_PCF5)
	#include "shadowPCF5PS"
#endif
#if defined(SHADOW_KIND_PCSS)
	#include "linearizeDepthPS"
	#include "shadowPCSSPS"
	#include "shadowSoftPS"
#endif
#if defined(SHADOW_KIND_VSM)
	#include "shadowEVSMPS"
#endif
#ifdef LIT_CODE_FALLOFF_LINEAR
	#include "falloffLinearPS"
#endif
#ifdef LIT_CODE_FALLOFF_SQUARED
	#include "falloffInvSquaredPS"
#endif
#ifdef LIT_CODE_LIGHTS_POINT
	#include "lightDirPointPS"
#endif
#ifdef LIT_CODE_LIGHTS_SPOT
	#include "spotPS"
#endif
#ifdef LIT_CODE_COOKIE
	#include "cookiePS"
#endif
#ifdef LIT_CLUSTERED_LIGHTS
	#include "clusteredLightPS"
#endif
#ifdef LIGHT_COUNT > 0
	#include "lightFunctionShadowPS, LIGHT_COUNT"
	#include "lightFunctionLightPS, LIGHT_COUNT"
#endif
`,lightmapAddPS:`
void addLightMap(
	vec3 lightmap, 
	vec3 dir, 
	vec3 worldNormal, 
	vec3 viewDir, 
	vec3 reflectionDir, 
	float gloss, 
	vec3 specularity, 
	vec3 vertexNormal, 
	mat3 tbn
#if defined(LIT_IRIDESCENCE)
	vec3 iridescenceFresnel, 
	float iridescenceIntensity
#endif
) {
	#if defined(LIT_SPECULAR) && defined(LIT_DIR_LIGHTMAP)
		if (dot(dir, dir) < 0.0001) {
				dDiffuseLight += lightmap;
		} else {
			float vlight = saturate(dot(dir, -vertexNormal));
			float flight = saturate(dot(dir, -worldNormal));
			float nlight = (flight / max(vlight, 0.01)) * 0.5;
			dDiffuseLight += lightmap * nlight * 2.0;
			vec3 halfDir = normalize(-dir + viewDir);
			vec3 specularLight = lightmap * getLightSpecular(halfDir, reflectionDir, worldNormal, viewDir, dir, gloss, tbn);
			#ifdef LIT_SPECULAR_FRESNEL
				specularLight *= 
					getFresnel(dot(viewDir, halfDir), 
					gloss, 
					specularity
				#if defined(LIT_IRIDESCENCE)
					, iridescenceFresnel,
					iridescenceIntensity
				#endif
					);
			#endif
			dSpecularLight += specularLight;
		}
	#else
		dDiffuseLight += lightmap;
	#endif
}
`,lightmapPS:`
#ifdef STD_LIGHTMAP_DIR
	vec3 dLightmapDir;
	uniform sampler2D texture_dirLightMap;
#endif
void getLightMap() {
	dLightmap = vec3(1.0);
	#ifdef STD_LIGHT_TEXTURE
		dLightmap *= {STD_LIGHT_TEXTURE_DECODE}(texture2DBias({STD_LIGHT_TEXTURE_NAME}, {STD_LIGHT_TEXTURE_UV}, textureBias)).{STD_LIGHT_TEXTURE_CHANNEL};
		#ifdef STD_LIGHTMAP_DIR
			vec3 dir = texture2DBias(texture_dirLightMap, {STD_LIGHT_TEXTURE_UV}, textureBias).xyz * 2.0 - 1.0;
			float dirDot = dot(dir, dir);
			dLightmapDir = (dirDot > 0.001) ? dir / sqrt(dirDot) : vec3(0.0);
		#endif
	#endif
	#ifdef STD_LIGHT_VERTEX
		dLightmap *= saturate(vVertexColor.{STD_LIGHT_VERTEX_CHANNEL});
	#endif
}
`,lightSpecularAnisoGGXPS:`
float calcLightSpecular(float gloss, vec3 worldNormal, vec3 viewDir, vec3 h, vec3 lightDirNorm, mat3 tbn) {
	float PI = 3.141592653589793;
	float roughness = max((1.0 - gloss) * (1.0 - gloss), 0.001);
	float alphaRoughness = roughness * roughness;
	float anisotropy = dAnisotropy;
	vec2 direction = dAnisotropyRotation;
	float at = mix(alphaRoughness, 1.0, anisotropy * anisotropy);
	float ab = clamp(alphaRoughness, 0.001, 1.0);
	vec3 anisotropicT = normalize(tbn * vec3(direction, 0.0));
	vec3 anisotropicB = normalize(cross(tbn[2], anisotropicT));
	float NoH = dot(worldNormal, h);
	float ToH = dot(anisotropicT, h);
	float BoH = dot(anisotropicB, h);
	float a2 = at * ab;
	vec3 v = vec3(ab * ToH, at * BoH, a2 * NoH);
	float v2 = dot(v, v);
	float w2 = a2 / v2;
	float D = a2 * w2 * w2 * (1.0 / PI);
	float ToV = dot(anisotropicT, viewDir);
	float BoV = dot(anisotropicB, viewDir);
	float ToL = dot(anisotropicT, -lightDirNorm);
	float BoL = dot(anisotropicB, -lightDirNorm);
	float NoV = dot(worldNormal, viewDir);
	float NoL = dot(worldNormal, -lightDirNorm);
	float lambdaV = NoL * length(vec3(at * ToV, ab * BoV, NoV));
	float lambdaL = NoV * length(vec3(at * ToL, ab * BoL, NoL));
	float G = 0.5 / (lambdaV + lambdaL);
	return D * G;
}
float getLightSpecular(vec3 h, vec3 reflDir, vec3 worldNormal, vec3 viewDir, vec3 lightDirNorm, float gloss, mat3 tbn) {
	return calcLightSpecular(gloss, worldNormal, viewDir, h, lightDirNorm, tbn);
}
`,lightSpecularGGXPS:`
float calcLightSpecular(float gloss, vec3 worldNormal, vec3 viewDir, vec3 h, vec3 lightDirNorm) {
	const float PI = 3.141592653589793;
	float roughness = max((1.0 - gloss) * (1.0 - gloss), 0.001);
	float alpha = roughness * roughness;
	float NoH = max(dot(worldNormal, h), 0.0);
	float NoV = max(dot(worldNormal, viewDir), 0.0);
	float NoL = max(dot(worldNormal, -lightDirNorm), 0.0);
	float NoH2 = NoH * NoH;
	float denom = NoH2 * (alpha - 1.0) + 1.0;
	float D = alpha / (PI * denom * denom);
	float alpha2 = alpha * alpha;
	float lambdaV = NoL * sqrt(NoV * NoV * (1.0 - alpha2) + alpha2);
	float lambdaL = NoV * sqrt(NoL * NoL * (1.0 - alpha2) + alpha2);
	float G = 0.5 / max(lambdaV + lambdaL, 0.00001);
	return D * G;
}
float getLightSpecular(vec3 h, vec3 reflDir, vec3 worldNormal, vec3 viewDir, vec3 lightDirNorm, float gloss, mat3 tbn) {
	return calcLightSpecular(gloss, worldNormal, viewDir, h, lightDirNorm);
}
`,lightSpecularBlinnPS:`
float calcLightSpecular(float gloss, vec3 worldNormal, vec3 h) {
	float nh = max( dot( h, worldNormal ), 0.0 );
	float specPow = exp2(gloss * 11.0);
	specPow = max(specPow, 0.0001);
	return pow(nh, specPow) * (specPow + 2.0) / 8.0;
}
float getLightSpecular(vec3 h, vec3 reflDir, vec3 worldNormal, vec3 viewDir, vec3 lightDirNorm, float gloss, mat3 tbn) {
	return calcLightSpecular(gloss, worldNormal, h);
}
`,lightSheenPS:`
float sheenD(vec3 normal, vec3 h, float roughness) {
	const float PI = 3.141592653589793;
	float invR = 1.0 / (roughness * roughness);
	float cos2h = max(dot(normal, h), 0.0);
	cos2h *= cos2h;
	float sin2h = max(1.0 - cos2h, 0.0078125);
	return (2.0 + invR) * pow(sin2h, invR * 0.5) / (2.0 * PI);
}
float sheenV(vec3 normal, vec3 viewDir, vec3 light) {
	float NoV = max(dot(normal, viewDir), 0.000001);
	float NoL = max(dot(normal, light), 0.000001);
	return 1.0 / (4.0 * (NoL + NoV - NoL * NoV));
}
float getLightSpecularSheen(vec3 h, vec3 worldNormal, vec3 viewDir, vec3 lightDirNorm, float sheenGloss) {
	float D = sheenD(worldNormal, h, sheenGloss);
	float V = sheenV(worldNormal, viewDir, -lightDirNorm);
	return D * V;
}
`,linearizeDepthPS:`
#ifndef LINEARIZE_DEPTH
#define LINEARIZE_DEPTH
float linearizeDepthWithParams(float z, vec4 cameraParams) {
	if (cameraParams.w == 0.0)
		return (cameraParams.z * cameraParams.y) / (cameraParams.y + z * (cameraParams.z - cameraParams.y));
	else
		return cameraParams.z + z * (cameraParams.y - cameraParams.z);
}
#ifndef CAMERAPLANES
	#define CAMERAPLANES
	uniform vec4 camera_params;
#endif
float linearizeDepth(float z) {
	return linearizeDepthWithParams(z, camera_params);
}
#endif
`,litForwardBackendPS:`
void evaluateBackend() {
	#ifdef LIT_SSAO
		litArgs_ao *= texture2DLod(ssaoTexture, gl_FragCoord.xy * ssaoTextureSizeInv, 0.0).r;
	#endif
	#ifdef LIT_NEEDS_NORMAL
		#ifdef LIT_SPECULAR
			getReflDir(litArgs_worldNormal, dViewDirW, litArgs_gloss, dTBN);
		#endif
		#ifdef LIT_CLEARCOAT
			ccReflDirW = normalize(-reflect(dViewDirW, litArgs_clearcoat_worldNormal));
		#endif
	#endif
	#if defined(LIT_SPECULAR_OR_REFLECTION) || defined(LIT_REFRACTION)
		#ifdef LIT_METALNESS
			float f0 = 1.0 / litArgs_ior;
			f0 = (f0 - 1.0) / (f0 + 1.0);
			f0 *= f0;
			#ifdef LIT_SPECULARITY_FACTOR
				litArgs_specularity = getSpecularModulate(litArgs_specularity, litArgs_albedo, litArgs_metalness, f0, litArgs_specularityFactor);
			#else
				litArgs_specularity = getSpecularModulate(litArgs_specularity, litArgs_albedo, litArgs_metalness, f0, 1.0);
			#endif
			litArgs_albedo = getAlbedoModulate(litArgs_albedo, litArgs_metalness);
		#endif
		#ifdef LIT_IRIDESCENCE
			vec3 iridescenceFresnel = getIridescence(saturate(dot(dViewDirW, litArgs_worldNormal)), litArgs_specularity, litArgs_iridescence_thickness);
		#endif
	#endif
	#ifdef LIT_ADD_AMBIENT
		addAmbient(litArgs_worldNormal);
		#ifdef LIT_SPECULAR
			dDiffuseLight = dDiffuseLight * (1.0 - litArgs_specularity);
		#endif
		#ifdef LIT_SEPARATE_AMBIENT
			vec3 dAmbientLight = dDiffuseLight;
			dDiffuseLight = vec3(0);
		#endif
	#endif
	#ifndef LIT_OLD_AMBIENT
		dDiffuseLight *= material_ambient;
	#endif
	#ifdef LIT_AO
		#ifndef LIT_OCCLUDE_DIRECT
			occludeDiffuse(litArgs_ao);
		#endif
	#endif
	#ifdef LIT_LIGHTMAP
		addLightMap(
			litArgs_lightmap, 
			litArgs_lightmapDir, 
			litArgs_worldNormal, 
			dViewDirW, 
			dReflDirW, 
			litArgs_gloss, 
			litArgs_specularity, 
			dVertexNormalW,
			dTBN
		#if defined(LIT_IRIDESCENCE)
			, iridescenceFresnel,
			litArgs_iridescence_intensity
		#endif
		);
	#endif
	#ifdef LIT_LIGHTING || LIT_REFLECTIONS
		#ifdef LIT_REFLECTIONS
			#ifdef LIT_CLEARCOAT
				addReflectionCC(ccReflDirW, litArgs_clearcoat_gloss);
			
				#ifdef LIT_SPECULAR_FRESNEL
					ccFresnel = getFresnelCC(dot(dViewDirW, litArgs_clearcoat_worldNormal));
					ccReflection *= ccFresnel;
				#else
					ccFresnel = 0.0;
				#endif
			#endif
			#ifdef LIT_SPECULARITY_FACTOR
				ccReflection *= litArgs_specularityFactor;
			#endif
			#ifdef LIT_SHEEN
				addReflectionSheen(litArgs_worldNormal, dViewDirW, litArgs_sheen_gloss);
			#endif
			addReflection(dReflDirW, litArgs_gloss);
			#ifdef LIT_FRESNEL_MODEL
				dReflection.rgb *= getFresnel(
					dot(dViewDirW, litArgs_worldNormal), 
					litArgs_gloss, 
					litArgs_specularity
				#if defined(LIT_IRIDESCENCE)
					, iridescenceFresnel,
					litArgs_iridescence_intensity
				#endif
					);
			#else
				dReflection.rgb *= litArgs_specularity;
			#endif
		#endif
		#ifdef AREA_LIGHTS
			dSpecularLight *= litArgs_specularity;
			#ifdef LIT_SPECULAR
				calcLTCLightValues(litArgs_gloss, litArgs_worldNormal, dViewDirW, litArgs_specularity, litArgs_clearcoat_gloss, litArgs_clearcoat_worldNormal, litArgs_clearcoat_specularity);
			#endif
		#endif
		
		#ifdef LIGHT_COUNT > 0
			#include "lightEvaluationPS, LIGHT_COUNT"
		#endif
		#ifdef LIT_CLUSTERED_LIGHTS
			addClusteredLights(litArgs_worldNormal, dViewDirW, dReflDirW,
				#if defined(LIT_CLEARCOAT)
						ccReflDirW,
				#endif
						litArgs_gloss, litArgs_specularity, dVertexNormalW, dTBN, 
				#if defined(LIT_IRIDESCENCE)
						iridescenceFresnel,
				#endif
						litArgs_clearcoat_worldNormal, litArgs_clearcoat_gloss, litArgs_sheen_gloss, litArgs_iridescence_intensity
			);
		#endif
		#ifdef AREA_LIGHTS
			#ifdef LIT_CLEARCOAT
				litArgs_clearcoat_specularity = 1.0;
			#endif
			#ifdef LIT_SPECULAR
				litArgs_specularity = vec3(1);
			#endif
		#endif
	#endif
	#ifdef LIT_REFRACTION
		addRefraction(
			litArgs_worldNormal,
			dViewDirW,
			litArgs_thickness,
			litArgs_gloss,
			litArgs_specularity,
			litArgs_albedo,
			litArgs_transmission,
			litArgs_ior,
			litArgs_dispersion
			#if defined(LIT_IRIDESCENCE)
				, iridescenceFresnel,
				litArgs_iridescence_intensity
			#endif
		);
	#endif
	#ifdef LIT_AO
		#ifdef LIT_OCCLUDE_DIRECT
			occludeDiffuse(litArgs_ao);
		#endif
		#if LIT_OCCLUDE_SPECULAR != NONE
			occludeSpecular(litArgs_gloss, litArgs_ao, litArgs_worldNormal, dViewDirW);
		#endif
	#endif
	#if !defined(LIT_OPACITY_FADES_SPECULAR)
		#if LIT_BLEND_TYPE == NORMAL || LIT_BLEND_TYPE == PREMULTIPLIED
			float specLum = dot((dSpecularLight + dReflection.rgb * dReflection.a), vec3( 0.2126, 0.7152, 0.0722 ));
			#ifdef LIT_CLEARCOAT
				specLum += dot(ccSpecularLight * litArgs_clearcoat_specularity + ccReflection * litArgs_clearcoat_specularity, vec3( 0.2126, 0.7152, 0.0722 ));
			#endif
			litArgs_opacity = clamp(litArgs_opacity + gammaCorrectInput(specLum), 0.0, 1.0);
		#endif
		litArgs_opacity *= material_alphaFade;
	#endif
	#ifdef LIT_LIGHTMAP_BAKING
		#ifdef LIT_LIGHTMAP_BAKING_COLOR
			#include "bakeLmEndPS"
		#endif
		#ifdef LIT_LIGHTMAP_BAKING_DIR
			#include "bakeDirLmEndPS"
		#endif
	#else
		#include "endPS"
		#include "outputAlphaPS"
	#endif
	#ifdef LIT_MSDF
		gl_FragColor = applyMsdf(gl_FragColor);
	#endif
	#include "outputPS"
	#include "debugOutputPS"
	#ifdef LIT_SHADOW_CATCHER
		gl_FragColor.rgb = vec3(dShadowCatcher);
	#endif
	#include "outlineOutputPS"
}
`,litForwardDeclarationPS:`
vec3 sReflection;
vec3 dVertexNormalW;
vec3 dTangentW;
vec3 dBinormalW;
vec3 dViewDirW;
vec3 dReflDirW;
vec3 ccReflDirW;
vec3 dLightDirNormW;
float dAtten;
mat3 dTBN;
vec4 dReflection;
vec3 dDiffuseLight;
vec3 dSpecularLight;
float ccFresnel;
vec3 ccReflection;
vec3 ccSpecularLight;
float ccSpecularityNoFres;
vec3 sSpecularLight;
#ifdef LIT_DISPERSION
	uniform float material_dispersion;
#endif
#ifndef LIT_OPACITY_FADES_SPECULAR
	uniform float material_alphaFade;
#endif
#ifdef LIT_SSAO
	uniform sampler2D ssaoTexture;
	uniform vec2 ssaoTextureSizeInv;
#endif
#ifdef LIT_SHADOW_CATCHER
	float dShadowCatcher = 1.0;
#endif
#if LIGHT_COUNT > 0
	#include "lightDeclarationPS, LIGHT_COUNT"
#endif
#ifdef LIT_SPECULAR
	#if LIT_FRESNEL_MODEL == NONE && !defined(LIT_REFLECTIONS) && !defined(LIT_DIFFUSE_MAP) 
		#define LIT_OLD_AMBIENT
	#endif
#endif
#ifdef STD_LIGHTMAP_DIR
	uniform float bakeDir;
#endif
#ifdef LIT_LIGHTMAP_BAKING_ADD_AMBIENT
	uniform float ambientBakeOcclusionContrast;
	uniform float ambientBakeOcclusionBrightness;
#endif
`,litForwardMainPS:`
#include "sceneTexturesPS"
void main(void) {
	#include "litUserMainStartPS"
	dReflection = vec4(0);
	#ifdef LIT_CLEARCOAT
		ccSpecularLight = vec3(0);
		ccReflection = vec3(0);
	#endif
	#if LIT_NONE_SLICE_MODE == SLICED
		#include "startNineSlicedPS"
	#elif LIT_NONE_SLICE_MODE == TILED
		#include "startNineSlicedTiledPS"
	#endif
	#ifdef LIT_NEEDS_NORMAL
		#ifdef FLAT_SHADING
			dVertexNormalW = getFlatNormal(vPositionW);
		#else
			dVertexNormalW = normalize(vNormalW);
		#endif
		#ifdef LIT_TANGENTS
			#if defined(LIT_HEIGHTS) || defined(LIT_USE_NORMALS) || defined(LIT_USE_CLEARCOAT_NORMALS) || defined(LIT_GGX_SPECULAR)
				dTangentW = vTangentW;
				dBinormalW = vBinormalW;
			#endif
		#endif
		getViewDir();
		#ifdef LIT_TBN
			getTBN(dTangentW, dBinormalW, dVertexNormalW);
			#ifdef LIT_TWO_SIDED_LIGHTING
				handleTwoSidedLighting();
			#endif
		#endif
	#endif
	evaluateFrontend();
	#include "debugProcessFrontendPS"
	evaluateBackend();
	#ifdef SCENE_TEXTURE_DEPTH
		writeSceneTextureDepth(vLinearDepth, 1.0);
	#endif
	#include "litUserMainEndPS"
}
`,litForwardPostCodePS:`
#ifdef LIT_NEEDS_NORMAL
	#include "cubeMapRotatePS"
	#include "cubeMapProjectPS"
	#include "envProcPS"
#endif
#if defined(LIT_SPECULAR_OR_REFLECTION) || defined(LIT_REFRACTION)
	#ifdef LIT_METALNESS
		#include "metalnessModulatePS"
	#endif
	#ifdef LIT_IRIDESCENCE
		#include "iridescenceDiffractionPS"
	#endif
#endif
#if defined(LIT_SPECULAR_OR_REFLECTION) || defined(LIT_REFRACTION)
	#if LIT_FRESNEL_MODEL == SCHLICK
		#include "fresnelSchlickPS"
	#endif
#endif
#ifdef LIT_AO
	#include "aoDiffuseOccPS"
	#include "aoSpecOccPS"
#endif
#if LIT_REFLECTION_SOURCE == ENVATLASHQ
	#include "envAtlasPS"
	#include "reflectionEnvHQPS"
#elif LIT_REFLECTION_SOURCE == ENVATLAS
	#include "envAtlasPS"
	#include "reflectionEnvPS"
#elif LIT_REFLECTION_SOURCE == CUBEMAP
	#include "reflectionCubePS"
#elif LIT_REFLECTION_SOURCE == SPHEREMAP
	#include "reflectionSpherePS"
#endif
#ifdef LIT_REFLECTIONS
	#ifdef LIT_CLEARCOAT
		#include "reflectionCCPS"
	#endif
	#ifdef LIT_SHEEN
		#include "reflectionSheenPS"
	#endif
#endif
#ifdef LIT_REFRACTION
	#if defined(LIT_DYNAMIC_REFRACTION)
		#include "refractionDynamicPS"
	#elif LIT_REFLECTION_SOURCE != NONE
		#include "refractionCubePS"
	#endif
#endif
#ifdef LIT_SHEEN
	#include "lightSheenPS"
#endif
uniform vec3 material_ambient;
#ifdef LIT_SPECULAR
	#ifdef LIT_LIGHTING
		#ifdef LIT_GGX_SPECULAR
			#ifdef LIT_ANISOTROPY
				#include "lightSpecularAnisoGGXPS"
			#else
				#include "lightSpecularGGXPS"
			#endif
		#else
			#include "lightSpecularBlinnPS"
		#endif
	#endif
#endif
#include "combinePS"
#ifdef LIT_LIGHTMAP
	#include "lightmapAddPS"
#endif
#ifdef LIT_ADD_AMBIENT
	#include "ambientPS"
#endif
#ifdef LIT_MSDF
	#include "msdfPS"
#endif
#ifdef LIT_NEEDS_NORMAL
	#include "viewDirPS"
	#ifdef LIT_SPECULAR
		#ifdef LIT_ANISOTROPY
			#include "reflDirAnisoPS"
		#else
			#include "reflDirPS"
		#endif
	#endif
#endif
#include "lightingPS"
`,litForwardPreCodePS:`
#include "basePS"
#include "sphericalPS"
#include "decodePS"
#include "gammaPS"
#include "tonemappingPS"
#include "fogPS"
#if LIT_NONE_SLICE_MODE == SLICED
	#include "baseNineSlicedPS"
#elif LIT_NONE_SLICE_MODE == TILED
	#include "baseNineSlicedTiledPS"
#endif
#ifdef FLAT_SHADING
	#include "flatNormalPS"
#endif
#ifdef LIT_TBN
	#include "TBNPS"
	#ifdef LIT_TWO_SIDED_LIGHTING
		#include "twoSidedLightingPS"
	#endif
#endif
`,litMainPS:`
#include "varyingsPS"
#include "litUserDeclarationPS"
#include "frontendDeclPS"
#include "outlineDeclarationPS"
#if defined(PICK_PASS) || defined(PREPASS_PASS)
	#include "frontendCodePS"
	#include "litUserCodePS"
	#include "litOtherMainPS"
#elif defined(SHADOW_PASS)
	#include "frontendCodePS"
	#include "litUserCodePS"
	#include "litShadowMainPS"
#else
	#include "litForwardDeclarationPS"
	#include "litForwardPreCodePS"
	#include "frontendCodePS"
	#include "litForwardPostCodePS"
	#include "litForwardBackendPS"
	#include "litUserCodePS"
	#include "litForwardMainPS"
#endif
`,litMainVS:`
#include "varyingsVS"
#include  "litUserDeclarationVS"
#ifdef VERTEX_COLOR
	attribute vec4 vertex_color;
#endif
#ifdef NINESLICED
	varying vec2 vMask;
	varying vec2 vTiledUv;
	uniform mediump vec4 innerOffset;
	uniform mediump vec2 outerScale;
	uniform mediump vec4 atlasRect;
#endif
vec3 dPositionW;
mat4 dModelMatrix;
#include "transformCoreVS"
#ifdef UV0
	attribute vec2 vertex_texCoord0;
	#include "uv0VS"
#endif
#ifdef UV1
	attribute vec2 vertex_texCoord1;
	#include "uv1VS"
#endif
#ifdef LINEAR_DEPTH
	#ifndef VIEWMATRIX
	#define VIEWMATRIX
		uniform mat4 matrix_view;
	#endif
#endif
#include "transformVS"
#ifdef NORMALS
	#include "normalCoreVS"
	#include "normalVS"
#endif
#ifdef TANGENTS
	attribute vec4 vertex_tangent;
#endif
#include "uvTransformUniformsPS, UV_TRANSFORMS_COUNT"
#ifdef MSDF
	#include "msdfVS"
#endif
#include  "litUserCodeVS"
#ifdef VERTEX_COLOR
	vec3 decodeGamma(vec3 raw) {
		return pow(raw, vec3(2.2));
	}
	vec4 gammaCorrectInput(vec4 color) {
		return vec4(decodeGamma(color.xyz), color.w);
	}
#endif
void main(void) {
	#include "litUserMainStartVS"
	gl_PointSize = 1.0;
	gl_Position = getPosition();
	vPositionW = getWorldPosition();
	#ifdef NORMALS
		vNormalW = getNormal();
	#endif
	#ifdef TANGENTS
		vTangentW = normalize(dNormalMatrix * vertex_tangent.xyz);
		vBinormalW = cross(vNormalW, vTangentW) * vertex_tangent.w;
	#elif defined(GGX_SPECULAR)
		vObjectSpaceUpW = normalize(dNormalMatrix * vec3(0, 1, 0));
	#endif
	#ifdef UV0
		vec2 uv0 = getUv0();
		#ifdef UV0_UNMODIFIED
			vUv0 = uv0;
		#endif
	#endif
	#ifdef UV1
		vec2 uv1 = getUv1();
		#ifdef UV1_UNMODIFIED
			vUv1 = uv1;
		#endif
	#endif
	#include "uvTransformVS, UV_TRANSFORMS_COUNT"
	#ifdef VERTEX_COLOR
		#ifdef STD_VERTEX_COLOR_GAMMA
			vVertexColor = gammaCorrectInput(vertex_color);
		#else
			vVertexColor = vertex_color;
		#endif
	#endif
	#ifdef LINEAR_DEPTH
		vLinearDepth = -(matrix_view * vec4(vPositionW, 1.0)).z;
	#endif
	#ifdef MSDF
		unpackMsdfParams();
	#endif
	#include "litUserMainEndVS"
}
`,litOtherMainPS:`
#ifdef PICK_PASS
	#include "pickPS"
#endif
#ifdef PREPASS_PASS
	#include "floatAsUintPS"
#endif
void main(void) {
	#include "litUserMainStartPS"
	evaluateFrontend();
	#ifdef PICK_PASS
		pcFragColor0 = getPickOutput();
		#ifdef DEPTH_PICK_PASS
			pcFragColor1 = getPickDepth();
		#endif
	#endif
	#ifdef PREPASS_PASS
		gl_FragColor = float2vec4(vLinearDepth);
	#endif
	#include "litUserMainEndPS"
}
`,litShaderArgsPS:`
vec3 litArgs_albedo;
float litArgs_opacity;
vec3 litArgs_emission;
vec3 litArgs_worldNormal;
float litArgs_ao;
vec3 litArgs_lightmap;
vec3 litArgs_lightmapDir;
float litArgs_metalness;
vec3 litArgs_specularity;
float litArgs_specularityFactor;
float litArgs_gloss;
float litArgs_sheen_gloss;
vec3 litArgs_sheen_specularity;
float litArgs_transmission;
float litArgs_thickness;
float litArgs_ior;
float litArgs_dispersion;
float litArgs_iridescence_intensity;
float litArgs_iridescence_thickness;
vec3 litArgs_clearcoat_worldNormal;
float litArgs_clearcoat_specularity;
float litArgs_clearcoat_gloss;
`,litShaderCorePS:`
	#if LIT_NONE_SLICE_MODE == TILED
		const float textureBias = -1000.0;
	#else
		uniform float textureBias;
	#endif
	#include "litShaderArgsPS"
`,litShadowMainPS:`
#if LIGHT_TYPE != DIRECTIONAL
	uniform vec3 view_position;
	uniform float light_radius;
#endif
#if SHADOW_TYPE == PCSS_32F
	#include "linearizeDepthPS"
#endif
void main(void) {
	#include "litUserMainStartPS"
	evaluateFrontend();
	#ifdef PERSPECTIVE_DEPTH
		float depth = gl_FragCoord.z;
		#if SHADOW_TYPE == PCSS_32F
			#if LIGHT_TYPE != DIRECTIONAL
				depth = linearizeDepthWithParams(depth, camera_params);
			#endif
		#endif
	#else
		float depth = min(distance(view_position, vPositionW) / light_radius, 0.99999);
		#define MODIFIED_DEPTH
	#endif
	#if SHADOW_TYPE == VSM_16F || SHADOW_TYPE == VSM_32F
		if (!(depth >= 0.0 && depth <= 1.0)) discard;
		#if SHADOW_TYPE == VSM_32F
			float exponent = 15.0;
		#else
			float exponent = 5.54;
		#endif
		depth = 2.0 * depth - 1.0;
		depth =  exp(exponent * depth);
		gl_FragColor = vec4(depth, depth*depth, 1.0, 1.0);
	#else
		#if SHADOW_TYPE == PCSS_32F
			gl_FragColor.r = depth;
		#else
			#ifdef MODIFIED_DEPTH
				gl_FragDepth = depth;
			#endif
			gl_FragColor = vec4(1.0);
		#endif
	#endif
	#include "litUserMainEndPS"
}
`,litUserDeclarationPS:``,litUserDeclarationVS:``,litUserCodePS:``,litUserCodeVS:``,litUserMainStartPS:``,litUserMainStartVS:``,litUserMainEndPS:``,litUserMainEndVS:``,ltcPS:`
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
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
struct Coords {
	vec3 coord0;
	vec3 coord1;
	vec3 coord2;
	vec3 coord3;
};
float LTC_EvaluateRect( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in Coords rectCoords) {
	vec3 v1 = rectCoords.coord1 - rectCoords.coord0;
	vec3 v2 = rectCoords.coord3 - rectCoords.coord0;
	
	vec3 lightNormal = cross( v1, v2 );
	float factor = sign(-dot( lightNormal, P - rectCoords.coord0 ));
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 =  factor * cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords.coord0 - P );
	coords[ 1 ] = mat * ( rectCoords.coord1 - P );
	coords[ 2 ] = mat * ( rectCoords.coord2 - P );
	coords[ 3 ] = mat * ( rectCoords.coord3 - P );
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
	return result;
}
Coords dLTCCoords;
Coords getLTCLightCoords(vec3 lightPos, vec3 halfWidth, vec3 halfHeight){
	Coords coords;
	coords.coord0 = lightPos + halfWidth - halfHeight;
	coords.coord1 = lightPos - halfWidth - halfHeight;
	coords.coord2 = lightPos - halfWidth + halfHeight;
	coords.coord3 = lightPos + halfWidth + halfHeight;
	return coords;
}
float dSphereRadius;
Coords getSphereLightCoords(vec3 lightPos, vec3 halfWidth, vec3 halfHeight){
	dSphereRadius = max(length(halfWidth), length(halfHeight));
	vec3 f = reflect(normalize(lightPos - view_position), vNormalW);
	vec3 w = normalize(cross(f, halfHeight));
	vec3 h = normalize(cross(f, w));
	return getLTCLightCoords(lightPos, w * dSphereRadius, h * dSphereRadius);
}
vec2 dLTCUV;
#ifdef LIT_CLEARCOAT
	vec2 ccLTCUV;
#endif
vec2 getLTCLightUV(float gloss, vec3 worldNormal, vec3 viewDir)
{
	float roughness = max((1.0 - gloss) * (1.0 - gloss), 0.001);
	return LTC_Uv( worldNormal, viewDir, roughness );
}
vec3 dLTCSpecFres;
#ifdef LIT_CLEARCOAT
	vec3 ccLTCSpecFres;
#endif
vec3 getLTCLightSpecFres(vec2 uv, vec3 specularity)
{
	vec4 t2 = texture2DLod(areaLightsLutTex2, uv, 0.0);
	return specularity * t2.x + ( vec3( 1.0 ) - specularity) * t2.y;
}
void calcLTCLightValues(float gloss, vec3 worldNormal, vec3 viewDir, vec3 specularity, float clearcoatGloss, vec3 clearcoatWorldNormal, float clearcoatSpecularity)
{
	dLTCUV = getLTCLightUV(gloss, worldNormal, viewDir);
	dLTCSpecFres = getLTCLightSpecFres(dLTCUV, specularity); 
#ifdef LIT_CLEARCOAT
	ccLTCUV = getLTCLightUV(clearcoatGloss, clearcoatWorldNormal, viewDir);
	ccLTCSpecFres = getLTCLightSpecFres(ccLTCUV, vec3(clearcoatSpecularity));
#endif
}
void calcRectLightValues(vec3 lightPos, vec3 halfWidth, vec3 halfHeight) {
	dLTCCoords = getLTCLightCoords(lightPos, halfWidth, halfHeight);
}
void calcDiskLightValues(vec3 lightPos, vec3 halfWidth, vec3 halfHeight) {
	calcRectLightValues(lightPos, halfWidth, halfHeight);
}
void calcSphereLightValues(vec3 lightPos, vec3 halfWidth, vec3 halfHeight) {
	dLTCCoords = getSphereLightCoords(lightPos, halfWidth, halfHeight);
}
vec3 SolveCubic(vec4 Coefficient)
{
	float pi = 3.14159;
	Coefficient.xyz /= Coefficient.w;
	Coefficient.yz /= 3.0;
	float A = Coefficient.w;
	float B = Coefficient.z;
	float C = Coefficient.y;
	float D = Coefficient.x;
	vec3 Delta = vec3(
		-Coefficient.z * Coefficient.z + Coefficient.y,
		-Coefficient.y * Coefficient.z + Coefficient.x,
		dot(vec2(Coefficient.z, -Coefficient.y), Coefficient.xy)
	);
	float Discriminant = dot(vec2(4.0 * Delta.x, -Delta.y), Delta.zy);
	vec2 xlc, xsc;
	{
		float A_a = 1.0;
		float C_a = Delta.x;
		float D_a = -2.0 * B * Delta.x + Delta.y;
		float Theta = atan(sqrt(Discriminant), -D_a) / 3.0;
		float x_1a = 2.0 * sqrt(-C_a) * cos(Theta);
		float x_3a = 2.0 * sqrt(-C_a) * cos(Theta + (2.0 / 3.0) * pi);
		float xl;
		if ((x_1a + x_3a) > 2.0 * B)
			xl = x_1a;
		else
			xl = x_3a;
		xlc = vec2(xl - B, A);
	}
	{
		float A_d = D;
		float C_d = Delta.z;
		float D_d = -D * Delta.y + 2.0 * C * Delta.z;
		float Theta = atan(D * sqrt(Discriminant), -D_d) / 3.0;
		float x_1d = 2.0 * sqrt(-C_d) * cos(Theta);
		float x_3d = 2.0 * sqrt(-C_d) * cos(Theta + (2.0 / 3.0) * pi);
		float xs;
		if (x_1d + x_3d < 2.0 * C)
			xs = x_1d;
		else
			xs = x_3d;
		xsc = vec2(-D, xs + C);
	}
	float E =  xlc.y * xsc.y;
	float F = -xlc.x * xsc.y - xlc.y * xsc.x;
	float G =  xlc.x * xsc.x;
	vec2 xmc = vec2(C * F - B * G, -B * F + C * E);
	vec3 Root = vec3(xsc.x / xsc.y, xmc.x / xmc.y, xlc.x / xlc.y);
	if (Root.x < Root.y && Root.x < Root.z)
		Root.xyz = Root.yxz;
	else if (Root.z < Root.x && Root.z < Root.y)
		Root.xyz = Root.xzy;
	return Root;
}
float LTC_EvaluateDisk(vec3 N, vec3 V, vec3 P, mat3 Minv, Coords points)
{
	vec3 T1 = normalize(V - N * dot(V, N));
	vec3 T2 = cross(N, T1);
	mat3 R = transposeMat3( mat3( T1, T2, N ) );
	vec3 L_[ 3 ];
	L_[ 0 ] = R * ( points.coord0 - P );
	L_[ 1 ] = R * ( points.coord1 - P );
	L_[ 2 ] = R * ( points.coord2 - P );
	vec3 C  = 0.5 * (L_[0] + L_[2]);
	vec3 V1 = 0.5 * (L_[1] - L_[2]);
	vec3 V2 = 0.5 * (L_[1] - L_[0]);
	C  = Minv * C;
	V1 = Minv * V1;
	V2 = Minv * V2;
	float a, b;
	float d11 = dot(V1, V1);
	float d22 = dot(V2, V2);
	float d12 = dot(V1, V2);
	if (abs(d12) / sqrt(d11 * d22) > 0.0001)
	{
		float tr = d11 + d22;
		float det = -d12 * d12 + d11 * d22;
		det = sqrt(det);
		float u = 0.5 * sqrt(tr - 2.0 * det);
		float v = 0.5 * sqrt(tr + 2.0 * det);
		float e_max = (u + v) * (u + v);
		float e_min = (u - v) * (u - v);
		vec3 V1_, V2_;
		if (d11 > d22)
		{
			V1_ = d12 * V1 + (e_max - d11) * V2;
			V2_ = d12 * V1 + (e_min - d11) * V2;
		}
		else
		{
			V1_ = d12*V2 + (e_max - d22)*V1;
			V2_ = d12*V2 + (e_min - d22)*V1;
		}
		a = 1.0 / e_max;
		b = 1.0 / e_min;
		V1 = normalize(V1_);
		V2 = normalize(V2_);
	}
	else
	{
		a = 1.0 / dot(V1, V1);
		b = 1.0 / dot(V2, V2);
		V1 *= sqrt(a);
		V2 *= sqrt(b);
	}
	vec3 V3 = normalize(cross(V1, V2));
	if (dot(C, V3) < 0.0)
		V3 *= -1.0;
	float L  = dot(V3, C);
	float x0 = dot(V1, C) / L;
	float y0 = dot(V2, C) / L;
	float E1 = inversesqrt(a);
	float E2 = inversesqrt(b);
	a *= L * L;
	b *= L * L;
	float c0 = a * b;
	float c1 = a * b * (1.0 + x0 * x0 + y0 * y0) - a - b;
	float c2 = 1.0 - a * (1.0 + x0 * x0) - b * (1.0 + y0 * y0);
	float c3 = 1.0;
	vec3 roots = SolveCubic(vec4(c0, c1, c2, c3));
	float e1 = roots.x;
	float e2 = roots.y;
	float e3 = roots.z;
	vec3 avgDir = vec3(a * x0 / (a - e2), b * y0 / (b - e2), 1.0);
	mat3 rotate = mat3(V1, V2, V3);
	avgDir = rotate * avgDir;
	avgDir = normalize(avgDir);
	float L1 = sqrt(-e2 / e3);
	float L2 = sqrt(-e2 / e1);
	float formFactor = max(0.0, L1 * L2 * inversesqrt((1.0 + L1 * L1) * (1.0 + L2 * L2)));
	
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	vec2 uv = vec2(avgDir.z * 0.5 + 0.5, formFactor);
	uv = uv*LUT_SCALE + LUT_BIAS;
	float scale = texture2DLod(areaLightsLutTex2, uv, 0.0).w;
	return formFactor*scale;
}
float FixNan(float value) {
	#ifdef WEBGPU
		return value != value ? 0.0 : value;
	#else
		return isnan(value) ? 0.0 : value;
	#endif
}
float getRectLightDiffuse(vec3 worldNormal, vec3 viewDir, vec3 lightDir, vec3 lightDirNorm) {
	return LTC_EvaluateRect( worldNormal, viewDir, vPositionW, mat3( 1.0 ), dLTCCoords );
}
float getDiskLightDiffuse(vec3 worldNormal, vec3 viewDir, vec3 lightDir, vec3 lightDirNorm) {
	return FixNan(LTC_EvaluateDisk( worldNormal, viewDir, vPositionW, mat3( 1.0 ), dLTCCoords ));
}
float getSphereLightDiffuse(vec3 worldNormal, vec3 viewDir, vec3 lightDir, vec3 lightDirNorm) {
	float falloff = dSphereRadius / (dot(lightDir, lightDir) + dSphereRadius);
	return FixNan(getLightDiffuse(worldNormal, viewDir, lightDirNorm) * falloff);
}
mat3 getLTCLightInvMat(vec2 uv)
{
	vec4 t1 = texture2DLod(areaLightsLutTex1, uv, 0.0);
	return mat3(
		vec3( t1.x, 0, t1.y ),
		vec3(	0, 1,	0 ),
		vec3( t1.z, 0, t1.w )
	);
}
float calcRectLightSpecular(vec3 worldNormal, vec3 viewDir, vec2 uv) {
	mat3 mInv = getLTCLightInvMat(uv);
	return LTC_EvaluateRect( worldNormal, viewDir, vPositionW, mInv, dLTCCoords );
}
float getRectLightSpecular(vec3 worldNormal, vec3 viewDir) {
	return calcRectLightSpecular(worldNormal, viewDir, dLTCUV);
}
float calcDiskLightSpecular(vec3 worldNormal, vec3 viewDir, vec2 uv) {
	mat3 mInv = getLTCLightInvMat(uv);
	return LTC_EvaluateDisk( worldNormal, viewDir, vPositionW, mInv, dLTCCoords );
}
float getDiskLightSpecular(vec3 worldNormal, vec3 viewDir) {
	return calcDiskLightSpecular(worldNormal, viewDir, dLTCUV);
}
float getSphereLightSpecular(vec3 worldNormal, vec3 viewDir) {
	return calcDiskLightSpecular(worldNormal, viewDir, dLTCUV);
}
`,metalnessPS:`
#ifdef STD_METALNESS_CONSTANT
uniform float material_metalness;
#endif
void getMetalness() {
	float metalness = 1.0;
	#ifdef STD_METALNESS_CONSTANT
	metalness *= material_metalness;
	#endif
	#ifdef STD_METALNESS_TEXTURE
	metalness *= texture2DBias({STD_METALNESS_TEXTURE_NAME}, {STD_METALNESS_TEXTURE_UV}, textureBias).{STD_METALNESS_TEXTURE_CHANNEL};
	#endif
	#ifdef STD_METALNESS_VERTEX
	metalness *= saturate(vVertexColor.{STD_METALNESS_VERTEX_CHANNEL});
	#endif
	dMetalness = metalness;
}
`,metalnessModulatePS:`
vec3 getSpecularModulate(in vec3 specularity, in vec3 albedo, in float metalness, in float f0, in float specularityFactor) {
	vec3 dielectricF0 = f0 * specularity * specularityFactor;
	return mix(dielectricF0, albedo, metalness);
}
vec3 getAlbedoModulate(in vec3 albedo, in float metalness) {
	return albedo * (1.0 - metalness);
}
`,morphPS:`
	varying vec2 uv0;
	uniform sampler2DArray morphTexture;
	uniform highp float morphFactor[{MORPH_TEXTURE_MAX_COUNT}];
	uniform highp uint morphIndex[{MORPH_TEXTURE_MAX_COUNT}];
	uniform int count;
	#ifdef MORPH_INT
		uniform vec3 aabbSize;
		uniform vec3 aabbMin;
	#endif
	void main (void) {
		highp vec3 color = vec3(0, 0, 0);
		ivec2 pixelCoords = ivec2(uv0 * vec2(textureSize(morphTexture, 0).xy));
		
		for (int i = 0; i < count; i++) {
			uint textureIndex = morphIndex[i];
			vec3 delta = texelFetch(morphTexture, ivec3(pixelCoords, int(textureIndex)), 0).xyz;
			color += morphFactor[i] * delta;
		}
		#ifdef MORPH_INT
			color = (color - aabbMin) / aabbSize * 65535.0;
			gl_FragColor = uvec4(color, 1u);
		#else
			gl_FragColor = vec4(color, 1.0);
		#endif
	}
`,morphVS:`
	attribute vec2 vertex_position;
	varying vec2 uv0;
	void main(void) {
		gl_Position = vec4(vertex_position, 0.5, 1.0);
		uv0 = vertex_position.xy * 0.5 + 0.5;
	}
`,msdfPS:`
uniform sampler2D texture_msdfMap;
float median(float r, float g, float b) {
	return max(min(r, g), min(max(r, g), b));
}
uniform float font_sdfIntensity;
uniform float font_pxrange;
#ifndef LIT_MSDF_TEXT_ATTRIBUTE
	uniform vec4 outline_color;
	uniform float outline_thickness;
	uniform vec4 shadow_color;
	uniform vec2 shadow_offset;
#else
	varying vec4 outline_color;
	varying float outline_thickness;
	varying vec4 shadow_color;
	varying vec2 shadow_offset;
#endif
vec4 applyMsdf(vec4 color) {
	float srcAlpha = max(color.a, 0.0001);
	color.rgb = gammaCorrectInput(color.rgb / srcAlpha) * srcAlpha;
	vec3 tsample = texture2D(texture_msdfMap, vUv0).rgb;
	vec2 uvShdw = vUv0 - shadow_offset;
	vec3 ssample = texture2D(texture_msdfMap, uvShdw).rgb;
	float sigDist = median(tsample.r, tsample.g, tsample.b);
	float sigDistShdw = median(ssample.r, ssample.g, ssample.b);
	float edge = 0.5 - 0.5 * font_sdfIntensity;
	vec2 unitRange = vec2(font_pxrange) / vec2(textureSize(texture_msdfMap, 0));
	float screenPxRange = max(0.5 * dot(unitRange, 1.0 / max(fwidth(vUv0), vec2(1e-6))), 2.5);
	float inside = clamp(screenPxRange * (sigDist - edge) + 0.5, 0.0, 1.0);
	float outline = clamp(screenPxRange * (sigDist + outline_thickness - edge) + 0.5, 0.0, 1.0);
	float shadow = clamp(screenPxRange * (sigDistShdw + outline_thickness - edge) + 0.5, 0.0, 1.0);
	vec4 tcolor = (outline > inside) ? outline * vec4(outline_color.a * outline_color.rgb, outline_color.a) : vec4(0.0);
	tcolor = mix(tcolor, color, inside);
	vec4 scolor = (shadow > outline) ? shadow * vec4(shadow_color.a * shadow_color.rgb, shadow_color.a) : tcolor;
	tcolor = mix(scolor, tcolor, outline);
	tcolor.rgb = gammaCorrectOutput(tcolor.rgb / max(tcolor.a, 0.0001)) * tcolor.a;
	
	return tcolor;
}
`,msdfVS:`
attribute vec3 vertex_outlineParameters;
attribute vec3 vertex_shadowParameters;
varying vec4 outline_color;
varying float outline_thickness;
varying vec4 shadow_color;
varying vec2 shadow_offset;
void unpackMsdfParams() {
	vec3 little = mod(vertex_outlineParameters, 256.);
	vec3 big = (vertex_outlineParameters - little) / 256.;
	outline_color.rb = little.xy / 255.;
	outline_color.ga = big.xy / 255.;
	outline_thickness = little.z / 255. * 0.2;
	little = mod(vertex_shadowParameters, 256.);
	big = (vertex_shadowParameters - little) / 256.;
	shadow_color.rb = little.xy / 255.;
	shadow_color.ga = big.xy / 255.;
	shadow_offset = (vec2(little.z, big.z) / 127. - 1.) * 0.005;
}
`,normalVS:`
mat3 dNormalMatrix;
vec3 getNormal() {
	dNormalMatrix = getNormalMatrix(dModelMatrix);
	vec3 localNormal = getLocalNormal(vertex_normal);
	return normalize(dNormalMatrix * localNormal);
}
`,normalCoreVS:`
attribute vec3 vertex_normal;
uniform mat3 matrix_normal;
#ifdef MORPHING_NORMAL
	#ifdef MORPHING_INT
		uniform highp usampler2D morphNormalTex;
	#else
		uniform highp sampler2D morphNormalTex;
	#endif
#endif
vec3 getLocalNormal(vec3 vertexNormal) {
	vec3 localNormal = vertex_normal;
	#ifdef MORPHING_NORMAL
		ivec2 morphUV = getTextureMorphCoords();
		#ifdef MORPHING_INT
			vec3 morphNormal = vec3(texelFetch(morphNormalTex, ivec2(morphUV), 0).xyz) / 65535.0 * 2.0 - 1.0;
		#else
			vec3 morphNormal = texelFetch(morphNormalTex, ivec2(morphUV), 0).xyz;
		#endif
		localNormal += morphNormal;
	#endif
	return localNormal;
}
#if defined(SKIN) || defined(BATCH)
	mat3 getNormalMatrix(mat4 modelMatrix) {
		return mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz);
	}
#elif defined(INSTANCING)
	mat3 getNormalMatrix(mat4 modelMatrix) {
		return mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz);
	}
#else
	mat3 getNormalMatrix(mat4 modelMatrix) {
		return matrix_normal;
	}
#endif
`,normalMapPS:`
#ifdef STD_NORMAL_TEXTURE
	uniform float material_bumpiness;
#endif
#ifdef STD_NORMALDETAIL_TEXTURE
	uniform float material_normalDetailMapBumpiness;
	vec3 blendNormals(vec3 n1, vec3 n2) {
		n1 += vec3(0, 0, 1);
		n2 *= vec3(-1, -1, 1);
		return n1 * dot(n1, n2) / n1.z - n2;
	}
#endif
void getNormal() {
#ifdef STD_NORMAL_TEXTURE
	vec3 normalMap = {STD_NORMAL_TEXTURE_DECODE}(texture2DBias({STD_NORMAL_TEXTURE_NAME}, {STD_NORMAL_TEXTURE_UV}, textureBias));
	normalMap = mix(vec3(0.0, 0.0, 1.0), normalMap, material_bumpiness);
	#ifdef STD_NORMALDETAIL_TEXTURE
		vec3 normalDetailMap = {STD_NORMALDETAIL_TEXTURE_DECODE}(texture2DBias({STD_NORMALDETAIL_TEXTURE_NAME}, {STD_NORMALDETAIL_TEXTURE_UV}, textureBias));
		normalDetailMap = mix(vec3(0.0, 0.0, 1.0), normalDetailMap, material_normalDetailMapBumpiness);
		normalMap = blendNormals(normalMap, normalDetailMap);
	#endif
	dNormalW = normalize(dTBN * normalMap);
#else
	dNormalW = dVertexNormalW;
#endif
}
`,opacityPS:`
uniform float material_opacity;
uniform float material_alphaDitherScale;
void getOpacity() {
	dAlpha = material_opacity;
	#ifdef STD_OPACITY_TEXTURE
	dAlpha *= texture2DBias({STD_OPACITY_TEXTURE_NAME}, {STD_OPACITY_TEXTURE_UV}, textureBias).{STD_OPACITY_TEXTURE_CHANNEL};
	#endif
	#ifdef STD_OPACITY_VERTEX
	dAlpha *= clamp(vVertexColor.{STD_OPACITY_VERTEX_CHANNEL}, 0.0, 1.0);
	#endif
}
`,opacityDitherPS:`
#if STD_OPACITY_DITHER == BAYER2 || STD_OPACITY_DITHER == BAYER4 || STD_OPACITY_DITHER == BAYER8 || STD_OPACITY_DITHER == BAYER16
	#include "bayerPS"
#endif
uniform vec4 blueNoiseJitter;
#if STD_OPACITY_DITHER == BLUENOISE
	uniform sampler2D blueNoiseTex32;
#endif
void opacityDither(float alpha, float id) {
	if (alpha <= 0.0)
		discard;
	if (alpha >= 1.0)
		return;
	#if STD_OPACITY_DITHER == BAYER8
		float noise = bayer8(floor(mod(gl_FragCoord.xy + blueNoiseJitter.xy + id, 8.0))) / 64.0;
	#else
		#if STD_OPACITY_DITHER == BAYER2
			float noise = bayer2(floor(mod(gl_FragCoord.xy + blueNoiseJitter.xy + id, 2.0))) / 4.0;
		#endif
		#if STD_OPACITY_DITHER == BAYER4
			float noise = bayer4(floor(mod(gl_FragCoord.xy + blueNoiseJitter.xy + id, 4.0))) / 16.0;
		#endif
		#if STD_OPACITY_DITHER == BAYER16
			float noise = bayer16(floor(mod(gl_FragCoord.xy + blueNoiseJitter.xy + id, 16.0))) / 256.0;
		#endif
		#if STD_OPACITY_DITHER == BLUENOISE
			vec2 uv = fract(gl_FragCoord.xy / 32.0 + blueNoiseJitter.xy + id);
			float noise = texture2DLod(blueNoiseTex32, uv, 0.0).y;
		#endif
		#if STD_OPACITY_DITHER == IGNNOISE
			vec3 magic = vec3(0.06711056, 0.00583715, 52.9829189);
			float noise = fract(magic.z * fract(dot(gl_FragCoord.xy + blueNoiseJitter.xy + id, magic.xy)));
		#endif
	#endif
	noise = pow(noise, 2.2);
	if (alpha < noise)
		discard;
}
`,outlineDeclarationPS:`
#ifdef PCOUTLINE_PASS
uniform vec3 pcOutlineColor;
#endif
`,outlineOutputPS:`
#ifdef PCOUTLINE_PASS
gl_FragColor.rgb = gammaCorrectOutput(pcOutlineColor);
#endif
`,outputPS:`
`,outputAlphaPS:`
#if LIT_BLEND_TYPE == NORMAL || LIT_BLEND_TYPE == ADDITIVEALPHA || defined(LIT_ALPHA_TO_COVERAGE)
	gl_FragColor.a = litArgs_opacity;
#elif LIT_BLEND_TYPE == PREMULTIPLIED
	gl_FragColor.rgb *= litArgs_opacity;
	gl_FragColor.a = litArgs_opacity;
#else
	gl_FragColor.a = 1.0;
#endif
`,outputTex2DPS:`
varying vec2 vUv0;
uniform sampler2D source;
void main(void) {
	gl_FragColor = texture2D(source, vUv0);
}
`,sheenPS:`
uniform vec3 material_sheen;
void getSheen() {
	vec3 sheenColor = material_sheen;
	#ifdef STD_SHEEN_TEXTURE
	sheenColor *= {STD_SHEEN_TEXTURE_DECODE}(texture2DBias({STD_SHEEN_TEXTURE_NAME}, {STD_SHEEN_TEXTURE_UV}, textureBias)).{STD_SHEEN_TEXTURE_CHANNEL};
	#endif
	#ifdef STD_SHEEN_VERTEX
	sheenColor *= saturate(vVertexColor.{STD_SHEEN_VERTEX_CHANNEL});
	#endif
	sSpecularity = sheenColor;
}
`,sheenGlossPS:`
uniform float material_sheenGloss;
void getSheenGlossiness() {
	float sheenGlossiness = material_sheenGloss;
	#ifdef STD_SHEENGLOSS_TEXTURE
	sheenGlossiness *= texture2DBias({STD_SHEENGLOSS_TEXTURE_NAME}, {STD_SHEENGLOSS_TEXTURE_UV}, textureBias).{STD_SHEENGLOSS_TEXTURE_CHANNEL};
	#endif
	#ifdef STD_SHEENGLOSS_VERTEX
	sheenGlossiness *= saturate(vVertexColor.{STD_SHEENGLOSS_VERTEX_CHANNEL});
	#endif
	#ifdef STD_SHEENGLOSS_INVERT
	sheenGlossiness = 1.0 - sheenGlossiness;
	#endif
	sGlossiness = sheenGlossiness + 0.0000001;
}
`,parallaxPS:`
uniform float material_heightMapFactor;
uniform float material_heightMapBase;
#if STD_PARALLAX == OCCLUSION
	uniform float material_parallaxSamples;
	const float parallaxMaxSlope = 5.0;
	const float parallaxTexelsPerStep = 2.0;
	const float parallaxFadeMin = 1.0;
	const float parallaxFadeMax = 3.0;
	const int parallaxRefineSteps = 5;
#endif
void getParallax() {
	float parallaxScale = material_heightMapFactor;
	vec3 viewDirT = normalize(dViewDirW * dTBN);
	vec2 viewDirUv = vec2(viewDirT.x, -viewDirT.y);
	#if STD_PARALLAX == OCCLUSION
		vec2 march = -parallaxScale * viewDirUv / max(viewDirT.z, 0.0001);
		float marchLength = length(march);
		float maxMarchLength = parallaxScale * parallaxMaxSlope;
		vec2 uvSpan = marchLength > maxMarchLength ? march * (maxMarchLength / marchLength) : march;
		float geomDepth = 1.0 - material_heightMapBase;
		vec2 entryUv = {STD_HEIGHT_TEXTURE_UV} - uvSpan * geomDepth;
		vec2 heightMapSize = vec2(textureSize({STD_HEIGHT_TEXTURE_NAME}, 0));
		vec2 uvTexels = {STD_HEIGHT_TEXTURE_UV} * heightMapSize;
		vec2 texelsDx = dFdx(uvTexels);
		vec2 texelsDy = dFdy(uvTexels);
		float lod = max(0.0, 0.5 * log2(max(dot(texelsDx, texelsDx), dot(texelsDy, texelsDy))));
		float marchTexels = length(uvSpan * heightMapSize) / exp2(lod);
		float fade = clamp((marchTexels - parallaxFadeMin) / (parallaxFadeMax - parallaxFadeMin), 0.0, 1.0);
		dUvOffset = vec2(0.0);
		#ifdef STD_PARALLAX_SELF_SHADOW
			dParallaxHitDepth = 0.0;
			dParallaxLod = lod;
		#endif
		if (fade > 0.0) {
			float steps = clamp(marchTexels / parallaxTexelsPerStep, 1.0, material_parallaxSamples);
			float stepSize = 1.0 / steps;
			float rayDepth = 0.0;
			float surfaceDepth = 1.0 - texture2DLod({STD_HEIGHT_TEXTURE_NAME}, entryUv, lod).{STD_HEIGHT_TEXTURE_CHANNEL};
			float prevRayDepth = rayDepth;
			float prevSurfaceDepth = surfaceDepth;
			for (float i = 0.0; i < steps; i += 1.0) {
				if (rayDepth >= surfaceDepth) {
					break;
				}
				prevRayDepth = rayDepth;
				prevSurfaceDepth = surfaceDepth;
				rayDepth += stepSize;
				surfaceDepth = 1.0 - texture2DLod({STD_HEIGHT_TEXTURE_NAME}, entryUv + uvSpan * rayDepth, lod).{STD_HEIGHT_TEXTURE_CHANNEL};
			}
			float hitDepth = rayDepth;
			if (rayDepth >= surfaceDepth) {
				float interval = (rayDepth - prevRayDepth) * 0.5;
				hitDepth = rayDepth - interval;
				for (int i = 0; i < parallaxRefineSteps; i++) {
					interval *= 0.5;
					float refineDepth = 1.0 - texture2DLod({STD_HEIGHT_TEXTURE_NAME}, entryUv + uvSpan * hitDepth, lod).{STD_HEIGHT_TEXTURE_CHANNEL};
					hitDepth += hitDepth >= refineDepth ? -interval : interval;
				}
			}
			float hitBelowTop = clamp(hitDepth, 0.0, 1.0);
			dUvOffset = uvSpan * ((hitBelowTop - geomDepth) * fade);
			#ifdef STD_PARALLAX_SELF_SHADOW
				dParallaxHitDepth = hitBelowTop * fade;
			#endif
		}
	#else
		float height = texture2DBias({STD_HEIGHT_TEXTURE_NAME}, {STD_HEIGHT_TEXTURE_UV}, textureBias).{STD_HEIGHT_TEXTURE_CHANNEL};
		height = (height - material_heightMapBase) * parallaxScale;
		dUvOffset = height * viewDirUv;
	#endif
}
#ifdef STD_PARALLAX_SELF_SHADOW
	uniform float material_parallaxShadowSamples;
	const float parallaxShadowHardness = 16.0;
	const float parallaxShadowMaxSlope = 20.0;
	float getParallaxSelfShadow(vec3 lightDirNormW) {
		if (dParallaxHitDepth <= 0.0) {
			return 1.0;
		}
		vec3 lightDirT = normalize(-lightDirNormW * dTBN);
		vec2 lightDirUv = vec2(lightDirT.x, -lightDirT.y);
		if (lightDirT.z <= 0.0) {
			return 1.0;
		}
		float parallaxScale = material_heightMapFactor;
		vec2 climb = parallaxScale * lightDirUv / lightDirT.z;
		float climbLength = length(climb);
		float maxClimbLength = parallaxScale * parallaxShadowMaxSlope;
		vec2 uvPerDepth = climbLength > maxClimbLength ? climb * (maxClimbLength / climbLength) : climb;
		vec2 heightMapSize = vec2(textureSize({STD_HEIGHT_TEXTURE_NAME}, 0));
		float marchTexels = length(uvPerDepth * dParallaxHitDepth * heightMapSize) / exp2(dParallaxLod);
		float steps = clamp(marchTexels / parallaxTexelsPerStep, 1.0, material_parallaxShadowSamples);
		vec2 hitUv = {STD_HEIGHT_TEXTURE_UV} + dUvOffset;
		float blocked = 0.0;
		for (float i = 0.0; i < steps; i += 1.0) {
			float t = (i + 1.0) / steps;
			float climbed = dParallaxHitDepth * t;
			float rayDepth = dParallaxHitDepth - climbed;
			float fieldDepth = 1.0 - texture2DLod({STD_HEIGHT_TEXTURE_NAME}, hitUv + uvPerDepth * climbed, dParallaxLod).{STD_HEIGHT_TEXTURE_CHANNEL};
			blocked = max(blocked, max(0.0, rayDepth - fieldDepth) * max(0.0, 1.0 - t));
		}
		return clamp(1.0 - blocked * parallaxShadowHardness, 0.0, 1.0);
	}
#endif
`,pickPS:`
vec4 encodePickOutput(uint id) {
	const vec4 inv = vec4(1.0 / 255.0);
	const uvec4 shifts = uvec4(16, 8, 0, 24);
	uvec4 col = (uvec4(id) >> shifts) & uvec4(0xff);
	return vec4(col) * inv;
}
#ifndef PICK_CUSTOM_ID
	uniform uint meshInstanceId;
	vec4 getPickOutput() {
		return encodePickOutput(meshInstanceId);
	}
#endif
#ifdef DEPTH_PICK_PASS
	#include "floatAsUintPS"
	#ifndef CAMERAPLANES
		#define CAMERAPLANES
		uniform vec4 camera_params;
	#endif
	vec4 getPickDepth() {
		float linearDepth;
		if (camera_params.w > 0.5) {
			linearDepth = gl_FragCoord.z;
		} else {
			float viewDist = 1.0 / gl_FragCoord.w;
			linearDepth = (viewDist - camera_params.z) / (camera_params.y - camera_params.z);
		}
		return float2uint(linearDepth);
	}
#endif
`,reflDirPS:`
void getReflDir(vec3 worldNormal, vec3 viewDir, float gloss, mat3 tbn) {
	dReflDirW = normalize(-reflect(viewDir, worldNormal));
}
`,reflDirAnisoPS:`
void getReflDir(vec3 worldNormal, vec3 viewDir, float gloss, mat3 tbn) {
	float roughness = sqrt(1.0 - min(gloss, 1.0));
	vec2 direction = dAnisotropyRotation;
	vec3 anisotropicT = normalize(tbn * vec3(direction, 0.0));
	vec3 anisotropicB = normalize(cross(tbn[2], anisotropicT));
	float anisotropy = dAnisotropy;
	vec3 anisotropicDirection = anisotropicB;
	vec3 anisotropicTangent = cross(anisotropicDirection, viewDir);
	vec3 anisotropicNormal = cross(anisotropicTangent, anisotropicDirection);
	float bendFactor = 1.0 - anisotropy * (1.0 - roughness);
	float bendFactor4 = bendFactor * bendFactor * bendFactor * bendFactor;
	vec3 bentNormal = normalize(mix(normalize(anisotropicNormal), normalize(worldNormal), bendFactor4));
	dReflDirW = reflect(-viewDir, bentNormal);
}
`,reflectionCCPS:`
#ifdef LIT_CLEARCOAT
void addReflectionCC(vec3 reflDir, float gloss) {
	ccReflection += calcReflection(reflDir, gloss);
}
#endif
`,reflectionCubePS:`
uniform samplerCube texture_cubeMap;
uniform float material_reflectivity;
vec3 calcReflection(vec3 reflDir, float gloss) {
	vec3 lookupVec = cubeMapProject(reflDir);
	lookupVec.x *= -1.0;
	return {reflectionDecode}(textureCube(texture_cubeMap, lookupVec));
}
void addReflection(vec3 reflDir, float gloss) {   
	dReflection += vec4(calcReflection(reflDir, gloss), material_reflectivity);
}
`,reflectionEnvHQPS:`
#ifndef ENV_ATLAS
	#define ENV_ATLAS
	uniform sampler2D texture_envAtlas;
#endif
uniform samplerCube texture_cubeMap;
uniform float material_reflectivity;
vec3 calcReflection(vec3 reflDir, float gloss) {
	vec3 dir = cubeMapProject(reflDir) * vec3(-1.0, 1.0, 1.0);
	vec2 uv = toSphericalUv(dir);
	float level = saturate(1.0 - gloss) * 5.0;
	float ilevel = floor(level);
	float flevel = level - ilevel;
	vec3 sharp = {reflectionCubemapDecode}(textureCube(texture_cubeMap, dir));
	vec3 roughA = {reflectionDecode}(texture2D(texture_envAtlas, mapRoughnessUv(uv, ilevel)));
	vec3 roughB = {reflectionDecode}(texture2D(texture_envAtlas, mapRoughnessUv(uv, ilevel + 1.0)));
	return processEnvironment(mix(sharp, mix(roughA, roughB, flevel), min(level, 1.0)));
}
void addReflection(vec3 reflDir, float gloss) {   
	dReflection += vec4(calcReflection(reflDir, gloss), material_reflectivity);
}
`,reflectionEnvPS:`
#ifndef ENV_ATLAS
#define ENV_ATLAS
	uniform sampler2D texture_envAtlas;
#endif
uniform float material_reflectivity;
float shinyMipLevel(vec2 uv) {
	vec2 dx = dFdx(uv);
	vec2 dy = dFdy(uv);
	vec2 uv2 = vec2(fract(uv.x + 0.5), uv.y);
	vec2 dx2 = dFdx(uv2);
	vec2 dy2 = dFdy(uv2);
	float maxd = min(max(dot(dx, dx), dot(dy, dy)), max(dot(dx2, dx2), dot(dy2, dy2)));
	return clamp(0.5 * log2(maxd) - 1.0 + textureBias, 0.0, 5.0);
}
vec3 calcReflection(vec3 reflDir, float gloss) {
	vec3 dir = cubeMapProject(reflDir) * vec3(-1.0, 1.0, 1.0);
	vec2 uv = toSphericalUv(dir);
	float level = saturate(1.0 - gloss) * 5.0;
	float ilevel = floor(level);
	float level2 = shinyMipLevel(uv * atlasSize);
	float ilevel2 = floor(level2);
	vec2 uv0, uv1;
	float weight;
	if (ilevel == 0.0) {
		uv0 = mapShinyUv(uv, ilevel2);
		uv1 = mapShinyUv(uv, ilevel2 + 1.0);
		weight = level2 - ilevel2;
	} else {
		uv0 = uv1 = mapRoughnessUv(uv, ilevel);
		weight = 0.0;
	}
	vec3 linearA = {reflectionDecode}(texture2D(texture_envAtlas, uv0));
	vec3 linearB = {reflectionDecode}(texture2D(texture_envAtlas, uv1));
	vec3 linear0 = mix(linearA, linearB, weight);
	vec3 linear1 = {reflectionDecode}(texture2D(texture_envAtlas, mapRoughnessUv(uv, ilevel + 1.0)));
	return processEnvironment(mix(linear0, linear1, level - ilevel));
}
void addReflection(vec3 reflDir, float gloss) {   
	dReflection += vec4(calcReflection(reflDir, gloss), material_reflectivity);
}
`,reflectionSpherePS:`
#ifndef VIEWMATRIX
	#define VIEWMATRIX
	uniform mat4 matrix_view;
#endif
uniform sampler2D texture_sphereMap;
uniform float material_reflectivity;
vec3 calcReflection(vec3 reflDir, float gloss) {
	vec3 reflDirV = (mat3(matrix_view) * reflDir);
	float m = 2.0 * sqrt(dot(reflDirV.xy, reflDirV.xy) + (reflDirV.z + 1.0) * (reflDirV.z + 1.0));
	vec2 sphereMapUv = reflDirV.xy / m + 0.5;
	return {reflectionDecode}(texture2D(texture_sphereMap, sphereMapUv));
}
void addReflection(vec3 reflDir, float gloss) {   
	dReflection += vec4(calcReflection(reflDir, gloss), material_reflectivity);
}
`,reflectionSheenPS:`
void addReflectionSheen(vec3 worldNormal, vec3 viewDir, float gloss) {
	float NoV = dot(worldNormal, viewDir);
	float alphaG = gloss * gloss;
	float a = gloss < 0.25 ? -339.2 * alphaG + 161.4 * gloss - 25.9 : -8.48 * alphaG + 14.3 * gloss - 9.95;
	float b = gloss < 0.25 ? 44.0 * alphaG - 23.7 * gloss + 3.26 : 1.97 * alphaG - 3.27 * gloss + 0.72;
	float DG = exp( a * NoV + b ) + ( gloss < 0.25 ? 0.0 : 0.1 * ( gloss - 0.25 ) );
	sReflection += calcReflection(worldNormal, 0.0) * saturate(DG);
}
`,refractionCubePS:`
vec3 refract2(vec3 viewVec, vec3 normal, float IOR) {
	float vn = dot(viewVec, normal);
	float k = 1.0 - IOR * IOR * (1.0 - vn * vn);
	vec3 refrVec = IOR * viewVec - (IOR * vn + sqrt(k)) * normal;
	return refrVec;
}
void addRefraction(
	vec3 worldNormal, 
	vec3 viewDir, 
	float thickness, 
	float gloss, 
	vec3 specularity, 
	vec3 albedo, 
	float transmission,
	float refractionIndex,
	float dispersion
#if defined(LIT_IRIDESCENCE)
	, vec3 iridescenceFresnel,
	float iridescenceIntensity
#endif 
) {
	vec4 tmpRefl = dReflection;
	vec3 reflectionDir = refract2(-viewDir, worldNormal, refractionIndex);
	dReflection = vec4(0);
	addReflection(reflectionDir, gloss);
	dDiffuseLight = mix(dDiffuseLight, dReflection.rgb * albedo, transmission);
	dReflection = tmpRefl;
}
`,refractionDynamicPS:`
uniform float material_invAttenuationDistance;
uniform vec3 material_attenuation;
vec3 evalRefractionColor(vec3 refractionVector, float gloss, float refractionIndex) {
	vec4 pointOfRefraction = vec4(vPositionW + refractionVector, 1.0);
	vec4 projectionPoint = matrix_viewProjection * pointOfRefraction;
	vec2 uv = getGrabScreenPos(projectionPoint);
	float iorToRoughness = (1.0 - gloss) * clamp((1.0 / refractionIndex) * 2.0 - 2.0, 0.0, 1.0);
	float refractionLod = log2(uScreenSize.x) * iorToRoughness;
	vec3 refraction = texture2DLod(uSceneColorMap, uv, refractionLod).rgb;
	#ifdef SCENE_COLORMAP_GAMMA
		refraction = decodeGamma(refraction);
	#endif
	return refraction;
}
void addRefraction(
	vec3 worldNormal, 
	vec3 viewDir, 
	float thickness, 
	float gloss, 
	vec3 specularity, 
	vec3 albedo, 
	float transmission,
	float refractionIndex,
	float dispersion
#if defined(LIT_IRIDESCENCE)
	, vec3 iridescenceFresnel,
	float iridescenceIntensity
#endif
) {
	vec3 modelScale;
	modelScale.x = length(vec3(matrix_model[0].xyz));
	modelScale.y = length(vec3(matrix_model[1].xyz));
	modelScale.z = length(vec3(matrix_model[2].xyz));
	vec3 scale = thickness * modelScale;
	vec3 refractionVector = normalize(refract(-viewDir, worldNormal, refractionIndex)) * scale;
	vec3 refraction = evalRefractionColor(refractionVector, gloss, refractionIndex);
	#ifdef LIT_DISPERSION
		float halfSpread = (1.0 / refractionIndex - 1.0) * 0.025 * dispersion;
		float refractionIndexR = refractionIndex - halfSpread;
		refractionVector = normalize(refract(-viewDir, worldNormal, refractionIndexR)) * scale;
		refraction.r = evalRefractionColor(refractionVector, gloss, refractionIndexR).r;
		float refractionIndexB = refractionIndex + halfSpread;
		refractionVector = normalize(refract(-viewDir, worldNormal, refractionIndexB)) * scale;
		refraction.b = evalRefractionColor(refractionVector, gloss, refractionIndexB).b;
	#endif
	vec3 transmittance;
	if (material_invAttenuationDistance != 0.0)
	{
		vec3 attenuation = -log(material_attenuation) * material_invAttenuationDistance;
		transmittance = exp(-attenuation * length(refractionVector));
	}
	else
	{
		transmittance = vec3(1.0);
	}
	vec3 fresnel = vec3(1.0) - 
		getFresnel(
			dot(viewDir, worldNormal), 
			gloss, 
			specularity
		#if defined(LIT_IRIDESCENCE)
			, iridescenceFresnel,
			iridescenceIntensity
		#endif
		);
	dDiffuseLight = mix(dDiffuseLight, refraction * transmittance * fresnel, transmission);
}
`,reprojectPS:`
varying vec2 vUv0;
#ifdef CUBEMAP_SOURCE
	uniform samplerCube sourceCube;
#else
	uniform sampler2D sourceTex;
#endif
#ifdef USE_SAMPLES_TEX
	uniform sampler2D samplesTex;
	uniform vec2 samplesTexInverseSize;
#endif
uniform vec3 params;
float targetFace() { return params.x; }
float targetTotalPixels() { return params.y; }
float sourceTotalPixels() { return params.z; }
float PI = 3.141592653589793;
float saturate(float x) {
	return clamp(x, 0.0, 1.0);
}
#include "decodePS"
#include "encodePS"
vec3 modifySeams(vec3 dir, float scale) {
	vec3 adir = abs(dir);
	float M = max(max(adir.x, adir.y), adir.z);
	return dir / M * vec3(
		adir.x == M ? 1.0 : scale,
		adir.y == M ? 1.0 : scale,
		adir.z == M ? 1.0 : scale
	);
}
vec2 toSpherical(vec3 dir) {
	return vec2(dir.xz == vec2(0.0) ? 0.0 : atan(dir.x, dir.z), asin(dir.y));
}
vec3 fromSpherical(vec2 uv) {
	return vec3(cos(uv.y) * sin(uv.x),
				sin(uv.y),
				cos(uv.y) * cos(uv.x));
}
vec3 getDirectionEquirect() {
	return fromSpherical((vec2(vUv0.x, 1.0 - vUv0.y) * 2.0 - 1.0) * vec2(PI, PI * 0.5));
}
float signNotZero(float k){
	return(k >= 0.0) ? 1.0 : -1.0;
}
vec2 signNotZero(vec2 v) {
	return vec2(signNotZero(v.x), signNotZero(v.y));
}
vec3 octDecode(vec2 o) {
	vec3 v = vec3(o.x, 1.0 - abs(o.x) - abs(o.y), o.y);
	if (v.y < 0.0) {
		v.xz = (1.0 - abs(v.zx)) * signNotZero(v.xz);
	}
	return normalize(v);
}
vec3 getDirectionOctahedral() {
	return octDecode(vec2(vUv0.x, 1.0 - vUv0.y) * 2.0 - 1.0);
}
vec2 octEncode(in vec3 v) {
	float l1norm = abs(v.x) + abs(v.y) + abs(v.z);
	vec2 result = v.xz * (1.0 / l1norm);
	if (v.y < 0.0) {
		result = (1.0 - abs(result.yx)) * signNotZero(result.xy);
	}
	return result;
}
#ifdef CUBEMAP_SOURCE
	vec4 sampleCubemap(vec3 dir) {
		return textureCube(sourceCube, modifySeams(dir, 1.0));
	}
	vec4 sampleCubemap(vec2 sph) {
		return sampleCubemap(fromSpherical(sph));
	}
	vec4 sampleCubemap(vec3 dir, float mipLevel) {
		return textureCubeLod(sourceCube, modifySeams(dir, 1.0), mipLevel);
	}
	vec4 sampleCubemap(vec2 sph, float mipLevel) {
		return sampleCubemap(fromSpherical(sph), mipLevel);
	}
#else
	vec4 sampleEquirect(vec2 sph) {
		vec2 uv = sph / vec2(PI * 2.0, PI) + 0.5;
		return texture2D(sourceTex, vec2(uv.x, 1.0 - uv.y));
	}
	vec4 sampleEquirect(vec3 dir) {
		return sampleEquirect(toSpherical(dir));
	}
	vec4 sampleEquirect(vec2 sph, float mipLevel) {
		vec2 uv = sph / vec2(PI * 2.0, PI) + 0.5;
		return texture2DLod(sourceTex, vec2(uv.x, 1.0 - uv.y), mipLevel);
	}
	vec4 sampleEquirect(vec3 dir, float mipLevel) {
		return sampleEquirect(toSpherical(dir), mipLevel);
	}
	vec4 sampleOctahedral(vec3 dir) {
		vec2 uv = octEncode(dir) * 0.5 + 0.5;
		return texture2D(sourceTex, vec2(uv.x, 1.0 - uv.y));
	}
	vec4 sampleOctahedral(vec2 sph) {
		return sampleOctahedral(fromSpherical(sph));
	}
	vec4 sampleOctahedral(vec3 dir, float mipLevel) {
		vec2 uv = octEncode(dir) * 0.5 + 0.5;
		return texture2DLod(sourceTex, vec2(uv.x, 1.0 - uv.y), mipLevel);
	}
	vec4 sampleOctahedral(vec2 sph, float mipLevel) {
		return sampleOctahedral(fromSpherical(sph), mipLevel);
	}
#endif
vec3 getDirectionCubemap() {
	vec2 st = vUv0 * 2.0 - 1.0;
	float face = targetFace();
	vec3 vec;
	if (face == 0.0) {
		vec = vec3(1, -st.y, -st.x);
	} else if (face == 1.0) {
		vec = vec3(-1, -st.y, st.x);
	} else if (face == 2.0) {
		vec = vec3(st.x, 1, st.y);
	} else if (face == 3.0) {
		vec = vec3(st.x, -1, -st.y);
	} else if (face == 4.0) {
		vec = vec3(st.x, -st.y, 1);
	} else {
		vec = vec3(-st.x, -st.y, -1);
	}
	return normalize(modifySeams(vec, 1.0));
}
mat3 matrixFromVector(vec3 n) {
	float a = 1.0 / (1.0 + n.z);
	float b = -n.x * n.y * a;
	vec3 b1 = vec3(1.0 - n.x * n.x * a, b, -n.x);
	vec3 b2 = vec3(b, 1.0 - n.y * n.y * a, -n.y);
	return mat3(b1, b2, n);
}
mat3 matrixFromVectorSlow(vec3 n) {
	vec3 up = (1.0 - abs(n.y) <= 0.0000001) ? vec3(0.0, 0.0, n.y > 0.0 ? 1.0 : -1.0) : vec3(0.0, 1.0, 0.0);
	vec3 x = normalize(cross(up, n));
	vec3 y = cross(n, x);
	return mat3(x, y, n);
}
vec4 reproject() {
	if ({NUM_SAMPLES} <= 1) {
		return {ENCODE_FUNC}({DECODE_FUNC}({SOURCE_FUNC}({TARGET_FUNC}())));
	} else {
		vec3 t = {TARGET_FUNC}();
		vec3 tu = dFdx(t);
		vec3 tv = dFdy(t);
		vec3 result = vec3(0.0);
		for (float u = 0.0; u < {NUM_SAMPLES_SQRT}; ++u) {
			for (float v = 0.0; v < {NUM_SAMPLES_SQRT}; ++v) {
				result += {DECODE_FUNC}({SOURCE_FUNC}(normalize(t +
															tu * (u / {NUM_SAMPLES_SQRT} - 0.5) +
															tv * (v / {NUM_SAMPLES_SQRT} - 0.5))));
			}
		}
		return {ENCODE_FUNC}(result / ({NUM_SAMPLES_SQRT} * {NUM_SAMPLES_SQRT}));
	}
}
vec4 unpackFloat = vec4(1.0, 1.0 / 255.0, 1.0 / 65025.0, 1.0 / 16581375.0);
#ifdef USE_SAMPLES_TEX
	void unpackSample(int i, out vec3 L, out float mipLevel) {
		float u = (float(i * 4) + 0.5) * samplesTexInverseSize.x;
		float v = (floor(u) + 0.5) * samplesTexInverseSize.y;
		vec4 raw;
		raw.x = dot(texture2D(samplesTex, vec2(u, v)), unpackFloat); u += samplesTexInverseSize.x;
		raw.y = dot(texture2D(samplesTex, vec2(u, v)), unpackFloat); u += samplesTexInverseSize.x;
		raw.z = dot(texture2D(samplesTex, vec2(u, v)), unpackFloat); u += samplesTexInverseSize.x;
		raw.w = dot(texture2D(samplesTex, vec2(u, v)), unpackFloat);
		L.xyz = raw.xyz * 2.0 - 1.0;
		mipLevel = raw.w * 8.0;
	}
	vec4 prefilterSamples() {
		mat3 vecSpace = matrixFromVectorSlow({TARGET_FUNC}());
		vec3 L;
		float mipLevel;
		vec3 result = vec3(0.0);
		float totalWeight = 0.0;
		for (int i = 0; i < {NUM_SAMPLES}; ++i) {
			unpackSample(i, L, mipLevel);
			result += {DECODE_FUNC}({SOURCE_FUNC}(vecSpace * L, mipLevel)) * L.z;
			totalWeight += L.z;
		}
		return {ENCODE_FUNC}(result / totalWeight);
	}
	vec4 prefilterSamplesUnweighted() {
		mat3 vecSpace = matrixFromVectorSlow({TARGET_FUNC}());
		vec3 L;
		float mipLevel;
		vec3 result = vec3(0.0);
		float totalWeight = 0.0;
		for (int i = 0; i < {NUM_SAMPLES}; ++i) {
			unpackSample(i, L, mipLevel);
			result += {DECODE_FUNC}({SOURCE_FUNC}(vecSpace * L, mipLevel));
		}
		return {ENCODE_FUNC}(result / float({NUM_SAMPLES}));
	}
#endif
void main(void) {
	gl_FragColor = {PROCESS_FUNC}();
}
`,reprojectVS:`
attribute vec2 vertex_position;
uniform vec4 uvMod;
varying vec2 vUv0;
void main(void) {
	gl_Position = vec4(vertex_position, 0.5, 1.0);
	vUv0 = getImageEffectUV((vertex_position.xy * 0.5 + 0.5) * uvMod.xy + uvMod.zw);
}
`,screenDepthPS:`
uniform highp sampler2D uSceneDepthMap;
#if defined(SCENE_DEPTHMAP_LINEAR) && defined(SCENE_DEPTHMAP_PACKED)
	#include "floatAsUintPS"
#endif
#ifndef SCREENSIZE
	#define SCREENSIZE
	uniform vec4 uScreenSize;
#endif
#ifndef VIEWMATRIX
	#define VIEWMATRIX
	uniform mat4 matrix_view;
#endif
#ifndef LINEARIZE_DEPTH
	#define LINEARIZE_DEPTH
	
	#ifndef CAMERAPLANES
		#define CAMERAPLANES
		uniform vec4 camera_params;
	#endif
	float linearizeDepth(float z) {
		if (camera_params.w == 0.0)
			return (camera_params.z * camera_params.y) / (camera_params.y + z * (camera_params.z - camera_params.y));
		else
			return camera_params.z + z * (camera_params.y - camera_params.z);
	}
#endif
float delinearizeDepth(float linearDepth) {
	if (camera_params.w == 0.0) {
		return (camera_params.y * (camera_params.z - linearDepth)) / (linearDepth * (camera_params.z - camera_params.y));
	} else {
		return (linearDepth - camera_params.z) / (camera_params.y - camera_params.z);
	}
}
float getLinearScreenDepth(vec2 uv) {
	#ifdef SCENE_DEPTHMAP_LINEAR
		#ifdef SCENE_DEPTHMAP_PACKED
			ivec2 texel = ivec2(uv * vec2(textureSize(uSceneDepthMap, 0)));
			return uint2float(texelFetch(uSceneDepthMap, texel, 0));
		#elif defined(SCENE_DEPTHMAP_RECIPROCAL)
			float recip = texture2D(uSceneDepthMap, uv).r;
			return recip > 0.0 ? 1.0 / recip : camera_params.y;
		#else
			return texture2D(uSceneDepthMap, uv).r;
		#endif
	#else
		return linearizeDepth(texture2D(uSceneDepthMap, uv).r);
	#endif
}
#ifndef VERTEXSHADER
	float getLinearScreenDepth() {
		vec2 uv = gl_FragCoord.xy * uScreenSize.zw;
		return getLinearScreenDepth(uv);
	}
#endif
float getLinearDepth(vec3 pos) {
	return -(matrix_view * vec4(pos, 1.0)).z;
}
`,shadowCascadesPS:`
int getShadowCascadeIndex(vec4 shadowCascadeDistances, int shadowCascadeCount) {
	float depth = 1.0 / gl_FragCoord.w;
	vec4 comparisons = step(shadowCascadeDistances, vec4(depth));
	int cascadeIndex = int(dot(comparisons, vec4(1.0)));
	return min(cascadeIndex, shadowCascadeCount - 1);
}
int ditherShadowCascadeIndex(int cascadeIndex, vec4 shadowCascadeDistances, int shadowCascadeCount, float blendFactor) {
 
	if (cascadeIndex < shadowCascadeCount - 1) {
		float currentRangeEnd = shadowCascadeDistances[cascadeIndex];
		float transitionStart = blendFactor * currentRangeEnd;
		float depth = 1.0 / gl_FragCoord.w;
		if (depth > transitionStart) {
			float transitionFactor = smoothstep(transitionStart, currentRangeEnd, depth);
			float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
			if (dither < transitionFactor) {
				cascadeIndex += 1;
			}
		}
	}
	return cascadeIndex;
}
vec3 fadeShadow(vec3 shadowCoord, vec4 shadowCascadeDistances) {				  
	float depth = 1.0 / gl_FragCoord.w;
	if (depth > shadowCascadeDistances.w) {
		shadowCoord.z = -9999999.0;
	}
	return shadowCoord;
}
`,shadowCasterPS:`
vec4 getShadowOutput() {
	float depth = gl_FragCoord.z;
	#if SHADOW_TYPE == VSM_16F || SHADOW_TYPE == VSM_32F
		if (!(depth >= 0.0 && depth <= 1.0)) discard;
		#if SHADOW_TYPE == VSM_32F
			float exponent = 15.0;
		#else
			float exponent = 5.54;
		#endif
		depth = 2.0 * depth - 1.0;
		depth = exp(exponent * depth);
		return vec4(depth, depth * depth, 1.0, 1.0);
	#elif SHADOW_TYPE == PCSS_32F
		return vec4(depth, 0.0, 0.0, 1.0);
	#else
		return vec4(1.0);
	#endif
}
`,shadowEVSMPS:`
float linstep(float a, float b, float v) {
	return saturate((v - a) / (b - a));
}
float reduceLightBleeding(float pMax, float amount) {
	 return linstep(amount, 1.0, pMax);
}
float chebyshevUpperBound(vec2 moments, float mean, float minVariance, float lightBleedingReduction) {
	float variance = moments.y - (moments.x * moments.x);
	variance = max(variance, minVariance);
	float d = mean - moments.x;
	float pMax = variance / (variance + (d * d));
	pMax = reduceLightBleeding(pMax, lightBleedingReduction);
	return (mean <= moments.x ? 1.0 : pMax);
}
float calculateEVSM(vec3 moments, float Z, float vsmBias, float exponent) {
	Z = 2.0 * Z - 1.0;
	float warpedDepth = exp(exponent * Z);
	moments.xy += vec2(warpedDepth, warpedDepth*warpedDepth) * (1.0 - moments.z);
	float VSMBias = vsmBias;
	float depthScale = VSMBias * exponent * warpedDepth;
	float minVariance1 = depthScale * depthScale;
	return chebyshevUpperBound(moments.xy, warpedDepth, minVariance1, 0.1);
}
float VSM16(TEXTURE_ACCEPT(tex), vec2 texCoords, float resolution, float Z, float vsmBias, float exponent) {
	vec3 moments = texture2DLod(tex, texCoords, 0.0).xyz;
	return calculateEVSM(moments, Z, vsmBias, exponent);
}
float getShadowVSM16(TEXTURE_ACCEPT(shadowMap), vec3 shadowCoord, vec4 shadowParams, float exponent) {
	return VSM16(TEXTURE_PASS(shadowMap), shadowCoord.xy, shadowParams.x, shadowCoord.z, shadowParams.y, exponent);
}
float getShadowSpotVSM16(TEXTURE_ACCEPT(shadowMap), vec3 shadowCoord, vec4 shadowParams, float exponent, vec3 lightDir) {
	return VSM16(TEXTURE_PASS(shadowMap), shadowCoord.xy, shadowParams.x, length(lightDir) * shadowParams.w + shadowParams.z, shadowParams.y, exponent);
}
float VSM32(TEXTURE_ACCEPT(tex), vec2 texCoords, float resolution, float Z, float vsmBias, float exponent) {
	#ifdef CAPS_TEXTURE_FLOAT_FILTERABLE
		vec3 moments = texture2DLod(tex, texCoords, 0.0).xyz;
	#else
		float pixelSize = 1.0 / resolution;
		texCoords -= vec2(pixelSize);
		vec3 s00 = texture2DLod(tex, texCoords, 0.0).xyz;
		vec3 s10 = texture2DLod(tex, texCoords + vec2(pixelSize, 0), 0.0).xyz;
		vec3 s01 = texture2DLod(tex, texCoords + vec2(0, pixelSize), 0.0).xyz;
		vec3 s11 = texture2DLod(tex, texCoords + vec2(pixelSize), 0.0).xyz;
		vec2 fr = fract(texCoords * resolution);
		vec3 h0 = mix(s00, s10, fr.x);
		vec3 h1 = mix(s01, s11, fr.x);
		vec3 moments = mix(h0, h1, fr.y);
	#endif
	return calculateEVSM(moments, Z, vsmBias, exponent);
}
float getShadowVSM32(TEXTURE_ACCEPT(shadowMap), vec3 shadowCoord, vec4 shadowParams, float exponent) {
	return VSM32(TEXTURE_PASS(shadowMap), shadowCoord.xy, shadowParams.x, shadowCoord.z, shadowParams.y, exponent);
}
float getShadowSpotVSM32(TEXTURE_ACCEPT(shadowMap), vec3 shadowCoord, vec4 shadowParams, float exponent, vec3 lightDir) {
	float Z = length(lightDir) * shadowParams.w + shadowParams.z;
	return VSM32(TEXTURE_PASS(shadowMap), shadowCoord.xy, shadowParams.x, Z, shadowParams.y, exponent);
}
`,shadowPCF1PS:`
float getShadowPCF1x1(SHADOWMAP_ACCEPT(shadowMap), vec3 shadowCoord, vec4 shadowParams) {
	return textureShadow(shadowMap, shadowCoord);
}
float getShadowSpotPCF1x1(SHADOWMAP_ACCEPT(shadowMap), vec3 shadowCoord, vec4 shadowParams) {
	return textureShadow(shadowMap, shadowCoord);
}
#ifndef WEBGPU
float getShadowOmniPCF1x1(samplerCubeShadow shadowMap, vec3 shadowCoord, vec4 shadowParams, vec3 lightDir) {
	float shadowZ = length(lightDir) * shadowParams.w + shadowParams.z;
	return texture(shadowMap, vec4(lightDir, shadowZ));
}
#endif
`,shadowPCF3PS:`
float _getShadowPCF3x3(SHADOWMAP_ACCEPT(shadowMap), vec3 shadowCoord, vec3 shadowParams) {
	float z = shadowCoord.z;
	vec2 uv = shadowCoord.xy * shadowParams.x;
	float shadowMapSizeInv = 1.0 / shadowParams.x;
	vec2 base_uv = floor(uv + 0.5);
	float s = (uv.x + 0.5 - base_uv.x);
	float t = (uv.y + 0.5 - base_uv.y); 
	base_uv -= vec2(0.5);
	base_uv *= shadowMapSizeInv;
	float sum = 0.0;
	float uw0 = (3.0 - 2.0 * s);
	float uw1 = (1.0 + 2.0 * s);
	float u0 = (2.0 - s) / uw0 - 1.0;
	float u1 = s / uw1 + 1.0;
	float vw0 = (3.0 - 2.0 * t);
	float vw1 = (1.0 + 2.0 * t);
	float v0 = (2.0 - t) / vw0 - 1.0;
	float v1 = t / vw1 + 1.0;
	u0 = u0 * shadowMapSizeInv + base_uv.x;
	v0 = v0 * shadowMapSizeInv + base_uv.y;
	u1 = u1 * shadowMapSizeInv + base_uv.x;
	v1 = v1 * shadowMapSizeInv + base_uv.y;
	sum += uw0 * vw0 * textureShadow(shadowMap, vec3(u0, v0, z));
	sum += uw1 * vw0 * textureShadow(shadowMap, vec3(u1, v0, z));
	sum += uw0 * vw1 * textureShadow(shadowMap, vec3(u0, v1, z));
	sum += uw1 * vw1 * textureShadow(shadowMap, vec3(u1, v1, z));
	sum *= 1.0f / 16.0;
	return sum;
}
float getShadowPCF3x3(SHADOWMAP_ACCEPT(shadowMap), vec3 shadowCoord, vec4 shadowParams) {
	return _getShadowPCF3x3(SHADOWMAP_PASS(shadowMap), shadowCoord, shadowParams.xyz);
}
float getShadowSpotPCF3x3(SHADOWMAP_ACCEPT(shadowMap), vec3 shadowCoord, vec4 shadowParams) {
	return _getShadowPCF3x3(SHADOWMAP_PASS(shadowMap), shadowCoord, shadowParams.xyz);
}
#ifndef WEBGPU
float getShadowOmniPCF3x3(samplerCubeShadow shadowMap, vec4 shadowParams, vec3 dir) {
	
	float shadowZ = length(dir) * shadowParams.w + shadowParams.z;
	float z = 1.0 / float(textureSize(shadowMap, 0));
	vec3 tc = normalize(dir);
	mediump vec4 shadows;
	shadows.x = texture(shadowMap, vec4(tc + vec3( z, z, z), shadowZ));
	shadows.y = texture(shadowMap, vec4(tc + vec3(-z,-z, z), shadowZ));
	shadows.z = texture(shadowMap, vec4(tc + vec3(-z, z,-z), shadowZ));
	shadows.w = texture(shadowMap, vec4(tc + vec3( z,-z,-z), shadowZ));
	return dot(shadows, vec4(0.25));
}
float getShadowOmniPCF3x3(samplerCubeShadow shadowMap, vec3 shadowCoord, vec4 shadowParams, vec3 lightDir) {
	return getShadowOmniPCF3x3(shadowMap, shadowParams, lightDir);
}
#endif
`,shadowPCF5PS:`
float _getShadowPCF5x5(SHADOWMAP_ACCEPT(shadowMap), vec3 shadowCoord, vec3 shadowParams) {
	float z = shadowCoord.z;
	vec2 uv = shadowCoord.xy * shadowParams.x;
	float shadowMapSizeInv = 1.0 / shadowParams.x;
	vec2 base_uv = floor(uv + 0.5);
	float s = (uv.x + 0.5 - base_uv.x);
	float t = (uv.y + 0.5 - base_uv.y);
	base_uv -= vec2(0.5);
	base_uv *= shadowMapSizeInv;
	float uw0 = (4.0 - 3.0 * s);
	float uw1 = 7.0;
	float uw2 = (1.0 + 3.0 * s);
	float u0 = (3.0 - 2.0 * s) / uw0 - 2.0;
	float u1 = (3.0 + s) / uw1;
	float u2 = s / uw2 + 2.0;
	float vw0 = (4.0 - 3.0 * t);
	float vw1 = 7.0;
	float vw2 = (1.0 + 3.0 * t);
	float v0 = (3.0 - 2.0 * t) / vw0 - 2.0;
	float v1 = (3.0 + t) / vw1;
	float v2 = t / vw2 + 2.0;
	float sum = 0.0;
	u0 = u0 * shadowMapSizeInv + base_uv.x;
	v0 = v0 * shadowMapSizeInv + base_uv.y;
	u1 = u1 * shadowMapSizeInv + base_uv.x;
	v1 = v1 * shadowMapSizeInv + base_uv.y;
	u2 = u2 * shadowMapSizeInv + base_uv.x;
	v2 = v2 * shadowMapSizeInv + base_uv.y;
	sum += uw0 * vw0 * textureShadow(shadowMap, vec3(u0, v0, z));
	sum += uw1 * vw0 * textureShadow(shadowMap, vec3(u1, v0, z));
	sum += uw2 * vw0 * textureShadow(shadowMap, vec3(u2, v0, z));
	sum += uw0 * vw1 * textureShadow(shadowMap, vec3(u0, v1, z));
	sum += uw1 * vw1 * textureShadow(shadowMap, vec3(u1, v1, z));
	sum += uw2 * vw1 * textureShadow(shadowMap, vec3(u2, v1, z));
	sum += uw0 * vw2 * textureShadow(shadowMap, vec3(u0, v2, z));
	sum += uw1 * vw2 * textureShadow(shadowMap, vec3(u1, v2, z));
	sum += uw2 * vw2 * textureShadow(shadowMap, vec3(u2, v2, z));
	sum *= 1.0f / 144.0;
	sum = saturate(sum);
	return sum;
}
float getShadowPCF5x5(SHADOWMAP_ACCEPT(shadowMap), vec3 shadowCoord, vec4 shadowParams) {
	return _getShadowPCF5x5(SHADOWMAP_PASS(shadowMap), shadowCoord, shadowParams.xyz);
}
float getShadowSpotPCF5x5(SHADOWMAP_ACCEPT(shadowMap), vec3 shadowCoord, vec4 shadowParams) {
	return _getShadowPCF5x5(SHADOWMAP_PASS(shadowMap), shadowCoord, shadowParams.xyz);
}
`,shadowPCSSPS:`
#define PCSS_SAMPLE_COUNT 16
uniform float pcssDiskSamples[PCSS_SAMPLE_COUNT];
uniform float pcssSphereSamples[PCSS_SAMPLE_COUNT];
vec2 vogelDisk(int sampleIndex, float count, float phi, float r) {
	const float GoldenAngle = 2.4;
	float theta = float(sampleIndex) * GoldenAngle + phi;
	float sine = sin(theta);
	float cosine = cos(theta);
	return vec2(r * cosine, r * sine);
}
vec3 vogelSphere(int sampleIndex, float count, float phi, float r) {
	const float GoldenAngle = 2.4;
	float theta = float(sampleIndex) * GoldenAngle + phi;
	float weight = float(sampleIndex) / count;
	return vec3(cos(theta) * r, weight, sin(theta) * r);
}
float noise(vec2 screenPos) {
	const float PHI = 1.61803398874989484820459;
	return fract(sin(dot(screenPos * PHI, screenPos)) * screenPos.x);
}
float viewSpaceDepth(float depth, mat4 invProjection) {
	float z = depth * 2.0 - 1.0;
	vec4 clipSpace = vec4(0.0, 0.0, z, 1.0);
	vec4 viewSpace = invProjection * clipSpace;
	return viewSpace.z;
}
float PCSSBlockerDistance(TEXTURE_ACCEPT(shadowMap), vec2 sampleCoords[PCSS_SAMPLE_COUNT], vec2 shadowCoords, vec2 searchSize, float z, vec4 cameraParams) {
	float blockers = 0.0;
	float averageBlocker = 0.0;
	for (int i = 0; i < PCSS_SAMPLE_COUNT; i++) {
		vec2 offset = sampleCoords[i] * searchSize;
		vec2 sampleUV = shadowCoords + offset;
		float blocker = texture2DLod(shadowMap, sampleUV, 0.0).r;
		float isBlocking = step(blocker, z);
		blockers += isBlocking;
		averageBlocker += blocker * isBlocking;
	}
	if (blockers > 0.0)
		return averageBlocker / blockers;
	return -1.0;
}
float PCSS(TEXTURE_ACCEPT(shadowMap), vec3 shadowCoords, vec4 cameraParams, vec2 shadowSearchArea) {
	float receiverDepth = linearizeDepthWithParams(shadowCoords.z, cameraParams);
	vec2 samplePoints[PCSS_SAMPLE_COUNT];
	const float PI = 3.141592653589793;
	float noise = noise( gl_FragCoord.xy ) * 2.0 * PI;
	for (int i = 0; i < PCSS_SAMPLE_COUNT; i++) {
		float pcssPresample = pcssDiskSamples[i];
		samplePoints[i] = vogelDisk(i, float(PCSS_SAMPLE_COUNT), noise, pcssPresample);
	}
	float averageBlocker = PCSSBlockerDistance(TEXTURE_PASS(shadowMap), samplePoints, shadowCoords.xy, shadowSearchArea, receiverDepth, cameraParams);
	if (averageBlocker == -1.0) {
		return 1.0;
	} else {
		float depthDifference = (receiverDepth - averageBlocker) / 3.0;
		vec2 filterRadius = depthDifference * shadowSearchArea;
		float shadow = 0.0;
		for (int i = 0; i < PCSS_SAMPLE_COUNT; i ++)
		{
			vec2 sampleUV = samplePoints[i] * filterRadius;
			sampleUV = shadowCoords.xy + sampleUV;
			float depth = texture2DLod(shadowMap, sampleUV, 0.0).r;
			shadow += step(receiverDepth, depth);
		}
		return shadow / float(PCSS_SAMPLE_COUNT);
	} 
}
#ifndef WEBGPU
float PCSSCubeBlockerDistance(samplerCube shadowMap, vec3 lightDirNorm, vec3 samplePoints[PCSS_SAMPLE_COUNT], float z, float shadowSearchArea) {
	float blockers = 0.0;
	float averageBlocker = 0.0;
	for (int i = 0; i < PCSS_SAMPLE_COUNT; i++) {
		vec3 sampleDir = lightDirNorm + samplePoints[i] * shadowSearchArea;
		sampleDir = normalize(sampleDir);
		float blocker = textureCubeLod(shadowMap, sampleDir, 0.0).r;
		float isBlocking = step(blocker, z);
		blockers += isBlocking;
		averageBlocker += blocker * isBlocking;
	}
	if (blockers > 0.0)
		return averageBlocker / blockers;
	return -1.0;
}
float PCSSCube(samplerCube shadowMap, vec4 shadowParams, vec3 shadowCoords, vec4 cameraParams, float shadowSearchArea, vec3 lightDir) {
	
	vec3 samplePoints[PCSS_SAMPLE_COUNT];
	const float PI = 3.141592653589793;
	float noise = noise( gl_FragCoord.xy ) * 2.0 * PI;
	for (int i = 0; i < PCSS_SAMPLE_COUNT; i++) {
		float r = pcssSphereSamples[i];
		samplePoints[i] = vogelSphere(i, float(PCSS_SAMPLE_COUNT), noise, r);
	}
	float receiverDepth = length(lightDir) * shadowParams.w + shadowParams.z;
	vec3 lightDirNorm = normalize(lightDir);
	
	float averageBlocker = PCSSCubeBlockerDistance(shadowMap, lightDirNorm, samplePoints, receiverDepth, shadowSearchArea);
	if (averageBlocker == -1.0) {
		return 1.0;
	} else {
		float filterRadius = ((receiverDepth - averageBlocker) / averageBlocker) * shadowSearchArea;
		float shadow = 0.0;
		for (int i = 0; i < PCSS_SAMPLE_COUNT; i++)
		{
			vec3 offset = samplePoints[i] * filterRadius;
			vec3 sampleDir = lightDirNorm + offset;
			sampleDir = normalize(sampleDir);
			float depth = textureCubeLod(shadowMap, sampleDir, 0.0).r;
			shadow += step(receiverDepth, depth);
		}
		return shadow / float(PCSS_SAMPLE_COUNT);
	}
}
float getShadowOmniPCSS(samplerCube shadowMap, vec3 shadowCoord, vec4 shadowParams, vec4 cameraParams, vec2 shadowSearchArea, vec3 lightDir) {
	return PCSSCube(shadowMap, shadowParams, shadowCoord, cameraParams, shadowSearchArea.x, lightDir);
}
#endif
float getShadowSpotPCSS(TEXTURE_ACCEPT(shadowMap), vec3 shadowCoord, vec4 shadowParams, vec4 cameraParams, vec2 shadowSearchArea, vec3 lightDir) {
	return PCSS(TEXTURE_PASS(shadowMap), shadowCoord, cameraParams, shadowSearchArea);
}
`,shadowSoftPS:`
highp float fractSinRand(const in vec2 uv) {
	const float PI = 3.141592653589793;
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot(uv.xy, vec2(a, b)), sn = mod(dt, PI);
	return fract(sin(sn) * c);
}
struct VogelDiskData {
	float invNumSamples;
	float initialAngle;
	float currentPointId;
};
void prepareDiskConstants(out VogelDiskData data, int sampleCount, float randomSeed) {
	const float pi2 = 6.28318530718;
	data.invNumSamples = 1.0 / float(sampleCount);
	data.initialAngle = randomSeed * pi2;
	data.currentPointId = 0.0;
}
vec2 generateDiskSample(inout VogelDiskData data) {
	const float GOLDEN_ANGLE = 2.399963;
	float r = sqrt((data.currentPointId + 0.5) * data.invNumSamples);
	float theta = data.currentPointId * GOLDEN_ANGLE + data.initialAngle;
	vec2 offset = vec2(cos(theta), sin(theta)) * pow(r, 1.33);
	data.currentPointId += 1.0;
	return offset;
}
void PCSSFindBlocker(TEXTURE_ACCEPT(shadowMap), out float avgBlockerDepth, out int numBlockers,
	vec2 shadowCoords, float z, int shadowBlockerSamples, float searchWidthUv, float randomSeed) {
	VogelDiskData diskData;
	prepareDiskConstants(diskData, shadowBlockerSamples, randomSeed);
	float blockerSum = 0.0;
	numBlockers = 0;
	for( int i = 0; i < shadowBlockerSamples; ++i ) {
		vec2 diskUV = generateDiskSample(diskData);
		vec2 sampleUV = shadowCoords + diskUV * searchWidthUv;
		float shadowMapDepth = texture2DLod(shadowMap, sampleUV, 0.0).r;
		if ( shadowMapDepth < z ) {
			blockerSum += shadowMapDepth;
			numBlockers++;
		}
	}
	avgBlockerDepth = blockerSum / float(numBlockers);
}
float PCSSFilter(TEXTURE_ACCEPT(shadowMap), vec2 uv, float receiverDepth, int shadowSamples, float filterRadius, float randomSeed) {
	VogelDiskData diskData;
	prepareDiskConstants(diskData, shadowSamples, randomSeed);
	float sum = 0.0;
	for (int i = 0; i < shadowSamples; i++) {
		vec2 offsetUV = generateDiskSample(diskData) * filterRadius;
		float depth = texture2DLod(shadowMap, uv + offsetUV, 0.0).r;
		sum += step(receiverDepth, depth);
	}
	return sum / float(shadowSamples);
}
float PCSSDirectional(TEXTURE_ACCEPT(shadowMap), vec3 shadowCoords, vec4 cameraParams, vec4 softShadowParams) {
	float receiverDepth = shadowCoords.z;
	float receiverDepthClamped = min(receiverDepth, 0.9999);
	float randomSeed = fractSinRand(gl_FragCoord.xy);
	int shadowSamples = int(softShadowParams.x);
	int shadowBlockerSamples = int(softShadowParams.y);
	float penumbraSize = softShadowParams.z;
	float penumbraFalloff = softShadowParams.w;
	float orthoRadius = cameraParams.x;
	float depthRange = cameraParams.y - cameraParams.z;
	float worldPerUv = 2.0 * orthoRadius;
	float filterRadius;
	if (shadowBlockerSamples > 0) {
		float searchWidthUv = (penumbraSize * depthRange) / worldPerUv;
		float avgBlockerDepth = 0.0;
		int numBlockers = 0;
		PCSSFindBlocker(TEXTURE_PASS(shadowMap), avgBlockerDepth, numBlockers, shadowCoords.xy, receiverDepthClamped, shadowBlockerSamples, searchWidthUv, randomSeed);
		if (numBlockers < 1)
			return 1.0f;
		float worldDist = max((receiverDepth - avgBlockerDepth) * depthRange, 0.0);
		float t = clamp(worldDist / depthRange, 0.0, 1.0);
		float shape = 1.0 - pow(1.0 - t, penumbraFalloff);
		float penumbraWorld = shape * penumbraSize * depthRange;
		filterRadius = penumbraWorld / worldPerUv;
	} else {
		filterRadius = penumbraSize / worldPerUv;
	}
	return PCSSFilter(TEXTURE_PASS(shadowMap), shadowCoords.xy, receiverDepthClamped, shadowSamples, filterRadius, randomSeed);
}
float getShadowPCSS(TEXTURE_ACCEPT(shadowMap), vec3 shadowCoord, vec4 shadowParams, vec4 cameraParams, vec4 softShadowParams, vec3 lightDir) {
	return PCSSDirectional(TEXTURE_PASS(shadowMap), shadowCoord, cameraParams, softShadowParams);
}
`,skinBatchVS:`
attribute float vertex_boneIndices;
uniform highp sampler2D texture_poseMap;
mat4 getBoneMatrix(const in float indexFloat) {
	int width = textureSize(texture_poseMap, 0).x;
	int index = int(indexFloat + 0.5) * 3;
	int iy = index / width;
	int ix = index % width;
	vec4 v1 = texelFetch(texture_poseMap, ivec2(ix + 0, iy), 0);
	vec4 v2 = texelFetch(texture_poseMap, ivec2(ix + 1, iy), 0);
	vec4 v3 = texelFetch(texture_poseMap, ivec2(ix + 2, iy), 0);
	return mat4(
		v1.x, v2.x, v3.x, 0,
		v1.y, v2.y, v3.y, 0,
		v1.z, v2.z, v3.z, 0,
		v1.w, v2.w, v3.w, 1
	);
}
`,skinVS:`
attribute vec4 vertex_boneWeights;
attribute vec4 vertex_boneIndices;
uniform highp sampler2D texture_poseMap;
void getBoneMatrix(const in int width, const in int index, out vec4 v1, out vec4 v2, out vec4 v3) {
	int v = index / width;
	int u = index % width;
	v1 = texelFetch(texture_poseMap, ivec2(u + 0, v), 0);
	v2 = texelFetch(texture_poseMap, ivec2(u + 1, v), 0);
	v3 = texelFetch(texture_poseMap, ivec2(u + 2, v), 0);
}
mat4 getSkinMatrix(const in vec4 indicesFloat, const in vec4 weights) {
	int width = textureSize(texture_poseMap, 0).x;
	ivec4 indices = ivec4(indicesFloat + 0.5) * 3;
	vec4 a1, a2, a3;
	getBoneMatrix(width, indices.x, a1, a2, a3);
	vec4 b1, b2, b3;
	getBoneMatrix(width, indices.y, b1, b2, b3);
	vec4 c1, c2, c3;
	getBoneMatrix(width, indices.z, c1, c2, c3);
	vec4 d1, d2, d3;
	getBoneMatrix(width, indices.w, d1, d2, d3);
	vec4 v1 = a1 * weights.x + b1 * weights.y + c1 * weights.z + d1 * weights.w;
	vec4 v2 = a2 * weights.x + b2 * weights.y + c2 * weights.z + d2 * weights.w;
	vec4 v3 = a3 * weights.x + b3 * weights.y + c3 * weights.z + d3 * weights.w;
	float one = dot(weights, vec4(1.0));
	return mat4(
		v1.x, v2.x, v3.x, 0,
		v1.y, v2.y, v3.y, 0,
		v1.z, v2.z, v3.z, 0,
		v1.w, v2.w, v3.w, one
	);
}
`,skyboxPS:`
	#define LIT_SKYBOX_INTENSITY
	#include "envProcPS"
	#include "gammaPS"
	#include "tonemappingPS"
	#include "sceneTexturesPS"
	#if defined(PREPASS_PASS) || (defined(SCENE_TEXTURE_DEPTH) && defined(SKYMESH))
		varying float vLinearDepth;
	#endif
	#ifdef PREPASS_PASS
		#include "floatAsUintPS"
	#endif
	varying vec3 vViewDir;
	uniform float skyboxHighlightMultiplier;
	#if defined(SKY_FISHEYE) && !defined(SKYMESH)
		uniform float fisheye_k;
		uniform float fisheye_invK;
		uniform float fisheye_projMat00;
		uniform float fisheye_projMat11;
		uniform mat4 matrix_view;
		uniform mat3 cubeMapRotationMatrix;
		varying vec3 vClipXYW;
	#endif
	#ifdef SKY_CUBEMAP
		uniform samplerCube texture_cubeMap;
		#ifdef SKYMESH
			varying vec3 vWorldPos;
			uniform mat3 cubeMapRotationMatrix;
			uniform vec3 projectedSkydomeCenter;
		#endif
	#else
		#include "sphericalPS"
		#include "envAtlasPS"
		uniform sampler2D texture_envAtlas;
		uniform float mipLevel;
	#endif
	void main(void) {
		#ifdef PREPASS_PASS
			gl_FragColor = float2vec4(vLinearDepth);
		#else
			#if defined(SKY_FISHEYE) && !defined(SKYMESH)
				vec2 ndc = vClipXYW.xy / vClipXYW.z;
				float px = ndc.x / fisheye_projMat00;
				float py = ndc.y / fisheye_projMat11;
				float r = sqrt(px * px + py * py);
				float theta = fisheye_k * atan(r * fisheye_invK);
				float sinT = sin(theta);
				float cosT = cos(theta);
				vec3 camDir = (r > 1e-6)
					? vec3(px / r * sinT, py / r * sinT, -cosT)
					: vec3(0.0, 0.0, -1.0);
				vec3 dir = transpose(mat3(matrix_view)) * camDir;
				dir = dir * cubeMapRotationMatrix;
			#elif defined(SKY_CUBEMAP) && defined(SKYMESH)
				vec3 envDir = normalize(vWorldPos - projectedSkydomeCenter);
				vec3 dir = envDir * cubeMapRotationMatrix;
			#else
				vec3 dir = vViewDir;
			#endif
			#ifdef SKY_CUBEMAP
				dir.x *= -1.0;
				vec3 linear = {SKYBOX_DECODE_FNC}(textureCube(texture_cubeMap, dir));
			#else
				dir *= vec3(-1.0, 1.0, 1.0);
				vec2 uv = toSphericalUv(normalize(dir));
				vec3 linear = {SKYBOX_DECODE_FNC}(texture2D(texture_envAtlas, mapRoughnessUv(uv, mipLevel)));
			#endif
			if (any(greaterThanEqual(linear, vec3(64.0)))) {
				linear *= skyboxHighlightMultiplier;
			}
			gl_FragColor = vec4(gammaCorrectOutput(toneMap(processEnvironment(linear))), 1.0);
			#if defined(SCENE_TEXTURE_DEPTH) && defined(SKYMESH)
				writeSceneTextureDepth(vLinearDepth, 1.0);
			#endif
		#endif
	}
`,skyboxVS:`
attribute vec4 aPosition;
uniform mat4 matrix_view;
uniform mat4 matrix_projectionSkybox;
uniform mat3 cubeMapRotationMatrix;
varying vec3 vViewDir;
#ifdef SKY_FISHEYE
	varying vec3 vClipXYW;
#endif
#if defined(PREPASS_PASS) || (defined(SCENE_TEXTURE_DEPTH) && defined(SKYMESH))
	varying float vLinearDepth;
#endif
#ifdef SKYMESH
	uniform mat4 matrix_model;
	varying vec3 vWorldPos;
#endif
void main(void) {
	mat4 view = matrix_view;
	#ifdef SKYMESH
		vec4 worldPos = matrix_model * aPosition;
		vWorldPos = worldPos.xyz;
		gl_Position = matrix_projectionSkybox * (view * worldPos);
		#if defined(PREPASS_PASS) || defined(SCENE_TEXTURE_DEPTH)
			vLinearDepth = -(matrix_view * vec4(vWorldPos, 1.0)).z;
		#endif
	#else
		view[3][0] = view[3][1] = view[3][2] = 0.0;
		vViewDir = aPosition.xyz * cubeMapRotationMatrix;
		#ifdef SKY_FISHEYE
			vec4 viewPos = view * aPosition;
			gl_Position = vec4(viewPos.xy, 0.0, -viewPos.z);
			vClipXYW = vec3(gl_Position.xy, gl_Position.w);
		#else
			gl_Position = matrix_projectionSkybox * (view * aPosition);
		#endif
		#ifdef PREPASS_PASS
			vLinearDepth = -gl_Position.w;
		#endif
	#endif
	gl_Position.z = gl_Position.w - 1.0e-7;
}
`,specularPS:`
#ifdef STD_SPECULAR_CONSTANT
uniform vec3 material_specular;
#endif
void getSpecularity() {
	vec3 specularColor = vec3(1,1,1);
	#ifdef STD_SPECULAR_CONSTANT
	specularColor *= material_specular;
	#endif
	#ifdef STD_SPECULAR_TEXTURE
	specularColor *= {STD_SPECULAR_TEXTURE_DECODE}(texture2DBias({STD_SPECULAR_TEXTURE_NAME}, {STD_SPECULAR_TEXTURE_UV}, textureBias)).{STD_SPECULAR_TEXTURE_CHANNEL};
	#endif
	#ifdef STD_SPECULAR_VERTEX
	specularColor *= saturate(vVertexColor.{STD_SPECULAR_VERTEX_CHANNEL});
	#endif
	dSpecularity = specularColor;
}
`,sphericalPS:`
vec2 toSpherical(vec3 dir) {
	return vec2(dir.xz == vec2(0.0) ? 0.0 : atan(dir.x, dir.z), asin(dir.y));
}
vec2 toSphericalUv(vec3 dir) {
	const float PI = 3.141592653589793;
	vec2 uv = toSpherical(dir) / vec2(PI * 2.0, PI) + 0.5;
	return vec2(uv.x, 1.0 - uv.y);
}
`,specularityFactorPS:`
#ifdef STD_SPECULARITYFACTOR_CONSTANT
uniform float material_specularityFactor;
#endif
void getSpecularityFactor() {
	float specularityFactor = 1.0;
	#ifdef STD_SPECULARITYFACTOR_CONSTANT
	specularityFactor *= material_specularityFactor;
	#endif
	#ifdef STD_SPECULARITYFACTOR_TEXTURE
	specularityFactor *= texture2DBias({STD_SPECULARITYFACTOR_TEXTURE_NAME}, {STD_SPECULARITYFACTOR_TEXTURE_UV}, textureBias).{STD_SPECULARITYFACTOR_TEXTURE_CHANNEL};
	#endif
	#ifdef STD_SPECULARITYFACTOR_VERTEX
	specularityFactor *= saturate(vVertexColor.{STD_SPECULARITYFACTOR_VERTEX_CHANNEL});
	#endif
	dSpecularityFactor = specularityFactor;
}
`,spotPS:`
float getSpotEffect(vec3 lightSpotDir, float lightInnerConeAngle, float lightOuterConeAngle, vec3 lightDirNorm) {
	float cosAngle = dot(lightDirNorm, lightSpotDir);
	return smoothstep(lightOuterConeAngle, lightInnerConeAngle, cosAngle);
}
`,startNineSlicedPS:`
	nineSlicedUv = vec2(vUv0.x, 1.0 - vUv0.y);
`,startNineSlicedTiledPS:`
	vec2 tileMask = step(vMask, vec2(0.99999));
	vec2 tileSize = 0.5 * (innerOffset.xy + innerOffset.zw);
	vec2 tileScale = vec2(1.0) / (vec2(1.0) - tileSize);
	vec2 clampedUv = mix(innerOffset.xy * 0.5, vec2(1.0) - innerOffset.zw * 0.5, fract((vTiledUv - tileSize) * tileScale));
	clampedUv = clampedUv * atlasRect.zw + atlasRect.xy;
	nineSlicedUv = vUv0 * tileMask + clampedUv * (vec2(1.0) - tileMask);
	nineSlicedUv.y = 1.0 - nineSlicedUv.y;
	
`,stdDeclarationPS:`
	float dAlpha = 1.0;
	#if LIT_BLEND_TYPE != NONE || defined(LIT_ALPHA_TEST) || defined(LIT_ALPHA_TO_COVERAGE) || STD_OPACITY_DITHER != NONE
		#ifdef STD_OPACITY_TEXTURE_ALLOCATE
			uniform sampler2D texture_opacityMap;
		#endif
	#endif
	#ifdef FORWARD_PASS
		vec3 dAlbedo;
		vec3 dNormalW;
		vec3 dSpecularity = vec3(0.0);
		float dGlossiness = 0.0;
		#ifdef LIT_REFRACTION
			float dTransmission;
			float dThickness;
			#ifndef LIT_METALNESS
				float dIor;
			#endif
		#endif
		#ifdef LIT_SCENE_COLOR
			uniform sampler2D uSceneColorMap;
		#endif
		#ifdef LIT_SCREEN_SIZE
			uniform vec4 uScreenSize;
		#endif
		#ifdef LIT_TRANSFORMS
			uniform mat4 matrix_viewProjection;
			uniform mat4 matrix_model;
		#endif
		#ifdef STD_HEIGHT_MAP
			vec2 dUvOffset;
			#ifdef STD_PARALLAX_SELF_SHADOW
				float dParallaxHitDepth;
				float dParallaxLod;
			#endif
			#ifdef STD_HEIGHT_TEXTURE_ALLOCATE
				uniform sampler2D texture_heightMap;
			#endif
		#endif
		#ifdef STD_DIFFUSE_TEXTURE_ALLOCATE
			uniform sampler2D texture_diffuseMap;
		#endif
		#ifdef STD_DIFFUSEDETAIL_TEXTURE_ALLOCATE
			uniform sampler2D texture_diffuseDetailMap;
		#endif
		#ifdef STD_NORMAL_TEXTURE_ALLOCATE
			uniform sampler2D texture_normalMap;
		#endif
		#ifdef STD_NORMALDETAIL_TEXTURE_ALLOCATE
			uniform sampler2D texture_normalDetailMap;
		#endif
		#ifdef STD_THICKNESS_TEXTURE_ALLOCATE
			uniform sampler2D texture_thicknessMap;
		#endif
		#ifdef STD_REFRACTION_TEXTURE_ALLOCATE
			uniform sampler2D texture_refractionMap;
		#endif
		#ifdef LIT_IRIDESCENCE
			float dIridescence;
			float dIridescenceThickness;
			#ifdef STD_IRIDESCENCE_THICKNESS_TEXTURE_ALLOCATE
				uniform sampler2D texture_iridescenceThicknessMap;
			#endif
			#ifdef STD_IRIDESCENCE_TEXTURE_ALLOCATE
				uniform sampler2D texture_iridescenceMap;
			#endif
		#endif
		#ifdef LIT_CLEARCOAT
			float ccSpecularity;
			float ccGlossiness;
			vec3 ccNormalW;
		#endif
		#ifdef LIT_GGX_SPECULAR
			float dAnisotropy;
			vec2 dAnisotropyRotation;
		#endif
		#if defined(LIT_SPECULAR_OR_REFLECTION) || defined(LIT_REFRACTION)
			#ifdef LIT_SHEEN
				vec3 sSpecularity;
				float sGlossiness;
				#ifdef STD_SHEEN_TEXTURE_ALLOCATE
					uniform sampler2D texture_sheenMap;
				#endif
				#ifdef STD_SHEENGLOSS_TEXTURE_ALLOCATE
					uniform sampler2D texture_sheenGlossMap;
				#endif
			#endif
			#ifdef LIT_METALNESS
				float dMetalness;
				float dIor;
				#ifdef STD_METALNESS_TEXTURE_ALLOCATE
					uniform sampler2D texture_metalnessMap;
				#endif
			#endif
			#ifdef LIT_SPECULARITY_FACTOR
				float dSpecularityFactor;
				#ifdef STD_SPECULARITYFACTOR_TEXTURE_ALLOCATE
					uniform sampler2D texture_specularityFactorMap;
				#endif
			#endif
			#ifdef STD_SPECULAR_COLOR
				#ifdef STD_SPECULAR_TEXTURE_ALLOCATE
					uniform sampler2D texture_specularMap;
				#endif
			#endif
			#ifdef STD_GLOSS_TEXTURE_ALLOCATE
				uniform sampler2D texture_glossMap;
			#endif
		#endif
		#ifdef STD_AO
			float dAo;
			#ifdef STD_AO_TEXTURE_ALLOCATE
				uniform sampler2D texture_aoMap;
			#endif
			#ifdef STD_AODETAIL_TEXTURE_ALLOCATE
				uniform sampler2D texture_aoDetailMap;
			#endif
		#endif
		vec3 dEmission;
		#ifdef STD_EMISSIVE_TEXTURE_ALLOCATE
			uniform sampler2D texture_emissiveMap;
		#endif
		#ifdef LIT_CLEARCOAT
			#ifdef STD_CLEARCOAT_TEXTURE_ALLOCATE
				uniform sampler2D texture_clearCoatMap;
			#endif
			#ifdef STD_CLEARCOATGLOSS_TEXTURE_ALLOCATE
				uniform sampler2D texture_clearCoatGlossMap;
			#endif
			#ifdef STD_CLEARCOATNORMAL_TEXTURE_ALLOCATE
				uniform sampler2D texture_clearCoatNormalMap;
			#endif
		#endif
		
		#ifdef LIT_GGX_SPECULAR
			#ifdef STD_ANISOTROPY_TEXTURE_ALLOCATE
				uniform sampler2D texture_anisotropyMap;
			#endif
		#endif
		#if defined(STD_LIGHTMAP) || defined(STD_LIGHT_VERTEX_COLOR)
			vec3 dLightmap;
			#ifdef STD_LIGHT_TEXTURE_ALLOCATE
				uniform sampler2D texture_lightMap;
			#endif
		#endif
	#endif
	#include "litShaderCorePS"
`,stdFrontEndPS:`
	#if defined(FORWARD_PASS) && defined(STD_HEIGHT_MAP)
		#include "parallaxPS"
	#endif
	#if LIT_BLEND_TYPE != NONE || defined(LIT_ALPHA_TEST) || defined(LIT_ALPHA_TO_COVERAGE) || STD_OPACITY_DITHER != NONE
		#include "opacityPS"
		#if defined(LIT_ALPHA_TEST)
			#include "alphaTestPS"
		#endif
		#if STD_OPACITY_DITHER != NONE
			#include "opacityDitherPS"
		#endif
	#endif
	#ifdef FORWARD_PASS
		#include  "diffusePS"
		#ifdef LIT_NEEDS_NORMAL
			#include "normalMapPS"
		#endif
		#ifdef LIT_REFRACTION
			#include "transmissionPS"
			#include "thicknessPS"
			#ifndef LIT_METALNESS
				#include "iorPS"
			#endif
		#endif
		#ifdef LIT_IRIDESCENCE
			#include "iridescencePS"
			#include "iridescenceThicknessPS"
		#endif
		#if defined(LIT_SPECULAR_OR_REFLECTION) || defined(LIT_REFRACTION)
			#ifdef LIT_SHEEN
				#include "sheenPS"
				#include "sheenGlossPS"
			#endif
			#ifdef LIT_METALNESS
				#include "metalnessPS"
				#include "iorPS"
			#endif
			#ifdef LIT_SPECULARITY_FACTOR
				#include "specularityFactorPS"
			#endif
			#ifdef STD_SPECULAR_COLOR
				#include "specularPS"
			#else
				void getSpecularity() { 
					dSpecularity = vec3(1);
				}
			#endif
			#include "glossPS"
		#endif
		#ifdef STD_AO
			#include "aoPS"
		#endif
		#include "emissivePS"
		#ifdef LIT_CLEARCOAT
			#include "clearCoatPS"
			#include "clearCoatGlossPS"
			#include "clearCoatNormalPS"
		#endif
		#if defined(LIT_SPECULAR) && defined(LIT_LIGHTING) && defined(LIT_GGX_SPECULAR)
			#include "anisotropyPS"
		#endif
		#if defined(STD_LIGHTMAP) || defined(STD_LIGHT_VERTEX_COLOR)
			#include "lightmapPS"
		#endif
	#endif
	void evaluateFrontend() {
		#if defined(FORWARD_PASS) && defined(STD_HEIGHT_MAP)
			getParallax();
		#endif
		#if LIT_BLEND_TYPE != NONE || defined(LIT_ALPHA_TEST) || defined(LIT_ALPHA_TO_COVERAGE) || STD_OPACITY_DITHER != NONE
			getOpacity();
			#if defined(LIT_ALPHA_TEST)
				alphaTest(dAlpha);
			#endif
			#if STD_OPACITY_DITHER != NONE
				opacityDither(dAlpha * material_alphaDitherScale, 0.0);
			#endif
			litArgs_opacity = dAlpha;
		#endif
		#ifdef FORWARD_PASS
			getAlbedo();
			litArgs_albedo = dAlbedo;
			#ifdef LIT_NEEDS_NORMAL
				getNormal();
				litArgs_worldNormal = dNormalW;
			#endif
			#ifdef LIT_REFRACTION
				getRefraction();
				litArgs_transmission = dTransmission;
				getThickness();
				litArgs_thickness = dThickness;
				#ifndef LIT_METALNESS
					getIor();
					litArgs_ior = dIor;
				#endif
				#ifdef LIT_DISPERSION
					litArgs_dispersion = material_dispersion;
				#endif
			#endif
			#ifdef LIT_IRIDESCENCE
				getIridescence();
				getIridescenceThickness();
				litArgs_iridescence_intensity = dIridescence;
				litArgs_iridescence_thickness = dIridescenceThickness;
			#endif
			#if defined(LIT_SPECULAR_OR_REFLECTION) || defined(LIT_REFRACTION)
				#ifdef LIT_SHEEN
					getSheen();
					litArgs_sheen_specularity = sSpecularity;
					getSheenGlossiness();
					litArgs_sheen_gloss = sGlossiness;
				#endif
				#ifdef LIT_METALNESS
					getMetalness();
					litArgs_metalness = dMetalness;
					getIor();
					litArgs_ior = dIor;
				#endif
				#ifdef LIT_SPECULARITY_FACTOR
					getSpecularityFactor();
					litArgs_specularityFactor = dSpecularityFactor;
				#endif
				getGlossiness();
				getSpecularity();
				litArgs_specularity = dSpecularity;
				litArgs_gloss = dGlossiness;
			#endif
			#ifdef STD_AO
				getAO();
				litArgs_ao = dAo;
			#endif
			getEmission();
			litArgs_emission = dEmission;
			#ifdef LIT_CLEARCOAT
				getClearCoat();
				getClearCoatGlossiness();
				getClearCoatNormal();
				litArgs_clearcoat_specularity = ccSpecularity;
				litArgs_clearcoat_gloss = ccGlossiness;
				litArgs_clearcoat_worldNormal = ccNormalW;
			#endif
			#if defined(LIT_SPECULAR) && defined(LIT_LIGHTING) && defined(LIT_GGX_SPECULAR)
				getAnisotropy();
			#endif
			#if defined(STD_LIGHTMAP) || defined(STD_LIGHT_VERTEX_COLOR)
				getLightMap();
				litArgs_lightmap = dLightmap;
				#ifdef STD_LIGHTMAP_DIR
					litArgs_lightmapDir = dLightmapDir;
				#endif
			#endif
		#endif
	}
`,TBNPS:`
#ifdef LIT_TANGENTS
	#define TBN_TANGENTS
#else
	#if defined(LIT_USE_NORMALS) || defined(LIT_USE_CLEARCOAT_NORMALS) || defined(LIT_HEIGHTS)
		#define TBN_DERIVATIVES
	#endif
#endif
#if defined(TBN_DERIVATIVES)
	#ifndef TBNBASIS
		#define TBNBASIS
		uniform float tbnBasis;
	#endif
#endif
void getTBN(vec3 tangent, vec3 binormal, vec3 normal) {
	#ifdef TBN_TANGENTS
		dTBN = mat3(normalize(tangent), normalize(binormal), normalize(normal));
	#elif defined(TBN_DERIVATIVES)
		vec2 uv = {lightingUv};
		vec3 dp1 = dFdx( vPositionW );
		vec3 dp2 = dFdy( vPositionW );
		vec2 duv1 = dFdx( uv );
		vec2 duv2 = dFdy( uv );
		vec3 dp2perp = cross( dp2, normal );
		vec3 dp1perp = cross( normal, dp1 );
		vec3 T = dp2perp * duv1.x + dp1perp * duv2.x;
		vec3 B = dp2perp * duv1.y + dp1perp * duv2.y;
		float denom = max( dot(T,T), dot(B,B) );
		float invmax = (denom == 0.0) ? 0.0 : tbnBasis / sqrt( denom );
		dTBN = mat3(T * invmax, -B * invmax, normal );
	#else
		vec3 B = cross(normal, vObjectSpaceUpW);
		vec3 T = cross(normal, B);
		if (dot(B,B)==0.0)
		{
			float major=max(max(normal.x, normal.y), normal.z);
			if (normal.x == major)
			{
				B = cross(normal, vec3(0,1,0));
				T = cross(normal, B);
			}
			else if (normal.y == major)
			{
				B = cross(normal, vec3(0,0,1));
				T = cross(normal, B);
			}
			else if (normal.z == major)
			{
				B = cross(normal, vec3(1,0,0));
				T = cross(normal, B);
			}
		}
		dTBN = mat3(normalize(T), normalize(B), normalize(normal));
	#endif
}
`,thicknessPS:`
#ifdef STD_THICKNESS_CONSTANT
uniform float material_thickness;
#endif
void getThickness() {
	dThickness = 1.0;
	#ifdef STD_THICKNESS_CONSTANT
	dThickness *= material_thickness;
	#endif
	#ifdef STD_THICKNESS_TEXTURE
	dThickness *= texture2DBias({STD_THICKNESS_TEXTURE_NAME}, {STD_THICKNESS_TEXTURE_UV}, textureBias).{STD_THICKNESS_TEXTURE_CHANNEL};
	#endif
	#ifdef STD_THICKNESS_VERTEX
	dThickness *= saturate(vVertexColor.{STD_THICKNESS_VERTEX_CHANNEL});
	#endif
}
`,tonemappingPS:`
#ifndef TONEMAP_NO_EXPOSURE_UNIFORM
	#if TONEMAP != NONE
		uniform float exposure;
		float getExposure() { return exposure; }
	#else
		float getExposure() { return 1.0; }
	#endif
#endif
#if (TONEMAP == NONE)
	#include "tonemappingNonePS"
#elif TONEMAP == FILMIC
	#include "tonemappingFilmicPS"
#elif TONEMAP == LINEAR
	#include "tonemappingLinearPS"
#elif TONEMAP == HEJL
	#include "tonemappingHejlPS"
#elif TONEMAP == ACES
	#include "tonemappingAcesPS"
#elif TONEMAP == ACES2
	#include "tonemappingAces2PS"
#elif TONEMAP == NEUTRAL
	#include "tonemappingNeutralPS"
#endif
`,tonemappingAcesPS:`
vec3 toneMap(vec3 color) {
	float tA = 2.51;
	float tB = 0.03;
	float tC = 2.43;
	float tD = 0.59;
	float tE = 0.14;
	vec3 x = color * getExposure();
	return (x*(tA*x+tB))/(x*(tC*x+tD)+tE);
}
`,tonemappingAces2PS:`
const mat3 ACESInputMat = mat3(
	0.59719, 0.35458, 0.04823,
	0.07600, 0.90834, 0.01566,
	0.02840, 0.13383, 0.83777
);
const mat3 ACESOutputMat = mat3(
	 1.60475, -0.53108, -0.07367,
	-0.10208,  1.10813, -0.00605,
	-0.00327, -0.07276,  1.07602
);
vec3 RRTAndODTFit(vec3 v) {
	vec3 a = v * (v + 0.0245786) - 0.000090537;
	vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
	return a / b;
}
vec3 toneMap(vec3 color) {
	color *= getExposure() / 0.6;
	color = color * ACESInputMat;
	color = RRTAndODTFit(color);
	color = color * ACESOutputMat;
	color = clamp(color, 0.0, 1.0);
	return color;
}
`,tonemappingFilmicPS:`
const float A =  0.15;
const float B =  0.50;
const float C =  0.10;
const float D =  0.20;
const float E =  0.02;
const float F =  0.30;
const float W =  11.2;
vec3 uncharted2Tonemap(vec3 x) {
	 return ((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F))-E/F;
}
vec3 toneMap(vec3 color) {
	color = uncharted2Tonemap(color * getExposure());
	vec3 whiteScale = 1.0 / uncharted2Tonemap(vec3(W,W,W));
	color = color * whiteScale;
	return color;
}
`,tonemappingHejlPS:`
vec3 toneMap(vec3 color) {
	color *= getExposure();
	const float  A = 0.22, B = 0.3, C = .1, D = 0.2, E = .01, F = 0.3;
	const float Scl = 1.25;
	vec3 h = max( vec3(0.0), color - vec3(0.004) );
	return (h*((Scl*A)*h+Scl*vec3(C*B,C*B,C*B))+Scl*vec3(D*E,D*E,D*E)) / (h*(A*h+vec3(B,B,B))+vec3(D*F,D*F,D*F)) - Scl*vec3(E/F,E/F,E/F);
}
`,tonemappingLinearPS:`
vec3 toneMap(vec3 color) {
	return color * getExposure();
}
`,tonemappingNeutralPS:`
vec3 toneMap(vec3 color) {
	color *= getExposure();
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, newPeak * vec3(1, 1, 1), g);
}
`,tonemappingNonePS:`
vec3 toneMap(vec3 color) {
	return color;
}
`,transformVS:`
#ifdef PIXELSNAP
uniform vec4 uScreenSize;
#endif
#ifdef SCREENSPACE
uniform float projectionFlipY;
#endif
vec4 evalWorldPosition(vec3 vertexPosition, mat4 modelMatrix) {
	vec3 localPos = getLocalPosition(vertexPosition);
	#ifdef NINESLICED
		localPos.xz *= outerScale;
		vec2 positiveUnitOffset = clamp(vertexPosition.xz, vec2(0.0), vec2(1.0));
		vec2 negativeUnitOffset = clamp(-vertexPosition.xz, vec2(0.0), vec2(1.0));
		localPos.xz += (-positiveUnitOffset * innerOffset.xy + negativeUnitOffset * innerOffset.zw) * vertex_texCoord0.xy;
		vTiledUv = (localPos.xz - outerScale + innerOffset.xy) * -0.5 + 1.0;
		localPos.xz *= -0.5;
		localPos = localPos.xzy;
	#endif
	vec4 posW = modelMatrix * vec4(localPos, 1.0);
	#ifdef SCREENSPACE
		posW.zw = vec2(0.0, 1.0);
	#endif
	return posW;
}
vec4 getPosition() {
	dModelMatrix = getModelMatrix();
	vec4 posW = evalWorldPosition(vertex_position.xyz, dModelMatrix);
	dPositionW = posW.xyz;
	vec4 screenPos;
	#ifdef UV1LAYOUT
		screenPos = vec4(vertex_texCoord1.xy * 2.0 - 1.0, 0.5, 1);
		#ifdef WEBGPU
			screenPos.y *= -1.0;
		#endif
	#else
		#ifdef SCREENSPACE
			screenPos = posW;
			screenPos.y *= projectionFlipY;
		#else
			screenPos = matrix_viewProjection * posW;
		#endif
		#ifdef PIXELSNAP
			screenPos.xy = (screenPos.xy * 0.5) + 0.5;
			screenPos.xy *= uScreenSize.xy;
			screenPos.xy = floor(screenPos.xy);
			screenPos.xy *= uScreenSize.zw;
			screenPos.xy = (screenPos.xy * 2.0) - 1.0;
		#endif
	#endif
	return screenPos;
}
vec3 getWorldPosition() {
	return dPositionW;
}
`,transformCoreVS:`
attribute vec4 vertex_position;
uniform mat4 matrix_viewProjection;
uniform mat4 matrix_model;
#ifdef MORPHING
	uniform vec2 morph_tex_params;
	attribute uint morph_vertex_id;
	ivec2 getTextureMorphCoords() {
		ivec2 textureSize = ivec2(morph_tex_params);
		int morphGridV = int(morph_vertex_id) / textureSize.x;
		int morphGridU = int(morph_vertex_id) - (morphGridV * textureSize.x);
		#ifdef WEBGPU
			morphGridV = textureSize.y - morphGridV - 1;
		#endif
		return ivec2(morphGridU, morphGridV);
	}
	#ifdef MORPHING_POSITION
		#ifdef MORPHING_INT
			uniform vec3 aabbSize;
			uniform vec3 aabbMin;
			uniform usampler2D morphPositionTex;
		#else
			uniform highp sampler2D morphPositionTex;
		#endif
	#endif
#endif
#ifdef defined(BATCH)
	#include "skinBatchVS"
	mat4 getModelMatrix() {
		return getBoneMatrix(vertex_boneIndices);
	}
#elif defined(SKIN)
	#include "skinVS"
	mat4 getModelMatrix() {
		return matrix_model * getSkinMatrix(vertex_boneIndices, vertex_boneWeights);
	}
#elif defined(INSTANCING)
	#include "transformInstancingVS"
#else
	mat4 getModelMatrix() {
		return matrix_model;
	}
#endif
vec3 getLocalPosition(vec3 vertexPosition) {
	vec3 localPos = vertexPosition;
	#ifdef MORPHING_POSITION
		ivec2 morphUV = getTextureMorphCoords();
		#ifdef MORPHING_INT
			vec3 morphPos = vec3(texelFetch(morphPositionTex, ivec2(morphUV), 0).xyz) / 65535.0 * aabbSize + aabbMin;
		#else
			vec3 morphPos = texelFetch(morphPositionTex, ivec2(morphUV), 0).xyz;
		#endif
		localPos += morphPos;
	#endif
	return localPos;
}
`,transformInstancingVS:`
attribute vec4 instance_line1;
attribute vec4 instance_line2;
attribute vec4 instance_line3;
attribute vec4 instance_line4;
mat4 getModelMatrix() {
	return matrix_model * mat4(instance_line1, instance_line2, instance_line3, instance_line4);
}
`,transmissionPS:`
#ifdef STD_REFRACTION_CONSTANT
uniform float material_refraction;
#endif
void getRefraction() {
	float refraction = 1.0;
	#ifdef STD_REFRACTION_CONSTANT
	refraction = material_refraction;
	#endif
	#ifdef STD_REFRACTION_TEXTURE
	refraction *= texture2DBias({STD_REFRACTION_TEXTURE_NAME}, {STD_REFRACTION_TEXTURE_UV}, textureBias).{STD_REFRACTION_TEXTURE_CHANNEL};
	#endif
	#ifdef STD_REFRACTION_VERTEX
	refraction *= saturate(vVertexColor.{STD_REFRACTION_VERTEX_CHANNEL});
	#endif
	dTransmission = refraction;
}
`,twoSidedLightingPS:`
void handleTwoSidedLighting() {
	if (!gl_FrontFacing) dTBN[2] = -dTBN[2];
}
`,uv0VS:`
#ifdef NINESLICED
	vec2 getUv0() {
		vec2 uv = vertex_position.xz;
		vec2 positiveUnitOffset = clamp(vertex_position.xz, vec2(0.0), vec2(1.0));
		vec2 negativeUnitOffset = clamp(-vertex_position.xz, vec2(0.0), vec2(1.0));
		uv += (-positiveUnitOffset * innerOffset.xy + negativeUnitOffset * innerOffset.zw) * vertex_texCoord0.xy;
		uv = uv * -0.5 + 0.5;
		uv = uv * atlasRect.zw + atlasRect.xy;
		vMask = vertex_texCoord0.xy;
		return uv;
	}
#else
	vec2 getUv0() {
		return vertex_texCoord0;
	}
#endif
`,uv1VS:`
vec2 getUv1() {
	return vertex_texCoord1;
}
`,uvTransformVS:`
vUV{TRANSFORM_UV_{i}}_{TRANSFORM_ID_{i}} = vec2(
	dot(vec3(uv{TRANSFORM_UV_{i}}, 1), {TRANSFORM_NAME_{i}}0),
	dot(vec3(uv{TRANSFORM_UV_{i}}, 1), {TRANSFORM_NAME_{i}}1)
);
`,uvTransformUniformsPS:`
	uniform vec3 {TRANSFORM_NAME_{i}}0;
	uniform vec3 {TRANSFORM_NAME_{i}}1;
`,viewDirPS:`
void getViewDir() {
	dViewDirW = normalize(view_position - vPositionW);
}
`,webgpuPS:ii,webgpuVS:ai},vm={},ym=null,bm=class e extends b{constructor(t){super(),v(this,`_batcher`,null),v(this,`_destroyRequested`,!1),v(this,`_inFrameUpdate`,!1),v(this,`_librariesLoaded`,!1),v(this,`_fillMode`,hp),v(this,`_resolutionMode`,_p),v(this,`_allowResize`,!0),v(this,`_skyboxAsset`,null),v(this,`_soundManager`,void 0),v(this,`_visibilityChangeHandler`,void 0),v(this,`_entityIndex`,{}),v(this,`_inTools`,!1),v(this,`_scriptPrefix`,``),v(this,`_time`,0),v(this,`enableBundles`,typeof TextDecoder<`u`),v(this,`frameRequestId`,void 0),v(this,`tick`,(e,t)=>{if(!this.graphicsDevice)return;this.frameRequestId&&(this.xr?.session?.cancelAnimationFrame(this.frameRequestId),cancelAnimationFrame(this.frameRequestId),this.frameRequestId=null),this._inFrameUpdate=!0,bp(this),ym=this;let n=this._processTimestamp(e)||S(),r=n-(this._time||n),i=r/1e3;if(i=E.clamp(i,0,this.maxDeltaTime),i*=this.timeScale,this._time=n,this.requestAnimationFrame(),this.graphicsDevice.contextLost)return;this.stats.updateBasic(n,i,r,this.renderer,this.graphicsDevice),this.fire(`frameupdate`,r);let a=!1;t&&(a=!this.xr?.update(t)),a||(this.update(i),this.fire(`framerender`),(this.autoRender||this.renderNextFrame)&&(this.render(),this.renderNextFrame=!1),this.fire(`frameend`),this.stats.frameEnd()),this._inFrameUpdate=!1,this._destroyRequested&&this.destroy()}),v(this,`timeScale`,1),v(this,`maxDeltaTime`,.1),v(this,`frame`,0),v(this,`frameGraph`,new xp),v(this,`renderer`,void 0),v(this,`scriptsOrder`,[]),v(this,`stats`,void 0),v(this,`autoRender`,!0),v(this,`renderNextFrame`,!1),v(this,`graphicsDevice`,void 0),v(this,`root`,void 0),v(this,`scene`,void 0),v(this,`lightmapper`,null),v(this,`loader`,new Jp(this)),v(this,`assets`,new Vp(this.loader)),v(this,`bundles`,void 0),v(this,`scenes`,new hm(this)),v(this,`scripts`,new am(this)),v(this,`systems`,new Up),v(this,`i18n`,new Xp(this)),v(this,`keyboard`,null),v(this,`mouse`,null),v(this,`touch`,null),v(this,`gamepads`,null),v(this,`elementInput`,null),v(this,`xr`,null),e._applications[t.id]=this,bp(this),ym=this,this.root=new fm,this.root._enabledInHierarchy=!0}init(e){let{assetPrefix:t,batchManager:n,componentSystems:r,elementInput:i,gamepads:a,graphicsDevice:o,keyboard:s,lightmapper:c,mouse:l,physicsWorld:u,resourceHandlers:d,scriptsOrder:f,scriptPrefix:p,soundManager:m,touch:h,xr:g}=e;this.graphicsDevice=o,Io.get(o,Lt).add(_m),Io.get(o,Rt).add(vm),this._initDefaultMaterial(),this._initProgramLibrary(),this.stats=new gm(this),this._soundManager=m,this.scene=new xf(o),this._registerSceneImmediate(this.scene),t&&(this.assets.prefix=t),this.bundles=new Hp(this.assets),this.scriptsOrder=f||[],this.defaultLayerWorld=new tu({name:`World`,id:0}),this.defaultLayerDepth=new tu({name:`Depth`,id:1,enabled:!1,opaqueSortMode:0}),this.defaultLayerSkybox=new tu({name:`Skybox`,id:2,opaqueSortMode:0}),this.defaultLayerUi=new tu({name:`UI`,id:4,transparentSortMode:1}),this.defaultLayerImmediate=new tu({name:`Immediate`,id:3,opaqueSortMode:0});let _=new au(`default`);_.pushOpaque(this.defaultLayerWorld),_.pushOpaque(this.defaultLayerDepth),_.pushOpaque(this.defaultLayerSkybox),_.pushTransparent(this.defaultLayerWorld),_.pushOpaque(this.defaultLayerImmediate),_.pushTransparent(this.defaultLayerImmediate),_.pushTransparent(this.defaultLayerUi),this.scene.layers=_,wp.createPlaceholder(o),this.renderer=new Gl(o,this.scene),c&&(this.lightmapper=new c(o,this.root,this.scene,this.renderer,this.assets),this.once(`prerender`,this._firstBake,this)),n&&(this._batcher=new n(o,this.root,this.scene),this.once(`prerender`,this._firstBatch,this)),this.keyboard=s||null,this.mouse=l||null,this.touch=h||null,this.gamepads=a||null,i&&(this.elementInput=i,this.elementInput.app=this),this.xr=g?new g(this):null,this.elementInput&&this.elementInput.attachSelectEvents(),this._scriptPrefix=p||``,this.enableBundles&&this.loader.addHandler(`bundle`,new qp(this)),d.forEach(e=>{let t=new e(this);this.loader.addHandler(t.handlerType,t)}),this.loader.enableRetry(),r.forEach(e=>{this.systems.add(new e(this))}),u&&this.systems.rigidbody?.setPhysicsWorld(u),this._visibilityChangeHandler=this.onVisibilityChange.bind(this),typeof document<`u`&&document.addEventListener(`visibilitychange`,this._visibilityChangeHandler,!1)}static getApplication(t){return t?e._applications[t]:yp()}_initDefaultMaterial(){let e=new Kf;e.name=`Default Material`,Ss(this.graphicsDevice,e)}_initProgramLibrary(){let e=new pp(this.graphicsDevice,new Kf);ko(this.graphicsDevice,e)}get soundManager(){return this._soundManager}get batcher(){return this._batcher}get fillMode(){return this._fillMode}get resolutionMode(){return this._resolutionMode}configure(e,t){Ea.get(e,(e,n)=>{if(e){t(e);return}let r=n.application_properties,i=n.scenes,a=n.assets;this._parseApplicationProperties(r,e=>{this._parseScenes(i),this._parseAssets(a),t(e||null)})})}preload(e){this.fire(`preload:start`);let t=this.assets.list({preload:!0});if(t.length===0){this.fire(`preload:end`),e();return}let n=0,r=()=>{n++,this.fire(`preload:progress`,n/t.length),n===t.length&&(this.fire(`preload:end`),e())};t.forEach(e=>{e.loaded?r():(e.once(`load`,r),e.once(`error`,r),this.assets.load(e))})}_preloadScripts(e,t){t()}_parseApplicationProperties(e,t){if(typeof e.maxAssetRetries==`number`&&e.maxAssetRetries>0&&this.loader.enableRetry(e.maxAssetRetries),typeof e.maxConcurrentRequests==`number`&&e.maxConcurrentRequests>=0&&(this.loader.maxConcurrentRequests=e.maxConcurrentRequests),typeof e.withCredentials==`boolean`&&(this.loader.withCredentials=e.withCredentials),e.useDevicePixelRatio||(e.useDevicePixelRatio=e.use_device_pixel_ratio),e.resolutionMode||(e.resolutionMode=e.resolution_mode),e.fillMode||(e.fillMode=e.fill_mode),this._width=e.width,this._height=e.height,e.useDevicePixelRatio&&(this.graphicsDevice.maxPixelRatio=window.devicePixelRatio),this.setCanvasResolution(e.resolutionMode,this._width,this._height),this.setCanvasFillMode(e.fillMode,this._width,this._height),e.layers&&e.layerOrder){let t=new au(`application`),n={};for(let t in e.layers){let r=e.layers[t];r.id=parseInt(t,10),r.enabled=r.id!==1,n[t]=new tu(r)}for(let r=0,i=e.layerOrder.length;r<i;r++){let i=e.layerOrder[r],a=n[i.layer];a&&(i.transparent?t.pushTransparent(a):t.pushOpaque(a),t.subLayerEnabled[r]=i.enabled)}this.scene.layers=t}if(e.batchGroups){let t=this.batcher;if(t)for(let n=0,r=e.batchGroups.length;n<r;n++){let r=e.batchGroups[n];t.addGroup(r.name,r.dynamic,r.maxAabbSize,r.id,r.layers)}}e.i18nAssets&&(this.i18n.assets=e.i18nAssets),this._loadLibraries(e.libraries,t)}_loadLibraries(e,t){let n=e.length,r=n,a=/^https?:\/\//;if(n){let o=(e,n)=>{r--,e?t(e):r===0&&(this.onLibrariesLoaded(),t(null))};for(let t=0;t<n;++t){let n=e[t];!a.test(n.toLowerCase())&&this._scriptPrefix&&(n=i.join(this._scriptPrefix,n)),this.loader.load(n,`script`,o)}}else this.onLibrariesLoaded(),t(null)}_parseScenes(e){if(e)for(let t=0;t<e.length;t++)this.scenes.add(e[t].name,e[t].url)}_parseAssets(e){let t=[],n={},r={};for(let r=0;r<this.scriptsOrder.length;r++){let i=this.scriptsOrder[r];e[i]&&(n[i]=!0,t.push(e[i]))}if(this.enableBundles)for(let n in e)e[n].type===`bundle`&&(r[n]=!0,t.push(e[n]));for(let i in e)n[i]||r[i]||t.push(e[i]);for(let e=0;e<t.length;e++){let n=t[e],r=new zp(n.name,n.type,n.file,n.data);if(r.id=parseInt(n.id,10),r.preload=n.preload?n.preload:!1,r.loaded=n.type===`script`&&n.data&&n.data.loadingType>0,r.tags.add(n.tags),n.i18n)for(let e in n.i18n)r.addLocalizedAssetId(e,n.i18n[e]);this.assets.add(r)}}start(){this.frame=0,this.fire(`start`,{timestamp:S(),target:this}),this._librariesLoaded||this.onLibrariesLoaded(),this.systems.fire(`initialize`,this.root),this.fire(`initialize`),this.systems.fire(`postInitialize`,this.root),this.systems.fire(`postPostInitialize`,this.root),this.fire(`postinitialize`),this.requestAnimationFrame()}requestAnimationFrame(){this.frameRequestId=this.xr?.session?this.xr.session.requestAnimationFrame(this.tick):m.browser||m.worker?requestAnimationFrame(this.tick):null}inputUpdate(e){this.mouse&&this.mouse.update(),this.keyboard&&this.keyboard.update(),this.gamepads&&this.gamepads.update()}update(e){this.frame++,this.graphicsDevice.update(),this.stats.frame.scriptUpdateStart=S(),this.systems.fire(this._inTools?`toolsUpdate`:`update`,e),this.stats.frame.scriptUpdate=S()-this.stats.frame.scriptUpdateStart,this.stats.frame.animUpdateStart=S(),this.systems.fire(`animationUpdate`,e),this.stats.frame.animUpdate=S()-this.stats.frame.animUpdateStart,this.stats.frame.scriptPostUpdateStart=S(),this.systems.fire(`postUpdate`,e),this.stats.frame.scriptPostUpdate=S()-this.stats.frame.scriptPostUpdateStart,this.fire(`update`,e),this.inputUpdate(e)}render(){this.updateCanvasSize(),this.graphicsDevice.frameStart(),this.fire(`prerender`),this.root.syncHierarchy(),this._batcher&&this._batcher.updateAll(),this.renderComposition(this.scene.layers),this.fire(`postrender`),this.stats.frame.renderTime=S()-this.stats.frame.renderStart,this.graphicsDevice.frameEnd()}renderComposition(e){this.renderer.update(e),this.renderer.buildFrameGraph(this.frameGraph,e),this.renderer.cull(e),this.frameGraph.render(this.graphicsDevice)}setCanvasFillMode(e,t,n){this._fillMode=e,this.resizeCanvas(t,n)}setCanvasResolution(e,t,n){this._resolutionMode=e,e===`AUTO`&&t===void 0&&(t=this.graphicsDevice.canvas.clientWidth,n=this.graphicsDevice.canvas.clientHeight),this.graphicsDevice.resizeCanvas(t,n)}isHidden(){return document.hidden}onVisibilityChange(){this.isHidden()?this._soundManager&&this._soundManager.suspend():this._soundManager&&this._soundManager.resume()}resizeCanvas(e,t){if(!this._allowResize||this.xr&&this.xr.session)return;let n=window.innerWidth,r=window.innerHeight;if(this._fillMode===`KEEP_ASPECT`){let i=this.graphicsDevice.canvas.width/this.graphicsDevice.canvas.height;i>n/r?(e=n,t=e/i):(t=r,e=t*i)}else this._fillMode===`FILL_WINDOW`&&(e=n,t=r);return this.graphicsDevice.canvas.style.width=`${e}px`,this.graphicsDevice.canvas.style.height=`${t}px`,this.updateCanvasSize(),{width:e,height:t}}updateCanvasSize(){if(this._allowResize&&!this.xr?.active&&this._resolutionMode===`AUTO`){let e=this.graphicsDevice.canvas;this.graphicsDevice.resizeCanvas(e.clientWidth,e.clientHeight)}}onLibrariesLoaded(){this._librariesLoaded=!0,this.systems.rigidbody&&this.systems.rigidbody.onLibraryLoaded()}applySceneSettings(e){let t;if(this.systems.rigidbody){let[t,n,r]=e.physics.gravity;this.systems.rigidbody.gravity.set(t,n,r)}this.scene.applySettings(e),e.render.hasOwnProperty(`skybox`)&&(e.render.skybox?(t=this.assets.get(e.render.skybox),t?this.setSkybox(t):this.assets.once(`add:${e.render.skybox}`,this.setSkybox,this)):this.setSkybox(null))}setAreaLightLuts(e,t){e&&t&&wp.set(this.graphicsDevice,e,t)}setSkybox(e){e!==this._skyboxAsset&&(this._skyboxAsset&&(this.assets.off(`load:${this._skyboxAsset.id}`,this._onSkyboxChanged,this),this.assets.off(`remove:${this._skyboxAsset.id}`,this._onSkyboxRemoved,this),this._skyboxAsset.off(`change`,this._onSkyboxChanged,this)),this._skyboxAsset=e,this._skyboxAsset&&(this.assets.on(`load:${this._skyboxAsset.id}`,this._onSkyboxChanged,this),this.assets.once(`remove:${this._skyboxAsset.id}`,this._onSkyboxRemoved,this),this._skyboxAsset.on(`change`,this._onSkyboxChanged,this),this.scene.skyboxMip===0&&!this._skyboxAsset.loadFaces&&(this._skyboxAsset.loadFaces=!0),this.assets.load(this._skyboxAsset)),this._onSkyboxChanged())}_onSkyboxRemoved(){this.setSkybox(null)}_onSkyboxChanged(){this.scene.setSkybox(this._skyboxAsset?this._skyboxAsset.resources:null)}_firstBake(){this.lightmapper?.bake(null,this.scene.lightmapMode)}_firstBatch(){this.batcher?.generate()}_processTimestamp(e){return e}drawLine(e,t,n,r,i){this.scene.drawLine(e,t,n,r,i)}drawLines(e,t,n=!0,r=this.scene.defaultDrawLayer){this.scene.drawLines(e,t,n,r)}drawLineArrays(e,t,n=!0,r=this.scene.defaultDrawLayer){this.scene.drawLineArrays(e,t,n,r)}drawWireSphere(){}drawWireAlignedBox(){}drawMeshInstance(e,t=this.scene.defaultDrawLayer){this.scene.immediate.drawMesh(null,null,null,e,t)}drawMesh(e,t,n,r=this.scene.defaultDrawLayer){this.scene.immediate.drawMesh(t,n,e,null,r)}drawQuad(e,t,n=this.scene.defaultDrawLayer){this.scene.immediate.drawMesh(t,e,this.scene.immediate.getQuadMesh(),null,n)}drawTexture(e,t,n,r,i,a,o=this.scene.defaultDrawLayer,s=!0){if(s===!1&&!this.graphicsDevice.isWebGPU)return;let c=new M;c.setTRS(new k(e,t,0),N.IDENTITY,new k(n,-r,0)),a||(a=new yu,a.cull=0,a.setParameter(`colorMap`,i),a.shaderDesc=s?this.scene.immediate.getTextureShaderDesc(i.encoding):this.scene.immediate.getUnfilterableTextureShaderDesc(),a.update()),this.drawQuad(c,a,o)}drawDepthTexture(e,t,n,r,i=this.scene.defaultDrawLayer){let a=new yu;a.cull=0,a.shaderDesc=this.scene.immediate.getDepthTextureShaderDesc(),a.update(),this.drawTexture(e,t,n,r,null,a,i)}destroy(){if(this._inFrameUpdate){this._destroyRequested=!0;return}let t=this.graphicsDevice.canvas.id;this.fire(`destroy`,this),this.off(`librariesloaded`),this._gsplatSortedEvt?.off(),this._gsplatSortedEvt=null,typeof document<`u`&&document.removeEventListener(`visibilitychange`,this._visibilityChangeHandler,!1),this._visibilityChangeHandler=null,this.root.destroy(),this.root=null,this.mouse&&(this.mouse.off(),this.mouse.detach(),this.mouse=null),this.keyboard&&(this.keyboard.off(),this.keyboard.detach(),this.keyboard=null),this.touch&&(this.touch.off(),this.touch.detach(),this.touch=null),this.elementInput&&(this.elementInput.detach(),this.elementInput=null),this.gamepads&&(this.gamepads.destroy(),this.gamepads=null),this.systems.destroy(),this.bundles.destroy(),this.bundles=null,this.i18n.destroy(),this.i18n=null,this.loader.getHandler(`script`)?.clearCache(),this.loader.destroy(),this.loader=null,this.systems=null,this.context=null,this.scripts.destroy(),this.scripts=null,this.scenes.destroy(),this.scenes=null,this.lightmapper?.destroy(),this.lightmapper=null,this._batcher&&(this._batcher.destroy(),this._batcher=null),this._entityIndex={},this.defaultLayerDepth.onDisable=null,this.defaultLayerDepth.onEnable=null,this.defaultLayerDepth=null,this.defaultLayerWorld=null,this.xr?.end(),this.xr?.destroy(),this.renderer.destroy(),this.renderer=null;let n=this.assets.list();for(let e=0;e<n.length;e++)n[e].unload(),n[e].off();this.assets.destroy(),this.assets=null,this.scene.destroy(),this.scene=null,this.graphicsDevice.destroy(),this.graphicsDevice=null,this.off(),this._soundManager?.destroy(),this._soundManager=null,e._applications[t]=null,yp()===this&&bp(null),ym===this&&(ym=null),e.cancelTick(this)}static cancelTick(e){e.frameRequestId&&(cancelAnimationFrame(e.frameRequestId),e.frameRequestId=void 0)}getEntityFromIndex(e){return this._entityIndex[e]}_registerSceneImmediate(e){this.on(`postrender`,e.immediate.onPostRender,e.immediate),this._gsplatSortedEvt=e.on(`gsplat:sorted`,e=>{this.stats.frame.gsplatSort+=e})}isFullscreen(){return!!document.fullscreenElement}enableFullscreen(e,t,n){e=e||this.graphicsDevice.canvas;let r=function(){t(),document.removeEventListener(`fullscreenchange`,r)},i=function(){n(),document.removeEventListener(`fullscreenerror`,i)};t&&document.addEventListener(`fullscreenchange`,r,!1),n&&document.addEventListener(`fullscreenerror`,i,!1),e.requestFullscreen?e.requestFullscreen(Element.ALLOW_KEYBOARD_INPUT):n()}disableFullscreen(e){let t=function(){e(),document.removeEventListener(`fullscreenchange`,t)};e&&document.addEventListener(`fullscreenchange`,t,!1),document.exitFullscreen()}getSceneUrl(e){let t=this.scenes.find(e);return t?t.url:null}loadScene(e,t){this.scenes.loadScene(e,t)}loadSceneHierarchy(e,t){this.scenes.loadSceneHierarchy(e,t)}loadSceneSettings(e,t){this.scenes.loadSceneSettings(e,t)}};v(bm,`_applications`,{}),Gl.prototype.renderComposition=function(e){yp().renderComposition(e)};var xm=class{constructor(){v(this,`elementInput`,void 0),v(this,`keyboard`,void 0),v(this,`mouse`,void 0),v(this,`touch`,void 0),v(this,`gamepads`,void 0),v(this,`scriptPrefix`,void 0),v(this,`assetPrefix`,void 0),v(this,`scriptsOrder`,void 0),v(this,`soundManager`,void 0),v(this,`physicsWorld`,void 0),v(this,`graphicsDevice`,void 0),v(this,`lightmapper`,void 0),v(this,`batchManager`,void 0),v(this,`xr`,void 0),v(this,`componentSystems`,[]),v(this,`resourceHandlers`,[])}},Sm=class extends b{constructor(e){super(),v(this,`id`,void 0),v(this,`extraDataProperties`,[]),v(this,`_validProps`,null),this.app=e,this.store={},this.schema=[]}addComponent(e,t={}){let n=new this.ComponentType(this,e),r=this.DataType?new this.DataType:{};return this.store[e.guid]={entity:e,data:r},e[this.id]=n,e.c[this.id]=n,this.initializeComponentData(n,t),this.fire(`add`,e,n),n}removeComponent(e){let t=this.id,n=this.store[e.guid],r=e.c[t];r.fire(`beforeremove`),this.fire(`beforeremove`,e,r),delete this.store[e.guid],e[t]=void 0,delete e.c[t],this.fire(`remove`,e,n.data)}cloneComponent(e,t){let n=this.store[e.guid];return this.addComponent(t,n.data)}initializeComponentData(e,t={},n){if(n)for(let r=0,i=n.length;r<i;r++){let i=n[r],a,o;typeof i==`object`?(a=i.name,o=i.type):(a=i,o=void 0);let s=t[a];s===void 0?e.data&&a in e.data&&(e[a]=e.data[a]):(o!==void 0&&(s=Cm(s,o)),e[a]=s)}else t.enabled!==void 0&&(e.enabled=t.enabled);e.enabled&&e.entity.enabled&&e.onEnable()}getPropertiesOfType(e){let t=[];return(this.schema||[]).forEach(n=>{n&&typeof n==`object`&&n.type===e&&t.push(n)}),t}destroy(){this.off()}};function Cm(e,t){if(!e)return e;switch(t){case`rgb`:return e instanceof O?e.clone():new O(e[0],e[1],e[2]);case`rgba`:return e instanceof O?e.clone():new O(e[0],e[1],e[2],e[3]);case`vec2`:return e instanceof A?e.clone():new A(e[0],e[1]);case`vec3`:return e instanceof k?e.clone():new k(e[0],e[1],e[2]);case`vec4`:return e instanceof j?e.clone():new j(e[0],e[1],e[2],e[3]);case`boolean`:case`number`:case`string`:return e;case`entity`:return e;default:throw Error(`Could not convert unhandled type: ${t}`)}}var wm=class e extends b{constructor(e,t){super(),v(this,`system`,void 0),v(this,`entity`,void 0),v(this,`_enabled`,!0),this.system=e,this.entity=t,this.system.schema?.length&&!this._accessorsBuilt&&this.buildAccessors(this.system.schema),this.on(`set`,function(e,t,n){this.fire(`set_${e}`,e,t,n)}),this.on(`set_enabled`,this.onSetEnabled,this)}static _buildAccessors(e,t){t.forEach(t=>{let n=typeof t==`object`?t.name:t;Object.defineProperty(e,n,{get:function(){return this.data[n]},set:function(e){let t=this.data,r=t[n];t[n]=e,this.fire(`set`,n,r,e)},configurable:!0})}),e._accessorsBuilt=!0}buildAccessors(t){e._buildAccessors(this,t)}onSetEnabled(e,t,n){t!==n&&this.entity.enabled&&(n?this.onEnable():this.onDisable())}onEnable(){}onDisable(){}onPostStateChange(){}get data(){let e=this.system.store[this.entity.guid];return e?e.data:null}set enabled(e){let t=this._enabled;this._enabled=e,this.fire(`set`,`enabled`,t,e)}get enabled(){return this._enabled}};v(wm,`order`,0);var Tm=class{constructor(){v(this,`map`,new Map)}destroy(e){this.map.forEach(e=>e.mesh.destroy())}},Em=new an,Dm=(e,t)=>{let n=Em.get(e,()=>new Tm),r=n.map.get(t);if(!r){let i,a;switch(t){case`box`:i=ts.fromGeometry(e,new Od),a={x:2,y:2,z:2,uv:2/3};break;case`capsule`:i=ts.fromGeometry(e,new cp({radius:.5,height:2})),a={x:Math.PI*2,y:Math.PI,z:Math.PI*2,uv:1/3+1/3/3*2};break;case`cone`:i=ts.fromGeometry(e,new lp({baseRadius:.5,peakRadius:0,height:1})),a={x:2.54,y:2.54,z:2.54,uv:1/3+1/3/3};break;case`cylinder`:i=ts.fromGeometry(e,new up({radius:.5,height:1})),a={x:Math.PI,y:1.58,z:Math.PI,uv:1/3+1/3/3*2};break;case`plane`:i=ts.fromGeometry(e,new dp({halfExtents:new A(.5,.5),widthSegments:1,lengthSegments:1})),a={x:0,y:1,z:0,uv:1};break;case`sphere`:i=ts.fromGeometry(e,new kd({radius:.5})),a={x:Math.PI,y:Math.PI,z:Math.PI,uv:1};break;case`torus`:i=ts.fromGeometry(e,new fp({tubeRadius:.2,ringRadius:.3})),a={x:Math.PI*.5*.5-Math.PI*.1*.1,y:.4,z:.4,uv:1};break;default:throw Error(`Invalid primitive type: ${t}`)}i.incRefCount(),r={mesh:i,area:a},n.map.set(t,r)}return r},Om=class extends vr{constructor(e,t){super(),this.skin=e,this.skinInstance=t}},km=class e{static createCachedSkinInstance(t,n,r){let i=e.getCachedSkinInstance(t,n);return i||(i=new Xo(t),i.resolve(n,r),e.addCachedSkinInstance(t,n,i)),i}static getCachedSkinInstance(t,n){let r=null,i=e._skinInstanceCache.get(n);if(i){let e=i.find(e=>e.skin===t);e&&(e.incRefCount(),r=e.skinInstance)}return r}static addCachedSkinInstance(t,n,r){let i=e._skinInstanceCache.get(n);i||(i=[],e._skinInstanceCache.set(n,i));let a=i.find(e=>e.skin===t);a||(a=new Om(t,r),i.push(a)),a.incRefCount()}static removeCachedSkinInstance(t){if(t){let n=t.rootBone;if(n){let r=e._skinInstanceCache.get(n);if(r){let i=r.findIndex(e=>e.skinInstance===t);if(i>=0){let a=r[i];a.decRefCount(),a.refCount===0&&(r.splice(i,1),r.length||e._skinInstanceCache.delete(n),t&&(t.destroy(),a.skinInstance=null))}}}}}};v(km,`_skinInstanceCache`,new Map);var Am=class{constructor(e,t,n,r,i){v(this,`_evtLoadById`,null),v(this,`_evtUnloadById`,null),v(this,`_evtAddById`,null),v(this,`_evtRemoveById`,null),v(this,`_evtLoadByUrl`,null),v(this,`_evtAddByUrl`,null),v(this,`_evtRemoveByUrl`,null),this.propertyName=e,this.parent=t,this._scope=i,this._registry=n,this.id=null,this.url=null,this.asset=null,this._onAssetLoad=r.load,this._onAssetAdd=r.add,this._onAssetRemove=r.remove,this._onAssetUnload=r.unload}set id(e){if(this.url)throw Error(`Can't set id and url`);this._unbind(),this._id=e,this.asset=this._registry.get(this._id),this._bind()}get id(){return this._id}set url(e){if(this.id)throw Error(`Can't set id and url`);this._unbind(),this._url=e,this.asset=this._registry.getByUrl(this._url),this._bind()}get url(){return this._url}_bind(){this.id&&(this._onAssetLoad&&(this._evtLoadById=this._registry.on(`load:${this.id}`,this._onLoad,this)),this._onAssetAdd&&(this._evtAddById=this._registry.once(`add:${this.id}`,this._onAdd,this)),this._onAssetRemove&&(this._evtRemoveById=this._registry.on(`remove:${this.id}`,this._onRemove,this)),this._onAssetUnload&&(this._evtUnloadById=this._registry.on(`unload:${this.id}`,this._onUnload,this))),this.url&&(this._onAssetLoad&&(this._evtLoadByUrl=this._registry.on(`load:url:${this.url}`,this._onLoad,this)),this._onAssetAdd&&(this._evtAddByUrl=this._registry.once(`add:url:${this.url}`,this._onAdd,this)),this._onAssetRemove&&(this._evtRemoveByUrl=this._registry.on(`remove:url:${this.url}`,this._onRemove,this)))}_unbind(){this.id&&(this._evtLoadById?.off(),this._evtLoadById=null,this._evtAddById?.off(),this._evtAddById=null,this._evtRemoveById?.off(),this._evtRemoveById=null,this._evtUnloadById?.off(),this._evtUnloadById=null),this.url&&(this._evtLoadByUrl?.off(),this._evtLoadByUrl=null,this._evtAddByUrl?.off(),this._evtAddByUrl=null,this._evtRemoveByUrl?.off(),this._evtRemoveByUrl=null)}_onLoad(e){this._onAssetLoad.call(this._scope,this.propertyName,this.parent,e)}_onAdd(e){this.asset=e,this._onAssetAdd.call(this._scope,this.propertyName,this.parent,e)}_onRemove(e){this._onAssetRemove.call(this._scope,this.propertyName,this.parent,e),this.asset=null}_onUnload(e){this._onAssetUnload.call(this._scope,this.propertyName,this.parent,e)}},jm=class extends wm{constructor(e,t){super(e,t),v(this,`_type`,`asset`),v(this,`_castShadows`,!0),v(this,`_shadowCascadeMask`,255),v(this,`_receiveShadows`,!0),v(this,`_castShadowsLightmap`,!0),v(this,`_lightmapped`,!1),v(this,`_lightmapSizeMultiplier`,1),v(this,`isStatic`,!1),v(this,`_batchGroupId`,-1),v(this,`_layers`,[0]),v(this,`_renderStyle`,0),v(this,`_meshInstances`,[]),v(this,`_customAabb`,null),v(this,`_area`,null),v(this,`_assetReference`,void 0),v(this,`_materialReferences`,[]),v(this,`_material`,void 0),v(this,`_rootBone`,null),v(this,`_evtLayersChanged`,null),v(this,`_evtLayerAdded`,null),v(this,`_evtLayerRemoved`,null),v(this,`_evtSetMeshes`,null),this._assetReference=new Am(`asset`,this,e.app.assets,{add:this._onRenderAssetAdded,load:this._onRenderAssetLoad,remove:this._onRenderAssetRemove,unload:this._onRenderAssetUnload},this),this._material=e.defaultMaterial,t.on(`remove`,this.onRemoveChild,this),t.on(`removehierarchy`,this.onRemoveChild,this),t.on(`insert`,this.onInsertChild,this),t.on(`inserthierarchy`,this.onInsertChild,this)}set renderStyle(e){this._renderStyle!==e&&(this._renderStyle=e,Ms._prepareRenderStyleForArray(this._meshInstances,e))}get renderStyle(){return this._renderStyle}set customAabb(e){this._customAabb=e;let t=this._meshInstances;if(t)for(let e=0;e<t.length;e++)t[e].setCustomAabb(this._customAabb)}get customAabb(){return this._customAabb}set type(e){if(this._type!==e&&(this._area=null,this._type=e,this.destroyMeshInstances(),e!==`asset`)){let t=this._material;(!t||t===this.system.defaultMaterial)&&(t=this._materialReferences[0]&&this._materialReferences[0].asset&&this._materialReferences[0].asset.resource);let n=Dm(this.system.app.graphicsDevice,e);this._area=n.area,this.meshInstances=[new Ms(n.mesh,t||this.system.defaultMaterial,this.entity)]}}get type(){return this._type}set meshInstances(e){if(this._destroyMeshInstances(),this._meshInstances=e,this._meshInstances){let e=this._meshInstances;for(let t=0;t<e.length;t++)e[t].node||(e[t].node=this.entity),e[t].castShadow=this._castShadows,e[t].shadowCascadeMask=this._shadowCascadeMask,e[t].receiveShadow=this._receiveShadows,e[t].renderStyle=this._renderStyle,e[t].setLightmapped(this._lightmapped),e[t].setCustomAabb(this._customAabb);this.enabled&&this.entity.enabled&&this.addToLayers()}this._onMeshInstancesChanged()}get meshInstances(){return this._meshInstances}set lightmapped(e){if(e!==this._lightmapped){this._lightmapped=e;let t=this._meshInstances;if(t)for(let n=0;n<t.length;n++)t[n].setLightmapped(e)}}get lightmapped(){return this._lightmapped}set castShadows(e){if(this._castShadows!==e){let t=this._meshInstances;if(t){let n=this.layers,r=this.system.app.scene;if(this._castShadows&&!e)for(let e=0;e<n.length;e++){let n=r.layers.getLayerById(this.layers[e]);n&&n.removeShadowCasters(t)}for(let n=0;n<t.length;n++)t[n].castShadow=e;if(!this._castShadows&&e)for(let e=0;e<n.length;e++){let i=r.layers.getLayerById(n[e]);i&&i.addShadowCasters(t)}}this._castShadows=e}}get castShadows(){return this._castShadows}set shadowCascadeMask(e){if(this._shadowCascadeMask!==e){this._shadowCascadeMask=e;let t=this._meshInstances;if(t)for(let n=0;n<t.length;n++)t[n].shadowCascadeMask=e}}get shadowCascadeMask(){return this._shadowCascadeMask}set receiveShadows(e){if(this._receiveShadows!==e){this._receiveShadows=e;let t=this._meshInstances;if(t)for(let n=0;n<t.length;n++)t[n].receiveShadow=e}}get receiveShadows(){return this._receiveShadows}set castShadowsLightmap(e){this._castShadowsLightmap=e}get castShadowsLightmap(){return this._castShadowsLightmap}set lightmapSizeMultiplier(e){this._lightmapSizeMultiplier=e}get lightmapSizeMultiplier(){return this._lightmapSizeMultiplier}set layers(e){let t=this.system.app.scene.layers,n;if(this._meshInstances)for(let e=0;e<this._layers.length;e++)n=t.getLayerById(this._layers[e]),n&&n.removeMeshInstances(this._meshInstances);this._layers.length=0;for(let t=0;t<e.length;t++)this._layers[t]=e[t];if(this.enabled&&this.entity.enabled&&this._meshInstances)for(let e=0;e<this._layers.length;e++)n=t.getLayerById(this._layers[e]),n&&n.addMeshInstances(this._meshInstances)}get layers(){return this._layers}set batchGroupId(e){this._batchGroupId!==e&&(this.entity.enabled&&this._batchGroupId>=0&&this.system.app.batcher?.remove(Jo.RENDER,this.batchGroupId,this.entity),this.entity.enabled&&e>=0&&this.system.app.batcher?.insert(Jo.RENDER,e,this.entity),e<0&&this._batchGroupId>=0&&this.enabled&&this.entity.enabled&&this.addToLayers(),this._batchGroupId=e)}get batchGroupId(){return this._batchGroupId}set material(e){if(this._material!==e&&(this._material=e,this._meshInstances&&this._type!==`asset`))for(let t=0;t<this._meshInstances.length;t++)this._meshInstances[t].material=e}get material(){return this._material}set materialAssets(e=[]){if(this._materialReferences.length>e.length){for(let t=e.length;t<this._materialReferences.length;t++)this._materialReferences[t].id=null;this._materialReferences.length=e.length}for(let t=0;t<e.length;t++)if(this._materialReferences[t]||this._materialReferences.push(new Am(t,this,this.system.app.assets,{add:this._onMaterialAdded,load:this._onMaterialLoad,remove:this._onMaterialRemove,unload:this._onMaterialUnload},this)),e[t]){let n=e[t]instanceof zp?e[t].id:e[t];this._materialReferences[t].id!==n&&(this._materialReferences[t].id=n),this._materialReferences[t].asset&&this._onMaterialAdded(t,this,this._materialReferences[t].asset)}else this._materialReferences[t].id=null,this._meshInstances[t]&&(this._meshInstances[t].material=this.system.defaultMaterial)}get materialAssets(){return this._materialReferences.map(e=>e.id)}set asset(e){let t=e instanceof zp?e.id:e;this._assetReference.id!==t&&(this._assetReference.asset&&this._assetReference.asset.resource&&this._onRenderAssetRemove(),this._assetReference.id=t,this._assetReference.asset&&this._onRenderAssetAdded())}get asset(){return this._assetReference.id}assignAsset(e){let t=e instanceof zp?e.id:e;this._assetReference.id=t}set rootBone(e){if(this._rootBone!==e){let t=typeof e==`string`;if(this._rootBone&&t&&this._rootBone.guid===e)return;this._rootBone&&this._clearSkinInstances(),e instanceof ys?this._rootBone=e:t?(this._rootBone=this.system.app.getEntityFromIndex(e)||null,this._rootBone):this._rootBone=null,this._rootBone&&this._cloneSkinInstances()}}get rootBone(){return this._rootBone}destroyMeshInstances(){this._destroyMeshInstances(),this._onMeshInstancesChanged()}_destroyMeshInstances(){let e=this._meshInstances;if(e){this.removeFromLayers(),this._clearSkinInstances();for(let t=0;t<e.length;t++)e[t].destroy();this._meshInstances.length=0}}_onMeshInstancesChanged(){this.entity._destroying||this.system.app.systems?.fire(`meshInstancesChange`,this)}addToLayers(){let e=this.system.app.scene.layers;for(let t=0;t<this._layers.length;t++){let n=e.getLayerById(this._layers[t]);n&&n.addMeshInstances(this._meshInstances)}}removeFromLayers(){if(this._meshInstances&&this._meshInstances.length){let e=this.system.app.scene.layers;for(let t=0;t<this._layers.length;t++){let n=e.getLayerById(this._layers[t]);n&&n.removeMeshInstances(this._meshInstances)}}}onRemoveChild(){this.removeFromLayers()}onInsertChild(){this._meshInstances&&this.enabled&&this.entity.enabled&&this.addToLayers()}onBeforeRemove(){this.enabled&&this.entity.enabled&&this.onDisable(),this.destroyMeshInstances(),this.asset=null,this.materialAsset=null,this._assetReference.id=null;for(let e=0;e<this._materialReferences.length;e++)this._materialReferences[e].id=null;this.entity.off(`remove`,this.onRemoveChild,this),this.entity.off(`removehierarchy`,this.onRemoveChild,this),this.entity.off(`insert`,this.onInsertChild,this),this.entity.off(`inserthierarchy`,this.onInsertChild,this)}onLayersChanged(e,t){this.addToLayers(),this._evtLayerAdded?.off(),this._evtLayerAdded=t.on(`add`,this.onLayerAdded,this),this._evtLayerRemoved?.off(),this._evtLayerRemoved=t.on(`remove`,this.onLayerRemoved,this)}onLayerAdded(e){this.layers.indexOf(e.id)<0||e.addMeshInstances(this._meshInstances)}onLayerRemoved(e){this.layers.indexOf(e.id)<0||e.removeMeshInstances(this._meshInstances)}onEnable(){let e=this.system.app,t=e.scene,n=t.layers;this._rootBone&&this._cloneSkinInstances(),this._evtLayersChanged=t.on(`set:layers`,this.onLayersChanged,this),n&&(this._evtLayerAdded=n.on(`add`,this.onLayerAdded,this),this._evtLayerRemoved=n.on(`remove`,this.onLayerRemoved,this));let r=this._type===`asset`;this._meshInstances&&this._meshInstances.length?this.addToLayers():r&&this.asset&&this._onRenderAssetAdded();for(let e=0;e<this._materialReferences.length;e++)this._materialReferences[e].asset&&this.system.app.assets.load(this._materialReferences[e].asset);this._batchGroupId>=0&&e.batcher?.insert(Jo.RENDER,this.batchGroupId,this.entity)}onDisable(){let e=this.system.app,t=e.scene.layers;this._evtLayersChanged?.off(),this._evtLayersChanged=null,this._rootBone&&this._clearSkinInstances(),t&&(this._evtLayerAdded?.off(),this._evtLayerAdded=null,this._evtLayerRemoved?.off(),this._evtLayerRemoved=null),this._batchGroupId>=0&&e.batcher?.remove(Jo.RENDER,this.batchGroupId,this.entity),this.removeFromLayers()}hide(){if(this._meshInstances)for(let e=0;e<this._meshInstances.length;e++)this._meshInstances[e].visible=!1}show(){if(this._meshInstances)for(let e=0;e<this._meshInstances.length;e++)this._meshInstances[e].visible=!0}_onRenderAssetAdded(){this._assetReference.asset&&(this._assetReference.asset.resource?this._onRenderAssetLoad():this.enabled&&this.entity.enabled&&this.system.app.assets.load(this._assetReference.asset))}_onRenderAssetLoad(){if(this.destroyMeshInstances(),this._assetReference.asset){let e=this._assetReference.asset.resource;this._evtSetMeshes?.off(),this._evtSetMeshes=e.on(`set:meshes`,this._onSetMeshes,this),e.meshes&&this._onSetMeshes(e.meshes)}}_onSetMeshes(e){this._cloneMeshes(e)}_clearSkinInstances(){for(let e=0;e<this._meshInstances.length;e++){let t=this._meshInstances[e];km.removeCachedSkinInstance(t.skinInstance),t.skinInstance=null}}_cloneSkinInstances(){if(this._meshInstances.length&&this._rootBone instanceof ys)for(let e=0;e<this._meshInstances.length;e++){let t=this._meshInstances[e],n=t.mesh;n.skin&&!t.skinInstance&&(t.skinInstance=km.createCachedSkinInstance(n.skin,this._rootBone,this.entity))}}_cloneMeshes(e){if(e&&e.length){let t=[];for(let n=0;n<e.length;n++){let r=e[n],i=new Ms(r,this._materialReferences[n]&&this._materialReferences[n].asset&&this._materialReferences[n].asset.resource||this.system.defaultMaterial,this.entity);t.push(i),r.morph&&(i.morphInstance=new _u(r.morph))}this.meshInstances=t,this._cloneSkinInstances()}}_onRenderAssetUnload(){this._type===`asset`&&this.destroyMeshInstances()}_onRenderAssetRemove(){this._evtSetMeshes?.off(),this._evtSetMeshes=null,this._onRenderAssetUnload()}_onMaterialAdded(e,t,n){n.resource?this._onMaterialLoad(e,t,n):this.enabled&&this.entity.enabled&&this.system.app.assets.load(n)}_updateMainMaterial(e,t){e===0&&(this.material=t)}_onMaterialLoad(e,t,n){this._meshInstances[e]&&(this._meshInstances[e].material=n.resource),this._updateMainMaterial(e,n.resource)}_onMaterialRemove(e,t,n){this._meshInstances[e]&&(this._meshInstances[e].material=this.system.defaultMaterial),this._updateMainMaterial(e,this.system.defaultMaterial)}_onMaterialUnload(e,t,n){this._meshInstances[e]&&(this._meshInstances[e].material=this.system.defaultMaterial),this._updateMainMaterial(e,this.system.defaultMaterial)}resolveDuplicatedEntityReferenceProperties(e,t){e.rootBone&&(this.rootBone=t[e.rootBone.guid])}},Mm=[`material`,`meshInstances`,`asset`,`materialAssets`,`castShadows`,`shadowCascadeMask`,`receiveShadows`,`castShadowsLightmap`,`lightmapped`,`lightmapSizeMultiplier`,`renderStyle`,`type`,`layers`,`isStatic`,`batchGroupId`,`rootBone`],Nm=class extends Sm{constructor(e){super(e),this.id=`render`,this.ComponentType=jm,this.extraDataProperties=[`aabbCenter`,`aabbHalfExtents`],this.defaultMaterial=xs(e.graphicsDevice),this.on(`beforeremove`,this.onBeforeRemove,this)}initializeComponentData(e,t,n){(t.batchGroupId===null||t.batchGroupId===void 0)&&(t.batchGroupId=-1),t.layers&&t.layers.length&&(t.layers=t.layers.slice(0));for(let n=0;n<Mm.length;n++)t.hasOwnProperty(Mm[n])&&(e[Mm[n]]=t[Mm[n]]);t.aabbCenter&&t.aabbHalfExtents&&(e.customAabb=new be(new k(t.aabbCenter),new k(t.aabbHalfExtents))),super.initializeComponentData(e,t)}cloneComponent(e,t){let n={};for(let t=0;t<Mm.length;t++)n[Mm[t]]=e.render[Mm[t]];n.enabled=e.render.enabled,delete n.meshInstances;let r=this.addComponent(t,n),i=e.render.meshInstances,a=i.map(e=>e.mesh);r._onSetMeshes(a);for(let e=0;e<i.length;e++)r.meshInstances[e].material=i[e].material;return e.render.customAabb&&(r.customAabb=e.render.customAabb.clone()),r}onBeforeRemove(e,t){t.onBeforeRemove()}},Pm=class{constructor(e,t){this.effect=e,this.inputTarget=t,this.outputTarget=null,this.name=e.constructor.name}},Fm=class{constructor(e,t){this.app=e,this.camera=t,this.destinationRenderTarget=null,this.effects=[],this.enabled=!1,this.depthTarget=null,t.on(`set:rect`,this.onCameraRectChanged,this)}_allocateColorBuffer(e,t){let n=this.camera.rect,r=this.destinationRenderTarget,i=this.app.graphicsDevice,a=Math.floor(n.z*(r?.width??i.width)),o=Math.floor(n.w*(r?.height??i.height));return dn.createDataTexture2D(i,t,a,o,e)}_createOffscreenTarget(e,t){let n=this.app.graphicsDevice,r=(this.destinationRenderTarget??n.backBuffer).isColorBufferSrgb(0),i=(t&&n.getRenderableHdrFormat([12,14],!0))??(r?20:7),a=`${this.camera.entity.name}-posteffect-${this.effects.length}`;return new gr({colorBuffer:this._allocateColorBuffer(i,a),depth:e,stencil:e&&this.app.graphicsDevice.supportsStencil,samples:e?n.samples:1})}_resizeOffscreenTarget(e){let t=e.colorBuffer.format,n=e.colorBuffer.name;e.destroyFrameBuffers(),e.destroyTextureBuffers(),e._colorBuffer=this._allocateColorBuffer(t,n),e._colorBuffers=[e._colorBuffer],e.evaluateDimensions()}_destroyOffscreenTarget(e){e.destroyTextureBuffers(),e.destroy()}addEffect(e){let t=this.effects,n=t.length===0,r=new Pm(e,this._createOffscreenTarget(n,e.hdr));t.push(r),this._sourceTarget=r.inputTarget,t.length>1&&(t[t.length-2].outputTarget=r.inputTarget),this._newPostEffect=e,e.needsDepthBuffer&&this._requestDepthMap(),this.enable(),this._newPostEffect=void 0}removeEffect(e){let t=-1;for(let n=0,r=this.effects.length;n<r;n++)if(this.effects[n].effect===e){t=n;break}t>=0&&(t>0?this.effects[t-1].outputTarget=t+1<this.effects.length?this.effects[t+1].inputTarget:null:this.effects.length>1&&(this.effects[1].inputTarget._depth||(this._destroyOffscreenTarget(this.effects[1].inputTarget),this.effects[1].inputTarget=this._createOffscreenTarget(!0,this.effects[1].hdr),this._sourceTarget=this.effects[1].inputTarget),this.camera.renderTarget=this.effects[1].inputTarget),this._destroyOffscreenTarget(this.effects[t].inputTarget),this.effects.splice(t,1)),this.enabled&&e.needsDepthBuffer&&this._releaseDepthMap(),this.effects.length===0&&this.disable()}_requestDepthMaps(){for(let e=0,t=this.effects.length;e<t;e++){let t=this.effects[e].effect;this._newPostEffect!==t&&t.needsDepthBuffer&&this._requestDepthMap()}}_releaseDepthMaps(){for(let e=0,t=this.effects.length;e<t;e++)this.effects[e].effect.needsDepthBuffer&&this._releaseDepthMap()}_requestDepthMap(){let e=this.app.scene.layers.getLayerById(1);e&&(e.incrementCounter(),this.camera.requestSceneDepthMap(!0))}_releaseDepthMap(){let e=this.app.scene.layers.getLayerById(1);e&&(e.decrementCounter(),this.camera.requestSceneDepthMap(!1))}destroy(){for(let e=0,t=this.effects.length;e<t;e++)this.effects[e].inputTarget.destroy();this.effects.length=0,this.disable()}enable(){!this.enabled&&this.effects.length&&(this.enabled=!0,this._requestDepthMaps(),this.app.graphicsDevice.on(`resizecanvas`,this._onCanvasResized,this),this.destinationRenderTarget=this.camera.renderTarget,this.camera.renderTarget=this.effects[0].inputTarget,this.camera.onPostprocessing=()=>{if(this.enabled){let e=null,t=this.effects.length;if(t)for(let n=0;n<t;n++){let r=this.effects[n],i=r.outputTarget;n===t-1&&(e=this.camera.rect,this.destinationRenderTarget&&(i=this.destinationRenderTarget)),r.effect.render(r.inputTarget,i,e)}}})}disable(){this.enabled&&(this.enabled=!1,this.app.graphicsDevice.off(`resizecanvas`,this._onCanvasResized,this),this._releaseDepthMaps(),this._destroyOffscreenTarget(this._sourceTarget),this.camera.renderTarget=this.destinationRenderTarget,this.camera.onPostprocessing=null)}_onCanvasResized(e,t){let n=this.camera.rect,r=this.destinationRenderTarget;e=r?.width??e,t=r?.height??t,this.camera.camera.aspectRatio=e*n.z/(t*n.w),this.resizeRenderTargets()}resizeRenderTargets(){let e=this.app.graphicsDevice,t=this.destinationRenderTarget,n=t?.width??e.width,r=t?.height??e.height,i=this.camera.rect,a=Math.floor(i.z*n),o=Math.floor(i.w*r),s=this.effects;for(let e=0,t=s.length;e<t;e++){let t=s[e];(t.inputTarget.width!==a||t.inputTarget.height!==o)&&this._resizeOffscreenTarget(t.inputTarget)}}onCameraRectChanged(e,t,n){this.enabled&&this.resizeRenderTargets()}},Im=class extends wm{constructor(e,t){super(e,t),v(this,`onPostprocessing`,null),v(this,`_renderSceneDepthMap`,0),v(this,`_renderSceneColorMap`,0),v(this,`_sceneDepthMapRequested`,!1),v(this,`_sceneColorMapRequested`,!1),v(this,`_priority`,0),v(this,`_disablePostEffectsLayer`,4),v(this,`_camera`,void 0),v(this,`_evtLayersChanged`,null),v(this,`_evtLayerAdded`,null),v(this,`_evtLayerRemoved`,null),this._camera=new Js(e.app.graphicsDevice),this._camera.node=t,this._postEffects=new Fm(e.app,this)}setShaderPass(e){let t=No.get(this.system.app.graphicsDevice),n=e?t.allocate(e,{isForward:!0}):null;return this._camera.shaderPassInfo=n,n.index}getShaderPass(){return this._camera.shaderPassInfo?.name}set framePasses(e){this._camera.framePasses=e||[],this.dirtyLayerCompositionCameras(),this.system.app.scene.updateShaders=!0}get framePasses(){return this._camera.framePasses}set renderPasses(e){this.framePasses=e}get renderPasses(){return this.framePasses}get shaderParams(){return this._camera.shaderParams}set gammaCorrection(e){this.camera.shaderParams.gammaCorrection=e}get gammaCorrection(){return this.camera.shaderParams.gammaCorrection}set toneMapping(e){this.camera.shaderParams.toneMapping=e}get toneMapping(){return this.camera.shaderParams.toneMapping}set fog(e){this._camera.fogParams=e}get fog(){return this._camera.fogParams}set aperture(e){this._camera.aperture=e}get aperture(){return this._camera.aperture}set aspectRatio(e){this._camera.aspectRatio=e}get aspectRatio(){return this._camera.aspectRatio}set aspectRatioMode(e){this._camera.aspectRatioMode=e}get aspectRatioMode(){return this._camera.aspectRatioMode}set calculateProjection(e){this._camera.calculateProjection=e}get calculateProjection(){return this._camera.calculateProjection}set calculateTransform(e){this._camera.calculateTransform=e}get calculateTransform(){return this._camera.calculateTransform}get camera(){return this._camera}set clearColor(e){this._camera.clearColor=e}get clearColor(){return this._camera.clearColor}set clearColorBuffer(e){this._camera.clearColorBuffer=e,this.dirtyLayerCompositionCameras()}get clearColorBuffer(){return this._camera.clearColorBuffer}set clearDepth(e){this._camera.clearDepth=e}get clearDepth(){return this._camera.clearDepth}set clearDepthBuffer(e){this._camera.clearDepthBuffer=e,this.dirtyLayerCompositionCameras()}get clearDepthBuffer(){return this._camera.clearDepthBuffer}set clearStencilBuffer(e){this._camera.clearStencilBuffer=e,this.dirtyLayerCompositionCameras()}get clearStencilBuffer(){return this._camera.clearStencilBuffer}set cullFaces(e){this._camera.cullFaces=e}get cullFaces(){return this._camera.cullFaces}set disablePostEffectsLayer(e){this._disablePostEffectsLayer=e,this.dirtyLayerCompositionCameras()}get disablePostEffectsLayer(){return this._disablePostEffectsLayer}set farClip(e){this._camera.farClip=e}get farClip(){return this._camera.farClip}set flipFaces(e){this._camera.flipFaces=e}get flipFaces(){return this._camera.flipFaces}set fov(e){this._camera.fov=e}get fov(){return this._camera.fov}get frustum(){return this._camera.frustum}set frustumCulling(e){this._camera.frustumCulling=e}get frustumCulling(){return this._camera.frustumCulling}set horizontalFov(e){this._camera.horizontalFov=e}get horizontalFov(){return this._camera.horizontalFov}set layers(e){let t=this._camera.layers,n=this.system.app.scene;t.forEach(e=>{n.layers.getLayerById(e)?.removeCamera(this)}),this._camera.layers=e,this.enabled&&this.entity.enabled&&e.forEach(e=>{n.layers.getLayerById(e)?.addCamera(this)}),this.fire(`set:layers`)}get layers(){return this._camera.layers}get layersSet(){return this._camera.layersSet}set jitter(e){this._camera.jitter=e}get jitter(){return this._camera.jitter}set nearClip(e){this._camera.nearClip=e}get nearClip(){return this._camera.nearClip}set orthoHeight(e){this._camera.orthoHeight=e}get orthoHeight(){return this._camera.orthoHeight}get postEffects(){return this._postEffects}get postEffectsEnabled(){return this._postEffects.enabled}set priority(e){this._priority=e,this.dirtyLayerCompositionCameras()}get priority(){return this._priority}set projection(e){this._camera.projection=e}get projection(){return this._camera.projection}get projectionMatrix(){return this._camera.projectionMatrix}set projectionOffset(e){this._camera.projectionOffset=e}get projectionOffset(){return this._camera.projectionOffset}set rect(e){this._camera.rect=e,this.fire(`set:rect`,this._camera.rect)}get rect(){return this._camera.rect}set renderSceneColorMap(e){e&&!this._sceneColorMapRequested?(this.requestSceneColorMap(!0),this._sceneColorMapRequested=!0):!e&&this._sceneColorMapRequested&&(this.requestSceneColorMap(!1),this._sceneColorMapRequested=!1)}get renderSceneColorMap(){return this._renderSceneColorMap>0}set renderSceneDepthMap(e){e&&!this._sceneDepthMapRequested?(this.requestSceneDepthMap(!0),this._sceneDepthMapRequested=!0):!e&&this._sceneDepthMapRequested&&(this.requestSceneDepthMap(!1),this._sceneDepthMapRequested=!1)}get renderSceneDepthMap(){return this._renderSceneDepthMap>0}set renderTarget(e){this._camera.renderTarget=e,this.dirtyLayerCompositionCameras()}get renderTarget(){return this._camera.renderTarget}set scissorRect(e){this._camera.scissorRect=e}get scissorRect(){return this._camera.scissorRect}set sensitivity(e){this._camera.sensitivity=e}get sensitivity(){return this._camera.sensitivity}set shutter(e){this._camera.shutter=e}get shutter(){return this._camera.shutter}get viewMatrix(){return this._camera.viewMatrix}_enableDepthLayer(e){if(this.layers.find(e=>e===1)){let t=this.system.app.scene.layers.getLayerById(1);e?t?.incrementCounter():t?.decrementCounter()}else if(e)return!1;return!0}requestSceneColorMap(e){this._renderSceneColorMap+=e?1:-1,this._enableDepthLayer(e),this.camera._enableRenderPassColorGrab(this.system.app.graphicsDevice,this.renderSceneColorMap),this.system.app.scene.layers.markDirty()}requestSceneDepthMap(e){this._renderSceneDepthMap+=e?1:-1,this._enableDepthLayer(e),this.camera._enableRenderPassDepthGrab(this.system.app.graphicsDevice,this.system.app.renderer,this.renderSceneDepthMap),this.system.app.scene.layers.markDirty()}dirtyLayerCompositionCameras(){let e=this.system.app.scene.layers;e._dirty=!0}screenToWorld(e,t,n,r){let{width:i,height:a}=this.system.app.graphicsDevice.clientRect;return this._camera.screenToWorld(e,t,n,i,a,r)}worldToScreen(e,t){let{width:n,height:r}=this.system.app.graphicsDevice.clientRect;return this._camera.worldToScreen(e,n,r,t)}onAppPrerender(){this._camera._viewMatDirty=!0,this._camera._viewProjMatDirty=!0}addCameraToLayers(){let e=this.layers;for(let t=0;t<e.length;t++){let n=this.system.app.scene.layers.getLayerById(e[t]);n&&n.addCamera(this)}}removeCameraFromLayers(){let e=this.layers;for(let t=0;t<e.length;t++){let n=this.system.app.scene.layers.getLayerById(e[t]);n&&n.removeCamera(this)}}onLayersChanged(e,t){this.addCameraToLayers(),this._evtLayerAdded?.off(),this._evtLayerAdded=t.on(`add`,this.onLayerAdded,this),this._evtLayerRemoved?.off(),this._evtLayerRemoved=t.on(`remove`,this.onLayerRemoved,this)}onLayerAdded(e){this.layers.indexOf(e.id)<0||e.addCamera(this)}onLayerRemoved(e){this.layers.indexOf(e.id)<0||e.removeCamera(this)}onEnable(){let e=this.system.app.scene,t=e.layers;this.system.addCamera(this),this._evtLayersChanged?.off(),this._evtLayersChanged=e.on(`set:layers`,this.onLayersChanged,this),t&&(this._evtLayerAdded?.off(),this._evtLayerAdded=t.on(`add`,this.onLayerAdded,this),this._evtLayerRemoved?.off(),this._evtLayerRemoved=t.on(`remove`,this.onLayerRemoved,this)),this.enabled&&this.entity.enabled&&this.addCameraToLayers(),this.postEffects.enable()}onDisable(){let e=this.system.app.scene.layers;this.postEffects.disable(),this.removeCameraFromLayers(),this._evtLayersChanged?.off(),this._evtLayersChanged=null,e&&(this._evtLayerAdded?.off(),this._evtLayerAdded=null,this._evtLayerRemoved?.off(),this._evtLayerRemoved=null),this.system.removeCamera(this)}onBeforeRemove(){this.onDisable(),this.off(),this.camera.destroy()}calculateAspectRatio(e){return this._camera.calculateAspectRatio(e)}startXr(e,t,n){this.system.app.xr.start(this,e,t,n)}endXr(e){let t=this.system.app.xr;if(t?.camera!==this.entity){e&&e(Error(`Camera is not in XR`));return}t.end(e)}copy(e){this.aperture=e.aperture,this.aspectRatio=e.aspectRatio,this.aspectRatioMode=e.aspectRatioMode,this.calculateProjection=e.calculateProjection,this.calculateTransform=e.calculateTransform,this.clearColor=e.clearColor,this.clearColorBuffer=e.clearColorBuffer,this.clearDepthBuffer=e.clearDepthBuffer,this.clearStencilBuffer=e.clearStencilBuffer,this.cullFaces=e.cullFaces,this.disablePostEffectsLayer=e.disablePostEffectsLayer,this.farClip=e.farClip,this.flipFaces=e.flipFaces,this.fov=e.fov,this.frustumCulling=e.frustumCulling,this.horizontalFov=e.horizontalFov,this.layers=e.layers,this.nearClip=e.nearClip,this.orthoHeight=e.orthoHeight,this.priority=e.priority,this.projection=e.projection,this.projectionOffset=e.projectionOffset,this.rect=e.rect,this.renderTarget=e.renderTarget,this.scissorRect=e.scissorRect,this.sensitivity=e.sensitivity,this.shutter=e.shutter}},Lm=`aspectRatio.aspectRatioMode.calculateProjection.calculateTransform.clearColor.clearColorBuffer.clearDepth.clearDepthBuffer.clearStencilBuffer.renderSceneColorMap.renderSceneDepthMap.cullFaces.farClip.flipFaces.fog.fov.frustumCulling.horizontalFov.layers.renderTarget.nearClip.orthoHeight.projection.projectionOffset.priority.rect.scissorRect.aperture.shutter.sensitivity.gammaCorrection.toneMapping`.split(`.`),Rm=class extends Sm{constructor(e){super(e),v(this,`cameras`,[]),this.id=`camera`,this.ComponentType=Im,this.on(`beforeremove`,this.onBeforeRemove,this),this.app.on(`prerender`,this.onAppPrerender,this)}initializeComponentData(e,t){for(let n=0;n<Lm.length;n++){let r=Lm[n];if(t.hasOwnProperty(r)){let n=t[r];switch(r){case`rect`:case`scissorRect`:e[r]=Array.isArray(n)?new j(n[0],n[1],n[2],n[3]):n;break;case`clearColor`:e[r]=Array.isArray(n)?new O(n[0],n[1],n[2],n[3]):n;break;case`projectionOffset`:e[r]=Array.isArray(n)?new A(n[0],n[1]):n;break;default:e[r]=n}}}super.initializeComponentData(e,t)}cloneComponent(e,t){let n=e.camera,r={enabled:n.enabled};for(let e=0;e<Lm.length;e++){let t=Lm[e];r[t]=n[t]}return this.addComponent(t,r)}onBeforeRemove(e,t){this.removeCamera(t),t.onBeforeRemove()}onAppPrerender(){for(let e=0,t=this.cameras.length;e<t;e++)this.cameras[e].onAppPrerender()}addCamera(e){this.cameras.push(e),ru(this.cameras)}removeCamera(e){let t=this.cameras.indexOf(e);t>=0&&(this.cameras.splice(t,1),ru(this.cameras))}destroy(){this.app.off(`prerender`,this.onAppPrerender,this),super.destroy()}},zm=`type.color.intensity.luminance.shape.affectSpecularity.castShadows.shadowDistance.shadowIntensity.shadowResolution.shadowBias.numCascades.cascadeBlend.bakeNumSamples.bakeArea.cascadeDistribution.normalOffsetBias.range.innerConeAngle.outerConeAngle.falloffMode.shadowType.vsmBlurSize.vsmBlurMode.vsmBias.cookieAsset.cookie.cookieIntensity.cookieFalloff.cookieChannel.cookieAngle.cookieScale.cookieOffset.shadowUpdateMode.mask.affectDynamic.affectLightmapped.bake.bakeDir.isStatic.layers.penumbraSize.penumbraFalloff.shadowSamples.shadowBlockerSamples.volumetricScattering`.split(`.`),Bm=class extends wm{constructor(e,t){super(e,t),v(this,`_light`,void 0),v(this,`_evtLayersChanged`,null),v(this,`_evtLayerAdded`,null),v(this,`_evtLayerRemoved`,null),v(this,`_cookieAsset`,null),v(this,`_cookieAssetId`,null),v(this,`_cookieAssetAdd`,!1),v(this,`_cookieMatrix`,null),v(this,`_shadowBias`,.05),v(this,`_cookieAngle`,0),v(this,`_cookieScale`,null),v(this,`_castShadows`,!1),v(this,`_affectSpecularity`,!0),v(this,`_affectDynamic`,!0),v(this,`_affectLightmapped`,!1),v(this,`_bake`,!1),v(this,`_layers`,[0]),v(this,`_type`,`directional`),this._light=new hu(e.app.graphicsDevice,e.app.scene.clusteredLightingEnabled),this._light._node=t,this._light.setColor(1,1,1)}get light(){return this._light}set type(e){this._type!==e&&(this.removeLightFromLayers(),this._type=e,this._light.type=uu[e],this.refreshProperties())}get type(){return this._type}set color(e){this._light.setColor(e)}get color(){return this._light.getColor()}set intensity(e){this._light.intensity=e}get intensity(){return this._light.intensity}set luminance(e){this._light.luminance=e}get luminance(){return this._light.luminance}set shape(e){this._light.shape=e}get shape(){return this._light.shape}set affectSpecularity(e){this._affectSpecularity=e,this._light.affectSpecularity=e}get affectSpecularity(){return this._affectSpecularity}set castShadows(e){this._castShadows=e,this._light.castShadows=e}get castShadows(){return this._castShadows}set shadowDistance(e){this._light.shadowDistance=e}get shadowDistance(){return this._light.shadowDistance}set shadowIntensity(e){this._light.shadowIntensity=e}get shadowIntensity(){return this._light.shadowIntensity}set volumetricScattering(e){this._light.volumetricScattering=e}get volumetricScattering(){return this._light.volumetricScattering}set shadowResolution(e){this._light.shadowResolution=e}get shadowResolution(){return this._light.shadowResolution}set shadowBias(e){this._shadowBias=e,this._light.shadowBias=-.01*E.clamp(e,0,1)}get shadowBias(){return this._shadowBias}set numCascades(e){this._light.numCascades=E.clamp(Math.floor(e),1,4)}get numCascades(){return this._light.numCascades}set cascadeBlend(e){this._light.cascadeBlend=E.clamp(e,0,1)}get cascadeBlend(){return this._light.cascadeBlend}set bakeNumSamples(e){this._light.bakeNumSamples=E.clamp(Math.floor(e),1,255)}get bakeNumSamples(){return this._light.bakeNumSamples}set bakeArea(e){this._light.bakeArea=E.clamp(e,0,180)}get bakeArea(){return this._light.bakeArea}set cascadeDistribution(e){this._light.cascadeDistribution=E.clamp(e,0,1)}get cascadeDistribution(){return this._light.cascadeDistribution}set normalOffsetBias(e){this._light.normalOffsetBias=E.clamp(e,0,1)}get normalOffsetBias(){return this._light.normalOffsetBias}set range(e){this._light.attenuationEnd=e}get range(){return this._light.attenuationEnd}set innerConeAngle(e){this._light.innerConeAngle=e}get innerConeAngle(){return this._light.innerConeAngle}set outerConeAngle(e){this._light.outerConeAngle=e}get outerConeAngle(){return this._light.outerConeAngle}set falloffMode(e){this._light.falloffMode=e}get falloffMode(){return this._light.falloffMode}set shadowType(e){this._light.shadowType=e}get shadowType(){return this._light.shadowType}set vsmBlurSize(e){this._light.vsmBlurSize=e}get vsmBlurSize(){return this._light.vsmBlurSize}set vsmBlurMode(e){this._light.vsmBlurMode=e}get vsmBlurMode(){return this._light.vsmBlurMode}set vsmBias(e){this._light.vsmBias=E.clamp(e,0,1)}get vsmBias(){return this._light.vsmBias}set cookieAsset(e){if(!(this._cookieAssetId&&(e instanceof zp&&e.id===this._cookieAssetId||e===this._cookieAssetId))){if(this.onCookieAssetRemove(),this._cookieAssetId=null,e instanceof zp)this._cookieAssetId=e.id,this.onCookieAssetAdd(e);else if(typeof e==`number`){this._cookieAssetId=e;let t=this.system.app.assets.get(e);t?this.onCookieAssetAdd(t):(this._cookieAssetAdd=!0,this.system.app.assets.on(`add:${this._cookieAssetId}`,this.onCookieAssetAdd,this))}}}get cookieAsset(){return this._cookieAssetId}set cookie(e){this._light.cookie=e}get cookie(){return this._light.cookie}set cookieIntensity(e){this._light.cookieIntensity=E.clamp(e,0,1)}get cookieIntensity(){return this._light.cookieIntensity}set cookieFalloff(e){this._light.cookieFalloff=e}get cookieFalloff(){return this._light.cookieFalloff}set cookieChannel(e){this._light.cookieChannel=e}get cookieChannel(){return this._light.cookieChannel}set cookieAngle(e){if(this._cookieAngle!==e){if(this._cookieAngle=e,e!==0||this._cookieScale!==null){this._cookieMatrix||(this._cookieMatrix=new j);let t=1,n=1;this._cookieScale&&(t=this._cookieScale.x,n=this._cookieScale.y);let r=Math.cos(e*E.DEG_TO_RAD),i=Math.sin(e*E.DEG_TO_RAD);this._cookieMatrix.set(r/t,-i/t,i/n,r/n),this._light.cookieTransform=this._cookieMatrix}else this._light.cookieTransform=null}}get cookieAngle(){return this._cookieAngle}set cookieScale(e){if(this._cookieScale=e,e!==null||this._cookieAngle!==0){this._cookieMatrix||(this._cookieMatrix=new j);let t=e?e.x:1,n=e?e.y:1,r=Math.cos(this._cookieAngle*E.DEG_TO_RAD),i=Math.sin(this._cookieAngle*E.DEG_TO_RAD);this._cookieMatrix.set(r/t,-i/t,i/n,r/n),this._light.cookieTransform=this._cookieMatrix}else this._light.cookieTransform=null}get cookieScale(){return this._cookieScale}set cookieOffset(e){this._light.cookieOffset=e}get cookieOffset(){return this._light.cookieOffset}set shadowUpdateMode(e){this._light.shadowUpdateMode=e}get shadowUpdateMode(){return this._light.shadowUpdateMode}set mask(e){this._light.mask=e}get mask(){return this._light.mask}set affectDynamic(e){this._affectDynamic!==e&&(this._affectDynamic=e,e?this._light.mask|=1:this._light.mask&=-2,this._light.layersDirty())}get affectDynamic(){return this._affectDynamic}set affectLightmapped(e){this._affectLightmapped!==e&&(this._affectLightmapped=e,e?(this._light.mask|=2,this._bake&&(this._light.mask&=-5)):(this._light.mask&=-3,this._bake&&(this._light.mask|=4)))}get affectLightmapped(){return this._affectLightmapped}set bake(e){this._bake!==e&&(this._bake=e,e?(this._light.mask|=4,this._affectLightmapped&&(this._light.mask&=-3)):(this._light.mask&=-5,this._affectLightmapped&&(this._light.mask|=2)),this._light.layersDirty())}get bake(){return this._bake}set bakeDir(e){this._light.bakeDir=e}get bakeDir(){return this._light.bakeDir}set isStatic(e){this._light.isStatic=e}get isStatic(){return this._light.isStatic}set layers(e){let t=this._layers;for(let e=0;e<t.length;e++){let n=this.system.app.scene.layers.getLayerById(t[e]);n&&(n.removeLight(this),this._light.removeLayer(n))}this._layers=e;for(let t=0;t<e.length;t++){let n=this.system.app.scene.layers.getLayerById(e[t]);n&&this.enabled&&this.entity.enabled&&(n.addLight(this),this._light.addLayer(n))}}get layers(){return this._layers}set shadowUpdateOverrides(e){this._light.shadowUpdateOverrides=e}get shadowUpdateOverrides(){return this._light.shadowUpdateOverrides}set shadowSamples(e){this._light.shadowSamples=e}get shadowSamples(){return this._light.shadowSamples}set shadowBlockerSamples(e){this._light.shadowBlockerSamples=e}get shadowBlockerSamples(){return this._light.shadowBlockerSamples}set penumbraSize(e){this._light.penumbraSize=e}get penumbraSize(){return this._light.penumbraSize}set penumbraFalloff(e){this._light.penumbraFalloff=e}get penumbraFalloff(){return this._light.penumbraFalloff}addLightToLayers(){for(let e=0;e<this._layers.length;e++){let t=this.system.app.scene.layers.getLayerById(this._layers[e]);t&&(t.addLight(this),this._light.addLayer(t))}}removeLightFromLayers(){for(let e=0;e<this._layers.length;e++){let t=this.system.app.scene.layers.getLayerById(this._layers[e]);t&&(t.removeLight(this),this._light.removeLayer(t))}}onLayersChanged(e,t){this.enabled&&this.entity.enabled&&this.addLightToLayers(),this._evtLayerAdded?.off(),this._evtLayerAdded=t.on(`add`,this.onLayerAdded,this),this._evtLayerRemoved?.off(),this._evtLayerRemoved=t.on(`remove`,this.onLayerRemoved,this)}onLayerAdded(e){this._layers.indexOf(e.id)>=0&&this.enabled&&this.entity.enabled&&(e.addLight(this),this._light.addLayer(e))}onLayerRemoved(e){this._layers.indexOf(e.id)>=0&&(e.removeLight(this),this._light.removeLayer(e))}refreshProperties(){for(let e=0;e<zm.length;e++){let t=zm[e];this[t]=this[t]}this.enabled&&this.entity.enabled&&this.onEnable()}onCookieAssetSet(){let e=!1;this._cookieAsset.type===`cubemap`&&!this._cookieAsset.loadFaces&&(this._cookieAsset.loadFaces=!0,e=!0),(!this._cookieAsset.resource||e)&&this.system.app.assets.load(this._cookieAsset),this._cookieAsset.resource&&this.onCookieAssetLoad()}onCookieAssetAdd(e){this._cookieAssetId===e.id&&(this._cookieAsset=e,this._light.enabled&&this.onCookieAssetSet(),this._cookieAsset.on(`load`,this.onCookieAssetLoad,this),this._cookieAsset.on(`remove`,this.onCookieAssetRemove,this))}onCookieAssetLoad(){this._cookieAsset&&this._cookieAsset.resource&&(this.cookie=this._cookieAsset.resource)}onCookieAssetRemove(){this._cookieAssetId&&(this._cookieAssetAdd&&(this.system.app.assets.off(`add:${this._cookieAssetId}`,this.onCookieAssetAdd,this),this._cookieAssetAdd=!1),this._cookieAsset&&(this._cookieAsset.off(`load`,this.onCookieAssetLoad,this),this._cookieAsset.off(`remove`,this.onCookieAssetRemove,this),this._cookieAsset=null),this.cookie=null)}onEnable(){let e=this.system.app.scene,t=e.layers;this._light.enabled=!0,this._evtLayersChanged?.off(),this._evtLayersChanged=e.on(`set:layers`,this.onLayersChanged,this),t&&(this._evtLayerAdded?.off(),this._evtLayerAdded=t.on(`add`,this.onLayerAdded,this),this._evtLayerRemoved?.off(),this._evtLayerRemoved=t.on(`remove`,this.onLayerRemoved,this)),this.enabled&&this.entity.enabled&&this.addLightToLayers(),this._cookieAsset&&!this.cookie&&this.onCookieAssetSet()}onDisable(){let e=this.system.app.scene.layers;this._light.enabled=!1,this._evtLayersChanged?.off(),this._evtLayersChanged=null,e&&(this._evtLayerAdded?.off(),this._evtLayerAdded=null,this._evtLayerRemoved?.off(),this._evtLayerRemoved=null),this.removeLightFromLayers()}onBeforeRemove(){this.onDisable(),this._light.destroy(),this.cookieAsset=null}},Vm=class extends Sm{constructor(e){super(e),this.id=`light`,this.ComponentType=Bm,this.extraDataProperties=[`enable`],this.on(`beforeremove`,this.onBeforeRemove,this)}initializeComponentData(e,t){let n={...t};n.layers&&Array.isArray(n.layers)&&(n.layers=n.layers.slice(0)),n.color&&Array.isArray(n.color)&&(n.color=new O(n.color[0],n.color[1],n.color[2])),n.cookieOffset&&n.cookieOffset instanceof Array&&(n.cookieOffset=new A(n.cookieOffset[0],n.cookieOffset[1])),n.cookieScale&&n.cookieScale instanceof Array&&(n.cookieScale=new A(n.cookieScale[0],n.cookieScale[1])),n.hasOwnProperty(`enable`)&&(console.warn(`WARNING: enable: Property is deprecated. Set enabled property instead.`),n.enabled=n.enable);for(let t=0;t<zm.length;t++){let r=zm[t];n.hasOwnProperty(r)&&(e[r]=n[r])}super.initializeComponentData(e,n)}onBeforeRemove(e,t){t.onBeforeRemove()}cloneComponent(e,t){let n=e.light,r={enabled:n.enabled};for(let e=0;e<zm.length;e++){let t=zm[e],i=n[t];r[t]=i&&i.clone?i.clone():i}return this.addComponent(t,r)}},Hm=``+new URL(`lilita-one-latin-400-normal-87r-Z-Re.woff2`,import.meta.url).href,Um={progress:`truckstead.progress`,muted:`truckstead.muted`},Wm=(()=>{try{return new URLSearchParams(location.search)}catch{return new URLSearchParams}})(),Gm=class{constructor(e={},t=1500){this.name=`local`,this.hooks=e,this.adDurationMs=t}async init(){console.info(`[portal:local] init`)}loadingFinished(){console.info(`[portal:local] loadingFinished`)}gameplayStart(){console.info(`[portal:local] gameplayStart`)}gameplayStop(){console.info(`[portal:local] gameplayStop`)}happyTime(){console.info(`[portal:local] happyTime`)}async showInterstitial(){await this.fakeAd(`INTERSTITIAL AD (simulated)`)}async showRewarded(){return await this.fakeAd(`REWARDED AD (simulated)`),!0}async save(e,t){try{localStorage.setItem(this.k(e),JSON.stringify(t))}catch{}}async load(e){try{let t=localStorage.getItem(this.k(e));return t===null?void 0:JSON.parse(t)}catch{return}}getLanguage(){return(navigator.language||`en`).slice(0,2).toLowerCase()||`en`}k(e){return`game:${e}`}fakeAd(e){this.hooks.onAdStart?.();let t=document.createElement(`div`);return t.textContent=e,Object.assign(t.style,{position:`fixed`,inset:`0`,display:`flex`,alignItems:`center`,justifyContent:`center`,background:`rgba(0,0,0,0.85)`,color:`#fff`,font:`600 24px system-ui, sans-serif`,zIndex:`9999`}),document.body.appendChild(t),new Promise(e=>{setTimeout(()=>{t.remove(),this.hooks.onAdEnd?.(),e()},this.adDurationMs)})}};function Km(e,t=8e3){return new Promise((n,r)=>{if(document.querySelector(`script[src="${e}"]`))return n();let i=document.createElement(`script`);i.src=e,i.async=!0;let a=setTimeout(()=>r(Error(`script timeout: ${e}`)),t);i.onload=()=>{clearTimeout(a),n()},i.onerror=()=>{clearTimeout(a),r(Error(`script failed: ${e}`))},document.head.appendChild(i)})}var qm=[`/sdk.js`,`https://sdk.games.s3.yandex.net/sdk.js`];function Jm(){let e=new URLSearchParams(location.search).get(`portal`);if(e===`crazygames`||e===`poki`||e===`yandex`||e===`local`)return e;let t=[location.hostname,Ym(document.referrer)].join(` `);return/crazygames\.com|1001juegos\.com|crazygames\.[a-z.]+/.test(t)?`crazygames`:/poki\.com|poki-gdn\.com/.test(t)?`poki`:/yandex\.(ru|net|com)|games\.s3\.yandex/.test(t)?`yandex`:`local`}function Ym(e){try{return e?new URL(e).hostname:``}catch{return``}}async function Xm(e={},t=Jm(),n={}){switch(t){case`crazygames`:{let{CrazyGamesPortal:t}=await wi(async()=>{let{CrazyGamesPortal:e}=await import(`./crazygames-B04q4vcz.js`);return{CrazyGamesPortal:e}},[],import.meta.url);return new t(e)}case`poki`:{let{PokiPortal:t}=await wi(async()=>{let{PokiPortal:e}=await import(`./poki-C3QK1MPC.js`);return{PokiPortal:e}},[],import.meta.url);return new t(e)}case`yandex`:{let{YandexPortal:t}=await wi(async()=>{let{YandexPortal:e}=await import(`./yandex-bPewQ8cn.js`);return{YandexPortal:e}},[],import.meta.url);return new t(e,qm)}default:return new Gm(e)}}function Zm(e){let t=null,n=!1,r=[],i=n=>{if(t)try{n(t)}catch{}else e&&r.length<50&&r.push(n)};return{start(a){e&&!n&&(n=!0,e().then(e=>{if(!e.st.start(a)){r.length=0;return}t=e.st,r.splice(0).forEach(e=>i(e))}).catch(()=>{r.length=0}))},screen:e=>i(t=>t.screen(e)),event:(e,t)=>i(n=>n.event(e,t)),set:e=>i(t=>t.set(e)),error:e=>i(t=>{typeof t.error==`function`&&t.error(e)}),client:()=>t}}var Qm=`0.1.0`,$m=`truckstead`,eh=Zm(()=>wi(()=>import(`./src-BLtBO-gg.js`),[],import.meta.url));function th(e,t){eh.start({game:$m,version:Qm,portal:e,lang:t})}var nh=new class{constructor(){this.muted=!1,this.portalMuted=!1,this.pausedForAd=!1,this.forcedMute=!1,this.listeners=new Set}get silent(){return this.muted||this.portalMuted||this.pausedForAd||this.awayFromScreen}get paused(){return this.pausedForAd||typeof document<`u`&&document.hidden}get adActive(){return this.pausedForAd}get effectivelyMuted(){return this.muted||this.portalMuted}onChange(e){this.listeners.add(e)}notify(){for(let e of this.listeners)e()}async init(){this.portal=await Xm({onAdStart:()=>{this.pausedForAd=!0,this.notify()},onAdEnd:()=>{this.pausedForAd=!1,this.notify()},onMuteChange:e=>{this.portalMuted=e,this.notify()}}),await this.portal.init(),th(this.portal.name,this.portal.getLanguage()),this.muted=await this.portal.load(Um.muted)??!1,Wm.get(`mute`)===`1`&&(this.muted=!0,this.forcedMute=!0),document.addEventListener(`visibilitychange`,()=>this.notify()),window.addEventListener(`blur`,()=>this.notify()),window.addEventListener(`focus`,()=>this.notify()),this.notify()}get awayFromScreen(){if(typeof document>`u`)return!1;if(document.hidden)return!0;let e=location.hostname;return(e===`localhost`||e===`127.0.0.1`||e===`[::1]`)&&!document.hasFocus()}toggleMute(){return this.muted=!this.muted,this.forcedMute||this.portal.save(Um.muted,this.muted),this.notify(),this.muted}},K=null,rh=null,ih=null,ah=null;function oh(){if(!K||!rh)return;let e=nh.silent;rh.gain.setTargetAtTime(e?0:.9,K.currentTime,.03),document.hidden&&K.state===`running`?K.suspend().catch(()=>void 0):!document.hidden&&!e&&K.state===`suspended`&&K.resume().catch(()=>void 0)}function sh(){try{if(!K){let e=window.AudioContext||window.webkitAudioContext;if(!e)return;K=new e,rh=K.createGain(),rh.gain.value=0,rh.connect(K.destination),ih=K.createBuffer(1,K.sampleRate,K.sampleRate);let t=ih.getChannelData(0);for(let e=0;e<t.length;e++)t[e]=Math.random()*2-1;ch(),nh.onChange(oh)}K.state===`suspended`&&!nh.silent&&K.resume().catch(()=>void 0),oh()}catch{}}function ch(){if(!K||!rh)return;let e=K.createOscillator(),t=K.createOscillator();e.type=`sawtooth`,t.type=`square`;let n=K.createBiquadFilter();n.type=`lowpass`,n.Q.value=3;let r=K.createGain();r.gain.value=.7;let i=K.createOscillator();i.type=`sine`;let a=K.createGain();a.gain.value=.3,i.connect(a),a.connect(r.gain);let o=K.createGain();o.gain.value=.55;let s=K.createGain();s.gain.value=0,e.connect(n),t.connect(o),o.connect(n),n.connect(r),r.connect(s),s.connect(rh),e.start(),t.start(),i.start(),ah={a:e,b:t,lfo:i,lfoGain:a,filter:n,gain:s,chug:r}}function lh(e,t,n){if(!K||!ah)return;let r=K.currentTime,i=Math.min(4,Math.floor(e*5)),a=e*5-i,o=Math.min(1,.18+(i===0?a*.8:.35+a*.55)*.8+t*.06),s=38+o*62;ah.a.frequency.setTargetAtTime(s,r,.06),ah.b.frequency.setTargetAtTime(s*.5,r,.06),ah.lfo.frequency.setTargetAtTime(s*.25,r,.06),ah.filter.frequency.setTargetAtTime(260+o*700+t*500,r,.08),ah.gain.gain.setTargetAtTime(n?.05+t*.05+o*.03:0,r,n?.1:.25)}function uh(e,t,n,r,i){let a=K.createGain();return a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(n,t+r),a.gain.exponentialRampToValueAtTime(1e-4,t+r+i),e.connect(a),a.connect(rh),a}function dh(e,t,n,r,i,a){let o=K.createOscillator();o.type=e,o.frequency.setValueAtTime(t,n),a&&o.frequency.exponentialRampToValueAtTime(a,n+i),uh(o,n,r,.005,i),o.start(n),o.stop(n+i+.05)}function fh(e,t,n,r,i,a=1){let o=K.createBufferSource();o.buffer=ih;let s=K.createBiquadFilter();s.type=r,s.frequency.value=i,s.Q.value=a,o.connect(s),uh(s,e,t,.01,n),o.start(e,Math.random()*.5),o.stop(e+n+.05)}var ph=()=>!!K&&!!rh&&K.state===`running`&&!nh.silent,mh={horn(){if(!ph())return;let e=K.currentTime;for(let t of[233,294]){let n=K.createOscillator();n.type=`sawtooth`,n.frequency.value=t;let r=K.createBiquadFilter();r.type=`lowpass`,r.frequency.value=1400,n.connect(r);let i=K.createGain();i.gain.setValueAtTime(1e-4,e),i.gain.exponentialRampToValueAtTime(.09,e+.03),i.gain.setValueAtTime(.09,e+.45),i.gain.exponentialRampToValueAtTime(1e-4,e+.6),r.connect(i),i.connect(rh),n.start(e),n.stop(e+.65)}},airBrake(){ph()&&fh(K.currentTime,.12,.55,`highpass`,2500)},bump(e=1){if(!ph())return;let t=K.currentTime;fh(t,.25*e,.25,`lowpass`,260),dh(`sine`,90,t,.25*e,.22,40)},coin(e=0){if(!ph())return;let t=K.currentTime,n=1050*1.0595**(e%12);dh(`triangle`,n,t,.08,.08),dh(`triangle`,n*1.5,t+.06,.07,.16)},hammer(){if(!ph())return;let e=K.currentTime;for(let t=0;t<3;t++){let n=e+t*.16;fh(n,.18,.07,`bandpass`,2400,3),dh(`sine`,150,n,.2,.09,70)}},click(){ph()&&dh(`square`,660,K.currentTime,.035,.05)},deny(){ph()&&dh(`square`,180,K.currentTime,.05,.18,120)},delivered(){if(!ph())return;let e=K.currentTime;[523,659,784,1047].forEach((t,n)=>dh(`triangle`,t,e+n*.09,.09,.25))},levelUp(){if(!ph())return;let e=K.currentTime;[392,523,659,784,1047,1319].forEach((t,n)=>dh(n%2?`square`:`triangle`,t,e+n*.07,.06,.3))},whoosh(){ph()&&fh(K.currentTime,.08,.35,`bandpass`,900,.7)}},hh={sound:`<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,mute:`<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,pause:`<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>`,horn:`<svg viewBox="0 0 24 24"><path d="M3 10v4h3l7 5V5L6 10z" fill="currentColor"/><path d="M16 12h5M15.5 7.5l4-2M15.5 16.5l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,left:`<svg viewBox="0 0 24 24"><path d="M15 4L7 12l8 8" stroke="currentColor" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,right:`<svg viewBox="0 0 24 24"><path d="M9 4l8 8-8 8" stroke="currentColor" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,arrow:`<svg viewBox="0 0 24 24"><path d="M12 3l7 9h-4v9H9v-9H5z" fill="currentColor"/></svg>`,star:`<svg viewBox="0 0 24 24"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z" fill="currentColor"/></svg>`,lock:`<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2" fill="currentColor"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="2.4" fill="none"/></svg>`,play:`<svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z" fill="currentColor"/></svg>`,hammer:`<svg viewBox="0 0 24 24"><path d="M3 20l9-9 2 2-9 9zM11 6l4-4 7 7-4 4z" fill="currentColor"/></svg>`},gh=class{constructor(e){this.onAct=null,this.el={},this.cache=new Map,this.labelEls=new Map,this.moneyShown=0,e.innerHTML=`
      <canvas id="c"></canvas>
      <div id="hud">
        <div class="top">
          <div class="pill money"><i class="coin">$</i><span data-el="money">0</span></div>
          <div class="pill lvl" data-el="lvl"></div>
          <div class="grow"></div>
          <button class="round" data-act="mute" data-el="mute" aria-label="Sound">${hh.sound}</button>
          <button class="round drive-only" data-act="pause" aria-label="Pause">${hh.pause}</button>
        </div>
        <div class="nav drive-only" data-el="nav">
          <div class="nav-row"><span class="nav-arrow" data-el="navArrow">${hh.arrow}</span><span data-el="dest"></span><b data-el="dist"></b></div>
          <div class="nav-bar"><i data-el="navBar"></i></div>
          <div class="nav-cargo" data-el="cargo"></div>
        </div>
        <div class="warn" data-el="warn"></div>
        <div class="speed drive-only"><b data-el="speed">0</b><small>km/h</small></div>
        <div class="controls drive-only" data-el="controls">
          <div class="steer" data-el="steer"><div class="half">${hh.left}</div><div class="half">${hh.right}</div></div>
          <div class="pedals">
            <div class="col">
              <button class="horn" data-el="horn" aria-label="Horn">${hh.horn}</button>
              <div class="pedal brake" data-el="brake">BRAKE</div>
            </div>
            <div class="pedal gas" data-el="gas">GAS</div>
          </div>
        </div>
        <div class="hint" data-el="hint">
          <div class="hint-steer"><span class="finger"></span>STEER</div>
          <div class="hint-gas"><span class="finger"></span>HOLD</div>
          <div class="hint-keys">← → steer · ↑ gas · ↓ brake</div>
        </div>
        <div class="base-only base-bar">
          <div class="gatebar" data-el="gatebar"></div>
          <button class="btn xl go" data-act="jobs">${hh.play}<span>DRIVE</span></button>
        </div>
        <div class="labels base-only" data-el="labels"></div>
        <div class="toasts" data-el="toasts"></div>
        <div class="big" data-el="big"></div>
        <div class="coins" data-el="coins"></div>
        <div class="panel-wrap" data-el="panelWrap" hidden><div class="panel" data-el="panel"></div></div>
        <div class="fade" data-el="fade"></div>
      </div>`,this.root=e.querySelector(`#hud`),this.canvas=e.querySelector(`#c`),e.querySelectorAll(`[data-el]`).forEach(e=>this.el[e.dataset.el]=e),this.steer=this.el.steer,this.gas=this.el.gas,this.brake=this.el.brake,this.horn=this.el.horn,this.root.addEventListener(`click`,e=>{let t=e.target.closest(`[data-act]`);t&&!t.hasAttribute(`disabled`)&&(e.preventDefault(),this.onAct?.(t.dataset.act,t.dataset.arg??``))}),window.matchMedia(`(pointer: coarse)`).matches&&document.body.classList.add(`touch`),window.addEventListener(`touchstart`,()=>document.body.classList.add(`touch`),{once:!0,passive:!0})}set(e,t){this.cache.get(e)!==t&&(this.cache.set(e,t),this.el[e].innerHTML=t)}mode(e){this.root.dataset.mode=e}setMoney(e,t=!0){t&&(this.moneyShown=e),this.set(`money`,`$`+Math.round(this.moneyShown).toLocaleString(`en-US`))}tickMoney(e,t){if(Math.abs(this.moneyShown-e)<.5){this.moneyShown!==e&&(this.moneyShown=e,this.setMoney(e,!1));return}this.moneyShown+=(e-this.moneyShown)*Math.min(1,t*6)+Math.sign(e-this.moneyShown)*.5,this.setMoney(e,!1)}bumpMoney(){let e=this.el.money.parentElement;e.classList.remove(`bump`),e.offsetWidth,e.classList.add(`bump`)}moneyRect(){return this.el.money.parentElement.getBoundingClientRect()}setLevel(e){this.set(`lvl`,`${hh.star}<span>BASE LV ${e}</span>`)}setGateBar(e,t,n){if(n)this.set(`gatebar`,`<b class="ok">PINE RIDGE OPEN</b> <span>new jobs on the board</span>`);else{let n=Array.from({length:t},(t,n)=>`<i class="${n<e?`on`:``}"></i>`).join(``);this.set(`gatebar`,`${hh.lock}<span>Pine Ridge opens at <b>BASE LV ${t}</b></span><span class="pips">${n}</span>`)}}setMuted(e){this.set(`mute`,e?hh.mute:hh.sound)}nav(e,t,n,r,i){this.set(`dest`,e),this.set(`dist`,t),this.set(`cargo`,r),this.el.navBar.style.transform=`scaleX(${Math.max(0,Math.min(1,n)).toFixed(3)})`,this.el.navArrow.style.transform=`rotate(${i.toFixed(0)}deg)`}warn(e){this.set(`warn`,e),this.el.warn.classList.toggle(`on`,!!e)}speed(e){this.set(`speed`,String(Math.round(e)))}hint(e){this.el.hint.classList.toggle(`on`,e)}toast(e,t=``){let n=document.createElement(`div`);n.className=`toast `+t,n.innerHTML=e,this.el.toasts.appendChild(n),setTimeout(()=>n.classList.add(`out`),2600),setTimeout(()=>n.remove(),3100)}big(e){let t=this.el.big;t.innerHTML=e,t.classList.remove(`show`),t.offsetWidth,t.classList.add(`show`)}panel(e,t=!1){this.el.panel.innerHTML=e,this.el.panelWrap.classList.toggle(`low`,t),this.el.panelWrap.hidden=!1}closePanel(){this.el.panelWrap.hidden=!0}get panelOpen(){return!this.el.panelWrap.hidden}async fade(e){let t=this.el.fade;t.classList.add(`on`),await new Promise(e=>setTimeout(e,260)),e(),await new Promise(e=>setTimeout(e,60)),t.classList.remove(`on`)}flyCoins(e,t,n,r){let i=this.moneyRect(),a=i.left+18,o=i.top+i.height/2;for(let i=0;i<n;i++){let n=document.createElement(`i`);n.className=`fly`,n.textContent=`$`,this.el.coins.appendChild(n);let s=e+(Math.random()-.5)*80,c=t+(Math.random()-.5)*50,l=s+(Math.random()-.5)*160,u=c-80-Math.random()*120,d=i*55,f=650+Math.random()*150,p=performance.now()+d,m=e=>{let t=(e-p)/f;if(t<0){n.style.transform=`translate(${s}px, ${c}px) scale(0)`,requestAnimationFrame(m);return}if(t>=1){n.remove(),r(i);return}let d=t*t*(3-2*t),h=1-d,g=h*h*s+2*h*d*l+d*d*a,_=h*h*c+2*h*d*u+d*d*o,v=t<.2?t*6:1.2-t*.5;n.style.transform=`translate(${g}px, ${_}px) scale(${v.toFixed(2)})`,requestAnimationFrame(m)};requestAnimationFrame(m)}}labels(e){let t=new Set;for(let n of e){t.add(n.id);let e=this.labelEls.get(n.id);e||(e=document.createElement(`button`),e.className=`blabel`,this.el.labels.appendChild(e),this.labelEls.set(n.id,e)),e.hidden=!n.visible,e.dataset.act=n.id.startsWith(`b:`)?`building`:n.id,e.dataset.arg=n.id.slice(2);let r=`blabel `+(n.cls??``);e.className!==r&&(e.className=r),this.cache.get(`lbl:`+n.id)!==n.html&&(this.cache.set(`lbl:`+n.id,n.html),e.innerHTML=n.html),e.style.transform=`translate(${n.x.toFixed(1)}px, ${n.y.toFixed(1)}px) translate(-50%, -100%)`}for(let[e,n]of this.labelEls)t.has(e)||(n.hidden=!0)}},_h=class{constructor(e,t,n,r){this.c={steer:0,gas:0,brake:0},this.keys=new Set,this.steerTouch=new Map,this.gasTouch=new Set,this.brakeTouch=new Set,this.onHorn=null,this.onAnyInput=null,this.enabled=!0,window.addEventListener(`keydown`,e=>{if(e.repeat)return;let t=e.key.toLowerCase();this.keys.add(t),t===`h`&&this.onHorn?.(),[`arrowup`,`arrowdown`,`arrowleft`,`arrowright`,` `].includes(t)&&e.preventDefault(),this.onAnyInput?.()}),window.addEventListener(`keyup`,e=>this.keys.delete(e.key.toLowerCase())),window.addEventListener(`blur`,()=>this.keys.clear());let i=t=>{let n=e.getBoundingClientRect();return(t.clientX-n.left)/n.width<.5?-1:1},a=(e,t)=>e.addEventListener(`pointerdown`,n=>{n.preventDefault();try{e.setPointerCapture(n.pointerId)}catch{}t(n),this.onAnyInput?.()}),o=(e,t)=>{for(let n of[`pointerup`,`pointercancel`,`lostpointercapture`])e.addEventListener(n,e=>t(e.pointerId))};a(e,e=>this.steerTouch.set(e.pointerId,i(e))),e.addEventListener(`pointermove`,e=>{this.steerTouch.has(e.pointerId)&&this.steerTouch.set(e.pointerId,i(e))}),o(e,e=>this.steerTouch.delete(e)),a(t,e=>this.gasTouch.add(e.pointerId)),o(t,e=>this.gasTouch.delete(e)),a(n,e=>this.brakeTouch.add(e.pointerId)),o(n,e=>this.brakeTouch.delete(e)),a(r,()=>this.onHorn?.());for(let i of[e,t,n,r])i.addEventListener(`contextmenu`,e=>e.preventDefault())}read(){if(!this.enabled)return this.c.steer=0,this.c.gas=0,this.c.brake=0,this.c;let e=this.keys,t=0;(e.has(`arrowleft`)||e.has(`a`))&&--t,(e.has(`arrowright`)||e.has(`d`))&&(t+=1);for(let e of this.steerTouch.values())t+=e;return this.c.steer=Math.max(-1,Math.min(1,t)),this.c.gas=e.has(`arrowup`)||e.has(`w`)||this.gasTouch.size>0?1:0,this.c.brake=e.has(`arrowdown`)||e.has(`s`)||e.has(` `)||this.brakeTouch.size>0?1:0,this.c}get touching(){return this.steerTouch.size+this.gasTouch.size+this.brakeTouch.size>0}clear(){this.keys.clear(),this.steerTouch.clear(),this.gasTouch.clear(),this.brakeTouch.clear()}},vh={depot:{id:`depot`,name:`Depot`,x:0,z:40,r:100},farm:{id:`farm`,name:`Green Acre Farm`,x:-600,z:-850,r:70},town:{id:`town`,name:`Maple Town`,x:520,z:-1300,r:115},port:{id:`port`,name:`Bluewater Port`,x:1440,z:-500,r:60,h:2.5},mill:{id:`mill`,name:`Pine Ridge Mill`,x:-720,z:-1640,r:70}},yh={x:0,z:-380,r:34},bh={trunk:[[0,12],[0,-60],[12,-130],[-6,-210],[-12,-300],[0,-380]],farm:[[0,-380],[-120,-440],[-270,-430],[-400,-520],[-470,-650],[-520,-780],[-600,-850]],town:[[0,-380],[90,-470],[140,-600],[160,-760],[240,-900],[330,-1040],[380,-1180],[520,-1300]],port:[[0,-380],[160,-390],[330,-340],[520,-360],[700,-430],[900,-400],[1100,-470],[1300,-440],[1440,-500]],ridge:[[-600,-850],[-640,-960],[-620,-1080],[-560,-1200],[-620,-1330],[-700,-1450],[-720,-1640]]},xh={farm:[`trunk`,`farm`],town:[`trunk`,`town`],port:[`trunk`,`port`],mill:[`trunk`,`farm`,`ridge`]},Sh=[[-1500,-120],[-900,-250],[-450,-170],[-150,-235],[150,-185],[500,-250],[850,-160],[1200,-230],[1450,-170],[1700,-210],[2400,-200]],Ch=[[-330,-560,14,150],[190,-820,30,170],[800,-440,14,150],[-820,-420,45,240],[540,-700,42,210],[1150,-880,55,280],[-250,-1250,62,280],[900,150,32,250],[-500,260,36,250],[250,330,22,200],[1250,100,26,200],[120,-1650,70,300],[900,-1500,50,260]],wh={x0:-1536,x1:2304,z0:-2304,z1:768},Th=class{constructor(e,t,n,r=32){this.grid=new Map,this.x=e,this.z=t,this.group=n,this.cell=r;for(let i=0;i<e.length-1;i++){if(n[i]!==n[i+1])continue;let a=Math.floor(Math.min(e[i],e[i+1])/r),o=Math.floor(Math.max(e[i],e[i+1])/r),s=Math.floor(Math.min(t[i],t[i+1])/r),c=Math.floor(Math.max(t[i],t[i+1])/r);for(let e=a;e<=o;e++)for(let t=s;t<=c;t++){let n=this.key(e,t),r=this.grid.get(n);r||this.grid.set(n,r=[]),r.push(i)}}}key(e,t){return(e+2048)*4096+(t+2048)}nearest(e,t,n,r={d:0,i:0,t:0,side:0}){let i=this.cell,a=Math.ceil(n/i),o=Math.floor(e/i),s=Math.floor(t/i),c=n*n,l=-1,u=0,d=this.x,f=this.z;for(let n=o-a;n<=o+a;n++)for(let r=s-a;r<=s+a;r++){let i=this.grid.get(this.key(n,r));if(i)for(let n=0;n<i.length;n++){let r=i[n],a=d[r],o=f[r],s=d[r+1]-a,p=f[r+1]-o,m=s*s+p*p||1,h=((e-a)*s+(t-o)*p)/m;h=h<0?0:h>1?1:h;let g=a+s*h-e,_=o+p*h-t,v=g*g+_*_;v<c&&(c=v,l=r,u=h)}}if(l<0)return null;let p=d[l+1]-d[l],m=f[l+1]-f[l];return r.d=Math.sqrt(c),r.i=l,r.t=u,r.side=p*(t-f[l])-m*(e-d[l]),r}};function Eh(e,t){let n=Math.imul(e,374761393)^Math.imul(t,668265263);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967295}function Dh(e,t){let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r,o=i*i*(3-2*i),s=a*a*(3-2*a),c=Eh(n,r),l=Eh(n+1,r),u=Eh(n,r+1),d=Eh(n+1,r+1);return c+(l-c)*o+(u-c)*s+(c-l-u+d)*o*s}function Oh(e,t,n){let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)}var kh=(e,t,n)=>e<t?t:e>n?n:e,Ah=(e,t,n)=>e+(t-e)*n;function jh(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Mh(e,t){let n=t-e;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return n}var Nh=4.5,Ph=-1.2,Fh=4,Ih=.45;function Lh(e,t){let n=2.6*Dh(e/170+11,t/170+7)+1.4*Dh(e/55,t/55)-1.1;for(let r=0;r<Ch.length;r++){let[i,a,o,s]=Ch[r],c=e-i,l=t-a,u=c*c+l*l;u<6.25*s*s&&(n+=o*Math.exp(-u/(s*s))*(.85+.3*Dh(e/45,t/45)))}let r=Oh(-1500,-2150,t);r>0&&(n+=r*(75+70*Dh(e/260+3,t/260))+r*r*30*Dh(e/60,t/60));let i=Oh(-1e3,-1450,e);i>0&&(n+=i*(55+50*Dh(e/200,t/200+5)));let a=Oh(420,720,t);a>0&&(n+=a*(35+30*Dh(e/180+9,t/180)));let o=Oh(1460,1560,e);return o>0&&(n=n*(1-o)-14*o),n}var Rh=[...Object.values(vh).map(e=>({x:e.x,z:e.z,r:e.r,h:e.h??Lh(e.x,e.z),east:e.id===`port`?2.4:1})),{x:yh.x,z:yh.z,r:yh.r,h:Lh(yh.x,yh.z),east:1}];function zh(e){let t=vh[e];return t.h??Lh(t.x,t.z)}function Bh(e,t){let n=Lh(e,t);for(let r=0;r<Rh.length;r++){let i=Rh[r],a=(e-i.x)*(e>i.x?i.east:1),o=t-i.z,s=a*a+o*o,c=i.r+70;s<c*c&&(n+=(i.h-n)*(1-Oh(i.r,c,Math.sqrt(s))))}return n}function Vh(e,t){let n=e.length,r=(n-1)*t,i=Math.floor(r),a=r-i;a===0&&i===n-1&&(i=n-2,a=1);let o=i>0?e[i-1]:[2*e[0][0]-e[1][0],2*e[0][1]-e[1][1]],s=e[i],c=e[i+1],l=i+2<n?e[i+2]:[2*e[n-1][0]-e[n-2][0],2*e[n-1][1]-e[n-2][1]],u=(e,t)=>(e[0]-t[0])**2+(e[1]-t[1])**2,d=u(o,s)**.25,f=u(s,c)**.25,p=u(c,l)**.25;f<1e-4&&(f=1),d<1e-4&&(d=f),p<1e-4&&(p=f);let m=(e,t,n,r)=>{let i=(t-e)/d-(n-e)/(d+f)+(n-t)/f,o=(n-t)/f-(r-t)/(f+p)+(r-n)/p;i*=f,o*=f;let s=-3*t+3*n-2*i-o,c=2*t-2*n+i+o;return t+i*a+s*a*a+c*a*a*a};return{x:m(o[0],s[0],c[0],l[0]),y:0,z:m(o[1],s[1],c[1],l[1])}}function Hh(e,t){let n=[0],r=Vh(e,0),i=0;for(let t=1;t<=200;t++){let a=Vh(e,t/200);i+=Math.hypot(a.x-r.x,a.z-r.z),n.push(i),r=a}let a=Math.max(2,Math.ceil(i/t)),o=[];for(let t=0;t<=a;t++){let r=t/a*i,s=0,c=200;for(;s<=c;){let e=Math.floor(s+(c-s)/2),t=n[e]-r;if(t<0)s=e+1;else if(t>0)c=e-1;else{c=e;break}}let l=c,u=n[l]===r?l/200:(l+(r-n[l])/(n[l+1]-n[l]))/200;o.push(Vh(e,u))}return o}var Uh=Hh(Sh,8),Wh=new Th(Float32Array.from(Uh.map(e=>e.x)),Float32Array.from(Uh.map(e=>e.z)),new Int16Array(Uh.length),48),Gh={d:0,i:0,t:0,side:0};function Kh(e,t,n=90){let r=Wh.nearest(e,t,n,Gh);return r?r.d:n}var qh=Object.keys(bh),Jh=[],Yh=[],Xh=[],Zh=[],Qh=[],$h={};qh.forEach((e,t)=>{let n=Hh(bh[e],Fh),r=n.length,i=n.map(e=>Bh(e.x,e.z)),a=i.slice();for(let e=0;e<4;e++){let e=a.slice();for(let t=1;t<r-1;t++){let n=0,i=0;for(let e=-10;e<=10;e++){let o=Math.min(r-1,Math.max(0,t+e));n+=a[o],i++}e[t]=n/i}e[0]=i[0],e[r-1]=i[r-1],a=e}let o=Jh.length,s=0;for(let e=0;e<r;e++){let r=n[e];e>0&&(s+=Math.hypot(r.x-n[e-1].x,r.z-n[e-1].z));let i=Kh(r.x,r.z,120),o=Math.max(.40000000000000013,a[e]+4.2*(1-Oh(10,90,i)));Jh.push(r.x),Yh.push(r.z),Xh.push(o),Zh.push(s),Qh.push(t)}$h[e]={id:e,o,n:r,len:s}});var q=Float32Array.from(Jh),J=Float32Array.from(Yh),eg=Float32Array.from(Xh),tg=Float32Array.from(Zh),ng=new Uint8Array(q.length);for(let e=0;e<q.length;e++)ng[e]=+(Kh(q[e],J[e],80)<41);var rg=new Th(q,J,Int16Array.from(Qh),32);function ig(e){return Ah(eg[e.i],eg[e.i+1],e.t)}var ag={d:0,i:0,t:0,side:0};function og(e,t){let n=Bh(e,t),r=rg.nearest(e,t,70,ag);r&&(n+=(ig(r)-Ih-n)*(1-Oh(30,70,r.d)));let i=Wh.nearest(e,t,45,Gh);return i&&(n+=(-5.5-n)*(1-Oh(15,43,i.d))),n}var sg={d:0,i:0,t:0,side:0};function cg(e,t){let n=rg.nearest(e,t,20,sg);if(n){let r=ig(n);if(ng[n.i]||n.d<5)return r;if(n.d<8.5)return Ah(r,og(e,t),Oh(5,8.5,n.d))}return og(e,t)}function lg(e){let t=[],n=[],r=[];for(let i of xh[e]){let e=$h[i];for(let i=+!!t.length;i<e.n;i++){let a=e.o+i;t.push(q[a]),n.push(J[a]),r.push(eg[a])}}let i=new Float32Array(t.length);for(let e=1;e<t.length;e++)i[e]=i[e-1]+Math.hypot(t[e]-t[e-1],n[e]-n[e-1]);return{x:Float32Array.from(t),z:Float32Array.from(n),y:Float32Array.from(r),s:i,len:i[i.length-1],n:t.length}}function ug(e,t){let n=$h[e],r=n.o,i=n.o+n.n-1;for(;r<i-1&&tg[r+1]<t;)r++;let a=Math.min(1,Math.max(0,(t-tg[r])/Math.max(.001,tg[r+1]-tg[r])));return{x:Ah(q[r],q[r+1],a),z:Ah(J[r],J[r+1],a),y:Ah(eg[r],eg[r+1],a),h:Math.atan2(q[r+1]-q[r],J[r+1]-J[r])}}var dg=(e,t,n)=>{e.x+=(t.x-e.x)*n,e.y+=(t.y-e.y)*n,e.z+=(t.z-e.z)*n},fg=class{constructor(){this.entity=new fm(`camera`),this.mode=`chase`,this.portrait=!1,this.position={x:0,y:0,z:0},this.pos={x:0,y:0,z:0},this.look={x:0,y:0,z:0},this.yaw=0,this.orbitA=0,this.blend=1,this.shake=0,this.t=0,this.baseFocus={x:0,y:1,z:42},this.tmpP={x:0,y:0,z:0},this.tmpL={x:0,y:0,z:0},this.cam=this.entity.addComponent(`camera`,{fov:60,nearClip:.5,farClip:1e3,clearColor:new O(205/255,233/255,248/255)})}get fov(){return this.cam.fov}setMode(e,t,n=!1){e===`orbit`&&(this.orbitA=t.h+Math.PI*.75),this.mode=e,this.blend=+!!n,n&&(this.yaw=t.h,this.desired(t,0),Object.assign(this.pos,this.tmpP),Object.assign(this.look,this.tmpL))}kick(e){this.shake=Math.max(this.shake,e)}desired(e,t){let n=Math.abs(e.speed),r=60,i=this.tmpP,a=this.tmpL;if(this.mode===`chase`){this.yaw+=Mh(this.yaw,e.h)*(1-Math.exp(-t*3.2));let o=Math.sin(this.yaw),s=Math.cos(this.yaw),c=this.portrait?27+n*.15:21.5+n*.12,l=this.portrait?13.5+n*.04:10+n*.04;i.x=e.x-o*c,i.y=e.y+l,i.z=e.z-s*c,a.x=e.x+o*(9+n*.4),a.y=e.y+3.2,a.z=e.z+s*(9+n*.4),r=(this.portrait?70:56)+n*.36}else if(this.mode===`orbit`){this.orbitA+=t*.2;let n=(e.x+e.ax)/2,o=(e.z+e.az)/2,s=this.portrait?34:27;i.x=n+Math.sin(this.orbitA)*s,i.y=e.y+(this.portrait?12:8),i.z=o+Math.cos(this.orbitA)*s,a.x=n,a.y=e.y-(this.portrait?4:2),a.z=o,r=this.portrait?72:55}else{let e=this.baseFocus,t=Math.sin(this.t*.15)*4;this.portrait?(i.x=e.x+t,i.y=e.y+88,i.z=e.z+92,r=60):(i.x=e.x+t,i.y=e.y+50,i.z=e.z+78,r=48),a.x=e.x,a.y=e.y,a.z=e.z-6}return r}update(e,t){this.t+=e;let n=this.desired(t,e);this.blend=Math.min(1,this.blend+e*1.2);let r=this.mode===`chase`?1-Math.exp(-e*(4+8*this.blend*this.blend)):1-Math.exp(-e*(1.5+3*this.blend));dg(this.pos,this.tmpP,r),dg(this.look,this.tmpL,Math.min(1,r*1.4));let i=og(this.pos.x,this.pos.z)+2.2;this.pos.y<i&&(this.pos.y=i);let a=this.position;if(Object.assign(a,this.pos),this.shake>0){this.shake=Math.max(0,this.shake-e*2.5);let t=this.shake*.35;a.x+=(Math.random()-.5)*t,a.y+=(Math.random()-.5)*t}this.entity.setPosition(a.x,a.y,a.z),this.entity.lookAt(this.look.x,this.look.y,this.look.z),Math.abs(this.cam.fov-n)>.05&&(this.cam.fov+=(n-this.cam.fov)*Math.min(1,e*3))}},pg=e=>e**2.2,mg=e=>e**(1/2.2);function hg(e,t={r:0,g:0,b:0}){return t.r=pg((e>>16&255)/255),t.g=pg((e>>8&255)/255),t.b=pg((e&255)/255),t}function gg(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}function _g(e,t){let{r:n,g:r,b:i}=e,a=Math.max(n,r,i),o=Math.min(n,r,i),s=0,c=0,l=(o+a)/2;if(o!==a){let e=a-o;c=l<=.5?e/(a+o):e/(2-a-o),s=a===n?(r-i)/e+(r<i?6:0):a===r?(i-n)/e+2:(n-r)/e+4,s/=6}let u=Math.min(1,Math.max(0,l+t)),d=Math.min(1,Math.max(0,c));if(d===0)e.r=e.g=e.b=u;else{let t=u<=.5?u*(1+d):u+d-u*d,n=2*u-t;e.r=gg(n,t,s+1/3),e.g=gg(n,t,s),e.b=gg(n,t,s-1/3)}return e}var vg=new Map;function yg(e){let t=vg.get(e);return t||vg.set(e,t=hg(e)),t}function Y(e,t){return _g(hg(e),t)}var bg=()=>{let e=new Float64Array(16);return e[0]=e[5]=e[10]=e[15]=1,e};function xg(e,t,n){let r=t[0],i=t[4],a=t[8],o=t[12],s=t[1],c=t[5],l=t[9],u=t[13],d=t[2],f=t[6],p=t[10],m=t[14],h=t[3],g=t[7],_=t[11],v=t[15],y=n[0],b=n[4],x=n[8],S=n[12],C=n[1],w=n[5],T=n[9],E=n[13],D=n[2],O=n[6],ee=n[10],te=n[14],ne=n[3],re=n[7],k=n[11],ie=n[15];return e[0]=r*y+i*C+a*D+o*ne,e[4]=r*b+i*w+a*O+o*re,e[8]=r*x+i*T+a*ee+o*k,e[12]=r*S+i*E+a*te+o*ie,e[1]=s*y+c*C+l*D+u*ne,e[5]=s*b+c*w+l*O+u*re,e[9]=s*x+c*T+l*ee+u*k,e[13]=s*S+c*E+l*te+u*ie,e[2]=d*y+f*C+p*D+m*ne,e[6]=d*b+f*w+p*O+m*re,e[10]=d*x+f*T+p*ee+m*k,e[14]=d*S+f*E+p*te+m*ie,e[3]=h*y+g*C+_*D+v*ne,e[7]=h*b+g*w+_*O+v*re,e[11]=h*x+g*T+_*ee+v*k,e[15]=h*S+g*E+_*te+v*ie,e}function Sg(e,t,n,r=[0,0,0,1]){let i=Math.cos(e/2),a=Math.cos(t/2),o=Math.cos(n/2),s=Math.sin(e/2),c=Math.sin(t/2),l=Math.sin(n/2);return r[0]=s*a*o+i*c*l,r[1]=i*c*o-s*a*l,r[2]=i*a*l-s*c*o,r[3]=i*a*o+s*c*l,r}function Cg(e,t,n,r,i,a,o=[0,0,0,1]){let s=e*r+t*i+n*a+1;s<1e-8?(s=0,Math.abs(e)>Math.abs(n)?o.splice(0,4,-t,e,0,s):o.splice(0,4,0,-n,t,s)):o.splice(0,4,t*a-n*i,n*r-e*a,e*i-t*r,s);let c=Math.hypot(o[0],o[1],o[2],o[3])||1;for(let e=0;e<4;e++)o[e]/=c;return o}function wg(e,t,n,r,i,a,o,s){let[c,l,u,d]=i,f=c+c,p=l+l,m=u+u,h=c*f,g=c*p,_=c*m,v=l*p,y=l*m,b=u*m,x=d*f,S=d*p,C=d*m;return e[0]=(1-(v+b))*a,e[1]=(g+C)*a,e[2]=(_-S)*a,e[3]=0,e[4]=(g-C)*o,e[5]=(1-(h+b))*o,e[6]=(y+x)*o,e[7]=0,e[8]=(_+S)*s,e[9]=(y-x)*s,e[10]=(1-(h+v))*s,e[11]=0,e[12]=t,e[13]=n,e[14]=r,e[15]=1,e}function Tg(e,t,n){let r=[];for(let i=0;i<t.length;i+=3){let a=t[i]*3,o=t[i+1]*3,s=t[i+2]*3,c=e[o]-e[a],l=e[o+1]-e[a+1],u=e[o+2]-e[a+2],d=e[s]-e[a],f=e[s+1]-e[a+1],p=e[s+2]-e[a+2],m=l*p-u*f,h=u*d-c*p,g=c*f-l*d;if(m*m+h*h+g*g<1e-12)continue;let _=(e[a]+e[o]+e[s])/3,v=(e[a+1]+e[o+1]+e[s+1])/3,y=(e[a+2]+e[o+2]+e[s+2])/3,[b,x,S]=n(_,v,y),C=m*(_-b)+h*(v-x)+g*(y-S)<0?[a,s,o]:[a,o,s];for(let t of C)r.push(e[t],e[t+1],e[t+2])}return Float32Array.from(r)}var Eg=()=>[0,0,0],Dg=(e,t)=>[0,t,0];function Og(e,t,n,r,i=!1){let a=[],o=[],s=[],c=0,l=n/2;for(let i=0;i<=1;i++){let o=[],u=i*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r*Math.PI*2;a.push(u*Math.sin(t),-i*n+l,u*Math.cos(t)),o.push(c++)}s.push(o)}for(let n=0;n<r;n++){let r=s[0][n],i=s[1][n],a=s[1][n+1],c=s[0][n+1];e>0&&o.push(r,i,c),t>0&&o.push(i,a,c)}let u=n=>{let i=n?e:t,s=n?1:-1,u=c;for(let e=1;e<=r;e++)a.push(0,l*s,0),c++;let d=c;for(let e=0;e<=r;e++){let t=e/r*Math.PI*2;a.push(i*Math.sin(t),l*s,i*Math.cos(t)),c++}for(let e=0;e<r;e++){let t=u+e,r=d+e;n?o.push(r,r+1,t):o.push(r+1,r,t)}};return i||(e>0&&u(!0),t>0&&u(!1)),Tg(a,o,i?Dg:Eg)}function kg(){let e=[];for(let[t,n,r]of[[[1,0,0],[0,0,-1],[0,1,0]],[[-1,0,0],[0,0,1],[0,1,0]],[[0,1,0],[1,0,0],[0,0,-1]],[[0,-1,0],[1,0,0],[0,0,1]],[[0,0,1],[1,0,0],[0,1,0]],[[0,0,-1],[-1,0,0],[0,1,0]]]){let i=(e,i)=>[0,1,2].map(a=>.5*(t[a]+e*n[a]+i*r[a])),a=i(-1,-1),o=i(1,-1),s=i(1,1),c=i(-1,1);e.push(...a,...o,...s,...a,...s,...c)}return Float32Array.from(e)}function Ag(e){let t=[0,0,0],n=[];for(let n=0;n<=e;n++){let r=n/e*Math.PI*2;t.push(.5*Math.cos(r),0,-.5*Math.sin(r))}for(let t=1;t<=e;t++)n.push(t,t+1,0);return Tg(t,n,(e,t,n)=>[e,-1,n])}function jg(e,t){let n=e.slice();for(let e=0;e<n.length;e+=3){let t=Math.hypot(n[e],n[e+1],n[e+2]);n[e]*=.5/t,n[e+1]*=.5/t,n[e+2]*=.5/t}return Tg(n,t,Eg)}var Mg=(1+Math.sqrt(5))/2;function Ng(){let e=Mg;return jg([-1,e,0,1,e,0,-1,-e,0,1,-e,0,0,-1,e,0,1,e,0,-1,-e,0,1,-e,e,0,-1,e,0,1,-e,0,-1,-e,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1])}function Pg(){let e=Mg,t=1/e;return jg([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-t,-e,0,-t,e,0,t,-e,0,t,e,-t,-e,0,-t,e,0,t,-e,0,t,e,0,-e,0,-t,e,0,-t,-e,0,t,e,0,t],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9])}function Fg(e,t,n,r=!1){let i=[],a=[],o=[],s=0;for(let r=0;r<=n;r++){let a=[],c=r/n;for(let n=0;n<=t;n++){let r=n/t;i.push(-e*Math.cos(r*Math.PI*2)*Math.sin(c*Math.PI),e*Math.cos(c*Math.PI),e*Math.sin(r*Math.PI*2)*Math.sin(c*Math.PI)),a.push(s++)}o.push(a)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=o[e][r+1],i=o[e][r],s=o[e+1][r],c=o[e+1][r+1];e!==0&&a.push(t,i,c),e!==n-1&&a.push(i,s,c)}return Tg(i,a,r?(e,t,n)=>[2*e,2*t,2*n]:Eg)}function Ig(){return Tg([-.5,0,-.5,.5,0,-.5,0,1,-.5,-.5,0,.5,.5,0,.5,0,1,.5],[0,1,2,3,4,5,0,1,4,0,4,3,1,2,5,1,5,4,2,0,3,2,3,5],()=>[0,1/3,0])}var Lg={box:kg(),cyl6:Og(.5,.5,1,6),cyl8:Og(.5,.5,1,8),cyl12:Og(.5,.5,1,12),disc6:Ag(6),tube6:Og(.5,.5,1,6,!0),ocone6:Og(0,.5,1,6,!0),cone5:Og(0,.5,1,5),cone6:Og(0,.5,1,6),cone8:Og(0,.5,1,8),ico:Ng(),dode:Pg(),sphere:Fg(.5,8,6),prism:Ig()},Rg=class{constructor(){this.a=new Float32Array(1024),this.n=0}push3(e,t,n){if(this.n+3>this.a.length){let e=new Float32Array(this.a.length*2);e.set(this.a),this.a=e}this.a[this.n++]=e,this.a[this.n++]=t,this.a[this.n++]=n}take(){return this.a.slice(0,this.n)}},zg=class{constructor(){this.p=new Rg,this.c=new Rg,this.base=bg(),this.stack=[]}get empty(){return this.p.n===0}push(e){this.stack.push(this.base),this.base=xg(bg(),this.base,e)}pop(){this.base=this.stack.pop()??bg()}at(e,t,n,r=0,i=1){this.push(wg(bg(),e,t,n,Sg(0,r,0),i,i,i))}tri(e,t,n,r,i,a,o,s,c,l){this.p.push3(e,t,n),this.p.push3(r,i,a),this.p.push3(o,s,c);for(let e=0;e<3;e++)this.c.push3(l.r,l.g,l.b)}geom(e,t,n){let r=xg(Bg,this.base,t);for(let t=0;t<e.length;t+=3){let i=e[t],a=e[t+1],o=e[t+2],s=1/(r[3]*i+r[7]*a+r[11]*o+r[15]);this.p.push3((r[0]*i+r[4]*a+r[8]*o+r[12])*s,(r[1]*i+r[5]*a+r[9]*o+r[13])*s,(r[2]*i+r[6]*a+r[10]*o+r[14])*s),this.c.push3(n.r,n.g,n.b)}}build(){let e=this.p.take(),t=this.c.take(),n=new Float32Array(e.length);for(let t=0;t<e.length;t+=9){let r=e[t+3]-e[t],i=e[t+4]-e[t+1],a=e[t+5]-e[t+2],o=e[t+6]-e[t],s=e[t+7]-e[t+1],c=e[t+8]-e[t+2],l=i*c-a*s,u=a*o-r*c,d=r*s-i*o,f=Math.hypot(l,u,d)||1;l/=f,u/=f,d/=f;for(let e=0;e<9;e+=3)n[t+e]=l,n[t+e+1]=u,n[t+e+2]=d}return{p:e,n,c:t,count:e.length/3}}},Bg=bg(),Vg=bg(),Hg=[0,0,0,1];function X(e,t,n,r,i,a,o,s,c,l=0,u=0,d=0){Sg(u,l,d,Hg),wg(Vg,r,i,a,Hg,o,s,c),e.geom(Lg[t],Vg,typeof n==`number`?yg(n):n)}function Z(e,t,n,r,i,a,o,s,c=0){X(e,`box`,t,n,r+o/2,i,a,o,s,c)}function Ug(e,t,n,r,i,a,o,s,c,l=c){let u=a-n,d=o-r,f=s-i,p=Math.hypot(u,d,f);p<1e-4||(Cg(0,0,1,u/p,d/p,f/p,Hg),wg(Vg,(n+a)/2,(r+o)/2,(i+s)/2,Hg,c,l,p),e.geom(Lg.box,Vg,typeof t==`number`?yg(t):t))}var Q,Wg;async function Gg(e,t){Wg=new la(e,{antialias:!0,powerPreference:`high-performance`,stencil:!1}),Wg.maxPixelRatio=t;let n=new xm;n.graphicsDevice=Wg,n.componentSystems=[Nm,Rm,Vm],n.resourceHandlers=[],Q=new bm(e),Q.init(n),Q.setCanvasFillMode(mp),Q.setCanvasResolution(gp);let r=Io.get(Wg,Lt),i=r.get(`fogPS`);i&&r.set(`fogPS`,i.replace(`fogFactor = (fog_end - depth) / (fog_end - fog_start);`,`fogFactor = 1.0 - smoothstep(fog_start, fog_end, depth);`))}function Kg(e){return new O(mg(e.r),mg(e.g),mg(e.b))}function qg(e){return new O((e>>16&255)/255,(e>>8&255)/255,(e&255)/255)}function Jg(e){let t=new ts(Wg);return t.setPositions(e.p),t.setNormals(e.n),t.setColors(e.c,3),t.update(),t}function Yg(e,t,n){let r=new ts(Wg);return r.setPositions(e),t&&r.setUvs(0,t),n&&r.setNormals(n),r.update(),r}function $(e,t,n=`mesh`,r){let i=new fm(n),a=new Ms(e,t);return i.addComponent(`render`,{meshInstances:[a],castShadows:!1,receiveShadows:!1,...r?{layers:r}:{}}),i}function Xg(e){return e.render.meshInstances[0]}function Zg(e,t){e.render.meshInstances=[new Ms(t,Xg(e).material)]}var Qg=null;function $g(){if(Qg)return Qg;let e=new Kf;return e.diffuseVertexColor=!0,e.useSkybox=!1,e.gloss=0,e.update(),Qg=e}function e_(e,t=0){let n=new Kf;return n.diffuse=qg(e),t&&(n.emissive=qg(t)),n.useSkybox=!1,n.gloss=0,n.update(),n}var t_=`
attribute vec3 aPosition;
attribute vec2 aUv0;
uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;
uniform vec2 uOffset;
varying vec2 vUv;
void main(void) {
  vUv = aUv0 + uOffset;
  gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
}`,n_=`
uniform sampler2D uTex;
uniform vec4 uColor;
uniform float uFog;
uniform vec3 fog_color;
uniform float fog_start;
uniform float fog_end;
varying vec2 vUv;
void main(void) {
  vec4 c = texture2D(uTex, vUv) * uColor;
  if (uFog > 0.5) {
    float d = gl_FragCoord.z / gl_FragCoord.w;
    c.rgb = mix(c.rgb, pow(fog_color, vec3(1.0 / 2.2)), smoothstep(fog_start, fog_end, d));
  }
  gl_FragColor = c;
}`,r_=null;function i_(){if(r_)return r_;let e=document.createElement(`canvas`);e.width=e.height=1;let t=e.getContext(`2d`);return t.fillStyle=`#fff`,t.fillRect(0,0,1,1),r_=d_(e)}function a_(e={}){let t=new yu({uniqueName:`truck-unlit`,vertexGLSL:t_,fragmentGLSL:n_,attributes:{aPosition:P,aUv0:rt}}),n=e.color??16777215;return t.setParameter(`uTex`,e.tex??i_()),t.setParameter(`uColor`,[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255,e.opacity??1]),t.setParameter(`uOffset`,[0,0]),t.setParameter(`uFog`,e.fog===!1?0:1),t.blendType=e.transparent?2:3,t.cull=+!e.doubleSided,t.depthWrite=e.depthWrite??!e.transparent,e.depthBias&&(t.depthBias=e.depthBias,t.slopeDepthBias=e.depthBias),t.update(),t}function o_(e,t,n){e.setParameter(`uColor`,[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255,n])}var s_=`
attribute vec3 aPosition;
attribute vec3 aColor;
uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;
varying vec3 vColor;
void main(void) {
  vColor = aColor;
  gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
}`,c_=`
varying vec3 vColor;
void main(void) {
  gl_FragColor = vec4(pow(vColor, vec3(1.0 / 2.2)), 1.0);
}`;function l_(e=!1,t=!0){let n=new yu({uniqueName:`truck-sky`,vertexGLSL:s_,fragmentGLSL:c_,attributes:{aPosition:P,aColor:tt}});return n.cull=+!e,n.depthWrite=t,n.update(),n}function u_(e){let t=new ts(Wg);return t.setPositions(e.p),t.setColors(e.c,3),t.update(),t}function d_(e,t=!1,n=!0,r=1){let i=new dn(Wg,{width:e.width,height:e.height,format:7,mipmaps:n,minFilter:n?5:1,magFilter:1,addressU:1,addressV:+!t,anisotropy:r});return i.setSource(e),i}var f_=220,p_=8,m_=`
attribute vec3 aPosition;
attribute vec4 aColor;
attribute float aSize;
uniform mat4 matrix_model;
uniform mat4 matrix_view;
uniform mat4 matrix_projection;
uniform float uScale;
varying vec4 vC;
void main(void) {
  vec4 mv = matrix_view * matrix_model * vec4(aPosition, 1.0);
  gl_PointSize = aSize * uScale / max(1.0, -mv.z);
  gl_Position = matrix_projection * mv;
  vC = aColor;
}`,h_=`
varying vec4 vC;
void main(void) {
  vec2 c = gl_PointCoord - 0.5;
  float d = dot(c, c);
  if (d > 0.25 || vC.a < 0.01) discard;
  gl_FragColor = vec4(vC.rgb, vC.a * (1.0 - d * 3.2));
}`,g_=class{constructor(){this.entity=new fm(`particles`),this.vel=new Float32Array(660),this.life=new Float32Array(f_),this.maxLife=new Float32Array(f_),this.s0=new Float32Array(f_),this.s1=new Float32Array(f_),this.a0=new Float32Array(f_),this.grav=new Float32Array(f_),this.next=0;let e=new lr(Wg,[{semantic:P,components:3,type:6},{semantic:tt,components:4,type:6},{semantic:rt,components:1,type:6}]);this.vb=new rr(Wg,e,f_,{usage:1}),this.data=new Float32Array(this.vb.lock()),this.vb.unlock();let t=new ts(Wg);t.vertexBuffer=this.vb,t.primitive[0]={type:0,base:0,baseVertex:0,count:f_,indexed:!1},this.mat=new yu({uniqueName:`truck-particles`,vertexGLSL:m_,fragmentGLSL:h_,attributes:{aPosition:P,aColor:tt,aSize:rt}}),this.mat.blendType=2,this.mat.depthWrite=!1,this.mat.setParameter(`uScale`,400),this.mat.update();let n=new Ms(t,this.mat);n.cull=!1,this.entity.addComponent(`render`,{meshInstances:[n],castShadows:!1,receiveShadows:!1})}setScale(e,t){this.mat.setParameter(`uScale`,e/(2*Math.tan(t*Math.PI/360)))}emit(e,t,n,r,i,a,o,s,c,l,u,d=0){let f=this.next;this.next=(this.next+1)%f_;let p=this.data,m=f*p_;p[m]=e,p[m+1]=t,p[m+2]=n,p[m+3]=(o>>16&255)/255,p[m+4]=(o>>8&255)/255,p[m+5]=(o&255)/255,p[m+6]=s,p[m+7]=c,this.vel[f*3]=r,this.vel[f*3+1]=i,this.vel[f*3+2]=a,this.a0[f]=s,this.s0[f]=c,this.s1[f]=l,this.life[f]=u,this.maxLife[f]=u,this.grav[f]=d}update(e){let t=this.data;for(let n=0;n<f_;n++){let r=n*p_;if(this.life[n]<=0){t[r+6]!==0&&(t[r+6]=0);continue}this.life[n]-=e;let i=1-Math.max(0,this.life[n])/this.maxLife[n];this.vel[n*3+1]-=this.grav[n]*e;let a=Math.exp(-1.6*e);this.vel[n*3]*=a,this.vel[n*3+2]*=a,t[r]+=this.vel[n*3]*e,t[r+1]+=this.vel[n*3+1]*e,t[r+2]+=this.vel[n*3+2]*e,t[r+7]=this.s0[n]+(this.s1[n]-this.s0[n])*i,t[r+6]=this.a0[n]*(1-i)*Math.min(1,i*8+.3)}this.vb.unlock()}},__=[2792847,16032353,7097014,1933270,16762941,15167313,9358054],v_=[[`trunk`,-1,120],[`town`,1,300],[`town`,-1,700],[`port`,-1,500],[`port`,1,1100],[`farm`,-1,400]],y_=2.3,b_=class{constructor(){this.root=new fm(`traffic`),this.ents=[],this.cars=[],v_.forEach(([e,t,n],r)=>{let i=11+r%3*2;this.cars.push({road:e,s:n,dir:t,v:i,cruise:i,pause:0,scale:1,x:0,z:0,y:0,h:0,k:$h[e].o});let a=yg(__[r%__.length]),o=e=>{let t=yg(e);return{r:t.r*a.r,g:t.g*a.g,b:t.b*a.b}},s=new zg;X(s,`box`,o(16777215),0,.75,0,1.9,.8,4.2),X(s,`box`,o(16777215),0,1.45,-.3,1.7,.7,2.2),X(s,`box`,o(3824250),0,1.45,-.3,1.74,.5,1.9),X(s,`box`,o(4473924),0,.45,2.12,1.95,.3,.1);for(let e of[-.65,.65])X(s,`box`,o(16773824),e,.85,2.11,.4,.2,.05);for(let e of[-.9,.9])for(let t of[-1.35,1.35])X(s,`cyl8`,o(2236962),e,.38,t,.76,.3,.76,0,0,Math.PI/2);let c=$(Jg(s.build()),$g(),`car`);this.ents.push(c),this.root.addChild(c)})}update(e,t){this.cars.forEach((n,r)=>{let i=$h[n.road],a=n.cruise;if(t){let e=Math.sin(n.h),r=Math.cos(n.h),i=t.x-n.x,o=t.z-n.z,s=i*e+o*r,c=Math.abs(i*r-o*e);s>0&&s<22&&c<4.2&&(a=0);for(let[e,r]of[[t.x,t.z],[t.x+Math.sin(t.h)*2.5,t.z+Math.cos(t.h)*2.5],[(t.ax+t.x)/2,(t.az+t.z)/2],[t.ax,t.az]])if(Math.hypot(e-n.x,r-n.z)<3.1&&n.pause<=0){t.hitCar(Math.abs(t.speed)+n.v*.5),n.pause=2.5,n.v=0,n.s-=n.dir*3;break}}n.pause>0&&(n.pause-=e,a=0),n.v+=Math.max(-9*e,Math.min(3*e,a-n.v)),n.s+=n.dir*n.v*e;let o=i.len,s=n.dir>0?o-25:25;n.dir>0&&n.s>s||n.dir<0&&n.s<s?(n.scale-=e*3,n.scale<=0&&(n.s=n.dir>0?25:o-25,n.k=i.o)):n.scale=Math.min(1,n.scale+e*3);let c=i.o,l=c+i.n-2,u=Math.min(Math.max(n.k,c),l);for(;u<l&&tg[u+1]<n.s;)u++;for(;u>c&&tg[u]>n.s;)u--;n.k=u;let d=Math.min(1,Math.max(0,(n.s-tg[u])/Math.max(.01,tg[u+1]-tg[u]))),f=q[u+1]-q[u],p=J[u+1]-J[u],m=Math.hypot(f,p)||1,h=f/m*n.dir,g=p/m*n.dir;n.h=Math.atan2(h,g),n.x=q[u]+f*d-g*y_,n.z=J[u]+p*d+h*y_,n.y=eg[u]+(eg[u+1]-eg[u])*d;let _=this.ents[r];_.setLocalPosition(n.x,n.y+.06,n.z),_.setLocalEulerAngles(0,n.h*180/Math.PI,0);let v=Math.max(.001,n.scale);_.setLocalScale(v,v,v)})}},x_=[5216828,6138437,7059534,4164154],S_=[3111498,2780485,3835730],C_=[16049089,16502949,13494002,16172999,15265992,16777215,16377759],w_=[13129021,10239795,4020864,5982827,14254635];function T_(e,t,n=1){let r=S_[t()*S_.length|0];X(e,`disc6`,4161338,0,.12,0,4.4*n,1,4.4*n,t()*3),X(e,`tube6`,8016438,0,1*n,0,.6*n,2*n,.6*n),X(e,`ocone6`,Y(r,(t()-.5)*.06),0,3.4*n,0,4.4*n,4*n,4.4*n,t()*3),X(e,`ocone6`,Y(r,.03),0,5.6*n,0,3.3*n,3.4*n,3.3*n,t()*3),X(e,`ocone6`,Y(r,.06),0,7.5*n,0,2.1*n,2.8*n,2.1*n,t()*3)}function E_(e,t,n=1){let r=x_[t()*x_.length|0];X(e,`disc6`,4885052,0,.12,0,5.2*n,1,5.2*n,t()*3),X(e,`tube6`,8016438,0,1.4*n,0,.7*n,2.8*n,.7*n),X(e,`ico`,Y(r,(t()-.5)*.08),0,4.2*n,0,5*n,4.4*n,5*n,t()*3,t()),X(e,`ico`,Y(r,.05),1.1*n,5.4*n,.4*n,3*n,2.8*n,3*n,t()*3)}function D_(e,t,n=1){X(e,`ico`,Y(x_[t()*x_.length|0],-.03),0,.7*n,0,2.4*n,1.7*n,2.4*n,t()*3)}function O_(e,t,n=1){X(e,`dode`,Y(10129801,(t()-.5)*.1),0,.5*n,0,3*n*(.8+t()*.5),2*n,2.6*n,t()*6,t()*.4)}function k_(e,t,n=!1){let r=n?12:8+t()*3,i=n?10:7+t()*2,a=n?7.5:4+t()*1.5,o=C_[t()*C_.length|0],s=w_[t()*w_.length|0];Z(e,12168602,0,0,0,r+.6,.5,i+.6),Z(e,o,0,.5,0,r,a,i),X(e,`prism`,s,0,.5+a,0,r+1.2,3+t()*1.5,i+1,0),X(e,`box`,8014640,0,1.6,i/2+.05,1.3,2.2,.15);let c=6061987;for(let t of[-r/3,r/3])X(e,`box`,c,t,.5+a*.55,i/2+.05,1.3,1.2,.12),X(e,`box`,16777215,t,.5+a*.55-.7,i/2+.1,1.6,.18,.2);if(n)for(let t of[-r/3,r/3])X(e,`box`,c,t,.5+a*.2,i/2+.05,1.3,1.2,.12);t()<.6&&Z(e,9276813,r*.25,.5+a,-i*.2,.8,3,.8)}function A_(e,t){let n=[16769162,11066076,16032675,12839053][t()*4|0];Z(e,n,0,0,0,12,6,9),Z(e,Y(n,-.2),0,6,0,12.4,.6,9.4),X(e,`box`,6061987,0,2,4.55,12*.7,2.4,.12);for(let t=0;t<6;t++)X(e,`box`,t%2?16777215:15087942,-12*.35+(t+.5)*(12*.7)/6,3.6,5.4,12*.7/6,.2,1.8,0,-.35);X(e,`box`,16774102,0,5,4.6,12*.6,1,.15)}function j_(e){Z(e,15326403,0,0,0,7,20,7),Z(e,13615007,0,20,0,8,1,8),Z(e,15326403,0,21,0,6,6,6);for(let t=0;t<4;t++){let n=t*Math.PI/2;X(e,`cyl12`,16777215,Math.sin(n)*3.05,24,Math.cos(n)*3.05,3.4,.2,3.4,n,Math.PI/2),X(e,`box`,1911364,Math.sin(n)*3.2,24.4,Math.cos(n)*3.2,.25,1.4,.1,n)}X(e,`cone8`,4020864,0,31,0,8.5,8,8.5,Math.PI/8),X(e,`sphere`,16762941,0,35.4,0,.9,.9,.9)}function M_(e){Z(e,12007983,0,0,0,16,8,22),X(e,`prism`,7023140,0,8,0,17.5,6,23),X(e,`box`,16777215,0,3.4,11.05,7.2,6.8,.2),X(e,`box`,10694698,0,3.4,11.12,6.4,6.2,.2),X(e,`box`,16777215,0,3.4,11.2,.35,8.4,.12,0,0,.78),X(e,`box`,16777215,0,3.4,11.2,.35,8.4,.12,0,0,-.78),X(e,`box`,16777215,0,10.2,11.2,2.4,2.4,.2)}function N_(e){X(e,`cyl12`,14673642,0,9,0,6,18,6),X(e,`sphere`,11056315,0,18,0,6,4,6);for(let t=1;t<5;t++)X(e,`cyl12`,12174538,0,t*3.6,0,6.15,.3,6.15)}function P_(e){X(e,`cyl8`,15123306,0,.9,0,1.8,2.2,1.8,0,0,Math.PI/2)}function F_(e,t){let n=Math.max(1,Math.round(t/3));for(let r=0;r<=n;r++)X(e,`box`,15852486,-t/2+r*t/n,.7,0,.25,1.4,.25);X(e,`box`,15852486,0,1.05,0,t,.18,.12),X(e,`box`,15852486,0,.55,0,t,.18,.12)}var I_=[15087942,1933270,16032353,2792847,16762941,7097014,15167313];function L_(e,t,n=12){Z(e,t,0,0,0,2.44,2.6,n);let r=Y(t,-.12);for(let t=0;t<7;t++){let i=-n/2+.6+t*(n-1.2)/6;X(e,`box`,r,1.24,1.3,i,.08,2.5,.3),X(e,`box`,r,-1.24,1.3,i,.08,2.5,.3)}X(e,`box`,r,0,1.3,n/2+.03,2.2,2.4,.06)}function R_(e,t,n,r,i){for(let a=0;a<n;a++)for(let n=0;n<r;n++){let r=1+(t()*i|0);for(let i=0;i<r;i++)e.at(a*2.7,i*2.62,n*12.6),L_(e,I_[t()*I_.length|0]),e.pop()}}function z_(e,t=16762941){for(let n of[-5,5])for(let r of[-4,4])Z(e,t,n,0,r,1,22,1);Z(e,t,0,20,4,11,1.2,1),Z(e,t,0,20,-4,11,1.2,1),Z(e,Y(t,-.1),0,22,8,2,1.6,44),Z(e,3885658,0,22.5,-2,5,3.5,6),X(e,`box`,5592405,0,16,22,.15,12,.15),Z(e,3355443,0,9.5,22,3,.6,1.5)}function B_(e){Z(e,2372685,0,-2,0,14,5,60),X(e,`prism`,2372685,0,-2,33.4,14,5,7,0,0,Math.PI),Z(e,12597547,0,-2,0,14.1,1.4,60.1),Z(e,15330543,0,3,-22,12,4,10),Z(e,15330543,0,7,-23,9,3.4,7),X(e,`box`,3888752,0,8.6,-19.4,8,1,.2),X(e,`cyl8`,15087942,0,12,-25,2.4,4,2.4)}function V_(e){for(let t=0;t<6;t++)X(e,`cyl12`,t%2?15087942:16777215,0,2+t*4,0,5-t*.35,4,5-t*.35);X(e,`cyl8`,3355443,0,24.5,0,4,1,4),X(e,`cyl8`,16774064,0,26.3,0,2.6,2.6,2.6),X(e,`cone8`,15087942,0,28.8,0,3.6,2.4,3.6)}function H_(e,t,n,r,i,a){Z(e,i,0,0,0,t,r,n),X(e,`prism`,a,0,r,0,t+1,2.4,n+1)}function U_(e,t){for(let n=0;n<3;n++)for(let r=0;r<4-n;r++)X(e,`cyl8`,Y(9067062,(t()-.5)*.08),-2.4+r*1.6+n*.8,.7+n*1.35,0,1.4,9,1.4,0,Math.PI/2),X(e,`cyl8`,14727039,-2.4+r*1.6+n*.8,.7+n*1.35,4.52,1.2,.05,1.2,0,Math.PI/2)}function W_(e,t,n){for(let r=0;r<n;r++){let n=1.2+t()*.6;X(e,`box`,Y(13145434,(t()-.5)*.1),(t()-.5)*6,n/2,(t()-.5)*6,n,n,n,t()*1.5)}}var G_=[0,22,24.5,27,29.5],K_=[0,4.6,5.1,5.7,6.3],q_=4.6,J_=-1.9,Y_=9.2,X_=[{body:15087942,accent:16777215,trim:14278114},{body:15087942,accent:16777215,trim:14278114},{body:15764004,accent:1911364,trim:15265007},{body:1933270,accent:16762941,trim:15659765},{body:2303791,accent:16762941,trim:16767338}];function Z_(e){let t=X_[kh(e,1,4)],n=new zg,r=2902635,i=2830134;Z(n,i,0,.75,-.5,1.1,.4,7.2),Z(n,t.trim,0,.55,3.55,2.55,.5,.4),X(n,`box`,t.body,0,1.78,2.55,2.2,1.15,1.95),X(n,`box`,Y(t.body,.06),0,2.38,2.5,2.1,.08,1.85),X(n,`box`,t.trim,0,1.72,3.54,1.35,1.05,.12);for(let e=0;e<4;e++)X(n,`box`,i,0,1.36+e*.24,3.6,1.15,.07,.05);for(let r of[-1,1]){X(n,`box`,16774856,r*.88,1.52,3.52,.42,.3,.12),X(n,`box`,Y(t.body,-.08),r*1.13,1.28,2.5,.35,.5,1.5),X(n,`box`,t.accent,r*1.105,1.9,2.5,.03,.18,1.9),X(n,`box`,t.accent,r*1.23,2.05,.75,.03,.22,2.1),X(n,`cyl12`,t.trim,r*1.12,1,.55,.72,1.3,.72,0,Math.PI/2),X(n,`box`,i,r*1.2,.72,1.55,.35,.12,.6);let a=e>=3?3.4:2.8;X(n,`cyl8`,t.trim,r*1.2,2.2+a/2,-.25,.3,a,.3),X(n,`box`,i,r*1.45,2.9,1.75,.08,.6,.3),X(n,`box`,i,r*1.08,1.45,-2.05,.75,.12,2.5),X(n,`box`,1118481,r*1.08,.75,-3.35,.7,.8,.06)}X(n,`box`,t.body,0,2.5,.75,2.45,2.1,2.1),X(n,`box`,r,0,2.95,1.82,2.2,.95,.06,0,-.12);for(let e of[-1,1])X(n,`box`,r,e*1.235,2.95,.95,.04,.8,1.05);X(n,`box`,Y(t.body,-.1),0,3.6,.75,2.5,.1,2.15),e>=3?(X(n,`box`,t.body,0,2.7,-.95,2.45,2.5,1.4),X(n,`box`,t.accent,0,3.97,-.95,2.47,.12,1.42),X(n,`box`,t.body,0,4.25,.35,2.3,.9,1.6,0,.35)):e>=2&&X(n,`box`,t.body,0,4,.5,2.3,.75,1.3,0,.3);for(let t=-2;t<=2;t++)X(n,`box`,e>=4?16767338:16753978,t*.4,3.7,1.72,.22,.14,.14);if(e>=4){X(n,`box`,t.trim,0,1.05,3.85,2.6,.12,.12);for(let e of[-1,1])X(n,`box`,t.trim,e*1.1,1.5,3.85,.12,1,.12)}return X(n,`box`,3817287,0,1.12,J_,1.5,.18,1.3),n.build()}var Q_=[15087942,1933270,2792847,16032353,7097014];function $_(e,t,n){let r=new zg,i=2830134;X(r,`box`,8028298,0,1.45,-5.85,2.5,.28,12.9),X(r,`box`,16762941,0,1.45,-5.85,2.52,.08,12.92),X(r,`box`,i,0,1.05,-5.85,1,.5,12.6);for(let e of[-1,1])X(r,`box`,14278114,e*1.2,.95,-5.2,.05,.3,5.2),X(r,`box`,15087942,e*.95,1.2,-12.32,.35,.22,.05),X(r,`box`,i,e*1.05,1.1,-9.2,.75,.12,2.6),X(r,`box`,i,e*.9,.6,-2,.18,1,.18);let a=n*9301+49297,o=()=>(a=(a*9301+49297)%233280)/233280,s=e===`container`?t>=.9?12.2:6.1:12.2*Math.min(1,.55+t*.5);if(e===`container`){let e=t>=.9?1:2;for(let t=0;t<e;t++)r.at(0,1.59,-.2-s/2-t*(s+.1)),L_(r,Q_[(n+t)%Q_.length],s),r.pop()}else if(e===`crates`){let e=Math.max(2,Math.round(s/1.9)),n=t>.9?3:2;for(let t=0;t<e;t++)for(let e=0;e<n-+(t%3==2);e++)for(let n of[-.62,.62])X(r,`box`,Y(13145434,(o()-.5)*.12),n,2.19+e*1.18,-1.15-t*1.9,1.15,1.15,1.7,(o()-.5)*.08),X(r,`box`,Y(13145434,-.18),n,2.19+e*1.18,-1.15-t*1.9,1.17,.12,1.72)}else if(e===`sacks`){let e=Math.max(2,Math.round(s/2.2));for(let n=0;n<e;n++){let e=-1.3-n*2.2;X(r,`box`,10251075,0,1.6700000000000002,e,2.3,.16,2);let i=t>.9?4:3;for(let t=0;t<i;t++)for(let n of[-.56,.56]){let i=1.9900000000000002+t*.46,a=(o()-.5)*.12;X(r,`box`,Y(15852486,(o()-.5)*.08),n,i,e,1.05,.42,1.75,a),X(r,`box`,14272418,n,i+.05,e-.55,1.07,.36,.08,a),X(r,`box`,4033086,n,i,e+.1,.5,.43,.5,a)}}}else if(e===`bricks`){let e=Math.max(2,Math.round(s/2.1));for(let n=0;n<e;n++){let e=-1.25-n*2.1;X(r,`box`,10251075,0,1.6700000000000002,e,2.3,.16,1.9);let i=t>.9?1.4:1.1;X(r,`box`,Y(11883067,(o()-.5)*.08),0,1.75+i/2,e,2.1,i,1.7);for(let t=1;t<4;t++)X(r,`box`,14206640,0,1.75+t*i/4,e,2.12,.05,1.72)}}else{let e=Math.max(2,Math.round(s/1.3));for(let t=0;t<e;t++)for(let e of[-.65,.65]){let n=(t+ +(e>0))%3==0?15087942:1933270;X(r,`cyl12`,n,e,2.34,-.8999999999999999-t*1.3,1.15,1.5,1.15),X(r,`cyl12`,Y(n,-.15),e,2.59,-.8999999999999999-t*1.3,1.18,.08,1.18)}}return r.build()}function ev(){let e=document.createElement(`canvas`);e.width=e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,4,32,32,32);return n.addColorStop(0,`rgba(0,0,0,0.55)`),n.addColorStop(.6,`rgba(0,0,0,0.3)`),n.addColorStop(1,`rgba(0,0,0,0)`),t.fillStyle=n,t.fillRect(0,0,64,64),d_(e)}function tv(e,t){let n=e/2,r=t/2;return Yg([-n,0,r,n,0,r,n,0,-r,-n,0,r,n,0,-r,-n,0,-r],[0,1,1,1,1,0,0,1,1,0,0,0],[0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0])}var nv={d:0,i:0,t:0,side:0},rv=[0,0,0,1],iv=new N,av=bg(),ov=bg(),sv=class{constructor(){this.x=0,this.z=0,this.y=0,this.h=0,this.vx=0,this.vz=0,this.speed=0,this.steerAngle=0,this.yawRate=0,this.pitch=0,this.roll=0,this.ax=0,this.az=0,this.ay=0,this.phi=0,this.swing=0,this.swingV=0,this.bounce=0,this.bounceV=0,this.offroad=!1,this.gateLocked=!0,this.vmax=G_[1],this.accel=K_[1],this.bumpTime=0,this.onBump=null,this.assist=!0,this.wheelSpin=0,this.bumpCooldown=0,this.root=new fm(`truck`),this.cabGroup=new fm(`cabGroup`),this.trailerGroup=new fm(`trailerGroup`),this.cabM=bg(),this.trailerM=bg(),this.level=1;let e=$g();this.cab=$(Jg(Z_(1)),e,`cab`),this.cabGroup.addChild(this.cab),this.trailer=$(Jg($_(`sacks`,.6,1)),e,`trailer`),this.trailerGroup.addChild(this.trailer);let t=new zg;X(t,`cyl12`,2237739,0,0,0,1.1,1,1.1,0,0,Math.PI/2),X(t,`cyl8`,14278114,0,0,0,.6,1.04,.6,0,0,Math.PI/2);let n=$(Jg(t.build()),e,`wheels`);this.wheelVB=new rr(Wg,lr.getDefaultInstancingFormat(Wg),10,{usage:1}),this.wheelData=new Float32Array(this.wheelVB.lock()),Xg(n).setInstancing(this.wheelVB);let r=a_({tex:ev(),transparent:!0,depthBias:-2});this.shadowT=$(tv(3.6,8.4),r,`shadowT`),this.shadowR=$(tv(3.6,14),r,`shadowR`),this.root.addChild(this.cabGroup),this.root.addChild(this.trailerGroup),this.root.addChild(n),this.root.addChild(this.shadowT),this.root.addChild(this.shadowR)}setLevel(e){e!==this.level&&(this.level=e,Zg(this.cab,Jg(Z_(e))),this.vmax=G_[kh(e,1,4)],this.accel=K_[kh(e,1,4)])}setCargo(e,t,n){Zg(this.trailer,Jg($_(e,t,n)))}place(e,t,n){this.x=e,this.z=t,this.h=n,this.vx=this.vz=this.speed=0,this.steerAngle=this.yawRate=0,this.swing=this.swingV=0;let r=Math.sin(n),i=Math.cos(n);this.ax=e+r*-11.1,this.az=t+i*-11.1,this.phi=n,this.y=cg(e,t),this.ay=cg(this.ax,this.az),this.bounce=this.bounceV=0,this.syncModel(0)}update(e,t){let n=Math.sin(this.h),r=Math.cos(this.h),i=-r,a=n,o=this.vx*n+this.vz*r,s=this.vx*i+this.vz*a,c=(cg(this.x+n*2.5,this.z+r*2.5)-cg(this.x-n*2.1,this.z-r*2.1))/4.6,l=rg.nearest(this.x,this.z,60,nv);this.offroad=!l||l.d>5.5;let u=0,d=t.gas,f=t.brake;d>0&&(u+=o<-.5?10*d:this.accel*d*(1-kh(o/this.vmax,0,1)**2.2)),f>0&&(u-=o>.5?11*f:3.2*f*(1-kh(-o/7,0,1)));let p=Math.sign(o),m=.3+.0016*o*o;d===0&&f===0&&(m+=.8),this.offroad&&(m+=1.6+.04*o*o),u-=9.8*c*.75;let h=o;o+=u*e;let g=m*e;Math.abs(o)<=g&&d===0&&f===0?o=0:o-=p*Math.min(g,Math.abs(o)),h>0&&o<0&&f===0&&(o=0),s*=Math.exp(-(this.offroad?4:7)*e);let _=t.steer;if(this.assist&&Math.abs(t.steer)<.05&&l&&!this.offroad&&Math.abs(o)>3){let e=l.i,t=Math.atan2(q[e+1]-q[e],J[e+1]-J[e]),n=Mh(this.h,t);Math.abs(n)>Math.PI/2&&(n=Mh(this.h,t+Math.PI)),_=kh(-n*1.4,-.35,.35)*Math.sign(o)}let v=.55/(1+Math.abs(o)*.085),y=_*v,b=Math.abs(y)<Math.abs(this.steerAngle)?3.2:2;this.steerAngle+=kh(y-this.steerAngle,-b*e,b*e);let x=-o/q_*Math.tan(this.steerAngle),S=(x-this.yawRate)/e;this.yawRate=x,this.h+=x*e,this.vx=n*o+i*s,this.vz=r*o+a*s,this.x+=this.vx*e,this.z+=this.vz*e,this.speed=o,this.bumpCooldown-=e;let C=rg.nearest(this.x,this.z,60,nv);if(C){let e=C.i,t=ng[e]?Nh-1.3:15;if(C.d>t){let n=q[e]+(q[e+1]-q[e])*C.t,r=J[e]+(J[e+1]-J[e])*C.t,i=(this.x-n)/C.d,a=(this.z-r)/C.d;this.x=n+i*t,this.z=r+a*t;let o=this.vx*i+this.vz*a;o>0&&(this.vx-=i*o*1.3,this.vz-=a*o*1.3,this.bump(o))}let n=$h.ridge;if(this.gateLocked&&e>=n.o&&e<n.o+n.n-1){let t=tg[e]+(tg[e+1]-tg[e])*C.t;if(t>143){let n=t-143,r=q[e+1]-q[e],i=J[e+1]-J[e],a=Math.hypot(r,i)||1;this.x-=r/a*n,this.z-=i/a*n;let o=(this.vx*r+this.vz*i)/a;o>0&&(this.vx-=r/a*o*1.4,this.vz-=i/a*o*1.4,this.bump(o))}}}let w=cg(this.x,this.z),T=w-this.y;this.y=w,this.bounceV+=(-60*this.bounce-7*this.bounceV-T*30)*e,this.bounce=kh(this.bounce+this.bounceV*e,-.25,.25),this.pitch+=(Math.atan(c)-this.pitch)*Math.min(1,e*10);let E=o*x;this.roll+=(kh(E*.012,-.07,.07)-this.roll)*Math.min(1,e*5);let D=this.x+Math.sin(this.h)*J_,O=this.z+Math.cos(this.h)*J_,ee=D-this.ax,te=O-this.az,ne=Math.hypot(ee,te)||1;this.ax=D-ee/ne*Y_,this.az=O-te/ne*Y_,this.phi=Math.atan2(D-this.ax,O-this.az);let re=Mh(this.h,this.phi);Math.abs(re)>1.1&&(this.phi=this.h+Math.sign(re)*1.1,this.ax=D-Math.sin(this.phi)*Y_,this.az=O-Math.cos(this.phi)*Y_),ee=D-this.ax,te=O-this.az,ne=Math.hypot(ee,te),this.swingV+=(-22*this.swing-3.4*this.swingV+kh(S,-4,4)*.05)*e,this.swing=kh(this.swing+this.swingV*e,-.07,.07),this.ay=cg(this.ax,this.az),this.wheelSpin+=o*e/.55}bump(e){e>1.5&&this.bumpCooldown<=0?(this.vx*=.6,this.vz*=.6,this.bounceV+=1.2,this.bumpTime=.35,this.bumpCooldown=.5,this.onBump?.(kh(e/8,.3,1))):(this.vx*=.985,this.vz*=.985)}hitCar(e){this.vx*=.5,this.vz*=.5,this.bounceV+=1,this.bumpTime=.4,this.onBump?.(kh(e/8,.4,1))}syncModel(e){this.bumpTime=Math.max(0,this.bumpTime-e),Sg(-this.pitch,this.h,this.roll,rv);let t=this.y+this.bounce;this.cabGroup.setLocalPosition(this.x,t,this.z),this.cabGroup.setLocalRotation(iv.set(rv[0],rv[1],rv[2],rv[3])),wg(this.cabM,this.x,t,this.z,rv,1,1,1);let n=this.x+Math.sin(this.h)*J_,r=this.z+Math.cos(this.h)*J_,i=this.y+Math.sin(this.pitch)*J_+.02,a=this.phi+this.swing;Sg(Math.atan2(this.ay-this.y,Y_),a,this.roll*.6,rv);let o=i+this.bounce*.5;this.trailerGroup.setLocalPosition(n,o,r),this.trailerGroup.setLocalRotation(iv.set(rv[0],rv[1],rv[2],rv[3])),wg(this.trailerM,n,o,r,rv,1,1,1);let s=this.wheelSpin,c=this.wheelData,l=(e,t,n,r,i,a,o,l)=>{Sg(s,o,0,rv),wg(av,n,r,i,rv,a,l/.55,l/.55),xg(ov,t,av);for(let t=0;t<16;t++)c[e*16+t]=ov[t]},u=-this.steerAngle;l(0,this.cabM,1.08,.55,2.5,.42,u,.55),l(1,this.cabM,-1.08,.55,2.5,.42,u,.55),l(2,this.cabM,1.02,.55,-1.4,.7,0,.55),l(3,this.cabM,-1.02,.55,-1.4,.7,0,.55),l(4,this.cabM,1.02,.55,-2.7,.7,0,.55),l(5,this.cabM,-1.02,.55,-2.7,.7,0,.55),l(6,this.trailerM,1.02,.5,-8.55,.7,0,.52),l(7,this.trailerM,-1.02,.5,-8.55,.7,0,.52),l(8,this.trailerM,1.02,.5,-9.85,.7,0,.52),l(9,this.trailerM,-1.02,.5,-9.85,.7,0,.52),this.wheelVB.unlock(),this.shadowT.setLocalPosition(this.x+Math.sin(this.h)*.4,this.y+.1,this.z+Math.cos(this.h)*.4),this.shadowT.setLocalEulerAngles(0,this.h*180/Math.PI,0);let d=(n+this.ax)/2-Math.sin(this.phi)*1.6,f=(r+this.az)/2-Math.cos(this.phi)*1.6;this.shadowR.setLocalPosition(d,(i+this.ay)/2+.12,f),this.shadowR.setLocalEulerAngles(0,this.phi*180/Math.PI,0)}stackTop(e,t){let n=this.level>=3?5.6:5;return cv(this.cabM,e*1.2,n,-.25,t)}rearWheel(e,t){return cv(this.trailerM,e*1.1,.2,-9.2,t)}};function cv(e,t,n,r,i){return i.x=e[0]*t+e[4]*n+e[8]*r+e[12],i.y=e[1]*t+e[5]*n+e[9]*r+e[13],i.z=e[2]*t+e[6]*n+e[10]*r+e[14],i}var lv={garage:{x:-27,z:50,top:[8,8,9,11,13]},warehouse:{x:27,z:50,top:[8,8,10,12,16]},fuel:{x:0,z:74,top:[4,7,8,11,12]}};function uv(e,t){let n=[10466504,10466504,12109782,13621731,15133938][t],r=[2832981,2832981,2832981,1911364,1911364][t],i=t>=3?3:t>=2?2:1,a=i*8+4,o=t>=3?8:t>=2?7:6,s=t>=3?14:12;Z(e,9278363,0,0,0,a+2,.3,s+5),Z(e,n,0,.3,-1,a,o,s),Z(e,r,0,.3+o,-1,a+.8,.6,s+.8);for(let t=0;t<i;t++){let n=-a/2+2+4+t*8;X(e,`box`,13225686,n,.3+2.4,s/2-.95,6.4,4.8,.2);for(let t=0;t<6;t++)X(e,`box`,10133931,n,.8+t*.8,s/2-.82,6.4,.08,.1);X(e,`box`,16762941,n,.3+5.1,s/2-.85,6.8,.25,.15)}if(t>=2){Z(e,15764004,0,.3+o-1.1,s/2-.95,a,.5,.14);for(let t=0;t<2;t++)X(e,`cyl8`,10133931,-a/4+a/2*t,.3+o+1,-2,1.2,1.4,1.2);for(let t=0;t<4;t++)X(e,`cyl12`,2237739,a/2+1.8,.35+t*.5,s/2-1,1.6,.45,1.6)}if(t>=3){Z(e,16777215,-a/2-3.5,.3,-2,7,9.5,9);for(let t=0;t<2;t++)X(e,`box`,6061987,-a/2-3.5,3+t*3.8,2.55,5,1.8,.12);Z(e,4212303,-5,.3+o+.6,-3,.4,3,.4),Z(e,4212303,5,.3+o+.6,-3,.4,3,.4),Z(e,16762941,0,.3+o+2.4,-3,13,2.6,.4),Z(e,15087942,0,.3+o+2.9,-2.75,11.5,.7,.1),Z(e,14540253,a/2+2,0,-6,.25,13,.25),X(e,`box`,15087942,a/2+3.4,12,-6,2.6,1.6,.08)}t>=4&&(Z(e,10477813,a/2+5,.3,1,8,5.5,9),Z(e,16762941,a/2+5,5.8,1,8.4,.5,9.4),X(e,`sphere`,15330543,-a/2-3.5,11.2,-2,2.4,1,2.4,0,.6),Z(e,16762941,0,.3+o,s/2-.5,a+.8,.3,.3))}function dv(e,t){if(t<=1){Z(e,9278363,0,0,0,16,.3,16),H_(e,12,10,5,11565647,8014640),X(e,`box`,8014640,0,2.2,5.05,5,4.2,.2),e.at(0,0,7),W_(e,pv(t),3),e.pop();return}let n=t>=3?24:18,r=t>=4?11:t>=3?9:7,i=t>=3?14:12,a=t>=3?7315400:8366281;Z(e,9278363,0,0,0,n+4,.3,i+8),Z(e,a,0,.3,-2,n,r,i);for(let t=0;t<=n/1.5;t++)X(e,`box`,Y(a,-.08),-n/2+t*1.5,.3+r/2,i/2-1.95,.25,r,.12);X(e,`prism`,15330543,0,.3+r,-2,n+1,2.2,i+1);let o=t>=3?2:1;for(let t=0;t<o;t++){let r=o===1?0:-n/4+n/2*t;X(e,`box`,3885658,r,2.9,i/2-1.9,5,4.4,.2),Z(e,10133671,r,.3,i/2+.5,6,1.2,3),Z(e,16762941,r,1.5,i/2+2,6,.08,.2)}let s=pv(t);for(let r=0;r<(t>=3?12:6);r++){let t=1.3;X(e,`box`,Y(13145434,(s()-.5)*.1),n/2+2+r%2*1.4,.95+Math.floor(r/6)*t,-i/2+2+(r>>1)%3*1.5,t,t,t)}if(t>=3){Z(e,16762941,-n/2-3,.3,6,1.6,1.4,2.4),Z(e,2830134,-n/2-3,1.7,5.6,1.4,1.4,.1),Z(e,2830134,-n/2-3,.3,7.5,.1,3.2,.1);for(let t=0;t<3;t++)Z(e,12174538,-n/3+n/3*t,.3+r+1,-6,2,1.2,2)}if(t>=4){for(let t of[-n/2-8,n/2+8])Z(e,15087942,t,.3,-i-4,.8,12,.8),Z(e,15087942,t,.3,-i+8,.8,12,.8),Ug(e,15087942,t,12.3,-i-4,t,12.3,-i+8,.8);Ug(e,15087942,-n/2-8,12.6,-i+2,n/2+8,12.6,-i+2,1.2),e.at(-n/2+2,.3,-i-6),R_(e,s,6,1,2),e.pop(),e.at(n/2+4,.3,-2),N_(e),e.pop()}}function fv(e,t){if(t===0){Z(e,13218954,0,0,0,18,.25,14);for(let[t,n]of[[-9,-7],[9,-7],[-9,7],[9,7]])Z(e,16762941,t,0,n,.3,1.2,.3);for(let[t,n,r,i]of[[-9,-7,9,-7],[9,-7,9,7],[9,7,-9,7],[-9,7,-9,-7]])Ug(e,15087942,t,1,n,r,1,i,.08);Z(e,4212303,6,0,8.5,.2,2.2,.2),X(e,`box`,16777215,6,2.6,8.5,2.6,1.4,.1),X(e,`box`,2792779,6,2.6,8.56,2.2,1,.05);return}let n=Math.min(3,t),r=t>=3?18:t>=2?14:10,i=t>=3?9:t>=2?8:7;Z(e,12172997,0,0,0,r+8,.3,i+8);for(let t=0;t<n;t++){let i=n===1?0:-r/2+3+t*(r-6)/(n-1);Z(e,10133671,i,.3,0,1.6,.3,3.6),Z(e,15087942,i,.6,0,1,2,1.2),X(e,`box`,16777215,i,2.1,.62,.8,.5,.05)}for(let t of[-r/2+1,r/2-1])for(let n of[-i/2+1,i/2-1])Z(e,15658734,t,.3,n,.5,5.2,.5);Z(e,16777215,0,5.5,0,r,.8,i),Z(e,15087942,0,5.5,0,r+.2,.35,i+.2),t>=2&&Z(e,16762941,0,6.3,0,r+.2,.18,i+.2);let a=t>=3?11:t>=2?7:4;if(Z(e,16183783,0,.3,-i/2-4,a,t>=3?4.5:3.2,4),X(e,`box`,6061987,0,1.8,-i/2-1.95,a*.7,1.4,.1),Z(e,15087942,0,t>=3?4.8:3.5,-i/2-4,a+.4,.4,4.4),t>=2){let n=t>=3?10:7;Z(e,4212303,r/2+2.5,.3,3,.5,n,.5),Z(e,16762941,r/2+2.5,.3+n-1,3,3.2,2.6,.5),Z(e,15087942,r/2+2.5,.3+n-.3,3.1,2.8,.8,.5)}if(t>=3&&X(e,`cyl12`,2792779,-r/2-2.5,1.6,2,3.4,2.6,3.4,0,0,Math.PI/2),t>=4){Z(e,15330543,-r/2-6,.3,-2,6,5,8);for(let t of[-4,0])X(e,`cyl8`,1933270,-r/2-6,2.6,t,1.5,4.2,1.5);for(let t=0;t<10;t++)X(e,`cone5`,[15087942,16762941,1933270][t%3],-r/2+r/9*t,6.9,i/2+.3,.6,.8,.1,0,0,Math.PI)}}function pv(e){let t=1234+e*77;return()=>(t=(t*9301+49297)%233280)/233280}function mv(e,t,n,r){let i=15764004,a=Math.max(2,Math.round(t/4)),o=Math.max(2,Math.round(n/4));for(let o=0;o<=a;o++)for(let s of[-n/2,n/2])Z(e,i,-t/2+o*t/a,0,s,.2,r,.2);for(let a=1;a<o;a++)for(let s of[-t/2,t/2])Z(e,i,s,0,-n/2+a*n/o,.2,r,.2);for(let i=2;i<r;i+=2.5)for(let r of[-n/2,n/2])X(e,`box`,13145434,0,i,r,t+.4,.15,.8);for(let i=2;i<r;i+=2.5)for(let r of[-t/2,t/2])X(e,`box`,13145434,r,i,0,.8,.15,n+.4);Z(e,16762941,t/2+2,0,n/2+2,.8,r+6,.8),Ug(e,16762941,t/2+2,r+6,n/2+2,-t/4,r+6,n/2+2,.6),Ug(e,3355443,-t/4+1,r+6,n/2+2,-t/4+1,r+1.5,n/2+2,.08)}var hv={garage:[30,18],warehouse:[28,20],fuel:[22,18]},gv=class{constructor(e){this.group=new fm(`base`),this.meshes={},this.scaffolds={},this.pops=[],this.y=zh(`depot`);for(let t of Object.keys(lv)){let n=$(this.geometry(t,e[t]),$g(),t);n.setLocalPosition(lv[t].x,this.y+.1,lv[t].z),this.meshes[t]=n,this.scaffolds[t]=null,this.group.addChild(n)}}geometry(e,t){let n=new zg;return e===`garage`?uv(n,t):e===`warehouse`?dv(n,t):fv(n,t),Jg(n.build())}setLevel(e,t,n){Zg(this.meshes[e],this.geometry(e,t)),n&&this.pops.push({id:e,t:0})}setBuilding(e){for(let t of Object.keys(lv)){let n=t===e,r=this.scaffolds[t];if(n&&!r){let e=new zg,[n,r]=hv[t];mv(e,n,r,lv[t].top[4]*.8);let i=$(Jg(e.build()),$g(),`scaffold`);i.setLocalPosition(lv[t].x,this.y+.1,lv[t].z),this.group.addChild(i),this.scaffolds[t]=i}else!n&&r&&(r.destroy(),this.scaffolds[t]=null)}}anchor(e,t,n){let r=lv[e];return n.x=r.x,n.y=this.y+r.top[Math.min(4,t)]+3,n.z=r.z,n}update(e){for(let t of this.pops){t.t+=e;let n=this.meshes[t.id],r=Math.min(1,t.t/.7),i=1+Math.sin(r*Math.PI*2.5)*(1-r)*.25;n.setLocalScale(1/Math.sqrt(i),r<.15?.3+r*4:i,1/Math.sqrt(i))}this.pops=this.pops.filter(e=>e.t>=.7?(this.meshes[e.id].setLocalScale(1,1,1),!1):!0)}},_v=16,vv=256,yv=vv/_v,bv=(wh.x1-wh.x0)/_v,xv=(wh.z1-wh.z0)/_v,Sv=bv/yv,Cv=xv/yv,wv=(e,t,n)=>({x:e,y:t,z:n});function Tv(e,t,n,r,i){let a=n.x-t.x,o=n.z-t.z,s=r.x-t.x,c=r.z-t.z;o*s-a*c>=0?e.tri(t.x,t.y,t.z,n.x,n.y,n.z,r.x,r.y,r.z,i):e.tri(t.x,t.y,t.z,r.x,r.y,r.z,n.x,n.y,n.z,i)}function Ev(e,t,n,r,i,a){Tv(e,t,n,r,a),Tv(e,t,r,i,a)}var Dv=[15320170,9289550,10974271,15848058,10275930],Ov=vh.farm,kv={r:0,g:0,b:0};function Av(e,t,n,r,i){let a,o=Dh(e/90,t/90);if(n<-1.4)a=12758652;else if(n<-1.2+1.4&&(e>1380||Kh(e,t,60)<55))a=15259292;else if(n>118+o*25)a=15988472;else if(r<.74)a=n>60?9341574:10326659;else if(n>80)a=o>.5?9412716:10263176;else{let n=Math.hypot(e-Ov.x,t-Ov.z);if(n>55&&n<260&&Dh(e/70+4,t/70)>.38&&rg.nearest(e,t,26)===null){let n=e*.8+t*.6;a=Dv[(Math.floor(n/13)%Dv.length+Dv.length)%Dv.length]}else a=o>.72?10929754:o>.42?7518543:6466374;for(let n of[`farm`,`mill`]){let r=vh[n];Math.hypot(e-r.x,t-r.z)<r.r*.75&&(a=13482380)}}return hg(a,kv),_g(kv,i)}function jv(e,t){let n=e/2,r=t/2;return{p:[-n,-r,0,n,-r,0,n,r,0,-n,-r,0,n,r,0,-n,r,0],uv:[0,1,1,1,1,0,0,1,1,0,0,0]}}var Mv=class{constructor(){this.group=new fm(`world`),this.sky=new fm(`sky`),this.chunks=[],this.windmill=new fm(`windmill`),this.gateArm=new fm(`gateArm`),this.gateOpen=0,this.gateTarget=0,this.time=0,this.gateSign=null;let e=$g(),t=[];for(let e=0;e<Sv*Cv;e++)t.push(new zg);let n=(e,n)=>{let r=kh(Math.floor((e-wh.x0)/vv),0,Sv-1),i=kh(Math.floor((n-wh.z0)/vv),0,Cv-1);return t[i*Sv+r]};this.buildTerrain(t),this.buildRoads(n);let r=ug(`ridge`,150);this.gate={x:r.x,z:r.z,y:r.y,h:r.h},this.buildPlaces(n),this.scatter(n);for(let n of t){if(n.empty)continue;let t=Jg(n.build()),r=$(t,e,`chunk`);this.group.addChild(r);let i=t.aabb;this.chunks.push({mi:Xg(r),x:i.center.x,z:i.center.z,r:i.halfExtents.length()})}let i=3500,a=$(Yg([-3500,0,-3500,-3500,0,i,i,0,i,-3500,0,-3500,i,0,i,i,0,-3500],void 0,[0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0]),e_(3843804),`water`);a.setLocalPosition(400,Ph,-800),this.group.addChild(a),this.buildDynamic(),this.buildSky()}buildTerrain(e){let t=new Float32Array((bv+1)*(xv+1));for(let e=0;e<=xv;e++)for(let n=0;n<=bv;n++)t[e*(bv+1)+n]=og(wh.x0+n*_v,wh.z0+e*_v);let n=(e,n)=>t[n*(bv+1)+e],r=jh(7);for(let t=0;t<xv;t++)for(let i=0;i<bv;i++){let a=e[Math.floor(t/yv)*Sv+Math.floor(i/yv)],o=wh.x0+i*_v,s=wh.z0+t*_v,c=o+_v,l=s+_v,u=[[o,n(i,t),s,o,n(i,t+1),l,c,n(i+1,t),s],[c,n(i+1,t),s,o,n(i,t+1),l,c,n(i+1,t+1),l]];for(let e of u){let t=e[3]-e[0],n=e[4]-e[1],i=e[5]-e[2],o=e[6]-e[0],s=e[7]-e[1],c=e[8]-e[2],l=n*c-i*s,u=i*o-t*c,d=t*s-n*o,f=u/(Math.hypot(l,u,d)||1),p=(e[0]+e[3]+e[6])/3,m=(e[1]+e[4]+e[7])/3,h=(e[2]+e[5]+e[8])/3;a.tri(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],Av(p,h,m,f,(r()-.5)*.035))}}}buildRoads(e){let t=yg(5791078),n=yg(10133157),r=yg(12166783),i=yg(16053488),a=yg(16762941),o=Nh,s=q.length,c=new Float32Array(s),l=new Float32Array(s);for(let e=0;e<s;e++){let t=e>0&&rg.group[e-1]===rg.group[e]?e-1:e,n=e<s-1&&rg.group[e+1]===rg.group[e]?e+1:e,r=q[n]-q[t],i=J[n]-J[t],a=Math.hypot(r,i)||1;r/=a,i/=a,c[e]=-i,l[e]=r}let u=(e,t,n)=>wv(q[e]+c[e]*t,eg[e]+n,J[e]+l[e]*t);for(let c=0;c<s-1;c++){if(rg.group[c]!==rg.group[c+1])continue;let s=e((q[c]+q[c+1])/2,(J[c]+J[c+1])/2),l=ng[c]||ng[c+1];if(Ev(s,u(c,-o,.06),u(c+1,-o,.06),u(c+1,o,.06),u(c,o,.06),l?n:t),l)for(let e of[-1,1]){Ev(s,u(c,e*o,.06),u(c+1,e*o,.06),u(c+1,e*(o+.6),.06),u(c,e*(o+.6),.06),n);let t=u(c,e*(o+.35),0),r=u(c+1,e*(o+.35),0);Ug(s,14042420,t.x,t.y+.7,t.z,r.x,r.y+.7,r.z,.5,1.3),Ug(s,8159367,t.x,t.y-.8,t.z,r.x,r.y-.8,r.z,1.2,1.6)}else for(let e of[-1,1])Ev(s,u(c,e*o,.06),u(c+1,e*o,.06),u(c+1,e*(o+2.4),-.6),u(c,e*(o+2.4),-.6),r);for(let e of[-1,1])Ev(s,u(c,e*(o-.45),.08),u(c+1,e*(o-.45),.08),u(c+1,e*(o-.2),.08),u(c,e*(o-.2),.08),i);c%3==0&&Ev(s,u(c,-.15,.085),u(c+1,-.15,.085),u(c+1,.15,.085),u(c,.15,.085),a)}let d=0;for(;d<s;){if(!ng[d]){d++;continue}let t=d;for(;t+1<s&&ng[t+1]&&rg.group[t+1]===rg.group[d];)t++;let n=e(q[d+t>>1],J[d+t>>1]),r=t-d;for(let e=d;e<=t;e+=4){let t=og(q[e],J[e]);eg[e]-t>2&&X(n,`cyl8`,9146518,q[e],(eg[e]-1.4+t-1)/2,J[e],2.2,eg[e]-1.4-t+1,2.2)}for(let e of[-1,1]){let i=null;for(let a=d;a<=t;a++){let t=(a-d)/Math.max(1,r),s=u(a,e*(o+.35),1.3+Math.sin(Math.PI*t)*9);if(i&&Ug(n,14042420,i.x,i.y,i.z,s.x,s.y,s.z,.6,.8),(a-d)%3==0&&t>.05&&t<.95){let t=u(a,e*(o+.35),1.3);Ug(n,16053488,t.x,t.y,t.z,s.x,s.y,s.z,.18)}i=s}}for(let e=d+Math.floor(r*.3);e<=d+Math.ceil(r*.7);e+=4){let t=(e-d)/Math.max(1,r),i=1.3+Math.sin(Math.PI*t)*9,a=u(e,-(o+.35),i),s=u(e,o+.35,i);Ug(n,14042420,a.x,a.y,a.z,s.x,s.y,s.z,.4)}d=t+1}let f=e(yh.x,yh.z),p=og(yh.x,yh.z)+.45;X(f,`cyl12`,t,yh.x,p+.1-.5,yh.z,32,1,32)}buildPlaces(e){let t=jh(42);{let n=vh.depot,r=zh(`depot`),i=e(n.x,n.z);Z(i,6975352,0,r-.3,39,100,.45,100),Z(i,11580861,0,r-.3,39,102,.4,102),Z(i,10133672,0,r-.29,64,100,.47,50);for(let e=-2;e<=2;e++)X(i,`box`,16053488,e*7,r+.17,4,.3,.05,14);for(let[e,t,n,a]of[[-51,-12,-12,-12],[12,-12,51,-12],[-51,-12,-51,90],[51,-12,51,90],[-51,90,51,90]])i.at((e+n)/2,r,(t+a)/2,Math.atan2(n-e,a-t)+Math.PI/2),F_(i,Math.hypot(n-e,a-t)),i.pop();Z(i,1911364,-11,r,-12,1.2,9,1.2),Z(i,1911364,11,r,-12,1.2,9,1.2),Z(i,16762941,0,r+8.4,-12,23.5,.8,1.2),i.at(-38,r,6,Math.PI/2),H_(i,14,10,5,15331831,2845872),X(i,`box`,6061987,0,2.6,5.05,9,1.6,.12),i.pop(),Z(i,14540253,-38,r,-6,.3,14,.3),X(i,`box`,16762941,-36.4,r+12.6,-6,3,1.8,.1);for(let[e,t]of[[-48,-8],[48,-8],[-48,87],[48,87]])Z(i,4212303,e,r,t,.35,8,.35),Z(i,16774064,e,r+8,t,1.2,.5,1.2);i.at(38,r,6,0),W_(i,t,8),i.pop()}{let n=vh.farm,r=zh(`farm`),i=e(n.x,n.z);i.at(n.x-56,r,n.z+4,Math.PI/2),M_(i),i.pop(),i.at(n.x-62,r,n.z+36),N_(i),i.pop(),i.at(n.x-50,r,n.z+52),N_(i),i.pop();for(let e=0;e<7;e++)i.at(n.x-30+t()*20,r,n.z+30+t()*20,t()*3),P_(i),i.pop();i.at(n.x+46,r,n.z-60),X(i,`cyl8`,15852486,0,7,0,5,14,5),X(i,`cone8`,10239795,0,15.6,0,6,3.4,6),i.pop();for(let e=0;e<6;e++){let t=-.6+e*.5;rg.nearest(n.x+Math.cos(t)*95-60,n.z+Math.sin(t)*95+60,36)||(i.at(n.x+Math.cos(t)*95-60,og(n.x+Math.cos(t)*95-60,n.z+Math.sin(t)*95+60),n.z+Math.sin(t)*95+60,t),F_(i,30),i.pop())}}{let n=vh.town,r=zh(`town`),i=e(n.x,n.z);X(i,`cyl12`,14274493,n.x,r-.3,n.z,64,.9,64),X(i,`cyl12`,13221029,n.x,r-.25,n.z,66,.9,66),X(i,`cyl12`,12568268,n.x+20,r+.6,n.z-18,7,1.2,7),X(i,`cyl12`,6800366,n.x+20,r+1.1,n.z-18,6,.3,6),X(i,`cyl8`,12568268,n.x+20,r+2.2,n.z-18,.8,2.4,.8),i.at(n.x+40,r,n.z-40,.6),j_(i),i.pop();let a=0;for(let e=0;e<90&&a<30;e++){let e=t()*Math.PI*2,r=44+t()*80,o=n.x+Math.cos(e)*r,s=n.z+Math.sin(e)*r;rg.nearest(o,s,26)||Math.hypot(o-(n.x+40),s-(n.z-40))<16||(i.at(o,og(o,s),s,Math.atan2(n.x-o,n.z-s)+(t()-.5)*.3),r<62?A_(i,t):k_(i,t,t()<.25),i.pop(),a++)}}for(let[n,r,i,a]of[[`town`,$h.town.len-380,$h.town.len-140,34],[`farm`,260,520,90],[`port`,700,1100,120]]){let o=r,s=0;for(;o<i;){let r=ug(n,o),i=s%2?1:-1,c=27+t()*8,l=r.x+Math.cos(r.h)*c*i,u=r.z-Math.sin(r.h)*c*i;if(!rg.nearest(l,u,24)){let n=e(l,u);n.at(l,og(l,u),u,r.h+(i>0?-Math.PI/2:Math.PI/2)),k_(n,t),n.pop()}o+=a*(.8+t()*.4),s++}}{let n=vh.port,r=zh(`port`),i=e(n.x,n.z);Z(i,12041410,n.x+35,-9,n.z,70,r+9-.2,170),Z(i,10133671,n.x+35,r-.25,n.z,71,.3,171),Z(i,16762941,n.x+70.2,r+.05,n.z,.6,.3,170);for(let e of[-38,30])i.at(n.x+62,r,n.z+e,Math.PI/2),z_(i,e<0?16762941:15087942),i.pop();i.at(n.x+86,0,n.z-4),B_(i),i.pop(),i.at(n.x+20,r,n.z+44,0),R_(i,t,5,2,3),i.pop(),i.at(n.x+20,r,n.z-80,0),R_(i,t,5,2,3),i.pop(),i.at(n.x-40,r,n.z-50,.1),H_(i,30,18,9,4029641,15330543),i.pop();let a=n.x+120,o=n.z-150;X(i,`dode`,9341574,a,-4,o,22,14,20,.4),i.at(a,2.5,o),V_(i),i.pop()}{let n=vh.mill,r=zh(`mill`),i=e(n.x,n.z);i.at(n.x-40,r,n.z-36,.3),H_(i,26,16,8,10251075,5982778),Z(i,7039851,10,0,0,3,14,3),i.pop();for(let[e,a,o]of[[36,-34,.2],[-44,20,1.3],[30,36,-.4]])i.at(n.x+e,r,n.z+a,o),U_(i,t),i.pop()}{let t=this.gate,n=e(t.x,t.z),r=Math.cos(t.h),i=-Math.sin(t.h);for(let e of[-1,1]){let a=t.x+r*e*(Nh+1.2),o=t.z+i*e*(Nh+1.2);Z(n,1911364,a,t.y,o,1,3.2,1,t.h);for(let a=0;a<3;a++){let o=Nh+3+a*2.4;Z(n,a%2?15087942:16777215,t.x+r*e*o,t.y-.3,t.z+i*e*o,2,1.2,1.2,t.h)}}}}scatter(e){let t=jh(1234),n=Object.values(vh);for(let r=wh.z0+8;r<wh.z1-8;r+=22)for(let i=wh.x0+8;i<wh.x1-8;i+=22){let a=i+(t()-.5)*22*.9,o=r+(t()-.5)*22*.9,s=t(),c=t(),l=.8+t()*.6,u=rg.nearest(a,o,120),d=u?u.d:120;if(d<21)continue;let f=!1;for(let e of n)Math.hypot(a-e.x,o-e.z)<e.r+12&&(f=!0);if(f||Math.hypot(a-this.gate.x,o-this.gate.z)<25)continue;let p=og(a,o);if(p<0||p>125)continue;let m=Dh(a/280+20,o/280-3),h=Math.hypot(a-Ov.x,o-Ov.z);if(h<270&&h>55&&Dh(a/70+4,o/70)>.38)continue;let g=p>32||o<-1150,_=.05+.6*Oh(.42,.72,m)+(g?.25:0);if(d>260&&(_*=.6),d<40&&(_+=.12),s>_){if(s>.985){let n=e(a,o);n.at(a,p,o,0,l),O_(n,t,1+t()),n.pop()}else if(s>.93&&d<80){let n=e(a,o);n.at(a,p,o,0,l),D_(n,t),n.pop()}continue}let v=e(a,o),y=l*(d>260?1.5:1);v.at(a,p-.1,o,t()*6,y),g||c<.3?T_(v,t):E_(v,t),v.pop()}}buildDynamic(){let e=$g();{let t=vh.farm,n=zh(`farm`),r=new zg;for(let e=0;e<4;e++){let t=e*Math.PI/2;X(r,`box`,16053488,Math.cos(t)*5,Math.sin(t)*5,0,10,1.6,.2,0,0,t),X(r,`box`,10239795,Math.cos(t)*9,Math.sin(t)*9,.12,2.2,1.7,.1,0,0,t)}X(r,`cyl8`,7023140,0,0,0,1.4,1,1.4,0,Math.PI/2),this.windmill.addChild($(Jg(r.build()),e,`blades`)),this.windmill.setLocalPosition(t.x+46,n+13,t.z-60+2.8),this.group.addChild(this.windmill)}{let t=this.gate,n=new zg,r=Nh*2+2;for(let e=0;e<6;e++)X(n,`box`,e%2?16777215:15087942,(e+.5)*(r/6),0,0,r/6,.5,.3);X(n,`box`,1911364,0,0,0,1.2,1.2,1.2),this.gateArm.addChild($(Jg(n.build()),e,`arm`));let i=Math.cos(t.h),a=-Math.sin(t.h);this.gateArm.setLocalPosition(t.x-i*(Nh+1.2),t.y+2.6,t.z-a*(Nh+1.2)),this.group.addChild(this.gateArm);let o=jv(10,5),s=$(Yg(o.p,o.uv),a_({tex:Nv([`PINE RIDGE`,`OPENS AT BASE LV 3`],`#1d2a44`,`#ffc83d`)}),`gateSign`),c=t.x+i*(Nh+7)-Math.sin(t.h)*3,l=t.z+a*(Nh+7)-Math.cos(t.h)*3;s.setLocalPosition(c,t.y+4.2,l),s.setLocalEulerAngles(0,(t.h+Math.PI)*180/Math.PI,0),this.gateSign=s,this.group.addChild(s);let u=new zg;Z(u,4212303,0,-4.2,0,.4,3,.4),s.addChild($(Jg(u.build()),e,`post`))}{let e=zh(`depot`),t=a_({tex:Nv([`TRUCKSTEAD DEPOT`],`#1d2a44`,`#ffffff`)}),n=jv(20,3.4),r=Yg(n.p,n.uv);for(let n of[0,Math.PI]){let i=$(r,t,`depotSign`);i.setLocalPosition(0,e+10.5,-12+(n?-.62:.62)),i.setLocalEulerAngles(0,n*180/Math.PI,0),this.group.addChild(i)}}}setGateOpen(e,t=!1){if(this.gateTarget=+!!e,t&&(this.gateOpen=this.gateTarget),e&&this.gateSign){let e=Xg(this.gateSign).material,t=e.getParameter(`uTex`)?.data;e.setParameter(`uTex`,Nv([`PINE RIDGE`,`NOW OPEN!`],`#2a9d4b`,`#ffffff`)),t?.destroy()}}get gateIsOpen(){return this.gateOpen>.9}buildSky(){let e=[2];{let t=Fg(900,24,14,!0),n=new Float32Array(t.length),r=hg(4168680),i=hg(13954812);for(let e=0;e<t.length;e+=3){let a=Math.max(0,t[e+1]/900)**.55;n[e]=i.r+(r.r-i.r)*a,n[e+1]=i.g+(r.g-i.g)*a,n[e+2]=i.b+(r.b-i.b)*a}this.sky.addChild($(u_({p:t,n:t,c:n,count:t.length/3}),l_(!1,!1),`dome`,e))}let t=new zg,n=[];for(let e=0;e<=72;e++){let t=e/72*Math.PI*2,r=Math.max(0,Math.cos(t));n.push((50+120*Dh(e*.33,3)+70*Dh(e*1.1,9))*(1-.85*r**.7))}for(let e=0;e<72;e++){let r=e/72*Math.PI*2,i=(e+1)/72*Math.PI*2,a=(r+i)/2,o=n[e],s=n[e+1],c=Math.max(o,s)+25*Dh(e*2.7,1),l=wv(Math.cos(r)*860,-40,Math.sin(r)*860),u=wv(Math.cos(i)*860,-40,Math.sin(i)*860),d=wv(Math.cos(r)*860,o,Math.sin(r)*860),f=wv(Math.cos(i)*860,s,Math.sin(i)*860),p=wv(Math.cos(a)*840,c,Math.sin(a)*840),m=Y(9680073,(Dh(e,5)-.5)*.06);t.tri(l.x,l.y,l.z,u.x,u.y,u.z,f.x,f.y,f.z,m),t.tri(l.x,l.y,l.z,f.x,f.y,f.z,d.x,d.y,d.z,m),t.tri(d.x,d.y,d.z,f.x,f.y,f.z,p.x,p.y,p.z,c>150?yg(15003381):Y(8825023,.02))}this.sky.addChild($(u_(t.build()),l_(!0),`ring`,e));let r=new zg,i=jh(99);for(let e=0;e<16;e++){let e=i()*Math.PI*2,t=420+i()*340,n=170+i()*110;for(let a=0;a<4;a++){let o=30+i()*30;X(r,`ico`,a===0?16777215:15857402,Math.cos(e)*t+(i()-.5)*60,n+(i()-.5)*12,Math.sin(e)*t+(i()-.5)*60,o*1.6,o*.5,o,i()*3)}}this.clouds=$(u_(r.build()),l_(),`clouds`,e),this.sky.addChild(this.clouds)}update(e,t){this.time+=e,this.sky.setLocalPosition(t.x,0,t.z),this.clouds.setLocalEulerAngles(0,this.time*.004*180/Math.PI,0),this.windmill.setLocalEulerAngles(0,90/Math.PI,0),this.windmill.rotateLocal(0,0,this.time*.9*180/Math.PI),this.gateOpen!==this.gateTarget&&(this.gateOpen+=Math.sign(this.gateTarget-this.gateOpen)*Math.min(Math.abs(this.gateTarget-this.gateOpen),e*.7)),this.gateArm.setLocalEulerAngles(0,this.gate.h*180/Math.PI,0),this.gateArm.rotateLocal(0,0,this.gateOpen*180/2.2);for(let e of this.chunks){let n=e.x-t.x,r=e.z-t.z,i=760+e.r;e.mi.visible=n*n+r*r<i*i}}};function Nv(e,t,n){let r=document.createElement(`canvas`);r.width=512,r.height=e.length>1?256:88;let i=r.getContext(`2d`);return i.fillStyle=t,i.beginPath(),i.roundRect(4,4,r.width-8,r.height-8,22),i.fill(),i.lineWidth=8,i.strokeStyle=`#ffffff`,i.stroke(),i.fillStyle=n,i.textAlign=`center`,i.textBaseline=`middle`,e.forEach((t,n)=>{i.font=`${n===0?64:40}px "Lilita One", system-ui, sans-serif`;let a=e.length===1?r.height/2+2:80+n*90;i.fillText(t,r.width/2,a,r.width-40)}),d_(r,!1,!0,4)}var Pv={calls:0,tris:0,lastCalls:0,lastTris:0};function Fv(e,t){return e===4?t/3:e===5||e===6?Math.max(0,t-2):0}function Iv(){let e=WebGL2RenderingContext.prototype,t=(t,n)=>{let r=e[t];e[t]=function(...e){return n(e),r.apply(this,e)}};t(`drawArrays`,e=>{Pv.calls++,Pv.tris+=Fv(e[0],e[2])}),t(`drawElements`,e=>{Pv.calls++,Pv.tris+=Fv(e[0],e[1])}),t(`drawArraysInstanced`,e=>{Pv.calls++,Pv.tris+=Fv(e[0],e[2])*e[3]}),t(`drawElementsInstanced`,e=>{Pv.calls++,Pv.tris+=Fv(e[0],e[1])*e[4]})}function Lv(){Pv.lastCalls=Pv.calls,Pv.lastTris=Pv.tris,Pv.calls=0,Pv.tris=0}var Rv=(e,t)=>{let n=[...e].sort((e,t)=>e-t);return n.length?n[Math.min(n.length-1,Math.floor(t/100*n.length))]:0},zv=class{constructor(e,t){this.info=e,this.startupMs=t,this.gaps=[],this.works=[],this.t=0,this.started=performance.now(),this.el=document.createElement(`div`),this.el.style.cssText=`position:fixed;left:6px;top:50%;transform:translateY(-50%);z-index:60;background:rgba(10,16,30,.78);color:#e8f4ff;font:600 11px/1.35 ui-monospace,monospace;padding:6px 8px;border-radius:8px;pointer-events:auto;white-space:pre;max-width:46vw`,this.text=document.createElement(`div`);let n=document.createElement(`button`);n.textContent=`COPY REPORT`,n.style.cssText=`margin-top:5px;font:800 11px system-ui;padding:5px 8px;border-radius:6px;border:0;background:#ffc83d;color:#1d2a44`,n.addEventListener(`click`,e=>{e.stopPropagation();let t=this.report();navigator.clipboard?.writeText(t).then(()=>n.textContent=`COPIED ✓`,()=>window.prompt(`Copy:`,t))});let r=document.createElement(`button`);r.textContent=`RESET`,r.style.cssText=n.style.cssText+`;margin-left:6px;background:#8fd0ff`,r.addEventListener(`click`,e=>{e.stopPropagation(),this.gaps.length=0,this.works.length=0,this.started=performance.now()}),this.el.append(this.text,n,r),document.body.append(this.el)}frame(e,t){if(e>0&&e<1e3&&(this.gaps.push(e),this.works.push(t),this.gaps.length>3600&&(this.gaps.shift(),this.works.shift())),this.t+=e,this.t<500)return;this.t=0;let n=this.gaps.slice(-120),r=n.length?1e3/(n.reduce((e,t)=>e+t,0)/n.length):0,i=this.info();this.text.textContent=`${i.engine}  ${r.toFixed(0)} fps\nframe p50 ${Rv(n,50).toFixed(1)} p95 ${Rv(n,95).toFixed(1)} ms\njs+render ${Rv(this.works.slice(-120),50).toFixed(1)} ms\ncalls ${Pv.lastCalls}  tris ${(Pv.lastTris/1e3).toFixed(1)}k\n${i.w}x${i.h} @${i.pr}`+(i.heapMB?`  heap ${i.heapMB.toFixed(0)} MB`:``)}report(){let e=this.info(),t=this.gaps,n=t.length?100*t.filter(e=>e>20).length/t.length:0,r=this.startupMs();return[`Truckstead engine test: ${e.engine}`,`device: ${navigator.userAgent}`,`screen: ${e.w}x${e.h} css, render scale ${e.pr}, dpr ${window.devicePixelRatio}`,`startup to first frame: ${r?Math.round(r)+` ms`:`?`}`,`sample: ${t.length} frames over ${((performance.now()-this.started)/1e3).toFixed(0)} s, view ${e.mode}`,`fps avg: ${t.length?(1e3/(t.reduce((e,t)=>e+t,0)/t.length)).toFixed(1):`?`}`,`frame ms p50 ${Rv(t,50).toFixed(1)} / p95 ${Rv(t,95).toFixed(1)} / p99 ${Rv(t,99).toFixed(1)}; over 20 ms: ${n.toFixed(1)}%`,`js+render ms p50 ${Rv(this.works,50).toFixed(2)} / p95 ${Rv(this.works,95).toFixed(2)}`,`draw calls ${Pv.lastCalls}, triangles ${Pv.lastTris}`,e.heapMB?`js heap ${e.heapMB.toFixed(1)} MB`:``].filter(Boolean).join(`
`)}},Bv=[`garage`,`warehouse`,`fuel`];function Vv(){return{v:1,money:0,levels:{garage:1,warehouse:1,fuel:0},build:null,deliveries:0,earned:0,fuelStored:0,fuelAt:Date.now(),firstDone:!1,ridgeOpenSeen:!1,jobSeed:1}}function Hv(e){let t=Vv();return!e||e.v!==1?t:{...t,...e,levels:{...t.levels,...e.levels??{}},money:Math.max(0,Number(e.money)||0)}}var Uv=[0,1,1.25,1.5,1.8],Wv=[0,20,32,48,70],Gv=[0,60,120,220,400],Kv=[0,79,88,97,106],qv={garage:{name:`Garage`,cost:[0,0,100,300,700],time:[0,0,30,60,120],perk:e=>e>=3?`New truck · top speed ${Kv[e]} km/h`:`Truck top speed ${Kv[e]} km/h`},warehouse:{name:`Warehouse`,cost:[0,0,150,340,780],time:[0,0,30,60,120],perk:e=>`Bigger loads · pay ×${Uv[e].toFixed(2).replace(/0$/,``)}`},fuel:{name:`Fuel Station`,cost:[0,100,220,420,850],time:[0,20,40,75,120],perk:e=>e===0?`Earns money while you drive`:`Earns $${Wv[e]}/min · holds $${Gv[e]}`}};function Jv(e){return e.levels.garage+e.levels.warehouse+e.levels.fuel-1}function Yv(e){return Jv(e)>=3}function Xv(e,t){let n=e.levels.fuel;if(n<=0){e.fuelAt=t;return}let r=Wv[n]*Math.max(0,t-e.fuelAt)/6e4;e.fuelStored=Math.min(Gv[n],e.fuelStored+r),e.fuelAt=t}function Zv(e,t){if(e.build&&t>=e.build.until){let n=e.build.id;return n===`fuel`&&Xv(e,t),e.levels[n]=Math.min(4,e.levels[n]+1),e.build=null,n}return null}function Qv(e,t){let n=e.levels[t]+1;return n>4?`max`:e.build?`busy`:e.money<qv[t].cost[n]?`money`:null}var $v={farm:110,town:160,port:210,mill:320},ey={farm:[[`Seed Sacks`,`sacks`],[`Feed Bags`,`sacks`],[`Tractor Parts`,`crates`],[`Fence Posts`,`crates`]],town:[[`Bricks`,`bricks`],[`Groceries`,`crates`],[`Furniture`,`container`],[`Paint Drums`,`drums`]],port:[[`Export Crates`,`crates`],[`Container`,`container`],[`Machinery`,`container`],[`Olive Oil`,`drums`]],mill:[[`Saw Blades`,`crates`],[`Fuel Drums`,`drums`],[`Tool Crates`,`crates`]]},ty={farm:lg(`farm`).len,town:lg(`town`).len,port:lg(`port`).len,mill:lg(`mill`).len};function ny(e){return vh[e].name}function ry(e,t,n,r){let i=ey[e],[a,o]=i[n()*i.length|0];return{to:e,cargo:a,kind:o,pay:Math.round($v[e]*Uv[t.levels.warehouse]*(.92+n()*.2)/5)*5,dist:ty[e],seed:r}}function iy(e){return{to:`farm`,cargo:`Seed Sacks`,kind:`sacks`,pay:Math.round($v.farm*Uv[e.levels.warehouse]),dist:ty.farm,seed:3}}function ay(e){let t=jh(e.jobSeed*7919+13),n=[`farm`,`town`,`port`];return Yv(e)&&n.push(`mill`),n.map((n,r)=>ry(n,e,t,e.jobSeed*10+r))}var oy={x:0,z:24,h:Math.PI},sy=Number(Wm.get(`pr`))||Math.min(window.devicePixelRatio||1,1.5),cy=Wm.get(`perf`)===`1`;(cy||Wm.get(`count`)===`1`)&&Iv();async function ly(){try{let e=new FontFace(`Lilita One`,`url(${Hm}) format("woff2")`,{weight:`400`});document.fonts.add(e),await Promise.race([e.load(),new Promise(e=>setTimeout(e,2500))])}catch{}}function uy(){let e=document.createElement(`canvas`);e.width=64,e.height=64;let t=e.getContext(`2d`);return t.lineJoin=`round`,t.lineCap=`round`,t.beginPath(),t.moveTo(12,46),t.lineTo(32,20),t.lineTo(52,46),t.lineWidth=17,t.strokeStyle=`rgba(20,60,30,0.55)`,t.stroke(),t.lineWidth=10,t.strokeStyle=`#8dff6a`,t.stroke(),e}function dy(){let e=document.createElement(`canvas`);e.width=4,e.height=128;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,0,128);return n.addColorStop(0,`rgba(255,255,255,0)`),n.addColorStop(1,`rgba(255,255,255,0.9)`),t.fillStyle=n,t.fillRect(0,0,4,128),e}function fy(e){for(let t=0;t<e.length;t+=9){let n=e[t+3]-e[t],r=e[t+5]-e[t+2],i=e[t+6]-e[t],a=e[t+8]-e[t+2];if(r*i-n*a<0)for(let n=0;n<3;n++)[e[t+3+n],e[t+6+n]]=[e[t+6+n],e[t+3+n]]}return Yg(e,new Float32Array(e.length/3*2))}function py(e,t,n){let r=[];for(let i=0;i<n;i++){let a=i/n*Math.PI*2,o=(i+1)/n*Math.PI*2,s=(e,t)=>[Math.cos(t)*e,0,-Math.sin(t)*e];e>0?r.push(...s(e,a),...s(t,a),...s(t,o),...s(e,a),...s(t,o),...s(e,o)):r.push(0,0,0,...s(t,a),...s(t,o))}return fy(r)}function my(e,t,n,r){let i=[],a=[],o=(o,s)=>{let c=s?t:e,l=o/r*Math.PI*2;i.push(c*Math.sin(l),s?-n/2:n/2,c*Math.cos(l)),a.push(o/r,s)};for(let e=0;e<r;e++)o(e,0),o(e,1),o(e+1,0),o(e,1),o(e+1,1),o(e+1,0);return Yg(i,a)}function hy(){let e=[[0,2.2],[1.6,.2],[.6,.2],[.6,-1.8],[-.6,-1.8],[-.6,.2],[-1.6,.2]],t=new zg,n=hg(16777215),r=(e,t,n)=>[e,-n,t],i=(e,r,i,a,o,s)=>{let c=r[0]-e[0],l=r[1]-e[1],u=r[2]-e[2],d=i[0]-e[0],f=i[1]-e[1],p=i[2]-e[2];(l*p-u*f)*a+(u*d-c*p)*o+(c*f-l*d)*s>=0?t.tri(e[0],e[1],e[2],r[0],r[1],r[2],i[0],i[1],i[2],n):t.tri(e[0],e[1],e[2],i[0],i[1],i[2],r[0],r[1],r[2],n)},a=[[0,1,6],[2,3,4],[2,4,5]];for(let t of[0,.4]){let n=r(0,0,t===0?-1:1);for(let[o,s,c]of a)i(r(...e[o],t),r(...e[s],t),r(...e[c],t),n[0],n[1],n[2])}let o=(e,t)=>t>.2&&t<2.2&&Math.abs(e)<1.6*((2.2-t)/2)||t<=.2&&t>-1.8&&Math.abs(e)<.6;for(let t=0;t<e.length;t++){let[n,a]=e[t],[s,c]=e[(t+1)%e.length],l=c-a,u=-(s-n),d=Math.hypot(l,u);l/=d,u/=d,o((n+s)/2+l*.01,(a+c)/2+u*.01)&&(l=-l,u=-u);let f=r(l,u,0),p=r(n,a,0),m=r(s,c,0),h=r(s,c,.4),g=r(n,a,.4);i(p,m,h,f[0],f[1],f[2]),i(p,h,g,f[0],f[1],f[2])}return Jg(t.build())}var gy=e=>e>=1e3?(e/1e3).toFixed(1)+` km`:Math.max(0,Math.round(e/10)*10)+` m`,_y=e=>(e=Math.max(0,Math.ceil(e)),e>=60?`${Math.floor(e/60)}:${String(e%60).padStart(2,`0`)}`:`${e}s`),vy=class{constructor(e,t){this.rig=new fg,this.particles=new g_,this.mode=`base`,this.job=null,this.route=null,this.routeIdx=0,this.offRoute=0,this.strip=null,this.stripOff=0,this.zone=new fm(`zone`),this.jobs=[],this.hintLeft=0,this.gasHeld=0,this.exhaustT=0,this.dustT=0,this.uiT=0,this.saveT=0,this.arriveT=0,this.moneyTarget=0,this.panel=null,this.pendingPops=new Set,this.pr=sy,this.slowT=0,this.emaFrame=16.7,this.autopilot=Wm.get(`bot`)===`1`,this.timeScale=1,this.tmpV={x:0,y:0,z:0},this.scr=new k,this.wv=new k,this.ctl={steer:0,gas:0,brake:0},this.perf={work:[],gap:[]},this.firstFrameMs=null,this.overlay=null,this.save=e,this.moneyTarget=e.money,this.ui=t;let n=Q.scene,r=hg(15661311),i=hg(8228706),a=2.5/Math.PI;n.ambientLight=Kg({r:a*(r.r+i.r)/2,g:a*(r.g+i.g)/2,b:a*(r.b+i.b)/2}),n.fog.type=ka,n.fog.color=qg(13954812),n.fog.start=260,n.fog.end=740;let o=new fm(`skyLight`);o.addComponent(`light`,{type:`directional`,color:Kg({r:a*(r.r-i.r)/2,g:a*(r.g-i.g)/2,b:a*(r.b-i.b)/2}),intensity:1,castShadows:!1}),Q.root.addChild(o);let s=hg(16773336),c=1.55/Math.PI,l=new fm(`sun`);l.addComponent(`light`,{type:`directional`,color:Kg({r:s.r*c,g:s.g*c,b:s.b*c}),intensity:1,castShadows:!1});let u=Math.hypot(-.55,1,.4),d=Cg(0,1,0,-.55/u,1/u,.4/u);l.setLocalRotation(new N(d[0],d[1],d[2],d[3])),Q.root.addChild(l),Q.root.addChild(this.rig.entity),this.world=new Mv,Q.root.addChild(this.world.group),Q.root.addChild(this.world.sky),this.truck=new sv,Q.root.addChild(this.truck.root),Q.root.addChild(this.particles.entity),this.traffic=new b_,Q.root.addChild(this.traffic.root),this.base=new gv(e.levels),Q.root.addChild(this.base.group),this.base.setBuilding(e.build?.id??null),this.truck.setLevel(e.levels.garage),this.world.setGateOpen(Yv(e),!0),this.truck.gateLocked=!Yv(e),this.ring=$(py(10,13,40),a_({color:9305962,opacity:.75,transparent:!0}),`ring`);let f=$(py(0,10,40),a_({color:9305962,opacity:.22,transparent:!0}),`disc`);this.beamMat=a_({tex:d_(dy(),!1,!1),color:7143226,opacity:.55,transparent:!0,doubleSided:!0,fog:!1});let p=$(my(7,9,90,20),this.beamMat,`beam`);p.setLocalPosition(0,45,0),this.ring.setLocalPosition(0,.25,0),f.setLocalPosition(0,.22,0),this.zone.addChild(this.ring),this.zone.addChild(f),this.zone.addChild(p),this.zone.enabled=!1,Q.root.addChild(this.zone),this.guide=$(hy(),e_(9305962,2779930),`guide`),this.guide.enabled=!1,Q.root.addChild(this.guide),this.stripMat=a_({tex:d_(uy(),!0),transparent:!0,doubleSided:!0,depthBias:-4}),this.input=new _h(this.ui.steer,this.ui.gas,this.ui.brake,this.ui.horn),this.input.onHorn=()=>{sh(),mh.horn()},this.truck.onBump=e=>{mh.bump(e),this.rig.kick(e);for(let e=0;e<8;e++)this.dust(1.5)},this.ui.onAct=(e,t)=>this.act(e,t);for(let e of[`pointerdown`,`keydown`])window.addEventListener(e,()=>sh(),{capture:!0});nh.onChange(()=>this.ui.setMuted(nh.effectivelyMuted)),this.ui.setMuted(nh.effectivelyMuted),this.ui.setMoney(e.money),this.refreshLevel(),this.jobs=ay(e),window.addEventListener(`resize`,()=>this.resize()),document.addEventListener(`visibilitychange`,()=>{document.hidden&&this.persist()}),this.resize(),cy&&(this.overlay=new zv(()=>{let e=performance.memory;return{engine:`PlayCanvas`,pr:this.pr,w:window.innerWidth,h:window.innerHeight,mode:this.mode,heapMB:e?e.usedJSHeapSize/1048576:null}},()=>this.firstFrameMs))}start(){let e=Date.now();Xv(this.save,e);let t=Zv(this.save,e);t&&this.onBuilt(t,!1),this.save.firstDone?this.enterBase(!0):this.startJob(iy(this.save),!0);let n=0,r=16.7;Q.on(`frameupdate`,e=>{if(n=performance.now(),r=e>0?e:16.7,nh.paused){lh(0,0,!1),Q.autoRender=!1;return}Q.autoRender=!0;let t=Math.min(.05,r/1e3)*this.timeScale;this.timeScale>1&&(t=Math.min(t,.05*this.timeScale)),this.update(t)}),Q.on(`frameend`,()=>{if(!Q.autoRender)return;let e=performance.now()-n;this.firstFrameMs===null&&(this.firstFrameMs=performance.now()),this.perf.work.length<2e4&&(this.perf.work.push(e),this.perf.gap.push(r)),this.overlay?.frame(r,e),Lv(),this.adapt(r)}),Q.start()}resize(){Wg.maxPixelRatio=this.pr,Q.resizeCanvas(),this.rig.portrait=window.innerHeight>window.innerWidth*1.05}refreshLevel(){let e=Jv(this.save);this.ui.setLevel(e),this.ui.setGateBar(e,3,Yv(this.save))}persist(){return nh.portal.save(Um.progress,this.save)}startJob(e,t=!1){let n=()=>{this.job=e,this.mode=`drive`,this.ui.closePanel(),this.panel=null,this.ui.mode(`drive`),this.ui.labels([]),this.route=lg(e.to),this.routeIdx=0;let t=this.route,n=Math.atan2(t.x[3]-t.x[0],t.z[3]-t.z[0]);this.truck.place(t.x[0],t.z[0]+10,n),this.truck.setCargo(e.kind,[0,.6,.78,.92,1][this.save.levels.warehouse],e.seed),this.buildStrip(t);let r=t.n-1;this.zone.setLocalPosition(t.x[r],t.y[r],t.z[r]),this.zone.enabled=!0,this.input.enabled=!0,this.input.clear(),this.rig.setMode(`chase`,this.truck,!0),this.hintLeft=this.save.firstDone?0:12,this.gasHeld=0,nh.portal.gameplayStart(),eh.screen(`drive`)};t?n():this.ui.fade(n)}buildStrip(e){this.strip?.destroy();let t=[],n=[],r=1.4;for(let i=0;i<e.n-1;i++){let a=i+1,o=e.x[a]-e.x[i],s=e.z[a]-e.z[i],c=Math.hypot(o,s)||1,l=-s/c,u=o/c,d=[e.x[i]+l*r,e.y[i]+.16,e.z[i]+u*r],f=[e.x[i]-l*r,e.y[i]+.16,e.z[i]-u*r],p=[e.x[a]-l*r,e.y[a]+.16,e.z[a]-u*r],m=[e.x[a]+l*r,e.y[a]+.16,e.z[a]+u*r],h=-e.s[i]/4.5,g=-e.s[a]/4.5;t.push(...d,...p,...f,...d,...m,...p),n.push(0,h,1,g,1,h,0,h,0,g,1,g)}this.strip=$(Yg(t,n),this.stripMat,`strip`),Xg(this.strip).cull=!1,Q.root.addChild(this.strip)}deliver(){if(!this.job)return;let e=this.job;this.mode=`arrive`,this.arriveT=0,this.input.enabled=!1,this.ui.mode(`arrive`),this.ui.warn(``),this.ui.hint(!1),this.hintLeft=0;let t=this.save.money;this.save.money+=e.pay,this.save.deliveries++,this.save.earned+=e.pay;let n=!this.save.firstDone;this.save.firstDone=!0,this.save.jobSeed++,this.jobs=ay(this.save),this.persist(),mh.airBrake(),mh.delivered(),this.ui.big(`+$${e.pay}<small>DELIVERED!</small>`),this.payCoins(this.truckScreen(),t,e.pay);for(let e=0;e<40;e++){let e=Math.random()*Math.PI*2,t=4+Math.random()*6;this.particles.emit(this.truck.x,this.truck.y+3,this.truck.z,Math.cos(e)*t,6+Math.random()*6,Math.sin(e)*t,Math.random()<.5?16765773:16774064,1,.9,.4,1.4,9)}this.rig.setMode(`orbit`,this.truck),this.zone.enabled=!1,this.strip&&(this.strip.enabled=!1),nh.portal.gameplayStop(),nh.portal.happyTime(),eh.screen(`delivered`),n&&eh.event(`first_delivery`,{once:!0}),setTimeout(()=>{this.mode===`arrive`&&this.showDelivered(e)},1700)}truckScreen(){return this.toScreen({x:this.truck.x,y:this.truck.y+3,z:this.truck.z})}toScreen(e){return this.rig.cam.worldToScreen(this.wv.set(e.x,e.y,e.z),this.scr),{x:this.scr.x,y:this.scr.y}}payCoins(e,t,n){let r=kh(Math.round(6+n/25),6,18);this.moneyTarget=t,this.ui.flyCoins(e.x,e.y,r,e=>{this.moneyTarget=Math.min(this.save.money,t+Math.round(n*(e+1)/r)),mh.coin(e),this.ui.bumpMoney()}),setTimeout(()=>this.moneyTarget=this.save.money,2200)}showDelivered(e){let t=Uv[this.save.levels.warehouse],n=Math.round(e.pay/t),r=Bv.some(e=>Qv(this.save,e)===null);this.panel={kind:`delivered`,arg:``},this.ui.panel(`
      <h2>Delivered!</h2>
      <div class="sub">${e.cargo} → ${ny(e.to)}</div>
      <div class="payout">+$${e.pay}</div>
      <div class="stat"><span>Road pay</span><b>$${n}</b></div>
      ${t>1?`<div class="stat"><span>Warehouse bonus</span><b>+$${e.pay-n}</b></div>`:``}
      <div class="row">
        <button class="btn ad" data-act="double">${hh.play}<span>×2 PAYOUT</span></button>
        <button class="btn primary" data-act="depot"><span>DEPOT</span>${hh.right}</button>
      </div>
      ${r?`<div class="small">You can build something at the depot!</div>`:``}`,!0)}enterBase(e=!1){let t=()=>{this.mode=`base`,this.job=null,this.ui.closePanel(),this.panel=null,this.ui.mode(`base`),this.ui.warn(``),this.zone.enabled=!1,this.guide.enabled=!1,this.strip&&(this.strip.enabled=!1),this.truck.place(oy.x,oy.z,oy.h),this.input.enabled=!1,this.rig.setMode(`base`,this.truck,!0);for(let e of this.pendingPops)this.base.setLevel(e,this.save.levels[e],!0);this.pendingPops.size&&mh.levelUp(),this.pendingPops.clear(),Yv(this.save)&&!this.save.ridgeOpenSeen&&this.announceRidge(),nh.portal.gameplayStop(),eh.screen(`base`)};e?t():this.ui.fade(t)}announceRidge(){this.save.ridgeOpenSeen=!0,this.world.setGateOpen(!0),this.truck.gateLocked=!1,this.jobs=ay(this.save),this.ui.big(`PINE RIDGE<small>NEW REGION OPEN!</small>`),mh.levelUp(),eh.event(`ridge_open`,{once:!0}),this.persist()}act(e,t){switch(sh(),mh.click(),e){case`mute`:nh.toggleMute();break;case`pause`:if(this.mode!==`drive`)break;this.panel={kind:`pause`,arg:``},nh.portal.gameplayStop(),this.ui.panel(`<h2>Paused</h2><div class="sub">${this.job?`${this.job.cargo} → ${ny(this.job.to)} · $${this.job.pay}`:``}</div>
          <div class="row"><button class="btn ghost" data-act="abandon">Back to depot</button><button class="btn primary" data-act="resume">RESUME</button></div>`);break;case`resume`:this.ui.closePanel(),this.panel=null,nh.portal.gameplayStart();break;case`abandon`:this.enterBase();break;case`close`:this.ui.closePanel(),this.panel=null;break;case`jobs`:this.openJobs();break;case`take`:{let e=this.jobs[Number(t)];e&&this.startJob(e);break}case`locked`:mh.deny(),this.ui.toast(`Reach BASE LV 3 to open Pine Ridge`);break;case`depot`:this.enterBase();break;case`double`:this.doublePay();break;case`building`:this.openBuilding(t);break;case`upgrade`:this.upgrade(t);break;case`rush`:this.rush();break;case`collect`:this.collectFuel()}}openJobs(){this.panel={kind:`jobs`,arg:``};let e=this.jobs.map((e,t)=>`<button class="job ${e.to===`mill`?`new`:``}" data-act="take" data-arg="${t}">
          ${e.to===`mill`?`<span class="chip">NEW REGION</span>`:``}
          <span class="dest">${ny(e.to)}</span>
          <span class="cargo">${e.cargo}</span>
          <span class="meta">${gy(e.dist)} · ~${Math.round(e.dist/17/60*2)/2||1} min</span>
          <span class="pay">$${e.pay}</span></button>`).join(``),t=Yv(this.save)?``:`<button class="job locked" data-act="locked"><span class="dest">${vh.mill.name}</span><span class="cargo">Saw Blades</span><span class="meta">2.1 km · big pay</span><span class="pay">${hh.lock} BASE LV 3</span></button>`;this.ui.panel(`<h2>Job Board</h2><div class="sub">Pick a load. Longer roads pay more.</div><div class="jobs">${e}${t}</div>
      <div class="row"><button class="btn ghost" data-act="close">Close</button></div>`)}openBuilding(e){this.panel={kind:`building`,arg:e},this.renderBuilding(e)}renderBuilding(e){let t=qv[e],n=this.save.levels[e],r=n+1,i=Qv(this.save,e),a=this.save.build?.id===e?this.save.build:null,o=`<div class="levels">${Array.from({length:4},(e,t)=>`<i class="${t<n?`on`:``}">${hh.star}</i>`).join(``)}</div>`;o+=`<div class="stat"><span>${n===0?`Plot`:`Now`}</span><b>${n===0?`Empty`:t.perk(n)}</b></div>`,r<=4&&(o+=`<div class="stat"><span>${n===0?`Build`:`Next`}</span><b>${t.perk(r)}</b></div>`,o+=`<div class="stat"><span>Build time</span><b>${_y(t.time[r])}</b></div>`);let s=`<button class="btn ghost" data-act="close">Close</button>`,c=``;if(a){let e=(a.until-Date.now())/1e3;o+=`<div class="timer">Building… ${_y(e)}</div>`,s+=`<button class="btn ad" data-act="rush">${hh.play}<span>FINISH NOW</span></button>`}else if(i===`max`)c=`Max level in this demo`;else{let a=t.cost[r];s+=`<button class="btn gold" data-act="upgrade" data-arg="${e}" ${i?`disabled`:``}>${n===0?`BUILD`:`UPGRADE`} $${a}</button>`,i===`busy`&&(c=`Your builder is busy. One build at a time.`),i===`money`&&(c=`Need $${a-this.save.money} more. Deliver cargo!`)}this.ui.panel(`<h2>${t.name}${n>0?` · Lv ${n}`:``}</h2>${o}<div class="row">${s}</div>${c?`<div class="small">${c}</div>`:``}`)}upgrade(e){if(Qv(this.save,e)!==null){mh.deny();return}let t=this.save.levels[e]+1,n=qv[e];this.save.money-=n.cost[t],this.moneyTarget=this.save.money,this.ui.setMoney(this.save.money),e===`fuel`&&Xv(this.save,Date.now()),this.save.build={id:e,until:Date.now()+n.time[t]*1e3,total:n.time[t]},this.base.setBuilding(e),mh.hammer();let r=lv[e];for(let e=0;e<24;e++)this.particles.emit(r.x+(Math.random()-.5)*20,this.base.y+1,r.z+(Math.random()-.5)*16,(Math.random()-.5)*6,2+Math.random()*3,(Math.random()-.5)*6,14205594,.5,2,6,1.2);this.ui.closePanel(),this.panel=null,this.ui.toast(`${n.name} ${this.save.levels[e]===0?`building`:`upgrading`}… ${_y(n.time[t])}`,`gold`),eh.event(`first_build`,{once:!0}),this.persist()}async rush(){this.save.build&&await nh.portal.showRewarded()&&this.save.build&&(this.save.build.until=Date.now(),this.checkBuild())}async doublePay(){if(!this.job&&this.mode!==`arrive`)return;let e=document.querySelector(`[data-act="double"]`);e?.setAttribute(`disabled`,``);let t=await nh.portal.showRewarded(),n=this.job;if(t&&n){let t=this.save.money;this.save.money+=n.pay,this.save.earned+=n.pay,this.persist();let r=e?.getBoundingClientRect();this.payCoins(r?{x:r.left+r.width/2,y:r.top}:this.truckScreen(),t,n.pay),this.ui.toast(`+$${n.pay} bonus!`,`good`)}}collectFuel(){let e=Math.floor(this.save.fuelStored);if(e<1)return;let t=this.save.money;this.save.money+=e,this.save.fuelStored-=e,this.save.earned+=e;let n=this.toScreen(this.base.anchor(`fuel`,this.save.levels.fuel,this.tmpV));this.payCoins(n,t,e),this.persist()}checkBuild(){let e=Zv(this.save,Date.now());e&&this.onBuilt(e,!0)}onBuilt(e,t){let n=this.save.levels[e];if(this.base.setBuilding(null),this.mode===`base`||!t?this.base.setLevel(e,n,t):this.pendingPops.add(e),e===`garage`&&this.truck.setLevel(n),t&&(mh.levelUp(),this.ui.toast(`${qv[e].name} Lv ${n} ready!`,`good`),this.mode===`base`))for(let t=0;t<30;t++)this.sparkle(lv[e].x,this.base.y+6,lv[e].z);this.jobs=this.mode===`drive`?this.jobs:ay(this.save),this.refreshLevel(),Yv(this.save)&&(this.truck.gateLocked=!1,!this.save.ridgeOpenSeen&&this.mode===`base`&&t&&this.announceRidge()),this.panel?.kind===`building`&&this.renderBuilding(this.panel.arg),this.persist()}sparkle(e,t,n){let r=Math.random()*Math.PI*2,i=3+Math.random()*6;this.particles.emit(e,t,n,Math.cos(r)*i,5+Math.random()*8,Math.sin(r)*i,Math.random()<.5?16765773:16777215,1,1.2,.3,1.3,9)}dust(e=1){let t=this.truck;for(let n of[-1,1])t.rearWheel(n,this.tmpV),this.particles.emit(this.tmpV.x,this.tmpV.y+.3,this.tmpV.z,(Math.random()-.5)*2-t.vx*.15,.8+Math.random(),(Math.random()-.5)*2-t.vz*.15,t.offroad?13808255:15260868,.22*e,.8,2.8,.8)}adapt(e){Wm.get(`noadapt`)===`1`||e>200||(this.emaFrame+=(e-this.emaFrame)*.05,this.emaFrame>24&&this.pr>.75?(this.slowT+=e/1e3,this.slowT>3&&(this.pr=Math.max(.75,this.pr-.25),this.slowT=0,this.resize())):this.slowT=0)}update(e){let t=this.ui.panelOpen;if(this.saveT+=e,this.saveT>1&&(this.saveT=0,Xv(this.save,Date.now()),this.checkBuild(),this.mode===`base`&&this.persist()),this.panel?.kind===`building`&&this.save.build?.id===this.panel.arg&&(this.uiT+=e,this.uiT>.5&&(this.uiT=0,this.renderBuilding(this.panel.arg))),this.mode===`drive`&&!(t&&this.panel?.kind===`pause`))this.updateDrive(e);else if(this.mode===`arrive`){this.arriveT+=e;let t=this.ctl;t.steer=0,t.gas=0,t.brake=1,this.stepTruck(e,t),lh(Math.abs(this.truck.speed)/this.truck.vmax,0,!0)}else lh(0,0,this.mode===`drive`);this.mode===`base`&&this.updateBase(),this.truck.syncModel(e),this.traffic.update(e,this.mode===`drive`?this.truck:null),this.rig.update(e,this.truck),this.world.update(e,this.rig.position),this.base.update(e),this.particles.update(e),this.particles.setScale(Wg.height,this.rig.fov),this.stripOff=(this.stripOff+e*1.4)%1,this.stripMat.setParameter(`uOffset`,[0,this.stripOff]);let n=1+Math.sin(performance.now()/250)*.04;if(this.ring.setLocalScale(n,n,n),this.zone.enabled){let e=this.zone.getLocalPosition(),t=Math.hypot(this.rig.position.x-e.x,this.rig.position.z-e.z);o_(this.beamMat,7143226,.55*kh((t-35)/70,0,1))}this.ui.tickMoney(this.moneyTarget,e)}stepTruck(e,t){let n=Math.max(1,Math.ceil(e/(1/120))),r=e/n;for(let e=0;e<n;e++)this.truck.update(r,t)}autopilotControls(){let e=this.ctl,t=this.route,n=this.truck,r=Math.abs(n.speed),i=this.routeIdx,a=e=>{let n=i,r=t.s[i]+e;for(;n<t.n-1&&t.s[n]<r;)n++;return n},o=a(9+r*.8);e.steer=kh(-Mh(n.h,Math.atan2(t.x[o]-n.x,t.z[o]-n.z))*2.4,-1,1);let s=a(55),c=Math.atan2(t.x[Math.min(i+1,t.n-1)]-t.x[i],t.z[Math.min(i+1,t.n-1)]-t.z[i]),l=Math.atan2(t.x[Math.min(s+1,t.n-1)]-t.x[s],t.z[Math.min(s+1,t.n-1)]-t.z[s]),u=kh(30-Math.abs(Mh(c,l))*22,7,n.vmax),d=t.len-t.s[i];return d<70&&(u=Math.min(u,1.2+d*.2)),e.gas=+(r<u-.5),e.brake=+(r>u+1.5),e}updateDrive(e){let t=this.route,n=this.truck,r=this.autopilot?this.autopilotControls():this.input.read();this.stepTruck(e,r);let i=this.routeIdx,a=1/0;for(let e=Math.max(0,this.routeIdx-8);e<Math.min(t.n,this.routeIdx+40);e++){let r=(t.x[e]-n.x)**2+(t.z[e]-n.z)**2;r<a&&(a=r,i=e)}this.routeIdx=i;let o=Math.sqrt(a),s=Math.max(0,t.len-t.s[i]),c=t.n-1,l=Math.hypot(t.x[c]-n.x,t.z[c]-n.z),u=Math.min(c,i+6),d=Math.atan2(t.x[Math.min(c,i+1)]-t.x[i],t.z[Math.min(c,i+1)]-t.z[i]),f=Math.abs(Mh(n.h,d))>2&&n.speed>2&&o<20;if(this.offRoute=o>22?this.offRoute+e:0,this.strip){this.strip.enabled=!0;let e=Xg(this.strip).mesh.primitive[0],n=(t.n-1)*6;e.base=Math.min(n,Math.max(0,i-2)*6),e.count=Math.min(570,n-e.base)}let p=this.offRoute>.6||f;if(this.guide.enabled=p,p){let e=t.x[u]-n.x,r=t.z[u]-n.z;this.guide.setLocalPosition(n.x+Math.sin(n.h)*4,n.y+7.5+Math.sin(performance.now()/200)*.3,n.z+Math.cos(n.h)*4),this.guide.setLocalEulerAngles(0,Math.atan2(e,r)*180/Math.PI,0)}let m=Math.abs(n.speed);if(lh(m/n.vmax,r.gas,!0),this.exhaustT-=e,this.exhaustT<=0){this.exhaustT=r.gas?.045:.12;for(let e of[-1,1])n.stackTop(e,this.tmpV),this.particles.emit(this.tmpV.x,this.tmpV.y,this.tmpV.z,-n.vx*.3+(Math.random()-.5),2.2+Math.random(),-n.vz*.3+(Math.random()-.5),r.gas?6974835:10132899,r.gas?.32:.2,.4,1.7,.9,-.5)}if(this.dustT-=e,m>7&&this.dustT<=0&&(this.dustT=n.offroad?.05:.14,this.dust(n.offroad?1.4:.6)),l<40||s<45?(this.ui.warn(m>2.5?`BRAKE IN THE GREEN ZONE`:``),this.el(`warn`)?.classList.add(`go`)):this.offRoute>1.2?(this.el(`warn`)?.classList.remove(`go`),this.ui.warn(`OFF ROUTE · FOLLOW THE ARROW`)):f?(this.el(`warn`)?.classList.remove(`go`),this.ui.warn(`WRONG WAY · TURN AROUND`)):this.ui.warn(``),l<13&&m<2.5&&this.deliver(),this.hintLeft>0?(r.gas&&(this.gasHeld+=e),(this.gasHeld>1.5||this.input.touching)&&(this.hintLeft-=e*(this.gasHeld>1.5?3:1)),this.gasHeld>3&&(this.hintLeft=0),this.ui.hint(this.hintLeft>0)):this.ui.hint(!1),this.uiT+=e,this.uiT>.12&&this.job){this.uiT=0;let e=Mh(n.h,Math.atan2(t.x[u]-n.x,t.z[u]-n.z));this.ui.nav(ny(this.job.to),gy(s),1-s/t.len,`${this.job.cargo} · $${this.job.pay}`,-e*180/Math.PI),this.ui.speed(m*3.6)}}el(e){return this.ui.root.querySelector(`[data-el="${e}"]`)}updateBase(){let e=[];for(let t of Bv){let n=this.save.levels[t],r=this.toScreen(this.base.anchor(t,n,this.tmpV)),i=this.save.build?.id===t?this.save.build:null,a,o=``;if(i){let e=(i.until-Date.now())/1e3,n=kh(1-e/i.total,0,1);a=`${qv[t].name}<small>${_y(e)}</small><span class="bar"><i style="width:${(n*100).toFixed(0)}%"></i></span>`,o=`busy`}else if(n>=4)a=`${qv[t].name}<small>LV ${n} · MAX</small>`;else{let e=Qv(this.save,t)===null;a=`${qv[t].name}<small>${n===0?`BUILD`:`LV `+n} · $${qv[t].cost[n+1]}</small>`,e&&(o=`can`)}e.push({id:`b:`+t,x:r.x,y:r.y,visible:!this.ui.panelOpen,html:a,cls:o})}if(this.save.levels.fuel>0&&this.save.fuelStored>=1&&this.save.build?.id!==`fuel`){let t=this.toScreen({x:lv.fuel.x+14,y:this.base.y+9,z:lv.fuel.z});e.push({id:`collect`,x:t.x,y:t.y,visible:!this.ui.panelOpen,html:`$${Math.floor(this.save.fuelStored)}`,cls:`collect`})}this.ui.labels(e)}};async function yy(){let e=ly();await nh.init();let t=Vv();Wm.get(`fresh`)!==`1`&&(t=Hv(await nh.portal.load(Um.progress))),await e,await new Promise(e=>setTimeout(e,30));let n=performance.now(),r=new gh(document.getElementById(`app`));await Gg(r.canvas,sy);let i=new vy(t,r),a=performance.now()-n;document.getElementById(`loading`)?.remove(),nh.portal.loadingFinished(!0),i.start(),window.__demo={engine:`playcanvas`,game:i,buildMs:a,get firstFrameMs(){return i.firstFrameMs},get state(){let e=i;return{mode:e.mode,money:e.save.money,levels:{...e.save.levels},build:e.save.build,deliveries:e.save.deliveries,routeLeft:e.route&&e.mode===`drive`?e.route.len-e.route.s[e.routeIdx]:null,speed:e.truck.speed,pos:[e.truck.x,e.truck.z],pr:Wg.maxPixelRatio,calls:Q.stats.drawCalls.total,tris:Pv.lastTris}},set autopilot(e){i.autopilot=e},set timeScale(e){i.timeScale=e},padY:zh(`depot`)}}yy().catch(e=>{console.error(e);let t=document.getElementById(`loading`);t&&(t.textContent=`Could not start: `+(e instanceof Error?e.message:String(e)))});export{Km as n,Gm as t};