/**
 * Image Hero with Product Section - JavaScript
 * Handles parallax effect on background image (desktop only)
 */

(function() {
  'use strict';

  // ============================================================================
  // Configuration
  // ============================================================================
  const CONFIG = {
    selectors: {
      section: '.image-hero-section',
      background: '.image-hero-section__background',
      ctaButton: '.image-hero-section__cta'
    },
    breakpoints: {
      tablet: 1024
    },
    parallax: {
      movement: 200, // Pixels of vertical movement (increased for more dramatic effect)
      ease: 'none'
    }
  };

  // ============================================================================
  // Parallax Handler (GSAP)
  // ============================================================================
  class ParallaxHandler {
    constructor(section) {
      this.section = section;
      this.background = section.querySelector(CONFIG.selectors.background);
      this.isDesktop = window.innerWidth > CONFIG.breakpoints.tablet;

      if (this.isDesktop && this.background && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        this.init();
      }
    }

    init() {
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      // Create parallax effect for background image
      // The image moves slower than the scroll, creating depth
      gsap.fromTo(this.background,
        {
          y: -CONFIG.parallax.movement
        },
        {
          y: CONFIG.parallax.movement,
          ease: CONFIG.parallax.ease,
          scrollTrigger: {
            trigger: this.section,
            start: 'top bottom', // Start when section enters viewport
            end: 'bottom top',   // End when section leaves viewport
            scrub: true          // Smooth scrubbing effect
          }
        }
      );
    }

    destroy() {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === this.section) {
            trigger.kill();
          }
        });
      }
    }
  }

  // ============================================================================
  // CTA Animation Handler
  // ============================================================================
  class CTAAnimationHandler {
    constructor(section) {
      this.ctaButton = section.querySelector(CONFIG.selectors.ctaButton);

      if (this.ctaButton) {
        this.init();
      }
    }

    init() {
      // Mouse enter: trigger exit-enter animation
      this.ctaButton.addEventListener('mouseenter', () => {
        this.ctaButton.classList.remove('animate-exit');
        this.ctaButton.classList.add('animate-enter');

        setTimeout(() => {
          this.ctaButton.classList.remove('animate-enter');
        }, 800);
      });

      // Mouse leave: trigger exit-enter animation
      this.ctaButton.addEventListener('mouseleave', () => {
        this.ctaButton.classList.remove('animate-enter');
        this.ctaButton.classList.add('animate-exit');

        setTimeout(() => {
          this.ctaButton.classList.remove('animate-exit');
        }, 800);
      });
    }
  }

  // ============================================================================
  // Section Manager
  // ============================================================================
  class ImageHeroSection {
    constructor(section) {
      this.section = section;
      this.parallaxHandler = null;
      this.ctaHandler = null;

      this.init();
      this.bindEvents();
    }

    init() {
      // Initialize parallax (desktop only)
      if (window.innerWidth > CONFIG.breakpoints.tablet) {
        this.parallaxHandler = new ParallaxHandler(this.section);
      }

      // Initialize CTA animations
      this.ctaHandler = new CTAAnimationHandler(this.section);

      // Add visible class for text reveal
      this.initTextReveal();
    }

    initTextReveal() {
      // Check if section is already in viewport (common for hero sections)
      const rect = this.section.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport) {
        // Section is already visible, trigger animation immediately
        // Small delay to ensure smooth animation
        setTimeout(() => {
          this.section.classList.add('is-visible');
        }, 100);
      } else {
        // Use Intersection Observer for sections below fold
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
          }
        );

        observer.observe(this.section);
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
      const isDesktop = window.innerWidth > CONFIG.breakpoints.tablet;

      // Reinitialize parallax on desktop, destroy on mobile
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
      new ImageHeroSection(section);
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
      if (event.target.querySelector(CONFIG.selectors.section)) {
        init();
      }
    });
  }

})();
