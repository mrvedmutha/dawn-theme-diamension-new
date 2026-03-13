(function() {
  'use strict';

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
      movement: 200,
      ease: 'none'
    },
    card: {
      width: 327,
      height: 175,
      offset: 16
    }
  };

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
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(this.background,
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

  class CTAAnimationHandler {
    constructor(section) {
      this.ctaButton = section.querySelector(CONFIG.selectors.ctaButton);

      if (this.ctaButton) {
        this.init();
      }
    }

    init() {
      this.ctaButton.addEventListener('mouseenter', () => {
        this.ctaButton.classList.remove('animate-exit');
        this.ctaButton.classList.add('animate-enter');

        setTimeout(() => {
          this.ctaButton.classList.remove('animate-enter');
        }, 800);
      });

      this.ctaButton.addEventListener('mouseleave', () => {
        this.ctaButton.classList.remove('animate-enter');
        this.ctaButton.classList.add('animate-exit');

        setTimeout(() => {
          this.ctaButton.classList.remove('animate-exit');
        }, 800);
      });
    }
  }

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

        pointer.addEventListener('mouseenter', () => {
          this.activePointer = pointer;
          this.activeCard = card;
          this.positionCard(pointer, card);
        });

        pointer.addEventListener('mouseleave', () => {
          if (this.activePointer === pointer) {
            this.activePointer = null;
            this.activeCard = null;
          }
        });
      });

      this.handleScroll = this.handleScroll.bind(this);
      window.addEventListener('scroll', this.handleScroll, { passive: true });
    }

    handleScroll() {
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
      const pointerRect = pointer.getBoundingClientRect();
      const pointerCenterX = pointerRect.left + (pointerRect.width / 2);
      const pointerCenterY = pointerRect.top + (pointerRect.height / 2);

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const spaceRight = viewportWidth - pointerCenterX;
      const spaceLeft = pointerCenterX;
      const spaceBottom = viewportHeight - pointerCenterY;
      const spaceTop = pointerCenterY;

      const cardWidthNeeded = CONFIG.card.width + CONFIG.card.offset;
      const cardHeightNeeded = CONFIG.card.height + CONFIG.card.offset;

      card.classList.remove('position-right', 'position-left', 'position-bottom', 'position-top');

      if (spaceRight >= cardWidthNeeded) {
        return;
      } else if (spaceLeft >= cardWidthNeeded) {
        card.classList.add('position-left');
      } else if (spaceBottom >= cardHeightNeeded) {
        card.classList.add('position-bottom');
      } else if (spaceTop >= cardHeightNeeded) {
        card.classList.add('position-top');
      } else {
        const maxSpace = Math.max(spaceRight, spaceLeft, spaceBottom, spaceTop);

        if (maxSpace === spaceLeft) {
          card.classList.add('position-left');
        } else if (maxSpace === spaceBottom) {
          card.classList.add('position-bottom');
        } else if (maxSpace === spaceTop) {
          card.classList.add('position-top');
        }
      }
    }

    destroy() {
      window.removeEventListener('scroll', this.handleScroll);

      this.activePointer = null;
      this.activeCard = null;

      this.pointers.forEach(pointer => {
        const newPointer = pointer.cloneNode(true);
        pointer.parentNode.replaceChild(newPointer, pointer);
      });
    }
  }

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
      if (window.innerWidth > CONFIG.breakpoints.tablet) {
        this.parallaxHandler = new ParallaxHandler(this.section);
      }

      this.ctaHandler = new CTAAnimationHandler(this.section);

      if (window.innerWidth > CONFIG.breakpoints.tablet) {
        this.pointerHandler = new ProductPointerHandler(this.section);
      }

      this.initTextReveal();
    }

    initTextReveal() {
      const rect = this.section.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport) {
        setTimeout(() => {
          this.section.classList.add('is-visible');
        }, 100);
      } else {
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

      if (isDesktop && !this.parallaxHandler) {
        this.parallaxHandler = new ParallaxHandler(this.section);
      } else if (!isDesktop && this.parallaxHandler) {
        this.parallaxHandler.destroy();
        this.parallaxHandler = null;
      }

      if (isDesktop && !this.pointerHandler) {
        this.pointerHandler = new ProductPointerHandler(this.section);
      } else if (!isDesktop && this.pointerHandler) {
        this.pointerHandler.destroy();
        this.pointerHandler = null;
      }
    }
  }

  function init() {
    const sections = document.querySelectorAll(CONFIG.selectors.section);

    if (sections.length === 0) return;

    sections.forEach(section => {
      new ImageHeroSection(section);
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
