(function () {
  const style = document.createElement('style');
  style.textContent = `
    footer {
      background: #1e1b4b; color: #ffffff;
      padding: 2.25rem 1.5rem 2.5rem; font-size: 0.82rem; line-height: 1.9;
      border-top: 3px solid;
      border-image: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #f43f5e 100%) 1;
    }
    footer .footer-inner {
      max-width: 1180px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.35rem;
    }
    footer .footer-brand {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.9rem;
      margin-bottom: 0.2rem;
    }
    footer .footer-brand img {
      width: 92px;
      height: auto;
      display: block;
    }
    footer .footer-title {
      font-size: 1rem;
      font-weight: 800;
      line-height: 1.25;
      color: #ffffff;
    }
    footer .footer-copy {
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
      align-items: center;
    }
    footer p {
      color: #cbd5e1;
      text-align: center;
      margin-bottom: 0;
      font-size: 0.84rem;
      line-height: 1.6;
    }
    footer a { color: #a5b4fc; text-decoration: none; }
    footer a:hover { color: #f43f5e; }
    footer .footer-year {
      margin-top: 0.45rem;
      color: #94a3b8;
    }
    @media (max-width: 720px) {
      footer .footer-brand {
        flex-direction: column;
        gap: 0.55rem;
      }
      footer .footer-brand img {
        width: 82px;
      }
    }
  `;
  document.head.appendChild(style);

  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <img src="assets/img/logo3.png" alt="GLiCor">
      </div>
      <div class="footer-copy">
        <p>Isabel Moyano Moreno · Universidad de Cádiz</p>
        <p><a href="mailto:isabel.moyano@uca.es">isabel.moyano@uca.es</a> · <a href="https://orcid.org/0000-0003-4284-8897" target="_blank">ORCID 0000-0003-4284-8897</a></p>
        <p class="footer-year">© 2026</p>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
})();
