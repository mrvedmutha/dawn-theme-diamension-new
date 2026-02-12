(function () {
  'use strict';

  /**
   * Global Wishlist Manager
   * Centralized singleton for managing wishlist state across the entire theme
   */
  const WishlistManager = {
    // Configuration
    STORAGE_KEY: 'diamension_wishlist',
    MAX_ITEMS: 100,
    TOAST_DURATION: 4000,

    // State
    wishlist: [],
    listeners: new Set(),
    toastElement: null,
    toastTimeout: null,

    /**
     * Initialize the wishlist system
     */
    init() {
      this.load();
      this.initializeButtons();
      this.setupToast();
      this.publish('loaded', { count: this.wishlist.length });
      console.log('[Wishlist] Initialized with', this.wishlist.length, 'items');
    },

    /**
     * Get copy of wishlist array
     * @returns {Array} Array of wishlist items
     */
    get() {
      return [...this.wishlist];
    },

    /**
     * Add product to wishlist
     * @param {string|number} productId - Product ID
     * @param {Object} productData - Product metadata (title, handle, image, price)
     * @returns {boolean} True if added, false if already exists or limit reached
     */
    add(productId, productData = {}) {
      if (this.has(productId)) {
        console.log('[Wishlist] Product already in wishlist:', productId);
        return false;
      }

      if (this.wishlist.length >= this.MAX_ITEMS) {
        console.warn('[Wishlist] Maximum items reached:', this.MAX_ITEMS);
        return false;
      }

      this.wishlist.push({
        id: String(productId),
        addedAt: Date.now(),
        ...productData,
      });

      this.save();
      this.publish('added', { productId, productData });
      this.showToast('added', productData);
      this.updateAllButtons(productId, true);
      this.updateBadge();

      return true;
    },

    /**
     * Remove product from wishlist
     * @param {string|number} productId - Product ID
     * @returns {boolean} True if removed, false if not found
     */
    remove(productId) {
      const index = this.wishlist.findIndex((item) => item.id === String(productId));
      if (index === -1) {
        console.log('[Wishlist] Product not in wishlist:', productId);
        return false;
      }

      const removed = this.wishlist.splice(index, 1)[0];
      this.save();
      this.publish('removed', { productId, productData: removed });
      this.showToast('removed', removed);
      this.updateAllButtons(productId, false);
      this.updateBadge();

      return true;
    },

    /**
     * Check if product is in wishlist
     * @param {string|number} productId - Product ID
     * @returns {boolean}
     */
    has(productId) {
      return this.wishlist.some((item) => item.id === String(productId));
    },

    /**
     * Toggle product in wishlist
     * @param {string|number} productId - Product ID
     * @param {Object} productData - Product metadata
     * @returns {boolean} True if added, false if removed
     */
    toggle(productId, productData = {}) {
      if (this.has(productId)) {
        this.remove(productId);
        return false;
      } else {
        this.add(productId, productData);
        return true;
      }
    },

    /**
     * Clear all items from wishlist
     */
    clear() {
      this.wishlist = [];
      this.save();
      this.publish('cleared');
      this.updateBadge();
      console.log('[Wishlist] Cleared all items');
    },

    /**
     * Get wishlist item count
     * @returns {number}
     */
    getCount() {
      return this.wishlist.length;
    },

    /**
     * Save wishlist to localStorage
     */
    save() {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.wishlist));
      } catch (error) {
        console.error('[Wishlist] Failed to save to localStorage:', error);
        // Fallback to sessionStorage
        try {
          sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.wishlist));
          console.warn('[Wishlist] Using sessionStorage as fallback');
        } catch (e) {
          console.error('[Wishlist] SessionStorage also failed:', e);
        }
      }
    },

    /**
     * Load wishlist from localStorage
     */
    load() {
      try {
        const data = localStorage.getItem(this.STORAGE_KEY);
        this.wishlist = data ? JSON.parse(data) : [];
      } catch (error) {
        console.error('[Wishlist] Failed to load from localStorage:', error);
        this.wishlist = [];
      }
    },

    /**
     * Subscribe to wishlist events
     * @param {Function} callback - Event handler
     * @returns {Function} Unsubscribe function
     */
    subscribe(callback) {
      this.listeners.add(callback);
      return () => this.listeners.delete(callback);
    },

    /**
     * Publish event to all subscribers
     * @param {string} event - Event name
     * @param {Object} data - Event data
     */
    publish(event, data = {}) {
      this.listeners.forEach((callback) => {
        try {
          callback({ event, data, timestamp: Date.now() });
        } catch (error) {
          console.error('[Wishlist] Listener error:', error);
        }
      });
    },

    /**
     * Initialize all wishlist buttons on the page
     */
    initializeButtons() {
      const buttons = document.querySelectorAll('[data-wishlist-toggle]');

      buttons.forEach((button) => {
        // Skip if already initialized
        if (button.dataset.wishlistInit) return;
        button.dataset.wishlistInit = 'true';

        const productId = button.dataset.productId;

        // Set initial state
        if (this.has(productId)) {
          button.classList.add('is-active');
        }

        // Attach click handler
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.handleButtonClick(button);
        });
      });

      console.log('[Wishlist] Initialized', buttons.length, 'buttons');
    },

    /**
     * Handle wishlist button click
     * @param {HTMLElement} button - Button element
     */
    handleButtonClick(button) {
      const productId = button.dataset.productId;
      const productData = {
        title: button.dataset.productTitle,
        handle: button.dataset.productHandle,
        image: button.dataset.productImage,
        price: button.dataset.productPrice,
      };

      // Toggle wishlist
      const isNowInWishlist = this.toggle(productId, productData);

      // Animate button
      this.animateButton(button);

      // Update button state
      button.classList.toggle('is-active', isNowInWishlist);
      button.setAttribute(
        'aria-label',
        isNowInWishlist
          ? `Remove ${productData.title} from wishlist`
          : `Add ${productData.title} to wishlist`
      );
    },

    /**
     * Update all buttons for a product
     * @param {string|number} productId - Product ID
     * @param {boolean} isInWishlist - Whether product is in wishlist
     */
    updateAllButtons(productId, isInWishlist) {
      const buttons = document.querySelectorAll(
        `[data-wishlist-toggle][data-product-id="${productId}"]`
      );
      buttons.forEach((button) => {
        button.classList.toggle('is-active', isInWishlist);
      });
    },

    /**
     * Animate button with GSAP or CSS fallback
     * @param {HTMLElement} button - Button element
     */
    animateButton(button) {
      if (window.gsap) {
        gsap
          .timeline()
          .to(button, {
            scale: 0.85,
            duration: 0.1,
            ease: 'power2.in',
          })
          .to(button, {
            scale: 1,
            duration: 0.15,
            ease: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          });
      } else {
        // CSS fallback
        button.style.transform = 'scale(0.85)';
        button.style.transition = 'transform 0.1s';
        setTimeout(() => {
          button.style.transform = 'scale(1)';
          button.style.transition = 'transform 0.15s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
          setTimeout(() => {
            button.style.transform = '';
            button.style.transition = '';
          }, 150);
        }, 100);
      }
    },

    /**
     * Setup toast notification element
     */
    setupToast() {
      this.toastElement = document.getElementById('wishlist-toast');
      if (!this.toastElement) {
        console.warn('[Wishlist] Toast element not found');
        return;
      }

      const closeBtn = this.toastElement.querySelector('.wishlist-toast__close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.hideToast());
      }

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.toastElement.classList.contains('active')) {
          this.hideToast();
        }
      });

      // Pause auto-dismiss on hover
      this.toastElement.addEventListener('mouseenter', () => {
        clearTimeout(this.toastTimeout);
      });

      this.toastElement.addEventListener('mouseleave', () => {
        if (this.toastElement.classList.contains('active')) {
          this.toastTimeout = setTimeout(() => this.hideToast(), this.TOAST_DURATION);
        }
      });

      console.log('[Wishlist] Toast initialized');
    },

    /**
     * Show toast notification
     * @param {string} action - 'added' or 'removed'
     * @param {Object} productData - Product metadata
     */
    showToast(action, productData) {
      if (!this.toastElement) return;

      const message = this.toastElement.querySelector('#wishlist-toast-message');
      if (message) {
        const productTitle = productData.title || 'Item';
        message.textContent =
          action === 'added'
            ? `${productTitle} added to wishlist`
            : `${productTitle} removed from wishlist`;
      }

      // Show toast
      this.toastElement.hidden = false;
      // Force reflow for animation
      this.toastElement.offsetHeight;
      this.toastElement.classList.add('active');

      // Auto-dismiss
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => this.hideToast(), this.TOAST_DURATION);
    },

    /**
     * Hide toast notification
     */
    hideToast() {
      if (!this.toastElement) return;

      this.toastElement.classList.remove('active');
      setTimeout(() => {
        this.toastElement.hidden = true;
      }, 300); // Match CSS transition duration

      clearTimeout(this.toastTimeout);
    },

    /**
     * Update wishlist count badge in header
     */
    updateBadge() {
      const badge = document.querySelector('[data-wishlist-badge]');
      const count = this.getCount();

      if (badge) {
        badge.textContent = count;
        badge.hidden = count === 0;
      }
    },
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => WishlistManager.init());
  } else {
    WishlistManager.init();
  }

  // Expose globally
  window.WishlistManager = WishlistManager;
})();
