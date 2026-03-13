/**
 * Shop Collection Arch Section - JavaScript
 * Handles video loading (YouTube/Vimeo/Direct) and parallax effects
 */

(function() {
  'use strict';

  // ============================================================================
  // Configuration
  // ============================================================================
  const CONFIG = {
    selectors: {
      section: '.custom-section-shop-collection-arch',
      videoContainer: '.js-video-container',
      parallaxImages: '.js-parallax-image',
      ctaButton: '.custom-section-shop-collection-arch__cta'
    },
    breakpoints: {
      tablet: 1024
    },
    parallax: {
      movement: 80, // Pixels of vertical movement (increased for more dramatic effect)
      ease: 'none'
    }
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

      switch (videoType) {
        case 'youtube':
          this.loadYouTubeVideo();
          break;
        case 'vimeo':
          this.loadVimeoVideo();
          break;
        case 'direct':
          this.loadDirectVideo();
          break;
        default:
          console.warn('Shop Collection Arch: Unsupported video URL format');
      }
    }

    detectVideoType(url) {
      if (!url) return null;

      // YouTube patterns
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        return 'youtube';
      }

      // Vimeo patterns
      if (url.includes('vimeo.com')) {
        return 'vimeo';
      }

      // Direct video file patterns
      if (url.match(/\.(mp4|webm|ogg)$/i) || url.includes('.mp4') || url.includes('.webm')) {
        return 'direct';
      }

      return null;
    }

    extractYouTubeId(url) {
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/,
        /^([a-zA-Z0-9_-]{11})$/
      ];

      for (let pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
      }

      return null;
    }

    extractVimeoId(url) {
      const match = url.match(/vimeo\.com\/(\d+)/);
      return match ? match[1] : null;
    }

    loadYouTubeVideo() {
      const videoId = this.extractYouTubeId(this.videoUrl);

      if (!videoId) {
        console.warn('Shop Collection Arch: Could not extract YouTube video ID');
        return;
      }

      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;
      iframe.allow = 'autoplay; encrypted-media';
      iframe.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; pointer-events: none;';
      iframe.title = 'YouTube video player';

      this.container.innerHTML = '';
      this.container.appendChild(iframe);
    }

    loadVimeoVideo() {
      const videoId = this.extractVimeoId(this.videoUrl);

      if (!videoId) {
        console.warn('Shop Collection Arch: Could not extract Vimeo video ID');
        return;
      }

      const iframe = document.createElement('iframe');
      iframe.src = `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&background=1&controls=0`;
      iframe.allow = 'autoplay; fullscreen';
      iframe.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; pointer-events: none;';
      iframe.title = 'Vimeo video player';

      this.container.innerHTML = '';
      this.container.appendChild(iframe);
    }

    loadDirectVideo() {
      const video = document.createElement('video');
      video.src = this.videoUrl;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.controls = false;
      video.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); min-width: 100%; min-height: 100%; width: auto; height: auto; object-fit: cover;';

      // Handle video load errors
      video.addEventListener('error', () => {
        console.warn('Shop Collection Arch: Failed to load video');
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

      if (this.isDesktop && this.images.length > 0 && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        this.init();
      }
    }

    init() {
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      this.images.forEach((image) => {
        // Create parallax effect for each image
        // Animation goes from -movement to +movement for proper parallax effect
        // Tighter trigger range means animation completes faster (more visible in middle)
        gsap.fromTo(image,
          {
            y: -CONFIG.parallax.movement
          },
          {
            y: CONFIG.parallax.movement,
            ease: CONFIG.parallax.ease,
            scrollTrigger: {
              trigger: this.section,
              start: 'top 80%', // Start animation when section reaches 80% from top
              end: 'bottom 20%', // End animation when section is 20% from top
              scrub: true
            }
          }
        );
      });
    }

    destroy() {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    }
  }

  // ============================================================================
  // CTA Animation Handler
  // ============================================================================
  class CTAAnimationHandler {
    constructor(section) {
      this.ctaButtons = section.querySelectorAll(CONFIG.selectors.ctaButton);
      this.init();
    }

    init() {
      this.ctaButtons.forEach(button => {
        // Mouse enter: trigger exit-enter animation
        button.addEventListener('mouseenter', () => {
          // Remove any existing animation classes
          button.classList.remove('animate-exit');
          // Add enter animation class
          button.classList.add('animate-enter');

          // Remove class after animation completes
          setTimeout(() => {
            button.classList.remove('animate-enter');
          }, 800); // Match the animation duration
        });

        // Mouse leave: trigger exit-enter animation
        button.addEventListener('mouseleave', () => {
          // Remove any existing animation classes
          button.classList.remove('animate-enter');
          // Add exit animation class
          button.classList.add('animate-exit');

          // Remove class after animation completes
          setTimeout(() => {
            button.classList.remove('animate-exit');
          }, 800); // Match the animation duration
        });
      });
    }
  }

  // ============================================================================
  // Lottie Animation Handler
  // ============================================================================
  class LottieHandler {
    constructor(section) {
      this.section = section;
      this.lottieContainer = section.querySelector('.js-lottie-ellipse');
      this.animation = null;

      if (this.lottieContainer) {
        this.init();
      }
    }

    init() {
      // Check if Lottie is loaded
      if (typeof lottie === 'undefined') {
        console.error('Lottie library not loaded for Shop Collection Arch');
        // Retry after a short delay
        setTimeout(() => this.init(), 100);
        return;
      }

      const lottieUrl = this.lottieContainer.dataset.lottieUrl;
      const sectionId = this.lottieContainer.dataset.sectionId;

      if (!lottieUrl) {
        console.log('No lottie URL found for Shop Collection Arch section');
        return;
      }

      // Load and play lottie animation
      this.animation = lottie.loadAnimation({
        container: this.lottieContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: lottieUrl,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
          progressiveLoad: true,
          hideOnTransparent: true,
        },
      });

      // Log when animation is loaded
      this.animation.addEventListener('DOMLoaded', () => {
        console.log('Lottie ellipse animation loaded for section:', sectionId);
      });

      // Handle errors
      this.animation.addEventListener('data_failed', (error) => {
        console.error('Failed to load Lottie ellipse animation:', lottieUrl, error);
      });
    }

    destroy() {
      if (this.animation) {
        this.animation.destroy();
        this.animation = null;
      }
    }
  }

  // ============================================================================
  // Section Manager
  // ============================================================================
  class ShopCollectionArchSection {
    constructor(section) {
      this.section = section;
      this.videoContainers = section.querySelectorAll(CONFIG.selectors.videoContainer);
      this.parallaxHandler = null;
      this.ctaHandler = null;
      this.lottieHandler = null;

      this.init();
      this.bindEvents();
    }

    init() {
      // Initialize video handlers
      this.videoContainers.forEach(container => {
        new VideoHandler(container);
      });

      // Initialize lottie animation
      this.lottieHandler = new LottieHandler(this.section);

      // Initialize parallax (desktop only)
      if (window.innerWidth > CONFIG.breakpoints.tablet) {
        this.parallaxHandler = new ParallaxHandler(this.section);
      }

      // Initialize CTA animations
      this.ctaHandler = new CTAAnimationHandler(this.section);
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
      new ShopCollectionArchSection(section);
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
