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
      filterLabel:       'Filtrar por tipo',
      allCategories:     'Todos',
      emptyMsg:          'Escribe en el buscador o selecciona un tipo para explorar el índice de recursos.',
      noResults:         'No se encontraron recursos.',
      catKey:            'category',
      results:           n => n === 1 ? '1 recurso encontrado' : `${n} recursos encontrados`,
    },
    en: {
      searchPlaceholder: 'Search resource...',
      searchModeLabel:   'Search language',
      filterLabel:       'Filter by type',
      allCategories:     'All',
      emptyMsg:          'Type in the search box or select a type to browse the resource index.',
      noResults:         'No resources found.',
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
    catKey:            'category_en',
    results:           n => n === 1 ? '1 term found' : `${n} terms found`,
  },
}; }

const STRINGS = STRINGS_BY_VIEW[VIEW];

let lang = localStorage.getItem('glicor-lang') || 'es';
let ALL_ENTRIES = [];      // solo las de esta vista
let EVERY_ENTRY = [];      // todas (términos + entidades), para enlaces cruzados
let ALL_CONCORDANCES = {};
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

// Variante denominativa consolidada: se muestra junto a la forma principal
function isConsolidated(v) {
  return v.consolidated === true;
}

function relationLabel(v) {
  if (isConsolidated(v)) return lang === 'es' ? 'variante denominativa' : 'denominative variant';
  if (v.rel === 'variante_denominativa') return lang === 'es' ? 'sinónimo' : 'synonym';
  return ((NORM.relaciones || {})[v.rel] || {})[lang] || v.rel.replace(/_/g, ' ');
}

function fmtNum(n) {
  return new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-US').format(n);
}
let currentCat = 'All';
let searchMode = 'es';
const container = document.getElementById('entries-container');
const searchInput = document.getElementById('search');
const catTrigger = document.getElementById('cat-trigger');
const catMenu = document.getElementById('cat-nav');

function t(key) { return STRINGS[lang][key]; }

function getMsgEmpty() {
  return `<div class="placeholder-msg">${t('emptyMsg')}</div>`;
}

// El índice de recursos es corto: se muestra completo por defecto.
function showDefault() {
  if (VIEW === 'entity') {
    renderEntries(sortEntries(ALL_ENTRIES));
  } else {
    document.getElementById('results-count').style.display = 'none';
    container.innerHTML = getMsgEmpty();
  }
}

function getDisplayTerm(entry) {
  return lang === 'es' ? entry.term_es : entry.term_en;
}

function getEntryLetter(entry) {
  return (searchMode === 'es' ? entry.term_es : entry.term_en).trim().charAt(0).toUpperCase();
}

function sortEntries(list) {
  return [...list].sort((a, b) => getDisplayTerm(a).localeCompare(getDisplayTerm(b), lang));
}

