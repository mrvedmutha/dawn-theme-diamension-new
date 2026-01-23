/**
 * Product Collection Diamension - JavaScript
 * Handles AJAX loading, wishlist, and dynamic grid behavior
 */

class CollectionDiamension {
  constructor(container) {
    this.container = container;
    this.sectionId = container.dataset.sectionId;
    this.productGrid = container.querySelector('[data-product-grid]');
    this.loadMoreBtn = container.querySelector('[data-load-more]');
    this.progressText = container.querySelector('[data-progress-text]');

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initWishlist();
  }

  setupEventListeners() {
    if (this.loadMoreBtn) {
      this.loadMoreBtn.addEventListener('click', this.loadMoreProducts.bind(this));
    }
  }

  /**
   * Load more products via AJAX
   */
  loadMoreProducts() {
    const nextUrl = this.loadMoreBtn.dataset.nextUrl;
    if (!nextUrl) return;

    this.loadMoreBtn.disabled = true;
    this.loadMoreBtn.textContent = 'LOADING...';

    fetch(nextUrl)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Get new products
        const newProducts = doc.querySelectorAll('[data-product-grid] > *');
        newProducts.forEach(product => {
          this.productGrid.appendChild(product.cloneNode(true));
        });

        // Update progress
        const newProgressText = doc.querySelector('[data-progress-text]');
        if (newProgressText && this.progressText) {
          this.progressText.textContent = newProgressText.textContent;
        }

        // Update next URL or hide button
        const newLoadMoreBtn = doc.querySelector('[data-load-more]');
        if (newLoadMoreBtn && newLoadMoreBtn.dataset.nextUrl) {
          this.loadMoreBtn.dataset.nextUrl = newLoadMoreBtn.dataset.nextUrl;
          this.loadMoreBtn.disabled = false;
          this.loadMoreBtn.textContent = 'LOAD MORE';
        } else {
          this.loadMoreBtn.style.display = 'none';
        }

        // Reinitialize wishlist for new products
        this.initWishlist();
      })
      .catch(error => {
        console.error('Error loading products:', error);
        this.loadMoreBtn.disabled = false;
        this.loadMoreBtn.textContent = 'LOAD MORE';
      });
  }

  /**
   * Initialize wishlist functionality
   */
  initWishlist() {
    const wishlistButtons = this.container.querySelectorAll('[data-wishlist-toggle]');

    wishlistButtons.forEach(btn => {
      // Remove existing listeners by cloning
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      const productId = newBtn.dataset.productId;

      // Check if in wishlist
      if (this.isInWishlist(productId)) {
        newBtn.classList.add('is-active');
      }

      // Add click handler
      newBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleWishlist(newBtn, productId);
      });
    });
  }

  /**
   * Toggle product in wishlist
   */
  toggleWishlist(btn, productId) {
    const wishlist = this.getWishlist();
    const index = wishlist.indexOf(productId);

    if (index > -1) {
      // Remove from wishlist
      wishlist.splice(index, 1);
      btn.classList.remove('is-active');
    } else {
      // Add to wishlist
      wishlist.push(productId);
      btn.classList.add('is-active');
    }

    this.saveWishlist(wishlist);
    this.animateWishlist(btn);
  }

  /**
   * Get wishlist from localStorage
   */
  getWishlist() {
    const stored = localStorage.getItem('diamension_wishlist');
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Save wishlist to localStorage
   */
  saveWishlist(wishlist) {
    localStorage.setItem('diamension_wishlist', JSON.stringify(wishlist));
  }

  /**
   * Check if product is in wishlist
   */
  isInWishlist(productId) {
    const wishlist = this.getWishlist();
    return wishlist.includes(productId);
  }

  /**
   * Animate wishlist button
   */
  animateWishlist(btn) {
    btn.style.transform = 'scale(0.85)';
    btn.style.transition = 'transform 0.15s ease';

    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 150);
  }
}

/**
 * Sort Panel Manager
 */
