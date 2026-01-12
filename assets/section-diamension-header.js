/**
 * Diamension Header - Scroll Behavior
 * Handles transparent to solid transition on scroll
 */

class DiamensionHeader {
  constructor() {
    this.header = document.querySelector('[data-header]');
    this.behavior = this.header?.dataset.headerBehavior || 'auto'; // 'auto', 'solid'
    this.hamburger = document.querySelector('[data-hamburger]');
    this.mobileMenu = document.querySelector('[data-mobile-menu]');
    this.scrollThreshold = 820;
    this.lastScrollPosition = 0;
    this.isScrolled = false;
    this.isMenuOpen = false;

    // Transparent sticky header (separate instance)
    this.transparentSticky = document.querySelector('[data-transparent-sticky]');
    this.stickyHamburger = document.querySelector('[data-hamburger-sticky]');

    if (this.header) {
      this.init();
    }
  }

  init() {
    this.setInitialState();
    this.handleScroll();
    this.attachEventListeners();
    this.updateCartCount();
    this.initNavigationUnderlines();
  }

  attachEventListeners() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Update cart count when cart changes
    document.addEventListener('cart:updated', () => {
      this.updateCartCount();
    });

    // Hamburger menu toggle
    if (this.hamburger && this.mobileMenu) {
      this.hamburger.addEventListener('click', () => {
        this.toggleMobileMenu();
      });

      // Close button
      const closeButton = document.querySelector('[data-mobile-close]');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          this.closeMobileMenu();
        });
      }

      // Close menu when clicking on a link
      const mobileLinks = this.mobileMenu.querySelectorAll('a');
      mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
          this.closeMobileMenu();
        });
      });
    }

    // Sticky hamburger menu toggle (transparent sticky)
    if (this.stickyHamburger && this.mobileMenu) {
      this.stickyHamburger.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      this.openMobileMenu();
    } else {
      this.closeMobileMenu();
    }
  }

  openMobileMenu() {
    this.mobileMenu.classList.add('is-open');
    this.header.classList.add('diamension-header--menu-open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    this.mobileMenu.classList.remove('is-open');
    this.header.classList.remove('diamension-header--menu-open');
    document.body.style.overflow = ''; // Restore scrolling
  }

  setInitialState() {
    // Apply initial state based on behavior setting
    if (this.behavior === 'solid') {
      this.header.classList.add('diamension-header--scrolled');
      this.header.classList.add('diamension-header--solid-layout');
      this.header.classList.remove('diamension-header--transparent-layout');
      this.isScrolled = true;
    } else {
      // 'auto' behavior
      this.header.classList.remove('diamension-header--solid-layout');
      this.header.classList.add('diamension-header--transparent-layout');
      // Auto starts as transparent but can become solid on scroll
    }
  }

  handleScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const scrollingDown = scrollPosition > this.lastScrollPosition;
    const scrollingUp = scrollPosition < this.lastScrollPosition;

    // ========================================
    // SOLID MODE (Keep existing behavior - DO NOT TOUCH)
    // ========================================
    if (this.behavior === 'solid') {
      // Switch to fixed positioning when scrolling starts
      if (scrollPosition > 10) {
        this.header.classList.add('diamension-header--scrolling');
      } else {
        this.header.classList.remove('diamension-header--scrolling');
      }

      // Hide/show main header on scroll
      if (scrollingDown && scrollPosition > this.scrollThreshold) {
        this.header.classList.add('diamension-header--hidden');
      }

      if (scrollingUp) {
        this.header.classList.remove('diamension-header--hidden');
      }
    }

    // ========================================
    // TRANSPARENT MODE (New behavior with separate sticky)
    // ========================================
    if (this.behavior === 'auto') {
      // Manage header visibility based on scroll position and direction
      if (scrollPosition <= this.scrollThreshold) {
        // Below threshold: Show main transparent header, hide sticky
        this.header.classList.remove('diamension-header--hidden');
        if (this.transparentSticky) {
          this.transparentSticky.classList.remove('is-visible');
        }
      } else {
        // Above threshold
        if (scrollingDown) {
          // Scrolling down: Hide main header
          this.header.classList.add('diamension-header--hidden');
          // Sticky stays hidden when scrolling down
          if (this.transparentSticky) {
            this.transparentSticky.classList.remove('is-visible');
          }
        } else if (scrollingUp) {
          // Scrolling up: Hide main header, show sticky
          this.header.classList.add('diamension-header--hidden');
          if (this.transparentSticky) {
            this.transparentSticky.classList.add('is-visible');
          }
        }
      }
    }

    this.lastScrollPosition = scrollPosition;
  }

  async updateCartCount() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      const cartCountElement = document.querySelector('[data-cart-count]');
      const cartCountStickyElement = document.querySelector('[data-cart-count-sticky]');

      // Update main header cart count
      if (cartCountElement) {
        cartCountElement.textContent = cart.item_count > 0 ? cart.item_count : '';
      }

      // Update transparent sticky cart count
      if (cartCountStickyElement) {
        cartCountStickyElement.textContent = cart.item_count > 0 ? cart.item_count : '';
      }
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  }

  initNavigationUnderlines() {
    // Get all navigation links (desktop main, desktop sticky, mobile)
    const mainNavLinks = this.header.querySelectorAll('.diamension-header__nav-link');
    const stickyNavLinks = this.transparentSticky?.querySelectorAll('.diamension-header__nav-link') || [];
    const mobileNavLinks = document.querySelectorAll('.diamension-header__mobile-nav-link');

    // Get current page URL path
    const currentPath = window.location.pathname;

    // Function to check if link is active
    const isActiveLink = (link) => {
      const linkPath = new URL(link.href).pathname;
      // Exact match or if current path starts with link path (for section matching)
      return currentPath === linkPath || (linkPath !== '/' && currentPath.startsWith(linkPath));
    };

    // Function to set up GSAP hover animation for a link
    const setupHoverAnimation = (link) => {
      // Check if GSAP is available
      if (typeof gsap === 'undefined') {
        console.warn('GSAP is not loaded. Underline animations will not work.');
        return;
      }

      link.addEventListener('mouseenter', () => {
        // Don't animate if it's the active link
        if (link.classList.contains('is-active')) return;

        // Mouse enter: Enter through LEFT door
        // Line grows from left to right (left stays at 0, width goes 0→100%)
        gsap.fromTo(
          link,
          {
            '--after-left': '0%',
            '--after-width': '0%'
          },
          {
            '--after-left': '0%',
            '--after-width': '100%',
            duration: 0.3,
            ease: 'power2.out',
          }
        );
      });

      link.addEventListener('mouseleave', () => {
        // Don't animate if it's the active link
        if (link.classList.contains('is-active')) return;

        // Mouse leave: Exit through RIGHT door
        // Line slides out to the right (left moves 0→100%, width shrinks 100→0%)
        gsap.to(link, {
          '--after-left': '100%',
          '--after-width': '0%',
          duration: 0.3,
          ease: 'power2.in',
        });
      });
    };

    // Apply active class and set up animations for main nav
    mainNavLinks.forEach((link) => {
      if (isActiveLink(link)) {
        link.classList.add('is-active');
      }
      setupHoverAnimation(link);
    });

    // Apply active class and set up animations for sticky nav
    stickyNavLinks.forEach((link) => {
      if (isActiveLink(link)) {
        link.classList.add('is-active');
      }
      setupHoverAnimation(link);
    });

    // Apply active class and set up animations for mobile nav
    mobileNavLinks.forEach((link) => {
      if (isActiveLink(link)) {
        link.classList.add('is-active');
      }
      setupHoverAnimation(link);
    });
  }
}

