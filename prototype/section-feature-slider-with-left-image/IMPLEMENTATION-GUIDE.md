# Feature Slider with Left Image - Implementation Guide

## Overview

This document outlines the file structure, development approach, and schema design for the "Feature Slider with Left Image" (New Arrivals) section.

---

## File Structure

### Theme Files (Production)
```
sections/
└── custom-section-feature-slider-with-left-image.liquid

assets/
├── section-feature-slider-with-left-image.css
└── section-feature-slider-with-left-image.js
```

### Prototype/Development Files
```
prototype/section-feature-slider-with-left-image/
├── design/
│   ├── design-tokens.md
├── assets/
│   ├── images/
│   │   └── sidebar-image.jpg (placeholder)
│   └── icons/
│       └── icon-arrow-right.svg
├── TECHNICAL-SPEC.md
├── ASSET-CHECKLIST.md
└── IMPLEMENTATION-GUIDE.md (this file)
```

---

## Section Schema

### Liquid Section File: `custom-section-feature-slider-with-left-image.liquid`

```liquid
{%- style -%}
  {{ 'section-feature-slider-with-left-image.css' | asset_url | stylesheet_tag }}
{%- endstyle -%}

<script src="{{ 'section-feature-slider-with-left-image.js' | asset_url }}" defer="defer"></script>

<div class="custom-section-feature-slider-with-left-image" data-section-id="{{ section.id }}">
  <!-- Sidebar Image (Desktop) -->
  {%- if section.settings.sidebar_image -%}
    <div class="custom-section-feature-slider-with-left-image__sidebar">
      <div class="custom-section-feature-slider-with-left-image__sidebar-image-wrapper">
        <img
          src="{{ section.settings.sidebar_image | image_url: width: 400 }}"
          alt="{{ section.settings.section_heading }}"
          class="custom-section-feature-slider-with-left-image__sidebar-image"
          loading="lazy"
        />
      </div>
    </div>
  {%- endif -%}

  <!-- Top Image (Mobile/Tablet) -->
  {%- if section.settings.sidebar_image -%}
    <div class="custom-section-feature-slider-with-left-image__top-image-wrapper">
      <img
        src="{{ section.settings.sidebar_image | image_url: width: 800 }}"
        alt="{{ section.settings.section_heading }}"
        class="custom-section-feature-slider-with-left-image__top-image"
        loading="lazy"
      />
    </div>
  {%- endif -%}

  <!-- Main Content Wrapper -->
  <div class="custom-section-feature-slider-with-left-image__content">
    <!-- Header with Title and Arrow -->
    <div class="custom-section-feature-slider-with-left-image__header">
      {%- if section.settings.show_heading -%}
        <h2 class="custom-section-feature-slider-with-left-image__heading">
          {{ section.settings.section_heading }}
        </h2>
      {%- endif -%}
      
      <button
        class="custom-section-feature-slider-with-left-image__nav-button"
        aria-label="Next Products"
        data-direction="next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M13.103 19.1471C12.9977 19.0417 12.9385 18.8987 12.9385 18.7496C12.9385 18.6006 12.9977 18.4576 13.103 18.3521L18.8921 12.5621L3.7505 12.5621C3.60131 12.5621 3.45824 12.5029 3.35275 12.3974C3.24726 12.2919 3.188 12.1488 3.188 11.9996C3.188 11.8505 3.24726 11.7074 3.35275 11.6019C3.45824 11.4964 3.60131 11.4371 3.7505 11.4371L18.8921 11.4371L13.103 5.64714C13.0036 5.54051 12.9495 5.39948 12.9521 5.25375C12.9547 5.10802 13.0137 4.96898 13.1168 4.86592C13.2198 4.76287 13.3589 4.70383 13.5046 4.70126C13.6503 4.69869 13.7914 4.75278 13.898 4.85214L20.648 11.6021C20.7533 11.7076 20.8125 11.8506 20.8125 11.9996C20.8125 12.1487 20.7533 12.2917 20.648 12.3971L13.898 19.1471C13.7925 19.2525 13.6496 19.3116 13.5005 19.3116C13.3514 19.3116 13.2085 19.2525 13.103 19.1471Z" fill="currentColor"/>
        </svg>
      </button>
    </div>

    <!-- Carousel Container -->
    <div class="custom-section-feature-slider-with-left-image__carousel-wrapper">
      <div
        class="custom-section-feature-slider-with-left-image__carousel-container"
        data-carousel-container
      >
        {%- assign collection = collections[section.settings.collection_handle] -%}
        
        {%- if collection and collection.products.size > 0 -%}
          {%- for product in collection.products limit: section.settings.products_limit -%}
            <div class="custom-section-feature-slider-with-left-image__card">
              <div class="custom-section-feature-slider-with-left-image__card-image-wrapper">
                <img
                  src="{{ product.featured_image | image_url: width: 400 }}"
                  alt="{{ product.title }}"
                  class="custom-section-feature-slider-with-left-image__card-image"
                  loading="lazy"
                />
              </div>

              <div class="custom-section-feature-slider-with-left-image__card-content">
                <h3 class="custom-section-feature-slider-with-left-image__card-title">
                  {{ product.title }}
                </h3>

                <p class="custom-section-feature-slider-with-left-image__card-price">
                  {{ product.price | money }}
                </p>

                <button
                  class="custom-section-feature-slider-with-left-image__wishlist-button"
                  aria-label="Add to Wishlist"
                  data-product-id="{{ product.id }}"
                  data-product-handle="{{ product.handle }}"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18.755" height="18.755" viewBox="0 0 24 24" fill="none">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor"/>
                  </svg>
                </button>
              </div>

              <a href="{{ product.url }}" class="custom-section-feature-slider-with-left-image__card-link" title="{{ product.title }}"></a>
            </div>
          {%- endfor -%}
        {%- else -%}
          <p class="custom-section-feature-slider-with-left-image__empty-state">
            No products found in selected collection.
          </p>
        {%- endif -%}
      </div>
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Feature Slider with Left Image",
  "settings": [
    {
      "type": "text",
      "id": "section_heading",
      "label": "Section Heading",
      "default": "New Arrivals"
    },
    {
      "type": "image_picker",
      "id": "sidebar_image",
      "label": "Sidebar/Top Image (Square 1:1 recommended)"
    },
    {
      "type": "text",
      "id": "collection_handle",
      "label": "Collection Handle",
      "placeholder": "e.g., new-arrivals",
      "info": "Enter the collection handle (URL slug) to display products"
    },
    {
      "type": "range",
      "id": "products_limit",
      "min": 3,
      "max": 20,
      "step": 1,
      "label": "Products to Display",
      "default": 10
    },
    {
      "type": "checkbox",
      "id": "show_heading",
      "label": "Show Section Heading",
      "default": true
    },
    {
      "type": "select",
      "id": "heading_alignment",
      "label": "Heading Alignment",
      "options": [
        {
          "value": "left",
          "label": "Left"
        },
        {
          "value": "center",
          "label": "Center"
        },
        {
          "value": "right",
          "label": "Right"
        }
      ],
      "default": "left"
    }
  ],
  "presets": [
    {
      "name": "Feature Slider with Left Image",
      "settings": {
        "section_heading": "New Arrivals",
        "products_limit": 10
      }
    }
  ]
}
{% endschema %}
```

