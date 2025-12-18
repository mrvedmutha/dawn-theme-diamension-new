# Product Detail Section - Implementation Guide

## 📌 Purpose
This document provides step-by-step implementation instructions for building the custom product detail section. Follow this guide sequentially to ensure proper development flow.

---

## 🚨 BEFORE YOU START

### Prerequisites Checklist

**YOU MUST COMPLETE THESE STEPS FIRST:**

- [ ] Read `01-overview.md` completely
- [ ] Read all files in `docs/rules/` (especially 04-LIQUID, 05-CSS, 06-JAVASCRIPT, 08-NAMING-CONVENTIONS)
- [ ] Read `02-design-tokens.md` for all design specifications
- [ ] Read `wishlist-button-implementation/implementation-overview.md`
- [ ] Fetch and review ALL Figma nodes listed in overview document using MCP tools
- [ ] Test current implementation at `http://127.0.0.1:9292/products/[product-handle]`
- [ ] Take screenshots and compare with Figma designs
- [ ] Ask the human any questions you have before coding

**If you haven't completed ALL of the above, STOP and do them now!**

---

## 🗂️ File Structure

You will be working with these files:

### Primary Files:
```
sections/
  └── custom-product-detail.liquid     ← Main section file (EDIT)

assets/
  ├── section-custom-product-detail.css ← Section styles (EDIT)
  ├── section-custom-product-detail.js  ← Section JavaScript (EDIT)
  └── custom-product-detail/
      ├── icons/                        ← Icons (READ-ONLY)
      │   ├── heart-icon-diamension.svg
      │   ├── magic-star-icon.svg
      │   ├── magic-pen-icon.svg
      │   ├── magic-hammer-icon.svg
      │   └── trust-badge-*.svg (4 files)
      └── image/                        ← Metal type images (READ-ONLY)
          ├── image-yellow-gold.png
          ├── image-rose-gold.png
          └── image-white-gold.png
```

### Reference Files:
```
prototype/section-product-detail-diamension/
  ├── 01-overview.md                   ← Section overview (READ)
  ├── 02-design-tokens.md              ← Design specs (READ)
  ├── 03-implementation-guide.md       ← This file
  └── wishlist-button-implementation/
      └── implementation-overview.md   ← Wishlist logic (READ)
```

---

## 📋 Implementation Phases

This implementation is divided into 8 phases. Complete them in order.

### Phase Overview:
1. **Setup & Cleanup** - Remove old code, prepare structure
2. **HTML Structure** - Build Liquid markup
3. **Typography & Fonts** - Implement font system
4. **Layout & Grid** - Three-column layout with sticky behavior
5. **Components** - Individual UI components
6. **JavaScript** - Variant switching, wishlist, accordions
7. **Responsive** - Mobile and tablet layouts
8. **Testing & QA** - Validation and refinement

---

## 🔧 PHASE 1: Setup & Cleanup

### Step 1.1: Backup Current Files

```bash
# Create backup before making changes
cp sections/custom-product-detail.liquid sections/custom-product-detail.liquid.backup
cp assets/section-custom-product-detail.css assets/section-custom-product-detail.css.backup
cp assets/section-custom-product-detail.js assets/section-custom-product-detail.js.backup
```

### Step 1.2: Remove Judge.me Integration

**File:** `sections/custom-product-detail.liquid`

**Remove these lines (around line 70-78):**
```liquid
{%- comment -%} Judge.me Rating Widget {%- endcomment -%}
<div class="custom-product-detail__rating" data-product-rating>
  {% render 'judgeme_widgets',
    widget_type: 'judgeme_preview_badge',
    jm_style: '',
    concierge_install: false,
    product: product
  %}
</div>
```

### Step 1.3: Clean CSS File

**File:** `assets/section-custom-product-detail.css`

Remove any Judge.me related styles:
```css
/* DELETE THIS */
.custom-product-detail__rating { ... }
```

### Step 1.4: Verify Asset Files

Check that all required assets exist:

```bash
# List icons
ls assets/custom-product-detail/icons/

# Should show:
# - heart-icon-diamension.svg
# - magic-star-icon.svg
# - magic-pen-icon.svg
# - magic-hammer-icon.svg
# - trust-badge-certified-brillance.svg
# - trust-badge-free-shipping-truck.svg
# - trust-badge-free-return-circle-arrow.svg
# - trust-badge-timeless-assurance-smart-bag.svg

# List images
ls assets/custom-product-detail/image/

# Should show:
# - image-yellow-gold.png
# - image-rose-gold.png
# - image-white-gold.png
```

**If any files are missing, STOP and ask the human!**

---

## 🏗️ PHASE 2: HTML Structure (Liquid)

