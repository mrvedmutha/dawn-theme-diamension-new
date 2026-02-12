/**
 * Four Collection Arch Section
 * GSAP CTA hover animations for desktop only
 */

(function () {
  'use strict';

  // Configuration
  const CONFIG = {
    DESKTOP_MIN_WIDTH: 768,
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
    const overlay = card.querySelector('.custom-section-four-collection-arch__card-overlay');

    if (!cta || !overlay) return;

    // Mouse enter handler
    const handleMouseEnter = () => {
      if (!isDesktop()) return;

      // Overlay animation: fade in
      gsap.to(overlay, {
        opacity: 1,
        duration: CONFIG.CTA_DURATION,
        ease: CONFIG.EASING,
      });

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
        },
      );
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      if (!isDesktop()) return;

      // Fade out overlay
      gsap.to(overlay, {
        opacity: 0,
        duration: CONFIG.CTA_DURATION,
        ease: CONFIG.EASING,
      });

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

    // Reset CTA and overlay styles
    const cta = card.querySelector('.custom-section-four-collection-arch__card-cta');
    const overlay = card.querySelector('.custom-section-four-collection-arch__card-overlay');

    if (cta) {
      gsap.set(cta, { opacity: isDesktop() ? 0 : 1, y: 0 });
    }

    if (overlay) {
      gsap.set(overlay, { opacity: isDesktop() ? 0 : 1 });
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
