(function() {
  'use strict';

  if (window.innerWidth < 768) return;

  function initScrollAnimation() {
    const sections = document.querySelectorAll('.custom-section-two-column-hero');
    if (!sections.length) return;

    sections.forEach(section => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            setTimeout(() => {
              section.classList.add('custom-section-two-column-hero--animated');
            }, 400);

            observer.unobserve(section);
          }
        });
      }, {
        threshold: [0.2],
        rootMargin: '0px'
      });

      observer.observe(section);
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth < 768) {
          sections.forEach(section => {
            section.classList.remove('custom-section-two-column-hero--animated');
          });
        }
      }, 250);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimation);
  } else {
    initScrollAnimation();
  }
})();
