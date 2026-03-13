class FilterPanelUI {
  constructor(container) {
    this.container = container;
    this.filterPanel = container.querySelector('[data-filter-panel]');
    this.filterBtn = container.querySelector('[data-filter-open]');
    this.closeBtn = container.querySelector('[data-filter-close]');
    this.filterContent = container.querySelector('[data-filter-content]');
    this.sortPanel = null;

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
    this.filterBtn.addEventListener('click', () => {
      this.openPanel();
    });

    this.closeBtn.addEventListener('click', () => {
      this.closePanel();
    });

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

      const priceRange = max - min;
      const minGap = Math.max(priceRange * 0.01, 100);

      if (minVal > maxVal - minGap) {
        minSlider.value = maxVal - minGap;
      }

      if (maxVal < minVal + minGap) {
        maxSlider.value = minVal + minGap;
      }

      const currentMin = parseFloat(minSlider.value);
      const currentMax = parseFloat(maxSlider.value);

      minDisplay.value = '₹' + this.formatPrice(currentMin);
      maxDisplay.value = '₹' + this.formatPrice(currentMax);
    };

    minSlider.addEventListener('input', updateDisplay);
    maxSlider.addEventListener('input', updateDisplay);
  }

  formatPrice(price) {
    return Math.round(price).toLocaleString('en-IN');
  }

  setupSubcategoryVisibility() {
    const subcategoryGroup = this.filterPanel.querySelector('[data-subcategories-group]');
    if (!subcategoryGroup) return;

    const categoryCheckboxes = this.filterPanel.querySelectorAll('[data-filter-checkbox="categories"]');
    const subcategoryOptions = this.filterPanel.querySelectorAll('[data-parent-category]');

    const updateVisibility = () => {
      const selectedCategories = [];
      categoryCheckboxes.forEach(cb => {
        if (cb.checked) {
          const label = cb.value.toLowerCase();
          selectedCategories.push(label);
        }
      });

      subcategoryOptions.forEach(option => {
        const parentCategory = option.dataset.parentCategory;

        if (selectedCategories.length === 0) {
          option.style.display = 'none';
          const checkbox = option.querySelector('input[type="checkbox"]');
          if (checkbox && checkbox.checked) {
            checkbox.checked = false;
          }
        } else {
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

      if (selectedCategories.length === 0) {
        subcategoryGroup.style.display = 'none';
      } else {
        subcategoryGroup.style.display = '';
      }
    };

    categoryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateVisibility);
    });

    updateVisibility();
  }

  setupAreaBasedScrolling() {
    if (!this.filterPanel || !this.filterContent) return;

    this.filterPanel.addEventListener('mouseenter', () => {
      this.isMouseOverFilter = true;
    });

    this.filterPanel.addEventListener('mouseleave', () => {
      this.isMouseOverFilter = false;
    });

    document.addEventListener('wheel', (e) => {
      if (!this.isFilterOpen) return;

      if (this.isMouseOverFilter) {
        const delta = e.deltaY;
        const scrollTop = this.filterContent.scrollTop;
        const scrollHeight = this.filterContent.scrollHeight;
        const clientHeight = this.filterContent.clientHeight;

        const isAtTop = scrollTop <= 1;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

        let shouldScrollFilter = false;

        if (delta < 0) {
          if (!isAtTop) {
            shouldScrollFilter = true;
          }
        } else if (delta > 0) {
          if (!isAtBottom) {
            shouldScrollFilter = true;
          }
        }

        if (shouldScrollFilter) {
          e.preventDefault();
          e.stopPropagation();
          this.filterContent.scrollTop += delta;
        }
      }
    }, { passive: false });
  }
}

class SortPanelUI {
  constructor(container) {
    this.container = container;
    this.sortPanel = container.querySelector('[data-sort-panel]');
    this.sortBtn = container.querySelector('[data-sort-open]');
    this.closeBtn = container.querySelector('[data-sort-close]');
    this.filterPanel = null;

    if (!this.sortPanel || !this.sortBtn) return;

    this.isSortOpen = false;

    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.sortBtn.addEventListener('click', () => {
      this.openPanel();
    });

    this.closeBtn.addEventListener('click', () => {
      this.closePanel();
    });

    const sortOptions = this.sortPanel.querySelectorAll('.custom-section-product-collection-diamension__sort-option');
    sortOptions.forEach(option => {
      option.addEventListener('click', () => {
        this.closePanel();
      });
    });
  }

