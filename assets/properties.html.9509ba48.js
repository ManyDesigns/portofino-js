import{c as n}from"./app.48a1f12a.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},t=n(`<h1 id="attributi" tabindex="-1"><a class="header-anchor" href="#attributi" aria-hidden="true">#</a> Attributi</h1><p>Un&#39;altra funzionalit\xE0 distintiva di portofino \xE8 la gestione quasi automatica degli attributi delle entit\xE0. Per poter sfruttare questa caratteristica la CrudAction espone alcuni metodi per poter ottenere i dati che Portofino ci espone, i nomi sono autoesplicativi.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>properties<span class="token operator">:</span> EntityProperty<span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token function">getProperties</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> EntityProperty

<span class="token function">getSummaryProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> EntityProperty<span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token function">getInsertableProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> EntityProperty<span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token function">getUpdatableProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> EntityProperty<span class="token punctuation">[</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">EntityProperty</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  label<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  type<span class="token operator">:</span> Type<span class="token punctuation">;</span>
  enabled<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  insertable<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  updatable<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  inSummary<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  searchable<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  annotations<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div>`,4);function p(e,o){return t}var i=s(a,[["render",p]]);export{i as default};
