(function() {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP is not loaded. Loading from CDN...');
      loadGSAP();
      return;
    }

    initAnimations();
  }

  function loadGSAP() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
    script.onload = function() {
      initAnimations();
    };
    script.onerror = function() {
      console.error('Failed to load GSAP');
    };
    document.head.appendChild(script);
  }

  function initAnimations() {
    const section = document.querySelector('.custom-two-image-hero-b2b');
    if (!section) return;

    const leftHeading = section.querySelector('.custom-two-image-hero-b2b__left-heading');
    const rightDescription = section.querySelector('.custom-two-image-hero-b2b__right-description');
    const cta = section.querySelector('.custom-two-image-hero-b2b__cta');

    gsap.set([leftHeading, rightDescription, cta], {
      opacity: 0,
      y: 30
    });

    const timeline = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'power3.out'
      }
    });

    timeline
      .to(leftHeading, {
        opacity: 1,
        y: 0,
        duration: 1.2
      }, 0.3)
      .to(rightDescription, {
        opacity: 1,
        y: 0,
        duration: 1
      }, 0.5)
      .to(cta, {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, 0.7);

    if (cta) {
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
  }
})();
