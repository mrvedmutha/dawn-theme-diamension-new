(function () {
  'use strict';

  // Configuration
  const CONFIG = {
    ARTICLES_PER_LOAD: {
      DESKTOP: 4,
      TABLET: 3,
      MOBILE: 2,
    },
  };

  // Get current articles per load based on viewport
  const getArticlesPerLoad = () => {
    const width = window.innerWidth;
    if (width <= 767) {
      return CONFIG.ARTICLES_PER_LOAD.MOBILE;
    } else if (width <= 1024) {
      return CONFIG.ARTICLES_PER_LOAD.TABLET;
    }
    return CONFIG.ARTICLES_PER_LOAD.DESKTOP;
  };

  // Blog Journal Controller
  class BlogJournalController {
    constructor(section) {
      this.section = section;
      this.activeTab = section.querySelector('.custom-section-blog-journal__tab--active');
      this.underline = section.querySelector('.custom-section-blog-journal__underline');
      this.tabsContainer = section.querySelector('[data-tabs-container]');
      this.articlesGrid = section.querySelector('[data-articles-grid]');
      this.loadMoreBtn = section.querySelector('[data-load-more-btn]');

      // Get data from section
      this.currentBlogHandle = this.section.dataset.currentBlog;
      this.showDate = this.section.dataset.showDate === 'true';
      this.showExcerpt = this.section.dataset.showExcerpt === 'true';
      this.totalArticles = parseInt(this.section.dataset.articlesCount) || 0;
      this.articlesPerPage = parseInt(this.section.dataset.articlesPerPage) || 12;

      // Track current state
      this.currentPage = 1;
      this.displayedArticles = this.articlesGrid.querySelectorAll('[data-article-card]').length;

      this.init();
    }

    init() {
      // Position underline on initial load
      if (this.activeTab && this.underline) {
        this.positionUnderlineInitial();
      }

      // Set up load more listener
      if (this.loadMoreBtn) {
        this.loadMoreBtn.addEventListener('click', () => this.loadMoreArticles());
        this.checkLoadMore();
      }

      // Handle window resize for underline positioning
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (this.activeTab && this.underline) {
            this.positionUnderlineInitial();
          }
        }, 200);
      });

      // Scroll active tab into view on mobile
      this.scrollActiveTabIntoView();
    }

    positionUnderlineInitial() {
      if (!this.underline || !this.tabsContainer || !this.activeTab) return;

      setTimeout(() => {
        const tabRect = this.activeTab.getBoundingClientRect();
        const containerRect = this.tabsContainer.getBoundingClientRect();
        const offsetLeft = tabRect.left - containerRect.left + this.tabsContainer.scrollLeft;

        this.underline.style.left = `${offsetLeft}px`;
        this.underline.style.width = `${tabRect.width}px`;
        this.underline.style.opacity = '1';
        this.underline.classList.add('is-visible');
      }, 100);
    }

    scrollActiveTabIntoView() {
      if (!this.activeTab || !this.tabsContainer) return;

      const isResponsive = window.innerWidth <= 1024;

      if (isResponsive) {
        setTimeout(() => {
          const tabRect = this.activeTab.getBoundingClientRect();
          const containerRect = this.tabsContainer.getBoundingClientRect();
          const tabCenter = this.activeTab.offsetLeft + tabRect.width / 2;
          const containerCenter = containerRect.width / 2;
          const scrollPosition = tabCenter - containerCenter;

          this.tabsContainer.scrollTo({
            left: Math.max(0, scrollPosition),
            behavior: 'smooth',
          });
        }, 200);
      }
    }

    loadMoreArticles() {
      // Since Shopify pagination works via URL params,
      // we'll navigate to the next page with a page parameter
      this.currentPage++;
      window.location.href = `/blogs/${this.currentBlogHandle}?page=${this.currentPage}`;
    }

    checkLoadMore() {
      if (!this.loadMoreBtn) return;

      // Show load more button if there are more articles to load
      // Shopify blog.articles has a size limit per page, we check if we have more
      const hasMoreArticles = this.totalArticles > this.displayedArticles;

      if (hasMoreArticles) {
        this.loadMoreBtn.style.display = 'block';
      } else {
        this.loadMoreBtn.style.display = 'none';
      }
    }
  }

  // Initialize section
  const initSection = () => {
    const sections = document.querySelectorAll('.custom-section-blog-journal');

    sections.forEach((section) => {
      new BlogJournalController(section);
    });
  };

  // Wait for DOM to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSection);
  } else {
    initSection();
  }
})();