/**
 * Diamension Search Overlay
 * Handles search functionality with GSAP animations and debouncing
 */

class DiamensionSearch {
  constructor() {
    this.overlay = document.querySelector('[data-search-overlay]');
    this.toggleButton = document.querySelector('[data-search-toggle]');
    this.toggleButtonSticky = document.querySelector('[data-search-toggle-sticky]');
    this.backdrop = document.querySelector('[data-search-backdrop]');
    this.searchInput = document.querySelector('[data-search-input]');
    this.searchForm = document.querySelector('[data-search-form]');
    this.resultsContainer = document.querySelector('[data-search-products]');
    this.loadingElement = document.querySelector('[data-search-loading]');
    this.noResultsElement = document.querySelector('[data-search-no-results]');
    this.viewMoreElement = document.querySelector('[data-search-view-more]');
    this.viewMoreLink = document.querySelector('[data-search-view-more-link]');

    this.isOpen = false;
    this.isTransitioning = false; // Flag to prevent scroll handling during transitions
    this.minSearchLength = 3;
    this.debounceDelay = 500;
    this.debounceTimer = null;
    this.currentQuery = '';
    this.totalResults = 0;

    // Get max results based on screen size
    this.getMaxResults = () => {
      return window.innerWidth < 768 ? 2 : 5;
    };

    if (this.overlay && this.toggleButton) {
      this.init();
    }
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Toggle button click
    this.toggleButton.addEventListener('click', () => {
      this.toggleSearch();
    });

    // Sticky toggle button click
    if (this.toggleButtonSticky) {
      this.toggleButtonSticky.addEventListener('click', () => {
        this.toggleSearch();
      });
    }

    // Backdrop click to close
    this.backdrop.addEventListener('click', () => {
      this.closeSearch();
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeSearch();
      }
    });