---

## CSS Structure

### File: `assets/section-feature-slider-with-left-image.css`

**Naming Convention:** BEM (Block Element Modifier)

```css
/* ========================================
   Block: .custom-section-feature-slider-with-left-image
   ======================================== */

/* Base Layout */
.custom-section-feature-slider-with-left-image {
  max-width: 1440px;
  margin: 0 auto;
  padding: 80px 40px;
  background-color: #FFFAF5;
}

/* Sidebar - Desktop Only */
.custom-section-feature-slider-with-left-image__sidebar {
  /* Desktop layout styles */
}

.custom-section-feature-slider-with-left-image__sidebar-image-wrapper {
  aspect-ratio: 1 / 1;
}

.custom-section-feature-slider-with-left-image__sidebar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Top Image - Mobile/Tablet Only */
.custom-section-feature-slider-with-left-image__top-image-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1;
  margin-bottom: 40px;
}

.custom-section-feature-slider-with-left-image__top-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Header Section */
.custom-section-feature-slider-with-left-image__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.custom-section-feature-slider-with-left-image__heading {
  font-family: 'Neue Haas Display', sans-serif;
  font-size: 30px;
  font-weight: 400; /* Light weight */
  line-height: 50px;
  text-transform: uppercase;
  color: #183754;
  margin: 0;
}

/* Arrow Button */
.custom-section-feature-slider-with-left-image__nav-button {
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  flex-shrink: 0;
}

.custom-section-feature-slider-with-left-image__nav-button svg {
  width: 100%;
  height: 100%;
}

/* Carousel Container */
.custom-section-feature-slider-with-left-image__carousel-wrapper {
  overflow: hidden;
  position: relative;
}

.custom-section-feature-slider-with-left-image__carousel-container {
  display: flex;
  gap: 24px;
  will-change: transform;
}

/* Product Card */
.custom-section-feature-slider-with-left-image__card {
  flex: 0 0 auto;
  position: relative;
  background-color: #F0EFEA;
}

.custom-section-feature-slider-with-left-image__card-image-wrapper {
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background-color: #F0EFEA;
}

.custom-section-feature-slider-with-left-image__card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Card Content */
.custom-section-feature-slider-with-left-image__card-content {
  padding: 12px 16px;
}

.custom-section-feature-slider-with-left-image__card-title {
  font-family: 'Neue Haas Display', sans-serif;
  font-size: 20px;
  font-weight: 400; /* Light weight */
  line-height: 30px;
  color: #183754;
  margin: 0 0 8px 0;
}

.custom-section-feature-slider-with-left-image__card-price {
  font-family: 'Neue Haas Display', sans-serif;
  font-size: 14px;
  font-weight: 500; /* Medium weight */
  line-height: 20px;
  text-transform: uppercase;
  color: #183754;
  margin: 0 0 16px 0;
}

/* Wishlist Button */
.custom-section-feature-slider-with-left-image__wishlist-button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #183754;
  transition: all 0.3s ease;
  padding: 0;
  flex-shrink: 0;
}

.custom-section-feature-slider-with-left-image__wishlist-button svg {
  width: 18.755px;
  height: 18.755px;
}

.custom-section-feature-slider-with-left-image__wishlist-button--active {
  background-color: #183754;
  border-radius: 50%;
  color: #FFFAF5;
}

.custom-section-feature-slider-with-left-image__wishlist-button--active svg {
  fill: currentColor;
}

/* Card Link Overlay */
.custom-section-feature-slider-with-left-image__card-link {
  position: absolute;
  inset: 0;
}

/* ========================================
   Responsive: Tablet (max-width: 1024px)
   ======================================== */

@media (max-width: 1024px) {
  .custom-section-feature-slider-with-left-image {
    padding: 60px 30px;
  }

  .custom-section-feature-slider-with-left-image__sidebar {
    display: none;
  }

  .custom-section-feature-slider-with-left-image__heading {
    font-size: 26px;
  }

  .custom-section-feature-slider-with-left-image__carousel-container {
    gap: 20px;
  }

  .custom-section-feature-slider-with-left-image__card-title {
    font-size: 18px;
  }
}

/* ========================================
   Responsive: Mobile (max-width: 767px)
   ======================================== */

@media (max-width: 767px) {
  .custom-section-feature-slider-with-left-image {
    padding: 40px 20px;
  }

  .custom-section-feature-slider-with-left-image__sidebar {
    display: none;
  }

  .custom-section-feature-slider-with-left-image__top-image-wrapper {
    margin-bottom: 30px;
  }

  .custom-section-feature-slider-with-left-image__heading {
    font-size: 24px;
    line-height: 40px;
  }

  .custom-section-feature-slider-with-left-image__carousel-container {
    gap: 16px;
  }

  .custom-section-feature-slider-with-left-image__card-title {
    font-size: 16px;
    line-height: 24px;
  }

  .custom-section-feature-slider-with-left-image__card-price {
    font-size: 12px;
  }

  .custom-section-feature-slider-with-left-image__card-content {
    padding: 10px 12px;
  }
}

/* ========================================
   Responsive: Small Mobile (max-width: 375px)
   ======================================== */

@media (max-width: 375px) {
  .custom-section-feature-slider-with-left-image {
    padding: 30px 15px;
  }

  .custom-section-feature-slider-with-left-image__heading {
    font-size: 22px;
  }

  .custom-section-feature-slider-with-left-image__card-title {
    font-size: 14px;
  }
}

/* ========================================
   Desktop Variant: 1440px+ (Large Desktop)
   ======================================== */

@media (min-width: 1441px) {
  .custom-section-feature-slider-with-left-image {
    max-width: 1440px;
    margin: 0 auto;
  }
}

/* ========================================
   Empty State
   ======================================== */

.custom-section-feature-slider-with-left-image__empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #183754;
  font-size: 16px;
}
```