### Step 2.1: Update Product Header Section

**File:** `sections/custom-product-detail.liquid` (lines 56-83)

**BEFORE:**
```liquid
<div class="custom-product-detail__header">
  <h1 class="custom-product-detail__title">{{ product.title }}</h1>
  <p class="custom-product-detail__subtitle">...</p>
  <div class="custom-product-detail__rating">...</div>
  <p class="custom-product-detail__price">...</p>
</div>
```

**AFTER:**
```liquid
<div class="custom-product-detail__header">
  {%- comment -%} Product Title {%- endcomment -%}
  <h1 class="custom-product-detail__title">{{ product.title }}</h1>

  {%- comment -%} Short Description (Product Metafield) {%- endcomment -%}
  {% if product.metafields.custom.short_description != blank %}
    <p class="custom-product-detail__description">
      {{ product.metafields.custom.short_description }}
    </p>
  {% endif %}

  {%- comment -%} Rating Placeholder (Judge.me removed) {%- endcomment -%}
  <div class="custom-product-detail__rating-placeholder"></div>

  {%- comment -%} Price {%- endcomment -%}
  <p class="custom-product-detail__price" data-product-price>
    {{ current_variant.price | money }}
  </p>

  {%- comment -%} Tax Info {%- endcomment -%}
  <p class="custom-product-detail__tax-info">
    (Inclusive of all taxes)
  </p>
</div>
```

### Step 2.2: Update Metal Type Variant Display

**File:** `sections/custom-product-detail.liquid` (lines 126-159)

**Replace the metal type section with:**

```liquid
{%- comment -%} Option 2: Metal Type with Hardcoded Image Swatches {%- endcomment -%}
{% if product.options_with_values[1] %}
  {% assign option2_name = product.options_with_values[1].name %}
  <div class="custom-product-detail__option-group">
    <p class="custom-product-detail__option-label" data-option-label="2">
      {{ option2_name }} : <span data-selected-value="2">{{ current_variant.option2 }}</span>
    </p>
    <div class="custom-product-detail__metal-options" data-option-index="2">
      {% for value in product.options_with_values[1].values %}
        <div
          class="custom-product-detail__metal-option {% if value == current_variant.option2 %}custom-product-detail__metal-option--selected{% endif %}"
          data-value="{{ value | escape }}"
          role="button"
          tabindex="0"
        >
          {%- comment -%} Map variant option value to hardcoded images {%- endcomment -%}
          {% case value %}
            {% when 'Yellow Gold' %}
              <img
                src="{{ 'image-yellow-gold.png' | asset_url }}"
                alt="{{ value }}"
                loading="lazy"
              >
            {% when 'Rose Gold' %}
              <img
                src="{{ 'image-rose-gold.png' | asset_url }}"
                alt="{{ value }}"
                loading="lazy"
              >
            {% when 'White Gold' %}
              <img
                src="{{ 'image-white-gold.png' | asset_url }}"
                alt="{{ value }}"
                loading="lazy"
              >
            {% else %}
              {%- comment -%} Fallback to text if no image match {%- endcomment -%}
              <span class="custom-product-detail__metal-option-text">{{ value }}</span>
          {% endcase %}
        </div>
      {% endfor %}
    </div>
  </div>

  <div class="custom-product-detail__divider"></div>
{% endif %}
```

### Step 2.3: Add Quantity Selector

**File:** `sections/custom-product-detail.liquid`

**Add AFTER the size selection (around line 186):**

```liquid
{%- comment -%} Quantity Selector {%- endcomment -%}
<div class="custom-product-detail__quantity-group">
  <p class="custom-product-detail__option-label">Quantity</p>
  <div class="custom-product-detail__quantity-selector">
    <button
      type="button"
      class="custom-product-detail__quantity-btn"
      data-quantity-decrease
      aria-label="Decrease quantity"
    >
      -
    </button>
    <input
      type="number"
      name="quantity"
      value="1"
      min="1"
      class="custom-product-detail__quantity-input"
      data-quantity-input
      aria-label="Quantity"
    >
    <button
      type="button"
      class="custom-product-detail__quantity-btn"
      data-quantity-increase
      aria-label="Increase quantity"
    >
      +
    </button>
  </div>
</div>

<div class="custom-product-detail__divider"></div>
```

### Step 2.4: Update Wishlist Button

**File:** `sections/custom-product-detail.liquid` (lines 40-50)

**BEFORE:**
```liquid
<button
  class="custom-product-detail__wishlist-btn"
  id="wishlistBtn-{{ section.id }}"
  type="button"
  aria-label="Add to wishlist"
  data-product-id="{{ product.id }}"
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">...</svg>
</button>
```

