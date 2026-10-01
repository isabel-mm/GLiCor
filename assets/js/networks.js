// Explorador de la red de relaciones: un término en el centro y, alrededor, los términos
// relacionados en su ficha (línea continua) y las fichas que lo mencionan (discontinua).
// Todo sale de la sección «Relación con otros términos» de entries.json.

const QUICK = ['corpus_linguistics', 'corpus', 'annotation', 'frequency', 'collocation', 'concordance', 'parallel_corpus', 'lemmatisation'];
const DEFAULT_CENTER = 'corpus_linguistics';   // punto de partida si la URL no indica un término
const MAX_IN = 14;   // fichas que lo mencionan que se dibujan como máximo; el resto va al panel
// Enlaces de las antiguas redes hechas a mano
const LEGACY_HASH = { frequencies: 'frequency', corpora: 'corpus' };
const CATEGORY_CLASS = {
  'Metodología y diseño': 'cat-met',
  'Estadística y léxico': 'cat-est',
  'Procesamiento lingüístico': 'cat-proc',
  'Tecnología y formatos': 'cat-tec',
  'Recursos y corpus': 'cat-cor',
  'Herramientas y software': 'cat-her',
  'Anotación y procesamiento lingüístico': 'cat-her',
  'Estándares y formatos técnicos': 'cat-std',
};
// Colores de la leyenda (términos y los tres tipos de recurso)
const CATEGORY_COLORS = {
  'Metodología y diseño': 'var(--c-met)',
  'Estadística y léxico': 'var(--c-est)',
  'Procesamiento lingüístico': 'var(--c-proc)',
  'Tecnología y formatos': 'var(--c-tec)',
  'Recursos y corpus': 'var(--c-cor)',
  'Herramientas y software': 'var(--c-her)',
  'Estándares y formatos técnicos': 'var(--c-std)',
};
const COLOR_OF_CLASS = { 'cat-met': 'var(--c-met)', 'cat-est': 'var(--c-est)', 'cat-proc': 'var(--c-proc)', 'cat-tec': 'var(--c-tec)',
  'cat-cor': 'var(--c-cor)', 'cat-her': 'var(--c-her)', 'cat-std': 'var(--c-std)' };
const T = {
  es: {
    search: 'Buscar término o recurso…', open: 'Abrir ficha ↗', relations: 'Se relaciona con', mentioned: 'También la mencionan',
    more: n => `y ${n} más`, hint: 'Pasa el ratón por un nodo o una conexión para ver la relación.',
    trail: 'Recorrido:', legendOut: 'relación de la ficha', legendIn: 'la mencionan otras fichas', legendRes: 'Recursos',
    error: 'No se pudo cargar la red.',
    download: 'Descargar la imagen:', title: 'Red de relaciones entre términos',
  },
  en: {
    search: 'Search term or resource…', open: 'Open entry ↗', relations: 'Relates to', mentioned: 'Also mentioned by',
    more: n => `and ${n} more`, hint: 'Hover over a node or a connection to see the relation.',
    trail: 'Path:', legendOut: 'relation in the entry', legendIn: 'mentioned by other entries', legendRes: 'Resources',
    error: 'The network could not be loaded.',
    download: 'Download image:', title: 'Term relations network',
  },
};

let networkLang = localStorage.getItem('glicor-lang') || 'es';
let BY_SLUG = {};
let OUT = {};      // slug → [{ to, text: { en, es } }]
let IN = {};       // slug → [{ from, text: { en, es } }]
let center = null;
let trail = [];

const $ = id => document.getElementById(id);
const nameKey = s => String(s).toLowerCase().replace(/[^a-z0-9áéíóúüñ]+/g, '_').replace(/^_+|_+$/g, '');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const label = slug => { const e = BY_SLUG[slug]; return e ? (networkLang === 'es' ? e.term_es : e.term_en) : slug; };
const catClass = e => CATEGORY_CLASS[e.category] || (e.type === 'entity' ? 'cat-cor' : '');
const color = slug => COLOR_OF_CLASS[catClass(BY_SLUG[slug])] || '#94a3b8';
const category = slug => { const e = BY_SLUG[slug]; return networkLang === 'es' ? e.category : e.category_en; };

