(function () {
  function init() {
    const isHomepage = window.location.pathname === '/' || window.location.pathname === '/index';

    if (!isHomepage) {
      return;
    }

    if (typeof gsap === 'undefined') {
      console.warn('GSAP is not loaded');
      return;
    }

    const section = document.querySelector('[data-video-hero-animated]');
    const logoWrapper = section?.querySelector('.video-hero-animated__logo-wrapper');

    if (!section || !logoWrapper) {
      return;
    }

    const header = document.querySelector('[data-header]');
    const stickyHeader = document.querySelector('[data-transparent-sticky]');
    const headerLogoImg = document.querySelector('.diamension-header__logo-img');
    const mainHeaderLogo = header?.querySelector('.diamension-header__logo');
    const stickyHeaderLogo = stickyHeader?.querySelector('.diamension-header__logo');

    let targetWidth = '190px';
    let targetY = 0;

    if (headerLogoImg) {
      targetWidth = headerLogoImg.width + 'px';
    }

    const logoRect = logoWrapper.getBoundingClientRect();
    const logoHeight = logoRect.height;
    const logoCenter = logoRect.top + (logoHeight / 2);

    targetY = 100 - logoCenter;

    function preventScroll(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    function initializeElements() {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      window.addEventListener('scroll', preventScroll, { passive: false });
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });

      if (header) {
        header.style.setProperty('opacity', '0', 'important');
        header.style.setProperty('visibility', 'visible', 'important');
      }

      if (stickyHeader) {
        stickyHeader.style.setProperty('opacity', '0', 'important');
        stickyHeader.style.setProperty('visibility', 'visible', 'important');
      }

      if (mainHeaderLogo) {
        mainHeaderLogo.style.setProperty('opacity', '0', 'important');
        mainHeaderLogo.style.setProperty('visibility', 'hidden', 'important');
      }

      if (stickyHeaderLogo) {
        stickyHeaderLogo.style.setProperty('opacity', '0', 'important');
        stickyHeaderLogo.style.setProperty('visibility', 'hidden', 'important');
      }
    }

    function createAnimationTimeline() {
      const timeline = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';

          window.removeEventListener('scroll', preventScroll, { passive: false });
          window.removeEventListener('wheel', preventScroll, { passive: false });
          window.removeEventListener('touchmove', preventScroll, { passive: false });

          if (header) {
            header.style.removeProperty('opacity');
            header.style.removeProperty('visibility');
          }

          if (stickyHeader) {
            stickyHeader.style.removeProperty('opacity');
            stickyHeader.style.removeProperty('visibility');
          }

          if (mainHeaderLogo) {
            mainHeaderLogo.style.removeProperty('opacity');
            mainHeaderLogo.style.removeProperty('visibility');
          }

          if (stickyHeaderLogo) {
            stickyHeaderLogo.style.removeProperty('opacity');
            stickyHeaderLogo.style.removeProperty('visibility');
          }
        }
      });

      timeline.to({}, { duration: 1 });

      if (header) {
        timeline.to(header, {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        }, 1);
      }

      timeline.to(logoWrapper, {
        width: targetWidth,
        y: targetY,
        opacity: 0,
        duration: 2.5,
        ease: 'power3.inOut'
      }, 1);

      if (mainHeaderLogo) {
        timeline.to(mainHeaderLogo, {
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          onStart: () => {
            mainHeaderLogo.style.setProperty('visibility', 'visible', 'important');
          }
        }, 2.8);
      }

      if (stickyHeaderLogo) {
        timeline.to(stickyHeaderLogo, {
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          onStart: () => {
            stickyHeaderLogo.style.setProperty('visibility', 'visible', 'important');
          }
        }, 2.8);
      }

      return timeline;
    }

    initializeElements();
    createAnimationTimeline();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
