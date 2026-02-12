/**
 * Homepage Header Animation
 * Controls header and logo visibility during video logo animation
 * - Hides header initially (0-10vh)
 * - Shows main transparent header instantly at 10vh to END OF VIDEO SECTION
 * - Keeps main header logo hidden during animation (0-51vh)
 * - Sticky header logo fades in via GSAP (50vh-51vh)
 * - Main header logo becomes visible after 51vh (still in video section)
 * - After video section ends (150vh): releases control to default sticky header behavior
 * - Only runs if video logo animation section exists
 */

(function () {
  function init() {
    // Check if we're on the homepage
    const isHomepage = window.location.pathname === '/' || window.location.pathname === '/index';

    if (!isHomepage) return;

    // Check if video logo animation section exists
    const videoLogoSection = document.querySelector('[data-video-logo-animation]');

    if (!videoLogoSection) {
      return; // Exit and use default 820px behavior
    }

    const header = document.querySelector('[data-header]');
    const stickyHeader = document.querySelector('[data-transparent-sticky]');

    if (!header) return;

    // Get header logo elements
    const mainHeaderLogo = header.querySelector('.diamension-header__logo');
    const stickyHeaderLogo = stickyHeader?.querySelector('.diamension-header__logo');

    // Track if animation has been completed
    let animationCompleted = false;

    // Calculate scroll thresholds
    function getScrollThresholds() {
      const vh = window.innerHeight;
      const scrollStartThreshold = vh * 0.1; // 10vh - start showing main header (faster!)
      const logoScaleEnd = vh * 0.5; // 50vh - GSAP logo scale completes
      const logoTransitionEnd = vh * 0.51; // 51vh - GSAP logo fade completes

      // Calculate the end of the video section (150vh tall)
      const sectionEnd = videoLogoSection.offsetHeight;

      return {
        start: scrollStartThreshold,
        logoScaleEnd: logoScaleEnd,
        logoTransitionEnd: logoTransitionEnd,
        sectionEnd: sectionEnd, // Keep header visible until section ends
      };
    }

    // Initialize - hide header and logos
    function initHeaderHide() {
      // Hide main header initially
      header.style.setProperty('opacity', '0', 'important');
      header.style.setProperty('transition', 'opacity 0.2s ease-out', 'important'); // Faster transition!
      header.style.setProperty('visibility', 'visible', 'important');

      // Hide sticky header initially
      if (stickyHeader) {
        stickyHeader.style.setProperty('opacity', '0', 'important');
        stickyHeader.style.setProperty('visibility', 'visible', 'important');
      }

      // Hide main header logo initially - will stay hidden during animation
      if (mainHeaderLogo) {
        mainHeaderLogo.style.setProperty('opacity', '0', 'important');
        mainHeaderLogo.style.setProperty('visibility', 'hidden', 'important');
      }

      // Hide sticky header logo initially - GSAP will fade it in at 3350-3360px
      if (stickyHeaderLogo) {
        stickyHeaderLogo.style.setProperty('opacity', '0', 'important');
        stickyHeaderLogo.style.setProperty('visibility', 'visible', 'important');
      }
    }

    // Release control back to default header behavior
    function releaseHeaderControl() {
      // Remove our opacity overrides from headers
      header.style.removeProperty('opacity');

      if (stickyHeader) {
        stickyHeader.style.removeProperty('opacity');
      }

      // Remove logo visibility overrides - allow them to be visible
      if (mainHeaderLogo) {
        mainHeaderLogo.style.removeProperty('opacity');
        mainHeaderLogo.style.removeProperty('visibility');
      }

      if (stickyHeaderLogo) {
        // Keep opacity control to GSAP, but remove visibility override
        stickyHeaderLogo.style.removeProperty('visibility');
      }
    }

    // Handle scroll event
    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      const thresholds = getScrollThresholds();

      // Before 10vh - hide everything
      if (scrollY < thresholds.start) {
        // No transition when hiding (instant)
        header.style.setProperty('transition', 'none', 'important');
        header.style.setProperty('opacity', '0', 'important');
        header.classList.remove('diamension-header--hidden');

        if (stickyHeader) {
          stickyHeader.style.setProperty('opacity', '0', 'important');
          stickyHeader.classList.remove('is-visible');
        }

        // Keep logos hidden instantly
        if (mainHeaderLogo) {
          mainHeaderLogo.style.setProperty('transition', 'none', 'important');
          mainHeaderLogo.style.setProperty('opacity', '0', 'important');
          mainHeaderLogo.style.setProperty('visibility', 'hidden', 'important');
        }
      }
      // From 10vh to end of video section - keep main transparent header visible
      else if (scrollY >= thresholds.start && scrollY < thresholds.sectionEnd) {
        // Enable transition when showing (smooth)
        header.style.setProperty('transition', 'opacity 0.2s ease-out', 'important');
        header.style.setProperty('opacity', '1', 'important');
        header.classList.remove('diamension-header--hidden');

        // Keep sticky header hidden throughout the video section
        if (stickyHeader) {
          stickyHeader.style.setProperty('opacity', '0', 'important');
          stickyHeader.classList.remove('is-visible');
        }

        // Logo visibility logic based on position
        if (scrollY < thresholds.logoTransitionEnd && !animationCompleted) {
          // Before logo transition completes - keep main header logo hidden
          // Only hide if animation hasn't been completed yet
          if (mainHeaderLogo) {
            mainHeaderLogo.style.setProperty('transition', 'none', 'important');
            mainHeaderLogo.style.setProperty('opacity', '0', 'important');
            mainHeaderLogo.style.setProperty('visibility', 'hidden', 'important');
          }

          // Sticky header logo opacity is controlled by GSAP
          if (stickyHeaderLogo && scrollY >= thresholds.logoScaleEnd) {
            stickyHeaderLogo.style.setProperty('visibility', 'visible', 'important');
          }
        } else {
          // After logo transition - Main header logo can now be visible
          // Mark animation as completed
          animationCompleted = true;

          if (mainHeaderLogo) {
            mainHeaderLogo.style.setProperty('transition', 'opacity 0.2s ease-out', 'important');
            mainHeaderLogo.style.setProperty('opacity', '1', 'important');
            mainHeaderLogo.style.setProperty('visibility', 'visible', 'important');
          }

          // Sticky header logo is visible but sticky header itself is hidden
          if (stickyHeaderLogo) {
            stickyHeaderLogo.style.setProperty('visibility', 'visible', 'important');
          }
        }
      }
      // After video section ends - release control to default sticky behavior
      else {
        // Release control only once
        if (header.style.opacity !== '') {
          releaseHeaderControl();
        }
      }
    }

    // Initialize
    initHeaderHide();

    // Listen for scroll events
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Handle scroll on page load
    handleScroll();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
