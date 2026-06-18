import { t, getLang, setLang, onLangChange } from '../utils/i18n.js';
import { navigate, getCurrentPath, onRouteChange } from '../router.js';

export function renderNavbar() {
  const navbar = document.getElementById('navbar');

  function render() {
    const lang = getLang();
    const currentPath = getCurrentPath();

    const links = [
      { path: '/', label: t('nav.home') },
      { path: '/about', label: t('nav.about') },
      { path: '/products', label: t('nav.products') },
      { path: '/manufacturing', label: t('nav.manufacturing') },
      { path: '/rfq', label: t('nav.rfq') },
      { path: '/contact', label: t('nav.contact') },
    ];

    navbar.className = 'navbar';
    navbar.innerHTML = `
      <div class="navbar-inner">
        <a class="navbar-logo" data-nav="/">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="url(#logo-grad)"/>
            <path d="M12 28V12h4l4 8 4-8h4v16h-4V18l-4 8-4-8v10h-4z" fill="#0A1628"/>
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40">
                <stop stop-color="#C8A96E"/>
                <stop offset="1" stop-color="#A68B52"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="navbar-logo-text">
            <span class="zh">${lang === 'zh' ? '升方金属' : 'Shengfang'}</span>
            <span class="en">${lang === 'zh' ? 'SHENGFANG METAL' : 'METAL PRODUCTS'}</span>
          </div>
        </a>

        <div class="navbar-links">
          ${links.map(link => `
            <a class="navbar-link ${currentPath === link.path ? 'active' : ''}" data-nav="${link.path}">
              ${link.label}
            </a>
          `).join('')}
        </div>

        <div class="navbar-actions">
          <div class="lang-toggle" id="lang-toggle">
            <span class="lang-option ${lang === 'zh' ? 'active' : ''}" data-lang="zh">中</span>
            <span class="lang-option ${lang === 'en' ? 'active' : ''}" data-lang="en">EN</span>
          </div>
          <a class="btn btn-primary navbar-cta" data-nav="/rfq">${t('nav.getQuote')}</a>
        </div>

        <div class="hamburger" id="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="mobile-nav" id="mobile-nav">
        ${links.map(link => `
          <a class="navbar-link ${currentPath === link.path ? 'active' : ''}" data-nav="${link.path}" data-mobile="true">
            ${link.label}
          </a>
        `).join('')}
        <div class="lang-toggle" id="mobile-lang-toggle">
          <span class="lang-option ${lang === 'zh' ? 'active' : ''}" data-lang="zh">中文</span>
          <span class="lang-option ${lang === 'en' ? 'active' : ''}" data-lang="en">EN</span>
        </div>
        <a class="btn btn-primary btn-lg" data-nav="/rfq" data-mobile="true">${t('nav.getQuote')}</a>
      </div>
    `;

    // Event: Nav links
    navbar.querySelectorAll('[data-nav]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const path = link.dataset.nav;
        navigate(path);
        closeMobileNav();
      });
    });

    // Event: Language toggle
    navbar.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        setLang(btn.dataset.lang);
      });
    });

    // Event: Hamburger
    const hamburger = document.getElementById('hamburger');
    hamburger?.addEventListener('click', toggleMobileNav);
  }

  function toggleMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    hamburger?.classList.toggle('open');
    mobileNav?.classList.toggle('open');
    document.body.style.overflow = mobileNav?.classList.contains('open') ? 'hidden' : '';
  }

  function closeMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    hamburger?.classList.remove('open');
    mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scroll;
  });

  render();
  onLangChange(render);
  onRouteChange(render);
}
