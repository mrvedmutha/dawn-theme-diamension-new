/**
 * Image Marquee Section - Infinite Scroll Animation
 * Uses GSAP for smooth, performant animations
 */

(function() {
  'use strict';

  /**
   * Initialize marquee animation for a section
   * @param {HTMLElement} section - The marquee section element
   */
  const initMarquee = (section) => {
    if (!section || typeof gsap === 'undefined') return;

    // Only enable animation on desktop (> 1024px)
    if (window.innerWidth <= 1024) {
      return; // Exit early on tablet/mobile - let CSS handle scrolling
    }

    const track = section.querySelector('.custom-section-image-marquee__track');
    if (!track) return;

    const items = Array.from(track.children);
    if (items.length === 0) return;

    // Get settings from data attributes
    const pauseOnHover = section.dataset.pauseOnHover === 'true';

    // Clone items for seamless infinite loop
    // We need enough clones to ensure continuous scrolling
    const cloneCount = Math.ceil(window.innerWidth / track.offsetWidth) + 2;

    for (let i = 0; i < cloneCount; i++) {
      items.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true'); // Hide clones from screen readers
        track.appendChild(clone);
      });
    }

    // Calculate total width of original items (with gaps)
    const itemWidth = items[0].offsetWidth;
    const gap = 60; // Match CSS gap value
    const totalWidth = (itemWidth + gap) * items.length;

    // Snail speed: 30 pixels per second (subtle, slow movement)
    const pixelsPerSecond = 30;
    const duration = totalWidth / pixelsPerSecond;

    // Set up GSAP animation
    const animation = gsap.to(track, {
      x: -totalWidth,
      duration: duration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });

    // Pause on hover functionality
    if (pauseOnHover) {
      section.addEventListener('mouseenter', () => {
        gsap.to(animation, {
          timeScale: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      section.addEventListener('mouseleave', () => {
        gsap.to(animation, {
          timeScale: 1,
          duration: 0.3,
          ease: 'power2.in'
        });
      });
    }

    // Recalculate on window resize (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Check if we've crossed the desktop/mobile threshold
        const shouldAnimate = window.innerWidth > 1024;
        const hasAnimation = animation && animation.isActive !== undefined;

        if (!shouldAnimate && hasAnimation) {
          // Kill animation and remove clones when switching to mobile
          animation.kill();
          const allItems = Array.from(track.children);
          allItems.forEach((item, index) => {
            if (index >= items.length) {
              item.remove();
            }
          });
        } else if (shouldAnimate) {
          // Reinitialize animation on desktop
          animation.kill();
          const allItems = Array.from(track.children);
          allItems.forEach((item, index) => {
            if (index >= items.length) {
              item.remove();
            }
          });
          initMarquee(section);
        }
      }, 250);
    });
  };

  /**
   * Initialize all marquee sections on the page
   */
  const initAllMarquees = () => {
    // Wait for GSAP to be available
    const checkGSAP = setInterval(() => {
      if (typeof gsap !== 'undefined') {
        clearInterval(checkGSAP);

        const sections = document.querySelectorAll('.custom-section-image-marquee');
        sections.forEach(section => {
          initMarquee(section);
        });
      }
    }, 100);

    // Timeout after 5 seconds if GSAP doesn't load
    setTimeout(() => {
      clearInterval(checkGSAP);
      if (typeof gsap === 'undefined') {
        console.error('GSAP library failed to load. Marquee animation will not work.');
      }
    }, 5000);
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllMarquees);
  } else {
    initAllMarquees();
  }

  // Shopify Theme Editor support
  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', (event) => {
      const section = event.target.querySelector('.custom-section-image-marquee');
      if (section) {
        setTimeout(() => initMarquee(section), 100);
      }
    });
  }

})();
