/**
 * FAQ Section Controller
 * Handles tab navigation and accordion functionality
 */

class FaqSection {
  constructor(sectionElement) {
    this.section = sectionElement;
    this.tabs = this.section.querySelectorAll('[data-tab]');
    this.categories = this.section.querySelectorAll('[data-tab-id]');
    this.faqItems = this.section.querySelectorAll('[data-faq-item]');
    this.activeTab = null;
    this.activeFaq = null;

    this.init();
  }

  init() {
    this.setupTabs();
    this.setupAccordion();

    // Activate first tab on load
    if (this.tabs.length > 0) {
      this.activateTab(this.tabs[0].dataset.tab, false);
    }
  }

  /**
   * Setup tab navigation
   */
  setupTabs() {
    this.tabs.forEach(tab => {
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
    this.tabs.forEach(tab => {
      if (tab.dataset.tab === tabId) {
        tab.classList.add('custom-section-faq__tab--active');
        this.activeTab = tab;
      } else {
        tab.classList.remove('custom-section-faq__tab--active');
      }
    });

    // Find the corresponding category
    const category = Array.from(this.categories).find(
      cat => cat.dataset.tabId === tabId
    );

    if (category && shouldScroll) {
      // Scroll to category
      category.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Open first FAQ in this category after scroll
      setTimeout(() => {
        const firstFaq = category.querySelector('[data-faq-item]');
        if (firstFaq) {
          this.openFaq(firstFaq);
        }
      }, 500); // Wait for scroll to complete
    }
  }

  /**
   * Setup accordion functionality
   */
  setupAccordion() {
    this.faqItems.forEach(item => {
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
      // Close all other FAQs first (only one open at a time)
      this.closeAllFaqs();
      this.openFaq(item);
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
    this.faqItems.forEach(item => {
      this.closeFaq(item);
    });
  }
}

// Initialize FAQ sections when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const faqSections = document.querySelectorAll('.custom-section-faq');

  faqSections.forEach(section => {
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
