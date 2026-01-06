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
      this.articlesPerPage = parseInt(this.section.dataset.articlesPerPage) || 4;

      // Track current state
      this.currentPage = 1;
      this.displayedArticles = this.articlesGrid.querySelectorAll('[data-article-card]').length;
      this.isLoading = false;

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
        }, 150);
      });

      // Scroll active tab into view on mobile
      this.scrollActiveTabIntoView();
    }

    positionUnderlineInitial() {
      if (!this.underline || !this.tabsContainer || !this.activeTab) return;

      // Use requestAnimationFrame for smoother rendering
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

    async loadMoreArticles() {
      if (this.isLoading) return;

      this.isLoading = true;
      const originalText = this.loadMoreBtn.textContent;
      this.loadMoreBtn.textContent = 'Loading...';
      this.loadMoreBtn.disabled = true;

      try {
        // Calculate next page to fetch
        this.currentPage++;

        // Fetch next page HTML
        const response = await fetch(`/blogs/${this.currentBlogHandle}?page=${this.currentPage}`);
        if (!response.ok) throw new Error('Failed to load articles');

        const html = await response.text();

        // Parse HTML to extract article cards
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Find article cards in the fetched HTML
        const articleCards = doc.querySelectorAll('[data-article-card]');

        if (articleCards.length > 0) {
          // Determine how many articles to show based on viewport
          const articlesToShow = getArticlesPerLoad();
          let addedCount = 0;

          // Append articles to grid
          articleCards.forEach((card, index) => {
            if (index < articlesToShow) {
              this.articlesGrid.appendChild(card.cloneNode(true));
              addedCount++;
            }
          });

          this.displayedArticles += addedCount;

          // Check if we should show load more button
          this.checkLoadMore();
        } else {
          // No more articles found
          this.loadMoreBtn.style.display = 'none';
        }
      } catch (error) {
        console.error('Error loading more articles:', error);
        this.loadMoreBtn.textContent = 'Error loading articles';
        setTimeout(() => {
          this.loadMoreBtn.textContent = originalText;
          this.loadMoreBtn.disabled = false;
        }, 2000);
      }

      this.isLoading = false;
      this.loadMoreBtn.textContent = originalText;
      this.loadMoreBtn.disabled = false;
    }

    checkLoadMore() {
      if (!this.loadMoreBtn) return;

      // Show load more button if there are more articles to load
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
