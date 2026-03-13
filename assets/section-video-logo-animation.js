(function () {
  function init() {
    const isHomepage = window.location.pathname === '/' || window.location.pathname === '/index';

    if (!isHomepage) {
      return;
    }

    if (typeof gsap === 'undefined') {
      return;
    }

    if (typeof ScrollTrigger === 'undefined') {
      return;
    }

    const logoWrapper = document.querySelector('[data-video-logo-animation] .video-logo-hero__logo-wrapper');
    const section = document.querySelector('[data-video-logo-animation]');

    if (!logoWrapper || !section) {
      return;
    }

    const headerLogoImg = document.querySelector('.diamension-header__logo-img');
    const headerLogo = document.querySelector('.diamension-header__logo');
    let targetWidth = '190px';
    let targetY = 0;

    if (headerLogoImg) {
      targetWidth = headerLogoImg.width + 'px';
    }

    if (headerLogo) {
      const headerRect = headerLogo.getBoundingClientRect();
      const logoRect = logoWrapper.getBoundingClientRect();
      targetY = headerRect.top - logoRect.top;
    }

    gsap.to(logoWrapper, {
      width: targetWidth,
      y: targetY,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '50vh top',
        scrub: 1,
        pin: false,
      },
    });

    gsap.to(logoWrapper, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: '50vh top',
        end: '51vh top',
        scrub: 1,
        pin: false,
      },
    });

    const stickyHeaderLogoWrapper = document.querySelector('[data-transparent-sticky] .diamension-header__logo');
    if (stickyHeaderLogoWrapper) {
      gsap.set(stickyHeaderLogoWrapper, {
        opacity: 0,
      });

      gsap.to(stickyHeaderLogoWrapper, {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '50vh top',
          end: '51vh top',
          scrub: 1,
          pin: false,
          onUpdate: (self) => {
            const currentOpacity = self.progress;
            stickyHeaderLogoWrapper.style.setProperty('opacity', currentOpacity.toString(), 'important');

            if (currentOpacity > 0.5) {
              stickyHeaderLogoWrapper.style.setProperty('pointer-events', 'auto', 'important');
            }
          },
        },
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
