(function () {
  'use strict';

  const CONFIG = {
    breakpoint: 1025,
    parallax: {
      movement: 200,
      ease: 'none'
    }
  };

  let parallaxInstances = [];

  function isDesktop() {
    return window.innerWidth >= CONFIG.breakpoint;
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function initParallax() {
    if (!isDesktop() || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll('.sustainability-hero');

    sections.forEach((section) => {
      const image = section.querySelector('.sustainability-hero__image img');

      if (!image) return;

      const animation = gsap.fromTo(image,
        {
          y: -CONFIG.parallax.movement
        },
        {
          y: CONFIG.parallax.movement,
          ease: CONFIG.parallax.ease,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      parallaxInstances.push(animation);
    });
  }

  function cleanupParallax() {
    if (typeof ScrollTrigger !== 'undefined') {
      parallaxInstances.forEach(animation => {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
        animation.kill();
      });
      parallaxInstances = [];
    }
  }

  function initAnimations() {
    if (!isDesktop() || prefersReducedMotion()) {
      const animatedElements = document.querySelectorAll('.sustainability-hero .animate-on-scroll');
      animatedElements.forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const animatedElements = document.querySelectorAll('.sustainability-hero .animate-on-scroll');
    animatedElements.forEach((el) => {
      observer.observe(el);
    });
  }

  function init() {
    initAnimations();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  let resizeTimer;
  let wasDesktop = isDesktop();

  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      const nowDesktop = isDesktop();

      if (!nowDesktop) {
        const animatedElements = document.querySelectorAll('.sustainability-hero .animate-on-scroll');
        animatedElements.forEach((el) => {
          el.classList.add('is-visible');
        });
      }

      if (wasDesktop !== nowDesktop) {
        if (nowDesktop) {
          initParallax();
        } else {
          cleanupParallax();
        }
        wasDesktop = nowDesktop;
      }
    }, 250);
  });

  if (typeof Shopify !== 'undefined' && Shopify.designMode) {
    document.addEventListener('shopify:section:load', function(event) {
      if (event.target.querySelector('.sustainability-hero')) {
        cleanupParallax();
        init();
      }
    });
  }
})();
