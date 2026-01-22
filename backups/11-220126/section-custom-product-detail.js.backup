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

      console.log('🚀 INITIALIZING PRODUCT DETAIL');
      console.log('  Section ID:', sectionId);
      console.log('  Product Data:', productData);
      console.log('  Total Variants:', productData.variants?.length);
      console.log('  First Variant Metafields:', productData.variants?.[0]?.metafields);

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
    });
  }

  // ===== 1. THUMBNAIL GALLERY =====
  function initThumbnailGallery(section, sectionId) {
    const thumbnails = section.querySelectorAll('.custom-product-detail__thumbnail');
    const mainImage = section.querySelector(`#mainImage-${sectionId}`);
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
    const mainImage = section.querySelector(`#mainImage-${sectionId}`);
    const modal = section.querySelector(`#imageModal-${sectionId}`);
    const modalImage = section.querySelector(`#modalImage-${sectionId}`);
    const modalClose = section.querySelector('.custom-product-detail__modal-close');

    if (!mainImage || !modal || !modalImage) return;

    // Open modal on image click
    mainImage.addEventListener('click', function () {
      modalImage.src = this.src;
      modal.classList.add('custom-product-detail__modal--active');
      document.body.style.overflow = 'hidden';
    });

    // Close modal
    function closeModal() {
      modal.classList.remove('custom-product-detail__modal--active');
      document.body.style.overflow = '';
    }

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('custom-product-detail__modal--active')) {
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
        })
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
        console.log('🔧 PURITY CLICKED:', this.dataset.value);
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
        console.log('🔧 METAL CLICKED:', this.dataset.value);
        metalOptions.forEach((opt) => opt.classList.remove('custom-product-detail__metal-option--selected'));
        this.classList.add('custom-product-detail__metal-option--selected');

        // Update label
        const label = section.querySelector('[data-selected-value="2"]');
        if (label) {
          label.textContent = this.dataset.value;
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
        console.log('🔧 SIZE CLICKED:', this.dataset.value);
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

    console.log('🔍 UPDATE SELECTED VARIANT CALLED');
    console.log('  Option 1 (Purity):', option1);
    console.log('  Option 2 (Metal):', option2);
    console.log('  Option 3 (Size):', option3);

    if (!option1 || !option2 || !option3) {
      console.warn('⚠️ Not all options selected yet');
      return;
    }

    // Find matching variant
    const variant = productData.variants.find((v) => {
      return v.option1 === option1 && v.option2 === option2 && v.option3 === option3;
    });

    console.log('🔎 Looking for variant with:', { option1, option2, option3 });
    console.log('✅ Found variant:', variant);

    if (variant) {
      console.log('📦 Variant details:', {
        id: variant.id,
        price: variant.price,
        available: variant.available,
        metafields: variant.metafields,
      });

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
    } else {
      console.error('❌ No matching variant found!');
      console.log('📋 Available variants:', productData.variants);
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
    console.log('💰 UPDATE PRICE BREAKUP CALLED');
    console.log('  Variant metafields:', variant.metafields);

    // Metal row
    const metalLabel = section.querySelector('[data-metal-label]');
    const metalCharges = section.querySelector('[data-metal-charges]');

    console.log('🔧 Metal Label Element:', metalLabel);
    console.log('🔧 Metal Charges Element:', metalCharges);

    if (metalLabel && variant.option1 && variant.option2) {
      let labelText = `${variant.option1} ${variant.option2}`;
      if (variant.metafields && variant.metafields.metal_weight) {
        labelText += ` (${variant.metafields.metal_weight})`;
      }
      console.log('  ✏️ Updating metal label to:', labelText);
      metalLabel.textContent = labelText;
    }

    if (metalCharges && variant.metafields && variant.metafields.metal_charges) {
      const chargesText = `₹${variant.metafields.metal_charges}`;
      console.log('  ✏️ Updating metal charges to:', chargesText);
      metalCharges.textContent = chargesText;
    } else {
      console.warn('  ⚠️ Metal charges not updated:', {
        hasElement: !!metalCharges,
        hasMetafields: !!variant.metafields,
        metalCharges: variant.metafields?.metal_charges,
      });
    }

    // Diamond row
    const diamondLabel = section.querySelector('[data-diamond-label]');
    const diamondCharges = section.querySelector('[data-diamond-charges]');

    console.log('💎 Diamond Label Element:', diamondLabel);
    console.log('💎 Diamond Charges Element:', diamondCharges);

    if (diamondLabel && variant.metafields && variant.metafields.diamond_in_ct) {
      const labelText = `Diamonds (${variant.metafields.diamond_in_ct})`;
      console.log('  ✏️ Updating diamond label to:', labelText);
      diamondLabel.textContent = labelText;
    }

    if (diamondCharges && variant.metafields && variant.metafields.diamond_charges) {
      const chargesText = `₹${variant.metafields.diamond_charges}`;
      console.log('  ✏️ Updating diamond charges to:', chargesText);
      diamondCharges.textContent = chargesText;
    } else {
      console.warn('  ⚠️ Diamond charges not updated:', {
        hasElement: !!diamondCharges,
        hasMetafields: !!variant.metafields,
        diamondCharges: variant.metafields?.diamond_charges,
      });
    }

    // Making charges
    const makingCharges = section.querySelector('[data-making-charges]');
    console.log('🛠️ Making Charges Element:', makingCharges);

    if (makingCharges && variant.metafields && variant.metafields.making_charges) {
      const chargesText = `₹${variant.metafields.making_charges}`;
      console.log('  ✏️ Updating making charges to:', chargesText);
      makingCharges.textContent = chargesText;
    } else {
      console.warn('  ⚠️ Making charges not updated:', {
        hasElement: !!makingCharges,
        hasMetafields: !!variant.metafields,
        makingCharges: variant.metafields?.making_charges,
      });
    }

    // GST
    const gstLabel = section.querySelector('[data-gst-label]');
    const gstCharges = section.querySelector('[data-gst-charges]');

    console.log('📊 GST Label Element:', gstLabel);
    console.log('📊 GST Charges Element:', gstCharges);

    if (gstLabel && variant.metafields && variant.metafields.gst_rate) {
      const labelText = `GST (${variant.metafields.gst_rate}%)`;
      console.log('  ✏️ Updating GST label to:', labelText);
      gstLabel.textContent = labelText;
    }

    if (gstCharges && variant.metafields && variant.metafields.gst_charges) {
      const chargesText = `₹${variant.metafields.gst_charges}`;
      console.log('  ✏️ Updating GST charges to:', chargesText);
      gstCharges.textContent = chargesText;
    } else {
      console.warn('  ⚠️ GST charges not updated:', {
        hasElement: !!gstCharges,
        hasMetafields: !!variant.metafields,
        gstCharges: variant.metafields?.gst_charges,
      });
    }

    // Total
    const totalPrice = section.querySelector('[data-total-price]');
    console.log('💵 Total Price Element:', totalPrice);

    if (totalPrice && variant.price) {
      const totalText = `₹${(variant.price / 100).toFixed(2)}`;
      console.log('  ✏️ Updating total price to:', totalText);
      totalPrice.textContent = totalText;
    }

    console.log('✅ PRICE BREAKUP UPDATE COMPLETE');
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
            console.log('🛒 Updating cart icon badge...');

            // Fetch cart data to get item count
            const cartDataResponse = await fetch('/cart.js');
            const cartData = await cartDataResponse.json();
            console.log('  Cart data:', cartData);
            console.log('  Item count:', cartData.item_count);

            // Update all cart count elements
            const cartCountElements = document.querySelectorAll('[data-cart-count]');
            console.log('  Found cart count elements:', cartCountElements.length);

            cartCountElements.forEach((el) => {
              el.textContent = cartData.item_count;
              console.log('  Updated cart count element:', el);
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

            console.log('🛒 Cart icon badge updated!');
          } catch (error) {
            console.error('Error updating cart icon:', error);
          }

          // Manually fetch and update cart drawer
          const cartDrawer = document.querySelector('cart-drawer');
          const cartDrawerItems = document.querySelector('cart-drawer-items');

          console.log('🛒 Updating cart drawer...');
          console.log('  Cart drawer exists:', !!cartDrawer);
          console.log('  Cart drawer items exists:', !!cartDrawerItems);

          if (cartDrawer && cartDrawerItems) {
            try {
              const cartResponse = await fetch(`${window.routes.cart_url}?section_id=cart-drawer`);
              const cartHtml = await cartResponse.text();
              console.log('🛒 Fetched cart HTML (first 300 chars):', cartHtml.substring(0, 300));

              const parser = new DOMParser();
              const doc = parser.parseFromString(cartHtml, 'text/html');

              // Get the entire cart drawer from fetched HTML
              const newCartDrawer = doc.querySelector('cart-drawer');
              console.log('🛒 New full cart drawer found:', !!newCartDrawer);

              if (newCartDrawer) {
                // Get the inner content
                const newInnerContent = newCartDrawer.querySelector('.drawer__inner');
                const currentInnerContent = cartDrawer.querySelector('.drawer__inner');

                console.log('🛒 New inner content found:', !!newInnerContent);
                console.log('🛒 Current inner content found:', !!currentInnerContent);

                if (newInnerContent && currentInnerContent) {
                  currentInnerContent.innerHTML = newInnerContent.innerHTML;
                  console.log('🛒 Replaced drawer inner content');
                }

                // Remove is-empty class
                const wasEmpty = cartDrawer.classList.contains('is-empty');
                cartDrawer.classList.remove('is-empty');
                console.log('🛒 Was empty:', wasEmpty, '→ Now has content');

                // Check final state
                const finalCartItems = cartDrawer.querySelectorAll('.cart-item');
                console.log('🛒 Final cart items count in drawer:', finalCartItems.length);

                // Log the actual HTML structure
                const cartItemsWrapper = cartDrawer.querySelector('.drawer__cart-items-wrapper');
                console.log('🛒 Cart items wrapper exists:', !!cartItemsWrapper);
                if (cartItemsWrapper) {
                  console.log(
                    '🛒 Cart items wrapper HTML (first 500 chars):',
                    cartItemsWrapper.innerHTML.substring(0, 500)
                  );
                }
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

      console.log('🔒 Body scroll locked');
      console.log('  Scroll position:', scrollPosition);
    }

    // Function to unlock body scroll
    function unlockBodyScroll() {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('width');
      window.scrollTo(0, scrollPosition);

      console.log('🔓 Body scroll unlocked');
    }

    // Fix: Manually handle wheel events and convert to scroll
    // Because position: fixed on body prevents default scroll behavior
    if (scrollContainer) {
      console.log('📜 Size Guide Scroll Container Found - Adding manual scroll handler');

      scrollContainer.addEventListener('scroll', function() {
        console.log('✅ SCROLL EVENT ON CONTAINER:', this.scrollTop);
      });

      scrollContainer.addEventListener('wheel', function(e) {
        console.log('🖱️ WHEEL EVENT ON CONTAINER:', e.deltaY, 'Target:', e.target.tagName);

        // Manually scroll the container
        e.preventDefault();
        e.stopPropagation();
        this.scrollTop += e.deltaY;

        console.log('📜 Manual scroll applied. New scrollTop:', this.scrollTop);
      }, { passive: false });

      // Log computed styles after modal opens
      setTimeout(() => {
        const styles = window.getComputedStyle(scrollContainer);
        console.log('📏 Scroll Container Styles:', {
          position: styles.position,
          overflow: styles.overflow,
          overflowY: styles.overflowY,
          height: styles.height,
          maxHeight: styles.maxHeight
        });
      }, 100);
    }

    // Open modal on size guide link click
    sizeGuideTrigger.addEventListener('click', function (e) {
      e.preventDefault();

      console.log('🚀 Opening Size Guide Modal');

      // Add loading state
      modal.classList.add('custom-product-detail__size-guide-modal--loading');
      modal.classList.add('custom-product-detail__size-guide-modal--active');
      lockBodyScroll();

      // Debug: Check scroll container dimensions
      setTimeout(() => {
        if (scrollContainer) {
          console.log('📐 Scroll Container Dimensions:', {
            scrollHeight: scrollContainer.scrollHeight,
            clientHeight: scrollContainer.clientHeight,
            canScroll: scrollContainer.scrollHeight > scrollContainer.clientHeight
          });
        }
      }, 500);

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
