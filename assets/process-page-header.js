/**
 * Process Page Header Behavior
 * - Hides solid header initially on process page
 * - Shows sticky header ONLY when scrolling UP
 * - Hides when scrolling DOWN or at top of page
 */

(function() {
  'use strict';

  // Only run on process page
  const processHero = document.querySelector('[data-process-hero]');
  if (!processHero) {
    console.log('Not on process page, skipping header behavior');
    return;
  }

  console.log('🎯 Process page detected - Checking navigation source');

  // Check if user came from brillance-3d transition
  const fromTransition = sessionStorage.getItem('fromBrillanceTransition');

  if (fromTransition) {
    console.log('✅ User came from 3D transition - Hiding header');
    // Clear the flag
    sessionStorage.removeItem('fromBrillanceTransition');

    // Get headers
    const solidHeader = document.querySelector('[data-header]');
    const stickyHeader = document.querySelector('[data-transparent-sticky]');

    if (!solidHeader) {
      console.error('Solid header not found');
      return;
    }

    // Get the Shopify section wrapper (parent of header)
    const headerSection = solidHeader.closest('.shopify-section');

    // Hide Shopify section wrapper - remove space
    if (headerSection) {
      headerSection.style.height = '0';
      headerSection.style.overflow = 'hidden';
      console.log('✅ Shopify section wrapper height set to 0');
    }

    // Hide solid header initially - move it out of view
    solidHeader.style.position = 'fixed';
    solidHeader.style.top = '0';
    solidHeader.style.left = '0';
    solidHeader.style.width = '100%';
    solidHeader.style.transform = 'translateY(-100%)';
    solidHeader.style.opacity = '0';
    solidHeader.style.pointerEvents = 'none';
    solidHeader.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    solidHeader.style.zIndex = '9999';

    console.log('✅ Solid header hidden and moved out of view');

    // If sticky header exists, use it. Otherwise, we'll show/hide the solid header
    const headerToControl = stickyHeader || solidHeader;

    if (stickyHeader) {
      console.log('Using sticky header for scroll behavior');
      // Hide sticky header initially
      stickyHeader.style.transform = 'translateY(-100%)';
      stickyHeader.style.opacity = '0';
      stickyHeader.style.pointerEvents = 'none';
      stickyHeader.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    } else {
      console.log('No sticky header found, will control solid header');
    }

    // Scroll tracking variables
    let lastScrollY = window.scrollY;
    let isScrollingUp = false;
    const scrollThreshold = 150; // Show header after scrolling 150px down
    const topThreshold = 50; // Hide header when within 50px of top

    /**
     * Handle scroll behavior
     */
    function handleScroll() {
    const currentScrollY = window.scrollY;

    // Determine scroll direction
    isScrollingUp = currentScrollY < lastScrollY;

    // Determine if we should show the header
    const shouldShowHeader =
      isScrollingUp &&
      currentScrollY > scrollThreshold &&
      currentScrollY > topThreshold;

    if (shouldShowHeader) {
      // Show header - slide down into view
      headerToControl.style.transform = 'translateY(0)';
      headerToControl.style.opacity = '1';
      headerToControl.style.pointerEvents = 'all';

      console.log('📍 Header visible (scroll UP at ' + Math.round(currentScrollY) + 'px)');
    } else {
      // Hide header - slide up out of view
      headerToControl.style.transform = 'translateY(-100%)';
      headerToControl.style.opacity = '0';
      headerToControl.style.pointerEvents = 'none';

      if (currentScrollY <= topThreshold) {
        console.log('🔝 Header hidden (at top)');
      } else if (!isScrollingUp) {
        console.log('⬇️ Header hidden (scroll DOWN)');
      }
    }

      lastScrollY = currentScrollY;
    }

    // Throttle scroll events using requestAnimationFrame
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(handleScroll);
    }, { passive: true });

    console.log('✅ Process page header behavior initialized (transition mode)');

    // Initial check
    handleScroll();

  } else {
    console.log('ℹ️ Direct visit - Header shows normally');
    // User came directly to the page
    // Header shows normally, no special behavior needed
  }

})();
