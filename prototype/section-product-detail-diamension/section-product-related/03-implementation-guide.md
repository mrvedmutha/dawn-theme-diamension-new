# Related Products Section - Implementation Guide

## 📌 Purpose
This document provides step-by-step instructions for implementing the "Similar Products" carousel section. Follow these steps sequentially to build a pixel-perfect, fully functional section.

---

## ⚠️ Prerequisites

Before starting, ensure you have:

1. ✅ Read `01-overview.md` completely
2. ✅ Read `02-design-tokens.md` and have it open for reference
3. ✅ Read all project rules in `docs/rules/` folder
4. ✅ Fetched Figma nodes (206-452, 206-455, 206-461, 206-523)
5. ✅ Reviewed `wishlist-button-implementation/implementation-overview.md`
6. ✅ Have Shopify CLI running (`shopify theme dev`)
7. ✅ Have a test product page to work with

---

## 📁 Step 1: Create Required Files

### 1.1 Create Section File
```bash
touch sections/custom-product-related.liquid
```

### 1.2 Create CSS File
```bash
touch assets/section-product-related.css
```

### 1.3 Create JavaScript File
```bash
touch assets/section-product-related.js
```

---

## 🧱 Step 2: Build Liquid Structure

Open `sections/custom-product-related.liquid` and create the base structure:

### 2.1 Link Stylesheet and Define Schema

```liquid
{{ 'section-product-related.css' | asset_url | stylesheet_tag }}

{%- comment -%} Section code will go here {%- endcomment -%}

<script src="{{ 'section-product-related.js' | asset_url }}" defer></script>

{% schema %}
{
  "name": "Related Products",
  "tag": "section",
  "class": "custom-section-related-products-wrapper",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Section Heading",
      "default": "Similar Products"
    },
    {
      "type": "select",
      "id": "product_source",
      "label": "Product Source",
      "options": [
        {
          "value": "recommendations",
          "label": "Automatic Recommendations"
        },
        {
          "value": "collection",
          "label": "From Collection"
        }
      ],
      "default": "recommendations"
    },
    {
      "type": "collection",
      "id": "collection",
      "label": "Select Collection",
      "info": "Only used if 'From Collection' is selected above"
    },
    {
      "type": "range",
      "id": "products_to_show",
      "min": 2,
      "max": 10,
      "step": 1,
      "label": "Number of Products",
      "default": 10
    },
    {
      "type": "checkbox",
      "id": "enable_wishlist",
      "label": "Enable Wishlist Button",
      "default": true
    }
  ],
  "presets": [
    {
      "name": "Related Products"
    }
  ]
}
{% endschema %}
```

### 2.2 Build Product Fetching Logic

Add this BEFORE the schema section:

```liquid
{%- liquid
  # Get product limit from settings
  assign products_limit = section.settings.products_to_show

  # Determine product source
  if section.settings.product_source == 'recommendations'
    # Use Shopify's product recommendations
    # NOTE: This requires product context - typically used on product pages
    assign related_products = recommendations.products | default: blank
  elsif section.settings.product_source == 'collection' and section.settings.collection != blank
    # Use products from selected collection
    assign related_products = section.settings.collection.products
  else
    # Fallback to empty array
    assign related_products = blank
  endif

  # Limit products to the specified number
  if related_products != blank
    assign related_products = related_products | slice: 0, products_limit
  endif
-%}

{%- comment -%} Only render section if we have products {%- endcomment -%}
{% if related_products.size > 0 %}

  {%- comment -%} Section markup goes here {%- endcomment -%}

{% endif %}
```

### 2.3 Build Section HTML Structure

Replace the comment `{%- comment -%} Section markup goes here {%- endcomment -%}` with:

