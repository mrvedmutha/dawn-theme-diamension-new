document.addEventListener('DOMContentLoaded', () => {
  class FeatureSliderWithLeftImage {
    constructor(container) {
      this.container = container;
      this.sectionId = container.dataset.sectionId;
      this.carouselContainer = container.querySelector('[data-carousel-container]');
      this.prevButton = container.querySelector('[data-direction="prev"]');
      this.nextButton = container.querySelector('[data-direction="next"]');
      this.wishlistButtons = container.querySelectorAll('[data-product-id]');
      this.cards = container.querySelectorAll('.custom-section-feature-slider-with-left-image__card');
      this.sidebarImage = container.querySelector('.custom-section-feature-slider-with-left-image__sidebar-image');

      this.currentIndex = 0;
      this.isAnimating = false;
      this.visibleCards = 3;
      this.offsetCard = false;

      this.init();
    }

    init() {
      try {
        if (!this.carouselContainer || !this.prevButton || !this.nextButton || this.cards.length === 0) {
          return;
        }

        this.setCardWidths();
        this.bindEvents();
        this.updateNavButtons();
        this.initAnimations();

        if (window.WishlistManager) {
          window.WishlistManager.initializeButtons();
        }

        let resizeTimeout;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => this.handleResize(), 250);
        });
      } catch (error) {
      }
    }

    initAnimations() {
      const isDesktop = window.innerWidth >= 1250;
      if (!isDesktop || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        this.initCardStaggerAnimation();
        return;
      }

      try {
        gsap.registerPlugin(ScrollTrigger);

        if (this.sidebarImage) {
          gsap.fromTo(
            this.sidebarImage,
            { y: -200 },
            {
              y: 200,
              ease: 'none',
              scrollTrigger: {
                trigger: this.container,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          );
        }

        this.initCardStaggerAnimation();
      } catch (error) {
      }
    }

    initCardStaggerAnimation() {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return;
      }

      try {
        gsap.registerPlugin(ScrollTrigger);

        this.cards.forEach((card, index) => {
          gsap.set(card, {
            x: 100,
            rotation: -10,
          });

          gsap.to(card, {
            x: 0,
            rotation: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: this.carouselContainer,
              start: 'top 80%',
              once: true,
            },
          });
        });
      } catch (error) {
      }
    }

    setCardWidths() {
      try {
        const viewportWidth = window.innerWidth;
        let visibleCards = 3;
        let offsetCard = false;

        if (viewportWidth <= 767) {
          visibleCards = 2;
          offsetCard = false;
        } else if (viewportWidth >= 768 && viewportWidth <= 1249) {
          visibleCards = 3;
          offsetCard = false;
        } else if (viewportWidth >= 1250) {
          visibleCards = 2;
          offsetCard = true;
        }

        this.visibleCards = visibleCards;
        this.offsetCard = offsetCard;
      } catch (error) {
      }
    }

    bindEvents() {
      try {
        if (this.prevButton) {
          this.prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigate('prev');
          });
        }

        if (this.nextButton) {
          this.nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigate('next');
          });
        }
      } catch (error) {
        console.error('Error binding navigation events:', error);
      }
    }

    navigate(direction) {
      try {
        if (this.isAnimating || this.cards.length <= this.visibleCards) {
          return;
        }

        let maxIndex;
        if (this.offsetCard) {
          maxIndex = this.cards.length - 2;
        } else {
          maxIndex = this.cards.length - this.visibleCards;
        }

        if (direction === 'next' && this.currentIndex < maxIndex) {
          this.currentIndex += 1;
        } else if (direction === 'prev' && this.currentIndex > 0) {
          this.currentIndex -= 1;
        }

        this.animateCarousel();
        this.updateNavButtons();
      } catch (error) {
        console.error('Error navigating carousel:', error);
      }
    }

    animateCarousel() {
      try {
        if (!this.carouselContainer || this.cards.length === 0) return;

        this.isAnimating = true;
        this.carouselContainer.classList.add('is-animating');

        const cardWidth = this.cards[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(this.carouselContainer).gap) || 24;
        const distance = -(this.currentIndex * (cardWidth + gap));

        if (typeof gsap !== 'undefined') {
          gsap.to(this.carouselContainer, {
            x: distance,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              this.isAnimating = false;
              this.carouselContainer.classList.remove('is-animating');
            },
          });
        } else {
          this.carouselContainer.style.transform = `translateX(${distance}px)`;
          setTimeout(() => {
            this.isAnimating = false;
            this.carouselContainer.classList.remove('is-animating');
          }, 800);
        }
      } catch (error) {
        this.isAnimating = false;
        this.carouselContainer.classList.remove('is-animating');
      }
    }

    updateNavButtons() {
      try {
        if (!this.prevButton || !this.nextButton) return;

        let maxIndex;
        if (this.offsetCard) {
          maxIndex = this.cards.length - 2;
        } else {
          maxIndex = this.cards.length - this.visibleCards;
        }

        const isAtStart = this.currentIndex <= 0;
        const isAtEnd = this.currentIndex >= maxIndex;

        if (isAtStart) {
          this.prevButton.setAttribute('disabled', 'true');
          this.prevButton.style.opacity = '0.5';
          this.prevButton.style.cursor = 'not-allowed';
        } else {
          this.prevButton.removeAttribute('disabled');
          this.prevButton.style.opacity = '1';
          this.prevButton.style.cursor = 'pointer';
        }

        if (isAtEnd) {
          this.nextButton.setAttribute('disabled', 'true');
          this.nextButton.style.opacity = '0.5';
          this.nextButton.style.cursor = 'not-allowed';
        } else {
          this.nextButton.removeAttribute('disabled');
          this.nextButton.style.opacity = '1';
          this.nextButton.style.cursor = 'pointer';
        }
      } catch (error) {
        console.error('Error updating navigation buttons:', error);
      }
    }

    handleResize() {
      try {
        const oldIndex = this.currentIndex;
        this.setCardWidths();

        let maxIndex;
        if (this.offsetCard) {
          maxIndex = this.cards.length - 2;
        } else {
          maxIndex = this.cards.length - this.visibleCards;
        }

        this.currentIndex = Math.min(oldIndex, maxIndex);

        this.animateCarousel();
        this.updateNavButtons();
      } catch (error) {
        console.error('Error handling resize:', error);
      }
    }
  }

  const initFeatureSliders = () => {
    try {
      const sections = document.querySelectorAll('.custom-section-feature-slider-with-left-image[data-section-id]');

      sections.forEach((section) => {
        new FeatureSliderWithLeftImage(section);
      });
    } catch (error) {
      console.error('Error initializing feature sliders:', error);
    }
  };

  initFeatureSliders();

  document.addEventListener('shopify:section:load', (event) => {
    try {
      if (event.detail.sectionId) {
        const section = document.querySelector(`[data-section-id="${event.detail.sectionId}"]`);
        if (section && section.classList.contains('custom-section-feature-slider-with-left-image')) {
          new FeatureSliderWithLeftImage(section);
        }
      }
    } catch (error) {
      console.error('Error loading section:', error);
    }
  });
});
