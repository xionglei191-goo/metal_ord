import { t, getLang } from '../utils/i18n.js';
import { initAnimations } from '../utils/animations.js';
import { products } from '../data/products.js';

export function renderProducts() {
  const main = document.getElementById('main-content');
  const lang = getLang();
  const isZh = lang === 'zh';

  let activeFilter = 'all';

  function renderProductGrid(filter) {
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    return filtered.map(p => `
      <div class="card product-card" data-product-id="${p.id}">
        <div class="product-card-image">
          <img src="${p.image}" alt="${isZh ? p.nameZh : p.nameEn}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" onerror="this.src='/images/favicon.svg'">
        </div>
        <div class="product-card-body">
          <h3 class="product-card-title">${isZh ? p.nameZh : p.nameEn}</h3>
          <p class="product-card-desc">${isZh ? p.descZh : p.descEn}</p>
          <div class="product-card-meta">
            <span class="product-card-capacity">📦 ${isZh ? p.capacity : p.capacityEn}/${isZh ? '年' : 'yr'}</span>
            <span style="font-size:var(--text-xs);color:var(--color-text-muted);">${isZh ? p.customerZh : p.customerEn}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  main.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1 class="text-gradient-gold">${t('products.pageTitle')}</h1>
        <p>${t('products.pageDesc')}</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="products-filter reveal" id="product-filters">
          <button class="filter-btn active" data-filter="all">${t('products.filterAll')}</button>
          <button class="filter-btn" data-filter="shaft">${t('products.filterShaft')}</button>
          <button class="filter-btn" data-filter="gear">${t('products.filterGear')}</button>
        </div>
        <div class="products-grid stagger-children" id="products-grid">
          ${renderProductGrid('all')}
        </div>
      </div>
    </section>

    <!-- Product Detail Modal -->
    <div class="product-modal" id="product-modal">
      <div class="product-modal-overlay" id="modal-overlay"></div>
      <div class="product-modal-content" id="modal-content"></div>
    </div>
  `;

  // Filter events
  document.getElementById('product-filters')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    const filter = btn.dataset.filter;
    activeFilter = filter;

    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const grid = document.getElementById('products-grid');
    grid.innerHTML = renderProductGrid(filter);

    // Re-bind click events
    bindProductClicks();
  });

  function showModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const content = document.getElementById('modal-content');

    content.innerHTML = `
      <button class="product-modal-close" id="modal-close">✕</button>
      <div style="display:flex;align-items:center;gap:var(--space-4);margin-bottom:var(--space-6);">
        <div style="width:60px;height:60px;display:flex;align-items:center;justify-content:center;border-radius:var(--radius-lg);background:rgba(200,169,110,0.1);overflow:hidden;">
          <img src="${product.image}" alt="${isZh ? product.nameZh : product.nameEn}" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <div>
          <h2 style="font-size:var(--text-2xl);font-weight:var(--font-bold);">${isZh ? product.nameZh : product.nameEn}</h2>
          <span style="font-size:var(--text-sm);color:var(--color-gold);">${t('products.customer')}: ${isZh ? product.customerZh : product.customerEn}</span>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-bottom:var(--space-6);">
        <div class="card" style="padding:var(--space-4);text-align:center;">
          <div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-bottom:var(--space-1);">${t('products.annualCapacity')}</div>
          <div style="font-size:var(--text-xl);font-weight:var(--font-bold);color:var(--color-gold);">${isZh ? product.capacity : product.capacityEn}</div>
        </div>
        <div class="card" style="padding:var(--space-4);text-align:center;">
          <div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-bottom:var(--space-1);">${isZh ? '产品类别' : 'Category'}</div>
          <div style="font-size:var(--text-xl);font-weight:var(--font-bold);color:var(--color-blue);">${product.category === 'shaft' ? (isZh ? '电机轴' : 'Motor Shaft') : (isZh ? '齿轮' : 'Gear')}</div>
        </div>
      </div>

      <div style="margin-bottom:var(--space-6);">
        <h3 style="font-size:var(--text-lg);font-weight:var(--font-semibold);margin-bottom:var(--space-3);color:var(--color-gold);">${t('products.techAdvantage')}</h3>
        <p style="font-size:var(--text-base);color:var(--color-text-secondary);line-height:var(--leading-relaxed);">
          ${isZh ? product.descZh : product.descEn}
        </p>
      </div>

      <div style="margin-bottom:var(--space-6);">
        <h3 style="font-size:var(--text-lg);font-weight:var(--font-semibold);margin-bottom:var(--space-3);color:var(--color-gold);">${t('products.specs')}</h3>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);">
          ${(isZh ? product.techZh : product.techEn).split('、').map(tech => `
            <span style="padding:var(--space-1) var(--space-3);border-radius:var(--radius-full);background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.2);font-size:var(--text-sm);color:var(--color-blue-light);">${tech.trim()}</span>
          `).join('')}
        </div>
      </div>

      <a class="btn btn-primary" style="width:100%;" onclick="window.location.hash='/rfq'">${t('hero.cta1')}</a>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Close events
    document.getElementById('modal-close')?.addEventListener('click', closeModal);
    document.getElementById('modal-overlay')?.addEventListener('click', closeModal);
  }

  function closeModal() {
    document.getElementById('product-modal')?.classList.remove('open');
    document.body.style.overflow = '';
  }

  function bindProductClicks() {
    document.querySelectorAll('[data-product-id]').forEach(card => {
      card.addEventListener('click', () => showModal(card.dataset.productId));
    });
  }

  bindProductClicks();

  // Close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  initAnimations();
}
