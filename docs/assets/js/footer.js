(function () {
  const style = document.createElement('style');
  style.textContent = `
    footer {
      background: #1e1b4b; color: #ffffff;
      padding: 2.5rem 1.5rem; font-size: 0.84rem; line-height: 1.6;
      border-top: 3px solid;
      border-image: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #f43f5e 100%) 1;
    }
    footer .footer-inner { max-width: 1080px; margin: 0 auto; }
    footer .footer-main {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 2rem;
    }
    footer .footer-wordmark {
      display: block;
      font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 1.9rem;
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.04em;
      margin-bottom: 0.6rem;
    }
    footer .footer-wordmark .wm-br { color: #6366f1; font-weight: 500; }
    footer .footer-wordmark .wm-g { color: #ffffff; }
    footer .footer-wordmark .wm-li { color: #e3a9f2; }
    footer .footer-wordmark .wm-cor { color: #f43f5e; }
    footer .footer-wordmark .wm-cursor {
      display: inline-block; width: 0.08em; height: 0.8em; margin-left: 0.08em; vertical-align: -0.02em;
      background: #f43f5e; animation: footer-wm-blink 1.1s steps(1) infinite;
    }
    @keyframes footer-wm-blink { 50% { opacity: 0; } }
    @media (prefers-reduced-motion: reduce) { footer .footer-wordmark .wm-cursor { animation: none; } }
    footer .footer-tagline {
      color: #94a3b8; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.16em;
    }
    footer .footer-author { text-align: right; color: #cbd5e1; }
    footer .footer-author strong { display: block; color: #ffffff; font-size: 0.95rem; }
    footer a { color: #a5b4fc; text-decoration: none; }
    footer a:hover { color: #f43f5e; }
    footer .footer-brand { display: flex; flex-direction: column; }
    footer .footer-year {
      margin-top: 0.35rem; color: #64748b; font-size: 0.78rem;
      font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
    }
    @media (max-width: 720px) {
      footer .footer-main { flex-direction: column; align-items: center; text-align: center; gap: 1.2rem; }
      footer .footer-author { text-align: center; }
      footer .footer-brand { align-items: center; }
    }
  `;
  document.head.appendChild(style);

  if (!document.querySelector('link[href*="JetBrains+Mono"]')) {
    const font = document.createElement('link');
    font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;800&display=swap';
    document.head.appendChild(font);
  }

  const lang = localStorage.getItem('glicor-lang') || 'es';
  const TEXT = {
    tagline: { es: 'Glosario de Lingüística de Corpus', en: 'Corpus Linguistics Glossary' },
  };

  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-main">
        <div class="footer-brand">
          <span class="footer-wordmark" aria-label="GLiCor"><span class="wm-br" aria-hidden="true">[</span><span class="wm-g">G</span><span class="wm-li">Li</span><span class="wm-cor">Cor</span><span class="wm-br" aria-hidden="true">]</span><span class="wm-cursor" aria-hidden="true"></span></span>
          <span class="footer-tagline" data-footer="tagline">${TEXT.tagline[lang]}</span>
          <span class="footer-year">© 2026</span>
        </div>
        <div class="footer-author">
          <strong>Isabel Moyano Moreno</strong>
          Universidad de Cádiz<br>
          <a href="mailto:isabel.moyano@uca.es">isabel.moyano@uca.es</a> · <a href="https://orcid.org/0000-0003-4284-8897" target="_blank" rel="noopener">ORCID</a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(footer);

  // Las páginas llaman a syncNavbar al cambiar de lengua; el pie se actualiza a la vez
  const syncNavbar = window.syncNavbar;
  window.syncNavbar = function (nextLang) {
    if (syncNavbar) syncNavbar(nextLang);
    footer.querySelectorAll('[data-footer]').forEach(el => { el.textContent = TEXT[el.dataset.footer][nextLang]; });
  };
})();
