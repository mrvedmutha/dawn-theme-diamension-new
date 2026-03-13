/**
 * Video Hero Automated Animation - GSAP Timeline
 * One-time intro animation that:
 * - Scales logo from 40vw to header size
 * - Moves logo to header position
 * - Fades in header without logo
 * - Shows header logo after animation completes
 * - Prevents scrolling during animation
 */

(function () {
  function init() {
    // Only run on homepage
    const isHomepage = window.location.pathname === '/' || window.location.pathname === '/index';

    if (!isHomepage) {
      return;
    }

    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined') {
      console.warn('GSAP is not loaded');
      return;
    }

    const section = document.querySelector('[data-video-hero-animated]');
    const logoWrapper = section?.querySelector('.video-hero-animated__logo-wrapper');

    if (!section || !logoWrapper) {
      return;
    }

    // Get header elements
    const header = document.querySelector('[data-header]');
    const stickyHeader = document.querySelector('[data-transparent-sticky]');
    const headerLogoImg = document.querySelector('.diamension-header__logo-img');
    const mainHeaderLogo = header?.querySelector('.diamension-header__logo');
    const stickyHeaderLogo = stickyHeader?.querySelector('.diamension-header__logo');

    // Calculate target dimensions
    let targetWidth = '190px'; // Default
    let targetY = 0;

    if (headerLogoImg) {
      targetWidth = headerLogoImg.width + 'px';
    }

    // Calculate the Y position to move logo center to 100px from top
    const logoRect = logoWrapper.getBoundingClientRect();
    const logoHeight = logoRect.height;
    const logoCenter = logoRect.top + (logoHeight / 2);

    // Target: logo center should be at 100px from top
    targetY = 100 - logoCenter;

    // Prevent scroll function
    function preventScroll(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Initialize - hide headers and their logos
    function initializeElements() {
      // Prevent scrolling during animation - multiple methods for robustness
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      // Prevent scroll events
      window.addEventListener('scroll', preventScroll, { passive: false });
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });

      // Hide main header initially
      if (header) {
        header.style.setProperty('opacity', '0', 'important');
        header.style.setProperty('visibility', 'visible', 'important');
      }

      // Hide sticky header initially
      if (stickyHeader) {
        stickyHeader.style.setProperty('opacity', '0', 'important');
        stickyHeader.style.setProperty('visibility', 'visible', 'important');
      }

      // Hide main header logo
      if (mainHeaderLogo) {
        mainHeaderLogo.style.setProperty('opacity', '0', 'important');
        mainHeaderLogo.style.setProperty('visibility', 'hidden', 'important');
      }

      // Hide sticky header logo
      if (stickyHeaderLogo) {
        stickyHeaderLogo.style.setProperty('opacity', '0', 'important');
        stickyHeaderLogo.style.setProperty('visibility', 'hidden', 'important');
      }
    }

    // Create the animation timeline
    function createAnimationTimeline() {
      const timeline = gsap.timeline({
        onComplete: () => {
          // Animation complete - enable scrolling
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';

          // Remove scroll event listeners
          window.removeEventListener('scroll', preventScroll, { passive: false });
          window.removeEventListener('wheel', preventScroll, { passive: false });
          window.removeEventListener('touchmove', preventScroll, { passive: false });

          // Clean up inline styles to allow normal header behavior
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

      // Wait 1 second before starting the animation
      timeline.to({}, { duration: 1 });

      // Fade in header (without logo) while logo is animating
      if (header) {
        timeline.to(header, {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        }, 1);
      }

      // Animate logo: scale down, move to 100px from top, and fade out simultaneously
      timeline.to(logoWrapper, {
        width: targetWidth,
        y: targetY,
        opacity: 0,
        duration: 2.5,
        ease: 'power3.inOut'
      }, 1);

      // Show header logos as the animated logo is fading (starts at 2.8s into animation)
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

    // Run the animation on every page load
    initializeElements();
    createAnimationTimeline();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
