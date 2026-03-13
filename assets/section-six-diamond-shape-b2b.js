(function () {
  'use strict';

  function initScrollAnimations() {
    const section = document.querySelector('.custom-section-six-diamond-shape-b2b');
    if (!section) return;

    const heading = section.querySelector('.custom-section-six-diamond-shape-b2b__heading');
    const cta = section.querySelector('.custom-section-six-diamond-shape-b2b__cta');
    const content = section.querySelector('.custom-section-six-diamond-shape-b2b__content');

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (heading) {
            heading.classList.add('animate-in');
          }
          if (cta) {
            cta.classList.add('animate-in');
          }
          textObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    textObserver.observe(section);

    if (content) {
      section.dataset.contentReady = 'true';
    }
  }

  function initLottieAnimations() {
    const section = document.querySelector('.custom-section-six-diamond-shape-b2b');
    if (!section) return;

    const content = section.querySelector('.custom-section-six-diamond-shape-b2b__content');
    if (!content) return;
  }

  function initCTAAnimation() {
    const section = document.querySelector('.custom-section-six-diamond-shape-b2b');
    if (!section) return;

    const cta = section.querySelector('.custom-section-six-diamond-shape-b2b__cta');
    if (!cta) return;

    cta.addEventListener('mouseenter', function() {
      cta.classList.remove('animate-exit');
      cta.classList.add('animate-enter');

      setTimeout(function() {
        cta.classList.remove('animate-enter');
      }, 800);
    });

    cta.addEventListener('mouseleave', function() {
      cta.classList.remove('animate-enter');
      cta.classList.add('animate-exit');

      setTimeout(function() {
        cta.classList.remove('animate-exit');
      }, 800);
    });
  }

  function init() {
    initScrollAnimations();
    initLottieAnimations();
    initCTAAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
