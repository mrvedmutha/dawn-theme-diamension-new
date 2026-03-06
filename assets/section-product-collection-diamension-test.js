/**
 * Product Collection Diamension - TEST VERSION (Shopify Facets Hybrid)
 * Simplified JavaScript - UI interactions only
 * Filtering logic handled by Shopify's native facets
 * Version: 2.0-test
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

  console.log('✅ Product Collection TEST (Facets Hybrid) initialized');
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
