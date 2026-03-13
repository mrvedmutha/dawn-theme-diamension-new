/**
 * Bespoke Creations Section - JavaScript
 * Handles video loading (Direct MP4/WebM) and parallax effects
 */

(function () {
  'use strict';

  // ============================================================================
  // Configuration
  // ============================================================================
  const CONFIG = {
    selectors: {
      section: '.custom-section-bespoke-creations',
      videoContainer: '.js-video-container',
      parallaxImages: '.js-parallax-image',
    },
    breakpoints: {
      tablet: 1024,
    },
    parallax: {
      movement: 250, // Pixels of vertical movement
      ease: 'none',
    },
  };

  // ============================================================================
  // Video Handler
  // ============================================================================
  class VideoHandler {
    constructor(container) {
      this.container = container;
      this.videoUrl = container.dataset.videoUrl;

      if (this.videoUrl) {
        this.init();
      }
    }

    init() {
      const videoType = this.detectVideoType(this.videoUrl);

      if (videoType === 'direct') {
        this.loadDirectVideo();
      } else {
        console.warn(
          'Bespoke Creations: Unsupported video URL format. Only direct video links (.mp4, .webm) are supported.'
        );
      }
    }

    detectVideoType(url) {
      if (!url) return null;

      // Direct video file patterns
      if (url.match(/\.(mp4|webm|ogg)$/i) || url.includes('.mp4') || url.includes('.webm')) {
        return 'direct';
      }

      return null;
    }

    loadDirectVideo() {
      const video = document.createElement('video');
      video.src = this.videoUrl;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.controls = false;
      video.style.cssText =
        'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); min-width: 100%; min-height: 100%; width: auto; height: auto; object-fit: cover;';

      // Handle video load errors
      video.addEventListener('error', () => {
        console.warn('Bespoke Creations: Failed to load video');
      });

      this.container.innerHTML = '';
      this.container.appendChild(video);
    }
  }

  // ============================================================================
  // Parallax Handler (GSAP)
  // ============================================================================
  class ParallaxHandler {
    constructor(section) {
      this.section = section;
      this.images = section.querySelectorAll(CONFIG.selectors.parallaxImages);
      this.isDesktop = window.innerWidth > CONFIG.breakpoints.tablet;

      if (
        this.isDesktop &&
        this.images.length > 0 &&
        typeof gsap !== 'undefined' &&
        typeof ScrollTrigger !== 'undefined'
      ) {
        this.init();
      }
    }

    init() {
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      this.images.forEach((image) => {
        // Create parallax effect for each image
        // Animation goes from -movement to +movement for proper parallax effect
        gsap.fromTo(
          image,
          {
            y: -CONFIG.parallax.movement,
          },
          {
            y: CONFIG.parallax.movement,
            ease: CONFIG.parallax.ease,
            scrollTrigger: {
              trigger: this.section,
              start: 'top 80%', // Start animation when section reaches 80% from top
              end: 'bottom 20%', // End animation when section is 20% from top
              scrub: true,
            },
          }
        );
      });
    }

    destroy() {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    }
  }

  // ============================================================================
  // Section Manager
  // ============================================================================
  class BespokeCreationsSection {
    constructor(section) {
      this.section = section;
      this.videoContainers = section.querySelectorAll(CONFIG.selectors.videoContainer);
      this.parallaxHandler = null;

      this.init();
      this.bindEvents();
    }

    init() {
      // Initialize video handlers
      this.videoContainers.forEach((container) => {
        new VideoHandler(container);
      });

      // Initialize parallax (desktop only)
      if (window.innerWidth > CONFIG.breakpoints.tablet) {
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

    sections.forEach((section) => {
      new BespokeCreationsSection(section);
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
    document.addEventListener('shopify:section:load', function (event) {
      if (event.target.querySelector(CONFIG.selectors.section)) {
        init();
      }
    });
  }
})();
