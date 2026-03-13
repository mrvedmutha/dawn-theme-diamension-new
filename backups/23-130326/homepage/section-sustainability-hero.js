(function () {
  'use strict';

  // Configuration
  const CONFIG = {
    breakpoint: 1025,
    parallax: {
      movement: 200, // Pixels of vertical movement
      ease: 'none'
    }
  };

  // Store parallax instances for cleanup
  let parallaxInstances = [];

  // Check if desktop (1025px and above)
  function isDesktop() {
    return window.innerWidth >= CONFIG.breakpoint;
  }

  // Check if user prefers reduced motion
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Initialize parallax effect using GSAP
  function initParallax() {
    // Exit early if not desktop or GSAP not available
    if (!isDesktop() || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Find all sustainability hero sections
    const sections = document.querySelectorAll('.sustainability-hero');

    sections.forEach((section) => {
      const image = section.querySelector('.sustainability-hero__image img');

      if (!image) return;

      // Create parallax effect for the image
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

      // Store instance for cleanup
      parallaxInstances.push(animation);
    });
  }

  // Cleanup parallax instances
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

  // Initialize animations only on desktop
  function initAnimations() {
    // Exit early if not desktop or user prefers reduced motion
    if (!isDesktop() || prefersReducedMotion()) {
      // Remove animation classes to show content immediately
      const animatedElements = document.querySelectorAll('.sustainability-hero .animate-on-scroll');
      animatedElements.forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    // Intersection Observer options
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    // Callback when element intersects
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add visible class to trigger animation
          entry.target.classList.add('is-visible');
          // Stop observing once animated (animation happens once)
          observer.unobserve(entry.target);
        }
      });
    };

    // Create observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all animated elements in this section
    const animatedElements = document.querySelectorAll('.sustainability-hero .animate-on-scroll');
    animatedElements.forEach((el) => {
      observer.observe(el);
    });
  }

  // Initialize everything
  function init() {
    initAnimations();
    initParallax();
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize on window resize (debounced)
  let resizeTimer;
  let wasDesktop = isDesktop();

  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      const nowDesktop = isDesktop();

      // Handle text animations on mobile
      if (!nowDesktop) {
        const animatedElements = document.querySelectorAll('.sustainability-hero .animate-on-scroll');
        animatedElements.forEach((el) => {
          el.classList.add('is-visible');
        });
      }

      // Handle parallax on desktop/mobile switch
      if (wasDesktop !== nowDesktop) {
        if (nowDesktop) {
          // Switched to desktop - init parallax
          initParallax();
        } else {
          // Switched to mobile - cleanup parallax
          cleanupParallax();
        }
        wasDesktop = nowDesktop;
      }
    }, 250);
  });

  // Re-initialize on Shopify section load (theme editor)
  if (typeof Shopify !== 'undefined' && Shopify.designMode) {
    document.addEventListener('shopify:section:load', function(event) {
      if (event.target.querySelector('.sustainability-hero')) {
        cleanupParallax();
        init();
      }
    });
  }
})();
