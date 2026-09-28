const MAPS = [
  {
    id: 'frequencies',
    title: { es: 'Frecuencia y medidas relacionadas', en: 'Frequency and related measures' },
    description: { es: 'Formas de medir y presentar la frecuencia en un corpus.', en: 'Ways to measure and present frequency in a corpus.' },
    note: { es: 'La frecuencia por millón es una forma de frecuencia normalizada; la lista de frecuencias es una forma de presentar los recuentos. La red muestra relaciones temáticas, no una clasificación estricta.', en: 'Per-million frequency is a form of normalized frequency; a frequency list presents counts. This map shows thematic relations, not a strict taxonomy.' },
    core: 'frequency',
    corePosition: { x: 500, y: 280 },
    viewBox: '0 0 1000 560',
    nodes: [
      { slug: 'raw_frequency', x: 195, y: 130, kind: 'measure' },
      { slug: 'word_frequency', x: 500, y: 95, kind: 'measure' },
      { slug: 'frequency_per_million_words', x: 805, y: 130, kind: 'measure' },
      { slug: 'frequency_list', x: 805, y: 445, kind: 'related' },
      { slug: 'normalized_frequency', x: 500, y: 475, kind: 'measure' },
      { slug: 'relative_frequency', x: 195, y: 445, kind: 'measure' },
    ],
    edges: [
      { from: 'raw_frequency', to: 'frequency', type: 'association' },
      { from: 'relative_frequency', to: 'frequency', type: 'association' },
      { from: 'normalized_frequency', to: 'frequency', type: 'association' },
      { from: 'word_frequency', to: 'frequency', type: 'association' },
      { from: 'frequency_per_million_words', to: 'normalized_frequency', type: 'association' },
      { from: 'frequency', to: 'frequency_list', type: 'association' },
    ],
  },
  {
    id: 'corpora',
    title: { es: 'Tipos de corpus', en: 'Corpus types' },
    description: { es: 'Despliega cada criterio por separado. Un mismo corpus puede pertenecer a varios grupos.', en: 'Open each criterion separately. A corpus can belong to several groups.' },
    note: { es: 'Un corpus paralelo contiene textos traducidos y alineados, pero no tiene que ser bilingüe: puede incluir tres o más lenguas. «Bilingüe» indica dos lenguas; «paralelo», la relación de traducción entre textos. La alineación vincula sus segmentos.', en: 'A parallel corpus contains translated and aligned texts, but it does not have to be bilingual: it can include three or more languages. “Bilingual” specifies two languages; “parallel” describes the translation relationship between texts. Alignment links their segments.' },
    sections: [
      { title: { es: 'Número de lenguas', en: 'Number of languages' }, description: { es: 'Criterio basado en cuántas lenguas contiene.', en: 'Classification by how many languages are included.' }, terms: ['monolingual_corpus', 'bilingual_corpus', 'multilingual_corpus'] },
      { title: { es: 'Relación entre los textos', en: 'Relationship between texts' }, description: { es: 'Los corpus paralelos reúnen traducciones y sus segmentos se alinean; los comparables reúnen textos semejantes sin que sean traducciones entre sí.', en: 'Parallel corpora contain translations whose segments are aligned; comparable corpora contain similar texts that are not translations of one another.' }, terms: ['parallel_corpus', 'alignment', 'comparable_corpus'] },
      { title: { es: 'Finalidad y selección', en: 'Purpose and selection' }, description: { es: 'Criterios relacionados con el alcance, la representatividad o quién produjo los textos.', en: 'Criteria related to scope, representativeness, or who produced the texts.' }, terms: ['general_corpus', 'specialised_corpus', 'reference_corpus', 'learner_corpus'] },
      { title: { es: 'Modalidad y anotación', en: 'Mode and annotation' }, description: { es: 'Criterios sobre el medio de los textos y la información lingüística añadida.', en: 'Criteria concerning the medium of the texts and the linguistic information added to them.' }, terms: ['speech_corpus', 'written_corpus', 'annotated_corpus'] },
      { title: { es: 'Perspectiva temporal', en: 'Time dimension' }, description: { es: 'Los corpus históricos y diacrónicos permiten estudiar la lengua en relación con el tiempo.', en: 'Historical and diachronic corpora support the study of language over time.' }, terms: ['historical_corpus', 'diachronic_corpus'] },
    ],
  },
  {
    id: 'annotation',
    title: { es: 'Anotación lingüística', en: 'Linguistic annotation' },
    description: { es: 'Conceptos relacionados con los tipos, las tareas, las herramientas y la evaluación de la anotación.', en: 'Concepts related to annotation types, tasks, tools, and evaluation.' },
    note: { es: 'Las tareas concretas pueden solaparse con distintos niveles lingüísticos. La red agrupa relaciones de uso y no presenta todos los términos como hipónimos estrictos de «anotación».', en: 'Specific tasks can overlap with different linguistic levels. This map groups practical relationships and does not treat every term as a strict subtype of “annotation”.' },
    sections: [
      { title: { es: 'Niveles de anotación', en: 'Annotation levels' }, description: { es: 'Capas lingüísticas que pueden representarse en un corpus.', en: 'Linguistic layers that can be represented in a corpus.' }, terms: ['morphological_annotation', 'syntactic_annotation', 'semantic_annotation', 'pragmatic_annotation', 'inline_annotation'] },
      { title: { es: 'Tareas de análisis', en: 'Analysis tasks' }, description: { es: 'Tareas que asignan categorías o describen la estructura lingüística.', en: 'Tasks that assign categories or describe linguistic structure.' }, terms: ['pos_tagging', 'word_class', 'lemmatisation', 'named_entity_recognition', 'parsing', 'dependency_parsing'] },
      { title: { es: 'Esquemas, herramientas y resultados', en: 'Schemes, tools, and outputs' }, description: { es: 'Recursos que organizan o realizan la anotación y corpus que conservan sus resultados.', en: 'Resources that organize or perform annotation, and corpora that preserve its results.' }, terms: ['annotation_scheme', 'annotation_tool', 'tagger', 'annotated_corpus', 'treebank'] },
      { title: { es: 'Consistencia y evaluación', en: 'Consistency and evaluation' }, description: { es: 'Conceptos para valorar la calidad y la coherencia entre anotadores.', en: 'Concepts for assessing quality and consistency across annotators.' }, terms: ['inter_annotator_agreement'] },
    ],
  },
];

