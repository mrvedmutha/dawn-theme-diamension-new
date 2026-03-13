(function () {
  'use strict';

  const initSearchResults = () => {
    const loadMoreBtn = document.querySelector('[data-load-more-btn]');

    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', handleLoadMore);
  };

  const handleLoadMore = async (event) => {
    const btn = event.currentTarget;
    const productsGrid = document.querySelector('[data-search-products-grid]');
    const progressText = document.querySelector('[data-progress-text]');

    if (!productsGrid) return;

    const currentPage = parseInt(btn.dataset.currentPage);
    const totalResults = parseInt(btn.dataset.totalResults);
    const productsPerPage = parseInt(btn.dataset.productsPerPage);
    const searchQuery = btn.dataset.searchQuery;

    const nextPage = currentPage + 1;
    const loadedProducts = currentPage * productsPerPage;

    if (loadedProducts >= totalResults) {
      btn.style.display = 'none';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'LOADING...';

    try {
      const response = await fetch(
        `/search?q=${encodeURIComponent(searchQuery)}&page=${nextPage}&type=product&view=ajax`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to load more products');
      }

      const html = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newProducts = doc.querySelectorAll('.product-card-search');

      newProducts.forEach((product) => {
        productsGrid.appendChild(product.cloneNode(true));
      });

      if (window.WishlistManager) {
        window.WishlistManager.initializeButtons();
      }

      btn.dataset.currentPage = nextPage;

      const newLoadedProducts = nextPage * productsPerPage;
      const displayedProducts = Math.min(newLoadedProducts, totalResults);
      if (progressText) {
        progressText.textContent = `Showing ${displayedProducts} of ${totalResults} products`;
        progressText.dataset.currentCount = displayedProducts;
      }

      btn.disabled = false;
      btn.textContent = 'LOAD MORE';

      if (newLoadedProducts >= totalResults) {
        btn.style.display = 'none';
      }
    } catch (error) {
      console.error('Error loading more products:', error);

      btn.disabled = false;
      btn.textContent = 'LOAD MORE';

      showError('Failed to load more products. Please try again.');
    }
  };

  const showError = (message) => {
    const errorEl = document.createElement('div');
    errorEl.className = 'custom-section-search-results__error';
    errorEl.textContent = message;
    errorEl.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #f44336;
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      z-index: 9999;
      font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
      font-size: 14px;
    `;

    document.body.appendChild(errorEl);

    setTimeout(() => {
      errorEl.remove();
    }, 3000);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearchResults);
  } else {
    initSearchResults();
  }
})();
