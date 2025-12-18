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
      initAddToCart(section, productData, sectionId);
      initBuyNow(section, productData);
      initSizeGuide();
    });
  }

  // ===== 1. THUMBNAIL GALLERY =====
  function initThumbnailGallery(section, sectionId) {
    const thumbnails = section.querySelectorAll('.custom-product-detail__thumbnail');
    const mainImage = section.querySelector(`#mainImage-${sectionId}`);

    if (!thumbnails.length || !mainImage) return;

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

          // Fade effect
          mainImage.style.opacity = '0';
          setTimeout(() => {
            mainImage.src = newSrc;
            mainImage.style.opacity = '1';
          }, 100);
        }
      });
    });
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
  function initWishlist(section, productData) {
    const wishlistBtn = section.querySelector('.custom-product-detail__wishlist-btn');

    if (!wishlistBtn) return;

    const productId = productData.id;

    // Check if already in wishlist
    let wishlist = JSON.parse(localStorage.getItem('diamension_wishlist') || '[]');
    if (wishlist.includes(productId)) {
      wishlistBtn.classList.add('custom-product-detail__wishlist-btn--active');
    }

    wishlistBtn.addEventListener('click', function (e) {
      e.preventDefault();

      wishlist = JSON.parse(localStorage.getItem('diamension_wishlist') || '[]');

      if (wishlist.includes(productId)) {
        // Remove from wishlist
        wishlist = wishlist.filter((id) => id !== productId);
        this.classList.remove('custom-product-detail__wishlist-btn--active');
      } else {
        // Add to wishlist
        wishlist.push(productId);
        this.classList.add('custom-product-detail__wishlist-btn--active');
      }

      localStorage.setItem('diamension_wishlist', JSON.stringify(wishlist));

      // Dispatch custom event for other parts of theme
      document.dispatchEvent(
        new CustomEvent('wishlist:updated', {
          detail: { wishlist: wishlist, productId: productId },
        })
      );

      // Animation
      this.style.transform = 'scale(1.2)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
    });
  }

  // ===== 5. VARIANT SELECTION =====
  function initVariantSelection(section, productData, sectionId) {
    // Get all option selectors
    const purityOptions = section.querySelectorAll('.custom-product-detail__purity-option');
    const metalOptions = section.querySelectorAll('.custom-product-detail__metal-option');
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

    // Size selection
    sizeOptions.forEach((option) => {
      option.addEventListener('click', function () {
        console.log('🔧 SIZE CLICKED:', this.dataset.value);
        sizeOptions.forEach((opt) => opt.classList.remove('custom-product-detail__size-option--selected'));
        this.classList.add('custom-product-detail__size-option--selected');

        // Update label
        const label = section.querySelector('[data-selected-value="3"]');
        if (label) {
          label.textContent = this.dataset.value;
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

  // ===== 7. ADD TO CART =====
  function initAddToCart(section, productData, sectionId) {
    const form = section.querySelector('[data-product-form]');
    const addToCartBtn = section.querySelector('[data-add-to-cart]');

    if (!form || !addToCartBtn) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const variantId = formData.get('id');

      if (!variantId) {
        showError(section, 'Please select all options');
        return;
      }

      // Disable button
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
            quantity: 1,
          }),
        });

        if (response.ok) {
          addToCartBtn.textContent = 'ADDED ✓';

          // Update cart count (if cart drawer exists)
          updateCartCount();

          // Trigger cart drawer open (if theme has one)
          document.dispatchEvent(new CustomEvent('cart:item-added'));

          setTimeout(() => {
            addToCartBtn.textContent = originalText;
            addToCartBtn.disabled = false;
          }, 2000);
        } else {
          const data = await response.json();
          throw new Error(data.description || 'Failed to add to cart');
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
  function initSizeGuide() {
    const sizeGuideLinks = document.querySelectorAll('[data-size-guide-trigger]');
    const modal = document.getElementById('sizeGuideModal');

    if (!modal) return;

    const closeBtn = modal.querySelector('.size-guide-modal__close');
    const overlay = modal.querySelector('.size-guide-modal__overlay');

    sizeGuideLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        modal.classList.add('size-guide-modal--active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      modal.classList.remove('size-guide-modal--active');
      document.body.style.overflow = '';
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (overlay) {
      overlay.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('size-guide-modal--active')) {
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

  // Format money (Shopify money format)
  function formatMoney(cents) {
    const dollars = (cents / 100).toFixed(2);
    return `₹${dollars}`;
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
