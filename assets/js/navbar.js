(function () {
  const page = document.body.dataset.page || '';
  const lang = localStorage.getItem('glicor-lang') || 'es';

  const items = [
    { key: 'index', href: 'index.html', es: 'Inicio', en: 'Home' },
    { key: 'about', href: 'about.html', es: 'Acerca de', en: 'About' },
    { key: 'recursos', href: 'recursos.html', es: 'Recursos', en: 'Resources' },
    { key: 'corpus', href: 'corpus.html', es: 'Corpus', en: 'Corpus' },
    { key: 'guide', href: 'guide.html', es: 'Guía', en: 'Guide' },
    { key: 'stats', href: 'stats.html', es: 'Estadísticas', en: 'Stats' }
  ];
  const resourceGroups = [
    { id: 'all', es: 'Todos los recursos', en: 'All resources' },
    { id: 'corpora', es: 'Corpus y colecciones', en: 'Corpora and collections' },
    { id: 'lexical', es: 'Recursos léxicos', en: 'Lexical resources' },
    { id: 'query', es: 'Consulta y análisis de corpus', en: 'Corpus querying and analysis' },
    { id: 'nlp', es: 'Anotación y procesamiento lingüístico', en: 'Annotation and language processing' },
    { id: 'collection', es: 'Recopilación y construcción', en: 'Corpus collection and building' },
    { id: 'translation', es: 'Traducción y alineación', en: 'Translation and alignment' },
    { id: 'development', es: 'Programación y bibliotecas', en: 'Programming and libraries' },
  ];

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    body { animation: fadeIn 0.35s ease both; }
    body.fade-out { opacity: 0; transform: translateY(-8px); transition: opacity 0.25s ease, transform 0.25s ease; }
    .navbar {
      position: fixed; top: 0; width: 100%; z-index: 1000;
      background: rgba(30, 27, 75, 0.8); backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.8rem 2rem; display: flex; align-items: center; gap: 2.5rem;
    }
    .navbar a { color: #cbd5e1; text-decoration: none; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; transition: 0.3s; }
    .navbar a:hover { color: #f43f5e; }
    .navbar a.active { color: white; border-bottom: 2px solid #f43f5e; padding-bottom: 4px; }
    .nav-menu { position: relative; display: flex; align-items: center; gap: 0.35rem; }
    .nav-menu-toggle { border: 0; background: transparent; color: #cbd5e1; font-size: 0.9rem; cursor: pointer; padding: 0.25rem; }
    .nav-menu-toggle:hover, .nav-menu.open .nav-menu-toggle { color: white; }
    .nav-dropdown-panel { display: none; position: absolute; top: 100%; left: -0.8rem; width: min(315px, calc(100vw - 1rem)); max-height: min(70vh, 480px); overflow-y: auto; padding: 0.45rem; border: 1px solid rgba(255,255,255,0.13); border-radius: 12px; background: rgba(30,27,75,0.98); box-shadow: 0 14px 36px rgba(15,23,42,0.25); }
    .nav-menu.open .nav-dropdown-panel { display: block; }
    .navbar .nav-dropdown-panel a { display: block; padding: 0.7rem 0.8rem; border: 0; border-radius: 8px; color: #cbd5e1; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.01em; line-height: 1.35; text-transform: none; white-space: normal; }
    .navbar .nav-dropdown-panel a:hover { color: white; background: rgba(255,255,255,0.1); }
    .nav-dropdown-divider { height: 1px; margin: 0.35rem 0; background: rgba(255,255,255,0.14); }
    @media (max-width: 720px) { .nav-dropdown-panel { left: auto; right: -0.5rem; } }
    #lang-toggle {
      margin-left: auto; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.25);
      color: #cbd5e1; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em;
      padding: 0.3rem 0.8rem; border-radius: 20px; cursor: pointer; transition: 0.3s;
    }
  `;
  document.head.appendChild(style);

  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.innerHTML = `
    ${items.map(item => {
      if (item.key !== 'recursos') return `<a href="${item.key === page ? '#' : item.href}" class="${item.key === page ? 'active' : ''}" data-es="${item.es}" data-en="${item.en}">${item[lang]}</a>`;
      const resourceHref = item.key === page ? '#' : item.href;
      return `<div class="nav-menu" id="resource-nav-menu">
        <a href="${resourceHref}" class="${item.key === page ? 'active' : ''}" data-es="${item.es}" data-en="${item.en}">${item[lang]}</a>
        <button type="button" class="nav-menu-toggle" aria-expanded="false" data-label-es="Abrir grupos de recursos" data-label-en="Open resource groups" aria-label="${lang === 'es' ? 'Abrir grupos de recursos' : 'Open resource groups'}">▾</button>
        <div class="nav-dropdown-panel">
          ${resourceGroups.map((group, index) => `${index === 1 ? '<div class="nav-dropdown-divider"></div>' : ''}<a href="recursos.html#group-${group.id}" data-es="${group.es}" data-en="${group.en}">${group[lang]}</a>`).join('')}
        </div>
      </div>`;
    }).join('')}
    <button id="lang-toggle" type="button">${lang === 'es' ? 'EN' : 'ES'}</button>
  `;

  document.body.prepend(nav);

  window.syncNavbar = function (nextLang) {
    document.querySelectorAll('.navbar [data-es][data-en]').forEach(el => {
      el.textContent = el.dataset[nextLang];
    });
    const menuToggle = document.querySelector('.nav-menu-toggle');
    if (menuToggle) menuToggle.setAttribute('aria-label', menuToggle.dataset[`label${nextLang === 'es' ? 'Es' : 'En'}`]);
    const button = document.getElementById('lang-toggle');
    if (button) button.textContent = nextLang === 'es' ? 'EN' : 'ES';
  };

  const button = document.getElementById('lang-toggle');
  if (button) {
    button.addEventListener('click', () => {
      if (typeof window.toggleLang === 'function') window.toggleLang();
    });
  }

  const resourceMenu = document.getElementById('resource-nav-menu');
  const menuToggle = resourceMenu && resourceMenu.querySelector('.nav-menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const open = resourceMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', event => {
      if (!resourceMenu.contains(event.target)) {
        resourceMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        resourceMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    });
  }

  document.querySelectorAll('.navbar a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => { window.location.href = href; }, 250);
    });
  });
})();
