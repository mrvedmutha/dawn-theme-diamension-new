/**
 * Product Collection Diamension (Shopify Facets Hybrid)
 * Simplified JavaScript - UI interactions only
 * Filtering logic handled by Shopify's native facets
 * Version: 2.0
 */

/**
 * Filter Panel UI Manager
 * Only handles opening/closing and UI interactions
 * Shopify handles the actual filtering via form submission
 */
class FilterPanelUI {
  constructor(container) {
    this.container = container;
    this.filterPanel = container.querySelector('[data-filter-panel]');
    this.filterBtn = container.querySelector('[data-filter-open]');
    this.closeBtn = container.querySelector('[data-filter-close]');
    this.filterContent = container.querySelector('[data-filter-content]');
    this.sortPanel = null; // Set by SortPanelUI

    if (!this.filterPanel || !this.filterBtn) return;

    this.isFilterOpen = false;
    this.isMouseOverFilter = false;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeAccordions();
    this.setupPriceSlider();
    this.setupSubcategoryVisibility();
    this.setupAreaBasedScrolling();
  }

  setupEventListeners() {
    // Open filter panel
    this.filterBtn.addEventListener('click', () => {
      this.openPanel();
    });

    // Close filter panel
    this.closeBtn.addEventListener('click', () => {
      this.closePanel();
    });

    // Prevent form submission on Enter key in price inputs
    const form = this.filterPanel.querySelector('form');
    if (form) {
      form.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.type !== 'submit') {
          e.preventDefault();
        }
      });
    }
  }

  openPanel() {
    // Close sort panel if open
    if (this.sortPanel && this.sortPanel.isSortOpen) {
      this.sortPanel.closePanel();
    }

    this.filterPanel.classList.add('is-open');
    this.isFilterOpen = true;
  }

  closePanel() {
    this.filterPanel.classList.remove('is-open');
    this.isFilterOpen = false;
  }

  /**
   * Initialize accordion functionality
   */
  initializeAccordions() {
    const accordionToggles = this.filterPanel.querySelectorAll('[data-accordion-toggle]');

    accordionToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const isCollapsed = toggle.classList.contains('is-collapsed');

        if (isCollapsed) {
          toggle.classList.remove('is-collapsed');
          content.classList.remove('is-collapsed');
        } else {
          toggle.classList.add('is-collapsed');
          content.classList.add('is-collapsed');
        }
      });
    });
  }

  /**
   * Setup price slider with live display updates
   */
  setupPriceSlider() {
    const minSlider = this.filterPanel.querySelector('[data-price-min]');
    const maxSlider = this.filterPanel.querySelector('[data-price-max]');
    const minDisplay = this.filterPanel.querySelector('[data-price-min-display]');
    const maxDisplay = this.filterPanel.querySelector('[data-price-max-display]');

    if (!minSlider || !maxSlider) return;

    const updateDisplay = () => {
      const minVal = parseFloat(minSlider.value);
      const maxVal = parseFloat(maxSlider.value);
      const min = parseFloat(minSlider.min);
      const max = parseFloat(maxSlider.max);

      // Calculate 1% of range as minimum gap
      const priceRange = max - min;
      const minGap = Math.max(priceRange * 0.01, 100);

      // Ensure min doesn't exceed max
      if (minVal > maxVal - minGap) {
        minSlider.value = maxVal - minGap;
      }

      // Ensure max doesn't go below min
      if (maxVal < minVal + minGap) {
        maxSlider.value = minVal + minGap;
      }

      // Update displays
      const currentMin = parseFloat(minSlider.value);
      const currentMax = parseFloat(maxSlider.value);

      minDisplay.value = '₹' + this.formatPrice(currentMin);
      maxDisplay.value = '₹' + this.formatPrice(currentMax);
    };

    minSlider.addEventListener('input', updateDisplay);
    maxSlider.addEventListener('input', updateDisplay);
  }

  /**
   * Format price with commas
   */
  formatPrice(price) {
    return Math.round(price).toLocaleString('en-IN');
  }

  /**
   * Setup subcategory visibility based on category selection
   * Shopify provides the data, we just show/hide based on UI logic
   */
  setupSubcategoryVisibility() {
    const subcategoryGroup = this.filterPanel.querySelector('[data-subcategories-group]');
    if (!subcategoryGroup) return;

    const categoryCheckboxes = this.filterPanel.querySelectorAll('[data-filter-checkbox="categories"]');
    const subcategoryOptions = this.filterPanel.querySelectorAll('[data-parent-category]');

    const updateVisibility = () => {
      // Get selected categories
      const selectedCategories = [];
      categoryCheckboxes.forEach(cb => {
        if (cb.checked) {
          const label = cb.value.toLowerCase();
          selectedCategories.push(label);
        }
      });

      // Show/hide subcategories based on selected parent categories
      subcategoryOptions.forEach(option => {
        const parentCategory = option.dataset.parentCategory;

        if (selectedCategories.length === 0) {
          // No categories selected - hide all subcategories
          option.style.display = 'none';
          const checkbox = option.querySelector('input[type="checkbox"]');
          if (checkbox && checkbox.checked) {
            checkbox.checked = false;
          }
        } else {
          // Check if any selected category matches (partial match)
          const shouldShow = selectedCategories.some(cat =>
            parentCategory.includes(cat) || cat.includes(parentCategory)
          );

          if (shouldShow) {
            option.style.display = '';
          } else {
            option.style.display = 'none';
            const checkbox = option.querySelector('input[type="checkbox"]');
            if (checkbox && checkbox.checked) {
              checkbox.checked = false;
            }
          }
        }
      });

      // Hide the entire sub-categories group if no categories selected
      if (selectedCategories.length === 0) {
        subcategoryGroup.style.display = 'none';
      } else {
        subcategoryGroup.style.display = '';
      }
    };

    // Listen to category checkbox changes
    categoryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateVisibility);
    });

    // Initial update
    updateVisibility();
  }

  /**
   * Setup area-based scrolling
   * Scrolls filter when mouse is over filter, scrolls page when mouse is outside
   */
  setupAreaBasedScrolling() {
    if (!this.filterPanel || !this.filterContent) return;

    // Track mouse position over filter panel
    this.filterPanel.addEventListener('mouseenter', () => {
      this.isMouseOverFilter = true;
    });

    this.filterPanel.addEventListener('mouseleave', () => {
      this.isMouseOverFilter = false;
    });

    // Handle wheel events
    document.addEventListener('wheel', (e) => {
      if (!this.isFilterOpen) return;

      // If mouse is over filter
      if (this.isMouseOverFilter) {
        const delta = e.deltaY;
        const scrollTop = this.filterContent.scrollTop;
        const scrollHeight = this.filterContent.scrollHeight;
        const clientHeight = this.filterContent.clientHeight;

        // Check if at boundaries
        const isAtTop = scrollTop <= 1;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

        let shouldScrollFilter = false;

        if (delta < 0) {
          // Scrolling up
          if (!isAtTop) {
            shouldScrollFilter = true;
          }
        } else if (delta > 0) {
          // Scrolling down
          if (!isAtBottom) {
            shouldScrollFilter = true;
          }
        }

        if (shouldScrollFilter) {
          // Prevent page scroll and manually scroll the filter
          e.preventDefault();
          e.stopPropagation();
          this.filterContent.scrollTop += delta;
        }
      }
    }, { passive: false });
  }
}

