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

      console.log('🎬 Initializing Process Hero');
      console.log('Initial state: Ellipse expanded, covering screen (seamless from exit animation)');

      // Start enter animation after a brief moment
      this.playEnterAnimation();
    }

    /**
     * Play enter animation when page loads
     * Animates FROM the expanded ellipse state (seamless loading)
     */
    playEnterAnimation() {
      console.log('🎭 Starting enter animation from expanded state');

      // Add loaded class to section
      this.section.classList.add('process-hero--loaded');

      // Create timeline for enter animation
      // Starting from: ellipse at 200vw (expanded), heading hidden
      const enterTimeline = gsap.timeline({
        delay: 0.5, // Brief delay so user sees the seamless transition
        onStart: () => {
          console.log('Ellipse starts shrinking...');
        },
        onComplete: () => {
          console.log('✅ Enter animation complete');
          // Remove overlay from DOM after animation
          if (this.transitionOverlay) {
            this.transitionOverlay.style.display = 'none';
          }
        }
      });

      // 1. Shrink and fade out ellipse from its expanded state
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
