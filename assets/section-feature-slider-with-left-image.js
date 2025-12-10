// TODO: Initialize Feature Slider with Left Image functionality
document.addEventListener('DOMContentLoaded', () => {
  
  class FeatureSliderWithLeftImage {
    constructor(container) {
      this.container = container;
      this.sectionId = container.dataset.sectionId;
      this.carouselContainer = container.querySelector('[data-carousel-container]');
      this.navButton = container.querySelector('[data-direction="next"]');
      this.wishlistButtons = container.querySelectorAll('[data-product-id]');
      this.cards = container.querySelectorAll('.custom-section-feature-slider-with-left-image__card');
      
      this.currentIndex = 0;
      this.isAnimating = false;
      this.direction = 'next';
      this.visibleCards = 3;
      this.offsetCard = false;
      
      this.init();
    }

    init() {
      try {
        if (!this.carouselContainer || !this.navButton || this.cards.length === 0) {
          // TODO: debugging missing elements
          console.log('Feature slider elements not found, skipping initialization');
          return;
        }

        this.setCardWidths();
        this.bindEvents();
        this.updateNavButton();
        
        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => this.handleResize(), 250);
        });

        // TODO: debugging initialization complete
        console.log('Feature slider initialized with', this.cards.length, 'products');
      } catch (error) {
        console.error('Error initializing feature slider:', error);
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
        console.log('Viewport:', viewportWidth, 'Visible cards:', visibleCards, 'Offset:', offsetCard);
      } catch (error) {
        console.error('Error setting card widths:', error);
      }
    }

    bindEvents() {
      try {
        if (this.navButton) {
          this.navButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigate();
          });
        }

        // Wishlist button animation only (functionality to be implemented later)
        this.wishlistButtons.forEach(button => {
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

    navigate() {
      try {
        if (this.isAnimating || this.cards.length <= this.visibleCards) {
          return;
        }
        
        // Calculate max index to show all slides entirely with space for last one
        let maxIndex;
        if (this.offsetCard) {
          // For 1250-1440px: Allow scrolling until last card is in 2nd position (fully visible)
          // With 5 cards: positions 0,1,2,3 where 3 puts card 5 in 2nd position (cards 4,5,empty)
          maxIndex = this.cards.length - 2;
        } else {
          // For other viewports: Standard behavior - show all cards fully
          maxIndex = this.cards.length - this.visibleCards;
        }

        if (this.direction === 'next') {
          if (this.currentIndex < maxIndex) {
            this.currentIndex += 1;
          }
        } else if (this.direction === 'prev') {
          if (this.currentIndex > 0) {
            this.currentIndex -= 1;
          }
        }

        this.animateCarousel();
        this.updateNavButton();

        // TODO: debugging navigation
        console.log('Navigate:', this.direction, 'Index:', this.currentIndex, 'Max:', maxIndex, 'Offset:', this.offsetCard, 'Total cards:', this.cards.length);
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
            }
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

    updateNavButton() {
      try {
        if (!this.navButton) return;

        // Calculate max index based on viewport
        let maxIndex;
        if (this.offsetCard) {
          maxIndex = this.cards.length - 2; // Last card in 2nd position
        } else {
          maxIndex = this.cards.length - this.visibleCards;
        }
        
        const isAtEnd = this.currentIndex >= maxIndex;
        const isAtStart = this.currentIndex <= 0;
        
        if (isAtEnd) {
          // At end - arrow points left, direction becomes 'prev'
          this.direction = 'prev';
          this.navButton.setAttribute('aria-label', 'Previous Products');
          
          if (typeof gsap !== 'undefined') {
            gsap.to(this.navButton, {
              rotation: 180,
              duration: 0.4,
              ease: 'power2.inOut'
            });
          } else {
            this.navButton.style.transform = 'rotate(180deg)';
          }
        } else if (isAtStart && this.direction === 'prev') {
          // At start after going backwards - arrow points right, direction becomes 'next'
          this.direction = 'next';
          this.navButton.setAttribute('aria-label', 'Next Products');
          
          if (typeof gsap !== 'undefined') {
            gsap.to(this.navButton, {
              rotation: 0,
              duration: 0.4,
              ease: 'power2.inOut'
            });
          } else {
            this.navButton.style.transform = 'rotate(0deg)';
          }
        }
        
        // TODO: debugging arrow state
        console.log('Arrow update:', 'Direction:', this.direction, 'AtEnd:', isAtEnd, 'AtStart:', isAtStart, 'Index:', this.currentIndex, 'Max:', maxIndex);
      } catch (error) {
        console.error('Error updating nav button:', error);
      }
    }

    animateWishlistButton(event) {
      try {
        const button = event.currentTarget;
        const productHandle = button.dataset.productHandle;

        // Animation - scale effect (as specified in docs)
        if (typeof gsap !== 'undefined') {
          gsap.timeline()
            .to(button, { scale: 0.9, duration: 0.15 }, 0)
            .to(button, { scale: 1, duration: 0.15 }, 0.15);
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
          console.log('maxIndex:', maxIndex);
        } else {
          maxIndex = this.cards.length - this.visibleCards;
        }
        
        // Ensure current index doesn't exceed new max
        this.currentIndex = Math.min(oldIndex, maxIndex);
        this.direction = 'next'; // Reset to next on resize
        
        this.animateCarousel();
        this.updateNavButton();
      } catch (error) {
        console.error('Error handling resize:', error);
      }
    }
  }

  // Initialize all feature slider sections
  const initFeatureSliders = () => {
    try {
      const sections = document.querySelectorAll('.custom-section-feature-slider-with-left-image[data-section-id]');
      
      sections.forEach(section => {
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