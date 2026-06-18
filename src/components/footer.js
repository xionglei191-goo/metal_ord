import { t, onLangChange } from '../utils/i18n.js';
import { navigate } from '../router.js';

export function renderFooter() {
  const footer = document.getElementById('footer-content');

  function render() {
    footer.className = 'footer';
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-brand-logo">
              <svg viewBox="0 0 40 40" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="url(#flogo-grad)"/>
                <path d="M12 28V12h4l4 8 4-8h4v16h-4V18l-4 8-4-8v10h-4z" fill="#0A1628"/>
                <defs><linearGradient id="flogo-grad" x1="0" y1="0" x2="40" y2="40"><stop stop-color="#C8A96E"/><stop offset="1" stop-color="#A68B52"/></linearGradient></defs>
              </svg>
              <span class="text-gradient-gold">升方金属 Shengfang</span>
            </div>
            <p>${t('footer.desc')}</p>
          </div>

          <div class="footer-col">
            <h4>${t('footer.quickLinks')}</h4>
            <ul>
              <li><a data-nav="/">${t('nav.home')}</a></li>
              <li><a data-nav="/about">${t('nav.about')}</a></li>
              <li><a data-nav="/manufacturing">${t('nav.manufacturing')}</a></li>
              <li><a data-nav="/contact">${t('nav.contact')}</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>${t('footer.productsServices')}</h4>
            <ul>
              <li><a data-nav="/products">${t('products.filterShaft')}</a></li>
              <li><a data-nav="/products">${t('products.filterGear')}</a></li>
              <li><a data-nav="/products">${t('products.filterOther')}</a></li>
              <li><a data-nav="/rfq">${t('nav.rfq')}</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>${t('footer.contactInfo')}</h4>
            <div style="display:flex;flex-direction:column;gap:var(--space-4);">
              <div class="footer-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>${t('contact.addressValue')}</span>
              </div>
              <div class="footer-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>${t('contact.phoneValue')}</span>
              </div>
              <div class="footer-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>${t('contact.emailValue')}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>${t('footer.copyright')}</p>
          <p>${t('footer.icp')}</p>
        </div>
      </div>
    `;

    // Nav link events
    footer.querySelectorAll('[data-nav]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navigate(link.dataset.nav);
      });
    });
  }

  render();
  onLangChange(render);
}
