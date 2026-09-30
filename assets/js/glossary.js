// Vista: 'term' (glosario, index.html) o 'entity' (índice de recursos, recursos.html).
// Las entidades (corpus concretos, herramientas) son nombres propios de recursos,
// no términos en sentido estricto, y se listan aparte.
const VIEW = document.body.dataset.view === 'entity' ? 'entity' : 'term';
const PAGE_FOR_TYPE = { term: 'index.html', entity: 'recursos.html' };

const STRINGS_BY_VIEW = {
  term: STRINGS_TERM(),
  entity: STRINGS_ENTITY(),
};

function STRINGS_ENTITY() {
  return {
    es: {
      searchPlaceholder: 'Buscar recurso...',
      searchModeLabel:   'Lengua de búsqueda',
      filterLabel:       'Tipo de recurso',
      allCategories:     'Todos los tipos',
      emptyMsg:          'Escribe en el buscador o selecciona un tipo para explorar el índice de recursos.',
      noResults:         'No se encontraron recursos.',
      propose:           '¿Falta este recurso? Propónlo',
      catKey:            'category',
      results:           n => n === 1 ? '1 recurso encontrado' : `${n} recursos encontrados`,
    },
    en: {
      searchPlaceholder: 'Search resource...',
      searchModeLabel:   'Search language',
      filterLabel:       'Resource type',
      allCategories:     'All types',
      emptyMsg:          'Type in the search box or select a type to browse the resource index.',
      noResults:         'No resources found.',
      propose:           'Is this resource missing? Suggest it',
      catKey:            'category_en',
      results:           n => n === 1 ? '1 resource found' : `${n} resources found`,
    },
  };
}

function STRINGS_TERM() { return {
  es: {
    searchPlaceholder: 'Buscar término...',
    searchModeLabel:   'Lengua de búsqueda',
    filterLabel:       'Filtrar por categoría',
    allCategories:     'Todas',
    emptyMsg:          'Escribe en el buscador o selecciona una categoría para explorar el glosario.',
    noResults:         'No se encontraron términos.',
    propose:           '¿Falta este término? Propónlo',
    catKey:            'category',
    results:           n => n === 1 ? '1 término encontrado' : `${n} términos encontrados`,
  },
  en: {
    searchPlaceholder: 'Search term...',
    searchModeLabel:   'Search language',
    filterLabel:       'Filter by category',
    allCategories:     'All',
    emptyMsg:          'Type in the search box or select a category to browse the glossary.',
    noResults:         'No terms found.',
    propose:           'Is this term missing? Suggest it',
    catKey:            'category_en',
    results:           n => n === 1 ? '1 term found' : `${n} terms found`,
  },
}; }

const STRINGS = STRINGS_BY_VIEW[VIEW];
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const RESOURCE_GROUPS = [
  { id: 'corpora', es: 'Corpus y colecciones', en: 'Corpora and collections', slugs: 'actres bank_of_english bidtea bnc bncweb brown_corpus c_oral_rom caes cate cde_now cde_web cdh cedel2 cemc charta cleae cobuild coca codea coha corane corde corespi corlec corlexin corpes_xxi cows_l2h crea ecpc eleactar estenten europarl fono_ele gentt global_voices glowbe helsinki_corpus international_corpus_of_english iula langsnap letrac llc lob mellange micase must multinot now_corpus ode opus penn_treebank preseea seu splloc spt sse valesco'.split(' ') },
  { id: 'lexical', es: 'Recursos léxicos', en: 'Lexical resources', slugs: ['wordnet'] },
  { id: 'query', es: 'Consulta y análisis de corpus', en: 'Corpus querying and analysis', slugs: 'antconc antpconc chorus concgram cqp cqpweb cwb gdex genex sketch_engine wmatrix wordsmith_tools'.split(' ') },
  { id: 'nlp', es: 'Anotación y procesamiento lingüístico', en: 'Annotation and language processing', slugs: 'claws freeling grampal ixa_pipes lesk_algorithm mallet nltk pencil stanford_parser stanza tagant treetagger ukb'.split(' ') },
  { id: 'standards', es: 'Estándares y formatos técnicos', en: 'Technical standards and formats', slugs: 'eagles html sgml tei unicode universal_dependencies universal_pos utf_8 xml'.split(' ') },
  { id: 'collection', es: 'Recopilación y construcción', en: 'Corpus collection and building', slugs: 'bootcat dmi_tcat rtweet t_hoarder tweepy'.split(' ') },
  { id: 'translation', es: 'Traducción y alineación', en: 'Translation and alignment', slugs: 'bitext2tmx lf_aligner multitrans plus_align stingray trados transit wordfast xbench'.split(' ') },
  { id: 'development', es: 'Programación y bibliotecas', en: 'Programming and libraries', slugs: 'gensim gephi ixa_pipes mallet nltk notepad_plus_plus perl rtweet stanza tweepy'.split(' ') },
];

let lang = localStorage.getItem('glicor-lang') || 'es';
let ALL_ENTRIES = [];      // solo las de esta vista
let EVERY_ENTRY = [];      // todas (términos + entidades), para enlaces cruzados
let ALL_CONCORDANCES = {};
let BIB = {};              // bibliografia.json: referencia completa y cita breve de cada documento del corpus
let NORM = { tipos: {}, relaciones: {} };   // normalizacion.json: etiquetas de variantes
let SLUG_INDEX = {};       // nombre, slug antiguo o variante → slug canónico

