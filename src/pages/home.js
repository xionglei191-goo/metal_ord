import { t, getLang } from '../utils/i18n.js';
import { navigate } from '../router.js';
import { initAnimations, initCounters } from '../utils/animations.js';
import { products, clients } from '../data/products.js';

export function renderHome() {
  const main = document.getElementById('main-content');
  const lang = getLang();
  const isZh = lang === 'zh';

  main.innerHTML = `
    <!-- Hero -->
    <section class="hero" id="hero-section">
      <div class="hero-bg">
        <img class="hero-bg-image" src="/images/factory-hero.png" alt="" loading="eager"/>
        <div class="hero-bg-gradient"></div>
        <div class="hero-bg-pattern"></div>
        <div class="hero-glow hero-glow-1"></div>
        <div class="hero-glow hero-glow-2"></div>
      </div>
      <div class="hero-content">
        <div class="hero-badge">
          <span class="hero-badge-dot"></span>
          ${t('hero.badge')}
        </div>
        <h1 class="hero-title">
          <span class="highlight">${t('hero.title1')}</span><br/>
          ${t('hero.title2')}
        </h1>
        <p class="hero-desc">${t('hero.desc')}</p>
        <div class="hero-actions">
          <a class="btn btn-primary btn-lg" data-nav="/rfq">${t('hero.cta1')}</a>
          <a class="btn btn-secondary btn-lg" data-nav="/about">${t('hero.cta2')}</a>
        </div>
      </div>
      <div class="hero-scroll" data-scroll-to="stats-section">
        <span>${t('hero.scroll')}</span>
        <div class="hero-scroll-line"></div>
      </div>
    </section>

    <!-- Stats -->
    <section class="section" id="stats-section">
      <div class="container">
        <div class="stats-grid reveal">
          <div class="stat-item">
            <div class="stat-number" data-count="${t('stats.years')}" data-suffix="${t('stats.yearsSuffix')}">0</div>
            <div class="stat-label">${t('stats.yearsLabel')}</div>
          </div>
          <div class="stat-item">
            <div class="stat-number" data-count="${t('stats.equipment')}" data-suffix="${t('stats.equipmentSuffix')}">0</div>
            <div class="stat-label">${t('stats.equipmentLabel')}</div>
          </div>
          <div class="stat-item">
            <div class="stat-number" data-count="${t('stats.staff')}" data-suffix="${t('stats.staffSuffix')}">0</div>
            <div class="stat-label">${t('stats.staffLabel')}</div>
          </div>
          <div class="stat-item">
            <div class="stat-number" data-count="${isZh ? '500' : '5'}" data-suffix="${t('stats.outputSuffix')}">0</div>
            <div class="stat-label">${t('stats.outputLabel')}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section" style="background: var(--color-bg-secondary);">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title">${t('products.pageTitle')}</h2>
          <div class="section-divider"></div>
          <p class="section-subtitle">${t('products.pageDesc')}</p>
        </div>
        <div class="products-grid stagger-children">
          ${products.slice(0, 6).map(p => `
            <div class="card product-card" data-product-id="${p.id}">
              <div class="product-card-image">
                <img src="${p.image}" alt="${isZh ? p.nameZh : p.nameEn}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" onerror="this.src='/images/favicon.svg'">
              </div>
              <div class="product-card-body">
                <h3 class="product-card-title">${isZh ? p.nameZh : p.nameEn}</h3>
                <p class="product-card-desc">${isZh ? p.descZh : p.descEn}</p>
                <div class="product-card-meta">
                  <span class="product-card-capacity">📦 ${isZh ? p.capacity : p.capacityEn}/${isZh ? '年' : 'yr'}</span>
                  <span class="product-card-arrow">→</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="text-align:center;margin-top:var(--space-10);" class="reveal">
          <a class="btn btn-secondary btn-lg" data-nav="/products">${t('products.viewDetail')}</a>
        </div>
      </div>
    </section>

    <!-- Core Values -->
    <section class="section">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title">${t('values.title')}</h2>
          <div class="section-divider"></div>
          <p class="section-subtitle">${t('values.subtitle')}</p>
        </div>
        <div class="values-grid stagger-children">
          <div class="card value-card">
            <div class="value-icon">🤝</div>
            <h3>${t('values.integrity')}</h3>
            <p>${t('values.integrityDesc')}</p>
          </div>
          <div class="card value-card">
            <div class="value-icon">🏆</div>
            <h3>${t('values.quality')}</h3>
            <p>${t('values.qualityDesc')}</p>
          </div>
          <div class="card value-card">
            <div class="value-icon">💡</div>
            <h3>${t('values.innovation')}</h3>
            <p>${t('values.innovationDesc')}</p>
          </div>
          <div class="card value-card">
            <div class="value-icon">🎯</div>
            <h3>${t('values.service')}</h3>
            <p>${t('values.serviceDesc')}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Client Marquee -->
    <section class="section" style="background: var(--color-bg-secondary);">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title">${t('clients.title')}</h2>
          <div class="section-divider"></div>
          <p class="section-subtitle">${t('clients.subtitle')}</p>
        </div>
      </div>
      <div class="client-marquee">
        <div class="client-track">
          ${[...clients, ...clients].map(c => `
            <div class="client-logo">${isZh ? c.nameZh : c.nameEn}</div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container">
        <div class="reveal" style="text-align:center;padding:var(--space-16) 0;">
          <h2 style="font-size:var(--text-4xl);font-weight:var(--font-bold);margin-bottom:var(--space-4);">
            ${isZh ? '准备开始您的项目？' : 'Ready to Start Your Project?'}
          </h2>
          <p style="font-size:var(--text-lg);color:var(--color-text-secondary);margin-bottom:var(--space-8);max-width:600px;margin-left:auto;margin-right:auto;">
            ${isZh ? '联系我们获取专业报价，我们的工程团队将在24小时内回复您。' : 'Contact us for a professional quote. Our engineering team will respond within 24 hours.'}
          </p>
          <div style="display:flex;gap:var(--space-4);justify-content:center;flex-wrap:wrap;">
            <a class="btn btn-primary btn-lg" data-nav="/rfq">${t('hero.cta1')}</a>
            <a class="btn btn-secondary btn-lg" data-nav="/contact">${t('nav.contact')}</a>
          </div>
        </div>
      </div>
    </section>
  `;

  // Event bindings
  main.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(link.dataset.nav);
    });
  });

  // Scroll indicator
  main.querySelector('[data-scroll-to]')?.addEventListener('click', () => {
    document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Product card clicks
  main.querySelectorAll('[data-product-id]').forEach(card => {
    card.addEventListener('click', () => {
      navigate('/products');
    });
  });

  // Init animations
  initAnimations();
  initCounters();
}
