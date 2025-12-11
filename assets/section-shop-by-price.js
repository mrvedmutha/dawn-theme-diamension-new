(function () {
  'use strict';

  // Configuration
  const CONFIG = {
    PRODUCTS_PER_PAGE: 10,
    ANIMATION_DURATION: 0.3,
    WISHLIST_KEY: 'diamension_wishlist',
    HEART_ICON_PATH:
      '/Users/wingsdino/Documents/Wings Shopify Projects/diamension/diamension-dawn-theme-new/diamension-shopify-dawn/prototype/section-shop-by-price/icons/heart.svg',
  };

  // Wishlist Manager (localStorage)
  const WishlistManager = {
    get() {
      try {
        const data = localStorage.getItem(CONFIG.WISHLIST_KEY);
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error('Error reading wishlist:', error);
        return [];
      }
    },

    add(productId) {
      const wishlist = this.get();
      if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem(CONFIG.WISHLIST_KEY, JSON.stringify(wishlist));
      }
    },

    remove(productId) {
      const wishlist = this.get();
      const filtered = wishlist.filter((id) => id !== productId);
      localStorage.setItem(CONFIG.WISHLIST_KEY, JSON.stringify(filtered));
    },

    has(productId) {
      return this.get().includes(productId);
    },

    toggle(productId) {
      if (this.has(productId)) {
        this.remove(productId);
        return false;
      } else {
        this.add(productId);
        return true;
      }
    },
  };

  // Wishlist Animation using GSAP
  const animateWishlistToggle = (button) => {
    if (!window.gsap) {
      console.error('GSAP not loaded');
      return;
    }

    // Scale down-up animation with spring effect
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
        ease: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)', // Spring effect
      });
  };

  // Product Fetcher
  const ProductFetcher = {
    async fetchByPriceRange(minPrice, maxPrice) {
      try {
        // Fetch all products from a collection (adjust collection handle as needed)
        const response = await fetch(`/collections/all/products.json?limit=250`);
        if (!response.ok) throw new Error('Failed to fetch products');

        const data = await response.json();

        // Filter products by price range
        const filtered = data.products.filter((product) => {
          const price = parseFloat(product.variants[0]?.price || 0);
          const priceInPaise = price * 100; // Convert to paise
          return priceInPaise >= minPrice && priceInPaise < maxPrice;
        });

        // Limit to 10 products
        return filtered.slice(0, CONFIG.PRODUCTS_PER_PAGE);
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];
      }
    },
  };

  // Product Card Renderer
  const renderProductCard = (product) => {
    const primaryImage = product.images[0] || '';
    const hoverImage = product.images[1] || product.images[0] || '';
    const price = product.variants[0]?.price || 0;
    const formattedPrice = `₹ ${parseFloat(price).toLocaleString('en-IN')}`;
    const isLiked = WishlistManager.has(product.id.toString());

    return `
      <div class="custom-section-shop-by-price__product-card" data-product-id="${product.id}">
        <div class="custom-section-shop-by-price__image-container">
          <a href="/products/${product.handle}" class="custom-section-shop-by-price__product-link">
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
          </a>
          <button
            class="custom-section-shop-by-price__wishlist ${
              isLiked ? 'custom-section-shop-by-price__wishlist--liked' : ''
            }"
            data-wishlist-btn
            data-product-id="${product.id}"
            aria-label="Add to wishlist"
          >
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_12_4822)">
                <mask id="mask0_12_4822" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="19" height="19">
                  <path d="M18.7554 0H0V18.7554H18.7554V0Z" fill="white"/>
                </mask>
                <g mask="url(#mask0_12_4822)">
                  <path d="M16.0901 3.88421C16.7778 4.65787 17.192 5.67378 17.192 6.79129C17.192 12.2616 12.128 15.4891 9.86175 16.2706C9.59605 16.3643 9.15842 16.3643 8.89272 16.2706C6.62645 15.4891 1.5625 12.2616 1.5625 6.79129C1.5625 4.37654 3.50837 2.42285 5.90749 2.42285C7.32978 2.42285 8.58795 3.11055 9.37724 4.17335C10.1665 3.11055 11.4325 2.42285 12.847 2.42285" stroke="#183754" stroke-width="1.25036" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
              </g>
              <defs>
                <clipPath id="clip0_12_4822">
                  <rect width="18.7554" height="18.7554" fill="white"/>
                </clipPath>
              </defs>
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
      } else if (width <= 1024) {
        this.visibleCards = 4;
      } else {
        this.visibleCards = 5;
      }
      this.updateArrowStates();
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
        const tabCenter = tab.offsetLeft + (tabRect.width / 2);
        const containerCenter = containerRect.width / 2;
        const scrollPosition = tabCenter - containerCenter;

        // Smooth scroll the container
        tabsContainer.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: 'smooth'
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

      // Fade out current products
      await this.fadeOutProducts();

      // Show loading state
      this.showLoading();

      // Fetch and display new products
      const products = await ProductFetcher.fetchByPriceRange(minPrice, maxPrice);
      this.renderProducts(products);

      // Update Shop All button
      this.updateShopAllButton(products.length, minPrice, maxPrice);

      // Fade in new products
      this.fadeInProducts();

      // Reset carousel position
      if (this.carousel) {
        this.carousel.reset();
      }
    }

    showLoading() {
      this.productsContainer.innerHTML = '<div class="custom-section-shop-by-price__loading">Loading products...</div>';
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

      const html = products.map((product) => renderProductCard(product)).join('');
      this.productsContainer.innerHTML = html;

      // Attach wishlist button listeners
      this.attachWishlistListeners();

      // Update carousel arrow states
      if (this.carousel) {
        this.carousel.updateArrowStates();
      }
    }

    attachWishlistListeners() {
      const wishlistButtons = this.productsContainer.querySelectorAll('[data-wishlist-btn]');

      wishlistButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          const productId = button.dataset.productId;
          const isNowLiked = WishlistManager.toggle(productId);

          // Animate the button
          animateWishlistToggle(button);

          // Update button appearance
          if (isNowLiked) {
            button.classList.add('custom-section-shop-by-price__wishlist--liked');
          } else {
            button.classList.remove('custom-section-shop-by-price__wishlist--liked');
          }
        });
      });
    }

    updateShopAllButton(productCount, minPrice, maxPrice) {
      if (!this.ctaContainer || !this.shopAllLink) return;

      if (productCount > CONFIG.PRODUCTS_PER_PAGE) {
        this.ctaContainer.style.display = 'block';
        this.shopAllLink.href = `/collections/all?filter.v.price.gte=${minPrice / 100}&filter.v.price.lt=${
          maxPrice / 100
        }`;
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
