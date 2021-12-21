var Se=Object.defineProperty,Me=Object.defineProperties;var Be=Object.getOwnPropertyDescriptors;var ce=Object.getOwnPropertySymbols;var Ne=Object.prototype.hasOwnProperty,De=Object.prototype.propertyIsEnumerable;var de=(s,e,n)=>e in s?Se(s,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):s[e]=n,U=(s,e)=>{for(var n in e||(e={}))Ne.call(e,n)&&de(s,n,e[n]);if(ce)for(var n of ce(e))De.call(e,n)&&de(s,n,e[n]);return s},V=(s,e)=>Me(s,Be(e));import{f as S,i as j,j as ve,k as h,r as P,h as t,o as a,l as M,w as B,m as he,a as d,n as y,d as Y,t as T,p as w,q as G,s as Ee,v as Pe,x as Re,y as O,z as q,A as J,B as pe,b,e as C,C as fe,F as D,D as A,E as H,G as Ie,H as Ae,T as _e,I as z,J as Oe,K as Q,L as Z,M as me,u as be,g as E,N as ge,O as ke,c as He,P as $e,Q as ze,R as K,S as ee,U as Fe,V as F,W as We,X as Ue}from"./app.48a1f12a.js";const Ve=["href","rel","target","aria-label"],je=S({inheritAttrs:!1}),R=S(V(U({},je),{props:{item:{type:Object,required:!0}},setup(s){const e=s,n=j(),u=Re(),{item:o}=ve(e),g=h(()=>G(o.value.link)),$=h(()=>Ee(o.value.link)||Pe(o.value.link)),_=h(()=>{if(!$.value){if(o.value.target)return o.value.target;if(g.value)return"_blank"}}),r=h(()=>_.value==="_blank"),l=h(()=>!g.value&&!$.value&&!r.value),i=h(()=>{if(!$.value){if(o.value.rel)return o.value.rel;if(r.value)return"noopener noreferrer"}}),p=h(()=>o.value.ariaLabel||o.value.text),v=h(()=>{const f=Object.keys(u.value.locales);return f.length?!f.some(c=>c===o.value.link):o.value.link!=="/"}),m=h(()=>v.value?n.path.startsWith(o.value.link):!1),k=h(()=>l.value?o.value.activeMatch?new RegExp(o.value.activeMatch).test(n.path):m.value:!1);return(f,c)=>{const L=P("RouterLink"),x=P("ExternalLinkIcon");return t(l)?(a(),M(L,he({key:0,class:["nav-link",{"router-link-active":t(k)}],to:t(o).link,"aria-label":t(p)},f.$attrs),{default:B(()=>[y(f.$slots,"before"),Y(" "+T(t(o).text)+" ",1),y(f.$slots,"after")]),_:3},16,["class","to","aria-label"])):(a(),d("a",he({key:1,class:"nav-link external",href:t(o).link,rel:t(i),target:t(_),"aria-label":t(p)},f.$attrs),[y(f.$slots,"before"),Y(" "+T(t(o).text)+" ",1),t(r)?(a(),M(x,{key:0})):w("",!0),y(f.$slots,"after")],16,Ve))}}})),Ge=["aria-labelledby"],qe={class:"hero"},Ke=["src","alt"],Xe={key:0,id:"main-title"},Ye={key:1,class:"description"},Je={key:2,class:"actions"},Qe={key:0,class:"features"},Ze={class:"theme-default-content custom"},et=["innerHTML"],tt=["textContent"],nt=S({setup(s){const e=O(),n=q(),u=J(),o=h(()=>u.value&&e.value.heroImageDark!==void 0?e.value.heroImageDark:e.value.heroImage),g=h(()=>e.value.heroText===null?null:e.value.heroText||n.value.title||"Hello"),$=h(()=>e.value.heroAlt||g.value||"hero"),_=h(()=>e.value.tagline===null?null:e.value.tagline||n.value.description||"Welcome to your VuePress site"),r=h(()=>pe(e.value.actions)?e.value.actions.map(({text:v,link:m,type:k="primary"})=>({text:v,link:m,type:k})):[]),l=h(()=>pe(e.value.features)?e.value.features:[]),i=h(()=>e.value.footer),p=h(()=>e.value.footerHtml);return(v,m)=>{const k=P("ClientOnly"),f=P("Content");return a(),d("main",{class:"home","aria-labelledby":t(g)?"main-title":void 0},[b("header",qe,[C(k,null,{default:B(()=>[t(o)?(a(),d("img",{key:0,src:t(fe)(t(o)),alt:t($)},null,8,Ke)):w("",!0)]),_:1}),t(g)?(a(),d("h1",Xe,T(t(g)),1)):w("",!0),t(_)?(a(),d("p",Ye,T(t(_)),1)):w("",!0),t(r).length?(a(),d("p",Je,[(a(!0),d(D,null,A(t(r),c=>(a(),M(R,{key:c.text,class:H(["action-button",[c.type]]),item:c},null,8,["class","item"]))),128))])):w("",!0)]),t(l).length?(a(),d("div",Qe,[(a(!0),d(D,null,A(t(l),c=>(a(),d("div",{key:c.title,class:"feature"},[b("h2",null,T(c.title),1),b("p",null,T(c.details),1)]))),128))])):w("",!0),b("div",Ze,[C(f)]),t(i)?(a(),d(D,{key:1},[t(p)?(a(),d("div",{key:0,class:"footer",innerHTML:t(i)},null,8,et)):(a(),d("div",{key:1,class:"footer",textContent:T(t(i))},null,8,tt))],64)):w("",!0)],8,Ge)}}}),Le=s=>!G(s)||/github\.com/.test(s)?"GitHub":/bitbucket\.org/.test(s)?"Bitbucket":/gitlab\.com/.test(s)?"GitLab":/gitee\.com/.test(s)?"Gitee":null,at={GitHub:":repo/edit/:branch/:path",GitLab:":repo/-/edit/:branch/:path",Gitee:":repo/edit/:branch/:path",Bitbucket:":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"},st=({docsRepo:s,editLinkPattern:e})=>{if(e)return e;const n=Le(s);return n!==null?at[n]:null},ot=({docsRepo:s,docsBranch:e,docsDir:n,filePathRelative:u,editLinkPattern:o})=>{if(!u)return null;const g=st({docsRepo:s,editLinkPattern:o});return g?g.replace(/:repo/,G(s)?s:`https://github.com/${s}`).replace(/:branch/,e).replace(/:path/,Ie(`${Ae(n)}/${u}`)):null},rt=S({setup(s){const e=u=>{u.style.height=u.scrollHeight+"px"},n=u=>{u.style.height=""};return(u,o)=>(a(),M(_e,{name:"dropdown",onEnter:e,onAfterEnter:n,onBeforeLeave:e},{default:B(()=>[y(u.$slots,"default")]),_:3}))}}),lt=["aria-label"],it={class:"title"},ut=b("span",{class:"arrow down"},null,-1),ct=["aria-label"],dt={class:"title"},vt={class:"nav-dropdown"},ht={class:"dropdown-subtitle"},pt={key:1},ft={class:"dropdown-subitem-wrapper"},_t=S({props:{item:{type:Object,required:!0}},setup(s){const e=s,{item:n}=ve(e),u=h(()=>n.value.ariaLabel||n.value.text),o=z(!1),g=j();Oe(()=>g.path,()=>{o.value=!1});const $=r=>{r.detail===0?o.value=!o.value:o.value=!1},_=(r,l)=>l[l.length-1]===r;return(r,l)=>(a(),d("div",{class:H(["dropdown-wrapper",{open:o.value}])},[b("button",{class:"dropdown-title",type:"button","aria-label":t(u),onClick:$},[b("span",it,T(t(n).text),1),ut],8,lt),b("button",{class:"mobile-dropdown-title",type:"button","aria-label":t(u),onClick:l[0]||(l[0]=i=>o.value=!o.value)},[b("span",dt,T(t(n).text),1),b("span",{class:H(["arrow",o.value?"down":"right"])},null,2)],8,ct),C(rt,null,{default:B(()=>[Q(b("ul",vt,[(a(!0),d(D,null,A(t(n).children,(i,p)=>(a(),d("li",{key:i.link||p,class:"dropdown-item"},[i.children?(a(),d(D,{key:0},[b("h4",ht,[i.link?(a(),M(R,{key:0,item:i,onFocusout:v=>_(i,t(n).children)&&i.children.length===0&&(o.value=!1)},null,8,["item","onFocusout"])):(a(),d("span",pt,T(i.text),1))]),b("ul",ft,[(a(!0),d(D,null,A(i.children,v=>(a(),d("li",{key:v.link,class:"dropdown-subitem"},[C(R,{item:v,onFocusout:m=>_(v,i.children)&&_(i,t(n).children)&&(o.value=!1)},null,8,["item","onFocusout"])]))),128))])],64)):(a(),M(R,{key:1,item:i,onFocusout:v=>_(i,t(n).children)&&(o.value=!1)},null,8,["item","onFocusout"]))]))),128))],512),[[Z,o.value]])]),_:1})],2))}}),mt={key:0,class:"navbar-links"},ye=S({setup(s){const e=()=>{const l=me(),i=be(),p=q(),v=E();return h(()=>{var L,x;const m=Object.keys(p.value.locales);if(m.length<2)return[];const k=l.currentRoute.value.path,f=l.currentRoute.value.fullPath;return[{text:(L=v.value.selectLanguageText)!=null?L:"unkown language",ariaLabel:(x=v.value.selectLanguageAriaLabel)!=null?x:"unkown language",children:m.map(N=>{var ae,se,oe,re,le,ie;const I=(se=(ae=p.value.locales)==null?void 0:ae[N])!=null?se:{},te=(re=(oe=v.value.locales)==null?void 0:oe[N])!=null?re:{},ne=`${I.lang}`,xe=(le=te.selectLanguageName)!=null?le:ne;let W;if(ne===p.value.lang)W=f;else{const ue=k.replace(i.value,N);l.getRoutes().some(Te=>Te.path===ue)?W=ue:W=(ie=te.home)!=null?ie:N}return{text:xe,link:W}})}]})},n=()=>{const l=E(),i=h(()=>l.value.repo),p=h(()=>i.value?Le(i.value):null),v=h(()=>i.value&&!G(i.value)?`https://github.com/${i.value}`:i.value),m=h(()=>v.value?l.value.repoLabel?l.value.repoLabel:p.value===null?"Source":p.value:null);return h(()=>!v.value||!m.value?[]:[{text:m.value,link:v.value}])},u=l=>ge(l)?ke(l):l.children?V(U({},l),{children:l.children.map(u)}):l,g=(()=>{const l=E();return h(()=>(l.value.navbar||[]).map(u))})(),$=e(),_=n(),r=h(()=>[...g.value,...$.value,..._.value]);return(l,i)=>t(r).length?(a(),d("nav",mt,[(a(!0),d(D,null,A(t(r),p=>(a(),d("div",{key:p.text,class:"navbar-links-item"},[p.children?(a(),M(_t,{key:0,item:p},null,8,["item"])):(a(),M(R,{key:1,item:p},null,8,["item"]))]))),128))])):w("",!0)}}),bt=["title"],gt={class:"icon",focusable:"false",viewBox:"0 0 32 32"},kt=He('<path d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z" fill="currentColor"></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path>',9),$t=[kt],Lt={class:"icon",focusable:"false",viewBox:"0 0 32 32"},yt=b("path",{d:"M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z",fill:"currentColor"},null,-1),wt=[yt],Ct=S({setup(s){const e=E(),n=J(),u=()=>{n.value=!n.value};return(o,g)=>(a(),d("button",{class:"toggle-dark-button",title:t(e).toggleDarkMode,onClick:u},[Q((a(),d("svg",gt,$t,512)),[[Z,!t(n)]]),Q((a(),d("svg",Lt,wt,512)),[[Z,t(n)]])],8,bt))}}),xt=["title"],Tt=b("div",{class:"icon","aria-hidden":"true"},[b("span"),b("span"),b("span")],-1),St=[Tt],Mt=S({emits:["toggle"],setup(s){const e=E();return(n,u)=>(a(),d("div",{class:"toggle-sidebar-button",title:t(e).toggleSidebar,"aria-expanded":"false",role:"button",tabindex:"0",onClick:u[0]||(u[0]=o=>n.$emit("toggle"))},St,8,xt))}}),Bt=["src","alt"],Nt=S({emits:["toggle-sidebar"],setup(s){const e=be(),n=q(),u=E(),o=J(),g=z(null),$=z(null),_=h(()=>u.value.home||e.value),r=h(()=>o.value&&u.value.logoDark!==void 0?u.value.logoDark:u.value.logo),l=h(()=>n.value.title),i=z(0),p=h(()=>i.value?{maxWidth:i.value+"px"}:{}),v=h(()=>u.value.darkMode);$e(()=>{const k=719,f=m(g.value,"paddingLeft")+m(g.value,"paddingRight"),c=()=>{var L;window.innerWidth<=k?i.value=0:i.value=g.value.offsetWidth-f-(((L=$.value)==null?void 0:L.offsetWidth)||0)};c(),window.addEventListener("resize",c,!1),window.addEventListener("orientationchange",c,!1)});function m(k,f){var x,N,I;const c=(I=(N=(x=k==null?void 0:k.ownerDocument)==null?void 0:x.defaultView)==null?void 0:N.getComputedStyle(k,null))==null?void 0:I[f],L=Number.parseInt(c,10);return Number.isNaN(L)?0:L}return(k,f)=>{const c=P("ClientOnly"),L=P("RouterLink"),x=P("NavbarSearch");return a(),d("header",{ref_key:"navbar",ref:g,class:"navbar"},[C(Mt,{onToggle:f[0]||(f[0]=N=>k.$emit("toggle-sidebar"))}),b("span",{ref_key:"siteBrand",ref:$},[C(L,{to:t(_)},{default:B(()=>[C(c,null,{default:B(()=>[t(r)?(a(),d("img",{key:0,class:"logo",src:t(fe)(t(r)),alt:t(l)},null,8,Bt)):w("",!0)]),_:1}),t(l)?(a(),d("span",{key:0,class:H(["site-name",{"can-hide":t(r)}])},T(t(l)),3)):w("",!0)]),_:1},8,["to"])],512),b("div",{class:"navbar-links-wrapper",style:ze(t(p))},[y(k.$slots,"before"),C(ye,{class:"can-hide"}),y(k.$slots,"after"),t(v)?(a(),M(Ct,{key:0})):w("",!0),C(x)],4)],512)}}}),Dt={class:"page-meta"},Et={key:0,class:"meta-item edit-link"},Pt={key:1,class:"meta-item last-updated"},Rt={class:"meta-item-label"},It={class:"meta-item-info"},At={key:2,class:"meta-item contributors"},Ot={class:"meta-item-label"},Ht={class:"meta-item-info"},zt=["title"],Ft=Y(", "),Wt=S({setup(s){const e=()=>{const r=E(),l=K(),i=O();return h(()=>{var x,N,I;if(!((N=(x=i.value.editLink)!=null?x:r.value.editLink)!=null?N:!0))return null;const{repo:v,docsRepo:m=v,docsBranch:k="main",docsDir:f="",editLinkText:c}=r.value;if(!m)return null;const L=ot({docsRepo:m,docsBranch:k,docsDir:f,filePathRelative:l.value.filePathRelative,editLinkPattern:(I=i.value.editLinkPattern)!=null?I:r.value.editLinkPattern});return L?{text:c!=null?c:"Edit this page",link:L}:null})},n=()=>{q();const r=E(),l=K(),i=O();return h(()=>{var m,k,f,c;return!((k=(m=i.value.lastUpdated)!=null?m:r.value.lastUpdated)!=null?k:!0)||!((f=l.value.git)==null?void 0:f.updatedTime)?null:new Date((c=l.value.git)==null?void 0:c.updatedTime).toLocaleString()})},u=()=>{const r=E(),l=K(),i=O();return h(()=>{var v,m,k,f;return((m=(v=i.value.contributors)!=null?v:r.value.contributors)!=null?m:!0)&&(f=(k=l.value.git)==null?void 0:k.contributors)!=null?f:null})},o=E(),g=e(),$=n(),_=u();return(r,l)=>{const i=P("ClientOnly");return a(),d("footer",Dt,[t(g)?(a(),d("div",Et,[C(R,{class:"meta-item-label",item:t(g)},null,8,["item"])])):w("",!0),t($)?(a(),d("div",Pt,[b("span",Rt,T(t(o).lastUpdatedText)+": ",1),C(i,null,{default:B(()=>[b("span",It,T(t($)),1)]),_:1})])):w("",!0),t(_)&&t(_).length?(a(),d("div",At,[b("span",Ot,T(t(o).contributorsText)+": ",1),b("span",Ht,[(a(!0),d(D,null,A(t(_),(p,v)=>(a(),d(D,{key:v},[b("span",{class:"contributor",title:`email: ${p.email}`},T(p.name),9,zt),v!==t(_).length-1?(a(),d(D,{key:0},[Ft],64)):w("",!0)],64))),128))])])):w("",!0)])}}}),Ut={key:0,class:"page-nav"},Vt={class:"inner"},jt={key:0,class:"prev"},Gt={key:1,class:"next"},qt=S({setup(s){const e=r=>r===!1?null:ge(r)?ke(r):Fe(r)?r:!1,n=(r,l,i)=>{const p=r.findIndex(v=>v.link===l);if(p!==-1){const v=r[p+i];return(v==null?void 0:v.link)?v:null}for(const v of r)if(v.children){const m=n(v.children,l,i);if(m)return m}return null},u=O(),o=ee(),g=j(),$=h(()=>{const r=e(u.value.prev);return r!==!1?r:n(o.value,g.path,-1)}),_=h(()=>{const r=e(u.value.next);return r!==!1?r:n(o.value,g.path,1)});return(r,l)=>t($)||t(_)?(a(),d("nav",Ut,[b("p",Vt,[t($)?(a(),d("span",jt,[C(R,{item:t($)},null,8,["item"])])):w("",!0),t(_)?(a(),d("span",Gt,[C(R,{item:t(_)},null,8,["item"])])):w("",!0)])])):w("",!0)}}),Kt={class:"page"},Xt={class:"theme-default-content"},Yt=S({setup(s){return(e,n)=>{const u=P("Content");return a(),d("main",Kt,[y(e.$slots,"top"),b("div",Xt,[C(u)]),C(Wt),C(qt),y(e.$slots,"bottom")])}}}),we=s=>decodeURI(s).replace(/#.*$/,"").replace(/(index)?\.(md|html)$/,""),Jt=(s,e)=>{if(e===void 0)return!1;if(s.hash===e)return!0;const n=we(s.path),u=we(e);return n===u},Ce=(s,e)=>Jt(s,e.link)?!0:e.children?e.children.some(n=>Ce(s,n)):!1,Qt=(s,e)=>s.link?F(R,V(U({},e),{item:s})):F("p",e,s.text),Zt=(s,e)=>{var n;return((n=s.children)===null||n===void 0?void 0:n.length)?F("ul",{class:{"sidebar-sub-items":e>0}},s.children.map(u=>F("li",F(X,{item:u,depth:e+1})))):null},X=({item:s,depth:e=0})=>{const n=j(),u=Ce(n,s);return[Qt(s,{class:{"sidebar-heading":e===0,"sidebar-item":!0,active:u}}),Zt(s,e)]};X.displayName="SidebarChild";X.props={item:{type:Object,required:!0},depth:{type:Number,required:!1}};const en={class:"sidebar"},tn={class:"sidebar-links"},nn=S({setup(s){const e=ee();return(n,u)=>(a(),d("aside",en,[C(ye),y(n.$slots,"top"),b("ul",tn,[(a(!0),d(D,null,A(t(e),o=>(a(),M(t(X),{key:o.link||o.text,item:o},null,8,["item"]))),128))]),y(n.$slots,"bottom")]))}}),on=S({setup(s){const e=K(),n=O(),u=E(),o=h(()=>n.value.navbar!==!1&&u.value.navbar!==!1),g=ee(),$=z(!1),_=c=>{$.value=typeof c=="boolean"?c:!$.value},r={x:0,y:0},l=c=>{r.x=c.changedTouches[0].clientX,r.y=c.changedTouches[0].clientY},i=c=>{const L=c.changedTouches[0].clientX-r.x,x=c.changedTouches[0].clientY-r.y;Math.abs(L)>Math.abs(x)&&Math.abs(L)>40&&(L>0&&r.x<=80?_(!0):_(!1))},p=h(()=>[{"no-navbar":!o.value,"no-sidebar":!g.value.length,"sidebar-open":$.value},n.value.pageClass]);let v;$e(()=>{v=me().afterEach(()=>{_(!1)})}),We(()=>{v()});const m=Ue(),k=m.resolve,f=m.pending;return(c,L)=>(a(),d("div",{class:H(["theme-container",t(p)]),onTouchstart:l,onTouchend:i},[y(c.$slots,"navbar",{},()=>[t(o)?(a(),M(Nt,{key:0,onToggleSidebar:_},{before:B(()=>[y(c.$slots,"navbar-before")]),after:B(()=>[y(c.$slots,"navbar-after")]),_:3})):w("",!0)]),b("div",{class:"sidebar-mask",onClick:L[0]||(L[0]=x=>_(!1))}),y(c.$slots,"sidebar",{},()=>[C(nn,null,{top:B(()=>[y(c.$slots,"sidebar-top")]),bottom:B(()=>[y(c.$slots,"sidebar-bottom")]),_:3})]),y(c.$slots,"page",{},()=>[t(n).home?(a(),M(nt,{key:0})):(a(),M(_e,{key:1,name:"fade-slide-y",mode:"out-in",onBeforeEnter:t(k),onBeforeLeave:t(f)},{default:B(()=>[(a(),M(Yt,{key:t(e).path},{top:B(()=>[y(c.$slots,"page-top")]),bottom:B(()=>[y(c.$slots,"page-bottom")]),_:3}))]),_:3},8,["onBeforeEnter","onBeforeLeave"]))])],34))}});export{on as default};
