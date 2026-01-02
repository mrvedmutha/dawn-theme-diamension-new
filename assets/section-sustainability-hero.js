(function () {
  'use strict';

  // Check if desktop (1025px and above)
  function isDesktop() {
    return window.innerWidth >= 1025;
  }

  // Check if user prefers reduced motion
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

  // Re-initialize on window resize (debounced)
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Only reinit if crossing the desktop threshold
      const animatedElements = document.querySelectorAll('.sustainability-hero .animate-on-scroll');
      if (!isDesktop() && animatedElements.length > 0) {
        animatedElements.forEach((el) => {
          el.classList.add('is-visible');
        });
      }
    }, 250);
  });
})();
