/**
 * Brilliance 3D Section
 * - Canvas-based frame rendering (dual layer)
 * - GSAP ScrollTrigger animations
 * - Progressive image loading
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
      // Load critical frames first (first 30)
      await this.loadCriticalFrames();

      // Setup animations
      this.setupScrollTrigger();

      // Load remaining frames in background
      this.loadRemainingFrames();
    }

    /**
     * Load first 30 frames for immediate playback
     */
    async loadCriticalFrames() {
      const criticalCount = Math.min(30, this.totalFrames);
      const promises = [];

      for (let i = 0; i < criticalCount; i++) {
        promises.push(this.loadBothFrames(i));
      }

      await Promise.all(promises);
      console.log('Critical frames loaded:', criticalCount);

      // Draw first frame
      this.drawFrame(0);
    }

    /**
     * Load remaining frames in background
     */
    async loadRemainingFrames() {
      const criticalCount = Math.min(30, this.totalFrames);

      for (let i = criticalCount; i < this.totalFrames; i++) {
        await this.loadBothFrames(i);

        // Every 10 images, allow other tasks to run
        if (i % 10 === 0) {
          await new Promise(resolve => setTimeout(resolve, 0));
        }
      }

      console.log('All frames loaded');
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

      // Paragraph - visible 0-20%, fades out 20-25%
      if (this.paragraph) {
        // Set initial visible state (OUTSIDE timeline)
        gsap.set(this.paragraph, { opacity: 1, y: 0 });

        // Fade out from 20% to 25%
        mainTimeline.to(this.paragraph,
          { opacity: 0, duration: 0.05, ease: 'power2.in' },
          0.2
        );
      }

      // CTA - hidden until 55%, then reveal
      if (this.cta) {
        console.log('🎯 CTA: Should be hidden until 55%');

        // Single tween starting at 55%, with immediateRender: false
        mainTimeline.fromTo(this.cta,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.1,
            ease: 'power2.out',
            immediateRender: false, // Don't render until tween actually starts
            onStart: () => console.log('🚀 CTA reveal at 55%')
          },
          0.55
        );
      }

      // CTA reveal (0% - 30%)
      if (this.cta) {
        mainTimeline.fromTo(this.cta,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          0 // Start immediately at beginning
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
