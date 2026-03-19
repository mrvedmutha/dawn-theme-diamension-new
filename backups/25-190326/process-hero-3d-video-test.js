(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────────────
     Browser detection — drives seek strategy inside VideoEngine
     Safari: paused-video currentTime works natively, smooth out of the box
     Chrome/others: video must be playing to reliably accept currentTime writes
     ───────────────────────────────────────────────────────────────────────── */
  const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  /* ─────────────────────────────────────────────────────────────────────────
     GSAP readiness guard
     ───────────────────────────────────────────────────────────────────────── */
  function initWhenReady() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initWhenReady, 100);
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    initProcessHeroVideo();
  }

  function initProcessHeroVideo() {
    const sections = document.querySelectorAll('[data-process-hero-video-test]');
    sections.forEach((section) => {
      const sectionId = section.dataset.sectionId;
      const data = window.processHeroVideoData?.[sectionId];
      if (!data || !data.videoUrl) return;
      new ProcessHeroVideoController(section, data);
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     VideoEngine — scrubs video.currentTime based on scroll progress
     ───────────────────────────────────────────────────────────────────────── */
  class VideoEngine {
    constructor(videoEl) {
      this.video = videoEl;
      this.video.muted = true;
      this.video.playsInline = true;

      this.duration         = 0;
      this._ready           = false;
      this._unlocked        = false;
      this._lastAppliedTime = -1;
      this._targetTime      = 0;    /* latest desired position from scroll */
      this._seeking         = false; /* true while a seek is in flight */
      this._MIN_SEEK_DELTA  = 0.033; /* 1 frame @30fps — no point seeking sub-frame */
      this._seekCount       = 0;
      this._unlockError     = null;

      /* Track video load events for the debug overlay */
      this._videoState = {
        readyState:   videoEl.readyState,
        networkState: videoEl.networkState,
        src:          videoEl.currentSrc || videoEl.getAttribute('src') || '—',
        events:       []
      };

      const logEvent = (name) => {
        this._videoState.events.push(name);
        this._videoState.readyState   = videoEl.readyState;
        this._videoState.networkState = videoEl.networkState;
        if (this._debugUpdateFn) this._debugUpdateFn();
      };

      videoEl.addEventListener('loadstart',      () => logEvent('loadstart'));
      videoEl.addEventListener('loadedmetadata', () => logEvent('loadedmetadata'));
      videoEl.addEventListener('loadeddata',     () => logEvent('loadeddata'));
      videoEl.addEventListener('canplay',        () => logEvent('canplay'));
      videoEl.addEventListener('canplaythrough', () => logEvent('canplaythrough'));
      videoEl.addEventListener('stalled',        () => logEvent('⚠ stalled'));
      videoEl.addEventListener('waiting',        () => logEvent('⚠ waiting'));
      videoEl.addEventListener('error', () => {
        this._unlockError = videoEl.error ? `ERR ${videoEl.error.code}: ${videoEl.error.message}` : 'unknown error';
        logEvent('✖ error');
      });

      /* Chrome serialized seek — chain to latest _targetTime once decode finishes */
      if (!IS_SAFARI) {
        videoEl.addEventListener('seeked', () => {
          clearTimeout(this._seekWatchdog);
          this._seeking = false;
          /* If scroll moved while we were decoding, seek to the latest position */
          if (Math.abs(this._targetTime - this._lastAppliedTime) > this._MIN_SEEK_DELTA) {
            this._issueSeek(this._targetTime);
          }
        });
      }

      const onMetadata = () => {
        this.duration = this.video.duration;
        this._videoState.readyState = videoEl.readyState;
        if (this._debugUpdateFn) this._debugUpdateFn();
        this._unlockDecoder();
      };

      if (videoEl.readyState >= 1) {
        onMetadata();
      } else {
        videoEl.addEventListener('loadedmetadata', onMetadata, { once: true });
      }
    }

    /**
     * _unlockDecoder()
     * Safari : play → pause. Safari renders paused-video seeks natively.
     * Chrome : play → stay playing. Chrome only accepts currentTime writes
     *          reliably on a live (playing) video element.
     */
    _unlockDecoder() {
      this._enginePaused = false;

      this.video.play()
        .then(() => {
          if (IS_SAFARI) {
            /* Safari — pause immediately; seeks on paused video work perfectly */
            this.video.pause();
            this._enginePaused = true;
          }
          /* Chrome — stay playing; seekToProgress handles pause-on-idle */
          this._ready           = true;
          this._unlocked        = true;
          this._lastAppliedTime = 0;
          if (this._debugUpdateFn) this._debugUpdateFn();
          if (this._onReady) this._onReady();
        })
        .catch((err) => {
          this._unlockError = `${err.name}: ${err.message}`;
          this._ready           = true;
          this._lastAppliedTime = 0;
          if (this._debugUpdateFn) this._debugUpdateFn();
          if (this._onReady) this._onReady();
        });
    }

    /**
     * seekToProgress(progress 0-1)
     *
     * Safari  — direct currentTime on paused video. Safari's decode pipeline
     *           handles this natively with no shutter.
     *
     * Chrome  — serialized seeks. We always store the latest desired position
     *           in _targetTime but only issue ONE seek at a time. When the
     *           browser finishes decoding ('seeked' fires), we immediately
     *           chain to the latest _targetTime. This eliminates the shutter
     *           caused by stacking seeks faster than Chrome can decode frames.
     *           A 150ms idle timer pauses the video when scrolling stops.
     */
    seekToProgress(progress) {
      if (!this._ready) return;
      const targetTime = Math.max(0, Math.min(this.duration, progress * this.duration));
      this._targetTime = targetTime; /* always track latest desired position */

      if (IS_SAFARI) {
        if (Math.abs(targetTime - this._lastAppliedTime) < this._MIN_SEEK_DELTA) return;
        this._lastAppliedTime = targetTime;
        this._seekCount++;
        this.video.currentTime = targetTime;
      } else {
        /* Chrome: only issue a new seek if none is in flight */
        if (this._seeking) return;
        if (Math.abs(targetTime - this._lastAppliedTime) < this._MIN_SEEK_DELTA) return;
        this._issueSeek(targetTime);

        /* Keep video playing during scroll, pause 150ms after last seek */
        clearTimeout(this._pauseTimer);
        this._pauseTimer = setTimeout(() => {
          this._enginePaused = true;
          this.video.pause();
        }, 150);
      }
    }

    /* Issues a single seek — Chrome only */
    _issueSeek(targetTime) {
      this._lastAppliedTime = targetTime;
      this._seeking         = true;
      this._seekCount++;

      if (this._enginePaused) {
        this._enginePaused = false;
        this.video.play().catch(() => {});
      }

      this.video.currentTime = targetTime;

      /* Watchdog: if seeked never fires (stalled), unlock after 500ms */
      clearTimeout(this._seekWatchdog);
      this._seekWatchdog = setTimeout(() => {
        this._seeking = false;
      }, 500);
    }

    isReady() { return this._ready; }

    getBufferedPercent() {
      try {
        if (!this.video.buffered.length || !this.duration) return 0;
        return Math.round((this.video.buffered.end(0) / this.duration) * 100);
      } catch (e) { return 0; }
    }
  }

  /* ─────────────────────────────────────────────────────────────────────────
     PhaseManager
     ───────────────────────────────────────────────────────────────────────── */
  class PhaseManager {
    constructor(intro, phases, scrollHint) {
      this.intro = intro;
      this.phases = phases;
      this.scrollHint = scrollHint;
    }

    addToTimeline(timeline, t) {
      if (this.intro) {
        const introMasks = Array.from(
          this.intro.querySelectorAll('.process-hero__mask > span')
        ).filter((s) => s.offsetParent !== null);

        timeline.to(
          introMasks,
          { y: '-100%', duration: t.introMaskOutEnd - t.introMaskOutStart, stagger: 0.005, ease: 'power2.in' },
          t.introMaskOutStart
        );
      }

      this._addPhaseMasks(timeline, 0, t.p1MaskInStart, t.p1MaskInEnd, t.p1MaskOutStart, t.p1MaskOutEnd);
      this._addPhaseMasks(timeline, 1, t.p2MaskInStart, t.p2MaskInEnd, t.p2MaskOutStart, t.p2MaskOutEnd);
      this._addPhaseMasks(timeline, 2, t.p3MaskInStart, t.p3MaskInEnd, t.p3MaskOutStart, t.p3MaskOutEnd);

      if (this.scrollHint) {
        const span = this.scrollHint.closest('.process-hero__mask')?.querySelector('span');
        if (span) {
          timeline.to(
            span,
            { y: '-100%', duration: t.p3MaskOutEnd - t.p3MaskOutStart, ease: 'power2.in' },
            t.p3MaskOutStart
          );
        }
      }
    }

    _addPhaseMasks(timeline, phaseIndex, maskInStart, maskInEnd, maskOutStart, maskOutEnd) {
      const phase = this.phases[phaseIndex];
      if (!phase) return;
      const masks = phase.querySelectorAll('.process-hero__mask > span');
      timeline.set(phase, { opacity: 1, visibility: 'visible' }, maskInStart);
      timeline.to(masks, { y: 0, duration: maskInEnd - maskInStart, stagger: 0.01, ease: 'power2.out' }, maskInStart);
      timeline.to(masks, { y: '-100%', duration: maskOutEnd - maskOutStart, stagger: 0.005, ease: 'power2.in' }, maskOutStart);
      timeline.set(phase, { opacity: 0, visibility: 'hidden' }, maskOutEnd);
    }
  }

  /* ─────────────────────────────────────────────────────────────────────────
     ProgressLineManager
     ───────────────────────────────────────────────────────────────────────── */
  class ProgressLineManager {
    constructor(progressLine, progressTrack, dots) {
      this.progressLine = progressLine;
      this.progressTrack = progressTrack;
      this.dots = dots;
    }

    addToTimeline(timeline, t) {
      timeline.to({ _: 0 }, { _: 1, duration: 1, ease: 'none' }, 0);
      if (this.dots[0]) timeline.to(this.dots[0], { color: '#183754', duration: 0.02, ease: 'none' }, t.dot1At);
      if (this.dots[1]) timeline.to(this.dots[1], { color: '#183754', duration: 0.02, ease: 'none' }, t.dot2At);
      if (this.dots[2]) timeline.to(this.dots[2], { color: '#183754', duration: 0.02, ease: 'none' }, t.dot3At);
      const fadeTargets = [this.progressTrack, this.progressLine, ...this.dots].filter(Boolean);
      timeline.to(
        fadeTargets,
        { opacity: 0, duration: t.p3MaskOutEnd - t.p3MaskOutStart, ease: 'power2.in' },
        t.p3MaskOutStart
      );
    }
  }

  /* ─────────────────────────────────────────────────────────────────────────
     CardScrollManager
     ───────────────────────────────────────────────────────────────────────── */
  class CardScrollManager {
    constructor(tracks) { this.tracks = tracks; }

    addToTimeline(timeline, t) {
      this._addTrackScroll(timeline, 0, t.p1CardsStart, t.p1CardsEnd);
      this._addTrackScroll(timeline, 1, t.p2CardsStart, t.p2CardsEnd);
      this._addTrackScroll(timeline, 2, t.p3CardsStart, t.p3CardsEnd);
    }

    _addTrackScroll(timeline, trackIndex, startProgress, endProgress) {
      const track = this.tracks[trackIndex];
      if (!track) return;
      const viewport = track.parentElement;
      const viewportWidth = viewport ? viewport.offsetWidth : window.innerWidth;
      const trackWidth = track.scrollWidth;
      timeline.set(track, { opacity: 1, visibility: 'visible' }, startProgress);
      timeline.fromTo(
        track,
        { x: viewportWidth },
        { x: -trackWidth, duration: endProgress - startProgress, ease: 'none' },
        startProgress
      );
      timeline.set(track, { opacity: 0, visibility: 'hidden' }, endProgress);
    }
  }

  /* ─────────────────────────────────────────────────────────────────────────
     DefinitionPanelManager
     ───────────────────────────────────────────────────────────────────────── */
  class DefinitionPanelManager {
    constructor(panel) { this.panel = panel; }

    addToTimeline(timeline, t) {
      if (!this.panel) return;
      const allMasks = this.panel.querySelectorAll('.process-hero__mask > span');
      timeline.set(this.panel, { opacity: 1, visibility: 'visible' }, t.defMaskInStart);
      timeline.to(allMasks, { y: 0, duration: t.defMaskInEnd - t.defMaskInStart, stagger: 0.015, ease: 'power2.out' }, t.defMaskInStart);
      timeline.to(allMasks, { y: '-100%', duration: t.defMaskOutEnd - t.defMaskOutStart, ease: 'power2.in' }, t.defMaskOutStart);
      timeline.set(this.panel, { opacity: 0, visibility: 'hidden' }, t.defMaskOutEnd);
    }
  }

  /* ─────────────────────────────────────────────────────────────────────────
     FinalPanelManager
     ───────────────────────────────────────────────────────────────────────── */
  class FinalPanelManager {
    constructor(panel) { this.panel = panel; }

    addToTimeline(timeline, t) {
      if (!this.panel) return;
      const centerLeftMasks  = this.panel.querySelectorAll('.process-hero__final-center-left .process-hero__mask > span');
      const centerRightMasks = this.panel.querySelectorAll('.process-hero__final-center-right .process-hero__mask > span');
      const bottomMasks      = this.panel.querySelectorAll('.process-hero__final-bottom .process-hero__mask > span');
      const mobileMasks      = this.panel.querySelectorAll('.process-hero__final--mobile .process-hero__mask > span');
      const dur = t.twP;

      timeline.set(this.panel, { opacity: 1, visibility: 'visible' }, t.finalRevealStart);
      timeline.to(centerLeftMasks, { y: 0, duration: dur, stagger: 0.01, ease: 'power2.out' }, t.finalRevealStart);
      if (mobileMasks.length > 0) {
        timeline.to(mobileMasks, { y: 0, duration: dur, stagger: 0.01, ease: 'power2.out' }, t.finalRevealStart);
      }
      timeline.to(centerRightMasks, { y: 0, duration: dur, stagger: 0.01, ease: 'power2.out' }, t.finalRevealStart + dur * 0.5);
      timeline.to(bottomMasks,      { y: 0, duration: dur, stagger: 0.01, ease: 'power2.out' }, t.finalRevealStart + dur * 1.0);
    }
  }

  /* ─────────────────────────────────────────────────────────────────────────
     ProcessHeroVideoController
     ───────────────────────────────────────────────────────────────────────── */
  class ProcessHeroVideoController {
    constructor(section, data) {
      this.section = section;
      this.data = data;

      this.videoEl           = section.querySelector('[data-video-bg]');
      this.pinnedContainer   = section.querySelector('[data-pinned-container]');
      this.spacer            = section.querySelector('[data-spacer]');
      this.transitionOverlay = section.querySelector('[data-transition-overlay]');
      this.intro             = section.querySelector('[data-intro]');
      this.scrollHint        = section.querySelector('[data-scroll-hint]');
      this.phases            = Array.from(section.querySelectorAll('[data-phase]'));
      this.progressLine      = section.querySelector('.process-hero__progress-line');
      this.progressTrack     = section.querySelector('.process-hero__progress-line-col');
      this.dots              = Array.from(section.querySelectorAll('[data-dot]'));
      this.cardTracks        = Array.from(section.querySelectorAll('[data-track]'));
      this.definitionPanel   = section.querySelector('[data-definition-panel]');
      this.finalPanel        = section.querySelector('[data-final-panel]');

      this._debugEl = this._createDebugOverlay();

      this.init();
    }

    /* ── Debug overlay ────────────────────────────────────────────────────── */
    _createDebugOverlay() {
      const el = document.createElement('div');
      el.style.cssText = [
        'display:block',
        'position:fixed',
        'top:16px',
        'right:16px',
        'z-index:999999',
        'background:rgba(0,0,0,0.88)',
        'color:#fff',
        'font:bold 11px/1.9 monospace',
        'padding:12px 16px',
        'border-radius:6px',
        'pointer-events:none',
        'min-width:340px',
        'max-width:420px',
        'word-break:break-all'
      ].join(';');
      el.innerHTML = 'Initialising…';
      document.body.appendChild(el);
      return el;
    }

    _updateDebug(scrollProgress, canvasProgress) {
      if (!this._debugEl || !this.videoEngine) return;
      const ve  = this.videoEngine;
      const vid = this.videoEl;
      const vs  = ve._videoState;

      const readyLabels = ['HAVE_NOTHING','HAVE_METADATA','HAVE_CURRENT_DATA','HAVE_FUTURE_DATA','HAVE_ENOUGH_DATA'];
      const netLabels   = ['EMPTY','IDLE','LOADING','NO_SOURCE'];
      const fileName    = vs.src ? vs.src.split('/').pop().split('?')[0] : '—';

      const sent     = ve._lastAppliedTime >= 0 ? ve._lastAppliedTime.toFixed(3) + 's' : '—';
      const actual   = vid.currentTime.toFixed(3) + 's';
      const duration = ve.duration ? ve.duration.toFixed(2) + 's' : '—';
      const paused   = vid.paused;
      const dims     = (vid.videoWidth && vid.videoHeight) ? `${vid.videoWidth}×${vid.videoHeight}` : 'not decoded yet';
      const buffered = ve.getBufferedPercent() + '%';

      const statusColor = ve._ready
        ? (ve._unlocked ? '#4cff91' : '#ffcc00')
        : '#ff5555';
      const statusText  = ve._ready
        ? (ve._unlocked ? '✔ Ready + Unlocked' : '⚠ Ready (unlock failed)')
        : '✖ Not ready';

      let phase = 'pre-scroll';
      if (scrollProgress !== undefined) {
        const t = this._timings;
        if (!t) {
          phase = 'timings not built yet';
        } else if (scrollProgress >= t.finalRevealStart) phase = 'Phase 5 — Promise';
        else if (scrollProgress >= t.defMaskOutEnd)      phase = 'Silent (post-4Cs)';
        else if (scrollProgress >= t.defMaskOutStart)    phase = '4Cs exiting';
        else if (scrollProgress >= t.defMaskInEnd)       phase = '4Cs active';
        else if (scrollProgress >= t.defMaskInStart)     phase = '4Cs entering';
        else if (scrollProgress >= t.p3MaskOutEnd)       phase = 'Silent (post-phases)';
        else if (scrollProgress >= t.p3MaskOutStart)     phase = 'Phase 3 exiting';
        else if (scrollProgress >= t.p3MaskInEnd)        phase = 'Phase 3 active';
        else if (scrollProgress >= t.p3MaskInStart)      phase = 'Phase 3 entering';
        else if (scrollProgress >= t.p2MaskOutStart)     phase = 'Phase 2 exiting';
        else if (scrollProgress >= t.p2MaskInEnd)        phase = 'Phase 2 active';
        else if (scrollProgress >= t.p2MaskInStart)      phase = 'Phase 2 entering';
        else if (scrollProgress >= t.p1MaskOutStart)     phase = 'Phase 1 exiting';
        else if (scrollProgress >= t.p1MaskInEnd)        phase = 'Phase 1 active';
        else if (scrollProgress >= t.p1MaskInStart)      phase = 'Phase 1 entering';
        else                                              phase = 'Intro zone';
      }

      this._debugEl.innerHTML =
        `<span style="color:${statusColor}">${statusText}</span>${ve._unlockError ? ' — ' + ve._unlockError : ''}<br>` +
        `<b>File:</b> ${fileName}<br>` +
        `<b>readyState:</b> ${vs.readyState} (${readyLabels[vs.readyState] || '?'})<br>` +
        `<b>networkState:</b> ${vs.networkState} (${netLabels[vs.networkState] || '?'})<br>` +
        `<b>Dimensions:</b> ${dims}<br>` +
        `<b>Duration:</b> ${duration} | <b>Buffered:</b> ${buffered}<br>` +
        `<b>Events:</b> ${vs.events.slice(-6).join(' → ') || 'none yet'}<br>` +
        `─────────────────────────────<br>` +
        `<b>Browser:</b> ${IS_SAFARI ? 'Safari (pause+seek)' : 'Chrome (play+seek)'}<br>` +
        `<b>Sent:</b> ${sent} | <b>DOM:</b> ${actual} | <b>Paused:</b> ${paused}<br>` +
        `<b>Seeks:</b> ${ve._seekCount}<br>` +
        (scrollProgress !== undefined
          ? `<b>Scroll:</b> ${Math.round(scrollProgress * 100)}% | <b>Canvas:</b> ${(canvasProgress * 100).toFixed(1)}%<br>`
          : '') +
        `&#9654; ${phase}`;
    }

    init() {
      if (!this.videoEl) return;

      this.videoEngine = new VideoEngine(this.videoEl);
      this._setupDone  = false;

      /* Hook debug overlay into VideoEngine so it updates on video events */
      this.videoEngine._debugUpdateFn = () => this._updateDebug();
      this._updateDebug();

      const startController = () => {
        this._updateDebug();
        this.playEnterAnimation();
      };

      /* Called by VideoEngine once _ready is true (after play/pause unlock) */
      this.videoEngine._onReady = () => {
        if (!this._setupDone) startController();
      };
    }

    playEnterAnimation() {
      const fromBrillance = sessionStorage.getItem('fromBrillanceTransition') === 'true';
      if (fromBrillance) {
        this.transitionOverlay.classList.add('active');
        gsap.timeline({
          delay: 0.3,
          onComplete: () => {
            this.transitionOverlay.classList.remove('active');
            sessionStorage.removeItem('fromBrillanceTransition');
            this.revealIntroText();
          }
        }).to(this.transitionOverlay, { opacity: 0, duration: 1.2, ease: 'power2.inOut' });
      } else {
        this.revealIntroText();
      }
    }

    revealIntroText() {
      const introMasks = this.intro
        ? Array.from(this.intro.querySelectorAll('.process-hero__mask > span')).filter((s) => s.offsetParent !== null)
        : [];
      const scrollHintMask = this.scrollHint
        ? this.scrollHint.closest('.process-hero__mask')
        : null;

      const introTimeline = gsap.timeline({
        delay: 0.5,
        onComplete: () => this.setupScrollAnimation()
      });

      if (introMasks.length > 0) {
        introTimeline.to(introMasks, { y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' }, 0);
      }
      if (scrollHintMask) {
        introTimeline.to(scrollHintMask.querySelector('span'), { y: 0, duration: 0.8, ease: 'power2.out' }, 0.4);
      }
    }

    setupScrollAnimation() {
      if (this._setupDone) return;
      this._setupDone = true;

      const d = this.data;
      const totalVh     = d.introScrollVh + d.scrollDistanceVh;
      const introEndP   = d.introScrollVh / totalVh;
      const canvasRange = 1 - introEndP;
      const total       = d.virtualFrames - 1;
      const tw          = d.transitionFrames;
      const pt          = d.phaseTimings;
      const fp          = (frame) => introEndP + (Math.min(frame, total) / total) * canvasRange;

      const t = {
        introMaskOutStart: 0,
        introMaskOutEnd:   introEndP * 0.5,
        p1MaskInStart:     introEndP * 0.5,
        p1MaskInEnd:       introEndP,

        p1MaskOutStart:    fp(pt[0].maskOutStart),
        p1MaskOutEnd:      fp(pt[0].maskOutStart + tw),

        p2MaskInStart:     fp(pt[1].maskInStart),
        p2MaskInEnd:       fp(pt[1].maskInStart + tw),
        p2MaskOutStart:    fp(pt[1].maskOutStart),
        p2MaskOutEnd:      fp(pt[1].maskOutStart + tw),

        p3MaskInStart:     fp(pt[2].maskInStart),
        p3MaskInEnd:       fp(pt[2].maskInStart + tw),
        p3MaskOutStart:    fp(pt[2].maskOutStart),
        p3MaskOutEnd:      fp(pt[2].maskOutStart + tw),

        p1CardsStart:      introEndP,
        p1CardsEnd:        fp(pt[0].maskOutStart),
        p2CardsStart:      fp(pt[1].maskInStart + tw),
        p2CardsEnd:        fp(pt[1].maskOutStart),
        p3CardsStart:      fp(pt[2].maskInStart + tw),
        p3CardsEnd:        fp(pt[2].maskOutStart),

        dot1At:            introEndP * 0.5,
        dot2At:            fp(pt[1].maskInStart),
        dot3At:            fp(pt[2].maskInStart),

        phasesEndP:        fp(d.phasesEndFrame),
        twP:               (tw / total) * canvasRange,

        defMaskInStart:  d.definitionPanel ? fp(d.definitionPanel.maskInStart)      : 1,
        defMaskInEnd:    d.definitionPanel ? fp(d.definitionPanel.maskInStart + tw)  : 1,
        defMaskOutStart: d.definitionPanel ? fp(d.definitionPanel.maskOutStart)      : 1,
        defMaskOutEnd:   d.definitionPanel ? fp(d.definitionPanel.maskOutStart + tw) : 1,

        finalRevealStart: d.finalPanel ? fp(d.finalPanel.revealFrame) : 1,

        introEndP, canvasRange, total, pt, tw
      };

      /* Store for debug overlay */
      this._timings = t;

      this.phaseManager      = new PhaseManager(this.intro, this.phases, this.scrollHint);
      this.progressManager   = new ProgressLineManager(this.progressLine, this.progressTrack, this.dots);
      this.cardManager       = new CardScrollManager(this.cardTracks);
      this.definitionManager = new DefinitionPanelManager(this.definitionPanel);
      this.finalManager      = new FinalPanelManager(this.finalPanel);

      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger:       this.pinnedContainer,
          start:         'top top',
          end:           () => `+=${this.spacer.offsetHeight}`,
          scrub:         1,
          pin:           this.pinnedContainer,
          pinSpacing:    false,
          anticipatePin: 1,

          onUpdate: (self) => {
            const progress = self.progress;

            let canvasProgress = 0;
            if (progress > t.introEndP) {
              canvasProgress = (progress - t.introEndP) / t.canvasRange;
            }
            this.videoEngine.seekToProgress(canvasProgress);

            if (this.progressLine) {
              let lineWidth = 0;
              if (progress > t.introEndP) {
                lineWidth = Math.min(100, ((progress - t.introEndP) / (t.phasesEndP - t.introEndP)) * 100);
              }
              this.progressLine.style.width = lineWidth + '%';
            }

            this._updateDebug(progress, canvasProgress);
          }
        }
      });

      this.phaseManager.addToTimeline(masterTimeline, t);
      this.progressManager.addToTimeline(masterTimeline, t);
      this.cardManager.addToTimeline(masterTimeline, t);
      if (d.definitionPanel) this.definitionManager.addToTimeline(masterTimeline, t);
      if (d.finalPanel)      this.finalManager.addToTimeline(masterTimeline, t);

      ScrollTrigger.refresh();
      this._updateDebug(0, 0);
    }
  }

  /* ── Boot ──────────────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhenReady);
  } else {
    initWhenReady();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
  });

})();
