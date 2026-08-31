(function () {
  'use strict';

  function showMessage(el, text, type) {
    if (!el) return;
    el.textContent = text;
    el.className = 'form-message' + (type ? ' ' + type : '');
    el.style.display = 'block';
  }

  function hideMessage(el) {
    if (el) el.style.display = 'none';
  }

  function setLoading(btn, loading) {
    if (!btn) return;
    btn.disabled = loading;
    const text = btn.querySelector('.btn-text');
    if (text) text.textContent = loading ? 'Sending...' : text.dataset.default || text.textContent;
  }

  async function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const msg = document.getElementById('form-message');
    const btn = form.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(form));

    setLoading(btn, true);
    showMessage(msg, 'Sending your message...', '');

    try {
      const result = await AsmartAPI.submitContact(data);
      showMessage(msg, result.message || 'Message sent successfully!', 'success');
      form.reset();
    } catch (err) {
      showMessage(msg, err.message || 'Could not send. Try WhatsApp or email instead.', 'error');
      const wa = window.ASMART_CONFIG?.WHATSAPP || '256779654710';
      const fallback = `https://wa.me/${wa}?text=${encodeURIComponent(
        `Hi Asmart, I'm ${data.name}. ${data.subject}: ${data.message}`
      )}`;
      setTimeout(() => {
        if (confirm('API unavailable. Open WhatsApp to send your message instead?')) {
          window.open(fallback, '_blank');
        }
      }, 500);
    } finally {
      setLoading(btn, false);
    }
  }

  async function handleServiceRequestSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const msg = document.getElementById('request-message');
    const btn = form.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(form));

    const select = form.querySelector('[name="serviceId"]');
    if (select && select.selectedOptions[0]) {
      data.serviceName = select.selectedOptions[0].textContent.trim();
    }

    setLoading(btn, true);
    showMessage(msg, 'Submitting your request...', '');

    try {
      const result = await AsmartAPI.submitServiceRequest(data);
      showMessage(msg, result.message || 'Request submitted!', 'success');
      form.reset();
    } catch (err) {
      showMessage(msg, err.message || 'Could not submit. Try WhatsApp instead.', 'error');
    } finally {
      setLoading(btn, false);
    }
  }

  function populateServiceSelect(selectId, preselect) {
    const select = document.getElementById(selectId);
    if (!select || !window.ASMART_SERVICES) return;

    const grouped = {};
    ASMART_SERVICES.items.forEach((s) => {
      if (!grouped[s.category]) grouped[s.category] = [];
      grouped[s.category].push(s);
    });

    select.innerHTML = '<option value="">Select a service...</option>';

    ASMART_SERVICES.categories.forEach((cat) => {
      const items = grouped[cat.id];
      if (!items?.length) return;
      const optgroup = document.createElement('optgroup');
      optgroup.label = cat.name;
      items.forEach((s) => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.name;
        if (preselect === s.id || preselect === s.slug) opt.selected = true;
        optgroup.appendChild(opt);
      });
      select.appendChild(optgroup);
    });
  }

  function renderServicesGrid(containerId, filterCategory) {
    const container = document.getElementById(containerId);
    if (!container || !window.ASMART_SERVICES) return;

    ASMART_SERVICES.categories.forEach((cat) => {
      if (filterCategory && cat.id !== filterCategory) return;

      const items = ASMART_SERVICES.items.filter((s) => s.category === cat.id);
      if (!items.length) return;

      const section = document.createElement('div');
      section.className = 'service-category-block';
      section.id = 'cat-' + cat.id;
      section.innerHTML = `
        <div class="category-header">
          <div class="category-icon"><i class="fas ${cat.icon}"></i></div>
          <div>
            <h2 class="category-title">${cat.name}</h2>
            <p class="category-desc">${cat.description}</p>
          </div>
        </div>
        <div class="services-grid" id="grid-${cat.id}"></div>
      `;
      container.appendChild(section);

      const grid = section.querySelector('.services-grid');
      items.forEach((s) => {
        const card = document.createElement('article');
        card.className = 'service-card platform-service-card';
        const links = s.links || {};
        const extraLinks = links.sales
          ? `<a href="${links.sales}" class="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer"><i class="fas fa-globe"></i> Sales site</a>`
          : '';
        const appLink = links.app
          ? `<a href="${links.app}" class="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> Open app</a>`
          : '';
        card.innerHTML = `
          <div class="service-icon"><i class="fas ${s.icon}"></i></div>
          <h3 class="service-title">${s.name}</h3>
          <p class="service-description">${s.description}</p>
          <ul class="service-features">
            ${s.features.map((f) => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
          </ul>
          <div class="service-pricing-badge"><i class="fas fa-handshake"></i> Price on negotiation</div>
          <div class="service-card-actions">
            <a href="request.html?service=${s.id}" class="btn btn-primary btn-sm">Request Service</a>
            ${appLink}
            ${extraLinks}
            <a href="https://wa.me/${ASMART_CONFIG.WHATSAPP}?text=${encodeURIComponent(`Hi Asmart, I need ${s.name}.`)}"
               target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
              <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
          </div>
        `;
        grid.appendChild(card);
      });
    });
  }

  function renderSearchGuides(containerId) {
    const container = document.getElementById(containerId);
    if (!container || !window.ASMART_SERVICES) return;

    ASMART_SERVICES.searchGuides.forEach((g) => {
      const card = document.createElement('article');
      card.className = 'seo-card search-guide-card';
      card.innerHTML = `
        <div class="search-guide-icon"><i class="fas ${g.icon}"></i></div>
        <h3>${g.title}</h3>
        <p>${g.description}</p>
        <div class="search-guide-actions">
          <a href="${g.slug}" class="btn btn-primary btn-sm">Read Guide</a>
          <a href="request.html?service=${g.slug}" class="btn btn-secondary btn-sm">Get Quote</a>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function initServiceFilters() {
    const filters = document.querySelectorAll('[data-service-filter]');
    const blocks = document.querySelectorAll('.service-category-block');
    if (!filters.length) return;

    filters.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.serviceFilter;
        filters.forEach((b) => b.classList.toggle('active', b === btn));
        blocks.forEach((block) => {
          block.style.display = cat === 'all' || block.id === 'cat-' + cat ? '' : 'none';
        });
      });
    });
  }

  function initPlatformForms() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      const btnText = contactForm.querySelector('.btn-text');
      if (btnText) btnText.dataset.default = btnText.textContent;
      contactForm.addEventListener('submit', handleContactSubmit);
    }

    const requestForm = document.getElementById('service-request-form');
    if (requestForm) {
      const btnText = requestForm.querySelector('.btn-text');
      if (btnText) btnText.dataset.default = btnText.textContent;
      requestForm.addEventListener('submit', handleServiceRequestSubmit);
    }

    const params = new URLSearchParams(window.location.search);
    populateServiceSelect('service-select', params.get('service'));

    if (document.getElementById('services-catalog')) {
      renderServicesGrid('services-catalog');
      initServiceFilters();
    }

    if (document.getElementById('search-guides-grid')) {
      renderSearchGuides('search-guides-grid');
    }
  }

  document.addEventListener('DOMContentLoaded', initPlatformForms);
})();
