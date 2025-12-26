/**
 * Editorial Hero Section - Scroll Animation
 * Reveals text content when section comes into viewport
 */

(function() {
  'use strict';

  /**
   * Initialize scroll-triggered animations
   */
  const initEditorialHero = () => {
    const sections = document.querySelectorAll('.custom-section-editorial-hero');

    if (!sections.length) return;

    // Intersection Observer options
    const observerOptions = {
      root: null, // viewport
      threshold: 0.2, // Trigger when 20% of section is visible
      rootMargin: '0px'
    };

    /**
     * Callback when section enters viewport
     */
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;

          // Add visible class to all text elements
          const heading = section.querySelector('.custom-section-editorial-hero__heading');
          const tagline = section.querySelector('.custom-section-editorial-hero__tagline');
          const cta = section.querySelector('.custom-section-editorial-hero__cta');

          if (heading) heading.classList.add('is-visible');
          if (tagline) tagline.classList.add('is-visible');
          if (cta) cta.classList.add('is-visible');

          // Unobserve after animation triggers (optional - remove if you want it to retrigger)
          observer.unobserve(section);
        }
      });
    };

    // Create observer
    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all editorial hero sections
    sections.forEach(section => {
      observer.observe(section);
    });
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEditorialHero);
  } else {
    // DOM already loaded
    initEditorialHero();
  }

})();
