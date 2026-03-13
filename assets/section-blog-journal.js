(function () {
  'use strict';

  const CONFIG = {
    ARTICLES_PER_LOAD: {
      DESKTOP: 4,
      TABLET: 3,
      MOBILE: 2,
    },
  };

  const getArticlesPerLoad = () => {
    const width = window.innerWidth;
    if (width <= 767) {
      return CONFIG.ARTICLES_PER_LOAD.MOBILE;
    } else if (width <= 1024) {
      return CONFIG.ARTICLES_PER_LOAD.TABLET;
    }
    return CONFIG.ARTICLES_PER_LOAD.DESKTOP;
  };

  class BlogJournalController {
    constructor(section) {
      this.section = section;
      this.activeTab = section.querySelector('.custom-section-blog-journal__tab--active');
      this.underline = section.querySelector('.custom-section-blog-journal__underline');
      this.tabsContainer = section.querySelector('[data-tabs-container]');
      this.articlesGrid = section.querySelector('[data-articles-grid]');
      this.loadMoreBtn = section.querySelector('[data-load-more-btn]');

      this.currentBlogHandle = this.section.dataset.currentBlog;
      this.showDate = this.section.dataset.showDate === 'true';
      this.showExcerpt = this.section.dataset.showExcerpt === 'true';
      this.totalArticles = parseInt(this.section.dataset.articlesCount) || 0;
      this.articlesPerPage = parseInt(this.section.dataset.articlesPerPage) || 4;

      this.currentPage = 1;
      const allCards = this.articlesGrid.querySelectorAll('[data-article-card]');
      this.displayedArticles = Array.from(allCards).filter(card => card.style.display !== 'none').length;
      this.isLoading = false;

      this.init();
    }

    init() {
      if (this.activeTab && this.underline) {
        this.positionUnderlineInitial();
      }

      if (this.loadMoreBtn) {
        this.loadMoreBtn.addEventListener('click', () => this.loadMoreArticles());
        this.checkLoadMore();
      }

      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (this.activeTab && this.underline) {
            this.positionUnderlineInitial();
          }
        }, 150);
      });

      this.scrollActiveTabIntoView();
    }

    positionUnderlineInitial() {
      if (!this.underline || !this.tabsContainer || !this.activeTab) return;

      requestAnimationFrame(() => {
        const tabRect = this.activeTab.getBoundingClientRect();
        const containerRect = this.tabsContainer.getBoundingClientRect();
        const offsetLeft = tabRect.left - containerRect.left + this.tabsContainer.scrollLeft;

        this.underline.style.left = `${offsetLeft}px`;
        this.underline.style.width = `${tabRect.width}px`;
        this.underline.style.opacity = '1';
        this.underline.classList.add('is-visible');
      });
    }

    scrollActiveTabIntoView() {
      if (!this.activeTab || !this.tabsContainer) return;

      const isResponsive = window.innerWidth <= 1024;

      if (isResponsive) {
        requestAnimationFrame(() => {
          const tabRect = this.activeTab.getBoundingClientRect();
          const containerRect = this.tabsContainer.getBoundingClientRect();
          const tabCenter = this.activeTab.offsetLeft + tabRect.width / 2;
          const containerCenter = containerRect.width / 2;
          const scrollPosition = tabCenter - containerCenter;

          this.tabsContainer.scrollTo({
            left: Math.max(0, scrollPosition),
            behavior: 'smooth',
          });
        });
      }
    }

    loadMoreArticles() {
      if (this.isLoading) return;

      this.isLoading = true;
      const originalText = this.loadMoreBtn.textContent;
      this.loadMoreBtn.textContent = 'Loading...';
      this.loadMoreBtn.disabled = true;

      setTimeout(() => {
        try {
          const articlesToShow = getArticlesPerLoad();

          const allCards = Array.from(this.articlesGrid.querySelectorAll('[data-article-card]'));
          const hiddenCards = allCards.filter(card => card.style.display === 'none');

          if (hiddenCards.length > 0) {
            const cardsToShow = Math.min(articlesToShow, hiddenCards.length);

            for (let i = 0; i < cardsToShow; i++) {
              hiddenCards[i].style.display = '';
              this.displayedArticles++;
            }
          }

          this.checkLoadMore();
        } catch (error) {
          console.error('Error loading more articles:', error);
        }

        this.isLoading = false;
        this.loadMoreBtn.textContent = originalText;
        this.loadMoreBtn.disabled = false;
      }, 300);
    }

    checkLoadMore() {
      if (!this.loadMoreBtn) return;

      const hasMoreArticles = this.totalArticles > this.displayedArticles;

      if (hasMoreArticles) {
        this.loadMoreBtn.style.display = 'block';
      } else {
        this.loadMoreBtn.style.display = 'none';
      }
    }
  }

  const initSection = () => {
    const sections = document.querySelectorAll('.custom-section-blog-journal');

    sections.forEach((section) => {
      new BlogJournalController(section);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSection);
  } else {
    initSection();
  }
})();
