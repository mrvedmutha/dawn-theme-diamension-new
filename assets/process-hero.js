/**
 * Process Hero Section
 * - Enter animation from page transition
 * - Ellipse shrinks away
 * - Heading fades in from top
 */

(function() {
  'use strict';

  // Wait for GSAP to load
  function initWhenReady() {
    if (typeof gsap === 'undefined') {
      setTimeout(initWhenReady, 100);
      return;
    }

    initProcessHero();
  }

  function initProcessHero() {
    const sections = document.querySelectorAll('.process-hero');

    sections.forEach((section) => {
      new ProcessHeroController(section);
    });
  }

  class ProcessHeroController {
    constructor(section) {
      this.section = section;

      // DOM elements
      this.heading = section.querySelector('[data-heading]');
      this.transitionOverlay = section.querySelector('[data-transition-overlay]');

      console.log('Initializing Process Hero');

      // Start enter animation
      this.playEnterAnimation();
    }

    /**
     * Play enter animation when page loads
     */
    playEnterAnimation() {
      console.log('Starting enter animation');

      // Create timeline for enter animation
      const enterTimeline = gsap.timeline({
        delay: 0.3, // Small delay to ensure page is ready
        onComplete: () => {
          console.log('Enter animation complete');
        }
      });

      // 1. Shrink and fade out ellipse
      enterTimeline.to(this.transitionOverlay, {
        width: 0,
        height: 0,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut'
      }, 0);

      // 2. Fade in and slide down heading from top
      if (this.heading) {
        enterTimeline.fromTo(this.heading,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
          0.6 // Start slightly after ellipse begins shrinking
        );
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhenReady);
  } else {
    initWhenReady();
  }

})();