/**
 * Sort Panel UI Manager
 * Handles sort options via URL navigation (Shopify standard)
 */
class SortPanelUI {
  constructor(container) {
    this.container = container;
    this.sortPanel = container.querySelector('[data-sort-panel]');
    this.sortBtn = container.querySelector('[data-sort-open]');
    this.closeBtn = container.querySelector('[data-sort-close]');
    this.filterPanel = null; // Set by FilterPanelUI

    if (!this.sortPanel || !this.sortBtn) return;

    this.isSortOpen = false;

    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Open sort panel
    this.sortBtn.addEventListener('click', () => {
      this.openPanel();
    });

    // Close sort panel
    this.closeBtn.addEventListener('click', () => {
      this.closePanel();
    });

    // Close panel when sort option is clicked (it's a link, will navigate)
    const sortOptions = this.sortPanel.querySelectorAll('.custom-section-product-collection-diamension__sort-option');
    sortOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Panel will close when page navigates
        this.closePanel();
      });
    });
  }

  openPanel() {
    // Close filter panel if open
    if (this.filterPanel && this.filterPanel.isFilterOpen) {
      this.filterPanel.closePanel();
    }

    this.sortPanel.classList.add('is-open');
    this.isSortOpen = true;
  }

  closePanel() {
    this.sortPanel.classList.remove('is-open');
    this.isSortOpen = false;
  }
}