```liquid
{%- comment -%} Section Wrapper - Full width with background {%- endcomment -%}
<div class="custom-section-related-products-wrapper">

  {%- comment -%} Container - Max-width 1440px, centered {%- endcomment -%}
  <div class="custom-section-related-products">

    {%- comment -%} Section Heading {%- endcomment -%}
    {% if section.settings.heading != blank %}
      <h2 class="custom-section-related-products__title">
        {{ section.settings.heading }}
      </h2>
    {% endif %}

    {%- comment -%} Carousel Container {%- endcomment -%}
    <div class="custom-section-related-products__carousel-container">

    {%- comment -%} Left Arrow {%- endcomment -%}
    <button
      class="custom-section-related-products__arrow custom-section-related-products__arrow--left"
      data-carousel-arrow="left"
      aria-label="Previous products"
    >
      {%- comment -%} Chevron SVG - Extract from Figma or use existing {%- endcomment -%}
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <path d="M35 14L21 28L35 42" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    {%- comment -%} Product Cards Wrapper {%- endcomment -%}
    <div
      class="custom-section-related-products__cards-wrapper"
      data-carousel-wrapper
    >

      {%- for product in related_products -%}
        <div class="custom-section-related-products__card">

          {%- comment -%} Product Link {%- endcomment -%}
          <a href="{{ product.url }}" class="custom-section-related-products__card-link">

            {%- comment -%} Image Wrapper {%- endcomment -%}
            <div class="custom-section-related-products__image-wrapper">

              {%- comment -%} Product Image {%- endcomment -%}
              {% if product.featured_image %}
                <img
                  src="{{ product.featured_image | image_url: width: 500 }}"
                  srcset="
                    {{ product.featured_image | image_url: width: 250 }} 250w,
                    {{ product.featured_image | image_url: width: 500 }} 500w
                  "
                  sizes="260px"
                  alt="{{ product.featured_image.alt | escape }}"
                  class="custom-section-related-products__image"
                  loading="lazy"
                  width="250"
                  height="250"
                >
              {% else %}
                {%- comment -%} Placeholder image {%- endcomment -%}
                {{ 'product-1' | placeholder_svg_tag: 'custom-section-related-products__image custom-section-related-products__image--placeholder' }}
              {% endif %}

              {%- comment -%} Gradient Overlay (for hover effect) {%- endcomment -%}
              <div class="custom-section-related-products__gradient-overlay"></div>

            </div>

            {%- comment -%} Product Info {%- endcomment -%}
            <div class="custom-section-related-products__info">

              {%- comment -%} Product Name {%- endcomment -%}
              <h3 class="custom-section-related-products__product-name">
                {{ product.title }}
              </h3>

              {%- comment -%} Product Price {%- endcomment -%}
              <div class="custom-section-related-products__product-price">
                {%- liquid
                  # Check if product has price range
                  assign has_price_range = false
                  if product.price_varies
                    assign has_price_range = true
                  endif
                -%}

                {% if has_price_range %}
                  From {{ product.price_min | money }}
                {% else %}
                  {{ product.price | money }}
                {% endif %}
              </div>

            </div>

          </a>

          {%- comment -%} Wishlist Button {%- endcomment -%}
          {% if section.settings.enable_wishlist %}
            <button
              class="custom-section-related-products__wishlist-btn"
              data-wishlist-button
              data-product-id="{{ product.id }}"
              aria-label="Add to wishlist"
              type="button"
            >
              {%- comment -%} Heart SVG - 24x24px {%- endcomment -%}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  stroke="#183754"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                />
              </svg>
            </button>
          {% endif %}

        </div>
      {%- endfor -%}

    </div>

    {%- comment -%} Right Arrow {%- endcomment -%}
    <button
      class="custom-section-related-products__arrow custom-section-related-products__arrow--right"
      data-carousel-arrow="right"
      aria-label="Next products"
    >
      {%- comment -%} Chevron SVG {%- endcomment -%}
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <path d="M21 14L35 28L21 42" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    {%- comment -%} Close Carousel Container {%- endcomment -%}
  </div>

  {%- comment -%} Close Container {%- endcomment -%}
  </div>

{%- comment -%} Close Section Wrapper {%- endcomment -%}
</div>
```

---

## 🎨 Step 3: Implement CSS Styles