**AFTER:**
```liquid
<button
  class="custom-product-detail__wishlist-btn"
  data-wishlist-button
  data-product-id="{{ product.id }}"
  type="button"
  aria-label="Add to wishlist"
>
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      stroke="#183754"
      stroke-width="1.25"
      fill="none"
    />
  </svg>
</button>
```

### Step 2.5: Add Product Details Accordion (NEW)

**File:** `sections/custom-product-detail.liquid`

**Add BEFORE the Price Breakup accordion (around line 245):**

```liquid
{%- comment -%} 1. HARDCODED: Product Details (Three-Column Layout) {%- endcomment -%}
<div class="custom-product-detail__accordion-item custom-product-detail__accordion-item--active">
  <div class="custom-product-detail__accordion-header">
    <h3 class="custom-product-detail__accordion-title">Product Details</h3>
    <svg class="custom-product-detail__accordion-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </div>
  <div class="custom-product-detail__accordion-content">
    <div class="custom-product-detail__accordion-body">
      <div class="custom-product-detail__details-cards">

        {%- comment -%} Card 1: Total Weight {%- endcomment -%}
        <div class="custom-product-detail__details-card">
          <img
            src="{{ 'magic-star-icon.svg' | asset_url }}"
            alt="Total Weight"
            class="custom-product-detail__details-icon"
            width="28"
            height="28"
          >
          <p class="custom-product-detail__details-label">Total Weight</p>
          <p class="custom-product-detail__details-value" data-gross-weight>
            {% if current_variant.metafields.custom.gross_weight %}
              {{ current_variant.metafields.custom.gross_weight }}
            {% else %}
              -
            {% endif %}
          </p>
          <p class="custom-product-detail__details-sublabel">Approx. Gross Weight</p>
        </div>

        {%- comment -%} Card 2: Metal Details {%- endcomment -%}
        <div class="custom-product-detail__details-card">
          <img
            src="{{ 'magic-pen-icon.svg' | asset_url }}"
            alt="Metal Details"
            class="custom-product-detail__details-icon"
            width="28"
            height="28"
          >
          <p class="custom-product-detail__details-label" data-metal-label>
            {% if current_variant.option1 and current_variant.option2 %}
              {{ current_variant.option1 }} {{ current_variant.option2 }}
            {% endif %}
          </p>
          <p class="custom-product-detail__details-value" data-metal-weight>
            {% if current_variant.metafields.custom.metal_weight %}
              {{ current_variant.metafields.custom.metal_weight }}
            {% else %}
              -
            {% endif %}
          </p>
          <p class="custom-product-detail__details-sublabel">Approx. Metal Weight</p>
        </div>

        {%- comment -%} Card 3: Diamond Details {%- endcomment -%}
        <div class="custom-product-detail__details-card">
          <img
            src="{{ 'magic-hammer-icon.svg' | asset_url }}"
            alt="Diamond Details"
            class="custom-product-detail__details-icon"
            width="28"
            height="28"
          >
          <p class="custom-product-detail__details-label">
            LAB GROWN DIAMONDS -<br>
            EF/ VVS,VVS
          </p>
          <p class="custom-product-detail__details-value" data-diamond-ct>
            {% if current_variant.metafields.custom.diamond_in_ct %}
              {{ current_variant.metafields.custom.diamond_in_ct }} Ct.
            {% else %}
              -
            {% endif %}
          </p>
          <p class="custom-product-detail__details-sublabel">Approx. Diamond Weight</p>
        </div>

      </div>
    </div>
  </div>
</div>
```

### Step 2.6: Add Missing Accordions

**File:** `sections/custom-product-detail.liquid`

**Add AFTER the custom block accordions (around line 410):**