---

## JavaScript Implementation

### File: `assets/section-feature-slider-with-left-image.js`

```javascript
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
    this.direction = 'next'; // 'next' or 'prev'
    this.wishlistKey = 'diamension_wishlist';
    
    this.init();
  }

  init() {
    this.setCardWidths();
    this.bindEvents();
    this.loadWishlistState();
    this.updateNavButton();
    window.addEventListener('resize', () => this.handleResize());
  }

  setCardWidths() {
    const viewportWidth = window.innerWidth;
    let visibleCards = 3; // Default for 1440px+
    let offsetCard = false;

    if (viewportWidth < 1025) {
      visibleCards = 2; // Mobile/Tablet
      offsetCard = false;
    } else if (viewportWidth < 1441 && viewportWidth >= 1250) {
      visibleCards = 2; // Desktop 1250-1440px
      offsetCard = true;
    } else if (viewportWidth >= 1025 && viewportWidth < 1250) {
      visibleCards = 3; // Tablet 1025-1249px
      offsetCard = false;
    }

    this.visibleCards = visibleCards;
    this.offsetCard = offsetCard;
  }

  bindEvents() {
    this.navButton.addEventListener('click', () => this.navigate());
    this.wishlistButtons.forEach(button => {
      button.addEventListener('click', (e) => this.toggleWishlist(e));
    });
  }

  navigate() {
    if (this.isAnimating) return;
    
    const maxIndex = this.cards.length - this.visibleCards;
    const canScrollNext = this.currentIndex < maxIndex;

    if (!canScrollNext) {
      // At end, scroll back to start
      this.currentIndex = 0;
      this.direction = 'next';
    } else {
      this.currentIndex += 1;
    }

    this.animateCarousel();
    this.updateNavButton();
  }

  animateCarousel() {
    this.isAnimating = true;
    
    const cardWidth = this.cards[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(this.carouselContainer).gap);
    const distance = -(this.currentIndex * (cardWidth + gap));

    gsap.to(this.carouselContainer, {
      x: distance,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        this.isAnimating = false;
      }
    });
  }

  updateNavButton() {
    const maxIndex = this.cards.length - this.visibleCards;
    const isAtEnd = this.currentIndex >= maxIndex;
    
    if (isAtEnd) {
      this.navButton.setAttribute('aria-label', 'Previous Products');
      gsap.to(this.navButton, {
        rotation: 180,
        duration: 0.4,
        ease: 'power2.inOut'
      });
      this.direction = 'prev';
    } else {
      this.navButton.setAttribute('aria-label', 'Next Products');
      gsap.to(this.navButton, {
        rotation: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      });
      this.direction = 'next';
    }
  }

  toggleWishlist(event) {
    const button = event.currentTarget;
    const productId = button.dataset.productId;
    const productHandle = button.dataset.productHandle;
    const isActive = button.classList.contains('custom-section-feature-slider-with-left-image__wishlist-button--active');

    // Animation
    gsap.timeline()
      .to(button, { scale: 0.9, duration: 0.15 }, 0)
      .to(button, { scale: 1, duration: 0.15 }, 0.15);

    if (isActive) {
      this.removeFromWishlist(productId, button);
    } else {
      this.addToWishlist(productId, productHandle, button);
    }
  }

  addToWishlist(productId, productHandle, button) {
    const wishlist = this.getWishlist();
    
    if (!wishlist.some(item => item.productId === productId)) {
      wishlist.push({
        productId,
        productHandle,
        timestamp: Date.now()
      });
      
      this.saveWishlist(wishlist);
      button.classList.add('custom-section-feature-slider-with-left-image__wishlist-button--active');
    }
  }

  removeFromWishlist(productId, button) {
    const wishlist = this.getWishlist();
    const filtered = wishlist.filter(item => item.productId !== productId);
    
    this.saveWishlist(filtered);
    button.classList.remove('custom-section-feature-slider-with-left-image__wishlist-button--active');
  }

  getWishlist() {
    const data = localStorage.getItem(this.wishlistKey);
    return data ? JSON.parse(data).wishlist : [];
  }

  saveWishlist(wishlist) {
    localStorage.setItem(this.wishlistKey, JSON.stringify({ wishlist }));
  }

  loadWishlistState() {
    const wishlist = this.getWishlist();
    const wishlistProductIds = wishlist.map(item => item.productId);

    this.wishlistButtons.forEach(button => {
      const productId = button.dataset.productId;
      if (wishlistProductIds.includes(productId)) {
        button.classList.add('custom-section-feature-slider-with-left-image__wishlist-button--active');
      }
    });
  }

  handleResize() {
    this.setCardWidths();
    this.currentIndex = 0;
    this.animateCarousel();
    this.updateNavButton();
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('[data-section-id]');
  sections.forEach(section => {
    new FeatureSliderWithLeftImage(section);
  });
});
```

