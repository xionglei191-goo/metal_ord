import { t, getLang } from '../utils/i18n.js';
import { initAnimations } from '../utils/animations.js';

export function renderManufacturing() {
  const main = document.getElementById('main-content');
  const lang = getLang();
  const isZh = lang === 'zh';
  const capabilities = t('manufacturing.capabilities');
  const processSteps = t('manufacturing.processSteps');
  const qualityItems = t('manufacturing.qualityItems');

  main.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1 class="text-gradient-gold">${t('manufacturing.pageTitle')}</h1>
        <p>${t('manufacturing.pageDesc')}</p>
      </div>
    </div>

    <!-- Capabilities -->
    <section class="section">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title">${t('manufacturing.capTitle')}</h2>
          <div class="section-divider"></div>
        </div>
        <div class="mfg-capabilities stagger-children">
          ${Array.isArray(capabilities) ? capabilities.map(cap => `
            <div class="card mfg-card">
              <div class="mfg-card-icon">${cap.icon}</div>
              <h3>${cap.title}</h3>
              <p>${cap.desc}</p>
            </div>
          `).join('') : ''}
        </div>
      </div>
    </section>

    <!-- Process Flow -->
    <section class="section" style="background:var(--color-bg-secondary);">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title">${t('manufacturing.processTitle')}</h2>
          <div class="section-divider"></div>
        </div>
        <div class="mfg-process reveal">
          ${Array.isArray(processSteps) ? processSteps.map((step, i) => `
            <div class="mfg-process-item">
              <div class="mfg-process-step">${step}</div>
              ${i < processSteps.length - 1 ? '<span class="mfg-process-arrow">→</span>' : ''}
            </div>
          `).join('') : ''}
        </div>
      </div>
    </section>

    <!-- Quality -->
    <section class="section">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title">${t('manufacturing.qualityTitle')}</h2>
          <div class="section-divider"></div>
        </div>
        <div class="values-grid stagger-children">
          ${Array.isArray(qualityItems) ? qualityItems.map(item => `
            <div class="card value-card">
              <div class="value-icon">${item.icon}</div>
              <h3>${item.title}</h3>
              <p>${item.desc}</p>
            </div>
          `).join('') : ''}
        </div>
      </div>
    </section>

    <!-- Equipment Highlight -->
    <section class="section" style="background:var(--color-bg-secondary);">
      <div class="container">
        <div class="reveal" style="text-align:center;padding:var(--space-12) 0;">
          <div style="font-size:6rem;margin-bottom:var(--space-4);">🏭</div>
          <h2 style="font-size:var(--text-4xl);font-weight:var(--font-bold);margin-bottom:var(--space-4);">
            ${isZh ? '10,000㎡ 现代化厂房' : '10,000㎡ Modern Facility'}
          </h2>
          <p style="font-size:var(--text-lg);color:var(--color-text-secondary);max-width:700px;margin:0 auto var(--space-8);line-height:var(--leading-relaxed);">
            ${isZh
              ? '配备120多台进口精密数控设备，24小时自动化产线运行，日产能可达3000+件。我们持续投资先进设备和技术，确保为客户提供最高品质的产品。'
              : 'Equipped with 120+ imported precision CNC machines, 24-hour automated production lines with 3000+ daily output. We continuously invest in advanced equipment and technology to ensure the highest quality products for our clients.'}
          </p>
          <div class="stats-grid" style="max-width:800px;margin:0 auto;">
            <div class="stat-item">
              <div class="stat-number text-gradient-gold">120+</div>
              <div class="stat-label">${isZh ? '进口设备' : 'CNC Machines'}</div>
            </div>
            <div class="stat-item">
              <div class="stat-number text-gradient-gold">24H</div>
              <div class="stat-label">${isZh ? '自动化产线' : 'Automated Line'}</div>
            </div>
            <div class="stat-item">
              <div class="stat-number text-gradient-gold">3000+</div>
              <div class="stat-label">${isZh ? '日产能' : 'Daily Output'}</div>
            </div>
            <div class="stat-item">
              <div class="stat-number text-gradient-gold">0.01</div>
              <div class="stat-label">${isZh ? 'mm 精度控制' : 'mm Precision'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  initAnimations();
}
