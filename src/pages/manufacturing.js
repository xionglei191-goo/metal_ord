import { t, getLang } from '../utils/i18n.js';
import { initAnimations } from '../utils/animations.js';

export function renderManufacturing() {
  const main = document.getElementById('main-content');
  const lang = getLang();
  const isZh = lang === 'zh';
  const capabilities = t('manufacturing.capabilities');
  const processSteps = t('manufacturing.processSteps');
  const qualityItems = t('manufacturing.qualityItems');

  const svgIcons = [
    // 0: 精密数控车削
    `
      <svg viewBox="0 0 100 100" class="mfg-svg-icon" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%;">
        <rect x="15" y="30" width="12" height="40" rx="2" fill="rgba(200, 169, 110, 0.1)" stroke="var(--color-gold)" />
        <rect x="27" y="38" width="6" height="24" stroke="var(--color-gold)" />
        <rect x="19" y="22" width="4" height="8" rx="1" stroke="var(--color-gold)" />
        <rect x="19" y="70" width="4" height="8" rx="1" stroke="var(--color-gold)" />
        <path d="M33 42h35v16H33z" stroke="var(--color-gold)" fill="rgba(200, 169, 110, 0.05)" />
        <path d="M68 46h12v8H68z" stroke="var(--color-gold)" />
        <path d="M10 50a5 5 0 0 1 3-4.5M10 50a5 5 0 0 0 3 4.5" stroke="var(--color-gold)" stroke-dasharray="2 2" />
        <path d="M60 78l-5-12h15l-3 12z" fill="rgba(59, 130, 246, 0.1)" stroke="var(--color-blue)" />
        <path d="M55 66l-4-4 4-2" stroke="var(--color-blue)" stroke-width="2" />
        <path d="M50 56l-3 3M49 53l-4 1M52 59l-2 4" stroke="var(--color-gold)" stroke-width="1" />
        <path d="M33 34h35M33 31v6M68 31v6" stroke="var(--color-text-muted)" stroke-width="1" />
      </svg>
    `,
    // 1: 精密磨削
    `
      <svg viewBox="0 0 100 100" class="mfg-svg-icon" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%;">
        <circle cx="42" cy="42" r="24" stroke="var(--color-blue)" fill="rgba(59, 130, 246, 0.05)" />
        <circle cx="42" cy="42" r="6" stroke="var(--color-blue)" />
        <path d="M42 18v6M42 60v6M18 42h6M60 42h6" stroke="var(--color-blue)" opacity="0.5" />
        <circle cx="72" cy="58" r="14" stroke="var(--color-gold)" fill="rgba(200, 169, 110, 0.1)" />
        <circle cx="72" cy="58" r="3" stroke="var(--color-gold)" />
        <path d="M38 10a30 30 0 0 1 8 0M76 40a18 18 0 0 1 0 8" stroke="var(--color-text-muted)" stroke-dasharray="2 2" />
        <path d="M56 50l5-3M58 53l6-1M55 52l4-5" stroke="var(--color-gold)" stroke-width="1.5" />
        <path d="M72 15l-10 12" stroke="var(--color-blue)" stroke-width="2" />
        <path d="M62 27c-1 2-2 4-4 5M60 25c0 2-1 4-2 6" stroke="var(--color-blue)" opacity="0.7" />
      </svg>
    `,
    // 2: 热处理工艺
    `
      <svg viewBox="0 0 100 100" class="mfg-svg-icon" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%;">
        <path d="M20 30c0-5 18-9 40-9s40 4 40 9-18 9-40 9-40-4-40-9z" stroke="var(--color-blue)" stroke-dasharray="4 2" />
        <path d="M20 50c0-5 18-9 40-9s40 4 40 9-18 9-40 9-40-4-40-9z" stroke="var(--color-blue)" stroke-width="2" />
        <path d="M20 70c0-5 18-9 40-9s40 4 40 9-18 9-40 9-40-4-40-9z" stroke="var(--color-blue)" stroke-dasharray="4 2" />
        <path d="M45 15h10v70H45z" stroke="var(--color-gold)" fill="rgba(200, 169, 110, 0.1)" />
        <rect x="42" y="35" width="16" height="30" rx="3" stroke="var(--color-gold)" stroke-width="2" fill="rgba(200, 169, 110, 0.2)" />
        <path d="M34 40c-2 2-2 6 0 8s2 6 0 8M66 40c2 2 2 6 0 8s-2 6 0 8" stroke="var(--color-gold)" />
        <path d="M28 45c-1 1-1 3 0 4s1 3 0 4M72 45c1 1 1 3 0 4s-1 3 0 4" stroke="var(--color-gold)" opacity="0.6" />
      </svg>
    `,
    // 3: 精密锻造
    `
      <svg viewBox="0 0 100 100" class="mfg-svg-icon" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%;">
        <path d="M25 15h50v15H25z" stroke="var(--color-blue)" fill="rgba(59, 130, 246, 0.1)" />
        <path d="M35 30h30v8H35z" stroke="var(--color-blue)" />
        <path d="M50 8v12M42 8v8M58 8v8M50 20l3-3M50 20l-3-3" stroke="var(--color-blue)" />
        <path d="M20 75h60v15H20z" stroke="var(--color-blue)" fill="rgba(59, 130, 246, 0.05)" />
        <path d="M30 65h40v10H30z" stroke="var(--color-blue)" />
        <path d="M33 50c0-6 8-8 17-8s17 2 17 8-8 8-17 8-17-2-17-8z" stroke="var(--color-gold)" fill="rgba(200, 169, 110, 0.25)" stroke-width="2" />
        <path d="M15 50h10M75 50h10M22 45l6 2M78 45l-6 2M22 55l6-2M78 55l-6-2" stroke="var(--color-gold)" stroke-dasharray="2 2" />
      </svg>
    `,
    // 4: 齿轮加工
    `
      <svg viewBox="0 0 100 100" class="mfg-svg-icon" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%;">
        <circle cx="50" cy="62" r="20" stroke="var(--color-gold)" fill="rgba(200, 169, 110, 0.08)" />
        <path d="M50 36l3 6h-6zM50 88l3-6h-6zM24 62l6 3v-6zM76 62l-6 3v-6zM32 44l6 4-3 5zM68 80l-6-4 3-5zM68 44l-6 4 3 5zM32 80l6-4-3-5z" fill="rgba(200, 169, 110, 0.1)" stroke="var(--color-gold)" />
        <rect x="25" y="18" width="50" height="14" rx="2" stroke="var(--color-blue)" fill="rgba(59, 130, 246, 0.1)" />
        <path d="M35 18v14M42 18v14M49 18v14M56 18v14M63 18v14M70 18v14" stroke="var(--color-blue)" />
        <path d="M15 25h70" stroke="var(--color-blue)" stroke-width="2" stroke-dasharray="6 3" />
        <path d="M50 78a16 16 0 0 1 0-32" stroke="var(--color-text-muted)" stroke-dasharray="3 3" />
      </svg>
    `,
    // 5: 数字化检测
    `
      <svg viewBox="0 0 100 100" class="mfg-svg-icon" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%;">
        <path d="M10 20h80M10 40h80M10 60h80M10 80h80M20 10v80M40 10v80M60 10v80M80 10v80" stroke="rgba(200, 169, 110, 0.05)" stroke-width="1" />
        <path d="M25 65h50v20H25z" stroke="var(--color-gold)" fill="rgba(200, 169, 110, 0.05)" />
        <path d="M35 53h30v12H35z" stroke="var(--color-gold)" />
        <path d="M20 58h60" stroke="var(--color-blue)" stroke-width="2" stroke-dasharray="3 1" />
        <path d="M50 10v32" stroke="var(--color-blue)" stroke-width="2.5" />
        <circle cx="50" cy="45" r="3" fill="var(--color-error)" stroke="var(--color-error)" />
        <path d="M53 45h15" stroke="var(--color-gold)" stroke-dasharray="2 2" />
        <text x="70" y="48" fill="var(--color-gold)" font-size="7" font-family="monospace">X:0.002</text>
      </svg>
    `
  ];

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
          ${Array.isArray(capabilities) ? capabilities.map((cap, i) => `
            <div class="card mfg-card">
              <div class="mfg-card-icon">${svgIcons[i] || cap.icon}</div>
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
        <div class="mfg-facility-highlight reveal">
          <div class="mfg-facility-image">
            <img src="/images/factory-aerial.webp" alt="Shengfang Metal Factory">
          </div>
          <div class="mfg-facility-info">
            <h2 style="font-size:var(--text-4xl);font-weight:var(--font-bold);margin-bottom:var(--space-4);">
              ${isZh ? '10,000㎡ 现代化厂房' : '10,000㎡ Modern Facility'}
            </h2>
            <p style="font-size:var(--text-base);color:var(--color-text-secondary);margin-bottom:var(--space-8);line-height:var(--leading-relaxed);">
              ${isZh
                ? '配备120多台进口精密数控设备，24小时自动化产线运行，日产能可达3000+件。我们持续投资先进设备和技术，确保为客户提供最高品质的产品。'
                : 'Equipped with 120+ imported precision CNC machines, 24-hour automated production lines with 3000+ daily output. We continuously invest in advanced equipment and technology to ensure the highest quality products for our clients.'}
            </p>
            <div class="mfg-facility-stats">
              <div class="mfg-facility-stat-item">
                <div class="mfg-facility-stat-number text-gradient-gold">120+</div>
                <div class="mfg-facility-stat-label">${isZh ? '进口设备' : 'CNC Machines'}</div>
              </div>
              <div class="mfg-facility-stat-item">
                <div class="mfg-facility-stat-number text-gradient-gold">24H</div>
                <div class="mfg-facility-stat-label">${isZh ? '自动化产线' : 'Automated Line'}</div>
              </div>
              <div class="mfg-facility-stat-item">
                <div class="mfg-facility-stat-number text-gradient-gold">3000+</div>
                <div class="mfg-facility-stat-label">${isZh ? '日产能' : 'Daily Output'}</div>
              </div>
              <div class="mfg-facility-stat-item">
                <div class="mfg-facility-stat-number text-gradient-gold">0.01</div>
                <div class="mfg-facility-stat-label">${isZh ? 'mm 精度控制' : 'mm Precision'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  initAnimations();
}