function buildGraph(entries) {
  const index = {};
  const add = (name, slug) => { const k = nameKey(name); if (k && !(k in index)) index[k] = slug; };
  entries.forEach(e => { add(e.slug, e.slug); add(e.term_en, e.slug); add(e.term_es, e.slug); });
  entries.forEach(e => Object.values(e.forms || {}).flat().forEach(f => add(f.form, e.slug)));

  entries.forEach(e => { BY_SLUG[e.slug] = e; OUT[e.slug] = []; IN[e.slug] = []; });
  entries.forEach(e => {
    const section = (e.html.split(/<h3[^>]*>Relación con otros términos.*?<\/h3>/)[1] || '').split('<h3')[0];
    const seen = new Set([e.slug]);
    // relations_es va en el mismo orden que la lista inglesa de la ficha
    [...section.matchAll(/<li><strong>(.*?)<\/strong>\s*—?\s*([\s\S]*?)<\/li>/g)].forEach(([, name, text], i) => {
      const to = index[nameKey(name)];
      if (!to || seen.has(to)) return;
      seen.add(to);
      const en = text.replace(/<[^>]+>/g, '').trim();
      const rel = { en, es: (e.relations_es || [])[i] || en };
      OUT[e.slug].push({ to, text: rel });
      IN[to].push({ from: e.slug, text: rel });
    });
  });
}

function definition(slug) {
  const html = BY_SLUG[slug].html;
  const m = networkLang === 'es'
    ? html.match(/<h3[^>]*>Definición \(ES\)<\/h3>([\s\S]*?)(?=<h3)/)
    : html.match(/<h3[^>]*>Definition \(EN\)<\/h3>([\s\S]*?)(?=<h3)/);
  const text = m ? m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
  return text.length > 280 ? text.slice(0, 277).replace(/\s+\S*$/, '') + '…' : text;
}

// Anchura aproximada de una etiqueta para dibujar su caja
const textWidth = (s, size) => s.length * size * 0.56 + 26;

function layout() {
  const cx = 600, cy = 340;
  const out = OUT[center].map(r => r.to);
  const outSet = new Set(out);
  const inAll = IN[center].map(r => r.from).filter(s => !outSet.has(s));
  // Entre las que lo mencionan, primero las más conectadas
  inAll.sort((a, b) => (OUT[b].length + IN[b].length) - (OUT[a].length + IN[a].length));
  const incoming = inAll.slice(0, MAX_IN);

  const ring = (list, rx, ry, offset) => list.map((slug, i) => {
    const angle = -Math.PI / 2 + offset + (i / list.length) * Math.PI * 2;
    return { slug, x: cx + rx * Math.cos(angle), y: cy + ry * Math.sin(angle) };
  });
  return {
    cx, cy,
    out: ring(out, 280, 175, 0),
    incoming: ring(incoming, 480, 290, Math.PI / Math.max(incoming.length, 1)),
    hiddenIn: inAll.length - incoming.length,
  };
}

function nodeSvg(slug, x, y, cls) {
  const size = cls === 'center' ? 18 : cls === 'in' ? 12.5 : 14;
  const text = label(slug);
  const w = textWidth(text, size) + (cls === 'center' ? 16 : 0), h = cls === 'center' ? 50 : cls === 'in' ? 32 : 38;
  const stroke = cls === 'center' ? '' : `stroke="${color(slug)}"`;
  return `<g class="node ${cls}" data-slug="${slug}" tabindex="${cls === 'center' ? -1 : 0}" role="button" aria-label="${esc(text)}">
    <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" ${stroke}></rect>
    <text x="${x}" y="${y}">${esc(text)}</text></g>`;
}

