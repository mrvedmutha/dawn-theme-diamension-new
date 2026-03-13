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
    this.updateArrowVisibility();

    if (window.WishlistManager) {
      window.WishlistManager.initializeButtons();
    }
  }

  setupCarousel() {
    if (!this.wrapper || !this.leftArrow || !this.rightArrow) return;

    this.leftArrow.addEventListener('click', () => {
      this.scrollCarousel('left');
    });

    this.rightArrow.addEventListener('click', () => {
      this.scrollCarousel('right');
    });

    this.wrapper.addEventListener('scroll', () => {
      this.updateArrowVisibility();
    });

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

    if (scrollLeft <= 0) {
      this.leftArrow?.classList.add('is-hidden');
    } else {
      this.leftArrow?.classList.remove('is-hidden');
    }

    if (scrollLeft >= maxScroll - 1) {
      this.rightArrow?.classList.add('is-hidden');
    } else {
      this.rightArrow?.classList.remove('is-hidden');
    }
  }

}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRelatedProducts);
} else {
  initRelatedProducts();
}

function initRelatedProducts() {
  const containers = document.querySelectorAll('.custom-section-related-products');

  if (containers.length === 0) {
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
