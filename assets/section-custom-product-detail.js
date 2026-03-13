(function () {
  'use strict';

  function initProductDetail() {
    const sections = document.querySelectorAll('[data-section-id]');

    sections.forEach((section) => {
      const sectionId = section.dataset.sectionId;
      const productData = window.productData[`product-${sectionId}`];

      if (!productData) {
        console.error('❌ No product data found for section:', sectionId);
        return;
      }

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
      }
    });
  }

  function filterMediaByVariant(productData, selectedMetalType) {
    if (!productData.media || !selectedMetalType) {
      return productData.media || [];
    }

    const matchingVariants = productData.variants.filter((v) => v.option2 === selectedMetalType);

    if (matchingVariants.length === 0) {
      return productData.media;
    }

    const allVariantImageSrcs = matchingVariants
      .map((v) => v.featured_image_src)
      .filter((src) => src != null && typeof src === 'string');

    const variantImageSrcs = [...new Set(allVariantImageSrcs)];

    if (variantImageSrcs.length === 0) {
      return productData.media;
    }

    const allProductVariantUrls = productData.variants
      .map((v) => v.featured_image_src)
      .filter((src) => src != null && typeof src === 'string');
    const allNormalizedVariantUrls = [...new Set(allProductVariantUrls.map((url) => url.split('?')[0].replace(/^https?:/, '')))];

    const normalizedSelectedVariantUrls = variantImageSrcs.map((url) => url.split('?')[0].replace(/^https?:/, ''));

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

    const matchedImages = [];

    for (let i = matchStartIndex; i < productData.media.length; i++) {
      const media = productData.media[i];

      if (media.media_type !== 'image') {
        continue;
      }

      if (media.src && media.src.src) {
        const mediaSrc = media.src.src;
        const normalizedMediaUrl = mediaSrc.split('?')[0].replace(/^https?:/, '');

        const matchesAnyVariant = allNormalizedVariantUrls.includes(normalizedMediaUrl);

        if (matchesAnyVariant) {
          const matchesOurVariant = normalizedSelectedVariantUrls.includes(normalizedMediaUrl);

          if (matchesOurVariant) {
            matchedImages.push(media);
          } else {
            break;
          }
        } else {
          matchedImages.push(media);
        }
      }
    }

    if (matchedImages.length === 0) {
      return productData.media;
    }

    const allVideos = productData.media.filter((m) => m.media_type === 'video' || m.media_type === 'external_video');

    let filteredMedia = [...matchedImages];

    const firstVideo = allVideos.length > 0 ? allVideos[0] : null;
    const remainingVideos = allVideos.slice(1);

    if (firstVideo && filteredMedia.length >= 2) {
      filteredMedia.splice(2, 0, firstVideo);
    } else if (firstVideo) {
      filteredMedia.push(firstVideo);
    }

    if (remainingVideos.length > 0) {
      filteredMedia = filteredMedia.concat(remainingVideos);
    }

    return filteredMedia;
  }

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

      thumbnailsWrapper.innerHTML = '';

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

      updateMainMedia(section, sectionId, filteredMedia[0]);

      initThumbnailClickHandlers(section, sectionId, filteredMedia);

      updateThumbnailArrowStates(section);
    } catch (error) {
      console.error('❌ Error updating media display:', error);
    }
  }

  function initThumbnailClickHandlers(section, sectionId, filteredMedia) {
    const thumbnails = section.querySelectorAll('.custom-product-detail__thumbnail');

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', function () {
        thumbnails.forEach((t) => t.classList.remove('custom-product-detail__thumbnail--active'));

        this.classList.add('custom-product-detail__thumbnail--active');

        if (filteredMedia[index]) {
          updateMainMedia(section, sectionId, filteredMedia[index]);
        }
      });
    });
  }

  function updateThumbnailArrowStates(section) {
    const thumbnails = section.querySelectorAll('.custom-product-detail__thumbnail');
    const arrowUp = section.querySelector('[data-thumbnail-arrow="up"]');
    const arrowDown = section.querySelector('[data-thumbnail-arrow="down"]');

    if (!arrowUp || !arrowDown) return;

    const maxVisibleThumbnails = 6;

    if (thumbnails.length <= maxVisibleThumbnails) {
      arrowUp.style.display = 'none';
      arrowDown.style.display = 'none';
    } else {
      arrowUp.style.display = 'flex';
      arrowDown.style.display = 'flex';
      arrowUp.disabled = true;
      arrowUp.style.opacity = '0.3';
      arrowDown.disabled = false;
      arrowDown.style.opacity = '1';
    }
  }

  function updateMainMedia(section, sectionId, media) {
    const mainMediaContainer = section.querySelector('.custom-product-detail__image-wrapper');
    const imageLoader = section.querySelector('[data-image-loader]');
    const imageOverlay = section.querySelector('[data-image-overlay]');

    if (!mainMediaContainer) {
      console.error('Main media container not found');
      return;
    }

    if (imageOverlay) imageOverlay.classList.add('custom-product-detail__image-overlay--active');
    if (imageLoader) imageLoader.classList.add('custom-product-detail__image-loader--active');

    let mainMedia = mainMediaContainer.querySelector('[data-main-media]');

    if (media.media_type === 'image') {
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
        mainMediaContainer.insertBefore(img, mainMediaContainer.querySelector('[data-wishlist-toggle]'));
        mainMedia = img;
      }

      mainMedia.style.opacity = '0';
      const tempImage = new Image();

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
          mainMediaContainer.querySelector('[data-wishlist-toggle]'),
        );
        mainMedia = video;
      }

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

  function initThumbnailGallery(section, sectionId) {
    const thumbnails = section.querySelectorAll('.custom-product-detail__thumbnail');
    const mainImage = section.querySelector(`#mainMedia-${sectionId}`);
    const imageLoader = section.querySelector('[data-image-loader]');
    const imageOverlay = section.querySelector('[data-image-overlay]');
    const thumbnailsWrapper = section.querySelector('[data-thumbnails-wrapper]');
    const arrowUp = section.querySelector('[data-thumbnail-arrow="up"]');
    const arrowDown = section.querySelector('[data-thumbnail-arrow="down"]');

    if (!thumbnails.length || !mainImage) return;

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', function () {
        thumbnails.forEach((t) => t.classList.remove('custom-product-detail__thumbnail--active'));

        this.classList.add('custom-product-detail__thumbnail--active');

        const imgElement = this.querySelector('img');
        if (imgElement && imgElement.src) {
          const newSrc = imgElement.src.replace(/width=\d+/, 'width=800');

          if (mainImage.src === newSrc) return;

          if (imageOverlay) {
            imageOverlay.classList.add('custom-product-detail__image-overlay--active');
          }
          if (imageLoader) {
            imageLoader.classList.add('custom-product-detail__image-loader--active');
          }
          mainImage.style.opacity = '0';

          const tempImage = new Image();
          tempImage.onload = function () {
            mainImage.src = newSrc;
            mainImage.style.opacity = '1';

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
            mainImage.src = newSrc;
            mainImage.style.opacity = '1';
            if (imageOverlay) {
              imageOverlay.classList.remove('custom-product-detail__image-overlay--active');
            }
            if (imageLoader) {
              imageLoader.classList.remove('custom-product-detail__image-loader--active');
            }
          };

          tempImage.src = newSrc;
        }
      });
    });

    if (thumbnails.length > 6 && thumbnailsWrapper && arrowUp && arrowDown) {
      let currentScrollIndex = 0;
      const maxVisibleThumbnails = 6;
      const thumbnailHeight = 40;
      const thumbnailGap = 16;
      const scrollStep = thumbnailHeight + thumbnailGap;

      const updateArrowStates = () => {
        if (currentScrollIndex === 0) {
          arrowUp.disabled = true;
          arrowUp.style.opacity = '0.3';
        } else {
          arrowUp.disabled = false;
          arrowUp.style.opacity = '1';
        }

        const maxScroll = thumbnails.length - maxVisibleThumbnails;
        if (currentScrollIndex >= maxScroll) {
          arrowDown.disabled = true;
          arrowDown.style.opacity = '0.3';
        } else {
          arrowDown.disabled = false;
          arrowDown.style.opacity = '1';
        }
      };

      arrowUp.addEventListener('click', () => {
        if (currentScrollIndex > 0) {
          currentScrollIndex--;
          const scrollAmount = currentScrollIndex * scrollStep;
          thumbnailsWrapper.style.transform = `translateY(-${scrollAmount}px)`;
          thumbnailsWrapper.style.transition = 'transform 0.3s ease';
          updateArrowStates();
        }
      });

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

      updateArrowStates();

      arrowUp.style.display = 'flex';
      arrowDown.style.display = 'flex';
    } else if (arrowUp && arrowDown) {
      arrowUp.style.display = 'none';
      arrowDown.style.display = 'none';
    }
  }

  function initImageZoom(section) {
    const imageContainer = section.querySelector('.custom-product-detail__image-wrapper');
    const mainImage = section.querySelector('.custom-product-detail__image');

    if (!imageContainer || !mainImage) return;

    imageContainer.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = x / rect.width;
      const yPercent = y / rect.height;

      const moveX = (xPercent - 0.5) * 40;
      const moveY = (yPercent - 0.5) * 40;

      mainImage.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.15)`;
    });

    imageContainer.addEventListener('mouseleave', function () {
      mainImage.style.transform = 'translate3d(0, 0, 0) scale(1)';
    });
  }

  function initImageModal(section, sectionId) {
    const modal = section.querySelector(`#imageModal-${sectionId}`);
    const modalImage = section.querySelector(`#modalImage-${sectionId}`);
    const modalClose = section.querySelector('.custom-product-detail__modal-close');

    if (!modal) return;

    if (modalImage) {
      modalImage.style.display = 'none';
    }

    let currentMediaArray = [];
    let currentMediaIndex = 0;

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

    function openModal(mediaArray, startIndex) {
      currentMediaArray = mediaArray;
      currentMediaIndex = startIndex;
      showMedia(currentMediaIndex);
      modal.classList.add('custom-product-detail__modal--active');
      document.body.style.overflow = 'hidden';
      updateArrowStates();
    }

    function showMedia(index) {
      const media = currentMediaArray[index];
      if (!media) return;

      const modalContent = modal.querySelector('.custom-product-detail__modal-content') || modalImage.parentElement;

      const existingMedia = modalContent.querySelector('[data-modal-media]');

      const existingPrevPreview = modalContent.querySelector('[data-modal-prev-preview]');
      const existingNextPreview = modalContent.querySelector('[data-modal-next-preview]');

      if (existingMedia) {
        if (existingMedia.tagName === 'VIDEO') existingMedia.pause();
        existingMedia.remove();
      }
      if (existingPrevPreview) existingPrevPreview.remove();
      if (existingNextPreview) existingNextPreview.remove();

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

      showPreviews(index, modalContent, modalClose);
    }

    function showPreviews(index, modalContent, modalClose) {
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

          if (window.gsap) {
            gsap.fromTo(
              prevPreviewWrapper,
              { opacity: 0, x: -30 },
              { opacity: 0.5, x: 0, duration: 0.3, ease: 'power2.out' },
            );
          }
        }
      }

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

    prevArrow.addEventListener('click', function (e) {
      e.stopPropagation();
      if (currentMediaIndex > 0) {
        currentMediaIndex--;
        showMedia(currentMediaIndex);
        updateArrowStates();
      }
    });

    nextArrow.addEventListener('click', function (e) {
      e.stopPropagation();
      if (currentMediaIndex < currentMediaArray.length - 1) {
        currentMediaIndex++;
        showMedia(currentMediaIndex);
        updateArrowStates();
      }
    });

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

    const mainMediaContainer = section.querySelector('.custom-product-detail__image-wrapper');
    if (mainMediaContainer) {
      mainMediaContainer.addEventListener('click', function (e) {
        if (e.target.closest('.custom-product-detail__wishlist-btn')) return;

        const productData = window.productData[`product-${sectionId}`];
        const selectedMetalOption = section.querySelector('.custom-product-detail__metal-option--selected');

        if (productData && selectedMetalOption) {
          const selectedMetalType = selectedMetalOption.dataset.value;
          const filteredMedia = filterMediaByVariant(productData, selectedMetalType);

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

    function closeModal() {
      modal.classList.remove('custom-product-detail__modal--active');
      document.body.style.overflow = '';

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

  function initWishlist(section, productData) {
    if (window.WishlistManager) {
      window.WishlistManager.initializeButtons();
    }
  }

  function initVariantSelection(section, productData, sectionId) {
    const purityOptions = section.querySelectorAll('.custom-product-detail__purity-option');
    const metalOptions = section.querySelectorAll('.custom-product-detail__metal-option');
    const sizeDropdownBtn = section.querySelector('[data-size-dropdown-btn]');
    const sizeDropdownMenu = section.querySelector('[data-size-dropdown-menu]');
    const sizeOptions = section.querySelectorAll('.custom-product-detail__size-option');

    purityOptions.forEach((option) => {
      option.addEventListener('click', function () {
        purityOptions.forEach((opt) => opt.classList.remove('custom-product-detail__purity-option--selected'));
        this.classList.add('custom-product-detail__purity-option--selected');

        const label = section.querySelector('[data-selected-value="1"]');
        if (label) {
          label.textContent = this.dataset.value;
        }

        updateSelectedVariant(section, productData, sectionId);
      });
    });

    metalOptions.forEach((option) => {
      option.addEventListener('click', function () {
        metalOptions.forEach((opt) => opt.classList.remove('custom-product-detail__metal-option--selected'));
        this.classList.add('custom-product-detail__metal-option--selected');

        const label = section.querySelector('[data-selected-value="2"]');
        if (label) {
          label.textContent = this.dataset.value;
        }

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

    if (sizeDropdownBtn && sizeDropdownMenu) {
      sizeDropdownBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        sizeDropdownBtn.classList.toggle('active');
        sizeDropdownMenu.classList.toggle('active');
      });

      document.addEventListener('click', function (e) {
        if (!sizeDropdownBtn.contains(e.target) && !sizeDropdownMenu.contains(e.target)) {
          sizeDropdownBtn.classList.remove('active');
          sizeDropdownMenu.classList.remove('active');
        }
      });
    }

    sizeOptions.forEach((option) => {
      option.addEventListener('click', function () {
        sizeOptions.forEach((opt) => opt.classList.remove('custom-product-detail__size-option--selected'));
        this.classList.add('custom-product-detail__size-option--selected');

        const dropdownValue = section.querySelector('[data-size-dropdown-value]');
        if (dropdownValue) {
          dropdownValue.textContent = this.dataset.value;
        }

        const label = section.querySelector('[data-selected-value="3"]');
        if (label) {
          label.textContent = this.dataset.value;
        }

        if (sizeDropdownBtn && sizeDropdownMenu) {
          sizeDropdownBtn.classList.remove('active');
          sizeDropdownMenu.classList.remove('active');
        }

        updateSelectedVariant(section, productData, sectionId);
      });
    });
  }

  function updateSelectedVariant(section, productData, sectionId) {
    const option1 = section.querySelector('.custom-product-detail__purity-option--selected')?.dataset.value;
    const option2 = section.querySelector('.custom-product-detail__metal-option--selected')?.dataset.value;
    const option3 = section.querySelector('.custom-product-detail__size-option--selected')?.dataset.value;

    if (!option1 || !option2 || !option3) {
      return;
    }

    const variant = productData.variants.find((v) => {
      return v.option1 === option1 && v.option2 === option2 && v.option3 === option3;
    });

    if (variant) {
      window.currentVariant = variant;

      const variantInput = section.querySelector('[data-variant-id]');
      if (variantInput) {
        variantInput.value = variant.id;
      }

      updatePrice(section, variant);

      updatePriceBreakup(section, variant);

      updateProductDetailsCards(section, variant);

      updateAvailability(section, variant);

      updateURL(variant.id);
    }
  }

  function updatePrice(section, variant) {
    const priceElement = section.querySelector('[data-product-price]');
    if (priceElement && variant.price) {
      priceElement.textContent = formatMoney(variant.price);
    }
  }

  function updatePriceBreakup(section, variant) {
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

    const makingCharges = section.querySelector('[data-making-charges]');

    if (makingCharges && variant.metafields && variant.metafields.making_charges) {
      const chargesText = `₹${variant.metafields.making_charges}`;
      makingCharges.textContent = chargesText;
    }

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

    const totalPrice = section.querySelector('[data-total-price]');

    if (totalPrice && variant.price) {
      const totalText = `₹${(variant.price / 100).toFixed(2)}`;
      totalPrice.textContent = totalText;
    }
  }

  function updateProductDetailsCards(section, variant) {
    const grossWeightEl = section.querySelector('[data-gross-weight]');
    if (grossWeightEl && variant.metafields && variant.metafields.gross_weight) {
      grossWeightEl.textContent = `${variant.metafields.gross_weight} Grams`;
    }

    const metalTypeLabelEl = section.querySelector('[data-metal-type-label]');
    if (metalTypeLabelEl && variant.option1 && variant.option2) {
      metalTypeLabelEl.textContent = `${variant.option1} ${variant.option2}`;
    }

    const metalWeightEl = section.querySelector('[data-metal-weight]');
    if (metalWeightEl && variant.metafields && variant.metafields.metal_weight) {
      metalWeightEl.textContent = `${variant.metafields.metal_weight} Grams`;
    }

    const diamondWeightEl = section.querySelector('[data-diamond-weight]');
    if (diamondWeightEl && variant.metafields && variant.metafields.diamond_in_ct) {
      diamondWeightEl.textContent = `${variant.metafields.diamond_in_ct} Ct.`;
    }
  }

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

  function updateURL(variantId) {
    if (history.replaceState) {
      const url = new URL(window.location);
      url.searchParams.set('variant', variantId);
      history.replaceState({}, '', url);
    }
  }

  function initAccordion(section) {
    const accordionHeaders = section.querySelectorAll('.custom-product-detail__accordion-header');

    accordionHeaders.forEach((header) => {
      header.addEventListener('click', function () {
        const accordionItem = this.parentElement;
        const isActive = accordionItem.classList.contains('custom-product-detail__accordion-item--active');

        section.querySelectorAll('.custom-product-detail__accordion-item').forEach((item) => {
          item.classList.remove('custom-product-detail__accordion-item--active');
        });

        if (!isActive) {
          accordionItem.classList.add('custom-product-detail__accordion-item--active');
        }
      });
    });
  }

  function initQuantitySelector(section) {
    const decreaseBtn = section.querySelector('[data-quantity-decrease]');
    const increaseBtn = section.querySelector('[data-quantity-increase]');
    const display = section.querySelector('[data-quantity-display]');
    const hiddenInput = section.querySelector('input[name="quantity"]');

    if (!decreaseBtn || !increaseBtn || !display || !hiddenInput) return;

    decreaseBtn.addEventListener('click', function () {
      let currentValue = parseInt(display.value) || 1;
      if (currentValue > 1) {
        currentValue--;
        display.value = currentValue;
        hiddenInput.value = currentValue;
        decreaseBtn.disabled = currentValue <= 1;
      }
    });

    increaseBtn.addEventListener('click', function () {
      let currentValue = parseInt(display.value) || 1;
      currentValue++;
      display.value = currentValue;
      hiddenInput.value = currentValue;
      decreaseBtn.disabled = false;
    });

    decreaseBtn.disabled = parseInt(display.value) <= 1;
  }

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

      addToCartBtn.disabled = true;
      const originalText = addToCartBtn.textContent;
      addToCartBtn.textContent = 'ADDING...';

      try {
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

          if (typeof publish === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
            publish(PUB_SUB_EVENTS.cartUpdate, {
              source: 'custom-product-detail',
              productVariantId: variantId,
              cartData: data,
            });
          }

          try {
            const cartDataResponse = await fetch('/cart.js');
            const cartData = await cartDataResponse.json();

            const cartCountElements = document.querySelectorAll('[data-cart-count]');

            cartCountElements.forEach((el) => {
              el.textContent = cartData.item_count;
            });

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

          const cartDrawer = document.querySelector('cart-drawer');
          const cartDrawerItems = document.querySelector('cart-drawer-items');

          if (cartDrawer && cartDrawerItems) {
            try {
              const cartResponse = await fetch(`${window.routes.cart_url}?section_id=cart-drawer`);
              const cartHtml = await cartResponse.text();

              const parser = new DOMParser();
              const doc = parser.parseFromString(cartHtml, 'text/html');

              const newCartDrawer = doc.querySelector('cart-drawer');

              if (newCartDrawer) {
                const newInnerContent = newCartDrawer.querySelector('.drawer__inner');
                const currentInnerContent = cartDrawer.querySelector('.drawer__inner');

                if (newInnerContent && currentInnerContent) {
                  currentInnerContent.innerHTML = newInnerContent.innerHTML;
                }

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

      this.disabled = true;
      const originalText = this.textContent;
      this.textContent = 'PROCESSING...';

      try {
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

  function initSizeGuide(section, sectionId) {
    const sizeGuideTrigger = section.querySelector('[data-size-guide-trigger]');
    const modal = section.querySelector(`#sizeGuideModal-${sectionId}`);

    if (!sizeGuideTrigger || !modal) return;

    const closeBtn = modal.querySelector('[data-size-guide-close]');
    const overlay = modal.querySelector('[data-size-guide-overlay]');
    const scrollContainer = modal.querySelector('[data-size-guide-scroll]');
    const images = modal.querySelectorAll('.custom-product-detail__size-guide-image');
    let scrollPosition = 0;

    function lockBodyScroll() {
      scrollPosition = window.pageYOffset;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
    }

    function unlockBodyScroll() {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('width');
      window.scrollTo(0, scrollPosition);
    }

    if (scrollContainer) {
      scrollContainer.addEventListener(
        'wheel',
        function (e) {
          e.preventDefault();
          e.stopPropagation();
          this.scrollTop += e.deltaY;
        },
        { passive: false },
      );
    }

    sizeGuideTrigger.addEventListener('click', function (e) {
      e.preventDefault();

      modal.classList.add('custom-product-detail__size-guide-modal--loading');
      modal.classList.add('custom-product-detail__size-guide-modal--active');
      lockBodyScroll();

      let loadedCount = 0;
      const totalImages = images.length;

      if (totalImages === 0) {
        modal.classList.remove('custom-product-detail__size-guide-modal--loading');
        return;
      }

      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
          if (loadedCount === totalImages) {
            setTimeout(() => {
              modal.classList.remove('custom-product-detail__size-guide-modal--loading');
            }, 300);
          }
        } else {
          img.addEventListener('load', function () {
            loadedCount++;
            if (loadedCount === totalImages) {
              setTimeout(() => {
                modal.classList.remove('custom-product-detail__size-guide-modal--loading');
              }, 300);
            }
          });

          img.addEventListener('error', function () {
            loadedCount++;
            if (loadedCount === totalImages) {
              setTimeout(() => {
                modal.classList.remove('custom-product-detail__size-guide-modal--loading');
              }, 300);
            }
          });
        }
      });
    });

    function closeModal() {
      modal.classList.remove('custom-product-detail__size-guide-modal--active');
      modal.classList.remove('custom-product-detail__size-guide-modal--loading');
      unlockBodyScroll();
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (overlay) {
      overlay.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('custom-product-detail__size-guide-modal--active')) {
        closeModal();
      }
    });
  }

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

  function showError(section, message) {
    const errorContainer = section.querySelector('[data-availability-message]');

    if (errorContainer) {
      errorContainer.innerHTML = `<p class="custom-product-detail__availability-text custom-product-detail__availability-text--unavailable">${message}</p>`;

      setTimeout(() => {
        errorContainer.innerHTML = '';
      }, 3000);
    }
  }

  function formatMoney(cents) {
    const amount = (cents / 100).toFixed(2);
    const [rupees, paise] = amount.split('.');

    let lastThree = rupees.slice(-3);
    let remaining = rupees.slice(0, -3);

    if (remaining) {
      lastThree = ',' + lastThree;
      remaining = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    }

    return `₹${remaining}${lastThree}.${paise}`;
  }

  function formatInitialPrice(section) {
    const priceElement = section.querySelector('[data-product-price]');
    if (priceElement) {
      const cents = priceElement.dataset.priceCents;
      if (cents) {
        priceElement.textContent = formatMoney(parseInt(cents));
      }
    }
  }

  function reorderOptionElements(section, productData) {
    if (!productData.options) return;

    let needsVariantUpdate = false;

    productData.options.forEach((option) => {
      if (option.name === 'Purity') {
        const purityContainer = section.querySelector('[data-option-index="1"]');
        if (!purityContainer) return;

        const sortedValues = option.values;

        const purityOptions = Array.from(purityContainer.querySelectorAll('.custom-product-detail__purity-option'));

        purityOptions.forEach(opt => opt.classList.remove('custom-product-detail__purity-option--selected'));

        sortedValues.forEach((value, index) => {
          const optionElement = purityOptions.find(el => el.dataset.value === value);
          if (optionElement) {
            purityContainer.appendChild(optionElement);

            if (index === 0) {
              optionElement.classList.add('custom-product-detail__purity-option--selected');
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
        const sizeDropdownMenu = section.querySelector('[data-size-dropdown-menu]');
        if (!sizeDropdownMenu) return;

        const sortedValues = option.values;

        const sizeOptions = Array.from(sizeDropdownMenu.querySelectorAll('.custom-product-detail__size-option'));

        sizeOptions.forEach(opt => opt.classList.remove('custom-product-detail__size-option--selected'));

        sortedValues.forEach((value, index) => {
          const optionElement = sizeOptions.find(el => el.dataset.value === value);
          if (optionElement) {
            sizeDropdownMenu.appendChild(optionElement);

            if (index === 0) {
              optionElement.classList.add('custom-product-detail__size-option--selected');
              const dropdownValue = section.querySelector('[data-size-dropdown-value]');
              if (dropdownValue) {
                dropdownValue.textContent = value;
              }
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

    if (needsVariantUpdate) {
      updateSelectedVariant(section, productData, section.dataset.sectionId);
    }
  }

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

  function initStickyFooterVisibility() {
    const siteFooter = document.querySelector('.custom-diamension-footer');
    if (!siteFooter) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          const stickyBars = document.querySelectorAll('.custom-product-detail__footer');
          stickyBars.forEach(function (bar) {
            if (entry.isIntersecting) {
              bar.classList.add('custom-product-detail__footer--hidden');
            } else {
              bar.classList.remove('custom-product-detail__footer--hidden');
            }
          });
        });
      },
      { threshold: 0 }
    );

    observer.observe(siteFooter);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initProductDetail();
      updateTrustBadgesSentence();
      initStickyFooterVisibility();
    });
  } else {
    initProductDetail();
    updateTrustBadgesSentence();
    initStickyFooterVisibility();
  }

  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function () {
      initProductDetail();
      updateTrustBadgesSentence();
    });

    document.addEventListener('shopify:section:unload', function () {
    });
  }
})();