  openPanel() {
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

function preserveFiltersInSortLinks() {
  const currentParams = new URLSearchParams(window.location.search);

  const sortLinks = document.querySelectorAll('[data-sort-value]');

  sortLinks.forEach(link => {
    const sortValue = link.dataset.sortValue;

    const newParams = new URLSearchParams(currentParams);

    newParams.set('sort_by', sortValue);

    const baseUrl = link.href.split('?')[0];
    link.href = baseUrl + '?' + newParams.toString();
  });
}

function setupLoadMore() {
  const loadMoreBtn = document.querySelector('[data-load-more-btn]');
  const progressText = document.querySelector('[data-progress-text]');
  const productGrid = document.querySelector('[data-product-grid]');

  if (!loadMoreBtn || !productGrid || !progressText) return;

  const totalItems = parseInt(progressText.dataset.totalItems);

  function countVisibleProducts() {
    const allProducts = productGrid.querySelectorAll('.product-card-collection-diamension');
    let visibleCount = 0;
    allProducts.forEach(product => {
      if (product.style.display !== 'none') {
        visibleCount++;
      }
    });
    return visibleCount;
  }

  function updateProgressText() {
    const visibleCount = countVisibleProducts();
    progressText.textContent = `Showing ${visibleCount} of ${totalItems} products`;
  }

  function applyPriceFilterToNewProducts(newCards) {
    const urlParams = new URLSearchParams(window.location.search);
    const minFilterPrice = urlParams.get('filter.v.price.gte');
    const maxFilterPrice = urlParams.get('filter.v.price.lte');

    if (!minFilterPrice && !maxFilterPrice) return 0;

    const minPrice = minFilterPrice ? parseFloat(minFilterPrice) : 0;
    const maxPrice = maxFilterPrice ? parseFloat(maxFilterPrice) : Infinity;

    let hiddenCount = 0;
    newCards.forEach(card => {
      const productPrice = parseFloat(card.dataset.productPrice);
      if (productPrice < minPrice || productPrice > maxPrice) {
        card.style.display = 'none';
        hiddenCount++;
      }
    });
    return hiddenCount;
  }

  loadMoreBtn.addEventListener('click', async function() {
    const nextUrl = loadMoreBtn.dataset.nextUrl;
    if (!nextUrl) return;

    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = 'LOADING...';
    loadMoreBtn.style.background = '#183754';
    loadMoreBtn.style.color = '#fffaf5';
    loadMoreBtn.style.opacity = '0.6';
    loadMoreBtn.style.cursor = 'wait';

    try {
      const response = await fetch(nextUrl);
      const html = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const newProductCards = doc.querySelectorAll('[data-product-grid] .product-card-collection-diamension');

      if (newProductCards.length > 0) {
        newProductCards.forEach(card => {
          productGrid.appendChild(card.cloneNode(true));
        });

        const addedCards = Array.from(productGrid.querySelectorAll('.product-card-collection-diamension')).slice(-newProductCards.length);
        applyPriceFilterToNewProducts(addedCards);

        updateProgressText();

        if (window.WishlistManager) {
          window.WishlistManager.initializeButtons();
        }
      }

      const newLoadMoreBtn = doc.querySelector('[data-load-more-btn]');
      if (newLoadMoreBtn && newLoadMoreBtn.dataset.nextUrl) {
        loadMoreBtn.dataset.nextUrl = newLoadMoreBtn.dataset.nextUrl;
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = 'LOAD MORE';
        loadMoreBtn.style.background = 'transparent';
        loadMoreBtn.style.color = '#183754';
        loadMoreBtn.style.opacity = '1';
        loadMoreBtn.style.cursor = 'pointer';
      } else {
        loadMoreBtn.remove();
        const allLoadedMsg = document.createElement('p');
        allLoadedMsg.style.cssText = 'color: #183754; font-size: 14px; margin: 0;';
        allLoadedMsg.textContent = 'All products loaded';
        progressText.parentElement.parentElement.appendChild(allLoadedMsg);
      }

    } catch (error) {
      console.error('❌ Error loading more products:', error);
      loadMoreBtn.disabled = false;
      loadMoreBtn.textContent = 'LOAD MORE';
      loadMoreBtn.style.background = 'transparent';
      loadMoreBtn.style.color = '#183754';
      loadMoreBtn.style.opacity = '1';
      loadMoreBtn.style.cursor = 'pointer';
      alert('Failed to load more products. Please try again.');
    }
  });
}

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

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.custom-section-product-collection-diamension');

  sections.forEach(section => {
    const filterPanel = new FilterPanelUI(section);
    const sortPanel = new SortPanelUI(section);
    const wishlist = new WishlistIntegration(section);

    filterPanel.sortPanel = sortPanel;
    sortPanel.filterPanel = filterPanel;

    section.filterPanel = filterPanel;
    section.sortPanel = sortPanel;
    section.wishlist = wishlist;
  });

  preserveFiltersInSortLinks();
  setupLoadMore();
});

if (typeof MutationObserver !== 'undefined') {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.classList && node.classList.contains('product-card-collection-diamension')) {
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
