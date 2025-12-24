/**
 * Hero Image + Five Product Carousel
 * Handles carousel navigation and arrow visibility
 */

class HeroFiveProductCarousel {
  constructor(section) {
    this.section = section;
    this.track = section.querySelector('[data-carousel-track]');
    this.prevButton = section.querySelector('[data-carousel-prev]');
    this.nextButton = section.querySelector('[data-carousel-next]');

    if (!this.track || !this.prevButton || !this.nextButton) return;

    this.init();
  }

  init() {
    // Bind navigation events
    this.prevButton.addEventListener('click', () => this.scrollPrev());
    this.nextButton.addEventListener('click', () => this.scrollNext());

    // Update arrow visibility on scroll
    this.track.addEventListener('scroll', () => this.updateArrowsVisibility());

    // Initial arrow state
    this.updateArrowsVisibility();
  }

  scrollPrev() {
    const cardWidth = 280;
    const gap = 10;
    const scrollAmount = cardWidth + gap;

    this.track.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollNext() {
    const cardWidth = 280;
    const gap = 10;
    const scrollAmount = cardWidth + gap;

    this.track.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  updateArrowsVisibility() {
    const scrollLeft = this.track.scrollLeft;
    const maxScroll = this.track.scrollWidth - this.track.clientWidth;

    // Hide left arrow if at start
    if (scrollLeft <= 0) {
      this.prevButton.setAttribute('disabled', '');
    } else {
      this.prevButton.removeAttribute('disabled');
    }

    // Hide right arrow if at end
    if (scrollLeft >= maxScroll - 1) { // -1 for floating point tolerance
      this.nextButton.setAttribute('disabled', '');
    } else {
      this.nextButton.removeAttribute('disabled');
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.custom-section-hero-five-product');
  sections.forEach(section => new HeroFiveProductCarousel(section));
});

// Re-initialize on Shopify section load (theme editor support)
if (window.Shopify && Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    const section = event.target.querySelector('.custom-section-hero-five-product');
    if (section) {
      new HeroFiveProductCarousel(section);
    }
  });
}
