import{o as n,c as a,a as s}from"./app.e46d0b20.js";const o='{"title":"Portofino connect","description":"","frontmatter":{},"headers":[{"level":2,"title":"url","slug":"url"},{"level":2,"title":"axiosInstance","slug":"axiosinstance"},{"level":2,"title":"enableAuth","slug":"enableauth"},{"level":2,"title":"authAction","slug":"authaction"},{"level":2,"title":"crudActionClasses","slug":"crudactionclasses"}],"relativePath":"config.md","lastUpdated":1614894464988}',t={},e=s('<h1 id="portofino-connect"><a class="header-anchor" href="#portofino-connect" aria-hidden="true">#</a> Portofino connect</h1><p>TL;DR: Ecco la definizione dell&#39;intefaccia typescript.</p><div class="language-ts"><pre><code><span class="token keyword">interface</span> <span class="token class-name">PortofinoConfig</span> <span class="token punctuation">{</span>\n  url<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n  axiosInstance<span class="token operator">?</span><span class="token operator">:</span> AxiosInstance<span class="token punctuation">;</span>\n\n  enableAuth<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>\n  authAction<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n\n  crudActionClasses<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h2 id="url"><a class="header-anchor" href="#url" aria-hidden="true">#</a> url</h2><ul><li>Type: <code>string</code></li><li>Default: <code>/api</code></li></ul><p>L&#39;url su cui il frontend proverà a contattare il backend. Se il frontend non gira sull&#39;istanza di portofino allora dovrai specificare l&#39;indirizzo su sui sono esposte le API.</p><div class="language-js"><pre><code>Portofino<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    url<span class="token operator">:</span> <span class="token string">&#39;http://awesome.manydesigns.com/api&#39;</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><h2 id="axiosinstance"><a class="header-anchor" href="#axiosinstance" aria-hidden="true">#</a> axiosInstance</h2><ul><li>Type: <code>AxiosInstance</code></li><li>Default: <code>undefined</code></li></ul><p>L&#39;attributo <code>axiosInstance</code> sostituisce l&#39;istanza di axios usata da Portofino JS. Di base ne viene creata una nuova, ma se non si utilizza un sistema di autenticazione esterno, come con nuxt, è possibile utilizzare un&#39;istanza custom.</p><div class="language-js"><pre><code><span class="token comment">// ES: Plugin per nuxt js</span>\n<span class="token keyword">import</span> Portofino <span class="token keyword">from</span> <span class="token string">&quot;@manydesigns/portofino&quot;</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  Portofino<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    axiosInstance<span class="token operator">:</span> context<span class="token punctuation">.</span>$axios\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h2 id="enableauth"><a class="header-anchor" href="#enableauth" aria-hidden="true">#</a> enableAuth</h2><ul><li>Type: <code>boolean</code></li><li>Default: <code>true</code></li></ul><p>Qualora si utilizzasse un servizio di autenticazione diverso da quello offerto di default da Portofino è possibile disabilitare il servizio di autenticazione impostando <code>enableAuth</code> a <code>false</code>.</p><div class="language-js"><pre><code>Portofino<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token operator">...</span>\n  enableAuth<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><h2 id="authaction"><a class="header-anchor" href="#authaction" aria-hidden="true">#</a> authAction</h2><ul><li>Type: <code>string</code></li><li>Default: <code>login</code></li></ul><p>Di default la <code>LoginAction</code> si trova sotto la action <code>login</code>, se non fosse così con questo parametro si puo specificare un&#39;altra action.</p><div class="language-js"><pre><code>Portofino<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token operator">...</span>\n  authAction<span class="token operator">:</span> <span class="token string">&#39;auth&#39;</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><h2 id="crudactionclasses"><a class="header-anchor" href="#crudactionclasses" aria-hidden="true">#</a> crudActionClasses</h2><ul><li>Type: <code>string[]</code></li><li>Default: <code>[]</code></li></ul><p>Portofino non consente di riconoscere una CrudAction se questa è stata estesa da una classe di utilità. Per ovviare a questo problema, è possibile passare la lista delle nostre classi di utils che estendono la CrudAction di Portofino.</p><div class="language-js"><pre><code>Portofino<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token operator">...</span>\n  crudActionClasses<span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token string">&quot;com.manydesigns.crud.LogCrudAction&quot;</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div>',23);t.render=function(s,o,t,p,c,i){return n(),a("div",null,[e])};export default t;export{o as __pageData};
