/**
 * Brilliance 3D Section
 * - Canvas-based frame rendering (dual layer)
 * - GSAP ScrollTrigger animations
 * - Full image preloading for seamless playback
 */

(function() {
  'use strict';

  // Wait for GSAP to load
  function initWhenReady() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initWhenReady, 100);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    initBrillance3D();
  }

  function initBrillance3D() {
    const sections = document.querySelectorAll('.brillance-3d');

    sections.forEach((section) => {
      const sectionId = section.dataset.sectionId;
      const data = window.brillance3dData?.[sectionId];

      if (!data || !data.backgroundUrls || !data.foregroundUrls) {
        console.error('Brillance 3D data not found');
        return;
      }

      new Brillance3DController(section, data);
    });
  }

  class Brillance3DController {
    constructor(section, data) {
      this.section = section;
      this.backgroundUrls = data.backgroundUrls;
      this.foregroundUrls = data.foregroundUrls;
      this.totalFrames = this.backgroundUrls.length;

      // DOM elements
      this.canvasBg = section.querySelector('[data-canvas-bg]');
      this.canvasFg = section.querySelector('[data-canvas-fg]');
      this.ctxBg = this.canvasBg.getContext('2d');
      this.ctxFg = this.canvasFg.getContext('2d');
      this.pinnedContainer = section.querySelector('[data-pinned-container]');
      this.paragraph = section.querySelector('[data-paragraph]');
      this.cta = section.querySelector('[data-cta]');
      this.spacer = section.querySelector('[data-spacer]');

      // State
      this.backgroundImages = [];
      this.foregroundImages = [];
      this.loadedBgCount = 0;
      this.loadedFgCount = 0;
      this.currentFrame = 0;

      console.log('Initializing Brilliance 3D:', {
        totalFrames: this.totalFrames,
        spacerHeight: this.spacer.offsetHeight
      });

      // Initialize
      this.init();
    }

    async init() {
      // Load all images (already preloading via <link rel="preload"> in HTML)
      try {
        await this.preloadAllFrames();
      } catch (error) {
        console.error('Error loading frames:', error);
      }

      // Setup animations after images are ready
      this.setupScrollTrigger();
    }

    /**
     * Preload ALL frames before animation starts for seamless experience
     */
    async preloadAllFrames() {
      console.log('Loading 3D animation frames...');

      for (let i = 0; i < this.totalFrames; i++) {
        await this.loadBothFrames(i);

        // Allow other tasks to run every 5 images
        if (i % 5 === 0) {
          await new Promise(resolve => setTimeout(resolve, 0));
        }
      }

      console.log('All frames loaded:', this.totalFrames);

      // Draw first frame
      this.drawFrame(0);
    }

    /**
     * Load both background and foreground frames
     */
    loadBothFrames(index) {
      return Promise.all([
        this.loadImage(this.backgroundUrls[index], this.backgroundImages, index),
        this.loadImage(this.foregroundUrls[index], this.foregroundImages, index)
      ]);
    }

    /**
     * Load a single image
     */
    loadImage(url, imageArray, index) {
      return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
          imageArray[index] = img;
          resolve();
        };

        img.onerror = () => {
          console.error('Failed to load image:', url);
          resolve(); // Resolve anyway to not block
        };

        img.src = url;
      });
    }

    /**
     * Draw specific frame to both canvases
     */
    drawFrame(frameIndex) {
      const frame = Math.floor(frameIndex);

      // Draw background
      if (this.backgroundImages[frame]) {
        this.ctxBg.clearRect(0, 0, this.canvasBg.width, this.canvasBg.height);
        this.ctxBg.drawImage(
          this.backgroundImages[frame],
          0,
          0,
          this.canvasBg.width,
          this.canvasBg.height
        );
      }

      // Draw foreground
      if (this.foregroundImages[frame]) {
        this.ctxFg.clearRect(0, 0, this.canvasFg.width, this.canvasFg.height);
        this.ctxFg.drawImage(
          this.foregroundImages[frame],
          0,
          0,
          this.canvasFg.width,
          this.canvasFg.height
        );
      }

      this.currentFrame = frame;
    }

    /**
     * Setup GSAP ScrollTrigger - EXACT T-shirt approach
     */
    setupScrollTrigger() {
      console.log('Setting up ScrollTrigger with spacer height:', this.spacer.offsetHeight);

      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: this.pinnedContainer,
          start: 'top top',
          end: () => `+=${this.spacer.offsetHeight}`,
          scrub: 1,
          pin: this.pinnedContainer,
          pinSpacing: false,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const targetFrame = Math.floor(progress * (this.totalFrames - 1));

            // Draw frame
            this.drawFrame(targetFrame);

            // DETAILED LOGGING - Every 5% for precise timing
            const progressPercent = Math.round(progress * 100);
            if (progressPercent % 5 === 0 && progressPercent !== this.lastLoggedProgress) {
              this.lastLoggedProgress = progressPercent;
              console.log(`📊 SCROLL: ${progressPercent}% | Frame: ${targetFrame}/${this.totalFrames - 1} | Paragraph opacity: ${this.paragraph ? window.getComputedStyle(this.paragraph).opacity : 'N/A'} | CTA opacity: ${this.cta ? window.getComputedStyle(this.cta).opacity : 'N/A'}`);
            }
          }
        }
      });

      // Paragraph Animation: 0-5% fade in from bottom, 20-25% fade out
      if (this.paragraph) {
        // Fade in from bottom (0% to 5%)
        mainTimeline.fromTo(this.paragraph,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' },
          0 // Start at 0%
        );

        // Fade out (20% to 25%)
        mainTimeline.to(this.paragraph,
          { opacity: 0, duration: 0.05, ease: 'power2.in' },
          0.2 // Start at 20%
        );
      }

      // CTA Animation: Fade in at 55% and stay visible
      if (this.cta) {
        // Fade in at 55%
        mainTimeline.fromTo(this.cta,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' },
          0.55 // Start at 55%
        );
      }

      // Refresh ScrollTrigger
      ScrollTrigger.refresh();
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhenReady);
  } else {
    initWhenReady();
  }

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });

})();
