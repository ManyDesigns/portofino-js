import{c as e}from"./app.48a1f12a.js";import{_ as t}from"./plugin-vue_export-helper.21dcd24c.js";const a={},n=e(`<h1 id="entita-di-una-crud-action" tabindex="-1"><a class="header-anchor" href="#entita-di-una-crud-action" aria-hidden="true">#</a> Entit\xE0 di una CRUD Action</h1><p>La CrudAction ritorna le entit\xE0 wrappate in un oggetto di tipo <code>CrudActionEntity</code>. Oltre ai metodi di update e delete che sono stati documentati sotto i metodi della CrudAction la classe espone altri metodi di utilit\xE0.</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>Possiamo accedere a tutti gli attributi dell&#39;entit\xE0 come se fossero attributi, per esempio <code>kitten.getValue(&#39;name&#39;)</code> \xE8 equivalente a <code>kitten.name</code></p></div><h2 id="getvalue-e-getdisplayvalue" tabindex="-1"><a class="header-anchor" href="#getvalue-e-getdisplayvalue" aria-hidden="true">#</a> getValue e getDisplayValue</h2><p>Il metodo getValue ritorna il valore raw dell&#39;attributo, mentre il metodo getDisplayValue il valore formattato da Portofino.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>user<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token string">&#39;created_at&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// =&gt; Date Tue Dec 21 2021 11:36:54 GMT+0100 (CET)</span>

user<span class="token punctuation">.</span><span class="token function">getDisplayValue</span><span class="token punctuation">(</span><span class="token string">&#39;created_at&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// =&gt; &quot;2021-12-21 11:36:54&quot;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Il metodo getValue ritorna <code>any</code>, mentre getDisplayValue ritorna sempre uno <code>string</code></p><h2 id="toobject" tabindex="-1"><a class="header-anchor" href="#toobject" aria-hidden="true">#</a> toObject</h2><p>Il metodo <code>toObject: () =&gt; Record&lt;string, any&gt;</code> ritorna un oggetto contenente i valori raw dell&#39;entit\xE0. Se la entity deriva da una search e non da una get i campi non presenti nel summary saranno <code>null</code></p><h2 id="tostring" tabindex="-1"><a class="header-anchor" href="#tostring" aria-hidden="true">#</a> toString</h2><p>Come il toObject, ma ritorna un oggetto JSON non formattato.</p>`,11);function s(o,i){return n}var l=t(a,[["render",s]]);export{l as default};
