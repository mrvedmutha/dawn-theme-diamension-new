/**
 * FAQ Section Controller
 * Handles tab navigation and accordion functionality
 */

class FaqSection {
  constructor(sectionElement) {
    this.section = sectionElement;
    this.tabs = this.section.querySelectorAll('[data-tab]');
    this.categories = this.section.querySelectorAll('[data-tab-content]');
    this.faqItems = this.section.querySelectorAll('[data-faq-item]');
    this.underline = this.section.querySelector('.custom-section-faq__tabs-underline');
    this.activeTab = null;
    this.activeFaq = null;
    this.scrollBody = this.section.querySelector('.custom-section-faq__scroll-body');

    this.init();
  }

  init() {
    this.setupTabs();
    this.setupAccordion();
    this.setupScrollListeners();
    this.setupScrollPadding();

    // Activate first tab on load
    if (this.tabs.length > 0) {
      this.activateTab(this.tabs[0].dataset.tab, false);
    }
  }

  /**
   * Add bottom padding to categories so any category can scroll to the top of the frame.
   * Without this, short last tabs can't scroll high enough to reach the top.
   */
  setupScrollPadding() {
    if (!this.scrollBody) return;

    const categoriesEl = this.section.querySelector('.custom-section-faq__categories');
    if (!categoriesEl) return;

    const applyPadding = () => {
      const lastCategory = categoriesEl.lastElementChild;
      if (!lastCategory) return;
      // Only add enough padding so the last category can scroll to the top —
      // no extra empty space beyond its actual content.
      const padding = Math.max(0, this.scrollBody.clientHeight - lastCategory.clientHeight);
      categoriesEl.style.paddingBottom = `${padding}px`;
    };

    this.applyScrollPadding = applyPadding;
    applyPadding();
    window.addEventListener('resize', applyPadding);
  }

  /**
   * Setup scroll and resize listeners for underline positioning
   */
  setupScrollListeners() {
    if (!this.tabs.length) return;

    const tabsContainer = this.tabs[0].parentElement;

    // Sync underline scroll with tabs scroll
    tabsContainer.addEventListener('scroll', () => {
      if (this.underline) {
        this.underline.scrollLeft = tabsContainer.scrollLeft;
      }
      this.updateUnderline();
    });

    // Scroll-spy: update active tab as user scrolls the content frame
    if (this.scrollBody) {
      this.scrollBody.addEventListener('scroll', () => {
        this.updateActiveTabOnScroll();
      });
    }

    // Update underline position on window resize
    window.addEventListener('resize', () => {
      this.updateUnderline();
    });
  }

  /**
   * Scroll-spy: find which category is at the top of the scroll frame
   * and sync the active tab to match it.
   */
  updateActiveTabOnScroll() {
    const bodyRect = this.scrollBody.getBoundingClientRect();
    const threshold = 30; // px tolerance from the top of the frame

    let currentCategory = null;

    this.categories.forEach((cat) => {
      const catTop = cat.getBoundingClientRect().top - bodyRect.top;
      if (catTop <= threshold) {
        currentCategory = cat;
      }
    });

    if (!currentCategory) return;

    const tabId = currentCategory.dataset.tabContent;
    if (this.activeTab && this.activeTab.dataset.tab === tabId) return; // already active, skip

    this.tabs.forEach((tab) => {
      if (tab.dataset.tab === tabId) {
        tab.classList.add('custom-section-faq__tab--active');
        this.activeTab = tab;
      } else {
        tab.classList.remove('custom-section-faq__tab--active');
      }
    });

    this.updateUnderline();
  }

