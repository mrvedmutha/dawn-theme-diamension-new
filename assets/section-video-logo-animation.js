/**
 * Video Logo Animation - GSAP ScrollTrigger
 * Animates logo resize based on scroll position
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

    // Get header logo width and position to match at the end of animation
    const headerLogoImg = document.querySelector('.diamension-header__logo-img');
    const headerLogo = document.querySelector('.diamension-header__logo');
    let targetWidth = '190px'; // Default
    let targetY = 0;

    if (headerLogoImg) {
      targetWidth = headerLogoImg.width + 'px';
    }

    // Calculate the Y position to move logo to header position
    if (headerLogo) {
      const headerRect = headerLogo.getBoundingClientRect();
      const logoRect = logoWrapper.getBoundingClientRect();
      targetY = headerRect.top - logoRect.top;
    }

    // Phase 1: Scale down from 40vw to 190px - completes at 3350px
    gsap.to(logoWrapper, {
      width: targetWidth,
      y: targetY,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '3350px top',
        scrub: 1,
        pin: false,
      },
    });

    // Phase 2: Fade out video logo at 3350-3360px (10px gap)
    gsap.to(logoWrapper, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: '3350px top',
        end: '3360px top',
        scrub: 1,
        pin: false,
      },
    });

    // Phase 3: Fade in header logo at 3350-3360px (10px gap)
    // Only target transparent sticky header logo
    const stickyHeaderLogoWrapper = document.querySelector('[data-transparent-sticky] .diamension-header__logo');
    if (stickyHeaderLogoWrapper) {
      // Set initial state - logo starts hidden
      gsap.set(stickyHeaderLogoWrapper, {
        opacity: 0,
      });

      gsap.to(stickyHeaderLogoWrapper, {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '3350px top',
          end: '3360px top',
          scrub: 1,
          pin: false,
          onUpdate: (self) => {
            // Force opacity with !important to override other scripts
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

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
