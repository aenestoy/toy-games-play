import{$ as e,At as t,B as n,Dt as r,Et as i,G as a,J as o,Ot as s,St as c,Tt as l,V as u,W as d,X as f,Y as p,_t as m,at as h,bt as g,ct as _,dt as v,et as y,ht as b,it as ee,jt as x,kt as S,lt as C,mt as w,o as te,ot as ne,pt as re,q as T,r as E,rt as ie,st as D,t as O,tt as k,wt as A,xt as ae,yt as j}from"./gfx-D8IwfqWJ.js";var oe=class{static concentric(e,t){let n=[];n.push(0,0);let r=2*Math.PI/e/t;for(let t=1;t<=e;t++){let i=t/e,a=2*Math.PI*i,o=Math.max(1,Math.floor(a/r)),s=2*Math.PI/o;for(let e=0;e<o;e++){let t=e*s,r=i*Math.cos(t),a=i*Math.sin(t);n.push(r,a)}}return n}},M=class extends D{constructor(...e){super(...e),x(this,`_shader`,null),x(this,`quadRender`,null),x(this,`cullMode`,0),x(this,`frontFace`,0),x(this,`blendState`,w.NOBLEND),x(this,`depthState`,re.NODEPTH),x(this,`stencilFront`,null),x(this,`stencilBack`,null),x(this,`viewport`,void 0),x(this,`scissor`,void 0)}set shader(t){this.quadRender?.destroy(),this.quadRender=null,this._shader=t,t&&(this.quadRender=new e(t))}get shader(){return this._shader}execute(){this.device.setDrawStates(this.blendState,this.depthState,this.cullMode,this.frontFace,this.stencilFront,this.stencilBack),this.quadRender?.render(this.viewport,this.scissor)}},N=`none`,P=`lighting`,se=`
uniform sampler2D sourceTexture;
uniform vec2 sourceInvResolution;
varying vec2 uv0;
#ifdef PREMULTIPLY
	uniform sampler2D premultiplyTexture;
#endif
void main()
{
	vec3 e = texture2D (sourceTexture, uv0).rgb;
	#ifdef BOXFILTER
		vec3 value = e;
		#ifdef PREMULTIPLY
			float premultiply = texture2D(premultiplyTexture, uv0).{PREMULTIPLY_SRC_CHANNEL};
			value *= vec3(premultiply);
		#endif
	#else
		float x = sourceInvResolution.x;
		float y = sourceInvResolution.y;
		vec3 a = texture2D(sourceTexture, vec2 (uv0.x - 2.0 * x, uv0.y + 2.0 * y)).rgb;
		vec3 b = texture2D(sourceTexture, vec2 (uv0.x,		   uv0.y + 2.0 * y)).rgb;
		vec3 c = texture2D(sourceTexture, vec2 (uv0.x + 2.0 * x, uv0.y + 2.0 * y)).rgb;
		vec3 d = texture2D(sourceTexture, vec2 (uv0.x - 2.0 * x, uv0.y)).rgb;
		vec3 f = texture2D(sourceTexture, vec2 (uv0.x + 2.0 * x, uv0.y)).rgb;
		vec3 g = texture2D(sourceTexture, vec2 (uv0.x - 2.0 * x, uv0.y - 2.0 * y)).rgb;
		vec3 h = texture2D(sourceTexture, vec2 (uv0.x,		   uv0.y - 2.0 * y)).rgb;
		vec3 i = texture2D(sourceTexture, vec2 (uv0.x + 2.0 * x, uv0.y - 2.0 * y)).rgb;
		vec3 j = texture2D(sourceTexture, vec2 (uv0.x - x, uv0.y + y)).rgb;
		vec3 k = texture2D(sourceTexture, vec2 (uv0.x + x, uv0.y + y)).rgb;
		vec3 l = texture2D(sourceTexture, vec2 (uv0.x - x, uv0.y - y)).rgb;
		vec3 m = texture2D(sourceTexture, vec2 (uv0.x + x, uv0.y - y)).rgb;
		vec3 value = e * 0.125;
		value += (a + c + g + i) * 0.03125;
		value += (b + d + f + h) * 0.0625;
		value += (j + k + l + m) * 0.125;
	#endif
	#ifdef REMOVE_INVALID
		value = max(value, vec3(0.0));
	#endif
	gl_FragColor = vec4(value, 1.0);
}
`,ce=`
var sourceTexture: texture_2d<f32>;
var sourceTextureSampler: sampler;
uniform sourceInvResolution: vec2f;
varying uv0: vec2f;
#ifdef PREMULTIPLY
	var premultiplyTexture: texture_2d<f32>;
	var premultiplyTextureSampler: sampler;
#endif
@fragment
fn fragmentMain(input: FragmentInput) -> FragmentOutput {
	var output: FragmentOutput;
	let e: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, input.uv0).rgb);
	#ifdef BOXFILTER
		var value: half3 = e;
		#ifdef PREMULTIPLY
			let premultiply: half = half(textureSample(premultiplyTexture, premultiplyTextureSampler, input.uv0).{PREMULTIPLY_SRC_CHANNEL});
			value *= premultiply;
		#endif
	#else
		let x: f32 = uniform.sourceInvResolution.x;
		let y: f32 = uniform.sourceInvResolution.y;
		let a: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x - 2.0 * x, input.uv0.y + 2.0 * y)).rgb);
		let b: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x,		   input.uv0.y + 2.0 * y)).rgb);
		let c: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x + 2.0 * x, input.uv0.y + 2.0 * y)).rgb);
		let d: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x - 2.0 * x, input.uv0.y)).rgb);
		let f: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x + 2.0 * x, input.uv0.y)).rgb);
		let g: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x - 2.0 * x, input.uv0.y - 2.0 * y)).rgb);
		let h: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x,		   input.uv0.y - 2.0 * y)).rgb);
		let i: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x + 2.0 * x, input.uv0.y - 2.0 * y)).rgb);
		let j: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x - x, input.uv0.y + y)).rgb);
		let k: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x + x, input.uv0.y + y)).rgb);
		let l: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x - x, input.uv0.y - y)).rgb);
		let m: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x + x, input.uv0.y - y)).rgb);
		var value: half3 = e * half(0.125);
		value += (a + c + g + i) * half(0.03125);
		value += (b + d + f + h) * half(0.0625);
		value += (j + k + l + m) * half(0.125);
	#endif
	#ifdef REMOVE_INVALID
		value = max(value, half3(0.0));
	#endif
	output.color = vec4f(vec3f(value), 1.0);
	return output;
}
`,F=class extends M{constructor(e,t,n={}){super(e),this.sourceTexture=t,this.premultiplyTexture=n.premultiplyTexture,k.get(e,j).set(`downsamplePS`,se),k.get(e,g).set(`downsamplePS`,ce);let r=n.boxFilter??!1,i=`${r?`Box`:``}-${n.premultiplyTexture?`Premultiply`:``}-${n.premultiplySrcChannel??``}-${n.removeInvalid?`RemoveInvalid`:``}`,a=new Map;r&&a.set(`BOXFILTER`,``),n.premultiplyTexture&&a.set(`PREMULTIPLY`,``),n.removeInvalid&&a.set(`REMOVE_INVALID`,``),a.set(`{PREMULTIPLY_SRC_CHANNEL}`,n.premultiplySrcChannel??`x`),this.shader=y.createShader(e,{uniqueName:`DownSampleShader:${i}`,attributes:{aPosition:m},vertexChunk:`quadVS`,fragmentChunk:`downsamplePS`,fragmentDefines:a}),this.sourceTextureId=e.scope.resolve(`sourceTexture`),this.premultiplyTextureId=e.scope.resolve(`premultiplyTexture`),this.sourceInvResolutionId=e.scope.resolve(`sourceInvResolution`),this.sourceInvResolutionValue=new Float32Array(2)}setSourceTexture(e){this._sourceTexture=e,this.options.resizeSource=e}execute(){this.sourceTextureId.setValue(this.sourceTexture),this.premultiplyTexture&&this.premultiplyTextureId.setValue(this.premultiplyTexture),this.sourceInvResolutionValue[0]=1/this.sourceTexture.width,this.sourceInvResolutionValue[1]=1/this.sourceTexture.height,this.sourceInvResolutionId.setValue(this.sourceInvResolutionValue),super.execute()}},le=`
	uniform sampler2D sourceTexture;
	uniform vec2 sourceInvResolution;
	varying vec2 uv0;
	void main()
	{
		float x = sourceInvResolution.x;
		float y = sourceInvResolution.y;
		vec3 a = texture2D (sourceTexture, vec2 (uv0.x - x, uv0.y + y)).rgb;
		vec3 b = texture2D (sourceTexture, vec2 (uv0.x,	 uv0.y + y)).rgb;
		vec3 c = texture2D (sourceTexture, vec2 (uv0.x + x, uv0.y + y)).rgb;
		vec3 d = texture2D (sourceTexture, vec2 (uv0.x - x, uv0.y)).rgb;
		vec3 e = texture2D (sourceTexture, vec2 (uv0.x,	 uv0.y)).rgb;
		vec3 f = texture2D (sourceTexture, vec2 (uv0.x + x, uv0.y)).rgb;
		vec3 g = texture2D (sourceTexture, vec2 (uv0.x - x, uv0.y - y)).rgb;
		vec3 h = texture2D (sourceTexture, vec2 (uv0.x,	 uv0.y - y)).rgb;
		vec3 i = texture2D (sourceTexture, vec2 (uv0.x + x, uv0.y - y)).rgb;
		vec3 value = e * 0.25;
		value += (b + d + f + h) * 0.125;
		value += (a + c + g + i) * 0.0625;
		gl_FragColor = vec4(value, 1.0);
	}
`,ue=`
	var sourceTexture: texture_2d<f32>;
	var sourceTextureSampler: sampler;
	uniform sourceInvResolution: vec2f;
	varying uv0: vec2f;
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		var output: FragmentOutput;
		let x: f32 = uniform.sourceInvResolution.x;
		let y: f32 = uniform.sourceInvResolution.y;
		let a: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x - x, input.uv0.y + y)).rgb);
		let b: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x,	 input.uv0.y + y)).rgb);
		let c: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x + x, input.uv0.y + y)).rgb);
		let d: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x - x, input.uv0.y)).rgb);
		let e: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x,	 input.uv0.y)).rgb);
		let f: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x + x, input.uv0.y)).rgb);
		let g: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x - x, input.uv0.y - y)).rgb);
		let h: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x,	 input.uv0.y - y)).rgb);
		let i: half3 = half3(textureSample(sourceTexture, sourceTextureSampler, vec2f(input.uv0.x + x, input.uv0.y - y)).rgb);
		var value: half3 = e * half(0.25);
		value += (b + d + f + h) * half(0.125);
		value += (a + c + g + i) * half(0.0625);
		output.color = vec4f(vec3f(value), 1.0);
		return output;
	}
`,de=class extends M{constructor(e,t){super(e),this.sourceTexture=t,k.get(e,j).set(`upsamplePS`,le),k.get(e,g).set(`upsamplePS`,ue),this.shader=y.createShader(e,{uniqueName:`UpSampleShader`,attributes:{aPosition:m},vertexChunk:`quadVS`,fragmentChunk:`upsamplePS`}),this.sourceTextureId=e.scope.resolve(`sourceTexture`),this.sourceInvResolutionId=e.scope.resolve(`sourceInvResolution`),this.sourceInvResolutionValue=new Float32Array(2)}execute(){this.sourceTextureId.setValue(this.sourceTexture),this.sourceInvResolutionValue[0]=1/this.sourceTexture.width,this.sourceInvResolutionValue[1]=1/this.sourceTexture.height,this.sourceInvResolutionId.setValue(this.sourceInvResolutionValue),super.execute()}},fe=class extends _{constructor(e,t,n){super(e),x(this,`bloomTexture`,void 0),x(this,`blurLevel`,16),x(this,`bloomRenderTarget`,void 0),x(this,`textureFormat`,void 0),x(this,`renderTargets`,[]),this._sourceTexture=t,this.textureFormat=n,this.bloomRenderTarget=this.createRenderTarget(0),this.bloomTexture=this.bloomRenderTarget.colorBuffer}destroy(){this.destroyRenderPasses(),this.destroyRenderTargets()}destroyRenderTargets(e=0){for(let t=e;t<this.renderTargets.length;t++){let e=this.renderTargets[t];e.destroyTextureBuffers(),e.destroy()}this.renderTargets.length=0}destroyRenderPasses(){for(let e=0;e<this.beforePasses.length;e++)this.beforePasses[e].destroy();this.beforePasses.length=0}createRenderTarget(e){return new C({depth:!1,colorBuffer:new b(this.device,{name:`BloomTexture${e}`,width:1,height:1,format:this.textureFormat,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1})})}createRenderTargets(e){for(let t=0;t<e;t++){let e=t===0?this.bloomRenderTarget:this.createRenderTarget(t);this.renderTargets.push(e)}}calcMipLevels(e,t,n){return Math.floor(Math.log2(Math.min(e,t))-Math.log2(n))}createRenderPasses(e){let t=this.device,n=this._sourceTexture;for(let r=0;r<e;r++){let e=new F(t,n),i=this.renderTargets[r];e.init(i,{resizeSource:n,scaleX:.5,scaleY:.5}),e.setClearColor(S.BLACK),this.beforePasses.push(e),n=i.colorBuffer}n=this.renderTargets[e-1].colorBuffer;for(let r=e-2;r>=0;r--){let e=new de(t,n),i=this.renderTargets[r];e.init(i),e.blendState=w.ADDBLEND,this.beforePasses.push(e),n=i.colorBuffer}}onDisable(){this.renderTargets[0]?.resize(1,1),this.destroyRenderPasses(),this.destroyRenderTargets(1)}frameUpdate(){super.frameUpdate();let e=this.calcMipLevels(this._sourceTexture.width,this._sourceTexture.height,1),n=t.clamp(e,1,this.blurLevel);this.renderTargets.length!==n&&(this.destroyRenderPasses(),this.destroyRenderTargets(1),this.createRenderTargets(n),this.createRenderPasses(n))}},pe={composePS:`
	#include "tonemappingPS"
	#include "gammaPS"
	varying vec2 uv0;
	uniform sampler2D sceneTexture;
	uniform vec2 sceneTextureInvRes;
	uniform float composeTargetFlipY;
	#include "composeBloomPS"
	#include "composeDofPS"
	#include "composeSsaoPS"
	#include "composeGradingPS"
	#include "composeColorEnhancePS"
	#include "composeVignettePS"
	#include "composeFringingPS"
	#include "composeCasPS"
	#include "composeColorLutPS"
	#if DEBUG_COMPOSE == depth
		#include "screenDepthPS"
	#endif
	#include "composeDeclarationsPS"
	void main() {
		#include "composeMainStartPS"
		vec2 uv = vec2(uv0.x, mix(uv0.y, 1.0 - uv0.y, composeTargetFlipY));
		vec4 scene = texture2DLod(sceneTexture, uv, 0.0);
		vec3 result = scene.rgb;
		#ifdef CAS
			result = applyCas(result, uv, sharpness);
		#endif
		#ifdef DOF
			result = applyDof(result, uv);
		#endif
		#ifdef SSAO_TEXTURE
			result = applySsao(result, uv);
		#endif
		#ifdef FRINGING
			result = applyFringing(result, uv);
		#endif
		#ifdef BLOOM
			result = applyBloom(result, uv);
		#endif
		#ifdef COLOR_ENHANCE
			result = applyColorEnhance(result);
		#endif
		#ifdef GRADING
			result = applyGrading(result);
		#endif
		result = toneMap(max(vec3(0.0), result));
		#ifdef COLOR_LUT
			result = applyColorLUT(result);
		#endif
		#ifdef VIGNETTE
			result = applyVignette(result, uv);
		#endif
		#include "composeMainEndPS"
		#ifdef DEBUG_COMPOSE
			#if DEBUG_COMPOSE == scene
				result = scene.rgb;
			#elif defined(BLOOM) && DEBUG_COMPOSE == bloom
				result = dBloom * bloomIntensity;
			#elif defined(DOF) && DEBUG_COMPOSE == dofcoc
				result = vec3(dCoc, 0.0);
			#elif defined(DOF) && DEBUG_COMPOSE == dofblur
				result = dBlur;
			#elif defined(SSAO_TEXTURE) && DEBUG_COMPOSE == ssao
				result = vec3(dSsao);
			#elif defined(VIGNETTE) && DEBUG_COMPOSE == vignette
				result = vec3(dVignette);
			#elif DEBUG_COMPOSE == depth
				float dDepth = getLinearScreenDepth(uv);
				result = vec3(clamp((dDepth - camera_params.z) / (camera_params.y - camera_params.z), 0.0, 1.0));
			#elif DEBUG_COMPOSE == depthmissing
				result = vec3(0.0);
			#endif
		#endif
		result = gammaCorrectOutput(result);
		gl_FragColor = vec4(result, scene.a);
	}
`,composeBloomPS:`
	#ifdef BLOOM
		uniform sampler2D bloomTexture;
		uniform float bloomIntensity;
		
		vec3 dBloom;
		
		vec3 applyBloom(vec3 color, vec2 uv) {
			dBloom = texture2DLod(bloomTexture, uv, 0.0).rgb;
			return color + dBloom * bloomIntensity;
		}
	#endif
`,composeDofPS:`
	#ifdef DOF
		uniform sampler2D cocTexture;
		uniform sampler2D blurTexture;
		
		vec2 dCoc;
		vec3 dBlur;
		vec3 getDofBlur(vec2 uv) {
			dCoc = texture2DLod(cocTexture, uv, 0.0).rg;
			#if DOF_UPSCALE
				vec2 blurTexelSize = 1.0 / vec2(textureSize(blurTexture, 0));
				vec3 bilinearBlur = vec3(0.0);
				float totalWeight = 0.0;
				for (int i = -1; i <= 1; i++) {
					for (int j = -1; j <= 1; j++) {
						vec2 offset = vec2(i, j) * blurTexelSize;
						vec2 cocSample = texture2DLod(cocTexture, uv + offset, 0.0).rg;
						vec3 blurSample = texture2DLod(blurTexture, uv + offset, 0.0).rgb;
						float cocWeight = clamp(cocSample.r + cocSample.g, 0.0, 1.0);
						bilinearBlur += blurSample * cocWeight;
						totalWeight += cocWeight;
					}
				}
				if (totalWeight > 0.0) {
					bilinearBlur /= totalWeight;
				}
				dBlur = bilinearBlur;
				return bilinearBlur;
			#else
				dBlur = texture2DLod(blurTexture, uv, 0.0).rgb;
				return dBlur;
			#endif
		}
		vec3 applyDof(vec3 color, vec2 uv) {
			vec3 blur = getDofBlur(uv);
			return mix(color, blur, dCoc.r + dCoc.g);
		}
	#endif
`,composeSsaoPS:`
	#ifdef SSAO
		#define SSAO_TEXTURE
	#endif
	#if DEBUG_COMPOSE == ssao
		#define SSAO_TEXTURE
	#endif
	#ifdef SSAO_TEXTURE
		uniform sampler2D ssaoTexture;
		
		float dSsao;
		
		vec3 applySsao(vec3 color, vec2 uv) {
			dSsao = texture2DLod(ssaoTexture, uv, 0.0).r;
			
			#ifdef SSAO
				return color * dSsao;
			#else
				return color;
			#endif
		}
	#endif
`,composeGradingPS:`
	#ifdef GRADING
		uniform vec3 brightnessContrastSaturation;
		uniform vec3 tint;
		vec3 colorGradingHDR(vec3 color, float brt, float sat, float con) {
			color *= tint;
			color = color * brt;
			float grey = dot(color, vec3(0.3, 0.59, 0.11));
			grey = grey / max(1.0, max(color.r, max(color.g, color.b)));
			color = mix(vec3(grey), color, sat);
			return mix(vec3(0.5), color, con);
		}
		vec3 applyGrading(vec3 color) {
			return colorGradingHDR(color, 
				brightnessContrastSaturation.x, 
				brightnessContrastSaturation.z, 
				brightnessContrastSaturation.y);
		}
	#endif
`,composeColorEnhancePS:`
	#ifdef COLOR_ENHANCE
		uniform vec4 colorEnhanceParams;
		uniform float colorEnhanceMidtones;
		vec3 applyColorEnhance(vec3 color) {
			float maxChannel = max(color.r, max(color.g, color.b));
			float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
			if (colorEnhanceParams.x != 0.0 || colorEnhanceParams.y != 0.0) {
				float logLum = log2(max(lum, 0.001)) / 10.0 + 0.5;
				logLum = clamp(logLum, 0.0, 1.0);
				float shadowWeight = pow(1.0 - logLum, 2.0);
				float highlightWeight = pow(logLum, 2.0);
				color *= pow(2.0, colorEnhanceParams.x * shadowWeight);
				color *= pow(2.0, colorEnhanceParams.y * highlightWeight);
			}
			if (colorEnhanceMidtones != 0.0) {
				const float pivot = 0.18;
				const float widthStops = 1.25;
				const float maxStops = 2.0;
				float y = max(dot(color, vec3(0.2126, 0.7152, 0.0722)), 1e-6);
				float d = log2(y / pivot);
				float w = exp(-(d * d) / (2.0 * widthStops * widthStops));
				float stops = colorEnhanceMidtones * maxStops * w;
				color *= exp2(stops);
			}
			if (colorEnhanceParams.z != 0.0) {
				float minChannel = min(color.r, min(color.g, color.b));
				maxChannel = max(color.r, max(color.g, color.b));
				float sat = (maxChannel - minChannel) / max(maxChannel, 0.001);
				lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
				float normalizedLum = lum / max(1.0, maxChannel);
				vec3 grey = vec3(normalizedLum) * maxChannel;
				float satBoost = colorEnhanceParams.z * (1.0 - sat);
				color = mix(grey, color, 1.0 + satBoost);
			}
			if (colorEnhanceParams.w != 0.0) {
				maxChannel = max(color.r, max(color.g, color.b));
				float scale = max(1.0, maxChannel);
				vec3 normalized = color / scale;
				float darkChannel = min(normalized.r, min(normalized.g, normalized.b));
				float atmosphericLight = 0.95;
				float t = 1.0 - colorEnhanceParams.w * darkChannel / atmosphericLight;
				t = max(t, 0.1);
				vec3 dehazed = (normalized - atmosphericLight) / t + atmosphericLight;
				color = dehazed * scale;
			}
			return max(vec3(0.0), color);
		}
	#endif
`,composeVignettePS:`
	#ifdef VIGNETTE
		uniform vec4 vignetterParams;
		uniform vec3 vignetteColor;
		
		float dVignette;
		
		float calcVignette(vec2 uv) {
			float inner = vignetterParams.x;
			float outer = vignetterParams.y;
			float curvature = vignetterParams.z;
			float intensity = vignetterParams.w;
			vec2 curve = pow(abs(uv * 2.0 -1.0), vec2(1.0 / curvature));
			float edge = pow(length(curve), curvature);
			dVignette = 1.0 - intensity * smoothstep(inner, outer, edge);
			return dVignette;
		}
		vec3 applyVignette(vec3 color, vec2 uv) {
			return mix(vignetteColor, color, calcVignette(uv));
		}
	#endif
`,composeFringingPS:`
	#ifdef FRINGING
		uniform float fringingIntensity;
		vec3 applyFringing(vec3 color, vec2 uv) {
			vec2 centerDistance = uv - 0.5;
			vec2 offset = fringingIntensity * centerDistance * centerDistance;
			color.r = texture2D(sceneTexture, uv - offset).r;
			color.b = texture2D(sceneTexture, uv + offset).b;
			return color;
		}
	#endif
`,composeCasPS:`
	#ifdef CAS
		uniform float sharpness;
		#ifdef CAS_HDR
			float maxComponent(float x, float y, float z) { return max(x, max(y, z)); }
			vec3 toSDR(vec3 c) { return c / (1.0 + maxComponent(c.r, c.g, c.b)); }
			vec3 toHDR(vec3 c) { return c / max(1.0 - maxComponent(c.r, c.g, c.b), 1e-4); }
		#else
			vec3 toSDR(vec3 c) { return c; }
			vec3 toHDR(vec3 c) { return c; }
		#endif
		vec3 applyCas(vec3 color, vec2 uv, float sharpness) {
			float x = sceneTextureInvRes.x;
			float y = sceneTextureInvRes.y;
			vec3 a = toSDR(texture2DLod(sceneTexture, uv + vec2(0.0, -y), 0.0).rgb);
			vec3 b = toSDR(texture2DLod(sceneTexture, uv + vec2(-x, 0.0), 0.0).rgb);
			vec3 c = toSDR(color.rgb);
			vec3 d = toSDR(texture2DLod(sceneTexture, uv + vec2(x, 0.0), 0.0).rgb);
			vec3 e = toSDR(texture2DLod(sceneTexture, uv + vec2(0.0, y), 0.0).rgb);
			float min_g = min(a.g, min(b.g, min(c.g, min(d.g, e.g))));
			float max_g = max(a.g, max(b.g, max(c.g, max(d.g, e.g))));
			float sharpening_amount = sqrt(min(1.0 - max_g, min_g) / max(max_g, 1e-4));
			float w = sharpening_amount * sharpness;
			vec3 res = (w * (a + b + d + e) + c) / (4.0 * w + 1.0);
			res = max(res, 0.0);
			return toHDR(res);
		}
	#endif
`,composeColorLutPS:`
	#ifdef COLOR_LUT
		const float COLOR_LUT_N = 16.0;
		const float COLOR_LUT_W = 256.0;
		const float COLOR_LUT_MAX = COLOR_LUT_N - 1.0;
		const float COLOR_LUT_HALF_PX_X = 0.5 / COLOR_LUT_W;
		const float COLOR_LUT_HALF_PX_Y = 0.5 / COLOR_LUT_N;
		const float COLOR_LUT_R_SCALE = COLOR_LUT_MAX / COLOR_LUT_W;
		const float COLOR_LUT_G_SCALE = COLOR_LUT_MAX / COLOR_LUT_N;
		const float COLOR_LUT_SLICE = 1.0 / COLOR_LUT_N;
		uniform vec3 colorLUTParams;
		uniform sampler2D colorLUT;
		#ifdef COLOR_LUT2
			uniform sampler2D colorLUT2;
		#endif
		vec3 sampleColorLUT(sampler2D lut, vec2 uv_l, vec2 uv_h, float t) {
			vec3 color_l = texture2DLod(lut, uv_l, 0.0).rgb;
			vec3 color_h = texture2DLod(lut, uv_h, 0.0).rgb;
			return mix(color_l, color_h, t);
		}
		vec3 applyColorLUT(vec3 color) {
			vec3 srgbCoord = pow(max(color, vec3(0.0)) + 0.0000001, vec3(1.0 / 2.2));
			vec3 c = clamp(srgbCoord, 0.0, 1.0);
			float cell = c.b * COLOR_LUT_MAX;
			float cell_l = floor(cell);
			float cell_h = ceil(cell);
			float t = fract(cell);
			float r_offset = COLOR_LUT_HALF_PX_X + c.r * COLOR_LUT_R_SCALE;
			float g_offset = COLOR_LUT_HALF_PX_Y + c.g * COLOR_LUT_G_SCALE;
			vec2 uv_l = vec2(cell_l * COLOR_LUT_SLICE + r_offset, g_offset);
			vec2 uv_h = vec2(cell_h * COLOR_LUT_SLICE + r_offset, g_offset);
			vec3 lut1 = sampleColorLUT(colorLUT, uv_l, uv_h, t);
			#ifdef COLOR_LUT2
				vec3 lut2 = sampleColorLUT(colorLUT2, uv_l, uv_h, t);
				float w1 = colorLUTParams.x * (1.0 - colorLUTParams.z);
				float w2 = colorLUTParams.y * colorLUTParams.z;
				return color + (lut1 - color) * w1 + (lut2 - color) * w2;
			#else
				return mix(color, lut1, colorLUTParams.x);
			#endif
		}
	#endif
`,composeDeclarationsPS:``,composeMainStartPS:``,composeMainEndPS:``},me={composePS:`
	#include "tonemappingPS"
	#include "gammaPS"
	varying uv0: vec2f;
	var sceneTexture: texture_2d<f32>;
	var sceneTextureSampler: sampler;
	uniform sceneTextureInvRes: vec2f;
	uniform composeTargetFlipY: f32;
	#include "composeBloomPS"
	#include "composeDofPS"
	#include "composeSsaoPS"
	#include "composeGradingPS"
	#include "composeColorEnhancePS"
	#include "composeVignettePS"
	#include "composeFringingPS"
	#include "composeCasPS"
	#include "composeColorLutPS"
	#if DEBUG_COMPOSE == depth
		#include "screenDepthPS"
	#endif
	#include "composeDeclarationsPS"
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		#include "composeMainStartPS"
		var output: FragmentOutput;
		var uv = vec2f(uv0.x, mix(uv0.y, 1.0 - uv0.y, uniform.composeTargetFlipY));
		let scene = textureSampleLevel(sceneTexture, sceneTextureSampler, uv, 0.0);
		var result = scene.rgb;
		#ifdef CAS
			result = applyCas(result, uv, uniform.sharpness);
		#endif
		#ifdef DOF
			result = applyDof(result, uv);
		#endif
		#ifdef SSAO_TEXTURE
			result = applySsao(result, uv);
		#endif
		#ifdef FRINGING
			result = applyFringing(result, uv);
		#endif
		#ifdef BLOOM
			result = applyBloom(result, uv);
		#endif
		#ifdef COLOR_ENHANCE
			result = applyColorEnhance(result);
		#endif
		#ifdef GRADING
			result = applyGrading(result);
		#endif
		result = toneMap(max(vec3f(0.0), result));
		#ifdef COLOR_LUT
			result = applyColorLUT(result);
		#endif
		#ifdef VIGNETTE
			result = applyVignette(result, uv);
		#endif
		#include "composeMainEndPS"
		#ifdef DEBUG_COMPOSE
			#if DEBUG_COMPOSE == scene
				result = scene.rgb;
			#elif defined(BLOOM) && DEBUG_COMPOSE == bloom
				result = dBloom * uniform.bloomIntensity;
			#elif defined(DOF) && DEBUG_COMPOSE == dofcoc
				result = vec3f(dCoc, 0.0);
			#elif defined(DOF) && DEBUG_COMPOSE == dofblur
				result = dBlur;
			#elif defined(SSAO_TEXTURE) && DEBUG_COMPOSE == ssao
				result = vec3f(dSsao);
			#elif defined(VIGNETTE) && DEBUG_COMPOSE == vignette
				result = vec3f(dVignette);
			#elif DEBUG_COMPOSE == depth
				let dDepth = getLinearScreenDepth(uv);
				result = vec3f(clamp((dDepth - uniform.camera_params.z) / (uniform.camera_params.y - uniform.camera_params.z), 0.0, 1.0));
			#elif DEBUG_COMPOSE == depthmissing
				result = vec3f(0.0);
			#endif
		#endif
		result = gammaCorrectOutput(result);
		output.color = vec4f(result, scene.a);
		return output;
	}
`,composeBloomPS:`
	#ifdef BLOOM
		var bloomTexture: texture_2d<f32>;
		var bloomTextureSampler: sampler;
		uniform bloomIntensity: f32;
		
		var<private> dBloom: vec3f;
		
		fn applyBloom(color: vec3f, uv: vec2f) -> vec3f {
			dBloom = textureSampleLevel(bloomTexture, bloomTextureSampler, uv, 0.0).rgb;
			return color + dBloom * uniform.bloomIntensity;
		}
	#endif
`,composeDofPS:`
	#ifdef DOF
		var cocTexture: texture_2d<f32>;
		var cocTextureSampler: sampler;
		var blurTexture: texture_2d<f32>;
		var blurTextureSampler: sampler;
		
		var<private> dCoc: vec2f;
		var<private> dBlur: vec3f;
		fn getDofBlur(uv: vec2f) -> vec3f {
			dCoc = textureSampleLevel(cocTexture, cocTextureSampler, uv, 0.0).rg;
			#if DOF_UPSCALE
				let blurTexelSize = 1.0 / vec2f(textureDimensions(blurTexture, 0));
				var bilinearBlur = vec3f(0.0);
				var totalWeight = 0.0;
				for (var i = -1; i <= 1; i++) {
					for (var j = -1; j <= 1; j++) {
						let offset = vec2f(f32(i), f32(j)) * blurTexelSize;
						let cocSample = textureSampleLevel(cocTexture, cocTextureSampler, uv + offset, 0.0).rg;
						let blurSample = textureSampleLevel(blurTexture, blurTextureSampler, uv + offset, 0.0).rgb;
						let cocWeight = clamp(cocSample.r + cocSample.g, 0.0, 1.0);
						bilinearBlur += blurSample * cocWeight;
						totalWeight += cocWeight;
					}
				}
				if (totalWeight > 0.0) {
					bilinearBlur /= totalWeight;
				}
				dBlur = bilinearBlur;
				return bilinearBlur;
			#else
				dBlur = textureSampleLevel(blurTexture, blurTextureSampler, uv, 0.0).rgb;
				return dBlur;
			#endif
		}
		fn applyDof(color: vec3f, uv: vec2f) -> vec3f {
			let blur = getDofBlur(uv);
			return mix(color, blur, dCoc.r + dCoc.g);
		}
	#endif
`,composeSsaoPS:`
	#ifdef SSAO
		#define SSAO_TEXTURE
	#endif
	#if DEBUG_COMPOSE == ssao
		#define SSAO_TEXTURE
	#endif
	#ifdef SSAO_TEXTURE
		var ssaoTexture: texture_2d<f32>;
		var ssaoTextureSampler: sampler;
		
		var<private> dSsao: f32;
		
		fn applySsao(color: vec3f, uv: vec2f) -> vec3f {
			dSsao = textureSampleLevel(ssaoTexture, ssaoTextureSampler, uv, 0.0).r;
			
			#ifdef SSAO
				return color * dSsao;
			#else
				return color;
			#endif
		}
	#endif
`,composeGradingPS:`
	#ifdef GRADING
		uniform brightnessContrastSaturation: vec3f;
		uniform tint: vec3f;
		fn colorGradingHDR(color: vec3f, brt: f32, sat: f32, con: f32) -> vec3f {
			var colorOut = color * uniform.tint;
			colorOut = colorOut * brt;
			let grey = dot(colorOut, vec3f(0.3, 0.59, 0.11));
			let normalizedGrey = grey / max(1.0, max(colorOut.r, max(colorOut.g, colorOut.b)));
			colorOut = mix(vec3f(normalizedGrey), colorOut, sat);
			return mix(vec3f(0.5), colorOut, con);
		}
		fn applyGrading(color: vec3f) -> vec3f {
			return colorGradingHDR(color, 
				uniform.brightnessContrastSaturation.x, 
				uniform.brightnessContrastSaturation.z, 
				uniform.brightnessContrastSaturation.y);
		}
	#endif
`,composeColorEnhancePS:`
	#ifdef COLOR_ENHANCE
		uniform colorEnhanceParams: vec4f;
		uniform colorEnhanceMidtones: f32;
		fn applyColorEnhance(color: vec3f) -> vec3f {
			var colorOut = color;
			var maxChannel = max(colorOut.r, max(colorOut.g, colorOut.b));
			var lum = dot(colorOut, vec3f(0.2126, 0.7152, 0.0722));
			if (uniform.colorEnhanceParams.x != 0.0 || uniform.colorEnhanceParams.y != 0.0) {
				var logLum = log2(max(lum, 0.001)) / 10.0 + 0.5;
				logLum = clamp(logLum, 0.0, 1.0);
				let shadowWeight = pow(1.0 - logLum, 2.0);
				let highlightWeight = pow(logLum, 2.0);
				colorOut *= pow(2.0, uniform.colorEnhanceParams.x * shadowWeight);
				colorOut *= pow(2.0, uniform.colorEnhanceParams.y * highlightWeight);
			}
			if (uniform.colorEnhanceMidtones != 0.0) {
				let pivot = 0.18;
				let widthStops = 1.25;
				let maxStops = 2.0;
				let y = max(dot(colorOut, vec3f(0.2126, 0.7152, 0.0722)), 1e-6);
				let d = log2(y / pivot);
				let w = exp(-(d * d) / (2.0 * widthStops * widthStops));
				let stops = uniform.colorEnhanceMidtones * maxStops * w;
				colorOut *= exp2(stops);
			}
			if (uniform.colorEnhanceParams.z != 0.0) {
				let minChannel = min(colorOut.r, min(colorOut.g, colorOut.b));
				maxChannel = max(colorOut.r, max(colorOut.g, colorOut.b));
				let sat = (maxChannel - minChannel) / max(maxChannel, 0.001);
				lum = dot(colorOut, vec3f(0.2126, 0.7152, 0.0722));
				let normalizedLum = lum / max(1.0, maxChannel);
				let grey = vec3f(normalizedLum) * maxChannel;
				let satBoost = uniform.colorEnhanceParams.z * (1.0 - sat);
				colorOut = mix(grey, colorOut, 1.0 + satBoost);
			}
			if (uniform.colorEnhanceParams.w != 0.0) {
				maxChannel = max(colorOut.r, max(colorOut.g, colorOut.b));
				let scale = max(1.0, maxChannel);
				let normalized = colorOut / scale;
				let darkChannel = min(normalized.r, min(normalized.g, normalized.b));
				let atmosphericLight = 0.95;
				var t = 1.0 - uniform.colorEnhanceParams.w * darkChannel / atmosphericLight;
				t = max(t, 0.1);
				let dehazed = (normalized - atmosphericLight) / t + atmosphericLight;
				colorOut = dehazed * scale;
			}
			return max(vec3f(0.0), colorOut);
		}
	#endif
`,composeVignettePS:`
	#ifdef VIGNETTE
		uniform vignetterParams: vec4f;
		uniform vignetteColor: vec3f;
		
		var<private> dVignette: f32;
		
		fn calcVignette(uv: vec2f) -> f32 {
			let inner = uniform.vignetterParams.x;
			let outer = uniform.vignetterParams.y;
			let curvature = uniform.vignetterParams.z;
			let intensity = uniform.vignetterParams.w;
			let curve = pow(abs(uv * 2.0 - 1.0), vec2f(1.0 / curvature));
			let edge = pow(length(curve), curvature);
			dVignette = 1.0 - intensity * smoothstep(inner, outer, edge);
			return dVignette;
		}
		fn applyVignette(color: vec3f, uv: vec2f) -> vec3f {
			return mix(uniform.vignetteColor, color, calcVignette(uv));
		}
	#endif
`,composeFringingPS:`
	#ifdef FRINGING
		uniform fringingIntensity: f32;
		fn applyFringing(color: vec3f, uv: vec2f) -> vec3f {
			let centerDistance = uv - 0.5;
			let offset = uniform.fringingIntensity * centerDistance * centerDistance;
			var colorOut = color;
			colorOut.r = textureSample(sceneTexture, sceneTextureSampler, uv - offset).r;
			colorOut.b = textureSample(sceneTexture, sceneTextureSampler, uv + offset).b;
			return colorOut;
		}
	#endif
`,composeCasPS:`
	#ifdef CAS
		uniform sharpness: f32;
		#ifdef CAS_HDR
			fn maxComponent(x: f32, y: f32, z: f32) -> f32 { return max(x, max(y, z)); }
			fn toSDR(c: vec3f) -> vec3f { return c / (1.0 + maxComponent(c.r, c.g, c.b)); }
			fn toHDR(c: vec3f) -> vec3f { return c / max(1.0 - maxComponent(c.r, c.g, c.b), 1e-4); }
		#else
			fn toSDR(c: vec3f) -> vec3f { return c; }
			fn toHDR(c: vec3f) -> vec3f { return c; }
		#endif
		fn applyCas(color: vec3f, uv: vec2f, sharpness: f32) -> vec3f {
			let x = uniform.sceneTextureInvRes.x;
			let y = uniform.sceneTextureInvRes.y;
			let a: half3 = half3(toSDR(textureSampleLevel(sceneTexture, sceneTextureSampler, uv + vec2f(0.0, -y), 0.0).rgb));
			let b: half3 = half3(toSDR(textureSampleLevel(sceneTexture, sceneTextureSampler, uv + vec2f(-x, 0.0), 0.0).rgb));
			let c: half3 = half3(toSDR(color.rgb));
			let d: half3 = half3(toSDR(textureSampleLevel(sceneTexture, sceneTextureSampler, uv + vec2f(x, 0.0), 0.0).rgb));
			let e: half3 = half3(toSDR(textureSampleLevel(sceneTexture, sceneTextureSampler, uv + vec2f(0.0, y), 0.0).rgb));
			let min_g = min(a.g, min(b.g, min(c.g, min(d.g, e.g))));
			let max_g = max(a.g, max(b.g, max(c.g, max(d.g, e.g))));
			let sharpening_amount = sqrt(min(half(1.0) - max_g, min_g) / max(max_g, half(1e-4)));
			let w = sharpening_amount * half(sharpness);
			var res = (w * (a + b + d + e) + c) / (half(4.0) * w + half(1.0));
			res = max(res, half3(0.0));
			return toHDR(vec3f(res));
		}
	#endif
`,composeColorLutPS:`
	#ifdef COLOR_LUT
		const COLOR_LUT_N: f32 = 16.0;
		const COLOR_LUT_W: f32 = 256.0;
		const COLOR_LUT_MAX: f32 = COLOR_LUT_N - 1.0;
		const COLOR_LUT_HALF_PX_X: f32 = 0.5 / COLOR_LUT_W;
		const COLOR_LUT_HALF_PX_Y: f32 = 0.5 / COLOR_LUT_N;
		const COLOR_LUT_R_SCALE: f32 = COLOR_LUT_MAX / COLOR_LUT_W;
		const COLOR_LUT_G_SCALE: f32 = COLOR_LUT_MAX / COLOR_LUT_N;
		const COLOR_LUT_SLICE: f32 = 1.0 / COLOR_LUT_N;
		uniform colorLUTParams: vec3f;
		var colorLUT: texture_2d<f32>;
		var colorLUTSampler: sampler;
		#ifdef COLOR_LUT2
			var colorLUT2: texture_2d<f32>;
			var colorLUT2Sampler: sampler;
		#endif
		fn sampleColorLUT(lut: texture_2d<f32>, lutSampler: sampler, uv_l: vec2f, uv_h: vec2f, t: f32) -> vec3f {
			let color_l: vec3f = textureSampleLevel(lut, lutSampler, uv_l, 0.0).rgb;
			let color_h: vec3f = textureSampleLevel(lut, lutSampler, uv_h, 0.0).rgb;
			return mix(color_l, color_h, vec3f(t));
		}
		fn applyColorLUT(color: vec3f) -> vec3f {
			let srgbCoord: vec3f = pow(max(color, vec3f(0.0)) + vec3f(0.0000001), vec3f(1.0 / 2.2));
			let c: vec3f = clamp(srgbCoord, vec3f(0.0), vec3f(1.0));
			let cell: f32 = c.b * COLOR_LUT_MAX;
			let cell_l: f32 = floor(cell);
			let cell_h: f32 = ceil(cell);
			let t: f32 = fract(cell);
			let r_offset: f32 = COLOR_LUT_HALF_PX_X + c.r * COLOR_LUT_R_SCALE;
			let g_offset: f32 = COLOR_LUT_HALF_PX_Y + c.g * COLOR_LUT_G_SCALE;
			let uv_l: vec2f = vec2f(cell_l * COLOR_LUT_SLICE + r_offset, g_offset);
			let uv_h: vec2f = vec2f(cell_h * COLOR_LUT_SLICE + r_offset, g_offset);
			let lut1: vec3f = sampleColorLUT(colorLUT, colorLUTSampler, uv_l, uv_h, t);
			#ifdef COLOR_LUT2
				let lut2: vec3f = sampleColorLUT(colorLUT2, colorLUT2Sampler, uv_l, uv_h, t);
				let w1: f32 = uniform.colorLUTParams.x * (1.0 - uniform.colorLUTParams.z);
				let w2: f32 = uniform.colorLUTParams.y * uniform.colorLUTParams.z;
				return color + (lut1 - color) * w1 + (lut2 - color) * w2;
			#else
				return mix(color, lut1, vec3f(uniform.colorLUTParams.x));
			#endif
		}
	#endif
`,composeDeclarationsPS:``,composeMainStartPS:``,composeMainEndPS:``},he=class extends M{constructor(e,t){super(e),x(this,`sceneTexture`,null),x(this,`bloomIntensity`,.01),x(this,`_bloomTexture`,null),x(this,`_cocTexture`,null),x(this,`blurTexture`,null),x(this,`blurTextureUpscale`,!1),x(this,`_ssaoTexture`,null),x(this,`_toneMapping`,0),x(this,`_gradingEnabled`,!1),x(this,`gradingSaturation`,1),x(this,`gradingContrast`,1),x(this,`gradingBrightness`,1),x(this,`gradingTint`,new S(1,1,1,1)),x(this,`_shaderDirty`,!0),x(this,`_vignetteEnabled`,!1),x(this,`vignetteInner`,.5),x(this,`vignetteOuter`,1),x(this,`vignetteCurvature`,.5),x(this,`vignetteIntensity`,.3),x(this,`vignetteColor`,new S(0,0,0)),x(this,`_fringingEnabled`,!1),x(this,`fringingIntensity`,10),x(this,`_colorEnhanceEnabled`,!1),x(this,`colorEnhanceShadows`,0),x(this,`colorEnhanceHighlights`,0),x(this,`colorEnhanceVibrance`,0),x(this,`colorEnhanceDehaze`,0),x(this,`colorEnhanceMidtones`,0),x(this,`_taaEnabled`,!1),x(this,`_hdrScene`,!0),x(this,`_sharpness`,.5),x(this,`_gammaCorrection`,1),x(this,`_colorLUT`,null),x(this,`_colorLUT2`,null),x(this,`colorLUTIntensity`,1),x(this,`colorLUT2Intensity`,1),x(this,`colorLUTBlend`,0),x(this,`_key`,``),x(this,`_debug`,null),x(this,`_sceneDepthAvailable`,!1),x(this,`_customComposeChunks`,new Map([[`composeDeclarationsPS`,``],[`composeMainStartPS`,``],[`composeMainEndPS`,``]])),this.cameraComponent=t,k.get(e,j).add(pe,!1),k.get(e,g).add(me,!1);let{scope:n}=e;this.sceneTextureId=n.resolve(`sceneTexture`),this.bloomTextureId=n.resolve(`bloomTexture`),this.cocTextureId=n.resolve(`cocTexture`),this.ssaoTextureId=n.resolve(`ssaoTexture`),this.blurTextureId=n.resolve(`blurTexture`),this.bloomIntensityId=n.resolve(`bloomIntensity`),this.bcsId=n.resolve(`brightnessContrastSaturation`),this.tintId=n.resolve(`tint`),this.vignetterParamsId=n.resolve(`vignetterParams`),this.vignetteColorId=n.resolve(`vignetteColor`),this.fringingIntensityId=n.resolve(`fringingIntensity`),this.sceneTextureInvResId=n.resolve(`sceneTextureInvRes`),this.sceneTextureInvResValue=new Float32Array(2),this.sharpnessId=n.resolve(`sharpness`),this.colorLUTId=n.resolve(`colorLUT`),this.colorLUT2Id=n.resolve(`colorLUT2`),this.colorLUTParams=new Float32Array(3),this.colorLUTParamsId=n.resolve(`colorLUTParams`),this.colorEnhanceParamsId=n.resolve(`colorEnhanceParams`),this.colorEnhanceMidtonesId=n.resolve(`colorEnhanceMidtones`),this.composeTargetFlipYId=n.resolve(`composeTargetFlipY`),this.cameraParams=new Float32Array(4),this.cameraParamsId=n.resolve(`camera_params`)}set debug(e){this._debug!==e&&(this._debug=e,this._shaderDirty=!0)}get debug(){return this._debug}set sceneDepthAvailable(e){this._sceneDepthAvailable!==e&&(this._sceneDepthAvailable=e,this._shaderDirty=!0)}get sceneDepthAvailable(){return this._sceneDepthAvailable}get _debugMode(){return this._debug===`depth`&&!this._sceneDepthAvailable?`depthmissing`:this._debug}set colorLUT(e){this._colorLUT!==e&&(this._colorLUT=e,this._shaderDirty=!0,this._validateColorLUT(e,`colorLUT`))}get colorLUT(){return this._colorLUT}set colorLUT2(e){this._colorLUT2!==e&&(this._colorLUT2=e,this._shaderDirty=!0,this._validateColorLUT(e,`colorLUT2`))}get colorLUT2(){return this._colorLUT2}_validateColorLUT(e,t){}set bloomTexture(e){this._bloomTexture!==e&&(this._bloomTexture=e,this._shaderDirty=!0)}get bloomTexture(){return this._bloomTexture}set cocTexture(e){this._cocTexture!==e&&(this._cocTexture=e,this._shaderDirty=!0)}get cocTexture(){return this._cocTexture}set ssaoTexture(e){this._ssaoTexture!==e&&(this._ssaoTexture=e,this._shaderDirty=!0)}get ssaoTexture(){return this._ssaoTexture}set taaEnabled(e){this._taaEnabled!==e&&(this._taaEnabled=e,this._shaderDirty=!0)}get taaEnabled(){return this._taaEnabled}set gradingEnabled(e){this._gradingEnabled!==e&&(this._gradingEnabled=e,this._shaderDirty=!0)}get gradingEnabled(){return this._gradingEnabled}set vignetteEnabled(e){this._vignetteEnabled!==e&&(this._vignetteEnabled=e,this._shaderDirty=!0)}get vignetteEnabled(){return this._vignetteEnabled}set fringingEnabled(e){this._fringingEnabled!==e&&(this._fringingEnabled=e,this._shaderDirty=!0)}get fringingEnabled(){return this._fringingEnabled}set colorEnhanceEnabled(e){this._colorEnhanceEnabled!==e&&(this._colorEnhanceEnabled=e,this._shaderDirty=!0)}get colorEnhanceEnabled(){return this._colorEnhanceEnabled}set toneMapping(e){this._toneMapping!==e&&(this._toneMapping=e,this._shaderDirty=!0)}get toneMapping(){return this._toneMapping}set sharpness(e){this._sharpness!==e&&(this._sharpness=e,this._shaderDirty=!0)}get sharpness(){return this._sharpness}get isSharpnessEnabled(){return this._sharpness>0}set hdrScene(e){this._hdrScene!==e&&(this._hdrScene=e,this._shaderDirty=!0)}get hdrScene(){return this._hdrScene}postInit(){this.setClearColor(S.BLACK),this.setClearDepth(1),this.setClearStencil(0)}frameUpdate(){let e=+!(this.renderTarget??this.device.backBuffer).isColorBufferSrgb(0);this._gammaCorrection!==e&&(this._gammaCorrection=e,this._shaderDirty=!0);let t=k.get(this.device,this.device.isWebGPU?g:j);for(let[e,n]of this._customComposeChunks.entries()){let r=t.get(e);r!==n&&(this._customComposeChunks.set(e,r),this._shaderDirty=!0)}if(this._shaderDirty){this._shaderDirty=!1;let e=ee[this._gammaCorrection],t=this._customComposeChunks,n=v(t.get(`composeDeclarationsPS`)??``),r=v(t.get(`composeMainStartPS`)??``),i=v(t.get(`composeMainEndPS`)??``),a=this._debugMode,o=new Map,s=a===`depth`?y.addScreenDepthChunkDefines(this.cameraComponent.shaderParams,o):``,c=`${this.toneMapping}-${e}-${this.bloomTexture?`bloom`:`nobloom`}-${this.cocTexture?`dof`:`nodof`}-${this.blurTextureUpscale?`dofupscale`:``}-${this.ssaoTexture?`ssao`:`nossao`}-${this.gradingEnabled?`grading`:`nograding`}-${this.colorEnhanceEnabled?`colorenhance`:`nocolorenhance`}-${this.colorLUT?`colorlut`:`nocolorlut`}-${this.colorLUT2?`colorlut2`:`nocolorlut2`}-${this.vignetteEnabled?`vignette`:`novignette`}-${this.fringingEnabled?`fringing`:`nofringing`}-${this.taaEnabled?`taa`:`notaa`}-${this.isSharpnessEnabled?this._hdrScene?`cashdr`:`cas`:`nocas`}-${a??``}${s}-decl${n}-start${r}-end${i}`;if(this._key!==c){this._key=c;let t=new Map;t.set(`TONEMAP`,ne[this.toneMapping]),t.set(`GAMMA`,e),this.bloomTexture&&t.set(`BLOOM`,!0),this.cocTexture&&t.set(`DOF`,!0),this.blurTextureUpscale&&t.set(`DOF_UPSCALE`,!0),this.ssaoTexture&&t.set(`SSAO`,!0),this.gradingEnabled&&t.set(`GRADING`,!0),this.colorEnhanceEnabled&&t.set(`COLOR_ENHANCE`,!0),this.colorLUT&&t.set(`COLOR_LUT`,!0),this.colorLUT&&this.colorLUT2&&t.set(`COLOR_LUT2`,!0),this.vignetteEnabled&&t.set(`VIGNETTE`,!0),this.fringingEnabled&&t.set(`FRINGING`,!0),this.taaEnabled&&t.set(`TAA`,!0),this.isSharpnessEnabled&&(t.set(`CAS`,!0),this._hdrScene&&t.set(`CAS_HDR`,!0)),a&&t.set(`DEBUG_COMPOSE`,a),o.forEach((e,n)=>t.set(n,e)),this.shader=y.createShader(this.device,{uniqueName:`ComposeShader-${c}`,attributes:{aPosition:m},vertexChunk:`quadVS`,fragmentChunk:`composePS`,fragmentDefines:t})}}}execute(){this._debugMode===`depth`&&this.cameraParamsId.setValue(this.cameraComponent.camera.fillShaderParams(this.cameraParams));let e=this.sceneTexture;this.sceneTextureId.setValue(e),this.sceneTextureInvResValue[0]=1/e.width,this.sceneTextureInvResValue[1]=1/e.height,this.sceneTextureInvResId.setValue(this.sceneTextureInvResValue),this.composeTargetFlipYId.setValue(+!!this.renderTarget?.flipY),this._bloomTexture&&(this.bloomTextureId.setValue(this._bloomTexture),this.bloomIntensityId.setValue(this.bloomIntensity)),this._cocTexture&&(this.cocTextureId.setValue(this._cocTexture),this.blurTextureId.setValue(this.blurTexture)),this._ssaoTexture&&this.ssaoTextureId.setValue(this._ssaoTexture),this._gradingEnabled&&(this.bcsId.setValue([this.gradingBrightness,this.gradingContrast,this.gradingSaturation]),this.tintId.setValue([this.gradingTint.r,this.gradingTint.g,this.gradingTint.b])),this._colorEnhanceEnabled&&(this.colorEnhanceParamsId.setValue([this.colorEnhanceShadows,this.colorEnhanceHighlights,this.colorEnhanceVibrance,this.colorEnhanceDehaze]),this.colorEnhanceMidtonesId.setValue(this.colorEnhanceMidtones));let n=this._colorLUT;n&&(this.colorLUTParams[0]=this.colorLUTIntensity,this.colorLUTParams[1]=this.colorLUT2Intensity,this.colorLUTParams[2]=this.colorLUTBlend,this.colorLUTParamsId.setValue(this.colorLUTParams),this.colorLUTId.setValue(n),this._colorLUT2&&this.colorLUT2Id.setValue(this._colorLUT2)),this._vignetteEnabled&&(this.vignetterParamsId.setValue([this.vignetteInner,this.vignetteOuter,this.vignetteCurvature,this.vignetteIntensity]),this.vignetteColorId.setValue([this.vignetteColor.r,this.vignetteColor.g,this.vignetteColor.b])),this._fringingEnabled&&this.fringingIntensityId.setValue(this.fringingIntensity/1024),this.isSharpnessEnabled&&this.sharpnessId.setValue(t.lerp(-.125,-.2,this.sharpness)),super.execute()}},ge=`
vec4 SampleTextureCatmullRom(TEXTURE_ACCEPT(tex), vec2 uv, vec2 texSize) {
	vec2 samplePos = uv * texSize;
	vec2 texPos1 = floor(samplePos - 0.5) + 0.5;
	vec2 f = samplePos - texPos1;
	vec2 w0 = f * (-0.5 + f * (1.0 - 0.5 * f));
	vec2 w1 = 1.0 + f * f * (-2.5 + 1.5 * f);
	vec2 w2 = f * (0.5 + f * (2.0 - 1.5 * f));
	vec2 w3 = f * f * (-0.5 + 0.5 * f);
	vec2 w12 = w1 + w2;
	vec2 offset12 = w2 / (w1 + w2);
	vec2 texPos0 = (texPos1 - 1.0) / texSize;
	vec2 texPos3 = (texPos1 + 2.0) / texSize;
	vec2 texPos12 = (texPos1 + offset12) / texSize;
	vec4 result = vec4(0.0);
	result += texture2DLod(tex, vec2(texPos0.x, texPos0.y), 0.0) * w0.x * w0.y;
	result += texture2DLod(tex, vec2(texPos12.x, texPos0.y), 0.0) * w12.x * w0.y;
	result += texture2DLod(tex, vec2(texPos3.x, texPos0.y), 0.0) * w3.x * w0.y;
	result += texture2DLod(tex, vec2(texPos0.x, texPos12.y), 0.0) * w0.x * w12.y;
	result += texture2DLod(tex, vec2(texPos12.x, texPos12.y), 0.0) * w12.x * w12.y;
	result += texture2DLod(tex, vec2(texPos3.x, texPos12.y), 0.0) * w3.x * w12.y;
	result += texture2DLod(tex, vec2(texPos0.x, texPos3.y), 0.0) * w0.x * w3.y;
	result += texture2DLod(tex, vec2(texPos12.x, texPos3.y), 0.0) * w12.x * w3.y;
	result += texture2DLod(tex, vec2(texPos3.x, texPos3.y), 0.0) * w3.x * w3.y;
	return result;
}
`,I=`
fn SampleTextureCatmullRom(tex: texture_2d<f32>, texSampler: sampler, uv: vec2f, texSize: vec2f) -> vec4f {
	let samplePos: vec2f = uv * texSize;
	let texPos1: vec2f = floor(samplePos - 0.5) + 0.5;
	let f: vec2f = samplePos - texPos1;
	let w0: vec2f = f * (-0.5 + f * (1.0 - 0.5 * f));
	let w1: vec2f = 1.0 + f * f * (-2.5 + 1.5 * f);
	let w2: vec2f = f * (0.5 + f * (2.0 - 1.5 * f));
	let w3: vec2f = f * f * (-0.5 + 0.5 * f);
	let w12: vec2f = w1 + w2;
	let offset12: vec2f = w2 / w12;
	let texPos0: vec2f = (texPos1 - 1.0) / texSize;
	let texPos3: vec2f = (texPos1 + 2.0) / texSize;
	let texPos12: vec2f = (texPos1 + offset12) / texSize;
	var result: vec4f = vec4f(0.0);
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos0.x, texPos0.y), 0.0) * w0.x * w0.y;
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos12.x, texPos0.y), 0.0) * w12.x * w0.y;
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos3.x, texPos0.y), 0.0) * w3.x * w0.y;
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos0.x, texPos12.y), 0.0) * w0.x * w12.y;
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos12.x, texPos12.y), 0.0) * w12.x * w12.y;
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos3.x, texPos12.y), 0.0) * w3.x * w12.y;
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos0.x, texPos3.y), 0.0) * w0.x * w3.y;
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos12.x, texPos3.y), 0.0) * w12.x * w3.y;
	result = result + textureSampleLevel(tex, texSampler, vec2f(texPos3.x, texPos3.y), 0.0) * w3.x * w3.y;
	return result;
}
`,L=`
	#include  "sampleCatmullRomPS"
	#include  "screenDepthPS"
	uniform sampler2D sourceTexture;
	uniform sampler2D historyTexture;
	uniform mat4 matrix_viewProjectionPrevious;
	uniform mat4 matrix_viewProjectionInverse;
	uniform vec4 jitters;
	uniform vec2 textureSize;
	varying vec2 uv0;
	vec2 reproject(vec2 uv, float depth) {
		depth = depth * 2.0 - 1.0;
		vec4 ndc = vec4(uv * 2.0 - 1.0, depth, 1.0);
		ndc.xy -= jitters.xy;
		vec4 worldPosition = matrix_viewProjectionInverse * ndc;
		worldPosition /= worldPosition.w;
		vec4 screenPrevious = matrix_viewProjectionPrevious * worldPosition;
		return (screenPrevious.xy / screenPrevious.w) * 0.5 + 0.5;
	}
	vec3 colorClampPremul(vec2 uv, vec3 historyPremul) {
		vec3 minPremul = vec3(9999.0);
		vec3 maxPremul = vec3(-9999.0);
		for(float x = -1.0; x <= 1.0; ++x) {
			for(float y = -1.0; y <= 1.0; ++y) {
				vec4 s = texture2D(sourceTexture, uv + vec2(x, y) / textureSize);
				vec3 premul = s.rgb * s.a;
				minPremul = min(minPremul, premul);
				maxPremul = max(maxPremul, premul);
			}
		}
		return clamp(historyPremul, minPremul, maxPremul);
	}
	void main()
	{
		vec4 srcColor = texture2D(sourceTexture, uv0);
		float linearDepth = getLinearScreenDepth(uv0);
		float depth = delinearizeDepth(linearDepth);
		vec2 historyUv = reproject(uv0, depth);
		#ifdef QUALITY_HIGH
			vec4 historySample = SampleTextureCatmullRom(TEXTURE_PASS(historyTexture), historyUv, textureSize);
		#else
			vec4 historySample = texture2D(historyTexture, historyUv);
		#endif
		vec3 historyPremul = historySample.rgb * historySample.a;
		vec3 srcPremul = srcColor.rgb * srcColor.a;
		vec3 historyPremulClamped = colorClampPremul(uv0, historyPremul);
		float mixFactor = (historyUv.x < 0.0 || historyUv.x > 1.0 || historyUv.y < 0.0 || historyUv.y > 1.0) ?
			1.0 : 0.05;
		vec3 mixedPremul = mix(historyPremulClamped, srcPremul, mixFactor);
		float a = srcColor.a;
		const float UNPREMUL_EPS = 1.0 / 255.0;
		vec3 rgbStraight = (a > UNPREMUL_EPS) ? (mixedPremul / a) : srcColor.rgb;
		gl_FragColor = vec4(rgbStraight, a);
	}
`,_e=`
	#include "sampleCatmullRomPS"
	#include "screenDepthPS"
	var sourceTexture: texture_2d<f32>;
	var sourceTextureSampler: sampler;
	var historyTexture: texture_2d<f32>;
	var historyTextureSampler: sampler;
	uniform matrix_viewProjectionPrevious: mat4x4f;
	uniform matrix_viewProjectionInverse: mat4x4f;
	uniform jitters: vec4f;
	uniform textureSize: vec2f;
	varying uv0: vec2f;
	fn reproject(uv_in: vec2f, depth: f32) -> vec2f {
		var uv = vec2f(uv_in.x, 1.0 - uv_in.y);
		var ndc = vec4f(uv * 2.0 - 1.0, depth, 1.0);
		ndc = vec4f(ndc.xy - uniform.jitters.xy, ndc.zw);
		var worldPosition = uniform.matrix_viewProjectionInverse * ndc;
		worldPosition = worldPosition / worldPosition.w;
		let screenPrevious = uniform.matrix_viewProjectionPrevious * worldPosition;
		var result = (screenPrevious.xy / screenPrevious.w) * 0.5 + 0.5;
		result.y = 1.0 - result.y;
		return result;
	}
	fn colorClampPremul(uv: vec2f, historyPremul: vec3f) -> vec3f {
		var minPremul = vec3f(9999.0);
		var maxPremul = vec3f(-9999.0);
		for (var ix: i32 = -1; ix <= 1; ix = ix + 1) {
			for (var iy: i32 = -1; iy <= 1; iy = iy + 1) {
				let s = textureSample(sourceTexture, sourceTextureSampler, uv + vec2f(f32(ix), f32(iy)) / uniform.textureSize);
				let premul = s.rgb * s.a;
				minPremul = min(minPremul, premul);
				maxPremul = max(maxPremul, premul);
			}
		}
		return clamp(historyPremul, minPremul, maxPremul);
	}
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		var output: FragmentOutput;
		let srcColor = textureSample(sourceTexture, sourceTextureSampler, uv0);
		let linearDepth = getLinearScreenDepth(uv0);
		let depth = delinearizeDepth(linearDepth);
		let historyUv = reproject(uv0, depth);
		#ifdef QUALITY_HIGH
			var historySample: vec4f = SampleTextureCatmullRom(historyTexture, historyTextureSampler, historyUv, uniform.textureSize);
		#else
			var historySample: vec4f = textureSample(historyTexture, historyTextureSampler, historyUv);
		#endif
		let historyPremul = historySample.rgb * historySample.a;
		let srcPremul = srcColor.rgb * srcColor.a;
		let historyPremulClamped = colorClampPremul(uv0, historyPremul);
		let mixFactor_condition = historyUv.x < 0.0 || historyUv.x > 1.0 || historyUv.y < 0.0 || historyUv.y > 1.0;
		let mixFactor = select(0.05, 1.0, mixFactor_condition);
		let mixedPremul = mix(historyPremulClamped, srcPremul, mixFactor);
		let a = srcColor.a;
		let UNPREMUL_EPS = 1.0 / 255.0;
		let rgbStraight = select(srcColor.rgb, mixedPremul / a, a > UNPREMUL_EPS);
		output.color = vec4f(rgbStraight, a);
		return output;
	}
`,ve=class extends M{constructor(e,t,n){super(e),x(this,`historyIndex`,0),x(this,`historyTexture`,null),x(this,`historyTextures`,[]),x(this,`historyRenderTargets`,[]),this.sourceTexture=t,this.cameraComponent=n,k.get(e,j).set(`sampleCatmullRomPS`,ge),k.get(e,g).set(`sampleCatmullRomPS`,I),k.get(e,j).set(`taaResolvePS`,L),k.get(e,g).set(`taaResolvePS`,_e);let r=new Map;r.set(`QUALITY_HIGH`,!0);let i=y.addScreenDepthChunkDefines(n.shaderParams,r);this.shader=y.createShader(e,{uniqueName:`TaaResolveShader${i}`,attributes:{aPosition:m},vertexChunk:`quadVS`,fragmentChunk:`taaResolvePS`,fragmentDefines:r});let{scope:a}=e;this.sourceTextureId=a.resolve(`sourceTexture`),this.textureSizeId=a.resolve(`textureSize`),this.textureSize=new Float32Array(2),this.historyTextureId=a.resolve(`historyTexture`),this.viewProjPrevId=a.resolve(`matrix_viewProjectionPrevious`),this.viewProjInvId=a.resolve(`matrix_viewProjectionInverse`),this.jittersId=a.resolve(`jitters`),this.cameraParams=new Float32Array(4),this.cameraParamsId=a.resolve(`camera_params`),this.setup()}destroy(){this.renderTarget&&(this.renderTarget.destroyTextureBuffers(),this.renderTarget.destroy(),this.renderTarget=null)}setup(){for(let e=0;e<2;++e)this.historyTextures[e]=new b(this.device,{name:`TAA-History-${e}`,width:4,height:4,format:this.sourceTexture.format,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1}),this.historyRenderTargets[e]=new C({colorBuffer:this.historyTextures[e],depth:!1});this.historyTexture=this.historyTextures[0],this.init(this.historyRenderTargets[0],{resizeSource:this.sourceTexture})}before(){this.sourceTextureId.setValue(this.sourceTexture),this.historyTextureId.setValue(this.historyTextures[1-this.historyIndex]),this.textureSize[0]=this.sourceTexture.width,this.textureSize[1]=this.sourceTexture.height,this.textureSizeId.setValue(this.textureSize);let e=this.cameraComponent.camera;this.viewProjPrevId.setValue(e._viewProjPrevious.data),this.viewProjInvId.setValue(e._viewProjInverse.data),this.jittersId.setValue(e._jitters),this.cameraParamsId.setValue(e.fillShaderParams(this.cameraParams))}update(){return this.historyIndex=1-this.historyIndex,this.historyTexture=this.historyTextures[this.historyIndex],this.renderTarget=this.historyRenderTargets[this.historyIndex],this.historyTexture}},ye=`
	#include "screenDepthPS"
	varying vec2 uv0;
	uniform vec3 params;
	void main()
	{
		float depth = getLinearScreenDepth(uv0);
		float focusDistance = params.x;
		float focusRange = params.y;
		float invRange = params.z;
		float farRange = focusDistance + focusRange * 0.5;
		
		float cocFar = min((depth - farRange) * invRange, 1.0);
		#ifdef NEAR_BLUR
			float nearRange = focusDistance - focusRange * 0.5;
			float cocNear = min((nearRange - depth) * invRange, 1.0);
		#else
			float cocNear = 0.0;
		#endif
		gl_FragColor = vec4(cocFar, cocNear, 0.0, 0.0);
	}
`,be=`
#include "screenDepthPS"
varying uv0: vec2f;
uniform params: vec3f;
@fragment
fn fragmentMain(input: FragmentInput) -> FragmentOutput {
	var output: FragmentOutput;
	let depth: f32 = getLinearScreenDepth(uv0);
	let focusDistance: f32 = uniform.params.x;
	let focusRange: f32 = uniform.params.y;
	let invRange: f32 = uniform.params.z;
	let farRange: f32 = focusDistance + focusRange * 0.5;
	let cocFar: f32 = min((depth - farRange) * invRange, 1.0);
	#ifdef NEAR_BLUR
		let nearRange: f32 = focusDistance - focusRange * 0.5;
		var cocNear: f32 = min((nearRange - depth) * invRange, 1.0);
	#else
		var cocNear: f32 = 0.0;
	#endif
	output.color = vec4f(cocFar, cocNear, 0.0, 0.0);
	return output;
}
`,xe=class extends M{constructor(e,t,n){super(e),x(this,`focusDistance`,void 0),x(this,`focusRange`,void 0),this.cameraComponent=t,k.get(e,j).set(`cocPS`,ye),k.get(e,g).set(`cocPS`,be);let r=new Map;n&&r.set(`NEAR_BLUR`,``);let i=y.addScreenDepthChunkDefines(t.shaderParams,r);this.shader=y.createShader(e,{uniqueName:`CocShader-${n}${i}`,attributes:{aPosition:m},vertexChunk:`quadVS`,fragmentChunk:`cocPS`,fragmentDefines:r}),this.paramsId=e.scope.resolve(`params`),this.paramsValue=new Float32Array(3),this.cameraParams=new Float32Array(4),this.cameraParamsId=e.scope.resolve(`camera_params`)}execute(){let{paramsValue:e,focusRange:t}=this;e[0]=this.focusDistance+.001,e[1]=t,e[2]=1/t,this.paramsId.setValue(e);let n=this.cameraComponent.camera;this.cameraParamsId.setValue(n.fillShaderParams(this.cameraParams)),super.execute()}},Se=`
	#if defined(NEAR_BLUR)
		uniform sampler2D nearTexture;
	#endif
	uniform sampler2D farTexture;
	uniform sampler2D cocTexture;
	uniform vec2 kernel[{KERNEL_COUNT}];
	uniform float blurRadiusNear;
	uniform float blurRadiusFar;
	varying vec2 uv0;
	void main()
	{
		vec2 coc = texture2D(cocTexture, uv0).rg;
		float cocFar = coc.r;
		vec3 sum = vec3(0.0, 0.0, 0.0);
		#if defined(NEAR_BLUR)
			float cocNear = coc.g;
			if (cocNear > 0.0001) {
				vec2 nearTextureSize = vec2(textureSize(nearTexture, 0));
				vec2 step = cocNear * blurRadiusNear * vec2(nearTextureSize.y / nearTextureSize.x, 1.0);
				for (int i = 0; i < {KERNEL_COUNT}; i++) {
					vec2 uv = uv0 + step * kernel[i];
					vec3 tap = texture2DLod(nearTexture, uv, 0.0).rgb;
					sum += tap.rgb;
				}
				sum *= float({INV_KERNEL_COUNT});
			} else
		#endif
			
			if (cocFar > 0.0001) {
			vec2 farTextureSize = vec2(textureSize(farTexture, 0));
			vec2 step = cocFar * blurRadiusFar * vec2(farTextureSize.y / farTextureSize.x, 1.0);
			float sumCoC = 0.0; 
			for (int i = 0; i < {KERNEL_COUNT}; i++) {
				vec2 uv = uv0 + step * kernel[i];
				vec3 tap = texture2DLod(farTexture, uv, 0.0).rgb;
				float cocThis = texture2DLod(cocTexture, uv, 0.0).r;
				tap *= cocThis;
				sumCoC += cocThis;
				sum += tap;
			}
			if (sumCoC > 0.0)
				sum /= sumCoC;
			sum /= cocFar;
		}
		pcFragColor0 = vec4(sum, 1.0);
	}
`,Ce=`
#if defined(NEAR_BLUR)
	var nearTexture: texture_2d<f32>;
	var nearTextureSampler: sampler;
#endif
var farTexture: texture_2d<f32>;
var farTextureSampler: sampler;
var cocTexture: texture_2d<f32>;
var cocTextureSampler: sampler;
uniform kernel: array<vec2f, {KERNEL_COUNT}>;
uniform blurRadiusNear: f32;
uniform blurRadiusFar: f32;
varying uv0: vec2f;
@fragment
fn fragmentMain(input: FragmentInput) -> FragmentOutput {
	var output: FragmentOutput;
	let coc: vec2f = textureSample(cocTexture, cocTextureSampler, input.uv0).rg;
	let cocFar: f32 = coc.r;
	var sum: vec3f = vec3f(0.0, 0.0, 0.0);
	#if defined(NEAR_BLUR)
		let cocNear: f32 = coc.g;
		if (cocNear > 0.0001) {
			let nearTextureSize: vec2f = vec2f(textureDimensions(nearTexture, 0));
			let step: vec2f = cocNear * uniform.blurRadiusNear * vec2f(nearTextureSize.y / nearTextureSize.x, 1.0);
			for (var i: i32 = 0; i < {KERNEL_COUNT}; i = i + 1) {
				let uv: vec2f = uv0 + step * uniform.kernel[i].element;
				let tap: vec3f = textureSampleLevel(nearTexture, nearTextureSampler, uv, 0.0).rgb;
				sum = sum + tap;
			}
			sum = sum * f32({INV_KERNEL_COUNT});
		} else
	#endif
		if (cocFar > 0.0001) {
			let farTextureSize: vec2f = vec2f(textureDimensions(farTexture, 0));
			let step: vec2f = cocFar * uniform.blurRadiusFar * vec2f(farTextureSize.y / farTextureSize.x, 1.0);
			var sumCoC: f32 = 0.0;
			for (var i: i32 = 0; i < {KERNEL_COUNT}; i = i + 1) {
				let uv: vec2f = uv0 + step * uniform.kernel[i].element;
				var tap: vec3f = textureSampleLevel(farTexture, farTextureSampler, uv, 0.0).rgb;
				let cocThis: f32 = textureSampleLevel(cocTexture, cocTextureSampler, uv, 0.0).r;
				tap = tap * cocThis;
				sumCoC = sumCoC + cocThis;
				sum = sum + tap;
			}
			if (sumCoC > 0.0) {
				sum = sum / sumCoC;
			}
			sum = sum / cocFar;
		}
	output.color = vec4f(sum, 1.0);
	return output;
}
`,we=class extends M{constructor(e,t,n,r){super(e),x(this,`blurRadiusNear`,1),x(this,`blurRadiusFar`,1),x(this,`_blurRings`,3),x(this,`_blurRingPoints`,3),x(this,`referenceHeight`,540),this.nearTexture=t,this.farTexture=n,this.cocTexture=r,k.get(e,j).set(`dofBlurPS`,Se),k.get(e,g).set(`dofBlurPS`,Ce);let{scope:i}=e;this.kernelId=i.resolve(`kernel[0]`),this.kernelCountId=i.resolve(`kernelCount`),this.blurRadiusNearId=i.resolve(`blurRadiusNear`),this.blurRadiusFarId=i.resolve(`blurRadiusFar`),this.nearTextureId=i.resolve(`nearTexture`),this.farTextureId=i.resolve(`farTexture`),this.cocTextureId=i.resolve(`cocTexture`)}set blurRings(e){this._blurRings!==e&&(this._blurRings=e,this.shader=null)}get blurRings(){return this._blurRings}set blurRingPoints(e){this._blurRingPoints!==e&&(this._blurRingPoints=e,this.shader=null)}get blurRingPoints(){return this._blurRingPoints}createShader(){this.kernel=new Float32Array(oe.concentric(this.blurRings,this.blurRingPoints));let e=this.kernel.length>>1,t=this.nearTexture!==null,n=new Map;n.set(`{KERNEL_COUNT}`,e),n.set(`{INV_KERNEL_COUNT}`,1/e),t&&n.set(`NEAR_BLUR`,``),this.shader=y.createShader(this.device,{uniqueName:`DofBlurShader-${e}-${t?`nearBlur`:`noNearBlur`}`,attributes:{aPosition:m},vertexChunk:`quadVS`,fragmentChunk:`dofBlurPS`,fragmentDefines:n})}execute(){this.shader||this.createShader(),this.nearTextureId.setValue(this.nearTexture),this.farTextureId.setValue(this.farTexture),this.cocTextureId.setValue(this.cocTexture),this.kernelId.setValue(this.kernel),this.kernelCountId.setValue(this.kernel.length>>1);let e=1/(this.referenceHeight>0?this.referenceHeight:540);this.blurRadiusNearId.setValue(this.blurRadiusNear*e),this.blurRadiusFarId.setValue(this.blurRadiusFar*e),super.execute()}},Te=class extends _{constructor(e,t,n,r,i,a){super(e),x(this,`focusDistance`,100),x(this,`focusRange`,50),x(this,`blurRadius`,1),x(this,`blurRings`,3),x(this,`blurRingPoints`,3),x(this,`highQuality`,!0),x(this,`cocTexture`,null),x(this,`blurTexture`,null),x(this,`cocPass`,null),x(this,`farPass`,null),x(this,`blurPass`,null),this.highQuality=i,this.cocPass=this.setupCocPass(e,t,n,a),this.beforePasses.push(this.cocPass);let o=i?n:r;this.farPass=this.setupFarPass(e,o,.5),this.beforePasses.push(this.farPass),this.blurPass=this.setupBlurPass(e,r,a,i?2:.5),this.beforePasses.push(this.blurPass)}destroy(){this.destroyRenderPasses(),this.cocPass=null,this.farPass=null,this.blurPass=null,this.destroyRT(this.cocRT),this.destroyRT(this.farRt),this.destroyRT(this.blurRt),this.cocRT=null,this.farRt=null,this.blurRt=null}destroyRenderPasses(){for(let e=0;e<this.beforePasses.length;e++)this.beforePasses[e].destroy();this.beforePasses.length=0}destroyRT(e){e&&(e.destroyTextureBuffers(),e.destroy())}setupCocPass(e,t,n,r){let i=r?53:52;this.cocRT=this.createRenderTarget(`CoCTexture`,i),this.cocTexture=this.cocRT.colorBuffer;let a=new xe(e,t,r);return a.init(this.cocRT,{resizeSource:n}),a.setClearColor(S.BLACK),a}setupFarPass(e,t,n){this.farRt=this.createRenderTarget(`FarDofTexture`,t.format);let r=new F(e,t,{boxFilter:!0,premultiplyTexture:this.cocTexture,premultiplySrcChannel:`r`});return r.init(this.farRt,{resizeSource:t,scaleX:n,scaleY:n}),r.setClearColor(S.BLACK),r}setupBlurPass(e,t,n,r){let i=this.farRt?.colorBuffer;this.blurRt=this.createRenderTarget(`DofBlurTexture`,t.format),this.blurTexture=this.blurRt.colorBuffer;let a=new we(e,n?t:null,i,this.cocTexture);return a.init(this.blurRt,{resizeSource:t,scaleX:r,scaleY:r}),a.setClearColor(S.BLACK),a}createTexture(e,t){return new b(this.device,{name:e,width:1,height:1,format:t,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1})}createRenderTarget(e,t){return new C({colorBuffer:this.createTexture(e,t),depth:!1,stencil:!1})}frameUpdate(){super.frameUpdate(),this.cocPass.focusDistance=this.focusDistance,this.cocPass.focusRange=this.focusRange,this.blurPass.blurRadiusNear=this.blurRadius,this.blurPass.blurRadiusFar=this.blurRadius,this.blurPass.blurRings=this.blurRings,this.blurPass.blurRingPoints=this.blurRingPoints}},Ee=`
	#include "screenDepthPS"
	varying vec2 uv0;
	uniform vec3 uFogCameraPos;
	uniform vec3 uFogCameraFwd;
	uniform mat4 uFogInvView;
	uniform vec2 uFogProjScale;
	uniform vec3 uFogTint;
	uniform vec3 uFogLightColor;
	uniform vec3 uFogLightDir;
	uniform vec3 uFogAmbient;
	uniform vec4 uFogParams;
	uniform vec4 uFogScatterParams;
	uniform float uFogExtinction;
	#ifdef FOG_SHADOWS
		uniform mat4 uFogShadowMatrixPalette[4];
		uniform vec4 uFogShadowCascadeDistances;
		uniform vec4 uFogShadowParams;
		#ifdef FOG_SHADOW_PCF
			uniform sampler2DShadow uFogShadowMap;
		#else
			uniform sampler2D uFogShadowMap;
		#endif
		float sampleFogShadow(vec3 worldPos, float viewDepth) {
			if (viewDepth >= uFogShadowParams.w) return 1.0;
			vec4 comparisons = step(uFogShadowCascadeDistances, vec4(viewDepth));
			int cascadeIndex = int(min(dot(comparisons, vec4(1.0)), uFogShadowParams.x - 1.0));
			vec3 shadowCoord = (uFogShadowMatrixPalette[cascadeIndex] * vec4(worldPos, 1.0)).xyz;
			float z = shadowCoord.z - uFogShadowParams.y;
			#ifdef FOG_SHADOW_PCF
				return textureShadow(uFogShadowMap, vec3(shadowCoord.xy, z));
			#else
				return step(z, texture2D(uFogShadowMap, shadowCoord.xy).r);
			#endif
		}
	#endif
	float fogNoise(vec2 fragCoord) {
		const vec3 magic = vec3(0.06711056, 0.00583715, 52.9829189);
		return fract(magic.z * fract(dot(fragCoord, magic.xy)));
	}
	float fogPhase(float cosTheta, float g) {
		float g2 = g * g;
		float denom = 1.0 + g2 - 2.0 * g * cosTheta;
		return (1.0 - g2) / (12.56637 * denom * sqrt(denom));
	}
	void main() {
		vec2 ndcUV = uv0;
		#ifdef WEBGPU
			ndcUV.y = 1.0 - ndcUV.y;
		#endif
		vec2 ndc = ndcUV * 2.0 - 1.0;
		vec3 rayDir = normalize((uFogInvView * vec4(ndc * uFogProjScale, -1.0, 0.0)).xyz);
		float rayDot = max(dot(rayDir, uFogCameraFwd), 0.001);
		float rayLength = min(getLinearScreenDepth(uv0) / rayDot, uFogParams.w);
		float stepCount = uFogScatterParams.y;
		float dt = rayLength / stepCount;
		float noise = fract(fogNoise(gl_FragCoord.xy) + uFogScatterParams.z);
		vec3 sunLight = uFogLightColor * fogPhase(dot(rayDir, uFogLightDir), uFogScatterParams.x);
		vec3 inscatter = vec3(0.0);
		float transmittance = 1.0;
		for (float i = 0.0; i < stepCount; i += 1.0) {
			float t = (i + noise) * dt;
			vec3 pos = uFogCameraPos + rayDir * t;
			float density = uFogParams.x * exp(-uFogParams.z * max(pos.y - uFogParams.y, 0.0));
			float shadow = 1.0;
			#ifdef FOG_SHADOWS
				shadow = mix(1.0, sampleFogShadow(pos, t * rayDot), uFogScatterParams.w);
			#endif
			vec3 radiance = sunLight * shadow + uFogAmbient;
			inscatter += transmittance * uFogTint * radiance * (density * dt);
			transmittance *= exp(-uFogExtinction * density * dt);
			if (transmittance < 0.005) break;
		}
		gl_FragColor = vec4(inscatter, transmittance);
	}
`,De=`
	#include "screenDepthPS"
	varying uv0: vec2f;
	uniform uFogCameraPos: vec3f;
	uniform uFogCameraFwd: vec3f;
	uniform uFogInvView: mat4x4f;
	uniform uFogProjScale: vec2f;
	uniform uFogTint: vec3f;
	uniform uFogLightColor: vec3f;
	uniform uFogLightDir: vec3f;
	uniform uFogAmbient: vec3f;
	uniform uFogParams: vec4f;
	uniform uFogScatterParams: vec4f;
	uniform uFogExtinction: f32;
	#ifdef FOG_SHADOWS
		uniform uFogShadowMatrixPalette: array<mat4x4f, 4>;
		uniform uFogShadowCascadeDistances: vec4f;
		uniform uFogShadowParams: vec4f;
		#ifdef FOG_SHADOW_PCF
			var uFogShadowMap: texture_depth_2d;
			var uFogShadowMapSampler: sampler_comparison;
		#else
			var uFogShadowMap: texture_2d<f32>;
			var uFogShadowMapSampler: sampler;
		#endif
		fn sampleFogShadow(worldPos: vec3f, viewDepth: f32) -> f32 {
			if (viewDepth >= uniform.uFogShadowParams.w) {
				return 1.0;
			}
			let comparisons: vec4f = step(uniform.uFogShadowCascadeDistances, vec4f(viewDepth));
			let cascadeIndex: i32 = i32(min(dot(comparisons, vec4f(1.0)), uniform.uFogShadowParams.x - 1.0));
			let shadowCoord: vec3f = (uniform.uFogShadowMatrixPalette[cascadeIndex] * vec4f(worldPos, 1.0)).xyz;
			let z: f32 = shadowCoord.z - uniform.uFogShadowParams.y;
			#ifdef FOG_SHADOW_PCF
				return textureSampleCompareLevel(uFogShadowMap, uFogShadowMapSampler, shadowCoord.xy, z);
			#else
				return step(z, textureSampleLevel(uFogShadowMap, uFogShadowMapSampler, shadowCoord.xy, 0.0).r);
			#endif
		}
	#endif
	fn fogNoise(fragCoord: vec2f) -> f32 {
		const magic: vec3f = vec3f(0.06711056, 0.00583715, 52.9829189);
		return fract(magic.z * fract(dot(fragCoord, magic.xy)));
	}
	fn fogPhase(cosTheta: f32, g: f32) -> f32 {
		let g2: f32 = g * g;
		let denom: f32 = 1.0 + g2 - 2.0 * g * cosTheta;
		return (1.0 - g2) / (12.56637 * denom * sqrt(denom));
	}
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		var output: FragmentOutput;
		let ndcUV: vec2f = vec2f(input.uv0.x, 1.0 - input.uv0.y);
		let ndc: vec2f = ndcUV * 2.0 - 1.0;
		let rayDir: vec3f = normalize((uniform.uFogInvView * vec4f(ndc * uniform.uFogProjScale, -1.0, 0.0)).xyz);
		let rayDot: f32 = max(dot(rayDir, uniform.uFogCameraFwd), 0.001);
		let rayLength: f32 = min(getLinearScreenDepth(input.uv0) / rayDot, uniform.uFogParams.w);
		let stepCount: f32 = uniform.uFogScatterParams.y;
		let dt: f32 = rayLength / stepCount;
		let noise: f32 = fract(fogNoise(pcPosition.xy) + uniform.uFogScatterParams.z);
		let sunLight: vec3f = uniform.uFogLightColor * fogPhase(dot(rayDir, uniform.uFogLightDir), uniform.uFogScatterParams.x);
		var inscatter: vec3f = vec3f(0.0);
		var transmittance: f32 = 1.0;
		for (var i: f32 = 0.0; i < stepCount; i += 1.0) {
			let t: f32 = (i + noise) * dt;
			let pos: vec3f = uniform.uFogCameraPos + rayDir * t;
			let density: f32 = uniform.uFogParams.x * exp(-uniform.uFogParams.z * max(pos.y - uniform.uFogParams.y, 0.0));
			var shadow: f32 = 1.0;
			#ifdef FOG_SHADOWS
				shadow = mix(1.0, sampleFogShadow(pos, t * rayDot), uniform.uFogScatterParams.w);
			#endif
			let radiance: vec3f = sunLight * shadow + uniform.uFogAmbient;
			inscatter += transmittance * uniform.uFogTint * radiance * (density * dt);
			transmittance *= exp(-uniform.uFogExtinction * density * dt);
			if (transmittance < 0.005) {
				break;
			}
		}
		output.color = vec4f(inscatter, transmittance);
		return output;
	}
`,Oe=`
	#include "screenDepthPS"
	varying vec2 uv0;
	uniform sampler2D uFogTexture;
	uniform vec4 uFogTextureSize;
	void main() {
		float depth = getLinearScreenDepth(uv0);
		vec2 texel = uv0 * uFogTextureSize.xy - 0.5;
		vec2 base = (floor(texel) + 0.5) * uFogTextureSize.zw;
		vec2 f = fract(texel);
		vec2 uvs[4];
		uvs[0] = base;
		uvs[1] = base + vec2(uFogTextureSize.z, 0.0);
		uvs[2] = base + vec2(0.0, uFogTextureSize.w);
		uvs[3] = base + uFogTextureSize.zw;
		vec4 bilinear = vec4((1.0 - f.x) * (1.0 - f.y), f.x * (1.0 - f.y), (1.0 - f.x) * f.y, f.x * f.y);
		vec4 sum = vec4(0.0);
		float sumWeight = 0.0;
		for (int i = 0; i < 4; i++) {
			float sampleDepth = getLinearScreenDepth(uvs[i]);
			float w = bilinear[i] / (1.0 + 16.0 * abs(sampleDepth - depth) / max(depth, 0.001));
			sum += texture2D(uFogTexture, uvs[i]) * w;
			sumWeight += w;
		}
		gl_FragColor = sum / max(sumWeight, 0.0001);
	}
`,ke=`
	#include "screenDepthPS"
	varying uv0: vec2f;
	var uFogTexture: texture_2d<f32>;
	var uFogTextureSampler: sampler;
	uniform uFogTextureSize: vec4f;
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		var output: FragmentOutput;
		let depth: f32 = getLinearScreenDepth(input.uv0);
		let texel: vec2f = input.uv0 * uniform.uFogTextureSize.xy - 0.5;
		let base: vec2f = (floor(texel) + 0.5) * uniform.uFogTextureSize.zw;
		let f: vec2f = fract(texel);
		var uvs: array<vec2f, 4>;
		uvs[0] = base;
		uvs[1] = base + vec2f(uniform.uFogTextureSize.z, 0.0);
		uvs[2] = base + vec2f(0.0, uniform.uFogTextureSize.w);
		uvs[3] = base + uniform.uFogTextureSize.zw;
		let bilinear: vec4f = vec4f((1.0 - f.x) * (1.0 - f.y), f.x * (1.0 - f.y), (1.0 - f.x) * f.y, f.x * f.y);
		var sum: vec4f = vec4f(0.0);
		var sumWeight: f32 = 0.0;
		for (var i: i32 = 0; i < 4; i += 1) {
			let sampleDepth: f32 = getLinearScreenDepth(uvs[i]);
			let w: f32 = bilinear[i] / (1.0 + 16.0 * abs(sampleDepth - depth) / max(depth, 0.001));
			sum += textureSampleLevel(uFogTexture, uFogTextureSampler, uvs[i], 0.0) * w;
			sumWeight += w;
		}
		output.color = sum / max(sumWeight, 0.0001);
		return output;
	}
`,Ae=`
	#include "screenDepthPS"
	#include "clusteredLightUtilsPS"
	float square(float x) {
		return x * x;
	}
	float saturate(float x) {
		return clamp(x, 0.0, 1.0);
	}
	#include "falloffInvSquaredPS"
	#include "falloffLinearPS"
	#include "spotPS"
	#ifdef VOL_COOKIES
		#include "clusteredLightCookiesPS"
	#endif
	varying vec2 uv0;
	uniform vec3 uVolCameraPos;
	uniform vec3 uVolCameraFwd;
	uniform mat4 uVolInvView;
	uniform vec2 uVolProjScale;
	uniform vec3 uVolTint;
	uniform vec4 uVolFogParams;
	uniform vec4 uVolMarchParams;
	uniform vec4 uVolLightPosRange;
	uniform vec4 uVolLightSphere;
	uniform vec3 uVolLightColor;
	uniform vec4 uVolLightDir;
	uniform vec4 uVolLightSpot;
	uniform vec4 uVolLightAtten;
	#if defined(VOL_SHADOWS) || defined(VOL_COOKIES)
		uniform mat4 uVolLightProjMatrix;
		uniform vec4 uVolLightAtlas;
		uniform vec2 shadowAtlasParams;
	#endif
	#ifdef VOL_SHADOWS
		uniform sampler2DShadow shadowAtlasTexture;
		float volSampleShadow(vec3 pos, vec3 lightVec, float spiral) {
			vec2 tapOffset = vec2(cos(spiral), sin(spiral)) / shadowAtlasParams.x;
			if (uVolLightDir.w > 0.0) {
				vec4 projPos = uVolLightProjMatrix * vec4(pos, 1.0);
				vec3 shadowCoord = projPos.xyz / projPos.w;
				return textureShadow(shadowAtlasTexture, vec3(shadowCoord.xy + tapOffset, shadowCoord.z));
			}
			vec2 uv = getCubemapAtlasCoordinates(uVolLightAtlas.xyz, shadowAtlasParams.y, shadowAtlasParams.x, lightVec);
			float shadowZ = length(lightVec) / uVolLightPosRange.w + uVolLightAtlas.w;
			return textureShadow(shadowAtlasTexture, vec3(uv + tapOffset, shadowZ));
		}
	#endif
	#ifdef VOL_COOKIES
		uniform sampler2D cookieAtlasTexture;
		uniform vec4 uVolLightCookieChannel;
		vec3 volSampleCookie(vec3 pos, vec3 lightVec) {
			if (uVolLightDir.w > 0.0) {
				return getCookie2DClustered(TEXTURE_PASS(cookieAtlasTexture), uVolLightProjMatrix, pos,
					uVolLightSpot.w, uVolLightCookieChannel);
			}
			return getCookieCubeClustered(TEXTURE_PASS(cookieAtlasTexture), lightVec, uVolLightSpot.w,
				uVolLightCookieChannel, shadowAtlasParams.x, shadowAtlasParams.y, uVolLightAtlas.xyz);
		}
	#endif
	float fogNoise(vec2 fragCoord) {
		const vec3 magic = vec3(0.06711056, 0.00583715, 52.9829189);
		return fract(magic.z * fract(dot(fragCoord, magic.xy)));
	}
	float fogPhase(float cosTheta, float g) {
		float g2 = g * g;
		float denom = 1.0 + g2 - 2.0 * g * cosTheta;
		return (1.0 - g2) / (12.56637 * denom * sqrt(denom));
	}
	float volFogSegmentDepth(float s0, float s1, float h0, float rayDirY) {
		if (s1 <= s0) return 0.0;
		float density = uVolFogParams.x;
		float falloff = uVolFogParams.z;
		float hMid = h0 + rayDirY * (s0 + s1) * 0.5;
		if (hMid <= 0.0) {
			return density * (s1 - s0);
		}
		float scale = falloff * rayDirY;
		if (abs(scale) < 1e-6) {
			return density * exp(-falloff * hMid) * (s1 - s0);
		}
		return density * (exp(-falloff * (h0 + rayDirY * s0)) - exp(-falloff * (h0 + rayDirY * s1))) / scale;
	}
	vec2 volClipCone(vec2 span, float root, float gradient, float axial) {
		if (axial < 0.0) return span;
		return gradient > 0.0 ? vec2(max(span.x, root), span.y) : vec2(span.x, min(span.y, root));
	}
	float volFogOpticalDepth(float t, float rayDirY) {
		float h0 = uVolCameraPos.y - uVolFogParams.y;
		float sCross = abs(rayDirY) > 1e-6 ? clamp(-h0 / rayDirY, 0.0, t) : 0.0;
		float depth = volFogSegmentDepth(0.0, sCross, h0, rayDirY) +
					  volFogSegmentDepth(sCross, t, h0, rayDirY);
		return depth * uVolMarchParams.w;
	}
	void main() {
		vec2 ndcUV = uv0;
		#ifdef WEBGPU
			ndcUV.y = 1.0 - ndcUV.y;
		#endif
		vec2 ndc = ndcUV * 2.0 - 1.0;
		vec3 rayDir = normalize((uVolInvView * vec4(ndc * uVolProjScale, -1.0, 0.0)).xyz);
		float rayDot = max(dot(rayDir, uVolCameraFwd), 0.001);
		float sceneT = min(getLinearScreenDepth(uv0) / rayDot, uVolFogParams.w);
		vec3 sphereToCam = uVolCameraPos - uVolLightSphere.xyz;
		float halfB = dot(sphereToCam, rayDir);
		float c = dot(sphereToCam, sphereToCam) - uVolLightSphere.w * uVolLightSphere.w;
		float discriminant = halfB * halfB - c;
		if (discriminant <= 0.0) discard;
		float rootOffset = sqrt(discriminant);
		float t0 = max(-halfB - rootOffset, 0.0);
		float t1 = min(-halfB + rootOffset, sceneT);
		if (uVolLightDir.w > 0.0) {
			vec3 apexToCam = uVolCameraPos - uVolLightPosRange.xyz;
			float axisStart = dot(apexToCam, uVolLightDir.xyz);
			float axisRate = dot(rayDir, uVolLightDir.xyz);
			if (abs(axisRate) > 1e-6) {
				float tApex = -axisStart / axisRate;
				float tRange = (uVolLightPosRange.w - axisStart) / axisRate;
				t0 = max(t0, min(tApex, tRange));
				t1 = min(t1, max(tApex, tRange));
			} else if (axisStart < 0.0 || axisStart > uVolLightPosRange.w) {
				discard;
			}
			float cosSqr = uVolLightSpot.y * uVolLightSpot.y;
			float qa = axisRate * axisRate - cosSqr;
			float qb = axisRate * axisStart - cosSqr * dot(rayDir, apexToCam);
			float qc = axisStart * axisStart - cosSqr * dot(apexToCam, apexToCam);
			vec2 span = vec2(t0, t1);
			if (abs(qa) > 1e-6) {
				float discriminantCone = qb * qb - qa * qc;
				if (discriminantCone > 0.0) {
					float rootOffsetCone = sqrt(discriminantCone);
					float rootA = (-qb - rootOffsetCone) / qa;
					float rootB = (-qb + rootOffsetCone) / qa;
					span = volClipCone(span, rootA, qa * rootA + qb, axisStart + rootA * axisRate);
					span = volClipCone(span, rootB, qa * rootB + qb, axisStart + rootB * axisRate);
				}
			} else if (abs(qb) > 1e-6) {
				float root = -0.5 * qc / qb;
				span = volClipCone(span, root, qb, axisStart + root * axisRate);
			}
			t0 = span.x;
			t1 = span.y;
		}
		if (t1 <= t0) discard;
		float stepCount = uVolMarchParams.y;
		float dt = (t1 - t0) / stepCount;
		float noise = fract(fogNoise(gl_FragCoord.xy) + uVolMarchParams.z);
		vec3 inscatter = vec3(0.0);
		for (float i = 0.0; i < stepCount; i += 1.0) {
			float t = t0 + (i + noise) * dt;
			vec3 pos = uVolCameraPos + rayDir * t;
			float density = uVolFogParams.x * exp(-uVolFogParams.z * max(pos.y - uVolFogParams.y, 0.0));
			vec3 lightVec = pos - uVolLightPosRange.xyz;
			vec3 lightDirNorm = normalize(lightVec);
			float atten = uVolLightAtten.x > 0.0 ?
				getFalloffLinear(uVolLightPosRange.w, lightVec) :
				getFalloffInvSquared(uVolLightPosRange.w, lightVec);
			if (uVolLightDir.w > 0.0) {
				atten *= getSpotEffect(uVolLightDir.xyz, uVolLightSpot.x, uVolLightSpot.y, lightDirNorm);
			}
			if (atten > 0.00001) {
				#ifdef VOL_SHADOWS
					if (uVolLightSpot.z > 0.0) {
						float spiral = (i + noise) * 2.39996;
						atten *= mix(1.0, volSampleShadow(pos, lightVec, spiral), uVolLightSpot.z);
					}
				#endif
				vec3 radiance = uVolLightColor;
				#ifdef VOL_COOKIES
					if (uVolLightSpot.w > 0.0) {
						radiance *= volSampleCookie(pos, lightVec);
					}
				#endif
				float transmittance = exp(-volFogOpticalDepth(t, rayDir.y));
				float phase = fogPhase(dot(rayDir, -lightDirNorm), uVolMarchParams.x);
				inscatter += transmittance * uVolTint * radiance * (atten * phase * density * dt);
			}
		}
		gl_FragColor = vec4(inscatter, 1.0);
	}
`,je=`
	#include "screenDepthPS"
	#include "clusteredLightUtilsPS"
	fn square(x: f32) -> f32 {
		return x * x;
	}
	#include "falloffInvSquaredPS"
	#include "falloffLinearPS"
	#include "spotPS"
	#ifdef VOL_COOKIES
		#include "clusteredLightCookiesPS"
	#endif
	varying uv0: vec2f;
	uniform uVolCameraPos: vec3f;
	uniform uVolCameraFwd: vec3f;
	uniform uVolInvView: mat4x4f;
	uniform uVolProjScale: vec2f;
	uniform uVolTint: vec3f;
	uniform uVolFogParams: vec4f;
	uniform uVolMarchParams: vec4f;
	uniform uVolLightPosRange: vec4f;
	uniform uVolLightSphere: vec4f;
	uniform uVolLightColor: vec3f;
	uniform uVolLightDir: vec4f;
	uniform uVolLightSpot: vec4f;
	uniform uVolLightAtten: vec4f;
	#if defined(VOL_SHADOWS) || defined(VOL_COOKIES)
		uniform uVolLightProjMatrix: mat4x4f;
		uniform uVolLightAtlas: vec4f;
		uniform shadowAtlasParams: vec2f;
	#endif
	#ifdef VOL_SHADOWS
		var shadowAtlasTexture: texture_depth_2d;
		var shadowAtlasTextureSampler: sampler_comparison;
		fn volSampleShadow(pos: vec3f, lightVec: vec3f, spiral: f32) -> f32 {
			let tapOffset: vec2f = vec2f(cos(spiral), sin(spiral)) / uniform.shadowAtlasParams.x;
			if (uniform.uVolLightDir.w > 0.0) {
				let projPos: vec4f = uniform.uVolLightProjMatrix * vec4f(pos, 1.0);
				let shadowCoord: vec3f = projPos.xyz / projPos.w;
				return textureSampleCompareLevel(shadowAtlasTexture, shadowAtlasTextureSampler, shadowCoord.xy + tapOffset, shadowCoord.z);
			}
			let uv: vec2f = getCubemapAtlasCoordinates(uniform.uVolLightAtlas.xyz, uniform.shadowAtlasParams.y, uniform.shadowAtlasParams.x, lightVec);
			let shadowZ: f32 = length(lightVec) / uniform.uVolLightPosRange.w + uniform.uVolLightAtlas.w;
			return textureSampleCompareLevel(shadowAtlasTexture, shadowAtlasTextureSampler, uv + tapOffset, shadowZ);
		}
	#endif
	#ifdef VOL_COOKIES
		var cookieAtlasTexture: texture_2d<f32>;
		var cookieAtlasTextureSampler: sampler;
		uniform uVolLightCookieChannel: vec4f;
		fn volSampleCookie(pos: vec3f, lightVec: vec3f) -> vec3f {
			if (uniform.uVolLightDir.w > 0.0) {
				return getCookie2DClustered(cookieAtlasTexture, cookieAtlasTextureSampler, uniform.uVolLightProjMatrix,
					pos, uniform.uVolLightSpot.w, uniform.uVolLightCookieChannel);
			}
			return getCookieCubeClustered(cookieAtlasTexture, cookieAtlasTextureSampler, lightVec,
				uniform.uVolLightSpot.w, uniform.uVolLightCookieChannel, uniform.shadowAtlasParams.x,
				uniform.shadowAtlasParams.y, uniform.uVolLightAtlas.xyz);
		}
	#endif
	fn fogNoise(fragCoord: vec2f) -> f32 {
		const magic: vec3f = vec3f(0.06711056, 0.00583715, 52.9829189);
		return fract(magic.z * fract(dot(fragCoord, magic.xy)));
	}
	fn fogPhase(cosTheta: f32, g: f32) -> f32 {
		let g2: f32 = g * g;
		let denom: f32 = 1.0 + g2 - 2.0 * g * cosTheta;
		return (1.0 - g2) / (12.56637 * denom * sqrt(denom));
	}
	fn volFogSegmentDepth(s0: f32, s1: f32, h0: f32, rayDirY: f32) -> f32 {
		if (s1 <= s0) {
			return 0.0;
		}
		let density: f32 = uniform.uVolFogParams.x;
		let falloff: f32 = uniform.uVolFogParams.z;
		let hMid: f32 = h0 + rayDirY * (s0 + s1) * 0.5;
		if (hMid <= 0.0) {
			return density * (s1 - s0);
		}
		let scale: f32 = falloff * rayDirY;
		if (abs(scale) < 1e-6) {
			return density * exp(-falloff * hMid) * (s1 - s0);
		}
		return density * (exp(-falloff * (h0 + rayDirY * s0)) - exp(-falloff * (h0 + rayDirY * s1))) / scale;
	}
	fn volClipCone(span: vec2f, root: f32, gradient: f32, axial: f32) -> vec2f {
		if (axial < 0.0) {
			return span;
		}
		if (gradient > 0.0) {
			return vec2f(max(span.x, root), span.y);
		}
		return vec2f(span.x, min(span.y, root));
	}
	fn volFogOpticalDepth(t: f32, rayDirY: f32) -> f32 {
		let h0: f32 = uniform.uVolCameraPos.y - uniform.uVolFogParams.y;
		var sCross: f32 = 0.0;
		if (abs(rayDirY) > 1e-6) {
			sCross = clamp(-h0 / rayDirY, 0.0, t);
		}
		let depth: f32 = volFogSegmentDepth(0.0, sCross, h0, rayDirY) +
						volFogSegmentDepth(sCross, t, h0, rayDirY);
		return depth * uniform.uVolMarchParams.w;
	}
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		var output: FragmentOutput;
		let ndcUV: vec2f = vec2f(input.uv0.x, 1.0 - input.uv0.y);
		let ndc: vec2f = ndcUV * 2.0 - 1.0;
		let rayDir: vec3f = normalize((uniform.uVolInvView * vec4f(ndc * uniform.uVolProjScale, -1.0, 0.0)).xyz);
		let rayDot: f32 = max(dot(rayDir, uniform.uVolCameraFwd), 0.001);
		let sceneT: f32 = min(getLinearScreenDepth(input.uv0) / rayDot, uniform.uVolFogParams.w);
		let sphereToCam: vec3f = uniform.uVolCameraPos - uniform.uVolLightSphere.xyz;
		let halfB: f32 = dot(sphereToCam, rayDir);
		let c: f32 = dot(sphereToCam, sphereToCam) - uniform.uVolLightSphere.w * uniform.uVolLightSphere.w;
		let discriminant: f32 = halfB * halfB - c;
		if (discriminant <= 0.0) {
			discard;
			return output;
		}
		let rootOffset: f32 = sqrt(discriminant);
		var t0: f32 = max(-halfB - rootOffset, 0.0);
		var t1: f32 = min(-halfB + rootOffset, sceneT);
		if (uniform.uVolLightDir.w > 0.0) {
			let apexToCam: vec3f = uniform.uVolCameraPos - uniform.uVolLightPosRange.xyz;
			let axisStart: f32 = dot(apexToCam, uniform.uVolLightDir.xyz);
			let axisRate: f32 = dot(rayDir, uniform.uVolLightDir.xyz);
			if (abs(axisRate) > 1e-6) {
				let tApex: f32 = -axisStart / axisRate;
				let tRange: f32 = (uniform.uVolLightPosRange.w - axisStart) / axisRate;
				t0 = max(t0, min(tApex, tRange));
				t1 = min(t1, max(tApex, tRange));
			} else if (axisStart < 0.0 || axisStart > uniform.uVolLightPosRange.w) {
				discard;
				return output;
			}
			let cosSqr: f32 = uniform.uVolLightSpot.y * uniform.uVolLightSpot.y;
			let qa: f32 = axisRate * axisRate - cosSqr;
			let qb: f32 = axisRate * axisStart - cosSqr * dot(rayDir, apexToCam);
			let qc: f32 = axisStart * axisStart - cosSqr * dot(apexToCam, apexToCam);
			var span: vec2f = vec2f(t0, t1);
			if (abs(qa) > 1e-6) {
				let discriminantCone: f32 = qb * qb - qa * qc;
				if (discriminantCone > 0.0) {
					let rootOffsetCone: f32 = sqrt(discriminantCone);
					let rootA: f32 = (-qb - rootOffsetCone) / qa;
					let rootB: f32 = (-qb + rootOffsetCone) / qa;
					span = volClipCone(span, rootA, qa * rootA + qb, axisStart + rootA * axisRate);
					span = volClipCone(span, rootB, qa * rootB + qb, axisStart + rootB * axisRate);
				}
			} else if (abs(qb) > 1e-6) {
				let root: f32 = -0.5 * qc / qb;
				span = volClipCone(span, root, qb, axisStart + root * axisRate);
			}
			t0 = span.x;
			t1 = span.y;
		}
		if (t1 <= t0) {
			discard;
			return output;
		}
		let stepCount: f32 = uniform.uVolMarchParams.y;
		let dt: f32 = (t1 - t0) / stepCount;
		let noise: f32 = fract(fogNoise(pcPosition.xy) + uniform.uVolMarchParams.z);
		var inscatter: vec3f = vec3f(0.0);
		for (var i: f32 = 0.0; i < stepCount; i += 1.0) {
			let t: f32 = t0 + (i + noise) * dt;
			let pos: vec3f = uniform.uVolCameraPos + rayDir * t;
			let density: f32 = uniform.uVolFogParams.x * exp(-uniform.uVolFogParams.z * max(pos.y - uniform.uVolFogParams.y, 0.0));
			let lightVec: vec3f = pos - uniform.uVolLightPosRange.xyz;
			let lightDirNorm: vec3f = normalize(lightVec);
			var atten: f32 = select(
				getFalloffInvSquared(uniform.uVolLightPosRange.w, lightVec),
				getFalloffLinear(uniform.uVolLightPosRange.w, lightVec),
				uniform.uVolLightAtten.x > 0.0);
			if (uniform.uVolLightDir.w > 0.0) {
				atten = atten * getSpotEffect(uniform.uVolLightDir.xyz, uniform.uVolLightSpot.x, uniform.uVolLightSpot.y, lightDirNorm);
			}
			if (atten > 0.00001) {
				#ifdef VOL_SHADOWS
					if (uniform.uVolLightSpot.z > 0.0) {
						let spiral: f32 = (i + noise) * 2.39996;
						atten = atten * mix(1.0, volSampleShadow(pos, lightVec, spiral), uniform.uVolLightSpot.z);
					}
				#endif
				var radiance: vec3f = uniform.uVolLightColor;
				#ifdef VOL_COOKIES
					if (uniform.uVolLightSpot.w > 0.0) {
						radiance = radiance * volSampleCookie(pos, lightVec);
					}
				#endif
				let transmittance: f32 = exp(-volFogOpticalDepth(t, rayDir.y));
				let phase: f32 = fogPhase(dot(rayDir, -lightDirNorm), uniform.uVolMarchParams.x);
				inscatter += transmittance * uniform.uVolTint * radiance * (atten * phase * density * dt);
			}
		}
		output.color = vec4f(inscatter, 1.0);
		return output;
	}
`,Me=`
	attribute vec2 aPosition;
	uniform vec4 uVolLightRect;
	varying vec2 uv0;
	void main(void)
	{
		vec2 ndc = mix(uVolLightRect.xy, uVolLightRect.zw, aPosition * 0.5 + 0.5);
		gl_Position = vec4(ndc, 0.0, 1.0);
		uv0 = getImageEffectUV(ndc * 0.5 + 0.5);
	}
`,Ne=`
	attribute aPosition: vec2f;
	uniform uVolLightRect: vec4f;
	varying uv0: vec2f;
	@vertex fn vertexMain(input: VertexInput) -> VertexOutput {
		var output: VertexOutput;
		let ndc: vec2f = mix(uniform.uVolLightRect.xy, uniform.uVolLightRect.zw, input.aPosition * 0.5 + 0.5);
		output.position = vec4f(ndc, 0.0, 1.0);
		output.uv0 = getImageEffectUV(ndc * 0.5 + 0.5);
		return output;
	}
`,R=new r,z=new r,B=new c,V=new l,H=new l,U=new l,W={rrr:[1,0,0,0],ggg:[0,1,0,0],bbb:[0,0,1,0],aaa:[0,0,0,1],rgb:[1,1,1,0]},Pe=[0,0,0,0],Fe=class extends M{constructor(e,t){super(e),x(this,`light`,null),x(this,`shadowsEnabled`,!1),x(this,`lightRenderData`,null),x(this,`tint`,new S(1,1,1)),x(this,`density`,.01),x(this,`heightBase`,0),x(this,`heightFalloff`,.05),x(this,`extinction`,1),x(this,`anisotropy`,.6),x(this,`intensity`,1),x(this,`ambientColor`,new S(1,1,1)),x(this,`ambientIntensity`,.02),x(this,`maxDistance`,300),x(this,`steps`,24),x(this,`noiseOffset`,0),x(this,`exposure`,1),x(this,`_variantKey`,null),this.cameraComponent=t;let n=e.scope;this.cameraPosId=n.resolve(`uFogCameraPos`),this.cameraFwdId=n.resolve(`uFogCameraFwd`),this.invViewId=n.resolve(`uFogInvView`),this.projScaleId=n.resolve(`uFogProjScale`),this.tintId=n.resolve(`uFogTint`),this.lightColorId=n.resolve(`uFogLightColor`),this.lightDirId=n.resolve(`uFogLightDir`),this.ambientId=n.resolve(`uFogAmbient`),this.fogParamsId=n.resolve(`uFogParams`),this.scatterParamsId=n.resolve(`uFogScatterParams`),this.extinctionId=n.resolve(`uFogExtinction`),this.shadowMapId=n.resolve(`uFogShadowMap`),this.shadowMatrixPaletteId=n.resolve(`uFogShadowMatrixPalette[0]`),this.shadowCascadeDistancesId=n.resolve(`uFogShadowCascadeDistances`),this.shadowParamsId=n.resolve(`uFogShadowParams`),this._cameraPos=new Float32Array(3),this._cameraFwd=new Float32Array(3),this._projScale=new Float32Array(2),this._tint=new Float32Array(3),this._lightColor=new Float32Array(3),this._lightDir=new Float32Array(3),this._ambient=new Float32Array(3),this._fogParams=new Float32Array(4),this._scatterParams=new Float32Array(4),this._shadowParams=new Float32Array(4)}updateShaderVariant(e,t){let n=`${e}-${t}${y.getScreenDepthChunkKey(this.cameraComponent.shaderParams)}`;if(this._variantKey!==n){this._variantKey=n;let r=new Map;y.addScreenDepthChunkDefines(this.cameraComponent.shaderParams,r),e&&r.set(`FOG_SHADOWS`,``),t&&r.set(`FOG_SHADOW_PCF`,``),this.shader=y.createShader(this.device,{uniqueName:`VolumetricFogShader-${n}`,attributes:{aPosition:m},vertexChunk:`quadVS`,fragmentChunk:`volumetricFogPS`,fragmentDefines:r})}}execute(){let{light:e}=this,t=this.cameraComponent.camera,n=t._node;this.invViewId.setValue(n.getWorldTransform().data);let r=n.getPosition();this._cameraPos[0]=r.x,this._cameraPos[1]=r.y,this._cameraPos[2]=r.z,this.cameraPosId.setValue(this._cameraPos);let i=n.forward;this._cameraFwd[0]=i.x,this._cameraFwd[1]=i.y,this._cameraFwd[2]=i.z,this.cameraFwdId.setValue(this._cameraFwd);let a=t.projectionMatrix.data;this._projScale[0]=1/a[0],this._projScale[1]=1/a[5],this.projScaleId.setValue(this._projScale);let o=this.intensity*this.exposure;if(e){e._node.getWorldTransform().getY(R).normalize(),this._lightDir[0]=R.x,this._lightDir[1]=R.y,this._lightDir[2]=R.z;let t=e._colorLinear;this._lightColor[0]=t[0]*o,this._lightColor[1]=t[1]*o,this._lightColor[2]=t[2]*o}else this._lightDir[0]=0,this._lightDir[1]=1,this._lightDir[2]=0,this._lightColor[0]=0,this._lightColor[1]=0,this._lightColor[2]=0;if(this.lightDirId.setValue(this._lightDir),this.lightColorId.setValue(this._lightColor),this.shadowsEnabled&&e&&this.lightRenderData){let t=this.lightRenderData,n=e._getUniformBiasValues(t);this.shadowMapId.setValue(t.shadowBuffer),this.shadowMatrixPaletteId.setValue(e._shadowMatrixPalette),this.shadowCascadeDistancesId.setValue(e._shadowCascadeDistances),this._shadowParams[0]=e.numCascades,this._shadowParams[1]=n.bias,this._shadowParams[2]=0,this._shadowParams[3]=e.shadowDistance,this.shadowParamsId.setValue(this._shadowParams)}let{tint:s,ambientColor:c,ambientIntensity:l}=this;this._tint[0]=s.r,this._tint[1]=s.g,this._tint[2]=s.b,this.tintId.setValue(this._tint);let u=l*this.exposure;this._ambient[0]=c.r*u,this._ambient[1]=c.g*u,this._ambient[2]=c.b*u,this.ambientId.setValue(this._ambient),this._fogParams[0]=this.density,this._fogParams[1]=this.heightBase,this._fogParams[2]=this.heightFalloff,this._fogParams[3]=this.maxDistance,this.fogParamsId.setValue(this._fogParams),this.extinctionId.setValue(this.extinction),this._scatterParams[0]=this.anisotropy,this._scatterParams[1]=this.steps,this._scatterParams[2]=this.noiseOffset,this._scatterParams[3]=e?e.shadowIntensity:1,this.scatterParamsId.setValue(this._scatterParams),super.execute()}},Ie=class extends M{constructor(e,t){super(e),x(this,`scenePass`,null),x(this,`omniLights`,!0),x(this,`spotLights`,!0),x(this,`tint`,new S(1,1,1)),x(this,`density`,.01),x(this,`heightBase`,0),x(this,`heightFalloff`,.05),x(this,`extinction`,1),x(this,`anisotropy`,.6),x(this,`intensity`,1),x(this,`maxDistance`,300),x(this,`steps`,12),x(this,`noiseOffset`,0),x(this,`exposure`,1),x(this,`_variantKey`,null),this.cameraComponent=t,this.blendState=new w(!0,0,1,1,0,0,1);let n=e.scope;this.cameraPosId=n.resolve(`uVolCameraPos`),this.cameraFwdId=n.resolve(`uVolCameraFwd`),this.invViewId=n.resolve(`uVolInvView`),this.projScaleId=n.resolve(`uVolProjScale`),this.tintId=n.resolve(`uVolTint`),this.fogParamsId=n.resolve(`uVolFogParams`),this.marchParamsId=n.resolve(`uVolMarchParams`),this.lightRectId=n.resolve(`uVolLightRect`),this.lightPosRangeId=n.resolve(`uVolLightPosRange`),this.lightSphereId=n.resolve(`uVolLightSphere`),this.lightColorId=n.resolve(`uVolLightColor`),this.lightDirId=n.resolve(`uVolLightDir`),this.lightSpotId=n.resolve(`uVolLightSpot`),this.lightAttenId=n.resolve(`uVolLightAtten`),this.lightProjMatrixId=n.resolve(`uVolLightProjMatrix`),this.lightAtlasId=n.resolve(`uVolLightAtlas`),this.lightCookieChannelId=n.resolve(`uVolLightCookieChannel`),this._cameraPos=new Float32Array(3),this._cameraFwd=new Float32Array(3),this._projScale=new Float32Array(2),this._tint=new Float32Array(3),this._fogParams=new Float32Array(4),this._marchParams=new Float32Array(4),this._lightRect=new Float32Array(4),this._lightPosRange=new Float32Array(4),this._lightSphere=new Float32Array(4),this._lightColor=new Float32Array(3),this._lightDir=new Float32Array(4),this._lightSpot=new Float32Array(4),this._lightAtten=new Float32Array(4),this._lightAtlas=new Float32Array(4)}updateShaderVariant(e,t){let n=`${e}-${t}${y.getScreenDepthChunkKey(this.cameraComponent.shaderParams)}`;if(this._variantKey!==n){this._variantKey=n;let r=new Map;y.addScreenDepthChunkDefines(this.cameraComponent.shaderParams,r),e&&r.set(`VOL_SHADOWS`,``),t&&r.set(`VOL_COOKIES`,``),this.shader=y.createShader(this.device,{uniqueName:`VolumetricFogLocalShader-${n}`,attributes:{aPosition:m},vertexChunk:`volumetricFogLocalVS`,fragmentChunk:`volumetricFogLocalPS`,fragmentDefines:r})}}_getLightClusters(){let e=this.scenePass?.layerRenderSteps;if(e)for(let t=0;t<e.length;t++){let n=e[t].lightClusters;if(n&&n.usedLights.length>1)return n}return null}_evalLightRect(e,t,n){e.getBoundingSphere(B);let r=B.radius;if(t.viewMatrix.transformPoint(B.center,z),-z.z-r<=t.nearClip)return n.set(-1,-1,1,1),!0;let i=t.projectionMatrix,a=1/0,o=1/0,s=-1/0,c=-1/0;for(let e=0;e<8;e++){V.set(z.x+(e&1?r:-r),z.y+(e&2?r:-r),z.z+(e&4?r:-r),1),i.transformVec4(V,H);let t=H.x/H.w,n=H.y/H.w;a=Math.min(a,t),o=Math.min(o,n),s=Math.max(s,t),c=Math.max(c,n)}return n.set(Math.max(a,-1),Math.max(o,-1),Math.min(s,1),Math.min(c,1)),n.x<n.z&&n.y<n.w}_setupLight(e,t,n){let r=this.cameraComponent.camera,i=e._type===2;if(!this._evalLightRect(e,r,U))return!1;this._lightRect[0]=U.x,this._lightRect[1]=U.y,this._lightRect[2]=U.z,this._lightRect[3]=U.w,this.lightRectId.setValue(this._lightRect),this._lightSphere[0]=B.center.x,this._lightSphere[1]=B.center.y,this._lightSphere[2]=B.center.z,this._lightSphere[3]=B.radius,this.lightSphereId.setValue(this._lightSphere);let a=e._node.getPosition();this._lightPosRange[0]=a.x,this._lightPosRange[1]=a.y,this._lightPosRange[2]=a.z,this._lightPosRange[3]=e.attenuationEnd,this.lightPosRangeId.setValue(this._lightPosRange);let o=this.intensity*this.exposure*e.volumetricScattering,s=e._colorLinear;this._lightColor[0]=s[0]*o,this._lightColor[1]=s[1]*o,this._lightColor[2]=s[2]*o,this.lightColorId.setValue(this._lightColor),i&&e._node.getWorldTransform().getY(R).mulScalar(-1).normalize(),this._lightDir[0]=i?R.x:0,this._lightDir[1]=i?R.y:0,this._lightDir[2]=i?R.z:0,this._lightDir[3]=+!!i,this.lightDirId.setValue(this._lightDir),this._lightAtten[0]=+(e._falloffMode===0),this.lightAttenId.setValue(this._lightAtten);let c=e.atlasViewportAllocated,l=t&&c&&e.castShadows,u=l&&e.shadowIntensity>0,d=n&&c&&!!e._cookie&&e.cookieIntensity>0;if(this._lightSpot[0]=e._innerConeAngleCos,this._lightSpot[1]=e._outerConeAngleCos,this._lightSpot[2]=u?e.shadowIntensity:0,this._lightSpot[3]=d?e.cookieIntensity:0,this.lightSpotId.setValue(this._lightSpot),t||n){let t=l?e.getRenderData(null,0):null;if(i){let n=t?.shadowMatrix??(d?p.evalSpotCookieMatrix(e):A.IDENTITY);this.lightProjMatrixId.setValue(n.data)}else this.lightProjMatrixId.setValue(A.IDENTITY.data);let n=e.atlasViewport;this._lightAtlas[0]=n.x,this._lightAtlas[1]=n.y,this._lightAtlas[2]=n.z/3,this._lightAtlas[3]=t?e._getUniformBiasValues(t).bias:0,this.lightAtlasId.setValue(this._lightAtlas)}return n&&this.lightCookieChannelId.setValue(d?W[e._cookieChannel]??W.rgb:Pe),!0}execute(){let e=this._getLightClusters();if(!e||!this.quadRender)return;let t=this.cameraComponent.camera,n=t._node,{lighting:r}=this.cameraComponent.system.app.scene;this.invViewId.setValue(n.getWorldTransform().data);let i=n.getPosition();this._cameraPos[0]=i.x,this._cameraPos[1]=i.y,this._cameraPos[2]=i.z,this.cameraPosId.setValue(this._cameraPos);let a=n.forward;this._cameraFwd[0]=a.x,this._cameraFwd[1]=a.y,this._cameraFwd[2]=a.z,this.cameraFwdId.setValue(this._cameraFwd);let o=t.projectionMatrix.data;this._projScale[0]=1/o[0],this._projScale[1]=1/o[5],this.projScaleId.setValue(this._projScale);let{tint:s}=this;this._tint[0]=s.r,this._tint[1]=s.g,this._tint[2]=s.b,this.tintId.setValue(this._tint),this._fogParams[0]=this.density,this._fogParams[1]=this.heightBase,this._fogParams[2]=this.heightFalloff,this._fogParams[3]=this.maxDistance,this.fogParamsId.setValue(this._fogParams),this._marchParams[0]=this.anisotropy,this._marchParams[1]=this.steps,this._marchParams[2]=this.noiseOffset,this._marchParams[3]=this.extinction,this.marchParamsId.setValue(this._marchParams),this.device.setDrawStates(this.blendState,this.depthState,this.cullMode,this.frontFace,this.stencilFront,this.stencilBack);let{shadowsEnabled:c,cookiesEnabled:l}=r,{omniLights:u,spotLights:d}=this,f=e.usedLights;for(let e=1;e<f.length;e++){let t=f[e].light;t?.volumetricScattering>0&&(t._type===2?d:u)&&this._setupLight(t,c,l)&&this.quadRender.render()}}},Le=class extends M{constructor(e,t,n){super(e),this.fogTexture=n;let r=new Map,i=y.addScreenDepthChunkDefines(t.shaderParams,r);this.shader=y.createShader(e,{uniqueName:`VolumetricFogCombineShader${i}`,attributes:{aPosition:m},vertexChunk:`quadVS`,fragmentChunk:`volumetricFogCombinePS`,fragmentDefines:r}),this.blendState=new w(!0,0,1,6,0,0,1),this.fogTextureId=e.scope.resolve(`uFogTexture`),this.fogTextureSizeId=e.scope.resolve(`uFogTextureSize`),this._fogTextureSize=new Float32Array(4)}execute(){let{fogTexture:e}=this;this.fogTextureId.setValue(e),this._fogTextureSize[0]=e.width,this._fogTextureSize[1]=e.height,this._fogTextureSize[2]=1/e.width,this._fogTextureSize[3]=1/e.height,this.fogTextureSizeId.setValue(this._fogTextureSize),super.execute()}},Re=class extends _{constructor(e,t,n,r,i=null){super(e),x(this,`light`,null),x(this,`tint`,new S(1,1,1)),x(this,`density`,.01),x(this,`heightBase`,0),x(this,`heightFalloff`,.05),x(this,`extinction`,1),x(this,`anisotropy`,.6),x(this,`intensity`,1),x(this,`ambientColor`,new S(1,1,1)),x(this,`ambientIntensity`,.02),x(this,`maxDistance`,300),x(this,`steps`,24),x(this,`temporalDither`,!1),x(this,`localOmniLights`,!1),x(this,`localSpotLights`,!1),x(this,`localIntensity`,1),x(this,`localSteps`,12),x(this,`_scale`,.5),x(this,`_frameIndex`,0),this.cameraComponent=t,k.get(e,j).set(`volumetricFogPS`,Ee),k.get(e,g).set(`volumetricFogPS`,De),k.get(e,j).set(`volumetricFogCombinePS`,Oe),k.get(e,g).set(`volumetricFogCombinePS`,ke),k.get(e,j).set(`volumetricFogLocalPS`,Ae),k.get(e,g).set(`volumetricFogLocalPS`,je),k.get(e,j).set(`volumetricFogLocalVS`,Me),k.get(e,g).set(`volumetricFogLocalVS`,Ne);let a=e.getRenderableHdrFormat([12,14],!0,1)??7;this.fogTexture=new b(e,{name:`VolumetricFogTexture`,width:4,height:4,format:a,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1}),this.fogRenderTarget=new C({name:`VolumetricFogRT`,colorBuffer:this.fogTexture,depth:!1}),this.fogPass=new Fe(e,t),this.fogPass.init(this.fogRenderTarget,{resizeSource:n,scaleX:this._scale,scaleY:this._scale}),this.fogPass.setClearColor(new S(0,0,0,1)),this.beforePasses.push(this.fogPass),this.localPass=new Ie(e,t),this.localPass.scenePass=i,this.localPass.init(this.fogRenderTarget),this.beforePasses.push(this.localPass),this.combinePass=new Le(e,t,this.fogTexture),this.combinePass.init(r),this.beforePasses.push(this.combinePass)}destroy(){this.beforePasses.forEach(e=>e.destroy()),this.beforePasses.length=0,this.fogPass=null,this.localPass=null,this.combinePass=null,this.fogRenderTarget&&(this.fogRenderTarget.destroyTextureBuffers(),this.fogRenderTarget.destroy(),this.fogRenderTarget=null,this.fogTexture=null)}set scale(e){this._scale=e,this.fogPass.scaleX=e,this.fogPass.scaleY=e}get scale(){return this._scale}frameUpdate(){super.frameUpdate();let{light:e,fogPass:t,localPass:n}=this,r=this.cameraComponent.camera,i=this.cameraComponent.system.app.scene,a=!1,o=!1,s=null;e&&e.castShadows&&e.shadowIntensity>0&&(s=e.getRenderData(r,0),s.shadowBuffer&&(a=!0,o=!!h.get(e._shadowType)?.pcf)),t.updateShaderVariant(a,o),t.shadowsEnabled=a,t.lightRenderData=a?s:null,t.light=e,t.tint.copy(this.tint),t.density=this.density,t.heightBase=this.heightBase,t.heightFalloff=this.heightFalloff,t.extinction=this.extinction,t.anisotropy=this.anisotropy,t.intensity=this.intensity,t.ambientColor.copy(this.ambientColor),t.ambientIntensity=this.ambientIntensity,t.maxDistance=this.maxDistance,t.steps=Math.max(1,Math.floor(this.steps)),t.exposure=i.exposure,this._frameIndex=(this._frameIndex+1)%16,t.noiseOffset=this.temporalDither?this._frameIndex*.618034:0;let{localOmniLights:c,localSpotLights:l}=this;if(n.enabled=(c||l)&&i.clusteredLightingEnabled,n.enabled){let{shadowsEnabled:e,cookiesEnabled:r}=i.lighting;n.updateShaderVariant(e,r),n.omniLights=c,n.spotLights=l,n.tint.copy(this.tint),n.density=this.density,n.heightBase=this.heightBase,n.heightFalloff=this.heightFalloff,n.extinction=this.extinction,n.anisotropy=this.anisotropy,n.maxDistance=this.maxDistance,n.intensity=this.localIntensity,n.steps=Math.max(1,Math.floor(this.localSteps)),n.exposure=i.exposure,n.noiseOffset=t.noiseOffset}}},G=[],ze=`uSceneDepthMap`,Be=class extends D{constructor(e,t,n,r,i){super(e),x(this,`linearDepthTexture`,void 0),x(this,`linearDepthClearValue`,new S(0,0,0,0)),x(this,`_qualifiedLayerIndices`,[]),this.scene=t,this.renderer=n,this.camera=r,this.setupRenderTarget(i)}destroy(){super.destroy(),this.camera.shaderParams.sceneDepthMapLinear=!1,this.camera.shaderParams.sceneDepthMapPacked=!1,this.camera.shaderParams.sceneDepthMapReciprocal=!1,this.renderTarget?.destroy(),this.renderTarget=null,this.linearDepthTexture?.destroy(),this.linearDepthTexture=null}setupRenderTarget(e){let{device:t}=this;this.linearDepthFormat=t.textureFloatRenderable?15:7,this.linearDepthTexture=b.createDataTexture2D(t,`SceneLinearDepthTexture`,1,1,this.linearDepthFormat);let n=new C({name:`PrepassRT`,colorBuffer:this.linearDepthTexture,depth:!0,samples:1}),{shaderParams:r}=this.camera;r.sceneDepthMapLinear=!0,r.sceneDepthMapPacked=this.linearDepthFormat===7,r.sceneDepthMapReciprocal=!1,this.init(n,e)}after(){this.device.scope.resolve(ze).setValue(this.linearDepthTexture),this.camera.camera.publishSceneDepthMap(this.linearDepthTexture,this.device.renderVersion)}execute(){let{renderer:e,scene:t,renderTarget:n}=this,r=this.camera.camera,i=t.layers.layerList,a=t.layers.subLayerList;for(let t of this._qualifiedLayerIndices){let o=i[t].getCulledInstances(r),s=a[t]?o.transparent:o.opaque;for(let e=0;e<s.length;e++){let t=s[e];t.material?.depthWrite&&G.push(t)}e.renderForwardLayer(r,n,null,void 0,1,{meshInstances:G}),G.length=0}}frameUpdate(){super.frameUpdate();let{camera:e}=this;this.setClearDepth(e.clearDepthBuffer?1:void 0);let t;if(e.clearDepthBuffer){let n=e.farClip-Number.MIN_VALUE;t=this.linearDepthClearValue,this.linearDepthFormat===15?t.r=n:s.float2RGBA8(n,t)}this.setClearColor(t);let{renderer:n,scene:r}=this,i=this.camera.camera,a=r.layers,o=a.layerList,c=this._qualifiedLayerIndices;c.length=0;for(let e=0;e<o.length&&o[e].id!==1;e++)a.isSubLayerRenderedByCamera(e,i)&&(c.push(e),n.culler.requestMeshInstanceCull(i,o[e]))}},Ve=`
	#include "screenDepthPS"
	varying vec2 uv0;
	uniform sampler2D sourceTexture;
	uniform vec2 sourceInvResolution;
	uniform int filterSize;
	float random(const highp vec2 w) {
		const vec3 m = vec3(0.06711056, 0.00583715, 52.9829189);
		return fract(m.z * fract(dot(w, m.xy)));
	}
	mediump float bilateralWeight(in mediump float depth, in mediump float sampleDepth) {
		mediump float diff = (sampleDepth - depth);
		return max(0.0, 1.0 - diff * diff);
	}
	void tap(inout float sum, inout float totalWeight, float weight, float depth, vec2 position) {
		mediump float color = texture2D(sourceTexture, position).r;
		mediump float textureDepth = -getLinearScreenDepth(position);
	
		mediump float bilateral = bilateralWeight(depth, textureDepth);
		bilateral *= weight;
		sum += color * bilateral;
		totalWeight += bilateral;
	}
	void main() {
		mediump float depth = -getLinearScreenDepth(uv0);
		mediump float totalWeight = 1.0;
		mediump float color = texture2D(sourceTexture, uv0 ).r;
		mediump float sum = color * totalWeight;
		for (mediump int i = -filterSize; i <= filterSize; i++) {
			mediump float weight = 1.0;
			#ifdef HORIZONTAL
				vec2 offset = vec2(i, 0) * sourceInvResolution;
			#else
				vec2 offset = vec2(0, i) * sourceInvResolution;
			#endif
			tap(sum, totalWeight, weight, depth, uv0 + offset);
		}
		mediump float ao = sum / totalWeight;
		gl_FragColor.r = ao;
	}
`,He=`
#include "screenDepthPS"
varying uv0: vec2f;
var sourceTexture: texture_2d<f32>;
var sourceTextureSampler: sampler;
uniform sourceInvResolution: vec2f;
uniform filterSize: i32;
fn random(w: vec2f) -> f32 {
	const m: vec3f = vec3f(0.06711056, 0.00583715, 52.9829189);
	return fract(m.z * fract(dot(w, m.xy)));
}
fn bilateralWeight(depth: f32, sampleDepth: f32) -> f32 {
	let diff: f32 = (sampleDepth - depth);
	return max(0.0, 1.0 - diff * diff);
}
fn tap(sum_ptr: ptr<function, f32>, totalWeight_ptr: ptr<function, f32>, weight: f32, depth: f32, position: vec2f) {
	let color: f32 = textureSample(sourceTexture, sourceTextureSampler, position).r;
	let textureDepth: f32 = -getLinearScreenDepth(position);
	let bilateral: f32 = bilateralWeight(depth, textureDepth) * weight;
	*sum_ptr = *sum_ptr + color * bilateral;
	*totalWeight_ptr = *totalWeight_ptr + bilateral;
}
@fragment
fn fragmentMain(input: FragmentInput) -> FragmentOutput {
	var output: FragmentOutput;
	let depth: f32 = -getLinearScreenDepth(input.uv0);
	var totalWeight: f32 = 1.0;
	let color: f32 = textureSample(sourceTexture, sourceTextureSampler, input.uv0 ).r;
	var sum: f32 = color * totalWeight;
	for (var i: i32 = -uniform.filterSize; i <= uniform.filterSize; i = i + 1) {
		let weight: f32 = 1.0;
		#ifdef HORIZONTAL
			var offset: vec2f = vec2f(f32(i), 0.0) * uniform.sourceInvResolution;
		#else
			var offset: vec2f = vec2f(0.0, f32(i)) * uniform.sourceInvResolution;
		#endif
		tap(&sum, &totalWeight, weight, depth, input.uv0 + offset);
	}
	let ao: f32 = sum / totalWeight;
	output.color = vec4f(ao, ao, ao, 1.0);
	return output;
}
`,K=class extends M{constructor(e,t,n,r){super(e),this.sourceTexture=t,k.get(e,j).set(`depthAwareBlurPS`,Ve),k.get(e,g).set(`depthAwareBlurPS`,He);let i=new Map;r&&i.set(`HORIZONTAL`,``);let a=y.addScreenDepthChunkDefines(n.shaderParams,i);this.shader=y.createShader(e,{uniqueName:`DepthAware${r?`Horizontal`:`Vertical`}BlurShader${a}`,attributes:{aPosition:m},vertexChunk:`quadVS`,fragmentChunk:`depthAwareBlurPS`,fragmentDefines:i});let o=this.device.scope;this.sourceTextureId=o.resolve(`sourceTexture`),this.sourceInvResolutionId=o.resolve(`sourceInvResolution`),this.sourceInvResolutionValue=new Float32Array(2),this.filterSizeId=o.resolve(`filterSize`)}execute(){this.filterSizeId.setValue(4),this.sourceTextureId.setValue(this.sourceTexture);let{width:e,height:t}=this.sourceTexture;this.sourceInvResolutionValue[0]=1/e,this.sourceInvResolutionValue[1]=1/t,this.sourceInvResolutionId.setValue(this.sourceInvResolutionValue),super.execute()}},Ue=`
	#include "screenDepthPS"
	
	varying vec2 uv0;
	uniform vec2 uInvResolution;
	uniform float uAspect;
	#define saturate(x) clamp(x,0.0,1.0)
	highp float getWFromProjectionMatrix(const mat4 p, const vec3 v) {
		return -v.z;
	}
	highp float getViewSpaceZFromW(const mat4 p, const float w) {
		return -w;
	}
	const float kLog2LodRate = 3.0;
	float random(const highp vec2 w) {
		const vec3 m = vec3(0.06711056, 0.00583715, 52.9829189);
		return fract(m.z * fract(dot(w, m.xy)));
	}
	highp vec2 getFragCoord() {
		return gl_FragCoord.xy;
	}
	highp vec3 computeViewSpacePositionFromDepth(highp vec2 uv, highp float linearDepth) {
		return vec3((0.5 - uv) * vec2(uAspect, 1.0) * linearDepth, linearDepth);
	}
	highp vec2 snapToDepthTexelCenter(const highp vec2 uv) {
		vec2 size = vec2(textureSize(uSceneDepthMap, 0));
		return (floor(uv * size) + 0.5) / size;
	}
	highp vec3 faceNormal(highp vec3 dpdx, highp vec3 dpdy) {
		return normalize(cross(dpdx, dpdy));
	}
	highp vec3 computeViewSpaceNormal(const highp vec3 position) {
		return faceNormal(dFdx(position), dFdy(position));
	}
	highp vec3 computeViewSpaceNormal(const highp vec3 position, const highp vec2 uv) {
		highp vec2 uvdx = snapToDepthTexelCenter(uv + vec2(uInvResolution.x, 0.0));
		highp vec2 uvdy = snapToDepthTexelCenter(uv + vec2(0.0, uInvResolution.y));
		highp vec3 px = computeViewSpacePositionFromDepth(uvdx, -getLinearScreenDepth(uvdx));
		highp vec3 py = computeViewSpacePositionFromDepth(uvdy, -getLinearScreenDepth(uvdy));
		highp vec3 dpdx = px - position;
		highp vec3 dpdy = py - position;
		return faceNormal(dpdx, dpdy);
	}
	uniform vec2 uSampleCount;
	uniform float uSpiralTurns;
	#define PI (3.14159)
	mediump vec3 tapLocation(mediump float i, const mediump float noise) {
		mediump float offset = ((2.0 * PI) * 2.4) * noise;
		mediump float angle = ((i * uSampleCount.y) * uSpiralTurns) * (2.0 * PI) + offset;
		mediump float radius = (i + noise + 0.5) * uSampleCount.y;
		return vec3(cos(angle), sin(angle), radius * radius);
	}
	highp vec2 startPosition(const float noise) {
		float angle = ((2.0 * PI) * 2.4) * noise;
		return vec2(cos(angle), sin(angle));
	}
	uniform vec2 uAngleIncCosSin;
	highp mat2 tapAngleStep() {
		highp vec2 t = uAngleIncCosSin;
		return mat2(t.x, t.y, -t.y, t.x);
	}
	mediump vec3 tapLocationFast(mediump float i, mediump vec2 p, const mediump float noise) {
		mediump float radius = (i + noise + 0.5) * uSampleCount.y;
		return vec3(p, radius * radius);
	}
	uniform float uMaxLevel;
	uniform float uInvRadiusSquared;
	uniform float uMinHorizonAngleSineSquared;
	uniform float uBias;
	uniform float uPeak2;
	void computeAmbientOcclusionSAO(inout mediump float occlusion, mediump float i, mediump float ssDiskRadius,
			const highp vec2 uv, const highp vec3 origin, const mediump vec3 normal,
			const mediump vec2 tapPosition, const float noise) {
		mediump vec3 tap = tapLocationFast(i, tapPosition, noise);
		mediump float ssRadius = max(1.0, tap.z * ssDiskRadius);
		mediump vec2 uvSamplePos = snapToDepthTexelCenter(uv + vec2(ssRadius * tap.xy) * uInvResolution);
		mediump float level = clamp(floor(log2(ssRadius)) - kLog2LodRate, 0.0, float(uMaxLevel));
		highp float occlusionDepth = -getLinearScreenDepth(uvSamplePos);
		highp vec3 p = computeViewSpacePositionFromDepth(uvSamplePos, occlusionDepth);
		vec3 v = p - origin;
		float vv = dot(v, v);
		float vn = dot(v, normal);
		mediump float w = max(0.0, 1.0 - vv * uInvRadiusSquared);
		w = w * w;
		w *= step(vv * uMinHorizonAngleSineSquared, vn * vn);
		occlusion += w * max(0.0, vn + origin.z * uBias) / (vv + uPeak2);
	}
	uniform float uProjectionScaleRadius;
	uniform float uIntensity;
	uniform float uRandomize;
	float scalableAmbientObscurance(highp vec2 uv, highp vec3 origin, vec3 normal) {
		float noise = random(getFragCoord()) + uRandomize;
		highp vec2 tapPosition = startPosition(noise);
		highp mat2 angleStep = tapAngleStep();
		float ssDiskRadius = -(uProjectionScaleRadius / origin.z);
		float occlusion = 0.0;
		for (float i = 0.0; i < uSampleCount.x; i += 1.0) {
			computeAmbientOcclusionSAO(occlusion, i, ssDiskRadius, uv, origin, normal, tapPosition, noise);
			tapPosition = angleStep * tapPosition;
		}
		return occlusion;
	}
	uniform float uPower;
	void main() {
		highp vec2 uv = snapToDepthTexelCenter(uv0);
		highp float depth = -getLinearScreenDepth(uv);
		highp vec3 origin = computeViewSpacePositionFromDepth(uv, depth);
		vec3 normal = computeViewSpaceNormal(origin, uv);
		float occlusion = 0.0;
		if (uIntensity > 0.0) {
			occlusion = scalableAmbientObscurance(uv, origin, normal);
		}
		float ao = max(0.0, 1.0 - occlusion * uIntensity);
		ao = pow(ao, uPower);
		gl_FragColor = vec4(ao, ao, ao, 1.0);
	}
`,We=`
	#include "screenDepthPS"
	varying uv0: vec2f;
	uniform uInvResolution: vec2f;
	uniform uAspect: f32;
	fn getWFromProjectionMatrix(p: mat4x4f, v: vec3f) -> f32 {
		return -v.z;
	}
	fn getViewSpaceZFromW(p: mat4x4f, w: f32) -> f32 {
		return -w;
	}
	const kLog2LodRate: f32 = 3.0;
	fn random(w: vec2f) -> f32 {
		const m: vec3f = vec3f(0.06711056, 0.00583715, 52.9829189);
		return fract(m.z * fract(dot(w, m.xy)));
	}
	fn getFragCoord() -> vec2f {
		return pcPosition.xy;
	}
	fn computeViewSpacePositionFromDepth(uv: vec2f, linearDepth: f32) -> vec3f {
		return vec3f((0.5 - uv) * vec2f(uniform.uAspect, 1.0) * linearDepth, linearDepth);
	}
	fn snapToDepthTexelCenter(uv: vec2f) -> vec2f {
		let size: vec2f = vec2f(textureDimensions(uSceneDepthMap, 0));
		return (floor(uv * size) + vec2f(0.5)) / size;
	}
	fn faceNormal(dpdx: vec3f, dpdy: vec3f) -> vec3f {
		return normalize(cross(dpdx, dpdy));
	}
	fn computeViewSpaceNormalDeriv(position: vec3f) -> vec3f {
		return faceNormal(dpdx(position), dpdy(position));
	}
	fn computeViewSpaceNormalDepth(position: vec3f, uv: vec2f) -> vec3f {
		let uvdx: vec2f = snapToDepthTexelCenter(uv + vec2f(uniform.uInvResolution.x, 0.0));
		let uvdy: vec2f = snapToDepthTexelCenter(uv + vec2f(0.0, uniform.uInvResolution.y));
		let px: vec3f = computeViewSpacePositionFromDepth(uvdx, -getLinearScreenDepth(uvdx));
		let py: vec3f = computeViewSpacePositionFromDepth(uvdy, -getLinearScreenDepth(uvdy));
		let dpdx: vec3f = px - position;
		let dpdy: vec3f = py - position;
		return faceNormal(dpdx, dpdy);
	}
	uniform uSampleCount: vec2f;
	uniform uSpiralTurns: f32;
	const PI: f32 = 3.14159;
	fn tapLocation(i: f32, noise: f32) -> vec3f {
		let offset: f32 = ((2.0 * PI) * 2.4) * noise;
		let angle: f32 = ((i * uniform.uSampleCount.y) * uniform.uSpiralTurns) * (2.0 * PI) + offset;
		let radius: f32 = (i + noise + 0.5) * uniform.uSampleCount.y;
		return vec3f(cos(angle), sin(angle), radius * radius);
	}
	fn startPosition(noise: f32) -> vec2f {
		let angle: f32 = ((2.0 * PI) * 2.4) * noise;
		return vec2f(cos(angle), sin(angle));
	}
	uniform uAngleIncCosSin: vec2f;
	fn tapAngleStep() -> mat2x2f {
		let t: vec2f = uniform.uAngleIncCosSin;
		return mat2x2f(vec2f(t.x, t.y), vec2f(-t.y, t.x));
	}
	fn tapLocationFast(i: f32, p: vec2f, noise_in: f32) -> vec3f {
		let radius: f32 = (i + noise_in + 0.5) * uniform.uSampleCount.y;
		return vec3f(p.x, p.y, radius * radius);
	}
	uniform uMaxLevel: f32;
	uniform uInvRadiusSquared: f32;
	uniform uMinHorizonAngleSineSquared: f32;
	uniform uBias: f32;
	uniform uPeak2: f32;
	fn computeAmbientOcclusionSAO(occlusion_ptr: ptr<function, f32>, i: f32, ssDiskRadius: f32,
			uv: vec2f, origin: vec3f, normal: vec3f,
			tapPosition: vec2f, noise: f32) {
		let tap: vec3f = tapLocationFast(i, tapPosition, noise);
		let ssRadius: f32 = max(1.0, tap.z * ssDiskRadius);
		let uvSamplePos: vec2f = snapToDepthTexelCenter(uv + (ssRadius * tap.xy) * uniform.uInvResolution);
		let level: f32 = clamp(floor(log2(ssRadius)) - kLog2LodRate, 0.0, uniform.uMaxLevel);
		let occlusionDepth: f32 = -getLinearScreenDepth(uvSamplePos);
		let p: vec3f = computeViewSpacePositionFromDepth(uvSamplePos, occlusionDepth);
		let v: vec3f = p - origin;
		let vv: f32 = dot(v, v);
		let vn: f32 = dot(v, normal);
		var w_val: f32 = max(0.0, 1.0 - vv * uniform.uInvRadiusSquared);
		w_val = w_val * w_val;
		w_val = w_val * step(vv * uniform.uMinHorizonAngleSineSquared, vn * vn);
		*occlusion_ptr = *occlusion_ptr + w_val * max(0.0, vn + origin.z * uniform.uBias) / (vv + uniform.uPeak2);
	}
	uniform uProjectionScaleRadius: f32;
	uniform uIntensity: f32;
	uniform uRandomize: f32;
	fn scalableAmbientObscurance(uv: vec2f, origin: vec3f, normal: vec3f) -> f32 {
		let noise: f32 = random(getFragCoord()) + uniform.uRandomize;
		var tapPosition: vec2f = startPosition(noise);
		let angleStep: mat2x2f = tapAngleStep();
		let ssDiskRadius: f32 = -(uniform.uProjectionScaleRadius / origin.z);
		var occlusion: f32 = 0.0;
		for (var i: i32 = 0; i < i32(uniform.uSampleCount.x); i = i + 1) {
			computeAmbientOcclusionSAO(&occlusion, f32(i), ssDiskRadius, uv, origin, normal, tapPosition, noise);
			tapPosition = angleStep * tapPosition;
		}
		return occlusion;
	}
	uniform uPower: f32;
	@fragment
	fn fragmentMain(input: FragmentInput) -> FragmentOutput {
		var output: FragmentOutput;
		let uv: vec2f = snapToDepthTexelCenter(input.uv0);
		let depth: f32 = -getLinearScreenDepth(uv);
		let origin: vec3f = computeViewSpacePositionFromDepth(uv, depth);
		let normal: vec3f = computeViewSpaceNormalDepth(origin, uv);
		var occlusion: f32 = 0.0;
		if (uniform.uIntensity > 0.0) {
			occlusion = scalableAmbientObscurance(uv, origin, normal);
		}
		var ao: f32 = max(0.0, 1.0 - occlusion * uniform.uIntensity);
		ao = pow(ao, uniform.uPower);
		output.color = vec4f(ao, ao, ao, 1.0);
		return output;
	}
`,Ge=class extends M{constructor(e,t,n,r){super(e),x(this,`radius`,5),x(this,`intensity`,1),x(this,`power`,1),x(this,`sampleCount`,10),x(this,`minAngle`,5),x(this,`randomize`,!1),x(this,`ssaoTexture`,void 0),x(this,`_scale`,1),x(this,`_blueNoise`,new o(19)),this.sourceTexture=t,this.cameraComponent=n,k.get(e,j).set(`ssaoPS`,Ue),k.get(e,g).set(`ssaoPS`,We);let i=new Map,a=y.addScreenDepthChunkDefines(n.shaderParams,i);this.shader=y.createShader(e,{uniqueName:`SsaoShader${a}`,attributes:{aPosition:m},vertexChunk:`quadVS`,fragmentChunk:`ssaoPS`,fragmentDefines:i});let s=this.createRenderTarget(`SsaoFinalTexture`);this.ssaoTexture=s.colorBuffer,this.init(s,{resizeSource:this.sourceTexture});let c=new S(0,0,0,0);if(this.setClearColor(c),r){let t=this.createRenderTarget(`SsaoTempTexture`),r=new K(e,s.colorBuffer,n,!0);r.init(t,{resizeSource:s.colorBuffer}),r.setClearColor(c);let i=new K(e,t.colorBuffer,n,!1);i.init(s,{resizeSource:s.colorBuffer}),i.setClearColor(c),this.afterPasses.push(r),this.afterPasses.push(i)}this.ssaoTextureId=e.scope.resolve(`ssaoTexture`),this.ssaoTextureSizeInvId=e.scope.resolve(`ssaoTextureSizeInv`)}destroy(){if(this.renderTarget?.destroyTextureBuffers(),this.renderTarget?.destroy(),this.renderTarget=null,this.afterPasses.length>0){let e=this.afterPasses[0].renderTarget;e?.destroyTextureBuffers(),e?.destroy()}this.afterPasses.forEach(e=>e.destroy()),this.afterPasses.length=0,super.destroy()}set scale(e){this._scale=e,this.scaleX=e,this.scaleY=e}get scale(){return this._scale}createRenderTarget(e){return new C({depth:!1,colorBuffer:b.createDataTexture2D(this.device,e,1,1,52)})}execute(){let{device:e,sampleCount:n,minAngle:r}=this,{width:i,height:a}=this.renderTarget.colorBuffer,o=e.scope;o.resolve(`uAspect`).setValue(i/a),o.resolve(`uInvResolution`).setValue([1/i,1/a]),o.resolve(`uSampleCount`).setValue([n,1/n]);let s=Math.sin(r*t.DEG_TO_RAD);o.resolve(`uMinHorizonAngleSineSquared`).setValue(s*s);let c=1/(n-.5)*10*2*3.141,l=this.radius,u=.1*l,d=2*(u*2*3.141)*this.intensity/n,f=.5*a;o.resolve(`uSpiralTurns`).setValue(10),o.resolve(`uAngleIncCosSin`).setValue([Math.cos(c),Math.sin(c)]),o.resolve(`uMaxLevel`).setValue(0),o.resolve(`uInvRadiusSquared`).setValue(1/(l*l)),o.resolve(`uBias`).setValue(.001),o.resolve(`uPeak2`).setValue(u*u),o.resolve(`uIntensity`).setValue(d),o.resolve(`uPower`).setValue(this.power),o.resolve(`uProjectionScaleRadius`).setValue(f*l),o.resolve(`uRandomize`).setValue(this.randomize?this._blueNoise.value():0),super.execute()}after(){this.ssaoTextureId.setValue(this.ssaoTexture);let e=this.sourceTexture;this.ssaoTextureSizeInvId.setValue([1/e.width,1/e.height])}},q=class{constructor(){x(this,`formats`,void 0),x(this,`stencil`,!1),x(this,`samples`,1),x(this,`sceneColorMap`,!1),x(this,`lastGrabLayerId`,2),x(this,`lastGrabLayerIsTransparent`,!1),x(this,`lastSceneLayerId`,3),x(this,`lastSceneLayerIsTransparent`,!0),x(this,`taaEnabled`,!1),x(this,`bloomEnabled`,!1),x(this,`ssaoType`,N),x(this,`ssaoBlurEnabled`,!0),x(this,`prepassEnabled`,!1),x(this,`sceneTextureDepth`,!1),x(this,`dofEnabled`,!1),x(this,`dofNearBlur`,!1),x(this,`dofHighQuality`,!0),x(this,`volumetricFogEnabled`,!1)}},Ke=new q,J=[15,50],Y=class e extends _{constructor(e,t,n,r={}){super(e.graphicsDevice),x(this,`app`,void 0),x(this,`prePass`,void 0),x(this,`scenePass`,void 0),x(this,`composePass`,void 0),x(this,`bloomPass`,void 0),x(this,`ssaoPass`,void 0),x(this,`taaPass`,void 0),x(this,`scenePassHalf`,void 0),x(this,`dofPass`,void 0),x(this,`volumetricFogPass`,void 0),x(this,`_renderTargetScale`,1),x(this,`layersDirty`,!1),x(this,`cameraFrame`,void 0),x(this,`rt`,null),x(this,`_sceneTextureNames`,[]),x(this,`sceneDepthTexture`,null),x(this,`sceneDepthSlot`,0),x(this,`rtSceneColor`,null),x(this,`_sceneDepthClearValue`,new S(0,0,0,1)),this.app=e,this.cameraComponent=n,this.cameraFrame=t,this.options=this.sanitizeOptions(r),this.setupRenderPasses(this.options)}destroy(){this.reset()}reset(){if(this.sceneTexture=null,this.sceneTextureHalf=null,this.sceneDepthTexture){this.sceneDepthTexture=null,this.sceneDepthSlot=0,this._sceneTextureNames.length=0;let{shaderParams:e}=this.cameraComponent;e.sceneDepthMapLinear=!1,e.sceneDepthMapPacked=!1,e.sceneDepthMapReciprocal=!1}this.rtSceneColor&&(this.rtSceneColor.destroy(),this.rtSceneColor=null),this.rt&&(this.rt.destroyTextureBuffers(),this.rt.destroy(),this.rt=null),this.rtHalf&&(this.rtHalf.destroyTextureBuffers(),this.rtHalf.destroy(),this.rtHalf=null),this.beforePasses.forEach(e=>e.destroy()),this.beforePasses.length=0,this.prePass=null,this.scenePass=null,this.scenePassTransparent=null,this.colorGrabPass=null,this.composePass=null,this.bloomPass=null,this.ssaoPass=null,this.taaPass=null,this.afterPass=null,this.scenePassHalf=null,this.dofPass=null,this.volumetricFogPass=null}sanitizeOptions(t){t=Object.assign({},Ke,t);let n=t.taaEnabled||t.dofEnabled||t.volumetricFogEnabled||t.ssaoType===`combine`,r=this.needsInSceneDepth(t),i=this.app.scene.gsplat.sceneDepthWrite,a=e.isSceneTextureDepthSupported(this.device),o=this.sceneTexturesUnsupportedReason(t),s=r||this.sceneDepthFormat!==15;return t.sceneTextureDepth=n&&a&&!o&&(!s||i),t.prepassEnabled=r||n&&!t.sceneTextureDepth,t}rendersGSplats(){return!1}needsInSceneDepth(e){return e.prepassEnabled||e.ssaoType===`lighting`}sceneTexturesUnsupportedReason(e){return e.samples>1?`multi-sampling is enabled on the CameraFrame, which the scene depth cannot be rendered with`:this.cameraComponent.camera.fullSizeClearRect?this.needsInSceneDepth(e)?`the depth prepass this camera also needs stores the depth differently, and the two cannot be told apart by the shaders sampling them`:null:`this camera does not clear the whole render target, and the clear it uses instead would also clear the scene depth`}get sceneDepthFormat(){return e.getSceneDepthFormat(this.device)}static getSceneDepthFormat(e){return e.getRenderableHdrFormat(J,!1,1,!0)}static isSceneTextureDepthSupported(t){return t.supportsIndependentBlending&&e.getSceneDepthFormat(t)!==void 0}set renderTargetScale(e){this._renderTargetScale=e,this.scenePass&&(this.scenePass.scaleX=e,this.scenePass.scaleY=e)}get renderTargetScale(){return this._renderTargetScale}needsReset(e){let t=this.options;return e.ssaoType!==t.ssaoType||e.ssaoBlurEnabled!==t.ssaoBlurEnabled||e.taaEnabled!==t.taaEnabled||e.samples!==t.samples||e.stencil!==t.stencil||e.bloomEnabled!==t.bloomEnabled||e.prepassEnabled!==t.prepassEnabled||e.sceneTextureDepth!==t.sceneTextureDepth||e.sceneColorMap!==t.sceneColorMap||e.dofEnabled!==t.dofEnabled||e.dofNearBlur!==t.dofNearBlur||e.dofHighQuality!==t.dofHighQuality||e.volumetricFogEnabled!==t.volumetricFogEnabled||((e,t)=>e!==t&&(!(Array.isArray(e)&&Array.isArray(t))||e.length!==t.length||!e.every((e,n)=>e===t[n])))(e.formats,t.formats)}update(e){e=this.sanitizeOptions(e),(this.needsReset(e)||this.layersDirty)&&(this.layersDirty=!1,this.reset()),this.options=e,this.sceneTexture||this.setupRenderPasses(this.options)}createRenderTarget(e,t,n,r,i){let a=new b(this.device,{name:e,width:4,height:4,format:this.hdrFormat,mipmaps:!1,minFilter:1,magFilter:1,addressU:1,addressV:1});return new C({colorBuffers:i?.length?[a,...i]:[a],depth:t,stencil:n,samples:r})}setupRenderPasses(e){let{device:t}=this,n=this.cameraComponent,r=n.renderTarget;this.hdrFormat=t.getRenderableHdrFormat(e.formats,!0,e.samples)||7,this._bloomEnabled=e.bloomEnabled&&this.hdrFormat!==7,this._sceneHalfEnabled=this._bloomEnabled||e.dofEnabled,n.shaderParams.ssaoEnabled=e.ssaoType===P;let i=[],a=this._sceneTextureNames;if(a.length=0,e.sceneTextureDepth&&(this.sceneDepthTexture=b.createDataTexture2D(t,`SceneTextureDepth`,4,4,this.sceneDepthFormat),i.push(this.sceneDepthTexture),a.push(ie),this.sceneDepthSlot=i.length),this.rt=this.createRenderTarget(`SceneColor`,!0,e.stencil,e.samples,i),this.sceneTexture=this.rt.colorBuffer,this.sceneDepthTexture){let{shaderParams:e}=n;e.sceneDepthMapLinear=!0,e.sceneDepthMapPacked=!1,e.sceneDepthMapReciprocal=!0,this.rtSceneColor=new C({name:`SceneColorOnly`,colorBuffers:[this.sceneTexture],depth:!1,samples:1})}this._sceneHalfEnabled&&(this.rtHalf=this.createRenderTarget(`SceneColorHalf`,!1,!1,1),this.sceneTextureHalf=this.rtHalf.colorBuffer),this.sceneOptions={resizeSource:r,scaleX:this.renderTargetScale,scaleY:this.renderTargetScale},this.createPasses(e);let o=this.collectPasses();this.beforePasses=o.filter(e=>e!=null),this.updateCameraUseFlags()}updateCameraUseFlags(){let e=new Map,t=new Map;for(let n=0;n<this.beforePasses.length;n++){let r=this.beforePasses[n];if(r instanceof T){let n=r.layerRenderSteps;for(let r=0;r<n.length;r++){let i=n[r],a=i.cameraComponent;a&&(e.has(a)||e.set(a,i),t.set(a,i))}}}e.forEach(e=>{e.firstCameraUse=!0}),t.forEach(e=>{e.lastCameraUse=!0})}collectPasses(){let e=this.options.ssaoType===P;return[this.prePass,e?this.ssaoPass:null,this.scenePass,this.colorGrabPass,this.scenePassTransparent,e?null:this.ssaoPass,this.volumetricFogPass,this.taaPass,this.scenePassHalf,this.bloomPass,this.dofPass,this.composePass,this.afterPass]}createPasses(e){this.setupScenePrepass(e),this.setupSsaoPass(e);let t=this.setupScenePass(e);this.setupVolumetricFogPass(e);let n=this.setupTaaPass(e);this.setupSceneHalfPass(e,n),this.setupBloomPass(e,this.sceneTextureHalf),this.setupDofPass(e,this.sceneTexture,this.sceneTextureHalf),this.setupComposePass(e),this.setupAfterPass(e,t)}setupScenePrepass(e){if(e.prepassEnabled){let{app:e,device:t,cameraComponent:n}=this,{scene:r,renderer:i}=e;this.prePass=new Be(t,r,i,n,this.sceneOptions)}}setupScenePassSettings(e){e.gammaCorrection=0,e.toneMapping=6,e.sceneTextures=this._sceneTextureNames}addCameraLayers(e,t,n,r,i=!0){let a=this.cameraComponent,{layerList:o,subLayerList:s}=e.layerComposition,c=n,l=t;for(;l<o.length;){let t=o[l],n=s[l];if(a.camera.layersSet.has(t.id)&&(e.addLayer(a,t,n,c),c=!1),l++,t.id===r&&n===i)break}return l}setupScenePass(e){let{app:t,device:n}=this,{scene:r,renderer:i}=t,a=r.layers;this.scenePass=new T(n,a,r,i),this.setupScenePassSettings(this.scenePass),this.scenePass.init(this.rt,this.sceneOptions);let o=e.sceneColorMap?e.lastGrabLayerId:e.lastSceneLayerId,s=e.sceneColorMap?e.lastGrabLayerIsTransparent:e.lastSceneLayerIsTransparent,c={lastAddedIndex:0,clearRenderTarget:!0};return c.lastAddedIndex=this.addCameraLayers(this.scenePass,c.lastAddedIndex,c.clearRenderTarget,o,s),c.clearRenderTarget=!1,e.sceneColorMap&&(this.colorGrabPass=new f(n),this.colorGrabPass.source=this.rt,this.scenePassTransparent=new T(n,a,r,i),this.setupScenePassSettings(this.scenePassTransparent),this.scenePassTransparent.init(this.rt),c.lastAddedIndex=this.addCameraLayers(this.scenePassTransparent,c.lastAddedIndex,c.clearRenderTarget,e.lastSceneLayerId,e.lastSceneLayerIsTransparent),this.scenePassTransparent.rendersAnything||(this.scenePassTransparent.destroy(),this.scenePassTransparent=null),this.scenePassTransparent&&e.prepassEnabled&&(this.scenePassTransparent.depthStencilOps.storeDepth=!0)),(this.scenePassTransparent??this.scenePass).sceneTexturesCamera=this.cameraComponent.camera,this.scenePass.clearSceneTextures=e.sceneTextureDepth&&!e.prepassEnabled,c}setupSsaoPass(e){let{ssaoBlurEnabled:t,ssaoType:n}=e,{device:r,cameraComponent:i}=this;n!==`none`&&(this.ssaoPass=new Ge(r,this.sceneTexture,i,t))}setupSceneHalfPass(e,t){this._sceneHalfEnabled&&(this.scenePassHalf=new F(this.device,this.sceneTexture,{boxFilter:!0,removeInvalid:!0}),this.scenePassHalf.name=`RenderPassSceneHalf`,this.scenePassHalf.init(this.rtHalf,{resizeSource:t,scaleX:.5,scaleY:.5}),this.scenePassHalf.setClearColor(S.BLACK))}setupBloomPass(e,t){this._bloomEnabled&&(this.bloomPass=new fe(this.device,t,this.hdrFormat))}setupDofPass(e,t,n){e.dofEnabled&&(this.dofPass=new Te(this.device,this.cameraComponent,t,n,e.dofHighQuality,e.dofNearBlur))}setupVolumetricFogPass(e){e.volumetricFogEnabled&&(this.volumetricFogPass=new Re(this.device,this.cameraComponent,this.sceneTexture,this.rtSceneColor??this.rt,this.scenePass),this.volumetricFogPass.temporalDither=e.taaEnabled)}setupTaaPass(e){let t=this.sceneTexture;return e.taaEnabled&&(this.taaPass=new ve(this.device,this.sceneTexture,this.cameraComponent),t=this.taaPass.historyTexture),t}setupComposePass(e){this.composePass=new he(this.device,this.cameraComponent),this.composePass.bloomTexture=this.bloomPass?.bloomTexture,this.composePass.hdrScene=this.hdrFormat!==7,this.composePass.taaEnabled=e.taaEnabled,this.composePass.cocTexture=this.dofPass?.cocTexture,this.composePass.blurTexture=this.dofPass?.blurTexture,this.composePass.blurTextureUpscale=!this.dofPass?.highQuality;let t=this.cameraComponent.renderTarget;this.composePass.init(t),this.composePass.ssaoTexture=e.ssaoType===`combine`?this.ssaoPass.ssaoTexture:null}setupAfterPass(e,t){let{app:n,cameraComponent:r}=this,{scene:i,renderer:a}=n,o=i.layers,s=r.renderTarget;this.afterPass=new T(this.device,o,i,a),this.afterPass.init(s),this.addCameraLayers(this.afterPass,t.lastAddedIndex,t.clearRenderTarget)}frameUpdate(){this.layersDirty&&this.cameraFrame.update(),super.frameUpdate();let{options:e,composePass:t}=this;if(t.sceneDepthAvailable=e.sceneTextureDepth||e.prepassEnabled,this.sceneDepthTexture){let{scenePass:e}=this,t=e.options.resizeSource??this.device.backBuffer;this.rtSceneColor.resize(Math.floor(t.width*e.scaleX),Math.floor(t.height*e.scaleY));let n=this._sceneDepthClearValue;n.r=1/this.cameraComponent.camera.farClip,this.scenePass.setClearColor(n,this.sceneDepthSlot)}let n=this.taaPass?.update()??this.rt.colorBuffer;this.composePass.sceneTexture=n,this.scenePassHalf?.setSourceTexture(n)}},qe=class{constructor(e,t){x(this,`_enabled`,!0),x(this,`rendering`,{renderFormats:[18,12,14],stencil:!1,renderTargetScale:1,samples:1,sceneColorMap:!1,sceneDepthMap:!1,toneMapping:0,sharpness:0}),x(this,`ssao`,{type:N,blurEnabled:!0,randomize:!1,intensity:.5,radius:30,samples:12,power:6,minAngle:10,scale:1}),x(this,`bloom`,{intensity:0,blurLevel:16}),x(this,`grading`,{enabled:!1,brightness:1,contrast:1,saturation:1,tint:new S(1,1,1,1)}),x(this,`colorLUT`,{texture:null,intensity:1,texture2:null,intensity2:1,blend:0}),x(this,`vignette`,{intensity:0,inner:.5,outer:1,curvature:.5,color:new S(0,0,0)}),x(this,`taa`,{enabled:!1,jitter:1}),x(this,`fringing`,{intensity:0}),x(this,`colorEnhance`,{enabled:!1,shadows:0,highlights:0,vibrance:0,midtones:0,dehaze:0}),x(this,`dof`,{enabled:!1,nearBlur:!1,focusDistance:100,focusRange:10,blurRadius:3,blurRings:4,blurRingPoints:5,highQuality:!0}),x(this,`volumetricFog`,{enabled:!1,light:null,localOmniLights:!1,localSpotLights:!1,localIntensity:1,localSteps:12,tint:new S(1,1,1),density:.01,heightBase:0,heightFalloff:.05,extinction:1,anisotropy:.6,intensity:1,ambientColor:new S(1,1,1),ambientIntensity:.02,maxDistance:300,steps:24,scale:.5}),x(this,`debug`,null),x(this,`options`,new q),x(this,`renderPassCamera`,null),this.app=e,this.cameraComponent=t,this.updateOptions(),this.enable(),this.cameraLayersChanged=t.on(`set:layers`,()=>{this.renderPassCamera&&(this.renderPassCamera.layersDirty=!0)})}destroy(){this.disable(),this.cameraLayersChanged.off()}enable(){this.renderPassCamera=this.createRenderPass(),this.cameraComponent.framePasses=[this.renderPassCamera]}disable(){let e=this.cameraComponent;e.framePasses?.forEach(e=>{e.destroy()}),e.framePasses=[],e.rendering=null,e.jitter=0,e.shaderParams.ssaoEnabled=!1,this.renderPassCamera=null}createRenderPass(){return new Y(this.app,this,this.cameraComponent,this.options)}set enabled(e){this._enabled!==e&&(e?this.enable():this.disable(),this._enabled=e)}get enabled(){return this._enabled}updateOptions(){let{options:e,rendering:t,bloom:n,taa:r,ssao:i}=this;e.stencil=t.stencil,e.samples=t.samples,e.sceneColorMap=t.sceneColorMap,e.prepassEnabled=t.sceneDepthMap,e.bloomEnabled=n.intensity>0,e.taaEnabled=r.enabled,e.ssaoType=i.type,e.ssaoBlurEnabled=i.blurEnabled,e.formats=t.renderFormats.slice(),e.dofEnabled=this.dof.enabled,e.dofNearBlur=this.dof.nearBlur,e.dofHighQuality=this.dof.highQuality,e.volumetricFogEnabled=this._volumetricFogSupported()}_volumetricFogSupported(){let{volumetricFog:e,cameraComponent:t}=this;if(!e.enabled||e.light&&e.light.type!==`directional`)return!1;let n=e.localOmniLights||e.localSpotLights;return n&&!t.system.app.scene.clusteredLightingEnabled&&(n=!1),!(!e.light&&!n||t.projection!==0)}static isSplatSceneDepthSupported(e){return Y.isSceneTextureDepthSupported(e)}update(){if(!this._enabled)return;let e=this.cameraComponent,{options:n,renderPassCamera:r,rendering:i,bloom:a,grading:o,colorEnhance:s,vignette:c,fringing:l,taa:u,ssao:d}=this;this.updateOptions(),r.update(n);let{composePass:f,bloomPass:p,ssaoPass:m,dofPass:h,volumetricFogPass:g}=r;if(r.renderTargetScale=t.clamp(i.renderTargetScale,.1,1),f.toneMapping=i.toneMapping,f.sharpness=i.sharpness,n.bloomEnabled&&p&&(f.bloomIntensity=a.intensity,p.blurLevel=a.blurLevel),n.dofEnabled&&(h.focusDistance=this.dof.focusDistance,h.focusRange=this.dof.focusRange,h.blurRadius=this.dof.blurRadius,h.blurRings=this.dof.blurRings,h.blurRingPoints=this.dof.blurRingPoints),n.volumetricFogEnabled){let{volumetricFog:e}=this;g.light=e.light?.light??null,g.localOmniLights=e.localOmniLights,g.localSpotLights=e.localSpotLights,g.localIntensity=e.localIntensity,g.localSteps=t.clamp(e.localSteps,2,64),g.tint.copy(e.tint),g.density=e.density,g.heightBase=e.heightBase,g.heightFalloff=e.heightFalloff,g.extinction=Math.max(e.extinction,0),g.anisotropy=t.clamp(e.anisotropy,0,.95),g.intensity=e.intensity,g.ambientColor.copy(e.ambientColor),g.ambientIntensity=e.ambientIntensity,g.maxDistance=e.maxDistance,g.steps=t.clamp(e.steps,4,128),g.scale=t.clamp(e.scale,.25,1)}n.ssaoType!==`none`&&(m.intensity=d.intensity,m.power=d.power,m.radius=d.radius,m.sampleCount=d.samples,m.minAngle=d.minAngle,m.scale=d.scale,m.randomize=d.randomize),f.gradingEnabled=o.enabled,o.enabled&&(f.gradingSaturation=o.saturation,f.gradingBrightness=o.brightness,f.gradingContrast=o.contrast,f.gradingTint=o.tint),f.colorLUT=this.colorLUT.texture,f.colorLUTIntensity=this.colorLUT.intensity,f.colorLUT2=this.colorLUT.texture2,f.colorLUT2Intensity=this.colorLUT.intensity2,f.colorLUTBlend=this.colorLUT.blend,f.vignetteEnabled=c.intensity>0,f.vignetteEnabled&&(f.vignetteInner=c.inner,f.vignetteOuter=c.outer,f.vignetteCurvature=c.curvature,f.vignetteIntensity=c.intensity,f.vignetteColor.copy(c.color)),f.fringingEnabled=l.intensity>0,f.fringingEnabled&&(f.fringingIntensity=l.intensity),f.colorEnhanceEnabled=s.enabled,s.enabled&&(f.colorEnhanceShadows=s.shadows,f.colorEnhanceHighlights=s.highlights,f.colorEnhanceVibrance=s.vibrance,f.colorEnhanceMidtones=s.midtones,f.colorEnhanceDehaze=s.dehaze),e.jitter=u.enabled?u.jitter:0,f.debug=this.debug,f.debug===`ssao`&&n.ssaoType===`none`&&(f.debug=null),f.debug===`vignette`&&!f.vignetteEnabled&&(f.debug=null)}},X=[{name:`ultra`,fx:[`cf`,`msaa4`,`env`,`shadows2`,`soft`,`ssao`,`bloom`,`grade`,`water`],scale:1},{name:`high`,fx:[`cf`,`msaa4`,`env`,`shadows2`,`bloom`,`grade`,`water`],scale:1},{name:`medium`,fx:[`cf`,`msaa2`,`env`,`shadows`,`grade`,`water`],scale:1},{name:`low`,fx:[`cf`,`msaa2`,`env`,`grade`,`water`],scale:.85},{name:`lowest`,fx:[`cf`,`env`,`water`],scale:.7}],Z=null,Q=new i;function Je(){let e=new d;e.diffuse=te(2787010),e.useMetalness=!0,e.metalness=0,e.gloss=.9,e.useSkybox=!0;let t=document.createElement(`canvas`);t.width=t.height=128;let r=t.getContext(`2d`),a=r.createImageData(128,128),o=(e,t)=>{let r=e/128*Math.PI*2,i=t/128*Math.PI*2;return n(3+Math.cos(r)*2.2,5+Math.sin(r)*2.2+Math.cos(i)*2.2)*.6+n(Math.sin(i)*4.4+9,Math.cos(r)*4.4)*.4};for(let e=0;e<128;e++)for(let t=0;t<128;t++){let n=o(t+1,e)-o(t-1,e),r=o(t,e+1)-o(t,e-1),i=-n*3,s=-r*3,c=Math.hypot(i,s,1),l=(e*128+t)*4;a.data[l]=(i/c*.5+.5)*255,a.data[l+1]=(s/c*.5+.5)*255,a.data[l+2]=(1/c*.5+.5)*255,a.data[l+3]=255}r.putImageData(a,0,0);let s=new b(E,{width:128,height:128,format:7,mipmaps:!0,minFilter:5,magFilter:1,addressU:0,addressV:0,anisotropy:4});return s.setSource(t),e.normalMap=s,e.bumpiness=.55,e.normalMapTiling=new i(1,1),e.update(),Z=e}function Ye(){let e=document.createElement(`canvas`);e.width=256,e.height=128;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,0,128);n.addColorStop(0,`#9cc8ee`),n.addColorStop(.35,`#c9e2f4`),n.addColorStop(.5,`#f1efe4`),n.addColorStop(.53,`#a8a57c`),n.addColorStop(1,`#5e6a44`),t.fillStyle=n,t.fillRect(0,0,256,128);let r=new b(E,{width:256,height:128,format:20,projection:ae,mipmaps:!1,minFilter:1,magFilter:1,addressU:0,addressV:1});r.setSource(e);let i=a.generateLightingSource(r,{size:128}),o=a.generateAtlas(i);return i.destroy(),r.destroy(),o}function $(){let e=u.get(`fx`);if(e!==null)return{fixed:new Set(e.split(`,`).filter(Boolean)),level:-1};let t=u.get(`q`);return{fixed:null,level:t===null?X.length:Math.max(1,Math.min(X.length,Number(t)||1))}}var Xe=class{constructor(e,t,n,r){this.cam=e,this.sun=t,this.fill=n,this.setBlob=r,this.frame=null,this.atlas=null,this.fx=new Set,this.slowT=0,this.ema=16.7,this.cool=0,this.onScale=null;let i=$();this.level=i.level,this.auto=i.fixed===null&&u.get(`q`)===null&&u.get(`noadapt`)!==`1`,this.apply(i.fixed??new Set(X[X.length-this.level].fx))}get name(){return this.level>0?X[X.length-this.level].name:[...this.fx].join(`+`)||`none`}get scale(){return this.level>0?X[X.length-this.level].scale:1}get list(){return[...this.fx].join(`,`)}apply(e){this.fx=e;let t=t=>e.has(t),n=O.scene;t(`env`)?(this.atlas??(this.atlas=Ye()),n.envAtlas=this.atlas,n.skyboxIntensity=1,this.fill.enabled=!1):(n.envAtlas=null,this.fill.enabled=!0);let r=t(`shadows`)||t(`shadows2`),i=this.sun;if(i.castShadows=r,r&&(i.shadowResolution=t(`shadows2`)?2048:1024,i.numCascades=t(`shadows2`)?2:1,i.cascadeDistribution=.55,i.shadowDistance=t(`shadows2`)?220:110,i.shadowType=t(`soft`)?4:0,i.shadowBias=.25,i.normalOffsetBias=.08,i.shadowIntensity=.75),this.setBlob(!r),Z&&(Z.normalMap=t(`water`)?Z.normalMap??null:Z.normalMap,Z.bumpiness=+!!t(`water`),Z.gloss=t(`water`)?.86:.5,Z.update()),!t(`cf`)){this.frame?.destroy(),this.frame=null,this.cam.toneMapping=5;return}let a=this.frame??(this.frame=new qe(O,this.cam));a.rendering.samples=t(`msaa4`)?4:t(`msaa2`)?2:1,a.rendering.toneMapping=5,a.rendering.sharpness=t(`taa`)?.4:0,a.taa.enabled=t(`taa`),a.ssao.type=t(`ssao`)?P:N,a.ssao.intensity=.8,a.ssao.radius=6,a.ssao.samples=10,a.ssao.power=4,a.ssao.scale=.5,a.bloom.intensity=t(`bloom`)?.012:0,a.bloom.blurLevel=12,a.grading.enabled=t(`grade`),a.grading.saturation=.96,a.grading.contrast=1.05,a.grading.brightness=1,a.grading.tint=new S(1,.99,.96),a.colorEnhance.enabled=t(`grade`),a.colorEnhance.vibrance=0,a.colorEnhance.shadows=0,a.colorEnhance.dehaze=.08,a.vignette.intensity=t(`grade`)?.22:0,a.vignette.inner=.55,a.vignette.outer=1.25,a.volumetricFog.enabled=t(`vfog`)&&r,a.volumetricFog.light=i,a.volumetricFog.density=.004,a.volumetricFog.heightFalloff=.02,a.volumetricFog.maxDistance=250,a.update()}frame_(e,t){if(Z&&this.fx.has(`water`)&&(Q.x=(Q.x+e*.006)%1,Q.y=(Q.y+e*.004)%1,Z.normalMapOffset=Q,Z.update()),!(!this.auto||t>200)){if(this.cool-=t/1e3,this.ema+=(t-this.ema)*.05,this.ema>19.5&&this.level>1&&this.cool<=0){if(this.slowT+=t/1e3,this.slowT>2){this.level--;let e=X[X.length-this.level];this.apply(new Set(e.fx)),this.onScale?.(e.scale),this.slowT=0,this.cool=3,this.ema=16.7}}else this.slowT=0}}get gpuMs(){return E.gpuProfiler?._frameTime??0}};export{X as LADDER,Xe as Look,Je as makeWaterMaterial,$ as parseFx};