/**
 * Preserve Filters in Sort Links
 * Ensures sort links maintain current filter parameters
 */
function preserveFiltersInSortLinks() {
  // Get current URL parameters (filters)
  const currentParams = new URLSearchParams(window.location.search);

  // Get all sort option links
  const sortLinks = document.querySelectorAll('[data-sort-value]');

  sortLinks.forEach(link => {
    const sortValue = link.dataset.sortValue;

    // Create new URL params with current filters
    const newParams = new URLSearchParams(currentParams);

    // Update or add sort_by parameter
    newParams.set('sort_by', sortValue);

    // Update the link href to include filters + sort
    const baseUrl = link.href.split('?')[0];
    link.href = baseUrl + '?' + newParams.toString();
  });

  console.log('✅ Sort links updated to preserve filters');
}

/**
 * AJAX Load More Functionality
 * Handles progressive loading of products with filter support
 */
function setupLoadMore() {
  const loadMoreBtn = document.querySelector('[data-load-more-btn]');
  const progressText = document.querySelector('[data-progress-text]');
  const productGrid = document.querySelector('[data-product-grid]');

  if (!loadMoreBtn || !productGrid || !progressText) return;

  // Get initial values
  const totalItems = parseInt(progressText.dataset.totalItems);

  // Function to count visible products
  function countVisibleProducts() {
    const allProducts = productGrid.querySelectorAll('[data-product-price]');
    let visibleCount = 0;
    allProducts.forEach(product => {
      if (product.style.display !== 'none') {
        visibleCount++;
      }
    });
    return visibleCount;
  }

  // Function to update progress text
  function updateProgressText() {
    const visibleCount = countVisibleProducts();
    progressText.textContent = `Showing ${visibleCount} of ${totalItems} products`;
  }

  // Function to apply client-side price filter to new products
  function applyPriceFilterToNewProducts(newCards) {
    const urlParams = new URLSearchParams(window.location.search);
    const minFilterPrice = urlParams.get('filter.v.price.gte');
    const maxFilterPrice = urlParams.get('filter.v.price.lte');

    if (!minFilterPrice && !maxFilterPrice) return 0;

    const minPrice = minFilterPrice ? parseFloat(minFilterPrice) : 0;
    const maxPrice = maxFilterPrice ? parseFloat(maxFilterPrice) : Infinity;

    console.log(`\n🎯 Filtering new products: ₹${minPrice.toLocaleString('en-IN')} - ₹${maxPrice.toLocaleString('en-IN')}`);

    let hiddenCount = 0;
    newCards.forEach(card => {
      const productPrice = parseFloat(card.dataset.productPrice);
      if (productPrice < minPrice || productPrice > maxPrice) {
        card.style.display = 'none';
        hiddenCount++;
        console.log(`  ❌ Hidden: ₹${productPrice.toLocaleString('en-IN')} (outside range)`);
      } else {
        console.log(`  ✅ Visible: ₹${productPrice.toLocaleString('en-IN')}`);
      }
    });
    return hiddenCount;
  }

  loadMoreBtn.addEventListener('click', async function() {
    const nextUrl = loadMoreBtn.dataset.nextUrl;
    if (!nextUrl) return;

    // Set button to loading state (filled + disabled)
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = 'LOADING...';
    loadMoreBtn.style.background = '#183754';
    loadMoreBtn.style.color = '#fffaf5';
    loadMoreBtn.style.opacity = '0.6';
    loadMoreBtn.style.cursor = 'wait';

    try {
      console.log('🔄 Loading more products from:', nextUrl);

      // Fetch next page
      const response = await fetch(nextUrl);
      const html = await response.text();

      // Parse HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Extract product cards
      const newProductCards = doc.querySelectorAll('[data-product-grid] .product-card-collection-diamension');
      console.log(`  ✅ Found ${newProductCards.length} new products`);

      if (newProductCards.length > 0) {
        // Append new products to grid
        newProductCards.forEach(card => {
          productGrid.appendChild(card.cloneNode(true));
        });

        // Apply price filter to new products
        const addedCards = Array.from(productGrid.querySelectorAll('[data-product-price]')).slice(-newProductCards.length);
        applyPriceFilterToNewProducts(addedCards);

        // Update progress text
        updateProgressText();

        // Reinitialize wishlist buttons for new products
        if (window.WishlistManager) {
          window.WishlistManager.initializeButtons();
        }
      }

      // Check for next page button in loaded content
      const newLoadMoreBtn = doc.querySelector('[data-load-more-btn]');
      if (newLoadMoreBtn && newLoadMoreBtn.dataset.nextUrl) {
        // Update next URL and restore button to outline state
        loadMoreBtn.dataset.nextUrl = newLoadMoreBtn.dataset.nextUrl;
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = 'LOAD MORE';
        loadMoreBtn.style.background = 'transparent';
        loadMoreBtn.style.color = '#183754';
        loadMoreBtn.style.opacity = '1';
        loadMoreBtn.style.cursor = 'pointer';
      } else {
        // No more pages
        loadMoreBtn.remove();
        const allLoadedMsg = document.createElement('p');
        allLoadedMsg.style.cssText = 'color: #183754; font-size: 14px; margin: 0;';
        allLoadedMsg.textContent = 'All products loaded';
        progressText.parentElement.parentElement.appendChild(allLoadedMsg);
        console.log('  ℹ️ All products loaded');
      }

    } catch (error) {
      console.error('❌ Error loading more products:', error);
      // Restore button to outline state on error
      loadMoreBtn.disabled = false;
      loadMoreBtn.textContent = 'LOAD MORE';
      loadMoreBtn.style.background = 'transparent';
      loadMoreBtn.style.color = '#183754';
      loadMoreBtn.style.opacity = '1';
      loadMoreBtn.style.cursor = 'pointer';
      alert('Failed to load more products. Please try again.');
    }
  });

  console.log('✅ Load More functionality initialized');
}

