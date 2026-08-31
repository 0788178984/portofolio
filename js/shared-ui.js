(function () {
  'use strict';

  const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

  document.querySelectorAll('.nav-link[data-page]').forEach((link) => {
    const page = link.dataset.page;
    if (page === currentPage || (page === 'home' && (currentPage === 'index' || currentPage === ''))) {
      link.classList.add('active');
    }
  });

  document.querySelectorAll('.nav-link[href^="#"]').forEach((link) => {
    if (currentPage !== 'index' && currentPage !== '') {
      const section = link.getAttribute('href').slice(1);
      link.setAttribute('href', 'index.html#' + section);
    }
  });
})();
