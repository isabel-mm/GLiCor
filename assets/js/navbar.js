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
    ${items.map(item => `<a href="${item.key === page ? '#' : item.href}" class="${item.key === page ? 'active' : ''}" data-es="${item.es}" data-en="${item.en}">${item[lang]}</a>`).join('')}
    <button id="lang-toggle" type="button">${lang === 'es' ? 'EN' : 'ES'}</button>
  `;

  document.body.prepend(nav);

  window.syncNavbar = function (nextLang) {
    document.querySelectorAll('.navbar a[data-es][data-en]').forEach(el => {
      el.textContent = el.dataset[nextLang];
    });
    const button = document.getElementById('lang-toggle');
    if (button) button.textContent = nextLang === 'es' ? 'EN' : 'ES';
  };

  const button = document.getElementById('lang-toggle');
  if (button) {
    button.addEventListener('click', () => {
      if (typeof window.toggleLang === 'function') window.toggleLang();
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
