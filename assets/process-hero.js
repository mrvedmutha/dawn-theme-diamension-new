/**
 * Process Hero Section
 * Scroll-driven storytelling with canvas-based 3D animation
 * Architecture: FrameEngine → EnterAnimation → Master Timeline (ScrollTrigger)
 */

(function() {
  'use strict';

  // Progress constants for timeline (0.0 to 1.0)
  const PROGRESS = {
    INTRO_MASK_IN_START: 0.00,
    INTRO_MASK_IN_END: 0.03,
    INTRO_HOLD_END: 0.06,
    INTRO_MASK_OUT_START: 0.06,
    INTRO_MASK_OUT_END: 0.09,

    PHASE1_MASK_IN_START: 0.09,
    PHASE1_MASK_IN_END: 0.12,
    PHASE1_ACTIVE_START: 0.12,
    PHASE1_ACTIVE_END: 0.30,
    PHASE1_MASK_OUT_START: 0.30,
    PHASE1_MASK_OUT_END: 0.33,

    PHASE2_MASK_IN_START: 0.33,
    PHASE2_MASK_IN_END: 0.36,
    PHASE2_ACTIVE_START: 0.36,
    PHASE2_ACTIVE_END: 0.58,
    PHASE2_MASK_OUT_START: 0.58,
    PHASE2_MASK_OUT_END: 0.61,

    PHASE3_MASK_IN_START: 0.61,
    PHASE3_MASK_IN_END: 0.64,
    PHASE3_ACTIVE_START: 0.64,
    PHASE3_ACTIVE_END: 0.90,
    PHASE3_MASK_OUT_START: 0.90,
    PHASE3_MASK_OUT_END: 0.93,

    FINAL_STATE_START: 0.93,
    FINAL_STATE_END: 1.00
  };

  // Wait for GSAP to load
  function initWhenReady() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initWhenReady, 100);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    initProcessHero();
  }

  function initProcessHero() {
    const sections = document.querySelectorAll('[data-process-hero]');

    sections.forEach((section) => {
      const sectionId = section.dataset.sectionId;
      const data = window.processHeroData?.[sectionId];

      if (!data || !data.backgroundUrls || !data.foregroundUrls) {
        console.error('Process Hero data not found');
        return;
      }

      new ProcessHeroController(section, data);
    });
  }

  /**
   * ========================================
   * FRAME ENGINE
   * Canvas preload + draw (extracted from brillance-3d pattern)
   * ========================================
   */
  class FrameEngine {
    constructor(canvasBg, canvasFg, backgroundUrls, foregroundUrls) {
      this.canvasBg = canvasBg;
      this.canvasFg = canvasFg;
      this.ctxBg = canvasBg.getContext('2d');
      this.ctxFg = canvasFg.getContext('2d');
      this.backgroundUrls = backgroundUrls;
      this.foregroundUrls = foregroundUrls;
      this.totalFrames = backgroundUrls.length;

      this.backgroundImages = [];
      this.foregroundImages = [];
      this.currentFrame = 0;
    }

    async preloadAllFrames() {
      console.log('Loading canvas frames:', this.totalFrames);

      for (let i = 0; i < this.totalFrames; i++) {
        await this.loadBothFrames(i);

        if (i % 5 === 0) {
          await new Promise(resolve => setTimeout(resolve, 0));
        }
      }

      console.log('All frames loaded');
      this.drawFrame(0);
    }

    loadBothFrames(index) {
      return Promise.all([
        this.loadImage(this.backgroundUrls[index], this.backgroundImages, index),
        this.loadImage(this.foregroundUrls[index], this.foregroundImages, index)
      ]);
    }

    loadImage(url, imageArray, index) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          imageArray[index] = img;
          resolve();
        };
        img.onerror = () => {
          console.error('Failed to load:', url);
          resolve();
        };
        img.src = url;
      });
    }

    drawFrame(frameIndex) {
      const frame = Math.floor(frameIndex);

      // Draw background
      if (this.backgroundImages[frame]) {
        this.ctxBg.clearRect(0, 0, this.canvasBg.width, this.canvasBg.height);
        this.ctxBg.drawImage(
          this.backgroundImages[frame],
          0, 0,
          this.canvasBg.width,
          this.canvasBg.height
        );
      }

      // Draw foreground (NO mix-blend-mode, render as-is)
      if (this.foregroundImages[frame]) {
        this.ctxFg.clearRect(0, 0, this.canvasFg.width, this.canvasFg.height);
        this.ctxFg.drawImage(
          this.foregroundImages[frame],
          0, 0,
          this.canvasFg.width,
          this.canvasFg.height
        );
      }

      this.currentFrame = frame;
    }
  }

  /**
   * ========================================
   * PHASE MANAGER
   * Handles mask-in/out animations for intro and 3 phases
   * ========================================
   */
  class PhaseManager {
    constructor(intro, phases, scrollHint) {
      this.intro = intro;
      this.phases = phases; // Array of 3 phase elements
      this.scrollHint = scrollHint;
    }

    addToTimeline(timeline) {
      // Intro text is already revealed (auto-play), so only mask-out on scroll
      if (this.intro) {
        const introMasks = this.intro.querySelectorAll('.process-hero__mask > span');
        timeline.to(introMasks, {
          y: '-100%',
          duration: PROGRESS.INTRO_MASK_OUT_END - PROGRESS.INTRO_MASK_OUT_START,
          stagger: 0.005,
          ease: 'power2.in'
        }, PROGRESS.INTRO_MASK_OUT_START);
      }

      // Phase 1
      this.addPhaseMasks(timeline, 0, PROGRESS.PHASE1_MASK_IN_START, PROGRESS.PHASE1_MASK_IN_END, PROGRESS.PHASE1_MASK_OUT_START, PROGRESS.PHASE1_MASK_OUT_END);

      // Phase 2
      this.addPhaseMasks(timeline, 1, PROGRESS.PHASE2_MASK_IN_START, PROGRESS.PHASE2_MASK_IN_END, PROGRESS.PHASE2_MASK_OUT_START, PROGRESS.PHASE2_MASK_OUT_END);

      // Phase 3
      this.addPhaseMasks(timeline, 2, PROGRESS.PHASE3_MASK_IN_START, PROGRESS.PHASE3_MASK_IN_END, PROGRESS.PHASE3_MASK_OUT_START, PROGRESS.PHASE3_MASK_OUT_END);

      // Hide scroll hint at end of Phase 3 (mask out)
      if (this.scrollHint) {
        const scrollHintMask = this.scrollHint.closest('.process-hero__mask');
        if (scrollHintMask) {
          timeline.to(scrollHintMask.querySelector('span'), {
            y: '-100%',
            duration: 0.02,
            ease: 'power2.in'
          }, PROGRESS.PHASE3_MASK_OUT_START);
        }
      }
    }

    addPhaseMasks(timeline, phaseIndex, maskInStart, maskInEnd, maskOutStart, maskOutEnd) {
      const phase = this.phases[phaseIndex];
      if (!phase) return;

      const masks = phase.querySelectorAll('.process-hero__mask > span');

      // Show phase container
      timeline.set(phase, { opacity: 1, visibility: 'visible' }, maskInStart);

      // Mask-in
      timeline.to(masks, {
        y: 0,
        duration: maskInEnd - maskInStart,
        stagger: 0.01,
        ease: 'power2.out'
      }, maskInStart);

      // Mask-out
      timeline.to(masks, {
        y: '-100%',
        duration: maskOutEnd - maskOutStart,
        stagger: 0.005,
        ease: 'power2.in'
      }, maskOutStart);

      // Hide phase container
      timeline.set(phase, { opacity: 0, visibility: 'hidden' }, maskOutEnd);
    }
  }

  /**
   * ========================================
   * PROGRESS LINE MANAGER
   * Line growth + 3 diamond dots with travel
   * ========================================
   */
  class ProgressLineManager {
    constructor(progressLine, dots) {
      this.progressLine = progressLine;
      this.dots = dots; // Array of 3 dot elements
    }

    addToTimeline(timeline) {
      // Line grows LEFT to RIGHT throughout ENTIRE scroll (0% → 100%)
      // Tracks the whole scroll progress, not just intro phase
      timeline.fromTo(this.progressLine,
        { width: '0%' },
        { width: '100%', duration: 1, ease: 'none' }, // duration: 1 = full timeline length
        0 // Start at beginning, end at 1.0 (100% scroll)
      );

      // Dot 1: at right: 75% (= left: 25%)
      // Fills with blue color when line reaches ~25% width (25% scroll progress)
      if (this.dots[0]) {
        timeline.to(this.dots[0],
          {
            color: '#183754', // Fill with blue color
            duration: 0.05, // Quick color transition
            ease: 'power1.out'
          },
          0.25 // Trigger at 25% scroll
        );
      }

      // Dot 2: at right: 50% (= left: 50%)
      // Fills with blue color when line reaches ~50% width (50% scroll progress)
      if (this.dots[1]) {
        timeline.to(this.dots[1],
          {
            color: '#183754',
            duration: 0.05,
            ease: 'power1.out'
          },
          0.50 // Trigger at 50% scroll
        );
      }

      // Dot 3: at right: 25% (= left: 75%)
      // Fills with blue color when line reaches ~75% width (75% scroll progress)
      if (this.dots[2]) {
        timeline.to(this.dots[2],
          {
            color: '#183754',
            duration: 0.05,
            ease: 'power1.out'
          },
          0.75 // Trigger at 75% scroll
        );
      }
    }
  }

  /**
   * ========================================
   * CARD SCROLL MANAGER
   * Horizontal translateX scroll per phase
   * ========================================
   */
  class CardScrollManager {
    constructor(tracks) {
      this.tracks = tracks; // Array of 3 track elements
    }

    addToTimeline(timeline) {
      // Track 1 (Phase 1)
      this.addTrackScroll(timeline, 0, PROGRESS.PHASE1_ACTIVE_START, PROGRESS.PHASE1_ACTIVE_END);

      // Track 2 (Phase 2)
      this.addTrackScroll(timeline, 1, PROGRESS.PHASE2_ACTIVE_START, PROGRESS.PHASE2_ACTIVE_END);

      // Track 3 (Phase 3)
      this.addTrackScroll(timeline, 2, PROGRESS.PHASE3_ACTIVE_START, PROGRESS.PHASE3_ACTIVE_END);
    }

    addTrackScroll(timeline, trackIndex, startProgress, endProgress) {
      const track = this.tracks[trackIndex];
      if (!track) return;

      // Get viewport width (parent container)
      const viewport = track.parentElement;
      const viewportWidth = viewport ? viewport.offsetWidth : window.innerWidth;

      // Calculate positions for right-to-left scroll
      // Start: track positioned just off the right edge of viewport
      // End: track fully exited off the left edge
      const trackWidth = track.scrollWidth;
      const startX = viewportWidth; // Enter from right edge
      const endX = -trackWidth; // Exit off left edge

      // Show track
      timeline.set(track, { opacity: 1, visibility: 'visible' }, startProgress);

      // Animate from right to left (cards enter from right, exit to left)
      timeline.fromTo(track,
        { x: startX },
        { x: endX, duration: endProgress - startProgress, ease: 'none' },
        startProgress
      );

      // Hide track
      timeline.set(track, { opacity: 0, visibility: 'hidden' }, endProgress);
    }
  }

  /**
   * ========================================
   * MAIN CONTROLLER
   * Orchestrates all components
   * ========================================
   */
  class ProcessHeroController {
    constructor(section, data) {
      this.section = section;
      this.backgroundUrls = data.backgroundUrls;
      this.foregroundUrls = data.foregroundUrls;
      this.totalFrames = this.backgroundUrls.length;

      // DOM elements
      this.canvasBg = section.querySelector('[data-canvas-bg]');
      this.canvasFg = section.querySelector('[data-canvas-fg]');
      this.pinnedContainer = section.querySelector('[data-pinned-container]');
      this.spacer = section.querySelector('[data-spacer]');
      this.transitionOverlay = section.querySelector('[data-transition-overlay]');

      // Content elements
      this.intro = section.querySelector('[data-intro]');
      this.scrollHint = section.querySelector('[data-scroll-hint]');
      this.phases = Array.from(section.querySelectorAll('[data-phase]'));
      this.progressLine = section.querySelector('.process-hero__progress-line');
      this.dots = Array.from(section.querySelectorAll('[data-dot]'));
      this.cardTracks = Array.from(section.querySelectorAll('[data-track]'));

      console.log('Initializing Process Hero:', {
        totalFrames: this.totalFrames,
        phases: this.phases.length,
        spacerHeight: this.spacer.offsetHeight
      });

      this.init();
    }

    async init() {
      // 1. Initialize FrameEngine
      this.frameEngine = new FrameEngine(
        this.canvasBg,
        this.canvasFg,
        this.backgroundUrls,
        this.foregroundUrls
      );

      // 2. Load all frames
      try {
        await this.frameEngine.preloadAllFrames();
      } catch (error) {
        console.error('Error loading frames:', error);
      }

      // 3. Play enter animation
      this.playEnterAnimation();
    }

    playEnterAnimation() {
      console.log('Playing enter animation');

      // Check if coming from brillance-3d transition
      const fromBrillance = sessionStorage.getItem('fromBrillanceTransition') === 'true';

      if (fromBrillance) {
        // Animate ellipse shrinking away
        this.transitionOverlay.classList.add('active');

        const enterTimeline = gsap.timeline({
          delay: 0.3,
          onComplete: () => {
            this.transitionOverlay.classList.remove('active');
            // Clear session storage
            sessionStorage.removeItem('fromBrillanceTransition');
            // After ellipse shrinks, reveal intro text
            this.revealIntroText();
          }
        });

        enterTimeline.to(this.transitionOverlay, {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut'
        });
      } else {
        // No transition, reveal intro text immediately
        this.revealIntroText();
      }
    }

    revealIntroText() {
      console.log('Revealing intro text (auto-play, not scrubbed)');

      // Get all intro masks
      const introMasks = this.intro ? this.intro.querySelectorAll('.process-hero__mask > span') : [];
      const scrollHintMask = this.scrollHint ? this.scrollHint.closest('.process-hero__mask') : null;

      // Create auto-play timeline for intro text reveal
      const introTimeline = gsap.timeline({
        delay: 0.5,
        onComplete: () => {
          console.log('Intro text reveal complete, setting up scroll animation');
          this.setupScrollAnimation();
        }
      });

      // Stagger reveal: small text → FROM SEED → TO SPARKLE
      if (introMasks.length > 0) {
        introTimeline.to(introMasks, {
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out'
        }, 0);
      }

      // Reveal (KEEP SCROLLING) text
      if (scrollHintMask) {
        introTimeline.to(scrollHintMask.querySelector('span'), {
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, 0.4); // Slight delay after other text
      }
    }

    setupScrollAnimation() {
      console.log('Setting up scroll animation');

      // Initialize managers
      this.phaseManager = new PhaseManager(this.intro, this.phases, this.scrollHint);
      this.progressManager = new ProgressLineManager(this.progressLine, this.dots);
      this.cardManager = new CardScrollManager(this.cardTracks);

      // Create master timeline
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: this.pinnedContainer,
          start: 'top top',
          end: () => `+=${this.spacer.offsetHeight}`,
          scrub: 1,
          pin: this.pinnedContainer,
          pinSpacing: false,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Frame playback per phase
            const progress = self.progress;
            let targetFrame = 0;

            if (progress >= PROGRESS.PHASE1_ACTIVE_START && progress < PROGRESS.PHASE1_ACTIVE_END) {
              // Phase 1: play 0-259
              const phaseProgress = (progress - PROGRESS.PHASE1_ACTIVE_START) / (PROGRESS.PHASE1_ACTIVE_END - PROGRESS.PHASE1_ACTIVE_START);
              targetFrame = Math.floor(phaseProgress * (this.totalFrames - 1));
            } else if (progress >= PROGRESS.PHASE2_ACTIVE_START && progress < PROGRESS.PHASE2_ACTIVE_END) {
              // Phase 2: replay 0-259
              const phaseProgress = (progress - PROGRESS.PHASE2_ACTIVE_START) / (PROGRESS.PHASE2_ACTIVE_END - PROGRESS.PHASE2_ACTIVE_START);
              targetFrame = Math.floor(phaseProgress * (this.totalFrames - 1));
            } else if (progress >= PROGRESS.PHASE3_ACTIVE_START && progress < PROGRESS.PHASE3_ACTIVE_END) {
              // Phase 3: replay 0-259
              const phaseProgress = (progress - PROGRESS.PHASE3_ACTIVE_START) / (PROGRESS.PHASE3_ACTIVE_END - PROGRESS.PHASE3_ACTIVE_START);
              targetFrame = Math.floor(phaseProgress * (this.totalFrames - 1));
            }

            this.frameEngine.drawFrame(targetFrame);
          }
        }
      });

      // Add all animations to master timeline
      this.phaseManager.addToTimeline(masterTimeline);
      this.progressManager.addToTimeline(masterTimeline);
      this.cardManager.addToTimeline(masterTimeline);

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
