/**
 * Custom Section - Diamension Quote Gallery
 * Handles GSAP parallax scrolling effects for image gallery
 */

(function() {
  'use strict';

  // ============================================================================
  // Configuration
  // ============================================================================
  const CONFIG = {
    selectors: {
      section: '.js-quote-gallery-section',
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
  // ============================================================================
  class ParallaxHandler {
    constructor(section) {
      this.section = section;
      this.images = section.querySelectorAll(CONFIG.selectors.parallaxImages);
      this.isDesktop = window.innerWidth > CONFIG.breakpoints.desktop;
      this.animations = [];

      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded. Parallax effect disabled.');
        return;
      }

      const parallaxEnabled = this.section.dataset.parallaxEnabled !== 'false';

      if (this.isDesktop && this.images.length > 0 && parallaxEnabled) {
        this.init();
      }
    }

    init() {
      gsap.registerPlugin(ScrollTrigger);

      this.images.forEach((image, index) => {
        const animation = gsap.fromTo(image,
          {
            y: -40
          },
          {
            y: 0,
            ease: CONFIG.parallax.ease,
            scrollTrigger: {
              trigger: this.section,
              start: 'top 80%',
              end: 'center center',
              scrub: true,
              invalidateOnRefresh: true
            }
          }
        );

        this.animations.push(animation);
      });
    }

    destroy() {
      this.animations.forEach(animation => {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
        animation.kill();
      });
      this.animations = [];
    }
  }

  // ============================================================================
  // Section Manager
  // ============================================================================
  class QuoteGallerySection {
    constructor(section) {
      this.section = section;
      this.parallaxHandler = null;
      this.resizeTimer = null;

      this.init();
      this.bindEvents();
    }

    init() {
      if (window.innerWidth > CONFIG.breakpoints.desktop) {
        this.parallaxHandler = new ParallaxHandler(this.section);
      }
    }

    bindEvents() {
      window.addEventListener('resize', () => {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          this.handleResize();
        }, 250);
      });
    }

    handleResize() {
      const isDesktop = window.innerWidth > CONFIG.breakpoints.desktop;

      if (isDesktop && !this.parallaxHandler) {
        this.parallaxHandler = new ParallaxHandler(this.section);
      } else if (!isDesktop && this.parallaxHandler) {
        this.parallaxHandler.destroy();
        this.parallaxHandler = null;
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
      new QuoteGallerySection(section);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  if (typeof Shopify !== 'undefined' && Shopify.designMode) {
    document.addEventListener('shopify:section:load', function(event) {
      if (event.target.querySelector(CONFIG.selectors.section)) {
        init();
      }
    });
  }

})();