    // Search input with debouncing
    this.searchInput.addEventListener('input', (e) => {
      this.handleSearchInput(e.target.value);
    });

    // Prevent form submission
    this.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    // Update results on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (this.currentQuery) {
          this.performSearch(this.currentQuery);
        }
      }, 250);
    });
  }

  toggleSearch() {
    // TODO: debugging search toggle - checking if close button works
    console.log('Toggle search - isOpen:', this.isOpen);
    if (this.isOpen) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }

  openSearch() {
    this.isOpen = true;
    this.overlay.classList.add('diamension-search-overlay--active');
    document.body.style.overflow = 'hidden';

    // Make header solid and visible when search is open
    const header = document.querySelector('[data-header]');
    if (header) {
      header.classList.add('diamension-header--search-open');
      header.classList.remove('diamension-header--hidden'); // Ensure main header is visible
      // Store original behavior to restore later
      this.originalBehavior = header.dataset.headerBehavior;
    }

    // Hide transparent sticky when search is open (main header takes over)
    const transparentSticky = document.querySelector('[data-transparent-sticky]');
    if (transparentSticky) {
      transparentSticky.classList.remove('is-visible');
    }

    // Toggle icon visibility
    this.toggleSearchIcons(true);

    // GSAP Animation: Slide down from header position
    const content = this.overlay.querySelector('.diamension-search-overlay__content');

    if (typeof gsap !== 'undefined') {
      // Set initial state
      gsap.set(content, { height: 0, opacity: 0 });

      gsap.to(this.overlay, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(content, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    } else {
      // Fallback without GSAP
      this.overlay.style.opacity = '1';
      content.style.height = 'auto';
      content.style.opacity = '1';
    }

    // Focus search input
    setTimeout(() => {
      this.searchInput.focus();
    }, 400);
  }

  closeSearch() {
    this.isOpen = false;

    // Restore original behavior
    const header = document.querySelector('[data-header]');
    const transparentSticky = document.querySelector('[data-transparent-sticky]');

    if (header && this.originalBehavior) {
      header.classList.remove('diamension-header--search-open');

      // Re-apply initial state based on restored behavior
      if (this.originalBehavior === 'solid') {
        header.classList.add('diamension-header--scrolled');
        header.classList.add('diamension-header--solid-layout');
        header.classList.remove('diamension-header--transparent-layout');
      } else {
        // 'auto' - restore to transparent state
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollPosition <= 820) {
          // Below threshold: show main transparent header, hide sticky
          header.classList.remove('diamension-header--hidden');
          if (transparentSticky) {
            transparentSticky.classList.remove('is-visible');
          }
        } else {
          // Above threshold: Force instant hide to prevent double header issue
          // First, make header fully transparent by removing search-open
          // Then immediately hide it without waiting for transition

          // Add a temporary class to disable transitions
          header.style.transition = 'none';
          header.classList.add('diamension-header--hidden');

          // Re-enable transitions after a frame
          setTimeout(() => {
            header.style.transition = '';
          }, 50);

          // Hide sticky initially
          if (transparentSticky) {
            transparentSticky.classList.remove('is-visible');

            // Show sticky after ensuring main header is hidden
            setTimeout(() => {
              const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
              if (scrollPosition > 820 && !this.isOpen) {
                transparentSticky.classList.add('is-visible');
              }
            }, 100);
          }
        }
      }
    }

    // Toggle icon visibility
    this.toggleSearchIcons(false);

    // GSAP Animation: Slide up to header position and fade out
    const content = this.overlay.querySelector('.diamension-search-overlay__content');

    if (typeof gsap !== 'undefined') {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          this.overlay.classList.remove('diamension-search-overlay--active');
          document.body.style.overflow = '';

          // Clear search
          this.searchInput.value = '';
          this.currentQuery = '';
          this.clearResults();
        },
      });
    } else {
      // Fallback without GSAP
      content.style.height = '0';
      content.style.opacity = '0';

      setTimeout(() => {
        this.overlay.classList.remove('diamension-search-overlay--active');
        document.body.style.overflow = '';
        this.searchInput.value = '';
        this.currentQuery = '';
        this.clearResults();
      }, 300);
    }
  }

  toggleSearchIcons(showClose) {
    // TODO: debugging icon toggle - checking if close button works
    console.log('Toggle icons - showClose:', showClose);

    // Toggle visibility class on the button instead of inline styles
    if (showClose) {
      this.toggleButton.classList.add('diamension-header__icon--close-active');
    } else {
      this.toggleButton.classList.remove('diamension-header__icon--close-active');
    }
  }

  handleSearchInput(query) {
    // Clear previous timer
    clearTimeout(this.debounceTimer);

    // Trim and check length
    query = query.trim();

    // Clear results if query is too short
    if (query.length < this.minSearchLength) {
      this.clearResults();
      return;
    }

    // Debounce search
    this.debounceTimer = setTimeout(() => {
      this.performSearch(query);
    }, this.debounceDelay);
  }

  async performSearch(query) {
    this.currentQuery = query;
    this.showLoading();

    try {
      // Use Shopify Predictive Search API
      const response = await fetch(
        `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=10`
      );

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();

      // TODO: debugging search results - checking API response structure
      console.log('Search API response:', data);

      const products = data.resources.results.products || [];

      // TODO: debugging search results - checking products array
      console.log('Products found:', products.length, products);

      this.displayResults(products, query);
    } catch (error) {
      console.error('Search error:', error);
      this.showNoResults();
    }
  }

  displayResults(products, query) {
    this.hideLoading();

    // TODO: debugging display results - checking if products are received
    console.log('displayResults called with:', products.length, 'products');

    if (products.length === 0) {
      this.showNoResults();
      return;
    }

    const maxResults = this.getMaxResults();
    const displayProducts = products.slice(0, maxResults);
    this.totalResults = products.length;

    // TODO: debugging display results - checking HTML generation
    console.log('Displaying', displayProducts.length, 'products');

    // Generate product cards HTML
    const productsHTML = displayProducts.map((product) => this.createProductCard(product)).join('');

    // TODO: debugging display results - checking generated HTML
    console.log('Generated HTML length:', productsHTML.length);

    this.resultsContainer.innerHTML = productsHTML;

    // Show "View More" if there are more products
    if (products.length > maxResults) {
      this.viewMoreLink.href = `/search?q=${encodeURIComponent(query)}&type=product`;
      this.viewMoreElement.style.display = 'block';
    } else {
      this.viewMoreElement.style.display = 'none';
    }

    // Hide no results message
    this.noResultsElement.style.display = 'none';
  }

  createProductCard(product) {
    const price = this.formatPrice(product.price);

    // Handle different image formats from Shopify API
    let imageUrl = '';
    if (product.featured_image) {
      // featured_image can be an object with url property or a string
      imageUrl = typeof product.featured_image === 'object' ? product.featured_image.url : product.featured_image;
    } else if (product.image) {
      // Fallback to image property (usually a string)
      imageUrl = typeof product.image === 'object' ? product.image.url : product.image;
    }

    // Add protocol if missing
    if (imageUrl && imageUrl.startsWith('//')) {
      imageUrl = `https:${imageUrl}`;
    }

    return `
      <a href="${product.url}" class="diamension-search-overlay__product-card">
        <div class="diamension-search-overlay__product-image-wrapper">
          ${
            imageUrl
              ? `<img src="${imageUrl}" alt="${this.escapeHtml(
                  product.title
                )}" class="diamension-search-overlay__product-image" loading="lazy">`
              : ''
          }
        </div>
        <div class="diamension-search-overlay__product-info">
          <h3 class="diamension-search-overlay__product-title">${this.escapeHtml(product.title)}</h3>
          <p class="diamension-search-overlay__product-price">Rs. ${price}</p>
        </div>
      </a>
    `;
  }

  formatPrice(cents) {
    return new Intl.NumberFormat('en-IN').format(cents / 100);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showLoading() {
    this.loadingElement.style.display = 'flex';
    this.noResultsElement.style.display = 'none';
    this.resultsContainer.innerHTML = '';
    this.viewMoreElement.style.display = 'none';
  }

  hideLoading() {
    this.loadingElement.style.display = 'none';
  }

  showNoResults() {
    this.hideLoading();
    this.noResultsElement.style.display = 'block';
    this.resultsContainer.innerHTML = '';
    this.viewMoreElement.style.display = 'none';
  }

  clearResults() {
    this.resultsContainer.innerHTML = '';
    this.noResultsElement.style.display = 'none';
    this.viewMoreElement.style.display = 'none';
    this.hideLoading();
  }
}

/**
 * Initialize Cart Drawer
 * Prevents default cart link behavior and opens cart drawer instead
 */
function initCartDrawer() {
  const cartLink = document.querySelector('#diamension-cart-icon');
  const cartLinkSticky = document.querySelector('#diamension-cart-icon-sticky');
  const cartDrawer = document.querySelector('cart-drawer');

  // TODO: debugging cart drawer - checking if elements are found
  console.log('Diamension cart link found:', cartLink);
  console.log('Diamension sticky cart link found:', cartLinkSticky);
  console.log('Cart drawer found:', cartDrawer);

  if (cartLink && cartDrawer) {
    // TODO: debugging cart drawer - event listener attached
    console.log('Attaching cart drawer event listener');

    cartLink.addEventListener('click', (event) => {
      // TODO: debugging cart drawer - click event fired
      console.log('Diamension cart icon clicked, preventing default and opening drawer');
      event.preventDefault();
      cartDrawer.open(cartLink);
    });
  } else {
    // TODO: debugging cart drawer - elements not found
    console.log('Cart drawer initialization failed - missing elements');
  }

  // Handle sticky cart icon
  if (cartLinkSticky && cartDrawer) {
    cartLinkSticky.addEventListener('click', (event) => {
      console.log('Diamension sticky cart icon clicked, preventing default and opening drawer');
      event.preventDefault();
      cartDrawer.open(cartLinkSticky);
    });
  }
}

// Initialize header and search when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new DiamensionHeader();
    new DiamensionSearch();
    initCartDrawer();
  });
} else {
  new DiamensionHeader();
  new DiamensionSearch();
  initCartDrawer();
}
