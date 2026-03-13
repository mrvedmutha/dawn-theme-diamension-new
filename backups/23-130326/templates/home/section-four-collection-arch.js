(function () {
  'use strict';

  const CONFIG = {
    DESKTOP_MIN_WIDTH: 768,
    CTA_DURATION: 0.15,
    EASING: 'power2.out',
  };

  if (typeof gsap === 'undefined') {
    return;
  }

  const isDesktop = () => {
    return window.innerWidth >= CONFIG.DESKTOP_MIN_WIDTH;
  };

  const initCardHover = (card, sectionId) => {
    const cta = card.querySelector('.custom-section-four-collection-arch__card-cta');
    const overlay = card.querySelector('.custom-section-four-collection-arch__card-overlay');

    if (!cta || !overlay) return;

    const handleMouseEnter = () => {
      if (!isDesktop()) return;

      gsap.to(overlay, {
        opacity: 1,
        duration: CONFIG.CTA_DURATION,
        ease: CONFIG.EASING,
      });

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

    const handleMouseLeave = () => {
      if (!isDesktop()) return;

      gsap.to(overlay, {
        opacity: 0,
        duration: CONFIG.CTA_DURATION,
        ease: CONFIG.EASING,
      });

      gsap.to(cta, {
        opacity: 0,
        y: 10,
        duration: CONFIG.CTA_DURATION,
        ease: CONFIG.EASING,
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    card._hoverHandlers = {
      mouseenter: handleMouseEnter,
      mouseleave: handleMouseLeave,
    };
  };

  const destroyCardHover = (card) => {
    if (card._hoverHandlers) {
      card.removeEventListener('mouseenter', card._hoverHandlers.mouseenter);
      card.removeEventListener('mouseleave', card._hoverHandlers.mouseleave);
      delete card._hoverHandlers;
    }

    const cta = card.querySelector('.custom-section-four-collection-arch__card-cta');
    const overlay = card.querySelector('.custom-section-four-collection-arch__card-overlay');

    if (cta) {
      gsap.set(cta, { opacity: isDesktop() ? 0 : 1, y: 0 });
    }

    if (overlay) {
      gsap.set(overlay, { opacity: isDesktop() ? 0 : 1 });
    }
  };

  const initSection = (section) => {
    const sectionId = section.dataset.sectionId;
    const cards = section.querySelectorAll('.custom-section-four-collection-arch__card');

    cards.forEach((card) => {
      initCardHover(card, sectionId);
    });

    section._initialized = true;
  };

  const destroySection = (section) => {
    const cards = section.querySelectorAll('.custom-section-four-collection-arch__card');

    cards.forEach((card) => {
      destroyCardHover(card);
    });

    section._initialized = false;
  };

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

  const init = () => {
    const sections = document.querySelectorAll('.custom-section-four-collection-arch');

    sections.forEach((section) => {
      initSection(section);
    });

    window.addEventListener('resize', handleResize);
  };

  const cleanup = () => {
    const sections = document.querySelectorAll('.custom-section-four-collection-arch');

    sections.forEach((section) => {
      destroySection(section);
    });

    window.removeEventListener('resize', handleResize);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('beforeunload', cleanup);

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
