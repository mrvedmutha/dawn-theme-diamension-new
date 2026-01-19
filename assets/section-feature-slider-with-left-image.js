// TODO: Initialize Feature Slider with Left Image functionality
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
          console.log('Feature slider elements not found, skipping initialization');
          return;
        }

        this.setCardWidths();
        this.bindEvents();
        this.updateNavButtons();
        this.initAnimations();

        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => this.handleResize(), 250);
        });
      } catch (error) {
        console.error('Error initializing feature slider:', error);
      }
    }

    initAnimations() {
      // Only run animations on desktop (>= 1250px)
      const isDesktop = window.innerWidth >= 1250;
      if (!isDesktop || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        // For tablet and mobile, try card animations only
        this.initCardStaggerAnimation();
        return;
      }

      try {
        gsap.registerPlugin(ScrollTrigger);

        // Parallax for sidebar image (y-axis only, no zoom) - DESKTOP ONLY
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
            }
          );
        }

        // Card stagger animation for desktop
        this.initCardStaggerAnimation();
      } catch (error) {
        console.error('Error initializing animations:', error);
      }
    }

    // Separate function for card stagger animation - can be used on all devices
    initCardStaggerAnimation() {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return;
      }

      try {
        gsap.registerPlugin(ScrollTrigger);

        // Stagger animation for cards - sliding from right to left with rotation (/ to |)
        this.cards.forEach((card, index) => {
          // Set initial state - off to the right, slanted left (/)
          gsap.set(card, {
            x: 100,
            rotation: -10,
          });

          // Animate to normal position - straight up (|)
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
        console.error('Error initializing card stagger animation:', error);
      }
    }

    setCardWidths() {
      try {
        const viewportWidth = window.innerWidth;
        let visibleCards = 3;
        let offsetCard = false;

        if (viewportWidth <= 767) {
          // Mobile: 2 full cards, no offset
          visibleCards = 2;
          offsetCard = false;
        } else if (viewportWidth >= 768 && viewportWidth <= 1249) {
          // Tablet: 3 full cards, no offset
          visibleCards = 3;
          offsetCard = false;
        } else if (viewportWidth >= 1250) {
          // Desktop 1250px+: 2 full + 1 offset (3rd as offset) - allows last card to reach 2nd position
          visibleCards = 2;
          offsetCard = true;
        }

        this.visibleCards = visibleCards;
        this.offsetCard = offsetCard;

        // TODO: debugging viewport settings
        // console.log('Viewport:', viewportWidth, 'Visible cards:', visibleCards, 'Offset:', offsetCard);
      } catch (error) {
        console.error('Error setting card widths:', error);
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

        // Wishlist button animation only (functionality to be implemented later)
        this.wishlistButtons.forEach((button) => {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.animateWishlistButton(e);
          });
        });
      } catch (error) {
        console.error('Error binding events:', error);
      }
    }

    navigate(direction) {
      try {
        if (this.isAnimating || this.cards.length <= this.visibleCards) {
          return;
        }

        // Calculate max index
        let maxIndex;
        if (this.offsetCard) {
          maxIndex = this.cards.length - 2;
        } else {
          maxIndex = this.cards.length - this.visibleCards;
        }

        // Update index based on direction
        if (direction === 'next' && this.currentIndex < maxIndex) {
          this.currentIndex += 1;
        } else if (direction === 'prev' && this.currentIndex > 0) {
          this.currentIndex -= 1;
        }

        this.animateCarousel();
        this.updateNavButtons();
      } catch (error) {
        console.error('Error in navigation:', error);
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

        // Use GSAP if available, otherwise fallback to CSS transition
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
          // Fallback to CSS transition
          this.carouselContainer.style.transform = `translateX(${distance}px)`;
          setTimeout(() => {
            this.isAnimating = false;
            this.carouselContainer.classList.remove('is-animating');
          }, 800);
        }
      } catch (error) {
        console.error('Error animating carousel:', error);
        this.isAnimating = false;
        this.carouselContainer.classList.remove('is-animating');
      }
    }

    updateNavButtons() {
      try {
        if (!this.prevButton || !this.nextButton) return;

        // Calculate max index
        let maxIndex;
        if (this.offsetCard) {
          maxIndex = this.cards.length - 2;
        } else {
          maxIndex = this.cards.length - this.visibleCards;
        }

        const isAtStart = this.currentIndex <= 0;
        const isAtEnd = this.currentIndex >= maxIndex;

        // Disable/enable prev button
        if (isAtStart) {
          this.prevButton.setAttribute('disabled', 'true');
          this.prevButton.style.opacity = '0.5';
          this.prevButton.style.cursor = 'not-allowed';
        } else {
          this.prevButton.removeAttribute('disabled');
          this.prevButton.style.opacity = '1';
          this.prevButton.style.cursor = 'pointer';
        }

        // Disable/enable next button
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
        console.error('Error updating nav buttons:', error);
      }
    }

    animateWishlistButton(event) {
      try {
        const button = event.currentTarget;
        const productHandle = button.dataset.productHandle;

        // Animation - scale effect (as specified in docs)
        if (typeof gsap !== 'undefined') {
          gsap.timeline().to(button, { scale: 0.9, duration: 0.15 }, 0).to(button, { scale: 1, duration: 0.15 }, 0.15);
        } else {
          // Fallback CSS animation
          button.style.transform = 'scale(0.9)';
          setTimeout(() => {
            button.style.transform = 'scale(1)';
          }, 150);
        }

        // TODO: debugging wishlist button clicked (functionality to be implemented later)
        console.log('Wishlist button clicked for product:', productHandle);
        console.log('Note: Wishlist functionality marked as "To Implement Later" in technical spec');
      } catch (error) {
        console.error('Error animating wishlist button:', error);
      }
    }

    handleResize() {
      try {
        const oldIndex = this.currentIndex;
        this.setCardWidths();

        // Calculate new max index
        let maxIndex;
        if (this.offsetCard) {
          maxIndex = this.cards.length - 2;
        } else {
          maxIndex = this.cards.length - this.visibleCards;
        }

        // Ensure current index doesn't exceed new max
        this.currentIndex = Math.min(oldIndex, maxIndex);

        this.animateCarousel();
        this.updateNavButtons();
      } catch (error) {
        console.error('Error handling resize:', error);
      }
    }
  }

  // Initialize all feature slider sections
  const initFeatureSliders = () => {
    try {
      const sections = document.querySelectorAll('.custom-section-feature-slider-with-left-image[data-section-id]');

      sections.forEach((section) => {
        new FeatureSliderWithLeftImage(section);
      });

      if (sections.length === 0) {
        // TODO: debugging no sections found
        console.log('No feature slider sections found on page');
      }
    } catch (error) {
      console.error('Error initializing feature sliders:', error);
    }
  };

  // Initialize on DOM ready
  initFeatureSliders();

  // Re-initialize on Shopify section load (theme editor)
  document.addEventListener('shopify:section:load', (event) => {
    try {
      if (event.detail.sectionId) {
        const section = document.querySelector(`[data-section-id="${event.detail.sectionId}"]`);
        if (section && section.classList.contains('custom-section-feature-slider-with-left-image')) {
          new FeatureSliderWithLeftImage(section);
        }
      }
    } catch (error) {
      console.error('Error reinitializing feature slider on section load:', error);
    }
  });

  // TODO: Wishlist functionality to be implemented later as per technical specification
  // The documentation states: "JavaScript Functions (To Implement Later)"
  // This includes localStorage integration, state management, and UI updates
});
