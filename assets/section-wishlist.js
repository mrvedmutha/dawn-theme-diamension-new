(function () {
  'use strict';

  class WishlistPage {
    constructor(section) {
      this.section = section;
      this.grid = section.querySelector('[data-wishlist-products]');
      this.emptyState = section.querySelector('[data-empty-state]');
      this.loadingState = section.querySelector('[data-loading-state]');
      this.countElement = section.querySelector('[data-wishlist-count]');
      this.countNumber = section.querySelector('[data-wishlist-count-number]');

      this.init();
    }

    async init() {
      this.showLoading();

      await this.loadProducts();

      if (window.WishlistManager) {
        window.WishlistManager.subscribe((event) => {
          if (event.event === 'removed') {
            this.handleProductRemoved(event.data.productId);
          }
        });
      }
    }

    showLoading() {
      if (this.loadingState) {
        this.loadingState.hidden = false;
      }
      if (this.emptyState) {
        this.emptyState.setAttribute('data-empty-state', 'hidden');
      }
    }

    hideLoading() {
      if (this.loadingState) {
        this.loadingState.hidden = true;
      }
    }

    showEmptyState() {
      if (this.emptyState) {
        this.emptyState.setAttribute('data-empty-state', 'visible');
      }
      this.updateCount(0);
    }

    hideEmptyState() {
      if (this.emptyState) {
        this.emptyState.setAttribute('data-empty-state', 'hidden');
      }
    }

    updateCount(count) {
      if (this.countElement && this.countNumber) {
        this.countNumber.textContent = count;
        this.countElement.hidden = count === 0;
      }
    }

    async loadProducts() {
      if (!window.WishlistManager) {
        console.error('[Wishlist Page] WishlistManager not found');
        this.hideLoading();
        this.showEmptyState();
        return;
      }

      const wishlistItems = window.WishlistManager.get();

      if (wishlistItems.length === 0) {
        this.hideLoading();
        this.showEmptyState();
        return;
      }

      const productPromises = wishlistItems.map((item) =>
        this.fetchProduct(item.handle || item.id)
      );

      const products = await Promise.all(productPromises);
      const validProducts = products.filter((p) => p !== null);

      this.hideLoading();

      if (validProducts.length === 0) {
        this.showEmptyState();
      } else {
        this.hideEmptyState();
        this.renderProducts(validProducts);
        this.updateCount(validProducts.length);

        if (window.WishlistManager) {
          window.WishlistManager.initializeButtons();
        }
      }
    }

    async fetchProduct(handleOrId) {
      try {
        let url = `/products/${handleOrId}.js`;

        if (!isNaN(handleOrId)) {
          const wishlistItems = window.WishlistManager.get();
          const item = wishlistItems.find((i) => i.id === String(handleOrId));
          if (item && item.handle) {
            url = `/products/${item.handle}.js`;
          }
        }

        const response = await fetch(url);
        if (!response.ok) {
          console.warn(`[Wishlist Page] Product not found: ${handleOrId}`);
          return null;
        }

        const product = await response.json();
        return product;
      } catch (error) {
        console.error(`[Wishlist Page] Error fetching product ${handleOrId}:`, error);
        return null;
      }
    }

    renderProducts(products) {
      if (!this.grid) return;

      const html = products.map((product) => this.renderProductCard(product)).join('');
      this.grid.innerHTML = html;
    }

    renderProductCard(product) {
      const price = product.price / 100;
      const formattedPrice = `₹${price.toLocaleString('en-IN')}`;
      const priceRaw = price;
      const imageUrl = product.featured_image || product.images?.[0] || '';
      const productUrl = `/products/${product.handle}`;
      const productTags = product.tags ? product.tags.join(',') : '';
      const productType = product.type || '';

      const isNewArrival = product.tags &&
        (product.tags.includes('new-arrival') || product.tags.includes('New Arrival'));

      return `
        <div
          class="product-card-collection-diamension"
          data-product-id="${product.id}"
          data-product-tags="${productTags}"
          data-product-type="${productType}"
          data-product-price="${priceRaw}"
        >
          <a href="${productUrl}" class="product-card-collection-diamension__link">
            <div class="product-card-collection-diamension__image-wrapper">
              ${
                imageUrl
                  ? `
                <img
                  src="${imageUrl}?width=400"
                  srcset="${imageUrl}?width=200 200w,
                          ${imageUrl}?width=400 400w,
                          ${imageUrl}?width=600 600w,
                          ${imageUrl}?width=800 800w"
                  sizes="(min-width: 1024px) 348px, (min-width: 768px) 25vw, (min-width: 480px) 33vw, 50vw"
                  alt="${product.title}"
                  loading="lazy"
                  class="product-card-collection-diamension__image"
                >
              `
                  : `
                <div class="product-card-collection-diamension__image-placeholder"></div>
              `
              }
            </div>

            <div class="product-card-collection-diamension__info">
              <h3 class="product-card-collection-diamension__title">${product.title}</h3>
              <p class="product-card-collection-diamension__price">From ${formattedPrice}</p>
            </div>
          </a>

          <button
            class="wishlist-button wishlist-button--l is-active"
            data-wishlist-toggle
            data-product-id="${product.id}"
            aria-label="Add to wishlist"
            type="button"
            style="--button-size: 30px; --svg-size: 19px;"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.59 4.96961C21.47 5.95961 22 7.25961 22 8.68961C22 15.6896 15.52 19.8196 12.62 20.8196C12.28 20.9396 11.72 20.9396 11.38 20.8196C8.48 19.8196 2 15.6896 2 8.68961C2 5.59961 4.49 3.09961 7.56 3.09961C9.38 3.09961 10.99 3.97961 12 5.33961C13.01 3.97961 14.63 3.09961 16.44 3.09961" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          ${
            isNewArrival
              ? `
          <div class="product-card-collection-diamension__badge">
            <p>NEW ARRIVAL</p>
          </div>
          `
              : ''
          }
        </div>
      `;
    }

    handleProductRemoved(productId) {
      const card = this.grid.querySelector(`[data-product-id="${productId}"]`);
      if (card) {
        card.remove();
      }

      const remainingCards = this.grid.querySelectorAll('.product-card-collection-diamension');
      if (remainingCards.length === 0) {
        this.showEmptyState();
      } else {
        this.updateCount(remainingCards.length);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.custom-section-wishlist');
    sections.forEach((section) => {
      new WishlistPage(section);
    });
  });
})();