async function loadGlossary() {
  try {
    const v = Date.now();
    const [entriesRes, concRes, normData] = await Promise.all([
      fetch('assets/data/entries.json?v=' + v),
      fetch('assets/data/concordances.json?v=' + v),
      fetch('assets/data/normalizacion.json?v=' + v).then(r => r.ok ? r.json() : null).catch(() => null),
    ]);
    EVERY_ENTRY       = await entriesRes.json();
    ALL_ENTRIES       = EVERY_ENTRY.filter(e => (e.type || 'term') === VIEW);
    ALL_CONCORDANCES  = await concRes.json();
    if (normData) NORM = normData;
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
  document.getElementById('no-results').textContent = s.noResults;
  currentCat = 'All';
  showDefault();
  renderAlphabet();
  renderCategoryButtons();
}

function toggleLang() {
  lang = lang === 'es' ? 'en' : 'es';
  localStorage.setItem('glicor-lang', lang);
  applyLang();
}

function renderCategoryButtons() {
    const catKey = t('catKey');
    catMenu.innerHTML = '';
    const seen = new Set();
    ALL_ENTRIES.forEach(e => seen.add(e[catKey]));
    const categories = ['All', ...[...seen].sort()];
    categories.forEach(cat => {
        const option = document.createElement('button');
        option.type = 'button';
        option.className = `cat-option${cat === currentCat ? ' active' : ''}`;
        option.dataset.value = cat;
        option.textContent = cat === 'All' ? t('allCategories') : cat;
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
    const label = currentCat === 'All' ? t('allCategories') : currentCat;
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
    
    // Si no hay nada escrito y no hay filtro de categoría, volvemos al estado oculto
    if (query === '' && currentCat === 'All') {
        showDefault();
        document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
        return;
    }

    const catKey = t('catKey');
    const filtered = ALL_ENTRIES.filter(e => {
        const names = [searchMode === 'es' ? e.term_es : e.term_en, ...variantForms(e, searchMode)];
        const matchesSearch = names.some(n => n.toLowerCase().includes(query));
        const matchesCat = currentCat === 'All' || e[catKey] === currentCat;
        return matchesSearch && matchesCat;
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

function renderEntries(list) {
  container.innerHTML = '';
  document.getElementById('no-results').style.display = list.length === 0 ? 'block' : 'none';
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
    if (enMatch && esMatch) {
        const before  = cleanHtml.substring(0, cleanHtml.indexOf(enMatch[0]));
        const afterEs = cleanHtml.substring(cleanHtml.indexOf(esMatch[0]) + esMatch[0].length);
        const definitionHtml = searchMode === 'en'
          ? `<h3>Definition (EN)</h3>${enMatch[1]}`
          : `<h3>Definición (ES)</h3>${esMatch[1]}`;
        cleanHtml = before
            + definitionHtml
            + afterEs;
    }

    // 2. Términos relacionados como tags clicables
    if (cleanHtml.includes('Relación con otros términos')) {
        const parts = cleanHtml.split(/<h3.*?>Relación con otros términos.*?<\/h3>/);
        const nextHeader = parts[1].indexOf('<h3');
        const relationsSection = parts[1].substring(0, nextHeader !== -1 ? nextHeader : parts[1].length);
        const items = relationsSection.match(/<li><strong>(.*?)<\/strong>/g);
        if (items) {
            const relLabel = lang === 'es' ? 'Términos relacionados' : 'Related terms';
            let tagsHtml = `<h3>${relLabel}</h3><ul class="related-list">`;
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
            });
            tagsHtml += '</ul>';
            cleanHtml = parts[0] + tagsHtml + (nextHeader !== -1 ? parts[1].substring(nextHeader) : '');
        }
    }

    // 3. Fuentes de la definición (extraídas del HTML de la entrada)
    const enSrcM = cleanHtml.match(/<h3[^>]*>Fuentes del corpus \(EN\) \/ Corpus sources \(EN\)<\/h3>\s*(<ul>[\s\S]*?<\/ul>)/);
    const esSrcM = cleanHtml.match(/<h3[^>]*>Fuentes del corpus \(ES\) \/ Corpus sources \(ES\)<\/h3>\s*(<ul>[\s\S]*?<\/ul>)/);
    cleanHtml = cleanHtml.replace(/<h3[^>]*>Fuentes del corpus \((?:EN|ES)\) \/ Corpus sources \((?:EN|ES)\)<\/h3>\s*<ul>[\s\S]*?<\/ul>/g, '');

    const parseBiblio = (ulHtml) => {
      const refs = [], seen = new Set();
      ulHtml.replace(/<li>([\s\S]*?)<\/li>/g, (_, li) => {
        const attrM = li.match(/<em>\(([^)]+)\)<\/em>/);
        if (!attrM || seen.has(attrM[1])) return;
        seen.add(attrM[1]);
        const parts = attrM[1].split('_');
        const authors = parts[1] || '', year = parts[0] || '', title = parts.slice(2).join(': ') || '';
        let entry = authors ? `${authors} (${year})` : `(${year})`;
        if (title) entry += `. <em>${title}</em>`;
        refs.push(`<li>${entry}</li>`);
      });
      return refs;
    };
    const biblioItems = [
      ...(enSrcM ? parseBiblio(enSrcM[1]) : []),
      ...(esSrcM ? parseBiblio(esSrcM[1]) : []),
    ];
    // Deduplicar por texto completo
    const biblioUniq = [...new Map(biblioItems.map(x => [x, x])).values()];

    // 4. Concordancias KWIC desde concordances.json
    const activeLang = searchMode === 'en' ? 'en' : 'es';
    const concSeen   = new Set();
    const concData   = [e.slug, ...(e.aliases || [])]
      .flatMap(s => (ALL_CONCORDANCES[s] || {})[activeLang] || [])
      .filter(c => { const k = c.left + c.keyword + c.right; if (concSeen.has(k)) return false; concSeen.add(k); return true; });

    const makeConcItem = c =>
      `<li><span class="kwic-line">${c.left}<strong class="kwic-key">${c.keyword}</strong>${c.right}</span><br><span class="src-attr">${c.source}</span></li>`;

    const uid          = e.slug;
    const fuentesLabel = lang === 'es' ? 'Fuentes de la definición' : 'Definition sources';
    const concordLabel = lang === 'es' ? 'Concordancias' : 'Concordances';

    const isEntity = (e.type || 'term') === 'entity';
    if (biblioUniq.length > 0 && !isEntity) {
      cleanHtml += `<details class="sources-details" id="biblio-${uid}">
        <summary class="sources-summary">${fuentesLabel}</summary>
        <div class="sources-inner"><ul class="src-panel">${biblioUniq.join('')}</ul></div>
      </details>`;
    }
    if (concData.length > 0 && !isEntity) {
      cleanHtml += `<details class="sources-details" id="conc-${uid}">
        <summary class="sources-summary">${concordLabel}</summary>
        <div class="sources-inner"><ul class="src-panel">${concData.map(makeConcItem).join('')}</ul></div>
      </details>`;
    }

    // ── Equivalente en la otra lengua ──
    const primary   = searchMode === 'en' ? e.term_en : e.term_es;
    const equivTerm = searchMode === 'en' ? (e.equiv_es || '') : (e.equiv_en || '');
    const equivLang = searchMode === 'en' ? 'es' : 'en';
    const showEquiv = equivTerm && equivTerm.toLowerCase() !== primary.toLowerCase();
    let equivHtml = '';
    if (showEquiv) {
      const equivLabelText = lang === 'es'
        ? (equivLang === 'en' ? 'Equivalente en inglés' : 'Equivalente en español')
        : (equivLang === 'en' ? 'English equivalent' : 'Spanish equivalent');
      const safeEquiv = equivTerm.replace(/'/g, "\\'");
      equivHtml = `<div class="equiv-section">
        <span class="equiv-label">${equivLabelText}</span>
        <span class="equiv-chip" onclick="goToEquiv('${e.slug}','${equivLang}','${safeEquiv}')">${equivTerm}</span>
      </div>`;
    }

    // ── Tabla de frecuencias ──
    let freqHtml = '';
    if (e.freq && (e.freq.en || e.freq.es)) {
      const freqTitle = lang === 'es' ? 'Frecuencia en corpus' : 'Corpus frequency';
      const colAbs = lang === 'es' ? 'Frec. abs.' : 'Abs. freq.';
      const colRel = lang === 'es' ? 'Frec. rel.' : 'Rel. freq.';
      const colPmw = lang === 'es' ? 'Por millón' : 'Per million';
      const row = (label, d) => d
        ? `<tr><td>${label}</td><td>${d.abs}</td><td>${d.rel}</td><td>${d.pmw}</td></tr>`
        : '';
      freqHtml = `<h3>${freqTitle}</h3>
        <table class="freq-table">
          <thead><tr><th>Subcorpus</th><th>${colAbs}</th><th>${colRel}</th><th>${colPmw}</th></tr></thead>
          <tbody>${row('EN', e.freq.en)}${row('ES', e.freq.es)}</tbody>
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
          ? `<p class="found-by">Has buscado «${hit.form}» (${relationLabel(hit)}): remite a esta entrada.</p>`
          : `<p class="found-by">You searched for «${hit.form}» (${relationLabel(hit)}): it points to this entry.</p>`;
      }
    }

    // ── Variantes y sinónimos unificados en esta entrada ──
    let variantsHtml = '';
    if (vars.length) {
      const title = lang === 'es' ? 'Variantes y sinónimos' : 'Variants and synonyms';
      const docsLbl = lang === 'es' ? 'doc.' : 'docs';
      const undocumented = lang === 'es' ? 'no documentada en el corpus' : 'not attested in the corpus';
      variantsHtml = `<div class="equiv-section variants-section">
        <span class="equiv-label">${title}</span>
        ${vars.map(v => `<span class="variant-chip${isConsolidated(v) ? ' consolidated' : ''}">${v.form} <span class="variant-rel">${relationLabel(v)} · ${
          v.n ? `${fmtNum(v.n)} · ${v.docs} ${docsLbl}` : undocumented}</span></span>`).join('')}
      </div>`;
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
        <a href="normalizacion.html${e.norm ? '#' + e.slug : '#frecuencias'}">${more} ↗</a></p>`;
    }

    // ── Equivalente propuesto (sin apariciones en el corpus) ──
    const proposed = l => (e.proposed || {})[l];
    const proposedLbl = lang === 'es' ? 'propuesta' : 'proposed';
    const proposedTitle = lang === 'es'
      ? 'Equivalente propuesto en el glosario: no aparece en el corpus'
      : 'Equivalent proposed by the glossary: not attested in the corpus';
    const proposedBadge = l => proposed(l) ? ` <span class="proposed-badge" title="${proposedTitle}">${proposedLbl}</span>` : '';
    const expansionHtml = e.expansion
      ? `<p class="expansion">${lang === 'es' ? 'Sigla de' : 'Acronym for'} <em>${e.expansion[lang] || e.expansion.es}</em></p>` : '';
    const proposedLangs = ['es', 'en'].filter(proposed);
    const proposedHtml = proposedLangs.length
      ? `<p class="proposed-note">${lang === 'es'
          ? `«${proposedLangs.map(l => l === 'es' ? e.term_es : e.term_en).join('», «')}» es un equivalente propuesto en el glosario: no aparece en el corpus${proposedLangs.includes('es') ? ' español' : ' inglés'}.`
          : `«${proposedLangs.map(l => l === 'es' ? e.term_es : e.term_en).join('», «')}» is an equivalent proposed by the glossary: it is not attested in the ${proposedLangs.includes('es') ? 'Spanish' : 'English'} corpus.`}</p>`
      : '';

    // ── Laguna terminológica en español cubierta solo por el préstamo ──
    const loanGapHtml = (e.gap || {}).es === 'prestamo'
      ? `<p class="proposed-note">${lang === 'es'
          ? 'Laguna terminológica: en el corpus español solo se documenta el préstamo.'
          : 'Terminological gap: only the loanword is attested in the Spanish corpus.'}</p>`
      : '';

    cleanHtml = foundByHtml + loanGapHtml + expansionHtml + linkHtml + equivHtml + proposedHtml + variantsHtml + notesHtml + cleanHtml + freqHtml;

    const equivInHeader = showEquiv ? `<span class="entry-term-es">${equivTerm}${proposedBadge(equivLang)}</span>` : '';
    const consolidatedInHeader = vars.filter(isConsolidated).map(v => `<span class="entry-variant"> · ${v.form}</span>`).join('');
    // ── Procedencia de la ficha ──
    const provenance = e.model === 'claude'
      ? (lang === 'es' ? 'Ficha redactada con Claude a partir de contextos del corpus.' : 'Entry written with Claude from corpus contexts.')
      : (lang === 'es' ? 'Ficha redactada con GPT-4o-mini a partir de fragmentos del corpus (RAG).' : 'Entry written with GPT-4o-mini from corpus excerpts (RAG).');
    cleanHtml += `<p class="provenance">${provenance} <a href="normalizacion.html#fichas">${lang === 'es' ? 'Método' : 'Method'} ↗</a></p>`;

    card.innerHTML = `
      <summary class="entry-header">
        <span><span class="entry-term">${primary}</span>${proposedBadge(activeLang)}${consolidatedInHeader}${equivInHeader}</span>
        <span class="cat-badge">${e[t('catKey')]}</span>
      </summary>
      <div class="entry-body">${cleanHtml}</div>`;
    container.appendChild(card);
  });
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
        target.style.borderColor = '#a855f7';
        setTimeout(() => target.style.borderColor = '#e2e8f0', 2000);
    } else {
        const entry = EVERY_ENTRY.find(e => e.slug === slug);
        if (!entry) return;
        const type = entry.type || 'term';
        if (type !== VIEW) {
            window.location.href = `${PAGE_FOR_TYPE[type]}#${slug}`;
            return;
        }
        currentCat = 'All';
        renderCategoryButtons();
        searchInput.value = lang === 'es' ? entry.term_es : entry.term_en;
        applyFilters();
        setTimeout(() => goToTerm(slug), 200);
    }
}

function openFromHash() {
    const raw = decodeURIComponent(window.location.hash.replace(/^#/, ''));
    const slug = raw && resolveSlug(raw);
    if (slug && ALL_ENTRIES.some(e => e.slug === slug)) goToTerm(slug);
}

function renderAlphabet() {
  const nav = document.getElementById('alpha-nav');
  nav.innerHTML = '';
  const letters = [...new Set(ALL_ENTRIES.map(getEntryLetter))].sort((a, b) => a.localeCompare(b, lang));
  letters.forEach(l => {
    const btn = document.createElement('button');
    btn.className = 'alpha-btn';
    btn.innerText = l;
    btn.onclick = () => {
      document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Al pulsar una letra, forzamos la vista de esos términos
      renderEntries(sortEntries(ALL_ENTRIES.filter(e => getEntryLetter(e) === l)));
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
