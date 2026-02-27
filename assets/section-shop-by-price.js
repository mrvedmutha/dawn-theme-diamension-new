(function () {
  'use strict';

  // Configuration
  const CONFIG = {
    PRODUCTS_PER_PAGE: 10,
    ANIMATION_DURATION: 0.3,
  };

  // Product Fetcher
  const ProductFetcher = {
    async fetchByPriceRange(minPrice, maxPrice) {
      try {
        // Fetch all products from a collection (adjust collection handle as needed)
        const response = await fetch(`/collections/all/products.json?limit=250`);
        if (!response.ok) throw new Error('Failed to fetch products');

        const data = await response.json();

        // Filter products by price range (prices are already in rupees from Shopify API)
        const filtered = data.products.filter((product) => {
          const price = parseFloat(product.variants[0]?.price || 0);
          // Compare prices directly in rupees (API returns prices in rupees, not paise)
          return price >= minPrice && price < maxPrice;
        });

        // Return both the total count and the sliced products
        return {
          products: filtered.slice(0, CONFIG.PRODUCTS_PER_PAGE),
          totalCount: filtered.length
        };
      } catch (error) {
        console.error('Error fetching products:', error);
        return {
          products: [],
          totalCount: 0
        };
      }
    },
  };

  // Skeleton Card Renderer
  const renderSkeletonCard = () => {
    return `
      <div class="custom-section-shop-by-price__product-card custom-section-shop-by-price__skeleton-card">
        <div class="custom-section-shop-by-price__image-container custom-section-shop-by-price__skeleton-image">
          <div class="custom-section-shop-by-price__skeleton-shimmer">&nbsp;</div>
          <div class="custom-section-shop-by-price__skeleton-wishlist">&nbsp;</div>
        </div>
        <div class="custom-section-shop-by-price__skeleton-title">&nbsp;</div>
        <div class="custom-section-shop-by-price__skeleton-price">&nbsp;</div>
      </div>
    `;
  };

  // Product Card Renderer
  const renderProductCard = (product) => {
    // Handle image URLs - Shopify API returns images as objects with 'src' property
    const primaryImage = product.images?.[0]?.src || product.images?.[0] || '';
    const hoverImage = product.images?.[1]?.src || product.images?.[1] || product.images?.[0]?.src || product.images?.[0] || '';
    const hasImage = !!primaryImage;
    const price = product.variants[0]?.price || 0;
    const formattedPrice = `₹ ${parseFloat(price).toLocaleString('en-IN')}`;
    const isLiked = window.WishlistManager?.has(product.id.toString()) || false;

    return `
      <div class="custom-section-shop-by-price__product-card" data-product-id="${product.id}">
        <div class="custom-section-shop-by-price__image-container">
          <a href="/products/${product.handle}" class="custom-section-shop-by-price__product-link">
            ${
              hasImage
                ? `
            <img
              src="${primaryImage}"
              alt="${product.title}"
              class="custom-section-shop-by-price__product-image custom-section-shop-by-price__product-image--primary"
              loading="lazy"
            >
            ${
              hoverImage !== primaryImage
                ? `
            <img
              src="${hoverImage}"
              alt="${product.title}"
              class="custom-section-shop-by-price__product-image custom-section-shop-by-price__product-image--hover"
              loading="lazy"
            >
            `
                : ''
            }
            `
                : `
            <div class="custom-section-shop-by-price__no-image">
              <span>No Image</span>
            </div>
            `
            }
          </a>
          <button
            class="wishlist-button wishlist-button--m ${isLiked ? 'is-active' : ''}"
            data-wishlist-toggle
            data-product-id="${product.id}"
            data-product-title="${product.title}"
            data-product-handle="${product.handle}"
            data-product-image="${primaryImage}"
            data-product-price="${formattedPrice}"
            aria-label="Add ${product.title} to wishlist"
            type="button"
            style="--button-size: 26px; --svg-size: 18px;"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.59 4.96961C21.47 5.95961 22 7.25961 22 8.68961C22 15.6896 15.52 19.8196 12.62 20.8196C12.28 20.9396 11.72 20.9396 11.38 20.8196C8.48 19.8196 2 15.6896 2 8.68961C2 5.59961 4.49 3.09961 7.56 3.09961C9.38 3.09961 10.99 3.97961 12 5.33961C13.01 3.97961 14.63 3.09961 16.44 3.09961" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <a href="/products/${product.handle}" class="custom-section-shop-by-price__product-link">
          <h3 class="custom-section-shop-by-price__product-title">${product.title}</h3>
          <p class="custom-section-shop-by-price__product-price">${formattedPrice}</p>
        </a>
      </div>
    `;
  };

  // Carousel Controller
  class CarouselController {
    constructor(section) {
      this.section = section;
      this.productsContainer = section.querySelector('[data-products-container]');
      this.leftArrow = section.querySelector('.custom-section-shop-by-price__arrow--left');
      this.rightArrow = section.querySelector('.custom-section-shop-by-price__arrow--right');
      this.currentPosition = 0;
      this.cardWidth = 225;
      this.gap = 10;
      this.visibleCards = 5;

      this.init();
    }

    init() {
      if (this.leftArrow && this.rightArrow) {
        this.leftArrow.addEventListener('click', () => this.scrollLeft());
        this.rightArrow.addEventListener('click', () => this.scrollRight());
      }

      this.updateVisibleCards();
      window.addEventListener('resize', () => this.updateVisibleCards());
    }

    updateVisibleCards() {
      const width = window.innerWidth;
      if (width <= 767) {
        this.visibleCards = 2;
        // Get actual card width from DOM for mobile
        this.updateCardWidth();
      } else if (width <= 1024) {
        this.visibleCards = 4;
        this.cardWidth = 225;
      } else {
        this.visibleCards = 5;
        this.cardWidth = 225;
      }
      this.updateArrowStates();
    }

    updateCardWidth() {
      // Wait a bit for CSS to apply, then get actual card width
      setTimeout(() => {
        const firstCard = this.productsContainer.querySelector('.custom-section-shop-by-price__product-card');
        if (firstCard) {
          this.cardWidth = firstCard.offsetWidth;
        } else {
          this.cardWidth = 165; // fallback
        }
      }, 50);
    }

    scrollLeft() {
      if (this.currentPosition > 0) {
        this.currentPosition--;
        this.updateCarouselPosition();
      }
    }

    scrollRight() {
      const totalCards = this.productsContainer.children.length;
      const maxPosition = Math.max(0, totalCards - this.visibleCards);

      if (this.currentPosition < maxPosition) {
        this.currentPosition++;
        this.updateCarouselPosition();
      }
    }

    updateCarouselPosition() {
      const translateX = -(this.currentPosition * (this.cardWidth + this.gap));

      if (window.gsap) {
        gsap.to(this.productsContainer, {
          x: translateX,
          duration: CONFIG.ANIMATION_DURATION,
          ease: 'power2.out',
        });
      } else {
        this.productsContainer.style.transform = `translateX(${translateX}px)`;
      }

      this.updateArrowStates();
    }

    updateArrowStates() {
      if (!this.leftArrow || !this.rightArrow) return;

      const totalCards = this.productsContainer.children.length;
      const maxPosition = Math.max(0, totalCards - this.visibleCards);

      // Update left arrow
      if (this.currentPosition === 0) {
        this.leftArrow.disabled = true;
      } else {
        this.leftArrow.disabled = false;
      }

      // Update right arrow
      if (this.currentPosition >= maxPosition || totalCards <= this.visibleCards) {
        this.rightArrow.disabled = true;
      } else {
        this.rightArrow.disabled = false;
      }
    }

    reset() {
      this.currentPosition = 0;
      this.updateCarouselPosition();
    }
  }

  // Tab Controller
  class TabController {
    constructor(section) {
      this.section = section;
      this.tabs = section.querySelectorAll('.custom-section-shop-by-price__tab');
      this.underline = section.querySelector('.custom-section-shop-by-price__underline');
      this.productsContainer = section.querySelector('[data-products-container]');
      this.ctaContainer = section.querySelector('.custom-section-shop-by-price__cta');
      this.shopAllLink = section.querySelector('[data-shop-all-link]');
      this.carousel = null;
      this.isFirstLoad = true;

      this.init();
    }

    init() {
      this.tabs.forEach((tab) => {
        tab.addEventListener('click', (e) => this.handleTabClick(e));
      });

      // Initialize with first tab and show underline immediately
      if (this.tabs.length > 0) {
        // Position underline on first tab immediately (before products load)
        this.positionUnderlineInitial(this.tabs[0]);
        // Then load products
        this.activateTab(this.tabs[0]);
      }
    }

    positionUnderlineInitial(tab) {
      if (!this.underline) return;

      const tabsContainer = this.section.querySelector('.custom-section-shop-by-price__tabs');

      // Calculate position immediately on load
      setTimeout(() => {
        const tabRect = tab.getBoundingClientRect();
        const containerRect = tabsContainer.getBoundingClientRect();
        const offsetLeft = tabRect.left - containerRect.left + tabsContainer.scrollLeft;

        // Set underline position without animation
        this.underline.style.left = `${offsetLeft}px`;
        this.underline.style.width = `${tabRect.width}px`;
        this.underline.style.opacity = '1';
        this.underline.classList.add('is-visible');
      }, 0);
    }

    setCarousel(carousel) {
      this.carousel = carousel;
    }

    async handleTabClick(event) {
      const tab = event.currentTarget;

      // Scroll tab into view on mobile/tablet
      this.scrollTabIntoView(tab);

      await this.activateTab(tab);
    }

    scrollTabIntoView(tab) {
      const tabsContainer = this.section.querySelector('.custom-section-shop-by-price__tabs');
      if (!tabsContainer) return;

      // Check if we're in responsive mode (when tabs scroll horizontally)
      const isResponsive = window.innerWidth <= 1024;

      if (isResponsive) {
        // Calculate the position to scroll to center the tab
        const tabRect = tab.getBoundingClientRect();
        const containerRect = tabsContainer.getBoundingClientRect();
        const tabCenter = tab.offsetLeft + tabRect.width / 2;
        const containerCenter = containerRect.width / 2;
        const scrollPosition = tabCenter - containerCenter;

        // Smooth scroll the container
        tabsContainer.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: 'smooth',
        });
      }
    }

    async activateTab(tab) {
      const priceRange = tab.dataset.priceRange.split('-');
      const minPrice = parseInt(priceRange[0]);
      const maxPrice = parseInt(priceRange[1]);

      // Update active tab
      this.tabs.forEach((t) => t.classList.remove('custom-section-shop-by-price__tab--active'));
      tab.classList.add('custom-section-shop-by-price__tab--active');

      // Animate underline
      this.animateUnderline(tab);

      if (this.isFirstLoad) {
        // First load: Replace loading text with skeletons (no fade needed)
        this.showLoading();
      } else {
        // Tab switch: Fade out current products, then show skeletons
        await this.fadeOutProducts();
        this.showLoading();
      }

      // Fetch and display new products
      const result = await ProductFetcher.fetchByPriceRange(minPrice, maxPrice);

      // Render products (replaces skeletons)
      this.renderProducts(result.products);

      // Update Shop All button with total count (not just displayed products)
      this.updateShopAllButton(result.totalCount, minPrice, maxPrice);

      // Fade in new products only on first load, otherwise they appear instantly
      if (this.isFirstLoad) {
        this.fadeInProducts();
        this.isFirstLoad = false;
      } else {
        // Products appear instantly (container already visible)
        this.productsContainer.style.opacity = '1';
      }

      // Reset carousel position
      if (this.carousel) {
        this.carousel.reset();
      }
    }

    showLoading() {
      // Show skeleton loaders based on viewport
      const skeletonCount = this.getSkeletonCount();
      const skeletonsHtml = Array.from({ length: skeletonCount }, () => renderSkeletonCard()).join('');
      this.productsContainer.innerHTML = skeletonsHtml;

      // Make sure container is visible after inserting skeletons
      this.productsContainer.style.opacity = '1';
    }

    getSkeletonCount() {
      const width = window.innerWidth;
      if (width <= 767) {
        return 2; // Mobile
      } else if (width <= 1024) {
        return 4; // Tablet
      } else {
        return 5; // Desktop
      }
    }

    animateUnderline(tab) {
      if (!this.underline) return;

      const tabsContainer = this.section.querySelector('.custom-section-shop-by-price__tabs');

      // Add small delay to let scroll animation start
      setTimeout(() => {
        const tabRect = tab.getBoundingClientRect();
        const containerRect = tabsContainer.getBoundingClientRect();
        const offsetLeft = tabRect.left - containerRect.left + tabsContainer.scrollLeft;

        if (window.gsap) {
          gsap.to(this.underline, {
            left: offsetLeft,
            width: tabRect.width,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.inOut',
          });
          this.underline.classList.add('is-visible');
        } else {
          this.underline.style.left = `${offsetLeft}px`;
          this.underline.style.width = `${tabRect.width}px`;
          this.underline.style.opacity = '1';
          this.underline.classList.add('is-visible');
        }
      }, 50);
    }

    fadeOutProducts() {
      return new Promise((resolve) => {
        if (window.gsap) {
          gsap.to(this.productsContainer, {
            opacity: 0,
            duration: CONFIG.ANIMATION_DURATION,
            ease: 'power2.inOut',
            onComplete: resolve,
          });
        } else {
          this.productsContainer.style.opacity = '0';
          setTimeout(resolve, CONFIG.ANIMATION_DURATION * 1000);
        }
      });
    }

    fadeInProducts() {
      if (window.gsap) {
        gsap.to(this.productsContainer, {
          opacity: 1,
          duration: CONFIG.ANIMATION_DURATION,
          ease: 'power2.inOut',
          delay: 0.1,
        });
      } else {
        setTimeout(() => {
          this.productsContainer.style.opacity = '1';
        }, 100);
      }
    }

    renderProducts(products) {
      if (products.length === 0) {
        this.productsContainer.innerHTML =
          '<div class="custom-section-shop-by-price__loading">No products found in this price range.</div>';
        return;
      }

      // Render products (this automatically replaces skeletons)
      const html = products.map((product) => renderProductCard(product)).join('');
      this.productsContainer.innerHTML = html;

      // Initialize wishlist buttons using global manager
      if (window.WishlistManager) {
        window.WishlistManager.initializeButtons();
      }

      // Update carousel arrow states and card width
      if (this.carousel) {
        // Update card width on mobile after products render
        if (window.innerWidth <= 767) {
          this.carousel.updateCardWidth();
        }
        this.carousel.updateArrowStates();
      }
    }

    updateShopAllButton(totalProductCount, minPrice, maxPrice) {
      if (!this.ctaContainer || !this.shopAllLink) return;

      if (totalProductCount > CONFIG.PRODUCTS_PER_PAGE) {
        this.ctaContainer.style.display = 'block';
        // Prices are already in rupees, no need to divide by 100
        this.shopAllLink.href = `/collections/all?filter.v.price.gte=${minPrice}&filter.v.price.lt=${maxPrice}`;
      } else {
        this.ctaContainer.style.display = 'none';
      }
    }
  }

  // Initialize section
  const initSection = () => {
    const sections = document.querySelectorAll('.custom-section-shop-by-price');

    sections.forEach((section) => {
      const carousel = new CarouselController(section);
      const tabController = new TabController(section);
      tabController.setCarousel(carousel);
    });
  };

  // Wait for DOM and GSAP to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSection);
  } else {
    initSection();
  }
})();
