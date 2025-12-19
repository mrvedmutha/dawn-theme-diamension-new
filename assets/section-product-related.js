/**
 * Related Products Carousel
 * Handles carousel navigation and wishlist toggle animation
 */

class RelatedProductsCarousel {
  constructor(container) {
    this.container = container;
    this.wrapper = container.querySelector('[data-carousel-wrapper]');
    this.leftArrow = container.querySelector('[data-carousel-arrow="left"]');
    this.rightArrow = container.querySelector('[data-carousel-arrow="right"]');
    this.wishlistButtons = container.querySelectorAll('[data-wishlist-button]');

    this.init();
  }

  init() {
    this.setupCarousel();
    this.setupWishlist();
    this.updateArrowVisibility();
  }

  setupCarousel() {
    if (!this.wrapper || !this.leftArrow || !this.rightArrow) return;

    // Left arrow click
    this.leftArrow.addEventListener('click', () => {
      this.scrollCarousel('left');
    });

    // Right arrow click
    this.rightArrow.addEventListener('click', () => {
      this.scrollCarousel('right');
    });

    // Update arrow visibility on scroll
    this.wrapper.addEventListener('scroll', () => {
      this.updateArrowVisibility();
    });

    // Update on resize
    window.addEventListener('resize', () => {
      this.updateArrowVisibility();
    });
  }

  scrollCarousel(direction) {
    if (!this.wrapper) return;

    const cardWidth = this.wrapper.querySelector('.custom-section-related-products__card')?.offsetWidth || 260;
    const gap = parseInt(getComputedStyle(this.wrapper).gap) || 10;
    const scrollAmount = cardWidth + gap;

    if (direction === 'left') {
      this.wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      this.wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  updateArrowVisibility() {
    if (!this.wrapper) return;

    const scrollLeft = this.wrapper.scrollLeft;
    const maxScroll = this.wrapper.scrollWidth - this.wrapper.clientWidth;

    // Hide left arrow if at start
    if (scrollLeft <= 0) {
      this.leftArrow?.classList.add('is-hidden');
    } else {
      this.leftArrow?.classList.remove('is-hidden');
    }

    // Hide right arrow if at end
    if (scrollLeft >= maxScroll - 1) {
      // -1 for rounding errors
      this.rightArrow?.classList.add('is-hidden');
    } else {
      this.rightArrow?.classList.remove('is-hidden');
    }
  }

  setupWishlist() {
    // Attach individual listeners to each button
    this.wishlistButtons.forEach((button) => {
      button.addEventListener(
        'click',
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          // Toggle the active class
          button.classList.toggle('is-active');

          // Add animation
          button.style.transform = 'scale(0.85)';
          setTimeout(() => {
            button.style.transform = 'scale(1)';
          }, 150);
        },
        { capture: true }
      );
    });
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRelatedProducts);
} else {
  initRelatedProducts();
}

function initRelatedProducts() {
  const containers = document.querySelectorAll('.custom-section-related-products');

  if (containers.length === 0) {
    // Wait for product-recommendations to load
    const observer = new MutationObserver(() => {
      const newContainers = document.querySelectorAll('.custom-section-related-products');
      if (newContainers.length > 0) {
        observer.disconnect();
        newContainers.forEach((container) => {
          new RelatedProductsCarousel(container);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
      const delayedContainers = document.querySelectorAll('.custom-section-related-products');
      if (delayedContainers.length > 0) {
        observer.disconnect();
        delayedContainers.forEach((container) => {
          new RelatedProductsCarousel(container);
        });
      }
    }, 2000);
  } else {
    containers.forEach((container) => {});
  }
}
