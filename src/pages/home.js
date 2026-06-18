import { t, getLang } from '../utils/i18n.js';
import { navigate } from '../router.js';
import { initAnimations, initCounters } from '../utils/animations.js';
import { products, clients } from '../data/products.js';

export function renderHome() {
  const main = document.getElementById('main-content');
  const lang = getLang();
  const isZh = lang === 'zh';

  const valueIcons = [
    // 0: 诚信共赢 (Integrity)
    `
      <svg viewBox="0 0 100 100" class="value-svg-icon" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="38" cy="50" r="16" stroke="var(--color-blue)" stroke-width="2" fill="rgba(59, 130, 246, 0.05)" />
        <circle cx="62" cy="50" r="16" stroke="var(--color-gold)" stroke-width="2" fill="rgba(200, 169, 110, 0.05)" />
        <path d="M38 50h24" stroke="var(--color-text-muted)" stroke-dasharray="3 3" />
        <circle cx="50" cy="50" r="3" fill="var(--color-gold)" />
        <path d="M50 34c8 0 12 8 12 16s-4 16-12 16-12-8-12-16 4-16 12-16z" stroke="var(--color-text-primary)" stroke-dasharray="2 2" />
        <path d="M38 30v4M62 30v4M38 66v4M62 66v4" stroke="var(--color-text-muted)" />
      </svg>
    `,
    // 1: 卓越品质 (Quality)
    `
      <svg viewBox="0 0 100 100" class="value-svg-icon" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="50" cy="55" r="18" stroke="var(--color-gold)" stroke-width="2.5" fill="rgba(200, 169, 110, 0.1)" />
        <path d="M25 28h50M25 28v14M75 28v14M25 35h50M35 28v7M45 28v7M55 28v7M65 28v7" stroke="var(--color-blue)" />
        <path d="M32 42v18h4v-8h10" stroke="var(--color-blue)" stroke-width="2" />
        <path d="M68 42v18h-4v-8h-10" stroke="var(--color-blue)" stroke-width="2" />
        <path d="M50 37v36" stroke="var(--color-text-muted)" stroke-dasharray="2 2" />
        <circle cx="50" cy="73" r="2" fill="var(--color-gold)" />
      </svg>
    `,
    // 2: 创新驱动 (Innovation)
    `
      <svg viewBox="0 0 100 100" class="value-svg-icon" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M50 18c-15 0-24 10-24 24 0 10 6 16 10 22v8h28v-8c4-6 10-12 10-22 0-14-9-24-24-24z" stroke="var(--color-blue)" stroke-width="2" fill="rgba(59, 130, 246, 0.05)" />
        <circle cx="50" cy="42" r="8" stroke="var(--color-gold)" stroke-width="1.5" />
        <path d="M50 30v4M50 50v4M38 42h4M58 42h4" stroke="var(--color-gold)" />
        <path d="M40 72h20M42 77h16M45 82h10" stroke="var(--color-blue)" stroke-width="2" />
        <path d="M50 10v4M26 26l3 3M14 42h4M26 58l3-3M74 26l-3 3M86 42h-4M74 58l-3-3" stroke="var(--color-gold)" opacity="0.8" />
      </svg>
    `,
    // 3: 客户第一 (Service)
    `
      <svg viewBox="0 0 100 100" class="value-svg-icon" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="50" cy="50" r="30" stroke="var(--color-blue)" stroke-dasharray="4 2" />
        <circle cx="50" cy="50" r="20" stroke="var(--color-blue)" fill="rgba(59, 130, 246, 0.05)" />
        <circle cx="50" cy="50" r="8" stroke="var(--color-gold)" stroke-width="2" fill="rgba(200, 169, 110, 0.1)" />
        <path d="M15 50h70M50 15v70" stroke="var(--color-text-muted)" stroke-width="1" stroke-dasharray="2 2" />
        <path d="M72 28a32 32 0 0 1 6 12l-4-2M78 40l4-6" stroke="var(--color-gold)" stroke-width="1.5" />
        <path d="M28 72a32 32 0 0 1-6-12l4 2M22 60l-4 6" stroke="var(--color-gold)" stroke-width="1.5" />
        <circle cx="50" cy="50" r="2" fill="var(--color-gold)" />
      </svg>
    `
  ];

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
            <div class="value-icon">${valueIcons[0]}</div>
            <h3>${t('values.integrity')}</h3>
            <p>${t('values.integrityDesc')}</p>
          </div>
          <div class="card value-card">
            <div class="value-icon">${valueIcons[1]}</div>
            <h3>${t('values.quality')}</h3>
            <p>${t('values.qualityDesc')}</p>
          </div>
          <div class="card value-card">
            <div class="value-icon">${valueIcons[2]}</div>
            <h3>${t('values.innovation')}</h3>
            <p>${t('values.innovationDesc')}</p>
          </div>
          <div class="card value-card">
            <div class="value-icon">${valueIcons[3]}</div>
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