  /**
   * Setup tab navigation
   */
  setupTabs() {
    this.tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = tab.dataset.tab;
        this.activateTab(tabId, true);
      });
    });
  }

  /**
   * Activate a tab and scroll to its category
   */
  activateTab(tabId, shouldScroll = true) {
    // Update active tab styling
    this.tabs.forEach((tab) => {
      if (tab.dataset.tab === tabId) {
        tab.classList.add('custom-section-faq__tab--active');
        this.activeTab = tab;
      } else {
        tab.classList.remove('custom-section-faq__tab--active');
      }
    });

    // Scroll active tab into view if it's overflowing
    if (this.activeTab) {
      this.activeTab.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }

    // Update underline with delay to let scroll animation start
    this.updateUnderline(true);

    // Find the corresponding category
    const category = Array.from(this.categories).find((cat) => cat.dataset.tabContent === tabId);

    if (category && shouldScroll) {
      if (this.scrollBody) {
        // Scroll inside the internal frame
        const bodyRect = this.scrollBody.getBoundingClientRect();
        const categoryRect = category.getBoundingClientRect();
        const relativeTop = categoryRect.top - bodyRect.top + this.scrollBody.scrollTop;
        this.scrollBody.scrollTo({ top: relativeTop, behavior: 'smooth' });
      } else {
        // Fallback: mobile uses normal page scroll
        const offset = window.innerHeight * 0.3;
        const categoryTop = category.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: categoryTop - offset, behavior: 'smooth' });
      }
    }
  }

  /**
   * Update underline position and width to match active tab
   */
  updateUnderline(withDelay = false) {
    if (!this.activeTab || !this.underline) return;

    const updatePosition = () => {
      const tabsContainer = this.activeTab.parentElement; // .custom-section-faq__tabs

      const tabRect = this.activeTab.getBoundingClientRect();
      const tabsContainerRect = tabsContainer.getBoundingClientRect();

      // Calculate position relative to tabs container (since underline scrolls with it)
      // No need to add scrollLeft since underline scrolls in sync
      const left = tabRect.left - tabsContainerRect.left;
      const width = tabRect.width;

      // Update CSS custom properties
      this.underline.style.setProperty('--indicator-left', `${left}px`);
      this.underline.style.setProperty('--indicator-width', `${width}px`);
    };

    // Add delay to let scroll animation start (similar to shop-by-price)
    if (withDelay) {
      setTimeout(updatePosition, 100);
    } else {
      updatePosition();
    }
  }

  /**
   * Setup accordion functionality
   */
  setupAccordion() {
    this.faqItems.forEach((item) => {
      const toggle = item.querySelector('[data-faq-toggle]');

      if (toggle) {
        toggle.addEventListener('click', () => {
          this.toggleFaq(item);
        });
      }
    });
  }

  /**
   * Toggle FAQ item (expand/collapse)
   */
  toggleFaq(item) {
    const isExpanded = item.classList.contains('custom-section-faq__faq-item--expanded');

    if (isExpanded) {
      this.closeFaq(item);
    } else {
      this.closeAllFaqs();
      this.openFaq(item);
    }

    // Re-apply padding since last category height may have changed
    if (this.applyScrollPadding) {
      setTimeout(this.applyScrollPadding, 420); // after accordion transition (~400ms)
    }
  }

  /**
   * Open a specific FAQ item
   */
  openFaq(item) {
    const toggle = item.querySelector('[data-faq-toggle]');
    const iconPlus = item.querySelector('.custom-section-faq__icon-plus');
    const iconMinus = item.querySelector('.custom-section-faq__icon-minus');

    item.classList.add('custom-section-faq__faq-item--expanded');

    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
    }

    // Toggle icons
    if (iconPlus) iconPlus.style.display = 'none';
    if (iconMinus) iconMinus.style.display = 'block';

    this.activeFaq = item;
  }

  /**
   * Close a specific FAQ item
   */
  closeFaq(item) {
    const toggle = item.querySelector('[data-faq-toggle]');
    const iconPlus = item.querySelector('.custom-section-faq__icon-plus');
    const iconMinus = item.querySelector('.custom-section-faq__icon-minus');

    item.classList.remove('custom-section-faq__faq-item--expanded');

    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }

    // Toggle icons
    if (iconPlus) iconPlus.style.display = 'block';
    if (iconMinus) iconMinus.style.display = 'none';

    if (this.activeFaq === item) {
      this.activeFaq = null;
    }
  }

  /**
   * Close all FAQ items
   */
  closeAllFaqs() {
    this.faqItems.forEach((item) => {
      this.closeFaq(item);
    });
  }
}

// Initialize FAQ sections when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const faqSections = document.querySelectorAll('.custom-section-faq');

  faqSections.forEach((section) => {
    new FaqSection(section);
  });
});

// Reinitialize for Shopify theme editor
if (typeof Shopify !== 'undefined' && Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    const section = event.target.querySelector('.custom-section-faq');
    if (section) {
      new FaqSection(section);
    }
  });
}