function render() {
  const L = layout();
  const svg = $('graph');
  const edges = [
    ...L.incoming.map(n => `<line class="edge in" data-slug="${n.slug}" x1="${L.cx}" y1="${L.cy}" x2="${n.x}" y2="${n.y}"></line>`),
    ...L.out.map(n => `<line class="edge" data-slug="${n.slug}" x1="${L.cx}" y1="${L.cy}" x2="${n.x}" y2="${n.y}"></line>`),
  ].join('');
  const nodes = [
    ...L.incoming.map(n => nodeSvg(n.slug, n.x, n.y, 'in')),
    ...L.out.map(n => nodeSvg(n.slug, n.x, n.y, 'out')),
    nodeSvg(center, L.cx, L.cy, 'center'),
  ].join('');
  svg.innerHTML = `<g class="fade" style="transform-origin: ${L.cx}px ${L.cy}px">${edges}${nodes}</g>`;
  svg.setAttribute('aria-label', label(center));

  svg.querySelectorAll('.node:not(.center)').forEach(node => {
    node.addEventListener('click', () => go(node.dataset.slug));
    node.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); go(node.dataset.slug); } });
    node.addEventListener('mouseenter', () => highlight(node.dataset.slug));
    node.addEventListener('focus', () => highlight(node.dataset.slug));
    node.addEventListener('mouseleave', () => highlight(null));
  });
  svg.querySelectorAll('.edge').forEach(edge => {
    edge.addEventListener('mouseenter', () => highlight(edge.dataset.slug));
    edge.addEventListener('mouseleave', () => highlight(null));
  });

  renderSide(L.hiddenIn);
  renderTrail();
  renderLegend();
  highlight(null);
}

function relationText(slug) {
  const out = OUT[center].find(r => r.to === slug);
  if (out) return { from: center, to: slug, text: out.text };
  const inc = IN[center].find(r => r.from === slug);
  return inc ? { from: slug, to: center, text: inc.text } : null;
}

function highlight(slug) {
  document.querySelectorAll('.network-layout .hot').forEach(el => el.classList.remove('hot'));
  const caption = $('network-caption');
  if (!slug) { caption.innerHTML = `<span class="hint">${T[networkLang].hint}</span>`; return; }
  document.querySelectorAll(`.network-layout [data-slug="${slug}"]`).forEach(el => el.classList.add('hot'));
  const rel = relationText(slug);
  caption.innerHTML = rel ? `<strong>${esc(label(rel.from))} → ${esc(label(rel.to))}</strong><br>${esc(rel.text[networkLang])}` : '';
}

function renderSide(hiddenIn) {
  const t = T[networkLang], e = BY_SLUG[center];
  const other = networkLang === 'es' ? e.term_en : e.term_es;
  const page = e.type === 'entity' ? 'recursos.html' : 'index.html';
  const outSet = new Set(OUT[center].map(r => r.to));
  const incoming = IN[center].filter(r => !outSet.has(r.from));
  $('network-side').innerHTML = `
    <span class="cat-badge ${catClass(e)}">${esc(category(center))}</span>
    <h2><span class="br">[</span>${esc(label(center))}<span class="br">]</span></h2>
    <p class="equiv">${other && other !== label(center) ? esc(other) : ''}</p>
    <p class="def">${esc(definition(center))}</p>
    <a class="open-entry" href="${page}#${encodeURIComponent(center)}">${t.open}</a>
    ${OUT[center].length ? `<h3>${t.relations} (${OUT[center].length})</h3>
    <ul class="rel-list">${OUT[center].map(r => `<li data-slug="${r.to}"><b>${esc(label(r.to))}</b>${esc(r.text[networkLang])}</li>`).join('')}</ul>` : ''}
    ${incoming.length ? `<h3>${t.mentioned} (${incoming.length})</h3>
    <div class="chips">${incoming.map(r => `<button type="button" data-go="${r.from}">${esc(label(r.from))}</button>`).join('')}</div>
    ${hiddenIn > 0 ? `<p class="more">${t.more(hiddenIn)}</p>` : ''}` : ''}
  `;
  document.querySelectorAll('.rel-list li').forEach(li => {
    li.addEventListener('click', () => go(li.dataset.slug));
    li.addEventListener('mouseenter', () => highlight(li.dataset.slug));
    li.addEventListener('mouseleave', () => highlight(null));
  });
  document.querySelectorAll('#network-side [data-go]').forEach(b => b.addEventListener('click', () => go(b.dataset.go)));
}

