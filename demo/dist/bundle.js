var paletteDemo=function(){"use strict";var e=!1,t=Array.isArray,n=Array.prototype.indexOf,r=Array.prototype.includes,o=Array.from,c=Object.defineProperty,s=Object.getOwnPropertyDescriptor,a=Object.getOwnPropertyDescriptors,l=Object.prototype,i=Array.prototype,u=Object.getPrototypeOf,f=Object.isExtensible;function d(e){return"function"==typeof e}const h=()=>{};function p(e){return e()}function v(e){for(var t=0;t<e.length;t++)e[t]()}function y(){var e,t;return{promise:new Promise((n,r)=>{e=n,t=r}),resolve:e,reject:t}}const g=1<<24,m=16,b=32,k=64,w=512,_=1024,x=2048,$=4096,M=8192,S=16384,P=32768,j=1<<25,A=65536,N=1<<17,E=1<<19,T=1<<25,O=65536,C=1<<21,I=1<<23,D=Symbol("$state"),L=Symbol("legacy props"),z=Symbol(""),R=Symbol("attributes"),q=Symbol("class"),W=Symbol("style"),H=Symbol("text"),F=new class extends Error{name="StaleReactionError";message="The reaction that called `getAbortSignal()` was re-run or destroyed"},V=!!globalThis.document?.contentType&&globalThis.document.contentType.includes("xml");function B(e){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}const G=Symbol("uninitialized"),U="http://www.w3.org/1999/xhtml";function K(e){return e===this.v}function Y(e){return!function(e,t){return e!=e?t==t:e!==t||null!==e&&"object"==typeof e||"function"==typeof e}(e,this.v)}let J=!1;let X=null;function Z(e){X=e}function Q(e){return function(){null===X&&B();return X.c??=new Map(function(e){let t=e.p;for(;null!==t;){const e=t.c;if(null!==e)return e;t=t.p}return null}(X)||void 0)}().get(e)}function ee(e,t=!1,n){X={p:X,i:!1,c:null,e:null,s:e,x:null,r:Bt,l:J&&!t?{s:null,u:null,$:[]}:null}}function te(e){var t=X,n=t.e;if(null!==n)for(var r of(t.e=null,n))_t(r);return t.i=!0,X=t.p,{}}function ne(){return!J||null!==X&&null===X.l}let re=[];function oe(){var e=re;re=[],v(e)}function ce(e){if(0===re.length&&!ke){var t=re;queueMicrotask(()=>{t===re&&oe()})}re.push(e)}function se(){for(;re.length>0;)oe()}function ae(e){var t=Bt;if(null===t)return Ht.f|=I,e;if(0===(t.f&P)&&!(4&t.f))throw e;le(e,t)}function le(e,t){for(;null!==t;){if(128&t.f){if(0===(t.f&P))throw e;try{return void t.b.error(e)}catch(t){e=t}}t=t.parent}throw e}const ie=-7169;function ue(e,t){e.f=e.f&ie|t}function fe(e){0!==(e.f&w)||null===e.deps?ue(e,_):ue(e,$)}function de(e){if(null!==e)for(const t of e)2&t.f&&0!==(t.f&O)&&(t.f^=O,de(t.deps))}function he(e,t,n){0!==(e.f&x)?t.add(e):0!==(e.f&$)&&n.add(e),de(e.deps),ue(e,_)}let pe=null,ve=null,ye=null,ge=null,me=null,be=null,ke=!1,we=!1,_e=null,xe=null;var $e=0;new Set;let Me=1;class Se{id=Me++;#e=!1;linked=!0;#t=null;#n=null;async_deriveds=new Map;current=new Map;previous=new Map;unblocked=new Set;#r=new Set;#o=new Set;#c=new Set;#s=0;#a=new Map;#l=null;#i=[];#u=[];#f=new Set;#d=new Set;#h=new Map;#p=new Set;is_fork=!1;#v=!1;#y(){if(this.is_fork)return!0;for(const n of this.#a.keys()){for(var e=n,t=!1;null!==e.parent;){if(this.#h.has(e)){t=!0;break}e=e.parent}if(!t)return!0}return!1}skip_effect(e){this.#h.has(e)||this.#h.set(e,{d:[],m:[]}),this.#p.delete(e)}unskip_effect(e,t=e=>this.schedule(e)){var n=this.#h.get(e);if(n){for(var r of(this.#h.delete(e),n.d))ue(r,x),t(r);for(r of n.m)ue(r,$),t(r)}this.#p.add(e)}#g(){if(this.#e=!0,$e++>1e3&&(this.#m(),function(){try{!function(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}()}catch(e){le(e,be)}}()),!this.#y()){for(const e of this.#f)this.#d.delete(e),ue(e,x),this.schedule(e);for(const e of this.#d)ue(e,$),this.schedule(e)}const e=this.#i;this.#i=[],this.apply();var t=_e=[],n=[],r=xe=[];for(const r of e)try{this.#b(r,t,n)}catch(e){throw Oe(r),e}if(ye=null,r.length>0){var o=Se.ensure();for(const e of r)o.schedule(e)}if(_e=null,xe=null,this.#y()){this.#k(n),this.#k(t);for(const[e,t]of this.#h)Te(e,t);return void(r.length>0&&ye.#g())}const c=this.#w();if(c)c.#_(this);else{this.#f.clear(),this.#d.clear();for(const e of this.#r)e(this);this.#r.clear(),ge=this,je(n),je(t),ge=null,this.#l?.resolve();var s=ye;if(this.linked&&0===this.#s&&this.#m(),this.#i.length>0){null===s&&(s=this,this.#x());const e=s;e.#i.push(...this.#i.filter(t=>!e.#i.includes(t)))}null!==s&&s.#g()}}#b(e,t,n){e.f^=_;for(var r=e.first;null!==r;){var o=r.f,c=!!(96&o);if(!(c&&0!==(o&_)||0!==(o&M)||this.#h.has(r))&&null!==r.fn){c?r.f^=_:4&o?t.push(r):rn(r)&&(0!==(o&m)&&this.#d.add(r),ln(r));var s=r.first;if(null!==s){r=s;continue}}for(;null!==r;){var a=r.next;if(null!==a){r=a;break}r=r.parent}}}#w(){for(var e=this.#t;null!==e;){if(!e.is_fork)for(const[t,[,n]]of this.current)if(e.current.has(t)&&!n)return e;e=e.#t}return null}#_(e){for(const[t,n]of e.current)!this.previous.has(t)&&e.previous.has(t)&&this.previous.set(t,e.previous.get(t)),this.current.set(t,n);for(const[t,n]of e.async_deriveds){const e=this.async_deriveds.get(t);e&&n.promise.then(e.resolve)}const t=e=>{var n=e.reactions;if(null!==n)for(const e of n){var r=e.f;if(2&r)t(e);else{var o=e;4194320&r&&!this.async_deriveds.has(o)&&(this.#d.delete(o),ue(o,x),this.schedule(o))}}};for(const e of this.current.keys())t(e);this.oncommit(()=>e.discard()),e.#m(),ye=this,this.#g()}#k(e){for(var t=0;t<e.length;t+=1)he(e[t],this.#f,this.#d)}capture(e,t,n=!1){e.v===G||this.previous.has(e)||this.previous.set(e,e.v),0===(e.f&I)&&(this.current.set(e,[t,n]),me?.set(e,t)),this.is_fork||(e.v=t)}activate(){ye=this}deactivate(){ye=null,me=null}flush(){try{e,we=!0,ye=this,this.#g()}finally{$e=0,be=null,_e=null,xe=null,we=!1,ye=null,me=null,Ge.clear()}}discard(){for(const e of this.#o)e(this);this.#o.clear(),this.#c.clear(),this.#m()}register_created_effect(e){this.#u.push(e)}#$(){this.#m();for(let i=pe;null!==i;i=i.#n){var e=i.id<this.id,t=[];for(const[r,[o,c]]of this.current){if(i.current.has(r)){var n=i.current.get(r)[0];if(!e||o===n)continue;i.current.set(r,[o,c])}t.push(r)}if(e)for(const[e,t]of this.async_deriveds){const n=i.async_deriveds.get(e);n&&t.promise.then(n.resolve)}if(i.#e){var r=[...i.current.keys()].filter(e=>!this.current.has(e));if(0===r.length)e&&i.discard();else if(t.length>0){if(e)for(const e of this.#p)i.unskip_effect(e,e=>{4194320&e.f?i.schedule(e):i.#k([e])});i.activate();var o=new Set,c=new Map;for(var s of t)Ae(s,r,o,c);c=new Map;var a=[...i.current.keys()].filter(e=>!this.current.has(e)||this.current.get(e)[0]!==e.v);if(a.length>0)for(const e of this.#u)155648&e.f||!Ne(e,a,c)||(4194320&e.f?(ue(e,x),i.schedule(e)):i.#f.add(e));if(i.#i.length>0){for(var l of(i.apply(),i.#i))i.#b(l,[],[]);i.#i=[]}i.deactivate()}}}}increment(e,t){if(this.#s+=1,e){let e=this.#a.get(t)??0;this.#a.set(t,e+1)}}decrement(e,t){if(this.#s-=1,e){let e=this.#a.get(t)??0;1===e?this.#a.delete(t):this.#a.set(t,e-1)}this.#v||(this.#v=!0,ce(()=>{this.#v=!1,this.linked&&this.flush()}))}transfer_effects(e,t){for(const t of e)this.#f.add(t);for(const e of t)this.#d.add(e);e.clear(),t.clear()}oncommit(e){this.#r.add(e)}ondiscard(e){this.#o.add(e)}on_fork_commit(e){this.#c.add(e)}run_fork_commit_callbacks(){for(const e of this.#c)e(this);this.#c.clear()}settled(){return(this.#l??=y()).promise}static ensure(){if(null===ye){const e=ye=new Se;e.#x(),we||ke||ce(()=>{e.#e||e.flush()})}return ye}apply(){me=null}schedule(e){if(be=e,e.b?.is_pending&&16777228&e.f&&0===(e.f&P))e.b.defer_effect(e);else{for(var t=e;null!==t.parent;){var n=(t=t.parent).f;if(!(null===_e||t!==Bt||null!==Ht&&2&Ht.f))return;if(96&n){if(0===(n&_))return;t.f^=_}}this.#i.push(t)}}#x(){null===ve?pe=ve=this:(ve.#n=this,this.#t=ve),ve=this}#m(){var e=this.#t,t=this.#n;null===e?pe=t:e.#n=t,null===t?ve=e:t.#t=e,this.linked=!1}}let Pe=null;function je(e){var t=e.length;if(0!==t){for(var n=0;n<t;){var r=e[n++];if(!(24576&r.f)&&rn(r)&&(Pe=new Set,ln(r),null===r.deps&&null===r.first&&null===r.nodes&&null===r.teardown&&null===r.ac&&Ot(r),Pe?.size>0)){Ge.clear();for(const e of Pe){if(24576&e.f)continue;const t=[e];let n=e.parent;for(;null!==n;)Pe.has(n)&&(Pe.delete(n),t.push(n)),n=n.parent;for(let e=t.length-1;e>=0;e--){const n=t[e];24576&n.f||ln(n)}}Pe.clear()}}Pe=null}}function Ae(e,t,n,r){if(!n.has(e)&&(n.add(e),null!==e.reactions))for(const o of e.reactions){const e=o.f;2&e?Ae(o,t,n,r):4194320&e&&0===(e&x)&&Ne(o,t,r)&&(ue(o,x),Ee(o))}}function Ne(e,t,n){const o=n.get(e);if(void 0!==o)return o;if(null!==e.deps)for(const o of e.deps){if(r.call(t,o))return!0;if(2&o.f&&Ne(o,t,n))return n.set(o,!0),!0}return n.set(e,!1),!1}function Ee(e){ye.schedule(e)}function Te(e,t){if(0===(e.f&b)||0===(e.f&_)){0!==(e.f&x)?t.d.push(e):0!==(e.f&$)&&t.m.push(e),ue(e,_);for(var n=e.first;null!==n;)Te(n,t),n=n.next}}function Oe(e){ue(e,_);for(var t=e.first;null!==t;)Oe(t),t=t.next}class Ce{parent;is_pending=!1;transform_error;#M;#S=null;#P;#j;#A;#N=null;#E=null;#T=null;#O=null;#C=0;#I=0;#D=!1;#f=new Set;#d=new Set;#L=null;#z=function(e){let t,n=0,r=Ke(0);return()=>{bt()&&(fn(r),Mt(()=>(0===n&&(t=pn(()=>e(()=>Qe(r)))),n+=1,()=>{ce(()=>{n-=1,0===n&&(t?.(),t=void 0,Qe(r))})})))}}(()=>(this.#L=Ke(this.#C),()=>{this.#L=null}));constructor(e,t,n,r){this.#M=e,this.#P=t,this.#j=e=>{var t=Bt;t.b=this,t.f|=128,n(e)},this.parent=Bt.b,this.transform_error=r??this.parent?.transform_error??(e=>e),this.#A=Pt(()=>{this.#R()},589824)}#q(){try{this.#N=At(()=>this.#j(this.#M))}catch(e){this.error(e)}}#W(e){const t=this.#P.failed;t&&(this.#T=At(()=>{t(this.#M,()=>e,()=>()=>{})}))}#H(){const e=this.#P.pending;e&&(this.is_pending=!0,this.#E=At(()=>e(this.#M)),ce(()=>{var e=this.#O=document.createDocumentFragment(),t=lt();e.append(t),this.#N=this.#F(()=>At(()=>this.#j(t))),0===this.#I&&(this.#M.before(e),this.#O=null,Ct(this.#E,()=>{this.#E=null}),this.#V(ye))}))}#R(){try{if(this.is_pending=this.has_pending_snippet(),this.#I=0,this.#C=0,this.#N=At(()=>{this.#j(this.#M)}),this.#I>0){var e=this.#O=document.createDocumentFragment();zt(this.#N,e);const t=this.#P.pending;this.#E=At(()=>t(this.#M))}else this.#V(ye)}catch(e){this.error(e)}}#V(e){this.is_pending=!1,e.transfer_effects(this.#f,this.#d)}defer_effect(e){he(e,this.#f,this.#d)}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!this.#P.pending}#F(e){var t=Bt,n=Ht,r=X;Gt(this.#A),Vt(this.#A),Z(this.#A.ctx);try{return Se.ensure(),e()}catch(e){return ae(e),null}finally{Gt(t),Vt(n),Z(r)}}#B(e,t){this.has_pending_snippet()?(this.#I+=e,0===this.#I&&(this.#V(t),this.#E&&Ct(this.#E,()=>{this.#E=null}),this.#O&&(this.#M.before(this.#O),this.#O=null))):this.parent&&this.parent.#B(e,t)}update_pending_count(e,t){this.#B(e,t),this.#C+=e,this.#L&&!this.#D&&(this.#D=!0,ce(()=>{this.#D=!1,this.#L&&Ze(this.#L,this.#C)}))}get_effect_pending(){return this.#z(),fn(this.#L)}error(e){if(!this.#P.onerror&&!this.#P.failed)throw e;ye?.is_fork?(this.#N&&ye.skip_effect(this.#N),this.#E&&ye.skip_effect(this.#E),this.#T&&ye.skip_effect(this.#T),ye.on_fork_commit(()=>{this.#G(e)})):this.#G(e)}#G(e){this.#N&&(Tt(this.#N),this.#N=null),this.#E&&(Tt(this.#E),this.#E=null),this.#T&&(Tt(this.#T),this.#T=null);var t=this.#P.onerror;let n=this.#P.failed;var r=!1,o=!1;const c=()=>{r?console.warn("https://svelte.dev/e/svelte_boundary_reset_noop"):(r=!0,o&&function(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}(),null!==this.#T&&Ct(this.#T,()=>{this.#T=null}),this.#F(()=>{this.#R()}))},s=e=>{try{o=!0,t?.(e,c),o=!1}catch(e){le(e,this.#A&&this.#A.parent)}n&&(this.#T=this.#F(()=>{try{return At(()=>{var t=Bt;t.b=this,t.f|=128,n(this.#M,()=>e,()=>c)})}catch(e){return le(e,this.#A.parent),null}}))};ce(()=>{var t;try{t=this.transform_error(e)}catch(e){return void le(e,this.#A&&this.#A.parent)}null!==t&&"object"==typeof t&&"function"==typeof t.then?t.then(s,e=>le(e,this.#A&&this.#A.parent)):s(t)})}}function Ie(e,t,n,r){const o=ne()?ze:We;var c=e.filter(e=>!e.settled);if(0!==n.length||0!==c.length){var s=Bt,a=function(){var e=Bt,t=Ht,n=X,r=ye;return function(o=!0){Gt(e),Vt(t),Z(n),o&&0===(e.f&S)&&(r?.activate(),r?.apply())}}(),l=1===c.length?c[0].promise:c.length>1?Promise.all(c.map(e=>e.promise)):null,i=Le();0!==n.length?l?l.then(()=>{a(),f(),De()}):f():l.then(()=>u(t.map(o))).finally(i)}else r(t.map(o));function u(e){if(0===(s.f&S)){a();try{r(e)}catch(e){le(e,s)}De()}}function f(){Promise.all(n.map(e=>function(e){let t=Bt;null===t&&function(){throw new Error("https://svelte.dev/e/async_derived_orphan")}();var n=void 0,r=Ke(G),o=!Ht,c=new Set;return function(e){mt(4718592,e)}(()=>{var s=Bt,a=y();n=a.promise;try{Promise.resolve(e()).then(a.resolve,e=>{e!==F&&a.reject(e)}).finally(De)}catch(e){a.reject(e),De()}var l=ye;if(o){if(0!==(s.f&P))var i=Le();if(t.b.is_rendered())l.async_deriveds.get(s)?.reject(Re);else for(const e of c.values())e.reject(Re);c.add(a),l.async_deriveds.set(s,a)}const u=(e,t=void 0)=>{i?.(),c.delete(a),t!==Re&&(l.activate(),t?(r.f|=I,Ze(r,t)):(0!==(r.f&I)&&(r.f^=I),Ze(r,e)),l.deactivate())};a.promise.then(u,e=>u(null,e||"unknown"))}),kt(()=>{for(const e of c)e.reject(Re)}),new Promise(e=>{function t(o){function c(){o===n?e(r):t(n)}o.then(c,c)}t(n)})}(e))).then(e=>u([...t.map(o),...e])).catch(e=>le(e,s)).finally(i)}}function De(e=!0){Gt(null),Vt(null),Z(null),e&&ye?.deactivate()}function Le(){var e=Bt,t=e.b,n=ye,r=t.is_rendered();return t.update_pending_count(1,n),n.increment(r,e),()=>{t.update_pending_count(-1,n),n.decrement(r,e)}}function ze(e){null!==Bt&&(Bt.f|=E);return{ctx:X,deps:null,effects:null,equals:K,f:2050,fn:e,reactions:null,rv:0,v:G,wv:0,parent:Bt,ac:null}}const Re=Symbol("obsolete");function qe(e){const t=ze(e);return Kt(t),t}function We(e){const t=ze(e);return t.equals=Y,t}function He(e){var t,n=Bt,r=e.parent;if(!qt&&null!==r&&e.v!==G&&24576&r.f)return console.warn("https://svelte.dev/e/derived_inert"),e.v;Gt(r);try{e.f&=-65537,function(e){var t=e.effects;if(null!==t){e.effects=null;for(var n=0;n<t.length;n+=1)Tt(t[n])}}(e),t=cn(e)}finally{Gt(n)}return t}function Fe(e){var t=He(e);e.equals(t)||(e.wv=nn(),ye?.is_fork&&null!==e.deps||(null!==ye?(ye.capture(e,t,!0),ge?.capture(e,t,!0)):e.v=t,null!==e.deps))?qt||(null!==me?(bt()||ye?.is_fork)&&me.set(e,t):fe(e)):ue(e,_)}function Ve(e){if(null!==e.effects)for(const t of e.effects)t.teardown&&null!==t.fn&&ln(t)}let Be=new Set;const Ge=new Map;let Ue=!1;function Ke(e,t){return{f:0,v:e,reactions:null,equals:K,rv:0,wv:0}}function Ye(e,t){const n=Ke(e);return Kt(n),n}function Je(e,t=!1,n=!0){const r=Ke(e);return t||(r.equals=Y),J&&n&&null!==X&&null!==X.l&&(X.l.s??=[]).push(r),r}function Xe(e,t,n=!1){return null===Ht||Ft&&0===(Ht.f&N)||!ne()||!(4325394&Ht.f)||null!==Ut&&r.call(Ut,e)||function(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}(),Ze(e,n?tt(t):t,xe)}function Ze(e,t,n=null){if(!e.equals(t)){Ge.set(e,qt?t:e.v);var r=Se.ensure();if(r.capture(e,t),2&e.f){const t=e;0!==(e.f&x)&&He(t),null===me&&fe(t)}e.wv=nn(),et(e,x,n),!ne()||null===Bt||0===(Bt.f&_)||96&Bt.f||(null===Xt?function(e){Xt=e}([e]):Xt.push(e)),!r.is_fork&&Be.size>0&&!Ue&&function(){Ue=!1;for(const e of Be){let t;0!==(e.f&_)&&ue(e,$);try{t=rn(e)}catch{t=!0}t&&ln(e)}Be.clear()}()}return t}function Qe(e){Xe(e,e.v+1)}function et(e,t,n){var r=e.reactions;if(null!==r)for(var o=ne(),c=r.length,s=0;s<c;s++){var a=r[s],l=a.f;if(o||a!==Bt){var i=0===(l&x);if(i&&ue(a,t),0!==(l&N))Be.add(a);else if(2&l){var u=a;me?.delete(u),0===(l&O)&&(l&w&&(null===Bt||0===(Bt.f&C))&&(a.f|=O),et(u,$,n))}else if(i){var f=a;0!==(l&m)&&null!==Pe&&Pe.add(f),null!==n?n.push(f):Ee(f)}}}}function tt(e){if("object"!=typeof e||null===e||D in e)return e;const n=u(e);if(n!==l&&n!==i)return e;var r=new Map,o=t(e),c=Ye(0),a=en,f=e=>{if(en===a)return e();var t=Ht,n=en;Vt(null),tn(a);var r=e();return Vt(t),tn(n),r};return o&&r.set("length",Ye(e.length)),new Proxy(e,{defineProperty(e,t,n){"value"in n&&!1!==n.configurable&&!1!==n.enumerable&&!1!==n.writable||function(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}();var o=r.get(t);return void 0===o?f(()=>{var e=Ye(n.value);return r.set(t,e),e}):Xe(o,n.value,!0),!0},deleteProperty(e,t){var n=r.get(t);if(void 0===n){if(t in e){const e=f(()=>Ye(G));r.set(t,e),Qe(c)}}else Xe(n,G),Qe(c);return!0},get(t,n,o){if(n===D)return e;var c=r.get(n),a=n in t;if(void 0!==c||a&&!s(t,n)?.writable||(c=f(()=>Ye(tt(a?t[n]:G))),r.set(n,c)),void 0!==c){var l=fn(c);return l===G?void 0:l}return Reflect.get(t,n,o)},getOwnPropertyDescriptor(e,t){var n=Reflect.getOwnPropertyDescriptor(e,t);if(n&&"value"in n){var o=r.get(t);o&&(n.value=fn(o))}else if(void 0===n){var c=r.get(t),s=c?.v;if(void 0!==c&&s!==G)return{enumerable:!0,configurable:!0,value:s,writable:!0}}return n},has(e,t){if(t===D)return!0;var n=r.get(t),o=void 0!==n&&n.v!==G||Reflect.has(e,t);if((void 0!==n||null!==Bt&&(!o||s(e,t)?.writable))&&(void 0===n&&(n=f(()=>Ye(o?tt(e[t]):G)),r.set(t,n)),fn(n)===G))return!1;return o},set(e,t,n,a){var l=r.get(t),i=t in e;if(o&&"length"===t)for(var u=n;u<l.v;u+=1){var d=r.get(u+"");void 0!==d?Xe(d,G):u in e&&(d=f(()=>Ye(G)),r.set(u+"",d))}void 0===l?i&&!s(e,t)?.writable||(Xe(l=f(()=>Ye(void 0)),tt(n)),r.set(t,l)):(i=l.v!==G,Xe(l,f(()=>tt(n))));var h=Reflect.getOwnPropertyDescriptor(e,t);if(h?.set&&h.set.call(a,n),!i){if(o&&"string"==typeof t){var p=r.get("length"),v=Number(t);Number.isInteger(v)&&v>=p.v&&Xe(p,v+1)}Qe(c)}return!0},ownKeys(e){fn(c);var t=Reflect.ownKeys(e).filter(e=>{var t=r.get(e);return void 0===t||t.v!==G});for(var[n,o]of r)o.v===G||n in e||t.push(n);return t},setPrototypeOf(){!function(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}()}})}function nt(e){try{if(null!==e&&"object"==typeof e&&D in e)return e[D]}catch{}return e}function rt(e,t){return Object.is(nt(e),nt(t))}var ot,ct,st,at;function lt(e=""){return document.createTextNode(e)}function it(e){return st.call(e)}function ut(e){return at.call(e)}function ft(e,t){return it(e)}function dt(e,t=!1){var n=it(e);return n instanceof Comment&&""===n.data?ut(n):n}function ht(e,t=1,n=!1){let r=e;for(;t--;)r=ut(r);return r}function pt(e,t,n){let r;return document.createElementNS(t??U,e,r)}function vt(e,t){if(t){const t=document.body;e.autofocus=!0,ce(()=>{document.activeElement===t&&e.focus()})}}function yt(e){var t=Ht,n=Bt;Vt(null),Gt(null);try{return e()}finally{Vt(t),Gt(n)}}function gt(e){null===Bt&&(null===Ht&&function(){throw new Error("https://svelte.dev/e/effect_orphan")}(),function(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}()),qt&&function(){throw new Error("https://svelte.dev/e/effect_in_teardown")}()}function mt(e,t){var n=Bt;null!==n&&0!==(n.f&M)&&(e|=M);var r={ctx:X,deps:null,nodes:null,f:e|x|w,first:null,fn:t,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,wv:0,ac:null};ye?.register_created_effect(r);var o=r;if(4&e)null!==_e?_e.push(r):Se.ensure().schedule(r);else if(null!==t){try{ln(r)}catch(o){throw Tt(r),o}null===o.deps&&null===o.teardown&&null===o.nodes&&o.first===o.last&&0===(o.f&E)&&(o=o.first,0!==(e&m)&&0!==(e&A)&&null!==o&&(o.f|=A))}if(null!==o&&(o.parent=n,null!==n&&function(e,t){var n=t.last;null===n?t.last=t.first=e:(n.next=e,e.prev=n,t.last=e)}(o,n),null!==Ht&&2&Ht.f&&0===(e&k))){var c=Ht;(c.effects??=[]).push(o)}return r}function bt(){return null!==Ht&&!Ft}function kt(e){const t=mt(8,null);return ue(t,_),t.teardown=e,t}function wt(e){gt();var t=Bt.f;if(!(!Ht&&0!==(t&b)&&0===(t&P)))return _t(e);var n=X;(n.e??=[]).push(e)}function _t(e){return mt(1048580,e)}function xt(e){return mt(4,e)}function $t(e,t){var n={effect:null,ran:!1,deps:e};X.l.$.push(n),n.effect=Mt(()=>{if(e(),!n.ran){n.ran=!0;var r=Bt;try{Gt(r.parent),pn(t)}finally{Gt(r)}}})}function Mt(e,t=0){return mt(8|t,e)}function St(e,t=[],n=[],r=[]){Ie(r,t,n,t=>{mt(8,()=>e(...t.map(fn)))})}function Pt(e,t=0){return mt(m|t,e)}function jt(e,t=0){return mt(g|t,e)}function At(e){return mt(524320,e)}function Nt(e){var t=e.teardown;if(null!==t){const e=qt,n=Ht;Wt(!0),Vt(null);try{t.call(null)}finally{Wt(e),Vt(n)}}}function Et(e,t=!1){var n=e.first;for(e.first=e.last=null;null!==n;){const e=n.ac;null!==e&&yt(()=>{e.abort(F)});var r=n.next;0!==(n.f&k)?n.parent=null:Tt(n,t),n=r}}function Tt(e,t=!0){var n=!1;(t||262144&e.f)&&null!==e.nodes&&null!==e.nodes.end&&(!function(e,t){for(;null!==e;){var n=e===t?null:ut(e);e.remove(),e=n}}(e.nodes.start,e.nodes.end),n=!0),ue(e,j),Et(e,t&&!n),an(e,0);var r=e.nodes&&e.nodes.t;if(null!==r)for(const e of r)e.stop();Nt(e),e.f^=j,e.f|=S;var o=e.parent;null!==o&&null!==o.first&&Ot(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.fn=e.nodes=e.ac=e.b=null}function Ot(e){var t=e.parent,n=e.prev,r=e.next;null!==n&&(n.next=r),null!==r&&(r.prev=n),null!==t&&(t.first===e&&(t.first=r),t.last===e&&(t.last=n))}function Ct(e,t,n=!0){var r=[];It(e,r,!0);var o=()=>{n&&Tt(e),t&&t()},c=r.length;if(c>0){var s=()=>--c||o();for(var a of r)a.out(s)}else o()}function It(e,t,n){if(0===(e.f&M)){e.f^=M;var r=e.nodes&&e.nodes.t;if(null!==r)for(const e of r)(e.is_global||n)&&t.push(e);for(var o=e.first;null!==o;){var c=o.next;if(0===(o.f&k))It(o,t,!!(0!==(o.f&A)||0!==(o.f&b)&&0!==(e.f&m))&&n);o=c}}}function Dt(e){Lt(e,!0)}function Lt(e,t){if(0!==(e.f&M)){e.f^=M,0===(e.f&_)&&(ue(e,x),Se.ensure().schedule(e));for(var n=e.first;null!==n;){var r=n.next;Lt(n,!!(0!==(n.f&A)||0!==(n.f&b))&&t),n=r}var o=e.nodes&&e.nodes.t;if(null!==o)for(const e of o)(e.is_global||t)&&e.in()}}function zt(e,t){if(e.nodes)for(var n=e.nodes.start,r=e.nodes.end;null!==n;){var o=n===r?null:ut(n);t.append(n),n=o}}let Rt=!1,qt=!1;function Wt(e){qt=e}let Ht=null,Ft=!1;function Vt(e){Ht=e}let Bt=null;function Gt(e){Bt=e}let Ut=null;function Kt(e){null!==Ht&&(null===Ut?Ut=[e]:Ut.push(e))}let Yt=null,Jt=0,Xt=null;let Zt=1,Qt=0,en=Qt;function tn(e){en=e}function nn(){return++Zt}function rn(e){var t=e.f;if(0!==(t&x))return!0;if(2&t&&(e.f&=-65537),0!==(t&$)){for(var n=e.deps,r=n.length,o=0;o<r;o++){var c=n[o];if(rn(c)&&Fe(c),c.wv>e.wv)return!0}0!==(t&w)&&null===me&&ue(e,_)}return!1}function on(e,t,n=!0){var o=e.reactions;if(null!==o&&(null===Ut||!r.call(Ut,e)))for(var c=0;c<o.length;c++){var s=o[c];2&s.f?on(s,t,!1):t===s&&(n?ue(s,x):0!==(s.f&_)&&ue(s,$),Ee(s))}}function cn(e){var t=Yt,n=Jt,r=Xt,o=Ht,c=Ut,s=X,a=Ft,l=en,i=e.f;Yt=null,Jt=0,Xt=null,Ht=96&i?null:e,Ut=null,Z(e.ctx),Ft=!1,en=++Qt,null!==e.ac&&(yt(()=>{e.ac.abort(F)}),e.ac=null);try{e.f|=C;var u=(0,e.fn)();e.f|=P;var f=e.deps,d=ye?.is_fork;if(null!==Yt){var h;if(d||an(e,Jt),null!==f&&Jt>0)for(f.length=Jt+Yt.length,h=0;h<Yt.length;h++)f[Jt+h]=Yt[h];else e.deps=f=Yt;if(bt()&&0!==(e.f&w))for(h=Jt;h<f.length;h++)(f[h].reactions??=[]).push(e)}else!d&&null!==f&&Jt<f.length&&(an(e,Jt),f.length=Jt);if(ne()&&null!==Xt&&!Ft&&null!==f&&!(6146&e.f))for(h=0;h<Xt.length;h++)on(Xt[h],e);if(null!==o&&o!==e){if(Qt++,null!==o.deps)for(let e=0;e<n;e+=1)o.deps[e].rv=Qt;if(null!==t)for(const e of t)e.rv=Qt;null!==Xt&&(null===r?r=Xt:r.push(...Xt))}return 0!==(e.f&I)&&(e.f^=I),u}catch(e){return ae(e)}finally{e.f^=C,Yt=t,Jt=n,Xt=r,Ht=o,Ut=c,Z(s),Ft=a,en=l}}function sn(e,t){let o=t.reactions;if(null!==o){var c=n.call(o,e);if(-1!==c){var s=o.length-1;0===s?o=t.reactions=null:(o[c]=o[s],o.pop())}}if(null===o&&2&t.f&&(null===Yt||!r.call(Yt,t))){var a=t;0!==(a.f&w)&&(a.f^=w,a.f&=-65537),a.v!==G&&fe(a),function(e){if(null!==e.effects)for(const t of e.effects)(t.teardown||t.ac)&&(t.teardown?.(),t.ac?.abort(F),null!==t.fn&&(t.teardown=h),t.ac=null,an(t,0),Et(t))}(a),an(a,0)}}function an(e,t){var n=e.deps;if(null!==n)for(var r=t;r<n.length;r++)sn(e,n[r])}function ln(e){var t=e.f;if(0===(t&S)){ue(e,_);var n=Bt,r=Rt;Bt=e,Rt=!0;try{16777232&t?function(e){for(var t=e.first;null!==t;){var n=t.next;0===(t.f&b)&&Tt(t),t=n}}(e):Et(e),Nt(e);var o=cn(e);e.teardown="function"==typeof o?o:null,e.wv=Zt}finally{Rt=r,Bt=n}}}async function un(){await Promise.resolve(),function(){var e=ke;ke=!0;try{for(;;){if(se(),null===ye)return;ye.flush()}}finally{ke=e}}()}function fn(e){var t=!!(2&e.f);if(null!==Ht&&!Ft&&!(null!==Bt&&0!==(Bt.f&S)||null!==Ut&&r.call(Ut,e))){var n=Ht.deps;if(0!==(Ht.f&C))e.rv<Qt&&(e.rv=Qt,null===Yt&&null!==n&&n[Jt]===e?Jt++:null===Yt?Yt=[e]:Yt.push(e));else{(Ht.deps??=[]).push(e);var o=e.reactions;null===o?e.reactions=[Ht]:r.call(o,Ht)||o.push(Ht)}}if(qt&&Ge.has(e))return Ge.get(e);if(t){var c=e;if(qt){var s=c.v;return(0===(c.f&_)&&null!==c.reactions||hn(c))&&(s=He(c)),Ge.set(c,s),s}var a=0===(c.f&w)&&!Ft&&null!==Ht&&(Rt||0!==(Ht.f&w)),l=0===(c.f&P);rn(c)&&(a&&(c.f|=w),Fe(c)),a&&!l&&(Ve(c),dn(c))}if(me?.has(e))return me.get(e);if(0!==(e.f&I))throw e.v;return e.v}function dn(e){if(e.f|=w,null!==e.deps)for(const t of e.deps)(t.reactions??=[]).push(e),2&t.f&&0===(t.f&w)&&(Ve(t),dn(t))}function hn(e){if(e.v===G)return!0;if(null===e.deps)return!1;for(const t of e.deps){if(Ge.has(t))return!0;if(2&t.f&&hn(t))return!0}return!1}function pn(e){var t=Ft;try{return Ft=!0,e()}finally{Ft=t}}function vn(e){if("object"==typeof e&&e&&!(e instanceof EventTarget))if(D in e)yn(e);else if(!Array.isArray(e))for(let t in e){const n=e[t];"object"==typeof n&&n&&D in n&&yn(n)}}function yn(e,t=new Set){if(!("object"!=typeof e||null===e||e instanceof EventTarget||t.has(e))){t.add(e),e instanceof Date&&e.getTime();for(let n in e)try{yn(e[n],t)}catch(e){}const n=u(e);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const t=a(n);for(let n in t){const r=t[n].get;if(r)try{r.call(e)}catch(e){}}}}}function gn(e){return e.endsWith("capture")&&"gotpointercapture"!==e&&"lostpointercapture"!==e}const mn=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function bn(e){return mn.includes(e)}const kn={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function wn(e){return e=e.toLowerCase(),kn[e]??e}const _n=["touchstart","touchmove"];function xn(e){return _n.includes(e)}const $n=Symbol("events"),Mn=new Set,Sn=new Set;function Pn(e,t,n,r={}){function o(e){if(r.capture||Tn.call(t,e),!e.cancelBubble)return yt(()=>n?.call(this,e))}return e.startsWith("pointer")||e.startsWith("touch")||"wheel"===e?ce(()=>{t.addEventListener(e,o,r)}):t.addEventListener(e,o,r),o}function jn(e,t,n,r,o){var c={capture:r,passive:o},s=Pn(e,t,n,c);(t===document.body||t===window||t===document||t instanceof HTMLMediaElement)&&kt(()=>{t.removeEventListener(e,s,c)})}function An(e,t,n){(t[$n]??={})[e]=n}function Nn(e){for(var t=0;t<e.length;t++)Mn.add(e[t]);for(var n of Sn)n(e)}let En=null;function Tn(e){var t=this,n=t.ownerDocument,r=e.type,o=e.composedPath?.()||[],s=o[0]||e.target;En=e;var a=0,l=En===e&&e[$n];if(l){var i=o.indexOf(l);if(-1!==i&&(t===document||t===window))return void(e[$n]=t);var u=o.indexOf(t);if(-1===u)return;i<=u&&(a=i)}if((s=o[a]||e.target)!==t){c(e,"currentTarget",{configurable:!0,get:()=>s||n});var f=Ht,d=Bt;Vt(null),Gt(null);try{for(var h,p=[];null!==s;){var v=s.assignedSlot||s.parentNode||s.host||null;try{var y=s[$n]?.[r];null==y||s.disabled&&e.target!==s||y.call(s,e)}catch(e){h?p.push(e):h=e}if(e.cancelBubble||v===t||null===v)break;s=v}if(h){for(let e of p)queueMicrotask(()=>{throw e});throw h}}finally{e[$n]=t,delete e.currentTarget,Vt(f),Gt(d)}}}const On=globalThis?.window?.trustedTypes&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:e=>e});function Cn(e){var t=pt("template");return t.innerHTML=function(e){return On?.createHTML(e)??e}(e.replaceAll("<!>","\x3c!----\x3e")),t.content}function In(e,t){var n=Bt;null===n.nodes&&(n.nodes={start:e,end:t,a:null,t:null})}function Dn(e,t){var n,r=!!(2&t),o=!e.startsWith("<!>");return()=>{void 0===n&&(n=it(n=Cn(o?e:"<!>"+e)));var t=r||ct?document.importNode(n,!0):n.cloneNode(!0);return In(t,t),t}}function Ln(){var e=document.createDocumentFragment(),t=document.createComment(""),n=lt();return e.append(t,n),In(t,n),e}function zn(e,t){null!==e&&e.before(t)}function Rn(e,t){var n=null==t?"":"object"==typeof t?`${t}`:t;n!==(e[H]??=e.nodeValue)&&(e[H]=n,e.nodeValue=`${n}`)}const qn=new Map;let Wn=new WeakMap;class Hn{anchor;#U=new Map;#K=new Map;#Y=new Map;#J=new Set;#X=!0;constructor(e,t=!0){this.anchor=e,this.#X=t}#$=e=>{if(this.#U.has(e)){var t=this.#U.get(e),n=this.#K.get(t);if(n)Dt(n),this.#J.delete(t);else{var r=this.#Y.get(t);r&&(this.#K.set(t,r.effect),this.#Y.delete(t),r.fragment.lastChild.remove(),this.anchor.before(r.fragment),n=r.effect)}for(const[t,n]of this.#U){if(this.#U.delete(t),t===e)break;const r=this.#Y.get(n);r&&(Tt(r.effect),this.#Y.delete(n))}for(const[e,r]of this.#K){if(e===t||this.#J.has(e))continue;const o=()=>{if(Array.from(this.#U.values()).includes(e)){var t=document.createDocumentFragment();zt(r,t),t.append(lt()),this.#Y.set(e,{effect:r,fragment:t})}else Tt(r);this.#J.delete(e),this.#K.delete(e)};this.#X||!n?(this.#J.add(e),Ct(r,o,!1)):o()}}};#Z=e=>{this.#U.delete(e);const t=Array.from(this.#U.values());for(const[e,n]of this.#Y)t.includes(e)||(Tt(n.effect),this.#Y.delete(e))};ensure(e,t){var n=ye;!t||this.#K.has(e)||this.#Y.has(e)||this.#K.set(e,At(()=>t(this.anchor)));this.#U.set(n,e),this.#$(n)}}function Fn(e,t,n=!1){var r=new Hn(e);function o(e,t){r.ensure(e,t)}Pt(()=>{var e=!1;t((t,n=0)=>{e=!0,o(n,t)}),e||o(-1,null)},n?A:0)}function Vn(e,t){return t}function Bn(e,t,n=!0){var r;if(e.pending.size>0){r=new Set;for(const t of e.pending.values())for(const n of t)r.add(e.items.get(n).e)}for(var o=0;o<t.length;o++){var c=t[o];if(r?.has(c)){c.f|=T;zt(c,document.createDocumentFragment())}else Tt(t[o],n)}}var Gn;function Un(e,n,r,c,s,a=null){var l=e,i=new Map;!(4&n)||(l=e.appendChild(lt()));var u,f=null,d=We(()=>{var e=r();return t(e)?e:null==e?[]:o(e)}),h=new Map,p=!0;function v(e){0===(g.effect.f&S)&&(g.pending.delete(e),g.fallback=f,function(e,t,n,r,c){var s,a,l,i,u,f=!!(8&r),d=t.length,h=e.items,p=Kn(e.effect.first),v=null,y=[],g=[];if(f)for(u=0;u<d;u+=1)l=c(t[u],u),0===((i=h.get(l).e).f&T)&&(i.nodes?.a?.measure(),(a??=new Set).add(i));for(u=0;u<d;u+=1){if(l=c(t[u],u),i=h.get(l).e,null!==e.outrogroups)for(const t of e.outrogroups)t.pending.delete(i),t.done.delete(i);if(0!==(i.f&M)&&(Dt(i),f&&(i.nodes?.a?.unfix(),(a??=new Set).delete(i))),0!==(i.f&T)){if(i.f^=T,i!==p){var m=v?v.next:p;i===e.effect.last&&(e.effect.last=i.prev),i.prev&&(i.prev.next=i.next),i.next&&(i.next.prev=i.prev),Xn(e,v,i),Xn(e,i,m),Jn(i,m,n),y=[],g=[],p=Kn((v=i).next);continue}Jn(i,null,n)}if(i!==p){if(void 0!==s&&s.has(i)){if(y.length<g.length){var b,k=g[0];v=k.prev;var w=y[0],_=y[y.length-1];for(b=0;b<y.length;b+=1)Jn(y[b],k,n);for(b=0;b<g.length;b+=1)s.delete(g[b]);Xn(e,w.prev,_.next),Xn(e,v,w),Xn(e,_,k),p=k,v=_,u-=1,y=[],g=[]}else s.delete(i),Jn(i,p,n),Xn(e,i.prev,i.next),Xn(e,i,null===v?e.effect.first:v.next),Xn(e,v,i),v=i;continue}for(y=[],g=[];null!==p&&p!==i;)(s??=new Set).add(p),g.push(p),p=Kn(p.next);if(null===p)continue}0===(i.f&T)&&y.push(i),v=i,p=Kn(i.next)}if(null!==e.outrogroups){for(const t of e.outrogroups)0===t.pending.size&&(Bn(e,o(t.done)),e.outrogroups?.delete(t));0===e.outrogroups.size&&(e.outrogroups=null)}if(null!==p||void 0!==s){var x=[];if(void 0!==s)for(i of s)0===(i.f&M)&&x.push(i);for(;null!==p;)0===(p.f&M)&&p!==e.fallback&&x.push(p),p=Kn(p.next);var $=x.length;if($>0){var S=4&r&&0===d?n:null;if(f){for(u=0;u<$;u+=1)x[u].nodes?.a?.measure();for(u=0;u<$;u+=1)x[u].nodes?.a?.fix()}!function(e,t,n){for(var r,c=t.length,s=t.length,a=0;a<c;a++){let n=t[a];Ct(n,()=>{if(r){if(r.pending.delete(n),r.done.add(n),0===r.pending.size){var t=e.outrogroups;Bn(e,o(r.done)),t.delete(r),0===t.size&&(e.outrogroups=null)}}else s-=1},!1)}if(0===s){var l=null!==n;if(l){var i=n,u=i.parentNode;u.textContent="",u.append(i),e.items.clear()}Bn(e,t,!l)}else r={pending:new Set(t),done:new Set},(e.outrogroups??=new Set).add(r)}(e,x,S)}}f&&ce(()=>{if(void 0!==a)for(i of a)i.nodes?.a?.apply()})}(g,u,l,n,c),null!==f&&(0===u.length?0===(f.f&T)?Dt(f):(f.f^=T,Jn(f,null,l)):Ct(f,()=>{f=null})))}var y=Pt(()=>{for(var e=(u=fn(d)).length,t=new Set,o=ye,y=0;y<e;y+=1){var g=u[y],m=c(g,y),b=p?null:i.get(m);b?(b.v&&Ze(b.v,g),b.i&&Ze(b.i,y)):(b=Yn(i,p?l:Gn??=lt(),g,m,y,s,n,r),p||(b.e.f|=T),i.set(m,b)),t.add(m)}0===e&&a&&!f&&(p?f=At(()=>a(l)):(f=At(()=>a(Gn??=lt()))).f|=T),e>t.size&&function(){throw new Error("https://svelte.dev/e/each_key_duplicate")}(),p||(h.set(o,t),v(o)),fn(d)}),g={effect:y,items:i,pending:h,outrogroups:null,fallback:f};p=!1}function Kn(e){for(;null!==e&&0===(e.f&b);)e=e.next;return e}function Yn(e,t,n,r,o,c,s,a){var l=1&s?16&s?Ke(n):Je(n,!1,!1):null,i=2&s?Ke(o):null;return{v:l,i:i,e:At(()=>(c(t,l??n,i??o,a),()=>{e.delete(r)}))}}function Jn(e,t,n){if(e.nodes)for(var r=e.nodes.start,o=e.nodes.end,c=t&&0===(t.f&T)?t.nodes.start:n;null!==r;){var s=ut(r);if(c.before(r),r===o)return;r=s}}function Xn(e,t,n){null===t?e.effect.first=n:t.next=n,null===n?e.effect.last=t:n.prev=t}function Zn(e,t,...n){var r=new Hn(e);Pt(()=>{const e=t()??null;r.ensure(e,e&&(t=>e(t,...n)))},A)}function Qn(e,t){var n,r=void 0;jt(()=>{r!==(r=t())&&(n&&(Tt(n),n=null),r&&(n=At(()=>{xt(()=>r(e))})))})}function er(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(n=er(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function tr(e){return"object"==typeof e?function(){for(var e,t,n=0,r="",o=arguments.length;n<o;n++)(e=arguments[n])&&(t=er(e))&&(r&&(r+=" "),r+=t);return r}(e):e??""}const nr=[..." \t\n\r\f \v\ufeff"];function rr(e,t=!1){var n=t?" !important;":";",r="";for(var o of Object.keys(e)){var c=e[o];null!=c&&""!==c&&(r+=" "+o+": "+c+n)}return r}function or(e){return"-"!==e[0]||"-"!==e[1]?e.toLowerCase():e}function cr(e,t,n,r,o,c){var s=e[q];if(s!==n||void 0===s){var a=function(e,t,n){var r=null==e?"":""+e;if(t&&(r=r?r+" "+t:t),n)for(var o of Object.keys(n))if(n[o])r=r?r+" "+o:o;else if(r.length)for(var c=o.length,s=0;(s=r.indexOf(o,s))>=0;){var a=s+c;0!==s&&!nr.includes(r[s-1])||a!==r.length&&!nr.includes(r[a])?s=a:r=(0===s?"":r.substring(0,s))+r.substring(a+1)}return""===r?null:r}(n,r,c);null==a?e.removeAttribute("class"):t?e.className=a:e.setAttribute("class",a),e[q]=n}else if(c&&o!==c)for(var l in c){var i=!!c[l];null!=o&&i===!!o[l]||e.classList.toggle(l,i)}return c}function sr(e,t={},n,r){for(var o in n){var c=n[o];t[o]!==c&&(null==n[o]?e.style.removeProperty(o):e.style.setProperty(o,c,r))}}function ar(e,t,n,r){if(e[W]!==t){var o=function(e,t){if(t){var n,r,o="";if(Array.isArray(t)?(n=t[0],r=t[1]):n=t,e){e=String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var c=!1,s=0,a=!1,l=[];n&&l.push(...Object.keys(n).map(or)),r&&l.push(...Object.keys(r).map(or));var i=0,u=-1;const t=e.length;for(var f=0;f<t;f++){var d=e[f];if(a?"/"===d&&"*"===e[f-1]&&(a=!1):c?c===d&&(c=!1):"/"===d&&"*"===e[f+1]?a=!0:'"'===d||"'"===d?c=d:"("===d?s++:")"===d&&s--,!a&&!1===c&&0===s)if(":"===d&&-1===u)u=f;else if(";"===d||f===t-1){if(-1!==u){var h=or(e.substring(i,u).trim());l.includes(h)||(";"!==d&&f++,o+=" "+e.substring(i,f).trim()+";")}i=f+1,u=-1}}}return n&&(o+=rr(n)),r&&(o+=rr(r,!0)),""===(o=o.trim())?null:o}return null==e?null:String(e)}(t,r);null==o?e.removeAttribute("style"):e.style.cssText=o,e[W]=t}else r&&(Array.isArray(r)?(sr(e,n?.[0],r[0]),sr(e,n?.[1],r[1],"important")):sr(e,n,r));return r}function lr(e,n,r=!1){if(e.multiple){if(null==n)return;if(!t(n))return void console.warn("https://svelte.dev/e/select_multiple_invalid_value");for(var o of e.options)o.selected=n.includes(ir(o))}else{for(o of e.options){if(rt(ir(o),n))return void(o.selected=!0)}r&&void 0===n||(e.selectedIndex=-1)}}function ir(e){return"__value"in e?e.__value:e.value}const ur=Symbol("class"),fr=Symbol("style"),dr=Symbol("is custom element"),hr=Symbol("is html"),pr=V?"option":"OPTION",vr=V?"select":"SELECT",yr=V?"progress":"PROGRESS";function gr(e,t){t?e.hasAttribute("selected")||e.setAttribute("selected",""):e.removeAttribute("selected")}function mr(e,t,n,r){var o=kr(e);o[t]!==(o[t]=n)&&("loading"===t&&(e[z]=n),null==n?e.removeAttribute(t):"string"!=typeof n&&_r(e).includes(t)?e[t]=n:e.setAttribute(t,n))}function br(e,t,n=[],r=[],o=[],c,s=!1,a=!1){Ie(o,n,r,n=>{var r=void 0,o={},l=e.nodeName===vr,i=!1;if(jt(()=>{var u=t(...n.map(fn)),f=function(e,t,n,r){var o=kr(e),c=o[dr],s=!o[hr],a=t||{},l=e.nodeName===pr;for(var i in t)i in n||(n[i]=null);n.class?n.class=tr(n.class):n[ur]&&(n.class=null),n[fr]&&(n.style??=null);var u=_r(e);for(const y in n){let g=n[y];if(l&&"value"===y&&null==g)e.value=e.__value="",a[y]=g;else if("class"!==y)if("style"!==y){var f=a[y];if(g!==f||void 0===g&&e.hasAttribute(y)){a[y]=g;var d=y[0]+y[1];if("$$"!==d)if("on"===d){const m={},b="$$"+y;let k=y.slice(2);var h=bn(k);if(gn(k)&&(k=k.slice(0,-7),m.capture=!0),!h&&f){if(null!=g)continue;e.removeEventListener(k,a[b],m),a[b]=null}if(h)An(k,e,g),Nn([k]);else if(null!=g){function w(e){a[y].call(this,e)}a[b]=Pn(k,e,w,m)}}else if("style"===y)mr(e,y,g);else if("autofocus"===y)vt(e,Boolean(g));else if(c||"__value"!==y&&("value"!==y||null==g))if("selected"===y&&l)gr(e,g);else{var p=y;s||(p=wn(p));var v="defaultValue"===p||"defaultChecked"===p;if(null!=g||c||v)v||u.includes(p)&&(c||"string"!=typeof g)?(e[p]=g,p in o&&(o[p]=G)):"function"!=typeof g&&mr(e,p,g);else if(o[y]=null,"value"===p||"checked"===p){let _=e;const x=void 0===t;if("value"===p){let $=_.defaultValue;_.removeAttribute(p),_.defaultValue=$,_.value=_.__value=x?$:null}else{let M=_.defaultChecked;_.removeAttribute(p),_.defaultChecked=M,_.checked=!!x&&M}}else e.removeAttribute(y)}else e.value=e.__value=g}}else ar(e,g,t?.[fr],n[fr]),a[y]=g,a[fr]=n[fr];else cr(e,"http://www.w3.org/1999/xhtml"===e.namespaceURI,g,r,t?.[ur],n[ur]),a[y]=g,a[ur]=n[ur]}return a}(e,r,u,c,s,a);i&&l&&"value"in u&&lr(e,u.value);for(let e of Object.getOwnPropertySymbols(o))u[e]||Tt(o[e]);for(let t of Object.getOwnPropertySymbols(u)){var d=u[t];"@attach"!==t.description||r&&d===r[t]||(o[t]&&Tt(o[t]),o[t]=At(()=>Qn(e,()=>d))),f[t]=d}r=f}),l){var u=e;xt(()=>{lr(u,r.value,!0),function(e){var t=new MutationObserver(()=>{lr(e,e.__value)});t.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),kt(()=>{t.disconnect()})}(u)})}i=!0})}function kr(e){return e[R]??={[dr]:e.nodeName.includes("-"),[hr]:e.namespaceURI===U}}var wr=new Map;function _r(e){var t,n=e.getAttribute("is")||e.nodeName,r=wr.get(n);if(r)return r;wr.set(n,r=[]);for(var o=e,c=Element.prototype;c!==o;){for(var s in t=a(o))t[s].set&&"innerHTML"!==s&&"textContent"!==s&&"innerText"!==s&&r.push(s);o=u(o)}return r}function xr(e,t){return e===t||e?.[D]===t}function $r(e={},t,n,r){var o=X.r,c=Bt;return xt(()=>{var r,s;return Mt(()=>{r=s,s=[],pn(()=>{xr(n(...s),e)||(t(e,...s),r&&xr(n(...r),e)&&t(null,...r))})}),()=>{let r=c;for(;r!==o&&null!==r.parent&&r.parent.f&j;)r=r.parent;const a=r.teardown;r.teardown=()=>{s&&xr(n(...s),e)&&t(null,...s),a?.()}}}),e}function Mr(e=!1){const t=X,n=t.l.u;if(!n)return;let r=()=>vn(t.s);if(e){let e=0,n={};const o=ze(()=>{let r=!1;const o=t.s;for(const e in o)o[e]!==n[e]&&(n[e]=o[e],r=!0);return r&&e++,e});r=()=>fn(o)}var o;n.b.length&&(o=()=>{Sr(t,r),v(n.b)},gt(),mt(1048584,o)),wt(()=>{const e=pn(()=>n.m.map(p));return()=>{for(const t of e)"function"==typeof t&&t()}}),n.a.length&&wt(()=>{Sr(t,r),v(n.a)})}function Sr(e,t){if(e.l.s)for(const t of e.l.s)fn(t);t()}const Pr={get(e,t){if(!e.exclude.includes(t))return e.props[t]},set:(e,t)=>!1,getOwnPropertyDescriptor(e,t){if(!e.exclude.includes(t))return t in e.props?{enumerable:!0,configurable:!0,value:e.props[t]}:void 0},has:(e,t)=>!e.exclude.includes(t)&&t in e.props,ownKeys:e=>Reflect.ownKeys(e.props).filter(t=>!e.exclude.includes(t))};function jr(e,t,n){return new Proxy({props:e,exclude:t},Pr)}const Ar={get(e,t){let n=e.props.length;for(;n--;){let r=e.props[n];if(d(r)&&(r=r()),"object"==typeof r&&null!==r&&t in r)return r[t]}},set(e,t,n){let r=e.props.length;for(;r--;){let o=e.props[r];d(o)&&(o=o());const c=s(o,t);if(c&&c.set)return c.set(n),!0}return!1},getOwnPropertyDescriptor(e,t){let n=e.props.length;for(;n--;){let r=e.props[n];if(d(r)&&(r=r()),"object"==typeof r&&null!==r&&t in r){const e=s(r,t);return e&&!e.configurable&&(e.configurable=!0),e}}},has(e,t){if(t===D||t===L)return!1;for(let n of e.props)if(d(n)&&(n=n()),null!=n&&t in n)return!0;return!1},ownKeys(e){const t=[];for(let n of e.props)if(d(n)&&(n=n()),n){for(const e in n)t.includes(e)||t.push(e);for(const e of Object.getOwnPropertySymbols(n))t.includes(e)||t.push(e)}return t}};function Nr(...e){return new Proxy({props:e},Ar)}function Er(e,t,n,r){var o=void 0,c=()=>(o??=ze(r),fn(o));return void 0===e[t]&&void 0!==r&&c(),()=>{var n=e[t];return void 0===n?c():n}}"undefined"!=typeof window&&((window.__svelte??={}).v??=new Set).add("5"),J=!0;const Tr={light:{text:{l:[.1,.26],c:[.004,.03]},background:{l:[.9,.985],c:[.004,.03]},primary:{l:[.34,.7],c:[.06,.25]},secondary:{l:[.36,.8],c:[.025,.19]},accent:{l:[.4,.86],c:[.05,.27]}},dark:{text:{l:[.78,.96],c:[.004,.03]},background:{l:[.055,.22],c:[.004,.035]},primary:{l:[.48,.86],c:[.05,.23]},secondary:{l:[.42,.84],c:[.025,.18]},accent:{l:[.48,.9],c:[.05,.25]}}},Or=["random","monochromatic","analogous","complementary","split-complementary","triadic","compound","double-split-complementary","neutral-complementary","accented-neutral","achromatic","warm","cool","muted","earth","pastel","neon","jewel","brand-status","enterprise","luxury"],Cr=["text","background","primary","secondary","accent"],Ir={default:{primary:.045,secondary:.022,accent:.045},"accented-neutral":{primary:.035,secondary:.01,accent:.045},"neutral-complementary":{primary:.035,secondary:.012,accent:.01},achromatic:{primary:.002,secondary:.002,accent:.002},earth:{primary:.025,secondary:.018,accent:.025},pastel:{primary:.025,secondary:.018,accent:.025},neon:{primary:.045,secondary:.035,accent:.045},jewel:{primary:.04,secondary:.03,accent:.04},muted:{primary:.025,secondary:.012,accent:.025},enterprise:{primary:.03,secondary:.018,accent:.03},luxury:{primary:.035,secondary:.018,accent:.035}},Dr=4.5,Lr=[10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200];function zr(e,t){return e+Math.random()*(t-e)}function Rr(){return zr(0,360)}function qr(){return Math.random()<.5?-1:1}function Wr(e,t,n){return Math.min(n,Math.max(t,e))}function Hr(e,t="palette seed values must be 6-digit hex colors."){if("string"!=typeof e||!/^#?[0-9a-fA-F]{6}$/.test(e))throw new RangeError(t);return`#${(e.startsWith("#")?e.slice(1):e).toLowerCase()}`}function Fr(e){const t=e%360;return t<0?t+360:t}function Vr(e,t){return Fr(e+t)}function Br(e){const[t,n]=e[Math.floor(Math.random()*e.length)];return zr(t,n)}function Gr(){return Br([[0,70],[330,360]])}function Ur(){return Br([[155,285]])}function Kr(){return Br([[25,55],[65,105],[105,145],[330,360]])}function Yr(){return Br([[135,165],[210,250],[275,315],[335,360],[0,12]])}function Jr(){return Br([[32,55],[265,310],[335,360],[0,8]])}function Xr(){return Br([[205,245],[180,215],[250,275]])}function Zr({l:e,c:t,h:n}){const r=n*Math.PI/180;return{l:e,a:t*Math.cos(r),b:t*Math.sin(r)}}function Qr({l:e,a:t,b:n}){const r=e+.3963377774*t+.2158037573*n,o=e-.1055613458*t-.0638541728*n,c=e-.0894841775*t-1.291485548*n,s=r*r*r,a=o*o*o,l=c*c*c;return{r:4.0767416621*s-3.3077115913*a+.2309699292*l,g:-1.2684380046*s+2.6097574011*a-.3413193965*l,b:-.0041960863*s-.7034186147*a+1.707614701*l}}function eo({r:e,g:t,b:n}){return e>=0&&e<=1&&t>=0&&t<=1&&n>=0&&n<=1}function to(e){return e<=.0031308?12.92*e:1.055*Math.pow(e,1/2.4)-.055}function no(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function ro(e){return function({l:e,a:t,b:n}){const r=Math.sqrt(t*t+n*n);return{l:e,c:r,h:r<1e-6?0:Fr(180*Math.atan2(n,t)/Math.PI)}}(function({r:e,g:t,b:n}){const r=Math.cbrt(.4122214708*e+.5363325363*t+.0514459929*n),o=Math.cbrt(.2119034982*e+.6806995451*t+.1073969566*n),c=Math.cbrt(.0883024619*e+.2817188376*t+.6299787005*n);return{l:.2104542553*r+.793617785*o-.0040720468*c,a:1.9779984951*r-2.428592205*o+.4505937099*c,b:.0259040371*r+.7827717662*o-.808675766*c}}(function(e){const t=Hr(e),n=parseInt(t.slice(1,3),16)/255,r=parseInt(t.slice(3,5),16)/255,o=parseInt(t.slice(5,7),16)/255;return{r:no(n),g:no(r),b:no(o)}}(Hr(e))))}function oo(e){const t=Wr(e,0,1);return Math.round(255*t).toString(16).padStart(2,"0")}function co(e){const t=Qr(Zr(e)),n={r:to(t.r),g:to(t.g),b:to(t.b)};return`#${oo(n.r)}${oo(n.g)}${oo(n.b)}`}function so(e){if(eo(Qr(Zr(e))))return{oklch:{...e},hex:co(e)};let t=0,n=e.c,r=0;for(let o=0;o<24;o+=1){const o=(t+n)/2;eo(Qr(Zr({l:e.l,c:o,h:e.h})))?(r=o,t=o):n=o}const o={l:e.l,c:r,h:e.h};return{oklch:o,hex:co(o)}}function ao(e,t){const n=Zr(e),r=Zr(t),o=n.l-r.l,c=n.a-r.a,s=n.b-r.b;return Math.sqrt(o*o+c*c+s*s)}function lo(e){const t=Qr(Zr(e));return.2126*Wr(t.r,0,1)+.7152*Wr(t.g,0,1)+.0722*Wr(t.b,0,1)}function io(e,t){const n=lo(e)+.05,r=lo(t)+.05;return Math.max(n,r)/Math.min(n,r)}function uo(e,t,n){if(!(io(t.oklch,n.oklch)>=Dr))throw new RangeError(`palette ${e} seed ${t.hex} must meet 4.5 contrast against background ${n.hex}.`)}function fo(e,t,n){if(n)for(const n of["text","primary","secondary","accent"])t[n]&&uo(n,e[n],e.background)}function ho(e){if(Array.isArray(e)){if(0===e.length)throw new TypeError("palette.shades colors must be a non-empty array or plain object.");return e.map(e=>({kind:"array",value:{hex:Hr(e,"palette.shades color values must be 6-digit hex colors."),oklch:ro(e)}}))}if(null===(t=e)||"object"!=typeof t||Array.isArray(t)||Object.getPrototypeOf(t)!==Object.prototype&&null!==Object.getPrototypeOf(t))throw new TypeError("palette.shades colors must be a non-empty array or plain object.");var t;const n=Object.entries(e);if(0===n.length)throw new TypeError("palette.shades colors must be a non-empty array or plain object.");return n.map(([e,t])=>({kind:"object",key:e,value:{hex:Hr(t,"palette.shades color values must be 6-digit hex colors."),oklch:ro(t)}}))}function po(e,t,n,r){const[o,c]=r;let s=null,a=Number.POSITIVE_INFINITY,l=Number.POSITIVE_INFINITY,i=Number.POSITIVE_INFINITY,u=o,f=c;const d=r=>{const o=so({l:r,c:e.c,h:e.h}),c=Math.abs(io(o.oklch,t)-n),u=Math.abs(o.oklch.l-e.l),f=Math.abs(o.oklch.c-e.c);return(c<a||c===a&&u<l||c===a&&u===l&&f<i)&&(s=o,a=c,l=u,i=f),io(o.oklch,t)},h=d(o),p=d(c)>=h;for(let e=0;e<24;e+=1){const e=(u+f)/2;d(e)<n?p?u=e:f=e:p?f=e:u=e}return s}function vo(e,t,n){const r=io(e,n),o=po(e,n,1.05,function(e,t){return e.l>=t.l?[t.l,e.l]:[e.l,t.l]}(e,n)),c=po(e,n,function(e){return e+.35*(21-e)}(r),function(e,t){return e.l>=t.l?[e.l,.98]:[.02,e.l]}(e,n)),s={};for(const n of Lr){const r=String(n);if(100===n){s[r]=t;continue}const a=n<100?(n-10)/90:(n-100)/100,l=n<100?go(o.oklch,e,a):go(e,c.oklch,a);s[r]=so(l).hex}return s}function yo(e,t,n){return e+(t-e)*n}function go(e,t,n){return{l:yo(e.l,t.l,n),c:yo(e.c,t.c,n),h:e.h}}function mo(e,t,n){const r="light"===n?.995:.02,o="light"===n?Math.max(.72,e.l-.18):Math.min(.34,e.l+.18),c={};for(const n of Lr){const s=String(n);if(100===n){c[s]=t;continue}const a=n<100?n/100:(n-100)/100,l=so({l:n<100?yo(r,e.l,a):yo(e.l,o,a),c:e.c,h:e.h});c[s]=l.hex}return c}function bo(e,t,n,r,o){return r+(1-wo(e,t,n))*(o-r)}function ko(e,t,n,r,o){return r+wo(e,t,n)*(o-r)}function wo(e,t,n){return Wr((r=e-t,0===(o=n-t)?0:r/o),0,1);var r,o}function _o(e,t,n){const r=Tr[e][t];return{l:zr(r.l[0],r.l[1]),c:zr(r.c[0],r.c[1]),h:n}}function xo(e,t,n,r){const o=Tr[e][t],c=function(e,t,n){const r=Tr[e][t].c;return[Math.max(r[0],n[0]),Math.min(r[1],n[1])]}(e,t,r);return{l:zr(o.l[0],o.l[1]),c:zr(c[0],c[1]),h:n}}function $o(e,t,n){let r="number"==typeof n?n:Rr(),o=Rr(),c=Rr();if("monochromatic"===t)o=r,c=r;else if("analogous"===t){const e=qr();o=Vr(r,e*zr(24,52)),c=Vr(r,e*zr(-52,-24))}else if("complementary"===t){const e=qr();o=Vr(r,180),c=Vr(r,e*zr(24,44))}else if("split-complementary"===t){const e=qr();o=Vr(r,e*zr(145,165)),c=Vr(r,e*zr(195,215))}else if("triadic"===t){const e=qr();o=Vr(r,120*e),c=Vr(r,240*e)}else if("compound"===t){const e=qr();o=Vr(r,e*zr(150,170)),c=Vr(r,e*zr(24,44))}else if("double-split-complementary"===t){const e=qr();o=Vr(r,e*zr(135,155)),c=Vr(r,e*zr(205,225))}else"neutral-complementary"===t?(o=Vr(r,180),c=Vr(r,zr(-16,16))):"accented-neutral"===t?(o=Vr(r,zr(-18,18)),c=Rr()):"achromatic"===t?(o=r,c=r):"warm"===t?("number"!=typeof n&&(r=Gr()),o=Gr(),c=Gr()):"cool"===t?("number"!=typeof n&&(r=Ur()),o=Ur(),c=Ur()):"earth"===t?("number"!=typeof n&&(r=Kr()),o=Kr(),c=Kr()):"pastel"===t||"neon"===t?(o=Rr(),c=Rr()):"jewel"===t?("number"!=typeof n&&(r=Yr()),o=Yr(),c=Yr()):"brand-status"===t?("number"!=typeof n&&(r=Br([[205,275]])),o=Br([[135,165]]),c=Br([[35,75]])):"enterprise"===t?("number"!=typeof n&&(r=Xr()),o=Xr(),c=Xr()):"luxury"===t?("number"!=typeof n&&(r=Jr()),o=Jr(),c=Jr()):"muted"===t&&(o=Rr(),c=Rr());return"accented-neutral"===t?{primary:_o(e,"primary",r),secondary:xo(e,"secondary",o,[.012,.07]),accent:xo(e,"accent",c,[.06,Tr[e].accent.c[1]])}:"achromatic"===t?{primary:xo(e,"primary",r,[.004,.018]),secondary:xo(e,"secondary",o,[.004,.016]),accent:xo(e,"accent",c,[.004,.02])}:"neutral-complementary"===t?{primary:_o(e,"primary",r),secondary:xo(e,"secondary",o,[.018,.095]),accent:xo(e,"accent",c,[.012,.07])}:"earth"===t?{primary:xo(e,"primary",r,[.035,.13]),secondary:xo(e,"secondary",o,[.025,.105]),accent:xo(e,"accent",c,[.04,.15])}:"pastel"===t?{primary:xo(e,"primary",r,[.035,.12]),secondary:xo(e,"secondary",o,[.025,.095]),accent:xo(e,"accent",c,[.04,.13])}:"neon"===t?{primary:xo(e,"primary",r,[.16,.3]),secondary:xo(e,"secondary",o,[.12,.26]),accent:xo(e,"accent",c,[.18,.32])}:"jewel"===t?{primary:xo(e,"primary",r,[.09,.22]),secondary:xo(e,"secondary",o,[.075,.19]),accent:xo(e,"accent",c,[.1,.24])}:"brand-status"===t?{primary:_o(e,"primary",r),secondary:_o(e,"secondary",o),accent:_o(e,"accent",c)}:"enterprise"===t?{primary:xo(e,"primary",r,[.045,.14]),secondary:xo(e,"secondary",o,[.025,.095]),accent:xo(e,"accent",c,[.04,.13])}:"luxury"===t?{primary:xo(e,"primary",r,[.055,.17]),secondary:xo(e,"secondary",o,[.025,.105]),accent:xo(e,"accent",c,[.065,.19])}:"muted"===t?{primary:xo(e,"primary",r,[.035,.12]),secondary:xo(e,"secondary",o,[.018,.09]),accent:xo(e,"accent",c,[.035,.13])}:{primary:_o(e,"primary",r),secondary:_o(e,"secondary",o),accent:_o(e,"accent",c)}}function Mo(e){const t=so(e);return{oklch:t.oklch,hex:t.hex}}function So(e){return{hex:e.hex,oklch:e.oklch}}function Po(e,t,n){const r=Tr[t][e],o=[...r.l];return"light"===t?o[1]=Math.min(r.l[1],n.l-.08):o[0]=Math.max(r.l[0],n.l+.08),o[0]>=o[1]?[...r.l]:o}function jo(e,t,n,r){if("light"===r)return e;let o=e;!function(e){const t=Fr(e);return t>=45&&t<=115}(t)?function(e){const t=Fr(e);return t>=235&&t<=305}(t)&&(o*=1.04):o*=.86,"accent"===n&&(o*=1.03);const c=Tr[r][n].c;return Wr(o,c[0],c[1])}function Ao(e,t,n,r){const o=so({l:n,c:e.oklch.c*r,h:e.oklch.h});return{candidate:o,contrast:io(o.oklch,t),score:1*ao(o.oklch,e.oklch)+.35*Math.max(0,e.oklch.c-o.oklch.c)+.25*Math.abs(o.oklch.l-e.oklch.l)}}function No(e,t,n,r,o){const c="light"===o?r[0]:e.oklch.l,s="light"===o?e.oklch.l:r[1];let a=null,l=null;const i=e=>{e.contrast>=n?function(e,t){return null===t||e.score<t.score}(e,a)&&(a=e):(null===l||e.contrast>l.contrast||e.contrast===l.contrast&&e.score<l.score)&&(l=e)};for(const r of[1,.96,.92,.88,.84,.78,.72,.66]){i(Ao(e,t,c,r)),i(Ao(e,t,s,r));let a=c,l=s;for(let c=0;c<24;c+=1){const c=(a+l)/2,s=Ao(e,t,c,r);i(s),"light"===o?s.contrast>=n?l=c:a=c:s.contrast<n?l=c:a=c}}return null!==a?a.candidate:null===l?e:l.candidate}function Eo(e,t,n,r,o,c){const s=function(e,t,n,r){const o=Tr[n][t],c=Tr[r][t];return bo(e.l,o.l[0],o.l[1],c.l[0],c.l[1])}(e,r,o,c),a=jo(function(e,t,n,r){const o=Tr[n][t],c=Tr[r][t];return ko(e.c,o.c[0],o.c[1],c.c[0],c.c[1])}(e,r,o,c),e.h,r,c),l=Po(r,c,t),i=so({l:Wr(s,l[0],l[1]),c:a,h:e.h}),u=n?Dr:3;return io(i.oklch,t)>=u?i:No(i,t,u,l,c)}function To(e,t,n,r){if(io(e.oklch,t)>=Dr)return e;const o=Po(n,r,t);return No(e,t,Dr,o,r)}function Oo(e,t,n,r,o,c){if(function(e){return"primary"===e||"secondary"===e||"accent"===e}(t))return Eo(e,o,c,t,n,r);const s=Tr[n][t],a=Tr[r][t],l=so({l:bo(e.l,s.l[0],s.l[1],a.l[0],a.l[1]),c:ko(e.c,s.c[0],s.c[1],a.c[0],a.c[1]),h:e.h});return{oklch:l.oklch,hex:l.hex}}function Co(e,t,n,r){const o=Ir[n]??Ir.default;return"light"===e&&t.text.oklch.l>=t.background.oklch.l||("dark"===e&&t.text.oklch.l<=t.background.oklch.l||(!r.primary&&t.primary.oklch.c<o.primary||(!r.secondary&&t.secondary.oklch.c<o.secondary||(!r.accent&&t.accent.oklch.c<o.accent||(!r.primary&&!r.secondary&&ao(t.primary.oklch,t.secondary.oklch)<.075||(!r.primary&&!r.accent&&ao(t.primary.oklch,t.accent.oklch)<.075||!r.secondary&&!r.accent&&ao(t.secondary.oklch,t.accent.oklch)<.075))))))}function Io(e){return io(e.text.oklch,e.background.oklch)>=Dr&&io(e.primary.oklch,e.background.oklch)>=Dr&&io(e.secondary.oklch,e.background.oklch)>=Dr&&io(e.accent.oklch,e.background.oklch)>=Dr}function Do(e,t){return{text:e.text.hex,background:e.background.hex,primary:e.primary.hex,secondary:e.secondary.hex,accent:e.accent.hex,shades:{text:vo(e.text.oklch,e.text.hex,e.background.oklch),background:mo(e.background.oklch,e.background.hex,t),primary:vo(e.primary.oklch,e.primary.hex,e.background.oklch),secondary:vo(e.secondary.oklch,e.secondary.hex,e.background.oklch),accent:vo(e.accent.oklch,e.accent.hex,e.background.oklch)}}}function Lo(e={}){const{text:t,background:n,primary:r,secondary:o,accent:c,scheme:s,wcag:a}=e,l=function(e){if(null==e)return{};if("object"!=typeof e||Array.isArray(e))throw new TypeError("palette seeds must be an object.");const t={};for(const n of Cr){if(void 0===e[n])continue;const r=Hr(e[n]);t[n]={hex:r,oklch:ro(r)}}return t}({text:t,background:n,primary:r,secondary:o,accent:c});var i;const u=(i=l,Cr.some(e=>void 0!==i[e]))?function(e){const t=e.text,n=e.background;if(t&&n){if(t.hex===n.hex)throw new RangeError("palette text and background cannot be the same color.");return t.oklch.l<n.oklch.l?"light":"dark"}return n?n.oklch.l>=.5?"light":"dark":t&&t.oklch.l<.5?"light":"dark"}(l):"dark",f=function(e){if(void 0===e)return"random";if(Or.includes(e))return e;throw new RangeError("palette scheme must be a supported scheme.")}(s),d=function(e){return Object.fromEntries(Cr.map(t=>[t,void 0!==e[t]]))}(l),h=Boolean(a),p="light"===u?"dark":"light";for(let e=0;e<2e3;e+=1){const e=$o(u,f,l.primary?.oklch.h),t=l.primary?So(l.primary):Mo(e.primary),n={primary:t,text:l.text?So(l.text):Mo(_o(u,"text",t.oklch.h)),background:l.background?So(l.background):Mo(_o(u,"background",t.oklch.h)),secondary:l.secondary?So(l.secondary):Mo(e.secondary),accent:l.accent?So(l.accent):Mo(e.accent)};h&&(d.primary||(n.primary=To(n.primary,n.background.oklch,"primary",u)),d.secondary||(n.secondary=To(n.secondary,n.background.oklch,"secondary",u)),d.accent||(n.accent=To(n.accent,n.background.oklch,"accent",u))),fo(n,d,h);const r={text:Oo(n.text.oklch,"text",u,p,null,h),background:Oo(n.background.oklch,"background",u,p,null,h)};r.primary=Oo(n.primary.oklch,"primary",u,p,r.background.oklch,h),r.secondary=Oo(n.secondary.oklch,"secondary",u,p,r.background.oklch,h),r.accent=Oo(n.accent.oklch,"accent",u,p,r.background.oklch,h);const o="light"===u?{light:n,dark:r}:{light:r,dark:n};if(!Co("light",o.light,f,d)&&!Co("dark",o.dark,f,d)&&(!h||Io(o.light)&&Io(o.dark)))return{light:Do(o.light,"light"),dark:Do(o.dark,"dark")}}throw new Error("Unable to generate a semantic palette candidate.")}Lo.shades=function(e={}){const{background:t,colors:n,wcag:r}=e,o=Hr(t,"palette.shades background must be a 6-digit hex color."),c={hex:o,oklch:ro(o)},s=ho(n),a=Boolean(r),l=e=>{if(a&&io(e.oklch,c.oklch)<Dr)throw new RangeError(`palette.shades color ${e.hex} must meet 4.5 contrast against background ${c.hex}.`);return vo(e.oklch,e.hex,c.oklch)};return Array.isArray(n)?s.map(({value:e})=>l(e)):Object.fromEntries(s.map(({key:e,value:t})=>[e,l(t)]))};
/**
	 * @license @lucide/svelte v1.3.0 - ISC
	 *
	 * ISC License
	 * 
	 * Copyright (c) 2026 Lucide Icons and Contributors
	 * 
	 * Permission to use, copy, modify, and/or distribute this software for any
	 * purpose with or without fee is hereby granted, provided that the above
	 * copyright notice and this permission notice appear in all copies.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
	 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
	 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
	 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
	 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
	 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
	 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	 * 
	 * ---
	 * 
	 * The following Lucide icons are derived from the Feather project:
	 * 
	 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
	 * 
	 * The MIT License (MIT) (for the icons listed above)
	 * 
	 * Copyright (c) 2013-present Cole Bemis
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 * 
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 * 
	 */
const zo={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},Ro=Symbol("lucide-context");
/**
	 * @license @lucide/svelte v1.3.0 - ISC
	 *
	 * ISC License
	 * 
	 * Copyright (c) 2026 Lucide Icons and Contributors
	 * 
	 * Permission to use, copy, modify, and/or distribute this software for any
	 * purpose with or without fee is hereby granted, provided that the above
	 * copyright notice and this permission notice appear in all copies.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
	 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
	 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
	 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
	 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
	 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
	 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	 * 
	 * ---
	 * 
	 * The following Lucide icons are derived from the Feather project:
	 * 
	 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
	 * 
	 * The MIT License (MIT) (for the icons listed above)
	 * 
	 * Copyright (c) 2013-present Cole Bemis
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 * 
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 * 
	 */var qo=function(e,t,n="svg"){var r,o=`<${n}>${e.startsWith("<!>")?"<!>"+e:e}</${n}>`;return()=>{if(!r){var e=it(Cn(o));r=it(e)}var t=r.cloneNode(!0);return In(t,t),t}}("<svg><!><!></svg>",0,"svg");function Wo(e,t){ee(t,!0);const n=Q(Ro)??{},r=Er(t,"color",0,()=>n.color??"currentColor"),o=Er(t,"size",0,()=>n.size??24),c=Er(t,"strokeWidth",0,()=>n.strokeWidth??2),s=Er(t,"absoluteStrokeWidth",0,()=>n.absoluteStrokeWidth??!1),a=Er(t,"iconNode",0,()=>[]),l=jr(t,["$$slots","$$events","$$legacy","name","color","size","strokeWidth","absoluteStrokeWidth","iconNode","children"]),i=qe(()=>s()?24*Number(c())/Number(o()):c());var u=qo();br(u,e=>({...zo,...e,...l,width:o(),height:o(),stroke:r(),"stroke-width":fn(i),class:["lucide-icon lucide",n.class,t.name&&`lucide-${t.name}`,t.class]}),[()=>!t.children&&!(e=>{for(const t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(l)&&{"aria-hidden":"true"}]);var f=ft(u);Un(f,17,a,Vn,(e,t)=>{var n=qe(()=>function(e,t){if(Array.isArray(e))return e;if(!(Symbol.iterator in e))return Array.from(e);const n=[];for(const r of e)if(n.push(r),n.length===t)break;return n}(fn(t),2));var r=Ln();!function(e,t,n,r){var o=null,c=new Hn(e,!1);Pt(()=>{const e=t()||null;if(null!==e)return c.ensure(e,t=>{if(e){if(In(o=pt(e,"http://www.w3.org/2000/svg"),o),r){var n=o.appendChild(lt());r(o,n)}Bt.nodes.end=o,t.before(o)}}),()=>{};c.ensure(null,null)},A),kt(()=>{})}(dt(r),()=>fn(n)[0],0,(e,t)=>{br(e,()=>({...fn(n)[1]}))}),zn(e,r)}),Zn(ht(f),()=>t.children??h),zn(e,u),te()}function Ho(e,t){ee(t,!0);
/**
		 * @license @lucide/svelte v1.3.0 - ISC
		 *
		 * ISC License
		 *
		 * Copyright (c) 2026 Lucide Icons and Contributors
		 *
		 * Permission to use, copy, modify, and/or distribute this software for any
		 * purpose with or without fee is hereby granted, provided that the above
		 * copyright notice and this permission notice appear in all copies.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		 *
		 * ---
		 *
		 * The following Lucide icons are derived from the Feather project:
		 *
		 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
		 *
		 * The MIT License (MIT) (for the icons listed above)
		 *
		 * Copyright (c) 2013-present Cole Bemis
		 *
		 * Permission is hereby granted, free of charge, to any person obtaining a copy
		 * of this software and associated documentation files (the "Software"), to deal
		 * in the Software without restriction, including without limitation the rights
		 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		 * copies of the Software, and to permit persons to whom the Software is
		 * furnished to do so, subject to the following conditions:
		 *
		 * The above copyright notice and this permission notice shall be included in all
		 * copies or substantial portions of the Software.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		 * SOFTWARE.
		 *
		 */
let n=jr(t,["$$slots","$$events","$$legacy"]);const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];Wo(e,Nr({name:"circle-check"},()=>n,{get iconNode(){return r},children:(e,n)=>{var r=Ln();Zn(dt(r),()=>t.children??h),zn(e,r)},$$slots:{default:!0}})),te()}function Fo(e,t){ee(t,!0);
/**
		 * @license @lucide/svelte v1.3.0 - ISC
		 *
		 * ISC License
		 *
		 * Copyright (c) 2026 Lucide Icons and Contributors
		 *
		 * Permission to use, copy, modify, and/or distribute this software for any
		 * purpose with or without fee is hereby granted, provided that the above
		 * copyright notice and this permission notice appear in all copies.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		 *
		 * ---
		 *
		 * The following Lucide icons are derived from the Feather project:
		 *
		 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
		 *
		 * The MIT License (MIT) (for the icons listed above)
		 *
		 * Copyright (c) 2013-present Cole Bemis
		 *
		 * Permission is hereby granted, free of charge, to any person obtaining a copy
		 * of this software and associated documentation files (the "Software"), to deal
		 * in the Software without restriction, including without limitation the rights
		 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		 * copies of the Software, and to permit persons to whom the Software is
		 * furnished to do so, subject to the following conditions:
		 *
		 * The above copyright notice and this permission notice shall be included in all
		 * copies or substantial portions of the Software.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		 * SOFTWARE.
		 *
		 */
let n=jr(t,["$$slots","$$events","$$legacy"]);const r=[["path",{d:"m16 18 6-6-6-6"}],["path",{d:"m8 6-6 6 6 6"}]];Wo(e,Nr({name:"code"},()=>n,{get iconNode(){return r},children:(e,n)=>{var r=Ln();Zn(dt(r),()=>t.children??h),zn(e,r)},$$slots:{default:!0}})),te()}function Vo(e,t){ee(t,!0);
/**
		 * @license @lucide/svelte v1.3.0 - ISC
		 *
		 * ISC License
		 *
		 * Copyright (c) 2026 Lucide Icons and Contributors
		 *
		 * Permission to use, copy, modify, and/or distribute this software for any
		 * purpose with or without fee is hereby granted, provided that the above
		 * copyright notice and this permission notice appear in all copies.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		 *
		 * ---
		 *
		 * The following Lucide icons are derived from the Feather project:
		 *
		 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
		 *
		 * The MIT License (MIT) (for the icons listed above)
		 *
		 * Copyright (c) 2013-present Cole Bemis
		 *
		 * Permission is hereby granted, free of charge, to any person obtaining a copy
		 * of this software and associated documentation files (the "Software"), to deal
		 * in the Software without restriction, including without limitation the rights
		 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		 * copies of the Software, and to permit persons to whom the Software is
		 * furnished to do so, subject to the following conditions:
		 *
		 * The above copyright notice and this permission notice shall be included in all
		 * copies or substantial portions of the Software.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		 * SOFTWARE.
		 *
		 */
let n=jr(t,["$$slots","$$events","$$legacy"]);const r=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];Wo(e,Nr({name:"copy"},()=>n,{get iconNode(){return r},children:(e,n)=>{var r=Ln();Zn(dt(r),()=>t.children??h),zn(e,r)},$$slots:{default:!0}})),te()}function Bo(e,t){ee(t,!0);
/**
		 * @license @lucide/svelte v1.3.0 - ISC
		 *
		 * ISC License
		 *
		 * Copyright (c) 2026 Lucide Icons and Contributors
		 *
		 * Permission to use, copy, modify, and/or distribute this software for any
		 * purpose with or without fee is hereby granted, provided that the above
		 * copyright notice and this permission notice appear in all copies.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		 *
		 * ---
		 *
		 * The following Lucide icons are derived from the Feather project:
		 *
		 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
		 *
		 * The MIT License (MIT) (for the icons listed above)
		 *
		 * Copyright (c) 2013-present Cole Bemis
		 *
		 * Permission is hereby granted, free of charge, to any person obtaining a copy
		 * of this software and associated documentation files (the "Software"), to deal
		 * in the Software without restriction, including without limitation the rights
		 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		 * copies of the Software, and to permit persons to whom the Software is
		 * furnished to do so, subject to the following conditions:
		 *
		 * The above copyright notice and this permission notice shall be included in all
		 * copies or substantial portions of the Software.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		 * SOFTWARE.
		 *
		 */
let n=jr(t,["$$slots","$$events","$$legacy"]);const r=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];Wo(e,Nr({name:"layers"},()=>n,{get iconNode(){return r},children:(e,n)=>{var r=Ln();Zn(dt(r),()=>t.children??h),zn(e,r)},$$slots:{default:!0}})),te()}function Go(e,t){ee(t,!0);
/**
		 * @license @lucide/svelte v1.3.0 - ISC
		 *
		 * ISC License
		 *
		 * Copyright (c) 2026 Lucide Icons and Contributors
		 *
		 * Permission to use, copy, modify, and/or distribute this software for any
		 * purpose with or without fee is hereby granted, provided that the above
		 * copyright notice and this permission notice appear in all copies.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		 *
		 * ---
		 *
		 * The following Lucide icons are derived from the Feather project:
		 *
		 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
		 *
		 * The MIT License (MIT) (for the icons listed above)
		 *
		 * Copyright (c) 2013-present Cole Bemis
		 *
		 * Permission is hereby granted, free of charge, to any person obtaining a copy
		 * of this software and associated documentation files (the "Software"), to deal
		 * in the Software without restriction, including without limitation the rights
		 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		 * copies of the Software, and to permit persons to whom the Software is
		 * furnished to do so, subject to the following conditions:
		 *
		 * The above copyright notice and this permission notice shall be included in all
		 * copies or substantial portions of the Software.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		 * SOFTWARE.
		 *
		 */
let n=jr(t,["$$slots","$$events","$$legacy"]);const r=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]];Wo(e,Nr({name:"moon"},()=>n,{get iconNode(){return r},children:(e,n)=>{var r=Ln();Zn(dt(r),()=>t.children??h),zn(e,r)},$$slots:{default:!0}})),te()}function Uo(e,t){ee(t,!0);
/**
		 * @license @lucide/svelte v1.3.0 - ISC
		 *
		 * ISC License
		 *
		 * Copyright (c) 2026 Lucide Icons and Contributors
		 *
		 * Permission to use, copy, modify, and/or distribute this software for any
		 * purpose with or without fee is hereby granted, provided that the above
		 * copyright notice and this permission notice appear in all copies.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		 *
		 * ---
		 *
		 * The following Lucide icons are derived from the Feather project:
		 *
		 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
		 *
		 * The MIT License (MIT) (for the icons listed above)
		 *
		 * Copyright (c) 2013-present Cole Bemis
		 *
		 * Permission is hereby granted, free of charge, to any person obtaining a copy
		 * of this software and associated documentation files (the "Software"), to deal
		 * in the Software without restriction, including without limitation the rights
		 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		 * copies of the Software, and to permit persons to whom the Software is
		 * furnished to do so, subject to the following conditions:
		 *
		 * The above copyright notice and this permission notice shall be included in all
		 * copies or substantial portions of the Software.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		 * SOFTWARE.
		 *
		 */
let n=jr(t,["$$slots","$$events","$$legacy"]);const r=[["path",{d:"M12 19h8"}],["path",{d:"m4 17 6-6-6-6"}]];Wo(e,Nr({name:"terminal"},()=>n,{get iconNode(){return r},children:(e,n)=>{var r=Ln();Zn(dt(r),()=>t.children??h),zn(e,r)},$$slots:{default:!0}})),te()}function Ko(e,t){ee(t,!0);
/**
		 * @license @lucide/svelte v1.3.0 - ISC
		 *
		 * ISC License
		 *
		 * Copyright (c) 2026 Lucide Icons and Contributors
		 *
		 * Permission to use, copy, modify, and/or distribute this software for any
		 * purpose with or without fee is hereby granted, provided that the above
		 * copyright notice and this permission notice appear in all copies.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		 *
		 * ---
		 *
		 * The following Lucide icons are derived from the Feather project:
		 *
		 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
		 *
		 * The MIT License (MIT) (for the icons listed above)
		 *
		 * Copyright (c) 2013-present Cole Bemis
		 *
		 * Permission is hereby granted, free of charge, to any person obtaining a copy
		 * of this software and associated documentation files (the "Software"), to deal
		 * in the Software without restriction, including without limitation the rights
		 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		 * copies of the Software, and to permit persons to whom the Software is
		 * furnished to do so, subject to the following conditions:
		 *
		 * The above copyright notice and this permission notice shall be included in all
		 * copies or substantial portions of the Software.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		 * SOFTWARE.
		 *
		 */
let n=jr(t,["$$slots","$$events","$$legacy"]);const r=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]];Wo(e,Nr({name:"zap"},()=>n,{get iconNode(){return r},children:(e,n)=>{var r=Ln();Zn(dt(r),()=>t.children??h),zn(e,r)},$$slots:{default:!0}})),te()}const Yo={title:"GitHub",slug:"github",get svg(){return'<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="'+this.path+'"/></svg>'},path:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",source:"https://github.com/logos",hex:"181717",guidelines:"https://github.com/logos"};var Jo=Dn('<div><div class="color-picker svelte-1cfu4yu"><div class="color-picker-surface svelte-1cfu4yu"><div class="color-picker-canvas svelte-1cfu4yu"><div class="color-picker-canvas-fill svelte-1cfu4yu"></div> <div class="color-picker-thumb svelte-1cfu4yu"></div></div> <div class="color-picker-group svelte-1cfu4yu"><div class="color-picker-label svelte-1cfu4yu">Hue</div> <div class="color-picker-hue svelte-1cfu4yu"><div class="color-picker-hue-track svelte-1cfu4yu"><div class="color-picker-hue-fill svelte-1cfu4yu"></div></div> <div class="color-picker-hue-thumb svelte-1cfu4yu"></div></div></div></div></div></div>'),Xo=Dn('<div class="seed-field svelte-1cfu4yu"><label class="seed-label svelte-1cfu4yu"> </label> <div class="seed-input-wrap svelte-1cfu4yu"><input type="text"/> <div class="seed-action-row svelte-1cfu4yu"><button type="button"><!></button> <button type="button" class="seed-action-button copy-button svelte-1cfu4yu"><!></button></div></div> <!></div>'),Zo=Dn('<div class="palette-error svelte-1cfu4yu" style="color: var(--theme-accent); border-color: var(--theme-accent); background-color: var(--theme-accent-20);"> </div>'),Qo=Dn('<button type="button"> </button>'),ec=Dn('<div><div class="scheme-menu scheme-menu-scrollbar svelte-1cfu4yu"></div></div>'),tc=Dn("<span> </span>"),nc=Dn('<div class="code-preview-line svelte-1cfu4yu"><div class="code-preview-line-number svelte-1cfu4yu"></div> <div class="code-preview-line-content svelte-1cfu4yu"><!></div></div>'),rc=Dn('<div class="feature-card svelte-1cfu4yu"><div><!></div> <h3 class="feature-card-title svelte-1cfu4yu"> </h3> <p class="feature-card-copy svelte-1cfu4yu"> </p></div>'),oc=Dn('<div class="testimonial-card svelte-1cfu4yu"><p class="testimonial-quote svelte-1cfu4yu"> </p> <div class="testimonial-person svelte-1cfu4yu"><div class="testimonial-name svelte-1cfu4yu"> </div> <div class="testimonial-role svelte-1cfu4yu"> </div></div></div>'),cc=Dn('<li class="pricing-feature svelte-1cfu4yu"><!> </li>'),sc=Dn('<li class="pricing-feature svelte-1cfu4yu"><!> </li>'),ac=Dn('<div class="app-shell svelte-1cfu4yu"><nav class="app-nav svelte-1cfu4yu"><div class="page-shell nav-inner svelte-1cfu4yu"><div class="nav-brand-row svelte-1cfu4yu"><div class="nav-brand svelte-1cfu4yu"><div class="brand-mark svelte-1cfu4yu" aria-hidden="true"><span class="brand-swatch brand-swatch-text svelte-1cfu4yu"></span> <span class="brand-swatch brand-swatch-background svelte-1cfu4yu"></span> <span class="brand-swatch brand-swatch-primary svelte-1cfu4yu"></span> <span class="brand-swatch brand-swatch-secondary svelte-1cfu4yu"></span> <span class="brand-swatch brand-swatch-accent svelte-1cfu4yu"></span></div> <span class="nav-brand-text svelte-1cfu4yu">Palette</span></div> <div class="nav-link-list svelte-1cfu4yu"><a href="#playground" class="nav-link svelte-1cfu4yu">Playground</a> <a href="#features" class="nav-link svelte-1cfu4yu">Features</a> <a href="#testimonials" class="nav-link svelte-1cfu4yu">Testimonials</a> <a href="#pricing" class="nav-link svelte-1cfu4yu">Pricing</a></div></div> <div class="nav-actions svelte-1cfu4yu"><button class="icon-button nav-action-button svelte-1cfu4yu"><!></button> <a href="https://github.com/jacoblockett/palette" target="_blank" rel="noreferrer" class="icon-button nav-action-button svelte-1cfu4yu"><svg viewBox="0 0 24 24" aria-hidden="true" class="github-icon svelte-1cfu4yu" role="img"><path class="svelte-1cfu4yu"></path></svg></a> <button type="button" aria-label="Copy install command" class="install-pill nav-install-pill svelte-1cfu4yu"><span>Copied!</span> <span class="install-pill-content svelte-1cfu4yu"><!> </span></button></div></div></nav> <section class="hero page-shell svelte-1cfu4yu"><h1 class="hero-title svelte-1cfu4yu">Enterprise-grade colors. <br class="hero-break svelte-1cfu4yu"/> Zero cost.</h1> <p class="hero-copy svelte-1cfu4yu">Why pick light and dark mode colors manually when you can install a dependency that mathematically generates all 5\n\t\t\troles and 20 shades automatically? Welcome to the future.</p> <div class="hero-actions svelte-1cfu4yu"><button class="primary-cta svelte-1cfu4yu">Read the docs <!></button> <button type="button" class="secondary-cta svelte-1cfu4yu"><span>Copied!</span> <!> </button></div></section> <section id="playground" class="playground svelte-1cfu4yu"><div class="page-shell svelte-1cfu4yu"><div class="section-intro svelte-1cfu4yu"><h2 class="section-title svelte-1cfu4yu">Playground</h2> <p class="section-copy svelte-1cfu4yu">Go ahead. Change the colors. I dare you.</p></div> <div class="playground-grid svelte-1cfu4yu"><div class="playground-panel svelte-1cfu4yu"><div class="toolbar svelte-1cfu4yu"><div class="toolbar-group svelte-1cfu4yu"><button type="button" aria-label="Randomize colors" class="toolbar-button svelte-1cfu4yu"><!></button> <button type="button" aria-label="Undo color change" class="toolbar-button svelte-1cfu4yu"><!></button> <button type="button" aria-label="Redo color change" class="toolbar-button svelte-1cfu4yu"><!></button> <button type="button" class="toolbar-button svelte-1cfu4yu"><!></button></div></div> <div class="seed-grid svelte-1cfu4yu"></div> <!> <div class="scheme-field svelte-1cfu4yu" tabindex="-1"><label class="scheme-label svelte-1cfu4yu">Scheme</label> <div><button type="button"><span class="svelte-1cfu4yu"> </span> <!></button> <!></div></div> <div class="wcag-row svelte-1cfu4yu"><button type="button"><div></div></button> <label class="wcag-label svelte-1cfu4yu">Strict WCAG Checks</label></div></div> <div class="code-preview-wrap svelte-1cfu4yu"><div class="code-preview-glow svelte-1cfu4yu"></div> <div class="code-preview svelte-1cfu4yu"><div class="code-preview-header svelte-1cfu4yu"><div class="code-preview-dots svelte-1cfu4yu"><div class="code-preview-dot svelte-1cfu4yu" style="background-color: #ff5f57;"></div> <div class="code-preview-dot svelte-1cfu4yu" style="background-color: #febc2e;"></div> <div class="code-preview-dot svelte-1cfu4yu" style="background-color: #28c840;"></div></div> <div class="code-preview-title svelte-1cfu4yu">Don\'t worry, I don\'t actually use Unix</div> <button class="code-preview-copy svelte-1cfu4yu"><!> </button></div> <div class="code-preview-body svelte-1cfu4yu"><div class="code-preview-lines svelte-1cfu4yu"></div></div></div></div></div></div></section> <section id="features" class="feature-section page-shell svelte-1cfu4yu"><div class="section-intro section-intro-centered svelte-1cfu4yu"><h2 class="section-title svelte-1cfu4yu">Features that sound cool.</h2> <p class="section-copy svelte-1cfu4yu">This section has never been useful... like, ever.</p></div> <div class="feature-grid svelte-1cfu4yu"></div></section> <section id="testimonials" class="testimonial-section svelte-1cfu4yu"><div class="page-shell svelte-1cfu4yu"><div class="section-intro section-intro-centered svelte-1cfu4yu"><h2 class="section-title svelte-1cfu4yu">Testimonials from real-ish people.</h2> <p class="section-copy svelte-1cfu4yu">Social proof, because apparently software needs witnesses now.</p></div> <div class="testimonials-carousel svelte-1cfu4yu"><div class="testimonial-fade testimonial-fade-left svelte-1cfu4yu"></div> <div class="testimonial-fade testimonial-fade-right svelte-1cfu4yu"></div> <div class="testimonials-track svelte-1cfu4yu"></div></div></div></section> <section id="pricing" class="pricing-section svelte-1cfu4yu"><div class="page-shell svelte-1cfu4yu"><div class="section-intro section-intro-centered svelte-1cfu4yu"><h2 class="section-title svelte-1cfu4yu">Pricing that scales with you.</h2> <p class="section-copy svelte-1cfu4yu">By which we mean it\'s literally just open source.</p></div> <div class="pricing-grid svelte-1cfu4yu"><div class="pricing-card svelte-1cfu4yu"><h3 class="pricing-card-title svelte-1cfu4yu">Open Source</h3> <div class="pricing-price-row svelte-1cfu4yu"><span class="pricing-price svelte-1cfu4yu">$0</span> <span class="pricing-period svelte-1cfu4yu">/forever</span></div> <p class="pricing-copy svelte-1cfu4yu">Perfect for developers who know how to use a package manager.</p> <ul class="pricing-feature-list svelte-1cfu4yu"></ul> <div class="pricing-card-footer svelte-1cfu4yu"><a href="https://github.com/jacoblockett/palette" class="pricing-cta svelte-1cfu4yu">View on GitHub</a> <p class="pricing-note svelte-1cfu4yu">* If you consider a lone dev a community</p></div></div> <div class="pricing-card pricing-card-featured svelte-1cfu4yu"><div class="pricing-badge svelte-1cfu4yu">Enterprise</div> <h3 class="pricing-card-title svelte-1cfu4yu">Enterprise</h3> <div class="pricing-price-row svelte-1cfu4yu"><span class="pricing-price svelte-1cfu4yu">$0</span> <span class="pricing-period svelte-1cfu4yu">/forever</span></div> <p class="pricing-copy svelte-1cfu4yu">The exact same code, but you wear a suit while running it. Or maybe not. Idk what your dress code looks\n\t\t\t\t\t\tlike.</p> <ul class="pricing-feature-list svelte-1cfu4yu"></ul> <div class="pricing-card-footer svelte-1cfu4yu"><a href="https://github.com/jacoblockett/palette" class="pricing-cta svelte-1cfu4yu">Also View on GitHub</a> <p class="pricing-note svelte-1cfu4yu">* Or at least, we\'ll say we did and never actually do it</p></div></div></div></div></section> <footer class="app-footer svelte-1cfu4yu"><div class="footer-brand svelte-1cfu4yu"><span class="brand-mark footer-brand-mark svelte-1cfu4yu" aria-hidden="true"><span class="brand-swatch brand-swatch-text svelte-1cfu4yu"></span> <span class="brand-swatch brand-swatch-background svelte-1cfu4yu"></span> <span class="brand-swatch brand-swatch-primary svelte-1cfu4yu"></span> <span class="brand-swatch brand-swatch-secondary svelte-1cfu4yu"></span> <span class="brand-swatch brand-swatch-accent svelte-1cfu4yu"></span></span> <span class="footer-brand-text svelte-1cfu4yu">Palette</span></div> <div class="footer-links svelte-1cfu4yu"><a href="https://github.com/jacoblockett/palette" class="footer-link svelte-1cfu4yu">Documentation</a> <a href="https://github.com/jacoblockett/palette" class="footer-link svelte-1cfu4yu">GitHub</a></div></footer></div>');Nn(["click","focusout","input","pointerdown"]);const lc=function(e,t){return function(e,{target:t,anchor:n,props:r={},events:c,context:a,intro:l=!0,transformError:i}){!function(){if(void 0===ot){ot=window,ct=/Firefox/.test(navigator.userAgent);var e=Element.prototype,t=Node.prototype,n=Text.prototype;st=s(t,"firstChild").get,at=s(t,"nextSibling").get,f(e)&&(e[q]=void 0,e[R]=null,e[W]=void 0,e.__e=void 0),f(n)&&(n[H]=void 0)}}();var u=void 0,d=function(e){Se.ensure();const t=mt(524352,e);return(e={})=>new Promise(n=>{e.outro?Ct(t,()=>{Tt(t),n(void 0)}):(Tt(t),n(void 0))})}(()=>{var s=n??t.appendChild(lt());!function(e,t,n,r){new Ce(e,t,n,r)}(s,{pending:()=>{}},t=>{ee({}),a&&(X.c=a),c&&(r.$$events=c),u=e(t,r)||{},te()},i);var l=new Set,f=e=>{for(var n=0;n<e.length;n++){var r=e[n];if(!l.has(r)){l.add(r);var o=xn(r);for(const e of[t,document]){var c=qn.get(e);void 0===c&&(c=new Map,qn.set(e,c));var s=c.get(r);void 0===s?(e.addEventListener(r,Tn,{passive:o}),c.set(r,1)):c.set(r,s+1)}}}};return f(o(Mn)),Sn.add(f),()=>{for(var e of l)for(const n of[t,document]){var r=qn.get(n),o=r.get(e);0==--o?(n.removeEventListener(e,Tn),r.delete(e),0===r.size&&qn.delete(n)):r.set(e,o)}Sn.delete(f),s!==n&&s.parentNode?.removeChild(s)}});return Wn.set(u,d),u}(e,t)}(function(e,t){ee(t,!1);const n=Je();let r=Je("dark"),o=Je(Lo()),c=Je("random"),s=Je(!1),a=Je(!1),l=Je([]),i=Je(null),u=Je({}),f=Je(!1),d=Je(!1),p=Je(null),v=fn(o),y=Je(null),g=[],m=Je(!1),b=Je(218),k=Je(.75),w=Je(.96),x=null,M=Je(),S=Je(),P=Je(),j=Je(),N=Je(),E=Je(),T=Je("down"),O=Je(288),C=Je([K()]),I=Je(0),D=null;const L=[{key:"text",label:"Text"},{key:"background",label:"Background"},{key:"primary",label:"Primary"},{key:"secondary",label:"Secondary"},{key:"accent",label:"Accent"}],z=["random","monochromatic","analogous","complementary","split-complementary","triadic","compound","double-split-complementary","neutral-complementary","accented-neutral","achromatic","warm","cool","muted","earth","pastel","neon","jewel","brand-status","enterprise","luxury"],R=[10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200],q=[{icon:Bo,iconClass:"feature-icon-svg",title:"Seedable Configuration",desc:"Provide zero to five seed colors, and we deterministically hallucinate the rest. Like magic, if you don't understand basic math."},{icon:Ko,iconClass:"feature-icon-svg",title:"Aggressive WCAG",desc:"If your input or generated colors fail minimum accessibility checks, we throw an error and crash your app. You're welcome."},{icon:Fo,iconClass:"feature-icon-svg",title:"Bountiful Schemes",desc:"Whatever color scheme you want, we probably have it. Proprietary, of course. The word means something, right?"}],W=["Light & Dark UI auto-generation","Scale shades per color","Throws errors on bad contrast","Community support*"],H=["Everything in Open Source","We can send you a professional email*","You can pretend you paid for it","Shiny pill at the top right that says 'Enterprise'"],F=[{quote:"Palette generated colors so confidently that I stopped asking whether they were good.",name:"A Frontend Developer",role:"Still shipping buttons"},{quote:"We replaced three meetings, two Figma comments, and one very tired designer with a hex code.",name:"A Product Manager",role:"Probably in another sync"},{quote:"The WCAG errors hurt my feelings, but the contrast was technically better.",name:"A Design System Lead",role:"Learning to vibe"},{quote:"I typed one color, got an entire palette back, and immediately started acting like I meant to do that.",name:"A Full-Stack Developer",role:"Deploying with confidence"},{quote:"Our brand meeting ended early, which frankly made everyone suspicious.",name:"A Startup Founder",role:"Optimizing runway and patience"},{quote:"It removed just enough creative choice to keep the project moving, which is my favorite amount.",name:"An Engineering Manager",role:"Calendar-based life form"}];function V(e){if(e.light&&e.dark)Xe(o,e);else{const t=fn(o)[fn(r)],[n,c]=Object.entries(e)[0],s={...t,[n]:c,shades:{text:{...t.shades.text},background:{...t.shades.background},primary:{...t.shades.primary},secondary:{...t.shades.secondary},accent:{...t.shades.accent}}};if("background"===n)L.every(e=>Q(s[e.key]))&&(s.shades=Lo.shades({background:s.background,colors:{text:s.text,background:s.background,primary:s.primary,secondary:s.secondary,accent:s.accent},wcag:!1}));else if(Q(s.background)&&Q(c)){const e=Lo.shades({background:s.background,colors:{[n]:c},wcag:!1});s.shades[n]=e[n]}Xe(o,{...fn(o),[fn(r)]:s})}if(!fn(M))return;const t=fn(o).light;fn(M).style.setProperty("--theme-light-text",t.text),fn(M).style.setProperty("--theme-light-background",t.background),fn(M).style.setProperty("--theme-light-primary",t.primary),fn(M).style.setProperty("--theme-light-secondary",t.secondary),fn(M).style.setProperty("--theme-light-accent",t.accent);for(const e of["text","background","primary","secondary","accent"])for(const n of R)fn(M).style.setProperty(`--theme-light-${e}-${n}`,t.shades[e][n]);const n=fn(o).dark;fn(M).style.setProperty("--theme-dark-text",n.text),fn(M).style.setProperty("--theme-dark-background",n.background),fn(M).style.setProperty("--theme-dark-primary",n.primary),fn(M).style.setProperty("--theme-dark-secondary",n.secondary),fn(M).style.setProperty("--theme-dark-accent",n.accent);for(const e of["text","background","primary","secondary","accent"])for(const t of R)fn(M).style.setProperty(`--theme-dark-${e}-${t}`,n.shades[e][t]);const c=fn(o)[fn(r)];fn(M).style.setProperty("--theme-text",c.text),fn(M).style.setProperty("--theme-background",c.background),fn(M).style.setProperty("--theme-primary",c.primary),fn(M).style.setProperty("--theme-secondary",c.secondary),fn(M).style.setProperty("--theme-accent",c.accent);for(const e of["text","background","primary","secondary","accent"])for(const t of R)fn(M).style.setProperty(`--theme-${e}-${t}`,c.shades[e][t])}function G(e){return{light:{text:e.light.text,background:e.light.background,primary:e.light.primary,secondary:e.light.secondary,accent:e.light.accent,shades:{text:{...e.light.shades.text},background:{...e.light.shades.background},primary:{...e.light.shades.primary},secondary:{...e.light.shades.secondary},accent:{...e.light.shades.accent}}},dark:{text:e.dark.text,background:e.dark.background,primary:e.dark.primary,secondary:e.dark.secondary,accent:e.dark.accent,shades:{text:{...e.dark.shades.text},background:{...e.dark.shades.background},primary:{...e.dark.shades.primary},secondary:{...e.dark.shades.secondary},accent:{...e.dark.shades.accent}}}}}function U(e){return G(e)}function K(){return{theme:U(fn(o)),lockedSeedRoles:{...fn(u)},activeColorMode:fn(r),demoScheme:fn(c),wcag:fn(s),lastGeneratedPalette:G(v),paletteErrorMessage:fn(y),paletteErrorRoles:[...g]}}function Y(e){Xe(u,{...e.lockedSeedRoles}),Xe(r,e.activeColorMode),V(U(e.theme)),Xe(c,e.demoScheme),Xe(s,e.wcag),v=G(e.lastGeneratedPalette),Xe(y,e.paletteErrorMessage??null),g=[...e.paletteErrorRoles??[]],fn(p)&&Q(fn(o)[fn(r)][fn(p)])&&ce(fn(o)[fn(r)][fn(p)])}function Z(e,t){return JSON.stringify(e)===JSON.stringify(t)}function Q(e){return"string"==typeof e&&/^#[0-9a-fA-F]{6}$/.test(e)}function ne(e){return e.toString(16).padStart(2,"0")}function re(e){if(!Q(e))return null;const t=e.slice(1);return{r:parseInt(t.slice(0,2),16),g:parseInt(t.slice(2,4),16),b:parseInt(t.slice(4,6),16)}}function oe(e,t,n){return function({r:e,g:t,b:n}){return`#${ne(e)}${ne(t)}${ne(n)}`}(function(e,t,n){const r=n*t,o=(e%360+360)%360/60,c=r*(1-Math.abs(o%2-1)),s=n-r;let a=0,l=0,i=0;return o>=0&&o<1?(a=r,l=c):o<2?(a=c,l=r):o<3?(l=r,i=c):o<4?(l=c,i=r):o<5?(a=c,i=r):(a=r,i=c),{r:Math.round(255*(a+s)),g:Math.round(255*(l+s)),b:Math.round(255*(i+s))}}(e,t,n))}function ce(e){const t=re(e);if(!t)return;const n=function({r:e,g:t,b:n}){const r=e/255,o=t/255,c=n/255,s=Math.max(r,o,c),a=s-Math.min(r,o,c);let l=0;return 0!==a&&(l=s===r?(o-c)/a%6*60:s===o?60*((c-r)/a+2):60*((r-o)/a+4)),{h:l<0?l+360:l,s:0===s?0:a/s,v:s}}(t);Xe(b,n.h),Xe(k,n.s),Xe(w,n.v)}function se(){null===D&&(D=K())}function ae(){if(null===D)return;const e=K();if(!Z(D,e)){const t=fn(C).slice(0,fn(I)+1);t.push(e),Xe(C,t),Xe(I,t.length-1)}D=null}function le(e,t,n={}){const r=!1===n.sanitize?t:function(e){const t=e.trim();return""===t?"#":(t.startsWith("#")?t:`#${t}`).slice(0,7)}(t);V({[e]:r}),e===fn(p)&&!n.fromPicker&&Q(r)&&ce(r)}async function ie(e){fn(p)!==e&&ae(),Xe(p,e),Q(fn(o)[fn(r)][e])&&ce(fn(o)[fn(r)][e]),await async function(){if(await un(),!fn(S))return;const e=fn(S).getBoundingClientRect().top-88;e<0&&window.scrollBy({top:e,behavior:"smooth"})}()}function fe(e){e.currentTarget.contains(e.relatedTarget)||(ae(),Xe(p,null),x=null)}async function de(e){await navigator.clipboard.writeText("pnpm i @jacoblockett/palette"),"nav"===e&&Xe(f,!0),"hero"===e&&Xe(d,!0),setTimeout(()=>{"nav"===e&&Xe(f,!1),"hero"===e&&Xe(d,!1)},1200)}function he(){fn(p)&&(ke(),le(fn(p),oe(fn(b),fn(k),fn(w)),{fromPicker:!0,sanitize:!1}))}function pe(e,t,n){return Math.min(n,Math.max(t,e))}function ve(e){if(!fn(P))return;const t=fn(P).getBoundingClientRect(),n=pe((e.clientX-t.left)/t.width,0,1),r=pe((e.clientY-t.top)/t.height,0,1);Xe(k,n),Xe(w,1-r),he()}function ye(e){if(!fn(j))return;const t=fn(j).getBoundingClientRect(),n=pe((e.clientX-t.left)/t.width,0,1);Xe(b,360*n),he()}function ge(e){fn(p)&&(e.preventDefault(),se(),x="saturation-value",ve(e))}function me(e){fn(p)&&(e.preventDefault(),se(),x="hue",ye(e))}function be(e){e.preventDefault()}function ke(){Xe(y,null),g=[]}function we(e){Xe(y,e.message),g=function(e){if("palette text and background cannot be the same color."===e)return["text","background"];const t=e.match(/^palette ([a-z]+) seed #[0-9a-f]{6} must meet 4\.5 contrast against background #[0-9a-f]{6}\.$/);return t?[t[1],"background"]:"palette seed values must be 6-digit hex colors."===e?L.filter(e=>fn(u)[e.key]&&!Q(fn(o)[fn(r)][e.key])).map(e=>e.key):[]}(e.message)}function _e(e){const t=re(e);if(!t)return"#ffffff";return(.299*t.r+.587*t.g+.114*t.b)/255>.62?"#0f172a":"#f8fafc"}function xe(e){const t=re(e);if(!t)return"rgba(248, 250, 252, 0.18)";return(.299*t.r+.587*t.g+.114*t.b)/255>.62?"rgba(15, 23, 42, 0.16)":"rgba(248, 250, 252, 0.18)"}function $e(e){return e.split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}async function Me(){if(!fn(m)||!fn(N))return;await un();const e=fn(N).getBoundingClientRect(),t=Math.min(fn(E)?.scrollHeight??288,288),n=Math.max(e.top-12,0),r=Math.max(window.innerHeight-e.bottom-12,0);if(r<t&&n>=r)return Xe(T,"up"),void Xe(O,Math.max(0,Math.min(288,n)));Xe(T,"down"),Xe(O,Math.max(0,Math.min(288,r)))}function Se(e){return!!fn(E)&&fn(E).contains(e.target)}function Pe(e){if(!fn(m))return;if(!Se(e))return void e.preventDefault();const t=fn(E).scrollHeight-fn(E).clientHeight,n=e.deltaY<0,r=e.deltaY>0,o=fn(E).scrollTop<=0,c=fn(E).scrollTop>=t;(o&&n||c&&r)&&e.preventDefault()}function je(e){fn(m)&&!Se(e)&&e.preventDefault()}function Ae(e){const t=e.target,n=t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||!0===t?.isContentEditable,r=e.metaKey||e.ctrlKey,o=e.key.toLowerCase(),c=r&&"z"===o&&!e.shiftKey,s=r&&("z"===o&&e.shiftKey||"y"===o);if(!n&&c)return e.preventDefault(),void Ce();if(!n&&s)return e.preventDefault(),void Ie();if(!fn(m))return;!(" "===e.key||"Space"===e.code)&&!["PageUp","PageDown","End","Home","ArrowUp","ArrowDown"].includes(e.key)||Se(e)||e.preventDefault()}function Ne(){const e={};for(const t of L)fn(u)[t.key]&&Q(fn(o)[fn(r)][t.key])&&(e[t.key]=fn(o)[fn(r)][t.key]);return"random"!==fn(c)&&(e.scheme=fn(c)),fn(s)&&(e.wcag=!0),e}function Ee(){const e=Ne(),t=Object.entries(e);if(0===t.length)return"import palette from '@jacoblockett/palette'\n\nconst theme = palette()";const n=t.map(([e,n],r)=>`\t${e}: ${"string"==typeof n?`"${n}"`:n?"true":"false"}${r===t.length-1?"":","}`);return`import palette from '@jacoblockett/palette'\n\nconst theme = palette({\n${n.join("\n")}\n})`}function Te(e){return{text:e,className:"token-text"}}function Oe(){const e="light"===fn(r)?"dark":"light";Xe(r,e),fn(p)&&Q(fn(o)[e][fn(p)])&&ce(fn(o)[e][fn(p)]),ke()}function Ce(){const e=D;if(null!==e){const t=K();if(D=null,!Z(e,t)){const n=fn(C).slice(0,fn(I)+1);return n.push(t),Xe(C,n),Xe(I,n.length-2),void Y(e)}}0!==fn(I)&&(Xe(I,fn(I)-1),Y(fn(C)[fn(I)]))}function Ie(){D=null,fn(I)>=fn(C).length-1||(Xe(I,fn(I)+1),Y(fn(C)[fn(I)]))}var De,Le,ze;De=()=>(V(fn(o)),window.addEventListener("wheel",Pe,{passive:!1}),window.addEventListener("touchmove",je,{passive:!1}),window.addEventListener("keydown",Ae),()=>{window.removeEventListener("wheel",Pe),window.removeEventListener("touchmove",je),window.removeEventListener("keydown",Ae)}),null===X&&B(),J&&null!==X.l?(Le=X,ze=Le.l,ze.u??={a:[],b:[],m:[]}).m.push(De):wt(()=>{const e=pn(De);if("function"==typeof e)return e}),$t(()=>(fn(u),fn(o),fn(r),fn(c),fn(s)),()=>{fn(u),fn(o),fn(r),fn(c),fn(s),Xe(l,Ee().split("\n").map(e=>{const t=e.match(/^\t*/)?.[0].length??0,n=e.slice(t);if(""===n)return{indent:t,segments:[]};if(n.startsWith("import "))return{indent:t,segments:[{text:"import ",className:"token-keyword"},{text:"palette",className:"token-identifier"},{text:" from ",className:"token-keyword"},{text:n.slice(20),className:"token-string"}]};if("const theme = palette()"===n)return{indent:t,segments:[{text:"const ",className:"token-keyword"},{text:"theme",className:"token-identifier"},{text:" = ",className:"token-keyword"},{text:"palette",className:"token-identifier"},{text:"()",className:"token-punctuation"}]};if("const theme = palette({"===n)return{indent:t,segments:[{text:"const ",className:"token-keyword"},{text:"theme",className:"token-identifier"},{text:" = ",className:"token-keyword"},{text:"palette",className:"token-identifier"},{text:"({",className:"token-punctuation"}]};if("})"===n)return{indent:t,segments:[{text:"})",className:"token-punctuation"}]};const r=n.match(/^([a-z]+): (.+?)(,?)$/);if(r){const[,e,n,o]=r,c=[{text:`${e}: `,className:"token-identifier"},{text:n,className:"true"===n||"false"===n?"token-boolean":"token-string"}];return o&&c.push({text:o,className:"token-punctuation"}),{indent:t,segments:c}}return{indent:t,segments:[Te(n)]}}))}),$t(()=>fn(b),()=>{Xe(n,`hsl(${fn(b)} 100% 50%)`)}),function(){var e=X;Mt(()=>{for(var t of e.l.$){t.deps();var n=t.effect;0!==(n.f&_)&&null!==n.deps&&ue(n,$),rn(n)&&ln(n),t.ran=!1}})}(),Mr();var Re=ac();jn("pointermove",ot,function(e){"saturation-value"===x&&ve(e),"hue"===x&&ye(e)}),jn("pointerup",ot,function(){null!==x&&(ae(),x=null)}),jn("resize",ot,()=>fn(m)&&Me()),jn("scroll",ot,()=>fn(m)&&Me());var qe=ft(Re),He=ft(qe),Fe=ht(ft(He),2),Ve=ft(Fe);Go(ft(Ve),{class:"nav-action-icon"});var Be=ht(Ve,2),Ge=ft(Be),Ue=ft(Ge),Ke=ht(Be,2),Ye=ft(Ke),Ze=ft(ht(Ye,2));Uo(Ze,{size:16,class:"install-pill-icon"}),ht(Ze).nodeValue=" pnpm i @jacoblockett/palette";var Qe=ht(qe,2),et=ht(ft(Qe),4),tt=ft(et);!function(e,t){ee(t,!0);
/**
		 * @license @lucide/svelte v1.3.0 - ISC
		 *
		 * ISC License
		 *
		 * Copyright (c) 2026 Lucide Icons and Contributors
		 *
		 * Permission to use, copy, modify, and/or distribute this software for any
		 * purpose with or without fee is hereby granted, provided that the above
		 * copyright notice and this permission notice appear in all copies.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		 *
		 * ---
		 *
		 * The following Lucide icons are derived from the Feather project:
		 *
		 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
		 *
		 * The MIT License (MIT) (for the icons listed above)
		 *
		 * Copyright (c) 2013-present Cole Bemis
		 *
		 * Permission is hereby granted, free of charge, to any person obtaining a copy
		 * of this software and associated documentation files (the "Software"), to deal
		 * in the Software without restriction, including without limitation the rights
		 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		 * copies of the Software, and to permit persons to whom the Software is
		 * furnished to do so, subject to the following conditions:
		 *
		 * The above copyright notice and this permission notice shall be included in all
		 * copies or substantial portions of the Software.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		 * SOFTWARE.
		 *
		 */
let n=jr(t,["$$slots","$$events","$$legacy"]);const r=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];Wo(e,Nr({name:"arrow-right"},()=>n,{get iconNode(){return r},children:(e,n)=>{var r=Ln();Zn(dt(r),()=>t.children??h),zn(e,r)},$$slots:{default:!0}})),te()}(ht(ft(tt)),{size:16,class:"cta-icon"});var nt=ht(tt,2),rt=ft(nt),ct=ht(rt,2);Uo(ct,{size:16,class:"cta-icon"}),ht(ct).nodeValue=" pnpm i @jacoblockett/palette";var st=ht(Qe,2),at=ft(st),it=ht(ft(at),2),ut=ft(it),pt=ft(ut),vt=ft(pt),yt=ft(vt);!function(e,t){ee(t,!0);
/**
		 * @license @lucide/svelte v1.3.0 - ISC
		 *
		 * ISC License
		 *
		 * Copyright (c) 2026 Lucide Icons and Contributors
		 *
		 * Permission to use, copy, modify, and/or distribute this software for any
		 * purpose with or without fee is hereby granted, provided that the above
		 * copyright notice and this permission notice appear in all copies.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		 *
		 * ---
		 *
		 * The following Lucide icons are derived from the Feather project:
		 *
		 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
		 *
		 * The MIT License (MIT) (for the icons listed above)
		 *
		 * Copyright (c) 2013-present Cole Bemis
		 *
		 * Permission is hereby granted, free of charge, to any person obtaining a copy
		 * of this software and associated documentation files (the "Software"), to deal
		 * in the Software without restriction, including without limitation the rights
		 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		 * copies of the Software, and to permit persons to whom the Software is
		 * furnished to do so, subject to the following conditions:
		 *
		 * The above copyright notice and this permission notice shall be included in all
		 * copies or substantial portions of the Software.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		 * SOFTWARE.
		 *
		 */
let n=jr(t,["$$slots","$$events","$$legacy"]);const r=[["rect",{width:"12",height:"12",x:"2",y:"10",rx:"2",ry:"2"}],["path",{d:"m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"}],["path",{d:"M6 18h.01"}],["path",{d:"M10 14h.01"}],["path",{d:"M15 6h.01"}],["path",{d:"M18 9h.01"}]];Wo(e,Nr({name:"dices"},()=>n,{get iconNode(){return r},children:(e,n)=>{var r=Ln();Zn(dt(r),()=>t.children??h),zn(e,r)},$$slots:{default:!0}})),te()}(ft(yt),{class:"toolbar-icon"});var gt=ht(yt,2);!function(e,t){ee(t,!0);
/**
		 * @license @lucide/svelte v1.3.0 - ISC
		 *
		 * ISC License
		 *
		 * Copyright (c) 2026 Lucide Icons and Contributors
		 *
		 * Permission to use, copy, modify, and/or distribute this software for any
		 * purpose with or without fee is hereby granted, provided that the above
		 * copyright notice and this permission notice appear in all copies.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		 *
		 * ---
		 *
		 * The following Lucide icons are derived from the Feather project:
		 *
		 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
		 *
		 * The MIT License (MIT) (for the icons listed above)
		 *
		 * Copyright (c) 2013-present Cole Bemis
		 *
		 * Permission is hereby granted, free of charge, to any person obtaining a copy
		 * of this software and associated documentation files (the "Software"), to deal
		 * in the Software without restriction, including without limitation the rights
		 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		 * copies of the Software, and to permit persons to whom the Software is
		 * furnished to do so, subject to the following conditions:
		 *
		 * The above copyright notice and this permission notice shall be included in all
		 * copies or substantial portions of the Software.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		 * SOFTWARE.
		 *
		 */
let n=jr(t,["$$slots","$$events","$$legacy"]);const r=[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"}]];Wo(e,Nr({name:"undo-2"},()=>n,{get iconNode(){return r},children:(e,n)=>{var r=Ln();Zn(dt(r),()=>t.children??h),zn(e,r)},$$slots:{default:!0}})),te()}(ft(gt),{class:"toolbar-icon"});var mt=ht(gt,2);!function(e,t){ee(t,!0);
/**
		 * @license @lucide/svelte v1.3.0 - ISC
		 *
		 * ISC License
		 *
		 * Copyright (c) 2026 Lucide Icons and Contributors
		 *
		 * Permission to use, copy, modify, and/or distribute this software for any
		 * purpose with or without fee is hereby granted, provided that the above
		 * copyright notice and this permission notice appear in all copies.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		 *
		 * ---
		 *
		 * The following Lucide icons are derived from the Feather project:
		 *
		 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
		 *
		 * The MIT License (MIT) (for the icons listed above)
		 *
		 * Copyright (c) 2013-present Cole Bemis
		 *
		 * Permission is hereby granted, free of charge, to any person obtaining a copy
		 * of this software and associated documentation files (the "Software"), to deal
		 * in the Software without restriction, including without limitation the rights
		 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		 * copies of the Software, and to permit persons to whom the Software is
		 * furnished to do so, subject to the following conditions:
		 *
		 * The above copyright notice and this permission notice shall be included in all
		 * copies or substantial portions of the Software.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		 * SOFTWARE.
		 *
		 */
let n=jr(t,["$$slots","$$events","$$legacy"]);const r=[["path",{d:"m15 14 5-5-5-5"}],["path",{d:"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"}]];Wo(e,Nr({name:"redo-2"},()=>n,{get iconNode(){return r},children:(e,n)=>{var r=Ln();Zn(dt(r),()=>t.children??h),zn(e,r)},$$slots:{default:!0}})),te()}(ft(mt),{class:"toolbar-icon"});var bt=ht(mt,2);Go(ft(bt),{class:"toolbar-icon"});var kt=ht(pt,2);Un(kt,5,()=>L,Vn,(e,t,c)=>{var s=Xo(),a=ft(s),l=ft(a),f=ht(a,2),d=ft(f),v=ft(ht(d,2)),y=ft(v),m=e=>{!function(e,t){ee(t,!0);
/**
		 * @license @lucide/svelte v1.3.0 - ISC
		 *
		 * ISC License
		 *
		 * Copyright (c) 2026 Lucide Icons and Contributors
		 *
		 * Permission to use, copy, modify, and/or distribute this software for any
		 * purpose with or without fee is hereby granted, provided that the above
		 * copyright notice and this permission notice appear in all copies.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		 *
		 * ---
		 *
		 * The following Lucide icons are derived from the Feather project:
		 *
		 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
		 *
		 * The MIT License (MIT) (for the icons listed above)
		 *
		 * Copyright (c) 2013-present Cole Bemis
		 *
		 * Permission is hereby granted, free of charge, to any person obtaining a copy
		 * of this software and associated documentation files (the "Software"), to deal
		 * in the Software without restriction, including without limitation the rights
		 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		 * copies of the Software, and to permit persons to whom the Software is
		 * furnished to do so, subject to the following conditions:
		 *
		 * The above copyright notice and this permission notice shall be included in all
		 * copies or substantial portions of the Software.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		 * SOFTWARE.
		 *
		 */
let n=jr(t,["$$slots","$$events","$$legacy"]);const r=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];Wo(e,Nr({name:"lock"},()=>n,{get iconNode(){return r},children:(e,n)=>{var r=Ln();Zn(dt(r),()=>t.children??h),zn(e,r)},$$slots:{default:!0}})),te()}(e,{class:"seed-action-icon"})},_=e=>{!function(e,t){ee(t,!0);
/**
		 * @license @lucide/svelte v1.3.0 - ISC
		 *
		 * ISC License
		 *
		 * Copyright (c) 2026 Lucide Icons and Contributors
		 *
		 * Permission to use, copy, modify, and/or distribute this software for any
		 * purpose with or without fee is hereby granted, provided that the above
		 * copyright notice and this permission notice appear in all copies.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		 *
		 * ---
		 *
		 * The following Lucide icons are derived from the Feather project:
		 *
		 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
		 *
		 * The MIT License (MIT) (for the icons listed above)
		 *
		 * Copyright (c) 2013-present Cole Bemis
		 *
		 * Permission is hereby granted, free of charge, to any person obtaining a copy
		 * of this software and associated documentation files (the "Software"), to deal
		 * in the Software without restriction, including without limitation the rights
		 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		 * copies of the Software, and to permit persons to whom the Software is
		 * furnished to do so, subject to the following conditions:
		 *
		 * The above copyright notice and this permission notice shall be included in all
		 * copies or substantial portions of the Software.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		 * SOFTWARE.
		 *
		 */
let n=jr(t,["$$slots","$$events","$$legacy"]);const r=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 9.9-1"}]];Wo(e,Nr({name:"lock-open"},()=>n,{get iconNode(){return r},children:(e,n)=>{var r=Ln();Zn(dt(r),()=>t.children??h),zn(e,r)},$$slots:{default:!0}})),te()}(e,{class:"seed-action-icon"})};Fn(y,e=>{fn(u),fn(t),pn(()=>fn(u)[fn(t).key])?e(m):e(_,-1)});var x=ht(v,2),$=ft(x),M=e=>{Ho(e,{class:"seed-action-icon"})},A=e=>{Vo(e,{class:"seed-action-icon"})};Fn($,e=>{fn(i),fn(t),pn(()=>fn(i)===fn(t).key)?e(M):e(A,-1)});var N=ht(f,2),E=e=>{var t=Jo();cr(t,1,"color-picker-wrap "+(c%2==0?"align-left":"align-right"),"svelte-1cfu4yu");var r=ft(t),o=ft(r),s=ft(o),a=ft(s),l=ht(a,2);$r(s,e=>Xe(P,e),()=>fn(P));var i=ht(s,2),u=ht(ft(i),2),f=ht(ft(u),2);$r(u,e=>Xe(j,e),()=>fn(j)),$r(t,e=>Xe(S,e),()=>fn(S)),St(()=>{ar(a,`background:\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlinear-gradient(to top, rgb(0 0 0), transparent),\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlinear-gradient(to right, rgb(255 255 255), ${fn(n)});`),ar(l,`left: ${100*fn(k)}%; top: ${100*(1-fn(w))}%;`),ar(f,`left: ${fn(b)/360*100}%;`)}),An("pointerdown",r,be),An("pointerdown",s,ge),An("pointerdown",u,me),zn(e,t)};Fn(N,e=>{fn(p),fn(t),pn(()=>fn(p)===fn(t).key)&&e(E)}),St((e,n,c,s)=>{Rn(l,(fn(t),pn(()=>fn(t).label))),function(e,t){var n=kr(e);n.value!==(n.value=t??void 0)&&(e.value!==t||0===t&&e.nodeName===yr)&&(e.value=t??"")}(d,(fn(o),fn(r),fn(t),pn(()=>fn(o)[fn(r)][fn(t).key]))),cr(d,1,e,"svelte-1cfu4yu"),ar(d,n),mr(v,"aria-label",(fn(u),fn(t),pn(()=>`${fn(u)[fn(t).key]?"Unlock":"Lock"} ${fn(t).label} hex`))),cr(v,1,(fn(u),fn(t),pn(()=>"seed-action-button lock-button "+(fn(u)[fn(t).key]?"is-locked":""))),"svelte-1cfu4yu"),mr(v,"tabindex",(fn(u),fn(t),fn(p),pn(()=>fn(u)[fn(t).key]||fn(p)===fn(t).key?0:-1))),ar(v,c),mr(x,"aria-label",(fn(t),pn(()=>`Copy ${fn(t).label} hex`))),mr(x,"tabindex",(fn(p),fn(t),pn(()=>fn(p)===fn(t).key?0:-1))),ar(x,s)},[()=>(fn(t),pn(()=>{return"seed-input "+(e=fn(t).key,g.includes(e)?"is-error":"");var e})),()=>(fn(o),fn(r),fn(t),pn(()=>`background-color: ${fn(o)[fn(r)][fn(t).key]}; color: ${_e(fn(o)[fn(r)][fn(t).key])};`)),()=>(fn(o),fn(r),fn(t),pn(()=>`--seed-action-color: ${_e(fn(o)[fn(r)][fn(t).key])}; --seed-action-hover: ${xe(fn(o)[fn(r)][fn(t).key])};`)),()=>(fn(o),fn(r),fn(t),pn(()=>`--seed-action-color: ${_e(fn(o)[fn(r)][fn(t).key])}; --seed-action-hover: ${xe(fn(o)[fn(r)][fn(t).key])};`))]),An("focusout",s,fe),jn("focus",d,e=>async function(e,t){await ie(e),t.currentTarget.select()}(fn(t).key,e)),An("click",d,()=>ie(fn(t).key)),An("input",d,e=>{return n=fn(t).key,r=e.currentTarget.value,se(),ke(),void le(n,r);var n,r}),An("click",v,()=>{return e=fn(t).key,Xe(u,{...fn(u),[e]:!fn(u)[e]}),void ke();var e}),An("click",x,()=>async function(e,t){await navigator.clipboard.writeText(t),Xe(i,e),setTimeout(()=>{fn(i)===e&&Xe(i,null)},1200)}(fn(t).key,fn(o)[fn(r)][fn(t).key])),zn(e,s)});var _t=ht(kt,2),xt=e=>{var t=Zo(),n=ft(t);St(()=>Rn(n,fn(y))),zn(e,t)};Fn(_t,e=>{fn(y)&&e(xt)});var jt=ht(_t,2),At=ht(ft(jt),2),Nt=ft(At),Et=ft(Nt),Tt=ft(Et),Ot=ht(Et,2);{let e=We(()=>"scheme-chevron "+(fn(m)?"is-open":""));!function(e,t){ee(t,!0);
/**
		 * @license @lucide/svelte v1.3.0 - ISC
		 *
		 * ISC License
		 *
		 * Copyright (c) 2026 Lucide Icons and Contributors
		 *
		 * Permission to use, copy, modify, and/or distribute this software for any
		 * purpose with or without fee is hereby granted, provided that the above
		 * copyright notice and this permission notice appear in all copies.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		 *
		 * ---
		 *
		 * The following Lucide icons are derived from the Feather project:
		 *
		 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
		 *
		 * The MIT License (MIT) (for the icons listed above)
		 *
		 * Copyright (c) 2013-present Cole Bemis
		 *
		 * Permission is hereby granted, free of charge, to any person obtaining a copy
		 * of this software and associated documentation files (the "Software"), to deal
		 * in the Software without restriction, including without limitation the rights
		 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		 * copies of the Software, and to permit persons to whom the Software is
		 * furnished to do so, subject to the following conditions:
		 *
		 * The above copyright notice and this permission notice shall be included in all
		 * copies or substantial portions of the Software.
		 *
		 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		 * SOFTWARE.
		 *
		 */
let n=jr(t,["$$slots","$$events","$$legacy"]);const r=[["path",{d:"m6 9 6 6 6-6"}]];Wo(e,Nr({name:"chevron-down"},()=>n,{get iconNode(){return r},children:(e,n)=>{var r=Ln();Zn(dt(r),()=>t.children??h),zn(e,r)},$$slots:{default:!0}})),te()}(Ot,{get class(){return fn(e)}})}$r(Nt,e=>Xe(N,e),()=>fn(N));var Ct=ht(Nt,2),It=e=>{var t=ec(),n=ft(t);Un(n,5,()=>z,Vn,(e,t)=>{var n=Qo(),r=ft(n);St(e=>{cr(n,1,"scheme-option "+(fn(c)===fn(t)?"is-active":""),"svelte-1cfu4yu"),Rn(r,e)},[()=>(fn(t),pn(()=>$e(fn(t))))]),An("click",n,()=>function(e){Xe(c,e),Xe(m,!1),ke()}(fn(t))),zn(e,n)}),$r(n,e=>Xe(E,e),()=>fn(E)),St(()=>{cr(t,1,"scheme-menu-wrap "+("up"===fn(T)?"direction-up":"direction-down"),"svelte-1cfu4yu"),ar(n,`max-height: ${fn(O)}px;`)}),zn(e,t)};Fn(Ct,e=>{fn(m)&&e(It)});var Dt=ft(ht(jt,2)),Lt=ft(Dt),zt=ht(ut,2),Rt=ht(ft(zt),2),qt=ft(Rt),Wt=ht(ft(qt),4),Ht=ft(Wt),Ft=e=>{Ho(e,{class:"code-preview-copy-icon",size:14,strokeWidth:2.25,"aria-hidden":"true"})},Vt=e=>{Vo(e,{class:"code-preview-copy-icon",size:14,strokeWidth:2.25,"aria-hidden":"true"})};Fn(Ht,e=>{fn(a)?e(Ft):e(Vt,-1)});var Bt=ht(Ht);Un(ft(ht(qt,2)),5,()=>fn(l),Vn,(e,t,n)=>{var r=nc(),o=ft(r);o.textContent=n+1;var c=ht(o,2),s=ft(c),a=e=>{var t=function(e=""){var t=lt(e+"");return In(t,t),t}(" ");zn(e,t)},l=e=>{var n=Ln();Un(dt(n),1,()=>(fn(t),pn(()=>fn(t).segments)),Vn,(e,t)=>{var n=tc(),r=ft(n);St(()=>{cr(n,1,tr((fn(t),pn(()=>fn(t).className))),"svelte-1cfu4yu"),Rn(r,(fn(t),pn(()=>fn(t).text)))}),zn(e,n)}),zn(e,n)};Fn(s,e=>{fn(t),pn(()=>0===fn(t).segments.length)?e(a):e(l,-1)}),St(()=>ar(c,(fn(t),pn(()=>`padding-left: ${2*fn(t).indent}rem;`)))),zn(e,r)});var Gt=ht(st,2);Un(ht(ft(Gt),2),5,()=>q,Vn,(e,t,n)=>{var r=rc(),o=ft(r);cr(o,1,"feature-icon-shell "+(0===n?"is-primary":1===n?"is-secondary":"is-accent"),"svelte-1cfu4yu"),function(e,t,n){var r=new Hn(e);Pt(()=>{var e=t()??null;r.ensure(e,e&&(t=>n(t,e)))},A)}(ft(o),()=>fn(t).icon,(e,n)=>{n(e,{get class(){return fn(t),pn(()=>fn(t).iconClass)}})});var c=ht(o,2),s=ft(c),a=ft(ht(c,2));St(()=>{Rn(s,(fn(t),pn(()=>fn(t).title))),Rn(a,(fn(t),pn(()=>fn(t).desc)))}),zn(e,r)});var Ut=ht(Gt,2),Kt=ft(Ut),Yt=ht(ft(Kt),2);Un(ht(ft(Yt),4),5,()=>pn(()=>[...F,...F]),Vn,(e,t)=>{var n=oc(),r=ft(n),o=ft(r),c=ft(ht(r,2)),s=ft(c),a=ft(ht(c,2));St(()=>{Rn(o,`"${fn(t),pn(()=>fn(t).quote)??""}"`),Rn(s,(fn(t),pn(()=>fn(t).name))),Rn(a,(fn(t),pn(()=>fn(t).role)))}),zn(e,n)});var Jt=ft(ht(Ut,2)),Xt=ht(ft(Jt),2),Zt=ft(Xt);Un(ht(ft(Zt),6),5,()=>W,Vn,(e,t)=>{var n=cc(),r=ft(n);Ho(r,{class:"pricing-check-icon"});var o=ht(r);St(()=>Rn(o,` ${fn(t)??""}`)),zn(e,n)});var Qt=ht(Zt,2);Un(ht(ft(Qt),8),5,()=>H,Vn,(e,t)=>{var n=sc(),r=ft(n);Ho(r,{class:"pricing-check-icon"});var o=ht(r);St(()=>Rn(o,` ${fn(t)??""}`)),zn(e,n)}),$r(Re,e=>Xe(M,e),()=>fn(M)),St(e=>{mr(Re,"data-theme",fn(r)),mr(Ve,"aria-label",`Switch to ${"light"===fn(r)?"dark":"light"} mode`),mr(Ue,"d",(vn(Yo),pn(()=>Yo.path))),cr(Ye,1,"copy-tooltip nav-copy-tooltip "+(fn(f)?"is-visible":""),"svelte-1cfu4yu"),cr(rt,1,"copy-tooltip hero-copy-tooltip "+(fn(d)?"is-visible":""),"svelte-1cfu4yu"),gt.disabled=0===fn(I),mt.disabled=(fn(I),fn(C),pn(()=>fn(I)>=fn(C).length-1)),mr(bt,"aria-label",`Switch to ${"light"===fn(r)?"dark":"light"} mode`),cr(At,1,`scheme-control ${fn(m)?"is-open":""} ${fn(m)&&"up"===fn(T)?"opens-up":""} ${fn(m)&&"down"===fn(T)?"opens-down":""}`,"svelte-1cfu4yu"),cr(Nt,1,`scheme-trigger ${fn(m)?"is-open":""} ${fn(m)&&"up"===fn(T)?"opens-up":""} ${fn(m)&&"down"===fn(T)?"opens-down":""}`,"svelte-1cfu4yu"),Rn(Tt,e),cr(Dt,1,"wcag-toggle "+(fn(s)?"is-active":""),"svelte-1cfu4yu"),cr(Lt,1,"wcag-toggle-thumb "+(fn(s)?"is-active":""),"svelte-1cfu4yu"),Rn(Bt," "+(fn(a)?"Copied":"Copy"))},[()=>(fn(c),pn(()=>$e(fn(c))))]),An("click",Ve,Oe),An("click",Ke,()=>de("nav")),An("click",nt,()=>de("hero")),An("click",yt,function(){ae();try{const e=Lo(Ne());v=e,V(e),fn(p)&&Q(e[fn(r)][fn(p)])&&ce(e[fn(r)][fn(p)]),ke();const t=fn(C).slice(0,fn(I)+1);t.push(K()),Xe(C,t),Xe(I,t.length-1)}catch(e){we(e)}}),An("click",gt,Ce),An("click",mt,Ie),An("click",bt,Oe),An("focusout",jt,function(e){e.currentTarget.contains(e.relatedTarget)||Xe(m,!1)}),An("click",Nt,async function(){Xe(m,!fn(m)),fn(m)&&await Me()}),An("click",Dt,function(){Xe(s,!fn(s)),ke()}),An("click",Wt,function(){navigator.clipboard.writeText(Ee()),Xe(a,!0),setTimeout(()=>{Xe(a,!1)},2e3)}),zn(e,Re),te()},{target:document.getElementById("app")});return lc}();
