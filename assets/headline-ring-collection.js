/**
 * Headline Ring Collection Section
 * Handles GSAP scroll-triggered reveal animations and parallax
 * Figma Node: 12:4785
 */

(function () {
  'use strict';

  // Check if GSAP is available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger is not loaded. Animations will not work.');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Check if device is desktop (min-width: 1025px)
  const isDesktop = () => window.matchMedia('(min-width: 1025px)').matches;

  class HeadlineRingCollection {
    constructor(section) {
      this.section = section;
      this.parallaxImage = this.section.querySelector('[data-parallax-image]');
      this.headlineLine1 = this.section.querySelector('.headline-ring-collection__headline--line-1');
      this.headlineLine2 = this.section.querySelector('.headline-ring-collection__headline--line-2');
      this.headlineLine3 = this.section.querySelector('.headline-ring-collection__headline--line-3');
      this.cta = this.section.querySelector('.headline-ring-collection__cta');
      this.content = this.section.querySelector('.headline-ring-collection__content');
      this.features = this.section.querySelector('.headline-ring-collection__features');
      this.badges = this.section.querySelector('.headline-ring-collection__badges');

      this.animations = [];
      this.parallaxAnimation = null;

      this.init();
    }

    init() {
      this.initRevealAnimations();
      this.initParallax();
      this.initCTAAnimation();
    }

    initRevealAnimations() {
      // Set initial states for headlines with clipPath for directional reveal
      // Line 1 (Brilliance) - reveal from left to right
      if (this.headlineLine1) {
        gsap.set(this.headlineLine1, {
          clipPath: 'inset(0 100% 0 0)',
          visibility: 'visible',
        });
      }

      // Line 2 (Without) - reveal from right to left
      if (this.headlineLine2) {
        gsap.set(this.headlineLine2, {
          clipPath: 'inset(0 0 0 100%)',
          visibility: 'visible',
        });
      }

      // Line 3 (Compromise) - reveal from left to right
      if (this.headlineLine3) {
        gsap.set(this.headlineLine3, {
          clipPath: 'inset(0 100% 0 0)',
          visibility: 'visible',
        });
      }

      // Other elements - from bottom
      const bottomElements = [this.cta, this.content, this.features, this.badges].filter(Boolean);
      bottomElements.forEach((el) => {
        gsap.set(el, {
          opacity: 0,
          y: 50,
          visibility: 'visible',
        });
      });

      // Create timeline for headline animations - staggered clipPath reveal
      const headlineTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: this.section,
          start: 'top 80%',
          once: true,
        },
        delay: 0.4,
      });

      // Headline Line 1 (Brilliance) - reveal from left to right
      if (this.headlineLine1) {
        headlineTimeline.to(
          this.headlineLine1,
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.8,
            ease: 'power3.out',
          },
          0,
        );
      }

      // Headline Line 2 (Without) - reveal from right to left with stagger
      if (this.headlineLine2) {
        headlineTimeline.to(
          this.headlineLine2,
          {
            clipPath: 'inset(0 0 0 0%)',
            duration: 0.8,
            ease: 'power3.out',
          },
          0.2,
        );
      }

      // Headline Line 3 (Compromise) - reveal from left to right with stagger
      if (this.headlineLine3) {
        headlineTimeline.to(
          this.headlineLine3,
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.8,
            ease: 'power3.out',
          },
          0.4,
        );
      }

      this.animations.push(headlineTimeline);

      // Product image reveal animation
      if (this.parallaxImage) {
        gsap.set(this.parallaxImage, {
          opacity: 0,
          y: 80,
          scale: 0.95,
          visibility: 'visible',
        });

        const imageAnimation = gsap.to(this.parallaxImage, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: this.section,
            start: 'top 75%',
            once: true,
          },
        });

        this.animations.push(imageAnimation);
      }

      // CTA animation
      if (this.cta) {
        const ctaAnimation = gsap.to(this.cta, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: this.section,
            start: 'top 70%',
            once: true,
          },
        });

        this.animations.push(ctaAnimation);
      }

      // Content paragraph animation
      if (this.content) {
        const contentAnimation = gsap.to(this.content, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: this.section,
            start: 'top 80%',
            once: true,
          },
        });

        this.animations.push(contentAnimation);
      }

      // Features animation with stagger
      if (this.features) {
        const featureItems = this.features.querySelectorAll('.headline-ring-collection__feature');

        if (featureItems.length > 0) {
          gsap.set(featureItems, {
            opacity: 0,
            y: 40,
            visibility: 'visible',
          });

          // Reset parent container
          gsap.set(this.features, {
            opacity: 1,
            y: 0,
          });

          const featuresAnimation = gsap.to(featureItems, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: this.section,
              start: 'top 80%',
              once: true,
            },
          });

          this.animations.push(featuresAnimation);
        }
      }

      // Badges animation with stagger
      if (this.badges) {
        const badgeItems = this.badges.querySelectorAll('.headline-ring-collection__badge');

        if (badgeItems.length > 0) {
          gsap.set(badgeItems, {
            opacity: 0,
            y: 30,
            visibility: 'visible',
          });

          // Reset parent container
          gsap.set(this.badges, {
            opacity: 1,
            y: 0,
          });

          const badgesAnimation = gsap.to(badgeItems, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 1.0,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: this.section,
              start: 'top 80%',
              once: true,
            },
          });

          this.animations.push(badgesAnimation);
        }
      }
    }

    initParallax() {
      if (!this.parallaxImage) return;

      // Enhanced parallax for desktop only (no parallax on mobile/tablet)
      if (isDesktop()) {
        // More dramatic parallax movement on desktop (y-axis)
        this.parallaxAnimation = gsap.fromTo(
          this.parallaxImage,
          {
            yPercent: -30,
          },
          {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
              trigger: this.section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          },
        );
      }
    }

    initCTAAnimation() {
      if (!this.cta) return;

      // Mouse enter: trigger exit-enter animation
      this.cta.addEventListener('mouseenter', () => {
        this.cta.classList.remove('animate-exit');
        this.cta.classList.add('animate-enter');

        setTimeout(() => {
          this.cta.classList.remove('animate-enter');
        }, 800);
      });

      // Mouse leave: trigger exit-enter animation
      this.cta.addEventListener('mouseleave', () => {
        this.cta.classList.remove('animate-enter');
        this.cta.classList.add('animate-exit');

        setTimeout(() => {
          this.cta.classList.remove('animate-exit');
        }, 800);
      });
    }

    onUnload() {
      // Clean up all ScrollTrigger instances
      this.animations.forEach((anim) => {
        if (anim && anim.scrollTrigger) {
          anim.scrollTrigger.kill();
        }
      });

      if (this.parallaxAnimation && this.parallaxAnimation.scrollTrigger) {
        this.parallaxAnimation.scrollTrigger.kill();
      }

      // Kill all animations
      this.animations.forEach((anim) => {
        if (anim) anim.kill();
      });

      if (this.parallaxAnimation) {
        this.parallaxAnimation.kill();
      }

      this.animations = [];
      this.parallaxAnimation = null;
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
