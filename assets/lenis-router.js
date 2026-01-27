/**
 * Lenis Smooth Scroll Router
 *
 * This module handles the initialization of Lenis smooth scrolling
 * for specific pages based on configuration.
 */

class LenisRouter {
  constructor() {
    // Configuration object - add or remove page templates here
    this.config = {
      enabledPages: [
        'index',           // Homepage
        // 'page',         // All pages (uncomment to enable)
        // 'product',      // Product pages (uncomment to enable)
        // 'collection',   // Collection pages (uncomment to enable)
        // 'blog',         // Blog pages (uncomment to enable)
        // 'article',      // Article pages (uncomment to enable)
        // 'cart',         // Cart page (uncomment to enable)
        // 'search',       // Search page (uncomment to enable)
      ],
      lenisOptions: {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      }
    };

    this.lenis = null;
    this.currentTemplate = this.getCurrentTemplate();
  }

  /**
   * Get the current page template from body class or meta tags
   */
  getCurrentTemplate() {
    // Check for template meta tag (if available)
    const templateMeta = document.querySelector('meta[name="template"]');
    if (templateMeta) {
      return templateMeta.getAttribute('content');
    }

    // Fallback: check body classes for template name
    const bodyClasses = document.body.className.split(' ');
    for (const className of bodyClasses) {
      if (className.startsWith('template-')) {
        return className.replace('template-', '');
      }
    }

    // Additional fallback: check for specific page indicators
    if (document.body.classList.contains('index')) return 'index';
    if (window.location.pathname === '/' || window.location.pathname === '') return 'index';

    return null;
  }

  /**
   * Check if Lenis should be enabled on the current page
   */
  shouldEnableLenis() {
    if (!this.currentTemplate) return false;
    return this.config.enabledPages.includes(this.currentTemplate);
  }

  /**
   * Initialize Lenis smooth scroll
   */
  initLenis() {
    if (!window.Lenis) {
      console.warn('Lenis library not loaded');
      return;
    }

    this.lenis = new Lenis(this.config.lenisOptions);

    // Animation frame loop
    const raf = (time) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Make lenis globally accessible
    window.lenis = this.lenis;

    console.log(`Lenis smooth scroll enabled for template: ${this.currentTemplate}`);
  }

  /**
   * Destroy Lenis instance
   */
  destroyLenis() {
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
      window.lenis = null;
      console.log('Lenis smooth scroll disabled');
    }
  }

  /**
   * Initialize the router
   */
  init() {
    if (this.shouldEnableLenis()) {
      this.initLenis();
    } else {
      console.log(`Lenis smooth scroll disabled for template: ${this.currentTemplate || 'unknown'}`);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const lenisRouter = new LenisRouter();
  lenisRouter.init();
});