```liquid
{%- comment -%} 5. PRODUCT METAFIELD: Certification of Authenticity {%- endcomment -%}
{% if product.metafields.custom.certifications_of_authenticity != blank %}
  <div class="custom-product-detail__accordion-item">
    <div class="custom-product-detail__accordion-header">
      <h3 class="custom-product-detail__accordion-title">Certification of Authenticity</h3>
      <svg class="custom-product-detail__accordion-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    <div class="custom-product-detail__accordion-content">
      <div class="custom-product-detail__accordion-body">
        <p class="custom-product-detail__accordion-text">
          {{ product.metafields.custom.certifications_of_authenticity }}
        </p>
      </div>
    </div>
  </div>
{% endif %}

{%- comment -%} 6. HARDCODED: Book your Appointment {%- endcomment -%}
<div class="custom-product-detail__accordion-item">
  <div class="custom-product-detail__accordion-header">
    <h3 class="custom-product-detail__accordion-title">Book your Appointment</h3>
    <svg class="custom-product-detail__accordion-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </div>
  <div class="custom-product-detail__accordion-content">
    <div class="custom-product-detail__accordion-body">
      <h4 class="custom-product-detail__appointment-title">Book an Appointment Today</h4>
      <p class="custom-product-detail__appointment-text">
        Discover a design you love? Schedule a visit to our boutique and experience the brilliance of our jewellery firsthand. Simply fill out a quick form, and we'll be delighted to welcome you in-store for a personalized viewing. Let your online inspiration turn into a sparkling, real-life moment – book your appointment today.
      </p>
      {% if section.settings.appointment_booking_link != blank %}
        <a
          href="{{ section.settings.appointment_booking_link }}"
          class="custom-product-detail__appointment-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book Now
        </a>
      {% else %}
        <button class="custom-product-detail__appointment-btn" disabled>
          Book Now
        </button>
      {% endif %}
    </div>
  </div>
</div>

{%- comment -%} 7. PRODUCT METAFIELD: Craft and Care Instructions {%- endcomment -%}
{% if product.metafields.custom.craft_and_care_instructions != blank %}
  <div class="custom-product-detail__accordion-item">
    <div class="custom-product-detail__accordion-header">
      <h3 class="custom-product-detail__accordion-title">Craft and Care Instructions</h3>
      <svg class="custom-product-detail__accordion-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    <div class="custom-product-detail__accordion-content">
      <div class="custom-product-detail__accordion-body custom-product-detail__accordion-body--rich-text">
        {{ product.metafields.custom.craft_and_care_instructions }}
      </div>
    </div>
  </div>
{% endif %}
```

### Step 2.7: Update Schema Settings

**File:** `sections/custom-product-detail.liquid`

**Add to section settings (in {% schema %} around line 544):**

```json
{
  "type": "url",
  "id": "appointment_booking_link",
  "label": "Appointment Booking Link",
  "info": "Link for 'Book Now' button in Book your Appointment accordion"
}
```

**Add AFTER the existing settings, before "blocks" array.**

---

## 🎨 PHASE 3: Typography & Fonts

### Step 3.1: Add Font-Face Declarations

**File:** `assets/section-custom-product-detail.css`

**Add at the TOP of the file:**

```css
/**
 * FONT-FACE DECLARATIONS
 * Neue Haas Grotesk Display Pro
 */

@font-face {
  font-family: 'Neue Haas Grotesk Display Pro';
  src: url('neue-haas-display/NeueHaasDisplayLight.woff2') format('woff2'),
       url('neue-haas-display/NeueHaasDisplayLight.woff') format('woff');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Neue Haas Grotesk Display Pro';
  src: url('neue-haas-display/NeueHaasDisplayRoman.woff2') format('woff2'),
       url('neue-haas-display/NeueHaasDisplayRoman.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Neue Haas Grotesk Display Pro';
  src: url('neue-haas-display/NeueHaasDisplayMedium.woff2') format('woff2'),
       url('neue-haas-display/NeueHaasDisplayMedium.woff') format('woff');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
```

**NOTE:** Adjust font file names based on actual files in `assets/fonts/neue-haas-display/`. Check the directory first!

### Step 3.2: Add CSS Custom Properties (Variables)

**Add AFTER font-face declarations:**

```css
/**
 * CSS CUSTOM PROPERTIES (Design Tokens)
 * Reference: prototype/section-product-detail-diamension/02-design-tokens.md
 */

:root {
  /* Colors */
  --cpd-color-primary-dark: #183754;
  --cpd-color-secondary-blue: #3e6282;
  --cpd-color-cream-white: #fffaf5;
  --cpd-color-bg-beige: #f0efea;
  --cpd-color-bg-light-gray: #f1f1f1;
  --cpd-color-bg-cream: #FFFCF9;
  --cpd-color-border-gray: #cbcbcb;
  --cpd-color-border-primary: #183754;

  /* Typography */
  --cpd-font-primary: 'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  --cpd-font-size-h1: 32px;
  --cpd-font-size-h2: 20px;
  --cpd-font-size-h3: 16px;
  --cpd-font-size-body-large: 24px;
  --cpd-font-size-body: 16px;
  --cpd-font-size-body-small: 14px;
  --cpd-font-size-body-xs: 12px;
  --cpd-font-size-body-xxs: 10px;
  --cpd-line-height-tight: 1.2;
  --cpd-line-height-normal: 1.3;
  --cpd-font-weight-light: 300;
  --cpd-font-weight-regular: 400;
  --cpd-font-weight-medium: 500;

  /* Spacing */
  --cpd-spacing-section: 48px;
  --cpd-spacing-column: 34px;
  --cpd-spacing-large: 32px;
  --cpd-spacing-medium: 24px;
  --cpd-spacing-default: 16px;
  --cpd-spacing-small: 12px;
  --cpd-spacing-xs: 8px;
  --cpd-spacing-xxs: 2px;

  /* Transitions */
  --cpd-transition-default: 0.3s ease;
  --cpd-transition-fast: 0.15s ease;

  /* Z-Index */
  --cpd-z-index-sticky: 20;
  --cpd-z-index-dropdown: 10;
  --cpd-z-index-modal: 100;
}
```