Open `assets/section-product-related.css` and implement the following:

### 3.1 CSS Variables (Design Tokens)

```css
:root {
  /* Colors */
  --related-color-primary-dark: #183754;
  --related-color-secondary-blue: #3e6282;
  --related-color-bg-cream: #FFFAF5;
  --related-color-bg-beige: #f0efea;
  --related-color-wishlist-active: #FFFCF9;

  /* Typography */
  --related-font-primary: 'Neue Haas Grotesk Display Pro', sans-serif;
  --related-font-secondary: 'Neue Montreal', sans-serif;

  /* Spacing */
  --related-section-container-max-width: 1440px;
  --related-section-padding-v: 100px;
  --related-section-padding-h: 50px;
  --related-title-gap: 24px;
  --related-card-gap: 10px;
  --related-card-width: 260px;
  --related-image-wrapper-height: 360px;
  --related-image-size: 250px;
  --related-card-image-gap: 10px;
  --related-name-price-gap: 4px;

  /* Transitions */
  --related-transition-default: 0.3s ease;
}
```

### 3.2 Section Wrapper (Full Width Background)

```css
.custom-section-related-products-wrapper {
  width: 100%;
  background-color: var(--related-color-bg-cream);
}
```

### 3.3 Section Container (Max-Width, Centered)

```css
.custom-section-related-products {
  max-width: var(--related-section-container-max-width);
  margin: 0 auto;
  padding: var(--related-section-padding-v) var(--related-section-padding-h);
}
```

### 3.4 Section Title

```css
.custom-section-related-products__title {
  font-family: var(--related-font-primary);
  font-size: 32px;
  font-weight: 400;
  color: var(--related-color-primary-dark);
  line-height: normal;
  margin: 0 0 var(--related-title-gap) 0;
}
```

### 3.5 Carousel Container

```css
.custom-section-related-products__carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
}
```

### 3.6 Product Cards Wrapper

```css
.custom-section-related-products__cards-wrapper {
  display: flex;
  gap: var(--related-card-gap);
  overflow-x: auto;
  scroll-behavior: smooth;
  flex: 1;

  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.custom-section-related-products__cards-wrapper::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
```

### 3.7 Product Card

```css
.custom-section-related-products__card {
  width: var(--related-card-width);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  position: relative;
}

.custom-section-related-products__card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
}
```

### 3.8 Image Wrapper

```css
.custom-section-related-products__image-wrapper {
  width: var(--related-card-width);
  height: var(--related-image-wrapper-height);
  background-color: var(--related-color-bg-beige);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.custom-section-related-products__image {
  width: var(--related-image-size);
  height: var(--related-image-size);
  object-fit: contain;
  object-position: center;
}

.custom-section-related-products__image--placeholder {
  width: 100%;
  height: 100%;
}
```

### 3.9 Gradient Overlay

```css
.custom-section-related-products__gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    -89.7744deg,
    rgba(0, 0, 0, 0.8) 17.65%,
    rgba(102, 102, 102, 0) 30.891%
  );
  opacity: 0;
  transition: opacity var(--related-transition-default);
  pointer-events: none;
}

/* Show gradient on card hover */
.custom-section-related-products__card:hover .custom-section-related-products__gradient-overlay {
  opacity: 1;
}
```

### 3.10 Product Info

```css
.custom-section-related-products__info {
  display: flex;
  flex-direction: column;
  gap: var(--related-name-price-gap);
  margin-top: var(--related-card-image-gap);
}

.custom-section-related-products__product-name {
  font-family: var(--related-font-primary);
  font-size: 20px;
  font-weight: 300;
  color: var(--related-color-primary-dark);
  line-height: normal;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.custom-section-related-products__product-price {
  font-family: var(--related-font-secondary);
  font-size: 16px;
  font-weight: 400;
  color: var(--related-color-secondary-blue);
  line-height: normal;
}
```

### 3.11 Wishlist Button

