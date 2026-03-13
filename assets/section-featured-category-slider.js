document.addEventListener('DOMContentLoaded', () => {
  const initFeaturedCategorySlider = () => {
    try {
      const sections = document.querySelectorAll('.custom-section-featured-category-slider');

      sections.forEach((section) => {
        new FeaturedCategorySlider(section);
      });
    } catch (error) {
      console.error('Error initializing Featured Category Slider:', error);
    }
  };

  class FeaturedCategorySlider {
    constructor(section) {
      this.section = section;
      this.sectionId = section.dataset.sectionId;
      this.enableAnimations = section.dataset.enableAnimations === 'true';

      this.videoContainer = section.querySelector('.custom-section-featured-category-slider__video-container');
      this.video = section.querySelector('.custom-section-featured-category-slider__video');
      this.videoEmbed = section.querySelector('.custom-section-featured-category-slider__video-embed');
      this.fallbackImage = section.querySelector('.custom-section-featured-category-slider__fallback-image');
      this.categoryNames = section.querySelectorAll('.custom-section-featured-category-slider__category-name');
      this.shopNowBtns = section.querySelectorAll('.custom-section-featured-category-slider__shop-now-btn');
      this.nextBtn = section.querySelector('.custom-section-featured-category-slider__next-btn');
      this.currentSlideEl = section.querySelector('.custom-section-featured-category-slider__current-slide');
      this.totalSlidesEl = section.querySelector('.custom-section-featured-category-slider__total-slides');
      this.progressBarFill = section.querySelector('.custom-section-featured-category-slider__progress-bar-fill');
      this.categoryTitleMobile = section.querySelector(
        '.custom-section-featured-category-slider__category-title-mobile',
      );
      this.categoryDescriptionMobile = section.querySelector(
        '.custom-section-featured-category-slider__category-description-mobile',
      );
      this.viewCollectionBtn = section.querySelector('.custom-section-featured-category-slider__view-collection-btn');

      this.categoriesData = this.getCategoriesData();
      this.currentCategoryId = 1;
      this.totalCategories = this.categoriesData.length;
      this.isAnimating = false;
      this.isMobile = window.innerWidth <= 1024;
      this.hoverTimeout = null;
      this.pendingCategoryId = null;

      this.init();
    }

    init() {
      try {
        if (this.categoriesData.length === 0) {
          return;
        }

        this.setupEventListeners();
        this.setupResponsiveHandling();
        this.setActiveCategory(1, false);

        if (this.isMobile) {
          this.updateMobileCounter();
          this.updateProgressBar();
        }
      } catch (error) {
        console.error('Error initializing Featured Category Slider:', error);
      }
    }

    getCategoriesData() {
      try {
        const dataScript = this.section.querySelector('[data-categories-data]');
        if (!dataScript) return [];

        const jsonData = dataScript.textContent.trim();
        return jsonData ? JSON.parse(jsonData) : [];
      } catch (error) {
        console.error('Error parsing categories data:', error);
        return [];
      }
    }

    setupEventListeners() {
      this.categoryNames.forEach((categoryName) => {
        categoryName.addEventListener('mouseenter', (e) => {
          if (!this.isMobile) {
            const categoryId = parseInt(e.target.dataset.categoryId);
            this.handleHoverStart(categoryId);
          }
        });

        categoryName.addEventListener('mouseleave', (e) => {
          if (!this.isMobile) {
            this.handleHoverEnd();
          }
        });

        categoryName.addEventListener('keydown', (e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !this.isMobile) {
            e.preventDefault();
            const categoryId = parseInt(e.target.dataset.categoryId);
            this.setActiveCategory(categoryId, true);
          }
        });
      });

      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          if (this.isMobile && !this.isAnimating) {
            this.goToNextSlide();
          }
        });
      }

      if (this.video) {
        this.video.addEventListener('error', () => {
          this.handleVideoError();
        });

        this.video.addEventListener('loadstart', () => {
          this.video.classList.add('is-loading');
        });

        this.video.addEventListener('loadeddata', () => {
          this.video.classList.remove('is-loading');
        });

        this.video.addEventListener('canplay', () => {
          this.video.classList.remove('is-loading');
        });
      }
    }

    setupResponsiveHandling() {
      const handleResize = () => {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 1024;

        if (wasMobile !== this.isMobile) {
          this.setActiveCategory(1, false);

          if (this.isMobile) {
            this.updateMobileCounter();
            this.updateProgressBar();
          }
        }
      };

      window.addEventListener('resize', this.debounce(handleResize, 250));
    }

    handleHoverStart(categoryId) {
      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout);
      }

      this.pendingCategoryId = categoryId;

      this.hoverTimeout = setTimeout(() => {
        if (this.pendingCategoryId === categoryId && !this.isAnimating) {
          this.setActiveCategory(categoryId, true);
        }
      }, 50);
    }

    handleHoverEnd() {
      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = null;
      }
    }

    setActiveCategory(categoryId, animate = true) {
      try {
        const category = this.categoriesData.find((c) => c.id === categoryId);
        if (!category) return;

        if (this.isAnimating && animate) {
          this.pendingCategoryId = categoryId;
          return;
        }

        this.currentCategoryId = categoryId;

        this.updateCategoryActiveState(categoryId);

        this.updateBackgroundMedia(category, animate);

        this.updateButtons(category);
        this.updateMobileContent(category);

        if (this.isMobile) {
          this.updateMobileCounter();
          this.updateProgressBar();
        } else {
          this.updateButtonPositions(categoryId, animate);
        }
      } catch (error) {
        console.error('Error setting active category:', error);
      }
    }

    updateCategoryActiveState(categoryId) {
      this.categoryNames.forEach((name) => {
        const nameId = parseInt(name.dataset.categoryId);
        if (nameId === categoryId) {
          name.classList.add('custom-section-featured-category-slider__category-name--active');
        } else {
          name.classList.remove('custom-section-featured-category-slider__category-name--active');
        }
      });
    }

    updateBackgroundMedia(category, animate) {
      const videoFile = category.videoFile;
      const videoDirectUrl = category.videoDirectUrl;
      const videoYouTubeVimeo = category.videoYouTubeVimeo;
      const fallbackSrc = category.fallbackImage;

      const directVideoSrc = videoFile || videoDirectUrl;

      if (this.video && directVideoSrc) {
        this.showVideoElement();

        if (animate && this.enableAnimations && typeof gsap !== 'undefined') {
          this.isAnimating = true;

          const tl = gsap.timeline({
            onComplete: () => {
              this.isAnimating = false;
              if (this.pendingCategoryId && this.pendingCategoryId !== this.currentCategoryId) {
                const pendingId = this.pendingCategoryId;
                this.pendingCategoryId = null;
                this.setActiveCategory(pendingId, true);
              }
            },
          });

          tl.to(this.video, {
            opacity: 0,
            duration: 0.15,
            ease: 'power2.in',
          })
            .call(() => {
              if (this.videoContainer) {
                this.videoContainer.classList.add('is-loading');
              }
              this.video.classList.add('is-loading');

              const source = this.video.querySelector('source') || document.createElement('source');
              source.src = directVideoSrc;
              source.type = directVideoSrc.includes('.webm') ? 'video/webm' : 'video/mp4';

              if (!this.video.querySelector('source')) {
                this.video.appendChild(source);
              }

              this.video.load();

              const onMetadataLoaded = () => {
                if (this.videoContainer) {
                  this.videoContainer.classList.remove('is-loading');
                }
                this.video.classList.remove('is-loading');
                this.video.play().catch(() => {
                  this.handleVideoError();
                });
              };

              if (this.video.readyState >= 1) {
                onMetadataLoaded();
              } else {
                this.video.addEventListener('loadedmetadata', onMetadataLoaded, { once: true });
              }
            })
            .to(this.video, {
              opacity: 1,
              duration: 0.25,
              ease: 'power2.out',
            });
        } else {
          this.video.style.opacity = '0';
          if (this.videoContainer) {
            this.videoContainer.classList.add('is-loading');
          }
          this.video.classList.add('is-loading');

          const source = this.video.querySelector('source') || document.createElement('source');
          source.src = directVideoSrc;
          source.type = directVideoSrc.includes('.webm') ? 'video/webm' : 'video/mp4';

          if (!this.video.querySelector('source')) {
            this.video.appendChild(source);
          }

          this.video.load();

          const onMetadataLoaded = () => {
            if (this.videoContainer) {
              this.videoContainer.classList.remove('is-loading');
            }
            this.video.classList.remove('is-loading');
            this.video.style.opacity = '1';
            this.video.play().catch(() => {
              this.handleVideoError();
            });
          };

          if (this.video.readyState >= 1) {
            onMetadataLoaded();
          } else {
            this.video.addEventListener('loadedmetadata', onMetadataLoaded, { once: true });
          }
        }
      } else if (this.videoEmbed && videoYouTubeVimeo) {
        this.showEmbedElement();

        if (animate && this.enableAnimations && typeof gsap !== 'undefined') {
          this.isAnimating = true;

          const tl = gsap.timeline({
            onComplete: () => {
              this.isAnimating = false;
              if (this.pendingCategoryId && this.pendingCategoryId !== this.currentCategoryId) {
                const pendingId = this.pendingCategoryId;
                this.pendingCategoryId = null;
                this.setActiveCategory(pendingId, true);
              }
            },
          });

          tl.to(this.videoEmbed, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut',
          })
            .call(() => {})
            .to(this.videoEmbed, {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.inOut',
            });
        }
      } else if (this.fallbackImage && fallbackSrc) {
        this.showFallbackImage();
        this.fallbackImage.src = fallbackSrc;
        this.fallbackImage.alt = category.name;
      }
    }

    showVideoElement() {
      if (this.video) this.video.style.display = 'block';
      if (this.videoEmbed) this.videoEmbed.style.display = 'none';
      if (this.fallbackImage) this.fallbackImage.style.display = 'none';
    }

    showEmbedElement() {
      if (this.video) this.video.style.display = 'none';
      if (this.videoEmbed) this.videoEmbed.style.display = 'block';
      if (this.fallbackImage) this.fallbackImage.style.display = 'none';
    }

    showFallbackImage() {
      if (this.video) this.video.style.display = 'none';
      if (this.videoEmbed) this.videoEmbed.style.display = 'none';
      if (this.fallbackImage) this.fallbackImage.style.display = 'block';
    }

    updateButtons(category) {
      this.shopNowBtns.forEach((btn) => {
        btn.href = category.collectionUrl;
        btn.dataset.collectionUrl = category.collectionUrl;
      });
    }

    updateMobileContent(category) {
      if (this.categoryTitleMobile) {
        this.categoryTitleMobile.textContent = category.name.toUpperCase();
      }

      if (this.categoryDescriptionMobile) {
        this.categoryDescriptionMobile.textContent = category.description;
      }

      if (this.viewCollectionBtn) {
        this.viewCollectionBtn.href = category.collectionUrl;
      }
    }

    updateButtonPositions(categoryId, animate) {
      if (this.isMobile) return;

      const categoryElement = this.section.querySelector(`[data-category-id="${categoryId}"]`);
      const categoryNamesContainer = this.section.querySelector(
        '.custom-section-featured-category-slider__category-names',
      );

      if (!categoryElement || !categoryNamesContainer) return;

      const containerRect = categoryNamesContainer.getBoundingClientRect();
      const categoryRect = categoryElement.getBoundingClientRect();

      const containerCenter = containerRect.top + containerRect.height / 2;
      const categoryTop = categoryRect.top;
      const offsetFromCenter = categoryTop - containerCenter;

      this.shopNowBtns.forEach((btn) => {
        const btnRect = btn.getBoundingClientRect();
        const finalOffset = offsetFromCenter + btnRect.height / 2;

        if (animate && this.enableAnimations && typeof gsap !== 'undefined') {
          gsap.to(btn, {
            y: finalOffset,
            duration: 0.5,
            ease: 'power2.inOut',
          });
        } else {
          btn.style.transform = `translateY(calc(-50% + ${finalOffset}px))`;
        }
      });
    }

    goToNextSlide() {
      try {
        const nextId = this.currentCategoryId >= this.totalCategories ? 1 : this.currentCategoryId + 1;
        this.setActiveCategory(nextId, true);
      } catch (error) {
        console.error('Error going to next slide:', error);
      }
    }

    updateMobileCounter() {
      if (this.currentSlideEl) {
        this.currentSlideEl.textContent = String(this.currentCategoryId).padStart(2, '0');
      }

      if (this.totalSlidesEl) {
        this.totalSlidesEl.textContent = String(this.totalCategories).padStart(2, '0');
      }
    }

    updateProgressBar() {
      if (!this.progressBarFill || this.totalCategories === 0) return;

      const segmentWidth = 100 / this.totalCategories;
      const translatePosition = (this.currentCategoryId - 1) * 100;

      if (this.enableAnimations && typeof gsap !== 'undefined') {
        gsap.set(this.progressBarFill, {
          width: segmentWidth + '%',
        });

        gsap.to(this.progressBarFill, {
          x: translatePosition + '%',
          duration: 0.6,
          ease: 'power2.inOut',
        });
      } else {
        this.progressBarFill.style.width = segmentWidth + '%';
        this.progressBarFill.style.transform = `translate(${translatePosition}%, 0px)`;
      }
    }

    handleVideoError() {
      try {
        if (this.video) {
          this.video.style.display = 'none';
        }

        if (this.fallbackImage) {
          this.fallbackImage.style.display = 'block';
        }
      } catch (error) {
        console.error('Error handling video error:', error);
      }
    }

    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    updateSettings(newSettings) {
      try {
        this.enableAnimations = newSettings.enableAnimations;
        this.setActiveCategory(this.currentCategoryId, false);
      } catch (error) {
        console.error('Error updating settings:', error);
      }
    }
  }

  initFeaturedCategorySlider();

  if (typeof Shopify !== 'undefined' && Shopify.designMode) {
    document.addEventListener('shopify:section:load', (e) => {
      if (e.target.classList.contains('custom-section-featured-category-slider')) {
        initFeaturedCategorySlider();
      }
    });

    document.addEventListener('shopify:section:unload', (e) => {});

    document.addEventListener('shopify:section:select', (e) => {
      if (e.target.classList.contains('custom-section-featured-category-slider')) {
        // Handle section selection in theme editor
      }
    });
  }
});