**NOTE:** Prefix all variables with `cpd-` (custom-product-detail) to avoid conflicts.

### Step 3.3: Apply Font Family Globally

**Add base styles:**

```css
/**
 * BASE STYLES
 */

.custom-product-detail {
  font-family: var(--cpd-font-primary);
  color: var(--cpd-color-primary-dark);
}

.custom-product-detail *,
.custom-product-detail *::before,
.custom-product-detail *::after {
  box-sizing: border-box;
}
```

---

## 📐 PHASE 4: Layout & Grid

### Step 4.1: Main Container & Three-Column Layout

**File:** `assets/section-custom-product-detail.css`

```css
/**
 * MAIN LAYOUT
 * Three-column grid: Thumbnails | Main Image | Product Info
 */

.custom-product-detail__wrapper {
  display: flex;
  gap: var(--cpd-spacing-column); /* 34px */
  align-items: flex-start;
  padding: 60px 50px 64px;
  position: relative;
}

/* Column 1: Thumbnails */
.custom-product-detail__thumbnails {
  display: flex;
  flex-direction: column;
  gap: var(--cpd-spacing-default); /* 16px */
  padding-top: 30px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  align-self: flex-start;
  max-height: 100vh;
  overflow-y: auto;
}

/* Column 2: Main Image */
.custom-product-detail__main-image {
  width: 500px;
  height: 800px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  align-self: flex-start;
}

/* Column 3: Product Info */
.custom-product-detail__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--cpd-spacing-section); /* 48px */
  min-width: 0; /* Allows flex item to shrink below content size */
}
```

### Step 4.2: Sticky Behavior Implementation

**JavaScript Required:**

The sticky columns (1 & 2) should scroll with content until column 3 reaches the end, then they should stop scrolling.

**File:** `assets/section-custom-product-detail.js`

**Add at the end of the file:**

```javascript
/**
 * STICKY COLUMNS BEHAVIOR
 * Columns 1 & 2 stop scrolling when column 3 ends
 */

function initStickyColumns() {
  const thumbnails = document.querySelector('.custom-product-detail__thumbnails');
  const mainImage = document.querySelector('.custom-product-detail__main-image');
  const productInfo = document.querySelector('.custom-product-detail__info');

  if (!thumbnails || !mainImage || !productInfo) return;

  // Calculate max scroll position for sticky elements
  function updateStickyBehavior() {
    const infoBottom = productInfo.offsetTop + productInfo.offsetHeight;
    const viewportHeight = window.innerHeight;
    const maxStickyTop = infoBottom - viewportHeight;

    // Set max-height for sticky elements
    const stickyMaxHeight = Math.min(viewportHeight, infoBottom);

    thumbnails.style.maxHeight = `${stickyMaxHeight}px`;
    mainImage.style.maxHeight = `${stickyMaxHeight}px`;
  }

  // Run on load and resize
  updateStickyBehavior();
  window.addEventListener('resize', updateStickyBehavior);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initStickyColumns);
```

---

## 🧩 PHASE 5: Components

**(Continued in next section due to length...)**

### Step 5.1: Wishlist Button Styling

**File:** `assets/section-custom-product-detail.css`

```css
/**
 * WISHLIST BUTTON
 * Reference: wishlist-button-implementation/implementation-overview.md
 * Figma Node: 206-256
 */

.custom-product-detail__wishlist-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 30px;
  height: 30px;
  border-radius: 100px; /* Full circle */
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: var(--cpd-z-index-dropdown);
  padding: var(--cpd-spacing-xxs); /* 2px */
  transition: background-color var(--cpd-transition-default),
              opacity var(--cpd-transition-default);
}

.custom-product-detail__wishlist-btn:hover {
  opacity: 0.8;
}

.custom-product-detail__wishlist-btn--liked {
  background-color: var(--cpd-color-bg-cream); /* #FFFCF9 */
}

.custom-product-detail__wishlist-btn svg {
  width: 24px;
  height: 24px;
  display: block;
}

.custom-product-detail__wishlist-btn svg path {
  stroke: var(--cpd-color-primary-dark);
  stroke-width: 1.25px;
  fill: none;
}
```

### Step 5.2: Quantity Selector Styling

