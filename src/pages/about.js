import { t, getLang } from '../utils/i18n.js';
import { initAnimations } from '../utils/animations.js';

export function renderAbout() {
  const main = document.getElementById('main-content');
  const lang = getLang();
  const isZh = lang === 'zh';
  const timeline = t('about.timeline');

  main.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1 class="text-gradient-gold">${t('about.pageTitle')}</h1>
        <p>${t('about.pageDesc')}</p>
      </div>
    </div>

    <!-- Intro -->
    <section class="section">
      <div class="container">
        <div class="about-intro">
          <div class="about-intro-text reveal-left">
            <h2 class="text-gradient-gold">${t('about.introTitle')}</h2>
            <p>${t('about.introP1')}</p>
            <p>${t('about.introP2')}</p>
            <p>${t('about.introP3')}</p>
          </div>
          <div class="about-image reveal-right" style="position:relative;">
            <img src="/images/factory-aerial.webp" alt="Shengfang Metal Factory" style="width:100%;height:100%;object-fit:cover;">
            <div style="position:absolute;bottom:var(--space-4);left:var(--space-4);right:var(--space-4);padding:var(--space-4);background:rgba(15,29,50,0.85);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid var(--color-border);border-radius:var(--radius-lg);display:flex;flex-direction:column;gap:var(--space-1);">
              <span style="font-size:var(--text-base);font-weight:var(--font-semibold);color:var(--color-gold);">
                ${isZh ? '厂房面积 10,000㎡' : 'Factory Area 10,000㎡'}
              </span>
              <span style="font-size:var(--text-xs);color:var(--color-text-secondary);">
                ${isZh ? '浙江省台州市玉环市机电工业园区' : 'Electromechanical Industrial Park, Yuhuan, Taizhou'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats inline -->
    <section class="section" style="background:var(--color-bg-secondary);">
      <div class="container">
        <div class="stats-grid reveal">
          <div class="stat-item">
            <div class="stat-number text-gradient-gold">10,000</div>
            <div class="stat-label">${isZh ? '㎡ 厂房面积' : '㎡ Factory Area'}</div>
          </div>
          <div class="stat-item">
            <div class="stat-number text-gradient-gold">120+</div>
            <div class="stat-label">${isZh ? '台进口数控设备' : 'CNC Machines'}</div>
          </div>
          <div class="stat-item">
            <div class="stat-number text-gradient-gold">102</div>
            <div class="stat-label">${isZh ? '名专业员工' : 'Skilled Staff'}</div>
          </div>
          <div class="stat-item">
            <div class="stat-number text-gradient-gold">IATF</div>
            <div class="stat-label">${isZh ? '16949 质量体系' : '16949 Certified'}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title">${t('about.timelineTitle')}</h2>
          <div class="section-divider"></div>
        </div>
        <div style="max-width:700px;margin:0 auto;">
          <div class="timeline reveal">
            ${Array.isArray(timeline) ? timeline.map(item => `
              <div class="timeline-item">
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-title">${item.title}</div>
                <div class="timeline-desc">${item.desc}</div>
              </div>
            `).join('') : ''}
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section" style="background:var(--color-bg-secondary);">
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
  `;

  initAnimations();
}