class SortPanelDiamension {
  constructor(container) {
    this.container = container;
    this.sortPanel = container.querySelector('[data-sort-panel]');
    this.sortBtn = container.querySelector('.custom-section-product-collection-diamension__sort-btn');
    this.closeBtn = container.querySelector('[data-sort-close]');
    this.sortOptions = container.querySelectorAll('[data-sort-option]');
    this.productGrid = container.querySelector('[data-product-grid]');
    this.noProductsMessage = container.querySelector('[data-no-products]');
    this.progressText = container.querySelector('[data-progress-text]');
    this.loadMoreSection = container.querySelector('.custom-section-product-collection-diamension__load-more');

    if (!this.sortPanel || !this.sortBtn) return;

    this.currentSort = 'featured';
    this.isSortOpen = false;
    this.sortActive = false;
    this.filterPanel = null; // Will be set by FilterPanelDiamension
    this.dynamicProducts = []; // Track dynamically created product cards

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateActiveOption();
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

    // Sort option click
    this.sortOptions.forEach(option => {
      option.addEventListener('click', () => {
        const sortType = option.dataset.sortOption;
        this.applySort(sortType);
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

  applySort(sortType) {
    this.currentSort = sortType;
    this.sortActive = sortType !== 'featured';
    this.updateActiveOption();
    this.sortProducts(sortType);
  }

  updateActiveOption() {
    this.sortOptions.forEach(option => {
      if (option.dataset.sortOption === this.currentSort) {
        option.classList.add('is-active');
      } else {
        option.classList.remove('is-active');
      }
    });
  }

  sortProducts(sortType) {
    if (!this.filterPanel || !this.filterPanel.allProductsLoaded) {
      console.warn('Filter panel or product data not available');
      return;
    }

    // If "featured" is selected, restore default state
    if (sortType === 'featured') {
      this.restoreDefaultState();
      return;
    }

    // Get all products data
    let productsToSort = [...this.filterPanel.allProductsData];

    // Apply any active filters first
    if (this.filterPanel.filtersActive) {
      productsToSort = this.filterPanel.getFilteredProducts();
    }

    // Sort the products
    switch (sortType) {
      case 'best-selling':
        // For best-selling, sort by product ID (newest first) as fallback
        productsToSort.sort((a, b) => {
          const idA = parseInt(a.id);
          const idB = parseInt(b.id);
          return idB - idA;
        });
        break;

      case 'price-low-high':
        productsToSort.sort((a, b) => {
          return parseFloat(a.price) - parseFloat(b.price);
        });
        break;

      case 'price-high-low':
        productsToSort.sort((a, b) => {
          return parseFloat(b.price) - parseFloat(a.price);
        });
        break;
    }

    // Clear existing dynamic products
    this.dynamicProducts.forEach(card => {
      if (card.parentNode) {
        card.parentNode.removeChild(card);
      }
    });
    this.dynamicProducts = [];

    // Hide original DOM products
    this.filterPanel.products.forEach(product => {
      product.element.style.display = 'none';
    });

    // Hide image cards
    this.filterPanel.imageCards.forEach(card => {
      card.element.style.display = 'none';
    });

    // Clear grid and create sorted product cards
    const existingCards = this.productGrid.querySelectorAll('.product-card-collection-diamension[data-dynamic="true"]');
    existingCards.forEach(card => card.remove());

    productsToSort.forEach(product => {
      const card = this.filterPanel.createProductCard(product);
      this.productGrid.appendChild(card);
      this.dynamicProducts.push(card);
    });

    // Reinitialize wishlist for new products
    if (this.container.collectionDiamension) {
      this.container.collectionDiamension.initWishlist();
    }

    // Update UI
    this.updateSortedUI(productsToSort.length);

    console.log(`Products sorted by: ${sortType}, showing ${productsToSort.length} products`);
  }

  restoreDefaultState() {
    // Remove dynamic products
    this.dynamicProducts.forEach(card => {
      if (card.parentNode) {
        card.parentNode.removeChild(card);
      }
    });
    this.dynamicProducts = [];

    // If filters are active, let filter handle the display
    if (this.filterPanel.filtersActive) {
      this.filterPanel.applyFilters();
      return;
    }

    // Otherwise, show all original DOM products
    this.filterPanel.products.forEach(product => {
      product.element.style.display = '';
    });

    // Show image cards
    this.filterPanel.imageCards.forEach(card => {
      card.element.style.display = '';
    });

    // Reinitialize wishlist for original products
    if (this.container.collectionDiamension) {
      this.container.collectionDiamension.initWishlist();
    }

    // Restore original UI
    const totalCount = this.filterPanel.allProductsLoaded ? this.filterPanel.allProductsData.length : this.filterPanel.totalProducts;

    if (this.progressText) {
      const currentOffset = parseInt(this.progressText.dataset.currentOffset || 0);
      const pageSize = parseInt(this.progressText.dataset.pageSize || 20);
      const totalItems = parseInt(this.progressText.dataset.totalItems || totalCount);
      this.progressText.textContent = `Showing ${Math.min(currentOffset + pageSize, totalItems)} of ${totalItems} products`;
    }

    if (this.noProductsMessage) {
      this.noProductsMessage.style.display = 'none';
    }

    if (this.productGrid) {
      this.productGrid.style.display = '';
    }

    if (this.loadMoreSection) {
      this.loadMoreSection.style.display = '';
    }

    this.sortActive = false;
  }

  updateSortedUI(visibleCount) {
    const totalCount = this.filterPanel.allProductsLoaded ? this.filterPanel.allProductsData.length : this.filterPanel.totalProducts;

    // Update progress text
    if (this.progressText) {
      this.progressText.textContent = `Showing ${visibleCount} of ${totalCount} products`;
    }

    // Show/hide no products message
    if (this.noProductsMessage) {
      if (visibleCount === 0) {
        this.noProductsMessage.style.display = 'block';
        this.productGrid.style.display = 'none';
      } else {
        this.noProductsMessage.style.display = 'none';
        this.productGrid.style.display = '';
      }
    }

    // Hide load more when sorting
    if (this.loadMoreSection) {
      this.loadMoreSection.style.display = 'none';
    }
  }

  // Method to re-apply current sort (called after filtering)
  reapplySort() {
    if (this.sortActive && this.currentSort !== 'featured') {
      this.sortProducts(this.currentSort);
    }
  }
}

/**
 * Filter Panel Manager
 */
class FilterPanelDiamension {
  constructor(container) {
    this.container = container;
    this.filterPanel = container.querySelector('[data-filter-panel]');
    this.filterBtn = container.querySelector('.custom-section-product-collection-diamension__filter-btn');
    this.closeBtn = container.querySelector('[data-filter-close]');
    this.applyBtn = container.querySelector('[data-filter-apply]');
    this.clearBtn = container.querySelector('[data-filter-clear]');
    this.productGrid = container.querySelector('[data-product-grid]');
    this.filterContent = container.querySelector('[data-filter-content]');
    this.progressText = container.querySelector('[data-progress-text]');
    this.loadMoreSection = container.querySelector('.custom-section-product-collection-diamension__load-more');
    this.noProductsMessage = container.querySelector('[data-no-products]');

    if (!this.filterPanel || !this.filterBtn) return;

    // Get collection handle and price range
    this.collectionHandle = container.dataset.collectionHandle;
    this.actualMinPrice = parseFloat(container.dataset.collectionMinPrice) || 0;
    this.actualMaxPrice = parseFloat(container.dataset.collectionMaxPrice) || 0;

    this.products = []; // Products currently in DOM
    this.allProductsData = []; // Complete product metadata from collection
    this.imageCards = [];
    this.totalProducts = 0;
    this.allProductsLoaded = false;
    this.dynamicProducts = []; // Track dynamically created product cards

    this.filters = {
      style: [],
      collections: [],
      shape: [],
      categories: [],
      priceMin: this.actualMinPrice,
      priceMax: this.actualMaxPrice
    };

    this.isMouseOverFilter = false;
    this.isFilterOpen = false;
    this.filtersActive = false;
    this.sortPanel = null; // Will be set during initialization

    this.init();
  }

  async init() {
    this.collectProductData();
    await this.fetchAllProductsData();
    this.setupEventListeners();
    this.initializeAccordions();
    this.initializePriceSlider();
    this.updateCheckboxStates();
    this.setupAreaBasedScrolling();
  }

  /**
   * Fetch ALL products metadata from collection via AJAX
   */
  async fetchAllProductsData() {
    if (!this.collectionHandle) return;

    try {
      const response = await fetch(`/collections/${this.collectionHandle}/products.json?limit=250`);
      const data = await response.json();

      this.allProductsData = data.products.map(product => ({
        id: product.id.toString(),
        title: product.title || '',
        price: parseFloat(product.variants[0]?.price || 0),
        tags: (product.tags || []).map(tag => tag.trim().toLowerCase()),
        type: (product.type || '').toLowerCase().trim(),
        url: product.url || '',
        image: product.images[0]?.src || '',
        inDOM: false // Track if product card is already in DOM
      }));

      // Mark products that are already in DOM
      this.products.forEach(domProduct => {
        const match = this.allProductsData.find(p => p.id === domProduct.id);
        if (match) match.inDOM = true;
      });

      this.allProductsLoaded = true;
      console.log(`Loaded ${this.allProductsData.length} products from collection`);
    } catch (error) {
      console.error('Error fetching all products:', error);
    }
  }

  /**
   * Collect all product data (tags, types, prices) and image cards
   */
  collectProductData() {
    const productCards = this.productGrid.querySelectorAll('.product-card-collection-diamension');
    const imageCardElements = this.productGrid.querySelectorAll('.image-card-collection-diamension');

    productCards.forEach(card => {
      const productId = card.dataset.productId || '';
      const tagsAttr = card.dataset.productTags || '';
      const productType = card.dataset.productType || '';
      const priceAttr = card.dataset.productPrice || '0';

      // Parse tags (comma-separated, case-insensitive)
      const tags = tagsAttr.split(',').map(tag => tag.trim().toLowerCase()).filter(t => t);
      const price = parseFloat(priceAttr);

      this.products.push({
        element: card,
        id: productId,
        tags: tags,
        type: productType.toLowerCase().trim(),
        price: price,
        visible: true
      });
    });

    // Collect image cards
    imageCardElements.forEach(card => {
      this.imageCards.push({
        element: card,
        visible: true
      });
    });

    this.totalProducts = this.products.length;

    console.log(`Products in DOM: ${this.totalProducts}, Price range: ₹${this.actualMinPrice} - ₹${this.actualMaxPrice}`);
  }

  /**
   * Update checkbox states (enable/disable based on available products)
   */
  updateCheckboxStates() {
    const checkboxes = this.filterPanel.querySelectorAll('[data-filter-checkbox]');

    checkboxes.forEach(checkbox => {
      const category = checkbox.dataset.filterCheckbox;
      const value = checkbox.value.toLowerCase().trim();

      let hasMatch = false;

      if (category === 'categories') {
        // Check product.type
        hasMatch = this.products.some(product => product.type === value);
      } else {
        // Check tags
        hasMatch = this.products.some(product => product.tags.includes(value));
      }

      checkbox.disabled = !hasMatch;
    });
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Open filter panel
    this.filterBtn.addEventListener('click', () => {
      this.openPanel();
    });

    // Close filter panel
    this.closeBtn.addEventListener('click', () => {
      this.closePanel();
    });

    // Apply filters
    this.applyBtn.addEventListener('click', () => {
      this.applyFilters();
      this.closePanel();
    });

    // Clear filters
    this.clearBtn.addEventListener('click', () => {
      this.clearFilters();
    });

    // Checkbox changes
    const checkboxes = this.filterPanel.querySelectorAll('[data-filter-checkbox]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        this.handleCheckboxChange(e.target);
      });
    });
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
   * Initialize price slider with dynamic min/max from collection
   */
  initializePriceSlider() {
    const minSlider = this.filterPanel.querySelector('[data-price-min]');
    const maxSlider = this.filterPanel.querySelector('[data-price-max]');
    const minDisplay = this.filterPanel.querySelector('[data-price-min-display]');
    const maxDisplay = this.filterPanel.querySelector('[data-price-max-display]');

    if (!minSlider || !maxSlider) return;

    // Set slider attributes to actual price range
    minSlider.setAttribute('min', this.actualMinPrice);
    minSlider.setAttribute('max', this.actualMaxPrice);
    minSlider.value = this.actualMinPrice;

    maxSlider.setAttribute('min', this.actualMinPrice);
    maxSlider.setAttribute('max', this.actualMaxPrice);
    maxSlider.value = this.actualMaxPrice;

    // Set initial display values
    minDisplay.value = '₹' + this.formatPrice(this.actualMinPrice);
    maxDisplay.value = '₹' + this.formatPrice(this.actualMaxPrice);

    const updateDisplay = () => {
      const minVal = parseFloat(minSlider.value);
      const maxVal = parseFloat(maxSlider.value);

      // Calculate 1% of range as minimum gap
      const priceRange = this.actualMaxPrice - this.actualMinPrice;
      const minGap = Math.max(priceRange * 0.01, 100);

      // Ensure min doesn't exceed max
      if (minVal > maxVal - minGap) {
        minSlider.value = maxVal - minGap;
      }

      // Ensure max doesn't go below min
      if (maxVal < minVal + minGap) {
        maxSlider.value = minVal + minGap;
      }

      this.filters.priceMin = parseFloat(minSlider.value);
      this.filters.priceMax = parseFloat(maxSlider.value);

      minDisplay.value = '₹' + this.formatPrice(this.filters.priceMin);
      maxDisplay.value = '₹' + this.formatPrice(this.filters.priceMax);
    };

    minSlider.addEventListener('input', updateDisplay);
    maxSlider.addEventListener('input', updateDisplay);
  }

  /**
   * Format price with commas
   */
  formatPrice(price) {
    return price.toLocaleString('en-IN');
  }

  /**
   * Handle checkbox change
   */
  handleCheckboxChange(checkbox) {
    const category = checkbox.dataset.filterCheckbox;
    const value = checkbox.value.toLowerCase().trim();

    if (checkbox.checked) {
      if (!this.filters[category].includes(value)) {
        this.filters[category].push(value);
      }
    } else {
      this.filters[category] = this.filters[category].filter(v => v !== value);
    }
  }

  /**
   * Create product card HTML dynamically
   */
  createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card-collection-diamension';
    card.dataset.productId = product.id;
    card.dataset.productTags = product.tags.join(',');
    card.dataset.productType = product.type;
    card.dataset.productPrice = product.price;
    card.dataset.dynamic = 'true'; // Mark as dynamically created

    const formattedPrice = '₹' + this.formatPrice(product.price);

    card.innerHTML = `
      <a href="${product.url}" class="product-card-collection-diamension__link">
        <div class="product-card-collection-diamension__image-wrapper">
          ${product.image ? `
            <img
              src="${product.image}"
              alt="${product.title}"
              loading="lazy"
              class="product-card-collection-diamension__image"
            >
          ` : `
            <div class="product-card-collection-diamension__image-placeholder"></div>
          `}
        </div>
        <div class="product-card-collection-diamension__info">
          <h3 class="product-card-collection-diamension__title">${product.title}</h3>
          <p class="product-card-collection-diamension__price">From ${formattedPrice}</p>
        </div>
      </a>
      <button
        class="product-card-collection-diamension__wishlist"
        data-wishlist-toggle
        data-product-id="${product.id}"
        aria-label="Add to wishlist"
        type="button"
      >
        <svg width="24" height="24" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-card-collection-diamension__wishlist-icon">
          <g clip-path="url(#clip0_12_4822)">
            <mask id="mask0_12_4822" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="19" height="19">
              <path d="M18.7554 0H0V18.7554H18.7554V0Z" fill="white"/>
            </mask>
            <g mask="url(#mask0_12_4822)">
              <path d="M16.0901 3.88421C16.7778 4.65787 17.192 5.67378 17.192 6.79129C17.192 12.2616 12.128 15.4891 9.86175 16.2706C9.59605 16.3643 9.15842 16.3643 8.89272 16.2706C6.62645 15.4891 1.5625 12.2616 1.5625 6.79129C1.5625 4.37654 3.50837 2.42285 5.90749 2.42285C7.32978 2.42285 8.58795 3.11055 9.37724 4.17335C10.1665 3.11055 11.4325 2.42285 12.847 2.42285" stroke="#183754" stroke-width="1.25036" stroke-linecap="round" stroke-linejoin="round" class="product-card-collection-diamension__wishlist-path"/>
            </g>
          </g>
          <defs>
            <clipPath id="clip0_12_4822">
              <rect width="18.7554" height="18.7554" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </button>
    `;

    return card;
  }

  /**
   * Get filtered products without rendering (for use by sort panel)
   */
  getFilteredProducts() {
    const matchingProducts = [];

    this.allProductsData.forEach(product => {
      let matches = true;

      // Style filter (tags)
      if (this.filters.style.length > 0) {
        const hasStyle = this.filters.style.some(style => product.tags.includes(style));
        if (!hasStyle) matches = false;
      }

      // Collections filter (tags)
      if (this.filters.collections.length > 0) {
        const hasCollection = this.filters.collections.some(collection =>
          product.tags.includes(collection)
        );
        if (!hasCollection) matches = false;
      }

      // Shape filter (tags)
      if (this.filters.shape.length > 0) {
        const hasShape = this.filters.shape.some(shape => product.tags.includes(shape));
        if (!hasShape) matches = false;
      }

      // Categories filter (product.type)
      if (this.filters.categories.length > 0) {
        const hasCategory = this.filters.categories.includes(product.type);
        if (!hasCategory) matches = false;
      }

      // Price filter
      const productPrice = parseFloat(product.price);
      const filterMin = parseFloat(this.filters.priceMin);
      const filterMax = parseFloat(this.filters.priceMax);

      if (!isNaN(productPrice) && !isNaN(filterMin) && !isNaN(filterMax)) {
        if (productPrice < filterMin || productPrice > filterMax) {
          matches = false;
        }
      }

      if (matches) {
        matchingProducts.push(product);
      }
    });

    return matchingProducts;
  }

  /**
   * Apply filters - uses complete product dataset
   */
  applyFilters() {
    if (!this.allProductsLoaded) {
      console.warn('All products not loaded yet');
      return;
    }

    // Remove previously created dynamic product cards
    this.dynamicProducts.forEach(card => {
      if (card.parentNode) {
        card.parentNode.removeChild(card);
      }
    });
    this.dynamicProducts = [];

    let totalMatchingProducts = 0;
    const matchingProducts = [];

    // Check if any filters are active
    this.filtersActive =
      this.filters.style.length > 0 ||
      this.filters.collections.length > 0 ||
      this.filters.shape.length > 0 ||
      this.filters.categories.length > 0 ||
      this.filters.priceMin > this.actualMinPrice ||
      this.filters.priceMax < this.actualMaxPrice;

    // If sorting is active, let sort panel handle rendering
    if (this.sortPanel && this.sortPanel.sortActive) {
      this.sortPanel.reapplySort();
      return;
    }

    // Filter the complete dataset
    this.allProductsData.forEach(product => {
      let matches = true;

      // Style filter (tags)
      if (this.filters.style.length > 0) {
        const hasStyle = this.filters.style.some(style => product.tags.includes(style));
        if (!hasStyle) matches = false;
      }

      // Collections filter (tags)
      if (this.filters.collections.length > 0) {
        const hasCollection = this.filters.collections.some(collection =>
          product.tags.includes(collection)
        );
        if (!hasCollection) matches = false;
      }

      // Shape filter (tags)
      if (this.filters.shape.length > 0) {
        const hasShape = this.filters.shape.some(shape => product.tags.includes(shape));
        if (!hasShape) matches = false;
      }

      // Categories filter (product.type)
      if (this.filters.categories.length > 0) {
        const hasCategory = this.filters.categories.includes(product.type);
        if (!hasCategory) matches = false;
      }

      // Price filter
      const productPrice = parseFloat(product.price);
      const filterMin = parseFloat(this.filters.priceMin);
      const filterMax = parseFloat(this.filters.priceMax);

      if (!isNaN(productPrice) && !isNaN(filterMin) && !isNaN(filterMax)) {
        if (productPrice < filterMin || productPrice > filterMax) {
          matches = false;
        }
      }

      // If product matches filters
      if (matches) {
        totalMatchingProducts++;
        matchingProducts.push(product);

        // If product is in DOM, show it
        if (product.inDOM) {
          const domProduct = this.products.find(p => p.id === product.id);
          if (domProduct) {
            domProduct.element.style.display = '';
          }
        }
      } else {
        // Hide if in DOM
        if (product.inDOM) {
          const domProduct = this.products.find(p => p.id === product.id);
          if (domProduct) {
            domProduct.element.style.display = 'none';
          }
        }
      }
    });

    // Create cards for matching products not in DOM
    matchingProducts.forEach(product => {
      if (!product.inDOM) {
        const card = this.createProductCard(product);
        this.productGrid.appendChild(card);
        this.dynamicProducts.push(card);
      }
    });

    // Reinitialize wishlist for new products
    if (this.container.collectionDiamension) {
      this.container.collectionDiamension.initWishlist();
    }

    console.log(`Matching products: ${totalMatchingProducts} (${this.dynamicProducts.length} loaded dynamically)`);

    // Update UI based on total matching products
    this.updateFilteredUI(totalMatchingProducts);
  }

  /**
   * Update UI elements based on filtered product count
   */
  updateFilteredUI(visibleCount) {
    // Get total products count
    const totalCount = this.allProductsLoaded ? this.allProductsData.length : this.totalProducts;

    // Update progress text
    if (this.progressText) {
      if (this.filtersActive) {
        this.progressText.textContent = `Showing ${visibleCount} of ${totalCount} products`;
      } else {
        // Restore original text - will be updated by pagination
        const currentOffset = parseInt(this.progressText.dataset.currentOffset || 0);
        const pageSize = parseInt(this.progressText.dataset.pageSize || 20);
        const totalItems = parseInt(this.progressText.dataset.totalItems || totalCount);
        this.progressText.textContent = `Showing ${Math.min(currentOffset + pageSize, totalItems)} of ${totalItems} products`;
      }
    }

    // Show/hide no products message
    if (this.noProductsMessage) {
      if (visibleCount === 0 && this.filtersActive) {
        this.noProductsMessage.style.display = 'block';
        this.productGrid.style.display = 'none';
      } else {
        this.noProductsMessage.style.display = 'none';
        this.productGrid.style.display = '';
      }
    }

    // Hide/show image cards based on visible product count and filter state
    // Image cards should only show when filters are NOT active
    this.imageCards.forEach(card => {
      if (this.filtersActive) {
        card.element.style.display = 'none';
      } else {
        card.element.style.display = '';
      }
    });

    // Hide/show load more section when filtering
    if (this.loadMoreSection) {
      if (this.filtersActive) {
        this.loadMoreSection.style.display = 'none';
      } else {
        this.loadMoreSection.style.display = '';
      }
    }
  }

  /**
   * Clear all filters
   */
  clearFilters() {
    // Remove dynamic product cards
    this.dynamicProducts.forEach(card => {
      if (card.parentNode) {
        card.parentNode.removeChild(card);
      }
    });
    this.dynamicProducts = [];

    // Reset filter state to actual collection min/max
    this.filters = {
      style: [],
      collections: [],
      shape: [],
      categories: [],
      priceMin: this.actualMinPrice,
      priceMax: this.actualMaxPrice
    };

    this.filtersActive = false;

    // Uncheck all checkboxes
    const checkboxes = this.filterPanel.querySelectorAll('[data-filter-checkbox]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });

    // Reset price sliders to actual collection range
    const minSlider = this.filterPanel.querySelector('[data-price-min]');
    const maxSlider = this.filterPanel.querySelector('[data-price-max]');
    const minDisplay = this.filterPanel.querySelector('[data-price-min-display]');
    const maxDisplay = this.filterPanel.querySelector('[data-price-max-display]');

    if (minSlider && maxSlider) {
      minSlider.value = this.actualMinPrice;
      maxSlider.value = this.actualMaxPrice;
      minDisplay.value = '₹' + this.formatPrice(this.actualMinPrice);
      maxDisplay.value = '₹' + this.formatPrice(this.actualMaxPrice);
    }

    // Show all products currently in DOM
    this.products.forEach(product => {
      product.visible = true;
      product.element.style.display = '';
    });

    // Reinitialize wishlist after clearing
    if (this.container.collectionDiamension) {
      this.container.collectionDiamension.initWishlist();
    }

    // Reset UI to default state
    const totalCount = this.allProductsLoaded ? this.allProductsData.length : this.totalProducts;
    this.updateFilteredUI(totalCount);

    // Re-apply current sort after clearing filters
    if (this.sortPanel) {
      this.sortPanel.reapplySort();
    }
  }

  /**
   * Open filter panel
   */
  openPanel() {
    // Close sort panel if open
    if (this.sortPanel && this.sortPanel.isSortOpen) {
      this.sortPanel.closePanel();
    }

    this.filterPanel.classList.add('is-open');
    this.isFilterOpen = true;
  }

  /**
   * Close filter panel
   */
  closePanel() {
    this.filterPanel.classList.remove('is-open');
    this.isFilterOpen = false;
  }

  /**
   * Setup area-based scrolling
   * Scrolls filter when mouse is over filter, scrolls page when mouse is outside
   * When filter reaches scroll boundary, allows page to scroll
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

        // Check if at boundaries (with 1px tolerance)
        const isAtTop = scrollTop <= 1;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

        // Determine if we should scroll the filter or allow page scroll
        let shouldScrollFilter = false;

        if (delta < 0) {
          // Scrolling up
          if (!isAtTop) {
            // Filter has room to scroll up
            shouldScrollFilter = true;
          }
          // If at top, allow page scroll
        } else if (delta > 0) {
          // Scrolling down
          if (!isAtBottom) {
            // Filter has room to scroll down
            shouldScrollFilter = true;
          }
          // If at bottom, allow page scroll
        }

        if (shouldScrollFilter) {
          // Prevent page scroll and manually scroll the filter
          e.preventDefault();
          e.stopPropagation();
          this.filterContent.scrollTop += delta;
        }
        // If not scrolling filter, page will scroll naturally
      }
      // If mouse is outside filter, allow normal page scroll (do nothing)
    }, { passive: false });

    // Handle touch events for mobile
    let touchStartY = 0;

    this.filterContent.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    this.filterContent.addEventListener('touchmove', (e) => {
      if (!this.isFilterOpen) return;

      const touchY = e.touches[0].clientY;
      const touchDelta = touchStartY - touchY;
      const scrollTop = this.filterContent.scrollTop;
      const scrollHeight = this.filterContent.scrollHeight;
      const clientHeight = this.filterContent.clientHeight;

      const isAtTop = scrollTop <= 1;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      // Only prevent default if we're at boundary and trying to scroll beyond
      if ((touchDelta < 0 && isAtTop) || (touchDelta > 0 && isAtBottom)) {
        e.preventDefault();
      }
    }, { passive: false });
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.custom-section-product-collection-diamension');
  sections.forEach(section => {
    const collectionDiamension = new CollectionDiamension(section);

    // Initialize sort and filter panels and link them
    const sortPanel = new SortPanelDiamension(section);
    const filterPanel = new FilterPanelDiamension(section);

    // Store reference to CollectionDiamension for wishlist re-initialization
    section.collectionDiamension = collectionDiamension;

    // Cross-reference between panels
    sortPanel.filterPanel = filterPanel;
    filterPanel.sortPanel = sortPanel;
  });
});