---

## Implementation Workflow

### Phase 1: Setup
1. [ ] Create Liquid section file
2. [ ] Create CSS file with BEM structure
3. [ ] Create JavaScript file with carousel logic
4. [ ] Test responsive behavior at all breakpoints

### Phase 2: Features
1. [ ] Implement carousel navigation
2. [ ] Implement wishlist functionality
3. [ ] Add GSAP animations
4. [ ] Test on real Shopify store

### Phase 3: Optimization
1. [ ] Optimize images
2. [ ] Minify CSS and JavaScript
3. [ ] Test performance on mobile
4. [ ] Cross-browser testing

### Phase 4: QA & Launch
1. [ ] Visual regression testing
2. [ ] Accessibility audit
3. [ ] Final merchant review
4. [ ] Deploy to production

---

## Key Considerations

- **GSAP Library:** Ensure GSAP is loaded in theme before this script runs
- **Image URLs:** Use Shopify's `image_url` filter with width parameter for optimization
- **Responsive:** JavaScript detects viewport changes and adjusts card display
- **Accessibility:** Proper ARIA labels on buttons
- **LocalStorage:** Persists wishlist across sessions
- **Performance:** Use `will-change: transform` and GPU acceleration

---

## Testing Checklist

- [ ] Carousel scrolls smoothly on all breakpoints
- [ ] Arrow button flips direction correctly
- [ ] Wishlist adds/removes items correctly
- [ ] LocalStorage data persists on refresh
- [ ] Images load lazily
- [ ] No console errors
- [ ] Mobile touch interactions work
- [ ] Animation performance is smooth (60fps)
