class HeroFiveProductCarousel {
  constructor(section) {
    this.section = section;
    this.track = section.querySelector('[data-carousel-track]');
    this.prevButton = section.querySelector('[data-carousel-prev]');
    this.nextButton = section.querySelector('[data-carousel-next]');

    if (!this.track || !this.prevButton || !this.nextButton) {
      this.initScrollAnimation();
      return;
    }

    this.init();
  }

  init() {
    this.prevButton.addEventListener('click', () => this.scrollPrev());
    this.nextButton.addEventListener('click', () => this.scrollNext());

    this.track.addEventListener('scroll', () => this.updateArrowsVisibility());

    this.updateArrowsVisibility();

    this.initScrollAnimation();
  }

  initScrollAnimation() {
    if (window.innerWidth < 1250) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.section.classList.contains('custom-section-hero-five-product--animate')) {
            this.section.classList.add('custom-section-hero-five-product--animate');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(this.section);
  }

  getCardWidth() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1250) {
      return 280;
    } else if (screenWidth >= 768) {
      return 240;
    } else if (screenWidth >= 480) {
      return 200;
    } else {
      return 180;
    }
  }

  scrollPrev() {
    const cardWidth = this.getCardWidth();
    const gap = 10;
    const scrollAmount = cardWidth + gap;
    const currentScroll = this.track.scrollLeft;
    const maxScroll = this.track.scrollWidth - this.track.clientWidth;

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

    if (scrollLeft <= 0) {
      this.prevButton.setAttribute('disabled', '');
    } else {
      this.prevButton.removeAttribute('disabled');
    }

    if (scrollLeft >= maxScroll - 1) {
      this.nextButton.setAttribute('disabled', '');
    } else {
      this.nextButton.removeAttribute('disabled');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.custom-section-hero-five-product');
  sections.forEach(section => new HeroFiveProductCarousel(section));
});

if (window.Shopify && Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    const section = event.target.querySelector('.custom-section-hero-five-product');
    if (section) {
      new HeroFiveProductCarousel(section);
    }
  });
}
