/**
 * Custom Product Detail Section
 * Handles variant selection, add to cart, wishlist, and all interactive features
 */

(function () {
  'use strict';

  // Section initialization
  function initProductDetail() {
    const sections = document.querySelectorAll('[data-section-id]');

    sections.forEach((section) => {
      const sectionId = section.dataset.sectionId;
      const productData = window.productData[`product-${sectionId}`];

      if (!productData) {
        console.error('❌ No product data found for section:', sectionId);
        return;
      }

      // Section initialized

      // Initialize all features
      initThumbnailGallery(section, sectionId);
      initImageZoom(section);
      initImageModal(section, sectionId);
      initWishlist(section, productData);
      initVariantSelection(section, productData, sectionId);
      initAccordion(section);
      initQuantitySelector(section);
      initAddToCart(section, productData, sectionId);
      initBuyNow(section, productData);
      initSizeGuide(section, sectionId);
      formatInitialPrice(section);
      reorderOptionElements(section, productData);

      // Initialize media filtering based on default selected metal type
      try {
        const defaultMetalOption = section.querySelector('.custom-product-detail__metal-option--selected');

        if (defaultMetalOption && productData.media && productData.media.length > 0) {
          const defaultMetalType = defaultMetalOption.dataset.value;

          const filteredMedia = filterMediaByVariant(productData, defaultMetalType);

          if (filteredMedia && filteredMedia.length > 0) {
            updateMediaDisplay(section, sectionId, filteredMedia);
          }
        }
      } catch (error) {
        console.error('❌ Error during initial media filtering:', error);
        console.error('❌ Error stack:', error.stack);
        // Continue without media filtering
      }
    });
  }

  // ===== MEDIA FILTERING BASED ON VARIANT =====
  /**
   * Filter media (images + videos) based on selected metal type variant
   * NEW LOGIC:
   * 1. Find the FIRST image in media array that matches the variant
   * 2. From that position, continue collecting images SEQUENTIALLY as long as they match
   * 3. Stop when hitting a non-matching image
   * 4. Insert first video at position 3 of filtered array
   * 5. Append remaining videos at the end
   */
  function filterMediaByVariant(productData, selectedMetalType) {
    if (!productData.media || !selectedMetalType) {
      return productData.media || [];
    }

    // Get all variants with the selected metal type (option2)
    const matchingVariants = productData.variants.filter((v) => v.option2 === selectedMetalType);

    if (matchingVariants.length === 0) {
      return productData.media;
    }

    // Get variant featured image URLs and DEDUPLICATE
    const allVariantImageSrcs = matchingVariants
      .map((v) => v.featured_image_src)
      .filter((src) => src != null && typeof src === 'string');

    // Remove duplicates - multiple size variants may share the same image
    const variantImageSrcs = [...new Set(allVariantImageSrcs)];

    if (variantImageSrcs.length === 0) {
      return productData.media;
    }

    // Get ALL variant URLs from the entire product (all metal types)
    const allProductVariantUrls = productData.variants
      .map((v) => v.featured_image_src)
      .filter((src) => src != null && typeof src === 'string');
    const allNormalizedVariantUrls = [...new Set(allProductVariantUrls.map((url) => url.split('?')[0].replace(/^https?:/, '')))];

    // Normalize selected variant URLs for comparison
    const normalizedSelectedVariantUrls = variantImageSrcs.map((url) => url.split('?')[0].replace(/^https?:/, ''));

    // Find where the FIRST selected variant URL matches in product.media[]
    let matchStartIndex = -1;
    for (let i = 0; i < productData.media.length; i++) {
      const media = productData.media[i];
      if (media.media_type === 'image' && media.src && media.src.src) {
        const normalizedMediaUrl = media.src.src.split('?')[0].replace(/^https?:/, '');
        if (normalizedSelectedVariantUrls.includes(normalizedMediaUrl)) {
          matchStartIndex = i;
          break;
        }
      }
    }

    if (matchStartIndex === -1) {
      return productData.media;
    }

    // From match position, collect images sequentially
    // Stop when hitting an image that matches a DIFFERENT variant URL
    const matchedImages = [];

    for (let i = matchStartIndex; i < productData.media.length; i++) {
      const media = productData.media[i];

      // Only process images
      if (media.media_type !== 'image') {
        continue;
      }

      if (media.src && media.src.src) {
        const mediaSrc = media.src.src;
        const normalizedMediaUrl = mediaSrc.split('?')[0].replace(/^https?:/, '');

        // Check if this image matches ANY variant URL (any metal type)
        const matchesAnyVariant = allNormalizedVariantUrls.includes(normalizedMediaUrl);

        if (matchesAnyVariant) {
          // Check if it's OUR selected variant or a DIFFERENT one
          const matchesOurVariant = normalizedSelectedVariantUrls.includes(normalizedMediaUrl);

          if (matchesOurVariant) {
            matchedImages.push(media);
          } else {
            break; // Hit a different variant, stop collecting
          }
        } else {
          // Not a variant URL, so it's a generic/continuation image
          matchedImages.push(media);
        }
      }
    }

    if (matchedImages.length === 0) {
      return productData.media;
    }

    // Separate videos from all media
    const allVideos = productData.media.filter((m) => m.media_type === 'video' || m.media_type === 'external_video');

    // Build final filtered media array
    let filteredMedia = [...matchedImages];

    // Handle video insertion
    const firstVideo = allVideos.length > 0 ? allVideos[0] : null;
    const remainingVideos = allVideos.slice(1);

    // Insert first video at position 3 (index 2) if we have enough images
    if (firstVideo && filteredMedia.length >= 2) {
      filteredMedia.splice(2, 0, firstVideo);
    } else if (firstVideo) {
      filteredMedia.push(firstVideo);
    }

    // Append remaining videos at the end
    if (remainingVideos.length > 0) {
      filteredMedia = filteredMedia.concat(remainingVideos);
    }

    return filteredMedia;
  }

  /**
   * Update thumbnails and main media display with filtered media
   */
  function updateMediaDisplay(section, sectionId, filteredMedia) {
    try {
      const thumbnailsWrapper = section.querySelector('[data-thumbnails-wrapper]');
      const mainMedia = section.querySelector('[data-main-media]');

      if (!thumbnailsWrapper || !mainMedia) {
        console.error('  ❌ Thumbnails wrapper or main media not found');
        return;
      }

      if (!filteredMedia || filteredMedia.length === 0) {
        return;
      }

      // Clear existing thumbnails
      thumbnailsWrapper.innerHTML = '';

      // Create new thumbnails
      filteredMedia.forEach((media, index) => {
        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.className = 'custom-product-detail__thumbnail';
        if (index === 0) {
          thumbnailDiv.classList.add('custom-product-detail__thumbnail--active');
        }
        thumbnailDiv.dataset.mediaIndex = index;
        thumbnailDiv.dataset.mediaId = media.id;
        thumbnailDiv.dataset.mediaType = media.media_type;

        if (media.media_type === 'image') {
          const img = document.createElement('img');
          // For images, src is nested: media.src.src
          const imageSrc = media.src && media.src.src ? media.src.src : media.src;
          img.src = imageSrc.replace(/width=\d+/, 'width=100');
          img.alt = media.alt || 'Product image';
          img.loading = 'lazy';
          thumbnailDiv.appendChild(img);
        } else if (media.media_type === 'video' || media.media_type === 'external_video') {
          const videoThumb = document.createElement('div');
          videoThumb.className = 'custom-product-detail__thumbnail-video';

          if (media.preview_image) {
            const img = document.createElement('img');
            img.src = media.preview_image.replace(/width=\d+/, 'width=100');
            img.alt = 'Video thumbnail';
            img.loading = 'lazy';
            videoThumb.appendChild(img);
          }

          const playIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          playIcon.setAttribute('class', 'custom-product-detail__thumbnail-play-icon');
          playIcon.setAttribute('width', '24');
          playIcon.setAttribute('height', '24');
          playIcon.setAttribute('viewBox', '0 0 24 24');
          playIcon.setAttribute('fill', 'none');
          playIcon.innerHTML =
            '<circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.9)"/><path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>';
          videoThumb.appendChild(playIcon);

          thumbnailDiv.appendChild(videoThumb);
        }

        thumbnailsWrapper.appendChild(thumbnailDiv);
      });

      // Update main media with first item
      updateMainMedia(section, sectionId, filteredMedia[0]);

      // Reinitialize thumbnail click handlers
      initThumbnailClickHandlers(section, sectionId, filteredMedia);

      // Update arrow states
      updateThumbnailArrowStates(section);
    } catch (error) {
      console.error('❌ Error updating media display:', error);
      // Continue without updating media display
    }
  }

  /**
   * Initialize thumbnail click handlers for filtered media
   */
  function initThumbnailClickHandlers(section, sectionId, filteredMedia) {
    const thumbnails = section.querySelectorAll('.custom-product-detail__thumbnail');

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', function () {
        // Remove active class from all thumbnails
        thumbnails.forEach((t) => t.classList.remove('custom-product-detail__thumbnail--active'));

        // Add active class to clicked thumbnail
        this.classList.add('custom-product-detail__thumbnail--active');

        // Update main media with the corresponding filtered media item
        if (filteredMedia[index]) {
          updateMainMedia(section, sectionId, filteredMedia[index]);
        }
      });
    });
  }

  /**
   * Update thumbnail navigation arrow states
   */
  function updateThumbnailArrowStates(section) {
    const thumbnails = section.querySelectorAll('.custom-product-detail__thumbnail');
    const arrowUp = section.querySelector('[data-thumbnail-arrow="up"]');
    const arrowDown = section.querySelector('[data-thumbnail-arrow="down"]');

    if (!arrowUp || !arrowDown) return;

    const maxVisibleThumbnails = 6;

    if (thumbnails.length <= maxVisibleThumbnails) {
      // Hide arrows if 6 or fewer thumbnails
      arrowUp.style.display = 'none';
      arrowDown.style.display = 'none';
    } else {
      // Show arrows and update states
      arrowUp.style.display = 'flex';
      arrowDown.style.display = 'flex';
      arrowUp.disabled = true;
      arrowUp.style.opacity = '0.3';
      arrowDown.disabled = false;
      arrowDown.style.opacity = '1';
    }
  }

  /**
   * Update the main media (image or video)
   */
  function updateMainMedia(section, sectionId, media) {
    const mainMediaContainer = section.querySelector('.custom-product-detail__image-wrapper');
    const imageLoader = section.querySelector('[data-image-loader]');
    const imageOverlay = section.querySelector('[data-image-overlay]');

    if (!mainMediaContainer) {
      console.error('Main media container not found');
      return;
    }

    // Show loading state
    if (imageOverlay) imageOverlay.classList.add('custom-product-detail__image-overlay--active');
    if (imageLoader) imageLoader.classList.add('custom-product-detail__image-loader--active');

    // Get or create main media element
    let mainMedia = mainMediaContainer.querySelector('[data-main-media]');

    if (media.media_type === 'image') {
      // Switch to image
      if (mainMedia && mainMedia.tagName === 'VIDEO') {
        mainMedia.pause();
        mainMedia.remove();
        mainMedia = null;
      }

      if (!mainMedia || mainMedia.tagName !== 'IMG') {
        const img = document.createElement('img');
        img.id = `mainMedia-${sectionId}`;
        img.className = 'custom-product-detail__image';
        img.dataset.mainMedia = '';
        img.dataset.mediaType = 'image';
        mainMediaContainer.insertBefore(img, mainMediaContainer.querySelector('.custom-product-detail__wishlist-btn'));
        mainMedia = img;
      }

      mainMedia.style.opacity = '0';
      const tempImage = new Image();

      // For images, src is nested: media.src.src
      const imageSrc = media.src && media.src.src ? media.src.src : media.src;

      tempImage.onload = () => {
        mainMedia.src = imageSrc.replace(/width=\d+/, 'width=800');
        mainMedia.alt = media.alt || 'Product image';
        mainMedia.style.opacity = '1';

        setTimeout(() => {
          if (imageOverlay) imageOverlay.classList.remove('custom-product-detail__image-overlay--active');
          if (imageLoader) imageLoader.classList.remove('custom-product-detail__image-loader--active');
        }, 300);
      };
      tempImage.src = imageSrc.replace(/width=\d+/, 'width=800');
    } else if (media.media_type === 'video' || media.media_type === 'external_video') {
      // Switch to video
      if (mainMedia && mainMedia.tagName === 'IMG') {
        mainMedia.remove();
        mainMedia = null;
      }

      if (!mainMedia || mainMedia.tagName !== 'VIDEO') {
        const video = document.createElement('video');
        video.id = `mainMedia-${sectionId}`;
        video.className = 'custom-product-detail__image custom-product-detail__video';
        video.dataset.mainMedia = '';
        video.dataset.mediaType = 'video';
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        mainMediaContainer.insertBefore(
          video,
          mainMediaContainer.querySelector('.custom-product-detail__wishlist-btn'),
        );
        mainMedia = video;
      }

      // Clear and add sources
      mainMedia.innerHTML = '';
      if (media.sources && media.sources.length > 0) {
        media.sources.forEach((source) => {
          const sourceEl = document.createElement('source');
          sourceEl.src = source.url;
          sourceEl.type = source.mime_type;
          mainMedia.appendChild(sourceEl);
        });
      }

      mainMedia.load();
      mainMedia.play().catch((err) => console.warn('Auto-play prevented:', err));

      // Hide loading after video starts playing
      mainMedia.addEventListener(
        'loadeddata',
        () => {
          setTimeout(() => {
            if (imageOverlay) imageOverlay.classList.remove('custom-product-detail__image-overlay--active');
            if (imageLoader) imageLoader.classList.remove('custom-product-detail__image-loader--active');
          }, 300);
        },
        { once: true },
      );
    }
  }

  // ===== 1. THUMBNAIL GALLERY =====
  function initThumbnailGallery(section, sectionId) {
    const thumbnails = section.querySelectorAll('.custom-product-detail__thumbnail');
    const mainImage = section.querySelector(`#mainMedia-${sectionId}`);
    const imageLoader = section.querySelector('[data-image-loader]');
    const imageOverlay = section.querySelector('[data-image-overlay]');
    const thumbnailsWrapper = section.querySelector('[data-thumbnails-wrapper]');
    const arrowUp = section.querySelector('[data-thumbnail-arrow="up"]');
    const arrowDown = section.querySelector('[data-thumbnail-arrow="down"]');

    if (!thumbnails.length || !mainImage) return;

    // Thumbnail click handler with image preloading
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', function () {
        // Remove active class from all
        thumbnails.forEach((t) => t.classList.remove('custom-product-detail__thumbnail--active'));

        // Add active to clicked
        this.classList.add('custom-product-detail__thumbnail--active');

        // Get image from data attribute or from thumbnail img
        const imgElement = this.querySelector('img');
        if (imgElement && imgElement.src) {
          const newSrc = imgElement.src.replace(/width=\d+/, 'width=800');

          // Don't reload if it's the same image
          if (mainImage.src === newSrc) return;

          // Show overlay and loader, fade out current image
          if (imageOverlay) {
            imageOverlay.classList.add('custom-product-detail__image-overlay--active');
          }
          if (imageLoader) {
            imageLoader.classList.add('custom-product-detail__image-loader--active');
          }
          mainImage.style.opacity = '0';

          // Preload the new image
          const tempImage = new Image();
          tempImage.onload = function () {
            // Image loaded, now update and fade in
            mainImage.src = newSrc;
            mainImage.style.opacity = '1';

            // Hide overlay and loader after fade in completes
            setTimeout(() => {
              if (imageOverlay) {
                imageOverlay.classList.remove('custom-product-detail__image-overlay--active');
              }
              if (imageLoader) {
                imageLoader.classList.remove('custom-product-detail__image-loader--active');
              }
            }, 300);
          };

          tempImage.onerror = function () {
            // Error loading image, still update but hide overlay and loader
            mainImage.src = newSrc;
            mainImage.style.opacity = '1';
            if (imageOverlay) {
              imageOverlay.classList.remove('custom-product-detail__image-overlay--active');
            }
            if (imageLoader) {
              imageLoader.classList.remove('custom-product-detail__image-loader--active');
            }
          };

          // Start loading
          tempImage.src = newSrc;
        }
      });
    });

    // Initialize thumbnail navigation if more than 6 images
    if (thumbnails.length > 6 && thumbnailsWrapper && arrowUp && arrowDown) {
      let currentScrollIndex = 0;
      const maxVisibleThumbnails = 6;
      const thumbnailHeight = 40; // Based on Figma: 40px
      const thumbnailGap = 16; // Based on CSS: var(--cpd-spacing-md)
      const scrollStep = thumbnailHeight + thumbnailGap;

      // Initially hide arrows or show based on position
      const updateArrowStates = () => {
        // Disable up arrow at start
        if (currentScrollIndex === 0) {
          arrowUp.disabled = true;
          arrowUp.style.opacity = '0.3';
        } else {
          arrowUp.disabled = false;
          arrowUp.style.opacity = '1';
        }

        // Disable down arrow at end
        const maxScroll = thumbnails.length - maxVisibleThumbnails;
        if (currentScrollIndex >= maxScroll) {
          arrowDown.disabled = true;
          arrowDown.style.opacity = '0.3';
        } else {
          arrowDown.disabled = false;
          arrowDown.style.opacity = '1';
        }
      };

      // Scroll up handler
      arrowUp.addEventListener('click', () => {
        if (currentScrollIndex > 0) {
          currentScrollIndex--;
          const scrollAmount = currentScrollIndex * scrollStep;
          thumbnailsWrapper.style.transform = `translateY(-${scrollAmount}px)`;
          thumbnailsWrapper.style.transition = 'transform 0.3s ease';
          updateArrowStates();
        }
      });

      // Scroll down handler
      arrowDown.addEventListener('click', () => {
        const maxScroll = thumbnails.length - maxVisibleThumbnails;
        if (currentScrollIndex < maxScroll) {
          currentScrollIndex++;
          const scrollAmount = currentScrollIndex * scrollStep;
          thumbnailsWrapper.style.transform = `translateY(-${scrollAmount}px)`;
          thumbnailsWrapper.style.transition = 'transform 0.3s ease';
          updateArrowStates();
        }
      });

      // Initial arrow state
      updateArrowStates();

      // Show arrows only when needed
      arrowUp.style.display = 'flex';
      arrowDown.style.display = 'flex';
    } else if (arrowUp && arrowDown) {
      // Hide arrows if 6 or fewer images
      arrowUp.style.display = 'none';
      arrowDown.style.display = 'none';
    }
  }

  // ===== 2. IMAGE ZOOM ON HOVER =====
  function initImageZoom(section) {
    const imageContainer = section.querySelector('.custom-product-detail__image-wrapper');
    const mainImage = section.querySelector('.custom-product-detail__image');

    if (!imageContainer || !mainImage) return;

    imageContainer.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate percentage position
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;

      // Calculate zoom and pan
      const moveX = (xPercent - 0.5) * 40;
      const moveY = (yPercent - 0.5) * 40;

      mainImage.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.15)`;
    });

    imageContainer.addEventListener('mouseleave', function () {
      mainImage.style.transform = 'translate3d(0, 0, 0) scale(1)';
    });
  }

  // ===== 3. IMAGE MODAL =====
  function initImageModal(section, sectionId) {
    const modal = section.querySelector(`#imageModal-${sectionId}`);
    const modalImage = section.querySelector(`#modalImage-${sectionId}`);
    const modalClose = section.querySelector('.custom-product-detail__modal-close');

    if (!modal) return;

    // Hide/remove the original static modal image from the template
    if (modalImage) {
      modalImage.style.display = 'none';
      // Or remove it completely
      // modalImage.remove();
    }

    // Store current media array and index
    let currentMediaArray = [];
    let currentMediaIndex = 0;

    // Create navigation arrows if they don't exist
    let prevArrow = modal.querySelector('.custom-product-detail__modal-prev');
    let nextArrow = modal.querySelector('.custom-product-detail__modal-next');

    if (!prevArrow) {
      prevArrow = document.createElement('button');
      prevArrow.className = 'custom-product-detail__modal-prev';
      prevArrow.innerHTML =
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      modal.appendChild(prevArrow);
    }

    if (!nextArrow) {
      nextArrow = document.createElement('button');
      nextArrow.className = 'custom-product-detail__modal-next';
      nextArrow.innerHTML =
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      modal.appendChild(nextArrow);
    }

    // Function to open modal with specific media
    function openModal(mediaArray, startIndex) {
      currentMediaArray = mediaArray;
      currentMediaIndex = startIndex;
      showMedia(currentMediaIndex);
      modal.classList.add('custom-product-detail__modal--active');
      document.body.style.overflow = 'hidden';
      updateArrowStates();
    }

    // Function to show media at specific index
    function showMedia(index) {
      const media = currentMediaArray[index];
      if (!media) return;

      const modalContent = modal.querySelector('.custom-product-detail__modal-content') || modalImage.parentElement;

      // Get existing media and animate out with GSAP
      const existingMedia = modalContent.querySelector('[data-modal-media]');

      // Remove existing preview images with GSAP fade
      const existingPrevPreview = modalContent.querySelector('[data-modal-prev-preview]');
      const existingNextPreview = modalContent.querySelector('[data-modal-next-preview]');

      // Simply remove existing media
      if (existingMedia) {
        if (existingMedia.tagName === 'VIDEO') existingMedia.pause();
        existingMedia.remove();
      }
      if (existingPrevPreview) existingPrevPreview.remove();
      if (existingNextPreview) existingNextPreview.remove();

      // Create new media
      if (media.media_type === 'image') {
        const img = document.createElement('img');
        img.id = `modalImage-${sectionId}`;
        img.className = 'custom-product-detail__modal-image';
        img.dataset.modalMedia = '';
        const imageSrc = media.src && media.src.src ? media.src.src : media.src;
        img.src = imageSrc;
        img.alt = media.alt || 'Product image';
        modalContent.insertBefore(img, modalClose);

        if (window.gsap) {
          gsap.fromTo(img, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        }
      } else if (media.media_type === 'video' || media.media_type === 'external_video') {
        const video = document.createElement('video');
        video.id = `modalImage-${sectionId}`;
        video.className = 'custom-product-detail__modal-image custom-product-detail__modal-video';
        video.dataset.modalMedia = '';
        video.controls = true;
        video.autoplay = true;
        video.loop = true;
        video.muted = false;

        if (media.sources && media.sources.length > 0) {
          media.sources.forEach((source) => {
            const sourceEl = document.createElement('source');
            sourceEl.src = source.url;
            sourceEl.type = source.mime_type;
            video.appendChild(sourceEl);
          });
        }

        modalContent.insertBefore(video, modalClose);
        video.load();

        if (window.gsap) {
          gsap.fromTo(video, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        }
      }

      // Show previews
      showPreviews(index, modalContent, modalClose);
    }

    // Function to show preview thumbnails
    function showPreviews(index, modalContent, modalClose) {
      // Show previous preview image (if exists)
      if (index > 0) {
        const prevMedia = currentMediaArray[index - 1];
        if (prevMedia) {
          const prevPreviewWrapper = document.createElement('div');
          prevPreviewWrapper.className =
            'custom-product-detail__modal-preview custom-product-detail__modal-preview--prev';
          prevPreviewWrapper.dataset.modalPrevPreview = '';

          if (prevMedia.media_type === 'image') {
            const prevPreview = document.createElement('img');
            const prevSrc = prevMedia.src && prevMedia.src.src ? prevMedia.src.src : prevMedia.src;
            prevPreview.src = prevSrc;
            prevPreview.alt = 'Previous image';
            prevPreview.style.width = '100%';
            prevPreview.style.height = '100%';
            prevPreview.style.objectFit = 'cover';
            prevPreviewWrapper.appendChild(prevPreview);
          } else if (prevMedia.media_type === 'video' || prevMedia.media_type === 'external_video') {
            const prevPreview = document.createElement('img');
            prevPreview.src = prevMedia.preview_image || '';
            prevPreview.alt = 'Previous video';
            prevPreview.style.width = '100%';
            prevPreview.style.height = '100%';
            prevPreview.style.objectFit = 'cover';
            prevPreviewWrapper.appendChild(prevPreview);

            // Add play icon overlay
            const playIcon = document.createElement('div');
            playIcon.className = 'custom-product-detail__modal-preview-play';
            playIcon.innerHTML =
              '<svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.9)"/><path d="M10 8L16 12L10 16V8Z" fill="currentColor"/></svg>';
            prevPreviewWrapper.appendChild(playIcon);
          }

          prevPreviewWrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            currentMediaIndex--;
            showMedia(currentMediaIndex);
            updateArrowStates();
          });
          modalContent.insertBefore(prevPreviewWrapper, modalClose);

          // Animate in with GSAP
          if (window.gsap) {
            gsap.fromTo(
              prevPreviewWrapper,
              { opacity: 0, x: -30 },
              { opacity: 0.5, x: 0, duration: 0.3, ease: 'power2.out' },
            );
          }
        }
      }

      // Show next preview image (if exists)
      if (index < currentMediaArray.length - 1) {
        const nextMedia = currentMediaArray[index + 1];
        if (nextMedia) {
          const nextPreviewWrapper = document.createElement('div');
          nextPreviewWrapper.className =
            'custom-product-detail__modal-preview custom-product-detail__modal-preview--next';
          nextPreviewWrapper.dataset.modalNextPreview = '';

          if (nextMedia.media_type === 'image') {
            const nextPreview = document.createElement('img');
            const nextSrc = nextMedia.src && nextMedia.src.src ? nextMedia.src.src : nextMedia.src;
            nextPreview.src = nextSrc;
            nextPreview.alt = 'Next image';
            nextPreview.style.width = '100%';
            nextPreview.style.height = '100%';
            nextPreview.style.objectFit = 'cover';
            nextPreviewWrapper.appendChild(nextPreview);
          } else if (nextMedia.media_type === 'video' || nextMedia.media_type === 'external_video') {
            const nextPreview = document.createElement('img');
            nextPreview.src = nextMedia.preview_image || '';
            nextPreview.alt = 'Next video';
            nextPreview.style.width = '100%';
            nextPreview.style.height = '100%';
            nextPreview.style.objectFit = 'cover';
            nextPreviewWrapper.appendChild(nextPreview);

            // Add play icon overlay
            const playIcon = document.createElement('div');
            playIcon.className = 'custom-product-detail__modal-preview-play';
            playIcon.innerHTML =
              '<svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.9)"/><path d="M10 8L16 12L10 16V8Z" fill="currentColor"/></svg>';
            nextPreviewWrapper.appendChild(playIcon);
          }

          nextPreviewWrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            currentMediaIndex++;
            showMedia(currentMediaIndex);
            updateArrowStates();
          });
          modalContent.insertBefore(nextPreviewWrapper, modalClose);

          // Animate in with GSAP
          if (window.gsap) {
            gsap.fromTo(
              nextPreviewWrapper,
              { opacity: 0, x: 30 },
              { opacity: 0.5, x: 0, duration: 0.3, ease: 'power2.out' },
            );
          }
        }
      }
    }

    // Function to update arrow visibility
    function updateArrowStates() {
      if (currentMediaIndex === 0) {
        prevArrow.style.display = 'none';
      } else {
        prevArrow.style.display = 'flex';
      }

      if (currentMediaIndex === currentMediaArray.length - 1) {
        nextArrow.style.display = 'none';
      } else {
        nextArrow.style.display = 'flex';
      }
    }

    // Previous button
    prevArrow.addEventListener('click', function (e) {
      e.stopPropagation();
      if (currentMediaIndex > 0) {
        currentMediaIndex--;
        showMedia(currentMediaIndex);
        updateArrowStates();
      }
    });

    // Next button
    nextArrow.addEventListener('click', function (e) {
      e.stopPropagation();
      if (currentMediaIndex < currentMediaArray.length - 1) {
        currentMediaIndex++;
        showMedia(currentMediaIndex);
        updateArrowStates();
      }
    });

    // Keyboard navigation
    function handleKeydown(e) {
      if (!modal.classList.contains('custom-product-detail__modal--active')) return;

      if (e.key === 'ArrowLeft' && currentMediaIndex > 0) {
        currentMediaIndex--;
        showMedia(currentMediaIndex);
        updateArrowStates();
      } else if (e.key === 'ArrowRight' && currentMediaIndex < currentMediaArray.length - 1) {
        currentMediaIndex++;
        showMedia(currentMediaIndex);
        updateArrowStates();
      } else if (e.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown', handleKeydown);

    // Open modal on main media click
    const mainMediaContainer = section.querySelector('.custom-product-detail__image-wrapper');
    if (mainMediaContainer) {
      mainMediaContainer.addEventListener('click', function (e) {
        // Don't open if clicking on wishlist button
        if (e.target.closest('.custom-product-detail__wishlist-btn')) return;

        // Get current filtered media array
        const productData = window.productData[`product-${sectionId}`];
        const selectedMetalOption = section.querySelector('.custom-product-detail__metal-option--selected');

        if (productData && selectedMetalOption) {
          const selectedMetalType = selectedMetalOption.dataset.value;
          const filteredMedia = filterMediaByVariant(productData, selectedMetalType);

          // Find which media is currently displayed
          const mainMedia = section.querySelector('[data-main-media]');
          let startIndex = 0;

          if (mainMedia && mainMedia.dataset.mediaType === 'image') {
            const currentSrc = mainMedia.src;
            startIndex = filteredMedia.findIndex((m) => {
              if (m.media_type === 'image') {
                const mediaSrc = m.src && m.src.src ? m.src.src : m.src;
                return currentSrc.includes(mediaSrc.split('?')[0]);
              }
              return false;
            });
            if (startIndex === -1) startIndex = 0;
          }

          openModal(filteredMedia, startIndex);
        }
      });
    }

    // Close modal
    function closeModal() {
      modal.classList.remove('custom-product-detail__modal--active');
      document.body.style.overflow = '';

      // Pause video if playing
      const video = modal.querySelector('video');
      if (video) {
        video.pause();
      }
    }

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // ===== 4. WISHLIST =====

  // Storage Manager for wishlist
  const WishlistStorage = {
    STORAGE_KEY: 'project_wishlist_items',

    get() {
      try {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error('Error reading wishlist storage:', error);
        return [];
      }
    },

    add(itemId) {
      const wishlist = this.get();
      if (!wishlist.includes(itemId)) {
        wishlist.push(itemId);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(wishlist));
      }
    },

    remove(itemId) {
      const wishlist = this.get();
      const filtered = wishlist.filter((id) => id !== itemId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
    },

    has(itemId) {
      return this.get().includes(itemId);
    },

    toggle(itemId) {
      if (this.has(itemId)) {
        this.remove(itemId);
        return false; // Not liked anymore
      } else {
        this.add(itemId);
        return true; // Now liked
      }
    },
  };

  // GSAP animation for wishlist button
  function animateWishlistButton(button) {
    if (!window.gsap) {
      console.warn('GSAP not loaded, skipping animation');
      return;
    }

    const timeline = gsap.timeline();

    // Step 1: Scale down (press effect)
    timeline.to(button, {
      scale: 0.85,
      duration: 0.1,
      ease: 'power2.in',
    });

    // Step 2: Spring back with bounce
    timeline.to(button, {
      scale: 1,
      duration: 0.15,
      ease: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    });
  }

  function initWishlist(section, productData) {
    const wishlistBtn = section.querySelector('.custom-product-detail__wishlist-btn');

    if (!wishlistBtn) return;

    const productId = productData.id;

    // Check if already in wishlist
    if (WishlistStorage.has(productId)) {
      wishlistBtn.classList.add('custom-product-detail__wishlist-btn--active');
    }

    wishlistBtn.addEventListener('click', function (e) {
      e.preventDefault();

      // Toggle wishlist state
      const isNowLiked = WishlistStorage.toggle(productId);

      // Trigger animation
      animateWishlistButton(this);

      // Update button visual state
      if (isNowLiked) {
        this.classList.add('custom-product-detail__wishlist-btn--active');
      } else {
        this.classList.remove('custom-product-detail__wishlist-btn--active');
      }

      // Dispatch custom event for other parts of theme
      document.dispatchEvent(
        new CustomEvent('wishlist:updated', {
          detail: {
            wishlist: WishlistStorage.get(),
            productId: productId,
            isLiked: isNowLiked,
          },
        }),
      );
    });
  }

  // ===== 5. VARIANT SELECTION =====
  function initVariantSelection(section, productData, sectionId) {
    // Get all option selectors
    const purityOptions = section.querySelectorAll('.custom-product-detail__purity-option');
    const metalOptions = section.querySelectorAll('.custom-product-detail__metal-option');
    const sizeDropdownBtn = section.querySelector('[data-size-dropdown-btn]');
    const sizeDropdownMenu = section.querySelector('[data-size-dropdown-menu]');
    const sizeOptions = section.querySelectorAll('.custom-product-detail__size-option');

    // Purity selection
    purityOptions.forEach((option) => {
      option.addEventListener('click', function () {
        purityOptions.forEach((opt) => opt.classList.remove('custom-product-detail__purity-option--selected'));
        this.classList.add('custom-product-detail__purity-option--selected');

        // Update label
        const label = section.querySelector('[data-selected-value="1"]');
        if (label) {
          label.textContent = this.dataset.value;
        }

        updateSelectedVariant(section, productData, sectionId);
      });
    });

    // Metal type selection
    metalOptions.forEach((option) => {
      option.addEventListener('click', function () {
        metalOptions.forEach((opt) => opt.classList.remove('custom-product-detail__metal-option--selected'));
        this.classList.add('custom-product-detail__metal-option--selected');

        // Update label
        const label = section.querySelector('[data-selected-value="2"]');
        if (label) {
          label.textContent = this.dataset.value;
        }

        // Filter media based on selected metal type
        try {
          const selectedMetalType = this.dataset.value;
          const filteredMedia = filterMediaByVariant(productData, selectedMetalType);
          updateMediaDisplay(section, sectionId, filteredMedia);
        } catch (error) {
          console.error('❌ Error filtering media on metal type change:', error);
        }

        updateSelectedVariant(section, productData, sectionId);
      });
    });

    // Size dropdown toggle
    if (sizeDropdownBtn && sizeDropdownMenu) {
      sizeDropdownBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        sizeDropdownBtn.classList.toggle('active');
        sizeDropdownMenu.classList.toggle('active');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', function (e) {
        if (!sizeDropdownBtn.contains(e.target) && !sizeDropdownMenu.contains(e.target)) {
          sizeDropdownBtn.classList.remove('active');
          sizeDropdownMenu.classList.remove('active');
        }
      });
    }

    // Size selection from dropdown
    sizeOptions.forEach((option) => {
      option.addEventListener('click', function () {
        sizeOptions.forEach((opt) => opt.classList.remove('custom-product-detail__size-option--selected'));
        this.classList.add('custom-product-detail__size-option--selected');

        // Update dropdown button text
        const dropdownValue = section.querySelector('[data-size-dropdown-value]');
        if (dropdownValue) {
          dropdownValue.textContent = this.dataset.value;
        }

        // Update label
        const label = section.querySelector('[data-selected-value="3"]');
        if (label) {
          label.textContent = this.dataset.value;
        }

        // Close dropdown
        if (sizeDropdownBtn && sizeDropdownMenu) {
          sizeDropdownBtn.classList.remove('active');
          sizeDropdownMenu.classList.remove('active');
        }

        updateSelectedVariant(section, productData, sectionId);
      });
    });
  }

  // Update selected variant
  function updateSelectedVariant(section, productData, sectionId) {
    const option1 = section.querySelector('.custom-product-detail__purity-option--selected')?.dataset.value;
    const option2 = section.querySelector('.custom-product-detail__metal-option--selected')?.dataset.value;
    const option3 = section.querySelector('.custom-product-detail__size-option--selected')?.dataset.value;

    if (!option1 || !option2 || !option3) {
      return;
    }

    // Find matching variant
    const variant = productData.variants.find((v) => {
      return v.option1 === option1 && v.option2 === option2 && v.option3 === option3;
    });

    if (variant) {
      // Store current variant
      window.currentVariant = variant;

      // Update hidden form input
      const variantInput = section.querySelector('[data-variant-id]');
      if (variantInput) {
        variantInput.value = variant.id;
      }

      // Update price
      updatePrice(section, variant);

      // Update price breakup
      updatePriceBreakup(section, variant);

      // Update product details cards
      updateProductDetailsCards(section, variant);

      // Update availability
      updateAvailability(section, variant);

      // Update URL
      updateURL(variant.id);
    }
  }

  // Update price display
  function updatePrice(section, variant) {
    const priceElement = section.querySelector('[data-product-price]');
    if (priceElement && variant.price) {
      priceElement.textContent = formatMoney(variant.price);
    }
  }

  // Update price breakup accordion
  function updatePriceBreakup(section, variant) {
    // Metal row
    const metalLabel = section.querySelector('[data-metal-label]');
    const metalCharges = section.querySelector('[data-metal-charges]');

    if (metalLabel && variant.option1 && variant.option2) {
      let labelText = `${variant.option1} ${variant.option2}`;
      if (variant.metafields && variant.metafields.metal_weight) {
        labelText += ` (${variant.metafields.metal_weight})`;
      }
      metalLabel.textContent = labelText;
    }

    if (metalCharges && variant.metafields && variant.metafields.metal_charges) {
      const chargesText = `₹${variant.metafields.metal_charges}`;
      metalCharges.textContent = chargesText;
    }

    // Diamond row
    const diamondLabel = section.querySelector('[data-diamond-label]');
    const diamondCharges = section.querySelector('[data-diamond-charges]');

    if (diamondLabel && variant.metafields && variant.metafields.diamond_in_ct) {
      const labelText = `Diamonds (${variant.metafields.diamond_in_ct})`;
      diamondLabel.textContent = labelText;
    }

    if (diamondCharges && variant.metafields && variant.metafields.diamond_charges) {
      const chargesText = `₹${variant.metafields.diamond_charges}`;
      diamondCharges.textContent = chargesText;
    }

    // Making charges
    const makingCharges = section.querySelector('[data-making-charges]');

    if (makingCharges && variant.metafields && variant.metafields.making_charges) {
      const chargesText = `₹${variant.metafields.making_charges}`;
      makingCharges.textContent = chargesText;
    }

    // GST
    const gstLabel = section.querySelector('[data-gst-label]');
    const gstCharges = section.querySelector('[data-gst-charges]');

    if (gstLabel && variant.metafields && variant.metafields.gst_rate) {
      const labelText = `GST (${variant.metafields.gst_rate}%)`;
      gstLabel.textContent = labelText;
    }

    if (gstCharges && variant.metafields && variant.metafields.gst_charges) {
      const chargesText = `₹${variant.metafields.gst_charges}`;
      gstCharges.textContent = chargesText;
    }

    // Total
    const totalPrice = section.querySelector('[data-total-price]');

    if (totalPrice && variant.price) {
      const totalText = `₹${(variant.price / 100).toFixed(2)}`;
      totalPrice.textContent = totalText;
    }
  }

  // Update product details cards
  function updateProductDetailsCards(section, variant) {
    // Update gross weight
    const grossWeightEl = section.querySelector('[data-gross-weight]');
    if (grossWeightEl && variant.metafields && variant.metafields.gross_weight) {
      grossWeightEl.textContent = `${variant.metafields.gross_weight} Grams`;
    }

    // Update metal type label
    const metalTypeLabelEl = section.querySelector('[data-metal-type-label]');
    if (metalTypeLabelEl && variant.option1 && variant.option2) {
      metalTypeLabelEl.textContent = `${variant.option1} ${variant.option2}`;
    }

    // Update metal weight
    const metalWeightEl = section.querySelector('[data-metal-weight]');
    if (metalWeightEl && variant.metafields && variant.metafields.metal_weight) {
      metalWeightEl.textContent = `${variant.metafields.metal_weight} Grams`;
    }

    // Update diamond weight
    const diamondWeightEl = section.querySelector('[data-diamond-weight]');
    if (diamondWeightEl && variant.metafields && variant.metafields.diamond_in_ct) {
      diamondWeightEl.textContent = `${variant.metafields.diamond_in_ct} Ct.`;
    }
  }

  // Update availability
  function updateAvailability(section, variant) {
    const availabilityContainer = section.querySelector('[data-availability-message]');
    const addToCartBtn = section.querySelector('[data-add-to-cart]');
    const buyNowBtn = section.querySelector('[data-buy-now]');

    if (variant.available) {
      if (availabilityContainer) {
        availabilityContainer.innerHTML = '';
      }
      if (addToCartBtn) {
        addToCartBtn.disabled = false;
        addToCartBtn.textContent = 'Add to Bag';
      }
      if (buyNowBtn) {
        buyNowBtn.disabled = false;
      }
    } else {
      if (availabilityContainer) {
        availabilityContainer.innerHTML =
          '<p class="custom-product-detail__availability-text custom-product-detail__availability-text--unavailable">This variant is currently unavailable</p>';
      }
      if (addToCartBtn) {
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = 'Sold Out';
      }
      if (buyNowBtn) {
        buyNowBtn.disabled = true;
      }
    }
  }

  // Update URL with variant parameter
  function updateURL(variantId) {
    if (history.replaceState) {
      const url = new URL(window.location);
      url.searchParams.set('variant', variantId);
      history.replaceState({}, '', url);
    }
  }

  // ===== 6. ACCORDION =====
  function initAccordion(section) {
    const accordionHeaders = section.querySelectorAll('.custom-product-detail__accordion-header');

    accordionHeaders.forEach((header) => {
      header.addEventListener('click', function () {
        const accordionItem = this.parentElement;
        const isActive = accordionItem.classList.contains('custom-product-detail__accordion-item--active');

        // Close all accordion items
        section.querySelectorAll('.custom-product-detail__accordion-item').forEach((item) => {
          item.classList.remove('custom-product-detail__accordion-item--active');
        });

        // If the clicked item wasn't active, open it
        if (!isActive) {
          accordionItem.classList.add('custom-product-detail__accordion-item--active');
        }
      });
    });
  }

  // ===== 6.5. QUANTITY SELECTOR =====
  function initQuantitySelector(section) {
    const decreaseBtn = section.querySelector('[data-quantity-decrease]');
    const increaseBtn = section.querySelector('[data-quantity-increase]');
    const display = section.querySelector('[data-quantity-display]');
    const hiddenInput = section.querySelector('input[name="quantity"]');

    if (!decreaseBtn || !increaseBtn || !display || !hiddenInput) return;

    // Decrease quantity
    decreaseBtn.addEventListener('click', function () {
      let currentValue = parseInt(display.value) || 1;
      if (currentValue > 1) {
        currentValue--;
        display.value = currentValue;
        hiddenInput.value = currentValue;
        decreaseBtn.disabled = currentValue <= 1;
      }
    });

    // Increase quantity
    increaseBtn.addEventListener('click', function () {
      let currentValue = parseInt(display.value) || 1;
      currentValue++;
      display.value = currentValue;
      hiddenInput.value = currentValue;
      decreaseBtn.disabled = false;
    });

    // Initial state
    decreaseBtn.disabled = parseInt(display.value) <= 1;
  }

  // ===== 7. ADD TO CART =====
  function initAddToCart(section, productData, sectionId) {
    const form = section.querySelector('[data-product-form]');
    const addToCartBtn = section.querySelector('[data-add-to-cart]');

    if (!form || !addToCartBtn) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const variantId = formData.get('id');
      const quantity = parseInt(formData.get('quantity')) || 1;

      if (!variantId) {
        showError(section, 'Please select all options');
        return;
      }

      // Disable button
      addToCartBtn.disabled = true;
      const originalText = addToCartBtn.textContent;
      addToCartBtn.textContent = 'ADDING...';

      try {
        // Use /cart/add.js endpoint which returns JSON
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: variantId,
            quantity: quantity,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          addToCartBtn.textContent = 'ADDED ✓';

          // Publish cart update event for any subscribers
          if (typeof publish === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
            publish(PUB_SUB_EVENTS.cartUpdate, {
              source: 'custom-product-detail',
              productVariantId: variantId,
              cartData: data,
            });
          }

          // Update cart icon bubble
          try {
            // Fetch cart data to get item count
            const cartDataResponse = await fetch('/cart.js');
            const cartData = await cartDataResponse.json();

            // Update all cart count elements
            const cartCountElements = document.querySelectorAll('[data-cart-count]');

            cartCountElements.forEach((el) => {
              el.textContent = cartData.item_count;
            });

            // Also try to update cart-icon-bubble if it exists
            const cartIconBubble = document.getElementById('cart-icon-bubble');
            if (cartIconBubble) {
              const bubbleResponse = await fetch(`${window.routes.cart_url}?section_id=cart-icon-bubble`);
              const bubbleHtml = await bubbleResponse.text();
              const parser = new DOMParser();
              const bubbleDoc = parser.parseFromString(bubbleHtml, 'text/html');
              const newBubble = bubbleDoc.getElementById('cart-icon-bubble');
              if (newBubble) {
                cartIconBubble.innerHTML = newBubble.innerHTML;
              }
            }
          } catch (error) {
            console.error('Error updating cart icon:', error);
          }

          // Manually fetch and update cart drawer
          const cartDrawer = document.querySelector('cart-drawer');
          const cartDrawerItems = document.querySelector('cart-drawer-items');

          if (cartDrawer && cartDrawerItems) {
            try {
              const cartResponse = await fetch(`${window.routes.cart_url}?section_id=cart-drawer`);
              const cartHtml = await cartResponse.text();

              const parser = new DOMParser();
              const doc = parser.parseFromString(cartHtml, 'text/html');

              // Get the entire cart drawer from fetched HTML
              const newCartDrawer = doc.querySelector('cart-drawer');

              if (newCartDrawer) {
                // Get the inner content
                const newInnerContent = newCartDrawer.querySelector('.drawer__inner');
                const currentInnerContent = cartDrawer.querySelector('.drawer__inner');

                if (newInnerContent && currentInnerContent) {
                  currentInnerContent.innerHTML = newInnerContent.innerHTML;
                }

                // Remove is-empty class
                cartDrawer.classList.remove('is-empty');
              }
            } catch (error) {
              console.error('Error updating cart drawer:', error);
            }
          }

          setTimeout(() => {
            addToCartBtn.textContent = originalText;
            addToCartBtn.disabled = false;
          }, 2000);
        } else {
          const data = await response.json();
          throw new Error(data.description || data.message || 'Failed to add to cart');
        }
      } catch (error) {
        console.error('Add to cart error:', error);
        showError(section, error.message);
        addToCartBtn.textContent = originalText;
        addToCartBtn.disabled = false;
      }
    });
  }

  // ===== 8. BUY NOW =====
  function initBuyNow(section, productData) {
    const buyNowBtn = section.querySelector('[data-buy-now]');
    const form = section.querySelector('[data-product-form]');

    if (!buyNowBtn || !form) return;

    buyNowBtn.addEventListener('click', async function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const variantId = formData.get('id');

      if (!variantId) {
        showError(section, 'Please select all options');
        return;
      }

      // Disable button
      this.disabled = true;
      const originalText = this.textContent;
      this.textContent = 'PROCESSING...';

      try {
        // Add to cart first
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: variantId,
            quantity: 1,
          }),
        });

        if (response.ok) {
          // Redirect to checkout
          window.location.href = '/checkout';
        } else {
          const data = await response.json();
          throw new Error(data.description || 'Failed to proceed to checkout');
        }
      } catch (error) {
        console.error('Buy now error:', error);
        showError(section, error.message);
        this.textContent = originalText;
        this.disabled = false;
      }
    });
  }

  // ===== 9. SIZE GUIDE =====
  function initSizeGuide(section, sectionId) {
    const sizeGuideTrigger = section.querySelector('[data-size-guide-trigger]');
    const modal = section.querySelector(`#sizeGuideModal-${sectionId}`);

    if (!sizeGuideTrigger || !modal) return;

    const closeBtn = modal.querySelector('[data-size-guide-close]');
    const overlay = modal.querySelector('[data-size-guide-overlay]');
    const scrollContainer = modal.querySelector('[data-size-guide-scroll]');
    const images = modal.querySelectorAll('.custom-product-detail__size-guide-image');
    let scrollPosition = 0;

    // Function to lock body scroll
    function lockBodyScroll() {
      scrollPosition = window.pageYOffset;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
    }

    // Function to unlock body scroll
    function unlockBodyScroll() {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('width');
      window.scrollTo(0, scrollPosition);
    }

    // Fix: Manually handle wheel events and convert to scroll
    // Because position: fixed on body prevents default scroll behavior
    if (scrollContainer) {
      scrollContainer.addEventListener(
        'wheel',
        function (e) {
          // Manually scroll the container
          e.preventDefault();
          e.stopPropagation();
          this.scrollTop += e.deltaY;
        },
        { passive: false },
      );
    }

    // Open modal on size guide link click
    sizeGuideTrigger.addEventListener('click', function (e) {
      e.preventDefault();

      // Add loading state
      modal.classList.add('custom-product-detail__size-guide-modal--loading');
      modal.classList.add('custom-product-detail__size-guide-modal--active');
      lockBodyScroll();

      // Check if images are loaded
      let loadedCount = 0;
      const totalImages = images.length;

      if (totalImages === 0) {
        // No images, remove loading immediately
        modal.classList.remove('custom-product-detail__size-guide-modal--loading');
        return;
      }

      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
          if (loadedCount === totalImages) {
            // All images loaded
            setTimeout(() => {
              modal.classList.remove('custom-product-detail__size-guide-modal--loading');
            }, 300);
          }
        } else {
          img.addEventListener('load', function () {
            loadedCount++;
            if (loadedCount === totalImages) {
              // All images loaded
              setTimeout(() => {
                modal.classList.remove('custom-product-detail__size-guide-modal--loading');
              }, 300);
            }
          });

          img.addEventListener('error', function () {
            loadedCount++;
            if (loadedCount === totalImages) {
              // All images processed (even with errors)
              setTimeout(() => {
                modal.classList.remove('custom-product-detail__size-guide-modal--loading');
              }, 300);
            }
          });
        }
      });
    });

    // Close modal function
    function closeModal() {
      modal.classList.remove('custom-product-detail__size-guide-modal--active');
      modal.classList.remove('custom-product-detail__size-guide-modal--loading');
      unlockBodyScroll();
    }

    // Close on close button click
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Close on overlay click
    if (overlay) {
      overlay.addEventListener('click', closeModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('custom-product-detail__size-guide-modal--active')) {
        closeModal();
      }
    });
  }

  // ===== HELPER FUNCTIONS =====

  // Update cart count in header
  async function updateCartCount() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();

      const cartCountElements = document.querySelectorAll('[data-cart-count]');
      cartCountElements.forEach((el) => {
        el.textContent = cart.item_count;
      });
    } catch (error) {
      console.error('Failed to update cart count:', error);
    }
  }

  // Show error message
  function showError(section, message) {
    const errorContainer = section.querySelector('[data-availability-message]');

    if (errorContainer) {
      errorContainer.innerHTML = `<p class="custom-product-detail__availability-text custom-product-detail__availability-text--unavailable">${message}</p>`;

      setTimeout(() => {
        errorContainer.innerHTML = '';
      }, 3000);
    }
  }

  // Format money (Indian rupee format)
  function formatMoney(cents) {
    const amount = (cents / 100).toFixed(2);
    const [rupees, paise] = amount.split('.');

    // Indian number format: last 3 digits, then groups of 2
    let lastThree = rupees.slice(-3);
    let remaining = rupees.slice(0, -3);

    if (remaining) {
      lastThree = ',' + lastThree;
      remaining = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    }

    return `₹${remaining}${lastThree}.${paise}`;
  }

  // Format initial price on page load
  function formatInitialPrice(section) {
    const priceElement = section.querySelector('[data-product-price]');
    if (priceElement) {
      const cents = priceElement.dataset.priceCents;
      if (cents) {
        priceElement.textContent = formatMoney(parseInt(cents));
      }
    }
  }

  // Reorder option elements based on sorted product data
  function reorderOptionElements(section, productData) {
    if (!productData.options) return;

    let needsVariantUpdate = false;

    productData.options.forEach((option) => {
      if (option.name === 'Purity') {
        // Reorder purity options
        const purityContainer = section.querySelector('[data-option-index="1"]');
        if (!purityContainer) return;

        const sortedValues = option.values;

        // Get all purity option elements
        const purityOptions = Array.from(purityContainer.querySelectorAll('.custom-product-detail__purity-option'));

        // Remove all selected classes first
        purityOptions.forEach(opt => opt.classList.remove('custom-product-detail__purity-option--selected'));

        // Reorder based on sorted values
        sortedValues.forEach((value, index) => {
          const optionElement = purityOptions.find(el => el.dataset.value === value);
          if (optionElement) {
            purityContainer.appendChild(optionElement);

            // Select the first option (index 0)
            if (index === 0) {
              optionElement.classList.add('custom-product-detail__purity-option--selected');
              // Update label
              const label = section.querySelector('[data-selected-value="1"]');
              if (label) {
                label.textContent = value;
              }
              needsVariantUpdate = true;
            }
          }
        });
      }

      if (option.name === 'Size') {
        // Reorder size options in dropdown
        const sizeDropdownMenu = section.querySelector('[data-size-dropdown-menu]');
        if (!sizeDropdownMenu) return;

        const sortedValues = option.values;

        // Get all size option elements
        const sizeOptions = Array.from(sizeDropdownMenu.querySelectorAll('.custom-product-detail__size-option'));

        // Remove all selected classes first
        sizeOptions.forEach(opt => opt.classList.remove('custom-product-detail__size-option--selected'));

        // Reorder based on sorted values
        sortedValues.forEach((value, index) => {
          const optionElement = sizeOptions.find(el => el.dataset.value === value);
          if (optionElement) {
            sizeDropdownMenu.appendChild(optionElement);

            // Select the first option (index 0)
            if (index === 0) {
              optionElement.classList.add('custom-product-detail__size-option--selected');
              // Update dropdown button text
              const dropdownValue = section.querySelector('[data-size-dropdown-value]');
              if (dropdownValue) {
                dropdownValue.textContent = value;
              }
              // Update label
              const label = section.querySelector('[data-selected-value="3"]');
              if (label) {
                label.textContent = value;
              }
              needsVariantUpdate = true;
            }
          }
        });
      }
    });

    // Update the selected variant after reordering
    if (needsVariantUpdate) {
      updateSelectedVariant(section, productData, section.dataset.sectionId);
    }
  }

  // Build trust badges sentence for mobile
  function updateTrustBadgesSentence() {
    const trustBadgesContainers = document.querySelectorAll('.custom-product-detail__trust-badges');

    trustBadgesContainers.forEach((container) => {
      const badges = container.querySelectorAll('.custom-product-detail__trust-badge');
      const badgeTexts = Array.from(badges)
        .map((badge) => {
          const textEl = badge.querySelector('.custom-product-detail__trust-text');
          return textEl ? textEl.textContent.trim() : '';
        })
        .filter((text) => text !== '');

      if (badgeTexts.length > 0) {
        container.setAttribute('data-badge-text', badgeTexts.join(' • '));
      }
    });
  }

  // ===== INITIALIZATION =====

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initProductDetail();
      updateTrustBadgesSentence();
    });
  } else {
    initProductDetail();
    updateTrustBadgesSentence();
  }

  // Reinitialize on Shopify theme editor changes
  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function () {
      initProductDetail();
      updateTrustBadgesSentence();
    });

    document.addEventListener('shopify:section:unload', function () {
      // Cleanup if needed
    });
  }
})();