```css
/**
 * QUANTITY SELECTOR
 */

.custom-product-detail__quantity-group {
  display: flex;
  flex-direction: column;
  gap: var(--cpd-spacing-medium); /* 24px */
}

.custom-product-detail__quantity-selector {
  display: flex;
  align-items: center;
  gap: 0; /* Flush together */
}

.custom-product-detail__quantity-btn,
.custom-product-detail__quantity-input {
  width: 42px;
  height: 42px;
  background: var(--cpd-color-bg-light-gray);
  border: none;
  font-family: var(--cpd-font-primary);
  font-size: 20px;
  font-weight: var(--cpd-font-weight-regular);
  color: var(--cpd-color-secondary-blue);
  text-align: center;
  padding: 10px;
  cursor: pointer;
  transition: opacity var(--cpd-transition-fast);
}

.custom-product-detail__quantity-btn:hover {
  opacity: 0.8;
}

.custom-product-detail__quantity-input {
  cursor: text;
  -moz-appearance: textfield; /* Remove spinner in Firefox */
}

.custom-product-detail__quantity-input::-webkit-inner-spin-button,
.custom-product-detail__quantity-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
```

### Step 5.3: Metal Type Swatches Styling

```css
/**
 * METAL TYPE SWATCHES
 */

.custom-product-detail__metal-options {
  display: flex;
  gap: var(--cpd-spacing-xs); /* 8px */
  align-items: center;
}

.custom-product-detail__metal-option {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--cpd-transition-fast);
  padding: 0;
  border: 0.8px solid transparent;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-product-detail__metal-option img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.custom-product-detail__metal-option--selected {
  border-color: var(--cpd-color-border-primary);
  padding: 3.2px; /* Creates border effect */
}

.custom-product-detail__metal-option--selected img {
  width: calc(100% - 6.4px);
  height: calc(100% - 6.4px);
}

.custom-product-detail__metal-option:hover {
  opacity: 0.8;
}
```

### Step 5.4: Product Details Cards (Three-Column)

```css
/**
 * PRODUCT DETAILS CARDS
 * Three-column layout with icons
 * Figma Node: 206-314
 */

.custom-product-detail__details-cards {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
}

.custom-product-detail__details-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--cpd-spacing-xs); /* 8px */
  padding: 20px 0;
  border-right: 1px solid var(--cpd-color-border-gray);
  text-align: center;
}

.custom-product-detail__details-card:last-child {
  border-right: none;
}

.custom-product-detail__details-icon {
  width: 28px;
  height: 28px;
  display: block;
}

.custom-product-detail__details-label {
  font-size: var(--cpd-font-size-body-small); /* 14px */
  font-weight: var(--cpd-font-weight-regular);
  color: var(--cpd-color-secondary-blue);
  line-height: var(--cpd-line-height-tight);
  margin: 0;
}

.custom-product-detail__details-value {
  font-size: var(--cpd-font-size-h3); /* 16px */
  font-weight: var(--cpd-font-weight-regular);
  color: var(--cpd-color-primary-dark);
  margin: 0;
}

.custom-product-detail__details-sublabel {
  font-size: var(--cpd-font-size-body-xs); /* 12px */
  font-weight: var(--cpd-font-weight-regular);
  color: var(--cpd-color-secondary-blue);
  margin: 0;
}
```

### Step 5.5: Price Breakup Table Styling

```css
/**
 * PRICE BREAKUP TABLE
 * Figma Node: 206-363
 */

.custom-product-detail__spec-row {
  display: flex;
  align-items: stretch;
  border: 1px solid var(--cpd-color-border-gray);
  border-bottom: 0;
}

.custom-product-detail__spec-row:last-child {
  border-bottom: 1px solid var(--cpd-color-border-gray);
}

.custom-product-detail__spec-label,
.custom-product-detail__spec-value {
  flex: 1;
  padding: 10px;
  font-size: var(--cpd-font-size-body-small); /* 14px */
  line-height: var(--cpd-line-height-tight); /* 1.2 */
  margin: 0;
}

.custom-product-detail__spec-label {
  font-weight: var(--cpd-font-weight-regular);
  color: var(--cpd-color-secondary-blue);
  text-align: left;
  border-right: 1px solid var(--cpd-color-border-gray);
}

.custom-product-detail__spec-value {
  font-weight: var(--cpd-font-weight-medium); /* 500 */
  color: var(--cpd-color-secondary-blue);
  text-align: right;
}

/* Total Row */
.custom-product-detail__spec-row--total .custom-product-detail__spec-label {
  font-weight: var(--cpd-font-weight-medium);
}

.custom-product-detail__spec-row--total .custom-product-detail__spec-value {
  color: var(--cpd-color-primary-dark); /* Darker for emphasis */
  font-weight: var(--cpd-font-weight-medium);
}
```