```css
.custom-section-related-products__wishlist-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 30px;
  height: 30px;
  border-radius: 100px;
  padding: 2px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--related-transition-default);
}

.custom-section-related-products__wishlist-btn:hover {
  opacity: 0.8;
}

.custom-section-related-products__wishlist-btn svg {
  width: 24px;
  height: 24px;
  display: block;
}

/* Active/Liked state - will be added via JS */
.custom-section-related-products__wishlist-btn.is-active {
  background-color: var(--related-color-wishlist-active);
}

.custom-section-related-products__wishlist-btn:focus-visible {
  outline: 2px solid var(--related-color-primary-dark);
  outline-offset: 2px;
}
```

### 3.12 Navigation Arrows

```css
.custom-section-related-products__arrow {
  width: 56px;
  height: 56px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: opacity var(--related-transition-default);
  z-index: 20;
}

.custom-section-related-products__arrow svg {
  width: 56px;
  height: 56px;
  color: var(--related-color-primary-dark);
}

.custom-section-related-products__arrow:hover {
  opacity: 0.7;
}

.custom-section-related-products__arrow:focus-visible {
  outline: 2px solid var(--related-color-primary-dark);
  outline-offset: 2px;
}

/* Hide arrows when not needed */
.custom-section-related-products__arrow.is-hidden {
  opacity: 0;
  pointer-events: none;
}
```

### 3.13 Responsive Styles

```css
/* Tablet (768px - 1023px) */
@media (max-width: 1023px) {
  :root {
    --related-section-padding-v: 60px;
    --related-section-padding-h: 30px;
    --related-card-width: calc((100% - 30px) / 4);
    --related-image-wrapper-height: 300px;
  }

  .custom-section-related-products__arrow {
    width: 48px;
    height: 48px;
  }

  .custom-section-related-products__arrow svg {
    width: 48px;
    height: 48px;
  }
}

/* Mobile (<768px) */
@media (max-width: 767px) {
  :root {
    --related-section-padding-v: 50px;
    --related-section-padding-h: 20px;
    --related-card-width: calc((100% - 8px) / 2);
    --related-card-gap: 8px;
    --related-image-wrapper-height: 240px;
  }

  .custom-section-related-products__title {
    font-size: 24px;
  }

  .custom-section-related-products__product-name {
    font-size: 16px;
  }

  .custom-section-related-products__product-price {
    font-size: 14px;
  }

  .custom-section-related-products__arrow {
    width: 40px;
    height: 40px;
  }

  .custom-section-related-products__arrow svg {
    width: 40px;
    height: 40px;
  }

  .custom-section-related-products__wishlist-btn {
    width: 26px;
    height: 26px;
  }

  .custom-section-related-products__wishlist-btn svg {
    width: 20px;
    height: 20px;
  }
}
```

---

## ⚙️ Step 4: Implement JavaScript Functionality

Open `assets/section-product-related.js` and implement:

### 4.1 Main Class Structure

