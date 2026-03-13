(function() {
  'use strict';

  function initWhenReady() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initWhenReady, 100);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (typeof ScrollToPlugin !== 'undefined') {
      gsap.registerPlugin(ScrollToPlugin);
    }

    initBrillance3D();
  }

  function initBrillance3D() {
    const sections = document.querySelectorAll('.brillance-3d');

    sections.forEach((section) => {
      const sectionId = section.dataset.sectionId;
      const data = window.brillance3dData?.[sectionId];

      if (!data || !data.backgroundUrls) {
        return;
      }

      new Brillance3DController(section, data);
    });
  }

  class Brillance3DController {
    constructor(section, data) {
      this.section = section;
      this.backgroundUrls = data.backgroundUrls;
      this.totalFrames = this.backgroundUrls.length;

      this.canvasBg = section.querySelector('[data-canvas-bg]');
      this.ctxBg = this.canvasBg.getContext('2d');
      this.pinnedContainer = section.querySelector('[data-pinned-container]');
      this.paragraph = section.querySelector('[data-paragraph]');
      this.cta = section.querySelector('[data-cta]');
      this.spacer = section.querySelector('[data-spacer]');
      this.heading = section.querySelector('.brillance-3d__heading');

      this.backgroundImages = [];
      this.currentFrame = 0;

      this.init();
    }

    async init() {
      try {
        await this.preloadAllFrames();
      } catch (error) {
        // silent
      }

      this.setupScrollTrigger();

      this.setupCTAHandler();
    }

    async preloadAllFrames() {
      for (let i = 0; i < this.totalFrames; i++) {
        await this.loadBothFrames(i);

        if (i % 5 === 0) {
          await new Promise(resolve => setTimeout(resolve, 0));
        }
      }

      this.drawFrame(0);
    }

    loadBothFrames(index) {
      return this.loadImage(this.backgroundUrls[index], this.backgroundImages, index);
    }

    loadImage(url, imageArray, index) {
      return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
          imageArray[index] = img;
          resolve();
        };

        img.onerror = () => {
          resolve();
        };

        img.src = url;
      });
    }

    drawFrame(frameIndex) {
      const frame = Math.floor(frameIndex);

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

      this.currentFrame = frame;
    }

    setupScrollTrigger() {
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
            this.drawFrame(targetFrame);
          }
        }
      });

      if (this.paragraph) {
        mainTimeline.fromTo(this.paragraph,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' },
          0
        );

        mainTimeline.to(this.paragraph,
          { opacity: 0, duration: 0.05, ease: 'power2.in' },
          0.2
        );
      }

      if (this.cta) {
        mainTimeline.fromTo(this.cta,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' },
          0.55
        );
      }

      ScrollTrigger.refresh();

      this.scrollTriggerInstance = ScrollTrigger.getById(mainTimeline.scrollTrigger.vars.id);
    }

    setupCTAHandler() {
      if (!this.cta) return;

      this.cta.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUrl = this.cta.href;

        const allTriggers = ScrollTrigger.getAll();

        const st = allTriggers.find(trigger => trigger.trigger === this.pinnedContainer);

        if (!st) {
          return;
        }

        const currentProgress = st.progress;
        const currentScrollY = window.scrollY;

        const scrollDistance = st.end - st.start;
        const targetScrollPosition = st.start + scrollDistance;

        const isAtCorrectPosition = Math.abs(currentScrollY - targetScrollPosition) < 10;

        const needsScroll = currentProgress < 0.99 || !isAtCorrectPosition;

        if (needsScroll) {
          if (typeof ScrollToPlugin === 'undefined') {
            window.scrollTo({
              top: targetScrollPosition,
              behavior: 'smooth'
            });

            setTimeout(() => {
              this.startPageTransition(targetUrl);
            }, 1500);
            return;
          }

          gsap.to(window, {
            scrollTo: { y: targetScrollPosition, autoKill: false },
            duration: 1.5,
            ease: 'power2.inOut',
            onComplete: () => {
              this.startPageTransition(targetUrl);
            }
          });
        } else {
          this.startPageTransition(targetUrl);
        }
      });
    }

    startPageTransition(targetUrl) {
      this.pinnedContainer.style.setProperty('--ellipse-scale', '1');

      const exitTimeline = gsap.timeline({
        onComplete: () => {
          try {
            if (window.innerWidth <= 425) {
              const frame = this.currentFrame;
              this.canvasBg.width  = window.innerWidth;
              this.canvasBg.height = window.innerHeight;
              if (this.backgroundImages[frame]) {
                this.ctxBg.drawImage(this.backgroundImages[frame], 0, 0, this.canvasBg.width, this.canvasBg.height);
              }
            }

            const bgSnapshot = this.canvasBg.toDataURL('image/webp', 0.8);

            sessionStorage.setItem('fromBrillanceTransition', 'true');
            sessionStorage.setItem('transitionBgSnapshot', bgSnapshot);
            sessionStorage.setItem('transitionEllipseScale', '5');

            const computedStyle = window.getComputedStyle(this.pinnedContainer);
            const ellipseColor = computedStyle.getPropertyValue('--ellipse-color').trim() || '#fffcf9';
            sessionStorage.setItem('transitionEllipseColor', ellipseColor);
          } catch (error) {
            // silent
          }

          window.location.href = targetUrl;
        }
      });

      exitTimeline.to([this.heading, this.cta], {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0);

      exitTimeline.to(this.pinnedContainer, {
        '--ellipse-scale': 5,
        duration: 1.2,
        ease: 'power2.inOut',
      }, 0.3);

      exitTimeline.to({}, { duration: 0.2 });
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
