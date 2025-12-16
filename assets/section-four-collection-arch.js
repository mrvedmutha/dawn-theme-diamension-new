/**
 * Four Collection Arch Section
 * GSAP hover animations for desktop only
 */

(function () {
  'use strict';

  // Configuration
  const CONFIG = {
    DESKTOP_MIN_WIDTH: 768,
    ARCH_DURATION: 0.2,
    CTA_DURATION: 0.15,
    EASING: 'power2.out',
  };

  // Check if GSAP is available
  if (typeof gsap === 'undefined') {
    console.error('GSAP is required for Four Collection Arch animations');
    return;
  }

  /**
   * Check if current viewport is desktop
   */
  const isDesktop = () => {
    return window.innerWidth >= CONFIG.DESKTOP_MIN_WIDTH;
  };

  /**
   * Initialize hover animations for a card
   */
  const initCardHover = (card, sectionId) => {
    const cta = card.querySelector('.custom-section-four-collection-arch__card-cta');

    if (!cta) return;

    // Polygon clip-paths for smooth CSS transition (more points for smoother curve)
    const archClipPath = 'polygon(0% 33.1%, 2% 26%, 4% 21%, 6% 17%, 8% 14%, 10% 11.5%, 12% 9.5%, 14% 8%, 16% 6.7%, 18% 5.5%, 20% 4.5%, 22% 3.7%, 24% 3%, 26% 2.4%, 28% 1.9%, 30% 1.5%, 32% 1.2%, 34% 0.95%, 36% 0.75%, 38% 0.6%, 40% 0.45%, 42% 0.33%, 44% 0.23%, 46% 0.15%, 48% 0.08%, 50% 0%, 52% 0.08%, 54% 0.15%, 56% 0.23%, 58% 0.33%, 60% 0.45%, 62% 0.6%, 64% 0.75%, 66% 0.95%, 68% 1.2%, 70% 1.5%, 72% 1.9%, 74% 2.4%, 76% 3%, 78% 3.7%, 80% 4.5%, 82% 5.5%, 84% 6.7%, 86% 8%, 88% 9.5%, 90% 11.5%, 92% 14%, 94% 17%, 96% 21%, 98% 26%, 100% 33.1%, 100% 100%, 0% 100%)';
    const rectClipPath = 'polygon(0% 0%, 2% 0%, 4% 0%, 6% 0%, 8% 0%, 10% 0%, 12% 0%, 14% 0%, 16% 0%, 18% 0%, 20% 0%, 22% 0%, 24% 0%, 26% 0%, 28% 0%, 30% 0%, 32% 0%, 34% 0%, 36% 0%, 38% 0%, 40% 0%, 42% 0%, 44% 0%, 46% 0%, 48% 0%, 50% 0%, 52% 0%, 54% 0%, 56% 0%, 58% 0%, 60% 0%, 62% 0%, 64% 0%, 66% 0%, 68% 0%, 70% 0%, 72% 0%, 74% 0%, 76% 0%, 78% 0%, 80% 0%, 82% 0%, 84% 0%, 86% 0%, 88% 0%, 90% 0%, 92% 0%, 94% 0%, 96% 0%, 98% 0%, 100% 0%, 100% 100%, 0% 100%)';

    // Set initial state
    gsap.set(card, { clipPath: rectClipPath });

    // Mouse enter handler
    const handleMouseEnter = () => {
      if (!isDesktop()) return;

      // Arch effect on card using polygon clip-path (CSS transition handles the animation)
      card.style.clipPath = archClipPath;

      // CTA animation: fade in while moving up
      gsap.fromTo(
        cta,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: CONFIG.CTA_DURATION,
          ease: CONFIG.EASING,
        }
      );
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      if (!isDesktop()) return;

      // Remove arch effect (CSS transition handles the animation)
      card.style.clipPath = rectClipPath;

      // Fade out CTA
      gsap.to(cta, {
        opacity: 0,
        y: 10,
        duration: CONFIG.CTA_DURATION,
        ease: CONFIG.EASING,
      });
    };

    // Attach event listeners
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    // Store handlers for cleanup
    card._hoverHandlers = {
      mouseenter: handleMouseEnter,
      mouseleave: handleMouseLeave,
    };
  };

  /**
   * Remove hover animations from a card
   */
  const destroyCardHover = (card) => {
    if (card._hoverHandlers) {
      card.removeEventListener('mouseenter', card._hoverHandlers.mouseenter);
      card.removeEventListener('mouseleave', card._hoverHandlers.mouseleave);
      delete card._hoverHandlers;
    }

    // Reset styles
    const rectClipPath = 'polygon(0% 0%, 2% 0%, 4% 0%, 6% 0%, 8% 0%, 10% 0%, 12% 0%, 14% 0%, 16% 0%, 18% 0%, 20% 0%, 22% 0%, 24% 0%, 26% 0%, 28% 0%, 30% 0%, 32% 0%, 34% 0%, 36% 0%, 38% 0%, 40% 0%, 42% 0%, 44% 0%, 46% 0%, 48% 0%, 50% 0%, 52% 0%, 54% 0%, 56% 0%, 58% 0%, 60% 0%, 62% 0%, 64% 0%, 66% 0%, 68% 0%, 70% 0%, 72% 0%, 74% 0%, 76% 0%, 78% 0%, 80% 0%, 82% 0%, 84% 0%, 86% 0%, 88% 0%, 90% 0%, 92% 0%, 94% 0%, 96% 0%, 98% 0%, 100% 0%, 100% 100%, 0% 100%)';
    gsap.set(card, { clipPath: rectClipPath });
    const cta = card.querySelector('.custom-section-four-collection-arch__card-cta');
    if (cta) {
      gsap.set(cta, { opacity: isDesktop() ? 0 : 1, y: 0 });
    }
  };

  /**
   * Initialize all cards in a section
   */
  const initSection = (section) => {
    const sectionId = section.dataset.sectionId;
    const cards = section.querySelectorAll('.custom-section-four-collection-arch__card');

    cards.forEach((card) => {
      initCardHover(card, sectionId);
    });

    // Store reference for cleanup
    section._initialized = true;
  };

  /**
   * Destroy animations in a section
   */
  const destroySection = (section) => {
    const cards = section.querySelectorAll('.custom-section-four-collection-arch__card');

    cards.forEach((card) => {
      destroyCardHover(card);
    });

    section._initialized = false;
  };

  /**
   * Handle window resize
   */
  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const sections = document.querySelectorAll('.custom-section-four-collection-arch');

      sections.forEach((section) => {
        if (section._initialized) {
          destroySection(section);
          initSection(section);
        }
      });
    }, 250);
  };

  /**
   * Initialize on DOM ready
   */
  const init = () => {
    const sections = document.querySelectorAll('.custom-section-four-collection-arch');

    sections.forEach((section) => {
      initSection(section);
    });

    // Handle window resize
    window.addEventListener('resize', handleResize);
  };

  /**
   * Cleanup on page unload
   */
  const cleanup = () => {
    const sections = document.querySelectorAll('.custom-section-four-collection-arch');

    sections.forEach((section) => {
      destroySection(section);
    });

    window.removeEventListener('resize', handleResize);
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', cleanup);

  // Shopify Theme Editor support
  if (Shopify && Shopify.designMode) {
    document.addEventListener('shopify:section:load', (event) => {
      const section = event.target.querySelector('.custom-section-four-collection-arch');
      if (section) {
        initSection(section);
      }
    });

    document.addEventListener('shopify:section:unload', (event) => {
      const section = event.target.querySelector('.custom-section-four-collection-arch');
      if (section) {
        destroySection(section);
      }
    });

    document.addEventListener('shopify:block:select', (event) => {
      const card = event.target.closest('.custom-section-four-collection-arch__card');
      const section = card?.closest('.custom-section-four-collection-arch');
      if (card && !card._hoverHandlers && section) {
        const sectionId = section.dataset.sectionId;
        initCardHover(card, sectionId);
      }
    });
  }
})();