**Continue with remaining components...**

---

## 🎬 PHASE 6: JavaScript Implementation

### Step 6.1: Wishlist Functionality

**File:** `assets/section-custom-product-detail.js`

**Add the complete implementation from `wishlist-button-implementation/implementation-overview.md`:**

```javascript
/**
 * WISHLIST FUNCTIONALITY
 * Reference: prototype/section-product-detail-diamension/wishlist-button-implementation/implementation-overview.md
 */

const WISHLIST_CONFIG = {
  STORAGE_KEY: 'diamension_wishlist_items',
  LIKED_CLASS: 'custom-product-detail__wishlist-btn--liked'
};

// Storage Manager
const WishlistStorage = {
  get() {
    try {
      const data = localStorage.getItem(WISHLIST_CONFIG.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading wishlist storage:', error);
      return [];
    }
  },

  add(productId) {
    const wishlist = this.get();
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem(WISHLIST_CONFIG.STORAGE_KEY, JSON.stringify(wishlist));
    }
  },

  remove(productId) {
    const wishlist = this.get();
    const filtered = wishlist.filter(id => id !== productId);
    localStorage.setItem(WISHLIST_CONFIG.STORAGE_KEY, JSON.stringify(filtered));
  },

  has(productId) {
    return this.get().includes(productId);
  },

  toggle(productId) {
    if (this.has(productId)) {
      this.remove(productId);
      return false;
    } else {
      this.add(productId);
      return true;
    }
  }
};

// Animation Function
function animateWishlistButton(button) {
  if (!window.gsap) {
    console.warn('GSAP not loaded, skipping animation');
    return;
  }

  const timeline = gsap.timeline();
  timeline
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
}

// Initialize Wishlist
function initWishlist() {
  const wishlistButtons = document.querySelectorAll('[data-wishlist-button]');

  wishlistButtons.forEach(button => {
    const productId = button.dataset.productId;

    // Set initial state
    if (WishlistStorage.has(productId)) {
      button.classList.add(WISHLIST_CONFIG.LIKED_CLASS);
    }

    // Click handler
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const isNowLiked = WishlistStorage.toggle(productId);
      animateWishlistButton(button);

      if (isNowLiked) {
        button.classList.add(WISHLIST_CONFIG.LIKED_CLASS);
      } else {
        button.classList.remove(WISHLIST_CONFIG.LIKED_CLASS);
      }
    });
  });
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', initWishlist);
```

### Step 6.2: Quantity Stepper

```javascript
/**
 * QUANTITY STEPPER
 */

function initQuantityStepper() {
  const quantityInput = document.querySelector('[data-quantity-input]');
  const decreaseBtn = document.querySelector('[data-quantity-decrease]');
  const increaseBtn = document.querySelector('[data-quantity-increase]');

  if (!quantityInput || !decreaseBtn || !increaseBtn) return;

  // Decrease quantity
  decreaseBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value, 10) || 1;
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  // Increase quantity
  increaseBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value, 10) || 1;
    quantityInput.value = currentValue + 1;
  });

  // Prevent invalid input
  quantityInput.addEventListener('input', (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      e.target.value = 1;
    }
  });
}

document.addEventListener('DOMContentLoaded', initQuantityStepper);
```

### Step 6.3: Variant Selection & Updates

**This is complex - reference the existing implementation and ensure:**
1. Variant selection updates price
2. Variant selection updates main image
3. Variant selection updates all metafield-driven content (Product Details cards, Price Breakup)
4. Variant selection enables/disables buttons based on availability

---

## 📱 PHASE 7: Responsive Design

### Step 7.1: Tablet Layout (768px - 1023px)

```css
@media (max-width: 1023px) and (min-width: 768px) {
  .custom-product-detail__wrapper {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 40px 30px;
  }

  .custom-product-detail__thumbnails {
    order: 3;
    flex-direction: row;
    width: 100%;
    overflow-x: auto;
    padding-top: 0;
    position: static;
  }

  .custom-product-detail__main-image {
    order: 1;
    flex: 1;
  }

  .custom-product-detail__info {
    order: 2;
    flex: 1;
  }
}
```

### Step 7.2: Mobile Layout (<768px)

```css
@media (max-width: 767px) {
  .custom-product-detail__wrapper {
    flex-direction: column;
    padding: 20px 16px;
    gap: var(--cpd-spacing-medium);
  }

  .custom-product-detail__thumbnails {
    flex-direction: row;
    overflow-x: auto;
    padding-top: 0;
    position: static;
  }

  .custom-product-detail__main-image {
    width: 100%;
    height: auto;
    position: static;
  }

  .custom-product-detail__info {
    width: 100%;
  }

  /* Stack variant options */
  .custom-product-detail__purity-options,
  .custom-product-detail__metal-options {
    flex-wrap: wrap;
  }

  /* Full-width buttons in footer */
  .custom-product-detail__footer {
    flex-direction: column;
    align-items: stretch;
  }

  .custom-product-detail__cta-buttons {
    width: 100%;
  }
}
```

