/**
 * Section: Search Results
 * Purpose: AJAX pagination for Load More functionality
 * Author: Wings Design Team
 * Version: 1.0
 */

(function() {
  'use strict';

  /**
   * Initialize the search results functionality
   */
  const initSearchResults = () => {
    const loadMoreBtn = document.querySelector('[data-load-more-btn]');

    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', handleLoadMore);
  };

  /**
   * Handle Load More button click
   */
  const handleLoadMore = async (event) => {
    const btn = event.currentTarget;
    const productsGrid = document.querySelector('[data-search-products-grid]');

    if (!productsGrid) return;

    // Get data from button attributes
    const currentPage = parseInt(btn.dataset.currentPage);
    const totalResults = parseInt(btn.dataset.totalResults);
    const productsPerPage = parseInt(btn.dataset.productsPerPage);
    const searchQuery = btn.dataset.searchQuery;

    // Calculate next page
    const nextPage = currentPage + 1;
    const loadedProducts = currentPage * productsPerPage;

    // Check if there are more products to load
    if (loadedProducts >= totalResults) {
      btn.style.display = 'none';
      return;
    }

    // Disable button and show loading state
    btn.disabled = true;
    btn.textContent = 'LOADING...';

    try {
      // Fetch next page of results
      const response = await fetch(
        `/search?q=${encodeURIComponent(searchQuery)}&page=${nextPage}&type=product&view=ajax`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load more products');
      }

      const html = await response.text();

      // Parse the HTML response
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newProducts = doc.querySelectorAll('.product-card-search');

      // Append new products to the grid
      newProducts.forEach(product => {
        productsGrid.appendChild(product.cloneNode(true));
      });

      // Update current page
      btn.dataset.currentPage = nextPage;

      // Reset button state
      btn.disabled = false;
      btn.textContent = 'LOAD MORE';

      // Check if all products are loaded
      const newLoadedProducts = nextPage * productsPerPage;
      if (newLoadedProducts >= totalResults) {
        btn.style.display = 'none';
      }

    } catch (error) {
      console.error('Error loading more products:', error);

      // Reset button state
      btn.disabled = false;
      btn.textContent = 'LOAD MORE';

      // Show error message (optional)
      showError('Failed to load more products. Please try again.');
    }
  };

  /**
   * Show error message to user
   */
  const showError = (message) => {
    // Create error element
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

    // Remove after 3 seconds
    setTimeout(() => {
      errorEl.remove();
    }, 3000);
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearchResults);
  } else {
    initSearchResults();
  }

})();