// Clave para casar nombres de términos con entradas: «Part-of-speech tagging»,
// «part_of_speech_tagging» y «part of speech tagging» dan la misma.
function nameKey(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9áéíóúüñ]+/g, '_').replace(/^_+|_+$/g, '');
}

function buildSlugIndex() {
  SLUG_INDEX = {};
  const add = (name, slug) => { const k = nameKey(name); if (k && !(k in SLUG_INDEX)) SLUG_INDEX[k] = slug; };
  EVERY_ENTRY.forEach(e => { add(e.slug, e.slug); add(e.term_en, e.slug); add(e.term_es, e.slug); });
  EVERY_ENTRY.forEach(e => {
    (e.aliases || []).forEach(a => add(a, e.slug));
    Object.values(e.forms || {}).flat().forEach(f => add(f.form, e.slug));
  });
}

function resolveSlug(nameOrSlug) {
  return SLUG_INDEX[nameKey(nameOrSlug)] || null;
}

// Formas de la entrada en una lengua, sin la principal: variantes, sinónimos, préstamos
function variantsOf(e, lng) {
  return ((e.forms || {})[lng] || []).slice(1);
}

function variantForms(e, lng) {
  return variantsOf(e, lng).map(v => v.form);
}

// Sinónimo o préstamo consolidado en la comunidad experta (frecuencia alta o parecida a la principal)
function isConsolidated(v) {
  return v.consolidated === true;
}

// Sinónimos y préstamos frente a variación denominativa (variantes formales:
// siglas, formas desarrolladas, variantes ortográficas…), como en DOCUTERM
const SYNONYM_RELS = ['sinonimo', 'prestamo'];
function isSynonym(v) {
  return SYNONYM_RELS.includes(v.rel);
}

function relationLabel(v, isEntity = false) {
  if (isEntity && ['variante_denominativa', 'sinonimo'].includes(v.rel)) {
    return lang === 'es' ? 'variante' : 'variant';
  }
  if (isConsolidated(v)) {
    if (v.rel === 'prestamo') return lang === 'es' ? 'préstamo consolidado' : 'established loanword';
    return lang === 'es' ? 'sinónimo consolidado' : 'established synonym';
  }
  return ((NORM.relaciones || {})[v.rel] || {})[lang] || v.rel.replace(/_/g, ' ');
}

// Referencia completa y cita breve de un documento del corpus (Apéndice I)
function fullReference(source) {
  if (BIB[source]) return BIB[source].ref;
  const parts = String(source || '').split('_');
  return `${parts[1] || ''}${parts[0] ? ` (${parts[0]})` : ''}${parts.length > 2 ? `. <em>${parts.slice(2).join(': ')}</em>` : ''}`;
}
// Contexto de cada subcorpus: definitorio (validado) o de uso, con su fuente; si no
// lo hay, el motivo (término no documentado en ese subcorpus o solo en títulos)
// Marca en el contexto las formas contadas de la entrada (X2), de la más larga a la más corta
function markForms(text, e, cl) {
  const forms = [...new Set(((e.forms || {})[cl] || []).flatMap(f => [f.form, ...(f.strings || []).map(s => s[0])]).filter(Boolean))]
    .sort((a, b) => b.length - a.length)
    .map(f => f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!forms.length) return text;
  return text.replace(new RegExp(`(^|[^\\p{L}\\p{N}])(${forms.join('|')})(?=$|[^\\p{L}\\p{N}])`, 'giu'), '$1<mark class="ctx-mark">$2</mark>');
}

