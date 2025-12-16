/**
 * Headline Ring Collection Section
 * Handles GSAP parallax animation for product image
 * Figma Node: 12:4785
 */

(function() {
  'use strict';

  // Check if GSAP is available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger is not loaded. Parallax effect will not work.');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  class HeadlineRingCollection {
    constructor(section) {
      this.section = section;
      this.parallaxImage = this.section.querySelector('[data-parallax-image]');
      this.scrollTriggerInstance = null;

      if (this.parallaxImage) {
        this.initParallax();
      }
    }

    initParallax() {
      // GSAP ScrollTrigger for parallax effect
      // Moves from -15px to +15px so at center (0px) it aligns with the headline
      this.scrollTriggerInstance = gsap.fromTo(this.parallaxImage,
        {
          y: -15
        },
        {
          y: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: this.section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    }

    onUnload() {
      // Clean up ScrollTrigger on section unload
      if (this.scrollTriggerInstance && this.scrollTriggerInstance.scrollTrigger) {
        this.scrollTriggerInstance.scrollTrigger.kill();
      }
    }
  }

  // Initialize sections
  const initSection = (section) => {
    const instance = new HeadlineRingCollection(section);
    section.headlineRingCollectionInstance = instance;
  };

  // Initialize all sections on page load
  const sections = document.querySelectorAll('[data-section-type="headline-ring-collection"]');
  sections.forEach(initSection);

  // Theme Editor support
  if (typeof Shopify !== 'undefined' && Shopify.designMode) {
    document.addEventListener('shopify:section:load', (event) => {
      const section = event.target.querySelector('[data-section-type="headline-ring-collection"]');
      if (section) {
        initSection(section);
      }
    });

    document.addEventListener('shopify:section:unload', (event) => {
      const section = event.target.querySelector('[data-section-type="headline-ring-collection"]');
      if (section && section.headlineRingCollectionInstance) {
        section.headlineRingCollectionInstance.onUnload();
      }
    });
  }

})();