---

## ✅ PHASE 8: Testing & QA

### Step 8.1: Visual Testing

**Use Playwright MCP tools:**

```javascript
// Navigate to product page
mcp__playwright__browser_navigate({
  url: "http://127.0.0.1:9292/products/product-bracelet"
});

// Take full page screenshot
mcp__playwright__browser_take_screenshot({
  fullPage: true,
  filename: "product-page-implementation.png"
});

// Compare with Figma design
// Fetch Figma screenshot again
mcp__figma-desktop-mcp__get_screenshot({
  nodeId: "206-241"
});
```

### Step 8.2: Functional Testing Checklist

Test each feature manually:

- [ ] Product title displays correctly
- [ ] Short description shows from metafield
- [ ] Price displays and updates on variant change
- [ ] Tax info text displays
- [ ] Purity selection works
- [ ] Metal type swatches show correct images
- [ ] Size dropdown works
- [ ] Quantity stepper increments/decrements
- [ ] Wishlist button toggles and persists
- [ ] Wishlist animation plays smoothly
- [ ] Main image changes on variant/thumbnail selection
- [ ] Thumbnail navigation arrows work
- [ ] Product Details accordion shows correct data
- [ ] Price Breakup table calculates correctly
- [ ] All metafield-driven content displays
- [ ] All accordions expand/collapse
- [ ] Sticky behavior works on desktop
- [ ] Responsive layouts work on tablet/mobile
- [ ] CTA buttons work (Add to Bag, Buy Now)
- [ ] All links work (Size Guide, Book Now)

### Step 8.3: Browser Testing

Test in multiple browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Step 8.4: Accessibility Testing

- [ ] All interactive elements are keyboard accessible
- [ ] Focus states are visible
- [ ] ARIA labels are present
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader announces content correctly
- [ ] Form inputs have labels

### Step 8.5: Validation

- [ ] HTML validates (no Liquid errors)
- [ ] CSS validates
- [ ] JavaScript has no console errors
- [ ] No broken images or missing assets
- [ ] All metafields have fallbacks
- [ ] Section schema is valid JSON

---

## 🐛 Common Issues & Solutions

### Issue: Fonts not loading
**Solution:** Check font file paths in `@font-face` declarations. Ensure fonts exist in `assets/fonts/neue-haas-display/`.

### Issue: Sticky behavior not working
**Solution:** Ensure parent container has defined height. Check JavaScript console for errors.

### Issue: Wishlist not persisting
**Solution:** Check localStorage is enabled in browser. Verify STORAGE_KEY is consistent.

### Issue: Variant selection not updating metafields
**Solution:** Ensure `data-` attributes are correct and JavaScript is finding variant data in window.productData.

### Issue: Images not showing (404)
**Solution:** Verify asset paths with `{{ 'filename.ext' | asset_url }}`. Check Assets directory in Shopify admin.

### Issue: Metal type swatches showing text instead of images
**Solution:** Check variant option values exactly match case statements ("Yellow Gold", not "yellow gold").

---

## 📞 Getting Help

**Remember: If you're stuck, ASK THE HUMAN!**

Don't spend hours debugging alone. The human can:
- Clarify design specifications
- Provide missing information
- Debug complex issues
- Validate your approach

**Questions to ask:**
- "I'm implementing [component], but [specific issue]. How should I handle this?"
- "The Figma shows [this], but the current code has [that]. Which is correct?"
- "Should [metafield] have a fallback? What should it be?"
- "This JavaScript isn't working. Can you review my approach?"

---

## 🎉 Completion Checklist

Before marking this task complete:

- [ ] All 8 implementation phases completed
- [ ] Visual design matches Figma 100%
- [ ] All functional requirements met
- [ ] All metafields display correctly
- [ ] Responsive design works on all breakpoints
- [ ] Accessibility requirements met
- [ ] All tests passing
- [ ] No console errors
- [ ] Code follows project standards (BEM, Liquid, etc.)
- [ ] Documentation updated if needed
- [ ] Human has reviewed and approved

---

**Good luck with the implementation!**

**Remember:**
1. Read all documentation first
2. Use MCP tools to understand the design
3. Ask questions when unclear
4. Test thoroughly
5. Follow coding standards

**You've got this! 🚀**

---

**Version:** 1.0
**Last Updated:** 2025-01-XX
**Prepared By:** Wings Design Team