```javascript
class RelatedProductsCarousel {
  constructor(container) {
    this.container = container;
    this.wrapper = container.querySelector('[data-carousel-wrapper]');
    this.leftArrow = container.querySelector('[data-carousel-arrow="left"]');
    this.rightArrow = container.querySelector('[data-carousel-arrow="right"]');
    this.wishlistButtons = container.querySelectorAll('[data-wishlist-button]');

    this.init();
  }

  init() {
    this.setupCarousel();
    this.setupWishlist();
    this.updateArrowVisibility();
  }

  setupCarousel() {
    if (!this.wrapper || !this.leftArrow || !this.rightArrow) return;

    // Left arrow click
    this.leftArrow.addEventListener('click', () => {
      this.scrollCarousel('left');
    });

    // Right arrow click
    this.rightArrow.addEventListener('click', () => {
      this.scrollCarousel('right');
    });

    // Update arrow visibility on scroll
    this.wrapper.addEventListener('scroll', () => {
      this.updateArrowVisibility();
    });

    // Update on resize
    window.addEventListener('resize', () => {
      this.updateArrowVisibility();
    });
  }

  scrollCarousel(direction) {
    if (!this.wrapper) return;

    const cardWidth = this.wrapper.querySelector('.custom-section-related-products__card')?.offsetWidth || 260;
    const gap = 10;
    const scrollAmount = cardWidth + gap;

    if (direction === 'left') {
      this.wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      this.wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  updateArrowVisibility() {
    if (!this.wrapper) return;

    const scrollLeft = this.wrapper.scrollLeft;
    const maxScroll = this.wrapper.scrollWidth - this.wrapper.clientWidth;

    // Hide left arrow if at start
    if (scrollLeft <= 0) {
      this.leftArrow?.classList.add('is-hidden');
    } else {
      this.leftArrow?.classList.remove('is-hidden');
    }

    // Hide right arrow if at end
    if (scrollLeft >= maxScroll - 1) { // -1 for rounding errors
      this.rightArrow?.classList.add('is-hidden');
    } else {
      this.rightArrow?.classList.remove('is-hidden');
    }
  }

  setupWishlist() {
    if (!this.wishlistButtons.length) return;

    // Initialize wishlist state from localStorage
    this.loadWishlistState();

    // Attach click handlers
    this.wishlistButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent card link click
        e.stopPropagation();
        this.toggleWishlist(button);
      });
    });
  }

  loadWishlistState() {
    const wishlist = this.getWishlist();

    this.wishlistButtons.forEach(button => {
      const productId = button.dataset.productId;
      if (wishlist.includes(productId)) {
        button.classList.add('is-active');
      }
    });
  }

  toggleWishlist(button) {
    const productId = button.dataset.productId;
    const wishlist = this.getWishlist();
    const isActive = wishlist.includes(productId);

    if (isActive) {
      // Remove from wishlist
      const index = wishlist.indexOf(productId);
      wishlist.splice(index, 1);
      button.classList.remove('is-active');
    } else {
      // Add to wishlist
      wishlist.push(productId);
      button.classList.add('is-active');
    }

    // Save to localStorage
    this.saveWishlist(wishlist);

    // Animate button
    this.animateWishlistButton(button);
  }

  animateWishlistButton(button) {
    // Check if GSAP is available
    if (typeof gsap !== 'undefined') {
      gsap.timeline()
        .to(button, {
          scale: 0.85,
          duration: 0.1,
          ease: 'power2.in'
        })
        .to(button, {
          scale: 1,
          duration: 0.15,
          ease: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)'
        });
    } else {
      // Fallback CSS animation
      button.style.transform = 'scale(0.85)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 100);
    }
  }

  getWishlist() {
    try {
      const data = localStorage.getItem('diamension_wishlist_items');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading wishlist:', error);
      return [];
    }
  }

  saveWishlist(wishlist) {
    try {
      localStorage.setItem('diamension_wishlist_items', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRelatedProducts);
} else {
  initRelatedProducts();
}

function initRelatedProducts() {
  const containers = document.querySelectorAll('.custom-section-related-products');
  containers.forEach(container => {
    new RelatedProductsCarousel(container);
  });
}
```

---

## 🧪 Step 5: Testing

