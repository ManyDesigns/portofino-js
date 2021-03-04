import{o as n,c as a,a as s}from"./app.e46d0b20.js";const t='{"title":"Operazioni CRUD","description":"","frontmatter":{},"headers":[{"level":2,"title":"Lista delle entità","slug":"lista-delle-entita"},{"level":3,"title":"Paginazione","slug":"paginazione"},{"level":3,"title":"Ordinamento","slug":"ordinamento"},{"level":3,"title":"Filtro","slug":"filtro"},{"level":2,"title":"Ottenere una entità dal suo id","slug":"ottenere-una-entita-dal-suo-id"},{"level":2,"title":"Eliminazione di una entità","slug":"eliminazione-di-una-entita"},{"level":2,"title":"Creazione di una entità","slug":"creazione-di-una-entita"}],"relativePath":"actions/crud-action/crud.md","lastUpdated":1614894464988}',e={},o=s('<h1 id="operazioni-crud"><a class="header-anchor" href="#operazioni-crud" aria-hidden="true">#</a> Operazioni CRUD</h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>In tutti i metodi CRUD consentono di passare, come ultimo parametro, un oggetto <code>AxiosConfig</code> per modificare il comportamento della chiamata.</p></div><h2 id="lista-delle-entita"><a class="header-anchor" href="#lista-delle-entita" aria-hidden="true">#</a> Lista delle entità</h2><p>Il metodo per ottenere l&#39;elenco delle entità è paginato di default e se non vengono specificate opzioni di default ritorna la prima pagina.</p><div class="language-JavaScript"><pre><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">getKittens</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> kittenAction <span class="token operator">=</span> <span class="token keyword">await</span> Portofino<span class="token punctuation">.</span><span class="token function">getAction</span><span class="token punctuation">(</span><span class="token string">&#39;kitten&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">return</span> <span class="token keyword">await</span> kittenAction<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h3 id="paginazione"><a class="header-anchor" href="#paginazione" aria-hidden="true">#</a> Paginazione</h3><p>È possibile sfruttare la paginazione di Portofino grazie a tre parametri che possiamo passare nell’oggetto di configurazione della chiamata search.</p><ul><li><code>pagination</code> (boolean) il valore di default è true, se impostato a false non passa il parametro maxResult a Portofino, di conseguenza disabilita la paginazione</li><li><code>page</code> (number) il valore di default è 0, serve per indicare la pagina che vogliamo ottenere</li><li><code>pageSize</code> (number) il valore di default è 10, indica il numero di elementi ritornati per ogni pagina</li></ul><div class="language-JavaScript"><div class="highlight-lines"><br><br><br><div class="highlighted"> </div><div class="highlighted"> </div><br><br><br></div><pre><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">getKittens</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> kittenAction <span class="token operator">=</span> <span class="token keyword">await</span> Portofino<span class="token punctuation">.</span><span class="token function">getAction</span><span class="token punctuation">(</span><span class="token string">&#39;kitten&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">return</span> <span class="token keyword">await</span> kittenAction<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      page<span class="token operator">:</span> pagination<span class="token punctuation">.</span>current<span class="token punctuation">,</span>\n      pageSize<span class="token operator">:</span> pagination<span class="token punctuation">.</span>pageSize<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h3 id="ordinamento"><a class="header-anchor" href="#ordinamento" aria-hidden="true">#</a> Ordinamento</h3><p>Il parametro <code>sort</code> ci consente di impostare il parametro e la direzione di ordinamento delle entità ritornate dalla search, il parametro deve contenere un oggetto con due attributi:</p><ul><li><strong>property</strong>: Una stringa rappresentante il nome della proprietà che vogliamo ordinare.</li><li><strong>direction</strong>: Una stringa che può assumere i valori <code>asc</code> per ordinare in maniera ascendente e <code>desc</code> per ordinare in maniera discendente.</li></ul><div class="language-JavaScript"><pre><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">getKittens</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> kittenAction <span class="token operator">=</span> <span class="token keyword">await</span> Portofino<span class="token punctuation">.</span><span class="token function">getAction</span><span class="token punctuation">(</span>‘kitten’<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">return</span> <span class="token keyword">await</span> kittenAction<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      sort<span class="token operator">:</span> <span class="token punctuation">{</span>\n        property<span class="token operator">:</span> ‘name’<span class="token punctuation">,</span>\n        direction<span class="token operator">:</span> ‘asc’<span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h3 id="filtro"><a class="header-anchor" href="#filtro" aria-hidden="true">#</a> Filtro</h3><p>Infine possiamo filtrare il nostro elenco di entità grazie al parametro <code>filters</code>. Questo parametro si aspetta una mappa dove la chiave è il nome del parametro che vogliamo filtrare e il valore può essere una stringa, se vogliamo trovare i valori uguali a quello inserito oppure un oggetto se vogliamo dei filtri più avanzati.</p><p>Al momento i filtri avanzati che possiamo utilizzare sono:</p><ul><li><p><strong>su un elenco di valori</strong>: Se passiamo una lista, se il valore della proprietà della nostra entità è inclusa nella lista, allora viene accettata.</p></li><li><p><strong>range di valori</strong>: se passiamo un oggetto con attributi <code>min</code> e <code>max</code> allora verranno restituite solo le entità il cui attributo rientra in quell’intervallo di valori.</p></li></ul><p>Altre tipologie di filtri più avanzate verranno aggiunte nei prossimi rilasci.</p><h2 id="ottenere-una-entita-dal-suo-id"><a class="header-anchor" href="#ottenere-una-entita-dal-suo-id" aria-hidden="true">#</a> Ottenere una entità dal suo id</h2><p>Questa chiamata ritorna una <a href="./entities.html">CrudActionEntity</a> che rappresenta i dati della action e alcune operazioni su</p><div class="language-JavaScript"><pre><code><span class="token keyword">const</span> entity <span class="token operator">=</span> <span class="token keyword">await</span> action<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>entityID<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><h2 id="eliminazione-di-una-entita"><a class="header-anchor" href="#eliminazione-di-una-entita" aria-hidden="true">#</a> Eliminazione di una entità</h2><div class="language-JavaScript"><pre><code>doggoAction<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>entityID<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><h2 id="creazione-di-una-entita"><a class="header-anchor" href="#creazione-di-una-entita" aria-hidden="true">#</a> Creazione di una entità</h2><div class="language-JavaScript"><div class="highlight-lines"><br><br><br><br><br><div class="highlighted"> </div><br></div><pre><code><span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>\n  email<span class="token operator">:</span> <span class="token string">&#39;user@manydesigns.com&#39;</span><span class="token punctuation">,</span>\n  username<span class="token operator">:</span> <span class="token string">&#39;John&#39;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">userAction</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div>',25);e.render=function(s,t,e,i,p,c){return n(),a("div",null,[o])};export default e;export{t as __pageData};
