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

    if (this.tabs.length > 0) {
      this.activateTab(this.tabs[0].dataset.tab, false);
    }
  }

  setupScrollPadding() {
    if (!this.scrollBody) return;

    const categoriesEl = this.section.querySelector('.custom-section-faq__categories');
    if (!categoriesEl) return;

    const applyPadding = () => {
      const lastCategory = categoriesEl.lastElementChild;
      if (!lastCategory) return;
      const padding = Math.max(0, this.scrollBody.clientHeight - lastCategory.clientHeight);
      categoriesEl.style.paddingBottom = `${padding}px`;
    };

    this.applyScrollPadding = applyPadding;
    applyPadding();
    window.addEventListener('resize', applyPadding);
  }

  setupScrollListeners() {
    if (!this.tabs.length) return;

    const tabsContainer = this.tabs[0].parentElement;

    tabsContainer.addEventListener('scroll', () => {
      if (this.underline) {
        this.underline.scrollLeft = tabsContainer.scrollLeft;
      }
      this.updateUnderline();
    });

    if (this.scrollBody) {
      this.scrollBody.addEventListener('scroll', () => {
        this.updateActiveTabOnScroll();
      });
    }

    window.addEventListener('resize', () => {
      this.updateUnderline();
    });
  }

  updateActiveTabOnScroll() {
    const bodyRect = this.scrollBody.getBoundingClientRect();
    const threshold = 30;

    let currentCategory = null;

    this.categories.forEach((cat) => {
      const catTop = cat.getBoundingClientRect().top - bodyRect.top;
      if (catTop <= threshold) {
        currentCategory = cat;
      }
    });

    if (!currentCategory) return;

    const tabId = currentCategory.dataset.tabContent;
    if (this.activeTab && this.activeTab.dataset.tab === tabId) return;

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

  setupTabs() {
    this.tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = tab.dataset.tab;
        this.activateTab(tabId, true);
      });
    });
  }

  activateTab(tabId, shouldScroll = true) {
    this.tabs.forEach((tab) => {
      if (tab.dataset.tab === tabId) {
        tab.classList.add('custom-section-faq__tab--active');
        this.activeTab = tab;
      } else {
        tab.classList.remove('custom-section-faq__tab--active');
      }
    });

    if (this.activeTab) {
      this.activeTab.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }

    this.updateUnderline(true);

    const category = Array.from(this.categories).find((cat) => cat.dataset.tabContent === tabId);

    if (category && shouldScroll) {
      if (this.scrollBody) {
        const bodyRect = this.scrollBody.getBoundingClientRect();
        const categoryRect = category.getBoundingClientRect();
        const relativeTop = categoryRect.top - bodyRect.top + this.scrollBody.scrollTop;
        this.scrollBody.scrollTo({ top: relativeTop, behavior: 'smooth' });
      } else {
        const offset = window.innerHeight * 0.3;
        const categoryTop = category.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: categoryTop - offset, behavior: 'smooth' });
      }
    }
  }

  updateUnderline(withDelay = false) {
    if (!this.activeTab || !this.underline) return;

    const updatePosition = () => {
      const tabsContainer = this.activeTab.parentElement;

      const tabRect = this.activeTab.getBoundingClientRect();
      const tabsContainerRect = tabsContainer.getBoundingClientRect();

      const left = tabRect.left - tabsContainerRect.left;
      const width = tabRect.width;

      this.underline.style.setProperty('--indicator-left', `${left}px`);
      this.underline.style.setProperty('--indicator-width', `${width}px`);
    };

    if (withDelay) {
      setTimeout(updatePosition, 100);
    } else {
      updatePosition();
    }
  }

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

  toggleFaq(item) {
    const isExpanded = item.classList.contains('custom-section-faq__faq-item--expanded');

    if (isExpanded) {
      this.closeFaq(item);
    } else {
      this.closeAllFaqs();
      this.openFaq(item);
    }

    if (this.applyScrollPadding) {
      setTimeout(this.applyScrollPadding, 420);
    }
  }

  openFaq(item) {
    const toggle = item.querySelector('[data-faq-toggle]');
    const iconPlus = item.querySelector('.custom-section-faq__icon-plus');
    const iconMinus = item.querySelector('.custom-section-faq__icon-minus');

    item.classList.add('custom-section-faq__faq-item--expanded');

    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
    }

    if (iconPlus) iconPlus.style.display = 'none';
    if (iconMinus) iconMinus.style.display = 'block';

    this.activeFaq = item;
  }

  closeFaq(item) {
    const toggle = item.querySelector('[data-faq-toggle]');
    const iconPlus = item.querySelector('.custom-section-faq__icon-plus');
    const iconMinus = item.querySelector('.custom-section-faq__icon-minus');

    item.classList.remove('custom-section-faq__faq-item--expanded');

    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }

    if (iconPlus) iconPlus.style.display = 'block';
    if (iconMinus) iconMinus.style.display = 'none';

    if (this.activeFaq === item) {
      this.activeFaq = null;
    }
  }

  closeAllFaqs() {
    this.faqItems.forEach((item) => {
      this.closeFaq(item);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const faqSections = document.querySelectorAll('.custom-section-faq');

  faqSections.forEach((section) => {
    new FaqSection(section);
  });
});

if (typeof Shopify !== 'undefined' && Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    const section = event.target.querySelector('.custom-section-faq');
    if (section) {
      new FaqSection(section);
    }
  });
}
