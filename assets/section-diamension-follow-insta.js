/**
 * Diamension Follow Instagram Section - JavaScript
 * Handles parallax effects for asymmetric masonry grid using GSAP
 * Desktop only (>1024px)
 */

(function() {
  'use strict';

  // ============================================================================
  // Configuration
  // ============================================================================
  const CONFIG = {
    selectors: {
      section: '.custom-section-diamension-follow-insta',
      parallaxImages: '.js-parallax-image'
    },
    breakpoints: {
      desktop: 1024
    },
    parallax: {
      movement: 80,
      ease: 'none'
    }
  };

  // ============================================================================
  // Parallax Handler (GSAP)
  // Desktop-only parallax for asymmetric masonry grid
  // ============================================================================
  class ParallaxHandler {
    constructor(section) {
      this.section = section;
      this.images = section.querySelectorAll(CONFIG.selectors.parallaxImages);
      this.isDesktop = window.innerWidth > CONFIG.breakpoints.desktop;

      if (this.isDesktop && this.images.length > 0 && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        this.init();
      }
    }

    init() {
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      // Apply parallax to all images
      // Animation goes from -movement to +movement for proper parallax effect
      // Images reach natural position (y: 0) when section is centered in viewport
      this.images.forEach((image) => {
        gsap.fromTo(image,
          {
            y: -CONFIG.parallax.movement
          },
          {
            y: CONFIG.parallax.movement,
            ease: CONFIG.parallax.ease,
            scrollTrigger: {
              trigger: this.section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });
    }

    destroy() {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === this.section) {
            trigger.kill();
          }
        });
      }
    }
  }

  // ============================================================================
  // Section Manager
  // ============================================================================
  class DiamensionFollowInstaSection {
    constructor(section) {
      this.section = section;
      this.parallaxHandler = null;

      this.init();
      this.bindEvents();
    }

    init() {
      // Initialize parallax (desktop only)
      if (window.innerWidth > CONFIG.breakpoints.desktop) {
        this.parallaxHandler = new ParallaxHandler(this.section);
      }
    }

    bindEvents() {
      // Handle window resize
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.handleResize();
        }, 250);
      });
    }

    handleResize() {
      const isDesktop = window.innerWidth > CONFIG.breakpoints.desktop;

      // Reinitialize parallax on desktop, destroy on mobile/tablet
      if (isDesktop && !this.parallaxHandler) {
        this.parallaxHandler = new ParallaxHandler(this.section);
      } else if (!isDesktop && this.parallaxHandler) {
        this.parallaxHandler.destroy();
        this.parallaxHandler = null;
      }
    }

    onUnload() {
      if (this.parallaxHandler) {
        this.parallaxHandler.destroy();
      }
    }
  }

  // ============================================================================
  // Initialize
  // ============================================================================
  function init() {
    const sections = document.querySelectorAll(CONFIG.selectors.section);

    if (sections.length === 0) return;

    sections.forEach(section => {
      const instance = new DiamensionFollowInstaSection(section);
      section.diamensionFollowInstaInstance = instance;
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize on Shopify section load (theme editor)
  if (typeof Shopify !== 'undefined' && Shopify.designMode) {
    document.addEventListener('shopify:section:load', function(event) {
      const section = event.target.querySelector(CONFIG.selectors.section);
      if (section) {
        const instance = new DiamensionFollowInstaSection(section);
        section.diamensionFollowInstaInstance = instance;
      }
    });

    document.addEventListener('shopify:section:unload', function(event) {
      const section = event.target.querySelector(CONFIG.selectors.section);
      if (section && section.diamensionFollowInstaInstance) {
        section.diamensionFollowInstaInstance.onUnload();
      }
    });
  }

})();
