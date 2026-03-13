(function() {
  'use strict';

  function isDesktop() {
    return window.innerWidth >= 1025;
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function initAnimations() {
    if (!isDesktop() || prefersReducedMotion()) {
      const animatedElements = document.querySelectorAll('.custom-section-brand-story .animate-on-scroll');
      animatedElements.forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.2
    };

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const animatedElements = document.querySelectorAll('.custom-section-brand-story .animate-on-scroll');
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }

  let resizeTimer;
  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initAnimations();
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

  window.addEventListener('resize', handleResize);

})();
