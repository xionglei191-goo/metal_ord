import { t, getLang } from '../utils/i18n.js';
import { navigate } from '../router.js';
import { initAnimations } from '../utils/animations.js';

export function renderRFQ() {
  const main = document.getElementById('main-content');
  const lang = getLang();
  const isZh = lang === 'zh';

  main.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1 class="text-gradient-gold">${t('rfq.pageTitle')}</h1>
        <p>${t('rfq.pageDesc')}</p>
      </div>
    </div>

    <!-- Process Steps -->
    <section class="section" style="background:var(--color-bg-secondary);">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title">${t('rfq.processTitle')}</h2>
          <div class="section-divider"></div>
        </div>
        <div class="process-steps reveal">
          <div class="process-step">
            <div class="process-step-number">01</div>
            <div class="process-step-title">${t('rfq.step1')}</div>
            <div class="process-step-desc">${t('rfq.step1Desc')}</div>
          </div>
          <div class="process-step">
            <div class="process-step-number">02</div>
            <div class="process-step-title">${t('rfq.step2')}</div>
            <div class="process-step-desc">${t('rfq.step2Desc')}</div>
          </div>
          <div class="process-step">
            <div class="process-step-number">03</div>
            <div class="process-step-title">${t('rfq.step3')}</div>
            <div class="process-step-desc">${t('rfq.step3Desc')}</div>
          </div>
          <div class="process-step">
            <div class="process-step-number">04</div>
            <div class="process-step-title">${t('rfq.step4')}</div>
            <div class="process-step-desc">${t('rfq.step4Desc')}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- RFQ Form -->
    <section class="section">
      <div class="container">
        <div class="rfq-layout">
          <div class="rfq-info reveal-left">
            <h2 class="text-gradient-gold">${t('rfq.infoTitle')}</h2>
            <p>${t('rfq.infoDesc')}</p>

            <div style="display:flex;flex-direction:column;gap:var(--space-4);">
              <div class="card" style="padding:var(--space-4);display:flex;align-items:center;gap:var(--space-3);">
                <span style="font-size:1.5rem;">📧</span>
                <div>
                  <div style="font-size:var(--text-sm);font-weight:var(--font-semibold);">${t('contact.email')}</div>
                  <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">${t('contact.emailValue')}</div>
                </div>
              </div>
              <div class="card" style="padding:var(--space-4);display:flex;align-items:center;gap:var(--space-3);">
                <span style="font-size:1.5rem;">📞</span>
                <div>
                  <div style="font-size:var(--text-sm);font-weight:var(--font-semibold);">${t('contact.phone')}</div>
                  <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">${t('contact.phoneValue')}</div>
                </div>
              </div>
              <div class="card" style="padding:var(--space-4);display:flex;align-items:center;gap:var(--space-3);">
                <span style="font-size:1.5rem;">⏰</span>
                <div>
                  <div style="font-size:var(--text-sm);font-weight:var(--font-semibold);">${t('contact.hours')}</div>
                  <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">${t('contact.hoursValue')}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="card rfq-form-card reveal-right">
            <form class="rfq-form" id="rfq-form">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">${t('rfq.formProductType')} <span class="required">*</span></label>
                  <select class="form-select" name="productType" required id="rfq-product-type">
                    <option value="">${t('rfq.formSelectProduct')}</option>
                    <option value="shaft">${t('rfq.formShaft')}</option>
                    <option value="gear">${t('rfq.formGear')}</option>
                    <option value="valve">${t('rfq.formValve')}</option>
                    <option value="forging">${t('rfq.formForging')}</option>
                    <option value="cold-heading">${t('rfq.formColdHeading')}</option>
                    <option value="other">${t('rfq.formOther')}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">${t('rfq.formMaterial')}</label>
                  <input type="text" class="form-input" name="material" placeholder="${t('rfq.formMaterialPlaceholder')}" id="rfq-material"/>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">${t('rfq.formQuantity')} <span class="required">*</span></label>
                  <input type="text" class="form-input" name="quantity" placeholder="${t('rfq.formQuantityPlaceholder')}" required id="rfq-quantity"/>
                </div>
                <div class="form-group">
                  <label class="form-label">${t('rfq.formDelivery')}</label>
                  <input type="text" class="form-input" name="delivery" placeholder="${t('rfq.formDeliveryPlaceholder')}" id="rfq-delivery"/>
                </div>
              </div>

              <div class="form-group full-width">
                <label class="form-label">${t('rfq.formSpecs')}</label>
                <textarea class="form-textarea" name="specs" placeholder="${t('rfq.formSpecsPlaceholder')}" id="rfq-specs"></textarea>
              </div>

              <div class="form-group full-width">
                <label class="form-label">${t('rfq.formUpload')}</label>
                <div class="form-file-upload" id="file-upload-area">
                  <input type="file" name="drawings" accept=".pdf,.dwg,.step,.stp,.igs,.iges,.jpg,.jpeg,.png" multiple id="rfq-file"/>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <p>${t('rfq.formUploadDesc')}</p>
                  <p class="file-types">${t('rfq.formUploadTypes')}</p>
                  <div id="file-list" style="margin-top:var(--space-2);font-size:var(--text-sm);color:var(--color-gold);"></div>
                </div>
              </div>

              <div style="border-top:1px solid var(--color-border);padding-top:var(--space-6);margin-top:var(--space-2);">
                <div style="font-size:var(--text-sm);font-weight:var(--font-semibold);margin-bottom:var(--space-4);color:var(--color-text-secondary);">
                  ${isZh ? '📋 联系信息' : '📋 Contact Information'}
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">${t('rfq.formName')} <span class="required">*</span></label>
                    <input type="text" class="form-input" name="name" placeholder="${t('rfq.formNamePlaceholder')}" required id="rfq-name"/>
                  </div>
                  <div class="form-group">
                    <label class="form-label">${t('rfq.formCompany')}</label>
                    <input type="text" class="form-input" name="company" placeholder="${t('rfq.formCompanyPlaceholder')}" id="rfq-company"/>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">${t('rfq.formEmail')} <span class="required">*</span></label>
                    <input type="email" class="form-input" name="email" placeholder="${t('rfq.formEmailPlaceholder')}" required id="rfq-email"/>
                  </div>
                  <div class="form-group">
                    <label class="form-label">${t('rfq.formPhone')}</label>
                    <input type="tel" class="form-input" name="phone" placeholder="${t('rfq.formPhonePlaceholder')}" id="rfq-phone"/>
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-primary btn-lg" id="rfq-submit" style="width:100%;">
                ${t('rfq.formSubmit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;

  // File upload display
  const fileInput = document.getElementById('rfq-file');
  fileInput?.addEventListener('change', () => {
    const fileList = document.getElementById('file-list');
    if (fileInput.files.length > 0) {
      fileList.innerHTML = Array.from(fileInput.files).map(f => `📄 ${f.name}`).join('<br>');
    }
  });

  // Form submit
  const form = document.getElementById('rfq-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('rfq-submit');
    submitBtn.textContent = t('rfq.formSubmitting');
    submitBtn.disabled = true;

    // Simulate submission
    setTimeout(() => {
      showToast(t('rfq.successMsg'), 'success');
      form.reset();
      document.getElementById('file-list').innerHTML = '';
      submitBtn.textContent = t('rfq.formSubmit');
      submitBtn.disabled = false;
    }, 1500);
  });

  initAnimations();
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'error' : ''}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
