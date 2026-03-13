(function() {
  'use strict';

  const setViewportHeight = () => {
    if (!CSS.supports('height', '100svh')) {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  };

  const initAnimations = () => {
    if (window.innerWidth < 1025) return;

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.error('GSAP or ScrollTrigger not loaded. Animations will not run.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector('.custom-section-glamor-collection');
    if (!section) return;

    const headline = section.querySelector('.custom-section-glamor-collection__headline');
    const cards = section.querySelectorAll('.custom-section-glamor-collection__cards--desktop .custom-section-glamor-collection__card');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none none',
        once: true,
      }
    });

    if (headline) {
      tl.fromTo(
        headline,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        0.3
      );
    }

    if (cards.length > 0) {
      tl.fromTo(
        cards,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.15,
        },
        0.7
      );
    }
  };

  const init = () => {
    setViewportHeight();

    if (typeof gsap !== 'undefined') {
      initAnimations();
    } else {
      setTimeout(() => {
        initAnimations();
      }, 100);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  let resizeTimeout;
  let lastWidth = window.innerWidth;

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const currentWidth = window.innerWidth;

      if (currentWidth !== lastWidth) {
        lastWidth = currentWidth;

        setViewportHeight();

        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }
    }, 250);
  });

  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      setViewportHeight();
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 100);
  });

})();
