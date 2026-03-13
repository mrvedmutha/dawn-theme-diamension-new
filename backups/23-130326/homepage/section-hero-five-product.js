/**
 * Hero Image + Five Product Carousel
 * Handles carousel navigation, arrow visibility, and scroll animations
 */

class HeroFiveProductCarousel {
  constructor(section) {
    this.section = section;
    this.track = section.querySelector('[data-carousel-track]');
    this.prevButton = section.querySelector('[data-carousel-prev]');
    this.nextButton = section.querySelector('[data-carousel-next]');

    if (!this.track || !this.prevButton || !this.nextButton) {
      // Initialize scroll animation even if carousel elements are missing
      this.initScrollAnimation();
      return;
    }

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

    // Initialize scroll animation
    this.initScrollAnimation();
  }

  initScrollAnimation() {
    // Only apply animations on desktop (1250px and above)
    if (window.innerWidth < 1250) return;

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When section becomes visible, add animation class
          if (entry.isIntersecting && !this.section.classList.contains('custom-section-hero-five-product--animate')) {
            this.section.classList.add('custom-section-hero-five-product--animate');
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: '0px 0px -100px 0px' // Start animation slightly before section is fully in view
      }
    );

    // Observe the section
    observer.observe(this.section);
  }

  getCardWidth() {
    // Get card width based on screen size
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1250) {
      return 280; // Desktop
    } else if (screenWidth >= 768) {
      return 240; // Tablet
    } else if (screenWidth >= 480) {
      return 200; // Mobile
    } else {
      return 180; // Small mobile
    }
  }

  scrollPrev() {
    const cardWidth = this.getCardWidth();
    const gap = 10;
    const scrollAmount = cardWidth + gap;
    const currentScroll = this.track.scrollLeft;
    const maxScroll = this.track.scrollWidth - this.track.clientWidth;

    // If we're at or near the end, scroll to show the last complete card
    if (currentScroll >= maxScroll - 5) {
      const targetScroll = Math.max(0, maxScroll - scrollAmount);
      this.track.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    } else {
      this.track.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  scrollNext() {
    const cardWidth = this.getCardWidth();
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
