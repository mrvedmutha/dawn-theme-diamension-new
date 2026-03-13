(function () {
  'use strict';

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
      movement: 250,
      ease: 'none',
    },
  };

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

      video.addEventListener('error', () => {
        console.warn('Bespoke Creations: Failed to load video');
      });

      this.container.innerHTML = '';
      this.container.appendChild(video);
    }
  }

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
      gsap.registerPlugin(ScrollTrigger);

      this.images.forEach((image) => {
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
              start: 'top 80%',
              end: 'bottom 20%',
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

  class BespokeCreationsSection {
    constructor(section) {
      this.section = section;
      this.videoContainers = section.querySelectorAll(CONFIG.selectors.videoContainer);
      this.parallaxHandler = null;

      this.init();
      this.bindEvents();
    }

    init() {
      this.videoContainers.forEach((container) => {
        new VideoHandler(container);
      });

      if (window.innerWidth > CONFIG.breakpoints.tablet) {
        this.parallaxHandler = new ParallaxHandler(this.section);
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
    }
  }

  function init() {
    const sections = document.querySelectorAll(CONFIG.selectors.section);

    if (sections.length === 0) return;

    sections.forEach((section) => {
      new BespokeCreationsSection(section);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  if (typeof Shopify !== 'undefined' && Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (event) {
      if (event.target.querySelector(CONFIG.selectors.section)) {
        init();
      }
    });
  }
})();