function contextBody(c, cl, lang, e) {
  const sub = {
    es: { es: 'el subcorpus español', en: 'the Spanish subcorpus' },
    en: { es: 'el subcorpus inglés', en: 'the English subcorpus' },
  }[cl][lang];
  if (c.type === 'no_documentado') {
    return `<p class="entry-context entry-context-none">${lang === 'es' ? `No documentado en ${sub}.` : `Not attested in ${sub}.`}</p>`;
  }
  if (c.type === 'solo_titulos') {
    return `<p class="entry-context entry-context-none">${lang === 'es'
      ? `En ${sub} solo aparece en títulos de obras.` : `Only attested in titles of works in ${sub}.`}</p>`;
  }
  const ref = fullReference(c.source).replace(/<[^>]+>/g, '').replace(/"/g, '&quot;');
  return `<p class="entry-context">«${e ? markForms(c.text, e, cl) : c.text}»
    <span class="context-src" title="${ref}">— ${shortCite(c.source)}</span></p>`;
}

function contextLabel(c, lang) {
  return c.type === 'definitorio'
    ? (lang === 'es' ? 'Contexto definitorio' : 'Defining context')
    : (lang === 'es' ? 'Contexto de uso' : 'Usage context');
}

function contextHtml(e, lang, searchMode) {
  const cs = e.contexts;
  if (!cs) return '';
  const main = searchMode === 'en' ? 'en' : 'es';
  const other = main === 'en' ? 'es' : 'en';
  const langName = { es: { es: 'español', en: 'Spanish' }, en: { es: 'inglés', en: 'English' } };
  const tag = cl => ` <span class="context-lang">(${lang === 'es' ? 'subcorpus ' + langName[cl].es : langName[cl].en + ' subcorpus'})</span>`;
  const otherLbl = lang === 'es' ? `Ver el contexto en ${langName[other].es}` : `Show the ${langName[other].en} context`;
  return `<h3>${contextLabel(cs[main], lang)}${tag(main)}</h3>${contextBody(cs[main], main, lang, e)}
    <details class="context-other"><summary>${otherLbl}</summary>
      <p class="context-other-label">${contextLabel(cs[other], lang)}${tag(other)}</p>${contextBody(cs[other], other, lang, e)}
    </details>`;
}

// Nota terminológica sobre el uso del término en el corpus
function termNoteHtml(e, lang, searchMode) {
  const n = e.term_note;
  if (!n) return '';
  return `<div class="term-note"><strong>${lang === 'es' ? 'Nota' : 'Note'}.</strong> ${n[searchMode === 'en' ? 'en' : 'es']}</div>`;
}

function shortCite(source) {
  return BIB[source] ? BIB[source].cita : source;
}

function fmtNum(n) {
  return new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-US').format(n);
}
let currentCat = 'All';
let searchMode = 'es';
let currentLetter = null;
const container = document.getElementById('entries-container');
const searchInput = document.getElementById('search');
const catTrigger = document.getElementById('cat-trigger');
const catMenu = document.getElementById('cat-nav');

function t(key) { return STRINGS[lang][key]; }

function getMsgEmpty() {
  return `<div class="placeholder-msg">${t('emptyMsg')}</div>`;
}

function showDefault() {
  if (VIEW === 'entity') {
    renderEntries(sortEntries(ALL_ENTRIES));
  } else {
    document.getElementById('results-count').style.display = 'none';
    container.innerHTML = getMsgEmpty();
  }
}

function getDisplayTerm(entry) {
  return cleanTerm(entry, lang === 'es' ? entry.term_es : entry.term_en);
}

function cleanTerm(entry, value) {
  return entry.slug === 'plus_align' ? String(value).replace(/^\s*\+\s*/, '') : value;
}

function getEntryLetter(entry) {
  return cleanTerm(entry, searchMode === 'es' ? entry.term_es : entry.term_en)
    .trim().charAt(0).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
}

function sortEntries(list) {
  return [...list].sort((a, b) => getDisplayTerm(a).localeCompare(getDisplayTerm(b), lang));
}

async function loadGlossary() {
  try {
    const v = Date.now();
    const [entriesRes, concRes, normData, bibData] = await Promise.all([
      fetch('assets/data/entries.json?v=' + v),
      fetch('assets/data/concordances.json?v=' + v),
      fetch('assets/data/normalizacion.json?v=' + v).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('assets/data/bibliografia.json?v=' + v).then(r => r.ok ? r.json() : {}).catch(() => ({})),
    ]);
    EVERY_ENTRY       = await entriesRes.json();
    ALL_ENTRIES       = EVERY_ENTRY.filter(e => (e.type || 'term') === VIEW);
    ALL_CONCORDANCES  = await concRes.json();
    if (normData) NORM = normData;
    BIB = bibData || {};
    buildSlugIndex();
    applyLang();
    openFromHash();
  } catch (error) {
    container.innerHTML = "<p style='text-align:center'>Error al cargar datos.</p>";
  }
}

function applyLang() {
  const s = STRINGS[lang];
  if (window.syncNavbar) window.syncNavbar(lang);
  document.querySelectorAll('.lang-es').forEach(el => el.hidden = (lang === 'en'));
  document.querySelectorAll('.lang-en').forEach(el => el.hidden = (lang === 'es'));
  searchInput.placeholder = s.searchPlaceholder;
  document.getElementById('search-mode-label').textContent = s.searchModeLabel;
  catMenu.setAttribute('aria-label', s.filterLabel);
  currentCat = 'All';
  currentLetter = null;
  const groupHash = decodeURIComponent(window.location.hash.replace(/^#/, '')).replace(/^group-/, '');
  if (VIEW === 'entity' && window.location.hash.startsWith('#group-')) {
    if (groupHash !== 'all' && RESOURCE_GROUPS.some(g => g.id === groupHash)) currentCat = groupHash;
  }
  showDefault();
  renderAlphabet();
  renderCategoryButtons();
  if (VIEW === 'entity' && currentCat !== 'All') applyFilters();
}

function toggleLang() {
  lang = lang === 'es' ? 'en' : 'es';
  localStorage.setItem('glicor-lang', lang);
  applyLang();
}

function renderCategoryButtons() {
    catMenu.innerHTML = '';
    let categories;
    if (VIEW === 'entity') {
      categories = ['All', ...RESOURCE_GROUPS.map(group => group.id)];
    } else {
      const seen = new Set();
      ALL_ENTRIES.forEach(e => seen.add(e[t('catKey')]));
      categories = ['All', ...[...seen].sort()];
    }
    categories.forEach(cat => {
        const option = document.createElement('button');
        option.type = 'button';
        option.className = `cat-option${cat === currentCat ? ' active' : ''}`;
        option.dataset.value = cat;
        const resourceGroup = VIEW === 'entity' && RESOURCE_GROUPS.find(group => group.id === cat);
        option.textContent = cat === 'All' ? t('allCategories') : resourceGroup ? resourceGroup[lang] : cat;
        option.addEventListener('click', () => {
          filterCat(cat);
          closeCategoryMenu();
        });
        catMenu.appendChild(option);
    });
    updateCategoryTrigger();
}

function filterCat(cat) {
    currentCat = cat;
    updateCategoryTrigger();
    renderCategoryButtons();
    applyFilters();
}

function updateCategoryTrigger() {
    const resourceGroup = VIEW === 'entity' && RESOURCE_GROUPS.find(group => group.id === currentCat);
    const label = currentCat === 'All' ? t('allCategories') : resourceGroup ? resourceGroup[lang] : currentCat;
    catTrigger.textContent = `${t('filterLabel')}: ${label}`;
}

function openCategoryMenu() {
    catMenu.classList.add('open');
    catTrigger.setAttribute('aria-expanded', 'true');
}

function closeCategoryMenu() {
    catMenu.classList.remove('open');
    catTrigger.setAttribute('aria-expanded', 'false');
}

function toggleCategoryMenu() {
    if (catMenu.classList.contains('open')) closeCategoryMenu();
    else openCategoryMenu();
}

function applyFilters() {
    const query = searchInput.value.toLowerCase();
    
    if (VIEW === 'entity' && query === '' && currentCat === 'All' && !currentLetter) {
        showDefault();
        return;
    }

    // Si no hay búsqueda ni categoría activa, volvemos al estado vacío del glosario.
    if (VIEW !== 'entity' && query === '' && currentCat === 'All' && !currentLetter) {
        showDefault();
        document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
        return;
    }

    const catKey = t('catKey');
    const filtered = ALL_ENTRIES.filter(e => {
        const names = [searchMode === 'es' ? e.term_es : e.term_en, ...variantForms(e, searchMode)];
        const normalizedQuery = query.replace(/^\s*\+\s*/, '');
        const matchesSearch = names.some(n => cleanTerm(e, n).toLowerCase().includes(normalizedQuery));
        const resourceGroup = VIEW === 'entity' && RESOURCE_GROUPS.find(group => group.id === currentCat);
        const matchesCat = currentCat === 'All' || (resourceGroup ? resourceGroup.slugs.includes(e.slug) : e[catKey] === currentCat);
        const matchesLetter = !currentLetter || getEntryLetter(e) === currentLetter;
        return matchesSearch && matchesCat && matchesLetter;
    });
    renderEntries(sortEntries(filtered));
}

function setSearchMode(mode, btn) {
    searchMode = mode;
    document.querySelectorAll('.search-mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderAlphabet();
    applyFilters();
}

// Sin resultados: enlaza con el formulario de propuestas y le pasa lo buscado
// ── Ejemplo del corpus (K1): una cita cada vez, con «Otro ejemplo» ──
const EXAMPLES = {};   // slug → [{ html, cite }]
const escHtml = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Recorta la concordancia a la oración que contiene el término; «…» si empieza o acaba fuera del fragmento
function exampleSentence(c) {
  const l = c.left.replace(/^…\s*/, ''), r = c.right.replace(/\s*…$/, '');
  const ls = l.split(/(?<=[.!?:])\s+/);
  const left = ls[ls.length - 1];
  const rm = r.match(/^[^.!?]*[.!?]?/);
  let right = rm ? rm[0] : r;
  const pre = ls.length === 1 ? '…' : '';
  const post = /[.!?]$/.test(right.trim()) ? '' : '…';
  if (post) right = right.replace(/\s+\S*$/, '');
  return `${pre}${escHtml(left)}<mark class="ctx-mark">${escHtml(c.keyword)}</mark>${escHtml(right)}${post}`;
}

function exampleHtml(slug, i) {
  const list = EXAMPLES[slug];
  const ex = list[i];
  return `<p class="example-q">«${ex.html}»</p>
    <div class="example-foot">
      <span class="example-cite">${ex.cite}${list.length > 1 ? ` · ${i + 1}/${list.length}` : ''}</span>
      ${list.length > 1 ? `<span class="example-nav"><span class="example-dots">${list.map((_, j) => `<i class="${j === i ? 'on' : ''}"></i>`).join('')}</span>
        <button type="button" class="example-next" onclick="nextExample('${slug}')">${lang === 'es' ? 'Otro ejemplo' : 'Another example'} ↻</button></span>` : ''}
    </div>`;
}

function nextExample(slug) {
  const box = document.getElementById(`example-${slug}`);
  if (!box || !EXAMPLES[slug]) return;
  const i = (Number(box.dataset.i || 0) + 1) % EXAMPLES[slug].length;
  box.dataset.i = i;
  box.innerHTML = exampleHtml(slug, i);
}

// Mini-red de la ficha: el término en el centro y sus relacionados alrededor;
// toda la miniatura enlaza con la red completa (el aviso aparece al pasar el cursor)
const CATEGORY_VAR = { 'cat-met': '--c-met', 'cat-est': '--c-est', 'cat-proc': '--c-proc', 'cat-tec': '--c-tec', 'cat-rec': '--c-rec' };
function miniNetHtml(e, centerLabel, slugs) {
  if (!slugs.length) return '';
  const cut = (s, n) => s.length > n ? s.slice(0, n - 1) + '…' : s;
  const cx = 150, cy = 112, n = slugs.length;
  const pts = slugs.map((s, i) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const rel = EVERY_ENTRY.find(x => x.slug === s);
    return { s, x: cx + 108 * Math.cos(a), y: cy + 82 * Math.sin(a), label: cut(lang === 'es' ? rel.term_es : rel.term_en, 22), color: `var(${CATEGORY_VAR[categoryClass(rel)] || '--c-met'})` };
  });
  const center = cut(centerLabel.replace(/<[^>]+>/g, ''), 18);
  const cw = center.length * 6.6 + 22;
  const svg = `<svg viewBox="0 0 300 224" width="100%" aria-hidden="true">
    ${pts.map(p => `<line x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" stroke="#cbd5e1" stroke-width="1.5"/>`).join('')}
    ${pts.map(p => { const w = p.label.length * 5.8 + 14; return `<rect x="${p.x - w / 2}" y="${p.y - 11}" width="${w}" height="22" rx="11" fill="#fff" stroke="${p.color}" stroke-width="1.5"/><text x="${p.x}" y="${p.y}">${p.label}</text>`; }).join('')}
    <rect x="${cx - cw / 2}" y="${cy - 14}" width="${cw}" height="28" rx="14" fill="#1e1b4b"/><text x="${cx}" y="${cy}" class="mini-center">${center}</text>
  </svg>`;
  const label = lang === 'es' ? 'Ver en la red de relaciones' : 'View in the relations network';
  return `<a class="mini-net" href="redes.html#${encodeURIComponent(e.slug)}" aria-label="${label}">${svg}<span class="net-hover">${label} ↗</span></a>`;
}

// Clase de color de la etiqueta de categoría (los mismos colores que la red de relaciones)
const CATEGORY_CLASS = {
  'Metodología y diseño': 'cat-met',
  'Estadística y léxico': 'cat-est',
  'Procesamiento lingüístico': 'cat-proc',
  'Tecnología y formatos': 'cat-tec',
};
function categoryClass(e) {
  return e.type === 'entity' ? 'cat-rec' : (CATEGORY_CLASS[e.category] || '');
}

function renderNoResults(show) {
  const el = document.getElementById('no-results');
  el.style.display = show ? 'block' : 'none';
  if (!show) return;
  const q = searchInput.value.trim();
  el.textContent = t('noResults');
  if (!q) return;
  const params = new URLSearchParams({ tipo: VIEW === 'entity' ? 'recurso' : 'termino', lengua: searchMode, q });
  const link = document.createElement('a');
  link.className = 'propose-link';
  link.href = `contacto.html?${params}#propuestas`;
  link.textContent = t('propose');
  el.append(document.createElement('br'), link);
}

function renderEntries(list) {
  container.innerHTML = '';
  container.classList.toggle('resource-card-grid', VIEW === 'entity');
  renderNoResults(list.length === 0);
  const countEl = document.getElementById('results-count');
  if (list.length > 0) {
    countEl.textContent = t('results')(list.length);
    countEl.style.display = 'block';
  } else {
    countEl.style.display = 'none';
  }
  
  list.forEach(e => {
    const card = document.createElement('details');
    card.className = 'entry';
    card.id = `term-${e.slug}`;
    
    let cleanHtml = e.html;

    // 0. Eliminar encabezado redundante (h2 con el término y párrafo de categoría)
    cleanHtml = cleanHtml.replace(/^<h2>.*?<\/h2>\s*/s, '');
    cleanHtml = cleanHtml.replace(/^<p><strong>Category \/ Categoría:.*?<\/p>\s*/s, '');
    // (fuentes EN/ES handled in step 3 below)
    cleanHtml = cleanHtml.replace(/<h3[^>]*>Nota terminológica \/ Terminological note<\/h3>[\s\S]*$/s, '');

    // 1. Mostrar solo la definición correspondiente a la lengua de búsqueda
    const enMatch = cleanHtml.match(/<h3[^>]*>Definition \(EN\)<\/h3>([\s\S]*?)(?=<h3)/);
    const esMatch = cleanHtml.match(/<h3[^>]*>Definición \(ES\)<\/h3>([\s\S]*?)(?=<h3)/);
    let definitionText = '';
    if (enMatch && esMatch) {
        const before  = cleanHtml.substring(0, cleanHtml.indexOf(enMatch[0]));
        const afterEs = cleanHtml.substring(cleanHtml.indexOf(esMatch[0]) + esMatch[0].length);
        definitionText = searchMode === 'en' ? enMatch[1] : esMatch[1];
        cleanHtml = before + afterEs;
    }
    const contextPart = contextHtml(e, lang, searchMode);
    const notePart = termNoteHtml(e, lang, searchMode);

    // 2. Términos relacionados como tags clicables
    let relatedTags = '';
    const relSlugs = [];
    if (cleanHtml.includes('Relación con otros términos')) {
        const parts = cleanHtml.split(/<h3.*?>Relación con otros términos.*?<\/h3>/);
        const nextHeader = parts[1].indexOf('<h3');
        const relationsSection = parts[1].substring(0, nextHeader !== -1 ? nextHeader : parts[1].length);
        const items = relationsSection.match(/<li><strong>(.*?)<\/strong>/g);
        if (items) {
            let tagsHtml = `<ul class="related-list">`;
            const seenRel = new Set([e.slug]);
            items.forEach(item => {
                const termName = item.replace('<li><strong>', '').replace('</strong>', '').trim();
                const termSlug = resolveSlug(termName) || nameKey(termName);
                // Tras unificar variantes, un relacionado puede ser la propia entrada o repetirse
                if (seenRel.has(termSlug)) return;
                seenRel.add(termSlug);
                const relEntry = EVERY_ENTRY.find(x => x.slug === termSlug);
                const displayName = relEntry ? (lang === 'es' ? relEntry.term_es : relEntry.term_en) : termName;
                tagsHtml += `<li onclick="goToTerm('${termSlug}')">${displayName}</li>`;
                if (relEntry) relSlugs.push(termSlug);
            });
            tagsHtml += '</ul>';
            relatedTags = tagsHtml;
            cleanHtml = parts[0] + (nextHeader !== -1 ? parts[1].substring(nextHeader) : '');
        }
    }

    // 3. Fuentes de la definición (las citas del HTML se sustituyen por la lista de documentos)
    cleanHtml = cleanHtml.replace(/<h3[^>]*>Fuentes del corpus \((?:EN|ES)\) \/ Corpus sources \((?:EN|ES)\)<\/h3>\s*<ul>[\s\S]*?<\/ul>/g, '');

    // Documentos del corpus en que se basa la definición de la lengua de la ficha
    // (o, si no los hay, de la otra lengua), con su referencia completa
    const fichaLang = searchMode === 'en' ? 'en' : 'es';
    const otherLang = fichaLang === 'en' ? 'es' : 'en';
    const srcList = ((e.sources || {})[fichaLang] || []).length ? e.sources[fichaLang] : ((e.sources || {})[otherLang] || []);
    let biblioItems = srcList.map(s => `<li>${fullReference(s)}</li>`);

    const activeLang = searchMode === 'en' ? 'en' : 'es';

    // Ejemplos del corpus: de la lengua de búsqueda o, si no hay, de la otra
    const examplesFor = lng => {
      const seen = new Set();
      return [e.slug, ...(e.aliases || [])].flatMap(s => (ALL_CONCORDANCES[s] || {})[lng] || [])
        .filter(c => { const k = c.left + c.keyword + c.right; if (seen.has(k)) return false; seen.add(k); return true; });
    };
    let exampleLang = activeLang;
    let exampleData = examplesFor(activeLang);
    if (!exampleData.length) { exampleLang = activeLang === 'es' ? 'en' : 'es'; exampleData = examplesFor(exampleLang); }

    // Si la ficha no incluye referencias bibliográficas, usar las fuentes de sus
    // concordancias. Para recursos, el sitio oficial también documenta la ficha.
    if (!biblioItems.length) {
      const sourceSlugs = [e.slug, ...(e.aliases || [])];
      const corpusSources = [...new Set(sourceSlugs.flatMap(s => ['en', 'es']
        .flatMap(lng => (ALL_CONCORDANCES[s] || {})[lng] || [])
        .map(c => c.source).filter(Boolean)))];
      biblioItems = corpusSources.map(source => `<li>${fullReference(source)}</li>`);
    }
    if (!biblioItems.length && e.url) {
      biblioItems = [`<li><a href="${e.url}" target="_blank" rel="noopener">${e.url}</a></li>`];
    }
    const biblioUniq = [...new Map(biblioItems.map(x => [x, x])).values()];

    const uid          = e.slug;
    const isEntity = (e.type || 'term') === 'entity';
    const fuentesLabel = lang === 'es' ? 'Fuente de la definición' : 'Definition source';
    const fuentesIntro = srcList.length
      ? `${lang === 'es' ? 'Propia, elaborada a partir de:' : 'Own definition, based on:'}` : '';

    const sourcesInfo = biblioUniq.length > 0
      ? `<span class="def-info" id="biblio-${uid}">
          <button type="button" class="info-btn" aria-label="${fuentesLabel}" onclick="this.parentElement.classList.toggle('open')">i</button>
          <span class="info-pop"><strong>${fuentesLabel}.</strong> ${fuentesIntro}<ul class="src-panel">${biblioUniq.join('')}</ul></span>
        </span>` : '';
    // ── Equivalente en la otra lengua ──
    const primary   = cleanTerm(e, searchMode === 'en' ? e.term_en : e.term_es);
    const equivTerm = searchMode === 'en' ? (e.equiv_es || '') : (e.equiv_en || '');
    const equivLang = searchMode === 'en' ? 'es' : 'en';
    const showEquiv = equivTerm && cleanTerm(e, equivTerm).toLowerCase() !== primary.toLowerCase();
    const proposed = l => (e.proposed || {})[l];
    const proposedLbl = lang === 'es' ? 'propuesta' : 'proposed';
    const proposedTitle = lang === 'es'
      ? 'Equivalente propuesto en el glosario: no aparece en el corpus'
      : 'Equivalent proposed by the glossary: not attested in the corpus';
    const proposedBadge = l => proposed(l) ? ` <span class="proposed-badge" title="${proposedTitle}">${proposedLbl}</span>` : '';
    let equivHtml = '';
    if (showEquiv) {
      const equivLabelText = lang === 'es'
        ? (equivLang === 'en' ? 'Equivalente en inglés' : 'Equivalente en español')
        : (equivLang === 'en' ? 'English equivalent' : 'Spanish equivalent');
      const safeEquiv = equivTerm.replace(/'/g, "\\'");
      equivHtml = `<div class="equiv-section">
        <span class="equiv-label">${equivLabelText}</span>
        <span class="equiv-chip" onclick="goToEquiv('${e.slug}','${equivLang}','${safeEquiv}')">${equivTerm}</span>${proposedBadge(equivLang)}
      </div>`;
    }

    // ── Tabla de frecuencias ──
    let freqHtml = '';
    if (!isEntity && e.freq && (e.freq.en || e.freq.es)) {
      const freqTitle = lang === 'es' ? 'Frecuencia' : 'Frequency';
      const colAbs = lang === 'es' ? 'Frec.' : 'Freq.';
      const colPmw = lang === 'es' ? 'Por millón' : 'Per million';
      const colDocs = lang === 'es' ? 'Doc.' : 'Docs';
      const row = (label, d, docs) => d
        ? `<tr><td>${label}</td><td>${d.abs}</td><td>${d.pmw}</td><td>${docs ?? '—'}</td></tr>`
        : '';
      freqHtml = `<div class="aside-sec">
        <span class="equiv-label">${freqTitle}</span>
        <table class="freq-table">
          <thead><tr><th></th><th>${colAbs}</th><th>${colPmw}</th><th>${colDocs}</th></tr></thead>
          <tbody>${row('EN', e.freq.en, (e.docs || {}).en)}${row('ES', e.freq.es, (e.docs || {}).es)}</tbody>
        </table>`;
    }

    // ── Enlace al recurso (solo entidades) ──
    let linkHtml = '';
    if (e.url) {
      const linkLabel = lang === 'es' ? 'Sitio web' : 'Website';
      const host = e.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '');
      linkHtml = `<div class="equiv-section">
        <span class="equiv-label">${linkLabel}</span>
        <a class="resource-link" href="${e.url}" target="_blank" rel="noopener">${host} ↗</a>
      </div>`;
    }

    // ── Búsqueda por una variante: se avisa de a qué entrada remite ──
    let foundByHtml = '';
    const q = searchInput.value.trim().toLowerCase();
    const vars = variantsOf(e, activeLang);
    if (q && !primary.toLowerCase().includes(q)) {
      const hit = vars.find(v => v.form.toLowerCase().includes(q));
      if (hit) {
        foundByHtml = lang === 'es'
          ? `<p class="found-by">Has buscado «${hit.form}» (${relationLabel(hit, isEntity)}): remite a esta entrada.</p>`
          : `<p class="found-by">You searched for «${hit.form}» (${relationLabel(hit, isEntity)}): it points to this entry.</p>`;
      }
    }

    // ── Variación denominativa y sinónimos y préstamos (campos de DOCUTERM) ──
    let variantsHtml = '';
    if (vars.length) {
      const docsLbl = lang === 'es' ? 'doc.' : 'docs';
      const undocumented = lang === 'es' ? 'no documentado en el corpus' : 'not attested in the corpus';
      const chip = v => `<button type="button" class="variant-chip${isConsolidated(v) ? ' consolidated' : ''}" onclick="searchForVariant('${encodeURIComponent(v.form).replace(/'/g, '%27')}')">${v.form} <span class="variant-rel">${relationLabel(v, isEntity)}${isEntity ? '' : ` · ${
        v.n ? `${fmtNum(v.n)} · ${v.docs} ${docsLbl}` : undocumented}`}</span></button>`;
      const block = (title, list) => list.length ? `<div class="variants-section">
        <span class="equiv-label">${title}</span>
        <div class="variant-list">${list.map(chip).join('')}</div>
      </div>` : '';
      variantsHtml = isEntity
        ? block(lang === 'es' ? 'Variantes' : 'Variants', vars)
        : block(lang === 'es' ? 'Variación denominativa' : 'Denominative variation', vars.filter(v => !isSynonym(v)))
          + block(lang === 'es' ? 'Sinónimos y préstamos' : 'Synonyms and loanwords', vars.filter(isSynonym));
    }

    // ── Notas conceptuales ──
    const notesHtml = (e.notes || []).map(n => `<div class="concept-note"><strong>${lang === 'es' ? 'Nota' : 'Note'}.</strong> ${n[lang]}</div>`).join('');

    // ── Formas contadas (trazabilidad de la frecuencia) ──
    const counted = (e.forms || {})[activeLang] || [];
    if (freqHtml && counted.length) {
      const strings = counted.flatMap(f => f.strings).filter(([, n]) => n > 0);
      const lbl = lang === 'es' ? 'Formas contadas' : 'Counted forms';
      const more = lang === 'es' ? 'Criterios' : 'Criteria';
      freqHtml += `<p class="freq-note">${lbl}: ${strings.map(([s, n]) => `${s} (${fmtNum(n)})`).join(' · ') || '—'}.
        ${e.norm ? `<a href="normalizacion.html">${more} ↗</a>` : ''}</p>`;
    }
    if (freqHtml) freqHtml += '</div>';

    const expansionHtml = e.expansion
      ? `<p class="expansion">${lang === 'es' ? 'Sigla de' : 'Acronym for'} <em>${e.expansion[lang] || e.expansion.es}</em></p>` : '';
    // ── Laguna terminológica en español cubierta solo por el préstamo ──
    const loanGapHtml = (e.gap || {}).es === 'prestamo'
      ? `<p class="proposed-note">${lang === 'es'
          ? 'Laguna terminológica: en el corpus español solo se documenta el préstamo.'
          : 'Terminological gap: only the loanword is attested in the Spanish corpus.'}</p>`
      : '';

    // Relaciones: mini-red (enlaza con la red completa) y etiquetas de los términos
    const relatedHtml = relatedTags ? `<div class="aside-sec">
        <span class="equiv-label">${lang === 'es' ? 'Relaciones' : 'Relations'}</span>
        ${miniNetHtml(e, primary, relSlugs)}${relatedTags}
      </div>` : '';

    const definitionLabel = lang === 'es' ? 'Definición' : 'Definition';
    let exampleBlock = '';
    if (exampleData.length && !isEntity) {
      EXAMPLES[e.slug] = exampleData.map(c => ({ html: exampleSentence(c), cite: shortCite(c.source) }));
      const subName = lang === 'es'
        ? (exampleLang === 'es' ? 'subcorpus español' : 'subcorpus inglés')
        : (exampleLang === 'es' ? 'Spanish subcorpus' : 'English subcorpus');
      exampleBlock = `<h3>${lang === 'es' ? 'Ejemplo del corpus' : 'Corpus example'} <span class="context-lang">(${subName})</span></h3>
        <div class="example-box" id="example-${e.slug}" data-i="0">${exampleHtml(e.slug, 0)}</div>`;
    }

    const mainHtml = foundByHtml + loanGapHtml + expansionHtml
      + (definitionText ? `<div class="def-head"><h3>${definitionLabel}</h3>${sourcesInfo}</div>${definitionText}` : '')
      + contextPart + notePart + exampleBlock + notesHtml + cleanHtml;
    const asideHtml = equivHtml + linkHtml + variantsHtml + freqHtml + relatedHtml;
    cleanHtml = `<div class="ficha-grid"><div class="ficha-main">${mainHtml}</div><aside class="ficha-aside">${asideHtml}</aside></div>`;

    const cleanEquiv = cleanTerm(e, equivTerm);
    const equivInHeader = showEquiv ? `<span class="entry-translation">${cleanEquiv}</span>` : '';
    card.innerHTML = `
      <summary class="entry-header">
        <span class="entry-terms"><span class="entry-term"><span class="entry-br" aria-hidden="true">[</span>${primary}<span class="entry-br" aria-hidden="true">]</span>${proposedBadge(activeLang)}</span>${equivInHeader}</span>
        <span class="cat-badge ${categoryClass(e)}">${e[t('catKey')]}</span>
      </summary>
      <div class="entry-body">${cleanHtml}</div>`;
    container.appendChild(card);
  });
}

function searchForVariant(encodedForm) {
    searchInput.value = decodeURIComponent(encodedForm);
    applyFilters();
}


function goToEquiv(slug, targetMode, equivTerm) {
    const targetBtn = document.querySelector(`.search-mode-btn[data-mode="${targetMode}"]`);
    if (targetBtn) setSearchMode(targetMode, targetBtn);
    searchInput.value = equivTerm;
    applyFilters();
    setTimeout(() => goToTerm(slug), 200);
}

function goToTerm(slug) {
    slug = resolveSlug(slug) || slug;
    const target = document.getElementById(`term-${slug}`);
    if (target) {
        target.open = true;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.add('flash');
        setTimeout(() => target.classList.remove('flash'), 2000);
    } else {
        const entry = EVERY_ENTRY.find(e => e.slug === slug);
        if (!entry) return;
        const type = entry.type || 'term';
        if (type !== VIEW) {
            window.location.href = `${PAGE_FOR_TYPE[type]}#${slug}`;
            return;
        }
        currentCat = 'All';
        currentLetter = null;
        document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
        renderCategoryButtons();
        const modeButton = document.querySelector(`.search-mode-btn[data-mode="${lang}"]`);
        if (modeButton && searchMode !== lang) {
            searchMode = lang;
            document.querySelectorAll('.search-mode-btn').forEach(b => b.classList.toggle('active', b === modeButton));
            renderAlphabet();
        }
        searchInput.value = lang === 'es' ? entry.term_es : entry.term_en;
        applyFilters();
        setTimeout(() => goToTerm(slug), 200);
    }
}

function openFromHash() {
  const raw = decodeURIComponent(window.location.hash.replace(/^#/, ''));
  if (VIEW === 'entity' && raw.startsWith('group-')) {
    const groupId = raw.slice('group-'.length);
    currentCat = groupId === 'all' || !RESOURCE_GROUPS.some(g => g.id === groupId) ? 'All' : groupId;
    renderCategoryButtons();
    applyFilters();
    return;
  }
  const slug = raw && resolveSlug(raw);
    if (slug && ALL_ENTRIES.some(e => e.slug === slug)) goToTerm(slug);
}

function renderAlphabet() {
  const nav = document.getElementById('alpha-nav');
  nav.innerHTML = '';
  ALPHABET.forEach(l => {
    const btn = document.createElement('button');
    btn.className = 'alpha-btn';
    btn.innerText = l;
    btn.onclick = () => {
      currentLetter = currentLetter === l ? null : l;
      document.querySelectorAll('.alpha-btn').forEach(b => b.classList.toggle('active', b.textContent === currentLetter));
      applyFilters();
    };
    nav.appendChild(btn);
  });
}

searchInput.addEventListener('input', applyFilters);

// Atajo teclado: "/" enfoca el buscador
document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
});

// Botón volver arriba
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.querySelectorAll('.search-mode-btn').forEach(btn => {
  btn.addEventListener('click', () => setSearchMode(btn.dataset.mode, btn));
});
catTrigger.addEventListener('click', toggleCategoryMenu);
document.addEventListener('click', event => {
  if (!document.getElementById('cat-dropdown').contains(event.target)) closeCategoryMenu();
});
loadGlossary();