function renderTrail() {
  $('network-trail').innerHTML = `<span>${T[networkLang].trail}</span> ` + trail.map((slug, i) => i === trail.length - 1
    ? `<span class="current">${esc(label(slug))}</span>`
    : `<button type="button" data-i="${i}">${esc(label(slug))}</button><span class="sep">›</span>`).join(' ');
  document.querySelectorAll('#network-trail button').forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.i;
    const slug = trail[i];
    trail = trail.slice(0, i);
    go(slug);
  }));
}

function renderLegend() {
  const t = T[networkLang];
  const cats = Object.entries(CATEGORY_COLORS).map(([es, c]) => {
    const sample = Object.values(BY_SLUG).find(e => e.category === es);
    return `<span><i style="background:${c}"></i>${esc(networkLang === 'es' ? es : (sample ? sample.category_en : es))}</span>`;
  }).join('');
  $('network-legend').innerHTML = cats
    + `<span><i class="line"></i>${t.legendOut}</span><span><i class="line dash"></i>${t.legendIn}</span>`;
}

function go(slug) {
  if (!BY_SLUG[slug]) return;
  center = slug;
  const existing = trail.indexOf(slug);
  trail = existing >= 0 ? trail.slice(0, existing + 1) : [...trail, slug].slice(-8);
  history.replaceState(null, '', '#' + slug);
  render();
}

function fillSearch() {
  $('network-term-list').innerHTML = Object.values(BY_SLUG)
    .map(e => networkLang === 'es' ? e.term_es : e.term_en)
    .sort((a, b) => a.localeCompare(b, networkLang))
    .map(n => `<option value="${esc(n)}">`).join('');
  $('network-quick').innerHTML = QUICK.filter(s => BY_SLUG[s])
    .map(s => `<button type="button" data-go="${s}">${esc(label(s))}</button>`).join('');
  document.querySelectorAll('#network-quick [data-go]').forEach(b => b.addEventListener('click', () => { trail = []; go(b.dataset.go); }));
}

function applyNetworkLang() {
  document.documentElement.lang = networkLang;
  document.querySelectorAll('[data-es][data-en]').forEach(el => {
    if (!el.closest('.navbar')) el.textContent = el.dataset[networkLang];
  });
  $('network-search').placeholder = T[networkLang].search;
  if (window.syncNavbar) window.syncNavbar(networkLang);
  if (!Object.keys(BY_SLUG).length) return;
  renderTools();
  fillSearch();
  if (center) render();
}

// ── Descarga de la imagen de la red (PNG y SVG) ──
// La imagen descargada no ve el CSS de la página: se copian a cada elemento sus
// estilos calculados y se añaden título, leyenda y referencia.
const EXPORT_PROPS = ['fill', 'stroke', 'stroke-width', 'stroke-dasharray', 'stroke-opacity', 'opacity',
  'font-family', 'font-size', 'font-weight', 'letter-spacing', 'text-anchor', 'dominant-baseline'];

