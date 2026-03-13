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
      ctaButton: '.image-hero-section__cta',
      pointer: '.product-pointer',
      pointerCard: '.product-pointer__card',
      pointersContainer: '.image-hero-section__pointers'
    },
    breakpoints: {
      tablet: 1024
    },
    parallax: {
      movement: 200, // Pixels of vertical movement (increased for more dramatic effect)
      ease: 'none'
    },
    card: {
      width: 327,
      height: 175,
      offset: 16 // Gap between pointer and card
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

      // Create parallax effect for background image only
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
  // Product Pointer Smart Positioning Handler
  // ============================================================================
  class ProductPointerHandler {
    constructor(section) {
      this.section = section;
      this.pointers = section.querySelectorAll(CONFIG.selectors.pointer);
      this.isDesktop = window.innerWidth > CONFIG.breakpoints.tablet;
      this.activePointer = null;
      this.activeCard = null;
      this.scrollRAF = null;

      if (this.isDesktop && this.pointers.length > 0) {
        this.init();
      }
    }

    init() {
      this.pointers.forEach(pointer => {
        const card = pointer.querySelector(CONFIG.selectors.pointerCard);

        if (!card) return;

        // Position card on mouseenter
        pointer.addEventListener('mouseenter', () => {
          this.activePointer = pointer;
          this.activeCard = card;
          this.positionCard(pointer, card);
        });

        // Clear active pointer on mouseleave
        pointer.addEventListener('mouseleave', () => {
          if (this.activePointer === pointer) {
            this.activePointer = null;
            this.activeCard = null;
          }
        });
      });

      // Reposition card on scroll (for parallax)
      this.handleScroll = this.handleScroll.bind(this);
      window.addEventListener('scroll', this.handleScroll, { passive: true });
    }

    handleScroll() {
      // Use RAF for performance
      if (this.scrollRAFPending) return;

      this.scrollRAFPending = true;
      requestAnimationFrame(() => {
        if (this.activePointer && this.activeCard) {
          this.positionCard(this.activePointer, this.activeCard);
        }
        this.scrollRAFPending = false;
      });
    }

    positionCard(pointer, card) {
      // Get pointer position relative to viewport
      const pointerRect = pointer.getBoundingClientRect();
      const pointerCenterX = pointerRect.left + (pointerRect.width / 2);
      const pointerCenterY = pointerRect.top + (pointerRect.height / 2);

      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate available space in each direction
      const spaceRight = viewportWidth - pointerCenterX;
      const spaceLeft = pointerCenterX;
      const spaceBottom = viewportHeight - pointerCenterY;
      const spaceTop = pointerCenterY;

      // Calculate required space for card (including offset)
      const cardWidthNeeded = CONFIG.card.width + CONFIG.card.offset;
      const cardHeightNeeded = CONFIG.card.height + CONFIG.card.offset;

      // Remove all position classes
      card.classList.remove('position-right', 'position-left', 'position-bottom', 'position-top');

      // Determine best position based on available space
      // Priority: right → left → bottom → top
      if (spaceRight >= cardWidthNeeded) {
        // Default position (right) - no class needed
        return;
      } else if (spaceLeft >= cardWidthNeeded) {
        card.classList.add('position-left');
      } else if (spaceBottom >= cardHeightNeeded) {
        card.classList.add('position-bottom');
      } else if (spaceTop >= cardHeightNeeded) {
        card.classList.add('position-top');
      } else {
        // Fallback: position where there's most space
        const maxSpace = Math.max(spaceRight, spaceLeft, spaceBottom, spaceTop);

        if (maxSpace === spaceLeft) {
          card.classList.add('position-left');
        } else if (maxSpace === spaceBottom) {
          card.classList.add('position-bottom');
        } else if (maxSpace === spaceTop) {
          card.classList.add('position-top');
        }
        // else keep default (right)
      }
    }

    destroy() {
      // Remove scroll listener
      window.removeEventListener('scroll', this.handleScroll);

      // Clear active references
      this.activePointer = null;
      this.activeCard = null;

      // Clean up event listeners if needed
      this.pointers.forEach(pointer => {
        const newPointer = pointer.cloneNode(true);
        pointer.parentNode.replaceChild(newPointer, pointer);
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
      this.pointerHandler = null;

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

      // Initialize product pointers (desktop only)
      if (window.innerWidth > CONFIG.breakpoints.tablet) {
        this.pointerHandler = new ProductPointerHandler(this.section);
      }

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

      // Reinitialize product pointers on desktop, destroy on mobile
      if (isDesktop && !this.pointerHandler) {
        this.pointerHandler = new ProductPointerHandler(this.section);
      } else if (!isDesktop && this.pointerHandler) {
        this.pointerHandler.destroy();
        this.pointerHandler = null;
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