let networkLang = localStorage.getItem('glicor-lang') || 'es';
let networkEntries = [];
let selectedMap = MAPS[0].id;

function toggleLang() {
  networkLang = networkLang === 'es' ? 'en' : 'es';
  localStorage.setItem('glicor-lang', networkLang);
  document.documentElement.lang = networkLang;
  document.querySelectorAll('[data-es][data-en]').forEach(el => { el.textContent = el.dataset[networkLang]; });
  if (window.syncNavbar) window.syncNavbar(networkLang);
  renderNetwork();
}

function makeTabs() {
  const tabs = document.getElementById('network-tabs');
  tabs.innerHTML = MAPS.map(map => `<button type="button" class="network-tab${map.id === selectedMap ? ' active' : ''}" data-map="${map.id}" aria-pressed="${map.id === selectedMap}">${map.title[networkLang]}</button>`).join('');
  tabs.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    selectedMap = button.dataset.map;
    history.replaceState(null, '', `#${selectedMap}`);
    renderNetwork();
  }));
}

function wrapSvgLabel(label, limit = 19) {
  const words = String(label).split(/\s+/);
  const lines = [];
  let line = '';
  words.forEach(word => {
    if (line && `${line} ${word}`.length > limit) { lines.push(line); line = word; }
    else line = line ? `${line} ${word}` : word;
  });
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function renderNode(entry, position, isCore = false) {
  const x = position.x - 90, y = position.y - 37;
  const label = networkLang === 'es' ? entry.term_es : entry.term_en;
  const lines = wrapSvgLabel(label, 19);
  const text = lines.map((line, i) => `<tspan x="${position.x}" y="${position.y + (i - (lines.length - 1) / 2) * 17 + 5}">${line}</tspan>`).join('');
  const kind = isCore ? 'core' : position.kind;
  return `<a class="network-node ${kind}" href="index.html#${entry.slug}" aria-label="${label}">
    <title>${label}</title><rect x="${x}" y="${y}" width="180" height="74" rx="16"></rect><text>${text}</text></a>`;
}

function renderSections(map, entriesBySlug) {
  return `<div class="network-sections">${map.sections.map((section, index) => {
    const terms = section.terms.filter(slug => entriesBySlug.has(slug));
    const chips = terms.map(slug => {
      const entry = entriesBySlug.get(slug);
      const label = networkLang === 'es' ? entry.term_es : entry.term_en;
      return `<a class="network-term-link" href="index.html#${slug}">${label} ↗</a>`;
    }).join('');
    return `<details class="network-group"${index === 0 ? ' open' : ''}><summary>${section.title[networkLang]}<span class="network-group-count">${terms.length}</span></summary><p>${section.description[networkLang]}</p><div class="network-term-list">${chips}</div></details>`;
  }).join('')}</div>`;
}

function renderNetwork() {
  const map = MAPS.find(item => item.id === selectedMap) || MAPS[0];
  const entriesBySlug = new Map(networkEntries.map(entry => [entry.slug, entry]));
  document.querySelector('.network-panel').classList.toggle('network-panel--groups', Boolean(map.sections));
  const core = entriesBySlug.get(map.core);
  document.getElementById('network-title').textContent = map.title[networkLang];
  document.getElementById('network-description').textContent = map.description[networkLang];
  document.getElementById('network-note').textContent = map.note[networkLang];
  makeTabs();
  if (map.sections) {
    document.getElementById('network-canvas').innerHTML = renderSections(map, entriesBySlug);
    return;
  }
  if (!core) {
    document.getElementById('network-canvas').innerHTML = '<p class="network-error">No se pudieron cargar los datos de la red.</p>';
    return;
  }
  const visibleNodes = map.nodes.filter(node => entriesBySlug.has(node.slug));
  const positions = new Map(visibleNodes.map(node => [node.slug, node]));
  const corePosition = map.corePosition || { x: 500, y: 280 };
  positions.set(map.core, corePosition);
  const edges = [...(map.edges || []), ...(map.extraEdges || [])].filter(edge => positions.has(edge.from) && positions.has(edge.to)).map(edge => {
    const from = positions.get(edge.from), to = positions.get(edge.to);
    const fromEntry = entriesBySlug.get(edge.from), toEntry = entriesBySlug.get(edge.to);
    const fromLabel = fromEntry && (networkLang === 'es' ? fromEntry.term_es : fromEntry.term_en);
    const toLabel = toEntry && (networkLang === 'es' ? toEntry.term_es : toEntry.term_en);
    const relation = networkLang === 'es' ? 'se relaciona con' : 'is associated with';
    return `<line class="network-edge ${edge.type}" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}"><title>${fromLabel} ${relation} ${toLabel}</title></line>`;
  }).join('');
  const nodes = [renderNode(core, corePosition, true), ...visibleNodes.map(node => renderNode(entriesBySlug.get(node.slug), node))].join('');
  document.getElementById('network-canvas').innerHTML = `<svg viewBox="${map.viewBox || '0 0 1000 560'}" role="group" aria-label="${map.title[networkLang]}">${edges}${nodes}</svg>`;
}

async function loadNetworks() {
  document.documentElement.lang = networkLang;
  const hashMap = decodeURIComponent(window.location.hash.slice(1));
  if (MAPS.some(map => map.id === hashMap)) selectedMap = hashMap;
  const response = await fetch('assets/data/entries.json?v=' + Date.now());
  networkEntries = (await response.json()).filter(entry => (entry.type || 'term') === 'term');
  renderNetwork();
}

loadNetworks().catch(() => {
  document.getElementById('network-canvas').innerHTML = '<p class="network-error">No se pudieron cargar los datos de la red.</p>';
});
