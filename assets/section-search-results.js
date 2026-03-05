/**
 * Section: Search Results
 * Purpose: AJAX pagination for Load More functionality
 * Author: Wings Design Team
 * Version: 1.0
 */

(function () {
  'use strict';

  /**
   * Extract and log all product details from the search results
   */
  const logProductDetails = () => {
    const productsGrid = document.querySelector('[data-search-products-grid]');
    if (!productsGrid) return;

    const productCards = productsGrid.querySelectorAll('.product-card-search');
    const products = [];

    productCards.forEach((card, index) => {
      const link = card.querySelector('.product-card-search__link');
      const title = card.querySelector('.product-card-search__title');
      const price = card.querySelector('.product-card-search__price');
      const image = card.querySelector('.product-card-search__image');
      const productId = card.dataset.productId;

      const productDetails = {
        index: index + 1,
        id: productId || 'N/A',
        title: title ? title.textContent.trim() : 'N/A',
        price: price ? price.textContent.trim() : 'N/A',
        url: link ? link.href : 'N/A',
        image: {
          src: image ? image.src : 'N/A',
          alt: image ? image.alt : 'N/A',
          srcset: image ? image.srcset : 'N/A',
        },
      };

      products.push(productDetails);
    });

    // Log results to console
    console.group('🔍 Search Results - Product Details');
    console.log(`Total Products Found: ${products.length}`);
    console.log('-------------------------------------------');
    console.log('📦 All Products Array:');
    console.log(products);
    console.log('-------------------------------------------');
    console.table(
      products.map((p) => ({
        '#': p.index,
        ID: p.id,
        Title: p.title,
        Price: p.price,
        URL: p.url,
      })),
    );
    console.log('-------------------------------------------');
    console.log('Detailed Product Information:');
    products.forEach((product) => {
      console.groupCollapsed(`${product.index}. ${product.title}`);
      console.log('Product ID:', product.id);
      console.log('Title:', product.title);
      console.log('Price:', product.price);
      console.log('URL:', product.url);
      console.log('Image Details:', product.image);
      console.groupEnd();
    });
    console.groupEnd();

    return products;
  };

  /**
   * Initialize the search results functionality
   */
  const initSearchResults = () => {
    const loadMoreBtn = document.querySelector('[data-load-more-btn]');

    // Log initial products on page load
    setTimeout(() => {
      logProductDetails();
    }, 500);

    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', handleLoadMore);
  };

  /**
   * Handle Load More button click
   */
  const handleLoadMore = async (event) => {
    const btn = event.currentTarget;
    const productsGrid = document.querySelector('[data-search-products-grid]');
    const progressText = document.querySelector('[data-progress-text]');

    if (!productsGrid) return;

    // Get data from button attributes
    const currentPage = parseInt(btn.dataset.currentPage);
    console.log('Current page:', currentPage); //TODO: remove();
    const totalResults = parseInt(btn.dataset.totalResults);
    const productsPerPage = parseInt(btn.dataset.productsPerPage);
    console.log('Products per page:', productsPerPage); //TODO: remove();
    const searchQuery = btn.dataset.searchQuery;

    // Calculate next page
    const nextPage = currentPage + 1;
    const loadedProducts = currentPage * productsPerPage;
    console.log('Loaded products:', loadedProducts); //TODO: remove();

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
        },
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
      newProducts.forEach((product) => {
        productsGrid.appendChild(product.cloneNode(true));
      });

      // Update current page
      btn.dataset.currentPage = nextPage;

      // Update progress text
      const newLoadedProducts = nextPage * productsPerPage;
      const displayedProducts = Math.min(newLoadedProducts, totalResults);
      if (progressText) {
        progressText.textContent = `Showing ${displayedProducts} of ${totalResults} products`;
        progressText.dataset.currentCount = displayedProducts;
      }

      // Reset button state
      btn.disabled = false;
      btn.textContent = 'LOAD MORE';

      // Check if all products are loaded
      if (newLoadedProducts >= totalResults) {
        btn.style.display = 'none';
      }

      // Log updated product details after loading more
      console.log('📦 New products loaded! Updated product list:');
      logProductDetails();
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
