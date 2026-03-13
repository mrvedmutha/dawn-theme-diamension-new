(function() {
  'use strict';

  const CONFIG = {
    selectors: {
      section: '.custom-section-diamension-follow-insta',
      parallaxImages: '.js-parallax-image',
      ctaButton: '.custom-section-diamension-follow-insta__cta'
    },
    breakpoints: {
      desktop: 1024
    },
    parallax: {
      movement: 80,
      ease: 'none'
    }
  };

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
      gsap.registerPlugin(ScrollTrigger);

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

  class CTAAnimationHandler {
    constructor(section) {
      this.ctaButtons = section.querySelectorAll(CONFIG.selectors.ctaButton);
      this.init();
    }

    init() {
      this.ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          button.classList.remove('animate-exit');
          button.classList.add('animate-enter');

          setTimeout(() => {
            button.classList.remove('animate-enter');
          }, 800);
        });

        button.addEventListener('mouseleave', () => {
          button.classList.remove('animate-enter');
          button.classList.add('animate-exit');

          setTimeout(() => {
            button.classList.remove('animate-exit');
          }, 800);
        });
      });
    }
  }

  class DiamensionFollowInstaSection {
    constructor(section) {
      this.section = section;
      this.parallaxHandler = null;
      this.ctaHandler = null;

      this.init();
      this.bindEvents();
    }

    init() {
      if (window.innerWidth > CONFIG.breakpoints.desktop) {
        this.parallaxHandler = new ParallaxHandler(this.section);
      }

      this.ctaHandler = new CTAAnimationHandler(this.section);
    }

    bindEvents() {
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

  function init() {
    const sections = document.querySelectorAll(CONFIG.selectors.section);

    if (sections.length === 0) return;

    sections.forEach(section => {
      const instance = new DiamensionFollowInstaSection(section);
      section.diamensionFollowInstaInstance = instance;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

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
