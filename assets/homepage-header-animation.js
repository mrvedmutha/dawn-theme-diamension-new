/**
 * Homepage Header Animation
 * Controls header and logo visibility during video logo animation
 * - Hides header initially (0-25vh)
 * - Shows main transparent header from 25vh to END OF VIDEO SECTION
 * - Keeps main header logo hidden during animation (0-3360px)
 * - Sticky header logo fades in via GSAP (3350-3360px)
 * - Main header logo becomes visible after 3360px (still in video section)
 * - After video section ends: releases control to default sticky header behavior
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

    // Calculate scroll thresholds
    function getScrollThresholds() {
      const vh = window.innerHeight;
      const scrollStartThreshold = vh * 0.25; // 25vh - start showing main header
      const logoTransitionEnd = 3360; // GSAP logo fade completes
      const logoScaleEnd = 3350; // GSAP logo scale completes

      // Calculate the end of the video section (500vh tall)
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
      header.style.setProperty('transition', 'opacity 0.6s ease-in-out', 'important');
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

      // Before 25vh - hide everything
      if (scrollY < thresholds.start) {
        header.style.setProperty('opacity', '0', 'important');
        header.classList.remove('diamension-header--hidden');

        if (stickyHeader) {
          stickyHeader.style.setProperty('opacity', '0', 'important');
          stickyHeader.classList.remove('is-visible');
        }

        // Keep logos hidden
        if (mainHeaderLogo) {
          mainHeaderLogo.style.setProperty('opacity', '0', 'important');
          mainHeaderLogo.style.setProperty('visibility', 'hidden', 'important');
        }
      }
      // From 25vh to end of video section - keep main transparent header visible
      else if (scrollY >= thresholds.start && scrollY < thresholds.sectionEnd) {
        // Show main header (transparent)
        header.style.setProperty('opacity', '1', 'important');
        header.classList.remove('diamension-header--hidden');

        // Keep sticky header hidden throughout the video section
        if (stickyHeader) {
          stickyHeader.style.setProperty('opacity', '0', 'important');
          stickyHeader.classList.remove('is-visible');
        }

        // Logo visibility logic based on position
        if (scrollY < thresholds.logoTransitionEnd) {
          // Before logo transition completes - keep main header logo hidden
          if (mainHeaderLogo) {
            mainHeaderLogo.style.setProperty('opacity', '0', 'important');
            mainHeaderLogo.style.setProperty('visibility', 'hidden', 'important');
          }

          // Sticky header logo opacity is controlled by GSAP (fades in 3350-3360px)
          if (stickyHeaderLogo && scrollY >= thresholds.logoScaleEnd) {
            stickyHeaderLogo.style.setProperty('visibility', 'visible', 'important');
          }
        } else {
          // After logo transition (3360px+) but still in video section
          // Main header logo can now be visible
          if (mainHeaderLogo) {
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

    // Hard refresh on viewport change (debounced)
    let resizeTimer;
    let initialWidth = window.innerWidth;
    let initialHeight = window.innerHeight;

    window.addEventListener('resize', function () {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      // Check if it's a significant viewport change (not just browser chrome showing/hiding)
      const widthChanged = Math.abs(currentWidth - initialWidth) > 50;
      const heightChanged = Math.abs(currentHeight - initialHeight) > 100;

      if (widthChanged || heightChanged) {
        // Clear existing timer
        clearTimeout(resizeTimer);

        // Set new timer for hard refresh
        resizeTimer = setTimeout(function () {
          window.location.reload();
        }, 500); // Wait 500ms after resize stops
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