function exportSvg() {
  highlight(null);
  const src = $('graph');
  const clone = src.cloneNode(true);
  const from = [...src.querySelectorAll('*')], to = [...clone.querySelectorAll('*')];
  from.forEach((el, i) => {
    const cs = getComputedStyle(el);
    to[i].setAttribute('style', EXPORT_PROPS.map(p => `${p}:${cs.getPropertyValue(p)}`).join(';'));
    to[i].removeAttribute('class');
    ['tabindex', 'role', 'data-slug'].forEach(a => to[i].removeAttribute(a));
  });
  const root = getComputedStyle(document.documentElement);
  const t = T[networkLang];
  const legend = Object.entries(CATEGORY_COLORS).map(([es, c]) => {
    const sample = Object.values(BY_SLUG).find(e => e.category === es);
    return [networkLang === 'es' ? es : (sample ? sample.category_en : es), root.getPropertyValue(c.slice(4, -1)).trim()];
  });
  // La leyenda pasa a una segunda fila si no cabe en una
  let x = 40, y = 744;
  const legendSvg = legend.map(([name, col]) => {
    const w = 32 + name.length * 7.6;
    if (x + w > 1160) { x = 40; y += 20; }
    const item = `<circle cx="${x + 6}" cy="${y}" r="6" fill="${col}"/><text x="${x + 18}" y="${y + 5}" font-family="Avenir Next, Helvetica, Arial, sans-serif" font-size="14" fill="#475569">${esc(name)}</text>`;
    x += w;
    return item;
  }).join('');
  const url = location.href.split('#')[0] + '#' + center;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <rect width="1200" height="800" fill="#ffffff"/>
  <text x="40" y="44" font-family="'JetBrains Mono', Menlo, monospace" font-size="24" font-weight="800" fill="#1e1b4b" letter-spacing="-0.5">[${esc(label(center))}]</text>
  <text x="40" y="68" font-family="Avenir Next, Helvetica, Arial, sans-serif" font-size="14" fill="#64748b">${esc(t.title)}</text>
  <g transform="translate(26 74) scale(0.956)">${clone.innerHTML}</g>
  <line x1="40" y1="725" x2="1160" y2="725" stroke="#e2e8f0"/>
  ${legendSvg}
  <text x="40" y="792" font-family="Avenir Next, Helvetica, Arial, sans-serif" font-size="12" fill="#94a3b8">GLiCor: Glosario de Lingüística de Corpus · Isabel Moyano Moreno, Universidad de Cádiz · ${esc(url)}</text>
</svg>`;
}

function saveBlob(blob, name) {
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: name });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function downloadImage(format) {
  const svg = exportSvg();
  const name = `glicor_red_${center}.${format}`;
  if (format === 'svg') { saveBlob(new Blob([svg], { type: 'image/svg+xml' }), name); return; }
  const img = new Image();
  img.onload = () => {
    const scale = 2;   // PNG a doble resolución, para diapositivas y documentos
    const canvas = Object.assign(document.createElement('canvas'), { width: 1200 * scale, height: 800 * scale });
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0, 1200, 800);
    canvas.toBlob(blob => saveBlob(blob, name), 'image/png');
  };
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function renderTools() {
  $('network-tools').innerHTML = `<span>${T[networkLang].download}</span>
    <button type="button" data-img="png">PNG</button><button type="button" data-img="svg">SVG</button>`;
  document.querySelectorAll('#network-tools [data-img]').forEach(b => b.addEventListener('click', () => downloadImage(b.dataset.img)));
}

// La navbar llama a toggleLang al pulsar ES/EN
function toggleLang() {
  networkLang = networkLang === 'es' ? 'en' : 'es';
  localStorage.setItem('glicor-lang', networkLang);
  applyNetworkLang();
}

$('network-search').addEventListener('change', ev => {
  const k = nameKey(ev.target.value);
  const hit = Object.values(BY_SLUG).find(e => nameKey(e.term_es) === k || nameKey(e.term_en) === k || e.slug === k);
  if (hit) { trail = []; go(hit.slug); ev.target.value = ''; ev.target.blur(); }
});

applyNetworkLang();

// Con marca de tiempo, como glossary.js: si no, el navegador puede servir un entries.json antiguo
fetch('assets/data/entries.json?v=' + Date.now())
  .then(r => r.json())
  .then(entries => {
    buildGraph(entries);
    applyNetworkLang();
    const hash = decodeURIComponent(location.hash.slice(1));
    const start = LEGACY_HASH[hash] || hash;
    go(BY_SLUG[start] ? start : DEFAULT_CENTER);
  })
  .catch(() => {
    $('graph').outerHTML = `<p class="network-error">${T[networkLang].error}</p>`;
  });
