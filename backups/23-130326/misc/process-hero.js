/**
 * Process Hero Section
 * Scroll-driven storytelling with canvas-based 3D animation
 * Architecture: FrameEngine → EnterAnimation → Master Timeline (ScrollTrigger)
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
    initProcessHero();
  }

  function initProcessHero() {
    const sections = document.querySelectorAll('[data-process-hero]');

    sections.forEach((section) => {
      const sectionId = section.dataset.sectionId;
      const data = window.processHeroData?.[sectionId];

      if (!data || !data.backgroundUrls) {
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
    constructor(canvasBg, backgroundUrls) {
      this.canvasBg = canvasBg;
      this.ctxBg = canvasBg.getContext('2d');
      this.backgroundUrls = backgroundUrls;
      this.totalFrames = backgroundUrls.length;

      // Reduce frames loaded on smaller screens to save bandwidth
      const vw = window.innerWidth;
      this.frameStep = vw < 768 ? 3 : vw < 1024 ? 2 : 1;

      this.backgroundImages = [];
      this.currentFrame = 0;
      this.desiredFrame = 0;
    }

    // Snap a frame index to the nearest loaded step
    _snapFrame(frame) {
      return Math.round(frame / this.frameStep) * this.frameStep;
    }

    // Load a contiguous batch of frames (skips already-loaded ones, respects frameStep)
    async loadBatch(from, count) {
      const end = Math.min(from + count, this.totalFrames);
      const t0 = performance.now();
      for (let i = from; i < end; i += this.frameStep) {
        if (!this.backgroundImages[i]) {
          await this.loadImage(i);
        }
      }
      console.log(`Batch ${from}–${end - 1} loaded in ${(performance.now() - t0).toFixed(0)}ms (step=${this.frameStep})`);
    }

    // Stream remaining frames — forward-first, then backfill
    async streamRemaining(from) {
      const BATCH = 30;
      const total = this.totalFrames;

      // Phase 1: start from current scroll position and load forward
      // so frames the user is about to see are prioritised over already-passed frames
      let forwardStart = Math.floor(
        Math.max(from, this._snapFrame(this.desiredFrame)) / BATCH
      ) * BATCH;

      let next = forwardStart;
      while (next < total) {
        // If user scrolled even further ahead while we were loading, jump to keep up
        const jumpTo = Math.floor(this._snapFrame(this.desiredFrame) / BATCH) * BATCH;
        if (jumpTo > next && !this.backgroundImages[this._snapFrame(this.desiredFrame)]) {
          console.log(`Scroll jumped to frame ${this.desiredFrame} — jumping forward to batch ${jumpTo}`);
          next = jumpTo;
        }
        await this.loadBatch(next, BATCH);
        next += BATCH;
      }

      // Phase 2: backfill any frames that were behind the starting scroll position
      if (forwardStart > from) {
        console.log(`Backfilling frames ${from}–${forwardStart - 1}`);
        next = from;
        while (next < forwardStart) {
          await this.loadBatch(next, BATCH);
          next += BATCH;
        }
      }

      console.log(`All frames loaded (step=${this.frameStep})`);
    }

    loadImage(index) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          this.backgroundImages[index] = img;
          // If scroll is waiting on this exact frame, draw it now
          if (this._snapFrame(this.desiredFrame) === index) {
            this._paint(index);
          }
          resolve();
        };
        img.onerror = () => {
          console.error('Failed to load frame:', index);
          resolve();
        };
        img.src = this.backgroundUrls[index];
      });
    }

    _paint(frame) {
      this.ctxBg.clearRect(0, 0, this.canvasBg.width, this.canvasBg.height);
      this.ctxBg.drawImage(
        this.backgroundImages[frame],
        0, 0,
        this.canvasBg.width,
        this.canvasBg.height
      );
      this.currentFrame = frame;
    }

    drawFrame(frameIndex) {
      const frame = this._snapFrame(Math.floor(frameIndex));
      this.desiredFrame = Math.floor(frameIndex); // always track what scroll wants
      if (this.backgroundImages[frame]) {
        this._paint(frame);
      }
      // If not loaded yet, loadImage will paint it the moment it arrives
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

    addToTimeline(timeline, t) {
      // Intro text masks out (scroll-driven, first half of intro zone)
      if (this.intro) {
        const introMasks = Array.from(this.intro.querySelectorAll('.process-hero__mask > span')).filter(s => s.offsetParent !== null);
        timeline.to(introMasks, {
          y: '-100%',
          duration: t.introMaskOutEnd - t.introMaskOutStart,
          stagger: 0.005,
          ease: 'power2.in'
        }, t.introMaskOutStart);
      }

      // Phase 1 (mask-in during intro zone, mask-out from block settings)
      this.addPhaseMasks(timeline, 0, t.p1MaskInStart, t.p1MaskInEnd, t.p1MaskOutStart, t.p1MaskOutEnd);

      // Phase 2
      this.addPhaseMasks(timeline, 1, t.p2MaskInStart, t.p2MaskInEnd, t.p2MaskOutStart, t.p2MaskOutEnd);

      // Phase 3
      this.addPhaseMasks(timeline, 2, t.p3MaskInStart, t.p3MaskInEnd, t.p3MaskOutStart, t.p3MaskOutEnd);

      // Scroll hint masks out with Phase 3
      if (this.scrollHint) {
        const span = this.scrollHint.closest('.process-hero__mask')?.querySelector('span');
        if (span) {
          timeline.to(span, {
            y: '-100%',
            duration: t.p3MaskOutEnd - t.p3MaskOutStart,
            ease: 'power2.in'
          }, t.p3MaskOutStart);
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
    constructor(progressLine, progressTrack, dots) {
      this.progressLine = progressLine;
      this.progressTrack = progressTrack;
      this.dots = dots; // Array of 3 dot elements
    }

    addToTimeline(timeline, t) {
      // Anchor timeline at exactly 1.0 duration using a plain object (no DOM side effects)
      // Width is driven by onUpdate instead, aligned to phasesEndFrame
      timeline.to({ _: 0 }, { _: 1, duration: 1, ease: 'none' }, 0);

      // Dots fill at each phase's mask-in start frame
      if (this.dots[0]) {
        timeline.to(this.dots[0], { color: '#183754', duration: 0.02, ease: 'none' }, t.dot1At);
      }
      if (this.dots[1]) {
        timeline.to(this.dots[1], { color: '#183754', duration: 0.02, ease: 'none' }, t.dot2At);
      }
      if (this.dots[2]) {
        timeline.to(this.dots[2], { color: '#183754', duration: 0.02, ease: 'none' }, t.dot3At);
      }

      // Fade out track, line + all dots at Phase 3 mask-out start
      const fadeTargets = [this.progressTrack, this.progressLine, ...this.dots].filter(Boolean);
      timeline.to(fadeTargets, {
        opacity: 0,
        duration: t.p3MaskOutEnd - t.p3MaskOutStart,
        ease: 'power2.in'
      }, t.p3MaskOutStart);
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

    addToTimeline(timeline, t) {
      this.addTrackScroll(timeline, 0, t.p1CardsStart, t.p1CardsEnd);
      this.addTrackScroll(timeline, 1, t.p2CardsStart, t.p2CardsEnd);
      this.addTrackScroll(timeline, 2, t.p3CardsStart, t.p3CardsEnd);
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
   * DEFINITION PANEL MANAGER
   * Mask-in / mask-out for 4C's panel (post phases)
   * ========================================
   */
  class DefinitionPanelManager {
    constructor(panel) {
      this.panel = panel;
    }

    addToTimeline(timeline, t) {
      if (!this.panel) return;

      const allMasks = this.panel.querySelectorAll('.process-hero__mask > span');

      // Show panel
      timeline.set(this.panel, { opacity: 1, visibility: 'visible' }, t.defMaskInStart);

      // Mask-in: staggered slide up across the full window
      timeline.to(allMasks, {
        y: 0,
        duration: t.defMaskInEnd - t.defMaskInStart,
        stagger: 0.015,
        ease: 'power2.out'
      }, t.defMaskInStart);

      // Mask-out ALL: slide up all at once (no stagger)
      timeline.to(allMasks, {
        y: '-100%',
        duration: t.defMaskOutEnd - t.defMaskOutStart,
        ease: 'power2.in'
      }, t.defMaskOutStart);

      // Hide panel
      timeline.set(this.panel, { opacity: 0, visibility: 'hidden' }, t.defMaskOutEnd);
    }
  }

  /**
   * ========================================
   * FINAL PANEL MANAGER
   * Phase 5 — three group stagger, no mask-out
   * Groups: center-left → center-right → bottom-left
   * ========================================
   */
  class FinalPanelManager {
    constructor(panel) {
      this.panel = panel;
    }

    addToTimeline(timeline, t) {
      if (!this.panel) return;

      const centerLeftMasks = this.panel.querySelectorAll('.process-hero__final-center-left .process-hero__mask > span');
      const centerRightMasks = this.panel.querySelectorAll('.process-hero__final-center-right .process-hero__mask > span');
      const bottomMasks = this.panel.querySelectorAll('.process-hero__final-bottom .process-hero__mask > span');
      const mobileMasks = this.panel.querySelectorAll('.process-hero__final--mobile .process-hero__mask > span');
      const dur = t.twP; // one group reveal = tw frames in progress units

      // Show panel
      timeline.set(this.panel, { opacity: 1, visibility: 'visible' }, t.finalRevealStart);

      // Group 1: center-left (desktop) — mobile div also starts here
      timeline.to(centerLeftMasks, {
        y: 0,
        duration: dur,
        stagger: 0.01,
        ease: 'power2.out'
      }, t.finalRevealStart);

      // Mobile group — same start time as Group 1 (hidden on desktop, visible on mobile)
      if (mobileMasks.length > 0) {
        timeline.to(mobileMasks, {
          y: 0,
          duration: dur,
          stagger: 0.01,
          ease: 'power2.out'
        }, t.finalRevealStart);
      }

      // Group 2: center-right (offset by half a group)
      timeline.to(centerRightMasks, {
        y: 0,
        duration: dur,
        stagger: 0.01,
        ease: 'power2.out'
      }, t.finalRevealStart + dur * 0.5);

      // Group 3: bottom-left (offset by a full group)
      timeline.to(bottomMasks, {
        y: 0,
        duration: dur,
        stagger: 0.01,
        ease: 'power2.out'
      }, t.finalRevealStart + dur * 1.0);

      // No mask-out — panel stays visible until scroll ends
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
      this.data = data;
      this.backgroundUrls = data.backgroundUrls;
      this.totalFrames = this.backgroundUrls.length;

      // DOM elements
      this.canvasBg = section.querySelector('[data-canvas-bg]');
      this.pinnedContainer = section.querySelector('[data-pinned-container]');
      this.spacer = section.querySelector('[data-spacer]');
      this.transitionOverlay = section.querySelector('[data-transition-overlay]');

      // Content elements
      this.intro = section.querySelector('[data-intro]');
      this.scrollHint = section.querySelector('[data-scroll-hint]');
      this.phases = Array.from(section.querySelectorAll('[data-phase]'));
      this.progressLine = section.querySelector('.process-hero__progress-line');
      this.progressTrack = section.querySelector('.process-hero__progress-line-col');
      this.dots = Array.from(section.querySelectorAll('[data-dot]'));
      this.cardTracks = Array.from(section.querySelectorAll('[data-track]'));
      this.definitionPanel = section.querySelector('[data-definition-panel]');
      this.finalPanel = section.querySelector('[data-final-panel]');

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
        this.backgroundUrls
      );

      // 2. Load first 30 frames then start immediately
      try {
        await this.frameEngine.loadBatch(0, 30);
        this.frameEngine.drawFrame(0);
      } catch (error) {
        console.error('Error loading initial frames:', error);
      }

      // 3. Stream remaining frames in background (scroll-aware batches of 30)
      this.frameEngine.streamRemaining(30);

      // 4. Play enter animation
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

      // Get all visible intro masks (filter hidden desktop/mobile variants)
      const introMasks = this.intro ? Array.from(this.intro.querySelectorAll('.process-hero__mask > span')).filter(s => s.offsetParent !== null) : [];
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

      // ── Timing config ────────────────────────────────────────────────
      const d            = this.data;
      const totalVh      = d.introScrollVh + d.scrollDistanceVh;
      const introEndP    = d.introScrollVh / totalVh;   // progress where intro zone ends
      const canvasRange  = 1 - introEndP;               // progress span of canvas zone
      const total        = this.totalFrames - 1;         // max frame index
      const tw           = d.transitionFrames;
      const pt           = d.phaseTimings;               // [{maskInStart, maskOutStart}, ...]

      // Convert canvas frame number → full scroll progress (0.0–1.0)
      const fp = frame => introEndP + (Math.min(frame, total) / total) * canvasRange;

      const t = {
        // Intro zone: first half exits intro text, second half enters Phase 1
        introMaskOutStart:  0,
        introMaskOutEnd:    introEndP * 0.5,
        p1MaskInStart:      introEndP * 0.5,
        p1MaskInEnd:        introEndP,

        // Phase 1 mask-out (canvas zone)
        p1MaskOutStart:     fp(pt[0].maskOutStart),
        p1MaskOutEnd:       fp(pt[0].maskOutStart + tw),

        // Phase 2
        p2MaskInStart:      fp(pt[1].maskInStart),
        p2MaskInEnd:        fp(pt[1].maskInStart + tw),
        p2MaskOutStart:     fp(pt[1].maskOutStart),
        p2MaskOutEnd:       fp(pt[1].maskOutStart + tw),

        // Phase 3
        p3MaskInStart:      fp(pt[2].maskInStart),
        p3MaskInEnd:        fp(pt[2].maskInStart + tw),
        p3MaskOutStart:     fp(pt[2].maskOutStart),
        p3MaskOutEnd:       fp(pt[2].maskOutStart + tw),

        // Card scroll windows (mask-in-end → mask-out-start per phase)
        p1CardsStart:       introEndP,
        p1CardsEnd:         fp(pt[0].maskOutStart),
        p2CardsStart:       fp(pt[1].maskInStart + tw),
        p2CardsEnd:         fp(pt[1].maskOutStart),
        p3CardsStart:       fp(pt[2].maskInStart + tw),
        p3CardsEnd:         fp(pt[2].maskOutStart),

        // Progress dot triggers (at each phase's mask-in start)
        dot1At:             introEndP * 0.5,
        dot2At:             fp(pt[1].maskInStart),
        dot3At:             fp(pt[2].maskInStart),

        // Progress line end point
        phasesEndP:         fp(d.phasesEndFrame),

        // tw expressed as scroll progress units (group stagger offset for FinalPanelManager)
        twP: (tw / total) * canvasRange,

        // Definition panel timing
        defMaskInStart:  d.definitionPanel ? fp(d.definitionPanel.maskInStart)        : 1,
        defMaskInEnd:    d.definitionPanel ? fp(d.definitionPanel.maskInStart + tw)    : 1,
        defMaskOutStart: d.definitionPanel ? fp(d.definitionPanel.maskOutStart)        : 1,
        defMaskOutEnd:   d.definitionPanel ? fp(d.definitionPanel.maskOutStart + tw)   : 1,

        // Final panel timing
        finalRevealStart: d.finalPanel ? fp(d.finalPanel.revealFrame) : 1,

        // Raw values used in onUpdate / debug
        introEndP, canvasRange, total, pt, tw
      };

      // ── Debug overlay (hidden) ───────────────────────────────────────
      this._debugEl = document.createElement('div');
      this._debugEl.style.cssText = 'display:none;position:fixed;top:16px;right:16px;z-index:999999;background:rgba(0,0,0,0.72);color:#fff;font:bold 12px/1.7 monospace;padding:8px 14px;border-radius:6px;pointer-events:none;min-width:280px;';
      this._debugEl.innerHTML = 'Initializing...';
      document.body.appendChild(this._debugEl);

      // ── Managers ─────────────────────────────────────────────────────
      this.phaseManager      = new PhaseManager(this.intro, this.phases, this.scrollHint);
      this.progressManager   = new ProgressLineManager(this.progressLine, this.progressTrack, this.dots);
      this.cardManager       = new CardScrollManager(this.cardTracks);
      this.definitionManager = new DefinitionPanelManager(this.definitionPanel);
      this.finalManager      = new FinalPanelManager(this.finalPanel);

      // ── Master timeline ───────────────────────────────────────────────
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
            const progress = self.progress;

            // Canvas frozen at frame 0 during intro zone; plays linearly after
            let targetFrame = 0;
            if (progress > t.introEndP) {
              const canvasProgress = (progress - t.introEndP) / t.canvasRange;
              targetFrame = Math.min(t.total, Math.floor(canvasProgress * t.total));
            }

            this.frameEngine.drawFrame(targetFrame);

            // Progress line: 0% at canvas frame 0 → 100% at phasesEndFrame
            if (this.progressLine) {
              let lineWidth = 0;
              if (progress > t.introEndP) {
                lineWidth = Math.min(100, ((progress - t.introEndP) / (t.phasesEndP - t.introEndP)) * 100);
              }
              this.progressLine.style.width = lineWidth + '%';
            }

            // Update debug overlay
            if (this._debugEl) {
              let phase = 'Intro exiting';
              if      (progress >= t.finalRevealStart)   phase = 'Phase 5 — Promise';
              else if (progress >= t.defMaskOutEnd)      phase = 'Silent (post-4Cs)';
              else if (progress >= t.defMaskOutStart)    phase = '4Cs exiting';
              else if (progress >= t.defMaskInEnd)       phase = '4Cs active';
              else if (progress >= t.defMaskInStart)     phase = '4Cs entering';
              else if (progress >= t.p3MaskOutEnd)       phase = 'Silent (post-phases)';
              else if (progress >= t.p3MaskOutStart)     phase = 'Phase 3 exiting';
              else if (progress >= t.p3MaskInEnd)        phase = 'Phase 3 active';
              else if (progress >= t.p3MaskInStart)      phase = 'Phase 3 entering';
              else if (progress >= t.p2MaskOutStart)     phase = 'Phase 2 exiting';
              else if (progress >= t.p2MaskInEnd)        phase = 'Phase 2 active';
              else if (progress >= t.p2MaskInStart)      phase = 'Phase 2 entering';
              else if (progress >= t.p1MaskOutStart)     phase = 'Phase 1 exiting';
              else if (progress >= t.p1MaskInEnd)        phase = 'Phase 1 active';
              else if (progress >= t.p1MaskInStart)      phase = 'Phase 1 entering';

              const defIn    = d.definitionPanel ? d.definitionPanel.maskInStart  : '—';
              const defOut   = d.definitionPanel ? d.definitionPanel.maskOutStart : '—';
              const finalRev = d.finalPanel      ? d.finalPanel.revealFrame       : '—';
              this._debugEl.innerHTML =
                `<b>Frame: ${targetFrame} / ${t.total}&nbsp;&nbsp;(${Math.round(progress * 100)}%)</b><br>` +
                `P1 mask-out  @ frame <b>${t.pt[0].maskOutStart}</b><br>` +
                `P2 mask-in @ <b>${t.pt[1].maskInStart}</b> | mask-out @ <b>${t.pt[1].maskOutStart}</b><br>` +
                `P3 mask-in @ <b>${t.pt[2].maskInStart}</b> | mask-out @ <b>${t.pt[2].maskOutStart}</b><br>` +
                `4Cs mask-in @ <b>${defIn}</b> | mask-out @ <b>${defOut}</b><br>` +
                `P5 reveal @ <b>${finalRev}</b><br>` +
                `&#9654;&nbsp;${phase}`;
            }
          }
        }
      });

      // Add all animations to master timeline
      this.phaseManager.addToTimeline(masterTimeline, t);
      this.progressManager.addToTimeline(masterTimeline, t);
      this.cardManager.addToTimeline(masterTimeline, t);
      if (d.definitionPanel) {
        this.definitionManager.addToTimeline(masterTimeline, t);
      }
      if (d.finalPanel) {
        this.finalManager.addToTimeline(masterTimeline, t);
      }

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
