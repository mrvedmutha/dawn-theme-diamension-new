/**
 * Founder's Vision Section - Scroll Animation
 * Triggers fade-in animation when section enters viewport
 */

(function() {
  'use strict';

  /**
   * Initialize scroll animation using Intersection Observer
   */
  const initScrollAnimation = () => {
    const animatedElements = document.querySelectorAll('.custom-section-founders-vision__heading[data-animate], .custom-section-founders-vision__description[data-animate]');

    if (!animatedElements.length) return;

    // Intersection Observer options
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2 // Trigger when 20% of element is visible
    };

    // Callback function when element enters/exits viewport
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class to trigger animation
          entry.target.classList.add('is-visible');

          // Optional: Unobserve after animation (one-time animation)
          // observer.unobserve(entry.target);
        }
      });
    };

    // Create observer instance
    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all animated elements
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimation);
  } else {
    initScrollAnimation();
  }

})();
