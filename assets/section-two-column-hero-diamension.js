/**
 * Two-Column Hero Section - Scroll Animation
 * Handles scroll-triggered fade-in animation for desktop screens
 */

(function() {
  'use strict';

  // Only run on desktop (768px and above)
  if (window.innerWidth < 768) return;

  // Wait for DOM to be ready
  function initScrollAnimation() {
    const sections = document.querySelectorAll('.custom-section-two-column-hero');
    if (!sections.length) return;

    sections.forEach(section => {
      // Intersection Observer to detect when section is in viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // Trigger animation when 20% of the section is visible
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            // Add a slight delay before triggering animation
            setTimeout(() => {
              section.classList.add('custom-section-two-column-hero--animated');
            }, 400);

            // Stop observing after animation is triggered
            observer.unobserve(section);
          }
        });
      }, {
        threshold: [0.2], // Trigger when 20% of section is visible
        rootMargin: '0px' // No margin adjustment
      });

      // Start observing the section
      observer.observe(section);
    });

    // Handle window resize - re-check if animation should be disabled
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // If resized to mobile, remove animation class
        if (window.innerWidth < 768) {
          sections.forEach(section => {
            section.classList.remove('custom-section-two-column-hero--animated');
          });
        }
      }, 250);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimation);
  } else {
    initScrollAnimation();
  }
})();
