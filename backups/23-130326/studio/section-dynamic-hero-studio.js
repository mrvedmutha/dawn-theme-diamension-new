/**
 * Dynamic Hero Studio Section - Scroll Animation
 */

(function() {
  'use strict';

  // Only run on desktop devices (min-width: 1025px)
  if (window.innerWidth < 1025) {
    return;
  }

  // Initialize when DOM is ready
  function init() {
    const sections = document.querySelectorAll('.custom-section-dynamic-hero-studio');

    if (!sections.length) {
      return;
    }

    // Intersection Observer options
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.2 // trigger when 20% of section is visible
    };

    // Callback when section enters viewport
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add delay before triggering animations (300ms)
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, 300);

          // Optional: unobserve after animation triggers (one-time animation)
          observer.unobserve(entry.target);
        }
      });
    };

    // Create observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each section
    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize on window resize if crossing desktop breakpoint
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Reload if crossing the 1025px breakpoint
      init();
    }, 250);
  });
})();