### 5.1 Visual Testing
- [ ] Section background is #FFFAF5
- [ ] Container max-width is 1440px and centered
- [ ] Title displays correctly (32px, #183754)
- [ ] 5 products visible on desktop (≥1024px)
- [ ] 4 products visible on tablet (768px - 1023px)
- [ ] 2 products visible on mobile (<768px)
- [ ] Product cards are 260px wide on desktop
- [ ] Image wrappers are 260×360px with #f0efea background
- [ ] Product images are 250×250px and centered
- [ ] Product names use Neue Haas 45 Light, 20px
- [ ] Product prices use Neue Montreal, 16px
- [ ] Wishlist icon is 24×24px in top-right corner
- [ ] Navigation arrows are 56×56px on desktop

### 5.2 Functionality Testing
- [ ] Carousel scrolls smoothly when clicking arrows
- [ ] Left arrow is hidden when at start position
- [ ] Right arrow is hidden when at end position
- [ ] Arrow visibility updates when scrolling manually
- [ ] Wishlist button toggles on/off
- [ ] Wishlist state persists after page reload
- [ ] GSAP animation plays on wishlist toggle
- [ ] Gradient overlay appears on card hover
- [ ] Clicking product card navigates to product page
- [ ] "From" prefix shows only for products with price range

### 5.3 Responsive Testing
- [ ] Test on desktop (1440px, 1280px, 1024px)
- [ ] Test on tablet (768px, 1023px)
- [ ] Test on mobile (375px, 414px, 768px)
- [ ] Verify card widths adjust correctly
- [ ] Verify arrow sizes scale down
- [ ] Verify text sizes adjust on mobile

### 5.4 Accessibility Testing
- [ ] All buttons have aria-labels
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Focus states are visible
- [ ] Screen reader announces product names and prices
- [ ] Images have alt text

### 5.5 Edge Cases
- [ ] Test with 2 products (minimum)
- [ ] Test with 10 products (maximum)
- [ ] Test with products that have long names (truncation)
- [ ] Test with products without images (placeholder)
- [ ] Test with products with price ranges
- [ ] Test with GSAP not loaded (fallback animation)

---

## ✅ Implementation Checklist

Before marking complete:

- [ ] All three files created (liquid, css, js)
- [ ] Liquid structure matches design
- [ ] CSS uses BEM naming convention
- [ ] All design tokens applied correctly
- [ ] Section schema is complete and functional
- [ ] Product recommendations/collection logic works
- [ ] Carousel scrolling is smooth
- [ ] Arrow visibility updates correctly
- [ ] Wishlist functionality works
- [ ] Wishlist persists across sessions
- [ ] GSAP animation implemented
- [ ] Gradient hover effect works
- [ ] Responsive styles complete (3 breakpoints)
- [ ] All visual tests pass
- [ ] All functionality tests pass
- [ ] All responsive tests pass
- [ ] All accessibility tests pass
- [ ] All edge cases handled
- [ ] No console errors
- [ ] No Liquid syntax errors
- [ ] Code is clean and commented

---

## 🐛 Common Issues & Solutions

### Issue: Products not showing
**Solution:** Check if you're on a product page (for recommendations) or if collection is selected (for collection source).

### Issue: Arrows don't hide/show
**Solution:** Check scroll position calculation. Add `console.log` in `updateArrowVisibility()` to debug.

### Issue: Wishlist doesn't persist
**Solution:** Check localStorage key name matches across all functions. Check browser localStorage in DevTools.

### Issue: GSAP animation not working
**Solution:** Verify GSAP is loaded. Check if `typeof gsap !== 'undefined'` returns true. Fallback CSS animation should still work.

### Issue: Gradient doesn't show on hover
**Solution:** Check z-index stacking. Gradient should be inside image-wrapper with lower z-index than wishlist button.

### Issue: Cards are wrong width
**Solution:** Check CSS custom properties are being applied. Use DevTools to inspect computed values.

### Issue: Images not centered
**Solution:** Verify `object-fit: contain` and `object-position: center` are applied to images.

---

## 📚 Additional Resources

- **Figma Design:** [Node 206-452](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=206-452&m=dev)
- **Shopify Product Recommendations:** [Documentation](https://shopify.dev/docs/themes/architecture/sections/section-schema#product-recommendations)
- **BEM Naming:** `docs/rules/08-NAMING-CONVENTIONS.md`
- **Wishlist Logic:** `prototype/section-product-detail-diamension/wishlist-button-implementation/implementation-overview.md`

---

## 🤝 Getting Help

If you encounter any issues:

1. Review the Figma design again using MCP tools
2. Check design tokens in `02-design-tokens.md`
3. Review similar implementations in existing sections
4. Ask the human for clarification
5. Check browser console for JavaScript errors
6. Use DevTools to inspect CSS values

---

**Version:** 1.0
**Last Updated:** 2025-01-18
**Prepared By:** Wings Design Team
