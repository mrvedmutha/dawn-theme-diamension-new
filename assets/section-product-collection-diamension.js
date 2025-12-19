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

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.custom-section-product-collection-diamension');
  sections.forEach(section => new CollectionDiamension(section));
});
