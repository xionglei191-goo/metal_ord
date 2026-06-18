import { t, getLang } from '../utils/i18n.js';
import { initAnimations } from '../utils/animations.js';

export function renderContact() {
  const main = document.getElementById('main-content');
  const lang = getLang();
  const isZh = lang === 'zh';

  main.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1 class="text-gradient-gold">${t('contact.pageTitle')}</h1>
        <p>${t('contact.pageDesc')}</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="contact-layout">
          <!-- Contact Info -->
          <div class="reveal-left">
            <div class="card contact-info-card" style="margin-bottom:var(--space-6);">
              <div class="contact-info-item">
                <div class="contact-info-icon">📍</div>
                <div class="contact-info-text">
                  <h4>${t('contact.address')}</h4>
                  <p>${t('contact.addressValue')}</p>
                </div>
              </div>
              <div class="contact-info-item">
                <div class="contact-info-icon">📞</div>
                <div class="contact-info-text">
                  <h4>${t('contact.phone')}</h4>
                  <p>${t('contact.phoneValue')}</p>
                </div>
              </div>
              <div class="contact-info-item">
                <div class="contact-info-icon">📧</div>
                <div class="contact-info-text">
                  <h4>${t('contact.email')}</h4>
                  <p>${t('contact.emailValue')}</p>
                </div>
              </div>
              <div class="contact-info-item">
                <div class="contact-info-icon">⏰</div>
                <div class="contact-info-text">
                  <h4>${t('contact.hours')}</h4>
                  <p>${t('contact.hoursValue')}</p>
                </div>
              </div>
            </div>

            <!-- Map placeholder -->
            <div class="contact-map reveal">
              <div style="text-align:center;padding:var(--space-8);">
                <div style="font-size:3rem;margin-bottom:var(--space-3);">🗺️</div>
                <p style="font-size:var(--text-base);">${t('contact.mapPlaceholder')}</p>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="card reveal-right" style="padding:var(--space-10);">
            <h3 style="font-size:var(--text-2xl);font-weight:var(--font-bold);margin-bottom:var(--space-6);">
              ${t('contact.formTitle')}
            </h3>
            <form class="rfq-form" id="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">${t('rfq.formName')} <span class="required">*</span></label>
                  <input type="text" class="form-input" name="name" placeholder="${t('rfq.formNamePlaceholder')}" required id="contact-name"/>
                </div>
                <div class="form-group">
                  <label class="form-label">${t('rfq.formCompany')}</label>
                  <input type="text" class="form-input" name="company" placeholder="${t('rfq.formCompanyPlaceholder')}" id="contact-company"/>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">${t('rfq.formEmail')} <span class="required">*</span></label>
                  <input type="email" class="form-input" name="email" placeholder="${t('rfq.formEmailPlaceholder')}" required id="contact-email"/>
                </div>
                <div class="form-group">
                  <label class="form-label">${t('rfq.formPhone')}</label>
                  <input type="tel" class="form-input" name="phone" placeholder="${t('rfq.formPhonePlaceholder')}" id="contact-phone"/>
                </div>
              </div>
              <div class="form-group full-width">
                <label class="form-label">${t('contact.formMessage')} <span class="required">*</span></label>
                <textarea class="form-textarea" name="message" placeholder="${t('contact.formMessagePlaceholder')}" required style="min-height:160px;" id="contact-message"></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-lg" id="contact-submit" style="width:100%;">
                ${t('contact.formSubmit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;

  // Form submit
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('contact-submit');
    btn.textContent = isZh ? '发送中...' : 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      showToast(isZh ? '✓ 留言已发送！我们会尽快回复您。' : '✓ Message sent! We will reply as soon as possible.', 'success');
      form.reset();
      btn.textContent = t('contact.formSubmit');
      btn.disabled = false;
    }, 1200);
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
