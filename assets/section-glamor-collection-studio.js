/**
 * Glamor Collection - The Studio Section
 * GSAP scroll animations (desktop only)
 */

(function() {
  'use strict';

  /**
   * Set CSS custom property for accurate viewport height
   * This fixes the 100vh issue on mobile Safari where the viewport height
   * includes the browser chrome (address bar, toolbar, etc.)
   * Reference: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
   */
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  /**
   * Initialize GSAP animations for desktop only
   */
  const initAnimations = () => {
    // Only run on desktop (1025px and above)
    if (window.innerWidth < 1025) return;

    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.error('GSAP or ScrollTrigger not loaded. Animations will not run.');
      return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector('.custom-section-glamor-collection');
    if (!section) return;

    const headline = section.querySelector('.custom-section-glamor-collection__headline');
    const cards = section.querySelectorAll('.custom-section-glamor-collection__cards--desktop .custom-section-glamor-collection__card');

    // Create timeline with delay
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%', // When section is 70% from top of viewport (triggers later)
        toggleActions: 'play none none none',
        once: true, // Only animate once
      }
    });

    // Headline animation
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
        0.3 // Increased delay from 0.1s to 0.3s
      );
    }

    // Product cards stagger animation
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
          stagger: 0.15, // 0.15s between each card
        },
        0.7 // Increased delay from 0.4s to 0.7s (after headline starts)
      );
    }
  };

  /**
   * Initialize on DOMContentLoaded
   */
  const init = () => {
    // Set viewport height for mobile Safari fix
    setViewportHeight();

    // Wait for GSAP to load if using CDN
    if (typeof gsap !== 'undefined') {
      initAnimations();
    } else {
      // Fallback: Try again after a short delay
      setTimeout(() => {
        initAnimations();
      }, 100);
    }
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Update viewport height on resize (debounced)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Update viewport height for mobile Safari
      setViewportHeight();

      // Refresh ScrollTrigger on resize
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 250);
  });

  // Update viewport height on orientation change (mobile devices)
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      setViewportHeight();
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 100);
  });

})();
