(function() {
  'use strict';

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

  class FrameEngine {
    constructor(canvasBg, backgroundUrls) {
      this.canvasBg = canvasBg;
      this.ctxBg = canvasBg.getContext('2d');
      this.backgroundUrls = backgroundUrls;
      this.totalFrames = backgroundUrls.length;

      const vw = window.innerWidth;
      this.frameStep = vw < 768 ? 3 : vw < 1024 ? 2 : 1;

      this.backgroundImages = [];
      this.currentFrame = 0;
      this.desiredFrame = 0;
    }

    _snapFrame(frame) {
      return Math.round(frame / this.frameStep) * this.frameStep;
    }

    async loadBatch(from, count) {
      const end = Math.min(from + count, this.totalFrames);
      for (let i = from; i < end; i += this.frameStep) {
        if (!this.backgroundImages[i]) {
          await this.loadImage(i);
        }
      }
    }

    async loadBatchParallel(from, count) {
      const end = Math.min(from + count, this.totalFrames);
      const promises = [];
      for (let i = from; i < end; i += this.frameStep) {
        if (!this.backgroundImages[i]) {
          promises.push(this.loadImage(i));
        }
      }
      await Promise.all(promises);
    }

    async streamRemaining(from) {
      const BATCH = 30;
      const total = this.totalFrames;

      let forwardStart = Math.floor(
        Math.max(from, this._snapFrame(this.desiredFrame)) / BATCH
      ) * BATCH;

      let next = forwardStart;
      while (next < total) {
        const jumpTo = Math.floor(this._snapFrame(this.desiredFrame) / BATCH) * BATCH;
        if (jumpTo > next && !this.backgroundImages[this._snapFrame(this.desiredFrame)]) {
          next = jumpTo;
        }
        await this.loadBatch(next, BATCH);
        next += BATCH;
      }

      if (forwardStart > from) {
        next = from;
        while (next < forwardStart) {
          await this.loadBatch(next, BATCH);
          next += BATCH;
        }
      }
    }

    loadImage(index) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          this.backgroundImages[index] = img;
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
      this.desiredFrame = Math.floor(frameIndex);
      if (this.backgroundImages[frame]) {
        this._paint(frame);
      }
    }
  }

  class PhaseManager {
    constructor(intro, phases, scrollHint) {
      this.intro = intro;
      this.phases = phases;
      this.scrollHint = scrollHint;
    }

    addToTimeline(timeline, t) {
      if (this.intro) {
        const introMasks = Array.from(this.intro.querySelectorAll('.process-hero__mask > span')).filter(s => s.offsetParent !== null);
        timeline.to(introMasks, {
          y: '-100%',
          duration: t.introMaskOutEnd - t.introMaskOutStart,
          stagger: 0.005,
          ease: 'power2.in'
        }, t.introMaskOutStart);
      }

      this.addPhaseMasks(timeline, 0, t.p1MaskInStart, t.p1MaskInEnd, t.p1MaskOutStart, t.p1MaskOutEnd);

      this.addPhaseMasks(timeline, 1, t.p2MaskInStart, t.p2MaskInEnd, t.p2MaskOutStart, t.p2MaskOutEnd);

      this.addPhaseMasks(timeline, 2, t.p3MaskInStart, t.p3MaskInEnd, t.p3MaskOutStart, t.p3MaskOutEnd);

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

      timeline.set(phase, { opacity: 1, visibility: 'visible' }, maskInStart);

      timeline.to(masks, {
        y: 0,
        duration: maskInEnd - maskInStart,
        stagger: 0.01,
        ease: 'power2.out'
      }, maskInStart);

      timeline.to(masks, {
        y: '-100%',
        duration: maskOutEnd - maskOutStart,
        stagger: 0.005,
        ease: 'power2.in'
      }, maskOutStart);

      timeline.set(phase, { opacity: 0, visibility: 'hidden' }, maskOutEnd);
    }
  }

  class ProgressLineManager {
    constructor(progressLine, progressTrack, dots) {
      this.progressLine = progressLine;
      this.progressTrack = progressTrack;
      this.dots = dots;
    }

    addToTimeline(timeline, t) {
      timeline.to({ _: 0 }, { _: 1, duration: 1, ease: 'none' }, 0);

      if (this.dots[0]) {
        timeline.to(this.dots[0], { color: '#183754', duration: 0.02, ease: 'none' }, t.dot1At);
      }
      if (this.dots[1]) {
        timeline.to(this.dots[1], { color: '#183754', duration: 0.02, ease: 'none' }, t.dot2At);
      }
      if (this.dots[2]) {
        timeline.to(this.dots[2], { color: '#183754', duration: 0.02, ease: 'none' }, t.dot3At);
      }

      const fadeTargets = [this.progressTrack, this.progressLine, ...this.dots].filter(Boolean);
      timeline.to(fadeTargets, {
        opacity: 0,
        duration: t.p3MaskOutEnd - t.p3MaskOutStart,
        ease: 'power2.in'
      }, t.p3MaskOutStart);
    }
  }

  class CardScrollManager {
    constructor(tracks) {
      this.tracks = tracks;
    }

    addToTimeline(timeline, t) {
      this.addTrackScroll(timeline, 0, t.p1CardsStart, t.p1CardsEnd);
      this.addTrackScroll(timeline, 1, t.p2CardsStart, t.p2CardsEnd);
      this.addTrackScroll(timeline, 2, t.p3CardsStart, t.p3CardsEnd);
    }

    addTrackScroll(timeline, trackIndex, startProgress, endProgress) {
      const track = this.tracks[trackIndex];
      if (!track) return;

      const viewport = track.parentElement;
      const viewportWidth = viewport ? viewport.offsetWidth : window.innerWidth;

      const trackWidth = track.scrollWidth;
      const startX = viewportWidth;
      const endX = -trackWidth;

      timeline.set(track, { opacity: 1, visibility: 'visible' }, startProgress);

      timeline.fromTo(track,
        { x: startX },
        { x: endX, duration: endProgress - startProgress, ease: 'none' },
        startProgress
      );

      timeline.set(track, { opacity: 0, visibility: 'hidden' }, endProgress);
    }
  }

  class DefinitionPanelManager {
    constructor(panel) {
      this.panel = panel;
    }

    addToTimeline(timeline, t) {
      if (!this.panel) return;

      const allMasks = this.panel.querySelectorAll('.process-hero__mask > span');

      timeline.set(this.panel, { opacity: 1, visibility: 'visible' }, t.defMaskInStart);

      timeline.to(allMasks, {
        y: 0,
        duration: t.defMaskInEnd - t.defMaskInStart,
        stagger: 0.015,
        ease: 'power2.out'
      }, t.defMaskInStart);

      timeline.to(allMasks, {
        y: '-100%',
        duration: t.defMaskOutEnd - t.defMaskOutStart,
        ease: 'power2.in'
      }, t.defMaskOutStart);

      timeline.set(this.panel, { opacity: 0, visibility: 'hidden' }, t.defMaskOutEnd);
    }
  }

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
      const dur = t.twP;

      timeline.set(this.panel, { opacity: 1, visibility: 'visible' }, t.finalRevealStart);

      timeline.to(centerLeftMasks, {
        y: 0,
        duration: dur,
        stagger: 0.01,
        ease: 'power2.out'
      }, t.finalRevealStart);

      if (mobileMasks.length > 0) {
        timeline.to(mobileMasks, {
          y: 0,
          duration: dur,
          stagger: 0.01,
          ease: 'power2.out'
        }, t.finalRevealStart);
      }

      timeline.to(centerRightMasks, {
        y: 0,
        duration: dur,
        stagger: 0.01,
        ease: 'power2.out'
      }, t.finalRevealStart + dur * 0.5);

      timeline.to(bottomMasks, {
        y: 0,
        duration: dur,
        stagger: 0.01,
        ease: 'power2.out'
      }, t.finalRevealStart + dur * 1.0);
    }
  }

  class ProcessHeroController {
    constructor(section, data) {
      this.section = section;
      this.data = data;
      this.backgroundUrls = data.backgroundUrls;
      this.totalFrames = this.backgroundUrls.length;

      this.canvasBg = section.querySelector('[data-canvas-bg]');
      this.pinnedContainer = section.querySelector('[data-pinned-container]');
      this.spacer = section.querySelector('[data-spacer]');
      this.transitionOverlay = section.querySelector('[data-transition-overlay]');

      this.intro = section.querySelector('[data-intro]');
      this.scrollHint = section.querySelector('[data-scroll-hint]');
      this.phases = Array.from(section.querySelectorAll('[data-phase]'));
      this.progressLine = section.querySelector('.process-hero__progress-line');
      this.progressTrack = section.querySelector('.process-hero__progress-line-col');
      this.dots = Array.from(section.querySelectorAll('[data-dot]'));
      this.cardTracks = Array.from(section.querySelectorAll('[data-track]'));
      this.definitionPanel = section.querySelector('[data-definition-panel]');
      this.finalPanel = section.querySelector('[data-final-panel]');

      this.init();
    }

    async init() {
      this.frameEngine = new FrameEngine(
        this.canvasBg,
        this.backgroundUrls
      );

      try {
        await this.frameEngine.loadBatchParallel(0, 300);
        this.frameEngine.drawFrame(0);
      } catch (error) {
        console.error('Error loading initial frames:', error);
      }

      this.frameEngine.streamRemaining(300);

      this.playEnterAnimation();
    }

    playEnterAnimation() {
      const fromBrillance = sessionStorage.getItem('fromBrillanceTransition') === 'true';

      if (fromBrillance) {
        this.transitionOverlay.classList.add('active');

        const enterTimeline = gsap.timeline({
          delay: 0.3,
          onComplete: () => {
            this.transitionOverlay.classList.remove('active');
            sessionStorage.removeItem('fromBrillanceTransition');
            this.revealIntroText();
          }
        });

        enterTimeline.to(this.transitionOverlay, {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut'
        });
      } else {
        this.revealIntroText();
      }
    }

    revealIntroText() {
      const introMasks = this.intro ? Array.from(this.intro.querySelectorAll('.process-hero__mask > span')).filter(s => s.offsetParent !== null) : [];
      const scrollHintMask = this.scrollHint ? this.scrollHint.closest('.process-hero__mask') : null;

      const introTimeline = gsap.timeline({
        delay: 0.5,
        onComplete: () => {
          this.setupScrollAnimation();
        }
      });

      if (introMasks.length > 0) {
        introTimeline.to(introMasks, {
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out'
        }, 0);
      }

      if (scrollHintMask) {
        introTimeline.to(scrollHintMask.querySelector('span'), {
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, 0.4);
      }
    }

    setupScrollAnimation() {
      const d            = this.data;
      const totalVh      = d.introScrollVh + d.scrollDistanceVh;
      const introEndP    = d.introScrollVh / totalVh;
      const canvasRange  = 1 - introEndP;
      const total        = this.totalFrames - 1;
      const tw           = d.transitionFrames;
      const pt           = d.phaseTimings;

      const fp = frame => introEndP + (Math.min(frame, total) / total) * canvasRange;

      const t = {
        introMaskOutStart:  0,
        introMaskOutEnd:    introEndP * 0.5,
        p1MaskInStart:      introEndP * 0.5,
        p1MaskInEnd:        introEndP,

        p1MaskOutStart:     fp(pt[0].maskOutStart),
        p1MaskOutEnd:       fp(pt[0].maskOutStart + tw),

        p2MaskInStart:      fp(pt[1].maskInStart),
        p2MaskInEnd:        fp(pt[1].maskInStart + tw),
        p2MaskOutStart:     fp(pt[1].maskOutStart),
        p2MaskOutEnd:       fp(pt[1].maskOutStart + tw),

        p3MaskInStart:      fp(pt[2].maskInStart),
        p3MaskInEnd:        fp(pt[2].maskInStart + tw),
        p3MaskOutStart:     fp(pt[2].maskOutStart),
        p3MaskOutEnd:       fp(pt[2].maskOutStart + tw),

        p1CardsStart:       introEndP,
        p1CardsEnd:         fp(pt[0].maskOutStart),
        p2CardsStart:       fp(pt[1].maskInStart + tw),
        p2CardsEnd:         fp(pt[1].maskOutStart),
        p3CardsStart:       fp(pt[2].maskInStart + tw),
        p3CardsEnd:         fp(pt[2].maskOutStart),

        dot1At:             introEndP * 0.5,
        dot2At:             fp(pt[1].maskInStart),
        dot3At:             fp(pt[2].maskInStart),

        phasesEndP:         fp(d.phasesEndFrame),

        twP: (tw / total) * canvasRange,

        defMaskInStart:  d.definitionPanel ? fp(d.definitionPanel.maskInStart)        : 1,
        defMaskInEnd:    d.definitionPanel ? fp(d.definitionPanel.maskInStart + tw)    : 1,
        defMaskOutStart: d.definitionPanel ? fp(d.definitionPanel.maskOutStart)        : 1,
        defMaskOutEnd:   d.definitionPanel ? fp(d.definitionPanel.maskOutStart + tw)   : 1,

        finalRevealStart: d.finalPanel ? fp(d.finalPanel.revealFrame) : 1,

        introEndP, canvasRange, total, pt, tw
      };

      this._debugEl = document.createElement('div');
      this._debugEl.style.cssText = 'display:none;position:fixed;top:16px;right:16px;z-index:999999;background:rgba(0,0,0,0.72);color:#fff;font:bold 12px/1.7 monospace;padding:8px 14px;border-radius:6px;pointer-events:none;min-width:280px;';
      this._debugEl.innerHTML = 'Initializing...';
      document.body.appendChild(this._debugEl);

      this.phaseManager      = new PhaseManager(this.intro, this.phases, this.scrollHint);
      this.progressManager   = new ProgressLineManager(this.progressLine, this.progressTrack, this.dots);
      this.cardManager       = new CardScrollManager(this.cardTracks);
      this.definitionManager = new DefinitionPanelManager(this.definitionPanel);
      this.finalManager      = new FinalPanelManager(this.finalPanel);

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

            let targetFrame = 0;
            if (progress > t.introEndP) {
              const canvasProgress = (progress - t.introEndP) / t.canvasRange;
              targetFrame = Math.min(t.total, Math.floor(canvasProgress * t.total));
            }

            this.frameEngine.drawFrame(targetFrame);

            if (this.progressLine) {
              let lineWidth = 0;
              if (progress > t.introEndP) {
                lineWidth = Math.min(100, ((progress - t.introEndP) / (t.phasesEndP - t.introEndP)) * 100);
              }
              this.progressLine.style.width = lineWidth + '%';
            }

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhenReady);
  } else {
    initWhenReady();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });

})();