/**
 * Wishlist Integration
 * Keeps existing wishlist functionality
 */
class WishlistIntegration {
  constructor(container) {
    this.container = container;
    this.init();
  }

  init() {
    if (window.WishlistManager) {
      window.WishlistManager.initializeButtons();
    }
  }

  reinitialize() {
    if (window.WishlistManager) {
      window.WishlistManager.initializeButtons();
    }
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.custom-section-product-collection-diamension');

  sections.forEach(section => {
    // Initialize UI managers
    const filterPanel = new FilterPanelUI(section);
    const sortPanel = new SortPanelUI(section);
    const wishlist = new WishlistIntegration(section);

    // Cross-reference panels
    filterPanel.sortPanel = sortPanel;
    sortPanel.filterPanel = filterPanel;

    // Store references
    section.filterPanel = filterPanel;
    section.sortPanel = sortPanel;
    section.wishlist = wishlist;
  });

  // Initialize additional functionality
  preserveFiltersInSortLinks();
  setupLoadMore();

  console.log('✅ Product Collection (Facets Hybrid) initialized');
  console.log('ℹ️ Filtering handled by Shopify facets, UI interactions handled by JavaScript');
});

// Reinitialize wishlist when page content changes (for AJAX loaded content)
if (typeof MutationObserver !== 'undefined') {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.classList && node.classList.contains('product-card-collection-diamension')) {
            // Reinitialize wishlist for new product cards
            if (window.WishlistManager) {
              window.WishlistManager.initializeButtons();
            }
          }
        });
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const productGrids = document.querySelectorAll('[data-product-grid]');
    productGrids.forEach(grid => {
      observer.observe(grid, { childList: true });
    });
  });
}
