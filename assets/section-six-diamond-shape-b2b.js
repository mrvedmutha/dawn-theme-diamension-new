/**
 * Six Diamond Shape B2B Section
 * Handles scroll animations and interactions
 */

(function () {
  'use strict';

  // Initialize scroll animations
  function initScrollAnimations() {
    const section = document.querySelector('.custom-section-six-diamond-shape-b2b');
    if (!section) return;

    const heading = section.querySelector('.custom-section-six-diamond-shape-b2b__heading');
    const cta = section.querySelector('.custom-section-six-diamond-shape-b2b__cta');
    const content = section.querySelector('.custom-section-six-diamond-shape-b2b__content');

    // Intersection Observer options
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2 // Trigger when 20% of section is visible
    };

    // Observer callback for text stagger animation
    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Trigger stagger animation for heading and CTA
          if (heading) {
            heading.classList.add('animate-in');
          }
          if (cta) {
            cta.classList.add('animate-in');
          }
          // Unobserve after animation triggers (only animate once)
          textObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe the section
    textObserver.observe(section);

    // Store reference to content section for future Lottie integration
    if (content) {
      section.dataset.contentReady = 'true';
      console.log('Six Diamond Shape B2B: Content section ready for Lottie animations');
    }
  }

  // Initialize Lottie animations (placeholder for future implementation)
  function initLottieAnimations() {
    const section = document.querySelector('.custom-section-six-diamond-shape-b2b');
    if (!section) return;

    const content = section.querySelector('.custom-section-six-diamond-shape-b2b__content');
    if (!content) return;

    // TODO: Add Lottie animation initialization here
    // Example structure:
    // const diamondItems = content.querySelectorAll('.custom-section-six-diamond-shape-b2b__diamond-item');
    // const certificate = content.querySelector('.custom-section-six-diamond-shape-b2b__certificate');
    //
    // diamondItems.forEach((item, index) => {
    //   // Initialize Lottie animation for each diamond
    // });
    //
    // // Initialize Lottie animation for certificate

    console.log('Six Diamond Shape B2B: Lottie animations ready to be implemented');
  }

  // Initialize section
  function init() {
    initScrollAnimations();
    initLottieAnimations();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
